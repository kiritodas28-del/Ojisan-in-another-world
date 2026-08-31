/**
 * useIntimacy.ts
 * Wraps useIntent for intimacy-specific intents.
 * Holds the local IntimacyScene returned alongside GameState.
 *
 * Like CombatState, IntimacyScene is transient — not persisted in GameState
 * between saves. It lives here for the duration of the scene.
 *
 * Task UI-1.9
 */

import { useState, useCallback } from 'react';
import { useIntent } from './useIntent';
import type { IntimacyScene } from '../../engines/intimacyEngine';

interface UseIntimacyResult {
  scene: IntimacyScene | null;
  sendAction: (actionId: string, positionId: string, targetNpcId: string) => Promise<void>;
  endScene: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useIntimacy(initialScene?: IntimacyScene): UseIntimacyResult {
  const { sendIntent, loading, error } = useIntent();
  const [scene, setScene] = useState<IntimacyScene | null>(initialScene ?? null);

  const sendAction = useCallback(
    async (actionId: string, positionId: string, targetNpcId: string) => {
      // TODO (UI-10.1): receive updated IntimacyScene from tRPC response
      await sendIntent({ type: 'INTIMACY_ACTION', actionId, positionId, targetNpcId });
    },
    [sendIntent],
  );

  const endScene = useCallback(async () => {
    // TODO: define END_SCENE intent or handle via scene status flag
    setScene(null);
  }, []);

  return { scene, sendAction, endScene, loading, error };
}
