/**
 * npcSocialEngine.ts
 * NPC-NPC relationship simulation — runs once per day-end tick (step 9).
 *
 * ── Architecture ──────────────────────────────────────────────────────────────
 *   selectActiveNpcs()         → three-part score decides who ticks today
 *   pickInteractionTarget()    → weighted candidate scoring per subject
 *   resolveInteraction()       → picks interaction type, computes deltas
 *   applyInteractionLog()      → immutable write-back to contacts[]
 *   runDecayAndCapEnforcement  → 30-day decay + slot cap trim
 *   runNpcSocialTick()         → day-end entry point
 *
 * ── Interaction types ─────────────────────────────────────────────────────────
 *   Talk      available to all bonds except PureHate / Broken / Corrupted
 *   Flirt     available when bond ∈ FLIRT_ELIGIBLE
 *   Intimate  available when bond ∈ INTIMATE_ELIGIBLE (same-location gate)
 *   Conflict  PureHate / Broken / Corrupted only
 *
 * ── Subset selection (three-part score) ──────────────────────────────────────
 *   personalityScore   (0-40) extraversion + trustBaseline + emotionalStability
 *   relationshipPull   (0-40) derived from existing bonds — depth + recency
 *   locationBonus      (0-20) whether NPC is in player's current location
 *   finalScore = sum of all three; NPC ticks if finalScore >= ACTIVE_THRESHOLD
 *   Hard gate for fully isolated NPCs: must share scheduleId with someone and
 *   have personalityScore >= ISOLATION_GATE.
 *
 * ── Key constants ─────────────────────────────────────────────────────────────
 *   MAX_RELATIONSHIPS  = 20    per NPC
 *   DECAY_THRESHOLD    = 30    in-game days without interaction → dropped
 *   ACTIVE_THRESHOLD   = 25    minimum finalScore to enter tick
 *   ISOLATION_GATE     = 15    minimum personalityScore for isolated NPCs
 */

import { BondType } from '../spawn-engine/types/enums';
import type {
    GameState,
    GameEvent,
    NpcRelationship,
    NpcDailyInteraction,
} from '../state/gameState';
import type { NpcCharacter } from '../state/gameState';

// ─── Constants ────────────────────────────────────────────────────────────────

export const MAX_RELATIONSHIPS = 20;
export const DECAY_THRESHOLD   = 30;   // in-game days
export const ACTIVE_THRESHOLD  = 25;   // finalScore floor to enter the tick
export const ISOLATION_GATE    = 15;   // personalityScore floor for isolated NPCs

const INTIMATE_TICK_LOOPS = 4;
const ACTIONS_PER_LOOP    = 5;

// ─── Interaction type sets ────────────────────────────────────────────────────

/** Bonds that allow intimate ticks (same-location gate also applies). */
export const INTIMATE_ELIGIBLE = new Set<BondType>([
    BondType.Love,
    BondType.Devoted,
    BondType.Obsession,
    BondType.HateLove,
    BondType.Submissive,
    BondType.Owned,
]);

/** Bonds that allow flirt ticks. */
export const FLIRT_ELIGIBLE = new Set<BondType>([
    BondType.Crush,
    BondType.Attachment,
    BondType.Love,
    BondType.HateLove,
    BondType.Obsession,
    BondType.Devoted,
    BondType.Worshipful,
    BondType.CloseFriend,  // platonic flirting / teasing between close friends
]);

/** Bonds that produce a Conflict tick instead of Talk. */
export const CONFLICT_BONDS = new Set<BondType>([
    BondType.PureHate,
    BondType.Broken,
    BondType.Corrupted,
]);

/**
 * Bonds that count as high-stakes — keep the NPC in the active subset regardless
 * of whether they share a location with the player.
 */
const HIGH_STAKES_BONDS = new Set<BondType>([
    BondType.Love,
    BondType.Devoted,
    BondType.Obsession,
    BondType.Owned,
    BondType.Broken,
    BondType.HateLove,
    BondType.CloseFriend,
]);

// ─── Bond caps (NPC-NPC only) ─────────────────────────────────────────────────

/**
 * Maximum concurrent relationships of each BondType per NPC.
 * Collision: weakest existing bond of that type is downgraded to Acquaintance.
 */
export const BOND_CAPS: Readonly<Record<BondType, number>> = {
    [BondType.None]:         99,
    [BondType.Stranger]:     99,  // everyone starts here; no meaningful cap
    [BondType.Acquaintance]: 20,
    [BondType.Familiar]:     12,
    [BondType.Friend]:        8,
    [BondType.CloseFriend]:   4,
    [BondType.Crush]:         3,
    [BondType.Transactional]: 10,
    [BondType.Attachment]:    6,
    [BondType.Dependent]:     4,
    [BondType.Love]:          2,
    [BondType.Devoted]:       1,
    [BondType.Obsession]:     2,
    [BondType.Submissive]:    1,
    [BondType.HateLove]:      3,
    [BondType.PureHate]:      8,
    [BondType.Worshipful]:    2,
    [BondType.Broken]:        1,
    [BondType.Corrupted]:     1,
    [BondType.Owned]:         1,
};

