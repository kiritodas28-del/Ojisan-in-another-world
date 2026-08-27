// ============================================================
// FILE: ageBodyProfile.ts
// ============================================================
// Age-based body classification system
// Works across all races using apparent age
// Petite = heightTag VeryShort or Short
// NonPetite = everything above

import { FemaleBodyType, HeightTag, CupSize, AssSize, BreastSoftness, AssSoftness, StomachType, StomachSoftness } from "./enums";
import { AgeAppliedMeasurements, applyAgeMod } from "./ageBodyProfile";
import { PREGNANCY_STAGE_OVERRIDES } from "./bodyTypes";
import { FemaleMeasurements } from "./physicalCore";


// ─── AGE BODY PROFILE ───────────────────────────────────────
// Defines how body characteristics shift with age category
// Applied on top of base body type measurements
// These are modifiers, not replacements

export interface AgeBodyModifier {
    category: AgeBodyCategory;
    petiteCategory: PetiteCategory;
    // Measurement modifiers — additive cm on top of body type base
    bustAddCm: [number, number];
    waistAddCm: [number, number];
    hipAddCm: [number, number];
    // Cup size shift — steps added to base cup
    cupSizeAddSteps: [number, number];
    // Ass size shift — steps added to base ass size
    assSizeAddSteps: [number, number];
    // Softness shifts — how many enum steps softer
    breastSoftnessShift: [number, number];
    assSoftnessShift: [number, number];
    stomachSoftnessShift: [number, number];
    // Stomach type bias — which stomach types are more likely
    stomachTypeBias: StomachType[];
    // Body fat modifier — additive percentage
    bodyFatAddPercent: [number, number];
    // Body description tags for this age/petite combo
    descriptorTags: string[];
    // Allowed body types for this combination
    // These are the body types that make sense for this age/petite combo
    // Used as a filter/weight multiplier on top of population config
    bodyTypeBias: Partial<Record<FemaleBodyType, number>>;
}

// ─── AGE CATEGORY RESOLVER ──────────────────────────────────

export function getAgeBodyCategory(apparentAge: number): AgeBodyCategory {
    if (apparentAge < 30) return AgeBodyCategory.Young;
    if (apparentAge < 35) return AgeBodyCategory.RipeningMilf;
    if (apparentAge < 43) return AgeBodyCategory.RipeMilf;
    if (apparentAge < 50) return AgeBodyCategory.MatureMilf;
    return AgeBodyCategory.OldMilf;
}

export function getPetiteCategory(heightTag: HeightTag): PetiteCategory {
    if (heightTag === HeightTag.VeryShort || heightTag === HeightTag.Short) {
        return PetiteCategory.Petite;
    }
    return PetiteCategory.NonPetite;
}

// ─── AGE BODY MODIFIER DEFINITIONS ─────────────────────────

