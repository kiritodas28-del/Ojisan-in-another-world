/**
 * enemySpawnEngine.ts
 * Spawns enemies and monsters, reusing the NPC spawn engine for humanoids
 * and overlaying combat-specific fields for all enemy types.
 *
 * TODO (Tasks 5.1–5.8): Full implementation.
 *
 * Design:
 *   - Humanoid enemies: spawned via Project/spawnEngine.ts, then overlaid with EnemyOverlay
 *   - Monster enemies:  simplified/fixed physical profile + EnemyOverlay
 *   - Boss enemies:     hand-crafted static profiles in src/data/bosses/
 *
 * Scaling (PRD §4.20):
 *   enemyBaseStat = monsterTypeBase × regionTierMultiplier
 *   Tier multipliers: 1 → 1.0×, 2 → 1.4×, 3 → 1.9×, 4 → 2.5×, 5 → 3.2×
 */

// Spawn engine — humanoid enemies are generated via this:
// import { spawnCharacter } from '../../spawn-engine/index';

// ─── Monster types ────────────────────────────────────────────────────────────
export type MonsterType = 'Beast' | 'Undead' | 'Elemental' | 'Demon' | 'MiasmaCorrupted';

// ─── Defeat outcome options ───────────────────────────────────────────────────
export type DefeatOutcomeType = 'Kill' | 'StripAndLoot' | 'Interrogate' | 'Purify' | 'Capture';

export interface DefeatOutcome {
  type: DefeatOutcomeType;
  available: boolean;
  condition?: string; // e.g. 'Trust >= 0' or 'isHumanoidForm'
}

// ─── Loot ─────────────────────────────────────────────────────────────────────
export interface LootEntry {
  itemId: string;
  minQty: number;
  maxQty: number;
  dropChance: number; // 0–1
}

export interface LootTable {
  guaranteed: LootEntry[];
  random: LootEntry[];
  goldMin: number;
  goldMax: number;
}

// ─── Enemy overlay (added on top of base character) ──────────────────────────
export interface EnemyOverlay {
  aiPattern: import('./combatEngine').AiPattern;
  isHumanoidForm: boolean;
  monsterSex?: 'Male' | 'Female' | 'None' | 'Ambiguous';
  miasmaReserve?: number;   // monsters only
  manaReserve?: number;     // humanoid enemies only
  lootTable: LootTable;
  purificationReward: { xp: number; gold: number; itemIds: string[] };
  defeatOutcomeOptions: DefeatOutcome[];
  // Scaled combat stats
  scaledStr: number;
  scaledAgi: number;
  scaledWis: number;
  scaledDef: number;
  scaledLck: number;
  scaledHpMax: number;
}

// ─── Full enemy character (stub — Task 5.1) ───────────────────────────────────
export interface EnemyCharacter {
  // Base character data (from spawn engine for humanoids; simplified for beasts)
  base: unknown; // TODO: type as Character once spawn engine types are exported
  enemy: EnemyOverlay;
}

// ─── Monster type definitions (stub — Task 5.2) ───────────────────────────────
export interface MonsterTypeDef {
  type: MonsterType;
  baseStr: number;
  baseAgi: number;
  baseWis: number;
  baseDef: number;
  baseLck: number;
  baseHp: number;
  aiTendency: import('./combatEngine').AiPattern;
  sexualAttackEligible: boolean;
  isHumanoid: false; // monster types are never humanoid
}

// Region tier scaling multipliers
export const REGION_TIER_MULTIPLIERS: Record<number, number> = {
  1: 1.0,
  2: 1.4,
  3: 1.9,
  4: 2.5,
  5: 3.2,
};

// ─── Engine entry points (stubs) ──────────────────────────────────────────────

/**
 * Spawns a procedural monster enemy for a given monster type and region tier.
 * TODO (Task 5.3): Implement
 */
export function spawnMonster(
  _monsterType: MonsterType,
  _regionTier: 1 | 2 | 3 | 4 | 5,
): EnemyCharacter {
  throw new Error('spawnMonster() not yet implemented');
}

/**
 * Spawns a humanoid enemy using the NPC spawn engine, then overlays combat stats.
 * TODO (Task 5.3): Implement
 */
export function spawnHumanoidEnemy(
  _regionTier: 1 | 2 | 3 | 4 | 5,
): EnemyCharacter {
  throw new Error('spawnHumanoidEnemy() not yet implemented');
}

/**
 * Loads a hand-crafted boss profile from static data.
 * TODO (Task 5.7): Implement
 */
export function loadBossProfile(_bossId: string): EnemyCharacter {
  throw new Error('loadBossProfile() not yet implemented');
}

/**
 * Resolves loot from a loot table after enemy defeat.
 * TODO (Task 5.5): Implement
 */
export function resolveLoot(
  _lootTable: LootTable,
): { itemId: string; qty: number }[] {
  throw new Error('resolveLoot() not yet implemented');
}