// ─── Player-exclusive bond gate ─────────────────────────────────────────────
// These BondTypes, when held with the player, cannot also be held with any NPC.
// evolveBond() checks this before returning any of these types.
export const PLAYER_EXCLUSIVE_BONDS = new Set<BondType>([
    BondType.Devoted,
    BondType.Owned,
    BondType.Broken,
    BondType.Corrupted,
    BondType.Submissive,
]);

/**
 * Returns true if the NPC already holds this exact BondType with the player,
 * blocking them from evolving into the same type with another NPC.
 */
function isBlockedByPlayerBond(npc: NpcCharacter, bond: BondType): boolean {
    return PLAYER_EXCLUSIVE_BONDS.has(bond) && npc.playerBondType === bond;
}

// ─── Intimate action pool ─────────────────────────────────────────────────────
// Labels only — no per-action simulation; flat stat deltas applied per loop.

const INTIMATE_ACTION_POOL = [
    'caress', 'kiss', 'embrace', 'fondle', 'whisper',
    'undress', 'stroke', 'press', 'pull_close', 'nuzzle',
    'bite_neck', 'grind', 'kneel', 'pin_down', 'surrender',
] as const;

type IntimateAction = typeof INTIMATE_ACTION_POOL[number];

// ─── Talk action pool ─────────────────────────────────────────────────────────

const TALK_ACTION_POOL = [
    'small_talk', 'share_news', 'vent', 'ask_opinion', 'reminisce',
    'discuss_work', 'trade_rumour', 'argue_mildly', 'give_advice', 'listen',
] as const;

// ─── Flirt action pool ────────────────────────────────────────────────────────

const FLIRT_ACTION_POOL = [
    'compliment_looks', 'hold_eye_contact', 'brush_hand', 'tease', 'lean_close',
    'lower_voice', 'imply_interest', 'playful_challenge', 'lingering_goodbye',
] as const;

// ─── Interaction type ─────────────────────────────────────────────────────────

export type NpcInteractionType = 'Talk' | 'Flirt' | 'Intimate' | 'Conflict';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function findNpc(state: GameState, npcId: string): NpcCharacter | undefined {
    return state.contacts.find(c => c.character.npcId === npcId)?.character;
}

function bondCount(npc: NpcCharacter, bond: BondType): number {
    return npc.npcRelationships.filter(r => r.bond === bond).length;
}

function weakestOfBond(npc: NpcCharacter, bond: BondType): NpcRelationship | undefined {
    return npc.npcRelationships
        .filter(r => r.bond === bond)
        .sort((a, b) => (a.trust + a.love) - (b.trust + b.love))[0];
}

/** Deterministic pseudo-random keyed to the two NPC ids and the current day. */
function stableRandom(id1: string, id2: string, day: number): number {
    let h = day * 2654435761;
    for (const ch of id1 + id2) h = Math.imul(h ^ ch.charCodeAt(0), 2246822519);
    return ((h >>> 0) / 0xFFFFFFFF);
}

/** Seeded Fisher-Yates sample — picks n distinct elements from arr. */
function seededSample<T>(arr: readonly T[], n: number, seed: number): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(seed * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
        seed = (seed * 9301 + 49297) % 233280 / 233280;
    }
    return copy.slice(0, n);
}

// ─── Personality score helper (0–40) ─────────────────────────────────────────

/**
 * Derives a social-activity score from personality fields.
 * All fields are still typed as `unknown` on HumanoidCharacter until the
 * spawn-engine barrel is wired; we cast safely and score 0 on unknown values.
 */
function personalityScore(npc: NpcCharacter): number {
    const p = npc.personality as {
        bigFive?: { extraversion?: string; openness?: string };
        trustBaseline?: string;
        emotionalStability?: string;
        loyaltyLevel?: string;
    } | null;

    let score = 0;

    // Extraversion (0-15)
    switch (p?.bigFive?.extraversion) {
        case 'HIGH':     score += 15; break;
        case 'MODERATE': score += 8;  break;
        case 'LOW':      score += 2;  break;
    }

    // Trust baseline (0-15)
    switch (p?.trustBaseline) {
        case 'NAIVE':    score += 15; break;
        case 'OPEN':     score += 12; break;
        case 'NEUTRAL':  score += 7;  break;
        case 'CAUTIOUS': score += 3;  break;
        case 'SUSPICIOUS': score += 0; break;
    }

    // Emotional stability (0-10) — stable NPCs maintain relationships more reliably
    switch (p?.emotionalStability) {
        case 'VERY_STABLE': score += 10; break;
        case 'STABLE':      score += 8;  break;
        case 'MODERATE':    score += 5;  break;
        case 'VOLATILE':    score += 2;  break;
        case 'UNSTABLE':    score += 0;  break;
    }

    return score; // max 40
}

// ─── Relationship pull helper (0–40) ─────────────────────────────────────────

/**
 * Derives a social-readiness score from the NPC's existing relationships.
 * Higher-depth bonds and bonds close to the 30-day decay cliff both add pull
 * (the NPC feels socially active or anxious about losing a connection).
 */
