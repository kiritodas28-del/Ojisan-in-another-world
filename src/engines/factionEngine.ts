/**
 * factionEngine.ts
 * Phase 41 — Generic Faction System
 *
 * Owns all mutations to GameState.factions.
 * Engine-core is lore-agnostic: no faction id strings are hardcoded here.
 * The Ojisan-specific catalog (FactionDef entries) lives in
 * src/data/factionCatalog.ts and is passed as a parameter to every function
 * that needs it, keeping engine ↔ catalog coupling one-directional.
 *
 * Import topology note:
 *   This engine imports isGodFree() from godStatusEngine.ts to implement
 *   the knightly-order gate. No circular dependency is created because
 *   godStatusEngine.ts imports only from gameState.ts.
 *   factionCatalog.ts imports FactionDef from here (catalog → engine),
 *   never the reverse (engine → catalog).
 *
 * Standing model:
 *   score ∈ [-100, +100]; tier derived per FactionDef.tiers thresholds.
 *   Entries in GameState.factions are sparse: only created on first delta.
 *   getFactionStanding() always returns a valid view (from defaultScore) even
 *   when the entry is absent.
 *
 * Membership model:
 *   isMember / memberRank are orthogonal to score/tier.
 *   Membership is set/cleared exclusively via joinFaction() / leaveFaction().
 *   Knightly orders gate joinFaction() on patronGodId status; all other
 *   faction types are always joinable when the dialogue condition is met.
 *   Existing members are NOT ejected when a patron god is enslaved —
 *   that narrative is handled at the quest/story layer.
 *
 * Decay model:
 *   Only criminal and underground factions decay.
 *   Positive scores (> 0) decay by 1 point per day-end tick.
 *   Negative scores do not self-heal — the player must earn standing back.
 *   All other faction types are permanently stable without player action.
 */

import type {
  GameState,
  GameEvent,
  FactionTier,
  FactionStanding,
} from '../state/gameState';
import { isGodFree } from './godStatusEngine';

// ─── FactionDef ───────────────────────────────────────────────────────────────

/** The eight faction type categories. */
export type FactionType =
  | 'adventurer_guild'
  | 'mercenary'
  | 'criminal'
  | 'religious'
  | 'knightly_order'
  | 'academic'
  | 'political'
  | 'trade'
  | 'underground';

/**
 * A single entry in the faction tier table.
 * `tier` is reached when `score >= minScore`.
 * The array MUST include an entry whose minScore is -100 (or lower) so that
 * every possible score maps to at least one tier. deriveFactionTier() falls
 * back to the first (lowest-minScore) entry defensively, but catalog authors
 * should not rely on that.
 */
export interface FactionTierEntry {
  tier:     FactionTier;
  minScore: number;
  /** Flavour label shown in UI for this tier, e.g. "Initiate", "Enemy", "Champion Knight". */
  label:    string;
}

/**
 * Lore-agnostic description of a faction.
 * Authored in src/data/factionCatalog.ts; passed as a parameter to engine
 * functions. The engine never imports the catalog directly.
 */
export interface FactionDef {
  id:          string;
  name:        string;
  type:        FactionType;
  description: string;

  /**
   * The god whose FREE status gates joining this faction.
   * Only meaningful when type === 'knightly_order'.
   * When absent on a knightly_order entry, joinFaction() is always permitted
   * (treat as a defensive fallback; catalog should always set this).
   */
  patronGodId?: string;

  /**
   * Tier thresholds, ordered ascending by minScore.
   * Must cover the full range down to at least -100.
   * deriveFactionTier() walks descending (highest minScore first) and returns
   * the first tier whose minScore <= score.
   */
  tiers: FactionTierEntry[];

  /**
   * Rank ladder for member factions, ordered from lowest to highest.
   * e.g. ['Initiate', 'Journeyman', 'Ranger', 'Champion', 'Legend']
   * Optional — factions without ranks omit this.
   */
  memberRanks?: string[];

  /**
   * Starting score used when lazy-initialising an absent GameState.factions
   * entry on the first applyFactionDelta() call.
   * Typically 0 (neutral start); negative for criminal/underground factions
   * whose default relationship with an upstanding adventurer is wary.
   */
  defaultScore: number;
}

// ─── Pure helpers ─────────────────────────────────────────────────────────────

/**
 * Derives the FactionTier for a given score against a FactionDef's tier table.
 *
 * Walks `def.tiers` highest-minScore first; returns the tier whose
 * minScore is the highest value still <= score. This means:
 *   score 80 → first tier whose minScore ≤ 80 (e.g. CHAMPION at 80)
 *   score 50 → TRUSTED if that's the next threshold
 *   score -100 → HOSTILE (lowest tier)
 *
 * Falls back to the tier with the lowest minScore if no entry qualifies
 * (guards against a malformed catalog that doesn't cover the full range).
 */
