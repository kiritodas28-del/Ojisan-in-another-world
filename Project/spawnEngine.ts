// ============================================================
// FILE: spawnEngine.ts
// ============================================================

import {
    Gender, Race, MaleBodyType, FemaleBodyType,
    SkinUndertone, SkinTexture, SkinCondition, ScarPresence,
    ScarLocation, TattooPresence, BodyOdorProfile, SweatResponse,
    FaceShape, EyeShape, NoseShape, LipFullness, LipShape,
    JawDefinition, CheekboneProminence, EyebrowThickness, FacialHair,
    HairStyle, PubicHairStyle, ArmpitHairStyle,
    NippleType, NippleColor, BreastShape, BreastSoftness,
    AssShape, AssSoftness, CupSize, AssSize,
    StomachType, StomachSoftness, MuscleTone,
    MaleAttractiveness, FemaleAttractiveness,
    CockGirth, CockTextureType, CumVolume, CumConsistency, CumColor,
    BallSize, RefractoryPeriod,
    VaginaType, VaginaElasticity, WetnessLevel, ClitSize, LabiaType,
    OrgasmType, OrgasmEase, ArousalSpeed, LubricationSpeed,
    PostOrgasmSensitivity, FertilityRating, PregnancyHistory,
    SensitivityLevel,
    BigFiveLevel, DominantTrait, HumorStyle, EmotionalStability,
    SexualConfidence, SexualLean, ResistanceProfileType,
    VocalTendency, EyeContactTendency, DirtyTalkTendency,
    TrustBaseline, LoyaltyLevel, JealousyTendency, AffectionStyle,
    RelationshipHistory, Kink, VoicePitch, VoiceTexture,
    SocialClass, Occupation, MoodValue, BondType,
    PregnancyStage, HeightTag
} from "./enums";

import { RACE_PROFILES, RaceProfile } from "./raceProfiles";
import { FEMALE_BODY_TYPES, MALE_BODY_TYPES, PREGNANCY_STAGE_OVERRIDES } from "./bodyTypes";
import { PopulationConfig } from "./populationConfig";
import {
    SkinProfile, FaceProfile, HairProfile,
    FemaleMeasurements, FemalePhysicalDetail,
    MaleMeasurements, MalePhysicalDetail,
    RacePhysicalFeatures, getHeightTag
} from "./physicalCore";
import {
    FemaleSexualPhysiology, MaleSexualPhysiology,
    FemaleSensitivityProfile, MaleSensitivityProfile,
    WetnessTrack, OrgasmProfile, SensitivityTrack
} from "./sexualPhysiology";
import {
    PersonalityCore, BigFiveProfile, ResistanceProfile,
    CorruptionShameTrack, SexualPsychology, VoiceProfile, SocialProfile
} from "./psychologyCore";
import {
    BackgroundProfile, ExperienceHistory, createEmptyActFlags
} from "./historyProfile";
import {
    CharacterDynamicState, createInitialDynamicState
} from "./dynamicState";

// ─── FULL CHARACTER INTERFACES ──────────────────────────────

export interface FemaleCharacter {
    gender: Gender.Female;
    race: Race;
    raceFeatures: RacePhysicalFeatures;
    bodyType: FemaleBodyType;
    skin: SkinProfile;
    face: FaceProfile;
    hair: HairProfile;
    measurements: FemaleMeasurements;
    physicalDetail: FemalePhysicalDetail;
    sexualPhysiology: FemaleSexualPhysiology;
    personality: PersonalityCore;
    sexualPsychology: SexualPsychology;
    voice: VoiceProfile;
    social: SocialProfile;
    background: BackgroundProfile;
    history: ExperienceHistory;
    state: CharacterDynamicState;
}

export interface MaleCharacter {
    gender: Gender.Male;
    race: Race;
    raceFeatures: RacePhysicalFeatures;
    bodyType: MaleBodyType;
    skin: SkinProfile;
    face: FaceProfile;
    hair: HairProfile;
    measurements: MaleMeasurements;
    physicalDetail: MalePhysicalDetail;
    sexualPhysiology: MaleSexualPhysiology;
    personality: PersonalityCore;
    sexualPsychology: SexualPsychology;
    voice: VoiceProfile;
    social: SocialProfile;
    background: BackgroundProfile;
    history: ExperienceHistory;
    state: CharacterDynamicState;
}