function relationshipPull(npc: NpcCharacter, currentDay: number): number {
    if (npc.npcRelationships.length === 0) return 0;

    // Bond depth weight — deeper bonds increase pull more
    const DEPTH_WEIGHT: Partial<Record<BondType, number>> = {
        [BondType.Devoted]:      8,
        [BondType.Love]:         7,
        [BondType.Owned]:        7,
        [BondType.Obsession]:    6,
        [BondType.Submissive]:   5,
        [BondType.HateLove]:     5,
        [BondType.CloseFriend]:  5,
        [BondType.Dependent]:    4,
        [BondType.Attachment]:   3,
        [BondType.Friend]:       3,
        [BondType.Crush]:        3,
        [BondType.Familiar]:     2,
        [BondType.Worshipful]:   2,
        [BondType.PureHate]:     2,
        [BondType.Acquaintance]: 1,
        [BondType.Transactional]: 1,
        [BondType.Broken]:       1,
        [BondType.Corrupted]:    1,
        [BondType.Stranger]:     0,
        [BondType.None]:         0,
    };

    let pull = 0;
    for (const rel of npc.npcRelationships) {
        const depthW = DEPTH_WEIGHT[rel.bond] ?? 0;
        const daysSinceLast = currentDay - rel.lastInteractionDay;

        // Recency bonus: interacted recently → NPC is socially active
        const recencyBonus = daysSinceLast < 7 ? 3 : daysSinceLast < 14 ? 1 : 0;

        // Urgency bonus: close to decay cliff → NPC is anxious about this bond
        const urgencyBonus = daysSinceLast >= DECAY_THRESHOLD - 5 ? 2 : 0;

        pull += depthW + recencyBonus + urgencyBonus;
    }

    // Normalise to 0–40 (cap at 40)
    return Math.min(pull, 40);
}

// ─── 1. Subset selection ──────────────────────────────────────────────────────

/**
 * Returns the npcIds of NPCs that will participate in today's social tick.
 *
 * Three-part score:
 *   personalityScore  (0-40) — how socially active this NPC naturally is
 *   relationshipPull  (0-40) — driven by existing bond depth and recency
 *   locationBonus     (0-20) — whether the NPC is in the player's location
 *
 * NPC is included if finalScore >= ACTIVE_THRESHOLD (25).
 * Hard isolation gate: NPCs with zero relationships are included only if they
 * share a scheduleId with at least one contact AND personalityScore >= ISOLATION_GATE.
 *
 * Service and protected NPCs are always excluded.
 */
export function selectActiveNpcs(state: GameState): string[] {
    const playerLocation = state.world.currentLocationId;
    const currentDay     = state.calendar.day;

    // Build a set of all scheduleIds that have at least one NPC (for isolation gate)
    const occupiedScheduleIds = new Set(
        state.contacts.map(c => c.character.scheduleId).filter(Boolean)
    );

    return state.contacts
        .filter(({ character: npc }) => {
            if (npc.isService || npc.isProtected) return false;

            const pScore  = personalityScore(npc);
            const rPull   = relationshipPull(npc, currentDay);
            const locBonus = npc.scheduleId === playerLocation ? 20 : 0;
            const final   = pScore + rPull + locBonus;

            // Isolation gate: no relationships → only tick if personality is high enough
            // and there is someone else in the same region to meet
            if (npc.npcRelationships.length === 0) {
                const sameRegionExists =
                    npc.scheduleId !== undefined &&
                    occupiedScheduleIds.has(npc.scheduleId) &&
                    state.contacts.some(
                        c => c.character.npcId !== npc.npcId &&
                            c.character.scheduleId === npc.scheduleId
                    );
                return sameRegionExists && pScore >= ISOLATION_GATE;
            }

            return final >= ACTIVE_THRESHOLD;
        })
        .map(({ character }) => character.npcId);
}

// ─── 2. Candidate scoring ─────────────────────────────────────────────────────

// Scoring weights for pickInteractionTarget
const W = {
    EXISTING_RELATION:    30,   // already have an entry in npcRelationships
    HIGH_STAKES_BOND:     25,   // bond is in HIGH_STAKES_BONDS
    SAME_LOCATION:        20,   // share scheduleId
    AFFECTION_COMPAT:     15,   // same affectionStyle
    TRUST_COMPAT:         10,   // both have open/naive trustBaseline
    LOYALTY_DEEPEN:       10,   // high-loyalty NPC scores existing bonds higher
    STRANGER_OPEN:        18,   // open+extraverted NPC scores a stranger positively
    DECAY_NEAR:          -20,   // bond within 5 days of decay cliff (deprioritise)
    CONFLICT_PULL:        20,   // PureHate / Broken bonds still pull (can't ignore enemies)
} as const;

/**
 * Scores a potential interaction target for a given subject NPC.
 * Returns null if the candidate is ineligible (same NPC, service NPC, or
 * the stranger-gate blocks the pair and the NPC isn't open enough).
 */
