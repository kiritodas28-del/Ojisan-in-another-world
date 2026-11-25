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
 *                      (applied multiplicatively at stat-derivation time, not per tick)
 *   STAT_FLAT        — add `value` to the named `stat` CombatStats field
 *   AROUSAL_GAIN     — add `value` to target vitals.arousal each turn (clamped 0–100)
 *   SKIP_TURN        — actor skips their action this turn (no other tick fires)
 *
 * Stack semantics:
 *   - On re-apply when stacks < maxStacks: increment stacks, refresh to full duration.
 *   - On re-apply when stacks === maxStacks: refresh duration only (no stack increment).
 *   - STAT_MULT is applied once regardless of stack count (value encodes the per-instance
 *     rate; compound stacking requires separate catalog entries).
 *     Named exception — DEFENCE_RESONANCE: jobEngine compounds its DEF multiplier per
 *     active stack at stat-derivation time (stack 1 → ×1.25; stack 2 → ×1.5625).
 *   - DAMAGE_PER_TURN, HEAL_PER_TURN, and STAT_FLAT scale linearly with stack count.
 *
 * Engine-wired side effects (not encoded in onTick — quest/job/combat engine responsibility):
 *   - Aether Rot stage transitions (Stage 1→2 at day 14 overdue, 2→3 at day 21) are
 *     driven by questEngine tithe-overdue tick. Stage 2 also applies infamy +15 in all
 *     regions; Stage 3 emits BOUNTY_HUNTER_SPAWNED (all regions, tier CONDEMNED).
 *     All three stages are removed by questEngine on tithe paid.
 *   - COMMAND_MOMENTUM consumes 1 stack per party-member attack (combatEngine).
 *   - DEFENCE_RESONANCE regenerates 1 stack at start of Vanguard's turn when pool B > 0
 *     (jobEngine).
 *   - anomalous_rite_surge is applied by jobEngine.unlockPath() on TEMPLE_RITE trigger
 *     (Phase 30b.2); engine should reference it by id 'anomalous_rite_surge'.
 *   - MIND_CLOUDED is a marker read by skillEngine before charm/mind-control resolution;
 *     its presence lowers the resistance roll threshold by 20%.
 *   - SUBSPACE: if still active when arousal reaches 100, intimacyEngine triggers the
 *     mind-break outcome flag.
 *
 * Tasks 14.2, 42e.1, 25.30–25.34
 */

// ─── Types (re-exported for engine consumption) ───────────────────────────────
export interface StatusTickEffect {
  type: 'DAMAGE_PER_TURN' | 'HEAL_PER_TURN' | 'STAT_MULT' | 'STAT_FLAT' | 'AROUSAL_GAIN' | 'SKIP_TURN';
  value: number;
  /** stat key for STAT_MULT / STAT_FLAT — must match a CombatStats field */
  stat?: 'str' | 'agi' | 'wis' | 'def' | 'lck';
}

export interface StatusEffectDef {
  id:        string;
  name:      string;
  maxStacks: number;
  duration:  number;   // base turn count; refreshed to this on re-apply
  onTick:    StatusTickEffect[];
}