export type Character = FemaleCharacter | MaleCharacter;

// ─── UTILITY FUNCTIONS ──────────────────────────────────────

function weightedRandom<T extends string>(weights: Record<T, number>): T {
    const entries = Object.entries(weights) as [T, number][];
    const filtered = entries.filter(([, w]) => w > 0);
    const total = filtered.reduce((sum, [, w]) => sum + w, 0);
    let roll = Math.random() * total;
    for (const [key, weight] of filtered) {
        roll -= weight;
        if (roll <= 0) return key;
    }
    return filtered[filtered.length - 1][0];
}

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomInRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

function clamp(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
}

function generateHeight(mean: number, stdDev: number, min: number, max: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.round(clamp(mean + z * stdDev, min, max));
}

function cupSizeToIndex(cup: CupSize): number {
    return Object.values(CupSize).indexOf(cup);
}

function cupSizeFromIndex(index: number): CupSize {
    const cups = Object.values(CupSize);
    return cups[clamp(index, 0, cups.length - 1)];
}

function physicsCapBust(bustCm: number, heightCm: number): number {
    return Math.min(bustCm, heightCm * 0.72);
}

function physicsCapHip(hipCm: number, heightCm: number): number {
    return Math.min(hipCm, heightCm * 0.80);
}

function clampWaist(waistCm: number, heightCm: number): number {
    return clamp(waistCm, heightCm * 0.35, heightCm * 0.60);
}

function makeSensitivityTrack(baseline: SensitivityLevel, rate: number): SensitivityTrack {
    return {
        baseline,
        current: baseline,
        maxReached: baseline,
        increaseRatePerEncounter: rate
    };
}

// ─── RACE-AWARE WEIGHTED RANDOM ─────────────────────────────

function raceAwareBodyType<T extends string>(
    baseWeights: Record<T, number>,
    raceBias: Partial<Record<T, number>>
): T {
    const combined = { ...baseWeights };
    for (const [key, mult] of Object.entries(raceBias) as [T, number][]) {
        combined[key] = (combined[key] || 0) * mult;
    }
    return weightedRandom(combined);
}

// ─── SKIN GENERATOR ─────────────────────────────────────────

function generateSkin(config: PopulationConfig, raceProfile: RaceProfile): SkinProfile {
    // Prefer race skin tones but allow config override via intersection weighting
    const raceTones = raceProfile.preferredSkinTones;
    const toneWeights: Partial<Record<string, number>> = {};
    for (const tone of raceTones) {
        toneWeights[tone] = (config.skinToneWeights[tone as keyof typeof config.skinToneWeights] || 0) + 5;
    }
    // Fill remaining from config
    for (const [tone, weight] of Object.entries(config.skinToneWeights)) {
        if (!toneWeights[tone]) toneWeights[tone] = weight;
    }

    return {
        tone: weightedRandom(toneWeights as Record<string, number>) as import("./enums").SkinTone,
        undertone: randomFrom(Object.values(SkinUndertone)),
        texture: randomFrom(Object.values(SkinTexture)),
        condition: randomFrom(Object.values(SkinCondition)),
        scarPresence: Math.random() < 0.15 ? randomFrom([ScarPresence.Minor, ScarPresence.Moderate]) : ScarPresence.None,
        scarLocations: Math.random() < 0.15 ? [randomFrom(Object.values(ScarLocation).filter(s => s !== ScarLocation.None))] : [ScarLocation.None],
        tattooPresence: Math.random() < 0.2 ? randomFrom([TattooPresence.Minimal, TattooPresence.Moderate]) : TattooPresence.None,
        bodyOdor: randomFrom(Object.values(BodyOdorProfile)),
        sweatResponse: randomFrom(Object.values(SweatResponse))
    };
}

// ─── FACE GENERATOR ─────────────────────────────────────────

