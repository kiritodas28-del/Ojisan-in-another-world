/**
 * saveEngine.ts
 * Save/load engine: serialization, persistence, migration, and New Game+ logic.
 *
 * PRD §4.18  |  Phase 22 (Tasks 22.1–22.13)
 *
 * Slot layout:
 *   0–9   manual save slots
 *   99    autosave (written at every Midnight day-end tick; cannot be manually deleted)
 *
 * File layout per slot:
 *   saves/slot_<N>.json       full serialized GameState envelope
 *   saves/slot_<N>.meta.json  lightweight metadata for Continue / Load screens
 *
 * Save envelope:
 *   { schemaVersion, savedAt, gameState }
 *   schemaVersion lives in the envelope, NOT inside GameState, so migration can
 *   inspect and transform GameState before it ever touches engine code.
 *
 * Set<T> note (Task 22.2 / 22.3):
 *   Phase 1 (Task 1.11) already converted all Set<Kink> / Set<OrgasmType> fields to
 *   plain arrays.  No custom replacer/reviver logic is needed for those fields today.
 *   The replacer/reviver are kept as future extension points for any new complex types.
 *
 * New Game+ (Tasks 22.12–22.13):
 *   - Only available when flags['game_cleared'] === true.
 *   - Resets: world, quests, calendar, contacts, reputation, manor, craftingQueue.
 *   - Preserves: player.level, player.unlockedSkillIds, 50% gold carry-over, achievements.
 *   - Emits no events — caller gets a clean-slate GameState ready for day 1.
 */

import type { GameState, RegionId } from '../state/gameState';
import * as fs from 'fs';
import * as path from 'path';

// ─── Constants ────────────────────────────────────────────────────────────────

/** Current schema version.  Bump when any breaking GameState field changes. */
export const SAVE_SCHEMA_VERSION = 1;

/** Slots 0-9 are manual; slot 99 is the autosave slot. */
export const AUTOSAVE_SLOT = 99;

export const SAVES_DIR = path.resolve(__dirname, '../../saves');

// ─── Save envelope ────────────────────────────────────────────────────────────

interface SaveEnvelope {
  schemaVersion: number;
  savedAt:       number;    // Date.now() at time of save
  gameState:     GameState;
}

// ─── Save metadata ────────────────────────────────────────────────────────────

/** Lightweight metadata written alongside every save for UI display. */
export interface SaveMeta {
  slot:        number;
  savedAt:     number;   // Unix timestamp ms
  day:         number;
  phase:       string;   // DayPhase label
  location:    string;   // currentLocationId display label
  playerLevel: number;
  isAutosave:  boolean;
}

// ─── Task 22.2 — JSON replacer (future hook) ──────────────────────────────────
// Set<T> fields were already converted to T[] in Phase 1 (Task 1.11).
// This replacer is a no-op today but kept as the canonical extension point
// for any new complex types added after schema v1.
export function gameStateReplacer(_key: string, value: unknown): unknown {
  // Future: add complex-type serialization here (e.g. Map, BigInt).
  return value;
}

// ─── Task 22.3 — JSON reviver (future hook) ───────────────────────────────────
// Symmetric with the replacer.  No fields currently need post-parse hydration.
export function gameStateReviver(_key: string, value: unknown): unknown {
  // Future: add complex-type deserialization here.
  return value;
}

// ─── Task 22.4 — Serialize ────────────────────────────────────────────────────

/**
 * Serializes the current GameState into the save envelope string.
 * Output format: JSON with 2-space indentation for human readability.
 */
export function serializeGameState(gameState: GameState): string {
  const envelope: SaveEnvelope = {
    schemaVersion: SAVE_SCHEMA_VERSION,
    savedAt:       Date.now(),
    gameState,
  };
  return JSON.stringify(envelope, gameStateReplacer, 2);
}

// ─── Task 22.5 — Deserialize ─────────────────────────────────────────────────

/**
 * Parses a raw save string back into a GameState.
 * Runs migration if the envelope's schemaVersion doesn't match the current one.
 * Throws a descriptive error on malformed input or unresolvable schema mismatch.
 */
export function deserializeGameState(raw: string): GameState {
  let envelope: SaveEnvelope;
  try {
    envelope = JSON.parse(raw, gameStateReviver) as SaveEnvelope;
  } catch {
    throw new Error('Save file is corrupted or not valid JSON.');
  }

  // Validate envelope shape
  if (typeof envelope.schemaVersion !== 'number') {
    throw new Error('Save file is missing schemaVersion.');
  }
  if (!envelope.gameState) {
    throw new Error('Save file is missing gameState.');
  }

  // Run migration when schema version doesn't match (Task 22.10)
  let gs = envelope.gameState;
  if (envelope.schemaVersion !== SAVE_SCHEMA_VERSION) {
    gs = migrateSave(gs, envelope.schemaVersion);
  }

  // Validate top-level required fields
  const required: (keyof GameState)[] = [
    'player', 'party', 'contacts', 'world', 'calendar',
    'quests', 'reputation', 'manor', 'craftingQueue',
    'achievements', 'flags', 'settings',
  ];
  for (const field of required) {
    if (gs[field] === undefined || gs[field] === null) {
      throw new Error(`Save file is missing required field: ${field}`);
    }
  }

  return gs;
}

