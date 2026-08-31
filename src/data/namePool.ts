/**
 * namePool.ts
 * Gendered NPC name pools per race.
 * TODO (Task 4.1): populate with actual name lists.
 */

import type { Race } from '../../spawn-engine/enums';

export type NamePool = {
  male: string[];
  female: string[];
};

export const NAME_POOLS: Partial<Record<Race, NamePool>> = {
  // Example:
  // Human: {
  //   male:   ['Aldric', 'Bram', 'Corvin', 'Dain', 'Elan'],
  //   female: ['Aelith', 'Brynn', 'Ceres', 'Dara', 'Elara'],
  // },
  // FoxGirl: {
  //   male:   ['Kitsuo', 'Renki', 'Shiro'],
  //   female: ['Koharu', 'Suzume', 'Yukiko'],
  // },
};

export function drawName(race: Race, sex: 'male' | 'female'): string {
  const pool = NAME_POOLS[race];
  if (!pool || pool[sex].length === 0) return `${race}_${sex}_${Math.floor(Math.random() * 1000)}`;
  return pool[sex][Math.floor(Math.random() * pool[sex].length)];
}
