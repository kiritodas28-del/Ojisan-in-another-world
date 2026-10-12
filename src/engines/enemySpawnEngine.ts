/**
 * enemySpawnEngine.ts
 * Spawns procedural enemies (monsters and humanoids) and loads boss profiles.
 *
 * Tasks 5.1–5.8 — PRD §4.2.1 / §4.20
 *
 * ── Architecture ──────────────────────────────────────────────────────────────
 *   EnemyCharacter          discriminated union (MONSTER | HUMANOID_ENEMY)
 *   MonsterBaseProfile      minimal struct for non-humanoid monsters
 *   EnemyOverlay            combat fields applied on top of any base character
 *   MonsterTypeDef          static data per monster type (in src/data/monsters.ts)
 *   PartialHumanoidProfile  species body data injected for isHumanoid: true types
 *   RegionMonsterProfile    per-region spawn configuration (in src/data/monsters.ts)
 *
 * ── Scaling algorithm (PRD §4.20) ────────────────────────────────────────────
 *   enemyBaseStat = monsterTypeBase × regionTierMultiplier
 *   Tier multipliers: 1→1.0, 2→1.4, 3→1.9, 4→2.5, 5→3.2
 *
 * ── Entry points ──────────────────────────────────────────────────────────────
 *   spawnMonster(type, regionTier)       → EnemyCharacter (MONSTER or HUMANOID_ENEMY)
 *   spawnHumanoidEnemy(regionTier)       → HUMANOID_ENEMY (generic corrupted soldier)
 *   loadBossProfile(bossId)              → MONSTER | HUMANOID_ENEMY EnemyCharacter
 *   resolveLoot(lootTable, seed)         → item drops
 *   selectDefeatOutcome(outcomes, ctx)   → chosen defeat option
 */

import type { HumanoidCharacter, CombatStats, CharacterVitals } from '../state/gameState';

// ─── Monster types ────────────────────────────────────────────────────────────
export type MonsterType =
  | 'Beast'
  | 'Undead'
  | 'Elemental'
  | 'Demon'
  | 'MiasmaCorrupted'
  // Humanoid monster species (isHumanoid: true in MonsterTypeDef)
  | 'Succubus'
  | 'Incubus'
  | 'YukiOnna'
  | 'Oni'
  | 'KitsuneCorrupted'
  | 'Lamia'
  | 'Harpy';

// ─── AI patterns (shared with combatEngine) ───────────────────────────────────
export type AiPattern = 'Aggressive' | 'Defensive' | 'SupportCaster' | 'BossScripted';

// ─── Region tier (1–5) ────────────────────────────────────────────────────────
export type RegionTier = 1 | 2 | 3 | 4 | 5;

// ─── Scaling multipliers (PRD §4.20) ─────────────────────────────────────────
export const REGION_TIER_MULTIPLIERS: Readonly<Record<RegionTier, number>> = {
  1: 1.0,
  2: 1.4,
  3: 1.9,
  4: 2.5,
  5: 3.2,
};

// ═══════════════════════════════════════════════════════════════════════════════
// LOOT SYSTEM  (Task 5.5)
// ═══════════════════════════════════════════════════════════════════════════════

export interface LootEntry {
  itemId:     string;
  minQty:     number;
  maxQty:     number;
  dropChance: number;  // 0–1; 1.0 = always drops
}

export interface LootTable {
  guaranteed: LootEntry[];  // always drop (dropChance ignored for these)
  random:     LootEntry[];  // each rolled independently
  goldMin:    number;
  goldMax:    number;
}

/**
 * Resolves a loot table into concrete drops.
 * seed: 0–1 float; used for deterministic rolls (pass stableRandom result).
 * Gold is returned as itemId 'gold' for ease of processing.
 */
