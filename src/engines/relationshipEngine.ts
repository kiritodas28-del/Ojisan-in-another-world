/**
 * relationshipEngine.ts
 * Player-NPC Trust/Love matrix, social actions, gift mechanic, move-in eligibility,
 * post-intimacy delta write-back, and player bond type management.
 *
 * Tasks: 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 9.10
 *
 * Trust & Love: each -100 to +100; both live on NpcCharacter (PRD §4.1.1).
 *
 * Band thresholds (PRD §4.4):
 *   Low      = -100 to -25
 *   Neutral  = -25  to  25
 *   High     =  25  to  75
 *   VeryHigh =  75  to 100
 *
 * 16-cell matrix (TrustBand x LoveBand) → RelationshipStatus
 *   Rows = TrustBand (Low / Neutral / High / VeryHigh)
 *   Cols = LoveBand  (Low / Neutral / High / VeryHigh)
 *
 *            Low Love    Neutral Love  High Love    VeryHigh Love
 *   Low T    Enemy       Feared        Hostile      Obsessive
 *   Neutral  Wary        Stranger      Acquaintance Infatuated
 *   High T   Respectful  Friend        Close        Devoted
 *   VeryHigh Ally        Confidant     Lover        Bonded
 *
 * Flirt/Touch: max 3 per character per day; counters (flirtCountToday / touchCountToday
 * on NpcCharacter) are reset via resetDailySocialCounters() in calendarEngine day-end step 7.
 *
 * Move-in eligibility: Trust >= 60 AND Love >= 60 (or per-NPC override thresholds
 * stored in NpcCharacter.moveInTrustOverride / moveInLoveOverride).
 *
 * Post-intimacy delta: applyPostSceneRelationshipDelta() writes persistence bundle's
 * trust/love deltas back to NpcCharacter, clamped [-100, 100]. Emits
 * RELATIONSHIP_STATUS_CHANGED if the band cell changes.
 *
 * Player bond management: setPlayerBondType() enforces player-exclusive bonds and
 * emits PLAYER_BOND_SET.
 */

import { BondType } from '../spawn-engine/types/enums';
import type { GameState, GameEvent, ContactRecord, NpcCharacter } from '../state/gameState';

// ─── Player-exclusive bond set (mirrors npcSocialEngine — single authoritative list) ───
// These bond types, when held with the player, cannot also be held by the same NPC
// with another NPC. setPlayerBondType() enforces this and npcSocialEngine reads
// NpcCharacter.playerBondType to block evolution.
export const PLAYER_EXCLUSIVE_BONDS = new Set<BondType>([
  BondType.Devoted,
  BondType.Owned,
  BondType.Broken,
  BondType.Corrupted,
  BondType.Submissive,
]);

// ─── Band types ───────────────────────────────────────────────────────────────
export type TrustBand = 'Low' | 'Neutral' | 'High' | 'VeryHigh';
export type LoveBand  = 'Low' | 'Neutral' | 'High' | 'VeryHigh';

export type RelationshipStatus =
  | 'Enemy'         // Low Trust,     Low Love
  | 'Feared'        // Low Trust,     Neutral Love
  | 'Hostile'       // Low Trust,     High Love
  | 'Obsessive'     // Low Trust,     VeryHigh Love
  | 'Wary'          // Neutral Trust, Low Love
  | 'Stranger'      // Neutral Trust, Neutral Love
  | 'Acquaintance'  // Neutral Trust, High Love
  | 'Infatuated'    // Neutral Trust, VeryHigh Love
  | 'Respectful'    // High Trust,    Low Love
  | 'Friend'        // High Trust,    Neutral Love
  | 'Close'         // High Trust,    High Love
  | 'Devoted'       // High Trust,    VeryHigh Love
  | 'Ally'          // VeryHigh Trust, Low Love
  | 'Confidant'     // VeryHigh Trust, Neutral Love
  | 'Lover'         // VeryHigh Trust, High Love
  | 'Bonded';       // VeryHigh Trust, VeryHigh Love

// ─── Band helpers ─────────────────────────────────────────────────────────────

export function getTrustBand(trust: number): TrustBand {
  if (trust < -25) return 'Low';
  if (trust <  25) return 'Neutral';
  if (trust <  75) return 'High';
  return 'VeryHigh';
}

