/**
 * pregnancyEngine.ts
 * Gestation tracking, conception checks, birth logic, offspring generation.
 *
 * TODO (Task 10.9): Full implementation.
 *
 * Gestation: 12 in-game weeks (PRD §4.16)
 * Stage → week mapping:
 *   NotPregnant    = 0
 *   EarlyFirst     = 1–2
 *   LateFirst      = 3–4
 *   EarlySecond    = 5–6
 *   LateSecond     = 7–8
 *   EarlyThird     = 9–10
 *   LateThird      = 11
 *   FullTerm       = 12 → triggers birth at day-end
 *
 * Conception check (day-end, if vaginal creampie occurred):
 *   conceptionChance = fertilityRating / 100
 *
 * Offspring stat gen: average of parent combat stats at birth ± 10% random variance
 * Alignment roll: Normal 34%, Troubled 33%, Criminal 33%
 */

import type { GameState, GameEvent } from '../state/gameState';

// ─── Pregnancy stage ──────────────────────────────────────────────────────────
export type PregnancyStage =
  | 'NotPregnant'
  | 'EarlyFirst'
  | 'LateFirst'
  | 'EarlySecond'
  | 'LateSecond'
  | 'EarlyThird'
  | 'LateThird'
  | 'FullTerm';

export function weekToStage(week: number): PregnancyStage {
  if (week === 0)  return 'NotPregnant';
  if (week <= 2)   return 'EarlyFirst';
  if (week <= 4)   return 'LateFirst';
  if (week <= 6)   return 'EarlySecond';
  if (week <= 8)   return 'LateSecond';
  if (week <= 10)  return 'EarlyThird';
  if (week === 11) return 'LateThird';
  return 'FullTerm';
}

// ─── Offspring types ───────────────────────────────────────────────────────────
export type OffspringAlignment = 'Normal' | 'Troubled' | 'Criminal';

export interface OffspringProfile {
  id: string;
  motherId: string;
  fatherId: string;
  bornOnDay: number;
  alignment: OffspringAlignment;
  baseStats: { str: number; agi: number; wis: number; def: number; lck: number };
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────

/** Day-end: advances pregnancyWeek for all pregnant contacts; triggers birth at FullTerm. */
export function tickPregnancies(
  _gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  throw new Error('tickPregnancies() not yet implemented');
}

/** Day-end: runs conception check for eligible contacts. */
export function runConceptionChecks(
  _gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  throw new Error('runConceptionChecks() not yet implemented');
}

export function rollConceptionChance(fertilityRating: number): boolean {
  return Math.random() < fertilityRating / 100;
}

export function generateOffspring(
  _motherId: string,
  _fatherId: string,
  _motherStats: Record<string, number>,
  _fatherStats: Record<string, number>,
  _bornOnDay: number,
): OffspringProfile {
  throw new Error('generateOffspring() not yet implemented');
}

export function rollAlignment(): OffspringAlignment {
  const r = Math.random();
  if (r < 0.34) return 'Normal';
  if (r < 0.67) return 'Troubled';
  return 'Criminal';
}
