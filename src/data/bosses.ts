/**
 * bosses.ts
 * Hand-crafted boss profiles — never procedurally generated.
 *
 * Task 5.7 — PRD §4.2.1
 * One boss per region (10 total). Stats authored for encounter tier;
 * not run through REGION_TIER_MULTIPLIERS.
 *
 * All bosses use aiPattern: 'BossScripted'.
 * Phase transitions at 75% / 50% / 25% HP are read by combatEngine
 * from static phase scripts (Task 7.4).
 *
 * Humanoid bosses have isHumanoidForm: true and carry full body/physiology
 * data so the intimacy engine has depth for post-defeat scenes.
 */

import type { MonsterEnemyCharacter, HumanoidEnemyCharacter } from '../engines/enemySpawnEngine';
import type { HumanoidCharacter } from '../state/gameState';

// ─── Tier 1 ── region_start ───────────────────────────────────────────────────
// Introductory encounter; teaches purification mechanic.
const bossCorruptedHound: MonsterEnemyCharacter = {
  kind: 'MONSTER',
  base: {
    id:          'boss_corrupted_hound',
    name:        'Greyback the Hollowed',
    monsterType: 'Beast',
    description: 'A once-loyal hunting dog swollen to monstrous size by miasma. Still responds to its old name — briefly.',
  },
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: false, monsterSex: 'Male',
    miasmaReserve: 60,
    lootTable: {
      guaranteed: [{ itemId: 'beast_fang',   minQty: 2, maxQty: 3, dropChance: 1.0 }],
      random:     [{ itemId: 'miasma_shard', minQty: 1, maxQty: 2, dropChance: 0.70 }],
      goldMin: 15, goldMax: 30,
    },
    purificationReward: { xp: 80,  gold: 25,  itemIds: ['purity_fragment'] },
    defeatOutcomeOptions: [
      { type: 'Kill',   available: true },
      { type: 'Purify', available: true },
    ],
    scaledStr: 18, scaledAgi: 16, scaledWis: 4,
    scaledDef: 10, scaledLck: 6,  scaledHpMax: 120,
  },
};

// ─── Tier 2 ── region_forest ──────────────────────────────────────────────────
const bossForestWraith: MonsterEnemyCharacter = {
  kind: 'MONSTER',
  base: {
    id:          'boss_forest_wraith',
    name:        'The Wailing Wraith of Fernwood',
    monsterType: 'Undead',
    description: 'A corrupted forest spirit bound to a ruined shrine. Screams drain the will to fight.',
  },
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: false, monsterSex: 'None',
    miasmaReserve: 180,
    lootTable: {
      guaranteed: [
        { itemId: 'wraith_essence', minQty: 1, maxQty: 1, dropChance: 1.0 },
        { itemId: 'miasma_shard',   minQty: 3, maxQty: 5, dropChance: 1.0 },
      ],
      random: [
        { itemId: 'spirit_silk',    minQty: 1, maxQty: 2, dropChance: 0.50 },
        { itemId: 'purity_crystal', minQty: 1, maxQty: 1, dropChance: 0.30 },
      ],
      goldMin: 40, goldMax: 80,
    },
    purificationReward: { xp: 200, gold: 60, itemIds: ['purity_crystal', 'wraith_essence'] },
    defeatOutcomeOptions: [
      { type: 'Kill',   available: true },
      { type: 'Purify', available: true },
    ],
    scaledStr: 14, scaledAgi: 10, scaledWis: 20,
    scaledDef: 18, scaledLck: 12, scaledHpMax: 220,
  },
};

