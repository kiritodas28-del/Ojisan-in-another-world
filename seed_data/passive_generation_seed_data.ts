// ============================================================================
// COMPANION PASSIVE GENERATION SEED DATA
// ============================================================================
// Per-companion passive generation definitions.
// - productionIntervalGameDays: how often the companion produces something.
// - capacity: maximum accumulated quantity before generation pauses.
// - producedItemId: item id or "GOLD".

import type { PassiveGenerationDef } from "../schemas/schemas";
import { CompanionId } from "../schemas/schemas";

export const COMPANION_PASSIVE_GENERATION: PassiveGenerationDef[] = [
    {
        companionId: CompanionId.Mira,
        producedItemId: "health_potion",
        productionIntervalGameDays: 2,
        capacity: 10,
    },
    {
        companionId: CompanionId.Isolde,
        producedItemId: "mana_potion",
        productionIntervalGameDays: 2,
        capacity: 10,
    },
    {
        companionId: CompanionId.Grael,
        producedItemId: "iron_ore",
        productionIntervalGameDays: 2,
        capacity: 10,
    },
    {
        companionId: CompanionId.Valka,
        producedItemId: "dragon_scale",
        productionIntervalGameDays: 3,
        capacity: 5,
    },
    {
        companionId: CompanionId.Seira,
        producedItemId: "poison_vial",
        productionIntervalGameDays: 2,
        capacity: 10,
    },
    {
        companionId: CompanionId.Sylvara,
        producedItemId: "moon_mint_leaves",
        productionIntervalGameDays: 2,
        capacity: 10,
    },
    {
        companionId: CompanionId.Reva,
        producedItemId: "GOLD",
        productionIntervalGameDays: 2,
        capacity: 10,
    },
    {
        companionId: CompanionId.Tasha,
        producedItemId: "cooked_meal",
        productionIntervalGameDays: 2,
        capacity: 10,
    },
    {
        companionId: CompanionId.Sera,
        producedItemId: "incense",
        productionIntervalGameDays: 2,
        capacity: 10,
    },
    {
        companionId: CompanionId.Lyra,
        producedItemId: "angelic_essence",
        productionIntervalGameDays: 3,
        capacity: 5,
    },
];