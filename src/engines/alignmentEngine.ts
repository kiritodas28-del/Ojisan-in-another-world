/**
 * alignmentEngine.ts  — Phase 24 (generic axes) + Phase 23a (Ojisan moral alignment)
 * Generic 3-axis moral alignment system (Phase 24) extended with a single
 * player-facing alignmentScore for Purifier / Pragmatist / Sovereign tilt
 * (Phase 23a, PRD §4.22).
 *
 * Design principles:
 *  - Axes are unlabelled here (axis_a / axis_b / axis_c).
 *    The static catalog src/data/alignmentCatalog.ts maps them to game-
 *    specific names (e.g. Rebel / Loyalist / Pragmatist for Ojisan).
 *  - Each axis is clamped to [-100, +100]; 0 is neutral.
 *  - dominantAxis is recomputed on every delta.  A player is "dominant" on
 *    an axis when their score on it exceeds the DOMINANT_THRESHOLD AND it
 *    exceeds both other axes by DOMINANT_MARGIN.
 *  - divergenceMultiplier scales combat difficulty when the player chooses
 *    a narrative resolution path whose axis opposes dominantAxis.
 *    Supplied by the static catalog entry for the resolution; engine just
 *    evaluates it and updates the cached field.
 *  - All functions are pure: they receive state and return { state, events }.
 *
 * Phase 23a additions (tasks 23a.6–23a.10, 23a.16):
 *  - alignmentScore lives on player.alignmentScore ([-100, +100]); this is
 *    separate from the 3-axis AlignmentState on GameState.alignment which is
 *    the Phase 24 generic layer.
 *  - deriveDominantAlignment() — `>= 40` → PURIFIER; `<= -40` → SOVEREIGN;
 *    else PRAGMATIST.
 *  - shiftAlignment() — clamps score, emits ALIGNMENT_SHIFTED, increments
 *    alignment path counters for achievement tracking.
 *  - applyDarkReputationDelta() — clamps [0,100]; emits
 *    DARK_REPUTATION_CHANGED; at threshold 40 also emits DARK_FACTION_UNLOCKED.
 *  - getDarkReputation() / getDominantAlignment() — pure read helpers.
 */

import type {
  GameState, GameEvent,
  AlignmentState, AlignmentAxis, RegionId,
} from '../state/gameState';

// ─── Tuning constants ─────────────────────────────────────────────────────────
// A player is "dominant" on an axis when the score exceeds this threshold...
const DOMINANT_THRESHOLD = 20;
// ...AND leads the other two axes by at least this margin.
const DOMINANT_MARGIN    = 15;
// Maximum divergence multiplier applied when resolution opposes dominant axis.
const MAX_DIVERGENCE_MULT = 2.5;
// Minimum (no penalty) — always ≥1.0.
const MIN_DIVERGENCE_MULT = 1.0;

// ─── Alignment band labels (generic; game catalog maps these to lore names) ───
export type AlignmentBand = 'DEEP_NEGATIVE' | 'NEGATIVE' | 'NEUTRAL' | 'POSITIVE' | 'DEEP_POSITIVE';

export function deriveAlignmentBand(score: number): AlignmentBand {
  if (score <= -60) return 'DEEP_NEGATIVE';
  if (score <= -20) return 'NEGATIVE';
  if (score <   20) return 'NEUTRAL';
  if (score <   60) return 'POSITIVE';
  return 'DEEP_POSITIVE';
}

// ─── Default initial alignment state ─────────────────────────────────────────
export function createDefaultAlignmentState(): AlignmentState {
  return {
    scores:              { axis_a: 0, axis_b: 0, axis_c: 0 },
    dominantAxis:        undefined,
    divergenceMultiplier: MIN_DIVERGENCE_MULT,
  };
}

// ─── Core: apply an alignment delta ──────────────────────────────────────────
/**
 * Apply a signed delta to one alignment axis.
 * source: human-readable label for the event (e.g. 'quest_rebel_raid', 'dialogue_betray').
 * Returns updated state + ALIGNMENT_DELTA event (+ ALIGNMENT_AXIS_CROSSED when band changes).
 */