// ─── Tier 2 ── region_ruins ───────────────────────────────────────────────────
const bossRuinSentinel: MonsterEnemyCharacter = {
  kind: 'MONSTER',
  base: {
    id:          'boss_ruin_sentinel',
    name:        'The Sentinel of the Shattered Archive',
    monsterType: 'Elemental',
    description: 'A magical construct left to guard ancient knowledge. Has forgotten why it was built.',
  },
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: false, monsterSex: 'None',
    miasmaReserve: 160,
    lootTable: {
      guaranteed: [
        { itemId: 'arcane_core',  minQty: 1, maxQty: 1, dropChance: 1.0 },
        { itemId: 'miasma_shard', minQty: 2, maxQty: 4, dropChance: 1.0 },
      ],
      random: [
        { itemId: 'old_rune',       minQty: 1, maxQty: 1, dropChance: 0.60 },
        { itemId: 'elemental_dust', minQty: 1, maxQty: 3, dropChance: 0.40 },
      ],
      goldMin: 30, goldMax: 70,
    },
    purificationReward: { xp: 180, gold: 55, itemIds: ['arcane_core', 'purity_crystal'] },
    defeatOutcomeOptions: [
      { type: 'Kill',   available: true },
      { type: 'Purify', available: true },
    ],
    scaledStr: 18, scaledAgi: 8,  scaledWis: 22,
    scaledDef: 22, scaledLck: 8,  scaledHpMax: 260,
  },
};

// ─── Tier 2 ── region_wetlands ────────────────────────────────────────────────
// Humanoid Lamia boss — full body profile for intimacy depth.
const bossBogMatriarch: HumanoidEnemyCharacter = {
  kind: 'HUMANOID_ENEMY',
  base: {
    id:            'boss_bog_matriarch',
    name:          'Ssylvara, Matriarch of the Drowned Fen',
    characterType: 'ENEMY_HUMANOID',
    vitals: {
      hp:      { current: 240, max: 240 },
      stamina: { current: 150, max: 150 },
      cpw:     { current: 0,   max: 0   },
      mp:      { current: 140, max: 140 },  // Phase 29: Mixed race baseline ~100, boss-level wis bonus
      arousal: 0, fatigue: 0,
    },
    stats: { str: 22, agi: 12, wis: 14, def: 18, lck: 10 },
    activeStatusEffects: [],
    gender: 'Female', race: 'Mixed',
    raceFeatures: { tailType: 'SERPENT', earType: 'HUMAN' },
    bodyType:    { value: 'Voluptuous' },
    skin:        { tone: 'OLIVE', undertone: 'WARM', texture: 'SMOOTH' },
    face:        { eyeColor: 'GOLD', eyeShape: 'ALMOND', lipFullness: 'FULL' },
    hair:        { color: 'DARK_BROWN', style: 'LONG_WAVY' },
    measurements: {
      heightCm: 178, cupSize: 'E',
      breastShape: 'ROUND', breastSoftness: 'SOFT',
      assShape: 'WIDE', assSoftness: 'SOFT',
    },
    physicalDetail:   { nippleType: 'PROTRUDING', nippleColor: 'BROWN' },
    sexualPhysiology: {
      vaginaType: 'TIGHT', vaginaElasticity: 'VERY_HIGH',
      clitSize: 'PROMINENT', arousalSpeed: 'MODERATE', lubricationSpeed: 'FAST',
      sensitivityLevel: 'HIGH', wetnessBaseline: 'DAMP',
    },
    personality:      { dominantTrait: 'DOMINANT', emotionalStability: 'STABLE' },
    sexualPsychology: { sexualLean: 'DOMINANT', vocalTendency: 'MODERATE', resistanceProfile: 'COMPLY' },
    voice:      { pitch: 'LOW', texture: 'HUSKY' },
    social:     { trustBaseline: 'SUSPICIOUS', loyaltyLevel: 'LOW' },
    background: { socialClass: 'NONE', occupation: 'NONE' },
    history:    { priorPartnerCount: 'EXPERIENCED' },
    dynamicState: { mood: 'DEFIANT', arousalLevel: 0, corruptionLevel: 0 },
  } as unknown as HumanoidCharacter,
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: true, monsterSex: 'Female',
    manaReserve: 80,
    lootTable: {
      guaranteed: [
        { itemId: 'lamia_scale',  minQty: 3, maxQty: 5, dropChance: 1.0 },
        { itemId: 'miasma_shard', minQty: 2, maxQty: 4, dropChance: 1.0 },
      ],
      random: [
        { itemId: 'serpent_venom', minQty: 1, maxQty: 2, dropChance: 0.55 },
        { itemId: 'purity_crystal', minQty: 1, maxQty: 1, dropChance: 0.25 },
      ],
      goldMin: 45, goldMax: 90,
    },
    purificationReward: { xp: 210, gold: 65, itemIds: ['lamia_scale', 'purity_crystal'] },
    defeatOutcomeOptions: [
      { type: 'Kill',         available: true },
      { type: 'Purify',       available: true },
      { type: 'Intimate',     available: true,  condition: 'adultContentEnabled' },
      { type: 'StripAndLoot', available: true,  condition: 'isHumanoidForm' },
      { type: 'Interrogate',  available: true,  condition: 'isHumanoidForm' },
    ],
    scaledStr: 22, scaledAgi: 12, scaledWis: 14,
    scaledDef: 18, scaledLck: 10, scaledHpMax: 240,
  },
};

