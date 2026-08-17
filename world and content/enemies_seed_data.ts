// ============================================================================
// OJISAN IN ANOTHER WORLD — EXPANDED ENEMY & NEGATIVE-NPC ROSTER
// Extends the 5 worked examples in requirements.md §23.2 across all 7 regions.
// Builds toward §5.11's density guideline (30% of a region's Humanoid/
// MiasmaCorrupted roster carrying monsterSex/isHumanoidForm/a sexual attack).
//
// Also retrofits real LootTableDef entries for the original 5 §23.2 examples,
// which previously only had a dangling lootTableId string — now resolved
// against the actual item catalog in items_seed_data.ts.
//
// Structure: one purifiable MONSTER (MiasmaCorrupted/VoidAberration) and one
// humanoid NEGATIVE NPC (presentsDefeatMenu: true) per region below Auric
// Court/Sunken Sanctum, which already had coverage from §23.2 — this file
// adds a second entry to each of those two as well, so nowhere in the game
// has just one lonely example.
// ============================================================================

import {
  EnemyCombatantDef, EnemyAbilityDef, LootTableDef,
  MonsterType, EnemyAiPattern, NpcLegalClass,
} from "./schemas";

// ----------------------------------------------------------------------------
// VERDANT VALE (level 1-8) — newly allows Humanoid per the §5.11 update
// ----------------------------------------------------------------------------

export const corruptedDryadSprite: EnemyCombatantDef = {
  id: "corrupted_dryad_sprite",
  name: "Corrupted Dryad Sprite",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "dryad-sprite",
  baseLevel: 5,
  combatStats: { hp: 45, maxHp: 45, str: 5, agi: 10, wis: 8, def: 4, lck: 8 },
  aiPattern: EnemyAiPattern.SupportCaster,
  abilityIds: ["sprite_temptation", "sprite_thorn_lash"],
  goldDropRange: [10, 25],
  lootTableId: "dryad_sprite_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 12,
};

