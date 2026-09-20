/**
 * statusEffectEngine.ts
 * Per-turn status effect ticking, stacking, expiry, and stat derivation.
 *
 * PRD §4.13 — Status Effects
 * Phase 14 — Tasks 14.1, 14.4–14.11
 *
 * Design:
 *   - All functions are CHARACTER-level transforms: (AnyCharacter, ...) -> result.
 *     They never receive GameState — the combat engine maps them over combatants[].
 *   - applyStatus / tickStatusEffects / removeStatus / clearAllStatuses all return
 *     { character: AnyCharacter; events: GameEvent[] } so callers can collect events
 *     without needing the full state in scope.
 *   - deriveEffectiveStats is a pure snapshot: reads activeStatusEffects, applies
 *     all STAT_MULT then STAT_FLAT effects, returns a CombatStats copy. Called by
 *     combatEngine before every hit resolution (task 14.13).
 *   - DAMAGE_PER_TURN and HEAL_PER_TURN scale linearly with current stack count.
 *   - STAT_MULT effects are multiplicative and applied in sequence (order in onTick).
 *   - SKIP_TURN is detected by combatEngine via hasStatus(character, 'STUNNED');
 *     the tick still fires so the duration decrements correctly.
 *   - clearAllStatuses is used at full rest (sleep) — no events needed there, but
 *     we emit STATUS_EXPIRED per entry for consistency (e.g. achievement counters).
 */

import type { AnyCharacter, CombatStats, GameEvent, ActiveStatusEffect } from '../state/gameState';
import { getStatusDef, STATUS_EFFECTS } from '../data/statusEffects';
export type { StatusEffectDef, StatusTickEffect } from '../data/statusEffects';
export { STATUS_EFFECTS } from '../data/statusEffects';

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 14.4 — CATALOG LOOKUP
// ═══════════════════════════════════════════════════════════════════════════════

/** Returns the static StatusEffectDef for a given id. Throws on unknown id. */
export { getStatusDef } from '../data/statusEffects';

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 14.7 — HAS STATUS (pure query)
// ═══════════════════════════════════════════════════════════════════════════════

