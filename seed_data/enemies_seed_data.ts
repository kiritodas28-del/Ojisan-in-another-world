// ============================================================================
// ENEMIES SEED DATA
// ============================================================================
// 150 enemy templates: 100 non-humanoid, 40 female humanoid, 10 male humanoid.
// ============================================================================

import type {
    CombatAttributes,
    CharacterVitals,
    EnemyCombatantDef,
    HumanoidAppearanceRule,
    AppearanceDef,
} from "../schemas/schemas";
import {
    BodyShape,
    EnemyAiPattern,
    GenderId,
    MonsterType,
    NpcLegalClass,
} from "../schemas/schemas";
import { BODY_SHAPE_TO_CATEGORY_MAP, getHeightTag } from "../seed_data/appearance_options_seed_data";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function attr(str: number, agi: number, wis: number, def: number, lck: number): CombatAttributes {
    return { str, agi, wis, def, lck };
}

function baseVitals(hp: number): Omit<
    CharacterVitals,
    "currentArousal" | "currentStamina" | "currentCrestPower"
> {
    return { currentHp: hp, maxHp: hp, maxStamina: 0, maxCrestPower: 0 };
}

function nonHumanoid(
    id: string,
    name: string,
    monsterType: MonsterType,
    family: string,
    baseLevel: number,
    combat: CombatAttributes,
    hp: number,
    aiPattern: EnemyAiPattern,
    abilityIds: string[],
    gold: [number, number],
    lootTableId: string,
    isBoss = false,
    monsterSex?: "FEMALE" | "MALE" | "NONE",
    isHumanoidForm?: boolean,
    maxMiasmaReserve?: number,
): EnemyCombatantDef {
    return {
        id,
        name,
        monsterType,
        family,
        baseLevel,
        combatAttributes: combat,
        baseVitals: baseVitals(hp),
        aiPattern: isBoss ? EnemyAiPattern.BossScripted : aiPattern,
        abilityIds,
        goldDropRange: gold,
        lootTableId,
        legalClass: NpcLegalClass.Outlaw,
        presentsDefeatMenu: false,
        monsterSex,
        isHumanoidForm,
        maxMiasmaReserve,
    };
}


// ---------------------------------------------------------------------------
// HUMANIOID APPEARANCE RULES
// ---------------------------------------------------------------------------

const FEMALE_BASE_RULE: HumanoidAppearanceRule = {
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
    pubicHairOptions: ["Bare", "Neatly trimmed", "Natural trimmed"],
    underarmHairOptions: ["Bare", "Light stubble"],
    bodyShapeWeights: {
        [BodyShape.Hourglass]: 35,
        [BodyShape.PearTriangle]: 25,
        [BodyShape.TopHourglass]: 15,
        [BodyShape.BottomHourglass]: 15,
        [BodyShape.Spoon]: 5,
        [BodyShape.RectangleStraight]: 3,
        [BodyShape.AppleRound]: 2,
    },
};

const MALE_BASE_RULE: HumanoidAppearanceRule = {
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
        [BodyShape.RectangleStraight]: 40,
        [BodyShape.Athletic]: 35,
        [BodyShape.InvertedTriangle]: 15,
        [BodyShape.Oval]: 5,
        [BodyShape.AppleRound]: 5,
    },
};

// Family-specific overrides (optional)
const FAMILY_RULES: Record<string, Partial<HumanoidAppearanceRule>> = {
    cultist: {
        buildOptions: ["slender", "gaunt", "toned"],
        hairColorOptions: ["Soft Black", "Jet Black", "Dark Brown", "White"],
        skinToneOptions: ["Pale", "Very pale", "Fair"],
        eyeColorOptions: ["Violet", "Red", "Grey", "Black"],
    },
    bandit: {
        buildOptions: ["lean", "wiry", "muscular"],
        skinToneOptions: ["Medium warm / tan", "Light warm / olive", "Medium brown"],
    },
    mercenary: {
        buildOptions: ["athletic", "muscular", "toned"],
        musclePresenceOptions: ["Clearly toned", "Defined", "Athletic defined"],
    },
    witch: {
        buildOptions: ["slender", "frail", "toned"],
        hairColorOptions: ["White", "Grey", "Soft Black", "Deep Purple"],
        eyeColorOptions: ["Green", "Violet", "Amber"],
    },
    assassin: {
        buildOptions: ["lean", "lithe", "toned"],
        musclePresenceOptions: ["Lightly toned", "Clearly toned", "Defined"],
    },
    raider: {
        buildOptions: ["muscular", "stocky", "athletic"],
    },
    rogue: {
        buildOptions: ["lean", "wiry", "lithe"],
    },
};

// ---------------------------------------------------------------------------
// APPEARANCE GENERATOR
// ---------------------------------------------------------------------------
function rollFromOptions<T>(options: T[], seed: string): T {
    const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return options[hash % options.length];
}

function rollWeightedShape(weights: Partial<Record<BodyShape, number>>, seed: string): BodyShape {
    const entries = Object.entries(weights) as [BodyShape, number][];
    const total = entries.reduce((sum, [, w]) => sum + w, 0);
    let roll = (seed.length * 13) % total;
    for (const [shape, weight] of entries) {
        if (roll < weight) return shape;
        roll -= weight;
    }
    return entries[0][0];
}

function generateHumanoidAppearance(
    gender: "FEMALE" | "MALE",
    family: string,
    seed: string,
): AppearanceDef {
    const baseRule = gender === "FEMALE" ? FEMALE_BASE_RULE : MALE_BASE_RULE;
    const override = FAMILY_RULES[family] ?? {};
    const rule: HumanoidAppearanceRule = { ...baseRule, ...override };

    const heightCm = rule.heightRange[0] + (seed.length % (rule.heightRange[1] - rule.heightRange[0]));
    const bodyShape = rollWeightedShape(rule.bodyShapeWeights, seed + "shape");
    const bodyCategory = BODY_SHAPE_TO_CATEGORY_MAP[bodyShape][0].category; // use first category for simplicity

    const appearance: AppearanceDef = {
        heightCm,
        heightTag: getHeightTag(heightCm),
        build: rollFromOptions(rule.buildOptions, seed + "build"),
        musclePresence: rollFromOptions(rule.musclePresenceOptions, seed + "muscle"),
        gender: gender === "FEMALE" ? GenderId.Female : GenderId.Male,
        bodyShape,
        bodyCategory,
        hairColor: rollFromOptions(rule.hairColorOptions, seed + "haircolor"),
        hairStyle: rollFromOptions(rule.hairStyleOptions, seed + "hairstyle"),
        eyeColor: rollFromOptions(rule.eyeColorOptions, seed + "eye"),
        skinTone: rollFromOptions(rule.skinToneOptions, seed + "skin"),
        skinType: "smooth",
        distinguishingFeatures: [],
        scarsAndTattoos: [],
        apparentAge: 20 + (seed.length % 30),
        trueAge: 20 + (seed.length % 30),
        bodyDetails: {
            hasBreasts: gender === "FEMALE",
            waistCm: gender === "FEMALE" ? 58 + (seed.length % 20) : 70 + (seed.length % 15),
            hipCm: gender === "FEMALE" ? 85 + (seed.length % 35) : 85 + (seed.length % 20),
            assSize: rollFromOptions(rule.assSizeOptions, seed + "asssize"),
            assType: rollFromOptions(rule.assTypeOptions, seed + "asstype"),
            assFirmness: rollFromOptions(rule.assFirmnessOptions, seed + "assfirm"),
            pubicHairStyle: rollFromOptions(rule.pubicHairOptions, seed + "pubic"),
            underarmHairStyle: rollFromOptions(rule.underarmHairOptions, seed + "underarm"),
            hasPenis: gender === "MALE",
            penisLengthCm: gender === "MALE" ? 12 + (seed.length % 8) : undefined,
            penisGirthCm: gender === "MALE" ? 10 + (seed.length % 4) : undefined,
            semenVolume: gender === "MALE" ? "average" : undefined,
        },
        portraitAssetId: `portrait_enemy_${family}_${gender.toLowerCase()}`,
        aestheticSummary: "",
    };

    if (gender === "FEMALE") {
        appearance.bodyDetails!.breastSize = rollFromOptions(rule.breastSizeOptions!, seed + "breastsize");
        appearance.bodyDetails!.breastSizeCup = rollFromOptions(rule.breastCupOptions!, seed + "cup");
        appearance.bodyDetails!.breastShape = rollFromOptions(rule.breastShapeOptions!, seed + "shape");
        appearance.bodyDetails!.breastFirmness = rollFromOptions(["Firm", "Soft", "Loose"], seed + "firm");
        appearance.bodyDetails!.nippleType = rollFromOptions(["Protruding", "Puffy", "Flat"], seed + "nipple");
        appearance.bodyDetails!.nippleSize = rollFromOptions(["Small", "Medium", "Large"], seed + "nipplesize");
    }

    return appearance;
}

