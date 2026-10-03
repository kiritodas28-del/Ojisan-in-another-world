/**
 * miniGameEngine.ts
 * Tasks 26.16–26.20 — Mini-game stubs + LocationFeatureKey schema.
 *
 * Four mini-games are authoring stubs, each producing a WIN / LOSE / DRAW
 * result and a gold delta. Full gameplay mechanics are deferred to Phase 25
 * lore data authoring. The engine exposes:
 *
 *   canStartMiniGame(state, featureKey) → boolean (guard check)
 *   startMiniGame(state, featureKey)    → emits MINI_GAME_STARTED
 *   resolveMiniGame(state, featureKey, playerInput?)
 *     → { result, goldDelta, narrative, events }
 *
 * Feature–intent mapping (for the dispatcher):
 *   'fishing'   → FISH intent (Task 26.16)
 *   'gambling'  → GAMBLE intent (Task 26.17)
 *   'arena'     → ARENA intent (Task 26.18)
 *   'onsen'     → ONSEN intent (Task 26.19)
 */

import type { GameState, GameEvent, LocationFeatureKey } from '../state/gameState';

// ─── Guard ────────────────────────────────────────────────────────────────────

/**
 * Returns true when the current node carries the given feature key.
 * Used by the dispatcher before routing a mini-game intent.
 */
export function canStartMiniGame(
  state:      GameState,
  featureKey: LocationFeatureKey,
): boolean {
  const { WORLD_NODES } = (() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require('../data/worldGraph') as {
        WORLD_NODES: import('../state/gameState').WorldNode[];
      };
    } catch {
      return { WORLD_NODES: [] };
    }
  })();

  const currentNode = WORLD_NODES.find(n => n.id === state.world.currentNodeId);
  return currentNode?.features?.includes(featureKey) ?? false;
}

// ─── Start ────────────────────────────────────────────────────────────────────

export function startMiniGame(
  state:      GameState,
  featureKey: LocationFeatureKey,
): { state: GameState; events: GameEvent[]; narrative: string } {
  if (!canStartMiniGame(state, featureKey)) {
    throw new Error(`There is no ${featureKey} facility at this location.`);
  }
  const events: GameEvent[] = [
    { type: 'MINI_GAME_STARTED', featureKey, nodeId: state.world.currentNodeId },
  ];
  const narrativeByFeature: Record<LocationFeatureKey, string> = {
    fishing:    'You find a quiet spot by the water and cast your line.',
    gambling:   'You take a seat at the game table. The dealer nods.',
    arena:      'The arena gates open. The crowd roars.',
    onsen:      'You sink into the steaming water. The tension in your muscles eases.',
    shrine:     'You approach the shrine and offer a quiet prayer.',
    market:     'You browse the stalls, eye drawn to what\'s on offer.',
    smithy:     'The forge glows. The smith nods you in.',
    alchemy_lab: 'You step into the lab and survey the equipment.',
  };
  return {
    state,
    events,
    narrative: narrativeByFeature[featureKey] ?? `You begin ${featureKey}.`,
  };
}

// ─── Resolve ──────────────────────────────────────────────────────────────────

export type MiniGameOutcome = 'WIN' | 'LOSE' | 'DRAW';

export interface MiniGameResult {
  state:     GameState;
  events:    GameEvent[];
  narrative: string;
  outcome:   MiniGameOutcome;
  goldDelta: number;
}

/**
 * Stub resolver — random outcome weighted by feature type.
 * Full mechanics deferred to Phase 25 lore data authoring.
 *
 * playerInput is reserved for future skill checks (e.g. fishing skill, bet amount).
 */
export function resolveMiniGame(
  state:       GameState,
  featureKey:  LocationFeatureKey,
  _playerInput?: unknown,
): MiniGameResult {
  const events: GameEvent[] = [];

  // Simple random stub until Phase 25 authoring.
  const roll = Math.random();

  const outcome: MiniGameOutcome =
    featureKey === 'onsen' ? 'WIN'   // onsen always "wins" — it's restorative
    : roll < 0.45 ? 'WIN'
    : roll < 0.75 ? 'LOSE'
    : 'DRAW';

  // Gold delta by feature + outcome
  const goldDeltaTable: Record<LocationFeatureKey, Record<MiniGameOutcome, number>> = {
    fishing:     { WIN: 30,  LOSE: 0,   DRAW: 10  },
    gambling:    { WIN: 100, LOSE: -50, DRAW: 0   },
    arena:       { WIN: 80,  LOSE: -20, DRAW: 20  },
    onsen:       { WIN: 0,   LOSE: 0,   DRAW: 0   },
    shrine:      { WIN: 0,   LOSE: 0,   DRAW: 0   },
    market:      { WIN: 0,   LOSE: 0,   DRAW: 0   },
    smithy:      { WIN: 0,   LOSE: 0,   DRAW: 0   },
    alchemy_lab: { WIN: 0,   LOSE: 0,   DRAW: 0   },
  };

  const goldDelta = goldDeltaTable[featureKey]?.[outcome] ?? 0;

  // Apply gold change
  if (goldDelta !== 0) {
    state = {
      ...state,
      player: { ...state.player, gold: Math.max(0, state.player.gold + goldDelta) },
    };
    events.push({ type: 'GOLD_CHANGED', delta: goldDelta, newAmount: state.player.gold });
  }

  // Onsen: restore stamina
  if (featureKey === 'onsen') {
    const newStamina = Math.min(
      state.player.vitals.stamina.max,
      state.player.vitals.stamina.current + 40,
    );
    state = {
      ...state,
      player: {
        ...state.player,
        vitals: {
          ...state.player.vitals,
          stamina: { ...state.player.vitals.stamina, current: newStamina },
        },
      },
    };
  }

  events.push({ type: 'MINI_GAME_ENDED', featureKey, outcome, goldDelta });

  const narrativeByOutcome: Record<MiniGameOutcome, string> = {
    WIN:  featureKey === 'fishing'  ? `Your line goes taut — a fine catch. (+${goldDelta}g)`
        : featureKey === 'gambling' ? `The dice fall your way. The dealer pays out. (+${goldDelta}g)`
        : featureKey === 'arena'    ? `You floor your opponent. The crowd erupts. (+${goldDelta}g)`
        : featureKey === 'onsen'    ? `The heat works its way into your bones. You feel restored.`
        : `You succeed at ${featureKey}.`,
    LOSE: featureKey === 'fishing'  ? `Nothing bites today.`
        : featureKey === 'gambling' ? `The house takes your coin. (${goldDelta}g)`
        : featureKey === 'arena'    ? `You go down hard. The crowd jeers. (${goldDelta}g)`
        : `You fail at ${featureKey}.`,
    DRAW: `A draw. No gold changes hands.`,
  };

  return {
    state,
    events,
    narrative: narrativeByOutcome[outcome],
    outcome,
    goldDelta,
  };
}
