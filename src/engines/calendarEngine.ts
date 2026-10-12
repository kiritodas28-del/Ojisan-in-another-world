/**
 * calendarEngine.ts
 * Phase/day cycle, action counting, fatigue, and the day-end tick sequence.
 *
 * PRD §4.7 — Time & Day Cycle
 *
 * Phase order:  Morning → Afternoon → Evening → Night → Midnight
 * Phase limit:  15 actions → auto-advance to next phase
 * Direct-advance events: SLEEP, certain cutscenes — skip remaining actions immediately
 *
 * Fatigue penalty table (PRD §4.7):
 *   0–1 days  → no effect
 *   2 days    → -10% STR/AGI, -5 max Stamina
 *   3 days    → -25% STR/AGI, -15 max Stamina, -1 TEC
 *   4 days    → -50% all combat stats, encounter rolls disadvantaged
 *   5+        → forced collapse → last safe location; full restore; fatigue reset
 *
 * Day-end tick sequence (PRD §2.2 — executed at Midnight, in this order):
 *   1. Reputation decay                   (reputationEngine — Task 10.1)
 *   2. Pregnancy progression + births     (pregnancyEngine  — Task 10.9)
 *   3. NPC population refresh             (npcPopulationEngine.tickPopulationRefresh)
 *   4. Crafting job resolution            (craftingEngine   — Task 10.4)
 *   5. Construction timer decrement       (manorEngine      — Task 10.10)
 *   6. Manor passive generation           (manorEngine      — Task 10.10)
 *   7. Daily counter resets               (flirt/touch limits, quest cooldowns, faint recovery)
 *   8. Date increment
 *   9. NPC-NPC social tick                (npcSocialEngine.runNpcSocialTick)
 *
 * Actions that count toward phase advance (15 → next phase):
 *   Movement between nodes, combat rounds, dialogue trees, intimacy turns,
 *   item use, gifting, crafting start, building start.
 *   Fast-travel counts as 1 action per region boundary crossed.
 *
 * Direct-advance events (skip remaining actions; immediately advance phase):
 *   SLEEP, certain story cutscenes.
 */

import type {
  GameState, CalendarState, DayPhase, GameEvent,
  LocationPopulationDef, NpcScheduleDef,
} from '../state/gameState';
import {
  applyPhaseRecoveryToParty,
  applyFullRestoreToParty,
} from './partyEngine';
import { runNpcSocialTick } from './npcSocialEngine';
import { tickReputationDecay } from './reputationEngine';
import { tickPopulationRefresh } from './npcPopulationEngine';
import { resetDailySocialCounters } from './relationshipEngine';
import { tickQuestCooldowns } from './questEngine';
import { resolveCraftingJobs } from './craftingEngine';
import { checkConception, tickPregnancy } from './pregnancyEngine';
import { tickConstruction, generatePassiveResources } from './manorEngine';
import { saveGame, AUTOSAVE_SLOT } from './saveEngine';
import { advanceWeather, tickEquipmentDurability } from './environmentEngine';
import type { WeatherCatalogEntry } from './environmentEngine';
import { tickInfamyDecay } from './infamyEngine';
import { resetSynergyDailyCounts } from './synergyEngine';
import { resetCaptiveDailyInteractions } from './tamingEngine';
import { tickTithe } from './titheEngine';
import { applyMpRestOnSleep } from './statEngine';  // Phase 29c.2

// ─── Phase ordering ───────────────────────────────────────────────────────────

export const PHASE_ORDER: DayPhase[] = [
  'Morning',
  'Afternoon',
  'Evening',
  'Night',
  'Midnight',
];

export const PHASE_ACTION_LIMIT = 15;

// Passive Stamina/CPW recovery on phase advance (+20% of max, except sleep path)
export const PHASE_RECOVERY_RATE = 0.2;

// ─── Fainted-partner day-end recovery (day-end tick step 7) ──────────────────

/**
 * Resets intimacy-faint state for all living NPCs at day-end:
 *   • intimacyBlockedForDay → cleared (undefined)
 *   • intimacyLifeForce → restored to 100
 * Deceased NPCs (isDeceased) are skipped — they were already removed from
 * contacts[] by the dispatcher; this guard handles any dangling references.
 */
export function recoverFaintedPartners(gameState: GameState): GameState {
  return {
    ...gameState,
    contacts: gameState.contacts.map(record => {
      const npc = record.character;
      if (npc.isDeceased) return record;
      // Nothing to reset — skip to avoid creating a new object unnecessarily
      if (!npc.intimacyBlockedForDay && (npc.intimacyLifeForce ?? 100) >= 100) return record;
      return {
        ...record,
        character: {
          ...npc,
          intimacyBlockedForDay: undefined,
          intimacyLifeForce:     100,
        },
      };
    }),
  };
}

