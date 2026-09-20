/**
 * infamyEngine.ts  — Phase 24
 * Generic per-region infamy / bounty escalation system.
 *
 * Design principles:
 *  - Infamy (0-100) is distinct from reputation (which can be positive).
 *    Reputation tracks faction standing; infamy tracks criminal notoriety.
 *  - BountyTier drives spawn tables, shop surcharges, and city-gate access.
 *    The game catalog (src/data/infamyCatalog.ts) maps tiers to narrative text.
 *  - Infamy decays by PASSIVE_DECAY_PER_DAY at each day-end tick unless the
 *    player is in an OUTLAW or CONDEMNED tier (decay suspended at high tiers).
 *  - Fine debt accumulates at FINE_MULTIPLIER × current infamy score and
 *    must be paid via CLEAR_INFAMY intent to restore a region's score to 0.
 *  - All functions are pure: receive state, return { state, events }.
 */

import type {
  GameState, GameEvent, RegionId,
  InfamyState, BountyTier,
} from '../state/gameState';

// ─── Tuning constants ─────────────────────────────────────────────────────────
const PASSIVE_DECAY_PER_DAY = 2;          // infamy decays 2 points/day when < OUTLAW threshold
const FINE_MULTIPLIER        = 5;          // outstanding fine = infamyScore × 5 gold
// Infamy score boundaries for each bounty tier
const TIER_THRESHOLDS: Array<{ min: number; tier: BountyTier }> = [
  { min: 91, tier: 'CONDEMNED'  },
  { min: 76, tier: 'OUTLAW'     },
  { min: 51, tier: 'WANTED'     },
  { min: 26, tier: 'SUSPICIOUS' },
  { min:  0, tier: 'NONE'       },
];
// Decay is suspended when tier is OUTLAW or higher (score >= 76)
const DECAY_SUSPEND_THRESHOLD = 76;

// ─── Default initial infamy state ─────────────────────────────────────────────
export function createDefaultInfamyState(): InfamyState {
  return { scores: {}, tiers: {}, outstandingFines: {} };
}

// ─── Tier derivation ─────────────────────────────────────────────────────────
export function deriveBountyTier(score: number): BountyTier {
  for (const { min, tier } of TIER_THRESHOLDS) {
    if (score >= min) return tier;
  }
  return 'NONE';
}

// ─── Core: apply an infamy delta ─────────────────────────────────────────────
/**
 * Add (or subtract) infamy in a region.  Negative delta = clearing infamy via
 * penance or payment is done through clearInfamy() below.
 * Positive delta = crime committed (theft, assault, skipped tithe, etc.).
 */
export function applyInfamyDelta(
  state:    GameState,
  regionId: RegionId,
  delta:    number,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];

  const prev     = state.infamy.scores[regionId] ?? 0;
  const next     = Math.max(0, Math.min(100, prev + delta));
  const prevTier = state.infamy.tiers[regionId]  ?? 'NONE';
  const nextTier = deriveBountyTier(next);

  // Recompute fine debt
  const fine = Math.floor(next * FINE_MULTIPLIER);

  const newInfamy: InfamyState = {
    ...state.infamy,
    scores:          { ...state.infamy.scores,          [regionId]: next },
    tiers:           { ...state.infamy.tiers,           [regionId]: nextTier },
    outstandingFines:{ ...state.infamy.outstandingFines, [regionId]: fine },
  };

  events.push({ type: 'INFAMY_DELTA', regionId, delta, newScore: next });

  if (prevTier !== nextTier) {
    events.push({ type: 'BOUNTY_TIER_CHANGED', regionId, from: prevTier, to: nextTier });
    // Spawn a bounty hunter when crossing into WANTED+ for the first time this session.
    if (
      (nextTier === 'WANTED' || nextTier === 'OUTLAW' || nextTier === 'CONDEMNED') &&
      prevTier === 'SUSPICIOUS'
    ) {
      events.push({ type: 'BOUNTY_HUNTER_SPAWNED', regionId, tier: nextTier });
    }
  }

  return { state: { ...state, infamy: newInfamy }, events };
}

