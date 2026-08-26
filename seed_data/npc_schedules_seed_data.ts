// ============================================================================
// NPC SCHEDULES SEED DATA — ALL REGIONS, ALL CLASSES
// ============================================================================
import type { NpcScheduleDef } from "../schemas/schemas";
import { DayPhase, Region } from "../schemas/schemas";

// Helper to create schedule entries with consistent location naming.
function schedule(
    procNpcClassId: string,
    region: Region,
    prefix: string,
    phaseMap: Partial<Record<DayPhase, string>>
): NpcScheduleDef {
    const scheduleByPhase: Partial<Record<DayPhase, string>> = {};
    for (const [phase, loc] of Object.entries(phaseMap)) {
        scheduleByPhase[phase as DayPhase] = loc;
    }
    return { procNpcClassId, region, scheduleByPhase };
}

export const NPC_SCHEDULES: NpcScheduleDef[] = [
    // =========================================================================
    // TOWN MERCHANT
    // =========================================================================
    schedule("town_merchant", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_market_square", [DayPhase.Afternoon]: "vv_market_square", [DayPhase.Evening]: "vv_tavern" }),
    schedule("town_merchant", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_market_square", [DayPhase.Afternoon]: "ae_market_square", [DayPhase.Evening]: "ae_tavern" }),
    schedule("town_merchant", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_market_square", [DayPhase.Afternoon]: "cm_market_square", [DayPhase.Evening]: "cm_tavern" }),
    schedule("town_merchant", Region.WhisperingWood, "ww", { [DayPhase.Morning]: "ww_market_square", [DayPhase.Afternoon]: "ww_market_square", [DayPhase.Evening]: "ww_tavern" }),
    schedule("town_merchant", Region.MountainMonastery, "mm", { [DayPhase.Morning]: "mm_market_square", [DayPhase.Afternoon]: "mm_market_square", [DayPhase.Evening]: "mm_tavern" }),
    schedule("town_merchant", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_market_square", [DayPhase.Afternoon]: "ac_market_square", [DayPhase.Evening]: "ac_tavern" }),
    schedule("town_merchant", Region.SunkenSanctum, "ss", { [DayPhase.Morning]: "ss_market_square", [DayPhase.Afternoon]: "ss_market_square", [DayPhase.Evening]: "ss_tavern" }),
    schedule("town_merchant", Region.CelestialThreshold, "ct", { [DayPhase.Morning]: "ct_market_square", [DayPhase.Afternoon]: "ct_market_square", [DayPhase.Evening]: "ct_tavern" }),

    // =========================================================================
    // FARM WORKER
    // =========================================================================
    schedule("farm_worker", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_fields", [DayPhase.Afternoon]: "vv_fields", [DayPhase.Evening]: "vv_tavern" }),
    schedule("farm_worker", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_fields", [DayPhase.Afternoon]: "ae_fields", [DayPhase.Evening]: "ae_tavern" }),
    schedule("farm_worker", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_fields", [DayPhase.Afternoon]: "cm_fields", [DayPhase.Evening]: "cm_tavern" }),
    schedule("farm_worker", Region.MountainMonastery, "mm", { [DayPhase.Morning]: "mm_fields", [DayPhase.Afternoon]: "mm_fields", [DayPhase.Evening]: "mm_tavern" }),
    schedule("farm_worker", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_fields", [DayPhase.Afternoon]: "ac_fields", [DayPhase.Evening]: "ac_tavern" }),

    // =========================================================================
    // TAVERN SERVER
    // =========================================================================
    schedule("tavern_server", Region.VerdantVale, "vv", { [DayPhase.Afternoon]: "vv_tavern", [DayPhase.Evening]: "vv_tavern", [DayPhase.Night]: "vv_tavern" }),
    schedule("tavern_server", Region.Aethermoor, "ae", { [DayPhase.Afternoon]: "ae_tavern", [DayPhase.Evening]: "ae_tavern", [DayPhase.Night]: "ae_tavern" }),
    schedule("tavern_server", Region.CrimsonMarch, "cm", { [DayPhase.Afternoon]: "cm_tavern", [DayPhase.Evening]: "cm_tavern", [DayPhase.Night]: "cm_tavern" }),
    schedule("tavern_server", Region.WhisperingWood, "ww", { [DayPhase.Afternoon]: "ww_tavern", [DayPhase.Evening]: "ww_tavern", [DayPhase.Night]: "ww_tavern" }),
    schedule("tavern_server", Region.MountainMonastery, "mm", { [DayPhase.Afternoon]: "mm_tavern", [DayPhase.Evening]: "mm_tavern" }),
    schedule("tavern_server", Region.AuricCourt, "ac", { [DayPhase.Afternoon]: "ac_tavern", [DayPhase.Evening]: "ac_tavern", [DayPhase.Night]: "ac_tavern" }),
    schedule("tavern_server", Region.SunkenSanctum, "ss", { [DayPhase.Afternoon]: "ss_tavern", [DayPhase.Evening]: "ss_tavern" }),
    schedule("tavern_server", Region.CelestialThreshold, "ct", { [DayPhase.Afternoon]: "ct_tavern", [DayPhase.Evening]: "ct_tavern" }),

    // =========================================================================
    // TOWN GUARD
    // =========================================================================
    schedule("town_guard", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_guard_post", [DayPhase.Afternoon]: "vv_guard_post", [DayPhase.Evening]: "vv_guard_post", [DayPhase.Night]: "vv_guard_post" }),
    schedule("town_guard", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_guard_post", [DayPhase.Afternoon]: "ae_guard_post", [DayPhase.Evening]: "ae_guard_post", [DayPhase.Night]: "ae_guard_post" }),
    schedule("town_guard", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_guard_post", [DayPhase.Afternoon]: "cm_guard_post", [DayPhase.Evening]: "cm_guard_post", [DayPhase.Night]: "cm_guard_post" }),
    schedule("town_guard", Region.WhisperingWood, "ww", { [DayPhase.Morning]: "ww_guard_post", [DayPhase.Afternoon]: "ww_guard_post", [DayPhase.Evening]: "ww_guard_post" }),
    schedule("town_guard", Region.MountainMonastery, "mm", { [DayPhase.Morning]: "mm_guard_post", [DayPhase.Afternoon]: "mm_guard_post", [DayPhase.Evening]: "mm_guard_post" }),
    schedule("town_guard", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_guard_post", [DayPhase.Afternoon]: "ac_guard_post", [DayPhase.Evening]: "ac_guard_post", [DayPhase.Night]: "ac_guard_post" }),
    schedule("town_guard", Region.SunkenSanctum, "ss", { [DayPhase.Morning]: "ss_guard_post", [DayPhase.Afternoon]: "ss_guard_post", [DayPhase.Evening]: "ss_guard_post" }),
    schedule("town_guard", Region.CelestialThreshold, "ct", { [DayPhase.Morning]: "ct_guard_post", [DayPhase.Afternoon]: "ct_guard_post", [DayPhase.Evening]: "ct_guard_post" }),

    // =========================================================================
    // HERBALIST
    // =========================================================================
    schedule("herbalist", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_herbalist_shop", [DayPhase.Afternoon]: "vv_herbalist_shop", [DayPhase.Evening]: "vv_herbalist_shop" }),
    schedule("herbalist", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_herbalist_shop", [DayPhase.Afternoon]: "ae_herbalist_shop", [DayPhase.Evening]: "ae_herbalist_shop" }),
    schedule("herbalist", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_market_square", [DayPhase.Afternoon]: "cm_market_square", [DayPhase.Evening]: "cm_tavern" }),
    schedule("herbalist", Region.WhisperingWood, "ww", { [DayPhase.Morning]: "ww_treeline_hub", [DayPhase.Afternoon]: "ww_treeline_hub", [DayPhase.Evening]: "ww_treeline_hub" }),
    schedule("herbalist", Region.MountainMonastery, "mm", { [DayPhase.Morning]: "mm_monastery_gate", [DayPhase.Afternoon]: "mm_monastery_gate", [DayPhase.Evening]: "mm_monastery_gate" }),
    schedule("herbalist", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_market_square", [DayPhase.Afternoon]: "ac_market_square", [DayPhase.Evening]: "ac_tavern" }),
    schedule("herbalist", Region.SunkenSanctum, "ss", { [DayPhase.Morning]: "ss_craters_edge", [DayPhase.Afternoon]: "ss_craters_edge", [DayPhase.Evening]: "ss_craters_edge" }),
    schedule("herbalist", Region.CelestialThreshold, "ct", { [DayPhase.Morning]: "ct_market_square", [DayPhase.Afternoon]: "ct_market_square", [DayPhase.Evening]: "ct_tavern" }),

    // =========================================================================
    // MINER
    // =========================================================================
    schedule("miner", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_mine", [DayPhase.Afternoon]: "vv_mine", [DayPhase.Evening]: "vv_tavern" }),
    schedule("miner", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_mine", [DayPhase.Afternoon]: "ae_mine", [DayPhase.Evening]: "ae_tavern" }),
    schedule("miner", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_mine", [DayPhase.Afternoon]: "cm_mine", [DayPhase.Evening]: "cm_tavern" }),
    schedule("miner", Region.MountainMonastery, "mm", { [DayPhase.Morning]: "mm_mine", [DayPhase.Afternoon]: "mm_mine", [DayPhase.Evening]: "mm_tavern" }),
    schedule("miner", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_mine", [DayPhase.Afternoon]: "ac_mine", [DayPhase.Evening]: "ac_tavern" }),

    // =========================================================================
    // FISHERMAN
    // =========================================================================
    schedule("fisherman", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_docks", [DayPhase.Afternoon]: "vv_docks", [DayPhase.Evening]: "vv_tavern" }),
    schedule("fisherman", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_docks", [DayPhase.Afternoon]: "ae_docks", [DayPhase.Evening]: "ae_tavern" }),
    schedule("fisherman", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_docks", [DayPhase.Afternoon]: "cm_docks", [DayPhase.Evening]: "cm_tavern" }),
    schedule("fisherman", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_docks", [DayPhase.Afternoon]: "ac_docks", [DayPhase.Evening]: "ac_tavern" }),

    // =========================================================================
    // HUNTER / TRAPPER
    // =========================================================================
    schedule("hunter", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_forest", [DayPhase.Afternoon]: "vv_forest", [DayPhase.Evening]: "vv_tavern" }),
    schedule("hunter", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_forest", [DayPhase.Afternoon]: "ae_forest", [DayPhase.Evening]: "ae_tavern" }),
    schedule("hunter", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_forest", [DayPhase.Afternoon]: "cm_forest", [DayPhase.Evening]: "cm_tavern" }),
    schedule("hunter", Region.WhisperingWood, "ww", { [DayPhase.Morning]: "ww_forest", [DayPhase.Afternoon]: "ww_forest", [DayPhase.Evening]: "ww_tavern" }),
    schedule("hunter", Region.MountainMonastery, "mm", { [DayPhase.Morning]: "mm_forest", [DayPhase.Afternoon]: "mm_forest", [DayPhase.Evening]: "mm_tavern" }),
    schedule("hunter", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_forest", [DayPhase.Afternoon]: "ac_forest", [DayPhase.Evening]: "ac_tavern" }),
    schedule("hunter", Region.SunkenSanctum, "ss", { [DayPhase.Morning]: "ss_forest", [DayPhase.Afternoon]: "ss_forest", [DayPhase.Evening]: "ss_tavern" }),
    schedule("hunter", Region.CelestialThreshold, "ct", { [DayPhase.Morning]: "ct_forest", [DayPhase.Afternoon]: "ct_forest", [DayPhase.Evening]: "ct_tavern" }),

    // =========================================================================
    // PRIEST / SHRINE MAIDEN
    // =========================================================================
    schedule("shrine_priest", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_shrine", [DayPhase.Afternoon]: "vv_shrine", [DayPhase.Evening]: "vv_shrine" }),
    schedule("shrine_priest", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_shrine", [DayPhase.Afternoon]: "ae_shrine", [DayPhase.Evening]: "ae_shrine" }),
    schedule("shrine_priest", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_shrine", [DayPhase.Afternoon]: "cm_shrine", [DayPhase.Evening]: "cm_shrine" }),
    schedule("shrine_priest", Region.WhisperingWood, "ww", { [DayPhase.Morning]: "ww_shrine", [DayPhase.Afternoon]: "ww_shrine", [DayPhase.Evening]: "ww_shrine" }),
    schedule("shrine_priest", Region.MountainMonastery, "mm", { [DayPhase.Morning]: "mm_shrine", [DayPhase.Afternoon]: "mm_shrine", [DayPhase.Evening]: "mm_shrine" }),
    schedule("shrine_priest", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_shrine", [DayPhase.Afternoon]: "ac_shrine", [DayPhase.Evening]: "ac_shrine" }),
    schedule("shrine_priest", Region.SunkenSanctum, "ss", { [DayPhase.Morning]: "ss_shrine", [DayPhase.Afternoon]: "ss_shrine", [DayPhase.Evening]: "ss_shrine" }),
    schedule("shrine_priest", Region.CelestialThreshold, "ct", { [DayPhase.Morning]: "ct_shrine", [DayPhase.Afternoon]: "ct_shrine", [DayPhase.Evening]: "ct_shrine" }),

    // =========================================================================
    // TRAVELING PERFORMER
    // =========================================================================
    schedule("traveling_performer", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_market_square", [DayPhase.Afternoon]: "vv_market_square", [DayPhase.Evening]: "vv_tavern", [DayPhase.Night]: "vv_tavern" }),
    schedule("traveling_performer", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_market_square", [DayPhase.Afternoon]: "ae_market_square", [DayPhase.Evening]: "ae_tavern", [DayPhase.Night]: "ae_tavern" }),
    schedule("traveling_performer", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_market_square", [DayPhase.Afternoon]: "cm_market_square", [DayPhase.Evening]: "cm_tavern", [DayPhase.Night]: "cm_tavern" }),
    schedule("traveling_performer", Region.WhisperingWood, "ww", { [DayPhase.Morning]: "ww_market_square", [DayPhase.Afternoon]: "ww_market_square", [DayPhase.Evening]: "ww_tavern", [DayPhase.Night]: "ww_tavern" }),
    schedule("traveling_performer", Region.MountainMonastery, "mm", { [DayPhase.Morning]: "mm_market_square", [DayPhase.Afternoon]: "mm_market_square", [DayPhase.Evening]: "mm_tavern" }),
    schedule("traveling_performer", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_market_square", [DayPhase.Afternoon]: "ac_market_square", [DayPhase.Evening]: "ac_tavern", [DayPhase.Night]: "ac_tavern" }),
    schedule("traveling_performer", Region.SunkenSanctum, "ss", { [DayPhase.Morning]: "ss_market_square", [DayPhase.Afternoon]: "ss_market_square", [DayPhase.Evening]: "ss_tavern" }),
    schedule("traveling_performer", Region.CelestialThreshold, "ct", { [DayPhase.Morning]: "ct_market_square", [DayPhase.Afternoon]: "ct_market_square", [DayPhase.Evening]: "ct_tavern" }),

    // =========================================================================
    // ADVENTURER
    // =========================================================================
    schedule("adventurer", Region.VerdantVale, "vv", { [DayPhase.Morning]: "vv_forest", [DayPhase.Afternoon]: "vv_forest", [DayPhase.Evening]: "vv_tavern", [DayPhase.Night]: "vv_tavern" }),
    schedule("adventurer", Region.Aethermoor, "ae", { [DayPhase.Morning]: "ae_forest", [DayPhase.Afternoon]: "ae_forest", [DayPhase.Evening]: "ae_tavern", [DayPhase.Night]: "ae_tavern" }),
    schedule("adventurer", Region.CrimsonMarch, "cm", { [DayPhase.Morning]: "cm_forest", [DayPhase.Afternoon]: "cm_forest", [DayPhase.Evening]: "cm_tavern", [DayPhase.Night]: "cm_tavern" }),
    schedule("adventurer", Region.WhisperingWood, "ww", { [DayPhase.Morning]: "ww_forest", [DayPhase.Afternoon]: "ww_forest", [DayPhase.Evening]: "ww_tavern", [DayPhase.Night]: "ww_tavern" }),
    schedule("adventurer", Region.MountainMonastery, "mm", { [DayPhase.Morning]: "mm_forest", [DayPhase.Afternoon]: "mm_forest", [DayPhase.Evening]: "mm_tavern" }),
    schedule("adventurer", Region.AuricCourt, "ac", { [DayPhase.Morning]: "ac_forest", [DayPhase.Afternoon]: "ac_forest", [DayPhase.Evening]: "ac_tavern", [DayPhase.Night]: "ac_tavern" }),
    schedule("adventurer", Region.SunkenSanctum, "ss", { [DayPhase.Morning]: "ss_forest", [DayPhase.Afternoon]: "ss_forest", [DayPhase.Evening]: "ss_tavern", [DayPhase.Night]: "ss_tavern" }),
    schedule("adventurer", Region.CelestialThreshold, "ct", { [DayPhase.Morning]: "ct_forest", [DayPhase.Afternoon]: "ct_forest", [DayPhase.Evening]: "ct_tavern", [DayPhase.Night]: "ct_tavern" }),
];