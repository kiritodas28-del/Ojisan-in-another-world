/**
 * intimacyEngine.ts
 * Intimate encounter scene state machine.
 *
 * Audit-corrected — all types now sourced directly from spawn-engine;
 * no duplicate definitions; all physiology/psychology interfaces used correctly.
 *
 * Key fixes from audit:
 *   - ResistanceProfile: uses full psychologyCore.ResistanceProfile (not a string union)
 *   - OrgasmEase:        replaces OrgasmTriggerSensitivity (same concept, canonical enum)
 *   - ArousalSpeed/LubricationSpeed/VaginaElasticity: use enums.ts directly
 *   - FemaleSensitivityProfile: per-zone SensitivityTrack lookup (not a scalar)
 *   - OrgasmProfile: multipleCapacity gate, squirtCapacity gate, postSensitivity,
 *                    dominantType bonus, acquiredTypes gate
 *   - CorruptionShameTrack: shame fully wired into arousal and pain calculations
 *   - PleasureTrack:  used from patches.ts alongside arousal
 *   - WetnessTrack:   calculateCurrentWetness() from patches.ts drives lubrication
 *   - SubspaceTracker: wired per-turn from patches.ts
 *   - AfterglowTracker: triggerAfterglow() / tickAfterglow() used
 *   - MoodValue:      enum values used throughout (not plain strings)
 *   - Kink:           enum values used; NpcPartnerProfile.acquiredKinks: Kink[]
 *   - SexualActFlags: updated per-turn in resolveSceneAction; fed to resolvePostEncounter
 *   - Multiple orgasms: gated behind OrgasmProfile.multipleCapacity
 *   - resolvePostIntimacy: calls resolvePostEncounter() from patches.ts
 */

import type { GameEvent, GameState } from '../state/gameState';
import { derivePassiveArousalBonus } from './skillEngine';

// ── Spawn-engine type imports (single source of truth) ──────────────────────
import {
  ArousalSpeed, LubricationSpeed, VaginaElasticity,
  OrgasmEase, PostOrgasmSensitivity, OrgasmType,
  ResistanceProfileType, SexualLean, Kink,
  MoodValue, SensitivityLevel, WetnessLevel,
  CupSize,
} from '../spawn-engine/types/enums';

import type { ResistanceProfile, CorruptionShameTrack, SexualPsychology } from '../spawn-engine/character/psychologyCore';
import type { OrgasmProfile, FemaleSensitivityProfile, FemaleSexualPhysiology, WetnessTrack } from '../spawn-engine/character/sexualPhysiology';
import type { SexualActFlags } from '../spawn-engine/character/historyProfile';
import type { PleasureTrack } from '../spawn-engine/encounter/patches';
import type { SubspaceTracker, AfterglowTracker } from '../spawn-engine/encounter/patches';

import {
  calculateCurrentWetness,
  updatePleasure, decayPleasure, createPleasureTrack,
  updateSubspaceTracker, createSubspaceTracker,
  triggerAfterglow, tickAfterglow, createAfterglowTracker,
  updateResistanceFromEncounter,
  resolveEncounterTurn, resolvePostEncounter,
  type EncounterTurnResult,
} from '../spawn-engine/encounter/patches';

// ============================================================
// CONSTANTS
// ============================================================

const SQUIRT_THRESHOLD             = 0.55;
const MAX_ORGASMS_BEFORE_AUTO_END  = 3;
const SUBSPACE_PAIN_MULT           = 0.3;   // pain multiplied down in subspace
const SUBSPACE_PLEASURE_BONUS      = 1.4;   // pleasure multiplied up in subspace
const POST_ORGASM_OVERWHELMED_PAIN = 8;     // pain spike per turn when postSensitivity = OVERWHELMED

// ============================================================
// SCENE START / STATUS TYPES
// ============================================================

export type SceneStartType =
  | 'CONSENSUAL'
  | 'FORCE_INTIMACY'
  | 'FORCE_INTIMACY_SLEEPING'
  | 'POST_DEFEAT';

export type SceneStatus =
  | 'RUNNING'
  | 'STAMINA_EXHAUSTED'
  | 'PLAYER_ENDED'
  | 'ORGASM_LIMIT_REACHED'
  | 'PARTNER_DECEASED';  // life force reached 0; NPC dies; scene terminates immediately

/**
 * PartnerEngagementStatus — the female partner's moment-to-moment state during an
 * intimacy scene. Derived each turn from arousal, resistance, shame, and faint
 * state. Used by the UI and narrative systems; stored on IntimacyScene for
 * serialisation.
 *
 * Precedence (highest wins):
 *   Fainted        → stamina hit 0; scene may continue but she is unconscious
 *   Horny          → arousal >= 80 and resistance <= 20
 *   Aroused        → arousal >= 50
 *   Hesitant       → resistance 30-70 or arousal < 30 with low shame
 *   Resisting      → resistance > 70
 *   Neutral        → baseline; arousal < 30, resistance <= 30, not fainted
 */
export type PartnerEngagementStatus =
  | 'Neutral'
  | 'Resisting'
  | 'Hesitant'
  | 'Aroused'
  | 'Horny'
  | 'Fainted';

/**
 * Pure derivation of PartnerEngagementStatus from scene stats.
 * Called once per turn after all stat mutations are resolved.
 * Does NOT mutate scene state.
 */
export function derivePartnerEngagementStatus(
  hasFainted:        boolean,
  arousal:           number,   // 0-100
  currentResistance: number,   // 0-100
  shame:             number,   // 0-100
): PartnerEngagementStatus {
  if (hasFainted) return 'Fainted';

  // High arousal + low resistance = actively wanting it
  if (arousal >= 80 && currentResistance <= 20) return 'Horny';

  // Aroused: body responding even if mind hasn't caught up
  if (arousal >= 50) return 'Aroused';

  // Resisting: high resistance dominates
  if (currentResistance > 70) return 'Resisting';

  // Hesitant: mid-resistance OR low arousal + residual shame
  if (currentResistance > 30 || (arousal < 30 && shame >= 40)) return 'Hesitant';

  // Neutral: low arousal, low resistance, low shame — detached compliance
  return 'Neutral';
}

export type PenetrationTarget = 'VAGINA' | 'ANAL' | 'ORAL';

export type ClothingState =
  | 'FULLY_CLOTHED'
  | 'TOPLESS'
  | 'BOTTOMLESS'
  | 'FULLY_UNDRESSED';

export type ClothingCondition = 'INTACT' | 'TORN';

export type CumDestination = 'INSIDE' | 'OUTSIDE';

// ============================================================
// NpcPartnerProfile  — caller extracts from NpcCharacter
// Uses canonical spawn-engine types; no re-definitions.
// ============================================================

export interface NpcPartnerProfile {
  npcId: string;

  // Whether this partner is a world NPC or a defeated humanoid enemy.
  // Controls death consequences: NPC death → reputation penalty + removal from contacts;
  // ENEMY_HUMANOID death → XP + loot (same as combat kill), no reputation cost.
  entityType: 'NPC' | 'ENEMY_HUMANOID';

  // Populated only when entityType === 'ENEMY_HUMANOID'.
  // Dispatcher reads these from ENEMY_KILLED_IN_INTIMACY to award XP and resolve loot.
  lootTableId?: string;
  xpReward?:    number;

  // ── Personality / Psychology ────────────────────────────
  dominantTrait:      string;            // DominantTrait enum value
  emotionalStability: string;            // EmotionalStability enum value
  sexualLean:         SexualLean;
  acquiredKinks:      Kink[];            // Kink[] — not string[]; used for kink bonus matching

  // ── Resistance (full interface, not a string union) ────
  resistanceProfile:   ResistanceProfile;
  corruptionShame:     CorruptionShameTrack;

  // ── Orgasm profile ─────────────────────────────────────
  orgasmProfile:       OrgasmProfile;   // multipleCapacity, squirtCapacity, ease, dominantType, postSensitivity

  // ── Physiology ─────────────────────────────────────────
  arousalSpeed:        ArousalSpeed;
  lubricationSpeed:    LubricationSpeed;
  elasticity:          VaginaElasticity;
  sensitivity:         FemaleSensitivityProfile;  // per-zone SensitivityTrack
  wetnessTrack:        WetnessTrack;

  // ── Persistent state (read from dynamicState at scene start) ─
  arousalCurrent:      number;
  squirtStorage:       number;
  squirtStorageMax:    number;
  squirtProbability:   number;
  milkStorage:         number;
  milkStorageMax:      number;
  actsWithPlayer:      SexualActFlags;

  // ── Encounter tracking ─────────────────────────────────
  encounterCountWithPlayer: number;
  cupSize?:            CupSize;

  // ── Relationship state (used by deriveCurrentResistance) ─
  // Sourced from CharacterDynamicState.mental at scene start
  trustWithPlayer:     number;   // 0-100
  attachmentWithPlayer: number;  // 0-100; used as love proxy
  submissionToPlayer:  number;   // 0-100
  hiddenDesireAligned: boolean;  // caller checks HiddenDesireLean vs scene type

  // Life force carried in from NpcCharacter.intimacyLifeForce (undefined = full 100).
  // Caller must read NpcCharacter before starting scene and pass current value.
  intimacyLifeForce?:  number;
}

export interface PlayerProfile {
  technique:     number;
  virility:      number;
  staminaCurrent: number;
  staminaMax:    number;
  cumStorage:    number;
  cumStorageMax: number;
  arousalCurrent: number;
  intimatePartnerHistory: string[];
}

// ============================================================
// ITEM / STAT / CONSUMABLE TYPES
// ============================================================

export interface RequiredItem {
  itemId:        string;
  consumedOnUse: boolean;
  consumeQty?:   number;
}

export interface SexualStatDeltas {
  arousalDelta?:           number;
  milkProductionDelta?:    number;
  squirtStorageDelta?:     number;
  squirtProbabilityDelta?: number;
  cumStorageDelta?:        number;
  sensitivityDelta?:       number;
  lubricationDelta?:       number;
}