// ---------------------------------------------------------------------------
// HUMANIOID FACTORY
// ---------------------------------------------------------------------------
function humanoid(
    id: string,
    name: string,
    family: string,
    baseLevel: number,
    combat: CombatAttributes,
    hp: number,
    aiPattern: EnemyAiPattern,
    abilityIds: string[],
    gold: [number, number],
    lootTableId: string,
    monsterSex: "FEMALE" | "MALE",
    isHumanoidForm: boolean,
    maxMiasmaReserve?: number,
): EnemyCombatantDef {
    const appearance = generateHumanoidAppearance(monsterSex, family, id);
    return {
        id,
        name,
        monsterType: MonsterType.Humanoid,
        family,
        baseLevel,
        combatAttributes: combat,
        baseVitals: baseVitals(hp),
        aiPattern,
        abilityIds,
        goldDropRange: gold,
        lootTableId,
        legalClass: NpcLegalClass.Outlaw,
        presentsDefeatMenu: true,
        monsterSex,
        isHumanoidForm: true,
        maxMiasmaReserve,
        appearance,
    };
}

// ===========================================================================
// NON-HUMANOID MONSTERS (100)
// ===========================================================================
const nonHumanoidEnemies: EnemyCombatantDef[] = [
    nonHumanoid("blighted_direwolf", "Blighted Direwolf", MonsterType.Beast, "wolf", 3, attr(9, 12, 4, 5, 6), 60, EnemyAiPattern.Aggressive, ["bite_lunge"], [5, 15], "direwolf_loot_table"),
    nonHumanoid("shadow_panther", "Shadow Panther", MonsterType.Beast, "panther", 20, attr(14, 18, 6, 8, 10), 140, EnemyAiPattern.Aggressive, ["pounce", "shred"], [20, 40], "panther_loot_table"),
    nonHumanoid("blighted_treant", "Blighted Treant", MonsterType.MiasmaCorrupted, "treant", 8, attr(12, 4, 10, 14, 5), 200, EnemyAiPattern.BossScripted, ["root_slam", "miasma_burst"], [40, 80], "treant_loot_table", true),
    nonHumanoid("miasma_wraith_archivist", "Miasma Wraith Archivist", MonsterType.MiasmaCorrupted, "wraith", 12, attr(8, 14, 16, 7, 10), 180, EnemyAiPattern.SupportCaster, ["wraith_bolt", "curse"], [30, 60], "wraith_loot_table", true),
    nonHumanoid("rogue_battle_golem", "Rogue Battle Golem", MonsterType.Construct, "golem", 10, attr(16, 2, 4, 18, 3), 280, EnemyAiPattern.Defensive, ["smash", "guard"], [50, 100], "golem_loot_table", true),
    nonHumanoid("crimson_wyrmling", "Crimson Wyrmling", MonsterType.Draconic, "wyrm", 15, attr(13, 10, 8, 11, 9), 220, EnemyAiPattern.Aggressive, ["fire_breath", "claw_swipe"], [40, 80], "wyrmling_loot_table"),
    nonHumanoid("miasma_wyrm", "Miasma Wyrm", MonsterType.Draconic, "wyrm", 22, attr(20, 12, 14, 18, 10), 520, EnemyAiPattern.BossScripted, ["miasma_breath", "tail_sweep", "wyrm_roar"], [200, 400], "miasma_wyrm_loot_table", true),
    nonHumanoid("heartwood_abomination", "Heartwood Abomination", MonsterType.MiasmaCorrupted, "abomination", 26, attr(24, 6, 18, 20, 8), 700, EnemyAiPattern.BossScripted, ["heartwood_regen", "root_crush", "miasma_seed"], [300, 600], "heartwood_loot_table", true),
    nonHumanoid("void_stalker", "Void Stalker", MonsterType.VoidAberration, "void-stalker", 32, attr(18, 16, 12, 14, 13), 420, EnemyAiPattern.Aggressive, ["void_slash", "phase"], [80, 160], "void_stalker_loot_table"),
    nonHumanoid("miasma_succubus_boss", "Miasma Succubus", MonsterType.MiasmaCorrupted, "succubus", 34, attr(22, 18, 26, 14, 16), 280, EnemyAiPattern.BossScripted, ["succubus_temptation_kiss", "succubus_corrupting_embrace", "succubus_shadow_claw"], [400, 600], "miasma_succubus_loot_table", true, "FEMALE", true, 40),
    nonHumanoid("void_concubine_boss", "Void Concubine", MonsterType.VoidAberration, "void-concubine", 44, attr(30, 24, 34, 20, 18), 520, EnemyAiPattern.BossScripted, ["void_concubine_embrace", "void_concubine_lash", "void_concubine_devour"], [900, 1300], "void_concubine_loot_table", true, "FEMALE", true, 45),
    nonHumanoid("corrupted_incubus", "Corrupted Incubus", MonsterType.MiasmaCorrupted, "incubus", 22, attr(16, 14, 18, 10, 12), 140, EnemyAiPattern.SupportCaster, ["incubus_seductive_touch", "incubus_shadow_strike"], [60, 100], "incubus_loot_table", false, "MALE", true, 20),
    nonHumanoid("blighted_bear", "Blighted Bear", MonsterType.Beast, "bear", 4, attr(12, 8, 3, 8, 6), 80, EnemyAiPattern.Aggressive, ["maul", "roar"], [8, 18], "bear_loot_table"),
    nonHumanoid("giant_spider", "Giant Spider", MonsterType.Beast, "spider", 5, attr(8, 14, 2, 4, 10), 55, EnemyAiPattern.Aggressive, ["web_spit", "venom_bite"], [6, 14], "spider_loot_table"),
    nonHumanoid("miasma_wolf", "Miasma Wolf", MonsterType.MiasmaCorrupted, "wolf", 6, attr(11, 12, 7, 6, 8), 75, EnemyAiPattern.Aggressive, ["miasma_bite", "frenzy"], [10, 20], "miasma_wolf_loot_table"),
    nonHumanoid("stone_golem", "Stone Golem", MonsterType.Construct, "golem", 9, attr(18, 1, 3, 20, 2), 320, EnemyAiPattern.Defensive, ["stone_slam", "rock_throw"], [40, 80], "stone_golem_loot_table"),
    nonHumanoid("crystal_scorpion", "Crystal Scorpion", MonsterType.Beast, "scorpion", 7, attr(10, 13, 4, 9, 11), 65, EnemyAiPattern.Defensive, ["stinger", "crystal_armor"], [15, 30], "scorpion_loot_table"),
    nonHumanoid("wyvern", "Wyvern", MonsterType.Draconic, "wyvern", 18, attr(16, 14, 8, 12, 10), 240, EnemyAiPattern.Aggressive, ["talon_strike", "wing_buffet"], [50, 100], "wyvern_loot_table"),
    nonHumanoid("void_horror", "Void Horror", MonsterType.VoidAberration, "void-horror", 30, attr(20, 10, 16, 15, 12), 360, EnemyAiPattern.SupportCaster, ["void_bolt", "madness"], [70, 140], "void_horror_loot_table"),
    nonHumanoid("miasma_oozebeast", "Miasma Oozebeast", MonsterType.MiasmaCorrupted, "ooze", 11, attr(9, 3, 12, 14, 5), 110, EnemyAiPattern.Defensive, ["acid_spray", "absorb"], [12, 25], "ooze_loot_table"),
    nonHumanoid("basilisk", "Basilisk", MonsterType.Beast, "basilisk", 14, attr(12, 10, 9, 11, 7), 130, EnemyAiPattern.Defensive, ["petrifying_gaze", "tail_swipe"], [25, 50], "basilisk_loot_table"),
    nonHumanoid("miasma_wraith", "Miasma Wraith", MonsterType.MiasmaCorrupted, "wraith", 10, attr(7, 13, 14, 6, 9), 90, EnemyAiPattern.SupportCaster, ["wraith_touch", "drain"], [15, 30], "wraith_loot_table"),
    nonHumanoid("dire_bat", "Dire Bat", MonsterType.Beast, "bat", 2, attr(5, 15, 2, 3, 8), 30, EnemyAiPattern.Aggressive, ["swoop", "screech"], [2, 6], "bat_loot_table"),
    nonHumanoid("miasma_boar", "Miasma Boar", MonsterType.MiasmaCorrupted, "boar", 5, attr(13, 8, 3, 9, 6), 85, EnemyAiPattern.Aggressive, ["charge", "tusk_gore"], [7, 16], "boar_loot_table"),
    nonHumanoid("iron_construct", "Iron Construct", MonsterType.Construct, "construct", 13, attr(14, 2, 5, 15, 3), 260, EnemyAiPattern.Defensive, ["iron_punch", "gear_grind"], [35, 70], "construct_loot_table"),
    nonHumanoid("serpent_drake", "Serpent Drake", MonsterType.Draconic, "drake", 16, attr(14, 13, 9, 11, 10), 210, EnemyAiPattern.Aggressive, ["constrict", "acid_spit"], [40, 80], "drake_loot_table"),
    nonHumanoid("void_spawn", "Void Spawn", MonsterType.VoidAberration, "void-spawn", 26, attr(17, 14, 14, 12, 11), 300, EnemyAiPattern.Aggressive, ["void_claw", "teleport"], [60, 120], "void_spawn_loot_table"),
    nonHumanoid("miasma_treant", "Miasma Treant", MonsterType.MiasmaCorrupted, "treant", 9, attr(13, 3, 10, 15, 5), 180, EnemyAiPattern.Defensive, ["root_grasp", "miasma_pollen"], [30, 60], "treant_loot_table"),
    nonHumanoid("giant_wolf", "Giant Wolf", MonsterType.Beast, "wolf", 8, attr(12, 15, 5, 7, 9), 100, EnemyAiPattern.Aggressive, ["alpha_bite", "howl"], [15, 30], "wolf_loot_table"),
    nonHumanoid("crystal_golem", "Crystal Golem", MonsterType.Construct, "golem", 15, attr(17, 1, 6, 18, 4), 350, EnemyAiPattern.Defensive, ["crystal_shard", "reflect"], [50, 100], "crystal_golem_loot_table"),
    nonHumanoid("miasma_rat", "Miasma Rat", MonsterType.MiasmaCorrupted, "rat", 1, attr(4, 10, 2, 2, 6), 20, EnemyAiPattern.Aggressive, ["disease_bite"], [1, 4], "rat_loot_table"),
    nonHumanoid("fire_drake", "Fire Drake", MonsterType.Draconic, "drake", 17, attr(15, 12, 11, 12, 9), 230, EnemyAiPattern.Aggressive, ["fire_breath", "claw"], [45, 90], "fire_drake_loot_table"),
    nonHumanoid("void_wisp", "Void Wisp", MonsterType.VoidAberration, "void-wisp", 24, attr(8, 20, 16, 10, 12), 180, EnemyAiPattern.SupportCaster, ["void_flash", "confusion"], [40, 80], "void_wisp_loot_table"),
    nonHumanoid("miasma_hound", "Miasma Hound", MonsterType.MiasmaCorrupted, "hound", 6, attr(11, 13, 5, 7, 8), 70, EnemyAiPattern.Aggressive, ["miasma_bite", "chase"], [8, 18], "hound_loot_table"),
    nonHumanoid("bear", "Bear", MonsterType.Beast, "bear", 5, attr(11, 9, 4, 9, 6), 90, EnemyAiPattern.Aggressive, ["maul", "roar"], [10, 20], "bear_loot_table"),
    nonHumanoid("stone_scorpion", "Stone Scorpion", MonsterType.Beast, "scorpion", 8, attr(9, 13, 3, 11, 10), 70, EnemyAiPattern.Defensive, ["stone_stinger", "burrow"], [12, 25], "scorpion_loot_table"),
    nonHumanoid("void_leviathan", "Void Leviathan", MonsterType.VoidAberration, "void-leviathan", 40, attr(28, 18, 22, 24, 14), 680, EnemyAiPattern.BossScripted, ["void_breach", "abyssal_roar", "crush"], [800, 1200], "void_leviathan_loot_table", true),
    nonHumanoid("miasma_drake", "Miasma Drake", MonsterType.MiasmaCorrupted, "drake", 19, attr(16, 13, 13, 14, 10), 250, EnemyAiPattern.Aggressive, ["miasma_breath", "wing_claw"], [50, 100], "miasma_drake_loot_table"),
    nonHumanoid("dire_bear", "Dire Bear", MonsterType.Beast, "bear", 12, attr(18, 8, 5, 14, 8), 160, EnemyAiPattern.Aggressive, ["dire_maul", "slam"], [20, 40], "dire_bear_loot_table"),
    nonHumanoid("spider_queen", "Spider Queen", MonsterType.Beast, "spider", 14, attr(12, 15, 6, 10, 12), 180, EnemyAiPattern.BossScripted, ["web_barrage", "venom_strike", "spiderling"], [60, 120], "spider_queen_loot_table", true),
    nonHumanoid("void_abomination", "Void Abomination", MonsterType.VoidAberration, "void-abomination", 36, attr(24, 12, 20, 20, 10), 540, EnemyAiPattern.BossScripted, ["void_corruption", "eldritch_grasp", "maddening_scream"], [600, 1000], "void_abomination_loot_table", true),
    nonHumanoid("miasma_golem", "Miasma Golem", MonsterType.MiasmaCorrupted, "golem", 18, attr(19, 2, 10, 18, 4), 340, EnemyAiPattern.Defensive, ["miasma_smash", "poison_cloud"], [50, 100], "miasma_golem_loot_table"),
    nonHumanoid("frost_wolf", "Frost Wolf", MonsterType.Beast, "wolf", 7, attr(10, 14, 5, 6, 9), 80, EnemyAiPattern.Aggressive, ["frost_bite", "howl"], [10, 20], "frost_wolf_loot_table"),
    nonHumanoid("serpent_wyrm", "Serpent Wyrm", MonsterType.Draconic, "wyrm", 20, attr(16, 14, 10, 13, 11), 270, EnemyAiPattern.Aggressive, ["constrict", "poison_spit"], [45, 90], "serpent_wyrm_loot_table"),
    nonHumanoid("void_reaver", "Void Reaver", MonsterType.VoidAberration, "void-reaver", 28, attr(19, 15, 13, 14, 12), 320, EnemyAiPattern.Aggressive, ["void_slash", "phase_step"], [60, 120], "void_reaver_loot_table"),
    nonHumanoid("miasma_basilisk", "Miasma Basilisk", MonsterType.MiasmaCorrupted, "basilisk", 15, attr(13, 10, 10, 12, 8), 140, EnemyAiPattern.Defensive, ["miasma_gaze", "tail_strike"], [25, 50], "basilisk_loot_table"),
    nonHumanoid("giant_centipede", "Giant Centipede", MonsterType.Beast, "centipede", 3, attr(7, 13, 2, 4, 9), 45, EnemyAiPattern.Aggressive, ["venom_bite", "coil"], [4, 10], "centipede_loot_table"),
    nonHumanoid("miasma_serpent", "Miasma Serpent", MonsterType.MiasmaCorrupted, "serpent", 10, attr(12, 11, 8, 9, 10), 95, EnemyAiPattern.Aggressive, ["miasma_bite", "constrict"], [12, 25], "serpent_loot_table"),
    nonHumanoid("crystal_wyvern", "Crystal Wyvern", MonsterType.Draconic, "wyvern", 21, attr(17, 15, 10, 15, 11), 280, EnemyAiPattern.Aggressive, ["crystal_breath", "talon"], [50, 100], "crystal_wyvern_loot_table"),
    nonHumanoid("void_panther", "Void Panther", MonsterType.VoidAberration, "panther", 25, attr(16, 19, 10, 12, 13), 260, EnemyAiPattern.Aggressive, ["void_pounce", "shadow_claw"], [50, 100], "void_panther_loot_table"),
    nonHumanoid("miasma_spider", "Miasma Spider", MonsterType.MiasmaCorrupted, "spider", 7, attr(8, 14, 4, 6, 11), 60, EnemyAiPattern.Aggressive, ["miasma_web", "venom_bite"], [8, 16], "spider_loot_table"),
    nonHumanoid("iron_wyrm", "Iron Wyrm", MonsterType.Draconic, "wyrm", 23, attr(21, 12, 11, 18, 9), 450, EnemyAiPattern.BossScripted, ["iron_breath", "crush", "tail_whip"], [250, 500], "iron_wyrm_loot_table", true),
    nonHumanoid("void_beast", "Void Beast", MonsterType.VoidAberration, "void-beast", 34, attr(25, 15, 16, 20, 12), 520, EnemyAiPattern.BossScripted, ["void_roar", "abyssal_bite", "teleport"], [500, 900], "void_beast_loot_table", true),
    nonHumanoid("miasma_construct", "Miasma Construct", MonsterType.MiasmaCorrupted, "construct", 16, attr(15, 3, 9, 16, 5), 250, EnemyAiPattern.Defensive, ["miasma_punch", "poison_vent"], [30, 60], "construct_loot_table"),
    nonHumanoid("dire_panther", "Dire Panther", MonsterType.Beast, "panther", 13, attr(15, 17, 5, 9, 11), 130, EnemyAiPattern.Aggressive, ["pounce", "rend"], [15, 30], "panther_loot_table"),
    nonHumanoid("void_wyrm", "Void Wyrm", MonsterType.Draconic, "wyrm", 30, attr(22, 16, 14, 18, 12), 480, EnemyAiPattern.BossScripted, ["void_breath", "crush", "abyss"], [400, 700], "void_wyrm_loot_table", true),
    nonHumanoid("miasma_bear", "Miasma Bear", MonsterType.MiasmaCorrupted, "bear", 8, attr(14, 7, 4, 10, 7), 110, EnemyAiPattern.Aggressive, ["miasma_maul", "roar"], [12, 25], "bear_loot_table"),
    nonHumanoid("giant_scorpion", "Giant Scorpion", MonsterType.Beast, "scorpion", 10, attr(11, 13, 3, 11, 10), 90, EnemyAiPattern.Defensive, ["stinger", "grab"], [12, 25], "scorpion_loot_table"),
    nonHumanoid("void_spider", "Void Spider", MonsterType.VoidAberration, "spider", 22, attr(14, 16, 12, 12, 13), 200, EnemyAiPattern.Aggressive, ["void_web", "venom"], [30, 60], "spider_loot_table"),
    nonHumanoid("miasma_drake_boss", "Miasma Drake Lord", MonsterType.MiasmaCorrupted, "drake", 24, attr(19, 14, 15, 16, 12), 420, EnemyAiPattern.BossScripted, ["miasma_storm", "drake_fire", "tail_crush"], [300, 600], "miasma_drake_boss_loot_table", true),
    nonHumanoid("crystal_beast", "Crystal Beast", MonsterType.Beast, "crystal-beast", 16, attr(16, 12, 10, 15, 11), 180, EnemyAiPattern.Defensive, ["crystal_armor", "shard_burst"], [25, 50], "crystal_beast_loot_table"),
    nonHumanoid("void_slime", "Void Slime", MonsterType.VoidAberration, "slime", 18, attr(10, 5, 14, 8, 10), 150, EnemyAiPattern.Defensive, ["acid_splash", "absorb"], [20, 40], "slime_loot_table"),
    nonHumanoid("miasma_wyrmling", "Miasma Wyrmling", MonsterType.MiasmaCorrupted, "wyrm", 12, attr(11, 10, 9, 10, 9), 130, EnemyAiPattern.Aggressive, ["miasma_breath", "bite"], [20, 40], "wyrmling_loot_table"),
    nonHumanoid("frost_bear", "Frost Bear", MonsterType.Beast, "bear", 9, attr(15, 8, 5, 12, 7), 130, EnemyAiPattern.Aggressive, ["frost_maul", "chill_roar"], [15, 30], "bear_loot_table"),
    nonHumanoid("void_scorpion", "Void Scorpion", MonsterType.VoidAberration, "scorpion", 20, attr(13, 14, 10, 14, 11), 160, EnemyAiPattern.Defensive, ["void_stinger", "phase"], [25, 50], "scorpion_loot_table"),
    nonHumanoid("miasma_wolf_pack", "Miasma Wolf Pack", MonsterType.MiasmaCorrupted, "wolf", 5, attr(10, 12, 6, 6, 9), 60, EnemyAiPattern.Aggressive, ["miasma_bite", "pack_tactics"], [6, 12], "miasma_wolf_loot_table"),
    nonHumanoid("stone_wyrm", "Stone Wyrm", MonsterType.Draconic, "wyrm", 19, attr(18, 10, 10, 16, 8), 300, EnemyAiPattern.Defensive, ["stone_breath", "crush"], [60, 120], "stone_wyrm_loot_table"),
    nonHumanoid("void_beetle", "Void Beetle", MonsterType.VoidAberration, "beetle", 15, attr(12, 12, 8, 15, 10), 140, EnemyAiPattern.Defensive, ["void_charge", "acid"], [20, 40], "beetle_loot_table"),
    nonHumanoid("miasma_serpent_boss", "Miasma Serpent Queen", MonsterType.MiasmaCorrupted, "serpent", 21, attr(17, 13, 14, 13, 12), 320, EnemyAiPattern.BossScripted, ["miasma_venom", "constrict", "summon_snakes"], [200, 400], "serpent_queen_loot_table", true),
    nonHumanoid("dire_wolf_alpha", "Dire Wolf Alpha", MonsterType.Beast, "wolf", 9, attr(14, 15, 6, 8, 11), 110, EnemyAiPattern.Aggressive, ["alpha_bite", "rally"], [12, 25], "wolf_loot_table"),
    nonHumanoid("void_stalker_boss", "Void Stalker Prime", MonsterType.VoidAberration, "void-stalker", 35, attr(22, 18, 16, 18, 14), 480, EnemyAiPattern.BossScripted, ["void_blade", "phase_strike", "abyss"], [300, 600], "void_stalker_boss_loot_table", true),
    nonHumanoid("miasma_golem_boss", "Miasma Golem Lord", MonsterType.MiasmaCorrupted, "golem", 25, attr(22, 3, 12, 20, 6), 520, EnemyAiPattern.BossScripted, ["miasma_quake", "poison_slam", "summon"], [250, 500], "miasma_golem_boss_loot_table", true),
    nonHumanoid("blighted_wisp", "Blighted Wisp", MonsterType.MiasmaCorrupted, "wisp", 2, attr(3, 12, 8, 2, 10), 25, EnemyAiPattern.SupportCaster, ["miasma_flash"], [2, 5], "wisp_loot_table"),
    nonHumanoid("giant_fire_beetle", "Giant Fire Beetle", MonsterType.Beast, "beetle", 6, attr(8, 11, 4, 10, 9), 60, EnemyAiPattern.Defensive, ["fire_spit", "charge"], [8, 16], "beetle_loot_table"),
    nonHumanoid("void_octopus", "Void Octopus", MonsterType.VoidAberration, "octopus", 27, attr(16, 15, 12, 13, 14), 310, EnemyAiPattern.SupportCaster, ["void_ink", "tentacle"], [60, 120], "octopus_loot_table"),
    nonHumanoid("miasma_rat_king", "Miasma Rat King", MonsterType.MiasmaCorrupted, "rat", 13, attr(12, 10, 10, 12, 10), 150, EnemyAiPattern.BossScripted, ["rat_swarm", "plague_bite"], [60, 120], "rat_king_loot_table", true),
    nonHumanoid("frost_drake", "Frost Drake", MonsterType.Draconic, "drake", 18, attr(15, 13, 11, 13, 10), 240, EnemyAiPattern.Aggressive, ["frost_breath", "claw"], [40, 80], "frost_drake_loot_table"),
    nonHumanoid("void_reaver_boss", "Void Reaver Lord", MonsterType.VoidAberration, "void-reaver", 38, attr(26, 16, 18, 20, 12), 580, EnemyAiPattern.BossScripted, ["void_cleave", "abyss_blast"], [400, 800], "void_reaver_boss_loot_table", true),
    nonHumanoid("miasma_basilisk_boss", "Miasma Basilisk King", MonsterType.MiasmaCorrupted, "basilisk", 23, attr(18, 12, 15, 16, 10), 300, EnemyAiPattern.BossScripted, ["miasma_gaze", "tail_quake"], [250, 500], "basilisk_king_loot_table", true),
    nonHumanoid("dire_bear_alpha", "Dire Bear Alpha", MonsterType.Beast, "bear", 11, attr(17, 7, 5, 15, 8), 150, EnemyAiPattern.Aggressive, ["dire_maul", "slam"], [15, 30], "bear_loot_table"),
    nonHumanoid("void_wyrmling", "Void Wyrmling", MonsterType.VoidAberration, "wyrm", 22, attr(17, 15, 13, 15, 11), 270, EnemyAiPattern.Aggressive, ["void_breath", "bite"], [50, 100], "wyrmling_loot_table"),
    nonHumanoid("miasma_wisp", "Miasma Wisp", MonsterType.MiasmaCorrupted, "wisp", 3, attr(3, 13, 9, 2, 11), 30, EnemyAiPattern.SupportCaster, ["miasma_flash", "drain"], [3, 7], "wisp_loot_table"),
    nonHumanoid("crystal_spider", "Crystal Spider", MonsterType.Beast, "spider", 9, attr(9, 14, 4, 10, 12), 75, EnemyAiPattern.Defensive, ["crystal_web", "venom"], [10, 20], "spider_loot_table"),
    nonHumanoid("void_hound", "Void Hound", MonsterType.VoidAberration, "hound", 23, attr(15, 16, 9, 12, 12), 210, EnemyAiPattern.Aggressive, ["void_bite", "shadow_run"], [30, 60], "hound_loot_table"),
    nonHumanoid("miasma_bear_alpha", "Miasma Bear Alpha", MonsterType.MiasmaCorrupted, "bear", 14, attr(17, 8, 6, 13, 8), 170, EnemyAiPattern.Aggressive, ["miasma_maul", "roar"], [20, 40], "bear_loot_table"),
    nonHumanoid("iron_golem", "Iron Golem", MonsterType.Construct, "golem", 17, attr(20, 2, 5, 22, 3), 380, EnemyAiPattern.Defensive, ["iron_slam", "gear_throw"], [60, 120], "iron_golem_loot_table"),
    nonHumanoid("void_serpent", "Void Serpent", MonsterType.VoidAberration, "serpent", 29, attr(18, 16, 14, 15, 12), 340, EnemyAiPattern.Aggressive, ["void_bite", "constrict"], [60, 120], "serpent_loot_table"),
    nonHumanoid("miasma_centipede", "Miasma Centipede", MonsterType.MiasmaCorrupted, "centipede", 4, attr(7, 13, 3, 5, 10), 40, EnemyAiPattern.Aggressive, ["venom_bite", "coil"], [4, 10], "centipede_loot_table"),
    nonHumanoid("blighted_basilisk", "Blighted Basilisk", MonsterType.MiasmaCorrupted, "basilisk", 16, attr(14, 10, 11, 13, 9), 150, EnemyAiPattern.Defensive, ["miasma_gaze", "tail"], [20, 40], "basilisk_loot_table"),
    nonHumanoid("giant_mantis", "Giant Mantis", MonsterType.Beast, "mantis", 8, attr(10, 15, 4, 8, 12), 70, EnemyAiPattern.Aggressive, ["scythe_strike", "leap"], [8, 18], "mantis_loot_table"),
    nonHumanoid("void_bat", "Void Bat", MonsterType.VoidAberration, "bat", 21, attr(12, 18, 9, 10, 12), 160, EnemyAiPattern.Aggressive, ["void_screech", "dive"], [20, 40], "bat_loot_table"),
    nonHumanoid("miasma_golem_sentinel", "Miasma Golem Sentinel", MonsterType.MiasmaCorrupted, "golem", 20, attr(21, 3, 10, 19, 5), 400, EnemyAiPattern.Defensive, ["miasma_punch", "poison_cloud"], [50, 100], "golem_loot_table"),
    nonHumanoid("dire_scorpion", "Dire Scorpion", MonsterType.Beast, "scorpion", 12, attr(14, 12, 3, 15, 10), 110, EnemyAiPattern.Defensive, ["dire_stinger", "grab"], [15, 30], "scorpion_loot_table"),
    nonHumanoid("void_slime_boss", "Void Slime Overlord", MonsterType.VoidAberration, "slime", 28, attr(15, 5, 16, 13, 10), 420, EnemyAiPattern.BossScripted, ["acid_flood", "absorb_all"], [300, 600], "void_slime_boss_loot_table", true),
    nonHumanoid("miasma_wraith_boss", "Miasma Wraith Lord", MonsterType.MiasmaCorrupted, "wraith", 26, attr(13, 16, 18, 12, 13), 380, EnemyAiPattern.BossScripted, ["wraith_storm", "drain_life"], [250, 500], "wraith_lord_loot_table", true),
    nonHumanoid("crystal_beast_boss", "Crystal Beast King", MonsterType.Beast, "crystal-beast", 22, attr(20, 14, 12, 18, 12), 320, EnemyAiPattern.BossScripted, ["crystal_nova", "shard_storm"], [300, 600], "crystal_beast_boss_loot_table", true),
    nonHumanoid("void_centipede", "Void Centipede", MonsterType.VoidAberration, "centipede", 19, attr(13, 14, 8, 15, 11), 170, EnemyAiPattern.Aggressive, ["void_bite", "coil"], [25, 50], "centipede_loot_table"),
    nonHumanoid("miasma_serpentling", "Miasma Serpentling", MonsterType.MiasmaCorrupted, "serpent", 6, attr(9, 12, 6, 7, 10), 55, EnemyAiPattern.Aggressive, ["miasma_bite"], [5, 12], "serpent_loot_table"),
    nonHumanoid("dire_bat_swarm", "Dire Bat Swarm", MonsterType.Beast, "bat", 4, attr(6, 16, 2, 4, 11), 40, EnemyAiPattern.Aggressive, ["swarm_bite"], [4, 10], "bat_loot_table"),
    nonHumanoid("void_wolf", "Void Wolf", MonsterType.VoidAberration, "wolf", 24, attr(16, 17, 9, 12, 12), 220, EnemyAiPattern.Aggressive, ["void_bite", "shadow_howl"], [30, 60], "wolf_loot_table"),
    nonHumanoid("miasma_scorpion", "Miasma Scorpion", MonsterType.MiasmaCorrupted, "scorpion", 9, attr(10, 13, 4, 10, 11), 80, EnemyAiPattern.Defensive, ["miasma_stinger", "grab"], [10, 20], "scorpion_loot_table"),
    nonHumanoid("blighted_bear", "Blighted Bear", MonsterType.MiasmaCorrupted, "bear", 7, attr(13, 7, 5, 10, 8), 95, EnemyAiPattern.Aggressive, ["blight_maul", "roar"], [10, 20], "bear_loot_table"),
    nonHumanoid("void_construct", "Void Construct", MonsterType.VoidAberration, "construct", 33, attr(23, 5, 15, 20, 8), 500, EnemyAiPattern.Defensive, ["void_slam", "abyss_beam"], [100, 200], "void_construct_loot_table"),
    nonHumanoid("miasma_boar_alpha", "Miasma Boar Alpha", MonsterType.MiasmaCorrupted, "boar", 10, attr(15, 9, 4, 12, 8), 130, EnemyAiPattern.Aggressive, ["miasma_charge", "tusk"], [12, 25], "boar_loot_table"),
    nonHumanoid("giant_eagle", "Giant Eagle", MonsterType.Beast, "eagle", 7, attr(9, 16, 5, 7, 12), 65, EnemyAiPattern.Aggressive, ["talon_strike", "dive"], [8, 18], "eagle_loot_table"),
    nonHumanoid("void_eagle", "Void Eagle", MonsterType.VoidAberration, "eagle", 20, attr(13, 18, 10, 11, 13), 170, EnemyAiPattern.Aggressive, ["void_talon", "shadow_dive"], [25, 50], "eagle_loot_table"),
    nonHumanoid("miasma_wolf_boss", "Miasma Wolf Pack Leader", MonsterType.MiasmaCorrupted, "wolf", 15, attr(16, 15, 8, 10, 12), 180, EnemyAiPattern.BossScripted, ["miasma_bite", "summon_wolves"], [100, 200], "wolf_boss_loot_table", true),
];

