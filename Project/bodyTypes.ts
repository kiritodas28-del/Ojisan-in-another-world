// ============================================================
// FILE: bodyTypes.ts
// ============================================================
// Contains all female and male body type definitions
// and pregnancy stage overrides
// Referenced by: spawnEngine.ts, physicalCore.ts,
//                ageBodyProfile.ts, consolidatedPatch.ts
// ============================================================

import {
    MaleBodyType, FemaleBodyType,
    CupSize, AssSize, StomachType, StomachSoftness,
    MuscleTone, BreastSoftness, AssSoftness, PregnancyStage
} from "./enums";

// ─── SHARED INTERFACES ──────────────────────────────────────

export interface HeightRange {
    minCm: number;
    maxCm: number;
    baseCm: number;
}

export interface PostpartumModifier {
    bustAddCm: [number, number];
    waistAddCm: [number, number];
    hipAddCm: [number, number];
    stomachSoftnessShift: number;
    breastSoftnessShift: number;
    assSoftnessShift: number;
    cupSizeAddSteps: [number, number];
    revertToExactBase: boolean;
}

// ─── MALE BODY TYPE DEFINITION ──────────────────────────────

export interface MaleBodyTypeDefinition {
    type: MaleBodyType;
    description: string;
    heightRange: HeightRange;
    chestRange: [number, number];
    waistRange: [number, number];
    hipRange: [number, number];
    shoulderWidth: [number, number];
    muscleToneRange: MuscleTone[];
    defaultStomachType: StomachType[];
    bodyFatRange: [number, number];
    postpartumModifier: PostpartumModifier;
}

// ─── FEMALE BODY TYPE DEFINITION ────────────────────────────

export interface FemaleBodyTypeDefinition {
    type: FemaleBodyType;
    description: string;
    heightRange: HeightRange;
    bustWaistHipRatio: [number, number, number];
    bustRange: [number, number];
    waistRange: [number, number];
    hipRange: [number, number];
    cupSizeRange: [CupSize, CupSize];
    assSizeRange: [AssSize, AssSize];
    stomachTypes: StomachType[];
    stomachSoftness: StomachSoftness[];
    muscleToneRange: MuscleTone[];
    bodyFatRange: [number, number];
    postpartumModifier: PostpartumModifier;
}

// ─── PREGNANCY STAGE OVERRIDE ───────────────────────────────

export interface PregnancyStageOverride {
    stage: PregnancyStage;
    bustAddCm: number;
    waistAddCm: number;
    hipAddCm: number;
    stomachTypeOverride: StomachType;
    stomachSoftnessOverride: StomachSoftness;
    cupSizeAddSteps: number;
    breastSoftnessOverride: BreastSoftness;
    visibleBump: boolean;
    bumpSize: "NONE" | "SLIGHT" | "SMALL" | "MODERATE" | "LARGE" | "VERY_LARGE" | "FULL_TERM";
    lactating: boolean;
}

// ============================================================
// MALE BODY TYPE RECORDS
// ============================================================