// ─── Tier 3 ── region_volcanic ────────────────────────────────────────────────
// Male Oni boss — heavy physical; intimate available.
const bossMagmaOni: HumanoidEnemyCharacter = {
  kind: 'HUMANOID_ENEMY',
  base: {
    id:            'boss_magma_oni',
    name:          'Kagenui the Ashen Crusher',
    characterType: 'ENEMY_HUMANOID',
    vitals: {
      hp:      { current: 380, max: 380 },
      stamina: { current: 200, max: 200 },
      cpw:     { current: 0,   max: 0   },
      mp:      { current: 200, max: 200 },  // Phase 29: Demon race baseline 180, boss-level bump
      arousal: 0, fatigue: 0,
    },
    stats: { str: 34, agi: 8, wis: 10, def: 22, lck: 8 },
    activeStatusEffects: [],
    gender: 'Male', race: 'Demon',
    raceFeatures: { hornType: 'THICK_BULL', tailType: 'DEMON', earType: 'DEMONIC' },
    bodyType:    { value: 'Muscular' },
    skin:        { tone: 'CRIMSON', undertone: 'WARM', texture: 'ROUGH' },
    face:        { eyeColor: 'GOLD', eyeShape: 'NARROW', jawDefinition: 'HEAVY' },
    hair:        { color: 'BLACK', style: 'SHORT_STRAIGHT' },
    measurements: { heightCm: 205 },
    physicalDetail: {},
    sexualPhysiology: {
      cockSize: 'MASSIVE', cockGirth: 'MASSIVE', cockTexture: 'RIDGED',
      cumVolume: 'EXCESSIVE', refractoryPeriod: 'SHORT',
    },
    personality:      { dominantTrait: 'AGGRESSIVE', emotionalStability: 'VOLATILE' },
    sexualPsychology: { sexualLean: 'DOMINANT', vocalTendency: 'LOUD', resistanceProfile: 'FIGHT' },
    voice:      { pitch: 'VERY_LOW', texture: 'ROUGH' },
    social:     { trustBaseline: 'SUSPICIOUS', loyaltyLevel: 'MODERATE' },
    background: { socialClass: 'NONE', occupation: 'WARRIOR' },
    history:    { priorPartnerCount: 'EXPERIENCED' },
    dynamicState: { mood: 'DEFIANT', arousalLevel: 0, corruptionLevel: 0 },
  } as unknown as HumanoidCharacter,
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: true, monsterSex: 'Male',
    manaReserve: 60,
    lootTable: {
      guaranteed: [
        { itemId: 'oni_horn_shard', minQty: 1, maxQty: 2, dropChance: 1.0 },
        { itemId: 'magma_iron',     minQty: 2, maxQty: 4, dropChance: 1.0 },
      ],
      random: [
        { itemId: 'ember_core',     minQty: 1, maxQty: 1, dropChance: 0.50 },
        { itemId: 'purity_crystal', minQty: 1, maxQty: 2, dropChance: 0.30 },
      ],
      goldMin: 70, goldMax: 130,
    },
    purificationReward: { xp: 320, gold: 100, itemIds: ['oni_horn_shard', 'purity_crystal'] },
    defeatOutcomeOptions: [
      { type: 'Kill',        available: true },
      { type: 'Purify',      available: true },
      { type: 'Intimate',    available: true, condition: 'adultContentEnabled' },
      { type: 'Interrogate', available: true, condition: 'isHumanoidForm' },
    ],
    scaledStr: 34, scaledAgi: 8,  scaledWis: 10,
    scaledDef: 22, scaledLck: 8,  scaledHpMax: 380,
  },
};

