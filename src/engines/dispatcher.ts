/**
 * dispatcher.ts
 * Central engine dispatcher — routes player intents to the correct engine(s)
 * and processes the resulting event queue.
 *
 * TODO (Task 3.5): Implement full intent routing and event pipeline.
 *
 * Intent → Engine routing table (from PRD §2.2):
 *
 *   MOVE                → World/Pathing  → (encounter roll) → Combat
 *   TALK                → Dialogue       → Relationship flags
 *   FIGHT_ACTION        → Combat         → Status Effects
 *   INTIMACY_ACTION     → Intimacy       → Relationship, Pregnancy
 *   USE_ITEM            → Economy/Inventory
 *   GIVE_GIFT           → Economy, Relationship
 *   SLEEP               → Calendar       → HP/Stamina/CPW restore
 *   ADVANCE_PHASE       → Calendar       → Status tick, NPC refresh
 *   CRAFT               → Crafting
 *   BUILD               → Manor
 *   SAVE                → Save/Load
 */

import type { GameState, GameEvent } from '../state/gameState';

// ─── Intent union type ────────────────────────────────────────────────────────
export type PlayerIntent =
  | { type: 'MOVE';             targetLocationId: string; useFastTravel: boolean }
  | { type: 'TALK';             npcId: string; choiceId?: string }
  | { type: 'FIGHT_ACTION';     actionId: string; targetId: string }
  | { type: 'INTIMACY_ACTION';  actionId: string; positionId: string; targetNpcId: string }
  | { type: 'USE_ITEM';         itemId: string; targetId?: string }
  | { type: 'GIVE_GIFT';        itemId: string; npcId: string }
  | { type: 'SLEEP' }
  | { type: 'ADVANCE_PHASE' }
  | { type: 'CRAFT';            recipeId: string }
  | { type: 'BUILD';            upgradeId: string }
  | { type: 'SAVE';             slotIndex: number };

// ─── Dispatch result ──────────────────────────────────────────────────────────
export interface DispatchResult {
  state: GameState;
  events: GameEvent[];
  narrative: string[];  // text lines to display to the player
}

// ─── Main dispatcher ──────────────────────────────────────────────────────────
export function dispatch(state: GameState, intent: PlayerIntent): DispatchResult {
  // TODO (Task 3.5): Route intent to engine, collect events, process event queue
  throw new Error(`dispatch() not yet implemented for intent type: ${intent.type}`);
}

// ─── Event queue processor ────────────────────────────────────────────────────
/**
 * After each primary engine resolves, the dispatcher processes all emitted
 * GameEvents in order, applying side effects to engines in the correct sequence.
 *
 * TODO (Task 3.6): Implement event queue processing.
 */
function processEventQueue(state: GameState, events: GameEvent[]): GameState {
  // TODO: handle each event type
  return state;
}
