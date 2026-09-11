/**
 * npcPopulationEngine.ts
 * NPC population management — Tasks 4.2–4.8.
 *
 * Responsibilities:
 *   4.2  hasBeenIntroduced flag + individuation flow
 *   4.3  Contact list cap enforcement (max 400, settings.contactListCap)
 *   4.4  Service NPC fixed roster (isService=true; never cleared on refresh)
 *   4.5  NpcScheduleDef — location lookup given a calendar phase
 *   4.6  3-day population refresh cycle (called from day-end tick)
 *   4.7  Per-location population range + NPC class assignment
 *   4.8  Per-class genderWeight replaces flat genderRatio in batch spawn
 *
 * All mutations return a new GameState (or a slice of it) rather than
 * mutating in place.  Engines are pure functions; the dispatcher applies them.
 */

import { v4 as uuidv4 } from 'uuid';

import type {
  GameState,
  ContactRecord,
  NpcCharacter,
  GameSettings,
  CalendarState,
  NpcScheduleDef,
  LocationPopulationDef,
  NpcClassDef,
  NpcRelationship,
} from '../state/gameState';
import type { DayPhase } from '../state/gameState';
import type { BondType } from '../spawn-engine/types/enums';
import { spawnFemale, spawnMale } from '../spawn-engine/spawnEngine';
import { POPULATION_CONFIGS } from '../spawn-engine/config/populationConfig';
import { drawName } from '../data/namePool';
import { Occupation } from '../spawn-engine/types/enums';

// ─── Contact cap ──────────────────────────────────────────────────────────────

/** Maximum contacts when settings.contactListCap is absent. */
const DEFAULT_CONTACT_CAP = 400;

function contactCap(settings: GameSettings): number {
  return settings.contactListCap ?? DEFAULT_CONTACT_CAP;
}

/** Returns true if the contacts list is at or over the cap. */
export function isContactCapReached(contacts: ContactRecord[], settings: GameSettings): boolean {
  return contacts.length >= contactCap(settings);
}

// ─── Task 4.3 — Add NPC to contact list with cap enforcement ─────────────────

/**
 * Adds an NPC to the contact list, respecting the cap.
 * If at cap: returns the original list unchanged and returns false.
 * Protected NPCs (isProtected=true) bypass the cap check.
 */
export function tryAddContact(
  contacts: ContactRecord[],
  npc: NpcCharacter,
  settings: GameSettings,
): { contacts: ContactRecord[]; added: boolean } {
  if (!npc.isProtected && contacts.length >= contactCap(settings)) {
    return { contacts, added: false };
  }
  const record: ContactRecord = { character: npc };
  return { contacts: [...contacts, record], added: true };
}

// ─── Task 4.2 — Individuation flow ───────────────────────────────────────────

/**
 * Marks an NPC as introduced and assigns them a proper name from the name pool.
 * Emits NPC_INDIVIDUATED event for the dispatcher.
 * Returns the mutated NpcCharacter (caller replaces the relevant ContactRecord).
 */
export function individuateNpc(npc: NpcCharacter): NpcCharacter {
  if (npc.hasBeenIntroduced) return npc; // idempotent
  const sex = (npc.gender as string) === 'FEMALE' ? 'female' : 'male';
  const name = drawName(npc.race as import('../spawn-engine/types/enums').Race, sex);
  return {
    ...npc,
    name,
    hasBeenIntroduced: true,
  };
}

/**
 * Applies individuation to a contact by npcId in a full contacts array.
 * Returns a new contacts array.
 */
export function individuateContact(
  contacts: ContactRecord[],
  npcId: string,
): ContactRecord[] {
  return contacts.map(record => {
    if (record.character.npcId !== npcId) return record;
    return { character: individuateNpc(record.character) };
  });
}

// ─── Task 4.4 — Service NPC fixed roster ─────────────────────────────────────

/**
 * Service archetypes for the fixed roster.
 * These are hand-authored stubs; their full profiles are populated at game start
 * by buildServiceNpc() below and never replaced during population refreshes.
 */