function scoreCandidate(
    subject: NpcCharacter,
    target: NpcCharacter,
    currentDay: number,
): number | null {
    if (subject.npcId === target.npcId) return null;
    if (target.isService)               return null;

    let score = 0;

    const existing = subject.npcRelationships.find(r => r.targetNpcId === target.npcId);

    if (existing) {
        score += W.EXISTING_RELATION;

        if (HIGH_STAKES_BONDS.has(existing.bond))  score += W.HIGH_STAKES_BOND;
        if (CONFLICT_BONDS.has(existing.bond))     score += W.CONFLICT_PULL;

        const daysSinceLast = currentDay - existing.lastInteractionDay;
        if (daysSinceLast >= DECAY_THRESHOLD - 5)  score += W.DECAY_NEAR;
    } else {
        // Stranger-gate — the subject must be open enough to cold-connect
        const p = subject.personality as {
            bigFive?: { extraversion?: string };
            trustBaseline?: string;
        } | null;
        const isOpen       = p?.trustBaseline === 'OPEN' || p?.trustBaseline === 'NAIVE';
        const isExtraverted = p?.bigFive?.extraversion === 'HIGH';

        if (isOpen && isExtraverted) {
            score += W.STRANGER_OPEN;
        } else {
            // Cold connection only possible when sharing a scheduleId
            if (subject.scheduleId !== target.scheduleId) return null;
        }
    }

    // Location proximity
    if (subject.scheduleId === target.scheduleId) score += W.SAME_LOCATION;

    // Affection style compatibility
    const sAff = (subject.social as { affectionStyle?: string } | null)?.affectionStyle;
    const tAff = (target.social  as { affectionStyle?: string } | null)?.affectionStyle;
    if (sAff && tAff && sAff === tAff) score += W.AFFECTION_COMPAT;

    // Trust baseline compatibility
    const sTrust = (subject.personality as { trustBaseline?: string } | null)?.trustBaseline;
    const tTrust = (target.personality  as { trustBaseline?: string } | null)?.trustBaseline;
    const openSet = new Set(['OPEN', 'NAIVE']);
    if (sTrust && tTrust && openSet.has(sTrust) && openSet.has(tTrust)) score += W.TRUST_COMPAT;

    // Loyalty modifier — high-loyalty NPCs prefer deepening existing bonds
    const loyalty = (subject.social as { loyaltyLevel?: string } | null)?.loyaltyLevel;
    if (loyalty === 'HIGH' || loyalty === 'ABSOLUTE') {
        if (existing) score += W.LOYALTY_DEEPEN;
        else          score -= W.LOYALTY_DEEPEN;
    }

    return score;
}

export function pickInteractionTarget(
    subject: NpcCharacter,
    state: GameState,
    currentDay: number,
): NpcCharacter | null {
    let best: NpcCharacter | null = null;
    let bestScore = -Infinity;

    for (const { character: candidate } of state.contacts) {
        const s = scoreCandidate(subject, candidate, currentDay);
        if (s === null) continue;
        if (s > bestScore) { bestScore = s; best = candidate; }
    }

    return best;
}

// ─── 3. Interaction type selection ───────────────────────────────────────────

/**
 * Picks the highest-applicable interaction type for a pair.
 * Priority: Intimate > Flirt > Conflict > Talk
 * Intimate and Flirt require same-location; Conflict replaces Talk for hostile bonds.
 */
function pickInteractionType(
    rel: NpcRelationship | null,
    subject: NpcCharacter,
    target: NpcCharacter,
    seed: number,
): NpcInteractionType {
    const bond          = rel?.bond ?? BondType.Stranger;
    const sameLocation  = subject.scheduleId === target.scheduleId;
    const bondStrength  = rel?.bondStrength ?? 0;

    // Conflict overrides everything for hostile bonds
    if (CONFLICT_BONDS.has(bond)) return 'Conflict';

    // Intimate gate: eligible bond + same location + probability check (30%-70%)
    if (INTIMATE_ELIGIBLE.has(bond) && sameLocation) {
        const intimateThreshold = 0.30 + (bondStrength / 100) * 0.40;
        if (seed < intimateThreshold) return 'Intimate';
    }

    // Flirt gate: eligible bond + same location + 40% flat chance
    if (FLIRT_ELIGIBLE.has(bond) && sameLocation && seed < 0.40) return 'Flirt';

    return 'Talk';
}

// ─── 4. Bond cap enforcement ──────────────────────────────────────────────────

/**
 * Ensures the NPC does not exceed BOND_CAPS for incomingBond.
 * If already at cap: the weakest bond of that type is downgraded to Acquaintance.
 */
function enforceBondCap(
    subject: NpcCharacter,
    incomingBond: BondType,
    _targetNpcId: string,
): { relationships: NpcRelationship[]; events: GameEvent[] } {
    const cap     = BOND_CAPS[incomingBond];
    const current = bondCount(subject, incomingBond);
    const events: GameEvent[] = [];

    if (current < cap) return { relationships: subject.npcRelationships, events };

    const weakest = weakestOfBond(subject, incomingBond);
    if (!weakest)   return { relationships: subject.npcRelationships, events };

    events.push({
        type:      'NPC_BOND_DOWNGRADED',
        subjectId: subject.npcId,
        targetId:  weakest.targetNpcId,
        fromBond:  incomingBond,
    });

    const relationships = subject.npcRelationships.map(r =>
        r.targetNpcId === weakest.targetNpcId
            ? { ...r, bond: BondType.Acquaintance }
            : r
    );

    return { relationships, events };
}

