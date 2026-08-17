// ============================================================================
// OJISAN IN ANOTHER WORLD — SKILL TREE SEED DATA
// Transcribes §22.1/§22.2's already-fully-specified effect tables into real
// SkillNodeDef rows. The effect keys and mechanical effects were already
// decided; this pass adds tier/pointCost/cpwCost/isPassive/prerequisiteNodeIds
// — closing a gap flagged all the way back in the original gap analysis:
// "nothing stops a player from buying a Tier 3 node with zero Tier 1/2 nodes
// owned, unless that's intentional." It wasn't intentional. Fixed here:
// every Tier 2+ node requires ONE specific anchor node from the tier below
// (not all of them — a light, single-gate model, not a dense prerequisite web).
// ============================================================================

import { SkillNodeDef, SkillTree } from "./schemas";

// ----------------------------------------------------------------------------
// SEX SKILL TREE (Ardor Points) — 25 nodes
// ----------------------------------------------------------------------------

export const SEX_SKILL_TREE: SkillNodeDef[] = [
  // Tier 1 — no prerequisites
  { id: "reading_the_room", tree: SkillTree.Ardor, name: "Reading the Room", tier: 1, pointCost: 1, cpwCost: 0, isPassive: true, prerequisiteNodeIds: [], effect: "reveal_partner_ui" },
  { id: "kink_encyclopedia", tree: SkillTree.Ardor, name: "Kink Encyclopedia", tier: 1, pointCost: 3, cpwCost: 0, isPassive: true, prerequisiteNodeIds: [], effect: "unlock_kink_encyclopedia" },
  { id: "attentive_touch", tree: SkillTree.Ardor, name: "Attentive Touch", tier: 1, pointCost: 2, cpwCost: 5, isPassive: false, prerequisiteNodeIds: [], effect: "touch_arousal_boost" },
  { id: "whispered_word", tree: SkillTree.Ardor, name: "Whispered Word", tier: 1, pointCost: 2, cpwCost: 5, isPassive: false, prerequisiteNodeIds: [], effect: "midscene_trust_boost" },
  { id: "grounding_warmth", tree: SkillTree.Ardor, name: "Grounding Warmth", tier: 1, pointCost: 2, cpwCost: 6, isPassive: false, prerequisiteNodeIds: [], effect: "clear_negative_arousal_state" },
  { id: "paternal_patience", tree: SkillTree.Ardor, name: "Paternal Patience", tier: 1, pointCost: 2, cpwCost: 0, isPassive: true, prerequisiteNodeIds: [], effect: "slow_self_arousal" },

  // Tier 2 — requires reading_the_room
  { id: "pressure_point_precision", tree: SkillTree.Ardor, name: "Pressure Point Precision", tier: 2, pointCost: 3, cpwCost: 8, isPassive: false, prerequisiteNodeIds: ["reading_the_room"], effect: "targeted_arousal_burst_20" },
  { id: "grip_and_release", tree: SkillTree.Ardor, name: "Grip and Release", tier: 2, pointCost: 3, cpwCost: 8, isPassive: false, prerequisiteNodeIds: ["reading_the_room"], effect: "rhythm_arousal_burst_15" },
  { id: "deep_confession", tree: SkillTree.Ardor, name: "Deep Confession", tier: 2, pointCost: 3, cpwCost: 8, isPassive: false, prerequisiteNodeIds: ["reading_the_room"], effect: "confession_trust_love_boost" },
  { id: "spanking_artistry", tree: SkillTree.Ardor, name: "Spanking Artistry", tier: 2, pointCost: 3, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["reading_the_room"], effect: "spank_effectiveness_up" },
  { id: "nipple_sorcery", tree: SkillTree.Ardor, name: "Nipple Sorcery", tier: 2, pointCost: 4, cpwCost: 10, isPassive: false, prerequisiteNodeIds: ["reading_the_room"], effect: "apply_shivering" },
  { id: "twin_rhythm", tree: SkillTree.Ardor, name: "Twin Rhythm", tier: 2, pointCost: 4, cpwCost: 10, isPassive: false, prerequisiteNodeIds: ["reading_the_room"], effect: "apply_synchronized" },

  // Tier 3 — requires grip_and_release
  { id: "crest_infusion", tree: SkillTree.Ardor, name: "Crest Infusion", tier: 3, pointCost: 5, cpwCost: 12, isPassive: false, prerequisiteNodeIds: ["grip_and_release"], effect: "cure_trauma_debuff" },
  { id: "cervix_harmonizer", tree: SkillTree.Ardor, name: "Cervix Harmonizer", tier: 3, pointCost: 5, cpwCost: 14, isPassive: false, prerequisiteNodeIds: ["grip_and_release"], effect: "deep_arousal_burst_30" },
  { id: "instinctive_read", tree: SkillTree.Ardor, name: "Instinctive Read", tier: 3, pointCost: 5, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["grip_and_release"], effect: "auto_pass_one_tec_check" },
  { id: "the_sincere_act", tree: SkillTree.Ardor, name: "The Sincere Act", tier: 3, pointCost: 6, cpwCost: 15, isPassive: false, prerequisiteNodeIds: ["grip_and_release"], effect: "context_best_bonus" },
  { id: "lactation_resonance", tree: SkillTree.Ardor, name: "Lactation Resonance", tier: 3, pointCost: 5, cpwCost: 12, isPassive: false, prerequisiteNodeIds: ["grip_and_release"], effect: "unlock_lactation" },
  { id: "exquisite_release", tree: SkillTree.Ardor, name: "Exquisite Release", tier: 3, pointCost: 6, cpwCost: 18, isPassive: false, prerequisiteNodeIds: ["grip_and_release"], effect: "simultaneous_climax" },
  { id: "afterglow_master", tree: SkillTree.Ardor, name: "Afterglow Master", tier: 3, pointCost: 5, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["grip_and_release"], effect: "post_scene_gain_multiplier" },
  { id: "virile_overflow", tree: SkillTree.Ardor, name: "Virile Overflow", tier: 3, pointCost: 6, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["grip_and_release"], effect: "conception_multiplier_boost" },

  // Tier 4 — requires cervix_harmonizer; several also story-gated per their own effect
  { id: "ardors_blessing", tree: SkillTree.Ardor, name: "Ardor's Blessing", tier: 4, pointCost: 8, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["cervix_harmonizer"], effect: "story_purge_ritual" },
  { id: "crest_resonance", tree: SkillTree.Ardor, name: "Crest Resonance", tier: 4, pointCost: 9, cpwCost: 25, isPassive: false, prerequisiteNodeIds: ["cervix_harmonizer"], effect: "lock_shared_bliss" },
  { id: "worlds_warmth", tree: SkillTree.Ardor, name: "World's Warmth", tier: 4, pointCost: 8, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["cervix_harmonizer"], effect: "manor_scenes_heal_region" },
  { id: "divine_contact", tree: SkillTree.Ardor, name: "Divine Contact", tier: 4, pointCost: 10, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["cervix_harmonizer"], effect: "unlock_cosmic_tier_content" },
  { id: "eternal_seed_of_ardor", tree: SkillTree.Ardor, name: "Eternal Seed of Ardor", tier: 4, pointCost: 10, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["cervix_harmonizer"], effect: "guarantee_legendary_offspring" },
];

