/**
 * skills.ts
 * Static skill-tree catalog for Battle and Ardor trees.
 *
 * Covers Phase 42d.1 (= Phase 16.4 = Phase 25.1 + 25.2):
 *   BATTLE — 20 skills (combat passives + actives; unlocked with BP)
 *   ARDOR  — 20 skills (intimacy passives + actives; unlocked with AP)
 *
 * Prerequisite chains form two distinct acyclic trees; every id referenced in
 * prerequisites[] exists in SKILLS.
 *
 * STAT_BOOST stat keys map to CombatStats: str | agi | wis | def | lck.
 * Ardor tree passive boosts use:
 *   wis — proxies Technique (erotic finesse; closest CombatStat analog to TEC)
 *   lck — proxies CPW-reserve depth (closest CombatStat analog to CPW pool)
 * A dedicated effect type for direct CPW pool bonuses can be added in a future
 * phase without touching this catalog — engine reads effects[] by type only.
 *
 * AROUSAL_GAIN on a passive skill is an additive fraction summed by
 * derivePassiveArousalBonus() as a stimulation multiplier (0.05 → +5%).
 * AROUSAL_GAIN on an active skill adds directly to target.vitals.arousal.
 *
 * MIND_CONTROL effects delegate to applyMindControl() in skillEngine.ts.
 * charmVariant: true  → no backlash, no resistance roll (Ardor capstone).
 * charmVariant absent → hard control with backlash + per-turn break roll (Battle capstone).
 */

import type { SkillDef } from '../engines/skillEngine';

// ═══════════════════════════════════════════════════════════════════════════════
// BATTLE TREE  — 20 skills
// ═══════════════════════════════════════════════════════════════════════════════
//
// Tier 1  (pointCost 1) — no prerequisites; broad entry points
// Tier 2  (pointCost 2) — require one Tier 1 node
// Tier 3  (pointCost 3) — require one Tier 2 node
// Tier 4  (pointCost 4) — require two Tier 3 nodes (capstone)
//
// Passive multipliers (DAMAGE_MULTIPLIER) stack multiplicatively at the
// applyPassiveSkills() layer.  Momentum × Warlord's Edge = ×1.265 net.

