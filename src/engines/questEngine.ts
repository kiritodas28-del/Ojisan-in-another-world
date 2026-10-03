/**
 * questEngine.ts
 * Quest acceptance, objective tracking, completion, failure, and reward granting.
 *
 * PRD §4.6 — Quests & Story
 *
 * Design principles:
 *   - All functions are pure transforms: (GameState, ...) → { state, events }.
 *   - The static QuestDef catalog (src/data/quests.ts) is the single source of
 *     truth for quest structure; QuestEntry in GameState.quests.entries is the
 *     runtime state.
 *   - gold and XP are written directly to player fields (Phase 12 / economyEngine
 *     not yet wired; swap addItem() in once economyEngine exists).
 *   - `flagsSet` from QuestReward is written to gameState.flags.
 *   - BOARD quests cycle COMPLETED → AVAILABLE after cooldownDays; MAIN/COMPANION
 *     stay COMPLETED permanently.
 *
 * Day-end wiring:
 *   tickQuestCooldowns() is called by calendarEngine.runDayEndTick() step 7b.
 *
 * Phase 11 — Tasks 11.6–11.13 + day-end cooldown tick
 */

import type { GameState, GameEvent, QuestEntry, QuestStatus } from '../state/gameState';
import {
  applyReputationEvent,
} from './reputationEngine';
import { addItem } from './economyEngine';
import type { RegionId } from '../state/gameState';
import { QUEST_CATALOG, type QuestDef, type QuestReward } from '../data/quests';
import { shiftAlignment } from './alignmentEngine';

// ─── 11.6 — Catalog lookup ────────────────────────────────────────────────────

/** Returns the static QuestDef for a given id. Throws on unknown id. */
export function loadQuestDef(id: string): QuestDef {
  const def = QUEST_CATALOG[id];
  if (!def) throw new Error(`questEngine: unknown quest id "${id}"`);
  return def;
}

// ─── Internal helper: find a quest entry by defId ────────────────────────────

function findEntry(gameState: GameState, defId: string): QuestEntry | undefined {
  return gameState.quests.entries.find(e => e.defId === defId);
}

function replaceEntry(gameState: GameState, updated: QuestEntry): GameState {
  return {
    ...gameState,
    quests: {
      entries: gameState.quests.entries.map(e =>
        e.defId === updated.defId ? updated : e,
      ),
    },
  };
}

// ─── 11.7 — Available quests ──────────────────────────────────────────────────

/**
 * Returns all QuestDefs that the player can currently accept:
 *   - MAIN / COMPANION: prerequisites all COMPLETED, not yet ACTIVE or COMPLETED.
 *   - BOARD: prerequisites met AND (no entry yet OR cooldown expired).
 *
 * This is a pure query; it does not mutate state.
 */
export function getAvailableQuests(gameState: GameState): QuestDef[] {
  const completedIds = new Set(
    gameState.quests.entries
      .filter(e => e.status === 'COMPLETED')
      .map(e => e.defId),
  );

  return Object.values(QUEST_CATALOG).filter(def => {
    // Prerequisites must all be completed
    if (!def.prerequisites.every(p => completedIds.has(p))) return false;

    const entry = findEntry(gameState, def.id);

    if (def.type === 'BOARD') {
      // No entry yet → available
      if (!entry) return true;
      // Cooldown expired → available again
      if (
        entry.status === 'COMPLETED' &&
        entry.cooldownExpiresOnDay !== undefined &&
        gameState.calendar.day >= entry.cooldownExpiresOnDay
      ) return true;
      // Failed BOARD quests reset immediately (no cooldown on failure)
      if (entry.status === 'FAILED') return true;
      return false;
    }

    // MAIN / COMPANION: available only if never started
    return entry === undefined;
  });
}

// ─── 11.8 — Accept quest ──────────────────────────────────────────────────────

