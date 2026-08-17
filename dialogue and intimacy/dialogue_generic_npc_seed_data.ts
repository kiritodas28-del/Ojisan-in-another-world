// ============================================================================
// OJISAN IN ANOTHER WORLD — GENERIC NPC DIALOGUE SETS
// One shared GenericNpcDialogueSetDef per procedural class (§8.1's 10
// classes), not authored per spawned instance — matching §25.1's "every
// Town Merchant pulls from the same pool" design. Gated by TRUST_AT_LEAST
// rather than QUEST_STAGE_AT_LEAST, since generic NPCs have no per-instance
// quest chain — only the Trust/Love a specific spawned instance has built
// with the player, per requirements.md §25.1.
//
// Each class gets a greeting root plus 1-2 Trust-gated deeper responses,
// intentionally lighter than companion trees — flavor and texture for the
// world, not full relationship arcs.
// ============================================================================

import { DialogueNodeDef, GenericNpcDialogueSetDef } from "./schemas";

export const GENERIC_NPC_DIALOGUE_NODES: DialogueNodeDef[] = [
  // --- Commoner / Peasant Girl ---
  { id: "npc_commoner_root", speakerId: "npc_generic", text: "\"Oh! Didn't see you there. Lovely day for it, isn't it?\" She offers a polite, unremarkable smile — the kind everyone in the Vale seems to share.", conditions: [], responseOptionIds: ["npc_commoner_pc1"] },
  { id: "npc_commoner_pc1", speakerId: "kenji", text: "\"It really is. How's the village treating you?\"", conditions: [], responseOptionIds: ["npc_commoner_reply1"] },
  { id: "npc_commoner_reply1", speakerId: "npc_generic", text: "\"Can't complain, mostly. Prices are up since the Miasma trouble started, but we manage.\" She shrugs, easygoing about it.", conditions: [], responseOptionIds: [] },
  { id: "npc_commoner_root_trust", speakerId: "npc_generic", text: "\"You're that traveler everyone's been talking about. Good things, mostly.\" She leans in, friendlier now that she recognizes him.", conditions: [{ type: "TRUST_AT_LEAST", value: 20 }], responseOptionIds: ["npc_commoner_pc2"] },
  { id: "npc_commoner_pc2", speakerId: "kenji", text: "\"Good to know I've got a decent reputation around here.\"", conditions: [], responseOptionIds: ["npc_commoner_reply2"] },
  { id: "npc_commoner_reply2", speakerId: "npc_generic", text: "\"Better than decent. Keep it up and they'll be naming the well after you.\" She laughs, genuinely warm.", conditions: [], responseOptionIds: [] },

  // --- Town Merchant ---
  { id: "npc_merchant_root", speakerId: "npc_generic", text: "\"Welcome, welcome! Finest goods this side of the region, guaranteed.\" He gestures grandly at a stall of fairly ordinary wares.", conditions: [], responseOptionIds: ["npc_merchant_pc1"] },
  { id: "npc_merchant_pc1", speakerId: "kenji", text: "\"Business good lately?\"", conditions: [], responseOptionIds: ["npc_merchant_reply1"] },
  { id: "npc_merchant_reply1", speakerId: "npc_generic", text: "\"Could always be better. Could always be worse.\" He winks. \"That's trade, my friend. Come back anytime — I'll have something new.\"", conditions: [], responseOptionIds: [] },
  { id: "npc_merchant_root_trust", speakerId: "npc_generic", text: "\"Ah, my favorite customer!\" He drops the sales patter entirely, genuinely pleased to see him. \"Got something set aside, actually — friend's discount.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 25 }], responseOptionIds: ["npc_merchant_pc2"] },
  { id: "npc_merchant_pc2", speakerId: "kenji", text: "\"I appreciate that. You've always been fair with me.\"", conditions: [], responseOptionIds: ["npc_merchant_reply2"] },
  { id: "npc_merchant_reply2", speakerId: "npc_generic", text: "\"Fair goes both ways. You've been good to this town. Least I can do.\" He means it.", conditions: [], responseOptionIds: [] },

  // --- City Guard / Mercenary ---
  { id: "npc_guard_root", speakerId: "npc_generic", text: "\"Keep moving, unless you've got business here.\" She eyes him carefully, hand near her weapon out of habit rather than hostility.", conditions: [], responseOptionIds: ["npc_guard_pc1"] },
  { id: "npc_guard_pc1", speakerId: "kenji", text: "\"Just passing through. Quiet shift?\"", conditions: [], responseOptionIds: ["npc_guard_reply1"] },
  { id: "npc_guard_reply1", speakerId: "npc_generic", text: "\"Quiet's good. Quiet means I did my job.\" A brief, professional nod. \"Move along safely.\"", conditions: [], responseOptionIds: [] },
  { id: "npc_guard_root_trust", speakerId: "npc_generic", text: "\"You again.\" Her posture relaxes noticeably. \"Word is you've cleared out half the threats on the roads yourself. Makes my job a lot easier.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 25 }], responseOptionIds: ["npc_guard_pc2"] },
  { id: "npc_guard_pc2", speakerId: "kenji", text: "\"Happy to help keep things safe.\"", conditions: [], responseOptionIds: ["npc_guard_reply2"] },
  { id: "npc_guard_reply2", speakerId: "npc_generic", text: "\"Wish more folks had your attitude.\" She almost smiles. \"Stay careful out there, all the same.\"", conditions: [], responseOptionIds: [] },

  // --- High Noble Lady ---
  { id: "npc_noble_root", speakerId: "npc_generic", text: "\"You're not Court, are you? How refreshing.\" She studies him over the rim of a jeweled fan, amused rather than dismissive.", conditions: [], responseOptionIds: ["npc_noble_pc1"] },
  { id: "npc_noble_pc1", speakerId: "kenji", text: "\"Is that a compliment or an insult?\"", conditions: [], responseOptionIds: ["npc_noble_reply1"] },
  { id: "npc_noble_reply1", speakerId: "npc_generic", text: "\"A compliment, I assure you. Court manners grow tiresome. Honesty is a rarer currency here than gold.\"", conditions: [], responseOptionIds: [] },
  { id: "npc_noble_root_trust", speakerId: "npc_generic", text: "\"Ah, the honest outsider returns.\" Her fan lowers, genuine warmth replacing polite performance. \"I find myself looking forward to your visits more than I'll admit in front of the Court.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["npc_noble_pc2"] },
  { id: "npc_noble_pc2", speakerId: "kenji", text: "\"The feeling's mutual.\"", conditions: [], responseOptionIds: ["npc_noble_reply2"] },
  { id: "npc_noble_reply2", speakerId: "npc_generic", text: "\"How lovely to hear.\" A small, private smile, meant only for him. \"Do come find me again soon.\"", conditions: [], responseOptionIds: [] },

  // --- Bandit / Outlaw ---
  { id: "npc_bandit_root", speakerId: "npc_generic", text: "\"Toll's due for the road, unless you'd rather settle it another way.\" He sizes Kenji up, more wary than truly threatening.", conditions: [], responseOptionIds: ["npc_bandit_pc1"] },
  { id: "npc_bandit_pc1", speakerId: "kenji", text: "\"I'd rather we both walked away from this.\"", conditions: [], responseOptionIds: ["npc_bandit_reply1"] },
  { id: "npc_bandit_reply1", speakerId: "npc_generic", text: "\"...Fair enough. Not looking for trouble I can't win, honestly.\" He steps aside, grudging but genuine.", conditions: [], responseOptionIds: [] },
  { id: "npc_bandit_root_trust", speakerId: "npc_generic", text: "\"You're the one who let me walk, back on the south road.\" He looks almost sheepish. \"Didn't expect that kind of mercy out here. Still thinking on it.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 15 }], responseOptionIds: ["npc_bandit_pc2"] },
  { id: "npc_bandit_pc2", speakerId: "kenji", text: "\"Everyone deserves a second chance, if they want to take it.\"", conditions: [], responseOptionIds: ["npc_bandit_reply2"] },
  { id: "npc_bandit_reply2", speakerId: "npc_generic", text: "\"Maybe I will, at that.\" He looks thoughtful in a way that suggests the words actually landed.", conditions: [], responseOptionIds: [] },

  // --- Temple Priestess ---
  { id: "npc_priestess_root", speakerId: "npc_generic", text: "\"Astraea's light finds you well, traveler.\" She offers a serene, practiced blessing, hands folded before her.", conditions: [], responseOptionIds: ["npc_priestess_pc1"] },
  { id: "npc_priestess_pc1", speakerId: "kenji", text: "\"Thank you. How's the temple holding up these days?\"", conditions: [], responseOptionIds: ["npc_priestess_reply1"] },
  { id: "npc_priestess_reply1", speakerId: "npc_generic", text: "\"We manage, through faith and stubbornness in equal measure.\" A small, warm smile breaks her serenity. \"Come by anytime you need a quiet moment.\"", conditions: [], responseOptionIds: [] },
  { id: "npc_priestess_root_trust", speakerId: "npc_generic", text: "\"You've become something of a familiar face in the sanctuary.\" Her formal serenity softens into something more personal. \"I find your visits genuinely comforting, if I'm honest.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 25 }], responseOptionIds: ["npc_priestess_pc2"] },
  { id: "npc_priestess_pc2", speakerId: "kenji", text: "\"I enjoy them too. You're easy to talk to.\"", conditions: [], responseOptionIds: ["npc_priestess_reply2"] },
  { id: "npc_priestess_reply2", speakerId: "npc_generic", text: "\"That means more than you know, coming from you.\" Her cheeks color slightly, unguarded for once.", conditions: [], responseOptionIds: [] },

  // --- Academy Scholar ---
  { id: "npc_scholar_root", speakerId: "npc_generic", text: "\"Careful with that shelf — some of those texts predate the Suppression.\" She doesn't look up from her own reading, but the warning is genuine.", conditions: [], responseOptionIds: ["npc_scholar_pc1"] },
  { id: "npc_scholar_pc1", speakerId: "kenji", text: "\"Noted. What are you researching?\"", conditions: [], responseOptionIds: ["npc_scholar_reply1"] },
  { id: "npc_scholar_reply1", speakerId: "npc_generic", text: "\"Pre-Suppression agricultural records, if you can believe something so dull holds my attention.\" She smiles slightly. \"There's always more to learn, even from the mundane.\"", conditions: [], responseOptionIds: [] },
  { id: "npc_scholar_root_trust", speakerId: "npc_generic", text: "\"You actually remembered what I was researching last time.\" She looks up properly now, pleasantly surprised. \"Not many people bother to listen that closely.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 20 }], responseOptionIds: ["npc_scholar_pc2"] },
  { id: "npc_scholar_pc2", speakerId: "kenji", text: "\"It seemed important to you. That made it worth remembering.\"", conditions: [], responseOptionIds: ["npc_scholar_reply2"] },
  { id: "npc_scholar_reply2", speakerId: "npc_generic", text: "\"That's... a surprisingly thoughtful thing to say.\" She marks her page, giving him her full attention now.", conditions: [], responseOptionIds: [] },

  // --- Tavern Courtesan / Barmaid ---
  { id: "npc_courtesan_root", speakerId: "npc_generic", text: "\"Well, aren't you a welcome sight.\" She leans against the bar, playful and unbothered. \"What can I get you, traveler?\"", conditions: [], responseOptionIds: ["npc_courtesan_pc1"] },
  { id: "npc_courtesan_pc1", speakerId: "kenji", text: "\"Just some company, if you've got a spare moment.\"", conditions: [], responseOptionIds: ["npc_courtesan_reply1"] },
  { id: "npc_courtesan_reply1", speakerId: "npc_generic", text: "\"Company I can always spare.\" She winks, settling in across from him. \"Lucky for you, business is slow tonight.\"", conditions: [], responseOptionIds: [] },
  { id: "npc_courtesan_root_trust", speakerId: "npc_generic", text: "\"You keep coming back to my end of the bar specifically.\" She grins, delighted rather than suspicious. \"I don't mind one bit, for the record.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 20 }], responseOptionIds: ["npc_courtesan_pc2"] },
  { id: "npc_courtesan_pc2", speakerId: "kenji", text: "\"Can you blame me? The company's excellent.\"", conditions: [], responseOptionIds: ["npc_courtesan_reply2"] },
  { id: "npc_courtesan_reply2", speakerId: "npc_generic", text: "\"Careful, charming me back is a dangerous game.\" She laughs, warm and genuine. \"Come find me again soon, won't you?\"", conditions: [], responseOptionIds: [] },

  // --- Farm Girl ---
  { id: "npc_farmgirl_root", speakerId: "npc_generic", text: "\"Oh! Sorry, didn't hear you coming over the wind.\" She wipes dirt from her hands, cheerful despite the work. \"Nice to see a new face out here.\"", conditions: [], responseOptionIds: ["npc_farmgirl_pc1"] },
  { id: "npc_farmgirl_pc1", speakerId: "kenji", text: "\"Need a hand with any of this?\"", conditions: [], responseOptionIds: ["npc_farmgirl_reply1"] },
  { id: "npc_farmgirl_reply1", speakerId: "npc_generic", text: "\"That's kind of you to offer! I manage alright on my own, but I won't say no to the company.\" She grins, genuinely pleased.", conditions: [], responseOptionIds: [] },
  { id: "npc_farmgirl_root_trust", speakerId: "npc_generic", text: "\"You've stopped by enough now that I look forward to it.\" She smiles, a little shy about admitting it. \"Feels like we're becoming proper friends.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 20 }], responseOptionIds: ["npc_farmgirl_pc2"] },
  { id: "npc_farmgirl_pc2", speakerId: "kenji", text: "\"I look forward to it too, honestly.\"", conditions: [], responseOptionIds: ["npc_farmgirl_reply2"] },
  { id: "npc_farmgirl_reply2", speakerId: "npc_generic", text: "\"That makes me happier than you'd think.\" Her smile is wide and unguarded, cheeks pink from more than the sun.", conditions: [], responseOptionIds: [] },

  // --- Adventurer Explorer ---
  { id: "npc_explorer_root", speakerId: "npc_generic", text: "\"You look like someone who's actually been places, not just heard about them.\" She sizes him up with open curiosity, pack slung over one shoulder.", conditions: [], responseOptionIds: ["npc_explorer_pc1"] },
  { id: "npc_explorer_pc1", speakerId: "kenji", text: "\"I've seen my share, yeah. What are you exploring out here?\"", conditions: [], responseOptionIds: ["npc_explorer_reply1"] },
  { id: "npc_explorer_reply1", speakerId: "npc_generic", text: "\"Whatever the map doesn't cover yet. That's the fun of it.\" She grins. \"Maybe our paths will cross out there sometime.\"", conditions: [], responseOptionIds: [] },
  { id: "npc_explorer_root_trust", speakerId: "npc_generic", text: "\"Heard about you clearing that ruin single-handed. Impressive.\" Her earlier casual curiosity has sharpened into real respect. \"Wouldn't mind comparing notes sometime, if you're willing.\"", conditions: [{ type: "TRUST_AT_LEAST", value: 25 }], responseOptionIds: ["npc_explorer_pc2"] },
  { id: "npc_explorer_pc2", speakerId: "kenji", text: "\"I'd like that. Maybe we could explore somewhere together.\"", conditions: [], responseOptionIds: ["npc_explorer_reply2"] },
  { id: "npc_explorer_reply2", speakerId: "npc_generic", text: "\"Now that's an offer I won't turn down.\" Her grin turns genuinely warm. \"Looking forward to it, more than I probably should admit.\"", conditions: [], responseOptionIds: [] },
];

export const GENERIC_NPC_DIALOGUE_SETS: GenericNpcDialogueSetDef[] = [
  { procNpcClassId: "class_commoner", rootNodeIds: ["npc_commoner_root", "npc_commoner_root_trust"] },
  { procNpcClassId: "class_town_merchant", rootNodeIds: ["npc_merchant_root", "npc_merchant_root_trust"] },
  { procNpcClassId: "class_city_guard", rootNodeIds: ["npc_guard_root", "npc_guard_root_trust"] },
  { procNpcClassId: "class_high_noble_lady", rootNodeIds: ["npc_noble_root", "npc_noble_root_trust"] },
  { procNpcClassId: "class_bandit_outlaw", rootNodeIds: ["npc_bandit_root", "npc_bandit_root_trust"] },
  { procNpcClassId: "class_temple_priestess", rootNodeIds: ["npc_priestess_root", "npc_priestess_root_trust"] },
  { procNpcClassId: "class_academy_scholar", rootNodeIds: ["npc_scholar_root", "npc_scholar_root_trust"] },
  { procNpcClassId: "class_tavern_courtesan", rootNodeIds: ["npc_courtesan_root", "npc_courtesan_root_trust"] },
  { procNpcClassId: "class_farm_girl", rootNodeIds: ["npc_farmgirl_root", "npc_farmgirl_root_trust"] },
  { procNpcClassId: "class_adventurer_explorer", rootNodeIds: ["npc_explorer_root", "npc_explorer_root_trust"] },
];
