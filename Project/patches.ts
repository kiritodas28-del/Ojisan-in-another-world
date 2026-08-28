// ============================================================
// FILE: patches.ts
// All 15 patches from the audit + integration with ageBodyProfile
// ============================================================

import {
    WetnessLevel, VaginaType, OrgasmType, SexualLean,
    ResistanceProfileType, Kink, StomachSoftness,
    BreastSoftness, AssSoftness, CupSize, AssSize,
    MoodValue, BondType, PregnancyStage, SensitivityLevel,
    FemaleBodyType, HeightTag, SkinTone, RegionOfOrigin, CockType, CockTextureType
} from "./enums";
import { WetnessTrack, OrgasmProfile, FemaleSexualPhysiology, SensitivityTrack } from "./sexualPhysiology";
import { SexualPsychology, ResistanceProfile, CorruptionShameTrack } from "./psychologyCore";
import { SexualActFlags } from "./historyProfile";
import { CharacterDynamicState, PhysicalState, StaminaTrack } from "./dynamicState";
import { ExperienceHistory } from "./historyProfile";
import { updateBondType, updateBrokenFlag } from "./dynamicState";

// ============================================================
// PATCH 1: Pleasure level as distinct from arousal
// ============================================================
// Pleasure is distinct from arousal:
// Arousal = desire/wanting state (builds toward orgasm)
// Pleasure = sensation quality (can be high even at low arousal e.g. from non-sexual touch)
// Both tracked separately; both contribute to climax threshold

export interface PleasureTrack {
    current: number;                    // 0-100
    peakThisEncounter: number;          // highest reached this encounter
    decayRate: number;                  // how fast pleasure drops when stimulation stops
    buildRate: number;                  // how fast pleasure builds per stimulation act
}

export function createPleasureTrack(): PleasureTrack {
    return {
        current: 0,
        peakThisEncounter: 0,
        decayRate: 5,
        buildRate: 8
    };
}

export function updatePleasure(
    track: PleasureTrack,
    stimulationIntensity: number,   // 0.0-1.0
    sensitivityMultiplier: number   // 1.0 = normal; higher = more sensitive body part
): PleasureTrack {
    const gain = stimulationIntensity * track.buildRate * sensitivityMultiplier;
    const newCurrent = Math.min(track.current + gain, 100);
    return {
        ...track,
        current: newCurrent,
        peakThisEncounter: Math.max(track.peakThisEncounter, newCurrent)
    };
}

export function decayPleasure(track: PleasureTrack): PleasureTrack {
    return {
        ...track,
        current: Math.max(track.current - track.decayRate, 0)
    };
}

// ============================================================
// PATCH 2: Wetness-arousal wiring
// ============================================================

const WETNESS_ORDER: WetnessLevel[] = [
    WetnessLevel.Dry, WetnessLevel.Damp, WetnessLevel.Moderate,
    WetnessLevel.Wet, WetnessLevel.VeryWet, WetnessLevel.Dripping,
    WetnessLevel.Flooding
];

export function calculateCurrentWetness(
    track: WetnessTrack,
    arousalLevel: number
): WetnessLevel {
    const baselineIndex = WETNESS_ORDER.indexOf(track.baseline);
    if (arousalLevel < track.arousalThresholdToWet) {
        return track.baseline;
    }
    const arousalRange = track.peakWetnessAtArousal - track.arousalThresholdToWet;
    const arousalProgress = Math.min(
        (arousalLevel - track.arousalThresholdToWet) / Math.max(arousalRange, 1),
        1.0
    );
    const maxIndex = WETNESS_ORDER.length - 1;
    const targetIndex = Math.round(baselineIndex + arousalProgress * (maxIndex - baselineIndex));
    return WETNESS_ORDER[Math.min(targetIndex, maxIndex)];
}

