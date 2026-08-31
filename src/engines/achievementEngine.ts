/**
 * achievementEngine.ts
 * Achievement condition evaluation and reward granting.
 *
 * TODO (Task 10.11): Full implementation.
 * NOTE: Achievement definition list and full condition schema are still sparse in PRD §4.14
 *       and should be defined before implementation begins (PRD task 2.28).
 */

import type { GameState, GameEvent } from '../state/gameState';

// ─── Schema (PRD §4.14 — stub) ────────────────────────────────────────────────
export type AchievementTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface AchievementDef {
  id: string;
  name: string;
  tier: AchievementTier;
  // TODO: define full condition type union
  condition: unknown;
  rewardBP: number;
  rewardAP: number;
  rewardTitle?: string;
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────

/** Called after key actions to check if any achievements have been newly unlocked. */
export function evaluateAchievements(
  _gameState: GameState,
  _defs: AchievementDef[],
): { state: GameState; events: GameEvent[] } {
  throw new Error('evaluateAchievements() not yet implemented');
}

export function grantAchievement(
  _gameState: GameState,
  _achievementId: string,
  _defs: AchievementDef[],
): { state: GameState; events: GameEvent[] } {
  throw new Error('grantAchievement() not yet implemented');
}