// ===========================================================================
// FEMALE HUMANOIDS (40)
// ===========================================================================
export const femaleHumanoids: EnemyCombatantDef[] = [
    humanoid("miasma_cultist_priestess", "Miasma Cultist Priestess", "cultist", 28, attr(12, 14, 22, 10, 14), 110, EnemyAiPattern.SupportCaster, ["priestess_corrupting_caress", "priestess_dark_bolt"], [40, 90], "cultist_loot_table", "FEMALE", true, 22),
    humanoid("bandit_reaver_female", "Bandit Reaver", "bandit", 10, attr(14, 12, 6, 10, 10), 90, EnemyAiPattern.Aggressive, ["reaver_forceful_grapple", "reaver_dagger_slash"], [20, 50], "bandit_loot_table", "FEMALE", true, 16),
    humanoid("deserter_mercenary_female", "Deserter Mercenary", "mercenary", 14, attr(16, 12, 8, 13, 9), 110, EnemyAiPattern.Defensive, ["mercenary_cut", "shield_bash"], [30, 70], "mercenary_loot_table", "FEMALE", true, 12),
    humanoid("cultist_seductress", "Cultist Seductress", "cultist", 18, attr(10, 13, 18, 8, 12), 95, EnemyAiPattern.SupportCaster, ["seductress_touch", "dark_lash"], [25, 60], "cultist_loot_table", "FEMALE", true, 18),
    humanoid("rogue_skirmisher_female", "Rogue Skirmisher", "rogue", 12, attr(11, 16, 7, 9, 12), 85, EnemyAiPattern.Aggressive, ["quick_strike", "poison_blade"], [20, 45], "rogue_loot_table", "FEMALE", true, 10),
    humanoid("marauder_brute_female", "Marauder Brute", "marauder", 16, attr(18, 10, 5, 15, 8), 130, EnemyAiPattern.Aggressive, ["brute_slam", "war_cry"], [30, 70], "marauder_loot_table", "FEMALE", true, 8),
    humanoid("witch_of_miasma", "Witch of Miasma", "witch", 24, attr(9, 11, 20, 8, 13), 100, EnemyAiPattern.SupportCaster, ["miasma_hex", "drain_touch"], [35, 80], "witch_loot_table", "FEMALE", true, 24),
    humanoid("assassin_female", "Assassin", "assassin", 20, attr(12, 17, 6, 9, 15), 95, EnemyAiPattern.Aggressive, ["shadowstep", "cripple"], [25, 60], "assassin_loot_table", "FEMALE", true, 10),
    humanoid("cultist_chantress", "Cultist Chantress", "cultist", 30, attr(11, 12, 24, 9, 12), 120, EnemyAiPattern.SupportCaster, ["miasma_chant", "corrupting_touch"], [40, 90], "cultist_loot_table", "FEMALE", true, 26),
    humanoid("raider_captain_female", "Raider Captain", "raider", 25, attr(17, 12, 10, 15, 11), 150, EnemyAiPattern.Defensive, ["captain_strike", "rally"], [50, 120], "raider_loot_table", "FEMALE", true, 12),
    humanoid("highway_bandit_female", "Highway Bandit", "bandit", 13, attr(15, 13, 7, 11, 10), 100, EnemyAiPattern.Aggressive, ["bandit_strike", "ambush"], [25, 55], "bandit_loot_table", "FEMALE", true, 12),
    humanoid("miasma_priestess_acolyte", "Miasma Priestess Acolyte", "cultist", 22, attr(10, 13, 20, 8, 11), 105, EnemyAiPattern.SupportCaster, ["miasma_blessing", "dark_bolt"], [30, 70], "cultist_loot_table", "FEMALE", true, 20),
    humanoid("mercenary_sniper_female", "Mercenary Sniper", "mercenary", 19, attr(14, 18, 8, 10, 14), 110, EnemyAiPattern.Aggressive, ["sniper_shot", "quick_reload"], [35, 80], "mercenary_loot_table", "FEMALE", true, 10),
    humanoid("cultist_zealot_female", "Cultist Zealot", "cultist", 16, attr(13, 12, 14, 11, 10), 115, EnemyAiPattern.Aggressive, ["zealot_strike", "dark_curse"], [25, 60], "cultist_loot_table", "FEMALE", true, 16),
    humanoid("bandit_poacher_female", "Bandit Poacher", "bandit", 9, attr(12, 14, 6, 9, 11), 80, EnemyAiPattern.Aggressive, ["poacher_arrow", "traps"], [15, 35], "bandit_loot_table", "FEMALE", true, 8),
    humanoid("miasma_witch_elder", "Miasma Witch Elder", "witch", 28, attr(10, 12, 22, 9, 14), 130, EnemyAiPattern.BossScripted, ["miasma_storm", "curse_of_decay"], [80, 160], "witch_loot_table", "FEMALE", true, 30),
    humanoid("assassin_elite_female", "Assassin Elite", "assassin", 24, attr(14, 18, 8, 11, 16), 115, EnemyAiPattern.Aggressive, ["shadow_dance", "death_mark"], [40, 90], "assassin_loot_table", "FEMALE", true, 14),
    humanoid("raider_brigand_female", "Raider Brigand", "raider", 15, attr(16, 11, 7, 13, 9), 120, EnemyAiPattern.Aggressive, ["brigand_axe", "intimidate"], [25, 60], "raider_loot_table", "FEMALE", true, 10),
    humanoid("cultist_siren", "Cultist Siren", "cultist", 26, attr(11, 15, 19, 9, 13), 100, EnemyAiPattern.SupportCaster, ["siren_song", "mesmerize"], [35, 75], "cultist_loot_table", "FEMALE", true, 22),
    humanoid("mercenary_captain_female", "Mercenary Captain", "mercenary", 27, attr(20, 14, 10, 16, 12), 170, EnemyAiPattern.Defensive, ["captain_strike", "leadership"], [60, 140], "mercenary_loot_table", "FEMALE", true, 14),
    humanoid("bandit_queen", "Bandit Queen", "bandit", 30, attr(19, 16, 10, 15, 15), 200, EnemyAiPattern.BossScripted, ["queen_command", "dual_blades"], [100, 220], "bandit_loot_table", "FEMALE", true, 20),
    humanoid("miasma_cultist_elite", "Miasma Cultist Elite", "cultist", 29, attr(14, 13, 23, 11, 13), 130, EnemyAiPattern.SupportCaster, ["miasma_blast", "drain_life"], [50, 110], "cultist_loot_table", "FEMALE", true, 26),
    humanoid("rogue_poison_mistress", "Rogue Poison Mistress", "rogue", 21, attr(13, 18, 9, 10, 15), 100, EnemyAiPattern.Aggressive, ["poison_barrage", "vanish"], [30, 70], "rogue_loot_table", "FEMALE", true, 12),
    humanoid("assassin_nightblade_female", "Assassin Nightblade", "assassin", 26, attr(15, 19, 9, 12, 17), 120, EnemyAiPattern.Aggressive, ["nightblade", "shadow_step"], [45, 100], "assassin_loot_table", "FEMALE", true, 14),
    humanoid("witch_of_the_wood", "Witch of the Wood", "witch", 20, attr(8, 12, 21, 7, 13), 90, EnemyAiPattern.SupportCaster, ["wood_curse", "poison_vine"], [30, 70], "witch_loot_table", "FEMALE", true, 18),
    humanoid("marauder_warchief_female", "Marauder Warchief", "marauder", 22, attr(21, 11, 6, 17, 10), 160, EnemyAiPattern.Aggressive, ["warchief_roar", "brutal_slam"], [50, 110], "marauder_loot_table", "FEMALE", true, 10),
    humanoid("cultist_ritualist", "Cultist Ritualist", "cultist", 27, attr(12, 14, 21, 10, 13), 115, EnemyAiPattern.SupportCaster, ["ritual_darkness", "sacrifice"], [40, 90], "cultist_loot_table", "FEMALE", true, 24),
    humanoid("bandit_smuggler_female", "Bandit Smuggler", "bandit", 12, attr(13, 15, 7, 10, 12), 90, EnemyAiPattern.Aggressive, ["smuggler_trick", "quick_knife"], [20, 45], "bandit_loot_table", "FEMALE", true, 8),
    humanoid("mercenary_battle_mage_female", "Mercenary Battle Mage", "mercenary", 23, attr(13, 12, 17, 12, 11), 120, EnemyAiPattern.SupportCaster, ["battle_magic", "arcane_strike"], [40, 90], "mercenary_loot_table", "FEMALE", true, 20),
    humanoid("cultist_seductress_elite", "Cultist Seductress Elite", "cultist", 31, attr(14, 16, 20, 11, 15), 130, EnemyAiPattern.BossScripted, ["seductive_trance", "drain_life"], [80, 160], "cultist_loot_table", "FEMALE", true, 28),
    humanoid("raider_archer_female", "Raider Archer", "raider", 14, attr(13, 17, 6, 10, 12), 95, EnemyAiPattern.Aggressive, ["archer_volley", "quick_shot"], [20, 50], "raider_loot_table", "FEMALE", true, 8),
    humanoid("miasma_priestess_supreme", "Miasma Priestess Supreme", "cultist", 32, attr(14, 15, 24, 12, 15), 150, EnemyAiPattern.BossScripted, ["miasma_inferno", "dark_blessing"], [100, 220], "cultist_loot_table", "FEMALE", true, 30),
    humanoid("rogue_bounty_hunter_female", "Rogue Bounty Hunter", "rogue", 19, attr(12, 17, 8, 11, 14), 105, EnemyAiPattern.Aggressive, ["hunter_trap", "crippling_strike"], [30, 70], "rogue_loot_table", "FEMALE", true, 10),
    humanoid("bandit_ambusher_female", "Bandit Ambusher", "bandit", 11, attr(12, 15, 6, 9, 11), 85, EnemyAiPattern.Aggressive, ["ambush", "poison_blade"], [15, 35], "bandit_loot_table", "FEMALE", true, 8),
    humanoid("witch_of_the_frost", "Witch of the Frost", "witch", 25, attr(10, 13, 22, 9, 14), 110, EnemyAiPattern.SupportCaster, ["frost_hex", "winter_curse"], [40, 90], "witch_loot_table", "FEMALE", true, 22),
    humanoid("assassin_shadow_mistress", "Assassin Shadow Mistress", "assassin", 28, attr(16, 19, 10, 12, 17), 130, EnemyAiPattern.BossScripted, ["shadow_embrace", "death_mark"], [80, 170], "assassin_loot_table", "FEMALE", true, 16),
    humanoid("marauder_berserker_female", "Marauder Berserker", "marauder", 17, attr(20, 9, 5, 14, 8), 140, EnemyAiPattern.Aggressive, ["berserk", "brutal_strike"], [25, 60], "marauder_loot_table", "FEMALE", true, 8),
    humanoid("cultist_dark_priestess", "Cultist Dark Priestess", "cultist", 29, attr(13, 13, 23, 11, 14), 125, EnemyAiPattern.SupportCaster, ["dark_ritual", "miasma_burst"], [50, 110], "cultist_loot_table", "FEMALE", true, 26),
    humanoid("mercenary_rogue_female", "Mercenary Rogue", "mercenary", 18, attr(14, 17, 8, 11, 13), 100, EnemyAiPattern.Aggressive, ["rogue_tactics", "quick_strike"], [25, 60], "mercenary_loot_table", "FEMALE", true, 10),
    humanoid("bandit_mistress", "Bandit Mistress", "bandit", 24, attr(15, 16, 9, 13, 14), 150, EnemyAiPattern.Defensive, ["mistress_command", "cunning_strike"], [50, 110], "bandit_loot_table", "FEMALE", true, 14),
];

