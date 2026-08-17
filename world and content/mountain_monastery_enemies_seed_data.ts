// ============================================================================
// OJISAN IN ANOTHER WORLD — MOUNTAIN MONASTERY ENEMY ROSTER
// Closes the last named-but-unfilled item from §2.2/§27: Mountain Monastery
// had a map (§18.7), a RegionMonsterProfile row (§5.11, level 22-32,
// MiasmaCorrupted/Humanoid/Beast), and zero actual EnemyCombatantDef entries.
// This file gives it a full small bestiary, a mini-boss, and the confirmed
// Catacombs of Ash final boss the RegionMonsterProfile note flagged as open.
//
// Density check (§5.11's 30% guideline, Humanoid+MiasmaCorrupted only, same
// scope as every other region's verified table): Fallen Penitent (Humanoid,
// no sexual attack), Corrupted Bell Keeper (Humanoid, no sexual attack),
// Ashen Choir Sister (MiasmaCorrupted, sexual, FEMALE), Penitent Flagellant
// (Humanoid, sexual, MALE), Ash-Veiled Wraith (MiasmaCorrupted, no sexual
// attack), Sera's Shadow (MiasmaCorrupted mini-boss, sexual, FEMALE), the
// Ashen Penitent Mother (MiasmaCorrupted final boss, no sexual attack) = 7
// total, 3 with a sexual attack = 43%. Clears 30% comfortably. Corrupted
// Mountain Wolf is Beast-type and doesn't count toward this metric, same
// exclusion rule as every other region.
// ============================================================================

import {
  EnemyCombatantDef, EnemyAbilityDef, LootTableDef,
  MonsterType, EnemyAiPattern, NpcLegalClass,
} from "./schemas";

