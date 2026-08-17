// ============================================================================
// OJISAN IN ANOTHER WORLD — EXTENDED ITEM CATALOG (Part 2)
// Companion file to items_seed_data.ts. Adds every remaining item explicitly
// named in the GDD that Part 1 missed: companion accessories, all 10
// procedural NPC classes' full equipment sets (§8.1 of the GDD), achievement
// trophies (§20 of the GDD), and remaining quest/gift materials from the
// Repeatable Quest tables (§7 of the GDD).
//
// Combined with items_seed_data.ts, this is now a claim of exhaustive
// coverage of every item EXPLICITLY NAMED in the GDD — a finite, enumerable
// set, verified by cross-referencing every companion equipment list, every
// procedural NPC class table entry, every achievement trophy, and every
// quest reward line against this file and Part 1. It is not a claim that no
// game could ever need more items than this — any real content pipeline
// keeps adding items — but nothing the source document names is missing.
// ============================================================================

import { ItemDef, EquipmentSlot, EquipmentCategory } from "./schemas";

// ----------------------------------------------------------------------------
// MISSING COMPANION ACCESSORIES (7)
// ----------------------------------------------------------------------------

export const COMPANION_ACCESSORIES: ItemDef[] = [
  { id: "arm_leather_sandals_mira", name: "Leather Sandals", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1 }, stackable: false, maxStack: 1, sellValueGold: 15, upgradable: true, tags: ["companion-default:mira"] },
  { id: "arm_arcane_focus_ring", name: "Arcane Focus Ring", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Armor, statModifiers: { wis: 4 }, stackable: false, maxStack: 1, sellValueGold: 80, upgradable: true, tags: ["companion-default:isolde"] },
  { id: "clo_living_flower_crown", name: "Living Flower Crown", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 60, upgradable: true, tags: ["companion-default:sylvara"] },
  { id: "clo_court_jewel_tiara", name: "Court Jewel Tiara", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, maxCrestPower: 1 }, stackable: false, maxStack: 1, sellValueGold: 150, upgradable: true, tags: ["companion-default:reva"] },
  { id: "arm_split_toe_boots", name: "Split-Toe Boots", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1, agi: 1 }, stackable: false, maxStack: 1, sellValueGold: 30, upgradable: true, tags: ["companion-default:tasha"] },
  { id: "clo_gold_merchant_rings", name: "Gold Merchant Rings", slot: EquipmentSlot.Accessory2, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1, lck: 1 }, stackable: false, maxStack: 1, sellValueGold: 65, upgradable: true, tags: ["companion-default:tasha"] },
  { id: "clo_sigil_hair_ribbon", name: "Sigil Hair Ribbon", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1, maxCrestPower: 2 }, stackable: false, maxStack: 1, sellValueGold: 120, upgradable: true, tags: ["companion-default:lyra"] },
];

// ----------------------------------------------------------------------------
// PROCEDURAL NPC CLASS EQUIPMENT — every remaining piece from all 10 classes
// in §8.1 of the GDD, cross-referenced against items_seed_data.ts to avoid
// duplicating what Part 1 already covered (Sickle, Dagger, Cotton Bloomers,
// Studded Leather Jerkin, Ribboned Panties, Sheer Lace Panties, Sport-Fit
// Bandage, Tall Leather Boots, Composite Shortbow, Jagged Shortsword, Steel
// Kettle Helm, Chainmail Shirt, Armored Greaves, Plain White Panties,
// Silk Lace Panties, Pure Silk Underslip, Quill-Blade, Ceremonial Staff).
// ----------------------------------------------------------------------------