/**
 * Creates an ACTIVE QuestEntry for the given quest.
 * Guards:
 *   - Quest must be in getAvailableQuests() (prerequisites + not already active).
 *   - Cannot accept an already-ACTIVE or non-BOARD COMPLETED quest.
 * Emits QUEST_ACCEPTED.
 */
export function acceptQuest(
  gameState: GameState,
  defId: string,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const def = loadQuestDef(defId);

  // Guard: must be available
  const available = getAvailableQuests(gameState).some(d => d.id === defId);
  if (!available) {
    return { state: gameState, events };
  }

  const existingEntry = findEntry(gameState, defId);
  const newEntry: QuestEntry = {
    defId,
    status:             'ACTIVE',
    objectiveProgress:  def.objectives.map(() => 0),
    activatedOnDay:     gameState.calendar.day,
    completedOnDay:     undefined,
    cooldownExpiresOnDay: undefined,
  };

  let state: GameState;
  if (existingEntry) {
    // BOARD re-accept: replace the existing entry
    state = replaceEntry(gameState, newEntry);
  } else {
    // First time: append
    state = {
      ...gameState,
      quests: { entries: [...gameState.quests.entries, newEntry] },
    };
  }

  events.push({ type: 'QUEST_ACCEPTED', defId });
  return { state, events };
}

// ─── 11.9 — Update objective ──────────────────────────────────────────────────

/**
 * Increments an objective's progress counter, clamped to [0, required].
 * No-ops if the quest is not ACTIVE or the index is out of range.
 * Calls checkQuestCompletion() after updating.
 * Emits QUEST_OBJECTIVE_UPDATED.
 */
export function updateObjective(
  gameState: GameState,
  defId: string,
  objectiveIndex: number,
  incrementBy: number,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const entry = findEntry(gameState, defId);
  if (!entry || entry.status !== 'ACTIVE') return { state: gameState, events };

  const def = loadQuestDef(defId);
  if (objectiveIndex < 0 || objectiveIndex >= def.objectives.length) {
    return { state: gameState, events };
  }

  const required  = def.objectives[objectiveIndex]!.count;
  const oldCount  = entry.objectiveProgress[objectiveIndex] ?? 0;
  const newCount  = Math.min(required, oldCount + incrementBy);
  if (newCount === oldCount) return { state: gameState, events }; // no change

  const updatedEntry: QuestEntry = {
    ...entry,
    objectiveProgress: entry.objectiveProgress.map((v, i) =>
      i === objectiveIndex ? newCount : v,
    ),
  };

  let state = replaceEntry(gameState, updatedEntry);
  events.push({ type: 'QUEST_OBJECTIVE_UPDATED', defId, objectiveIndex, newCount, required });

  // Check if this update completes the quest
  const completion = checkQuestCompletion(state, defId);
  state = completion.state;
  events.push(...completion.events);

  return { state, events };
}

// ─── 11.10 — Check quest completion ──────────────────────────────────────────

/**
 * Checks if all objectives are met for an ACTIVE quest.
 * If so: grants reward, marks COMPLETED, sets BOARD cooldown.
 * Emits QUEST_COMPLETED when triggered.
 * No-op if not all objectives are filled or quest is not ACTIVE.
 */
export function checkQuestCompletion(
  gameState: GameState,
  defId: string,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const entry = findEntry(gameState, defId);
  if (!entry || entry.status !== 'ACTIVE') return { state: gameState, events };

  const def = loadQuestDef(defId);

  // All objectives must be at their required count
  const allMet = def.objectives.every(
    (obj, i) => (entry.objectiveProgress[i] ?? 0) >= obj.count,
  );
  if (!allMet) return { state: gameState, events };

  // Grant reward first
  const rewardResult = grantQuestReward(gameState, def.reward, def.id);
  let state = rewardResult.state;
  events.push(...rewardResult.events);

  // Determine cooldown expiry for BOARD quests
  const cooldownExpiresOnDay =
    def.type === 'BOARD' && def.cooldownDays !== undefined
      ? state.calendar.day + def.cooldownDays
      : undefined;

  const completedEntry: QuestEntry = {
    ...entry,
    status:              'COMPLETED',
    completedOnDay:      state.calendar.day,
    cooldownExpiresOnDay,
  };
  state = replaceEntry(state, completedEntry);

  events.push({ type: 'QUEST_COMPLETED', defId, questType: def.type });
  return { state, events };
}

