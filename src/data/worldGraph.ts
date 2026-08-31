/**
 * worldGraph.ts
 * Static world map — 81 nodes and 92 edges (per PRD §4.15).
 * TODO: populate with actual world data.
 */

import type { WorldNode, WorldEdge, RegionMonsterProfile } from '../engines/worldEngine';

export const WORLD_NODES: Record<string, WorldNode> = {
  // Example:
  // 'village_square': {
  //   id: 'village_square', name: 'Village Square', regionId: 'region_start',
  //   isSafe: true, npcClasses: ['villager', 'merchant'],
  // },
};

export const WORLD_EDGES: WorldEdge[] = [
  // Example:
  // { fromId: 'village_square', toId: 'forest_entrance', travelActions: 1 },
];

export const REGION_MONSTER_PROFILES: Record<string, RegionMonsterProfile> = {
  // Example:
  // 'region_start': {
  //   regionId: 'region_start',
  //   monsterTypes: ['Beast', 'MiasmaCorrupted'],
  //   levelRange: { min: 1, max: 5 },
  // },
};