export const AGE_BODY_MODIFIERS: Record<AgeBodyCategory, Record<PetiteCategory, AgeBodyModifier>> = {

    // ── YOUNG (18-30) ────────────────────────────────────────

    [AgeBodyCategory.Young]: {
        [PetiteCategory.Petite]: {
            category: AgeBodyCategory.Young,
            petiteCategory: PetiteCategory.Petite,
            bustAddCm: [0, 2],
            waistAddCm: [0, 1],
            hipAddCm: [0, 2],
            cupSizeAddSteps: [0, 0],
            assSizeAddSteps: [0, 0],
            breastSoftnessShift: [0, 0],
            assSoftnessShift: [0, 0],
            stomachSoftnessShift: [0, 0],
            stomachTypeBias: [StomachType.Flat, StomachType.Toned, StomachType.Soft],
            bodyFatAddPercent: [0, 2],
            descriptorTags: [
                "young petite body",
                "small tight frame",
                "youthful proportions",
                "tight skin",
                "perky",
                "compact and firm"
            ],
            bodyTypeBias: {
                [FemaleBodyType.PetiteSlim]: 5,
                [FemaleBodyType.PetiteCurvy]: 4,
                [FemaleBodyType.PetiteHourglass]: 4,
                [FemaleBodyType.MiniVoluptuous]: 3,
                [FemaleBodyType.CompactPower]: 3,
                [FemaleBodyType.Athletic]: 3
            }
        },
        [PetiteCategory.NonPetite]: {
            category: AgeBodyCategory.Young,
            petiteCategory: PetiteCategory.NonPetite,
            bustAddCm: [0, 3],
            waistAddCm: [0, 1],
            hipAddCm: [0, 3],
            cupSizeAddSteps: [0, 0],
            assSizeAddSteps: [0, 0],
            breastSoftnessShift: [0, 0],
            assSoftnessShift: [0, 0],
            stomachSoftnessShift: [0, 0],
            stomachTypeBias: [StomachType.Flat, StomachType.Toned, StomachType.Soft],
            bodyFatAddPercent: [0, 3],
            descriptorTags: [
                "young body",
                "tight skin",
                "firm everywhere",
                "youthful figure",
                "high and perky",
                "taut"
            ],
            bodyTypeBias: {
                [FemaleBodyType.Athletic]: 4,
                [FemaleBodyType.SlimStraight]: 4,
                [FemaleBodyType.SlimCurvy]: 5,
                [FemaleBodyType.HourglassSlim]: 4,
                [FemaleBodyType.Willowy]: 3,
                [FemaleBodyType.PearShape]: 4,
                [FemaleBodyType.AthleticCurvy]: 3
            }
        }
    },

    // ── RIPENING MILF (30-35) ────────────────────────────────

    [AgeBodyCategory.RipeningMilf]: {
        [PetiteCategory.Petite]: {
            category: AgeBodyCategory.RipeningMilf,
            petiteCategory: PetiteCategory.Petite,
            bustAddCm: [1, 4],
            waistAddCm: [1, 3],
            hipAddCm: [2, 5],
            cupSizeAddSteps: [0, 1],
            assSizeAddSteps: [0, 1],
            breastSoftnessShift: [0, 1],
            assSoftnessShift: [0, 1],
            stomachSoftnessShift: [0, 1],
            stomachTypeBias: [StomachType.Flat, StomachType.Soft, StomachType.Rounded],
            bodyFatAddPercent: [2, 5],
            descriptorTags: [
                "ripening petite body",
                "small but filling out",
                "beginning to soften",
                "compact curves developing",
                "petite but heavy",
                "tight frame with growing softness"
            ],
            bodyTypeBias: {
                [FemaleBodyType.PetiteCurvy]: 5,
                [FemaleBodyType.PetiteHourglass]: 5,
                [FemaleBodyType.MiniVoluptuous]: 4,
                [FemaleBodyType.CompactPower]: 3,
                [FemaleBodyType.PetiteSlim]: 2
            }
        },
        [PetiteCategory.NonPetite]: {
            category: AgeBodyCategory.RipeningMilf,
            petiteCategory: PetiteCategory.NonPetite,
            bustAddCm: [2, 5],
            waistAddCm: [1, 4],
            hipAddCm: [2, 6],
            cupSizeAddSteps: [0, 1],
            assSizeAddSteps: [0, 1],
            breastSoftnessShift: [0, 1],
            assSoftnessShift: [0, 1],
            stomachSoftnessShift: [0, 1],
            stomachTypeBias: [StomachType.Soft, StomachType.Flat, StomachType.Rounded],
            bodyFatAddPercent: [2, 6],
            descriptorTags: [
                "ripening figure",
                "beginning to fill out",
                "curves deepening",
                "softening at the edges",
                "fuller than she was",
                "womanly and warm"
            ],
            bodyTypeBias: {
                [FemaleBodyType.HourglassCurvy]: 4,
                [FemaleBodyType.HourglassSlim]: 4,
                [FemaleBodyType.SlimCurvy]: 4,
                [FemaleBodyType.PearShape]: 5,
                [FemaleBodyType.AthleticCurvy]: 4,
                [FemaleBodyType.TopHeavy]: 3
            }
        }
    },

    // ── RIPE MILF (35-43) ────────────────────────────────────

    [AgeBodyCategory.RipeMilf]: {
        [PetiteCategory.Petite]: {
            category: AgeBodyCategory.RipeMilf,
            petiteCategory: PetiteCategory.Petite,
            bustAddCm: [3, 7],
            waistAddCm: [2, 5],
            hipAddCm: [3, 7],
            cupSizeAddSteps: [1, 2],
            assSizeAddSteps: [1, 1],
            breastSoftnessShift: [1, 2],
            assSoftnessShift: [1, 1],
            stomachSoftnessShift: [1, 2],
            stomachTypeBias: [StomachType.Soft, StomachType.Rounded, StomachType.Pudgy],
            bodyFatAddPercent: [4, 9],
            descriptorTags: [
                "ripe petite milf",
                "short and heavy with curves",
                "dense soft body on small frame",
                "full breasts pulling down",
                "wide hips for her height",
                "compact and loaded"
            ],
            bodyTypeBias: {
                [FemaleBodyType.MiniVoluptuous]: 6,
                [FemaleBodyType.PetiteHourglass]: 5,
                [FemaleBodyType.PetiteCurvy]: 5,
                [FemaleBodyType.CompactPower]: 4,
                [FemaleBodyType.SpoonShape]: 3
            }
        },
        [PetiteCategory.NonPetite]: {
            category: AgeBodyCategory.RipeMilf,
            petiteCategory: PetiteCategory.NonPetite,
            bustAddCm: [4, 9],
            waistAddCm: [2, 6],
            hipAddCm: [4, 9],
            cupSizeAddSteps: [1, 2],
            assSizeAddSteps: [1, 2],
            breastSoftnessShift: [1, 2],
            assSoftnessShift: [1, 2],
            stomachSoftnessShift: [1, 2],
            stomachTypeBias: [StomachType.Soft, StomachType.Rounded, StomachType.Pudgy],
            bodyFatAddPercent: [5, 12],
            descriptorTags: [
                "ripe milf body",
                "heavy and soft",
                "fully filled out",
                "breasts pulling down with weight",
                "wide and full everywhere",
                "ripe curves",
                "thick thighs",
                "soft stomach"
            ],
            bodyTypeBias: {
                [FemaleBodyType.HourglassCurvy]: 6,
                [FemaleBodyType.HourglassFullBust]: 5,
                [FemaleBodyType.Voluptuous]: 5,
                [FemaleBodyType.TopHeavy]: 4,
                [FemaleBodyType.BottomHeavy]: 4,
                [FemaleBodyType.FullFigured]: 4,
                [FemaleBodyType.SpoonShape]: 4
            }
        }
    },

    // ── MATURE MILF (43-50) ──────────────────────────────────

    [AgeBodyCategory.MatureMilf]: {
        [PetiteCategory.Petite]: {
            category: AgeBodyCategory.MatureMilf,
            petiteCategory: PetiteCategory.Petite,
            bustAddCm: [5, 10],
            waistAddCm: [3, 7],
            hipAddCm: [4, 9],
            cupSizeAddSteps: [1, 2],
            assSizeAddSteps: [1, 2],
            breastSoftnessShift: [2, 3],
            assSoftnessShift: [2, 2],
            stomachSoftnessShift: [2, 3],
            stomachTypeBias: [StomachType.Rounded, StomachType.Pudgy, StomachType.Soft],
            bodyFatAddPercent: [6, 13],
            descriptorTags: [
                "mature petite milf",
                "small woman gone soft and heavy",
                "large sagging breasts on short frame",
                "wide hips relative to height",
                "dense soft body",
                "compact and overflowing",
                "short and abundant"
            ],
            bodyTypeBias: {
                [FemaleBodyType.MiniVoluptuous]: 7,
                [FemaleBodyType.PetiteCurvy]: 5,
                [FemaleBodyType.CompactPower]: 4,
                [FemaleBodyType.SpoonShape]: 4,
                [FemaleBodyType.PetiteHourglass]: 3
            }
        },
        [PetiteCategory.NonPetite]: {
            category: AgeBodyCategory.MatureMilf,
            petiteCategory: PetiteCategory.NonPetite,
            bustAddCm: [6, 12],
            waistAddCm: [4, 9],
            hipAddCm: [5, 11],
            cupSizeAddSteps: [2, 3],
            assSizeAddSteps: [1, 2],
            breastSoftnessShift: [2, 3],
            assSoftnessShift: [2, 3],
            stomachSoftnessShift: [2, 3],
            stomachTypeBias: [StomachType.Rounded, StomachType.Pudgy, StomachType.Plump],
            bodyFatAddPercent: [8, 16],
            descriptorTags: [
                "mature milf",
                "heavily built",
                "breasts long and sagging",
                "soft everywhere",
                "wide and deep curves",
                "full figure gone soft",
                "thick and heavy",
                "abundantly soft"
            ],
            bodyTypeBias: {
                [FemaleBodyType.Voluptuous]: 7,
                [FemaleBodyType.FullFigured]: 6,
                [FemaleBodyType.Zaftig]: 5,
                [FemaleBodyType.HourglassFullBust]: 5,
                [FemaleBodyType.BottomHeavy]: 4,
                [FemaleBodyType.Rubenesque]: 3
            }
        }
    },

    // ── OLD MILF (50+) ───────────────────────────────────────

    [AgeBodyCategory.OldMilf]: {
        [PetiteCategory.Petite]: {
            category: AgeBodyCategory.OldMilf,
            petiteCategory: PetiteCategory.Petite,
            bustAddCm: [7, 14],
            waistAddCm: [4, 9],
            hipAddCm: [4, 10],
            cupSizeAddSteps: [2, 3],
            assSizeAddSteps: [1, 2],
            breastSoftnessShift: [3, 4],
            assSoftnessShift: [2, 3],
            stomachSoftnessShift: [3, 4],
            stomachTypeBias: [StomachType.Pudgy, StomachType.Plump, StomachType.Rounded],
            bodyFatAddPercent: [8, 16],
            descriptorTags: [
                "old petite milf",
                "aged small body",
                "heavy breasts hanging low on small frame",
                "soft and dense everywhere",
                "wide hips on short body",
                "years of gravity and softness",
                "compact but heavily loaded"
            ],
            bodyTypeBias: {
                [FemaleBodyType.MiniVoluptuous]: 8,
                [FemaleBodyType.CompactPower]: 5,
                [FemaleBodyType.SpoonShape]: 5,
                [FemaleBodyType.PetiteCurvy]: 4
            }
        },
        [PetiteCategory.NonPetite]: {
            category: AgeBodyCategory.OldMilf,
            petiteCategory: PetiteCategory.NonPetite,
            bustAddCm: [8, 16],
            waistAddCm: [5, 12],
            hipAddCm: [5, 12],
            cupSizeAddSteps: [2, 3],
            assSizeAddSteps: [2, 3],
            breastSoftnessShift: [3, 4],
            assSoftnessShift: [3, 4],
            stomachSoftnessShift: [3, 4],
            stomachTypeBias: [StomachType.Plump, StomachType.Pudgy, StomachType.Rounded],
            bodyFatAddPercent: [10, 20],
            descriptorTags: [
                "old milf",
                "heavily aged body",
                "breasts long and pendulous",
                "soft flabby stomach",
                "very wide hips",
                "heavy everywhere",
                "years written on the body",
                "abundantly aged",
                "thick and doughy"
            ],
            bodyTypeBias: {
                [FemaleBodyType.Rubenesque]: 8,
                [FemaleBodyType.Zaftig]: 7,
                [FemaleBodyType.FullFigured]: 6,
                [FemaleBodyType.Voluptuous]: 5,
                [FemaleBodyType.BottomHeavy]: 4,
                [FemaleBodyType.HourglassFullBust]: 4
            }
        }
    }
};

