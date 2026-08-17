// ============================================================================
// OJISAN IN ANOTHER WORLD — THE OTHER 9 COMPANIONS' DIALOGUE TREES
// Applies dialogue_mira_seed_data.ts's established pattern (speakerId
// alternates NPC/"kenji", responseOptionIds chains the exchange, story flags
// mark stage completion) at a lighter depth: one root topic per stage
// instead of two or three, since Mira's file is the flagship demonstrating
// full branching depth. Each companion's voice is written to match her
// established personality from companions_seed_data.ts — race, combat role,
// home region, and equipment already imply a lot before a word is written.
//
// FIXED THIS PASS: Stage 4's confession scene originally used a flat
// TRUST_AT_LEAST 50 / LOVE_AT_LEAST 50 for every companion, despite the
// design intent stated as "just under her moveInRequirements" — which
// varies per companion (companions_seed_data.ts). Now genuinely derived:
// each companion's Stage 4 gate is exactly 10 points under her own real
// trustAtLeast/loveAtLeast. Isolde/Grael/Sylvara happened to already be
// correct (60/60 thresholds match the original flat 50/50); Valka, Seira,
// Reva, Tasha, Sera, and Lyra did not and are corrected here.
// ============================================================================

import { DialogueNodeDef, CharacterDialogueTreeDef, CompanionId } from "./schemas";

// ============================================================================
// ISOLDE — High Elf archivist, precise and reserved, warms slowly
// ============================================================================