export const PROCEDURAL_NPC_EQUIPMENT: ItemDef[] = [
  // 1. Commoner / Peasant Girl
  { id: "clo_straw_bonnet", name: "Straw Bonnet", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 4, upgradable: false, tags: ["generic", "peasant"] },
  { id: "clo_linen_blouse_bodice", name: "Linen Blouse & Bodice", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 12, upgradable: true, tags: ["generic", "peasant"] },
  { id: "arm_homespun_wool_skirt", name: "Homespun Wool Skirt", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 8, upgradable: false, tags: ["generic", "peasant"] },
  { id: "arm_simple_clogs", name: "Simple Clogs", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 3, upgradable: false, tags: ["generic", "peasant"] },
  { id: "clo_copper_locket", name: "Copper Locket", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 10, upgradable: false, tags: ["generic", "peasant"] },

  // 2. Town Merchant
  { id: "arm_merchant_cap", name: "Merchant Cap", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Armor, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 10, upgradable: true, tags: ["generic", "merchant"] },
  { id: "arm_embroidered_wool_tunic", name: "Embroidered Wool Tunic", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 2 }, stackable: false, maxStack: 1, sellValueGold: 25, upgradable: true, tags: ["generic", "merchant"] },
  { id: "arm_sturdy_trousers", name: "Sturdy Trousers", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1 }, stackable: false, maxStack: 1, sellValueGold: 15, upgradable: true, tags: ["generic", "merchant"] },
  { id: "arm_buckled_leather_shoes", name: "Buckled Leather Shoes", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1 }, stackable: false, maxStack: 1, sellValueGold: 18, upgradable: true, tags: ["generic", "merchant"] },
  { id: "clo_fine_cotton_chemise", name: "Fine Cotton Chemise", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 15, upgradable: true, tags: ["generic", "merchant", "lingerie"] },
  { id: "clo_brass_abacus_ring", name: "Brass Abacus Ring", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { lck: 1 }, stackable: false, maxStack: 1, sellValueGold: 40, upgradable: true, tags: ["generic", "merchant"] },

  // 3. City Guard / Mercenary
  { id: "arm_steel_toed_war_boots", name: "Steel-Toed War Boots", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 3 }, stackable: false, maxStack: 1, sellValueGold: 35, upgradable: true, tags: ["generic", "guard"] },
  { id: "clo_linen_loin_wrap", name: "Linen Loin-Wrap", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 6, upgradable: false, tags: ["generic", "guard", "lingerie"] },
  { id: "clo_guard_badge", name: "Guard Badge", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 12, upgradable: false, tags: ["generic", "guard", "quest-relevant"] },

  // 4. High Noble Lady
  { id: "clo_pearl_hair_comb", name: "Pearl Hair Comb", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 90, upgradable: true, tags: ["generic", "noble"] },
  { id: "clo_silk_corseted_gown", name: "Silk Corseted Gown", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 210, upgradable: true, tags: ["generic", "noble"] },
  { id: "clo_layered_brocade_underskirt", name: "Layered Brocade Underskirt", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 70, upgradable: true, tags: ["generic", "noble"] },
  { id: "clo_satin_slippers", name: "Satin Slippers", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 45, upgradable: true, tags: ["generic", "noble"] },
  { id: "clo_diamond_necklace", name: "Diamond Necklace", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, maxCrestPower: 1 }, stackable: false, maxStack: 1, sellValueGold: 350, upgradable: true, tags: ["generic", "noble", "rare"] },

  // 5. Bandit / Outlaw
  { id: "arm_leather_eyepatch_bandana", name: "Leather Eyepatch / Bandana", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Armor, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 5, upgradable: false, tags: ["generic", "bandit"] },
  { id: "arm_rugged_trousers", name: "Rugged Trousers", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1 }, stackable: false, maxStack: 1, sellValueGold: 10, upgradable: true, tags: ["generic", "bandit"] },
  { id: "arm_scuffed_riding_boots", name: "Scuffed Riding Boots", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1, agi: 1 }, stackable: false, maxStack: 1, sellValueGold: 12, upgradable: true, tags: ["generic", "bandit"] },
  { id: "clo_rough_hemp_wraps", name: "Rough Hemp Wraps", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 4, upgradable: false, tags: ["generic", "bandit", "lingerie"] },
  { id: "clo_bone_necklace", name: "Bone Necklace", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 8, upgradable: false, tags: ["generic", "bandit"] },

  // 6. Temple Priestess
  { id: "clo_white_linen_veil", name: "White Linen Veil", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 20, upgradable: true, tags: ["generic", "priestess"] },
  { id: "arm_sacred_white_vestment", name: "Sacred White Vestment", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 3, wis: 2 }, stackable: false, maxStack: 1, sellValueGold: 60, upgradable: true, tags: ["generic", "priestess"] },
  { id: "arm_pleated_long_skirt", name: "Pleated Long Skirt", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1 }, stackable: false, maxStack: 1, sellValueGold: 25, upgradable: true, tags: ["generic", "priestess"] },
  { id: "arm_soft_sandals", name: "Soft Sandals", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 10, upgradable: false, tags: ["generic", "priestess"] },
  { id: "clo_holy_symbol_rosary", name: "Holy Symbol Rosary", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { maxCrestPower: 1 }, stackable: false, maxStack: 1, sellValueGold: 55, upgradable: true, tags: ["generic", "priestess"] },

  // 7. Academy Scholar
  { id: "clo_archivist_spectacles", name: "Archivist Spectacles", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 35, upgradable: true, tags: ["generic", "scholar"] },
  { id: "arm_high_collar_scholar_robe", name: "High-Collar Scholar Robe", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 2, wis: 3 }, stackable: false, maxStack: 1, sellValueGold: 55, upgradable: true, tags: ["generic", "scholar"] },
  { id: "arm_fitted_wool_pants", name: "Fitted Wool Pants", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1 }, stackable: false, maxStack: 1, sellValueGold: 20, upgradable: true, tags: ["generic", "scholar"] },
  { id: "clo_ink_stone_pendant", name: "Ink-Stone Pendant", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 45, upgradable: true, tags: ["generic", "scholar"] },

  // 8. Tavern Courtesan / Barmaid
  { id: "clo_flower_hairclip", name: "Flower Hairclip", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 12, upgradable: true, tags: ["generic", "courtesan"] },
  { id: "clo_low_cut_push_up_bodice", name: "Low-Cut Push-Up Bodice", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3 }, stackable: false, maxStack: 1, sellValueGold: 70, upgradable: true, tags: ["generic", "courtesan"] },
  { id: "clo_ruffled_short_skirt", name: "Ruffled Short Skirt", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 35, upgradable: true, tags: ["generic", "courtesan"] },
  { id: "clo_ankle_strap_slippers", name: "Ankle-Strap Slippers", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 25, upgradable: true, tags: ["generic", "courtesan"] },
  { id: "clo_scented_ribbon", name: "Scented Ribbon", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 18, upgradable: true, tags: ["generic", "courtesan"] },
  { id: "wpn_concealed_garter_knife", name: "Concealed Garter Knife", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { agi: 3 }, stackable: false, maxStack: 1, sellValueGold: 25, upgradable: true, tags: ["generic", "courtesan"] },

  // 9. Farm Girl
  { id: "clo_straw_sunhat_farmgirl", name: "Straw Sunhat", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 4, upgradable: false, tags: ["generic", "farm-girl"] },
  { id: "clo_low_neck_cotton_top", name: "Low-Neck Cotton Top", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 10, upgradable: true, tags: ["generic", "farm-girl"] },
  { id: "arm_rolled_denim_overalls", name: "Rolled Denim Overalls", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 12, upgradable: false, tags: ["generic", "farm-girl"] },
  { id: "arm_work_boots", name: "Work Boots", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1 }, stackable: false, maxStack: 1, sellValueGold: 8, upgradable: true, tags: ["generic", "farm-girl"] },
  { id: "clo_braided_straw_ring", name: "Braided Straw Ring", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 2, upgradable: false, tags: ["generic", "farm-girl"] },
  { id: "wpn_pitchfork", name: "Pitchfork", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 3 }, stackable: false, maxStack: 1, sellValueGold: 8, upgradable: false, tags: ["generic", "farm-girl"] },

  // 10. Adventurer Explorer
  { id: "arm_explorer_leather_hood", name: "Explorer Leather Hood", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1 }, stackable: false, maxStack: 1, sellValueGold: 18, upgradable: true, tags: ["generic", "adventurer"] },
  { id: "arm_reinforced_leather_vest", name: "Reinforced Leather Vest", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 4 }, stackable: false, maxStack: 1, sellValueGold: 50, upgradable: true, tags: ["generic", "adventurer"] },
  { id: "arm_cargo_travel_pants", name: "Cargo Travel Pants", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 2 }, stackable: false, maxStack: 1, sellValueGold: 28, upgradable: true, tags: ["generic", "adventurer"] },
  { id: "arm_waterproof_boots", name: "Waterproof Boots", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 2 }, stackable: false, maxStack: 1, sellValueGold: 22, upgradable: true, tags: ["generic", "adventurer"] },
  { id: "clo_compass_charm", name: "Compass Charm", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 30, upgradable: false, tags: ["generic", "adventurer"] },
];

