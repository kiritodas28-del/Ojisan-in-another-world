/**
 * useCalendar.ts
 * Subscribes only to the calendar slice of GameState.
 * Task UI-1.5
 */

import { useGameStore } from '../store/gameStore';
import type { CalendarState } from '../../state/gameState';

export function useCalendar(): CalendarState | null {
  return useGameStore((s) => s.gameState?.calendar ?? null);
}
