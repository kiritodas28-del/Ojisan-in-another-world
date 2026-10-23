/**
 * economyEngine.ts
 * Item catalog access, inventory management, buy/sell, gifting, loot resolution.
 *
 * PRD §4.8 — Economy & Inventory
 *
 * Design:
 *   - All functions are pure transforms: (GameState, ...) -> { state, events }.
 *   - ITEMS catalog (src/data/items.ts) is the single source of truth for item specs.
 *   - Inventory slots: 20 base + 5 per Manor tier above 2 (getInventorySlots()).
 *   - Overflow: combat loot that cannot be slotted is auto-converted to gold at
 *     baseSellValue. Manual pickup (addItem from player action) is rejected outright
 *     — caller must check hasRoomForItem() first.
 *   - Quest items never occupy slots (type === 'QUEST').
 *   - Buy price varies by reputation tier in the shop's region (5-tier table).
 *   - Sell price is always <= buy price; same tier table, different multiplier.
 *   - giveGift() delegates relationship delta to resolveGift() in relationshipEngine
 *     after consuming the item; GIFT_LOVE effect adds a bonus on top of the base delta.
 *   - resolveLootDrop() calls resolveLoot() from enemySpawnEngine and addItem() per entry.
 *   - STATUS_APPLY effects are deferred to Phase 14; consumeItem() logs a warning.
 *
 * Phase 12 — Tasks 12.1 (schema), 12.5–12.15 (engine), 12.16–12.17 (dispatcher stubs)
 */

import type { GameState, GameEvent, InventorySlot } from '../state/gameState';
import { getReputationTier } from './reputationEngine';
import { resolveGift }       from './relationshipEngine';
import { resolveLoot }       from './enemySpawnEngine';
import type { LootTable }    from './enemySpawnEngine';
import { applyStatus }       from './statusEffectEngine';
import { getShopSurcharge }  from './infamyEngine';
import { ITEMS }             from '../data/items';

// ═══════════════════════════════════════════════════════════════════════════════
// SCHEMA  (Task 12.1)
// ═══════════════════════════════════════════════════════════════════════════════

export type ItemType =
  | 'WEAPON'
  | 'ARMOR'
  | 'CONSUMABLE'
  | 'MATERIAL'
  | 'GIFT'
  | 'TOOL'     // intimacy implements — reusable, non-consumable, non-stackable
  | 'QUEST';   // never takes a slot; cannot be sold or dropped

/**
 * Effect applied when consumeItem() is called.
 *   HEAL         restore hp.current by `value` (clamped to hp.max).
 *   STAT_BOOST   add `value` to the combat stat named in `stat` for the current scene.
 *                Phase 15 will integrate this properly into derived stat pipeline.
 *   GIFT_LOVE    bonus love delta applied in giveGift() on top of resolveGift() base.
 *                Not used by consumeItem() — only read by giveGift().
 *   STATUS_APPLY apply status effect defId=`stat`, chance=`value` (0-1).
 *                Deferred to Phase 14; consumeItem() warns and skips.
 */
export interface ItemEffect {
  type:   'HEAL' | 'STAT_BOOST' | 'GIFT_LOVE' | 'STATUS_APPLY';
  value:  number;
  stat?:  string; // stat key for STAT_BOOST / status defId for STATUS_APPLY
}

