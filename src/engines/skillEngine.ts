/**
 * skillEngine.ts
 * Skill tree structure, point pools, prerequisite checking, CPW consumption.
 *
 * TODO (Task 10.6): Full implementation.
 */

import type { GameState, GameEvent } from '../state/gameState';

// ─── Schemas (PRD §4.12) ──────────────────────────────────────────────────────
export type SkillTree = 'BATTLE' | 'ARDOR';

export type SkillEffect =
  | { type: 'STAT_BOOST';        stat: string; value: number }
  | { type: 'DAMAGE_MULTIPLIER'; value: number }
  | { type: 'AROUSAL_GAIN';      value: number }
  | { type: 'STATUS_APPLY';      statusId: string; chance: number };

export interface SkillDef {
  id: string;
  tree: SkillTree;
  name: string;
  isPassive: boolean;
  cpwCost?: number;       // active skills only
  pointCost: number;      // BP (Battle) or AP (Ardor)
  prerequisites: string[];
  effects: SkillEffect[];
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────
export function canUnlockSkill(
  gameState: GameState,
  skillId: string,
  skillDefs: Record<string, SkillDef>,
): boolean {
  void gameState; void skillId; void skillDefs;
  throw new Error('canUnlockSkill() not yet implemented');
}

export function unlockSkill(
  _gameState: GameState,
  _skillId: string,
  _skillDefs: Record<string, SkillDef>,
): { state: GameState; events: GameEvent[] } {
  throw new Error('unlockSkill() not yet implemented');
}

export function consumeCpw(
  _gameState: GameState,
  _amount: number,
): GameState {
  throw new Error('consumeCpw() not yet implemented');
}