export function resolveLoot(
  lootTable: LootTable,
  seed: number,
): { itemId: string; qty: number }[] {
  const drops: { itemId: string; qty: number }[] = [];

  for (const entry of lootTable.guaranteed) {
    const qty = rollRange(entry.minQty, entry.maxQty, seed);
    drops.push({ itemId: entry.itemId, qty });
    seed = advanceSeed(seed);
  }

  for (const entry of lootTable.random) {
    seed = advanceSeed(seed);
    if (seed <= entry.dropChance) {
      const qty = rollRange(entry.minQty, entry.maxQty, seed);
      drops.push({ itemId: entry.itemId, qty });
    }
  }

  const gold = rollRange(lootTable.goldMin, lootTable.goldMax, advanceSeed(seed));
  if (gold > 0) drops.push({ itemId: 'gold', qty: gold });

  return drops;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEFEAT OUTCOMES  (Task 5.6)
// ═══════════════════════════════════════════════════════════════════════════════

export type DefeatOutcomeType =
  | 'Kill'          // standard kill; loot drop
  | 'StripAndLoot'  // humanoid only; strips equipment + loot; reputation hit in public
  | 'Interrogate'   // humanoid only; dialogue scene unlocked
  | 'Intimate'      // humanoid only; triggers full intimacy scene with defeated enemy
  | 'Purify'        // purification victory; purificationReward instead of loot
  | 'Capture';      // humanoid only; requires specific skills/items

export interface DefeatOutcome {
  type:       DefeatOutcomeType;
  available:  boolean;  // set at spawn; may be gated by player skills at runtime
  condition?: string;   // human-readable gate description e.g. 'adultContentEnabled'
}

/** Context provided to outcome selection at runtime. */
export interface DefeatContext {
  isPurificationVictory: boolean;  // true if enemy arousal reached 100
  isHumanoidEnemy:       boolean;
  playerHasRopeItem:     boolean;  // for Capture option
  isPublicLocation:      boolean;  // StripAndLoot in public → reputation penalty
  adultContentEnabled:   boolean;  // gates the Intimate outcome
}

/**
 * Selects the appropriate defeat outcome based on how the fight ended.
 * Purification victory forces Purify if available.
 * Priority order for other outcomes: Intimate > Interrogate > StripAndLoot > Capture > Kill.
 */
export function selectDefeatOutcome(
  outcomes: DefeatOutcome[],
  ctx: DefeatContext,
): DefeatOutcome | null {
  const available = outcomes.filter(o => o.available);
  if (available.length === 0) return null;

  if (ctx.isPurificationVictory) {
    return available.find(o => o.type === 'Purify') ?? available[0];
  }

  const PRIORITY: DefeatOutcomeType[] = [
    'Intimate',
    'Interrogate',
    'StripAndLoot',
    'Capture',
    'Kill',
  ];

  for (const type of PRIORITY) {
    const match = available.find(o => o.type === type);
    if (!match) continue;

    if (type === 'Capture'  && !ctx.playerHasRopeItem)    continue;
    if (type === 'Intimate' && !ctx.adultContentEnabled)   continue;

    // All humanoid-only outcomes require humanoid form
    if (
      (type === 'StripAndLoot' || type === 'Interrogate' ||
       type === 'Intimate'     || type === 'Capture') &&
      !ctx.isHumanoidEnemy
    ) continue;

    return match;
  }

  return available.find(o => o.type === 'Kill') ?? available[0];
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENEMY OVERLAY  (Task 5.1)
// ═══════════════════════════════════════════════════════════════════════════════

export interface EnemyOverlay {
  aiPattern:            AiPattern;
  isHumanoidForm:       boolean;
  monsterSex:           'Male' | 'Female' | 'None' | 'Ambiguous';
  miasmaReserve?:       number;   // monsters only; does not regenerate mid-fight
  manaReserve?:         number;   // humanoid enemies only
  lootTable:            LootTable;
  purificationReward:   { xp: number; gold: number; itemIds: string[] };
  defeatOutcomeOptions: DefeatOutcome[];
  scaledStr:    number;
  scaledAgi:    number;
  scaledWis:    number;
  scaledDef:    number;
  scaledLck:    number;
  scaledHpMax:  number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MONSTER BASE PROFILE  (Task 5.1)
// ═══════════════════════════════════════════════════════════════════════════════

export interface MonsterBaseProfile {
  id:          string;
  name:        string;
  monsterType: MonsterType;
  description: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENEMY CHARACTER  (Task 5.1)
// ═══════════════════════════════════════════════════════════════════════════════

export interface MonsterEnemyCharacter {
  kind:    'MONSTER';
  base:    MonsterBaseProfile;
  overlay: EnemyOverlay;
}

export interface HumanoidEnemyCharacter {
  kind:    'HUMANOID_ENEMY';
  base:    HumanoidCharacter;
  overlay: EnemyOverlay;
}

export type EnemyCharacter = MonsterEnemyCharacter | HumanoidEnemyCharacter;

// ═══════════════════════════════════════════════════════════════════════════════
// PARTIAL HUMANOID PROFILE  (Task 5.1 — body data for humanoid monster species)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Partial physical profile injected into humanoid monster enemies at spawn.
 * Gives the intimacy engine enough data to run scenes without a full
 * spawn-engine pass. All fields are optional — omitted fields remain as stubs.
 */
export interface PartialHumanoidProfile {
  // Race features
  wingType?:  string;
  tailType?:  string;
  hornType?:  string;
  earType?:   string;
  // Appearance pools — one entry is picked randomly at spawn
  skinTones?:  string[];
  hairColors?: string[];
  eyeColors?:  string[];
  // Body
  bodyTypes?:   string[];
  heightRange?: { min: number; max: number };  // cm; upper-body for serpentine types
  // Measurements (female)
  cupSizePool?:    string[];
  breastShape?:    string;
  breastSoftness?: string;
  assShape?:       string;
  assSoftness?:    string;
  // Sexual physiology (female)
  vaginaType?:       string;
  vaginaElasticity?: string;
  clitSize?:         string;
  arousalSpeed?:     string;
  lubricationSpeed?: string;
  sensitivityLevel?: string;
  // Sexual physiology (male)
  cockSize?:    string;
  cockGirth?:   string;
  cockTexture?: string;
  cumVolume?:   string;
  // Psychology hints
  sexualLean?:       string;
  vocalTendency?:    string;
  resistanceProfile?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MONSTER TYPE DEFINITION  (Task 5.2)
// ═══════════════════════════════════════════════════════════════════════════════

export interface MonsterTypeDef {
  type:                 MonsterType;
  baseStr:              number;
  baseAgi:              number;
  baseWis:              number;
  baseDef:              number;
  baseLck:              number;
  baseHp:               number;
  aiTendency:           AiPattern;
  sexualAttackEligible: boolean;
  // false = non-humanoid beast/construct/spirit → MonsterEnemyCharacter
  // true  = humanoid monster species (Succubus, Oni, etc.) → HumanoidEnemyCharacter
  isHumanoid:           boolean;
  // For isHumanoid: true. 'Ambiguous' resolved randomly at spawn (e.g. Oni).
  fixedSex?:            'Male' | 'Female' | 'Ambiguous';
  // Body/physiology data for the intimacy engine; only set when isHumanoid: true.
  partialProfile?:      PartialHumanoidProfile;
  description:          string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// REGION MONSTER PROFILE  (Task 5.8)
// ═══════════════════════════════════════════════════════════════════════════════

export interface RegionMonsterProfile {
  regionId:       string;
  regionTier:     RegionTier;
  spawnableTypes: MonsterType[];
  levelMin:       number;
  levelMax:       number;
  bossProfileIds: string[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// STAT SCALING  (Task 5.4)
// ═══════════════════════════════════════════════════════════════════════════════

export function scaleStatToTier(baseStat: number, tier: RegionTier): number {
  return Math.max(1, Math.floor(baseStat * REGION_TIER_MULTIPLIERS[tier]));
}

function scaleMonsterDef(
  def: MonsterTypeDef,
  tier: RegionTier,
): { str: number; agi: number; wis: number; def: number; lck: number; hpMax: number } {
  return {
    str:   scaleStatToTier(def.baseStr, tier),
    agi:   scaleStatToTier(def.baseAgi, tier),
    wis:   scaleStatToTier(def.baseWis, tier),
    def:   scaleStatToTier(def.baseDef, tier),
    lck:   scaleStatToTier(def.baseLck, tier),
    hpMax: scaleStatToTier(def.baseHp,  tier),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEFAULT LOOT TABLES & OUTCOMES
// ═══════════════════════════════════════════════════════════════════════════════

function defaultLootTable(tier: RegionTier): LootTable {
  const goldBase = tier * 8;
  return {
    guaranteed: [],
    random: [
      { itemId: 'miasma_shard', minQty: 1, maxQty: tier, dropChance: 0.60 },
      { itemId: 'hide_scrap',   minQty: 1, maxQty: 2,    dropChance: 0.40 },
      { itemId: 'herb_basic',   minQty: 1, maxQty: 1,    dropChance: 0.20 },
    ],
    goldMin: goldBase,
    goldMax: goldBase * 3,
  };
}

function defaultPurificationReward(tier: RegionTier): { xp: number; gold: number; itemIds: string[] } {
  return {
    xp:      tier * 30,
    gold:    tier * 12,
    itemIds: tier >= 3 ? ['purity_crystal'] : [],
  };
}

/** Outcomes for a non-humanoid monster — no intimate/strip/interrogate options. */
function monsterDefeatOutcomes(): DefeatOutcome[] {
  return [
    { type: 'Kill',   available: true },
    { type: 'Purify', available: true },
  ];
}

/** Outcomes for a generic corrupted humanoid soldier (spawnHumanoidEnemy). */
function humanoidDefeatOutcomes(): DefeatOutcome[] {
  return [
    { type: 'Kill',         available: true  },
    { type: 'Purify',       available: true  },
    { type: 'Intimate',     available: true,  condition: 'adultContentEnabled' },
    { type: 'StripAndLoot', available: true,  condition: 'isHumanoidForm' },
    { type: 'Interrogate',  available: true,  condition: 'isHumanoidForm' },
    { type: 'Capture',      available: false, condition: 'playerHasRopeItem' },
  ];
}

/** Outcomes for humanoid monster species (Succubus, Oni, etc.) — same as humanoid soldier. */
function humanoidMonsterDefeatOutcomes(): DefeatOutcome[] {
  return [
    { type: 'Kill',         available: true  },
    { type: 'Purify',       available: true  },
    { type: 'Intimate',     available: true,  condition: 'adultContentEnabled' },
    { type: 'StripAndLoot', available: true,  condition: 'isHumanoidForm' },
    { type: 'Interrogate',  available: true,  condition: 'isHumanoidForm' },
    { type: 'Capture',      available: false, condition: 'playerHasRopeItem' },
  ];
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPAWN FUNCTIONS  (Task 5.3)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Spawns a procedural enemy from the given monster type and region tier.
 *
 * If the type has isHumanoid: true (Succubus, Oni, etc.), returns a
 * HumanoidEnemyCharacter with the species partial profile injected so the
 * intimacy engine has body/physiology data to work with.
 *
 * Otherwise returns a MonsterEnemyCharacter (Beast, Undead, etc.).
 */
export function spawnMonster(
  monsterType: MonsterType,
  regionTier: RegionTier,
): EnemyCharacter {
  // Late require to avoid circular dep; monsters.ts is static data only.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { MONSTER_TYPE_DEFS } = require('../data/monsters') as {
    MONSTER_TYPE_DEFS: Record<string, MonsterTypeDef>;
  };

  const def = MONSTER_TYPE_DEFS[monsterType];
  if (!def) throw new Error(`Unknown monster type: ${monsterType}`);

  const scaled = scaleMonsterDef(def, regionTier);
  const uid    = `${monsterType.toLowerCase()}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  // Resolve sex: 'Ambiguous' picks randomly at spawn time.
  const rawSex = def.fixedSex ?? 'None';
  const resolvedSex: EnemyOverlay['monsterSex'] =
    rawSex === 'Ambiguous' ? (Math.random() < 0.5 ? 'Female' : 'Male') : rawSex;

  // ── Humanoid monster species path ────────────────────────────────────────────
  if (def.isHumanoid && def.partialProfile) {
    const pp   = def.partialProfile;
    const pick = <T>(pool?: T[]): T | undefined =>
      pool && pool.length ? pool[Math.floor(Math.random() * pool.length)] : undefined;

    const hpMax = scaled.hpMax;
    // Phase 29: mp seeded from wis×4 (approx species baseline at region tier; deriveMaxMp is for players/NPCs)
    const enemyMpMax = scaled.wis * 4;
    const base = {
      id:            uid,
      name:          `${monsterType} (Tier ${regionTier})`,
      characterType: 'ENEMY_HUMANOID' as const,
      vitals: {
        hp:      { current: hpMax, max: hpMax },
        stamina: { current: 120, max: 120 },
        cpw:     { current: 0,   max: 0   },
        mp:      { current: enemyMpMax, max: enemyMpMax },
        arousal: 0,
        fatigue: 0,
      } satisfies CharacterVitals,
      stats: {
        str: scaled.str, agi: scaled.agi, wis: scaled.wis,
        def: scaled.def, lck: scaled.lck,
      } satisfies CombatStats,
      activeStatusEffects: [],
      gender: resolvedSex === 'Male' ? 'Male' : 'Female',
      race:   monsterType,
      raceFeatures: {
        wingType: pp.wingType,
        tailType: pp.tailType,
        hornType: pp.hornType,
        earType:  pp.earType,
      },
      bodyType:    { value: pick(pp.bodyTypes) },
      skin:        { tone: pick(pp.skinTones) },
      face:        { eyeColor: pick(pp.eyeColors) },
      hair:        { color: pick(pp.hairColors) },
      measurements: resolvedSex !== 'Male' ? {
        heightCm:      pp.heightRange
          ? Math.round(pp.heightRange.min + Math.random() * (pp.heightRange.max - pp.heightRange.min))
          : undefined,
        cupSize:       pick(pp.cupSizePool),
        breastShape:   pp.breastShape,
        breastSoftness: pp.breastSoftness,
        assShape:      pp.assShape,
        assSoftness:   pp.assSoftness,
      } : {
        heightCm: pp.heightRange
          ? Math.round(pp.heightRange.min + Math.random() * (pp.heightRange.max - pp.heightRange.min))
          : undefined,
      },
      physicalDetail: {},
      sexualPhysiology: resolvedSex !== 'Male' ? {
        vaginaType:       pp.vaginaType,
        vaginaElasticity: pp.vaginaElasticity,
        clitSize:         pp.clitSize,
        arousalSpeed:     pp.arousalSpeed,
        lubricationSpeed: pp.lubricationSpeed,
        sensitivityLevel: pp.sensitivityLevel,
      } : {
        cockSize:    pp.cockSize,
        cockGirth:   pp.cockGirth,
        cockTexture: pp.cockTexture,
        cumVolume:   pp.cumVolume,
      },
      personality:      {},
      sexualPsychology: {
        sexualLean:        pp.sexualLean,
        vocalTendency:     pp.vocalTendency,
        resistanceProfile: pp.resistanceProfile,
      },
      voice:      {},
      social:     {},
      background: {},
      history:    {},
      dynamicState: {},
    } as unknown as HumanoidCharacter;

    const overlay: EnemyOverlay = {
      aiPattern:            def.aiTendency,
      isHumanoidForm:       true,
      monsterSex:           resolvedSex,
      manaReserve:          scaled.wis * 2,
      lootTable:            defaultLootTable(regionTier),
      purificationReward:   defaultPurificationReward(regionTier),
      defeatOutcomeOptions: humanoidMonsterDefeatOutcomes(),
      scaledStr:  scaled.str,  scaledAgi: scaled.agi,
      scaledWis:  scaled.wis,  scaledDef: scaled.def,
      scaledLck:  scaled.lck,  scaledHpMax: scaled.hpMax,
    };

    return { kind: 'HUMANOID_ENEMY', base, overlay };
  }

  // ── Non-humanoid monster path ─────────────────────────────────────────────
  const base: MonsterBaseProfile = {
    id:          uid,
    name:        `${monsterType} (Tier ${regionTier})`,
    monsterType,
    description: def.description,
  };

  const overlay: EnemyOverlay = {
    aiPattern:            def.aiTendency,
    isHumanoidForm:       false,
    monsterSex:           resolvedSex,
    miasmaReserve:        scaled.wis * 3,
    lootTable:            defaultLootTable(regionTier),
    purificationReward:   defaultPurificationReward(regionTier),
    defeatOutcomeOptions: monsterDefeatOutcomes(),
    scaledStr:  scaled.str,  scaledAgi: scaled.agi,
    scaledWis:  scaled.wis,  scaledDef: scaled.def,
    scaledLck:  scaled.lck,  scaledHpMax: scaled.hpMax,
  };

  return { kind: 'MONSTER', base, overlay };
}

/**
 * Spawns a generic corrupted humanoid soldier (not a named monster species).
 * Full spawn-engine wiring deferred to Task 3a.9 / 3a.10.
 */
export function spawnHumanoidEnemy(regionTier: RegionTier): HumanoidEnemyCharacter {
  const uid   = `humanoid_enemy_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const tierM = REGION_TIER_MULTIPLIERS[regionTier];
  const hpMax = Math.floor(50 * tierM);
  const str   = Math.floor(12 * tierM);
  const agi   = Math.floor(10 * tierM);
  const wis   = Math.floor(8  * tierM);
  const def   = Math.floor(9  * tierM);
  const lck   = Math.floor(7  * tierM);

  const base = {
    id:            uid,
    name:          `Corrupted Soldier (Tier ${regionTier})`,
    characterType: 'ENEMY_HUMANOID',
    vitals: {
      hp:      { current: hpMax, max: hpMax },
      stamina: { current: 100, max: 100 },
      cpw:     { current: 0,   max: 0   },
      mp:      { current: wis * 4, max: wis * 4 },  // Phase 29: wis×4 approx for humanoid enemies
      arousal: 0,
      fatigue: 0,
    } satisfies CharacterVitals,
    stats: { str, agi, wis, def, lck } satisfies CombatStats,
    activeStatusEffects: [],
    gender: 'Female', race: 'Human',
    raceFeatures: {}, bodyType: {}, skin: {}, face: {}, hair: {},
    measurements: {}, physicalDetail: {}, sexualPhysiology: {},
    personality: {}, sexualPsychology: {}, voice: {}, social: {},
    background: {}, history: {}, dynamicState: {},
  } as unknown as HumanoidCharacter;

  const overlay: EnemyOverlay = {
    aiPattern:            'Aggressive',
    isHumanoidForm:       true,
    monsterSex:           'Female',
    manaReserve:          wis * 2,
    lootTable:            defaultLootTable(regionTier),
    purificationReward:   defaultPurificationReward(regionTier),
    defeatOutcomeOptions: humanoidDefeatOutcomes(),
    scaledStr: str, scaledAgi: agi, scaledWis: wis,
    scaledDef: def, scaledLck: lck, scaledHpMax: hpMax,
  };

  return { kind: 'HUMANOID_ENEMY', base, overlay };
}

/**
 * Loads a hand-crafted boss profile from static data (src/data/bosses.ts).
 */
export function loadBossProfile(bossId: string): EnemyCharacter {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { BOSS_PROFILES } = require('../data/bosses') as {
    BOSS_PROFILES: Record<string, EnemyCharacter>;
  };
  const profile = BOSS_PROFILES[bossId];
  if (!profile) throw new Error(`Unknown boss profile: ${bossId}`);
  return profile;
}

// ─── Internal seed helpers ────────────────────────────────────────────────────

function advanceSeed(seed: number): number {
  return (seed * 9301 + 49297) % 233280 / 233280;
}

function rollRange(min: number, max: number, seed: number): number {
  if (min === max) return min;
  return min + Math.floor(seed * (max - min + 1));
}