const BATTLE_SKILLS: Record<string, SkillDef> = {

  // ── Tier 1 ──────────────────────────────────────────────────────────────────

  'battle_iron_fist': {
    id: 'battle_iron_fist', tree: 'BATTLE', name: 'Iron Fist',
    isPassive: true, pointCost: 1, prerequisites: [],
    // Passive: raw physical conditioning — +3 STR.
    effects: [{ type: 'STAT_BOOST', stat: 'str', value: 3 }],
  },

  'battle_stalwart': {
    id: 'battle_stalwart', tree: 'BATTLE', name: 'Stalwart',
    isPassive: true, pointCost: 1, prerequisites: [],
    // Passive: reinforced guard — +3 DEF.
    effects: [{ type: 'STAT_BOOST', stat: 'def', value: 3 }],
  },

  'battle_swift_footing': {
    id: 'battle_swift_footing', tree: 'BATTLE', name: 'Swift Footing',
    isPassive: true, pointCost: 1, prerequisites: [],
    // Passive: fleet movement — +3 AGI.
    effects: [{ type: 'STAT_BOOST', stat: 'agi', value: 3 }],
  },

  'battle_power_strike': {
    id: 'battle_power_strike', tree: 'BATTLE', name: 'Power Strike',
    isPassive: false, cpwCost: 8, pointCost: 1, prerequisites: [],
    // Active: focused blow — 1.5× damage on next FIGHT_ACTION.
    // Dispatcher injects the multiplier into CombatAction.damageMultiplier.
    effects: [{ type: 'DAMAGE_MULTIPLIER', value: 1.5 }],
  },

  'battle_shield_bash': {
    id: 'battle_shield_bash', tree: 'BATTLE', name: 'Shield Bash',
    isPassive: false, cpwCost: 8, pointCost: 1, prerequisites: [],
    // Active: stunning impact — 45% chance to apply STUNNED to target.
    effects: [{ type: 'STATUS_APPLY', statusId: 'stunned', chance: 0.45 }],
  },

  'battle_venom_blade': {
    id: 'battle_venom_blade', tree: 'BATTLE', name: 'Venom Blade',
    isPassive: false, cpwCost: 7, pointCost: 1, prerequisites: [],
    // Active: toxin-laced strike — 60% chance to apply POISONED to target.
    effects: [{ type: 'STATUS_APPLY', statusId: 'poisoned', chance: 0.60 }],
  },

  // ── Tier 2 ──────────────────────────────────────────────────────────────────

  'battle_iron_resolve': {
    id: 'battle_iron_resolve', tree: 'BATTLE', name: 'Iron Resolve',
    isPassive: true, pointCost: 2, prerequisites: ['battle_iron_fist'],
    // Passive: deeper physical conditioning — +5 STR.
    effects: [{ type: 'STAT_BOOST', stat: 'str', value: 5 }],
  },

  'battle_fortress_stance': {
    id: 'battle_fortress_stance', tree: 'BATTLE', name: 'Fortress Stance',
    isPassive: true, pointCost: 2, prerequisites: ['battle_stalwart'],
    // Passive: immovable posture — +5 DEF.
    effects: [{ type: 'STAT_BOOST', stat: 'def', value: 5 }],
  },

  'battle_momentum': {
    id: 'battle_momentum', tree: 'BATTLE', name: 'Momentum',
    isPassive: true, pointCost: 2, prerequisites: ['battle_power_strike'],
    // Passive: carry-over impact — multiplies all auto-attacks by 1.1×.
    effects: [{ type: 'DAMAGE_MULTIPLIER', value: 1.1 }],
  },

  'battle_counter_strike': {
    id: 'battle_counter_strike', tree: 'BATTLE', name: 'Counter Strike',
    isPassive: false, cpwCost: 7, pointCost: 2, prerequisites: ['battle_swift_footing'],
    // Active: riposte after a dodge — 1.35× damage.
    effects: [{ type: 'DAMAGE_MULTIPLIER', value: 1.35 }],
  },

  'battle_disarm': {
    id: 'battle_disarm', tree: 'BATTLE', name: 'Disarm',
    isPassive: false, cpwCost: 7, pointCost: 2, prerequisites: ['battle_shield_bash'],
    // Active: weapon-stripping maneuver — 60% chance to apply WEAKENED.
    effects: [{ type: 'STATUS_APPLY', statusId: 'weakened', chance: 0.60 }],
  },

  'battle_rally': {
    id: 'battle_rally', tree: 'BATTLE', name: 'Rally',
    isPassive: false, cpwCost: 10, pointCost: 2, prerequisites: ['battle_stalwart'],
    // Active: battle cry — 85% chance to apply INSPIRED to the caster.
    effects: [{ type: 'STATUS_APPLY', statusId: 'inspired', chance: 0.85 }],
  },

  'battle_purify_burst': {
    id: 'battle_purify_burst', tree: 'BATTLE', name: 'Purify Burst',
    isPassive: false, cpwCost: 10, pointCost: 2, prerequisites: ['battle_venom_blade'],
    // Active (purification tier 1): instantly applies 20 arousal to target.
    // Functions during combat vs arousal-susceptible enemies and in defeat-outcome
    // purification scenes.
    effects: [{ type: 'AROUSAL_GAIN', value: 20 }],
  },

  // ── Tier 3 ──────────────────────────────────────────────────────────────────

  'battle_warlord_edge': {
    id: 'battle_warlord_edge', tree: 'BATTLE', name: "Warlord's Edge",
    isPassive: true, pointCost: 3, prerequisites: ['battle_momentum'],
    // Passive: seasoned aggression — additional ×1.15 on all attacks.
    // Stacks multiplicatively with Momentum: 1.1 × 1.15 = ×1.265 net.
    effects: [{ type: 'DAMAGE_MULTIPLIER', value: 1.15 }],
  },

  'battle_steady_aim': {
    id: 'battle_steady_aim', tree: 'BATTLE', name: 'Steady Aim',
    isPassive: true, pointCost: 3, prerequisites: ['battle_counter_strike'],
    // Passive: refined footwork — +5 AGI.
    effects: [{ type: 'STAT_BOOST', stat: 'agi', value: 5 }],
  },

  'battle_exploit_weakness': {
    id: 'battle_exploit_weakness', tree: 'BATTLE', name: 'Exploit Weakness',
    isPassive: false, cpwCost: 12, pointCost: 3,
    prerequisites: ['battle_power_strike', 'battle_venom_blade'],
    // Active (multi-effect): targeted strike — 1.4× damage AND 40% WEAKENED.
    effects: [
      { type: 'DAMAGE_MULTIPLIER', value: 1.4 },
      { type: 'STATUS_APPLY', statusId: 'weakened', chance: 0.40 },
    ],
  },

  'battle_execute': {
    id: 'battle_execute', tree: 'BATTLE', name: 'Execute',
    isPassive: false, cpwCost: 20, pointCost: 3,
    prerequisites: ['battle_iron_resolve', 'battle_warlord_edge'],
    // Active: finishing-blow multiplier — 2.0× damage.
    // The highest single-hit damage multiplier in the Battle tree; use as
    // the closing strike on a weakened target.
    effects: [{ type: 'DAMAGE_MULTIPLIER', value: 2.0 }],
  },

  'battle_purify_nova': {
    id: 'battle_purify_nova', tree: 'BATTLE', name: 'Purify Nova',
    isPassive: false, cpwCost: 18, pointCost: 3,
    prerequisites: ['battle_purify_burst', 'battle_disarm'],
    // Active (purification tier 2): 40 direct arousal — double Purify Burst's output.
    effects: [{ type: 'AROUSAL_GAIN', value: 40 }],
  },

  // ── Tier 4 — capstone ────────────────────────────────────────────────────────

  'battle_warlord_decree': {
    id: 'battle_warlord_decree', tree: 'BATTLE', name: "Warlord's Decree",
    isPassive: false, cpwCost: 18, pointCost: 4,
    prerequisites: ['battle_execute', 'battle_exploit_weakness'],
    // Active (multi-effect): aura strike — 1.8× damage AND 40% STUNNED.
    // Capstone combination of raw damage and crowd control.
    effects: [
      { type: 'DAMAGE_MULTIPLIER', value: 1.8 },
      { type: 'STATUS_APPLY', statusId: 'stunned', chance: 0.40 },
    ],
  },

  'battle_mind_subjugate': {
    id: 'battle_mind_subjugate', tree: 'BATTLE', name: 'Mind Subjugate',
    isPassive: false, cpwCost: 25, pointCost: 4,
    prerequisites: ['battle_purify_nova', 'battle_rally'],
    // Active: hard mind-control — backlash 10% of caster max HP; resistance
    // roll 25% × (targetWis/100) per turn; blocked on high-MP targets.
    // charmVariant is intentionally absent → triggers backlash + break roll.
    effects: [{
      type: 'MIND_CONTROL',
      params: {
        mpCostFlat:               20,
        mpCostPerTargetMpRatio:   0.30,
        durationTurns:            3,
        backlashHpPct:            0.10,
        resistBreakChancePerTurn: 0.25,
        maxTargetMpRatio:         1.50,
      },
    }],
  },

};

