/**
 * mockDialogueNode.ts
 * A DialogueNode with 3 choices: one open, one trust-locked, one flag-locked.
 * Used to develop and test DialogueView without a running backend.
 *
 * Updated for Phase 13 full schema: speakerId and onEnter fields added.
 * Types now imported from gameState.ts (canonical location); re-export from
 * dialogueEngine.ts also works for backward compat.
 *
 * Task UI-2.4 / Task 13.23
 */

import type { DialogueNode } from '../../state/gameState';

export const mockDialogueNode: DialogueNode = {
  id:        'dlg-elder-001',
  speakerId: 'npc-elder',   // Phase 13: canonical speaker field
  onEnter:   [],             // Phase 13: no entry effects on this node
  text: "Ah, a traveller. What brings you to our humble village, stranger? We don't get many visitors since the wolves started coming down from the ridge.",
  choices: [
    {
      label:      "I'm here to help with the wolf problem.",
      nextNodeId: 'dlg-elder-002',
      effects:    [{ type: 'TRUST_DELTA', npcId: 'npc-elder', delta: 5 }],
    },
    {
      label:      'Tell me about the miasma in the forest.',
      nextNodeId: 'dlg-elder-miasma',
      condition:  { type: 'TRUST', npcId: 'npc-elder', min: 20 },
      effects:    [],
    },
    {
      label:      '[Secret passage] I know about the ruins.',
      nextNodeId: 'dlg-elder-ruins',
      condition:  { type: 'FLAG', flagId: 'found_ruins_map', value: true },
      effects:    [{ type: 'TRUST_DELTA', npcId: 'npc-elder', delta: 15 }],
    },
  ],
};
