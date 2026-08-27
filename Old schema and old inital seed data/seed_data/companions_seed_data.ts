// ============================================================================
// COMPANIONS SEED DATA — 10 MAIN HEROINES
// ============================================================================
// Body category distribution:
// - 70% (7 companions): Erotic Bombshell / Bottom-Heavy Hourglass
// - 30% (3 companions): Soft & Feminine / Straight & Sleek / Toned & Athletic
// ============================================================================

import type {
    AppearanceDef,
    CombatAttributes,
    CompanionDef,
} from "../schemas/schemas";
import {
    BodyShape,
    CombatRole,
    GenderId,
    Race,
    EquipmentSlot,
} from "../schemas/schemas";
import { CompanionId } from "../schemas/schemas";
// ---------------------------------------------------------------------------
// MIRA — Human Support (Bottom-Heavy Hourglass)
// ---------------------------------------------------------------------------
const MIRA_APPEARANCE: AppearanceDef = {
    heightCm: 163,
    heightTag: "Below Average",
    build: "soft, gentle, unhurried hourglass figure — a healer's build, not a fighter's",
    musclePresence: "None visible",
    gender: GenderId.Female,
    bodyShape: BodyShape.BottomHourglass,
    bodyCategory: "Bottom-Heavy Hourglass",
    hairColor: "Auburn",
    hairStyle: "Long Braid",
    eyeColor: "Warm brown",
    skinTone: "Fair",
    skinType: "soft, fair, lightly freckled",
    distinguishingFeatures: ["calloused, careful hands from years of herb work"],
    scarsAndTattoos: ["a faint old burn scar along one wrist from an early healing mishap"],
    apparentAge: 24,
    trueAge: 24,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Full",
        breastSizeCup: "D",
        breastShape: "Teardrop",
        breastFirmness: "Soft",
        nippleType: "Puffy",
        nippleSize: "Medium",
        pubicHairStyle: "Neatly trimmed",
        underarmHairStyle: "Bare",
        waistCm: 64,
        hipCm: 96,
        assSize: "Full rounded",
        assType: "Curvy / Defined",
        assFirmness: "Soft",
        hasPenis: false,
    },
    portraitAssetId: "portrait_mira_ashveil",
    aestheticSummary:
        "Unassuming and warm at first glance, with the quiet steadiness of someone who has spent her whole life taking care of others before herself — a soft, generous figure she tends to downplay under practical work clothes.",
};

const MIRA_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 5,
    agi: 7,
    wis: 12,
    def: 6,
    lck: 9,
};

const MIRA_BASE_VITALS = {
    currentHp: 48,
    maxHp: 48,
    maxStamina: 40,
    maxCrestPower: 0,
};

const MIRA_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.Head]: "white_linen_hood",
    [EquipmentSlot.Body]: "healers_robe",
    [EquipmentSlot.Legs]: "healers_skirt",
    [EquipmentSlot.Feet]: "soft_slippers",
    [EquipmentSlot.Underwear]: "simple_bra",
    [EquipmentSlot.Chest]: "simple_bra",
    [EquipmentSlot.Socks]: "wool_socks",
};