export function deriveFactionTier(score: number, def: FactionDef): FactionTier {
  // Sort descending by minScore so we find the highest applicable tier first.
  const sorted = [...def.tiers].sort((a, b) => b.minScore - a.minScore);
  for (const entry of sorted) {
    if (score >= entry.minScore) {
      return entry.tier;
    }
  }
  // Fallback: return the tier with the lowest minScore.
  const fallback = sorted[sorted.length - 1];
  if (fallback !== undefined) return fallback.tier;
  throw new Error(
    `factionEngine.deriveFactionTier: FactionDef '${def.id}' has an empty tiers array.`,
  );
}

/**
 * Returns the current FactionStanding for a faction from state, or a virtual
 * standing derived from def.defaultScore when the entry is absent.
 *
 * Pure read — does NOT mutate state. Always returns a valid object; callers
 * never need to null-check. Use this in UI and condition evaluators.
 */
export function getFactionStanding(
  state:    GameState,
  factionId: string,
  catalog:  Record<string, FactionDef>,
): FactionStanding {
  const existing = state.factions[factionId];
  if (existing !== undefined) return existing;

  const def = _requireDef(factionId, catalog);
  return {
    score:    def.defaultScore,
    tier:     deriveFactionTier(def.defaultScore, def),
    isMember: false,
  };
}

/**
 * Returns whether the player is currently a member of factionId.
 * Pure read; returns false for any absent entry.
 */
export function isFactionMember(state: GameState, factionId: string): boolean {
  return state.factions[factionId]?.isMember ?? false;
}

/**
 * Returns true when factionId is not a knightly_order, OR when it is a
 * knightly_order whose patronGodId has status FREE in state.gods.
 *
 * Returns false when:
 *   - type === 'knightly_order' AND patronGodId is ENSLAVED or DEAD
 *   - type === 'knightly_order' AND patronGodId is not in state.gods
 *
 * Used by joinFaction() as the membership gate for knightly orders.
 * Does NOT affect existing members — only blocks new joins.
 */
