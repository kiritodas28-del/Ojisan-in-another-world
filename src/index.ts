/**
 * index.ts — Spawn engine public API barrel
 *
 * Re-exports everything a consumer (src/engines/) needs from the spawn engine.
 * Import from here rather than from individual files inside Project/.
 */

export { Character, spawnPopulation, MaleCharacter, FemaleCharacter } from '../src/spawn-engine/spawnEngine';
export { POPULATION_CONFIGS } from '../src/spawn-engine/config/populationConfig';
export * from '../src/spawn-engine/types/enums';
export * from '../src/spawn-engine/character/bodyTypes';
export * from '../src/spawn-engine/character/physicalCore';
export * from '../src/spawn-engine/character/sexualPhysiology';
export * from '../src/spawn-engine/character/psychologyCore';
export * from '../src/spawn-engine/character/historyProfile';
export * from '../src/spawn-engine/character/dynamicState';
export * from '../src/spawn-engine/generator/ageBodyProfile';
export * from '../src/spawn-engine/character/raceProfiles';
export * from '../src/spawn-engine/encounter/patches';
