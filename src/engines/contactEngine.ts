/**
 * contactEngine.ts
 * Phase 21 — Contact & Profile Engine (PRD §4.19)
 *
 * Thin aggregation layer over existing NPC state. No new GameState fields.
 * All functions are pure reads; no events emitted; no state mutations.
 *
 * Tasks:
 *   21.1  assembleProfileView(gameState, npcId): ContactProfileView
 *   21.2  sortContacts(gameState): ContactRecord[]
 *   21.3  getContactCount(gameState): number
 *   21.4  findContact(gameState, npcId): NpcCharacter | undefined
 *   21.5  getContactsByLocation(gameState, nodeId): NpcCharacter[]
 */

import type { GameState, ContactRecord, NpcCharacter, ContactProfileView } from '../state/gameState';
import { getRelationshipStatus } from './relationshipEngine';
import { resolveNpcLocation }    from './npcPopulationEngine';
import type { DayPhase }         from '../state/gameState';

// ─── Task 21.4 — Find a single contact by npcId ───────────────────────────────

/**
 * Looks up an NPC in gameState.contacts by their npcId.
 * Returns undefined if the NPC is not in the contact list.
 */
export function findContact(gameState: GameState, npcId: string): NpcCharacter | undefined {
  return gameState.contacts.find(c => c.character.npcId === npcId)?.character;
}

// ─── Task 21.3 — Contact count ────────────────────────────────────────────────

/**
 * Returns the current number of entries in the contact list.
 * Used to enforce the cap before tryAddContact() is called.
 */
export function getContactCount(gameState: GameState): number {
  return gameState.contacts.length;
}

// ─── Task 21.2 — Sort contacts ────────────────────────────────────────────────

/**
 * Returns a sorted copy of contacts[] for the ContactsView directory.
 *
 * Sort order:
 *   Primary   — companion quest milestone stage descending
 *               (companions with higher companionLevel sort first; non-companions last)
 *   Secondary — relationship magnitude (trust + love) descending
 *
 * Does not mutate gameState.contacts.
 */
export function sortContacts(gameState: GameState): ContactRecord[] {
  return [...gameState.contacts].sort((a, b) => {
    const npcA = a.character;
    const npcB = b.character;

    // Companions (companionLevel > 0) sort above non-companions.
    // Among companions, higher companionLevel means further in the companion arc.
    const isCompA = npcA.companionLevel > 0 ? 1 : 0;
    const isCompB = npcB.companionLevel > 0 ? 1 : 0;
    if (isCompA !== isCompB) return isCompB - isCompA; // companions first

    // Among companions: higher stage (level) first
    if (isCompA && isCompB) {
      const stageDiff = npcB.companionLevel - npcA.companionLevel;
      if (stageDiff !== 0) return stageDiff;
    }

    // Tiebreak: relationship magnitude descending
    const magA = npcA.trust + npcA.love;
    const magB = npcB.trust + npcB.love;
    return magB - magA;
  });
}

// ─── Task 21.5 — Contacts by location ────────────────────────────────────────

/**
 * Returns all NpcCharacters whose schedule resolves to the given nodeId
 * on the current calendar day and phase.
 *
 * Used by InspectorLens (UI-5.7) to populate the entity stack for the
 * tile the player is currently in.
 *
 * NPCs with no scheduleId are excluded (their location is indeterminate).
 * NPCs whose schedule cannot be looked up are also excluded.
 *
 * @param gameState  Full game state (provides calendar and contacts)
 * @param nodeId     WorldNode id to filter by (matches WorldState.currentNodeId)
 * @param schedules  Optional schedule registry (keyed by scheduleId). When omitted,
 *                   the function falls back to NpcCharacter.scheduleId === nodeId
 *                   as a simplified stub until schedules are authored (Task 17.DATA).
 */
export function getContactsByLocation(
  gameState:  GameState,
  nodeId:     string,
  schedules?: Record<string, import('../state/gameState').NpcScheduleDef>,
): NpcCharacter[] {
  const { calendar } = gameState;

  return gameState.contacts
    .map(c => c.character)
    .filter(npc => {
      if (!npc.scheduleId) return false;

      // Full resolution when schedule registry is provided
      if (schedules) {
        const schedule = schedules[npc.scheduleId];
        if (!schedule) return false;
        const resolved = resolveNpcLocation(schedule, calendar.day, calendar.phase as DayPhase);
        return resolved === nodeId;
      }

      // Simplified fallback: treat scheduleId as the location id directly.
      // This works for the pre-data-authored phase where scheduleIds equal locationIds.
      return npc.scheduleId === nodeId;
    });
}

