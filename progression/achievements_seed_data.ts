// ============================================================================
// OJISAN IN ANOTHER WORLD — ACHIEVEMENT SEED DATA
// Transcribes every achievement already referenced elsewhere (the 11 trophy
// tags in items_seed_data_part2.ts, Kink Connoisseur §26.4, Fast Travel Cost
// 0 §16, Cartographer from the original gap analysis) into real AchievementDef
// rows, plus a complete milestone set covering every major system this
// document specifies. Closes that line of the §2.2 backlog table.
// ============================================================================

import { AchievementDef } from "./schemas";

export const ACHIEVEMENTS: AchievementDef[] = [
  // --- Companion relationship milestones (Bronze/Silver — one per companion, matching the trophy set) ---
  { id: "ach_first_warmth", name: "First Warmth", tier: "SILVER", triggerCondition: "companion_movedin:mira", rewardApGrant: 3, rewardBpGrant: 0, titleGrant: "Kenji the Kind" },
  { id: "ach_archivists_surrender", name: "Archivist's Surrender", tier: "SILVER", triggerCondition: "companion_movedin:isolde", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_forge_of_gentle_strength", name: "Forge of Gentle Strength", tier: "SILVER", triggerCondition: "companion_movedin:grael", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_commanding_surrender", name: "Commanding Surrender", tier: "SILVER", triggerCondition: "companion_movedin:valka", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_moonlit_bioluminescence", name: "Moonlit Bioluminescence", tier: "SILVER", triggerCondition: "companion_movedin:seira", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_forest_communion", name: "Forest Communion", tier: "SILVER", triggerCondition: "companion_movedin:sylvara", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_uncorseted_truth", name: "Uncorseted Truth", tier: "SILVER", triggerCondition: "companion_movedin:reva", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_three_tails_entwined", name: "Three Tails Entwined", tier: "SILVER", triggerCondition: "companion_movedin:tasha", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_holy_awakening", name: "Holy Awakening", tier: "SILVER", triggerCondition: "companion_movedin:sera", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_empathic_resonance", name: "Empathic Resonance", tier: "SILVER", triggerCondition: "companion_movedin:lyra", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_master_of_equilibrium", name: "Master of Equilibrium", tier: "PLATINUM", triggerCondition: "all_ten_companions_movedin", rewardApGrant: 15, rewardBpGrant: 15, titleGrant: "Lord of Ardor Manor" },

  // --- Kink system (§26) ---
  { id: "ach_kink_connoisseur", name: "Kink Connoisseur", tier: "GOLD", triggerCondition: "every_companion_satisfiedkinkids_length_gte_1", rewardApGrant: 10, rewardBpGrant: 0 },
  { id: "ach_intimate_scholar", name: "Intimate Scholar", tier: "BRONZE", triggerCondition: "own_node:kink_encyclopedia", rewardApGrant: 0, rewardBpGrant: 0 },

  // --- World exploration / travel (§16, §18) ---
  { id: "ach_fast_travel_cost_0", name: "Fast Travel Cost 0", tier: "GOLD", triggerCondition: "fast_travel_cost_permanently_zero_unlocked", rewardApGrant: 0, rewardBpGrant: 0 },
  { id: "ach_cartographer", name: "Cartographer", tier: "SILVER", triggerCondition: "discoveredlocationids_length_equals_total_locations", rewardApGrant: 5, rewardBpGrant: 5, titleGrant: "The Cartographer" },
  { id: "ach_eighth_region", name: "Beyond the Maps", tier: "BRONZE", triggerCondition: "region_discovered:mountain_monastery", rewardApGrant: 2, rewardBpGrant: 0 }, // discovering the region the original maps never detailed

  // --- Main story progression (§24) ---
  { id: "ach_act1_complete", name: "The Awakening", tier: "BRONZE", triggerCondition: "storyflag_set:act1_complete", rewardApGrant: 0, rewardBpGrant: 0 },
  { id: "ach_act2_complete", name: "Archives of Aethermoor", tier: "BRONZE", triggerCondition: "storyflag_set:act2_complete", rewardApGrant: 0, rewardBpGrant: 0 },
  { id: "ach_act3_complete", name: "The March's End", tier: "BRONZE", triggerCondition: "storyflag_set:act3_complete", rewardApGrant: 0, rewardBpGrant: 0 },
  { id: "ach_act4_complete", name: "Voice of the World Tree", tier: "SILVER", triggerCondition: "storyflag_set:act4_complete", rewardApGrant: 0, rewardBpGrant: 0 },
  { id: "ach_act5_complete", name: "Velvet and Poison", tier: "SILVER", triggerCondition: "storyflag_set:act5_complete", rewardApGrant: 0, rewardBpGrant: 0 },
  { id: "ach_act6_complete", name: "The World Heart", tier: "GOLD", triggerCondition: "storyflag_set:act6_complete", rewardApGrant: 0, rewardBpGrant: 0 },
  { id: "ach_act7_complete", name: "Ascension", tier: "PLATINUM", triggerCondition: "storyflag_set:act7_complete", rewardApGrant: 20, rewardBpGrant: 20, titleGrant: "The One Who Cleansed Eranthis" },

  // --- Combat / purification (§4.4, §23) ---
  { id: "ach_first_purification", name: "Mercy in Miasma", tier: "BRONZE", triggerCondition: "first_enemy_defeatmethod_purified", rewardApGrant: 2, rewardBpGrant: 0 },
  { id: "ach_level_60", name: "Peak Condition", tier: "GOLD", triggerCondition: "player_level_equals_60", rewardApGrant: 0, rewardBpGrant: 10 },
  { id: "ach_bounty_cleared", name: "Clean Slate", tier: "BRONZE", triggerCondition: "activebountygold_paid_in_full_any_region", rewardApGrant: 0, rewardBpGrant: 2 },

  // --- Manor / economy (§14, §15) ---
  { id: "ach_manor_tier4", name: "Grand Estate", tier: "GOLD", triggerCondition: "manorstate_tier_equals_4", rewardApGrant: 5, rewardBpGrant: 5 },
  { id: "ach_master_crafter", name: "Artisan's Legacy", tier: "SILVER", triggerCondition: "total_items_crafted_gte_50", rewardApGrant: 0, rewardBpGrant: 5 },
  { id: "ach_fully_upgraded", name: "Perfected Steel", tier: "SILVER", triggerCondition: "any_item_upgradelevel_equals_3", rewardApGrant: 0, rewardBpGrant: 3 },

  // --- Lineage (§15.3 of the GDD) ---
  { id: "ach_first_child", name: "New Beginnings", tier: "SILVER", triggerCondition: "offspringnpc_count_gte_1", rewardApGrant: 3, rewardBpGrant: 0 },
  { id: "ach_full_nursery", name: "A Full House", tier: "GOLD", triggerCondition: "offspringnpc_count_gte_10", rewardApGrant: 8, rewardBpGrant: 0 },
];