export type ServiceRole = 'Vendor' | 'Innkeeper' | 'QuestBoard';

/**
 * Builds a minimal service NPC with isService=true and isProtected=true.
 * The spawn engine is NOT used here — service NPCs are deterministic.
 */
export function buildServiceNpc(
  locationId: string,
  role: ServiceRole,
  overrides: Partial<Pick<NpcCharacter, 'name' | 'gender' | 'race'>>,
): NpcCharacter {
  const npcId = `service_${locationId}_${role.toLowerCase()}_${uuidv4().slice(0, 8)}`;

  // Minimal vitals — service NPCs are never in combat
  const vitals: NpcCharacter['vitals'] = {
    hp:      { current: 100, max: 100 },
    stamina: { current: 200, max: 200 },
    cpw:     { current: 0, max: 0 },
    arousal: 0,
    fatigue: 0,
  };

  const stats: NpcCharacter['stats'] = { str: 5, agi: 5, wis: 5, def: 5, lck: 5 };

  return {
    id:   npcId,
    npcId,
    name: overrides.name ?? role,

    characterType: 'NPC',

    // Spawn-engine profile fields — stubbed for service NPCs (Task 3a.8 will fill these)
    gender:           overrides.gender   ?? ('FEMALE' as unknown as NpcCharacter['gender']),
    race:             overrides.race     ?? ('HUMAN'  as unknown as NpcCharacter['race']),
    raceFeatures:     null as unknown as NpcCharacter['raceFeatures'],
    bodyType:         null as unknown as NpcCharacter['bodyType'],
    skin:             null as unknown as NpcCharacter['skin'],
    face:             null as unknown as NpcCharacter['face'],
    hair:             null as unknown as NpcCharacter['hair'],
    measurements:     null as unknown as NpcCharacter['measurements'],
    physicalDetail:   null as unknown as NpcCharacter['physicalDetail'],
    sexualPhysiology: null as unknown as NpcCharacter['sexualPhysiology'],
    personality:      null as unknown as NpcCharacter['personality'],
    sexualPsychology: null as unknown as NpcCharacter['sexualPsychology'],
    voice:            null as unknown as NpcCharacter['voice'],
    social:           null as unknown as NpcCharacter['social'],
    background:       null as unknown as NpcCharacter['background'],
    history:          null as unknown as NpcCharacter['history'],
    dynamicState:     null as unknown as NpcCharacter['dynamicState'],

    vitals,
    stats,
    activeStatusEffects: [],

    // Key flags
    hasBeenIntroduced: true,   // service NPCs are always known
    isProtected:       true,   // never replaced by population refresh
    isService:         true,

    // Relationship defaults
    trust:           0,
    love:            0,
    flirtCountToday: 0,
    touchCountToday: 0,
    npcRelationships: [],
    scheduleId:      `${locationId}_service_schedule`,

    // Companion fields (service NPCs are never companions)
    companionLevel: 0,
    companionXP:    0,
  };
}

// ─── Task 4.5 — Schedule-based location lookup ───────────────────────────────

/**
 * Returns the locationId where an NPC with the given schedule should be
 * on the given calendar day and phase.
 *
 * Resolution order:
 *   1. dayOverrides[day][phase]
 *   2. phases[phase]
 *   3. Walk back through DayPhase order to find the most recently defined phase
 *   4. Return null if schedule has no entries at all
 */
const PHASE_ORDER: DayPhase[] = ['Morning', 'Afternoon', 'Evening', 'Night', 'Midnight'];

export function resolveNpcLocation(
  schedule: NpcScheduleDef,
  day: number,
  phase: DayPhase,
): string | null {
  // Day-specific override takes highest priority
  const dayOverride = schedule.dayOverrides?.[day];
  if (dayOverride?.[phase]) return dayOverride[phase]!;

  // Direct phase match
  if (schedule.phases[phase]) return schedule.phases[phase]!;

  // Walk backwards through phases to find most-recent defined location
  const idx = PHASE_ORDER.indexOf(phase);
  for (let i = idx - 1; i >= 0; i--) {
    const p = PHASE_ORDER[i];
    if (schedule.phases[p]) return schedule.phases[p]!;
  }

  return null;
}

