/**
 * craftingEngine.ts
 * Recipe loading, crafting job queue, equipment upgrade and equip/unequip.
 *
 * PRD ss4.9 -- Crafting & Equipment Upgrades
 *
 * Design notes:
 *   - All functions are pure transforms: (GameState, ...) -> { state, events }.
 *   - RECIPE_CATALOG (src/data/recipes.ts) is the single source of truth for recipe specs.
 *   - upgradeLevel lives on InventorySlot (runtime state), not ItemDef (static catalog).
 *   - Equipment slots: WEAPON | OFF_HAND | HEAD | CHEST | HANDS | LEGS.
 *     Valid types per slot: WEAPON->WEAPON, OFF_HAND->WEAPON|TOOL, HEAD/CHEST/HANDS/LEGS->ARMOR.
 *   - When equipping with a full inventory: emits EQUIP_SWAP_CONFIRM instead of auto-converting.
 *     The dispatcher then awaits a CONFIRM_EQUIP_SWAP intent that calls convertToGold().
 *   - Absolute phase number: day * 5 + PHASE_ORDER.indexOf(phase). Pure derivation, no new state.
 *   - Crafting slot count by manor tier: <2 = 0, 2 = 1, 3 = 2, 4 = 3, 5+ = 4.
 *
 * Phase 15 tasks: 15.1-15.18
 */

import type {
  GameState, GameEvent, EquipmentSlot, CraftingJob,
} from '../state/gameState';
import {
  addItem, removeItem, convertToGold, hasItem, hasRoomForItem, getItemDef,
} from './economyEngine';
import { RECIPE_CATALOG } from '../data/recipes';
import { PHASE_ORDER } from './calendarEngine';

// =============================================================================
// SCHEMA  (Task 15.1 / 15.2)
// =============================================================================

export interface RecipeIngredient {
  itemId:   string;
  quantity: number;
}

export interface RecipeDef {
  id:                 string;
  name:               string;
  outputItemId:       string;
  outputQuantity:     number;
  craftingTimePhases: number;   // phases until job resolves (5 = one full day)
  requiredManorTier:  number;   // minimum manor tier (2 = crafting bench)
  ingredients:        RecipeIngredient[];
}

// =============================================================================
// UPGRADE FAILURE RATES  (PRD ss4.9)
// =============================================================================

// Base failure rates for Forge upgrades (+0->+1: 0%, +1->+2: 15%, +2->+3: 30%).
// Alchemy Lab (manor tier 4+) halves all rates.
const FORGE_FAILURE_RATES: Record<number, number> = {
  0: 0.00,
  1: 0.15,
  2: 0.30,
};

export function getUpgradeFailRate(currentTier: number, hasAlchemyLab: boolean): number {
  const base = FORGE_FAILURE_RATES[currentTier] ?? 0;
  return hasAlchemyLab ? base / 2 : base;
}

// =============================================================================
// SLOT VALIDITY TABLE  (Task 15.14)
// =============================================================================

// Which item types are valid for each equipment slot.
const SLOT_VALID_TYPES: Record<EquipmentSlot, string[]> = {
  WEAPON:   ['WEAPON'],
  OFF_HAND: ['WEAPON', 'TOOL'],
  HEAD:     ['ARMOR'],
  CHEST:    ['ARMOR'],
  HANDS:    ['ARMOR'],
  LEGS:     ['ARMOR'],
};

// =============================================================================
// ABSOLUTE PHASE COUNTER  (pure derivation -- no new state)
// =============================================================================

/**
 * Converts a calendar state to an absolute monotonically-increasing phase number.
 * Used to compute completesOnPhase for crafting jobs.
 * Formula: (day - 1) * 5 + phaseIndex
 * Day 1 Morning = phase 0; Day 1 Afternoon = phase 1; Day 2 Morning = phase 5; etc.
 */