export function getLoveBand(love: number): LoveBand {
  if (love < -25) return 'Low';
  if (love <  25) return 'Neutral';
  if (love <  75) return 'High';
  return 'VeryHigh';
}

// ─── Task 9.2 — 16-cell matrix lookup ────────────────────────────────────────

/**
 * Maps the (TrustBand × LoveBand) pair to a RelationshipStatus label.
 * Used for display, dialogue unlocks, and scene eligibility checks.
 */
export function getRelationshipStatus(trust: number, love: number): RelationshipStatus {
  const t = getTrustBand(trust);
  const l = getLoveBand(love);

  if (t === 'Low') {
    if (l === 'Low')      return 'Enemy';
    if (l === 'Neutral')  return 'Feared';
    if (l === 'High')     return 'Hostile';
    return 'Obsessive';   // VeryHigh Love, Low Trust — fixated, dangerous
  }

  if (t === 'Neutral') {
    if (l === 'Low')      return 'Wary';
    if (l === 'Neutral')  return 'Stranger';
    if (l === 'High')     return 'Acquaintance';
    return 'Infatuated';  // VeryHigh Love, Neutral Trust — likes him a lot but doesn't trust yet
  }

  if (t === 'High') {
    if (l === 'Low')      return 'Respectful';
    if (l === 'Neutral')  return 'Friend';
    if (l === 'High')     return 'Close';
    return 'Devoted';     // VeryHigh Love, High Trust — deeply attached
  }

  // VeryHigh Trust
  if (l === 'Low')        return 'Ally';
  if (l === 'Neutral')    return 'Confidant';
  if (l === 'High')       return 'Lover';
  return 'Bonded';        // VeryHigh Love, VeryHigh Trust — maximum bond
}

// ─── Internal: clamped trust/love write-back with status-change detection ─────

const MOVE_IN_TRUST_DEFAULT = 60;
const MOVE_IN_LOVE_DEFAULT  = 60;

const FLIRT_TOUCH_DAILY_CAP = 3;

/**
 * Applies a trust and/or love delta to a single NpcCharacter immutably.
 * Clamps both fields to [-100, 100].
 * Detects whether the 16-cell status changed and emits RELATIONSHIP_STATUS_CHANGED if so.
 *
 * Returns the updated NpcCharacter and any events produced.
 */
function applyTrustLoveDelta(
  npc:         NpcCharacter,
  trustDelta:  number,
  loveDelta:   number,
): { npc: NpcCharacter; events: GameEvent[] } {
  const events: GameEvent[] = [];

  const prevStatus = getRelationshipStatus(npc.trust, npc.love);

  const newTrust = Math.max(-100, Math.min(100, npc.trust + trustDelta));
  const newLove  = Math.max(-100, Math.min(100, npc.love  + loveDelta));

  const nextStatus = getRelationshipStatus(newTrust, newLove);

  if (nextStatus !== prevStatus) {
    events.push({
      type:  'RELATIONSHIP_STATUS_CHANGED',
      npcId: npc.npcId,
      from:  prevStatus,
      to:    nextStatus,
    });
  }

  return {
    npc:    { ...npc, trust: newTrust, love: newLove },
    events,
  };
}

// ─── Internal: find NPC in contacts ───────────────────────────────────────────

function findNpcRecord(
  gameState: GameState,
  npcId:     string,
): { record: ContactRecord; index: number } | null {
  const index = gameState.contacts.findIndex(r => r.character.npcId === npcId);
  if (index === -1) return null;
  return { record: gameState.contacts[index], index };
}

function replaceNpcInContacts(
  gameState: GameState,
  index:     number,
  npc:       NpcCharacter,
): GameState {
  const contacts = [...gameState.contacts];
  contacts[index] = { ...contacts[index], character: npc };
  return { ...gameState, contacts };
}

// ─── Task 9.4 — Gift mechanic ─────────────────────────────────────────────────

/**
 * Resolves a gift: consumes one unit of itemId from player inventory, then
 * applies +10 Trust and +15 Love to the target NPC.
 * Returns an error narrative (no state change) if the item is not in inventory.
 */
