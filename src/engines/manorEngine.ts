/**
 * manorEngine.ts
 * Manor tier upgrades, construction timers, suite assignment, passive resource generation.
 *
 * Tier feature unlock table (PRD §4.17):
 *   Tier 1: Basic storage (20 slots), player bedroom
 *   Tier 2: Crafting bench, 1 suite
 *   Tier 3: 3 suites, expanded storage (+10 slots)
 *   Tier 4: Alchemy Lab (guided upgrades), 5 suites
 *   Tier 5: Workshop, 8 suites
 *   Tier 6: Full estate, unlimited suites
 */

import type { GameState, ManorState, GameEvent } from '../state/gameState';

// ─── Tier definitions ─────────────────────────────────────────────────────────
export interface ManorTierDef {
  tier: number;
  suiteCount: number | 'unlimited';
  features: string[];
  constructionCostGold: number;
  constructionDays: number;
}

export const MANOR_TIERS: ManorTierDef[] = [
  { tier: 1, suiteCount: 0,           features: ['basic_storage', 'player_bedroom'],                  constructionCostGold: 0,     constructionDays: 0  },
  { tier: 2, suiteCount: 1,           features: ['crafting_bench'],                                   constructionCostGold: 500,   constructionDays: 3  },
  // 'holding_cells' unlocks at tier 3; capacity grows with each subsequent tier.
  { tier: 3, suiteCount: 3,           features: ['expanded_storage', 'holding_cells'],                constructionCostGold: 1500,  constructionDays: 5  },
  { tier: 4, suiteCount: 5,           features: ['alchemy_lab'],                                      constructionCostGold: 4000,  constructionDays: 7  },
  { tier: 5, suiteCount: 8,           features: ['workshop'],                                         constructionCostGold: 10000, constructionDays: 10 },
  { tier: 6, suiteCount: 'unlimited', features: ['full_estate'],                                      constructionCostGold: 25000, constructionDays: 14 },
];

// ─── Holding cell capacity per tier ──────────────────────────────────────────
// Unavailable (0) below tier 3.  Capacity: tier 3 = 2 / 4 = 4 / 5 = 8 / 6 = 12.
const HOLDING_CELL_CAPACITY: Record<number, number> = {
  1: 0, 2: 0, 3: 2, 4: 4, 5: 8, 6: 12,
};

/**
 * Return the number of holding cells available at the current manor tier.
 * Zero when below tier 3 (feature not yet unlocked).
 */
export function holdingCellCapacity(manor: ManorState): number {
  return HOLDING_CELL_CAPACITY[manor.tier] ?? 0;
}

// ─── Passive gold generation constants ────────────────────────────────────────
// Base gold per suite per day = GOLD_PER_TIER * manor.tier.
// Companion level adds GOLD_PER_COMPANION_LEVEL * companionLevel on top.
// Item drops are deferred until race/class data is real (Tasks 3a.8 / 16.4).
const GOLD_PER_TIER = 5;
const GOLD_PER_COMPANION_LEVEL = 2;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Return the tier definition for the current manor tier. */
export function getCurrentTierDef(manor: ManorState): ManorTierDef {
  return MANOR_TIERS[manor.tier - 1];
}

/** Return the definition for the next tier, or null when already at max. */
export function getNextTierDef(manor: ManorState): ManorTierDef | null {
  return manor.tier < 6 ? MANOR_TIERS[manor.tier] : null;
}

/** Check whether a feature string is unlocked at the current manor tier. */
export function hasFeature(manor: ManorState, featureId: string): boolean {
  // Features are additive — all tiers up to and including current are active.
  return MANOR_TIERS.slice(0, manor.tier).some(def => def.features.includes(featureId));
}

/** Return the suite capacity at the current tier (Infinity for 'unlimited'). */
export function suiteCapacity(manor: ManorState): number {
  const cap = getCurrentTierDef(manor).suiteCount;
  return cap === 'unlimited' ? Infinity : (cap as number);
}

