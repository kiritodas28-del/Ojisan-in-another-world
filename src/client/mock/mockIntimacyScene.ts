/**
 * mockIntimacyScene.ts
 * An IntimacyScene in RUNNING state with Elara as partner.
 * Used to develop and test IntimacyView without a running backend.
 * Task UI-2.3
 */

import type { IntimacyScene } from '../../engines/intimacyEngine';

export const mockIntimacyScene: IntimacyScene = {
  sceneId:                    'scene-001',
  startType:                  'CONSENSUAL',
  partnerNpcId:               'npc-elara',
  activePositionId:           'missionary',
  activeActionId:             'thrust_slow',
  occupiedPenetrationTargets: ['VAGINA'],
  turnCount:                  5,
  status:                     'RUNNING',
  pleasurePeak:               42,
  orgasmCount:                0,
  kinksTriggered:             1,
  painExcess:                 0,
};
