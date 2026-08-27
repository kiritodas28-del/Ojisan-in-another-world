// ============================================================================
// APPEARANCE OPTIONS & BODY SHAPE MEASUREMENT RULES SEED DATA
// ============================================================================
// Static reference data for procedural appearance generation and authored
// character creation. Used by NPC population engine and validation.

import {
    BodyShape,
    type BodyCategory,
    type SkinTone,
    type PubicHairStyle,
    type UnderarmHairStyle,
    type MusclePresence,
    type AssSize,
    type AssFirmness,
    type AssType,
    type BreastSize,
    type BreastCupSize,
    type BreastShape,
    type BreastFirmness,
    type HeightTag,
    type HairStyle,
    type HairColor,
} from "../schemas/schemas";


export function getHeightTag(heightCm: number): HeightTag {
    if (heightCm < 150) return "Very Petite";
    if (heightCm < 155) return "Petite";
    if (heightCm < 160) return "Short";
    if (heightCm < 164) return "Below Average";
    if (heightCm < 168) return "Average";
    if (heightCm < 173) return "Above Average";
    if (heightCm < 178) return "Tall";
    return "Very Tall";
}
// ---------------------------------------------------------------------------
// SKIN TONES
// ---------------------------------------------------------------------------
export const SKIN_TONES: SkinTone[] = [
    "Very pale",
    "Pale",
    "Fair",
    "Light neutral",
    "Light warm / olive",
    "Medium warm / tan",
    "Medium brown",
    "Deep brown",
    "Deep",
];

// ---------------------------------------------------------------------------
// BODY HAIR STYLES
// ---------------------------------------------------------------------------
export const PUBIC_HAIR_STYLES: PubicHairStyle[] = [
    "Bare",
    "Landing strip",
    "Neatly trimmed",
    "Natural trimmed",
    "Full natural",
];

export const UNDERARM_HAIR_STYLES: UnderarmHairStyle[] = [
    "Bare",
    "Light stubble",
    "Natural",
];

// ---------------------------------------------------------------------------
// MUSCLE PRESENCE
// ---------------------------------------------------------------------------
export const MUSCLE_PRESENCE_LEVELS: MusclePresence[] = [
    "None visible",
    "Faint suggestion",
    "Lightly toned",
    "Clearly toned",
    "Defined",
    "Athletic defined",
    "Muscular",
];

// ---------------------------------------------------------------------------
// ASS SIZES
// ---------------------------------------------------------------------------
export const ASS_SIZES: AssSize[] = [
    "Small and rounded",
    "Compact and firm",
    "Medium rounded",
    "Full rounded",
    "Full rounded with spread",
    "Large, prominent",
    "Large and soft",
    "Heavy with significant mass",
    "Shelf ass",
    "Soft and heavy",
    "Enormous",
];

export const ASS_FIRMNESS_LEVELS: AssFirmness[] = [
    "Firm",
    "Soft",
    "Very soft",
];

export const ASS_TYPES: {
    type: AssType;
    synonyms: string[];
    hipSizeRange: [number, number]; // in cm
}[] = [
        { type: "Petite / Slim", synonyms: ["Tiny", "slender", "narrow", "flat", "minimal"], hipSizeRange: [81, 84] },
        { type: "Compact / Lean", synonyms: ["Petite", "trim", "compact", "slight", "tight"], hipSizeRange: [86, 89] },
        { type: "Average / Balanced", synonyms: ["Standard", "regular", "moderate", "medium", "average"], hipSizeRange: [91, 94] },
        { type: "Curvy / Defined", synonyms: ["Shapely", "peach", "rounded", "plump", "noticeable"], hipSizeRange: [96, 99] },
        { type: "Full / Prominent", synonyms: ["Voluminous", "juicy", "generous", "pear-shaped", "prominent"], hipSizeRange: [101, 107] },
        { type: "Stacked / Amplified", synonyms: ["Thick", "bubble", "loaded", "ample", "substantial"], hipSizeRange: [109, 114] },
        { type: "Heavy-Set / Wide", synonyms: ["Dump truck", "robust", "heavy", "broad", "wide-set"], hipSizeRange: [116, 122] },
        { type: "Extremely Voluminous", synonyms: ["Massive", "oversized", "cavernous", "heavy-duty"], hipSizeRange: [124, 132] },
        { type: "Super-Plump / Hyper-Scale", synonyms: ["Enormous", "immense", "extreme", "extra-padded"], hipSizeRange: [134, 145] },
        { type: "Maximum / Ultra-Wide", synonyms: ["Colossal", "monumental", "maximum-capacity"], hipSizeRange: [147, 157] },
    ];

