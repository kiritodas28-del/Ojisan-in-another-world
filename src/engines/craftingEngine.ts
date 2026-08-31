/**
 * craftingEngine.ts
 * Recipe loading, crafting job queue, equipment upgrade resolution.
 *
 * TODO (Task 10.4): Full implementation.
 *
 * Upgrade stat bonus: +1 to all item stat values per tier (e.g. +2 sword base ATK 10 → effective ATK 12)
 * Upgrade failure rates (PRD §4.9):
 *   Forge:       +0→+1: 0%, +1→+2: 15%, +2→+3: 30%
 *   Alchemy Lab: halved (requires Manor tier 4+)
 *   On failure: item stays at current tier; no destruction.
 */

import type { GameState, GameEvent } from '../state/gameState';

// ─── Recipe schema ────────────────────────────────────────────────────────────
export interface RecipeIngredient {
  itemId: string;
  qty: number;
}

export interface RecipeDef {
  id: string;
  outputItemId: string;
  outputQty: number;
  ingredients: RecipeIngredient[];
  durationDays: number;   // resolved at day-end
  requiredManorTier: number;
}

// ─── Upgrade failure rates ────────────────────────────────────────────────────
export const FORGE_FAILURE_RATES: Record<number, number> = {
  0: 0.00,  // +0 → +1
  1: 0.15,  // +1 → +2
  2: 0.30,  // +2 → +3
};

export function getUpgradeFailureRate(currentTier: number, useAlchemyLab: boolean): number {
  const base = FORGE_FAILURE_RATES[currentTier] ?? 0;
  return useAlchemyLab ? base / 2 : base;
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────
export function startCraftingJob(
  _gameState: GameState,
  _recipeId: string,
): { state: GameState; events: GameEvent[] } {
  throw new Error('startCraftingJob() not yet implemented');
}

export function resolveCraftingJobs(gameState: GameState): GameState {
  // Called by calendarEngine day-end tick step 4
  // TODO (Task 10.4): Decrement timers; complete finished jobs and add items to inventory
  return gameState;
}

export function attemptEquipmentUpgrade(
  _gameState: GameState,
  _itemInstanceId: string,
  _useAlchemyLab: boolean,
): { state: GameState; success: boolean; events: GameEvent[] } {
  throw new Error('attemptEquipmentUpgrade() not yet implemented');
}