export const MIRA: CompanionDef = {
    id: "MIRA",
    displayName: "Mira Ashveil",
    race: Race.Human,
    homeRegion: "VERDANT_VALE",
    homeLocationId: "vv_shrine_cottage",   // NEW
    combatRole: CombatRole.Support,
    appearance: MIRA_APPEARANCE,
    baseCombatAttributes: MIRA_BASE_COMBAT_ATTRIBUTES,
    baseVitals: MIRA_BASE_VITALS,
    specialAbilityId: "sacred_mend",
    passiveAbilityId: "crest_resonance",
    defaultEquipment: MIRA_DEFAULT_EQUIPMENT,
    questChainId: "mira_chain",
    suiteThemeId: "herbalists_solace",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

// ---------------------------------------------------------------------------
// ISOLDE — High Elf Artillery (Erotic Bombshell)
// ---------------------------------------------------------------------------
const ISOLDE_APPEARANCE: AppearanceDef = {
    heightCm: 170,
    heightTag: "Above Average",
    build: "slender but voluptuous — an hourglass that draws the eye despite her reserved posture",
    musclePresence: "Faint suggestion",
    gender: GenderId.Female,
    bodyShape: BodyShape.Hourglass,
    bodyCategory: "Erotic Bombshell",
    hairColor: "Platinum Blonde",
    hairStyle: "Long & Straight",
    eyeColor: "Ice blue",
    skinTone: "Very pale",
    skinType: "smooth, flawless",
    distinguishingFeatures: ["pointed ears", "a faint shimmer to her skin in moonlight"],
    scarsAndTattoos: [],
    apparentAge: 150,
    trueAge: 180,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Large",
        breastSizeCup: "E",
        breastShape: "Round",
        breastFirmness: "Firm",
        nippleType: "Protruding",
        nippleSize: "Small",
        pubicHairStyle: "Bare",
        underarmHairStyle: "Bare",
        waistCm: 58,
        hipCm: 92,
        assSize: "Medium rounded",
        assType: "Curvy / Defined",
        assFirmness: "Firm",
        hasPenis: false,
    },
    portraitAssetId: "portrait_isolde_valen",
    aestheticSummary:
        "A cold, regal beauty whose every movement is precise. Her body is a study in contrast — slender waist, full bust, and hips that make even simple robes look like court fashion.",
};

const ISOLDE_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 7,
    agi: 9,
    wis: 14,
    def: 8,
    lck: 10,
};

const ISOLDE_BASE_VITALS = {
    currentHp: 50,
    maxHp: 50,
    maxStamina: 40,
    maxCrestPower: 0,
};

const ISOLDE_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.Body]: "elven_mage_robe",
    [EquipmentSlot.Legs]: "elven_silk_pants",
    [EquipmentSlot.Feet]: "elven_boots",
    [EquipmentSlot.Underwear]: "silk_bra",
    [EquipmentSlot.Chest]: "silk_bra",
    [EquipmentSlot.Neck]: "sapphire_pendant",
};

export const ISOLDE: CompanionDef = {
    id: "ISOLDE",
    displayName: "Isolde Valen",
    race: Race.HighElf,
    homeRegion: "AETHERMOOR",
    homeLocationId: "ae_isolde_estate",   // NEW
    combatRole: CombatRole.Artillery,
    appearance: ISOLDE_APPEARANCE,
    baseCombatAttributes: ISOLDE_BASE_COMBAT_ATTRIBUTES,
    baseVitals: ISOLDE_BASE_VITALS,
    specialAbilityId: "arcane_burst",
    passiveAbilityId: "mana_attunement",
    defaultEquipment: ISOLDE_DEFAULT_EQUIPMENT,
    questChainId: "isolde_chain",
    suiteThemeId: "elven_archive",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

// ---------------------------------------------------------------------------
// GRAEL — Half-Orc Vanguard (Erotic Bombshell)
// ---------------------------------------------------------------------------
const GRAEL_APPEARANCE: AppearanceDef = {
    heightCm: 176,
    heightTag: "Tall",
    build: "athletic and powerfully built, with heavy curves and a warrior's posture",
    musclePresence: "Clearly toned",
    gender: GenderId.Female,
    bodyShape: BodyShape.Hourglass,
    bodyCategory: "Erotic Bombshell",
    hairColor: "Jet Black",
    hairStyle: "Long Ponytail",
    eyeColor: "Amber",
    skinTone: "Medium warm / tan",
    skinType: "smooth with faint old battle scars",
    distinguishingFeatures: ["small tusks", "muscular but still feminine frame"],
    scarsAndTattoos: ["tribal tattoo across left shoulder"],
    apparentAge: 26,
    trueAge: 26,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Very large",
        breastSizeCup: "F",
        breastShape: "Round",
        breastFirmness: "Firm",
        nippleType: "Protruding",
        nippleSize: "Large",
        pubicHairStyle: "Natural trimmed",
        underarmHairStyle: "Light stubble",
        waistCm: 66,
        hipCm: 100,
        assSize: "Full rounded with spread",
        assType: "Full / Prominent",
        assFirmness: "Firm",
        hasPenis: false,
    },
    portraitAssetId: "portrait_grael_ironhide",
    aestheticSummary:
        "A tall, powerful woman who looks like she could break a man in half — but her curves are undeniably feminine, and her confident bearing only makes them more striking.",
};