// ─── AGE MODIFIER APPLICATION ───────────────────────────────

import { FemaleMeasurements } from "./physicalCore";
import { FEMALE_BODY_TYPES } from "./bodyTypes";

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

function assSizeToIndex(ass: AssSize): number {
    return Object.values(AssSize).indexOf(ass);
}

function assSizeFromIndex(index: number): AssSize {
    const sizes = Object.values(AssSize);
    return sizes[clamp(index, 0, sizes.length - 1)];
}

function breastSoftnessToIndex(s: BreastSoftness): number {
    return Object.values(BreastSoftness).indexOf(s);
}

function breastSoftnessFromIndex(index: number): BreastSoftness {
    const values = Object.values(BreastSoftness);
    return values[clamp(index, 0, values.length - 1)];
}

function assSoftnessToIndex(s: AssSoftness): number {
    return Object.values(AssSoftness).indexOf(s);
}

function assSoftnessFromIndex(index: number): AssSoftness {
    const values = Object.values(AssSoftness);
    return values[clamp(index, 0, values.length - 1)];
}

function stomachSoftnessToIndex(s: StomachSoftness): number {
    return Object.values(StomachSoftness).indexOf(s);
}

function stomachSoftnessFromIndex(index: number): StomachSoftness {
    const values = Object.values(StomachSoftness);
    return values[clamp(index, 0, values.length - 1)];
}

