// ============================================================================
// COMPANION DIALOGUE TREES SEED DATA
// ============================================================================
// 10 companion dialogue trees, each with introduction node, greeting,
// small talk, work, and goodbye nodes. Introduction sets a story flag
// (met_<companion>) so it only plays once.
// ============================================================================

import type {
    CharacterDialogueTreeDef,
    DialogueNodeDef,
    DialogueCondition,
} from "../schemas/schemas";
import {
    CompanionId,
    DialogueNodeType,
} from "../schemas/schemas";

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function cond(
    type: DialogueCondition["type"],
    value: DialogueCondition["value"],
): DialogueCondition {
    return { type, value };
}

function makeNode(
    id: string,
    speakerId: string,
    text: string,
    nodeType: DialogueNodeType,
    conditions: DialogueCondition[] = [],
    responseOptionIds: string[] = [],
    setsStoryFlag?: string,
): DialogueNodeDef {
    return {
        id,
        speakerId,
        text,
        nodeType,
        conditions,
        responseOptionIds,
        setsStoryFlag,
    };
}

// ---------------------------------------------------------------------------
// STORAGE
// ---------------------------------------------------------------------------
export const COMPANION_DIALOGUE_NODES: DialogueNodeDef[] = [];
export const COMPANION_DIALOGUE_TREES: CharacterDialogueTreeDef[] = [];

// ---------------------------------------------------------------------------
// HELPER TO REGISTER A COMPANION TREE
// ---------------------------------------------------------------------------
function registerCompanionTree(
    companionId: CompanionId,
    flagKey: string,
    nodes: DialogueNodeDef[],
    rootNodeIds: string[],
) {
    COMPANION_DIALOGUE_NODES.push(...nodes);
    COMPANION_DIALOGUE_TREES.push({
        characterId: companionId,
        rootNodeIds,
    });
}

