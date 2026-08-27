// ============================================================
// FILE: sexualPhysiology.ts
// ============================================================

import {
    SensitivityLevel, WetnessLevel, VaginaType, VaginaElasticity,
    ClitSize, LabiaType, OrgasmType, OrgasmEase, ArousalSpeed,
    LubricationSpeed, PostOrgasmSensitivity, FertilityRating,
    PregnancyStage, PregnancyHistory
} from "./enums";
import { SexualActFlags } from "./historyProfile";

// ─── SENSITIVITY TRACK ──────────────────────────────────────
// Each sensitivity point is tracked independently
// maxReached acts as a permanent ceiling increase through encounters
export interface SensitivityTrack {
    baseline: SensitivityLevel;
    current: SensitivityLevel;
    maxReached: SensitivityLevel;
    increaseRatePerEncounter: number;   // 0.0 - 1.0; probability of increase per encounter
}

export interface FemaleSensitivityProfile {
    nipple: SensitivityTrack;
    breast: SensitivityTrack;
    vagina: SensitivityTrack;
    clit: SensitivityTrack;
    cervix: SensitivityTrack;
    womb: SensitivityTrack;
    ass: SensitivityTrack;
    lips: SensitivityTrack;
    tongue: SensitivityTrack;
    skin: SensitivityTrack;
    ears: SensitivityTrack;
}

export interface MaleSensitivityProfile {
    cock: SensitivityTrack;
    balls: SensitivityTrack;
    ass: SensitivityTrack;
    nipple: SensitivityTrack;
    lips: SensitivityTrack;
    tongue: SensitivityTrack;
    skin: SensitivityTrack;
}

// ─── WETNESS TRACK ──────────────────────────────────────────
export interface WetnessTrack {
    baseline: WetnessLevel;                 // resting state without arousal
    current: WetnessLevel;                  // live state during encounter
    arousalThresholdToWet: number;          // 0-100 arousal value at which wetness begins
    peakWetnessAtArousal: number;           // 0-100 arousal value at which peak wetness is reached
    // Current wetness is calculated from arousal level dynamically
    // floor = baseline, ceiling = one above peakWetness level based on arousal
}

// ─── ORGASM PROFILE ─────────────────────────────────────────
export interface OrgasmProfile {
    acquiredTypes: Set<OrgasmType>;         // starts with one dominant, gains more through encounters
    dominantType: OrgasmType;
    ease: OrgasmEase;
    postSensitivity: PostOrgasmSensitivity;
    squirtCapacity: boolean;                // acquirable through encounters
    multipleCapacity: boolean;              // acquirable through encounters
    orgasmCount: number;                    // lifetime orgasm count — tracked for behavior modifiers
}

// ─── FEMALE SEXUAL PHYSIOLOGY ───────────────────────────────
export interface FemaleSexualPhysiology {
    vaginaType: VaginaType;
    vaginaElasticity: VaginaElasticity;
    wetnessTrack: WetnessTrack;
    clitSize: ClitSize;
    labiaType: LabiaType;
    sensitivity: FemaleSensitivityProfile;
    orgasmProfile: OrgasmProfile;
    arousalSpeed: ArousalSpeed;
    lubricationSpeed: LubricationSpeed;
    fertilityRating: FertilityRating;
    // Menstrual cycle — simple tracking
    cycleDay: number;                       // 1-28
    fertile: boolean;                       // true days 10-17
    pregnancyHistory: PregnancyHistory;
    lactationHistory: boolean;              // true if ever lactated
}

// ─── MALE SEXUAL PHYSIOLOGY ─────────────────────────────────
export interface MaleSexualPhysiology {
    sensitivity: MaleSensitivityProfile;
    arousalSpeed: ArousalSpeed;
}

// ─── SENSITIVITY LEVEL UTILITIES ────────────────────────────
const SENSITIVITY_ORDER: SensitivityLevel[] = [
    SensitivityLevel.None,
    SensitivityLevel.Low,
    SensitivityLevel.Moderate,
    SensitivityLevel.High,
    SensitivityLevel.VeryHigh,
    SensitivityLevel.Extreme,
    SensitivityLevel.Overwhelming
];

export function incrementSensitivity(track: SensitivityTrack): SensitivityTrack {
    const currentIndex = SENSITIVITY_ORDER.indexOf(track.current);
    const maxIndex = SENSITIVITY_ORDER.indexOf(track.maxReached);
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    const newCurrent = SENSITIVITY_ORDER[newIndex];

    // Raise maxReached ceiling if current is hitting it
    const newMaxIndex = Math.min(maxIndex + (currentIndex >= maxIndex ? 1 : 0), SENSITIVITY_ORDER.length - 1);
    const newMax = SENSITIVITY_ORDER[newMaxIndex];

    return {
        ...track,
        current: newCurrent,
        maxReached: newMax
    };
}

