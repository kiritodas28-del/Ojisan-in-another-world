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

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 29 — MP POOL
// Every character (humanoid; not monster) has a magic-power pool.
// MP is the substrate of all path awakening, skill activation, and
// magic use. Overdrawing drains HP and accretes burnout on the player.
// ═══════════════════════════════════════════════════════════════════════════════

import type { GameState, GameEvent } from '../state/gameState';
import type { Race } from '../spawn-engine/types/enums';

// ─── Task 29b.1 — MP baseline by race ────────────────────────────────────────────
// Baseline MP max for an unawakened adult at level 1, before level scaling
// and burnout reduction.
// World bible reference: magic.mp_scale_placeholder
// Key: Race enum value string (e.g. 'HIGH_ELF'). Races not listed default to
// MP_RACE_DEFAULT (100). Infinity is a sentinel for god-tier beings whose
// vitals.mp is set to a high fixed sentinel (see goddessProfiles.ts, Phase 43).
export const MP_RACE_DEFAULT = 100;

export const MP_RACE_BASELINE: Partial<Record<string, number>> = {
  // Human baseline
  HUMAN:      100,
  // Elven — high arcane affinity
  HIGH_ELF:   180,
  DARK_ELF:   180,
  ELF:        150,  // standard elf, moderate arcane
  // Dwarves and high orcs — runic / physical affinity, slightly above human
  DWARF:      110,
  ORC:        110,  // High Orc in world bible; Orc is the closest enum value
  // Infernal bloodlines — high affinity from demonic essence
  DEMON:      180,
  DEVIL_GIRL: 180,
  DEVIL_BOY:  180,
  SUCCUBUS:   160,  // intimacy-linked MP; elevated
  INCUBUS:    160,
  // Beastfolk — moderate, physically dominant
  FOX_GIRL:   120,
  FOX_BOY:    120,
  WOLF_GIRL:  100,
  WOLF_BOY:   100,
  COW_GIRL:   100,
  COW_BOY:    100,
  // Dragon bloodlines — very high innate magical density
  DRAGON_GIRL: 200,
  DRAGON_BOY:  200,
  // Fae
  FAIRY:      160,
  GOBLIN:      80,  // below human; relies on quantity not quality
  // Mixed / unknown
  MIXED:      100,
  // Goddess / God — Infinity sentinel. Never stored on CharacterVitals;
  // goddessProfiles.ts sets mp.current/max to 999999 as a display sentinel.
  GODDESS:    Infinity,
  GOD:        Infinity,
};

// ─── Task 29b.2 — deriveMaxMp ──────────────────────────────────────────────────

/**
 * Derives the effective maximum MP for a character.
 *
 * Formula: floor(baseline × (1 + level × 0.08)) × (1 − mpBurnout / 100)
 * Clamped to a minimum of 10 (a character always has some MP capacity).
 *
 * @param race       The character's race enum value
 * @param level      Current character level (1 = starting)
 * @param mpBurnout  Accumulated burnout [0, 100]; 0 = no reduction
 */
export function deriveMaxMp(race: Race | string, level: number, mpBurnout: number): number {
  const baseline = MP_RACE_BASELINE[race as string] ?? MP_RACE_DEFAULT;
  // Infinity sentinel for gods — return large fixed value; never store Infinity in state
  if (!isFinite(baseline)) return 999999;
  const levelled  = Math.floor(baseline * (1 + level * 0.08));
  const burnedDown = levelled * (1 - Math.max(0, Math.min(100, mpBurnout)) / 100);
  return Math.max(10, Math.floor(burnedDown));
}

// ─── Internal helpers ───────────────────────────────────────────────────────────────

/**
 * Reads the mp vitals for any character reachable from GameState.
 * Checks player first, then contacts (by id or npcId), then party companions.
 * Returns null when the targetId is not found.
 */
function _resolveMpVitals(
  state: GameState,
  targetId: string,
): { current: number; max: number } | null {
  if (state.player.id === targetId) return state.player.vitals.mp;
  for (const record of state.contacts) {
    const npc = record.character;
    if (npc.id === targetId || npc.npcId === targetId) return npc.vitals.mp;
  }
  for (const companion of state.party.companions) {
    if (companion.npcId === targetId) return companion.vitals.mp;
  }
  return null;
}

/**
 * Immutably updates mp.current (and optionally hp.current) for any character
 * reachable from GameState. Keeps party.companions in sync with contacts.
 */
