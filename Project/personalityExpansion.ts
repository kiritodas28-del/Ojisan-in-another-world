// ============================================================
// FILE: personalityExpansion.ts
// ============================================================

import {
    DominantTrait, SexualLean, SexualConfidence,
    BigFiveLevel, EmotionalStability
} from "./enums";

// ─── PUBLIC PERSONA ─────────────────────────────────────────
// How the character presents to the world
// What others see and what the character maintains consciously

export enum PublicPersona {
    // Role-based
    Caretaker = "CARETAKER",           // maternal, nurturing, managing others
    Authority = "AUTHORITY",           // commands, leads, expects compliance
    Professional = "PROFESSIONAL",     // composed, capable, task-focused
    Socialite = "SOCIALITE",           // warm, engaging, people-oriented
    Wallflower = "WALLFLOWER",         // quiet, background, avoidant
    Rebel = "REBEL",                   // defiant, provocative, anti-authority
    // Disposition-based
    Cheerful = "CHEERFUL",             // upbeat, approachable, light
    Stoic = "STOIC",                   // controlled, flat affect, unreadable
    Aggressive = "AGGRESSIVE",         // confrontational, dominant, forward
    Meek = "MEEK",                     // deferential, soft-spoken, yielding
    Proud = "PROUD",                   // dignified, self-possessed, above others
    Flirtatious = "FLIRTATIOUS",       // openly suggestive, attention-seeking
    Mysterious = "MYSTERIOUS",         // withholding, cryptic, observed not open
    Innocent = "INNOCENT"              // naive presentation, wide-eyed, unbothered
}

// ─── PRIVATE SELF ───────────────────────────────────────────
// Who they are in unguarded moments
// Not sexual specifically — just the authentic self
// May or may not match public persona

export enum PrivateSelf {
    Lonely = "LONELY",
    Tired = "TIRED",                   // exhausted beneath the performance
    Hungry = "HUNGRY",                 // yearning for something unspecified
    Resentful = "RESENTFUL",          // anger held inward
    Tender = "TENDER",                // soft and caring under hard exterior
    Curious = "CURIOUS",              // genuinely interested, privately exploratory
    Frightened = "FRIGHTENED",        // anxiety beneath composure
    Proud = "PROUD",                  // genuine pride vs performed pride
    Ashamed = "ASHAMED",              // specific private shame
    Desperate = "DESPERATE",          // urgency not shown in public
    Content = "CONTENT",              // genuinely at peace
    Restless = "RESTLESS",            // need for change, friction, stimulation
    Sad = "SAD",                      // grief or loss carried quietly
    Playful = "PLAYFUL",              // lightness hidden under public seriousness
    Needful = "NEEDFUL"               // specific need for connection or touch
}

// ─── HIDDEN DESIRE LEAN ─────────────────────────────────────
// The sexual/emotional direction they actually want
// May be completely opposite to public persona
// May be something they have never acted on
// May be something they have never even consciously acknowledged

export enum HiddenDesireLean {
    // Submission spectrum
    WantsToBeControlled = "WANTS_TO_BE_CONTROLLED",
    WantsToBeOverpowered = "WANTS_TO_BE_OVERPOWERED",
    WantsToObey = "WANTS_TO_OBEY",
    WantsToBePraised = "WANTS_TO_BE_PRAISED",
    WantsToBeTaken = "WANTS_TO_BE_TAKEN",
    WantsToBeUsed = "WANTS_TO_BE_USED",
    WantsToBeDegraded = "WANTS_TO_BE_DEGRADED",
    WantsToBePunished = "WANTS_TO_BE_PUNISHED",
    WantsToBeHurt = "WANTS_TO_BE_HURT",
    WantsToBeFilled = "WANTS_TO_BE_FILLED",
    WantsToBeOwned = "WANTS_TO_BE_OWNED",
    // Dominance spectrum
    WantsToControl = "WANTS_TO_CONTROL",
    WantsToBreak = "WANTS_TO_BREAK",
    WantsToDominate = "WANTS_TO_DOMINATE",
    WantsToWatch = "WANTS_TO_WATCH",
    WantsToTeach = "WANTS_TO_TEACH",
    // Affection spectrum
    WantsToBeHeld = "WANTS_TO_BE_HELD",
    WantsToBeChosen = "WANTS_TO_BE_CHOSEN",
    WantsToBeNoticed = "WANTS_TO_BE_NOTICED",
    WantsToBeNeeded = "WANTS_TO_BE_NEEDED",
    WantsToBeLoved = "WANTS_TO_BE_LOVED",
    WantsToBeKeptSafe = "WANTS_TO_BE_KEPT_SAFE",
    // Experience spectrum
    WantsToLoseControl = "WANTS_TO_LOSE_CONTROL",
    WantsToBeShocked = "WANTS_TO_BE_SHOCKED",
    WantsToBeWatched = "WANTS_TO_BE_WATCHED",
    WantsToSurrender = "WANTS_TO_SURRENDER",
    WantsToBeFreed = "WANTS_TO_BE_FREED",
    // Mixed
    WantsBothControlAndSurrender = "WANTS_BOTH_CONTROL_AND_SURRENDER",
    WantsConnectionThroughPain = "WANTS_CONNECTION_THROUGH_PAIN",
    WantsTrustThroughVulnerability = "WANTS_TRUST_THROUGH_VULNERABILITY"
}

