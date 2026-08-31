/**
 * manorEngine.ts
 * Manor tier upgrades, construction timers, suite assignment, passive resource generation.
 *
 * TODO (Task 10.10): Full implementation.
 *
 * Tier feature unlock table (PRD §4.17):
 *   Tier 1: Basic storage (20 slots), player bedroom
 *   Tier 2: Crafting bench, 1 suite
 *   Tier 3: 3 suites, expanded storage (+10 slots)
 *   Tier 4: Alchemy Lab (guided upgrades), 5 suites
 *   Tier 5: Workshop, 8 suites
 *   Tier 6: Full estate, unlimited suites
 */

import type { GameState, ManorState, GameEvent } from '../state/gameState';

// ─── Tier definitions ─────────────────────────────────────────────────────────
export interface ManorTierDef {
  tier: number;
  suiteCount: number | 'unlimited';
  features: string[];
  constructionCostGold: number;
  constructionDays: number;
}

export const MANOR_TIERS: ManorTierDef[] = [
  { tier: 1, suiteCount: 0,           features: ['basic_storage', 'player_bedroom'],         constructionCostGold: 0,     constructionDays: 0  },
  { tier: 2, suiteCount: 1,           features: ['crafting_bench'],                           constructionCostGold: 500,   constructionDays: 3  },
  { tier: 3, suiteCount: 3,           features: ['expanded_storage'],                         constructionCostGold: 1500,  constructionDays: 5  },
  { tier: 4, suiteCount: 5,           features: ['alchemy_lab'],                              constructionCostGold: 4000,  constructionDays: 7  },
  { tier: 5, suiteCount: 8,           features: ['workshop'],                                 constructionCostGold: 10000, constructionDays: 10 },
  { tier: 6, suiteCount: 'unlimited', features: ['full_estate'],                              constructionCostGold: 25000, constructionDays: 14 },
];

// ─── Engine entry points (stubs) ──────────────────────────────────────────────
export function startUpgrade(
  _gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  throw new Error('startUpgrade() not yet implemented');
}

/** Day-end: decrement construction timer; complete tier upgrade when timer hits 0. */
export function tickConstruction(gameState: GameState): GameState {
  const manor: ManorState = { ...gameState.manor };
  if (manor.constructionTimerDays > 0) {
    manor.constructionTimerDays -= 1;
    if (manor.constructionTimerDays === 0) {
      manor.tier = Math.min(6, manor.tier + 1);
    }
  }
  return { ...gameState, manor };
}

/** Day-end: generate passive resources from suite occupants. */
export function generatePassiveResources(
  _gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  throw new Error('generatePassiveResources() not yet implemented');
}

export function assignSuite(
  _gameState: GameState,
  _suiteId: string,
  _contactId: string,
): GameState {
  throw new Error('assignSuite() not yet implemented');
}