// ─── Internal: build a raw spawn-engine NPC from a class def ─────────────────

/**
 * Spawns a raw FemaleCharacter or MaleCharacter from the spawn engine,
 * then wraps it as a minimal NpcCharacter ready for the contact list.
 * The full profile fields (gender, race, etc.) are carried from the spawn output.
 *
 * NOTE: This intentionally uses `unknown` casts in the same style as gameState.ts
 * until Task 3a.8 / 3a.9 replace them with real types.
 */
function spawnNpcFromClass(
  classDef: NpcClassDef,
  populationConfigKey: keyof typeof POPULATION_CONFIGS,
): NpcCharacter {
  const config = POPULATION_CONFIGS[populationConfigKey];
  const isFemale = Math.random() < classDef.femaleWeight;
  const rawCharacter = isFemale ? spawnFemale(config) : spawnMale(config);

  // Occupation override — pick from the class occupation pool, or keep spawn result
  const occupation = classDef.occupations.length > 0
    ? classDef.occupations[Math.floor(Math.random() * classDef.occupations.length)]
    : (rawCharacter.background as any)?.occupation ?? Occupation.None;

  if ((rawCharacter.background as any) && typeof (rawCharacter.background as any) === 'object') {
    (rawCharacter.background as any).occupation = occupation;
  }

  const npcId = `npc_${uuidv4()}`;

  // Placeholder name — replaced on individuation (Task 4.2)
  const placeholderName = `Unknown ${classDef.npcClass}`;

  const vitals: NpcCharacter['vitals'] = {
    hp:      { current: 80, max: 80 },
    stamina: { current: 150, max: 200 },
    cpw:     { current: 50, max: 100 },
    arousal: 0,
    fatigue: 0,
  };

  const stats: NpcCharacter['stats'] = { str: 8, agi: 8, wis: 8, def: 8, lck: 5 };

  return {
    id:   npcId,
    npcId,
    name: placeholderName,

    characterType: 'NPC',

    // Carry full spawn-engine profile fields (typed unknown until Task 3a.8)
    gender:           rawCharacter.gender           as unknown as NpcCharacter['gender'],
    race:             rawCharacter.race             as unknown as NpcCharacter['race'],
    raceFeatures:     rawCharacter.raceFeatures     as unknown as NpcCharacter['raceFeatures'],
    bodyType:         rawCharacter.bodyType         as unknown as NpcCharacter['bodyType'],
    skin:             rawCharacter.skin             as unknown as NpcCharacter['skin'],
    face:             rawCharacter.face             as unknown as NpcCharacter['face'],
    hair:             rawCharacter.hair             as unknown as NpcCharacter['hair'],
    measurements:     rawCharacter.measurements     as unknown as NpcCharacter['measurements'],
    physicalDetail:   rawCharacter.physicalDetail   as unknown as NpcCharacter['physicalDetail'],
    sexualPhysiology: rawCharacter.sexualPhysiology as unknown as NpcCharacter['sexualPhysiology'],
    personality:      rawCharacter.personality      as unknown as NpcCharacter['personality'],
    sexualPsychology: rawCharacter.sexualPsychology as unknown as NpcCharacter['sexualPsychology'],
    voice:            rawCharacter.voice            as unknown as NpcCharacter['voice'],
    social:           rawCharacter.social           as unknown as NpcCharacter['social'],
    background:       rawCharacter.background       as unknown as NpcCharacter['background'],
    history:          rawCharacter.history          as unknown as NpcCharacter['history'],
    dynamicState:     rawCharacter.state            as unknown as NpcCharacter['dynamicState'],

    vitals,
    stats,
    activeStatusEffects: [],

    // Not yet introduced — name is assigned on first interaction
    hasBeenIntroduced: false,
    isProtected:       false,
    isService:         false,

    // Relationship defaults
    trust:           0,
    love:            0,
    flirtCountToday: 0,
    touchCountToday: 0,
    npcRelationships: [],
    scheduleId:      undefined,

    companionLevel: 0,
    companionXP:    0,
  };
}

