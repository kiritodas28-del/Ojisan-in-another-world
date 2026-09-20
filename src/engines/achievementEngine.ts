/**
 * achievementEngine.ts
 * Achievement condition evaluation and reward granting (Phase 20).
 *
 * Design:
 *   - AchievementDef is owned here (engine type); the data catalog in
 *     src/data/achievements.ts imports this type and exports ACHIEVEMENT_CATALOG.
 *   - AchievementEntry (runtime state) is owned by gameState.ts.
 *   - GameState.achievements holds only UNLOCKED entries; LOCKED = absent.
 *   - Achievement counters use flags['ach_counter_<counterId>'] as the backing store
 *     so they survive save/load without a separate schema field.
 *   - Title tokens are written to flags['earned_title_<defId>'] for use by the UI.
 *
 * Condition types:
 *   EVENT         -- fires when a specific GameEvent.type appears in the batch.
 *                    Evaluated by checkAchievements() receiving the last event
 *                    in the batch as triggerEvent; not re-evaluated by evaluateAchievementCondition().
 *   FLAG          -- checks flags[flagId] === value (boolean / number / string).
 *   STAT_THRESHOLD -- checks a named player stat >= threshold.
 *   COUNT         -- checks flags['ach_counter_<counterId>'] >= threshold.
 *   COMPOUND      -- all sub-conditions must be true (AND semantics only).
 *
 * Dispatcher hook (task 20.11):
 *   processEventQueue() calls checkAchievements(state, events) once after the
 *   full event loop. EVENT-type achievements match against any event in the batch.
 */

import type { GameState, GameEvent, AchievementEntry } from '../state/gameState';
import { ACHIEVEMENT_CATALOG } from '../data/achievements';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export type AchievementTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

// ─── Condition union ──────────────────────────────────────────────────────────
// Each AchievementDef carries one condition that must be satisfied to unlock.
// COMPOUND wraps multiple conditions so complex multi-requirement achievements
// can be expressed without a separate condition type for every combination.
export type AchievementCondition =
  // Fires when a specific event type appears in the current resolved batch.
  // Evaluated at event-time; evaluateAchievementCondition() always returns false for EVENT.
  | { type: 'EVENT';           eventType: string }
  // Checks gameState.flags[flagId] === value.
  | { type: 'FLAG';            flagId: string; value: boolean | number | string }
  // Checks a named player stat field >= threshold.
  // Supported stat names: 'level', 'technique', 'virility', 'sensitivity', 'gold',
  // 'battlePoints', 'ardorPoints', plus any key on player.stats (str/agi/wis/def/lck).
  | { type: 'STAT_THRESHOLD';  stat: string; threshold: number }
  // Checks flags['ach_counter_<counterId>'] >= threshold.
  // Counters are incremented by incrementAchievementCounter() in the dispatcher.
  | { type: 'COUNT';           counterId: string; threshold: number }
  // All sub-conditions must evaluate to true (AND).
  | { type: 'COMPOUND';        all: AchievementCondition[] };

// ─── Achievement definition ───────────────────────────────────────────────────
// Static record in ACHIEVEMENT_CATALOG. Never mutated at runtime.
export interface AchievementDef {
  id:          string;
  tier:        AchievementTier;
  title:       string;        // display name shown in AchievementsView
  description: string;        // flavour text / unlock condition description
  condition:   AchievementCondition;
  reward: {
    ap?:         number;  // ardor points granted on unlock
    bp?:         number;  // battle points granted on unlock
    titleToken?: string;  // written to flags['earned_title_<defId>'] for UI use
  };
}

