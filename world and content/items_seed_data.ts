// ============================================================================
// OJISAN IN ANOTHER WORLD — ITEM/EQUIPMENT SEED DATA CATALOG
// Closes the "Crafting/upgrade content volume" item in requirements.md §26.
// Conforms to ItemDef/CraftingRecipeDef/EquipmentUpgradeDef in schemas.ts.
//
// Organized in six sections: Raw Materials, Composite Items, Weapons, Armor,
// Clothing/Lingerie, then CraftingRecipeDef[] and EquipmentUpgradeDef[] tying
// them together. Weapon/Armor/Clothing entries draw directly from each
// companion's "Default Equipment" list and the §8.1 procedural NPC tables
// already named throughout the GDD, rather than inventing names from scratch.
// This is a broad, representative catalog — not a claim of literal
// completeness; new items still slot into the same six patterns below.
// ============================================================================

import {
  ItemDef, CraftingRecipeDef, EquipmentUpgradeDef,
  EquipmentSlot, EquipmentCategory, ItemMaterialTier, CompanionId,
} from "./schemas";

// ----------------------------------------------------------------------------
// 1. RAW MATERIALS (ItemMaterialTier.Raw — never craftable themselves)
// ----------------------------------------------------------------------------

export const RAW_MATERIALS: ItemDef[] = [
  { id: "raw_healing_herb", name: "Healing Herb", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 99, sellValueGold: 5, tags: ["material", "herb"] },
  { id: "raw_moon_mint_leaf", name: "Moon-Mint Leaf", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 99, sellValueGold: 8, tags: ["material", "herb"] },
  { id: "raw_star_iron_ore", name: "Star-Iron Ore", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 50, sellValueGold: 25, tags: ["material", "ore"] },
  { id: "raw_iron_ingot", name: "Iron Ingot", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 50, sellValueGold: 15, tags: ["material", "ore"] },
  { id: "raw_ancient_manuscript", name: "Waterlogged Ancient Manuscript", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 40, tags: ["material", "arcane"] },
  { id: "raw_bioluminescent_fungi", name: "Bioluminescent Cap Fungus", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 50, sellValueGold: 12, tags: ["material", "fungus"] },
  { id: "raw_dragon_lily", name: "Dragon-Lily Blossom", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 30, sellValueGold: 35, tags: ["material", "flower"] },
  { id: "raw_moon_spider_cocoon", name: "Moon-Spider Cocoon", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 30, sellValueGold: 30, tags: ["material", "silk"] },
  { id: "raw_silk_thread", name: "Silk Thread", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 99, sellValueGold: 6, tags: ["material", "textile"] },
  { id: "raw_leather_scrap", name: "Leather Scrap", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 99, sellValueGold: 4, tags: ["material", "hide"] },
  { id: "raw_wolf_pelt", name: "Wolf Pelt", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 50, sellValueGold: 10, tags: ["material", "hide", "loot"] },
  { id: "raw_wolf_fang", name: "Wolf Fang", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 50, sellValueGold: 15, tags: ["material", "loot"] },
  { id: "raw_ardor_crystal", name: "Ardor Crystal", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 80, tags: ["material", "crest", "loot"] },
  { id: "raw_arcane_core", name: "Arcane Core", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 90, tags: ["material", "arcane", "loot"] },
  { id: "raw_frost_core", name: "Frost Core", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 85, tags: ["material", "loot"] },
  { id: "raw_dragonscale_shard", name: "Dragonscale Shard", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 30, sellValueGold: 45, tags: ["material", "loot"] },
  { id: "raw_cultist_seal", name: "Cultist Seal", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 50, tags: ["material", "loot"] },
  { id: "raw_shadow_pelt", name: "Shadow Pelt", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 55, tags: ["material", "loot"] },
  { id: "raw_celestial_feather", name: "Celestial Feather Plume", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 70, tags: ["material", "loot"] },
  { id: "raw_golden_sun_tablet", name: "Golden Sun Tablet", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 10, sellValueGold: 150, tags: ["material", "relic", "loot"] },
  { id: "raw_lost_fox_amulet", name: "Lost Fox Amulet", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 40, tags: ["material"] },
  { id: "raw_pre_suppression_wine", name: "Pre-Suppression Wine Cask", slot: null, materialTier: ItemMaterialTier.Raw, statModifiers: {}, stackable: true, maxStack: 10, sellValueGold: 100, tags: ["material", "relic"] },
];

// ----------------------------------------------------------------------------
// 2. COMPOSITE ITEMS (ItemMaterialTier.Composite — crafted, craftingRecipeId set)
// ----------------------------------------------------------------------------