export function toAbsolutePhase(day: number, phase: string): number {
  const phaseIdx = PHASE_ORDER.indexOf(phase as typeof PHASE_ORDER[number]);
  return (day - 1) * 5 + (phaseIdx >= 0 ? phaseIdx : 0);
}

// =============================================================================
// CRAFTING SLOT COUNT  (Task 15.2)
// =============================================================================

/**
 * How many simultaneous crafting jobs the manor tier supports.
 *   Tier <2 = 0 (crafting bench not yet built)
 *   Tier  2 = 1
 *   Tier  3 = 2
 *   Tier  4 = 3
 *   Tier 5+ = 4
 */
export function deriveCraftingSlots(manorTier: number): number {
  if (manorTier < 2) return 0;
  return Math.min(4, manorTier - 1);
}

// =============================================================================
// CATALOG LOOKUP  (Task 15.7)
// =============================================================================

/** Returns the static RecipeDef for a given id. Throws on unknown id. */
export function getRecipeDef(id: string): RecipeDef {
  const def = RECIPE_CATALOG[id];
  if (!def) throw new Error(`craftingEngine: unknown recipe id "${id}"`);
  return def;
}

// =============================================================================
// CAN CRAFT GUARD  (Task 15.8)
// =============================================================================

/**
 * Checks all preconditions for starting a craft.
 * Returns { eligible: true } or { eligible: false, reason: string }.
 *
 * Guards checked in order:
 *   1. Recipe exists in catalog
 *   2. Manor tier >= recipe.requiredManorTier
 *   3. Free slot available in craftingQueue (count < maxSlots)
 *   4. All ingredients present in inventory (each checked via hasItem)
 */
export function canCraft(
  gameState: GameState,
  recipeId:  string,
): { eligible: boolean; reason?: string } {
  let def: RecipeDef;
  try {
    def = getRecipeDef(recipeId);
  } catch {
    return { eligible: false, reason: `Unknown recipe: "${recipeId}".` };
  }

  const manorTier = gameState.manor.tier;
  if (manorTier < def.requiredManorTier) {
    return {
      eligible: false,
      reason:   `Requires manor tier ${def.requiredManorTier} (you have tier ${manorTier}).`,
    };
  }

  const maxSlots = deriveCraftingSlots(manorTier);
  if (maxSlots === 0) {
    return { eligible: false, reason: `You need a crafting bench (manor tier 2) to craft items.` };
  }

  const activeJobs = gameState.craftingQueue.jobs.length;
  if (activeJobs >= maxSlots) {
    return {
      eligible: false,
      reason:   `All ${maxSlots} crafting slot(s) are occupied. Wait for a job to finish.`,
    };
  }

  for (const ing of def.ingredients) {
    if (!hasItem(gameState, ing.itemId, ing.quantity)) {
      const ingDef = (() => { try { return getItemDef(ing.itemId); } catch { return null; } })();
      const name   = ingDef?.name ?? ing.itemId;
      return {
        eligible: false,
        reason:   `Not enough ${name} (need ${ing.quantity}).`,
      };
    }
  }

  return { eligible: true };
}

// =============================================================================
// START CRAFT  (Task 15.9)
// =============================================================================

/**
 * Queues a new crafting job.
 *   1. Runs canCraft() guard; returns narrative error on failure.
 *   2. Consumes all ingredient items via removeItem().
 *   3. Appends a CraftingJob with completesOnPhase = now + craftingTimePhases.
 *   4. Updates craftingQueue.maxSlots to match current manor tier.
 *   5. Emits CRAFTING_STARTED.
 */
