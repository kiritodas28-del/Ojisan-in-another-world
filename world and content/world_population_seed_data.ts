// ============================================================================
// OJISAN IN ANOTHER WORLD — WORLD POPULATION SEED DATA
// ServiceNpcDef, CompanionScheduleDef (all 9 remaining companions —
// Mira's is already established in requirements.md §12), NpcScheduleDef (all
// 10 procedural classes from §8.1), and LocationPopulationDef for the major
// hubs. Every locationId here is a real node from world_map_seed_data.ts —
// none invented for this file. Closes that line of the §2.2 backlog table.
// ============================================================================

import {
  ServiceNpcDef, ServiceType, CompanionScheduleDef, CompanionId,
  NpcScheduleDef, LocationPopulationDef, DayPhase,
} from "./schemas";

// ----------------------------------------------------------------------------
// SERVICE NPCS — one small roster per major regional hub. Celestial Threshold
// gets none (§5.11: one-off, hand-scripted, no economy needed there).
// ----------------------------------------------------------------------------

export const SERVICE_NPCS: ServiceNpcDef[] = [
  // Verdant Vale
  { id: "svc_vv_vendor", displayName: "Vale Village Vendor", locationId: "vv_village_square", serviceType: ServiceType.ItemVendor },
  { id: "svc_vv_bank", displayName: "Vale Village Bank", locationId: "vv_village_square", serviceType: ServiceType.Bank },
  { id: "svc_vv_questboard", displayName: "Vale Village Quest Board", locationId: "vv_village_square", serviceType: ServiceType.QuestBoard },
  { id: "svc_vv_fasttravel", displayName: "Vale Village Waystone", locationId: "vv_village_square", serviceType: ServiceType.FastTravel },
  { id: "svc_vv_bounty", displayName: "Vale Bounty Office", locationId: "vv_village_square", serviceType: ServiceType.BountyOffice },
  { id: "svc_vv_inn", displayName: "Vale Innkeeper", locationId: "vv_inn_tavern", serviceType: ServiceType.Innkeeper },

  // Aethermoor
  { id: "svc_am_vendor", displayName: "Bazaar Vendor", locationId: "am_merchant_bazaar", serviceType: ServiceType.ItemVendor },
  { id: "svc_am_bank", displayName: "Aethermoor Banking House", locationId: "am_merchant_bazaar", serviceType: ServiceType.Bank },
  { id: "svc_am_questboard", displayName: "Academy Quest Board", locationId: "am_academy_spire", serviceType: ServiceType.QuestBoard },
  { id: "svc_am_fasttravel", displayName: "Aethermoor Waystone", locationId: "am_merchant_bazaar", serviceType: ServiceType.FastTravel },
  { id: "svc_am_bounty", displayName: "Aethermoor Bounty Office", locationId: "am_north_gate", serviceType: ServiceType.BountyOffice },
  { id: "svc_am_inn", displayName: "Bazaar Lodgings", locationId: "am_merchant_bazaar", serviceType: ServiceType.Innkeeper },

  // Crimson March
  { id: "svc_cm_vendor", displayName: "Border Town Quartermaster", locationId: "cm_neutral_border_town", serviceType: ServiceType.ItemVendor },
  { id: "svc_cm_questboard", displayName: "Border Town Quest Board", locationId: "cm_neutral_border_town", serviceType: ServiceType.QuestBoard },
  { id: "svc_cm_fasttravel", displayName: "March Waystone", locationId: "cm_neutral_border_town", serviceType: ServiceType.FastTravel },
  { id: "svc_cm_bounty", displayName: "March Bounty Office", locationId: "cm_neutral_border_town", serviceType: ServiceType.BountyOffice },
  { id: "svc_cm_inn", displayName: "Border Town Innkeeper", locationId: "cm_neutral_border_town", serviceType: ServiceType.Innkeeper },

  // Whispering Wood — sparse, matching its wilderness theme; no town hub in the source map
  { id: "svc_ww_fasttravel", displayName: "Woodland Waystone", locationId: "ww_misty_treeline", serviceType: ServiceType.FastTravel },
  { id: "svc_ww_questboard", displayName: "Treeline Notice Post", locationId: "ww_misty_treeline", serviceType: ServiceType.QuestBoard }, // [NEW] — closes a real gap: this region's 5 repeatable quests had no board to be given from at all

  // Mountain Monastery
  { id: "svc_mm_questboard", displayName: "Cloister Petitioners' Board", locationId: "mm_great_cloister", serviceType: ServiceType.QuestBoard },
  { id: "svc_mm_fasttravel", displayName: "Monastery Waystone", locationId: "mm_outer_gate", serviceType: ServiceType.FastTravel },
  { id: "svc_mm_inn", displayName: "Penitents' Guest Lodging", locationId: "mm_penitents_dormitory", serviceType: ServiceType.Innkeeper },

  // Auric Court
  { id: "svc_ac_vendor", displayName: "High Bazaar Merchant", locationId: "ac_high_bazaar", serviceType: ServiceType.ItemVendor },
  { id: "svc_ac_bank", displayName: "Auric Court Treasury Bank", locationId: "ac_high_bazaar", serviceType: ServiceType.Bank },
  { id: "svc_ac_questboard", displayName: "Aristocrat Plaza Quest Board", locationId: "ac_aristocrat_plaza", serviceType: ServiceType.QuestBoard },
  { id: "svc_ac_fasttravel", displayName: "Golden Gates Waystone", locationId: "ac_golden_gates", serviceType: ServiceType.FastTravel },
  { id: "svc_ac_bounty", displayName: "Auric Court Bounty Office", locationId: "ac_golden_gates", serviceType: ServiceType.BountyOffice },
  { id: "svc_ac_inn", displayName: "Aristocrat Plaza Lodgings", locationId: "ac_aristocrat_plaza", serviceType: ServiceType.Innkeeper },

  // Sunken Sanctum — a single waystone at the entry, matching how dangerous everything past it is
  { id: "svc_ss_fasttravel", displayName: "Crater's Edge Waystone", locationId: "ss_surface_crater_entry", serviceType: ServiceType.FastTravel },
  { id: "svc_ss_questboard", displayName: "Crater's Edge Bounty Post", locationId: "ss_surface_crater_entry", serviceType: ServiceType.QuestBoard }, // [NEW] — closes a real gap: this region's 2 repeatable combat quests had no board to be given from at all
];

