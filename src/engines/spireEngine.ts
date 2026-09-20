/**
 * spireEngine.ts  — Phase 24
 * Generic ley-line spire fast-travel network.
 *
 * Design principles:
 *  - Spires are authored per WorldNode in src/data/spireNetwork.ts (game-specific).
 *    The engine is node-id agnostic; it only knows about SpireState records.
 *  - Unlocking a spire costs nothing by itself; the prerequisite is that the player
 *    has established an Enclave Stronghold in that region (checked via flags).
 *    Game-specific unlock conditions are injected as predicates (see unlockSpire).
 *  - Spire fast-travel is FREE (unlike generic cross-region fast travel which costs
 *    gold). This is the key mechanical distinction that makes spire unlock valuable.
 *  - The engine does NOT replace worldEngine.fastTravel(); instead it patches the
 *    cost to 0 when both the departure and destination are unlocked spire nodes.
 *  - All functions are pure.
 */

import type {
  GameState, GameEvent,
  SpireNetwork, SpireState,
} from '../state/gameState';

// ─── Default initial spire network ───────────────────────────────────────────
/**
 * Initialise the spire network from a static catalog of node IDs.
 * All spires start locked (unlocked: false, unlockedOnDay: 0).
 */
export function createSpireNetwork(nodeIds: string[]): SpireNetwork {
  return {
    spires: nodeIds.map(nodeId => ({ nodeId, unlocked: false, unlockedOnDay: 0 })),
  };
}

// ─── Unlock a spire ───────────────────────────────────────────────────────────
/**
 * Mark a spire as unlocked.  The caller is responsible for validating the
 * prerequisite (e.g. Enclave Stronghold in the region); this function just
 * applies the state change and emits the event.
 * Throws if the nodeId is not in the spire catalog.
 */
export function unlockSpire(
  state:  GameState,
  nodeId: string,
): { state: GameState; events: GameEvent[] } {
  const idx = state.spires.spires.findIndex(s => s.nodeId === nodeId);
  if (idx === -1) throw new Error(`No spire defined for node "${nodeId}".`);
  if (state.spires.spires[idx].unlocked) return { state, events: [] }; // idempotent

  const newSpires: SpireState[] = state.spires.spires.map((s, i) =>
    i === idx ? { ...s, unlocked: true, unlockedOnDay: state.calendar.day } : s,
  );

  return {
    state:  { ...state, spires: { spires: newSpires } },
    events: [{ type: 'SPIRE_UNLOCKED', nodeId }],
  };
}

// ─── Spire fast travel ────────────────────────────────────────────────────────
/**
 * Teleport the player between two unlocked spire nodes with zero gold cost.
 * Guards:
 *  - Both nodes must be in the spire catalog AND unlocked.
 *  - Player cannot use a spire they haven't unlocked (destination must be known).
 *
 * This intentionally does NOT call worldEngine.fastTravel() to avoid coupling;
 * instead it performs the minimal world-state update (currentNodeId sync) and
 * emits SPIRE_TRAVEL_USED + TRAVEL_NODE_REACHED so worldEngine hooks still fire.
 */
export function spireTravel(
  state:        GameState,
  fromNodeId:   string,
  toNodeId:     string,
): { state: GameState; events: GameEvent[] } {
  _assertSpireUnlocked(state, fromNodeId);
  _assertSpireUnlocked(state, toNodeId);

  const events: GameEvent[] = [
    { type: 'SPIRE_TRAVEL_USED', fromNodeId, toNodeId },
    { type: 'TRAVEL_NODE_REACHED', nodeId: toNodeId },
  ];

  // Update world position (mirrors the minimal update in worldEngine.fastTravel).
  const newState: GameState = {
    ...state,
    world: {
      ...state.world,
      currentNodeId:     toNodeId,
      currentLocationId: toNodeId,
    },
  };

  return { state: newState, events };
}

// ─── Read helpers ─────────────────────────────────────────────────────────────
export function isSpireNode(state: GameState, nodeId: string): boolean {
  return state.spires.spires.some(s => s.nodeId === nodeId);
}
export function isSpireUnlocked(state: GameState, nodeId: string): boolean {
  return state.spires.spires.some(s => s.nodeId === nodeId && s.unlocked);
}
export function getUnlockedSpires(state: GameState): SpireState[] {
  return state.spires.spires.filter(s => s.unlocked);
}

// ─── Internal helpers ─────────────────────────────────────────────────────────
function _assertSpireUnlocked(state: GameState, nodeId: string): void {
  const spire = state.spires.spires.find(s => s.nodeId === nodeId);
  if (!spire)          throw new Error(`Node "${nodeId}" has no spire.`);
  if (!spire.unlocked) throw new Error(`Spire at "${nodeId}" is not yet unlocked.`);
}