// ---------------------------------------------------------------------------
// BREAST SIZES
// ---------------------------------------------------------------------------
export const BREAST_SIZES: BreastSize[] = [
    "Barely there",
    "Small",
    "Small full",
    "Medium firm",
    "Medium full",
    "Full",
    "Large",
    "Large heavy",
    "Very large",
    "Massive",
    "Enormous",
];

export const BREAST_CUP_SIZES: BreastCupSize[] = [
    "AA / A",
    "B",
    "C",
    "D",
    "DD / E",
    "DDD / F",
    "G",
    "H",
    "I",
    "J",
];

export const BREAST_SHAPES: BreastShape[] = [
    "Perky",
    "Natural droop",
    "Teardrop",
    "Wide-set",
    "Close-set",
    "Conical",
    "Round",
    "Hanging",
    "Torpedo",
    "Bell-shaped",
    "Side-spread",
    "Forward-projection",
];

export const BREAST_FIRMNESS_LEVELS: BreastFirmness[] = [
    "Firm",
    "Soft",
    "Loose",
    "Fully hanging",
];

// ---------------------------------------------------------------------------
// HEIGHT TAGS
// ---------------------------------------------------------------------------
export const HEIGHT_TAGS: { tag: HeightTag; minCm: number; maxCm: number }[] = [
    { tag: "Very Petite", minCm: 130, maxCm: 149 },
    { tag: "Petite", minCm: 150, maxCm: 154 },
    { tag: "Short", minCm: 155, maxCm: 159 },
    { tag: "Below Average", minCm: 160, maxCm: 163 },
    { tag: "Average", minCm: 164, maxCm: 167 },
    { tag: "Above Average", minCm: 168, maxCm: 172 },
    { tag: "Tall", minCm: 173, maxCm: 177 },
    { tag: "Very Tall", minCm: 178, maxCm: 200 },
];

// ---------------------------------------------------------------------------
// BODY SHAPES
// ---------------------------------------------------------------------------
export const BODY_SHAPES: BodyShape[] = [
    BodyShape.Hourglass,
    BodyShape.PearTriangle,
    BodyShape.AppleRound,
    BodyShape.RectangleStraight,
    BodyShape.InvertedTriangle,
    BodyShape.Spoon,
    BodyShape.Diamond,
    BodyShape.Oval,
    BodyShape.Athletic,
    BodyShape.TopHourglass,
    BodyShape.BottomHourglass,
    BodyShape.Bell,
    BodyShape.Lollipop,
    BodyShape.Cornet,
];

// ---------------------------------------------------------------------------
// BODY CATEGORIES
// ---------------------------------------------------------------------------
export const BODY_CATEGORIES: {
    category: BodyCategory;
    score: number;
    definition: string;
}[] = [
        {
            category: "Ethereal & Delicate",
            score: 9,
            definition: "Visually light, fragile, and fairy-like. Pleasing through fineness, grace, and soft innocence rather than overt eroticism.",
        },
        {
            category: "Harmonious & Balanced",
            score: 10,
            definition: "The most universally pleasing. The eye flows smoothly from shoulders to waist to hips. Natural, elegant, and effortlessly attractive.",
        },
        {
            category: "Toned & Athletic",
            score: 8.5,
            definition: "Visually clean, energetic, and healthy. The eye enjoys firmness, vitality, and proportion. Fresh, lively, and lightly sensual.",
        },
        {
            category: "Straight & Sleek",
            score: 7.5,
            definition: "Visually clean and minimal. A smooth, uninterrupted vertical line. Modern, neat, and quietly elegant.",
        },
        {
            category: "Soft & Feminine",
            score: 8,
            definition: "Visually warm, full, and deeply womanly. Round, smooth curves that feel comforting, mature, and richly feminine.",
        },
        {
            category: "Lower-Curve & Exotic",
            score: 7,
            definition: "Visually striking because the lower body dominates. The eye is drawn to full hips and thighs. Exotic and memorable but less balanced.",
        },
        {
            category: "Bottom-Heavy Hourglass",
            score: 8,
            definition: "An hourglass with extra lower volume. Dramatic waist-to-hip contrast, but the lower body is clearly fuller than the upper.",
        },
        {
            category: "Erotic Bombshell",
            score: 7,
            definition: "Visually dramatic and bust-forward. The eye goes first to the chest, then the small waist. Bold, glamorous, pin-up appeal.",
        },
        {
            category: "Fantasy & Hyper-Exotic",
            score: 6,
            definition: "Visually extreme and unreal. Fascinating like a fantasy illustration, but not natural. Pleasure comes from shock, rarity, or fetish.",
        },
        {
            category: "Realistically Impossible",
            score: 2,
            definition: "Visually jarring and physically implausible. Proportions are so distorted they break natural human beauty. Unsettling rather than attractive.",
        },
    ];

