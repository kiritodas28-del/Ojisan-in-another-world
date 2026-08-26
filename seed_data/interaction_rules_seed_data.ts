// ============================================================================
// INTERACTION RULES SEED DATA
// ============================================================================
// Centralized eligibility, immediate effects, dispatch targets, and
// balancing tables for all NPC interactions.
// ============================================================================

import {
    ContentToggle,
    DayPhase,
    InteractionAction,
    NpcLegalClass,
    ServiceType,
} from "../schemas/schemas";

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export type InteractionActorType =
    | "COMPANION"
    | "WORLD_NPC"
    | "CHILD_NPC"
    | "SERVICE_NPC";

export type InteractionEffectTarget = "PLAYER" | "TARGET";

export type InteractionEffect =
    | { target: InteractionEffectTarget; type: "TRUST_DELTA"; amount: number }
    | { target: InteractionEffectTarget; type: "LOVE_DELTA"; amount: number }
    | { target: InteractionEffectTarget; type: "AROUSAL_DELTA"; amount: number }
    | { target: InteractionEffectTarget; type: "STAMINA_DELTA"; amount: number }
    | { target: InteractionEffectTarget; type: "HP_DELTA"; amount: number }
    | { target: "PLAYER"; type: "ITEM_REMOVE"; itemId: string; quantity: number }
    | { target: "TARGET"; type: "SET_HAS_BEEN_INTRODUCED" }
    | {
        target: InteractionEffectTarget;
        type: "DAILY_COUNTER_DECREMENT";
        counter: "flirt" | "touch";
    }
    | { target: InteractionEffectTarget; type: "APPLY_FLIRT_DELTAS" }
    | { target: InteractionEffectTarget; type: "APPLY_TOUCH_DELTAS" };

export interface InteractionRule {
    action: InteractionAction;
    allowedActorTypes: InteractionActorType[];
    allowedLegalClasses: NpcLegalClass[];
    requiresPresence: boolean;
    requiresNonConsensualToggle?: boolean;
    requiresSleeping?: boolean;
    availableDayPhases?: DayPhase[];
    dispatchEngine?: string;
    immediateEffects: InteractionEffect[];
    rejectMessage?: string;
}

// ---------------------------------------------------------------------------
// BALANCE CONSTANTS
// ---------------------------------------------------------------------------

export const GIFT_BONUS = {
    trust: 10,
    love: 15,
} as const;

export const TALK_TRUST_DELTA = 1;

export const GENERIC_NPC_MOVE_IN_REQUIREMENTS = {
    trustAtLeast: 60,
    loveAtLeast: 60,
} as const;

export const FLIRT_DELTAS = [
    { trust: 4, love: 2 },
    { trust: 2, love: 1 },
    { trust: 1, love: 0 },
    { trust: 0, love: 0 },
] as const;

export const TOUCH_DELTAS = [
    { trust: 2, love: 4 },
    { trust: 1, love: 2 },
    { trust: 0, love: 1 },
    { trust: 0, love: 0 },
] as const;

// ---------------------------------------------------------------------------
// SERVICE TYPE HANDLERS
// ---------------------------------------------------------------------------

export const SERVICE_TYPE_HANDLERS: Record<ServiceType, string> = {
    [ServiceType.ItemVendor]: "ECONOMY_ENGINE",
    [ServiceType.Bank]: "ECONOMY_ENGINE",
    [ServiceType.QuestBoard]: "QUEST_ENGINE",
    [ServiceType.Innkeeper]: "TIME_ENGINE",
    [ServiceType.FastTravel]: "MOVEMENT_ENGINE",
    [ServiceType.BountyOffice]: "REPUTATION_ENGINE",
};

// ---------------------------------------------------------------------------
// INTERACTION RULES
// ---------------------------------------------------------------------------