// ─── Catalog ──────────────────────────────────────────────────────────────────
export const STATUS_EFFECTS: Record<string, StatusEffectDef> = {

  // ═══════════════════════════════════════════════════════════════════════════
  // COMBAT — Damage over Time
  // ═══════════════════════════════════════════════════════════════════════════

  // ── POISONED ───────────────────────────────────────────────────────────────
  // Basic poison DoT; single stack. Applied by monsters and certain enemy skills.
  // Re-apply refreshes duration only.
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
  // Fire DoT; stacks to 3. DAMAGE_PER_TURN scales linearly with stack count.
  // Applied by fire-element attacks and enemy flame skills.
  BURNING: {
    id:        'BURNING',
    name:      'Burning',
    maxStacks: 3,
    duration:  3,
    onTick: [
      { type: 'DAMAGE_PER_TURN', value: 8 },
    ],
  },

  // ── VENOMED ────────────────────────────────────────────────────────────────
  // Heavier venom DoT that also degrades AGI. Applied by battle_venom_blade and
  // certain enemy types (Viperfang, Swamp Lurker). Stacks to 2; second stack
  // scales DAMAGE_PER_TURN linearly while STAT_MULT fires once.
  VENOMED: {
    id:        'VENOMED',
    name:      'Venomed',
    maxStacks: 2,
    duration:  4,
    onTick: [
      { type: 'DAMAGE_PER_TURN', value: 6  },
      { type: 'STAT_MULT', stat: 'agi', value: 0.85 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMBAT — Buffs
  // ═══════════════════════════════════════════════════════════════════════════

  // ── REGENERATING ──────────────────────────────────────────────────────────
  // Healing HoT; single stack. Applied by companion heal skills and HP potions.
  REGENERATING: {
    id:        'REGENERATING',
    name:      'Regenerating',
    maxStacks: 1,
    duration:  4,
    onTick: [
      { type: 'HEAL_PER_TURN', value: 10 },
    ],
  },

  // ── DEFENDED ──────────────────────────────────────────────────────────────
  // Short DEF buff from the DEFEND action (+30%). Expires at start of next turn
  // when the engine ticks statuses at turn-start (which is the design intent).
  DEFENDED: {
    id:        'DEFENDED',
    name:      'Defended',
    maxStacks: 1,
    duration:  1,
    onTick: [
      { type: 'STAT_MULT', stat: 'def', value: 1.3 },
    ],
  },

  // ── FORTIFIED ─────────────────────────────────────────────────────────────
  // Heavy DEF buff (+40%) from Vanguard defensive skills and Knight-class abilities.
  // Three-turn window; does not stack.
  FORTIFIED: {
    id:        'FORTIFIED',
    name:      'Fortified',
    maxStacks: 1,
    duration:  3,
    onTick: [
      { type: 'STAT_MULT', stat: 'def', value: 1.4 },
    ],
  },

  // ── INSPIRED ──────────────────────────────────────────────────────────────
  // Morale buff applied by battle_rally. +20% STR for 3 turns.
  // Targeted at a single party member; Warlord Decree variant applies to all.
  INSPIRED: {
    id:        'INSPIRED',
    name:      'Inspired',
    maxStacks: 1,
    duration:  3,
    onTick: [
      { type: 'STAT_MULT', stat: 'str', value: 1.2 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMBAT — Debuffs
  // ═══════════════════════════════════════════════════════════════════════════

  // ── WEAKENED ──────────────────────────────────────────────────────────────
  // STR reduced to 70% for 2 turns. STAT_MULT fires at derive-time
  // (deriveEffectiveStats), not per tick.
  WEAKENED: {
    id:        'WEAKENED',
    name:      'Weakened',
    maxStacks: 1,
    duration:  2,
    onTick: [
      { type: 'STAT_MULT', stat: 'str', value: 0.7 },
    ],
  },

  // ── STUNNED ───────────────────────────────────────────────────────────────
  // Actor skips their action for 1 turn. SKIP_TURN short-circuits action
  // resolution before any other tick fires.
  STUNNED: {
    id:        'STUNNED',
    name:      'Stunned',
    maxStacks: 1,
    duration:  1,
    onTick: [
      { type: 'SKIP_TURN', value: 1 },
    ],
  },

  // ── SLOWED ────────────────────────────────────────────────────────────────
  // AGI reduced to 70% for 2 turns. Applied by ice-element attacks, adhesive
  // traps, and enemy deceleration skills. Affects turn-order and dodge chance.
  SLOWED: {
    id:        'SLOWED',
    name:      'Slowed',
    maxStacks: 1,
    duration:  2,
    onTick: [
      { type: 'STAT_MULT', stat: 'agi', value: 0.7 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INTIMACY — Arousal / Submission States
  // ═══════════════════════════════════════════════════════════════════════════

  // ── AROUSED ───────────────────────────────────────────────────────────────
  // Applied by enemy sexual attacks. Builds arousal toward the 100 threshold;
  // at 100 in combat the target is treated as overpowered (defeat outcome).
  AROUSED: {
    id:        'AROUSED',
    name:      'Aroused',
    maxStacks: 1,
    duration:  3,
    onTick: [
      { type: 'AROUSAL_GAIN', value: 10 },
    ],
  },

  // ── OVERSTIMULATED ────────────────────────────────────────────────────────
  // Acute high-arousal state applied by ardor_overstimulate or by sustained
  // Ardor pressure past a hidden resistance threshold. Very rapid arousal build
  // in a short window. If arousal reaches 100 while this is active,
  // intimacyEngine triggers a forced climax outcome.
  OVERSTIMULATED: {
    id:        'OVERSTIMULATED',
    name:      'Overstimulated',
    maxStacks: 1,
    duration:  2,
    onTick: [
      { type: 'AROUSAL_GAIN', value: 25 },
    ],
  },

  // ── SENSITIZED ────────────────────────────────────────────────────────────
  // Prolonged-exposure state that escalates arousal build over multiple turns.
  // Stacks to 2 — second stack doubles the per-turn gain via linear scaling.
  // Applied by ardor_sustained_pressure and ardor_deep_rhythm on success.
  SENSITIZED: {
    id:        'SENSITIZED',
    name:      'Sensitized',
    maxStacks: 2,
    duration:  4,
    onTick: [
      { type: 'AROUSAL_GAIN', value: 15 },
    ],
  },

  // ── FLUSTERED ─────────────────────────────────────────────────────────────
  // Confusion/embarrassment state from successful teasing (ardor_coax,
  // ardor_body_read). Lightly raises arousal each turn and clouds judgement;
  // WIS debuff reduces resistance roll results in Ardor resolution.
  FLUSTERED: {
    id:        'FLUSTERED',
    name:      'Flustered',
    maxStacks: 1,
    duration:  3,
    onTick: [
      { type: 'STAT_MULT', stat: 'wis', value: 0.8  },
      { type: 'AROUSAL_GAIN',           value: 5    },
    ],
  },

  // ── SUBDUED ───────────────────────────────────────────────────────────────
  // Compliance state; target yields their action this turn without resisting.
  // Applied by high-momentum Ardor sequences once a compliance threshold is crossed.
  // Mechanically identical to STUNNED; contextually distinct in Ardor framing.
  SUBDUED: {
    id:        'SUBDUED',
    name:      'Subdued',
    maxStacks: 1,
    duration:  1,
    onTick: [
      { type: 'SKIP_TURN', value: 1 },
    ],
  },

  // ── COMPLIANT ─────────────────────────────────────────────────────────────
  // Deep submission marker; target's willpower is severely compromised.
  // Applied by ardor_whisper_command on success, or when total arousal ≥ 80
  // and WIS < 20 at turn-start. WIS halved for all resistance calculations;
  // persists 4 turns.
  COMPLIANT: {
    id:        'COMPLIANT',
    name:      'Compliant',
    maxStacks: 1,
    duration:  4,
    onTick: [
      { type: 'STAT_MULT', stat: 'wis', value: 0.5 },
    ],
  },

  // ── BOUND ─────────────────────────────────────────────────────────────────
  // Physical restraint applied by ardor_soft_bind. Target cannot act for 2 turns.
  // In Ardor scenes: blocks all resistance attempts.
  // In standard combat: blocks any action (same SKIP_TURN mechanic as STUNNED).
  BOUND: {
    id:        'BOUND',
    name:      'Bound',
    maxStacks: 1,
    duration:  2,
    onTick: [
      { type: 'SKIP_TURN', value: 1 },
    ],
  },

  // ── SUBSPACE ──────────────────────────────────────────────────────────────
  // Deep mental submission state triggered by ardor_subspace_push on critical
  // success. Combines rapid arousal escalation with severe WIS collapse.
  // If still active when arousal reaches 100: intimacyEngine fires the
  // mind-break outcome flag (see engine-wired side effects above).
  SUBSPACE: {
    id:        'SUBSPACE',
    name:      'Subspace',
    maxStacks: 1,
    duration:  3,
    onTick: [
      { type: 'AROUSAL_GAIN',           value: 20  },
      { type: 'STAT_MULT', stat: 'wis', value: 0.4 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SPECIAL / LORE
  // ═══════════════════════════════════════════════════════════════════════════

  // ── anomalous_rite_surge ──────────────────────────────────────────────────
  // Applied by jobEngine.unlockPath() on TEMPLE_RITE path awakening (Phase 30b.2).
  // Represents the unstable MP surge when anomalous energy courses through the
  // character post-ritual. Temporarily amplifies WIS (lifting max MP) and boosts
  // LCK by 30%. Clears naturally after 2 turns.
  // Engine reference: getStatusDef('anomalous_rite_surge')
  anomalous_rite_surge: {
    id:        'anomalous_rite_surge',
    name:      'Anomalous Rite Surge',
    maxStacks: 1,
    duration:  2,
    onTick: [
      { type: 'STAT_FLAT', stat: 'wis', value: 20  },
      { type: 'STAT_MULT', stat: 'lck', value: 1.3 },
    ],
  },

  // ── MIND_CLOUDED ──────────────────────────────────────────────────────────
  // Charm-effect marker applied by battle_mind_subjugate and ardor_mind_meld.
  // skillEngine reads this flag before charm/mind-control resolution: when
  // present, the target's resistance roll threshold is lowered by 20%.
  // Also suppresses WIS by 40% for direct combat stat calculations.
  MIND_CLOUDED: {
    id:        'MIND_CLOUDED',
    name:      'Mind Clouded',
    maxStacks: 1,
    duration:  3,
    onTick: [
      { type: 'STAT_MULT', stat: 'wis', value: 0.6 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PERSISTENT — Aether Rot (Tithe Overdue) · Tasks 25.30–25.32
  //
  // Stages are mutually exclusive — each replaces the previous, never coexists.
  // Applied, upgraded, and removed entirely by questEngine's tithe-overdue tick.
  // Infamy deltas and BOUNTY_HUNTER_SPAWNED are engine-side; not in onTick.
  // ═══════════════════════════════════════════════════════════════════════════

  // ── AETHER_ROT_STAGE_1 ────────────────────────────────────────────────────
  // Applied at 7 days overdue. STR and DEF degraded to 85%.
  // Cleared only by tithe payment (questEngine removes all three stages at once).
  AETHER_ROT_STAGE_1: {
    id:        'AETHER_ROT_STAGE_1',
    name:      'Aether Rot (Stage I)',
    maxStacks: 1,
    duration:  9999,
    onTick: [
      { type: 'STAT_MULT', stat: 'str', value: 0.85 },
      { type: 'STAT_MULT', stat: 'def', value: 0.85 },
    ],
  },

  // ── AETHER_ROT_STAGE_2 ────────────────────────────────────────────────────
  // Replaces Stage 1 at 14 days overdue. STR and DEF degrade further to 70%;
  // AGI degrades to 80%.
  // Side effect (questEngine): infamy +15 in all regions → triggers city-gate hostility.
  AETHER_ROT_STAGE_2: {
    id:        'AETHER_ROT_STAGE_2',
    name:      'Aether Rot (Stage II)',
    maxStacks: 1,
    duration:  9999,
    onTick: [
      { type: 'STAT_MULT', stat: 'str', value: 0.70 },
      { type: 'STAT_MULT', stat: 'def', value: 0.70 },
      { type: 'STAT_MULT', stat: 'agi', value: 0.80 },
    ],
  },

  // ── AETHER_ROT_STAGE_3 ────────────────────────────────────────────────────
  // Replaces Stage 2 at 21 days overdue. All stats halved.
  // Side effect (questEngine): emits BOUNTY_HUNTER_SPAWNED in all regions
  // at tier CONDEMNED.
  AETHER_ROT_STAGE_3: {
    id:        'AETHER_ROT_STAGE_3',
    name:      'Aether Rot (Stage III)',
    maxStacks: 1,
    duration:  9999,
    onTick: [
      { type: 'STAT_MULT', stat: 'str', value: 0.5 },
      { type: 'STAT_MULT', stat: 'def', value: 0.5 },
      { type: 'STAT_MULT', stat: 'agi', value: 0.5 },
      { type: 'STAT_MULT', stat: 'wis', value: 0.5 },
      { type: 'STAT_MULT', stat: 'lck', value: 0.5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // JOB RESOURCE EFFECTS — Tactician / Vanguard · Tasks 25.33–25.34
  //
  // Applied by jobEngine when spending pool B resource.
  // Consumed / regenerated by combatEngine / jobEngine respectively (see above).
  // ═══════════════════════════════════════════════════════════════════════════

  // ── COMMAND_MOMENTUM ──────────────────────────────────────────────────────
  // Tactician job: each stack grants +10 STR (ATK proxy) to all companions.
  // Max 3 stacks (applied on each pool-B spend via spendJobResource()).
  // Duration 2 turns. combatEngine consumes 1 stack per companion attack while
  // this effect is active. STAT_FLAT scales linearly: 1 stack = +10, 2 = +20,
  // 3 = +30.
  // Task 25.33
  COMMAND_MOMENTUM: {
    id:        'COMMAND_MOMENTUM',
    name:      'Command Momentum',
    maxStacks: 3,
    duration:  2,
    onTick: [
      { type: 'STAT_FLAT', stat: 'str', value: 10 },
    ],
  },

  // ── DEFENCE_RESONANCE ─────────────────────────────────────────────────────
  // Vanguard job: each stack boosts DEF by ×1.25 (compounded per stack at
  // stat-derivation time by jobEngine — see named exception in stack semantics
  // above). Max 2 stacks; duration 1 turn.
  // jobEngine regenerates 1 stack at start of Vanguard's turn when pool B > 0.
  // Task 25.34
  DEFENCE_RESONANCE: {
    id:        'DEFENCE_RESONANCE',
    name:      'Defence Resonance',
    maxStacks: 2,
    duration:  1,
    onTick: [
      { type: 'STAT_MULT', stat: 'def', value: 1.25 },
    ],
  },
};

/** Convenience lookup — throws on unknown id. */
export function getStatusDef(id: string): StatusEffectDef {
  const def = STATUS_EFFECTS[id];
  if (!def) throw new Error(`statusEffects: unknown status id "${id}"`);
  return def;
}
