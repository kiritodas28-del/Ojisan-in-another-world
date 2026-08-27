// ============================================================
// FILE: raceProfiles.ts
// ============================================================

import {
    Race, Gender, WingType, TailType, EarType, HornType,
    CockTextureType, SkinTone, EyeColor, HairColor,
    FemaleBodyType, MaleBodyType,
    RegionOfOrigin
} from "./enums";

export interface RaceFeatures {
    wings: WingType;
    tail: TailType;
    ears: EarType;
    horns: HornType;
    cockTextureOptions: CockTextureType[];   // male only — available textures for this race
    specialFeatures: string[];               // descriptive extras e.g. "forked tongue", "scales on hips"
}

export interface RaceProfile {
    race: Race;
    lifespan: number;                        // in years — 0 = immortal
    apparentAgeRatio: number;                // apparent/actual age ratio at base; e.g. elf at 300 looks 25
    apparentAgeCap: number;                  // maximum apparent age this race reaches
    preferredSkinTones: SkinTone[];
    preferredEyeColors: EyeColor[];
    preferredHairColors: HairColor[];
    features: RaceFeatures;
    femaleBodyTypeBias: Partial<Record<FemaleBodyType, number>>; // weight multipliers on top of pop config
    maleBodyTypeBias: Partial<Record<MaleBodyType, number>>;
    description: string;
    defaultRegions: RegionOfOrigin[];
    minActualAgeAtSpawn: number;
}