export interface ConsumableEffect {
  itemId:                   string;
  durationTurns:            number;
  arousalGainMult?:         number;
  squirtStorageMult?:       number;
  squirtThresholdOverride?: number;
  painMult?:                number;
  blockPregnancyCheck?:     boolean;
}

export interface ActiveConsumable {
  effect:          ConsumableEffect;
  turnsRemaining:  number;
}

// ============================================================
// ORGASM EVENT TYPES
// Now properly uses OrgasmType enum from enums.ts
// ============================================================

/**
 * A female orgasm event.
 * type: the OrgasmType the character experienced (from orgasmProfile.dominantType or
 *       matched body part). OrgasmType.Multiple = body-shaking multi-orgasm.
 * simultaneous: true only when orgasmProfile.multipleCapacity === true AND
 *               a second orgasm fires in the same turn.
 */
export interface FemaleOrgasmEvent {
  type:            OrgasmType;
  simultaneous:    boolean;     // true = multiple-orgasm capacity, second peak same turn
  squirtTriggered: boolean;
  squirtAmount:    number;
  turnOccurred:    number;
}

export interface MaleOrgasmEvent {
  cumExpelled:    number;
  destination:    CumDestination;
  pregnancyCheck: boolean;
}

// ============================================================
// POSITION & ACTION SCHEMAS
// ============================================================

export interface IntimacyPosition {
  id:                      string;
  name:                    string;
  penetrationTargetsUsed:  PenetrationTarget[];
  allowedActionIds:        string[];
  requiredClothingState?:  ClothingState;
  minTrust?:               number;
  minLove?:                number;
  requiredPartnerFeature?: string;
  partnerLeads?:           boolean;
  allowedStartTypes?:      SceneStartType[];
  transitionCost?:         number;
  description:             string;
}

export interface IntimacyAction {
  id:                   string;
  name:                 string;
  tecRequirement:       number;
  stimulationIntensity: number;
  effectivenessOnFail?: number;
  penetrationTarget?:   PenetrationTarget;
  // bodyPartTargeted must match FemaleSensitivityProfile zone keys for sensitivity lookup:
  // 'nipple' | 'breast' | 'vagina' | 'clit' | 'cervix' | 'womb' | 'ass' | 'lips' | 'ears' | 'skin' | 'body' | 'throat' | 'hair' | 'clothing'
  bodyPartTargeted:     string;
  staminalCostPlayer:   number;
  staminalCostPartner:  number;
  painValue?:           number;
  orgasmChance?:        number;
  // kinkTagsTriggered must use Kink enum values to match acquiredKinks on partner
  kinkTagsTriggered?:   Kink[];
  requiredPositionIds?: string[];
  postDefeatOnly?:      boolean;
  requiredItems?:       RequiredItem[];
  statDeltas?:          SexualStatDeltas;
  clothingChange?:      'STRIP_PARTNER_LAYER' | 'STRIP_SELF_LAYER';
  expelsCum?:           boolean;
  // Choke sequence flags
  setsNeckGrab?:        boolean;
  requiresNeckGrab?:    boolean;
  clearsNeckGrab?:      boolean;
  description:          string;
}

// ============================================================
// SCENE STATE
// ============================================================

export interface IntimacyScene {
  sceneId:                    string;
  startType:                  SceneStartType;
  partnerNpcId:               string;
  activePositionId:           string | null;
  activeActionId:             string | null;
  occupiedPenetrationTargets: PenetrationTarget[];
  turnCount:                  number;
  status:                     SceneStatus;
  clothingState:              ClothingState;
  selfClothingState:          ClothingState;
  clothingCondition:          ClothingCondition;

  // Satisfaction formula inputs
  pleasurePeak:   number;
  orgasmCount:    number;
  kinksTriggered: number;   // count of Kink enum matches with partner's acquiredKinks
  painExcess:     number;

  // Partner vitals
  partnerStaminaCurrent:   number;
  partnerStaminaMax:       number;
  partnerArousal:          number;   // 0-100; persisted between scenes
  partnerPainTolerance:    number;

  // Player vitals
  playerStaminaCurrent:    number;
  playerStaminaMax:        number;
  playerArousal:           number;
  playerOrgasmCount:       number;

  // Fluid storages (persisted between scenes — point 3)
  cumStorage:              number;
  cumStorageMax:           number;
  squirtStorage:           number;
  squirtStorageMax:        number;
  squirtProbability:       number;
  milkStorage:             number;
  milkStorageMax:          number;
  milkStorageDelta:        number;   // accumulated this scene; written to NPC at end

  // Lubrication — derived from wetnessTrack each turn (not a raw scalar)
  currentWetness:          WetnessLevel;

  // Pleasure track (from patches.ts — distinct from arousal)
  pleasureTrack:           PleasureTrack;

  // Sensitivity modifier (sum of active sensitivityDelta effects; NOT a replacement for per-zone)
  sensitivityModifier:     number;

  // Post-orgasm sensitivity state (from orgasmProfile.postSensitivity)
  // HEIGHTENED / OVERWHELMED apply multipliers for turns after an orgasm
  postOrgasmSensitivityState: PostOrgasmSensitivity;

  // Orgasm logs
  femaleOrgasmLog:         FemaleOrgasmEvent[];

  // Momentum (0-10)
  momentumScore:           number;
  lastActionId:            string | null;
  consecutiveRepeatCount:  number;

  // Sub-state trackers (from patches.ts)
  subspaceTracker:         SubspaceTracker;
  afterglowTracker:        AfterglowTracker;

  // Active consumables
  activeConsumables:       ActiveConsumable[];

  // Orgasm denial flag
  orgasmDeniedThisScene:   boolean;

  // Neck grab choke-sequence state
  neckGrabActive:          boolean;

  // Relationship accumulators (written back post-scene)
  loveDeltaAccum:          number;
  trustDeltaAccum:         number;

  // Acts-this-scene accumulator (fed to resolvePostEncounter at scene end)
  actsThisScene:           Partial<SexualActFlags>;

  // ── Faint / life-force system ───────────────────────────────────────────
  // partnerHasFainted: latches true the turn partner stamina first hits 0.
  //   Never resets within a scene. UI should show 'Fainted' status.
  partnerHasFainted:       boolean;

  // faintedAtTurn: the turnCount value on the turn fainting occurred.
  //   null until the faint event fires. Used to compute diminishing-return scalar.
  faintedAtTurn:           number | null;

  // partnerLifeForce: 0-100. Starts at the NPC's intimacyLifeForce (default 100).
  //   After fainting, every action's stamina cost is redirected here instead.
  //   When this reaches 0 the scene must end — continuing further risks the NPC.
  partnerLifeForce:        number;

  // partnerEngagementStatus: derived each turn from arousal, resistance, shame,
  //   and hasFainted. Stored for serialisation and UI consumption.
  partnerEngagementStatus: PartnerEngagementStatus;
}

// ============================================================
// RESULT TYPES
// ============================================================

export interface SceneActionResult {
  scene:           IntimacyScene;
  narrative:       string[];
  events:          GameEvent[];
  tecPassed:       boolean;
  pleasureGained:  number;
  femaleOrgasm?:   FemaleOrgasmEvent;
  maleOrgasm?:     MaleOrgasmEvent;
}

export interface SceneEndPersistence {
  partnerSquirtStorage:     number;
  partnerSquirtProbability: number;
  partnerMilkStorage:       number;
  partnerArousal:           number;
  partnerCurrentWetness:    WetnessLevel;
  partnerMood:              MoodValue;
  playerCumStorage:         number;
  playerArousal:            number;
  partnerLoveDelta:         number;
  partnerTrustDelta:        number;
  afterglow:                boolean;
  updatedActs:              Partial<SexualActFlags>;   // merged with NPC's actsWithPlayer post-scene

  // True when the scene ends with partner still in fainted state (but alive).
  // Caller must set NpcCharacter.intimacyBlockedForDay = true and write lifeForce remainder.
  partnerBlockedForDay:     boolean;
  partnerLifeForceRemainder: number;  // value to persist to NpcCharacter.intimacyLifeForce

  // True when life force reached 0 and the NPC died.
  // Dispatcher must: set NpcCharacter.isDeceased = true, remove from contacts[],
  // remove from party if present, apply reputationDelta across all known regions,
  // increment flags['intimacy_death_count'].
  partnerDeceased:          boolean;

  // Reputation delta to apply when partnerDeceased is true.
  // Already scaled by scene start type — dispatcher applies this directly.
  // 0 when partnerDeceased is false OR partner is ENEMY_HUMANOID (no rep cost for monster kills).
  reputationPenalty:        number;

  // Entity type of the partner — used by dispatcher to branch on death consequences:
  //   NPC           → apply reputationPenalty, remove from contacts, flag intimacy_death_count
  //   ENEMY_HUMANOID → award XP + resolve loot (same path as combat kill), no reputation cost
  partnerEntityType:        'NPC' | 'ENEMY_HUMANOID';
}

export interface SceneEndResult {
  satisfaction:   number;
  narrative:      string[];
  events:         GameEvent[];
  persistence:    SceneEndPersistence;
}

// ============================================================
// HELPERS
// ============================================================

function jitter(value: number): number {
  return value * (0.9 + Math.random() * 0.2);
}

function arousalMult(arousal: number): number {
  return 0.6 + (arousal / 100) * 0.8;
}

function momentumMult(momentum: number): number {
  if (momentum >= 7) return 1.15;
  if (momentum <= 2) return 0.90;
  return 1.0;
}

