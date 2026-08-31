/**
 * partyEngine.ts
 * Party management — add/remove companions, derive companion stats,
 * sync vitals between PartyMember and NpcCharacter in contacts.
 *
 * Tasks 3b.5–3b.8.
 *
 * Design (PRD §4.1.2):
 *   - Up to settings.partyMaxSize (default 3) companions active at once.
 *   - Each PartyMember holds LIVE vitals and a derived CombatStats snapshot.
 *   - NpcCharacter.vitals (in contacts[]) is the authoritative record;
 *     syncPartyVitals() writes PartyMember live values back after each encounter.
 *   - Companion STR/AGI/WIS/DEF/LCK are derived from their HumanoidCharacter
 *     background, occupation, race, and companionLevel — not stored as raw stats.
 */

import type {
  GameState,
  GameEvent,
  PartyMember,
  PartyState,
  CombatStats,
  CharacterVitals,
  NpcCharacter,
  ContactRecord,
} from '../state/gameState';

// ─── Companion stat derivation (Task 3b.8) ────────────────────────────────────
/**
 * Derives CombatStats for a companion from their NpcCharacter base.
 * The actual values are placeholder formulas; replace with real design data
 * once background/occupation/race stat tables are defined (Task 3a.8).
 *
 * Until spawn-engine types are wired in (Task 3a.8), we use the companionLevel
 * field as the sole scaling factor with a flat base.
 */
export function deriveCompanionStats(npc: NpcCharacter): CombatStats {
  // TODO (Task 3a.8): read npc.background (occupation, socialClass) and npc.race
  // to apply per-occupation and per-race base stat tables.
  // Placeholder: flat base 8 + 1 per companion level.
  const base = 8 + npc.companionLevel;
  return {
    str: base,
    agi: base,
    wis: base,
    def: base,
    lck: base,
  };
}

/**
 * Derives initial vitals for a companion PartyMember from their NpcCharacter.
 * Uses NpcCharacter.vitals as the authoritative source.
 */
function deriveInitialVitals(npc: NpcCharacter): CharacterVitals {
  // NpcCharacter.vitals is typed as CharacterVitals in the hierarchy.
  // Cast is safe: all HumanoidCharacter subtypes carry vitals.
  return { ...(npc.vitals as unknown as CharacterVitals) };
}

// ─── Add companion (Task 3b.5) ────────────────────────────────────────────────
/**
 * Moves an NPC from contacts into the active party.
 * Fails (returns unchanged state + error event) if:
 *   - party is already at maxSize
 *   - npcId is not in contacts
 *   - companion is already in the party
 */
export function addCompanion(
  gameState: GameState,
  npcId: string,
): { state: GameState; events: GameEvent[] } {
  const { party, contacts } = gameState;

  if (party.companions.length >= party.maxSize) {
    // Caller should surface this as a UI message; we return state unchanged.
    return { state: gameState, events: [] };
  }

  if (party.companions.some(m => m.npcId === npcId)) {
    return { state: gameState, events: [] };
  }

  const record = contacts.find(r => r.character.npcId === npcId);
  if (!record) {
    return { state: gameState, events: [] };
  }

  const npc = record.character;
  const member: PartyMember = {
    npcId,
    vitals:              deriveInitialVitals(npc),
    stats:               deriveCompanionStats(npc),
    activeStatusEffects: [],
    isDown:              false,
    equippedWeaponId:    undefined,
    equippedArmorId:     undefined,
  };

  const newParty: PartyState = {
    ...party,
    companions: [...party.companions, member],
  };

  return {
    state:  { ...gameState, party: newParty },
    events: [{ type: 'COMPANION_ADDED', npcId }],
  };
}

// ─── Remove companion (Task 3b.6) ─────────────────────────────────────────────
/**
 * Removes a companion from the active party.
 * Syncs their current vitals back to NpcCharacter before removing.
 */
export function removeCompanion(
  gameState: GameState,
  npcId: string,
): { state: GameState; events: GameEvent[] } {
  const member = gameState.party.companions.find(m => m.npcId === npcId);
  if (!member) return { state: gameState, events: [] };

  // Sync vitals back to NpcCharacter in contacts before removal
  let state = syncSingleMemberVitals(gameState, npcId);

  const newParty: PartyState = {
    ...state.party,
    companions: state.party.companions.filter(m => m.npcId !== npcId),
  };

  return {
    state:  { ...state, party: newParty },
    events: [{ type: 'COMPANION_REMOVED', npcId }],
  };
}

// ─── Sync party vitals (Task 3b.7) ────────────────────────────────────────────
/**
 * Writes every active PartyMember's live vitals back into their NpcCharacter
 * in contacts[]. Call after each combat encounter resolves.
 */
