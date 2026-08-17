// ============================================================================
// OJISAN IN ANOTHER WORLD — POSITION SEED DATA
// Full PositionDef matrix, closing that line of the §2.2 backlog table.
//
// Three entries preserve exact values already given as worked examples in
// schemas.ts's own comments, rather than re-deciding them: Seated Deepthroat
// (requiresTrustAtLeast: 50), Standing/Wall (requiresPlayerStat: { str: 14 }),
// and Tri-Tail Blowjob (exclusiveToCompanionId: Tasha — her Kitsune tri-tail
// is exactly why this one is hers alone).
// ============================================================================

import { PositionDef, CompanionId } from "./schemas";

export const POSITIONS: PositionDef[] = [
  {
    id: "pos_missionary",
    name: "Missionary",
    playerStaminaCostMultiplier: 0.9,
    playerArousalRatePerTurn: 8,
    partnerArousalRatePerTurn: 9,
    loveGainMultiplier: 1.3, // face-to-face, highest Love gain of the base set
    isTechniqueSensitive: false,
  },
  {
    id: "pos_mating_press",
    name: "Mating Press",
    playerStaminaCostMultiplier: 1.4,
    playerArousalRatePerTurn: 10,
    partnerArousalRatePerTurn: 12,
    loveGainMultiplier: 1.0,
    requiresPlayerStat: { str: 12 },
    isTechniqueSensitive: false,
  },
  {
    id: "pos_doggy_style",
    name: "Doggy Style",
    playerStaminaCostMultiplier: 1.1,
    playerArousalRatePerTurn: 9,
    partnerArousalRatePerTurn: 11,
    loveGainMultiplier: 0.8, // less face-to-face
    isTechniqueSensitive: false,
  },
  {
    id: "pos_standing_wall",
    name: "Standing/Wall",
    playerStaminaCostMultiplier: 1.6,
    playerArousalRatePerTurn: 10,
    partnerArousalRatePerTurn: 10,
    loveGainMultiplier: 0.9,
    requiresPlayerStat: { str: 14 }, // exact value already given as a schema comment example
    isTechniqueSensitive: false,
  },
  {
    id: "pos_side_spoon",
    name: "Side Spoon",
    playerStaminaCostMultiplier: 0.6,
    playerArousalRatePerTurn: 5,
    partnerArousalRatePerTurn: 6,
    loveGainMultiplier: 1.4, // slow, unhurried — highest Love gain in the set
    isTechniqueSensitive: false,
  },
  {
    id: "pos_lotus_lap",
    name: "Lotus/Lap",
    playerStaminaCostMultiplier: 0.8,
    playerArousalRatePerTurn: 7,
    partnerArousalRatePerTurn: 8,
    loveGainMultiplier: 1.3,
    isTechniqueSensitive: false,
  },
  {
    id: "pos_cowgirl",
    name: "Cowgirl",
    playerStaminaCostMultiplier: 0.7, // partner does most of the physical work
    playerArousalRatePerTurn: 9,
    partnerArousalRatePerTurn: 8,
    loveGainMultiplier: 1.1,
    isTechniqueSensitive: false,
  },
  {
    id: "pos_reverse_cowgirl",
    name: "Reverse Cowgirl",
    playerStaminaCostMultiplier: 0.7,
    playerArousalRatePerTurn: 9,
    partnerArousalRatePerTurn: 9,
    loveGainMultiplier: 0.7, // no eye contact
    isTechniqueSensitive: false,
  },
  {
    id: "pos_prone_bone",
    name: "Prone Bone",
    playerStaminaCostMultiplier: 1.2,
    playerArousalRatePerTurn: 10,
    partnerArousalRatePerTurn: 11,
    loveGainMultiplier: 0.8,
    isTechniqueSensitive: false,
  },
  {
    id: "pos_standing_doggy",
    name: "Standing Doggy",
    playerStaminaCostMultiplier: 1.5,
    playerArousalRatePerTurn: 10,
    partnerArousalRatePerTurn: 11,
    loveGainMultiplier: 0.7,
    requiresPlayerStat: { str: 10 },
    isTechniqueSensitive: false,
  },
  {
    id: "pos_face_sitting",
    name: "Face-Sitting",
    playerStaminaCostMultiplier: 0.5,
    playerArousalRatePerTurn: 4,
    partnerArousalRatePerTurn: 13, // overwhelmingly partner-focused
    loveGainMultiplier: 1.0,
    isTechniqueSensitive: true,
  },
  {
    id: "pos_seated_deepthroat",
    name: "Seated Deepthroat",
    playerStaminaCostMultiplier: 0.6,
    playerArousalRatePerTurn: 14,
    partnerArousalRatePerTurn: 3,
    loveGainMultiplier: 0.9,
    requiresTrustAtLeast: 50, // exact value already given as a schema comment example
    isTechniqueSensitive: true,
  },
  {
    id: "pos_lying_throatfuck",
    name: "Lying Throatfuck",
    playerStaminaCostMultiplier: 0.8,
    playerArousalRatePerTurn: 15,
    partnerArousalRatePerTurn: 2,
    loveGainMultiplier: 0.7,
    requiresTrustAtLeast: 60,
    isTechniqueSensitive: true,
  },
  {
    id: "pos_mutual_69",
    name: "Mutual Oral (69)",
    playerStaminaCostMultiplier: 0.7,
    playerArousalRatePerTurn: 10,
    partnerArousalRatePerTurn: 10,
    loveGainMultiplier: 1.0,
    isTechniqueSensitive: true,
  },
  {
    id: "pos_tri_tail_blowjob",
    name: "Tri-Tail Blowjob",
    playerStaminaCostMultiplier: 0.4,
    playerArousalRatePerTurn: 16,
    partnerArousalRatePerTurn: 4,
    loveGainMultiplier: 1.2,
    exclusiveToCompanionId: CompanionId.Tasha, // her Kitsune tri-tail is exactly why this is hers alone
    isTechniqueSensitive: true,
  },
  {
    id: "pos_empathic_embrace",
    name: "Empathic Embrace",
    playerStaminaCostMultiplier: 0.5,
    playerArousalRatePerTurn: 6,
    partnerArousalRatePerTurn: 7,
    loveGainMultiplier: 1.5, // highest Love gain of the whole matrix
    requiresTrustAtLeast: 80,
    exclusiveToCompanionId: CompanionId.Lyra, // matches her empathic-resonance thematic tie (§26.1's Deep Trust Vulnerability kink)
    isTechniqueSensitive: false,
  },
];
