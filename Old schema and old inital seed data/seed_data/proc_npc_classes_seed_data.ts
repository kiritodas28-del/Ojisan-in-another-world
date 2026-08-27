// ============================================================================
// PROCEDURAL NPC CLASSES SEED DATA — using HumanoidAppearanceRule
// ============================================================================
import type {
    AppearanceDef,
    ProcNpcClassDef,
    HumanoidAppearanceRule,
} from "../schemas/schemas";
import { GenderId, BodyShape } from "../schemas/schemas";

// ---------------------------------------------------------------------------
// DEFAULT FEMALE / MALE RULES
// ---------------------------------------------------------------------------
const FEMALE_DEFAULT_RULE: HumanoidAppearanceRule = {
    heightRange: [150, 175],
    buildOptions: ["slender", "soft", "toned", "curvy"],
    musclePresenceOptions: ["None visible", "Faint suggestion", "Lightly toned"],
    hairColorOptions: ["Jet Black", "Soft Black", "Dark Brown", "Chestnut Brown", "Auburn", "Copper Red", "Platinum Blonde", "Golden Blonde"],
    hairStyleOptions: ["Long & Straight", "Long & Wavy", "Long Braid", "Shoulder-Length", "Bob", "Pixie Cut"],
    eyeColorOptions: ["Brown", "Hazel", "Green", "Blue", "Violet", "Amber"],
    skinToneOptions: ["Fair", "Light neutral", "Light warm / olive", "Medium warm / tan", "Pale"],
    breastSizeOptions: ["Small full", "Medium full", "Full", "Large"],
    breastCupOptions: ["B", "C", "D", "DD / E", "DDD / F"],
    breastShapeOptions: ["Perky", "Teardrop", "Round", "Natural droop"],
    assSizeOptions: ["Medium rounded", "Full rounded", "Full rounded with spread"],
    assTypeOptions: ["Average / Balanced", "Curvy / Defined", "Full / Prominent"],
    assFirmnessOptions: ["Firm", "Soft"],
    pubicHairOptions: ["Full natural", "Neatly trimmed", "Natural trimmed"],
    underarmHairOptions: ["Natural", "Light stubble"],
    bodyShapeWeights: {
        [BodyShape.Hourglass]: 20,
        [BodyShape.PearTriangle]: 20,
        [BodyShape.RectangleStraight]: 20,
        [BodyShape.Athletic]: 15,
        [BodyShape.Spoon]: 10,
        [BodyShape.TopHourglass]: 5,
        [BodyShape.BottomHourglass]: 5,
        [BodyShape.AppleRound]: 3,
        [BodyShape.InvertedTriangle]: 2,
    },
};

const MALE_DEFAULT_RULE: HumanoidAppearanceRule = {
    heightRange: [160, 185],
    buildOptions: ["lean", "average", "muscular", "stocky"],
    musclePresenceOptions: ["Lightly toned", "Clearly toned", "Defined", "Athletic defined"],
    hairColorOptions: ["Jet Black", "Soft Black", "Dark Brown", "Medium Brown", "Light Brown", "Grey"],
    hairStyleOptions: ["Short & Straight", "Buzz Cut", "Side Part", "Undercut", "Shaved Head"],
    eyeColorOptions: ["Brown", "Hazel", "Green", "Blue", "Grey"],
    skinToneOptions: ["Fair", "Light neutral", "Medium warm / tan", "Medium brown"],
    assSizeOptions: ["Compact and firm", "Medium rounded", "Full rounded"],
    assTypeOptions: ["Compact / Lean", "Average / Balanced", "Curvy / Defined"],
    assFirmnessOptions: ["Firm", "Soft"],
    pubicHairOptions: ["Neatly trimmed", "Natural trimmed", "Full natural"],
    underarmHairOptions: ["Light stubble", "Natural"],
    bodyShapeWeights: {
        [BodyShape.RectangleStraight]: 35,
        [BodyShape.Athletic]: 30,
        [BodyShape.InvertedTriangle]: 15,
        [BodyShape.Oval]: 5,
        [BodyShape.AppleRound]: 5,
        [BodyShape.Hourglass]: 3,
        [BodyShape.PearTriangle]: 3,
        [BodyShape.Spoon]: 2,
    },
};

