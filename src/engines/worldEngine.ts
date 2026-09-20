/**
 * worldEngine.ts
 * World map, inter-node travel, intra-location tile movement, and encounter logic.
 *
 * Phase 17 — PRD §4.15
 *
 * ── Two spatial layers ────────────────────────────────────────────────────────
 *
 * LAYER 1 — Tile grid (intra-location):
 *   30×30 fixed grid. Player moves one tile at a time via MOVE_TILE intent.
 *   Boundary/impassable tiles are EMPTY_EDGE or WALL (isPassable: false).
 *   Special encounters roll on every tile step in non-SAFE nodes.
 *   Enemy positions are always visible; encounter triggers on proximity.
 *
 * LAYER 2 — World graph (inter-location):
 *   Named nodes connected by directed edges (WORLD_EDGES).
 *   TRAVEL intent moves the player to an adjacent node; phases consumed = edge.travelPhases.
 *   Phase-based encounter rolls apply for each phase consumed on non-safe edges.
 *   FAST_TRAVEL teleports to any discovered node; no encounters; gold cost based on region.
 *
 * ── Encounter model ───────────────────────────────────────────────────────────
 *
 * SPECIAL ENCOUNTER (MOVE_TILE only):
 *   Roll per tile step. Chance determined by current node's safetyTier:
 *     SAFE:          0 %
 *     HUMANOID_ONLY: 5 %
 *     UNSAFE:       15 %
 *   Emits SPECIAL_ENCOUNTER_ROLLED. Dispatcher initiates ExplorationEncounterView.
 *   No encounter roll on TRAVEL or FAST_TRAVEL.
 *
 * ROAM ENCOUNTER (client-side real-time tick):
 *   tickEnemyRoam() is called every 1 real second by the client (setInterval).
 *   Each enemy moves one tile within its roamRadius (Chebyshev distance from spawn).
 *   If any enemy closes to within encounterRadius of the player → ROAM_ENCOUNTER_TRIGGERED.
 *   enemyInitiated: true (enemy took the step that closed distance) → enemy first strike.
 *   If the player's MOVE_TILE caused the proximity → enemyInitiated: false → player first.
 *   tickEnemyRoam() is pure: takes current OccupantPositions, returns new positions.
 *   GameState is NOT mutated by roam ticks — OccupantPositions is UI store state only.
 *
 * ── Fast travel cost ──────────────────────────────────────────────────────────
 *   Same-region nodes: FAST_TRAVEL_SAME_REGION_COST (5g)
 *   Cross-region nodes: FAST_TRAVEL_CROSS_REGION_COST (20g)
 *   WorldNode.fastTravelCost > 0 overrides both constants (special/dungeon nodes).
 *
 * ── Encounter chance during TRAVEL (inter-node) ───────────────────────────────
 *   One roll per phase consumed on the edge.
 *   Only rolls when EITHER the departure OR destination node is non-safe.
 *   Safe→safe travel is always encounter-free.
 *   Chance per phase: same SPECIAL_ENCOUNTER_CHANCE table keyed on destination safetyTier.
 */

import type {
  GameState, GameEvent, TileCoord, OccupantPositions,
  EnemyRoamDef, DayPhase,
} from '../state/gameState';
import {
  getWorldNode,
  getEdge,
  getAdjacentNodeIds,
  getEnemyRoamDefs,
} from '../data/worldGraph';
import { incrementActionCount, advancePhase } from './calendarEngine';
import { isSpireUnlocked, spireTravel } from './spireEngine';
import { syncActiveEffects } from './environmentEngine';

// ─── Constants ────────────────────────────────────────────────────────────────

export const FAST_TRAVEL_SAME_REGION_COST  = 5;   // gold; same-region teleport
export const FAST_TRAVEL_CROSS_REGION_COST = 20;  // gold; cross-region teleport

