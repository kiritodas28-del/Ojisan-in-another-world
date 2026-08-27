// ============================================================
// FILE: attractivenessPatch.ts
// ============================================================

import {
    FemaleBodyType, FemaleAttractiveness, AgeBodyCategory, Race
} from "./enums";

// Body type to attractiveness bias
// These are ADDITIVE weights on top of population config
// They do not prevent any attractiveness level — they just make
// certain combinations more likely

export const BODY_TYPE_ATTRACTIVENESS_BIAS: Partial<Record<FemaleBodyType, Partial<Record<FemaleAttractiveness, number>>>> = {

    [FemaleBodyType.Androgynous]: {
        [FemaleAttractiveness.Plain]: 3,
        [FemaleAttractiveness.CutePlain]: 2,
        [FemaleAttractiveness.Cute]: 1,
        [FemaleAttractiveness.Exotic]: 3,           // androgyny reads as exotic
    },

    [FemaleBodyType.PetiteSlim]: {
        [FemaleAttractiveness.Cute]: 4,
        [FemaleAttractiveness.CutePlain]: 3,
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Beautiful]: 2,
    },

    [FemaleBodyType.PetiteCurvy]: {
        [FemaleAttractiveness.Cute]: 4,
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Beautiful]: 3,
        [FemaleAttractiveness.Stunning]: 2,
    },

    [FemaleBodyType.Willowy]: {
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Stunning]: 3,
        [FemaleAttractiveness.Exotic]: 3,           // tall slim reads as model/exotic
        [FemaleAttractiveness.Breathtaking]: 2,
    },

    [FemaleBodyType.Athletic]: {
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Beautiful]: 3,
        [FemaleAttractiveness.Cute]: 2,
        [FemaleAttractiveness.Stunning]: 2,
    },

    [FemaleBodyType.SlimStraight]: {
        [FemaleAttractiveness.CutePlain]: 3,
        [FemaleAttractiveness.Cute]: 3,
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Plain]: 2,
    },

    [FemaleBodyType.SlimCurvy]: {
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Stunning]: 3,
        [FemaleAttractiveness.Cute]: 2,
    },

    [FemaleBodyType.BananaShape]: {
        [FemaleAttractiveness.Plain]: 3,
        [FemaleAttractiveness.CutePlain]: 4,
        [FemaleAttractiveness.Cute]: 3,
        [FemaleAttractiveness.Pretty]: 2,
    },

    [FemaleBodyType.PearShape]: {
        [FemaleAttractiveness.Cute]: 3,
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Beautiful]: 3,
        [FemaleAttractiveness.CutePlain]: 2,
    },

    [FemaleBodyType.SpoonShape]: {
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Beautiful]: 3,
        [FemaleAttractiveness.Cute]: 2,
        [FemaleAttractiveness.Plain]: 1,
    },

    [FemaleBodyType.HourglassSlim]: {
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Stunning]: 4,
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Breathtaking]: 2,
    },

    [FemaleBodyType.HourglassCurvy]: {
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Stunning]: 5,
        [FemaleAttractiveness.Breathtaking]: 3,
        [FemaleAttractiveness.Transcendent]: 2,
    },

    [FemaleBodyType.HourglassFullBust]: {
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Stunning]: 4,
        [FemaleAttractiveness.Breathtaking]: 3,
        [FemaleAttractiveness.Exotic]: 3,
    },

    [FemaleBodyType.TopHeavy]: {
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Beautiful]: 3,
        [FemaleAttractiveness.Cute]: 2,
        [FemaleAttractiveness.Plain]: 2,
    },

    [FemaleBodyType.BottomHeavy]: {
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Beautiful]: 2,
        [FemaleAttractiveness.Cute]: 2,
        [FemaleAttractiveness.Plain]: 2,
    },

    [FemaleBodyType.FullFigured]: {
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.CutePlain]: 3,
        [FemaleAttractiveness.Plain]: 3,
        [FemaleAttractiveness.Beautiful]: 2,
        [FemaleAttractiveness.Homely]: 2,
    },

    [FemaleBodyType.Voluptuous]: {
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Stunning]: 4,
        [FemaleAttractiveness.Exotic]: 4,
        [FemaleAttractiveness.Breathtaking]: 2,
        [FemaleAttractiveness.Pretty]: 2,
    },

    [FemaleBodyType.Zaftig]: {
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.CutePlain]: 3,
        [FemaleAttractiveness.Beautiful]: 2,
        [FemaleAttractiveness.Plain]: 2,
        [FemaleAttractiveness.Homely]: 2,
    },

    [FemaleBodyType.Rubenesque]: {
        [FemaleAttractiveness.Plain]: 4,
        [FemaleAttractiveness.Homely]: 3,
        [FemaleAttractiveness.CutePlain]: 3,
        [FemaleAttractiveness.Pretty]: 2,
        [FemaleAttractiveness.Exotic]: 2,           // Rubenesque can read as exotic
    },

    [FemaleBodyType.AthleticCurvy]: {
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Stunning]: 4,
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Breathtaking]: 2,
    },

    [FemaleBodyType.MuscularFeminine]: {
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Beautiful]: 3,
        [FemaleAttractiveness.Exotic]: 4,           // muscular feminine is specifically exotic
        [FemaleAttractiveness.Stunning]: 2,
    },

    [FemaleBodyType.PetiteHourglass]: {
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Stunning]: 4,
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Breathtaking]: 2,
        [FemaleAttractiveness.Cute]: 2,
    },

    [FemaleBodyType.MiniVoluptuous]: {
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Stunning]: 4,
        [FemaleAttractiveness.Exotic]: 3,
        [FemaleAttractiveness.Pretty]: 2,
        [FemaleAttractiveness.Breathtaking]: 2,
    },

    [FemaleBodyType.CompactPower]: {
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Cute]: 3,
        [FemaleAttractiveness.Beautiful]: 2,
        [FemaleAttractiveness.Exotic]: 2,
        [FemaleAttractiveness.Plain]: 2,
    }
};

