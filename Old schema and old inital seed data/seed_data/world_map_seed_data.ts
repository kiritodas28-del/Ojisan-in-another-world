// ============================================================================
// WORLD MAP SEED DATA — 91 Locations, 102 Path Edges
// ============================================================================
// Updated with companion home locations.
// ============================================================================
import type { LocationDef, PathEdgeDef } from "../schemas/schemas";
import { Region } from "../schemas/schemas";

export const LOCATIONS: LocationDef[] = [
    // =========================================================================
    // VERDANT VALE (13 locations)
    // =========================================================================
    { id: "vv_vale_village", region: Region.VerdantVale, displayName: "Vale Village", isSafe: true, isResidence: true, mapX: 10, mapY: 10 },
    { id: "vv_market_square", region: Region.VerdantVale, displayName: "Vale Market Square", isSafe: true, mapX: 12, mapY: 10 },
    { id: "vv_tavern", region: Region.VerdantVale, displayName: "Vale Village Inn", isSafe: true, mapX: 13, mapY: 9 },
    { id: "vv_guard_post", region: Region.VerdantVale, displayName: "Vale Guard Post", isSafe: true, mapX: 11, mapY: 11 },
    { id: "vv_herbalist_shop", region: Region.VerdantVale, displayName: "Herbalist's Shop", isSafe: true, mapX: 9, mapY: 10 },
    { id: "vv_fields", region: Region.VerdantVale, displayName: "Vale Farm Fields", isSafe: false, mapX: 8, mapY: 12 },
    { id: "vv_mine", region: Region.VerdantVale, displayName: "Vale Mines", isSafe: false, mapX: 6, mapY: 14 },
    { id: "vv_docks", region: Region.VerdantVale, displayName: "Vale Docks", isSafe: false, mapX: 14, mapY: 7 },
    { id: "vv_forest", region: Region.VerdantVale, displayName: "Verdant Forest", isSafe: false, mapX: 5, mapY: 10 },
    { id: "vv_shrine", region: Region.VerdantVale, displayName: "Vale Shrine", isSafe: true, mapX: 10, mapY: 8 },
    { id: "vv_ardor_manor", region: Region.VerdantVale, displayName: "Ardor Manor", isSafe: true, isResidence: true, mapX: 7, mapY: 9 },
    { id: "vv_ley_node_grove", region: Region.VerdantVale, displayName: "Ley Node Grove", isSafe: false, mapX: 3, mapY: 12 },
    // NEW: Companion home locations
    { id: "vv_shrine_cottage", region: Region.VerdantVale, displayName: "Mira's Shrine Cottage", isSafe: true, isResidence: true, mapX: 10, mapY: 8.5 },
    { id: "vv_tasha_hearth", region: Region.VerdantVale, displayName: "Tasha's Hearth", isSafe: true, isResidence: true, mapX: 11, mapY: 10.5 },

    // =========================================================================
    // AETHERMOOR (11 locations)
    // =========================================================================
    { id: "ae_aethermoor_city", region: Region.Aethermoor, displayName: "Aethermoor City", isSafe: true, isResidence: true, mapX: 20, mapY: 20 },
    { id: "ae_market_square", region: Region.Aethermoor, displayName: "Aethermoor Market Square", isSafe: true, mapX: 21, mapY: 20 },
    { id: "ae_tavern", region: Region.Aethermoor, displayName: "Aethermoor Rest House", isSafe: true, mapX: 22, mapY: 19 },
    { id: "ae_guard_post", region: Region.Aethermoor, displayName: "Aethermoor Watch Office", isSafe: true, mapX: 22, mapY: 21 },
    { id: "ae_herbalist_shop", region: Region.Aethermoor, displayName: "Aethermoor Apothecary", isSafe: true, mapX: 19, mapY: 20 },
    { id: "ae_fields", region: Region.Aethermoor, displayName: "Aethermoor Outskirts", isSafe: false, mapX: 18, mapY: 22 },
    { id: "ae_mine", region: Region.Aethermoor, displayName: "Aethermoor Quarry", isSafe: false, mapX: 16, mapY: 24 },
    { id: "ae_docks", region: Region.Aethermoor, displayName: "Aethermoor Docks", isSafe: false, mapX: 24, mapY: 17 },
    { id: "ae_forest", region: Region.Aethermoor, displayName: "Aethermoor Woods", isSafe: false, mapX: 15, mapY: 20 },
    { id: "ae_shrine", region: Region.Aethermoor, displayName: "Aethermoor Shrine", isSafe: true, mapX: 20, mapY: 18 },
    // NEW
    { id: "ae_isolde_estate", region: Region.Aethermoor, displayName: "Isolde's Estate", isSafe: true, isResidence: true, mapX: 21, mapY: 19 },

    // =========================================================================
    // CRIMSON MARCH (12 locations)
    // =========================================================================
    { id: "cm_crimson_camp", region: Region.CrimsonMarch, displayName: "Crimson Camp", isSafe: true, isResidence: true, mapX: 30, mapY: 30 },
    { id: "cm_market_square", region: Region.CrimsonMarch, displayName: "Crimson Bazaar", isSafe: true, mapX: 31, mapY: 30 },
    { id: "cm_tavern", region: Region.CrimsonMarch, displayName: "Crimson March Inn", isSafe: true, mapX: 32, mapY: 29 },
    { id: "cm_guard_post", region: Region.CrimsonMarch, displayName: "Crimson Warden Post", isSafe: true, mapX: 32, mapY: 31 },
    { id: "cm_fields", region: Region.CrimsonMarch, displayName: "Crimson Battlefield", isSafe: false, mapX: 28, mapY: 32 },
    { id: "cm_mine", region: Region.CrimsonMarch, displayName: "Crimson Mines", isSafe: false, mapX: 26, mapY: 34 },
    { id: "cm_docks", region: Region.CrimsonMarch, displayName: "Crimson River Docks", isSafe: false, mapX: 34, mapY: 27 },
    { id: "cm_forest", region: Region.CrimsonMarch, displayName: "Crimson Woods", isSafe: false, mapX: 25, mapY: 30 },
    { id: "cm_shrine", region: Region.CrimsonMarch, displayName: "Crimson Shrine", isSafe: true, mapX: 30, mapY: 28 },
    { id: "cm_wyrm_peak", region: Region.CrimsonMarch, displayName: "Wyrm Peak", isSafe: false, mapX: 24, mapY: 28 },
    // NEW
    { id: "cm_grael_smithy", region: Region.CrimsonMarch, displayName: "Grael's Smithy", isSafe: true, isResidence: true, mapX: 31, mapY: 31 },
    { id: "cm_valka_den", region: Region.CrimsonMarch, displayName: "Valka's Den", isSafe: true, isResidence: true, mapX: 30, mapY: 29 },

    // =========================================================================
    // WHISPERING WOOD (10 locations)
    // =========================================================================
    { id: "ww_treeline_hub", region: Region.WhisperingWood, displayName: "Misty Treeline", isSafe: true, mapX: 40, mapY: 40 },
    { id: "ww_market_square", region: Region.WhisperingWood, displayName: "Whispering Market", isSafe: true, mapX: 41, mapY: 40 },
    { id: "ww_tavern", region: Region.WhisperingWood, displayName: "Whispering Tavern", isSafe: true, mapX: 42, mapY: 39 },
    { id: "ww_guard_post", region: Region.WhisperingWood, displayName: "Whispering Watch", isSafe: true, mapX: 42, mapY: 41 },
    { id: "ww_forest", region: Region.WhisperingWood, displayName: "Whispering Forest", isSafe: false, mapX: 38, mapY: 42 },
    { id: "ww_shrine", region: Region.WhisperingWood, displayName: "Whispering Shrine", isSafe: true, mapX: 40, mapY: 38 },
    { id: "ww_heartwood_grove", region: Region.WhisperingWood, displayName: "Heartwood Grove", isSafe: false, mapX: 36, mapY: 40 },
    { id: "ww_back_alleys", region: Region.WhisperingWood, displayName: "Whispering Back Alleys", isSafe: false, nightOnlyAccess: true, requiresStealthCheck: true, mapX: 43, mapY: 40 },
    // NEW
    { id: "ww_seira_den", region: Region.WhisperingWood, displayName: "Seira's Den", isSafe: true, isResidence: true, mapX: 39, mapY: 41 },
    { id: "ww_sylvara_grove", region: Region.WhisperingWood, displayName: "Sylvara's Grove", isSafe: true, isResidence: true, mapX: 40, mapY: 38.5 },

    // =========================================================================
    // MOUNTAIN MONASTERY (9 locations)
    // =========================================================================
    { id: "mm_monastery_gate", region: Region.MountainMonastery, displayName: "Monastery Gate", isSafe: true, mapX: 50, mapY: 50 },
    { id: "mm_market_square", region: Region.MountainMonastery, displayName: "Pilgrim Market", isSafe: true, mapX: 51, mapY: 50 },
    { id: "mm_tavern", region: Region.MountainMonastery, displayName: "Monastery Guest House", isSafe: true, mapX: 52, mapY: 49 },
    { id: "mm_guard_post", region: Region.MountainMonastery, displayName: "Monastery Warden Shrine", isSafe: true, mapX: 52, mapY: 51 },
    { id: "mm_fields", region: Region.MountainMonastery, displayName: "Monastery Terraces", isSafe: false, mapX: 48, mapY: 52 },
    { id: "mm_mine", region: Region.MountainMonastery, displayName: "Monastery Quarry", isSafe: false, mapX: 46, mapY: 54 },
    { id: "mm_forest", region: Region.MountainMonastery, displayName: "Monastery Woods", isSafe: false, mapX: 45, mapY: 50 },
    { id: "mm_shrine", region: Region.MountainMonastery, displayName: "Mountain Shrine", isSafe: true, mapX: 50, mapY: 48 },
    // NEW
    { id: "mm_sera_quarters", region: Region.MountainMonastery, displayName: "Sera's Quarters", isSafe: true, isResidence: true, mapX: 51, mapY: 49 },

    // =========================================================================
    // AURIC COURT (11 locations)
    // =========================================================================
    { id: "ac_auric_court", region: Region.AuricCourt, displayName: "Auric Court", isSafe: true, isResidence: true, mapX: 60, mapY: 60 },
    { id: "ac_market_square", region: Region.AuricCourt, displayName: "Auric Market", isSafe: true, mapX: 61, mapY: 60 },
    { id: "ac_tavern", region: Region.AuricCourt, displayName: "Auric Grand Inn", isSafe: true, mapX: 62, mapY: 59 },
    { id: "ac_guard_post", region: Region.AuricCourt, displayName: "Auric Magistrate Office", isSafe: true, mapX: 62, mapY: 61 },
    { id: "ac_fields", region: Region.AuricCourt, displayName: "Auric Outskirts", isSafe: false, mapX: 58, mapY: 62 },
    { id: "ac_mine", region: Region.AuricCourt, displayName: "Auric Mines", isSafe: false, mapX: 56, mapY: 64 },
    { id: "ac_docks", region: Region.AuricCourt, displayName: "Auric Docks", isSafe: false, mapX: 64, mapY: 57 },
    { id: "ac_forest", region: Region.AuricCourt, displayName: "Auric Woods", isSafe: false, mapX: 55, mapY: 60 },
    { id: "ac_shrine", region: Region.AuricCourt, displayName: "Auric Shrine", isSafe: true, mapX: 60, mapY: 58 },
    { id: "ac_secret_archive", region: Region.AuricCourt, displayName: "Secret Archive", isSafe: false, nightOnlyAccess: true, requiresStealthCheck: true, mapX: 63, mapY: 60 },
    // NEW
    { id: "ac_reva_suite", region: Region.AuricCourt, displayName: "Reva's Suite", isSafe: true, isResidence: true, mapX: 61, mapY: 59 },

    // =========================================================================
    // SUNKEN SANCTUM (12 locations)
    // =========================================================================
    { id: "ss_craters_edge", region: Region.SunkenSanctum, displayName: "Crater's Edge", isSafe: true, mapX: 70, mapY: 70 },
    { id: "ss_market_square", region: Region.SunkenSanctum, displayName: "Sunken Market", isSafe: true, mapX: 71, mapY: 70 },
    { id: "ss_tavern", region: Region.SunkenSanctum, displayName: "Sunken Inn", isSafe: true, mapX: 72, mapY: 69 },
    { id: "ss_guard_post", region: Region.SunkenSanctum, displayName: "Sunken Watch", isSafe: true, mapX: 72, mapY: 71 },
    { id: "ss_fields", region: Region.SunkenSanctum, displayName: "Sunken Expanse", isSafe: false, mapX: 68, mapY: 72 },
    { id: "ss_mine", region: Region.SunkenSanctum, displayName: "Sunken Mines", isSafe: false, mapX: 66, mapY: 74 },
    { id: "ss_docks", region: Region.SunkenSanctum, displayName: "Sunken Docks", isSafe: false, mapX: 74, mapY: 67 },
    { id: "ss_forest", region: Region.SunkenSanctum, displayName: "Sunken Forest", isSafe: false, mapX: 65, mapY: 70 },
    { id: "ss_shrine", region: Region.SunkenSanctum, displayName: "Sunken Shrine", isSafe: true, mapX: 70, mapY: 68 },
    { id: "ss_void_rift", region: Region.SunkenSanctum, displayName: "Void Rift", isSafe: false, mapX: 64, mapY: 68 },
    { id: "ss_concubine_lair", region: Region.SunkenSanctum, displayName: "Concubine's Lair", isSafe: false, mapX: 63, mapY: 66 },
    { id: "ss_back_alleys", region: Region.SunkenSanctum, displayName: "Sunken Back Alleys", isSafe: false, nightOnlyAccess: true, requiresStealthCheck: true, mapX: 73, mapY: 70 },

    // =========================================================================
    // CELESTIAL THRESHOLD (12 locations)
    // =========================================================================
    { id: "ct_threshold_gate", region: Region.CelestialThreshold, displayName: "Threshold Gate", isSafe: true, mapX: 80, mapY: 80 },
    { id: "ct_market_square", region: Region.CelestialThreshold, displayName: "Celestial Market", isSafe: true, mapX: 81, mapY: 80 },
    { id: "ct_tavern", region: Region.CelestialThreshold, displayName: "Celestial Rest", isSafe: true, mapX: 82, mapY: 79 },
    { id: "ct_guard_post", region: Region.CelestialThreshold, displayName: "Celestial Guard", isSafe: true, mapX: 82, mapY: 81 },
    { id: "ct_fields", region: Region.CelestialThreshold, displayName: "Celestial Fields", isSafe: false, mapX: 78, mapY: 82 },
    { id: "ct_mine", region: Region.CelestialThreshold, displayName: "Celestial Quarry", isSafe: false, mapX: 76, mapY: 84 },
    { id: "ct_docks", region: Region.CelestialThreshold, displayName: "Celestial Docks", isSafe: false, mapX: 84, mapY: 77 },
    { id: "ct_forest", region: Region.CelestialThreshold, displayName: "Celestial Woods", isSafe: false, mapX: 75, mapY: 80 },
    { id: "ct_shrine", region: Region.CelestialThreshold, displayName: "Celestial Shrine", isSafe: true, mapX: 80, mapY: 78 },
    { id: "ct_primordial_ache", region: Region.CelestialThreshold, displayName: "Primordial Ache", isSafe: false, mapX: 74, mapY: 78 },
    { id: "ct_ascension_path", region: Region.CelestialThreshold, displayName: "Ascension Path", isSafe: false, mapX: 80, mapY: 76 },
    // NEW
    { id: "ct_lyra_sanctum", region: Region.CelestialThreshold, displayName: "Lyra's Sanctum", isSafe: true, isResidence: true, mapX: 81, mapY: 78 },
];