// ─── Task 4.7 / 4.8 — Location population batch spawn ───────────────────────

/**
 * Generates the NPC roster for a location based on its LocationPopulationDef.
 * Count is randomised between min/maxNpcs.
 * Each class receives Math.round(count * fraction) NPCs with per-class gender weights.
 * Service NPCs are excluded — they are injected separately (Task 4.4).
 *
 * Returns an array of fresh NpcCharacters; caller is responsible for merging
 * them into GameState.contacts (subject to cap enforcement in Task 4.3).
 */
export function spawnLocationPopulation(
  locationDef: LocationPopulationDef,
  populationConfigKey: keyof typeof POPULATION_CONFIGS = 'STANDARD',
): NpcCharacter[] {
  const count = Math.round(
    locationDef.minNpcs + Math.random() * (locationDef.maxNpcs - locationDef.minNpcs),
  );

  const result: NpcCharacter[] = [];

  for (const classDef of locationDef.classAssignments) {
    const classCount = Math.max(1, Math.round(count * classDef.fraction));
    for (let i = 0; i < classCount; i++) {
      result.push(spawnNpcFromClass(classDef, populationConfigKey));
    }
  }

  return result;
}

// ─── Task 4.6 — Population refresh cycle ─────────────────────────────────────

/**
 * Determines whether a location's population should be refreshed on this calendar tick.
 * Refresh triggers when day % refreshCycleDays === 0 (and day > 0).
 */
export function shouldRefreshPopulation(
  locationDef: LocationPopulationDef,
  calendar: CalendarState,
): boolean {
  if (calendar.day === 0) return false;
  return calendar.day % locationDef.refreshCycleDays === 0;
}

/**
 * Refreshes the NPC population for a location:
 *   1. Removes all non-service, non-protected contacts associated with this location.
 *   2. Spawns a fresh batch from the location def.
 *   3. Adds them to the contacts list (cap enforced per Task 4.3).
 *
 * "Associated with this location" is determined by schedule: any NPC whose
 * schedule resolves to this locationId in the current phase is considered local.
 * NPCs with no schedule are not cleared.
 *
 * Returns the updated contacts array.
 */
export function refreshLocationPopulation(
  contacts: ContactRecord[],
  locationDef: LocationPopulationDef,
  schedules: Record<string, NpcScheduleDef>, // scheduleId → def
  calendar: CalendarState,
  settings: GameSettings,
  populationConfigKey: keyof typeof POPULATION_CONFIGS = 'STANDARD',
): ContactRecord[] {
  const currentPhase = calendar.phase as DayPhase;

  // Remove transient NPCs whose current schedule resolves to this location
  const retained: ContactRecord[] = contacts.filter(record => {
    const npc = record.character;
    // Never remove service or protected NPCs
    if (npc.isService || npc.isProtected) return true;
    // Remove unintroduced NPCs assigned to this location
    if (!npc.scheduleId) return true; // no schedule → not location-bound, keep
    const schedule = schedules[npc.scheduleId];
    if (!schedule) return true;
    const resolvedLocation = resolveNpcLocation(schedule, calendar.day, currentPhase);
    return resolvedLocation !== locationDef.locationId;
  });

  // Spawn fresh batch for this location
  const fresh = spawnLocationPopulation(locationDef, populationConfigKey);

  // Add each new NPC to the retained list, respecting cap
  let current = retained;
  for (const npc of fresh) {
    const result = tryAddContact(current, npc, settings);
    if (!result.added) break; // cap reached; stop adding
    current = result.contacts;
  }

  return current;
}

// ─── Day-end tick integration point (called from calendarEngine) ──────────────

/**
 * Entry point called by the day-end tick sequence (Phase 8 / calendarEngine).
 * Checks all registered locations and triggers refreshes as needed.
 * Returns a new contacts array (caller updates GameState.contacts).
 *
 * @param contacts          Current contacts list
 * @param locationDefs      All location population definitions keyed by locationId
 * @param schedules         All NPC schedule definitions keyed by scheduleId
 * @param calendar          Current calendar state
 * @param settings          Game settings (for cap)
 */