// ---------------------------------------------------------------------------
// HAIR STYLES & COLORS
// ---------------------------------------------------------------------------
export const HAIR_STYLES: HairStyle[] = [
    "Buzz Cut",
    "Crew Cut",
    "Shaved Head",
    "Fade",
    "Pixie Cut",
    "Taper Cut",
    "Undercut",
    "Side Part",
    "Curly Crop",
    "Short Bangs",
    "Bob",
    "Long Bob",
    "Shag",
    "Curly Shag",
    "Shoulder-Length",
    "Twists",
    "Long & Straight",
    "Long & Wavy",
    "Long & Curly",
    "Dreadlocks / Locs",
    "Classic Long",
    "Long Ponytail",
    "Long Braid",
    "Long Messy Bun",
    "Long Glossy Waves",
    "Long Sleek Ponytail",
];

export const HAIR_COLORS: HairColor[] = [
    "Jet Black",
    "Soft Black",
    "Dark Brown",
    "Medium Brown",
    "Light Brown",
    "Chestnut Brown",
    "Auburn",
    "Copper Red",
    "Strawberry Blonde",
    "Golden Blonde",
    "Platinum Blonde",
    "Grey",
    "White",
    "Salt & Pepper",
    "Pastel Pink",
    "Hot Pink",
    "Lavender",
    "Deep Purple",
    "Electric Blue",
    "Teal",
];

// ---------------------------------------------------------------------------
// BODY SHAPE → MEASUREMENT RULES
// ---------------------------------------------------------------------------
export interface BodyShapeMeasurementRule {
    bustRange: [number, number];
    waistRange: [number, number];
    hipRange: [number, number];
    cupSizes: string[];
    breastSizes: string[];
    assSizes: string[];
    assTypes: string[];
}