function _applyMpChange(
  state: GameState,
  targetId: string,
  newMpCurrent: number,
  newHpCurrent?: number,
): GameState {
  // — Player —
  if (state.player.id === targetId) {
    return {
      ...state,
      player: {
        ...state.player,
        vitals: {
          ...state.player.vitals,
          mp: { ...state.player.vitals.mp, current: newMpCurrent },
          ...(newHpCurrent !== undefined
            ? { hp: { ...state.player.vitals.hp, current: newHpCurrent } }
            : {}),
        },
      },
    };
  }

  // — NPC in contacts (id OR npcId match) —
  const contactIdx = state.contacts.findIndex(
    c => c.character.id === targetId || c.character.npcId === targetId,
  );
  if (contactIdx >= 0) {
    const newContacts = state.contacts.map((c, i) => {
      if (i !== contactIdx) return c;
      return {
        ...c,
        character: {
          ...c.character,
          vitals: {
            ...c.character.vitals,
            mp: { ...c.character.vitals.mp, current: newMpCurrent },
            ...(newHpCurrent !== undefined
              ? { hp: { ...c.character.vitals.hp, current: newHpCurrent } }
              : {}),
          },
        },
      };
    });
    // Keep PartyMember vitals in sync if this NPC is an active companion
    const partyIdx = state.party.companions.findIndex(p => p.npcId === targetId);
    if (partyIdx >= 0) {
      const newCompanions = state.party.companions.map((p, i) => {
        if (i !== partyIdx) return p;
        return {
          ...p,
          vitals: {
            ...p.vitals,
            mp: { ...p.vitals.mp, current: newMpCurrent },
            ...(newHpCurrent !== undefined
              ? { hp: { ...p.vitals.hp, current: newHpCurrent } }
              : {}),
          },
        };
      });
      return {
        ...state,
        contacts: newContacts,
        party: { ...state.party, companions: newCompanions },
      };
    }
    return { ...state, contacts: newContacts };
  }

  // Target not found in this state; no-op (defensively safe).
  return state;
}

// ─── Task 29b.3 — spendMp ───────────────────────────────────────────────────────

/**
 * Deducts `amount` MP from the target character.
 *
 * Overdraw path (amount > mp.current):
 *   excess = amount − mp.current
 *   HP drained = floor(excess / 2)
 *   HP clamped to 1 (character never dies from overdraw; overdrawCollapse=true)
 *   Player mpBurnout += clamp(excess / 50, 0, 2); capped at 100.
 *
 * Always emits MP_SPENT.
 * Emits MP_OVERDRAW on overdraw.
 * Emits MP_BURNOUT_GAINED when mpBurnout increases.
 */
