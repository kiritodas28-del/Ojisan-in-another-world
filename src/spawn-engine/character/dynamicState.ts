// ============================================================
// FILE: dynamicState.ts
// ============================================================

import {
    MoodValue, BondType, PregnancyStage, WetnessLevel
} from "../types/enums";
import { SexualActFlags } from "./historyProfile";
import { PleasureTrack, createPleasureTrack } from "../../../Project/patches";
import { SubspaceTracker, createSubspaceTracker, AfterglowTracker, createAfterglowTracker } from "../../../Project/patches";
import { SuppressionState } from "./personalityExpansion";

// ─── STAMINA TRACK ──────────────────────────────────────────
export interface StaminaTrack {
    current: number;                        // 0-100
    max: number;                            // increases with encounter history
    recoveryRate: number;                   // points recovered per rest period
    depletionRate: number;                  // points lost per encounter intensity unit
}

// ─── PHYSICAL STATE ─────────────────────────────────────────
export interface PhysicalState {
    arousalLevel: number;                   // 0-100
    currentWetness: WetnessLevel;           // female only — calculated from arousal
    painLevel: number;                      // 0-100; sexual pain state
    pleasureTrack: PleasureTrack;
    stamina: StaminaTrack;
    lactating: boolean;
    clothingState: "FULLY_CLOTHED" | "PARTIALLY_CLOTHED" | "EXPOSED" | "NAKED";
    restraintState: number;                 // 0-100; 0 = free, 100 = fully restrained
}

// ─── MENTAL STATE ───────────────────────────────────────────
export interface MentalState {
    currentMood: MoodValue;
    corruptionCurrent: number;              // 0-100
    shameCurrent: number;                   // 0-100
    brokenFlag: boolean;                    // true when corruption > 85 and shame < 10
    subspaceTracker: SubspaceTracker;               // ADDED — replaces plain subspaceFlag
    afterglowTracker: AfterglowTracker;             // ADDED — replaces plain afterglowFlag
    suppressionState: SuppressionState;             // ADDED
    trustWithPlayer: number;                // 0-100; separate from baseline trust
    attachmentWithPlayer: number;           // 0-100
    submissionToPlayer: number;             // 0-100
}

// ─── RELATIONSHIP STATE ─────────────────────────────────────
export interface RelationshipState {
    encounterCountWithPlayer: number;
    actsPerformedWithPlayer: SexualActFlags;
    bondType: BondType;
    bondStrength: number;                   // 0-100 within current bond type
}

// ─── PREGNANCY STATE ────────────────────────────────────────
export interface PregnancyBodyState {
    pregnancyStage: PregnancyStage;
    pregnancyWeek: number;                  // 0-40
    lactating: boolean;
    postpartum: boolean;
    postpartumWeek: number;                 // weeks since birth (0 if not postpartum)
}

// ─── FULL DYNAMIC STATE ─────────────────────────────────────
export interface CharacterDynamicState {
    physical: PhysicalState;
    mental: MentalState;
    relationship: RelationshipState;
    body: PregnancyBodyState;
}

export function updateBrokenFlag(state: CharacterDynamicState): CharacterDynamicState {
    const broken =
        state.mental.corruptionCurrent > 85 &&
        state.mental.shameCurrent < 10;
    return {
        ...state,
        mental: {
            ...state.mental,
            brokenFlag: broken,
            currentMood: broken ? MoodValue.Broken : state.mental.currentMood
        }
    };
}

export function updateBondType(state: CharacterDynamicState): CharacterDynamicState {
    const { encounterCountWithPlayer } = state.relationship;
    const { trustWithPlayer, attachmentWithPlayer, submissionToPlayer, corruptionCurrent } = state.mental;

    let bond = BondType.None;

    if (encounterCountWithPlayer === 0) bond = BondType.None;
    else if (encounterCountWithPlayer < 3) bond = BondType.Transactional;
    else if (attachmentWithPlayer > 70 && corruptionCurrent > 80) bond = BondType.Corrupted;
    else if (submissionToPlayer > 80 && corruptionCurrent > 60) bond = BondType.Owned;
    else if (attachmentWithPlayer > 90 && trustWithPlayer > 80) bond = BondType.Devoted;
    else if (attachmentWithPlayer > 80 && trustWithPlayer > 60) bond = BondType.Love;
    else if (attachmentWithPlayer > 60 && submissionToPlayer > 60) bond = BondType.Submissive;
    else if (attachmentWithPlayer > 70) bond = BondType.Obsession;
    else if (attachmentWithPlayer > 50) bond = BondType.Dependent;
    else if (attachmentWithPlayer > 30) bond = BondType.Attachment;
    else if (trustWithPlayer < 20 && encounterCountWithPlayer > 5) bond = BondType.PureHate;
    else if (trustWithPlayer < 30 && attachmentWithPlayer > 40) bond = BondType.HateLove;
    else if (corruptionCurrent > 90 && state.mental.brokenFlag) bond = BondType.Broken;
    else bond = BondType.Transactional;

    return {
        ...state,
        relationship: {
            ...state.relationship,
            bondType: bond
        }
    };
}

export function createInitialDynamicState(
    wetnessBaseline: WetnessLevel = WetnessLevel.Dry
): CharacterDynamicState {
    return {
        physical: {
            arousalLevel: 0,
            currentWetness: wetnessBaseline,
            painLevel: 0,
            pleasureTrack: createPleasureTrack(),
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
            currentMood: MoodValue.Defiant,
            corruptionCurrent: 0,
            shameCurrent: 80,
            brokenFlag: false,
            subspaceTracker: createSubspaceTracker(),
            afterglowTracker: createAfterglowTracker(),
            suppressionState: {
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
            actsPerformedWithPlayer: createEmptyRelationshipActFlags(),
            bondType: BondType.None,
            bondStrength: 0
        },
        body: {
            pregnancyStage: PregnancyStage.NotPregnant,
            pregnancyWeek: 0,
            lactating: false,
            postpartum: false,
            postpartumWeek: 0
        }
    };
}

function createEmptyRelationshipActFlags(): SexualActFlags {
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
        breastSwing: false,
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
        cumOnBody: false,
        cumOnBreast: false,
        toyUsed: false,
        vibratorUsed: false,
        restraintsApplied: false
    };
}