export function syncWetnessToArousal(
    state: CharacterDynamicState,
    wetnessTrack: WetnessTrack
): CharacterDynamicState {
    const currentWetness = calculateCurrentWetness(wetnessTrack, state.physical.arousalLevel);
    return {
        ...state,
        physical: {
            ...state.physical,
            currentWetness
        }
    };
}

// ============================================================
// PATCH 3: Vagina type update from encounters
// ============================================================

export function updateVaginaTypeFromEncounters(
    physiology: FemaleSexualPhysiology,
    totalEncounterCount: number,
    actsPerformed: SexualActFlags
): FemaleSexualPhysiology {
    if (!actsPerformed.vaginalPenetration) return physiology;
    let newType = physiology.vaginaType;
    if (totalEncounterCount > 150) newType = VaginaType.Loose;
    else if (totalEncounterCount > 60) newType = VaginaType.Average;
    else if (totalEncounterCount > 20) {
        if (physiology.vaginaType === VaginaType.Tight) newType = VaginaType.Average;
    }
    return { ...physiology, vaginaType: newType };
}

// ============================================================
// PATCH 4: Wetness baseline increase with encounter frequency
// ============================================================

export function updateWetnessBaselineFromHistory(
    track: WetnessTrack,
    totalEncounterCount: number
): WetnessTrack {
    const baseIndex = WETNESS_ORDER.indexOf(track.baseline);
    let newIndex = baseIndex;
    if (totalEncounterCount > 200) newIndex = Math.min(baseIndex + 3, 5);
    else if (totalEncounterCount > 100) newIndex = Math.min(baseIndex + 2, 4);
    else if (totalEncounterCount > 50) newIndex = Math.min(baseIndex + 1, 3);
    else if (totalEncounterCount > 20) newIndex = Math.min(baseIndex + 1, 2);
    return { ...track, baseline: WETNESS_ORDER[newIndex] };
}

// ============================================================
// PATCH 5: Orgasm type acquisition by act
// ============================================================

export function tryAcquireOrgasmType(
    profile: OrgasmProfile,
    actsPerformed: SexualActFlags,
    encounterCount: number
): OrgasmProfile {
    const acquired = new Set(profile.acquiredTypes);

    if (actsPerformed.fingeringReceived && Math.random() < 0.4)
        acquired.add(OrgasmType.Clitoral);
    if (actsPerformed.vaginalPenetration && Math.random() < 0.3)
        acquired.add(OrgasmType.Vaginal);
    if (actsPerformed.analPenetration && Math.random() < 0.2)
        acquired.add(OrgasmType.Anal);
    if (acquired.size >= 2 && encounterCount > 10 && Math.random() < 0.15)
        acquired.add(OrgasmType.Combined);
    if (encounterCount > 20 && Math.random() < 0.1)
        acquired.add(OrgasmType.Multiple);
    if (actsPerformed.squirtingAchieved)
        acquired.add(OrgasmType.Squirting);

    // Update capacities
    const multipleCapacity = profile.multipleCapacity || acquired.has(OrgasmType.Multiple);
    const squirtCapacity = profile.squirtCapacity || acquired.has(OrgasmType.Squirting);

    return {
        ...profile,
        acquiredTypes: acquired,
        multipleCapacity,
        squirtCapacity
    };
}

// ============================================================
// PATCH 6: Sexual lean update with encounters
// ============================================================

export function updateSexualLean(
    psychology: SexualPsychology,
    corruption: number,
    actsPerformed: SexualActFlags,
    encounterCount: number
): SexualPsychology {
    let lean = psychology.sexualLean;

    // Progressive lean shift based on corruption and acts
    if (corruption > 80 && actsPerformed.bondageExperienced && actsPerformed.impactExperienced)
        lean = SexualLean.Masochistic;
    else if (corruption > 70 && actsPerformed.bondageExperienced)
        lean = SexualLean.Submissive;
    else if (corruption > 60 && encounterCount > 30)
        lean = SexualLean.Mixed;
    else if (corruption > 50 && actsPerformed.chokingExperienced)
        lean = SexualLean.Submissive;

    return { ...psychology, sexualLean: lean };
}

