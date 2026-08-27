// ============================================================================
// COMPANION SCHEDULES SEED DATA — DYNAMIC HOME
// ============================================================================
// Morning and afternoon are fixed routine locations.
// Evening uses the special token "HOME".
//
// At runtime:
// - If companion is `acquired && !movedIn`, "HOME" resolves to her
//   `CompanionDef.homeLocationId`.
// - If companion is `movedIn`, "HOME" resolves to her assigned suite
//   within Ardor Manor (or `vv_ardor_manor` if no suite assigned).
//
// Night and Midnight are omitted — not interactable outside home.

import type { CompanionScheduleDef } from "../schemas/schemas";
import { CompanionId, DayPhase } from "../schemas/schemas";

export const COMPANION_SCHEDULES: CompanionScheduleDef[] = [
    {
        companionId: CompanionId.Mira,
        scheduleByPhase: {
            [DayPhase.Morning]: "vv_herbalist_shop",
            [DayPhase.Afternoon]: "vv_shrine",
            [DayPhase.Evening]: "HOME",
        },
    },
    {
        companionId: CompanionId.Isolde,
        scheduleByPhase: {
            [DayPhase.Morning]: "ae_aethermoor_city",
            [DayPhase.Afternoon]: "ae_market_square",
            [DayPhase.Evening]: "HOME",
        },
    },
    {
        companionId: CompanionId.Grael,
        scheduleByPhase: {
            [DayPhase.Morning]: "cm_grael_smithy",
            [DayPhase.Afternoon]: "cm_tavern",
            [DayPhase.Evening]: "HOME",
        },
    },
    {
        companionId: CompanionId.Valka,
        scheduleByPhase: {
            [DayPhase.Morning]: "cm_valka_den",
            [DayPhase.Afternoon]: "cm_wyrm_peak",
            [DayPhase.Evening]: "HOME",
        },
    },
    {
        companionId: CompanionId.Seira,
        scheduleByPhase: {
            [DayPhase.Morning]: "ww_seira_den",
            [DayPhase.Afternoon]: "ww_forest",
            [DayPhase.Evening]: "HOME",
        },
    },
    {
        companionId: CompanionId.Sylvara,
        scheduleByPhase: {
            [DayPhase.Morning]: "ww_sylvara_grove",
            [DayPhase.Afternoon]: "ww_shrine",
            [DayPhase.Evening]: "HOME",
        },
    },
    {
        companionId: CompanionId.Reva,
        scheduleByPhase: {
            [DayPhase.Morning]: "ac_reva_suite",
            [DayPhase.Afternoon]: "ac_market_square",
            [DayPhase.Evening]: "HOME",
        },
    },
    {
        companionId: CompanionId.Tasha,
        scheduleByPhase: {
            [DayPhase.Morning]: "vv_tasha_hearth",
            [DayPhase.Afternoon]: "vv_market_square",
            [DayPhase.Evening]: "HOME",
        },
    },
    {
        companionId: CompanionId.Sera,
        scheduleByPhase: {
            [DayPhase.Morning]: "mm_sera_quarters",
            [DayPhase.Afternoon]: "mm_shrine",
            [DayPhase.Evening]: "HOME",
        },
    },
    {
        companionId: CompanionId.Lyra,
        scheduleByPhase: {
            [DayPhase.Morning]: "ct_lyra_sanctum",
            [DayPhase.Afternoon]: "ct_shrine",
            [DayPhase.Evening]: "HOME",
        },
    },
];