function physicsCapBust(bustCm: number, heightCm: number): number {
    return Math.min(bustCm, heightCm * 0.72);
}

function physicsCapHip(hipCm: number, heightCm: number): number {
    return Math.min(hipCm, heightCm * 0.80);
}

export interface AgeAppliedMeasurements {
    measurements: FemaleMeasurements;
    breastSoftness: BreastSoftness;
    assSoftness: AssSoftness;
    descriptorTags: string[];
    ageCategory: AgeBodyCategory;
    petiteCategory: PetiteCategory;
}

export function applyAgeMod(
    measurements: FemaleMeasurements,
    breastSoftness: BreastSoftness,
    assSoftness: AssSoftness,
    apparentAge: number
): AgeAppliedMeasurements {
    const ageCategory = getAgeBodyCategory(apparentAge);
    const petiteCategory = getPetiteCategory(measurements.heightTag);
    const mod = AGE_BODY_MODIFIERS[ageCategory][petiteCategory];

    // Bust
    const bustAdd = Math.round(randomInRange(...mod.bustAddCm));
    let newBust = physicsCapBust(measurements.bustCm + bustAdd, measurements.heightCm);

    // Waist
    const waistAdd = Math.round(randomInRange(...mod.waistAddCm));
    const newWaist = clamp(
        measurements.waistCm + waistAdd,
        measurements.heightCm * 0.35,
        measurements.heightCm * 0.60
    );

    // Hip
    const hipAdd = Math.round(randomInRange(...mod.hipAddCm));
    const newHip = physicsCapHip(measurements.hipCm + hipAdd, measurements.heightCm);

    // Cup size
    const cupAdd = Math.round(randomInRange(...mod.cupSizeAddSteps));
    const newCup = cupSizeFromIndex(cupSizeToIndex(measurements.cupSize) + cupAdd);

    // Ass size
    const assAdd = Math.round(randomInRange(...mod.assSizeAddSteps));
    const newAss = assSizeFromIndex(assSizeToIndex(measurements.assSize) + assAdd);

    // Breast softness
    const bsShift = Math.round(randomInRange(...mod.breastSoftnessShift));
    const newBreastSoftness = breastSoftnessFromIndex(breastSoftnessToIndex(breastSoftness) + bsShift);

    // Ass softness
    const asShift = Math.round(randomInRange(...mod.assSoftnessShift));
    const newAssSoftness = assSoftnessFromIndex(assSoftnessToIndex(assSoftness) + asShift);

    // Stomach softness
    const ssShift = Math.round(randomInRange(...mod.stomachSoftnessShift));
    const newStomachSoftness = stomachSoftnessFromIndex(
        stomachSoftnessToIndex(measurements.stomachSoftness) + ssShift
    );

    // Stomach type bias
    const stomachType = mod.stomachTypeBias[
        Math.floor(Math.random() * mod.stomachTypeBias.length)
    ];

    // Body fat
    const fatAdd = Math.round(randomInRange(...mod.bodyFatAddPercent));
    const newBodyFat = clamp(measurements.bodyFatPercent + fatAdd, 10, 55);

    const updatedMeasurements: FemaleMeasurements = {
        ...measurements,
        bustCm: newBust,
        waistCm: newWaist,
        hipCm: newHip,
        cupSize: newCup,
        assSize: newAss,
        stomachType,
        stomachSoftness: newStomachSoftness,
        bodyFatPercent: newBodyFat,
        effectiveBustCm: newBust,
        effectiveWaistCm: newWaist,
        effectiveHipCm: newHip,
        effectiveCupSize: newCup,
        effectiveStomachType: stomachType,
        effectiveStomachSoftness: newStomachSoftness
    };

    return {
        measurements: updatedMeasurements,
        breastSoftness: newBreastSoftness,
        assSoftness: newAssSoftness,
        descriptorTags: mod.descriptorTags,
        ageCategory,
        petiteCategory
    };
}