export const BODY_SHAPE_MEASUREMENT_RULES: Record<BodyShape, BodyShapeMeasurementRule> = {
    [BodyShape.Hourglass]: {
        bustRange: [84, 110],
        waistRange: [58, 75],
        hipRange: [86, 112],
        cupSizes: ["C", "D", "DD / E", "DDD / F"],
        breastSizes: ["Medium full", "Full", "Large"],
        assSizes: ["Medium rounded", "Full rounded", "Full rounded with spread"],
        assTypes: ["Average / Balanced", "Curvy / Defined", "Full / Prominent"],
    },
    [BodyShape.PearTriangle]: {
        bustRange: [78, 95],
        waistRange: [60, 80],
        hipRange: [94, 125],
        cupSizes: ["B", "C", "D"],
        breastSizes: ["Small", "Small full", "Medium full"],
        assSizes: ["Full rounded", "Large, prominent", "Large and soft"],
        assTypes: ["Full / Prominent", "Stacked / Amplified", "Heavy-Set / Wide"],
    },
    [BodyShape.AppleRound]: {
        bustRange: [85, 110],
        waistRange: [75, 100],
        hipRange: [85, 105],
        cupSizes: ["C", "D", "DD / E"],
        breastSizes: ["Medium full", "Full", "Large"],
        assSizes: ["Medium rounded", "Full rounded"],
        assTypes: ["Average / Balanced", "Curvy / Defined"],
    },
    [BodyShape.RectangleStraight]: {
        bustRange: [78, 90],
        waistRange: [68, 82],
        hipRange: [80, 95],
        cupSizes: ["AA / A", "B", "C"],
        breastSizes: ["Small", "Small full", "Medium firm"],
        assSizes: ["Small and rounded", "Compact and firm", "Medium rounded"],
        assTypes: ["Petite / Slim", "Compact / Lean", "Average / Balanced"],
    },
    [BodyShape.InvertedTriangle]: {
        bustRange: [88, 105],
        waistRange: [65, 78],
        hipRange: [82, 95],
        cupSizes: ["C", "D", "DD / E"],
        breastSizes: ["Medium full", "Full", "Large"],
        assSizes: ["Compact and firm", "Medium rounded"],
        assTypes: ["Average / Balanced", "Curvy / Defined"],
    },
    [BodyShape.Spoon]: {
        bustRange: [80, 95],
        waistRange: [58, 72],
        hipRange: [96, 120],
        cupSizes: ["B", "C", "D"],
        breastSizes: ["Small full", "Medium full", "Full"],
        assSizes: ["Full rounded with spread", "Large, prominent", "Shelf ass"],
        assTypes: ["Full / Prominent", "Stacked / Amplified", "Heavy-Set / Wide"],
    },
    [BodyShape.Diamond]: {
        bustRange: [80, 95],
        waistRange: [75, 95],
        hipRange: [85, 105],
        cupSizes: ["B", "C", "D"],
        breastSizes: ["Small full", "Medium full"],
        assSizes: ["Medium rounded", "Full rounded"],
        assTypes: ["Average / Balanced", "Curvy / Defined"],
    },
    [BodyShape.Oval]: {
        bustRange: [85, 105],
        waistRange: [80, 100],
        hipRange: [90, 110],
        cupSizes: ["C", "D", "DD / E"],
        breastSizes: ["Medium full", "Full", "Large"],
        assSizes: ["Full rounded", "Large, prominent"],
        assTypes: ["Curvy / Defined", "Full / Prominent"],
    },
    [BodyShape.Athletic]: {
        bustRange: [78, 95],
        waistRange: [60, 72],
        hipRange: [82, 100],
        cupSizes: ["B", "C", "D"],
        breastSizes: ["Small", "Small full", "Medium firm"],
        assSizes: ["Compact and firm", "Medium rounded"],
        assTypes: ["Average / Balanced", "Curvy / Defined"],
    },
    [BodyShape.TopHourglass]: {
        bustRange: [95, 120],
        waistRange: [58, 72],
        hipRange: [86, 105],
        cupSizes: ["D", "DD / E", "DDD / F", "G"],
        breastSizes: ["Full", "Large", "Large heavy"],
        assSizes: ["Medium rounded", "Full rounded"],
        assTypes: ["Average / Balanced", "Curvy / Defined"],
    },
    [BodyShape.BottomHourglass]: {
        bustRange: [82, 100],
        waistRange: [56, 70],
        hipRange: [96, 125],
        cupSizes: ["B", "C", "D"],
        breastSizes: ["Small full", "Medium full", "Full"],
        assSizes: ["Full rounded with spread", "Large, prominent", "Large and soft"],
        assTypes: ["Full / Prominent", "Stacked / Amplified", "Heavy-Set / Wide"],
    },
    [BodyShape.Bell]: {
        bustRange: [75, 90],
        waistRange: [58, 72],
        hipRange: [96, 120],
        cupSizes: ["B", "C"],
        breastSizes: ["Small", "Small full"],
        assSizes: ["Large, prominent", "Large and soft", "Heavy with significant mass"],
        assTypes: ["Full / Prominent", "Stacked / Amplified", "Heavy-Set / Wide"],
    },
    [BodyShape.Lollipop]: {
        bustRange: [90, 120],
        waistRange: [56, 68],
        hipRange: [80, 95],
        cupSizes: ["D", "DD / E", "DDD / F", "G"],
        breastSizes: ["Full", "Large", "Large heavy"],
        assSizes: ["Small and rounded", "Compact and firm", "Medium rounded"],
        assTypes: ["Petite / Slim", "Compact / Lean", "Average / Balanced"],
    },
    [BodyShape.Cornet]: {
        bustRange: [86, 105],
        waistRange: [60, 74],
        hipRange: [80, 95],
        cupSizes: ["C", "D", "DD / E"],
        breastSizes: ["Medium full", "Full", "Large"],
        assSizes: ["Medium rounded", "Full rounded"],
        assTypes: ["Average / Balanced", "Curvy / Defined"],
    },
};

