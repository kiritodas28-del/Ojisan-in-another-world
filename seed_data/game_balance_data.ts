// ============================================================================
// GAME BALANCE DATA
// ============================================================================
// Central balance constants, level-scaling multipliers, and configuration
// values shared by all engines and seed data.
// ============================================================================

import {
    BodyShape,
    CombatRole,
    EquipmentCategory,
    MonsterType,
} from "../schemas/schemas";
import { ArousalState, CombatAttributes } from "../schemas/schemas";

// ---------------------------------------------------------------------------
// COMMON TYPES
// ---------------------------------------------------------------------------
export type StatKey = keyof CombatAttributes | "hp";
export type StatMultiplierMap = Record<StatKey, number>;

// ---------------------------------------------------------------------------
// LEVELING
// ---------------------------------------------------------------------------

export const BASE_GROWTH_PER_LEVEL: StatMultiplierMap = {
    hp: 6,
    str: 0.8,
    agi: 0.6,
    wis: 0.8,
    def: 0.6,
    lck: 0.5,
};

export const PLAYER_GROWTH_VECTOR: StatMultiplierMap = {
    hp: 8,
    str: 1.0,
    agi: 0.6,
    wis: 1.0,
    def: 0.7,
    lck: 0.6,
};

// ---------------------------------------------------------------------------
// ROLE & MONSTER TYPE SCALING MULTIPLIERS
// ---------------------------------------------------------------------------

export const ROLE_MULTIPLIERS: Record<CombatRole, StatMultiplierMap> = {
    [CombatRole.Vanguard]: {
        hp: 1.4,
        str: 1.2,
        agi: 0.8,
        wis: 0.8,
        def: 1.3,
        lck: 0.9,
    },
    [CombatRole.Support]: {
        hp: 0.9,
        str: 0.7,
        agi: 0.8,
        wis: 1.3,
        def: 0.8,
        lck: 1.0,
    },
    [CombatRole.Artillery]: {
        hp: 0.8,
        str: 0.9,
        agi: 0.7,
        wis: 1.2,
        def: 0.7,
        lck: 0.9,
    },
    [CombatRole.Rogue]: {
        hp: 0.9,
        str: 0.9,
        agi: 1.3,
        wis: 0.7,
        def: 0.8,
        lck: 1.2,
    },
};

export const MONSTER_TYPE_MULTIPLIERS: Record<MonsterType, StatMultiplierMap> = {
    [MonsterType.Beast]: {
        hp: 1.0,
        str: 1.1,
        agi: 1.1,
        wis: 0.6,
        def: 0.9,
        lck: 0.8,
    },
    [MonsterType.MiasmaCorrupted]: {
        hp: 1.2,
        str: 1.0,
        agi: 0.9,
        wis: 1.2,
        def: 1.1,
        lck: 0.9,
    },
    [MonsterType.Construct]: {
        hp: 1.5,
        str: 1.2,
        agi: 0.5,
        wis: 0.4,
        def: 1.4,
        lck: 0.5,
    },
    [MonsterType.Draconic]: {
        hp: 1.4,
        str: 1.3,
        agi: 0.9,
        wis: 1.0,
        def: 1.2,
        lck: 1.0,
    },
    [MonsterType.Humanoid]: {
        hp: 1.0,
        str: 1.0,
        agi: 1.0,
        wis: 1.0,
        def: 1.0,
        lck: 1.0,
    },
    [MonsterType.VoidAberration]: {
        hp: 1.3,
        str: 1.1,
        agi: 1.2,
        wis: 1.4,
        def: 1.0,
        lck: 1.1,
    },
    [MonsterType.Cosmic]: {
        hp: 2.0,
        str: 1.8,
        agi: 1.5,
        wis: 2.0,
        def: 1.8,
        lck: 1.5,
    },
};

// ---------------------------------------------------------------------------
// NPC BODY TYPE DISTRIBUTION
// ---------------------------------------------------------------------------

export const DEFAULT_NPC_BODY_TYPE_DISTRIBUTION: Partial<Record<BodyShape, number>> = {
    [BodyShape.Hourglass]: 18,
    [BodyShape.PearTriangle]: 14,
    [BodyShape.AppleRound]: 4,
    [BodyShape.RectangleStraight]: 14,
    [BodyShape.InvertedTriangle]: 9,
    [BodyShape.Spoon]: 7,
    [BodyShape.Diamond]: 3,
    [BodyShape.Oval]: 4,
    [BodyShape.Athletic]: 8,
    [BodyShape.TopHourglass]: 5,
    [BodyShape.BottomHourglass]: 5,
    [BodyShape.Bell]: 3,
    [BodyShape.Lollipop]: 2,
    [BodyShape.Cornet]: 4,
};

// ---------------------------------------------------------------------------
// MANOR TIER CONFIGURATION
// ---------------------------------------------------------------------------

export interface ManorTierConfig {
    tier: 1 | 2 | 3 | 4;
    storageSlotsMax: number;
    suitesAvailable: number;
    upgradeCostGold: number;
    upgradeDays: number;
    craftingUnlocked: boolean;
    guidedUpgradeUnlocked: boolean;
    passiveGenerationSlots: number;
}