function generateFace(gender: Gender, raceProfile: RaceProfile): FaceProfile {
    const eyeColors = raceProfile.preferredEyeColors;
    return {
        shape: randomFrom(Object.values(FaceShape)),
        eyeColor: randomFrom(eyeColors),
        eyeShape: randomFrom(Object.values(EyeShape)),
        noseShape: randomFrom(Object.values(NoseShape)),
        lipFullness: randomFrom(Object.values(LipFullness)),
        lipShape: randomFrom(Object.values(LipShape)),
        jawDefinition: randomFrom(Object.values(JawDefinition)),
        cheekboneProminence: randomFrom(Object.values(CheekboneProminence)),
        eyebrowThickness: randomFrom(Object.values(EyebrowThickness)),
        facialHair: gender === Gender.Male
            ? randomFrom(Object.values(FacialHair))
            : FacialHair.None
    };
}

// ─── HAIR GENERATOR ─────────────────────────────────────────

function generateHair(config: PopulationConfig, raceProfile: RaceProfile): HairProfile {
    const raceHairs = raceProfile.preferredHairColors;
    const hairWeights: Partial<Record<string, number>> = {};
    for (const color of raceHairs) {
        hairWeights[color] = (config.hairColorWeights[color as keyof typeof config.hairColorWeights] || 0) + 5;
    }
    for (const [color, weight] of Object.entries(config.hairColorWeights)) {
        if (!hairWeights[color]) hairWeights[color] = weight;
    }

    return {
        color: weightedRandom(hairWeights as Record<string, number>) as import("./enums").HairColor,
        style: randomFrom(Object.values(HairStyle)),
        pubicStyle: randomFrom(Object.values(PubicHairStyle)),
        armpitStyle: randomFrom(Object.values(ArmpitHairStyle))
    };
}

// ─── RACE FEATURES ──────────────────────────────────────────

function generateRaceFeatures(raceProfile: RaceProfile, gender: Gender): RacePhysicalFeatures {
    const f = raceProfile.features;
    const cockTexture = gender === Gender.Male && f.cockTextureOptions.length > 0
        ? randomFrom(f.cockTextureOptions)
        : CockTextureType.Smooth;
    return {
        wings: f.wings,
        tail: f.tail,
        ears: f.ears,
        horns: f.horns,
        cockTexture: gender === Gender.Male ? cockTexture : undefined as any,
        specialFeatures: f.specialFeatures
    } as RacePhysicalFeatures & { cockTexture?: CockTextureType };
}

// ─── APPARENT AGE ───────────────────────────────────────────

function generateApparentAge(raceProfile: RaceProfile, actualAge: number): number {
    if (raceProfile.apparentAgeRatio === 0.0) {
        // Immortal — choose any apparent age up to cap
        return Math.round(randomInRange(18, raceProfile.apparentAgeCap));
    }
    const apparent = actualAge * raceProfile.apparentAgeRatio;
    return Math.round(clamp(apparent, 18, raceProfile.apparentAgeCap));
}

// ─── BACKGROUND GENERATOR ───────────────────────────────────

function generateBackground(
    config: PopulationConfig,
    raceProfile: RaceProfile,
    traumaRate: number
): BackgroundProfile {
    const lifespan = raceProfile.lifespan === 0 ? 10000 : raceProfile.lifespan;
    const actualAge = Math.round(randomInRange(18, Math.min(lifespan, 500)));
    const apparentAge = generateApparentAge(raceProfile, actualAge);
    const traumaPresent = Math.random() < traumaRate;

    return {
        socialClass: weightedRandom(config.socialClassWeights),
        occupation: weightedRandom(config.occupationWeights),
        actualAge,
        apparentAge,
        traumaPresent,
        traumaSeverity: traumaPresent
            ? randomFrom(["MILD", "MODERATE", "SEVERE"] as const)
            : "NONE"
    };
}

// ─── HISTORY GENERATOR ──────────────────────────────────────

