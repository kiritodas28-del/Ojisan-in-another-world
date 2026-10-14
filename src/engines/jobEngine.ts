/**
 * jobEngine.ts  — Phase 24
 * Generic job archetype + equippable class system.
 *
 * Two-layer system:
 *   Job Archetype  — combat role, resource system, innate passive abilities.
 *                    Defines poolA / poolB resource labels and max values.
 *                    Examples: Tactician (AP + Command Momentum), Vanguard (Stamina + Defence Resonance).
 *   Equippable Class — active skill-tree specialization.
 *                    One class equipped at a time; SP saved per class on swap.
 *                    Examples: Mage, Warrior, Shadow, Chemist.
 *
 * Catalog interface:
 *   JobDef and ClassDef live in src/data/jobCatalog.ts (game-specific).
 *   This engine only operates on ids and generic resource pool shapes.
 *
 * WeakNode / Armor Fracture mechanics:
 *   `Architect's Eye` is modelled as a generic WeakNodeScan ability gated by the
 *   player's PER stat.  The engine exposes detectWeakNodes() which is called at
 *   the start of a combat round when the player's equipped job has the
 *   WEAK_NODE_SCAN innate passive.
 *
 * Advanced class promotion:
 *   When the player meets the criteria (level + job SP threshold), promoteJob()
 *   replaces activeJobId with the promoted job id and resets poolA/B to the
 *   new job's max values.
 */

import type {
  GameState, GameEvent,
  JobArchetypeState, JobResourceSystem, ClassProgressionState,
  AnyCharacter,
} from '../state/gameState';
import { applyStatus } from './statusEffectEngine';

// ─── Catalog interfaces (implemented in src/data/jobCatalog.ts) ───────────────
export interface JobDef {
  id:            string;
  name:          string;
  // Resource pool definitions.
  poolALabel:    string;   // e.g. 'Action Points'
  poolAMax:      number;
  poolBLabel:    string | undefined;
  poolBMax:      number | undefined;
  // Innate passives as string ids (resolved by combatEngine/skillEngine).
  innatePassiveIds: string[];
  // Has the WEAK_NODE_SCAN passive (generic Architect's Eye mechanic).
  hasWeakNodeScan: boolean;
  // Advanced class promotion path ids.  Empty = no promotion available.
  promotionJobIds: string[];
  // Minimum player level required for promotion.
  promotionLevel:  number;
}

export interface ClassNodeDef {
  nodeId:          string;
  spCost:          number;
  requiredLevel:   number;
  prerequisiteIds: string[];  // must be unlocked first
  skillId:         string;    // which skill this node grants (from skillEngine catalog)
}

export interface ClassDef {
  id:              string;
  name:            string;
  nodes:           ClassNodeDef[];
}

// ─── Default initial states ───────────────────────────────────────────────────
export function createDefaultJobState(): JobArchetypeState {
  return {
    activeJobId:  undefined,
    activeClassId: undefined,
    jobResources: {
      poolA: { current: 0, max: 0, label: 'AP' },
      poolB: undefined,
    },
  };
}

export function createDefaultClassProgressionState(): ClassProgressionState {
  return { spSpentPerClass: {}, unlockedNodesPerClass: {} };
}

// ─── Phase 30: Path Awakening ─────────────────────────────────────────────────

/**
 * The mechanism by which a player gains access to a job archetype.
 *   STONE        — a Path Stone item is consumed from inventory.
 *   TEMPLE_RITE  — performed at a Temple; anomalous MP triggers a d10 outcome table.
 *   BLOODLINE    — granted by racial affinity at a story beat (programmatic only).
 *   STORY_EVENT  — granted by a script or character-creation flow (no roll, no cost).
 */
export type PathAwakeningTrigger = 'STONE' | 'TEMPLE_RITE' | 'BLOODLINE' | 'STORY_EVENT';

/** Returns true when the player has already been awakened into the given job id. */
export function hasPathUnlocked(state: GameState, pathId: string): boolean {
  return state.player.unlockedPathIds.includes(pathId);
}

