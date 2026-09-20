/**
 * tamingEngine.ts
 * Phase 23 — Monster Taming System.
 *
 * Flow summary:
 *   1. CAPTURE_MONSTER intent (post-combat, player chose to capture):
 *        captureMonster() — guards manor tier / cell capacity / rope in inventory;
 *        consumes 1 rope; appends HoldingCell to manor.holdingCells; emits CAPTIVE_ADDED.
 *
 *   2. INTERACT_CAPTIVE intent (daily interaction from manor):
 *        interactWithCaptive() — guards daily cap (1/day);
 *        computes progressDelta from resistance profile;
 *        gates taming completion on relationship status (Close / Devoted / Confidant /
 *        Infatuated / Lover / Bonded — requires High or VeryHigh trust band);
 *        emits CAPTIVE_INTERACTION; if progress >= 100 calls _convertToNpc().
 *
 *   3. _convertToNpc() (internal):
 *        Builds an NpcCharacter from the HoldingCell snapshot;
 *        calls tryAddContact(); removes the cell; emits MONSTER_TAMED.
 *
 *   4. resetCaptiveDailyInteractions() (called by calendarEngine day-end step 7):
 *        Resets interactionCountToday = 0 on all cells.
 *
 * Resistance-modulated progress:
 *   resistanceProfile.baselineResistance maps to a progress-per-interaction scalar:
 *     0–20   → +16 (very compliant / already submissive)
 *     21–40  → +12
 *     41–60  → +8  (baseline — most humanoid monsters)
 *     61–80  → +5
 *     81–100 → +3  (extremely resistant)
 *   These values are tuned so a tier-3 (baseline) captive takes 13 interactions
 *   (~13 in-game days minimum) to reach 100, assuming the relationship gate is met.
 *
 * Relationship gate (must be satisfied before progress can reach 100):
 *   getTrustBand(cell.relationshipTrust) must return 'High' or 'VeryHigh'.
 *   This corresponds to RelationshipStatus: Close | Devoted | Confidant |
 *   Infatuated | Lover | Bonded.
 *   Without this gate, progress is capped at 95 regardless of interaction count.
 *
 * All mutations return new state (immutable pattern consistent with other engines).
 */

import { v4 as uuidv4 } from 'uuid';
import type {
  GameState,
  GameEvent,
  HoldingCell,
  EnemyHumanoidCharacter,
  NpcCharacter,
} from '../state/gameState';
import { hasFeature, holdingCellCapacity, suiteCapacity, assignSuite } from './manorEngine';
import { hasItem, removeItem, getItemDef } from './economyEngine';
import { tryAddContact } from './npcPopulationEngine';
import { getTrustBand, getRelationshipStatus } from './relationshipEngine';

// ─── Captive action type ──────────────────────────────────────────────────────
// Mirrors the sub-actions available in normal NPC interaction but scoped to
// a captive in a holding cell.  All actions accumulate trust/love directly on
// HoldingCell.relationshipTrust/Love rather than on a contacts[] NpcCharacter.
//
// TALK     : social talk; +3 trust, +1 love; cap 3/day (uses flirtCountToday proxy).
// TOUCH    : light physical contact; +2 trust, +2 love; cap 3/day.
// FLIRT    : flirtation; +0 trust, +4 love; cap 3/day; can backfire (-1 trust) at low trust.
// GIVE_GIFT: present a GIFT-type item; +10 trust, +15 love; item is consumed.
// FIGHT    : provoke/resist-test; -3 trust, -2 love on captive; used to break stalemates
//            or roleplay dominance; rare use case.
// INTIMATE : initiates an intimacy scene using the captive's profile snapshot.
//            Gate: relationshipTrust >= 25 (High band). Scene is seeded exactly
//            like a POST_DEFEAT scene (sceneStartType = 'CAPTIVE').
// RELEASE  : Release or graduate the captive.
//            - If taming gate is met AND a free suite exists: moves captive to
//              a normal suite room and adds her to contacts (same as MONSTER_TAMED).
//            - Otherwise: releases unconditionally (captive walks free; cell vacated;
//              no NpcCharacter created). Player may choose this at any time.
export type CaptiveActionType =
  | 'TALK'
  | 'TOUCH'
  | 'FLIRT'
  | 'GIVE_GIFT'
  | 'FIGHT'
  | 'INTIMATE'
  | 'RELEASE';

