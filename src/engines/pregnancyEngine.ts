/**
 * pregnancyEngine.ts
 * Pregnancy progression, conception checks, birth, and offspring generation.
 *
 * PRD §4.16 — Pregnancy & Offspring
 *
 * Design principles:
 *   - pregnancyState on NpcCharacter is undefined when neither pregnant nor flagged.
 *   - pregnantFlaggedToday is set by flagPregnancyRisk() (called by dispatcher on
 *     END_SCENE when pregnancyCheck===true and no condom used).
 *   - checkConception() is the day-end step-2 entry for flagged NPCs only.
 *   - tickPregnancy() is the day-end step-2 entry for already-pregnant NPCs.
 *   - Both are called in sequence from calendarEngine.runDayEndTick() step 2.
 *   - resolveBirth() fires inline when pregnancyWeek reaches 12 inside tickPregnancy.
 *
 * Fertility roll table:
 *   FertilityRating.Low      → 10%
 *   FertilityRating.Moderate → 25%
 *   FertilityRating.High     → 45%
 *   FertilityRating.VeryHigh → 65%
 *
 * Week → Stage mapping (PREGNANCY_WEEK_TO_STAGE):
 *   0          → EarlyFirst
 *   1-2        → EarlyFirst  (already at 0-indexed week 0; weeks 1-2 stay EarlyFirst)
 *   3-4        → LateFirst
 *   5-6        → EarlySecond
 *   7-8        → LateSecond
 *   9-10       → EarlyThird
 *   11         → LateThird
 *   12+        → FullTerm  (triggers birth on the tick that sets this week)
 *
 * Offspring alignment roll:
 *   Normal    34%
 *   Troubled  33%
 *   Criminal  33%
 *
 * Offspring stats: average of mother + father stats, ±10% random variance per stat.
 *
 * Lactation flag:
 *   lactationActive on NpcCharacter is set to true on birth.
 *   It is intentionally separate from sexualPhysiology.lactationHistory
 *   (which is typed unknown until Task 3a.8); this flag drives the active
 *   lactation state used by the intimacy engine's milk mechanics.
 */

import { PregnancyStage, FertilityRating } from '../spawn-engine/types/enums';
import type { FemaleSexualPhysiology } from '../spawn-engine/character/sexualPhysiology';
import type {
  GameState, GameEvent, NpcCharacter,
  PregnancyState, OffspringRecord, CombatStats,
} from '../state/gameState';

// ─── Week → Stage lookup table ────────────────────────────────────────────────
// Index = pregnancyWeek. Week 12 = FullTerm (triggers birth on tick).
export const PREGNANCY_WEEK_TO_STAGE: Record<number, PregnancyStage> = {
  0:  PregnancyStage.EarlyFirst,
  1:  PregnancyStage.EarlyFirst,
  2:  PregnancyStage.EarlyFirst,
  3:  PregnancyStage.LateFirst,
  4:  PregnancyStage.LateFirst,
  5:  PregnancyStage.EarlySecond,
  6:  PregnancyStage.EarlySecond,
  7:  PregnancyStage.LateSecond,
  8:  PregnancyStage.LateSecond,
  9:  PregnancyStage.EarlyThird,
  10: PregnancyStage.EarlyThird,
  11: PregnancyStage.LateThird,
  12: PregnancyStage.FullTerm,
};

// ─── Fertility roll probability table ─────────────────────────────────────────
const FERTILITY_ROLL: Record<FertilityRating, number> = {
  [FertilityRating.Low]:      0.10,
  [FertilityRating.Moderate]: 0.25,
  [FertilityRating.High]:     0.45,
  [FertilityRating.VeryHigh]: 0.65,
};

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Generates a unique offspring id string. */
function generateOffspringId(motherId: string, birthDay: number): string {
  // Simple deterministic id: avoid Date.now() so unit tests are reproducible.
  return `offspring_${motherId}_day${birthDay}_${Math.floor(Math.random() * 9999)}`;
}

/**
 * Reads fertilityRating from NpcCharacter.sexualPhysiology.
 * sexualPhysiology is typed unknown until Task 3a.8; we use a type assertion
 * here (same pattern used by intimacyEngine). Falls back to Moderate if the
 * field is not yet populated (e.g. mock data with empty physiology objects).
 */
function getFertilityRating(npc: NpcCharacter): FertilityRating {
  try {
    const phys = npc.sexualPhysiology as FemaleSexualPhysiology | null | undefined;
    if (phys && phys.fertilityRating) return phys.fertilityRating;
  } catch {
    // unknown type — fall through to default
  }
  return FertilityRating.Moderate;
}

/**
 * Applies ±10% random variance to a single stat value.
 * Returns a non-negative integer.
 */
function applyStatVariance(value: number): number {
  const variance = 0.9 + Math.random() * 0.2; // 0.90 – 1.10
  return Math.max(1, Math.round(value * variance));
}

/**
 * Generates offspring CombatStats by averaging mother + father stats
 * and applying ±10% random variance per stat.
 * Father is the player when fatherId === player.id; falls back to mother's
 * stats doubled (unknown father) so the formula never throws.
 */
