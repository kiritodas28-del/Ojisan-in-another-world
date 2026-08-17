// ============================================================================
// OJISAN IN ANOTHER WORLD — WORLD MAP SEED DATA
// Transcribes §18's ASCII region maps into real LocationDef/PathEdgeDef rows,
// closing the "Map graph content volume" item in requirements.md §27.
//
// SOURCE-MATERIAL FINDING, surfaced by doing this transcription rather than
// skipped over: the world map below names an 8th region — MOUNTAIN MONASTERY,
// Sera's home (Act 4/5) — that was never in the Region enum and never had its
// own detailed regional map anywhere. Fixed properly: Region.MountainMonastery
// added to schemas.ts, a RegionMonsterProfile row added to §5.11, and a new
// §18.7 regional map authored below (clearly marked NEW, not a transcription)
// using Sera's already-established aesthetic (penitent veil, mourning
// vestment, night-sensitivity, protective-embrace kink) so it isn't invented
// from nothing.
//
// Two smaller reconciliations made along the way:
// - Mira's CompanionScheduleDef (requirements.md §12) originally listed four
//   separate named places for her four DayPhases (herb garden/village
//   clinic/shrine altar/cottage). The actual region map gives her exactly
//   ONE node, "Mira's Shrine Cottage." Reconciled: all four phases now point
//   to the same vv_shrine_cottage LocationDef — the four descriptions are
//   flavor for what she's doing there at different times, not four map nodes.
// - Act 1 Chapter 5's displayName said "The Blighted Treant of the Hill
//   Shrine" — the actual map names this location "Ley Node Grove." Treated
//   as the same place; the chapter name should read "...of the Ley Node
//   Grove" (noted here, not silently changed in this file).
//
// Ardor Manor's own interior (Master Bedroom, Companion Suites, Bathhouse,
// Alchemy Lab) deliberately has NO sub-map here, matching the source
// material — unlike the Inn/Smithy/Library, no interior layout was ever
// given for it, and its rooms are already handled through ManorState/
// assignedSuiteId elsewhere in this document, not through this graph.
// ============================================================================

import { LocationDef, PathEdgeDef, Region, RegionMonsterProfile, MonsterType } from "./schemas";

// ============================================================================
// THE ASCII SOURCE MAPS — verbatim from the GDD, plus one new addition
// ============================================================================