// Special encounter chance per safetyTier (rolled on every MOVE_TILE step).
export const SPECIAL_ENCOUNTER_CHANCE: Record<string, number> = {
  SAFE:          0.00,
  HUMANOID_ONLY: 0.05,
  UNSAFE:        0.15,
};

// ─── Result types ─────────────────────────────────────────────────────────────

export interface WorldEngineResult {
  state:     GameState;
  events:    GameEvent[];
  narrative: string[];
}

// Returned by tickEnemyRoam — pure, no GameState mutation.
export interface RoamTickResult {
  newPositions:       OccupantPositions;
  // Defined when an enemy closed to within encounterRadius of the player this tick.
  encounterTriggered: boolean;
  enemyId?:           string;
  enemyInitiated:     boolean;  // true = enemy roamed into range; false = player stepped in
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Chebyshev distance between two tile coords (diagonal = 1, same as cardinal).
 * Used for encounter radius checks and roam radius bounding.
 */
function chebyshev(a: TileCoord, b: TileCoord): number {
  return Math.max(Math.abs(a.row - b.row), Math.abs(a.col - b.col));
}

/**
 * Manhattan distance — used for adjacency checks on MOVE_TILE.
 * Only cardinal movement is allowed (no diagonals).
 */
function manhattan(a: TileCoord, b: TileCoord): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

/**
 * Clamps a number to [min, max].
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Resolves the fast-travel gold cost for the player's current node → targetNode.
 * Uses WorldNode.fastTravelCost override when non-zero; otherwise same/cross-region constant.
 */
function resolveFastTravelCost(
  currentRegionId: string,
  targetNode: ReturnType<typeof getWorldNode>,
): number {
  if (targetNode.fastTravelCost > 0) return targetNode.fastTravelCost;
  return currentRegionId === targetNode.regionId
    ? FAST_TRAVEL_SAME_REGION_COST
    : FAST_TRAVEL_CROSS_REGION_COST;
}

/**
 * Writes both canonical field and its legacy alias so all existing engine
 * references (calendarEngine uses currentLocationId/lastSafeLocationId) stay valid.
 */
function updateNodeId(
  world: GameState['world'],
  nodeId: string,
): GameState['world'] {
  return { ...world, currentNodeId: nodeId, currentLocationId: nodeId };
}

function updateLastSafeIds(
  world: GameState['world'],
  nodeId: string,
): GameState['world'] {
  return { ...world, lastSafeNodeId: nodeId, lastSafeLocationId: nodeId };
}

// ─── Pure helpers (exported for UI and other engines) ─────────────────────────

/** Returns the WorldNode the player is currently standing in. */
export function getCurrentNode(gameState: GameState) {
  return getWorldNode(gameState.world.currentNodeId);
}

/** Returns all discovered WorldNodes (for the map UI). */
export function getDiscoveredNodes(gameState: GameState) {
  return gameState.world.discoveredNodeIds.map(id => getWorldNode(id));
}

/** Returns WorldNodes directly adjacent to the current node. */
export function getAdjacentNodes(gameState: GameState) {
  return getAdjacentNodeIds(gameState.world.currentNodeId).map(id => getWorldNode(id));
}

// ─── updateLastSafeLocation ───────────────────────────────────────────────────

/**
 * Updates lastSafeNodeId (and alias) when entering a safe node.
 * No-op if the node is not safe.
 * Emits LAST_SAFE_UPDATED when updated.
 */
export function updateLastSafeLocation(
  gameState: GameState,
  nodeId: string,
): { state: GameState; events: GameEvent[] } {
  const node = getWorldNode(nodeId);
  if (!node.isSafe) return { state: gameState, events: [] };

  const state: GameState = {
    ...gameState,
    world: updateLastSafeIds(gameState.world, nodeId),
  };
  const events: GameEvent[] = [{ type: 'LAST_SAFE_UPDATED', nodeId }];
  return { state, events };
}

// ─── enterNode ────────────────────────────────────────────────────────────────

/**
 * Shared arrival logic when the player reaches a new node (TRAVEL or FAST_TRAVEL).
 *   1. Update currentNodeId + alias.
 *   2. Discover node if new.
 *   3. Load enemy roam defs for this location.
 *   4. Reset occupantPositions to the new tile map's spawnPoints (tile map itself
 *      is loaded by the client / tRPC layer which fetches the appropriate TileMap).
 *   5. Update lastSafeNode if applicable.
 *   6. Emit TRAVEL_NODE_REACHED, optionally LAST_SAFE_UPDATED.
 */
function enterNode(
  gameState: GameState,
  nodeId: string,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];