export const RACE_PROFILES: Record<Race, RaceProfile> = {

    [Race.Human]: {
        race: Race.Human,
        lifespan: 80,
        apparentAgeRatio: 1.0,
        apparentAgeCap: 80,
        preferredSkinTones: [
            SkinTone.Porcelain, SkinTone.Fair, SkinTone.Light, SkinTone.LightMedium,
            SkinTone.Medium, SkinTone.MediumTan, SkinTone.Tan, SkinTone.Olive,
            SkinTone.Golden, SkinTone.Caramel, SkinTone.Chestnut, SkinTone.Brown,
            SkinTone.DeepBrown, SkinTone.Ebony
        ],
        preferredEyeColors: [
            EyeColor.Brown, EyeColor.DarkBrown, EyeColor.Hazel,
            EyeColor.Green, EyeColor.Blue, EyeColor.Grey, EyeColor.Amber
        ],
        preferredHairColors: [
            HairColor.Black, HairColor.DarkBrown, HairColor.Brown,
            HairColor.LightBrown, HairColor.Blonde, HairColor.Auburn,
            HairColor.Red, HairColor.Grey
        ],
        features: {
            wings: WingType.None,
            tail: TailType.None,
            ears: EarType.Human,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Smooth, CockTextureType.Veined],
            specialFeatures: []
        },
        femaleBodyTypeBias: {},
        maleBodyTypeBias: {},
        description: "Standard human. No supernatural features. Full skin tone range.",
        defaultRegions: [RegionOfOrigin.Heartlands, RegionOfOrigin.SunkenCoast, RegionOfOrigin.StonebackRange], minActualAgeAtSpawn: 18
    },

    [Race.Elf]: {
        race: Race.Elf,
        lifespan: 700,
        apparentAgeRatio: 0.08,              // 300yr elf appears ~24
        apparentAgeCap: 35,
        preferredSkinTones: [
            SkinTone.Porcelain, SkinTone.Ivory, SkinTone.Fair, SkinTone.Light
        ],
        preferredEyeColors: [
            EyeColor.Green, EyeColor.Blue, EyeColor.Silver,
            EyeColor.Amber, EyeColor.Gold
        ],
        preferredHairColors: [
            HairColor.Silver, HairColor.Platinum, HairColor.GoldenWhite,
            HairColor.Brown, HairColor.Blonde, HairColor.Black
        ],
        features: {
            wings: WingType.None,
            tail: TailType.None,
            ears: EarType.ElvenPointed,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Smooth, CockTextureType.Veined],
            specialFeatures: ["faintly luminous skin", "graceful movement"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.Willowy]: 3,
            [FemaleBodyType.HourglassSlim]: 2,
            [FemaleBodyType.SlimCurvy]: 2
        },
        maleBodyTypeBias: {
            [MaleBodyType.Lean]: 3,
            [MaleBodyType.Athletic]: 2
        },
        description: "Graceful, long-lived, pointed ears. Slim to elegant builds. Ageless appearance.",
        defaultRegions: [RegionOfOrigin.VerdantReach, RegionOfOrigin.DeepForest], minActualAgeAtSpawn: 80
    },

    [Race.HighElf]: {
        race: Race.HighElf,
        lifespan: 2000,
        apparentAgeRatio: 0.01,
        apparentAgeCap: 28,
        preferredSkinTones: [
            SkinTone.Porcelain, SkinTone.Ivory, SkinTone.PaleBlue
        ],
        preferredEyeColors: [
            EyeColor.Silver, EyeColor.Gold, EyeColor.Violet, EyeColor.White
        ],
        preferredHairColors: [
            HairColor.Platinum, HairColor.Silver, HairColor.GoldenWhite,
            HairColor.White
        ],
        features: {
            wings: WingType.None,
            tail: TailType.None,
            ears: EarType.HighElvenLong,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Smooth],
            specialFeatures: ["mild aura glow", "unnaturally perfect skin", "ancient eyes"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.Willowy]: 4,
            [FemaleBodyType.HourglassSlim]: 3
        },
        maleBodyTypeBias: {
            [MaleBodyType.Lean]: 4,
            [MaleBodyType.Athletic]: 2
        },
        description: "Ancient, near-perfect beings. Ethereal appearance. Very long ears. Otherworldly eyes.",
        defaultRegions: [RegionOfOrigin.VerdantReach, RegionOfOrigin.CelestialSpire], minActualAgeAtSpawn: 200
    },

    [Race.DarkElf]: {
        race: Race.DarkElf,
        lifespan: 700,
        apparentAgeRatio: 0.08,
        apparentAgeCap: 35,
        preferredSkinTones: [
            SkinTone.AshGrey, SkinTone.ObsidianBlack, SkinTone.DeepPurple,
            SkinTone.Ebony
        ],
        preferredEyeColors: [
            EyeColor.Red, EyeColor.Crimson, EyeColor.Violet,
            EyeColor.White, EyeColor.Silver
        ],
        preferredHairColors: [
            HairColor.White, HairColor.Silver, HairColor.DeepPurple,
            HairColor.Black
        ],
        features: {
            wings: WingType.None,
            tail: TailType.None,
            ears: EarType.ElvenPointed,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Smooth, CockTextureType.Veined, CockTextureType.Ridged],
            specialFeatures: ["dark skin with faint bioluminescent markings", "predatory grace"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.SlimCurvy]: 3,
            [FemaleBodyType.AthleticCurvy]: 2,
            [FemaleBodyType.MuscularFeminine]: 2
        },
        maleBodyTypeBias: {
            [MaleBodyType.Athletic]: 3,
            [MaleBodyType.Muscular]: 2
        },
        description: "Dark-skinned elves. Predatory and elegant. Striking pale hair against dark skin.",
        defaultRegions: [RegionOfOrigin.Ashfen, RegionOfOrigin.VolcanicWastes], minActualAgeAtSpawn: 80
    },

    [Race.Dwarf]: {
        race: Race.Dwarf,
        lifespan: 300,
        apparentAgeRatio: 0.25,
        apparentAgeCap: 60,
        preferredSkinTones: [
            SkinTone.Fair, SkinTone.Light, SkinTone.Tan, SkinTone.Ruddy
        ] as SkinTone[],
        preferredEyeColors: [
            EyeColor.Brown, EyeColor.Hazel, EyeColor.Grey, EyeColor.Amber
        ],
        preferredHairColors: [
            HairColor.Black, HairColor.DarkBrown, HairColor.Brown,
            HairColor.Auburn, HairColor.Red, HairColor.Grey
        ],
        features: {
            wings: WingType.None,
            tail: TailType.None,
            ears: EarType.Human,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Smooth, CockTextureType.HeavilyVeined],
            specialFeatures: ["dense body hair", "exceptional physical density"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.CompactPower]: 4,
            [FemaleBodyType.PetiteCurvy]: 3,
            [FemaleBodyType.MiniVoluptuous]: 2
        },
        maleBodyTypeBias: {
            [MaleBodyType.Stocky]: 4,
            [MaleBodyType.Hypermasculine]: 2
        },
        description: "Short and dense. Compact powerful builds. Strong and durable. Heavy hair.",
        defaultRegions: [RegionOfOrigin.StonebackRange], minActualAgeAtSpawn: 30
    },

    [Race.Fairy]: {
        race: Race.Fairy,
        lifespan: 500,
        apparentAgeRatio: 0.05,
        apparentAgeCap: 22,
        preferredSkinTones: [
            SkinTone.Porcelain, SkinTone.Ivory, SkinTone.PaleBlue,
            SkinTone.TealGreen, SkinTone.GoldenMetallic
        ],
        preferredEyeColors: [
            EyeColor.Violet, EyeColor.Gold, EyeColor.Green,
            EyeColor.Blue, EyeColor.Silver
        ],
        preferredHairColors: [
            HairColor.Lilac, HairColor.IcyBlue, HairColor.Platinum,
            HairColor.GoldenWhite, HairColor.ForestGreen
        ],
        features: {
            wings: WingType.Insect,
            tail: TailType.None,
            ears: EarType.ElvenPointed,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Smooth],
            specialFeatures: ["insect wings", "faint body glow", "naturally sparkles"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.PetiteSlim]: 4,
            [FemaleBodyType.PetiteHourglass]: 3,
            [FemaleBodyType.PetiteCurvy]: 2
        },
        maleBodyTypeBias: {
            [MaleBodyType.Androgynous]: 3,
            [MaleBodyType.Lean]: 3
        },
        description: "Very small. Insect wings. Fantasy coloring. Eternally youthful appearance.",
        defaultRegions: [RegionOfOrigin.VerdantReach, RegionOfOrigin.DeepForest], minActualAgeAtSpawn: 20
    },

    [Race.Orc]: {
        race: Race.Orc,
        lifespan: 120,
        apparentAgeRatio: 0.8,
        apparentAgeCap: 80,
        preferredSkinTones: [
            SkinTone.TealGreen, SkinTone.Olive, SkinTone.Brown,
            SkinTone.DeepBrown
        ],
        preferredEyeColors: [
            EyeColor.Red, EyeColor.Amber, EyeColor.Brown, EyeColor.Black
        ],
        preferredHairColors: [
            HairColor.Black, HairColor.DarkBrown, HairColor.White, HairColor.Grey
        ],
        features: {
            wings: WingType.None,
            tail: TailType.None,
            ears: EarType.Human,
            horns: HornType.SmallNubs,
            cockTextureOptions: [CockTextureType.HeavilyVeined, CockTextureType.Knotted, CockTextureType.Ridged],
            specialFeatures: ["prominent lower tusks", "heavy brow ridge", "thick skin"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.MuscularFeminine]: 3,
            [FemaleBodyType.AthleticCurvy]: 3,
            [FemaleBodyType.CompactPower]: 2
        },
        maleBodyTypeBias: {
            [MaleBodyType.Muscular]: 3,
            [MaleBodyType.Hypermasculine]: 4,
            [MaleBodyType.Stocky]: 2
        },
        description: "Green-skinned, powerful. Tusks. Heavy muscle. Knotted or ridged cock options.",
        defaultRegions: [RegionOfOrigin.StonebackRange, RegionOfOrigin.Ashfen], minActualAgeAtSpawn: 18
    },

    [Race.Goblin]: {
        race: Race.Goblin,
        lifespan: 60,
        apparentAgeRatio: 1.0,
        apparentAgeCap: 60,
        preferredSkinTones: [
            SkinTone.TealGreen, SkinTone.Olive
        ],
        preferredEyeColors: [
            EyeColor.Amber, EyeColor.Red, EyeColor.Black, EyeColor.Gold
        ],
        preferredHairColors: [
            HairColor.Black, HairColor.DarkBrown, HairColor.White
        ],
        features: {
            wings: WingType.None,
            tail: TailType.None,
            ears: EarType.ElvenPointed,
            horns: HornType.SmallNubs,
            cockTextureOptions: [CockTextureType.Smooth, CockTextureType.Ridged],
            specialFeatures: ["large pointed ears", "sharp teeth", "very short stature"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.PetiteSlim]: 3,
            [FemaleBodyType.PetiteCurvy]: 3
        },
        maleBodyTypeBias: {
            [MaleBodyType.Lean]: 3,
            [MaleBodyType.Average]: 2
        },
        description: "Very short. Green skin. Large ears. Sharp teeth. Quick and wiry.",
        defaultRegions: [RegionOfOrigin.Ashfen, RegionOfOrigin.VolcanicWastes], minActualAgeAtSpawn: 12
    },

    [Race.Demon]: {
        race: Race.Demon,
        lifespan: 0,
        apparentAgeRatio: 0.02,
        apparentAgeCap: 40,
        preferredSkinTones: [
            SkinTone.DeepPurple, SkinTone.ObsidianBlack, SkinTone.AshGrey,
            SkinTone.Crimson
        ] as SkinTone[],
        preferredEyeColors: [
            EyeColor.Red, EyeColor.Crimson, EyeColor.Gold,
            EyeColor.Black, EyeColor.Violet
        ],
        preferredHairColors: [
            HairColor.Black, HairColor.Crimson, HairColor.DeepPurple,
            HairColor.White, HairColor.Silver
        ],
        features: {
            wings: WingType.Bat,
            tail: TailType.Demon,
            ears: EarType.Demonic,
            horns: HornType.DemonSpiral,
            cockTextureOptions: [CockTextureType.Ridged, CockTextureType.Barbed, CockTextureType.HeavilyVeined],
            specialFeatures: ["bat wings", "demon tail", "dark aura", "faint heat emanation"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.HourglassCurvy]: 3,
            [FemaleBodyType.Voluptuous]: 3,
            [FemaleBodyType.HourglassFullBust]: 2
        },
        maleBodyTypeBias: {
            [MaleBodyType.Muscular]: 3,
            [MaleBodyType.Hypermasculine]: 2
        },
        description: "Immortal. Dark coloring. Bat wings. Demon horns and tail. Dangerous presence.",
        defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 100
    },

    [Race.DevilGirl]: {
        race: Race.DevilGirl,
        lifespan: 0,
        apparentAgeRatio: 0.02,
        apparentAgeCap: 30,
        preferredSkinTones: [
            SkinTone.Crimson, SkinTone.DeepPurple, SkinTone.ObsidianBlack
        ] as SkinTone[],
        preferredEyeColors: [EyeColor.Red, EyeColor.Gold, EyeColor.Crimson],
        preferredHairColors: [
            HairColor.Black, HairColor.Crimson, HairColor.White
        ],
        features: {
            wings: WingType.Bat,
            tail: TailType.Devil,
            ears: EarType.Demonic,
            horns: HornType.DevilForked,
            cockTextureOptions: [],
            specialFeatures: ["forked devil tail", "small forked horns", "bat wings", "faintly glowing eyes"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.HourglassCurvy]: 4,
            [FemaleBodyType.Voluptuous]: 3,
            [FemaleBodyType.SlimCurvy]: 2
        },
        maleBodyTypeBias: {},
        description: "Female devil archetype. Red or dark skin. Forked tail and small horns. Seductive.",
        defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 100
    },

    [Race.DevilBoy]: {
        race: Race.DevilBoy,
        lifespan: 0,
        apparentAgeRatio: 0.02,
        apparentAgeCap: 30,
        preferredSkinTones: [
            SkinTone.Crimson, SkinTone.DeepPurple, SkinTone.ObsidianBlack
        ] as SkinTone[],
        preferredEyeColors: [EyeColor.Red, EyeColor.Gold, EyeColor.Crimson],
        preferredHairColors: [HairColor.Black, HairColor.Crimson, HairColor.White],
        features: {
            wings: WingType.Bat,
            tail: TailType.Devil,
            ears: EarType.Demonic,
            horns: HornType.DevilForked,
            cockTextureOptions: [CockTextureType.Ridged, CockTextureType.HeavilyVeined],
            specialFeatures: ["forked devil tail", "small forked horns", "bat wings"]
        },
        femaleBodyTypeBias: {},
        maleBodyTypeBias: {
            [MaleBodyType.Athletic]: 3,
            [MaleBodyType.Muscular]: 2
        },
        description: "Male devil archetype. Dark coloring. Forked tail and horns.",
        defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 100
    },

    [Race.Succubus]: {
        race: Race.Succubus,
        lifespan: 0,
        apparentAgeRatio: 0.01,
        apparentAgeCap: 25,
        preferredSkinTones: [
            SkinTone.DeepPurple, SkinTone.PaleBlue, SkinTone.Crimson,
            SkinTone.ObsidianBlack, SkinTone.Porcelain
        ] as SkinTone[],
        preferredEyeColors: [
            EyeColor.Violet, EyeColor.Red, EyeColor.Gold, EyeColor.Crimson
        ],
        preferredHairColors: [
            HairColor.Crimson, HairColor.DeepPurple, HairColor.Black,
            HairColor.White, HairColor.Lilac
        ],
        features: {
            wings: WingType.Bat,
            tail: TailType.Demon,
            ears: EarType.Demonic,
            horns: HornType.CurvedRam,
            cockTextureOptions: [],
            specialFeatures: [
                "supernatural arousal aura",
                "bat wings",
                "demon tail",
                "unnaturally perfect body",
                "pheromone emission"
            ]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.HourglassCurvy]: 5,
            [FemaleBodyType.Voluptuous]: 4,
            [FemaleBodyType.HourglassFullBust]: 3,
            [FemaleBodyType.HourglassSlim]: 2
        },
        maleBodyTypeBias: {},
        description: "Female sex demon. Perfect figure. Supernatural arousal field. Wings, tail, horns.",
        defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 200
    },

    [Race.Incubus]: {
        race: Race.Incubus,
        lifespan: 0,
        apparentAgeRatio: 0.01,
        apparentAgeCap: 30,
        preferredSkinTones: [
            SkinTone.DeepPurple, SkinTone.ObsidianBlack, SkinTone.Crimson,
            SkinTone.AshGrey
        ] as SkinTone[],
        preferredEyeColors: [EyeColor.Red, EyeColor.Gold, EyeColor.Violet],
        preferredHairColors: [HairColor.Black, HairColor.Crimson, HairColor.Silver],
        features: {
            wings: WingType.Bat,
            tail: TailType.Demon,
            ears: EarType.Demonic,
            horns: HornType.CurvedRam,
            cockTextureOptions: [CockTextureType.Ridged, CockTextureType.Barbed, CockTextureType.Flared],
            specialFeatures: [
                "supernatural arousal aura",
                "bat wings",
                "demon tail",
                "pheromone emission",
                "unnaturally handsome"
            ]
        },
        femaleBodyTypeBias: {},
        maleBodyTypeBias: {
            [MaleBodyType.Athletic]: 3,
            [MaleBodyType.Muscular]: 3,
            [MaleBodyType.Lean]: 2
        },
        description: "Male sex demon. Supernaturally handsome. Wings, tail, horns. Seduction specialist.",
        defaultRegions: [RegionOfOrigin.AbyssalRealm], minActualAgeAtSpawn: 200
    },

    [Race.FoxGirl]: {
        race: Race.FoxGirl,
        lifespan: 300,
        apparentAgeRatio: 0.1,
        apparentAgeCap: 30,
        preferredSkinTones: [
            SkinTone.Porcelain, SkinTone.Fair, SkinTone.Light,
            SkinTone.LightMedium, SkinTone.Tan
        ],
        preferredEyeColors: [
            EyeColor.Amber, EyeColor.Gold, EyeColor.Green, EyeColor.Red
        ],
        preferredHairColors: [
            HairColor.Auburn, HairColor.Red, HairColor.Crimson,
            HairColor.White, HairColor.Silver, HairColor.Blonde
        ],
        features: {
            wings: WingType.None,
            tail: TailType.Fox,
            ears: EarType.AnimalFox,
            horns: HornType.None,
            cockTextureOptions: [],
            specialFeatures: ["fox tail (1-9 depending on power)", "fox ears", "slightly slit pupils"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.SlimCurvy]: 3,
            [FemaleBodyType.HourglassSlim]: 3,
            [FemaleBodyType.PetiteHourglass]: 2
        },
        maleBodyTypeBias: {},
        description: "Fox spirit girl. Fox ears and tail. Cunning and alluring. Amber or gold eyes.",
        defaultRegions: [RegionOfOrigin.DeepForest, RegionOfOrigin.VerdantReach], minActualAgeAtSpawn: 30
    },

    [Race.FoxBoy]: {
        race: Race.FoxBoy,
        lifespan: 300,
        apparentAgeRatio: 0.1,
        apparentAgeCap: 30,
        preferredSkinTones: [
            SkinTone.Porcelain, SkinTone.Fair, SkinTone.Light, SkinTone.Tan
        ],
        preferredEyeColors: [EyeColor.Amber, EyeColor.Gold, EyeColor.Green],
        preferredHairColors: [
            HairColor.Auburn, HairColor.Red, HairColor.White, HairColor.Silver
        ],
        features: {
            wings: WingType.None,
            tail: TailType.Fox,
            ears: EarType.AnimalFox,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Smooth, CockTextureType.Tapered],
            specialFeatures: ["fox tail", "fox ears", "slightly slit pupils"]
        },
        femaleBodyTypeBias: {},
        maleBodyTypeBias: {
            [MaleBodyType.Lean]: 3,
            [MaleBodyType.Androgynous]: 2,
            [MaleBodyType.Athletic]: 2
        },
        description: "Fox spirit boy. Fox ears and tail. Slim and agile.",
        defaultRegions: [RegionOfOrigin.DeepForest, RegionOfOrigin.VerdantReach], minActualAgeAtSpawn: 30
    },

    [Race.WolfGirl]: {
        race: Race.WolfGirl,
        lifespan: 200,
        apparentAgeRatio: 0.15,
        apparentAgeCap: 35,
        preferredSkinTones: [
            SkinTone.Fair, SkinTone.Light, SkinTone.Medium, SkinTone.Tan
        ],
        preferredEyeColors: [
            EyeColor.Amber, EyeColor.Grey, EyeColor.Blue, EyeColor.Gold
        ],
        preferredHairColors: [
            HairColor.Black, HairColor.Grey, HairColor.White,
            HairColor.Brown, HairColor.Silver
        ],
        features: {
            wings: WingType.None,
            tail: TailType.Wolf,
            ears: EarType.AnimalWolf,
            horns: HornType.None,
            cockTextureOptions: [],
            specialFeatures: ["wolf tail", "wolf ears", "faintly elongated canine teeth"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.AthleticCurvy]: 4,
            [FemaleBodyType.MuscularFeminine]: 3,
            [FemaleBodyType.Athletic]: 2
        },
        maleBodyTypeBias: {},
        description: "Wolf spirit girl. Powerful and athletic. Wolf ears and tail. Pack instincts.",
        defaultRegions: [RegionOfOrigin.StonebackRange, RegionOfOrigin.FrozenNorth], minActualAgeAtSpawn: 20
    },

    [Race.WolfBoy]: {
        race: Race.WolfBoy,
        lifespan: 200,
        apparentAgeRatio: 0.15,
        apparentAgeCap: 35,
        preferredSkinTones: [
            SkinTone.Fair, SkinTone.Light, SkinTone.Medium, SkinTone.Tan
        ],
        preferredEyeColors: [EyeColor.Amber, EyeColor.Grey, EyeColor.Blue],
        preferredHairColors: [
            HairColor.Black, HairColor.Grey, HairColor.White, HairColor.Brown
        ],
        features: {
            wings: WingType.None,
            tail: TailType.Wolf,
            ears: EarType.AnimalWolf,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Knotted, CockTextureType.HeavilyVeined],
            specialFeatures: ["wolf tail", "wolf ears", "elongated canine teeth", "knot at base"]
        },
        femaleBodyTypeBias: {},
        maleBodyTypeBias: {
            [MaleBodyType.Athletic]: 3,
            [MaleBodyType.Muscular]: 3,
            [MaleBodyType.Stocky]: 2
        },
        description: "Wolf spirit boy. Athletic and powerful. Knotted cock option.",
        defaultRegions: [RegionOfOrigin.StonebackRange, RegionOfOrigin.FrozenNorth], minActualAgeAtSpawn: 20
    },

    [Race.CowGirl]: {
        race: Race.CowGirl,
        lifespan: 100,
        apparentAgeRatio: 0.9,
        apparentAgeCap: 50,
        preferredSkinTones: [
            SkinTone.Fair, SkinTone.Light, SkinTone.LightMedium, SkinTone.Medium
        ],
        preferredEyeColors: [
            EyeColor.Brown, EyeColor.Amber, EyeColor.Blue, EyeColor.Hazel
        ],
        preferredHairColors: [
            HairColor.Black, HairColor.Brown, HairColor.Blonde, HairColor.White
        ],
        features: {
            wings: WingType.None,
            tail: TailType.Cow,
            ears: EarType.AnimalCow,
            horns: HornType.ThickBull,
            cockTextureOptions: [],
            specialFeatures: ["cow tail", "cow ears", "thick bull horns", "naturally lactating tendency"]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.Voluptuous]: 4,
            [FemaleBodyType.FullFigured]: 3,
            [FemaleBodyType.HourglassFullBust]: 3,
            [FemaleBodyType.Zaftig]: 2
        },
        maleBodyTypeBias: {},
        description: "Cow spirit girl. Large bust tendency. Naturally lactating. Cow ears, tail, horns.",
        defaultRegions: [RegionOfOrigin.Heartlands], minActualAgeAtSpawn: 18
    },

    [Race.CowBoy]: {
        race: Race.CowBoy,
        lifespan: 100,
        apparentAgeRatio: 0.9,
        apparentAgeCap: 50,
        preferredSkinTones: [
            SkinTone.Fair, SkinTone.Light, SkinTone.Medium, SkinTone.Tan
        ],
        preferredEyeColors: [EyeColor.Brown, EyeColor.Amber, EyeColor.Hazel],
        preferredHairColors: [HairColor.Black, HairColor.Brown, HairColor.Blonde],
        features: {
            wings: WingType.None,
            tail: TailType.Cow,
            ears: EarType.AnimalCow,
            horns: HornType.ThickBull,
            cockTextureOptions: [CockTextureType.HeavilyVeined, CockTextureType.Flared],
            specialFeatures: ["cow tail", "cow ears", "thick bull horns", "flared cock head"]
        },
        femaleBodyTypeBias: {},
        maleBodyTypeBias: {
            [MaleBodyType.Stocky]: 3,
            [MaleBodyType.Muscular]: 3,
            [MaleBodyType.Hypermasculine]: 2
        },
        description: "Cow spirit boy. Heavy and powerful. Bull horns. Flared cock option.",
        defaultRegions: [RegionOfOrigin.Heartlands], minActualAgeAtSpawn: 18
    },

    [Race.DragonGirl]: {
        race: Race.DragonGirl,
        lifespan: 0,
        apparentAgeRatio: 0.005,
        apparentAgeCap: 30,
        preferredSkinTones: [
            SkinTone.TealGreen, SkinTone.ObsidianBlack, SkinTone.GoldenMetallic,
            SkinTone.Crimson, SkinTone.DeepPurple, SkinTone.PaleBlue
        ],
        preferredEyeColors: [
            EyeColor.Gold, EyeColor.Red, EyeColor.Silver,
            EyeColor.Violet, EyeColor.Amber
        ],
        preferredHairColors: [
            HairColor.Black, HairColor.White, HairColor.Silver,
            HairColor.Crimson, HairColor.GoldenWhite
        ],
        features: {
            wings: WingType.Dragon,
            tail: TailType.Dragon,
            ears: EarType.Human,
            horns: HornType.DragonCurved,
            cockTextureOptions: [],
            specialFeatures: [
                "dragon wings",
                "dragon tail",
                "scale patterns on hips/thighs/shoulders",
                "slit pupils",
                "immense latent power"
            ]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.AthleticCurvy]: 3,
            [FemaleBodyType.MuscularFeminine]: 3,
            [FemaleBodyType.HourglassCurvy]: 2
        },
        maleBodyTypeBias: {},
        description: "Dragon spirit girl. Dragon wings, tail, curved horns. Scales on skin. Ancient power.",
        defaultRegions: [RegionOfOrigin.VolcanicWastes, RegionOfOrigin.StonebackRange], minActualAgeAtSpawn: 500
    },

    [Race.DragonBoy]: {
        race: Race.DragonBoy,
        lifespan: 0,
        apparentAgeRatio: 0.005,
        apparentAgeCap: 35,
        preferredSkinTones: [
            SkinTone.TealGreen, SkinTone.ObsidianBlack, SkinTone.GoldenMetallic,
            SkinTone.Crimson
        ],
        preferredEyeColors: [EyeColor.Gold, EyeColor.Red, EyeColor.Silver],
        preferredHairColors: [HairColor.Black, HairColor.White, HairColor.Silver, HairColor.Crimson],
        features: {
            wings: WingType.Dragon,
            tail: TailType.Dragon,
            ears: EarType.Human,
            horns: HornType.DragonCurved,
            cockTextureOptions: [CockTextureType.Ridged, CockTextureType.Flared, CockTextureType.Tapered],
            specialFeatures: [
                "dragon wings",
                "dragon tail",
                "scale patterns on body",
                "slit pupils",
                "ridged or tapered cock"
            ]
        },
        femaleBodyTypeBias: {},
        maleBodyTypeBias: {
            [MaleBodyType.Muscular]: 3,
            [MaleBodyType.Hypermasculine]: 3,
            [MaleBodyType.Athletic]: 2
        },
        description: "Dragon spirit boy. Wings, tail, horns. Scale markings. Ridged or flared cock.",
        defaultRegions: [RegionOfOrigin.VolcanicWastes, RegionOfOrigin.StonebackRange], minActualAgeAtSpawn: 500
    },

    [Race.Goddess]: {
        race: Race.Goddess,
        lifespan: 0,
        apparentAgeRatio: 0.0,
        apparentAgeCap: 25,
        preferredSkinTones: [
            SkinTone.Porcelain, SkinTone.GoldenMetallic, SkinTone.PaleBlue,
            SkinTone.Ivory
        ],
        preferredEyeColors: [
            EyeColor.Gold, EyeColor.White, EyeColor.Silver, EyeColor.Violet
        ],
        preferredHairColors: [
            HairColor.GoldenWhite, HairColor.Platinum, HairColor.White,
            HairColor.Silver
        ],
        features: {
            wings: WingType.Feathered,
            tail: TailType.None,
            ears: EarType.Human,
            horns: HornType.None,
            cockTextureOptions: [],
            specialFeatures: [
                "permanent divine aura",
                "feathered wings",
                "body emits soft light",
                "unnaturally perfect form",
                "presence causes involuntary reverence"
            ]
        },
        femaleBodyTypeBias: {
            [FemaleBodyType.HourglassCurvy]: 5,
            [FemaleBodyType.Voluptuous]: 4,
            [FemaleBodyType.HourglassSlim]: 3
        },
        maleBodyTypeBias: {},
        description: "Divine being. Perfect form. Feathered wings. Glowing aura. Eternal youth.",
        defaultRegions: [RegionOfOrigin.CelestialSpire], minActualAgeAtSpawn: 1000
    },

    [Race.God]: {
        race: Race.God,
        lifespan: 0,
        apparentAgeRatio: 0.0,
        apparentAgeCap: 35,
        preferredSkinTones: [
            SkinTone.GoldenMetallic, SkinTone.Porcelain, SkinTone.Ivory
        ],
        preferredEyeColors: [EyeColor.Gold, EyeColor.White, EyeColor.Silver],
        preferredHairColors: [
            HairColor.GoldenWhite, HairColor.Platinum, HairColor.White
        ],
        features: {
            wings: WingType.Feathered,
            tail: TailType.None,
            ears: EarType.Human,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Smooth, CockTextureType.Veined],
            specialFeatures: [
                "divine aura",
                "feathered wings",
                "perfect form",
                "body emits warm light"
            ]
        },
        femaleBodyTypeBias: {},
        maleBodyTypeBias: {
            [MaleBodyType.Athletic]: 3,
            [MaleBodyType.Muscular]: 3,
            [MaleBodyType.Hypermasculine]: 2
        },
        description: "Divine male being. Perfect physique. Feathered wings. Golden aura.",
        defaultRegions: [RegionOfOrigin.CelestialSpire], minActualAgeAtSpawn: 1000
    },

    [Race.Mixed]: {
        race: Race.Mixed,
        lifespan: 150,
        apparentAgeRatio: 0.5,
        apparentAgeCap: 50,
        preferredSkinTones: Object.values(SkinTone),
        preferredEyeColors: Object.values(EyeColor),
        preferredHairColors: Object.values(HairColor),
        features: {
            wings: WingType.None,
            tail: TailType.None,
            ears: EarType.Human,
            horns: HornType.None,
            cockTextureOptions: [CockTextureType.Smooth, CockTextureType.Veined, CockTextureType.Ridged],
            specialFeatures: ["variable — inherits features from parent races"]
        },
        femaleBodyTypeBias: {},
        maleBodyTypeBias: {},
        description: "Mixed race. Any combination of parent race features. Full range of appearance.",
        defaultRegions: Object.values(RegionOfOrigin), minActualAgeAtSpawn: 18
    }
};