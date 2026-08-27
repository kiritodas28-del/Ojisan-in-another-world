// ============================================================================
// COMPANION QUESTS SEED DATA (69)
// ============================================================================
import type { QuestDef } from "../schemas/schemas";
import { QuestType, Region, QuestObjectiveType } from "../schemas/schemas";

function companionQuest(
    id: string,
    companionId: string,
    region: Region,
    stage: number,
    objectives: QuestDef["objectives"],
    trustReq: number,
    loveReq: number,
    trustDelta: number,
    loveDelta: number,
    availableOnBoard: boolean,
    prerequisiteFlags: string[]
): QuestDef {
    return {
        id,
        type: QuestType.Companion,
        region,
        questGiverId: companionId,
        prerequisiteFlags,
        objectives,
        rewardGold: 0,
        rewardXp: 0,
        rewardReputationDelta: 0,
        rewardItemIds: [],
        companionTrustDelta: trustDelta,
        companionLoveDelta: loveDelta,
        requiresTrustAtLeast: trustReq,
        requiresLoveAtLeast: loveReq,
        availableOnQuestBoard: availableOnBoard,
        acceptCutsceneId: `${id}_accept`,
        completionCutsceneId: `${id}_complete`,
    };
}

export const COMPANION_QUESTS: QuestDef[] = [
    // =========================================================================
    // MIRA — 7 stages
    // =========================================================================
    companionQuest(
        "mira_chain_stage_1",
        "MIRA",
        Region.VerdantVale,
        1,
        [
            { id: "mira1_herbs", type: QuestObjectiveType.Collect, description: "Gather medicinal herbs for Mira.", targetCount: 5, currentCount: 0, targetItemId: "medicinal_herb", targetLocationId: "vv_fields" }
        ],
        5, 0, 3, 1,
        true,
        ["met_mira"]
    ),
    companionQuest(
        "mira_chain_stage_2",
        "MIRA",
        Region.VerdantVale,
        2,
        [
            { id: "mira2_visit_sick", type: QuestObjectiveType.Talk, description: "Visit the sick with Mira.", targetCount: 3, currentCount: 0, targetNpcId: "town_merchant", targetLocationId: "vv_vale_village" }
        ],
        15, 5, 3, 2,
        false,
        ["mira_chain_stage_1_completed"]
    ),
    companionQuest(
        "mira_chain_stage_3",
        "MIRA",
        Region.VerdantVale,
        3,
        [
            { id: "mira3_rest", type: QuestObjectiveType.Interact, description: "Convince Mira to rest at her cottage.", targetCount: 1, currentCount: 0, targetLocationId: "vv_shrine_cottage" }
        ],
        25, 10, 4, 3,
        false,
        ["mira_chain_stage_2_completed"]
    ),
    companionQuest(
        "mira_chain_stage_4",
        "MIRA",
        Region.VerdantVale,
        4,
        [
            { id: "mira4_past", type: QuestObjectiveType.Interact, description: "Encourage Mira to speak about her past failure.", targetCount: 1, currentCount: 0, targetLocationId: "vv_shrine_cottage" }
        ],
        35, 15, 5, 4,
        false,
        ["mira_chain_stage_3_completed"]
    ),
    companionQuest(
        "mira_chain_stage_5",
        "MIRA",
        Region.VerdantVale,
        5,
        [
            { id: "mira5_forest", type: QuestObjectiveType.Interact, description: "Accompany Mira into the forest and awaken something.", targetCount: 1, currentCount: 0, targetLocationId: "vv_forest" }
        ],
        45, 20, 6, 5,
        false,
        ["mira_chain_stage_4_completed"]
    ),
    companionQuest(
        "mira_chain_stage_6",
        "MIRA",
        Region.VerdantVale,
        6,
        [
            { id: "mira6_lesson", type: QuestObjectiveType.Interact, description: "Teach Mira that pleasure can be a remedy.", targetCount: 1, currentCount: 0, targetLocationId: "vv_shrine_cottage" }
        ],
        55, 25, 8, 6,
        false,
        ["mira_chain_stage_5_completed"]
    ),
    companionQuest(
        "mira_chain_stage_7",
        "MIRA",
        Region.VerdantVale,
        7,
        [
            { id: "mira7_confession", type: QuestObjectiveType.Interact, description: "Meet Mira for her final confession.", targetCount: 1, currentCount: 0, targetLocationId: "vv_shrine" }
        ],
        65, 35, 10, 8,
        false,
        ["mira_chain_stage_6_completed"]
    ),

    // =========================================================================
    // ISOLDE — 7 stages
    // =========================================================================
    companionQuest(
        "isolde_chain_stage_1",
        "ISOLDE",
        Region.Aethermoor,
        1,
        [
            { id: "isolde1_archive", type: QuestObjectiveType.Interact, description: "Help Isolde clear the archive.", targetCount: 1, currentCount: 0, targetLocationId: "ae_isolde_estate" }
        ],
        5, 0, 2, 0,
        true,
        ["met_isolde"]
    ),
    companionQuest(
        "isolde_chain_stage_2",
        "ISOLDE",
        Region.Aethermoor,
        2,
        [
            { id: "isolde2_wraiths", type: QuestObjectiveType.Kill, description: "Defeat wraiths near the archive.", targetCount: 3, currentCount: 0, targetEnemyId: "miasma_wraith", targetLocationId: "ae_forest" }
        ],
        15, 0, 3, 1,
        false,
        ["isolde_chain_stage_1_completed"]
    ),
    companionQuest(
        "isolde_chain_stage_3",
        "ISOLDE",
        Region.Aethermoor,
        3,
        [
            { id: "isolde3_duel", type: QuestObjectiveType.Interact, description: "Face Isolde in a private duel.", targetCount: 1, currentCount: 0, targetLocationId: "ae_isolde_estate" }
        ],
        25, 5, 4, 2,
        false,
        ["isolde_chain_stage_2_completed"]
    ),
    companionQuest(
        "isolde_chain_stage_4",
        "ISOLDE",
        Region.Aethermoor,
        4,
        [
            { id: "isolde4_loneliness", type: QuestObjectiveType.Talk, description: "Ask Isolde about her loneliness.", targetCount: 1, currentCount: 0, targetNpcId: "ISOLDE", targetLocationId: "ae_isolde_estate" }
        ],
        35, 10, 5, 4,
        false,
        ["isolde_chain_stage_3_completed"]
    ),
    companionQuest(
        "isolde_chain_stage_5",
        "ISOLDE",
        Region.Aethermoor,
        5,
        [
            { id: "isolde5_golem", type: QuestObjectiveType.Kill, description: "Destroy rogue golems together.", targetCount: 2, currentCount: 0, targetEnemyId: "rogue_battle_golem", targetLocationId: "ae_mine" }
        ],
        45, 15, 6, 5,
        false,
        ["isolde_chain_stage_4_completed"]
    ),
    companionQuest(
        "isolde_chain_stage_6",
        "ISOLDE",
        Region.Aethermoor,
        6,
        [
            { id: "isolde6_surrender", type: QuestObjectiveType.Interact, description: "Push Isolde toward emotional surrender.", targetCount: 1, currentCount: 0, targetLocationId: "ae_isolde_estate" }
        ],
        55, 20, 8, 6,
        false,
        ["isolde_chain_stage_5_completed"]
    ),
    companionQuest(
        "isolde_chain_stage_7",
        "ISOLDE",
        Region.Aethermoor,
        7,
        [
            { id: "isolde7_final", type: QuestObjectiveType.Interact, description: "Claim Isolde completely.", targetCount: 1, currentCount: 0, targetLocationId: "ae_isolde_estate" }
        ],
        65, 30, 10, 8,
        false,
        ["isolde_chain_stage_6_completed"]
    ),

    // =========================================================================
    // GRAEL — 7 stages
    // =========================================================================
    companionQuest(
        "grael_chain_stage_1",
        "GRAEL",
        Region.CrimsonMarch,
        1,
        [
            { id: "grael1_smithy", type: QuestObjectiveType.Interact, description: "Help Grael at her smithy.", targetCount: 1, currentCount: 0, targetLocationId: "cm_grael_smithy" }
        ],
        5, 0, 3, 1,
        true,
        ["met_grael"]
    ),
    companionQuest(
        "grael_chain_stage_2",
        "GRAEL",
        Region.CrimsonMarch,
        2,
        [
            { id: "grael2_bandits", type: QuestObjectiveType.Kill, description: "Defeat bandits with Grael.", targetCount: 4, currentCount: 0, targetEnemyId: "bandit_reaver_female", targetLocationId: "cm_crimson_camp" }
        ],
        15, 0, 3, 2,
        false,
        ["grael_chain_stage_1_completed"]
    ),
    companionQuest(
        "grael_chain_stage_3",
        "GRAEL",
        Region.CrimsonMarch,
        3,
        [
            { id: "grael3_spar", type: QuestObjectiveType.Interact, description: "Spar with Grael.", targetCount: 1, currentCount: 0, targetLocationId: "cm_grael_smithy" }
        ],
        25, 5, 4, 3,
        false,
        ["grael_chain_stage_2_completed"]
    ),
    companionQuest(
        "grael_chain_stage_4",
        "GRAEL",
        Region.CrimsonMarch,
        4,
        [
            { id: "grael4_tavern", type: QuestObjectiveType.Talk, description: "Share a quiet night with Grael at the tavern.", targetCount: 1, currentCount: 0, targetNpcId: "GRAEL", targetLocationId: "cm_tavern" }
        ],
        35, 10, 5, 4,
        false,
        ["grael_chain_stage_3_completed"]
    ),
    companionQuest(
        "grael_chain_stage_5",
        "GRAEL",
        Region.CrimsonMarch,
        5,
        [
            { id: "grael5_marauders", type: QuestObjectiveType.Kill, description: "Fight marauders with Grael.", targetCount: 3, currentCount: 0, targetEnemyId: "marauder_brute_female", targetLocationId: "cm_forest" }
        ],
        45, 15, 6, 5,
        false,
        ["grael_chain_stage_4_completed"]
    ),
    companionQuest(
        "grael_chain_stage_6",
        "GRAEL",
        Region.CrimsonMarch,
        6,
        [
            { id: "grael6_yield", type: QuestObjectiveType.Interact, description: "Make Grael yield in a private duel.", targetCount: 1, currentCount: 0, targetLocationId: "cm_grael_smithy" }
        ],
        55, 20, 8, 6,
        false,
        ["grael_chain_stage_5_completed"]
    ),
    companionQuest(
        "grael_chain_stage_7",
        "GRAEL",
        Region.CrimsonMarch,
        7,
        [
            { id: "grael7_final", type: QuestObjectiveType.Interact, description: "Accept Grael's final submission.", targetCount: 1, currentCount: 0, targetLocationId: "cm_grael_smithy" }
        ],
        65, 30, 10, 8,
        false,
        ["grael_chain_stage_6_completed"]
    ),

    // =========================================================================
    // VALKA — 7 stages
    // =========================================================================
    companionQuest(
        "valka_chain_stage_1",
        "VALKA",
        Region.CrimsonMarch,
        1,
        [
            { id: "valka1_den", type: QuestObjectiveType.Interact, description: "Meet Valka at her den.", targetCount: 1, currentCount: 0, targetLocationId: "cm_valka_den" }
        ],
        5, 0, 2, 0,
        true,
        ["met_valka"]
    ),
    companionQuest(
        "valka_chain_stage_2",
        "VALKA",
        Region.CrimsonMarch,
        2,
        [
            { id: "valka2_wyrmlings", type: QuestObjectiveType.Kill, description: "Hunt wyrmlings with Valka.", targetCount: 3, currentCount: 0, targetEnemyId: "crimson_wyrmling", targetLocationId: "cm_wyrm_peak" }
        ],
        15, 0, 3, 1,
        false,
        ["valka_chain_stage_1_completed"]
    ),
    companionQuest(
        "valka_chain_stage_3",
        "VALKA",
        Region.CrimsonMarch,
        3,
        [
            { id: "valka3_challenge", type: QuestObjectiveType.Interact, description: "Challenge Valka to a pride battle.", targetCount: 1, currentCount: 0, targetLocationId: "cm_valka_den" }
        ],
        25, 5, 4, 2,
        false,
        ["valka_chain_stage_2_completed"]
    ),
    companionQuest(
        "valka_chain_stage_4",
        "VALKA",
        Region.CrimsonMarch,
        4,
        [
            { id: "valka4_clan", type: QuestObjectiveType.Talk, description: "Discuss clan and duty with Valka.", targetCount: 1, currentCount: 0, targetNpcId: "VALKA", targetLocationId: "cm_valka_den" }
        ],
        35, 10, 5, 3,
        false,
        ["valka_chain_stage_3_completed"]
    ),
    companionQuest(
        "valka_chain_stage_5",
        "VALKA",
        Region.CrimsonMarch,
        5,
        [
            { id: "valka5_event", type: QuestObjectiveType.Interact, description: "Attend a clan event with Valka.", targetCount: 1, currentCount: 0, targetLocationId: "cm_wyrm_peak" }
        ],
        45, 15, 6, 5,
        false,
        ["valka_chain_stage_4_completed"]
    ),
    companionQuest(
        "valka_chain_stage_6",
        "VALKA",
        Region.CrimsonMarch,
        6,
        [
            { id: "valka6_loss", type: QuestObjectiveType.Interact, description: "Defeat Valka completely.", targetCount: 1, currentCount: 0, targetLocationId: "cm_valka_den" }
        ],
        55, 20, 8, 6,
        false,
        ["valka_chain_stage_5_completed"]
    ),
    companionQuest(
        "valka_chain_stage_7",
        "VALKA",
        Region.CrimsonMarch,
        7,
        [
            { id: "valka7_final", type: QuestObjectiveType.Interact, description: "Claim Valka and make her abandon old loyalties.", targetCount: 1, currentCount: 0, targetLocationId: "cm_valka_den" }
        ],
        65, 30, 10, 8,
        false,
        ["valka_chain_stage_6_completed"]
    ),

    // =========================================================================
    // SEIRA — 7 stages
    // =========================================================================
    companionQuest(
        "seira_chain_stage_1",
        "SEIRA",
        Region.WhisperingWood,
        1,
        [
            { id: "seira1_knife", type: QuestObjectiveType.Interact, description: "Survive Seira's knife and talk.", targetCount: 1, currentCount: 0, targetLocationId: "ww_forest" }
        ],
        5, 0, 2, 0,
        true,
        ["met_seira"]
    ),
    companionQuest(
        "seira_chain_stage_2",
        "SEIRA",
        Region.WhisperingWood,
        2,
        [
            { id: "seira2_capture", type: QuestObjectiveType.Interact, description: "Capture Seira in a reversal.", targetCount: 1, currentCount: 0, targetLocationId: "ww_seira_den" }
        ],
        15, 0, 3, 1,
        false,
        ["seira_chain_stage_1_completed"]
    ),
    companionQuest(
        "seira_chain_stage_3",
        "SEIRA",
        Region.WhisperingWood,
        3,
        [
            { id: "seira3_coerce", type: QuestObjectiveType.Talk, description: "Coerce Seira to follow you.", targetCount: 1, currentCount: 0, targetNpcId: "SEIRA", targetLocationId: "ww_seira_den" }
        ],
        25, 5, 4, 2,
        false,
        ["seira_chain_stage_2_completed"]
    ),
    companionQuest(
        "seira_chain_stage_4",
        "SEIRA",
        Region.WhisperingWood,
        4,
        [
            { id: "seira4_client", type: QuestObjectiveType.Interact, description: "Learn who sent Seira.", targetCount: 1, currentCount: 0, targetLocationId: "ww_treeline_hub" }
        ],
        35, 10, 5, 3,
        false,
        ["seira_chain_stage_3_completed"]
    ),
    companionQuest(
        "seira_chain_stage_5",
        "SEIRA",
        Region.WhisperingWood,
        5,
        [
            { id: "seira5_reversal", type: QuestObjectiveType.Interact, description: "Capture Seira again.", targetCount: 1, currentCount: 0, targetLocationId: "ww_forest" }
        ],
        45, 15, 6, 5,
        false,
        ["seira_chain_stage_4_completed"]
    ),
    companionQuest(
        "seira_chain_stage_6",
        "SEIRA",
        Region.WhisperingWood,
        6,
        [
            { id: "seira6_accept", type: QuestObjectiveType.Talk, description: "Hear Seira admit she doesn't want to escape.", targetCount: 1, currentCount: 0, targetNpcId: "SEIRA", targetLocationId: "ww_seira_den" }
        ],
        55, 20, 8, 6,
        false,
        ["seira_chain_stage_5_completed"]
    ),
    companionQuest(
        "seira_chain_stage_7",
        "SEIRA",
        Region.WhisperingWood,
        7,
        [
            { id: "seira7_final", type: QuestObjectiveType.Interact, description: "Bind Seira to you willingly.", targetCount: 1, currentCount: 0, targetLocationId: "ww_seira_den" }
        ],
        65, 30, 10, 8,
        false,
        ["seira_chain_stage_6_completed"]
    ),

    // =========================================================================
    // SYLVARA — 7 stages
    // =========================================================================
    companionQuest(
        "sylvara_chain_stage_1",
        "SYLVARA",
        Region.WhisperingWood,
        1,
        [
            { id: "sylvara1_grove", type: QuestObjectiveType.Interact, description: "Help Sylvara tend her grove.", targetCount: 1, currentCount: 0, targetLocationId: "ww_sylvara_grove" }
        ],
        5, 0, 3, 1,
        true,
        ["met_sylvara"]
    ),
    companionQuest(
        "sylvara_chain_stage_2",
        "SYLVARA",
        Region.WhisperingWood,
        2,
        [
            { id: "sylvara2_mate", type: QuestObjectiveType.Talk, description: "Ask Sylvara about her lost mate.", targetCount: 1, currentCount: 0, targetNpcId: "SYLVARA", targetLocationId: "ww_sylvara_grove" }
        ],
        15, 5, 4, 2,
        false,
        ["sylvara_chain_stage_1_completed"]
    ),
    companionQuest(
        "sylvara_chain_stage_3",
        "SYLVARA",
        Region.WhisperingWood,
        3,
        [
            { id: "sylvara3_purify", type: QuestObjectiveType.Kill, description: "Purify corruption from the grove.", targetCount: 3, currentCount: 0, targetEnemyId: "miasma_treant", targetLocationId: "ww_heartwood_grove" }
        ],
        25, 10, 5, 3,
        false,
        ["sylvara_chain_stage_2_completed"]
    ),
    companionQuest(
        "sylvara_chain_stage_4",
        "SYLVARA",
        Region.WhisperingWood,
        4,
        [
            { id: "sylvara4_ritual", type: QuestObjectiveType.Interact, description: "Participate in a moon ritual with Sylvara.", targetCount: 1, currentCount: 0, targetLocationId: "ww_shrine" }
        ],
        35, 15, 6, 4,
        false,
        ["sylvara_chain_stage_3_completed"]
    ),
    companionQuest(
        "sylvara_chain_stage_5",
        "SYLVARA",
        Region.WhisperingWood,
        5,
        [
            { id: "sylvara5_touch", type: QuestObjectiveType.Interact, description: "Use healing touch to awaken Sylvara's body.", targetCount: 1, currentCount: 0, targetLocationId: "ww_sylvara_grove" }
        ],
        45, 20, 7, 5,
        false,
        ["sylvara_chain_stage_4_completed"]
    ),
    companionQuest(
        "sylvara_chain_stage_6",
        "SYLVARA",
        Region.WhisperingWood,
        6,
        [
            { id: "sylvara6_pleasure", type: QuestObjectiveType.Interact, description: "Help Sylvara accept pleasure without guilt.", targetCount: 1, currentCount: 0, targetLocationId: "ww_sylvara_grove" }
        ],
        55, 25, 8, 6,
        false,
        ["sylvara_chain_stage_5_completed"]
    ),
    companionQuest(
        "sylvara_chain_stage_7",
        "SYLVARA",
        Region.WhisperingWood,
        7,
        [
            { id: "sylvara7_final", type: QuestObjectiveType.Interact, description: "Sylvara gives herself fully to Kenji.", targetCount: 1, currentCount: 0, targetLocationId: "ww_sylvara_grove" }
        ],
        65, 35, 10, 8,
        false,
        ["sylvara_chain_stage_6_completed"]
    ),

    // =========================================================================
    // REVA — 7 stages
    // =========================================================================
    companionQuest(
        "reva_chain_stage_1",
        "REVA",
        Region.AuricCourt,
        1,
        [
            { id: "reva1_market", type: QuestObjectiveType.Interact, description: "Meet Reva in the market.", targetCount: 1, currentCount: 0, targetLocationId: "ac_market_square" }
        ],
        5, 0, 2, 1,
        true,
        ["met_reva"]
    ),
    companionQuest(
        "reva_chain_stage_2",
        "REVA",
        Region.AuricCourt,
        2,
        [
            { id: "reva2_secret", type: QuestObjectiveType.Talk, description: "Ask Reva about the secret she mentioned.", targetCount: 1, currentCount: 0, targetNpcId: "REVA", targetLocationId: "ac_market_square" }
        ],
        15, 5, 3, 2,
        false,
        ["reva_chain_stage_1_completed"]
    ),
    companionQuest(
        "reva_chain_stage_3",
        "REVA",
        Region.AuricCourt,
        3,
        [
            { id: "reva3_game", type: QuestObjectiveType.Interact, description: "Turn Reva's own game against her.", targetCount: 1, currentCount: 0, targetLocationId: "ac_reva_suite" }
        ],
        25, 10, 4, 3,
        false,
        ["reva_chain_stage_2_completed"]
    ),
    companionQuest(
        "reva_chain_stage_4",
        "REVA",
        Region.AuricCourt,
        4,
        [
            { id: "reva4_attraction", type: QuestObjectiveType.Talk, description: "Notice Reva's genuine attraction.", targetCount: 1, currentCount: 0, targetNpcId: "REVA", targetLocationId: "ac_reva_suite" }
        ],
        35, 15, 5, 4,
        false,
        ["reva_chain_stage_3_completed"]
    ),
    companionQuest(
        "reva_chain_stage_5",
        "REVA",
        Region.AuricCourt,
        5,
        [
            { id: "reva5_mask", type: QuestObjectiveType.Interact, description: "See Reva's mask slip in private.", targetCount: 1, currentCount: 0, targetLocationId: "ac_reva_suite" }
        ],
        45, 20, 6, 5,
        false,
        ["reva_chain_stage_4_completed"]
    ),
    companionQuest(
        "reva_chain_stage_6",
        "REVA",
        Region.AuricCourt,
        6,
        [
            { id: "reva6_pursue", type: QuestObjectiveType.Talk, description: "Learn that Reva wants to be pursued.", targetCount: 1, currentCount: 0, targetNpcId: "REVA", targetLocationId: "ac_reva_suite" }
        ],
        55, 25, 8, 6,
        false,
        ["reva_chain_stage_5_completed"]
    ),
    companionQuest(
        "reva_chain_stage_7",
        "REVA",
        Region.AuricCourt,
        7,
        [
            { id: "reva7_final", type: QuestObjectiveType.Interact, description: "Reva surrenders completely.", targetCount: 1, currentCount: 0, targetLocationId: "ac_reva_suite" }
        ],
        65, 35, 10, 8,
        false,
        ["reva_chain_stage_6_completed"]
    ),

    // =========================================================================
    // TASHA — 7 stages
    // =========================================================================
    companionQuest(
        "tasha_chain_stage_1",
        "TASHA",
        Region.VerdantVale,
        1,
        [
            { id: "tasha1_hearth", type: QuestObjectiveType.Interact, description: "Help Tasha at her hearth.", targetCount: 1, currentCount: 0, targetLocationId: "vv_tasha_hearth" }
        ],
        5, 0, 3, 1,
        true,
        ["met_tasha"]
    ),
    companionQuest(
        "tasha_chain_stage_2",
        "TASHA",
        Region.VerdantVale,
        2,
        [
            { id: "tasha2_marriage", type: QuestObjectiveType.Talk, description: "Ask Tasha about her marriage.", targetCount: 1, currentCount: 0, targetNpcId: "TASHA", targetLocationId: "vv_tasha_hearth" }
        ],
        15, 5, 4, 2,
        false,
        ["tasha_chain_stage_1_completed"]
    ),
    companionQuest(
        "tasha_chain_stage_3",
        "TASHA",
        Region.VerdantVale,
        3,
        [
            { id: "tasha3_coerce", type: QuestObjectiveType.Interact, description: "Use Tasha's loneliness against her.", targetCount: 1, currentCount: 0, targetLocationId: "vv_tasha_hearth" }
        ],
        25, 10, 5, 3,
        false,
        ["tasha_chain_stage_2_completed"]
    ),
    companionQuest(
        "tasha_chain_stage_4",
        "TASHA",
        Region.VerdantVale,
        4,
        [
            { id: "tasha4_secret", type: QuestObjectiveType.Interact, description: "Arrange a secret meeting.", targetCount: 1, currentCount: 0, targetLocationId: "vv_tasha_hearth" }
        ],
        35, 15, 6, 4,
        false,
        ["tasha_chain_stage_3_completed"]
    ),
    companionQuest(
        "tasha_chain_stage_5",
        "TASHA",
        Region.VerdantVale,
        5,
        [
            { id: "tasha5_anticipate", type: QuestObjectiveType.Talk, description: "Notice Tasha looking forward to your visits.", targetCount: 1, currentCount: 0, targetNpcId: "TASHA", targetLocationId: "vv_tasha_hearth" }
        ],
        45, 20, 7, 5,
        false,
        ["tasha_chain_stage_4_completed"]
    ),
    companionQuest(
        "tasha_chain_stage_6",
        "TASHA",
        Region.VerdantVale,
        6,
        [
            { id: "tasha6_desire", type: QuestObjectiveType.Interact, description: "Give Tasha forbidden desire.", targetCount: 1, currentCount: 0, targetLocationId: "vv_tasha_hearth" }
        ],
        55, 25, 8, 6,
        false,
        ["tasha_chain_stage_5_completed"]
    ),
    companionQuest(
        "tasha_chain_stage_7",
        "TASHA",
        Region.VerdantVale,
        7,
        [
            { id: "tasha7_final", type: QuestObjectiveType.Interact, description: "Tasha leaves her old life behind.", targetCount: 1, currentCount: 0, targetLocationId: "vv_tasha_hearth" }
        ],
        65, 35, 10, 8,
        false,
        ["tasha_chain_stage_6_completed"]
    ),

    // =========================================================================
    // SERA — 7 stages
    // =========================================================================
    companionQuest(
        "sera_chain_stage_1",
        "SERA",
        Region.AuricCourt,
        1,
        [
            { id: "sera1_judge", type: QuestObjectiveType.Talk, description: "Let Sera judge you.", targetCount: 1, currentCount: 0, targetNpcId: "SERA", targetLocationId: "ac_auric_court" }
        ],
        5, 0, 2, 0,
        true,
        ["met_sera"]
    ),
    companionQuest(
        "sera_chain_stage_2",
        "SERA",
        Region.AuricCourt,
        2,
        [
            { id: "sera2_purify", type: QuestObjectiveType.Kill, description: "Fight corruption to prove your purity.", targetCount: 3, currentCount: 0, targetEnemyId: "cultist_enforcer_male", targetLocationId: "ac_fields" }
        ],
        15, 0, 3, 1,
        false,
        ["sera_chain_stage_1_completed"]
    ),
    companionQuest(
        "sera_chain_stage_3",
        "SERA",
        Region.AuricCourt,
        3,
        [
            { id: "sera3_doubt", type: QuestObjectiveType.Talk, description: "Make Sera doubt her vows.", targetCount: 1, currentCount: 0, targetNpcId: "SERA", targetLocationId: "ac_auric_court" }
        ],
        25, 5, 4, 2,
        false,
        ["sera_chain_stage_2_completed"]
    ),
    companionQuest(
        "sera_chain_stage_4",
        "SERA",
        Region.AuricCourt,
        4,
        [
            { id: "sera4_weakness", type: QuestObjectiveType.Interact, description: "Expose Sera's hidden sensitivity.", targetCount: 1, currentCount: 0, targetLocationId: "ac_shrine" }
        ],
        35, 10, 5, 3,
        false,
        ["sera_chain_stage_3_completed"]
    ),
    companionQuest(
        "sera_chain_stage_5",
        "SERA",
        Region.AuricCourt,
        5,
        [
            { id: "sera5_pleasure", type: QuestObjectiveType.Interact, description: "Break her discipline with pleasure.", targetCount: 1, currentCount: 0, targetLocationId: "ac_shrine" }
        ],
        45, 15, 6, 5,
        false,
        ["sera_chain_stage_4_completed"]
    ),
    companionQuest(
        "sera_chain_stage_6",
        "SERA",
        Region.AuricCourt,
        6,
        [
            { id: "sera6_break", type: QuestObjectiveType.Interact, description: "Complete Sera's mind break.", targetCount: 1, currentCount: 0, targetLocationId: "ac_shrine" }
        ],
        55, 20, 8, 6,
        false,
        ["sera_chain_stage_5_completed"]
    ),
    companionQuest(
        "sera_chain_stage_7",
        "SERA",
        Region.AuricCourt,
        7,
        [
            { id: "sera7_final", type: QuestObjectiveType.Interact, description: "Rebuild Sera as your devoted servant.", targetCount: 1, currentCount: 0, targetLocationId: "ac_shrine" }
        ],
        65, 30, 10, 8,
        false,
        ["sera_chain_stage_6_completed"]
    ),

    // =========================================================================
    // LYRA — 6 stages
    // =========================================================================
    companionQuest(
        "lyra_chain_stage_1",
        "LYRA",
        Region.CelestialThreshold,
        1,
        [
            { id: "lyra1_sanctum", type: QuestObjectiveType.Interact, description: "Meet Lyra at her sanctum.", targetCount: 1, currentCount: 0, targetLocationId: "ct_lyra_sanctum" }
        ],
        5, 0, 2, 1,
        true,
        ["met_lyra"]
    ),
    companionQuest(
        "lyra_chain_stage_2",
        "LYRA",
        Region.CelestialThreshold,
        2,
        [
            { id: "lyra2_fall", type: QuestObjectiveType.Talk, description: "Ask Lyra about her fall.", targetCount: 1, currentCount: 0, targetNpcId: "LYRA", targetLocationId: "ct_lyra_sanctum" }
        ],
        15, 5, 3, 2,
        false,
        ["lyra_chain_stage_1_completed"]
    ),
    companionQuest(
        "lyra_chain_stage_3",
        "LYRA",
        Region.CelestialThreshold,
        3,
        [
            { id: "lyra3_trial", type: QuestObjectiveType.Interact, description: "Defeat Lyra in a trial.", targetCount: 1, currentCount: 0, targetLocationId: "ct_ascension_path" }
        ],
        25, 10, 4, 3,
        false,
        ["lyra_chain_stage_2_completed"]
    ),
    companionQuest(
        "lyra_chain_stage_4",
        "LYRA",
        Region.CelestialThreshold,
        4,
        [
            { id: "lyra4_punish", type: QuestObjectiveType.Talk, description: "Learn that Lyra longs for punishment.", targetCount: 1, currentCount: 0, targetNpcId: "LYRA", targetLocationId: "ct_lyra_sanctum" }
        ],
        35, 15, 5, 4,
        false,
        ["lyra_chain_stage_3_completed"]
    ),
    companionQuest(
        "lyra_chain_stage_5",
        "LYRA",
        Region.CelestialThreshold,
        5,
        [
            { id: "lyra5_corrupt", type: QuestObjectiveType.Interact, description: "Begin sensual corruption of Lyra.", targetCount: 1, currentCount: 0, targetLocationId: "ct_lyra_sanctum" }
        ],
        45, 20, 6, 5,
        false,
        ["lyra_chain_stage_4_completed"]
    ),
    companionQuest(
        "lyra_chain_stage_6",
        "LYRA",
        Region.CelestialThreshold,
        6,
        [
            { id: "lyra6_final", type: QuestObjectiveType.Interact, description: "Complete Lyra's domination and corrupted surrender.", targetCount: 1, currentCount: 0, targetLocationId: "ct_lyra_sanctum" }
        ],
        55, 30, 10, 8,
        false,
        ["lyra_chain_stage_5_completed"]
    ),
];