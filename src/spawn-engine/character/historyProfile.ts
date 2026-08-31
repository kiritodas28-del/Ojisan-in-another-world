// ============================================================
// FILE: historyProfile.ts
// ============================================================

import {
    SocialClass, Occupation, PregnancyHistory,
    RelationshipHistory, OrgasmType, Kink, RegionOfOrigin
} from "../types/enums";

// ─── BACKGROUND ─────────────────────────────────────────────
export interface BackgroundProfile {
    socialClass: SocialClass;
    occupation: Occupation;
    actualAge: number;                      // true age in years
    apparentAge: number;                    // visible age — derived from race ratio
    traumaPresent: boolean;
    traumaSeverity: "NONE" | "MILD" | "MODERATE" | "SEVERE";
    regionOfOrigin: RegionOfOrigin;
}

// ─── SEXUAL EXPERIENCE FLAGS ────────────────────────────────
// Tracks what acts have been experienced.
// orgasmTypesExperienced and kinksExperienced use T[] instead of Set<T>
// because JSON.stringify(new Set()) silently produces {} causing silent save corruption.
// Use addUniqueOrgasmType / addUniqueKink helpers to preserve uniqueness.
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
    breastSwing: boolean;
    // Manual
    fingeringReceived: boolean;
    handjobGiven: boolean;
    // Orgasm types and kinks — T[] for JSON safety (Set<T> silently serializes as {})
    orgasmTypesExperienced: OrgasmType[];
    kinksExperienced: Kink[];
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
    cumOnBody: boolean;
    cumOnBreast: boolean;
    // Toys
    toyUsed: boolean;
    vibratorUsed: boolean;
    restraintsApplied: boolean;
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
        orgasmTypesExperienced: [],
        kinksExperienced: [],
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
        vibratorUsed: false,
        breastSwing: false,
        cumOnBody: false,
        cumOnBreast: false,
        restraintsApplied: false
    };
}

// ─── ARRAY-BASED UNIQUENESS HELPERS ─────────────────────────
// Replaces Set.add() — adds item only if not already present.
// Use these instead of arr.push() to preserve the uniqueness guarantee.

export function addUniqueOrgasmType(arr: OrgasmType[], type: OrgasmType): OrgasmType[] {
    return arr.includes(type) ? arr : [...arr, type];
}

export function addUniqueKink(arr: Kink[], kink: Kink): Kink[] {
    return arr.includes(kink) ? arr : [...arr, kink];
}

export function hasOrgasmType(arr: OrgasmType[], type: OrgasmType): boolean {
    return arr.includes(type);
}

export function hasKink(arr: Kink[], kink: Kink): boolean {
    return arr.includes(kink);
}