// ============================================================
// PATCH 7: Resistance decay per encounter
// ============================================================

export function updateResistanceFromEncounter(
    profile: ResistanceProfile,
    encounterIntensity: number,     // 0.0-1.0
    corruption: number,
    trustWithPlayer: number
): ResistanceProfile {
    // Resistance decays faster with high intensity, high corruption, high trust
    const intensityDecay = encounterIntensity * 6;
    const corruptionDecay = corruption > 50 ? 3 : corruption > 25 ? 1 : 0;
    const trustDecay = trustWithPlayer > 70 ? 2 : 0;
    const totalDecay = intensityDecay + corruptionDecay + trustDecay;

    const newResistance = Math.max(profile.currentResistance - totalDecay, 0);

    // Check for profile type shift
    let newProfileType = profile.profileType;
    if (corruption >= profile.corruptionShiftThreshold) {
        newProfileType = profile.nextProfileType;
    } else if (newResistance < 20) {
        // Very low resistance forces comply regardless
        newProfileType = ResistanceProfileType.Comply;
    }

    return {
        ...profile,
        currentResistance: newResistance,
        profileType: newProfileType
    };
}

// ============================================================
// PATCH 8: Stamina max from history and increase function
// ============================================================

export function deriveStaminaMaxFromHistory(totalEncounterCount: number): number {
    return Math.min(100 + Math.round(totalEncounterCount * 0.5), 200);
}

export function createStaminaFromHistory(history: ExperienceHistory): StaminaTrack {
    const max = deriveStaminaMaxFromHistory(history.totalEncounterCount);
    return {
        current: max,
        max,
        recoveryRate: 15 + Math.round(history.totalEncounterCount * 0.1),
        depletionRate: Math.max(5, 15 - Math.round(history.totalEncounterCount * 0.05))
    };
}

export function increaseStaminaMax(stamina: StaminaTrack, encounterIntensity: number): StaminaTrack {
    // High intensity encounters increase max stamina over time
    const gain = encounterIntensity > 0.8 ? 3
        : encounterIntensity > 0.6 ? 2
            : encounterIntensity > 0.4 ? 1
                : 0;
    return {
        ...stamina,
        max: Math.min(stamina.max + gain, 200),
        recoveryRate: Math.min(stamina.recoveryRate + (gain > 0 ? 0.5 : 0), 50)
    };
}

export function depleteStamina(stamina: StaminaTrack, encounterIntensity: number): StaminaTrack {
    const depletion = stamina.depletionRate * encounterIntensity;
    return {
        ...stamina,
        current: Math.max(stamina.current - depletion, 0)
    };
}

export function recoverStamina(stamina: StaminaTrack): StaminaTrack {
    return {
        ...stamina,
        current: Math.min(stamina.current + stamina.recoveryRate, stamina.max)
    };
}

// ============================================================
// PATCH 9: Subspace with sustained duration tracking
// ============================================================

export interface SubspaceTracker {
    sustainedArousalHighTurns: number;  // consecutive turns arousal > 90
    sustainedPainHighTurns: number;     // consecutive turns pain > 60
    requiredSustainedTurns: number;     // turns needed to trigger subspace
    active: boolean;
    turnsInSubspace: number;
    maxSubspaceTurns: number;           // auto-exits after this many turns
}

export function createSubspaceTracker(): SubspaceTracker {
    return {
        sustainedArousalHighTurns: 0,
        sustainedPainHighTurns: 0,
        requiredSustainedTurns: 3,
        active: false,
        turnsInSubspace: 0,
        maxSubspaceTurns: 10
    };
}