// ----------------------------------------------------------------------------
// COMPANION SCHEDULES — the 9 remaining companions. Mira's is already
// established in requirements.md §12 (all phases → vv_shrine_cottage).
// Night deliberately has no entry for any of them — asleep, absent, not
// swappable — matching the established rule and Mira's own precedent.
// ----------------------------------------------------------------------------

export const COMPANION_SCHEDULES: CompanionScheduleDef[] = [
  { companionId: CompanionId.Isolde, scheduleByPhase: {
    [DayPhase.Morning]: "am_lib_isolde_study",
    [DayPhase.Afternoon]: "am_grand_library",
    [DayPhase.Evening]: "am_archivist_halls",
  }},
  { companionId: CompanionId.Grael, scheduleByPhase: {
    [DayPhase.Morning]: "vv_smithy",
    [DayPhase.Afternoon]: "vv_smithy_hearth",
    [DayPhase.Evening]: "vv_village_square",
  }},
  { companionId: CompanionId.Valka, scheduleByPhase: {
    [DayPhase.Morning]: "cm_eastmarch_fortress",
    [DayPhase.Afternoon]: "cm_eastmarch_fortress",
    [DayPhase.Evening]: "cm_parley_ground",
  }},
  { companionId: CompanionId.Seira, scheduleByPhase: {
    [DayPhase.Morning]: "cm_westmarch_encampment",
    [DayPhase.Afternoon]: "cm_westmarch_encampment",
    [DayPhase.Evening]: "cm_parley_ground",
  }},
  { companionId: CompanionId.Sylvara, scheduleByPhase: {
    [DayPhase.Morning]: "ww_sylvara_clearing",
    [DayPhase.Afternoon]: "ww_sylvara_clearing",
    [DayPhase.Evening]: "ww_sylvara_clearing", // she is, narratively, bound to the clearing itself
  }},
  { companionId: CompanionId.Reva, scheduleByPhase: {
    [DayPhase.Morning]: "ac_reva_suite",
    [DayPhase.Afternoon]: "ac_aristocrat_plaza",
    [DayPhase.Evening]: "ac_banquet_hall",
  }},
  { companionId: CompanionId.Tasha, scheduleByPhase: {
    [DayPhase.Morning]: "am_merchant_bazaar",
    [DayPhase.Afternoon]: "am_merchant_bazaar",
    [DayPhase.Evening]: "am_central_fountain",
  }},
  { companionId: CompanionId.Sera, scheduleByPhase: {
    [DayPhase.Morning]: "mm_sera_sanctuary",
    [DayPhase.Afternoon]: "mm_great_cloister",
    [DayPhase.Evening]: "mm_bell_tower",
  }},
  { companionId: CompanionId.Lyra, scheduleByPhase: {
    [DayPhase.Morning]: "ac_lyra_wing",
    [DayPhase.Afternoon]: "ac_palace_grand_gate",
    [DayPhase.Evening]: "ac_banquet_hall",
  }},
];

