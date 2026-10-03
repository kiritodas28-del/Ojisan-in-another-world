/**
 * titheEngine.ts
 * Task 26.4–26.6 — Aether Tithe weekly quota system.
 *
 * The Tithe is a mandatory weekly gold payment to the Enclave, activated by the
 * first Enclave main-quest event. Once active, the player owes quotaGoldPerWeek
 * every 7 calendar days. Failure to pay accrues overdueBy and eventually triggers
 * a TITHE_OVERDUE event at day-end (reputation penalty in all known regions).
 *
 * tickTithe() is called by calendarEngine.runDayEndTick() after Step 8 (date
 * increment). It is a no-op when quotaGoldPerWeek === 0 (system inactive).
 *
 * The PAY_TITHE intent is handled in dispatcher.ts; it calls payTithe() below.
 */

import type { GameState, GameEvent, RegionId } from '../state/gameState';

// How many days between mandatory tithe payments.
const TITHE_PERIOD_DAYS = 7;

// Reputation penalty per region when the tithe is overdue at day-end.
const OVERDUE_REP_PENALTY = -20;

// ─── tickTithe ────────────────────────────────────────────────────────────────

/**
 * Called once per day-end by calendarEngine.
 * Short-circuits when the tithe is inactive (quotaGoldPerWeek === 0).
 *
 * Logic:
 *   - If today is a multiple of TITHE_PERIOD_DAYS from the last paid day,
 *     AND the player has not paid yet → increment overdueBy.
 *   - When overdueBy >= 1: emit TITHE_OVERDUE for every known region.
 *   - Applies a flat OVERDUE_REP_PENALTY per region for each overdue day.
 */
export function tickTithe(state: GameState): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const { tithe, calendar } = state;

  // Inactive until the Enclave quest activates it.
  if (!tithe || tithe.quotaGoldPerWeek === 0) return { state, events };

  const daysSincePaid = calendar.day - tithe.lastPaidDay;

  // Due again when daysSincePaid >= TITHE_PERIOD_DAYS.
  if (daysSincePaid < TITHE_PERIOD_DAYS) return { state, events };

  // Tithe is overdue — count extra days.
  const newOverdueBy = tithe.overdueBy + 1;

  // Apply reputation penalty in every region where the player has a standing.
  const regionIds = Object.keys(state.reputation) as RegionId[];
  for (const regionId of regionIds) {
    events.push({
      type:              'TITHE_OVERDUE',
      regionId,
      daysOverdue:       newOverdueBy,
      reputationPenalty: OVERDUE_REP_PENALTY,
    });
    // Apply the penalty directly (reputation engine not imported to avoid circular dep).
    const newScore = Math.max(-999, (state.reputation[regionId] ?? 0) + OVERDUE_REP_PENALTY);
    state = {
      ...state,
      reputation: { ...state.reputation, [regionId]: newScore },
    };
  }

  state = {
    ...state,
    tithe: { ...tithe, overdueBy: newOverdueBy },
  };

  return { state, events };
}

// ─── payTithe ─────────────────────────────────────────────────────────────────

/**
 * Called by the PAY_TITHE intent handler in dispatcher.ts.
 * Deducts quotaGoldPerWeek gold, resets lastPaidDay and overdueBy.
 * Throws a descriptive Error on insufficient gold or inactive system.
 */
export function payTithe(
  state: GameState,
  regionId: string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const events: GameEvent[] = [];
  const { tithe } = state;

  if (!tithe || tithe.quotaGoldPerWeek === 0) {
    throw new Error('The Enclave Tithe system has not yet been activated.');
  }

  const amount = tithe.quotaGoldPerWeek;
  if (state.player.gold < amount) {
    throw new Error(
      `You need ${amount}g to pay the Aether Tithe. You have ${state.player.gold}g.`,
    );
  }

  state = {
    ...state,
    player: { ...state.player, gold: state.player.gold - amount },
    tithe: {
      ...tithe,
      lastPaidDay: state.calendar.day,
      overdueBy:   0,
    },
  };

  events.push({ type: 'TITHE_PAID', regionId, goldPaid: amount });
  events.push({ type: 'GOLD_CHANGED', delta: -amount, newAmount: state.player.gold });

  return {
    state,
    events,
    narrative: `You pay ${amount}g to the Enclave Altar. The tithe register marks you compliant for another week.`,
  };
}

// ─── activateTithe ────────────────────────────────────────────────────────────

/**
 * Called by the quest engine when the first Enclave main-quest event fires.
 * Sets the initial weekly quota and anchors the payment clock to today.
 */
export function activateTithe(
  state: GameState,
  quotaGoldPerWeek: number,
): GameState {
  return {
    ...state,
    tithe: {
      lastPaidDay:      state.calendar.day,
      quotaGoldPerWeek: Math.max(0, quotaGoldPerWeek),
      overdueBy:        0,
    },
  };
}
