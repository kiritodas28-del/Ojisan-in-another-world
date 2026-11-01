/**
 * endingCatalog.ts
 * Ojisan-specific ending axis definitions, defaults, and condition catalog.
 *
 * Engine-core (endingTrackerEngine.ts) is lore-agnostic: it accepts
 * EndingAxes as Record<string, string> and EndingCondition[] as a parameter.
 * All Ojisan-specific lore lives here:
 *   - Axis id strings          (OjisanEndingAxisId)
 *   - Ending id strings        (OjisanEndingId)
 *   - Game-start axis defaults (OJISAN_ENDING_AXIS_DEFAULTS)
 *   - Protected god ids        (OJISAN_PROTECTED_GOD_IDS) — gods tracked by 'gods' axis
 *   - Lore constants           (OJISAN_GODDESS_GOD_ID, OJISAN_ENSLAVER_ID)
 *   - Dispatcher helper        (deriveGodsAxisValue)
 *   - Ending condition catalog (OJISAN_ENDING_CONDITIONS) — empty stub, Phase 51b.1
 *
 * Phase 37: mechanics only. OJISAN_ENDING_CONDITIONS is intentionally empty.
 * Phase 51b.1: all 8 OjisanEndingId condition sets authored.
 *
 * Import topology:
 *   - dispatcher.ts: imports deriveGodsAxisValue, OJISAN_PROTECTED_GOD_IDS,
 *                    OJISAN_GODDESS_GOD_ID, OJISAN_ENSLAVER_ID
 *   - mockGameState.ts: imports OJISAN_ENDING_AXIS_DEFAULTS
 *   - Act 8 quest engine (Phase 51b.1): imports OJISAN_ENDING_CONDITIONS
 * No circular imports: this file imports only from gameState.ts.
 */

import type { EndingCondition, GodState } from '../state/gameState';

// ─── Axis id type alias ───────────────────────────────────────────────────────
// Convenience union for autocomplete and documentation.
// NOT enforced by the engine — endingTrackerEngine accepts plain strings.
// Every id here must be a key in OJISAN_ENDING_AXIS_DEFAULTS.
export type OjisanEndingAxisId =
  | 'goddess'       // tracks Varan's personal arc specifically
  | 'gods'          // aggregate: how many protected gods were lost to Kharrath
  | 'kharrath'      // outcome of the main antagonist
  | 'playerThrone'  // player's relationship to political power
  | 'faith'         // player's choice about the truth vs lie of Varan's divinity
  | 'law';          // which legal framework the player endorses

// ─── Ending id type alias ─────────────────────────────────────────────────────
// Convenience union for autocomplete and documentation.
// NOT enforced by the engine — resolveEnding returns a plain string.
export type OjisanEndingId =
  | 'the_restored_pantheon'   // full rescue, truth revealed, balanced law
  | 'the_diminished_return'   // Varan freed but weakened; bittersweet
  | 'the_silent_victory'      // Kharrath defeated but Varan's truth suppressed
  | 'the_iron_throne_of_law'  // player entrenches Ledger/Crowns power structure
  | 'the_broken_pantheon'     // multiple gods lost; hollow victory
  | 'the_dead_sky'            // Varan killed; divineless world
  | 'the_god_king'            // player enslaves Varan for power
  | 'the_creator_stirs';      // hidden ending; requires Seekers thread + full restoration

// ─── Game-start axis defaults ─────────────────────────────────────────────────
// Passed to endingTrackerEngine.createDefaultEndingAxes() at game init.
// Reflects the Ojisan world on Day 1: Varan is enslaved by Kharrath at Day 0
// (before the protagonist arrives); everything else is undecided or at rest.
export const OJISAN_ENDING_AXIS_DEFAULTS: Readonly<Record<OjisanEndingAxisId, string>> = {
  goddess:      'ENSLAVED_BY_KHARRATH',  // Varan enslaved at Day 0 (pre-game event)
  gods:         'UNKNOWN',              // no non-Varan god events have fired yet
  kharrath:     'ACTIVE',               // Kharrath is active and a threat
  playerThrone: 'UNDECIDED',
  faith:        'UNDECIDED',
  law:          'UNDECIDED',
};

// ─── Protected god ids ────────────────────────────────────────────────────────
// The aggregate 'gods' axis counts enslavement/death among THESE gods only.
// Excludes Varan (tracked by 'goddess' axis), Kharrath (antagonist),
// and Malvek (becomes an ally; his fate is not counted as a narrative loss).
export const OJISAN_PROTECTED_GOD_IDS: ReadonlySet<string> = new Set([
  'solenne', 'aeloria', 'thessaly', 'durgrim', 'hestrel', 'nyxara',
]);

// ─── Lore constants ───────────────────────────────────────────────────────────
// The god whose arc drives the 'goddess' axis.
export const OJISAN_GODDESS_GOD_ID = 'varan' as const;

// The canonical enslaver id used in GOD_ENSLAVED events from Kharrath's faction.
export const OJISAN_ENSLAVER_ID = 'kharrath_ember_conclave' as const;

// ─── 'gods' axis derivation helper ────────────────────────────────────────────
/**
 * Derives the current 'gods' axis value from live god records.
 * Called from dispatcher.ts after a GOD_ENSLAVED / GOD_FREED / GOD_KILLED
 * event fires for any god in OJISAN_PROTECTED_GOD_IDS.
 *
 * The state.gods record is already updated by godStatusEngine before the
 * event is emitted, so this reads the post-mutation count.
 *
 * Thresholds:
 *   0 lost  → 'ALL_SAFE'
 *   1–2 lost → 'PARTIAL_LOSS'
 *   3+ lost  → 'MULTIPLE_LOST'
 */
export function deriveGodsAxisValue(gods: Record<string, GodState>): string {
  const lostCount = [...OJISAN_PROTECTED_GOD_IDS].filter(
    id => gods[id]?.status === 'ENSLAVED' || gods[id]?.status === 'DEAD',
  ).length;

  if (lostCount === 0) return 'ALL_SAFE';
  if (lostCount <= 2)  return 'PARTIAL_LOSS';
  return 'MULTIPLE_LOST';
}

// ─── Ending condition catalog ─────────────────────────────────────────────────
// Phase 37: intentionally empty stub.
// Phase 51b.1: all 8 OjisanEndingId conditions authored here.
//
// Usage:
//   import { resolveEnding } from '../engines/endingTrackerEngine';
//   const endingId = resolveEnding(state, OJISAN_ENDING_CONDITIONS);
//
// Returns undefined through Acts 1–7 (empty catalog), which is correct —
// the ending cannot resolve before the Act 8 climax quest.
export const OJISAN_ENDING_CONDITIONS: EndingCondition[] = [];