const GRAEL_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 14,
    agi: 8,
    wis: 6,
    def: 12,
    lck: 7,
};

const GRAEL_BASE_VITALS = {
    currentHp: 60,
    maxHp: 60,
    maxStamina: 40,
    maxCrestPower: 0,
};

const GRAEL_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.MainWeapon]: "orc_waraxe",
    [EquipmentSlot.Body]: "leather_armor",
    [EquipmentSlot.Legs]: "leather_pants",
    [EquipmentSlot.Feet]: "armored_boots",
    [EquipmentSlot.Underwear]: "simple_bra",
    [EquipmentSlot.Chest]: "simple_bra",
    [EquipmentSlot.Wrists]: "iron_bracers",
};

export const GRAEL: CompanionDef = {
    id: "GRAEL",
    displayName: "Grael Ironhide",
    race: Race.HalfOrc,
    homeRegion: "CRIMSON_MARCH",
    homeLocationId: "cm_grael_smithy",   // NEW
    combatRole: CombatRole.Vanguard,
    appearance: GRAEL_APPEARANCE,
    baseCombatAttributes: GRAEL_BASE_COMBAT_ATTRIBUTES,
    baseVitals: GRAEL_BASE_VITALS,
    specialAbilityId: "war_cry",
    passiveAbilityId: "bloodlust",
    defaultEquipment: GRAEL_DEFAULT_EQUIPMENT,
    questChainId: "grael_chain",
    suiteThemeId: "warriors_den",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

// ---------------------------------------------------------------------------
// VALKA — Dragonborn Vanguard (Bottom-Heavy Hourglass)
// ---------------------------------------------------------------------------
const VALKA_APPEARANCE: AppearanceDef = {
    heightCm: 178,
    heightTag: "Very Tall",
    build: "tall and strong, with a wide lower body and powerful tail",
    musclePresence: "Defined",
    gender: GenderId.Female,
    bodyShape: BodyShape.BottomHourglass,
    bodyCategory: "Bottom-Heavy Hourglass",
    hairColor: "Copper Red",
    hairStyle: "Short & Straight",
    eyeColor: "Gold with slit pupils",
    skinTone: "Medium warm / tan",
    skinType: "scaled on arms, legs, and tail; otherwise smooth",
    distinguishingFeatures: ["scales along forearms and lower legs", "a long reptilian tail"],
    scarsAndTattoos: ["burn mark on left cheek"],
    apparentAge: 28,
    trueAge: 28,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Full",
        breastSizeCup: "D",
        breastShape: "Teardrop",
        breastFirmness: "Soft",
        nippleType: "Flat",
        nippleSize: "Medium",
        pubicHairStyle: "Bare",
        underarmHairStyle: "Bare",
        waistCm: 70,
        hipCm: 104,
        assSize: "Large, prominent",
        assType: "Full / Prominent",
        assFirmness: "Soft",
        hasPenis: false,
    },
    racialFeatures: {
        hasTail: true,
        tailType: "long, scaled",
        hasWings: false,
        hasHorns: true,
        hornType: "small, swept back",
        hasTusks: false,
    },
    portraitAssetId: "portrait_valka_ember",
    aestheticSummary:
        "A fierce dragonborn warrior with a body that commands respect. Her hips are wide, her frame solid, and her tail gives her an exotic, dangerous grace.",
};

const VALKA_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 13,
    agi: 9,
    wis: 5,
    def: 11,
    lck: 8,
};

const VALKA_BASE_VITALS = {
    currentHp: 62,
    maxHp: 62,
    maxStamina: 40,
    maxCrestPower: 0,
};

const VALKA_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.MainWeapon]: "dragon_spear",
    [EquipmentSlot.Body]: "scale_armor",
    [EquipmentSlot.Legs]: "scale_leggings",
    [EquipmentSlot.Feet]: "heavy_boots",
    [EquipmentSlot.Underwear]: "simple_briefs",
    [EquipmentSlot.Socks]: "wool_socks",
};