// ---------------------------------------------------------------------------
// BODY SHAPE → BODY CATEGORY MAPPING
// ---------------------------------------------------------------------------
export const BODY_SHAPE_TO_CATEGORY_MAP: Record<BodyShape, { category: BodyCategory; weight: number }[]> = {
    [BodyShape.Hourglass]: [
        { category: "Harmonious & Balanced", weight: 60 },
        { category: "Erotic Bombshell", weight: 20 },
        { category: "Soft & Feminine", weight: 20 },
    ],
    [BodyShape.PearTriangle]: [
        { category: "Lower-Curve & Exotic", weight: 50 },
        { category: "Bottom-Heavy Hourglass", weight: 30 },
        { category: "Soft & Feminine", weight: 20 },
    ],
    [BodyShape.AppleRound]: [
        { category: "Soft & Feminine", weight: 50 },
        { category: "Straight & Sleek", weight: 20 },
        { category: "Toned & Athletic", weight: 10 },
        { category: "Fantasy & Hyper-Exotic", weight: 20 },
    ],
    [BodyShape.RectangleStraight]: [
        { category: "Straight & Sleek", weight: 70 },
        { category: "Toned & Athletic", weight: 20 },
        { category: "Ethereal & Delicate", weight: 10 },
    ],
    [BodyShape.InvertedTriangle]: [
        { category: "Toned & Athletic", weight: 50 },
        { category: "Straight & Sleek", weight: 30 },
        { category: "Erotic Bombshell", weight: 20 },
    ],
    [BodyShape.Spoon]: [
        { category: "Bottom-Heavy Hourglass", weight: 60 },
        { category: "Lower-Curve & Exotic", weight: 30 },
        { category: "Soft & Feminine", weight: 10 },
    ],
    [BodyShape.Diamond]: [
        { category: "Soft & Feminine", weight: 40 },
        { category: "Bottom-Heavy Hourglass", weight: 30 },
        { category: "Straight & Sleek", weight: 30 },
    ],
    [BodyShape.Oval]: [
        { category: "Soft & Feminine", weight: 60 },
        { category: "Straight & Sleek", weight: 20 },
        { category: "Lower-Curve & Exotic", weight: 20 },
    ],
    [BodyShape.Athletic]: [
        { category: "Toned & Athletic", weight: 80 },
        { category: "Straight & Sleek", weight: 20 },
    ],
    [BodyShape.TopHourglass]: [
        { category: "Erotic Bombshell", weight: 70 },
        { category: "Fantasy & Hyper-Exotic", weight: 30 },
    ],
    [BodyShape.BottomHourglass]: [
        { category: "Bottom-Heavy Hourglass", weight: 70 },
        { category: "Lower-Curve & Exotic", weight: 20 },
        { category: "Soft & Feminine", weight: 10 },
    ],
    [BodyShape.Bell]: [
        { category: "Lower-Curve & Exotic", weight: 50 },
        { category: "Bottom-Heavy Hourglass", weight: 40 },
        { category: "Soft & Feminine", weight: 10 },
    ],
    [BodyShape.Lollipop]: [
        { category: "Erotic Bombshell", weight: 60 },
        { category: "Fantasy & Hyper-Exotic", weight: 40 },
    ],
    [BodyShape.Cornet]: [
        { category: "Toned & Athletic", weight: 50 },
        { category: "Straight & Sleek", weight: 30 },
        { category: "Erotic Bombshell", weight: 20 },
    ],
};

// ---------------------------------------------------------------------------
// DEFAULT NPC BODY TYPE DISTRIBUTION (used by GameSettings)
// ---------------------------------------------------------------------------
export const DEFAULT_NPC_BODY_TYPE_DISTRIBUTION: Partial<Record<BodyShape, number>> = {
    [BodyShape.Hourglass]: 15,
    [BodyShape.PearTriangle]: 15,
    [BodyShape.RectangleStraight]: 15,
    [BodyShape.Athletic]: 15,
    [BodyShape.Spoon]: 10,
    [BodyShape.TopHourglass]: 8,
    [BodyShape.BottomHourglass]: 8,
    [BodyShape.InvertedTriangle]: 5,
    [BodyShape.AppleRound]: 4,
    [BodyShape.Bell]: 3,
    [BodyShape.Diamond]: 1,
    [BodyShape.Oval]: 1,
    [BodyShape.Lollipop]: 0.5,
    [BodyShape.Cornet]: 0.5,
};