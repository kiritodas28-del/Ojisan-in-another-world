/**
 * statEngine.ts
 * Task 26.3 — CoreStatKey derivation helpers.
 *
 * Bridges the 7-stat CoreStatKey system (str/dex/agi/int/wil/per/end) with the
 * 5-stat CombatStats snapshot (str/agi/wis/def/lck) used by all combat engines.
 *
 * Mapping:
 *   CoreStatKey → CombatStats
 *   str  → str   (direct)
 *   agi  → agi   (direct)
 *   dex  → lck   (dexterity proxies luck for accuracy/crit)
 *   int  → wis   (intellect proxies wisdom for magic/tech)
 *   wil  → def   (willpower proxies defense for mental resistance)
 *   per  → lck   (averaged with dex when both are allocated)
 *   end  → contributes to max HP/Stamina via derivedVitals (not CombatStats directly)
 *
 * Note: per and dex both map to lck; when both are allocated the result is
 * Math.floor((dex + per) / 2) so the mapping is stable.
 */

import type { CombatStats } from '../state/gameState';

// ─── CoreStatKey type (Task 26.1) ─────────────────────────────────────────────
// Exported from here so engines that only need the stat keys don't import
// the full gameState.ts module.
export type CoreStatKey = 'str' | 'dex' | 'agi' | 'int' | 'wil' | 'per' | 'end';

export const CORE_STAT_KEYS: CoreStatKey[] = ['str', 'dex', 'agi', 'int', 'wil', 'per', 'end'];

// ─── deriveCombatStatsFromCoreStats (Task 26.3) ───────────────────────────────

/**
 * Converts a 7-stat CoreStatKey record into the 5-stat CombatStats snapshot.
 * Called by characterCreationEngine.createCharacter() and deriveCompanionStats().
 *
 * The CombatStats snapshot is the ONLY thing combat engines read; the full
 * CoreStatKey record lives on PlayerCharacter.coreStats / NpcCharacter.coreStats
 * and is re-derived on level-up or equipment change.
 */
export function deriveCombatStatsFromCoreStats(
  coreStats: Record<CoreStatKey, number>,
): CombatStats {
  const { str, dex, agi, int: intelligence, wil, per } = coreStats;

  return {
    str: str,
    agi: agi,
    wis: intelligence,       // intellect → wisdom (magic/tech power)
    def: wil,                 // willpower → defense (mental + physical resistance)
    lck: Math.floor((dex + per) / 2),  // dex + per averaged → luck (accuracy, crit, evasion)
  };
}

// ─── Derived vitals from end (endurance) ──────────────────────────────────────

/**
 * END-stat contributions to max HP and max Stamina.
 * Base values are fixed; end adds a per-point bonus.
 *
 * Formula:
 *   maxHp      = 80 + end * 6
 *   maxStamina = 120 + end * 4
 *   maxCpw     = 30  + end * 2
 *
 * Called by characterCreationEngine.createCharacter() to seed the
 * PlayerCharacter's initial vitals.
 */
export function derivedVitalsFromEnd(end: number): {
  maxHp:      number;
  maxStamina: number;
  maxCpw:     number;
} {
  return {
    maxHp:      80  + end * 6,
    maxStamina: 120 + end * 4,
    maxCpw:     30  + end * 2,
  };
}

// ─── Validate stat allocation (used by characterCreationEngine) ───────────────

/**
 * Returns true if the allocated stats:
 *   1. Only contain valid CoreStatKey keys.
 *   2. All values are integers >= 0.
 *   3. Total equals freePoints (default 10).
 *
 * Used by characterCreationEngine.validateStatAllocation().
 */
export function validateStatAllocation(
  allocatedStats: Record<string, number>,
  freePoints = 10,
): { valid: boolean; reason?: string } {
  for (const key of Object.keys(allocatedStats)) {
    if (!CORE_STAT_KEYS.includes(key as CoreStatKey)) {
      return { valid: false, reason: `Unknown stat key: "${key}". Valid keys: ${CORE_STAT_KEYS.join(', ')}.` };
    }
    const val = allocatedStats[key];
    if (!Number.isInteger(val) || val < 0) {
      return { valid: false, reason: `Stat "${key}" must be a non-negative integer.` };
    }
    if (val > 5) {
      return { valid: false, reason: `Stat "${key}" cannot exceed 5 points at character creation.` };
    }
  }
  const total = Object.values(allocatedStats).reduce((s, v) => s + v, 0);
  if (total !== freePoints) {
    return { valid: false, reason: `Must allocate exactly ${freePoints} points (currently ${total}).` };
  }
  return { valid: true };
}