export function updateSubspaceTracker(
    tracker: SubspaceTracker,
    arousalLevel: number,
    painLevel: number,
    pleasureLevel: number
): SubspaceTracker {
    // Increment or reset sustained counters
    const newArousalTurns = arousalLevel > 90
        ? tracker.sustainedArousalHighTurns + 1
        : 0;
    const newPainTurns = painLevel > 60
        ? tracker.sustainedPainHighTurns + 1
        : 0;

    // Check entry conditions
    const shouldActivate =
        !tracker.active &&
        (
            (newArousalTurns >= tracker.requiredSustainedTurns && newPainTurns >= tracker.requiredSustainedTurns) ||
            (pleasureLevel >= 98 && newArousalTurns >= tracker.requiredSustainedTurns)
        );

    // Check exit conditions
    const shouldExit =
        tracker.active &&
        (
            tracker.turnsInSubspace >= tracker.maxSubspaceTurns ||
            (arousalLevel < 50 && painLevel < 30)
        );

    const newActive = shouldActivate ? true : shouldExit ? false : tracker.active;
    const newTurnsInSubspace = newActive && tracker.active
        ? tracker.turnsInSubspace + 1
        : 0;

    return {
        ...tracker,
        sustainedArousalHighTurns: newArousalTurns,
        sustainedPainHighTurns: newPainTurns,
        active: newActive,
        turnsInSubspace: newTurnsInSubspace
    };
}

// ============================================================
// PATCH 10: Afterglow set and decay
// ============================================================

export interface AfterglowTracker {
    active: boolean;
    turnsRemaining: number;
    defaultDuration: number;    // turns afterglow lasts
}

export function createAfterglowTracker(): AfterglowTracker {
    return {
        active: false,
        turnsRemaining: 0,
        defaultDuration: 5
    };
}

export function triggerAfterglow(
    tracker: AfterglowTracker,
    orgasmIntensity: number     // 0.0-1.0; higher intensity = longer afterglow
): AfterglowTracker {
    const duration = Math.round(tracker.defaultDuration * (1 + orgasmIntensity));
    return {
        ...tracker,
        active: true,
        turnsRemaining: duration
    };
}

export function tickAfterglow(
    tracker: AfterglowTracker,
    state: CharacterDynamicState
): { tracker: AfterglowTracker; state: CharacterDynamicState } {
    if (!tracker.active) return { tracker, state };

    const newTurns = tracker.turnsRemaining - 1;
    const stillActive = newTurns > 0;

    const newTracker: AfterglowTracker = {
        ...tracker,
        active: stillActive,
        turnsRemaining: Math.max(newTurns, 0)
    };

    const newState: CharacterDynamicState = {
        ...state,
        mental: {
            ...state.mental,
            currentMood: stillActive ? MoodValue.Afterglow : MoodValue.Dazed
        }
    };

    return { tracker: newTracker, state: newState };
}

export function setAfterglowPost(
    state: CharacterDynamicState,
    tracker: AfterglowTracker,
    orgasmIntensity: number
): { tracker: AfterglowTracker; state: CharacterDynamicState } {
    const newTracker = triggerAfterglow(tracker, orgasmIntensity);
    const newState: CharacterDynamicState = {
        ...state,
        mental: {
            ...state.mental,
            currentMood: MoodValue.Afterglow
        }
    };
    return { tracker: newTracker, state: newState };
}

// ============================================================
// PATCH 11: Kink acquisition by act
// ============================================================