// ─── Progress constants ────────────────────────────────────────────────────────

/** Maximum taming progress before the relationship gate is satisfied. */
const PROGRESS_CAP_WITHOUT_GATE = 95;

/** Progress delta per INTERACT_CAPTIVE action, keyed by resistance tier. */
const RESISTANCE_PROGRESS_TABLE: [maxResistance: number, delta: number][] = [
  [20,  16],
  [40,  12],
  [60,   8],
  [80,   5],
  [100,  3],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Derives the baselineResistance value from a captive's sexualPsychology.
 * Falls back to 60 (baseline) if the profile is not yet resolved (Task 3a.8).
 */
function deriveBaselineResistance(enemy: EnemyHumanoidCharacter): number {
  const psych = enemy.sexualPsychology as {
    resistanceProfile?: { baselineResistance?: number };
  } | null;
  return psych?.resistanceProfile?.baselineResistance ?? 60;
}

/**
 * Maps a baselineResistance value to a progress delta per interaction.
 */
function resistanceToDelta(resistance: number): number {
  for (const [maxR, delta] of RESISTANCE_PROGRESS_TABLE) {
    if (resistance <= maxR) return delta;
  }
  return RESISTANCE_PROGRESS_TABLE[RESISTANCE_PROGRESS_TABLE.length - 1][1];
}

/**
 * Returns true when the relationship status in a cell satisfies the taming gate.
 * Gate: trust must be in 'High' or 'VeryHigh' band (>= 25 trust).
 * This maps to: Close | Devoted | Confidant | Infatuated | Lover | Bonded.
 */
function isTamingGateSatisfied(cell: HoldingCell): boolean {
  const band = getTrustBand(cell.relationshipTrust);
  return band === 'High' || band === 'VeryHigh';
}

/**
 * Finds the index of a holding cell by cellId in manor.holdingCells.
 * Returns -1 if not found.
 */
function findCellIndex(state: GameState, cellId: string): number {
  return state.manor.holdingCells.findIndex(c => c.cellId === cellId);
}

// ─── captureMonster ───────────────────────────────────────────────────────────

/**
 * Captures a defeated humanoid enemy and places them in a holding cell.
 *
 * Guards (throws descriptive Error on failure — dispatcher catches and narrativises):
 *   - 'holding_cells' manor feature must be unlocked (tier >= 3).
 *   - At least one holding cell must be free.
 *   - Player must have at least 1 'rope' in inventory.
 *   - The enemy must be an ENEMY_HUMANOID (monsters/bosses cannot be captured).
 *
 * On success:
 *   - Consumes 1 rope from player inventory.
 *   - Assigns the next available cellId ('cell_<N>' where N is the current count).
 *   - Appends a new HoldingCell to manor.holdingCells.
 *   - Emits CAPTIVE_ADDED.
 */
export function captureMonster(
  state:  GameState,
  enemy:  EnemyHumanoidCharacter,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const events: GameEvent[] = [];

  // Guard: feature unlocked
  if (!hasFeature(state.manor, 'holding_cells')) {
    throw new Error(
      'Holding cells are not yet built. Upgrade the manor to tier 3 to capture monsters.',
    );
  }

  // Guard: enemy type
  if (enemy.characterType !== 'ENEMY_HUMANOID') {
    throw new Error('Only humanoid enemies can be captured.');
  }

  // Guard: cell capacity
  const capacity = holdingCellCapacity(state.manor);
  const occupied = state.manor.holdingCells.length;
  if (occupied >= capacity) {
    throw new Error(
      `All holding cells are full (${occupied}/${capacity}). Release or tame a captive first.`,
    );
  }

  // Guard: rope in inventory
  if (!hasItem(state, 'rope')) {
    throw new Error('You need a rope to capture a monster.');
  }

  // Consume 1 rope
  const ropeResult = removeItem(state, 'rope', 1, 'USED');
  state  = ropeResult.state;
  events.push(...ropeResult.events);

  // Build the new holding cell
  const cellId: string = `cell_${occupied}`;
  const newCell: HoldingCell = {
    cellId,
    capturedCharacter:     enemy,
    captureDay:            state.calendar.day,
    tamingProgress:        0,
    interactionCountToday: 0,
    relationshipTrust:     0,
    relationshipLove:      0,
  };

  state = {
    ...state,
    manor: {
      ...state.manor,
      holdingCells: [...state.manor.holdingCells, newCell],
    },
  };

  events.push({
    type:      'CAPTIVE_ADDED',
    cellId,
    enemyId:   enemy.id,
    enemyName: enemy.name,
  });

  return {
    state,
    events,
    narrative: `You bind ${enemy.name} with rope and drag them to the holding cells. They'll be kept there until tamed.`,
  };
}

// ─── interactWithCaptive ──────────────────────────────────────────────────────

/**
 * Daily interaction with a captive to build trust and advance taming progress.
 *
 * Guards:
 *   - cellId must exist in manor.holdingCells.
 *   - interactionCountToday must be 0 (once per captive per day).
 *
 * Progress logic:
 *   - delta = resistanceToDelta(baselineResistance of captured enemy).
 *   - If the relationship gate is NOT satisfied, progress is hard-capped at 95.
 *   - Trust/love accrue at 3/2 per interaction (modest; player should also
 *     gift and talk to them via future dialogue tree to satisfy the gate faster).
 *   - When progress reaches 100: calls _convertToNpc() inline.
 *
 * Emits CAPTIVE_INTERACTION (and MONSTER_TAMED on completion).
 */
export function interactWithCaptive(
  state:  GameState,
  cellId: string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const events: GameEvent[] = [];

  const cellIdx = findCellIndex(state, cellId);
  if (cellIdx === -1) {
    throw new Error(`No holding cell with id '${cellId}'.`);
  }

  const cell = state.manor.holdingCells[cellIdx];

  // Guard: daily cap
  if (cell.interactionCountToday >= 1) {
    return {
      state,
      events,
      narrative: `You've already spent time with ${cell.capturedCharacter.name} today. Come back tomorrow.`,
    };
  }

  // Compute progress delta from resistance profile
  const resistance = deriveBaselineResistance(cell.capturedCharacter);
  const baseDelta  = resistanceToDelta(resistance);

  // Apply trust/love accrual
  const newTrust = Math.min(100, cell.relationshipTrust + 3);
  const newLove  = Math.min(100, cell.relationshipLove  + 2);

  // Gate check: cap at 95 unless relationship threshold is met
  const gateSatisfied = isTamingGateSatisfied({ ...cell, relationshipTrust: newTrust, relationshipLove: newLove });
  const newProgress   = gateSatisfied
    ? Math.min(100, cell.tamingProgress + baseDelta)
    : Math.min(PROGRESS_CAP_WITHOUT_GATE, cell.tamingProgress + baseDelta);

  const updatedCell: HoldingCell = {
    ...cell,
    tamingProgress:        newProgress,
    interactionCountToday: 1,
    relationshipTrust:     newTrust,
    relationshipLove:      newLove,
  };

  // Write updated cell back into state
  const updatedCells = [...state.manor.holdingCells];
  updatedCells[cellIdx] = updatedCell;
  state = { ...state, manor: { ...state.manor, holdingCells: updatedCells } };

  events.push({
    type:          'CAPTIVE_INTERACTION',
    cellId,
    progressDelta: baseDelta,
    newProgress,
  });

  // Narrative snippet for progress cap hint
  let narrative: string;
  if (!gateSatisfied && newProgress >= PROGRESS_CAP_WITHOUT_GATE) {
    narrative = `${cell.capturedCharacter.name} watches you with guarded eyes. ` +
      `Progress has stalled — you'll need to earn deeper trust before she'll open up further.`;
  } else if (newProgress >= 100) {
    // Taming complete — convert inline
    const convResult = _convertToNpc(state, events, cellId, updatedCell);
    return {
      state:     convResult.state,
      events:    convResult.events,
      narrative: convResult.narrative,
    };
  } else {
    const pct = Math.round(newProgress);
    narrative = `You spend time with ${cell.capturedCharacter.name}. ` +
      `She seems slightly less hostile. [Taming: ${pct}/100]`;
  }

  return { state, events, narrative };
}

// ─── _convertToNpc ────────────────────────────────────────────────────────────

/**
 * Internal: converts a fully-tamed captive into a permanent NpcCharacter.
 *
 * Steps:
 *   1. Build a minimal NpcCharacter from the EnemyHumanoidCharacter snapshot,
 *      carrying over all full spawn-engine profile fields.
 *   2. Set trust/love from the cell's accumulated relationship tallies.
 *   3. Mark originType = 'tamed_monster'.
 *   4. Call tryAddContact(); on cap-failure emit a narrative warning but still vacate cell.
 *   5. Remove the HoldingCell from manor.holdingCells.
 *   6. Emit MONSTER_TAMED.
 */
function _convertToNpc(
  state:    GameState,
  events:   GameEvent[],
  cellId:   string,
  cell:     HoldingCell,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const enemy  = cell.capturedCharacter;
  const npcId  = `tamed_${uuidv4()}`;

  const tamedNpc: NpcCharacter = {
    // Base Character fields
    id:                  npcId,
    name:                enemy.name,
    characterType:       'NPC',
    vitals:              { ...enemy.vitals },
    stats:               { ...enemy.stats },
    activeStatusEffects: [],

    // Full spawn-engine profile — carried from capture snapshot (typed unknown until 3a.8)
    gender:           enemy.gender,
    race:             enemy.race,
    raceFeatures:     enemy.raceFeatures,
    bodyType:         enemy.bodyType,
    skin:             enemy.skin,
    face:             enemy.face,
    hair:             enemy.hair,
    measurements:     enemy.measurements,
    physicalDetail:   enemy.physicalDetail,
    sexualPhysiology: enemy.sexualPhysiology,
    personality:      enemy.personality,
    sexualPsychology: enemy.sexualPsychology,
    voice:            enemy.voice,
    social:           enemy.social,
    background:       enemy.background,
    history:          enemy.history,
    dynamicState:     null as unknown as NpcCharacter['dynamicState'],

    // NPC identity flags
    npcId,
    hasBeenIntroduced: true,   // player already knows them from captivity
    scheduleId:        undefined,
    isProtected:       false,
    isService:         false,
    originType:        'tamed_monster',

    // Relationship — seeded from taming tallies
    trust:            cell.relationshipTrust,
    love:             cell.relationshipLove,
    flirtCountToday:  0,
    touchCountToday:  0,
    playerBondType:   undefined,
    npcRelationships: [],

    // Companion progression — starts at 0; player can add them to party later
    companionLevel: 0,
    companionXP:    0,
  };

  // Add to contacts (cap enforcement)
  const addResult = tryAddContact(state.contacts, tamedNpc, state.settings);
  if (addResult.added) {
    state = { ...state, contacts: addResult.contacts };
  }

  // Remove cell regardless of contact-add outcome
  state = {
    ...state,
    manor: {
      ...state.manor,
      holdingCells: state.manor.holdingCells.filter(c => c.cellId !== cellId),
    },
  };

  events.push({
    type:     'MONSTER_TAMED',
    cellId,
    newNpcId: npcId,
    name:     enemy.name,
  });

  const addNote = addResult.added
    ? `She is now free to roam the manor and can be invited to join your party.`
    : `The contact list is full — ${enemy.name} has been released but no contact record was created.`;

  return {
    state,
    events,
    narrative: `After countless days of patient effort, ${enemy.name}'s walls finally crumble. ` +
      `She looks at you differently now — not as a captor, but as someone she trusts. ${addNote}`,
  };
}

// ─── Day-end reset ────────────────────────────────────────────────────────────

/**
 * Resets interactionCountToday on all holding cells.
 * Called by calendarEngine.runDayEndTick() step 7b (after social counters reset).
 * Short-circuits when no cells are held.
 */
export function resetCaptiveDailyInteractions(state: GameState): GameState {
  if (state.manor.holdingCells.length === 0) return state;
  return {
    ...state,
    manor: {
      ...state.manor,
      holdingCells: state.manor.holdingCells.map(cell => {
        if (
          cell.interactionCountToday === 0 &&
          cell.talkCountToday        === 0 &&
          cell.touchCountToday       === 0 &&
          cell.flirtCountToday       === 0
        ) return cell;
        return {
          ...cell,
          interactionCountToday: 0,
          talkCountToday:        0,
          touchCountToday:       0,
          flirtCountToday:       0,
        };
      }),
    },
  };
}

// ─── Read helpers ─────────────────────────────────────────────────────────────

/** Return all current holding cells. */
export function getHoldingCells(state: GameState): HoldingCell[] {
  return state.manor.holdingCells;
}

/** Return a single holding cell by id, or undefined. */
export function getHoldingCell(state: GameState, cellId: string): HoldingCell | undefined {
  return state.manor.holdingCells.find(c => c.cellId === cellId);
}

/** Return the number of free holding cells at the current manor tier. */
export function freeHoldingCells(state: GameState): number {
  return Math.max(0, holdingCellCapacity(state.manor) - state.manor.holdingCells.length);
}

// ─── resolveCaptiveAction ─────────────────────────────────────────────────────

const SOCIAL_DAILY_CAP = 3;

/**
 * Resolve a specific interaction with a captive in a holding cell.
 *
 * All social actions (TALK / TOUCH / FLIRT / GIVE_GIFT / FIGHT) accumulate
 * directly on HoldingCell.relationshipTrust/Love.  They do NOT advance
 * tamingProgress — that is handled exclusively by INTERACT_CAPTIVE (the general
 * daily interaction).  Social actions exist to satisfy the relationship gate
 * faster so that INTERACT_CAPTIVE can push past the 95-cap.
 *
 * Action effects:
 *   TALK      +3 trust +1 love  cap 3/day  always safe
 *   TOUCH     +2 trust +2 love  cap 3/day  always safe
 *   FLIRT     +0 trust +4 love  cap 3/day  backfires (-2 trust) when trust < -25
 *   GIVE_GIFT +10 trust +15 love no daily cap  consumes 1 GIFT-type item
 *   FIGHT     -3 trust -2 love  no daily cap  always available; narrative only
 *   INTIMATE  gate: trust >= 25 (High band); seeds scene via dispatcher caller;
 *             this function returns a flag so dispatcher can hand off to
 *             intimacyEngine.startScene()  (wired via Task 3c.4)
 *   RELEASE   see releaseOrGraduateCaptive()
 *
 * Returns `intimateReady: true` when action === 'INTIMATE' and gate passes,
 * so the dispatcher can route to the intimacy engine without tamingEngine
 * importing intimacyEngine (avoids circular deps).
 */
export function resolveCaptiveAction(
  state:   GameState,
  cellId:  string,
  action:  CaptiveActionType,
  itemId?: string,
): {
  state:         GameState;
  events:        GameEvent[];
  narrative:     string;
  intimateReady: boolean;   // true only when action==='INTIMATE' and gate passes
} {
  const events: GameEvent[] = [];
  let intimateReady = false;

  const cellIdx = findCellIndex(state, cellId);
  if (cellIdx === -1) throw new Error(`No holding cell '${cellId}'.`);

  let cell = state.manor.holdingCells[cellIdx];
  const name = cell.capturedCharacter.name;

  // ── RELEASE ───────────────────────────────────────────────────────────────
  // Delegate entirely to releaseOrGraduateCaptive; return its result.
  if (action === 'RELEASE') {
    return { ...releaseOrGraduateCaptive(state, cellId), intimateReady: false };
  }

  // ── INTIMATE ──────────────────────────────────────────────────────────────
  // Gate: trust must be in High or VeryHigh band (>= 25).
  // We do NOT start the scene here — we signal intimateReady so the dispatcher
  // can call intimacyEngine.startScene() with the captive's character snapshot.
  if (action === 'INTIMATE') {
    if (cell.relationshipTrust < 25) {
      return {
        state,
        events,
        narrative: `${name} recoils at the suggestion. She doesn't trust you enough yet.`,
        intimateReady: false,
      };
    }
    // Signal the dispatcher to hand off to intimacyEngine.
    return {
      state,
      events,
      narrative: ``,  // dispatcher fills narrative after scene start
      intimateReady: true,
    };
  }

  // ── FIGHT ─────────────────────────────────────────────────────────────────
  // No daily cap. Always available. Applies relationship penalties.
  if (action === 'FIGHT') {
    const newTrust = Math.max(-100, cell.relationshipTrust - 3);
    const newLove  = Math.max(-100, cell.relationshipLove  - 2);
    cell = { ...cell, relationshipTrust: newTrust, relationshipLove: newLove };
    const updatedCells = [...state.manor.holdingCells];
    updatedCells[cellIdx] = cell;
    state = { ...state, manor: { ...state.manor, holdingCells: updatedCells } };
    const statusLabel = getRelationshipStatus(newTrust, newLove);
    return {
      state,
      events,
      narrative: `You lean on her — testing her limits. ${name}'s eyes harden. She won't forget this. [${statusLabel}]`,
      intimateReady: false,
    };
  }

  // ── GIVE_GIFT ─────────────────────────────────────────────────────────────
  // No daily cap. Requires a GIFT-type item in inventory.
  if (action === 'GIVE_GIFT') {
    if (!itemId) throw new Error('GIVE_GIFT requires itemId.');
    let def;
    try { def = getItemDef(itemId); } catch {
      return { state, events, narrative: `You fumble for a gift but come up empty.`, intimateReady: false };
    }
    if (def.type !== 'GIFT') {
      return {
        state,
        events,
        narrative: `${def.name} isn't the kind of thing you'd give as a gift.`,
        intimateReady: false,
      };
    }
    if (!hasItem(state, itemId)) {
      return {
        state,
        events,
        narrative: `You don't have a ${def.name} to give.`,
        intimateReady: false,
      };
    }
    // Consume item
    const removeResult = removeItem(state, itemId, 1, 'GIVEN');
    state  = removeResult.state;
    events.push(...removeResult.events);
    // Reload cell after state mutation
    cell = state.manor.holdingCells[cellIdx];
    const newTrust = Math.min(100, cell.relationshipTrust + 10);
    const newLove  = Math.min(100, cell.relationshipLove  + 15);
    cell = { ...cell, relationshipTrust: newTrust, relationshipLove: newLove };
    const updatedCells = [...state.manor.holdingCells];
    updatedCells[cellIdx] = cell;
    state = { ...state, manor: { ...state.manor, holdingCells: updatedCells } };
    const statusLabel = getRelationshipStatus(newTrust, newLove);
    return {
      state,
      events,
      narrative: `You slide ${def.name} through the bars. ${name} stares at it for a long moment, then quietly accepts it. [${statusLabel}]`,
      intimateReady: false,
    };
  }

  // ── TALK / TOUCH / FLIRT (capped social actions) ─────────────────────────
  type CounterKey = 'talkCountToday' | 'touchCountToday' | 'flirtCountToday';
  const CONFIG: Record<'TALK' | 'TOUCH' | 'FLIRT', {
    counterKey:  CounterKey;
    trustDelta:  number;
    loveDelta:   number;
    narrative:   (n: string, capped: boolean) => string;
  }> = {
    TALK: {
      counterKey: 'talkCountToday',
      trustDelta: 3,
      loveDelta:  1,
      narrative: (n, capped) => capped
        ? `${n} gives you a flat look. There's nothing left to say today.`
        : `You sit with ${n} for a while. She doesn't say much, but she listens.`,
    },
    TOUCH: {
      counterKey: 'touchCountToday',
      trustDelta: 2,
      loveDelta:  2,
      narrative: (n, capped) => capped
        ? `${n} pulls back. You've touched her enough today.`
        : `A careful, steady hand. ${n} holds still — the smallest concession.`,
    },
    FLIRT: {
      counterKey: 'flirtCountToday',
      trustDelta: 0,
      loveDelta:  4,
      narrative: (n, capped) => capped
        ? `${n} rolls her eyes. Your charm is wearing thin today.`
        : `You flash a grin at ${n}. She looks away, but the corner of her mouth betrays her.`,
    },
  };

  const cfg = CONFIG[action as 'TALK' | 'TOUCH' | 'FLIRT'];
  const currentCount = cell[cfg.counterKey];

  if (currentCount >= SOCIAL_DAILY_CAP) {
    return {
      state,
      events,
      narrative: cfg.narrative(name, true),
      intimateReady: false,
    };
  }

  let trustDelta = cfg.trustDelta;
  let loveDelta  = cfg.loveDelta;

  // FLIRT backfire: when captive trust is in Low band, flirting reads as mockery
  if (action === 'FLIRT' && cell.relationshipTrust < -25) {
    trustDelta = -2;
    loveDelta  = 1;
  }

  const newTrust = Math.max(-100, Math.min(100, cell.relationshipTrust + trustDelta));
  const newLove  = Math.max(-100, Math.min(100, cell.relationshipLove  + loveDelta));

  cell = {
    ...cell,
    [cfg.counterKey]:  currentCount + 1,
    relationshipTrust: newTrust,
    relationshipLove:  newLove,
  };

  const updatedCells = [...state.manor.holdingCells];
  updatedCells[cellIdx] = cell;
  state = { ...state, manor: { ...state.manor, holdingCells: updatedCells } };

  const statusLabel = getRelationshipStatus(newTrust, newLove);
  const narrative = (action === 'FLIRT' && trustDelta < 0)
    ? `${name} narrows her eyes. That went the wrong way. [${statusLabel}]`
    : `${cfg.narrative(name, false)} [${statusLabel}]`;

  return { state, events, narrative, intimateReady: false };
}

// ─── releaseOrGraduateCaptive ─────────────────────────────────────────────────

/**
 * Release a captive from their holding cell, or graduate them to a suite.
 *
 * Graduation path (preferred):
 *   - Taming gate satisfied (trust band High or VeryHigh, i.e. trust >= 25)
 *   - tamingProgress >= 100  OR  player explicitly chose to release after gate
 *   - A free suite exists at the current manor tier
 *   → Converts captive to NpcCharacter via _convertToNpc(); assigns them to
 *     the first free suite; emits MONSTER_TAMED + SUITE_ASSIGNED.
 *
 * Unconditional release path:
 *   - Player chose RELEASE before taming is complete, OR no free suite exists.
 *   → Vacates the cell with no NpcCharacter created.  Emits CAPTIVE_RELEASED.
 *
 * The cell is always removed from manor.holdingCells on return.
 */
export function releaseOrGraduateCaptive(
  state:  GameState,
  cellId: string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const events: GameEvent[] = [];

  const cellIdx = findCellIndex(state, cellId);
  if (cellIdx === -1) throw new Error(`No holding cell '${cellId}'.`);

  const cell = state.manor.holdingCells[cellIdx];
  const name = cell.capturedCharacter.name;

  const gateMet    = isTamingGateSatisfied(cell);
  const progMet    = cell.tamingProgress >= 100;
  const suiteCap   = suiteCapacity(state.manor);
  const occupied   = Object.keys(state.manor.suiteAssignments).length;
  const freeSuite  = suiteCap === Infinity || occupied < suiteCap;

  // ── Graduation ─────────────────────────────────────────────────────────
  if (gateMet && progMet && freeSuite) {
    // _convertToNpc removes the cell and adds the contact internally
    const convResult = _convertToNpc(state, events, cellId, cell);
    state = convResult.state;

    // Assign the new NPC to the first available suite
    const newNpcId = convResult.events
      .find((e): e is Extract<GameEvent, { type: 'MONSTER_TAMED' }> => e.type === 'MONSTER_TAMED')
      ?.newNpcId;

    if (newNpcId) {
      const suiteIndex = occupied + 1;
      const suiteId    = `suite_${suiteIndex}`;
      try {
        const assignResult = assignSuite(state, suiteId, newNpcId);
        state = assignResult.state;
        events.push(...assignResult.events);
      } catch {
        // Suite assignment failed (edge case); NPC still added to contacts
      }
    }

    return {
      state,
      events: convResult.events.concat(events.filter(e => e.type !== 'MONSTER_TAMED')),
      narrative: convResult.narrative +
        ` Her new room in the manor is ready and waiting.`,
    };
  }

  // ── Gate met but no free suite — inform player ─────────────────────────
  if (gateMet && progMet && !freeSuite) {
    return {
      state,
      events,
      narrative: `${name} is ready to leave the cell, but every room is taken. ` +
        `Vacate a suite first, or build a larger manor.`,
    };
  }

  // ── Unconditional release — before taming is complete ─────────────────
  state = {
    ...state,
    manor: {
      ...state.manor,
      holdingCells: state.manor.holdingCells.filter(c => c.cellId !== cellId),
    },
  };

  events.push({ type: 'CAPTIVE_RELEASED', cellId, enemyName: name } as GameEvent);

  const partial = gateMet
    ? `${name} looks back once before disappearing into the dark. She trusted you — you let her go.`
    : `You unlatch the cell. ${name} doesn't hesitate — she bolts the moment she's free.`;

  return { state, events, narrative: partial };
}