export function startCraft(
  gameState: GameState,
  recipeId:  string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const guard = canCraft(gameState, recipeId);
  if (!guard.eligible) {
    return {
      state:     gameState,
      events:    [],
      narrative: guard.reason ?? 'You cannot craft that right now.',
    };
  }

  const def    = getRecipeDef(recipeId);
  const events: GameEvent[] = [];
  let state    = gameState;

  // Consume all ingredients
  for (const ing of def.ingredients) {
    const result = removeItem(state, ing.itemId, ing.quantity, 'USED');
    state  = result.state;
    events.push(...result.events);
  }

  // Compute which slot index is free (first gap in 0..maxSlots-1)
  const usedSlots = new Set(state.craftingQueue.jobs.map(j => j.slotIndex));
  let slotIndex   = 0;
  while (usedSlots.has(slotIndex)) slotIndex++;

  const nowPhase        = toAbsolutePhase(state.calendar.day, state.calendar.phase);
  const completesOnPhase = nowPhase + def.craftingTimePhases;

  const newJob: CraftingJob = {
    recipeId,
    slotIndex,
    startedOnPhase:   nowPhase,
    completesOnPhase,
  };

  const maxSlots = deriveCraftingSlots(state.manor.tier);
  state = {
    ...state,
    craftingQueue: {
      jobs:     [...state.craftingQueue.jobs, newJob],
      maxSlots,
    },
  };

  events.push({ type: 'CRAFTING_STARTED', recipeId, completesOnPhase });

  return {
    state,
    events,
    narrative: `You begin crafting: ${def.name}. It will be ready in ${def.craftingTimePhases} phase(s).`,
  };
}

// =============================================================================
// RESOLVE CRAFTING JOBS  (Task 15.10)
// =============================================================================

/**
 * Called at day-end step 4 (calendarEngine.runDayEndTick).
 * Resolves all jobs where completesOnPhase <= currentAbsolutePhase.
 *   - Calls addItem() with the output; overflow auto-converts to gold.
 *   - Removes the completed job from the queue.
 *   - Re-derives maxSlots from current manor tier (may have upgraded).
 *   - Emits CRAFTING_COMPLETED per resolved job.
 */
export function resolveCraftingJobs(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  let state    = gameState;

  const nowPhase = toAbsolutePhase(state.calendar.day, state.calendar.phase);
  const ready    = state.craftingQueue.jobs.filter(j => j.completesOnPhase <= nowPhase);
  const pending  = state.craftingQueue.jobs.filter(j => j.completesOnPhase > nowPhase);

  for (const job of ready) {
    let def: RecipeDef;
    try {
      def = getRecipeDef(job.recipeId);
    } catch {
      // Recipe was removed from catalog after job was queued — silently discard
      continue;
    }

    const addResult = addItem(state, def.outputItemId, def.outputQuantity, 'REWARD');
    state  = addResult.state;
    events.push(...addResult.events);
    events.push({
      type:           'CRAFTING_COMPLETED',
      recipeId:       job.recipeId,
      outputItemId:   def.outputItemId,
      outputQuantity: def.outputQuantity,
    });
  }

  const maxSlots = deriveCraftingSlots(state.manor.tier);
  state = {
    ...state,
    craftingQueue: { jobs: pending, maxSlots },
  };

  return { state, events };
}

// =============================================================================
// UPGRADE ITEM  (Task 15.13)
// =============================================================================

/**
 * Attempts to upgrade a WEAPON or ARMOR item in the player's inventory.
 *   1. Guards: item in inventory; type is WEAPON or ARMOR; current tier < 3.
 *   2. Checks hasAlchemyLab (manor.tier >= 4) when useAlchemyLab requested.
 *   3. Rolls failure; on success: increments upgradeLevel on the InventorySlot.
 *   4. On failure: item stays at current tier (no destruction -- PRD ss4.9).
 *   5. Emits ITEM_UPGRADED (success flag + final tier).
 */