function generateHistory(config: PopulationConfig): ExperienceHistory {
    const isVirgin = Math.random() < config.virginRate;
    const partnerCount = isVirgin ? 0 : Math.round(randomInRange(1, 20));
    const encounterCount = isVirgin ? 0 : Math.round(randomInRange(partnerCount, partnerCount * 10));

    let relationshipHistory: RelationshipHistory;
    if (isVirgin) relationshipHistory = RelationshipHistory.Virgin;
    else if (partnerCount < 2) relationshipHistory = RelationshipHistory.Inexperienced;
    else if (partnerCount < 6) relationshipHistory = RelationshipHistory.Moderate;
    else if (partnerCount < 15) relationshipHistory = RelationshipHistory.Experienced;
    else relationshipHistory = RelationshipHistory.VeryExperienced;

    const pregnancyCount = isVirgin ? 0 : Math.random() < 0.3 ? Math.round(randomInRange(1, 4)) : 0;

    return {
        priorPartnerCount: partnerCount,
        totalEncounterCount: encounterCount,
        actsExperienced: createEmptyActFlags(),
        pregnancyHistory: pregnancyCount === 0
            ? PregnancyHistory.Never
            : pregnancyCount === 1
                ? PregnancyHistory.Once
                : PregnancyHistory.Multiple,
        pregnancyCount,
        lactationHistory: pregnancyCount > 0 && Math.random() < 0.7,
        relationshipHistory
    };
}

// ─── PERSONALITY GENERATOR ──────────────────────────────────

function generatePersonality(background: BackgroundProfile): PersonalityCore {
    const bigFiveLevels = Object.values(BigFiveLevel);

    return {
        bigFive: {
            openness: randomFrom(bigFiveLevels),
            conscientiousness: randomFrom(bigFiveLevels),
            extraversion: randomFrom(bigFiveLevels),
            agreeableness: randomFrom(bigFiveLevels),
            neuroticism: randomFrom(bigFiveLevels)
        },
        dominantTrait: randomFrom(Object.values(DominantTrait)),
        secondaryTrait: randomFrom(Object.values(DominantTrait)),
        humorStyle: randomFrom(Object.values(HumorStyle)),
        emotionalStability: randomFrom(Object.values(EmotionalStability)),
        trustBaseline: background.traumaPresent
            ? randomFrom([TrustBaseline.Suspicious, TrustBaseline.Cautious])
            : randomFrom(Object.values(TrustBaseline)),
        loyaltyLevel: randomFrom(Object.values(LoyaltyLevel)),
        jealousyTendency: randomFrom(Object.values(JealousyTendency)),
        affectionStyle: randomFrom(Object.values(AffectionStyle))
    };
}

// ─── SEXUAL PSYCHOLOGY GENERATOR ────────────────────────────

function generateSexualPsychology(
    config: PopulationConfig,
    background: BackgroundProfile,
    history: ExperienceHistory
): SexualPsychology {
    const baseResistance = background.traumaPresent
        ? Math.round(randomInRange(60, 90))
        : Math.round(randomInRange(30, 70));

    const traumaModifier = background.traumaPresent
        ? Math.round(randomInRange(10, 30))
        : 0;

    const resistanceProfile: ResistanceProfile = {
        profileType: config.defaultResistanceProfile,
        currentResistance: clamp(baseResistance + traumaModifier, 0, 100),
        baselineResistance: baseResistance,
        corruptionShiftThreshold: Math.round(randomInRange(40, 70)),
        nextProfileType: randomFrom([
            ResistanceProfileType.Freeze,
            ResistanceProfileType.Comply,
            ResistanceProfileType.Enjoy
        ]),
        traumaModifier
    };

    const baseCorruption = history.totalEncounterCount > 50 ? Math.round(randomInRange(20, 40)) :
        history.totalEncounterCount > 20 ? Math.round(randomInRange(5, 20)) : 0;

    const corruptionShame: CorruptionShameTrack = {
        corruption: baseCorruption,
        shame: Math.max(80 - baseCorruption, 20),
        corruptionRatePerEncounter: Math.round(randomInRange(2, 8)),
        shameDecayRate: Math.round(randomInRange(1, 3))
    };

    // Starting kinks based on experience
    const startingKinks = new Set<Kink>();
    if (history.totalEncounterCount > 20) {
        const kinkPool = Object.values(Kink);
        const kinkCount = Math.round(randomInRange(0, 3));
        for (let i = 0; i < kinkCount; i++) {
            startingKinks.add(randomFrom(kinkPool));
        }
    }

    return {
        sexualConfidence: history.relationshipHistory === RelationshipHistory.Virgin
            ? SexualConfidence.None
            : randomFrom(Object.values(SexualConfidence)),
        sexualLean: config.defaultSexualLean,
        acquiredKinks: startingKinks,
        kinkAcquisitionRate: randomInRange(0.05, 0.2),
        resistanceProfile,
        corruptionShame,
        vocalTendency: randomFrom(Object.values(VocalTendency)),
        eyeContactTendency: randomFrom(Object.values(EyeContactTendency)),
        dirtyTalkTendency: history.relationshipHistory === RelationshipHistory.Virgin
            ? DirtyTalkTendency.None
            : randomFrom(Object.values(DirtyTalkTendency)),
        relationshipHistory: history.relationshipHistory
    };
}