export const corruptedMountainWolf: EnemyCombatantDef = {
  id: "corrupted_mountain_wolf",
  name: "Corrupted Mountain Wolf",
  monsterType: MonsterType.Beast,
  family: "mountain-wolf",
  baseLevel: 22,
  combatStats: { hp: 170, maxHp: 170, str: 19, agi: 16, wis: 6, def: 12, lck: 8 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["wolf_howling_lunge"],
  goldDropRange: [70, 110],
  lootTableId: "mountain_wolf_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
};

export const fallenPenitent: EnemyCombatantDef = {
  id: "fallen_penitent",
  name: "Fallen Penitent",
  monsterType: MonsterType.Humanoid,
  family: "fallen-penitent",
  baseLevel: 24,
  combatStats: { hp: 190, maxHp: 190, str: 20, agi: 12, wis: 10, def: 15, lck: 8 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["penitent_flagellant_lash"],
  goldDropRange: [80, 130],
  lootTableId: "fallen_penitent_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
};

export const ashenChoirSister: EnemyCombatantDef = {
  id: "ashen_choir_sister",
  name: "Ashen Choir Sister",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "ashen-choir",
  baseLevel: 26,
  combatStats: { hp: 210, maxHp: 210, str: 16, agi: 14, wis: 20, def: 14, lck: 10 },
  aiPattern: EnemyAiPattern.SupportCaster,
  abilityIds: ["choir_of_ash_kiss", "resonant_wail"],
  goldDropRange: [90, 140],
  lootTableId: "ashen_choir_sister_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 22,
};

export const penitentFlagellant: EnemyCombatantDef = {
  id: "penitent_flagellant",
  name: "Penitent Flagellant",
  monsterType: MonsterType.Humanoid,
  family: "flagellant",
  baseLevel: 28,
  combatStats: { hp: 230, maxHp: 230, str: 22, agi: 13, wis: 11, def: 16, lck: 9 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["penance_embrace", "chain_lash"],
  goldDropRange: [100, 155],
  lootTableId: "penitent_flagellant_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
  monsterSex: "MALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 24,
};

export const corruptedBellKeeper: EnemyCombatantDef = {
  id: "corrupted_bell_keeper",
  name: "Corrupted Bell Keeper",
  monsterType: MonsterType.Humanoid,
  family: "bell-keeper",
  baseLevel: 25,
  combatStats: { hp: 200, maxHp: 200, str: 18, agi: 11, wis: 9, def: 17, lck: 7 },
  aiPattern: EnemyAiPattern.Defensive,
  abilityIds: ["bell_toll_shockwave"],
  goldDropRange: [85, 135],
  lootTableId: "bell_keeper_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
};

export const ashVeiledWraith: EnemyCombatantDef = {
  id: "ash_veiled_wraith",
  name: "Ash-Veiled Wraith",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "ash-wraith",
  baseLevel: 29,
  combatStats: { hp: 250, maxHp: 250, str: 20, agi: 15, wis: 18, def: 16, lck: 9 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["ashen_grasp"],
  goldDropRange: [110, 165],
  lootTableId: "ash_veiled_wraith_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
};

export const serasShadow: EnemyCombatantDef = {
  id: "seras_shadow",
  name: "Sera's Shadow",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "seras-shadow",
  baseLevel: 31,
  combatStats: { hp: 400, maxHp: 400, str: 24, agi: 18, wis: 24, def: 18, lck: 12 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["mirrored_longing", "shadow_wing_slash"],
  goldDropRange: [350, 500],
  lootTableId: "seras_shadow_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // a corrupted mirror of Sera herself, encountered before the Catacombs proper — a mini-boss, not the region's main boss
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 32,
};

export const ashenPenitentMother: EnemyCombatantDef = {
  id: "ashen_penitent_mother",
  name: "The Ashen Penitent Mother",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "penitent-mother",
  baseLevel: 32,
  combatStats: { hp: 2400, maxHp: 2400, str: 32, agi: 14, wis: 26, def: 22, lck: 12 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["penitents_wail", "ashen_regeneration"],
  goldDropRange: [1000, 1400],
  lootTableId: "ashen_penitent_mother_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // the region's confirmed final boss — a corrupted abbess figure, not humanoid-form for the sexual-attack rule; scale matches Heartwood Abomination as the comparable Act-tier boss
};

const MOUNTAIN_MONASTERY_ABILITIES: EnemyAbilityDef[] = [
  { id: "wolf_howling_lunge", name: "Howling Lunge", isSexualAttack: false, damageMultiplier: 1.1 },
  { id: "penitent_flagellant_lash", name: "Flagellant's Lash", isSexualAttack: false, damageMultiplier: 1.2 },
  { id: "choir_of_ash_kiss", name: "Choir of Ash Kiss", isSexualAttack: true, arousalGainAmount: 20, miasmaCost: 11 },
  { id: "resonant_wail", name: "Resonant Wail", isSexualAttack: false, damageMultiplier: 1.1 },
  { id: "penance_embrace", name: "Penance Embrace", isSexualAttack: true, arousalGainAmount: 21, miasmaCost: 12 },
  { id: "chain_lash", name: "Chain Lash", isSexualAttack: false, damageMultiplier: 1.3 },
  { id: "bell_toll_shockwave", name: "Bell Toll Shockwave", isSexualAttack: false, damageMultiplier: 1.2 },
  { id: "ashen_grasp", name: "Ashen Grasp", isSexualAttack: false, damageMultiplier: 1.3 },
  { id: "mirrored_longing", name: "Mirrored Longing", isSexualAttack: true, arousalGainAmount: 26, miasmaCost: 15 },
  { id: "shadow_wing_slash", name: "Shadow Wing Slash", isSexualAttack: false, damageMultiplier: 1.5 },
  { id: "penitents_wail", name: "Penitents' Wail", isSexualAttack: false, damageMultiplier: 1.6 },
  { id: "ashen_regeneration", name: "Ashen Regeneration", isSexualAttack: false, damageMultiplier: 0 }, // matches Heartwood Abomination's regen-per-turn pattern, §23.2
];

export const MOUNTAIN_MONASTERY_ENEMY_ABILITIES: EnemyAbilityDef[] = MOUNTAIN_MONASTERY_ABILITIES;

export const MOUNTAIN_MONASTERY_ENEMIES: EnemyCombatantDef[] = [
  corruptedMountainWolf, fallenPenitent, ashenChoirSister, penitentFlagellant,
  corruptedBellKeeper, ashVeiledWraith, serasShadow, ashenPenitentMother,
];

export const MOUNTAIN_MONASTERY_LOOT_TABLES: LootTableDef[] = [
  { id: "mountain_wolf_loot_table", entries: [
    { itemId: "raw_healing_herb", dropChance: 0.4, quantityRange: [1, 2] },
    { itemId: "comp_health_potion", dropChance: 0.1, quantityRange: [1, 1] },
  ]},
  { id: "fallen_penitent_loot_table", entries: [
    { itemId: "raw_silk_thread", dropChance: 0.35, quantityRange: [1, 2] },
    { itemId: "comp_health_potion", dropChance: 0.15, quantityRange: [1, 1] },
    { itemId: "clo_white_linen_veil", dropChance: 0.1, quantityRange: [1, 1] },
  ]},
  { id: "ashen_choir_sister_loot_table", entries: [
    { itemId: "raw_ardor_crystal", dropChance: 0.35, quantityRange: [1, 1] },
    { itemId: "comp_clarity_draught", dropChance: 0.15, quantityRange: [1, 1] },
    { itemId: "clo_pure_silk_underslip", dropChance: 0.08, quantityRange: [1, 1] },
  ]},
  { id: "penitent_flagellant_loot_table", entries: [
    { itemId: "raw_cultist_seal", dropChance: 0.3, quantityRange: [1, 1] },
    { itemId: "comp_crest_tonic", dropChance: 0.15, quantityRange: [1, 1] },
    { itemId: "arm_sacred_white_vestment", dropChance: 0.08, quantityRange: [1, 1] },
  ]},
  { id: "bell_keeper_loot_table", entries: [
    { itemId: "raw_iron_ingot", dropChance: 0.3, quantityRange: [1, 2] },
    { itemId: "comp_health_potion", dropChance: 0.2, quantityRange: [1, 1] },
    { itemId: "clo_holy_symbol_rosary", dropChance: 0.08, quantityRange: [1, 1] },
  ]},
  { id: "ash_veiled_wraith_loot_table", entries: [
    { itemId: "raw_frost_core", dropChance: 0.25, quantityRange: [1, 1] },
    { itemId: "comp_clarity_draught", dropChance: 0.15, quantityRange: [1, 1] },
  ]},
  { id: "seras_shadow_loot_table", entries: [
    { itemId: "raw_ardor_crystal", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "comp_sacred_rosary", dropChance: 0.12, quantityRange: [1, 1] },
    { itemId: "arm_pleated_long_skirt", dropChance: 0.08, quantityRange: [1, 1] },
  ]},
  { id: "ashen_penitent_mother_loot_table", entries: [
    { itemId: "raw_golden_sun_tablet", dropChance: 0.2, quantityRange: [1, 1] },
    { itemId: "comp_ancient_core", dropChance: 0.12, quantityRange: [1, 1] },
    { itemId: "arm_soft_sandals", dropChance: 0.1, quantityRange: [1, 1] },
  ]},
];