export function tryAcquireKinkFromAct(
    psychology: SexualPsychology,
    actsPerformed: SexualActFlags,
    encounterCount: number
): SexualPsychology {
    const acquired = new Set(psychology.acquiredKinks);
    const rate = psychology.kinkAcquisitionRate;

    if (actsPerformed.bondageExperienced && Math.random() < rate) acquired.add(Kink.Bondage);
    if (actsPerformed.impactExperienced && Math.random() < rate) acquired.add(Kink.Impact);
    if (actsPerformed.chokingExperienced && Math.random() < rate) acquired.add(Kink.Choking);
    if (actsPerformed.analPenetration && Math.random() < rate) acquired.add(Kink.Anal);
    if (actsPerformed.oralGiving && Math.random() < rate) acquired.add(Kink.Oral);
    if (actsPerformed.edgingExperienced && Math.random() < rate) acquired.add(Kink.Edging);
    if (actsPerformed.vaginalCreampie && Math.random() < rate) acquired.add(Kink.Breeding);
    if (actsPerformed.creampieReceived && Math.random() < rate) acquired.add(Kink.Creampie);
    if (actsPerformed.toyUsed && Math.random() < rate) acquired.add(Kink.Toys);
    if (actsPerformed.vibratorUsed && Math.random() < rate) acquired.add(Kink.Overstimulation);
    if (actsPerformed.nippleSuck && Math.random() < rate) acquired.add(Kink.Praise);
    if (actsPerformed.facialReceived && Math.random() < rate) acquired.add(Kink.Degradation);
    if (actsPerformed.multipleOrgasmAchieved && Math.random() < rate) acquired.add(Kink.Overstimulation);
    if (encounterCount > 50 && Math.random() < rate * 0.5) acquired.add(Kink.Edging);
    if (encounterCount > 30 && actsPerformed.squirtingAchieved) acquired.add(Kink.Overstimulation);

    return { ...psychology, acquiredKinks: acquired };
}




export function deriveCockTypesFromRace(raceFeatures: { cockTextureOptions: CockTextureType[] }): CockType[] {
    const { cockTextureOptions } = raceFeatures;
    const types: CockType[] = [CockType.Straight, CockType.Uniform];
    if (cockTextureOptions.includes(CockTextureType.Knotted)) types.push(CockType.Knotted);
    if (cockTextureOptions.includes(CockTextureType.Barbed)) types.push(CockType.Barbed);
    if (cockTextureOptions.includes(CockTextureType.Ridged)) types.push(CockType.Ridged);
    if (cockTextureOptions.includes(CockTextureType.Flared)) types.push(CockType.Flared);
    if (cockTextureOptions.includes(CockTextureType.Tapered)) types.push(CockType.Tapered);
    return types;
}

// ============================================================
// PATCH 13: Region for Mixed race characters
// ============================================================


export interface RegionSkinBias {
    region: RegionOfOrigin;
    preferredSkinTones: SkinTone[];
    climateDescriptor: string;
}

