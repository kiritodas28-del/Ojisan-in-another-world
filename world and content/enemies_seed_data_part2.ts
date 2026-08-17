// ============================================================================
// OJISAN IN ANOTHER WORLD — ENEMY ROSTER, PART 2
// Companion file to enemies_seed_data.ts (Part 1). Closes the biggest real
// gap from the last pass: every boss and named trash-mob type the GDD
// mentions by name in §3 (Main Quest) and §5.11's region table, but which
// never had a full EnemyCombatantDef — Blighted Treant, Miasma Wraith
// Archivist, Rogue Battle Golem, Crimson Wyrmling, Miasma Wyrm, Shadow
// Panther, Heartwood Abomination, Void Stalker, and the Primordial Ache were
// all just names in a table cell until now.
//
// Also adds density-balancing fillers so §5.11's 30% guideline is checked
// with real numbers per region — see the VERIFIED DENSITY TABLE at the
// bottom of this file, not just an aspirational claim.
//
// One reassignment from Part 1: Bandit Reaver's baseLevel (10) fits
// Aethermoor's 6-14 range, not Verdant Vale's 1-8 — it's recounted under
// Aethermoor below. No code change to Part 1 was needed, just a correction
// to which region's density math it counts toward.
// ============================================================================

import {
  EnemyCombatantDef, EnemyAbilityDef, LootTableDef,
  MonsterType, EnemyAiPattern, NpcLegalClass,
} from "./schemas";

// ----------------------------------------------------------------------------
// VERDANT VALE (1-8)
// ----------------------------------------------------------------------------