// ─── 5. Delta resolvers ───────────────────────────────────────────────────────

function resolveTalkDeltas(
    bond: BondType,
    seed: number,
): { trustDelta: number; loveDelta: number; bondStrengthDelta: number } {
    const j = () => (seed - 0.5) * 2; // jitter -1 to +1

    // Talk always grows trust a little; love is basically flat
    switch (bond) {
        case BondType.Friend:
        case BondType.CloseFriend:
        case BondType.Familiar:
            return { trustDelta: 3 + j(), loveDelta: 1 + j(), bondStrengthDelta: 2 };
        case BondType.Acquaintance:
        case BondType.Stranger:
            return { trustDelta: 2 + j(), loveDelta: 0,        bondStrengthDelta: 1 };
        case BondType.Dependent:
        case BondType.Attachment:
            return { trustDelta: 2 + j(), loveDelta: 1 + j(),  bondStrengthDelta: 2 };
        case BondType.Devoted:
        case BondType.Love:
            return { trustDelta: 3 + j(), loveDelta: 2 + j(),  bondStrengthDelta: 2 };
        case BondType.HateLove:
            return { trustDelta: 0 + j(), loveDelta: 1 + j(),  bondStrengthDelta: 1 };
        case BondType.Transactional:
        case BondType.Crush:
        case BondType.Worshipful:
        default:
            return { trustDelta: 1 + j(), loveDelta: 0,         bondStrengthDelta: 1 };
    }
}

function resolveFlirtDeltas(
    bond: BondType,
    seed: number,
): { trustDelta: number; loveDelta: number; bondStrengthDelta: number } {
    const j = () => (seed - 0.5) * 2;

    // Flirt: love climbs faster than trust; trust can dip slightly with jealous types
    switch (bond) {
        case BondType.Love:
        case BondType.Devoted:
            return { trustDelta: 2 + j(), loveDelta: 5 + j(), bondStrengthDelta: 3 };
        case BondType.Obsession:
            return { trustDelta: 1 + j(), loveDelta: 6 + j(), bondStrengthDelta: 3 };
        case BondType.HateLove:
            return { trustDelta: -1 + j(), loveDelta: 4 + j(), bondStrengthDelta: 2 };
        case BondType.Crush:
        case BondType.Attachment:
            return { trustDelta: 2 + j(), loveDelta: 4 + j(), bondStrengthDelta: 2 };
        case BondType.CloseFriend:
            return { trustDelta: 1 + j(), loveDelta: 3 + j(), bondStrengthDelta: 2 };
        case BondType.Worshipful:
            return { trustDelta: 1 + j(), loveDelta: 5 + j(), bondStrengthDelta: 2 };
        default:
            return { trustDelta: 1 + j(), loveDelta: 3 + j(), bondStrengthDelta: 1 };
    }
}

function resolveConflictDeltas(
    bond: BondType,
    seed: number,
): { trustDelta: number; loveDelta: number; bondStrengthDelta: number } {
    const j = () => (seed - 0.5) * 2;

    switch (bond) {
        case BondType.PureHate:
            return { trustDelta: -4 + j(), loveDelta: -1,        bondStrengthDelta: 1 };
        case BondType.Broken:
            return { trustDelta: -3 + j(), loveDelta: 0 + j(),   bondStrengthDelta: 0 };
        case BondType.Corrupted:
            return { trustDelta: -2 + j(), loveDelta: 1 + j(),   bondStrengthDelta: 1 };
        default:
            return { trustDelta: -2 + j(), loveDelta: 0,          bondStrengthDelta: 0 };
    }
}

/**
 * Intimate tick: 4 loops × 5 random actions — no per-action simulation.
 * Flat deltas computed once and scaled by loop count.
 */
function resolveIntimateDeltas(
    rel: NpcRelationship,
    subjectId: string,
    targetId: string,
    day: number,
): {
    trustDelta: number;
    loveDelta: number;
    bondStrengthDelta: number;
    corruptionDelta: number;
    actionsChosen: IntimateAction[][];
} {
    const loops: IntimateAction[][] = [];
    let seed = stableRandom(subjectId, targetId, day);

    for (let i = 0; i < INTIMATE_TICK_LOOPS; i++) {
        loops.push(seededSample(INTIMATE_ACTION_POOL, ACTIONS_PER_LOOP, seed) as IntimateAction[]);
        seed = (seed * 9301 + 49297) % 233280 / 233280;
    }

    // Devoted/Owned earn more trust — power-dynamic reinforcement
    const isExclusive    = rel.bond === BondType.Devoted || rel.bond === BondType.Owned;
    const trustPerLoop   = isExclusive ? 4 : 2;
    const lovePerLoop    = 5;
    const bondStrPerLoop = 3;
    // HateLove intimacy is more destabilising → higher corruption tick
    const corruptPerLoop = rel.bond === BondType.HateLove ? 1.5 : 0.75;

    return {
        trustDelta:        trustPerLoop     * INTIMATE_TICK_LOOPS,
        loveDelta:         lovePerLoop      * INTIMATE_TICK_LOOPS,
        bondStrengthDelta: bondStrPerLoop   * INTIMATE_TICK_LOOPS,
        corruptionDelta:   corruptPerLoop   * INTIMATE_TICK_LOOPS,
        actionsChosen:     loops,
    };
}

