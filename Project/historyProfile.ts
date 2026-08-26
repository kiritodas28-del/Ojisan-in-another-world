// ============================================================
// FILE: historyProfile.ts
// ============================================================

import {
    SocialClass, Occupation, PregnancyHistory,
    RelationshipHistory, OrgasmType, Kink
} from "./enums";

// ─── BACKGROUND ─────────────────────────────────────────────
export interface BackgroundProfile {
    socialClass: SocialClass;
    occupation: Occupation;
    actualAge: number;                      // true age in years
    apparentAge: number;                    // visible age — derived from race ratio
    traumaPresent: boolean;
    traumaSeverity: "NONE" | "MILD" | "MODERATE" | "SEVERE";
}

// ─── SEXUAL EXPERIENCE FLAGS ────────────────────────────────
// Tracks what acts have been experienced
// Each body-part-specific flag unlocks relevant content/responses
export interface SexualActFlags {
    // Vaginal
    vaginalPenetration: boolean;
    vaginalCreampie: boolean;
    // Anal
    analPenetration: boolean;
    analCreampie: boolean;
    // Oral
    oralGiving: boolean;
    oralReceiving: boolean;
    deepthroat: boolean;
    // Breast
    breastFuck: boolean;
    nippleSuck: boolean;
    nipplePull: boolean;
    // Manual
    fingeringReceived: boolean;
    handjobGiven: boolean;
    // Orgasm types experienced
    orgasmTypesExperienced: Set<OrgasmType>;
    // Kink experiences
    kinksExperienced: Set<Kink>;
    // Hardcore
    bondageExperienced: boolean;
    impactExperienced: boolean;
    chokingExperienced: boolean;
    edgingExperienced: boolean;
    squirtingAchieved: boolean;
    multipleOrgasmAchieved: boolean;
    // Cum
    facialReceived: boolean;
    cumSwallowed: boolean;
    creampieReceived: boolean;
    // Toys
    toyUsed: boolean;
    vibratorUsed: boolean;
}

// ─── EXPERIENCE HISTORY ─────────────────────────────────────
export interface ExperienceHistory {
    priorPartnerCount: number;
    totalEncounterCount: number;
    actsExperienced: SexualActFlags;
    pregnancyHistory: PregnancyHistory;
    pregnancyCount: number;
    lactationHistory: boolean;
    relationshipHistory: RelationshipHistory;
}

export function createEmptyActFlags(): SexualActFlags {
    return {
        vaginalPenetration: false,
        vaginalCreampie: false,
        analPenetration: false,
        analCreampie: false,
        oralGiving: false,
        oralReceiving: false,
        deepthroat: false,
        breastFuck: false,
        nippleSuck: false,
        nipplePull: false,
        fingeringReceived: false,
        handjobGiven: false,
        orgasmTypesExperienced: new Set(),
        kinksExperienced: new Set(),
        bondageExperienced: false,
        impactExperienced: false,
        chokingExperienced: false,
        edgingExperienced: false,
        squirtingAchieved: false,
        multipleOrgasmAchieved: false,
        facialReceived: false,
        cumSwallowed: false,
        creampieReceived: false,
        toyUsed: false,
        vibratorUsed: false
    };
}