export function upgradeItem(
  gameState:     GameState,
  itemId:        string,
  useAlchemyLab: boolean,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const events: GameEvent[] = [];

  // Locate the slot
  const slotIdx = gameState.player.inventory.findIndex(s => s.itemId === itemId);
  if (slotIdx === -1) {
    return {
      state:     gameState,
      events,
      narrative: `You don't have that item.`,
    };
  }

  const slot = gameState.player.inventory[slotIdx];

  let def;
  try {
    def = getItemDef(itemId);
  } catch {
    return {
      state:     gameState,
      events,
      narrative: `Unknown item.`,
    };
  }

  if (def.type !== 'WEAPON' && def.type !== 'ARMOR') {
    return {
      state:     gameState,
      events,
      narrative: `Only weapons and armor can be upgraded.`,
    };
  }

  const currentTier = slot.upgradeLevel ?? 0;
  if (currentTier >= 3) {
    return {
      state:     gameState,
      events,
      narrative: `${def.name} is already at the maximum upgrade tier (+3).`,
    };
  }

  const hasAlchemyLab = gameState.manor.tier >= 4;
  if (useAlchemyLab && !hasAlchemyLab) {
    return {
      state:     gameState,
      events,
      narrative: `The Alchemy Lab requires manor tier 4.`,
    };
  }

  const failRate = getUpgradeFailRate(currentTier, useAlchemyLab && hasAlchemyLab);
  const success  = Math.random() >= failRate;
  const newTier  = success ? currentTier + 1 : currentTier;

  // Immutably update the slot's upgradeLevel
  const inventory = gameState.player.inventory.map((s, i) =>
    i === slotIdx ? { ...s, upgradeLevel: newTier } : s,
  );

  const state: GameState = {
    ...gameState,
    player: { ...gameState.player, inventory },
  };

  events.push({ type: 'ITEM_UPGRADED', itemId, success, newTier });

  const narrative = success
    ? `${def.name} upgraded to +${newTier}! The metal gleams with newfound power.`
    : `The upgrade attempt failed. ${def.name} remains at +${currentTier}.`;

  return { state, events, narrative };
}

// =============================================================================
// EQUIP ITEM  (Task 15.14)
// =============================================================================

/**
 * Equips `itemId` from inventory into `slot` for `targetId` ('player' or an npcId).
 *
 * Flow:
 *   1. Validate item type is valid for the target slot.
 *   2. If something is already in the slot:
 *      a. Check if there is room in inventory to receive the swap-out item.
 *      b. If NO room: emit EQUIP_SWAP_CONFIRM and return without equipping.
 *         The dispatcher holds the pending intent and waits for CONFIRM_EQUIP_SWAP.
 *      c. If room: add the swap-out item back to inventory first.
 *   3. Set equipped[slot] = itemId on the target character.
 *   4. Emits ITEM_EQUIPPED (and ITEM_UNEQUIPPED for any swapped-out item).
 *
 * For companions (targetId = npcId): updates party.companions[].equipped.
 * For the player (targetId = 'player'): updates player.equipped.
 */
