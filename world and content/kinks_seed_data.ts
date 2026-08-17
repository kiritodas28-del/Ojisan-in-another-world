// ============================================================================
// OJISAN IN ANOTHER WORLD — KINK CATALOG SEED DATA (v2)
// Companion file to schemas.ts's KinkDef/KinkAttachmentCondition/
// KinkTriggerEffect types. See requirements.md §26 for the full mechanic.
//
// Two corrections from the first pass, per explicit feedback:
// 1. Kinks are now explicitly erotic/sexual acts and states, not general
//    personality/relationship traits (praise, gift-giving, teasing dialogue).
// 2. Every attachmentCondition.requiredContext is something that can ONLY
//    happen inside an active IntimateEncounterRuntimeState — a specific
//    position, physical act, Sex Skill use, or Arousal state reached. There
//    is no Trust/Love threshold, no Gift action, no dialogue-outside-a-scene
//    condition anywhere in this file.
//
// There is deliberately NO per-companion assignment table in this file (no
// COMPANION_KINK_ASSIGNMENTS, nothing on CompanionDef). Which kinks end up
// attached to which character is entirely emergent — decided purely by that
// specific character's own kinkProgress/satisfiedKinkIds, populated only by
// what actually happens in play with her. Any of these 20 kinks can attach
// to any companion or any world NPC; nothing here pre-decides which is
// "hers." The Kink Connoisseur achievement is worded around this directly
// (see requirements.md §26.4) — it no longer checks for a specific
// pre-assigned kink per companion, since there isn't one.
// ============================================================================

import { KinkDef, KinkCategory, SexualStatusEffectId } from "./schemas";

