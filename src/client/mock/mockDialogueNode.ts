/**
 * mockDialogueNode.ts
 * A DialogueNode with 3 choices: one open, one trust-locked, one flag-locked.
 * Used to develop and test DialogueView without a running backend.
 * Task UI-2.4
 */

import type { DialogueNode } from '../../engines/dialogueEngine';

export const mockDialogueNode: DialogueNode = {
  id:   'dlg-elder-001',
  text: 'Ah, a traveller. What brings you to our humble village, stranger? We don\'t get many visitors since the wolves started coming down from the ridge.',
  choices: [
    {
      label:      'I\'m here to help with the wolf problem.',
      nextNodeId: 'dlg-elder-002',
      effects:    { trustDelta: 5 },
    },
    {
      label:      'Tell me about the miasma in the forest.',
      nextNodeId: 'dlg-elder-miasma',
      condition:  { type: 'TRUST', npcId: 'npc-elder', min: 20 },
      effects:    {},
    },
    {
      label:      '[Secret passage] I know about the ruins.',
      nextNodeId: 'dlg-elder-ruins',
      condition:  { type: 'FLAG', flagId: 'found_ruins_map', value: true },
      effects:    { trustDelta: 15 },
    },
  ],
};