// ----------------------------------------------------------------------------
// COMBAT SKILL TREE (Battle Points) — 23 nodes
// ----------------------------------------------------------------------------

export const COMBAT_SKILL_TREE: SkillNodeDef[] = [
  // Tier 1 — no prerequisites
  { id: "solid_strike", tree: SkillTree.Battle, name: "Solid Strike", tier: 1, pointCost: 0, cpwCost: 0, isPassive: false, prerequisiteNodeIds: [], effect: "basic_attack" }, // free baseline action, always owned
  { id: "power_strike", tree: SkillTree.Battle, name: "Power Strike", tier: 1, pointCost: 2, cpwCost: 0, isPassive: false, prerequisiteNodeIds: [], effect: "str_damage_boost_50" },
  { id: "hold_the_line", tree: SkillTree.Battle, name: "Hold the Line", tier: 1, pointCost: 2, cpwCost: 0, isPassive: false, prerequisiteNodeIds: [], effect: "apply_defense_up_self" },
  { id: "lucky_break", tree: SkillTree.Battle, name: "Lucky Break", tier: 1, pointCost: 2, cpwCost: 0, isPassive: true, prerequisiteNodeIds: [], effect: "dodge_crit_passive" },
  { id: "crest_flash", tree: SkillTree.Battle, name: "Crest Flash", tier: 1, pointCost: 3, cpwCost: 0, isPassive: false, prerequisiteNodeIds: [], effect: "holy_aoe_dispel" },

  // Tier 2 — requires power_strike
  { id: "iron_guard", tree: SkillTree.Battle, name: "Iron Guard", tier: 2, pointCost: 3, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["power_strike"], effect: "apply_shield_self_70" },
  { id: "ardent_pulse", tree: SkillTree.Battle, name: "Ardent Pulse", tier: 2, pointCost: 4, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["power_strike"], effect: "wis_aoe_damage" },
  { id: "read_the_fight", tree: SkillTree.Battle, name: "Read the Fight", tier: 2, pointCost: 3, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["power_strike"], effect: "mark_highest_threat" },
  { id: "companion_call", tree: SkillTree.Battle, name: "Companion Call", tier: 2, pointCost: 4, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["power_strike"], effect: "trigger_companion_special_now" },
  { id: "crest_shield", tree: SkillTree.Battle, name: "Crest Shield", tier: 2, pointCost: 4, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["power_strike"], effect: "apply_shield_self_100_next_hit" },
  { id: "artisans_insight", tree: SkillTree.Battle, name: "Artisan's Insight", tier: 2, pointCost: 4, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["power_strike"], effect: "unlock_crafting_and_upgrades" },

  // Tier 3 — requires ardent_pulse
  { id: "war_cry_of_the_sincere", tree: SkillTree.Battle, name: "War Cry of the Sincere", tier: 3, pointCost: 5, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["ardent_pulse"], effect: "apply_party_attack_up" },
  { id: "seasoned_resolve", tree: SkillTree.Battle, name: "Seasoned Resolve", tier: 3, pointCost: 5, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["ardent_pulse"], effect: "low_hp_damage_reduction" },
  { id: "crushing_blow", tree: SkillTree.Battle, name: "Crushing Blow", tier: 3, pointCost: 6, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["ardent_pulse"], effect: "single_target_220pct" },
  { id: "combo_strike", tree: SkillTree.Battle, name: "Combo Strike", tier: 3, pointCost: 6, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["ardent_pulse"], effect: "three_hit_escalating_combo" },
  { id: "counter_stance", tree: SkillTree.Battle, name: "Counter Stance", tier: 3, pointCost: 5, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["ardent_pulse"], effect: "apply_counter_ready" },
  { id: "crest_nova", tree: SkillTree.Battle, name: "Crest Nova", tier: 3, pointCost: 6, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["ardent_pulse"], effect: "wis_aoe_damage_150pct" },
  { id: "empathic_strike", tree: SkillTree.Battle, name: "Empathic Strike", tier: 3, pointCost: 6, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["ardent_pulse"], effect: "bonus_vs_miasma_corrupted" },

  // Tier 4 — requires crushing_blow; Sanctum's Force and The Last Sincere Blow also story/context-gated per their own effect
  { id: "protectors_reflexes", tree: SkillTree.Battle, name: "Protector's Reflexes", tier: 4, pointCost: 8, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["crushing_blow"], effect: "auto_intercept_low_hp_companion" },
  { id: "unyielding_vitality", tree: SkillTree.Battle, name: "Unyielding Vitality", tier: 4, pointCost: 7, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["crushing_blow"], effect: "self_hp_regen_per_turn" },
  { id: "sanctums_force", tree: SkillTree.Battle, name: "Sanctum's Force", tier: 4, pointCost: 10, cpwCost: 0, isPassive: false, prerequisiteNodeIds: ["crushing_blow"], effect: "boss_only_wis_nuke_300pct" },
  { id: "worlds_champion", tree: SkillTree.Battle, name: "World's Champion", tier: 4, pointCost: 10, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["crushing_blow"], effect: "party_all_stats_up_20" },
  { id: "the_last_sincere_blow", tree: SkillTree.Battle, name: "The Last Sincere Blow", tier: 4, pointCost: 9, cpwCost: 0, isPassive: true, prerequisiteNodeIds: ["crushing_blow"], effect: "unlock_compassion_path" },
];
