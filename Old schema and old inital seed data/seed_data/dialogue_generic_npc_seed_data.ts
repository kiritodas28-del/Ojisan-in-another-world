// ============================================================================
// GENERIC NPC DIALOGUE SETS SEED DATA
// ============================================================================
// Three dialogue sets per procedural class: male, female, and neutral.
// Each set contains an introduction node (FIRST_TALK condition) that, when
// triggered, will cause the interaction engine to mark the NPC as
// introduced and add them to the contact list.
// ============================================================================

import {
    GenericNpcDialogueSetDef,
    DialogueNodeDef,
    DialogueCondition,
    DialogueNodeType,
} from "../schemas/schemas";

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
const FIRST_TALK_CONDITION: DialogueCondition[] = [
    { type: "FIRST_TALK", value: true },
];

function makeNode(
    id: string,
    text: string,
    conditions: DialogueCondition[] = [],
    responseOptionIds: string[] = [],
    nodeType: DialogueNodeType,
): DialogueNodeDef {
    return {
        id,
        speakerId: "npc",
        nodeType,
        text,
        conditions,
        responseOptionIds,
    };
}

// ---------------------------------------------------------------------------
// CLASS DIALOGUE METADATA
// ---------------------------------------------------------------------------
interface ClassDialogueData {
    classId: string;
    displayName: string;
    introLines: Record<"male" | "female" | "neutral", string>;
    smallTalkLines: Record<"male" | "female" | "neutral", string>;
    workLines: Record<"male" | "female" | "neutral", string>;
    goodbyeLines: Record<"male" | "female" | "neutral", string>;
}