// ─── Task 22.6 — Save game ────────────────────────────────────────────────────

/**
 * Persists a GameState to the given slot number.
 * Atomic write: data → .tmp file, then rename to final path.
 * On success, writes a companion .meta.json for quick UI display.
 *
 * Slot range: 0–9 (manual) + 99 (autosave).
 */
export function saveGame(gameState: GameState, slot: number): void {
  _ensureSavesDirExists();

  const slotPath = _slotPath(slot);
  const tmpPath  = slotPath + '.tmp';
  const metaPath = _metaPath(slot);

  const serialized = serializeGameState(gameState);

  // Atomic write: write to tmp then rename (prevents corruption on failure)
  fs.writeFileSync(tmpPath, serialized, { encoding: 'utf-8' });
  fs.renameSync(tmpPath, slotPath);

  // Write lightweight metadata for the UI
  const meta: SaveMeta = {
    slot,
    savedAt:     Date.now(),
    day:         gameState.calendar.day,
    phase:       gameState.calendar.phase,
    location:    gameState.world.currentLocationId,
    playerLevel: gameState.player.level,
    isAutosave:  slot === AUTOSAVE_SLOT,
  };
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), { encoding: 'utf-8' });
}

// ─── Task 22.7 — Load game ────────────────────────────────────────────────────

/**
 * Reads and deserializes a save from the given slot.
 * Throws if the slot file doesn't exist or fails validation.
 */
export function loadGame(slot: number): GameState {
  const slotPath = _slotPath(slot);

  if (!fs.existsSync(slotPath)) {
    throw new Error(`No save file found in slot ${slot}.`);
  }

  const raw = fs.readFileSync(slotPath, { encoding: 'utf-8' });
  return deserializeGameState(raw);
}

// ─── Task 22.8 — List saves ───────────────────────────────────────────────────

/**
 * Reads all .meta.json files in the saves directory.
 * Returns an array of SaveMeta objects sorted by savedAt descending (newest first).
 * Returns an empty array when the saves directory doesn't exist.
 */
export function listSaves(): SaveMeta[] {
  if (!fs.existsSync(SAVES_DIR)) return [];

  const entries = fs.readdirSync(SAVES_DIR);
  const metas: SaveMeta[] = [];

  for (const entry of entries) {
    if (!entry.endsWith('.meta.json')) continue;
    const full = path.join(SAVES_DIR, entry);
    try {
      const raw  = fs.readFileSync(full, { encoding: 'utf-8' });
      const meta = JSON.parse(raw) as SaveMeta;
      metas.push(meta);
    } catch {
      // Corrupted meta file — skip it silently; the main save is unaffected.
    }
  }

  // Newest first for the Continue / Load screen
  return metas.sort((a, b) => b.savedAt - a.savedAt);
}

// ─── Task 22.9 — Delete save ──────────────────────────────────────────────────

/**
 * Deletes both the .json and .meta.json files for a given slot.
 * Guard: the autosave slot (99) cannot be manually deleted.
 */
export function deleteSave(slot: number): void {
  if (slot === AUTOSAVE_SLOT) {
    throw new Error('The autosave slot cannot be deleted manually.');
  }

  const slotPath = _slotPath(slot);
  const metaPath = _metaPath(slot);

  if (fs.existsSync(slotPath)) fs.unlinkSync(slotPath);
  if (fs.existsSync(metaPath)) fs.unlinkSync(metaPath);
}

// ─── Task 22.10 — Migration ──────────────────────────────────────────────────

/**
 * Upgrades a raw GameState object from an older schema version to the current one.
 * Each case handles one version step; cases fall through to handle multi-step jumps.
 *
 * All migrations are additive — they fill missing fields with safe defaults
 * rather than removing or transforming existing data.
 */
export function migrateSave(raw: object, fromVersion: number): GameState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let state = raw as any;

  if (fromVersion < 1) {
    // No migration needed — v1 is the initial schema.
    // Future: add migration steps here as `if (fromVersion < N)` blocks.
  }

  if (state.schemaVersion !== SAVE_SCHEMA_VERSION) {
    // If we still can't resolve it, the file is too old or from an unknown version.
    throw new Error(
      `No migration path from save schema v${fromVersion} to v${SAVE_SCHEMA_VERSION}. ` +
      `The save file cannot be loaded.`
    );
  }

  return state as GameState;
}

// ─── Task 22.12 — New Game+ eligibility check ────────────────────────────────

/**
 * Returns true only when the player has cleared the game at least once.
 * The game-cleared flag is set by the story engine at the true ending.
 * Used by TitleScreenView to conditionally render the New Game+ option.
 */
