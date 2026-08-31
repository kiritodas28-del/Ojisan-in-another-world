/**
 * relationshipEngine.ts
 * Trust/Love matrix, gift giving, flirt/touch diminishing returns, move-in eligibility.
 *
 * TODO (Tasks 9.2–9.6): Full implementation.
 *
 * Trust & Love: each -100 to +100; both live on NpcCharacter (PRD §4.1.1).
 * Band thresholds (PRD §4.4):
 *   Low      = -100 to -25
 *   Neutral  = -25  to  25
 *   High     =  25  to  75
 *   VeryHigh =  75  to 100
 *
 * 16-cell matrix (TrustBand × LoveBand) → RelationshipStatus label + available interactions
 *
 * Flirt/Touch: max 3 per character per day; counters (flirtCountToday/touchCountToday on NpcCharacter)
 *              reset via resetDailySocialCounters() at day-end.
 * Move-in eligibility: Trust >= 60 AND Love >= 60 (or per-character override).
 */

import type { GameState, GameEvent, ContactRecord, NpcCharacter } from '../state/gameState';

// ─── Band types ───────────────────────────────────────────────────────────────
export type TrustBand = 'Low' | 'Neutral' | 'High' | 'VeryHigh';
export type LoveBand  = 'Low' | 'Neutral' | 'High' | 'VeryHigh';

export type RelationshipStatus =
  | 'Enemy'         // Low Trust, Low Love
  | 'Feared'        // Low Trust, Neutral Love
  | 'Hostile'       // Low Trust, High Love
  | 'Obsessive'     // Low Trust, VeryHigh Love
  | 'Wary'          // Neutral Trust, Low Love
  | 'Stranger'      // Neutral Trust, Neutral Love
  | 'Acquaintance'  // Neutral Trust, High Love
  | 'Infatuated'    // Neutral Trust, VeryHigh Love
  | 'Respectful'    // High Trust, Low Love
  | 'Friend'        // High Trust, Neutral Love
  | 'Close'         // High Trust, High Love
  | 'Devoted'       // High Trust, VeryHigh Love
  | 'Ally'          // VeryHigh Trust, Low Love
  | 'Confidant'     // VeryHigh Trust, Neutral Love
  | 'Lover'         // VeryHigh Trust, High Love
  | 'Bonded';       // VeryHigh Trust, VeryHigh Love

// ─── Band helpers ─────────────────────────────────────────────────────────────
export function getTrustBand(trust: number): TrustBand {
  if (trust < -25) return 'Low';
  if (trust < 25)  return 'Neutral';
  if (trust < 75)  return 'High';
  return 'VeryHigh';
}

export function getLoveBand(love: number): LoveBand {
  if (love < -25) return 'Low';
  if (love < 25)  return 'Neutral';
  if (love < 75)  return 'High';
  return 'VeryHigh';
}

export function getRelationshipStatus(trust: number, love: number): RelationshipStatus {
  // TODO (Task 9.2): implement full 16-cell matrix lookup
  void trust; void love;
  throw new Error('getRelationshipStatus() not yet implemented');
}

// ─── Gift mechanic (stub — Task 9.4) ─────────────────────────────────────────
/** +10 Trust, +15 Love on NpcCharacter; consumes item from player inventory. */
export function resolveGift(
  _gameState: GameState,
  _itemId: string,
  _npcId: string,
): { state: GameState; events: GameEvent[] } {
  throw new Error('resolveGift() not yet implemented');
}

// ─── Flirt/Touch (stub — Task 9.3) ───────────────────────────────────────────
export type SocialAction = 'FLIRT' | 'TOUCH';

export function resolveSocialAction(
  _gameState: GameState,
  _npcId: string,
  _action: SocialAction,
): { state: GameState; events: GameEvent[]; narrative: string } {
  // Reads NpcCharacter.flirtCountToday / touchCountToday; rejects at >= 3
  throw new Error('resolveSocialAction() not yet implemented');
}

// ─── Move-in eligibility (Task 9.5 — implemented) ────────────────────────────
/** Trust/Love live on NpcCharacter; reads directly from contact.character. */
export function isMoveInEligible(contact: ContactRecord): boolean {
  const npc: NpcCharacter = contact.character;
  return npc.trust >= 60 && npc.love >= 60;
  // TODO: per-NPC override thresholds (add optional fields to NpcCharacter)
}

// ─── Post-intimacy relationship update (stub — Task 9.6) ─────────────────────
export function applyPostSceneRelationshipDelta(
  _gameState: GameState,
  _npcId: string,
  _satisfaction: number,
): { state: GameState; events: GameEvent[] } {
  throw new Error('applyPostSceneRelationshipDelta() not yet implemented');
}

// ─── Daily counter reset (called by calendarEngine day-end tick step 7) ───────
/** Resets flirtCountToday and touchCountToday on every NpcCharacter in contacts. */
export function resetDailySocialCounters(gameState: GameState): GameState {
  const contacts = gameState.contacts.map(record => ({
    ...record,
    character: {
      ...record.character,
      flirtCountToday: 0,
      touchCountToday: 0,
    },
  }));
  return { ...gameState, contacts };
}