export function tickPopulationRefresh(
  contacts: ContactRecord[],
  locationDefs: Record<string, LocationPopulationDef>,
  schedules: Record<string, NpcScheduleDef>,
  calendar: CalendarState,
  settings: GameSettings,
): ContactRecord[] {
  let current = contacts;
  for (const locationDef of Object.values(locationDefs)) {
    if (shouldRefreshPopulation(locationDef, calendar)) {
      current = refreshLocationPopulation(
        current,
        locationDef,
        schedules,
        calendar,
        settings,
      );
    }
  }
  return current;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 4.9 — WORLD HISTORY SIMULATION
// ═══════════════════════════════════════════════════════════════════════════════

export const WORLD_HISTORY_TICK_COUNT = 30;

const HIST_ACTIVE_THRESHOLD  = 10;
const HIST_MAX_RELATIONSHIPS = 20;
const HIST_DECAY_THRESHOLD   = 30;

type BondStr = string;
const B = {
  NONE: 'NONE', STRANGER: 'STRANGER', ACQUAINTANCE: 'ACQUAINTANCE',
  FAMILIAR: 'FAMILIAR', FRIEND: 'FRIEND', CLOSE_FRIEND: 'CLOSE_FRIEND',
  CRUSH: 'CRUSH', TRANSACTIONAL: 'TRANSACTIONAL', ATTACHMENT: 'ATTACHMENT',
  DEPENDENT: 'DEPENDENT', LOVE: 'LOVE', DEVOTED: 'DEVOTED',
  OBSESSION: 'OBSESSION', SUBMISSIVE: 'SUBMISSIVE', HATE_LOVE: 'HATE_LOVE',
  PURE_HATE: 'PURE_HATE', WORSHIPFUL: 'WORSHIPFUL', BROKEN: 'BROKEN',
  CORRUPTED: 'CORRUPTED', OWNED: 'OWNED',
} as const;

const HIST_BOND_CAPS: Record<BondStr, number> = {
  NONE: 99, STRANGER: 99, ACQUAINTANCE: 20, FAMILIAR: 12, FRIEND: 8,
  CLOSE_FRIEND: 4, CRUSH: 3, TRANSACTIONAL: 10, ATTACHMENT: 6, DEPENDENT: 4,
  LOVE: 2, DEVOTED: 1, OBSESSION: 2, SUBMISSIVE: 1, HATE_LOVE: 3,
  PURE_HATE: 8, WORSHIPFUL: 2, BROKEN: 1, CORRUPTED: 1, OWNED: 1,
};

const HIST_INTIMATE_ELIGIBLE = new Set([B.LOVE, B.DEVOTED, B.OBSESSION, B.HATE_LOVE, B.SUBMISSIVE, B.OWNED]);
const HIST_FLIRT_ELIGIBLE    = new Set([B.CRUSH, B.ATTACHMENT, B.LOVE, B.HATE_LOVE, B.OBSESSION, B.DEVOTED, B.WORSHIPFUL, B.CLOSE_FRIEND]);
const HIST_CONFLICT_BONDS    = new Set([B.PURE_HATE, B.BROKEN, B.CORRUPTED]);

function hClamp(v: number, lo: number, hi: number): number { return Math.max(lo, Math.min(hi, v)); }

function histRand(id1: string, id2: string, day: number): number {
  let h = day * 2654435761;
  for (const ch of id1 + id2) h = Math.imul(h ^ ch.charCodeAt(0), 2246822519);
  return (h >>> 0) / 0xFFFFFFFF;
}

function histPersonalityScore(npc: NpcCharacter): number {
  const p = npc.personality as { bigFive?: { extraversion?: string }; trustBaseline?: string; emotionalStability?: string } | null;
  let s = 0;
  switch (p?.bigFive?.extraversion) { case 'HIGH': s += 15; break; case 'MODERATE': s += 8; break; case 'LOW': s += 2; break; }
  switch (p?.trustBaseline)         { case 'NAIVE': s += 15; break; case 'OPEN': s += 12; break; case 'NEUTRAL': s += 7; break; case 'CAUTIOUS': s += 3; break; }
  switch (p?.emotionalStability)    { case 'VERY_STABLE': s += 10; break; case 'STABLE': s += 8; break; case 'MODERATE': s += 5; break; case 'VOLATILE': s += 2; break; }
  return s;
}

function histRelPull(npc: NpcCharacter, currentDay: number): number {
  const DEPTH: Record<BondStr, number> = {
    DEVOTED: 8, LOVE: 7, OWNED: 7, OBSESSION: 6, SUBMISSIVE: 5,
    HATE_LOVE: 5, CLOSE_FRIEND: 5, DEPENDENT: 4, ATTACHMENT: 3,
    FRIEND: 3, CRUSH: 3, FAMILIAR: 2, WORSHIPFUL: 2, PURE_HATE: 2,
    ACQUAINTANCE: 1, TRANSACTIONAL: 1, BROKEN: 1, CORRUPTED: 1, STRANGER: 0, NONE: 0,
  };
  let pull = 0;
  for (const rel of npc.npcRelationships) {
    const age = currentDay - rel.lastInteractionDay;
    pull += (DEPTH[rel.bond] ?? 0) + (age < 7 ? 3 : age < 14 ? 1 : 0) + (age >= HIST_DECAY_THRESHOLD - 5 ? 2 : 0);
  }
  return Math.min(pull, 40);
}

function histEvolveBond(bond: BondStr, trust: number, love: number, strength: number): BondStr {
  if (bond === B.STRANGER     && trust > 5)                                      return B.ACQUAINTANCE;
  if (bond === B.ACQUAINTANCE && trust > 15 && love >= 0)                        return B.FAMILIAR;
  if (bond === B.FAMILIAR     && trust > 25 && love > 5)                         return B.FRIEND;
  if (bond === B.FRIEND       && trust > 40 && love > 15)                        return B.CLOSE_FRIEND;
  if (bond === B.ACQUAINTANCE && love > 20  && trust < 30)                       return B.CRUSH;
  if (bond === B.FAMILIAR     && love > 30  && trust < 40)                       return B.CRUSH;
  if (bond === B.FRIEND       && love > 40  && trust < 50)                       return B.CRUSH;
  if ((bond === B.CLOSE_FRIEND || bond === B.CRUSH) && trust > 30 && love > 25)  return B.ATTACHMENT;
  if (bond === B.ATTACHMENT   && trust > 40 && love > 35)                        return B.DEPENDENT;
  if (bond === B.DEPENDENT    && trust > 55 && love > 50)                        return B.LOVE;
  if (bond === B.LOVE         && trust > 70 && love > 70 && strength > 60)       return B.DEVOTED;
  if (bond === B.ATTACHMENT   && love > 60  && trust < 40)                       return B.OBSESSION;
  if (bond === B.CRUSH        && love > 55  && trust < 30)                       return B.OBSESSION;
  if (bond === B.ACQUAINTANCE && trust > 20 && love <= 5)                        return B.TRANSACTIONAL;
  if (bond === B.FAMILIAR     && trust > 30 && love <= 10)                       return B.TRANSACTIONAL;
  if ((bond === B.TRANSACTIONAL || bond === B.ACQUAINTANCE) && trust < -10 && love > 20) return B.HATE_LOVE;
  if ((bond === B.TRANSACTIONAL || bond === B.ACQUAINTANCE) && trust < -30 && love < 5)  return B.PURE_HATE;
  if (bond === B.DEPENDENT && love > 60 && strength > 50 && trust < 40)          return B.SUBMISSIVE;
  return bond;
}

function histSelectActive(npcs: NpcCharacter[], syntheticDay: number): string[] {
  return npcs
      .filter(npc => !npc.isService && !npc.isProtected &&
          histPersonalityScore(npc) + histRelPull(npc, syntheticDay) >= HIST_ACTIVE_THRESHOLD)
      .map(npc => npc.npcId);
}

function histPickTarget(subject: NpcCharacter, pool: NpcCharacter[], syntheticDay: number): NpcCharacter | null {
  let best: NpcCharacter | null = null;
  let bestScore = -Infinity;
  for (const candidate of pool) {
    if (candidate.npcId === subject.npcId || candidate.isService) continue;
    let score = 0;
    const existing = subject.npcRelationships.find(r => r.targetNpcId === candidate.npcId);
    if (existing) {
      score += 30;
      if (syntheticDay - existing.lastInteractionDay >= HIST_DECAY_THRESHOLD - 5) score -= 20;
    } else {
      const p = subject.personality as { bigFive?: { extraversion?: string }; trustBaseline?: string } | null;
      const isOpen = p?.trustBaseline === 'OPEN' || p?.trustBaseline === 'NAIVE';
      const isExt  = p?.bigFive?.extraversion === 'HIGH';
      if (isOpen && isExt) score += 18;
      else if (subject.scheduleId && subject.scheduleId === candidate.scheduleId) score += 8;
      else continue;
    }
    if (subject.scheduleId && subject.scheduleId === candidate.scheduleId) score += 20;
    if (score > bestScore) { bestScore = score; best = candidate; }
  }
  return best;
}

function histResolveDeltas(subject: NpcCharacter, target: NpcCharacter, syntheticDay: number) {
  const seed  = histRand(subject.npcId, target.npcId, syntheticDay);
  const j     = () => (seed - 0.5) * 2;
  const rel   = subject.npcRelationships.find(r => r.targetNpcId === target.npcId);
  const bond: BondStr = rel?.bond ?? B.STRANGER;
  const sameLoc = subject.scheduleId === target.scheduleId;
  if (HIST_INTIMATE_ELIGIBLE.has(bond) && sameLoc && seed < 0.30 + ((rel?.bondStrength ?? 0) / 100) * 0.40)
    return { trustDelta: 8 + j(), loveDelta: 20 + j(), strengthDelta: 12, wasIntimate: true };
  if (HIST_CONFLICT_BONDS.has(bond))
    return { trustDelta: -4 + j(), loveDelta: -1, strengthDelta: 1, wasIntimate: false };
  if (HIST_FLIRT_ELIGIBLE.has(bond) && sameLoc && seed < 0.40)
    return { trustDelta: 2 + j(), loveDelta: 5 + j(), strengthDelta: 3, wasIntimate: false };
  return { trustDelta: 2 + j(), loveDelta: 1 + j(), strengthDelta: 2, wasIntimate: false };
}

function histApply(
    npcMap: Map<string, NpcCharacter>,
    subjectId: string,
    targetId: string,
    d: { trustDelta: number; loveDelta: number; strengthDelta: number; wasIntimate: boolean },
    syntheticDay: number,
): void {
  const subject = npcMap.get(subjectId);
  if (!subject) return;
  const existingIdx = subject.npcRelationships.findIndex(r => r.targetNpcId === targetId);

  if (existingIdx === -1) {
    if (subject.npcRelationships.length >= HIST_MAX_RELATIONSHIPS) return;
    let rels = [...subject.npcRelationships];
    const strangerCount = rels.filter(r => r.bond === B.STRANGER).length;
    if (strangerCount >= (HIST_BOND_CAPS[B.STRANGER] ?? 99)) {
      const w = rels.filter(r => r.bond === B.STRANGER).sort((a, b) => (a.trust + a.love) - (b.trust + b.love))[0];
      if (w) rels = rels.map(r => r.targetNpcId === w.targetNpcId ? { ...r, bond: B.ACQUAINTANCE as BondType } : r);
    }
    const newRel: NpcRelationship = {
      targetNpcId: targetId, bond: B.STRANGER as BondType,
      trust: hClamp(d.trustDelta, -100, 100), love: hClamp(d.loveDelta, -100, 100),
      bondStrength: hClamp(d.strengthDelta, 0, 100),
      lastInteractionDay: syntheticDay, interactionCount: 1,
      intimateEncounterCount: d.wasIntimate ? 1 : 0,
    };
    const evolved = histEvolveBond(newRel.bond, newRel.trust, newRel.love, newRel.bondStrength) as BondType;
    npcMap.set(subjectId, { ...subject, npcRelationships: [...rels, { ...newRel, bond: evolved }] });

  } else {
    const rel = subject.npcRelationships[existingIdx];
    const updated: NpcRelationship = {
      ...rel,
      trust:        hClamp(rel.trust        + d.trustDelta,    -100, 100),
      love:         hClamp(rel.love         + d.loveDelta,     -100, 100),
      bondStrength: hClamp(rel.bondStrength + d.strengthDelta,    0, 100),
      lastInteractionDay: syntheticDay, interactionCount: rel.interactionCount + 1,
      intimateEncounterCount: d.wasIntimate ? rel.intimateEncounterCount + 1 : rel.intimateEncounterCount,
    };
    const evolved = histEvolveBond(updated.bond, updated.trust, updated.love, updated.bondStrength) as BondType;
    if (evolved !== rel.bond) {
      let rels = [...subject.npcRelationships];
      const capCount = rels.filter(r => r.bond === evolved).length;
      if (capCount >= (HIST_BOND_CAPS[evolved] ?? 99)) {
        const w = rels.filter(r => r.bond === evolved).sort((a, b) => (a.trust + a.love) - (b.trust + b.love))[0];
        if (w) rels = rels.map(r => r.targetNpcId === w.targetNpcId ? { ...r, bond: B.ACQUAINTANCE as BondType } : r);
        subject.npcRelationships = rels;
      }
    }
    const rels = [...subject.npcRelationships];
    rels[existingIdx] = { ...updated, bond: evolved };
    npcMap.set(subjectId, { ...subject, npcRelationships: rels });
  }
}

function histDecay(npcMap: Map<string, NpcCharacter>, syntheticDay: number): void {
  for (const [id, npc] of npcMap) {
    const fresh = npc.npcRelationships.filter(r => syntheticDay - r.lastInteractionDay < HIST_DECAY_THRESHOLD);
    if (fresh.length !== npc.npcRelationships.length) npcMap.set(id, { ...npc, npcRelationships: fresh });
  }
}

/**
 * Simulates `tickCount` synthetic days of NPC-NPC social history before Day 1.
 * Returns the same NpcCharacter[] with npcRelationships populated.
 *
 * Usage in new-game flow:
 *   const worldNpcs = allLocationDefs.flatMap(def => spawnLocationPopulation(def));
 *   const withHistory = simulateWorldHistory(worldNpcs, 30, (t, total) => setProgress(t / total));
 *   let contacts: ContactRecord[] = [];
 *   for (const npc of withHistory) {
 *     const { added, contacts: next } = tryAddContact(contacts, npc, settings);
 *     if (added) contacts = next;
 *   }
 */
export function simulateWorldHistory(
    npcs: NpcCharacter[],
    tickCount: number = WORLD_HISTORY_TICK_COUNT,
    onProgress?: (tick: number, total: number) => void,
): NpcCharacter[] {
  const npcMap = new Map<string, NpcCharacter>(npcs.map(npc => [npc.npcId, npc]));

  for (let tick = 0; tick < tickCount; tick++) {
    const syntheticDay = -(tickCount - tick); // -30, -29, … -1
    const snapshot     = [...npcMap.values()];
    const activeIds    = histSelectActive(snapshot, syntheticDay);

    for (const subjectId of activeIds) {
      const subject = npcMap.get(subjectId);
      if (!subject) continue;
      const target = histPickTarget(subject, snapshot, syntheticDay);
      if (!target) continue;
      const deltas = histResolveDeltas(subject, target, syntheticDay);
      histApply(npcMap, subjectId, target.npcId, deltas, syntheticDay);
    }

    histDecay(npcMap, syntheticDay);
    onProgress?.(tick + 1, tickCount);
  }

  return npcs.map(npc => npcMap.get(npc.npcId) ?? npc);
}