export const VALKA: CompanionDef = {
    id: "VALKA",
    displayName: "Valka Ember",
    race: Race.Dragonborn,
    homeRegion: "CRIMSON_MARCH",
    homeLocationId: "cm_valka_den",   // NEW
    combatRole: CombatRole.Vanguard,
    appearance: VALKA_APPEARANCE,
    baseCombatAttributes: VALKA_BASE_COMBAT_ATTRIBUTES,
    baseVitals: VALKA_BASE_VITALS,
    specialAbilityId: "dragon_roar",
    passiveAbilityId: "fire_resistance",
    defaultEquipment: VALKA_DEFAULT_EQUIPMENT,
    questChainId: "valka_chain",
    suiteThemeId: "dragons_roost",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

// ---------------------------------------------------------------------------
// SEIRA — Dark Elf Rogue (Erotic Bombshell)
// ---------------------------------------------------------------------------
const SEIRA_APPEARANCE: AppearanceDef = {
    heightCm: 168,
    heightTag: "Above Average",
    build: "lithe and sinuous, with a narrow waist and dramatic curves",
    musclePresence: "Lightly toned",
    gender: GenderId.Female,
    bodyShape: BodyShape.Hourglass,
    bodyCategory: "Erotic Bombshell",
    hairColor: "Soft Black",
    hairStyle: "Long Ponytail",
    eyeColor: "Violet",
    skinTone: "Pale",
    skinType: "smooth, cool to the touch",
    distinguishingFeatures: ["pointed ears", "a natural dark marking around one eye"],
    scarsAndTattoos: ["small spider tattoo on her right hip"],
    apparentAge: 120,
    trueAge: 200,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Full",
        breastSizeCup: "D",
        breastShape: "Perky",
        breastFirmness: "Firm",
        nippleType: "Protruding",
        nippleSize: "Small",
        pubicHairStyle: "Bare",
        underarmHairStyle: "Bare",
        waistCm: 60,
        hipCm: 95,
        assSize: "Full rounded",
        assType: "Curvy / Defined",
        assFirmness: "Firm",
        hasPenis: false,
    },
    portraitAssetId: "portrait_seira_night",
    aestheticSummary:
        "A dark elf whose every movement is a dance. Her body is lean but deeply curved, with a dangerous grace that makes her impossible to ignore.",
};

const SEIRA_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 8,
    agi: 14,
    wis: 10,
    def: 7,
    lck: 12,
};

const SEIRA_BASE_VITALS = {
    currentHp: 52,
    maxHp: 52,
    maxStamina: 40,
    maxCrestPower: 0,
};

const SEIRA_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.MainWeapon]: "twin_daggers",
    [EquipmentSlot.Body]: "night_armor",
    [EquipmentSlot.Legs]: "night_pants",
    [EquipmentSlot.Feet]: "silent_boots",
    [EquipmentSlot.Underwear]: "silk_bra",
    [EquipmentSlot.Chest]: "silk_bra",
    [EquipmentSlot.Accessory1]: "poison_ring",
};

