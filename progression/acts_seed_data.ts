// ============================================================================
// OJISAN IN ANOTHER WORLD — ACT/CHAPTER SEED DATA (Acts 2-7)
// Follows requirements.md §24's Act 1 pattern exactly. Closes that line of
// the §2.2 backlog table.
//
// Resolution note on Sera's "Act 4/5" world-map tag: ActDef.region is
// singular, and the map ties Whispering Wood to Act 4 (Sylvara) and Auric
// Court to Act 5 (Reva/Lyra) as the two primary regions. Sera's Mountain
// Monastery content doesn't get its own dedicated Act slot — her personal
// progression already runs on the separate, Act-independent questChainId
// system every companion uses (§4.2), which is exactly what "her arc spans
// Act 4 into Act 5" most likely means: available concurrently, not gated by
// a specific Act's chapter completion. This is a documented interpretation,
// not an invented mechanic — flagged here rather than silently assumed.
// ============================================================================

import { ActDef, ChapterDef, Region } from "./schemas";

// ----------------------------------------------------------------------------
// ACT 2 — Aethermoor (Isolde)
// ----------------------------------------------------------------------------

export const act2: ActDef = {
  actNumber: 2,
  displayName: "Archives of Aethermoor",
  region: Region.Aethermoor,
  chapterIds: ["act2_ch1", "act2_ch2", "act2_ch3", "act2_ch4", "act2_ch5"],
  completionStoryFlag: "act2_complete",
  astraeaApprovalOnCompletion: 25,
};

export const ACT2_CHAPTERS: ChapterDef[] = [
  { id: "act2_ch1", actNumber: 2, chapterNumber: 1, displayName: "Arrival at the North Gate", prerequisiteChapterId: null, associatedQuestIds: ["am_encounter_bandit_toll"] },
  { id: "act2_ch2", actNumber: 2, chapterNumber: 2, displayName: "The Archivist's Warning", prerequisiteChapterId: "act2_ch1", associatedQuestIds: ["am_encounter_rogue_arcanist_duel"] },
  { id: "act2_ch3", actNumber: 2, chapterNumber: 3, displayName: "Descent into the Old Underground Temple", prerequisiteChapterId: "act2_ch2", associatedQuestIds: ["am_encounter_golem_workshop"] },
  { id: "act2_ch4", actNumber: 2, chapterNumber: 4, displayName: "The Ancient Miasma Archive", prerequisiteChapterId: "act2_ch3", associatedQuestIds: ["am_encounter_sentinel_patrol"] },
  { id: "act2_ch5", actNumber: 2, chapterNumber: 5, displayName: "The Miasma Wraith Archivist (Boss)", prerequisiteChapterId: "act2_ch4", associatedQuestIds: ["am_encounter_archivist_boss"], cutsceneTriggerId: "astraea_dream_vision_act2_end", unlocksRegion: Region.CrimsonMarch },
];

// ----------------------------------------------------------------------------
// ACT 3 — Crimson March (Valka, Seira)
// ----------------------------------------------------------------------------

export const act3: ActDef = {
  actNumber: 3,
  displayName: "The March's End",
  region: Region.CrimsonMarch,
  chapterIds: ["act3_ch1", "act3_ch2", "act3_ch3", "act3_ch4", "act3_ch5"],
  completionStoryFlag: "act3_complete",
  astraeaApprovalOnCompletion: 25,
};

export const ACT3_CHAPTERS: ChapterDef[] = [
  { id: "act3_ch1", actNumber: 3, chapterNumber: 1, displayName: "Between Two Fortresses", prerequisiteChapterId: null, associatedQuestIds: ["cm_encounter_deserter_camp"] },
  { id: "act3_ch2", actNumber: 3, chapterNumber: 2, displayName: "The Parley Ground", prerequisiteChapterId: "act3_ch1", associatedQuestIds: ["cm_encounter_medic_convoy"] },
  { id: "act3_ch3", actNumber: 3, chapterNumber: 3, displayName: "Tremors in the Wyrmling Nest", prerequisiteChapterId: "act3_ch2", associatedQuestIds: ["cm_encounter_wyrmling_nest"] },
  { id: "act3_ch4", actNumber: 3, chapterNumber: 4, displayName: "The Neutral Border Town Falls Silent", prerequisiteChapterId: "act3_ch3", associatedQuestIds: ["cm_encounter_mixed_patrol"] },
  { id: "act3_ch5", actNumber: 3, chapterNumber: 5, displayName: "The Miasma Wyrm of the Emergence Crater (Boss)", prerequisiteChapterId: "act3_ch4", associatedQuestIds: ["cm_encounter_wyrm_boss"], cutsceneTriggerId: "astraea_dream_vision_act3_end", unlocksRegion: Region.WhisperingWood },
];