// ─── DESIRE AWARENESS ───────────────────────────────────────
// How conscious is the character of their own hidden desires
// This affects how they respond when those desires are triggered

export enum DesireAwareness {
    Unaware = "UNAWARE",               // does not know this is what they want; body responds before mind does
    Suspected = "SUSPECTED",           // has wondered; not admitted even privately
    Privately_Acknowledged = "PRIVATELY_ACKNOWLEDGED", // knows but has never acted on it
    Accepted = "ACCEPTED",             // knows, has made peace with it, still hidden from others
    Openly_Hidden = "OPENLY_HIDDEN"    // everyone can see it but them
}

// ─── PERSONA GAP ────────────────────────────────────────────
// How large the distance is between public persona and hidden desires
// Large gap = stronger reaction when the gap is bridged
// Small gap = more consistent character throughout

export enum PersonaGap {
    None = "NONE",                     // public persona and hidden desires are aligned
    Slight = "SLIGHT",                 // small discrepancy; mostly consistent
    Moderate = "MODERATE",             // meaningful difference; visible tension
    Large = "LARGE",                   // significant contradiction; denial is active
    Extreme = "EXTREME"                // complete inversion; the persona is armor
}

// ─── TRIGGER SENSITIVITY ────────────────────────────────────
// How easily the hidden desire is triggered / surfaces
// Higher gap + lower awareness + high trigger sensitivity = explosive reaction
// when something finally reaches through the persona

export enum TriggerSensitivity {
    Resistant = "RESISTANT",           // very hard to reach the hidden self
    Low = "LOW",                       // takes sustained effort
    Moderate = "MODERATE",             // responds to deliberate approach
    High = "HIGH",                     // responds to moderate pressure
    HairTrigger = "HAIR_TRIGGER"       // surfaces at the slightest relevant stimulus
}

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

// ─── EXAMPLE ARCHETYPES ─────────────────────────────────────
// Illustrating how the system produces distinct characters

