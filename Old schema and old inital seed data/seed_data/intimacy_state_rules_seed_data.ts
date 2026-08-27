// ============================================================================
// INTIMACY STATE RULES SEED DATA
// ============================================================================
// Granular rules for initializing and mutating partner resistance, mental
// state, and mood during intimate encounters.
// These are used by the Intimacy Engine at scene start and during each turn
// to apply global modifiers that are not encoded in individual actions.
// ============================================================================

import {
    PartnerMentalState,
    PartnerMood,
} from "../schemas/schemas";

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export interface ResistanceRange {
    min: number;
    max: number;
}

export interface InitialResistanceRule {
    id: string;
    loveMin: number;
    trustMin: number;
    resistanceRange: ResistanceRange;
    note?: string;
}

export interface InitialMentalStateRule {
    id: string;
    loveMin: number;
    trustMin: number;
    mentalState: PartnerMentalState;
    randomVariantChance?: number;      // chance to shift to a random alternative
    randomVariantStates?: PartnerMentalState[];
}

export interface InitialMoodRule {
    id: string;
    loveMin: number;
    trustMin: number;
    moodWeights: Partial<Record<PartnerMood, number>>;  // weights sum to 1
}

export interface ForcedSceneInitializationRules {
    resistanceBase: number;
    resistancePerTrustMissing: number;   // additional resistance per point below 100 trust
    resistanceClamp: ResistanceRange;
    mentalStateIfNotBroken: PartnerMentalState;
    moodByTrust: {
        below20: PartnerMood;
        above20: PartnerMood;
    };
    brokenMood: PartnerMood;
    brokenResistanceOverride: ResistanceRange;
}

export interface GlobalIntimacyStateRules {
    brokenMoodLock: boolean;                  // when mental state becomes Broken, mood is locked
    defiantBreakChance: number;               // chance to break when defiant and resistance hits 0
    resistanceIgnoredWhenBroken: boolean;     // if true, resistance is forced to 0 and ignored
    submissiveResistanceGainMultiplier: number; // positive deltas multiplied by this when mood Submissive
    hornyResistanceGainMultiplier: number;    // positive deltas multiplied by this when mood Horny
    defiantResistanceDeltaOverride: boolean;  // if true, positive deltas become negative when mood Defiant
    defiantResistanceThresholdBonus: number;  // added to maxPartnerResistance of actions when mood Defiant
    brokenResistanceDeltaForceZero: boolean;  // if true, deltas are set to 0 when mental state Broken
    resistanceReductionAfterBroken: boolean;  // if false, no further resistance changes after Broken
    moodTransitionLockWhenBroken: boolean;    // prevent mood changes when Broken (redundant with brokenMoodLock)
    forcedSceneResistanceStartLow: boolean;   // if true, resistance starts lower for forced scenes
}

// ---------------------------------------------------------------------------
// CONSENSUAL INITIAL RESISTANCE RULES
// ---------------------------------------------------------------------------
export const CONSENSUAL_INITIAL_RESISTANCE_RULES: InitialResistanceRule[] = [
    {
        id: "consensual_res_very_low",
        loveMin: 80,
        trustMin: 80,
        resistanceRange: { min: 0, max: 5 },
        note: "Deep trust and love: almost no resistance",
    },
    {
        id: "consensual_res_low",
        loveMin: 60,
        trustMin: 60,
        resistanceRange: { min: 5, max: 10 },
        note: "High trust/love: minimal resistance",
    },
    {
        id: "consensual_res_moderate",
        loveMin: 40,
        trustMin: 40,
        resistanceRange: { min: 10, max: 20 },
        note: "Moderate relationship: some resistance",
    },
    {
        id: "consensual_res_high",
        loveMin: 0,
        trustMin: 0,
        resistanceRange: { min: 20, max: 35 },
        note: "Low relationship: notable resistance",
    },
];

// ---------------------------------------------------------------------------
// CONSENSUAL INITIAL MENTAL STATE RULES
// ---------------------------------------------------------------------------
export const CONSENSUAL_INITIAL_MENTAL_STATE_RULES: InitialMentalStateRule[] = [
    {
        id: "consensual_mental_aroused",
        loveMin: 60,
        trustMin: 60,
        mentalState: PartnerMentalState.Aroused,
        randomVariantChance: 0.1,
        randomVariantStates: [PartnerMentalState.Overwhelmed],
    },
    {
        id: "consensual_mental_calm",
        loveMin: 40,
        trustMin: 50,
        mentalState: PartnerMentalState.Calm,
        randomVariantChance: 0.1,
        randomVariantStates: [PartnerMentalState.Nervous],
    },
    {
        id: "consensual_mental_nervous",
        loveMin: 0,
        trustMin: 0,
        mentalState: PartnerMentalState.Nervous,
    },
];

// ---------------------------------------------------------------------------
// CONSENSUAL INITIAL MOOD RULES
// ---------------------------------------------------------------------------
export const CONSENSUAL_INITIAL_MOOD_RULES: InitialMoodRule[] = [
    {
        id: "consensual_mood_high",
        loveMin: 70,
        trustMin: 70,
        moodWeights: {
            [PartnerMood.Horny]: 0.5,
            [PartnerMood.Enthusiastic]: 0.3,
            [PartnerMood.Submissive]: 0.2,
        },
    },
    {
        id: "consensual_mood_medium",
        loveMin: 50,
        trustMin: 50,
        moodWeights: {
            [PartnerMood.Enthusiastic]: 0.4,
            [PartnerMood.Shy]: 0.3,
            [PartnerMood.Neutral]: 0.3,
        },
    },
    {
        id: "consensual_mood_low",
        loveMin: 30,
        trustMin: 30,
        moodWeights: {
            [PartnerMood.Shy]: 0.4,
            [PartnerMood.Neutral]: 0.4,
            [PartnerMood.Reluctant]: 0.2,
        },
    },
    {
        id: "consensual_mood_very_low",
        loveMin: 0,
        trustMin: 0,
        moodWeights: {
            [PartnerMood.Reluctant]: 0.4,
            [PartnerMood.Neutral]: 0.4,
            [PartnerMood.Defiant]: 0.2,
        },
    },
];

// ---------------------------------------------------------------------------
// FORCED SCENE INITIALIZATION RULES
// ---------------------------------------------------------------------------
export const FORCED_SCENE_INITIALIZATION_RULES: ForcedSceneInitializationRules = {
    resistanceBase: 50,
    resistancePerTrustMissing: 0.3,   // resistance = base + (100 - trust) * factor
    resistanceClamp: { min: 50, max: 85 },
    mentalStateIfNotBroken: PartnerMentalState.Nervous,
    moodByTrust: {
        below20: PartnerMood.Defiant,
        above20: PartnerMood.Reluctant,
    },
    brokenMood: PartnerMood.Compliant,
    brokenResistanceOverride: { min: 0, max: 0 }, // when broken, resistance = 0
};

// ---------------------------------------------------------------------------
// GLOBAL STATE RULES
// ---------------------------------------------------------------------------
export const GLOBAL_INTIMACY_STATE_RULES: GlobalIntimacyStateRules = {
    brokenMoodLock: true,
    defiantBreakChance: 0.20,
    resistanceIgnoredWhenBroken: true,
    submissiveResistanceGainMultiplier: 0.5,
    hornyResistanceGainMultiplier: 0.25,
    defiantResistanceDeltaOverride: true,
    defiantResistanceThresholdBonus: 20,
    brokenResistanceDeltaForceZero: true,
    resistanceReductionAfterBroken: false,
    moodTransitionLockWhenBroken: true,
    forcedSceneResistanceStartLow: true,
};