export function equipItem(
  gameState: GameState,
  itemId:    string,
  slot:      EquipmentSlot,
  targetId:  string,   // 'player' or npcId
): { state: GameState; events: GameEvent[]; narrative: string; needsConfirmation: boolean } {
  const events: GameEvent[] = [];

  // Validate item exists in catalog and player has it
  let def;
  try {
    def = getItemDef(itemId);
  } catch {
    return { state: gameState, events, narrative: `Unknown item.`, needsConfirmation: false };
  }

  if (!hasItem(gameState, itemId)) {
    return {
      state: gameState, events,
      narrative: `You don't have a ${def.name} to equip.`,
      needsConfirmation: false,
    };
  }

  // Validate item type is legal for this slot
  if (!SLOT_VALID_TYPES[slot].includes(def.type)) {
    return {
      state: gameState, events,
      narrative: `${def.name} cannot be equipped in the ${slot.toLowerCase().replace('_', ' ')} slot.`,
      needsConfirmation: false,
    };
  }

  // Retrieve the target's current equipped map
  const currentEquipped = getEquippedMap(gameState, targetId);
  const swapOutItemId   = currentEquipped?.[slot];

  let state = gameState;

  // Handle swap-out: if something is currently in the slot, return it to inventory
  if (swapOutItemId) {
    if (!hasRoomForItem(state, swapOutItemId)) {
      // No room -- ask player to confirm gold conversion
      const swapDef = (() => { try { return getItemDef(swapOutItemId); } catch { return null; } })();
      const goldValue = swapDef ? swapDef.baseSellValue : 0;

      events.push({
        type:        'EQUIP_SWAP_CONFIRM',
        slot,
        swapOutItemId,
        goldValue,
        targetId,
      });

      return {
        state: gameState,
        events,
        narrative: `Your inventory is full. Equipping ${def.name} would displace ${swapDef?.name ?? swapOutItemId}, converting it to ${goldValue}g. Confirm?`,
        needsConfirmation: true,
      };
    }

    // Room available: move swap-out item back to inventory
    const addResult = addItem(state, swapOutItemId, 1, 'PICKUP');
    state  = addResult.state;
    events.push(...addResult.events);
    events.push({ type: 'ITEM_UNEQUIPPED', itemId: swapOutItemId, slot, targetId });
  }

  // Set the new item into the slot
  state = setEquipped(state, targetId, slot, itemId);
  events.push({ type: 'ITEM_EQUIPPED', itemId, slot, targetId });

  return {
    state,
    events,
    narrative: `${def.name} equipped in the ${slot.toLowerCase().replace('_', ' ')} slot.`,
    needsConfirmation: false,
  };
}

// =============================================================================
// EQUIP SWAP CONFIRMED  (follow-up to EQUIP_SWAP_CONFIRM)
// =============================================================================

/**
 * Called by the dispatcher when the player confirms converting the swap-out item to gold.
 * Converts the displaced item to gold, then equips the new item.
 */
export function confirmEquipSwap(
  gameState:    GameState,
  itemId:       string,
  slot:         EquipmentSlot,
  targetId:     string,
  swapOutItemId: string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const events: GameEvent[] = [];

  // Convert displaced item to gold
  const convertResult = convertToGold(gameState, swapOutItemId, 1);
  let state = convertResult.state;
  events.push(...convertResult.events);
  events.push({ type: 'ITEM_UNEQUIPPED', itemId: swapOutItemId, slot, targetId });

  // Now equip
  state = setEquipped(state, targetId, slot, itemId);
  const def = (() => { try { return getItemDef(itemId); } catch { return null; } })();
  events.push({ type: 'ITEM_EQUIPPED', itemId, slot, targetId });

  return {
    state,
    events,
    narrative: `${def?.name ?? itemId} equipped. The displaced item was converted to gold.`,
  };
}

// =============================================================================
// UNEQUIP ITEM  (Task 15.15)
// =============================================================================

/**
 * Moves the item in `slot` back to the player's inventory.
 *   1. Guard: slot must have an item equipped.
 *   2. If inventory is full: emit EQUIP_SWAP_CONFIRM (same pattern as equipItem) and block.
 *      In unequip context there is nothing to "swap in" -- we just cannot proceed.
 *      Narrative tells the player to free up space or convert to gold.
 *   3. On success: addItem back to inventory; clear the slot; emit ITEM_UNEQUIPPED.
 */