export const COMPOSITE_ITEMS: ItemDef[] = [
  { id: "comp_health_potion", name: "Health Potion", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_health_potion", statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 30, tags: ["consumable", "healing"] },
  { id: "comp_refined_ingot", name: "Refined Ingot", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_refined_ingot", statModifiers: {}, stackable: true, maxStack: 30, sellValueGold: 90, tags: ["material", "refined"] },
  { id: "comp_clarity_draught", name: "Clarity Draught", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_clarity_draught", statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 45, tags: ["consumable"] },
  { id: "comp_skill_scroll", name: "Skill Scroll", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_skill_scroll", statModifiers: {}, stackable: true, maxStack: 10, sellValueGold: 120, tags: ["consumable", "arcane"] },
  { id: "comp_dragon_perfume", name: "Dragon Perfume", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_dragon_perfume", statModifiers: {}, stackable: true, maxStack: 10, sellValueGold: 150, tags: ["gift", "consumable"] },
  { id: "comp_moon_silk_bolt", name: "Moon Silk Bolt", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_moon_silk_bolt", statModifiers: {}, stackable: true, maxStack: 15, sellValueGold: 110, tags: ["material", "textile"] },
  { id: "comp_lucky_fox_paw", name: "Lucky Fox Paw Charm", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_lucky_fox_paw", statModifiers: { lck: 2 }, stackable: false, maxStack: 1, sellValueGold: 200, tags: ["gift", "charm"] },
  { id: "comp_celestial_charm", name: "Celestial Charm", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_celestial_charm", statModifiers: {}, stackable: true, maxStack: 5, sellValueGold: 300, tags: ["gift", "charm"] },
  { id: "comp_ancient_core", name: "Ancient Core", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_ancient_core", statModifiers: {}, stackable: true, maxStack: 5, sellValueGold: 400, tags: ["material", "relic"] },
  { id: "comp_sacred_rosary", name: "Sacred Rosary", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_sacred_rosary", statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 250, tags: ["gift", "charm"] },
  { id: "comp_stamina_elixir", name: "Stamina Elixir", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_stamina_elixir", statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 60, tags: ["consumable", "erotic"] },
  { id: "comp_crest_tonic", name: "Crest Tonic", slot: null, materialTier: ItemMaterialTier.Composite, craftingRecipeId: "recipe_crest_tonic", statModifiers: {}, stackable: true, maxStack: 20, sellValueGold: 70, tags: ["consumable", "erotic"] },
];

// ----------------------------------------------------------------------------
// 3. WEAPONS (EquipmentCategory.Weapon — companion defaults + generic roster)
// ----------------------------------------------------------------------------

export const WEAPONS: ItemDef[] = [
  // Companion default weapons
  { id: "wpn_healers_staff", name: "Healer's Staff", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 3, wis: 6 }, stackable: false, maxStack: 1, sellValueGold: 120, upgradable: true, tags: ["companion-default:mira"] },
  { id: "wpn_spell_tome", name: "Spell Tome", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { wis: 8 }, stackable: false, maxStack: 1, sellValueGold: 140, upgradable: true, tags: ["companion-default:isolde"] },
  { id: "wpn_great_hammer", name: "Great Hammer", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 10 }, stackable: false, maxStack: 1, sellValueGold: 180, upgradable: true, tags: ["companion-default:grael"] },
  { id: "wpn_tower_shield", name: "Tower Shield", slot: EquipmentSlot.OffHand, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 8 }, stackable: false, maxStack: 1, sellValueGold: 150, upgradable: true, tags: ["companion-default:grael"] },
  { id: "wpn_crimson_broadsword", name: "Crimson Broadsword", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 12 }, stackable: false, maxStack: 1, sellValueGold: 220, upgradable: true, tags: ["companion-default:valka"] },
  { id: "wpn_war_shield", name: "War Shield", slot: EquipmentSlot.OffHand, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 9 }, stackable: false, maxStack: 1, sellValueGold: 160, upgradable: true, tags: ["companion-default:valka"] },
  { id: "wpn_elven_short_blades", name: "Paired Elven Short-Blades", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { agi: 9, lck: 3 }, stackable: false, maxStack: 1, sellValueGold: 190, upgradable: true, tags: ["companion-default:seira"] },
  { id: "wpn_living_branch_staff", name: "Living Branch Staff", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { wis: 9 }, stackable: false, maxStack: 1, sellValueGold: 170, upgradable: true, tags: ["companion-default:sylvara"] },
  { id: "wpn_poison_hatpin", name: "Concealed Poison Hatpin", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { agi: 6, lck: 5 }, stackable: false, maxStack: 1, sellValueGold: 200, upgradable: true, tags: ["companion-default:reva"] },
  { id: "wpn_fan_blades", name: "Concealed Fan-Blades", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { agi: 8, lck: 4 }, stackable: false, maxStack: 1, sellValueGold: 180, upgradable: true, tags: ["companion-default:tasha"] },
  { id: "wpn_light_lance", name: "Condensed Light-Lance", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 8, wis: 5 }, stackable: false, maxStack: 1, sellValueGold: 210, upgradable: true, tags: ["companion-default:sera"] },
  { id: "wpn_divine_rod", name: "Divine Rod", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { wis: 10 }, stackable: false, maxStack: 1, sellValueGold: 230, upgradable: true, tags: ["companion-default:lyra"] },
  { id: "wpn_empathic_barrier", name: "Empathic Barrier", slot: EquipmentSlot.OffHand, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 6, wis: 4 }, stackable: false, maxStack: 1, sellValueGold: 190, upgradable: true, tags: ["companion-default:lyra"] },
  // Generic/procedural roster (§8.1 of the GDD)
  { id: "wpn_iron_spear", name: "Iron Spear", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 6 }, stackable: false, maxStack: 1, sellValueGold: 60, upgradable: true, tags: ["generic"] },
  { id: "wpn_broadsword", name: "Broadsword", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 7 }, stackable: false, maxStack: 1, sellValueGold: 70, upgradable: true, tags: ["generic"] },
  { id: "wpn_dagger", name: "Dagger", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { agi: 4, lck: 1 }, stackable: false, maxStack: 1, sellValueGold: 35, upgradable: true, tags: ["generic"] },
  { id: "wpn_sickle", name: "Sickle", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 2 }, stackable: false, maxStack: 1, sellValueGold: 15, upgradable: false, tags: ["generic", "peasant"] },
  { id: "wpn_composite_shortbow", name: "Composite Shortbow", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { agi: 7 }, stackable: false, maxStack: 1, sellValueGold: 90, upgradable: true, tags: ["generic"] },
  { id: "wpn_jagged_shortsword", name: "Jagged Shortsword", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 5, agi: 2 }, stackable: false, maxStack: 1, sellValueGold: 40, upgradable: true, tags: ["generic", "bandit"] },
  { id: "wpn_jeweled_stiletto", name: "Jeweled Stiletto", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { agi: 5, lck: 4 }, stackable: false, maxStack: 1, sellValueGold: 150, upgradable: true, tags: ["generic", "noble"] },
  { id: "wpn_quill_blade", name: "Quill-Blade", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { wis: 4, agi: 2 }, stackable: false, maxStack: 1, sellValueGold: 65, upgradable: true, tags: ["generic", "scholar"] },
  { id: "wpn_ceremonial_staff", name: "Ceremonial Staff", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { wis: 5 }, stackable: false, maxStack: 1, sellValueGold: 55, upgradable: true, tags: ["generic", "priestess"] },
  { id: "wpn_master_steel_blade", name: "Master Steel Blade", slot: EquipmentSlot.MainWeapon, equipmentCategory: EquipmentCategory.Weapon, statModifiers: { str: 14, lck: 2 }, stackable: false, maxStack: 1, sellValueGold: 500, upgradable: true, tags: ["generic", "rare"] },
];

