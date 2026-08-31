/**
 * testSpawn.ts
 * Quick dev script to smoke-test the spawn engine.
 * Run with: cd Project && npx ts-node ../testSpawn.ts
 *
 * Not part of the game runtime — for development verification only.
 */

import { spawnPopulation } from './spawn-engine/spawnEngine';
import { POPULATION_CONFIGS } from './spawn-engine/populationConfig';

const chars = spawnPopulation(POPULATION_CONFIGS.STANDARD, 2, 0.5);
console.log(JSON.stringify(chars, null, 2));