export const SEIRA: CompanionDef = {
    id: "SEIRA",
    displayName: "Seira Night",
    race: Race.DarkElf,
    homeRegion: "WHISPERING_WOOD",
    homeLocationId: "ww_seira_den",   // NEW
    combatRole: CombatRole.Rogue,
    appearance: SEIRA_APPEARANCE,
    baseCombatAttributes: SEIRA_BASE_COMBAT_ATTRIBUTES,
    baseVitals: SEIRA_BASE_VITALS,
    specialAbilityId: "shadow_step",
    passiveAbilityId: "poison_mastery",
    defaultEquipment: SEIRA_DEFAULT_EQUIPMENT,
    questChainId: "seira_chain",
    suiteThemeId: "shadow_chamber",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

// ---------------------------------------------------------------------------
// SYLVARA — Moon Elf Support (Bottom-Heavy Hourglass)
// ---------------------------------------------------------------------------
const SYLVARA_APPEARANCE: AppearanceDef = {
    heightCm: 165,
    heightTag: "Average",
    build: "soft, full, and motherly — a bottom-heavy hourglass with a serene presence",
    musclePresence: "None visible",
    gender: GenderId.Female,
    bodyShape: BodyShape.BottomHourglass,
    bodyCategory: "Bottom-Heavy Hourglass",
    hairColor: "Silver",
    hairStyle: "Long & Wavy",
    eyeColor: "Pale silver-blue",
    skinTone: "Very pale",
    skinType: "soft, almost luminous",
    distinguishingFeatures: ["pointed ears", "a faint crescent birthmark on her collarbone"],
    scarsAndTattoos: [],
    apparentAge: 200,
    trueAge: 300,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Full",
        breastSizeCup: "D",
        breastShape: "Teardrop",
        breastFirmness: "Soft",
        nippleType: "Puffy",
        nippleSize: "Medium",
        pubicHairStyle: "Bare",
        underarmHairStyle: "Bare",
        waistCm: 62,
        hipCm: 98,
        assSize: "Full rounded with spread",
        assType: "Full / Prominent",
        assFirmness: "Soft",
        hasPenis: false,
    },
    portraitAssetId: "portrait_sylvara_moon",
    aestheticSummary:
        "A moon elf with a gentle, maternal beauty. Her body is soft and full, with generous hips and a calm, nurturing aura that makes her feel like a safe harbor.",
};

const SYLVARA_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 6,
    agi: 8,
    wis: 14,
    def: 7,
    lck: 10,
};

const SYLVARA_BASE_VITALS = {
    currentHp: 50,
    maxHp: 50,
    maxStamina: 40,
    maxCrestPower: 0,
};

const SYLVARA_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.Body]: "moon_robe",
    [EquipmentSlot.Legs]: "moon_skirt",
    [EquipmentSlot.Feet]: "soft_sandals",
    [EquipmentSlot.Underwear]: "silk_bra",
    [EquipmentSlot.Chest]: "silk_bra",
    [EquipmentSlot.Neck]: "moonstone_pendant",
};

export const SYLVARA: CompanionDef = {
    id: "SYLVARA",
    displayName: "Sylvara Moon",
    race: Race.MoonElf,
    homeRegion: "WHISPERING_WOOD",
    homeLocationId: "ww_sylvara_grove",   // NEW
    combatRole: CombatRole.Support,
    appearance: SYLVARA_APPEARANCE,
    baseCombatAttributes: SYLVARA_BASE_COMBAT_ATTRIBUTES,
    baseVitals: SYLVARA_BASE_VITALS,
    specialAbilityId: "moonlight_heal",
    passiveAbilityId: "lunar_blessing",
    defaultEquipment: SYLVARA_DEFAULT_EQUIPMENT,
    questChainId: "sylvara_chain",
    suiteThemeId: "moonlit_garden",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

// ---------------------------------------------------------------------------
// REVA — Kitsune Rogue (Erotic Bombshell)
// ---------------------------------------------------------------------------
const REVA_APPEARANCE: AppearanceDef = {
    heightCm: 167,
    heightTag: "Average",
    build: "slender and svelte with a deceptive strength and heavy curves",
    musclePresence: "Lightly toned",
    gender: GenderId.Female,
    bodyShape: BodyShape.Hourglass,
    bodyCategory: "Erotic Bombshell",
    hairColor: "Deep Purple",
    hairStyle: "Twists",
    eyeColor: "Amber",
    skinTone: "Fair",
    skinType: "smooth",
    distinguishingFeatures: ["fox ears", "a long bushy tail"],
    scarsAndTattoos: [],
    apparentAge: 25,
    trueAge: 100,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Large",
        breastSizeCup: "E",
        breastShape: "Round",
        breastFirmness: "Soft",
        nippleType: "Protruding",
        nippleSize: "Medium",
        pubicHairStyle: "Bare",
        underarmHairStyle: "Bare",
        waistCm: 58,
        hipCm: 94,
        assSize: "Full rounded",
        assType: "Curvy / Defined",
        assFirmness: "Firm",
        hasPenis: false,
    },
    racialFeatures: {
        hasTail: true,
        tailType: "bushy fox tail",
        hasWings: false,
        hasHorns: false,
        hasTusks: false,
    },
    portraitAssetId: "portrait_reva_fox",
    aestheticSummary:
        "A playful kitsune with a body built for seduction. Her fox ears and tail add an exotic charm, and her curves are impossible to overlook.",
};

