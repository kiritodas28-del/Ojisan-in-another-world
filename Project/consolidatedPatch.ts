// ============================================================
// FILE: consolidatedPatch.ts
// Fixes all 42 audited gaps in priority order
// ============================================================

// ============================================================
// SECTION 1: ENUM ADDITIONS
// Add these directly to enums.ts
// ============================================================

// GAP: enums.ts Gap 1 — Ruddy and Crimson skin tones
export enum SkinToneAdditions {
    Ruddy = "RUDDY",       // reddish-tan, cold climate, heavy labor — for Dwarf
    Crimson = "CRIMSON"    // deep red — for Demon race profiles
}
// Merge into SkinTone enum in enums.ts after Ebony:
// Ruddy = "RUDDY",
// Crimson = "CRIMSON",

// GAP: enums.ts Gap 2 — CockType (moved from patches.ts)
export enum CockType {
    Straight = "STRAIGHT",
    CurvedUp = "CURVED_UP",
    CurvedDown = "CURVED_DOWN",
    CurvedLeft = "CURVED_LEFT",
    CurvedRight = "CURVED_RIGHT",
    Tapered = "TAPERED",
    Flared = "FLARED",
    Uniform = "UNIFORM",
    Knotted = "KNOTTED",
    Barbed = "BARBED",
    Ridged = "RIDGED",
    Bifurcated = "BIFURCATED"
}

// GAP: enums.ts Gap 3 — RegionOfOrigin (moved from patches.ts)
export enum RegionOfOrigin {
    Heartlands = "HEARTLANDS",
    VerdantReach = "VERDANT_REACH",
    StonebackRange = "STONEBACK_RANGE",
    Ashfen = "ASHFEN",
    SunkenCoast = "SUNKEN_COAST",
    AbyssalRealm = "ABYSSAL_REALM",
    CelestialSpire = "CELESTIAL_SPIRE",
    DeepForest = "DEEP_FOREST",
    VolcanicWastes = "VOLCANIC_WASTES",
    FrozenNorth = "FROZEN_NORTH",
    DesertBadlands = "DESERT_BADLANDS",
    CoastalIslands = "COASTAL_ISLANDS"
}

// GAP: enums.ts Gap 4 — AgeBodyCategory and PetiteCategory (moved from ageBodyProfile.ts)
export enum AgeBodyCategory {
    Young = "YOUNG",
    RipeningMilf = "RIPENING_MILF",
    RipeMilf = "RIPE_MILF",
    MatureMilf = "MATURE_MILF",
    OldMilf = "OLD_MILF"
}

export enum PetiteCategory {
    Petite = "PETITE",
    NonPetite = "NON_PETITE"
}

// GAP: enums.ts Gap 5 — Personality expansion enums (moved from personalityExpansion.ts)
export enum PublicPersona {
    Caretaker = "CARETAKER",
    Authority = "AUTHORITY",
    Professional = "PROFESSIONAL",
    Socialite = "SOCIALITE",
    Wallflower = "WALLFLOWER",
    Rebel = "REBEL",
    Cheerful = "CHEERFUL",
    Stoic = "STOIC",
    Aggressive = "AGGRESSIVE",
    Meek = "MEEK",
    Proud = "PROUD",
    Flirtatious = "FLIRTATIOUS",
    Mysterious = "MYSTERIOUS",
    Innocent = "INNOCENT"
}

export enum PrivateSelf {
    Lonely = "LONELY",
    Tired = "TIRED",
    Hungry = "HUNGRY",
    Resentful = "RESENTFUL",
    Tender = "TENDER",
    Curious = "CURIOUS",
    Frightened = "FRIGHTENED",
    Proud = "PROUD",
    Ashamed = "ASHAMED",
    Desperate = "DESPERATE",
    Content = "CONTENT",
    Restless = "RESTLESS",
    Sad = "SAD",
    Playful = "PLAYFUL",
    Needful = "NEEDFUL"
}

export enum HiddenDesireLean {
    WantsToBeControlled = "WANTS_TO_BE_CONTROLLED",
    WantsToBeOverpowered = "WANTS_TO_BE_OVERPOWERED",
    WantsToObey = "WANTS_TO_OBEY",
    WantsToBePraised = "WANTS_TO_BE_PRAISED",
    WantsToBeTaken = "WANTS_TO_BE_TAKEN",
    WantsToBeUsed = "WANTS_TO_BE_USED",
    WantsToBeDegraded = "WANTS_TO_BE_DEGRADED",
    WantsToBePunished = "WANTS_TO_BE_PUNISHED",
    WantsToBeHurt = "WANTS_TO_BE_HURT",
    WantsToBeFilled = "WANTS_TO_BE_FILLED",
    WantsToBeOwned = "WANTS_TO_BE_OWNED",
    WantsToControl = "WANTS_TO_CONTROL",
    WantsToBreak = "WANTS_TO_BREAK",
    WantsToDominate = "WANTS_TO_DOMINATE",
    WantsToWatch = "WANTS_TO_WATCH",
    WantsToTeach = "WANTS_TO_TEACH",
    WantsToBeHeld = "WANTS_TO_BE_HELD",
    WantsToBeChosen = "WANTS_TO_BE_CHOSEN",
    WantsToBeNoticed = "WANTS_TO_BE_NOTICED",
    WantsToBeNeeded = "WANTS_TO_BE_NEEDED",
    WantsToBeLoved = "WANTS_TO_BE_LOVED",
    WantsToBeKeptSafe = "WANTS_TO_BE_KEPT_SAFE",
    WantsToLoseControl = "WANTS_TO_LOSE_CONTROL",
    WantsToBeShocked = "WANTS_TO_BE_SHOCKED",
    WantsToBeWatched = "WANTS_TO_BE_WATCHED",
    WantsToSurrender = "WANTS_TO_SURRENDER",
    WantsToBeFreed = "WANTS_TO_BE_FREED",
    WantsBothControlAndSurrender = "WANTS_BOTH_CONTROL_AND_SURRENDER",
    WantsConnectionThroughPain = "WANTS_CONNECTION_THROUGH_PAIN",
    WantsTrustThroughVulnerability = "WANTS_TRUST_THROUGH_VULNERABILITY"
}

export enum DesireAwareness {
    Unaware = "UNAWARE",
    Suspected = "SUSPECTED",
    PrivatelyAcknowledged = "PRIVATELY_ACKNOWLEDGED",
    Accepted = "ACCEPTED",
    OpenlyHidden = "OPENLY_HIDDEN"
}

export enum PersonaGap {
    None = "NONE",
    Slight = "SLIGHT",
    Moderate = "MODERATE",
    Large = "LARGE",
    Extreme = "EXTREME"
}

export enum TriggerSensitivity {
    Resistant = "RESISTANT",
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH",
    HairTrigger = "HAIR_TRIGGER"
}

// ============================================================
// SECTION 2: CRITICAL RUNTIME FIXES
// ============================================================

