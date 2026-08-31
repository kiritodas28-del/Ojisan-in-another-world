/**
 * questEngine.ts
 * Quest loading, objective tracking, reward granting, cooldown resolution.
 *
 * TODO (Task 10.2): Full implementation.
 */

import type { GameState, GameEvent } from '../state/gameState';

// ─── Schemas (from PRD §4.6) ──────────────────────────────────────────────────
export type ObjectiveType = 'KILL' | 'COLLECT' | 'TALK' | 'INTERACT' | 'ESCORT' | 'TRAVEL';
export type QuestType     = 'MAIN' | 'COMPANION' | 'BOARD';

export interface ObjectiveDef {
  id: string;
  type: ObjectiveType;
  targetId: string;
  count: number;
}

export interface QuestReward {
  gold: number;
  xp: number;
  items: string[];
  flagsSet: Record<string, boolean>;
}

export interface QuestDef {
  id: string;
  type: QuestType;
  title: string;
  objectives: ObjectiveDef[];
  reward: QuestReward;
  prerequisites: string[];   // quest IDs that must be completed first
  cooldownDays?: number;     // repeatable quests only (in-game days)
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────
export function updateQuestObjective(
  _gameState: GameState,
  _questId: string,
  _objectiveId: string,
  _increment: number,
): { state: GameState; events: GameEvent[] } {
  throw new Error('updateQuestObjective() not yet implemented');
}

export function grantQuestReward(
  _gameState: GameState,
  _questId: string,
): { state: GameState; events: GameEvent[] } {
  throw new Error('grantQuestReward() not yet implemented');
}

/** Decrements cooldownDayRemaining for all repeatable quests. Called by calendarEngine step 7. */
export function tickQuestCooldowns(gameState: GameState): GameState {
  const quests = {
    ...gameState.quests,
    active: gameState.quests.active.map(q =>
      q.cooldownDayRemaining !== undefined
        ? { ...q, cooldownDayRemaining: Math.max(0, q.cooldownDayRemaining - 1) }
        : q,
    ),
  };
  return { ...gameState, quests };
}
