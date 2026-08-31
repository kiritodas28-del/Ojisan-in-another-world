/**
 * useCombat.ts
 * Wraps useIntent for combat-specific intents.
 * Holds the local CombatState returned alongside GameState.
 *
 * CombatState is server-authoritative and returned alongside the updated
 * GameState on each FIGHT_ACTION response. It is stored locally here
 * (not in the Zustand GameState) because it is transient — it doesn't
 * persist across saves.
 *
 * Task UI-1.8
 */

import { useState, useCallback } from 'react';
import { useIntent } from './useIntent';
import type { CombatState, CombatAction } from '../../engines/combatEngine';

interface UseCombatResult {
  combatState: CombatState | null;
  sendCombatAction: (action: CombatAction) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useCombat(initialCombatState?: CombatState): UseCombatResult {
  const { sendIntent, loading, error } = useIntent();
  const [combatState, setCombatState] = useState<CombatState | null>(initialCombatState ?? null);

  const sendCombatAction = useCallback(
    async (action: CombatAction) => {
      // TODO (UI-10.1): receive updated CombatState from tRPC response alongside GameState
      await sendIntent({
        type: 'FIGHT_ACTION',
        actionId: action.skillId ?? action.type,
        targetId: action.targetId ?? '',
      });
      // Stub: CombatState will be updated from server response once tRPC is wired
    },
    [sendIntent],
  );

  return { combatState, sendCombatAction, loading, error };
}
