// ============================================================================
// ENCOUNTERS SEED DATA
// ============================================================================
// Predefined encounter groups: beast packs, boss fights, humanoid ambushes,
// mixed enemy groups, and story-critical battles.
// ============================================================================

import type { EncounterDef } from "../schemas/schemas";
import { Region } from "../schemas/schemas";

export const ENCOUNTERS: EncounterDef[] = [
    // =========================================================================
    // VERDANT VALE (Early Game)
    // =========================================================================
    {
        id: "verdant_vale_direwolf_pack",
        region: Region.VerdantVale,
        enemyGroup: [
            { enemyDefId: "blighted_direwolf", count: 4 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [30, 60],
        rewardXp: 40,
        rewardItemIds: [],
    },
    {
        id: "verdant_vale_direwolf_alpha",
        region: Region.VerdantVale,
        enemyGroup: [
            { enemyDefId: "dire_wolf_alpha", count: 1 },
            { enemyDefId: "blighted_direwolf", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [40, 80],
        rewardXp: 60,
        rewardItemIds: ["wolf_pelt"],
    },
    {
        id: "verdant_vale_blighted_treant_boss",
        region: Region.VerdantVale,
        enemyGroup: [
            { enemyDefId: "blighted_treant", count: 1 },
            { enemyDefId: "blighted_bear", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act1_blighted_treant_script",
        rewardGoldRange: [150, 250],
        rewardXp: 200,
        rewardItemIds: ["ley_node_fragment"],
    },
    {
        id: "verdant_vale_bandit_ambush",
        region: Region.VerdantVale,
        enemyGroup: [
            { enemyDefId: "bandit_reaver_female", count: 2 },
            { enemyDefId: "bandit_reaver_male", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [25, 50],
        rewardXp: 35,
        rewardItemIds: [],
    },

    // =========================================================================
    // AETHERMOOR (Early-Mid Game)
    // =========================================================================
    {
        id: "aethermoor_miasma_wraith_archivist_boss",
        region: Region.Aethermoor,
        enemyGroup: [
            { enemyDefId: "miasma_wraith_archivist", count: 1 },
            { enemyDefId: "miasma_wraith", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act2_archivist_script",
        rewardGoldRange: [200, 400],
        rewardXp: 300,
        rewardItemIds: ["archivist_key"],
    },
    {
        id: "aethermoor_rogue_battle_golem_boss",
        region: Region.Aethermoor,
        enemyGroup: [
            { enemyDefId: "rogue_battle_golem", count: 1 },
            { enemyDefId: "iron_construct", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act2_golem_script",
        rewardGoldRange: [250, 500],
        rewardXp: 350,
        rewardItemIds: ["arcane_core"],
    },
    {
        id: "aethermoor_miasma_wolf_pack",
        region: Region.Aethermoor,
        enemyGroup: [
            { enemyDefId: "miasma_wolf", count: 4 },
            { enemyDefId: "miasma_hound", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [40, 80],
        rewardXp: 55,
        rewardItemIds: [],
    },
    {
        id: "aethermoor_bandit_patrol",
        region: Region.Aethermoor,
        enemyGroup: [
            { enemyDefId: "deserter_mercenary_female", count: 2 },
            { enemyDefId: "deserter_mercenary_male", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [35, 70],
        rewardXp: 45,
        rewardItemIds: [],
    },

    // =========================================================================
    // CRIMSON MARCH (Mid Game)
    // =========================================================================
    {
        id: "crimson_march_crimson_wyrmling_pack",
        region: Region.CrimsonMarch,
        enemyGroup: [
            { enemyDefId: "crimson_wyrmling", count: 3 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [80, 160],
        rewardXp: 120,
        rewardItemIds: ["crimson_wyrmling_scale"],
    },
    {
        id: "crimson_march_miasma_wyrm_boss",
        region: Region.CrimsonMarch,
        enemyGroup: [
            { enemyDefId: "miasma_wyrm", count: 1 },
            { enemyDefId: "crimson_wyrmling", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act3_miasma_wyrm_script",
        rewardGoldRange: [500, 800],
        rewardXp: 600,
        rewardItemIds: ["miasma_core"],
    },
    {
        id: "crimson_march_bandit_raiders",
        region: Region.CrimsonMarch,
        enemyGroup: [
            { enemyDefId: "bandit_reaver_female", count: 2 },
            { enemyDefId: "bandit_reaver_male", count: 2 },
            { enemyDefId: "marauder_brute_female", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [60, 120],
        rewardXp: 80,
        rewardItemIds: [],
    },
    {
        id: "crimson_march_mercenary_camp",
        region: Region.CrimsonMarch,
        enemyGroup: [
            { enemyDefId: "deserter_mercenary_female", count: 3 },
            { enemyDefId: "deserter_mercenary_male", count: 2 },
            { enemyDefId: "mercenary_captain_female", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [100, 200],
        rewardXp: 150,
        rewardItemIds: [],
    },

    // =========================================================================
    // WHISPERING WOOD (Mid-Late Game)
    // =========================================================================
    {
        id: "whispering_wood_shadow_panther",
        region: Region.WhisperingWood,
        enemyGroup: [
            { enemyDefId: "shadow_panther", count: 3 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [70, 140],
        rewardXp: 100,
        rewardItemIds: ["shadow_pelt"],
    },
    {
        id: "whispering_wood_heartwood_abomination_boss",
        region: Region.WhisperingWood,
        enemyGroup: [
            { enemyDefId: "heartwood_abomination", count: 1 },
            { enemyDefId: "miasma_treant", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act4_heartwood_script",
        rewardGoldRange: [800, 1200],
        rewardXp: 900,
        rewardItemIds: ["heartwood_splinter"],
    },
    {
        id: "whispering_wood_cultist_ambush",
        region: Region.WhisperingWood,
        enemyGroup: [
            { enemyDefId: "cultist_seductress", count: 2 },
            { enemyDefId: "cultist_enforcer_male", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [70, 140],
        rewardXp: 120,
        rewardItemIds: [],
    },
    {
        id: "whispering_wood_spider_queen_boss",
        region: Region.WhisperingWood,
        enemyGroup: [
            { enemyDefId: "spider_queen", count: 1 },
            { enemyDefId: "giant_spider", count: 3 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act4_spider_queen_script",
        rewardGoldRange: [400, 700],
        rewardXp: 500,
        rewardItemIds: ["spider_silk"],
    },

    // =========================================================================
    // MOUNTAIN MONASTERY (Mid-Late Game, Act 4/5)
    // =========================================================================
    {
        id: "mountain_monastery_miasma_witch_elder_boss",
        region: Region.MountainMonastery,
        enemyGroup: [
            { enemyDefId: "miasma_witch_elder", count: 1 },
            { enemyDefId: "miasma_priestess_acolyte", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act5_witch_elder_script",
        rewardGoldRange: [600, 1000],
        rewardXp: 700,
        rewardItemIds: ["miasma_core"],
    },
    {
        id: "mountain_monastery_frost_beasts",
        region: Region.MountainMonastery,
        enemyGroup: [
            { enemyDefId: "frost_wolf", count: 3 },
            { enemyDefId: "frost_bear", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [80, 150],
        rewardXp: 130,
        rewardItemIds: ["frost_pelt"],
    },
    {
        id: "mountain_monastery_bandit_poachers",
        region: Region.MountainMonastery,
        enemyGroup: [
            { enemyDefId: "bandit_poacher_female", count: 3 },
            { enemyDefId: "bandit_reaver_male", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [50, 100],
        rewardXp: 80,
        rewardItemIds: [],
    },

    // =========================================================================
    // AURIC COURT (Late Game)
    // =========================================================================
    {
        id: "auric_court_miasma_succubus_boss",
        region: Region.AuricCourt,
        enemyGroup: [
            { enemyDefId: "miasma_succubus_boss", count: 1 },
            { enemyDefId: "high_inquisitor_malakor", count: 1 },
            { enemyDefId: "cultist_chantress", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act5_hybrid_boss_script",
        rewardGoldRange: [1000, 1800],
        rewardXp: 1200,
        rewardItemIds: ["auric_court_key_item"],
    },
    {
        id: "auric_court_cultist_ritual",
        region: Region.AuricCourt,
        enemyGroup: [
            { enemyDefId: "cultist_dark_priestess", count: 2 },
            { enemyDefId: "cultist_high_priest_male", count: 1 },
            { enemyDefId: "cultist_ritualist", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [150, 300],
        rewardXp: 250,
        rewardItemIds: [],
    },
    {
        id: "auric_court_heretic_hunt",
        region: Region.AuricCourt,
        enemyGroup: [
            { enemyDefId: "assassin_female", count: 2 },
            { enemyDefId: "assassin_master_male", count: 1 },
            { enemyDefId: "cultist_enforcer_male", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [200, 400],
        rewardXp: 300,
        rewardItemIds: [],
    },

    // =========================================================================
    // SUNKEN SANCTUM (Late Game)
    // =========================================================================
    {
        id: "sunken_sanctum_void_stalker",
        region: Region.SunkenSanctum,
        enemyGroup: [
            { enemyDefId: "void_stalker", count: 3 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [120, 240],
        rewardXp: 200,
        rewardItemIds: ["void_essence"],
    },
    {
        id: "sunken_sanctum_void_concubine_boss",
        region: Region.SunkenSanctum,
        enemyGroup: [
            { enemyDefId: "void_concubine_boss", count: 1 },
            { enemyDefId: "void_stalker", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act6_void_concubine_script",
        rewardGoldRange: [1500, 2500],
        rewardXp: 1800,
        rewardItemIds: ["void_essence", "sunless_tome"],
    },
    {
        id: "sunken_sanctum_void_spawn",
        region: Region.SunkenSanctum,
        enemyGroup: [
            { enemyDefId: "void_spawn", count: 4 },
            { enemyDefId: "void_horror", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [150, 300],
        rewardXp: 250,
        rewardItemIds: [],
    },

    // =========================================================================
    // CELESTIAL THRESHOLD (Endgame)
    // =========================================================================
    {
        id: "celestial_threshold_void_abomination_boss",
        region: Region.CelestialThreshold,
        enemyGroup: [
            { enemyDefId: "void_abomination", count: 1 },
            { enemyDefId: "void_serpent", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act7_void_abomination_script",
        rewardGoldRange: [3000, 5000],
        rewardXp: 4000,
        rewardItemIds: ["celestial_shard"],
    },
    {
        id: "celestial_threshold_void_reaver_lord_boss",
        region: Region.CelestialThreshold,
        enemyGroup: [
            { enemyDefId: "void_reaver_boss", count: 1 },
            { enemyDefId: "void_reaver", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act7_void_reaver_script",
        rewardGoldRange: [2500, 4000],
        rewardXp: 3500,
        rewardItemIds: ["void_essence"],
    },
    {
        id: "celestial_threshold_void_wyrm_boss",
        region: Region.CelestialThreshold,
        enemyGroup: [
            { enemyDefId: "void_wyrm", count: 1 },
            { enemyDefId: "void_wyrmling", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: true,
        bossScriptId: "act7_void_wyrm_script",
        rewardGoldRange: [2800, 4500],
        rewardXp: 3800,
        rewardItemIds: [],
    },

    // =========================================================================
    // GENERIC / RANDOM ENCOUNTERS (Repeatable feel)
    // =========================================================================
    {
        id: "generic_bandit_pack",
        region: Region.VerdantVale,
        enemyGroup: [
            { enemyDefId: "bandit_reaver_female", count: 1 },
            { enemyDefId: "bandit_reaver_male", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [15, 30],
        rewardXp: 25,
        rewardItemIds: [],
    },
    {
        id: "generic_miasma_wolves",
        region: Region.Aethermoor,
        enemyGroup: [
            { enemyDefId: "miasma_wolf", count: 3 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [20, 40],
        rewardXp: 30,
        rewardItemIds: [],
    },
    {
        id: "generic_cultist_patrol",
        region: Region.AuricCourt,
        enemyGroup: [
            { enemyDefId: "cultist_enforcer_male", count: 2 },
            { enemyDefId: "cultist_seductress", count: 1 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [50, 100],
        rewardXp: 70,
        rewardItemIds: [],
    },
    {
        id: "generic_void_pack",
        region: Region.SunkenSanctum,
        enemyGroup: [
            { enemyDefId: "void_stalker", count: 2 },
            { enemyDefId: "void_bat", count: 2 },
        ],
        maxSimultaneousEnemies: 6,
        isBossEncounter: false,
        rewardGoldRange: [80, 160],
        rewardXp: 110,
        rewardItemIds: [],
    },
];