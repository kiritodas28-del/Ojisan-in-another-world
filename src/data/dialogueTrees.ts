/**
 * dialogueTrees.ts
 * Dialogue tree catalog. All authored tree data lives here.
 *
 * DialogueTree type is owned by gameState.ts (canonical schema location).
 * getDialogueTree() is the single lookup entry point used by dialogueEngine.ts.
 *
 * STUB TREES (task 13.18):
 *   generic_intro       -- 1 node; 2 choices (greet / dismiss)
 *   elara_companion_ch1 -- 3 nodes; trust-locked branch at node 2
 *   quest_board_intro   -- 2 nodes; START_QUEST effect on choice 1
 *
 * Stub text is placeholder only. Authored content deferred to lore/world doc
 * review session (same policy as tasks 11.5, 16.4, 17.DATA, 20.4).
 *
 * Task 13.18
 */

import type { DialogueTree } from '../state/gameState';

// ─── Catalog ──────────────────────────────────────────────────────────────────

export const DIALOGUE_TREES: Record<string, DialogueTree> = {

  // ── Generic NPC intro tree ────────────────────────────────────────────────
  // Used as the fallback for any NPC class without a companion-specific tree.
  generic_intro: {
    id:         'generic_intro',
    rootNodeId: 'gi_root',
    nodes: {
      gi_root: {
        id:        'gi_root',
        text:      '[Generic NPC intro — content pending lore review session.]',
        speakerId: 'npc', // caller replaces with actual npcId at render time
        choices: [
          {
            label:      'Greetings.',
            nextNodeId: 'gi_greet',
            effects:    [{ type: 'TRUST_DELTA', npcId: '', delta: 1 }],
            // npcId on TRUST_DELTA is filled dynamically by dispatcher using speakerNpcId
          },
          {
            label:      'Never mind.',
            nextNodeId: 'END',
          },
        ],
      },
      gi_greet: {
        id:        'gi_greet',
        text:      '[Generic NPC greeting response — content pending.]',
        speakerId: 'npc',
        choices: [
          {
            label:      'Goodbye.',
            nextNodeId: 'END',
          },
        ],
      },
    },
  },

  // ── Elara companion chapter 1 tree ────────────────────────────────────────
  // Trust-locked branch at node 2 (requires trust >= 40).
  elara_companion_ch1: {
    id:         'elara_companion_ch1',
    rootNodeId: 'elara_ch1_root',
    nodes: {
      elara_ch1_root: {
        id:        'elara_ch1_root',
        text:      '[Elara chapter 1 opening — content pending lore review session.]',
        speakerId: 'npc_elara',
        choices: [
          {
            label:      'Tell me about yourself.',
            nextNodeId: 'elara_ch1_about',
          },
          {
            label:      '[Trust] I need to ask you something personal.',
            nextNodeId: 'elara_ch1_personal',
            condition:  { type: 'TRUST', npcId: 'npc_elara', min: 40 },
          },
          {
            label:      'That\'s all for now.',
            nextNodeId: 'END',
          },
        ],
      },
      elara_ch1_about: {
        id:        'elara_ch1_about',
        text:      '[Elara self-introduction — content pending.]',
        speakerId: 'npc_elara',
        choices: [
          {
            label:      'Goodbye.',
            nextNodeId: 'END',
          },
        ],
      },
      elara_ch1_personal: {
        id:        'elara_ch1_personal',
        text:      '[Elara personal conversation — content pending.]',
        speakerId: 'npc_elara',
        onEnter:   [{ type: 'TRUST_DELTA', npcId: 'npc_elara', delta: 3 }],
        choices: [
          {
            label:      'Thank you for telling me.',
            nextNodeId: 'END',
            effects:    [{ type: 'LOVE_DELTA', npcId: 'npc_elara', delta: 2 }],
          },
        ],
      },
    },
  },

  // ── Quest board intro tree ────────────────────────────────────────────────
  // Choice 1 starts the first board quest (stub questDefId).
  quest_board_intro: {
    id:         'quest_board_intro',
    rootNodeId: 'qb_root',
    nodes: {
      qb_root: {
        id:        'qb_root',
        text:      '[Quest board notice — content pending lore review session.]',
        speakerId: 'player',
        choices: [
          {
            label:      'Accept the wolf hunt request.',
            nextNodeId: 'qb_accepted',
            effects:    [{ type: 'START_QUEST', questDefId: 'board_wolf_hunt' }],
          },
          {
            label:      'Walk away.',
            nextNodeId: 'END',
          },
        ],
      },
      qb_accepted: {
        id:        'qb_accepted',
        text:      '[Quest accepted acknowledgement — content pending.]',
        speakerId: 'player',
        choices: [
          {
            label:      'Time to get to work.',
            nextNodeId: 'END',
          },
        ],
      },
    },
  },
};

// ─── Lookup ───────────────────────────────────────────────────────────────────

/**
 * Returns the DialogueTree for the given id.
 * Throws a descriptive error on unknown ids.
 * Called by dialogueEngine.startDialogue() and makeChoice().
 */
export function getDialogueTree(treeId: string): DialogueTree {
  const tree = DIALOGUE_TREES[treeId];
  if (!tree) {
    throw new Error(
      `getDialogueTree: unknown tree id '${treeId}'. ` +
      `Available trees: ${Object.keys(DIALOGUE_TREES).join(', ')}`,
    );
  }
  return tree;
}