// ---------------------------------------------------------------------------
// 1. TOWN MERCHANT
// ---------------------------------------------------------------------------
const TOWN_MERCHANT_APPEARANCE: AppearanceDef = {
    heightCm: 168,
    build: "average, well-fed",
    gender: GenderId.Varies,
    hairColor: "Medium Brown",
    hairStyle: "neatly combed",
    eyeColor: "Brown",
    skinTone: "Light neutral",
    skinType: "smooth",
    distinguishingFeatures: ["often carries a ledger or coin pouch"],
    scarsAndTattoos: [],
    apparentAge: 35,
    portraitAssetId: "portrait_npc_merchant",
    aestheticSummary: "A comfortably prosperous figure who looks like they know the value of everything.",
};

const TOWN_MERCHANT_RULE: HumanoidAppearanceRule = {
    ...MALE_DEFAULT_RULE, // base for mixed; but we can override per gender if needed
    // Override for both genders if necessary; we'll keep defaults
    bodyShapeWeights: {
        [BodyShape.RectangleStraight]: 30,
        [BodyShape.Athletic]: 20,
        [BodyShape.Oval]: 20,
        [BodyShape.AppleRound]: 15,
        [BodyShape.Hourglass]: 5,
        [BodyShape.PearTriangle]: 5,
        [BodyShape.Spoon]: 5,
    },
};

export const TOWN_MERCHANT: ProcNpcClassDef = {
    id: "town_merchant",
    displayName: "Town Merchant",
    description: "A local trader dealing in goods, often found near market squares.",
    appearance: TOWN_MERCHANT_APPEARANCE,
    passiveGenerationItemId: "GOLD",
    genderWeight: { male: 0.5, female: 0.5 },
    appearanceRule: TOWN_MERCHANT_RULE,
};

// ---------------------------------------------------------------------------
// 2. FARM WORKER
// ---------------------------------------------------------------------------
const FARM_WORKER_APPEARANCE: AppearanceDef = {
    heightCm: 165,
    build: "sturdy and weathered",
    gender: GenderId.Varies,
    hairColor: "Light Brown",
    hairStyle: "short, practical",
    eyeColor: "Brown",
    skinTone: "Light warm / olive",
    skinType: "sun-weathered",
    distinguishingFeatures: ["calloused hands", "straw hat"],
    scarsAndTattoos: [],
    apparentAge: 30,
    portraitAssetId: "portrait_npc_farmer",
    aestheticSummary: "A hardworking soul shaped by the land, with a sun-worn face and strong hands.",
};

const FARM_WORKER_RULE: HumanoidAppearanceRule = {
    ...MALE_DEFAULT_RULE,
    bodyShapeWeights: {
        [BodyShape.Athletic]: 35,
        [BodyShape.RectangleStraight]: 30,
        [BodyShape.PearTriangle]: 15,
        [BodyShape.InvertedTriangle]: 10,
        [BodyShape.Hourglass]: 5,
        [BodyShape.Oval]: 5,
    },
};

export const FARM_WORKER: ProcNpcClassDef = {
    id: "farm_worker",
    displayName: "Farm Worker",
    description: "A laborer tending fields and livestock outside town.",
    appearance: FARM_WORKER_APPEARANCE,
    passiveGenerationItemId: "farm_produce",
    genderWeight: { male: 0.6, female: 0.4 },
    appearanceRule: FARM_WORKER_RULE,
};

// ---------------------------------------------------------------------------
// 3. TAVERN SERVER
// ---------------------------------------------------------------------------
const TAVERN_SERVER_APPEARANCE: AppearanceDef = {
    heightCm: 162,
    build: "soft, approachable",
    gender: GenderId.Female,
    hairColor: "Chestnut Brown",
    hairStyle: "pinned up or in a loose bun",
    eyeColor: "Hazel",
    skinTone: "Fair",
    skinType: "smooth",
    distinguishingFeatures: ["apron", "friendly smile"],
    scarsAndTattoos: [],
    apparentAge: 26,
    portraitAssetId: "portrait_npc_server",
    aestheticSummary: "A friendly face in a busy room, quick with a smile and a drink.",
};

