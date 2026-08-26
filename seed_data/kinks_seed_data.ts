// ============================================================================
// KINKS SEED DATA
// ============================================================================
// 20 global kinks used by the intimacy engine to track progression and
// trigger additional arousal bonuses during scenes.
// ============================================================================

import type { KinkDef } from "../schemas/schemas";
import {
    KinkCategory,
    SexualStatusEffectId,
} from "../schemas/schemas";

export const KINKS: KinkDef[] = [
    // ===========================================================================
    // VERBAL
    // ===========================================================================
    {
        id: "praise_kink",
        name: "Praise",
        category: KinkCategory.Verbal,
        description: "Enjoys being praised and complimented during intimacy.",
        attachmentCondition: {
            requiredContext: "praise_dialogue_used",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 12,
        },
    },
    {
        id: "degradation_kink",
        name: "Degradation",
        category: KinkCategory.Verbal,
        description: "Enjoys being degraded or humiliated in a consensual setting.",
        attachmentCondition: {
            requiredContext: "degradation_dialogue_used",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 12,
        },
    },
    {
        id: "dirty_talk_kink",
        name: "Dirty Talk",
        category: KinkCategory.Verbal,
        description: "Likes explicit and provocative dirty talk.",
        attachmentCondition: {
            requiredContext: "dirty_talk_dialogue_used",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 10,
        },
    },

    // ===========================================================================
    // PHYSICAL
    // ===========================================================================
    {
        id: "bondage_kink",
        name: "Bondage",
        category: KinkCategory.Physical,
        description: "Enjoys being restrained or tying a partner up.",
        attachmentCondition: {
            requiredContext: "bondage_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 15,
            appliesStatusEffect: SexualStatusEffectId.Shivering,
            statusEffectDurationTurns: 2,
        },
    },
    {
        id: "impact_play_kink",
        name: "Impact Play",
        category: KinkCategory.Physical,
        description: "Enjoys spanking, paddling, or other consensual impact.",
        attachmentCondition: {
            requiredContext: "impact_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 14,
            appliesStatusEffect: SexualStatusEffectId.Sensitized,
            statusEffectDurationTurns: 2,
        },
    },
    {
        id: "nipple_play_kink",
        name: "Nipple Play",
        category: KinkCategory.Physical,
        description: "Enjoys receiving or giving nipple stimulation.",
        attachmentCondition: {
            requiredContext: "nipple_stimulation_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 12,
            appliesStatusEffect: SexualStatusEffectId.Sensitized,
            statusEffectDurationTurns: 1,
        },
    },
    {
        id: "anal_play_kink",
        name: "Anal Play",
        category: KinkCategory.Physical,
        description: "Enjoys anal stimulation or penetration.",
        attachmentCondition: {
            requiredContext: "anal_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 14,
        },
    },
    {
        id: "oral_fixation_kink",
        name: "Oral Fixation",
        category: KinkCategory.Physical,
        description: "Enjoys giving or receiving oral sex.",
        attachmentCondition: {
            requiredContext: "oral_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 13,
        },
    },
    {
        id: "breast_play_kink",
        name: "Breast Play",
        category: KinkCategory.Physical,
        description: "Enjoys breast stimulation and worship.",
        attachmentCondition: {
            requiredContext: "breast_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 12,
        },
    },
    {
        id: "edging_kink",
        name: "Edging",
        category: KinkCategory.Physical,
        description: "Enjoys orgasm denial or prolonged teasing.",
        attachmentCondition: {
            requiredContext: "edging_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 16,
            appliesStatusEffect: SexualStatusEffectId.Edging,
            statusEffectDurationTurns: 1,
        },
    },
    {
        id: "rough_sex_kink",
        name: "Rough Sex",
        category: KinkCategory.Physical,
        description: "Enjoys aggressive, hard, and rough intimacy.",
        attachmentCondition: {
            requiredContext: "rough_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 15,
        },
    },
    {
        id: "toy_play_kink",
        name: "Toy Play",
        category: KinkCategory.Physical,
        description: "Enjoys using sex toys during intimacy.",
        attachmentCondition: {
            requiredContext: "toy_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 13,
        },
    },
    {
        id: "cum_play_kink",
        name: "Cum Play",
        category: KinkCategory.Physical,
        description: "Enjoys cum-related activities, such as facials or creampies.",
        attachmentCondition: {
            requiredContext: "cum_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 14,
        },
    },

    // ===========================================================================
    // SITUATIONAL
    // ===========================================================================
    {
        id: "exhibitionism_kink",
        name: "Exhibitionism",
        category: KinkCategory.Situational,
        description: "Enjoys being watched or exposed during intimacy.",
        attachmentCondition: {
            requiredContext: "exhibitionism_context_triggered",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 14,
        },
    },

    // ===========================================================================
    // EMOTIONAL
    // ===========================================================================
    {
        id: "romance_kink",
        name: "Romance",
        category: KinkCategory.Emotional,
        description: "Enjoys romantic, loving, and emotionally connected intimacy.",
        attachmentCondition: {
            requiredContext: "romantic_dialogue_used",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 15,
        },
    },

    // ===========================================================================
    // LACTATION & PREGNANCY (special, may require content toggles)
    // ===========================================================================
    {
        id: "lactation_kink",
        name: "Lactation",
        category: KinkCategory.Physical,
        description: "Enjoys lactation play or breast milk stimulation.",
        attachmentCondition: {
            requiredContext: "lactation_action_performed",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 15,
        },
    },
    {
        id: "pregnancy_kink",
        name: "Pregnancy",
        category: KinkCategory.Emotional,
        description: "Enjoys the idea or reality of pregnancy during intimacy.",
        attachmentCondition: {
            requiredContext: "pregnancy_context_triggered",
            requiredCount: 5,
        },
        triggerEffect: {
            arousalBonusFlat: 16,
        },
    },
];