export function spendMp(
  state: GameState,
  targetId: string,
  amount: number,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const mp = _resolveMpVitals(state, targetId);
  if (!mp) return { state, events }; // target not found; safe no-op

  const fromCurrent = mp.current;

  if (amount <= fromCurrent) {
    // Simple spend — no overdraw
    const toCurrent = fromCurrent - amount;
    state = _applyMpChange(state, targetId, toCurrent);
    events.push({ type: 'MP_SPENT', targetId, amount, fromCurrent, toCurrent });
    return { state, events };
  }

  // Overdraw path
  const overdrawAmount = amount - fromCurrent;
  const hpDrainRaw    = Math.floor(overdrawAmount / 2);

  // Resolve current HP for the target
  let currentHp: number;
  if (state.player.id === targetId) {
    currentHp = state.player.vitals.hp.current;
  } else {
    const contact = state.contacts.find(
      c => c.character.id === targetId || c.character.npcId === targetId,
    );
    currentHp = contact?.character.vitals.hp.current ?? 1;
  }

  const hpAfterDrain    = currentHp - hpDrainRaw;
  const overdrawCollapse = hpAfterDrain <= 0;
  const newHp            = overdrawCollapse ? 1 : hpAfterDrain;
  const hpDrained        = currentHp - newHp; // actual HP removed (may be less than hpDrainRaw on collapse)

  state = _applyMpChange(state, targetId, 0, newHp);

  events.push({ type: 'MP_SPENT', targetId, amount, fromCurrent, toCurrent: 0 });
  events.push({ type: 'MP_OVERDRAW', targetId, overdrawAmount, hpDrained, overdrawCollapse });

  // Burnout accrual — player only (NPCs do not track burnout)
  if (state.player.id === targetId) {
    const burnoutGain = Math.min(2, Math.max(0, overdrawAmount / 50));
    if (burnoutGain > 0) {
      const newBurnout = Math.min(100, state.player.mpBurnout + burnoutGain);
      state = {
        ...state,
        player: { ...state.player, mpBurnout: newBurnout },
      };
      events.push({ type: 'MP_BURNOUT_GAINED', newBurnout });
    }
  }

  return { state, events };
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 32 — DIVINITY SCORE
// Accumulated divine favour on the player. Awarded by story quests and
// world events. Gates the island approach and entry in the late-game arc.
// All thresholds are provisional (world bible: divinity.gate_placeholders).
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 32.3 — Milestone thresholds ────────────────────────────────────────────────────────
/**
 * Named milestones for the divinity progression.
 * Key = milestone id (used in DIVINITY_MILESTONE_REACHED events and
 * dialogue condition checks); value = threshold to cross.
 * Provisional per task 32.3 — tune once encounter data is authored.
 */
export const DIVINITY_MILESTONES: Record<string, number> = {
  ISLAND_APPROACH: 5000,
  ISLAND_ENTRY:    8000,
};

// ─── 32.4 — awardDivinity ─────────────────────────────────────────────────────────────
/**
 * Increments `player.divinity` by `amount` and emits:
 *   DIVINITY_GAINED            — always.
 *   DIVINITY_MILESTONE_REACHED — for each milestone the new total crosses or meets
 *                                that the old total did not already satisfy.
 *
 * Pure: returns a new state; never mutates the input.
 */
export function awardDivinity(
  state:  GameState,
  amount: number,
): { state: GameState; events: GameEvent[] } {
  const oldTotal = state.player.divinity;
  const newTotal = oldTotal + amount;

  const events: GameEvent[] = [
    { type: 'DIVINITY_GAINED', amount, newTotal },
  ];

  // Check every milestone: emit if old total was below threshold and new total meets it.
  for (const [milestone, threshold] of Object.entries(DIVINITY_MILESTONES)) {
    if (oldTotal < threshold && newTotal >= threshold) {
      events.push({ type: 'DIVINITY_MILESTONE_REACHED', milestone, value: threshold });
    }
  }

  return {
    state: {
      ...state,
      player: { ...state.player, divinity: newTotal },
    },
    events,
  };
}

// ─── Task 29b.4 — restoreMp ──────────────────────────────────────────────────────

/**
 * Restores `amount` MP to the target character, capped at their current
 * derived max. The caller is responsible for passing the correct max
 * (call deriveMaxMp() first for player characters, or read vitals.mp.max
 * for NPCs whose max was set at spawn time).
 */
export function restoreMp(
  state: GameState,
  targetId: string,
  amount: number,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const mp = _resolveMpVitals(state, targetId);
  if (!mp) return { state, events };

  const newCurrent = Math.min(mp.max, mp.current + amount);
  if (newCurrent === mp.current) return { state, events }; // already full

  state = _applyMpChange(state, targetId, newCurrent);
  events.push({ type: 'MP_RESTORED', targetId, amount: newCurrent - mp.current, newCurrent });
  return { state, events };
}

// ─── Task 29b.5 — applyMpRestOnSleep ───────────────────────────────────────────────

/**
 * Full MP recovery triggered by a sleep event.
 * Restores every reachable character's MP to their current derived max:
 *   - Player: recomputed from race + level + mpBurnout
 *   - Party companions + their contact records: restored to vitals.mp.max
 *   - All other contacts: restored to vitals.mp.max
 *
 * Called by calendarEngine.resolveSleep() alongside applyFullRestoreToParty().
 * Seasonal mpRecoveryMultiplier is applied here (Phase 35c.4 — stub multiplier
 * of 1.0 until Phase 35 is implemented).
 */
export function applyMpRestOnSleep(
  state: GameState,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  // Stub multiplier — Phase 35c.4 will replace with state.seasonModifiers.mpRecoveryMultiplier
  const SEASON_MULTIPLIER = 1.0;

  // Restore player MP
  const playerRace  = state.player.race as string;
  const playerMax   = Math.floor(
    deriveMaxMp(playerRace, state.player.level, state.player.mpBurnout) * SEASON_MULTIPLIER,
  );
  const playerMpNow = state.player.vitals.mp.current;
  if (playerMpNow < playerMax) {
    state = _applyMpChange(state, state.player.id, playerMax);
    // Update mp.max to reflect current derived max (burnout may have changed since spawn)
    state = {
      ...state,
      player: {
        ...state.player,
        vitals: {
          ...state.player.vitals,
          mp: { current: playerMax, max: playerMax },
        },
      },
    };
    events.push({
      type:       'MP_RESTORED',
      targetId:   state.player.id,
      amount:     playerMax - playerMpNow,
      newCurrent: playerMax,
    });
  }

  // Restore all contacts (includes companions in contacts[])
  state = {
    ...state,
    contacts: state.contacts.map(record => {
      const npc = record.character;
      const max = Math.floor(npc.vitals.mp.max * SEASON_MULTIPLIER);
      if (npc.vitals.mp.current >= max) return record;
      const restoredAmount = max - npc.vitals.mp.current;
      events.push({
        type: 'MP_RESTORED', targetId: npc.npcId,
        amount: restoredAmount, newCurrent: max,
      });
      return {
        ...record,
        character: {
          ...npc,
          vitals: { ...npc.vitals, mp: { current: max, max } },
        },
      };
    }),
  };

  // Keep party.companions vitals.mp in sync with contact records
  state = {
    ...state,
    party: {
      ...state.party,
      companions: state.party.companions.map(companion => {
        const contactRecord = state.contacts.find(c => c.character.npcId === companion.npcId);
        if (!contactRecord) return companion;
        const max = contactRecord.character.vitals.mp.max;
        if (companion.vitals.mp.current >= max) return companion;
        return {
          ...companion,
          vitals: { ...companion.vitals, mp: { current: max, max } },
        };
      }),
    },
  };

  return { state, events };
}
