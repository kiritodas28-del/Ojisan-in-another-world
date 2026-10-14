/**
 * charterEngine.ts — Phase 31
 * Charter rank progression for the Wayfarers' Charter.
 *
 * charterRank + charterXP live on PlayerCharacter (gameState.ts).
 * No separate GameState root block is needed — these are flat player fields.
 *
 * XP is awarded by:
 *   - Combat kills  (dispatcher ENEMY_KILLED handler — task 31c.3)
 *   - Quest rewards (questEngine.grantQuestReward   — task 31c.2)
 *
 * Dialogue trees gate choices on minimum rank via the CHARTER_RANK DialogueCondition
 * (dialogueEngine.evaluateCondition — task 31c.4).
 */

import type { GameState, GameEvent, CharterRank } from '../state/gameState';

// ─── 31b.1 — XP thresholds per rank ──────────────────────────────────────────
// Provisional values per task list; can be tuned once encounters are authored.
export const CHARTER_XP_THRESHOLDS: Record<CharterRank, number> = {
  WANDERER:    0,
  SCOUT:     500,
  WAYFARER: 1500,
  RANGER:   4000,
  CHAMPION: 10000,
  LEGEND:   25000,
};

// Ordered from highest to lowest for rank derivation.
const RANKS_DESC: CharterRank[] = [
  'LEGEND',
  'CHAMPION',
  'RANGER',
  'WAYFARER',
  'SCOUT',
  'WANDERER',
];

// ─── 31b.2 — Derive rank from raw XP (pure) ──────────────────────────────────
/**
 * Returns the highest CharterRank whose threshold the player's XP meets.
 * Always returns at least 'WANDERER' (threshold 0).
 */
export function deriveCharterRank(xp: number): CharterRank {
  for (const rank of RANKS_DESC) {
    if (xp >= CHARTER_XP_THRESHOLDS[rank]) return rank;
  }
  return 'WANDERER'; // defensive fallback; WANDERER threshold is 0 so this never fires
}

// ─── 31b.3 — Award charter XP ────────────────────────────────────────────────
/**
 * Increments player.charterXP by `amount`, derives the new rank, and emits:
 *   CHARTER_XP_AWARDED  — always, so the UI can display the running total.
 *   CHARTER_RANK_UP     — only when the rank changes.
 *
 * Pure: returns a new state; never mutates the input.
 */
export function awardCharterXP(
  state:  GameState,
  amount: number,
): { state: GameState; events: GameEvent[] } {
  const newTotal = state.player.charterXP + amount;
  const prevRank = state.player.charterRank;
  const newRank  = deriveCharterRank(newTotal);

  const events: GameEvent[] = [
    { type: 'CHARTER_XP_AWARDED', amount, newTotal },
  ];

  if (newRank !== prevRank) {
    events.push({ type: 'CHARTER_RANK_UP', from: prevRank, to: newRank });
  }

  return {
    state: {
      ...state,
      player: {
        ...state.player,
        charterXP:   newTotal,
        charterRank: newRank,
      },
    },
    events,
  };
}