export function applyAlignmentDelta(
  state: GameState,
  axis:  AlignmentAxis,
  delta: number,
  source: string,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const prev  = state.alignment.scores[axis];
  const next  = Math.max(-100, Math.min(100, prev + delta));

  const prevBand = deriveAlignmentBand(prev);
  const nextBand = deriveAlignmentBand(next);

  const newScores = { ...state.alignment.scores, [axis]: next };
  const dominant  = _deriveDominantAxis(newScores);
  const divMult   = _deriveDivergenceMultiplier(newScores, dominant);

  const newAlignment: AlignmentState = {
    scores:               newScores,
    dominantAxis:         dominant,
    divergenceMultiplier: divMult,
  };

  events.push({ type: 'ALIGNMENT_DELTA', axis, delta, newScore: next, source });

  if (prevBand !== nextBand) {
    events.push({ type: 'ALIGNMENT_AXIS_CROSSED', axis, from: prevBand, to: nextBand });
  }

  return {
    state: { ...state, alignment: newAlignment },
    events,
  };
}

// ─── Divergence penalty evaluation ───────────────────────────────────────────
/**
 * Called by the dispatcher when a player chooses a narrative resolution path.
 * resolutionAxis: the axis that path favours (e.g. 'axis_b' for Loyalist path).
 * Returns DIVERGENCE_PENALTY_ACTIVE event when the resolution opposes the dominant
 * axis, and the effective multiplier to apply to combat difficulty this chapter.
 */
export function evaluateDivergence(
  state: GameState,
  resolutionAxis: AlignmentAxis,
): { multiplier: number; events: GameEvent[] } {
  const { dominantAxis, divergenceMultiplier } = state.alignment;
  const events: GameEvent[] = [];

  // No penalty when there is no dominant axis or the resolution aligns.
  if (!dominantAxis || dominantAxis === resolutionAxis) {
    return { multiplier: MIN_DIVERGENCE_MULT, events };
  }

  events.push({ type: 'DIVERGENCE_PENALTY_ACTIVE', multiplier: divergenceMultiplier });
  return { multiplier: divergenceMultiplier, events };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────
function _deriveDominantAxis(
  scores: Record<AlignmentAxis, number>,
): AlignmentAxis | undefined {
  const axes: AlignmentAxis[] = ['axis_a', 'axis_b', 'axis_c'];
  let dominant: AlignmentAxis | undefined;
  let domScore = -Infinity;

  for (const ax of axes) {
    const abs = Math.abs(scores[ax]);
    if (abs > domScore) { domScore = abs; dominant = ax; }
  }

  if (!dominant || domScore < DOMINANT_THRESHOLD) return undefined;

  // Must lead the others by DOMINANT_MARGIN.
  for (const ax of axes) {
    if (ax === dominant) continue;
    if (domScore - Math.abs(scores[ax]) < DOMINANT_MARGIN) return undefined;
  }
  return dominant;
}

function _deriveDivergenceMultiplier(
  scores: Record<AlignmentAxis, number>,
  dominant: AlignmentAxis | undefined,
): number {
  if (!dominant) return MIN_DIVERGENCE_MULT;
  // Scale 1.0→2.5 linearly with the dominant axis absolute score (20→100).
  const abs   = Math.abs(scores[dominant]);
  const ratio = Math.min(1, (abs - DOMINANT_THRESHOLD) / (100 - DOMINANT_THRESHOLD));
  return MIN_DIVERGENCE_MULT + ratio * (MAX_DIVERGENCE_MULT - MIN_DIVERGENCE_MULT);
}


// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 23a — MORAL ALIGNMENT SCORE + DARK REPUTATION
// Single scalar on player.alignmentScore.  Orthogonal to Phase 24 3-axis system.
// ═══════════════════════════════════════════════════════════════════════════════

// Threshold at which a score is considered dominant (task 23a.6).
const ALIGNMENT_DOMINANT_THRESHOLD = 40;

// Per-shift achievement counter key prefixes (task 23a.16).
const ACH_COUNTER_PURIFIER   = 'ach_counter_alignment_purifier_choices';
const ACH_COUNTER_SOVEREIGN  = 'ach_counter_alignment_sovereign_choices';
const ACH_COUNTER_PRAGMATIST = 'ach_counter_alignment_pragmatist_choices';

/** Dark reputation threshold that unlocks the shadow faction (task 23a.8). */
const DARK_FACTION_THRESHOLD = 40;

// ─── 23a.6 — Dominant alignment derivation ──────────────────────────────────────

export type DominantAlignment = 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN';

/**
 * Pure helper.  Maps a raw alignmentScore to the dominant tendency.
 *   score >= +40  → PURIFIER
 *   score <= -40  → SOVEREIGN
 *   else          → PRAGMATIST
 */
export function deriveDominantAlignment(score: number): DominantAlignment {
  if (score >= ALIGNMENT_DOMINANT_THRESHOLD)  return 'PURIFIER';
  if (score <= -ALIGNMENT_DOMINANT_THRESHOLD) return 'SOVEREIGN';
  return 'PRAGMATIST';
}

// ─── 23a.7 — Shift the player's moral alignment score ──────────────────────────

/**
 * Apply a signed delta to player.alignmentScore.
 *   - Clamps result to [-100, +100].
 *   - Derives the new dominant alignment.
 *   - Emits ALIGNMENT_SHIFTED.
 *   - Increments the appropriate per-path achievement counter in flags.
 *     Counter keys: ach_counter_alignment_purifier_choices,
 *                   ach_counter_alignment_sovereign_choices,
 *                   ach_counter_alignment_pragmatist_choices.
 *
 * Call site: questEngine.grantQuestReward() (task 23a.11) and
 *            dialogueEngine.applyDialogueEffect() for ALIGNMENT_SHIFT effects
 *            (task 23a.12).  NOT called on combat kill/purify events.
 */
export function shiftAlignment(
  state:  GameState,
  delta:  number,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];

  const prev  = state.player.alignmentScore ?? 0;
  const next  = Math.max(-100, Math.min(100, prev + delta));
  const dominant = deriveDominantAlignment(next);

  // Increment the relevant path counter in flags (task 23a.16).
  const counterKey =
    dominant === 'PURIFIER'  ? ACH_COUNTER_PURIFIER  :
    dominant === 'SOVEREIGN' ? ACH_COUNTER_SOVEREIGN  :
                               ACH_COUNTER_PRAGMATIST;

  const newCount = ((state.flags[counterKey] as number | undefined) ?? 0) + 1;

  const newState: GameState = {
    ...state,
    player: {
      ...state.player,
      alignmentScore: next,
    },
    flags: {
      ...state.flags,
      [counterKey]: newCount,
    },
  };

  events.push({
    type:              'ALIGNMENT_SHIFTED',
    delta,
    newScore:          next,
    dominantAlignment: dominant,
  });

  return { state: newState, events };
}