// ----------------------------------------------------------------------------
// PROCEDURAL NPC CLASS SCHEDULES (§8.1's 10 classes) — real per-region
// variants. The previous pass could only produce one Verdant-Vale-anchored
// template per class because NpcScheduleDef had no region field at all —
// fixed in schemas.ts this pass, which is what actually unblocks this: each
// class now gets a distinct NpcScheduleDef entry (real, different locations,
// not a copy-pasted template) for every region it plausibly populates.
// ----------------------------------------------------------------------------

export const NPC_SCHEDULES: NpcScheduleDef[] = [
  // class_commoner
  { procNpcClassId: "class_commoner", region: Region.VerdantVale, scheduleByPhase: { [DayPhase.Morning]: "vv_wheat_farms", [DayPhase.Afternoon]: "vv_village_square", [DayPhase.Evening]: "vv_village_square" } },
  { procNpcClassId: "class_commoner", region: Region.Aethermoor, scheduleByPhase: { [DayPhase.Morning]: "am_merchant_bazaar", [DayPhase.Afternoon]: "am_merchant_bazaar", [DayPhase.Evening]: "am_central_fountain" } },
  { procNpcClassId: "class_commoner", region: Region.CrimsonMarch, scheduleByPhase: { [DayPhase.Morning]: "cm_neutral_border_town", [DayPhase.Afternoon]: "cm_neutral_border_town", [DayPhase.Evening]: "cm_parley_ground" } },

  // class_town_merchant
  { procNpcClassId: "class_town_merchant", region: Region.VerdantVale, scheduleByPhase: { [DayPhase.Morning]: "vv_village_square", [DayPhase.Afternoon]: "vv_village_square", [DayPhase.Evening]: "vv_inn_tavern" } },
  { procNpcClassId: "class_town_merchant", region: Region.Aethermoor, scheduleByPhase: { [DayPhase.Morning]: "am_merchant_bazaar", [DayPhase.Afternoon]: "am_merchant_bazaar", [DayPhase.Evening]: "am_merchant_bazaar" } },
  { procNpcClassId: "class_town_merchant", region: Region.AuricCourt, scheduleByPhase: { [DayPhase.Morning]: "ac_high_bazaar", [DayPhase.Afternoon]: "ac_high_bazaar", [DayPhase.Evening]: "ac_aristocrat_plaza" } },

  // class_city_guard — keeps a night watch in every region, unlike most other classes
  { procNpcClassId: "class_city_guard", region: Region.VerdantVale, scheduleByPhase: { [DayPhase.Morning]: "vv_village_square", [DayPhase.Afternoon]: "vv_south_highway", [DayPhase.Evening]: "vv_village_square", [DayPhase.Night]: "vv_village_square" } },
  { procNpcClassId: "class_city_guard", region: Region.CrimsonMarch, scheduleByPhase: { [DayPhase.Morning]: "cm_eastmarch_fortress", [DayPhase.Afternoon]: "cm_parley_ground", [DayPhase.Evening]: "cm_eastmarch_fortress", [DayPhase.Night]: "cm_eastmarch_fortress" } },
  { procNpcClassId: "class_city_guard", region: Region.AuricCourt, scheduleByPhase: { [DayPhase.Morning]: "ac_golden_gates", [DayPhase.Afternoon]: "ac_golden_gates", [DayPhase.Evening]: "ac_aristocrat_plaza", [DayPhase.Night]: "ac_golden_gates" } },

  // class_high_noble_lady
  { procNpcClassId: "class_high_noble_lady", region: Region.AuricCourt, scheduleByPhase: { [DayPhase.Morning]: "ac_aristocrat_plaza", [DayPhase.Afternoon]: "ac_high_bazaar", [DayPhase.Evening]: "ac_banquet_hall" } },
  { procNpcClassId: "class_high_noble_lady", region: Region.VerdantVale, scheduleByPhase: { [DayPhase.Morning]: "vv_shrine_cottage", [DayPhase.Afternoon]: "vv_village_square", [DayPhase.Evening]: "vv_inn_tavern" } }, // visiting gentry

  // class_bandit_outlaw — only active evening/night, matching outlaw flavor
  { procNpcClassId: "class_bandit_outlaw", region: Region.VerdantVale, scheduleByPhase: { [DayPhase.Evening]: "vv_south_highway", [DayPhase.Night]: "vv_south_highway" } },
  { procNpcClassId: "class_bandit_outlaw", region: Region.CrimsonMarch, scheduleByPhase: { [DayPhase.Evening]: "cm_east_trench_lines", [DayPhase.Night]: "cm_west_barricades" } },

  // class_temple_priestess
  { procNpcClassId: "class_temple_priestess", region: Region.MountainMonastery, scheduleByPhase: { [DayPhase.Morning]: "mm_great_cloister", [DayPhase.Afternoon]: "mm_great_cloister", [DayPhase.Evening]: "mm_bell_tower" } },
  { procNpcClassId: "class_temple_priestess", region: Region.VerdantVale, scheduleByPhase: { [DayPhase.Morning]: "vv_shrine_cottage", [DayPhase.Afternoon]: "vv_shrine_cottage", [DayPhase.Evening]: "vv_shrine_cottage" } },

  // class_academy_scholar — Aethermoor-specific, no plausible presence elsewhere
  { procNpcClassId: "class_academy_scholar", region: Region.Aethermoor, scheduleByPhase: { [DayPhase.Morning]: "am_lib_reading_hall", [DayPhase.Afternoon]: "am_lib_reading_hall", [DayPhase.Evening]: "am_academy_spire" } },

  // class_tavern_courtesan
  { procNpcClassId: "class_tavern_courtesan", region: Region.VerdantVale, scheduleByPhase: { [DayPhase.Afternoon]: "vv_inn_common_tavern", [DayPhase.Evening]: "vv_inn_common_tavern", [DayPhase.Night]: "vv_inn_common_tavern" } },
  { procNpcClassId: "class_tavern_courtesan", region: Region.AuricCourt, scheduleByPhase: { [DayPhase.Evening]: "ac_banquet_hall", [DayPhase.Night]: "ac_ballroom" } },

  // class_farm_girl
  { procNpcClassId: "class_farm_girl", region: Region.VerdantVale, scheduleByPhase: { [DayPhase.Morning]: "vv_wheat_farms", [DayPhase.Afternoon]: "vv_wheat_farms", [DayPhase.Evening]: "vv_village_square" } },
  { procNpcClassId: "class_farm_girl", region: Region.CrimsonMarch, scheduleByPhase: { [DayPhase.Morning]: "cm_neutral_border_town", [DayPhase.Afternoon]: "cm_neutral_border_town", [DayPhase.Evening]: "cm_neutral_border_town" } },

  // class_adventurer_explorer
  { procNpcClassId: "class_adventurer_explorer", region: Region.VerdantVale, scheduleByPhase: { [DayPhase.Morning]: "vv_north_meadows", [DayPhase.Afternoon]: "vv_south_highway", [DayPhase.Evening]: "vv_inn_tavern" } },
  { procNpcClassId: "class_adventurer_explorer", region: Region.SunkenSanctum, scheduleByPhase: { [DayPhase.Morning]: "ss_surface_crater_entry", [DayPhase.Afternoon]: "ss_surface_crater_entry", [DayPhase.Evening]: "ss_surface_crater_entry" } },
];

