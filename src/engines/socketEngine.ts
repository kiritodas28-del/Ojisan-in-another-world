/**
 * socketEngine.ts
 * Tasks 26.10–26.13 — Aether Crystal socket system.
 *
 * Sockets unlock on WEAPON and ARMOR items when their upgradeLevel reaches
 * multiples of 5: +5 → 1 socket, +10 → 2 sockets. Each socket accepts one
 * Aether Crystal material item and grants a named passive effect.
 *
 * socketItem(state, itemId, socketId, materialId)
 *   → validates, consumes the material, writes the socket, emits ITEM_SOCKETED.
 *
 * deriveSocketPassives(state, targetId)
 *   → pure read: returns all active passive effects from socketed materials
 *     across all equipped slots for the given character.
 *
 * No circular deps: this file imports only from gameState.ts and economyEngine.ts.
 */

import type { GameState, GameEvent, EquipmentSlot, AetherSocket } from '../state/gameState';
import { hasItem, removeItem, getItemDef } from './economyEngine';

// ─── Socket capacity ──────────────────────────────────────────────────────────

/**
 * Number of sockets an item supports at a given upgrade tier.
 * Formula: one socket per 5 upgrade levels, capped at 3.
 * Tier 0–4  → 0 sockets
 * Tier 5–9  → 1 socket
 * Tier 10–14 → 2 sockets
 * Tier 15+  → 3 sockets (max)
 */
export function socketCapacityForTier(upgradeLevel: number): number {
  return Math.min(3, Math.floor(upgradeLevel / 5));
}

// ─── Socket passives catalog ──────────────────────────────────────────────────

// Maps an Aether Crystal material itemId to a passive effect label.
// Authors flesh out the full catalog in src/data/items.ts; this is the
// engine-side lookup used by deriveSocketPassives().
const SOCKET_PASSIVE_BY_MATERIAL: Record<string, string> = {
  aether_crystal_fire:    'fire_damage_bonus_5',
  aether_crystal_water:   'water_resistance_10',
  aether_crystal_wind:    'agility_bonus_3',
  aether_crystal_earth:   'defense_bonus_4',
  aether_crystal_void:    'crit_chance_5',
  aether_crystal_radiant: 'healing_recv_10',
  aether_crystal_shadow:  'evasion_bonus_5',
  aether_crystal_life:    'max_hp_bonus_15',
  aether_crystal_soul:    'cpw_regen_1_per_turn',
};

export function deriveSocketPassiveEffect(materialId: string): string {
  return SOCKET_PASSIVE_BY_MATERIAL[materialId] ?? `aether_${materialId}_passive`;
}

// ─── socketItem ───────────────────────────────────────────────────────────────

/**
 * Inserts an Aether Crystal into a socket on an inventory item.
 *
 * Guards:
 *   - Item must be in the player's inventory.
 *   - Item type must be WEAPON or ARMOR.
 *   - upgradeLevel must be sufficient for the given socketId (capacity check).
 *   - socketId must exist in the item's current socket array or be creatable.
 *   - Socket must currently be empty (undefined inlaidMaterialId).
 *   - Player must have the material item in inventory.
 *   - Material must be of an Aether Crystal type (id starts with 'aether_crystal_').
 *
 * On success:
 *   - Consumes 1 unit of the material item.
 *   - Writes AetherSocket to the InventorySlot.sockets array.
 *   - Emits ITEM_SOCKETED.
 */