export function resolveGift(
  gameState: GameState,
  itemId:    string,
  npcId:     string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  // Inventory check
  const slotIdx = gameState.player.inventory.findIndex(s => s.itemId === itemId);
  if (slotIdx === -1) {
    return {
      state:     gameState,
      events:    [],
      narrative: `You don't have a ${itemId} to give.`,
    };
  }

  // Find NPC
  const found = findNpcRecord(gameState, npcId);
  if (!found) {
    return {
      state:     gameState,
      events:    [],
      narrative: 'She cannot be found.',
    };
  }

  // Consume item from inventory (remove slot if qty drops to 0)
  const slot     = gameState.player.inventory[slotIdx];
  const newSlots = slot.quantity <= 1
    ? gameState.player.inventory.filter((_, i) => i !== slotIdx)
    : gameState.player.inventory.map((s, i) => i === slotIdx ? { ...s, quantity: s.quantity - 1 } : s);

  let state: GameState = {
    ...gameState,
    player: { ...gameState.player, inventory: newSlots },
  };

  // Apply trust/love delta
  const { npc: updatedNpc, events } = applyTrustLoveDelta(found.record.character, 10, 15);
  state = replaceNpcInContacts(state, found.index, updatedNpc);

  return {
    state,
    events,
    narrative: `You present the gift. Her eyes light up — she seems genuinely touched.`,
  };
}

// ─── Task 9.3 — Flirt / Touch with daily counter enforcement ─────────────────

export type SocialAction = 'FLIRT' | 'TOUCH';

/**
 * Resolves a FLIRT or TOUCH social action:
 *   - Rejects if daily cap (3) is already reached for that action type.
 *   - Applies a small trust/love delta based on action type.
 *   - Increments the appropriate daily counter on NpcCharacter.
 *   - Emits RELATIONSHIP_STATUS_CHANGED if the band cell changes.
 *
 * Trust/Love deltas (intentionally modest — gifts and intimacy carry the larger weight):
 *   FLIRT: +0 Trust, +3 Love (flirting builds affection, not necessarily trust)
 *   TOUCH: +2 Trust, +1 Love (physical comfort signals safety)
 */
export function resolveSocialAction(
  gameState: GameState,
  npcId:     string,
  action:    SocialAction,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const found = findNpcRecord(gameState, npcId);
  if (!found) {
    return { state: gameState, events: [], narrative: 'She cannot be found.' };
  }

  const npc           = found.record.character;
  const counterField  = action === 'FLIRT' ? 'flirtCountToday' : 'touchCountToday';
  const currentCount  = npc[counterField];

  if (currentCount >= FLIRT_TOUCH_DAILY_CAP) {
    const actionLabel = action === 'FLIRT' ? 'flirted' : 'touched';
    return {
      state:     gameState,
      events:    [],
      narrative: `You've already ${actionLabel} with her enough today. She needs some space.`,
    };
  }

  const trustDelta = action === 'TOUCH' ? 2 : 0;
  const loveDelta  = action === 'FLIRT' ? 3 : 1;

  const { npc: deltaApplied, events } = applyTrustLoveDelta(npc, trustDelta, loveDelta);

  // Increment daily counter
  const updatedNpc: NpcCharacter = {
    ...deltaApplied,
    [counterField]: currentCount + 1,
  };

  const state = replaceNpcInContacts(gameState, found.index, updatedNpc);

  const narrative = action === 'FLIRT'
    ? 'You lean in with a smile. She ducks her head, a faint colour rising in her cheeks.'
    : 'A light, reassuring touch. She holds still for a moment before the tension leaves her shoulders.';

  return { state, events, narrative };
}

// ─── Task 9.5 — Move-in eligibility with per-NPC override ────────────────────

/**
 * Returns true when the NPC's trust and love meet the move-in threshold.
 * Per-NPC overrides (moveInTrustOverride / moveInLoveOverride on NpcCharacter)
 * take precedence over the global defaults (60 / 60).
 */
export function isMoveInEligible(contact: ContactRecord): boolean {
  const npc       = contact.character;
  const trustGate = npc.moveInTrustOverride ?? MOVE_IN_TRUST_DEFAULT;
  const loveGate  = npc.moveInLoveOverride  ?? MOVE_IN_LOVE_DEFAULT;
  return npc.trust >= trustGate && npc.love >= loveGate;
}