// GAP: dynamicState.ts Gap 5, patches.ts Gap 1
// Replace dynamic imports with static imports
// In patches.ts, replace:
//   state = import("./dynamicState").updateBondType(state);
// With static import at top of file and direct call:
//   import { updateBondType, updateBrokenFlag } from "./dynamicState";
//   state = updateBondType(state);
//   state = updateBrokenFlag(state);

// GAP: physicalCore.ts Gap 3 — Split RacePhysicalFeatures to remove `as any`
export interface BaseRacePhysicalFeatures {
    wings: import("./enums").WingType;
    tail: import("./enums").TailType;
    ears: import("./enums").EarType;
    horns: import("./enums").HornType;
    specialFeatures: string[];
}

export interface MaleRacePhysicalFeatures extends BaseRacePhysicalFeatures {
    cockTexture: import("./enums").CockTextureType;
    cockType: CockType;
}

export interface FemaleRacePhysicalFeatures extends BaseRacePhysicalFeatures {
    // no cock fields
}

export type RacePhysicalFeatures = MaleRacePhysicalFeatures | FemaleRacePhysicalFeatures;

// Updated generateRaceFeatures — replaces version in spawnEngine.ts
export function generateRaceFeatures(
    raceProfile: import("./raceProfiles").RaceProfile,
    gender: import("./enums").Gender
): RacePhysicalFeatures {
    const f = raceProfile.features;

    if (gender === import("./enums").Gender.Male) {
        const cockTextureOptions = f.cockTextureOptions;
        const cockTexture = cockTextureOptions.length > 0
            ? randomFrom(cockTextureOptions)
            : import("./enums").CockTextureType.Smooth;
        const cockType = deriveCockTypesFromTexture(cockTexture);
        return {
            wings: f.wings,
            tail: f.tail,
            ears: f.ears,
            horns: f.horns,
            specialFeatures: f.specialFeatures,
            cockTexture,
            cockType
        } as MaleRacePhysicalFeatures;
    }

    return {
        wings: f.wings,
        tail: f.tail,
        ears: f.ears,
        horns: f.horns,
        specialFeatures: f.specialFeatures
    } as FemaleRacePhysicalFeatures;
}

function deriveCockTypesFromTexture(texture: import("./enums").CockTextureType): CockType {
    const { CockTextureType } = require("./enums");
    switch (texture) {
        case CockTextureType.Knotted: return CockType.Knotted;
        case CockTextureType.Barbed: return CockType.Barbed;
        case CockTextureType.Ridged: return CockType.Ridged;
        case CockTextureType.Flared: return CockType.Flared;
        case CockTextureType.Tapered: return CockType.Tapered;
        default: return randomFrom([CockType.Straight, CockType.CurvedUp, CockType.Uniform]);
    }
}

// GAP: patches.ts Gap 3 — Safe SexualActFlags merge
function safeMergeActFlags(
    base: import("./historyProfile").SexualActFlags,
    partial: Partial<import("./historyProfile").SexualActFlags>
): import("./historyProfile").SexualActFlags {
    const merged = { ...base };
    for (const [key, value] of Object.entries(partial) as [keyof import("./historyProfile").SexualActFlags, any][]) {
        if (value instanceof Set) {
            merged[key] = new Set([...(base[key] as Set<any>), ...value]) as any;
        } else if (typeof value === "boolean" && value === true) {
            merged[key] = true as any;
        }
    }
    return merged;
}

// ============================================================
// SECTION 3: MISSING STRUCT FIELDS
// ============================================================

// GAP: historyProfile.ts Gap 1 — RegionOfOrigin in BackgroundProfile
// Replace BackgroundProfile in historyProfile.ts with:
export interface BackgroundProfileV2 {
    socialClass: import("./enums").SocialClass;
    occupation: import("./enums").Occupation;
    actualAge: number;
    apparentAge: number;
    traumaPresent: boolean;
    traumaSeverity: "NONE" | "MILD" | "MODERATE" | "SEVERE";
    regionOfOrigin: RegionOfOrigin;                 // ADDED
}

// GAP: historyProfile.ts Gap 2 — Missing SexualActFlags entries
export interface SexualActFlagsV2 {
    // All existing fields
    vaginalPenetration: boolean;
    vaginalCreampie: boolean;
    analPenetration: boolean;
    analCreampie: boolean;
    oralGiving: boolean;
    oralReceiving: boolean;
    deepthroat: boolean;
    breastFuck: boolean;
    nippleSuck: boolean;
    nipplePull: boolean;
    fingeringReceived: boolean;
    handjobGiven: boolean;
    orgasmTypesExperienced: Set<import("./enums").OrgasmType>;
    kinksExperienced: Set<import("./enums").Kink>;
    bondageExperienced: boolean;
    impactExperienced: boolean;
    chokingExperienced: boolean;
    edgingExperienced: boolean;
    squirtingAchieved: boolean;
    multipleOrgasmAchieved: boolean;
    facialReceived: boolean;
    cumSwallowed: boolean;
    creampieReceived: boolean;
    toyUsed: boolean;
    vibratorUsed: boolean;
    // ADDED
    breastSwing: boolean;
    cumOnBody: boolean;
    cumOnBreast: boolean;
    restraintsApplied: boolean;
}

export function createEmptyActFlagsV2(): SexualActFlagsV2 {
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
        vibratorUsed: false,
        breastSwing: false,
        cumOnBody: false,
        cumOnBreast: false,
        restraintsApplied: false
    };
}

// GAP: physicalCore.ts Gap 1 — CockType in MalePhysicalDetail
export interface MalePhysicalDetailV2 {
    attractiveness: import("./enums").MaleAttractiveness;
    cockSize: import("./enums").CockSize;
    cockGirth: import("./enums").CockGirth;
    cockTexture: import("./enums").CockTextureType;
    cockType: CockType;                             // ADDED
    cumVolume: import("./enums").CumVolume;
    cumConsistency: import("./enums").CumConsistency;
    cumColor: import("./enums").CumColor;
    ballSize: import("./enums").BallSize;
    refractoryPeriod: import("./enums").RefractoryPeriod;
}

// GAP: dynamicState.ts Gaps 1-4 — Missing trackers in CharacterDynamicState
import { PleasureTrack, createPleasureTrack } from "./patches";
import { SubspaceTracker, createSubspaceTracker, AfterglowTracker, createAfterglowTracker } from "./patches";
import { SuppressionState } from "./personalityExpansion";

export interface PhysicalStateV2 {
    arousalLevel: number;
    currentWetness: import("./enums").WetnessLevel;
    painLevel: number;
    pleasureTrack: PleasureTrack;                   // ADDED — replaces plain pleasureLevel
    stamina: import("./dynamicState").StaminaTrack;
    lactating: boolean;
    clothingState: "FULLY_CLOTHED" | "PARTIALLY_CLOTHED" | "EXPOSED" | "NAKED";
    restraintState: number;
}