export const blightedDirewolf: EnemyCombatantDef = {
  id: "blighted_direwolf",
  name: "Blighted Direwolf",
  monsterType: MonsterType.Beast,
  family: "wolf",
  baseLevel: 3,
  combatStats: { hp: 60, maxHp: 60, str: 9, agi: 12, wis: 4, def: 5, lck: 6 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["direwolf_bite_lunge"],
  goldDropRange: [5, 15],
  lootTableId: "direwolf_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
};

export const blightedTreant: EnemyCombatantDef = {
  id: "blighted_treant",
  name: "Blighted Treant",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "treant",
  baseLevel: 8,
  combatStats: { hp: 450, maxHp: 450, str: 18, agi: 4, wis: 10, def: 16, lck: 5 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["treant_root_slam", "treant_bark_swipe"],
  goldDropRange: [150, 220],
  lootTableId: "blighted_treant_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // a corrupted tree — no monsterSex/isHumanoidForm, purifiable via MonsterType alone
};

export const feralBoar: EnemyCombatantDef = {
  id: "feral_boar",
  name: "Feral Boar",
  monsterType: MonsterType.Beast,
  family: "boar",
  baseLevel: 2,
  combatStats: { hp: 40, maxHp: 40, str: 8, agi: 9, wis: 2, def: 6, lck: 4 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["boar_charge"],
  goldDropRange: [4, 10],
  lootTableId: "feral_boar_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
};

export const valeGuardsmanTurnedFeral: EnemyCombatantDef = {
  id: "vale_guardsman_turned_feral",
  name: "Vale Guardsman, Turned Feral",
  monsterType: MonsterType.Humanoid,
  family: "feral-guardsman",
  baseLevel: 6,
  combatStats: { hp: 70, maxHp: 70, str: 10, agi: 8, wis: 4, def: 9, lck: 5 },
  aiPattern: EnemyAiPattern.Defensive,
  abilityIds: ["guardsman_spear_thrust"],
  goldDropRange: [15, 30],
  lootTableId: "vale_guardsman_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true, // a person, not a monster — no sexual attack, deliberately non-purifiable-by-arousal-in-practice content
};

const verdantValePart2Abilities: EnemyAbilityDef[] = [
  { id: "direwolf_bite_lunge", name: "Bite Lunge", isSexualAttack: false, damageMultiplier: 1.0 },
  { id: "treant_root_slam", name: "Root Slam", isSexualAttack: false, damageMultiplier: 1.4 },
  { id: "treant_bark_swipe", name: "Bark Swipe", isSexualAttack: false, damageMultiplier: 1.1 },
  { id: "boar_charge", name: "Charge", isSexualAttack: false, damageMultiplier: 1.2 },
  { id: "guardsman_spear_thrust", name: "Spear Thrust", isSexualAttack: false, damageMultiplier: 1.0 },
];

// ----------------------------------------------------------------------------
// AETHERMOOR (6-14)
// ----------------------------------------------------------------------------

export const miasmaWraithArchivist: EnemyCombatantDef = {
  id: "miasma_wraith_archivist",
  name: "Miasma Wraith Archivist",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "wraith-archivist",
  baseLevel: 14,
  combatStats: { hp: 850, maxHp: 850, str: 20, agi: 16, wis: 30, def: 18, lck: 14 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["archivist_mental_illusion", "archivist_wis_drain"],
  goldDropRange: [300, 450],
  lootTableId: "miasma_wraith_archivist_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // a spectral entity — no sexual attack; the boss's threat is mental illusions/WIS debuffs per the GDD
};

export const rogueBattleGolem: EnemyCombatantDef = {
  id: "rogue_battle_golem",
  name: "Rogue Battle Golem",
  monsterType: MonsterType.Construct,
  family: "golem",
  baseLevel: 12,
  combatStats: { hp: 300, maxHp: 300, str: 22, agi: 3, wis: 6, def: 24, lck: 4 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["golem_slam", "golem_overload"],
  goldDropRange: [120, 180],
  lootTableId: "rogue_battle_golem_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // Construct — not purifiable at all per §23.1's exclusion, kill-only by design
};

export const academySentinelCorrupted: EnemyCombatantDef = {
  id: "academy_sentinel_corrupted",
  name: "Corrupted Academy Sentinel",
  monsterType: MonsterType.Humanoid,
  family: "corrupted-sentinel",
  baseLevel: 9,
  combatStats: { hp: 95, maxHp: 95, str: 11, agi: 9, wis: 8, def: 10, lck: 6 },
  aiPattern: EnemyAiPattern.Defensive,
  abilityIds: ["sentinel_halberd_sweep"],
  goldDropRange: [25, 45],
  lootTableId: "academy_sentinel_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
};

const aethermoorPart2Abilities: EnemyAbilityDef[] = [
  { id: "archivist_mental_illusion", name: "Mental Illusion", isSexualAttack: false, damageMultiplier: 1.2 },
  { id: "archivist_wis_drain", name: "Wisdom Drain", isSexualAttack: false, damageMultiplier: 0.9 },
  { id: "golem_slam", name: "Golem Slam", isSexualAttack: false, damageMultiplier: 1.5 },
  { id: "golem_overload", name: "Arcane Overload", isSexualAttack: false, damageMultiplier: 1.8 },
  { id: "sentinel_halberd_sweep", name: "Halberd Sweep", isSexualAttack: false, damageMultiplier: 1.1 },
];

// ----------------------------------------------------------------------------
// CRIMSON MARCH (12-22)
// ----------------------------------------------------------------------------

export const crimsonWyrmling: EnemyCombatantDef = {
  id: "crimson_wyrmling",
  name: "Crimson Wyrmling",
  monsterType: MonsterType.Draconic,
  family: "wyrmling",
  baseLevel: 14,
  combatStats: { hp: 180, maxHp: 180, str: 18, agi: 12, wis: 8, def: 14, lck: 8 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["wyrmling_fire_breath", "wyrmling_claw"],
  goldDropRange: [60, 100],
  lootTableId: "crimson_wyrmling_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
};

export const miasmaWyrm: EnemyCombatantDef = {
  id: "miasma_wyrm",
  name: "Miasma Wyrm",
  monsterType: MonsterType.Draconic,
  family: "wyrm",
  baseLevel: 22,
  combatStats: { hp: 1600, maxHp: 1600, str: 34, agi: 14, wis: 20, def: 26, lck: 12 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["wyrm_multi_breath", "wyrm_tail_sweep"],
  goldDropRange: [600, 900],
  lootTableId: "miasma_wyrm_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
};

export const warTornDeserterGrunt: EnemyCombatantDef = {
  id: "war_torn_deserter_grunt",
  name: "War-Torn Deserter Grunt",
  monsterType: MonsterType.Humanoid,
  family: "deserter-grunt",
  baseLevel: 14,
  combatStats: { hp: 130, maxHp: 130, str: 14, agi: 10, wis: 5, def: 11, lck: 7 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["grunt_blade_swing"],
  goldDropRange: [35, 65],
  lootTableId: "deserter_grunt_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
};

const crimsonMarchPart2Abilities: EnemyAbilityDef[] = [
  { id: "wyrmling_fire_breath", name: "Fire Breath", isSexualAttack: false, damageMultiplier: 1.3 },
  { id: "wyrmling_claw", name: "Claw", isSexualAttack: false, damageMultiplier: 1.0 },
  { id: "wyrm_multi_breath", name: "Multi-Target Breath", isSexualAttack: false, damageMultiplier: 1.6 },
  { id: "wyrm_tail_sweep", name: "Tail Sweep", isSexualAttack: false, damageMultiplier: 1.3 },
  { id: "grunt_blade_swing", name: "Blade Swing", isSexualAttack: false, damageMultiplier: 1.1 },
];

// ----------------------------------------------------------------------------
// WHISPERING WOOD (18-28)
// ----------------------------------------------------------------------------

export const shadowPanther: EnemyCombatantDef = {
  id: "shadow_panther",
  name: "Shadow Panther",
  monsterType: MonsterType.Beast,
  family: "panther",
  baseLevel: 20,
  combatStats: { hp: 210, maxHp: 210, str: 20, agi: 24, wis: 8, def: 12, lck: 14 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["panther_pounce"],
  goldDropRange: [70, 110],
  lootTableId: "shadow_panther_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
};

export const heartwoodAbomination: EnemyCombatantDef = {
  id: "heartwood_abomination",
  name: "Heartwood Abomination",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "abomination",
  baseLevel: 28,
  combatStats: { hp: 2200, maxHp: 2200, str: 30, agi: 8, wis: 22, def: 24, lck: 10 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["abomination_regenerate", "abomination_crushing_bough"],
  goldDropRange: [900, 1300],
  lootTableId: "heartwood_abomination_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // regenerates 100 HP/turn per the GDD — bossScriptId handles this, no sexual attack
};

export const corruptedDryadWarden: EnemyCombatantDef = {
  id: "corrupted_dryad_warden",
  name: "Corrupted Dryad Warden",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "dryad-warden",
  baseLevel: 22,
  combatStats: { hp: 190, maxHp: 190, str: 16, agi: 14, wis: 20, def: 16, lck: 10 },
  aiPattern: EnemyAiPattern.Defensive,
  abilityIds: ["warden_thorn_barrage"],
  goldDropRange: [65, 105],
  lootTableId: "dryad_warden_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
};

const whisperingWoodPart2Abilities: EnemyAbilityDef[] = [
  { id: "panther_pounce", name: "Pounce", isSexualAttack: false, damageMultiplier: 1.2 },
  { id: "abomination_regenerate", name: "Regenerate", isSexualAttack: false, damageMultiplier: 0 },
  { id: "abomination_crushing_bough", name: "Crushing Bough", isSexualAttack: false, damageMultiplier: 1.7 },
  { id: "warden_thorn_barrage", name: "Thorn Barrage", isSexualAttack: false, damageMultiplier: 1.2 },
];

// ----------------------------------------------------------------------------
// AURIC COURT (24-34)
// ----------------------------------------------------------------------------

export const miasmaCultistGrunt: EnemyCombatantDef = {
  id: "miasma_cultist_grunt",
  name: "Miasma Cultist Grunt",
  monsterType: MonsterType.Humanoid,
  family: "cultist-grunt",
  baseLevel: 26,
  combatStats: { hp: 190, maxHp: 190, str: 17, agi: 13, wis: 12, def: 14, lck: 9 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["cultist_grunt_dagger_stab"],
  goldDropRange: [55, 90],
  lootTableId: "cultist_grunt_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
};

const auricCourtPart2Abilities: EnemyAbilityDef[] = [
  { id: "cultist_grunt_dagger_stab", name: "Dagger Stab", isSexualAttack: false, damageMultiplier: 1.1 },
];

// ----------------------------------------------------------------------------
// SUNKEN SANCTUM (30-45)
// ----------------------------------------------------------------------------

export const voidStalker: EnemyCombatantDef = {
  id: "void_stalker",
  name: "Void Stalker",
  monsterType: MonsterType.VoidAberration,
  family: "void-stalker",
  baseLevel: 32,
  combatStats: { hp: 340, maxHp: 340, str: 24, agi: 22, wis: 18, def: 16, lck: 12 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["stalker_void_rend"],
  goldDropRange: [180, 260],
  lootTableId: "void_stalker_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
};

export const ancientRuinGuardian: EnemyCombatantDef = {
  id: "ancient_ruin_guardian",
  name: "Ancient Ruin Guardian",
  monsterType: MonsterType.Construct,
  family: "ruin-guardian",
  baseLevel: 36,
  combatStats: { hp: 500, maxHp: 500, str: 28, agi: 6, wis: 10, def: 32, lck: 6 },
  aiPattern: EnemyAiPattern.Defensive,
  abilityIds: ["guardian_seal_slam"],
  goldDropRange: [250, 400],
  lootTableId: "ancient_guardian_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // Construct — kill-only, same as Rogue Battle Golem
};

export const sanctumGuardRemnant: EnemyCombatantDef = {
  id: "sanctum_guard_remnant",
  name: "Sanctum Guard Remnant",
  monsterType: MonsterType.Humanoid,
  family: "sanctum-guard-remnant",
  baseLevel: 34,
  combatStats: { hp: 280, maxHp: 280, str: 22, agi: 15, wis: 14, def: 20, lck: 10 },
  aiPattern: EnemyAiPattern.Defensive,
  abilityIds: ["remnant_guard_pike_thrust"],
  goldDropRange: [150, 220],
  lootTableId: "sanctum_guard_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
};

const sunkenSanctumPart2Abilities: EnemyAbilityDef[] = [
  { id: "stalker_void_rend", name: "Void Rend", isSexualAttack: false, damageMultiplier: 1.3 },
  { id: "guardian_seal_slam", name: "Seal Slam", isSexualAttack: false, damageMultiplier: 1.6 },
  { id: "remnant_guard_pike_thrust", name: "Pike Thrust", isSexualAttack: false, damageMultiplier: 1.2 },
];

// ----------------------------------------------------------------------------
// CELESTIAL THRESHOLD (40-60) — one-off, Cosmic, hand-scripted, not part of
// any reusable regional pool. §5.11's density guideline explicitly excludes
// Cosmic-type content, so this isn't counted toward any region's percentage.
// ----------------------------------------------------------------------------

export const primordialAche: EnemyCombatantDef = {
  id: "primordial_ache",
  name: "The Primordial Ache",
  monsterType: MonsterType.Cosmic,
  family: "cosmic-entity",
  baseLevel: 60,
  combatStats: { hp: 5000, maxHp: 5000, str: 45, agi: 20, wis: 40, def: 30, lck: 20 }, // Phase 1 stats per the GDD
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["ache_cosmic_storm"],
  goldDropRange: [0, 0], // final boss — story resolution, not a loot-driven encounter
  lootTableId: "primordial_ache_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // Cosmic — not purifiable via the standard mechanic at all; resolved via the
  // GDD's own Phase 3A/3B Combat vs. Compassion path, not §23's arousal mechanic
};

const celestialThresholdAbilities: EnemyAbilityDef[] = [
  { id: "ache_cosmic_storm", name: "Cosmic Storm", isSexualAttack: false, damageMultiplier: 2.0 },
];

// ----------------------------------------------------------------------------
// ALL NEW ABILITIES AND ENEMIES, COMBINED
// ----------------------------------------------------------------------------

export const PART2_ENEMY_ABILITIES: EnemyAbilityDef[] = [
  ...verdantValePart2Abilities,
  ...aethermoorPart2Abilities,
  ...crimsonMarchPart2Abilities,
  ...whisperingWoodPart2Abilities,
  ...auricCourtPart2Abilities,
  ...sunkenSanctumPart2Abilities,
  ...celestialThresholdAbilities,
];

export const PART2_ENEMIES: EnemyCombatantDef[] = [
  blightedDirewolf, blightedTreant, feralBoar, valeGuardsmanTurnedFeral,
  miasmaWraithArchivist, rogueBattleGolem, academySentinelCorrupted,
  crimsonWyrmling, miasmaWyrm, warTornDeserterGrunt,
  shadowPanther, heartwoodAbomination, corruptedDryadWarden,
  miasmaCultistGrunt,
  voidStalker, ancientRuinGuardian, sanctumGuardRemnant,
  primordialAche,
];

// ----------------------------------------------------------------------------
// LOOT TABLES for all of the above
// ----------------------------------------------------------------------------

export const PART2_LOOT_TABLES: LootTableDef[] = [
  // Beast/Construct/Draconic entries: raw + composite only, deliberately no
  // clothing — a wolf or a golem has nothing to plausibly drop that fits.
  {
    id: "direwolf_loot_table", entries: [
      { itemId: "raw_wolf_pelt", dropChance: 0.8, quantityRange: [1, 1] },
      { itemId: "raw_wolf_fang", dropChance: 0.25, quantityRange: [1, 2] },
      { itemId: "comp_health_potion", dropChance: 0.1, quantityRange: [1, 1] },
    ]
  },
  {
    id: "blighted_treant_loot_table", entries: [
      { itemId: "raw_healing_herb", dropChance: 0.5, quantityRange: [2, 4] },
      { itemId: "wpn_living_branch_staff", dropChance: 0.03, quantityRange: [1, 1] },
      { itemId: "comp_clarity_draught", dropChance: 0.15, quantityRange: [1, 1] },
    ]
  },
  {
    id: "feral_boar_loot_table", entries: [
      { itemId: "raw_leather_scrap", dropChance: 0.4, quantityRange: [1, 2] },
      { itemId: "comp_health_potion", dropChance: 0.08, quantityRange: [1, 1] },
    ]
  },
  // Humanoid — all get raw + composite + clothing/lingerie.
  {
    id: "vale_guardsman_loot_table", entries: [
      { itemId: "arm_steel_kettle_helm", dropChance: 0.1, quantityRange: [1, 1] },
      { itemId: "raw_iron_ingot", dropChance: 0.3, quantityRange: [1, 2] },
      { itemId: "comp_health_potion", dropChance: 0.2, quantityRange: [1, 1] },
      { itemId: "clo_simple_cotton_dress", dropChance: 0.1, quantityRange: [1, 1] },
    ]
  },
  // MiasmaCorrupted, spectral — not humanoid-form for the targeting rule, but a
  // low-chance robe/relic drop still fits "remnants of who she was in life."
  {
    id: "miasma_wraith_archivist_loot_table", entries: [
      { itemId: "raw_ancient_manuscript", dropChance: 0.4, quantityRange: [1, 2] },
      { itemId: "comp_skill_scroll", dropChance: 0.15, quantityRange: [1, 1] },
      { itemId: "wpn_spell_tome", dropChance: 0.04, quantityRange: [1, 1] },
      { itemId: "clo_archivists_unbound_robe", dropChance: 0.06, quantityRange: [1, 1] },
    ]
  },
  {
    id: "rogue_battle_golem_loot_table", entries: [
      { itemId: "raw_arcane_core", dropChance: 0.5, quantityRange: [2, 3] },
      { itemId: "raw_iron_ingot", dropChance: 0.4, quantityRange: [2, 4] },
      { itemId: "comp_refined_ingot", dropChance: 0.15, quantityRange: [1, 1] },
    ]
  },
  {
    id: "academy_sentinel_loot_table", entries: [
      { itemId: "raw_silk_thread", dropChance: 0.3, quantityRange: [1, 2] },
      { itemId: "comp_skill_scroll", dropChance: 0.1, quantityRange: [1, 1] },
      { itemId: "clo_archivist_spectacles", dropChance: 0.1, quantityRange: [1, 1] },
    ]
  },
  {
    id: "crimson_wyrmling_loot_table", entries: [
      { itemId: "raw_dragonscale_shard", dropChance: 0.35, quantityRange: [1, 1] },
      { itemId: "comp_stamina_elixir", dropChance: 0.12, quantityRange: [1, 1] },
    ]
  },
  {
    id: "miasma_wyrm_loot_table", entries: [
      { itemId: "raw_dragonscale_shard", dropChance: 0.6, quantityRange: [2, 3] },
      { itemId: "wpn_crimson_broadsword", dropChance: 0.03, quantityRange: [1, 1] },
      { itemId: "comp_ancient_core", dropChance: 0.1, quantityRange: [1, 1] },
    ]
  },
  {
    id: "deserter_grunt_loot_table", entries: [
      { itemId: "raw_leather_scrap", dropChance: 0.4, quantityRange: [1, 2] },
      { itemId: "raw_iron_ingot", dropChance: 0.2, quantityRange: [1, 1] },
      { itemId: "comp_health_potion", dropChance: 0.15, quantityRange: [1, 1] },
      { itemId: "clo_rough_hemp_wraps", dropChance: 0.1, quantityRange: [1, 1] },
    ]
  },
  {
    id: "shadow_panther_loot_table", entries: [
      { itemId: "raw_shadow_pelt", dropChance: 0.45, quantityRange: [1, 1] },
      { itemId: "comp_clarity_draught", dropChance: 0.1, quantityRange: [1, 1] },
    ]
  },
  {
    id: "heartwood_abomination_loot_table", entries: [
      { itemId: "raw_bioluminescent_fungi", dropChance: 0.5, quantityRange: [2, 3] },
      { itemId: "quest_rare_seed_core", dropChance: 0.1, quantityRange: [1, 1] },
      { itemId: "comp_moon_silk_bolt", dropChance: 0.1, quantityRange: [1, 1] },
    ]
  },
  // MiasmaCorrupted dryad, not flagged isHumanoidForm (no sexual attack authored),
  // but "dryad" is thematically humanoid enough to plausibly carry a nature-item.
  {
    id: "dryad_warden_loot_table", entries: [
      { itemId: "raw_moon_spider_cocoon", dropChance: 0.3, quantityRange: [1, 1] },
      { itemId: "comp_moon_silk_bolt", dropChance: 0.1, quantityRange: [1, 1] },
      { itemId: "clo_bark_leaf_wrap", dropChance: 0.06, quantityRange: [1, 1] },
    ]
  },
  {
    id: "cultist_grunt_loot_table", entries: [
      { itemId: "raw_cultist_seal", dropChance: 0.3, quantityRange: [1, 1] },
      { itemId: "comp_clarity_draught", dropChance: 0.12, quantityRange: [1, 1] },
      { itemId: "clo_rough_hemp_wraps", dropChance: 0.1, quantityRange: [1, 1] },
    ]
  },
  // VoidAberration, not flagged isHumanoidForm (a "stalker," not a humanoid seducer
  // like the Void Concubine/Herald) — kept to raw + composite only, no clothing.
  {
    id: "void_stalker_loot_table", entries: [
      { itemId: "raw_ardor_crystal", dropChance: 0.35, quantityRange: [1, 1] },
      { itemId: "raw_frost_core", dropChance: 0.2, quantityRange: [1, 1] },
      { itemId: "comp_crest_tonic", dropChance: 0.1, quantityRange: [1, 1] },
    ]
  },
  {
    id: "ancient_guardian_loot_table", entries: [
      { itemId: "raw_golden_sun_tablet", dropChance: 0.1, quantityRange: [1, 1] },
      { itemId: "raw_arcane_core", dropChance: 0.3, quantityRange: [1, 2] },
      { itemId: "comp_ancient_core", dropChance: 0.08, quantityRange: [1, 1] },
    ]
  },
  {
    id: "sanctum_guard_loot_table", entries: [
      { itemId: "arm_chainmail_shirt", dropChance: 0.08, quantityRange: [1, 1] },
      { itemId: "raw_ardor_crystal", dropChance: 0.2, quantityRange: [1, 1] },
      { itemId: "comp_crest_tonic", dropChance: 0.1, quantityRange: [1, 1] },
      { itemId: "clo_pure_silk_underslip", dropChance: 0.08, quantityRange: [1, 1] },
    ]
  },
  { id: "primordial_ache_loot_table", entries: [] }, // final story boss — no material loot, resolution is narrative
];

// ============================================================================
// VERIFIED DENSITY TABLE — the actual math behind §5.11's 30% guideline,
// counting ONLY Humanoid and MiasmaCorrupted entries per the guideline's own
// stated scope (Beast/Draconic/VoidAberration/Construct/Cosmic entries are
// real content in this roster but don't count toward this specific
// percentage, even when they do carry monsterSex/isHumanoidForm themselves).
//
// Region        | Humanoid+MiasmaCorrupted total | with sexual attack | %
// --------------|--------------------------------|---------------------|------
// Verdant Vale  | 4  (Treant, Dryad Sprite,       | 2 (Sprite,          | 50%
//               |     Poacher, Vale Guardsman)     |    Poacher)          |
// Aethermoor    | 5  (Wraith Archivist, Wraith     | 3 (Wraith Scholar,  | 60%
//               |     Scholar, Rogue Arcanist,      |    Rogue Arcanist,   |
//               |     Bandit Reaver*, Sentinel)     |    Bandit Reaver)    |
// Crimson March | 3  (War Medic, Deserter          | 2 (War Medic,       | 67%
//               |     Mercenary, Deserter Grunt)    |    Deserter Merc.)   |
// Whispering    | 4  (Heartwood Abomination,       | 2 (Grove Nymph,     | 50%
//   Wood        |     Grove Nymph, Cult Scout,      |    Cult Scout)       |
//               |     Dryad Warden)                |                      |
// Auric Court   | 5  (Succubus, Malakor, Cultist   | 3 (Succubus,        | 60%
//               |     Priestess, Cult Enforcer,     |    Cultist Priestess,|
//               |     Cultist Grunt)                |    Cult Enforcer)    |
// Sunken        | 2  (Cultist Remnant, Guard        | 1 (Cultist Remnant) | 50%
//   Sanctum     |     Remnant)                      |                      |
// Celestial     | excluded — Cosmic-only region, guideline explicitly       | n/a
//   Threshold   | doesn't apply per §5.11                                  |
//
// *Bandit Reaver was originally listed under Auric Court in enemies_seed_data.ts
// (Part 1); its baseLevel (10) actually fits Aethermoor's 6-14 range, not
// Auric Court's 24-34 — recounted here accordingly. No code changed in Part 1.
//
// Every region clears 30% comfortably. Sunken Sanctum's Humanoid-specific
// count is thin (2 total) because the region is primarily VoidAberration-
// themed — Void Concubine, Void Herald, and Void Stalker are all real,
// substantial content there, they just don't count toward this specific
// Humanoid/MiasmaCorrupted metric by the guideline's own definition.
// ============================================================================