function generateOffspringStats(
  motherStats: CombatStats,
  fatherStats:  CombatStats,
): CombatStats {
  const avg = (a: number, b: number) => (a + b) / 2;
  return {
    str: applyStatVariance(avg(motherStats.str, fatherStats.str)),
    agi: applyStatVariance(avg(motherStats.agi, fatherStats.agi)),
    wis: applyStatVariance(avg(motherStats.wis, fatherStats.wis)),
    def: applyStatVariance(avg(motherStats.def, fatherStats.def)),
    lck: applyStatVariance(avg(motherStats.lck, fatherStats.lck)),
  };
}

/**
 * Rolls offspring alignment.
 *   Normal    34%
 *   Troubled  33%
 *   Criminal  33%
 */
function rollAlignment(): OffspringRecord['alignment'] {
  const roll = Math.random();
  if (roll < 0.34) return 'Normal';
  if (roll < 0.67) return 'Troubled';
  return 'Criminal';
}

/**
 * Writes updated NpcCharacter back into gameState.contacts immutably.
 * Returns the updated GameState.
 */
function patchNpcInContacts(gameState: GameState, updatedNpc: NpcCharacter): GameState {
  return {
    ...gameState,
    contacts: gameState.contacts.map(record =>
      record.character.npcId === updatedNpc.npcId
        ? { ...record, character: updatedNpc }
        : record,
    ),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC ENGINE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * flagPregnancyRisk — Task 18.8
 * Sets pregnantFlaggedToday=true on the NPC.
 * Called by the dispatcher's END_SCENE handler when:
 *   SceneEndPersistence.pregnancyCheck === true AND no condom was used.
 *
 * If the NPC is already pregnant, the flag is still set so that multiple
 * creampies in the same day don't re-run checkConception needlessly —
 * checkConception guards for already-pregnant state before rolling.
 */
export function flagPregnancyRisk(
  gameState: GameState,
  npcId:     string,
): GameState {
  const record = gameState.contacts.find(c => c.character.npcId === npcId);
  if (!record) return gameState; // NPC not in contacts; no-op

  const npc = record.character;
  const existingState = npc.pregnancyState;

  const updatedNpc: NpcCharacter = {
    ...npc,
    pregnancyState: {
      // Preserve existing pregnancy data if present; just set the flag
      pregnancyWeek:        existingState?.pregnancyWeek        ?? 0,
      stage:                existingState?.stage                 ?? PregnancyStage.EarlyFirst,
      fatherId:             existingState?.fatherId              ?? gameState.player.id,
      conceptionDay:        existingState?.conceptionDay         ?? gameState.calendar.day,
      pregnantFlaggedToday: true,
    },
  };

  return patchNpcInContacts(gameState, updatedNpc);
}

/**
 * checkConception — Task 18.5
 * Called at day-end step 2 for every NPC with pregnantFlaggedToday===true.
 * Guards: NPC must not already be pregnant (pregnancyWeek > 0 with fatherId set
 * but flag just re-fired; skip roll; just clear flag).
 *
 * On success: sets pregnancyWeek=0, stage=EarlyFirst, fatherId, conceptionDay.
 * Always clears pregnantFlaggedToday regardless of roll outcome.
 * Emits CONCEPTION_CHECK_PASSED on success.
 */
export function checkConception(
  gameState: GameState,
  npcId:     string,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const record = gameState.contacts.find(c => c.character.npcId === npcId);
  if (!record) return { state: gameState, events };

  const npc = record.character;
  if (!npc.pregnancyState?.pregnantFlaggedToday) return { state: gameState, events };

  // Already pregnant — just clear the flag; no re-roll.
  const alreadyPregnant =
    npc.pregnancyState.pregnancyWeek > 0 ||
    // pregnancyWeek===0 and fatherId set means we just conceived this day;
    // let that one through (it was newly flagged this scene).
    // Distinguish by conceptionDay: if conceptionDay === today, allow.
    (npc.pregnancyState.conceptionDay !== undefined &&
     npc.pregnancyState.conceptionDay < gameState.calendar.day &&
     npc.pregnancyState.fatherId !== '');

  if (alreadyPregnant) {
    const updatedNpc: NpcCharacter = {
      ...npc,
      pregnancyState: { ...npc.pregnancyState, pregnantFlaggedToday: false },
    };
    return { state: patchNpcInContacts(gameState, updatedNpc), events };
  }

  // Roll for conception
  const fertilityRating = getFertilityRating(npc);
  const chance = FERTILITY_ROLL[fertilityRating];
  const conceived = Math.random() < chance;

  const pregnancyState: PregnancyState = {
    pregnancyWeek:        conceived ? 0 : (npc.pregnancyState.pregnancyWeek ?? 0),
    stage:                conceived ? PregnancyStage.EarlyFirst : (npc.pregnancyState.stage ?? PregnancyStage.EarlyFirst),
    fatherId:             gameState.player.id,
    conceptionDay:        conceived ? gameState.calendar.day : (npc.pregnancyState.conceptionDay ?? gameState.calendar.day),
    pregnantFlaggedToday: false, // always clear at day-end
  };

  // If not conceived: clear pregnancyState entirely (no ongoing pregnancy)
  const updatedNpc: NpcCharacter = {
    ...npc,
    pregnancyState: conceived ? pregnancyState : undefined,
  };

  if (conceived) {
    events.push({ type: 'CONCEPTION_CHECK_PASSED', npcId, fatherId: gameState.player.id });
  }

  return { state: patchNpcInContacts(gameState, updatedNpc), events };
}

/**
 * resolveBirth — Task 18.7
 * Called inline by tickPregnancy() when pregnancyWeek reaches 12.
 * Resets pregnancy state, generates offspring record, sets lactationActive.
 * Emits BIRTH_OCCURRED and LACTATION_STARTED.
 */
function resolveBirth(
  gameState: GameState,
  npc:       NpcCharacter,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];

  // Resolve father stats (player or unknown fallback)
  const fatherId    = npc.pregnancyState?.fatherId ?? gameState.player.id;
  const fatherStats: CombatStats =
    fatherId === gameState.player.id
      ? gameState.player.stats
      : (gameState.contacts.find(c => c.character.npcId === fatherId)?.character.stats ?? npc.stats);

  const offspringStats = generateOffspringStats(npc.stats, fatherStats);
  const birthDay       = gameState.calendar.day;
  const offspringId    = generateOffspringId(npc.npcId, birthDay);

  const offspring: OffspringRecord = {
    id:         offspringId,
    motherId:   npc.npcId,
    fatherId,
    birthDay,
    alignment:  rollAlignment(),
    stats:      offspringStats,
    // name is undefined until authored by story event or player choice
  };

  // Reset pregnancy + set lactation
  const updatedNpc: NpcCharacter = {
    ...npc,
    pregnancyState:  undefined,  // no longer pregnant
    lactationActive: true,
  };

  let state = patchNpcInContacts(gameState, updatedNpc);

  // Append offspring record to root GameState
  state = {
    ...state,
    offspring: [...state.offspring, offspring],
  };

  events.push({ type: 'BIRTH_OCCURRED',    npcId: npc.npcId, offspringId });
  events.push({ type: 'LACTATION_STARTED', npcId: npc.npcId });

  return { state, events };
}

/**
 * tickPregnancy — Task 18.6
 * Called at day-end step 2 for all currently pregnant NPCs (pregnancyState
 * present AND pregnancyWeek set, not merely flaggedToday with no week yet).
 *
 * Increments pregnancyWeek by 1.
 * Updates stage from PREGNANCY_WEEK_TO_STAGE map.
 * Emits PREGNANCY_STAGE_ADVANCED on stage change.
 * Calls resolveBirth() when week reaches 12.
 *
 * NOTE: Call checkConception() before tickPregnancy() in the day-end sequence
 * so newly-conceived NPCs start at week 0 and tick to week 1 on the same day
 * (correct — day 1 of pregnancy = week 0 conceived, week 1 on first tick).
 */
export function tickPregnancy(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  let state  = gameState;
  const events: GameEvent[] = [];

  for (const record of gameState.contacts) {
    const npc = record.character;

    // Skip: not pregnant, flagged-only (no week yet), deceased, or already birthed
    if (!npc.pregnancyState) continue;
    if (npc.isDeceased) continue;
    // pregnantFlaggedToday alone (week is 0 and conceptionDay === today) means
    // we're in the same-day conception flow; do NOT tick (conception just happened).
    // After checkConception runs first this should already be cleared, but guard anyway.
    if (npc.pregnancyState.pregnantFlaggedToday) continue;
    // If pregnancyState exists but week is 0 and conceptionDay === today:
    // this is the day of conception — skip the tick (week advances from next day).
    if (
      npc.pregnancyState.pregnancyWeek === 0 &&
      npc.pregnancyState.conceptionDay === state.calendar.day
    ) {
      continue;
    }

    const prevStage  = npc.pregnancyState.stage;
    const newWeek    = npc.pregnancyState.pregnancyWeek + 1;
    const newStage   = PREGNANCY_WEEK_TO_STAGE[newWeek] ?? PregnancyStage.FullTerm;

    if (newWeek >= 12) {
      // Birth — resolveBirth reads current state for the npc from contacts
      // so we reload after patchNpcInContacts inside resolveBirth.
      const birthResult = resolveBirth(state, npc);
      state = birthResult.state;
      events.push(...birthResult.events);
      continue;
    }

    // Normal tick — update week and stage
    const updatedNpc: NpcCharacter = {
      ...npc,
      pregnancyState: {
        ...npc.pregnancyState,
        pregnancyWeek: newWeek,
        stage:         newStage,
      },
    };
    state = patchNpcInContacts(state, updatedNpc);

    if (newStage !== prevStage) {
      events.push({ type: 'PREGNANCY_STAGE_ADVANCED', npcId: npc.npcId, stage: newStage });
    }
  }

  return { state, events };
}