const REVA_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 7,
    agi: 13,
    wis: 11,
    def: 6,
    lck: 13,
};

const REVA_BASE_VITALS = {
    currentHp: 50,
    maxHp: 50,
    maxStamina: 40,
    maxCrestPower: 0,
};

const REVA_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.MainWeapon]: "fox_blade",
    [EquipmentSlot.Body]: "rogue_armor",
    [EquipmentSlot.Legs]: "rogue_pants",
    [EquipmentSlot.Feet]: "soft_boots",
    [EquipmentSlot.Underwear]: "silk_bra",
    [EquipmentSlot.Chest]: "silk_bra",
    [EquipmentSlot.Accessory1]: "fox_charm",
};

export const REVA: CompanionDef = {
    id: "REVA",
    displayName: "Reva Fox",
    race: Race.Kitsune,
    homeRegion: "AURIC_COURT",
    homeLocationId: "ac_reva_suite",   // NEW
    combatRole: CombatRole.Rogue,
    appearance: REVA_APPEARANCE,
    baseCombatAttributes: REVA_BASE_COMBAT_ATTRIBUTES,
    baseVitals: REVA_BASE_VITALS,
    specialAbilityId: "fox_fire",
    passiveAbilityId: "shadow_blend",
    defaultEquipment: REVA_DEFAULT_EQUIPMENT,
    questChainId: "reva_chain",
    suiteThemeId: "fox_den",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

// ---------------------------------------------------------------------------
// TASHA — Human Support (Soft & Feminine)
// ---------------------------------------------------------------------------
const TASHA_APPEARANCE: AppearanceDef = {
    heightCm: 165,
    heightTag: "Average",
    build: "soft, full, and comforting — a plush hourglass that feels like home",
    musclePresence: "None visible",
    gender: GenderId.Female,
    bodyShape: BodyShape.Hourglass,
    bodyCategory: "Soft & Feminine",
    hairColor: "Chestnut Brown",
    hairStyle: "Long & Wavy",
    eyeColor: "Hazel",
    skinTone: "Light neutral",
    skinType: "soft, warm",
    distinguishingFeatures: ["a beauty mark near her left eye"],
    scarsAndTattoos: [],
    apparentAge: 27,
    trueAge: 27,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Full",
        breastSizeCup: "D",
        breastShape: "Teardrop",
        breastFirmness: "Soft",
        nippleType: "Flat",
        nippleSize: "Large",
        pubicHairStyle: "Neatly trimmed",
        underarmHairStyle: "Bare",
        waistCm: 68,
        hipCm: 98,
        assSize: "Full rounded",
        assType: "Curvy / Defined",
        assFirmness: "Soft",
        hasPenis: false,
    },
    portraitAssetId: "portrait_tasha_heart",
    aestheticSummary:
        "A warm, earthy beauty with a generous body and an even more generous heart. Her curves are soft and inviting, and her smile is the kind that makes people feel safe.",
};

const TASHA_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 6,
    agi: 7,
    wis: 12,
    def: 7,
    lck: 9,
};

const TASHA_BASE_VITALS = {
    currentHp: 48,
    maxHp: 48,
    maxStamina: 40,
    maxCrestPower: 0,
};

const TASHA_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.Body]: "tavern_dress",
    [EquipmentSlot.Legs]: "simple_skirt",
    [EquipmentSlot.Feet]: "soft_shoes",
    [EquipmentSlot.Underwear]: "simple_bra",
    [EquipmentSlot.Chest]: "simple_bra",
    [EquipmentSlot.Neck]: "pearl_necklace",
};