export const MALE_BODY_TYPES: Record<MaleBodyType, MaleBodyTypeDefinition> = {

    [MaleBodyType.Androgynous]: {
        type: MaleBodyType.Androgynous,
        description: "Slim, soft, low muscle definition. Narrow shoulders. Could be mistaken for female from behind.",
        heightRange: { minCm: 155, maxCm: 180, baseCm: 170 },
        chestRange: [80, 90],
        waistRange: [68, 76],
        hipRange: [78, 88],
        shoulderWidth: [36, 40],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        defaultStomachType: [StomachType.Flat, StomachType.Soft],
        bodyFatRange: [12, 20],
        postpartumModifier: {
            bustAddCm: [0, 0], waistAddCm: [0, 0], hipAddCm: [0, 0],
            stomachSoftnessShift: 0, breastSoftnessShift: 0, assSoftnessShift: 0,
            cupSizeAddSteps: [0, 0], revertToExactBase: true
        }
    },

    [MaleBodyType.Lean]: {
        type: MaleBodyType.Lean,
        description: "Slim build, low body fat, visible muscle tone without bulk. Runner's build.",
        heightRange: { minCm: 160, maxCm: 190, baseCm: 170 },
        chestRange: [85, 96],
        waistRange: [70, 78],
        hipRange: [80, 90],
        shoulderWidth: [39, 44],
        muscleToneRange: [MuscleTone.Light, MuscleTone.Toned],
        defaultStomachType: [StomachType.Flat, StomachType.Toned],
        bodyFatRange: [8, 15],
        postpartumModifier: {
            bustAddCm: [0, 0], waistAddCm: [0, 0], hipAddCm: [0, 0],
            stomachSoftnessShift: 0, breastSoftnessShift: 0, assSoftnessShift: 0,
            cupSizeAddSteps: [0, 0], revertToExactBase: true
        }
    },

    [MaleBodyType.Average]: {
        type: MaleBodyType.Average,
        description: "Moderate build. Neither slim nor muscular. Average proportions. Most common male type.",
        heightRange: { minCm: 163, maxCm: 193, baseCm: 170 },
        chestRange: [90, 102],
        waistRange: [76, 88],
        hipRange: [84, 96],
        shoulderWidth: [41, 46],
        muscleToneRange: [MuscleTone.Soft, MuscleTone.Light, MuscleTone.Toned],
        defaultStomachType: [StomachType.Flat, StomachType.Soft, StomachType.Rounded],
        bodyFatRange: [15, 25],
        postpartumModifier: {
            bustAddCm: [0, 0], waistAddCm: [0, 0], hipAddCm: [0, 0],
            stomachSoftnessShift: 0, breastSoftnessShift: 0, assSoftnessShift: 0,
            cupSizeAddSteps: [0, 0], revertToExactBase: true
        }
    },

    [MaleBodyType.Athletic]: {
        type: MaleBodyType.Athletic,
        description: "Toned, visible muscle definition. V-taper. Low body fat. Active lifestyle.",
        heightRange: { minCm: 165, maxCm: 195, baseCm: 170 },
        chestRange: [96, 108],
        waistRange: [74, 84],
        hipRange: [86, 96],
        shoulderWidth: [44, 50],
        muscleToneRange: [MuscleTone.Toned, MuscleTone.Athletic, MuscleTone.Defined],
        defaultStomachType: [StomachType.Flat, StomachType.Toned],
        bodyFatRange: [8, 16],
        postpartumModifier: {
            bustAddCm: [0, 0], waistAddCm: [0, 0], hipAddCm: [0, 0],
            stomachSoftnessShift: 0, breastSoftnessShift: 0, assSoftnessShift: 0,
            cupSizeAddSteps: [0, 0], revertToExactBase: true
        }
    },

    [MaleBodyType.Muscular]: {
        type: MaleBodyType.Muscular,
        description: "Broad, high muscle mass. Obvious definition. Wide shoulders. Powerful frame.",
        heightRange: { minCm: 168, maxCm: 198, baseCm: 170 },
        chestRange: [104, 120],
        waistRange: [80, 92],
        hipRange: [90, 102],
        shoulderWidth: [48, 56],
        muscleToneRange: [MuscleTone.Defined, MuscleTone.Muscular],
        defaultStomachType: [StomachType.Flat, StomachType.Toned],
        bodyFatRange: [8, 18],
        postpartumModifier: {
            bustAddCm: [0, 0], waistAddCm: [0, 0], hipAddCm: [0, 0],
            stomachSoftnessShift: 0, breastSoftnessShift: 0, assSoftnessShift: 0,
            cupSizeAddSteps: [0, 0], revertToExactBase: true
        }
    },

    [MaleBodyType.Stocky]: {
        type: MaleBodyType.Stocky,
        description: "Wide, dense, heavy build. Not necessarily fat — just built thick. Low center of gravity.",
        heightRange: { minCm: 158, maxCm: 185, baseCm: 170 },
        chestRange: [100, 118],
        waistRange: [86, 102],
        hipRange: [94, 108],
        shoulderWidth: [44, 52],
        muscleToneRange: [MuscleTone.Soft, MuscleTone.Light, MuscleTone.Toned, MuscleTone.Athletic],
        defaultStomachType: [StomachType.Soft, StomachType.Rounded, StomachType.Pudgy],
        bodyFatRange: [18, 30],
        postpartumModifier: {
            bustAddCm: [0, 0], waistAddCm: [0, 0], hipAddCm: [0, 0],
            stomachSoftnessShift: 0, breastSoftnessShift: 0, assSoftnessShift: 0,
            cupSizeAddSteps: [0, 0], revertToExactBase: true
        }
    },

    [MaleBodyType.Hypermasculine]: {
        type: MaleBodyType.Hypermasculine,
        description: "Extreme muscle mass. Bodybuilder range. Very broad. Imposing physical presence.",
        heightRange: { minCm: 170, maxCm: 205, baseCm: 170 },
        chestRange: [116, 138],
        waistRange: [84, 98],
        hipRange: [96, 110],
        shoulderWidth: [54, 64],
        muscleToneRange: [MuscleTone.Muscular],
        defaultStomachType: [StomachType.Flat, StomachType.Toned],
        bodyFatRange: [6, 16],
        postpartumModifier: {
            bustAddCm: [0, 0], waistAddCm: [0, 0], hipAddCm: [0, 0],
            stomachSoftnessShift: 0, breastSoftnessShift: 0, assSoftnessShift: 0,
            cupSizeAddSteps: [0, 0], revertToExactBase: true
        }
    }
};

// ============================================================
// FEMALE BODY TYPE RECORDS
// ============================================================