export interface MentalStateV2 {
    currentMood: import("./enums").MoodValue;
    corruptionCurrent: number;
    shameCurrent: number;
    brokenFlag: boolean;
    subspaceTracker: SubspaceTracker;               // ADDED — replaces plain subspaceFlag
    afterglowTracker: AfterglowTracker;             // ADDED — replaces plain afterglowFlag
    suppressionState: SuppressionState;             // ADDED
    trustWithPlayer: number;
    attachmentWithPlayer: number;
    submissionToPlayer: number;
}

export interface CharacterDynamicStateV2 {
    physical: PhysicalStateV2;
    mental: MentalStateV2;
    relationship: import("./dynamicState").RelationshipState;
    body: import("./dynamicState").PregnancyBodyState;
}

export function createInitialDynamicStateV2(
    wetnessBaseline: import("./enums").WetnessLevel
): CharacterDynamicStateV2 {
    return {
        physical: {
            arousalLevel: 0,
            currentWetness: wetnessBaseline,            // FIXED — was hardcoded Dry
            painLevel: 0,
            pleasureTrack: createPleasureTrack(),       // FIXED — was plain number
            stamina: {                                   // placeholder — overwritten by createStaminaFromHistory
                current: 100,
                max: 100,
                recoveryRate: 20,
                depletionRate: 10
            },
            lactating: false,
            clothingState: "FULLY_CLOTHED",
            restraintState: 0
        },
        mental: {
            currentMood: import("./enums").MoodValue.Defiant,
            corruptionCurrent: 0,
            shameCurrent: 80,
            brokenFlag: false,
            subspaceTracker: createSubspaceTracker(),   // FIXED — was plain boolean
            afterglowTracker: createAfterglowTracker(), // FIXED — was plain boolean
            suppressionState: {                         // FIXED — was missing
                cracked: false,
                crackLevel: 0,
                crackTrigger: null
            },
            trustWithPlayer: 10,
            attachmentWithPlayer: 0,
            submissionToPlayer: 0
        },
        relationship: {
            encounterCountWithPlayer: 0,
            actsPerformedWithPlayer: createEmptyActFlagsV2() as any,
            bondType: import("./enums").BondType.None,
            bondStrength: 0
        },
        body: {
            pregnancyStage: import("./enums").PregnancyStage.NotPregnant,
            pregnancyWeek: 0,
            lactating: false,
            postpartum: false,
            postpartumWeek: 0
        }
    };
}

// ============================================================
// SECTION 4: RACE PROFILE FIXES
// ============================================================

// GAP: raceProfiles.ts Gap 3 — defaultRegions on RaceProfile
// GAP: raceProfiles.ts Gap 4 — minActualAgeAtSpawn per race
export interface RaceProfileV2 extends import("./raceProfiles").RaceProfile {
    defaultRegions: RegionOfOrigin[];
    minActualAgeAtSpawn: number;
}

export const RACE_PROFILE_EXTENSIONS: Record<import("./enums").Race, {
    defaultRegions: RegionOfOrigin[];
    minActualAgeAtSpawn: number;
}> = {
    [import("./enums").Race.Human]: { defaultRegions: [RegionOfOrigin.Heartlands, RegionOfOrigin.SunkenCoast, RegionOfOrigin.StonebackRange], minActualAgeAtSpawn: 18 },
    [import("./enums").Race.Elf]: { defaultRegions: [RegionOfOrigin.VerdantReach, RegionOfOrigin.DeepForest], minActualAgeAtSpawn: 80 },
    [import("./enums").Race.HighElf]: { defaultRegions: [RegionOfOrigin.VerdantReach, RegionOfOrigin.CelestialSpire], minActualAgeAtSpawn: 200 },
    [import("./enums").Race.DarkElf]: { defaultRegions: [RegionOfOrigin.Ashfen, RegionOfOrigin.VolcanicWastes], minActualAgeAtSpawn: 80 },
    [import("./enums").Race.Dwarf]: { defaultRegions: [RegionOfOrigin.StonebackRange], minActualAgeAtSpawn: 30 },
    [import("./enums").Race.Fairy]: { defaultRegions: [RegionOfOrigin.VerdantReach, RegionOfOrigin.DeepForest], minActualAgeAtSpawn: 20 },
    [import("./enums").Race.Orc]: { defaultRegions: [RegionOfOrigin.StonebackRange, RegionOfOrigin.Ashfen], minActualAgeAtSpawn: 18 },
    [import("./enums").Race.Goblin]: { defaultRegions: [RegionOfOrigin.Ashfen, RegionOfOrigin.VolcanicWastes], minActualAgeAtSpawn: 12 },
    [import("./enums").Race.Demon]: { defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 100 },
    [import("./enums").Race.DevilGirl]: { defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 100 },
    [import("./enums").Race.DevilBoy]: { defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 100 },
    [import("./enums").Race.Succubus]: { defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 200 },
    [import("./enums").Race.Incubus]: { defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 200 },
    [import("./enums").Race.FoxGirl]: { defaultRegions: [RegionOfOrigin.DeepForest, RegionOfOrigin.VerdantReach], minActualAgeAtSpawn: 30 },
    [import("./enums").Race.FoxBoy]: { defaultRegions: [RegionOfOrigin.DeepForest, RegionOfOrigin.VerdantReach], minActualAgeAtSpawn: 30 },
    [import("./enums").Race.WolfGirl]: { defaultRegions: [RegionOfOrigin.StonebackRange, RegionOfOrigin.FrozenNorth], minActualAgeAtSpawn: 20 },
    [import("./enums").Race.WolfBoy]: { defaultRegions: [RegionOfOrigin.StonebackRange, RegionOfOrigin.FrozenNorth], minActualAgeAtSpawn: 20 },
    [import("./enums").Race.CowGirl]: { defaultRegions: [RegionOfOrigin.Heartlands], minActualAgeAtSpawn: 18 },
    [import("./enums").Race.CowBoy]: { defaultRegions: [RegionOfOrigin.Heartlands], minActualAgeAtSpawn: 18 },
    [import("./enums").Race.DragonGirl]: { defaultRegions: [RegionOfOrigin.VolcanicWastes, RegionOfOrigin.StonebackRange], minActualAgeAtSpawn: 500 },
    [import("./enums").Race.DragonBoy]: { defaultRegions: [RegionOfOrigin.VolcanicWastes, RegionOfOrigin.StonebackRange], minActualAgeAtSpawn: 500 },
    [import("./enums").Race.Goddess]: { defaultRegions: [RegionOfOrigin.CelestialSpire], minActualAgeAtSpawn: 1000 },
    [import("./enums").Race.God]: { defaultRegions: [RegionOfOrigin.CelestialSpire], minActualAgeAtSpawn: 1000 },
    [import("./enums").Race.Mixed]: { defaultRegions: Object.values(RegionOfOrigin), minActualAgeAtSpawn: 18 }
};

// ============================================================
// SECTION 5: POPULATION CONFIG ADDITIONS
// ============================================================

