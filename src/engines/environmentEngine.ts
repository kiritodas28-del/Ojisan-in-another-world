/**
 * environmentEngine.ts  — Phase 24
 * Generic regional weather / environmental hazard system.
 *
 * Design principles:
 *  - Each region has one active WeatherCondition; changed once per in-game day.
 *  - WeatherCondition → WeatherEffect[] mapping lives in src/data/weatherCatalog.ts
 *    (lore-specific names and tuning; engine is catalog-agnostic).
 *  - activeEffects on EnvironmentState is the pre-resolved list for the
 *    player's current region; engines read it directly without a second lookup.
 *  - Equipment durability is tracked per itemId (equipped items only).
 *    SALTFOG/UNDERWATER_PRESSURE degrade metal slots 1pt/day; at 0 → BROKEN.
 *  - All functions are pure: receive state, return { state, events }.
 */

import type {
  GameState, GameEvent, RegionId,
  EnvironmentState, WeatherCondition, WeatherEffect, EquipmentSlot,
} from '../state/gameState';

// ─── Catalog interface (implemented in src/data/weatherCatalog.ts) ───────────
// Engine imports the resolved effects; catalog maps WeatherCondition -> effects.
export interface WeatherCatalogEntry {
  condition:   WeatherCondition;
  effects:     WeatherEffect[];
  // Probability weight for random advancement (relative, not absolute percent).
  weight:      number;
  // Labels for display; game-specific names belong here, not in the engine.
  label:       string;
  description: string;
}

// ─── Default initial environment state ───────────────────────────────────────
export function createDefaultEnvironmentState(): EnvironmentState {
  return { weather: {}, activeEffects: [], equipmentDurability: {} };
}

// ─── Advance weather for all regions at day-start ────────────────────────────
/**
 * Called by calendarEngine.runDayEndTick() step 0 (before other ticks).
 * catalog: full WeatherCatalogEntry[] (injected by caller so engine stays pure).
 * seed: deterministic seed for this day (use calendar.day as default).
 */
export function advanceWeather(
  state:   GameState,
  regionIds: RegionId[],
  catalog:  WeatherCatalogEntry[],
  seed:    number,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  let   newWeather = { ...state.environment.weather };

  let rngSeed = seed;
  for (const regionId of regionIds) {
    rngSeed += 1;
    // Phase 35c.2: scale each weather entry's weight by the seasonal encounter-rate
    // multiplier before the roll. SUMMER biases toward higher-activity weather (×1.2);
    // RAINY suppresses encounter intensity (×0.8). A uniform scale keeps relative
    // distribution proportional; per-entry season biasing can be added to the catalog later.
    const seasonMult    = state.seasonModifiers.encounterRateMultiplier;
    const scaledCatalog = seasonMult === 1.0
      ? catalog
      : catalog.map(e => ({ ...e, weight: e.weight * seasonMult }));
    const next          = _weightedWeatherRoll(scaledCatalog, rngSeed);
    const prev      = newWeather[regionId] ?? 'CLEAR';
    newWeather[regionId] = next;
    if (prev !== next) {
      events.push({ type: 'WEATHER_CHANGED', regionId, from: prev, to: next });
    }
  }

  // Recompute activeEffects for the player's current region.
  const currentRegion = state.world.currentNodeId;
  const activeCondition = newWeather[currentRegion] ?? 'CLEAR';
  const activeEffects   = _resolveEffects(catalog, activeCondition);

  return {
    state: { ...state, environment: { ...state.environment, weather: newWeather, activeEffects } },
    events,
  };
}

// ─── Re-resolve active effects when player changes region ────────────────────
/**
 * Called by worldEngine when TRAVEL_NODE_REACHED fires.
 * No weather change event: effects just update silently.
 */
export function syncActiveEffects(
  state:   GameState,
  catalog: WeatherCatalogEntry[],
): GameState {
  const currentRegion    = state.world.currentNodeId;
  const activeCondition  = state.environment.weather[currentRegion] ?? 'CLEAR';
  const activeEffects    = _resolveEffects(catalog, activeCondition);
  return { ...state, environment: { ...state.environment, activeEffects } };
}

// ─── Equipment durability tick (day-end) ─────────────────────────────────────
/**
 * Called by calendarEngine.runDayEndTick() step 8c.
 * Degrades equipped items whose slot is marked degradable by the active weather.
 */
export function tickEquipmentDurability(
  state: GameState,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const degradingEffects = state.environment.activeEffects.filter(e => e.degradesEquipment);
  if (degradingEffects.length === 0) return { state, events };

  const equippedItems = state.player.equipped; // Partial<Record<EquipmentSlot, string>>
  const newDurability = { ...state.environment.equipmentDurability };

  for (const effect of degradingEffects) {
    const targetSlot = effect.degradationSlot as EquipmentSlot | undefined;
    const slotsToCheck: EquipmentSlot[] = targetSlot
      ? [targetSlot]
      : (Object.keys(equippedItems) as EquipmentSlot[]);

    for (const slot of slotsToCheck) {
      const itemId = equippedItems[slot];
      if (!itemId) continue;

      const current = newDurability[itemId] ?? 100;
      const next    = Math.max(0, current - 1); // -1 durability per day per degrading effect
      newDurability[itemId] = next;

      events.push({ type: 'EQUIPMENT_DEGRADED', itemId, slot, newDurability: next });

      if (next === 0) {
        events.push({ type: 'EQUIPMENT_BROKEN', itemId, slot });
      }
    }
  }

  return {
    state: { ...state, environment: { ...state.environment, equipmentDurability: newDurability } },
    events,
  };
}

// ─── Read helpers ─────────────────────────────────────────────────────────────
/** Returns the additive modifier for a stat in the current environment (e.g. -50 for -50%). */
export function getWeatherModifier(state: GameState, statKey: string): number {
  return state.environment.activeEffects
    .filter(e => e.stat === statKey)
    .reduce((acc, e) => acc + e.modifier, 0);
}

export function getEquipmentDurability(state: GameState, itemId: string): number {
  return state.environment.equipmentDurability[itemId] ?? 100;
}

/** True when the item is broken (durability === 0). */
export function isItemBroken(state: GameState, itemId: string): boolean {
  return (state.environment.equipmentDurability[itemId] ?? 100) === 0;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────
function _weightedWeatherRoll(catalog: WeatherCatalogEntry[], seed: number): WeatherCondition {
  const totalWeight = catalog.reduce((s, e) => s + e.weight, 0);
  // Simple LCG from seed
  const rand = ((seed * 1664525 + 1013904223) >>> 0) / 0xFFFFFFFF;
  let   cumulative = 0;
  for (const entry of catalog) {
    cumulative += entry.weight / totalWeight;
    if (rand < cumulative) return entry.condition;
  }
  return catalog[catalog.length - 1].condition;
}

function _resolveEffects(catalog: WeatherCatalogEntry[], condition: WeatherCondition): WeatherEffect[] {
  return catalog.find(e => e.condition === condition)?.effects ?? [];
}
