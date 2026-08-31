/**
 * calendarEngine.ts
 * Phase/day cycle, action counting, fatigue, and the day-end tick sequence.
 *
 * TODO (Tasks 8.1–8.7): Full implementation.
 *
 * Fatigue penalty table (PRD §4.7):
 *   0–1 days  → no effect
 *   2 days    → -10% STR/AGI, -5 max Stamina
 *   3 days    → -25% STR/AGI, -15 max Stamina, -1 TEC
 *   4 days    → -50% all combat stats, encounter rolls disadvantaged
 *   5+        → forced collapse → last safe location; full restore; fatigue reset
 *
 * Day-end tick sequence (PRD §2.2 — executed in this order at Midnight):
 *   1. Reputation decay
 *   2. Pregnancy progression + birth checks
 *   3. NPC population refresh (every 3rd day)
 *   4. Crafting job resolution
 *   5. Construction timer decrement
 *   6. Manor passive generation
 *   7. Daily counter resets (flirt/touch, repeatable quest cooldowns)
 *   8. Date increment
 *
 * Actions that count toward phase advance (15 actions → next phase):
 *   Movement between nodes, combat rounds, dialogue trees, intimacy turns,
 *   item use, gifting, crafting start, building start.
 *   Fast-travel counts as 1 action per region boundary crossed.
 *
 * Direct-advance events (skip remaining actions, immediately advance phase):
 *   SLEEP, certain story cutscenes.
 */

import type { GameState, CalendarState, DayPhase, GameEvent } from '../state/gameState';

export const PHASE_ORDER: DayPhase[] = [
  'Morning',
  'Afternoon',
  'Evening',
  'Night',
  'Midnight',
];

export const PHASE_ACTION_LIMIT = 15;

// Passive Stamina/CPW recovery on phase advance (+20% of max, except before sleep)
export const PHASE_RECOVERY_RATE = 0.2;

// ─── Fatigue penalty application (stub — Task 8.4) ───────────────────────────
export function applyFatiguePenalties(
  _gameState: GameState,
): GameState {
  throw new Error('applyFatiguePenalties() not yet implemented');
}

// ─── Phase advance (stub — Task 8.1) ─────────────────────────────────────────
export function advancePhase(
  _gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  throw new Error('advancePhase() not yet implemented');
}

// ─── Direct phase advance (stub — Task 8.3) ───────────────────────────────────
export function directAdvancePhase(
  _gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  throw new Error('directAdvancePhase() not yet implemented');
}

// ─── Sleep mechanic (stub — Task 8.5) ────────────────────────────────────────
export function resolveSleep(
  _gameState: GameState,
): { state: GameState; events: GameEvent[]; narrative: string[] } {
  // Restores full HP/Stamina/CPW; resets fatigue; can only be used at Night/Midnight in safe location
  throw new Error('resolveSleep() not yet implemented');
}

// ─── Increment action counter (stub — Task 8.2) ──────────────────────────────
export function incrementActionCount(
  calendar: CalendarState,
  count = 1,
): CalendarState {
  // TODO: if actionCount >= phaseActionLimit, trigger phase advance
  void count;
  return calendar;
}

// ─── Day-end tick (stub — Task 8.7) ──────────────────────────────────────────
/**
 * Runs the full day-end tick sequence when phase advances to Midnight.
 * Returns updated GameState + all emitted events.
 */
export function runDayEndTick(
  _gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  // Step 1: Reputation decay
  // Step 2: Pregnancy progression + birth checks
  // Step 3: NPC population refresh (every 3rd day)
  // Step 4: Crafting job resolution
  // Step 5: Construction timer decrement
  // Step 6: Manor passive generation
  // Step 7: Daily counter resets
  // Step 8: Date increment
  throw new Error('runDayEndTick() not yet implemented');
}
