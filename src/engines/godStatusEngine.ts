/**
 * godStatusEngine.ts
 * Phase 36 — God Status Tracking
 *
 * Owns all mutations to the `GameState.gods` record.
 * Engine-core is lore-agnostic: no god id strings are hardcoded here.
 * The Ojisan-specific god ids ('varan', 'solenne', …) and their initial
 * states live in ojisan-data. Game init calls createDefaultGodRecord(seed)
 * with that seed to populate GameState.gods.
 *
 * Import topology note:
 *   - factionEngine.isKnightlyOrderActive() imports isGodFree() from here.
 *   - jobEngine.unlockPath() imports isGodFree() from here.
 *   - questEngine.grantQuestReward() imports enslaveGod/freeGod/killGod from here.
 *   None of those create a circular dependency because this engine
 *   imports only from gameState.ts.
 */

import type { GameState, GameEvent, GodState } from '../state/gameState';

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Creates a gods record from a lore-provided seed.
 * All supplied entries are shallow-copied into the returned record;
 * any god id not in the seed has no entry (treated as FREE by isGodFree()).
 *
 * Ojisan usage:
 *   createDefaultGodRecord({
 *     varan:    { status: 'ENSLAVED', enslavedById: 'kharrath_ember_conclave', enslavedOnDay: 0 },
 *     solenne:  { status: 'FREE' },
 *     aeloria:  { status: 'FREE' },
 *     thessaly: { status: 'FREE' },
 *     durgrim:  { status: 'FREE' },
 *     hestrel:  { status: 'FREE' },
 *     nyxara:   { status: 'FREE' },
 *     kharrath: { status: 'FREE' },
 *     malvek:   { status: 'FREE' },
 *   })
 */
export function createDefaultGodRecord(
  seed: Record<string, GodState> = {},
): Record<string, GodState> {
  return { ...seed };
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Enslaves a god.
 *
 * Guards:
 *   - Throws when the god id is not present in state.gods.
 *   - Throws when the god is already ENSLAVED.
 *   - Throws when the god is DEAD (cannot be enslaved after death).
 *
 * Records enslavedById and enslavedOnDay = calendar.day.
 * Emits GOD_ENSLAVED.
 */
export function enslaveGod(
  state:      GameState,
  godId:      string,
  enslaverId: string,
): { state: GameState; events: GameEvent[] } {
  const existing = state.gods[godId];
  if (existing === undefined) {
    throw new Error(
      `godStatusEngine.enslaveGod: unknown god '${godId}'. ` +
      `Ensure createDefaultGodRecord() was called with this id at game init.`,
    );
  }
  if (existing.status === 'ENSLAVED') {
    throw new Error(
      `godStatusEngine.enslaveGod: '${godId}' is already ENSLAVED ` +
      `(enslavedById: '${existing.enslavedById}').`,
    );
  }
  if (existing.status === 'DEAD') {
    throw new Error(
      `godStatusEngine.enslaveGod: '${godId}' is DEAD and cannot be enslaved.`,
    );
  }

  const updatedGod: GodState = {
    status:         'ENSLAVED',
    enslavedById:   enslaverId,
    enslavedOnDay:  state.calendar.day,
  };

  const newState: GameState = {
    ...state,
    gods: { ...state.gods, [godId]: updatedGod },
  };

  const events: GameEvent[] = [
    {
      type:         'GOD_ENSLAVED',
      godId,
      enslavedById: enslaverId,
      day:          state.calendar.day,
    },
  ];

  return { state: newState, events };
}

/**
 * Frees a god from enslavement.
 *
 * Guards:
 *   - Throws when the god id is not present in state.gods.
 *   - Throws when the god is not currently ENSLAVED.
 *
 * Clears enslavedById and enslavedOnDay.
 * Emits GOD_FREED.
 */
export function freeGod(
  state: GameState,
  godId: string,
): { state: GameState; events: GameEvent[] } {
  const existing = state.gods[godId];
  if (existing === undefined) {
    throw new Error(
      `godStatusEngine.freeGod: unknown god '${godId}'.`,
    );
  }
  if (existing.status !== 'ENSLAVED') {
    throw new Error(
      `godStatusEngine.freeGod: '${godId}' is not ENSLAVED ` +
      `(current status: '${existing.status}').`,
    );
  }

  const updatedGod: GodState = { status: 'FREE' };

  const newState: GameState = {
    ...state,
    gods: { ...state.gods, [godId]: updatedGod },
  };

  const events: GameEvent[] = [
    { type: 'GOD_FREED', godId, day: state.calendar.day },
  ];

  return { state: newState, events };
}

/**
 * Marks a god as permanently dead.
 *
 * Guards:
 *   - Throws when the god id is not present in state.gods.
 *   - Throws when the god is already DEAD.
 *
 * Records killedOnDay = calendar.day. Preserves any prior enslavedById
 * for historical record (the god was enslaved and then killed).
 * Emits GOD_KILLED.
 */
export function killGod(
  state: GameState,
  godId: string,
): { state: GameState; events: GameEvent[] } {
  const existing = state.gods[godId];
  if (existing === undefined) {
    throw new Error(
      `godStatusEngine.killGod: unknown god '${godId}'.`,
    );
  }
  if (existing.status === 'DEAD') {
    throw new Error(
      `godStatusEngine.killGod: '${godId}' is already DEAD.`,
    );
  }

  const updatedGod: GodState = {
    ...existing,
    status:      'DEAD',
    killedOnDay: state.calendar.day,
  };

  const newState: GameState = {
    ...state,
    gods: { ...state.gods, [godId]: updatedGod },
  };

  const events: GameEvent[] = [
    { type: 'GOD_KILLED', godId, day: state.calendar.day },
  ];

  return { state: newState, events };
}

// ─── Read helpers ─────────────────────────────────────────────────────────────

/**
 * Returns true when the god exists in state.gods AND has status 'FREE'.
 *
 * Returns false for:
 *   - ENSLAVED gods (Temple Rite gate should block)
 *   - DEAD gods (permanently unavailable)
 *   - Unknown god ids (not seeded at game init — treated conservatively as not free)
 *
 * Consumers: jobEngine.unlockPath() (TEMPLE_RITE trigger)
 *            factionEngine.isKnightlyOrderActive()
 */
export function isGodFree(state: GameState, godId: string): boolean {
  return state.gods[godId]?.status === 'FREE';
}

/**
 * Returns the full GodState for a given godId, or undefined when the id
 * is not present in state.gods (not seeded at game init).
 *
 * Consumers: endingTrackerEngine.resolveEnding()
 *            dispatcher GOD_* event handlers
 */
export function getGodStatus(state: GameState, godId: string): GodState | undefined {
  return state.gods[godId];
}
