/**
 * statusEffects.ts
 * Static catalog of all StatusEffectDef entries.
 *
 * PRD §4.13 — Status Effects
 *
 * StatusTickEffect.type semantics:
 *   DAMAGE_PER_TURN  — reduce target hp.current by `value` each turn (ignores DEF)
 *   HEAL_PER_TURN    — restore target hp.current by `value` each turn (clamped to max)
 *   STAT_MULT        — multiply the named `stat` CombatStats field by `value`
 *                      (applied multiplicatively; stacks multiply together)
 *   STAT_FLAT        — add `value` to the named `stat` CombatStats field
 *   AROUSAL_GAIN     — add `value` to target vitals.arousal each turn (clamped 0-100)
 *   SKIP_TURN        — actor skips their action this turn (no other tick fires)
 *
 * Stack semantics:
 *   - On re-apply when stacks < maxStacks: increment stacks, refresh to full duration.
 *   - On re-apply when stacks === maxStacks: refresh duration only (no stack increment).
 *   - STAT_MULT effects are applied once regardless of stacks (value already encodes
 *     the per-stack strength; compound stacking would need separate entries).
 *   - DAMAGE_PER_TURN and HEAL_PER_TURN scale linearly with stack count.
 *
 * Task 14.2
 */

// ─── Types (re-exported for engine consumption) ───────────────────────────────
export interface StatusTickEffect {
  type: 'DAMAGE_PER_TURN' | 'HEAL_PER_TURN' | 'STAT_MULT' | 'STAT_FLAT' | 'AROUSAL_GAIN' | 'SKIP_TURN';
  value: number;
  // stat key for STAT_MULT / STAT_FLAT (must match a CombatStats field: str/agi/wis/def/lck)
  stat?: 'str' | 'agi' | 'wis' | 'def' | 'lck';
}

export interface StatusEffectDef {
  id:        string;
  name:      string;
  maxStacks: number;
  duration:  number;   // base turn count; refreshed to this value on re-apply
  onTick:    StatusTickEffect[];
}

// ─── Catalog ──────────────────────────────────────────────────────────────────
export const STATUS_EFFECTS: Record<string, StatusEffectDef> = {

  // ── POISONED ───────────────────────────────────────────────────────────────
  // Basic DoT; single stack only. Applied by monsters and certain enemy skills.
  // Does not benefit from stacking — re-apply refreshes duration.
  POISONED: {
    id:        'POISONED',
    name:      'Poisoned',
    maxStacks: 1,
    duration:  3,
    onTick: [
      { type: 'DAMAGE_PER_TURN', value: 5 },
    ],
  },

  // ── BURNING ────────────────────────────────────────────────────────────────
  // Fire DoT; stacks up to 3. Each additional stack refreshes duration and
  // the DAMAGE_PER_TURN tick fires once per stack count (scaled by engine).
  BURNING: {
    id:        'BURNING',
    name:      'Burning',
    maxStacks: 3,
    duration:  3,
    onTick: [
      { type: 'DAMAGE_PER_TURN', value: 8 },
    ],
  },

  // ── REGENERATING ──────────────────────────────────────────────────────────
  // Healing HoT; single stack. Applied by companion heal skills and potions.
  REGENERATING: {
    id:        'REGENERATING',
    name:      'Regenerating',
    maxStacks: 1,
    duration:  4,
    onTick: [
      { type: 'HEAL_PER_TURN', value: 10 },
    ],
  },

  // ── WEAKENED ──────────────────────────────────────────────────────────────
  // Debuff reducing STR to 70% for 2 turns. Applies once; re-apply refreshes.
  // STAT_MULT fires at derive-time (deriveEffectiveStats), not per tick.
  // Listed in onTick so the engine knows what to apply at stat derivation.
  WEAKENED: {
    id:        'WEAKENED',
    name:      'Weakened',
    maxStacks: 1,
    duration:  2,
    onTick: [
      { type: 'STAT_MULT', stat: 'str', value: 0.7 },
    ],
  },

  // ── AROUSED ───────────────────────────────────────────────────────────────
  // Applied by enemy sexual attacks; raises arousal toward the 100 threshold.
  // At arousal 100 in combat: treated same as PURIFY overpowered (defeat outcome).
  AROUSED: {
    id:        'AROUSED',
    name:      'Aroused',
    maxStacks: 1,
    duration:  3,
    onTick: [
      { type: 'AROUSAL_GAIN', value: 10 },
    ],
  },

  // ── DEFENDED ──────────────────────────────────────────────────────────────
  // Buff from DEFEND action; raises DEF by 30% for 1 turn.
  // Single stack; short duration means it naturally expires before next turn
  // if the engine ticks at start-of-turn (which is the design).
  DEFENDED: {
    id:        'DEFENDED',
    name:      'Defended',
    maxStacks: 1,
    duration:  1,
    onTick: [
      { type: 'STAT_MULT', stat: 'def', value: 1.3 },
    ],
  },

  // ── STUNNED ───────────────────────────────────────────────────────────────
  // Actor skips their action for 1 turn. SKIP_TURN fires before any other tick;
  // when present, the engine short-circuits the actor's action resolution.
  STUNNED: {
    id:        'STUNNED',
    name:      'Stunned',
    maxStacks: 1,
    duration:  1,
    onTick: [
      { type: 'SKIP_TURN', value: 1 },
    ],
  },
};

/** Convenience lookup — throws on unknown id. */
export function getStatusDef(id: string): StatusEffectDef {
  const def = STATUS_EFFECTS[id];
  if (!def) throw new Error(`statusEffects: unknown status id "${id}"`);
  return def;
}
