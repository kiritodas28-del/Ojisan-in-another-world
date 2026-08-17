// ============================================================================
// OJISAN IN ANOTHER WORLD — MIRA'S FULL DIALOGUE TREE (Flagship)
// The one genuinely new-category piece of work left per §27's Known Gaps:
// full branching CharacterDialogueTreeDef content. This file is the
// flagship — a complete, deep 7-stage tree for Mira establishing the actual
// branching pattern — before dialogue_companions_seed_data.ts applies the
// same pattern more lightly to the other 9.
//
// CONVENTION ESTABLISHED HERE (the schema doesn't mandate one, so this is a
// deliberate authoring decision, stated plainly): dialogue alternates by
// speakerId. NPC-speaking nodes use CompanionId.Mira. Player-speaking
// "response option" nodes use speakerId: "kenji" — these are what the
// response-selection UI shows the player, and each one's own
// responseOptionIds chains to the NPC's next reply, continuing the exchange.
// A node with responseOptionIds: [] is a natural conversation end point.
//
// Two root topics per stage (not one) — real branching means something new
// to talk about at a given relationship point, not a single fixed script.
// Stages 4, 6, and 7 (the emotionally pivotal ones) get a third, deeper root.
//
// Story flags this tree sets, each corresponding to a QuestDef prerequisite
// elsewhere (loosely coupled, matching the pattern already established for
// quest/dialogue interaction in §25.1): mira_stage1_dialogue_complete
// through mira_stage7_dialogue_complete.
// ============================================================================

import { DialogueNodeDef, CharacterDialogueTreeDef, CompanionId } from "./schemas";