// ----------------------------------------------------------------------------
// ACHIEVEMENT TROPHIES (§20 of the GDD) — display/collection items, never
// craftable or lootable; granted directly by AchievementDef unlock logic.
// slot: null since they're not equippable; no materialTier since they're
// neither Raw nor Composite — a third, achievement-only origin.
// ----------------------------------------------------------------------------

export const ACHIEVEMENT_TROPHIES: ItemDef[] = [
  { id: "trophy_dried_lavender_charm", name: "Dried Lavender Charm", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:first_warmth"] },
  { id: "trophy_silver_quill", name: "Silver Quill", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:archivists_surrender"] },
  { id: "trophy_star_iron_anvil", name: "Miniature Star-Iron Anvil", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:forge_of_gentle_strength"] },
  { id: "trophy_dragonscale_crest", name: "Dragonscale Crest", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:commanding_surrender"] },
  { id: "trophy_moon_silk_banner", name: "Moon-Silk Banner", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:moonlit_bioluminescence"] },
  { id: "trophy_golden_sap_bonsai", name: "Golden Sap Bonsai", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:forest_communion"] },
  { id: "trophy_obsidian_mask", name: "Obsidian Mask", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:uncorseted_truth"] },
  { id: "trophy_golden_fox_pin", name: "Golden Fox Pin", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:three_tails_entwined"] },
  { id: "trophy_golden_feather_relic", name: "Golden Feather Relic", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:holy_awakening"] },
  { id: "trophy_royal_starlight_pendant", name: "Royal Starlight Pendant", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:empathic_resonance"] },
  { id: "trophy_golden_astraea_statue", name: "Golden Astraea Statue", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 0, tags: ["trophy", "achievement-reward:master_of_equilibrium", "platinum"] },
];

// ----------------------------------------------------------------------------
// REMAINING QUEST/GIFT MATERIALS — from the Repeatable Quest tables (§7 of
// the GDD), not previously captured. Not tied to a crafting recipe unless
// noted; some are quest rewards only, obtained by no other means.
// ----------------------------------------------------------------------------

export const QUEST_MATERIALS: ItemDef[] = [
  { id: "quest_herb_pack", name: "Herb Pack", slot: null, statModifiers: {}, stackable: true, maxStack: 10, sellValueGold: 25, tags: ["quest-reward", "material"] },
  { id: "quest_mana_draft", name: "Mana Draft", slot: null, statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 40, tags: ["quest-reward", "consumable"] },
  { id: "quest_court_token", name: "Court Token", slot: null, statModifiers: {}, stackable: true, maxStack: 5, sellValueGold: 60, tags: ["quest-reward", "quest-relevant"] },
  { id: "quest_rare_exotic_spice", name: "Rare Exotic Spice", slot: null, statModifiers: {}, stackable: true, maxStack: 10, sellValueGold: 90, tags: ["quest-reward", "gift", "material"] },
  { id: "quest_rare_seed_core", name: "Rare Seed Core", slot: null, statModifiers: {}, stackable: true, maxStack: 5, sellValueGold: 120, tags: ["quest-reward", "material"] },
  { id: "quest_royal_jewel", name: "Royal Jewel", slot: null, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 400, tags: ["quest-reward", "rare"] },
  { id: "quest_spell_scroll_reward", name: "Spell Scroll", slot: null, statModifiers: {}, stackable: true, maxStack: 10, sellValueGold: 100, tags: ["quest-reward", "arcane"] },
];
