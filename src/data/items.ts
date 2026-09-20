/**
 * items.ts
 * Static item catalog — all ItemDef records.
 *
 * ItemEffect type union (Phase 12, Task 12.1):
 *   HEAL         restore hp.current by `value`; no stat field
 *   STAT_BOOST   add `value` to combat stat named in `stat` for remainder of scene/fight
 *   STATUS_APPLY apply status effect with defId = `stat`; chance = `value` (0-1)
 *                STATUS_APPLY is deferred to Phase 14; consumeItem() logs a warning
 *                instead of crashing.
 *
 * Catalog breakdown (20 items):
 *   CONSUMABLE  5  -- heal potion + 4 intimacy consumables
 *   MATERIAL    3  -- crafting feedstock
 *   GIFT        2  -- giveGift() uses these; love delta from effects
 *   TOOL        6  -- intimacy toys/implements; non-stackable, reusable
 *   WEAPON      2  -- stubs for Phase 15 equipment system
 *   ARMOR       2  -- stubs for Phase 15 equipment system
 *
 * IDs must match any references already present in mockGameState.ts inventory.
 */

import type { ItemDef } from '../engines/economyEngine';

export const ITEMS: Record<string, ItemDef> = {

  // ── CONSUMABLE ─────────────────────────────────────────────────────────────

  'health_potion': {
    id: 'health_potion', name: 'Health Potion',
    type: 'CONSUMABLE', stackMax: 10,
    baseBuyValue: 50, baseSellValue: 25,
    effects: [{ type: 'HEAL', value: 50 }],
  },

  // Intimacy consumables (referenced in intimacyCatalog.ts requiredItems)
  'condom': {
    id: 'condom', name: 'Condom',
    type: 'CONSUMABLE', stackMax: 20,
    baseBuyValue: 10, baseSellValue: 3,
    effects: [],  // effect handled inline by intimacyEngine (pregnancy gate)
  },

  'aphrodisiac_gel': {
    id: 'aphrodisiac_gel', name: 'Aphrodisiac Gel',
    type: 'CONSUMABLE', stackMax: 10,
    baseBuyValue: 80, baseSellValue: 40,
    effects: [],  // effect handled inline by intimacyEngine (resistance -15, arousal +20)
  },

  'lubricant': {
    id: 'lubricant', name: 'Lubricant',
    type: 'CONSUMABLE', stackMax: 10,
    baseBuyValue: 30, baseSellValue: 12,
    effects: [],  // effect handled inline by intimacyEngine (lubrication step-up)
  },

  'diuretic': {
    id: 'diuretic', name: 'Diuretic',
    type: 'CONSUMABLE', stackMax: 5,
    baseBuyValue: 120, baseSellValue: 60,
    effects: [],  // effect handled inline by intimacyEngine (squirt probability +0.30)
  },

  // ── MATERIAL ───────────────────────────────────────────────────────────────

  'herb_basic': {
    id: 'herb_basic', name: 'Basic Herb',
    type: 'MATERIAL', stackMax: 30,
    baseBuyValue: 10, baseSellValue: 5,
    effects: [],
  },

  'iron_ore': {
    id: 'iron_ore', name: 'Iron Ore',
    type: 'MATERIAL', stackMax: 20,
    baseBuyValue: 20, baseSellValue: 10,
    effects: [],
  },

  'cloth_bolt': {
    id: 'cloth_bolt', name: 'Cloth Bolt',
    type: 'MATERIAL', stackMax: 10,
    baseBuyValue: 15, baseSellValue: 7,
    effects: [],
  },

  // ── GIFT ──────────────────────────────────────────────────────────────────
  // giveGift() reads the GIFT_LOVE effect value as the love delta bonus on top
  // of resolveGift()'s base +15 love / +10 trust. A higher-value gift item
  // therefore grants more love than the base amount.

  'gift_flower': {
    id: 'gift_flower', name: 'Wildflower Bouquet',
    type: 'GIFT', stackMax: 5,
    baseBuyValue: 25, baseSellValue: 5,
    effects: [{ type: 'GIFT_LOVE', value: 5 }],   // +5 love bonus on top of resolveGift() base
  },

  'gift_gem': {
    id: 'gift_gem', name: 'Polished Gemstone',
    type: 'GIFT', stackMax: 3,
    baseBuyValue: 200, baseSellValue: 80,
    effects: [{ type: 'GIFT_LOVE', value: 20 }],  // +20 love bonus on top of base (premium gift)
  },

  // ── TOOL (intimacy implements — non-stackable, reusable) ───────────────────

  'riding_crop': {
    id: 'riding_crop', name: 'Riding Crop',
    type: 'TOOL', stackMax: 1,
    baseBuyValue: 60, baseSellValue: 25,
    effects: [],
  },

  'blindfold': {
    id: 'blindfold', name: 'Silk Blindfold',
    type: 'TOOL', stackMax: 1,
    baseBuyValue: 40, baseSellValue: 15,
    effects: [],
  },

  // rope: consumable capture item; one unit is consumed per successful monster capture.
  // Unlike rope_silk (a reusable intimacy tool), rope is a MATERIAL that is spent on capture.
  // Must be in the player's inventory when sending a CAPTURE_MONSTER intent; tamingEngine
  // calls removeItem(state, 'rope', 1, 'USED') on successful capture.
  'rope': {
    id: 'rope', name: 'Rope',
    type: 'MATERIAL', stackMax: 10,
    baseBuyValue: 30, baseSellValue: 12,
    effects: [],
  },

  'rope_silk': {
    id: 'rope_silk', name: 'Silk Rope',
    type: 'TOOL', stackMax: 1,
    baseBuyValue: 90, baseSellValue: 40,
    effects: [],  // also enables bondage actions in intimacyCatalog
  },

  'vibration_wand': {
    id: 'vibration_wand', name: 'Vibration Wand',
    type: 'TOOL', stackMax: 1,
    baseBuyValue: 150, baseSellValue: 70,
    effects: [],
  },

  'candle_wax': {
    id: 'candle_wax', name: 'Wax Candle',
    type: 'TOOL', stackMax: 5,
    baseBuyValue: 20, baseSellValue: 8,
    effects: [],
  },

  'clamps': {
    id: 'clamps', name: 'Nipple Clamps',
    type: 'TOOL', stackMax: 1,
    baseBuyValue: 55, baseSellValue: 22,
    effects: [],
  },

  // ── WEAPON (stubs — full equipment stats wired in Phase 15) ───────────────

  'iron_sword': {
    id: 'iron_sword', name: 'Iron Sword',
    type: 'WEAPON', stackMax: 1,
    baseBuyValue: 120, baseSellValue: 55,
    effects: [{ type: 'STAT_BOOST', stat: 'str', value: 5 }],
  },

  'staff_oak': {
    id: 'staff_oak', name: 'Oak Staff',
    type: 'WEAPON', stackMax: 1,
    baseBuyValue: 100, baseSellValue: 45,
    effects: [{ type: 'STAT_BOOST', stat: 'wis', value: 5 }],
  },

  // ── ARMOR (stubs — full equipment stats wired in Phase 15) ────────────────

  'leather_armor': {
    id: 'leather_armor', name: 'Leather Armor',
    type: 'ARMOR', stackMax: 1,
    baseBuyValue: 90, baseSellValue: 40,
    effects: [{ type: 'STAT_BOOST', stat: 'def', value: 4 }],
  },

  'chainmail': {
    id: 'chainmail', name: 'Chainmail',
    type: 'ARMOR', stackMax: 1,
    baseBuyValue: 180, baseSellValue: 80,
    effects: [{ type: 'STAT_BOOST', stat: 'def', value: 8 }],
  },
};