const TAVERN_SERVER_RULE: HumanoidAppearanceRule = {
    ...FEMALE_DEFAULT_RULE,
    bodyShapeWeights: {
        // Requested categories: Ethereal & Delicate, Harmonious & Balanced, Toned & Athletic, Straight & Sleek, Soft & Feminine, Lower-Curve & Exotic
        // Approx shapes mapping:
        [BodyShape.RectangleStraight]: 20, // Straight & Sleek
        [BodyShape.Athletic]: 20,          // Toned & Athletic
        [BodyShape.Hourglass]: 20,         // Harmonious & Balanced
        [BodyShape.PearTriangle]: 15,      // Lower-Curve & Exotic
        [BodyShape.Spoon]: 10,             // Lower-Curve & Exotic
        [BodyShape.TopHourglass]: 5,       // Ethereal / Soft
        [BodyShape.BottomHourglass]: 5,    // Soft / Lower
        [BodyShape.Bell]: 3,               // Lower
        [BodyShape.Cornet]: 2,             // Ethereal
    },
};

export const TAVERN_SERVER: ProcNpcClassDef = {
    id: "tavern_server",
    displayName: "Tavern Server",
    description: "A server working the common room of an inn or tavern.",
    appearance: TAVERN_SERVER_APPEARANCE,
    passiveGenerationItemId: "cooked_meal",
    genderWeight: { male: 0.1, female: 0.9 },
    appearanceRule: TAVERN_SERVER_RULE,
};

// ---------------------------------------------------------------------------
// 4. TOWN GUARD
// ---------------------------------------------------------------------------
const TOWN_GUARD_APPEARANCE: AppearanceDef = {
    heightCm: 178,
    build: "athletic and solid",
    gender: GenderId.Varies,
    hairColor: "Dark Brown",
    hairStyle: "short, regulation",
    eyeColor: "Grey",
    skinTone: "Medium warm / tan",
    skinType: "weathered",
    distinguishingFeatures: ["worn armor", "watchful eyes"],
    scarsAndTattoos: ["small scar on chin"],
    apparentAge: 32,
    portraitAssetId: "portrait_npc_guard",
    aestheticSummary: "A disciplined figure in armor, always watching the crowd.",
};

const TOWN_GUARD_RULE: HumanoidAppearanceRule = {
    ...MALE_DEFAULT_RULE,
    bodyShapeWeights: {
        [BodyShape.Athletic]: 40,
        [BodyShape.RectangleStraight]: 25,
        [BodyShape.InvertedTriangle]: 20,
        [BodyShape.Oval]: 5,
        [BodyShape.AppleRound]: 5,
        [BodyShape.Hourglass]: 3,
        [BodyShape.PearTriangle]: 2,
    },
};

export const TOWN_GUARD: ProcNpcClassDef = {
    id: "town_guard",
    displayName: "Town Guard",
    description: "A member of the local watch, keeping order in the streets.",
    appearance: TOWN_GUARD_APPEARANCE,
    passiveGenerationItemId: "iron_ingot",
    genderWeight: { male: 0.7, female: 0.3 },
    appearanceRule: TOWN_GUARD_RULE,
};

// ---------------------------------------------------------------------------
// 5. HERBALIST
// ---------------------------------------------------------------------------
const HERBALIST_APPEARANCE: AppearanceDef = {
    heightCm: 160,
    build: "slight and nimble",
    gender: GenderId.Varies,
    hairColor: "Auburn",
    hairStyle: "long, tied back",
    eyeColor: "Green",
    skinTone: "Fair",
    skinType: "soft",
    distinguishingFeatures: ["satchel of herbs", "ink-stained fingers"],
    scarsAndTattoos: [],
    apparentAge: 40,
    portraitAssetId: "portrait_npc_herbalist",
    aestheticSummary: "A quiet figure surrounded by the scent of dried leaves and roots.",
};

