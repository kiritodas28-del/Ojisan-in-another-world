// ============================================================================
// DIALOGUE — ASTRAEA (NAMED STORY CHARACTER)
// ============================================================================
import type {
    CharacterDialogueTreeDef,
    DialogueNodeDef,
    DialogueCondition,
} from "../schemas/schemas";
import { CompanionId, DialogueNodeType } from "../schemas/schemas";

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
// DIALOGUE NODES
// ---------------------------------------------------------------------------
export const ASTRAEA_DIALOGUE_NODES: DialogueNodeDef[] = [
    // ---------------------------------------------------------------------
    // INTRODUCTION (first face-to-face meeting, before she joins)
    // ---------------------------------------------------------------------
    makeNode(
        "astraea_intro_first_meeting",
        "astraea",
        "You have come far, Kenji. I am Astraea, the one who watches over this world. You have questions—ask, and I will answer what I may.",
        DialogueNodeType.Introduction,
        [cond("FIRST_TALK", true)],
        [
            "astraea_intro_who_are_you",
            "astraea_intro_why_me",
            "astraea_intro_what_now",
        ],
    ),

    makeNode(
        "astraea_intro_who_are_you",
        "astraea",
        "I am the last remnant of the divine order that once guided this world. My power is fading, but my duty remains. I am the keeper of the Celestial Threshold.",
        DialogueNodeType.Generic,
        [],
        ["astraea_intro_why_me", "astraea_intro_what_now"],
    ),

    makeNode(
        "astraea_intro_why_me",
        "astraea",
        "You were brought here because you possess a soul unbound by this world's fate. Your otherworldly nature makes you the only one who can break the cycle of Miasma and restore balance.",
        DialogueNodeType.Generic,
        [],
        ["astraea_intro_what_now", "astraea_intro_who_are_you"],
    ),

    makeNode(
        "astraea_intro_what_now",
        "astraea",
        "The Miasma still festers. The final convergence is near. You must gather your allies and confront the source. I will lend you my strength, but the battle will be yours.",
        DialogueNodeType.Generic,
        [],
        ["astraea_intro_accept", "astraea_intro_decline"],
    ),

    makeNode(
        "astraea_intro_accept",
        "astraea",
        "Then stand ready. From this moment, I will walk beside you as ally and friend. Let us end this together.",
        DialogueNodeType.Generic,
        [],
        ["astraea_joined_greeting"],
        "astraea_joined",
    ),

    makeNode(
        "astraea_intro_decline",
        "astraea",
        "I understand. The burden is heavy. But know that the door remains open. When you are ready, I will be here.",
        DialogueNodeType.Generic,
        [],
        ["astraea_intro_what_now"],
    ),

    // ---------------------------------------------------------------------
    // POST-JOINING ROOT / GREETING (after astraea_joined flag is set)
    // ---------------------------------------------------------------------
    makeNode(
        "astraea_joined_greeting",
        "astraea",
        "Kenji. How may I assist you today?",
        DialogueNodeType.SmallTalk,
        [cond("STORY_FLAG_SET", "astraea_joined")],
        [
            "astraea_smalltalk_world",
            "astraea_smalltalk_miasma",
            "astraea_smalltalk_relationship",
            "astraea_goodbye",
        ],
    ),

    // ---------------------------------------------------------------------
    // SMALL TALK BRANCHES
    // ---------------------------------------------------------------------
    makeNode(
        "astraea_smalltalk_world",
        "astraea",
        "This world is wounded, but not beyond saving. The people still have hope, and that hope is the strongest weapon we possess.",
        DialogueNodeType.SmallTalk,
        [],
        ["astraea_smalltalk_miasma", "astraea_smalltalk_relationship", "astraea_goodbye"],
    ),

    makeNode(
        "astraea_smalltalk_miasma",
        "astraea",
        "The Miasma is not merely a disease—it is a corruption of the very fabric of existence. Those who fall to it lose themselves. Even I am not immune to its touch.",
        DialogueNodeType.SmallTalk,
        [],
        ["astraea_smalltalk_world", "astraea_smalltalk_relationship", "astraea_goodbye"],
    ),

    makeNode(
        "astraea_smalltalk_relationship",
        "astraea",
        "Though I have existed for eons, I have rarely known companionship. Your presence is... pleasant. I am glad to be here with you.",
        DialogueNodeType.SmallTalk,
        [cond("TRUST_AT_LEAST", 20)],
        ["astraea_smalltalk_world", "astraea_smalltalk_miasma", "astraea_goodbye"],
    ),

    // ---------------------------------------------------------------------
    // WORK / ROLE RELATED
    // ---------------------------------------------------------------------
    makeNode(
        "astraea_work_role",
        "astraea",
        "My duties were once simple: guide the flow of aether, maintain the seals that keep the abyss at bay. Now, I am the last seal. If I fall, the threshold crumbles.",
        DialogueNodeType.Work,
        [],
        ["astraea_goodbye", "astraea_work_power"],
    ),

    makeNode(
        "astraea_work_power",
        "astraea",
        "My power is not what it once was. I can still grant blessings, but the greater magics are beyond me now. That is why I must rely on you, Kenji.",
        DialogueNodeType.Work,
        [],
        ["astraea_work_role", "astraea_goodbye"],
    ),

    // ---------------------------------------------------------------------
    // GOODBYE
    // ---------------------------------------------------------------------
    makeNode(
        "astraea_goodbye",
        "astraea",
        "Farewell for now. May the light guide your path.",
        DialogueNodeType.Goodbye,
        [],
        [],
    ),
];

// ---------------------------------------------------------------------------
// DIALOGUE TREE
// ---------------------------------------------------------------------------
export const ASTRAEA_DIALOGUE_TREE: CharacterDialogueTreeDef = {
    characterId: CompanionId.Astraea,
    rootNodeIds: [
        "astraea_intro_first_meeting",   // for first talk
        "astraea_joined_greeting",       // for post-joining conversations
    ],
};