// ─── VOICE GENERATOR ────────────────────────────────────────

function generateVoice(): VoiceProfile {
    return {
        pitch: randomFrom(Object.values(VoicePitch)),
        texture: randomFrom(Object.values(VoiceTexture)),
        dirtyTalkTendency: randomFrom(Object.values(DirtyTalkTendency))
    };
}

// ─── SOCIAL PROFILE GENERATOR ───────────────────────────────

function generateSocial(personality: PersonalityCore): SocialProfile {
    return {
        trustBaseline: personality.trustBaseline,
        loyaltyLevel: personality.loyaltyLevel,
        jealousyTendency: personality.jealousyTendency,
        affectionStyle: personality.affectionStyle
    };
}

// ─── FEMALE PHYSIOLOGY GENERATOR ────────────────────────────

function generateFemaleSexualPhysiology(
    config: PopulationConfig,
    history: ExperienceHistory
): FemaleSexualPhysiology {
    const sensitivityBase = history.totalEncounterCount > 30
        ? SensitivityLevel.High
        : history.totalEncounterCount > 10
            ? SensitivityLevel.Moderate
            : SensitivityLevel.Low;

    const sensitivity: FemaleSensitivityProfile = {
        nipple: makeSensitivityTrack(
            history.totalEncounterCount > 10 ? SensitivityLevel.High : SensitivityLevel.Moderate,
            0.15
        ),
        breast: makeSensitivityTrack(sensitivityBase, 0.1),
        vagina: makeSensitivityTrack(sensitivityBase, 0.12),
        clit: makeSensitivityTrack(
            history.totalEncounterCount > 10 ? SensitivityLevel.High : SensitivityLevel.Moderate,
            0.14
        ),
        cervix: makeSensitivityTrack(SensitivityLevel.Low, 0.08),
        womb: makeSensitivityTrack(SensitivityLevel.None, 0.05),
        ass: makeSensitivityTrack(SensitivityLevel.Low, 0.1),
        lips: makeSensitivityTrack(SensitivityLevel.Moderate, 0.08),
        tongue: makeSensitivityTrack(SensitivityLevel.Moderate, 0.08),
        skin: makeSensitivityTrack(SensitivityLevel.Low, 0.07),
        ears: makeSensitivityTrack(SensitivityLevel.Low, 0.06)
    };

    const baselineWetness = config.defaultBaselineWetness;
    const wetnessTrack: WetnessTrack = {
        baseline: baselineWetness,
        current: baselineWetness,
        arousalThresholdToWet: Math.round(randomInRange(15, 35)),
        peakWetnessAtArousal: Math.round(randomInRange(70, 90))
    };

    const dominantOrgasm = randomFrom(Object.values(OrgasmType).filter(
        o => o !== OrgasmType.Multiple && o !== OrgasmType.Squirting
    ));

    const orgasmProfile: OrgasmProfile = {
        acquiredTypes: new Set([dominantOrgasm]),
        dominantType: dominantOrgasm,
        ease: randomFrom(Object.values(OrgasmEase)),
        postSensitivity: randomFrom(Object.values(PostOrgasmSensitivity)),
        squirtCapacity: history.totalEncounterCount > 30 && Math.random() < 0.2,
        multipleCapacity: history.totalEncounterCount > 20 && Math.random() < 0.3,
        orgasmCount: Math.round(history.totalEncounterCount * randomInRange(1, 3))
    };

    const cycleDay = Math.round(randomInRange(1, 28));

    return {
        vaginaType: history.totalEncounterCount > 50
            ? randomFrom([VaginaType.Average, VaginaType.Loose])
            : history.totalEncounterCount > 10
                ? randomFrom([VaginaType.Tight, VaginaType.Average])
                : VaginaType.Tight,
        vaginaElasticity: randomFrom(Object.values(VaginaElasticity)),
        wetnessTrack,
        clitSize: randomFrom(Object.values(ClitSize)),
        labiaType: randomFrom(Object.values(LabiaType)),
        sensitivity,
        orgasmProfile,
        arousalSpeed: randomFrom(Object.values(ArousalSpeed)),
        lubricationSpeed: randomFrom(Object.values(LubricationSpeed)),
        fertilityRating: config.defaultFertilityRating,
        cycleDay,
        fertile: cycleDay >= 10 && cycleDay <= 17,
        pregnancyHistory: history.pregnancyHistory,
        lactationHistory: history.lactationHistory
    };
}