// ─── 11.11 — Grant quest reward ───────────────────────────────────────────────

/**
 * Applies a QuestReward to the current GameState:
 *   - gold: added directly to player.gold
 *   - xp: added directly to player.xp
 *   - items: TODO Phase 12 — swap for economyEngine.addItem() per entry
 *   - flagsSet: written to gameState.flags
 *   - reputationEvents: each key applied via applyReputationEvent() in current region
 *
 * Does not emit its own event (caller — checkQuestCompletion — emits QUEST_COMPLETED).
 */
export function grantQuestReward(
  gameState: GameState,
  reward: QuestReward,
  _defId: string, // retained for future achievement hooks
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  let state = gameState;

  // Gold + XP
  state = {
    ...state,
    player: {
      ...state.player,
      gold: state.player.gold + reward.gold,
      xp:   state.player.xp   + reward.xp,
    },
  };

  // Items — wire addItem() from economyEngine (Phase 12 closed)
  for (const itemId of reward.items ?? []) {
    const addResult = addItem(state, itemId, 1, 'REWARD');
    state = addResult.state;
    events.push(...addResult.events);
  }

  // Flags
  if (Object.keys(reward.flagsSet).length > 0) {
    state = {
      ...state,
      flags: { ...state.flags, ...reward.flagsSet },
    };
  }

  // Reputation events in current region
  const currentRegion = _resolveCurrentRegion(state);
  for (const eventKey of reward.reputationEvents) {
    if (currentRegion) {
      const repResult = applyReputationEvent(state, currentRegion, eventKey);
      state = repResult.state;
      events.push(...repResult.events);
    }
  }

  // Phase 23a (task 23a.11): alignment shift from quest rewards.
  // When flagsSet contains an alignment marker key, apply the corresponding
  // delta.  Quest catalog authors write the delta in flagsSet as a number;
  // marker keys: 'alignment_purifier' (+10), 'alignment_sovereign' (-10),
  // 'alignment_pragmatist' (0 — no-op but counted for achievements).
  const ALIGNMENT_FLAG_DELTAS: Record<string, number> = {
    alignment_purifier:   +10,
    alignment_pragmatist:   0,
    alignment_sovereign:  -10,
  };
  for (const [flagKey, delta] of Object.entries(ALIGNMENT_FLAG_DELTAS)) {
    if (Object.prototype.hasOwnProperty.call(reward.flagsSet, flagKey)) {
      if (delta !== 0) {
        const alignResult = shiftAlignment(state, delta);
        state = alignResult.state;
        events.push(...alignResult.events);
      }
      // delta === 0 (Pragmatist): shiftAlignment still needed to increment
      // the counter.  Call with 0 so the achievement counter increments.
      else {
        const alignResult = shiftAlignment(state, 0);
        state = alignResult.state;
        events.push(...alignResult.events);
      }
      break; // only one alignment flag per reward
    }
  }

  return { state, events };
}

// ─── 11.12 — Fail quest ───────────────────────────────────────────────────────

/**
 * Marks a quest as FAILED.
 *   - BOARD quests: reset to AVAILABLE immediately (no cooldown on failure).
 *   - MAIN/COMPANION quests: stay FAILED permanently (no automatic reset).
 * No-op if quest is not ACTIVE.
 * Emits QUEST_FAILED.
 */
export function failQuest(
  gameState: GameState,
  defId: string,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const entry = findEntry(gameState, defId);
  if (!entry || entry.status !== 'ACTIVE') return { state: gameState, events };

  const def = loadQuestDef(defId);

  // BOARD: reset to AVAILABLE (no cooldown set; getAvailableQuests re-shows it)
  const failedEntry: QuestEntry = {
    ...entry,
    status:              def.type === 'BOARD' ? 'AVAILABLE' : 'FAILED',
    cooldownExpiresOnDay: undefined,
  };

  const state = replaceEntry(gameState, failedEntry);
  events.push({ type: 'QUEST_FAILED', defId, questType: def.type });
  return { state, events };
}

