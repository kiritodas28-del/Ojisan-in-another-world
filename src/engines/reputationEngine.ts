/**
 * reputationEngine.ts
 * Regional reputation scoring, decay, bounty, and event-based changes.
 *
 * PRD §4.5 — Reputation System
 *
 * Score range : -800 (infamous) to +800 (renowned)
 * Tier labels :
 *   Infamous   < -400
 *   Disliked   -400 to -100
 *   Neutral    -100 to  100
 *   Liked       100 to  400
 *   Renowned   > 400
 *
 * Decay  : negative scores decay toward 0 by 5 pts/day; positive scores do not decay.
 * Bounty : abs(score) x 2 gold; active when score < -100.
 *
 * Phase 10 — Tasks 10.1–10.8
 */

import type { GameState, RegionId, GameEvent } from '../state/gameState';

// ─── 10.4 — Reputation tier ───────────────────────────────────────────────────

export type ReputationTier = 'Infamous' | 'Disliked' | 'Neutral' | 'Liked' | 'Renowned';

export function getReputationTier(score: number): ReputationTier {
  if (score < -400) return 'Infamous';
  if (score < -100) return 'Disliked';
  if (score <= 100) return 'Neutral';
  if (score <= 400) return 'Liked';
  return 'Renowned';
}

// ─── 10.2 — Bounty helpers ────────────────────────────────────────────────────

export function computeBounty(score: number): number {
  return score < 0 ? Math.abs(score) * 2 : 0;
}

export function isBountyActive(score: number): boolean {
  return score < -100;
}

// ─── 10.7 — Pure reputation getter ───────────────────────────────────────────

export function getRegionReputation(gameState: GameState, regionId: RegionId): number {
  return gameState.reputation[regionId] ?? 0;
}

// ─── 10.5 — Apply a reputation delta ─────────────────────────────────────────
/**
 * Applies a delta to a region's score, clamped [-800, +800].
 * Emits:
 *   REPUTATION_CHANGED        always
 *   REPUTATION_TIER_CROSSED   when the delta pushes across a tier boundary
 *   BOUNTY_CHANGED            when the resulting score is negative
 */
export function applyReputationDelta(
  gameState: GameState,
  regionId: RegionId,
  delta: number,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const oldScore  = gameState.reputation[regionId] ?? 0;
  const newScore  = Math.max(-800, Math.min(800, oldScore + delta));
  const oldTier   = getReputationTier(oldScore);
  const newTier   = getReputationTier(newScore);

  const state: GameState = {
    ...gameState,
    reputation: { ...gameState.reputation, [regionId]: newScore },
  };

  events.push({ type: 'REPUTATION_CHANGED', regionId, delta, newScore, tier: newTier });

  if (oldTier !== newTier) {
    events.push({ type: 'REPUTATION_TIER_CROSSED', regionId, from: oldTier, to: newTier });
  }

  if (newScore < 0) {
    events.push({ type: 'BOUNTY_CHANGED', regionId, newAmount: computeBounty(newScore) });
  }

  return { state, events };
}

// ─── 10.6 — Day-end reputation decay ─────────────────────────────────────────
/**
 * Decays all negative region scores by 5 toward zero.
 * Positive scores are not affected.
 * Emits REPUTATION_CHANGED for every region whose score changes.
 * Called by calendarEngine.runDayEndTick() step 1.
 */
export function tickReputationDecay(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  let reputation = { ...gameState.reputation };

  for (const regionId of Object.keys(reputation)) {
    const score = reputation[regionId]!;
    if (score >= 0) continue;  // positive scores do not decay

    const newScore = Math.min(0, score + 5);
    reputation = { ...reputation, [regionId]: newScore };
    const delta = newScore - score;  // always +5 (or less if clamped to 0)
    events.push({
      type: 'REPUTATION_CHANGED',
      regionId,
      delta,
      newScore,
      tier: getReputationTier(newScore),
    });
  }

  return { state: { ...gameState, reputation }, events };
}

// ─── 10.8 — Event table + convenience dispatcher ──────────────────────────────
/**
 * Named reputation events map to the deltas defined in PRD §4.5.
 * Keys are used by applyReputationEvent() and are safe to reference from
 * the dispatcher and other engines without magic strings.
 */
export const REPUTATION_EVENT_TABLE: Readonly<Record<string, number>> = {
  KILL_CIVILIAN:            -50,
  KILL_COMBATANT:           +10,
  COMPLETE_BOARD_QUEST:     +20,
  PURIFY_MIASMA_NODE:       +30,
  STRIP_AND_LOOT_PUBLIC:    -30,
  FORCE_INTIMACY_WITNESSED: -80,
  // Intimacy death reputation penalties are handled via applyReputationDelta directly
  // (variable amount depending on scene start type; see PRD §4.3.11)
} as const;

/**
 * Looks up an event key in REPUTATION_EVENT_TABLE and delegates to
 * applyReputationDelta(). Throws on unknown keys so typos surface immediately.
 */
export function applyReputationEvent(
  gameState: GameState,
  regionId: RegionId,
  eventKey: keyof typeof REPUTATION_EVENT_TABLE,
): { state: GameState; events: GameEvent[] } {
  const delta = REPUTATION_EVENT_TABLE[eventKey];
  if (delta === undefined) {
    throw new Error(`Unknown reputation event key: "${String(eventKey)}"`);
  }
  return applyReputationDelta(gameState, regionId, delta);
}

// ─── Phase 23a (task 23a.14) — Dark reputation decay stub ─────────────────────────
/**
 * Day-end stub for dark reputation decay.
 * Dark reputation does NOT decay passively like regular reputation.
 * Decay only occurs on Purifier-dominant events in a region, which are
 * authored in QuestReward.reputationEvents (task 11.5 data session).
 * This function is a no-op placeholder so calendarEngine can call it
 * unconditionally once that hook is authored.
 */
export function tickDarkReputationDecay(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  // No-op: dark reputation does not decay passively.
  // Decay is event-driven; see REPUTATION_EVENT_TABLE extensions in task 11.5.
  return { state: gameState, events: [] };
}
