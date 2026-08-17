// ============================================================================
// OJISAN IN ANOTHER WORLD — COMPANION DIALOGUE DEPTH EXPANSION
// Adds a second root topic per stage for all 9 companions in
// dialogue_companions_seed_data.ts, bringing them to genuine parity with
// Mira's baseline depth (2 root topics per stage minimum) rather than the
// single-topic-per-stage version first delivered. Each new topic explores a
// different facet of the same stage — not a redundant rephrasing of the
// existing root — matching Mira's own pattern of 2-3 distinct things to
// talk about at a given relationship point.
//
// These IDs must be added to each companion's rootNodeIds array in
// dialogue_companions_seed_data.ts (done via the accompanying edit) — this
// file supplies the nodes themselves.
// ============================================================================

import { DialogueNodeDef } from "./schemas";
import { CompanionId } from "./schemas";

// ============================================================================
// ISOLDE — second topics: methodology, small gestures, academic rejection,
// pre-confession nerves, cataloging the household, a rival scholar, legacy
// ============================================================================

export const ISOLDE_DIALOGUE_NODES_EXPANSION: DialogueNodeDef[] = [
  { id: "isolde_s1_root_b", speakerId: CompanionId.Isolde, text: "\"Most people assume archiving is just shelving.\" Isolde raises an eyebrow, testing whether he'll dismiss it too. \"It's closer to forensics. Every mistranslation tells you something true.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["isolde_s1b_pc1"] },
  { id: "isolde_s1b_pc1", speakerId: "kenji", text: "\"That's a more interesting way to think about it than I expected.\"", conditions: [], responseOptionIds: ["isolde_s1b_npc1"] },
  { id: "isolde_s1b_npc1", speakerId: CompanionId.Isolde, text: "\"Most people's expectations of me are fairly low, admittedly.\" A small, genuine smile. \"I appreciate you clearing that particular bar.\"", conditions: [], responseOptionIds: [] },

  { id: "isolde_s2_root_b", speakerId: CompanionId.Isolde, text: "He's brought her a pressed flower from the meadows, tucked into a book. Isolde examines it with far more care than the gesture strictly requires. \"You remembered I like these for margin notes.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["isolde_s2b_pc1"] },
  { id: "isolde_s2b_pc1", speakerId: "kenji", text: "\"I pay attention to what you like.\"", conditions: [], responseOptionIds: ["isolde_s2b_npc1"] },
  { id: "isolde_s2b_npc1", speakerId: CompanionId.Isolde, text: "She presses the flower flat between two pages, deliberate and careful. \"That is a rarer quality than you'd think. I intend to keep this one.\"", conditions: [], responseOptionIds: [] },

  { id: "isolde_s3_root_b", speakerId: CompanionId.Isolde, text: "\"The Academy dismissed my research on Miasma etymology as 'unserious scholarship.'\" Isolde's voice is flat, old anger worn smooth. \"I came here partly to prove them wrong. I'm not certain I still need to.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["isolde_s3b_pc1"] },
  { id: "isolde_s3b_pc1", speakerId: "kenji", text: "\"Your work matters, whether or not they ever admit it.\"", conditions: [], responseOptionIds: ["isolde_s3b_npc1"] },
  { id: "isolde_s3b_npc1", speakerId: CompanionId.Isolde, text: "\"I've started to believe that without needing their approval attached to it.\" She looks almost surprised at herself. \"That's new. I think you're responsible.\"", conditions: [], responseOptionIds: [] },

  { id: "isolde_s4_root_b", speakerId: CompanionId.Isolde, text: "She's rehearsing something under her breath near the Archive doors, hasn't noticed him yet. \"...no, too formal. 'I find myself'— no, absurd—\" She startles when she sees him. \"I— was practicing something. Never mind, ignore that entirely.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 45 }], responseOptionIds: ["isolde_s4b_pc1"] },
  { id: "isolde_s4b_pc1", speakerId: "kenji", text: "\"Whatever it is, take your time. I'm not in a hurry.\"", conditions: [], responseOptionIds: ["isolde_s4b_npc1"] },
  { id: "isolde_s4b_npc1", speakerId: CompanionId.Isolde, text: "\"Thank you for that patience.\" Her cheeks color faintly. \"You may regret offering it, once I finally work up the nerve to say what I'm practicing.\"", conditions: [], responseOptionIds: [] },

  { id: "isolde_s5_root_b", speakerId: CompanionId.Isolde, text: "\"I've begun cataloging the Manor's own history — every companion's story, properly preserved.\" Isolde looks pleased with the project. \"Someone should remember all of this accurately, someday.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["isolde_s5b_pc1"] },
  { id: "isolde_s5b_pc1", speakerId: "kenji", text: "\"I like the idea of our story being preserved that carefully.\"", conditions: [], responseOptionIds: ["isolde_s5b_npc1"] },
  { id: "isolde_s5b_npc1", speakerId: CompanionId.Isolde, text: "\"Then I'll make certain it's done properly.\" She's already sketching an index in the margins of her notebook. \"Some things deserve precision, not just memory.\"", conditions: [], responseOptionIds: [] },

  { id: "isolde_s6_root_b", speakerId: CompanionId.Isolde, text: "\"A rival scholar has been spreading word that my research is derivative of his own.\" Isolde's composure is icy rather than distressed. \"I find I care less about winning the argument than I once would have.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["isolde_s6b_pc1"] },
  { id: "isolde_s6b_pc1", speakerId: "kenji", text: "\"Your work speaks for itself. You don't need to win every argument to be right.\"", conditions: [], responseOptionIds: ["isolde_s6b_npc1"] },
  { id: "isolde_s6b_npc1", speakerId: CompanionId.Isolde, text: "\"A refreshingly unbothered perspective.\" She almost laughs. \"Perhaps I've simply found better things to spend my conviction on these days.\"", conditions: [], responseOptionIds: [] },

  { id: "isolde_s7_root_b", speakerId: CompanionId.Isolde, text: "\"I used to measure my worth by what I contributed to the historical record.\" Isolde closes her personal book gently. \"Now I think the quiet, unrecorded moments with you might matter just as much.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["isolde_s7b_pc1"] },
  { id: "isolde_s7b_pc1", speakerId: "kenji", text: "\"They matter more, honestly. Those are the ones that are really ours.\"", conditions: [], responseOptionIds: ["isolde_s7b_npc1"] },
  { id: "isolde_s7b_npc1", speakerId: CompanionId.Isolde, text: "\"I've come to agree entirely.\" She sets the book aside for the evening, an unusual and deliberate choice. \"Let this moment stay unrecorded, then. Just ours.\"", conditions: [], responseOptionIds: [] },
];

// ============================================================================
// GRAEL — second topics: craft philosophy, a gift he's made, his mother's
// past, pre-confession nerves, teaching others, prejudice from a customer,
// building something together
// ============================================================================

export const GRAEL_DIALOGUE_NODES_EXPANSION: DialogueNodeDef[] = [
  { id: "grael_s1_root_b", speakerId: CompanionId.Grael, text: "\"Good steel ain't about strength alone.\" Grael turns a blade slowly, checking the temper line. \"It's about knowin' when to hold firm and when to give a little. Same as most things, I reckon.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["grael_s1b_pc1"] },
  { id: "grael_s1b_pc1", speakerId: "kenji", text: "\"Sounds like more than just a smithing lesson.\"", conditions: [], responseOptionIds: ["grael_s1b_npc1"] },
  { id: "grael_s1b_npc1", speakerId: CompanionId.Grael, text: "\"Maybe. Maybe not.\" A faint, knowing grin. \"Take it however suits you.\"", conditions: [], responseOptionIds: [] },

  { id: "grael_s2_root_b", speakerId: CompanionId.Grael, text: "Grael holds out a small iron charm, rough but sturdy. \"Made this in my off hours. Ain't much. Figured you could use somethin' lucky out there.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["grael_s2b_pc1"] },
  { id: "grael_s2b_pc1", speakerId: "kenji", text: "\"I'll carry it with me always. Thank you, Grael.\"", conditions: [], responseOptionIds: ["grael_s2b_npc1"] },
  { id: "grael_s2b_npc1", speakerId: CompanionId.Grael, text: "\"Good.\" She clears her throat, gruffly pleased. \"Didn't want you out there without somethin' from me, is all.\"", conditions: [], responseOptionIds: [] },

  { id: "grael_s3_root_b", speakerId: CompanionId.Grael, text: "\"My ma raised me alone. Half-orc daughter made that hard on her, more than it shoulda been.\" Grael's hammer stills. \"She never once made me feel like less, though. Wish she'd lived to see me make somethin' of myself.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["grael_s3b_pc1"] },
  { id: "grael_s3b_pc1", speakerId: "kenji", text: "\"She'd see it, Grael. I'm sure of that.\"", conditions: [], responseOptionIds: ["grael_s3b_npc1"] },
  { id: "grael_s3b_npc1", speakerId: CompanionId.Grael, text: "She goes quiet a moment, throat working. \"...Reckon I'd like to believe that.\" A rough exhale. \"Preciate you sayin' it, all the same.\"", conditions: [], responseOptionIds: [] },

  { id: "grael_s4_root_b", speakerId: CompanionId.Grael, text: "Grael's been staring at the same horseshoe for a full minute without hammering it. \"Been tryin' to work up to sayin' somethin'. Ain't as easy as it looks when you're not usually one for many words.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 45 }], responseOptionIds: ["grael_s4b_pc1"] },
  { id: "grael_s4b_pc1", speakerId: "kenji", text: "\"Take whatever time you need. I'm not going anywhere.\"", conditions: [], responseOptionIds: ["grael_s4b_npc1"] },
  { id: "grael_s4b_npc1", speakerId: CompanionId.Grael, text: "\"'Preciate that.\" She sets the hammer down entirely, steadying herself. \"Gonna need every bit of that patience, what I'm workin' up to sayin'.\"", conditions: [], responseOptionIds: [] },

  { id: "grael_s5_root_b", speakerId: CompanionId.Grael, text: "\"Been teachin' some of the Manor staff basic smithing. Feels good, passin' the trade on.\" Grael looks genuinely content, watching an apprentice work the bellows.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["grael_s5b_pc1"] },
  { id: "grael_s5b_pc1", speakerId: "kenji", text: "\"You'd make a good teacher, Grael.\"", conditions: [], responseOptionIds: ["grael_s5b_npc1"] },
  { id: "grael_s5b_npc1", speakerId: CompanionId.Grael, text: "\"Didn't figure myself for one, honestly.\" She grins, pleased. \"But reckon there's worse things to be than useful to folks who wanna learn.\"", conditions: [], responseOptionIds: [] },

  { id: "grael_s6_root_b", speakerId: CompanionId.Grael, text: "\"Had a noble's steward refuse to deal with me direct on account of what I am.\" Grael's jaw is tight. \"Old wound, that kind of thing. Thought I was past lettin' it sting.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["grael_s6b_pc1"] },
  { id: "grael_s6b_pc1", speakerId: "kenji", text: "\"That steward's loss. Anyone who can't see your worth doesn't deserve your work.\"", conditions: [], responseOptionIds: ["grael_s6b_npc1"] },
  { id: "grael_s6b_npc1", speakerId: CompanionId.Grael, text: "\"Hah. Never thought of it that way.\" Some of the tension eases from her shoulders. \"Good way to think of it, though. Gonna hold onto that one.\"", conditions: [], responseOptionIds: [] },

  { id: "grael_s7_root_b", speakerId: CompanionId.Grael, text: "\"Been sketchin' plans for somethin'. A proper house, just for us, past all this.\" Grael shows him rough, careful drawings. \"Ain't in a hurry. Just like knowin' it's there to build, someday.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["grael_s7b_pc1"] },
  { id: "grael_s7b_pc1", speakerId: "kenji", text: "\"I'd love that, Grael. Building a future with you, brick by brick.\"", conditions: [], responseOptionIds: ["grael_s7b_npc1"] },
  { id: "grael_s7b_npc1", speakerId: CompanionId.Grael, text: "\"Brick by brick.\" She grins, wide and certain. \"Reckon that's about the best way I've ever heard it put.\"", conditions: [], responseOptionIds: [] },
];

// ============================================================================
// VALKA — second topics: leadership philosophy, sharing a meal, old scars,
// vulnerability behind the "order," training staff, a rival's challenge,
// reflecting on peace
// ============================================================================

export const VALKA_DIALOGUE_NODES_EXPANSION: DialogueNodeDef[] = [
  { id: "valka_s1_root_b", speakerId: CompanionId.Valka, text: "\"A commander who leads from behind a desk has already lost her soldiers' respect.\" Valka checks her own blade's edge, matter-of-fact. \"I hold the front line myself, always. Anything less is a lie.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["valka_s1b_pc1"] },
  { id: "valka_s1b_pc1", speakerId: "kenji", text: "\"That's a rare kind of leadership.\"", conditions: [], responseOptionIds: ["valka_s1b_npc1"] },
  { id: "valka_s1b_npc1", speakerId: CompanionId.Valka, text: "\"Rare, or simply correct.\" A faint, approving nod. \"I'm glad you understand the difference.\"", conditions: [], responseOptionIds: [] },

  { id: "valka_s2_root_b", speakerId: CompanionId.Valka, text: "Valka pours two cups of the Fortress's rough wine, offering one across the table. \"Sit. Even commanders need an evening off duty occasionally.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["valka_s2b_pc1"] },
  { id: "valka_s2b_pc1", speakerId: "kenji", text: "\"I'd like that. To something other than war, for once.\"", conditions: [], responseOptionIds: ["valka_s2b_npc1"] },
  { id: "valka_s2b_npc1", speakerId: CompanionId.Valka, text: "She actually smiles, clinking her cup against his. \"To something other than war. I'll drink to that gladly.\"", conditions: [], responseOptionIds: [] },

  { id: "valka_s3_root_b", speakerId: CompanionId.Valka, text: "\"Every scar has a story. This one—\" Valka traces a line along her forearm, \"—cost me two soldiers I couldn't save in time. I carry that more than the mark itself.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["valka_s3b_pc1"] },
  { id: "valka_s3b_pc1", speakerId: "kenji", text: "\"Carrying that weight doesn't make you weak, Valka. It makes you human.\"", conditions: [], responseOptionIds: ["valka_s3b_npc1"] },
  { id: "valka_s3b_npc1", speakerId: CompanionId.Valka, text: "\"Human.\" She turns the word over, unfamiliar in her own mouth. \"Perhaps that's not the insult I once assumed it to be.\"", conditions: [], responseOptionIds: [] },

  { id: "valka_s4_root_b", speakerId: CompanionId.Valka, text: "Valka has drafted and redrafted a declaration on fortress stationery, crossing out line after line. \"I command armies with ease. Apparently commanding my own heart requires considerably more drafts.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 45 }], responseOptionIds: ["valka_s4b_pc1"] },
  { id: "valka_s4b_pc1", speakerId: "kenji", text: "\"Whatever's in those drafts, I'd like to hear it eventually, in your own time.\"", conditions: [], responseOptionIds: ["valka_s4b_npc1"] },
  { id: "valka_s4b_npc1", speakerId: CompanionId.Valka, text: "\"You'll hear it soon. I refuse to let a blank page best me.\" A determined, almost nervous smile. \"Give me time to finish drafting my own surrender.\"", conditions: [], responseOptionIds: [] },

  { id: "valka_s5_root_b", speakerId: CompanionId.Valka, text: "\"I've begun training the Manor's guards properly. Sloppy footwork, the lot of them, but eager.\" Valka looks more at ease commanding here than she ever let on at Eastmarch.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["valka_s5b_pc1"] },
  { id: "valka_s5b_pc1", speakerId: "kenji", text: "\"They're lucky to learn from you.\"", conditions: [], responseOptionIds: ["valka_s5b_npc1"] },
  { id: "valka_s5b_npc1", speakerId: CompanionId.Valka, text: "\"They're improving quickly, at least.\" A rare, satisfied smile. \"There's a particular joy in building something rather than only defending it.\"", conditions: [], responseOptionIds: [] },

  { id: "valka_s6_root_b", speakerId: CompanionId.Valka, text: "\"A rival commander has challenged my right to lead, calling my time here a desertion of duty.\" Valka's pride bristles. \"I have half a mind to answer that challenge personally.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["valka_s6b_pc1"] },
  { id: "valka_s6b_pc1", speakerId: "kenji", text: "\"You don't need to prove anything to someone who doesn't understand your choices.\"", conditions: [], responseOptionIds: ["valka_s6b_npc1"] },
  { id: "valka_s6b_npc1", speakerId: CompanionId.Valka, text: "She considers that, jaw unclenching slowly. \"...A wiser response than my first instinct, admittedly. Let him talk. My conviction needs no audience.\"", conditions: [], responseOptionIds: [] },

  { id: "valka_s7_root_b", speakerId: CompanionId.Valka, text: "\"I spent decades preparing for wars that never seemed to end.\" Valka watches the Manor grounds, calm in a way that would have been foreign to her once. \"I did not know peace could feel this solid beneath my feet.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["valka_s7b_pc1"] },
  { id: "valka_s7b_pc1", speakerId: "kenji", text: "\"You've earned every bit of that peace, Valka.\"", conditions: [], responseOptionIds: ["valka_s7b_npc1"] },
  { id: "valka_s7b_npc1", speakerId: CompanionId.Valka, text: "\"Perhaps I have.\" She takes his hand, uncharacteristically soft. \"I intend to hold this ground for the rest of my life, and gladly.\"", conditions: [], responseOptionIds: [] },
];

// ============================================================================
// SEIRA — second topics: moonlit strategy/wit, swordplay lesson, the night
// she left, playful pre-confession, night garden, a homeland spy, stargazing
// ============================================================================

export const SEIRA_DIALOGUE_NODES_EXPANSION: DialogueNodeDef[] = [
  { id: "seira_s1_root_b", speakerId: CompanionId.Seira, text: "\"Most commanders overextend by daylight, eager to be seen winning.\" Seira traces a battle line in the dirt by moonlight. \"I prefer to win quietly, when no one's watching for credit.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["seira_s1b_pc1"] },
  { id: "seira_s1b_pc1", speakerId: "kenji", text: "\"That's a rare kind of confidence.\"", conditions: [], responseOptionIds: ["seira_s1b_npc1"] },
  { id: "seira_s1b_npc1", speakerId: CompanionId.Seira, text: "\"Confidence, or simply preference.\" A slow, knowing smile. \"I find I don't need an audience to know my own worth.\"", conditions: [], responseOptionIds: [] },

  { id: "seira_s2_root_b", speakerId: CompanionId.Seira, text: "\"Since you keep visiting, allow me to teach you something useful.\" Seira offers him a training blade, playful challenge in her eyes. \"Moon elf footwork. Try to keep up.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["seira_s2b_pc1"] },
  { id: "seira_s2b_pc1", speakerId: "kenji", text: "\"I'll do my best not to embarrass myself.\"", conditions: [], responseOptionIds: ["seira_s2b_npc1"] },
  { id: "seira_s2b_npc1", speakerId: CompanionId.Seira, text: "She circles him with practiced ease, clearly enjoying herself. \"A modest goal. Let's see if you can exceed it.\"", conditions: [], responseOptionIds: [] },

  { id: "seira_s3_root_b", speakerId: CompanionId.Seira, text: "\"The night I left, I didn't say goodbye to anyone. Cowardice, if I'm honest with myself.\" Seira's composure wavers under real regret. \"I've never spoken that aloud before tonight.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["seira_s3b_pc1"] },
  { id: "seira_s3b_pc1", speakerId: "kenji", text: "\"Sometimes leaving quietly is the only way we know how to survive it. That's not cowardice.\"", conditions: [], responseOptionIds: ["seira_s3b_npc1"] },
  { id: "seira_s3b_npc1", speakerId: CompanionId.Seira, text: "\"I want to believe that.\" Her eyes shine faintly in the moonlight. \"Thank you for giving me room to consider it.\"", conditions: [], responseOptionIds: [] },

  { id: "seira_s4_root_b", speakerId: CompanionId.Seira, text: "\"I could simply order you to love me. Generals do occasionally issue absurd commands.\" Seira's joke falls flat under her own nervous energy. \"Forgive me. I'm stalling terribly.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 40 } ], responseOptionIds: ["seira_s4b_pc1"] },
  { id: "seira_s4b_pc1", speakerId: "kenji", text: "\"You don't need to order anything from me, Seira. Just tell me.\"", conditions: [], responseOptionIds: ["seira_s4b_npc1"] },
  { id: "seira_s4b_npc1", speakerId: CompanionId.Seira, text: "\"...Fair.\" A shaky breath, nerves finally settling. \"Give me one more moment, and I will.\"", conditions: [], responseOptionIds: [] },

  { id: "seira_s5_root_b", speakerId: CompanionId.Seira, text: "\"I've been cultivating night-blooming flowers along the Manor's western wall.\" Seira looks radiant under the moon among her new garden. \"There's something fitting about tending beauty that only reveals itself in darkness.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["seira_s5b_pc1"] },
  { id: "seira_s5b_pc1", speakerId: "kenji", text: "\"It suits you perfectly.\"", conditions: [], responseOptionIds: ["seira_s5b_npc1"] },
  { id: "seira_s5b_npc1", speakerId: CompanionId.Seira, text: "\"I rather think it does.\" She breathes in the night air, utterly content. \"Thank you for giving that beauty somewhere safe to grow.\"", conditions: [], responseOptionIds: [] },

  { id: "seira_s6_root_b", speakerId: CompanionId.Seira, text: "\"I've noticed someone watching from the treeline these past few nights. One of my homeland's agents, I suspect.\" Seira's calm hardens into wary readiness.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["seira_s6b_pc1"] },
  { id: "seira_s6b_pc1", speakerId: "kenji", text: "\"We'll face them together, whatever they want.\"", conditions: [], responseOptionIds: ["seira_s6b_npc1"] },
  { id: "seira_s6b_npc1", speakerId: CompanionId.Seira, text: "\"Together, then.\" Her readiness steadies into calm resolve. \"Let them watch. I have nothing left to hide that I'm ashamed of.\"", conditions: [], responseOptionIds: [] },

  { id: "seira_s7_root_b", speakerId: CompanionId.Seira, text: "Seira lies beside him beneath a clear sky, pointing out constellations from her homeland's old star charts. \"I used to navigate by these alone. Strange, how much less lonely the same stars feel now.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["seira_s7b_pc1"] },
  { id: "seira_s7b_pc1", speakerId: "kenji", text: "\"I hope they always feel that way, with me beside you.\"", conditions: [], responseOptionIds: ["seira_s7b_npc1"] },
  { id: "seira_s7b_npc1", speakerId: CompanionId.Seira, text: "\"They will.\" She laces her fingers through his beneath the stars. \"I've charted a great many things in my life. This is the first course I never want to change.\"", conditions: [], responseOptionIds: [] },
];

// ============================================================================
// SYLVARA — second topics: listening to the grove, growing something
// together, lost dryad sisters, shy nerves, Manor grounds blooming, a
// blight threat, visions of future seasons
// ============================================================================

export const SYLVARA_DIALOGUE_NODES_EXPANSION: DialogueNodeDef[] = [
  { id: "sylvara_s1_root_b", speakerId: CompanionId.Sylvara, text: "\"Close your eyes. Listen — not with your ears, but beneath them.\" Sylvara guides his hand to the bark of an ancient tree. \"The grove speaks, if you're patient enough to hear it.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["sylvara_s1b_pc1"] },
  { id: "sylvara_s1b_pc1", speakerId: "kenji", text: "\"I think I feel something. Faint, but there.\"", conditions: [], responseOptionIds: ["sylvara_s1b_npc1"] },
  { id: "sylvara_s1b_npc1", speakerId: CompanionId.Sylvara, text: "\"Then you are already listening better than most.\" Her smile is warm as sunlight. \"That is a rare gift, Kenji.\"", conditions: [], responseOptionIds: [] },

  { id: "sylvara_s2_root_b", speakerId: CompanionId.Sylvara, text: "\"Help me plant this seed. A small ritual, but a meaningful one.\" Sylvara guides his hands into the soil alongside hers, patient and deliberate.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["sylvara_s2b_pc1"] },
  { id: "sylvara_s2b_pc1", speakerId: "kenji", text: "\"I like the idea of growing something together.\"", conditions: [], responseOptionIds: ["sylvara_s2b_npc1"] },
  { id: "sylvara_s2b_npc1", speakerId: CompanionId.Sylvara, text: "\"As do I.\" She presses the soil gently over the seed. \"We will watch this grow together, then, however long it takes.\"", conditions: [], responseOptionIds: [] },

  { id: "sylvara_s3_root_b", speakerId: CompanionId.Sylvara, text: "\"I remember each of my sisters' names still, though their groves have long since gone silent.\" Sylvara's ancient eyes carry centuries of quiet grief. \"I speak them aloud sometimes, so they are not entirely forgotten.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["sylvara_s3b_pc1"] },
  { id: "sylvara_s3b_pc1", speakerId: "kenji", text: "\"Tell me their names, if you'd like. I'll remember them too.\"", conditions: [], responseOptionIds: ["sylvara_s3b_npc1"] },
  { id: "sylvara_s3b_npc1", speakerId: CompanionId.Sylvara, text: "Her breath catches, moved beyond words for a long moment. \"That is a kindness I did not expect to be offered. Thank you, Kenji. Truly.\"", conditions: [], responseOptionIds: [] },

  { id: "sylvara_s4_root_b", speakerId: CompanionId.Sylvara, text: "\"Even ancient things can feel nervous, it seems.\" Sylvara laughs softly at her own trembling hands. \"I have weathered a thousand storms unshaken. This feeling is entirely unfamiliar.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 45 }], responseOptionIds: ["sylvara_s4b_pc1"] },
  { id: "sylvara_s4b_pc1", speakerId: "kenji", text: "\"Take whatever time you need, Sylvara. I'm not going anywhere.\"", conditions: [], responseOptionIds: ["sylvara_s4b_npc1"] },
  { id: "sylvara_s4b_npc1", speakerId: CompanionId.Sylvara, text: "\"Patience suits you well.\" A slow, steadying breath. \"Roots take their time settling. Perhaps this feeling deserves the same care.\"", conditions: [], responseOptionIds: [] },

  { id: "sylvara_s5_root_b", speakerId: CompanionId.Sylvara, text: "\"The Manor grounds have begun to bloom in ways they never did before I arrived.\" Sylvara looks quietly proud, surrounded by new growth. \"It seems my presence leaves gentler marks than I once feared.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["sylvara_s5b_pc1"] },
  { id: "sylvara_s5b_pc1", speakerId: "kenji", text: "\"Everything's more beautiful with you here, Sylvara.\"", conditions: [], responseOptionIds: ["sylvara_s5b_npc1"] },
  { id: "sylvara_s5b_npc1", speakerId: CompanionId.Sylvara, text: "\"You are kind to say so.\" She smiles, radiant among the new blossoms. \"I find this place more beautiful for having you in it too.\"", conditions: [], responseOptionIds: [] },

  { id: "sylvara_s6_root_b", speakerId: CompanionId.Sylvara, text: "\"A blight creeps toward the World Tree Core itself now, not just its outer roots.\" Sylvara's serenity is genuinely shaken. \"If it reaches the heart of the tree, I fear what that might mean for me as well.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["sylvara_s6b_pc1"] },
  { id: "sylvara_s6b_pc1", speakerId: "kenji", text: "\"Then we go now, together, and we stop it before it reaches that far.\"", conditions: [], responseOptionIds: ["sylvara_s6b_npc1"] },
  { id: "sylvara_s6b_npc1", speakerId: CompanionId.Sylvara, text: "\"Together.\" Her resolve steadies, fear giving way to purpose. \"I have faced many things alone across the centuries. I am glad not to face this one that way.\"", conditions: [], responseOptionIds: [] },

  { id: "sylvara_s7_root_b", speakerId: CompanionId.Sylvara, text: "\"I can see the shape of seasons yet to come, faintly, the way roots sense rain before it falls.\" Sylvara smiles serenely. \"They all look brighter, somehow, with you standing in them.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["sylvara_s7b_pc1"] },
  { id: "sylvara_s7b_pc1", speakerId: "kenji", text: "\"I intend to stand in every one of them, Sylvara, for as long as I possibly can.\"", conditions: [], responseOptionIds: ["sylvara_s7b_npc1"] },
  { id: "sylvara_s7b_npc1", speakerId: CompanionId.Sylvara, text: "\"Then those seasons are already brighter for it.\" She takes his hand, ancient and utterly at peace. \"I have all the patience of the earth to spend beside you.\"", conditions: [], responseOptionIds: [] },
];

// ============================================================================
// REVA — second topics: a wary negotiation, an unguarded moment, her
// handler's cruelty, nervous humor pre-confession, redecorating her suite,
// a blackmail attempt, trusting him with her true self
// ============================================================================

export const REVA_DIALOGUE_NODES_EXPANSION: DialogueNodeDef[] = [
  { id: "reva_s1_root_b", speakerId: CompanionId.Reva, text: "\"Information is the only currency that never depreciates.\" Reva studies him over steepled fingers. \"I'll trade you a favor for a favor, Kenji. Simple enough terms, don't you think?\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["reva_s1b_pc1"] },
  { id: "reva_s1b_pc1", speakerId: "kenji", text: "\"Simple enough. I'm not afraid of a fair trade.\"", conditions: [], responseOptionIds: ["reva_s1b_npc1"] },
  { id: "reva_s1b_npc1", speakerId: CompanionId.Reva, text: "\"Good. Fair trades are rarer than they should be, in this court.\" A calculating smile, though not unkind. \"I look forward to seeing what you're worth.\"", conditions: [], responseOptionIds: [] },

  { id: "reva_s2_root_b", speakerId: CompanionId.Reva, text: "He catches her without her fan, without her careful court mask — just reading quietly by a window. Reva startles, caught genuinely off guard for once. \"You weren't meant to see me like this.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["reva_s2b_pc1"] },
  { id: "reva_s2b_pc1", speakerId: "kenji", text: "\"I like this version of you. No masks required.\"", conditions: [], responseOptionIds: ["reva_s2b_npc1"] },
  { id: "reva_s2b_npc1", speakerId: CompanionId.Reva, text: "She sets the book down slowly, unmasked expression softening. \"That's... dangerously easy to hear from you. I should be more careful around you, clearly.\"", conditions: [], responseOptionIds: [] },

  { id: "reva_s3_root_b", speakerId: CompanionId.Reva, text: "\"My handler used cruelty as a teaching tool. Fear made me useful, in his estimation.\" Reva's voice is carefully controlled, old wounds beneath the calm. \"I learned to be very good at what he needed. I paid for it in other ways.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["reva_s3b_pc1"] },
  { id: "reva_s3b_pc1", speakerId: "kenji", text: "\"You survived something that should never have been asked of you, Reva.\"", conditions: [], responseOptionIds: ["reva_s3b_npc1"] },
  { id: "reva_s3b_npc1", speakerId: CompanionId.Reva, text: "Her composure cracks, just slightly, gratitude breaking through. \"I don't often let myself be seen as a survivor rather than simply a useful tool. Thank you for the distinction.\"", conditions: [], responseOptionIds: [] },

  { id: "reva_s4_root_b", speakerId: CompanionId.Reva, text: "\"I've rehearsed cutting remarks for every uncomfortable situation imaginable. Somehow none apply here.\" Reva laughs at herself, nervous energy showing through her usual wit. \"Bear with me. I'm genuinely out of clever things to say.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 50 }], responseOptionIds: ["reva_s4b_pc1"] },
  { id: "reva_s4b_pc1", speakerId: "kenji", text: "\"You don't need to be clever with me, Reva. Just honest.\"", conditions: [], responseOptionIds: ["reva_s4b_npc1"] },
  { id: "reva_s4b_npc1", speakerId: CompanionId.Reva, text: "\"Honest.\" She exhales, steadying herself. \"That's considerably more terrifying than clever, for someone like me. Give me one more moment.\"", conditions: [], responseOptionIds: [] },

  { id: "reva_s5_root_b", speakerId: CompanionId.Reva, text: "\"I've stripped the Court's aesthetic entirely from my suite. No painted fans on display, no political trophies.\" Reva looks around her own space, quietly satisfied. \"Just things I actually chose, for once.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["reva_s5b_pc1"] },
  { id: "reva_s5b_pc1", speakerId: "kenji", text: "\"It suits the real you far better.\"", conditions: [], responseOptionIds: ["reva_s5b_npc1"] },
  { id: "reva_s5b_npc1", speakerId: CompanionId.Reva, text: "\"I'm inclined to agree.\" A small, genuine smile. \"It's strange, how much lighter a room feels when nothing in it is a performance.\"", conditions: [], responseOptionIds: [] },

  { id: "reva_s6_root_b", speakerId: CompanionId.Reva, text: "\"Someone's attempting to blackmail me with old Court secrets I thought long buried.\" Reva's calculating edge sharpens into cold fury. \"I intend to handle this myself, but I won't pretend it doesn't unsettle me.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["reva_s6b_pc1"] },
  { id: "reva_s6b_pc1", speakerId: "kenji", text: "\"You don't have to handle it alone. Let me help you end this properly.\"", conditions: [], responseOptionIds: ["reva_s6b_npc1"] },
  { id: "reva_s6b_npc1", speakerId: CompanionId.Reva, text: "\"...Very well. Together, then.\" Something in her posture eases, trust winning out over old instincts. \"Let's see how well they fare against the two of us.\"", conditions: [], responseOptionIds: [] },

  { id: "reva_s7_root_b", speakerId: CompanionId.Reva, text: "\"My real name isn't Reva. It's a name I buried along with the girl the Court bought.\" She says it quietly, offering him something she's never given anyone. \"I want you to know it. All of it. Truly me.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["reva_s7b_pc1"] },
  { id: "reva_s7b_pc1", speakerId: "kenji", text: "\"Thank you for trusting me with that. Whatever name you choose, I love all of you.\"", conditions: [], responseOptionIds: ["reva_s7b_npc1"] },
  { id: "reva_s7b_npc1", speakerId: CompanionId.Reva, text: "\"All of me.\" She repeats it softly, wonderingly. \"I don't think anyone has ever meant that quite so fully before. Thank you, Kenji.\"", conditions: [], responseOptionIds: [] },
];

// ============================================================================
// TASHA — second topics: haggling savvy, a card trick, family left behind,
// a joke before the real confession, expanding her shop, a rival merchant,
// planning a future
// ============================================================================

export const TASHA_DIALOGUE_NODES_EXPANSION: DialogueNodeDef[] = [
  { id: "tasha_s1_root_b", speakerId: CompanionId.Tasha, text: "\"Watch and learn: the trick to haggling isn't lying, it's knowing exactly which truth to lead with.\" Tasha winks, clearly delighted to show off her craft.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["tasha_s1b_pc1"] },
  { id: "tasha_s1b_pc1", speakerId: "kenji", text: "\"I'll remember that, next time I'm buying something from you.\"", conditions: [], responseOptionIds: ["tasha_s1b_npc1"] },
  { id: "tasha_s1b_npc1", speakerId: CompanionId.Tasha, text: "\"Ha! Smart. Though fair warning, I'm still better at this game than you.\" She grins, tails flicking with mischief.", conditions: [], responseOptionIds: [] },

  { id: "tasha_s2_root_b", speakerId: CompanionId.Tasha, text: "\"Bet you can't guess which cup the coin's under.\" Tasha shuffles three cups with practiced, dazzling speed. \"Merchant's classic. Never once lose at this.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["tasha_s2b_pc1"] },
  { id: "tasha_s2b_pc1", speakerId: "kenji", text: "\"I'll take that bet. What am I playing for?\"", conditions: [], responseOptionIds: ["tasha_s2b_npc1"] },
  { id: "tasha_s2b_npc1", speakerId: CompanionId.Tasha, text: "\"Winner picks. I'm thinking... dinner together, my treat, either way.\" She grins, having rigged the whole game to end in her favor regardless.", conditions: [], responseOptionIds: [] },

  { id: "tasha_s3_root_b", speakerId: CompanionId.Tasha, text: "\"Had a whole den of kitsune kits once, growing up. Left 'em all behind when I struck out on my own.\" Tasha's usual grin dims. \"Don't talk about that much. Kinda still stings, honestly.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["tasha_s3b_pc1"] },
  { id: "tasha_s3b_pc1", speakerId: "kenji", text: "\"You could visit them, if you ever wanted to. I'd go with you.\"", conditions: [], responseOptionIds: ["tasha_s3b_npc1"] },
  { id: "tasha_s3b_npc1", speakerId: CompanionId.Tasha, text: "\"...Yeah. Yeah, maybe someday I will.\" Her smile returns, softer than usual. \"Thanks for saying that like it's actually possible.\"", conditions: [], responseOptionIds: [] },

  { id: "tasha_s4_root_b", speakerId: CompanionId.Tasha, text: "\"Okay, real talk — actually, wait, gimme a sec, let me think of a joke first to soften this up—\" Tasha stops herself, laughing nervously. \"No. No jokes. I promised myself. This one's just gonna be real.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 40 }], responseOptionIds: ["tasha_s4b_pc1"] },
  { id: "tasha_s4b_pc1", speakerId: "kenji", text: "\"Real is exactly what I want to hear from you.\"", conditions: [], responseOptionIds: ["tasha_s4b_npc1"] },
  { id: "tasha_s4b_npc1", speakerId: CompanionId.Tasha, text: "\"Okay. Okay, here goes.\" A steadying breath, entirely unlike her usual confidence. \"Give me one more second, and I'm gonna say it.\"", conditions: [], responseOptionIds: [] },

  { id: "tasha_s5_root_b", speakerId: CompanionId.Tasha, text: "\"Expanded my little Manor stall into an actual shop. Got shelves and everything now, not just a cart.\" Tasha looks genuinely proud, gesturing at her new setup.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["tasha_s5b_pc1"] },
  { id: "tasha_s5b_pc1", speakerId: "kenji", text: "\"It looks amazing, Tasha. You've built something real here.\"", conditions: [], responseOptionIds: ["tasha_s5b_npc1"] },
  { id: "tasha_s5b_npc1", speakerId: CompanionId.Tasha, text: "\"First real thing I've ever built that stays put.\" She beams, genuinely moved. \"Feels good. Really good, actually.\"", conditions: [], responseOptionIds: [] },

  { id: "tasha_s6_root_b", speakerId: CompanionId.Tasha, text: "\"An old rival merchant's been undercutting my prices out of pure spite.\" Tasha's usual easygoing nature has an edge to it. \"Petty of them, honestly. Might have to remind them why I'm the better trader.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["tasha_s6b_pc1"] },
  { id: "tasha_s6b_pc1", speakerId: "kenji", text: "\"Handle it your way. I trust you've got this.\"", conditions: [], responseOptionIds: ["tasha_s6b_npc1"] },
  { id: "tasha_s6b_npc1", speakerId: CompanionId.Tasha, text: "\"That's exactly the vote of confidence I needed.\" She grins, competitive spark lighting up. \"Watch me remind this whole bazaar who's actually good at this.\"", conditions: [], responseOptionIds: [] },

  { id: "tasha_s7_root_b", speakerId: CompanionId.Tasha, text: "\"Been drawing up trade routes again. Except this time, every single one loops right back here.\" Tasha shows him her maps, all roads leading home. \"Guess I finally found my favorite destination.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["tasha_s7b_pc1"] },
  { id: "tasha_s7b_pc1", speakerId: "kenji", text: "\"I'll always be your favorite destination, Tasha. Always.\"", conditions: [], responseOptionIds: ["tasha_s7b_npc1"] },
  { id: "tasha_s7b_npc1", speakerId: CompanionId.Tasha, text: "\"Good. 'Cause I'm not redrawing these maps ever again.\" She curls happily against his side. \"Found the one route worth keeping forever.\"", conditions: [], responseOptionIds: [] },
];

// ============================================================================
// SERA — second topics: quiet prayer/watch, monastery history, the specific
// sin, fear that love is another transgression, tending a shrine, a rival
// penitent's judgment, wings fully healed
// ============================================================================

export const SERA_DIALOGUE_NODES_EXPANSION: DialogueNodeDef[] = [
  { id: "sera_s1_root_b", speakerId: CompanionId.Sera, text: "\"I keep watch through the coldest hours, when most have given up their vigils.\" Sera looks out over the mountain pass, solemn and steady. \"Someone should remain awake for those who cannot.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["sera_s1b_pc1"] },
  { id: "sera_s1b_pc1", speakerId: "kenji", text: "\"I'll keep watch with you tonight, if you'll have the company.\"", conditions: [], responseOptionIds: ["sera_s1b_npc1"] },
  { id: "sera_s1b_npc1", speakerId: CompanionId.Sera, text: "\"I would welcome that, more than you likely realize.\" A small, grateful smile. \"The nights are long, kept alone.\"", conditions: [], responseOptionIds: [] },

  { id: "sera_s2_root_b", speakerId: CompanionId.Sera, text: "\"This monastery has stood since before the Suppression, sheltering the fallen and the grieving alike.\" Sera traces a worn carving on an ancient wall. \"I find comfort in belonging to something so old and so patient.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["sera_s2b_pc1"] },
  { id: "sera_s2b_pc1", speakerId: "kenji", text: "\"It's a beautiful place. It suits you.\"", conditions: [], responseOptionIds: ["sera_s2b_npc1"] },
  { id: "sera_s2b_npc1", speakerId: CompanionId.Sera, text: "\"Thank you.\" Her wings shift, pleased despite her usual solemnity. \"I don't often hear this place — or myself — called beautiful. It's a kindness.\"", conditions: [], responseOptionIds: [] },

  { id: "sera_s3_root_b", speakerId: CompanionId.Sera, text: "\"I disobeyed a direct decree to protect mortals I'd grown to care for. That was my transgression.\" Sera's voice is quiet, ancient guilt still fresh. \"I have never regretted the choice, only the price it demanded.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["sera_s3b_pc1"] },
  { id: "sera_s3b_pc1", speakerId: "kenji", text: "\"Choosing to protect people you love was never a sin, Sera. Whatever they told you.\"", conditions: [], responseOptionIds: ["sera_s3b_npc1"] },
  { id: "sera_s3b_npc1", speakerId: CompanionId.Sera, text: "Her breath catches, wings stilling entirely. \"I have waited a very long time to hear someone say that with such certainty. Thank you, Kenji.\"", conditions: [], responseOptionIds: [] },

  { id: "sera_s4_root_b", speakerId: CompanionId.Sera, text: "\"I fear this feeling is simply one more transgression I'll be made to answer for.\" Sera's hands tremble slightly. \"And yet I find I no longer have the strength to deny it.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 45 }], responseOptionIds: ["sera_s4b_pc1"] },
  { id: "sera_s4b_pc1", speakerId: "kenji", text: "\"Love was never the thing that fell you, Sera. It might be the thing that heals it.\"", conditions: [], responseOptionIds: ["sera_s4b_npc1"] },
  { id: "sera_s4b_npc1", speakerId: CompanionId.Sera, text: "\"I want, more than anything, for that to be true.\" A tear slips free, though her expression is lighter than before. \"Let me finish saying this properly, before my courage fails again.\"", conditions: [], responseOptionIds: [] },

  { id: "sera_s5_root_b", speakerId: CompanionId.Sera, text: "\"I've been tending a small shrine here at the Manor, much like the one I kept at the monastery.\" Sera looks peaceful, lighting a candle with practiced care. \"It feels less like penance now, and more like devotion freely given.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["sera_s5b_pc1"] },
  { id: "sera_s5b_pc1", speakerId: "kenji", text: "\"That distinction matters. I'm glad you feel it.\"", conditions: [], responseOptionIds: ["sera_s5b_npc1"] },
  { id: "sera_s5b_npc1", speakerId: CompanionId.Sera, text: "\"As am I.\" She smiles, candlelight warm on her face. \"Devotion given freely feels entirely different from devotion demanded. Thank you for teaching me that difference.\"", conditions: [], responseOptionIds: [] },

  { id: "sera_s6_root_b", speakerId: CompanionId.Sera, text: "\"A fellow penitent condemned my choice to leave the monastery, calling it abandonment of duty.\" Sera's old shame flickers, though something steadier underlies it now. \"I find I disagree with her, for the first time in a long while.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["sera_s6b_pc1"] },
  { id: "sera_s6b_pc1", speakerId: "kenji", text: "\"Her judgment doesn't get to define your path anymore, Sera.\"", conditions: [], responseOptionIds: ["sera_s6b_npc1"] },
  { id: "sera_s6b_npc1", speakerId: CompanionId.Sera, text: "\"No. It doesn't.\" Quiet resolve settles over her, unshaken. \"I have chosen my own devotion now. That will have to be enough for her, or not — it no longer changes my course.\"", conditions: [], responseOptionIds: [] },

  { id: "sera_s7_root_b", speakerId: CompanionId.Sera, text: "Sera stretches her wings fully in the sunlight, feathers gleaming, healed in a way that once seemed impossible. \"I did not believe fallen wings could ever look like this again. And yet here we are.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["sera_s7b_pc1"] },
  { id: "sera_s7b_pc1", speakerId: "kenji", text: "\"They're beautiful, Sera. You're beautiful, exactly as you are now.\"", conditions: [], responseOptionIds: ["sera_s7b_npc1"] },
  { id: "sera_s7b_npc1", speakerId: CompanionId.Sera, text: "\"Thank you.\" She folds her wings gently around them both, radiant and unashamed. \"I believe, for the first time, that grace was never something I needed to earn back at all.\"", conditions: [], responseOptionIds: [] },
];

// ============================================================================
// LYRA — second topics: court intrigue sensed, private moments away from
// duty, isolation of never being "just herself," fear duty forbids love,
// healing Manor tensions, a clearer cosmic vision, full self-acceptance
// ============================================================================

export const LYRA_DIALOGUE_NODES_EXPANSION: DialogueNodeDef[] = [
  { id: "lyra_s1_root_b", speakerId: CompanionId.Lyra, text: "\"I feel three separate schemes unfolding in this ballroom alone.\" Lyra says it lightly, scanning the Court with practiced serenity. \"I've learned not to intervene in every one. Some threads must be allowed to play out.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["lyra_s1b_pc1"] },
  { id: "lyra_s1b_pc1", speakerId: "kenji", text: "\"That sounds like an exhausting way to attend a party.\"", conditions: [], responseOptionIds: ["lyra_s1b_npc1"] },
  { id: "lyra_s1b_npc1", speakerId: CompanionId.Lyra, text: "\"You have no idea.\" A rare, tired laugh. \"Thank you for being one thread I don't have to worry about untangling.\"", conditions: [], responseOptionIds: [] },

  { id: "lyra_s2_root_b", speakerId: CompanionId.Lyra, text: "Lyra has slipped away from a Court function entirely, finding him in a quiet garden instead. \"I permit myself so few moments that are simply mine. This is one of them.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["lyra_s2b_pc1"] },
  { id: "lyra_s2b_pc1", speakerId: "kenji", text: "\"I'm glad you chose to spend it here, with me.\"", conditions: [], responseOptionIds: ["lyra_s2b_npc1"] },
  { id: "lyra_s2b_npc1", speakerId: CompanionId.Lyra, text: "\"As am I.\" She settles beside him, radiating quiet contentment. \"I find these stolen moments matter more to me than an entire evening of formal duty.\"", conditions: [], responseOptionIds: [] },

  { id: "lyra_s3_root_b", speakerId: CompanionId.Lyra, text: "\"Everyone I meet sees the divine half of my blood first, always. Rarely do they wonder what the mortal half might want.\" Lyra's usual serenity carries real loneliness beneath it.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["lyra_s3b_pc1"] },
  { id: "lyra_s3b_pc1", speakerId: "kenji", text: "\"What does the mortal half of you want, Lyra? I'd like to know.\"", conditions: [], responseOptionIds: ["lyra_s3b_npc1"] },
  { id: "lyra_s3b_npc1", speakerId: CompanionId.Lyra, text: "\"No one has asked me that so plainly before.\" Her composure softens into genuine warmth. \"Simple things, mostly. To be known, rather than revered. You've already given me that.\"", conditions: [], responseOptionIds: [] },

  { id: "lyra_s4_root_b", speakerId: CompanionId.Lyra, text: "\"I have feared that my divine duty leaves no room for a love entirely my own.\" Lyra's hands tremble slightly, uncharacteristic uncertainty. \"And yet I find the feeling persists regardless of what duty demands.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 50 }], responseOptionIds: ["lyra_s4b_pc1"] },
  { id: "lyra_s4b_pc1", speakerId: "kenji", text: "\"Your duty and your heart don't have to be enemies, Lyra.\"", conditions: [], responseOptionIds: ["lyra_s4b_npc1"] },
  { id: "lyra_s4b_npc1", speakerId: CompanionId.Lyra, text: "\"I want very much to believe that.\" A steadying breath, luminous resolve returning. \"Allow me a moment longer, and I will tell you the rest of what I feel.\"", conditions: [], responseOptionIds: [] },

  { id: "lyra_s5_root_b", speakerId: CompanionId.Lyra, text: "\"I've used my gift to ease small tensions between the others here — a quiet word where resentment might have taken root instead.\" Lyra looks quietly fulfilled by the work. \"My burden finally feels like it serves a gentler purpose.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["lyra_s5b_pc1"] },
  { id: "lyra_s5b_pc1", speakerId: "kenji", text: "\"This household is lucky to have someone like you looking after it.\"", conditions: [], responseOptionIds: ["lyra_s5b_npc1"] },
  { id: "lyra_s5b_npc1", speakerId: CompanionId.Lyra, text: "\"I feel fortunate in return, more than you likely know.\" Her light warms, contentment radiating outward. \"A burden shared in service of love is hardly a burden at all.\"", conditions: [], responseOptionIds: [] },

  { id: "lyra_s6_root_b", speakerId: CompanionId.Lyra, text: "\"The cosmic sorrow I sensed before has sharpened into something with a shape now — ancient, hungering, patient.\" Lyra's serenity is genuinely tested. \"I fear it is closer to waking than I first believed.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["lyra_s6b_pc1"] },
  { id: "lyra_s6b_pc1", speakerId: "kenji", text: "\"Whatever shape it takes, we'll be ready. You won't face it alone.\"", conditions: [], responseOptionIds: ["lyra_s6b_npc1"] },
  { id: "lyra_s6b_npc1", speakerId: CompanionId.Lyra, text: "\"Not alone.\" She repeats it like a vow, some of her fear settling into resolve. \"I find that knowledge steadies me more than any divine certainty ever has.\"", conditions: [], responseOptionIds: [] },

  { id: "lyra_s7_root_b", speakerId: CompanionId.Lyra, text: "\"I have spent my whole existence divided between duty and self, unsure which half was truly mine.\" Lyra glows softly, entirely at peace. \"I no longer feel divided at all. Both halves of me love you, fully and the same.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["lyra_s7b_pc1"] },
  { id: "lyra_s7b_pc1", speakerId: "kenji", text: "\"Both halves of you are exactly who I fell in love with, Lyra. Whole, undivided, entirely yours.\"", conditions: [], responseOptionIds: ["lyra_s7b_npc1"] },
  { id: "lyra_s7b_npc1", speakerId: CompanionId.Lyra, text: "\"Whole.\" She savors the word like a blessing finally received. \"Thank you, Kenji, for showing this divided heart what it feels like to finally be one thing, fully.\"", conditions: [], responseOptionIds: [] },
];

export const ALL_COMPANION_DIALOGUE_EXPANSION_NODES: DialogueNodeDef[] = [
  ...ISOLDE_DIALOGUE_NODES_EXPANSION, ...GRAEL_DIALOGUE_NODES_EXPANSION, ...VALKA_DIALOGUE_NODES_EXPANSION,
  ...SEIRA_DIALOGUE_NODES_EXPANSION, ...SYLVARA_DIALOGUE_NODES_EXPANSION, ...REVA_DIALOGUE_NODES_EXPANSION,
  ...TASHA_DIALOGUE_NODES_EXPANSION, ...SERA_DIALOGUE_NODES_EXPANSION, ...LYRA_DIALOGUE_NODES_EXPANSION,
];
