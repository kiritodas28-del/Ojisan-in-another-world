// ============================================================================
// LOCATION POPULATION SEED DATA
// ============================================================================
import type { LocationPopulationDef } from "../schemas/schemas";

export const LOCATION_POPULATIONS: LocationPopulationDef[] = [
    // =========================================================================
    // VERDANT VALE
    // =========================================================================
    {
        locationId: "vv_vale_village",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [1, 2] },
            { procNpcClassId: "farm_worker", count: [1, 3] },
            { procNpcClassId: "tavern_server", count: [1, 2] },
            { procNpcClassId: "town_guard", count: [2, 4] },
            { procNpcClassId: "herbalist", count: [1, 2] },
            { procNpcClassId: "miner", count: [0, 1] },
            { procNpcClassId: "fisherman", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "shrine_priest", count: [1, 2] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 2] },
        ],
        serviceNpcIds: [
            "svc_vv_general_store",
            "svc_vv_inn",
            "svc_vv_questboard",
            "svc_vv_bank",
            "svc_vv_fasttravel",
            "svc_vv_bountyoffice",
        ],
        childNpcCount: [2, 5],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_market_square",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [2, 4] },
            { procNpcClassId: "farm_worker", count: [0, 2] },
            { procNpcClassId: "tavern_server", count: [0, 1] },
            { procNpcClassId: "town_guard", count: [0, 1] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "miner", count: [0, 1] },
            { procNpcClassId: "fisherman", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "shrine_priest", count: [0, 1] },
            { procNpcClassId: "traveling_performer", count: [1, 2] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 2],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_tavern",
        interactableNpcCounts: [
            { procNpcClassId: "tavern_server", count: [1, 3] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
            { procNpcClassId: "town_guard", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_guard_post",
        interactableNpcCounts: [
            { procNpcClassId: "town_guard", count: [2, 4] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_herbalist_shop",
        interactableNpcCounts: [
            { procNpcClassId: "herbalist", count: [1, 2] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_fields",
        interactableNpcCounts: [
            { procNpcClassId: "farm_worker", count: [2, 5] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_mine",
        interactableNpcCounts: [
            { procNpcClassId: "miner", count: [2, 5] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_docks",
        interactableNpcCounts: [
            { procNpcClassId: "fisherman", count: [2, 5] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_forest",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [1, 3] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_shrine",
        interactableNpcCounts: [
            { procNpcClassId: "shrine_priest", count: [1, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_ardor_manor",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "vv_ley_node_grove",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },

    // =========================================================================
    // AETHERMOOR
    // =========================================================================
    {
        locationId: "ae_aethermoor_city",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [2, 4] },
            { procNpcClassId: "farm_worker", count: [0, 2] },
            { procNpcClassId: "tavern_server", count: [1, 3] },
            { procNpcClassId: "town_guard", count: [2, 4] },
            { procNpcClassId: "herbalist", count: [1, 2] },
            { procNpcClassId: "miner", count: [0, 1] },
            { procNpcClassId: "fisherman", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "shrine_priest", count: [1, 2] },
            { procNpcClassId: "traveling_performer", count: [1, 2] },
            { procNpcClassId: "adventurer", count: [1, 3] },
        ],
        serviceNpcIds: [
            "svc_ae_arcanum_emporium",
            "svc_ae_inn",
            "svc_ae_questboard",
            "svc_ae_bank",
            "svc_ae_fasttravel",
            "svc_ae_bountyoffice",
        ],
        childNpcCount: [2, 6],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ae_market_square",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [2, 4] },
            { procNpcClassId: "farm_worker", count: [0, 2] },
            { procNpcClassId: "tavern_server", count: [0, 1] },
            { procNpcClassId: "town_guard", count: [0, 1] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "miner", count: [0, 1] },
            { procNpcClassId: "fisherman", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "shrine_priest", count: [0, 1] },
            { procNpcClassId: "traveling_performer", count: [1, 2] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 2],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ae_tavern",
        interactableNpcCounts: [
            { procNpcClassId: "tavern_server", count: [1, 3] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
            { procNpcClassId: "town_guard", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ae_guard_post",
        interactableNpcCounts: [
            { procNpcClassId: "town_guard", count: [2, 4] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ae_herbalist_shop",
        interactableNpcCounts: [
            { procNpcClassId: "herbalist", count: [1, 2] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ae_fields",
        interactableNpcCounts: [
            { procNpcClassId: "farm_worker", count: [1, 3] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ae_mine",
        interactableNpcCounts: [
            { procNpcClassId: "miner", count: [2, 5] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ae_docks",
        interactableNpcCounts: [
            { procNpcClassId: "fisherman", count: [2, 5] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ae_forest",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [1, 3] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ae_shrine",
        interactableNpcCounts: [
            { procNpcClassId: "shrine_priest", count: [1, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },

    // =========================================================================
    // CRIMSON MARCH
    // =========================================================================
    {
        locationId: "cm_crimson_camp",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [1, 3] },
            { procNpcClassId: "tavern_server", count: [1, 2] },
            { procNpcClassId: "town_guard", count: [2, 4] },
            { procNpcClassId: "hunter", count: [1, 2] },
            { procNpcClassId: "adventurer", count: [1, 3] },
            { procNpcClassId: "farm_worker", count: [0, 1] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "miner", count: [0, 1] },
            { procNpcClassId: "fisherman", count: [0, 1] },
            { procNpcClassId: "shrine_priest", count: [0, 1] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
        ],
        serviceNpcIds: [
            "svc_cm_supply_post",
            "svc_cm_inn",
            "svc_cm_questboard",
            "svc_cm_fasttravel",
            "svc_cm_bountyoffice",
        ],
        childNpcCount: [1, 3],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "cm_market_square",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [2, 4] },
            { procNpcClassId: "farm_worker", count: [0, 1] },
            { procNpcClassId: "tavern_server", count: [0, 1] },
            { procNpcClassId: "town_guard", count: [0, 1] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "miner", count: [0, 1] },
            { procNpcClassId: "fisherman", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "shrine_priest", count: [0, 1] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "cm_tavern",
        interactableNpcCounts: [
            { procNpcClassId: "tavern_server", count: [1, 2] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
            { procNpcClassId: "town_guard", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "cm_guard_post",
        interactableNpcCounts: [
            { procNpcClassId: "town_guard", count: [2, 4] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "cm_fields",
        interactableNpcCounts: [
            { procNpcClassId: "farm_worker", count: [1, 3] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "cm_mine",
        interactableNpcCounts: [
            { procNpcClassId: "miner", count: [2, 5] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "cm_docks",
        interactableNpcCounts: [
            { procNpcClassId: "fisherman", count: [1, 3] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "cm_forest",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [1, 3] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "cm_shrine",
        interactableNpcCounts: [
            { procNpcClassId: "shrine_priest", count: [1, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "cm_wyrm_peak",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },

    // =========================================================================
    // WHISPERING WOOD
    // =========================================================================
    {
        locationId: "ww_treeline_hub",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [0, 2] },
            { procNpcClassId: "hunter", count: [1, 3] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "tavern_server", count: [0, 1] },
            { procNpcClassId: "town_guard", count: [0, 1] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
        ],
        serviceNpcIds: ["svc_ww_questboard"],
        childNpcCount: [1, 3],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ww_market_square",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [0, 2] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ww_tavern",
        interactableNpcCounts: [
            { procNpcClassId: "tavern_server", count: [0, 2] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
            { procNpcClassId: "town_guard", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ww_guard_post",
        interactableNpcCounts: [
            { procNpcClassId: "town_guard", count: [1, 2] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ww_forest",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [1, 3] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ww_shrine",
        interactableNpcCounts: [
            { procNpcClassId: "shrine_priest", count: [1, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ww_heartwood_grove",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ww_back_alleys",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [1, 2],
        refreshIntervalGameDays: 3,
    },

    // =========================================================================
    // MOUNTAIN MONASTERY
    // =========================================================================
    {
        locationId: "mm_monastery_gate",
        interactableNpcCounts: [
            { procNpcClassId: "shrine_priest", count: [1, 3] },
            { procNpcClassId: "town_guard", count: [1, 2] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
        ],
        serviceNpcIds: [
            "svc_mm_pilgrim_supplies",
            "svc_mm_inn",
            "svc_mm_questboard",
            "svc_mm_fasttravel",
            "svc_mm_bountyoffice",
        ],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "mm_market_square",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [0, 2] },
            { procNpcClassId: "shrine_priest", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "mm_tavern",
        interactableNpcCounts: [
            { procNpcClassId: "tavern_server", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "mm_guard_post",
        interactableNpcCounts: [
            { procNpcClassId: "town_guard", count: [1, 3] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "mm_fields",
        interactableNpcCounts: [
            { procNpcClassId: "farm_worker", count: [0, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "mm_mine",
        interactableNpcCounts: [
            { procNpcClassId: "miner", count: [0, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "mm_forest",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [0, 2] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "mm_shrine",
        interactableNpcCounts: [
            { procNpcClassId: "shrine_priest", count: [1, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },

    // =========================================================================
    // AURIC COURT
    // =========================================================================
    {
        locationId: "ac_auric_court",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [2, 4] },
            { procNpcClassId: "tavern_server", count: [1, 2] },
            { procNpcClassId: "town_guard", count: [2, 4] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "shrine_priest", count: [1, 2] },
            { procNpcClassId: "traveling_performer", count: [1, 2] },
            { procNpcClassId: "adventurer", count: [1, 3] },
            { procNpcClassId: "farm_worker", count: [0, 1] },
            { procNpcClassId: "miner", count: [0, 1] },
            { procNpcClassId: "fisherman", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
        ],
        serviceNpcIds: [
            "svc_ac_royal_outfitter",
            "svc_ac_grand_inn",
            "svc_ac_questboard",
            "svc_ac_bank",
            "svc_ac_fasttravel",
            "svc_ac_bountyoffice",
        ],
        childNpcCount: [1, 4],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ac_market_square",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [2, 4] },
            { procNpcClassId: "traveling_performer", count: [1, 2] },
            { procNpcClassId: "adventurer", count: [0, 1] },
            { procNpcClassId: "farm_worker", count: [0, 1] },
            { procNpcClassId: "herbalist", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ac_tavern",
        interactableNpcCounts: [
            { procNpcClassId: "tavern_server", count: [1, 3] },
            { procNpcClassId: "town_merchant", count: [0, 1] },
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "traveling_performer", count: [0, 1] },
            { procNpcClassId: "town_guard", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ac_guard_post",
        interactableNpcCounts: [
            { procNpcClassId: "town_guard", count: [2, 4] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ac_fields",
        interactableNpcCounts: [
            { procNpcClassId: "farm_worker", count: [0, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ac_mine",
        interactableNpcCounts: [
            { procNpcClassId: "miner", count: [0, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ac_docks",
        interactableNpcCounts: [
            { procNpcClassId: "fisherman", count: [0, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ac_forest",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [0, 2] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ac_shrine",
        interactableNpcCounts: [
            { procNpcClassId: "shrine_priest", count: [1, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ac_secret_archive",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },

    // =========================================================================
    // SUNKEN SANCTUM
    // =========================================================================
    {
        locationId: "ss_craters_edge",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [0, 2] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "hunter", count: [0, 1] },
        ],
        serviceNpcIds: ["svc_ss_questboard", "svc_ss_fasttravel"],
        childNpcCount: [0, 1],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_market_square",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [0, 2] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_tavern",
        interactableNpcCounts: [
            { procNpcClassId: "tavern_server", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_guard_post",
        interactableNpcCounts: [
            { procNpcClassId: "town_guard", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_fields",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_mine",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_docks",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_forest",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_shrine",
        interactableNpcCounts: [
            { procNpcClassId: "shrine_priest", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_void_rift",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_concubine_lair",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ss_back_alleys",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [1, 2],
        refreshIntervalGameDays: 3,
    },

    // =========================================================================
    // CELESTIAL THRESHOLD
    // =========================================================================
    {
        locationId: "ct_threshold_gate",
        interactableNpcCounts: [
            { procNpcClassId: "town_guard", count: [1, 3] },
            { procNpcClassId: "adventurer", count: [0, 2] },
            { procNpcClassId: "hunter", count: [0, 1] },
        ],
        serviceNpcIds: ["svc_ct_fasttravel", "svc_ct_questboard", "svc_ct_bank"],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_market_square",
        interactableNpcCounts: [
            { procNpcClassId: "town_merchant", count: [0, 2] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_tavern",
        interactableNpcCounts: [
            { procNpcClassId: "tavern_server", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_guard_post",
        interactableNpcCounts: [
            { procNpcClassId: "town_guard", count: [1, 2] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_fields",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_mine",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_docks",
        interactableNpcCounts: [],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_forest",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_shrine",
        interactableNpcCounts: [
            { procNpcClassId: "shrine_priest", count: [1, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_primordial_ache",
        interactableNpcCounts: [
            { procNpcClassId: "hunter", count: [0, 1] },
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
    {
        locationId: "ct_ascension_path",
        interactableNpcCounts: [
            { procNpcClassId: "adventurer", count: [0, 1] },
        ],
        serviceNpcIds: [],
        childNpcCount: [0, 0],
        refreshIntervalGameDays: 3,
    },
];