// ─── 23a.8 — Dark reputation delta ────────────────────────────────────────────

/**
 * Apply a signed delta to darkReputation[regionId].
 *   - Clamps [0, 100].
 *   - Emits DARK_REPUTATION_CHANGED always.
 *   - Emits DARK_FACTION_UNLOCKED when the score first crosses >= 40.
 *     (Only when the old score was below threshold and new score meets it.)
 */
export function applyDarkReputationDelta(
  state:    GameState,
  regionId: import('../state/gameState').RegionId,
  delta:    number,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];

  const prev = (state.darkReputation ?? {})[regionId] ?? 0;
  const next = Math.max(0, Math.min(100, prev + delta));

  const newState: GameState = {
    ...state,
    darkReputation: {
      ...(state.darkReputation ?? {}),
      [regionId]: next,
    },
  };

  events.push({
    type:     'DARK_REPUTATION_CHANGED',
    regionId,
    delta,
    newScore: next,
  });

  // Emit DARK_FACTION_UNLOCKED only when crossing the threshold for the first time.
  if (prev < DARK_FACTION_THRESHOLD && next >= DARK_FACTION_THRESHOLD) {
    events.push({ type: 'DARK_FACTION_UNLOCKED', regionId });
  }

  return { state: newState, events };
}

// ─── 23a.9 — getDarkReputation ─────────────────────────────────────────────────

/** Pure helper: current darkReputation score for a region (0 if not yet set). */
export function getDarkReputation(
  state:    GameState,
  regionId: import('../state/gameState').RegionId,
): number {
  return (state.darkReputation ?? {})[regionId] ?? 0;
}

// ─── 23a.10 — getDominantAlignment ─────────────────────────────────────────

/**
 * Convenience wrapper: reads player.alignmentScore from state and returns
 * the dominant tendency.  Engines that need to gate dialogue/quest branches
 * should prefer this over reading the score directly.
 */
export function getDominantAlignment(state: GameState): DominantAlignment {
  return deriveDominantAlignment(state.player.alignmentScore ?? 0);
}