  let world = updateNodeId(gameState.world, nodeId);

  // Discover node
  if (!world.discoveredNodeIds.includes(nodeId)) {
    world = { ...world, discoveredNodeIds: [...world.discoveredNodeIds, nodeId] };
  }

  // Load roam defs for this location (empty until Task 17.DATA)
  world = { ...world, enemyRoamDefs: getEnemyRoamDefs(nodeId) };

  // Reset occupant positions to the new tile map's spawn points.
  // tileMap itself is swapped by the client/server layer (worldEngine only tracks nodeId).
  // We reset positions here so engines have a valid starting coord for encounter checks.
  const spawnPoints = gameState.world.tileMap.spawnPoints ?? {};
  world = { ...world, occupantPositions: { ...spawnPoints } };

  let state: GameState = { ...gameState, world };

  // Update last safe location if applicable
  const safeResult = updateLastSafeLocation(state, nodeId);
  state = safeResult.state;
  events.push(...safeResult.events);

  events.push({ type: 'TRAVEL_NODE_REACHED', nodeId });
  return { state, events };
}

// ─── travelToAdjacent ────────────────────────────────────────────────────────

/**
 * Moves the player from their current node to an adjacent node via a world edge.
 *
 * For each phase consumed on the edge:
 *   - Increments the action counter (may auto-advance phase).
 *   - Rolls a phase-based encounter if EITHER node is non-safe:
 *       chance = SPECIAL_ENCOUNTER_CHANCE[destinationNode.safetyTier]
 *     On roll success: emits SPECIAL_ENCOUNTER_ROLLED and STOPS travel at that phase
 *     (the dispatcher must resolve the encounter before travel continues).
 *
 * On clean arrival (no encounter): calls enterNode().
 * Emits TRAVEL_STARTED at the beginning.
 */
export function travelToAdjacent(
  gameState: GameState,
  targetNodeId: string,
): WorldEngineResult {
  const narrative: string[] = [];
  const events: GameEvent[] = [];

  const currentNodeId = gameState.world.currentNodeId;

  // Guard: must be an adjacent node
  const edge = getEdge(currentNodeId, targetNodeId);
  if (!edge) {
    narrative.push(`You can't travel directly to that location from here.`);
    return { state: gameState, events, narrative };
  }

  const fromNode   = getWorldNode(currentNodeId);
  const targetNode = getWorldNode(targetNodeId);

  // Guard: TRAVEL only applies when at least one endpoint is non-safe.
  // Safe→safe travel is always free of encounters (and is essentially a fast-hop).
  const rollEncounters = !fromNode.isSafe || !targetNode.isSafe;

  events.push({
    type: 'TRAVEL_STARTED',
    fromId:       currentNodeId,
    toId:         targetNodeId,
    travelPhases: edge.travelPhases,
  });
  narrative.push(`You set out toward ${targetNode.name}...`);

  let state = gameState;

  // Consume phases for the journey; roll encounter each phase on non-safe routes.
  for (let i = 0; i < edge.travelPhases; i++) {
    // Increment action counter; advance phase if limit reached
    const { calendar, phaseAdvanceTriggered } = incrementActionCount(state.calendar);
    state = { ...state, calendar };

    if (phaseAdvanceTriggered) {
      const advance = advancePhase(state);
      state  = advance.state;
      events.push(...advance.events);
    }

    // Phase-based encounter roll
    if (rollEncounters) {
      const chance = SPECIAL_ENCOUNTER_CHANCE[targetNode.safetyTier] ?? 0;
      if (chance > 0 && Math.random() < chance) {
        const encounterEvent: GameEvent = {
          type:  'SPECIAL_ENCOUNTER_ROLLED',
          nodeId: targetNodeId,
          phase: state.calendar.phase as DayPhase,
        };
        events.push(encounterEvent);
        narrative.push(`Something stirs on the road...`);
        // Stop travel; dispatcher resolves the encounter.
        // The player remains at the current node until travel resumes.
        return { state, events, narrative };
      }
    }
  }

  // Clean arrival
  const arrivalResult = enterNode(state, targetNodeId);
  state = arrivalResult.state;
  events.push(...arrivalResult.events);
  narrative.push(`You arrive at ${targetNode.name}.`);

  return { state, events, narrative };
}

