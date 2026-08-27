// ============================================================
// FILE: personalityExpansion.ts
// ============================================================

import {
    DominantTrait, SexualLean, SexualConfidence,
    BigFiveLevel, EmotionalStability
} from "./enums";


// ─── EXPANDED PERSONALITY CORE ──────────────────────────────

export interface ExpandedPersonalityCore {
    // Original fields (unchanged)
    bigFive: import("./psychologyCore").BigFiveProfile;
    dominantTrait: DominantTrait;
    secondaryTrait: DominantTrait;
    humorStyle: import("./enums").HumorStyle;
    emotionalStability: EmotionalStability;
    trustBaseline: import("./enums").TrustBaseline;
    loyaltyLevel: import("./enums").LoyaltyLevel;
    jealousyTendency: import("./enums").JealousyTendency;
    affectionStyle: import("./enums").AffectionStyle;

    // NEW — Three-layer self system
    publicPersona: PublicPersona;
    privateSelf: PrivateSelf;
    hiddenDesireLean: HiddenDesireLean;
    secondaryHiddenDesire: HiddenDesireLean | null;    // optional second layer

    // NEW — Gap mechanics
    personaGap: PersonaGap;
    desireAwareness: DesireAwareness;
    triggerSensitivity: TriggerSensitivity;

    // NEW — Suppression
    suppressionStrength: number;        // 0-100; how hard they work to maintain persona
    // high = very controlled; low = leaks constantly
    suppressionCrackThreshold: number;  // corruption/trust level at which suppression begins failing
}

export const RACE_PERSONA_BIAS: Partial<Record<Race, {
    publicPersonaBias: Partial<Record<PublicPersona, number>>;
    hiddenDesireBias: Partial<Record<HiddenDesireLean, number>>;
    privateSelfBias: Partial<Record<PrivateSelf, number>>;
}>> = {
    [Race.Succubus]: {
        publicPersonaBias: {
            [PublicPersona.Flirtatious]: 8,
            [PublicPersona.Mysterious]: 6,
            [PublicPersona.Aggressive]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToControl]: 6,
            [HiddenDesireLean.WantsToBreak]: 5,
            [HiddenDesireLean.WantsBothControlAndSurrender]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Hungry]: 6,
            [PrivateSelf.Restless]: 4
        }
    },
    [Race.Goddess]: {
        publicPersonaBias: {
            [PublicPersona.Authority]: 8,
            [PublicPersona.Stoic]: 5,
            [PublicPersona.Mysterious]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeChosen]: 6,
            [HiddenDesireLean.WantsTrustThroughVulnerability]: 5,
            [HiddenDesireLean.WantsToSurrender]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Lonely]: 6,
            [PrivateSelf.Tired]: 4
        }
    },
    [Race.Demon]: {
        publicPersonaBias: {
            [PublicPersona.Aggressive]: 6,
            [PublicPersona.Authority]: 5,
            [PublicPersona.Proud]: 5
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToDominate]: 6,
            [HiddenDesireLean.WantsToBreak]: 5
        },
        privateSelfBias: {
            [PrivateSelf.Resentful]: 5,
            [PrivateSelf.Lonely]: 4
        }
    },
    [Race.Goblin]: {
        publicPersonaBias: {
            [PublicPersona.Rebel]: 6,
            [PublicPersona.Cheerful]: 5
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeNoticed]: 6,
            [HiddenDesireLean.WantsToBePraised]: 5
        },
        privateSelfBias: {
            [PrivateSelf.Restless]: 5,
            [PrivateSelf.Curious]: 4
        }
    },
    [Race.Orc]: {
        publicPersonaBias: {
            [PublicPersona.Aggressive]: 7,
            [PublicPersona.Stoic]: 5
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeOverpowered]: 5,
            [HiddenDesireLean.WantsToSurrender]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Tender]: 5,
            [PrivateSelf.Lonely]: 4
        }
    },
    [Race.FoxGirl]: {
        publicPersonaBias: {
            [PublicPersona.Flirtatious]: 6,
            [PublicPersona.Mysterious]: 5,
            [PublicPersona.Cheerful]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToWatch]: 5,
            [HiddenDesireLean.WantsToBeChosen]: 5,
            [HiddenDesireLean.WantsToControl]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Playful]: 6,
            [PrivateSelf.Curious]: 5
        }
    },
    [Race.CowGirl]: {
        publicPersonaBias: {
            [PublicPersona.Caretaker]: 7,
            [PublicPersona.Cheerful]: 5,
            [PublicPersona.Meek]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeFilled]: 6,
            [HiddenDesireLean.WantsToBeNeeded]: 6,
            [HiddenDesireLean.WantsToBeHeld]: 5
        },
        privateSelfBias: {
            [PrivateSelf.Tender]: 6,
            [PrivateSelf.Needful]: 5
        }
    },
    [Race.Fairy]: {
        publicPersonaBias: {
            [PublicPersona.Cheerful]: 7,
            [PublicPersona.Innocent]: 5,
            [PublicPersona.Flirtatious]: 4
        },
        hiddenDesireBias: {
            [HiddenDesireLean.WantsToBeShocked]: 5,
            [HiddenDesireLean.WantsToLoseControl]: 5,
            [HiddenDesireLean.WantsToBeWatched]: 4
        },
        privateSelfBias: {
            [PrivateSelf.Playful]: 6,
            [PrivateSelf.Curious]: 5
        }
    }
};