/** Count how many suites are currently occupied. */
export function occupiedSuiteCount(manor: ManorState): number {
  return Object.keys(manor.suiteAssignments).length;
}

// ─── startUpgrade ─────────────────────────────────────────────────────────────
/**
 * Begin upgrading the manor to the next tier.
 * Guards: already at max tier, construction already in progress, insufficient gold.
 */
export function startUpgrade(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  const { manor } = gameState;

  // Already at max.
  if (manor.tier >= 6) {
    throw new Error('startUpgrade: manor is already at max tier (6).');
  }

  // Construction already running.
  if (manor.constructionTimerDays > 0) {
    throw new Error('startUpgrade: construction is already in progress.');
  }

  const nextDef = MANOR_TIERS[manor.tier]; // index = current tier (0-based → next tier def)
  const goldCost = nextDef.constructionCostGold;

  // Insufficient gold.
  if (gameState.player.gold < goldCost) {
    throw new Error(
      `startUpgrade: not enough gold. Need ${goldCost}, have ${gameState.player.gold}.`
    );
  }

  const events: GameEvent[] = [
    {
      type: 'MANOR_UPGRADE_STARTED',
      fromTier: manor.tier,
      toTier: manor.tier + 1,
      timerDays: nextDef.constructionDays,
      goldCost,
    },
  ];

  const newState: GameState = {
    ...gameState,
    player: { ...gameState.player, gold: gameState.player.gold - goldCost },
    manor: { ...manor, constructionTimerDays: nextDef.constructionDays },
  };

  return { state: newState, events };
}

// ─── tickConstruction ─────────────────────────────────────────────────────────
/**
 * Day-end: decrement construction timer by 1.
 * When it hits 0 the tier increments and an UPGRADE_COMPLETED event fires.
 * Called from calendarEngine day-end step 5.
 */
export function tickConstruction(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  const manor: ManorState = { ...gameState.manor };
  const events: GameEvent[] = [];

  if (manor.constructionTimerDays <= 0) {
    // Nothing in progress — return unchanged.
    return { state: gameState, events };
  }

  manor.constructionTimerDays -= 1;

  if (manor.constructionTimerDays === 0) {
    // Tier completes.
    manor.tier = Math.min(6, manor.tier + 1);
    events.push({ type: 'MANOR_UPGRADE_COMPLETED', newTier: manor.tier });
  }

  return { state: { ...gameState, manor }, events };
}

// ─── generatePassiveResources ─────────────────────────────────────────────────
/**
 * Day-end: for every occupied suite, calculate gold yield from the occupant's
 * companionLevel and the current manor tier, credit it directly to player.gold,
 * and push any future item drops to manor.passiveResourceQueue.
 *
 * Gold formula per suite: (GOLD_PER_TIER * manor.tier) + (GOLD_PER_COMPANION_LEVEL * companionLevel)
 * Item drops: deferred until race/class data is real (Tasks 3a.8 / 16.4).
 *
 * Called from calendarEngine day-end step 6.
 */
export function generatePassiveResources(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  const { manor } = gameState;
  const occupants = Object.values(manor.suiteAssignments); // array of npcIds

  if (occupants.length === 0) {
    return { state: gameState, events: [] };
  }

  let totalGold = 0;

  for (const npcId of occupants) {
    // Look up the NPC to get companionLevel.
    const npc = gameState.contacts.find(c => c.character.npcId === npcId)?.character;
    // If the NPC no longer exists (edge case), skip silently.
    if (!npc) continue;

    const baseGold = GOLD_PER_TIER * manor.tier;
    const levelBonus = GOLD_PER_COMPANION_LEVEL * (npc.companionLevel ?? 0);
    totalGold += baseGold + levelBonus;
  }

  // Credit gold directly; items queue remains empty until future phases.
  const newState: GameState = {
    ...gameState,
    player: { ...gameState.player, gold: gameState.player.gold + totalGold },
  };

  const events: GameEvent[] = [
    { type: 'PASSIVE_GEN_TICK', goldGenerated: totalGold, itemsQueued: 0 },
  ];

  return { state: newState, events };
}