// ─── 6. Bond evolution ────────────────────────────────────────────────────────

/**
 * Derives the new BondType after a tick based on updated scalars.
 * Only upgrades — downgrade happens via decay or cap-collision, never here.
 *
 * Ladder (ascending):
 *   Stranger → Acquaintance → Familiar → Friend → CloseFriend
 *            ↘ (love pressure builds) → Crush
 *   CloseFriend + love pressure → Attachment → Dependent → Love → Devoted
 *   Low-trust + high-love → Obsession
 *   Negative trust + rising love → HateLove
 *   Very negative trust + flat love → PureHate
 *   Dependent + power-imbalance proxy → Submissive
 *
 * Player-exclusive check: if npc.playerBondType already holds one of
 * PLAYER_EXCLUSIVE_BONDS, the NPC cannot evolve into that same type with
 * another NPC — the bond stays at its current level instead.
 */
function evolveBond(rel: NpcRelationship, subject: NpcCharacter): BondType {
    const { bond, trust, love, bondStrength } = rel;

    // allow() passes the candidate through the player-exclusive gate;
    // if the NPC already holds this bond type with the player it stays put.
    const allow = (candidate: BondType): BondType =>
        isBlockedByPlayerBond(subject, candidate) ? bond : candidate;

    // ─ Social-tier ladder
    if (bond === BondType.Stranger      && trust > 5)                                      return allow(BondType.Acquaintance);
    if (bond === BondType.Acquaintance  && trust > 15 && love >= 0)                        return allow(BondType.Familiar);
    if (bond === BondType.Familiar      && trust > 25 && love > 5)                         return allow(BondType.Friend);
    if (bond === BondType.Friend        && trust > 40 && love > 15)                        return allow(BondType.CloseFriend);

    // ─ Crush branch: trust building but love outpaces it
    if (bond === BondType.Acquaintance  && love > 20  && trust < 30)                       return allow(BondType.Crush);
    if (bond === BondType.Familiar      && love > 30  && trust < 40)                       return allow(BondType.Crush);
    if (bond === BondType.Friend        && love > 40  && trust < 50)                       return allow(BondType.Crush);

    // ─ Intensity ladder from CloseFriend / Crush
    if ((bond === BondType.CloseFriend || bond === BondType.Crush)
        && trust > 30 && love > 25)                                                        return allow(BondType.Attachment);
    if (bond === BondType.Attachment    && trust > 40 && love > 35)                        return allow(BondType.Dependent);
    if (bond === BondType.Dependent     && trust > 55 && love > 50)                        return allow(BondType.Love);
    // Devoted is player-exclusive — allow() blocks this if NPC is already Devoted to player
    if (bond === BondType.Love          && trust > 70 && love > 70 && bondStrength > 60)   return allow(BondType.Devoted);

    // ─ Obsession branch: love very high, trust lagging
    if (bond === BondType.Attachment    && love > 60  && trust < 40)                       return allow(BondType.Obsession);
    if (bond === BondType.Crush         && love > 55  && trust < 30)                       return allow(BondType.Obsession);

    // ─ Transactional as alternative entry from social tiers (purpose-driven)
    if (bond === BondType.Acquaintance  && trust > 20 && love <= 5)                        return allow(BondType.Transactional);
    if (bond === BondType.Familiar      && trust > 30 && love <= 10)                       return allow(BondType.Transactional);

    // ─ HateLove: negative trust but love persisting
    if ((bond === BondType.Transactional || bond === BondType.Acquaintance)
        && trust < -10 && love > 20)                                                       return allow(BondType.HateLove);

    // ─ PureHate: trust deeply negative, love near zero
    if ((bond === BondType.Transactional || bond === BondType.Acquaintance)
        && trust < -30 && love < 5)                                                        return allow(BondType.PureHate);

    // ─ Submissive: dependent with power-imbalance — allow() blocks if NPC is already Submissive to player
    if (bond === BondType.Dependent     && love > 60  && bondStrength > 50 && trust < 40) return allow(BondType.Submissive);

    return bond; // no change
}

// ─── 7. Core interaction resolver ────────────────────────────────────────────

/**
 * Resolves one interaction between a subject and target NPC.
 * Returns the NpcDailyInteraction log entry and any emitted game events.
 * Does NOT mutate contacts[] — applyInteractionLog() handles that immutably.
 */