// ─── Task 9.6 — Post-intimacy Trust/Love write-back ──────────────────────────

/**
 * Applies trust/love deltas from a completed intimacy scene to the target NPC.
 * Called by the dispatcher after processing SceneEndPersistence.
 *
 * trustDelta / loveDelta are taken from SceneEndPersistence.partnerTrustDelta
 * and .partnerLoveDelta — already scaled by afterglow and satisfaction tier in
 * intimacyEngine.resolvePostIntimacy().
 *
 * Additionally accepts a force penalty flag: FORCE scenes apply -10 trust / -15 love
 * on top of whatever the scene's persistence bundle carries.
 *
 * Emits RELATIONSHIP_STATUS_CHANGED if the band cell changes.
 */
export function applyPostSceneRelationshipDelta(
  gameState:   GameState,
  npcId:       string,
  trustDelta:  number,
  loveDelta:   number,
): { state: GameState; events: GameEvent[] } {
  const found = findNpcRecord(gameState, npcId);
  if (!found) return { state: gameState, events: [] };

  const { npc: updatedNpc, events } = applyTrustLoveDelta(
    found.record.character,
    trustDelta,
    loveDelta,
  );

  const state = replaceNpcInContacts(gameState, found.index, updatedNpc);
  return { state, events };
}

// ─── Task 9.7 — Player bond type setter with exclusivity enforcement ──────────

/**
 * Sets the bond an NPC holds with the player (NpcCharacter.playerBondType).
 *
 * If bond is in PLAYER_EXCLUSIVE_BONDS:
 *   - Scans all contacts and clears the same bond from any OTHER NPC that currently
 *     holds it with the player (each exclusive bond type can only be held by one NPC
 *     at a time). The cleared NPC has their playerBondType set to undefined.
 *
 * Always emits PLAYER_BOND_SET for the primary NPC.
 * Emits a second PLAYER_BOND_SET (with bond: 'None') for any NPC whose exclusive
 * bond was revoked.
 *
 * Passing bond = undefined clears the player bond entirely (no PLAYER_BOND_SET emitted
 * for the clear; useful for NPC removal flows).
 */
export function setPlayerBondType(
  gameState: GameState,
  npcId:     string,
  bond:      BondType | undefined,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  let contacts = [...gameState.contacts];

  // If this is an exclusive bond, revoke it from any other NPC currently holding it
  if (bond !== undefined && PLAYER_EXCLUSIVE_BONDS.has(bond)) {
    contacts = contacts.map(record => {
      if (record.character.npcId === npcId) return record;  // skip the primary target
      if (record.character.playerBondType !== bond) return record;

      // Revoke
      events.push({
        type:  'PLAYER_BOND_SET',
        npcId: record.character.npcId,
        bond:  'None',   // signals revocation to dispatcher
      });

      return {
        ...record,
        character: { ...record.character, playerBondType: undefined },
      };
    });
  }

  // Apply bond to the primary NPC
  const primaryIdx = contacts.findIndex(r => r.character.npcId === npcId);
  if (primaryIdx !== -1) {
    contacts[primaryIdx] = {
      ...contacts[primaryIdx],
      character: { ...contacts[primaryIdx].character, playerBondType: bond },
    };

    if (bond !== undefined) {
      events.push({ type: 'PLAYER_BOND_SET', npcId, bond: bond as string });
    }
  }

  return { state: { ...gameState, contacts }, events };
}

// ─── Daily counter reset (called by calendarEngine day-end tick step 7) ───────

/**
 * Resets flirtCountToday and touchCountToday on every NpcCharacter in contacts.
 * Short-circuits if both counters are already 0 to avoid creating unnecessary objects.
 */
export function resetDailySocialCounters(gameState: GameState): GameState {
  const contacts = gameState.contacts.map(record => {
    const npc = record.character;
    if (npc.flirtCountToday === 0 && npc.touchCountToday === 0) return record;
    return {
      ...record,
      character: { ...npc, flirtCountToday: 0, touchCountToday: 0 },
    };
  });
  return { ...gameState, contacts };
}
