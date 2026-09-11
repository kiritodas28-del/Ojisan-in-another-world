/**
 * monsters.ts
 * Static monster type definitions and region monster profiles.
 *
 * Tasks 5.2, 5.8 — PRD §4.2.1 / §4.15 / §4.20
 *
 * Two categories:
 *   isHumanoid: false — non-humanoid beasts/constructs/spirits
 *   isHumanoid: true  — humanoid monster species (Succubus, Incubus, YukiOnna, etc.)
 *                       These carry a partialProfile for intimacy engine use.
 *
 * Stat bases are pre-scaling (×1.0 at region tier 1).
 * REGION_TIER_MULTIPLIERS in enemySpawnEngine.ts apply on top.
 */

import type { MonsterTypeDef, RegionMonsterProfile } from '../engines/enemySpawnEngine';

// ═══════════════════════════════════════════════════════════════════════════════
// MONSTER TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const MONSTER_TYPE_DEFS: Readonly<Record<string, MonsterTypeDef>> = {

  // ─── Non-humanoid types ──────────────────────────────────────────────────────

  Beast: {
    type: 'Beast', isHumanoid: false,
    baseStr: 14, baseAgi: 12, baseWis: 3, baseDef: 8, baseLck: 5, baseHp: 45,
    aiTendency: 'Aggressive', sexualAttackEligible: false,
    description: 'Wild creatures corrupted by ambient miasma. Favour brute force.',
  },

  Undead: {
    type: 'Undead', isHumanoid: false,
    baseStr: 12, baseAgi: 5, baseWis: 4, baseDef: 12, baseLck: 2, baseHp: 55,
    aiTendency: 'Defensive', sexualAttackEligible: false,
    description: 'Reanimated corpses driven by residual miasma. Slow but relentless.',
  },

  Elemental: {
    type: 'Elemental', isHumanoid: false,
    baseStr: 6, baseAgi: 10, baseWis: 16, baseDef: 6, baseLck: 8, baseHp: 35,
    aiTendency: 'SupportCaster', sexualAttackEligible: false,
    description: 'Spirits of elemental force bound and twisted by miasma. Cast area effects.',
  },

  Demon: {
    type: 'Demon', isHumanoid: false,
    baseStr: 13, baseAgi: 11, baseWis: 12, baseDef: 9, baseLck: 14, baseHp: 50,
    aiTendency: 'Aggressive', sexualAttackEligible: true,
    description: 'Denizens of the Abyssal Realm. Sapient, cunning, and often seductive.',
  },

  MiasmaCorrupted: {
    type: 'MiasmaCorrupted', isHumanoid: false,
    baseStr: 11, baseAgi: 9, baseWis: 7, baseDef: 7, baseLck: 6, baseHp: 42,
    aiTendency: 'Aggressive', sexualAttackEligible: true,
    description: 'Humanoids fully consumed by miasma corruption. Retain instincts, lose self.',
  },

  // ─── Humanoid monster species ─────────────────────────────────────────────
  // isHumanoid: true — spawnMonster() produces a HumanoidEnemyCharacter with
  // body/physiology data from partialProfile for intimacy engine depth.

  Succubus: {
    type: 'Succubus', isHumanoid: true, fixedSex: 'Female',
    baseStr: 7, baseAgi: 14, baseWis: 18, baseDef: 5, baseLck: 18, baseHp: 38,
    aiTendency: 'SupportCaster', sexualAttackEligible: true,
    description: 'Demon-kin who feed on desire. Their touch unravels resistance faster than pain.',
    partialProfile: {
      wingType: 'BAT', tailType: 'DEMON', hornType: 'SMALL_NUBS', earType: 'DEMONIC',
      skinTones:  ['PALE_BLUE', 'ASH_GREY', 'DEEP_PURPLE', 'IVORY', 'CRIMSON'],
      hairColors: ['CRIMSON', 'DEEP_PURPLE', 'BLACK', 'SILVER', 'ICY_BLUE'],
      eyeColors:  ['RED', 'CRIMSON', 'VIOLET', 'GOLD', 'BLACK'],
      bodyTypes:  ['HourglassCurvy', 'Voluptuous', 'HourglassSlim', 'HourglassFullBust'],
      heightRange: { min: 160, max: 178 },
      cupSizePool: ['D', 'DD', 'E', 'F'],
      breastShape: 'ROUND', breastSoftness: 'PILLOWY',
      assShape: 'HEART', assSoftness: 'VERY_SOFT',
      vaginaType: 'TIGHT', vaginaElasticity: 'HIGH',
      clitSize: 'PROMINENT', arousalSpeed: 'VERY_FAST', lubricationSpeed: 'VERY_FAST',
      sensitivityLevel: 'HIGH',
      sexualLean: 'DOMINANT', vocalTendency: 'MODERATE', resistanceProfile: 'ENJOY',
    },
  },

  Incubus: {
    type: 'Incubus', isHumanoid: true, fixedSex: 'Male',
    baseStr: 10, baseAgi: 13, baseWis: 16, baseDef: 6, baseLck: 16, baseHp: 42,
    aiTendency: 'Aggressive', sexualAttackEligible: true,
    description: 'The male counterpart to the succubus. More physically forward; uses charm and force alike.',
    partialProfile: {
      wingType: 'BAT', tailType: 'DEMON', hornType: 'CURVED_RAM', earType: 'DEMONIC',
      skinTones:  ['OBSIDIAN_BLACK', 'DEEP_PURPLE', 'ASH_GREY', 'CRIMSON'],
      hairColors: ['BLACK', 'DEEP_PURPLE', 'CRIMSON', 'SILVER'],
      eyeColors:  ['RED', 'GOLD', 'CRIMSON', 'BLACK'],
      bodyTypes:  ['Athletic', 'Muscular'],
      heightRange: { min: 178, max: 196 },
      cockSize: 'LARGE', cockGirth: 'THICK', cockTexture: 'VEINED', cumVolume: 'HIGH',
      sexualLean: 'DOMINANT', vocalTendency: 'MODERATE', resistanceProfile: 'ENJOY',
    },
  },

  YukiOnna: {
    type: 'YukiOnna', isHumanoid: true, fixedSex: 'Female',
    baseStr: 6, baseAgi: 16, baseWis: 20, baseDef: 8, baseLck: 12, baseHp: 36,
    aiTendency: 'SupportCaster', sexualAttackEligible: true,
    description: 'Snow spirits of the frozen highlands. Their kiss drains warmth and will simultaneously.',
    partialProfile: {
      earType: 'HUMAN',
      skinTones:  ['PORCELAIN', 'IVORY', 'PALE_BLUE'],
      hairColors: ['WHITE', 'SILVER', 'PLATINUM', 'ICY_BLUE'],
      eyeColors:  ['SILVER', 'WHITE', 'ICY_BLUE', 'PALE_BLUE'],
      bodyTypes:  ['Willowy', 'SlimStraight', 'HourglassSlim'],
      heightRange: { min: 162, max: 176 },
      cupSizePool: ['B', 'C', 'D'],
      breastShape: 'PERKY', breastSoftness: 'SOFT',
      assShape: 'ROUND', assSoftness: 'SOFT',
      vaginaType: 'TIGHT', vaginaElasticity: 'MODERATE',
      clitSize: 'SMALL',
      // Cold and initially unresponsive — overwhelmingly sensitive once thawed
      arousalSpeed: 'SLOW', lubricationSpeed: 'SLOW', sensitivityLevel: 'VERY_HIGH',
      sexualLean: 'SUBMISSIVE', vocalTendency: 'QUIET', resistanceProfile: 'FREEZE',
    },
  },

  Oni: {
    type: 'Oni', isHumanoid: true, fixedSex: 'Ambiguous',
    baseStr: 20, baseAgi: 6, baseWis: 8, baseDef: 14, baseLck: 7, baseHp: 70,
    aiTendency: 'Aggressive', sexualAttackEligible: true,
    description: 'Massive horned warriors warped by ancient miasma. Honour combat but do not spare the defeated.',
    partialProfile: {
      hornType: 'THICK_BULL', tailType: 'DEMON', earType: 'DEMONIC',
      skinTones:  ['TEAL_GREEN', 'CRIMSON', 'DEEP_PURPLE', 'ASH_GREY', 'OBSIDIAN_BLACK'],
      hairColors: ['BLACK', 'DARK_BROWN', 'CRIMSON', 'WHITE'],
      eyeColors:  ['GOLD', 'RED', 'WHITE', 'AMBER'],
      bodyTypes:  ['MuscularFeminine', 'AthleticCurvy', 'Voluptuous', 'Muscular', 'Athletic'],
      heightRange: { min: 175, max: 210 },
      // Female physiology
      cupSizePool: ['D', 'DD', 'E', 'F'],
      breastShape: 'WIDE', breastSoftness: 'MEDIUM_FIRM',
      assShape: 'BUBBLE', assSoftness: 'FIRM',
      vaginaType: 'AVERAGE', vaginaElasticity: 'HIGH',
      clitSize: 'PROMINENT', arousalSpeed: 'MODERATE', lubricationSpeed: 'MODERATE',
      sensitivityLevel: 'MODERATE',
      // Male physiology
      cockSize: 'VERY_LARGE', cockGirth: 'VERY_THICK', cockTexture: 'HEAVILY_VEINED', cumVolume: 'VERY_HIGH',
      sexualLean: 'DOMINANT', vocalTendency: 'LOUD', resistanceProfile: 'FIGHT',
    },
  },

  KitsuneCorrupted: {
    type: 'KitsuneCorrupted', isHumanoid: true, fixedSex: 'Female',
    baseStr: 9, baseAgi: 17, baseWis: 14, baseDef: 7, baseLck: 17, baseHp: 40,
    aiTendency: 'Aggressive', sexualAttackEligible: true,
    description: 'Fox spirits whose tails have gone dark with miasma. Use illusions to isolate prey.',
    partialProfile: {
      tailType: 'FOX', earType: 'ANIMAL_FOX',
      skinTones:  ['IVORY', 'FAIR', 'LIGHT', 'GOLDEN', 'CARAMEL'],
      hairColors: ['AUBURN', 'RED', 'BLACK', 'SILVER', 'WHITE'],
      eyeColors:  ['GOLD', 'AMBER', 'RED', 'GREEN'],
      bodyTypes:  ['PetiteCurvy', 'SlimCurvy', 'HourglassSlim', 'Athletic'],
      heightRange: { min: 154, max: 170 },
      cupSizePool: ['B', 'C', 'D'],
      breastShape: 'TEARDROP', breastSoftness: 'SOFT',
      assShape: 'HEART', assSoftness: 'SOFT',
      vaginaType: 'TIGHT', vaginaElasticity: 'HIGH',
      clitSize: 'MODERATE', arousalSpeed: 'FAST', lubricationSpeed: 'FAST',
      sensitivityLevel: 'HIGH',
      sexualLean: 'MIXED', vocalTendency: 'MODERATE', resistanceProfile: 'COMPLY',
    },
  },

  Lamia: {
    type: 'Lamia', isHumanoid: true, fixedSex: 'Female',
    baseStr: 16, baseAgi: 10, baseWis: 10, baseDef: 13, baseLck: 9, baseHp: 58,
    aiTendency: 'Defensive', sexualAttackEligible: true,
    description: 'Serpent-women who inhabit wetlands and coastal ruins. Constrict prey into compliance.',
    partialProfile: {
      tailType: 'SERPENT',   // replaces legs; intimacy engine handles position restrictions
      earType: 'HUMAN',
      skinTones:  ['GOLDEN', 'OLIVE', 'TAN', 'TEAL_GREEN', 'CARAMEL'],
      hairColors: ['DARK_BROWN', 'BLACK', 'AUBURN', 'FOREST_GREEN'],
      eyeColors:  ['GOLD', 'AMBER', 'GREEN', 'RED'],
      bodyTypes:  ['HourglassCurvy', 'AthleticCurvy', 'Voluptuous'],
      heightRange: { min: 165, max: 185 },   // upper-body height
      cupSizePool: ['C', 'D', 'DD', 'E'],
      breastShape: 'ROUND', breastSoftness: 'SOFT',
      assShape: 'ROUND', assSoftness: 'SOFT',
      vaginaType: 'TIGHT', vaginaElasticity: 'VERY_HIGH',
      clitSize: 'PROMINENT', arousalSpeed: 'MODERATE', lubricationSpeed: 'FAST',
      sensitivityLevel: 'HIGH',
      sexualLean: 'DOMINANT', vocalTendency: 'MODERATE',
      resistanceProfile: 'COMPLY',   // complies once prey is constricted
    },
  },

  Harpy: {
    type: 'Harpy', isHumanoid: true, fixedSex: 'Female',
    baseStr: 11, baseAgi: 18, baseWis: 8, baseDef: 5, baseLck: 10, baseHp: 38,
    aiTendency: 'Aggressive', sexualAttackEligible: true,
    description: 'Winged predators that nest in highland crags. Strike from height then drag prey to the nest.',
    partialProfile: {
      wingType: 'FEATHERED', earType: 'HUMAN',
      skinTones:  ['FAIR', 'LIGHT', 'TAN', 'GOLDEN'],
      hairColors: ['BROWN', 'AUBURN', 'BLACK', 'DIRTY_BLONDE'],
      eyeColors:  ['AMBER', 'GOLD', 'BROWN', 'RED'],
      bodyTypes:  ['Athletic', 'AthleticCurvy', 'PetiteCurvy'],
      heightRange: { min: 155, max: 172 },
      cupSizePool: ['B', 'C', 'D'],
      breastShape: 'PERKY', breastSoftness: 'MEDIUM_FIRM',
      assShape: 'ROUND', assSoftness: 'FIRM',
      vaginaType: 'TIGHT', vaginaElasticity: 'MODERATE',
      clitSize: 'SMALL', arousalSpeed: 'FAST', lubricationSpeed: 'MODERATE',
      sensitivityLevel: 'HIGH',
      sexualLean: 'SUBMISSIVE',   // instinct to submit once grounded/pinned
      vocalTendency: 'LOUD',
      resistanceProfile: 'FIGHT', // fights fiercely until pinned
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// REGION MONSTER PROFILES  (10 regions, Task 5.8)
// ═══════════════════════════════════════════════════════════════════════════════

export const REGION_MONSTER_PROFILES: Readonly<Record<string, RegionMonsterProfile>> = {

  region_start: {
    regionId: 'region_start', regionTier: 1,
    spawnableTypes: ['Beast', 'MiasmaCorrupted'],
    levelMin: 1, levelMax: 3,
    bossProfileIds: ['boss_corrupted_hound'],
  },

  region_forest: {
    regionId: 'region_forest', regionTier: 2,
    spawnableTypes: ['Beast', 'Undead', 'MiasmaCorrupted', 'KitsuneCorrupted'],
    levelMin: 3, levelMax: 6,
    bossProfileIds: ['boss_forest_wraith'],
  },

  region_ruins: {
    regionId: 'region_ruins', regionTier: 2,
    spawnableTypes: ['Undead', 'Elemental', 'MiasmaCorrupted'],
    levelMin: 4, levelMax: 7,
    bossProfileIds: ['boss_ruin_sentinel'],
  },

  region_wetlands: {
    regionId: 'region_wetlands', regionTier: 2,
    spawnableTypes: ['Beast', 'Undead', 'Lamia', 'MiasmaCorrupted'],
    levelMin: 4, levelMax: 7,
    bossProfileIds: ['boss_bog_matriarch'],
  },

  region_volcanic: {
    regionId: 'region_volcanic', regionTier: 3,
    spawnableTypes: ['Beast', 'Elemental', 'Demon', 'Oni'],
    levelMin: 6, levelMax: 10,
    bossProfileIds: ['boss_magma_oni'],
  },

  region_highlands: {
    regionId: 'region_highlands', regionTier: 3,
    spawnableTypes: ['Beast', 'Undead', 'YukiOnna', 'Harpy'],
    levelMin: 7, levelMax: 11,
    bossProfileIds: ['boss_yuki_queen'],
  },

  region_abyssal_shore: {
    regionId: 'region_abyssal_shore', regionTier: 4,
    spawnableTypes: ['Undead', 'Demon', 'Succubus', 'Lamia'],
    levelMin: 10, levelMax: 14,
    bossProfileIds: ['boss_tide_succubus'],
  },

  region_demon_wastes: {
    regionId: 'region_demon_wastes', regionTier: 4,
    spawnableTypes: ['Demon', 'Incubus', 'Oni', 'MiasmaCorrupted'],
    levelMin: 11, levelMax: 15,
    bossProfileIds: ['boss_warlord_incubus'],
  },

  region_abyssal: {
    regionId: 'region_abyssal', regionTier: 5,
    spawnableTypes: ['Demon', 'Succubus', 'Incubus', 'MiasmaCorrupted', 'Undead'],
    levelMin: 14, levelMax: 20,
    bossProfileIds: ['boss_void_herald'],
  },

  region_miasma_core: {
    regionId: 'region_miasma_core', regionTier: 5,
    spawnableTypes: ['MiasmaCorrupted', 'Demon', 'Elemental', 'KitsuneCorrupted'],
    levelMin: 18, levelMax: 25,
    bossProfileIds: ['boss_miasma_sovereign'],
  },
};