export function resolveInteraction(
    subjectId: string,
    targetId: string,
    state: GameState,
): { log: NpcDailyInteraction; events: GameEvent[] } | null {
    const subject = findNpc(state, subjectId);
    const target  = findNpc(state, targetId);
    if (!subject || !target) return null;

    const day      = state.calendar.day;
    const seed     = stableRandom(subjectId, targetId, day);
    const existing = subject.npcRelationships.find(r => r.targetNpcId === targetId) ?? null;
    const events: GameEvent[] = [];

    const interactionType = pickInteractionType(existing, subject, target, seed);

    let trustDelta        = 0;
    let loveDelta         = 0;
    let bondStrengthDelta = 0;
    let corruptionDelta   = 0;

    switch (interactionType) {
        case 'Intimate': {
            if (!existing) break; // intimate requires an existing bond; fall through to Talk
            const r = resolveIntimateDeltas(existing, subjectId, targetId, day);
            trustDelta        = r.trustDelta;
            loveDelta         = r.loveDelta;
            bondStrengthDelta = r.bondStrengthDelta;
            corruptionDelta   = r.corruptionDelta;
            events.push({ type: 'NPC_INTIMATE_TICK', subjectId, targetId });
            break;
        }
        case 'Flirt': {
            const bond = existing?.bond ?? BondType.Stranger;
            const d    = resolveFlirtDeltas(bond, seed);
            trustDelta        = d.trustDelta;
            loveDelta         = d.loveDelta;
            bondStrengthDelta = d.bondStrengthDelta;

            // Jealousy spike: subject holds another high-stakes bond with someone else
            if (existing && HIGH_STAKES_BONDS.has(existing.bond)) {
                const rivalId = subject.npcRelationships.find(
                    r => r.bond === existing.bond && r.targetNpcId !== targetId
                )?.targetNpcId;
                if (rivalId && seed > 0.8) {
                    events.push({ type: 'NPC_JEALOUSY_SPIKE', subjectId, targetId, rivalId });
                }
            }
            break;
        }
        case 'Conflict': {
            const bond = existing?.bond ?? BondType.PureHate;
            const d    = resolveConflictDeltas(bond, seed);
            trustDelta        = d.trustDelta;
            loveDelta         = d.loveDelta;
            bondStrengthDelta = d.bondStrengthDelta;
            events.push({ type: 'NPC_CONFLICT', subjectId, targetId });
            break;
        }
        case 'Talk':
        default: {
            const bond = existing?.bond ?? BondType.Stranger;
            const d    = resolveTalkDeltas(bond, seed);
            trustDelta        = d.trustDelta;
            loveDelta         = d.loveDelta;
            bondStrengthDelta = d.bondStrengthDelta;
            break;
        }
    }

    return {
        log: {
            subjectNpcId:       subjectId,
            targetNpcId:        targetId,
            wasIntimate:        interactionType === 'Intimate',
            trustDelta,
            loveDelta,
            bondStrengthDelta,
            corruptionDelta,
            day,
        },
        events,
    };
}

// ─── 8. Apply log → contacts[] ────────────────────────────────────────────────

/**
 * Applies all NpcDailyInteraction entries from state.npcInteractionLog to
 * contacts[] immutably. Handles:
 *   - Creating new NpcRelationship entries (starts at Stranger)
 *   - Clamping scalars to their valid ranges
 *   - Bond evolution via evolveBond()
 *   - Bond cap enforcement (emits NPC_BOND_DOWNGRADED events)
 *   - MAX_RELATIONSHIPS slot cap check on new entries
 *
 * Clears npcInteractionLog after applying.
 */
export function applyInteractionLog(
    state: GameState,
): { state: GameState; events: GameEvent[] } {
    const allEvents: GameEvent[] = [];

    // Shallow-copy each NpcCharacter — lets us mutate arrays without touching state
    const npcMap = new Map<string, NpcCharacter>(
        state.contacts.map(c => [c.character.npcId, { ...c.character }])
    );

    for (const entry of state.npcInteractionLog) {
        const subject = npcMap.get(entry.subjectNpcId);
        const target  = npcMap.get(entry.targetNpcId);
        if (!subject || !target) continue;

        const existingIdx = subject.npcRelationships.findIndex(
            r => r.targetNpcId === entry.targetNpcId
        );

        if (existingIdx === -1) {
            // New relationship — enforce slot cap
            if (subject.npcRelationships.length >= MAX_RELATIONSHIPS) continue;

            // All new connections start as Stranger; evolveBond() will promote them
            const initialBond = BondType.Stranger;

            const { relationships: capped, events: capEvents } = enforceBondCap(
                subject, initialBond, entry.targetNpcId
            );
            allEvents.push(...capEvents);
            subject.npcRelationships = capped;

            const newRel: NpcRelationship = {
                targetNpcId:          entry.targetNpcId,
                bond:                 initialBond,
                trust:                Math.max(-100, Math.min(100, entry.trustDelta)),
                love:                 Math.max(-100, Math.min(100, entry.loveDelta)),
                bondStrength:         Math.max(0,    Math.min(100, entry.bondStrengthDelta)),
                lastInteractionDay:   entry.day,
                interactionCount:     1,
                intimateEncounterCount: entry.wasIntimate ? 1 : 0,
            };

            // Attempt immediate evolution (e.g. a very warm first meeting)
            // Pass subject so evolveBond can enforce player-exclusive bond blocks
            const evolvedBond = evolveBond(newRel, subject);
            subject.npcRelationships = [...subject.npcRelationships, { ...newRel, bond: evolvedBond }];

            allEvents.push({
                type:      'NPC_RELATIONSHIP_FORMED',
                subjectId: entry.subjectNpcId,
                targetId:  entry.targetNpcId,
                bond:      evolvedBond,
            });

        } else {
            const rel = subject.npcRelationships[existingIdx];

            const updatedRel: NpcRelationship = {
                ...rel,
                trust:        Math.max(-100, Math.min(100, rel.trust + entry.trustDelta)),
                love:         Math.max(-100, Math.min(100, rel.love  + entry.loveDelta)),
                bondStrength: Math.max(0,    Math.min(100, rel.bondStrength + entry.bondStrengthDelta)),
                lastInteractionDay:   entry.day,
                interactionCount:     rel.interactionCount + 1,
                intimateEncounterCount: entry.wasIntimate
                    ? rel.intimateEncounterCount + 1
                    : rel.intimateEncounterCount,
            };

            // Bond evolution + cap enforcement if type changes
            // Pass subject so player-exclusive bond blocks are respected
            const evolvedBond = evolveBond(updatedRel, subject);
            if (evolvedBond !== rel.bond) {
                const { relationships: capped, events: capEvents } = enforceBondCap(
                    subject, evolvedBond, entry.targetNpcId
                );
                allEvents.push(...capEvents);
                subject.npcRelationships = capped;
            }

            const finalRel: NpcRelationship = { ...updatedRel, bond: evolvedBond };
            const rels = [...subject.npcRelationships];
            rels[existingIdx] = finalRel;
            subject.npcRelationships = rels;
        }

        npcMap.set(entry.subjectNpcId, subject);
    }

    // Rebuild contacts[] — entries for NPCs that didn't tick pass through unchanged
    const contacts = state.contacts.map(c => ({
        ...c,
        character: npcMap.get(c.character.npcId) ?? c.character,
    }));

    return {
        state:  { ...state, contacts, npcInteractionLog: [] },
        events: allEvents,
    };
}