export const TASHA: CompanionDef = {
    id: "TASHA",
    displayName: "Tasha Heart",
    race: Race.Human,
    homeRegion: "VERDANT_VALE",
    homeLocationId: "vv_tasha_hearth",   // NEW
    combatRole: CombatRole.Support,
    appearance: TASHA_APPEARANCE,
    baseCombatAttributes: TASHA_BASE_COMBAT_ATTRIBUTES,
    baseVitals: TASHA_BASE_VITALS,
    specialAbilityId: "soothing_song",
    passiveAbilityId: "warmth",
    defaultEquipment: TASHA_DEFAULT_EQUIPMENT,
    questChainId: "tasha_chain",
    suiteThemeId: "cozy_hearth",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

// ---------------------------------------------------------------------------
// SERA — Human Artillery (Straight & Sleek)
// ---------------------------------------------------------------------------
const SERA_APPEARANCE: AppearanceDef = {
    heightCm: 170,
    heightTag: "Above Average",
    build: "tall and slender with a straight, elegant silhouette",
    musclePresence: "Lightly toned",
    gender: GenderId.Female,
    bodyShape: BodyShape.RectangleStraight,
    bodyCategory: "Straight & Sleek",
    hairColor: "Jet Black",
    hairStyle: "Long Ponytail",
    eyeColor: "Steel blue",
    skinTone: "Fair",
    skinType: "smooth",
    distinguishingFeatures: ["sharp, intelligent eyes"],
    scarsAndTattoos: ["a thin scar along her collarbone"],
    apparentAge: 29,
    trueAge: 29,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Small full",
        breastSizeCup: "B",
        breastShape: "Perky",
        breastFirmness: "Firm",
        nippleType: "Protruding",
        nippleSize: "Small",
        pubicHairStyle: "Bare",
        underarmHairStyle: "Bare",
        waistCm: 66,
        hipCm: 86,
        assSize: "Compact and firm",
        assType: "Compact / Lean",
        assFirmness: "Firm",
        hasPenis: false,
    },
    portraitAssetId: "portrait_sera_void",
    aestheticSummary:
        "A poised, disciplined woman whose body is as clean and precise as her mind. She carries herself with quiet authority, and her straight, lean frame reflects years of training.",
};

const SERA_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 8,
    agi: 10,
    wis: 13,
    def: 9,
    lck: 10,
};

const SERA_BASE_VITALS = {
    currentHp: 50,
    maxHp: 50,
    maxStamina: 40,
    maxCrestPower: 0,
};

const SERA_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.Body]: "militant_coat",
    [EquipmentSlot.Legs]: "militant_pants",
    [EquipmentSlot.Feet]: "polished_boots",
    [EquipmentSlot.Underwear]: "simple_bra",
    [EquipmentSlot.Chest]: "simple_bra",
    [EquipmentSlot.Wrists]: "silver_bracers",
};

export const SERA: CompanionDef = {
    id: "SERA",
    displayName: "Sera Void",
    race: Race.Human,
    homeRegion: "MOUNTAIN_MONASTERY",
    homeLocationId: "mm_sera_quarters",   // NEW
    combatRole: CombatRole.Artillery,
    appearance: SERA_APPEARANCE,
    baseCombatAttributes: SERA_BASE_COMBAT_ATTRIBUTES,
    baseVitals: SERA_BASE_VITALS,
    specialAbilityId: "holy_smite",
    passiveAbilityId: "focus",
    defaultEquipment: SERA_DEFAULT_EQUIPMENT,
    questChainId: "sera_chain",
    suiteThemeId: "monastic_cell",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

// ---------------------------------------------------------------------------
// LYRA — Fallen Angel Support (Toned & Athletic)
// ---------------------------------------------------------------------------
const LYRA_APPEARANCE: AppearanceDef = {
    heightCm: 174,
    heightTag: "Tall",
    build: "athletic and lean, with a toned, graceful body",
    musclePresence: "Athletic defined",
    gender: GenderId.Female,
    bodyShape: BodyShape.Athletic,
    bodyCategory: "Toned & Athletic",
    hairColor: "White",
    hairStyle: "Long & Wavy",
    eyeColor: "Golden",
    skinTone: "Fair",
    skinType: "smooth",
    distinguishingFeatures: ["large white feathered wings", "a faint golden halo-like glow"],
    scarsAndTattoos: [],
    apparentAge: 30,
    trueAge: 500,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Medium full",
        breastSizeCup: "C",
        breastShape: "Perky",
        breastFirmness: "Firm",
        nippleType: "Protruding",
        nippleSize: "Medium",
        pubicHairStyle: "Bare",
        underarmHairStyle: "Bare",
        waistCm: 62,
        hipCm: 90,
        assSize: "Medium rounded",
        assType: "Average / Balanced",
        assFirmness: "Firm",
        hasPenis: false,
    },
    racialFeatures: {
        hasWings: true,
        wingType: "large white feathered wings",
        hasTail: false,
        hasHorns: false,
        hasTusks: false,
    },
    portraitAssetId: "portrait_lyra_fallen",
    aestheticSummary:
        "A fallen angel with a body like a dancer's — toned, lithe, and radiant. Her wings and golden eyes lend an ethereal beauty that is both striking and melancholic.",
};

