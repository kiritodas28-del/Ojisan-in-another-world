/**
 * endingTrackerEngine.ts
 * Phase 37 — Ending Axis Tracker
 *
 * Owns all mutations to GameState.endingAxes.
 * Engine-core is lore-agnostic: no axis names or ending ids are hardcoded here.
 * The Ojisan-specific axes ('goddess', 'gods', 'kharrath', etc.), their valid
 * values, and the EndingCondition catalog all live in ojisan-data
 * (src/data/endingCatalog.ts). Game init calls createDefaultEndingAxes(seed)
 * with that seed to populate GameState.endingAxes.
 *
 * Import topology:
 *   - questEngine.grantQuestReward() imports updateEndingAxis from here.
 *   - dispatcher.ts GOD_* event handlers import updateEndingAxis from here.
 *   - Act 8 climax quest imports resolveEnding from here (Phase 51b.1 wiring).
 *   None create a circular dependency; this engine imports only from gameState.ts.
 */

import type { GameState, GameEvent, EndingAxes, EndingCondition } from '../state/gameState';

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Creates an endingAxes record from a lore-provided seed.
 * All supplied entries are shallow-copied; any axis not in the seed is absent
 * (treated as 'not yet determined' by UI and resolveEnding).
 *
 * Ojisan usage:
 *   createDefaultEndingAxes(OJISAN_ENDING_AXIS_DEFAULTS)
 *   where OJISAN_ENDING_AXIS_DEFAULTS is exported by src/data/endingCatalog.ts.
 */
export function createDefaultEndingAxes(
  seed: Record<string, string> = {},
): EndingAxes {
  return { ...seed };
}

// ─── Mutation ─────────────────────────────────────────────────────────────────

/**
 * Sets one ending axis to a new value.
 *
 * Idempotent: if the axis already holds the target value, returns the original
 * state unchanged with no events emitted. Callers can write unconditionally
 * without creating spurious event noise.
 *
 * Does NOT validate axis names or values against a catalog — the engine is
 * lore-agnostic. Data authors are responsible for consistent string literals.
 *
 * Emits ENDING_AXIS_UPDATED.
 */
export function updateEndingAxis(
  state: GameState,
  axis:  string,
  value: string,
): { state: GameState; events: GameEvent[] } {
  // Idempotency check — same value means no change and no event.
  if (state.endingAxes[axis] === value) {
    return { state, events: [] };
  }

  const newState: GameState = {
    ...state,
    endingAxes: { ...state.endingAxes, [axis]: value },
  };

  const events: GameEvent[] = [
    {
      type:     'ENDING_AXIS_UPDATED',
      axis,
      newValue: value,
      day:      state.calendar.day,
    },
  ];

  return { state: newState, events };
}

// ─── Resolution ───────────────────────────────────────────────────────────────

/**
 * Evaluates an ending condition catalog against the current game state.
 * Returns the first matching ending id, or undefined when no ending resolves.
 *
 * Evaluation order matters: the first full match wins. Authors should order the
 * catalog from most-specific to least-specific where conditions overlap.
 *
 * Each condition is tested as:
 *   1. ALL requires entries must match (state.endingAxes[axis] === value).
 *   2. ALL requiredFlags entries must match (state.flags[key] === flagValue).
 *
 * The catalog is passed as a parameter so engine-core stays lore-agnostic:
 *   resolveEnding(state, OJISAN_ENDING_CONDITIONS)
 *
 * Returns undefined when the catalog is empty — which is the correct behavior
 * for Acts 1–7 (Phase 51b.1 fills the catalog; Act 8 calls this function).
 */
export function resolveEnding(
  state:   GameState,
  catalog: EndingCondition[] = [],
): string | undefined {
  for (const condition of catalog) {
    const axesMatch = (Object.entries(condition.requires) as [string, string][])
      .every(([axis, val]) => state.endingAxes[axis] === val);

    if (!axesMatch) continue;

    const flagsMatch = condition.requiredFlags
      ? (Object.entries(condition.requiredFlags) as [string, boolean | string | number][])
          .every(([flagKey, flagVal]) => state.flags[flagKey] === flagVal)
      : true;

    if (flagsMatch) return condition.id;
  }

  return undefined;
}
