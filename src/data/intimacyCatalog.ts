/**
 * intimacyCatalog.ts
 * Static catalog of intimacy positions and actions.
 *
 * Tasks 6.1-6.3 + extensions
 *
 * Positions (26 total):
 *   Standard penetrative:  Missionary, Cowgirl, ReverseCowgirl, Doggy, Spooning,
 *                          StandingBehind, Lotus, Lap, StandingMissionary,
 *                          Ballerina, Flatiron, MatingPress, LyingFullNelson,
 *                          StandingFullNelson, FemaleLeadVaginal, FemaleLeadAnal
 *   Oral / manual:         FaceOral, KneelingOral, Fingering, HandOnBreasts
 *   Special:               LamiaCoil
 *   Paizuri:               Boobjob
 *   Non-penetrative seated: Lap (non-penetrative manual variant already in Fingering)
 *
 * Actions (52 total):
 *   Penetrative:   thrust_slow, thrust_fast, thrust_deep, anal_thrust,
 *                  gspot_rub, gspot_pound, cervix_thrust, womb_pound, deep_anal_pound
 *   Oral:          lick_vagina, suck_clit, lick_anal, blowjob_passive,
 *                  deep_throat, face_fuck, french_kiss
 *   Ear:           ear_lick, ear_bite
 *   Manual:        finger_vagina, finger_anal, rub_clit, stroke_breasts,
 *                  pinch_nipples, pull_nipples, squeeze_ass
 *   Affection:     kiss, neck_bite, whisper, caress_body
 *   Impact:        ass_spank, breast_spank, paddle_spank, slap
 *   Aggressive:    force_hold, hair_pull, choke_and_release (kept for compatibility)
 *   Choke sequence: grab_neck, choke, release_neck (replaces choke_and_release)
 *   Bondage:       rope_bondage_bind, rope_bondage_release, orgasm_denial
 *   Toy-vaginal:   vibrator_vaginal_insert, vibrator_vaginal_active, vibrator_vaginal_remove
 *   Toy-anal:      vibrator_anal_insert, vibrator_anal_active, vibrator_anal_remove,
 *                  anal_beads_insert, anal_beads_remove
 *   Toy-clit:      clit_vibrator_attach, clit_vibrator_active, clit_vibrator_remove
 *   Toy-nipple:    nipple_vibrator_attach, nipple_vibrator_active, nipple_vibrator_remove
 *   Toy-breast:    milker_attach, milker_active, milker_remove
 *   Paizuri:       boobjob
 *   Strip:         strip_partner, strip_self
 *
 * TEC scale:    0-4 novice | 5-9 experienced | 10-14 skilled | 15+ expert
 * Intensity:    1-5 warmup | 6-12 moderate | 13-20 high | 21+ specialist/peak
 */

import type { IntimacyPosition, IntimacyAction } from '../engines/intimacyEngine';

// ============================================================
// POSITIONS
// ============================================================