// ─── Task 8.2 — Action counter ───────────────────────────────────────────────

/**
 * Increments the action counter for the current phase.
 * Returns the updated CalendarState and a flag indicating whether the phase
 * limit has been reached (the dispatcher must call advancePhase() when true).
 *
 * The dispatcher is responsible for calling advancePhase(); this function
 * intentionally does not hold a GameState reference so it stays pure.
 */
export function incrementActionCount(
  calendar: CalendarState,
  count = 1,
): { calendar: CalendarState; phaseAdvanceTriggered: boolean } {
  const newCount = calendar.actionCount + count;
  return {
    calendar:              { ...calendar, actionCount: newCount },
    phaseAdvanceTriggered: newCount >= calendar.phaseActionLimit,
  };
}

// ─── Task 8.1 — Phase advance ────────────────────────────────────────────────

/**
 * Advances to the next phase in the PHASE_ORDER cycle.
 *   • Resets actionCount to 0.
 *   • Applies passive Stamina/CPW recovery to all party members (not on sleep path).
 *   • If advancing FROM Midnight: calls runDayEndTick() first, then rolls to Morning.
 *   • Emits PHASE_ADVANCED; emits DAY_STARTED if the new day begins.
 *
 * This is the standard phase advance (action-limit or manual advance-phase intent).
 * For SLEEP or cutscene skip, use directAdvancePhase() instead.
 */
export function advancePhase(
  gameState: GameState,
  locationDefs:  Record<string, LocationPopulationDef> = {},
  schedules:     Record<string, NpcScheduleDef>         = {},
): { state: GameState; events: GameEvent[] } {
  const { calendar } = gameState;
  const fromPhase = calendar.phase;
  const idx       = PHASE_ORDER.indexOf(fromPhase);
  const toPhase   = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
  const events: GameEvent[] = [];

  // If this is a Midnight → Morning transition, run the full day-end tick first
  let state = gameState;
  if (fromPhase === 'Midnight') {
    const dayEnd = runDayEndTick(state, locationDefs, schedules);
    state  = dayEnd.state;
    events.push(...dayEnd.events);
  }

  // Apply passive recovery on every advance (sleep path bypasses this)
  state = applyPhaseRecoveryToParty(state, PHASE_RECOVERY_RATE);

  // Update calendar
  const newDay = toPhase === 'Morning' ? state.calendar.day + 1 : state.calendar.day;
  state = {
    ...state,
    calendar: {
      ...state.calendar,
      phase:       toPhase,
      actionCount: 0,
      day:         newDay,
    },
  };

  events.push({ type: 'PHASE_ADVANCED', fromPhase, toPhase, day: newDay });
  if (toPhase === 'Morning') {
    events.push({ type: 'DAY_STARTED', day: newDay });
  }

  return { state, events };
}

// ─── Task 8.3 — Direct phase advance (sleep / cutscene) ──────────────────────

/**
 * Skips remaining phase actions and advances directly to the next phase.
 * Used by SLEEP (targetPhase = 'Morning') and cutscene triggers.
 *
 * Repeatedly calls advancePhase() until the target phase is reached.
 * Sleep callers should call resolveSleep() instead — it handles the
 * full restore and emits SLEPT before calling this.
 */
export function directAdvancePhase(
  gameState: GameState,
  targetPhase: DayPhase,
  locationDefs:  Record<string, LocationPopulationDef> = {},
  schedules:     Record<string, NpcScheduleDef>         = {},
): { state: GameState; events: GameEvent[] } {
  let state  = gameState;
  const events: GameEvent[] = [];

  // Guard against already being at the target phase
  if (state.calendar.phase === targetPhase) return { state, events };

  // Advance through phases one at a time until we hit the target
  let safetyCounter = 0;
  while (state.calendar.phase !== targetPhase) {
    if (safetyCounter++ > PHASE_ORDER.length + 1) {
      // Should never happen; bail to prevent infinite loop
      break;
    }
    const result = advancePhase(state, locationDefs, schedules);
    state = result.state;
    events.push(...result.events);
  }

  return { state, events };
}

// ─── Task 8.5 — Sleep mechanic ───────────────────────────────────────────────