// ─── Tier 3 ── region_highlands ───────────────────────────────────────────────
// YukiOnna queen — ice/paralysis; full profile; cold→overwhelmed arc.
const bossYukiQueen: HumanoidEnemyCharacter = {
  kind: 'HUMANOID_ENEMY',
  base: {
    id:            'boss_yuki_queen',
    name:          'Shirafuri, the Ivory Stillness',
    characterType: 'ENEMY_HUMANOID',
    vitals: {
      hp:      { current: 280, max: 280 },
      stamina: { current: 180, max: 180 },
      cpw:     { current: 0,   max: 0   },
      mp:      { current: 260, max: 260 },  // Phase 29: Mixed race 100 baseline, elite-tier wis×28 bonus
      arousal: 0, fatigue: 0,
    },
    stats: { str: 10, agi: 22, wis: 28, def: 12, lck: 18 },
    activeStatusEffects: [],
    gender: 'Female', race: 'Mixed',
    raceFeatures: { earType: 'HUMAN' },
    bodyType:    { value: 'Willowy' },
    skin:        { tone: 'PORCELAIN', undertone: 'COOL', texture: 'VERY_SMOOTH' },
    face:        { eyeColor: 'SILVER', eyeShape: 'ALMOND', lipFullness: 'MODERATE', lipShape: 'BOW' },
    hair:        { color: 'WHITE', style: 'LONG_STRAIGHT' },
    measurements: {
      heightCm: 172, cupSize: 'C',
      breastShape: 'PERKY', breastSoftness: 'SOFT',
      assShape: 'ROUND', assSoftness: 'SOFT',
    },
    physicalDetail:   { nippleType: 'PROTRUDING', nippleColor: 'LIGHT_PINK' },
    sexualPhysiology: {
      vaginaType: 'TIGHT', vaginaElasticity: 'MODERATE',
      clitSize: 'SMALL', arousalSpeed: 'SLOW', lubricationSpeed: 'SLOW',
      sensitivityLevel: 'VERY_HIGH', wetnessBaseline: 'DRY',
    },
    personality:      { dominantTrait: 'COLD', emotionalStability: 'VERY_STABLE' },
    sexualPsychology: { sexualLean: 'SUBMISSIVE', vocalTendency: 'QUIET', resistanceProfile: 'FREEZE' },
    voice:      { pitch: 'HIGH', texture: 'BREATHY' },
    social:     { trustBaseline: 'CAUTIOUS', loyaltyLevel: 'LOW' },
    background: { socialClass: 'NONE', occupation: 'NONE' },
    history:    { priorPartnerCount: 'INEXPERIENCED' },
    dynamicState: { mood: 'STOIC', arousalLevel: 0, corruptionLevel: 0 },
  } as unknown as HumanoidCharacter,
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: true, monsterSex: 'Female',
    manaReserve: 160,
    lootTable: {
      guaranteed: [
        { itemId: 'frost_tear',   minQty: 2, maxQty: 3, dropChance: 1.0 },
        { itemId: 'miasma_shard', minQty: 2, maxQty: 4, dropChance: 1.0 },
      ],
      random: [
        { itemId: 'ice_silk',       minQty: 1, maxQty: 2, dropChance: 0.55 },
        { itemId: 'purity_crystal', minQty: 1, maxQty: 1, dropChance: 0.35 },
      ],
      goldMin: 65, goldMax: 120,
    },
    purificationReward: { xp: 300, gold: 95, itemIds: ['frost_tear', 'purity_crystal'] },
    defeatOutcomeOptions: [
      { type: 'Kill',         available: true },
      { type: 'Purify',       available: true },
      { type: 'Intimate',     available: true,  condition: 'adultContentEnabled' },
      { type: 'StripAndLoot', available: true,  condition: 'isHumanoidForm' },
      { type: 'Interrogate',  available: true,  condition: 'isHumanoidForm' },
    ],
    scaledStr: 10, scaledAgi: 22, scaledWis: 28,
    scaledDef: 12, scaledLck: 18, scaledHpMax: 280,
  },
};