export function isKnightlyOrderActive(
  state:     GameState,
  factionId: string,
  catalog:   Record<string, FactionDef>,
): boolean {
  const def = _requireDef(factionId, catalog);
  if (def.type !== 'knightly_order') return true;
  if (def.patronGodId === undefined) return true;  // defensive; catalog should always set this
  return isGodFree(state, def.patronGodId);
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Applies a delta to a faction's standing score.
 *
 * Behaviour:
 *   1. Looks up the FactionDef; throws on unknown id.
 *   2. Lazy-inits the GameState entry from def.defaultScore when absent.
 *   3. Adds delta to score and clamps to [-100, +100].
 *   4. Recomputes tier via deriveFactionTier().
 *   5. Emits FACTION_STANDING_CHANGED (always).
 *   6. Emits FACTION_TIER_CROSSED if the tier changed.
 *
 * This is the single write path for score and tier — no other function
 * directly modifies those fields.
 */
export function applyFactionDelta(
  state:     GameState,
  factionId: string,
  delta:     number,
  catalog:   Record<string, FactionDef>,
): { state: GameState; events: GameEvent[] } {
  const def = _requireDef(factionId, catalog);

  // Lazy-init: if no entry exists yet, seed from defaultScore.
  const existing: FactionStanding = state.factions[factionId] ?? {
    score:    def.defaultScore,
    tier:     deriveFactionTier(def.defaultScore, def),
    isMember: false,
  };

  const prevTier  = existing.tier;
  const rawScore  = existing.score + delta;
  const newScore  = Math.max(-100, Math.min(100, rawScore));
  const newTier   = deriveFactionTier(newScore, def);

  const newEntry: FactionStanding = {
    ...existing,
    score: newScore,
    tier:  newTier,
  };

  const newState: GameState = {
    ...state,
    factions: { ...state.factions, [factionId]: newEntry },
  };

  const events: GameEvent[] = [
    {
      type:     'FACTION_STANDING_CHANGED',
      factionId,
      delta,
      newScore,
      newTier,
    },
  ];

  if (newTier !== prevTier) {
    events.push({
      type:     'FACTION_TIER_CROSSED',
      factionId,
      from:     prevTier,
      to:       newTier,
    });
  }

  return { state: newState, events };
}

/**
 * Sets the player as a member of factionId.
 *
 * Guards:
 *   - Throws on unknown factionId.
 *   - Throws when the faction is a knightly_order and isKnightlyOrderActive()
 *     returns false (patron god enslaved or dead).
 *
 * Idempotent on isMember: if already a member, updates memberRank if provided
 * (e.g. rank promotion via dialogue) and re-emits FACTION_JOINED.
 *
 * Does NOT modify score or tier — standing and membership are orthogonal.
 */
export function joinFaction(
  state:     GameState,
  factionId: string,
  rank:      string | undefined,
  catalog:   Record<string, FactionDef>,
): { state: GameState; events: GameEvent[] } {
  const def = _requireDef(factionId, catalog);

  if (!isKnightlyOrderActive(state, factionId, catalog)) {
    throw new Error(
      `factionEngine.joinFaction: cannot join knightly order '${factionId}' — ` +
      `patron god '${def.patronGodId}' is not FREE. ` +
      `Check isKnightlyOrderActive() before offering the join dialogue option.`,
    );
  }

  const existing: FactionStanding = state.factions[factionId] ?? {
    score:    def.defaultScore,
    tier:     deriveFactionTier(def.defaultScore, def),
    isMember: false,
  };

  const newEntry: FactionStanding = {
    ...existing,
    isMember:   true,
    memberRank: rank,
  };

  const newState: GameState = {
    ...state,
    factions: { ...state.factions, [factionId]: newEntry },
  };

  const events: GameEvent[] = [
    { type: 'FACTION_JOINED', factionId, rank },
  ];

  return { state: newState, events };
}

/**
 * Removes the player's membership from factionId.
 *
 * Guards:
 *   - Throws on unknown factionId.
 *
 * No-op (no state change, no events) if the player is not currently a member.
 * This allows dialogue effects to call leaveFaction() defensively without
 * needing to pre-check isFactionMember().
 */
export function leaveFaction(
  state:     GameState,
  factionId: string,
  catalog:   Record<string, FactionDef>,
): { state: GameState; events: GameEvent[] } {
  _requireDef(factionId, catalog);  // validate id even if no mutation occurs

  const existing = state.factions[factionId];
  if (existing === undefined || !existing.isMember) {
    // Not a member; no-op.
    return { state, events: [] };
  }

  const newEntry: FactionStanding = {
    ...existing,
    isMember:   false,
    memberRank: undefined,
  };

  const newState: GameState = {
    ...state,
    factions: { ...state.factions, [factionId]: newEntry },
  };

  const events: GameEvent[] = [
    { type: 'FACTION_LEFT', factionId },
  ];

  return { state: newState, events };
}

/**
 * Day-end standing decay for criminal and underground factions.
 *
 * Decay rules:
 *   - Applies only to factions with type 'criminal' or 'underground'.
 *   - Only positive scores (score > 0) decay; score − 1 per day.
 *   - Negative scores do not self-heal; factions with score ≤ 0 are untouched.
 *   - All other faction types are unaffected.
 *
 * Decay is applied via applyFactionDelta(-1), so FACTION_STANDING_CHANGED and
 * FACTION_TIER_CROSSED events are emitted automatically for each affected entry.
 *
 * Called from calendarEngine.runDayEndTick() as step 8g, after loan interest
 * (step 8f) and before NPC social tick (step 9).
 *
 * Only iterates over entries already present in state.factions (lazy-init means
 * absent entries are at defaultScore; criminal/underground factions typically
 * start negative, so they wouldn't decay until the player has earned positive
 * standing anyway).
 */
export function tickFactionDecay(
  state:   GameState,
  catalog: Record<string, FactionDef>,
): { state: GameState; events: GameEvent[] } {
  let currentState  = state;
  const allEvents: GameEvent[] = [];

  for (const factionId of Object.keys(currentState.factions)) {
    const entry = currentState.factions[factionId];
    if (entry === undefined) continue;

    // Only decay criminal and underground types with positive scores.
    const def = catalog[factionId];
    if (def === undefined) continue;  // unknown id — skip gracefully; log to be added in Phase 41d

    if (
      (def.type === 'criminal' || def.type === 'underground') &&
      entry.score > 0
    ) {
      const result = applyFactionDelta(currentState, factionId, -1, catalog);
      currentState  = result.state;
      allEvents.push(...result.events);
    }
  }

  return { state: currentState, events: allEvents };
}

// ─── Private helpers ──────────────────────────────────────────────────────────

/**
 * Looks up a FactionDef by id; throws a descriptive error when absent.
 * All public engine functions call this before operating on a faction id.
 */
function _requireDef(
  factionId: string,
  catalog:   Record<string, FactionDef>,
): FactionDef {
  const def = catalog[factionId];
  if (def === undefined) {
    throw new Error(
      `factionEngine: unknown faction id '${factionId}'. ` +
      `Ensure the entry is present in FACTION_CATALOG (src/data/factionCatalog.ts).`,
    );
  }
  return def;
}