export const POSITIONS: Readonly<Record<string, IntimacyPosition>> = {

  // ── Standard penetrative ────────────────────────────────────────────────────

  missionary: {
    id: 'missionary', name: 'Missionary',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','thrust_deep','gspot_pound','kiss','french_kiss','stroke_breasts','pinch_nipples','pull_nipples','neck_bite','caress_body','whisper','grab_neck','choke','release_neck','force_hold','slap'],
    requiredClothingState: 'FULLY_UNDRESSED', minTrust: 0, transitionCost: 3,
    description: 'Classic face-to-face. Allows kissing and full eye contact.',
  },

  cowgirl: {
    id: 'cowgirl', name: 'Cowgirl',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','stroke_breasts','pinch_nipples','rub_clit','squeeze_ass','caress_body','slap'],
    requiredClothingState: 'FULLY_UNDRESSED', partnerLeads: true, minTrust: 20, transitionCost: 4,
    description: 'Partner on top, controls depth and pace.',
  },

  reverse_cowgirl: {
    id: 'reverse_cowgirl', name: 'Reverse Cowgirl',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','squeeze_ass','rub_clit','caress_body','hair_pull'],
    requiredClothingState: 'FULLY_UNDRESSED', partnerLeads: true, minTrust: 25, transitionCost: 4,
    description: 'Partner faces away. Rear view; less intimate than cowgirl.',
  },

  doggy: {
    id: 'doggy', name: 'Doggy Style',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','thrust_deep','gspot_pound','cervix_thrust','anal_thrust','squeeze_ass','hair_pull','force_hold','neck_bite','slap','ass_spank'],
    requiredClothingState: 'FULLY_UNDRESSED', minTrust: 10, transitionCost: 3,
    description: 'Rear-entry. Deep access; supports dominant actions.',
  },

  spooning: {
    id: 'spooning', name: 'Spooning',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','stroke_breasts','rub_clit','neck_bite','whisper','caress_body','french_kiss','ear_lick'],
    requiredClothingState: 'FULLY_UNDRESSED', minTrust: 30, minLove: 20, transitionCost: 3,
    description: 'Side-by-side. Intimate and slow.',
  },

  standing_behind: {
    id: 'standing_behind', name: 'Standing Behind',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','thrust_deep','stroke_breasts','rub_clit','force_hold','neck_bite','whisper','hair_pull','grab_neck','choke','release_neck'],
    requiredClothingState: 'BOTTOMLESS', minTrust: 5, transitionCost: 4,
    description: 'Player stands behind partner. Top clothing optional.',
  },

  lotus: {
    id: 'lotus', name: 'Lotus',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','kiss','french_kiss','stroke_breasts','caress_body','whisper','ear_lick'],
    requiredClothingState: 'FULLY_UNDRESSED', minTrust: 40, minLove: 35, transitionCost: 5,
    description: 'Seated face-to-face embrace. Highest intimacy gate.',
  },

  lap: {
    id: 'lap', name: 'On Your Lap',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','stroke_breasts','pinch_nipples','rub_clit','neck_bite','kiss','ear_bite'],
    requiredClothingState: 'BOTTOMLESS', minTrust: 15, transitionCost: 3,
    description: 'Partner sits in player lap. Mid-intimacy starter.',
  },

  standing_missionary: {
    id: 'standing_missionary', name: 'Standing Missionary',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','thrust_deep','kiss','french_kiss','neck_bite','caress_body','force_hold','grab_neck','choke','release_neck','slap'],
    requiredClothingState: 'BOTTOMLESS', minTrust: 5, transitionCost: 5,
    description: 'Partner against a wall, legs around player. Standing missionary variant.',
  },

  standing_one_leg_raised: {
    id: 'standing_one_leg_raised', name: 'Ballerina',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','thrust_deep','gspot_pound','rub_clit','neck_bite','caress_body'],
    requiredClothingState: 'BOTTOMLESS', minTrust: 10, transitionCost: 6,
    description: 'One leg raised. Deep penetration angle; high TEC demand.',
  },

  flatiron: {
    id: 'flatiron', name: 'Flatiron',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','thrust_deep','gspot_pound','cervix_thrust','womb_pound','squeeze_ass','hair_pull','neck_bite','ass_spank','paddle_spank'],
    requiredClothingState: 'FULLY_UNDRESSED', minTrust: 10, transitionCost: 4,
    description: 'Partner lies flat on stomach. Angled for G-spot and deep cervix access.',
  },

  mating_press: {
    id: 'mating_press', name: 'Mating Press',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','thrust_deep','gspot_pound','cervix_thrust','womb_pound','kiss','neck_bite','force_hold','grab_neck','choke','release_neck'],
    requiredClothingState: 'FULLY_UNDRESSED', minTrust: 15, transitionCost: 5,
    description: 'Legs folded back. Maximum depth; high cervix stimulation potential.',
  },

  lying_full_nelson: {
    id: 'lying_full_nelson', name: 'Lying Full Nelson',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','thrust_deep','gspot_rub','gspot_pound','force_hold','caress_body','rub_clit'],
    requiredClothingState: 'FULLY_UNDRESSED', minTrust: 20, transitionCost: 6,
    description: 'Arms hooked behind knees from behind. Full control; vulnerable for partner.',
  },

  standing_full_nelson: {
    id: 'standing_full_nelson', name: 'Standing Full Nelson',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','thrust_deep','force_hold','neck_bite','grab_neck','choke','release_neck'],
    requiredClothingState: 'FULLY_UNDRESSED', minTrust: 25, transitionCost: 8,
    description: 'Player lifts partner from behind with arms hooked. High dominant value.',
  },

  female_lead_vaginal: {
    id: 'female_lead_vaginal', name: 'Female-Led Penetration',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['thrust_slow','thrust_fast','rub_clit','caress_body','kiss','french_kiss'],
    requiredClothingState: 'FULLY_UNDRESSED', partnerLeads: true,
    minTrust: 30, minLove: 20, transitionCost: 4,
    description: 'Partner controls all penetration pace and depth. Player passive.',
  },

  female_lead_anal: {
    id: 'female_lead_anal', name: 'Female-Led Anal',
    penetrationTargetsUsed: ['ANAL'],
    allowedActionIds: ['anal_thrust','deep_anal_pound','caress_body'],
    requiredClothingState: 'FULLY_UNDRESSED', partnerLeads: true, minTrust: 35, transitionCost: 5,
    description: 'Partner leads anal penetration.',
  },

  // ── Oral ────────────────────────────────────────────────────────────────────

  face_oral: {
    id: 'face_oral', name: 'Face-to-Face Oral',
    penetrationTargetsUsed: ['ORAL'],
    allowedActionIds: ['lick_vagina','suck_clit','lick_anal','finger_vagina','rub_clit'],
    requiredClothingState: 'BOTTOMLESS', minTrust: 10, transitionCost: 3,
    description: 'Player performs oral while partner lies back.',
  },

  kneeling_oral: {
    id: 'kneeling_oral', name: 'Kneeling Oral',
    penetrationTargetsUsed: ['ORAL'],
    allowedActionIds: ['blowjob_passive','deep_throat','face_fuck','lick_vagina','suck_clit'],
    requiredClothingState: 'FULLY_CLOTHED', minTrust: 5, transitionCost: 2,
    description: 'Partner kneels. Can be clothed. Available early.',
  },

  // ── Manual ──────────────────────────────────────────────────────────────────

  fingering: {
    id: 'fingering', name: 'Fingering',
    penetrationTargetsUsed: [],
    allowedActionIds: ['finger_vagina','finger_anal','gspot_rub','rub_clit','stroke_breasts','pinch_nipples','pull_nipples','kiss','caress_body','ear_lick','ear_bite'],
    requiredClothingState: 'BOTTOMLESS', minTrust: 0, transitionCost: 2,
    description: 'Manual stimulation. No penetration slot locked.',
  },

  hand_on_breasts: {
    id: 'hand_on_breasts', name: 'Breast Play',
    penetrationTargetsUsed: [],
    allowedActionIds: ['stroke_breasts','pinch_nipples','pull_nipples','breast_spank','kiss','french_kiss','lick_vagina','rub_clit','caress_body','ear_lick'],
    requiredClothingState: 'TOPLESS', minTrust: 0, transitionCost: 2,
    description: 'Focus on breasts. Low trust gate; good opener.',
  },

  // ── Paizuri ─────────────────────────────────────────────────────────────────

  boobjob_position: {
    id: 'boobjob_position', name: 'Paizuri',
    penetrationTargetsUsed: [],
    allowedActionIds: ['boobjob','stroke_breasts','pinch_nipples','french_kiss','kiss'],
    requiredClothingState: 'TOPLESS', minTrust: 15, transitionCost: 3,
    description: 'Partner uses breasts to stimulate player. Cup size affects intensity.',
  },

  // ── Species-specific ────────────────────────────────────────────────────────

  piledriver: {
    id: 'piledriver', name: 'Piledriver',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: [
      'thrust_slow','thrust_fast','thrust_deep',
      'gspot_pound','cervix_thrust','womb_pound',
      'force_hold','grab_neck','choke','release_neck','rub_clit',
    ],
    requiredClothingState: 'FULLY_UNDRESSED', minTrust: 20, transitionCost: 6,
    description:
      'Partner lies on back with legs folded fully overhead, almost vertical. '
      + 'Maximum cervix/womb depth and full player control. '
      + 'High stamina cost; partner is almost immobile. '
      + 'Strongest position for cervix_thrust, womb_pound, and squirt buildup.',
  },

  lamia_coil: {
    id: 'lamia_coil', name: 'Lamia Coil',
    penetrationTargetsUsed: ['VAGINA'],
    allowedActionIds: ['lamia_constrict','thrust_slow','thrust_fast','kiss','caress_body','stroke_breasts'],
    requiredClothingState: 'FULLY_UNDRESSED', requiredPartnerFeature: 'SERPENT_TAIL',
    minTrust: 20, transitionCost: 4,
    description: 'Lamia-exclusive. Partner coils around player with her serpentine tail.',
  },
};