// ─── Tier 4 ── region_abyssal_shore ──────────────────────────────────────────
// Succubus boss — seduction/drain; extreme intimacy stats.
const bossTideSuccubus: HumanoidEnemyCharacter = {
  kind: 'HUMANOID_ENEMY',
  base: {
    id:            'boss_tide_succubus',
    name:          'Velmira of the Sunken Vow',
    characterType: 'ENEMY_HUMANOID',
    vitals: {
      hp:      { current: 300, max: 300 },
      stamina: { current: 200, max: 200 },
      cpw:     { current: 0,   max: 0   },
      mp:      { current: 320, max: 320 },  // Phase 29: Succubus baseline 160, tier-4 boss amplified
      arousal: 0, fatigue: 0,
    },
    stats: { str: 11, agi: 20, wis: 26, def: 10, lck: 24 },
    activeStatusEffects: [],
    gender: 'Female', race: 'Succubus',
    raceFeatures: { wingType: 'BAT', tailType: 'DEMON', hornType: 'SMALL_NUBS', earType: 'DEMONIC' },
    bodyType:    { value: 'HourglassFullBust' },
    skin:        { tone: 'PALE_BLUE', undertone: 'COOL', texture: 'VERY_SMOOTH' },
    face:        { eyeColor: 'VIOLET', eyeShape: 'UPTURNED', lipFullness: 'VERY_FULL', lipShape: 'BOW' },
    hair:        { color: 'DEEP_PURPLE', style: 'LONG_WAVY' },
    measurements: {
      heightCm: 170, cupSize: 'F',
      breastShape: 'ROUND', breastSoftness: 'PILLOWY',
      assShape: 'HEART', assSoftness: 'VERY_SOFT',
    },
    physicalDetail:   { nippleType: 'LARGE_PROTRUDING', nippleColor: 'ROSE' },
    sexualPhysiology: {
      vaginaType: 'TIGHT', vaginaElasticity: 'HIGH',
      clitSize: 'VERY_PROMINENT', arousalSpeed: 'VERY_FAST', lubricationSpeed: 'VERY_FAST',
      sensitivityLevel: 'EXTREME', wetnessBaseline: 'WET',
    },
    personality:      { dominantTrait: 'DOMINANT', emotionalStability: 'STABLE' },
    sexualPsychology: { sexualLean: 'DOMINANT', vocalTendency: 'LOUD', resistanceProfile: 'ENJOY' },
    voice:      { pitch: 'MODERATE', texture: 'MELODIC' },
    social:     { trustBaseline: 'OPEN', loyaltyLevel: 'LOW' },
    background: { socialClass: 'NONE', occupation: 'NONE' },
    history:    { priorPartnerCount: 'VERY_EXPERIENCED' },
    dynamicState: { mood: 'FLIRTATIOUS', arousalLevel: 20, corruptionLevel: 40 },
  } as unknown as HumanoidCharacter,
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: true, monsterSex: 'Female',
    manaReserve: 200,
    lootTable: {
      guaranteed: [
        { itemId: 'succubus_wing_membrane', minQty: 1, maxQty: 2, dropChance: 1.0 },
        { itemId: 'miasma_shard',           minQty: 3, maxQty: 5, dropChance: 1.0 },
      ],
      random: [
        { itemId: 'desire_crystal',   minQty: 1, maxQty: 1, dropChance: 0.60 },
        { itemId: 'purity_crystal',   minQty: 1, maxQty: 2, dropChance: 0.30 },
        { itemId: 'void_silk',        minQty: 1, maxQty: 1, dropChance: 0.40 },
      ],
      goldMin: 100, goldMax: 180,
    },
    purificationReward: { xp: 420, gold: 140, itemIds: ['desire_crystal', 'purity_crystal', 'void_silk'] },
    defeatOutcomeOptions: [
      { type: 'Kill',         available: true },
      { type: 'Purify',       available: true },
      { type: 'Intimate',     available: true,  condition: 'adultContentEnabled' },
      { type: 'StripAndLoot', available: true,  condition: 'isHumanoidForm' },
      { type: 'Interrogate',  available: true,  condition: 'isHumanoidForm' },
    ],
    scaledStr: 11, scaledAgi: 20, scaledWis: 26,
    scaledDef: 10, scaledLck: 24, scaledHpMax: 300,
  },
};