// ─── 11.13 — Filter by status ─────────────────────────────────────────────────

/** Pure helper: returns all QuestEntries with the given status. */
export function getQuestsByStatus(
  gameState: GameState,
  status: QuestStatus,
): QuestEntry[] {
  return gameState.quests.entries.filter(e => e.status === status);
}

// ─── Day-end: cooldown tick ────────────────────────────────────────────────────

/**
 * Called by calendarEngine.runDayEndTick() step 7b.
 * Resets BOARD quests whose cooldown has expired back to AVAILABLE so they
 * appear in getAvailableQuests() on the new day.
 *
 * Note: this function runs on the OLD day (before calendar.day increments),
 * so we compare against calendar.day (not day+1). A quest with
 * cooldownExpiresOnDay === calendar.day becomes available at the START of
 * the next Morning (after the Midnight → Morning transition).
 */
export function tickQuestCooldowns(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const today = gameState.calendar.day;
  let changed = false;

  const entries = gameState.quests.entries.map(entry => {
    if (
      entry.status === 'COMPLETED' &&
      entry.cooldownExpiresOnDay !== undefined &&
      today >= entry.cooldownExpiresOnDay
    ) {
      changed = true;
      // Reset to AVAILABLE; clear cooldown so getAvailableQuests picks it up
      return {
        ...entry,
        status:               'AVAILABLE' as const,
        cooldownExpiresOnDay: undefined,
      };
    }
    return entry;
  });

  if (!changed) return { state: gameState, events };
  return { state: { ...gameState, quests: { entries } }, events };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

// Mirrors _resolveCurrentRegion() in dispatcher.ts — kept local to avoid a
// circular import. Both read the same world state heuristic until Phase 17 wires
// worldEngine with a proper region lookup.
function _resolveCurrentRegion(state: GameState): RegionId | null {
  const locationId = state.world.currentLocationId;
  if (!locationId) return null;
  if (Object.prototype.hasOwnProperty.call(state.reputation, locationId)) {
    return locationId as RegionId;
  }
  const parts = locationId.split('_');
  for (let i = parts.length - 1; i >= 1; i--) {
    const candidate = parts.slice(0, i).join('_');
    if (Object.prototype.hasOwnProperty.call(state.reputation, candidate)) {
      return candidate as RegionId;
    }
  }
  return null;
}

// ─── isCompanionSqComplete (Phase 28 — 28e.1) ────────────────────────────────

/**
 * Returns true when the NPC's companion side-quest chain is complete (or when
 * the NPC has no authored quest chain at all — generic NPCs with no dialogue
 * tree have no completion requirement and are therefore always eligible).
 *
 * Completion is recorded by the dispatcher as gameState.flags['sq_complete_<npcId>']
 * at the point the final SQ node resolves. This helper is the single authoritative
 * read site so the intimacy gate never needs to inspect the quest log directly.
 *
 * Lazy-requires DIALOGUE_TREES to avoid a circular import with dialogueEngine.
 * The import is cached by the Node module system after the first call.
 */
export function isCompanionSqComplete(gameState: GameState, npcId: string): boolean {
  // If the completion flag is already set, short-circuit immediately.
  const flagKey = `sq_complete_${npcId}`;
  if (gameState.flags[flagKey] === true) return true;

  // Generic NPCs with no authored dialogue tree have no SQ chain to complete.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DIALOGUE_TREES } = require('../data/dialogueTrees') as {
    DIALOGUE_TREES: Record<string, unknown>;
  };
  const hasTree = Object.prototype.hasOwnProperty.call(DIALOGUE_TREES, npcId);
  if (!hasTree) return true;  // no authored SQ → no gate

  return false;
}