// ===========================================================================
// MALE HUMANOIDS (10)
// ===========================================================================
export const maleHumanoids: EnemyCombatantDef[] = [
    humanoid("bandit_reaver_male", "Bandit Reaver", "bandit", 10, attr(14, 12, 6, 10, 10), 90, EnemyAiPattern.Aggressive, ["reaver_forceful_grapple", "reaver_dagger_slash"], [20, 50], "bandit_loot_table", "MALE", true, 16),
    humanoid("high_inquisitor_malakor", "High Inquisitor Malakor", "corrupt-cultist-leader", 34, attr(26, 14, 20, 22, 12), 320, EnemyAiPattern.BossScripted, ["malakor_smite", "malakor_dark_ritual"], [500, 700], "malakor_loot_table", "MALE", true),
    humanoid("deserter_mercenary_male", "Deserter Mercenary", "mercenary", 14, attr(16, 12, 8, 13, 9), 110, EnemyAiPattern.Defensive, ["mercenary_cut", "shield_bash"], [30, 70], "mercenary_loot_table", "MALE", true, 12),
    humanoid("cultist_enforcer_male", "Cultist Enforcer", "cultist", 18, attr(15, 11, 12, 14, 9), 125, EnemyAiPattern.Aggressive, ["enforcer_smash", "dark_ward"], [30, 70], "cultist_loot_table", "MALE", true, 14),
    humanoid("rogue_scoundrel_male", "Rogue Scoundrel", "rogue", 12, attr(11, 16, 7, 9, 12), 85, EnemyAiPattern.Aggressive, ["quick_strike", "poison_blade"], [20, 45], "rogue_loot_table", "MALE", true, 10),
    humanoid("bandit_brute_male", "Bandit Brute", "bandit", 13, attr(18, 9, 5, 13, 8), 130, EnemyAiPattern.Aggressive, ["brute_force", "intimidate"], [25, 55], "bandit_loot_table", "MALE", true, 10),
    humanoid("mercenary_captain_male", "Mercenary Captain", "mercenary", 26, attr(21, 14, 10, 16, 12), 170, EnemyAiPattern.Defensive, ["captain_strike", "leadership"], [60, 140], "mercenary_loot_table", "MALE", true, 14),
    humanoid("cultist_high_priest_male", "Cultist High Priest", "cultist", 30, attr(14, 13, 24, 12, 14), 140, EnemyAiPattern.BossScripted, ["dark_ritual", "miasma_burst"], [100, 220], "cultist_loot_table", "MALE", true, 26),
    humanoid("raider_warlord_male", "Raider Warlord", "raider", 28, attr(22, 12, 8, 18, 10), 190, EnemyAiPattern.BossScripted, ["warlord_roar", "brutal_slam"], [80, 170], "raider_loot_table", "MALE", true, 14),
    humanoid("assassin_master_male", "Assassin Master", "assassin", 27, attr(16, 19, 10, 12, 17), 130, EnemyAiPattern.BossScripted, ["shadow_embrace", "death_mark"], [80, 170], "assassin_loot_table", "MALE", true, 16),
];

// ===========================================================================
// EXPORT ALL ENEMIES
// ===========================================================================
export const ENEMIES: EnemyCombatantDef[] = [
    ...nonHumanoidEnemies,
    ...femaleHumanoids,
    ...maleHumanoids,
];