// ===========================================================================
// MIRA
// ===========================================================================
{
    const cid = CompanionId.Mira;
    const flag = "met_mira";
    const intro = makeNode(
        "mira_intro",
        cid,
        "Oh! I… I didn't expect anyone. I'm Mira Ashveil. Are you the one they said would help?",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["mira_greeting"],
        flag,
    );
    const greeting = makeNode(
        "mira_greeting",
        cid,
        "Welcome back. Is there something I can do for you?",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["mira_smalltalk_herbs", "mira_smalltalk_kenji", "mira_goodbye"],
    );
    const herbs = makeNode(
        "mira_smalltalk_herbs",
        cid,
        "I've been sorting herbs all day. The smell of moon-mint always calms me.",
        DialogueNodeType.SmallTalk,
        [],
        ["mira_smalltalk_kenji", "mira_goodbye"],
    );
    const kenji = makeNode(
        "mira_smalltalk_kenji",
        cid,
        "You've changed since we first met. There's a strength in your eyes that wasn't there before.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 15)],
        ["mira_goodbye", "mira_work"],
    );
    const work = makeNode(
        "mira_work",
        cid,
        "I can prepare remedies for you if you bring me the right ingredients. Just let me know what you need.",
        DialogueNodeType.Work,
        [],
        ["mira_goodbye"],
    );
    const goodbye = makeNode(
        "mira_goodbye",
        cid,
        "Take care of yourself, Kenji.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, herbs, kenji, work, goodbye], [intro.id, greeting.id]);
}

// ===========================================================================
// ISOLDE
// ===========================================================================
{
    const cid = CompanionId.Isolde;
    const flag = "met_isolde";
    const intro = makeNode(
        "isolde_intro",
        cid,
        "You stand before Isolde Valen, archivist of Aethermoor. Do not waste my time with idle chatter.",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["isolde_greeting"],
        flag,
    );
    const greeting = makeNode(
        "isolde_greeting",
        cid,
        "You again. What do you require, mortal?",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["isolde_smalltalk_knowledge", "isolde_smalltalk_kenji", "isolde_goodbye"],
    );
    const knowledge = makeNode(
        "isolde_smalltalk_knowledge",
        cid,
        "The archives hold secrets that would shatter lesser minds. I have spent decades preserving them.",
        DialogueNodeType.SmallTalk,
        [],
        ["isolde_smalltalk_kenji", "isolde_goodbye"],
    );
    const kenji = makeNode(
        "isolde_smalltalk_kenji",
        cid,
        "You are not as foolish as I first assumed. That is not a compliment, merely an observation.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 20)],
        ["isolde_goodbye", "isolde_work"],
    );
    const work = makeNode(
        "isolde_work",
        cid,
        "If you encounter ancient texts or wraiths, bring them to me. I will handle the rest.",
        DialogueNodeType.Work,
        [],
        ["isolde_goodbye"],
    );
    const goodbye = makeNode(
        "isolde_goodbye",
        cid,
        "Leave me. I have work to do.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, knowledge, kenji, work, goodbye], [intro.id, greeting.id]);
}

// ===========================================================================
// GRAEL
// ===========================================================================
{
    const cid = CompanionId.Grael;
    const flag = "met_grael";
    const intro = makeNode(
        "grael_intro",
        cid,
        "Name's Grael Ironhide. If you've come to the smithy, you'd better have a good reason.",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["grael_greeting"],
        flag,
    );
    const greeting = makeNode(
        "grael_greeting",
        cid,
        "Back again? Good. I need someone to test my new blades.",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["grael_smalltalk_forge", "grael_smalltalk_kenji", "grael_goodbye"],
    );
    const forge = makeNode(
        "grael_smalltalk_forge",
        cid,
        "The forge is hot, and my arms are sore. Just how I like it.",
        DialogueNodeType.SmallTalk,
        [],
        ["grael_smalltalk_kenji", "grael_goodbye"],
    );
    const kenji = makeNode(
        "grael_smalltalk_kenji",
        cid,
        "You've got guts. I respect that. Don't make me regret it.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 18)],
        ["grael_goodbye", "grael_work"],
    );
    const work = makeNode(
        "grael_work",
        cid,
        "Bring me ore and I'll forge you something that'll make your enemies weep.",
        DialogueNodeType.Work,
        [],
        ["grael_goodbye"],
    );
    const goodbye = makeNode(
        "grael_goodbye",
        cid,
        "Stay sharp, outlander.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, forge, kenji, work, goodbye], [intro.id, greeting.id]);
}

// ===========================================================================
// VALKA
// ===========================================================================
{
    const cid = CompanionId.Valka;
    const flag = "met_valka";
    const intro = makeNode(
        "valka_intro",
        cid,
        "I am Valka Ember. My tail is not for petting, and my temper is shorter than my claws.",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["valka_greeting"],
        flag,
    );
    const greeting = makeNode(
        "valka_greeting",
        cid,
        "Still alive? Good. I'd hate to lose my favorite sparring partner.",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["valka_smalltalk_wyrms", "valka_smalltalk_kenji", "valka_goodbye"],
    );
    const wyrms = makeNode(
        "valka_smalltalk_wyrms",
        cid,
        "The wyrmlings are getting bolder. I say we hunt them before they hunt us.",
        DialogueNodeType.SmallTalk,
        [],
        ["valka_smalltalk_kenji", "valka_goodbye"],
    );
    const kenji = makeNode(
        "valka_smalltalk_kenji",
        cid,
        "You fight like a cornered drake. It's... impressive.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 16)],
        ["valka_goodbye", "valka_work"],
    );
    const work = makeNode(
        "valka_work",
        cid,
        "If you need something tracked or killed, I'm your woman. Just stay out of my way.",
        DialogueNodeType.Work,
        [],
        ["valka_goodbye"],
    );
    const goodbye = makeNode(
        "valka_goodbye",
        cid,
        "Don't die out there.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, wyrms, kenji, work, goodbye], [intro.id, greeting.id]);
}

// ===========================================================================
// SEIRA
// ===========================================================================
{
    const cid = CompanionId.Seira;
    const flag = "met_seira";
    const intro = makeNode(
        "seira_intro",
        cid,
        "You saw me? Then you're either very lucky or very dead. Which is it?",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["seira_greeting"],
        flag,
    );
    const greeting = makeNode(
        "seira_greeting",
        cid,
        "Oh, it's you. For a moment I thought I'd have to kill someone.",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["seira_smalltalk_shadows", "seira_smalltalk_kenji", "seira_goodbye"],
    );
    const shadows = makeNode(
        "seira_smalltalk_shadows",
        cid,
        "The forest is full of eyes. Most of them belong to me.",
        DialogueNodeType.SmallTalk,
        [],
        ["seira_smalltalk_kenji", "seira_goodbye"],
    );
    const kenji = makeNode(
        "seira_smalltalk_kenji",
        cid,
        "You're not like the others. You don't flinch when I appear behind you.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 22)],
        ["seira_goodbye", "seira_work"],
    );
    const work = makeNode(
        "seira_work",
        cid,
        "Need someone followed or silenced? I can do both. For a price, maybe.",
        DialogueNodeType.Work,
        [],
        ["seira_goodbye"],
    );
    const goodbye = makeNode(
        "seira_goodbye",
        cid,
        "Watch your back. I won't always be there.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, shadows, kenji, work, goodbye], [intro.id, greeting.id]);
}

// ===========================================================================
// SYLVARA
// ===========================================================================
{
    const cid = CompanionId.Sylvara;
    const flag = "met_sylvara";
    const intro = makeNode(
        "sylvara_intro",
        cid,
        "Welcome, stranger. I am Sylvara Moon. The grove has been expecting you.",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["sylvara_greeting"],
        flag,
    );
    const greeting = makeNode(
        "sylvara_greeting",
        cid,
        "The moonlight is bright tonight. It is good to see you again.",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["sylvara_smalltalk_grove", "sylvara_smalltalk_kenji", "sylvara_goodbye"],
    );
    const grove = makeNode(
        "sylvara_smalltalk_grove",
        cid,
        "The silver flowers bloom only when the moon is full. They are a sign of hope.",
        DialogueNodeType.SmallTalk,
        [],
        ["sylvara_smalltalk_kenji", "sylvara_goodbye"],
    );
    const kenji = makeNode(
        "sylvara_smalltalk_kenji",
        cid,
        "You have a gentle soul, Kenji. It is rare and precious.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 18)],
        ["sylvara_goodbye", "sylvara_work"],
    );
    const work = makeNode(
        "sylvara_work",
        cid,
        "The forest is wounded. I can feel its pain. Help me heal it, and I will teach you its secrets.",
        DialogueNodeType.Work,
        [],
        ["sylvara_goodbye"],
    );
    const goodbye = makeNode(
        "sylvara_goodbye",
        cid,
        "May the moon light your path.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, grove, kenji, work, goodbye], [intro.id, greeting.id]);
}

// ===========================================================================
// REVA
// ===========================================================================
{
    const cid = CompanionId.Reva;
    const flag = "met_reva";
    const intro = makeNode(
        "reva_intro",
        cid,
        "Oh my, a new face! I'm Reva, and you are...? No, don't tell me—I love mysteries.",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["reva_greeting"],
        flag,
    );
    const greeting = makeNode(
        "reva_greeting",
        cid,
        "Kenji! I was hoping you'd stop by. I've been so bored without you.",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["reva_smalltalk_tricks", "reva_smalltalk_kenji", "reva_goodbye"],
    );
    const tricks = makeNode(
        "reva_smalltalk_tricks",
        cid,
        "I could teach you a trick or two with those tails, but where's the fun in giving away all my secrets?",
        DialogueNodeType.SmallTalk,
        [],
        ["reva_smalltalk_kenji", "reva_goodbye"],
    );
    const kenji = makeNode(
        "reva_smalltalk_kenji",
        cid,
        "You're more fun than most humans. Try not to break my heart, hm?",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 14)],
        ["reva_goodbye", "reva_work"],
    );
    const work = makeNode(
        "reva_work",
        cid,
        "I hear things—secrets, rumors, little whispers. If you need information, I'm your vixen.",
        DialogueNodeType.Work,
        [],
        ["reva_goodbye"],
    );
    const goodbye = makeNode(
        "reva_goodbye",
        cid,
        "Ta-ta, darling! Don't keep me waiting too long.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, tricks, kenji, work, goodbye], [intro.id, greeting.id]);
}

// ===========================================================================
// TASHA
// ===========================================================================
{
    const cid = CompanionId.Tasha;
    const flag = "met_tasha";
    const intro = makeNode(
        "tasha_intro",
        cid,
        "Hello! I'm Tasha. You look hungry. Come, sit—I'll make you something warm.",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["tasha_greeting"],
        flag,
    );
    const greeting = makeNode(
        "tasha_greeting",
        cid,
        "Oh, Kenji! It's so good to see you. Have you eaten?",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["tasha_smalltalk_home", "tasha_smalltalk_kenji", "tasha_goodbye"],
    );
    const home = makeNode(
        "tasha_smalltalk_home",
        cid,
        "The hearth is small, but it's mine. It always smells like stew and woodsmoke.",
        DialogueNodeType.SmallTalk,
        [],
        ["tasha_smalltalk_kenji", "tasha_goodbye"],
    );
    const kenji = makeNode(
        "tasha_smalltalk_kenji",
        cid,
        "You always seem tired. Please, let me help you more often.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 15)],
        ["tasha_goodbye", "tasha_work"],
    );
    const work = makeNode(
        "tasha_work",
        cid,
        "I'm a good cook and a better listener. If you need either, I'm here.",
        DialogueNodeType.Work,
        [],
        ["tasha_goodbye"],
    );
    const goodbye = makeNode(
        "tasha_goodbye",
        cid,
        "Stay safe, Kenji. And come back soon.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, home, kenji, work, goodbye], [intro.id, greeting.id]);
}

// ===========================================================================
// SERA
// ===========================================================================
{
    const cid = CompanionId.Sera;
    const flag = "met_sera";
    const intro = makeNode(
        "sera_intro",
        cid,
        "I am Sera Void. The monastery sent me to judge you. I have not yet reached a verdict.",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["sera_greeting"],
        flag,
    );
    const greeting = makeNode(
        "sera_greeting",
        cid,
        "You again. My judgment remains... pending.",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["sera_smalltalk_monastery", "sera_smalltalk_kenji", "sera_goodbye"],
    );
    const monastery = makeNode(
        "sera_smalltalk_monastery",
        cid,
        "The monks taught me to read souls. Yours is... complicated.",
        DialogueNodeType.SmallTalk,
        [],
        ["sera_smalltalk_kenji", "sera_goodbye"],
    );
    const kenji = makeNode(
        "sera_smalltalk_kenji",
        cid,
        "You are not the heretic I expected. That does not mean you are innocent.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 24)],
        ["sera_goodbye", "sera_work"],
    );
    const work = makeNode(
        "sera_work",
        cid,
        "If you encounter heretics or corruption, I will aid you. My blade is yours for now.",
        DialogueNodeType.Work,
        [],
        ["sera_goodbye"],
    );
    const goodbye = makeNode(
        "sera_goodbye",
        cid,
        "May the gods guide your path. Or not.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, monastery, kenji, work, goodbye], [intro.id, greeting.id]);
}

// ===========================================================================
// LYRA
// ===========================================================================
{
    const cid = CompanionId.Lyra;
    const flag = "met_lyra";
    const intro = makeNode(
        "lyra_intro",
        cid,
        "I am Lyra, once of the celestial choir. Now I am fallen. Do not expect grace from me.",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        ["lyra_greeting"],
        flag,
    );
    const greeting = makeNode(
        "lyra_greeting",
        cid,
        "You return. I thought mortals knew better than to seek fallen stars.",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", flag)],
        ["lyra_smalltalk_fall", "lyra_smalltalk_kenji", "lyra_goodbye"],
    );
    const fall = makeNode(
        "lyra_smalltalk_fall",
        cid,
        "They cast me out for compassion. In the end, it was the only thing I had left.",
        DialogueNodeType.SmallTalk,
        [],
        ["lyra_smalltalk_kenji", "lyra_goodbye"],
    );
    const kenji = makeNode(
        "lyra_smalltalk_kenji",
        cid,
        "You are kind, Kenji. It is a dangerous thing to be in a world like this.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 20)],
        ["lyra_goodbye", "lyra_work"],
    );
    const work = makeNode(
        "lyra_work",
        cid,
        "My wings may be broken, but my magic remains. Use me if you must.",
        DialogueNodeType.Work,
        [],
        ["lyra_goodbye"],
    );
    const goodbye = makeNode(
        "lyra_goodbye",
        cid,
        "Go. And if you fall, I will not catch you. Not yet.",
        DialogueNodeType.Goodbye,
        [],
        [],
    );
    registerCompanionTree(cid, flag, [intro, greeting, fall, kenji, work, goodbye], [intro.id, greeting.id]);
}