export const KINKS: KinkDef[] = [
  {
    id: "kink_deep_throat_devotion",
    name: "Deep Throat Devotion",
    category: KinkCategory.Physical,
    description: "A specific, growing craving for being taken fully — repeated Seated Deepthroat or Lying Throatfuck encounters are what cement it.",
    attachmentCondition: { requiredContext: "POSITION_DEEPTHROAT_OR_THROATFUCK", requiredCount: 15 },
    triggerEffect: { arousalBonusFlat: 10, appliesStatusEffect: SexualStatusEffectId.Shivering, statusEffectDurationTurns: 2 },
  },
  {
    id: "kink_cervix_devotion",
    name: "Cervix Devotion",
    category: KinkCategory.Physical,
    description: "Craves the specific deep-penetration sensation of cervix contact — the Cervix Harmonizer skill used repeatedly is what triggers it.",
    attachmentCondition: { requiredContext: "SKILL_CERVIX_HARMONIZER", requiredCount: 12 },
    triggerEffect: { arousalBonusFlat: 10 },
  },
  {
    id: "kink_edging_denial",
    name: "Edging & Denial",
    category: KinkCategory.Physical,
    description: "Responds intensely to being held right at the edge of climax and denied it — repeatedly reaching Edging Ecstasy without release is what cements this one.",
    attachmentCondition: { requiredContext: "AROUSAL_REACHED_EDGING_WITHOUT_CLIMAX", requiredCount: 15 },
    triggerEffect: { arousalBonusFlat: 12 },
  },
  {
    id: "kink_mating_press_devotion",
    name: "Mating Press Devotion",
    category: KinkCategory.Positional,
    description: "A specific physical preference for being pinned and taken deep in Mating Press — repeated exposure cements it, not a single encounter.",
    attachmentCondition: { requiredContext: "POSITION_MATING_PRESS", requiredCount: 15 },
    triggerEffect: { arousalBonusFlat: 8 },
  },
  {
    id: "kink_rough_rhythm_craving",
    name: "Rough Rhythm Craving",
    category: KinkCategory.Physical,
    description: "Craves sudden, unpredictable changes in pace and pressure specifically — Grip and Release used repeatedly is what develops this.",
    attachmentCondition: { requiredContext: "SKILL_GRIP_AND_RELEASE", requiredCount: 12 },
    triggerEffect: { arousalBonusFlat: 10, appliesStatusEffect: SexualStatusEffectId.Shivering, statusEffectDurationTurns: 2 },
  },
  {
    id: "kink_breast_worship_addiction",
    name: "Breast Worship Addiction",
    category: KinkCategory.Physical,
    description: "Sustained chest and nipple worship, repeated act after act, becomes something she actively craves rather than simply enjoys.",
    attachmentCondition: { requiredContext: "ACT_BREAST_NIPPLE_CATEGORY", requiredCount: 20 },
    triggerEffect: { arousalBonusFlat: 8 },
  },
  {
    id: "kink_anal_devotion",
    name: "Anal Devotion",
    category: KinkCategory.Physical,
    description: "A specific craving for anal penetration that only develops with sustained, repeated experience.",
    attachmentCondition: { requiredContext: "ACT_PENETRATIVE_ANAL", requiredCount: 12 },
    triggerEffect: { arousalBonusFlat: 10 },
  },
  {
    id: "kink_rear_entry_preference",
    name: "Rear Entry Preference",
    category: KinkCategory.Positional,
    description: "A strong preference for being taken from behind — Doggy Style or Standing/Wall used repeatedly is what cements this.",
    attachmentCondition: { requiredContext: "POSITION_DOGGY_OR_STANDING", requiredCount: 12 },
    triggerEffect: { arousalBonusFlat: 8 },
  },
  {
    id: "kink_dominance_submission",
    name: "Dominance & Submission",
    category: KinkCategory.Verbal,
    description: "Responds intensely to firm command during sex specifically — repeated Command dialogue paired with her actually reaching climax under it is what develops this.",
    attachmentCondition: { requiredContext: "SPEAK_COMMAND_WITH_CLIMAX", requiredCount: 12 },
    triggerEffect: { arousalBonusFlat: 10 },
  },
  {
    id: "kink_nocturnal_heat",
    name: "Nocturnal Heat",
    category: KinkCategory.Situational,
    description: "Something about the deep privacy of night specifically intensifies her arousal — repeated encounters during Night/Midnight is what cements it.",
    attachmentCondition: { requiredContext: "SCENE_DURING_NIGHT_OR_MIDNIGHT", requiredCount: 10 },
    triggerEffect: { arousalBonusFlat: 8 },
  },
  {
    id: "kink_ear_tail_erogenous_zone",
    name: "Ear & Tail/Wing Erogenous Zone",
    category: KinkCategory.Physical,
    description: "A racial or personal erogenous sensitivity at the ears, tail base, or wing base that intensifies dramatically with repeated attention.",
    attachmentCondition: { requiredContext: "TOUCH_EARS_OR_TAIL_WING", requiredCount: 15 },
    triggerEffect: { arousalBonusFlat: 8, appliesStatusEffect: SexualStatusEffectId.Shivering, statusEffectDurationTurns: 2 },
  },
  {
    id: "kink_slow_grinding_passion",
    name: "Slow Grinding Passion",
    category: KinkCategory.Positional,
    description: "Craves prolonged, unhurried grinding intimacy specifically — Side Spoon or Lotus/Lap used repeatedly, without rushing to climax, is what develops it.",
    attachmentCondition: { requiredContext: "POSITION_SIDE_SPOON_OR_LOTUS", requiredCount: 15 },
    triggerEffect: { arousalBonusFlat: 6 },
  },
  {
    id: "kink_striptease_ritual",
    name: "Striptease Ritual",
    category: KinkCategory.Situational,
    description: "The act of being deliberately, unhurriedly undressed mid-scene becomes its own craving, separate from what follows.",
    attachmentCondition: { requiredContext: "CLOTHING_REMOVED_DURING_ACTIVE_SCENE", requiredCount: 12 },
    triggerEffect: { arousalBonusFlat: 10 },
  },
  {
    id: "kink_impact_play",
    name: "Impact Play",
    category: KinkCategory.Physical,
    description: "Responds to firm, affectionate spanking specifically — repeated use of the act, not a single instance, is what cements the craving.",
    attachmentCondition: { requiredContext: "ACT_SPANK_WITH_SPANKING_ARTISTRY", requiredCount: 15 },
    triggerEffect: { arousalBonusFlat: 8 },
  },
  {
    id: "kink_dirty_talk_craving",
    name: "Dirty Talk Craving",
    category: KinkCategory.Verbal,
    description: "Explicit descriptions of her own body's responses, spoken aloud mid-act, become a craving in their own right with repetition.",
    attachmentCondition: { requiredContext: "SPEAK_DIRTY_TALK", requiredCount: 15 },
    triggerEffect: { arousalBonusFlat: 8 },
  },
  {
    id: "kink_lactation_nursing",
    name: "Lactation & Nursing",
    category: KinkCategory.Physical,
    description: "A specific craving tied to nursing acts and milk-drinking during intimacy, developing only with sustained repetition.",
    attachmentCondition: { requiredContext: "ACT_LACTATION_NURSING", requiredCount: 10 },
    triggerEffect: { arousalBonusFlat: 10, appliesStatusEffect: SexualStatusEffectId.Sensitized, statusEffectDurationTurns: 3 },
  },
  {
    id: "kink_simultaneous_climax_chaser",
    name: "Simultaneous Climax Chaser",
    category: KinkCategory.Physical,
    description: "Becomes fixated on reaching climax at the exact same moment as her partner — repeated simultaneous release is what develops this specifically.",
    attachmentCondition: { requiredContext: "SIMULTANEOUS_CLIMAX_TRIGGERED", requiredCount: 10 },
    triggerEffect: { arousalBonusFlat: 10 },
  },
  {
    id: "kink_missionary_eye_contact_devotion",
    name: "Missionary Eye-Contact Devotion",
    category: KinkCategory.Positional,
    description: "Craves sustained eye contact during face-to-face intimacy specifically — repeated Missionary encounters are what cement it.",
    attachmentCondition: { requiredContext: "POSITION_MISSIONARY", requiredCount: 15 },
    triggerEffect: { arousalBonusFlat: 8 },
  },
  {
    id: "kink_overstimulation_lock",
    name: "Overstimulation Lock",
    category: KinkCategory.Physical,
    description: "Craves being held at peak Arousal for extended stretches rather than released immediately — repeated use of a shared-bliss lock effect develops this.",
    attachmentCondition: { requiredContext: "AROUSAL_LOCKED_AT_MAX_MULTI_TURN", requiredCount: 10 },
    triggerEffect: { arousalBonusFlat: 10, appliesStatusEffect: SexualStatusEffectId.Synchronized, statusEffectDurationTurns: 3 },
  },
  {
    id: "kink_creampie_devotion",
    name: "Creampie Devotion",
    category: KinkCategory.Physical,
    description: "A specific craving tied to internal release — develops only through sustained, repeated experience of the act itself.",
    attachmentCondition: { requiredContext: "ACT_DEEP_INTERNAL_CREAMPIE", requiredCount: 12 },
    triggerEffect: { arousalBonusFlat: 10 },
  },
];