/** Returns true when the character has at least 1 stack of the given status. */
export function hasStatus(character: AnyCharacter, defId: string): boolean {
  return character.activeStatusEffects.some(e => e.defId === defId);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 14.8 — GET STACK COUNT (pure query)
// ═══════════════════════════════════════════════════════════════════════════════

/** Returns the current stack count of a status on the character; 0 if absent. */
export function getStatusStacks(character: AnyCharacter, defId: string): number {
  return character.activeStatusEffects.find(e => e.defId === defId)?.stacks ?? 0;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 14.5 — APPLY STATUS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Applies or stacks a status effect on a character.
 *
 * Stack rules:
 *   - If not present: add new entry with stacks=1, remainingTurns=def.duration.
 *     Emits STATUS_APPLIED.
 *   - If present and stacks < maxStacks: increment stacks, refresh duration.
 *     Emits STATUS_STACKED.
 *   - If present and stacks === maxStacks: refresh duration only (no stack increment).
 *     Emits STATUS_STACKED (with same newStacks) to signal a refresh to the UI.
 *
 * Returns the updated character (immutable) and the emitted events.
 */
export function applyStatus(
  character: AnyCharacter,
  defId:     string,
): { character: AnyCharacter; events: GameEvent[] } {
  const def    = getStatusDef(defId);
  const events: GameEvent[] = [];

  const existingIdx = character.activeStatusEffects.findIndex(e => e.defId === defId);

  let updatedEffects: ActiveStatusEffect[];

  if (existingIdx === -1) {
    // New effect
    updatedEffects = [
      ...character.activeStatusEffects,
      { defId, remainingTurns: def.duration, stacks: 1 },
    ];
    events.push({ type: 'STATUS_APPLIED', defId, targetId: character.id });
  } else {
    const existing  = character.activeStatusEffects[existingIdx];
    const newStacks = Math.min(existing.stacks + 1, def.maxStacks);
    updatedEffects  = character.activeStatusEffects.map((e, i) =>
      i === existingIdx
        ? { ...e, stacks: newStacks, remainingTurns: def.duration } // always refresh duration
        : e,
    );
    events.push({ type: 'STATUS_STACKED', defId, targetId: character.id, newStacks });
  }

  return {
    character: { ...character, activeStatusEffects: updatedEffects },
    events,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 14.6 — TICK STATUS EFFECTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Applies one turn-tick to all active status effects on a character.
 *
 * For each active effect:
 *   1. Fire each StatusTickEffect in def.onTick:
 *      - DAMAGE_PER_TURN: reduce hp.current by (value x stacks); emit STATUS_TICKED.
 *      - HEAL_PER_TURN:   restore hp.current by (value x stacks), clamped; emit STATUS_TICKED.
 *      - AROUSAL_GAIN:    add (value x stacks) to vitals.arousal, clamped; emit STATUS_TICKED.
 *      - STAT_MULT/FLAT:  no tick-time mutation (applied at derive-time); no STATUS_TICKED.
 *      - SKIP_TURN:       no stat change; combatEngine reads hasStatus(STUNNED) before calling tick.
 *   2. Decrement remainingTurns by 1.
 *   3. If remainingTurns reaches 0: remove the entry; emit STATUS_EXPIRED.
 *      STATUS_TICKED is still emitted for the final turn before expiry.
 *
 * Returns updated character (immutable) and all emitted events.
 * Called by combatEngine at the start of each combatant's turn (task 14.12).
 * Also used by calendarEngine for out-of-combat duration tracking if needed.
 */
export function tickStatusEffects(
  character: AnyCharacter,
): { character: AnyCharacter; events: GameEvent[] } {
  const events: GameEvent[]          = [];
  const remaining: ActiveStatusEffect[] = [];

  // Work on a mutable vitals copy so multiple tick effects compose
  let hp      = { ...character.vitals.hp };
  let arousal = character.vitals.arousal;

  for (const entry of character.activeStatusEffects) {
    const def = STATUS_EFFECTS[entry.defId];
    if (!def) {
      // Unknown effect — drop it silently (forward-compatibility safety net)
      continue;
    }

    // Fire each tick effect
    for (const tick of def.onTick) {
      switch (tick.type) {
        case 'DAMAGE_PER_TURN': {
          // Scales with stack count
          const dmg  = tick.value * entry.stacks;
          hp.current = Math.max(0, hp.current - dmg);
          events.push({ type: 'STATUS_TICKED', defId: entry.defId, targetId: character.id, effectType: 'DAMAGE_PER_TURN', value: dmg });
          break;
        }
        case 'HEAL_PER_TURN': {
          const heal = tick.value * entry.stacks;
          hp.current = Math.min(hp.max, hp.current + heal);
          events.push({ type: 'STATUS_TICKED', defId: entry.defId, targetId: character.id, effectType: 'HEAL_PER_TURN', value: heal });
          break;
        }
        case 'AROUSAL_GAIN': {
          const gain = tick.value * entry.stacks;
          arousal    = Math.min(100, arousal + gain);
          events.push({ type: 'STATUS_TICKED', defId: entry.defId, targetId: character.id, effectType: 'AROUSAL_GAIN', value: gain });
          break;
        }
        case 'STAT_MULT':
        case 'STAT_FLAT':
          // Stat modifiers are applied at derive-time (deriveEffectiveStats).
          // Nothing to do here — just let the effect persist until expiry.
          break;
        case 'SKIP_TURN':
          // combatEngine reads hasStatus(character, 'STUNNED') before calling tick.
          // We still tick so duration decrements and STUNNED expires after 1 turn.
          break;
      }
    }

    // Decrement turn counter
    const newTurns = entry.remainingTurns - 1;
    if (newTurns <= 0) {
      // Effect expired — do not keep in remaining[]
      events.push({ type: 'STATUS_EXPIRED', defId: entry.defId, targetId: character.id });
    } else {
      remaining.push({ ...entry, remainingTurns: newTurns });
    }
  }

  const updatedCharacter: AnyCharacter = {
    ...character,
    vitals: {
      ...character.vitals,
      hp,
      arousal,
    },
    activeStatusEffects: remaining,
  };

  return { character: updatedCharacter, events };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 14.9 — REMOVE STATUS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Removes all stacks of a single status effect from a character.
 * No-op (no events) if the effect isn't present.
 * Use for manual dispel, cleanse items, and story-driven clears.
 */
export function removeStatus(
  character: AnyCharacter,
  defId:     string,
): { character: AnyCharacter; events: GameEvent[] } {
  const exists = character.activeStatusEffects.some(e => e.defId === defId);
  if (!exists) return { character, events: [] };

  const updatedEffects = character.activeStatusEffects.filter(e => e.defId !== defId);
  const events: GameEvent[] = [{ type: 'STATUS_EXPIRED', defId, targetId: character.id }];

  return {
    character: { ...character, activeStatusEffects: updatedEffects },
    events,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 14.10 — CLEAR ALL STATUSES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Removes every active status effect from a character.
 * Called by applyFullRestoreToParty() (sleep / full rest).
 * Emits STATUS_EXPIRED for each removed entry so achievement counters and
 * UI badges can react even at rest time.
 */
export function clearAllStatuses(
  character: AnyCharacter,
): { character: AnyCharacter; events: GameEvent[] } {
  if (character.activeStatusEffects.length === 0) return { character, events: [] };

  const events: GameEvent[] = character.activeStatusEffects.map(e => ({
    type:     'STATUS_EXPIRED' as const,
    defId:    e.defId,
    targetId: character.id,
  }));

  return {
    character: { ...character, activeStatusEffects: [] },
    events,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 14.11 — DERIVE EFFECTIVE STATS (pure snapshot)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Computes the character's effective CombatStats by stacking all active
 * STAT_MULT and STAT_FLAT effects on top of their base stats.
 *
 * Processing order (per standard RPG convention):
 *   1. All STAT_MULT effects applied multiplicatively (in onTick order).
 *   2. All STAT_FLAT effects added after multiplication.
 *
 * Called by combatEngine before every hit resolution (task 14.13) instead of
 * reading character.stats directly.
 *
 * STAT_MULT values scale with stack count by multiplying the modifier distance
 * from 1 by the stack count:
 *   effectiveMult = 1 + (value - 1) * stacks
 *   e.g. WEAKENED x0.7 at 1 stack = 0.7; cannot stack (maxStacks=1) but pattern
 *   is consistent if a multi-stack debuff is ever added.
 *
 * Returns a plain CombatStats object (never mutates character).
 */
export function deriveEffectiveStats(character: AnyCharacter): CombatStats {
  // Start from base stats (copy to avoid mutation)
  const stats: CombatStats = { ...character.stats };

  // Pass 1: multiplicative modifiers
  for (const entry of character.activeStatusEffects) {
    const def = STATUS_EFFECTS[entry.defId];
    if (!def) continue;

    for (const tick of def.onTick) {
      if (tick.type === 'STAT_MULT' && tick.stat) {
        // Scale the modifier distance from 1 by stack count
        const effectiveMult = 1 + (tick.value - 1) * entry.stacks;
        stats[tick.stat] = Math.max(0, Math.round(stats[tick.stat] * effectiveMult));
      }
    }
  }

  // Pass 2: flat additions (applied after multiplications)
  for (const entry of character.activeStatusEffects) {
    const def = STATUS_EFFECTS[entry.defId];
    if (!def) continue;

    for (const tick of def.onTick) {
      if (tick.type === 'STAT_FLAT' && tick.stat) {
        const flatBonus = tick.value * entry.stacks;
        stats[tick.stat] = Math.max(0, stats[tick.stat] + flatBonus);
      }
    }
  }

  return stats;
}