// ═══════════════════════════════════════════════════════════════════════════════
// ARDOR TREE  — 20 skills
// ═══════════════════════════════════════════════════════════════════════════════
//
// Tier 1  (pointCost 1) — no prerequisites; broad entry points
// Tier 2  (pointCost 2) — require one Tier 1 node
// Tier 3  (pointCost 3) — require one or two Tier 2 nodes
// Tier 4  (pointCost 4) — require one or two Tier 3 nodes (capstone)
//
// Passive AROUSAL_GAIN values (0.05 – 0.12) sum in derivePassiveArousalBonus()
// to form a flat stimulation multiplier bonus each intimacy turn.
// Three passives unlocked → up to +27% stimulation multiplier.
//
// Named three-effect capstones (25.2):
//   aphrodisiac_strike — damage + aroused + arousal
//   subspace_push      — heavy arousal + subdued + compliant
//   denial_lock        — sensitized + aroused + arousal

const ARDOR_SKILLS: Record<string, SkillDef> = {

  // ── Tier 1 ──────────────────────────────────────────────────────────────────

  'ardor_gentle_touch': {
    id: 'ardor_gentle_touch', tree: 'ARDOR', name: 'Gentle Touch',
    isPassive: true, pointCost: 1, prerequisites: [],
    // Passive: attentive stimulation — +5% stimulation multiplier per turn.
    effects: [{ type: 'AROUSAL_GAIN', value: 0.05 }],
  },

  'ardor_body_read': {
    id: 'ardor_body_read', tree: 'ARDOR', name: 'Body Read',
    isPassive: true, pointCost: 1, prerequisites: [],
    // Passive: reading physical cues — +3 WIS (technique proxy).
    effects: [{ type: 'STAT_BOOST', stat: 'wis', value: 3 }],
  },

  'ardor_composure': {
    id: 'ardor_composure', tree: 'ARDOR', name: 'Composure',
    isPassive: true, pointCost: 1, prerequisites: [],
    // Passive: controlled focus — +3 LCK (CPW-reserve proxy).
    effects: [{ type: 'STAT_BOOST', stat: 'lck', value: 3 }],
  },

  'ardor_coax': {
    id: 'ardor_coax', tree: 'ARDOR', name: 'Coax',
    isPassive: false, cpwCost: 6, pointCost: 1, prerequisites: [],
    // Active: persuasive stimulation — 75% chance to apply AROUSED to target.
    effects: [{ type: 'STATUS_APPLY', statusId: 'aroused', chance: 0.75 }],
  },

  'ardor_lull': {
    id: 'ardor_lull', tree: 'ARDOR', name: 'Lull',
    isPassive: false, cpwCost: 6, pointCost: 1, prerequisites: [],
    // Active: soothing technique — 75% chance to apply DEFENDED to target.
    // DEFENDED signals receptive pliance in the intimacy context.
    effects: [{ type: 'STATUS_APPLY', statusId: 'defended', chance: 0.75 }],
  },

  'ardor_spark': {
    id: 'ardor_spark', tree: 'ARDOR', name: 'Spark',
    isPassive: false, cpwCost: 7, pointCost: 1, prerequisites: [],
    // Active: a sudden sharp stimulus — directly raises target arousal by 15.
    effects: [{ type: 'AROUSAL_GAIN', value: 15 }],
  },

  // ── Tier 2 ──────────────────────────────────────────────────────────────────

  'ardor_deep_rhythm': {
    id: 'ardor_deep_rhythm', tree: 'ARDOR', name: 'Deep Rhythm',
    isPassive: true, pointCost: 2, prerequisites: ['ardor_gentle_touch'],
    // Passive: sustained pacing — +10% stimulation multiplier per turn.
    // Combined with Gentle Touch: +15% passive multiplier.
    effects: [{ type: 'AROUSAL_GAIN', value: 0.10 }],
  },

  'ardor_technique_mastery': {
    id: 'ardor_technique_mastery', tree: 'ARDOR', name: 'Technique Mastery',
    isPassive: true, pointCost: 2, prerequisites: ['ardor_body_read'],
    // Passive: refined erotic technique — +5 WIS (technique proxy).
    effects: [{ type: 'STAT_BOOST', stat: 'wis', value: 5 }],
  },

  'ardor_poise_reserve': {
    id: 'ardor_poise_reserve', tree: 'ARDOR', name: 'Poise Reserve',
    isPassive: true, pointCost: 2, prerequisites: ['ardor_composure'],
    // Passive: deeper CPW reserve via focused calm — +5 LCK (CPW proxy).
    effects: [{ type: 'STAT_BOOST', stat: 'lck', value: 5 }],
  },

  'ardor_reading_her': {
    id: 'ardor_reading_her', tree: 'ARDOR', name: 'Reading Her',
    isPassive: false, cpwCost: 10, pointCost: 2, prerequisites: ['ardor_body_read'],
    // Active: deeply attentive stimulation — raises target arousal by 25.
    effects: [{ type: 'AROUSAL_GAIN', value: 25 }],
  },

  'ardor_soft_bind': {
    id: 'ardor_soft_bind', tree: 'ARDOR', name: 'Soft Bind',
    isPassive: false, cpwCost: 8, pointCost: 2, prerequisites: ['ardor_lull'],
    // Active: light physical restraint — 60% chance to apply SUBDUED.
    effects: [{ type: 'STATUS_APPLY', statusId: 'subdued', chance: 0.60 }],
  },

  'ardor_sustained_pressure': {
    id: 'ardor_sustained_pressure', tree: 'ARDOR', name: 'Sustained Pressure',
    isPassive: false, cpwCost: 12, pointCost: 2,
    prerequisites: ['ardor_coax', 'ardor_spark'],
    // Active (multi-effect): continuous stimulation — +20 arousal AND
    // 50% chance to apply AROUSED.
    effects: [
      { type: 'AROUSAL_GAIN', value: 20 },
      { type: 'STATUS_APPLY', statusId: 'aroused', chance: 0.50 },
    ],
  },

  // ── Tier 3 ──────────────────────────────────────────────────────────────────

  'ardor_deep_resonance': {
    id: 'ardor_deep_resonance', tree: 'ARDOR', name: 'Deep Resonance',
    isPassive: true, pointCost: 3,
    prerequisites: ['ardor_deep_rhythm', 'ardor_technique_mastery'],
    // Passive: full-body attunement — +12% stimulation multiplier.
    // Three passives combined: Gentle Touch + Deep Rhythm + Deep Resonance = +27%.
    effects: [{ type: 'AROUSAL_GAIN', value: 0.12 }],
  },

  'ardor_overstimulate': {
    id: 'ardor_overstimulate', tree: 'ARDOR', name: 'Overstimulate',
    isPassive: false, cpwCost: 15, pointCost: 3,
    prerequisites: ['ardor_reading_her', 'ardor_sustained_pressure'],
    // Active (multi-effect): forced peak stimulation — +35 arousal AND
    // 60% chance to apply OVERSTIMULATED.
    effects: [
      { type: 'AROUSAL_GAIN', value: 35 },
      { type: 'STATUS_APPLY', statusId: 'overstimulated', chance: 0.60 },
    ],
  },

  'ardor_edge': {
    id: 'ardor_edge', tree: 'ARDOR', name: 'Edge',
    isPassive: false, cpwCost: 14, pointCost: 3,
    prerequisites: ['ardor_soft_bind', 'ardor_sustained_pressure'],
    // Active (multi-effect): keeps target at the threshold — +25 arousal AND
    // 75% chance to apply SENSITIZED (heightened response to further stimulation).
    effects: [
      { type: 'AROUSAL_GAIN', value: 25 },
      { type: 'STATUS_APPLY', statusId: 'sensitized', chance: 0.75 },
    ],
  },

  'ardor_whisper_command': {
    id: 'ardor_whisper_command', tree: 'ARDOR', name: 'Whisper Command',
    isPassive: false, cpwCost: 14, pointCost: 3,
    prerequisites: ['ardor_soft_bind', 'ardor_poise_reserve'],
    // Active (multi-effect): quiet authoritative command — 65% chance to apply
    // COMPLIANT AND +15 arousal.
    effects: [
      { type: 'STATUS_APPLY', statusId: 'compliant', chance: 0.65 },
      { type: 'AROUSAL_GAIN', value: 15 },
    ],
  },

  // ── Tier 4 — capstone ────────────────────────────────────────────────────────

  'ardor_aphrodisiac_strike': {
    id: 'ardor_aphrodisiac_strike', tree: 'ARDOR', name: 'Aphrodisiac Strike',
    isPassive: false, cpwCost: 18, pointCost: 4,
    prerequisites: ['ardor_overstimulate'],
    // Active (multi-effect): intimate combat technique — 1.3× damage,
    // 80% chance AROUSED, +20 arousal.
    // Bridges the two trees; functions in both combat and intimacy contexts.
    effects: [
      { type: 'DAMAGE_MULTIPLIER', value: 1.3 },
      { type: 'STATUS_APPLY', statusId: 'aroused', chance: 0.80 },
      { type: 'AROUSAL_GAIN', value: 20 },
    ],
  },

  'ardor_subspace_push': {
    id: 'ardor_subspace_push', tree: 'ARDOR', name: 'Subspace Push',
    isPassive: false, cpwCost: 20, pointCost: 4,
    prerequisites: ['ardor_whisper_command', 'ardor_overstimulate'],
    // Active (multi-effect): drives target into subspace — +50 arousal,
    // 70% chance SUBDUED, 50% chance COMPLIANT.
    effects: [
      { type: 'AROUSAL_GAIN', value: 50 },
      { type: 'STATUS_APPLY', statusId: 'subdued', chance: 0.70 },
      { type: 'STATUS_APPLY', statusId: 'compliant', chance: 0.50 },
    ],
  },

  'ardor_denial_lock': {
    id: 'ardor_denial_lock', tree: 'ARDOR', name: 'Denial Lock',
    isPassive: false, cpwCost: 20, pointCost: 4,
    prerequisites: ['ardor_edge', 'ardor_aphrodisiac_strike'],
    // Active (multi-effect): sustained denial — 90% chance SENSITIZED,
    // 60% chance AROUSED, +10 arousal.  Locks the target in a heightened
    // but frustrated state; ideal setup before a finishing scene.
    effects: [
      { type: 'STATUS_APPLY', statusId: 'sensitized', chance: 0.90 },
      { type: 'STATUS_APPLY', statusId: 'aroused', chance: 0.60 },
      { type: 'AROUSAL_GAIN', value: 10 },
    ],
  },

  'ardor_mind_meld': {
    id: 'ardor_mind_meld', tree: 'ARDOR', name: 'Mind Meld',
    isPassive: false, cpwCost: 22, pointCost: 4,
    prerequisites: ['ardor_subspace_push', 'ardor_denial_lock'],
    // Active: charm-variant mind control — no backlash, no resistance roll;
    // duration 4 turns. Blocked on targets whose MP exceeds 1.2× caster MP max.
    // charmVariant: true → applyMindControl() skips backlash + break-roll paths.
    effects: [{
      type: 'MIND_CONTROL',
      params: {
        mpCostFlat:               15,
        mpCostPerTargetMpRatio:   0.20,
        durationTurns:            4,
        backlashHpPct:            0,     // charm: no caster HP drain
        resistBreakChancePerTurn: 0,     // charm: no early break roll
        maxTargetMpRatio:         1.20,
        charmVariant:             true,
      },
    }],
  },

};

// ─── Merged catalog ────────────────────────────────────────────────────────────
// Engines import SKILLS and call getSkillDef(id) via skillEngine.ts.
// The Record key must equal SkillDef.id — enforced by the per-tree spread below.

export const SKILLS: Record<string, SkillDef> = {
  ...BATTLE_SKILLS,
  ...ARDOR_SKILLS,
};
