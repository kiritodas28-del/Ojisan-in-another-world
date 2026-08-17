// ============================================================================
// OJISAN IN ANOTHER WORLD — PLAYER CHARACTER SEED DATA
// Kenji's static definitional data — the counterpart PlayerCharacterState
// (runtime save state) never had. Appearance matches the GDD's own framing
// tagline verbatim: "A middle-aged man with nothing left to lose" — the
// whole premise hinges on Kenji being conspicuously ordinary, not a chosen
// one who happens to also be handsome. That ordinariness is written into
// the appearance data directly rather than softened.
// ============================================================================

import { PlayerCharacterDef, GenderId } from "./schemas";

export const KENJI: PlayerCharacterDef = {
  name: "Kenji Mori",
  appearance: {
    heightCm: 172,
    build: "average, softened by years of desk work but reshaping gradually under the physical demands of Eranthis — not an adventurer's body yet, but no longer entirely a salaryman's either",
    gender: GenderId.Male,
    hairColor: "black, with early gray threading through at the temples",
    hairStyle: "short and side-parted, unchanged out of habit since his old life, kept practical rather than styled",
    eyeColor: "dark brown",
    skinTone: "light olive, increasingly sun-weathered after months traveling Eranthis's open roads",
    skinType: "ordinary human skin, softening calluses reforming on his palms from manual labor",
    distinguishingFeatures: [
      "faint crow's-feet at the corners of his eyes from a lifetime of tired smiles",
      "the Crest of Ardor — a faint golden sigil, invisible under normal light, that surfaces on his chest during intimate or high-Miasma moments",
    ],
    scarsAndTattoos: ["a healed scar along his left forearm from an early skirmish in the Verdant Vale"],
    apparentAge: 46,
    trueAge: 46, // human, no divergence — included for consistency with the companions' profiles
    bodyDetails: {
      hasBreasts: false,
      waistCm: 84, hipCm: 92, assSize: "average", assShape: "flat, unremarkable", assSoftness: "firm",
      hasPenis: true, penisLengthCm: 14, penisGirthCm: 11, semenVolume: "average — nothing about Kenji is exceptional, deliberately, per the game's own premise",
    },
    portraitAssetId: "portrait_kenji_mori",
    aestheticSummary: "An unremarkable middle-aged man by any world's standards — which is precisely why Astraea chose him. What he lacks in youth or striking looks, he makes up for in a steadiness people trust almost on sight, without quite being able to say why.",
  },
};