// ----------------------------------------------------------------------------
// ACT 4 — Whispering Wood (Sylvara)
// ----------------------------------------------------------------------------

export const act4: ActDef = {
  actNumber: 4,
  displayName: "Voice of the World Tree",
  region: Region.WhisperingWood,
  chapterIds: ["act4_ch1", "act4_ch2", "act4_ch3", "act4_ch4", "act4_ch5"],
  completionStoryFlag: "act4_complete",
  astraeaApprovalOnCompletion: 25,
};

export const ACT4_CHAPTERS: ChapterDef[] = [
  { id: "act4_ch1", actNumber: 4, chapterNumber: 1, displayName: "The Misty Treeline", prerequisiteChapterId: null, associatedQuestIds: ["ww_encounter_panther_stalk"] },
  { id: "act4_ch2", actNumber: 4, chapterNumber: 2, displayName: "The Grief Memory Pool", prerequisiteChapterId: "act4_ch1", associatedQuestIds: ["ww_encounter_nymph_grove"] },
  { id: "act4_ch3", actNumber: 4, chapterNumber: 3, displayName: "Sylvara's Clearing", prerequisiteChapterId: "act4_ch2", associatedQuestIds: ["ww_encounter_cult_scout_ambush"] },
  { id: "act4_ch4", actNumber: 4, chapterNumber: 4, displayName: "Spirit Ruins and the Incubus Glade", prerequisiteChapterId: "act4_ch3", associatedQuestIds: ["ww_encounter_incubus_glade"] },
  { id: "act4_ch5", actNumber: 4, chapterNumber: 5, displayName: "The Heartwood Abomination, World Tree Core (Boss)", prerequisiteChapterId: "act4_ch4", associatedQuestIds: ["ww_encounter_heartwood_boss"], cutsceneTriggerId: "astraea_dream_vision_act4_end", unlocksRegion: Region.AuricCourt },
];

// ----------------------------------------------------------------------------
// ACT 5 — Auric Court (Reva, Lyra)
// ----------------------------------------------------------------------------

export const act5: ActDef = {
  actNumber: 5,
  displayName: "Velvet and Poison",
  region: Region.AuricCourt,
  chapterIds: ["act5_ch1", "act5_ch2", "act5_ch3", "act5_ch4", "act5_ch5"],
  completionStoryFlag: "act5_complete",
  astraeaApprovalOnCompletion: 25,
};

export const ACT5_CHAPTERS: ChapterDef[] = [
  { id: "act5_ch1", actNumber: 5, chapterNumber: 1, displayName: "Through the Golden City Gates", prerequisiteChapterId: null, associatedQuestIds: ["ac_encounter_cultist_patrol"] },
  { id: "act5_ch2", actNumber: 5, chapterNumber: 2, displayName: "The Masquerade Ball", prerequisiteChapterId: "act5_ch1", associatedQuestIds: ["ac_encounter_enforcer_guard"], cutsceneTriggerId: "velvet_and_poison_masquerade" }, // Banquet Hall/Ballroom, nightOnlyAccess — matches the Masquerade Ball Gown/Formal Court Suit content
  { id: "act5_ch3", actNumber: 5, chapterNumber: 3, displayName: "A Game of Shadows", prerequisiteChapterId: "act5_ch2", associatedQuestIds: ["ac_encounter_undercroft_sweep"] }, // nighttime infiltration beat already referenced elsewhere in this document
  { id: "act5_ch4", actNumber: 5, chapterNumber: 4, displayName: "Reva's Secret Ledger", prerequisiteChapterId: "act5_ch3", associatedQuestIds: [], cutsceneTriggerId: "revas_secret_archive_discovered" }, // resolves at ac_secret_archive, nightOnlyAccess + requiresStealthCheck
  { id: "act5_ch5", actNumber: 5, chapterNumber: 5, displayName: "High Inquisitor Malakor & the Miasma Succubus (Boss)", prerequisiteChapterId: "act5_ch4", associatedQuestIds: ["auric_court_malakor_succubus_boss"], cutsceneTriggerId: "astraea_dream_vision_act5_end", unlocksRegion: Region.SunkenSanctum }, // the hybrid boss pairing already authored in §23.2
];