// ─── Tier 4 ── region_demon_wastes ────────────────────────────────────────────
// Incubus warlord — physical + charm hybrid.
const bossWarlordIncubus: HumanoidEnemyCharacter = {
  kind: 'HUMANOID_ENEMY',
  base: {
    id:            'boss_warlord_incubus',
    name:          'Raezan the Gilded Tyrant',
    characterType: 'ENEMY_HUMANOID',
    vitals: {
      hp:      { current: 360, max: 360 },
      stamina: { current: 220, max: 220 },
      cpw:     { current: 0,   max: 0   },
      mp:      { current: 280, max: 280 },  // Phase 29: Incubus baseline 160, tier-4 boss amplified
      arousal: 0, fatigue: 0,
    },
    stats: { str: 22, agi: 18, wis: 20, def: 15, lck: 22 },
    activeStatusEffects: [],
    gender: 'Male', race: 'Incubus',
    raceFeatures: { wingType: 'BAT', tailType: 'DEMON', hornType: 'CURVED_RAM', earType: 'DEMONIC' },
    bodyType:    { value: 'Muscular' },
    skin:        { tone: 'OBSIDIAN_BLACK', undertone: 'COOL', texture: 'SMOOTH' },
    face:        { eyeColor: 'GOLD', eyeShape: 'NARROW', lipFullness: 'MODERATE', jawDefinition: 'SHARP' },
    hair:        { color: 'SILVER', style: 'SHORT_STRAIGHT' },
    measurements: { heightCm: 192 },
    physicalDetail: {},
    sexualPhysiology: {
      cockSize: 'VERY_LARGE', cockGirth: 'VERY_THICK', cockTexture: 'VEINED',
      cumVolume: 'VERY_HIGH', refractoryPeriod: 'VERY_SHORT',
    },
    personality:      { dominantTrait: 'DOMINANT', emotionalStability: 'STABLE' },
    sexualPsychology: { sexualLean: 'DOMINANT', vocalTendency: 'MODERATE', resistanceProfile: 'ENJOY' },
    voice:      { pitch: 'VERY_LOW', texture: 'SMOOTH' },
    social:     { trustBaseline: 'SUSPICIOUS', loyaltyLevel: 'LOW' },
    background: { socialClass: 'NOBLE', occupation: 'WARRIOR' },
    history:    { priorPartnerCount: 'VERY_EXPERIENCED' },
    dynamicState: { mood: 'PROUD', arousalLevel: 10, corruptionLevel: 30 },
  } as unknown as HumanoidCharacter,
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: true, monsterSex: 'Male',
    manaReserve: 180,
    lootTable: {
      guaranteed: [
        { itemId: 'incubus_sigil', minQty: 1, maxQty: 1, dropChance: 1.0 },
        { itemId: 'miasma_shard',  minQty: 3, maxQty: 6, dropChance: 1.0 },
      ],
      random: [
        { itemId: 'demon_iron',     minQty: 1, maxQty: 3, dropChance: 0.55 },
        { itemId: 'void_silk',      minQty: 1, maxQty: 2, dropChance: 0.45 },
        { itemId: 'purity_crystal', minQty: 1, maxQty: 2, dropChance: 0.30 },
      ],
      goldMin: 120, goldMax: 200,
    },
    purificationReward: { xp: 450, gold: 160, itemIds: ['incubus_sigil', 'purity_crystal'] },
    defeatOutcomeOptions: [
      { type: 'Kill',        available: true },
      { type: 'Purify',      available: true },
      { type: 'Intimate',    available: true, condition: 'adultContentEnabled' },
      { type: 'Interrogate', available: true, condition: 'isHumanoidForm' },
    ],
    scaledStr: 22, scaledAgi: 18, scaledWis: 20,
    scaledDef: 15, scaledLck: 22, scaledHpMax: 360,
  },
};