export const ARCHETYPE_EXAMPLES = {

    // The Single Mother Who Runs Everything
    SingleMother: {
        publicPersona: PublicPersona.Authority,
        privateSelf: PrivateSelf.Tired,
        hiddenDesireLean: HiddenDesireLean.WantsToSurrender,
        secondaryHiddenDesire: HiddenDesireLean.WantsToBeKeptSafe,
        personaGap: PersonaGap.Extreme,
        desireAwareness: DesireAwareness.Suspected,
        triggerSensitivity: TriggerSensitivity.Low,
        suppressionStrength: 85,
        suppressionCrackThreshold: 60
        // Gap is extreme: she controls everything publicly
        // Privately she is exhausted and has quietly suspected
        // she wants someone to just take over for once
        // Hard to reach but when reached — collapses fast
    },

    // The Proud Demon Queen
    DemonQueen: {
        publicPersona: PublicPersona.Authority,
        privateSelf: PrivateSelf.Lonely,
        hiddenDesireLean: HiddenDesireLean.WantsToBeOwned,
        secondaryHiddenDesire: HiddenDesireLean.WantsToBeLoved,
        personaGap: PersonaGap.Extreme,
        desireAwareness: DesireAwareness.Unaware,
        triggerSensitivity: TriggerSensitivity.Resistant,
        suppressionStrength: 95,
        suppressionCrackThreshold: 80
        // Complete inversion — the imperious exterior is entirely armor
        // She does not know what she wants; her body does before she does
        // Extremely resistant; gap closing produces explosive reaction
    },

    // The Warm College Girl
    WarmCollegeGirl: {
        publicPersona: PublicPersona.Cheerful,
        privateSelf: PrivateSelf.Curious,
        hiddenDesireLean: HiddenDesireLean.WantsToBeOverpowered,
        secondaryHiddenDesire: HiddenDesireLean.WantsToLoseControl,
        personaGap: PersonaGap.Large,
        desireAwareness: DesireAwareness.Privately_Acknowledged,
        triggerSensitivity: TriggerSensitivity.Moderate,
        suppressionStrength: 50,
        suppressionCrackThreshold: 30
        // She knows what she wants; hasn't acted on it
        // Moderate suppression — leaks through body language
        // Moderate trigger sensitivity — responds to deliberate approach
    },

    // The Haughty Widow
    HaughtyWidow: {
        publicPersona: PublicPersona.Proud,
        privateSelf: PrivateSelf.Desperate,
        hiddenDesireLean: HiddenDesireLean.WantsToBeTaken,
        secondaryHiddenDesire: HiddenDesireLean.WantsToBeHeld,
        personaGap: PersonaGap.Large,
        desireAwareness: DesireAwareness.Accepted,
        triggerSensitivity: TriggerSensitivity.High,
        suppressionStrength: 70,
        suppressionCrackThreshold: 40
        // She knows exactly what she wants and has made peace with it
        // The haughtiness is pride, not armor — she just hasn't found the right person
        // High trigger sensitivity — responds fast once approached correctly
        // Suppression cracks early — the desperation underneath is close to the surface
    },

    // The Bratty Thief
    BrattyThief: {
        publicPersona: PublicPersona.Rebel,
        privateSelf: PrivateSelf.Restless,
        hiddenDesireLean: HiddenDesireLean.WantsToBePunished,
        secondaryHiddenDesire: HiddenDesireLean.WantsToBeControlled,
        personaGap: PersonaGap.Moderate,
        desireAwareness: DesireAwareness.Openly_Hidden,
        triggerSensitivity: TriggerSensitivity.HairTrigger,
        suppressionStrength: 30,
        suppressionCrackThreshold: 15
        // Everyone can see it except her
        // The defiance is practically an invitation
        // Hair trigger — surfaces immediately under any real pressure
        // Suppression is low — she leaks constantly
    },

    // The Warm Starved Housewife
    StarvedHousewife: {
        publicPersona: PublicPersona.Caretaker,
        privateSelf: PrivateSelf.Needful,
        hiddenDesireLean: HiddenDesireLean.WantsToBeNeeded,
        secondaryHiddenDesire: HiddenDesireLean.WantsToBeFilled,
        personaGap: PersonaGap.Slight,
        desireAwareness: DesireAwareness.Accepted,
        triggerSensitivity: TriggerSensitivity.HairTrigger,
        suppressionStrength: 20,
        suppressionCrackThreshold: 10
        // Almost no gap — her warmth is genuine and her need is visible
        // She knows what she wants; barely suppressing it
        // Triggers immediately on genuine attention
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
    history: import("./historyProfile").ExperienceHistory
): ExpandedPersonalityCore {
    const publicPersona = randomFrom(Object.values(PublicPersona));
    const privateSelf = randomFrom(Object.values(PrivateSelf));
    const hiddenDesireLean = randomFrom(Object.values(HiddenDesireLean));

    // Secondary desire — 60% chance of having one
    const secondaryHiddenDesire = Math.random() < 0.6
        ? randomFrom(Object.values(HiddenDesireLean).filter(d => d !== hiddenDesireLean))
        : null;

    // Persona gap — influenced by trauma
    const gapValues = Object.values(PersonaGap);
    const gapBias = background.traumaPresent
        ? gapValues.slice(2)    // trauma biases toward Large or Extreme gap
        : gapValues;
    const personaGap = randomFrom(gapBias);

    // Desire awareness — influenced by experience
    const awarenessValues = Object.values(DesireAwareness);
    const experiencedAwareness = history.totalEncounterCount > 30
        ? awarenessValues.slice(2)  // more experienced = more aware
        : history.totalEncounterCount > 10
            ? awarenessValues.slice(1)
            : awarenessValues.slice(0, 3);
    const desireAwareness = randomFrom(experiencedAwareness);

    // Trigger sensitivity — inversely related to suppression strength
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

    // Suppression crack threshold — roughly tracks suppression strength
    const suppressionCrackThreshold = Math.round(
        suppressionStrength * 0.6 + randomInRange(-10, 10)
    );

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
        suppressionCrackThreshold: Math.max(10, Math.min(suppressionCrackThreshold, 90))
    };
}