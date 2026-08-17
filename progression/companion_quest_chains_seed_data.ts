// ============================================================================
// OJISAN IN ANOTHER WORLD — COMPANION QUEST CHAIN SEED DATA
// Closes the structural gap the dialogue audit surfaced: every root node in
// dialogue_mira_seed_data.ts / dialogue_companions_seed_data.ts is gated on
// QUEST_STAGE_AT_LEAST 1 through 7, but only ONE QuestDef existed anywhere
// (miraStage1Quest, requirements.md §9) to actually advance a companion's
// questStage. This file provides the other 69: Mira's stages 2-7 (6), and
// all 7 stages for the other 9 companions (63) — 6 + 63 = 69.
//
// THE WIRING (requirements.md §5.6's new rule): completing a
// QuestType.Companion quest advances that companion's questStage by 1. Each
// stage N quest here is gated on Stage N-1's dialogue setsStoryFlag —
// meaning the actual gameplay loop is: complete Stage N quest -> questStage
// increments -> Stage N dialogue unlocks (QUEST_STAGE_AT_LEAST N) -> that
// dialogue's setsStoryFlag fires on completion -> which is Stage N+1's
// quest prerequisite. A closed loop, not a one-way assumption.
//
// Stage 1 quests are gated on the Act that unlocks each companion's
// homeRegion (Verdant Vale companions are available from game start;
// Aethermoor companions need act1_complete; Crimson March needs
// act2_complete; Whispering Wood needs act3_complete; Auric Court needs
// act4_complete; Sera's Mountain Monastery isn't tied to the main Act chain
// per acts_seed_data.ts's own note on her concurrent arc, so she's gated at
// act3_complete to match her established "Act 4/5" framing).
// ============================================================================

import { QuestDef, QuestType, Region, CompanionId } from "./schemas";

// ----------------------------------------------------------------------------
// MIRA — Stages 2-7 only (Stage 1 already exists as miraStage1Quest, §9)
// ----------------------------------------------------------------------------