// ----------------------------------------------------------------------------
// LOCATION POPULATION — major hubs, expanded to match every location the
// schedules above now actually place NPCs at. Dungeon/encounter-zone
// locations still have no interactable population (EncounterDef territory,
// not Universal-Interaction-Menu territory) — vv_south_highway and
// cm_east_trench_lines/cm_west_barricades are the deliberate exception,
// since class_bandit_outlaw is itself an interactable-but-hostile class
// per §8.1, not a random encounter roll.
// ----------------------------------------------------------------------------

export const LOCATION_POPULATIONS: LocationPopulationDef[] = [
  { locationId: "vv_village_square", interactableNpcCounts: [
    { procNpcClassId: "class_commoner", count: [3, 6] },
    { procNpcClassId: "class_town_merchant", count: [1, 2] },
    { procNpcClassId: "class_city_guard", count: [1, 2] },
  ], serviceNpcIds: ["svc_vv_vendor", "svc_vv_bank", "svc_vv_questboard", "svc_vv_fasttravel", "svc_vv_bounty"], childNpcCount: [0, 3], refreshIntervalGameDays: 3 },
  { locationId: "vv_inn_common_tavern", interactableNpcCounts: [
    { procNpcClassId: "class_tavern_courtesan", count: [1, 3] },
    { procNpcClassId: "class_commoner", count: [1, 3] },
  ], serviceNpcIds: ["svc_vv_inn"], childNpcCount: [0, 0], refreshIntervalGameDays: 2 },
  { locationId: "vv_south_highway", interactableNpcCounts: [
    { procNpcClassId: "class_bandit_outlaw", count: [1, 3] },
    { procNpcClassId: "class_adventurer_explorer", count: [0, 1] },
  ], serviceNpcIds: [], childNpcCount: [0, 0], refreshIntervalGameDays: 2 },
  { locationId: "am_merchant_bazaar", interactableNpcCounts: [
    { procNpcClassId: "class_town_merchant", count: [2, 4] },
    { procNpcClassId: "class_commoner", count: [2, 5] },
  ], serviceNpcIds: ["svc_am_vendor", "svc_am_bank", "svc_am_fasttravel", "svc_am_inn"], childNpcCount: [0, 2], refreshIntervalGameDays: 3 },
  { locationId: "am_lib_reading_hall", interactableNpcCounts: [
    { procNpcClassId: "class_academy_scholar", count: [2, 5] },
  ], serviceNpcIds: [], childNpcCount: [0, 0], refreshIntervalGameDays: 5 },
  { locationId: "cm_neutral_border_town", interactableNpcCounts: [
    { procNpcClassId: "class_commoner", count: [2, 4] },
    { procNpcClassId: "class_city_guard", count: [2, 3] },
    { procNpcClassId: "class_farm_girl", count: [1, 3] },
  ], serviceNpcIds: ["svc_cm_vendor", "svc_cm_questboard", "svc_cm_fasttravel", "svc_cm_bounty", "svc_cm_inn"], childNpcCount: [0, 2], refreshIntervalGameDays: 3 },
  { locationId: "cm_parley_ground", interactableNpcCounts: [
    { procNpcClassId: "class_commoner", count: [1, 2] },
    { procNpcClassId: "class_city_guard", count: [1, 2] },
  ], serviceNpcIds: [], childNpcCount: [0, 0], refreshIntervalGameDays: 3 },
  { locationId: "cm_east_trench_lines", interactableNpcCounts: [
    { procNpcClassId: "class_bandit_outlaw", count: [1, 2] },
  ], serviceNpcIds: [], childNpcCount: [0, 0], refreshIntervalGameDays: 2 },
  { locationId: "ac_golden_gates", interactableNpcCounts: [
    { procNpcClassId: "class_city_guard", count: [2, 3] },
  ], serviceNpcIds: ["svc_ac_fasttravel", "svc_ac_bounty"], childNpcCount: [0, 0], refreshIntervalGameDays: 3 },
  { locationId: "ac_high_bazaar", interactableNpcCounts: [
    { procNpcClassId: "class_town_merchant", count: [2, 5] },
    { procNpcClassId: "class_high_noble_lady", count: [1, 3] },
  ], serviceNpcIds: ["svc_ac_vendor", "svc_ac_bank"], childNpcCount: [0, 1], refreshIntervalGameDays: 3 },
  { locationId: "ac_aristocrat_plaza", interactableNpcCounts: [
    { procNpcClassId: "class_high_noble_lady", count: [2, 4] },
    { procNpcClassId: "class_city_guard", count: [0, 1] },
  ], serviceNpcIds: ["svc_ac_questboard", "svc_ac_inn"], childNpcCount: [0, 1], refreshIntervalGameDays: 4 },
  { locationId: "ac_banquet_hall", interactableNpcCounts: [
    { procNpcClassId: "class_high_noble_lady", count: [1, 3] },
    { procNpcClassId: "class_tavern_courtesan", count: [1, 2] },
  ], serviceNpcIds: [], childNpcCount: [0, 0], refreshIntervalGameDays: 3 },
  { locationId: "mm_great_cloister", interactableNpcCounts: [
    { procNpcClassId: "class_temple_priestess", count: [2, 4] },
  ], serviceNpcIds: ["svc_mm_questboard"], childNpcCount: [0, 0], refreshIntervalGameDays: 5 },
  { locationId: "ss_surface_crater_entry", interactableNpcCounts: [
    { procNpcClassId: "class_adventurer_explorer", count: [1, 3] },
  ], serviceNpcIds: ["svc_ss_fasttravel", "svc_ss_questboard"], childNpcCount: [0, 0], refreshIntervalGameDays: 4 },
];