export const REGION_SKIN_BIAS: Record<RegionOfOrigin, RegionSkinBias> = {
    [RegionOfOrigin.Heartlands]: {
        region: RegionOfOrigin.Heartlands,
        preferredSkinTones: [SkinTone.Light, SkinTone.LightMedium, SkinTone.Medium, SkinTone.Fair],
        climateDescriptor: "temperate farmland"
    },
    [RegionOfOrigin.VerdantReach]: {
        region: RegionOfOrigin.VerdantReach,
        preferredSkinTones: [SkinTone.Porcelain, SkinTone.Ivory, SkinTone.Fair, SkinTone.Light],
        climateDescriptor: "ancient forest"
    },
    [RegionOfOrigin.StonebackRange]: {
        region: RegionOfOrigin.StonebackRange,
        preferredSkinTones: [SkinTone.Tan, SkinTone.Medium, SkinTone.Ruddy as SkinTone, SkinTone.Light],
        climateDescriptor: "harsh mountain"
    },
    [RegionOfOrigin.Ashfen]: {
        region: RegionOfOrigin.Ashfen,
        preferredSkinTones: [SkinTone.AshGrey, SkinTone.Olive, SkinTone.Medium, SkinTone.TealGreen],
        climateDescriptor: "swampland"
    },
    [RegionOfOrigin.SunkenCoast]: {
        region: RegionOfOrigin.SunkenCoast,
        preferredSkinTones: [SkinTone.Golden, SkinTone.Tan, SkinTone.Caramel, SkinTone.Medium],
        climateDescriptor: "coastal trade"
    },
    [RegionOfOrigin.AbyssalRealm]: {
        region: RegionOfOrigin.AbyssalRealm,
        preferredSkinTones: [SkinTone.ObsidianBlack, SkinTone.DeepPurple, SkinTone.AshGrey, SkinTone.Crimson as SkinTone],
        climateDescriptor: "demonic underworld"
    },
    [RegionOfOrigin.CelestialSpire]: {
        region: RegionOfOrigin.CelestialSpire,
        preferredSkinTones: [SkinTone.GoldenMetallic, SkinTone.Porcelain, SkinTone.Ivory, SkinTone.PaleBlue],
        climateDescriptor: "divine realm"
    },
    [RegionOfOrigin.DeepForest]: {
        region: RegionOfOrigin.DeepForest,
        preferredSkinTones: [SkinTone.Fair, SkinTone.Light, SkinTone.Ivory, SkinTone.TealGreen],
        climateDescriptor: "deep woodland"
    },
    [RegionOfOrigin.VolcanicWastes]: {
        region: RegionOfOrigin.VolcanicWastes,
        preferredSkinTones: [SkinTone.Ebony, SkinTone.DeepBrown, SkinTone.Chestnut, SkinTone.ObsidianBlack],
        climateDescriptor: "volcanic badlands"
    },
    [RegionOfOrigin.FrozenNorth]: {
        region: RegionOfOrigin.FrozenNorth,
        preferredSkinTones: [SkinTone.Porcelain, SkinTone.Ivory, SkinTone.PaleBlue, SkinTone.Fair],
        climateDescriptor: "frozen tundra"
    },
    [RegionOfOrigin.DesertBadlands]: {
        region: RegionOfOrigin.DesertBadlands,
        preferredSkinTones: [SkinTone.Golden, SkinTone.Caramel, SkinTone.Tan, SkinTone.Brown],
        climateDescriptor: "desert wasteland"
    },
    [RegionOfOrigin.CoastalIslands]: {
        region: RegionOfOrigin.CoastalIslands,
        preferredSkinTones: [SkinTone.Brown, SkinTone.Caramel, SkinTone.Golden, SkinTone.Chestnut],
        climateDescriptor: "island coast"
    }
};


// ============================================================
// FULL ENCOUNTER RESOLUTION FUNCTION
// ============================================================
// Master function that applies all patches in sequence
// Call this at the end of each encounter turn

export interface EncounterTurnResult {
    state: CharacterDynamicState;
    physiology: FemaleSexualPhysiology;
    psychology: SexualPsychology;
    subspaceTracker: SubspaceTracker;
    afterglowTracker: AfterglowTracker;
    pleasureTrack: PleasureTrack;
}

