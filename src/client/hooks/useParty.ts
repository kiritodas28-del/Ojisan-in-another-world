/**
 * useParty.ts
 * Subscribes only to the party slice of GameState.
 * Task UI-1.4
 */

import { useGameStore } from '../store/gameStore';
import type { PartyState } from '../../state/gameState';

export function useParty(): PartyState | null {
  return useGameStore((s) => s.gameState?.party ?? null);
}