// ─── AGE-BIASED BODY TYPE SELECTION ─────────────────────────
// Call this instead of plain weightedRandom for female body types
// Applies age and petite bias on top of population config weights

export function selectBodyTypeWithAgeBias(
    baseWeights: Record<FemaleBodyType, number>,
    raceBias: Partial<Record<FemaleBodyType, number>>,
    apparentAge: number,
    heightTag: HeightTag
): FemaleBodyType {
    // Determine petite from height before body type is assigned
    // Use a threshold: petite if height <= 162cm
    const isPetite = isPetiteByHeightTag(heightTag);
    const petiteCategory = isPetite ? PetiteCategory.Petite : PetiteCategory.NonPetite;
    const ageCategory = getAgeBodyCategory(apparentAge);
    const ageMod = AGE_BODY_MODIFIERS[ageCategory][petiteCategory];

    const combined = { ...baseWeights };

    // Apply race bias
    for (const [key, mult] of Object.entries(raceBias) as [FemaleBodyType, number][]) {
        combined[key] = (combined[key] || 0) * mult;
    }

    // Apply age body type bias
    for (const [key, add] of Object.entries(ageMod.bodyTypeBias) as [FemaleBodyType, number][]) {
        combined[key] = (combined[key] || 0) + add;
    }

    // For petite: suppress non-petite body types
    if (isPetite) {
        const nonPetiteTypes: FemaleBodyType[] = [
            FemaleBodyType.Willowy,
            FemaleBodyType.SlimStraight,
            FemaleBodyType.SlimCurvy,
            FemaleBodyType.BananaShape,
            FemaleBodyType.PearShape,
            FemaleBodyType.SpoonShape,
            FemaleBodyType.HourglassSlim,
            FemaleBodyType.HourglassCurvy,
            FemaleBodyType.HourglassFullBust,
            FemaleBodyType.TopHeavy,
            FemaleBodyType.BottomHeavy,
            FemaleBodyType.FullFigured,
            FemaleBodyType.Voluptuous,
            FemaleBodyType.Zaftig,
            FemaleBodyType.Rubenesque,
            FemaleBodyType.AthleticCurvy,
            FemaleBodyType.MuscularFeminine
        ];
        for (const t of nonPetiteTypes) {
            combined[t] = Math.max(0, (combined[t] || 0) * 0.1);
        }
    }

    // For non-petite: suppress petite body types
    if (!isPetite) {
        const petiteTypes: FemaleBodyType[] = [
            FemaleBodyType.PetiteSlim,
            FemaleBodyType.PetiteCurvy,
            FemaleBodyType.PetiteHourglass,
            FemaleBodyType.MiniVoluptuous,
            FemaleBodyType.CompactPower
        ];
        for (const t of petiteTypes) {
            combined[t] = Math.max(0, (combined[t] || 0) * 0.1);
        }
    }

    // Weighted random from combined
    const entries = Object.entries(combined) as [FemaleBodyType, number][];
    const filtered = entries.filter(([, w]) => w > 0);
    const total = filtered.reduce((sum, [, w]) => sum + w, 0);
    let roll = Math.random() * total;
    for (const [key, weight] of filtered) {
        roll -= weight;
        if (roll <= 0) return key;
    }
    return filtered[filtered.length - 1][0];
}

export function isPetiteByHeightTag(heightTag: import("./enums").HeightTag): boolean {
    return (
        heightTag === import("./enums").HeightTag.VeryShort ||
        heightTag === import("./enums").HeightTag.Short
    );
    // VeryShort = <150cm female
    // Short = 150-158cm female
    // Consistent with HeightTag definition
}

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