/**
 * Attempts to awaken the player into a new job archetype.
 *
 * STONE / BLOODLINE / STORY_EVENT: always succeed (idempotent on repeat).
 * TEMPLE_RITE + anomalousMp === true: rolls d10 via (seed % 10) + 1:
 *   1–3  → unlock; emits PATH_UNLOCKED { anomalousRite: true }  (narrative anomaly)
 *   4–6  → unlock; emits PATH_UNLOCKED { anomalousRite: false } (normal outcome)
 *   7–9  → unlock; applies 'anomalous_rite_surge' status effect to the player;
 *            emits PATH_UNLOCKED + STATUS_APPLIED
 *   10   → rejected; emits PATH_UNLOCK_FAILED { reason: 'ANOMALOUS_REJECTION' }
 *
 * seed: deterministic override for tests/story events; defaults to Date.now().
 * Idempotent: calling again on an already-unlocked path is a silent no-op.
 */
export function unlockPath(
  state:   GameState,
  pathId:  string,
  trigger: PathAwakeningTrigger,
  seed?:   number,
): { state: GameState; events: GameEvent[] } {
  // Idempotent — already awakened
  if (hasPathUnlocked(state, pathId)) return { state, events: [] };

  const events: GameEvent[] = [];

  // Non-rite triggers and non-anomalous players always unlock cleanly
  if (trigger !== 'TEMPLE_RITE' || !state.player.anomalousMp) {
    const newState = {
      ...state,
      player: { ...state.player, unlockedPathIds: [...state.player.unlockedPathIds, pathId] },
    };
    events.push({ type: 'PATH_UNLOCKED', pathId, trigger, anomalousRite: false });
    return { state: newState, events };
  }

  // Anomalous Temple Rite: d10 outcome table
  const roll = ((seed ?? Date.now()) % 10) + 1; // 1–10

  if (roll <= 3) {
    // 1–3: Anomalous awakening — functional but unsettling to the world
    const newState = {
      ...state,
      player: { ...state.player, unlockedPathIds: [...state.player.unlockedPathIds, pathId] },
    };
    events.push({ type: 'PATH_UNLOCKED', pathId, trigger, anomalousRite: true });
    return { state: newState, events };
  }

  if (roll <= 6) {
    // 4–6: Normal outcome despite anomalous MP
    const newState = {
      ...state,
      player: { ...state.player, unlockedPathIds: [...state.player.unlockedPathIds, pathId] },
    };
    events.push({ type: 'PATH_UNLOCKED', pathId, trigger, anomalousRite: false });
    return { state: newState, events };
  }

  if (roll <= 9) {
    // 7–9: Unlock, but anomalous_rite_surge status applied to the player.
    // try/catch: catalog may not yet have this entry (Phase 25 deferred data);
    // the path still unlocks even if the status application fails.
    const newPlayer = { ...state.player, unlockedPathIds: [...state.player.unlockedPathIds, pathId] };
    let newState    = { ...state, player: newPlayer };
    events.push({ type: 'PATH_UNLOCKED', pathId, trigger, anomalousRite: false });
    try {
      const { character: updPlayer, events: statusEvents } =
        applyStatus(newPlayer as AnyCharacter, 'anomalous_rite_surge');
      newState = { ...newState, player: updPlayer as typeof state.player };
      events.push(...statusEvents);
    } catch {
      // 'anomalous_rite_surge' not yet in catalog — unlock proceeds without side effect
    }
    return { state: newState, events };
  }

  // 10: Anomalous rejection — path sealed this attempt
  events.push({ type: 'PATH_UNLOCK_FAILED', pathId, trigger, reason: 'ANOMALOUS_REJECTION' });
  return { state, events };
}

/**
 * Returns every JobDef the player has NOT yet been awakened into.
 * Used by the skill-tree UI to populate the 'Awaken' screen.
 */
export function getUnlockablePaths(state: GameState, catalog: JobDef[]): JobDef[] {
  return catalog.filter(def => !state.player.unlockedPathIds.includes(def.id));
}

