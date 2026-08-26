// ============================================================
// FILE: physicalCore.ts
// ============================================================

import {
    Gender, Race, MaleBodyType, FemaleBodyType,
    HeightTag, SkinTone, SkinUndertone, SkinTexture, SkinCondition,
    ScarPresence, ScarLocation, TattooPresence, BodyOdorProfile, SweatResponse,
    FaceShape, EyeColor, EyeShape, NoseShape, LipFullness, LipShape,
    JawDefinition, CheekboneProminence, EyebrowThickness, FacialHair,
    HairColor, HairStyle, PubicHairStyle, ArmpitHairStyle,
    NippleType, NippleColor, BreastShape, BreastSoftness, CupSize,
    AssShape, AssSoftness, AssSize, StomachType, StomachSoftness,
    MuscleTone, MaleAttractiveness, FemaleAttractiveness,
    CockSize, CockGirth, CumVolume, CumConsistency, CumColor,
    BallSize, RefractoryPeriod, CockTextureType,
    PregnancyStage
} from "./enums";

// ─── HEIGHT ─────────────────────────────────────────────────
export function getHeightTag(heightCm: number, gender: Gender): HeightTag {
    if (gender === Gender.Female) {
        if (heightCm < 150) return HeightTag.VeryShort;
        if (heightCm < 158) return HeightTag.Short;
        if (heightCm < 163) return HeightTag.BelowAverage;
        if (heightCm < 168) return HeightTag.Average;
        if (heightCm < 173) return HeightTag.AboveAverage;
        if (heightCm < 180) return HeightTag.Tall;
        return HeightTag.VeryTall;
    } else {
        if (heightCm < 160) return HeightTag.VeryShort;
        if (heightCm < 168) return HeightTag.Short;
        if (heightCm < 172) return HeightTag.BelowAverage;
        if (heightCm < 177) return HeightTag.Average;
        if (heightCm < 182) return HeightTag.AboveAverage;
        if (heightCm < 190) return HeightTag.Tall;
        return HeightTag.VeryTall;
    }
}

// ─── SKIN PROFILE ───────────────────────────────────────────
export interface SkinProfile {
    tone: SkinTone;
    undertone: SkinUndertone;
    texture: SkinTexture;
    condition: SkinCondition;
    scarPresence: ScarPresence;
    scarLocations: ScarLocation[];
    tattooPresence: TattooPresence;
    bodyOdor: BodyOdorProfile;
    sweatResponse: SweatResponse;
}

// ─── FACE PROFILE ───────────────────────────────────────────
export interface FaceProfile {
    shape: FaceShape;
    eyeColor: EyeColor;
    eyeShape: EyeShape;
    noseShape: NoseShape;
    lipFullness: LipFullness;
    lipShape: LipShape;
    jawDefinition: JawDefinition;
    cheekboneProminence: CheekboneProminence;
    eyebrowThickness: EyebrowThickness;
    facialHair: FacialHair;   // male only; NONE for female
}

// ─── HAIR PROFILE ───────────────────────────────────────────
export interface HairProfile {
    color: HairColor;
    style: HairStyle;
    pubicStyle: PubicHairStyle;
    armpitStyle: ArmpitHairStyle;
}

// ─── FEMALE BODY MEASUREMENTS ───────────────────────────────
export interface FemaleMeasurements {
    heightCm: number;
    heightTag: HeightTag;
    bustCm: number;
    waistCm: number;
    hipCm: number;
    cupSize: CupSize;
    assSize: AssSize;
    stomachType: StomachType;
    stomachSoftness: StomachSoftness;
    muscleTone: MuscleTone;
    bodyFatPercent: number;
    // Effective (pregnancy-modified)
    effectiveBustCm: number;
    effectiveWaistCm: number;
    effectiveHipCm: number;
    effectiveCupSize: CupSize;
    effectiveStomachType: StomachType;
    effectiveStomachSoftness: StomachSoftness;
}

// ─── FEMALE PHYSICAL DETAIL ─────────────────────────────────
export interface FemalePhysicalDetail {
    breastShape: BreastShape;
    breastSoftness: BreastSoftness;
    nippleType: NippleType;
    nippleColor: NippleColor;
    assShape: AssShape;
    assSoftness: AssSoftness;
    attractiveness: FemaleAttractiveness;
}

// ─── MALE BODY MEASUREMENTS ─────────────────────────────────
export interface MaleMeasurements {
    heightCm: number;
    heightTag: HeightTag;
    chestCm: number;
    waistCm: number;
    hipCm: number;
    shoulderWidthCm: number;
    muscleTone: MuscleTone;
    stomachType: StomachType;
    bodyFatPercent: number;
}

// ─── MALE PHYSICAL DETAIL ───────────────────────────────────
export interface MalePhysicalDetail {
    attractiveness: MaleAttractiveness;
    cockSize: CockSize;
    cockGirth: CockGirth;
    cockTexture: CockTextureType;
    cumVolume: CumVolume;
    cumConsistency: CumConsistency;
    cumColor: CumColor;
    ballSize: BallSize;
    refractoryPeriod: RefractoryPeriod;
}

// ─── RACE PHYSICAL FEATURES ─────────────────────────────────
export interface RacePhysicalFeatures {
    wings: import("./enums").WingType;
    tail: import("./enums").TailType;
    ears: import("./enums").EarType;
    horns: import("./enums").HornType;
    specialFeatures: string[];
}