export function resolveEncounterTurn(
    current: EncounterTurnResult,
    encounterIntensity: number,     // 0.0-1.0
    stimulationIntensity: number,   // 0.0-1.0
    sensitivityMultiplier: number,  // from body part sensitivity
    actsThisTurn: Partial<SexualActFlags>,
    didOrgasm: boolean,
    orgasmIntensity: number         // 0.0-1.0 if didOrgasm
): EncounterTurnResult {
    let { state, physiology, psychology, subspaceTracker, afterglowTracker, pleasureTrack } = current;

    // PATCH 1: Update pleasure
    pleasureTrack = updatePleasure(pleasureTrack, stimulationIntensity, sensitivityMultiplier);

    // PATCH 2: Sync wetness to arousal
    state = syncWetnessToArousal(state, physiology.wetnessTrack);

    // PATCH 7: Update resistance from encounter
    const updatedResistance = updateResistanceFromEncounter(
        psychology.resistanceProfile,
        encounterIntensity,
        state.mental.corruptionCurrent,
        state.mental.trustWithPlayer
    );
    psychology = { ...psychology, resistanceProfile: updatedResistance };

    // PATCH 9: Update subspace tracker
    subspaceTracker = updateSubspaceTracker(
        subspaceTracker,
        state.physical.arousalLevel,
        state.physical.painLevel,
        pleasureTrack.current
    );
    state = {
        ...state,
        mental: {
            ...state.mental,
            subspaceTracker: subspaceTracker,
            currentMood: subspaceTracker.active ? MoodValue.Subspace : state.mental.currentMood
        }
    };

    // PATCH 10: Handle afterglow
    if (didOrgasm) {
        const result = setAfterglowPost(state, afterglowTracker, orgasmIntensity);
        state = result.state;
        afterglowTracker = result.tracker;

        // PATCH 5: Try acquire orgasm type
        const allActs = { ...current.state.relationship.actsPerformedWithPlayer, ...actsThisTurn };
        physiology = {
            ...physiology,
            orgasmProfile: tryAcquireOrgasmType(
                physiology.orgasmProfile,
                allActs as SexualActFlags,
                state.relationship.encounterCountWithPlayer
            )
        };
    } else {
        const tickResult = tickAfterglow(afterglowTracker, state);
        afterglowTracker = tickResult.tracker;
        state = tickResult.state;
    }

    // PATCH 6: Update sexual lean
    psychology = updateSexualLean(
        psychology,
        state.mental.corruptionCurrent,
        state.relationship.actsPerformedWithPlayer,
        state.relationship.encounterCountWithPlayer
    );

    // PATCH 11: Try acquire kinks
    psychology = tryAcquireKinkFromAct(
        psychology,
        state.relationship.actsPerformedWithPlayer,
        state.relationship.encounterCountWithPlayer
    );

    // PATCH 8: Deplete stamina
    state = {
        ...state,
        physical: {
            ...state.physical,
            stamina: depleteStamina(state.physical.stamina, encounterIntensity)
        }
    };

    return {
        state,
        physiology,
        psychology,
        subspaceTracker,
        afterglowTracker,
        pleasureTrack
    };
}

// ============================================================
// POST ENCOUNTER RESOLUTION
// Called once after full encounter ends, not per turn
// ============================================================

export function resolvePostEncounter(
    current: EncounterTurnResult,
    history: ExperienceHistory,
    totalEncounterCount: number
): { result: EncounterTurnResult; history: ExperienceHistory } {
    let { state, physiology, psychology, subspaceTracker, afterglowTracker, pleasureTrack } = current;

    // PATCH 3: Update vagina type
    physiology = updateVaginaTypeFromEncounters(
        physiology,
        totalEncounterCount,
        state.relationship.actsPerformedWithPlayer
    );

    // PATCH 4: Update wetness baseline
    physiology = {
        ...physiology,
        wetnessTrack: updateWetnessBaselineFromHistory(physiology.wetnessTrack, totalEncounterCount)
    };

    // PATCH 8: Increase stamina max from sustained high intensity
    state = {
        ...state,
        physical: {
            ...state.physical,
            stamina: increaseStaminaMax(state.physical.stamina, 0.7)
        }
    };

    // Recover stamina post encounter
    state = {
        ...state,
        physical: {
            ...state.physical,
            stamina: recoverStamina(state.physical.stamina)
        }
    };

    // Decay pleasure post encounter
    pleasureTrack = decayPleasure(pleasureTrack);
    pleasureTrack = { ...pleasureTrack, peakThisEncounter: 0 };

    // Reset subspace tracker
    subspaceTracker = {
        ...subspaceTracker,
        sustainedArousalHighTurns: 0,
        sustainedPainHighTurns: 0
    };

    // Update encounter count
    state = {
        ...state,
        relationship: {
            ...state.relationship,
            encounterCountWithPlayer: state.relationship.encounterCountWithPlayer + 1
        }
    };

    // Update bond type
    state = updateBondType(state);

    state = updateBrokenFlag(state);

    return {
        result: {
            state,
            physiology,
            psychology,
            subspaceTracker,
            afterglowTracker,
            pleasureTrack
        },
        history: {
            ...history,
            totalEncounterCount: history.totalEncounterCount + 1
        }
    };
}