// ─── MALE PHYSIOLOGY GENERATOR ──────────────────────────────

function generateMaleSexualPhysiology(): MaleSexualPhysiology {
    return {
        sensitivity: {
            cock: makeSensitivityTrack(SensitivityLevel.High, 0.05),
            balls: makeSensitivityTrack(SensitivityLevel.Moderate, 0.05),
            ass: makeSensitivityTrack(SensitivityLevel.Low, 0.08),
            nipple: makeSensitivityTrack(SensitivityLevel.Low, 0.06),
            lips: makeSensitivityTrack(SensitivityLevel.Moderate, 0.05),
            tongue: makeSensitivityTrack(SensitivityLevel.Moderate, 0.05),
            skin: makeSensitivityTrack(SensitivityLevel.Low, 0.04)
        },
        arousalSpeed: randomFrom(Object.values(ArousalSpeed))
    };
}

// ─── FEMALE MEASUREMENTS GENERATOR ─────────────────────────

function generateFemaleMeasurements(
    config: PopulationConfig,
    bodyType: FemaleBodyType,
    raceProfile: RaceProfile
): FemaleMeasurements {
    const def = FEMALE_BODY_TYPES[bodyType];
    const heightCm = generateHeight(
        config.heightDistribution.meanFemale,
        config.heightDistribution.stdDev,
        def.heightRange.minCm,
        def.heightRange.maxCm
    );
    const scale = heightCm / def.heightRange.baseCm;

    let bustCm = Math.round(randomInRange(...def.bustRange) * scale);
    let waistCm = Math.round(randomInRange(...def.waistRange) * scale);
    let hipCm = Math.round(randomInRange(...def.hipRange) * scale);

    bustCm = physicsCapBust(bustCm, heightCm);
    waistCm = clampWaist(waistCm, heightCm);
    hipCm = physicsCapHip(hipCm, heightCm);

    const minCupIndex = cupSizeToIndex(def.cupSizeRange[0]);
    const maxCupIndex = cupSizeToIndex(def.cupSizeRange[1]);
    const cupSize = cupSizeFromIndex(Math.round(randomInRange(minCupIndex, maxCupIndex)));

    const assSizes = Object.values(AssSize);
    const minAssIndex = assSizes.indexOf(def.assSizeRange[0]);
    const maxAssIndex = assSizes.indexOf(def.assSizeRange[1]);
    const assSize = assSizes[clamp(Math.round(randomInRange(minAssIndex, maxAssIndex)), 0, assSizes.length - 1)];

    const stomachType = randomFrom(def.stomachTypes);
    const stomachSoftness = randomFrom(def.stomachSoftness);
    const muscleTone = randomFrom(def.muscleToneRange);
    const bodyFatPercent = Math.round(randomInRange(...def.bodyFatRange));

    return {
        heightCm,
        heightTag: getHeightTag(heightCm, Gender.Female),
        bustCm,
        waistCm,
        hipCm,
        cupSize,
        assSize,
        stomachType,
        stomachSoftness,
        muscleTone,
        bodyFatPercent,
        effectiveBustCm: bustCm,
        effectiveWaistCm: waistCm,
        effectiveHipCm: hipCm,
        effectiveCupSize: cupSize,
        effectiveStomachType: stomachType,
        effectiveStomachSoftness: stomachSoftness
    };
}

