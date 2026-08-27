// ============================================================================
// POSITIONS SEED DATA
// ============================================================================
import type { PositionDef } from "../schemas/schemas";
import { IntimateActionCategory } from "../schemas/schemas";

export const POSITIONS: PositionDef[] = [
    // -------------------------------------------------------------------------
    // STANDARD POSITIONS
    // -------------------------------------------------------------------------
    {
        id: "missionary",
        name: "Missionary",
        description: "Face-to-face with the receiving partner lying on their back, legs spread or raised.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.Fingering,
            IntimateActionCategory.Breast,
            IntimateActionCategory.SkinTouch,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
    },
    {
        id: "cowgirl",
        name: "Cowgirl",
        description: "The receiving partner straddles and rides the giving partner, controlling depth and pace.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.Breast,
            IntimateActionCategory.SkinTouch,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
    },
    {
        id: "reverse_cowgirl",
        name: "Reverse Cowgirl",
        description: "Like cowgirl, but the receiving partner faces away, offering a different angle and view.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.SkinTouch,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
    },
    {
        id: "doggy_style",
        name: "Doggy Style",
        description: "The receiving partner is on all fours while the giving partner kneels or stands behind.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.HardcoreDominance,
            IntimateActionCategory.HardcoreImpact,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
    },
    {
        id: "prone_bone",
        name: "Prone Bone",
        description: "The receiving partner lies flat on their stomach while the giving partner lies or kneels on top.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.SkinTouch,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
    },
    {
        id: "spooning",
        name: "Spooning",
        description: "Both partners lie on their sides, with the giving partner entering from behind in a close embrace.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.SkinTouch,
            IntimateActionCategory.Climax,
        ],
    },
    {
        id: "lotus",
        name: "Lotus",
        description: "The giving partner sits cross-legged while the receiving partner sits on their lap, legs wrapped around.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.SkinTouch,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 20,
    },
    {
        id: "standing_leg_raised",
        name: "Standing Leg Raised",
        description: "Both partners stand; the receiving partner raises one leg, allowing entry at a sharp angle.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 30,
        requiresLoveAtLeast: 20,
        isTechniqueSensitive: true,
    },
    {
        id: "standing_doggy",
        name: "Standing Doggy",
        description: "Both partners stand, with the receiving partner bent forward and the giving partner entering from behind.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
        requiresTrustAtLeast: 20,
    },
    {
        id: "against_wall",
        name: "Against the Wall",
        description: "The receiving partner is pressed against a wall, legs wrapped around the giving partner or one raised.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 25,
    },
    {
        id: "full_nelson",
        name: "Full Nelson",
        description: "The receiving partner lies face-down while the giving partner holds their legs up and behind their head, enabling very deep penetration.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreDominance,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 60,
        requiresLoveAtLeast: 40,
        isTechniqueSensitive: true,
    },
    {
        id: "leapfrog",
        name: "Leapfrog",
        description: "The receiving partner kneels and leans forward, hips raised high, while the giving partner enters from behind.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
        requiresTrustAtLeast: 25,
        isTechniqueSensitive: true,
    },
    {
        id: "butterfly",
        name: "Butterfly",
        description: "The receiving partner lies on their back with hips raised high, legs folded back toward their shoulders.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 55,
        requiresLoveAtLeast: 35,
        isTechniqueSensitive: true,
    },
    {
        id: "piledriver",
        name: "Piledriver",
        description: "The receiving partner is inverted, hips above their head, while the giving partner penetrates downward.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreDominance,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 80,
        requiresLoveAtLeast: 60,
        isTechniqueSensitive: true,
    },
    {
        id: "wheelbarrow",
        name: "Wheelbarrow",
        description: "The giving partner holds the receiving partner by the legs while the latter supports themselves on their hands, entering from behind.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 70,
        requiresLoveAtLeast: 40,
        requiresPlayerStat: { str: 15 },
        isTechniqueSensitive: true,
    },
    {
        id: "crab",
        name: "Crab",
        description: "The receiving partner lies on their back and raises their hips, supporting their weight on shoulders and feet while the giving partner kneels between their legs.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 35,
    },
    {
        id: "side_saddle",
        name: "Side Saddle",
        description: "The receiving partner lies on their side while the giving partner straddles one leg and enters from the side.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.SkinTouch,
            IntimateActionCategory.Climax,
        ],
    },
    {
        id: "yab_yum",
        name: "Yab Yum",
        description: "A seated embrace where both partners face each other, legs wrapped, allowing deep eye contact and slow, intimate movement.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.SkinTouch,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 40,
        requiresLoveAtLeast: 30,
    },
    {
        id: "standing_carry",
        name: "Standing Carry",
        description: "The giving partner holds the receiving partner completely off the ground while penetrating.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeVaginal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 60,
        requiresLoveAtLeast: 40,
        requiresPlayerStat: { str: 18 },
        isTechniqueSensitive: true,
    },
    {
        id: "head_off_bed",
        name: "Head Off Bed",
        description: "The receiving partner lies on their back with their head hanging off the bed, allowing the giving partner to stand and use their mouth.",
        allowedActionCategories: [
            IntimateActionCategory.OralMaleFocused,
            IntimateActionCategory.OralFemaleFocused,
            IntimateActionCategory.Climax,
        ],
        requiresTrustAtLeast: 25,
    },

    // -------------------------------------------------------------------------
    // ORAL POSITIONS
    // -------------------------------------------------------------------------
    {
        id: "sixty_nine",
        name: "Sixty-Nine",
        description: "Both partners lie on top of each other in opposite directions, simultaneously performing oral sex on each other.",
        allowedActionCategories: [
            IntimateActionCategory.OralMaleFocused,
            IntimateActionCategory.OralFemaleFocused,
            IntimateActionCategory.Climax,
        ],
    },
    {
        id: "kneeling_oral",
        name: "Kneeling Oral",
        description: "The giving partner kneels before the receiving partner to perform oral sex.",
        allowedActionCategories: [
            IntimateActionCategory.OralMaleFocused,
            IntimateActionCategory.OralFemaleFocused,
            IntimateActionCategory.Climax,
        ],
    },
    {
        id: "standing_oral",
        name: "Standing Oral",
        description: "The receiving partner stands while the giving partner kneels or bends to perform oral sex.",
        allowedActionCategories: [
            IntimateActionCategory.OralMaleFocused,
            IntimateActionCategory.OralFemaleFocused,
            IntimateActionCategory.Climax,
        ],
    },

    // -------------------------------------------------------------------------
    // NON-PENETRATIVE / SPECIALIZED
    // -------------------------------------------------------------------------
    {
        id: "breast_fuck",
        name: "Breast Fuck",
        description: "The giving partner slides their penis between the receiving partner's breasts, often using lubricant or saliva.",
        allowedActionCategories: [
            IntimateActionCategory.Breast,
            IntimateActionCategory.Cum,
            IntimateActionCategory.Climax,
        ],
    },

    // -------------------------------------------------------------------------
    // ANAL VARIANTS
    // -------------------------------------------------------------------------
    {
        id: "missionary_anal",
        name: "Missionary Anal",
        description: "Face-to-face anal penetration with the receiving partner on their back.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
        requiresTrustAtLeast: 40,
        requiresLoveAtLeast: 25,
    },
    {
        id: "cowgirl_anal",
        name: "Cowgirl Anal",
        description: "The receiving partner rides the giving partner anally, facing them.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
        requiresTrustAtLeast: 40,
        requiresLoveAtLeast: 25,
    },
    {
        id: "reverse_cowgirl_anal",
        name: "Reverse Cowgirl Anal",
        description: "The receiving partner rides anally while facing away.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
        requiresTrustAtLeast: 45,
        requiresLoveAtLeast: 30,
    },
    {
        id: "doggy_anal",
        name: "Doggy Anal",
        description: "Anal penetration from behind with the receiving partner on all fours.",
        allowedActionCategories: [
            IntimateActionCategory.PenetrativeAnal,
            IntimateActionCategory.HardcoreRoughness,
            IntimateActionCategory.HardcoreDominance,
            IntimateActionCategory.Climax,
            IntimateActionCategory.Cum,
        ],
        requiresTrustAtLeast: 50,
        requiresLoveAtLeast: 30,
    },
];