const CLASS_DIALOGUES: ClassDialogueData[] = [
    {
        classId: "town_merchant",
        displayName: "Town Merchant",
        introLines: {
            male: "Good day! I'm {name}, a local merchant. Need supplies?",
            female: "Hello there! I'm {name}, I run a small shop here. Looking for something?",
            neutral: "Greetings! I'm {name}, a trader in these parts. How can I help?",
        },
        smallTalkLines: {
            male: "Business is slow today, but a coin is a coin.",
            female: "The market has been lively lately. Makes the day go faster.",
            neutral: "The roads are busier than usual. Good for trade, I suppose.",
        },
        workLines: {
            male: "I deal in all sorts of goods. Armor, potions, even the occasional trinket.",
            female: "I stock a bit of everything—potions, ingredients, and some cloth goods.",
            neutral: "I keep a varied stock. If you need something, chances are I can find it.",
        },
        goodbyeLines: {
            male: "Safe travels.",
            female: "Come back any time!",
            neutral: "Good day to you.",
        },
    },
    {
        classId: "farm_worker",
        displayName: "Farm Worker",
        introLines: {
            male: "Eh? Oh, hello. Name's {name}. I work the fields nearby.",
            female: "Hi! I'm {name}. I help with the farm work around here.",
            neutral: "Hello. I'm {name}, a farmhand. Pleased to meet you.",
        },
        smallTalkLines: {
            male: "Sun's hot today. The crops need water.",
            female: "My back aches from planting all morning.",
            neutral: "The soil is good this season. Should be a fine harvest.",
        },
        workLines: {
            male: "I plow, sow, and reap. The land doesn't rest, neither do I.",
            female: "I tend the vegetables and help with the animals. It's honest work.",
            neutral: "There's always something to do on the farm—planting, weeding, harvesting.",
        },
        goodbyeLines: {
            male: "Back to work then.",
            female: "Take care now.",
            neutral: "Goodbye.",
        },
    },
    {
        classId: "tavern_server",
        displayName: "Tavern Server",
        introLines: {
            male: "Welcome! I'm {name}. What can I get you?",
            female: "Hi there! I'm {name}, I'll be serving you today.",
            neutral: "Hello! I'm {name}, your server for this evening.",
        },
        smallTalkLines: {
            male: "The tavern's busier than a wasp's nest tonight.",
            female: "Some travelers came through earlier telling wild stories.",
            neutral: "The ale is fresh, and the stew is hot. You should try both.",
        },
        workLines: {
            male: "I take orders, pour drinks, and keep the peace when needed.",
            female: "I've been working here a while—I know all the regulars and their orders.",
            neutral: "Serving is harder than it looks, especially on a busy night.",
        },
        goodbyeLines: {
            male: "Enjoy your meal!",
            female: "Let me know if you need anything else.",
            neutral: "Thanks for stopping by.",
        },
    },
    {
        classId: "town_guard",
        displayName: "Town Guard",
        introLines: {
            male: "State your business. I'm {name}, guard of this town.",
            female: "Well met. I'm {name}, part of the town watch. Keep your nose clean.",
            neutral: "I'm {name}, a guard here. Keep the peace and we'll have no trouble.",
        },
        smallTalkLines: {
            male: "Watch your step. There have been thieves about.",
            female: "Crime's been low lately, but we stay vigilant.",
            neutral: "The town is safe as long as we're on duty.",
        },
        workLines: {
            male: "I patrol the streets, break up fights, and keep the gates secure.",
            female: "I keep the peace and make sure the marketplace doesn't become a brawl.",
            neutral: "Guard duty is mostly boring until it isn't. Be glad for boring days.",
        },
        goodbyeLines: {
            male: "Move along.",
            female: "Stay out of trouble.",
            neutral: "Good day, citizen.",
        },
    },
    {
        classId: "herbalist",
        displayName: "Herbalist",
        introLines: {
            male: "Ah, a visitor. I'm {name}, the herbalist. Come for remedies?",
            female: "Welcome. I'm {name}, a gatherer of herbs and maker of salves.",
            neutral: "Hello. I'm {name}, an herbalist. What ails you today?",
        },
        smallTalkLines: {
            male: "The forest is full of useful plants this time of year.",
            female: "I've been drying lavender and mint—makes the shop smell lovely.",
            neutral: "Nature provides, but one must know where to look.",
        },
        workLines: {
            male: "I collect herbs, brew potions, and treat the occasional wound.",
            female: "I make poultices, tinctures, and remedies for common ailments.",
            neutral: "From feverfew to moon-mint, I know what grows and what heals.",
        },
        goodbyeLines: {
            male: "Come back if you need anything.",
            female: "Drink plenty of water and rest well.",
            neutral: "Stay healthy.",
        },
    },
    {
        classId: "miner",
        displayName: "Miner",
        introLines: {
            male: "Hmph. I'm {name}. I dig ore. What do you want?",
            female: "Oh! Hello. I'm {name}. I work the mines nearby. Can I help?",
            neutral: "I'm {name}, a miner. Here to buy ore or just passing through?",
        },
        smallTalkLines: {
            male: "The mine's been unstable lately. Dangerous work.",
            female: "My hands are calloused and my back hurts, but the pay is decent.",
            neutral: "There's good ore in these mountains, but it's hard to get out.",
        },
        workLines: {
            male: "I swing a pick, load carts, and keep an eye on the supports.",
            female: "I dig for iron and the occasional crystal. It's dirty work, but honest.",
            neutral: "Mining is not for the faint of heart. You get used to the dark.",
        },
        goodbyeLines: {
            male: "Back to the pick.",
            female: "Stay safe.",
            neutral: "Goodbye.",
        },
    },
    {
        classId: "fisherman",
        displayName: "Fisherman",
        introLines: {
            male: "Ahoy. I'm {name}. I fish these waters. Need something?",
            female: "Hello! I'm {name}. I'm a fisher here. Looking for fresh fish?",
            neutral: "I'm {name}, a fisher. The river's been good to me.",
        },
        smallTalkLines: {
            male: "The fish are biting early today.",
            female: "The water is calm—good for the nets.",
            neutral: "You can smell the salt from here. The sea is close.",
        },
        workLines: {
            male: "I set out at dawn, cast nets, and bring in whatever the river gives.",
            female: "I mend the nets, set the traps, and sell the catch at market.",
            neutral: "Fishing is about patience. Sometimes you wait hours for one big catch.",
        },
        goodbyeLines: {
            male: "Fair winds.",
            female: "Tight lines!",
            neutral: "Good fishing to you.",
        },
    },
    {
        classId: "hunter",
        displayName: "Hunter",
        introLines: {
            male: "I'm {name}. I track beasts in the wild. You look like you can handle yourself.",
            female: "Hey. I'm {name}. I hunt game in these woods. Seen anything strange?",
            neutral: "I'm {name}, a hunter. The forest is full of tracks—some not of animals.",
        },
        smallTalkLines: {
            male: "The deer are moving to higher ground. Winter's coming.",
            female: "I saw wolf tracks near the creek. Stay sharp.",
            neutral: "The woods are quiet today. Too quiet.",
        },
        workLines: {
            male: "I set snares, track game, and sell pelts and meat.",
            female: "I know the animal trails and which mushrooms are safe to eat.",
            neutral: "Hunting is more than killing—it's knowing the land and its creatures.",
        },
        goodbyeLines: {
            male: "Keep your eyes open.",
            female: "Watch the shadows.",
            neutral: "Stay safe out there.",
        },
    },
    {
        classId: "shrine_priest",
        displayName: "Shrine Priest",
        introLines: {
            male: "Blessings upon you. I am {name}, keeper of this shrine.",
            female: "Welcome, traveler. I am {name}, a humble servant of the divine.",
            neutral: "Peace be with you. I am {name}, caretaker of this sacred place.",
        },
        smallTalkLines: {
            male: "The shrine has been quiet. Perhaps the faithful are busy with harvest.",
            female: "I've been praying for good weather and safe journeys.",
            neutral: "Many come seeking guidance or a moment of peace.",
        },
        workLines: {
            male: "I maintain the altar, offer prayers, and provide counsel to those in need.",
            female: "I tend the sacred flames and listen to confessions.",
            neutral: "I keep the shrine clean, lead prayers, and offer spiritual comfort.",
        },
        goodbyeLines: {
            male: "May the gods watch over you.",
            female: "Walk in light.",
            neutral: "Be well.",
        },
    },
    {
        classId: "traveling_performer",
        displayName: "Traveling Performer",
        introLines: {
            male: "Ah, an audience! I am {name}, master of many talents!",
            female: "Hello, darling! I'm {name}. Care for a song or a story?",
            neutral: "Greetings! I am {name}, a wandering performer. Let me entertain you!",
        },
        smallTalkLines: {
            male: "The roads are long, but the applause makes it worthwhile.",
            female: "I've been practicing a new dance—it's quite scandalous!",
            neutral: "Every town has its own rhythm. I just try to keep up.",
        },
        workLines: {
            male: "I juggle, jest, and play the lute. Coin for a performance?",
            female: "I sing, dance, and tell fortunes. I can also do a dramatic monologue.",
            neutral: "I perform in taverns, squares, and noble courts. The show must go on!",
        },
        goodbyeLines: {
            male: "Encore? Maybe later.",
            female: "Ta-ta, darling!",
            neutral: "Until next time!",
        },
    },
    {
        classId: "adventurer",
        displayName: "Adventurer",
        introLines: {
            male: "Well met! I am {name}, an adventurer. Perhaps we'll share a quest someday.",
            female: "Hi! I'm {name}, an adventurer looking for the next thrill. What's your story?",
            neutral: "I'm {name}, an adventurer. The road is long and full of danger—and treasure.",
        },
        smallTalkLines: {
            male: "I just came back from the Crimson March. Nasty business there.",
            female: "I heard there's a dungeon near Aethermoor that's ripe for exploring.",
            neutral: "You meet all sorts on the road—heroes, brigands, and the occasional talking cat.",
        },
        workLines: {
            male: "I take contracts, clear ruins, and hunt monsters. Never a dull moment.",
            female: "I explore old ruins, fight bandits, and find forgotten treasures.",
            neutral: "Adventuring is about risk and reward. You learn to trust your instincts.",
        },
        goodbyeLines: {
            male: "See you on the road.",
            female: "Maybe we'll team up sometime!",
            neutral: "Safe travels, friend.",
        },
    },
];

