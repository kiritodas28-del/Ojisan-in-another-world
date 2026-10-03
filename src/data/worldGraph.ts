/**
 * worldGraph.ts
 * Static world graph: named locations (WorldNode) and their connections (WorldEdge).
 *
 * Phase 17 — PRD §4.15
 *
 * NODE authoring conventions:
 *   id          — matches TileMap.locationId; used as key across all engines
 *   regionId    — matches keys in GameState.reputation; used for fast-travel cost calc
 *   isSafe      — true = sleep allowed + no phase-encounter roll during TRAVEL
 *   safetyTier  — mirrors TileMap.safetyTier; drives HUD border color and menu access
 *   fastTravelCost — 0 means "use the same/cross-region constant from worldEngine";
 *                    non-zero overrides (reserved for special nodes e.g. dungeon entrances)
 *
 * EDGE authoring conventions:
 *   Edges are DIRECTED; author both directions for a passable corridor.
 *   travelPhases = in-game phases consumed to walk the edge (1–5).
 *   1 phase  = short hop (same district)
 *   2 phases = medium walk (edge of town to outskirts)
 *   3 phases = long road segment
 *   4–5      = mountain pass / deep wilderness / long sea route
 *
 * DATA STATUS: stub — 5 placeholder nodes matching mockGameState location IDs.
 * Full 81-node / 92-edge graph deferred to Task 17.DATA (pending lore/world doc review).
 *
 * Enemy roam defs (EnemyRoamDef[]) are authored per location alongside the tile map;
 * they live here as ENEMY_ROAM_DEFS keyed by locationId.
 * Also deferred to Task 17.DATA.
 */

import type { WorldNode, WorldEdge, EnemyRoamDef } from '../state/gameState';

// ─── Node catalog ─────────────────────────────────────────────────────────────

export const WORLD_NODES: WorldNode[] = [
  {
    id:             'village_square',
    name:           'Village Square',
    regionId:       'region_start',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      false,   // open plaza; exposure gate active
  },
  {
    id:             'forest_entrance',
    name:           'Forest Entrance',
    regionId:       'region_forest',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,   // outdoors; exposure gate active
  },
  {
    id:             'old_mill',
    name:           'Old Mill',
    regionId:       'region_start',
    isSafe:         false,
    safetyTier:     'HUMANOID_ONLY',
    fastTravelCost: 0,
    isIndoors:      true,    // interior building; exposure gate bypassed
  },
  {
    id:             'crossroads',
    name:           'Crossroads',
    regionId:       'region_plains',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,   // open road junction; exposure gate active
  },
  {
    id:             'manor_grounds',
    name:           'Manor Grounds',
    regionId:       'region_start',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      true,    // walled private estate; exposure gate bypassed
  },
];

// ─── Edge catalog ─────────────────────────────────────────────────────────────
// Bidirectional corridors authored as two directed edges each.

export const WORLD_EDGES: WorldEdge[] = [
  // village_square <-> old_mill (short intra-region hop)
  { fromId: 'village_square',  toId: 'old_mill',         travelPhases: 1 },
  { fromId: 'old_mill',        toId: 'village_square',   travelPhases: 1 },

  // village_square <-> forest_entrance (medium walk, crosses into forest region)
  { fromId: 'village_square',  toId: 'forest_entrance',  travelPhases: 2 },
  { fromId: 'forest_entrance', toId: 'village_square',   travelPhases: 2 },

  // village_square <-> crossroads (longer road, crosses into plains region)
  { fromId: 'village_square',  toId: 'crossroads',       travelPhases: 3 },
  { fromId: 'crossroads',      toId: 'village_square',   travelPhases: 3 },

  // village_square <-> manor_grounds (short safe hop)
  { fromId: 'village_square',  toId: 'manor_grounds',    travelPhases: 1 },
  { fromId: 'manor_grounds',   toId: 'village_square',   travelPhases: 1 },
];

// ─── Enemy roam definitions (per location) ────────────────────────────────────
// Keyed by locationId. Loaded by worldEngine.enterNode() when the player arrives.
// Empty until Task 17.DATA (pending lore/world doc and tile map authoring).

export const ENEMY_ROAM_DEFS: Record<string, EnemyRoamDef[]> = {
  // SAFE nodes have no roaming enemies.
  village_square: [],
  manor_grounds:  [],

  // Unsafe/humanoid-only locations — roam defs authored in Task 17.DATA.
  forest_entrance: [],
  old_mill:        [],
  crossroads:      [],
};

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/** Returns the WorldNode for a given id. Throws if not found. */
export function getWorldNode(id: string): WorldNode {
  const node = WORLD_NODES.find(n => n.id === id);
  if (!node) throw new Error(`WorldNode not found: "${id}"`);
  return node;
}

/** Returns the directed edge from→to, or undefined if no direct edge exists. */
export function getEdge(fromId: string, toId: string): WorldEdge | undefined {
  return WORLD_EDGES.find(e => e.fromId === fromId && e.toId === toId);
}

/** Returns all edges departing from a given node. */
export function getEdgesFrom(nodeId: string): WorldEdge[] {
  return WORLD_EDGES.filter(e => e.fromId === nodeId);
}

/** Returns all WorldNode ids directly reachable from nodeId (one hop). */
export function getAdjacentNodeIds(nodeId: string): string[] {
  return getEdgesFrom(nodeId).map(e => e.toId);
}

/** Returns roam defs for a location, or empty array if none authored yet. */
export function getEnemyRoamDefs(locationId: string): EnemyRoamDef[] {
  return ENEMY_ROAM_DEFS[locationId] ?? [];
}