// ----------------------------------------------------------------------------
// 4. ARMOR (EquipmentCategory.Armor — Head/Body/Legs/Feet/Hands practical gear)
// ----------------------------------------------------------------------------

export const ARMOR: ItemDef[] = [
  { id: "arm_white_linen_hood", name: "White Linen Hood", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1 }, stackable: false, maxStack: 1, sellValueGold: 20, upgradable: true, tags: ["companion-default:mira"] },
  { id: "arm_healers_robe", name: "Healer's Robe", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 4, wis: 2 }, stackable: false, maxStack: 1, sellValueGold: 65, upgradable: true, tags: ["companion-default:mira"] },
  { id: "arm_archivist_coat", name: "Grey Archivist Coat", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 3, wis: 3 }, stackable: false, maxStack: 1, sellValueGold: 70, upgradable: true, tags: ["companion-default:isolde"] },
  { id: "arm_fitted_black_trousers", name: "Fitted Black Trousers", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 2 }, stackable: false, maxStack: 1, sellValueGold: 30, upgradable: true, tags: ["companion-default:isolde"] },
  { id: "arm_tall_leather_boots", name: "Tall Leather Boots", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 2, agi: 1 }, stackable: false, maxStack: 1, sellValueGold: 35, upgradable: true, tags: ["companion-default:isolde"] },
  { id: "arm_forge_brow_band", name: "Forge Brow-Band", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 2 }, stackable: false, maxStack: 1, sellValueGold: 25, upgradable: true, tags: ["companion-default:grael"] },
  { id: "arm_forge_apron_mail", name: "Leather Forge Apron & Mail Shirt", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 9, hp: 10 }, stackable: false, maxStack: 1, sellValueGold: 130, upgradable: true, tags: ["companion-default:grael"] },
  { id: "arm_heavy_work_pants", name: "Heavy Work Pants", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 4 }, stackable: false, maxStack: 1, sellValueGold: 45, upgradable: true, tags: ["companion-default:grael"] },
  { id: "arm_steel_toed_boots", name: "Steel-Toed Boots", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 3 }, stackable: false, maxStack: 1, sellValueGold: 40, upgradable: true, tags: ["companion-default:grael"] },
  { id: "arm_forge_gauntlets", name: "Forge Gauntlets", slot: EquipmentSlot.Hands, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 3, str: 2 }, stackable: false, maxStack: 1, sellValueGold: 50, upgradable: true, tags: ["companion-default:grael"] },
  { id: "arm_dragonscale_war_helm", name: "Dragonscale War-Helm", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 6 }, stackable: false, maxStack: 1, sellValueGold: 140, upgradable: true, tags: ["companion-default:valka"] },
  { id: "arm_crimson_plate", name: "Crimson Plate Armor", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 14, hp: 15 }, stackable: false, maxStack: 1, sellValueGold: 260, upgradable: true, tags: ["companion-default:valka"] },
  { id: "arm_plate_greaves", name: "Plate Greaves", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 7 }, stackable: false, maxStack: 1, sellValueGold: 110, upgradable: true, tags: ["companion-default:valka"] },
  { id: "arm_war_boots", name: "War Boots", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 4 }, stackable: false, maxStack: 1, sellValueGold: 60, upgradable: true, tags: ["companion-default:valka"] },
  { id: "arm_claws_gauntlets", name: "Claws Gauntlets", slot: EquipmentSlot.Hands, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 4, str: 3 }, stackable: false, maxStack: 1, sellValueGold: 75, upgradable: true, tags: ["companion-default:valka"] },
  { id: "arm_silver_circlet", name: "Silver Circlet", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 2, wis: 2 }, stackable: false, maxStack: 1, sellValueGold: 55, upgradable: true, tags: ["companion-default:seira"] },
  { id: "arm_moon_silk_tunic", name: "Moon-Silk War Tunic", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 6, agi: 2 }, stackable: false, maxStack: 1, sellValueGold: 100, upgradable: true, tags: ["companion-default:seira"] },
  { id: "arm_silver_blue_leggings", name: "Silver-Blue Leggings", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 3 }, stackable: false, maxStack: 1, sellValueGold: 45, upgradable: true, tags: ["companion-default:seira"] },
  { id: "arm_silent_boots", name: "Silent Boots", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Armor, statModifiers: { agi: 3 }, stackable: false, maxStack: 1, sellValueGold: 50, upgradable: true, tags: ["companion-default:seira"] },
  { id: "arm_white_penitent_veil", name: "White Penitent Veil", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 1, wis: 3 }, stackable: false, maxStack: 1, sellValueGold: 40, upgradable: true, tags: ["companion-default:sera"] },
  { id: "arm_mourning_vestment", name: "Mourning Vestment", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 5, wis: 4 }, stackable: false, maxStack: 1, sellValueGold: 90, upgradable: true, tags: ["companion-default:sera"] },
  // Generic guard/mercenary roster (§8.1)
  { id: "arm_steel_kettle_helm", name: "Steel Kettle Helm", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 4 }, stackable: false, maxStack: 1, sellValueGold: 45, upgradable: true, tags: ["generic", "guard"] },
  { id: "arm_chainmail_shirt", name: "Chainmail Shirt", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 8 }, stackable: false, maxStack: 1, sellValueGold: 85, upgradable: true, tags: ["generic", "guard"] },
  { id: "arm_armored_greaves", name: "Armored Greaves", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 5 }, stackable: false, maxStack: 1, sellValueGold: 55, upgradable: true, tags: ["generic", "guard"] },
  { id: "arm_studded_leather_jerkin", name: "Studded Leather Jerkin", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Armor, statModifiers: { def: 5, agi: 1 }, stackable: false, maxStack: 1, sellValueGold: 50, upgradable: true, tags: ["generic", "bandit"] },
];