// ─── MALE MEASUREMENTS GENERATOR ───────────────────────────

function generateMaleMeasurements(
    config: PopulationConfig,
    bodyType: MaleBodyType
): MaleMeasurements {
    const def = MALE_BODY_TYPES[bodyType];
    const heightCm = generateHeight(
        config.heightDistribution.meanMale,
        config.heightDistribution.stdDev,
        def.heightRange.minCm,
        def.heightRange.maxCm
    );
    const scale = heightCm / def.heightRange.baseCm;

    return {
        heightCm,
        heightTag: getHeightTag(heightCm, Gender.Male),
        chestCm: Math.round(randomInRange(...def.chestRange) * scale),
        waistCm: Math.round(randomInRange(...def.waistRange) * scale),
        hipCm: Math.round(randomInRange(...def.hipRange) * scale),
        shoulderWidthCm: Math.round(randomInRange(...def.shoulderWidth) * scale),
        muscleTone: randomFrom(def.muscleToneRange),
        stomachType: randomFrom(def.defaultStomachType),
        bodyFatPercent: Math.round(randomInRange(...def.bodyFatRange))
    };
}

// ─── FEMALE PHYSICAL DETAIL GENERATOR ──────────────────────

function generateFemalePhysicalDetail(config: PopulationConfig): FemalePhysicalDetail {
    return {
        breastShape: randomFrom(Object.values(BreastShape)),
        breastSoftness: randomFrom(Object.values(BreastSoftness)),
        nippleType: randomFrom(Object.values(NippleType)),
        nippleColor: randomFrom(Object.values(NippleColor)),
        assShape: randomFrom(Object.values(AssShape)),
        assSoftness: randomFrom(Object.values(AssSoftness)),
        attractiveness: weightedRandom(config.femaleAttractivenessWeights)
    };
}

// ─── MALE PHYSICAL DETAIL GENERATOR ─────────────────────────

function generateMalePhysicalDetail(
    config: PopulationConfig,
    raceFeatures: RacePhysicalFeatures
): MalePhysicalDetail {
    return {
        attractiveness: weightedRandom(config.maleAttractivenessWeights),
        cockSize: weightedRandom(config.cockSizeWeights),
        cockGirth: randomFrom(Object.values(CockGirth)),
        cockTexture: (raceFeatures as any).cockTexture ?? CockTextureType.Smooth,
        cumVolume: randomFrom(Object.values(CumVolume)),
        cumConsistency: randomFrom(Object.values(CumConsistency)),
        cumColor: randomFrom(Object.values(CumColor)),
        ballSize: randomFrom(Object.values(BallSize)),
        refractoryPeriod: randomFrom(Object.values(RefractoryPeriod))
    };
}

// ─── PREGNANCY APPLICATION ──────────────────────────────────

function applyPregnancyToMeasurements(
    measurements: FemaleMeasurements,
    stage: PregnancyStage
): FemaleMeasurements {
    const override = PREGNANCY_STAGE_OVERRIDES[stage];
    const effectiveCupIndex = clamp(
        cupSizeToIndex(measurements.cupSize) + override.cupSizeAddSteps,
        0,
        Object.values(CupSize).length - 1
    );
    return {
        ...measurements,
        effectiveBustCm: Math.round(measurements.bustCm + override.bustAddCm),
        effectiveWaistCm: Math.round(measurements.waistCm + override.waistAddCm),
        effectiveHipCm: Math.round(measurements.hipCm + override.hipAddCm),
        effectiveCupSize: cupSizeFromIndex(effectiveCupIndex),
        effectiveStomachType: stage === PregnancyStage.NotPregnant
            ? measurements.stomachType
            : override.stomachTypeOverride,
        effectiveStomachSoftness: stage === PregnancyStage.NotPregnant
            ? measurements.stomachSoftness
            : override.stomachSoftnessOverride
    };
}