/**
 * Resolves a SLEEP intent:
 *   1. Guards: player must be at Night or Midnight in a safe location.
 *   2. Applies full HP/Stamina/CPW restore + fatigue reset to all party members.
 *   3. Increments player fatigue counter on the calendar (reset to 0).
 *   4. Advances phase directly to Morning (triggering the day-end tick and
 *      any remaining intermediate phase-advances).
 *   5. Emits SLEPT.
 *
 * Returns { state, events, narrative } where narrative is an array of
 * template strings for the UI to display (content filled by dialogue engine later).
 */
export function resolveSleep(
  gameState: GameState,
  locationDefs:  Record<string, LocationPopulationDef> = {},
  schedules:     Record<string, NpcScheduleDef>         = {},
): { state: GameState; events: GameEvent[]; narrative: string[] } {
  const { calendar, world } = gameState;
  const events: GameEvent[]   = [];
  const narrative: string[]   = [];

  // Guard: sleep only at Night or Midnight
  if (calendar.phase !== 'Night' && calendar.phase !== 'Midnight') {
    narrative.push("You can't sleep now — it's not yet night.");
    return { state: gameState, events, narrative };
  }

  // Guard: sleep only in safe locations
  // worldEngine will supply isSafe at runtime; we check via tileMap.safetyTier here
  const safetyTier = world.tileMap?.safetyTier ?? 'UNSAFE';
  if (safetyTier !== 'SAFE') {
    narrative.push("This area isn't safe enough to rest.");
    return { state: gameState, events, narrative };
  }

  // Full restore for all party members; reset player fatigue
  let state = applyFullRestoreToParty(gameState);
  // Phase 29c.2: restore MP for player + all contacts on sleep
  const mpRest = applyMpRestOnSleep(state);
  state = mpRest.state;
  events.push(...mpRest.events);
  // applyFullRestoreToParty already zeros vitals.fatigue on all characters;
  // the player's own fatigue field on vitals is the authoritative value.

  events.push({ type: 'SLEPT', day: calendar.day, locationId: world.currentLocationId });
  narrative.push('You rest through the night. Your strength returns.');

  // Advance to Morning (will trigger day-end tick via Midnight → Morning path)
  const advance = directAdvancePhase(state, 'Morning', locationDefs, schedules);
  state = advance.state;
  events.push(...advance.events);

  return { state, events, narrative };
}

// ─── Task 8.4 — Fatigue penalty derivation ───────────────────────────────────

/**
 * Fatigue penalty table (PRD §4.7).
 * Returns stat multipliers and flat penalties for a given fatigue level.
 * Does NOT mutate gameState — callers pass these to combat/intimacy engines
 * to compute effective stats on-demand. We do not store "effective stats"
 * separately because they change with every sleep/wake cycle.
 *
 * fatigue 0–1: no penalties
 * fatigue 2:   -10% STR/AGI, -5 max Stamina
 * fatigue 3:   -25% STR/AGI, -15 max Stamina, -1 TEC
 * fatigue 4:   -50% all combat stats, encounter disadvantaged
 * fatigue 5+:  forced collapse (handled by checkFatigueCollapse)
 */
export interface FatiguePenalty {
  strMultiplier:   number;  // 0.0–1.0; multiply effective STR
  agiMultiplier:   number;
  wisMultiplier:   number;
  defMultiplier:   number;
  lckMultiplier:   number;
  maxStaminaPen:   number;  // flat reduction to max Stamina
  tecPenalty:      number;  // flat reduction to Technique (player only)
  encounterDisadv: boolean; // encounter rolls at disadvantage
}

export function deriveFatiguePenalty(fatigue: number): FatiguePenalty {
  if (fatigue <= 1) {
    return {
      strMultiplier: 1.0, agiMultiplier: 1.0, wisMultiplier: 1.0,
      defMultiplier: 1.0, lckMultiplier: 1.0,
      maxStaminaPen: 0, tecPenalty: 0, encounterDisadv: false,
    };
  }
  if (fatigue === 2) {
    return {
      strMultiplier: 0.9, agiMultiplier: 0.9, wisMultiplier: 1.0,
      defMultiplier: 1.0, lckMultiplier: 1.0,
      maxStaminaPen: 5, tecPenalty: 0, encounterDisadv: false,
    };
  }
  if (fatigue === 3) {
    return {
      strMultiplier: 0.75, agiMultiplier: 0.75, wisMultiplier: 1.0,
      defMultiplier: 1.0,  lckMultiplier: 1.0,
      maxStaminaPen: 15, tecPenalty: 1, encounterDisadv: false,
    };
  }
  if (fatigue === 4) {
    return {
      strMultiplier: 0.5, agiMultiplier: 0.5, wisMultiplier: 0.5,
      defMultiplier: 0.5, lckMultiplier: 0.5,
      maxStaminaPen: 0, tecPenalty: 0, encounterDisadv: true,
    };
  }
  // fatigue >= 5: collapse (checkFatigueCollapse handles this; return worst-case here)
  return {
    strMultiplier: 0.5, agiMultiplier: 0.5, wisMultiplier: 0.5,
    defMultiplier: 0.5, lckMultiplier: 0.5,
    maxStaminaPen: 0, tecPenalty: 0, encounterDisadv: true,
  };
}

