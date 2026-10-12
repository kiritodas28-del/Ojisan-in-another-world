/**
 * characterCreationEngine.ts  — Phase 24
 * Generic character creation + new-game initialisation pipeline.
 *
 * Responsibilities:
 *  1. Validate CharacterCreationOptions (name, subClass, trait, job, class, stats).
 *  2. Apply sub-class stat bonuses and passive perk flags to the player.
 *  3. Equip the chosen starting job and class via jobEngine.
 *  4. Allocate free attribute points from options.allocatedStats.
 *  5. Emit NEW_GAME_STARTED + CHARACTER_CREATION_COMPLETE events.
 *  6. Snapshot CharacterCreationOptions onto GameState.characterCreation.
 *
 * Catalog interfaces:
 *  SubClassDef and TraitDef live in src/data/characterCreationCatalog.ts.
 *  This engine is catalog-agnostic: it receives the relevant defs as arguments.
 *
 * Integration:
 *  The dispatcher wires NEW_GAME intent → createCharacter().
 *  Task 3c.4 (new-game init) calls this after spawnLocationPopulation() and
 *  simulateWorldHistory() have seeded the world.
 */

import type {
  GameState, GameEvent, CharacterCreationOptions,
} from '../state/gameState';
import { equipJob, equipClass, type JobDef, type ClassDef } from './jobEngine';
import { deriveMaxMp } from './statEngine'; // Phase 29c.3

// ─── Catalog interfaces ───────────────────────────────────────────────────────
export interface SubClassDef {
  id:           string;
  name:         string;
  // Flat stat bonuses applied to the player during creation.
  statBonuses:  Record<string, number>;   // e.g. { str: 2, end: 2 }
  // Flag id set on player.flags when this sub-class is chosen.
  // Used by skillEngine to gate sub-class-specific passives.
  perkFlagId:   string;
}

export interface TraitDef {
  id:          string;
  name:        string;
  // Flag id set on player.flags when this trait is chosen.
  traitFlagId: string;
  // Optional flat effect (e.g. { AETHER_COST_REDUCTION: 10 }).
  // Resolved by the calling system (combat, economy, etc.) via flags lookup.
  effectTag?:  string;
}

// ─── Tuning ───────────────────────────────────────────────────────────────────
// Number of free attribute points distributed at character creation.
const FREE_ATTRIBUTE_POINTS = 10;
// Base value for each stat before bonuses and allocations.
const BASE_STAT_VALUE = 10;

// ─── Main: createCharacter ────────────────────────────────────────────────────
/**
 * Apply all character creation choices to an existing (bare) GameState.
 * The bare state is produced by the new-game init sequence before this is called.
 * Returns the fully configured state + creation events.
 */
