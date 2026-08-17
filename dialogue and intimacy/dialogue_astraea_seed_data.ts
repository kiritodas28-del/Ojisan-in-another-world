// ============================================================================
// OJISAN IN ANOTHER WORLD — ASTRAEA'S DIALOGUE TREE
// The genuinely missing "main character": schemas.ts's own comment on
// CharacterDialogueTreeDef names her explicitly as the example non-companion
// story NPC needing a tree ("string covers named non-companion story NPCs,
// e.g. Astraea") — and no tree was ever written for her until this pass.
//
// STRUCTURAL DIFFERENCE FROM COMPANION TREES: Astraea has no CompanionDef,
// no questStage, no moveInRequirements. Her progression is gated on
// STORY_FLAG_SET matching each Act's completionStoryFlag — she appears as a
// recurring dream vision at the end of Acts 1-5 (matching the
// astraea_dream_vision_actN_end cutsceneTriggerIds already in
// acts_seed_data.ts), physically descends at Act 6's World Heart
// Convergence (astraea_descends_world_heart_convergence), and resolves at
// the Act 7 finale (game_ending_resolution). TRUST_AT_LEAST/LOVE_AT_LEAST
// conditions still apply to her deepest content — the schema's TrustLoveState
// pattern is general-purpose, not companion-exclusive — representing the
// player's personal bond with her specifically, distinct from mere Act
// progression.
//
// Note on cosmic-tier gating: "Divine Contact" (§22.1) is established as a
// required skill-node prerequisite for her deepest scenes, but
// DialogueCondition has no "skill owned" type — only TRUST/LOVE/QUEST_STAGE/
// STORY_FLAG. That gate is left to whatever system triggers the actual
// Intimate Encounter, not modeled here as a dialogue condition; inventing a
// skill-to-story-flag bridge wasn't asked for and would be a new mechanic,
// not a data-authoring task.
// ============================================================================

import { DialogueNodeDef, CharacterDialogueTreeDef } from "./schemas";

const ASTRAEA = "astraea";