/**
 * Derives the effective currentResistance (0-100) at scene start from
 * relationship stats, experience, corruption, shame, and scene type.
 *
 * The ResistanceProfile.profileType (FIGHT/FREEZE/COMPLY/ENJOY) is authored
 * and does not change here — it defines the character of resistance.
 * currentResistance defines the strength of that resistance in this moment.
 *
 * Rules applied additively to baselineResistance, clamped [0, 100]:
 *
 *  BOND RULES (love + trust + experience)
 *   High love + trust + experience           −40  (she genuinely wants this)
 *   High love + trust + zero experience      −10  (loves him but nervous)
 *   Growing love/trust + some corruption     −25  (friction dissolving)
 *
 *  CORRUPTION / SUBMISSION / ATTACHMENT RULES
 *   Low love + high corruption + high attachment −50  (dependence, not love)
 *   Low love + high corruption + high submission −55  (fully broken)
 *   High submission alone                    −20  (submission is a direct reducer)
 *
 *  SHAME / INEXPERIENCE RULES
 *   High shame + low love + low corruption   +20  (genuinely resistant)
 *   No trust + no love + virgin              +30  (maximum resistance)
 *   No trust + no love + experienced         +10  (transactional friction)
 *
 *  SCENE TYPE MODIFIERS
 *   FORCE + low trust                        +25  (being forced by a stranger)
 *   FORCE + high trust                       −10  (forced by someone trusted — conflicted)
 *   POST_DEFEAT + corruption ≥30             −20  (defeat + corruption = compliance)
 *
 *  FAMILIARITY RULES (encounter count)
 *   ≥20 encounters + high love               −15  (comfort and intimacy)
 *   ≥20 encounters + low love                −5   (familiarity alone reduces friction)
 *
 *  HIDDEN DESIRE ALIGNMENT
 *   Hidden desire matches scene              −10  (secret want aligns with what's happening)
 */
export function deriveCurrentResistance(params: {
  baselineResistance:  number;   // from ResistanceProfile
  traumaModifier:      number;   // from ResistanceProfile; -20 to +30
  love:                number;   // 0-100 (MentalState.attachmentWithPlayer used as love proxy if no separate love)
  trust:               number;   // 0-100 (MentalState.trustWithPlayer)
  submission:          number;   // 0-100 (MentalState.submissionToPlayer)
  attachment:          number;   // 0-100 (MentalState.attachmentWithPlayer)
  corruption:          number;   // 0-100 (MentalState.corruptionCurrent)
  shame:               number;   // 0-100 (MentalState.shameCurrent)
  encounterCount:      number;   // RelationshipState.encounterCountWithPlayer
  sceneStartType:      SceneStartType;
  hiddenDesireAligned: boolean;  // caller checks HiddenDesireLean vs scene type
}): number {
  const {
    baselineResistance, traumaModifier,
    love, trust, submission, attachment, corruption, shame,
    encounterCount, sceneStartType, hiddenDesireAligned,
  } = params;

  // Experience proxy: encounterCount > 0 = has experience with player
  const isVirginWithPlayer   = encounterCount === 0;
  const hasSomeExperience    = encounterCount >= 5;
  const hasHighExperience    = encounterCount >= 20;

  let mod = 0;

  // ── Bond rules ─────────────────────────────────────────────────────────────
  if (love >= 70 && trust >= 60) {
    mod += hasSomeExperience ? -40 : -10;  // love + trust; nervousness if inexperienced
  } else if (love >= 40 && trust >= 40 && corruption >= 20) {
    mod -= 25;  // growing bond + corruption dissolving friction
  } else if (love >= 40 && trust >= 40) {
    mod -= 15;  // growing bond without corruption
  }

  // ── Corruption / submission / attachment rules ─────────────────────────────
  if (love < 20 && corruption >= 70) {
    if (submission >= 70)  mod -= 55;  // fully broken + submissive
    else if (attachment >= 60) mod -= 50;  // dependent without love
  }
  // Submission is a direct reducer regardless of other conditions
  if (submission >= 60) mod -= 20;
  else if (submission >= 40) mod -= 10;

  // ── Shame / inexperience rules ─────────────────────────────────────────────
  if (shame >= 70 && love < 30 && corruption < 30) {
    mod += 20;  // high shame, no bond, not corrupted — genuinely resistant
  }
  if (trust < 20 && love < 20) {
    mod += isVirginWithPlayer ? 30 : 10;  // stranger; virgin adds maximum friction
  }

  // ── Scene type modifiers ───────────────────────────────────────────────────
  if (sceneStartType === 'FORCE_INTIMACY' || sceneStartType === 'FORCE_INTIMACY_SLEEPING') {
    mod += trust >= 60 ? -10 : 25;  // trusted person forcing = conflicted; stranger = fight
  }
  if (sceneStartType === 'POST_DEFEAT' && corruption >= 30) {
    mod -= 20;  // corruption + defeat → compliance
  }

  // ── Familiarity rules ──────────────────────────────────────────────────────
  if (hasHighExperience) {
    mod += love >= 40 ? -15 : -5;
  }

  // ── Hidden desire alignment ────────────────────────────────────────────────
  if (hiddenDesireAligned) mod -= 10;

  // ── Trauma modifier from ResistanceProfile ─────────────────────────────────
  mod += traumaModifier;  // -20 to +30; authored per character

  return Math.max(0, Math.min(100, baselineResistance + mod));
}

/**
 * Pain multiplier derived from ResistanceProfile and CorruptionShameTrack.
 * Pain lovers (Masochistic SexualLean) convert pain to arousal.
 * FIGHT/FREEZE resistance with high shame amplifies pain perception.
 * Shame decays mid-scene as arousal rises (simulates reluctant arousal arc).
 */
function effectivePainMult(
  resistanceProfile: ResistanceProfile,
  sexualLean:        SexualLean,
  shame:             number,
  currentResistance: number,
): number {
  // Base multiplier from profile type
  let base: number;
  switch (resistanceProfile.profileType) {
    case ResistanceProfileType.Enjoy:   base = -0.5; break;  // pain → arousal
    case ResistanceProfileType.Comply:  base = 0.8;  break;
    case ResistanceProfileType.Freeze:  base = 1.2;  break;
    case ResistanceProfileType.Fight:   base = 1.6;  break;
  }

  // Masochistic lean converts pain to pleasure regardless of profile
  if (sexualLean === SexualLean.Masochistic) base = -0.6;

  // Shame amplifies pain for resistant profiles; high shame = higher perception
  const shameBonus = (resistanceProfile.profileType === ResistanceProfileType.Fight ||
                      resistanceProfile.profileType === ResistanceProfileType.Freeze)
    ? shame * 0.005   // up to +0.5 at shame 100
    : 0;

  // currentResistance scales the effective multiplier — resistance decays mid-scene
  // at 0 resistance even a FIGHT profile behaves closer to COMPLY
  const resistanceFactor = 0.5 + (currentResistance / 100) * 0.5;

  return (base + shameBonus) * resistanceFactor;
}

/**
 * Resistance profile arousal gain multiplier.
 * Non-consensual scenes filtered by current resistance (decays mid-scene).
 * Shame adds a secondary friction: high shame reduces arousal gain even from COMPLY.
 */
function resistanceArousalMult(
  profile:    ResistanceProfile,
  startType:  SceneStartType,
  shame:      number,
  corruption: number,
): number {
  if (startType === 'CONSENSUAL') return 1.0;

  // Base from profile type
  let base: number;
  switch (profile.profileType) {
    case ResistanceProfileType.Enjoy:   base = 1.2;  break;
    case ResistanceProfileType.Comply:  base = 1.0;  break;
    case ResistanceProfileType.Freeze:  base = 0.5;  break;
    case ResistanceProfileType.Fight:   base = 0.3;  break;
  }

  // Resistance decay: as currentResistance falls, even FIGHT approaches COMPLY
  const decayFactor = 0.4 + (profile.currentResistance / 100) * 0.6;
  base *= decayFactor;

  // Shame friction: high shame reduces arousal gain (body betrayal arc)
  // Corruption counteracts shame: high corruption nullifies the friction
  const shameFriction = Math.max(0, (shame - corruption) / 100) * 0.3;

  return Math.max(0.1, base - shameFriction);
}

/**
 * Elasticity-based penetration pain reduction.
 */
function elasticityPainReduction(e: VaginaElasticity): number {
  switch (e) {
    case VaginaElasticity.VeryHigh: return 0.40;
    case VaginaElasticity.High:     return 0.25;
    case VaginaElasticity.Moderate: return 0.00;
    case VaginaElasticity.Low:      return -0.25;
  }
}

/**
 * Wetness-based lubrication pain reduction.
 * Derived from WetnessLevel (calculated from WetnessTrack each turn).
 */
function wetnessPainMult(wetness: WetnessLevel): number {
  switch (wetness) {
    case WetnessLevel.Dry:      return 1.00;
    case WetnessLevel.Damp:     return 0.90;
    case WetnessLevel.Moderate: return 0.75;
    case WetnessLevel.Wet:      return 0.60;
    case WetnessLevel.VeryWet:  return 0.45;
    case WetnessLevel.Dripping: return 0.35;
    case WetnessLevel.Flooding: return 0.25;
  }
}

/**
 * Orgasm chance multiplier from OrgasmEase (canonical enum, replaces OrgasmTriggerSensitivity).
 */
function orgasmEaseMult(ease: OrgasmEase): number {
  switch (ease) {
    case OrgasmEase.VeryEasy:      return 1.7;
    case OrgasmEase.Easy:          return 1.3;
    case OrgasmEase.Moderate:      return 1.0;
    case OrgasmEase.Difficult:     return 0.6;
    case OrgasmEase.VeryDifficult: return 0.35;
  }
}

/**
 * Per-zone sensitivity lookup from FemaleSensitivityProfile.
 * Maps bodyPartTargeted string → SensitivityTrack.current → multiplier.
 * Falls back to SensitivityLevel.Moderate for unmapped zones.
 */