const HERBALIST_RULE: HumanoidAppearanceRule = {
    ...FEMALE_DEFAULT_RULE,
    bodyShapeWeights: {
        [BodyShape.RectangleStraight]: 25,
        [BodyShape.Athletic]: 15,
        [BodyShape.Hourglass]: 25,
        [BodyShape.PearTriangle]: 20,
        [BodyShape.Spoon]: 5,
        [BodyShape.TopHourglass]: 5,
        [BodyShape.BottomHourglass]: 5,
    },
};

export const HERBALIST: ProcNpcClassDef = {
    id: "herbalist",
    displayName: "Herbalist",
    description: "A healer and gatherer of medicinal plants.",
    appearance: HERBALIST_APPEARANCE,
    passiveGenerationItemId: "medicinal_herb",
    genderWeight: { male: 0.3, female: 0.7 },
    appearanceRule: HERBALIST_RULE,
};

// ---------------------------------------------------------------------------
// 6. MINER
// ---------------------------------------------------------------------------
const MINER_APPEARANCE: AppearanceDef = {
    heightCm: 170,
    build: "broad and strong",
    gender: GenderId.Varies,
    hairColor: "Black",
    hairStyle: "short, often dusty",
    eyeColor: "Brown",
    skinTone: "Medium brown",
    skinType: "rough, grimy",
    distinguishingFeatures: ["muscled arms", "miner's lantern"],
    scarsAndTattoos: [],
    apparentAge: 35,
    portraitAssetId: "portrait_npc_miner",
    aestheticSummary: "A rugged worker hewn from stone and sweat.",
};

const MINER_RULE: HumanoidAppearanceRule = {
    ...MALE_DEFAULT_RULE,
    bodyShapeWeights: {
        [BodyShape.Athletic]: 35,
        [BodyShape.RectangleStraight]: 30,
        [BodyShape.AppleRound]: 15,
        [BodyShape.InvertedTriangle]: 10,
        [BodyShape.Oval]: 10,
    },
};

export const MINER: ProcNpcClassDef = {
    id: "miner",
    displayName: "Miner",
    description: "A laborer who works deep in the mines extracting ore.",
    appearance: MINER_APPEARANCE,
    passiveGenerationItemId: "iron_ore",
    genderWeight: { male: 0.8, female: 0.2 },
    appearanceRule: MINER_RULE,
};

// ---------------------------------------------------------------------------
// 7. FISHERMAN
// ---------------------------------------------------------------------------
const FISHERMAN_APPEARANCE: AppearanceDef = {
    heightCm: 172,
    build: "lean and weathered",
    gender: GenderId.Varies,
    hairColor: "Grey",
    hairStyle: "short, unkempt",
    eyeColor: "Blue",
    skinTone: "Deep",
    skinType: "rough, salt-worn",
    distinguishingFeatures: ["net slung over shoulder", "sea-worn hands"],
    scarsAndTattoos: [],
    apparentAge: 45,
    portraitAssetId: "portrait_npc_fisherman",
    aestheticSummary: "A quiet figure who smells of salt and patience.",
};

const FISHERMAN_RULE: HumanoidAppearanceRule = {
    ...MALE_DEFAULT_RULE,
    bodyShapeWeights: {
        [BodyShape.RectangleStraight]: 30,
        [BodyShape.Athletic]: 25,
        [BodyShape.PearTriangle]: 15,
        [BodyShape.InvertedTriangle]: 10,
        [BodyShape.Oval]: 10,
        [BodyShape.Hourglass]: 5,
        [BodyShape.Spoon]: 5,
    },
};

export const FISHERMAN: ProcNpcClassDef = {
    id: "fisherman",
    displayName: "Fisherman",
    description: "A fisher who spends long hours on the water.",
    appearance: FISHERMAN_APPEARANCE,
    passiveGenerationItemId: "fresh_fish",
    genderWeight: { male: 0.9, female: 0.1 },
    appearanceRule: FISHERMAN_RULE,
};

// ---------------------------------------------------------------------------
// 8. HUNTER / TRAPPER
// ---------------------------------------------------------------------------
const HUNTER_APPEARANCE: AppearanceDef = {
    heightCm: 175,
    build: "athletic and wiry",
    gender: GenderId.Varies,
    hairColor: "Dark Brown",
    hairStyle: "long, tied back",
    eyeColor: "Brown",
    skinTone: "Medium warm / tan",
    skinType: "weathered",
    distinguishingFeatures: ["bow and quiver", "animal skin cloak"],
    scarsAndTattoos: ["claw scar on forearm"],
    apparentAge: 30,
    portraitAssetId: "portrait_npc_hunter",
    aestheticSummary: "A quiet, alert figure who moves like the forest itself.",
};