// ─── Tier 5 ── region_abyssal ─────────────────────────────────────────────────
// Ancient void demon — no humanoid form; massive miasma pool.
const bossVoidHerald: MonsterEnemyCharacter = {
  kind: 'MONSTER',
  base: {
    id:          'boss_void_herald',
    name:        'The Voice That Unmakes',
    monsterType: 'Demon',
    description: 'An ancient demon that does not have a form so much as a presence. Looking at it is an act of surrender.',
  },
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: false, monsterSex: 'Ambiguous',
    miasmaReserve: 400,
    lootTable: {
      guaranteed: [
        { itemId: 'void_core',      minQty: 1, maxQty: 1, dropChance: 1.0 },
        { itemId: 'miasma_shard',   minQty: 5, maxQty: 8, dropChance: 1.0 },
        { itemId: 'purity_crystal', minQty: 2, maxQty: 3, dropChance: 1.0 },
      ],
      random: [
        { itemId: 'void_silk',      minQty: 2, maxQty: 4, dropChance: 0.65 },
        { itemId: 'desire_crystal', minQty: 1, maxQty: 2, dropChance: 0.50 },
      ],
      goldMin: 200, goldMax: 350,
    },
    purificationReward: { xp: 700, gold: 250, itemIds: ['void_core', 'purity_crystal', 'desire_crystal'] },
    defeatOutcomeOptions: [
      { type: 'Kill',   available: true },
      { type: 'Purify', available: true },
    ],
    scaledStr: 30, scaledAgi: 25, scaledWis: 38,
    scaledDef: 28, scaledLck: 30, scaledHpMax: 600,
  },
};

// ─── Tier 5 ── region_miasma_core ─────────────────────────────────────────────
// Final boss — the living heart of all corruption.
const bossMiasmaSovereign: MonsterEnemyCharacter = {
  kind: 'MONSTER',
  base: {
    id:          'boss_miasma_sovereign',
    name:        'The Sovereign Without Name',
    monsterType: 'MiasmaCorrupted',
    description: 'The living heart of the miasma. Was once something. No longer remembers what.',
  },
  overlay: {
    aiPattern: 'BossScripted', isHumanoidForm: false, monsterSex: 'None',
    miasmaReserve: 600,
    lootTable: {
      guaranteed: [
        { itemId: 'sovereign_core', minQty: 1, maxQty: 1,  dropChance: 1.0 },
        { itemId: 'purity_crystal', minQty: 3, maxQty: 5,  dropChance: 1.0 },
        { itemId: 'miasma_shard',   minQty: 6, maxQty: 10, dropChance: 1.0 },
      ],
      random: [
        { itemId: 'void_core',      minQty: 1, maxQty: 2, dropChance: 0.70 },
        { itemId: 'arcane_core',    minQty: 1, maxQty: 2, dropChance: 0.60 },
        { itemId: 'desire_crystal', minQty: 1, maxQty: 3, dropChance: 0.55 },
      ],
      goldMin: 400, goldMax: 600,
    },
    purificationReward: { xp: 1200, gold: 500, itemIds: ['sovereign_core', 'void_core', 'purity_crystal'] },
    defeatOutcomeOptions: [
      { type: 'Kill',   available: true },
      { type: 'Purify', available: true },
    ],
    scaledStr: 40, scaledAgi: 28, scaledWis: 45,
    scaledDef: 38, scaledLck: 35, scaledHpMax: 900,
  },
};

// ─── Boss registry ─────────────────────────────────────────────────────────────
export const BOSS_PROFILES: Readonly<Record<string, MonsterEnemyCharacter | HumanoidEnemyCharacter>> = {
  boss_corrupted_hound:  bossCorruptedHound,
  boss_forest_wraith:    bossForestWraith,
  boss_ruin_sentinel:    bossRuinSentinel,
  boss_bog_matriarch:    bossBogMatriarch,
  boss_magma_oni:        bossMagmaOni,
  boss_yuki_queen:       bossYukiQueen,
  boss_tide_succubus:    bossTideSuccubus,
  boss_warlord_incubus:  bossWarlordIncubus,
  boss_void_herald:      bossVoidHerald,
  boss_miasma_sovereign: bossMiasmaSovereign,
};
