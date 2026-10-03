/**
 * crimeEngine.ts
 * Tasks 26.21–26.23 — Crime consequence hooks.
 *
 * Covers three crime types:
 *   THEFT   — pick-pocket, shop-lifting, looting a protected NPC
 *   ASSAULT — attacking a civilian or guard NPC
 *   MURDER  — killing a non-enemy humanoid
 *
 * Each crime:
 *   1. Applies an infamy delta to the current region (via infamyEngine).
 *   2. Emits CRIME_COMMITTED.
 *   3. If the resulting bounty tier is WANTED or above, checks for city-gate
 *      blocking (CITY_GATE_BLOCKED event) when the player is at a gated node.
 *
 * Pardon mechanic (Task 26.23):
 *   grantPardon(state, regionId, questId) — called by questEngine when a quest
 *   reward carries a pardon token; clears infamy in the region, emits PARDON_GRANTED.
 *
 * checkCityGate(state, destinationNodeId):
 *   Pure guard used by worldEngine.enterNode() and dispatcher.TRAVEL.
 *   Returns { blocked: boolean; reason?: string }.
 */

import type { GameState, GameEvent, RegionId } from '../state/gameState';
import { applyInfamyDelta, clearInfamy } from './infamyEngine';

// ─── Crime type ───────────────────────────────────────────────────────────────
export type CrimeType = 'THEFT' | 'ASSAULT' | 'MURDER';

// ─── Infamy deltas per crime type ────────────────────────────────────────────
const CRIME_INFAMY_DELTA: Record<CrimeType, number> = {
  THEFT:   10,
  ASSAULT: 20,
  MURDER:  35,
};

// ─── Gated settlement node ids ────────────────────────────────────────────────
// Nodes that have city gates and check bounty tier on entry.
// Full list deferred to Task 17.DATA; this stub array is non-empty so the
// gate check can be tested before world data is authored.
const GATED_SETTLEMENT_NODES = new Set<string>([
  'village_square',
  'enclave_citadel',
  'port_district',
  'merchant_quarter',
]);

// ─── commitCrime ──────────────────────────────────────────────────────────────

/**
 * Applies crime consequences for the given crimeType at the player's current
 * location. Emits CRIME_COMMITTED + optionally CITY_GATE_BLOCKED.
 */
export function commitCrime(
  state:     GameState,
  crimeType: CrimeType,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const events: GameEvent[] = [];

  // Resolve current region from the world node id.
  const regionId = _resolveRegionFromNode(state) as RegionId | null;
  if (!regionId) {
    return {
      state,
      events,
      narrative: `You commit a ${crimeType.toLowerCase()} but nobody seems to notice — you're off the map.`,
    };
  }

  const delta = CRIME_INFAMY_DELTA[crimeType];

  // Apply infamy
  const infamyResult = applyInfamyDelta(state, regionId, delta);
  state  = infamyResult.state;
  events.push(...infamyResult.events);

  events.push({ type: 'CRIME_COMMITTED', crimeType, regionId, infamyDelta: delta });

  // Narrative
  const narrativeByType: Record<CrimeType, string> = {
    THEFT:   `Your fingers find their mark. A witness stiffens. Infamy rises in ${regionId}.`,
    ASSAULT: `The guard doubles over. You've drawn blood in broad daylight. The region marks you.`,
    MURDER:  `It's done. The body won't stay hidden for long. Your infamy in ${regionId} spikes.`,
  };

  // City gate check — if current node is gated and player is now WANTED+, emit gate event.
  const currentTier = state.infamy.tiers[regionId] ?? 'NONE';
  if (
    GATED_SETTLEMENT_NODES.has(state.world.currentNodeId) &&
    (currentTier === 'WANTED' || currentTier === 'OUTLAW' || currentTier === 'CONDEMNED')
  ) {
    events.push({
      type:       'CITY_GATE_BLOCKED',
      nodeId:     state.world.currentNodeId,
      regionId,
      bountyTier: currentTier,
    });
  }

  return { state, events, narrative: narrativeByType[crimeType] };
}

// ─── checkCityGate ────────────────────────────────────────────────────────────

/**
 * Pure guard — called by the dispatcher before entering any gated settlement.
 * Returns { blocked: true, reason } when the player's bounty tier is WANTED
 * or above in the destination node's region.
 */
export function checkCityGate(
  state:           GameState,
  destinationNodeId: string,
): { blocked: boolean; reason?: string } {
  if (!GATED_SETTLEMENT_NODES.has(destinationNodeId)) {
    return { blocked: false };
  }

  // Try to resolve the destination region.
  const regionId = _resolveRegionFromNodeId(state, destinationNodeId);
  if (!regionId) return { blocked: false };

  const tier = state.infamy?.tiers?.[regionId] ?? 'NONE';
  if (tier === 'WANTED' || tier === 'OUTLAW' || tier === 'CONDEMNED') {
    return {
      blocked: true,
      reason:  `The city guard at the gate eyes you coldly. ` +
        `Your infamy in this region is too high to enter openly. ` +
        `Bounty tier: ${tier}.`,
    };
  }

  return { blocked: false };
}

// ─── grantPardon ──────────────────────────────────────────────────────────────

/**
 * Clears infamy in a region as a quest reward.
 * Called by questEngine.resolveQuestCompletion() when a reward has type 'PARDON'.
 * Emits PARDON_GRANTED + delegates to infamyEngine.clearInfamy().
 */
export function grantPardon(
  state:    GameState,
  regionId: RegionId,
  questId:  string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const clearResult = clearInfamy(state, regionId);
  const events: GameEvent[] = [
    ...clearResult.events,
    { type: 'PARDON_GRANTED', regionId, questId },
  ];
  return {
    state:     clearResult.state,
    events,
    narrative: `Your crimes in ${regionId} have been formally pardoned by Enclave decree. Your slate is clean.`,
  };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function _resolveRegionFromNode(state: GameState): string | null {
  return _resolveRegionFromNodeId(state, state.world.currentNodeId);
}

function _resolveRegionFromNodeId(state: GameState, nodeId: string): string | null {
  // Check reputation keys for a prefix match (same heuristic as dispatcher.ts).
  const parts = nodeId.split('_');
  for (let i = parts.length - 1; i >= 1; i--) {
    const candidate = parts.slice(0, i).join('_');
    if (Object.prototype.hasOwnProperty.call(state.reputation, candidate)) {
      return candidate;
    }
  }
  if (Object.prototype.hasOwnProperty.call(state.reputation, nodeId)) {
    return nodeId;
  }
  return null;
}