export const highwaymanPoacher: EnemyCombatantDef = {
  id: "highwayman_poacher",
  name: "Highwayman Poacher",
  monsterType: MonsterType.Humanoid,
  family: "bandit",
  baseLevel: 4,
  combatStats: { hp: 55, maxHp: 55, str: 8, agi: 7, wis: 3, def: 5, lck: 6 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["poacher_grope", "poacher_snare_whip"],
  goldDropRange: [8, 20],
  lootTableId: "poacher_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
  monsterSex: "MALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 10,
};

const verdantValeAbilities: EnemyAbilityDef[] = [
  { id: "sprite_temptation", name: "Sprite's Temptation", isSexualAttack: true, arousalGainAmount: 15, miasmaCost: 8 },
  { id: "sprite_thorn_lash", name: "Thorn Lash", isSexualAttack: false, damageMultiplier: 0.8 },
  { id: "poacher_grope", name: "Poacher's Grope", isSexualAttack: true, arousalGainAmount: 15, miasmaCost: 8 },
  { id: "poacher_snare_whip", name: "Snare Whip", isSexualAttack: false, damageMultiplier: 0.9 },
];

// ----------------------------------------------------------------------------
// AETHERMOOR (level 6-14) — newly allows Humanoid per the §5.11 update
// ----------------------------------------------------------------------------

export const miasmaWraithScholar: EnemyCombatantDef = {
  id: "miasma_wraith_scholar",
  name: "Miasma Wraith Scholar",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "wraith-scholar",
  baseLevel: 10,
  combatStats: { hp: 90, maxHp: 90, str: 7, agi: 9, wis: 16, def: 6, lck: 10 },
  aiPattern: EnemyAiPattern.SupportCaster,
  abilityIds: ["scholar_whispered_temptation", "scholar_ink_lash"],
  goldDropRange: [25, 50],
  lootTableId: "wraith_scholar_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
  monsterSex: "MALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 18,
};

export const rogueArcanist: EnemyCombatantDef = {
  id: "rogue_arcanist",
  name: "Rogue Arcanist",
  monsterType: MonsterType.Humanoid,
  family: "rogue-arcanist",
  baseLevel: 12,
  combatStats: { hp: 100, maxHp: 100, str: 8, agi: 11, wis: 15, def: 7, lck: 9 },
  aiPattern: EnemyAiPattern.SupportCaster,
  abilityIds: ["arcanist_arcane_allure", "arcanist_bolt_strike"],
  goldDropRange: [30, 60],
  lootTableId: "rogue_arcanist_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 20,
};

const aethermoorAbilities: EnemyAbilityDef[] = [
  { id: "scholar_whispered_temptation", name: "Whispered Temptation", isSexualAttack: true, arousalGainAmount: 18, miasmaCost: 10 },
  { id: "scholar_ink_lash", name: "Ink Lash", isSexualAttack: false, damageMultiplier: 1.0 },
  { id: "arcanist_arcane_allure", name: "Arcane Allure", isSexualAttack: true, arousalGainAmount: 18, miasmaCost: 10 },
  { id: "arcanist_bolt_strike", name: "Bolt Strike", isSexualAttack: false, damageMultiplier: 1.1 },
];

// ----------------------------------------------------------------------------
// CRIMSON MARCH (level 12-22) — already allowed Humanoid; adding a second
// negative-NPC entry and a MiasmaCorrupted monster to pair with it
// ----------------------------------------------------------------------------

export const corruptedWarMedic: EnemyCombatantDef = {
  id: "corrupted_war_medic",
  name: "Corrupted War Medic",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "war-medic",
  baseLevel: 18,
  combatStats: { hp: 150, maxHp: 150, str: 12, agi: 10, wis: 14, def: 12, lck: 8 },
  aiPattern: EnemyAiPattern.SupportCaster,
  abilityIds: ["medic_corrupted_care", "medic_bone_saw"],
  goldDropRange: [50, 90],
  lootTableId: "war_medic_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 28,
};

export const deserterMercenary: EnemyCombatantDef = {
  id: "deserter_mercenary",
  name: "Deserter Mercenary",
  monsterType: MonsterType.Humanoid,
  family: "deserter",
  baseLevel: 16,
  combatStats: { hp: 170, maxHp: 170, str: 16, agi: 12, wis: 6, def: 13, lck: 9 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["deserter_desperate_advance", "deserter_blade_slash"],
  goldDropRange: [45, 85],
  lootTableId: "deserter_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
  monsterSex: "MALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 24,
};

const crimsonMarchAbilities: EnemyAbilityDef[] = [
  { id: "medic_corrupted_care", name: "Corrupted Care", isSexualAttack: true, arousalGainAmount: 19, miasmaCost: 11 },
  { id: "medic_bone_saw", name: "Bone Saw Slash", isSexualAttack: false, damageMultiplier: 1.1 },
  { id: "deserter_desperate_advance", name: "Desperate Advance", isSexualAttack: true, arousalGainAmount: 19, miasmaCost: 11 },
  { id: "deserter_blade_slash", name: "Blade Slash", isSexualAttack: false, damageMultiplier: 1.2 },
];

// ----------------------------------------------------------------------------
// WHISPERING WOOD (level 18-28) — newly allows Humanoid per the §5.11 update;
// pairs with the existing Corrupted Incubus already in §23.2
// ----------------------------------------------------------------------------

export const corruptedGroveNymph: EnemyCombatantDef = {
  id: "corrupted_grove_nymph",
  name: "Corrupted Grove Nymph",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "grove-nymph",
  baseLevel: 20,
  combatStats: { hp: 160, maxHp: 160, str: 12, agi: 15, wis: 18, def: 10, lck: 12 },
  aiPattern: EnemyAiPattern.SupportCaster,
  abilityIds: ["nymph_embrace", "nymph_root_snare"],
  goldDropRange: [55, 95],
  lootTableId: "grove_nymph_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 24,
};

export const feralCultScout: EnemyCombatantDef = {
  id: "feral_cult_scout",
  name: "Feral Cult Scout",
  monsterType: MonsterType.Humanoid,
  family: "cult-scout",
  baseLevel: 24,
  combatStats: { hp: 175, maxHp: 175, str: 14, agi: 18, wis: 12, def: 11, lck: 13 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["scout_feral_allure", "scout_claw_rake"],
  goldDropRange: [60, 100],
  lootTableId: "cult_scout_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 26,
};

const whisperingWoodAbilities: EnemyAbilityDef[] = [
  { id: "nymph_embrace", name: "Nymph's Embrace", isSexualAttack: true, arousalGainAmount: 21, miasmaCost: 12 },
  { id: "nymph_root_snare", name: "Root Snare", isSexualAttack: false, damageMultiplier: 1.0 },
  { id: "scout_feral_allure", name: "Feral Allure", isSexualAttack: true, arousalGainAmount: 21, miasmaCost: 12 },
  { id: "scout_claw_rake", name: "Claw Rake", isSexualAttack: false, damageMultiplier: 1.2 },
];

// ----------------------------------------------------------------------------
// AURIC COURT (level 24-34) — already had the Succubus/Malakor pairing and
// Cultist Priestess/Bandit Reaver in §23.2; adding one more negative NPC
// ----------------------------------------------------------------------------

export const cultEnforcer: EnemyCombatantDef = {
  id: "cult_enforcer",
  name: "Cult Enforcer",
  monsterType: MonsterType.Humanoid,
  family: "cult-enforcer",
  baseLevel: 30,
  combatStats: { hp: 240, maxHp: 240, str: 22, agi: 12, wis: 10, def: 18, lck: 10 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["enforcer_grip", "enforcer_mace_smash"],
  goldDropRange: [80, 140],
  lootTableId: "cult_enforcer_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
  monsterSex: "MALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 30,
};

const auricCourtAbilities: EnemyAbilityDef[] = [
  { id: "enforcer_grip", name: "Enforcer's Grip", isSexualAttack: true, arousalGainAmount: 22, miasmaCost: 13 },
  { id: "enforcer_mace_smash", name: "Mace Smash", isSexualAttack: false, damageMultiplier: 1.3 },
];

// ----------------------------------------------------------------------------
// SUNKEN SANCTUM (level 30-45) — newly allows Humanoid per the §5.11 update;
// pairs with the existing Void Concubine already in §23.2
// ----------------------------------------------------------------------------

export const voidHerald: EnemyCombatantDef = {
  id: "void_herald",
  name: "Void Herald",
  monsterType: MonsterType.VoidAberration,
  family: "void-herald",
  baseLevel: 40,
  combatStats: { hp: 420, maxHp: 420, str: 26, agi: 20, wis: 28, def: 18, lck: 14 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["herald_beckoning", "herald_void_slash"],
  goldDropRange: [700, 1000],
  lootTableId: "void_herald_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
  monsterSex: "MALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 38,
};

export const sanctumCultistRemnant: EnemyCombatantDef = {
  id: "sanctum_cultist_remnant",
  name: "Sanctum Cultist Remnant",
  monsterType: MonsterType.Humanoid,
  family: "sanctum-remnant",
  baseLevel: 38,
  combatStats: { hp: 300, maxHp: 300, str: 20, agi: 16, wis: 22, def: 16, lck: 12 },
  aiPattern: EnemyAiPattern.SupportCaster,
  abilityIds: ["remnant_lure", "remnant_corrupted_strike"],
  goldDropRange: [400, 650],
  lootTableId: "sanctum_remnant_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 34,
};

const sunkenSanctumAbilities: EnemyAbilityDef[] = [
  { id: "herald_beckoning", name: "Herald's Beckoning", isSexualAttack: true, arousalGainAmount: 26, miasmaCost: 15 },
  { id: "herald_void_slash", name: "Void Slash", isSexualAttack: false, damageMultiplier: 1.4 },
  { id: "remnant_lure", name: "Remnant's Lure", isSexualAttack: true, arousalGainAmount: 24, miasmaCost: 14 },
  { id: "remnant_corrupted_strike", name: "Corrupted Strike", isSexualAttack: false, damageMultiplier: 1.3 },
];

// ----------------------------------------------------------------------------
// ALL NEW ABILITIES, COMBINED
// ----------------------------------------------------------------------------

export const NEW_ENEMY_ABILITIES: EnemyAbilityDef[] = [
  ...verdantValeAbilities,
  ...aethermoorAbilities,
  ...crimsonMarchAbilities,
  ...whisperingWoodAbilities,
  ...auricCourtAbilities,
  ...sunkenSanctumAbilities,
];

export const NEW_ENEMIES: EnemyCombatantDef[] = [
  corruptedDryadSprite, highwaymanPoacher,
  miasmaWraithScholar, rogueArcanist,
  corruptedWarMedic, deserterMercenary,
  corruptedGroveNymph, feralCultScout,
  cultEnforcer,
  voidHerald, sanctumCultistRemnant,
];

// ----------------------------------------------------------------------------
// LOOT TABLES — for the 11 new enemies above, PLUS a retrofit of the 5
// original §23.2 examples, which previously had a dangling lootTableId with
// no LootTableDef behind it. All itemIds reference items_seed_data.ts.
// ----------------------------------------------------------------------------

export const LOOT_TABLES: LootTableDef[] = [
  // --- Retrofit of the original 5 (§23.2) --- all humanoid-form or Humanoid-type,
  // so all get a clothing/lingerie roll alongside raw + composite, per the request.
  { id: "miasma_succubus_loot_table", entries: [
    { itemId: "raw_ardor_crystal", dropChance: 0.4, quantityRange: [1, 2] },
    { itemId: "comp_dragon_perfume", dropChance: 0.15, quantityRange: [1, 1] },
    { itemId: "clo_sheer_nightgown", dropChance: 0.1, quantityRange: [1, 1] },
    { itemId: "clo_open_cup_bodysuit", dropChance: 0.06, quantityRange: [1, 1] },
  ]},
  { id: "malakor_loot_table", entries: [
    { itemId: "raw_cultist_seal", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "comp_ancient_core", dropChance: 0.1, quantityRange: [1, 1] },
    { itemId: "wpn_master_steel_blade", dropChance: 0.05, quantityRange: [1, 1] },
    { itemId: "clo_tailored_formal_suit", dropChance: 0.1, quantityRange: [1, 1] },
  ]},
  { id: "void_concubine_loot_table", entries: [
    { itemId: "raw_ardor_crystal", dropChance: 0.5, quantityRange: [2, 3] },
    { itemId: "comp_celestial_charm", dropChance: 0.1, quantityRange: [1, 1] },
    { itemId: "clo_royal_ward_gown", dropChance: 0.05, quantityRange: [1, 1] },
    { itemId: "clo_sheer_mesh_bodystocking", dropChance: 0.08, quantityRange: [1, 1] },
  ]},
  { id: "incubus_loot_table", entries: [
    { itemId: "raw_dragon_lily", dropChance: 0.3, quantityRange: [1, 2] },
    { itemId: "raw_silk_thread", dropChance: 0.4, quantityRange: [2, 4] },
    { itemId: "comp_dragon_perfume", dropChance: 0.12, quantityRange: [1, 1] },
    { itemId: "clo_lace_top_thigh_highs", dropChance: 0.1, quantityRange: [1, 1] },
  ]},
  { id: "cultist_loot_table", entries: [
    { itemId: "raw_cultist_seal", dropChance: 0.35, quantityRange: [1, 1] },
    { itemId: "comp_clarity_draught", dropChance: 0.2, quantityRange: [1, 2] },
    { itemId: "clo_pure_silk_underslip", dropChance: 0.1, quantityRange: [1, 1] },
  ]},
  { id: "bandit_loot_table", entries: [
    { itemId: "raw_leather_scrap", dropChance: 0.5, quantityRange: [1, 3] },
    { itemId: "wpn_dagger", dropChance: 0.1, quantityRange: [1, 1] },
    { itemId: "comp_health_potion", dropChance: 0.2, quantityRange: [1, 1] },
    { itemId: "clo_rough_hemp_wraps", dropChance: 0.15, quantityRange: [1, 1] },
  ]},
  // --- New for this pass ---
  { id: "dryad_sprite_loot_table", entries: [
    { itemId: "raw_moon_mint_leaf", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "raw_healing_herb", dropChance: 0.4, quantityRange: [1, 2] },
    { itemId: "comp_clarity_draught", dropChance: 0.15, quantityRange: [1, 1] },
    { itemId: "clo_petal_woven_slip", dropChance: 0.08, quantityRange: [1, 1] },
  ]},
  { id: "poacher_loot_table", entries: [
    { itemId: "raw_leather_scrap", dropChance: 0.45, quantityRange: [1, 2] },
    { itemId: "raw_wolf_pelt", dropChance: 0.2, quantityRange: [1, 1] },
    { itemId: "comp_health_potion", dropChance: 0.15, quantityRange: [1, 1] },
    { itemId: "clo_cotton_bloomers", dropChance: 0.15, quantityRange: [1, 1] },
  ]},
  { id: "wraith_scholar_loot_table", entries: [
    { itemId: "raw_ancient_manuscript", dropChance: 0.3, quantityRange: [1, 1] },
    { itemId: "comp_skill_scroll", dropChance: 0.1, quantityRange: [1, 1] },
    { itemId: "clo_ribboned_panties", dropChance: 0.1, quantityRange: [1, 1] },
  ]},
  { id: "rogue_arcanist_loot_table", entries: [
    { itemId: "raw_arcane_core", dropChance: 0.25, quantityRange: [1, 1] },
    { itemId: "wpn_quill_blade", dropChance: 0.08, quantityRange: [1, 1] },
    { itemId: "comp_skill_scroll", dropChance: 0.12, quantityRange: [1, 1] },
    { itemId: "clo_archivist_spectacles", dropChance: 0.1, quantityRange: [1, 1] },
  ]},
  { id: "deserter_loot_table", entries: [
    { itemId: "raw_dragonscale_shard", dropChance: 0.2, quantityRange: [1, 1] },
    { itemId: "arm_studded_leather_jerkin", dropChance: 0.1, quantityRange: [1, 1] },
    { itemId: "comp_health_potion", dropChance: 0.2, quantityRange: [1, 1] },
    { itemId: "clo_rough_hemp_wraps", dropChance: 0.12, quantityRange: [1, 1] },
  ]},
  { id: "war_medic_loot_table", entries: [
    { itemId: "raw_frost_core", dropChance: 0.25, quantityRange: [1, 1] },
    { itemId: "comp_health_potion", dropChance: 0.3, quantityRange: [1, 2] },
    { itemId: "clo_sheer_nurse_uniform", dropChance: 0.08, quantityRange: [1, 1] },
  ]},
  { id: "grove_nymph_loot_table", entries: [
    { itemId: "raw_bioluminescent_fungi", dropChance: 0.4, quantityRange: [1, 2] },
    { itemId: "raw_moon_spider_cocoon", dropChance: 0.25, quantityRange: [1, 1] },
    { itemId: "comp_moon_silk_bolt", dropChance: 0.12, quantityRange: [1, 1] },
    { itemId: "clo_petal_woven_slip", dropChance: 0.08, quantityRange: [1, 1] },
  ]},
  { id: "cult_scout_loot_table", entries: [
    { itemId: "raw_shadow_pelt", dropChance: 0.3, quantityRange: [1, 1] },
    { itemId: "clo_sheer_lace_panties", dropChance: 0.1, quantityRange: [1, 1] },
    { itemId: "comp_clarity_draught", dropChance: 0.15, quantityRange: [1, 1] },
  ]},
  { id: "cult_enforcer_loot_table", entries: [
    { itemId: "raw_cultist_seal", dropChance: 0.4, quantityRange: [1, 2] },
    { itemId: "arm_chainmail_shirt", dropChance: 0.08, quantityRange: [1, 1] },
    { itemId: "comp_sacred_rosary", dropChance: 0.08, quantityRange: [1, 1] },
    { itemId: "clo_rough_hemp_wraps", dropChance: 0.12, quantityRange: [1, 1] },
  ]},
  { id: "void_herald_loot_table", entries: [
    { itemId: "raw_ardor_crystal", dropChance: 0.45, quantityRange: [1, 2] },
    { itemId: "raw_arcane_core", dropChance: 0.2, quantityRange: [1, 1] },
    { itemId: "comp_celestial_charm", dropChance: 0.1, quantityRange: [1, 1] },
    { itemId: "clo_sheer_mesh_bodystocking", dropChance: 0.07, quantityRange: [1, 1] },
  ]},
  { id: "sanctum_remnant_loot_table", entries: [
    { itemId: "raw_golden_sun_tablet", dropChance: 0.15, quantityRange: [1, 1] },
    { itemId: "comp_ancient_core", dropChance: 0.08, quantityRange: [1, 1] },
    { itemId: "clo_royal_starlight_negligee", dropChance: 0.04, quantityRange: [1, 1] },
  ]},
];
