/**
 * gameStore.ts
 * Zustand store — single source of truth for the live GameState on the client.
 *
 * Rules:
 *   - Only `setGameState` mutates the store. No other writes.
 *   - All views subscribe via slice selectors (usePlayer, useParty, etc.) to
 *     avoid re-rendering unrelated parts of the UI on every server response.
 *   - The store holds null until the first GameState is received (loading state).
 *
 * Task UI-1.1
 */

import { create } from 'zustand';
import type { GameState } from '../../state/gameState';

interface GameStore {
  gameState: GameState | null;
  setGameState: (state: GameState) => void;
  clearGameState: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: null,
  setGameState: (state) => set({ gameState: state }),
  clearGameState: () => set({ gameState: null }),
}));
