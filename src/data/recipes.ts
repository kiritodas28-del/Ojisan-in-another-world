/**
 * recipes.ts
 * Static recipe catalog for the crafting engine.
 *
 * RecipeDef is defined in craftingEngine.ts (engine owns the type; data imports it).
 * This follows the same pattern as items.ts / statusEffects.ts.
 *
 * craftingTimePhases: phases until the job resolves at day-end.
 *   1 phase  = resolves same day if queued before Midnight tick
 *   5 phases = resolves next day (one full day cycle)
 *
 * requiredManorTier: global minimum tier for this recipe.
 *   All recipes need at least tier 2 (crafting bench unlocked).
 *   Higher-tier recipes need the workshop (tier 5) or alchemy lab (tier 4).
 *
 * Catalog breakdown (5 initial recipes):
 *   MATERIAL -> CONSUMABLE  2  (health potion, lubricant)
 *   MATERIAL -> WEAPON      1  (iron sword)
 *   MATERIAL -> ARMOR       2  (leather armor, chainmail)
 *
 * IDs must match itemIds in src/data/items.ts.
 * Ingredient itemIds must also exist in items.ts.
 */

import type { RecipeDef } from '../engines/craftingEngine';

export const RECIPE_CATALOG: Record<string, RecipeDef> = {

  // -- CONSUMABLE recipes ----------------------------------------------------

  'recipe_health_potion': {
    id:               'recipe_health_potion',
    name:             'Brew Health Potion',
    outputItemId:     'health_potion',
    outputQuantity:   1,
    craftingTimePhases: 5,   // one full day
    requiredManorTier: 2,
    ingredients: [
      { itemId: 'herb_basic', quantity: 3 },
    ],
  },

  'recipe_lubricant': {
    id:               'recipe_lubricant',
    name:             'Mix Lubricant',
    outputItemId:     'lubricant',
    outputQuantity:   2,
    craftingTimePhases: 3,   // less than a full day
    requiredManorTier: 2,
    ingredients: [
      { itemId: 'cloth_bolt',  quantity: 1 },
      { itemId: 'herb_basic',  quantity: 1 },
    ],
  },

  // -- WEAPON recipes --------------------------------------------------------

  'recipe_iron_sword': {
    id:               'recipe_iron_sword',
    name:             'Forge Iron Sword',
    outputItemId:     'iron_sword',
    outputQuantity:   1,
    craftingTimePhases: 10,  // two full days
    requiredManorTier: 2,
    ingredients: [
      { itemId: 'iron_ore', quantity: 5 },
    ],
  },

  // -- ARMOR recipes ---------------------------------------------------------

  'recipe_leather_armor': {
    id:               'recipe_leather_armor',
    name:             'Craft Leather Armor',
    outputItemId:     'leather_armor',
    outputQuantity:   1,
    craftingTimePhases: 5,   // one full day
    requiredManorTier: 2,
    ingredients: [
      { itemId: 'cloth_bolt', quantity: 3 },
    ],
  },

  'recipe_chainmail': {
    id:               'recipe_chainmail',
    name:             'Forge Chainmail',
    outputItemId:     'chainmail',
    outputQuantity:   1,
    craftingTimePhases: 15,  // three full days; heavier work
    requiredManorTier: 3,    // needs expanded workshop at tier 3
    ingredients: [
      { itemId: 'iron_ore', quantity: 8 },
    ],
  },
};