const HUNTER_RULE: HumanoidAppearanceRule = {
    ...FEMALE_DEFAULT_RULE, // start from female default; but we'll override body shapes for both genders as requested for female
    bodyShapeWeights: {
        // For female hunter: Soft & Feminine, Toned & Athletic, Lower-Curve & Exotic, Bottom-Heavy Hourglass, Erotic Bombshell
        // We'll distribute as:
        [BodyShape.Athletic]: 25,             // Toned & Athletic
        [BodyShape.Hourglass]: 20,            // Soft / Balanced / Erotic
        [BodyShape.PearTriangle]: 20,         // Lower-Curve & Exotic
        [BodyShape.BottomHourglass]: 15,      // Bottom-Heavy Hourglass / Erotic
        [BodyShape.Spoon]: 10,                // Lower-Curve
        [BodyShape.TopHourglass]: 5,          // Erotic Bombshell
        [BodyShape.RectangleStraight]: 5,
    },
};

export const HUNTER: ProcNpcClassDef = {
    id: "hunter",
    displayName: "Hunter",
    description: "A skilled tracker and hunter of wild game.",
    appearance: HUNTER_APPEARANCE,
    passiveGenerationItemId: "game_meat",
    genderWeight: { male: 0.6, female: 0.4 },
    appearanceRule: HUNTER_RULE,
};

// ---------------------------------------------------------------------------
// 9. PRIEST / SHRINE MAIDEN
// ---------------------------------------------------------------------------
const SHRINE_PRIEST_APPEARANCE: AppearanceDef = {
    heightCm: 165,
    build: "slender and calm",
    gender: GenderId.Varies,
    hairColor: "White",
    hairStyle: "long, often braided",
    eyeColor: "Blue",
    skinTone: "Fair",
    skinType: "smooth",
    distinguishingFeatures: ["simple robes", "holy symbol"],
    scarsAndTattoos: [],
    apparentAge: 38,
    portraitAssetId: "portrait_npc_priest",
    aestheticSummary: "A serene presence, dressed in humble robes and carrying an air of quiet devotion.",
};

const SHRINE_PRIEST_RULE: HumanoidAppearanceRule = {
    ...FEMALE_DEFAULT_RULE,
    bodyShapeWeights: {
        // Requested: Lower-Curve & Exotic, Bottom-Heavy Hourglass, Erotic Bombshell
        [BodyShape.PearTriangle]: 25,      // Lower-Curve
        [BodyShape.Spoon]: 20,             // Lower-Curve
        [BodyShape.BottomHourglass]: 25,   // Bottom-Heavy Hourglass
        [BodyShape.TopHourglass]: 15,      // Erotic Bombshell
        [BodyShape.Hourglass]: 10,         // Erotic / Balanced
        [BodyShape.RectangleStraight]: 5,
    },
};

export const SHRINE_PRIEST: ProcNpcClassDef = {
    id: "shrine_priest",
    displayName: "Shrine Priest",
    description: "A devotee who tends a local shrine or temple.",
    appearance: SHRINE_PRIEST_APPEARANCE,
    passiveGenerationItemId: "incense",
    genderWeight: { male: 0.1, female: 0.9 },
    appearanceRule: SHRINE_PRIEST_RULE,
};

// ---------------------------------------------------------------------------
// 10. TRAVELING PERFORMER
// ---------------------------------------------------------------------------
const PERFORMER_APPEARANCE: AppearanceDef = {
    heightCm: 168,
    build: "lithe and expressive",
    gender: GenderId.Varies,
    hairColor: "Golden Blonde",
    hairStyle: "flamboyant, often adorned with ribbons",
    eyeColor: "Green",
    skinTone: "Fair",
    skinType: "smooth",
    distinguishingFeatures: ["bright clothing", "musical instrument"],
    scarsAndTattoos: ["small star tattoo behind ear"],
    apparentAge: 28,
    portraitAssetId: "portrait_npc_performer",
    aestheticSummary: "A colorful figure who seems to gather smiles and attention wherever they go.",
};