export function syncPartyVitals(gameState: GameState): GameState {
  let state = gameState;
  for (const member of state.party.companions) {
    state = syncSingleMemberVitals(state, member.npcId);
  }
  return state;
}

/** Internal: syncs one companion's vitals into contacts[]. */
function syncSingleMemberVitals(gameState: GameState, npcId: string): GameState {
  const member = gameState.party.companions.find(m => m.npcId === npcId);
  if (!member) return gameState;

  const contacts: ContactRecord[] = gameState.contacts.map(record => {
    if (record.character.npcId !== npcId) return record;
    return {
      ...record,
      character: {
        ...record.character,
        vitals: { ...member.vitals } as unknown as NpcCharacter['vitals'],
      },
    };
  });

  return { ...gameState, contacts };
}

// ─── Companion down / revive (Task 3b.9) ──────────────────────────────────────
/**
 * Marks a companion as downed (HP = 0 in their PartyMember vitals).
 * Called by the combat engine when a companion's HP reaches 0.
 */
export function downCompanion(
  gameState: GameState,
  npcId: string,
): { state: GameState; events: GameEvent[] } {
  const companions = gameState.party.companions.map(m =>
    m.npcId === npcId
      ? { ...m, isDown: true, vitals: { ...m.vitals, hp: { ...m.vitals.hp, current: 0 } } }
      : m,
  );

  return {
    state:  { ...gameState, party: { ...gameState.party, companions } },
    events: [{ type: 'COMPANION_DOWNED', npcId }],
  };
}

/**
 * Revives all downed companions to 1 HP after combat ends (unless party wiped).
 * Call this from the combat engine's post-combat resolution step.
 */
export function reviveDownedCompanions(gameState: GameState): GameState {
  const companions = gameState.party.companions.map(m =>
    m.isDown
      ? { ...m, isDown: false, vitals: { ...m.vitals, hp: { ...m.vitals.hp, current: 1 } } }
      : m,
  );
  return { ...gameState, party: { ...gameState.party, companions } };
}

// ─── Party wipe check (Task 3b.10) ────────────────────────────────────────────
/**
 * Returns true when every combatant on the player's side is out of the fight.
 * The combat engine calls this after each action resolution.
 */
export function isPartyWiped(gameState: GameState): boolean {
  const playerDown = gameState.player.vitals.hp.current <= 0;
  const allCompanionsDown = gameState.party.companions.every(m => m.isDown);
  return playerDown && (gameState.party.companions.length === 0 || allCompanionsDown);
}

// ─── Phase-advance passive recovery (PRD §4.1.2 / §4.7) ──────────────────────
/**
 * Applies +20% of max Stamina and CPW to all party members on phase advance.
 * Called by calendarEngine.advancePhase() before the direct-advance (sleep) path.
 */
export function applyPhaseRecoveryToParty(
  gameState: GameState,
  recoveryRate = 0.2,
): GameState {
  // Apply to player
  const playerVitals = applyRecoveryToVitals(gameState.player.vitals, recoveryRate);
  const player = { ...gameState.player, vitals: playerVitals };

  // Apply to companions
  const companions = gameState.party.companions.map(m => ({
    ...m,
    vitals: applyRecoveryToVitals(m.vitals, recoveryRate),
  }));

  return { ...gameState, player, party: { ...gameState.party, companions } };
}

function applyRecoveryToVitals(vitals: CharacterVitals, rate: number): CharacterVitals {
  return {
    ...vitals,
    stamina: {
      ...vitals.stamina,
      current: Math.min(vitals.stamina.max, vitals.stamina.current + Math.floor(vitals.stamina.max * rate)),
    },
    cpw: {
      ...vitals.cpw,
      current: Math.min(vitals.cpw.max, vitals.cpw.current + Math.floor(vitals.cpw.max * rate)),
    },
  };
}

// ─── Full party sleep restore ──────────────────────────────────────────────────
/**
 * Fully restores HP/Stamina/CPW and resets fatigue for player and all companions.
 * Called by calendarEngine.resolveSleep().
 */
export function applyFullRestoreToParty(gameState: GameState): GameState {
  const player = {
    ...gameState.player,
    vitals: fullRestore(gameState.player.vitals),
  };

  const companions = gameState.party.companions.map(m => ({
    ...m,
    isDown: false,
    vitals:  fullRestore(m.vitals),
  }));

  return { ...gameState, player, party: { ...gameState.party, companions } };
}

function fullRestore(vitals: CharacterVitals): CharacterVitals {
  return {
    ...vitals,
    hp:      { ...vitals.hp,      current: vitals.hp.max      },
    stamina: { ...vitals.stamina, current: vitals.stamina.max  },
    cpw:     { ...vitals.cpw,     current: vitals.cpw.max      },
    fatigue: 0,
  };
}