/*
╔══════════════════════════════════════════════════════════════════════╗
║                    ERANTHIS — COMPLETE WORLD MAP                     ║
║                                                                      ║
║   N                                                                  ║
║   ↑                    [CELESTIAL THRESHOLD]                         ║
║                            (Act 7 Finale)                            ║
║                                  ☆                                   ║
║                                  │                                   ║
║        [WHISPERING WOOD]─────────┴─────────[MOUNTAIN MONASTERY]      ║
║          (Act 4: Sylvara)                      (Act 4/5: Sera)       ║
║                │                                      │              ║
║                │      ┌──────────────────┐            │              ║
║                ├─────▶│ AETHERMOOR CITY  │◀───────────┤              ║
║                │      │ (Act 2: Isolde)  │            │              ║
║                │      └────────┬─────────┘            │              ║
║        [VERDANT VALE]          │             [THE CRIMSON MARCH]     ║
║        (Act 1: Mira/Grael)     │             (Act 3: Valka/Seira)    ║
║        [ARDOR MANOR ESTATE]    │                      │              ║
║                │               │                      │              ║
║                └───────────────┼──────────────────────┘              ║
║                                ▼                                     ║
║                        [THE AURIC COURT]                             ║
║                        (Act 5: Reva/Lyra)                            ║
║                                │                                     ║
║                        [SUNKEN SANCTUM]                              ║
║                        (Act 6: World Core)                           ║
╚══════════════════════════════════════════════════════════════════════╝

Interpretation note [PROPOSED]: the bottom "└───┼───┘" junction is read as
Verdant Vale and Crimson March both reaching Auric Court via Aethermoor as an
intermediate hop (the shortest-path graph already handles multi-hop routing,
§18.2) rather than as two additional direct edges — the ASCII is genuinely
ambiguous here, and this is the simpler, more defensible reading.

## 18.1 Region 1: The Verdant Vale & Buildings

╔══════════════════════════════════════════════════════╗
║              THE VERDANT VALE — REGION MAP            ║
╠══════════════════════════════════════════════════════╣
║  [NORTH MEADOWS] ───── [MIRA'S SHRINE COTTAGE]       ║
║        │                           │                 ║
║  [WHEAT FARMS] ─────── [VALE VILLAGE SQUARE]         ║
║        │                           │                 ║
║  [GRAEL'S SMITHY] ──── [VALE INN & TAVERN]           ║
║        │                           │                 ║
║  [ARDOR MANOR ESTATE] ─ [OLD BLIGHTED MILL]          ║
║        │                           │                 ║
║  [SOUTH HIGHWAY] ───── [LEY NODE GROVE (BOSS)]       ║
╚══════════════════════════════════════════════════════╝

╔══════════════════════════════════╗   ╔══════════════════════════════════╗
║        VALE VILLAGE INN          ║   ║         GRAEL'S SMITHY           ║
╠══════════════════════════════════╣   ╠══════════════════════════════════╣
║ [FRONT ENTRANCE] ➔ [COMMON TAVERN]║   ║ [OUTDOOR YARD] ➔ [MAIN HEARTH]   ║
║            │                     ║   ║                      │           ║
║   ┌────────┴────────┐            ║   ║              ┌───────┴──────┐    ║
║ [KITCHEN]       [BAR COUNTER]    ║   ║         [ANVIL AREA]   [STORAGE] ║
║            │                     ║   ║                      │           ║
║       [UPSTAIRS]                 ║   ║             [GRAEL'S BEDROOM]    ║
║   ┌────────┼────────┐            ║   ║             (Stage 2+ Access)    ║
║ [ROOM 1] [ROOM 2] [ROOM 3]       ║   ╚══════════════════════════════════╝
║ (Guest)  (Rented) (Master)       ║
╚══════════════════════════════════╝

## 18.2 Region 2: Aethermoor & Grand Library

╔══════════════════════════════════════════════════════╗
║               AETHERMOOR — REGION MAP                ║
╠══════════════════════════════════════════════════════╣
║  [NORTH GATE] ──────── [ACADEMY SPIRE TOWER]         ║
║       │                       │                      ║
║  [MERCHANT BAZAAR] ─── [GRAND LIBRARY ARCHIVES]      ║
║       │                  (Isolde's Domain)           ║
║  [CENTRAL FOUNTAIN] ── [ARCHIVIST HALLS]             ║
║       │                       │                      ║
║  [CANAL DOCKS] ─────── [OLD UNDERGROUND TEMPLE]      ║
║                               │ (Act 2 Dungeon)      ║
║                        [INNER SANCTUM BOSS]          ║
╚══════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════╗
║               GRAND LIBRARY 3-FLOOR MAP              ║
╠══════════════════════════════════════════════════════╣
║ 1F: [ENTRANCE] ➔ [PUBLIC READING HALL] ➔ [DESK]      ║
║ 2F: [RESTRICTED VAULT] ➔ [ANCIENT MIASMA ARCHIVE]    ║
║ 3F: [ISOLDE'S PRIVATE STUDY] ➔ [BALCONY LOUNGE]      ║
╚══════════════════════════════════════════════════════╝

Addition [PROPOSED, new — no East Gate shown in the source diagram, but one
is needed for Crimson March's westward connection per the world map]:
Archivist Halls also connects to an East Gate, itself connecting to Crimson
March's Westmarch Encampment.

## 18.3 Region 3: The Crimson March & Fortress

╔══════════════════════════════════════════════════════╗
║            THE CRIMSON MARCH — REGION MAP            ║
╠══════════════════════════════════════════════════════╣
║  [EASTMARCH FORTRESS] ───────── [WESTMARCH ENCAMPMENT]║
║   (Commander Valka)               (General Seira)    ║
║         │                                │           ║
║  [EAST TRENCH LINES] ────────── [WEST BARRICADES]    ║
║         │                                │           ║
║         └───────────▶ [PARLEY GROUND] ◀──┘           ║
║                              │                       ║
║                      [NEUTRAL BORDER TOWN]           ║
║                              │                       ║
║                    [WYRM EMERGENCE CRATER]           ║
║                       (Act 3 Boss Arena)             ║
╚══════════════════════════════════════════════════════╝

## 18.4 Region 4: The Whispering Wood

╔══════════════════════════════════════════════════════╗
║           THE WHISPERING WOOD — REGION MAP           ║
╠══════════════════════════════════════════════════════╣
║  [MISTY TREELINE ENTRY] ➔ [HALLUCINATORY GROVE A]    ║
║                                  │                   ║
║  [GRIEF MEMORY POOL] ◀────── [SYLVARA'S CLEARING]    ║
║         │                                │           ║
║  [SPIRIT RUINS] ──────────── [HEARTWOOD HOLLOW]      ║
║                                      │               ║
║                             [WORLD TREE CORE (BOSS)] ║
╚══════════════════════════════════════════════════════╝

Addition [PROPOSED, new]: an Ascension Path continues on from World Tree
Core, unlocked post-boss, connecting onward to Celestial Threshold, matching
the world map's Whispering Wood → Celestial Threshold edge.

## 18.5 Region 5: The Auric Court & Royal Palace

╔══════════════════════════════════════════════════════╗
║             THE AURIC COURT — REGION MAP             ║
╠══════════════════════════════════════════════════════╣
║  [GOLDEN CITY GATES] ➔ [NOBLE ARISTOCRAT PLAZA]      ║
║                              │                       ║
║  [HIGH BAZAAR] ────── [ROYAL PALACE GRAND GATE]      ║
║                              │                       ║
║                     ┌────────┴────────┐              ║
║                [BANQUET HALL]   [REVA'S SUITE]       ║
║                     │                 │              ║
║                [BALLROOM]       [LYRA'S WING]        ║
║                     │                                ║
║            [UNDERGROUND VAULT CULT ARENA (BOSS)]     ║
╚══════════════════════════════════════════════════════╝

Additions [PROPOSED, new — required by content already committed elsewhere
in this document but never given a map node]:
- A Secret Archive off Reva's Suite — this is "Reva's Secret Ledger,"
  referenced in requirements.md §5.2 as nighttime-infiltration content
  (nightOnlyAccess, requiresStealthCheck), but never placed on any map.
- A Sanctum Descent off the Underground Vault, unlocked post-boss, carrying
  the path onward to Sunken Sanctum.
- Ballroom is additionally flagged nightOnlyAccess — this is the "Velvet and
  Poison" masquerade venue (§8 of items_seed_data.ts's Masquerade Ball Gown).

## 18.6 Region 6 & 7: Sunken Sanctum & Celestial Threshold

╔══════════════════════════════════════════════════════╗
║             SUNKEN SANCTUM & CELESTIAL ASCENT        ║
╠══════════════════════════════════════════════════════╣
║  [SURFACE CRATER ENTRY]                              ║
║         │                                            ║
║  [TIER 1: ECHO HALLS] ── Tests Companions 1–3 Bonds  ║
║         │                                            ║
║  [TIER 2: MEMORY VAULT] ── Tests Companions 4–6      ║
║         │                                            ║
║  [TIER 3: LOCKED HEART] ── Tests Companions 7–10     ║
║         │                                            ║
║  [VOID CONCUBINE CHAMBER (BOSS)]                     ║
║         │                                            ║
║  [WORLD HEART CONVERGENCE ➔ ASTRAEA DESCENDS]        ║
║         │                                            ║
║  [CELESTIAL STAIRWAY TO THRESHOLD (ACT 7 FINALE)]    ║
╚══════════════════════════════════════════════════════╝

## 18.7 Region 8: Mountain Monastery [NEW — not in the original source maps,
   but named on the world map above with no detail anywhere else; Sera's
   home region (Act 4/5), authored here to match her established aesthetic]

╔══════════════════════════════════════════════════════╗
║           MOUNTAIN MONASTERY — REGION MAP  [NEW]      ║
╠══════════════════════════════════════════════════════╣
║  [SWITCHBACK PATH] ➔ [MONASTERY OUTER GATE]          ║
║                                │                     ║
║  [PENITENTS' DORMITORY] ◀── [GREAT CLOISTER]         ║
║         │                          │                 ║
║  [BELL TOWER] ──────────── [SERA'S SANCTUARY]        ║
║                                    │                 ║
║                          [CATACOMBS OF ASH (BOSS)]   ║
╚══════════════════════════════════════════════════════╝

Ascension Path continues on from the Catacombs, post-boss, to Celestial
Threshold, matching the world map's Mountain Monastery → Celestial Threshold
edge. No confirmed boss creature exists yet for the Catacombs — flagged in
§5.11's RegionMonsterProfile row as an open item, not invented here.
*/