// Age category to attractiveness bias
// Older characters bias slightly toward lower attractiveness tiers
// but can absolutely still spawn at Beautiful or above

export const AGE_ATTRACTIVENESS_BIAS: Record<AgeBodyCategory, Partial<Record<FemaleAttractiveness, number>>> = {

    [AgeBodyCategory.Young]: {
        [FemaleAttractiveness.Cute]: 3,
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Beautiful]: 2,
        [FemaleAttractiveness.CutePlain]: 2,
    },

    [AgeBodyCategory.RipeningMilf]: {
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Stunning]: 3,
        [FemaleAttractiveness.Exotic]: 2,           // ripening has exotic quality
    },

    [AgeBodyCategory.RipeMilf]: {
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Stunning]: 3,
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Exotic]: 4,           // ripe milf specifically exotic
        [FemaleAttractiveness.Breathtaking]: 1,
    },

    [AgeBodyCategory.MatureMilf]: {
        [FemaleAttractiveness.Pretty]: 3,
        [FemaleAttractiveness.Beautiful]: 3,
        [FemaleAttractiveness.Exotic]: 4,
        [FemaleAttractiveness.CutePlain]: 2,
        [FemaleAttractiveness.Plain]: 2,
    },

    [AgeBodyCategory.OldMilf]: {
        [FemaleAttractiveness.Plain]: 3,
        [FemaleAttractiveness.CutePlain]: 3,
        [FemaleAttractiveness.Homely]: 2,
        [FemaleAttractiveness.Pretty]: 2,
        [FemaleAttractiveness.Exotic]: 3,           // aged beauty has exotic quality
    }
};


