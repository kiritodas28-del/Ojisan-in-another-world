/**
 * useIntent.ts
 * Sends a PlayerIntent to the tRPC router and updates the Zustand store
 * with the returned GameState. Exposes loading and error state.
 *
 * Views never import tRPC directly — they always go through this hook.
 *
 * When VITE_USE_MOCK=true the hook short-circuits and returns the mock
 * GameState unchanged (no network call). Swap the mock branch for the real
 * tRPC call at Task UI-10.1.
 *
 * Task UI-1.7
 */

import { useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import type { PlayerIntent } from '../../engines/dispatcher';
import type { GameState } from '../../state/gameState';

interface UseIntentResult {
  sendIntent: (intent: PlayerIntent) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useIntent(): UseIntentResult {
  const setGameState = useGameStore((s) => s.setGameState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendIntent = useCallback(
    async (intent: PlayerIntent) => {
      setLoading(true);
      setError(null);
      try {
        if (import.meta.env.VITE_USE_MOCK === 'true') {
          // Mock mode: no-op — views render from the store loaded by App.tsx
          // TODO (UI-10.1): replace with real tRPC call
          return;
        }

        // TODO (UI-10.1): wire to real tRPC client
        // const result = await trpc.sendIntent.mutate({ state: currentState, intent });
        // setGameState(result.state);
        throw new Error('Live tRPC not yet wired (UI-10.1). Run with VITE_USE_MOCK=true.');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    },
    [setGameState],
  );

  return { sendIntent, loading, error };
}