export const INTERACTION_RULES: InteractionRule[] = [
    // -------------------------------------------------------------------------
    // TALK
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Talk,
        allowedActorTypes: ["COMPANION", "WORLD_NPC", "CHILD_NPC", "SERVICE_NPC"],
        allowedLegalClasses: [
            NpcLegalClass.Innocent,
            NpcLegalClass.Outlaw,
            NpcLegalClass.Protected,
        ],
        requiresPresence: true,
        dispatchEngine: "DIALOGUE_ENGINE",
        immediateEffects: [
            { target: "TARGET", type: "SET_HAS_BEEN_INTRODUCED" },
            { target: "TARGET", type: "TRUST_DELTA", amount: TALK_TRUST_DELTA },
        ],
    },

    // -------------------------------------------------------------------------
    // GIFT
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Gift,
        allowedActorTypes: ["COMPANION", "WORLD_NPC"],
        allowedLegalClasses: [
            NpcLegalClass.Innocent,
            NpcLegalClass.Outlaw,
            NpcLegalClass.Protected,
        ],
        requiresPresence: true,
        dispatchEngine: "RELATIONSHIP_ENGINE",
        immediateEffects: [
            { target: "PLAYER", type: "ITEM_REMOVE", itemId: "DYNAMIC_ITEM_ID", quantity: 1 },
            { target: "TARGET", type: "TRUST_DELTA", amount: GIFT_BONUS.trust },
            { target: "TARGET", type: "LOVE_DELTA", amount: GIFT_BONUS.love },
        ],
    },

    // -------------------------------------------------------------------------
    // TRADE
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Trade,
        allowedActorTypes: ["COMPANION", "WORLD_NPC"],
        allowedLegalClasses: [
            NpcLegalClass.Innocent,
            NpcLegalClass.Outlaw,
            NpcLegalClass.Protected,
        ],
        requiresPresence: true,
        dispatchEngine: "ECONOMY_ENGINE",
        immediateEffects: [],
    },

    // -------------------------------------------------------------------------
    // INSPECT
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Inspect,
        allowedActorTypes: ["COMPANION", "WORLD_NPC", "CHILD_NPC", "SERVICE_NPC"],
        allowedLegalClasses: [
            NpcLegalClass.Innocent,
            NpcLegalClass.Outlaw,
            NpcLegalClass.Protected,
        ],
        requiresPresence: true,
        dispatchEngine: "CONTACT_READ_ENGINE",
        immediateEffects: [],
    },

    // -------------------------------------------------------------------------
    // INVENTORY
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Inventory,
        allowedActorTypes: ["COMPANION"],
        allowedLegalClasses: [
            NpcLegalClass.Innocent,
            NpcLegalClass.Outlaw,
            NpcLegalClass.Protected,
        ],
        requiresPresence: true,
        dispatchEngine: "ECONOMY_ENGINE",
        immediateEffects: [],
    },

    // -------------------------------------------------------------------------
    // FLIRT
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Flirt,
        allowedActorTypes: ["COMPANION", "WORLD_NPC"],
        allowedLegalClasses: [NpcLegalClass.Innocent, NpcLegalClass.Outlaw],
        requiresPresence: true,
        dispatchEngine: "RELATIONSHIP_ENGINE",
        immediateEffects: [
            {
                target: "TARGET",
                type: "DAILY_COUNTER_DECREMENT",
                counter: "flirt",
            },
            { target: "TARGET", type: "APPLY_FLIRT_DELTAS" },
        ],
        rejectMessage: "This person is no longer receptive to flirting today.",
    },

    // -------------------------------------------------------------------------
    // TOUCH
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Touch,
        allowedActorTypes: ["COMPANION", "WORLD_NPC"],
        allowedLegalClasses: [NpcLegalClass.Innocent, NpcLegalClass.Outlaw],
        requiresPresence: true,
        dispatchEngine: "RELATIONSHIP_ENGINE",
        immediateEffects: [
            {
                target: "TARGET",
                type: "DAILY_COUNTER_DECREMENT",
                counter: "touch",
            },
            { target: "TARGET", type: "APPLY_TOUCH_DELTAS" },
        ],
        rejectMessage: "This person is no longer receptive to touch today.",
    },

    // -------------------------------------------------------------------------
    // COMMAND
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Command,
        allowedActorTypes: ["COMPANION"],
        allowedLegalClasses: [
            NpcLegalClass.Innocent,
            NpcLegalClass.Outlaw,
            NpcLegalClass.Protected,
        ],
        requiresPresence: true,
        dispatchEngine: "SKILL_ENGINE",
        immediateEffects: [],
    },

    // -------------------------------------------------------------------------
    // MOVE IN
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.MoveIn,
        allowedActorTypes: ["COMPANION", "WORLD_NPC"],
        allowedLegalClasses: [
            NpcLegalClass.Innocent,
            NpcLegalClass.Outlaw,
            NpcLegalClass.Protected,
        ],
        requiresPresence: true,
        dispatchEngine: "MANOR_ENGINE",
        immediateEffects: [],
        rejectMessage: "This person does not want to move in yet.",
    },

    // -------------------------------------------------------------------------
    // BATTLE
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Battle,
        allowedActorTypes: ["WORLD_NPC"],
        allowedLegalClasses: [NpcLegalClass.Outlaw],
        requiresPresence: true,
        dispatchEngine: "COMBAT_ENGINE",
        immediateEffects: [],
        rejectMessage: "This person refuses to fight.",
    },

    // -------------------------------------------------------------------------
    // INTIMATE (CONSENSUAL)
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.Intimate,
        allowedActorTypes: ["COMPANION", "WORLD_NPC"],
        allowedLegalClasses: [NpcLegalClass.Innocent, NpcLegalClass.Outlaw],
        requiresPresence: true,
        dispatchEngine: "INTIMACY_ENGINE",
        immediateEffects: [],
        rejectMessage: "This person is not interested.",
    },

    // -------------------------------------------------------------------------
    // FORCE INTIMACY
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.ForceIntimacy,
        allowedActorTypes: ["WORLD_NPC"],
        allowedLegalClasses: [NpcLegalClass.Outlaw],
        requiresPresence: true,
        requiresNonConsensualToggle: true,
        dispatchEngine: "INTIMACY_ENGINE",
        immediateEffects: [],
        rejectMessage: "You cannot do that to this person.",
    },

    // -------------------------------------------------------------------------
    // FORCE INTIMACY ON SLEEPING
    // -------------------------------------------------------------------------
    {
        action: InteractionAction.ForceIntimacyOnSleeping,
        allowedActorTypes: ["COMPANION", "WORLD_NPC"],
        allowedLegalClasses: [NpcLegalClass.Innocent, NpcLegalClass.Outlaw],
        requiresPresence: true,
        requiresNonConsensualToggle: true,
        requiresSleeping: true,
        availableDayPhases: [DayPhase.Night, DayPhase.Midnight],
        dispatchEngine: "INTIMACY_ENGINE",
        immediateEffects: [],
        rejectMessage: "This person is not asleep or the situation is not right.",
    },
];