export const RACE_ATTRACTIVENESS_BIAS: Partial<Record<Race, Partial<Record<FemaleAttractiveness, number>>>> = {
    [Race.Goddess]: {
        [FemaleAttractiveness.Transcendent]: 30,
        [FemaleAttractiveness.Breathtaking]: 15,
        [FemaleAttractiveness.Stunning]: 8,
        [FemaleAttractiveness.Beautiful]: 4
    },
    [Race.Succubus]: {
        [FemaleAttractiveness.Transcendent]: 8,
        [FemaleAttractiveness.Breathtaking]: 10,
        [FemaleAttractiveness.Stunning]: 10,
        [FemaleAttractiveness.Exotic]: 8,
        [FemaleAttractiveness.Beautiful]: 5
    },
    [Race.HighElf]: {
        [FemaleAttractiveness.Breathtaking]: 6,
        [FemaleAttractiveness.Stunning]: 8,
        [FemaleAttractiveness.Beautiful]: 8,
        [FemaleAttractiveness.Exotic]: 5
    },
    [Race.Elf]: {
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Stunning]: 4,
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Exotic]: 3
    },
    [Race.DarkElf]: {
        [FemaleAttractiveness.Exotic]: 10,
        [FemaleAttractiveness.Stunning]: 6,
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Breathtaking]: 3
    },
    [Race.FoxGirl]: {
        [FemaleAttractiveness.Cute]: 6,
        [FemaleAttractiveness.Pretty]: 6,
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Exotic]: 5,
        [FemaleAttractiveness.Stunning]: 3
    },
    [Race.DragonGirl]: {
        [FemaleAttractiveness.Exotic]: 10,
        [FemaleAttractiveness.Stunning]: 6,
        [FemaleAttractiveness.Breathtaking]: 5,
        [FemaleAttractiveness.Beautiful]: 4
    },
    [Race.CowGirl]: {
        [FemaleAttractiveness.CutePlain]: 4,
        [FemaleAttractiveness.Cute]: 4,
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Plain]: 3,
        [FemaleAttractiveness.Exotic]: 3
    },
    [Race.Goblin]: {
        [FemaleAttractiveness.Plain]: 6,
        [FemaleAttractiveness.Homely]: 5,
        [FemaleAttractiveness.CutePlain]: 4,
        [FemaleAttractiveness.Cute]: 3,
        [FemaleAttractiveness.Exotic]: 3
    },
    [Race.Orc]: {
        [FemaleAttractiveness.Plain]: 4,
        [FemaleAttractiveness.CutePlain]: 3,
        [FemaleAttractiveness.Exotic]: 8,
        [FemaleAttractiveness.Pretty]: 2,
        [FemaleAttractiveness.Homely]: 2
    },
    [Race.DevilGirl]: {
        [FemaleAttractiveness.Exotic]: 8,
        [FemaleAttractiveness.Stunning]: 6,
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Breathtaking]: 3
    },
    [Race.Demon]: {
        [FemaleAttractiveness.Exotic]: 7,
        [FemaleAttractiveness.Stunning]: 5,
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.Plain]: 2
    },
    [Race.Fairy]: {
        [FemaleAttractiveness.Cute]: 8,
        [FemaleAttractiveness.Pretty]: 6,
        [FemaleAttractiveness.Beautiful]: 5,
        [FemaleAttractiveness.Exotic]: 4
    },
    [Race.WolfGirl]: {
        [FemaleAttractiveness.Exotic]: 6,
        [FemaleAttractiveness.Pretty]: 4,
        [FemaleAttractiveness.Beautiful]: 4,
        [FemaleAttractiveness.CutePlain]: 3
    }
};

// ─── COMBINED ATTRACTIVENESS ROLL ───────────────────────────
// Replaces the plain weightedRandom call in generateFemalePhysicalDetail

export function rollAttractivenessWithBias(
    baseWeights: Record<FemaleAttractiveness, number>,
    bodyType: import("./enums").FemaleBodyType,
    ageCategory: AgeBodyCategory,
    race: Race
): FemaleAttractiveness {
    const combined: Partial<Record<FemaleAttractiveness, number>> = { ...baseWeights };
    // Apply body type bias
    const bodyBias = BODY_TYPE_ATTRACTIVENESS_BIAS[bodyType] ?? {};
    for (const [attr, add] of Object.entries(bodyBias) as [FemaleAttractiveness, number][]) {
        combined[attr] = (combined[attr] || 0) + add;
    }

    // Apply age bias
    const ageBias = AGE_ATTRACTIVENESS_BIAS[ageCategory] ?? {};
    for (const [attr, add] of Object.entries(ageBias) as [FemaleAttractiveness, number][]) {
        combined[attr] = (combined[attr] || 0) + add;
    }

    // Apply race bias
    const raceBias = RACE_ATTRACTIVENESS_BIAS[race] ?? {};
    for (const [attr, add] of Object.entries(raceBias) as [FemaleAttractiveness, number][]) {
        combined[attr] = (combined[attr] || 0) + add;
    }

    // Weighted random
    const entries = Object.entries(combined) as [FemaleAttractiveness, number][];
    const filtered = entries.filter(([, w]) => w > 0);
    const total = filtered.reduce((sum, [, w]) => sum + w, 0);
    let roll = Math.random() * total;
    for (const [key, weight] of filtered) {
        roll -= weight;
        if (roll <= 0) return key;
    }
    return filtered[filtered.length - 1][0];
}