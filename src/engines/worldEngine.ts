/**
 * worldEngine.ts
 * Node-based world map, pathfinding, encounter rolls, and fast travel.
 *
 * TODO (Task 10.8): Full implementation.
 *
 * Encounter chance by phase (PRD §4.15):
 *   Morning 10% | Afternoon 15% | Evening 20% | Night 35% | Midnight 50%
 *
 * Fast travel: 5 gold × number of region boundaries crossed
 * Standard travel: Dijkstra shortest path; each segment rolls encounter chance
 */

import type { GameState, DayPhase, GameEvent } from '../state/gameState';

// ─── World node schema (PRD §4.15) ───────────────────────────────────────────
export interface WorldNode {
  id: string;
  name: string;
  regionId: string;
  isSafe: boolean;
  npcClasses: string[];
  monsterProfileId?: string;
}

export interface WorldEdge {
  fromId: string;
  toId: string;
  travelActions: number; // actions consumed for this leg (default 1)
}

export interface RegionMonsterProfile {
  regionId: string;
  monsterTypes: string[];
  levelRange: { min: number; max: number };
}

// ─── Encounter chance table ────────────────────────────────────────────────────
export const ENCOUNTER_CHANCE: Record<DayPhase, number> = {
  Morning:   0.10,
  Afternoon: 0.15,
  Evening:   0.20,
  Night:     0.35,
  Midnight:  0.50,
};

// ─── Engine entry points (stubs) ──────────────────────────────────────────────
export function travel(
  _gameState: GameState,
  _targetLocationId: string,
  _useFastTravel: boolean,
): { state: GameState; events: GameEvent[]; narrative: string[] } {
  throw new Error('travel() not yet implemented');
}

export function rollEncounterCheck(phase: DayPhase): boolean {
  return Math.random() < ENCOUNTER_CHANCE[phase];
}

export function calcFastTravelCost(regionBoundariesCrossed: number): number {
  return 5 * regionBoundariesCrossed;
}

/** Dijkstra shortest path between two node IDs given the edge graph. */
export function findShortestPath(
  _fromId: string,
  _toId: string,
  _nodes: Record<string, WorldNode>,
  _edges: WorldEdge[],
): string[] /* ordered node IDs */ {
  throw new Error('findShortestPath() not yet implemented');
}