// GAP: populationConfig.ts Gap 1 — regionWeights
// GAP: populationConfig.ts Gap 2 — ageCategoryWeights
export interface PopulationConfigV2 extends import("./populationConfig").PopulationConfig {
    regionWeights: Record<RegionOfOrigin, number>;
    ageCategoryWeights: Record<AgeBodyCategory, number>;
}

export const STANDARD_REGION_WEIGHTS: Record<RegionOfOrigin, number> = {
    [RegionOfOrigin.Heartlands]: 8,
    [RegionOfOrigin.VerdantReach]: 5,
    [RegionOfOrigin.StonebackRange]: 4,
    [RegionOfOrigin.Ashfen]: 3,
    [RegionOfOrigin.SunkenCoast]: 5,
    [RegionOfOrigin.AbyssalRealm]: 1,
    [RegionOfOrigin.CelestialSpire]: 0,
    [RegionOfOrigin.DeepForest]: 3,
    [RegionOfOrigin.VolcanicWastes]: 2,
    [RegionOfOrigin.FrozenNorth]: 2,
    [RegionOfOrigin.DesertBadlands]: 2,
    [RegionOfOrigin.CoastalIslands]: 3
};

export const STANDARD_AGE_CATEGORY_WEIGHTS: Record<AgeBodyCategory, number> = {
    [AgeBodyCategory.Young]: 8,
    [AgeBodyCategory.RipeningMilf]: 5,
    [AgeBodyCategory.RipeMilf]: 4,
    [AgeBodyCategory.MatureMilf]: 3,
    [AgeBodyCategory.OldMilf]: 1
};

export const FANTASY_HEAVY_AGE_WEIGHTS: Record<AgeBodyCategory, number> = {
    [AgeBodyCategory.Young]: 6,
    [AgeBodyCategory.RipeningMilf]: 6,
    [AgeBodyCategory.RipeMilf]: 5,
    [AgeBodyCategory.MatureMilf]: 4,
    [AgeBodyCategory.OldMilf]: 2
};

// ============================================================
// SECTION 6: RACE ATTRACTIVENESS BIAS
// ============================================================

// GAP: attractivenessPatch.ts Gap 1 — Race attractiveness bias
import { FemaleAttractiveness, Race } from "./enums";

export const RACE_ATTRACTIVENESS_BIAS: Partial<Record<Race, Partial<Record<FemaleAttractiveness, number>>>> = {
    [Race.Goddess]: {
        [FemaleAttractiveness.Transcendent]: 30,
        [FemaleAttractiveness.Breathtaking]: 15,
        [FemaleAttractiveness.Stunning]: 8,
        [FemaleAttractiveness.Beautiful]: 4
    },
    [Race.Succubus]: {
        [FemaleAttractiveness.Transcendent]: 8,
        [FemaleAttractiveness.Breathtaking]: 10,
        [FemaleAttractiveness.Stunning]: 10,
        [FemaleAttractiveness.Exotic]: 8,
        [FemaleAttractiveness.Beautiful]: 5
    },
    [Race.HighElf]: {
        [FemaleAttractiveness.Breathtaking]: 6,
        [FemaleAttractiveness.Stunning]: 8,
        [FemaleAttractiveness.Beautiful]: 8,
        [FemaleAttractiveness.Exotic]: 5
    },
    [Race.Elf]: {
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Stunning]: 4,
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Exotic]: 3
    },
    [Race.DarkElf]: {
        [FemaleAttractiveness.Exotic]: 10,
        [FemaleAttractiveness.Stunning]: 6,
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Breathtaking]: 3
    },
    [Race.FoxGirl]: {
        [FemaleAttractiveness.Cute]: 6,
        [FemaleAttractiveness.Pretty]: 6,
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Exotic]: 5,
        [FemaleAttractiveness.Stunning]: 3
    },
    [Race.DragonGirl]: {
        [FemaleAttractiveness.Exotic]: 10,
        [FemaleAttractiveness.Stunning]: 6,
        [FemaleAttractiveness.Breathtaking]: 5,
        [FemaleAttractiveness.Beautiful]: 4
    },
    [Race.CowGirl]: {
        [FemaleAttractiveness.CutePlain]: 4,
        [FemaleAttractiveness.Cute]: 4,
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Plain]: 3,
        [FemaleAttractiveness.Exotic]: 3
    },
    [Race.Goblin]: {
        [FemaleAttractiveness.Plain]: 6,
        [FemaleAttractiveness.Homely]: 5,
        [FemaleAttractiveness.CutePlain]: 4,
        [FemaleAttractiveness.Cute]: 3,
        [FemaleAttractiveness.Exotic]: 3
    },
    [Race.Orc]: {
        [FemaleAttractiveness.Plain]: 4,
        [FemaleAttractiveness.CutePlain]: 3,
        [FemaleAttractiveness.Exotic]: 8,
        [FemaleAttractiveness.Pretty]: 2,
        [FemaleAttractiveness.Homely]: 2
    },
    [Race.DevilGirl]: {
        [FemaleAttractiveness.Exotic]: 8,
        [FemaleAttractiveness.Stunning]: 6,
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Breathtaking]: 3
    },
    [Race.Demon]: {
        [FemaleAttractiveness.Exotic]: 7,
        [FemaleAttractiveness.Stunning]: 5,
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Plain]: 2
    },
    [Race.Fairy]: {
        [FemaleAttractiveness.Cute]: 8,
        [FemaleAttractiveness.Pretty]: 6,
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Exotic]: 4
    },
    [Race.WolfGirl]: {
        [FemaleAttractiveness.Exotic]: 6,
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.CutePlain]: 3
    }
};

// Updated rollAttractivenessWithBias — replaces version in attractivenessPatch.ts
export function rollAttractivenessWithBiasV2(
    baseWeights: Record<FemaleAttractiveness, number>,
    bodyType: import("./enums").FemaleBodyType,
    ageCategory: AgeBodyCategory,
    race: Race
): FemaleAttractiveness {
    const { BODY_TYPE_ATTRACTIVENESS_BIAS, AGE_ATTRACTIVENESS_BIAS } = require("./attractivenessPatch");
    const combined = { ...baseWeights };

    // Apply body type bias
    const bodyBias = BODY_TYPE_ATTRACTIVENESS_BIAS[bodyType] ?? {};
    for (const [attr, add] of Object.entries(bodyBias) as [FemaleAttractiveness, number][]) {
        combined[attr] = (combined[attr] || 0) + add;
    }

    // Apply age bias
    const ageBias = AGE_ATTRACTIVENESS_BIAS[ageCategory] ?? {};
    for (const [attr, add] of Object.entries(ageBias) as [FemaleAttractiveness, number][]) {
        combined[attr] = (combined[attr] || 0) + add;
    }

    // Apply race bias — ADDED
    const raceBias = RACE_ATTRACTIVENESS_BIAS[race] ?? {};
    for (const [attr, add] of Object.entries(raceBias) as [FemaleAttractiveness, number][]) {
        combined[attr] = (combined[attr] || 0) + add;
    }

    const entries = Object.entries(combined) as [FemaleAttractiveness, number][];
    const filtered = entries.filter(([, w]) => w > 0);
    const total = filtered.reduce((sum, [, w]) => sum + w, 0);
    let roll = Math.random() * total;
    for (const [key, weight] of filtered) {
        roll -= weight;
        if (roll <= 0) return key;
    }
    return filtered[filtered.length - 1][0];
}

