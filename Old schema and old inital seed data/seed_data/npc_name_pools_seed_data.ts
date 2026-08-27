// ============================================================================
// NPC NAME POOLS SEED DATA
// ============================================================================
// Gendered name lists used when a generic WorldNpcInstance is individuated
// (first Talk). Names are assigned based on the NPC's rolled gender.

import { GenderId } from "../schemas/schemas";

// ---------------------------------------------------------------------------
// MALE NAMES (150)
// ---------------------------------------------------------------------------
export const MALE_NPC_NAMES: string[] = [
    "Aldric", "Bastian", "Cedric", "Dain", "Eldrin",
    "Fenn", "Garrick", "Harlan", "Ivan", "Jorik",
    "Kael", "Loris", "Marek", "Nolan", "Oren",
    "Percival", "Quill", "Rowan", "Silas", "Toren",
    "Ulric", "Vance", "Weylin", "Xander", "Yorick",
    "Zane", "Alistair", "Bram", "Corvin", "Darian",
    "Emric", "Falk", "Gideon", "Halden", "Ignis",
    "Jasper", "Kestrel", "Luther", "Milo", "Nestor",
    "Oswin", "Pike", "Quentin", "Rafe", "Soren",
    "Talon", "Uriel", "Viktor", "Willem", "Ezra",
    "Arlen", "Belen", "Caedmon", "Drystan", "Elric",
    "Finnian", "Galen", "Hadrian", "Idris", "Jorah",
    "Kaelan", "Leif", "Madoc", "Nevan", "Orin",
    "Phelan", "Quinlan", "Rhys", "Stellan", "Tavian",
    "Ulf", "Varian", "Wystan", "Xavion", "Yves",
    "Zephyr", "Anselm", "Balthasar", "Casimir", "Draven",
    "Evander", "Florian", "Gavriel", "Horatio", "Isidore",
    "Jericho", "Korbin", "Lucian", "Mordecai", "Nicodemus",
    "Osric", "Phineas", "Roderick", "Severin", "Thaddeus",
    "Ulrick", "Valerius", "Wendell", "Xanthus", "Yarrow",
    "Zorion", "Aldous", "Beckett", "Caradoc", "Demetrius",
    "Emrys", "Fenris", "Gethin", "Hywel", "Ignatius",
    "Jolyon", "Kestrel", "Llewellyn", "Malachai", "Nikolai",
    "Orpheus", "Peregrine", "Quintus", "Rafferty", "Simeon",
    "Teague", "Ulfred", "Valen", "Wymond", "Xylon",
    "Yorath", "Zaccai", "Algernon", "Barnabas", "Cyprian",
    "Dorian", "Endymion", "Faustus", "Gideon", "Havelock",
    "Isambard", "Jethro", "Kenrick", "Lazarus", "Maximilian",
    "Norbert", "Octavius", "Peregrin", "Quade", "Rufus",
    "Sylvan", "Theon", "Uzziah", "Vaughn", "Wystan"
];

// ---------------------------------------------------------------------------
// FEMALE NAMES (250)
// ---------------------------------------------------------------------------
export const FEMALE_NPC_NAMES: string[] = [
    "Anya", "Brielle", "Cecily", "Dahlia", "Elspeth",
    "Fiora", "Gwendolyn", "Hazel", "Ivy", "Juniper",
    "Kira", "Liora", "Maeve", "Nessa", "Opal",
    "Petra", "Quinn", "Rowena", "Sable", "Tamsin",
    "Una", "Vesper", "Willa", "Xenia", "Yvette",
    "Zara", "Amara", "Brenna", "Calla", "Della",
    "Elinor", "Freya", "Greta", "Hilda", "Ilse",
    "Jocelyn", "Katrin", "Lena", "Maren", "Nadia",
    "Odette", "Pippa", "Rhea", "Saskia", "Talia",
    "Ursula", "Vera", "Wren", "Yrsa", "Zelda",
    "Adela", "Briony", "Celeste", "Delphine", "Eudora",
    "Fenella", "Giselle", "Honora", "Imogen", "Jessamine",
    "Kerensa", "Lavinia", "Mirabel", "Nerissa", "Ondine",
    "Phaedra", "Quintessa", "Rosalind", "Selene", "Theodora",
    "Undine", "Valeria", "Winifred", "Xanthe", "Ysolde",
    "Zinnia", "Amaryllis", "Beatrix", "Coraline", "Drusilla",
    "Elodie", "Fiammetta", "Gloriana", "Heloise", "Isolde",
    "Jacinthe", "Katerina", "Lucretia", "Marguerite", "Nephele",
    "Odelia", "Persephone", "Quirina", "Raphaella", "Seraphina",
    "Tatiana", "Ulalia", "Verity", "Wilhelmina", "Xaviera",
    "Yvaine", "Zephyrine", "Althea", "Belinda", "Cassiopeia",
    "Desdemona", "Eglantine", "Flavia", "Ginevra", "Hermione",
    "Iphigenia", "Jacinta", "Kalliope", "Leocadia", "Melisande",
    "Noemi", "Octavia", "Philomena", "Quintina", "Rosamund",
    "Sophronia", "Theophania", "Ursulina", "Violetta", "Walburga",
    "Xylia", "Yolanda", "Zenaida", "Amabel", "Belladonna",
    "Cleopatra", "Dorothea", "Euphemia", "Faustina", "Genoveva",
    "Hepzibah", "Isabeau", "Jovita", "Keturah", "Leontyne",
    "Melusine", "Normina", "Olympia", "Polyxena", "Quiterie",
    "Radegund", "Sigourney", "Thomasina", "Urania", "Valerian",
    "Wisteria", "Xochitl", "Yseult", "Zelie", "Acacia",
    "Berenice", "Calliope", "Delilah", "Eulalia", "Fidelia",
    "Gratiana", "Hesperia", "Idony", "Jessalyn", "Kerensa",
    "Leona", "Magnolia", "Nereida", "Odile", "Parthenope",
    "Quinta", "Rosabelle", "Sephora", "Theresia", "Undina",
    "Verena", "Wandalena", "Xylona", "Yvette", "Zerlina",
    "Amethyst", "Bluebell", "Camellia", "Daphne", "Elara",
    "Freesia", "Gardenia", "Hyacinth", "Iris", "Jessamine",
    "Kalmia", "Lilac", "Marigold", "Neroli", "Orchid",
    "Peony", "Quilla", "Rosalba", "Saffron", "Tansy",
    "Tempest", "Aurora", "Calypso", "Elowen", "Fable",
    "Glacielle", "Harvest", "Isolabella", "Junia", "Keziah",
    "Lunaria", "Maris", "Nixie", "Ophira", "Perdita",
    "Quella", "Rhoswen", "Selkie", "Tindra", "Ulyssa",
    "Valkyrie", "Waverly", "Xylara", "Ysella", "Zephyra",
    "Amaranth", "Bronwyn", "Celestia", "Damaris", "Ember",
    "Fae", "Galene", "Haven", "Isla", "Josette",
    "Kelda", "Lior", "Mavis", "Nuala", "Oria",
    "Petal", "Querida", "Ravenna", "Sela", "Thistle",
    "Ula", "Vespera", "Wynn", "Xylina", "Yara"
];

// ---------------------------------------------------------------------------
// COMBINED POOLS (typed by gender)
// ---------------------------------------------------------------------------
export const NPC_NAME_POOLS: Record<GenderId, string[]> = {
    [GenderId.Male]: MALE_NPC_NAMES,
    [GenderId.Female]: FEMALE_NPC_NAMES,
    [GenderId.Varies]: [], // never used for actual individuals
};