function zoneSensitivityMult(
  sensitivity: FemaleSensitivityProfile,
  zone: string,
): number {
  const SENSITIVITY_MULT: Record<SensitivityLevel, number> = {
    [SensitivityLevel.None]:         0.0,
    [SensitivityLevel.Low]:          0.6,
    [SensitivityLevel.Moderate]:     1.0,
    [SensitivityLevel.High]:         1.4,
    [SensitivityLevel.VeryHigh]:     1.8,
    [SensitivityLevel.Extreme]:      2.4,
    [SensitivityLevel.Overwhelming]: 3.2,
  };

  const zoneMap: Record<string, keyof FemaleSensitivityProfile> = {
    nipple: 'nipple',  breast: 'breast', vagina: 'vagina',
    clit:   'clit',    cervix: 'cervix', womb:   'womb',
    ass:    'ass',     lips:   'lips',   ears:   'ears',
    skin:   'skin',    tongue: 'tongue',
  };

  const key = zoneMap[zone];
  const track = key ? sensitivity[key] : null;
  const level = track ? track.current : SensitivityLevel.Moderate;
  return SENSITIVITY_MULT[level] ?? 1.0;
}

/**
 * Post-orgasm sensitivity state multiplier.
 * OVERWHELMED causes pain spike on further stimulation.
 */
function postOrgasmMult(state: PostOrgasmSensitivity): number {
  switch (state) {
    case PostOrgasmSensitivity.Normal:     return 1.0;
    case PostOrgasmSensitivity.Heightened: return 1.4;
    case PostOrgasmSensitivity.Overwhelmed: return 0.3;  // stimulation causes discomfort
  }
}

/**
 * Kink match count — uses Kink enum values on both sides.
 */
function kinkMatchCount(action: IntimacyAction, acquiredKinks: Kink[]): number {
  if (!action.kinkTagsTriggered) return 0;
  return action.kinkTagsTriggered.filter(k => acquiredKinks.includes(k)).length;
}

/**
 * Dominant orgasm type bonus — extra orgasm chance if action's zone matches dominantType.
 */
function dominantTypeBonus(action: IntimacyAction, dominantType: OrgasmType): number {
  const zoneToType: Record<string, OrgasmType> = {
    clit:   OrgasmType.Clitoral,
    vagina: OrgasmType.Vaginal,
    gspot:  OrgasmType.Vaginal,
    womb:   OrgasmType.Combined,
    cervix: OrgasmType.Combined,
    anal:   OrgasmType.Anal,
    ass:    OrgasmType.Anal,
  };
  return zoneToType[action.bodyPartTargeted] === dominantType ? 0.08 : 0;
}

/**
 * Whether a given orgasm type is accessible to this character.
 * Anal/Clitoral/Vaginal/Combined require corresponding acquiredType.
 * Multiple requires multipleCapacity.
 * Squirting requires squirtCapacity.
 */
function canOrgasm(profile: OrgasmProfile, type: OrgasmType): boolean {
  if (type === OrgasmType.Multiple)   return profile.multipleCapacity;
  if (type === OrgasmType.Squirting)  return profile.squirtCapacity;
  return profile.acquiredTypes.includes(type) || type === profile.dominantType;
}

function compositeConsumable(scene: IntimacyScene): {
  arousalMult: number; squirtMult: number; squirtThreshold: number; painMult: number; blockPregnancy: boolean;
} {
  let am = 1.0, sm = 1.0, st = SQUIRT_THRESHOLD, pm = 1.0, bp = false;
  for (const c of scene.activeConsumables) {
    if (c.turnsRemaining <= 0) continue;
    am *= c.effect.arousalGainMult    ?? 1.0;
    sm *= c.effect.squirtStorageMult  ?? 1.0;
    st  = c.effect.squirtThresholdOverride ?? st;
    pm *= c.effect.painMult           ?? 1.0;
    bp  = bp || (c.effect.blockPregnancyCheck ?? false);
  }
  return { arousalMult: am, squirtMult: sm, squirtThreshold: st, painMult: pm, blockPregnancy: bp };
}

function advanceClothingState(current: ClothingState): ClothingState {
  switch (current) {
    case 'FULLY_CLOTHED':    return 'TOPLESS';
    case 'TOPLESS':          return 'BOTTOMLESS';
    case 'BOTTOMLESS':       return 'FULLY_UNDRESSED';
    case 'FULLY_UNDRESSED':  return 'FULLY_UNDRESSED';
  }
}

// ============================================================
// MILK STORAGE MAX FROM CUP SIZE
// ============================================================

export function milkStorageMaxFromCupSize(cupSize?: CupSize): number {
  switch (cupSize) {
    case CupSize.AA: case CupSize.A: case CupSize.B: return 60;
    case CupSize.C:  case CupSize.D:                 return 100;
    case CupSize.DD: case CupSize.E:                 return 140;
    default:                                          return 180;  // F+
  }
}

// ============================================================
// TEC CHECK
// ============================================================

export function runTecCheck(playerTechnique: number, actionTecRequirement: number): boolean {
  const roll = 1 + Math.floor(Math.random() * 10);
  return (playerTechnique + roll) >= actionTecRequirement;
}

// ============================================================
// PENETRATION CONFLICT CHECK
// ============================================================

export function checkPenetrationConflict(scene: IntimacyScene, action: IntimacyAction): boolean {
  if (!action.penetrationTarget) return false;
  return scene.occupiedPenetrationTargets.includes(action.penetrationTarget);
}

// ============================================================
// SATISFACTION CALCULATOR
// ============================================================

export function calcSatisfaction(scene: IntimacyScene): number {
  const raw =
    (scene.pleasurePeak   * 0.4) +
    (scene.orgasmCount    * 15)  +
    (scene.kinksTriggered * 10)  -
    (scene.painExcess     * 5);
  return Math.max(0, Math.min(100, Math.round(raw)));
}

// ============================================================
// SCENE START
// ============================================================

