/**
 * intimacyCatalog.ts
 * Static catalog of intimacy positions and actions.
 * TODO (Tasks 6.1–6.3): populate with actual position and action data.
 */

import type { IntimacyPosition, IntimacyAction } from '../engines/intimacyEngine';

export const POSITIONS: Record<string, IntimacyPosition> = {
  // Example:
  // 'missionary': {
  //   id: 'missionary', name: 'Missionary',
  //   penetrationTargetsUsed: ['VAGINA'],
  //   allowedActionIds: ['thrust_slow', 'thrust_fast', 'kiss', 'grope_breast'],
  //   requiredClothingState: 'FULLY_UNDRESSED',
  // },
};

export const ACTIONS: Record<string, IntimacyAction> = {
  // Example:
  // 'thrust_slow': {
  //   id: 'thrust_slow', name: 'Slow Thrust',
  //   tecRequirement: 5, stimulationIntensity: 15,
  //   penetrationTarget: 'VAGINA', bodyPartTargeted: 'vagina',
  //   staminalCostPlayer: 5, staminalCostPartner: 8,
  // },
};
