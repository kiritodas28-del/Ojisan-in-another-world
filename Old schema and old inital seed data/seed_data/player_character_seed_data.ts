// ============================================================================
// PLAYER CHARACTER SEED DATA — KENJI MORI
// ============================================================================
// Static definition for the protagonist. Runtime state (current HP, arousal,
// stamina, etc.) is initialized from these values when a new game begins.

import type {
    AppearanceDef,
    CombatAttributes,
    EroticAttributes,
    GameSettings,
    PlayerCharacterDef,
} from "../schemas/schemas";
import { BodyShape, EquipmentSlot, GenderId, Race } from "../schemas/schemas";

// ---------------------------------------------------------------------------
// APPEARANCE
// ---------------------------------------------------------------------------
const KENJI_APPEARANCE: AppearanceDef = {
    heightCm: 172,
    build: "average — sturdy but softened by age, with broad shoulders and a slight belly",
    gender: GenderId.Male,
    hairColor: "Dark Brown",
    hairStyle: "Short & Straight",
    eyeColor: "Brown",
    skinTone: "Fair",
    skinType: "smooth",
    distinguishingFeatures: ["kind, tired eyes", "calloused hands from office work and occasional odd jobs"],
    scarsAndTattoos: ["a small burn scar on his left forearm from a childhood accident"],
    apparentAge: 42,
    trueAge: 42,
    // bodyDetails omitted — male, per design
    // racialFeatures omitted — human, no special traits
    portraitAssetId: "portrait_kenji_mori",
    aestheticSummary:
        "A middle-aged man with gentle eyes and a perpetually tired expression. His build suggests he was once athletic, but years of desk work have softened his frame. He looks like someone who has lived an ordinary life and is quietly surprised to find himself in another world.",
};

// ---------------------------------------------------------------------------
// BASE COMBAT ATTRIBUTES (Level 1)
// ---------------------------------------------------------------------------
const KENJI_BASE_COMBAT_ATTRIBUTES: CombatAttributes = {
    str: 14,
    agi: 10,
    wis: 16,
    def: 13,
    lck: 24,
};

// ---------------------------------------------------------------------------
// BASE EROTIC ATTRIBUTES
// ---------------------------------------------------------------------------
const KENJI_BASE_EROTIC_ATTRIBUTES: EroticAttributes = {
    sensitivity: 10,
    technique: 10,
    virility: 20, // player only
};

// ---------------------------------------------------------------------------
// BASE VITALS (currentHp/maxHp/maxStamina/maxCrestPower)
// ---------------------------------------------------------------------------
const KENJI_BASE_VITALS = {
    currentHp: 130,
    maxHp: 130,
    maxStamina: 40,
    maxCrestPower: 20,
};

// ---------------------------------------------------------------------------
// STARTING EQUIPMENT
// ---------------------------------------------------------------------------
const KENJI_STARTING_EQUIPMENT: Partial<Record<EquipmentSlot, string>> = {
    [EquipmentSlot.MainWeapon]: "basic_sword",
    [EquipmentSlot.Body]: "travelers_clothes",
    [EquipmentSlot.Legs]: "travelers_pants",
    [EquipmentSlot.Feet]: "worn_boots",
    [EquipmentSlot.Underwear]: "simple_briefs",
    [EquipmentSlot.Socks]: "plain_socks",
    // Other slots intentionally left empty
};

// ---------------------------------------------------------------------------
// STARTING INVENTORY
// ---------------------------------------------------------------------------
const KENJI_STARTING_INVENTORY: { itemId: string; quantity: number }[] = [
    { itemId: "health_potion", quantity: 3 },
    { itemId: "mana_potion", quantity: 2 },
    { itemId: "travel_rations", quantity: 5 },
    { itemId: "antidote_herb", quantity: 1 },
];

// ---------------------------------------------------------------------------
// STATIC PLAYER CHARACTER DEFINITION
// ---------------------------------------------------------------------------
export const PLAYER_CHARACTER_DEF: PlayerCharacterDef = {
    name: "Kenji Mori",
    appearance: KENJI_APPEARANCE,
    baseCombatAttributes: KENJI_BASE_COMBAT_ATTRIBUTES,
    baseEroticAttributes: KENJI_BASE_EROTIC_ATTRIBUTES,
    baseVitals: KENJI_BASE_VITALS,
    startingEquipment: KENJI_STARTING_EQUIPMENT,
    startingInventory: KENJI_STARTING_INVENTORY,
    startingSkillNodeIds: [
        "battle_solid_strike",
        "battle_hold_the_line",
        "ardor_reading_the_room",
        "ardor_attentive_touch",
    ]
};

// ---------------------------------------------------------------------------
// DEFAULT GAME SETTINGS
// ---------------------------------------------------------------------------
export const DEFAULT_GAME_SETTINGS: GameSettings = {
    // Default distribution of NPC body types in spawned populations.
    // These are percentage weights; the engine normalizes them.
    npcBodyTypeDistribution: {
        [BodyShape.Hourglass]: 15,
        [BodyShape.PearTriangle]: 15,
        [BodyShape.Rectangle]: 15,
        [BodyShape.Athletic]: 15,
        [BodyShape.Spoon]: 10,
        [BodyShape.TopHourglass]: 8,
        [BodyShape.BottomHourglass]: 8,
        [BodyShape.InvertedTriangle]: 5,
        [BodyShape.Apple]: 4,
        [BodyShape.Bell]: 3,
        [BodyShape.Diamond]: 1,
        [BodyShape.Oval]: 1,
        [BodyShape.Lollipop]: 0.5,
        [BodyShape.Cornet]: 0.5,
    },
};