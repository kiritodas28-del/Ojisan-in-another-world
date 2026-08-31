/**
 * usePlayer.ts
 * Subscribes only to the player slice of GameState.
 * Components using this hook re-render only when player data changes.
 * Task UI-1.3
 */

import { useGameStore } from '../store/gameStore';
import type { PlayerCharacter } from '../../state/gameState';

export function usePlayer(): PlayerCharacter | null {
  return useGameStore((s) => s.gameState?.player ?? null);
}