/**
 * Applies effective fatigue-penalised stats to a stat block.
 * Used by combat/intimacy engines when reading player stats.
 * Returns a new CombatStats object — does not mutate the source.
 */
export function applyFatigueToCombatStats(
  stats: { str: number; agi: number; wis: number; def: number; lck: number },
  fatigue: number,
): { str: number; agi: number; wis: number; def: number; lck: number } {
  const p = deriveFatiguePenalty(fatigue);
  return {
    str: Math.floor(stats.str * p.strMultiplier),
    agi: Math.floor(stats.agi * p.agiMultiplier),
    wis: Math.floor(stats.wis * p.wisMultiplier),
    def: Math.floor(stats.def * p.defMultiplier),
    lck: Math.floor(stats.lck * p.lckMultiplier),
  };
}

// ─── Task 8.4 — Fatigue increment + collapse check ───────────────────────────

/**
 * Increments the player's fatigue counter by 1 at day-end.
 * If fatigue reaches 5+, triggers forced collapse:
 *   • Teleport player to lastSafeLocationId
 *   • Full restore via applyFullRestoreToParty()
 *   • fatigue reset to 0
 *   • Emit FATIGUE_COLLAPSE
 *
 * Called from runDayEndTick() step 8 (date increment block).
 */
function tickFatigueAndCheckCollapse(
  gameState: GameState,
  events: GameEvent[],
): GameState {
  // Increment fatigue on the player's vitals
  const newFatigue = (gameState.player.vitals.fatigue ?? 0) + 1;
  let state: GameState = {
    ...gameState,
    player: {
      ...gameState.player,
      vitals: {
        ...gameState.player.vitals,
        fatigue: newFatigue,
      },
    },
  };

  if (newFatigue >= 5) {
    // Forced collapse: full restore, teleport to last safe location
    state = applyFullRestoreToParty(state);
    // Keep currentNodeId + alias in sync; same for lastSafe pair.
    const safeId = state.world.lastSafeNodeId ?? state.world.lastSafeLocationId;
    state = {
      ...state,
      world: {
        ...state.world,
        currentNodeId:      safeId,
        currentLocationId:  safeId,
        // Reset tile map occupant positions to safe location spawn points
        occupantPositions: state.world.tileMap.spawnPoints ?? {},
      },
    };
    events.push({ type: 'FATIGUE_COLLAPSE', day: state.calendar.day });
  }

  return state;
}

// ─── Task 8.7 — Day-end tick ─────────────────────────────────────────────────

/**
 * Runs the full day-end tick sequence when Midnight → Morning transition occurs.
 * Called automatically by advancePhase() on the Midnight→Morning step.
 *
 * Steps that have live engines are wired; steps pending future engines are
 * documented stubs. All stubs are safe no-ops that pass state through unchanged.
 */