export function startScene(
  partnerNpcId:   string,
  startType:      SceneStartType,
  partner:        NpcPartnerProfile,
  player:         PlayerProfile,
): IntimacyScene {
  // Recompute currentResistance from relationship state before scene begins.
  // This means resistance is always contextually correct regardless of what
  // was stored on ResistanceProfile from last session.
  const dynamicResistance = deriveCurrentResistance({
    baselineResistance:  partner.resistanceProfile.baselineResistance,
    traumaModifier:      partner.resistanceProfile.traumaModifier,
    love:                partner.attachmentWithPlayer,  // attachment as love proxy
    trust:               partner.trustWithPlayer,
    submission:          partner.submissionToPlayer,
    attachment:          partner.attachmentWithPlayer,
    corruption:          partner.corruptionShame.corruption,
    shame:               partner.corruptionShame.shame,
    encounterCount:      partner.encounterCountWithPlayer,
    sceneStartType:      startType,
    hiddenDesireAligned: partner.hiddenDesireAligned,
  });

  // Patch the resistance profile with the dynamically derived value.
  // The profileType (FIGHT/FREEZE/COMPLY/ENJOY) is preserved.
  const resolvedResistanceProfile: ResistanceProfile = {
    ...partner.resistanceProfile,
    currentResistance: dynamicResistance,
  };

  // Re-bind partner with resolved resistance so all downstream calls use it
  const resolvedPartner: NpcPartnerProfile = {
    ...partner,
    resistanceProfile: resolvedResistanceProfile,
  };
  void resolvedPartner; // used by caller; engine stores partner ref in scene

  return {
    sceneId:                    `scene_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    startType,
    partnerNpcId,
    activePositionId:           null,
    activeActionId:             null,
    occupiedPenetrationTargets: [],
    turnCount:                  0,
    status:                     'RUNNING',
    clothingState:              'FULLY_CLOTHED',
    selfClothingState:          'FULLY_CLOTHED',
    clothingCondition:          'INTACT',

    pleasurePeak:   0,
    orgasmCount:    0,
    kinksTriggered: 0,
    painExcess:     0,

    partnerStaminaCurrent: 120,
    partnerStaminaMax:     120,
    partnerArousal:        partner.arousalCurrent,
    partnerPainTolerance:  30,

    playerStaminaCurrent:  player.staminaCurrent,
    playerStaminaMax:      player.staminaMax,
    playerArousal:         player.arousalCurrent,
    playerOrgasmCount:     0,

    cumStorage:         player.cumStorage,
    cumStorageMax:      player.cumStorageMax,
    squirtStorage:      partner.squirtStorage,
    squirtStorageMax:   partner.squirtStorageMax,
    squirtProbability:  partner.squirtProbability,
    milkStorage:        partner.milkStorage,
    milkStorageMax:     partner.milkStorageMax,
    milkStorageDelta:   0,

    // Derive starting wetness from wetnessTrack + starting arousal
    currentWetness: calculateCurrentWetness(partner.wetnessTrack, partner.arousalCurrent),

    pleasureTrack:   createPleasureTrack(),
    sensitivityModifier: 0,
    postOrgasmSensitivityState: PostOrgasmSensitivity.Normal,

    femaleOrgasmLog: [],
    momentumScore:   5,
    lastActionId:    null,
    consecutiveRepeatCount: 0,

    subspaceTracker:  createSubspaceTracker(),
    afterglowTracker: createAfterglowTracker(),

    activeConsumables: [],
    orgasmDeniedThisScene: false,
    neckGrabActive:        false,
    loveDeltaAccum:        0,
    trustDeltaAccum:       0,
    actsThisScene:         {},

    // Faint / life-force — carry in persisted life force; derive initial engagement status
    partnerHasFainted:       false,
    faintedAtTurn:           null,
    partnerLifeForce:        partner.intimacyLifeForce ?? 100,
    partnerEngagementStatus: derivePartnerEngagementStatus(
      false,
      partner.arousalCurrent,
      dynamicResistance,
      partner.corruptionShame.shame,
    ),
  };
}

// ============================================================
// CONSUMABLE APPLICATION
// ============================================================

export const CONSUMABLE_DEFS: Readonly<Record<string, ConsumableEffect>> = {
  condom:          { itemId: 'condom',          durationTurns: -1, blockPregnancyCheck: true },
  aphrodisiac_gel: { itemId: 'aphrodisiac_gel', durationTurns: 5,  arousalGainMult: 1.30 },
  lubricant:       { itemId: 'lubricant',       durationTurns: 4,  painMult: 0.50, squirtStorageMult: 1.15 },
  diuretic:        { itemId: 'diuretic',        durationTurns: 3,  squirtStorageMult: 1.40, squirtThresholdOverride: 0.40 },
};

export function applyConsumable(scene: IntimacyScene, itemId: string): IntimacyScene {
  const def = CONSUMABLE_DEFS[itemId];
  if (!def) throw new Error(`Unknown consumable: ${itemId}`);
  return {
    ...scene,
    activeConsumables: [
      ...scene.activeConsumables,
      { effect: def, turnsRemaining: def.durationTurns === -1 ? 9999 : def.durationTurns },
    ],
  };
}

// ============================================================
// ORGASM DENIAL
// ============================================================

export function orgasmDenial(scene: IntimacyScene): { scene: IntimacyScene; narrative: string[] } {
  if (scene.partnerArousal < 85) {
    return { scene, narrative: ['She is not close enough to edge yet.'] };
  }
  return {
    scene: {
      ...scene,
      partnerArousal:        70,
      squirtProbability:     Math.min(1.0, scene.squirtProbability + 0.20),
      kinksTriggered:        scene.kinksTriggered + 2,
      orgasmDeniedThisScene: true,
    },
    narrative: ['You hold back. She whimpers, hovering at the edge, denied release.'],
  };
}

// ============================================================
// SCENE ACTION RESOLVER
// ============================================================

export function resolveSceneAction(
  scene:      IntimacyScene,
  actionId:   string,
  positionId: string,
  player:     Pick<PlayerProfile, 'technique'>,
  partner:    NpcPartnerProfile,
  // gameState is optional so existing callers don't need updating immediately;
  // when omitted, passive arousal bonus is 0 (no skills applied).
  gameState?: GameState,
): SceneActionResult {
  if (scene.status !== 'RUNNING') {
    return { scene, narrative: ['The scene has already ended.'], events: [], tecPassed: false, pleasureGained: 0 };
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ACTIONS, POSITIONS } = require('../data/intimacyCatalog') as {
    ACTIONS:   Record<string, IntimacyAction>;
    POSITIONS: Record<string, IntimacyPosition>;
  };

  const action   = ACTIONS[actionId];
  const position = POSITIONS[positionId];
  if (!action)   throw new Error(`Unknown intimacy action: ${actionId}`);
  if (!position) throw new Error(`Unknown intimacy position: ${positionId}`);

  const narrative: string[] = [];
  const events:    GameEvent[] = [];
  const cEff = compositeConsumable(scene);

  // 2. Penetration conflict
  if (checkPenetrationConflict(scene, action)) {
    return {
      scene: { ...scene, activeActionId: actionId, activePositionId: positionId },
      narrative: [`${action.name} is blocked — that slot is already occupied.`],
      events, tecPassed: false, pleasureGained: 0,
    };
  }

  // 2b. Neck grab gate
  if (action.requiresNeckGrab && !scene.neckGrabActive) {
    return {
      scene: { ...scene, activeActionId: actionId, activePositionId: positionId },
      narrative: ['You need to grab her neck first before you can choke.'],
      events, tecPassed: false, pleasureGained: 0,
    };
  }

  // 3. TEC check
  const tecPassed     = runTecCheck(player.technique, action.tecRequirement);
  const tecEfficiency = tecPassed ? 1.0 : (action.effectivenessOnFail ?? 0.5);

  // 4. Overstimulation penalty
  const isRepeat    = scene.lastActionId === actionId;
  const repeatCount = isRepeat ? scene.consecutiveRepeatCount + 1 : 1;
  const overStimP   = repeatCount > 2 ? Math.max(0.4, 1.0 - (repeatCount - 2) * 0.20) : 1.0;

  // 5. Kink bonus — uses Kink enum matching against partner.acquiredKinks
  const kinkMatches = kinkMatchCount(action, partner.acquiredKinks);
  const kinkMult    = 1.0 + kinkMatches * 0.20;

  // 6. Arousal multiplier
  const aroMult = arousalMult(scene.partnerArousal);

  // 7. Momentum
  const momMult = momentumMult(scene.momentumScore);

  // 8. Per-zone sensitivity from FemaleSensitivityProfile (not a scalar)
  const zoneSensMult = zoneSensitivityMult(partner.sensitivity, action.bodyPartTargeted);

  // 9. Post-orgasm sensitivity state
  const postOrgMult = postOrgasmMult(scene.postOrgasmSensitivityState);

  // 10. Subspace pleasure bonus
  const subspaceMult = scene.subspaceTracker.active ? SUBSPACE_PLEASURE_BONUS : 1.0;

  // 11. ±jitter based on emotional stability
  const stdJitter = 0.9 + Math.random() * 0.2;

  // 12. Resistance arousal mult — reads currentResistance + shame + corruption
  const resMult = resistanceArousalMult(
    partner.resistanceProfile,
    scene.startType,
    partner.corruptionShame.shame,
    partner.corruptionShame.corruption,
  );

  // 12b. Passive arousal bonus from unlocked passive skills (task 16.15).
  //   derivePassiveArousalBonus() sums all passive AROUSAL_GAIN effects from any tree.
  //   Returns a flat additive bonus (e.g. 0.10 = +10% stimulation).
  //   Applied as (1 + bonus) multiplier so zero skills = ×1.0 (no change).
  const passiveArousalMult = gameState ? 1.0 + derivePassiveArousalBonus(gameState) : 1.0;

  // 13. Diminishing-return scalar for post-faint stimulation.
  //   Formula: 1 / (1 + turnsSinceFaint * 0.9)
  //   Turn of faint   → scalar ~0.53 (first post-faint action already penalised)
  //   +1 turn after   → ~0.36, +2 → ~0.27, +4 → ~0.18 — rapidly collapses.
  //   This gives roughly 10% of pre-faint output after 4 post-faint actions.
  const turnsSinceFaint  = scene.partnerHasFainted && scene.faintedAtTurn !== null
    ? (scene.turnCount - scene.faintedAtTurn) + 1   // +1: faint turn itself counts
    : 0;
  const postFaintDRMult  = scene.partnerHasFainted
    ? 1 / (1 + turnsSinceFaint * 0.9)
    : 1.0;

  // 13. Final stimulation
  const finalStim = Math.round(
    action.stimulationIntensity * tecEfficiency * overStimP
    * kinkMult * aroMult * momMult * zoneSensMult * postOrgMult * subspaceMult
    * stdJitter * cEff.arousalMult * resMult
    * postFaintDRMult        // collapses to near-zero after fainting
    * passiveArousalMult     // passive skill bonus (1.0 when no skills or gameState absent)
  );

  // 14. Stamina + faint latch + life-force bleed
  const newPlayerStamina = Math.max(0, scene.playerStaminaCurrent - action.staminalCostPlayer);

  // If partner has already fainted, redirect her stamina cost to life force instead.
  // If she hasn't yet: apply normally and check for the faint threshold.
  let newPartnerStamina    = scene.partnerStaminaCurrent;
  let newPartnerLifeForce  = scene.partnerLifeForce;
  let newPartnerHasFainted = scene.partnerHasFainted;
  let newFaintedAtTurn     = scene.faintedAtTurn;

  if (scene.partnerHasFainted) {
    // Stamina is already at 0; bleed into life force instead
    newPartnerLifeForce = Math.max(0, scene.partnerLifeForce - action.staminalCostPartner);
  } else {
    newPartnerStamina = Math.max(0, scene.partnerStaminaCurrent - action.staminalCostPartner);
    if (newPartnerStamina <= 0 && !scene.partnerHasFainted) {
      // Faint latch: fires exactly once
      newPartnerHasFainted = true;
      newFaintedAtTurn     = scene.turnCount;  // record the turn on which faint occurs
      newPartnerLifeForce  = Math.max(0, scene.partnerLifeForce - action.staminalCostPartner);
      narrative.push('Her eyes flutter shut. She goes limp in your arms — she has fainted from exhaustion.');
      events.push({ type: 'NPC_FAINTED_IN_INTIMACY', npcId: scene.partnerNpcId, atTurn: scene.turnCount });
    }
  }

  // 15. Pain — uses full ResistanceProfile + CorruptionShameTrack + elasticity + wetness + subspace
  const rawPain      = (action.painValue ?? 0) * tecEfficiency;
  const painPM       = effectivePainMult(
    partner.resistanceProfile,
    partner.sexualLean,
    partner.corruptionShame.shame,
    partner.resistanceProfile.currentResistance,
  );
  const elasticR     = elasticityPainReduction(partner.elasticity);
  const wetnessM     = wetnessPainMult(scene.currentWetness);
  const subspacePainM = scene.subspaceTracker.active ? SUBSPACE_PAIN_MULT : 1.0;
  const effectivePain = rawPain * Math.max(0, painPM) * (1 - elasticR) * wetnessM * subspacePainM * cEff.painMult;
  const painToArousal = rawPain > 0 && painPM < 0 ? rawPain * Math.abs(painPM) : 0;

  const newPainTolerance = Math.max(0, scene.partnerPainTolerance - Math.max(0, effectivePain));
  const newPainExcess    = scene.painExcess + Math.max(0, effectivePain - scene.partnerPainTolerance);

  // 16. Arousal + PleasureTrack update
  const arousalGain = finalStim + (action.statDeltas?.arousalDelta ?? 0) + painToArousal;
  const newArousal  = Math.min(100, scene.partnerArousal + arousalGain);
  const newPleasureTrack = updatePleasure(
    scene.pleasureTrack,
    finalStim / 100,
    zoneSensMult,
  );
  const newPleasurePeak  = Math.max(scene.pleasurePeak, finalStim);

  // 17. Wetness update from wetnessTrack + new arousal
  const newWetness = calculateCurrentWetness(partner.wetnessTrack, newArousal);

  // 18. Stat deltas (all jitter ±10%)
  const d = action.statDeltas ?? {};
  const newSqStore    = Math.min(scene.squirtStorageMax, scene.squirtStorage   + jitter(d.squirtStorageDelta    ?? 0) * cEff.squirtMult);
  const newSqProb     = Math.min(1.0,                   scene.squirtProbability + jitter(d.squirtProbabilityDelta ?? 0));
  const newCumStorage = Math.min(scene.cumStorageMax,   scene.cumStorage        + jitter(d.cumStorageDelta        ?? 0));
  const newMilkDelta  = scene.milkStorageDelta + jitter(d.milkProductionDelta ?? 0);
  const newSensMod    = scene.sensitivityModifier + (d.sensitivityDelta ?? 0);

  // 19. Subspace update (from patches.ts)
  let newSubspace = updateSubspaceTracker(
    scene.subspaceTracker,
    newArousal,
    effectivePain,
    newPleasureTrack.current,
  );

  // 20. Afterglow tick (if no orgasm this turn)
  let newAfterglow = scene.afterglowTracker;

  // 21. Female orgasm resolution — gated by OrgasmProfile capacities
  const baseOrgasmChance =
    (action.orgasmChance ?? 0) * tecEfficiency
    * orgasmEaseMult(partner.orgasmProfile.ease)
    + dominantTypeBonus(action, partner.orgasmProfile.dominantType);

  const orgasmFired = (newArousal >= 100 || Math.random() < baseOrgasmChance)
    && canOrgasm(partner.orgasmProfile, partner.orgasmProfile.dominantType);

  let femaleOrgasm: FemaleOrgasmEvent | undefined;
  let postOrgasmArousal    = newArousal;
  let newOrgasmCount       = scene.orgasmCount;
  let newSqProbFinal       = newSqProb;
  let newSqStoreFinal      = newSqStore;
  const newFemaleLog       = [...scene.femaleOrgasmLog];
  let newPostOrgasmState   = scene.postOrgasmSensitivityState;

  if (orgasmFired) {
    newOrgasmCount++;
    postOrgasmArousal = Math.max(0, newArousal - 80);

    // Multiple orgasm gate — OrgasmProfile.multipleCapacity must be true
    // AND orgasm was already experienced this scene
    const isSimultaneous = partner.orgasmProfile.multipleCapacity && scene.orgasmCount >= 1;

    // OrgasmType is now from the enum:
    // Multiple (body-shaking) if: multipleCapacity + prior orgasm OR orgasm was denied
    const resolvedType: OrgasmType =
      (isSimultaneous || scene.orgasmDeniedThisScene)
        ? OrgasmType.Multiple
        : partner.orgasmProfile.dominantType;

    // Squirt: gated by squirtCapacity (OrgasmProfile) AND storage + probability
    const squirtFires =
      partner.orgasmProfile.squirtCapacity &&
      newSqStoreFinal > 0 &&
      newSqProbFinal >= cEff.squirtThreshold;

    const squirtAmount = squirtFires
      ? Math.round(newSqStoreFinal * (0.4 + Math.random() * 0.4))
      : 0;

    if (squirtFires) {
      newSqStoreFinal = Math.max(0, newSqStoreFinal - squirtAmount);
      newSqProbFinal  = 0;
    }

    // Post-orgasm sensitivity state from OrgasmProfile
    newPostOrgasmState = partner.orgasmProfile.postSensitivity;

    // OVERWHELMED = further stimulation next turn causes pain spike (handled top of next turn)
    if (newPostOrgasmState === PostOrgasmSensitivity.Overwhelmed) {
      narrative.push('She flinches — another touch now would be too much.');
    }

    femaleOrgasm = {
      type:            resolvedType,
      simultaneous:    isSimultaneous,
      squirtTriggered: squirtFires,
      squirtAmount,
      turnOccurred:    scene.turnCount + 1,
    };
    newFemaleLog.push(femaleOrgasm);

    // Trigger afterglow via patches.ts
    const orgasmIntensity = resolvedType === OrgasmType.Multiple ? 1.0 : 0.6;
    const afterglowResult = triggerAfterglow(scene.afterglowTracker, orgasmIntensity);
    newAfterglow = afterglowResult;

    narrative.push(
      resolvedType === OrgasmType.Multiple
        ? 'Her body convulses in a violent multiple orgasm — a second wave tears through her before the first has finished.'
        : 'Your partner cries out and shudders through her climax.',
    );
    if (squirtFires) {
      narrative.push(`She squirts — ${squirtAmount} units expelled in a rush.`);
    }
  } else {
    // Tick afterglow between orgasms
    // We only need the updated tracker; state side-effect not needed here
    newAfterglow = tickAfterglow(scene.afterglowTracker, {
      // Minimal CharacterDynamicState shape; only tracker matters
      physical: {} as never, mental: {} as never,
      relationship: {} as never, body: {} as never,
    }).tracker;
  }

  // 22. Post-orgasm OVERWHELMED pain spike (applied from prior orgasm's state)
  const overWhelmPain = scene.postOrgasmSensitivityState === PostOrgasmSensitivity.Overwhelmed
    ? POST_ORGASM_OVERWHELMED_PAIN
    : 0;

  // 23. Kink tracking (enum-matched)
  const newKinksTriggered = scene.kinksTriggered + kinkMatches;

  // 24. Occupied targets
  const newOccupied: PenetrationTarget[] = action.penetrationTarget
    ? [...new Set([...scene.occupiedPenetrationTargets, action.penetrationTarget])]
    : scene.occupiedPenetrationTargets;

  // 25. Clothing changes
  let newClothingState     = scene.clothingState;
  let newSelfClothingState = scene.selfClothingState;
  let newClothingCondition = scene.clothingCondition;
  if (action.clothingChange === 'STRIP_PARTNER_LAYER') {
    newClothingState = advanceClothingState(scene.clothingState);
    if (scene.startType !== 'CONSENSUAL') newClothingCondition = 'TORN';
  } else if (action.clothingChange === 'STRIP_SELF_LAYER') {
    newSelfClothingState = advanceClothingState(scene.selfClothingState);
  }

  // 26. Momentum
  let newMomentum = scene.momentumScore;
  if (!tecPassed)          newMomentum = Math.max(0,  newMomentum - 1.5);
  else if (finalStim >= 15) newMomentum = Math.min(10, newMomentum + 1.0);

  // 27. Acts-this-scene accumulator
  const newActs: Partial<SexualActFlags> = { ...scene.actsThisScene };
  if (action.penetrationTarget === 'VAGINA') newActs.vaginalPenetration  = true;
  if (action.penetrationTarget === 'ANAL')   newActs.analPenetration     = true;
  if (action.penetrationTarget === 'ORAL')   newActs.oralReceiving       = true;
  if (action.id === 'face_fuck' || action.id === 'deep_throat') newActs.deepthroat = true;
  if (action.kinkTagsTriggered?.includes(Kink.Bondage))  newActs.bondageExperienced  = true;
  if (action.kinkTagsTriggered?.includes(Kink.Impact))   newActs.impactExperienced   = true;
  if (action.kinkTagsTriggered?.includes(Kink.Choking))  newActs.chokingExperienced  = true;
  if (action.kinkTagsTriggered?.includes(Kink.Edging))   newActs.edgingExperienced   = true;
  if (action.kinkTagsTriggered?.includes(Kink.Toys))     newActs.toyUsed             = true;
  if (femaleOrgasm?.squirtTriggered) newActs.squirtingAchieved     = true;
  if (femaleOrgasm?.simultaneous)    newActs.multipleOrgasmAchieved = true;

  // 28. Consumable tick-down
  const newConsumables = scene.activeConsumables
    .map(c => ({ ...c, turnsRemaining: c.turnsRemaining - 1 }))
    .filter(c => c.turnsRemaining > 0 || c.effect.durationTurns === -1);

  // 29. Love delta accumulation
  const loveDelta = actionId === 'french_kiss' ? 1 : 0;

  // 30. TEC narrative
  if (!tecPassed) narrative.push(`Your technique falters — ${action.name} lands at reduced power.`);
  if (repeatCount > 2) narrative.push('The repetition dulls the sensation slightly.');

  // 31. Exit conditions.
  //   Player stamina zero ends normally (his choice to stop or collapse).
  //   Partner stamina zero no longer ends the scene — she faints but scene continues.
  //   Life force zero: partner dies; scene terminates immediately as PARTNER_DECEASED.
  let newStatus: SceneStatus = 'RUNNING';
  if (newPlayerStamina <= 0) {
    newStatus = 'STAMINA_EXHAUSTED';
    narrative.push('Your stamina is spent. You can go no further.');
  } else if (newPartnerLifeForce <= 0) {
    // Life force exhausted — the partner does not survive post-faint continuation.
    // Scene is terminal; endScene() will branch on PARTNER_DECEASED to resolve consequences.
    newStatus = 'PARTNER_DECEASED';
    narrative.push('She goes completely still. There is no breath left in her.');
  } else if (newOrgasmCount >= MAX_ORGASMS_BEFORE_AUTO_END) {
    newStatus = 'ORGASM_LIMIT_REACHED';
    narrative.push('The scene reaches its natural conclusion.');
  }

  // Derive updated engagement status from post-turn values
  const newEngagementStatus = derivePartnerEngagementStatus(
    newPartnerHasFainted,
    postOrgasmArousal,
    partner.resistanceProfile.currentResistance,
    partner.corruptionShame.shame,
  );

  const updatedScene: IntimacyScene = {
    ...scene,
    activePositionId:           positionId,
    activeActionId:             actionId,
    occupiedPenetrationTargets: newOccupied,
    turnCount:                  scene.turnCount + 1,
    status:                     newStatus,
    clothingState:              newClothingState,
    selfClothingState:          newSelfClothingState,
    clothingCondition:          newClothingCondition,

    pleasurePeak:    newPleasurePeak,
    orgasmCount:     newOrgasmCount,
    kinksTriggered:  newKinksTriggered,
    painExcess:      newPainExcess + overWhelmPain,

    partnerStaminaCurrent: newPartnerStamina,
    playerStaminaCurrent:  newPlayerStamina,
    partnerArousal:        postOrgasmArousal,
    partnerPainTolerance:  newPainTolerance,

    cumStorage:              newCumStorage,
    squirtStorage:           newSqStoreFinal,
    squirtProbability:       newSqProbFinal,
    milkStorageDelta:        newMilkDelta,
    currentWetness:          newWetness,
    pleasureTrack:           newPleasureTrack,
    sensitivityModifier:     newSensMod,
    postOrgasmSensitivityState: newPostOrgasmState,

    femaleOrgasmLog:   newFemaleLog,
    momentumScore:     newMomentum,
    lastActionId:      actionId,
    consecutiveRepeatCount: repeatCount,

    subspaceTracker:   newSubspace,
    afterglowTracker:  newAfterglow,
    activeConsumables: newConsumables,

    loveDeltaAccum:    scene.loveDeltaAccum  + loveDelta,
    trustDeltaAccum:   scene.trustDeltaAccum,
    actsThisScene:     newActs,

    neckGrabActive: action.setsNeckGrab   ? true
                  : action.clearsNeckGrab ? false
                  : scene.neckGrabActive,

    // Faint / life-force fields
    partnerHasFainted:       newPartnerHasFainted,
    faintedAtTurn:           newFaintedAtTurn,
    partnerLifeForce:        newPartnerLifeForce,
    partnerEngagementStatus: newEngagementStatus,
  };

  return { scene: updatedScene, narrative, events, tecPassed, pleasureGained: finalStim, femaleOrgasm };
}

// ============================================================
// PLAYER ORGASM RESOLVER
// ============================================================

export function resolvePlayerOrgasm(
  scene:       IntimacyScene,
  destination: CumDestination,
): { scene: IntimacyScene; maleOrgasm: MaleOrgasmEvent; narrative: string[] } {
  const cEff        = compositeConsumable(scene);
  const cumExpelled = scene.cumStorage;
  const pregnancyCheck = destination === 'INSIDE' && !cEff.blockPregnancy;
  const narrative: string[] = [];

  narrative.push(cumExpelled > 80
    ? 'You release with overwhelming force, flooding her completely.'
    : cumExpelled > 40
      ? 'You finish with a deep groan, every drop spent.'
      : 'You reach your limit and release, spent and breathless.',
  );
  if (destination === 'OUTSIDE') narrative.push('You pull back at the last moment.');

  const newActs: Partial<SexualActFlags> = {
    ...scene.actsThisScene,
    ...(destination === 'INSIDE'  ? { vaginalCreampie: true, creampieReceived: true } : {}),
    ...(destination === 'OUTSIDE' ? { cumOnBody: true } : {}),
  };

  return {
    scene: {
      ...scene,
      playerArousal:     0,
      cumStorage:        0,
      playerOrgasmCount: scene.playerOrgasmCount + 1,
      actsThisScene:     newActs,
      partnerArousal: destination === 'INSIDE'
        ? Math.min(100, scene.partnerArousal + Math.round(15 * cEff.arousalMult))
        : scene.partnerArousal,
    },
    maleOrgasm: { cumExpelled, destination, pregnancyCheck },
    narrative,
  };
}

// ============================================================
// SCENE END  — calls patches.ts resolvePostEncounter shape
// ============================================================

export function endScene(scene: IntimacyScene, partner: NpcPartnerProfile): SceneEndResult {
  const narrative:    string[] = [];
  const events:       GameEvent[] = [];

  // ── Branch 1: Partner deceased (life force reached 0) ────────────────────────
  // This must be checked BEFORE the faint branch: death overrides faint.
  if (scene.status === 'PARTNER_DECEASED') {
    if (partner.entityType === 'ENEMY_HUMANOID') {
      // Monster POST_DEFEAT intimacy — same outcome as killing in combat:
      // no reputation penalty; dispatcher awards XP + resolves loot table.
      narrative.push('She does not rise again. You have defeated her completely.');
      events.push({
        type:        'ENEMY_KILLED_IN_INTIMACY',
        enemyId:     partner.npcId,
        lootTableId: partner.lootTableId ?? null,
        xpReward:    partner.xpReward ?? 0,
      });
      const persistence: SceneEndPersistence = {
        partnerSquirtStorage:     scene.squirtStorage,
        partnerSquirtProbability: scene.squirtProbability,
        partnerMilkStorage:       Math.min(scene.milkStorageMax, scene.milkStorage + scene.milkStorageDelta),
        partnerArousal:           0,
        partnerCurrentWetness:    scene.currentWetness,
        partnerMood:              MoodValue.Unconscious,
        playerCumStorage:         scene.cumStorage,
        playerArousal:            scene.playerArousal,
        partnerLoveDelta:         0,
        partnerTrustDelta:        0,
        afterglow:                false,
        updatedActs:              scene.actsThisScene,
        partnerBlockedForDay:     false,  // irrelevant — enemy is gone
        partnerLifeForceRemainder: 0,
        partnerDeceased:          true,
        reputationPenalty:        0,      // monsters yield no reputation consequence
        partnerEntityType:        'ENEMY_HUMANOID',
      };
      return { satisfaction: 0, narrative, events, persistence };
    }

    // World NPC death — reputation penalty scaled by scene start type:
    //   CONSENSUAL → −20 (tragic accident; still a crime)
    //   POST_DEFEAT → −30 (went too far after victory)
    //   FORCE_INTIMACY / FORCE_INTIMACY_SLEEPING → −40 (murder during assault)
    const reputationPenalty =
      (scene.startType === 'FORCE_INTIMACY' || scene.startType === 'FORCE_INTIMACY_SLEEPING') ? -40
      : scene.startType === 'POST_DEFEAT' ? -30
      : -20;

    narrative.push('She is gone. What just happened cannot be undone.');
    events.push({
      type:              'NPC_DIED_IN_INTIMACY',
      npcId:             partner.npcId,
      startType:         scene.startType,
      reputationPenalty,
    });
    const persistence: SceneEndPersistence = {
      partnerSquirtStorage:     scene.squirtStorage,
      partnerSquirtProbability: scene.squirtProbability,
      partnerMilkStorage:       Math.min(scene.milkStorageMax, scene.milkStorage + scene.milkStorageDelta),
      partnerArousal:           0,
      partnerCurrentWetness:    scene.currentWetness,
      partnerMood:              MoodValue.Unconscious,
      playerCumStorage:         scene.cumStorage,
      playerArousal:            scene.playerArousal,
      partnerLoveDelta:         0,
      partnerTrustDelta:        0,
      afterglow:                false,
      updatedActs:              scene.actsThisScene,
      partnerBlockedForDay:     false,  // irrelevant — NPC is gone permanently
      partnerLifeForceRemainder: 0,
      partnerDeceased:          true,
      reputationPenalty,
      partnerEntityType:        'NPC',
    };
    return { satisfaction: 0, narrative, events, persistence };
  }

  // ── Branch 2: Partner fainted but alive ──────────────────────────────────
  // Satisfaction is 0, love/trust zeroed, blocked for the day.
  // Only fires when partnerHasFainted AND life force > 0 (death was not reached).
  if (scene.partnerHasFainted) {
    narrative.push('She lies still, breathing slowly. She\'s unconscious — the encounter is over for today.');
    events.push({ type: 'NPC_INTIMACY_BLOCKED_FOR_DAY', npcId: scene.partnerNpcId });
    const persistence: SceneEndPersistence = {
      partnerSquirtStorage:     scene.squirtStorage,
      partnerSquirtProbability: scene.squirtProbability,
      partnerMilkStorage:       Math.min(scene.milkStorageMax, scene.milkStorage + scene.milkStorageDelta),
      partnerArousal:           0,
      partnerCurrentWetness:    scene.currentWetness,
      partnerMood:              MoodValue.Unconscious,
      playerCumStorage:         scene.cumStorage,
      playerArousal:            scene.playerArousal,
      partnerLoveDelta:         0,
      partnerTrustDelta:        0,
      afterglow:                false,
      updatedActs:              scene.actsThisScene,
      partnerBlockedForDay:     true,
      partnerLifeForceRemainder: scene.partnerLifeForce,
      partnerDeceased:          false,
      reputationPenalty:        0,
      partnerEntityType:        partner.entityType,
    };
    return { satisfaction: 0, narrative, events, persistence };
  }

  // ── Branch 3: Normal scene end ───────────────────────────────────────
  const satisfaction = calcSatisfaction(scene);

  if (satisfaction >= 80)      narrative.push('She gazes at you with heavy-lidded eyes, completely undone.');
  else if (satisfaction >= 50) narrative.push('A satisfied sigh. She seems genuinely content.');
  else if (satisfaction >= 20) narrative.push('The moment passes quietly. Neither of you says much.');
  else                         narrative.push('She looks away. It was not what either of you needed.');

  const afterglow = scene.afterglowTracker.active;
  const afterglowMult = afterglow ? 1.3 : 1.0;

  const isForced = scene.startType === 'FORCE_INTIMACY' || scene.startType === 'FORCE_INTIMACY_SLEEPING';
  let partnerMood: MoodValue;
  if (isForced) {
    partnerMood = MoodValue.Disgusted;
  } else if (afterglow) {
    partnerMood = MoodValue.Afterglow;
  } else if (satisfaction >= 60) {
    partnerMood = partner.corruptionShame.shame > 60
      ? MoodValue.AshamedButNeedy
      : MoodValue.Afterglow;
  } else if (satisfaction >= 30) {
    partnerMood = MoodValue.Dazed;
  } else {
    partnerMood = MoodValue.Conflicted;
  }

  const persistence: SceneEndPersistence = {
    partnerSquirtStorage:     scene.squirtStorage,
    partnerSquirtProbability: scene.squirtProbability,
    partnerMilkStorage:       Math.min(scene.milkStorageMax, scene.milkStorage + scene.milkStorageDelta),
    partnerArousal:           scene.partnerArousal,
    partnerCurrentWetness:    scene.currentWetness,
    partnerMood,
    playerCumStorage:         scene.cumStorage,
    playerArousal:            scene.playerArousal,
    partnerLoveDelta:         Math.round(scene.loveDeltaAccum  * afterglowMult),
    partnerTrustDelta:        Math.round(scene.trustDeltaAccum * afterglowMult),
    afterglow,
    updatedActs:              scene.actsThisScene,
    partnerBlockedForDay:     false,
    partnerLifeForceRemainder: scene.partnerLifeForce,
    partnerDeceased:          false,
    reputationPenalty:        0,
    partnerEntityType:        partner.entityType,
  };

  return { satisfaction, narrative, events, persistence };
}

export function playerEndScene(scene: IntimacyScene, partner: NpcPartnerProfile): SceneEndResult {
  return endScene({ ...scene, status: 'PLAYER_ENDED' }, partner);
}

// ============================================================
// POST-INTIMACY EXPERIENCE UPDATE
// Now calls resolvePostEncounter from patches.ts for all physiology/psychology patches
// ============================================================

export interface PlayerSnapshot {
  technique:    number;
  virility:     number;
  sensitivity:  number;
  xp:           number;
  ardorPoints:  number;
  cumStorage:   number;
  arousalCurrent: number;
  intimatePartnerHistory: string[];
}

export interface PartnerSnapshot {
  npcId:               string;
  trust:               number;
  love:                number;
  physiology:          FemaleSexualPhysiology;
  psychology:          SexualPsychology;
  dynamicState:        import('../spawn-engine/character/dynamicState').CharacterDynamicState;
  history:             import('../spawn-engine/character/historyProfile').ExperienceHistory;
  squirtStorage:       number;
  squirtProbability:   number;
  milkStorage:         number;
  arousalCurrent:      number;
}

export interface PostIntimacyPlayerUpdate {
  techniqueDelta:   number;
  virilitydelta:    number;
  sensitivityDelta: number;
  xpDelta:          number;
  ardorPointsDelta: number;
  cumStorage:       number;
  arousalCurrent:   number;
  newPartnerHistoryEntry?: string;
}

export interface PostIntimacyPartnerUpdate {
  npcId:            string;
  trustDelta:       number;
  loveDelta:        number;
  // Write-back from patches.ts resolvePostEncounter
  updatedPhysiology: FemaleSexualPhysiology;
  updatedPsychology: SexualPsychology;
  updatedDynamicState: import('../spawn-engine/character/dynamicState').CharacterDynamicState;
  updatedHistory:   import('../spawn-engine/character/historyProfile').ExperienceHistory;
  // Persistence bundle
  squirtStorage:    number;
  squirtProbability: number;
  milkStorage:      number;
  arousalCurrent:   number;
  newMood:          MoodValue;
  intimateEncounterCountDelta: number;
}

export interface PostIntimacyResult {
  playerUpdate:  PostIntimacyPlayerUpdate;
  partnerUpdate: PostIntimacyPartnerUpdate;
  narrative:     string[];
  events:        GameEvent[];
}

/**
 * Resolves all experience and relationship changes after a scene ends.
 * Delegates physiology/psychology updates to resolvePostEncounter() from patches.ts
 * so all patch systems (sensitivity update, wetness baseline, vagina type,
 * stamina, orgasm type acquisition, kink acquisition, sexual lean) are applied.
 */
export function resolvePostIntimacy(
  scene:      IntimacyScene,
  endResult:  SceneEndResult,
  player:     PlayerSnapshot,
  partner:    PartnerSnapshot,
): PostIntimacyResult {
  const { satisfaction, persistence } = endResult;
  const narrative: string[] = [];
  const events:    GameEvent[] = [];

  // ── Player gains ────────────────────────────────────────────────────────────
  const isRepeatPartner  = player.intimatePartnerHistory.includes(partner.npcId);
  const techniqueDelta   = Math.round(((0.5 + (satisfaction >= 70 ? 0.5 : 0)) * (isRepeatPartner ? 0.5 : 1.0)) * 10) / 10;
  const playerOrgasmed   = scene.cumStorage < scene.cumStorageMax * 0.3;
  const virilitydelta    = playerOrgasmed ? 0.3 : 0;
  const playerStayedAroused = scene.turnCount > 3 && scene.playerArousal >= 50;
  const sensitivityDelta = playerStayedAroused ? 0.2 : 0;
  const xpDelta          = 20 + (scene.orgasmCount * 10) + (satisfaction >= 80 ? 15 : 0);
  const ardorPointsDelta = (satisfaction >= 60 ? 1 : 0) + (satisfaction >= 80 ? 1 : 0);
  if (ardorPointsDelta > 0) narrative.push(`You earned ${ardorPointsDelta} Ardor Point${ardorPointsDelta > 1 ? 's' : ''}.`);

  // ── Partner trust / love ────────────────────────────────────────────────────
  const isForced     = scene.startType === 'FORCE_INTIMACY' || scene.startType === 'FORCE_INTIMACY_SLEEPING';
  const isPostDefeat = scene.startType === 'POST_DEFEAT';
  const satTrustBonus = satisfaction >= 80 ? 8 : satisfaction >= 60 ? 4 : satisfaction >= 40 ? 2 : 0;
  const satLoveBonus  = satisfaction >= 80 ? 10 : satisfaction >= 60 ? 5 : satisfaction >= 40 ? 2 : 0;
  const forceTrustP   = isForced ? -10 : 0;
  const forceLoveP    = isForced ? -15 : 0;
  const trustDelta    = persistence.partnerTrustDelta + satTrustBonus + forceTrustP;
  const loveDelta     = persistence.partnerLoveDelta  + satLoveBonus  + forceLoveP;
  if (trustDelta > 0) narrative.push(`${partner.npcId}: trust +${trustDelta}.`);
  if (trustDelta < 0) narrative.push(`${partner.npcId}: trust ${trustDelta}.`);
  if (loveDelta  > 0) narrative.push(`${partner.npcId}: love +${loveDelta}.`);
  if (loveDelta  < 0) narrative.push(`${partner.npcId}: love ${loveDelta}.`);

  // ── Corruption delta from CorruptionShameTrack (not hardcoded) ──────────────
  // Derive from corruptionRatePerEncounter × encounterIntensity proxy
  const encounterIntensity = Math.min(1.0, scene.turnCount / 15);
  const corruptionDelta = isForced
    ? partner.corruptionShame.corruptionRatePerEncounter * encounterIntensity * 3
    : isPostDefeat
      ? partner.corruptionShame.corruptionRatePerEncounter * encounterIntensity * 2
      : partner.corruptionShame.corruptionRatePerEncounter * encounterIntensity;

  // ── Call resolvePostEncounter from patches.ts ───────────────────────────────
  // This applies all 15 patches: sensitivity update, wetness baseline,
  // vagina type, stamina recovery, orgasm type acquisition, kink acquisition,
  // sexual lean update, bond type update, broken flag.
  const encounterTurnResult: EncounterTurnResult = {
    state:           { ...partner.dynamicState, mental: { ...partner.dynamicState.mental, corruptionCurrent: partner.dynamicState.mental.corruptionCurrent + corruptionDelta } },
    physiology:      partner.physiology,
    psychology:      partner.psychology,
    subspaceTracker:  scene.subspaceTracker,
    afterglowTracker: scene.afterglowTracker,
    pleasureTrack:   scene.pleasureTrack,
  };

  const { result: postResult, history: updatedHistory } = resolvePostEncounter(
    encounterTurnResult,
    partner.history,
    partner.history.totalEncounterCount,
  );

  if (persistence.afterglow) narrative.push('She lingers in a warm afterglow.');

  return {
    playerUpdate: {
      techniqueDelta,
      virilitydelta,
      sensitivityDelta,
      xpDelta,
      ardorPointsDelta,
      cumStorage:     persistence.playerCumStorage,
      arousalCurrent: persistence.playerArousal,
      newPartnerHistoryEntry: isRepeatPartner ? undefined : partner.npcId,
    },
    partnerUpdate: {
      npcId:               partner.npcId,
      trustDelta,
      loveDelta,
      updatedPhysiology:   postResult.physiology,
      updatedPsychology:   postResult.psychology,
      updatedDynamicState: postResult.state,
      updatedHistory,
      squirtStorage:       persistence.partnerSquirtStorage,
      squirtProbability:   persistence.partnerSquirtProbability,
      milkStorage:         persistence.partnerMilkStorage,
      arousalCurrent:      persistence.partnerArousal,
      newMood:             persistence.partnerMood,
      intimateEncounterCountDelta: 1,
    },
    narrative,
    events,
  };
}

// ============================================================
// AVAILABLE ACTIONS FILTER  (UI helper)
// ============================================================

export function getAvailableActions(scene: IntimacyScene, positionId: string): IntimacyAction[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ACTIONS, POSITIONS } = require('../data/intimacyCatalog') as {
    ACTIONS:   Record<string, IntimacyAction>;
    POSITIONS: Record<string, IntimacyPosition>;
  };
  const position = POSITIONS[positionId];
  if (!position) return [];
  return position.allowedActionIds
    .map((id: string) => ACTIONS[id])
    .filter((a: IntimacyAction | undefined): a is IntimacyAction => !!a)
    .filter((a: IntimacyAction) => !checkPenetrationConflict(scene, a));
}
