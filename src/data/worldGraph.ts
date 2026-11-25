/**
 * worldGraph.ts
 * Static world graph: named locations (WorldNode) and their connections (WorldEdge).
 *
 * Phase 42h — Full Aldermere map (tasks 42h.1–42h.5)
 *
 * NODE authoring conventions:
 *   id              — matches TileMap.locationId; used as key across all engines
 *   regionId        — matches keys in GameState.reputation; used for fast-travel cost calc
 *   isSafe          — true = sleep allowed + no phase-encounter roll during TRAVEL
 *   safetyTier      — mirrors TileMap.safetyTier; drives HUD border color and menu access
 *   fastTravelCost  — 0 = use the cross-region constant from worldEngine; non-zero overrides
 *
 * EDGE authoring conventions:
 *   Edges are DIRECTED; both directions authored for every passable corridor.
 *   travelPhases = in-game phases consumed to walk the edge.
 *     1 = intra-district hop
 *     2 = district-to-outskirts or short road
 *     3 = road segment between towns
 *     4 = wilderness crossing or mountain approach
 *     5 = mountain pass or sea route
 *
 * WARD authoring:
 *   wardedAgainstTeleport: true applied per world_bible ward-site class list
 *   (magic.teleportation.ward_sites):
 *     • prisons and courthouses
 *     • vaults and banks
 *     • castles and fortresses
 *     • temples and Memory Halls
 *     • Charter halls
 *     • dwarven holds
 *     • Ledger Courts halls
 *   Each warded node is annotated with its ward class inline.
 *
 * FEATURES (not yet on WorldNode interface — documented as inline comments until
 *   WorldNode is extended in a future type-audit pass):
 *   market | smithy | alchemy_lab | gambling | bank | shrine | onsen | arena
 *
 * DATA STATUS: Phase 42h.1–42h.4 complete — 36 nodes, 84 directed edges.
 *   Phase 42h.5 (enemy roam defs): all entries stubbed as []; populate after
 *     Phase 42i expands the monsters catalog.
 *   Stonebridge corridor: 3 stub nodes + edges authored (42h.3); full Khardun
 *     interior deferred to Phase 46c.1.
 *   Ashvault cluster: nodes present but ISOLATED — no Aldermere ↔ Ashvault edge.
 *     Quest-gated travel unlocked in Acts 7–8 data phase (Phase 50b/51).
 */

import type { WorldNode, WorldEdge, EnemyRoamDef } from '../state/gameState';

// ─── Node catalog ─────────────────────────────────────────────────────────────

