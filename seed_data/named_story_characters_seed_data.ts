// ============================================================================
// NAMED STORY CHARACTERS SEED DATA
// ============================================================================
// Non-companion story characters with authored dialogue trees.
// These have CharacterDialogueTreeDef entries (e.g. dialogue_astraea_seed_data.ts)
// but deliberately no CompanionDef — no combat role, move-in eligibility, or
// default equipment, because they are not recruitable party members.

import type {
    AppearanceDef,
    NamedStoryCharacterDef,
} from "../schemas/schemas";
import {
    BodyShape,
    GenderId,
    Race,
} from "../schemas/schemas";

// ---------------------------------------------------------------------------
// ASTRAEA — Goddess (Erotic Bombshell, maxed)
// ---------------------------------------------------------------------------
const ASTRAEA_APPEARANCE: AppearanceDef = {
    heightCm: 180,
    heightTag: "Very Tall",
    build: "statuesque and impossibly voluptuous — a top-heavy hourglass that radiates overwhelming erotic power",
    musclePresence: "Faint suggestion",
    gender: GenderId.Female,
    bodyShape: BodyShape.TopHourglass,
    bodyCategory: "Erotic Bombshell",   // maxed — the pinnacle of the category
    hairColor: "White",
    hairStyle: "Classic Long",
    eyeColor: "Radiant gold",
    skinTone: "Very pale",
    skinType: "luminous, almost glowing",
    distinguishingFeatures: [
        "a faint, divine halo-like glow around her",
        "eyes that seem to hold distant stars",
        "breasts so full they defy mortal proportion",
    ],
    scarsAndTattoos: [],
    apparentAge: 28,
    trueAge: 5000,
    bodyDetails: {
        hasBreasts: true,
        breastSize: "Massive",
        breastSizeCup: "H",
        breastShape: "Round",
        breastFirmness: "Firm",
        nippleType: "Protruding",
        nippleSize: "Large",
        pubicHairStyle: "Bare",
        underarmHairStyle: "Bare",
        waistCm: 58,
        hipCm: 100,
        assSize: "Full rounded",
        assType: "Curvy / Defined",
        assFirmness: "Firm",
        hasPenis: false,
    },
    portraitAssetId: "portrait_astraea_divine",
    aestheticSummary:
        "A goddess whose body seems sculpted to overwhelm mortal desire. Her bust is titanic, her waist impossibly slender, her hips flaring with hypnotic promise. She is the living embodiment of Erotic Bombshell — a figure that stops breath and thought alike.",
};

export const ASTRAEA: NamedStoryCharacterDef = {
    id: "astraea",
    displayName: "Astraea",
    race: Race.Goddess,
    appearance: ASTRAEA_APPEARANCE,
};

// ---------------------------------------------------------------------------
// EXPORT LIST
// ---------------------------------------------------------------------------
export const NAMED_STORY_CHARACTERS: NamedStoryCharacterDef[] = [
    ASTRAEA,
];