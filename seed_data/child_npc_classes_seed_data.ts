// ============================================================================
// CHILD NPC CLASSES SEED DATA
// ============================================================================
// Village-child flavor templates for procedural ChildNpcInstance generation.
// These are background population only — no combat, no intimacy, no romance.
// They exist to populate residential/hub locations and gate quest dialogue
// via familiarity.
//
// Appearance uses HumanoidAppearanceRule with child-safe options.
// No breast/ass sexualization; body shape remains neutral/straight.

import type {
    AppearanceDef,
    ChildNpcClassDef,
    HumanoidAppearanceRule,
} from "../schemas/schemas";
import { DayPhase, GenderId, BodyShape } from "../schemas/schemas";

// ---------------------------------------------------------------------------
// CHILD-SAFE BASE RULES
// ---------------------------------------------------------------------------
const CHILD_BASE_RULE: HumanoidAppearanceRule = {
    heightRange: [105, 145],
    buildOptions: ["small", "wiry", "slight", "petite"],
    musclePresenceOptions: ["None visible", "Faint suggestion"],
    hairColorOptions: ["Brown", "Dark Brown", "Light Brown", "Black", "Grey"],
    hairStyleOptions: ["Short & Straight", "Shoulder-Length", "Shag", "Curly Crop"],
    eyeColorOptions: ["Brown", "Hazel", "Blue", "Green", "Grey"],
    skinToneOptions: ["Fair", "Light neutral", "Light warm / olive", "Medium warm / tan"],
    // No breastSizeOptions / breastCupOptions / breastShapeOptions — children have no breast development
    assSizeOptions: ["Small and rounded", "Compact and firm"],
    assTypeOptions: ["Petite / Slim", "Compact / Lean"],
    assFirmnessOptions: ["Firm"],
    pubicHairOptions: ["Bare"],        // children have no pubic hair
    underarmHairOptions: ["Bare"],     // children have no underarm hair
    bodyShapeWeights: {
        [BodyShape.RectangleStraight]: 100,   // neutral, straight child body
    },
};

// ---------------------------------------------------------------------------
// VILLAGE BOY
// ---------------------------------------------------------------------------
const VILLAGE_BOY_APPEARANCE: AppearanceDef = {
    heightCm: 130,
    heightTag: "Very Petite",
    build: "small and wiry, typical of a growing child",
    musclePresence: "None visible",
    gender: GenderId.Male,
    bodyShape: BodyShape.RectangleStraight,
    hairColor: "Brown",
    hairStyle: "Short & Straight",
    eyeColor: "Brown",
    skinTone: "Fair",
    skinType: "smooth, often dirty from play",
    distinguishingFeatures: ["scraped knees", "fidgeting hands"],
    scarsAndTattoos: [],
    apparentAge: 8,
    trueAge: 8,
    portraitAssetId: "portrait_child_boy",
    aestheticSummary: "A typical village boy, full of restless energy and curiosity.",
};

const VILLAGE_BOY_RULE: HumanoidAppearanceRule = {
    ...CHILD_BASE_RULE,
    // Boy-specific overrides if needed
    hairStyleOptions: ["Short & Straight", "Curly Crop", "Shag"],
};

export const VILLAGE_BOY: ChildNpcClassDef = {
    id: "village_boy",
    displayName: "Village Boy",
    description: "A young boy from the village, usually found playing or running errands.",
    appearance: VILLAGE_BOY_APPEARANCE,
    appearanceRule: VILLAGE_BOY_RULE,
    scheduleByPhase: {
        [DayPhase.Morning]: "vv_school",
        [DayPhase.Afternoon]: "vv_village_square",
        [DayPhase.Evening]: "vv_residential_area",
        // Night and Midnight omitted — asleep at home
    },
};

// ---------------------------------------------------------------------------
// VILLAGE GIRL
// ---------------------------------------------------------------------------
const VILLAGE_GIRL_APPEARANCE: AppearanceDef = {
    heightCm: 128,
    heightTag: "Very Petite",
    build: "small and slender",
    musclePresence: "None visible",
    gender: GenderId.Female,
    bodyShape: BodyShape.RectangleStraight,
    hairColor: "Light Brown",
    hairStyle: "Shoulder-Length",
    eyeColor: "Green",
    skinTone: "Fair",
    skinType: "smooth",
    distinguishingFeatures: ["a worn doll or small basket"],
    scarsAndTattoos: [],
    apparentAge: 8,
    trueAge: 8,
    portraitAssetId: "portrait_child_girl",
    aestheticSummary: "A quiet village girl, often seen helping with chores or watching from the sidelines.",
};

const VILLAGE_GIRL_RULE: HumanoidAppearanceRule = {
    ...CHILD_BASE_RULE,
    // Girl-specific overrides
    hairStyleOptions: ["Shoulder-Length", "Long & Straight", "Long Braid"],
};

export const VILLAGE_GIRL: ChildNpcClassDef = {
    id: "village_girl",
    displayName: "Village Girl",
    description: "A young girl from the village, often quiet and watchful.",
    appearance: VILLAGE_GIRL_APPEARANCE,
    appearanceRule: VILLAGE_GIRL_RULE,
    scheduleByPhase: {
        [DayPhase.Morning]: "vv_school",
        [DayPhase.Afternoon]: "vv_village_square",
        [DayPhase.Evening]: "vv_residential_area",
    },
};

// ---------------------------------------------------------------------------
// STREET URCHIN
// ---------------------------------------------------------------------------
const STREET_URCHIN_APPEARANCE: AppearanceDef = {
    heightCm: 135,
    heightTag: "Very Petite",
    build: "thin and small, with the look of someone who lives on the streets",
    musclePresence: "Faint suggestion",
    gender: GenderId.Varies,
    bodyShape: BodyShape.RectangleStraight,
    hairColor: "Dark Brown",
    hairStyle: "Shag",
    eyeColor: "Grey",
    skinTone: "Medium warm / tan",
    skinType: "rough, often dirty",
    distinguishingFeatures: ["worn-out clothes", "quick, alert eyes"],
    scarsAndTattoos: [],
    apparentAge: 10,
    trueAge: 10,
    portraitAssetId: "portrait_child_urchin",
    aestheticSummary: "A wary child who has learned to survive by wit and speed.",
};

const STREET_URCHIN_RULE: HumanoidAppearanceRule = {
    ...CHILD_BASE_RULE,
    // Urchin-specific overrides
    skinToneOptions: ["Medium warm / tan", "Light warm / olive", "Medium brown"],
    hairStyleOptions: ["Shag", "Short & Straight", "Shoulder-Length"],
};

export const STREET_URCHIN: ChildNpcClassDef = {
    id: "street_urchin",
    displayName: "Street Urchin",
    description: "A homeless child living in the back alleys and market corners.",
    appearance: STREET_URCHIN_APPEARANCE,
    appearanceRule: STREET_URCHIN_RULE,
    scheduleByPhase: {
        [DayPhase.Morning]: "vv_market_square",
        [DayPhase.Afternoon]: "vv_back_alleys",
        [DayPhase.Evening]: "vv_tavern_exterior",
        // Night and Midnight omitted — disappears into hiding
    },
};

// ---------------------------------------------------------------------------
// EXPORT ALL CHILD CLASSES
// ---------------------------------------------------------------------------
export const CHILD_NPC_CLASSES: ChildNpcClassDef[] = [
    VILLAGE_BOY,
    VILLAGE_GIRL,
    STREET_URCHIN,
];