// ─── Equip a job archetype ────────────────────────────────────────────────────
/**
 * Equip a job archetype.  Resets job resource pools to the new job's max.
 * Can only be called outside of combat (caller is responsible for this guard).
 */
export function equipJob(
  state:  GameState,
  jobDef: JobDef,
): { state: GameState; events: GameEvent[] } {
  // Phase 30 guard: job must be awakened before equipping.
  if (!hasPathUnlocked(state, jobDef.id)) {
    throw new Error(
      `Path "${jobDef.id}" is not awakened. Call unlockPath() with this jobId before equipping.`,
    );
  }

  const newResources: JobResourceSystem = {
    poolA: { current: jobDef.poolAMax, max: jobDef.poolAMax, label: jobDef.poolALabel },
    poolB: jobDef.poolBMax !== undefined && jobDef.poolBLabel !== undefined
      ? { current: jobDef.poolBMax, max: jobDef.poolBMax, label: jobDef.poolBLabel }
      : undefined,
  };

  return {
    state: {
      ...state,
      jobState: { ...state.jobState, activeJobId: jobDef.id, jobResources: newResources },
    },
    events: [{ type: 'JOB_EQUIPPED', jobId: jobDef.id }],
  };
}

// ─── Equip an equippable class ────────────────────────────────────────────────
/**
 * Swap the active equippable class.  SP allocation is saved per class;
 * previously unlocked nodes for the new class are restored from classProgress.
 * Can only be done at a Rest Point outside combat.
 */
export function equipClass(
  state:   GameState,
  classId: string,
): { state: GameState; events: GameEvent[] } {
  return {
    state: { ...state, jobState: { ...state.jobState, activeClassId: classId } },
    events: [{ type: 'CLASS_EQUIPPED', classId }],
  };
}

// ─── Unlock a class skill tree node ──────────────────────────────────────────
/**
 * Spend SP to unlock a node in the active class's skill tree.
 * Validates: active class set, node exists, prerequisites met, level requirement,
 * sufficient unspent BP/AP (SP draws from AP for Ardor trees, BP for Battle trees —
 * the caller passes the correct spend type via spPool).
 * spPool: 'AP' | 'BP' — which point pool to deduct from.
 */
export function unlockClassNode(
  state:    GameState,
  classDef: ClassDef,
  nodeId:   string,
  spPool:   'AP' | 'BP',
): { state: GameState; events: GameEvent[] } {
  if (state.jobState.activeClassId !== classDef.id) {
    throw new Error(`Class "${classDef.id}" is not the active class. Equip it first.`);
  }

  const nodeDef = classDef.nodes.find(n => n.nodeId === nodeId);
  if (!nodeDef) throw new Error(`Node "${nodeId}" not found in class "${classDef.id}".`);

  const unlockedNodes = state.classProgress.unlockedNodesPerClass[classDef.id] ?? [];
  if (unlockedNodes.includes(nodeId)) return { state, events: [] }; // idempotent

  // Level gate
  if (state.player.level < nodeDef.requiredLevel) {
    throw new Error(`Level ${nodeDef.requiredLevel} required to unlock "${nodeId}".`);
  }
  // Prerequisite gate
  for (const prereqId of nodeDef.prerequisiteIds) {
    if (!unlockedNodes.includes(prereqId)) {
      throw new Error(`Prerequisite "${prereqId}" must be unlocked first.`);
    }
  }
  // SP / point pool gate
  const available = spPool === 'AP' ? state.player.unspentAP : state.player.unspentBP;
  if (available < nodeDef.spCost) {
    throw new Error(`Need ${nodeDef.spCost} ${spPool} to unlock "${nodeId}"; have ${available}.`);
  }

  // Deduct SP, record unlock
  const newPlayer = spPool === 'AP'
    ? { ...state.player, unspentAP: state.player.unspentAP - nodeDef.spCost }
    : { ...state.player, unspentBP: state.player.unspentBP - nodeDef.spCost };

  const spSpentPerClass = {
    ...state.classProgress.spSpentPerClass,
    [classDef.id]: (state.classProgress.spSpentPerClass[classDef.id] ?? 0) + nodeDef.spCost,
  };
  const unlockedNodesPerClass = {
    ...state.classProgress.unlockedNodesPerClass,
    [classDef.id]: [...unlockedNodes, nodeId],
  };

  return {
    state: {
      ...state,
      player:        newPlayer,
      classProgress: { spSpentPerClass, unlockedNodesPerClass },
    },
    events: [{ type: 'CLASS_NODE_UNLOCKED', classId: classDef.id, nodeId, spCost: nodeDef.spCost }],
  };
}