// ---------------------------------------------------------------------------
// GENERATE NODES AND SETS
// ---------------------------------------------------------------------------
export const GENERIC_NPC_DIALOGUE_NODES: DialogueNodeDef[] = [];
export const GENERIC_NPC_DIALOGUE_SETS: GenericNpcDialogueSetDef[] = [];

for (const data of CLASS_DIALOGUES) {
    const genders = ["male", "female", "neutral"] as const;
    for (const gender of genders) {
        const suffix = `_${gender}`;
        const classId = `${data.classId}${suffix}`;
        const setName = `${data.classId}${suffix}_set`;

        const introNodeId = `${classId}_intro`;
        const smallTalkNodeId = `${classId}_smalltalk`;
        const workNodeId = `${classId}_work`;
        const goodbyeNodeId = `${classId}_goodbye`;

        // Response chains
        const introResponses = [smallTalkNodeId];
        const smallTalkResponses = [workNodeId, goodbyeNodeId];
        const workResponses = [goodbyeNodeId];

        // Create nodes
        GENERIC_NPC_DIALOGUE_NODES.push(
            makeNode(
                introNodeId,
                data.introLines[gender].replace("{name}", "{name}"),
                FIRST_TALK_CONDITION,
                introResponses,
                DialogueNodeType.Introduction,
            ),
            makeNode(
                smallTalkNodeId,
                data.smallTalkLines[gender],
                [],
                smallTalkResponses,
                DialogueNodeType.SmallTalk,
            ),
            makeNode(
                workNodeId,
                data.workLines[gender],
                [],
                workResponses,
                DialogueNodeType.Work,
            ),
            makeNode(
                goodbyeNodeId,
                data.goodbyeLines[gender],
                [],
                [],
                DialogueNodeType.Goodbye,
            ),
        );

        // Create set
        GENERIC_NPC_DIALOGUE_SETS.push({
            procNpcClassId: setName, // e.g., "town_merchant_male_set"
            rootNodeIds: [introNodeId, smallTalkNodeId],
            introductionNodeId: introNodeId,
        });
    }
}