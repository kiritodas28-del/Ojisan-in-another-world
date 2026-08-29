// ============================================================
// FILE: populationConfig.ts
// ============================================================

import {
    Race, MaleBodyType, FemaleBodyType, MaleAttractiveness,
    FemaleAttractiveness, CockSize, HairColor, PregnancyStage,
    SkinTone, SocialClass, Occupation, ResistanceProfileType,
    SexualLean, FertilityRating, OrgasmType, WetnessLevel,
    RegionOfOrigin,
    AgeBodyCategory
} from "./enums";

export interface PopulationConfig {
    // Race weights
    raceWeights: Record<Race, number>;
    // Body type weights
    maleBodyTypeWeights: Record<MaleBodyType, number>;
    femaleBodyTypeWeights: Record<FemaleBodyType, number>;
    // Attractiveness weights
    maleAttractivenessWeights: Record<MaleAttractiveness, number>;
    femaleAttractivenessWeights: Record<FemaleAttractiveness, number>;
    // Male sexual
    cockSizeWeights: Record<CockSize, number>;
    // Appearance
    hairColorWeights: Record<HairColor, number>;
    skinToneWeights: Record<SkinTone, number>;
    // Social
    socialClassWeights: Record<SocialClass, number>;
    occupationWeights: Record<Occupation, number>;
    // Pregnancy
    pregnancyRate: number;
    pregnancyStageWeights: Record<PregnancyStage, number>;
    // Height
    heightDistribution: {
        meanMale: number;
        meanFemale: number;
        stdDev: number;
    };
    // Psychology defaults
    defaultResistanceProfile: ResistanceProfileType;
    defaultSexualLean: SexualLean;
    defaultFertilityRating: FertilityRating;
    defaultBaselineWetness: WetnessLevel;
    // Trauma rate
    traumaRate: number;
    // Experience rate
    virginRate: number;
    regionWeights: Record<RegionOfOrigin, number>;
    ageCategoryWeights: Record<AgeBodyCategory, number>;
}

