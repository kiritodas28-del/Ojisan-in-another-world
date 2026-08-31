/**
 * intimacyEngine.ts
 * Intimate encounter scene state machine.
 * Wraps the per-turn resolvers in Project/patches.ts.
 *
 * TODO (Tasks 6.1–6.9): Full implementation.
 *
 * Key formulas (PRD §4.3):
 *   TEC check:    playerTEC >= actionTECRequirement + d10; fail = half effectiveness
 *   Satisfaction: (pleasurePeak × 0.4 + orgasmCount × 15 + kinkTriggered × 10
 *                  - painExcess × 5); clamped 0–100
 */

// Spawn engine imports (per-turn resolvers live in Project/patches.ts)
// import { resolveEncounterTurn, resolvePostEncounter } from '../../spawn-engine/patches';

// ─── Scene types ──────────────────────────────────────────────────────────────
export type SceneStartType = 'CONSENSUAL' | 'FORCE_INTIMACY' | 'FORCE_INTIMACY_SLEEPING';
export type SceneStatus    = 'RUNNING' | 'STAMINA_EXHAUSTED' | 'PLAYER_ENDED';
export type PenetrationTarget = 'VAGINA' | 'ANAL' | 'ORAL';

// ─── Position & action catalog types (stubs — Tasks 6.1–6.2) ─────────────────
export interface IntimacyPosition {
  id: string;
  name: string;
  penetrationTargetsUsed: PenetrationTarget[];
  allowedActionIds: string[];
  requiredClothingState?: string; // e.g. 'TOPLESS', 'FULLY_UNDRESSED'
}

export interface IntimacyAction {
  id: string;
  name: string;
  tecRequirement: number;           // playerTEC must pass check vs this
  stimulationIntensity: number;     // base pleasure/arousal gain
  penetrationTarget?: PenetrationTarget;
  bodyPartTargeted: string;         // e.g. 'nipple', 'vagina', 'clit'
  staminalCostPlayer: number;
  staminalCostPartner: number;
}

// ─── Scene state ──────────────────────────────────────────────────────────────
export interface IntimacyScene {
  sceneId: string;
  startType: SceneStartType;
  partnerNpcId: string;
  activePositionId: string | null;
  activeActionId: string | null;
  occupiedPenetrationTargets: PenetrationTarget[];
  turnCount: number;
  status: SceneStatus;

  // Tracked for satisfaction calc
  pleasurePeak: number;       // highest single-turn pleasure value
  orgasmCount: number;
  kinksTriggered: number;
  painExcess: number;         // cumulative over-pain above tolerance
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────

/**
 * Starts a new intimacy scene.
 * TODO (Task 6.4): Implement
 */
export function startScene(
  _partnerNpcId: string,
  _startType: SceneStartType,
): IntimacyScene {
  throw new Error('startScene() not yet implemented');
}

/**
 * Resolves one player action within the scene.
 * Calls Project/patches.ts resolveEncounterTurn() internally.
 * TODO (Tasks 6.5–6.6): Implement conflict check and TEC check
 * TODO (Task 6.9): Wire to resolveEncounterTurn
 */
export function resolveSceneAction(
  _scene: IntimacyScene,
  _actionId: string,
  _positionId: string,
): { scene: IntimacyScene; narrative: string[] } {
  throw new Error('resolveSceneAction() not yet implemented');
}

/**
 * Ends the scene and calculates satisfaction score.
 * Calls Project/patches.ts resolvePostEncounter() internally.
 * TODO (Tasks 6.7–6.9): Implement satisfaction calc and post-encounter hook
 */
export function endScene(
  _scene: IntimacyScene,
): { satisfaction: number; narrative: string[] } {
  throw new Error('endScene() not yet implemented');
}

/**
 * Checks whether a penetration target is already occupied.
 * TODO (Task 6.5): Implement
 */
export function checkPenetrationConflict(
  _scene: IntimacyScene,
  _action: IntimacyAction,
): boolean {
  throw new Error('checkPenetrationConflict() not yet implemented');
}

/**
 * Runs the TEC check for an action.
 * Returns true if the check passes (full effectiveness), false if it fails (half).
 * TODO (Task 6.6): Implement
 */
export function runTecCheck(
  _playerTechnique: number,
  _actionTecRequirement: number,
): boolean {
  throw new Error('runTecCheck() not yet implemented');
}

/**
 * Calculates the satisfaction score after a scene.
 * TODO (Task 6.7): Implement
 */
export function calcSatisfaction(scene: IntimacyScene): number {
  // satisfaction = (pleasurePeak × 0.4 + orgasmCount × 15 + kinksTriggered × 10 - painExcess × 5)
  // clamped 0–100
  void scene;
  throw new Error('calcSatisfaction() not yet implemented');
}
