/**
 * testSpawn.ts
 * Quick dev script to smoke-test the spawn engine.
 * Run with: npx ts-node --project src/tsconfig.json testSpawn.ts
 *
 * Not part of the game runtime — for development verification only.
 */

import { spawnPopulation } from './src/spawn-engine/spawnEngine';
import { POPULATION_CONFIGS } from './src/spawn-engine/config/populationConfig';

const chars = spawnPopulation(POPULATION_CONFIGS.STANDARD, 2, 0.5);
console.log(JSON.stringify(chars, null, 2));