export const WORLD_NODES: WorldNode[] = [

  // ── TESSARA ───────────────────────────────────────────────────────────────
  // Cosmopolitan river-crossroads city; human homeland gate between Aldermere
  // and Sylvaren (Tessara Neck land link). Player start location.
  // regionId: tessara

  {
    id:             'tessara_market_square',
    name:           'Tessara — Market Square',
    regionId:       'tessara',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      false,
    // features: market
  },
  {
    id:                    'tessara_charter_hall',
    name:                  'Tessara — Charter Hall',
    regionId:              'tessara',
    isSafe:                true,
    safetyTier:            'SAFE',
    fastTravelCost:        0,
    isIndoors:             true,
    wardedAgainstTeleport: true,  // ward-site class: Charter halls
    // features: market, smithy
  },
  {
    id:             'tessara_arcane_collegium',
    name:           'Tessara — Arcane Collegium',
    regionId:       'tessara',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      true,
    // features: alchemy_lab
  },
  {
    id:             'tessara_dockside',
    name:           'Tessara — Dockside',
    regionId:       'tessara',
    isSafe:         false,
    safetyTier:     'HUMANOID_ONLY',
    fastTravelCost: 0,
    isIndoors:      false,
    // features: gambling
  },
  {
    id:             'tessara_slums',
    name:           'Tessara — Slums',
    regionId:       'tessara',
    isSafe:         false,
    safetyTier:     'HUMANOID_ONLY',
    fastTravelCost: 0,
    isIndoors:      false,
  },

  // ── VARNHOLD (capital of the Hallowmere realm, two district clusters) ──────
  // Cold northern city. Hallowmere cluster: crown, faith, military.
  // Varnhold cluster: law courts, border, inn. regionId: varnhold.

  // — Hallowmere cluster —
  {
    id:             'varnhold_market_road',
    name:           'Varnhold — Market Road',
    regionId:       'varnhold',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      false,
    // features: market, smithy
  },
  {
    id:                    'varnhold_castle_district',
    name:                  'Varnhold — Castle District',
    regionId:              'varnhold',
    isSafe:                false,
    safetyTier:            'HUMANOID_ONLY',
    fastTravelCost:        0,
    isIndoors:             false,
    wardedAgainstTeleport: true,  // ward-site class: castles and fortresses
    // features: bank (castle treasury counter)
  },
  {
    id:                    'varnhold_cathedral_solenne',
    name:                  'Varnhold — Cathedral of Solenne',
    regionId:              'varnhold',
    isSafe:                true,
    safetyTier:            'SAFE',
    fastTravelCost:        0,
    isIndoors:             true,
    wardedAgainstTeleport: true,  // ward-site class: temples and Memory Halls
    // features: shrine
  },
  {
    id:                    'varnhold_templar_barracks',
    name:                  'Varnhold — Templar Barracks',
    regionId:              'varnhold',
    isSafe:                false,
    safetyTier:            'HUMANOID_ONLY',
    fastTravelCost:        0,
    isIndoors:             false,
    wardedAgainstTeleport: true,  // ward-site class: castles and fortresses
  },

  // — Varnhold cluster —
  {
    id:                    'varnhold_ledger_court_hall',
    name:                  'Varnhold — Ledger Court Hall',
    regionId:              'varnhold',
    isSafe:                false,
    safetyTier:            'HUMANOID_ONLY',
    fastTravelCost:        0,
    isIndoors:             true,
    wardedAgainstTeleport: true,  // ward-site class: Ledger Courts halls
    // features: bank
  },
  {
    id:             'varnhold_border_gate',
    name:           'Varnhold — Border Gate',
    regionId:       'varnhold',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:             'varnhold_countryside_inn',
    name:           'Varnhold — Countryside Inn',
    regionId:       'varnhold',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      true,
  },

  // ── PORT HALCYON ──────────────────────────────────────────────────────────
  // Southern Aldermere coast. Biggest harbour and markets in the region.
  // Independent merchant-council city. regionId: port_halcyon

  {
    id:             'halcyon_harbour',
    name:           'Port Halcyon — Harbour',
    regionId:       'port_halcyon',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      false,
    // features: market
  },
  {
    id:             'halcyon_salt_wharf',
    name:           'Port Halcyon — Salt Wharf District',
    regionId:       'port_halcyon',
    isSafe:         false,
    safetyTier:     'HUMANOID_ONLY',
    fastTravelCost: 0,
    isIndoors:      false,
    // features: gambling
  },
  {
    id:             'halcyon_merchant_row',
    name:           'Port Halcyon — Merchant Row',
    regionId:       'port_halcyon',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      false,
    // features: market, bank
  },

  // ── BRIGHTWATER ───────────────────────────────────────────────────────────
  // Aldermere river port; pastoral and peaceful. regionId: brightwater

  {
    id:             'brightwater_village_green',
    name:           'Brightwater — Village Green',
    regionId:       'brightwater',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:             'brightwater_hot_spring_baths',
    name:           'Brightwater — Hot Spring Baths',
    regionId:       'brightwater',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      true,
    // features: onsen
  },
  {
    id:             'brightwater_roadside_shrine',
    name:           'Brightwater — Roadside Shrine',
    regionId:       'brightwater',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      false,
    // features: shrine
  },

  // ── CONCORD ───────────────────────────────────────────────────────────────
  // Concord Isle, center of the Middle Sea. Neutral charter city.
  // Reached by sea from Port Halcyon (5 phases). regionId: concord

  {
    id:             'concord_royal_quarter',
    name:           'Concord — Royal Quarter',
    regionId:       'concord',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      false,
    // features: bank, arena
  },
  {
    id:                    'concord_charter_hq',
    name:                  'Concord — Charter HQ',
    regionId:              'concord',
    isSafe:                true,
    safetyTier:            'SAFE',
    fastTravelCost:        0,
    isIndoors:             true,
    wardedAgainstTeleport: true,  // ward-site class: Charter halls
  },
  {
    id:             'concord_guild_market',
    name:           'Concord — Guild Market',
    regionId:       'concord',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      false,
    // features: market, smithy, alchemy_lab
  },
  {
    id:             'concord_outer_ring',
    name:           'Concord — Outer Ring',
    regionId:       'concord',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },

  // ── ASHVAULT ──────────────────────────────────────────────────────────────
  // Vashkar — Ember Temple complex. Varan is held in the deep level.
  // regionId: vashkar. ISOLATED — no Aldermere edges here; quest-gated travel
  // added in Acts 7–8 data phase (Phase 50b/51 authoring).

  {
    id:             'ashvault_ember_temple_approach',
    name:           'Ashvault — Ember Temple Approach',
    regionId:       'vashkar',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:                    'ashvault_ember_temple_outer_ward',
    name:                  'Ashvault — Ember Temple Outer Ward',
    regionId:              'vashkar',
    isSafe:                false,
    safetyTier:            'HUMANOID_ONLY',
    fastTravelCost:        0,
    isIndoors:             false,
    wardedAgainstTeleport: true,  // ward-site class: temples and Memory Halls; also fortress
  },
  {
    id:                    'ashvault_ember_temple_deep_level',
    name:                  'Ashvault — Ember Temple Deep Level',
    regionId:              'vashkar',
    isSafe:                false,
    safetyTier:            'HUMANOID_ONLY',
    fastTravelCost:        0,
    isIndoors:             true,
    wardedAgainstTeleport: true,  // ward-site class: temples and Memory Halls
    // Note: Varan is held here. This node is the Act 8 boss arena.
  },

  // ── WILDERNESS — ALDERMERE ────────────────────────────────────────────────
  // Open road and wild terrain nodes. All isSafe: false.
  // Phase 42h.5: roam defs stubbed; fill in after Phase 42i (monsters catalog).

  {
    id:             'north_road',
    name:           'North Road',
    regionId:       'varnhold',    // Hallowmere realm territory
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:             'east_marshes',
    name:           'East Marshes',
    regionId:       'port_halcyon',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:             'hallowmere_forest',
    name:           'Hallowmere Forest',
    regionId:       'varnhold',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:             'brightwater_hills',
    name:           'Brightwater Hills',
    regionId:       'brightwater',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:             'river_crossing_north',
    name:           'River Crossing (North)',
    regionId:       'tessara',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:             'river_crossing_south',
    name:           'River Crossing (South)',
    regionId:       'port_halcyon',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },

  // ── STONEBRIDGE CORRIDOR ──────────────────────────────────────────────────
  // Three stub nodes linking Aldermere → Khardun via the Stonebridge Spine
  // mountain range (joint human-dwarf garrison city; toll disputes settled by
  // the Charter). No features, roam defs, or Khardun interior edges here.
  // Full Khardun interior deferred to Phase 46c.1.

  {
    id:             'stonebridge_south_gate',
    name:           'Stonebridge — South Gate',
    regionId:       'aldermere_border',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:             'stonebridge_spine_pass',
    name:           'Stonebridge — Spine Pass',
    regionId:       'stonebridge',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },
  {
    id:             'stonebridge_north_gate',
    name:           'Stonebridge — North Gate',
    regionId:       'khardun_border',
    isSafe:         false,
    safetyTier:     'UNSAFE',
    fastTravelCost: 0,
    isIndoors:      false,
  },

  // ── RETAINED — updated regionId ───────────────────────────────────────────
  // Phase 40 stubs kept; placeholder nodes village_square / forest_entrance /
  // old_mill / crossroads deleted (mockGameState.ts updated to canonical ids).
  // manor_grounds: regionId updated region_start → tessara.
  // city_prison:   regionId updated region_start → varnhold.

  {
    id:             'manor_grounds',
    name:           'Manor Grounds',
    regionId:       'tessara',
    isSafe:         true,
    safetyTier:     'SAFE',
    fastTravelCost: 0,
    isIndoors:      true,    // walled private estate; exposure gate bypassed
  },
  {
    id:                    'city_prison',
    name:                  'City Prison',
    regionId:              'varnhold',   // Hallowmere realm capital prison
    isSafe:                false,
    safetyTier:            'HUMANOID_ONLY',
    fastTravelCost:        0,
    isIndoors:             true,
    wardedAgainstTeleport: true,         // ward-site class: prisons and courthouses
  },
];