export function createCharacter(
  state:      GameState,
  options:    CharacterCreationOptions,
  subClassDef: SubClassDef,
  traitDef:   TraitDef,
  jobDef:     JobDef,
  classDef:   ClassDef,
): { state: GameState; events: GameEvent[] } {
  _validateOptions(options, subClassDef, traitDef, jobDef, classDef);

  const events: GameEvent[] = [];

  // ── 1. Set player name ────────────────────────────────────────────────────
  state = { ...state, player: { ...state.player, name: options.playerName } };

  // ── 2. Apply base stats (BASE_STAT_VALUE + allocations + sub-class bonuses)
  const mergedStats = _buildStats(options.allocatedStats, subClassDef.statBonuses);
  state = { ...state, player: { ...state.player, stats: { ...state.player.stats, ...mergedStats } } };

  // ── 3. Apply sub-class perk flag
  state = {
    ...state,
    player: {
      ...state.player,
      // Vitals HP/STA max scale with END; this is a placeholder — full formula
      // lives in deriveCompanionStats / statScaling functions (Phase 3b.8).
      // Minimum viable: store the flag so passive skill resolution picks it up.
    },
    flags: { ...state.flags, [subClassDef.perkFlagId]: true },
  };

  // ── 4. Apply secondary trait flag
  state = { ...state, flags: { ...state.flags, [traitDef.traitFlagId]: true } };
  if (traitDef.effectTag) {
    state = { ...state, flags: { ...state.flags, [`trait_effect_${traitDef.effectTag}`]: true } };
  }

  // ── 5. Equip starting job
  const jobResult = equipJob(state, jobDef);
  state  = jobResult.state;
  events.push(...jobResult.events);

  // ── 6. Equip starting class
  const classResult = equipClass(state, classDef.id);
  state  = classResult.state;
  events.push(...classResult.events);

  // ── 7. Snapshot options onto GameState
  state = { ...state, characterCreation: options };

  // ── 8. Phase 29c.3: seed starting MP, mpBurnout, anomalousMp on the player
  // Race is set by the new-game init flow before createCharacter() is called.
  // anomalousMp = true for the protagonist (Earth-origin, unattuned MP).
  const startRace   = state.player.race as string;
  const startMpMax  = deriveMaxMp(startRace, 1, 0);
  state = {
    ...state,
    player: {
      ...state.player,
      mpBurnout:  0,
      anomalousMp: true,
      vitals: {
        ...state.player.vitals,
        mp: { current: startMpMax, max: startMpMax },
      },
    },
  };

  // ── 9. Emit creation events
  events.push({ type: 'NEW_GAME_STARTED', options });
  events.push({ type: 'CHARACTER_CREATION_COMPLETE', playerName: options.playerName });

  return { state, events };
}

// ─── Validate free attribute point allocation ─────────────────────────────────
/**
 * Returns true if allocatedStats is a legal distribution of FREE_ATTRIBUTE_POINTS.
 * Each stat key must exist in the game's stat schema; total must equal free points.
 */
export function validateStatAllocation(
  allocatedStats: Record<string, number>,
  validStatKeys:  string[],
): { valid: boolean; error: string | undefined } {
  const total = Object.values(allocatedStats).reduce((s, v) => s + v, 0);
  if (total !== FREE_ATTRIBUTE_POINTS) {
    return { valid: false, error: `Must allocate exactly ${FREE_ATTRIBUTE_POINTS} points (got ${total}).` };
  }
  for (const key of Object.keys(allocatedStats)) {
    if (!validStatKeys.includes(key)) {
      return { valid: false, error: `Unknown stat key "${key}".` };
    }
    if (allocatedStats[key] < 0) {
      return { valid: false, error: `Stat "${key}" cannot have a negative allocation.` };
    }
  }
  return { valid: true, error: undefined };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────
function _buildStats(
  allocations: Record<string, number>,
  subClassBonuses: Record<string, number>,
): Record<string, number> {
  // CombatStats has str/agi/wis/def/lck; the 7-stat lore model maps onto these
  // via the game catalog.  This generic engine just applies the numbers.
  const result: Record<string, number> = {};
  const allKeys = new Set([...Object.keys(allocations), ...Object.keys(subClassBonuses)]);
  for (const key of allKeys) {
    result[key] = BASE_STAT_VALUE + (allocations[key] ?? 0) + (subClassBonuses[key] ?? 0);
  }
  return result;
}

function _validateOptions(
  options:    CharacterCreationOptions,
  subClassDef: SubClassDef,
  traitDef:   TraitDef,
  jobDef:     JobDef,
  classDef:   ClassDef,
): void {
  if (!options.playerName.trim()) throw new Error('Player name cannot be empty.');
  if (options.subClassId  !== subClassDef.id)  throw new Error(`SubClass id mismatch: "${options.subClassId}" vs "${subClassDef.id}".`);
  if (options.secondaryTrait !== traitDef.id)  throw new Error(`Trait id mismatch.`);
  if (options.jobId       !== jobDef.id)        throw new Error(`Job id mismatch.`);
  if (options.classId     !== classDef.id)      throw new Error(`Class id mismatch.`);
}
