/**
 * alignmentEngine.ts  — Phase 24
 * Generic 3-axis moral alignment system.
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