// ============================================================
// ACTIONS
// ============================================================

export const ACTIONS: Readonly<Record<string, IntimacyAction>> = {

  // ── Penetrative ─────────────────────────────────────────────────────────────

  thrust_slow: {
    id: 'thrust_slow', name: 'Slow Thrust',
    tecRequirement: 3, stimulationIntensity: 10, effectivenessOnFail: 0.6,
    penetrationTarget: 'VAGINA', bodyPartTargeted: 'vagina',
    staminalCostPlayer: 4, staminalCostPartner: 6, orgasmChance: 0.04,
    kinkTagsTriggered: ['PENETRATION'],
    statDeltas: { cumStorageDelta: 2, squirtStorageDelta: 2, squirtProbabilityDelta: 0.02 },
    description: 'Slow, deliberate rhythm. Steady arousal build.',
  },

  thrust_fast: {
    id: 'thrust_fast', name: 'Fast Thrust',
    tecRequirement: 6, stimulationIntensity: 16, effectivenessOnFail: 0.5,
    penetrationTarget: 'VAGINA', bodyPartTargeted: 'vagina',
    staminalCostPlayer: 9, staminalCostPartner: 11, orgasmChance: 0.10,
    kinkTagsTriggered: ['PENETRATION','ROUGH'],
    statDeltas: { cumStorageDelta: 4, squirtStorageDelta: 4, squirtProbabilityDelta: 0.04 },
    description: 'Rapid tempo. High pleasure and stamina cost.',
  },

  thrust_deep: {
    id: 'thrust_deep', name: 'Deep Thrust',
    tecRequirement: 10, stimulationIntensity: 20, effectivenessOnFail: 0.4,
    penetrationTarget: 'VAGINA', bodyPartTargeted: 'vagina',
    staminalCostPlayer: 10, staminalCostPartner: 14, painValue: 4, orgasmChance: 0.14,
    kinkTagsTriggered: ['PENETRATION','DEEP','ROUGH'],
    statDeltas: { cumStorageDelta: 5, squirtStorageDelta: 6, squirtProbabilityDelta: 0.06 },
    description: 'Forceful and deep. High pain risk if sensitivity is high.',
  },

  anal_thrust: {
    id: 'anal_thrust', name: 'Anal Thrust',
    tecRequirement: 12, stimulationIntensity: 14, effectivenessOnFail: 0.3,
    penetrationTarget: 'ANAL', bodyPartTargeted: 'anal',
    staminalCostPlayer: 8, staminalCostPartner: 12, painValue: 8, orgasmChance: 0.06,
    kinkTagsTriggered: ['ANAL','PENETRATION'],
    statDeltas: { cumStorageDelta: 3 },
    description: 'Requires high TEC to minimise pain.',
  },

  gspot_rub: {
    id: 'gspot_rub', name: 'G-Spot Rub',
    tecRequirement: 10, stimulationIntensity: 18, effectivenessOnFail: 0.35,
    bodyPartTargeted: 'gspot',
    staminalCostPlayer: 4, staminalCostPartner: 7, orgasmChance: 0.12,
    kinkTagsTriggered: ['MANUAL','GSPOT','INTERNAL'],
    statDeltas: { squirtStorageDelta: 6, squirtProbabilityDelta: 0.08 },
    description: 'Curled-finger G-spot stimulation. Directly builds squirt.',
  },

  gspot_pound: {
    id: 'gspot_pound', name: 'G-Spot Pounding',
    tecRequirement: 13, stimulationIntensity: 22, effectivenessOnFail: 0.3,
    penetrationTarget: 'VAGINA', bodyPartTargeted: 'gspot',
    staminalCostPlayer: 12, staminalCostPartner: 16, orgasmChance: 0.18,
    kinkTagsTriggered: ['PENETRATION','GSPOT','ROUGH','DEEP'],
    statDeltas: { squirtStorageDelta: 12, squirtProbabilityDelta: 0.15, cumStorageDelta: 4 },
    description: 'Hard G-spot pounding with penis. High squirt buildup.',
  },

  cervix_thrust: {
    id: 'cervix_thrust', name: 'Cervix Thrust',
    tecRequirement: 14, stimulationIntensity: 24, effectivenessOnFail: 0.25,
    penetrationTarget: 'VAGINA', bodyPartTargeted: 'cervix',
    staminalCostPlayer: 14, staminalCostPartner: 18, painValue: 10, orgasmChance: 0.20,
    kinkTagsTriggered: ['PENETRATION','DEEP','CERVIX','ROUGH'],
    statDeltas: { squirtStorageDelta: 8, squirtProbabilityDelta: 0.10, cumStorageDelta: 5, sensitivityDelta: 1 },
    description: 'Deep cervix-reaching thrusts. Extreme pleasure and pain risk.',
  },

  womb_pound: {
    id: 'womb_pound', name: 'Womb Pounding',
    tecRequirement: 16, stimulationIntensity: 28, effectivenessOnFail: 0.20,
    penetrationTarget: 'VAGINA', bodyPartTargeted: 'womb',
    staminalCostPlayer: 16, staminalCostPartner: 22, painValue: 16, orgasmChance: 0.24,
    kinkTagsTriggered: ['PENETRATION','DEEP','CERVIX','WOMB','ROUGH'],
    statDeltas: { squirtStorageDelta: 14, squirtProbabilityDelta: 0.18, cumStorageDelta: 7, sensitivityDelta: 2 },
    description: 'Maximum-depth penetration reaching the womb. Exceptional technique required. Highest pain risk.',
  },

  deep_anal_pound: {
    id: 'deep_anal_pound', name: 'Deep Anal Pounding',
    tecRequirement: 14, stimulationIntensity: 18, effectivenessOnFail: 0.25,
    penetrationTarget: 'ANAL', bodyPartTargeted: 'anal',
    staminalCostPlayer: 14, staminalCostPartner: 18, painValue: 14, orgasmChance: 0.08,
    kinkTagsTriggered: ['ANAL','PENETRATION','ROUGH','DEEP'],
    statDeltas: { cumStorageDelta: 4 },
    description: 'Full-depth anal pounding. Very high pain unless elasticity is high.',
  },

  // ── Oral ────────────────────────────────────────────────────────────────────

  lick_vagina: {
    id: 'lick_vagina', name: 'Lick',
    tecRequirement: 4, stimulationIntensity: 12, effectivenessOnFail: 0.5,
    bodyPartTargeted: 'vagina',
    staminalCostPlayer: 3, staminalCostPartner: 4, orgasmChance: 0.05,
    kinkTagsTriggered: ['ORAL_GIVE','VAGINAL'],
    statDeltas: { squirtStorageDelta: 3, squirtProbabilityDelta: 0.03, lubricationDelta: 1 },
    description: 'Tongue stimulation of the vagina.',
  },

  suck_clit: {
    id: 'suck_clit', name: 'Suck Clit',
    tecRequirement: 7, stimulationIntensity: 18, effectivenessOnFail: 0.4,
    bodyPartTargeted: 'clit',
    staminalCostPlayer: 4, staminalCostPartner: 6, orgasmChance: 0.14,
    kinkTagsTriggered: ['ORAL_GIVE','VAGINAL','CLIT_FOCUS'],
    statDeltas: { squirtProbabilityDelta: 0.08, squirtStorageDelta: 4 },
    description: 'Direct clitoral suction. Very high orgasm chance.',
  },

  lick_anal: {
    id: 'lick_anal', name: 'Rim',
    tecRequirement: 8, stimulationIntensity: 10, effectivenessOnFail: 0.4,
    bodyPartTargeted: 'anal',
    staminalCostPlayer: 3, staminalCostPartner: 5, orgasmChance: 0.03,
    kinkTagsTriggered: ['ORAL_GIVE','ANAL','TABOO'],
    description: 'Rimming. Moderate pleasure; taboo kink.',
  },

  blowjob_passive: {
    id: 'blowjob_passive', name: 'Receive Oral',
    tecRequirement: 0, stimulationIntensity: 8, effectivenessOnFail: 1.0,
    penetrationTarget: 'ORAL', bodyPartTargeted: 'oral',
    staminalCostPlayer: 0, staminalCostPartner: 7,
    kinkTagsTriggered: ['ORAL_RECEIVE'],
    statDeltas: { cumStorageDelta: 5 },
    description: 'Partner performs oral. No player TEC needed.',
  },

  deep_throat: {
    id: 'deep_throat', name: 'Deep Throat',
    tecRequirement: 0, stimulationIntensity: 14, effectivenessOnFail: 1.0,
    penetrationTarget: 'ORAL', bodyPartTargeted: 'throat',
    staminalCostPlayer: 2, staminalCostPartner: 10,
    kinkTagsTriggered: ['ORAL_RECEIVE','DEEP_THROAT','DOMINANT'],
    statDeltas: { cumStorageDelta: 6 },
    description: 'Partner takes player fully into throat.',
  },

  face_fuck: {
    id: 'face_fuck', name: 'Face Fuck',
    tecRequirement: 5, stimulationIntensity: 18, effectivenessOnFail: 0.5,
    penetrationTarget: 'ORAL', bodyPartTargeted: 'throat',
    staminalCostPlayer: 8, staminalCostPartner: 14, painValue: 4,
    kinkTagsTriggered: ['ORAL_RECEIVE','DEEP_THROAT','DOMINANT','ROUGH','RESTRAIN'],
    statDeltas: { cumStorageDelta: 8 },
    description: 'Player controls head movement for rapid oral.',
  },

  french_kiss: {
    id: 'french_kiss', name: 'French Kiss',
    tecRequirement: 2, stimulationIntensity: 6, effectivenessOnFail: 0.7,
    bodyPartTargeted: 'lips',
    staminalCostPlayer: 1, staminalCostPartner: 2,
    kinkTagsTriggered: ['AFFECTION','INTIMACY','KISS'],
    statDeltas: { arousalDelta: 3 },
    description: 'Deep passionate kiss. Accumulates love delta post-scene.',
  },

  boobjob: {
    id: 'boobjob', name: 'Paizuri',
    tecRequirement: 3, stimulationIntensity: 10, effectivenessOnFail: 0.6,
    bodyPartTargeted: 'breast',
    staminalCostPlayer: 3, staminalCostPartner: 5,
    kinkTagsTriggered: ['BREAST_PLAY','ORAL_RECEIVE','PAIZURI'],
    statDeltas: { cumStorageDelta: 6, milkProductionDelta: 0.5 },
    description: 'Partner uses breasts to stimulate player. Effectiveness scales with cup size in the engine.',
  },

  // ── Ear ─────────────────────────────────────────────────────────────────────

  ear_lick: {
    id: 'ear_lick', name: 'Ear Lick',
    tecRequirement: 1, stimulationIntensity: 5, effectivenessOnFail: 0.8,
    bodyPartTargeted: 'ear',
    staminalCostPlayer: 0, staminalCostPartner: 1,
    kinkTagsTriggered: ['AFFECTION','VOICE','SENSITIVE_SPOT'],
    description: 'Slowly licking the ear. Highly effective on VOICE kink partners.',
  },

  ear_bite: {
    id: 'ear_bite', name: 'Ear Bite',
    tecRequirement: 5, stimulationIntensity: 8, effectivenessOnFail: 0.5,
    bodyPartTargeted: 'ear',
    staminalCostPlayer: 1, staminalCostPartner: 3, painValue: 2,
    kinkTagsTriggered: ['BITE','PAIN_LIGHT','SENSITIVE_SPOT'],
    description: 'Nibbling and biting the ear. Light pain; bite kink.',
  },

  // ── Manual ──────────────────────────────────────────────────────────────────

  finger_vagina: {
    id: 'finger_vagina', name: 'Finger',
    tecRequirement: 5, stimulationIntensity: 11, effectivenessOnFail: 0.5,
    bodyPartTargeted: 'vagina',
    staminalCostPlayer: 2, staminalCostPartner: 4, orgasmChance: 0.06,
    kinkTagsTriggered: ['MANUAL','VAGINAL'],
    statDeltas: { squirtStorageDelta: 3, squirtProbabilityDelta: 0.03, lubricationDelta: 0.5 },
    description: 'Manual vaginal stimulation.',
  },

  finger_anal: {
    id: 'finger_anal', name: 'Anal Finger',
    tecRequirement: 9, stimulationIntensity: 9, effectivenessOnFail: 0.4,
    bodyPartTargeted: 'anal',
    staminalCostPlayer: 2, staminalCostPartner: 5, painValue: 5, orgasmChance: 0.03,
    kinkTagsTriggered: ['MANUAL','ANAL','TABOO'],
    description: 'Requires care. Medium pain.',
  },

  rub_clit: {
    id: 'rub_clit', name: 'Rub Clit',
    tecRequirement: 4, stimulationIntensity: 13, effectivenessOnFail: 0.5,
    bodyPartTargeted: 'clit',
    staminalCostPlayer: 2, staminalCostPartner: 4, orgasmChance: 0.08,
    kinkTagsTriggered: ['MANUAL','CLIT_FOCUS'],
    statDeltas: { squirtProbabilityDelta: 0.05 },
    description: 'Direct clitoral rubbing.',
  },

  stroke_breasts: {
    id: 'stroke_breasts', name: 'Stroke Breasts',
    tecRequirement: 2, stimulationIntensity: 6, effectivenessOnFail: 0.7,
    bodyPartTargeted: 'breast',
    staminalCostPlayer: 1, staminalCostPartner: 2, orgasmChance: 0.01,
    kinkTagsTriggered: ['BREAST_PLAY'],
    statDeltas: { milkProductionDelta: 0.2 },
    description: 'Gentle breast stroking. Good opener.',
  },

  pinch_nipples: {
    id: 'pinch_nipples', name: 'Pinch Nipples',
    tecRequirement: 5, stimulationIntensity: 9, effectivenessOnFail: 0.5,
    bodyPartTargeted: 'nipple',
    staminalCostPlayer: 1, staminalCostPartner: 3, painValue: 3, orgasmChance: 0.02,
    kinkTagsTriggered: ['BREAST_PLAY','PAIN_LIGHT','NIPPLE'],
    statDeltas: { milkProductionDelta: 0.5 },
    description: 'Nipple pinching.',
  },

  pull_nipples: {
    id: 'pull_nipples', name: 'Pull Nipples',
    tecRequirement: 6, stimulationIntensity: 10, effectivenessOnFail: 0.45,
    bodyPartTargeted: 'nipple',
    staminalCostPlayer: 1, staminalCostPartner: 4, painValue: 5, orgasmChance: 0.02,
    kinkTagsTriggered: ['BREAST_PLAY','PAIN_LIGHT','NIPPLE'],
    statDeltas: { milkProductionDelta: 1 },
    description: 'Pulling and stretching nipples. Contributes to milk production.',
  },

  squeeze_ass: {
    id: 'squeeze_ass', name: 'Squeeze Ass',
    tecRequirement: 2, stimulationIntensity: 5, effectivenessOnFail: 0.8,
    bodyPartTargeted: 'ass',
    staminalCostPlayer: 1, staminalCostPartner: 2,
    kinkTagsTriggered: ['BUTT_PLAY'],
    description: 'Grabbing and squeezing buttocks.',
  },

  // ── Affection ────────────────────────────────────────────────────────────────

  kiss: {
    id: 'kiss', name: 'Kiss',
    tecRequirement: 0, stimulationIntensity: 4, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'lips',
    staminalCostPlayer: 0, staminalCostPartner: 1,
    kinkTagsTriggered: ['AFFECTION'],
    description: 'A kiss. Builds atmosphere.',
  },

  neck_bite: {
    id: 'neck_bite', name: 'Neck Bite',
    tecRequirement: 4, stimulationIntensity: 8, effectivenessOnFail: 0.5,
    bodyPartTargeted: 'neck',
    staminalCostPlayer: 1, staminalCostPartner: 3, painValue: 2,
    kinkTagsTriggered: ['BITE','DOMINANT','PAIN_LIGHT'],
    description: 'Biting the neck.',
  },

  whisper: {
    id: 'whisper', name: 'Whisper',
    tecRequirement: 0, stimulationIntensity: 3, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'ear',
    staminalCostPlayer: 0, staminalCostPartner: 0,
    kinkTagsTriggered: ['AFFECTION','VOICE'],
    description: 'Whispering. Sets atmosphere and voice kink.',
  },

  caress_body: {
    id: 'caress_body', name: 'Caress',
    tecRequirement: 0, stimulationIntensity: 3, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'body',
    staminalCostPlayer: 0, staminalCostPartner: 1,
    kinkTagsTriggered: ['AFFECTION','TOUCH'],
    description: 'Full-body caressing. Builds love delta.',
  },

  // ── Impact ──────────────────────────────────────────────────────────────────

  ass_spank: {
    id: 'ass_spank', name: 'Ass Spank',
    tecRequirement: 3, stimulationIntensity: 7, effectivenessOnFail: 0.6,
    bodyPartTargeted: 'ass',
    staminalCostPlayer: 2, staminalCostPartner: 3, painValue: 5, orgasmChance: 0.01,
    kinkTagsTriggered: ['IMPACT','DOMINANT','PAIN_LIGHT','BUTT_PLAY'],
    description: 'Open-handed spank.',
  },

  breast_spank: {
    id: 'breast_spank', name: 'Breast Spank',
    tecRequirement: 5, stimulationIntensity: 8, effectivenessOnFail: 0.5,
    bodyPartTargeted: 'breast',
    staminalCostPlayer: 2, staminalCostPartner: 4, painValue: 6, orgasmChance: 0.01,
    kinkTagsTriggered: ['IMPACT','DOMINANT','PAIN_LIGHT','BREAST_PLAY'],
    statDeltas: { milkProductionDelta: 0.3 },
    description: 'Breast slapping. Effective on masochistic partners.',
  },

  paddle_spank: {
    id: 'paddle_spank', name: 'Paddle Spank',
    tecRequirement: 7, stimulationIntensity: 12, effectivenessOnFail: 0.4,
    bodyPartTargeted: 'ass',
    staminalCostPlayer: 3, staminalCostPartner: 6, painValue: 12, orgasmChance: 0.03,
    kinkTagsTriggered: ['IMPACT','DOMINANT','PAIN_HEAVY','BDSM','BUTT_PLAY'],
    requiredItems: [{ itemId: 'paddle', consumedOnUse: false }],
    statDeltas: { sensitivityDelta: 0.5 },
    description: 'Paddle strike. Requires paddle. Raises sensitivity.',
  },

  slap: {
    id: 'slap', name: 'Slap',
    tecRequirement: 6, stimulationIntensity: 9, effectivenessOnFail: 0.4,
    bodyPartTargeted: 'cheek',
    staminalCostPlayer: 2, staminalCostPartner: 3, painValue: 7, orgasmChance: 0.02,
    kinkTagsTriggered: ['IMPACT','DOMINANT','ROUGH','PAIN_LIGHT'],
    description: 'Open-palm face slap. Higher pain than ass spank.',
  },

  // ── Aggressive ──────────────────────────────────────────────────────────────

  force_hold: {
    id: 'force_hold', name: 'Force Hold',
    tecRequirement: 8, stimulationIntensity: 7, effectivenessOnFail: 0.3,
    bodyPartTargeted: 'wrists',
    staminalCostPlayer: 5, staminalCostPartner: 3, painValue: 2,
    kinkTagsTriggered: ['DOMINANT','RESTRAIN','PAIN_LIGHT'],
    statDeltas: { sensitivityDelta: 0.3 },
    description: 'Pinning wrists. Triggers restrain kink.',
  },

  hair_pull: {
    id: 'hair_pull', name: 'Hair Pull',
    tecRequirement: 6, stimulationIntensity: 9, effectivenessOnFail: 0.4,
    bodyPartTargeted: 'hair',
    staminalCostPlayer: 2, staminalCostPartner: 4, painValue: 3,
    kinkTagsTriggered: ['DOMINANT','ROUGH','PAIN_LIGHT'],
    description: 'Grabbing and pulling hair.',
  },

  // DEPRECATED: choke_and_release is superseded by the grab_neck -> choke -> release_neck
  // sequence. Kept here so any existing saved-game references do not throw at runtime.
  // New code should use grab_neck, choke, release_neck instead.
  choke_and_release: {
    id: 'choke_and_release', name: 'Choke and Release (legacy)',
    tecRequirement: 12, stimulationIntensity: 16, effectivenessOnFail: 0.2,
    bodyPartTargeted: 'throat',
    staminalCostPlayer: 3, staminalCostPartner: 6, painValue: 8, orgasmChance: 0.08,
    kinkTagsTriggered: ['CHOKE','DOMINANT','BDSM','PAIN_HEAVY','BREATH_PLAY'],
    statDeltas: { sensitivityDelta: 1 },
    description: 'DEPRECATED. Use grab_neck -> choke -> release_neck instead.',
  },

  // ── Bondage ─────────────────────────────────────────────────────────────────

  rope_bondage_bind: {
    id: 'rope_bondage_bind', name: 'Bind with Rope',
    tecRequirement: 9, stimulationIntensity: 5, effectivenessOnFail: 0.3,
    bodyPartTargeted: 'wrists',
    staminalCostPlayer: 3, staminalCostPartner: 2,
    kinkTagsTriggered: ['RESTRAIN','BDSM','DOMINANT','ROPE'],
    requiredItems: [{ itemId: 'rope', consumedOnUse: false }],
    statDeltas: { sensitivityDelta: 0.8 },
    description: 'Binds partner with rope. Raises sensitivity once bound.',
  },

  rope_bondage_release: {
    id: 'rope_bondage_release', name: 'Release from Rope',
    tecRequirement: 0, stimulationIntensity: 2, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'wrists',
    staminalCostPlayer: 1, staminalCostPartner: 1,
    kinkTagsTriggered: ['RESTRAIN','ROPE'],
    requiredItems: [{ itemId: 'rope', consumedOnUse: false }],
    description: 'Removes rope. Small stimulation spike.',
  },

  orgasm_denial: {
    id: 'orgasm_denial', name: 'Orgasm Denial',
    tecRequirement: 10, stimulationIntensity: 0, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'body',
    staminalCostPlayer: 4, staminalCostPartner: 2,
    kinkTagsTriggered: ['DOMINANT','EDGING','BDSM'],
    statDeltas: { squirtProbabilityDelta: 0.20 },
    description: 'Hold her back at 85+ arousal. Next orgasm is BODY_SHAKING. Large squirt buildup.',
  },

  // ── Toy — vaginal ────────────────────────────────────────────────────────────

  vibrator_vaginal_insert: {
    id: 'vibrator_vaginal_insert', name: 'Insert Vaginal Vibrator',
    tecRequirement: 4, stimulationIntensity: 0, effectivenessOnFail: 1.0,
    penetrationTarget: 'VAGINA', bodyPartTargeted: 'vagina',
    staminalCostPlayer: 1, staminalCostPartner: 2,
    kinkTagsTriggered: ['TOY','VAGINAL','BDSM'],
    requiredItems: [{ itemId: 'vaginal_vibrator', consumedOnUse: false }],
    description: 'Inserts vibrator. Occupies VAGINA slot.',
  },

  vibrator_vaginal_active: {
    id: 'vibrator_vaginal_active', name: 'Vaginal Vibrator (Active)',
    tecRequirement: 0, stimulationIntensity: 14, effectivenessOnFail: 1.0,
    penetrationTarget: 'VAGINA', bodyPartTargeted: 'vagina',
    staminalCostPlayer: 0, staminalCostPartner: 6, orgasmChance: 0.10,
    kinkTagsTriggered: ['TOY','VAGINAL'],
    requiredItems: [{ itemId: 'vaginal_vibrator', consumedOnUse: false }],
    statDeltas: { squirtStorageDelta: 4, squirtProbabilityDelta: 0.06 },
    description: 'Per-turn stimulation. Builds squirt storage.',
  },

  vibrator_vaginal_remove: {
    id: 'vibrator_vaginal_remove', name: 'Remove Vaginal Vibrator',
    tecRequirement: 0, stimulationIntensity: 4, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'vagina',
    staminalCostPlayer: 0, staminalCostPartner: 2,
    kinkTagsTriggered: ['TOY','VAGINAL'],
    requiredItems: [{ itemId: 'vaginal_vibrator', consumedOnUse: false }],
    description: 'Removes vaginal vibrator. Frees VAGINA slot.',
  },

  // ── Toy — anal ───────────────────────────────────────────────────────────────

  vibrator_anal_insert: {
    id: 'vibrator_anal_insert', name: 'Insert Anal Vibrator',
    tecRequirement: 8, stimulationIntensity: 0, effectivenessOnFail: 1.0,
    penetrationTarget: 'ANAL', bodyPartTargeted: 'anal',
    staminalCostPlayer: 2, staminalCostPartner: 4, painValue: 5,
    kinkTagsTriggered: ['TOY','ANAL','BDSM'],
    requiredItems: [{ itemId: 'anal_vibrator', consumedOnUse: false }],
    description: 'Inserts anal vibrator. Occupies ANAL slot.',
  },

  vibrator_anal_active: {
    id: 'vibrator_anal_active', name: 'Anal Vibrator (Active)',
    tecRequirement: 0, stimulationIntensity: 10, effectivenessOnFail: 1.0,
    penetrationTarget: 'ANAL', bodyPartTargeted: 'anal',
    staminalCostPlayer: 0, staminalCostPartner: 5, orgasmChance: 0.04,
    kinkTagsTriggered: ['TOY','ANAL'],
    requiredItems: [{ itemId: 'anal_vibrator', consumedOnUse: false }],
    description: 'Per-turn anal stimulation.',
  },

  vibrator_anal_remove: {
    id: 'vibrator_anal_remove', name: 'Remove Anal Vibrator',
    tecRequirement: 0, stimulationIntensity: 3, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'anal',
    staminalCostPlayer: 0, staminalCostPartner: 2,
    kinkTagsTriggered: ['TOY','ANAL'],
    requiredItems: [{ itemId: 'anal_vibrator', consumedOnUse: false }],
    description: 'Removes anal vibrator.',
  },

  anal_beads_insert: {
    id: 'anal_beads_insert', name: 'Anal Bead Insertion',
    tecRequirement: 7, stimulationIntensity: 6, effectivenessOnFail: 0.4,
    penetrationTarget: 'ANAL', bodyPartTargeted: 'anal',
    staminalCostPlayer: 3, staminalCostPartner: 6, painValue: 4,
    kinkTagsTriggered: ['ANAL','TOY','BDSM'],
    requiredItems: [{ itemId: 'anal_beads', consumedOnUse: false }],
    description: 'Inserts anal beads. Occupies ANAL slot.',
  },

  anal_beads_remove: {
    id: 'anal_beads_remove', name: 'Anal Bead Removal',
    tecRequirement: 5, stimulationIntensity: 18, effectivenessOnFail: 0.3,
    bodyPartTargeted: 'anal',
    staminalCostPlayer: 2, staminalCostPartner: 5, orgasmChance: 0.14,
    kinkTagsTriggered: ['ANAL','TOY','BDSM'],
    requiredItems: [{ itemId: 'anal_beads', consumedOnUse: false }],
    statDeltas: { squirtProbabilityDelta: 0.10, squirtStorageDelta: 6 },
    description: 'Pulling anal beads out during build-up. Massive stimulation spike.',
  },

  // ── Toy — clit ───────────────────────────────────────────────────────────────

  clit_vibrator_attach: {
    id: 'clit_vibrator_attach', name: 'Attach Clit Vibrator',
    tecRequirement: 3, stimulationIntensity: 0, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'clit',
    staminalCostPlayer: 0, staminalCostPartner: 1,
    kinkTagsTriggered: ['TOY','CLIT_FOCUS'],
    requiredItems: [{ itemId: 'clit_vibrator', consumedOnUse: false }],
    description: 'Attaches clit vibrator.',
  },

  clit_vibrator_active: {
    id: 'clit_vibrator_active', name: 'Clit Vibrator (Active)',
    tecRequirement: 0, stimulationIntensity: 16, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'clit',
    staminalCostPlayer: 0, staminalCostPartner: 5, orgasmChance: 0.14,
    kinkTagsTriggered: ['TOY','CLIT_FOCUS'],
    requiredItems: [{ itemId: 'clit_vibrator', consumedOnUse: false }],
    statDeltas: { squirtProbabilityDelta: 0.08 },
    description: 'Per-turn clit stimulation. High orgasm chance.',
  },

  clit_vibrator_remove: {
    id: 'clit_vibrator_remove', name: 'Remove Clit Vibrator',
    tecRequirement: 0, stimulationIntensity: 5, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'clit',
    staminalCostPlayer: 0, staminalCostPartner: 1,
    kinkTagsTriggered: ['TOY','CLIT_FOCUS'],
    requiredItems: [{ itemId: 'clit_vibrator', consumedOnUse: false }],
    description: 'Removes clit vibrator.',
  },

  // ── Toy — nipple ─────────────────────────────────────────────────────────────

  nipple_vibrator_attach: {
    id: 'nipple_vibrator_attach', name: 'Attach Nipple Vibrators',
    tecRequirement: 2, stimulationIntensity: 0, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'nipple',
    staminalCostPlayer: 0, staminalCostPartner: 0,
    kinkTagsTriggered: ['NIPPLE','TOY','BDSM'],
    requiredItems: [{ itemId: 'nipple_vibrator', consumedOnUse: false }],
    statDeltas: { milkProductionDelta: 0.5 },
    description: 'Clips vibrating units onto nipples.',
  },

  nipple_vibrator_active: {
    id: 'nipple_vibrator_active', name: 'Nipple Vibrators (Active)',
    tecRequirement: 0, stimulationIntensity: 8, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'nipple',
    staminalCostPlayer: 0, staminalCostPartner: 3, orgasmChance: 0.02,
    kinkTagsTriggered: ['NIPPLE','TOY','BDSM'],
    requiredItems: [{ itemId: 'nipple_vibrator', consumedOnUse: false }],
    statDeltas: { milkProductionDelta: 1 },
    description: 'Per-turn nipple stimulation.',
  },

  nipple_vibrator_remove: {
    id: 'nipple_vibrator_remove', name: 'Remove Nipple Vibrators',
    tecRequirement: 0, stimulationIntensity: 3, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'nipple',
    staminalCostPlayer: 0, staminalCostPartner: 1,
    kinkTagsTriggered: ['NIPPLE','TOY'],
    requiredItems: [{ itemId: 'nipple_vibrator', consumedOnUse: false }],
    description: 'Removes nipple vibrators.',
  },

  // ── Toy — milker ─────────────────────────────────────────────────────────────

  milker_attach: {
    id: 'milker_attach', name: 'Attach Milker',
    tecRequirement: 4, stimulationIntensity: 3, effectivenessOnFail: 0.6,
    bodyPartTargeted: 'breast',
    staminalCostPlayer: 1, staminalCostPartner: 3,
    kinkTagsTriggered: ['BREAST_PLAY','TOY','LACTATION','BDSM'],
    requiredItems: [{ itemId: 'milker', consumedOnUse: false }],
    statDeltas: { milkProductionDelta: 3 },
    description: 'Attaches mechanical milking device. Begins stimulating milk production.',
  },

  milker_active: {
    id: 'milker_active', name: 'Milker (Active)',
    tecRequirement: 0, stimulationIntensity: 7, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'breast',
    staminalCostPlayer: 0, staminalCostPartner: 4, orgasmChance: 0.01,
    kinkTagsTriggered: ['BREAST_PLAY','TOY','LACTATION'],
    requiredItems: [{ itemId: 'milker', consumedOnUse: false }],
    statDeltas: { milkProductionDelta: 5 },
    description: 'Per-turn milking. Steadily increases milk storage.',
  },

  milker_remove: {
    id: 'milker_remove', name: 'Remove Milker',
    tecRequirement: 0, stimulationIntensity: 2, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'breast',
    staminalCostPlayer: 0, staminalCostPartner: 2,
    kinkTagsTriggered: ['BREAST_PLAY','LACTATION'],
    requiredItems: [{ itemId: 'milker', consumedOnUse: false }],
    description: 'Removes milker. Milk delta written to NPC post-scene.',
  },

  // ── Strip ────────────────────────────────────────────────────────────────────

  strip_partner: {
    id: 'strip_partner', name: 'Strip Partner',
    tecRequirement: 0, stimulationIntensity: 4, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'clothing',
    staminalCostPlayer: 1, staminalCostPartner: 2,
    clothingChange: 'STRIP_PARTNER_LAYER',
    kinkTagsTriggered: ['UNDRESSING'],
    description: 'Remove one layer from partner (CLOTHED -> TOPLESS -> BOTTOMLESS -> UNDRESSED). Force scenes may TORN clothing.',
  },

  strip_self: {
    id: 'strip_self', name: 'Undress Self',
    tecRequirement: 0, stimulationIntensity: 3, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'clothing',
    staminalCostPlayer: 1, staminalCostPartner: 1,
    clothingChange: 'STRIP_SELF_LAYER',
    kinkTagsTriggered: ['UNDRESSING','EXHIBITIONISM'],
    description: 'Remove one clothing layer from player.',
  },

  // ── Choking sequence (grab_neck -> choke -> release_neck) ──────────────────
  // Previously a single choke_and_release action; now three separate steps
  // tracked via scene.neckGrabActive flag.

  grab_neck: {
    id: 'grab_neck', name: 'Grab Neck',
    tecRequirement: 6, stimulationIntensity: 5, effectivenessOnFail: 0.6,
    bodyPartTargeted: 'throat',
    staminalCostPlayer: 2, staminalCostPartner: 2, painValue: 2,
    kinkTagsTriggered: ['DOMINANT', 'CHOKE', 'RESTRAIN'],
    setsNeckGrab: true,
    description:
      'Close your hand around her throat — no airflow restriction yet. '
      + 'Sets neckGrabActive, unlocking the choke action next turn. '
      + 'Small dominant arousal tick; light pain.',
  },

  choke: {
    id: 'choke', name: 'Choke',
    tecRequirement: 13, stimulationIntensity: 18, effectivenessOnFail: 0.15,
    bodyPartTargeted: 'throat',
    staminalCostPlayer: 4, staminalCostPartner: 7, painValue: 10, orgasmChance: 0.08,
    kinkTagsTriggered: ['DOMINANT', 'CHOKE', 'BREATH_PLAY', 'BDSM', 'PAIN_HEAVY'],
    requiresNeckGrab: true,   // blocked until grab_neck has been used
    statDeltas: { sensitivityDelta: 1.2 },
    description:
      'Restrict airflow — high TEC required; failure is dangerous. '
      + 'High stimulation and significant sensitivity spike from oxygen restriction. '
      + 'Requires grab_neck to be active. '
      + 'Use release_neck on the same or next turn to complete the arc.',
  },

  release_neck: {
    id: 'release_neck', name: 'Release Neck',
    tecRequirement: 0, stimulationIntensity: 12, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'throat',
    staminalCostPlayer: 0, staminalCostPartner: 3, orgasmChance: 0.12,
    kinkTagsTriggered: ['DOMINANT', 'CHOKE', 'BREATH_PLAY'],
    clearsNeckGrab: true,   // clears neckGrabActive
    statDeltas: { squirtProbabilityDelta: 0.08, sensitivityDelta: 0.5 },
    description:
      'Release the grip — oxygen returns in a rush. '
      + 'High stimulation spike and good orgasm chance from oxygen return. '
      + 'Clears neckGrabActive. Squirt probability bumped from the combined arousal peak.',
  },

  // ── Species-specific ─────────────────────────────────────────────────────────

  lamia_constrict: {
    id: 'lamia_constrict', name: 'Constrict',
    tecRequirement: 0, stimulationIntensity: 15, effectivenessOnFail: 1.0,
    bodyPartTargeted: 'body',
    staminalCostPlayer: 0, staminalCostPartner: 8, orgasmChance: 0.07,
    kinkTagsTriggered: ['RESTRAIN','DOMINANT','SPECIES_TRAIT'],
    requiredPositionIds: ['lamia_coil'],
    statDeltas: { sensitivityDelta: 0.5 },
    description: 'Lamia-exclusive. Partner tightens coils. High pleasure; partner leads.',
  },
};
