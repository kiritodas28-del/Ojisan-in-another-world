// ============================================================================
// OJISAN IN ANOTHER WORLD — ASTRAEA CHARACTER DATA
// Closes a real gap: Astraea has had a full 39-node dialogue tree
// (dialogue_astraea_seed_data.ts) since an earlier pass, but no character or
// appearance data behind it at all — she was the one named character in the
// entire cast (Kenji, the 10 companions, and her) without a data entry to
// match. Uses the new NamedStoryCharacterDef type rather than CompanionDef —
// she has no combatRole, no moveInRequirements, no defaultEquipment, none of
// which make sense for a goddess who isn't a recruitable party member.
//
// Appearance is built directly from what her own dialogue already
// established: "warmth itself given shape" (Vision 1), a form that
// "resolves" from light rather than simply appearing (the Act 6 Descent),
// and — critically — an explicitly physical, touchable body once she
// descends ("This is not a dream. I made certain of that, this time"),
// which is why she gets a full bodyDetails block rather than an abstract,
// bodyless divine presence.
// ============================================================================

import { NamedStoryCharacterDef, Race, GenderId } from "./schemas";

export const ASTRAEA: NamedStoryCharacterDef = {
  id: "astraea",
  displayName: "Astraea",
  race: Race.Goddess,
  appearance: {
    heightCm: 175,
    build: "otherworldly and radiant — a presence that reads as both weightless and fully present at once, never quite still even when she isn't moving",
    gender: GenderId.Female,
    hairColor: "molten gold, closer to captured sunlight than to hair",
    hairStyle: "long, drifting faintly as though caught in a wind that isn't there",
    eyeColor: "luminous gold, brighter at the center like a held flame",
    skinTone: "warm gold, radiating a soft light from within rather than merely catching it",
    skinType: "smooth beyond any mortal texture, faintly warm to the touch like sun-warmed silk",
    distinguishingFeatures: [
      "a constant, soft radiance that visibly brightens with her own emotion — most noticeable in Vision 5 and the Act 6 Descent",
      "no scar, blemish, or asymmetry of any kind — a deliberate, divine smoothness, not merely good genetics",
      "her voice and her light seem to move together, brightening faintly on emphasis the way a mortal's tone would rise",
    ],
    scarsAndTattoos: [], // a goddess; nothing mortal has ever marked her
    trueAge: 50000, // symbolic rather than precise — older than Eranthis's own recorded history; apparentAge
                    // deliberately omitted, same convention as Sylvara's, since neither "young" nor "old"
                    // meaningfully applies to her
    bodyDetails: {
      hasBreasts: true, breastSizeCup: "DD", breastShape: "exceptionally large, breathtakingly full, unconstrained by gravity", breastSoftness: "soft", breastSagginess: "none",
      nippleType: "puffy", nippleSize: "large",
      waistCm: 58, hipCm: 106, assSize: "colossal, the cosmic archetype of fertility", assShape: "deeply curved, massive", assSoftness: "soft, pillowy",
      hasPenis: false,
    },
    portraitAssetId: "portrait_astraea",
    aestheticSummary: "Warmth given shape, exactly as her own first words to Kenji describe her — golden light held just barely within the outline of a woman, radiant enough to strain at direct sight in full brightness, and impossible to look away from the instant she dims to something softer.",
  },
};