export interface ItemDef {
  id:            string;
  name:          string;
  type:          ItemType;
  stackMax:      number;       // 1 = non-stackable
  baseBuyValue:  number;
  baseSellValue: number;
  effects?:      ItemEffect[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// CATALOG LOOKUP  (Task 12.5)
// ═══════════════════════════════════════════════════════════════════════════════

/** Returns the static ItemDef for a given id. Throws on unknown id. */
export function getItemDef(id: string): ItemDef {
  const def = ITEMS[id];
  if (!def) throw new Error(`economyEngine: unknown item id "${id}"`);
  return def;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DERIVED SLOT CAP  (Task 12.10)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Effective inventory slot count.
 *   Base 20 slots; +5 per Manor tier above 2.
 *   Tier 1 = 20, Tier 2 = 20, Tier 3 = 25, Tier 4 = 30, Tier 5 = 35, Tier 6 = 40.
 *   QUEST items never consume a slot.
 */
export function getInventorySlots(gameState: GameState): number {
  return 20 + 5 * Math.max(0, gameState.manor.tier - 2);
}

// ═══════════════════════════════════════════════════════════════════════════════
// INVENTORY QUERIES  (Task 12.6)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Returns true when the player has at least `quantity` of itemId in inventory.
 * Default quantity = 1.
 */
export function hasItem(gameState: GameState, itemId: string, quantity = 1): boolean {
  const slot = gameState.player.inventory.find(s => s.itemId === itemId);
  return slot !== undefined && slot.quantity >= quantity;
}

/** Returns true when the player has at least one open slot OR can stack into an existing slot. */
export function hasRoomForItem(gameState: GameState, itemId: string): boolean {
  const def = getItemDef(itemId);
  if (def.type === 'QUEST') return true; // quest items always fit
  // Can stack into existing slot that isn't full
  const existing = gameState.player.inventory.find(s => s.itemId === itemId);
  if (existing && existing.quantity < def.stackMax) return true;
  // Has a free slot
  const occupiedSlots = gameState.player.inventory.filter(s => {
    const d = ITEMS[s.itemId];
    return d?.type !== 'QUEST'; // quest items don't count against slot cap
  }).length;
  return occupiedSlots < getInventorySlots(gameState);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADD ITEM  (Task 12.7)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Adds `quantity` of `itemId` to the player's inventory.
 *
 *   1. If stackable slot exists with room, stack into it.
 *   2. Else if a free slot exists, open a new slot.
 *   3. Else: overflow — auto-convert to gold at baseSellValue (loot path only).
 *      Manual pickup should gate on hasRoomForItem() before calling addItem().
 *
 * Emits ITEM_ACQUIRED on success, or INVENTORY_OVERFLOW + GOLD_CHANGED on overflow.
 * QUEST items skip slot accounting.
 */
export function addItem(
  gameState: GameState,
  itemId:    string,
  quantity:  number,
  source:    'PICKUP' | 'PURCHASE' | 'LOOT' | 'REWARD' = 'PICKUP',
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const def = getItemDef(itemId);

  // Gold items from loot tables are written directly to player.gold
  if (itemId === 'gold') {
    const newGold = gameState.player.gold + quantity;
    const state: GameState = {
      ...gameState,
      player: { ...gameState.player, gold: newGold },
    };
    events.push({ type: 'GOLD_CHANGED', delta: quantity, newAmount: newGold });
    return { state, events };
  }

  const inventory = [...gameState.player.inventory];

  // --- Attempt to stack into existing slot ----------------------------------
  const existingIdx = inventory.findIndex(s => s.itemId === itemId);
  if (existingIdx !== -1) {
    const existing = inventory[existingIdx];
    const room     = def.stackMax - existing.quantity;
    if (room > 0) {
      const added = Math.min(room, quantity);
      inventory[existingIdx] = { ...existing, quantity: existing.quantity + added };
      const remaining = quantity - added;

      let state: GameState = {
        ...gameState,
        player: { ...gameState.player, inventory },
      };
      events.push({ type: 'ITEM_ACQUIRED', itemId, quantity: added, source });
      // Also emit ITEM_COLLECTED for quest objective hook (dispatcher task 11.15)
      events.push({ type: 'ITEM_COLLECTED', itemId, quantity: added });

      if (remaining > 0) {
        // Stack was full after partial add — recurse for remainder
        const overflow = addItem(state, itemId, remaining, source);
        state = overflow.state;
        events.push(...overflow.events);
      }
      return { state, events };
    }
  }

  // --- Open a new slot if there's room -------------------------------------
  const slotCount = inventory.filter(s => ITEMS[s.itemId]?.type !== 'QUEST').length;
  const slotCap   = def.type === 'QUEST' ? Infinity : getInventorySlots(gameState);

  if (slotCount < slotCap) {
    const toAdd = Math.min(def.stackMax, quantity);
    inventory.push({ itemId, quantity: toAdd });
    const remaining = quantity - toAdd;

    let state: GameState = {
      ...gameState,
      player: { ...gameState.player, inventory },
    };
    events.push({ type: 'ITEM_ACQUIRED', itemId, quantity: toAdd, source });
    events.push({ type: 'ITEM_COLLECTED', itemId, quantity: toAdd });

    if (remaining > 0) {
      const overflow = addItem(state, itemId, remaining, source);
      state = overflow.state;
      events.push(...overflow.events);
    }
    return { state, events };
  }

  // --- Overflow: convert to gold -------------------------------------------
  return convertToGold(gameState, itemId, quantity);
}

// ═══════════════════════════════════════════════════════════════════════════════
// REMOVE ITEM  (Task 12.8)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Removes `quantity` of `itemId` from the player's inventory.
 * Guards: throws if quantity > what the player has.
 * Deletes the slot when quantity reaches 0.
 * Emits ITEM_REMOVED.
 */
export function removeItem(
  gameState: GameState,
  itemId:    string,
  quantity:  number,
  reason:    'USED' | 'SOLD' | 'GIFTED' | 'DROPPED' | 'CONSUMED',
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const idx = gameState.player.inventory.findIndex(s => s.itemId === itemId);

  if (idx === -1) throw new Error(`removeItem: "${itemId}" not in inventory`);

  const slot = gameState.player.inventory[idx];
  if (slot.quantity < quantity) {
    throw new Error(`removeItem: have ${slot.quantity} of "${itemId}", need ${quantity}`);
  }

  const inventory: InventorySlot[] =
    slot.quantity === quantity
      ? gameState.player.inventory.filter((_, i) => i !== idx)
      : gameState.player.inventory.map((s, i) =>
          i === idx ? { ...s, quantity: s.quantity - quantity } : s,
        );

  const state: GameState = {
    ...gameState,
    player: { ...gameState.player, inventory },
  };
  events.push({ type: 'ITEM_REMOVED', itemId, quantity, reason });
  return { state, events };
}

// ═══════════════════════════════════════════════════════════════════════════════
// OVERFLOW CONVERSION  (Task 12.9)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Converts `quantity` of `itemId` directly to gold at baseSellValue.
 * Called automatically by addItem() when the inventory is full.
 * Emits INVENTORY_OVERFLOW + GOLD_CHANGED.
 */
export function convertToGold(
  gameState: GameState,
  itemId:    string,
  quantity:  number,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const def          = getItemDef(itemId);
  const goldConverted = def.baseSellValue * quantity;
  const newGold       = gameState.player.gold + goldConverted;

  const state: GameState = {
    ...gameState,
    player: { ...gameState.player, gold: newGold },
  };

  events.push({ type: 'INVENTORY_OVERFLOW', itemId, quantity, goldConverted });
  events.push({ type: 'GOLD_CHANGED', delta: goldConverted, newAmount: newGold });
  return { state, events };
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONSUME ITEM  (Task 12.11)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Uses one unit of a CONSUMABLE item and applies its effects to the player:
 *   HEAL         -- restores hp.current, clamped to hp.max
 *   STAT_BOOST   -- applied as a direct stat increment (Phase 15 integrates properly)
 *   GIFT_LOVE    -- skipped (only meaningful in giveGift context)
 *   STATUS_APPLY -- deferred to Phase 14; logs warning, no crash
 *
 * Guards:
 *   - Item must be in inventory.
 *   - Item type must be CONSUMABLE (TOOL/WEAPON/etc. cannot be consumed).
 *   - QUEST items are blocked outright.
 *
 * Emits ITEM_REMOVED (reason: CONSUMED).
 */
export function consumeItem(
  gameState: GameState,
  itemId:    string,
): { state: GameState; events: GameEvent[] } {
  const def = getItemDef(itemId);

  if (def.type === 'QUEST') {
    throw new Error(`consumeItem: QUEST item "${itemId}" cannot be consumed`);
  }
  if (def.type !== 'CONSUMABLE') {
    throw new Error(`consumeItem: "${itemId}" is type ${def.type}, not CONSUMABLE`);
  }
  if (!hasItem(gameState, itemId)) {
    throw new Error(`consumeItem: "${itemId}" not in inventory`);
  }

  // Remove one unit first
  const { state: stateAfterRemove, events } = removeItem(gameState, itemId, 1, 'CONSUMED');
  let state = stateAfterRemove;

  // Apply each effect
  for (const effect of def.effects ?? []) {
    switch (effect.type) {
      case 'HEAL': {
        const { current, max } = state.player.vitals.hp;
        const newHp = Math.min(max, current + effect.value);
        state = {
          ...state,
          player: {
            ...state.player,
            vitals: {
              ...state.player.vitals,
              hp: { current: newHp, max },
            },
          },
        };
        break;
      }

      case 'STAT_BOOST': {
        // Direct stat increment — Phase 15/16 will integrate status-effect pipeline
        if (effect.stat && effect.stat in state.player.stats) {
          const statKey = effect.stat as keyof typeof state.player.stats;
          state = {
            ...state,
            player: {
              ...state.player,
              stats: {
                ...state.player.stats,
                [statKey]: state.player.stats[statKey] + effect.value,
              },
            },
          };
        }
        break;
      }

      case 'STATUS_APPLY': {
        // Wire to statusEffectEngine.applyStatus() -- implemented in Phase 14.
        // effect.stat holds the status defId; effect.value holds the apply chance (0-1).
        // Chance roll here: consumable items apply their status with the given probability.
        if (effect.stat && Math.random() < effect.value) {
          const applyResult = applyStatus(state.player as import('../state/gameState').AnyCharacter, effect.stat);
          state = { ...state, player: applyResult.character as typeof state.player };
          events.push(...applyResult.events);
        }
        break;
      }

      case 'GIFT_LOVE':
        // Only relevant in giveGift(); no-op here
        break;
    }
  }

  return { state, events };
}

// ═══════════════════════════════════════════════════════════════════════════════
// BUY / SELL  (Tasks 12.12, 12.13)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Price multiplier table keyed on reputation tier.
 * Renowned shops give a discount; Infamous shops charge a penalty.
 */
const BUY_PRICE_MULTIPLIERS: Record<string, number> = {
  Renowned:  0.85,
  Liked:     0.92,
  Neutral:   1.00,
  Disliked:  1.10,
  Infamous:  1.25,
};

/**
 * Sell discount table — fraction of baseSellValue the shop pays out.
 * Renowned = best payout; Infamous = worst.
 */
const SELL_DISCOUNT_TABLE: Record<string, number> = {
  Renowned:  0.65,
  Liked:     0.57,
  Neutral:   0.50,
  Disliked:  0.43,
  Infamous:  0.35,
};

/**
 * Purchases `quantity` of `itemId` from a shop in `shopRegionId`.
 * Total cost = baseBuyValue x priceMultiplier(tier) x quantity.
 * Guards: player must have enough gold; QUEST items cannot be purchased.
 * Emits GOLD_CHANGED + ITEM_ACQUIRED (via addItem).
 */
export function buyItem(
  gameState:    GameState,
  itemId:       string,
  quantity:     number,
  shopRegionId: string,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const def      = getItemDef(itemId);

  if (def.type === 'QUEST') {
    throw new Error(`buyItem: QUEST item "${itemId}" cannot be purchased`);
  }

  const regionScore  = gameState.reputation[shopRegionId] ?? 0;
  const tier         = getReputationTier(regionScore);
  const multiplier   = BUY_PRICE_MULTIPLIERS[tier] ?? 1.0;
  // Task 24.30: compound the infamy shop surcharge on top of the reputation multiplier.
  // surcharge is 1.0 (neutral) when infamy tier is NONE; climbs to 2.0 at CONDEMNED.
  const infamySurcharge = getShopSurcharge(gameState, shopRegionId as import('../state/gameState').RegionId);
  // Phase 35c.3: apply seasonal market price multiplier after reputation + infamy.
  // RAINY +5%, WINTER +15%, SUMMER -5%, SPRING baseline 1.0.
  const unitPrice    = Math.ceil(def.baseBuyValue * multiplier * infamySurcharge * gameState.seasonModifiers.marketPriceMultiplier);
  const totalCost    = unitPrice * quantity;

  if (gameState.player.gold < totalCost) {
    throw new Error(
      `buyItem: need ${totalCost}g for ${quantity}x "${itemId}" but player has ${gameState.player.gold}g`,
    );
  }

  // Deduct gold
  const newGold   = gameState.player.gold - totalCost;
  let state: GameState = {
    ...gameState,
    player: { ...gameState.player, gold: newGold },
  };
  events.push({ type: 'GOLD_CHANGED', delta: -totalCost, newAmount: newGold });

  // Add item to inventory
  const addResult = addItem(state, itemId, quantity, 'PURCHASE');
  state = addResult.state;
  events.push(...addResult.events);

  return { state, events };
}

/**
 * Sells `quantity` of `itemId` to a shop in `shopRegionId`.
 * Payout = baseSellValue x sellDiscount(tier) x quantity.
 * Guards: player must have the item; QUEST items cannot be sold.
 * Emits ITEM_REMOVED (reason: SOLD) + GOLD_CHANGED.
 */
export function sellItem(
  gameState:    GameState,
  itemId:       string,
  quantity:     number,
  shopRegionId: string,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const def = getItemDef(itemId);

  if (def.type === 'QUEST') {
    throw new Error(`sellItem: QUEST item "${itemId}" cannot be sold`);
  }
  if (!hasItem(gameState, itemId, quantity)) {
    throw new Error(`sellItem: player does not have ${quantity}x "${itemId}"`);
  }

  const regionScore = gameState.reputation[shopRegionId] ?? 0;
  const tier        = getReputationTier(regionScore);
  const discount    = SELL_DISCOUNT_TABLE[tier] ?? 0.5;
  const payout      = Math.floor(def.baseSellValue * discount) * quantity;

  // Remove from inventory
  const removeResult = removeItem(gameState, itemId, quantity, 'SOLD');
  let state = removeResult.state;
  events.push(...removeResult.events);

  // Credit gold
  const newGold = state.player.gold + payout;
  state = { ...state, player: { ...state.player, gold: newGold } };
  events.push({ type: 'GOLD_CHANGED', delta: payout, newAmount: newGold });

  return { state, events };
}

// ═══════════════════════════════════════════════════════════════════════════════
// GIFT  (Task 12.14)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Gives a GIFT-type item to an NPC.
 *   1. Guards: item must be in inventory and type must be GIFT.
 *   2. Removes the item via removeItem() (reason: GIFTED).
 *   3. Reads the GIFT_LOVE effect value for a love bonus.
 *   4. Delegates to resolveGift() in relationshipEngine for the base +10 trust / +15 love.
 *      The GIFT_LOVE bonus is applied on top via applyPostSceneRelationshipDelta().
 *
 * Note: resolveGift() also consumes the item from inventory internally; we call
 * removeItem() ourselves here so we can apply the type guard before delegating.
 * To avoid double-removal we pass the already-modified state to resolveGift()
 * BUT resolveGift() will try to remove the item again — so we bypass resolveGift()'s
 * inventory removal by calling applyPostSceneRelationshipDelta() directly instead.
 */
export function giveGift(
  gameState: GameState,
  itemId:    string,
  npcId:     string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const def = getItemDef(itemId);

  if (def.type !== 'GIFT') {
    return {
      state:     gameState,
      events:    [],
      narrative: `That isn't something you can give as a gift.`,
    };
  }
  if (!hasItem(gameState, itemId)) {
    return {
      state:     gameState,
      events:    [],
      narrative: `You don't have a ${def.name} to give.`,
    };
  }

  // Remove from inventory
  const { state: stateAfterRemove, events } = removeItem(gameState, itemId, 1, 'GIFTED');

  // Read GIFT_LOVE bonus from effects (0 if not present)
  const loveBonus = def.effects?.find(e => e.type === 'GIFT_LOVE')?.value ?? 0;

  // Delegate to resolveGift() in relationshipEngine for base trust/love delta.
  // resolveGift() expects the item still in inventory (it removes it internally),
  // so we call it on the original state and then take only its state (which includes
  // the item removal). We apply our own removeItem output's events manually.
  const giftResult = resolveGift(stateAfterRemove, itemId, npcId);
  // Note: resolveGift() will not find the item (already removed) so it returns
  // a no-op narrative. We call applyPostSceneRelationshipDelta() directly instead
  // to apply the trust/love deltas cleanly without double-removal risk.

  // Import applyPostSceneRelationshipDelta inline (avoids circular dep via direct call)
  // Base delta: +10 trust, +15 love (matches resolveGift contract in PRD §4.4)
  const baseTrust = 10;
  const baseLove  = 15 + loveBonus;

  // Apply deltas to the NPC in contacts
  const contactIdx = stateAfterRemove.contacts.findIndex(
    r => r.character.npcId === npcId,
  );

  if (contactIdx === -1) {
    return {
      state:     stateAfterRemove,
      events,
      narrative: 'She cannot be found.',
    };
  }

  const npc    = stateAfterRemove.contacts[contactIdx].character;
  const newTrust = Math.max(-100, Math.min(100, npc.trust + baseTrust));
  const newLove  = Math.max(-100, Math.min(100, npc.love  + baseLove));

  // Detect relationship status change
  const { getRelationshipStatus } = require('./relationshipEngine') as typeof import('./relationshipEngine');
  const prevStatus = getRelationshipStatus(npc.trust, npc.love);
  const nextStatus = getRelationshipStatus(newTrust, newLove);

  if (nextStatus !== prevStatus) {
    events.push({
      type:  'RELATIONSHIP_STATUS_CHANGED',
      npcId,
      from:  prevStatus,
      to:    nextStatus,
    });
  }

  const updatedContacts = stateAfterRemove.contacts.map((r, i) =>
    i === contactIdx
      ? { ...r, character: { ...r.character, trust: newTrust, love: newLove } }
      : r,
  );

  const state: GameState = { ...stateAfterRemove, contacts: updatedContacts };

  void giftResult; // resolveGift called for side-effect reference only; state unused

  const narrative = loveBonus > 10
    ? `You present the ${def.name}. Her eyes go wide — it's clear this means a great deal to her.`
    : `You offer the ${def.name}. A warm smile crosses her face.`;

  return { state, events, narrative };
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOOT DROP  (Task 12.15)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Resolves a loot table by id, calling resolveLoot() from enemySpawnEngine,
 * then calling addItem() for each drop. Overflow items are auto-converted to gold.
 *
 * lootTableId is a key into a static LootTable registry.  Since enemySpawnEngine
 * builds loot tables inline at spawn time (not keyed by id), we accept a pre-
 * resolved LootTable object here. The dispatcher passes the table reference it
 * already holds from the CombatState.killedEnemies record.
 *
 * All gold drops (itemId === 'gold') from the table are folded into player.gold
 * directly by addItem().
 *
 * Emits ITEM_ACQUIRED per item, GOLD_CHANGED for gold drops, INVENTORY_OVERFLOW
 * for any item that cannot fit.
 */
export function resolveLootDrop(
  gameState:  GameState,
  lootTable:  LootTable,
): { state: GameState; events: GameEvent[] } {
  const drops = resolveLoot(lootTable, Math.random());
  const allEvents: GameEvent[] = [];
  let state = gameState;

  for (const drop of drops) {
    const result = addItem(state, drop.itemId, drop.qty, 'LOOT');
    state = result.state;
    allEvents.push(...result.events);
  }

  return { state, events: allEvents };
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEGACY HELPER (kept for callers that still reference the old API)
// ═══════════════════════════════════════════════════════════════════════════════

/** @deprecated Use getInventorySlots(gameState) instead. */
export function calcInventorySlotCap(manorTier: number): number {
  return 20 + Math.max(0, manorTier - 2) * 5;
}

/** @deprecated Use getItemDef(id).baseSellValue * discount instead. */
export function calcSellPrice(item: ItemDef, shopDiscount = 0.5): number {
  return Math.floor(item.baseSellValue * shopDiscount);
}