export function runDayEndTick(
  gameState: GameState,
  locationDefs:  Record<string, LocationPopulationDef> = {},
  schedules:     Record<string, NpcScheduleDef>         = {},
): { state: GameState; events: GameEvent[] } {
  let state = gameState;
  const events: GameEvent[] = [];

  // Step 0: Weather advancement (Task 24.21)
  // Advance weather for all regions before any other ticks. regionIds are
  // derived from the keys currently present in the reputation record; full
  // region catalog injection happens once worldGraph.WORLD_NODES is authored
  // (Task 17.DATA). weatherCatalog is empty until Task 24.37 authors it;
  // advanceWeather no-ops gracefully on an empty catalog.
  {
    const regionIds = Object.keys(state.reputation);
    const weatherResult = advanceWeather(
      state,
      regionIds as import('../state/gameState').RegionId[],
      [] as WeatherCatalogEntry[], // replaced with WEATHER_CATALOG after Task 24.37
      state.calendar.day,
    );
    state = weatherResult.state;
    events.push(...weatherResult.events);
  }

  // Step 1: Reputation decay (Task 10.13)
  // Negative scores decay toward 0 by 5 pts/day; positive scores do not decay.
  const repDecay = tickReputationDecay(state);
  state = repDecay.state;
  events.push(...repDecay.events);

  // Step 2: Pregnancy progression + birth checks (Task 18.9)
  // Phase A: run conception rolls for all NPCs flagged by a same-day creampie.
  // Phase B: tick all currently pregnant NPCs (newly conceived NPCs skip this
  //          tick because conceptionDay === calendar.day; see tickPregnancy guard).
  for (const record of state.contacts) {
    const npc = record.character;
    if (npc.pregnancyState?.pregnantFlaggedToday) {
      const result = checkConception(state, npc.npcId);
      state = result.state;
      events.push(...result.events);
    }
  }
  const pregnancyTickResult = tickPregnancy(state);
  state = pregnancyTickResult.state;
  events.push(...pregnancyTickResult.events);

  // Step 3: NPC population refresh (every 3rd day; npcPopulationEngine handles the guard)
  if (Object.keys(locationDefs).length > 0) {
    const refreshedContacts = tickPopulationRefresh(
      state.contacts,
      locationDefs,
      schedules,
      state.calendar,
      state.settings,
    );
    state = { ...state, contacts: refreshedContacts };
  }

  // Step 4: Crafting job resolution (Task 15.10)
  const craftResult = resolveCraftingJobs(state);
  state = craftResult.state;
  events.push(...craftResult.events);

  // Step 5: Construction timer decrement
  const constructResult = tickConstruction(state);
  state = constructResult.state;
  events.push(...constructResult.events);

  // Step 6: Manor passive generation (gold credited directly; items queued for collection)
  const passiveResult = generatePassiveResources(state);
  state = passiveResult.state;
  events.push(...passiveResult.events);

  // Step 7: Daily counter resets
  // 7a. Flirt/touch limits + faint recovery
  state = recoverFaintedPartners(state);
  state = resetDailySocialCounters(state);
  // 7b. Quest cooldown expiry — resets BOARD quests whose cooldown has elapsed to AVAILABLE
  const cooldownResult = tickQuestCooldowns(state);
  state = cooldownResult.state;
  events.push(...cooldownResult.events);
  // 7c. Synergy daily use count reset (Task 24.24)
  state = resetSynergyDailyCounts(state);
  // 7d. Captive daily interaction reset (Task 23.20)
  state = resetCaptiveDailyInteractions(state);

  // Step 8: Date increment + fatigue tick
  // Fatigue increments here; collapse (if fatigue >= 5) also fires here.
  // NOTE: advancePhase() increments calendar.day on the Midnight→Morning
  // transition AFTER runDayEndTick() returns. We increment fatigue here
  // (on the old day number) because it tracks "days without sleep" which
  // is a property of the ending day, not the new one.
  state = tickFatigueAndCheckCollapse(state, events);
  // Step 8b: Infamy passive decay (Task 24.23)
  // Infamy < OUTLAW threshold decays 2 points/day; OUTLAW+ is frozen.
  {
    const infamyDecay = tickInfamyDecay(state);
    state = infamyDecay.state;
    events.push(...infamyDecay.events);
  }
  // Step 8c: Equipment durability tick for active weather effects (Task 24.22)
  // No-op until weatherCatalog is authored (Task 24.37); gracefully handles
  // empty activeEffects array.
  {
    const durabilityResult = tickEquipmentDurability(state);
    state = durabilityResult.state;
    events.push(...durabilityResult.events);
  }
  // Step 8d: Tithe overdue check (Task 26.5)
  // No-op when tithe.quotaGoldPerWeek === 0 (system inactive).
  {
    const titheResult = tickTithe(state);
    state = titheResult.state;
    events.push(...titheResult.events);
  }

  // Step 9: NPC-NPC social tick
  const socialResult = runNpcSocialTick(state);
  state = socialResult.state;
  events.push(...socialResult.events);

  // Clear the interaction log after the tick resolves
  state = { ...state, npcInteractionLog: [] };

  // Step 10 (Task 22.11): Autosave at Midnight day-end
  // Runs after all tick mutations so the save reflects the fully-resolved state.
  // Autosave errors are caught and swallowed — a failed autosave should never
  // crash the game or block the Midnight→Morning transition.
  try {
    saveGame(state, AUTOSAVE_SLOT);
  } catch {
    // Autosave failure is non-fatal; the player can still use manual save slots.
  }

  return { state, events };
}
