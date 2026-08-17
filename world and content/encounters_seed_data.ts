// ============================================================================
// OJISAN IN ANOTHER WORLD — ENCOUNTER SEED DATA
// Groups every already-authored EnemyCombatantDef (enemies_seed_data.ts,
// enemies_seed_data_part2.ts, and the 5 originals in requirements.md §23.2)
// into real per-region EncounterDef rosters. Closes that line of the §2.2
// backlog table — a real per-region roster, not just the 2 illustrative
// examples that existed before this pass (§9's direwolf pack, §23.2's Act 5
// hybrid boss pairing).
//
// Mountain Monastery now has real entries below, using
// mountain_monastery_enemies_seed_data.ts's roster (added in a later pass —
// this file's Mountain Monastery section was empty when first authored).
// ============================================================================

import { EncounterDef, Region } from "./schemas";

export const ENCOUNTERS: EncounterDef[] = [
  // --- VERDANT VALE (1-8) ---
  { id: "vv_encounter_direwolf_pack", region: Region.VerdantVale, enemyGroup: [{ enemyDefId: "blighted_direwolf", count: 3 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [20, 40], rewardXp: 30, rewardItemIds: [] },
  { id: "vv_encounter_boar_sounder", region: Region.VerdantVale, enemyGroup: [{ enemyDefId: "feral_boar", count: 2 }, { enemyDefId: "blighted_direwolf", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [15, 35], rewardXp: 25, rewardItemIds: [] },
  { id: "vv_encounter_dryad_ambush", region: Region.VerdantVale, enemyGroup: [{ enemyDefId: "corrupted_dryad_sprite", count: 1 }, { enemyDefId: "feral_boar", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [25, 45], rewardXp: 35, rewardItemIds: [] },
  { id: "vv_encounter_highwayman_toll", region: Region.VerdantVale, enemyGroup: [{ enemyDefId: "highwayman_poacher", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [20, 40], rewardXp: 30, rewardItemIds: [] },
  { id: "vv_encounter_feral_patrol", region: Region.VerdantVale, enemyGroup: [{ enemyDefId: "vale_guardsman_turned_feral", count: 2 }, { enemyDefId: "highwayman_poacher", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [30, 55], rewardXp: 40, rewardItemIds: [] },
  { id: "vv_encounter_ley_node_boss", region: Region.VerdantVale, enemyGroup: [{ enemyDefId: "blighted_treant", count: 1 }], maxSimultaneousEnemies: 1, isBossEncounter: true, bossScriptId: "act1_treant_phase_script", rewardGoldRange: [150, 220], rewardXp: 200, rewardItemIds: [] },

  // --- AETHERMOOR (6-14) ---
  { id: "am_encounter_wraith_study", region: Region.Aethermoor, enemyGroup: [{ enemyDefId: "miasma_wraith_scholar", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [40, 70], rewardXp: 50, rewardItemIds: [] },
  { id: "am_encounter_rogue_arcanist_duel", region: Region.Aethermoor, enemyGroup: [{ enemyDefId: "rogue_arcanist", count: 1 }, { enemyDefId: "bandit_reaver", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [45, 75], rewardXp: 55, rewardItemIds: [] },
  { id: "am_encounter_bandit_toll", region: Region.Aethermoor, enemyGroup: [{ enemyDefId: "bandit_reaver", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [30, 55], rewardXp: 40, rewardItemIds: [] },
  { id: "am_encounter_sentinel_patrol", region: Region.Aethermoor, enemyGroup: [{ enemyDefId: "academy_sentinel_corrupted", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [35, 65], rewardXp: 45, rewardItemIds: [] },
  { id: "am_encounter_golem_workshop", region: Region.Aethermoor, enemyGroup: [{ enemyDefId: "rogue_battle_golem", count: 1 }, { enemyDefId: "academy_sentinel_corrupted", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [60, 100], rewardXp: 70, rewardItemIds: [] },
  { id: "am_encounter_archivist_boss", region: Region.Aethermoor, enemyGroup: [{ enemyDefId: "miasma_wraith_archivist", count: 1 }], maxSimultaneousEnemies: 1, isBossEncounter: true, bossScriptId: "act2_archivist_phase_script", rewardGoldRange: [300, 450], rewardXp: 350, rewardItemIds: [] },

  // --- CRIMSON MARCH (12-22) ---
  { id: "cm_encounter_deserter_camp", region: Region.CrimsonMarch, enemyGroup: [{ enemyDefId: "war_torn_deserter_grunt", count: 2 }, { enemyDefId: "deserter_mercenary", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [65, 110], rewardXp: 80, rewardItemIds: [] },
  { id: "cm_encounter_medic_convoy", region: Region.CrimsonMarch, enemyGroup: [{ enemyDefId: "corrupted_war_medic", count: 1 }, { enemyDefId: "war_torn_deserter_grunt", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [70, 120], rewardXp: 85, rewardItemIds: [] },
  { id: "cm_encounter_wyrmling_nest", region: Region.CrimsonMarch, enemyGroup: [{ enemyDefId: "crimson_wyrmling", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [90, 140], rewardXp: 100, rewardItemIds: [] },
  { id: "cm_encounter_mixed_patrol", region: Region.CrimsonMarch, enemyGroup: [{ enemyDefId: "deserter_mercenary", count: 1 }, { enemyDefId: "crimson_wyrmling", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [85, 135], rewardXp: 95, rewardItemIds: [] },
  { id: "cm_encounter_wyrm_boss", region: Region.CrimsonMarch, enemyGroup: [{ enemyDefId: "miasma_wyrm", count: 1 }], maxSimultaneousEnemies: 1, isBossEncounter: true, bossScriptId: "act3_wyrm_phase_script", rewardGoldRange: [600, 900], rewardXp: 550, rewardItemIds: [] },

  // --- WHISPERING WOOD (18-28) ---
  { id: "ww_encounter_panther_stalk", region: Region.WhisperingWood, enemyGroup: [{ enemyDefId: "shadow_panther", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [95, 145], rewardXp: 105, rewardItemIds: [] },
  { id: "ww_encounter_nymph_grove", region: Region.WhisperingWood, enemyGroup: [{ enemyDefId: "corrupted_grove_nymph", count: 1 }, { enemyDefId: "corrupted_dryad_warden", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [100, 155], rewardXp: 115, rewardItemIds: [] },
  { id: "ww_encounter_cult_scout_ambush", region: Region.WhisperingWood, enemyGroup: [{ enemyDefId: "feral_cult_scout", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [110, 165], rewardXp: 125, rewardItemIds: [] },
  { id: "ww_encounter_incubus_glade", region: Region.WhisperingWood, enemyGroup: [{ enemyDefId: "corrupted_incubus", count: 1 }, { enemyDefId: "shadow_panther", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [105, 160], rewardXp: 120, rewardItemIds: [] },
  { id: "ww_encounter_heartwood_boss", region: Region.WhisperingWood, enemyGroup: [{ enemyDefId: "heartwood_abomination", count: 1 }], maxSimultaneousEnemies: 1, isBossEncounter: true, bossScriptId: "act4_abomination_phase_script", rewardGoldRange: [900, 1300], rewardXp: 750, rewardItemIds: [] },

  // --- AURIC COURT (24-34) — the Malakor/Succubus hybrid boss pairing already
  // exists as act5HybridBossEncounter in requirements.md §23.2; not duplicated here.
  { id: "ac_encounter_cultist_patrol", region: Region.AuricCourt, enemyGroup: [{ enemyDefId: "miasma_cultist_priestess", count: 1 }, { enemyDefId: "miasma_cultist_grunt", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [130, 190], rewardXp: 140, rewardItemIds: [] },
  { id: "ac_encounter_enforcer_guard", region: Region.AuricCourt, enemyGroup: [{ enemyDefId: "cult_enforcer", count: 1 }, { enemyDefId: "miasma_cultist_grunt", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [140, 200], rewardXp: 150, rewardItemIds: [] },
  { id: "ac_encounter_undercroft_sweep", region: Region.AuricCourt, enemyGroup: [{ enemyDefId: "miasma_cultist_grunt", count: 3 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [110, 170], rewardXp: 125, rewardItemIds: [] },

  // --- SUNKEN SANCTUM (30-45) ---
  { id: "ss_encounter_stalker_pack", region: Region.SunkenSanctum, enemyGroup: [{ enemyDefId: "void_stalker", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [200, 280], rewardXp: 180, rewardItemIds: [] },
  { id: "ss_encounter_remnant_watch", region: Region.SunkenSanctum, enemyGroup: [{ enemyDefId: "sanctum_cultist_remnant", count: 1 }, { enemyDefId: "sanctum_guard_remnant", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [220, 310], rewardXp: 200, rewardItemIds: [] },
  { id: "ss_encounter_ruin_guardian", region: Region.SunkenSanctum, enemyGroup: [{ enemyDefId: "ancient_ruin_guardian", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [250, 400], rewardXp: 220, rewardItemIds: [] },
  { id: "ss_encounter_void_herald_miniboss", region: Region.SunkenSanctum, enemyGroup: [{ enemyDefId: "void_herald", count: 1 }], maxSimultaneousEnemies: 1, isBossEncounter: true, bossScriptId: "act6_herald_phase_script", rewardGoldRange: [700, 1000], rewardXp: 600, rewardItemIds: [] },
  { id: "ss_encounter_void_concubine_boss", region: Region.SunkenSanctum, enemyGroup: [{ enemyDefId: "void_concubine_boss", count: 1 }], maxSimultaneousEnemies: 1, isBossEncounter: true, bossScriptId: "act6_concubine_phase_script", rewardGoldRange: [1200, 1800], rewardXp: 1000, rewardItemIds: [] },

  // --- CELESTIAL THRESHOLD (Act 7 finale, one-off) ---
  { id: "ct_encounter_primordial_ache_final", region: Region.CelestialThreshold, enemyGroup: [{ enemyDefId: "primordial_ache", count: 1 }], maxSimultaneousEnemies: 1, isBossEncounter: true, bossScriptId: "act7_primordial_ache_phase_script", rewardGoldRange: [0, 0], rewardXp: 2000, rewardItemIds: [] },

  // --- MOUNTAIN MONASTERY (22-32) ---
  { id: "mm_encounter_wolf_pack", region: Region.MountainMonastery, enemyGroup: [{ enemyDefId: "corrupted_mountain_wolf", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [140, 220], rewardXp: 150, rewardItemIds: [] },
  { id: "mm_encounter_penitent_patrol", region: Region.MountainMonastery, enemyGroup: [{ enemyDefId: "fallen_penitent", count: 1 }, { enemyDefId: "corrupted_bell_keeper", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [160, 250], rewardXp: 170, rewardItemIds: [] },
  { id: "mm_encounter_choir_and_flagellant", region: Region.MountainMonastery, enemyGroup: [{ enemyDefId: "ashen_choir_sister", count: 1 }, { enemyDefId: "penitent_flagellant", count: 1 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [190, 285], rewardXp: 195, rewardItemIds: [] },
  { id: "mm_encounter_ash_wraith_vigil", region: Region.MountainMonastery, enemyGroup: [{ enemyDefId: "ash_veiled_wraith", count: 2 }], maxSimultaneousEnemies: 6, isBossEncounter: false, rewardGoldRange: [220, 320], rewardXp: 220, rewardItemIds: [] },
  { id: "mm_encounter_seras_shadow_miniboss", region: Region.MountainMonastery, enemyGroup: [{ enemyDefId: "seras_shadow", count: 1 }], maxSimultaneousEnemies: 1, isBossEncounter: true, bossScriptId: "act4_5_seras_shadow_phase_script", rewardGoldRange: [350, 500], rewardXp: 400, rewardItemIds: [] },
  { id: "mm_encounter_ashen_penitent_mother_boss", region: Region.MountainMonastery, enemyGroup: [{ enemyDefId: "ashen_penitent_mother", count: 1 }], maxSimultaneousEnemies: 1, isBossEncounter: true, bossScriptId: "act4_5_ashen_penitent_mother_phase_script", rewardGoldRange: [1000, 1400], rewardXp: 900, rewardItemIds: [] },
];