// ─── fastTravel ───────────────────────────────────────────────────────────────

/**
 * Teleports the player to any previously discovered node.
 * No encounter rolls. Deducts gold cost (same or cross-region constant, or node override).
 * Counts as 1 action.
 */
export function fastTravel(
  gameState: GameState,
  targetNodeId: string,
): WorldEngineResult {
  const narrative: string[] = [];
  const events: GameEvent[] = [];

  // Guard: target must be discovered
  if (!gameState.world.discoveredNodeIds.includes(targetNodeId)) {
    narrative.push(`You haven't discovered that location yet.`);
    return { state: gameState, events, narrative };
  }

  const currentNodeId = gameState.world.currentNodeId;
  if (currentNodeId === targetNodeId) {
    narrative.push(`You're already there.`);
    return { state: gameState, events, narrative };
  }

  const currentNode = getWorldNode(currentNodeId);
  const targetNode  = getWorldNode(targetNodeId);
  const goldCost    = resolveFastTravelCost(currentNode.regionId, targetNode);

  // Guard: sufficient gold
  if (gameState.player.gold < goldCost) {
    narrative.push(`You need ${goldCost}g to fast-travel there. You only have ${gameState.player.gold}g.`);
    return { state: gameState, events, narrative };
  }

  // Task 24.31: if both nodes are unlocked spires, delegate to spireTravel() (zero cost)
  if (isSpireUnlocked(gameState, currentNodeId) && isSpireUnlocked(gameState, targetNodeId)) {
    try {
      const spireResult = spireTravel(gameState, currentNodeId, targetNodeId);
      let state = spireResult.state;
      // Recompute weather effects for the new region (Task 24.32)
      state = syncActiveEffects(state, []);
      const arrivalResult = enterNode(state, targetNodeId);
      state = arrivalResult.state;
      const evts = [...spireResult.events, ...arrivalResult.events];
      narrative.push(`You step through the ley-line spire and arrive at ${targetNode.name} instantly.`);
      return { state, events: evts, narrative };
    } catch {
      // Spire check failed unexpectedly — fall through to gold-cost path
    }
  }

  // Deduct gold
  const newGold = gameState.player.gold - goldCost;
  let state: GameState = {
    ...gameState,
    player: { ...gameState.player, gold: newGold },
  };

  events.push({ type: 'GOLD_CHANGED', delta: -goldCost, newAmount: newGold });
  events.push({ type: 'FAST_TRAVEL_USED', fromId: currentNodeId, toId: targetNodeId, goldCost });

  // Increment action counter (fast travel = 1 action)
  const { calendar, phaseAdvanceTriggered } = incrementActionCount(state.calendar);
  state = { ...state, calendar };
  if (phaseAdvanceTriggered) {
    const advance = advancePhase(state);
    state  = advance.state;
    events.push(...advance.events);
  }

  // Arrive at target
  const arrivalResult = enterNode(state, targetNodeId);
  state = arrivalResult.state;
  events.push(...arrivalResult.events);

  // Task 24.32: recompute weather effects for the new region
  state = syncActiveEffects(state, []);

  narrative.push(`You spend ${goldCost}g and arrive at ${targetNode.name} in an instant.`);
  return { state, events, narrative };
}

