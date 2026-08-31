/**
 * statusEffectEngine.ts
 * Per-turn status effect ticking, stacking, and expiry.
 *
 * TODO (Task 10.7): Full implementation.
 */

import type { GameState } from '../state/gameState';
import type { ActiveStatusEffect } from '../state/gameState';

// ─── Schemas (PRD §4.13) ──────────────────────────────────────────────────────
export interface StatusTickEffect {
  type: 'HP_DELTA' | 'STAT_MODIFIER' | 'AROUSAL_DELTA';
  value: number;
  stat?: string;
}

export interface StatusEffectDef {
  id: string;
  name: string;
  maxStacks: number;
  duration: number;    // turns
  onTick: StatusTickEffect[];
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────

/** Applies one tick to all active status effects on the player; removes expired ones. */
export function tickStatusEffects(
  _gameState: GameState,
): GameState {
  throw new Error('tickStatusEffects() not yet implemented');
}

/** Applies or stacks a status effect on the player (or a given combatant). */
export function applyStatusEffect(
  _activeEffects: ActiveStatusEffect[],
  _defId: string,
  _defs: Record<string, StatusEffectDef>,
): ActiveStatusEffect[] {
  // Refresh duration; increment stacks up to maxStacks
  throw new Error('applyStatusEffect() not yet implemented');
}