// ============================================================================
// LOCATIONS
// ============================================================================

export const LOCATIONS: LocationDef[] = [
  // --- VERDANT VALE (region grid) ---
  { id: "vv_north_meadows", region: Region.VerdantVale, displayName: "North Meadows", isSafe: false, mapX: 0, mapY: 0 },
  { id: "vv_shrine_cottage", region: Region.VerdantVale, displayName: "Mira's Shrine Cottage", isSafe: true, isResidence: true, mapX: 200, mapY: 0 },
  { id: "vv_wheat_farms", region: Region.VerdantVale, displayName: "Wheat Farms", isSafe: false, mapX: 0, mapY: 150 },
  { id: "vv_village_square", region: Region.VerdantVale, displayName: "Vale Village Square", isSafe: true, mapX: 200, mapY: 150 },
  { id: "vv_smithy", region: Region.VerdantVale, displayName: "Grael's Smithy — Outdoor Yard", isSafe: true, isResidence: true, mapX: 0, mapY: 300 },
  { id: "vv_inn_tavern", region: Region.VerdantVale, displayName: "Vale Inn & Tavern — Front Entrance", isSafe: true, isResidence: true, mapX: 200, mapY: 300 },
  { id: "vv_ardor_manor", region: Region.VerdantVale, displayName: "Ardor Manor Estate", isSafe: true, isResidence: true, mapX: 0, mapY: 450 },
  { id: "vv_blighted_mill", region: Region.VerdantVale, displayName: "Old Blighted Mill", isSafe: false, mapX: 200, mapY: 450 },
  { id: "vv_south_highway", region: Region.VerdantVale, displayName: "South Highway", isSafe: false, mapX: 0, mapY: 600 },
  { id: "vv_ley_node_grove", region: Region.VerdantVale, displayName: "Ley Node Grove (Boss)", isSafe: false, mapX: 200, mapY: 600 },

  // --- Vale Village Inn (sub-map) ---
  { id: "vv_inn_common_tavern", region: Region.VerdantVale, displayName: "Common Tavern", isSafe: true, mapX: 200, mapY: 320 },
  { id: "vv_inn_kitchen", region: Region.VerdantVale, displayName: "Inn Kitchen", isSafe: true, mapX: 100, mapY: 340 },
  { id: "vv_inn_bar_counter", region: Region.VerdantVale, displayName: "Inn Bar Counter", isSafe: true, mapX: 300, mapY: 340 },
  { id: "vv_inn_upstairs", region: Region.VerdantVale, displayName: "Inn Upstairs Landing", isSafe: true, mapX: 200, mapY: 360 },
  { id: "vv_inn_room1_guest", region: Region.VerdantVale, displayName: "Inn Room 1 (Guest)", isSafe: true, isResidence: true, mapX: 100, mapY: 380 },
  { id: "vv_inn_room2_rented", region: Region.VerdantVale, displayName: "Inn Room 2 (Rented)", isSafe: true, isResidence: true, mapX: 200, mapY: 380 },
  { id: "vv_inn_room3_master", region: Region.VerdantVale, displayName: "Inn Room 3 (Master)", isSafe: true, isResidence: true, mapX: 300, mapY: 380 },

  // --- Grael's Smithy (sub-map) ---
  { id: "vv_smithy_hearth", region: Region.VerdantVale, displayName: "Smithy Main Hearth", isSafe: true, mapX: 0, mapY: 320 },
  { id: "vv_smithy_anvil", region: Region.VerdantVale, displayName: "Smithy Anvil Area", isSafe: true, mapX: -100, mapY: 340 },
  { id: "vv_smithy_storage", region: Region.VerdantVale, displayName: "Smithy Storage", isSafe: true, mapX: 100, mapY: 340 },
  { id: "vv_smithy_bedroom", region: Region.VerdantVale, displayName: "Grael's Bedroom", isSafe: true, isResidence: true, mapX: 0, mapY: 360 }, // Stage 2+ access — a questStage gate on the interaction, not a LocationDef field; see requirements.md §18.7 note

  // --- AETHERMOOR (region grid) ---
  { id: "am_north_gate", region: Region.Aethermoor, displayName: "North Gate", isSafe: true, mapX: 0, mapY: 0 },
  { id: "am_academy_spire", region: Region.Aethermoor, displayName: "Academy Spire Tower", isSafe: true, mapX: 200, mapY: 0 },
  { id: "am_merchant_bazaar", region: Region.Aethermoor, displayName: "Merchant Bazaar", isSafe: true, mapX: 0, mapY: 150 },
  { id: "am_grand_library", region: Region.Aethermoor, displayName: "Grand Library Archives", isSafe: true, mapX: 200, mapY: 150 },
  { id: "am_central_fountain", region: Region.Aethermoor, displayName: "Central Fountain", isSafe: true, mapX: 0, mapY: 300 },
  { id: "am_archivist_halls", region: Region.Aethermoor, displayName: "Archivist Halls", isSafe: true, mapX: 200, mapY: 300 },
  { id: "am_canal_docks", region: Region.Aethermoor, displayName: "Canal Docks", isSafe: true, mapX: 0, mapY: 450 },
  { id: "am_old_underground_temple", region: Region.Aethermoor, displayName: "Old Underground Temple (Act 2 Dungeon)", isSafe: false, mapX: 200, mapY: 450 },
  { id: "am_inner_sanctum_boss", region: Region.Aethermoor, displayName: "Inner Sanctum (Boss)", isSafe: false, mapX: 200, mapY: 600 },
  { id: "am_east_gate", region: Region.Aethermoor, displayName: "East Gate", isSafe: true, mapX: 350, mapY: 300 }, // [NEW] connector to Crimson March

  // --- Grand Library (sub-map, 3 floors) ---
  { id: "am_lib_entrance", region: Region.Aethermoor, displayName: "Library Entrance (1F)", isSafe: true, mapX: 200, mapY: 170 },
  { id: "am_lib_reading_hall", region: Region.Aethermoor, displayName: "Public Reading Hall (1F)", isSafe: true, mapX: 220, mapY: 170 },
  { id: "am_lib_desk", region: Region.Aethermoor, displayName: "Reference Desk (1F)", isSafe: true, mapX: 240, mapY: 170 },
  { id: "am_lib_vault", region: Region.Aethermoor, displayName: "Restricted Vault (2F)", isSafe: true, mapX: 200, mapY: 190 },
  { id: "am_lib_miasma_archive", region: Region.Aethermoor, displayName: "Ancient Miasma Archive (2F)", isSafe: false, mapX: 220, mapY: 190 },
  { id: "am_lib_isolde_study", region: Region.Aethermoor, displayName: "Isolde's Private Study (3F)", isSafe: true, isResidence: true, mapX: 200, mapY: 210 },
  { id: "am_lib_balcony", region: Region.Aethermoor, displayName: "Balcony Lounge (3F)", isSafe: true, mapX: 220, mapY: 210 },

  // --- CRIMSON MARCH ---
  { id: "cm_eastmarch_fortress", region: Region.CrimsonMarch, displayName: "Eastmarch Fortress (Commander Valka)", isSafe: true, isResidence: true, mapX: 0, mapY: 0 },
  { id: "cm_westmarch_encampment", region: Region.CrimsonMarch, displayName: "Westmarch Encampment (General Seira)", isSafe: true, isResidence: true, mapX: 200, mapY: 0 },
  { id: "cm_east_trench_lines", region: Region.CrimsonMarch, displayName: "East Trench Lines", isSafe: false, mapX: 0, mapY: 150 },
  { id: "cm_west_barricades", region: Region.CrimsonMarch, displayName: "West Barricades", isSafe: false, mapX: 200, mapY: 150 },
  { id: "cm_parley_ground", region: Region.CrimsonMarch, displayName: "Parley Ground", isSafe: true, mapX: 100, mapY: 300 },
  { id: "cm_neutral_border_town", region: Region.CrimsonMarch, displayName: "Neutral Border Town", isSafe: true, mapX: 100, mapY: 450 },
  { id: "cm_wyrm_crater", region: Region.CrimsonMarch, displayName: "Wyrm Emergence Crater (Act 3 Boss Arena)", isSafe: false, mapX: 100, mapY: 600 },

  // --- WHISPERING WOOD ---
  { id: "ww_misty_treeline", region: Region.WhisperingWood, displayName: "Misty Treeline Entry", isSafe: true, mapX: 0, mapY: 0 },
  { id: "ww_hallucinatory_grove", region: Region.WhisperingWood, displayName: "Hallucinatory Grove A", isSafe: false, mapX: 200, mapY: 0 },
  { id: "ww_grief_memory_pool", region: Region.WhisperingWood, displayName: "Grief Memory Pool", isSafe: false, mapX: 0, mapY: 150 },
  { id: "ww_sylvara_clearing", region: Region.WhisperingWood, displayName: "Sylvara's Clearing", isSafe: true, isResidence: true, mapX: 200, mapY: 150 },
  { id: "ww_spirit_ruins", region: Region.WhisperingWood, displayName: "Spirit Ruins", isSafe: false, mapX: 0, mapY: 300 },
  { id: "ww_heartwood_hollow", region: Region.WhisperingWood, displayName: "Heartwood Hollow", isSafe: false, mapX: 200, mapY: 300 },
  { id: "ww_world_tree_core", region: Region.WhisperingWood, displayName: "World Tree Core (Boss)", isSafe: false, mapX: 200, mapY: 450 },
  { id: "ww_ascension_path", region: Region.WhisperingWood, displayName: "Ascension Path", isSafe: true, mapX: 200, mapY: 600 }, // [NEW] connector to Celestial Threshold

  // --- MOUNTAIN MONASTERY [NEW region] ---
  { id: "mm_switchback_path", region: Region.MountainMonastery, displayName: "Mountain Switchback Path", isSafe: false, mapX: 0, mapY: 0 },
  { id: "mm_outer_gate", region: Region.MountainMonastery, displayName: "Monastery Outer Gate", isSafe: true, mapX: 200, mapY: 0 },
  { id: "mm_penitents_dormitory", region: Region.MountainMonastery, displayName: "Penitents' Dormitory", isSafe: true, isResidence: true, mapX: 0, mapY: 150 },
  { id: "mm_great_cloister", region: Region.MountainMonastery, displayName: "Great Cloister", isSafe: true, mapX: 200, mapY: 150 },
  { id: "mm_bell_tower", region: Region.MountainMonastery, displayName: "Bell Tower", isSafe: true, mapX: 0, mapY: 300 },
  { id: "mm_sera_sanctuary", region: Region.MountainMonastery, displayName: "Sera's Sanctuary", isSafe: true, isResidence: true, mapX: 200, mapY: 300 },
  { id: "mm_catacombs_of_ash", region: Region.MountainMonastery, displayName: "Catacombs of Ash (Boss)", isSafe: false, mapX: 200, mapY: 450 },
  { id: "mm_ascension_path", region: Region.MountainMonastery, displayName: "Ascension Path", isSafe: true, mapX: 200, mapY: 600 }, // [NEW] connector to Celestial Threshold

  // --- AURIC COURT ---
  { id: "ac_golden_gates", region: Region.AuricCourt, displayName: "Golden City Gates", isSafe: true, mapX: 0, mapY: 0 },
  { id: "ac_aristocrat_plaza", region: Region.AuricCourt, displayName: "Noble Aristocrat Plaza", isSafe: true, mapX: 200, mapY: 0 },
  { id: "ac_high_bazaar", region: Region.AuricCourt, displayName: "High Bazaar", isSafe: true, mapX: 0, mapY: 150 },
  { id: "ac_palace_grand_gate", region: Region.AuricCourt, displayName: "Royal Palace Grand Gate", isSafe: true, mapX: 200, mapY: 150 },
  { id: "ac_banquet_hall", region: Region.AuricCourt, displayName: "Banquet Hall", isSafe: true, nightOnlyAccess: true, mapX: 100, mapY: 300 }, // masquerade venue
  { id: "ac_reva_suite", region: Region.AuricCourt, displayName: "Reva's Suite", isSafe: true, isResidence: true, mapX: 300, mapY: 300 },
  { id: "ac_ballroom", region: Region.AuricCourt, displayName: "Ballroom", isSafe: true, nightOnlyAccess: true, mapX: 100, mapY: 450 }, // "Velvet and Poison" masquerade
  { id: "ac_lyra_wing", region: Region.AuricCourt, displayName: "Lyra's Wing", isSafe: true, isResidence: true, mapX: 300, mapY: 450 },
  { id: "ac_underground_vault", region: Region.AuricCourt, displayName: "Underground Vault Cult Arena (Boss)", isSafe: false, mapX: 100, mapY: 600 },
  { id: "ac_secret_archive", region: Region.AuricCourt, displayName: "Reva's Secret Archive", isSafe: true, nightOnlyAccess: true, requiresStealthCheck: true, mapX: 350, mapY: 300 }, // [NEW]
  { id: "ac_sanctum_descent", region: Region.AuricCourt, displayName: "Sanctum Descent", isSafe: true, mapX: 100, mapY: 750 }, // [NEW] connector to Sunken Sanctum

  // --- SUNKEN SANCTUM (linear chain) ---
  { id: "ss_surface_crater_entry", region: Region.SunkenSanctum, displayName: "Surface Crater Entry", isSafe: true, mapX: 0, mapY: 0 },
  { id: "ss_tier1_echo_halls", region: Region.SunkenSanctum, displayName: "Tier 1: Echo Halls", isSafe: false, mapX: 0, mapY: 150 },
  { id: "ss_tier2_memory_vault", region: Region.SunkenSanctum, displayName: "Tier 2: Memory Vault", isSafe: false, mapX: 0, mapY: 300 },
  { id: "ss_tier3_locked_heart", region: Region.SunkenSanctum, displayName: "Tier 3: Locked Heart", isSafe: false, mapX: 0, mapY: 450 },
  { id: "ss_void_concubine_chamber", region: Region.SunkenSanctum, displayName: "Void Concubine Chamber (Boss)", isSafe: false, mapX: 0, mapY: 600 },
  { id: "ss_world_heart_convergence", region: Region.SunkenSanctum, displayName: "World Heart Convergence (Astraea Descends)", isSafe: true, mapX: 0, mapY: 750 },
  { id: "ss_celestial_stairway", region: Region.SunkenSanctum, displayName: "Celestial Stairway to Threshold", isSafe: true, mapX: 0, mapY: 900 },

  // --- CELESTIAL THRESHOLD (Act 7 finale, minimal — one-off, hand-scripted, not a reusable pool) ---
  { id: "ct_threshold_approach", region: Region.CelestialThreshold, displayName: "Threshold Approach", isSafe: true, mapX: 0, mapY: 0 },
  { id: "ct_primordial_chamber", region: Region.CelestialThreshold, displayName: "The Primordial Chamber (Final Boss)", isSafe: false, mapX: 0, mapY: 150 },
];