// ─── Reset a class skill tree ─────────────────────────────────────────────────
export function resetClassTree(
  state:    GameState,
  classDef: ClassDef,
  spPool:   'AP' | 'BP',
): { state: GameState; events: GameEvent[] } {
  const spSpent = state.classProgress.spSpentPerClass[classDef.id] ?? 0;
  if (spSpent === 0) return { state, events: [] };

  const newPlayer = spPool === 'AP'
    ? { ...state.player, unspentAP: state.player.unspentAP + spSpent }
    : { ...state.player, unspentBP: state.player.unspentBP + spSpent };

  return {
    state: {
      ...state,
      player: newPlayer,
      classProgress: {
        spSpentPerClass:      { ...state.classProgress.spSpentPerClass,      [classDef.id]: 0 },
        unlockedNodesPerClass:{ ...state.classProgress.unlockedNodesPerClass, [classDef.id]: [] },
      },
    },
    events: [{ type: 'CLASS_TREE_RESET', classId: classDef.id, spRefunded: spSpent }],
  };
}

// ─── Job resource pool management ─────────────────────────────────────────────
/**
 * Spend from a job resource pool.  Pool 'A' is primary (e.g. AP), 'B' is secondary.
 * Throws if insufficient resources.
 */
export function spendJobResource(
  state:  GameState,
  pool:   'A' | 'B',
  amount: number,
): { state: GameState; events: GameEvent[] } {
  const resources = state.jobState.jobResources;
  if (pool === 'A') {
    if (resources.poolA.current < amount) {
      throw new Error(`Insufficient ${resources.poolA.label} (need ${amount}, have ${resources.poolA.current}).`);
    }
    const newPool = { ...resources.poolA, current: resources.poolA.current - amount };
    return {
      state:  { ...state, jobState: { ...state.jobState, jobResources: { ...resources, poolA: newPool } } },
      events: [{ type: 'JOB_RESOURCE_USED', pool: 'A', amount, label: resources.poolA.label }],
    };
  } else {
    if (!resources.poolB) throw new Error(`This job has no secondary resource pool.`);
    if (resources.poolB.current < amount) {
      throw new Error(`Insufficient ${resources.poolB.label} (need ${amount}, have ${resources.poolB.current}).`);
    }
    const newPool = { ...resources.poolB, current: resources.poolB.current - amount };
    return {
      state:  { ...state, jobState: { ...state.jobState, jobResources: { ...resources, poolB: newPool } } },
      events: [{ type: 'JOB_RESOURCE_USED', pool: 'B', amount, label: resources.poolB.label }],
    };
  }
}

/** Restore job resource pools to max.  Called at the start of each encounter. */
export function restoreJobResources(state: GameState, jobDef: JobDef): GameState {
  const resources: JobResourceSystem = {
    poolA: { current: jobDef.poolAMax, max: jobDef.poolAMax, label: jobDef.poolALabel },
    poolB: jobDef.poolBMax !== undefined && jobDef.poolBLabel !== undefined
      ? { current: jobDef.poolBMax, max: jobDef.poolBMax, label: jobDef.poolBLabel }
      : undefined,
  };
  return { ...state, jobState: { ...state.jobState, jobResources: resources } };
}

// ─── Weak node scan (Architect's Eye generic mechanic) ────────────────────────
export interface WeakNodeHit {
  targetId:    string;
  nodeLabel:   string;   // display string (e.g. "Chest Plate Seam")
  bonusDamage: number;   // flat bonus damage when that node is targeted
}