// ─── 9. Decay and cap enforcement ─────────────────────────────────────────────

/**
 * Drops stale relationships (>= DECAY_THRESHOLD days since last interaction) and
 * trims the list to MAX_RELATIONSHIPS by removing the weakest entries.
 * Emits NPC_RELATIONSHIP_DROPPED for every removed entry.
 * Called after applyInteractionLog() so it operates on fully-updated data.
 */
export function runDecayAndCapEnforcement(
    state: GameState,
): { state: GameState; events: GameEvent[] } {
    const currentDay = state.calendar.day;
    const allEvents: GameEvent[] = [];

    const contacts = state.contacts.map(({ character: npc, ...rest }) => {
        let rels = npc.npcRelationships;

        // Drop stale entries
        const stale = rels.filter(r => currentDay - r.lastInteractionDay >= DECAY_THRESHOLD);
        for (const r of stale) {
            allEvents.push({ type: 'NPC_RELATIONSHIP_DROPPED', subjectId: npc.npcId, targetId: r.targetNpcId });
        }
        rels = rels.filter(r => currentDay - r.lastInteractionDay < DECAY_THRESHOLD);

        // Trim to MAX_RELATIONSHIPS — drop lowest combined score first
        if (rels.length > MAX_RELATIONSHIPS) {
            const sorted = [...rels].sort(
                (a, b) => (a.trust + a.love + a.bondStrength) - (b.trust + b.love + b.bondStrength)
            );
            const toDrop  = sorted.slice(0, rels.length - MAX_RELATIONSHIPS);
            const dropIds = new Set(toDrop.map(r => r.targetNpcId));
            for (const r of toDrop) {
                allEvents.push({ type: 'NPC_RELATIONSHIP_DROPPED', subjectId: npc.npcId, targetId: r.targetNpcId });
            }
            rels = rels.filter(r => !dropIds.has(r.targetNpcId));
        }

        return { ...rest, character: { ...npc, npcRelationships: rels } };
    });

    return { state: { ...state, contacts }, events: allEvents };
}

// ─── 10. Day-end entry point ──────────────────────────────────────────────────

/**
 * Called by calendarEngine.runDayEndTick() at step 9.
 *
 * Flow:
 *   a) selectActiveNpcs()         → three-part score subset
 *   b) pickInteractionTarget()    → best candidate per active NPC
 *   c) resolveInteraction()       → pick type, compute deltas, emit events
 *   d) applyInteractionLog()      → immutable write-back to contacts[]
 *   e) runDecayAndCapEnforcement  → drop stale / trim excess
 */
export function runNpcSocialTick(
    state: GameState,
): { state: GameState; events: GameEvent[] } {
    const activeIds = selectActiveNpcs(state);
    const allEvents: GameEvent[] = [];
    const log: NpcDailyInteraction[] = [];

    for (const subjectId of activeIds) {
        const subject = findNpc(state, subjectId);
        if (!subject) continue;

        const target = pickInteractionTarget(subject, state, state.calendar.day);
        if (!target) continue;

        const result = resolveInteraction(subjectId, target.npcId, state);
        if (!result) continue;

        log.push(result.log);
        allEvents.push(...result.events);
    }

    const stateWithLog: GameState = {
        ...state,
        npcInteractionLog: [...state.npcInteractionLog, ...log],
    };

    const { state: afterApply, events: applyEvents } = applyInteractionLog(stateWithLog);
    allEvents.push(...applyEvents);

    const { state: afterDecay, events: decayEvents } = runDecayAndCapEnforcement(afterApply);
    allEvents.push(...decayEvents);

    return { state: afterDecay, events: allEvents };
}