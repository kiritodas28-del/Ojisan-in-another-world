/**
 * mockIntimacyScene.ts
 * An IntimacyScene in RUNNING state with Elara as partner.
 * Used to develop and test IntimacyView without a running backend.
 * Task UI-2.3 — updated to match full IntimacyScene schema (Phase 6 + faint/life-force extension).
 *
 * Scenario: CONSENSUAL scene, turn 5, missionary position.
 * Elara is mid-arousal; some squirt buildup; player cumStorage partially full.
 * Represents a scene that could have been started immediately after a prior
 * short scene (fluids not fully recovered — point 3 persistence).
 */

import type { IntimacyScene } from '../../engines/intimacyEngine';
import { WetnessLevel, PostOrgasmSensitivity } from '../../spawn-engine/types/enums';

export const mockIntimacyScene: IntimacyScene = {
  sceneId:                    'scene-001',
  startType:                  'CONSENSUAL',
  partnerNpcId:               'npc-elara',
  activePositionId:           'missionary',
  activeActionId:             'thrust_slow',
  occupiedPenetrationTargets: ['VAGINA'],
  turnCount:                  5,
  status:                     'RUNNING',

  // Clothing — both fully undressed by turn 5
  clothingState:     'FULLY_UNDRESSED',
  selfClothingState: 'FULLY_UNDRESSED',
  clothingCondition: 'INTACT',

  // Satisfaction formula inputs
  pleasurePeak:    42,
  orgasmCount:     0,
  kinksTriggered:  1,
  painExcess:      0,

  // Partner vitals
  partnerStaminaCurrent: 88,
  partnerStaminaMax:     120,
  partnerArousal:        55,
  partnerPainTolerance:  30,

  // Player vitals
  playerStaminaCurrent:  110,
  playerStaminaMax:      160,
  playerArousal:         35,
  playerOrgasmCount:     0,

  // Fluid storages — partially depleted/built up from prior scene (point 3 demo)
  cumStorage:        72,    // player hasn't orgasmed yet; storage nearly full
  cumStorageMax:     100,
  squirtStorage:     18,    // some buildup from lick_vagina earlier this scene
  squirtStorageMax:  80,
  squirtProbability: 0.18,  // not near threshold yet
  milkStorage:       0,     // Elara has no milk produced yet
  milkStorageMax:    100,   // derived from cup size C/D at scene start
  milkStorageDelta:  0,

  // Lubrication — moderate after 5 turns of consensual activity
  currentWetness: WetnessLevel.Wet,

  // Pleasure track (minimal shape; full impl is in patches.ts createPleasureTrack)
  pleasureTrack: { current: 0.28, peak: 0.42, decayRate: 0.05, buildRate: 0.12 },

  // In-scene modifiers
  sensitivityModifier: 0,
  postOrgasmSensitivityState: PostOrgasmSensitivity.Normal,

  // Orgasm history
  femaleOrgasmLog: [],

  // Momentum — steady, no TEC failures yet
  momentumScore:          6,
  lastActionId:           'thrust_slow',
  consecutiveRepeatCount: 2,   // used same action twice; next use triggers overstim penalty

  // Sub-state trackers (idle defaults)
  subspaceTracker:  { active: false, depth: 0, turnsInSubspace: 0 },
  afterglowTracker: { active: false, intensity: 0, turnsRemaining: 0 },

  // No consumables active
  activeConsumables: [],

  // Orgasm denial not triggered
  orgasmDeniedThisScene: false,
  neckGrabActive:        false,

  // Relationship accumulators (french kiss used once earlier)
  loveDeltaAccum:  1,
  trustDeltaAccum: 0,
  actsThisScene:   {},

  // Faint / life-force — not fainted; full life force; Aroused engagement status
  partnerHasFainted:       false,
  faintedAtTurn:           null,
  partnerLifeForce:        100,
  partnerEngagementStatus: 'Aroused',

  // Phase 28 (28d.2): solo-scene nulls for group-scene fields
  secondPartnerNpcId:            null,
  secondPartnerProfile:          null,
  secondPartnerArousal:          0,
  secondPartnerStaminaCurrent:   0,
  secondPartnerStaminaMax:       0,
  secondPartnerHasFainted:       false,
  secondPartnerLifeForce:        0,
  secondPartnerEngagementStatus: 'Neutral',
  secondOrgasmLog:               [],
  secondLoveDeltaAccum:          0,
  secondTrustDeltaAccum:         0,
  groupMode:                     null,
};

/**
 * mockGroupIntimacyScene (28h.1)
 * Minimal FFM group-scene stub for verifying group-scene rendering branches
 * in IntimacyView without a live dispatcher call.
 * secondPartnerNpcId = 'npc-meira'; groupMode = 'FFM'.
 */
export const mockGroupIntimacyScene = {
  ...mockIntimacyScene,

  startType:    'CONSENSUAL_GROUP' as const,
  groupMode:    'FFM'  as const,

  // Second partner: 'npc-meira' — plausible starting values
  secondPartnerNpcId:            'npc-meira',
  secondPartnerProfile:          null,   // profile resolved from contacts[] at runtime
  secondPartnerArousal:          20,
  secondPartnerStaminaCurrent:   120,
  secondPartnerStaminaMax:       120,
  secondPartnerHasFainted:       false,
  secondPartnerLifeForce:        100,
  secondPartnerEngagementStatus: 'Neutral' as const,
  secondOrgasmLog:               [],
  secondLoveDeltaAccum:          0,
  secondTrustDeltaAccum:         0,
};
