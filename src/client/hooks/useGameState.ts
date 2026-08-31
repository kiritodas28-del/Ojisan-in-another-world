/**
 * useGameState.ts
 * Returns the full live GameState. Use slice hooks (usePlayer, useParty, etc.)
 * in components to avoid over-subscribing.
 * Task UI-1.2
 */

import { useGameStore } from '../store/gameStore';
import type { GameState } from '../../state/gameState';

export function useGameState(): GameState | null {
  return useGameStore((s) => s.gameState);
}