// ─── SUPPRESSION CRACK MECHANICS ────────────────────────────
// When corruption or trust crosses suppressionCrackThreshold
// the hidden desire begins leaking through the public persona

export interface SuppressionState {
    cracked: boolean;
    crackLevel: number;             // 0-100; how far the crack has opened
    crackTrigger: "CORRUPTION" | "TRUST" | "ENCOUNTER_COUNT" | "SPECIFIC_ACT" | null;
}

export function checkSuppressionCrack(
    personality: ExpandedPersonalityCore,
    corruption: number,
    trustWithPlayer: number,
    encounterCount: number
): SuppressionState {
    const threshold = personality.suppressionCrackThreshold;
    const strength = personality.suppressionStrength;

    const corruptionCracks = corruption >= threshold;
    const trustCracks = trustWithPlayer >= threshold;
    const encounterCracks = encounterCount > 20 && strength < 40;

    const cracked = corruptionCracks || trustCracks || encounterCracks;

    let crackLevel = 0;
    let crackTrigger: SuppressionState["crackTrigger"] = null;

    if (corruptionCracks) {
        crackLevel = Math.min(((corruption - threshold) / (100 - threshold)) * 100, 100);
        crackTrigger = "CORRUPTION";
    } else if (trustCracks) {
        crackLevel = Math.min(((trustWithPlayer - threshold) / (100 - threshold)) * 100, 100);
        crackTrigger = "TRUST";
    } else if (encounterCracks) {
        crackLevel = Math.min(encounterCount * 2, 50);
        crackTrigger = "ENCOUNTER_COUNT";
    }

    // Suppression strength resists the crack
    const effectiveCrackLevel = Math.max(crackLevel - (strength * 0.3), 0);

    return {
        cracked: effectiveCrackLevel > 0,
        crackLevel: effectiveCrackLevel,
        crackTrigger
    };
}

// ─── DESIRE SURFACE DESCRIPTION ─────────────────────────────
// Generates behavioral description based on current suppression state
// Used to inform character response generation

export function getDesireSurfaceDescription(
    personality: ExpandedPersonalityCore,
    suppression: SuppressionState
): string[] {
    const descriptions: string[] = [];

    if (!suppression.cracked) {
        // Persona is holding — only leaks through trigger sensitivity
        if (personality.triggerSensitivity === TriggerSensitivity.HairTrigger) {
            descriptions.push(`${personality.publicPersona} persona fully maintained but leaks constantly through body language`);
            descriptions.push(`reacts to relevant stimulus before thought catches up`);
        } else {
            descriptions.push(`${personality.publicPersona} persona fully maintained`);
            descriptions.push(`hidden desire: ${personality.hiddenDesireLean} — not yet surfacing`);
        }
        return descriptions;
    }

    const crackIntensity = suppression.crackLevel;

    if (crackIntensity < 25) {
        descriptions.push(`${personality.publicPersona} persona showing minor cracks`);
        descriptions.push(`private self: ${personality.privateSelf} — visible in unguarded moments`);
        descriptions.push(`hidden desire: ${personality.hiddenDesireLean} — surfacing as confusion or unexpected reactions`);
    } else if (crackIntensity < 50) {
        descriptions.push(`${personality.publicPersona} persona fragmenting under pressure`);
        descriptions.push(`private self: ${personality.privateSelf} — increasingly visible`);
        descriptions.push(`hidden desire: ${personality.hiddenDesireLean} — actively fighting for expression`);
        if (personality.secondaryHiddenDesire) {
            descriptions.push(`secondary desire: ${personality.secondaryHiddenDesire} — emerging alongside primary`);
        }
    } else if (crackIntensity < 75) {
        descriptions.push(`${personality.publicPersona} persona mostly abandoned`);
        descriptions.push(`private self: ${personality.privateSelf} — dominant now`);
        descriptions.push(`hidden desire: ${personality.hiddenDesireLean} — openly driving behavior`);
        descriptions.push(`suppression failing — desire acknowledged even if not verbalized`);
    } else {
        descriptions.push(`${personality.publicPersona} persona completely dropped`);
        descriptions.push(`private self: ${personality.privateSelf} — fully expressed`);
        descriptions.push(`hidden desire: ${personality.hiddenDesireLean} — no longer hidden; being actively pursued or responded to`);
        if (personality.secondaryHiddenDesire) {
            descriptions.push(`secondary desire: ${personality.secondaryHiddenDesire} — fully active`);
        }
    }

    return descriptions;
}