// ─── moveTile ─────────────────────────────────────────────────────────────────

/**
 * Moves the player one tile within the current location's tile grid.
 *
 * Guards:
 *   - Target must be cardinal-adjacent (Manhattan distance = 1; no diagonals).
 *   - Target tile must be within the 30×30 grid (0–29).
 *   - Target tile must have isPassable: true.
 *
 * On valid move:
 *   1. Update player position in occupantPositions.
 *   2. Increment action counter.
 *   3. Roll special encounter if safetyTier != SAFE.
 *   4. Check roam-proximity encounter against all enemies in the current location.
 *      If player stepped into an enemy's encounterRadius → ROAM_ENCOUNTER_TRIGGERED
 *      (enemyInitiated: false = player first strike).
 *
 * Returns updated state + events. If SPECIAL_ENCOUNTER_ROLLED or
 * ROAM_ENCOUNTER_TRIGGERED is in events, the dispatcher must pause movement
 * and route to combat/encounter view.
 */
export function moveTile(
  gameState: GameState,
  targetCoord: TileCoord,
): WorldEngineResult {
  const narrative: string[] = [];
  const events: GameEvent[] = [];

  const { world, player } = gameState;
  const playerCoord = world.occupantPositions[player.id];

  if (!playerCoord) {
    narrative.push(`Player position unknown — cannot move.`);
    return { state: gameState, events, narrative };
  }

  // Guard: cardinal adjacency only (no diagonals)
  if (manhattan(playerCoord, targetCoord) !== 1) {
    narrative.push(`You can only move to adjacent tiles.`);
    return { state: gameState, events, narrative };
  }

  // Guard: within grid bounds
  const GRID_SIZE = 30;
  if (
    targetCoord.row < 0 || targetCoord.row >= GRID_SIZE ||
    targetCoord.col < 0 || targetCoord.col >= GRID_SIZE
  ) {
    narrative.push(`That tile is outside the map boundary.`);
    return { state: gameState, events, narrative };
  }

  // Guard: tile passability
  const tile = world.tileMap.tiles[targetCoord.row]?.[targetCoord.col];
  if (!tile) {
    narrative.push(`No tile data at that position.`);
    return { state: gameState, events, narrative };
  }
  if (!tile.isPassable) {
    narrative.push(`There's something blocking the way.`);
    return { state: gameState, events, narrative };
  }

  // Move the player
  const newPositions: OccupantPositions = {
    ...world.occupantPositions,
    [player.id]: targetCoord,
  };
  let state: GameState = {
    ...gameState,
    world: { ...world, occupantPositions: newPositions },
  };

  // Increment action counter
  const { calendar, phaseAdvanceTriggered } = incrementActionCount(state.calendar);
  state = { ...state, calendar };
  if (phaseAdvanceTriggered) {
    const advance = advancePhase(state);
    state  = advance.state;
    events.push(...advance.events);
  }

  // Special encounter roll (only on non-safe nodes)
  const currentNode = getWorldNode(state.world.currentNodeId);
  const encounterChance = SPECIAL_ENCOUNTER_CHANCE[currentNode.safetyTier] ?? 0;
  if (encounterChance > 0 && Math.random() < encounterChance) {
    events.push({
      type:  'SPECIAL_ENCOUNTER_ROLLED',
      nodeId: currentNode.id,
      phase: state.calendar.phase as DayPhase,
    });
    narrative.push(`You sense danger...`);
    return { state, events, narrative };
  }

  // Roam-proximity check: did the player step into any enemy's encounter radius?
  const roamDefs = state.world.enemyRoamDefs;
  for (const def of roamDefs) {
    const enemyCoord = state.world.occupantPositions[def.enemyId];
    if (!enemyCoord) continue;
    if (chebyshev(targetCoord, enemyCoord) <= def.encounterRadius) {
      // Player stepped into range — player gets first strike (enemyInitiated: false)
      events.push({
        type:          'ROAM_ENCOUNTER_TRIGGERED',
        enemyId:       def.enemyId,
        nodeId:        currentNode.id,
        enemyInitiated: false,
      });
      narrative.push(`You come face to face with an enemy!`);
      return { state, events, narrative };
    }
  }

  return { state, events, narrative };
}