const PERFORMER_RULE: HumanoidAppearanceRule = {
    ...FEMALE_DEFAULT_RULE,
    bodyShapeWeights: {
        // Requested: Ethereal & Delicate, Harmonious & Balanced, Toned & Athletic, Straight & Sleek, Soft & Feminine, Lower-Curve & Exotic
        [BodyShape.RectangleStraight]: 20, // Straight & Sleek
        [BodyShape.Athletic]: 20,          // Toned & Athletic
        [BodyShape.Hourglass]: 20,         // Harmonious & Balanced / Soft
        [BodyShape.PearTriangle]: 15,      // Lower-Curve & Exotic
        [BodyShape.Spoon]: 10,             // Lower-Curve
        [BodyShape.TopHourglass]: 5,       // Ethereal / Soft
        [BodyShape.BottomHourglass]: 5,    // Soft / Lower
        [BodyShape.Bell]: 3,               // Lower
        [BodyShape.Cornet]: 2,             // Ethereal
    },
};

export const PERFORMER: ProcNpcClassDef = {
    id: "traveling_performer",
    displayName: "Traveling Performer",
    description: "A wandering entertainer who sings, dances, or plays instruments for coin.",
    appearance: PERFORMER_APPEARANCE,
    passiveGenerationItemId: "gold",
    genderWeight: { male: 0.1, female: 0.9 },
    appearanceRule: PERFORMER_RULE,
};

// ---------------------------------------------------------------------------
// 11. ADVENTURER
// ---------------------------------------------------------------------------
const ADVENTURER_APPEARANCE: AppearanceDef = {
    heightCm: 172,
    build: "fit and versatile, carrying a mixture of travel wear and practical armor",
    gender: GenderId.Varies,
    hairColor: "Dark Brown",
    hairStyle: "medium length, often tied back",
    eyeColor: "Brown",
    skinTone: "Medium warm / tan",
    skinType: "weathered",
    distinguishingFeatures: ["well-worn adventuring gear", "scars from past battles"],
    scarsAndTattoos: ["one noticeable scar on the cheek"],
    apparentAge: 27,
    portraitAssetId: "portrait_npc_adventurer",
    aestheticSummary: "A rugged individual prepared for the road, exuding quiet confidence and experience.",
};

const ADVENTURER_RULE: HumanoidAppearanceRule = {
    ...FEMALE_DEFAULT_RULE, // using female as base, but we can adjust for male later if needed
    bodyShapeWeights: {
        // For female adventurer: Soft & Feminine, Toned & Athletic, Lower-Curve & Exotic, Bottom-Heavy Hourglass, Erotic Bombshell
        [BodyShape.Athletic]: 25,
        [BodyShape.Hourglass]: 20,
        [BodyShape.PearTriangle]: 20,
        [BodyShape.BottomHourglass]: 15,
        [BodyShape.Spoon]: 10,
        [BodyShape.TopHourglass]: 5,
        [BodyShape.RectangleStraight]: 5,
    },
};

export const ADVENTURER: ProcNpcClassDef = {
    id: "adventurer",
    displayName: "Adventurer",
    description: "A wandering adventurer seeking fortune, glory, and dangerous mysteries.",
    appearance: ADVENTURER_APPEARANCE,
    passiveGenerationItemId: "GOLD",
    genderWeight: { male: 0.4, female: 0.6 },
    appearanceRule: ADVENTURER_RULE,
};

// ---------------------------------------------------------------------------
// EXPORT ALL CLASSES
// ---------------------------------------------------------------------------
export const PROC_NPC_CLASSES: ProcNpcClassDef[] = [
    TOWN_MERCHANT,
    FARM_WORKER,
    TAVERN_SERVER,
    TOWN_GUARD,
    HERBALIST,
    MINER,
    FISHERMAN,
    HUNTER,
    SHRINE_PRIEST,
    PERFORMER,
    ADVENTURER,
];