// ─── GENERATOR ──────────────────────────────────────────────

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomInRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

export function generateExpandedPersonality(
    base: import("./psychologyCore").PersonalityCore,
    background: import("./historyProfile").BackgroundProfile,
    history: import("./historyProfile").ExperienceHistory,
    race: import("./enums").Race
): ExpandedPersonalityCore {
    const raceBias = RACE_PERSONA_BIAS[race];

    // Public persona — apply race bias
    const personaWeights: Partial<Record<PublicPersona, number>> = {};
    for (const p of Object.values(PublicPersona)) personaWeights[p] = 1;
    if (raceBias?.publicPersonaBias) {
        for (const [p, w] of Object.entries(raceBias.publicPersonaBias) as [PublicPersona, number][]) {
            personaWeights[p] = (personaWeights[p] || 0) + w;
        }
    }
    const publicPersona = weightedRandom(personaWeights as Record<PublicPersona, number>);

    // Private self — apply race bias
    const selfWeights: Partial<Record<PrivateSelf, number>> = {};
    for (const s of Object.values(PrivateSelf)) selfWeights[s] = 1;
    if (raceBias?.privateSelfBias) {
        for (const [s, w] of Object.entries(raceBias.privateSelfBias) as [PrivateSelf, number][]) {
            selfWeights[s] = (selfWeights[s] || 0) + w;
        }
    }
    const privateSelf = weightedRandom(selfWeights as Record<PrivateSelf, number>);

    // Hidden desire — apply race bias
    const desireWeights: Partial<Record<HiddenDesireLean, number>> = {};
    for (const d of Object.values(HiddenDesireLean)) desireWeights[d] = 1;
    if (raceBias?.hiddenDesireBias) {
        for (const [d, w] of Object.entries(raceBias.hiddenDesireBias) as [HiddenDesireLean, number][]) {
            desireWeights[d] = (desireWeights[d] || 0) + w;
        }
    }
    const hiddenDesireLean = weightedRandom(desireWeights as Record<HiddenDesireLean, number>);

    const secondaryHiddenDesire = Math.random() < 0.6
        ? randomFrom(Object.values(HiddenDesireLean).filter(d => d !== hiddenDesireLean))
        : null;

    const gapValues = Object.values(PersonaGap);
    const gapBias = background.traumaPresent ? gapValues.slice(2) : gapValues;
    const personaGap = randomFrom(gapBias);

    const awarenessValues = Object.values(DesireAwareness);
    const experiencedAwareness = history.totalEncounterCount > 30
        ? awarenessValues.slice(2)
        : history.totalEncounterCount > 10
            ? awarenessValues.slice(1)
            : awarenessValues.slice(0, 3);
    const desireAwareness = randomFrom(experiencedAwareness);

    const suppressionStrength = Math.round(randomInRange(
        background.traumaPresent ? 50 : 20,
        background.traumaPresent ? 95 : 80
    ));

    const triggerSensitivity = suppressionStrength > 70
        ? randomFrom([TriggerSensitivity.Resistant, TriggerSensitivity.Low])
        : suppressionStrength > 50
            ? randomFrom([TriggerSensitivity.Low, TriggerSensitivity.Moderate])
            : suppressionStrength > 30
                ? randomFrom([TriggerSensitivity.Moderate, TriggerSensitivity.High])
                : randomFrom([TriggerSensitivity.High, TriggerSensitivity.HairTrigger]);

    const suppressionCrackThreshold = Math.max(10, Math.min(
        Math.round(suppressionStrength * 0.6 + randomInRange(-10, 10)),
        90
    ));

    return {
        ...base,
        publicPersona,
        privateSelf,
        hiddenDesireLean,
        secondaryHiddenDesire,
        personaGap,
        desireAwareness,
        triggerSensitivity,
        suppressionStrength,
        suppressionCrackThreshold
    };
}

export function getPersonaGapMultiplier(gap: PersonaGap): number {
    switch (gap) {
        case PersonaGap.None: return 1.0;
        case PersonaGap.Slight: return 1.3;
        case PersonaGap.Moderate: return 1.6;
        case PersonaGap.Large: return 2.0;
        case PersonaGap.Extreme: return 2.8;
    }
}

// When suppression cracks, gap multiplier amplifies the arousal/corruption response
export function applyGapMultiplierToEncounter(
    arousalGain: number,
    corruptionGain: number,
    gap: PersonaGap,
    suppressionCrackLevel: number   // 0-100
): { arousalGain: number; corruptionGain: number } {
    // Gap multiplier only kicks in as suppression cracks
    const crackFactor = suppressionCrackLevel / 100;
    const gapMult = 1 + (getPersonaGapMultiplier(gap) - 1) * crackFactor;
    return {
        arousalGain: arousalGain * gapMult,
        corruptionGain: corruptionGain * gapMult
    };
}