export const POPULATION_CONFIGS = {

    STANDARD: {
        raceWeights: {
            [Race.Human]: 10,
            [Race.Elf]: 4,
            [Race.HighElf]: 1,
            [Race.DarkElf]: 2,
            [Race.Dwarf]: 3,
            [Race.Fairy]: 2,
            [Race.Orc]: 2,
            [Race.Goblin]: 2,
            [Race.Demon]: 1,
            [Race.DevilGirl]: 1,
            [Race.DevilBoy]: 1,
            [Race.Succubus]: 0,
            [Race.Incubus]: 0,
            [Race.FoxGirl]: 2,
            [Race.FoxBoy]: 2,
            [Race.WolfGirl]: 2,
            [Race.WolfBoy]: 2,
            [Race.CowGirl]: 1,
            [Race.CowBoy]: 1,
            [Race.DragonGirl]: 0,
            [Race.DragonBoy]: 0,
            [Race.Goddess]: 0,
            [Race.God]: 0,
            [Race.Mixed]: 3
        },
        maleBodyTypeWeights: {
            [MaleBodyType.Androgynous]: 2,
            [MaleBodyType.Lean]: 5,
            [MaleBodyType.Average]: 8,
            [MaleBodyType.Athletic]: 6,
            [MaleBodyType.Muscular]: 4,
            [MaleBodyType.Stocky]: 4,
            [MaleBodyType.Hypermasculine]: 1
        },
        femaleBodyTypeWeights: {
            [FemaleBodyType.Androgynous]: 1,
            [FemaleBodyType.PetiteSlim]: 4,
            [FemaleBodyType.PetiteCurvy]: 3,
            [FemaleBodyType.Willowy]: 3,
            [FemaleBodyType.Athletic]: 4,
            [FemaleBodyType.SlimStraight]: 4,
            [FemaleBodyType.SlimCurvy]: 5,
            [FemaleBodyType.BananaShape]: 3,
            [FemaleBodyType.PearShape]: 5,
            [FemaleBodyType.SpoonShape]: 3,
            [FemaleBodyType.HourglassSlim]: 5,
            [FemaleBodyType.HourglassCurvy]: 4,
            [FemaleBodyType.HourglassFullBust]: 2,
            [FemaleBodyType.TopHeavy]: 3,
            [FemaleBodyType.BottomHeavy]: 3,
            [FemaleBodyType.FullFigured]: 2,
            [FemaleBodyType.Voluptuous]: 3,
            [FemaleBodyType.Zaftig]: 2,
            [FemaleBodyType.Rubenesque]: 1,
            [FemaleBodyType.AthleticCurvy]: 4,
            [FemaleBodyType.MuscularFeminine]: 2,
            [FemaleBodyType.PetiteHourglass]: 3,
            [FemaleBodyType.MiniVoluptuous]: 2,
            [FemaleBodyType.CompactPower]: 2
        },
        maleAttractivenessWeights: {
            [MaleAttractiveness.Plain]: 5,
            [MaleAttractiveness.Rugged]: 5,
            [MaleAttractiveness.Handsome]: 4,
            [MaleAttractiveness.Striking]: 2,
            [MaleAttractiveness.Godlike]: 1
        },
        femaleAttractivenessWeights: {
            [FemaleAttractiveness.Plain]: 4,
            [FemaleAttractiveness.Homely]: 3,
            [FemaleAttractiveness.CutePlain]: 5,
            [FemaleAttractiveness.Cute]: 5,
            [FemaleAttractiveness.Pretty]: 5,
            [FemaleAttractiveness.Beautiful]: 4,
            [FemaleAttractiveness.Exotic]: 2,
            [FemaleAttractiveness.Stunning]: 2,
            [FemaleAttractiveness.Breathtaking]: 1,
            [FemaleAttractiveness.Transcendent]: 1
        },
        cockSizeWeights: {
            [CockSize.Small]: 3,
            [CockSize.BelowAverage]: 5,
            [CockSize.Average]: 8,
            [CockSize.AboveAverage]: 6,
            [CockSize.Large]: 3,
            [CockSize.VeryLarge]: 1,
            [CockSize.Massive]: 0
        },
        hairColorWeights: {
            [HairColor.Black]: 8,
            [HairColor.DarkBrown]: 7,
            [HairColor.Brown]: 7,
            [HairColor.LightBrown]: 5,
            [HairColor.Blonde]: 4,
            [HairColor.DirtyBlonde]: 3,
            [HairColor.Strawberry]: 2,
            [HairColor.Auburn]: 3,
            [HairColor.Red]: 2,
            [HairColor.Grey]: 1,
            [HairColor.White]: 1,
            [HairColor.Silver]: 1,
            [HairColor.Platinum]: 0,
            [HairColor.Lilac]: 0,
            [HairColor.RoseGold]: 0,
            [HairColor.IcyBlue]: 0,
            [HairColor.ForestGreen]: 0,
            [HairColor.DeepPurple]: 0,
            [HairColor.Crimson]: 0,
            [HairColor.GoldenWhite]: 0
        },
        skinToneWeights: {
            [SkinTone.Porcelain]: 2,
            [SkinTone.Ivory]: 3,
            [SkinTone.Fair]: 4,
            [SkinTone.Light]: 5,
            [SkinTone.LightMedium]: 5,
            [SkinTone.Medium]: 5,
            [SkinTone.MediumTan]: 4,
            [SkinTone.Tan]: 4,
            [SkinTone.Olive]: 3,
            [SkinTone.Golden]: 3,
            [SkinTone.Caramel]: 3,
            [SkinTone.Chestnut]: 2,
            [SkinTone.Brown]: 3,
            [SkinTone.DeepBrown]: 2,
            [SkinTone.Ebony]: 2,
            [SkinTone.AshGrey]: 0,
            [SkinTone.PaleBlue]: 0,
            [SkinTone.DeepPurple]: 0,
            [SkinTone.TealGreen]: 0,
            [SkinTone.GoldenMetallic]: 0,
            [SkinTone.ObsidianBlack]: 0
        },
        socialClassWeights: {
            [SocialClass.Slave]: 1,
            [SocialClass.Peasant]: 5,
            [SocialClass.Commoner]: 7,
            [SocialClass.Merchant]: 4,
            [SocialClass.Noble]: 2,
            [SocialClass.Royalty]: 0
        },
        occupationWeights: {
            [Occupation.None]: 3,
            [Occupation.Warrior]: 5,
            [Occupation.Mage]: 3,
            [Occupation.Thief]: 3,
            [Occupation.Priest]: 2,
            [Occupation.Merchant]: 4,
            [Occupation.Healer]: 3,
            [Occupation.Blacksmith]: 2,
            [Occupation.Farmer]: 4,
            [Occupation.Noble]: 1,
            [Occupation.Scholar]: 2,
            [Occupation.Bard]: 2,
            [Occupation.Assassin]: 1,
            [Occupation.Knight]: 2,
            [Occupation.Ranger]: 3,
            [Occupation.Alchemist]: 2,
            [Occupation.Slave]: 1,
            [Occupation.Innkeeper]: 2,
            [Occupation.Guard]: 3,
            [Occupation.Adventurer]: 4
        },
        pregnancyRate: 0.05,
        pregnancyStageWeights: {
            [PregnancyStage.NotPregnant]: 0,
            [PregnancyStage.EarlyFirst]: 3,
            [PregnancyStage.LateFirst]: 3,
            [PregnancyStage.EarlySecond]: 2,
            [PregnancyStage.LateSecond]: 2,
            [PregnancyStage.EarlyThird]: 1,
            [PregnancyStage.LateThird]: 1,
            [PregnancyStage.FullTerm]: 0
        },
        heightDistribution: {
            meanMale: 172,
            meanFemale: 162,
            stdDev: 8
        },
        defaultResistanceProfile: ResistanceProfileType.Fight,
        defaultSexualLean: SexualLean.Vanilla,
        defaultFertilityRating: FertilityRating.Moderate,
        defaultBaselineWetness: WetnessLevel.Damp,
        traumaRate: 0.1,
        virginRate: 0.2,
        regionWeights: {
            [RegionOfOrigin.Heartlands]: 8,
            [RegionOfOrigin.VerdantReach]: 5,
            [RegionOfOrigin.StonebackRange]: 4,
            [RegionOfOrigin.Ashfen]: 3,
            [RegionOfOrigin.SunkenCoast]: 5,
            [RegionOfOrigin.AbyssalRealm]: 1,
            [RegionOfOrigin.CelestialSpire]: 0,
            [RegionOfOrigin.DeepForest]: 3,
            [RegionOfOrigin.VolcanicWastes]: 2,
            [RegionOfOrigin.FrozenNorth]: 2,
            [RegionOfOrigin.DesertBadlands]: 2,
            [RegionOfOrigin.CoastalIslands]: 3
        },
        ageCategoryWeights: {
            [AgeBodyCategory.Young]: 8,
            [AgeBodyCategory.RipeningMilf]: 5,
            [AgeBodyCategory.RipeMilf]: 4,
            [AgeBodyCategory.MatureMilf]: 3,
            [AgeBodyCategory.OldMilf]: 1
        }
    } as PopulationConfig,

    FANTASY_HEAVY: {
        raceWeights: {
            [Race.Human]: 5,
            [Race.Elf]: 5,
            [Race.HighElf]: 2,
            [Race.DarkElf]: 3,
            [Race.Dwarf]: 3,
            [Race.Fairy]: 3,
            [Race.Orc]: 3,
            [Race.Goblin]: 3,
            [Race.Demon]: 2,
            [Race.DevilGirl]: 2,
            [Race.DevilBoy]: 2,
            [Race.Succubus]: 1,
            [Race.Incubus]: 1,
            [Race.FoxGirl]: 3,
            [Race.FoxBoy]: 3,
            [Race.WolfGirl]: 3,
            [Race.WolfBoy]: 3,
            [Race.CowGirl]: 2,
            [Race.CowBoy]: 2,
            [Race.DragonGirl]: 1,
            [Race.DragonBoy]: 1,
            [Race.Goddess]: 0,
            [Race.God]: 0,
            [Race.Mixed]: 4
        },
        maleBodyTypeWeights: {
            [MaleBodyType.Androgynous]: 1,
            [MaleBodyType.Lean]: 3,
            [MaleBodyType.Average]: 4,
            [MaleBodyType.Athletic]: 7,
            [MaleBodyType.Muscular]: 7,
            [MaleBodyType.Stocky]: 5,
            [MaleBodyType.Hypermasculine]: 3
        },
        femaleBodyTypeWeights: {
            [FemaleBodyType.Androgynous]: 0,
            [FemaleBodyType.PetiteSlim]: 2,
            [FemaleBodyType.PetiteCurvy]: 5,
            [FemaleBodyType.Willowy]: 3,
            [FemaleBodyType.Athletic]: 3,
            [FemaleBodyType.SlimStraight]: 2,
            [FemaleBodyType.SlimCurvy]: 5,
            [FemaleBodyType.BananaShape]: 2,
            [FemaleBodyType.PearShape]: 6,
            [FemaleBodyType.SpoonShape]: 5,
            [FemaleBodyType.HourglassSlim]: 7,
            [FemaleBodyType.HourglassCurvy]: 7,
            [FemaleBodyType.HourglassFullBust]: 5,
            [FemaleBodyType.TopHeavy]: 4,
            [FemaleBodyType.BottomHeavy]: 4,
            [FemaleBodyType.FullFigured]: 3,
            [FemaleBodyType.Voluptuous]: 6,
            [FemaleBodyType.Zaftig]: 3,
            [FemaleBodyType.Rubenesque]: 2,
            [FemaleBodyType.AthleticCurvy]: 5,
            [FemaleBodyType.MuscularFeminine]: 3,
            [FemaleBodyType.PetiteHourglass]: 5,
            [FemaleBodyType.MiniVoluptuous]: 4,
            [FemaleBodyType.CompactPower]: 3
        },
        maleAttractivenessWeights: {
            [MaleAttractiveness.Plain]: 2,
            [MaleAttractiveness.Rugged]: 5,
            [MaleAttractiveness.Handsome]: 6,
            [MaleAttractiveness.Striking]: 4,
            [MaleAttractiveness.Godlike]: 2
        },
        femaleAttractivenessWeights: {
            [FemaleAttractiveness.Plain]: 1,
            [FemaleAttractiveness.Homely]: 1,
            [FemaleAttractiveness.CutePlain]: 3,
            [FemaleAttractiveness.Cute]: 5,
            [FemaleAttractiveness.Pretty]: 6,
            [FemaleAttractiveness.Beautiful]: 6,
            [FemaleAttractiveness.Exotic]: 5,
            [FemaleAttractiveness.Stunning]: 4,
            [FemaleAttractiveness.Breathtaking]: 2,
            [FemaleAttractiveness.Transcendent]: 1
        },
        cockSizeWeights: {
            [CockSize.Small]: 1,
            [CockSize.BelowAverage]: 3,
            [CockSize.Average]: 5,
            [CockSize.AboveAverage]: 7,
            [CockSize.Large]: 5,
            [CockSize.VeryLarge]: 3,
            [CockSize.Massive]: 1
        },
        hairColorWeights: {
            [HairColor.Black]: 5,
            [HairColor.DarkBrown]: 4,
            [HairColor.Brown]: 4,
            [HairColor.LightBrown]: 3,
            [HairColor.Blonde]: 3,
            [HairColor.DirtyBlonde]: 2,
            [HairColor.Strawberry]: 2,
            [HairColor.Auburn]: 2,
            [HairColor.Red]: 2,
            [HairColor.Grey]: 1,
            [HairColor.White]: 2,
            [HairColor.Silver]: 2,
            [HairColor.Platinum]: 3,
            [HairColor.Lilac]: 3,
            [HairColor.RoseGold]: 3,
            [HairColor.IcyBlue]: 2,
            [HairColor.ForestGreen]: 2,
            [HairColor.DeepPurple]: 3,
            [HairColor.Crimson]: 2,
            [HairColor.GoldenWhite]: 2
        },
        skinToneWeights: {
            [SkinTone.Porcelain]: 3,
            [SkinTone.Ivory]: 3,
            [SkinTone.Fair]: 3,
            [SkinTone.Light]: 3,
            [SkinTone.LightMedium]: 3,
            [SkinTone.Medium]: 3,
            [SkinTone.MediumTan]: 3,
            [SkinTone.Tan]: 3,
            [SkinTone.Olive]: 3,
            [SkinTone.Golden]: 3,
            [SkinTone.Caramel]: 2,
            [SkinTone.Chestnut]: 2,
            [SkinTone.Brown]: 2,
            [SkinTone.DeepBrown]: 2,
            [SkinTone.Ebony]: 2,
            [SkinTone.AshGrey]: 2,
            [SkinTone.PaleBlue]: 2,
            [SkinTone.DeepPurple]: 2,
            [SkinTone.TealGreen]: 2,
            [SkinTone.GoldenMetallic]: 1,
            [SkinTone.ObsidianBlack]: 1
        },
        socialClassWeights: {
            [SocialClass.Slave]: 1,
            [SocialClass.Peasant]: 4,
            [SocialClass.Commoner]: 6,
            [SocialClass.Merchant]: 4,
            [SocialClass.Noble]: 3,
            [SocialClass.Royalty]: 1
        },
        occupationWeights: {
            [Occupation.None]: 2,
            [Occupation.Warrior]: 7,
            [Occupation.Mage]: 5,
            [Occupation.Thief]: 4,
            [Occupation.Priest]: 3,
            [Occupation.Merchant]: 3,
            [Occupation.Healer]: 3,
            [Occupation.Blacksmith]: 2,
            [Occupation.Farmer]: 2,
            [Occupation.Noble]: 2,
            [Occupation.Scholar]: 2,
            [Occupation.Bard]: 3,
            [Occupation.Assassin]: 2,
            [Occupation.Knight]: 3,
            [Occupation.Ranger]: 4,
            [Occupation.Alchemist]: 3,
            [Occupation.Slave]: 1,
            [Occupation.Innkeeper]: 2,
            [Occupation.Guard]: 3,
            [Occupation.Adventurer]: 6
        },
        pregnancyRate: 0.12,
        pregnancyStageWeights: {
            [PregnancyStage.NotPregnant]: 0,
            [PregnancyStage.EarlyFirst]: 3,
            [PregnancyStage.LateFirst]: 3,
            [PregnancyStage.EarlySecond]: 3,
            [PregnancyStage.LateSecond]: 3,
            [PregnancyStage.EarlyThird]: 2,
            [PregnancyStage.LateThird]: 2,
            [PregnancyStage.FullTerm]: 1
        },
        heightDistribution: {
            meanMale: 172,
            meanFemale: 162,
            stdDev: 10
        },
        defaultResistanceProfile: ResistanceProfileType.Fight,
        defaultSexualLean: SexualLean.Vanilla,
        defaultFertilityRating: FertilityRating.High,
        defaultBaselineWetness: WetnessLevel.Damp,
        traumaRate: 0.08,
        virginRate: 0.15,
        regionWeights: {
            [RegionOfOrigin.Heartlands]: 8,
            [RegionOfOrigin.VerdantReach]: 5,
            [RegionOfOrigin.StonebackRange]: 4,
            [RegionOfOrigin.Ashfen]: 3,
            [RegionOfOrigin.SunkenCoast]: 5,
            [RegionOfOrigin.AbyssalRealm]: 1,
            [RegionOfOrigin.CelestialSpire]: 0,
            [RegionOfOrigin.DeepForest]: 3,
            [RegionOfOrigin.VolcanicWastes]: 2,
            [RegionOfOrigin.FrozenNorth]: 2,
            [RegionOfOrigin.DesertBadlands]: 2,
            [RegionOfOrigin.CoastalIslands]: 3
        },
        ageCategoryWeights: {
            [AgeBodyCategory.Young]: 8,
            [AgeBodyCategory.RipeningMilf]: 5,
            [AgeBodyCategory.RipeMilf]: 4,
            [AgeBodyCategory.MatureMilf]: 3,
            [AgeBodyCategory.OldMilf]: 1
        }
    } as PopulationConfig
};