export const MANOR_TIER_CONFIGS: Record<number, ManorTierConfig> = {
    1: {
        tier: 1,
        storageSlotsMax: 20,
        suitesAvailable: 2,
        upgradeCostGold: 0,
        upgradeDays: 0,
        craftingUnlocked: false,
        guidedUpgradeUnlocked: false,
        passiveGenerationSlots: 0,
    },
    2: {
        tier: 2,
        storageSlotsMax: 40,
        suitesAvailable: 4,
        upgradeCostGold: 500,
        upgradeDays: 3,
        craftingUnlocked: true,
        guidedUpgradeUnlocked: false,
        passiveGenerationSlots: 2,
    },
    3: {
        tier: 3,
        storageSlotsMax: 70,
        suitesAvailable: 10,
        upgradeCostGold: 1500,
        upgradeDays: 5,
        craftingUnlocked: true,
        guidedUpgradeUnlocked: false,
        passiveGenerationSlots: 4,
    },
    4: {
        tier: 4,
        storageSlotsMax: 100,
        suitesAvailable: 20,
        upgradeCostGold: 3000,
        upgradeDays: 7,
        craftingUnlocked: true,
        guidedUpgradeUnlocked: true,
        passiveGenerationSlots: 8,
    },
};

// ---------------------------------------------------------------------------
// RELATIONSHIP BANDS
// ---------------------------------------------------------------------------

export const RELATIONSHIP_BANDS = {
    Low: { min: -100, max: -1 },
    Neutral: { min: 0, max: 39 },
    High: { min: 40, max: 85 },
    VeryHigh: { min: 86, max: 100 },
} as const;

export const GIFT_BONUS = {
    trust: 5,
    love: 6,
} as const;

export const CONTACT_CAP = 200;

// ---------------------------------------------------------------------------
// FATIGUE LEVELS
// ---------------------------------------------------------------------------

export interface FatiguePenalty {
    daysSinceLastSleep: number;
    staminaRegenPenalty: number; // percentage penalty to passive regen
    statPenalty: number;         // percentage penalty to combat stats
    forcedCollapse: boolean;
}

export const FATIGUE_LEVELS: FatiguePenalty[] = [
    { daysSinceLastSleep: 0, staminaRegenPenalty: 0, statPenalty: 0, forcedCollapse: false },
    { daysSinceLastSleep: 1, staminaRegenPenalty: 10, statPenalty: 0, forcedCollapse: false },
    { daysSinceLastSleep: 2, staminaRegenPenalty: 30, statPenalty: 5, forcedCollapse: false },
    { daysSinceLastSleep: 3, staminaRegenPenalty: 50, statPenalty: 10, forcedCollapse: false },
    { daysSinceLastSleep: 4, staminaRegenPenalty: 70, statPenalty: 20, forcedCollapse: false },
    { daysSinceLastSleep: 5, staminaRegenPenalty: 100, statPenalty: 30, forcedCollapse: true },
];

// ---------------------------------------------------------------------------
// ENCOUNTER CHANCES (by day phase)
// ---------------------------------------------------------------------------

export const ENCOUNTER_CHANCES = {
    Day: 0.15,
    Night: 0.225,
    Midnight: 0.30,
} as const;

// ---------------------------------------------------------------------------
// REPUTATION THRESHOLDS
// ---------------------------------------------------------------------------

export interface ReputationTier {
    min: number;
    max: number;
    label: string;
}

export const REPUTATION_LEVEL_THRESHOLDS: ReputationTier[] = [
    { min: -800, max: -401, label: "Hated" },
    { min: -400, max: -151, label: "Infamous" },
    { min: -150, max: -1, label: "Disliked" },
    { min: 0, max: 149, label: "Unknown" },
    { min: 150, max: 399, label: "Known" },
    { min: 400, max: 800, label: "Renowned" },
];

// ---------------------------------------------------------------------------
// AP / BP ACQUISITION
// ---------------------------------------------------------------------------

export const AP_BP_ACQUISITION = {
    AP_PER_LEVEL: 1,
    BP_PER_LEVEL: 1,
    AP_PER_MAIN_QUEST: 2,
    BP_PER_MAIN_QUEST: 2,
    AP_PER_COMPANION_QUEST: 1,
    BP_PER_COMPANION_QUEST: 1,
    AP_PER_ACHIEVEMENT_BRONZE: 1,
    BP_PER_ACHIEVEMENT_BRONZE: 1,
    AP_PER_ACHIEVEMENT_SILVER: 2,
    BP_PER_ACHIEVEMENT_SILVER: 2,
    AP_PER_ACHIEVEMENT_GOLD: 3,
    BP_PER_ACHIEVEMENT_GOLD: 3,
    AP_PER_ACHIEVEMENT_PLATINUM: 5,
    BP_PER_ACHIEVEMENT_PLATINUM: 5,
} as const;

// ---------------------------------------------------------------------------
// SLEEP & SATISFACTION
// ---------------------------------------------------------------------------

export const SLEEP_COST = 20; // gold at inn

export const SATISFACTION_WEIGHTS = {
    arousal: 40,
    tech: 30,
    kink: 15,
    sincere: 15,
} as const;

// ---------------------------------------------------------------------------
// EQUIPMENT UPGRADE STAT POOLS
// ---------------------------------------------------------------------------

export const UPGRADE_STAT_POOLS: Record<EquipmentCategory, string[]> = {
    [EquipmentCategory.Weapon]: ["str", "agi", "lck"],
    [EquipmentCategory.Armor]: ["def", "hp", "wis"],
    [EquipmentCategory.Clothing]: ["sensitivity", "technique", "virility", "maxStamina"],
};

// ---------------------------------------------------------------------------
// AROUSAL STATE THRESHOLDS
// ---------------------------------------------------------------------------

export const AROUSAL_STATE_THRESHOLDS: Record<ArousalState, [number, number]> = {
    [ArousalState.Unaroused]: [0, 20],
    [ArousalState.Warming]: [21, 40],
    [ArousalState.Aroused]: [41, 60],
    [ArousalState.Needy]: [61, 80],
    [ArousalState.Overwhelmed]: [81, 100],
};