// ─── MAIN SPAWN FUNCTIONS ───────────────────────────────────

export function spawnFemale(config: PopulationConfig): FemaleCharacter {
    const race = weightedRandom(config.raceWeights);
    const raceProfile = RACE_PROFILES[race];

    const bodyType = raceAwareBodyType(
        config.femaleBodyTypeWeights,
        raceProfile.femaleBodyTypeBias
    ) as FemaleBodyType;

    const raceFeatures = generateRaceFeatures(raceProfile, Gender.Female);
    const skin = generateSkin(config, raceProfile);
    const face = generateFace(Gender.Female, raceProfile);
    const hair = generateHair(config, raceProfile);
    const background = generateBackground(config, raceProfile, config.traumaRate);
    const history = generateHistory(config);
    const measurements = generateFemaleMeasurements(config, bodyType, raceProfile);
    const physicalDetail = generateFemalePhysicalDetail(config);
    const personality = generatePersonality(background);
    const sexualPsychology = generateSexualPsychology(config, background, history);
    const voice = generateVoice();
    const social = generateSocial(personality);
    const sexualPhysiology = generateFemaleSexualPhysiology(config, history);

    // Pregnancy
    const isPregnant = Math.random() < config.pregnancyRate;
    const pregnancyStageWeightsNoBase = {
        ...config.pregnancyStageWeights,
        [PregnancyStage.NotPregnant]: 0
    };
    const pregnancyStage = isPregnant
        ? weightedRandom(pregnancyStageWeightsNoBase)
        : PregnancyStage.NotPregnant;

    const finalMeasurements = applyPregnancyToMeasurements(measurements, pregnancyStage);
    const override = PREGNANCY_STAGE_OVERRIDES[pregnancyStage];

    const state = createInitialDynamicState();
    state.body.pregnancyStage = pregnancyStage;
    state.body.lactating = override.lactating;
    state.physical.lactating = override.lactating;

    return {
        gender: Gender.Female,
        race,
        raceFeatures,
        bodyType,
        skin,
        face,
        hair,
        measurements: finalMeasurements,
        physicalDetail,
        sexualPhysiology,
        personality,
        sexualPsychology,
        voice,
        social,
        background,
        history,
        state
    };
}

export function spawnMale(config: PopulationConfig): MaleCharacter {
    const race = weightedRandom(config.raceWeights);
    const raceProfile = RACE_PROFILES[race];

    const bodyType = raceAwareBodyType(
        config.maleBodyTypeWeights,
        raceProfile.maleBodyTypeBias
    ) as MaleBodyType;

    const raceFeatures = generateRaceFeatures(raceProfile, Gender.Male);
    const skin = generateSkin(config, raceProfile);
    const face = generateFace(Gender.Male, raceProfile);
    const hair = generateHair(config, raceProfile);
    const background = generateBackground(config, raceProfile, config.traumaRate);
    const history = generateHistory(config);
    const measurements = generateMaleMeasurements(config, bodyType);
    const physicalDetail = generateMalePhysicalDetail(config, raceFeatures);
    const personality = generatePersonality(background);
    const sexualPsychology = generateSexualPsychology(config, background, history);
    const voice = generateVoice();
    const social = generateSocial(personality);
    const sexualPhysiology = generateMaleSexualPhysiology();
    const state = createInitialDynamicState();

    return {
        gender: Gender.Male,
        race,
        raceFeatures,
        bodyType,
        skin,
        face,
        hair,
        measurements,
        physicalDetail,
        sexualPhysiology,
        personality,
        sexualPsychology,
        voice,
        social,
        background,
        history,
        state
    };
}

// ─── BATCH SPAWN ────────────────────────────────────────────

export function spawnPopulation(
    config: PopulationConfig,
    count: number,
    genderRatio: number = 0.5   // 0.5 = 50% female
): Character[] {
    const characters: Character[] = [];
    for (let i = 0; i < count; i++) {
        if (Math.random() < genderRatio) {
            characters.push(spawnFemale(config));
        } else {
            characters.push(spawnMale(config));
        }
    }
    return characters;
}