export function isNewGamePlusEligible(gameState: GameState): boolean {
  return gameState.flags['game_cleared'] === true;
}

// ─── Task 22.13 — New Game+ initializer ──────────────────────────────────────

/**
 * Produces a clean-slate GameState for a New Game+ run.
 * The caller is responsible for showing a confirmation prompt before calling this.
 *
 * Resets:
 *   world, quests, calendar, contacts, reputation, manor, craftingQueue,
 *   npcInteractionLog, offspring, flags (except ng_plus_count)
 *
 * Preserves:
 *   player.level, player.stats, player.unlockedSkillIds,
 *   player.battlePoints, player.ardorPoints, player.unspentBP, player.unspentAP,
 *   player.gold (50% carry-over, floored),
 *   achievements (never reset — they're a permanent meta-progression record)
 *
 * Emits no events — returns a fully valid GameState ready for new-game wiring.
 */
export function startNewGamePlus(gameState: GameState): GameState {
  if (!isNewGamePlusEligible(gameState)) {
    throw new Error('New Game+ is not available until the game has been cleared.');
  }

  const { player, achievements, settings } = gameState;
  const ngPlusCount = ((gameState.flags['ng_plus_count'] as number | undefined) ?? 0) + 1;

  // 50% gold carry-over (floored to nearest integer)
  const carryGold = Math.floor(player.gold * 0.5);

  // Build a minimal reset player — keep progression but zero out economy/inventory/equipment
  const resetPlayer = {
    ...player,
    gold:           carryGold,
    inventory:      [],
    equipped:       {} as typeof player.equipped,
    // Progression preserved as-is (level, stats, skills, skill points)
  };

  // Blank-slate world (engine will re-populate on new-game init; Task 3c.4)
  const resetWorld = {
    ...gameState.world,
    currentNodeId:      'start_village_square',
    currentLocationId:  'start_village_square',
    discoveredNodeIds:  ['start_village_square'],
    lastSafeNodeId:     'start_village_square',
    lastSafeLocationId: 'start_village_square',
    occupantPositions:  {},
    enemyRoamDefs:      [],
  };

  return {
    ...gameState,
    saveVersion:   gameState.saveVersion,

    // Reset systems
    player:            resetPlayer,
    party:             { companions: [], maxSize: settings.partyMaxSize },
    contacts:          [],
    world:             resetWorld,
    calendar:          { day: 1, phase: 'Morning', actionCount: 0, phaseActionLimit: 15 },
    offspring:         [],
    quests:            { entries: [] },
    reputation:        {},
    manor:             { tier: 1, constructionTimerDays: 0, suiteAssignments: {}, passiveResourceQueue: [], holdingCells: [] },
    craftingQueue:     { jobs: [], maxSlots: 0 },
    npcInteractionLog: [],

    // Preserved systems
    achievements,
    settings,

    // Reset flags, mark ng+ count
    flags: {
      ng_plus_count: ngPlusCount,
    },

    // Task 24.43: Phase 24 engine states
    // alignment: reset axes; divergence resets to 1.0 (no carry-over)
    alignment: {
      scores: { axis_a: 0, axis_b: 0, axis_c: 0 },
      dominantAxis: undefined,
      divergenceMultiplier: 1.0,
    },
    // infamy: fully reset; player's notoriety does not carry over to NG+
    infamy: {
      scores:           {},
      tiers:            {},
      outstandingFines: {},
    },
    // environment: reset weather + durability; new world has different conditions
    environment: {
      weather:             {},
      activeEffects:       [],
      equipmentDurability: {},
    },
    // spires: reset; player must re-unlock spires each run
    spires: { spires: gameState.spires.spires.map(s => ({ ...s, unlocked: false, unlockedOnDay: 0 })) },
    // jobState: preserve activeJobId/classId (progression) but reset resource pools
    jobState: {
      ...gameState.jobState,
      jobResources: {
        poolA: { ...gameState.jobState.jobResources.poolA, current: 0 },
        poolB: gameState.jobState.jobResources.poolB
          ? { ...gameState.jobState.jobResources.poolB, current: 0 }
          : undefined,
      },
    },
    // classProgress: preserved — SP expenditure and class nodes carry over to NG+
    classProgress: gameState.classProgress,
    // synergies: reset to locked; companion roster is blank at NG+ start
    synergies: { pairs: gameState.synergies.pairs.map(p => ({ ...p, unlocked: false, useCountToday: 0 })) },
    // characterCreation: cleared; player may rechoose in NG+ character screen
    characterCreation: undefined,
  };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function _slotPath(slot: number): string {
  return path.join(SAVES_DIR, `slot_${slot}.json`);
}

function _metaPath(slot: number): string {
  return path.join(SAVES_DIR, `slot_${slot}.meta.json`);
}

function _ensureSavesDirExists(): void {
  if (!fs.existsSync(SAVES_DIR)) {
    fs.mkdirSync(SAVES_DIR, { recursive: true });
  }
}