// ─── Engine result type ───────────────────────────────────────────────────────
interface AchievementResult {
  state:  GameState;
  events: GameEvent[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// CATALOG LOOKUP
// ═══════════════════════════════════════════════════════════════════════════════

/** Pure catalog lookup. Throws on unknown id so callers surface missing data early. */
export function getAchievementDef(id: string): AchievementDef {
  const def = ACHIEVEMENT_CATALOG[id];
  if (!def) throw new Error(`[achievementEngine] Unknown achievement id: "${id}"`);
  return def;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONDITION EVALUATOR
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Pure function. Evaluates a single condition against current game state.
 *
 * EVENT conditions always return false here — they are handled by checkAchievements()
 * comparing condition.eventType against the resolved event batch. This keeps the
 * evaluator stateless and avoids threading the event list into every recursive call.
 */
export function evaluateAchievementCondition(
  gameState: GameState,
  condition: AchievementCondition,
): boolean {
  switch (condition.type) {

    case 'EVENT':
      // EVENT conditions are only matched at event-time by checkAchievements().
      // Calling this function directly always returns false for EVENT.
      return false;

    case 'FLAG': {
      const val = gameState.flags[condition.flagId];
      return val === condition.value;
    }

    case 'STAT_THRESHOLD': {
      // Resolve the named stat from player progression fields or player.stats block.
      const p = gameState.player;
      const statMap: Record<string, number | undefined> = {
        level:        p.level,
        technique:    p.technique,
        virility:     p.virility,
        sensitivity:  p.sensitivity,
        gold:         p.gold,
        battlePoints: p.battlePoints,
        ardorPoints:  p.ardorPoints,
        str:          p.stats.str,
        agi:          p.stats.agi,
        wis:          p.stats.wis,
        def:          p.stats.def,
        lck:          p.stats.lck,
      };
      const value = statMap[condition.stat] ?? 0;
      return value >= condition.threshold;
    }

    case 'COUNT': {
      // Counter stored as flags['ach_counter_<counterId>'].
      // Absent key = 0; non-numeric value treated as 0.
      const key   = `ach_counter_${condition.counterId}`;
      const count = (gameState.flags[key] as number | undefined) ?? 0;
      return count >= condition.threshold;
    }

    case 'COMPOUND':
      // All sub-conditions must be true (AND semantics).
      return condition.all.every(sub => evaluateAchievementCondition(gameState, sub));

    default:
      // Exhaustiveness guard — TypeScript will catch unhandled variants at compile time.
      return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GRANT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Marks an achievement as UNLOCKED and applies its reward.
 * Immutable — returns a new GameState.
 *
 * Reward side effects:
 *   ap         -> player.unspentAP += reward.ap
 *   bp         -> player.unspentBP += reward.bp
 *   titleToken -> flags['earned_title_<defId>'] = titleToken
 *
 * Emits ACHIEVEMENT_UNLOCKED with tier + reward payload so the UI can render
 * a pop-up without a second catalog lookup.
 */
export function grantAchievement(
  gameState: GameState,
  defId: string,
): AchievementResult {
  const def = getAchievementDef(defId);

  // Guard: already unlocked (idempotent — double-grant is a no-op).
  if (gameState.achievements.some(e => e.defId === defId)) {
    return { state: gameState, events: [] };
  }

  // Build new entry.
  const entry: AchievementEntry = {
    defId,
    unlockedOnDay: gameState.calendar.day,
  };

  // Apply AP / BP rewards.
  const apGain = def.reward.ap ?? 0;
  const bpGain = def.reward.bp ?? 0;

  // Apply title token to flags.
  const flagPatch: Record<string, boolean | number | string> = {};
  if (def.reward.titleToken) {
    flagPatch[`earned_title_${defId}`] = def.reward.titleToken;
  }

  const newState: GameState = {
    ...gameState,
    achievements: [...gameState.achievements, entry],
    player: {
      ...gameState.player,
      unspentAP: gameState.player.unspentAP + apGain,
      unspentBP: gameState.player.unspentBP + bpGain,
    },
    flags: { ...gameState.flags, ...flagPatch },
  };

  const event: GameEvent = {
    type:   'ACHIEVEMENT_UNLOCKED',
    defId,
    tier:   def.tier,
    reward: def.reward,
  };

  return { state: newState, events: [event] };
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHECK (main dispatcher hook)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Evaluates all achievements in the catalog that the player has not yet unlocked.
 * Called once at the end of processEventQueue() after all event side effects resolve.
 *
 * @param gameState  Current state (post all event processing for this tick).
 * @param batch      All events emitted during this intent resolution.
 *                   Used to match EVENT-type achievement conditions.
 *
 * Multiple achievements may unlock in a single call (e.g. a kill that pushes
 * both a COUNT counter and a FLAG simultaneously). All are applied in catalog order.
 */
export function checkAchievements(
  gameState: GameState,
  batch: GameEvent[],
): AchievementResult {
  // Build a set of event types present in this batch for O(1) EVENT lookups.
  const eventTypesInBatch = new Set(batch.map(e => e.type));

  // Track already-unlocked ids so we don't re-grant within the same call.
  const alreadyUnlocked = new Set(gameState.achievements.map(e => e.defId));

  let state  = gameState;
  const events: GameEvent[] = [];

  for (const [id, def] of Object.entries(ACHIEVEMENT_CATALOG)) {
    if (alreadyUnlocked.has(id)) continue;

    const condition = def.condition;
    let satisfied: boolean;

    if (condition.type === 'EVENT') {
      // EVENT: satisfied if the event type appears anywhere in this batch.
      satisfied = eventTypesInBatch.has(condition.eventType);
    } else {
      satisfied = evaluateAchievementCondition(state, condition);
    }

    if (satisfied) {
      const result = grantAchievement(state, id);
      state  = result.state;
      events.push(...result.events);
      // Keep the local set in sync so COMPOUND chains that depend on a freshly
      // written flag can't double-grant within the same checkAchievements call.
      alreadyUnlocked.add(id);
    }
  }

  return { state, events };
}

// ═══════════════════════════════════════════════════════════════════════════════
// COUNTER HELPER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Increments flags['ach_counter_<counterId>'] by 1 and then runs a full
 * checkAchievements() pass so any newly-satisfied COUNT achievements unlock
 * immediately. Used by the dispatcher for countable events (kills, scenes, etc.).
 *
 * Returns the updated state + any ACHIEVEMENT_UNLOCKED events emitted.
 */
export function incrementAchievementCounter(
  gameState: GameState,
  counterId: string,
): AchievementResult {
  const key     = `ach_counter_${counterId}`;
  const current = (gameState.flags[key] as number | undefined) ?? 0;

  const stateWithCounter: GameState = {
    ...gameState,
    flags: { ...gameState.flags, [key]: current + 1 },
  };

  // Run a check pass after bumping the counter so thresholds trigger immediately.
  // Pass an empty batch since this is a counter-driven check, not an event-driven one.
  return checkAchievements(stateWithCounter, []);
}

// ═══════════════════════════════════════════════════════════════════════════════
// READ HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/** Returns all unlocked achievement entries in unlock order. */
export function getUnlockedAchievements(gameState: GameState): AchievementEntry[] {
  return gameState.achievements;
}

/** Returns true if a specific achievement has been unlocked. */
export function hasAchievement(gameState: GameState, defId: string): boolean {
  return gameState.achievements.some(e => e.defId === defId);
}