// ─── collectPassiveResources ──────────────────────────────────────────────────
/**
 * Player action: flush manor.passiveResourceQueue into inventory and clear it.
 * Gold is already credited at generation time; this handles item entries only.
 * Called from dispatcher COLLECT_RESOURCES intent.
 *
 * Returns updated state with cleared queue (addItem wiring deferred until
 * item drop implementation — queue will be empty until then).
 */
export function collectPassiveResources(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  // TODO: when item drops are implemented, iterate manor.passiveResourceQueue
  // and call inventoryEngine.addItem() for each entry before clearing.
  const newState: GameState = {
    ...gameState,
    manor: { ...gameState.manor, passiveResourceQueue: [] },
  };

  // No event needed here — PASSIVE_GEN_TICK already fired at generation time.
  return { state: newState, events: [] };
}

// ─── assignSuite ─────────────────────────────────────────────────────────────
/**
 * Assign an NPC to a suite.
 * Guards: suite capacity, NPC already assigned to a suite.
 * suiteId convention: 'suite_1', 'suite_2', …
 */
export function assignSuite(
  gameState: GameState,
  suiteId: string,
  npcId: string,
): { state: GameState; events: GameEvent[] } {
  const { manor } = gameState;

  // Guard: tier must support suites at all.
  if (suiteCapacity(manor) === 0) {
    throw new Error('assignSuite: current manor tier has no suites.');
  }

  // Guard: suite slot must be within tier capacity.
  const suiteIndex = parseInt(suiteId.replace('suite_', ''), 10);
  const cap = suiteCapacity(manor);
  if (suiteIndex < 1 || (cap !== Infinity && suiteIndex > cap)) {
    throw new Error(
      `assignSuite: suiteId "${suiteId}" is out of range for tier ${manor.tier} (capacity ${cap}).`
    );
  }

  // Guard: NPC must exist in contacts.
  const npc = gameState.contacts.find(c => c.character.npcId === npcId)?.character;
  if (!npc) {
    throw new Error(`assignSuite: NPC "${npcId}" not found.`);
  }

  // Guard: NPC must not already be in a different suite.
  const existing = Object.entries(manor.suiteAssignments).find(([, id]) => id === npcId);
  if (existing) {
    throw new Error(
      `assignSuite: NPC "${npcId}" is already assigned to suite "${existing[0]}".`
    );
  }

  // If the suite is currently occupied, vacate it first.
  const events: GameEvent[] = [];
  const currentOccupant = manor.suiteAssignments[suiteId];
  if (currentOccupant) {
    events.push({ type: 'SUITE_VACATED', suiteId, npcId: currentOccupant });
  }

  events.push({ type: 'SUITE_ASSIGNED', suiteId, npcId });

  const newState: GameState = {
    ...gameState,
    manor: {
      ...manor,
      suiteAssignments: { ...manor.suiteAssignments, [suiteId]: npcId },
    },
  };

  return { state: newState, events };
}

// ─── vacateSuite ──────────────────────────────────────────────────────────────
/**
 * Remove the occupant from a suite.
 * Guard: suite must currently be occupied.
 */
export function vacateSuite(
  gameState: GameState,
  suiteId: string,
): { state: GameState; events: GameEvent[] } {
  const { manor } = gameState;
  const occupant = manor.suiteAssignments[suiteId];

  if (!occupant) {
    throw new Error(`vacateSuite: suite "${suiteId}" is already empty.`);
  }

  const newAssignments = { ...manor.suiteAssignments };
  delete newAssignments[suiteId];

  const events: GameEvent[] = [
    { type: 'SUITE_VACATED', suiteId, npcId: occupant },
  ];

  return {
    state: { ...gameState, manor: { ...manor, suiteAssignments: newAssignments } },
    events,
  };
}
