/**
 * items.ts
 * Static item catalog. All ItemDef records live here.
 * TODO: populate with actual game items.
 */

import type { ItemDef } from '../engines/economyEngine';

export const ITEMS: Record<string, ItemDef> = {
  // Example:
  // 'herb_basic': {
  //   id: 'herb_basic', name: 'Basic Herb', type: 'CONSUMABLE',
  //   stackMax: 20, baseBuyValue: 10, baseSellValue: 5,
  //   effects: [{ type: 'HP_RESTORE', value: 30 }],
  // },
};