export const MIRA_QUEST_CHAIN: QuestDef[] = [
  { id: "mira_chain_stage_1", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Mira, prerequisiteFlags: ["act1_chapter1_started"], objectives: [{ id: "obj1", description: "Rescue Mira from blighted wolves", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 25, rewardReputationDelta: 5, rewardItemIds: [], },
  { id: "mira_chain_stage_2", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Mira, prerequisiteFlags: ["mira_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Mira tend the herb garden and thin the moon-mint before frost", targetCount: 1, currentCount: 0 }], rewardGold: 20, rewardXp: 30, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "mira_chain_stage_3", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Mira, prerequisiteFlags: ["mira_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Sit with Mira at the shrine altar as she opens up about her mother", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 40, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "mira_chain_stage_4", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Mira, prerequisiteFlags: ["mira_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there when Mira finally confesses her feelings", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 50, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "mira_chain_stage_5", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Mira, prerequisiteFlags: ["mira_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Mira move her things into Ardor Manor", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 40, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "mira_chain_stage_6", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Mira, prerequisiteFlags: ["mira_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Sit with Mira and old Yorna through her final days", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 60, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "mira_chain_stage_7", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Mira, prerequisiteFlags: ["mira_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Return to the shrine altar with Mira, years of history behind you both", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 80, rewardReputationDelta: 15, rewardItemIds: [] },
];

// ----------------------------------------------------------------------------
// ISOLDE — Aethermoor, all 7 stages, gated on act1_complete
// ----------------------------------------------------------------------------

export const ISOLDE_QUEST_CHAIN: QuestDef[] = [
  { id: "isolde_chain_stage_1", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Isolde, prerequisiteFlags: ["act1_complete"], objectives: [{ id: "obj1", description: "Clear the golem infestation from the Grand Library's lower stacks", targetCount: 1, currentCount: 0 }], rewardGold: 30, rewardXp: 35, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "isolde_chain_stage_2", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Isolde, prerequisiteFlags: ["isolde_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Return to the Archive and spend time with Isolde among the stacks", targetCount: 1, currentCount: 0 }], rewardGold: 20, rewardXp: 40, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "isolde_chain_stage_3", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Isolde, prerequisiteFlags: ["isolde_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Listen as Isolde recounts her broken engagement", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 45, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "isolde_chain_stage_4", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Isolde, prerequisiteFlags: ["isolde_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there for Isolde's confession, eleven drafts and all", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 55, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "isolde_chain_stage_5", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Isolde, prerequisiteFlags: ["isolde_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Isolde establish her study in the Manor's east wing", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 45, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "isolde_chain_stage_6", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Isolde, prerequisiteFlags: ["isolde_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Support Isolde through the discovery of her former fiancé's fate", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 65, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "isolde_chain_stage_7", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Isolde, prerequisiteFlags: ["isolde_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Read the first page of the book Isolde has started writing for you both", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 85, rewardReputationDelta: 15, rewardItemIds: [] },
];

// ----------------------------------------------------------------------------
// GRAEL — Verdant Vale, all 7 stages, available from game start
// ----------------------------------------------------------------------------

export const GRAEL_QUEST_CHAIN: QuestDef[] = [
  { id: "grael_chain_stage_1", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Grael, prerequisiteFlags: [], objectives: [{ id: "obj1", description: "Clear the raiders off the South Highway near Grael's smithy", targetCount: 1, currentCount: 0 }], rewardGold: 30, rewardXp: 35, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "grael_chain_stage_2", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Grael, prerequisiteFlags: ["grael_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Spend a shift helping out at Grael's forge", targetCount: 1, currentCount: 0 }], rewardGold: 20, rewardXp: 40, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "grael_chain_stage_3", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Grael, prerequisiteFlags: ["grael_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Listen as Grael opens up about being a half-orc in the Vale", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 45, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "grael_chain_stage_4", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Grael, prerequisiteFlags: ["grael_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there for Grael's plain, sincere confession", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 55, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "grael_chain_stage_5", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Grael, prerequisiteFlags: ["grael_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Grael set up her own forge corner at Ardor Manor", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 45, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "grael_chain_stage_6", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Grael, prerequisiteFlags: ["grael_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Support Grael as her old mercenary crew comes calling", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 65, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "grael_chain_stage_7", type: QuestType.Companion, region: Region.VerdantVale, questGiverId: CompanionId.Grael, prerequisiteFlags: ["grael_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Receive the ring Grael forged with her own hands", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 85, rewardReputationDelta: 15, rewardItemIds: [] },
];

// ----------------------------------------------------------------------------
// VALKA — Crimson March, all 7 stages, gated on act2_complete
// ----------------------------------------------------------------------------

export const VALKA_QUEST_CHAIN: QuestDef[] = [
  { id: "valka_chain_stage_1", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Valka, prerequisiteFlags: ["act2_complete"], objectives: [{ id: "obj1", description: "Fight alongside Commander Valka against the deserter camp", targetCount: 1, currentCount: 0 }], rewardGold: 40, rewardXp: 45, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "valka_chain_stage_2", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Valka, prerequisiteFlags: ["valka_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Prove your worth to the garrison at Eastmarch Fortress", targetCount: 1, currentCount: 0 }], rewardGold: 25, rewardXp: 50, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "valka_chain_stage_3", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Valka, prerequisiteFlags: ["valka_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Learn what her clan's warlord expectations cost Valka", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 55, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "valka_chain_stage_4", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Valka, prerequisiteFlags: ["valka_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there for Valka's confession, decisive as an order", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 65, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "valka_chain_stage_5", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Valka, prerequisiteFlags: ["valka_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Valka relocate her command to Ardor Manor", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 55, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "valka_chain_stage_6", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Valka, prerequisiteFlags: ["valka_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Support Valka as her clan summons her back to take up the warlord's mantle", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 75, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "valka_chain_stage_7", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Valka, prerequisiteFlags: ["valka_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Stand beside Valka in the one war she's chosen to keep fighting", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 95, rewardReputationDelta: 15, rewardItemIds: [] },
];

// ----------------------------------------------------------------------------
// SEIRA — Crimson March, all 7 stages, gated on act2_complete
// ----------------------------------------------------------------------------

export const SEIRA_QUEST_CHAIN: QuestDef[] = [
  { id: "seira_chain_stage_1", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Seira, prerequisiteFlags: ["act2_complete"], objectives: [{ id: "obj1", description: "Hold the barricades alongside General Seira", targetCount: 1, currentCount: 0 }], rewardGold: 40, rewardXp: 45, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "seira_chain_stage_2", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Seira, prerequisiteFlags: ["seira_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Visit Seira at Westmarch Encampment after dark", targetCount: 1, currentCount: 0 }], rewardGold: 25, rewardXp: 50, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "seira_chain_stage_3", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Seira, prerequisiteFlags: ["seira_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Learn the complicated truth of why Seira left her homeland", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 55, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "seira_chain_stage_4", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Seira, prerequisiteFlags: ["seira_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there for Seira's confession, planned and then abandoned entirely", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 65, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "seira_chain_stage_5", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Seira, prerequisiteFlags: ["seira_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Seira settle into the Manor's night garden", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 55, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "seira_chain_stage_6", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Seira, prerequisiteFlags: ["seira_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Support Seira as riders from her homeland arrive demanding answers", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 75, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "seira_chain_stage_7", type: QuestType.Companion, region: Region.CrimsonMarch, questGiverId: CompanionId.Seira, prerequisiteFlags: ["seira_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Seira make lasting peace with her homeland and her past", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 95, rewardReputationDelta: 15, rewardItemIds: [] },
];

// ----------------------------------------------------------------------------
// SYLVARA — Whispering Wood, all 7 stages, gated on act3_complete
// ----------------------------------------------------------------------------

export const SYLVARA_QUEST_CHAIN: QuestDef[] = [
  { id: "sylvara_chain_stage_1", type: QuestType.Companion, region: Region.WhisperingWood, questGiverId: CompanionId.Sylvara, prerequisiteFlags: ["act3_complete"], objectives: [{ id: "obj1", description: "Earn welcome past the Misty Treeline into Sylvara's Clearing", targetCount: 1, currentCount: 0 }], rewardGold: 50, rewardXp: 55, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "sylvara_chain_stage_2", type: QuestType.Companion, region: Region.WhisperingWood, questGiverId: CompanionId.Sylvara, prerequisiteFlags: ["sylvara_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Return often to the grove and let the roots recognize your footsteps", targetCount: 1, currentCount: 0 }], rewardGold: 30, rewardXp: 60, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "sylvara_chain_stage_3", type: QuestType.Companion, region: Region.WhisperingWood, questGiverId: CompanionId.Sylvara, prerequisiteFlags: ["sylvara_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Sit with Sylvara through centuries of quiet loneliness, finally spoken aloud", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 65, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "sylvara_chain_stage_4", type: QuestType.Companion, region: Region.WhisperingWood, questGiverId: CompanionId.Sylvara, prerequisiteFlags: ["sylvara_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there for Sylvara's confession, a heart stirred after a thousand seasons still", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 75, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "sylvara_chain_stage_5", type: QuestType.Companion, region: Region.WhisperingWood, questGiverId: CompanionId.Sylvara, prerequisiteFlags: ["sylvara_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Sylvara take root in a corner of the Manor gardens", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 65, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "sylvara_chain_stage_6", type: QuestType.Companion, region: Region.WhisperingWood, questGiverId: CompanionId.Sylvara, prerequisiteFlags: ["sylvara_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Sylvara investigate the World Tree's ailing roots", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 85, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "sylvara_chain_stage_7", type: QuestType.Companion, region: Region.WhisperingWood, questGiverId: CompanionId.Sylvara, prerequisiteFlags: ["sylvara_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Watch new blossoms open with Sylvara, a thousand more seasons ahead of you both", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 105, rewardReputationDelta: 15, rewardItemIds: [] },
];

// ----------------------------------------------------------------------------
// REVA — Auric Court, all 7 stages, gated on act4_complete
// ----------------------------------------------------------------------------

export const REVA_QUEST_CHAIN: QuestDef[] = [
  { id: "reva_chain_stage_1", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Reva, prerequisiteFlags: ["act4_complete"], objectives: [{ id: "obj1", description: "Handle a cultist cell discreetly enough to earn Reva's interest", targetCount: 1, currentCount: 0 }], rewardGold: 60, rewardXp: 65, rewardReputationDelta: 8, rewardItemIds: [] },
  { id: "reva_chain_stage_2", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Reva, prerequisiteFlags: ["reva_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Patiently close the distance Reva keeps from nearly everyone", targetCount: 1, currentCount: 0 }], rewardGold: 35, rewardXp: 70, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "reva_chain_stage_3", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Reva, prerequisiteFlags: ["reva_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Learn of the childhood the Court bought from Reva's own family", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 75, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "reva_chain_stage_4", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Reva, prerequisiteFlags: ["reva_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there for Reva's confession — the one outcome she couldn't calculate around", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 85, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "reva_chain_stage_5", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Reva, prerequisiteFlags: ["reva_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Reva leave the Court's employ for good", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 75, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "reva_chain_stage_6", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Reva, prerequisiteFlags: ["reva_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Stand with Reva against her old handler's resurfacing threats", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 95, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "reva_chain_stage_7", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Reva, prerequisiteFlags: ["reva_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Be the first thing Reva has ever chosen freely, for herself", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 115, rewardReputationDelta: 15, rewardItemIds: [] },
];

// ----------------------------------------------------------------------------
// TASHA — Aethermoor, all 7 stages, gated on act1_complete
// ----------------------------------------------------------------------------

export const TASHA_QUEST_CHAIN: QuestDef[] = [
  { id: "tasha_chain_stage_1", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Tasha, prerequisiteFlags: ["act1_complete"], objectives: [{ id: "obj1", description: "Help fix Tasha's cart wheel at the Merchant Bazaar", targetCount: 1, currentCount: 0 }], rewardGold: 30, rewardXp: 35, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "tasha_chain_stage_2", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Tasha, prerequisiteFlags: ["tasha_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Keep coming back to Tasha's stall, whatever the excuse", targetCount: 1, currentCount: 0 }], rewardGold: 20, rewardXp: 40, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "tasha_chain_stage_3", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Tasha, prerequisiteFlags: ["tasha_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Learn why Tasha never lets herself stay anywhere long", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 45, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "tasha_chain_stage_4", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Tasha, prerequisiteFlags: ["tasha_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there for Tasha's confession, no jokes this time", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 55, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "tasha_chain_stage_5", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Tasha, prerequisiteFlags: ["tasha_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Tasha set up her first-ever permanent stall at the Manor", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 45, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "tasha_chain_stage_6", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Tasha, prerequisiteFlags: ["tasha_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Tasha face old trading debts instead of running from them", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 65, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "tasha_chain_stage_7", type: QuestType.Companion, region: Region.Aethermoor, questGiverId: CompanionId.Tasha, prerequisiteFlags: ["tasha_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Give Tasha the one reason she's ever had to stop wandering for good", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 85, rewardReputationDelta: 15, rewardItemIds: [] },
];

// ----------------------------------------------------------------------------
// SERA — Mountain Monastery, all 7 stages, gated on act3_complete (matching
// her established "Act 4/5" concurrent-arc framing, §24)
// ----------------------------------------------------------------------------

export const SERA_QUEST_CHAIN: QuestDef[] = [
  { id: "sera_chain_stage_1", type: QuestType.Companion, region: Region.MountainMonastery, questGiverId: CompanionId.Sera, prerequisiteFlags: ["act3_complete"], objectives: [{ id: "obj1", description: "Fight with restraint and mercy alongside Sera, earning her respect", targetCount: 1, currentCount: 0 }], rewardGold: 45, rewardXp: 50, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "sera_chain_stage_2", type: QuestType.Companion, region: Region.MountainMonastery, questGiverId: CompanionId.Sera, prerequisiteFlags: ["sera_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Climb the mountain path to visit Sera more often than duty requires", targetCount: 1, currentCount: 0 }], rewardGold: 30, rewardXp: 55, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "sera_chain_stage_3", type: QuestType.Companion, region: Region.MountainMonastery, questGiverId: CompanionId.Sera, prerequisiteFlags: ["sera_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Learn the truth of Sera's fall from grace", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 60, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "sera_chain_stage_4", type: QuestType.Companion, region: Region.MountainMonastery, questGiverId: CompanionId.Sera, prerequisiteFlags: ["sera_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there for Sera's confession, no longer atoning for feeling it", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 70, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "sera_chain_stage_5", type: QuestType.Companion, region: Region.MountainMonastery, questGiverId: CompanionId.Sera, prerequisiteFlags: ["sera_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Sera settle into her first true home since her fall", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 60, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "sera_chain_stage_6", type: QuestType.Companion, region: Region.MountainMonastery, questGiverId: CompanionId.Sera, prerequisiteFlags: ["sera_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Stand with Sera as those she once served come to judge her penance", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 80, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "sera_chain_stage_7", type: QuestType.Companion, region: Region.MountainMonastery, questGiverId: CompanionId.Sera, prerequisiteFlags: ["sera_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Show Sera what grace actually feels like, fully and without condition", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 100, rewardReputationDelta: 15, rewardItemIds: [] },
];

// ----------------------------------------------------------------------------
// LYRA — Auric Court, all 7 stages, gated on act4_complete
// ----------------------------------------------------------------------------

export const LYRA_QUEST_CHAIN: QuestDef[] = [
  { id: "lyra_chain_stage_1", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Lyra, prerequisiteFlags: ["act4_complete"], objectives: [{ id: "obj1", description: "Earn Lyra's notice with an unusually steady resolve she can feel from afar", targetCount: 1, currentCount: 0 }], rewardGold: 60, rewardXp: 65, rewardReputationDelta: 8, rewardItemIds: [] },
  { id: "lyra_chain_stage_2", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Lyra, prerequisiteFlags: ["lyra_stage1_dialogue_complete"], objectives: [{ id: "obj1", description: "Get to know Lyra beyond the divine half of her the Court always sees", targetCount: 1, currentCount: 0 }], rewardGold: 35, rewardXp: 70, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "lyra_chain_stage_3", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Lyra, prerequisiteFlags: ["lyra_stage2_dialogue_complete"], objectives: [{ id: "obj1", description: "Learn how lonely Lyra's empathic gift truly is to carry", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 75, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "lyra_chain_stage_4", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Lyra, prerequisiteFlags: ["lyra_stage3_dialogue_complete"], objectives: [{ id: "obj1", description: "Be there for Lyra's confession — a feeling entirely her own, for once", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 85, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "lyra_chain_stage_5", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Lyra, prerequisiteFlags: ["lyra_stage4_dialogue_complete"], objectives: [{ id: "obj1", description: "Help Lyra find real peace in her wing of the Manor", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 75, rewardReputationDelta: 5, rewardItemIds: [] },
  { id: "lyra_chain_stage_6", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Lyra, prerequisiteFlags: ["lyra_stage5_dialogue_complete"], objectives: [{ id: "obj1", description: "Stand with Lyra as she senses a great cosmic sorrow stirring", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 95, rewardReputationDelta: 10, rewardItemIds: [] },
  { id: "lyra_chain_stage_7", type: QuestType.Companion, region: Region.AuricCourt, questGiverId: CompanionId.Lyra, prerequisiteFlags: ["lyra_stage6_dialogue_complete"], objectives: [{ id: "obj1", description: "Be the one feeling Lyra never has to sense secondhand again", targetCount: 1, currentCount: 0 }], rewardGold: 0, rewardXp: 115, rewardReputationDelta: 15, rewardItemIds: [] },
];

export const ALL_COMPANION_QUEST_CHAINS: QuestDef[] = [
  ...MIRA_QUEST_CHAIN, ...ISOLDE_QUEST_CHAIN, ...GRAEL_QUEST_CHAIN, ...VALKA_QUEST_CHAIN,
  ...SEIRA_QUEST_CHAIN, ...SYLVARA_QUEST_CHAIN, ...REVA_QUEST_CHAIN, ...TASHA_QUEST_CHAIN,
  ...SERA_QUEST_CHAIN, ...LYRA_QUEST_CHAIN,
];