export const MIRA_DIALOGUE_NODES: DialogueNodeDef[] = [
  // ==========================================================================
  // STAGE 1 — The Rescue (conditions: QUEST_STAGE_AT_LEAST 1)
  // ==========================================================================
  { id: "mira_s1_root_a", speakerId: CompanionId.Mira, text: "\"Thank you... for saving me back there. I didn't think anyone traveled this deep into the meadows anymore.\" She's still catching her breath, clutching a half-spilled satchel of herbs to her chest.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["mira_s1_pc_a1", "mira_s1_pc_a2", "mira_s1_pc_a3"] },
  { id: "mira_s1_pc_a1", speakerId: "kenji", text: "\"Are you hurt anywhere?\"", conditions: [], responseOptionIds: ["mira_s1_npc_a1_reply"] },
  { id: "mira_s1_npc_a1_reply", speakerId: CompanionId.Mira, text: "\"Just a scrape or two.\" She waves off the concern, then hesitates. \"You're bleeding, though — from your arm. Let me look at that.\" Already, her hands are moving toward her satchel.", conditions: [], responseOptionIds: [] },
  { id: "mira_s1_pc_a2", speakerId: "kenji", text: "\"What were you doing out here alone?\"", conditions: [], responseOptionIds: ["mira_s1_npc_a2_reply"] },
  { id: "mira_s1_npc_a2_reply", speakerId: CompanionId.Mira, text: "\"Gathering moon-mint. The village clinic's nearly out, and the Miasma sickness doesn't wait for safer roads.\" A tired, wry smile. \"I probably should have brought someone with me. I just didn't think it would matter today.\"", conditions: [], responseOptionIds: [] },
  { id: "mira_s1_pc_a3", speakerId: "kenji", text: "\"I'm Kenji.\"", conditions: [], responseOptionIds: ["mira_s1_npc_a3_reply"] },
  { id: "mira_s1_npc_a3_reply", speakerId: CompanionId.Mira, text: "\"Mira. Mira Ashveil.\" She dips her head, a proper little bow that looks strange covered in meadow dust. \"I run the village clinic. Or — try to. Thank you again, truly.\"", conditions: [], responseOptionIds: [] },

  { id: "mira_s1_root_b", speakerId: CompanionId.Mira, text: "\"You're not from around here, are you? I'd have remembered a face like yours.\" She tilts her head, studying him with open, unguarded curiosity.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["mira_s1_pc_b1", "mira_s1_pc_b2"] },
  { id: "mira_s1_pc_b1", speakerId: "kenji", text: "\"It's a long story.\"", conditions: [], responseOptionIds: ["mira_s1_npc_b1_reply"] },
  { id: "mira_s1_npc_b1_reply", speakerId: CompanionId.Mira, text: "\"Most good ones are.\" She smiles — the first real one since the wolves. \"I won't pry. Just... thank you for being here, whatever brought you.\" She sets the marker for this exchange, quiet gratitude settling into something warmer.", conditions: [], setsStoryFlag: "mira_stage1_dialogue_complete", responseOptionIds: [] },
  { id: "mira_s1_pc_b2", speakerId: "kenji", text: "\"Is the village safe? I could help.\"", conditions: [], responseOptionIds: ["mira_s1_npc_b2_reply"] },
  { id: "mira_s1_npc_b2_reply", speakerId: CompanionId.Mira, text: "\"Safe enough, most days. But if you mean it — we could use every capable hand we can get. The Blighted Treant up at the grove has been getting worse.\" She studies him again, hope flickering behind the exhaustion.", conditions: [], setsStoryFlag: "mira_stage1_dialogue_complete", responseOptionIds: [] },

  // ==========================================================================
  // STAGE 2 — Growing Trust (conditions: QUEST_STAGE_AT_LEAST 2)
  // ==========================================================================
  { id: "mira_s2_root_a", speakerId: CompanionId.Mira, text: "\"You're back again.\" Mira looks up from the herb garden, sleeves rolled and dirt on her knees, a small pleased smile she doesn't quite hide. \"Come to make yourself useful, or just to bother me?\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["mira_s2_pc_a1", "mira_s2_pc_a2"] },
  { id: "mira_s2_pc_a1", speakerId: "kenji", text: "\"A little of both, honestly.\"", conditions: [], responseOptionIds: ["mira_s2_npc_a1_reply"] },
  { id: "mira_s2_npc_a1_reply", speakerId: CompanionId.Mira, text: "She laughs — a real laugh, surprised out of her. \"At least you're honest. Here, if you're staying, make yourself useful — these need thinning before the frost.\" She hands him a trowel like it's the most natural thing in the world.", conditions: [], responseOptionIds: [] },
  { id: "mira_s2_pc_a2", speakerId: "kenji", text: "\"What are you growing?\"", conditions: [], responseOptionIds: ["mira_s2_npc_a2_reply"] },
  { id: "mira_s2_npc_a2_reply", speakerId: CompanionId.Mira, text: "\"Moon-mint, mostly. Some healing herb besides.\" She brushes a strand of hair back with the back of her wrist, careful not to get soil on her face. \"It's not glamorous work. But it's mine, and it matters.\"", conditions: [], responseOptionIds: [] },

  { id: "mira_s2_root_b", speakerId: CompanionId.Mira, text: "\"Someone in the village asked if you were courting me.\" Mira doesn't look up from the mortar she's grinding herbs in, but her ears have gone faintly pink. \"I told them not to be ridiculous, of course.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }, { type: "TRUST_AT_LEAST", value: 20 }], responseOptionIds: ["mira_s2_pc_b1", "mira_s2_pc_b2"] },
  { id: "mira_s2_pc_b1", speakerId: "kenji", text: "\"Would that be so ridiculous?\"", conditions: [], responseOptionIds: ["mira_s2_npc_b1_reply"] },
  { id: "mira_s2_npc_b1_reply", speakerId: CompanionId.Mira, text: "The grinding stops entirely. She stares at the mortar like it's suddenly fascinating. \"I— no. No, I suppose it wouldn't be.\" A pause, softer: \"Ask me again sometime. When I'm braver.\"", conditions: [], setsStoryFlag: "mira_stage2_dialogue_complete", responseOptionIds: [] },
  { id: "mira_s2_pc_b2", speakerId: "kenji", text: "\"People talk. Let them.\"", conditions: [], responseOptionIds: ["mira_s2_npc_b2_reply"] },
  { id: "mira_s2_npc_b2_reply", speakerId: CompanionId.Mira, text: "\"That's... surprisingly comforting, actually.\" She finally looks up, something warm and a little shy in her expression. \"Thank you for not making a fuss out of it either way.\"", conditions: [], setsStoryFlag: "mira_stage2_dialogue_complete", responseOptionIds: [] },

  // ==========================================================================
  // STAGE 3 — Vulnerability (conditions: QUEST_STAGE_AT_LEAST 3, TRUST_AT_LEAST 30)
  // ==========================================================================
  { id: "mira_s3_root_a", speakerId: CompanionId.Mira, text: "Mira sits at the shrine altar longer than usual tonight, hands folded, not quite praying. \"Can I tell you something I don't say to most people?\" Her voice is quieter than he's heard it.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["mira_s3_pc_a1", "mira_s3_pc_a2"] },
  { id: "mira_s3_pc_a1", speakerId: "kenji", text: "\"Of course. I'm listening.\"", conditions: [], responseOptionIds: ["mira_s3_npc_a1_reply"] },
  { id: "mira_s3_npc_a1_reply", speakerId: CompanionId.Mira, text: "\"My mother died of the Miasma sickness when I was twelve. There was no healer close enough, and I watched her go, and I couldn't do anything.\" She stares at the altar candle. \"That's why I became this. So no one else has to watch and do nothing.\"", conditions: [], responseOptionIds: ["mira_s3_pc_a1_follow"] },
  { id: "mira_s3_pc_a1_follow", speakerId: "kenji", text: "\"She'd be proud of who you've become.\"", conditions: [], responseOptionIds: ["mira_s3_npc_a1_follow_reply"] },
  { id: "mira_s3_npc_a1_follow_reply", speakerId: CompanionId.Mira, text: "Her breath catches, and for a moment she just holds it. \"I hope so,\" she finally whispers. \"I really hope so.\" She reaches for his hand without quite looking at him, and doesn't let go for a while.", conditions: [], setsStoryFlag: "mira_stage3_dialogue_complete", responseOptionIds: [] },
  { id: "mira_s3_pc_a2", speakerId: "kenji", text: "\"You don't have to say anything else if it's hard.\"", conditions: [], responseOptionIds: ["mira_s3_npc_a2_reply"] },
  { id: "mira_s3_npc_a2_reply", speakerId: CompanionId.Mira, text: "\"No — I want to. My mother died of the Miasma sickness, when I was young. There wasn't a healer close enough to save her.\" A shaky breath. \"I've carried that a long time. It feels lighter, telling you.\"", conditions: [], setsStoryFlag: "mira_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "mira_s3_root_b", speakerId: CompanionId.Mira, text: "\"Do you ever wonder if you're doing enough? Helping enough people?\" Mira asks it lightly, but there's real weight underneath the question.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["mira_s3_pc_b1", "mira_s3_pc_b2"] },
  { id: "mira_s3_pc_b1", speakerId: "kenji", text: "\"All the time. I don't think that feeling ever fully goes away.\"", conditions: [], responseOptionIds: ["mira_s3_npc_b1_reply"] },
  { id: "mira_s3_npc_b1_reply", speakerId: CompanionId.Mira, text: "\"That's oddly reassuring, actually. I thought it was just me.\" She exhales, some tension leaving her shoulders. \"Maybe the feeling itself is proof we haven't stopped caring.\"", conditions: [], responseOptionIds: [] },
  { id: "mira_s3_pc_b2", speakerId: "kenji", text: "\"You've saved more people than you'll ever know.\"", conditions: [], responseOptionIds: ["mira_s3_npc_b2_reply"] },
  { id: "mira_s3_npc_b2_reply", speakerId: CompanionId.Mira, text: "\"I needed to hear that today, more than you know.\" She smiles, small and grateful. \"Thank you, Kenji. For that, and for so much else.\"", conditions: [], responseOptionIds: [] },

  // ==========================================================================
  // STAGE 4 — The Confession Threshold (conditions: QUEST_STAGE_AT_LEAST 4,
  // TRUST_AT_LEAST 50, LOVE_AT_LEAST 50 — just under her moveInRequirements
  // of 60/60, representing the conversation that finally clears them)
  // ==========================================================================
  { id: "mira_s4_root_a", speakerId: CompanionId.Mira, text: "Mira finds him alone by the cottage, twisting her hands like she's rehearsed this and lost her nerve twice already. \"I need to tell you something, and I'm terrified, so please just... let me get through it.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 50 }, { type: "LOVE_AT_LEAST", value: 50 }], responseOptionIds: ["mira_s4_pc_a1", "mira_s4_pc_a2"] },
  { id: "mira_s4_pc_a1", speakerId: "kenji", text: "\"Take your time. I'm not going anywhere.\"", conditions: [], responseOptionIds: ["mira_s4_npc_a1_reply"] },
  { id: "mira_s4_npc_a1_reply", speakerId: CompanionId.Mira, text: "\"I love you.\" It comes out in a rush, like she's been holding it underwater. \"I have for a while now, and I didn't know how to say it without it sounding foolish, but there it is. I love you, Kenji.\"", conditions: [], responseOptionIds: ["mira_s4_pc_a1_follow"] },
  { id: "mira_s4_pc_a1_follow", speakerId: "kenji", text: "\"I love you too, Mira. I have for a while.\"", conditions: [], responseOptionIds: ["mira_s4_npc_a1_follow_reply"] },
  { id: "mira_s4_npc_a1_follow_reply", speakerId: CompanionId.Mira, text: "She makes a sound halfway between a laugh and a sob and crosses the space between them in three quick steps, arms around his neck before he can say another word. \"Say it again. Please. I want to remember exactly how this feels.\"", conditions: [], setsStoryFlag: "mira_stage4_dialogue_complete", responseOptionIds: [] },
  { id: "mira_s4_pc_a2", speakerId: "kenji", text: "\"Whatever it is, I promise it won't scare me off.\"", conditions: [], responseOptionIds: ["mira_s4_npc_a2_reply"] },
  { id: "mira_s4_npc_a2_reply", speakerId: CompanionId.Mira, text: "\"I love you.\" Simple, and shaking, and entirely sincere. \"I've loved you for a while now, and I couldn't keep carrying it around unsaid anymore.\" She looks up at him, terrified and hopeful in equal measure.", conditions: [], setsStoryFlag: "mira_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "mira_s4_root_b", speakerId: CompanionId.Mira, text: "\"If — if you ever wanted me to move into the Manor, properly, I think I'd like that. If you'd want it too.\" She says it to the middle distance, not quite brave enough to look at him.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "STORY_FLAG_SET", value: "mira_stage4_dialogue_complete" }], responseOptionIds: ["mira_s4_pc_b1"] },
  { id: "mira_s4_pc_b1", speakerId: "kenji", text: "\"I'd want that more than anything.\"", conditions: [], responseOptionIds: ["mira_s4_npc_b1_reply"] },
  { id: "mira_s4_npc_b1_reply", speakerId: CompanionId.Mira, text: "The smile that breaks across her face is the widest he's ever seen from her. \"Then I'll pack my things. Not that I have much — a healer travels light.\" She laughs, giddy in a way that suits her.", conditions: [], responseOptionIds: [] },

  { id: "mira_s4_root_c", speakerId: CompanionId.Mira, text: "\"I should warn you — I still worry. About the village, about whether I'm being selfish, wanting this for myself.\" She says it half-joking, but it isn't really a joke.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 50 } ], responseOptionIds: ["mira_s4_pc_c1"] },
  { id: "mira_s4_pc_c1", speakerId: "kenji", text: "\"Wanting happiness isn't selfish, Mira.\"", conditions: [], responseOptionIds: ["mira_s4_npc_c1_reply"] },
  { id: "mira_s4_npc_c1_reply", speakerId: CompanionId.Mira, text: "\"I think I needed someone to tell me that.\" She leans into his side, quiet for a long moment. \"Thank you. For all of it.\"", conditions: [], responseOptionIds: [] },

  // ==========================================================================
  // STAGE 5 — Moved In (conditions: QUEST_STAGE_AT_LEAST 5)
  // ==========================================================================
  { id: "mira_s5_root_a", speakerId: CompanionId.Mira, text: "Mira has claimed a sunny corner of the Manor grounds for a new herb bed, sleeves rolled up, utterly at home. \"I never thought I'd have a garden this size to fuss over. Come see what I've planted.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["mira_s5_pc_a1", "mira_s5_pc_a2"] },
  { id: "mira_s5_pc_a1", speakerId: "kenji", text: "\"It suits you. All of this does.\"", conditions: [], responseOptionIds: ["mira_s5_npc_a1_reply"] },
  { id: "mira_s5_npc_a1_reply", speakerId: CompanionId.Mira, text: "\"I feel more myself here than I have in a long time,\" she admits, brushing dirt from her hands. \"Thank you for making room for me. Literally and otherwise.\"", conditions: [], responseOptionIds: [] },
  { id: "mira_s5_pc_a2", speakerId: "kenji", text: "\"Do you miss the village clinic?\"", conditions: [], responseOptionIds: ["mira_s5_npc_a2_reply"] },
  { id: "mira_s5_npc_a2_reply", speakerId: CompanionId.Mira, text: "\"Sometimes. But I still visit twice a week, and the walk does me good.\" She smiles. \"Besides — this way I get to come home to you every night. That's not a small thing to trade for.\"", conditions: [], responseOptionIds: [] },

  { id: "mira_s5_root_b", speakerId: CompanionId.Mira, text: "\"The others have been kind to me. Isolde helped me organize a proper apothecary shelf. Tasha keeps trying to sell me 'miracle' tonics.\" Mira laughs. \"It's strange, having a whole household. A good strange.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }, { type: "TRUST_AT_LEAST", value: 65 }], responseOptionIds: ["mira_s5_pc_b1"] },
  { id: "mira_s5_pc_b1", speakerId: "kenji", text: "\"I'm glad you feel at home with all of us.\"", conditions: [], responseOptionIds: ["mira_s5_npc_b1_reply"] },
  { id: "mira_s5_npc_b1_reply", speakerId: CompanionId.Mira, text: "\"I do. Truly.\" She squeezes his hand. \"I was afraid I'd feel like an outsider, sharing you. Instead I just feel... lucky.\"", conditions: [], setsStoryFlag: "mira_stage5_dialogue_complete", responseOptionIds: [] },

  // ==========================================================================
  // STAGE 6 — The Crisis (conditions: QUEST_STAGE_AT_LEAST 6)
  // ==========================================================================
  { id: "mira_s6_root_a", speakerId: CompanionId.Mira, text: "Mira comes back from the village pale and quiet. \"Old Yorna is dying. The village elder who taught me my first remedies. There's nothing left I can do for her, and it's — it's bringing it all back.\" Her voice cracks.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["mira_s6_pc_a1", "mira_s6_pc_a2"] },
  { id: "mira_s6_pc_a1", speakerId: "kenji", text: "\"I'll come with you. You shouldn't sit with this alone.\"", conditions: [], responseOptionIds: ["mira_s6_npc_a1_reply"] },
  { id: "mira_s6_npc_a1_reply", speakerId: CompanionId.Mira, text: "She breaks then, quietly, into his shoulder. \"Thank you. I didn't know how to ask for that.\" They sit with Yorna together that evening, and somehow it's easier to bear.", conditions: [], responseOptionIds: ["mira_s6_pc_a1_follow"] },
  { id: "mira_s6_pc_a1_follow", speakerId: "kenji", text: "\"You did everything you could for her. That's not nothing, Mira.\"", conditions: [], responseOptionIds: ["mira_s6_npc_a1_follow_reply"] },
  { id: "mira_s6_npc_a1_follow_reply", speakerId: CompanionId.Mira, text: "\"I know. I do know that.\" She wipes her eyes, steadier now. \"It just doesn't stop it from hurting. But having you here helps more than you know.\"", conditions: [], setsStoryFlag: "mira_stage6_dialogue_complete", responseOptionIds: [] },
  { id: "mira_s6_pc_a2", speakerId: "kenji", text: "\"This isn't the same as before. You're not alone this time.\"", conditions: [], responseOptionIds: ["mira_s6_npc_a2_reply"] },
  { id: "mira_s6_npc_a2_reply", speakerId: CompanionId.Mira, text: "\"You're right.\" She takes a shaky breath. \"I'm not twelve years old with no one to turn to anymore. I have you. I have all of this.\" A small, watery smile. \"Thank you for reminding me.\"", conditions: [], setsStoryFlag: "mira_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "mira_s6_root_b", speakerId: CompanionId.Mira, text: "\"I keep thinking — what if I'm not enough, someday, when it really matters? What if I fail someone the way I failed her?\" Mira's fear spills out quietly, aimed more at herself than at him.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }, { type: "STORY_FLAG_SET", value: "mira_stage6_dialogue_complete" }], responseOptionIds: ["mira_s6_pc_b1"] },
  { id: "mira_s6_pc_b1", speakerId: "kenji", text: "\"You didn't fail her. Some things can't be healed, no matter how skilled the healer.\"", conditions: [], responseOptionIds: ["mira_s6_npc_b1_reply"] },
  { id: "mira_s6_npc_b1_reply", speakerId: CompanionId.Mira, text: "\"I think I needed to hear someone say that who isn't me, arguing with myself at three in the morning.\" She laughs, weary but real. \"I love you. Thank you for staying through this.\"", conditions: [], responseOptionIds: [] },

  // ==========================================================================
  // STAGE 7 — Full Commitment (conditions: QUEST_STAGE_AT_LEAST 7,
  // TRUST_AT_LEAST 90, LOVE_AT_LEAST 90)
  // ==========================================================================
  { id: "mira_s7_root_a", speakerId: CompanionId.Mira, text: "Mira sits with him at the shrine altar where they first truly talked, years of quiet history between them now. \"I used to come here to ask for strength to get through another day alone. Now I come here just to be grateful.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["mira_s7_pc_a1", "mira_s7_pc_a2"] },
  { id: "mira_s7_pc_a1", speakerId: "kenji", text: "\"Grateful for what, exactly?\"", conditions: [], responseOptionIds: ["mira_s7_npc_a1_reply"] },
  { id: "mira_s7_npc_a1_reply", speakerId: CompanionId.Mira, text: "\"For you. For this whole strange, wonderful life I never let myself imagine.\" She takes his hand, threading their fingers together. \"For every single day I get to wake up and choose this, choose you, all over again.\"", conditions: [], responseOptionIds: ["mira_s7_pc_a1_follow"] },
  { id: "mira_s7_pc_a1_follow", speakerId: "kenji", text: "\"I'll choose you every single time, Mira. For as long as you'll have me.\"", conditions: [], responseOptionIds: ["mira_s7_npc_a1_follow_reply"] },
  { id: "mira_s7_npc_a1_follow_reply", speakerId: CompanionId.Mira, text: "\"Then I suppose that's forever, isn't it?\" Her smile is soft, certain, entirely unafraid. \"Good. That's exactly how long I intend to keep you.\" She rests her head against his shoulder, and for once, the quiet between them needs no filling.", conditions: [], setsStoryFlag: "mira_stage7_dialogue_complete", responseOptionIds: [] },
  { id: "mira_s7_pc_a2", speakerId: "kenji", text: "\"You never have to be alone with anything again. Not while I'm here.\"", conditions: [], responseOptionIds: ["mira_s7_npc_a2_reply"] },
  { id: "mira_s7_npc_a2_reply", speakerId: CompanionId.Mira, text: "\"I believe you.\" Her voice is steady in a way it never used to be. \"That little girl who watched her mother die alone — she'd never believe how far we've come. How safe I feel now. Thank you, Kenji. For giving her that.\"", conditions: [], setsStoryFlag: "mira_stage7_dialogue_complete", responseOptionIds: [] },

  { id: "mira_s7_root_b", speakerId: CompanionId.Mira, text: "\"Do you ever think about what comes next for us? Not worried — just... curious.\" Mira asks it with the easy contentment of someone who's stopped being afraid of the future.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "STORY_FLAG_SET", value: "mira_stage7_dialogue_complete" }], responseOptionIds: ["mira_s7_pc_b1"] },
  { id: "mira_s7_pc_b1", speakerId: "kenji", text: "\"Whatever comes, I want to face it with you beside me.\"", conditions: [], responseOptionIds: ["mira_s7_npc_b1_reply"] },
  { id: "mira_s7_npc_b1_reply", speakerId: CompanionId.Mira, text: "\"Then that's all the answer I need.\" She smiles, warm and unhurried, a woman entirely at peace with the life she's chosen. \"Whatever comes. Together.\"", conditions: [], responseOptionIds: [] },
];

export const MIRA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Mira,
  rootNodeIds: [
    "mira_s1_root_a", "mira_s1_root_b",
    "mira_s2_root_a", "mira_s2_root_b",
    "mira_s3_root_a", "mira_s3_root_b",
    "mira_s4_root_a", "mira_s4_root_b", "mira_s4_root_c",
    "mira_s5_root_a", "mira_s5_root_b",
    "mira_s6_root_a", "mira_s6_root_b",
    "mira_s7_root_a", "mira_s7_root_b",
  ],
};