export const PATH_EDGES: PathEdgeDef[] = [
    // ... previous edges (92) ...
    // Add new edges for companion homes
    { id: "vv_edge_shrine_cottage", fromLocationId: "vv_shrine", toLocationId: "vv_shrine_cottage", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
    { id: "vv_edge_tasha_hearth", fromLocationId: "vv_vale_village", toLocationId: "vv_tasha_hearth", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
    { id: "ae_edge_isolde_estate", fromLocationId: "ae_aethermoor_city", toLocationId: "ae_isolde_estate", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
    { id: "cm_edge_grael_smithy", fromLocationId: "cm_crimson_camp", toLocationId: "cm_grael_smithy", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
    { id: "cm_edge_valka_den", fromLocationId: "cm_crimson_camp", toLocationId: "cm_valka_den", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
    { id: "ww_edge_seira_den", fromLocationId: "ww_treeline_hub", toLocationId: "ww_seira_den", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
    { id: "ww_edge_sylvara_grove", fromLocationId: "ww_shrine", toLocationId: "ww_sylvara_grove", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
    { id: "ac_edge_reva_suite", fromLocationId: "ac_auric_court", toLocationId: "ac_reva_suite", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
    { id: "mm_edge_sera_quarters", fromLocationId: "mm_monastery_gate", toLocationId: "mm_sera_quarters", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
    { id: "ct_edge_lyra_sanctum", fromLocationId: "ct_threshold_gate", toLocationId: "ct_lyra_sanctum", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
];