/**
 * Scan a list of combatant targets for structural weak points.
 * Only callable when the active job has hasWeakNodeScan = true.
 * perStat: player's current PER stat value; scales detection chance and bonus damage.
 * seed: combat-round seed for deterministic results.
 *
 * Returns a list of detected nodes + WEAK_NODE_DETECTED events.
 * The caller (combatEngine) uses these to gate ARMOR_FRACTURE_APPLIED status effects.
 */
export function detectWeakNodes(
  state:   GameState,
  jobDef:  JobDef,
  targets: AnyCharacter[],
  perStat: number,
  seed:    number,
): { hits: WeakNodeHit[]; events: GameEvent[] } {
  if (!jobDef.hasWeakNodeScan) return { hits: [], events: [] };

  const events: GameEvent[] = [];
  const hits:   WeakNodeHit[] = [];

  // Detection chance = 40% base + 2% per PER point above 10 (capped at 90%)
  const detectionChance = Math.min(0.9, 0.40 + Math.max(0, perStat - 10) * 0.02);
  // Bonus damage = 10 + (PER - 10) * 2, min 10
  const bonusDamage     = Math.max(10, 10 + (perStat - 10) * 2);

  let rng = seed;
  for (const target of targets) {
    rng = (rng * 1664525 + 1013904223) >>> 0;
    const roll = rng / 0xFFFFFFFF;
    if (roll < detectionChance) {
      // Generic weak node label; game catalog can map targetId → descriptive labels.
      const nodeLabel = `Structural Flaw [${target.id}]`;
      hits.push({ targetId: target.id, nodeLabel, bonusDamage });
      events.push({ type: 'WEAK_NODE_DETECTED', targetId: target.id, nodeLabel, bonusDamage });
    }
  }

  return { hits, events };
}

/** Emit an ARMOR_FRACTURE_APPLIED event when a weak node is targeted. */
export function applyArmorFracture(
  state:     GameState,
  targetId:  string,
  reduction: number,   // % physical defence reduction (e.g. 30)
  turns:     number,   // duration in combat turns
): { state: GameState; events: GameEvent[] } {
  // Armor Fracture is a status effect; application is handled by statusEffectEngine.
  // This function exists as the canonical emit point so callers have a single API.
  return {
    state,
    events: [{ type: 'ARMOR_FRACTURE_APPLIED', targetId, reduction, turns }],
  };
}

// ─── Advanced class promotion ─────────────────────────────────────────────────
/**
 * Promote the player's job to an advanced class.
 * promotedJobId must be in jobDef.promotionJobIds.
 * Resets resource pools to the new job's values.
 */
export function promoteJob(
  state:          GameState,
  currentJobDef:  JobDef,
  promotedJobDef: JobDef,
): { state: GameState; events: GameEvent[] } {
  if (!currentJobDef.promotionJobIds.includes(promotedJobDef.id)) {
    throw new Error(`"${promotedJobDef.id}" is not a valid promotion for "${currentJobDef.id}".`);
  }
  if (state.player.level < currentJobDef.promotionLevel) {
    throw new Error(`Level ${currentJobDef.promotionLevel} required to promote.`);
  }

  const result = equipJob(state, promotedJobDef);
  return {
    state: result.state,
    events: [
      { type: 'JOB_PROMOTED', fromJobId: currentJobDef.id, toJobId: promotedJobDef.id },
      ...result.events,
    ],
  };
}

// ─── Read helpers ─────────────────────────────────────────────────────────────
export function getUnlockedNodesForClass(state: GameState, classId: string): string[] {
  return state.classProgress.unlockedNodesPerClass[classId] ?? [];
}
export function getSPSpentOnClass(state: GameState, classId: string): number {
  return state.classProgress.spSpentPerClass[classId] ?? 0;
}
export function isClassNodeUnlocked(state: GameState, classId: string, nodeId: string): boolean {
  return (state.classProgress.unlockedNodesPerClass[classId] ?? []).includes(nodeId);
}
