/**
 * reputationEngine.ts
 * Regional reputation scoring, decay, bounty, and event-based changes.
 *
 * TODO (Task 10.1): Full implementation.
 *
 * Score range: -800 (infamous) to +800 (renowned)
 * Tier labels (PRD §4.5):
 *   Infamous   < -400
 *   Disliked   -400 to -100
 *   Neutral    -100 to  100
 *   Liked       100 to  400
 *   Renowned   > 400
 *
 * Decay: negative scores decay toward 0 by 5 pts/day; positive scores do not decay.
 * Bounty formula: abs(score) × 2 gold; paid at Bounty Offices.
 */

import type { GameState, RegionId, GameEvent } from '../state/gameState';

export type ReputationTier = 'Infamous' | 'Disliked' | 'Neutral' | 'Liked' | 'Renowned';

export function getReputationTier(score: number): ReputationTier {
  if (score < -400) return 'Infamous';
  if (score < -100) return 'Disliked';
  if (score <= 100) return 'Neutral';
  if (score <= 400) return 'Liked';
  return 'Renowned';
}

export function calcBounty(score: number): number {
  return score < 0 ? Math.abs(score) * 2 : 0;
}

/** Applies a reputation delta to a region, clamped to -800..+800. */
export function applyReputationDelta(
  _gameState: GameState,
  _regionId: RegionId,
  _delta: number,
): { state: GameState; events: GameEvent[] } {
  throw new Error('applyReputationDelta() not yet implemented');
}

/** Day-end decay: negative scores move toward 0 by 5 pts. Called by calendarEngine step 1. */
export function applyDailyDecay(gameState: GameState): GameState {
  const reputation = { ...gameState.reputation };
  for (const regionId of Object.keys(reputation)) {
    if (reputation[regionId] < 0) {
      reputation[regionId] = Math.min(0, reputation[regionId] + 5);
    }
  }
  return { ...gameState, reputation };
}
