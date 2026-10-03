/**
 * travelCostEngine.ts
 * Tasks 26.14–26.15 — Overland carriage cost and travel time estimation.
 *
 * estimateTravelTime(state, targetNodeId)
 *   Returns the number of in-game phases a carriage trip to targetNodeId takes.
 *   A carriage is faster than walking: each edge takes half the normal phases
 *   (minimum 1), rounded up.
 *
 * CARRIAGE_COST_PER_PHASE: gold per phase of carriage travel (base rate).
 *   Total cost = phases × CARRIAGE_COST_PER_PHASE.
 *
 * hireCarriage(state, targetNodeId)
 *   Validates, deducts gold, skips the travel phases (carriage bypasses encounter
 *   rolls), moves player to the target node, emits CARRIAGE_HIRED.
 *   Throws on invalid target, insufficient gold, or non-adjacent node.
 */

import type { GameState, GameEvent } from '../state/gameState';
import { getEdge, getWorldNode } from '../data/worldGraph';

// ─── Constants (Task 26.14) ───────────────────────────────────────────────────

/** Gold per in-game phase of carriage travel. */
export const CARRIAGE_COST_PER_PHASE = 15;

// ─── estimateTravelTime (Task 26.15) ─────────────────────────────────────────

/**
 * Returns the estimated carriage travel phases to an adjacent WorldNode.
 * Carriage halves edge.travelPhases (rounded up, minimum 1).
 * Returns null when the node is not directly adjacent.
 */
export function estimateTravelTime(
  state:        GameState,
  targetNodeId: string,
): number | null {
  const edge = getEdge(state.world.currentNodeId, targetNodeId);
  if (!edge) return null;
  return Math.max(1, Math.ceil(edge.travelPhases / 2));
}

// ─── hireCarriage (Task 26.14) ────────────────────────────────────────────────

/**
 * Hires a carriage to the target adjacent node. No encounter rolls are made.
 * Travel phases are skipped (calendar does not advance by phase count;
 * the carriage is modelled as consuming 1 action, same as FAST_TRAVEL, so
 * the player can still act in the current phase).
 *
 * Guards:
 *   - Target node must be directly adjacent (edge exists).
 *   - Player must have enough gold: phases × CARRIAGE_COST_PER_PHASE.
 *
 * On success:
 *   - Deducts gold.
 *   - Updates world.currentNodeId + alias.
 *   - Emits CARRIAGE_HIRED + TRAVEL_NODE_REACHED + GOLD_CHANGED.
 */
export function hireCarriage(
  state:        GameState,
  targetNodeId: string,
): { state: GameState; events: GameEvent[]; narrative: string; phasesSkipped: number } {
  const events: GameEvent[] = [];

  const phases = estimateTravelTime(state, targetNodeId);
  if (phases === null) {
    throw new Error(`You can't hire a carriage to that location — it isn't directly connected.`);
  }

  const cost = phases * CARRIAGE_COST_PER_PHASE;
  if (state.player.gold < cost) {
    throw new Error(
      `The carriage driver wants ${cost}g for the trip. You only have ${state.player.gold}g.`,
    );
  }

  const targetNode = getWorldNode(targetNodeId);

  // Deduct gold
  state = {
    ...state,
    player: { ...state.player, gold: state.player.gold - cost },
  };
  events.push({ type: 'GOLD_CHANGED', delta: -cost, newAmount: state.player.gold });

  // Move to target node
  state = {
    ...state,
    world: {
      ...state.world,
      currentNodeId:     targetNodeId,
      currentLocationId: targetNodeId,
      discoveredNodeIds: state.world.discoveredNodeIds.includes(targetNodeId)
        ? state.world.discoveredNodeIds
        : [...state.world.discoveredNodeIds, targetNodeId],
    },
  };

  events.push({
    type:         'CARRIAGE_HIRED',
    fromNodeId:   state.world.currentNodeId,
    toNodeId:     targetNodeId,
    goldCost:     cost,
    phasesSkipped: phases,
  });
  events.push({ type: 'TRAVEL_NODE_REACHED', nodeId: targetNodeId });

  return {
    state,
    events,
    narrative: `You climb into the carriage and rattle off toward ${targetNode.name}. The journey takes ${phases} phase(s), costing ${cost}g.`,
    phasesSkipped: phases,
  };
}
