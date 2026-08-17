// ============================================================================
// OJISAN IN ANOTHER WORLD — NPC NAME POOLS
// The auto-naming data source for §19.4's individuation rule: the moment a
// WorldNpcInstance's trustLove first deviates from neutral, she or he is
// individuated — rolled a displayName from the gender-appropriate pool below
// (matching the already-rolled WorldNpcInstance.gender), joining the Contact
// List from that point on. First names only, deliberately — these are
// ordinary procedural townsfolk, not story-critical characters; a full
// surname system would overstate their narrative weight relative to the 10
// hand-authored companions.
//
// 40 names per gender — comfortably larger than the 100-contact cap (§19.4)
// divided across both genders, so exhausting the pool and repeating names
// among simultaneous contacts is unlikely in ordinary play. The spawning
// system should still prefer an unused name over a currently-active
// duplicate where one's available, but a repeat isn't a validation failure
// — nothing stops two real people sharing a first name.
// ============================================================================

export const MALE_NPC_NAMES: string[] = [
  "Aldric", "Bram", "Corin", "Dain", "Edric", "Fenwick", "Garrick", "Hale",
  "Ingram", "Jorah", "Kellan", "Lorne", "Merrick", "Nolan", "Osric", "Perrin",
  "Quill", "Roderic", "Soren", "Tavish", "Ulric", "Varek", "Wynn", "Yorick",
  "Ambrose", "Brendan", "Cassius", "Desmond", "Elric", "Ford", "Gareth", "Holt",
  "Ivo", "Jasper", "Kester", "Lysander", "Marek", "Nash", "Orin", "Pascal",
];

export const FEMALE_NPC_NAMES: string[] = [
  "Adelia", "Brynn", "Celestine", "Dara", "Elowen", "Faye", "Greta", "Hana",
  "Ivy", "Junia", "Kira", "Lissandra", "Maren", "Nadia", "Oriel", "Petra",
  "Quinlyn", "Rosalind", "Selene", "Talia", "Ursa", "Vesper", "Wren", "Yselle",
  "Anneke", "Briar", "Corinne", "Delphine", "Esme", "Fionna", "Galiana", "Halsey",
  "Imogen", "Jocelyn", "Kaelen", "Lira", "Marisol", "Nerissa", "Odalys", "Perenelle",
];