// ─── Edge catalog ─────────────────────────────────────────────────────────────
// All corridors authored as bidirectional directed pairs.
// Grouped by origin cluster for readability; phase costs in comments where notable.

export const WORLD_EDGES: WorldEdge[] = [

  // ── Tessara — intra-district (1 phase) ────────────────────────────────────
  { fromId: 'tessara_market_square',    toId: 'tessara_charter_hall',          travelPhases: 1 },
  { fromId: 'tessara_charter_hall',     toId: 'tessara_market_square',          travelPhases: 1 },

  { fromId: 'tessara_market_square',    toId: 'tessara_arcane_collegium',       travelPhases: 1 },
  { fromId: 'tessara_arcane_collegium', toId: 'tessara_market_square',          travelPhases: 1 },

  { fromId: 'tessara_market_square',    toId: 'tessara_dockside',               travelPhases: 1 },
  { fromId: 'tessara_dockside',         toId: 'tessara_market_square',          travelPhases: 1 },

  { fromId: 'tessara_market_square',    toId: 'tessara_slums',                  travelPhases: 1 },
  { fromId: 'tessara_slums',            toId: 'tessara_market_square',          travelPhases: 1 },

  { fromId: 'tessara_slums',            toId: 'tessara_dockside',               travelPhases: 1 },
  { fromId: 'tessara_dockside',         toId: 'tessara_slums',                  travelPhases: 1 },

  { fromId: 'tessara_market_square',    toId: 'manor_grounds',                  travelPhases: 1 },
  { fromId: 'manor_grounds',            toId: 'tessara_market_square',          travelPhases: 1 },

  // ── Tessara — exits to wilderness (2 phases) ──────────────────────────────
  { fromId: 'tessara_market_square',    toId: 'north_road',                     travelPhases: 2 },
  { fromId: 'north_road',               toId: 'tessara_market_square',          travelPhases: 2 },

  { fromId: 'tessara_dockside',         toId: 'river_crossing_north',           travelPhases: 2 },
  { fromId: 'river_crossing_north',     toId: 'tessara_dockside',               travelPhases: 2 },

  // ── Varnhold — Hallowmere cluster, intra-district (1 phase) ──────────────
  { fromId: 'varnhold_market_road',      toId: 'varnhold_castle_district',      travelPhases: 1 },
  { fromId: 'varnhold_castle_district',  toId: 'varnhold_market_road',          travelPhases: 1 },

  { fromId: 'varnhold_market_road',      toId: 'varnhold_cathedral_solenne',    travelPhases: 1 },
  { fromId: 'varnhold_cathedral_solenne', toId: 'varnhold_market_road',         travelPhases: 1 },

  { fromId: 'varnhold_market_road',      toId: 'varnhold_templar_barracks',     travelPhases: 1 },
  { fromId: 'varnhold_templar_barracks', toId: 'varnhold_market_road',          travelPhases: 1 },

  // ── Varnhold — Varnhold cluster, intra-district (1 phase) ────────────────
  { fromId: 'varnhold_market_road',       toId: 'varnhold_ledger_court_hall',   travelPhases: 1 },
  { fromId: 'varnhold_ledger_court_hall', toId: 'varnhold_market_road',         travelPhases: 1 },

  { fromId: 'varnhold_market_road',      toId: 'varnhold_countryside_inn',      travelPhases: 1 },
  { fromId: 'varnhold_countryside_inn',  toId: 'varnhold_market_road',          travelPhases: 1 },

  { fromId: 'varnhold_countryside_inn',  toId: 'varnhold_border_gate',          travelPhases: 1 },
  { fromId: 'varnhold_border_gate',      toId: 'varnhold_countryside_inn',      travelPhases: 1 },

  // ── Varnhold — city prison off Castle District (1 phase) ──────────────────
  { fromId: 'varnhold_castle_district',  toId: 'city_prison',                   travelPhases: 1 },
  { fromId: 'city_prison',              toId: 'varnhold_castle_district',       travelPhases: 1 },

  // ── Varnhold — exit to wilderness (2 phases) ──────────────────────────────
  { fromId: 'varnhold_border_gate',      toId: 'hallowmere_forest',             travelPhases: 2 },
  { fromId: 'hallowmere_forest',         toId: 'varnhold_border_gate',          travelPhases: 2 },

  // ── Port Halcyon — intra-district (1 phase) ───────────────────────────────
  { fromId: 'halcyon_harbour',           toId: 'halcyon_merchant_row',          travelPhases: 1 },
  { fromId: 'halcyon_merchant_row',      toId: 'halcyon_harbour',               travelPhases: 1 },

  { fromId: 'halcyon_harbour',           toId: 'halcyon_salt_wharf',            travelPhases: 1 },
  { fromId: 'halcyon_salt_wharf',        toId: 'halcyon_harbour',               travelPhases: 1 },

  { fromId: 'halcyon_merchant_row',      toId: 'halcyon_salt_wharf',            travelPhases: 1 },
  { fromId: 'halcyon_salt_wharf',        toId: 'halcyon_merchant_row',          travelPhases: 1 },

  // ── Port Halcyon — exit to wilderness (2 phases) ──────────────────────────
  { fromId: 'halcyon_harbour',           toId: 'east_marshes',                  travelPhases: 2 },
  { fromId: 'east_marshes',             toId: 'halcyon_harbour',                travelPhases: 2 },

  // ── Brightwater — intra-district (1 phase) ────────────────────────────────
  { fromId: 'brightwater_village_green', toId: 'brightwater_hot_spring_baths', travelPhases: 1 },
  { fromId: 'brightwater_hot_spring_baths', toId: 'brightwater_village_green', travelPhases: 1 },

  { fromId: 'brightwater_village_green', toId: 'brightwater_roadside_shrine',  travelPhases: 1 },
  { fromId: 'brightwater_roadside_shrine', toId: 'brightwater_village_green',  travelPhases: 1 },

  // ── Brightwater — exit to wilderness (2 phases) ───────────────────────────
  { fromId: 'brightwater_village_green', toId: 'brightwater_hills',            travelPhases: 2 },
  { fromId: 'brightwater_hills',         toId: 'brightwater_village_green',    travelPhases: 2 },

  // ── Concord — intra-district (1 phase) ────────────────────────────────────
  { fromId: 'concord_charter_hq',        toId: 'concord_guild_market',         travelPhases: 1 },
  { fromId: 'concord_guild_market',      toId: 'concord_charter_hq',           travelPhases: 1 },

  { fromId: 'concord_charter_hq',        toId: 'concord_royal_quarter',        travelPhases: 1 },
  { fromId: 'concord_royal_quarter',     toId: 'concord_charter_hq',           travelPhases: 1 },

  { fromId: 'concord_guild_market',      toId: 'concord_outer_ring',           travelPhases: 1 },
  { fromId: 'concord_outer_ring',        toId: 'concord_guild_market',         travelPhases: 1 },

  { fromId: 'concord_royal_quarter',     toId: 'concord_outer_ring',           travelPhases: 1 },
  { fromId: 'concord_outer_ring',        toId: 'concord_royal_quarter',        travelPhases: 1 },

  // ── Ashvault — internal progression (1 phase) ─────────────────────────────
  // Isolated cluster; Aldermere ↔ Ashvault edge deferred to Act 7–8 data phase.
  { fromId: 'ashvault_ember_temple_approach',   toId: 'ashvault_ember_temple_outer_ward',   travelPhases: 1 },
  { fromId: 'ashvault_ember_temple_outer_ward', toId: 'ashvault_ember_temple_approach',     travelPhases: 1 },

  { fromId: 'ashvault_ember_temple_outer_ward', toId: 'ashvault_ember_temple_deep_level',   travelPhases: 1 },
  { fromId: 'ashvault_ember_temple_deep_level', toId: 'ashvault_ember_temple_outer_ward',   travelPhases: 1 },

  // ── Wilderness — inter-node hops (2 phases) ───────────────────────────────
  { fromId: 'north_road',                toId: 'river_crossing_north',         travelPhases: 2 },
  { fromId: 'river_crossing_north',      toId: 'north_road',                   travelPhases: 2 },

  { fromId: 'north_road',                toId: 'hallowmere_forest',            travelPhases: 2 },
  { fromId: 'hallowmere_forest',         toId: 'north_road',                   travelPhases: 2 },

  { fromId: 'east_marshes',              toId: 'river_crossing_south',         travelPhases: 2 },
  { fromId: 'river_crossing_south',      toId: 'east_marshes',                 travelPhases: 2 },

  { fromId: 'east_marshes',              toId: 'brightwater_hills',            travelPhases: 2 },
  { fromId: 'brightwater_hills',         toId: 'east_marshes',                 travelPhases: 2 },

  { fromId: 'brightwater_hills',         toId: 'river_crossing_north',         travelPhases: 2 },
  { fromId: 'river_crossing_north',      toId: 'brightwater_hills',            travelPhases: 2 },

  // ── Wilderness — longer road segments (3 phases) ──────────────────────────
  // Tessara → Varnhold via North Road: 2 + 3 = 5 phases total
  { fromId: 'north_road',                toId: 'varnhold_market_road',         travelPhases: 3 },
  { fromId: 'varnhold_market_road',      toId: 'north_road',                   travelPhases: 3 },

  // Tessara → Brightwater via river: 2 + 3 = 5 phases total
  { fromId: 'river_crossing_north',      toId: 'brightwater_village_green',    travelPhases: 3 },
  { fromId: 'brightwater_village_green', toId: 'river_crossing_north',         travelPhases: 3 },

  // River north → south (river road runs alongside)
  { fromId: 'river_crossing_north',      toId: 'river_crossing_south',         travelPhases: 3 },
  { fromId: 'river_crossing_south',      toId: 'river_crossing_north',         travelPhases: 3 },

  // River Crossing South → Port Halcyon: 2 phases (short coastal leg)
  { fromId: 'river_crossing_south',      toId: 'halcyon_harbour',              travelPhases: 2 },
  { fromId: 'halcyon_harbour',           toId: 'river_crossing_south',         travelPhases: 2 },

  // ── Sea route — Concord Isle (5 phases from Port Halcyon) ─────────────────
  { fromId: 'halcyon_harbour',           toId: 'concord_outer_ring',           travelPhases: 5 },
  { fromId: 'concord_outer_ring',        toId: 'halcyon_harbour',              travelPhases: 5 },

  // ── Stonebridge corridor — Aldermere → Khardun (3 phases each leg) ────────
  { fromId: 'varnhold_border_gate',      toId: 'stonebridge_south_gate',       travelPhases: 3 },
  { fromId: 'stonebridge_south_gate',    toId: 'varnhold_border_gate',         travelPhases: 3 },

  { fromId: 'stonebridge_south_gate',    toId: 'stonebridge_spine_pass',       travelPhases: 3 },
  { fromId: 'stonebridge_spine_pass',    toId: 'stonebridge_south_gate',       travelPhases: 3 },

  { fromId: 'stonebridge_spine_pass',    toId: 'stonebridge_north_gate',       travelPhases: 3 },
  { fromId: 'stonebridge_north_gate',    toId: 'stonebridge_spine_pass',       travelPhases: 3 },
];