// ----------------------------------------------------------------------------
// 5. CLOTHING & LINGERIE (EquipmentCategory.Clothing — SEN/TEC/VIR/maxStamina/maxCrestPower)
// ----------------------------------------------------------------------------

export const CLOTHING: ItemDef[] = [
  // General-purpose gift/fashion pieces (§9.2 of the GDD names these directly)
  { id: "clo_silk_kimono", name: "Silk Kimono", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3 }, stackable: false, maxStack: 1, sellValueGold: 90, upgradable: true, tags: ["fashion", "gift"] },
  { id: "clo_maid_dress", name: "Maid Dress", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { technique: 2 }, stackable: false, maxStack: 1, sellValueGold: 70, upgradable: true, tags: ["fashion", "gift"] },
  { id: "clo_sheer_nightgown", name: "Sheer Nightgown", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 4 }, stackable: false, maxStack: 1, sellValueGold: 85, upgradable: true, tags: ["fashion", "lingerie", "gift"] },
  { id: "clo_battle_bikini", name: "Battle Bikini", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 100, upgradable: true, tags: ["fashion", "gift"] },
  // Companion default intimate/fashion slots
  { id: "clo_cream_underskirt", name: "Cream Underskirt", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 20, upgradable: true, tags: ["companion-default:mira"] },
  { id: "clo_silk_panties_mira", name: "Silk Panties", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 15, upgradable: true, tags: ["companion-default:mira", "lingerie"] },
  { id: "clo_lace_panties_isolde", name: "Lace Panties", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { technique: 2 }, stackable: false, maxStack: 1, sellValueGold: 18, upgradable: true, tags: ["companion-default:isolde", "lingerie"] },
  { id: "clo_brocade_gown", name: "Structured Brocade Gown", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 180, upgradable: true, tags: ["companion-default:reva"] },
  { id: "clo_silk_underskirt_reva", name: "Silk Underskirt", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 60, upgradable: true, tags: ["companion-default:reva"] },
  { id: "clo_high_heeled_slippers", name: "High-Heeled Slippers", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 40, upgradable: true, tags: ["companion-default:reva"] },
  { id: "clo_long_dark_gloves", name: "Long Dark Gloves", slot: EquipmentSlot.Hands, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { technique: 2 }, stackable: false, maxStack: 1, sellValueGold: 50, upgradable: true, tags: ["companion-default:reva"] },
  { id: "clo_white_silk_underdress_sera", name: "White Silk Underdress", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3 }, stackable: false, maxStack: 1, sellValueGold: 95, upgradable: true, tags: ["companion-default:sera"] },
  { id: "clo_feather_charm", name: "Feather Charm", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { maxCrestPower: 3 }, stackable: false, maxStack: 1, sellValueGold: 120, upgradable: true, tags: ["companion-default:sera"] },
  { id: "clo_royal_ward_gown", name: "Royal Ward Gown", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 200, upgradable: true, tags: ["companion-default:lyra"] },
  { id: "clo_silk_underdress_lyra", name: "Silk Underdress", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 65, upgradable: true, tags: ["companion-default:lyra"] },
  { id: "clo_court_slippers", name: "Court Slippers", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 45, upgradable: true, tags: ["companion-default:lyra"] },
  { id: "clo_white_silk_gloves", name: "White Silk Gloves", slot: EquipmentSlot.Hands, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 45, upgradable: true, tags: ["companion-default:lyra"] },
  { id: "clo_embroidered_travel_vest", name: "Embroidered Travel Vest", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 80, upgradable: true, tags: ["companion-default:tasha"] },
  { id: "clo_layered_travel_skirt", name: "Layered Travel Skirt", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 40, upgradable: true, tags: ["companion-default:tasha"] },
  { id: "clo_fox_ear_ribbons", name: "Fox-Ear Ribbons", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 30, upgradable: true, tags: ["companion-default:tasha"] },
  { id: "clo_bark_leaf_wrap", name: "Woven Bark-and-Leaf Wrap", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, maxStamina: 2 }, stackable: false, maxStack: 1, sellValueGold: 60, upgradable: true, tags: ["companion-default:sylvara"] },
  { id: "clo_seed_core_pendant", name: "Seed-Core Pendant", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { maxStamina: 3 }, stackable: false, maxStack: 1, sellValueGold: 100, upgradable: true, tags: ["companion-default:sylvara"] },
  // Generic/procedural underwear roster (§8.1)
  { id: "clo_cotton_bloomers", name: "Cotton Bloomers", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 5, upgradable: false, tags: ["generic", "peasant", "lingerie"] },
  { id: "clo_sheer_lace_panties", name: "Sheer Lace Panties", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 20, upgradable: true, tags: ["generic", "courtesan", "lingerie"] },
  { id: "clo_ribboned_panties", name: "Ribboned Panties", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 18, upgradable: true, tags: ["generic", "scholar", "lingerie"] },
  { id: "clo_plain_white_panties", name: "Plain White Panties", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 3, upgradable: false, tags: ["generic", "farm-girl", "lingerie"] },
  { id: "clo_silk_lace_panties_noble", name: "Silk Lace Panties", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 45, upgradable: true, tags: ["generic", "noble", "lingerie"] },
  { id: "clo_pure_silk_underslip", name: "Pure Silk Underslip", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1, maxCrestPower: 1 }, stackable: false, maxStack: 1, sellValueGold: 35, upgradable: true, tags: ["generic", "priestess", "lingerie"] },
  { id: "clo_sport_fit_bandage", name: "Sport-Fit Bandage", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 12, upgradable: true, tags: ["generic", "adventurer", "lingerie"] },

  // --- Expanded erotic lingerie/costume catalog ---

  // Lingerie sets (Underwear slot)
  { id: "clo_velvet_garter_teddy", name: "Velvet Garter Teddy", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 75, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_ribbon_tie_bralette", name: "Ribbon-Tie Bralette Set", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 40, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_open_cup_bodysuit", name: "Open-Cup Lace Bodysuit", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 4, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 110, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_satin_cheekies", name: "Satin Cheekies", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 35, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_crotchless_lace_panties", name: "Crotchless Lace Panties", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 65, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_silk_camisole_slip", name: "Silk Camisole Slip", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, maxStamina: 1 }, stackable: false, maxStack: 1, sellValueGold: 50, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_corseted_bustier", name: "Corseted Bustier", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 90, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_sheer_mesh_bodystocking", name: "Sheer Mesh Bodystocking", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 4 }, stackable: false, maxStack: 1, sellValueGold: 95, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_plain_cotton_slip", name: "Plain Cotton Slip", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 8, upgradable: false, tags: ["generic", "commoner", "lingerie"] },
  { id: "clo_embroidered_chemise", name: "Embroidered Merchant's Chemise", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 28, upgradable: true, tags: ["generic", "merchant", "lingerie"] },

  // Costume/roleplay outfits (Body slot)
  { id: "clo_bunny_leotard", name: "Bunny Girl Leotard", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 4, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 130, upgradable: true, tags: ["fashion", "costume", "gift"] },
  { id: "clo_sheer_nurse_uniform", name: "Nurse's Uniform (Sheer)", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, technique: 2 }, stackable: false, maxStack: 1, sellValueGold: 120, upgradable: true, tags: ["fashion", "costume", "gift"] },
  { id: "clo_sailor_top", name: "Schoolgirl Sailor Top", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3 }, stackable: false, maxStack: 1, sellValueGold: 85, upgradable: true, tags: ["fashion", "costume", "gift"] },
  { id: "clo_bridal_lace_gown", name: "Bridal Lace Gown", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, maxCrestPower: 2 }, stackable: false, maxStack: 1, sellValueGold: 260, upgradable: true, tags: ["fashion", "costume", "gift", "rare"] },
  { id: "clo_festival_yukata", name: "Festival Yukata", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 75, upgradable: true, tags: ["fashion", "seasonal", "gift"] },
  { id: "clo_latex_catsuit", name: "Latex Catsuit", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, technique: 2 }, stackable: false, maxStack: 1, sellValueGold: 140, upgradable: true, tags: ["fashion", "costume", "gift"] },
  { id: "clo_velvet_off_shoulder_dress", name: "Off-Shoulder Velvet Dress", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3 }, stackable: false, maxStack: 1, sellValueGold: 100, upgradable: true, tags: ["fashion", "gift"] },
  { id: "clo_harness_bodice", name: "Harness-Style Bodice", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 4, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 150, upgradable: true, tags: ["fashion", "costume", "gift"] },
  { id: "clo_cutout_swimsuit", name: "Cutout Swimsuit", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3 }, stackable: false, maxStack: 1, sellValueGold: 90, upgradable: true, tags: ["fashion", "seasonal", "gift"] },
  { id: "clo_backless_evening_gown", name: "Backless Evening Gown", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, maxCrestPower: 1 }, stackable: false, maxStack: 1, sellValueGold: 160, upgradable: true, tags: ["fashion", "gift"] },
  { id: "clo_sheer_open_robe", name: "Sheer Robe (Open Front)", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 4 }, stackable: false, maxStack: 1, sellValueGold: 105, upgradable: true, tags: ["fashion", "sleepwear", "gift"] },
  { id: "clo_fur_trimmed_negligee", name: "Fur-Trimmed Winter Negligee", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, maxStamina: 2 }, stackable: false, maxStack: 1, sellValueGold: 115, upgradable: true, tags: ["fashion", "sleepwear", "gift"] },

  // Stockings/garters (Legs slot)
  { id: "clo_lace_top_thigh_highs", name: "Lace-Top Thigh-Highs", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 25, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_fishnet_stockings", name: "Fishnet Stockings", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 22, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_silk_garter_stockings", name: "Silk Garter Stockings", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3 }, stackable: false, maxStack: 1, sellValueGold: 45, upgradable: true, tags: ["lingerie", "gift"] },
  { id: "clo_ribbon_laced_stockings", name: "Ribbon-Laced Stockings", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 28, upgradable: true, tags: ["lingerie", "gift"] },

  // Erotic accessories (Accessory1/Accessory2)
  { id: "clo_velvet_choker", name: "Velvet Choker", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 30, upgradable: true, tags: ["accessory", "gift"] },
  { id: "clo_satin_ribbon_collar", name: "Satin Ribbon Collar", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 35, upgradable: true, tags: ["accessory", "gift"] },
  { id: "clo_jeweled_body_chain", name: "Jeweled Body Chain", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 140, upgradable: true, tags: ["accessory", "gift", "rare"] },
  { id: "clo_lace_blindfold", name: "Lace Blindfold (Playful)", slot: EquipmentSlot.Accessory2, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3 }, stackable: false, maxStack: 1, sellValueGold: 40, upgradable: true, tags: ["accessory", "gift"] },
  { id: "clo_silk_wrist_ribbons", name: "Silk Wrist Ribbons", slot: EquipmentSlot.Accessory2, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 25, upgradable: true, tags: ["accessory", "gift"] },

  // Companion-themed gift pieces, matching each one's established aesthetic.
  // "themed:X" tags are purely descriptive/flavor — per §5.8 of requirements.md,
  // gifting gives the same flat +10 Trust / +15 Love regardless of which item
  // is chosen, since the old per-companion gift-preference bonus was removed.
  // These tags exist so a UI can suggest "she'd probably like this," not to
  // gate or boost any mechanical outcome.
  { id: "clo_herbalist_sundress", name: "Herbalist's Sheer Sundress", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, maxStamina: 1 }, stackable: false, maxStack: 1, sellValueGold: 70, upgradable: true, tags: ["themed:mira", "gift"] },
  { id: "clo_archivists_unbound_robe", name: "Archivist's Unbound Robe", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, technique: 2 }, stackable: false, maxStack: 1, sellValueGold: 95, upgradable: true, tags: ["themed:isolde", "gift"] },
  { id: "clo_forge_warmed_wrap", name: "Forge-Warmed Wrap", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, maxStamina: 2 }, stackable: false, maxStack: 1, sellValueGold: 65, upgradable: true, tags: ["themed:grael", "gift"] },
  { id: "clo_dragonscale_teddy", name: "Dragon-Scale Trimmed Teddy", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 130, upgradable: true, tags: ["themed:valka", "gift", "lingerie"] },
  { id: "clo_moonlit_silk_wrap", name: "Moonlit Silk Wrap", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3 }, stackable: false, maxStack: 1, sellValueGold: 100, upgradable: true, tags: ["themed:seira", "gift"] },
  { id: "clo_petal_woven_slip", name: "Petal-Woven Slip", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, maxStamina: 1 }, stackable: false, maxStack: 1, sellValueGold: 85, upgradable: true, tags: ["themed:sylvara", "gift", "lingerie"] },
  { id: "clo_nobles_unlaced_corset", name: "Court Noble's Unlaced Corset", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 4, virility: 1 }, stackable: false, maxStack: 1, sellValueGold: 155, upgradable: true, tags: ["themed:reva", "gift", "lingerie"] },
  { id: "clo_fox_tail_cutout_lingerie", name: "Fox-Tail Cutout Lingerie", slot: EquipmentSlot.Underwear, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, technique: 1 }, stackable: false, maxStack: 1, sellValueGold: 110, upgradable: true, tags: ["themed:tasha", "gift", "lingerie"] },
  { id: "clo_feathered_angel_slip", name: "Feathered Angel Slip", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, maxCrestPower: 1 }, stackable: false, maxStack: 1, sellValueGold: 140, upgradable: true, tags: ["themed:sera", "gift"] },
  { id: "clo_royal_starlight_negligee", name: "Royal Starlight Negligee", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 3, maxCrestPower: 2 }, stackable: false, maxStack: 1, sellValueGold: 200, upgradable: true, tags: ["themed:lyra", "gift", "rare"] },

  // --- Everyday/social wear — casual and formal, deliberately modest stat
  // bonuses (0-2) relative to the lingerie/costume set above, since these are
  // primarily social/practical clothing rather than intimacy-focused. Still
  // EquipmentCategory.Clothing (fashion, not protective gear), so they're
  // still upgradable through the same §14.2 system as everything else here.

  // Casual wear
  { id: "clo_simple_cotton_dress", name: "Simple Cotton Dress", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 15, upgradable: true, tags: ["fashion", "casual"] },
  { id: "clo_travelers_tunic", name: "Traveler's Tunic", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 18, upgradable: true, tags: ["fashion", "casual"] },
  { id: "clo_linen_blouse_skirt", name: "Linen Blouse & Skirt", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 22, upgradable: true, tags: ["fashion", "casual"] },
  { id: "clo_wool_sweater", name: "Wool Sweater", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 20, upgradable: true, tags: ["fashion", "casual", "seasonal"] },
  { id: "clo_casual_trousers", name: "Casual Trousers", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 14, upgradable: true, tags: ["fashion", "casual"] },
  { id: "clo_everyday_sandals", name: "Everyday Sandals", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 8, upgradable: true, tags: ["fashion", "casual"] },
  { id: "clo_sunhat", name: "Sunhat", slot: EquipmentSlot.Head, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 10, upgradable: true, tags: ["fashion", "casual"] },
  { id: "clo_knit_cardigan", name: "Knit Cardigan", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 24, upgradable: true, tags: ["fashion", "casual"] },
  { id: "clo_cotton_sundress", name: "Cotton Sundress", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 20, upgradable: true, tags: ["fashion", "casual", "seasonal"] },
  { id: "clo_apron_overdress", name: "Apron Overdress", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 16, upgradable: true, tags: ["fashion", "casual", "practical"] },

  // Formal wear — the Masquerade Ball Gown and Formal Court Suit tie directly
  // into Act 5's "Velvet and Poison" masquerade infiltration (§3 of the GDD)
  { id: "clo_formal_evening_gown", name: "Formal Evening Gown", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 120, upgradable: true, tags: ["fashion", "formal"] },
  { id: "clo_silk_formal_dress", name: "Silk Formal Dress", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 110, upgradable: true, tags: ["fashion", "formal"] },
  { id: "clo_nobles_formal_coat", name: "Noble's Formal Coat", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 95, upgradable: true, tags: ["fashion", "formal"] },
  { id: "clo_formal_opera_gloves", name: "Formal Opera Gloves", slot: EquipmentSlot.Hands, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 35, upgradable: true, tags: ["fashion", "formal"] },
  { id: "clo_formal_dress_heels", name: "Formal Dress Heels", slot: EquipmentSlot.Feet, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 40, upgradable: true, tags: ["fashion", "formal"] },
  { id: "clo_pearl_formal_gown", name: "Pearl-Adorned Formal Gown", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2, maxCrestPower: 1 }, stackable: false, maxStack: 1, sellValueGold: 220, upgradable: true, tags: ["fashion", "formal", "rare"] },
  { id: "clo_velvet_formal_cloak", name: "Velvet Formal Cloak", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 100, upgradable: true, tags: ["fashion", "formal", "seasonal"] },
  { id: "clo_formal_sash", name: "Formal Sash", slot: EquipmentSlot.Accessory1, equipmentCategory: EquipmentCategory.Clothing, statModifiers: {}, stackable: false, maxStack: 1, sellValueGold: 25, upgradable: true, tags: ["fashion", "formal", "accessory"] },
  { id: "clo_ceremonial_ball_mask", name: "Ceremonial Ball Mask", slot: EquipmentSlot.Accessory2, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 60, upgradable: true, tags: ["fashion", "formal", "accessory", "quest-relevant"] },
  { id: "clo_tailored_formal_suit", name: "Tailored Formal Court Suit", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 130, upgradable: true, tags: ["fashion", "formal"] },
  { id: "clo_masquerade_ball_gown", name: "Masquerade Ball Gown", slot: EquipmentSlot.Body, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 2 }, stackable: false, maxStack: 1, sellValueGold: 180, upgradable: true, tags: ["fashion", "formal", "quest-relevant"] },
  { id: "clo_formal_silk_stockings", name: "Formal Silk Stockings", slot: EquipmentSlot.Legs, equipmentCategory: EquipmentCategory.Clothing, statModifiers: { sensitivity: 1 }, stackable: false, maxStack: 1, sellValueGold: 30, upgradable: true, tags: ["fashion", "formal"] },
];

