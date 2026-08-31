/**
 * dialogueEngine.ts
 * Branching dialogue tree traversal and condition evaluation.
 *
 * TODO (Task 10.5): Full implementation.
 */

import type { GameState, GameEvent } from '../state/gameState';

// ─── Schemas (PRD §4.11) ──────────────────────────────────────────────────────
export type DialogueCondition =
  | { type: 'FLAG';         flagId: string;     value: boolean }
  | { type: 'TRUST';        npcId: string;      min: number }
  | { type: 'LOVE';         npcId: string;      min: number }
  | { type: 'QUEST_STAGE';  questId: string;    stage: number }
  | { type: 'ITEM_IN_INV';  itemId: string }
  | { type: 'COMPANION';    companionId: string; inParty: boolean };

export interface DialogueChoice {
  label: string;
  nextNodeId: string;
  effects?: {
    flagsSet?: Record<string, boolean>;
    trustDelta?: number;
    loveDelta?: number;
  };
  condition?: DialogueCondition;
}

export interface DialogueNode {
  id: string;
  text: string;
  choices: DialogueChoice[];
  condition?: DialogueCondition;
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────
export function evaluateCondition(
  _gameState: GameState,
  _condition: DialogueCondition,
): boolean {
  throw new Error('evaluateCondition() not yet implemented');
}

export function getAvailableChoices(
  gameState: GameState,
  node: DialogueNode,
): DialogueChoice[] {
  // Filter choices whose conditions pass
  void gameState; void node;
  throw new Error('getAvailableChoices() not yet implemented');
}

export function applyChoiceEffects(
  _gameState: GameState,
  _choice: DialogueChoice,
  _npcId: string,
): { state: GameState; events: GameEvent[] } {
  throw new Error('applyChoiceEffects() not yet implemented');
}