// ----------------------------------------------------------------------------
// ACT 6 — Sunken Sanctum (World Core)
// ----------------------------------------------------------------------------

export const act6: ActDef = {
  actNumber: 6,
  displayName: "The World Heart",
  region: Region.SunkenSanctum,
  chapterIds: ["act6_ch1", "act6_ch2", "act6_ch3", "act6_ch4", "act6_ch5"],
  completionStoryFlag: "act6_complete",
  astraeaApprovalOnCompletion: 25,
};

export const ACT6_CHAPTERS: ChapterDef[] = [
  { id: "act6_ch1", actNumber: 6, chapterNumber: 1, displayName: "Tier 1: Echo Halls — Bonds of the First Three", prerequisiteChapterId: null, associatedQuestIds: ["ss_encounter_stalker_pack"] }, // tests companions 1-3's bonds, per §18.6
  { id: "act6_ch2", actNumber: 6, chapterNumber: 2, displayName: "Tier 2: Memory Vault — Bonds of the Middle Four", prerequisiteChapterId: "act6_ch1", associatedQuestIds: ["ss_encounter_remnant_watch"] },
  { id: "act6_ch3", actNumber: 6, chapterNumber: 3, displayName: "Tier 3: Locked Heart — Bonds of the Final Three", prerequisiteChapterId: "act6_ch2", associatedQuestIds: ["ss_encounter_ruin_guardian"] },
  { id: "act6_ch4", actNumber: 6, chapterNumber: 4, displayName: "The Void Herald's Rift", prerequisiteChapterId: "act6_ch3", associatedQuestIds: ["ss_encounter_void_herald_miniboss"] },
  { id: "act6_ch5", actNumber: 6, chapterNumber: 5, displayName: "The Void Concubine, World Heart Convergence (Boss)", prerequisiteChapterId: "act6_ch4", associatedQuestIds: ["ss_encounter_void_concubine_boss"], cutsceneTriggerId: "astraea_descends_world_heart_convergence", unlocksRegion: Region.CelestialThreshold },
];

// ----------------------------------------------------------------------------
// ACT 7 — Celestial Threshold (Finale) — shorter, hand-scripted, matching
// §5.11's note that this region is a one-off and not a reusable pool.
// ----------------------------------------------------------------------------

export const act7: ActDef = {
  actNumber: 7,
  displayName: "Ascension",
  region: Region.CelestialThreshold,
  chapterIds: ["act7_ch1", "act7_ch2", "act7_ch3"],
  completionStoryFlag: "act7_complete",
  astraeaApprovalOnCompletion: 0, // the finale doesn't grant further Approval — there's no region left to purge afterward
};

export const ACT7_CHAPTERS: ChapterDef[] = [
  { id: "act7_ch1", actNumber: 7, chapterNumber: 1, displayName: "The Celestial Stairway", prerequisiteChapterId: null, associatedQuestIds: [] },
  { id: "act7_ch2", actNumber: 7, chapterNumber: 2, displayName: "Threshold Approach", prerequisiteChapterId: "act7_ch1", associatedQuestIds: [] },
  { id: "act7_ch3", actNumber: 7, chapterNumber: 3, displayName: "The Primordial Ache (Final Boss)", prerequisiteChapterId: "act7_ch2", associatedQuestIds: ["ct_encounter_primordial_ache_final"], cutsceneTriggerId: "game_ending_resolution" }, // Combat vs. Compassion Path resolution, per the GDD's Phase 3A/3B — see requirements.md §26 Combat Skill Tree note on The Last Sincere Blow
];

export const ALL_ACTS: ActDef[] = [act2, act3, act4, act5, act6, act7];
export const ALL_CHAPTERS: ChapterDef[] = [
  ...ACT2_CHAPTERS, ...ACT3_CHAPTERS, ...ACT4_CHAPTERS, ...ACT5_CHAPTERS, ...ACT6_CHAPTERS, ...ACT7_CHAPTERS,
];
