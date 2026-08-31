/**
 * quests.ts
 * Static quest definitions. All QuestDef records live here.
 * TODO: populate with actual quest data.
 */

import type { QuestDef } from '../engines/questEngine';

export const QUESTS: Record<string, QuestDef> = {
  // Example:
  // 'main_act1_ch1': {
  //   id: 'main_act1_ch1', type: 'MAIN', title: 'Arrival',
  //   objectives: [{ id: 'obj1', type: 'TRAVEL', targetId: 'village_square', count: 1 }],
  //   reward: { gold: 0, xp: 50, items: [], flagsSet: { act1_ch1_complete: true } },
  //   prerequisites: [],
  // },
};