export function unequipItem(
  gameState: GameState,
  slot:      EquipmentSlot,
  targetId:  string,
): { state: GameState; events: GameEvent[]; narrative: string; needsConfirmation: boolean } {
  const events: GameEvent[] = [];

  const currentEquipped = getEquippedMap(gameState, targetId);
  const equippedItemId  = currentEquipped?.[slot];

  if (!equippedItemId) {
    return {
      state: gameState, events,
      narrative: `Nothing is equipped in that slot.`,
      needsConfirmation: false,
    };
  }

  if (!hasRoomForItem(gameState, equippedItemId)) {
    const def        = (() => { try { return getItemDef(equippedItemId); } catch { return null; } })();
    const goldValue  = def ? def.baseSellValue : 0;

    events.push({
      type:         'EQUIP_SWAP_CONFIRM',
      slot,
      swapOutItemId: equippedItemId,
      goldValue,
      targetId,
    });

    return {
      state: gameState, events,
      narrative: `Your inventory is full. Unequipping ${def?.name ?? equippedItemId} would convert it to ${goldValue}g. Confirm?`,
      needsConfirmation: true,
    };
  }

  // Return to inventory
  const addResult = addItem(gameState, equippedItemId, 1, 'PICKUP');
  let state       = addResult.state;
  events.push(...addResult.events);

  // Clear the slot
  state = setEquipped(state, targetId, slot, undefined);
  events.push({ type: 'ITEM_UNEQUIPPED', itemId: equippedItemId, slot, targetId });

  const def = (() => { try { return getItemDef(equippedItemId); } catch { return null; } })();
  return {
    state,
    events,
    narrative: `${def?.name ?? equippedItemId} unequipped and returned to your inventory.`,
    needsConfirmation: false,
  };
}

// =============================================================================
// EQUIPPED STAT BONUS  (pure derived -- for combat/intimacy pipeline)
// =============================================================================

/**
 * Returns the effective stat bonus from all equipped items for a given character.
 * Reads each equipped itemId, looks up the ItemDef, sums STAT_BOOST effects,
 * and adds upgradeLevel (from InventorySlot) to all applicable stats.
 *
 * This is called by combatEngine (Phase 16 task 16.14 extends it further with
 * passive skills on top). It does NOT mutate any state.
 */
export function deriveEquipmentStatBonus(
  gameState: GameState,
  targetId:  string,
): { str: number; agi: number; wis: number; def: number; lck: number } {
  const bonus = { str: 0, agi: 0, wis: 0, def: 0, lck: 0 };

  const equippedMap = getEquippedMap(gameState, targetId);
  if (!equippedMap) return bonus;

  for (const itemId of Object.values(equippedMap)) {
    if (!itemId) continue;

    let def;
    try { def = getItemDef(itemId); } catch { continue; }

    // Upgrade bonus: +1 to all stat-boost effects per upgrade tier
    const slot  = gameState.player.inventory.find(s => s.itemId === itemId);
    const tier  = slot?.upgradeLevel ?? 0;

    for (const effect of def.effects ?? []) {
      if (effect.type === 'STAT_BOOST' && effect.stat && effect.stat in bonus) {
        const key  = effect.stat as keyof typeof bonus;
        bonus[key] += effect.value + tier;  // base stat boost + upgrade bonus per tier
      }
    }
  }

  return bonus;
}

// =============================================================================
// INTERNAL HELPERS
// =============================================================================

/**
 * Returns the equipped map for a given targetId without mutating state.
 * Returns undefined if the target is not found.
 */
function getEquippedMap(
  gameState: GameState,
  targetId:  string,
): Partial<Record<EquipmentSlot, string>> | undefined {
  if (targetId === 'player') {
    return gameState.player.equipped;
  }
  const member = gameState.party.companions.find(c => c.npcId === targetId);
  return member?.equipped;
}

/**
 * Immutably sets (or clears) a single equipment slot on a target character.
 * Passing undefined for itemId clears the slot.
 */
function setEquipped(
  gameState: GameState,
  targetId:  string,
  slot:      EquipmentSlot,
  itemId:    string | undefined,
): GameState {
  if (targetId === 'player') {
    const equipped = { ...gameState.player.equipped };
    if (itemId === undefined) {
      delete equipped[slot];
    } else {
      equipped[slot] = itemId;
    }
    return { ...gameState, player: { ...gameState.player, equipped } };
  }

  // Companion
  const companions = gameState.party.companions.map(c => {
    if (c.npcId !== targetId) return c;
    const equipped = { ...c.equipped };
    if (itemId === undefined) {
      delete equipped[slot];
    } else {
      equipped[slot] = itemId;
    }
    return { ...c, equipped };
  });

  return { ...gameState, party: { ...gameState.party, companions } };
}
