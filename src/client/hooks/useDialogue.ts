/**
 * useDialogue.ts
 * Holds the current DialogueNode and provides choose(choiceId).
 * Task UI-1.10
 */

import { useState, useCallback } from 'react';
import { useIntent } from './useIntent';
import type { DialogueNode } from '../../engines/dialogueEngine';

interface UseDialogueResult {
  node: DialogueNode | null;
  setNode: (node: DialogueNode) => void;
  choose: (choiceId: string, npcId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useDialogue(): UseDialogueResult {
  const { sendIntent, loading, error } = useIntent();
  const [node, setNode] = useState<DialogueNode | null>(null);

  const choose = useCallback(
    async (choiceId: string, npcId: string) => {
      // TODO (UI-10.1): server returns next DialogueNode alongside GameState
      await sendIntent({ type: 'TALK', npcId, choiceId });
    },
    [sendIntent],
  );

  return { node, setNode, choose, loading, error };
}