// ============================================================
// SECTION 7: RACE PERSONA BIAS
// ============================================================

// GAP: personalityExpansion.ts Gap 1 — Race bias for personality generation
export const RACE_PERSONA_BIAS: Partial<Record<Race, {
    publicPersonaBias: Partial<Record<PublicPersona, number>>;
    hiddenDesireBias: Partial<Record<HiddenDesireLean, number>>;
    privateSelfBias: Partial<Record<PrivateSelf, number>>;
}>> = {
    [Race.Succubus]: {
        publicPersonaBias: {
            [PublicPersona.Flirtatious]: 8,
            [PublicPersona.Mysterious]: 6,
            [PublicPersona.Aggressive]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToControl]: 6,
            [HiddenDesireLean.WantsToBreak]: 5,
            [HiddenDesireLean.WantsBothControlAndSurrender]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Hungry]: 6,
            [PrivateSelf.Restless]: 4
        }
    },
    [Race.Goddess]: {
        publicPersonaBias: {
            [PublicPersona.Authority]: 8,
            [PublicPersona.Stoic]: 5,
            [PublicPersona.Mysterious]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeChosen]: 6,
            [HiddenDesireLean.WantsTrustThroughVulnerability]: 5,
            [HiddenDesireLean.WantsToSurrender]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Lonely]: 6,
            [PrivateSelf.Tired]: 4
        }
    },
    [Race.Demon]: {
        publicPersonaBias: {
            [PublicPersona.Aggressive]: 6,
            [PublicPersona.Authority]: 5,
            [PublicPersona.Proud]: 5
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToDominate]: 6,
            [HiddenDesireLean.WantsToBreak]: 5
        },
        privateSelfBias: {
            [PrivateSelf.Resentful]: 5,
            [PrivateSelf.Lonely]: 4
        }
    },
    [Race.Goblin]: {
        publicPersonaBias: {
            [PublicPersona.Rebel]: 6,
            [PublicPersona.Cheerful]: 5
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeNoticed]: 6,
            [HiddenDesireLean.WantsToBePraised]: 5
        },
        privateSelfBias: {
            [PrivateSelf.Restless]: 5,
            [PrivateSelf.Curious]: 4
        }
    },
    [Race.Orc]: {
        publicPersonaBias: {
            [PublicPersona.Aggressive]: 7,
            [PublicPersona.Stoic]: 5
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeOverpowered]: 5,
            [HiddenDesireLean.WantsToSurrender]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Tender]: 5,
            [PrivateSelf.Lonely]: 4
        }
    },
    [Race.FoxGirl]: {
        publicPersonaBias: {
            [PublicPersona.Flirtatious]: 6,
            [PublicPersona.Mysterious]: 5,
            [PublicPersona.Cheerful]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToWatch]: 5,
            [HiddenDesireLean.WantsToBeChosen]: 5,
            [HiddenDesireLean.WantsToControl]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Playful]: 6,
            [PrivateSelf.Curious]: 5
        }
    },
    [Race.CowGirl]: {
        publicPersonaBias: {
            [PublicPersona.Caretaker]: 7,
            [PublicPersona.Cheerful]: 5,
            [PublicPersona.Meek]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeFilled]: 6,
            [HiddenDesireLean.WantsToBeNeeded]: 6,
            [HiddenDesireLean.WantsToBeHeld]: 5
        },
        privateSelfBias: {
            [PrivateSelf.Tender]: 6,
            [PrivateSelf.Needful]: 5
        }
    },
    [Race.Fairy]: {
        publicPersonaBias: {
            [PublicPersona.Cheerful]: 7,
            [PublicPersona.Innocent]: 5,
            [PublicPersona.Flirtatious]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeShocked]: 5,
            [HiddenDesireLean.WantsToLoseControl]: 5,
            [HiddenDesireLean.WantsToBeWatched]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Playful]: 6,
            [PrivateSelf.Curious]: 5
        }
    }
};

// ============================================================
// SECTION 8: PERSONA GAP MECHANICAL EFFECT
// ============================================================

// GAP: personalityExpansion.ts Gap 2 — PersonaGap mechanical effect
export function getPersonaGapMultiplier(gap: PersonaGap): number {
    switch (gap) {
        case PersonaGap.None: return 1.0;
        case PersonaGap.Slight: return 1.3;
        case PersonaGap.Moderate: return 1.6;
        case PersonaGap.Large: return 2.0;
        case PersonaGap.Extreme: return 2.8;
    }
}

// When suppression cracks, gap multiplier amplifies the arousal/corruption response
export function applyGapMultiplierToEncounter(
    arousalGain: number,
    corruptionGain: number,
    gap: PersonaGap,
    suppressionCrackLevel: number   // 0-100
): { arousalGain: number; corruptionGain: number } {
    // Gap multiplier only kicks in as suppression cracks
    const crackFactor = suppressionCrackLevel / 100;
    const gapMult = 1 + (getPersonaGapMultiplier(gap) - 1) * crackFactor;
    return {
        arousalGain: arousalGain * gapMult,
        corruptionGain: corruptionGain * gapMult
    };
}

// ============================================================
// SECTION 9: MALE SENSITIVITY UPDATE
// ============================================================

// GAP: sexualPhysiology.ts Gap 2 — Male sensitivity never updated
import { MaleSexualPhysiology, tryIncreaseSensitivity } from "./sexualPhysiology";