export const FEMALE_BODY_TYPES: Record<FemaleBodyType, FemaleBodyTypeDefinition> = {

    [FemaleBodyType.Androgynous]: {
        type: FemaleBodyType.Androgynous,
        description: "Minimal curves. Flat chest. Straight hips. Could be mistaken for male.",
        heightRange: { minCm: 150, maxCm: 178, baseCm: 160 },
        bustWaistHipRatio: [1.0, 0.88, 1.0],
        bustRange: [74, 82],
        waistRange: [68, 76],
        hipRange: [74, 84],
        cupSizeRange: [CupSize.AA, CupSize.B],
        assSizeRange: [AssSize.Flat, AssSize.Small],
        stomachTypes: [StomachType.Flat, StomachType.Toned],
        stomachSoftness: [StomachSoftness.Hard, StomachSoftness.Firm],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft, MuscleTone.Light],
        bodyFatRange: [10, 18],
        postpartumModifier: {
            bustAddCm: [1, 3], waistAddCm: [1, 3], hipAddCm: [1, 3],
            stomachSoftnessShift: 1, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    },

    [FemaleBodyType.PetiteSlim]: {
        type: FemaleBodyType.PetiteSlim,
        description: "Short and slim. Small everything. Delicate frame. Proportionally balanced.",
        heightRange: { minCm: 145, maxCm: 160, baseCm: 152 },
        bustWaistHipRatio: [1.0, 0.78, 1.05],
        bustRange: [72, 82],
        waistRange: [56, 64],
        hipRange: [76, 86],
        cupSizeRange: [CupSize.AA, CupSize.B],
        assSizeRange: [AssSize.Small, AssSize.Moderate],
        stomachTypes: [StomachType.Flat, StomachType.Soft],
        stomachSoftness: [StomachSoftness.Firm, StomachSoftness.Soft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft, MuscleTone.Light],
        bodyFatRange: [14, 22],
        postpartumModifier: {
            bustAddCm: [1, 4], waistAddCm: [1, 3], hipAddCm: [2, 4],
            stomachSoftnessShift: 1, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    },

    [FemaleBodyType.PetiteCurvy]: {
        type: FemaleBodyType.PetiteCurvy,
        description: "Short but noticeably curved. Defined waist. Full hips relative to height.",
        heightRange: { minCm: 145, maxCm: 162, baseCm: 152 },
        bustWaistHipRatio: [1.1, 0.72, 1.2],
        bustRange: [80, 94],
        waistRange: [58, 68],
        hipRange: [88, 100],
        cupSizeRange: [CupSize.B, CupSize.E],
        assSizeRange: [AssSize.Full, AssSize.Large],
        stomachTypes: [StomachType.Flat, StomachType.Soft],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        bodyFatRange: [18, 28],
        postpartumModifier: {
            bustAddCm: [2, 5], waistAddCm: [2, 4], hipAddCm: [2, 5],
            stomachSoftnessShift: 1, breastSoftnessShift: 2, assSoftnessShift: 1,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.Willowy]: {
        type: FemaleBodyType.Willowy,
        description: "Tall, slim, elegant. Long limbs. Minimal curves. Model-adjacent proportions.",
        heightRange: { minCm: 168, maxCm: 188, baseCm: 175 },
        bustWaistHipRatio: [1.0, 0.76, 1.05],
        bustRange: [78, 88],
        waistRange: [60, 70],
        hipRange: [82, 92],
        cupSizeRange: [CupSize.A, CupSize.C],
        assSizeRange: [AssSize.Small, AssSize.Moderate],
        stomachTypes: [StomachType.Flat, StomachType.Toned],
        stomachSoftness: [StomachSoftness.Firm, StomachSoftness.Soft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Light, MuscleTone.Toned],
        bodyFatRange: [12, 20],
        postpartumModifier: {
            bustAddCm: [1, 3], waistAddCm: [1, 3], hipAddCm: [2, 4],
            stomachSoftnessShift: 1, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    },

    [FemaleBodyType.Athletic]: {
        type: FemaleBodyType.Athletic,
        description: "Toned and fit. Visible muscle. Moderate curves. Sports-built body.",
        heightRange: { minCm: 158, maxCm: 182, baseCm: 168 },
        bustWaistHipRatio: [1.0, 0.76, 1.08],
        bustRange: [80, 92],
        waistRange: [62, 72],
        hipRange: [86, 98],
        cupSizeRange: [CupSize.A, CupSize.C],
        assSizeRange: [AssSize.Moderate, AssSize.Full],
        stomachTypes: [StomachType.Flat, StomachType.Toned],
        stomachSoftness: [StomachSoftness.Hard, StomachSoftness.Firm],
        muscleToneRange: [MuscleTone.Toned, MuscleTone.Athletic, MuscleTone.Defined],
        bodyFatRange: [14, 22],
        postpartumModifier: {
            bustAddCm: [1, 3], waistAddCm: [1, 3], hipAddCm: [2, 4],
            stomachSoftnessShift: 2, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    },

    [FemaleBodyType.SlimStraight]: {
        type: FemaleBodyType.SlimStraight,
        description: "Slim with minimal hip-to-waist differential. Straight silhouette. Low body fat.",
        heightRange: { minCm: 155, maxCm: 180, baseCm: 165 },
        bustWaistHipRatio: [1.0, 0.84, 1.04],
        bustRange: [76, 86],
        waistRange: [62, 72],
        hipRange: [80, 90],
        cupSizeRange: [CupSize.AA, CupSize.B],
        assSizeRange: [AssSize.Flat, AssSize.Moderate],
        stomachTypes: [StomachType.Flat, StomachType.Soft],
        stomachSoftness: [StomachSoftness.Firm, StomachSoftness.Soft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft, MuscleTone.Light],
        bodyFatRange: [14, 22],
        postpartumModifier: {
            bustAddCm: [1, 3], waistAddCm: [1, 3], hipAddCm: [1, 3],
            stomachSoftnessShift: 1, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    },

    [FemaleBodyType.SlimCurvy]: {
        type: FemaleBodyType.SlimCurvy,
        description: "Slim overall but with noticeable curves. Defined waist. Moderate hips and bust.",
        heightRange: { minCm: 155, maxCm: 178, baseCm: 165 },
        bustWaistHipRatio: [1.08, 0.74, 1.16],
        bustRange: [82, 94],
        waistRange: [60, 70],
        hipRange: [88, 100],
        cupSizeRange: [CupSize.B, CupSize.D],
        assSizeRange: [AssSize.Moderate, AssSize.Full],
        stomachTypes: [StomachType.Flat, StomachType.Soft],
        stomachSoftness: [StomachSoftness.Firm, StomachSoftness.Soft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft, MuscleTone.Light],
        bodyFatRange: [16, 24],
        postpartumModifier: {
            bustAddCm: [2, 4], waistAddCm: [1, 3], hipAddCm: [2, 4],
            stomachSoftnessShift: 1, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    },

    [FemaleBodyType.BananaShape]: {
        type: FemaleBodyType.BananaShape,
        description: "Straight up and down. Bust, waist, and hips nearly equal.",
        heightRange: { minCm: 155, maxCm: 182, baseCm: 165 },
        bustWaistHipRatio: [1.0, 0.88, 1.02],
        bustRange: [80, 92],
        waistRange: [72, 84],
        hipRange: [82, 94],
        cupSizeRange: [CupSize.A, CupSize.C],
        assSizeRange: [AssSize.Flat, AssSize.Moderate],
        stomachTypes: [StomachType.Flat, StomachType.Soft, StomachType.Rounded],
        stomachSoftness: [StomachSoftness.Firm, StomachSoftness.Soft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft, MuscleTone.Light],
        bodyFatRange: [14, 24],
        postpartumModifier: {
            bustAddCm: [1, 3], waistAddCm: [2, 4], hipAddCm: [1, 3],
            stomachSoftnessShift: 1, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    },

    [FemaleBodyType.PearShape]: {
        type: FemaleBodyType.PearShape,
        description: "Narrow shoulders and bust. Wide hips. Weight concentrated in lower body.",
        heightRange: { minCm: 152, maxCm: 178, baseCm: 162 },
        bustWaistHipRatio: [1.0, 0.78, 1.28],
        bustRange: [78, 90],
        waistRange: [62, 74],
        hipRange: [96, 114],
        cupSizeRange: [CupSize.A, CupSize.C],
        assSizeRange: [AssSize.Full, AssSize.VeryLarge],
        stomachTypes: [StomachType.Flat, StomachType.Soft],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft, MuscleTone.Light],
        bodyFatRange: [18, 30],
        postpartumModifier: {
            bustAddCm: [2, 4], waistAddCm: [2, 4], hipAddCm: [3, 6],
            stomachSoftnessShift: 1, breastSoftnessShift: 1, assSoftnessShift: 2,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.SpoonShape]: {
        type: FemaleBodyType.SpoonShape,
        description: "Like pear but with more dramatic hip shelf.",
        heightRange: { minCm: 150, maxCm: 175, baseCm: 162 },
        bustWaistHipRatio: [1.0, 0.76, 1.35],
        bustRange: [80, 92],
        waistRange: [62, 74],
        hipRange: [102, 120],
        cupSizeRange: [CupSize.B, CupSize.D],
        assSizeRange: [AssSize.Large, AssSize.VeryLarge],
        stomachTypes: [StomachType.Soft, StomachType.Rounded],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        bodyFatRange: [22, 34],
        postpartumModifier: {
            bustAddCm: [2, 5], waistAddCm: [2, 4], hipAddCm: [3, 7],
            stomachSoftnessShift: 2, breastSoftnessShift: 2, assSoftnessShift: 2,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.HourglassSlim]: {
        type: FemaleBodyType.HourglassSlim,
        description: "Classic hourglass proportions on a slim frame.",
        heightRange: { minCm: 155, maxCm: 180, baseCm: 165 },
        bustWaistHipRatio: [1.15, 0.72, 1.18],
        bustRange: [86, 98],
        waistRange: [60, 70],
        hipRange: [90, 102],
        cupSizeRange: [CupSize.C, CupSize.E],
        assSizeRange: [AssSize.Full, AssSize.Large],
        stomachTypes: [StomachType.Flat, StomachType.Soft],
        stomachSoftness: [StomachSoftness.Firm, StomachSoftness.Soft],
        muscleToneRange: [MuscleTone.Soft, MuscleTone.Light, MuscleTone.Toned],
        bodyFatRange: [18, 26],
        postpartumModifier: {
            bustAddCm: [2, 5], waistAddCm: [2, 4], hipAddCm: [2, 5],
            stomachSoftnessShift: 1, breastSoftnessShift: 2, assSoftnessShift: 1,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.HourglassCurvy]: {
        type: FemaleBodyType.HourglassCurvy,
        description: "Full hourglass. Significant bust and hips with defined narrow waist.",
        heightRange: { minCm: 155, maxCm: 180, baseCm: 165 },
        bustWaistHipRatio: [1.2, 0.70, 1.22],
        bustRange: [92, 108],
        waistRange: [64, 74],
        hipRange: [96, 112],
        cupSizeRange: [CupSize.D, CupSize.G],
        assSizeRange: [AssSize.Large, AssSize.VeryLarge],
        stomachTypes: [StomachType.Soft, StomachType.Rounded],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft, MuscleTone.Light],
        bodyFatRange: [22, 32],
        postpartumModifier: {
            bustAddCm: [3, 6], waistAddCm: [2, 5], hipAddCm: [3, 6],
            stomachSoftnessShift: 2, breastSoftnessShift: 2, assSoftnessShift: 2,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.HourglassFullBust]: {
        type: FemaleBodyType.HourglassFullBust,
        description: "Hourglass with emphasis on very large bust.",
        heightRange: { minCm: 155, maxCm: 182, baseCm: 165 },
        bustWaistHipRatio: [1.35, 0.70, 1.18],
        bustRange: [100, 118],
        waistRange: [64, 76],
        hipRange: [92, 106],
        cupSizeRange: [CupSize.E, CupSize.J],
        assSizeRange: [AssSize.Full, AssSize.Large],
        stomachTypes: [StomachType.Soft, StomachType.Rounded],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        bodyFatRange: [22, 34],
        postpartumModifier: {
            bustAddCm: [4, 8], waistAddCm: [2, 5], hipAddCm: [2, 5],
            stomachSoftnessShift: 2, breastSoftnessShift: 2, assSoftnessShift: 1,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.TopHeavy]: {
        type: FemaleBodyType.TopHeavy,
        description: "Large bust, narrower hips. Weight and volume concentrated in upper body.",
        heightRange: { minCm: 155, maxCm: 180, baseCm: 165 },
        bustWaistHipRatio: [1.3, 0.78, 1.08],
        bustRange: [96, 114],
        waistRange: [68, 80],
        hipRange: [86, 98],
        cupSizeRange: [CupSize.D, CupSize.H],
        assSizeRange: [AssSize.Small, AssSize.Moderate],
        stomachTypes: [StomachType.Soft, StomachType.Rounded],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft, MuscleTone.Light],
        bodyFatRange: [20, 32],
        postpartumModifier: {
            bustAddCm: [4, 7], waistAddCm: [2, 5], hipAddCm: [2, 4],
            stomachSoftnessShift: 2, breastSoftnessShift: 2, assSoftnessShift: 1,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.BottomHeavy]: {
        type: FemaleBodyType.BottomHeavy,
        description: "Small to moderate bust, very wide hips and large ass.",
        heightRange: { minCm: 152, maxCm: 178, baseCm: 162 },
        bustWaistHipRatio: [1.0, 0.74, 1.38],
        bustRange: [80, 92],
        waistRange: [62, 74],
        hipRange: [106, 126],
        cupSizeRange: [CupSize.A, CupSize.C],
        assSizeRange: [AssSize.VeryLarge, AssSize.Massive],
        stomachTypes: [StomachType.Flat, StomachType.Soft, StomachType.Rounded],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        bodyFatRange: [22, 34],
        postpartumModifier: {
            bustAddCm: [2, 4], waistAddCm: [2, 4], hipAddCm: [4, 8],
            stomachSoftnessShift: 2, breastSoftnessShift: 1, assSoftnessShift: 2,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.FullFigured]: {
        type: FemaleBodyType.FullFigured,
        description: "Full body volume evenly distributed. Plus size but proportional.",
        heightRange: { minCm: 155, maxCm: 182, baseCm: 165 },
        bustWaistHipRatio: [1.12, 0.84, 1.18],
        bustRange: [100, 118],
        waistRange: [80, 96],
        hipRange: [106, 124],
        cupSizeRange: [CupSize.D, CupSize.H],
        assSizeRange: [AssSize.Large, AssSize.VeryLarge],
        stomachTypes: [StomachType.Rounded, StomachType.Pudgy, StomachType.Plump],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft, StomachSoftness.Doughy],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        bodyFatRange: [28, 40],
        postpartumModifier: {
            bustAddCm: [3, 6], waistAddCm: [3, 6], hipAddCm: [3, 6],
            stomachSoftnessShift: 1, breastSoftnessShift: 2, assSoftnessShift: 2,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.Voluptuous]: {
        type: FemaleBodyType.Voluptuous,
        description: "Very full bust and hips, defined waist despite fullness. Maximum femininity.",
        heightRange: { minCm: 155, maxCm: 182, baseCm: 165 },
        bustWaistHipRatio: [1.28, 0.72, 1.30],
        bustRange: [104, 124],
        waistRange: [70, 84],
        hipRange: [108, 128],
        cupSizeRange: [CupSize.F, CupSize.K],
        assSizeRange: [AssSize.VeryLarge, AssSize.Massive],
        stomachTypes: [StomachType.Soft, StomachType.Rounded],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft, StomachSoftness.Doughy],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        bodyFatRange: [26, 38],
        postpartumModifier: {
            bustAddCm: [4, 8], waistAddCm: [3, 6], hipAddCm: [4, 8],
            stomachSoftnessShift: 2, breastSoftnessShift: 2, assSoftnessShift: 2,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.Zaftig]: {
        type: FemaleBodyType.Zaftig,
        description: "Pleasingly plump. Full and soft everywhere.",
        heightRange: { minCm: 152, maxCm: 178, baseCm: 163 },
        bustWaistHipRatio: [1.18, 0.86, 1.22],
        bustRange: [102, 120],
        waistRange: [82, 98],
        hipRange: [108, 126],
        cupSizeRange: [CupSize.E, CupSize.I],
        assSizeRange: [AssSize.Large, AssSize.Massive],
        stomachTypes: [StomachType.Rounded, StomachType.Pudgy, StomachType.Plump],
        stomachSoftness: [StomachSoftness.VerySoft, StomachSoftness.Doughy],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        bodyFatRange: [32, 44],
        postpartumModifier: {
            bustAddCm: [3, 7], waistAddCm: [3, 6], hipAddCm: [3, 7],
            stomachSoftnessShift: 1, breastSoftnessShift: 2, assSoftnessShift: 2,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.Rubenesque]: {
        type: FemaleBodyType.Rubenesque,
        description: "Classically full figured. Painterly proportions. Very heavy and soft.",
        heightRange: { minCm: 155, maxCm: 182, baseCm: 166 },
        bustWaistHipRatio: [1.16, 0.88, 1.20],
        bustRange: [108, 130],
        waistRange: [90, 110],
        hipRange: [114, 134],
        cupSizeRange: [CupSize.F, CupSize.K],
        assSizeRange: [AssSize.VeryLarge, AssSize.Massive],
        stomachTypes: [StomachType.Rounded, StomachType.Pudgy, StomachType.Plump],
        stomachSoftness: [StomachSoftness.VerySoft, StomachSoftness.Doughy],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        bodyFatRange: [36, 50],
        postpartumModifier: {
            bustAddCm: [3, 7], waistAddCm: [3, 7], hipAddCm: [3, 7],
            stomachSoftnessShift: 1, breastSoftnessShift: 2, assSoftnessShift: 2,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.AthleticCurvy]: {
        type: FemaleBodyType.AthleticCurvy,
        description: "Toned muscle with noticeable curves. Fit but full.",
        heightRange: { minCm: 158, maxCm: 182, baseCm: 168 },
        bustWaistHipRatio: [1.1, 0.72, 1.2],
        bustRange: [86, 100],
        waistRange: [62, 74],
        hipRange: [92, 108],
        cupSizeRange: [CupSize.B, CupSize.E],
        assSizeRange: [AssSize.Full, AssSize.VeryLarge],
        stomachTypes: [StomachType.Flat, StomachType.Toned],
        stomachSoftness: [StomachSoftness.Firm, StomachSoftness.Soft],
        muscleToneRange: [MuscleTone.Toned, MuscleTone.Athletic, MuscleTone.Defined],
        bodyFatRange: [16, 26],
        postpartumModifier: {
            bustAddCm: [2, 5], waistAddCm: [2, 4], hipAddCm: [2, 5],
            stomachSoftnessShift: 2, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    },

    [FemaleBodyType.MuscularFeminine]: {
        type: FemaleBodyType.MuscularFeminine,
        description: "Visibly muscular while remaining clearly feminine.",
        heightRange: { minCm: 160, maxCm: 185, baseCm: 170 },
        bustWaistHipRatio: [1.08, 0.72, 1.15],
        bustRange: [84, 98],
        waistRange: [62, 72],
        hipRange: [90, 104],
        cupSizeRange: [CupSize.B, CupSize.D],
        assSizeRange: [AssSize.Full, AssSize.Large],
        stomachTypes: [StomachType.Flat, StomachType.Toned],
        stomachSoftness: [StomachSoftness.Hard, StomachSoftness.Firm],
        muscleToneRange: [MuscleTone.Athletic, MuscleTone.Defined, MuscleTone.Muscular],
        bodyFatRange: [12, 20],
        postpartumModifier: {
            bustAddCm: [1, 4], waistAddCm: [2, 4], hipAddCm: [2, 4],
            stomachSoftnessShift: 2, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    },

    [FemaleBodyType.PetiteHourglass]: {
        type: FemaleBodyType.PetiteHourglass,
        description: "Short with hourglass proportions. Everything balanced and defined relative to small frame.",
        heightRange: { minCm: 145, maxCm: 162, baseCm: 153 },
        bustWaistHipRatio: [1.14, 0.72, 1.16],
        bustRange: [80, 92],
        waistRange: [56, 66],
        hipRange: [84, 96],
        cupSizeRange: [CupSize.C, CupSize.E],
        assSizeRange: [AssSize.Full, AssSize.Large],
        stomachTypes: [StomachType.Flat, StomachType.Soft],
        stomachSoftness: [StomachSoftness.Firm, StomachSoftness.Soft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft, MuscleTone.Light],
        bodyFatRange: [18, 28],
        postpartumModifier: {
            bustAddCm: [2, 5], waistAddCm: [2, 4], hipAddCm: [2, 5],
            stomachSoftnessShift: 1, breastSoftnessShift: 2, assSoftnessShift: 1,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.MiniVoluptuous]: {
        type: FemaleBodyType.MiniVoluptuous,
        description: "Short but extremely full figured. Large bust and hips relative to height.",
        heightRange: { minCm: 145, maxCm: 162, baseCm: 153 },
        bustWaistHipRatio: [1.22, 0.74, 1.26],
        bustRange: [86, 100],
        waistRange: [60, 72],
        hipRange: [94, 110],
        cupSizeRange: [CupSize.D, CupSize.G],
        assSizeRange: [AssSize.Large, AssSize.VeryLarge],
        stomachTypes: [StomachType.Soft, StomachType.Rounded],
        stomachSoftness: [StomachSoftness.Soft, StomachSoftness.VerySoft],
        muscleToneRange: [MuscleTone.None, MuscleTone.Soft],
        bodyFatRange: [22, 34],
        postpartumModifier: {
            bustAddCm: [3, 6], waistAddCm: [2, 5], hipAddCm: [3, 6],
            stomachSoftnessShift: 2, breastSoftnessShift: 2, assSoftnessShift: 2,
            cupSizeAddSteps: [1, 2], revertToExactBase: false
        }
    },

    [FemaleBodyType.CompactPower]: {
        type: FemaleBodyType.CompactPower,
        description: "Short and dense. Muscular and thick. Wide hips, strong thighs, compact but heavy.",
        heightRange: { minCm: 145, maxCm: 162, baseCm: 153 },
        bustWaistHipRatio: [1.08, 0.78, 1.22],
        bustRange: [82, 96],
        waistRange: [62, 74],
        hipRange: [92, 108],
        cupSizeRange: [CupSize.C, CupSize.E],
        assSizeRange: [AssSize.Full, AssSize.VeryLarge],
        stomachTypes: [StomachType.Flat, StomachType.Toned, StomachType.Soft],
        stomachSoftness: [StomachSoftness.Firm, StomachSoftness.Soft],
        muscleToneRange: [MuscleTone.Toned, MuscleTone.Athletic, MuscleTone.Defined],
        bodyFatRange: [18, 28],
        postpartumModifier: {
            bustAddCm: [2, 5], waistAddCm: [2, 4], hipAddCm: [3, 6],
            stomachSoftnessShift: 2, breastSoftnessShift: 1, assSoftnessShift: 1,
            cupSizeAddSteps: [0, 1], revertToExactBase: false
        }
    }
};

// ============================================================
// PREGNANCY STAGE OVERRIDES
// ============================================================

export const PREGNANCY_STAGE_OVERRIDES: Record<PregnancyStage, PregnancyStageOverride> = {
    [PregnancyStage.NotPregnant]: {
        stage: PregnancyStage.NotPregnant,
        bustAddCm: 0, waistAddCm: 0, hipAddCm: 0,
        stomachTypeOverride: StomachType.Flat,
        stomachSoftnessOverride: StomachSoftness.Firm,
        cupSizeAddSteps: 0,
        breastSoftnessOverride: BreastSoftness.Firm,
        visibleBump: false, bumpSize: "NONE", lactating: false
    },
    [PregnancyStage.EarlyFirst]: {
        stage: PregnancyStage.EarlyFirst,
        bustAddCm: 2, waistAddCm: 2, hipAddCm: 1,
        stomachTypeOverride: StomachType.Soft,
        stomachSoftnessOverride: StomachSoftness.Soft,
        cupSizeAddSteps: 0,
        breastSoftnessOverride: BreastSoftness.Soft,
        visibleBump: false, bumpSize: "NONE", lactating: false
    },
    [PregnancyStage.LateFirst]: {
        stage: PregnancyStage.LateFirst,
        bustAddCm: 4, waistAddCm: 6, hipAddCm: 2,
        stomachTypeOverride: StomachType.Soft,
        stomachSoftnessOverride: StomachSoftness.Soft,
        cupSizeAddSteps: 1,
        breastSoftnessOverride: BreastSoftness.Soft,
        visibleBump: true, bumpSize: "SLIGHT", lactating: false
    },
    [PregnancyStage.EarlySecond]: {
        stage: PregnancyStage.EarlySecond,
        bustAddCm: 6, waistAddCm: 12, hipAddCm: 4,
        stomachTypeOverride: StomachType.Rounded,
        stomachSoftnessOverride: StomachSoftness.Soft,
        cupSizeAddSteps: 1,
        breastSoftnessOverride: BreastSoftness.Soft,
        visibleBump: true, bumpSize: "SMALL", lactating: false
    },
    [PregnancyStage.LateSecond]: {
        stage: PregnancyStage.LateSecond,
        bustAddCm: 8, waistAddCm: 20, hipAddCm: 6,
        stomachTypeOverride: StomachType.Rounded,
        stomachSoftnessOverride: StomachSoftness.VerySoft,
        cupSizeAddSteps: 2,
        breastSoftnessOverride: BreastSoftness.VerySoft,
        visibleBump: true, bumpSize: "MODERATE", lactating: false
    },
    [PregnancyStage.EarlyThird]: {
        stage: PregnancyStage.EarlyThird,
        bustAddCm: 10, waistAddCm: 28, hipAddCm: 8,
        stomachTypeOverride: StomachType.Plump,
        stomachSoftnessOverride: StomachSoftness.VerySoft,
        cupSizeAddSteps: 2,
        breastSoftnessOverride: BreastSoftness.VerySoft,
        visibleBump: true, bumpSize: "LARGE", lactating: true
    },
    [PregnancyStage.LateThird]: {
        stage: PregnancyStage.LateThird,
        bustAddCm: 12, waistAddCm: 36, hipAddCm: 10,
        stomachTypeOverride: StomachType.Plump,
        stomachSoftnessOverride: StomachSoftness.Doughy,
        cupSizeAddSteps: 3,
        breastSoftnessOverride: BreastSoftness.Pillowy,
        visibleBump: true, bumpSize: "VERY_LARGE", lactating: true
    },
    [PregnancyStage.FullTerm]: {
        stage: PregnancyStage.FullTerm,
        bustAddCm: 14, waistAddCm: 44, hipAddCm: 12,
        stomachTypeOverride: StomachType.Plump,
        stomachSoftnessOverride: StomachSoftness.Doughy,
        cupSizeAddSteps: 3,
        breastSoftnessOverride: BreastSoftness.Pillowy,
        visibleBump: true, bumpSize: "FULL_TERM", lactating: true
    }
};

// ─── POSTPARTUM RESOLUTION ──────────────────────────────────

function clamp(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
}

function randomInRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

function cupSizeToIndex(cup: CupSize): number {
    return Object.values(CupSize).indexOf(cup);
}

function cupSizeFromIndex(index: number): CupSize {
    const cups = Object.values(CupSize);
    return cups[clamp(index, 0, cups.length - 1)];
}

function stomachSoftnessToIndex(s: StomachSoftness): number {
    return Object.values(StomachSoftness).indexOf(s);
}

function stomachSoftnessFromIndex(i: number): StomachSoftness {
    const v = Object.values(StomachSoftness);
    return v[clamp(i, 0, v.length - 1)];
}

function breastSoftnessToIndex(s: BreastSoftness): number {
    return Object.values(BreastSoftness).indexOf(s);
}

function breastSoftnessFromIndex(i: number): BreastSoftness {
    const v = Object.values(BreastSoftness);
    return v[clamp(i, 0, v.length - 1)];
}

function assSoftnessToIndex(s: AssSoftness): number {
    return Object.values(AssSoftness).indexOf(s);
}

function assSoftnessFromIndex(i: number): AssSoftness {
    const v = Object.values(AssSoftness);
    return v[clamp(i, 0, v.length - 1)];
}

export interface PostpartumResult {
    bustCm: number;
    waistCm: number;
    hipCm: number;
    cupSize: CupSize;
    stomachSoftness: StomachSoftness;
    breastSoftness: BreastSoftness;
    assSoftness: AssSoftness;
    lactating: boolean;
}

export function resolvePostpartum(
    bodyType: FemaleBodyType,
    bustCm: number,
    waistCm: number,
    hipCm: number,
    cupSize: CupSize,
    stomachSoftness: StomachSoftness,
    breastSoftness: BreastSoftness,
    assSoftness: AssSoftness
): PostpartumResult {
    const def = FEMALE_BODY_TYPES[bodyType];
    const mod = def.postpartumModifier;

    const newBustCm = Math.round(bustCm + randomInRange(...mod.bustAddCm));
    const newWaistCm = Math.round(waistCm + randomInRange(...mod.waistAddCm));
    const newHipCm = Math.round(hipCm + randomInRange(...mod.hipAddCm));

    const cupAdd = Math.round(randomInRange(...mod.cupSizeAddSteps));
    const newCupSize = cupSizeFromIndex(clamp(cupSizeToIndex(cupSize) + cupAdd, 0, Object.values(CupSize).length - 1));

    const newStomachSoftness = stomachSoftnessFromIndex(
        clamp(stomachSoftnessToIndex(stomachSoftness) + mod.stomachSoftnessShift, 0, Object.values(StomachSoftness).length - 1)
    );
    const newBreastSoftness = breastSoftnessFromIndex(
        clamp(breastSoftnessToIndex(breastSoftness) + mod.breastSoftnessShift, 0, Object.values(BreastSoftness).length - 1)
    );
    const newAssSoftness = assSoftnessFromIndex(
        clamp(assSoftnessToIndex(assSoftness) + mod.assSoftnessShift, 0, Object.values(AssSoftness).length - 1)
    );

    return {
        bustCm: newBustCm,
        waistCm: newWaistCm,
        hipCm: newHipCm,
        cupSize: newCupSize,
        stomachSoftness: newStomachSoftness,
        breastSoftness: newBreastSoftness,
        assSoftness: newAssSoftness,
        lactating: true    // remains lactating for a period post-birth
    };
}