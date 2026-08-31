/**
 * monsters.ts
 * Static monster type definitions and boss profiles.
 * TODO (Tasks 5.2, 5.7): populate with actual monster and boss data.
 */

import type { MonsterTypeDef } from '../engines/enemySpawnEngine';

export const MONSTER_TYPE_DEFS: Record<string, MonsterTypeDef> = {
  // Example:
  // 'Beast': {
  //   type: 'Beast',
  //   baseStr: 12, baseAgi: 10, baseWis: 4, baseDef: 8, baseLck: 5, baseHp: 40,
  //   aiTendency: 'Aggressive',
  //   sexualAttackEligible: false,
  //   isHumanoid: false,
  // },
};

// Boss profiles are hand-crafted and loaded separately.
// Add boss data files to src/data/bosses/