// ─── Enemy roam definitions (per location) ────────────────────────────────────
// Phase 42h.5: all entries stubbed as empty arrays.
// Populate after Phase 42i (expanded monsters catalog).
// SAFE nodes never spawn roaming enemies.
// UNSAFE / HUMANOID_ONLY nodes receive 2–3 entries each; marked TODO below.

export const ENEMY_ROAM_DEFS: Record<string, EnemyRoamDef[]> = {
  // ── Tessara ───────────────────────────────────────────────────────────────
  tessara_market_square:    [],   // SAFE
  tessara_charter_hall:     [],   // SAFE, indoors
  tessara_arcane_collegium: [],   // SAFE, indoors
  tessara_dockside:         [],   // HUMANOID_ONLY — TODO Phase 42h.5
  tessara_slums:            [],   // HUMANOID_ONLY — TODO Phase 42h.5

  // ── Varnhold ──────────────────────────────────────────────────────────────
  varnhold_market_road:       [],   // SAFE
  varnhold_castle_district:   [],   // HUMANOID_ONLY — TODO Phase 42h.5
  varnhold_cathedral_solenne: [],   // SAFE, indoors
  varnhold_templar_barracks:  [],   // HUMANOID_ONLY — TODO Phase 42h.5
  varnhold_ledger_court_hall: [],   // HUMANOID_ONLY, indoors — TODO Phase 42h.5
  varnhold_border_gate:       [],   // UNSAFE — TODO Phase 42h.5
  varnhold_countryside_inn:   [],   // SAFE, indoors

  // ── Port Halcyon ──────────────────────────────────────────────────────────
  halcyon_harbour:       [],   // SAFE
  halcyon_salt_wharf:    [],   // HUMANOID_ONLY — TODO Phase 42h.5
  halcyon_merchant_row:  [],   // SAFE

  // ── Brightwater ───────────────────────────────────────────────────────────
  brightwater_village_green:    [],   // SAFE
  brightwater_hot_spring_baths: [],   // SAFE, indoors
  brightwater_roadside_shrine:  [],   // SAFE

  // ── Concord ───────────────────────────────────────────────────────────────
  concord_royal_quarter: [],   // SAFE (guards present)
  concord_charter_hq:    [],   // SAFE, indoors
  concord_guild_market:  [],   // SAFE
  concord_outer_ring:    [],   // UNSAFE — TODO Phase 42h.5

  // ── Ashvault ──────────────────────────────────────────────────────────────
  ashvault_ember_temple_approach:   [],   // UNSAFE — TODO Phase 42h.5
  ashvault_ember_temple_outer_ward: [],   // HUMANOID_ONLY — TODO Phase 42h.5
  ashvault_ember_temple_deep_level: [],   // HUMANOID_ONLY — TODO Phase 42h.5

  // ── Wilderness ────────────────────────────────────────────────────────────
  north_road:            [],   // UNSAFE — TODO Phase 42h.5
  east_marshes:          [],   // UNSAFE — TODO Phase 42h.5
  hallowmere_forest:     [],   // UNSAFE — TODO Phase 42h.5
  brightwater_hills:     [],   // UNSAFE — TODO Phase 42h.5
  river_crossing_north:  [],   // UNSAFE — TODO Phase 42h.5
  river_crossing_south:  [],   // UNSAFE — TODO Phase 42h.5

  // ── Stonebridge corridor ──────────────────────────────────────────────────
  stonebridge_south_gate: [],   // UNSAFE — TODO Phase 46c.1 (Khardun data)
  stonebridge_spine_pass: [],   // UNSAFE — TODO Phase 46c.1
  stonebridge_north_gate: [],   // UNSAFE — TODO Phase 46c.1

  // ── Retained stubs ────────────────────────────────────────────────────────
  manor_grounds: [],   // SAFE, indoors
  city_prison:   [],   // HUMANOID_ONLY — TODO Phase 42h.5
};

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/** Returns the WorldNode for a given id. Throws if not found. */
export function getWorldNode(id: string): WorldNode {
  const node = WORLD_NODES.find(n => n.id === id);
  if (!node) throw new Error(`WorldNode not found: "${id}"`);
  return node;
}

/** Returns the directed edge from→to, or undefined if no direct edge exists. */
export function getEdge(fromId: string, toId: string): WorldEdge | undefined {
  return WORLD_EDGES.find(e => e.fromId === fromId && e.toId === toId);
}

/** Returns all edges departing from a given node. */
export function getEdgesFrom(nodeId: string): WorldEdge[] {
  return WORLD_EDGES.filter(e => e.fromId === nodeId);
}

/** Returns all WorldNode ids directly reachable from nodeId (one hop). */
export function getAdjacentNodeIds(nodeId: string): string[] {
  return getEdgesFrom(nodeId).map(e => e.toId);
}

/** Returns roam defs for a location, or empty array if none authored yet. */
export function getEnemyRoamDefs(locationId: string): EnemyRoamDef[] {
  return ENEMY_ROAM_DEFS[locationId] ?? [];
}