// ─── Task 21.1 — Assemble profile view ───────────────────────────────────────

/**
 * Aggregates all display fields for the ContactsView deep-profile panel into a
 * single flat ContactProfileView DTO.
 *
 * Calling convention:
 *   - If the NPC is not found in contacts[], returns null.
 *   - All spawn-engine fields that are still typed `unknown` are passed through
 *     as-is; the UI casts them once Task 3a.8 resolves the real types.
 *   - Boolean derived flags (isVirgin, isPregnant, lactationActive) are computed
 *     here so no engine logic bleeds into the rendering layer.
 *
 * Tab mapping:
 *   Tab 1 (Social/Bio):      trust, love, status, bond, background, parents, companionLevel
 *   Tab 2 (Physical):        measurements, physicalDetail, gender, race, body type, derived flags
 *   Tab 3 (Psychology):      personality, sexualPsychology (kinks + resistance profile inside)
 */
export function assembleProfileView(
  gameState: GameState,
  npcId:     string,
): ContactProfileView | null {
  const npc = findContact(gameState, npcId);
  if (!npc) return null;

  // ── Tab 1: Social / Bio ────────────────────────────────────────────────────

  const relationshipStatus = getRelationshipStatus(npc.trust, npc.love);

  // background is typed unknown; probe it safely with a cast to any.
  const bg          = npc.background as { occupation?: string; regionOfOrigin?: string } | null | undefined;
  const occupation  = bg?.occupation     ?? undefined;
  const regionOfOrigin = bg?.regionOfOrigin ?? undefined;

  // history is typed unknown; probe for parent names safely.
  const hist       = npc.history as { motherName?: string; fatherName?: string; totalEncounterCount?: number } | null | undefined;
  const motherName = hist?.motherName ?? undefined;
  const fatherName = hist?.fatherName ?? undefined;

  // ── Tab 2: Physical / Physiology ──────────────────────────────────────────

  // Virginity: no encounters recorded yet.
  // totalEncounterCount=0 and undefined both count as virgin.
  const isVirgin = (hist?.totalEncounterCount ?? 0) === 0;

  // Pregnancy state
  const isPregnant    = npc.pregnancyState !== undefined;
  // PregnancyState.stage is typed as the enum; convert to string for the view model.
  const pregnancyStage = npc.pregnancyState
    ? String(npc.pregnancyState.stage)
    : undefined;

  const lactationActive = npc.lactationActive ?? false;

  // ── Tab 3 ──────────────────────────────────────────────────────────────────

  // Corruption / shame live on dynamicState.mental.
  // dynamicState may be Partial<CharacterDynamicState> on stubs, so probe safely.
  const mental = (npc.dynamicState as { mental?: { corruptionCurrent?: number; shameCurrent?: number; brokenFlag?: boolean } } | null | undefined)?.mental;
  const corruption  = mental?.corruptionCurrent;
  const shame       = mental?.shameCurrent;
  const brokenFlag  = mental?.brokenFlag;

  // ── Assemble ──────────────────────────────────────────────────────────────

  return {
    // Identity
    npcId:              npc.npcId,
    name:               npc.name,
    isDeceased:         npc.isDeceased ?? false,

    // Tab 1
    trust:              npc.trust,
    love:               npc.love,
    relationshipStatus,
    playerBondType:     npc.playerBondType !== undefined ? String(npc.playerBondType) : undefined,
    occupation,
    regionOfOrigin,
    motherName,
    fatherName,
    companionLevel:     npc.companionLevel,

    // Tab 2 — spawn-engine unknowns passed through for UI to cast later
    measurements:       npc.measurements,
    physicalDetail:     npc.physicalDetail,
    gender:             npc.gender,
    race:               npc.race,
    bodyType:           npc.bodyType,
    isVirgin,
    isPregnant,
    pregnancyStage,
    lactationActive,

    // Tab 3 — personality + sexualPsychology carry kinks + resistance profile
    personality:        npc.personality,
    sexualPsychology:   npc.sexualPsychology,

    // Corruption & moral degradation
    corruption,
    shame,
    brokenFlag,
  };
}