// ----------------------------------------------------------------------------
// 6. CRAFTING RECIPES (Raw -> Composite only, per §14.0's no-chaining rule)
// ----------------------------------------------------------------------------

export const CRAFTING_RECIPES: CraftingRecipeDef[] = [
  { id: "recipe_health_potion", resultItemId: "comp_health_potion", resultQuantity: 3, materialCosts: [{ itemId: "raw_healing_herb", quantity: 2 }, { itemId: "raw_moon_mint_leaf", quantity: 1 }], goldCost: 15, craftTimeGameDays: 0 },
  { id: "recipe_refined_ingot", resultItemId: "comp_refined_ingot", resultQuantity: 1, materialCosts: [{ itemId: "raw_star_iron_ore", quantity: 3 }, { itemId: "raw_iron_ingot", quantity: 1 }], goldCost: 40, craftTimeGameDays: 1 },
  { id: "recipe_clarity_draught", resultItemId: "comp_clarity_draught", resultQuantity: 2, materialCosts: [{ itemId: "raw_bioluminescent_fungi", quantity: 3 }], goldCost: 20, craftTimeGameDays: 0 },
  { id: "recipe_skill_scroll", resultItemId: "comp_skill_scroll", resultQuantity: 1, materialCosts: [{ itemId: "raw_ancient_manuscript", quantity: 1 }, { itemId: "raw_silk_thread", quantity: 4 }], goldCost: 80, craftTimeGameDays: 2 },
  { id: "recipe_dragon_perfume", resultItemId: "comp_dragon_perfume", resultQuantity: 1, materialCosts: [{ itemId: "raw_dragon_lily", quantity: 2 }], goldCost: 60, craftTimeGameDays: 1 },
  { id: "recipe_moon_silk_bolt", resultItemId: "comp_moon_silk_bolt", resultQuantity: 1, materialCosts: [{ itemId: "raw_moon_spider_cocoon", quantity: 5 }], goldCost: 70, craftTimeGameDays: 1 },
  { id: "recipe_lucky_fox_paw", resultItemId: "comp_lucky_fox_paw", resultQuantity: 1, materialCosts: [{ itemId: "raw_lost_fox_amulet", quantity: 4 }], goldCost: 150, craftTimeGameDays: 2 },
  { id: "recipe_celestial_charm", resultItemId: "comp_celestial_charm", resultQuantity: 1, materialCosts: [{ itemId: "raw_celestial_feather", quantity: 3 }], goldCost: 250, craftTimeGameDays: 2 },
  { id: "recipe_ancient_core", resultItemId: "comp_ancient_core", resultQuantity: 1, materialCosts: [{ itemId: "raw_golden_sun_tablet", quantity: 2 }], goldCost: 400, craftTimeGameDays: 3 },
  { id: "recipe_sacred_rosary", resultItemId: "comp_sacred_rosary", resultQuantity: 1, materialCosts: [{ itemId: "raw_ardor_crystal", quantity: 1 }, { itemId: "raw_silk_thread", quantity: 6 }], goldCost: 180, craftTimeGameDays: 1 },
  { id: "recipe_stamina_elixir", resultItemId: "comp_stamina_elixir", resultQuantity: 3, materialCosts: [{ itemId: "raw_healing_herb", quantity: 2 }, { itemId: "raw_ardor_crystal", quantity: 1 }], goldCost: 50, craftTimeGameDays: 0 },
  { id: "recipe_crest_tonic", resultItemId: "comp_crest_tonic", resultQuantity: 3, materialCosts: [{ itemId: "raw_ardor_crystal", quantity: 2 }], goldCost: 65, craftTimeGameDays: 0 },
];