// ─── tickEnemyRoam ────────────────────────────────────────────────────────────

/**
 * Pure function — called client-side every 1 real second (setInterval).
 * Moves each enemy one tile within its roamRadius (Chebyshev from spawnCoord).
 * After all enemies move, checks proximity to the player.
 *
 * Movement strategy: random walk — pick a random cardinal direction, take the step
 * if the resulting tile is within roamRadius and is passable. No-op if all
 * directions are blocked or out of radius (enemy stays put this tick).
 *
 * If any enemy closes to within encounterRadius of the player after moving:
 *   encounterTriggered: true, enemyInitiated: true (enemy moved into range).
 *
 * Does NOT mutate GameState. The client applies newPositions to its UI store.
 * When encounterTriggered is true, the client dispatches the encounter to the server.
 */
export function tickEnemyRoam(
  playerCoord: TileCoord,
  currentPositions: OccupantPositions,
  roamDefs: EnemyRoamDef[],
  // Tile passability checker — client passes a closure over the current TileMap.
  isTilePassable: (coord: TileCoord) => boolean,
): RoamTickResult {
  const CARDINALS: TileCoord[] = [
    { row: -1, col:  0 }, // north
    { row:  1, col:  0 }, // south
    { row:  0, col: -1 }, // west
    { row:  0, col:  1 }, // east
  ];

  let newPositions: OccupantPositions = { ...currentPositions };
  let encounterTriggered = false;
  let triggeredEnemyId: string | undefined;

  for (const def of roamDefs) {
    const current = newPositions[def.enemyId];
    if (!current) continue; // enemy not yet placed (before 17.DATA is authored)

    // Build candidate steps: cardinal directions within roamRadius of spawnCoord
    const candidates = CARDINALS
      .map(delta => ({ row: current.row + delta.row, col: current.col + delta.col }))
      .filter(coord =>
        // Within grid
        coord.row >= 0 && coord.row < 30 &&
        coord.col >= 0 && coord.col < 30 &&
        // Within roam radius (Chebyshev from spawn)
        chebyshev(coord, def.spawnCoord) <= def.roamRadius &&
        // Tile is walkable
        isTilePassable(coord),
      );

    if (candidates.length === 0) continue; // trapped; stay put

    // Pick a random valid step
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    newPositions = { ...newPositions, [def.enemyId]: next };

    // Proximity check after the step
    if (!encounterTriggered && chebyshev(next, playerCoord) <= def.encounterRadius) {
      encounterTriggered = true;
      triggeredEnemyId   = def.enemyId;
    }
  }

  return {
    newPositions,
    encounterTriggered,
    enemyId:        triggeredEnemyId,
    enemyInitiated: encounterTriggered, // all encounters from this function are enemy-initiated
  };
}

// ─── checkEncounterProximity ──────────────────────────────────────────────────

/**
 * Pure helper — checks if any enemy is currently within encounter radius of the player.
 * Called by the client after applying new positions from tickEnemyRoam or moveTile.
 * Returns the first triggering enemy found, or null.
 */
export function checkEncounterProximity(
  playerCoord: TileCoord,
  positions: OccupantPositions,
  roamDefs: EnemyRoamDef[],
): { triggered: boolean; enemyId?: string; enemyInitiated: boolean } {
  for (const def of roamDefs) {
    const enemyCoord = positions[def.enemyId];
    if (!enemyCoord) continue;
    if (chebyshev(playerCoord, enemyCoord) <= def.encounterRadius) {
      return { triggered: true, enemyId: def.enemyId, enemyInitiated: false };
    }
  }
  return { triggered: false, enemyInitiated: false };
}
