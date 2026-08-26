// ============================================================
// FILE: psychologyCore.ts
// ============================================================

import {
    BigFiveLevel, DominantTrait, HumorStyle, EmotionalStability,
    SexualConfidence, SexualLean, ResistanceProfileType,
    VocalTendency, EyeContactTendency, DirtyTalkTendency,
    TrustBaseline, LoyaltyLevel, JealousyTendency, AffectionStyle,
    RelationshipHistory, Kink, VoicePitch, VoiceTexture
} from "./enums";

// ─── BIG FIVE ───────────────────────────────────────────────
export interface BigFiveProfile {
    openness: BigFiveLevel;
    conscientiousness: BigFiveLevel;
    extraversion: BigFiveLevel;
    agreeableness: BigFiveLevel;
    neuroticism: BigFiveLevel;
}

// ─── PERSONALITY CORE ───────────────────────────────────────
export interface PersonalityCore {
    bigFive: BigFiveProfile;
    dominantTrait: DominantTrait;
    secondaryTrait: DominantTrait;
    humorStyle: HumorStyle;
    emotionalStability: EmotionalStability;
    trustBaseline: TrustBaseline;
    loyaltyLevel: LoyaltyLevel;
    jealousyTendency: JealousyTendency;
    affectionStyle: AffectionStyle;
}

// ─── RESISTANCE PROFILE ─────────────────────────────────────
// Resistance is separate from corruption
// profileType can shift as corruption rises through thresholds
export interface ResistanceProfile {
    profileType: ResistanceProfileType;
    currentResistance: number;              // 0-100; 100 = maximum resistance
    baselineResistance: number;             // starting resistance before encounters
    corruptionShiftThreshold: number;       // corruption level at which profile shifts
    nextProfileType: ResistanceProfileType; // profile shifts to this at threshold
    traumaModifier: number;                 // -20 to +30 modifier applied to baseline
}

// ─── CORRUPTION / SHAME TRACK ───────────────────────────────
export interface CorruptionShameTrack {
    corruption: number;                     // 0-100; never resets fully; rises with encounters
    shame: number;                          // 0-100; starts high; falls as corruption rises
    corruptionRatePerEncounter: number;     // base rate at which corruption increases
    shameDecayRate: number;                 // how fast shame falls per corruption point
}

// ─── SEXUAL PSYCHOLOGY ──────────────────────────────────────
export interface SexualPsychology {
    sexualConfidence: SexualConfidence;
    sexualLean: SexualLean;                 // changeable with multiple encounters
    acquiredKinks: Set<Kink>;               // starts with base set, gains through encounters
    kinkAcquisitionRate: number;            // probability of acquiring new kink per encounter
    resistanceProfile: ResistanceProfile;
    corruptionShame: CorruptionShameTrack;
    vocalTendency: VocalTendency;
    eyeContactTendency: EyeContactTendency;
    dirtyTalkTendency: DirtyTalkTendency;
    relationshipHistory: RelationshipHistory;
}

// ─── VOICE PROFILE ──────────────────────────────────────────
export interface VoiceProfile {
    pitch: VoicePitch;
    texture: VoiceTexture;
    dirtyTalkTendency: DirtyTalkTendency;
}

// ─── SOCIAL PROFILE ─────────────────────────────────────────
export interface SocialProfile {
    trustBaseline: TrustBaseline;
    loyaltyLevel: LoyaltyLevel;
    jealousyTendency: JealousyTendency;
    affectionStyle: AffectionStyle;
}

// ─── CORRUPTION UTILITIES ───────────────────────────────────
export function applyCorruptionIncrease(
    track: CorruptionShameTrack,
    encounterIntensity: number   // 0.0 - 1.0
): CorruptionShameTrack {
    const corruptionGain = track.corruptionRatePerEncounter * encounterIntensity;
    const newCorruption = Math.min(track.corruption + corruptionGain, 100);
    const shameDecay = corruptionGain * track.shameDecayRate;
    const newShame = Math.max(track.shame - shameDecay, 0);
    return {
        ...track,
        corruption: newCorruption,
        shame: newShame
    };
}

export function checkResistanceProfileShift(profile: ResistanceProfile, corruption: number): ResistanceProfile {
    if (corruption >= profile.corruptionShiftThreshold && profile.profileType !== profile.nextProfileType) {
        return {
            ...profile,
            profileType: profile.nextProfileType
        };
    }
    return profile;
}