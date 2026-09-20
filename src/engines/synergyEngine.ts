/**
 * synergyEngine.ts  — Phase 24
 * Generic companion duo-tech / triple-tech synergy combo system.
 *
 * Design principles:
 *  - SynergyDefs live in src/data/synergyCatalog.ts (author-defined pairs/triples).
 *    Engine is catalog-agnostic: it receives a catalog slice and operates on ids.
 *  - A synergy is UNLOCKABLE when all member npcIds are in the active party AND
 *    each member's (trust + love) with the player ≥ intimacyThreshold.
 *  - Synergy combos are combat actions: activateSynergy() consumes one use today
 *    and returns the combo's effectPayload for the combatEngine to apply.
 *  - Daily use counts reset at day-end via resetSynergyDailyCounts().
 *  - All functions are pure.
 */

import type {
  GameState, GameEvent,
  SynergyState, SynergyPairState,
} from '../state/gameState';

// ─── Catalog interface (implemented in src/data/synergyCatalog.ts) ────────────
export interface SynergyDef {
  // Unique id — must be '<sortedNpcIdA>+<sortedNpcIdB>[+<sortedNpcIdC>]'.
  id:                 string;
  // Ordered list of 2 or 3 NPC ids involved (player is always one anchor).
  memberNpcIds:       string[];
  // Combined (trust + love) threshold each member must meet.
  intimacyThreshold:  number;  // default 150 (75 trust + 75 love, or any combo summing to 150)
  // Display name of the combo attack.
  comboName:          string;
  // Generic effect payload passed to combatEngine; format is engine-resolved.
  effectPayload:      SynergyEffectPayload;
  // Maximum activations per encounter (usually 1).
  maxUsesPerEncounter: number;
}

export interface SynergyEffectPayload {
  // Damage multiplier applied to the combined hit (relative to base ATK).
  damageMultiplier: number;
  // True if the combo hits all enemies (AoE).
  isAoE:           boolean;
  // Optional status effect applied to all targets on hit.
  inflictsStatusId?: string;
  // Optional party heal (% of max HP) applied after the combo.
  partyHealPercent?: number;
  // Optional MP restore applied after the combo.
  partyMpRestore?:   number;
  // Optional raw HP damage on all enemies (for non-multiplier ultimates).
  flatDamage?:       number;
}

// ─── Default initial synergy state ───────────────────────────────────────────
export function createDefaultSynergyState(): SynergyState {
  return { pairs: [] };
}

// ─── Initialise synergy pairs from catalog ────────────────────────────────────
/**
 * Call once during new-game init (or NG+) to populate SynergyState from the
 * full synergy catalog.  All pairs start locked.
 */
export function initSynergyState(catalog: SynergyDef[]): SynergyState {
  return {
    pairs: catalog.map(def => ({
      synergyId:    def.id,
      unlocked:     false,
      useCountToday: 0,
    })),
  };
}

// ─── Evaluate synergy unlock eligibility ─────────────────────────────────────
/**
 * Called each time the party composition or a relationship score changes.
 * Iterates all synergy defs; unlocks or locks each based on current conditions.
 * Returns updated state + events for any newly unlocked or locked synergies.
 */
export function evaluateSynergyUnlocks(
  state:   GameState,
  catalog: SynergyDef[],
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  let   newPairs: SynergyPairState[] = state.synergies.pairs.map(p => ({ ...p }));

  const partyNpcIds = new Set(state.party.companions.map(c => c.npcId));

  for (const def of catalog) {
    const pairIdx = newPairs.findIndex(p => p.synergyId === def.id);
    if (pairIdx === -1) continue; // not yet registered; skip

    const shouldBeUnlocked = _meetsUnlockCriteria(state, def, partyNpcIds);
    const wasUnlocked      = newPairs[pairIdx].unlocked;

    if (shouldBeUnlocked && !wasUnlocked) {
      newPairs[pairIdx] = { ...newPairs[pairIdx], unlocked: true };
      events.push({ type: 'SYNERGY_UNLOCKED', synergyId: def.id });
    } else if (!shouldBeUnlocked && wasUnlocked) {
      newPairs[pairIdx] = { ...newPairs[pairIdx], unlocked: false };
      events.push({ type: 'SYNERGY_LOCKED', synergyId: def.id, reason: 'Party composition or intimacy gate no longer met.' });
    }
  }

  return {
    state: { ...state, synergies: { pairs: newPairs } },
    events,
  };
}

// ─── Activate a synergy combo in combat ──────────────────────────────────────
/**
 * Validate and consume one use of a synergy combo this encounter.
 * Returns the effectPayload for combatEngine to apply + SYNERGY_ACTIVATED event.
 * Throws if the synergy is locked, not active in party, or daily cap reached.
 */
export function activateSynergy(
  state:  GameState,
  def:    SynergyDef,
): { state: GameState; events: GameEvent[]; effectPayload: SynergyEffectPayload } {
  const pairState = state.synergies.pairs.find(p => p.synergyId === def.id);
  if (!pairState)          throw new Error(`Synergy "${def.id}" not found in state.`);
  if (!pairState.unlocked) throw new Error(`Synergy "${def.id}" is not unlocked.`);
  if (pairState.useCountToday >= def.maxUsesPerEncounter) {
    throw new Error(`Synergy "${def.id}" has already been used this encounter.`);
  }

  const newPairs = state.synergies.pairs.map(p =>
    p.synergyId === def.id
      ? { ...p, useCountToday: p.useCountToday + 1 }
      : p,
  );

  const events: GameEvent[] = [{ type: 'SYNERGY_ACTIVATED', synergyId: def.id, comboName: def.comboName }];
  return {
    state:         { ...state, synergies: { pairs: newPairs } },
    events,
    effectPayload: def.effectPayload,
  };
}

// ─── Day-end reset ────────────────────────────────────────────────────────────
/** Called by calendarEngine.runDayEndTick() step 7c. */
export function resetSynergyDailyCounts(state: GameState): GameState {
  return {
    ...state,
    synergies: {
      pairs: state.synergies.pairs.map(p => ({ ...p, useCountToday: 0 })),
    },
  };
}

// ─── Read helpers ─────────────────────────────────────────────────────────────
export function getUnlockedSynergies(state: GameState): SynergyPairState[] {
  return state.synergies.pairs.filter(p => p.unlocked);
}
export function isSynergyUnlocked(state: GameState, synergyId: string): boolean {
  return state.synergies.pairs.some(p => p.synergyId === synergyId && p.unlocked);
}

// ─── Internal helpers ─────────────────────────────────────────────────────────
function _meetsUnlockCriteria(
  state:        GameState,
  def:          SynergyDef,
  partyNpcIds:  Set<string>,
): boolean {
  // All member NPCs must be in the active party.
  for (const npcId of def.memberNpcIds) {
    if (!partyNpcIds.has(npcId)) return false;
  }
  // Each member must meet the intimacy threshold (trust + love).
  for (const npcId of def.memberNpcIds) {
    const contact = state.contacts.find(c => c.character.npcId === npcId);
    if (!contact) return false;
    const intimacySum = contact.character.trust + contact.character.love;
    if (intimacySum < def.intimacyThreshold) return false;
  }
  return true;
}