export function socketItem(
  state:      GameState,
  itemId:     string,
  socketId:   string,   // e.g. 'slot_0'
  materialId: string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const events: GameEvent[] = [];

  // Locate slot
  const slotIdx = state.player.inventory.findIndex(s => s.itemId === itemId);
  if (slotIdx === -1) {
    throw new Error(`Item "${itemId}" is not in your inventory.`);
  }

  let slot = state.player.inventory[slotIdx];

  // Validate item type
  let def;
  try { def = getItemDef(itemId); } catch {
    throw new Error(`Unknown item "${itemId}".`);
  }
  if (def.type !== 'WEAPON' && def.type !== 'ARMOR') {
    throw new Error(`Only weapons and armor can hold Aether sockets. "${def.name}" is neither.`);
  }

  // Socket capacity check
  const tier = slot.upgradeLevel ?? 0;
  const capacity = socketCapacityForTier(tier);
  const socketIndex = parseInt(socketId.replace('slot_', ''), 10);
  if (isNaN(socketIndex) || socketIndex >= capacity) {
    throw new Error(
      `"${def.name}" is +${tier} and supports ${capacity} socket(s). ` +
      `Socket "${socketId}" is not yet unlocked (needs +${(socketIndex + 1) * 5}).`,
    );
  }

  // Build or validate existing socket array
  const existingSockets: AetherSocket[] = slot.sockets ?? [];
  const existingSocket = existingSockets.find(s => s.socketId === socketId);
  if (existingSocket?.inlaidMaterialId) {
    throw new Error(
      `Socket "${socketId}" on "${def.name}" already contains ${existingSocket.inlaidMaterialId}. ` +
      `Remove the current crystal before inserting a new one.`,
    );
  }

  // Material validation
  if (!materialId.startsWith('aether_crystal_')) {
    throw new Error(`Only Aether Crystal items can be socketed. "${materialId}" is not one.`);
  }
  if (!hasItem(state, materialId)) {
    throw new Error(`You don't have a "${materialId}" to insert.`);
  }

  // Consume the material
  const removeResult = removeItem(state, materialId, 1, 'USED');
  state = removeResult.state;
  events.push(...removeResult.events);

  // Write the socket
  const passiveEffect = deriveSocketPassiveEffect(materialId);
  const newSocket: AetherSocket = { socketId, inlaidMaterialId: materialId, passiveEffect };

  const updatedSockets = existingSockets.filter(s => s.socketId !== socketId).concat(newSocket);
  slot = { ...slot, sockets: updatedSockets };

  const updatedInventory = state.player.inventory.map((s, i) =>
    i === slotIdx ? slot : s,
  );
  state = { ...state, player: { ...state.player, inventory: updatedInventory } };

  events.push({ type: 'ITEM_SOCKETED', itemId, socketId, materialId, passiveEffect });

  return {
    state,
    events,
    narrative: `You press the ${materialId.replace(/_/g, ' ')} into "${def.name}". ` +
      `A warm light pulses through it — [${passiveEffect}] is now active.`,
  };
}

// ─── deriveSocketPassives ─────────────────────────────────────────────────────

/**
 * Pure read: collects all active passive effect labels from every socketed slot
 * for a given character (player or companion by targetId).
 *
 * Returns a string[] of passive effect labels, deduplicated.
 * An empty array means no sockets are filled for this character.
 *
 * Example passives callers might act on:
 *   'fire_damage_bonus_5'    → combatEngine adds +5% fire damage
 *   'agility_bonus_3'        → craftingEngine / combatEngine adds +3 AGI
 *   'max_hp_bonus_15'        → characterCreationEngine / combatEngine increases maxHp
 *   'cpw_regen_1_per_turn'   → combatEngine adds +1 CPW per turn in combat
 */
export function deriveSocketPassives(
  state:    GameState,
  targetId: string,
): string[] {
  // Resolve the equipped map for this target.
  const equipped =
    targetId === 'player' || targetId === state.player.id
      ? state.player.equipped
      : state.party.companions.find(c => c.npcId === targetId)?.equipped;

  if (!equipped) return [];

  const passives = new Set<string>();

  for (const itemId of Object.values(equipped)) {
    if (!itemId) continue;
    const slot = state.player.inventory.find(s => s.itemId === itemId);
    if (!slot?.sockets) continue;
    for (const socket of slot.sockets) {
      if (socket.passiveEffect) passives.add(socket.passiveEffect);
    }
  }

  return [...passives];
}