export function updateMaleSensitivityFromEncounter(
    physiology: MaleSexualPhysiology,
    actsPerformed: Partial<SexualActFlagsV2>
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

// ============================================================
// SECTION 10: FEMALE SENSITIVITY UPDATE IN ENCOUNTER LOOP
// ============================================================

// GAP: patches.ts Gap 2 — Sensitivity never updated in encounter loop
import { FemaleSexualPhysiology } from "./sexualPhysiology";

export function updateFemaleSensitivityFromActs(
    physiology: FemaleSexualPhysiology,
    actsPerformed: Partial<SexualActFlagsV2>
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

// ============================================================
// SECTION 11: AGEPROFILE PETITE THRESHOLD FIX
// ============================================================

// GAP: ageBodyProfile.ts Gap 2 — Petite threshold inconsistency
// Replace all uses of `heightCm <= 162` with:
export function isPetiteByHeightTag(heightTag: import("./enums").HeightTag): boolean {
    return (
        heightTag === import("./enums").HeightTag.VeryShort ||
        heightTag === import("./enums").HeightTag.Short
    );
    // VeryShort = <150cm female
    // Short = 150-158cm female
    // Consistent with HeightTag definition
}

// ============================================================
// SECTION 12: PREGNANCY + AGE ORDERING FIX
// ============================================================

// GAP: ageBodyProfile.ts Gap 1 — Pregnancy overwrites age modifiers
// Correct application order:
// 1. Base measurements from body type
// 2. Age modifiers applied to base → ageAdjustedBase
// 3. Pregnancy applied on top of ageAdjustedBase → finalEffective

import { AgeAppliedMeasurements, applyAgeMod } from "./ageBodyProfile";
import { PREGNANCY_STAGE_OVERRIDES } from "./bodyTypes";
import { FemaleMeasurements } from "./physicalCore";
import { PregnancyStage } from "./enums";

function clamp(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
}

function cupSizeToIndex(cup: import("./enums").CupSize): number {
    return Object.values(import("./enums").CupSize).indexOf(cup);
}

function cupSizeFromIndex(index: number): import("./enums").CupSize {
    const cups = Object.values(import("./enums").CupSize);
    return cups[clamp(index, 0, cups.length - 1)];
}

export function applyAgeAndPregnancyInOrder(
    baseMeasurements: FemaleMeasurements,
    breastSoftness: import("./enums").BreastSoftness,
    assSoftness: import("./enums").AssSoftness,
    apparentAge: number,
    pregnancyStage: PregnancyStage
): AgeAppliedMeasurements & { finalMeasurements: FemaleMeasurements } {
    // Step 1: Apply age modifiers to base
    const ageApplied = applyAgeMod(baseMeasurements, breastSoftness, assSoftness, apparentAge);

    // Step 2: Apply pregnancy on top of age-adjusted measurements
    if (pregnancyStage === PregnancyStage.NotPregnant) {
        return { ...ageApplied, finalMeasurements: ageApplied.measurements };
    }

    const override = PREGNANCY_STAGE_OVERRIDES[pregnancyStage];
    const ageMeasurements = ageApplied.measurements;

    const effectiveCupIndex = clamp(
        cupSizeToIndex(ageMeasurements.cupSize) + override.cupSizeAddSteps,
        0,
        Object.values(import("./enums").CupSize).length - 1
    );

    const finalMeasurements: FemaleMeasurements = {
        ...ageMeasurements,
        effectiveBustCm: Math.round(ageMeasurements.bustCm + override.bustAddCm),
        effectiveWaistCm: Math.round(ageMeasurements.waistCm + override.waistAddCm),
        effectiveHipCm: Math.round(ageMeasurements.hipCm + override.hipAddCm),
        effectiveCupSize: cupSizeFromIndex(effectiveCupIndex),
        effectiveStomachType: override.stomachTypeOverride,
        effectiveStomachSoftness: override.stomachSoftnessOverride
    };

    return { ...ageApplied, finalMeasurements };
}

// ============================================================
// SECTION 13: UPDATED GENERATEBACKGROUND WITH REGION
// ============================================================

// GAP: spawnEngine.ts Gap 6 — RegionOfOrigin never generated
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

export function generateBackgroundV2(
    config: PopulationConfigV2,
    raceProfile: import("./raceProfiles").RaceProfile,
    traumaRate: number,
    race: import("./enums").Race
): BackgroundProfileV2 {
    const extension = RACE_PROFILE_EXTENSIONS[race];
    const lifespan = raceProfile.lifespan === 0 ? 10000 : raceProfile.lifespan;
    const minAge = extension.minActualAgeAtSpawn;
    const actualAge = Math.round(randomInRange(minAge, Math.min(lifespan, 500)));
    const apparentAge = generateApparentAgeV2(raceProfile, actualAge);
    const traumaPresent = Math.random() < traumaRate;

    // Region — prefer race default regions, weight by config if available
    const raceRegions = extension.defaultRegions;
    const regionWeights: Partial<Record<RegionOfOrigin, number>> = {};
    for (const region of raceRegions) {
        regionWeights[region] = (config.regionWeights[region] || 1) + 5;
    }
    for (const [region, weight] of Object.entries(config.regionWeights) as [RegionOfOrigin, number][]) {
        if (!regionWeights[region]) regionWeights[region] = weight * 0.3;
    }
    const regionOfOrigin = weightedRandom(regionWeights as Record<RegionOfOrigin, number>);

    return {
        socialClass: weightedRandom(config.socialClassWeights),
        occupation: weightedRandom(config.occupationWeights),
        actualAge,
        apparentAge,
        traumaPresent,
        traumaSeverity: traumaPresent
            ? randomFrom(["MILD", "MODERATE", "SEVERE"] as const)
            : "NONE",
        regionOfOrigin
    };
}

function generateApparentAgeV2(raceProfile: import("./raceProfiles").RaceProfile, actualAge: number): number {
    if (raceProfile.apparentAgeRatio === 0.0) {
        return Math.round(randomInRange(18, raceProfile.apparentAgeCap));
    }
    const apparent = actualAge * raceProfile.apparentAgeRatio;
    return Math.round(clamp(apparent, 18, raceProfile.apparentAgeCap));
}

// ============================================================
// SECTION 14: UPDATED PERSONALITY GENERATION WITH RACE BIAS
// ============================================================

// GAP: personalityExpansion.ts Gap 1 — Race bias for personality
import {
    ExpandedPersonalityCore, SuppressionState,
    checkSuppressionCrack
} from "./personalityExpansion";

export function generateExpandedPersonalityV2(
    base: import("./psychologyCore").PersonalityCore,
    background: BackgroundProfileV2,
    history: import("./historyProfile").ExperienceHistory,
    race: import("./enums").Race
): ExpandedPersonalityCore {
    const raceBias = RACE_PERSONA_BIAS[race];

    // Public persona — apply race bias
    const personaWeights: Partial<Record<PublicPersona, number>> = {};
    for (const p of Object.values(PublicPersona)) personaWeights[p] = 1;
    if (raceBias?.publicPersonaBias) {
        for (const [p, w] of Object.entries(raceBias.publicPersonaBias) as [PublicPersona, number][]) {
            personaWeights[p] = (personaWeights[p] || 0) + w;
        }
    }
    const publicPersona = weightedRandom(personaWeights as Record<PublicPersona, number>);

    // Private self — apply race bias
    const selfWeights: Partial<Record<PrivateSelf, number>> = {};
    for (const s of Object.values(PrivateSelf)) selfWeights[s] = 1;
    if (raceBias?.privateSelfBias) {
        for (const [s, w] of Object.entries(raceBias.privateSelfBias) as [PrivateSelf, number][]) {
            selfWeights[s] = (selfWeights[s] || 0) + w;
        }
    }
    const privateSelf = weightedRandom(selfWeights as Record<PrivateSelf, number>);

    // Hidden desire — apply race bias
    const desireWeights: Partial<Record<HiddenDesireLean, number>> = {};
    for (const d of Object.values(HiddenDesireLean)) desireWeights[d] = 1;
    if (raceBias?.hiddenDesireBias) {
        for (const [d, w] of Object.entries(raceBias.hiddenDesireBias) as [HiddenDesireLean, number][]) {
            desireWeights[d] = (desireWeights[d] || 0) + w;
        }
    }
    const hiddenDesireLean = weightedRandom(desireWeights as Record<HiddenDesireLean, number>);

    const secondaryHiddenDesire = Math.random() < 0.6
        ? randomFrom(Object.values(HiddenDesireLean).filter(d => d !== hiddenDesireLean))
        : null;

    const gapValues = Object.values(PersonaGap);
    const gapBias = background.traumaPresent ? gapValues.slice(2) : gapValues;
    const personaGap = randomFrom(gapBias);

    const awarenessValues = Object.values(DesireAwareness);
    const experiencedAwareness = history.totalEncounterCount > 30
        ? awarenessValues.slice(2)
        : history.totalEncounterCount > 10
            ? awarenessValues.slice(1)
            : awarenessValues.slice(0, 3);
    const desireAwareness = randomFrom(experiencedAwareness);

    const suppressionStrength = Math.round(randomInRange(
        background.traumaPresent ? 50 : 20,
        background.traumaPresent ? 95 : 80
    ));

    const triggerSensitivity = suppressionStrength > 70
        ? randomFrom([TriggerSensitivity.Resistant, TriggerSensitivity.Low])
        : suppressionStrength > 50
            ? randomFrom([TriggerSensitivity.Low, TriggerSensitivity.Moderate])
            : suppressionStrength > 30
                ? randomFrom([TriggerSensitivity.Moderate, TriggerSensitivity.High])
                : randomFrom([TriggerSensitivity.High, TriggerSensitivity.HairTrigger]);

    const suppressionCrackThreshold = Math.max(10, Math.min(
        Math.round(suppressionStrength * 0.6 + randomInRange(-10, 10)),
        90
    ));

    return {
        ...base,
        publicPersona,
        privateSelf,
        hiddenDesireLean,
        secondaryHiddenDesire,
        personaGap,
        desireAwareness,
        triggerSensitivity,
        suppressionStrength,
        suppressionCrackThreshold
    };
}

// ============================================================
// SECTION 15: ARCHETYPE SPAWN CONVENIENCE FUNCTION
// ============================================================

// GAP: personalityExpansion.ts Gap 3
import { ARCHETYPE_EXAMPLES } from "./personalityExpansion";
import { spawnFemale, spawnMale, Character } from "./spawnEngine";

export function spawnFromArchetype(
    archetypeName: keyof typeof ARCHETYPE_EXAMPLES,
    config: PopulationConfigV2
): Character {
    // Spawn a female character then override personality with archetype
    const character = spawnFemale(config as any);
    const archetype = ARCHETYPE_EXAMPLES[archetypeName];

    return {
        ...character,
        personality: {
            ...character.personality,
            publicPersona: archetype.publicPersona,
            privateSelf: archetype.privateSelf,
            hiddenDesireLean: archetype.hiddenDesireLean,
            secondaryHiddenDesire: archetype.secondaryHiddenDesire,
            personaGap: archetype.personaGap,
            desireAwareness: archetype.desireAwareness,
            triggerSensitivity: archetype.triggerSensitivity,
            suppressionStrength: archetype.suppressionStrength,
            suppressionCrackThreshold: archetype.suppressionCrackThreshold
        }
    };
}

// ============================================================
// SECTION 16: COMPLETE UPDATED SPAWNFEMALE
// ============================================================

// GAP: spawnEngine.ts Gaps 1-7 — All spawn pipeline fixes consolidated
import { RACE_PROFILES } from "./raceProfiles";
import { FEMALE_BODY_TYPES } from "./bodyTypes";
import { getHeightTag } from "./physicalCore";
import { selectBodyTypeWithAgeBias, getAgeBodyCategory } from "./ageBodyProfile";
import { createStaminaFromHistory } from "./patches";

export function spawnFemaleV2(config: PopulationConfigV2): import("./spawnEngine").FemaleCharacter {
    const { Gender, Race, PregnancyStage } = require("./enums");

    // 1. Race
    const race = weightedRandom(config.raceWeights);
    const raceProfile = RACE_PROFILES[race];

    // 2. Height first — needed for petite determination before body type
    //    Use race height range if available, else config mean
    const heightCm = Math.round(clamp(
        generateHeightNormal(
            config.heightDistribution.meanFemale,
            config.heightDistribution.stdDev
        ),
        145,
        188
    ));
    const heightTag = getHeightTag(heightCm, Gender.Female);

    // 3. Background — needed for apparentAge before body type
    const background = generateBackgroundV2(config, raceProfile, config.traumaRate, race);

    // 4. Body type — now uses height and apparentAge for petite + age bias
    const bodyType = selectBodyTypeWithAgeBias(
        config.femaleBodyTypeWeights,
        raceProfile.femaleBodyTypeBias,
        background.apparentAge,
        heightCm
    );

    // 5. History
    const history = generateHistoryV2(config);

    // 6. Base measurements — pass height in so it is not regenerated
    const baseMeasurements = generateFemaleMeasurementsWithHeight(config, bodyType, raceProfile, heightCm, heightTag);

    // 7. Physical detail (without attractiveness — needs body type + age)
    const rawPhysicalDetail = generateFemalePhysicalDetailWithoutAttractiveness();

    // 8. Attractiveness — now race + body + age aware
    const ageCategory = getAgeBodyCategory(background.apparentAge);
    const attractiveness = rollAttractivenessWithBiasV2(
        config.femaleAttractivenessWeights,
        bodyType,
        ageCategory,
        race
    );

    const physicalDetail = { ...rawPhysicalDetail, attractiveness };

    // 9. Age modifiers + pregnancy in correct order
    const pregnancyStageWeightsNoBase = {
        ...config.pregnancyStageWeights,
        [PregnancyStage.NotPregnant]: 0
    };
    const isPregnant = Math.random() < config.pregnancyRate;
    const pregnancyStage = isPregnant
        ? weightedRandom(pregnancyStageWeightsNoBase)
        : PregnancyStage.NotPregnant;

    const ageAndPregnancyResult = applyAgeAndPregnancyInOrder(
        baseMeasurements,
        physicalDetail.breastSoftness,
        physicalDetail.assSoftness,
        background.apparentAge,
        pregnancyStage
    );

    // 10. Sexual physiology
    const sexualPhysiology = generateFemaleSexualPhysiologyV2(config, history);

    // 11. Personality — expanded, race-biased
    const basePersonality = generateBasePersonality(background);
    const personality = generateExpandedPersonalityV2(basePersonality, background, history, race);

    // 12. Sexual psychology
    const sexualPsychology = generateSexualPsychologyV2(config, background, history);

    // 13. Voice + social
    const voice = generateVoice();
    const social = generateSocial(basePersonality);

    // 14. Race features
    const raceFeatures = generateRaceFeatures(raceProfile, Gender.Female);

    // 15. Skin + face + hair
    const skin = generateSkin(config, raceProfile);
    const face = generateFace(Gender.Female, raceProfile);
    const hair = generateHair(config, raceProfile);

    // 16. Initial dynamic state — all trackers present, stamina from history
    const override = PREGNANCY_STAGE_OVERRIDES[pregnancyStage];
    const state = createInitialDynamicStateV2(sexualPhysiology.wetnessTrack.baseline);
    state.physical.stamina = createStaminaFromHistory(history);
    state.physical.lactating = override.lactating;
    state.body.pregnancyStage = pregnancyStage;
    state.body.lactating = override.lactating;

    return {
        gender: Gender.Female,
        race,
        raceFeatures,
        bodyType,
        skin,
        face,
        hair,
        measurements: ageAndPregnancyResult.finalMeasurements,
        physicalDetail: {
            ...physicalDetail,
            breastSoftness: ageAndPregnancyResult.breastSoftness,
            assSoftness: ageAndPregnancyResult.assSoftness
        },
        sexualPhysiology,
        personality: personality as any,
        sexualPsychology,
        voice,
        social,
        background: background as any,
        history: history as any,
        state: state as any
    };
}

function generateHeightNormal(mean: number, stdDev: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + z * stdDev;
}

function generateFemaleMeasurementsWithHeight(
    config: PopulationConfigV2,
    bodyType: import("./enums").FemaleBodyType,
    raceProfile: import("./raceProfiles").RaceProfile,
    heightCm: number,
    heightTag: import("./enums").HeightTag
): FemaleMeasurements {
    const def = FEMALE_BODY_TYPES[bodyType];
    const clampedHeight = clamp(heightCm, def.heightRange.minCm, def.heightRange.maxCm);
    const scale = clampedHeight / def.heightRange.baseCm;

    let bustCm = Math.round(randomInRange(...def.bustRange) * scale);
    let waistCm = Math.round(randomInRange(...def.waistRange) * scale);
    let hipCm = Math.round(randomInRange(...def.hipRange) * scale);

    bustCm = Math.min(bustCm, clampedHeight * 0.72);
    waistCm = clamp(waistCm, clampedHeight * 0.35, clampedHeight * 0.60);
    hipCm = Math.min(hipCm, clampedHeight * 0.80);

    const cups = Object.values(import("./enums").CupSize);
    const minCupIndex = cups.indexOf(def.cupSizeRange[0]);
    const maxCupIndex = cups.indexOf(def.cupSizeRange[1]);
    const cupSize = cups[clamp(Math.round(randomInRange(minCupIndex, maxCupIndex)), 0, cups.length - 1)];

    const assSizes = Object.values(import("./enums").AssSize);
    const minAssIndex = assSizes.indexOf(def.assSizeRange[0]);
    const maxAssIndex = assSizes.indexOf(def.assSizeRange[1]);
    const assSize = assSizes[clamp(Math.round(randomInRange(minAssIndex, maxAssIndex)), 0, assSizes.length - 1)];

    const stomachType = randomFrom(def.stomachTypes);
    const stomachSoftness = randomFrom(def.stomachSoftness);
    const muscleTone = randomFrom(def.muscleToneRange);
    const bodyFatPercent = Math.round(randomInRange(...def.bodyFatRange));

    return {
        heightCm: clampedHeight,
        heightTag,
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

function generateFemalePhysicalDetailWithoutAttractiveness() {
    return {
        breastShape: randomFrom(Object.values(import("./enums").BreastShape)),
        breastSoftness: randomFrom(Object.values(import("./enums").BreastSoftness)),
        nippleType: randomFrom(Object.values(import("./enums").NippleType)),
        nippleColor: randomFrom(Object.values(import("./enums").NippleColor)),
        assShape: randomFrom(Object.values(import("./enums").AssShape)),
        assSoftness: randomFrom(Object.values(import("./enums").AssSoftness)),
        attractiveness: import("./enums").FemaleAttractiveness.Plain   // placeholder — overwritten
    };
}

function generateFemaleSexualPhysiologyV2(
    config: PopulationConfigV2,
    history: import("./historyProfile").ExperienceHistory
): FemaleSexualPhysiology {
    // Same as original generateFemaleSexualPhysiology
    // Kept here for clarity — no changes to logic, just uses V2 config type
    const { generateFemaleSexualPhysiology } = require("./spawnEngine");
    return generateFemaleSexualPhysiology(config, history);
}

function generateBasePersonality(
    background: BackgroundProfileV2
): import("./psychologyCore").PersonalityCore {
    const { generatePersonality } = require("./spawnEngine");
    return generatePersonality(background);
}

function generateSexualPsychologyV2(
    config: PopulationConfigV2,
    background: BackgroundProfileV2,
    history: import("./historyProfile").ExperienceHistory
): import("./psychologyCore").SexualPsychology {
    const { generateSexualPsychology } = require("./spawnEngine");
    return generateSexualPsychology(config, background, history);
}

function generateHistoryV2(
    config: PopulationConfigV2
): import("./historyProfile").ExperienceHistory {
    const { generateHistory } = require("./spawnEngine");
    return generateHistory(config);
}

function generateVoice(): import("./psychologyCore").VoiceProfile {
    const { generateVoice: gv } = require("./spawnEngine");
    return gv();
}

function generateSocial(
    personality: import("./psychologyCore").PersonalityCore
): import("./psychologyCore").SocialProfile {
    const { generateSocial: gs } = require("./spawnEngine");
    return gs(personality);
}

function generateSkin(
    config: PopulationConfigV2,
    raceProfile: import("./raceProfiles").RaceProfile
): import("./physicalCore").SkinProfile {
    const { generateSkin: gs } = require("./spawnEngine");
    return gs(config, raceProfile);
}

function generateFace(
    gender: import("./enums").Gender,
    raceProfile: import("./raceProfiles").RaceProfile
): import("./physicalCore").FaceProfile {
    const { generateFace: gf } = require("./spawnEngine");
    return gf(gender, raceProfile);
}

function generateHair(
    config: PopulationConfigV2,
    raceProfile: import("./raceProfiles").RaceProfile
): import("./physicalCore").HairProfile {
    const { generateHair: gh } = require("./spawnEngine");
    return gh(config, raceProfile);
}

// Placeholder imports needed at top of this file — list for reference:
// import { PREGNANCY_STAGE_OVERRIDES } from "./bodyTypes";
// import { generateFemaleSexualPhysiology, generatePersonality,
//          generateSexualPsychology, generateHistory,
//          generateVoice, generateSocial, generateSkin,
//          generateFace, generateHair } from "./spawnEngine";
// import { updateBondType, updateBrokenFlag } from "./dynamicState";