export const ASTRAEA_DIALOGUE_NODES: DialogueNodeDef[] = [
  // ==========================================================================
  // VISION 1 — after Act 1 (act1_complete)
  // ==========================================================================
  { id: "astraea_v1_root", speakerId: ASTRAEA, text: "She appears not as light or fire, but as warmth itself given shape, standing at the edge of a dream he can't quite call his own. \"You carry my Crest well, Kenji. Sincerity given freely is rarer than you know, in this world or the one you left behind.\"", conditions: [{ type: "STORY_FLAG_SET", value: "act1_complete" }], responseOptionIds: ["astraea_v1_pc1", "astraea_v1_pc2"] },
  { id: "astraea_v1_pc1", speakerId: "kenji", text: "\"Why me? Why give this power to someone like me?\"", conditions: [], responseOptionIds: ["astraea_v1_npc1"] },
  { id: "astraea_v1_npc1", speakerId: ASTRAEA, text: "\"Because you asked for nothing when you arrived, and gave everything regardless.\" Her voice holds no judgment, only certainty. \"That is precisely the heart Eranthis needs, to be cleansed rather than conquered.\"", conditions: [], responseOptionIds: [] },
  { id: "astraea_v1_pc2", speakerId: "kenji", text: "\"What exactly is the Miasma? I still don't fully understand it.\"", conditions: [], responseOptionIds: ["astraea_v1_npc2"] },
  { id: "astraea_v1_npc2", speakerId: ASTRAEA, text: "\"A wound in the world's own heart, born of love denied and taken by force instead of given freely.\" Her light dims, briefly grieved. \"Sincerity is the only balm that has ever worked against it. That is why you, specifically, matter.\"", conditions: [], responseOptionIds: [] },

  // ==========================================================================
  // VISION 2 — after Act 2 (act2_complete)
  // ==========================================================================
  { id: "astraea_v2_root", speakerId: ASTRAEA, text: "\"The Archives you cleansed held old grief, older than the Suppression itself.\" Astraea's presence feels closer this time, less distant. \"You are learning faster than most who have carried my Crest before you.\"", conditions: [{ type: "STORY_FLAG_SET", value: "act2_complete" }], responseOptionIds: ["astraea_v2_pc1", "astraea_v2_pc2"] },
  { id: "astraea_v2_pc1", speakerId: "kenji", text: "\"There have been others before me?\"", conditions: [], responseOptionIds: ["astraea_v2_npc1"] },
  { id: "astraea_v2_npc1", speakerId: ASTRAEA, text: "\"Few, and long ago. None finished what they began.\" A rare note of vulnerability crosses her voice. \"I find myself hoping, quietly, that you might be different.\"", conditions: [], responseOptionIds: [] },
  { id: "astraea_v2_pc2", speakerId: "kenji", text: "\"Are you watching everything I do?\"", conditions: [], responseOptionIds: ["astraea_v2_npc2"] },
  { id: "astraea_v2_npc2", speakerId: ASTRAEA, text: "\"Only what the Crest itself shows me — moments of sincerity, mostly.\" The faintest warmth colors her words. \"I confess I look forward to what it shows me next.\"", conditions: [], responseOptionIds: [] },

  // ==========================================================================
  // VISION 3 — after Act 3 (act3_complete)
  // ==========================================================================
  { id: "astraea_v3_root", speakerId: ASTRAEA, text: "\"The March's wounds run deeper than most, forged by war rather than simple neglect.\" Astraea's voice carries old sorrow. \"You cleansed it with patience rather than force. That distinction matters more than you know.\"", conditions: [{ type: "STORY_FLAG_SET", value: "act3_complete" }], responseOptionIds: ["astraea_v3_pc1", "astraea_v3_pc2"] },
  { id: "astraea_v3_pc1", speakerId: "kenji", text: "\"Why does patience matter more than force, to you specifically?\"", conditions: [], responseOptionIds: ["astraea_v3_npc1"] },
  { id: "astraea_v3_npc1", speakerId: ASTRAEA, text: "\"Because I was made from patience, long ago — a goddess born of someone's willingness to wait for love rather than demand it.\" Her light flickers, oddly personal. \"I rarely share that. I'm not certain why I have now.\"", conditions: [], responseOptionIds: [] },
  { id: "astraea_v3_pc2", speakerId: "kenji", text: "\"You seem different tonight. Is something troubling you?\"", conditions: [], responseOptionIds: ["astraea_v3_npc2"] },
  { id: "astraea_v3_npc2", speakerId: ASTRAEA, text: "\"Perceptive.\" A soft, surprised laugh. \"Divinity is not immune to doubt, it seems. I find myself hoping for your success more personally than a goddess perhaps should.\"", conditions: [], responseOptionIds: [] },

  // ==========================================================================
  // VISION 4 — after Act 4 (act4_complete)
  // ==========================================================================
  { id: "astraea_v4_root", speakerId: ASTRAEA, text: "\"The World Tree's grief was ancient — older than the Suppression, older even than my own first memories.\" Astraea's form flickers, visibly strained. \"Eranthis grows harder to heal with every passing season. I fear time may not be entirely on our side.\"", conditions: [{ type: "STORY_FLAG_SET", value: "act4_complete" }], responseOptionIds: ["astraea_v4_pc1", "astraea_v4_pc2"] },
  { id: "astraea_v4_pc1", speakerId: "kenji", text: "\"We'll finish this, Astraea. I promise you that.\"", conditions: [], responseOptionIds: ["astraea_v4_npc1"] },
  { id: "astraea_v4_npc1", speakerId: ASTRAEA, text: "\"I believe you mean that.\" Her light steadies, drawing strength from his certainty. \"It has been a very long time since anyone made me a promise and I found myself able to simply trust it.\"", conditions: [], responseOptionIds: [] },
  { id: "astraea_v4_pc2", speakerId: "kenji", text: "\"What happens to you, if I fail?\"", conditions: [], responseOptionIds: ["astraea_v4_npc2"] },
  { id: "astraea_v4_npc2", speakerId: ASTRAEA, text: "\"I fade, as the world does, slowly and then all at once.\" She says it without self-pity, simple fact. \"I would rather not discuss that outcome further. I would rather believe in this one instead — the one where you succeed.\"", conditions: [], responseOptionIds: [] },

  // ==========================================================================
  // VISION 5 — after Act 5 (act5_complete)
  // ==========================================================================
  { id: "astraea_v5_root", speakerId: ASTRAEA, text: "\"The Court's corruption ran deepest of anywhere you've cleansed, and yet you found gentleness even there.\" Astraea's presence feels warmer than ever before, less like vision and more like nearness. \"I find myself wishing I could simply stand beside you, rather than merely watch.\"", conditions: [{ type: "STORY_FLAG_SET", value: "act5_complete" }], responseOptionIds: ["astraea_v5_pc1", "astraea_v5_pc2"] },
  { id: "astraea_v5_pc1", speakerId: "kenji", text: "\"I wish that too, Astraea. More than you probably realize.\"", conditions: [], responseOptionIds: ["astraea_v5_npc1"] },
  { id: "astraea_v5_npc1", speakerId: ASTRAEA, text: "Her light warms visibly, something like a blush made of dawn itself. \"That confession undoes me rather more than a goddess should admit. Soon, perhaps, that wish need not remain only a wish.\"", conditions: [], responseOptionIds: [] },
  { id: "astraea_v5_pc2", speakerId: "kenji", text: "\"Is there a way for us to actually meet? Truly, not just like this?\"", conditions: [], responseOptionIds: ["astraea_v5_npc2"] },
  { id: "astraea_v5_npc2", speakerId: ASTRAEA, text: "\"Where the World Heart converges, the veil between us grows thin enough to cross.\" Her voice carries quiet anticipation. \"Finish what lies ahead, and I will finally stand before you — not merely within your dreams.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 40 }, { type: "LOVE_AT_LEAST", value: 40 }], responseOptionIds: [] },

  // ==========================================================================
  // DESCENT — Act 6, World Heart Convergence (astraea_descends_world_heart_convergence)
  // Her first physical, not merely visionary, appearance.
  // ==========================================================================
  { id: "astraea_descent_root_a", speakerId: ASTRAEA, text: "Light resolves into form, gentle and overwhelming at once — Astraea stands before him for the first time, no longer a dream but real, solid, present. \"Kenji. I have waited a very long time to say your name aloud, rather than only within a vision.\"", conditions: [{ type: "STORY_FLAG_SET", value: "act6_complete" }], responseOptionIds: ["astraea_descent_pc1"] },
  { id: "astraea_descent_pc1", speakerId: "kenji", text: "\"You're even more radiant in person than in any vision.\"", conditions: [], responseOptionIds: ["astraea_descent_npc1"] },
  { id: "astraea_descent_npc1", speakerId: ASTRAEA, text: "\"And you are far more real than my visions ever let me feel.\" She reaches out, fingertips brushing his hand as if testing whether this, too, might be a dream. \"This is not a dream. I made certain of that, this time.\"", conditions: [], responseOptionIds: [] },

  { id: "astraea_descent_root_b", speakerId: ASTRAEA, text: "\"Divinity is a strange, isolating thing, Kenji.\" Astraea studies her own hands, marveling at their solidity. \"I had almost forgotten what it felt like, having a body that could actually be touched.\"", conditions: [{ type: "STORY_FLAG_SET", value: "act6_complete" }, { type: "TRUST_AT_LEAST", value: 50 }], responseOptionIds: ["astraea_descent_pc2"] },
  { id: "astraea_descent_pc2", speakerId: "kenji", text: "\"Then let me remind you what that feels like.\"", conditions: [], responseOptionIds: ["astraea_descent_npc2"] },
  { id: "astraea_descent_npc2", speakerId: ASTRAEA, text: "Her breath catches, entirely mortal in that instant despite everything she is. \"I would like that. More than I have permitted myself to want anything, in a very long time.\"", conditions: [], responseOptionIds: [] },

  // ==========================================================================
  // FINALE — Act 7 (game_ending_resolution), requiring a genuine personal bond
  // ==========================================================================
  { id: "astraea_finale_root_a", speakerId: ASTRAEA, text: "\"Eranthis is healing, Kenji. Truly healing, for the first time since I can remember existing at all.\" Astraea's light is steady now, no longer flickering with doubt. \"And I find that the healing of the world and the healing of my own heart happened by the same hand, entirely.\"", conditions: [{ type: "STORY_FLAG_SET", value: "act7_complete" }, { type: "TRUST_AT_LEAST", value: 85 }, { type: "LOVE_AT_LEAST", value: 85 }], responseOptionIds: ["astraea_finale_pc1"] },
  { id: "astraea_finale_pc1", speakerId: "kenji", text: "\"I never set out to heal a goddess. I just wanted to help however I could.\"", conditions: [], responseOptionIds: ["astraea_finale_npc1"] },
  { id: "astraea_finale_npc1", speakerId: ASTRAEA, text: "\"That, precisely, is why you succeeded where every attempt before you failed.\" She takes his hands, luminous and entirely present. \"I love you, Kenji. Not as a goddess loves a champion — as myself, whatever that self has become because of you.\"", conditions: [], responseOptionIds: ["astraea_finale_pc1_follow"] },
  { id: "astraea_finale_pc1_follow", speakerId: "kenji", text: "\"I love you too, Astraea. All of you — the goddess and whoever you are underneath that.\"", conditions: [], responseOptionIds: ["astraea_finale_npc1_follow"] },
  { id: "astraea_finale_npc1_follow", speakerId: ASTRAEA, text: "Her light brightens like dawn breaking for the first time in an age, warm rather than blinding. \"Then let Eranthis remember this day not merely as the day it was healed, but as the day I finally let myself be loved back. Stay with me, Kenji. For as long as this world, and I, continue to exist.\"", conditions: [], setsStoryFlag: "astraea_finale_dialogue_complete", responseOptionIds: [] },

  { id: "astraea_finale_root_b", speakerId: ASTRAEA, text: "\"I once believed a goddess existed only to be needed, never to need in return.\" Astraea watches the healed horizon beside him, radiant and at peace. \"You proved that belief wrong, quietly, one act of sincerity at a time.\"", conditions: [{ type: "STORY_FLAG_SET", value: "astraea_finale_dialogue_complete" }], responseOptionIds: ["astraea_finale_pc2"] },
  { id: "astraea_finale_pc2", speakerId: "kenji", text: "\"You never needed to be just a goddess with me. You could always just be Astraea.\"", conditions: [], responseOptionIds: ["astraea_finale_npc2"] },
  { id: "astraea_finale_npc2", speakerId: ASTRAEA, text: "\"Just Astraea.\" She tries the phrase like a name she's only now permitted to fully claim. \"I think, of everything you have given this world, that gift was the one I needed most.\"", conditions: [], responseOptionIds: [] },
];

export const ASTRAEA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: ASTRAEA,
  rootNodeIds: [
    "astraea_v1_root", "astraea_v2_root", "astraea_v3_root", "astraea_v4_root", "astraea_v5_root",
    "astraea_descent_root_a", "astraea_descent_root_b",
    "astraea_finale_root_a", "astraea_finale_root_b",
  ],
};