export function tryIncreaseSensitivity(track: SensitivityTrack): SensitivityTrack {
    if (Math.random() < track.increaseRatePerEncounter) {
        return incrementSensitivity(track);
    }
    return track;
}

// ─── WETNESS FROM AROUSAL ───────────────────────────────────
export function calculateWetnessFromArousal(track: WetnessTrack, arousalLevel: number): WetnessLevel {
    const WETNESS_ORDER: WetnessLevel[] = [
        WetnessLevel.Dry, WetnessLevel.Damp, WetnessLevel.Moderate,
        WetnessLevel.Wet, WetnessLevel.VeryWet, WetnessLevel.Dripping, WetnessLevel.Flooding
    ];
    const baselineIndex = WETNESS_ORDER.indexOf(track.baseline);

    if (arousalLevel < track.arousalThresholdToWet) {
        return track.baseline;
    }

    const arousalRange = track.peakWetnessAtArousal - track.arousalThresholdToWet;
    const arousalProgress = Math.min((arousalLevel - track.arousalThresholdToWet) / arousalRange, 1.0);
    const maxPossibleIndex = WETNESS_ORDER.length - 1;
    const targetIndex = Math.round(baselineIndex + arousalProgress * (maxPossibleIndex - baselineIndex));

    return WETNESS_ORDER[Math.min(targetIndex, maxPossibleIndex)];
}

export function updateFemaleSensitivityFromActs(
    physiology: FemaleSexualPhysiology,
    actsPerformed: Partial<SexualActFlags>
): FemaleSexualPhysiology {
    let s = { ...physiology.sensitivity };

    if (actsPerformed.nippleSuck) s.nipple = tryIncreaseSensitivity(s.nipple);
    if (actsPerformed.nipplePull) s.nipple = tryIncreaseSensitivity(s.nipple);
    if (actsPerformed.breastFuck) s.breast = tryIncreaseSensitivity(s.breast);
    if (actsPerformed.breastSwing) s.breast = tryIncreaseSensitivity(s.breast);
    if (actsPerformed.vaginalPenetration) s.vagina = tryIncreaseSensitivity(s.vagina);
    if (actsPerformed.fingeringReceived) s.clit = tryIncreaseSensitivity(s.clit);
    if (actsPerformed.analPenetration) s.ass = tryIncreaseSensitivity(s.ass);
    if (actsPerformed.oralReceiving) s.clit = tryIncreaseSensitivity(s.clit);
    if (actsPerformed.deepthroat) s.lips = tryIncreaseSensitivity(s.lips);
    if (actsPerformed.oralGiving) s.tongue = tryIncreaseSensitivity(s.tongue);
    if (actsPerformed.cumOnBody) s.skin = tryIncreaseSensitivity(s.skin);
    // Cervix and womb require very deep penetration — handled by specific act flag
    if (actsPerformed.vaginalPenetration && Math.random() < 0.1)
        s.cervix = tryIncreaseSensitivity(s.cervix);
    if (actsPerformed.vaginalCreampie && Math.random() < 0.05)
        s.womb = tryIncreaseSensitivity(s.womb);

    return { ...physiology, sensitivity: s };
}

export function updateMaleSensitivityFromEncounter(
    physiology: MaleSexualPhysiology,
    actsPerformed: Partial<SexualActFlags>
): MaleSexualPhysiology {
    let sensitivity = { ...physiology.sensitivity };

    if (actsPerformed.oralReceiving) sensitivity.cock = tryIncreaseSensitivity(sensitivity.cock);
    if (actsPerformed.handjobGiven) sensitivity.cock = tryIncreaseSensitivity(sensitivity.cock);
    if (actsPerformed.analPenetration) sensitivity.ass = tryIncreaseSensitivity(sensitivity.ass);
    if (actsPerformed.nippleSuck) sensitivity.nipple = tryIncreaseSensitivity(sensitivity.nipple);
    if (actsPerformed.nipplePull) sensitivity.nipple = tryIncreaseSensitivity(sensitivity.nipple);
    if (actsPerformed.deepthroat) sensitivity.cock = tryIncreaseSensitivity(sensitivity.cock);
    if (actsPerformed.fingeringReceived) sensitivity.skin = tryIncreaseSensitivity(sensitivity.skin);

    return { ...physiology, sensitivity };
}