// ----------------------------------------------------------------------------
// 7. EQUIPMENT UPGRADES — cost tiers only (bonuses are rolled at upgrade time
// per §14.2's formula, not authored here). A representative set across all
// three categories at every step; the same +0→+1→+2→+3 cost-scaling pattern
// applies uniformly to the rest of the roster above, so this isn't repeated
// item-by-item for all ~60 entries — costs scale by the base item's own
// sellValueGold tier, not by a per-item hand-tuned number.
// ----------------------------------------------------------------------------

// General cost formula any additional item can be generated against:
//   materialQty(step) = step  (i.e. +1 needs 1 unit, +2 needs 2, +3 needs 3)
//   goldCost(step) = round(item.sellValueGold * 0.5 * step)
//   guidedSelectionGoldPremium(step) = round(goldCost(step) * 1.5)
// Below are fully worked examples of that formula applied to one weapon, one
// piece of armor, and one clothing item, across all three upgrade steps.

export const EQUIPMENT_UPGRADES: EquipmentUpgradeDef[] = [
  // Weapon example: Crimson Broadsword (sellValueGold 220)
  { id: "upg_crimson_broadsword_1", baseItemId: "wpn_crimson_broadsword", fromUpgradeLevel: 0, toUpgradeLevel: 1, materialCosts: [{ itemId: "comp_refined_ingot", quantity: 1 }], goldCost: 110, guidedSelectionGoldPremium: 165 },
  { id: "upg_crimson_broadsword_2", baseItemId: "wpn_crimson_broadsword", fromUpgradeLevel: 1, toUpgradeLevel: 2, materialCosts: [{ itemId: "comp_refined_ingot", quantity: 2 }], goldCost: 220, guidedSelectionGoldPremium: 330 },
  { id: "upg_crimson_broadsword_3", baseItemId: "wpn_crimson_broadsword", fromUpgradeLevel: 2, toUpgradeLevel: 3, materialCosts: [{ itemId: "comp_refined_ingot", quantity: 3 }], goldCost: 330, guidedSelectionGoldPremium: 495 },
  // Armor example: Crimson Plate Armor (sellValueGold 260)
  { id: "upg_crimson_plate_1", baseItemId: "arm_crimson_plate", fromUpgradeLevel: 0, toUpgradeLevel: 1, materialCosts: [{ itemId: "comp_refined_ingot", quantity: 1 }, { itemId: "raw_leather_scrap", quantity: 2 }], goldCost: 130, guidedSelectionGoldPremium: 195 },
  { id: "upg_crimson_plate_2", baseItemId: "arm_crimson_plate", fromUpgradeLevel: 1, toUpgradeLevel: 2, materialCosts: [{ itemId: "comp_refined_ingot", quantity: 2 }, { itemId: "raw_leather_scrap", quantity: 4 }], goldCost: 260, guidedSelectionGoldPremium: 390 },
  { id: "upg_crimson_plate_3", baseItemId: "arm_crimson_plate", fromUpgradeLevel: 2, toUpgradeLevel: 3, materialCosts: [{ itemId: "comp_refined_ingot", quantity: 3 }, { itemId: "raw_leather_scrap", quantity: 6 }], goldCost: 390, guidedSelectionGoldPremium: 585 },
  // Clothing example: Royal Ward Gown (sellValueGold 200)
  { id: "upg_royal_ward_gown_1", baseItemId: "clo_royal_ward_gown", fromUpgradeLevel: 0, toUpgradeLevel: 1, materialCosts: [{ itemId: "comp_moon_silk_bolt", quantity: 1 }], goldCost: 100, guidedSelectionGoldPremium: 150 },
  { id: "upg_royal_ward_gown_2", baseItemId: "clo_royal_ward_gown", fromUpgradeLevel: 1, toUpgradeLevel: 2, materialCosts: [{ itemId: "comp_moon_silk_bolt", quantity: 2 }], goldCost: 200, guidedSelectionGoldPremium: 300 },
  { id: "upg_royal_ward_gown_3", baseItemId: "clo_royal_ward_gown", fromUpgradeLevel: 2, toUpgradeLevel: 3, materialCosts: [{ itemId: "comp_moon_silk_bolt", quantity: 3 }], goldCost: 300, guidedSelectionGoldPremium: 450 },
];