// ─── Clear infamy via fine payment ───────────────────────────────────────────
/**
 * Pay the outstanding fine for a region to reset its infamy to 0.
 * Throws if the player lacks enough gold.
 */
export function clearInfamy(
  state:    GameState,
  regionId: RegionId,
): { state: GameState; events: GameEvent[] } {
  const fine = state.infamy.outstandingFines[regionId] ?? 0;
  if (fine === 0) return { state, events: [] };
  if (state.player.gold < fine) {
    throw new Error(`Insufficient gold to clear infamy in ${regionId}. Need ${fine}g, have ${state.player.gold}g.`);
  }

  const events: GameEvent[] = [];
  const prevTier = state.infamy.tiers[regionId] ?? 'NONE';

  const newInfamy: InfamyState = {
    ...state.infamy,
    scores:          { ...state.infamy.scores,          [regionId]: 0 },
    tiers:           { ...state.infamy.tiers,           [regionId]: 'NONE' },
    outstandingFines:{ ...state.infamy.outstandingFines, [regionId]: 0 },
  };

  state = {
    ...state,
    player: { ...state.player, gold: state.player.gold - fine },
    infamy: newInfamy,
  };

  events.push({ type: 'INFAMY_CLEARED', regionId, goldPaid: fine });
  if (prevTier !== 'NONE') {
    events.push({ type: 'BOUNTY_TIER_CHANGED', regionId, from: prevTier, to: 'NONE' });
  }
  events.push({ type: 'GOLD_CHANGED', delta: -fine, newAmount: state.player.gold });

  return { state, events };
}

// ─── Day-end passive decay ────────────────────────────────────────────────────
/**
 * Called by calendarEngine.runDayEndTick() step 8b.
 * Decays infamy in all regions where tier < OUTLAW and score > 0.
 */
export function tickInfamyDecay(
  state: GameState,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  let   newScores    = { ...state.infamy.scores };
  let   newTiers     = { ...state.infamy.tiers  };
  let   newFines     = { ...state.infamy.outstandingFines };

  for (const [regionId, score] of Object.entries(newScores)) {
    if (score <= 0) continue;
    if (score >= DECAY_SUSPEND_THRESHOLD) continue; // suspended at OUTLAW+

    const next     = Math.max(0, score - PASSIVE_DECAY_PER_DAY);
    const prevTier = newTiers[regionId] ?? 'NONE';
    const nextTier = deriveBountyTier(next);
    newScores[regionId] = next;
    newTiers[regionId]  = nextTier;
    newFines[regionId]  = Math.floor(next * FINE_MULTIPLIER);

    if (delta(score, next) !== 0) {
      events.push({ type: 'INFAMY_DELTA', regionId: regionId as RegionId, delta: -PASSIVE_DECAY_PER_DAY, newScore: next });
    }
    if (prevTier !== nextTier) {
      events.push({ type: 'BOUNTY_TIER_CHANGED', regionId: regionId as RegionId, from: prevTier, to: nextTier });
    }
  }

  return {
    state: { ...state, infamy: { scores: newScores, tiers: newTiers, outstandingFines: newFines } },
    events,
  };
}

// ─── Read helpers ─────────────────────────────────────────────────────────────
export function getInfamyScore(state: GameState, regionId: RegionId): number {
  return state.infamy.scores[regionId] ?? 0;
}
export function getBountyTier(state: GameState, regionId: RegionId): BountyTier {
  return state.infamy.tiers[regionId] ?? 'NONE';
}
/** Returns the shop price surcharge multiplier for the current region (1.0 = normal). */
export function getShopSurcharge(state: GameState, regionId: RegionId): number {
  const tier = getBountyTier(state, regionId);
  if (tier === 'SUSPICIOUS') return 1.15;
  if (tier === 'WANTED')     return 1.35;
  if (tier === 'OUTLAW')     return 1.60;
  if (tier === 'CONDEMNED')  return 2.00;
  return 1.0;
}

// ─── Private utility ──────────────────────────────────────────────────────────
function delta(a: number, b: number): number { return b - a; }