// ============================================================================
// PATH EDGES
// ============================================================================

export const PATH_EDGES: PathEdgeDef[] = [
  // --- Verdant Vale region grid (ladder graph, 5 rows x 2 cols) ---
  { id: "vv_e1", fromLocationId: "vv_north_meadows", toLocationId: "vv_shrine_cottage", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e2", fromLocationId: "vv_north_meadows", toLocationId: "vv_wheat_farms", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e3", fromLocationId: "vv_shrine_cottage", toLocationId: "vv_village_square", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e4", fromLocationId: "vv_wheat_farms", toLocationId: "vv_village_square", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e5", fromLocationId: "vv_wheat_farms", toLocationId: "vv_smithy", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e6", fromLocationId: "vv_village_square", toLocationId: "vv_inn_tavern", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e7", fromLocationId: "vv_smithy", toLocationId: "vv_inn_tavern", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e8", fromLocationId: "vv_smithy", toLocationId: "vv_ardor_manor", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e9", fromLocationId: "vv_inn_tavern", toLocationId: "vv_blighted_mill", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e10", fromLocationId: "vv_ardor_manor", toLocationId: "vv_blighted_mill", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e11", fromLocationId: "vv_ardor_manor", toLocationId: "vv_south_highway", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e12", fromLocationId: "vv_blighted_mill", toLocationId: "vv_ley_node_grove", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_e13", fromLocationId: "vv_south_highway", toLocationId: "vv_ley_node_grove", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },

  // --- Vale Village Inn (interior) ---
  { id: "vv_inn_e1", fromLocationId: "vv_inn_tavern", toLocationId: "vv_inn_common_tavern", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_inn_e2", fromLocationId: "vv_inn_common_tavern", toLocationId: "vv_inn_kitchen", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_inn_e3", fromLocationId: "vv_inn_common_tavern", toLocationId: "vv_inn_bar_counter", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_inn_e4", fromLocationId: "vv_inn_common_tavern", toLocationId: "vv_inn_upstairs", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_inn_e5", fromLocationId: "vv_inn_upstairs", toLocationId: "vv_inn_room1_guest", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_inn_e6", fromLocationId: "vv_inn_upstairs", toLocationId: "vv_inn_room2_rented", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_inn_e7", fromLocationId: "vv_inn_upstairs", toLocationId: "vv_inn_room3_master", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },

  // --- Grael's Smithy (interior) ---
  { id: "vv_smith_e1", fromLocationId: "vv_smithy", toLocationId: "vv_smithy_hearth", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_smith_e2", fromLocationId: "vv_smithy_hearth", toLocationId: "vv_smithy_anvil", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_smith_e3", fromLocationId: "vv_smithy_hearth", toLocationId: "vv_smithy_storage", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "vv_smith_e4", fromLocationId: "vv_smithy_hearth", toLocationId: "vv_smithy_bedroom", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },

  // --- Aethermoor region grid ---
  { id: "am_e1", fromLocationId: "am_north_gate", toLocationId: "am_academy_spire", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e2", fromLocationId: "am_north_gate", toLocationId: "am_merchant_bazaar", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e3", fromLocationId: "am_academy_spire", toLocationId: "am_grand_library", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e4", fromLocationId: "am_merchant_bazaar", toLocationId: "am_grand_library", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e5", fromLocationId: "am_merchant_bazaar", toLocationId: "am_central_fountain", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e6", fromLocationId: "am_grand_library", toLocationId: "am_archivist_halls", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e7", fromLocationId: "am_central_fountain", toLocationId: "am_archivist_halls", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e8", fromLocationId: "am_central_fountain", toLocationId: "am_canal_docks", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e9", fromLocationId: "am_archivist_halls", toLocationId: "am_old_underground_temple", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e10", fromLocationId: "am_canal_docks", toLocationId: "am_old_underground_temple", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e11", fromLocationId: "am_old_underground_temple", toLocationId: "am_inner_sanctum_boss", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "am_e12", fromLocationId: "am_archivist_halls", toLocationId: "am_east_gate", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },

  // --- Grand Library (interior, 3 floors) ---
  { id: "am_lib_e1", fromLocationId: "am_grand_library", toLocationId: "am_lib_entrance", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_lib_e2", fromLocationId: "am_lib_entrance", toLocationId: "am_lib_reading_hall", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_lib_e3", fromLocationId: "am_lib_reading_hall", toLocationId: "am_lib_desk", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_lib_e4", fromLocationId: "am_lib_desk", toLocationId: "am_lib_vault", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_lib_e5", fromLocationId: "am_lib_vault", toLocationId: "am_lib_miasma_archive", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_lib_e6", fromLocationId: "am_lib_miasma_archive", toLocationId: "am_lib_isolde_study", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "am_lib_e7", fromLocationId: "am_lib_isolde_study", toLocationId: "am_lib_balcony", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },

  // --- Crimson March ---
  { id: "cm_e1", fromLocationId: "cm_eastmarch_fortress", toLocationId: "cm_westmarch_encampment", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "cm_e2", fromLocationId: "cm_eastmarch_fortress", toLocationId: "cm_east_trench_lines", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "cm_e3", fromLocationId: "cm_westmarch_encampment", toLocationId: "cm_west_barricades", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "cm_e4", fromLocationId: "cm_east_trench_lines", toLocationId: "cm_parley_ground", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "cm_e5", fromLocationId: "cm_west_barricades", toLocationId: "cm_parley_ground", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "cm_e6", fromLocationId: "cm_parley_ground", toLocationId: "cm_neutral_border_town", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "cm_e7", fromLocationId: "cm_neutral_border_town", toLocationId: "cm_wyrm_crater", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },

  // --- Whispering Wood ---
  { id: "ww_e1", fromLocationId: "ww_misty_treeline", toLocationId: "ww_hallucinatory_grove", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ww_e2", fromLocationId: "ww_hallucinatory_grove", toLocationId: "ww_sylvara_clearing", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ww_e3", fromLocationId: "ww_grief_memory_pool", toLocationId: "ww_sylvara_clearing", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ww_e4", fromLocationId: "ww_grief_memory_pool", toLocationId: "ww_spirit_ruins", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ww_e5", fromLocationId: "ww_sylvara_clearing", toLocationId: "ww_heartwood_hollow", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ww_e6", fromLocationId: "ww_spirit_ruins", toLocationId: "ww_heartwood_hollow", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ww_e7", fromLocationId: "ww_heartwood_hollow", toLocationId: "ww_world_tree_core", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "ww_e8", fromLocationId: "ww_world_tree_core", toLocationId: "ww_ascension_path", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },

  // --- Mountain Monastery [NEW] ---
  { id: "mm_e1", fromLocationId: "mm_switchback_path", toLocationId: "mm_outer_gate", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "mm_e2", fromLocationId: "mm_outer_gate", toLocationId: "mm_great_cloister", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "mm_e3", fromLocationId: "mm_penitents_dormitory", toLocationId: "mm_great_cloister", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "mm_e4", fromLocationId: "mm_penitents_dormitory", toLocationId: "mm_bell_tower", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "mm_e5", fromLocationId: "mm_great_cloister", toLocationId: "mm_sera_sanctuary", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "mm_e6", fromLocationId: "mm_bell_tower", toLocationId: "mm_sera_sanctuary", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "mm_e7", fromLocationId: "mm_sera_sanctuary", toLocationId: "mm_catacombs_of_ash", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "mm_e8", fromLocationId: "mm_catacombs_of_ash", toLocationId: "mm_ascension_path", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },

  // --- Auric Court ---
  { id: "ac_e1", fromLocationId: "ac_golden_gates", toLocationId: "ac_aristocrat_plaza", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ac_e2", fromLocationId: "ac_aristocrat_plaza", toLocationId: "ac_palace_grand_gate", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ac_e3", fromLocationId: "ac_high_bazaar", toLocationId: "ac_palace_grand_gate", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ac_e4", fromLocationId: "ac_palace_grand_gate", toLocationId: "ac_banquet_hall", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ac_e5", fromLocationId: "ac_palace_grand_gate", toLocationId: "ac_reva_suite", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ac_e6", fromLocationId: "ac_banquet_hall", toLocationId: "ac_ballroom", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ac_e7", fromLocationId: "ac_reva_suite", toLocationId: "ac_lyra_wing", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ac_e8", fromLocationId: "ac_ballroom", toLocationId: "ac_underground_vault", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "ac_e9", fromLocationId: "ac_reva_suite", toLocationId: "ac_secret_archive", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ac_e10", fromLocationId: "ac_underground_vault", toLocationId: "ac_sanctum_descent", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },

  // --- Sunken Sanctum (linear) ---
  { id: "ss_e1", fromLocationId: "ss_surface_crater_entry", toLocationId: "ss_tier1_echo_halls", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "ss_e2", fromLocationId: "ss_tier1_echo_halls", toLocationId: "ss_tier2_memory_vault", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "ss_e3", fromLocationId: "ss_tier2_memory_vault", toLocationId: "ss_tier3_locked_heart", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "ss_e4", fromLocationId: "ss_tier3_locked_heart", toLocationId: "ss_void_concubine_chamber", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },
  { id: "ss_e5", fromLocationId: "ss_void_concubine_chamber", toLocationId: "ss_world_heart_convergence", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },
  { id: "ss_e6", fromLocationId: "ss_world_heart_convergence", toLocationId: "ss_celestial_stairway", travelSegments: 1, bidirectional: true, crossesRegionBorder: false },

  // --- Celestial Threshold ---
  { id: "ct_e1", fromLocationId: "ct_threshold_approach", toLocationId: "ct_primordial_chamber", travelSegments: 2, bidirectional: true, crossesRegionBorder: false },

  // ==========================================================================
  // INTER-REGION CONNECTIONS — the world map, transcribed
  // ==========================================================================
  { id: "world_e1", fromLocationId: "vv_south_highway", toLocationId: "am_north_gate", travelSegments: 3, bidirectional: true, crossesRegionBorder: true }, // Verdant Vale <-> Aethermoor
  { id: "world_e2", fromLocationId: "am_east_gate", toLocationId: "cm_westmarch_encampment", travelSegments: 3, bidirectional: true, crossesRegionBorder: true }, // Aethermoor <-> Crimson March
  { id: "world_e3", fromLocationId: "am_academy_spire", toLocationId: "ww_misty_treeline", travelSegments: 3, bidirectional: true, crossesRegionBorder: true }, // Aethermoor <-> Whispering Wood
  { id: "world_e4", fromLocationId: "am_academy_spire", toLocationId: "mm_outer_gate", travelSegments: 3, bidirectional: true, crossesRegionBorder: true }, // Aethermoor <-> Mountain Monastery
  { id: "world_e5", fromLocationId: "am_canal_docks", toLocationId: "ac_golden_gates", travelSegments: 4, bidirectional: true, crossesRegionBorder: true }, // Aethermoor <-> Auric Court (the world map's central "▼")
  { id: "world_e6", fromLocationId: "ac_sanctum_descent", toLocationId: "ss_surface_crater_entry", travelSegments: 2, bidirectional: true, crossesRegionBorder: true }, // Auric Court <-> Sunken Sanctum
  { id: "world_e7", fromLocationId: "ww_ascension_path", toLocationId: "ct_threshold_approach", travelSegments: 3, bidirectional: true, crossesRegionBorder: true }, // Whispering Wood <-> Celestial Threshold
  { id: "world_e8", fromLocationId: "mm_ascension_path", toLocationId: "ct_threshold_approach", travelSegments: 3, bidirectional: true, crossesRegionBorder: true }, // Mountain Monastery <-> Celestial Threshold
  { id: "world_e9", fromLocationId: "ss_celestial_stairway", toLocationId: "ct_threshold_approach", travelSegments: 2, bidirectional: true, crossesRegionBorder: true }, // Sunken Sanctum <-> Celestial Threshold (the main story path)
];

// ============================================================================
// REGION MONSTER PROFILES — transcribed from §5.11's markdown table into
// real data, since it drives actual spawn-eligibility logic rather than
// being pure documentation. Added during the §2 repository-list reconciliation
// pass rather than left as a table only a human could read.
// ============================================================================

export const REGION_MONSTER_PROFILES: RegionMonsterProfile[] = [
  { region: Region.VerdantVale, levelRange: [1, 8], allowedMonsterTypes: [MonsterType.Beast, MonsterType.MiasmaCorrupted, MonsterType.Humanoid] },
  { region: Region.Aethermoor, levelRange: [6, 14], allowedMonsterTypes: [MonsterType.MiasmaCorrupted, MonsterType.Construct, MonsterType.Humanoid] },
  { region: Region.CrimsonMarch, levelRange: [12, 22], allowedMonsterTypes: [MonsterType.Draconic, MonsterType.Humanoid] },
  { region: Region.WhisperingWood, levelRange: [18, 28], allowedMonsterTypes: [MonsterType.MiasmaCorrupted, MonsterType.Beast, MonsterType.Humanoid] },
  { region: Region.MountainMonastery, levelRange: [22, 32], allowedMonsterTypes: [MonsterType.MiasmaCorrupted, MonsterType.Humanoid, MonsterType.Beast] },
  { region: Region.AuricCourt, levelRange: [24, 34], allowedMonsterTypes: [MonsterType.Humanoid, MonsterType.MiasmaCorrupted] },
  { region: Region.SunkenSanctum, levelRange: [30, 45], allowedMonsterTypes: [MonsterType.VoidAberration, MonsterType.Construct, MonsterType.Humanoid] },
  { region: Region.CelestialThreshold, levelRange: [40, 60], allowedMonsterTypes: [MonsterType.Cosmic] }, // one-off, not a reusable pool — see §5.11
];
