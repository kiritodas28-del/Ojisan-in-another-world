/**
 * saveEngine.ts
 * JSON serialization/deserialization with Set↔Array conversion, versioning, migration.
 *
 * TODO (Task 10.13): Full implementation.
 *
 * CRITICAL: Set<T> fields must be serialized as arrays and deserialized back to Set<T>.
 * Affected fields (PRD §4.18):
 *   SexualPsychology.acquiredKinks          : Set<Kink>
 *   OrgasmProfile.acquiredTypes             : Set<OrgasmType>
 *   SexualActFlags.orgasmTypesExperienced   : Set<OrgasmType>
 *   SexualActFlags.kinksExperienced         : Set<Kink>
 *
 * Autosave: every Midnight (called by calendarEngine day-end tick)
 * Manual saves: up to N slots (configurable)
 * Migration: bump saveVersion on breaking schema changes; migration functions per version.
 */

import type { GameState } from '../state/gameState';
import * as fs from 'fs';
import * as path from 'path';

export const SAVES_DIR = path.resolve(__dirname, '../../saves');
export const CURRENT_SAVE_VERSION = 1;

// ─── Custom JSON replacer/reviver for Set<T> ─────────────────────────────────

/** Replacer: converts Set → { __type: 'Set', values: [...] } */
export function gameStateReplacer(_key: string, value: unknown): unknown {
  if (value instanceof Set) {
    return { __type: 'Set', values: Array.from(value) };
  }
  return value;
}

/** Reviver: converts { __type: 'Set', values: [...] } → Set */
export function gameStateReviver(_key: string, value: unknown): unknown {
  if (
    value !== null &&
    typeof value === 'object' &&
    (value as Record<string, unknown>).__type === 'Set'
  ) {
    return new Set((value as { values: unknown[] }).values);
  }
  return value;
}

// ─── Save/Load (stubs) ────────────────────────────────────────────────────────
export function saveGame(gameState: GameState, slotIndex: number): void {
  const filePath = path.join(SAVES_DIR, `slot_${slotIndex}.save.json`);
  const json = JSON.stringify(gameState, gameStateReplacer, 2);
  fs.writeFileSync(filePath, json, { encoding: 'utf-8' });
}

export function loadGame(slotIndex: number): GameState {
  const filePath = path.join(SAVES_DIR, `slot_${slotIndex}.save.json`);
  const raw = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const state = JSON.parse(raw, gameStateReviver) as GameState;
  return migrate(state);
}

export function autosave(gameState: GameState): void {
  const filePath = path.join(SAVES_DIR, 'autosave.save.json');
  const json = JSON.stringify(gameState, gameStateReplacer, 2);
  fs.writeFileSync(filePath, json, { encoding: 'utf-8' });
}

// ─── Migration ────────────────────────────────────────────────────────────────
function migrate(state: GameState): GameState {
  // TODO (Task 10.13): add per-version migration functions as schema evolves
  if (state.saveVersion === CURRENT_SAVE_VERSION) return state;
  throw new Error(`No migration path from save version ${state.saveVersion} to ${CURRENT_SAVE_VERSION}`);
}