export const ISOLDE_DIALOGUE_NODES: DialogueNodeDef[] = [
  { id: "isolde_s1_root", speakerId: CompanionId.Isolde, text: "\"You're the one who cleared the golem infestation from the lower stacks.\" She doesn't look up from her ledger. \"The Archive thanks you. I suppose I should too.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["isolde_s1_pc1", "isolde_s1_pc2"] },
  { id: "isolde_s1_pc1", speakerId: "kenji", text: "\"Just doing what needed doing.\"", conditions: [], responseOptionIds: ["isolde_s1_npc1"] },
  { id: "isolde_s1_npc1", speakerId: CompanionId.Isolde, text: "\"Modest. Unusual, for someone who just leveled half a corridor of constructs.\" A faint, almost-smile. \"I'm Isolde Vorne. Head Archivist, for what little that title is worth these days.\"", conditions: [], setsStoryFlag: "isolde_stage1_dialogue_complete", responseOptionIds: [] },
  { id: "isolde_s1_pc2", speakerId: "kenji", text: "\"What exactly do you archive here?\"", conditions: [], responseOptionIds: ["isolde_s1_npc2"] },
  { id: "isolde_s1_npc2", speakerId: CompanionId.Isolde, text: "\"Everything the Miasma has touched. Every account, every failed cure, every mistake we've made trying to understand it.\" She finally meets his eyes. \"Someone has to remember, even when it's easier to forget.\"", conditions: [], setsStoryFlag: "isolde_stage1_dialogue_complete", responseOptionIds: [] },

  { id: "isolde_s2_root", speakerId: CompanionId.Isolde, text: "\"You came back.\" Isolde marks her page carefully before closing the book. \"Most people find one visit to the Archive quite sufficient.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["isolde_s2_pc1", "isolde_s2_pc2"] },
  { id: "isolde_s2_pc1", speakerId: "kenji", text: "\"I wanted to see you again, not just the books.\"", conditions: [], responseOptionIds: ["isolde_s2_npc1"] },
  { id: "isolde_s2_npc1", speakerId: CompanionId.Isolde, text: "She goes very still, then busies herself with a stack of parchment that doesn't need reorganizing. \"That's... a distinction I don't often get made in my favor.\" A pause. \"I don't mind it.\"", conditions: [], responseOptionIds: [] },
  { id: "isolde_s2_pc2", speakerId: "kenji", text: "\"What are you reading?\"", conditions: [], responseOptionIds: ["isolde_s2_npc2"] },
  { id: "isolde_s2_npc2", speakerId: CompanionId.Isolde, text: "\"An account from before the Suppression. Life sounded almost unbearably ordinary back then.\" She traces a line of faded ink. \"I find that more interesting than any grand history, somehow.\"", conditions: [], setsStoryFlag: "isolde_stage2_dialogue_complete", responseOptionIds: [] },

  { id: "isolde_s3_root", speakerId: CompanionId.Isolde, text: "\"I was engaged once. Before the Archive.\" Isolde says it flatly, like reciting a fact from one of her own ledgers. \"He decided a scholar's life wasn't romantic enough to endure.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["isolde_s3_pc1", "isolde_s3_pc2"] },
  { id: "isolde_s3_pc1", speakerId: "kenji", text: "\"He was a fool to leave.\"", conditions: [], responseOptionIds: ["isolde_s3_npc1"] },
  { id: "isolde_s3_npc1", speakerId: CompanionId.Isolde, text: "\"I used to think so too, in the bitter years right after.\" She sets down her quill entirely. \"Lately I've started to believe it, rather than just insist on it. That's your doing, I think.\"", conditions: [], setsStoryFlag: "isolde_stage3_dialogue_complete", responseOptionIds: [] },
  { id: "isolde_s3_pc2", speakerId: "kenji", text: "\"Did it make you afraid to try again?\"", conditions: [], responseOptionIds: ["isolde_s3_npc2"] },
  { id: "isolde_s3_npc2", speakerId: CompanionId.Isolde, text: "\"Terrified, if I'm being precise.\" Her honesty surprises even her. \"I buried myself in the stacks instead. It's only recently I've wanted to look up from the page again.\"", conditions: [], setsStoryFlag: "isolde_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "isolde_s4_root", speakerId: CompanionId.Isolde, text: "Isolde has closed every book on her desk — an alarming first. \"I've drafted and discarded this confession eleven times. I've decided precision is overrated here. I love you, Kenji.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 50 }, { type: "LOVE_AT_LEAST", value: 50 }], responseOptionIds: ["isolde_s4_pc1"] },
  { id: "isolde_s4_pc1", speakerId: "kenji", text: "\"I love you too, Isolde. Eleven drafts and all.\"", conditions: [], responseOptionIds: ["isolde_s4_npc1"] },
  { id: "isolde_s4_npc1", speakerId: CompanionId.Isolde, text: "For once she has no clever rejoinder ready. She simply crosses to him and kisses him, quick and a little clumsy with rare emotion. \"I'll want that recorded as the best-received first draft of my career.\"", conditions: [], setsStoryFlag: "isolde_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "isolde_s5_root", speakerId: CompanionId.Isolde, text: "\"I've claimed a study in the east wing. Don't let the state of it alarm you — organized chaos is still organized.\" Isolde looks genuinely pleased with her new domain.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["isolde_s5_pc1"] },
  { id: "isolde_s5_pc1", speakerId: "kenji", text: "\"It's good to have you here properly.\"", conditions: [], responseOptionIds: ["isolde_s5_npc1"] },
  { id: "isolde_s5_npc1", speakerId: CompanionId.Isolde, text: "\"I find I agree.\" She adjusts a stack of books that was already perfectly straight. \"The Manor has better light for reading than the Archive ever did. And better company, obviously.\"", conditions: [], setsStoryFlag: "isolde_stage5_dialogue_complete", responseOptionIds: [] },

  { id: "isolde_s6_root", speakerId: CompanionId.Isolde, text: "\"I found a record — my former fiancé, listed among the dead in the Auric Court cult purges.\" Isolde's composure cracks, just slightly. \"I don't know why it's hitting me this hard. I thought I was long past it.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["isolde_s6_pc1"] },
  { id: "isolde_s6_pc1", speakerId: "kenji", text: "\"Grief doesn't follow a schedule. It's alright to feel this.\"", conditions: [], responseOptionIds: ["isolde_s6_npc1"] },
  { id: "isolde_s6_npc1", speakerId: CompanionId.Isolde, text: "\"I forget, sometimes, that not everything needs a citation to be true.\" She lets herself lean into him, just for a moment. \"Thank you for not making me explain the feeling away.\"", conditions: [], setsStoryFlag: "isolde_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "isolde_s7_root", speakerId: CompanionId.Isolde, text: "\"I've started my own book. Not an archive of others' lives — mine, ours.\" Isolde shows him the first page, her precise handwriting softened somehow. \"I wanted you to be the first to read it.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["isolde_s7_pc1"] },
  { id: "isolde_s7_pc1", speakerId: "kenji", text: "\"I'd be honored. I hope it's a very long book.\"", conditions: [], responseOptionIds: ["isolde_s7_npc1"] },
  { id: "isolde_s7_npc1", speakerId: CompanionId.Isolde, text: "\"I intend it to be the longest work of my career.\" She smiles — unguarded, entirely certain. \"An indefinite volume. I've decided some things are worth writing without ever reaching a conclusion.\"", conditions: [], setsStoryFlag: "isolde_stage7_dialogue_complete", responseOptionIds: [] },
];

export const ISOLDE_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Isolde,
  rootNodeIds: ["isolde_s1_root", "isolde_s1_root_b", "isolde_s2_root", "isolde_s2_root_b", "isolde_s3_root", "isolde_s3_root_b", "isolde_s4_root", "isolde_s4_root_b", "isolde_s5_root", "isolde_s5_root_b", "isolde_s6_root", "isolde_s6_root_b", "isolde_s7_root", "isolde_s7_root_b"],
};

// ============================================================================
// GRAEL — Half-Orc smith, gruff exterior, gentle heart, self-conscious
// ============================================================================

export const GRAEL_DIALOGUE_NODES: DialogueNodeDef[] = [
  { id: "grael_s1_root", speakerId: CompanionId.Grael, text: "\"Heard you're the one who cleared them raiders off the south road.\" Grael doesn't look up from the anvil, hammer never breaking rhythm. \"Good work. Vale needed that.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["grael_s1_pc1", "grael_s1_pc2"] },
  { id: "grael_s1_pc1", speakerId: "kenji", text: "\"That's quite a forge you've got here.\"", conditions: [], responseOptionIds: ["grael_s1_npc1"] },
  { id: "grael_s1_npc1", speakerId: CompanionId.Grael, text: "\"Built most of it myself.\" A flicker of pride breaks through the gruffness. \"Name's Grael. Been the Vale's smith goin' on ten years now. Anythin' needs fixin', I'm the one to see.\"", conditions: [], setsStoryFlag: "grael_stage1_dialogue_complete", responseOptionIds: [] },
  { id: "grael_s1_pc2", speakerId: "kenji", text: "\"You didn't have to keep working through that fight.\"", conditions: [], responseOptionIds: ["grael_s1_npc2"] },
  { id: "grael_s1_npc2", speakerId: CompanionId.Grael, text: "\"Someone's gotta keep makin' horseshoes and hinges no matter what's burnin' down outside.\" She shrugs, easy and matter-of-fact. \"Figured you had it handled. Looks like I figured right.\"", conditions: [], setsStoryFlag: "grael_stage1_dialogue_complete", responseOptionIds: [] },

  { id: "grael_s2_root", speakerId: CompanionId.Grael, text: "\"You keep comin' round the smithy. Ain't complainin', just curious what's got your attention — the work, or somethin' else.\" Grael says it without looking up, but there's a careful weight to the question.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["grael_s2_pc1", "grael_s2_pc2"] },
  { id: "grael_s2_pc1", speakerId: "kenji", text: "\"Honestly? Mostly you.\"", conditions: [], responseOptionIds: ["grael_s2_npc1"] },
  { id: "grael_s2_npc1", speakerId: CompanionId.Grael, text: "She goes still, hammer resting a beat too long against the anvil. \"Didn't expect that answer.\" A rough clearing of the throat. \"Don't mind it, though. Don't mind it at all.\"", conditions: [], responseOptionIds: [] },
  { id: "grael_s2_pc2", speakerId: "kenji", text: "\"I like watching you work. You're good at it.\"", conditions: [], responseOptionIds: ["grael_s2_npc2"] },
  { id: "grael_s2_npc2", speakerId: CompanionId.Grael, text: "\"Not much of a talker, me. But I hear that plenty enough it's startin' to sound true.\" A small, pleased grunt. \"Preciate you sayin' it anyway.\"", conditions: [], setsStoryFlag: "grael_stage2_dialogue_complete", responseOptionIds: [] },

  { id: "grael_s3_root", speakerId: CompanionId.Grael, text: "\"Half-orcs ain't exactly welcomed most places.\" Grael studies her own hands, scarred and huge. \"Took me a long time to believe anyone could look past that. Startin' to believe it again lately.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["grael_s3_pc1"] },
  { id: "grael_s3_pc1", speakerId: "kenji", text: "\"I don't see anything to look past, Grael. I see you.\"", conditions: [], responseOptionIds: ["grael_s3_npc1"] },
  { id: "grael_s3_npc1", speakerId: CompanionId.Grael, text: "She has to look away for a second, jaw working. \"Don't reckon anyone's said somethin' like that to me before.\" Her voice is rougher than usual. \"Means more than you probably know.\"", conditions: [], setsStoryFlag: "grael_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "grael_s4_root", speakerId: CompanionId.Grael, text: "Grael sets down her hammer entirely — unheard of, mid-shift. \"Ain't good with pretty words. But I love you. Figured you deserved to hear it plain, 'stead of me dancin' around it forever.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 50 }, { type: "LOVE_AT_LEAST", value: 50 }], responseOptionIds: ["grael_s4_pc1"] },
  { id: "grael_s4_pc1", speakerId: "kenji", text: "\"Plain is exactly how I wanted to hear it. I love you too.\"", conditions: [], responseOptionIds: ["grael_s4_npc1"] },
  { id: "grael_s4_npc1", speakerId: CompanionId.Grael, text: "The grin that breaks across her face is enormous, tusks and all. She pulls Kenji into a hug that lifts him half off the ground. \"Knew I liked you for good reason.\"", conditions: [], setsStoryFlag: "grael_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "grael_s5_root", speakerId: CompanionId.Grael, text: "\"Set up my own forge corner at the Manor. Smaller'n the old one, but it's mine — ours, I mean.\" Grael looks almost bashful about the slip. \"Feels good, buildin' somethin' permanent for once.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["grael_s5_pc1"] },
  { id: "grael_s5_pc1", speakerId: "kenji", text: "\"Ours sounds exactly right.\"", conditions: [], responseOptionIds: ["grael_s5_npc1"] },
  { id: "grael_s5_npc1", speakerId: CompanionId.Grael, text: "\"Good.\" She says it simply, but the warmth underneath is unmistakable. \"Real good, hearin' you say that.\"", conditions: [], setsStoryFlag: "grael_stage5_dialogue_complete", responseOptionIds: [] },

  { id: "grael_s6_root", speakerId: CompanionId.Grael, text: "\"Old crew from my mercenary days came through the Vale. Asked me to ride with 'em again.\" Grael's face is troubled. \"Told 'em no. But it's got me wonderin' if I've gone soft, settlin' down like this.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["grael_s6_pc1"] },
  { id: "grael_s6_pc1", speakerId: "kenji", text: "\"Choosing a home isn't going soft, Grael. It's strength too.\"", conditions: [], responseOptionIds: ["grael_s6_npc1"] },
  { id: "grael_s6_npc1", speakerId: CompanionId.Grael, text: "She mulls that over a long moment, then nods slowly. \"Reckon you're right. Takes more grit to stay put and build somethin' than to keep runnin'.\" A faint smile. \"Glad I got somethin' worth stayin' for.\"", conditions: [], setsStoryFlag: "grael_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "grael_s7_root", speakerId: CompanionId.Grael, text: "Grael presents him with something wrapped in oilcloth — a hand-forged ring, simple and sturdy. \"Ain't fancy. Made it myself, every piece. Wanted you to have somethin' that'll outlast both of us.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["grael_s7_pc1"] },
  { id: "grael_s7_pc1", speakerId: "kenji", text: "\"It's perfect, Grael. I'll wear it always.\"", conditions: [], responseOptionIds: ["grael_s7_npc1"] },
  { id: "grael_s7_npc1", speakerId: CompanionId.Grael, text: "\"That's all I wanted.\" Her voice is thick with feeling she doesn't often let show. \"Somethin' solid. Somethin' real. Same as what you've given me, just — bein' here.\"", conditions: [], setsStoryFlag: "grael_stage7_dialogue_complete", responseOptionIds: [] },
];

export const GRAEL_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Grael,
  rootNodeIds: ["grael_s1_root", "grael_s1_root_b", "grael_s2_root", "grael_s2_root_b", "grael_s3_root", "grael_s3_root_b", "grael_s4_root", "grael_s4_root_b", "grael_s5_root", "grael_s5_root_b", "grael_s6_root", "grael_s6_root_b", "grael_s7_root", "grael_s7_root_b"],
};

// ============================================================================
// VALKA — Dragonborn commander, proud, dutiful, softens slowly
// ============================================================================

export const VALKA_DIALOGUE_NODES: DialogueNodeDef[] = [
  { id: "valka_s1_root", speakerId: CompanionId.Valka, text: "\"You fought well against the deserter camp.\" Valka appraises him with a commander's eye, arms crossed. \"Eastmarch Fortress could use hands like yours. Assuming you're not squeamish about taking orders.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["valka_s1_pc1", "valka_s1_pc2"] },
  { id: "valka_s1_pc1", speakerId: "kenji", text: "\"I can take orders from someone who's earned it.\"", conditions: [], responseOptionIds: ["valka_s1_npc1"] },
  { id: "valka_s1_npc1", speakerId: CompanionId.Valka, text: "A short, sharp laugh, almost approving. \"Good answer. Commander Valka Emberscale. Eastmarch is mine to hold, and I intend to keep holding it.\"", conditions: [], setsStoryFlag: "valka_stage1_dialogue_complete", responseOptionIds: [] },
  { id: "valka_s1_pc2", speakerId: "kenji", text: "\"What exactly are you defending this fortress against?\"", conditions: [], responseOptionIds: ["valka_s1_npc2"] },
  { id: "valka_s1_npc2", speakerId: CompanionId.Valka, text: "\"Everything. Deserters, Miasma beasts, our own side's incompetence.\" Her jaw tightens. \"The March doesn't get the luxury of choosing its battles. Neither do I.\"", conditions: [], setsStoryFlag: "valka_stage1_dialogue_complete", responseOptionIds: [] },

  { id: "valka_s2_root", speakerId: CompanionId.Valka, text: "\"You've been useful. More than useful.\" Valka studies him a beat too long before continuing. \"I don't say that lightly. Most who pass through Eastmarch aren't worth remembering.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["valka_s2_pc1"] },
  { id: "valka_s2_pc1", speakerId: "kenji", text: "\"High praise, Commander.\"", conditions: [], responseOptionIds: ["valka_s2_npc1"] },
  { id: "valka_s2_npc1", speakerId: CompanionId.Valka, text: "\"Don't let it go to your head.\" But there's the ghost of a smile there. \"Still. Don't be a stranger at the Fortress. That's an order, if it makes it easier to accept.\"", conditions: [], setsStoryFlag: "valka_stage2_dialogue_complete", responseOptionIds: [] },

  { id: "valka_s3_root", speakerId: CompanionId.Valka, text: "\"My clan expected a warlord from me. Instead they got a border commander babysitting a stalemate.\" Valka's pride cracks, just slightly. \"I don't often admit that stings.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["valka_s3_pc1"] },
  { id: "valka_s3_pc1", speakerId: "kenji", text: "\"Holding a line and keeping people alive is its own kind of glory, Valka.\"", conditions: [], responseOptionIds: ["valka_s3_npc1"] },
  { id: "valka_s3_npc1", speakerId: CompanionId.Valka, text: "She's quiet for a long moment, absorbing that. \"I've never thought of it that way. I should more often.\" A rare, unguarded look crosses her face. \"Thank you, Kenji.\"", conditions: [], setsStoryFlag: "valka_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "valka_s4_root", speakerId: CompanionId.Valka, text: "\"I don't retreat, and I don't hesitate. But this—\" Valka exhales sharply. \"I love you. There. Said plainly, like a command I refuse to second-guess.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 55 }, { type: "LOVE_AT_LEAST", value: 50 }], responseOptionIds: ["valka_s4_pc1"] },
  { id: "valka_s4_pc1", speakerId: "kenji", text: "\"I love you too, Valka. No hesitation from me either.\"", conditions: [], responseOptionIds: ["valka_s4_npc1"] },
  { id: "valka_s4_npc1", speakerId: CompanionId.Valka, text: "She closes the distance and kisses him firmly, decisively — every bit the commander even here. \"Good. Consider that order accepted, then.\"", conditions: [], setsStoryFlag: "valka_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "valka_s5_root", speakerId: CompanionId.Valka, text: "\"Command of Eastmarch is delegated to my second now. I've relocated to the Manor.\" Valka says it like a tactical decision, but there's real contentment underneath. \"This is where I choose to make my stand.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["valka_s5_pc1"] },
  { id: "valka_s5_pc1", speakerId: "kenji", text: "\"I'm glad. This is your home now too.\"", conditions: [], responseOptionIds: ["valka_s5_npc1"] },
  { id: "valka_s5_npc1", speakerId: CompanionId.Valka, text: "\"Home.\" She tests the word like it's unfamiliar territory. \"I could get used to that word, said the way you say it.\"", conditions: [], setsStoryFlag: "valka_stage5_dialogue_complete", responseOptionIds: [] },

  { id: "valka_s6_root", speakerId: CompanionId.Valka, text: "\"Word came from my clan. They want me to return, take up the warlord's mantle after all.\" Valka's expression is unreadable. \"I don't know how to tell them I've already chosen my war to fight.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["valka_s6_pc1"] },
  { id: "valka_s6_pc1", speakerId: "kenji", text: "\"Tell them the truth. You've already found what you were looking for.\"", conditions: [], responseOptionIds: ["valka_s6_npc1"] },
  { id: "valka_s6_npc1", speakerId: CompanionId.Valka, text: "She nods slowly, resolve hardening into something certain. \"I will. My clan values conviction above all else. They'll understand, eventually, or they won't. Either way, I'm staying.\"", conditions: [], setsStoryFlag: "valka_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "valka_s7_root", speakerId: CompanionId.Valka, text: "\"I've led armies, held fortresses, faced down wyrms.\" Valka takes his hand, uncharacteristically gentle. \"None of it prepared me for how it feels, choosing to stay soft for someone. I choose it anyway. Every day.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["valka_s7_pc1"] },
  { id: "valka_s7_pc1", speakerId: "kenji", text: "\"That might be the bravest thing I've ever heard you say.\"", conditions: [], responseOptionIds: ["valka_s7_npc1"] },
  { id: "valka_s7_npc1", speakerId: CompanionId.Valka, text: "\"Perhaps it is.\" A rare, radiant smile. \"Good thing I've never shied from a fight worth having.\"", conditions: [], setsStoryFlag: "valka_stage7_dialogue_complete", responseOptionIds: [] },
];

export const VALKA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Valka,
  rootNodeIds: ["valka_s1_root", "valka_s1_root_b", "valka_s2_root", "valka_s2_root_b", "valka_s3_root", "valka_s3_root_b", "valka_s4_root", "valka_s4_root_b", "valka_s5_root", "valka_s5_root_b", "valka_s6_root", "valka_s6_root_b", "valka_s7_root", "valka_s7_root_b"],
};

// ============================================================================
// SEIRA — Moon Elf general, composed strategist, subtly playful underneath
// ============================================================================

export const SEIRA_DIALOGUE_NODES: DialogueNodeDef[] = [
  { id: "seira_s1_root", speakerId: CompanionId.Seira, text: "\"Your timing at the barricades was precise. Almost suspiciously so.\" Seira studies him with the calculating gaze of a tactician. \"General Seira Moonwhisper. I don't often say 'well done' twice in one week.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["seira_s1_pc1"] },
  { id: "seira_s1_pc1", speakerId: "kenji", text: "\"I'll try to earn a third, then.\"", conditions: [], responseOptionIds: ["seira_s1_npc1"] },
  { id: "seira_s1_npc1", speakerId: CompanionId.Seira, text: "A slow, considering smile. \"Confidence. I like that in a soldier — and, I'll admit, in most other contexts as well.\"", conditions: [], setsStoryFlag: "seira_stage1_dialogue_complete", responseOptionIds: [] },

  { id: "seira_s2_root", speakerId: CompanionId.Seira, text: "\"You visit at night more often than daylight allows for.\" Seira's tone is light, but her eyes are sharp with interest. \"I find I don't mind the pattern.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["seira_s2_pc1"] },
  { id: "seira_s2_pc1", speakerId: "kenji", text: "\"You're easier to talk to once the camp settles down.\"", conditions: [], responseOptionIds: ["seira_s2_npc1"] },
  { id: "seira_s2_npc1", speakerId: CompanionId.Seira, text: "\"The night suits me better in most respects.\" She glances at the moon overhead. \"Perhaps you're simply starting to suit me too.\"", conditions: [], setsStoryFlag: "seira_stage2_dialogue_complete", responseOptionIds: [] },

  { id: "seira_s3_root", speakerId: CompanionId.Seira, text: "\"I left my homeland under... complicated circumstances.\" Seira's composure slips, just slightly. \"Strategy is easier than admitting I still miss it, some nights.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["seira_s3_pc1"] },
  { id: "seira_s3_pc1", speakerId: "kenji", text: "\"You don't have to have it all figured out. I'm here either way.\"", conditions: [], responseOptionIds: ["seira_s3_npc1"] },
  { id: "seira_s3_npc1", speakerId: CompanionId.Seira, text: "\"That's a rare comfort, from someone who isn't obligated to offer it.\" Her guard lowers a fraction more. \"Thank you. Truly.\"", conditions: [], setsStoryFlag: "seira_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "seira_s4_root", speakerId: CompanionId.Seira, text: "\"I've planned this confession several ways in my head, weighing outcomes like a battle map.\" Seira laughs softly at herself. \"In the end there was only one honest option. I love you, Kenji.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 50 }, { type: "LOVE_AT_LEAST", value: 55 }], responseOptionIds: ["seira_s4_pc1"] },
  { id: "seira_s4_pc1", speakerId: "kenji", text: "\"I love you too, Seira. No strategy required for that one.\"", conditions: [], responseOptionIds: ["seira_s4_npc1"] },
  { id: "seira_s4_npc1", speakerId: CompanionId.Seira, text: "\"No strategy at all.\" She smiles, unusually soft. \"A refreshing change of pace, letting something simply be true without calculating it first.\"", conditions: [], setsStoryFlag: "seira_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "seira_s5_root", speakerId: CompanionId.Seira, text: "\"The Manor's night garden suits me beautifully.\" Seira looks more at ease than he's ever seen her, moonlight silvering her hair. \"I didn't expect to feel settled anywhere again. And yet.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["seira_s5_pc1"] },
  { id: "seira_s5_pc1", speakerId: "kenji", text: "\"I'm glad you feel that way here.\"", conditions: [], responseOptionIds: ["seira_s5_npc1"] },
  { id: "seira_s5_npc1", speakerId: CompanionId.Seira, text: "\"So am I.\" She takes his arm, unhurried. \"It seems even a general can learn to stop planning her next departure.\"", conditions: [], setsStoryFlag: "seira_stage5_dialogue_complete", responseOptionIds: [] },

  { id: "seira_s6_root", speakerId: CompanionId.Seira, text: "\"Riders from my homeland arrived today. They want me to return and answer for why I left.\" Seira's calm is a visible effort. \"I don't know if I'm ready to face that reckoning yet.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["seira_s6_pc1"] },
  { id: "seira_s6_pc1", speakerId: "kenji", text: "\"Whenever you're ready to face it, I'll go with you.\"", conditions: [], responseOptionIds: ["seira_s6_npc1"] },
  { id: "seira_s6_npc1", speakerId: CompanionId.Seira, text: "\"Not alone, then.\" Something in her posture eases. \"I hadn't realized how much weight that condition was carrying until you removed it.\"", conditions: [], setsStoryFlag: "seira_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "seira_s7_root", speakerId: CompanionId.Seira, text: "\"I've made peace with my homeland, my past, all of it.\" Seira watches the moon, calm and unclouded. \"Strange, how the hardest campaigns are the ones fought within. I couldn't have won this one without you.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["seira_s7_pc1"] },
  { id: "seira_s7_pc1", speakerId: "kenji", text: "\"You won it yourself, Seira. I just stood beside you.\"", conditions: [], responseOptionIds: ["seira_s7_npc1"] },
  { id: "seira_s7_npc1", speakerId: CompanionId.Seira, text: "\"Standing beside someone is its own kind of victory, in the campaigns that matter most.\" She leans against him under the moonlight, utterly at peace. \"Thank you for every mile of it.\"", conditions: [], setsStoryFlag: "seira_stage7_dialogue_complete", responseOptionIds: [] },
];

export const SEIRA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Seira,
  rootNodeIds: ["seira_s1_root", "seira_s1_root_b", "seira_s2_root", "seira_s2_root_b", "seira_s3_root", "seira_s3_root_b", "seira_s4_root", "seira_s4_root_b", "seira_s5_root", "seira_s5_root_b", "seira_s6_root", "seira_s6_root_b", "seira_s7_root", "seira_s7_root_b"],
};

// ============================================================================
// SYLVARA — Greater Dryad, serene, ancient, speaks in nature's rhythms
// ============================================================================

export const SYLVARA_DIALOGUE_NODES: DialogueNodeDef[] = [
  { id: "sylvara_s1_root", speakerId: CompanionId.Sylvara, text: "\"The grove sang of your coming before you arrived.\" Sylvara regards him with ancient, patient eyes. \"Few outsiders are welcomed past the misty treeline. Fewer still are invited to stay.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["sylvara_s1_pc1"] },
  { id: "sylvara_s1_pc1", speakerId: "kenji", text: "\"I'm honored, then. What should I call you?\"", conditions: [], responseOptionIds: ["sylvara_s1_npc1"] },
  { id: "sylvara_s1_npc1", speakerId: CompanionId.Sylvara, text: "\"Sylvara. I have worn this clearing as my body and my home for longer than your kind measures years.\" A slow smile, like sunlight through leaves. \"I think you and I will grow well together.\"", conditions: [], setsStoryFlag: "sylvara_stage1_dialogue_complete", responseOptionIds: [] },

  { id: "sylvara_s2_root", speakerId: CompanionId.Sylvara, text: "\"You return to the clearing often now.\" Sylvara trails her fingers along a budding branch. \"The grove has begun to recognize your footsteps. That is no small thing.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["sylvara_s2_pc1"] },
  { id: "sylvara_s2_pc1", speakerId: "kenji", text: "\"I find myself drawn here. To the grove, and to you.\"", conditions: [], responseOptionIds: ["sylvara_s2_npc1"] },
  { id: "sylvara_s2_npc1", speakerId: CompanionId.Sylvara, text: "\"Roots do not grow quickly, but they grow deep.\" She smiles, patient and warm. \"I welcome whatever you are planting here, Kenji.\"", conditions: [], setsStoryFlag: "sylvara_stage2_dialogue_complete", responseOptionIds: [] },

  { id: "sylvara_s3_root", speakerId: CompanionId.Sylvara, text: "\"I have outlived every dryad sister I once knew.\" Sylvara's serenity carries a quiet ache. \"Loneliness, for one such as me, is measured in centuries rather than seasons.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["sylvara_s3_pc1"] },
  { id: "sylvara_s3_pc1", speakerId: "kenji", text: "\"You don't have to carry that alone anymore.\"", conditions: [], responseOptionIds: ["sylvara_s3_npc1"] },
  { id: "sylvara_s3_npc1", speakerId: CompanionId.Sylvara, text: "\"A mortal life is brief beside mine, and yet it may be enough to remind me what companionship feels like.\" Her ancient eyes soften. \"Thank you for that gift, however long it lasts.\"", conditions: [], setsStoryFlag: "sylvara_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "sylvara_s4_root", speakerId: CompanionId.Sylvara, text: "\"I have watched seasons turn a thousand times without my heart stirring once.\" Sylvara takes his hands in hers, bark-textured and gentle. \"You have stirred it. I love you, Kenji.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 50 }, { type: "LOVE_AT_LEAST", value: 50 }], responseOptionIds: ["sylvara_s4_pc1"] },
  { id: "sylvara_s4_pc1", speakerId: "kenji", text: "\"I love you too, Sylvara. However long we have.\"", conditions: [], responseOptionIds: ["sylvara_s4_npc1"] },
  { id: "sylvara_s4_npc1", speakerId: CompanionId.Sylvara, text: "\"However long — and however it grows.\" She presses her forehead to his, content and unhurried. \"I find I am no longer afraid of what that means.\"", conditions: [], setsStoryFlag: "sylvara_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "sylvara_s5_root", speakerId: CompanionId.Sylvara, text: "\"I have taken root, quite literally, in a corner of your Manor gardens.\" Sylvara looks radiant amid new growth. \"It is strange, calling somewhere beyond my own clearing home. A good strange.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["sylvara_s5_pc1"] },
  { id: "sylvara_s5_pc1", speakerId: "kenji", text: "\"The Manor is lucky to have you growing in it.\"", conditions: [], responseOptionIds: ["sylvara_s5_npc1"] },
  { id: "sylvara_s5_npc1", speakerId: CompanionId.Sylvara, text: "\"And I am lucky to have somewhere new to grow.\" She laughs, soft as wind through leaves. \"We are, both of us, tending something worthwhile here.\"", conditions: [], setsStoryFlag: "sylvara_stage5_dialogue_complete", responseOptionIds: [] },

  { id: "sylvara_s6_root", speakerId: CompanionId.Sylvara, text: "\"The World Tree's roots have grown ill again, far beneath my old clearing.\" Sylvara's serenity wavers with real worry. \"I fear what it might mean, for the Wood, and for me.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["sylvara_s6_pc1"] },
  { id: "sylvara_s6_pc1", speakerId: "kenji", text: "\"We'll go together and see it healed. I won't let anything happen to you.\"", conditions: [], responseOptionIds: ["sylvara_s6_npc1"] },
  { id: "sylvara_s6_npc1", speakerId: CompanionId.Sylvara, text: "\"Together, then.\" Some of her old calm returns, steadied by his certainty. \"I have weathered many storms alone. I find I much prefer weathering this one beside you.\"", conditions: [], setsStoryFlag: "sylvara_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "sylvara_s7_root", speakerId: CompanionId.Sylvara, text: "\"A thousand seasons from now, I will still remember this one most clearly.\" Sylvara watches new blossoms open around them, eyes bright. \"You have given an old, patient heart something worth counting the years for.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["sylvara_s7_pc1"] },
  { id: "sylvara_s7_pc1", speakerId: "kenji", text: "\"Then let's make every one of those years count together.\"", conditions: [], responseOptionIds: ["sylvara_s7_npc1"] },
  { id: "sylvara_s7_npc1", speakerId: CompanionId.Sylvara, text: "\"Together.\" The word settles over her like sunlight. \"I have all the patience of the earth itself, Kenji. I intend to spend every bit of it on you.\"", conditions: [], setsStoryFlag: "sylvara_stage7_dialogue_complete", responseOptionIds: [] },
];

export const SYLVARA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Sylvara,
  rootNodeIds: ["sylvara_s1_root", "sylvara_s1_root_b", "sylvara_s2_root", "sylvara_s2_root_b", "sylvara_s3_root", "sylvara_s3_root_b", "sylvara_s4_root", "sylvara_s4_root_b", "sylvara_s5_root", "sylvara_s5_root_b", "sylvara_s6_root", "sylvara_s6_root_b", "sylvara_s7_root", "sylvara_s7_root_b"],
};

// ============================================================================
// REVA — Dark Elf court spy, guarded, sharp-witted, secretly vulnerable
// ============================================================================

export const REVA_DIALOGUE_NODES: DialogueNodeDef[] = [
  { id: "reva_s1_root", speakerId: CompanionId.Reva, text: "\"You handled that cultist cell more discreetly than most brutes manage.\" Reva studies him with calculating interest from behind a painted fan. \"That's rarer than raw strength, in this court.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["reva_s1_pc1"] },
  { id: "reva_s1_pc1", speakerId: "kenji", text: "\"I try not to make more of a mess than necessary.\"", conditions: [], responseOptionIds: ["reva_s1_npc1"] },
  { id: "reva_s1_npc1", speakerId: CompanionId.Reva, text: "\"A refreshingly rare philosophy in Auric Court.\" She snaps her fan shut. \"Reva. I collect useful people, Kenji — carefully, and at a distance. We'll see which category you fall into.\"", conditions: [], setsStoryFlag: "reva_stage1_dialogue_complete", responseOptionIds: [] },

  { id: "reva_s2_root", speakerId: CompanionId.Reva, text: "\"You've noticed I keep my distance from most people here.\" Reva's tone is light, testing. \"You, I find myself making exceptions for. I don't love that about myself yet.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["reva_s2_pc1"] },
  { id: "reva_s2_pc1", speakerId: "kenji", text: "\"I won't push past whatever distance you need.\"", conditions: [], responseOptionIds: ["reva_s2_npc1"] },
  { id: "reva_s2_npc1", speakerId: CompanionId.Reva, text: "\"That patience is precisely why the distance keeps shrinking on its own.\" A rare, genuine smile flickers across her guarded features. \"Careful, Kenji. I'm not accustomed to being disarmed this easily.\"", conditions: [], setsStoryFlag: "reva_stage2_dialogue_complete", responseOptionIds: [] },

  { id: "reva_s3_root", speakerId: CompanionId.Reva, text: "\"My family sold my services to the Court when I was young enough not to have a say.\" Reva's composure slips, bitterness underneath. \"Trust doesn't come naturally, after a childhood like that.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["reva_s3_pc1"] },
  { id: "reva_s3_pc1", speakerId: "kenji", text: "\"I'm not going anywhere, Reva. Take whatever time you need.\"", conditions: [], responseOptionIds: ["reva_s3_npc1"] },
  { id: "reva_s3_npc1", speakerId: CompanionId.Reva, text: "\"No one's ever offered me time without expecting something for it.\" Her voice wavers, just slightly. \"I don't quite know what to do with that kindness. I'm... grateful for it, all the same.\"", conditions: [], setsStoryFlag: "reva_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "reva_s4_root", speakerId: CompanionId.Reva, text: "\"I've calculated every possible way this conversation could go wrong.\" Reva's mask finally cracks entirely. \"I love you. There — the one outcome I couldn't plan my way around.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 60 }, { type: "LOVE_AT_LEAST", value: 50 }], responseOptionIds: ["reva_s4_pc1"] },
  { id: "reva_s4_pc1", speakerId: "kenji", text: "\"I love you too, Reva. No calculations needed.\"", conditions: [], responseOptionIds: ["reva_s4_npc1"] },
  { id: "reva_s4_npc1", speakerId: CompanionId.Reva, text: "She laughs — shaky, disbelieving, entirely real. \"Now that's a variable I never accounted for.\" She kisses him before her nerve can fail her. \"I'm glad to be wrong, for once.\"", conditions: [], setsStoryFlag: "reva_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "reva_s5_root", speakerId: CompanionId.Reva, text: "\"I've left the Court's employ entirely. My own suite, my own choices — a novelty, at my age.\" Reva looks lighter than he's ever seen her. \"Thank you for giving me a reason to want that.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["reva_s5_pc1"] },
  { id: "reva_s5_pc1", speakerId: "kenji", text: "\"You deserve every bit of that freedom.\"", conditions: [], responseOptionIds: ["reva_s5_npc1"] },
  { id: "reva_s5_npc1", speakerId: CompanionId.Reva, text: "\"I'm starting to believe that, slowly.\" She leans into him, unguarded in a way that would have terrified her a year ago. \"Slowly is still progress, for someone like me.\"", conditions: [], setsStoryFlag: "reva_stage5_dialogue_complete", responseOptionIds: [] },

  { id: "reva_s6_root", speakerId: CompanionId.Reva, text: "\"My old handler resurfaced. Wants my 'services' again — or my silence, permanently.\" Reva's calculating edge returns, sharp with fear underneath. \"I don't know how to fight my own past.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["reva_s6_pc1"] },
  { id: "reva_s6_pc1", speakerId: "kenji", text: "\"You won't face him alone. Whatever it takes, I'm with you.\"", conditions: [], responseOptionIds: ["reva_s6_npc1"] },
  { id: "reva_s6_npc1", speakerId: CompanionId.Reva, text: "\"For the first time in my life, I actually believe that promise.\" Something in her steadies, resolve replacing fear. \"Together, then. Let's see him try to collect on a debt I no longer owe.\"", conditions: [], setsStoryFlag: "reva_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "reva_s7_root", speakerId: CompanionId.Reva, text: "\"I spent my whole life being useful to people who never once cared for me.\" Reva takes his hand, entirely undefended for once. \"You are the first thing I've ever chosen purely because I wanted to, not because I had to.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["reva_s7_pc1"] },
  { id: "reva_s7_pc1", speakerId: "kenji", text: "\"And I choose you too, Reva. Every day, freely.\"", conditions: [], responseOptionIds: ["reva_s7_npc1"] },
  { id: "reva_s7_npc1", speakerId: CompanionId.Reva, text: "\"Freely.\" She repeats the word like she's tasting it for the first time. \"I could grow rather fond of a life built on that word alone.\"", conditions: [], setsStoryFlag: "reva_stage7_dialogue_complete", responseOptionIds: [] },
];

export const REVA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Reva,
  rootNodeIds: ["reva_s1_root", "reva_s1_root_b", "reva_s2_root", "reva_s2_root_b", "reva_s3_root", "reva_s3_root_b", "reva_s4_root", "reva_s4_root_b", "reva_s5_root", "reva_s5_root_b", "reva_s6_root", "reva_s6_root_b", "reva_s7_root", "reva_s7_root_b"],
};

// ============================================================================
// TASHA — Kitsune merchant, playful, flirtatious, quick to warm
// ============================================================================

export const TASHA_DIALOGUE_NODES: DialogueNodeDef[] = [
  { id: "tasha_s1_root", speakerId: CompanionId.Tasha, text: "\"Ooh, a hero type! Perfect timing — my cart wheel's stuck and my usual muscle's out sick.\" Tasha's tails flick with obvious delight. \"Help a girl out, and I'll make it worth your while~\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["tasha_s1_pc1"] },
  { id: "tasha_s1_pc1", speakerId: "kenji", text: "\"Happy to help. What's your name?\"", conditions: [], responseOptionIds: ["tasha_s1_npc1"] },
  { id: "tasha_s1_npc1", speakerId: CompanionId.Tasha, text: "\"Tasha! Traveling merchant, professional charmer, occasional troublemaker.\" She winks, tails swishing. \"Wheel's fixed already, by the way. I just wanted an excuse to talk to you.\"", conditions: [], setsStoryFlag: "tasha_stage1_dialogue_complete", responseOptionIds: [] },

  { id: "tasha_s2_root", speakerId: CompanionId.Tasha, text: "\"You keep coming back to my stall. Either you really love overpriced trinkets,\" Tasha grins, \"or you like the company that comes with them.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["tasha_s2_pc1"] },
  { id: "tasha_s2_pc1", speakerId: "kenji", text: "\"Definitely the company.\"", conditions: [], responseOptionIds: ["tasha_s2_npc1"] },
  { id: "tasha_s2_npc1", speakerId: CompanionId.Tasha, text: "\"Smart answer — and the honest one, too, I can always tell.\" She leans in, playful. \"Careful, Kenji. Kitsune have a reputation for stealing hearts. I'm not above the cliché.\"", conditions: [], setsStoryFlag: "tasha_stage2_dialogue_complete", responseOptionIds: [] },

  { id: "tasha_s3_root", speakerId: CompanionId.Tasha, text: "\"Truth is, I keep moving so I never have to watch anyone leave me first.\" Tasha's playfulness dims, just for a moment. \"Easier to be the one who wanders off, y'know?\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["tasha_s3_pc1"] },
  { id: "tasha_s3_pc1", speakerId: "kenji", text: "\"You don't have to keep running from me, Tasha.\"", conditions: [], responseOptionIds: ["tasha_s3_npc1"] },
  { id: "tasha_s3_npc1", speakerId: CompanionId.Tasha, text: "\"...Yeah. Yeah, maybe I don't.\" Her usual grin softens into something realer. \"That's new territory for me. Kinda terrifying. Kinda nice, too.\"", conditions: [], setsStoryFlag: "tasha_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "tasha_s4_root", speakerId: CompanionId.Tasha, text: "\"Okay, no jokes this time, I promise.\" Tasha takes a breath, uncharacteristically nervous. \"I love you, Kenji. Scary as that is for someone like me to admit.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 45 }, { type: "LOVE_AT_LEAST", value: 50 }], responseOptionIds: ["tasha_s4_pc1"] },
  { id: "tasha_s4_pc1", speakerId: "kenji", text: "\"I love you too, Tasha. Jokes or not.\"", conditions: [], responseOptionIds: ["tasha_s4_npc1"] },
  { id: "tasha_s4_npc1", speakerId: CompanionId.Tasha, text: "All three tails puff up at once, betraying her completely. \"Okay, that's — wow. In a good way.\" She grins, delighted and a little teary. \"Guess I found something worth sticking around for after all.\"", conditions: [], setsStoryFlag: "tasha_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "tasha_s5_root", speakerId: CompanionId.Tasha, text: "\"Set up a permanent stall right here at the Manor. First 'permanent' anything I've had in years.\" Tasha looks genuinely moved by her own words. \"Feels good, having somewhere to actually unpack my bags.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["tasha_s5_pc1"] },
  { id: "tasha_s5_pc1", speakerId: "kenji", text: "\"Unpack as much as you want. This is home now.\"", conditions: [], responseOptionIds: ["tasha_s5_npc1"] },
  { id: "tasha_s5_npc1", speakerId: CompanionId.Tasha, text: "\"Home.\" She grins, warm and a little disbelieving. \"Never thought that word would apply to me. Glad you're the one who proved it wrong.\"", conditions: [], setsStoryFlag: "tasha_stage5_dialogue_complete", responseOptionIds: [] },

  { id: "tasha_s6_root", speakerId: CompanionId.Tasha, text: "\"Old debts caught up with me — folks I owe from my wilder trading days.\" Tasha's usual confidence falters. \"Half of me wants to just disappear before it gets complicated. Old habits.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["tasha_s6_pc1"] },
  { id: "tasha_s6_pc1", speakerId: "kenji", text: "\"Don't disappear. Let me help you face it instead.\"", conditions: [], responseOptionIds: ["tasha_s6_npc1"] },
  { id: "tasha_s6_npc1", speakerId: CompanionId.Tasha, text: "\"...Okay. Staying, then. Facing it.\" She exhales, steadier already. \"Guess that's what having someone in your corner actually means. Still getting used to it.\"", conditions: [], setsStoryFlag: "tasha_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "tasha_s7_root", speakerId: CompanionId.Tasha, text: "\"Spent my whole life ready to bolt at the first sign of trouble.\" Tasha's smile is soft, entirely without her usual mischief. \"Never once thought I'd find a reason to stay put for good. You're that reason.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["tasha_s7_pc1"] },
  { id: "tasha_s7_pc1", speakerId: "kenji", text: "\"I'll always be here, whenever you need to come back to.\"", conditions: [], responseOptionIds: ["tasha_s7_npc1"] },
  { id: "tasha_s7_npc1", speakerId: CompanionId.Tasha, text: "\"Good. 'Cause I'm not planning on wandering anywhere ever again.\" She curls against his side, tails wrapped comfortably around them both. \"Found my favorite place in the whole world. Turns out it was just you.\"", conditions: [], setsStoryFlag: "tasha_stage7_dialogue_complete", responseOptionIds: [] },
];

export const TASHA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Tasha,
  rootNodeIds: ["tasha_s1_root", "tasha_s1_root_b", "tasha_s2_root", "tasha_s2_root_b", "tasha_s3_root", "tasha_s3_root_b", "tasha_s4_root", "tasha_s4_root_b", "tasha_s5_root", "tasha_s5_root_b", "tasha_s6_root", "tasha_s6_root_b", "tasha_s7_root", "tasha_s7_root_b"],
};

// ============================================================================
// SERA — Fallen Angel, solemn, guilt-laden, gentle, seeking redemption
// ============================================================================

export const SERA_DIALOGUE_NODES: DialogueNodeDef[] = [
  { id: "sera_s1_root", speakerId: CompanionId.Sera, text: "\"You fought with restraint back there. Mercy, even toward the corrupted.\" Sera regards him with quiet solemnity, wings folded close. \"That is rarer, and more precious, than most realize.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["sera_s1_pc1"] },
  { id: "sera_s1_pc1", speakerId: "kenji", text: "\"Cruelty doesn't sit right with me, even against enemies.\"", conditions: [], responseOptionIds: ["sera_s1_npc1"] },
  { id: "sera_s1_npc1", speakerId: CompanionId.Sera, text: "\"A rare conviction.\" Something like relief passes over her features. \"I am Sera. I keep this monastery's penance, and its watch. I think we may understand each other, in time.\"", conditions: [], setsStoryFlag: "sera_stage1_dialogue_complete", responseOptionIds: [] },

  { id: "sera_s2_root", speakerId: CompanionId.Sera, text: "\"You climb the mountain path often, for someone with no penance of his own to keep.\" Sera's tone is gentle, curious rather than accusing.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["sera_s2_pc1"] },
  { id: "sera_s2_pc1", speakerId: "kenji", text: "\"Maybe I just enjoy the company at the top.\"", conditions: [], responseOptionIds: ["sera_s2_npc1"] },
  { id: "sera_s2_npc1", speakerId: CompanionId.Sera, text: "A rare, soft laugh escapes her. \"I confess I've begun looking forward to your visits more than my duties strictly allow.\" She quickly composes herself. \"That is... unusual, for me.\"", conditions: [], setsStoryFlag: "sera_stage2_dialogue_complete", responseOptionIds: [] },

  { id: "sera_s3_root", speakerId: CompanionId.Sera, text: "\"I fell from grace long ago — a transgression I still atone for daily.\" Sera's wings droop slightly. \"I do not often speak of it. But I find I want you to know the truth of me.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["sera_s3_pc1"] },
  { id: "sera_s3_pc1", speakerId: "kenji", text: "\"Whatever happened, I don't see anything in you that needs forgiving anymore.\"", conditions: [], responseOptionIds: ["sera_s3_npc1"] },
  { id: "sera_s3_npc1", speakerId: CompanionId.Sera, text: "Her breath catches, wings stilling entirely. \"I have sought absolution for so long, from powers who never answered.\" Her eyes shine. \"Perhaps I only ever needed to hear it from someone who actually looked at me.\"", conditions: [], setsStoryFlag: "sera_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "sera_s4_root", speakerId: CompanionId.Sera, text: "\"I have spent so long believing myself unworthy of gentleness.\" Sera takes his hands, solemn and sincere. \"I love you, Kenji. I no longer wish to do penance for feeling it.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 55 }, { type: "LOVE_AT_LEAST", value: 55 }], responseOptionIds: ["sera_s4_pc1"] },
  { id: "sera_s4_pc1", speakerId: "kenji", text: "\"You never needed to atone for that, Sera. I love you too.\"", conditions: [], responseOptionIds: ["sera_s4_npc1"] },
  { id: "sera_s4_npc1", speakerId: CompanionId.Sera, text: "A single tear slips free, though her smile is radiant. \"Then let this be the first grace I accept without guilt.\" Her wings unfold fully for the first time he's seen, as if some old weight has finally lifted.", conditions: [], setsStoryFlag: "sera_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "sera_s5_root", speakerId: CompanionId.Sera, text: "\"I have taken a small sanctuary room at your Manor. My first true home since my fall.\" Sera looks lighter than solemnity usually allows. \"It feels almost sinful, to be this content.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["sera_s5_pc1"] },
  { id: "sera_s5_pc1", speakerId: "kenji", text: "\"You deserve every bit of that contentment, Sera.\"", conditions: [], responseOptionIds: ["sera_s5_npc1"] },
  { id: "sera_s5_npc1", speakerId: CompanionId.Sera, text: "\"I am, slowly, choosing to believe that.\" She smiles, unburdened. \"Thank you for making this home feel like the opposite of penance.\"", conditions: [], setsStoryFlag: "sera_stage5_dialogue_complete", responseOptionIds: [] },

  { id: "sera_s6_root", speakerId: CompanionId.Sera, text: "\"Those I once served have sent word — they wish to judge whether my penance is complete.\" Sera's old fear resurfaces. \"I do not know if I am ready to be found wanting again.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["sera_s6_pc1"] },
  { id: "sera_s6_pc1", speakerId: "kenji", text: "\"Their judgment doesn't define your worth anymore, Sera. Mine never did either — you were always enough.\"", conditions: [], responseOptionIds: ["sera_s6_npc1"] },
  { id: "sera_s6_npc1", speakerId: CompanionId.Sera, text: "\"I begin to believe that, more each day you say it.\" Her resolve steadies, fear receding. \"Let them judge. I have already found the only grace I truly needed.\"", conditions: [], setsStoryFlag: "sera_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "sera_s7_root", speakerId: CompanionId.Sera, text: "\"I fell believing I would spend eternity earning back what I lost.\" Sera's wings catch the light, fully unfurled and unashamed. \"Instead, I found something I never thought fallen creatures were permitted — to simply be loved.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["sera_s7_pc1"] },
  { id: "sera_s7_pc1", speakerId: "kenji", text: "\"You were always permitted that, Sera. You always will be.\"", conditions: [], responseOptionIds: ["sera_s7_npc1"] },
  { id: "sera_s7_npc1", speakerId: CompanionId.Sera, text: "\"Then I accept it, fully, without penance or condition.\" Her smile is the most unguarded he's ever seen. \"Thank you, Kenji, for showing a fallen thing what grace actually feels like.\"", conditions: [], setsStoryFlag: "sera_stage7_dialogue_complete", responseOptionIds: [] },
];

export const SERA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Sera,
  rootNodeIds: ["sera_s1_root", "sera_s1_root_b", "sera_s2_root", "sera_s2_root_b", "sera_s3_root", "sera_s3_root_b", "sera_s4_root", "sera_s4_root_b", "sera_s5_root", "sera_s5_root_b", "sera_s6_root", "sera_s6_root_b", "sera_s7_root", "sera_s7_root_b"],
};

// ============================================================================
// LYRA — Divine Half-Blood, regal, deeply empathic, carries cosmic duty
// ============================================================================

export const LYRA_DIALOGUE_NODES: DialogueNodeDef[] = [
  { id: "lyra_s1_root", speakerId: CompanionId.Lyra, text: "\"I felt your resolve before I saw your face — it carries further than you know.\" Lyra regards him with warm, searching eyes. \"The Court rarely sees conviction so plainly worn.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 1 }], responseOptionIds: ["lyra_s1_pc1"] },
  { id: "lyra_s1_pc1", speakerId: "kenji", text: "\"You can sense things like that?\"", conditions: [], responseOptionIds: ["lyra_s1_npc1"] },
  { id: "lyra_s1_npc1", speakerId: CompanionId.Lyra, text: "\"A burden of my blood, more than a gift, most days.\" She smiles gently. \"I am Lyra. I feel the Court's grief and ambition alike, whether I wish to or not. Yours felt different. Steadier.\"", conditions: [], setsStoryFlag: "lyra_stage1_dialogue_complete", responseOptionIds: [] },

  { id: "lyra_s2_root", speakerId: CompanionId.Lyra, text: "\"You return often, and your feelings toward me have not gone unnoticed.\" Lyra's tone is soft, without judgment. \"I confess I find myself feeling similarly, which is rarer than you might imagine.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 2 }], responseOptionIds: ["lyra_s2_pc1"] },
  { id: "lyra_s2_pc1", speakerId: "kenji", text: "\"I'd like to know you better, Lyra. Whatever that means for someone like you.\"", conditions: [], responseOptionIds: ["lyra_s2_npc1"] },
  { id: "lyra_s2_npc1", speakerId: CompanionId.Lyra, text: "\"That means more to me than you likely realize.\" Her smile is warm, genuinely touched. \"Most see only the divine half of me. I would very much like to be known as simply myself, for once.\"", conditions: [], setsStoryFlag: "lyra_stage2_dialogue_complete", responseOptionIds: [] },

  { id: "lyra_s3_root", speakerId: CompanionId.Lyra, text: "\"Feeling everyone's sorrow, all the time, is a lonelier existence than people assume.\" Lyra's composure softens into real vulnerability. \"I rarely find anyone who thinks to ask how I bear it.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 3 }, { type: "TRUST_AT_LEAST", value: 30 }], responseOptionIds: ["lyra_s3_pc1"] },
  { id: "lyra_s3_pc1", speakerId: "kenji", text: "\"How do you bear it, Lyra? I want to understand.\"", conditions: [], responseOptionIds: ["lyra_s3_npc1"] },
  { id: "lyra_s3_npc1", speakerId: CompanionId.Lyra, text: "\"Poorly, some nights. Gracefully, on my better ones.\" Her honesty surprises her own. \"Thank you for asking rather than assuming. It is a small thing that means a great deal.\"", conditions: [], setsStoryFlag: "lyra_stage3_dialogue_complete", responseOptionIds: [] },

  { id: "lyra_s4_root", speakerId: CompanionId.Lyra, text: "\"I have felt love in others' hearts a thousand times over, secondhand and distant.\" Lyra takes his hands, luminous with sincerity. \"Feeling it in my own, for you, is an entirely different miracle. I love you, Kenji.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 4 }, { type: "TRUST_AT_LEAST", value: 60 }, { type: "LOVE_AT_LEAST", value: 60 }], responseOptionIds: ["lyra_s4_pc1"] },
  { id: "lyra_s4_pc1", speakerId: "kenji", text: "\"I love you too, Lyra. This one is entirely mine to give you.\"", conditions: [], responseOptionIds: ["lyra_s4_npc1"] },
  { id: "lyra_s4_npc1", speakerId: CompanionId.Lyra, text: "Warmth radiates from her, almost visible. \"Then I accept it fully, gladly — the first feeling I've ever wanted to keep entirely for myself.\" She kisses him, radiant.", conditions: [], setsStoryFlag: "lyra_stage4_dialogue_complete", responseOptionIds: [] },

  { id: "lyra_s5_root", speakerId: CompanionId.Lyra, text: "\"My wing of your Manor has become a true sanctuary — the first place my gift feels like a blessing rather than a burden.\" Lyra looks serene, luminous with contentment.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 5 }], responseOptionIds: ["lyra_s5_pc1"] },
  { id: "lyra_s5_pc1", speakerId: "kenji", text: "\"I'm glad this place gives you that peace.\"", conditions: [], responseOptionIds: ["lyra_s5_npc1"] },
  { id: "lyra_s5_npc1", speakerId: CompanionId.Lyra, text: "\"As am I.\" She takes his hand, contentment radiating outward like warmth from a hearth. \"Surrounded by love this genuine, even my burden feels lighter to carry.\"", conditions: [], setsStoryFlag: "lyra_stage5_dialogue_complete", responseOptionIds: [] },

  { id: "lyra_s6_root", speakerId: CompanionId.Lyra, text: "\"I feel a great cosmic sorrow stirring, far beyond the Court — something ancient, waking. It frightens me more than I can easily express.\" Lyra's usual serenity is shaken.", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 6 }], responseOptionIds: ["lyra_s6_pc1"] },
  { id: "lyra_s6_pc1", speakerId: "kenji", text: "\"Whatever it is, we'll face it together. You won't carry this alone.\"", conditions: [], responseOptionIds: ["lyra_s6_npc1"] },
  { id: "lyra_s6_npc1", speakerId: CompanionId.Lyra, text: "\"Together.\" She repeats it like a ward against the fear. \"For the first time facing something this vast, I do not feel entirely alone in it. Thank you, Kenji.\"", conditions: [], setsStoryFlag: "lyra_stage6_dialogue_complete", responseOptionIds: [] },

  { id: "lyra_s7_root", speakerId: CompanionId.Lyra, text: "\"I have spent my whole existence feeling everyone else's hearts before my own.\" Lyra glows softly, at total peace. \"You taught this half-divine heart what it feels like to simply be loved back, without condition or duty.\"", conditions: [{ type: "QUEST_STAGE_AT_LEAST", value: 7 }, { type: "TRUST_AT_LEAST", value: 90 }, { type: "LOVE_AT_LEAST", value: 90 }], responseOptionIds: ["lyra_s7_pc1"] },
  { id: "lyra_s7_pc1", speakerId: "kenji", text: "\"You'll always be loved back, Lyra. Fully, and without condition.\"", conditions: [], responseOptionIds: ["lyra_s7_npc1"] },
  { id: "lyra_s7_npc1", speakerId: CompanionId.Lyra, text: "\"Then I have finally found the one feeling I never need to sense secondhand again.\" Her light settles into something calm and eternal. \"My own. Ours. Thank you, Kenji, for all of it.\"", conditions: [], setsStoryFlag: "lyra_stage7_dialogue_complete", responseOptionIds: [] },
];

export const LYRA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
  characterId: CompanionId.Lyra,
  rootNodeIds: ["lyra_s1_root", "lyra_s1_root_b", "lyra_s2_root", "lyra_s2_root_b", "lyra_s3_root", "lyra_s3_root_b", "lyra_s4_root", "lyra_s4_root_b", "lyra_s5_root", "lyra_s5_root_b", "lyra_s6_root", "lyra_s6_root_b", "lyra_s7_root", "lyra_s7_root_b"],
};

// ============================================================================
// COMBINED EXPORTS
// ============================================================================

export const ALL_OTHER_COMPANIONS_DIALOGUE_NODES: DialogueNodeDef[] = [
  ...ISOLDE_DIALOGUE_NODES, ...GRAEL_DIALOGUE_NODES, ...VALKA_DIALOGUE_NODES,
  ...SEIRA_DIALOGUE_NODES, ...SYLVARA_DIALOGUE_NODES, ...REVA_DIALOGUE_NODES,
  ...TASHA_DIALOGUE_NODES, ...SERA_DIALOGUE_NODES, ...LYRA_DIALOGUE_NODES,
];

export const ALL_OTHER_COMPANIONS_DIALOGUE_TREES: CharacterDialogueTreeDef[] = [
  ISOLDE_DIALOGUE_TREE, GRAEL_DIALOGUE_TREE, VALKA_DIALOGUE_TREE,
  SEIRA_DIALOGUE_TREE, SYLVARA_DIALOGUE_TREE, REVA_DIALOGUE_TREE,
  TASHA_DIALOGUE_TREE, SERA_DIALOGUE_TREE, LYRA_DIALOGUE_TREE,
];