const LYRA_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 7,
    agi: 11,
    wis: 13,
    def: 8,
    lck: 10,
};

const LYRA_BASE_VITALS = {
    currentHp: 50,
    maxHp: 50,
    maxStamina: 40,
    maxCrestPower: 0,
};

const LYRA_DEFAULT_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.Body]: "angelic_robe",
    [EquipmentSlot.Legs]: "angelic_skirt",
    [EquipmentSlot.Feet]: "golden_sandals",
    [EquipmentSlot.Underwear]: "silk_bra",
    [EquipmentSlot.Chest]: "silk_bra",
    [EquipmentSlot.Accessory1]: "holy_symbol",
};

export const LYRA: CompanionDef = {
    id: "LYRA",
    displayName: "Lyra Fallen",
    race: Race.FallenAngel,
    homeRegion: "CELESTIAL_THRESHOLD",
    homeLocationId: "ct_lyra_sanctum",   // NEW
    combatRole: CombatRole.Support,
    appearance: LYRA_APPEARANCE,
    baseCombatAttributes: LYRA_BASE_COMBAT_ATTRIBUTES,
    baseVitals: LYRA_BASE_VITALS,
    specialAbilityId: "grace",
    passiveAbilityId: "divine_light",
    defaultEquipment: LYRA_DEFAULT_EQUIPMENT,
    questChainId: "lyra_chain",
    suiteThemeId: "celestial_nest",
    moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};


export const ASTRAEA: CompanionDef = {
    id: CompanionId.Astraea,
    displayName: "Astraea",
    race: Race.Goddess,
    homeRegion: Region.CelestialThreshold,
    homeLocationId: "celestial_threshold_shrine", // or appropriate location ID
    combatRole: CombatRole.Support,  // high WIS, healing/buffs
    appearance: ASTRAEA_APPEARANCE,  // reuse the existing AppearanceDef
    baseCombatAttributes: {
        str: 18,
        agi: 18,
        wis: 35,
        def: 15,
        lck: 25,
    },
    baseVitals: {
        currentHp: 300,
        maxHp: 300,
        maxStamina: 200,
        maxCrestPower: 150,
    },
    specialAbilityId: "astraea_divine_blessing",      // define ability in skills/abilities data
    passiveAbilityId: "astraea_celestial_grace",
    defaultEquipment: {
        [EquipmentSlot.MainWeapon]: "staff_of_healing",
        [EquipmentSlot.Body]: "angelic_robe",
        [EquipmentSlot.Head]: "elven_circlet",
    },
    questChainId: "",  // no personal quest chain, or assign a simple one
    suiteThemeId: "celestial_suite",
    moveInRequirements: {
        trustAtLeast: 80,
        loveAtLeast: 80,
        minQuestStage: 0,
    },
};

// ---------------------------------------------------------------------------
// COMPANION LIST
// ---------------------------------------------------------------------------
export const COMPANIONS: CompanionDef[] = [
    MIRA,
    ISOLDE,
    GRAEL,
    VALKA,
    SEIRA,
    SYLVARA,
    REVA,
    TASHA,
    SERA,
    LYRA,
    ASTRAEA,
];