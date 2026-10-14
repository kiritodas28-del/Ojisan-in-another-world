/**
 * dispatcher.ts
 * Central engine dispatcher — routes player intents to the correct engine(s)
 * and processes the resulting event queue.
 *
 * Intent → Engine routing table (from PRD §2.2):
 *
 *   MOVE                → World/Pathing  → (encounter roll) → Combat
 *   TALK                → Dialogue       → Relationship flags
 *   FIGHT_ACTION        → Combat         → Status Effects
 *   INTIMACY_ACTION     → Intimacy       → Relationship, Pregnancy
 *   USE_ITEM            → Economy/Inventory
 *   GIVE_GIFT           → Economy, Relationship
 *   SLEEP               → Calendar       → HP/Stamina/CPW restore  [Task 3c.4 / 8.8]
 *   ADVANCE_PHASE       → Calendar       → Status tick, NPC refresh [Task 3c.4 / 8.8]
 *   CRAFT               → Crafting
 *   BUILD               → Manor
 *   SAVE                → Save/Load
 */

import type { GameState, GameEvent, RegionId, TileCoord } from '../state/gameState';
import {
  selectDefeatOutcome,
  type DefeatContext,
  type LootTable,
} from './enemySpawnEngine';
import {
  applyReputationDelta,
  applyReputationEvent,
} from './reputationEngine';
import { updateObjective } from './questEngine';
import {
  consumeItem,
  giveGift,
  resolveLootDrop,
  getItemDef,
  removeItem,
} from './economyEngine';
import { QUEST_CATALOG } from '../data/quests';
import {
  startCraft,
  equipItem,
  unequipItem,
  upgradeItem,
  confirmEquipSwap,
} from './craftingEngine';
import {
  moveTile,
  travelToAdjacent,
  fastTravel,
} from './worldEngine';
import { flagPregnancyRisk } from './pregnancyEngine';
import {
  startUpgrade,
  assignSuite,
  vacateSuite,
  collectPassiveResources,
} from './manorEngine';
import type { SceneEndPersistence } from './intimacyEngine';
import {
  checkExposureGate,
  checkAudienceGate,
  checkGroupSceneGate,
  checkGroupJealousy,
  startGroupScene,
  resolvePostIntimacy,
  type IntimacyStartContext,
} from './intimacyEngine';
import { countBystanders } from './worldEngine';
import { isCompanionSqComplete } from './questEngine';
import { checkAchievements } from './achievementEngine';
import {
  unlockSkill,
  useActiveSkill,
  resetSkillTree,
  type SkillTree,
} from './skillEngine';
import type { EquipmentSlot, ContactProfileView } from '../state/gameState';
import { assembleProfileView } from './contactEngine';
import {
  startDialogue,
  makeChoice,
  getGenericDialogueTreeId,
} from './dialogueEngine';
import { DIALOGUE_TREES } from '../data/dialogueTrees';
import {
  assembleIntimateResponse,
  deriveArousalBand,
  deriveShameTier,
} from '../data/intimateResponseFragments';
import type { IntimateResponse } from '../data/intimateResponseFragments';
import {
  saveGame,
  loadGame,
  listSaves,
  deleteSave,
  isNewGamePlusEligible,
  startNewGamePlus,
  type SaveMeta,
} from './saveEngine';
import {
  captureMonster,
  interactWithCaptive,
  resolveCaptiveAction,
  type CaptiveActionType,
} from './tamingEngine';
import { startScene } from './intimacyEngine';
import type { NpcPartnerProfile } from './intimacyEngine';
import type { EnemyHumanoidCharacter } from '../state/gameState';
import {
  applyAlignmentDelta,
  evaluateDivergence,
  type AlignmentAxis,
} from './alignmentEngine';
import {
  applyInfamyDelta,
  clearInfamy,
} from './infamyEngine';
import {
  syncActiveEffects,
  type WeatherCatalogEntry as _WeatherCatalogEntry,
} from './environmentEngine';
import {
  unlockSpire,
  spireTravel,
} from './spireEngine';
import {
  equipJob,
  equipClass,
  unlockClassNode,
  resetClassTree,
  promoteJob,
  unlockPath,
  type JobDef,
  type ClassDef,
  type PathAwakeningTrigger,
} from './jobEngine';
import {
  evaluateSynergyUnlocks,
  activateSynergy,
  type SynergyDef,
  type SynergyEffectPayload,
} from './synergyEngine';
import { payTithe } from './titheEngine';
import { socketItem } from './socketEngine';
import { startMiniGame, resolveMiniGame } from './miniGameEngine';
import {
  commitCrime,
  checkCityGate,
  grantPardon,
  type CrimeType,
} from './crimeEngine';
import { estimateTravelTime, hireCarriage } from './travelCostEngine';
import {
  createCharacter,
  type SubClassDef,
  type TraitDef,
} from './characterCreationEngine';
import { awardCharterXP } from './charterEngine';
// Task 3c.4 / 8.8 — calendar engine wired for ADVANCE_PHASE and SLEEP intents
import { advancePhase, resolveSleep } from './calendarEngine';
// Task 9.1 — relationship engine wired for social-action sub-intents under TALK
import { resolveSocialAction, type SocialAction } from './relationshipEngine';

// ─── Intent union type ────────────────────────────────────────────────────────
export type PlayerIntent =
  // MOVE_TILE: move player one tile within the current location's 30x30 grid.
  // TRAVEL:     walk to an adjacent world node (encounter rolls apply on non-safe edges).
  // FAST_TRAVEL: teleport to a discovered node; costs gold; no encounters.
  | { type: 'MOVE_TILE';        targetCoord: TileCoord }
  | { type: 'TRAVEL';           targetNodeId: string }
  | { type: 'FAST_TRAVEL';      targetNodeId: string }
  | { type: 'TALK';             npcId: string; choiceId?: string }
  | { type: 'FIGHT_ACTION';     actionId: string; targetId: string }
  | { type: 'INTIMACY_ACTION';  actionId: string; positionId: string; targetNpcId: string }
  | { type: 'USE_ITEM';         itemId: string; targetId?: string }  // -> consumeItem()
  | { type: 'GIVE_GIFT';        itemId: string; npcId: string }      // -> giveGift()
  | { type: 'SLEEP' }
  | { type: 'ADVANCE_PHASE' }
  | { type: 'CRAFT';               recipeId: string }
  | { type: 'BUILD';               upgradeId: string }
  | { type: 'SAVE';                slotIndex: number }
  | { type: 'EQUIP';               itemId: string; slot: EquipmentSlot; targetId: string }
  | { type: 'UNEQUIP';             slot: EquipmentSlot; targetId: string }
  | { type: 'UPGRADE';             itemId: string; useAlchemyLab: boolean }
  // Sent after the player confirms converting a displaced item to gold during equip/unequip
  | { type: 'CONFIRM_EQUIP_SWAP';  itemId: string; slot: EquipmentSlot; targetId: string; swapOutItemId: string }
  // ── Skill intents (Phase 16, tasks 16.16-16.18) ──────────────────────────
  // USE_SKILL:        Activate a non-passive skill. For DAMAGE_MULTIPLIER skills,
  //                   the result carries pendingMultiplier; client attaches it to
  //                   the next FIGHT_ACTION intent as damageMultiplier.
  // UNLOCK_SKILL:     Spend BP or AP to unlock a skill in the player's tree.
  // RESET_SKILL_TREE: Wipe all skills in a tree and refund all spent points.
  | { type: 'USE_SKILL';         skillId: string; targetId?: string }
  | { type: 'UNLOCK_SKILL';      skillId: string }
  | { type: 'RESET_SKILL_TREE';  tree: SkillTree }
  // INSPECT_CONTACT: sent by ContactsView when the player opens an NPC's profile.
  // The engine aggregates all display fields into a ContactProfileView DTO that is
  // returned in DispatchResult.contactProfile (not stored in GameState).
  | { type: 'INSPECT_CONTACT'; npcId: string }
  // DIALOGUE_CHOOSE: advance active dialogue by player choice index.
  | { type: 'DIALOGUE_CHOOSE'; choiceIndex: number }
  // END_SCENE: sent by the client when the intimacy engine returns SceneEndPersistence.
  // The dispatcher applies post-scene side effects: pregnancy risk flagging.
  // npcId: the NPC partner's npcId.
  // persistence: the SceneEndPersistence bundle returned by endScene().
  | { type: 'END_SCENE'; npcId: string; persistence: SceneEndPersistence }
  // Phase 28 (28e.3): INITIATE_GROUP_INTIMACY — start an MMF or FFM group scene.
  // The dispatcher runs the full group gate (SQ + degradation) before calling
  // startGroupScene(). Both NPC ids must be present in contacts[].
  | { type: 'INITIATE_GROUP_INTIMACY'; primaryNpcId: string; secondNpcId: string; groupMode: 'MMF' | 'FFM' }
  // ── Save/load intents (Phase 22, Tasks 22.6-22.9 / 22.12-22.13) ──────────
  // SAVE_GAME:           Write current state to a manual slot (0-9).
  // LOAD_GAME:           Read state from a slot; returned in DispatchResult.loadedState.
  // LIST_SAVES:          Return all save metadata; no state mutation.
  // DELETE_SAVE:         Delete a manual slot (autosave slot 99 is protected).
  // START_NEW_GAME_PLUS: Reset state for an NG+ run; requires game_cleared flag.
  | { type: 'SAVE_GAME';           slot: number }
  | { type: 'LOAD_GAME';           slot: number }
  | { type: 'LIST_SAVES' }
  | { type: 'DELETE_SAVE';         slot: number }
  | { type: 'START_NEW_GAME_PLUS' }
  // ── Manor intents (Phase 19) ─────────────────────────────────────────────
  // BUILD:             Begin upgrading manor to the next tier; deducts gold.
  // ASSIGN_SUITE:      Assign an NPC occupant to a numbered suite.
  // VACATE_SUITE:      Remove the current occupant from a suite.
  // COLLECT_RESOURCES: Flush passiveResourceQueue into inventory (items only;
  //                    gold is already credited at generation time).
  | { type: 'BUILD' }
  | { type: 'ASSIGN_SUITE';      suiteId: string; npcId: string }
  | { type: 'VACATE_SUITE';      suiteId: string }
  | { type: 'COLLECT_RESOURCES' }
  // -- Taming intents (Phase 23) -------------------------------------------
  // CAPTURE_MONSTER:   Post-combat; player chose Capture. Requires 'rope' + free cell.
  // INTERACT_CAPTIVE:  Daily interaction with a captive; advances tamingProgress.
  // CAPTIVE_ACTION:    Sub-intents for specific captive interactions.
  //                    action: 'TALK'|'TOUCH'|'FLIRT'|'GIVE_GIFT'|'FIGHT'|'INTIMATE'|'RELEASE'
  //                    Gift and intimate have additional required fields.
  | { type: 'CAPTURE_MONSTER';   enemy: EnemyHumanoidCharacter }
  | { type: 'INTERACT_CAPTIVE';  cellId: string }
  | { type: 'CAPTIVE_ACTION';
      cellId:  string;
      action:  CaptiveActionType;
      itemId?: string;  // required for GIVE_GIFT
    }
  // ── Phase 24: Alignment intents ──────────────────────────────────────────
  | { type: 'APPLY_ALIGNMENT_DELTA'; axis: AlignmentAxis; delta: number; source: string }
  | { type: 'EVALUATE_DIVERGENCE';   resolutionAxis: AlignmentAxis }
  // ── Phase 24: Infamy intents ──────────────────────────────────────────────
  | { type: 'APPLY_INFAMY_DELTA'; regionId: string; delta: number }
  | { type: 'CLEAR_INFAMY';       regionId: string }
  // ── Phase 24: Spire intents ───────────────────────────────────────────────
  | { type: 'UNLOCK_SPIRE'; nodeId: string }
  | { type: 'SPIRE_TRAVEL'; fromNodeId: string; toNodeId: string }
  // ── Phase 24: Job / Class intents ─────────────────────────────────────────
  | { type: 'EQUIP_JOB';        jobDef: JobDef }
  | { type: 'EQUIP_CLASS';       classId: string }
  | { type: 'UNLOCK_CLASS_NODE'; classDef: ClassDef; nodeId: string; spPool: 'AP' | 'BP' }
  | { type: 'RESET_CLASS_TREE';  classDef: ClassDef; spPool: 'AP' | 'BP' }
  | { type: 'PROMOTE_JOB';       currentJobDef: JobDef; promotedJobDef: JobDef }
  // ── Phase 24: Synergy intents ─────────────────────────────────────────────
  // Phase 30: Path Awakening intent
  // UNLOCK_PATH: awaken the player into a new job archetype.
  //   trigger 'STONE': a Path Stone is consumed from inventory (itemId required).
  //   trigger 'TEMPLE_RITE': no item consumed; anomalous MP roll fires at a Temple.
  //   seed: optional deterministic roll override (tests / scripted story beats).
  | { type: 'UNLOCK_PATH'; pathId: string; trigger: 'STONE' | 'TEMPLE_RITE'; itemId?: string; seed?: number }
  | { type: 'ACTIVATE_SYNERGY';   synergyDef: SynergyDef }
  | { type: 'EVALUATE_SYNERGIES'; catalog: SynergyDef[] }
  // ── Phase 24: New-game init intent (Task 3c.4) ────────────────────────────
  | { type: 'NEW_GAME';
      options:     import('../state/gameState').CharacterCreationOptions;
      subClassDef: SubClassDef;
      traitDef:    TraitDef;
      jobDef:      JobDef;
      classDef:    ClassDef;
    }
  // ── Phase 26: Loose-ends intents ─────────────────────────────────────────
  // PAY_TITHE:       player pays their Aether Tithe at an Enclave Altar.
  // OPEN_SOCKET:     insert an Aether Crystal into an equipment slot socket.
  // HIRE_CARRIAGE:   hire a carriage to skip travel phases between nodes.
  // FISH / GAMBLE / ARENA / ONSEN: mini-game intents.
  // COMMIT_CRIME:    dispatcher hook for steal/kill; routes to crimeEngine.
  // GRANT_PARDON:    quest engine hook; clears infamy via crimeEngine.grantPardon.
  // BUILD_STRONGHOLD: establish an Enclave Stronghold in the current region.
  | { type: 'PAY_TITHE';       regionId: string }
  | { type: 'OPEN_SOCKET';     itemId: string; socketId: string; materialId: string }
  | { type: 'HIRE_CARRIAGE';   targetNodeId: string }
  | { type: 'FISH' }
  | { type: 'GAMBLE' }
  | { type: 'ARENA' }
  | { type: 'ONSEN' }
  | { type: 'COMMIT_CRIME';    crimeType: CrimeType }
  | { type: 'GRANT_PARDON';    regionId: string; questId: string }
  | { type: 'BUILD_STRONGHOLD' };

// ─── Dispatch result ──────────────────────────────────────────────────────────
export interface DispatchResult {
  state: GameState;
  events: GameEvent[];
  narrative: string[];  // text lines to display to the player
  // Non-zero only after a USE_SKILL intent with a DAMAGE_MULTIPLIER effect.
  // Client must inject this into the next FIGHT_ACTION intent's damageMultiplier field.
  // Once consumed it must NOT be reused across subsequent turns.
  pendingMultiplier?: number;
  // Populated after an INSPECT_CONTACT intent. Not stored in GameState;
  // consumed immediately by ContactsView to render the profile panel.
  contactProfile?: ContactProfileView | null;
  // Populated after a LOAD_GAME intent. The caller must replace its current
  // GameState with this value. Not stored back into DispatchResult.state to
  // avoid confusion: the caller's existing state reference is stale after a load.
  loadedState?: GameState;
  // Populated after a LIST_SAVES intent.
  saves?: SaveMeta[];
  // Populated after TALK (root node) or DIALOGUE_CHOOSE (next node). null = dialogue ended.
  dialogueNode?: import('../state/gameState').DialogueNode | null;
  // Populated after INTIMACY_ACTION when at least one fragment layer has a non-empty bucket.
  intimateResponse?: IntimateResponse;
  // Populated after EVALUATE_DIVERGENCE: effective combat difficulty multiplier.
  // 1.0 = no penalty; up to 2.5 when resolution opposes dominant alignment axis.
  divergenceMultiplier?: number;
  // Populated after ACTIVATE_SYNERGY: the combo effect payload for combatEngine.
  synergyPayload?: SynergyEffectPayload;
  // Populated after a CAPTIVE_ACTION INTIMATE when the gate passes.
  // Client uses this to render the IntimacyView with the captive as partner.
  captiveScene?: import('./intimacyEngine').IntimacyScene;
  // Populated after HIRE_CARRIAGE: estimated phases the carriage trip takes.
  carriaeTravelPhases?: number;
  // Populated after MINI_GAME_ENDED.
  miniGameOutcome?: import('./miniGameEngine').MiniGameOutcome;
}

// ─── Task 3c.5 — Dispatch pipeline type (event bus contract) ─────────────────
/**
 * DispatchPipeline is the formal event-bus contract:
 *   1. An intent arrives from the client.
 *   2. dispatch() calls the primary engine and collects an initial event list.
 *   3. processEventQueue() iterates the events, applying cross-engine side effects
 *      and expanding the state immutably at each step.
 *   4. Achievement check runs once after the full queue drains.
 *   5. The fully-resolved state + accumulated events are returned to the caller.
 *
 * Every engine function called inside dispatch() must return
 * { state: GameState; events: GameEvent[] } — this is the pipeline unit.
 * No engine calls another engine directly; they emit events and return.
 */
export type DispatchPipeline = (
  state:  GameState,
  intent: PlayerIntent,
) => DispatchResult;

// ─── Main dispatcher ──────────────────────────────────────────────────────────
export function dispatch(state: GameState, intent: PlayerIntent): DispatchResult {
  const narrative: string[] = [];
  let events: GameEvent[]   = [];

  // ── ADVANCE_PHASE (Task 3c.4 / 8.8) ─────────────────────────────────────
  // Routes to calendarEngine.advancePhase().
  // locationDefs and schedules are deferred data (Phase 25); empty maps are safe
  // because advancePhase() / runDayEndTick() guard with Object.keys().length > 0.
  if (intent.type === 'ADVANCE_PHASE') {
    const result = advancePhase(state, {}, {});
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(`The ${state.calendar.phase} settles in.`);
    return { state, events, narrative };
  }

  // ── SLEEP (Task 3c.4 / 8.8) ──────────────────────────────────────────────
  // Routes to calendarEngine.resolveSleep(), which guards phase + safety tier,
  // applies full restore, and drives the Midnight→Morning transition.
  // locationDefs / schedules: deferred — empty maps are safe no-ops.
  if (intent.type === 'SLEEP') {
    const result = resolveSleep(state, {}, {});
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(...result.narrative);
    return { state, events, narrative };
  }

  // ── USE_ITEM (Task 12.16) ─────────────────────────────────────────────────
  // Routes to consumeItem(). QUEST items and non-consumable types are rejected
  // with a narrative line so the UI can display feedback without an error throw.
  if (intent.type === 'USE_ITEM') {
    let def;
    try {
      def = getItemDef(intent.itemId);
    } catch {
      narrative.push(`You reach for it, but nothing happens.`);
      return { state, events, narrative };
    }

    if (def.type === 'QUEST') {
      narrative.push(`You can't use a quest item like that.`);
      return { state, events, narrative };
    }
    if (def.type !== 'CONSUMABLE') {
      narrative.push(`${def.name} isn't something you can consume.`);
      return { state, events, narrative };
    }

    try {
      const result = consumeItem(state, intent.itemId);
      state  = result.state;
      events = result.events;
      state  = processEventQueue(state, events);
      narrative.push(`You use the ${def.name}.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── GIVE_GIFT (Task 12.17) ────────────────────────────────────────────────
  // Routes to giveGift() which validates GIFT type, removes item, and applies
  // trust/love delta to the target NPC via applyPostSceneRelationshipDelta.
  if (intent.type === 'GIVE_GIFT') {
    const result  = giveGift(state, intent.itemId, intent.npcId);
    state         = result.state;
    events        = result.events;
    state         = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── CRAFT (Task 15.16) ─────────────────────────────────────────────────────────────────────
  // Consumes ingredients and queues a crafting job. canCraft() guards are
  // already inside startCraft(); it returns a narrative error on failure.
  if (intent.type === 'CRAFT') {
    const result = startCraft(state, intent.recipeId);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── EQUIP (Task 15.17) ─────────────────────────────────────────────────────────────────────
  // Equips an item into the target's slot. When the slot is occupied and the
  // inventory is full, equipItem() returns needsConfirmation=true and emits
  // EQUIP_SWAP_CONFIRM; the UI shows the confirm dialog and sends CONFIRM_EQUIP_SWAP.
  if (intent.type === 'EQUIP') {
    const result = equipItem(state, intent.itemId, intent.slot, intent.targetId);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── UNEQUIP (Task 15.17) ───────────────────────────────────────────────────────────────────
  // Returns the item in `slot` to the player inventory. If the inventory is
  // full, emits EQUIP_SWAP_CONFIRM and awaits CONFIRM_EQUIP_SWAP.
  if (intent.type === 'UNEQUIP') {
    const result = unequipItem(state, intent.slot, intent.targetId);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── UPGRADE (Task 15.18) ──────────────────────────────────────────────────────────────────
  // Attempts to upgrade a WEAPON or ARMOR item. useAlchemyLab is gated inside
  // upgradeItem() against manor.tier >= 4.
  if (intent.type === 'UPGRADE') {
    const result = upgradeItem(state, intent.itemId, intent.useAlchemyLab);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── CONFIRM_EQUIP_SWAP (Task 15.17 follow-up) ─────────────────────────────────────────
  // Player confirmed converting the displaced item to gold so the equip can proceed.
  if (intent.type === 'CONFIRM_EQUIP_SWAP') {
    const result = confirmEquipSwap(
      state, intent.itemId, intent.slot, intent.targetId, intent.swapOutItemId,
    );
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── USE_SKILL (Task 16.16) ─────────────────────────────────────────────────────
  // Activates a non-passive skill; deducts CPW; resolves immediate effects.
  // For DAMAGE_MULTIPLIER skills: pendingMultiplier is returned in the result
  // so the client can attach it to the very next FIGHT_ACTION intent.
  // The multiplier is NOT persisted to GameState — it lives only in the payload.
  if (intent.type === 'USE_SKILL') {
    // Resolve optional target character for STATUS_APPLY / AROUSAL_GAIN effects.
    // Targets can be any combatant; look in world NPC contacts as a best-effort
    // (full resolution requires a live CombatState from Phase 17+ wiring).
    const targetChar = intent.targetId
      ? (state.contacts.find(c => c.character.npcId === intent.targetId)?.character ?? undefined)
      : undefined;

    const result = useActiveSkill(
      state,
      intent.skillId,
      targetChar as Parameters<typeof useActiveSkill>[2],
    );
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);

    // pendingMultiplier > 0 means a DAMAGE_MULTIPLIER effect was triggered.
    // Returned in DispatchResult.pendingMultiplier for the client to inject
    // into the next FIGHT_ACTION CombatAction.damageMultiplier field.
    return { state, events, narrative, pendingMultiplier: result.pendingMultiplier };
  }

  // ── UNLOCK_SKILL (Task 16.17) ──────────────────────────────────────────────────
  // Spends BP or AP to permanently add a skill to unlockedSkillIds.
  if (intent.type === 'UNLOCK_SKILL') {
    const result = unlockSkill(state, intent.skillId);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── RESET_SKILL_TREE (Task 16.18) ──────────────────────────────────────────────
  // Removes all skills in the given tree and refunds all spent points.
  if (intent.type === 'RESET_SKILL_TREE') {
    const result = resetSkillTree(state, intent.tree);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── MOVE_TILE (Task 17.12) ───────────────────────────────────────────────────
  // Moves player one tile within the current location's 30x30 grid.
  // Rolls special encounter on non-safe nodes; checks roam proximity.
  // If SPECIAL_ENCOUNTER_ROLLED or ROAM_ENCOUNTER_TRIGGERED is in events,
  // the client must pause and route to combat / encounter view.
  if (intent.type === 'MOVE_TILE') {
    const result = moveTile(state, intent.targetCoord);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(...result.narrative);
    return { state, events, narrative };
  }

  // ── TRAVEL (Task 17.12) ─────────────────────────────────────────────────────
  // Walks to an adjacent world node. Encounter rolls per phase on non-safe edges.
  // If SPECIAL_ENCOUNTER_ROLLED is in events, travel was interrupted; client must
  // resolve the encounter before sending another TRAVEL intent to resume.
  if (intent.type === 'TRAVEL') {
    const result = travelToAdjacent(state, intent.targetNodeId);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(...result.narrative);
    return { state, events, narrative };
  }

  // ── FAST_TRAVEL (Task 17.13) ────────────────────────────────────────────────
  // Teleports to any discovered node. No encounters. Deducts gold.
  if (intent.type === 'FAST_TRAVEL') {
    const result = fastTravel(state, intent.targetNodeId);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(...result.narrative);
    return { state, events, narrative };
  }

  // ── INTIMACY_ACTION (Phase 28 — 28b.3 / 28c.3) ───────────────────────────────
  // Routes in-scene turn actions to the narrative fragment assembler.
  // Exposure and audience gates fire at scene initiation (INITIATE_GROUP_INTIMACY
  // or the UI layer initiating a CONSENSUAL scene), not per-action turn.
  if (intent.type === 'INTIMACY_ACTION') {
    const npc = state.contacts.find(c => c.character.npcId === intent.targetNpcId)?.character;
    if (!npc) {
      narrative.push(`No NPC found with id ${intent.targetNpcId}.`);
      return { state, events, narrative };
    }
    const mental = (npc.dynamicState as import('../spawn-engine/character/dynamicState').CharacterDynamicState)?.mental;
    const corruptionCurrent = mental?.corruptionCurrent ?? 0;
    const shameCurrent      = mental?.shameCurrent      ?? 100;
    const arousalBand  = deriveArousalBand(npc.vitals?.arousal ?? 0);
    const shameTier    = deriveShameTier(corruptionCurrent, shameCurrent);
    const intimateResp = assembleIntimateResponse(intent.actionId, arousalBand, shameTier);
    state = processEventQueue(state, events);
    return { state, events, narrative, intimateResponse: intimateResp ?? undefined };
  }

  // ── INITIATE_GROUP_INTIMACY (Phase 28 — 28e.3) ───────────────────────────────
  // Runs the group scene gate (SQ + degradation for both NPCs) then emits
  // INTIMACY_GROUP_SCENE_STARTED. The client then calls startGroupScene() with
  // resolved NpcPartnerProfile objects to receive the IntimacyScene.
  if (intent.type === 'INITIATE_GROUP_INTIMACY') {
    if (!state.settings.adultContentEnabled) {
      narrative.push(`Adult content is disabled.`);
      return { state, events, narrative };
    }
    const primaryNpc = state.contacts.find(c => c.character.npcId === intent.primaryNpcId)?.character;
    const secondNpc  = state.contacts.find(c => c.character.npcId === intent.secondNpcId)?.character;
    if (!primaryNpc || !secondNpc) {
      narrative.push(`One or both NPCs not found in contacts.`);
      return { state, events, narrative };
    }
    // Resolve current node indoor status for context (group scenes bypass solo
    // exposure/audience gates but context is still built for gate internals).
    const { WORLD_NODES } = require('../data/worldGraph') as {
      WORLD_NODES: import('../state/gameState').WorldNode[];
    };
    const currentNode = WORLD_NODES.find(n => n.id === state.world.currentNodeId);
    const npcsPresent = countBystanders(state);
    const ctx: IntimacyStartContext = {
      npc:         primaryNpc,
      startType:   'CONSENSUAL_GROUP',
      isIndoors:   currentNode?.isIndoors ?? false,
      npcsPresent,
      secondNpc,
    };
    const gateResult = checkGroupSceneGate(ctx, state);
    if (!gateResult.allowed) {
      const gate = gateResult.reason?.includes('unresolved') ? 'GROUP_SQ' as const : 'GROUP_DEGRADATION' as const;
      events.push({
        type:   'INTIMACY_GATE_BLOCKED',
        gate,
        npcId:  gateResult.failedNpcId ?? intent.primaryNpcId,
        reason: gateResult.reason ?? 'She refuses.',
      });
      narrative.push(gateResult.reason ?? 'She refuses.');
      state = processEventQueue(state, events);
      return { state, events, narrative };
    }
    events.push({
      type:         'INTIMACY_GROUP_SCENE_STARTED',
      primaryNpcId: intent.primaryNpcId,
      secondNpcId:  intent.secondNpcId,
      groupMode:    intent.groupMode,
    });
    narrative.push(`The moment hangs in the air between all three of you.`);
    state = processEventQueue(state, events);
    return { state, events, narrative };
  }

  // ── END_SCENE (Phase 18 / Phase 28 — 18.8 / 28c.4 / 28g.2) ─────────────────
  // Applies all post-scene side effects:
  //   • Primary pregnancy risk (solo and group)
  //   • FORCE_INTIMACY_SLEEPING witnessed: +15 shame spike on NPC (28c.4)
  //   • Group jealousy consequence: trust/bond delta between partners (28g.2)
  //   • INTIMACY_GROUP_SCENE_ENDED event for group scenes
  if (intent.type === 'END_SCENE') {
    const { npcId, persistence } = intent;

    // Primary pregnancy risk
    if (persistence.pregnancyCheck) {
      state = flagPregnancyRisk(state, npcId);
      narrative.push(`The risk of pregnancy lingers.`);
    }

    // 28c.4 — witnessed FORCE_INTIMACY_SLEEPING shame spike
    if (persistence.sceneStartType === 'FORCE_INTIMACY_SLEEPING') {
      const npcsPresent = countBystanders(state);
      if (npcsPresent > 0) {
        const contactIdx = state.contacts.findIndex(c => c.character.npcId === npcId);
        if (contactIdx !== -1) {
          const npc    = state.contacts[contactIdx].character;
          const mental = (npc.dynamicState as import('../spawn-engine/character/dynamicState').CharacterDynamicState)?.mental;
          if (mental) {
            const newShame     = Math.min(100, (mental.shameCurrent ?? 0) + 15);
            const updContacts  = [...state.contacts];
            updContacts[contactIdx] = {
              character: {
                ...npc,
                dynamicState: { ...npc.dynamicState, mental: { ...mental, shameCurrent: newShame } },
              } as import('../state/gameState').NpcCharacter,
            };
            state = { ...state, contacts: updContacts };
            narrative.push(`She wakes to find herself watched. The shame is overwhelming.`);
          }
        }
      }
    }

    // 28g.2 — group jealousy consequence
    if (persistence.jealousyFired === true && persistence.secondPartnerNpcId) {
      const secondNpcId = persistence.secondPartnerNpcId;
      const primIdx     = state.contacts.findIndex(c => c.character.npcId === npcId);
      const secIdx      = state.contacts.findIndex(c => c.character.npcId === secondNpcId);
      if (primIdx !== -1 && secIdx !== -1) {
        const applyJealousyDelta = (
          subject:  import('../state/gameState').NpcCharacter,
          targetId: string,
        ): import('../state/gameState').NpcCharacter => {
          const relIdx = subject.npcRelationships.findIndex(r => r.targetNpcId === targetId);
          if (relIdx === -1) return subject;
          const rel = subject.npcRelationships[relIdx];
          const updRel = {
            ...rel,
            trust:        Math.max(-100, rel.trust - 8),
            love:         Math.max(-100, rel.love  - 5),
            bondStrength: Math.max(0,    rel.bondStrength - 10),
          };
          const updRels = [...subject.npcRelationships];
          updRels[relIdx] = updRel;
          return { ...subject, npcRelationships: updRels };
        };
        const updContacts = [...state.contacts];
        updContacts[primIdx] = { character: applyJealousyDelta(state.contacts[primIdx].character, secondNpcId) };
        updContacts[secIdx]  = { character: applyJealousyDelta(state.contacts[secIdx].character,  npcId) };
        state = { ...state, contacts: updContacts };
        events.push({ type: 'NPC_JEALOUSY_SPIKE', subjectId: npcId, targetId: secondNpcId, rivalId: 'player' });
        narrative.push(`A cold tension settles between them. Something has shifted.`);
      }
    }

    // Group scene end event
    if (persistence.secondPartnerNpcId) {
      events.push({
        type:          'INTIMACY_GROUP_SCENE_ENDED',
        primaryNpcId:  npcId,
        secondNpcId:   persistence.secondPartnerNpcId,
        satisfaction:  persistence.satisfaction ?? 0,
        jealousyFired: persistence.jealousyFired ?? false,
      });
    }

    state = processEventQueue(state, events);
    return { state, events, narrative };
  }

  // ── SAVE_GAME (Task 22.6) ─────────────────────────────────────────────────
  // Persists current state to a manual slot (0-9).
  // The autosave slot (99) is written automatically at day-end; this intent
  // is for manual saves only -- but we don't hard-block slot 99 here since
  // a developer or debug flow might need to force an autosave write.
  if (intent.type === 'SAVE_GAME') {
    try {
      saveGame(state, intent.slot);
      narrative.push(`Game saved to slot ${intent.slot}.`);
    } catch (err) {
      narrative.push(`Save failed: ${(err as Error).message}`);
    }
    return { state, events, narrative };
  }

  // ── LOAD_GAME (Task 22.7) ─────────────────────────────────────────────────
  // Reads a save slot and returns the deserialized GameState in loadedState.
  // The caller is responsible for swapping its active state reference.
  // state (the input) is returned unchanged because a load replaces state
  // rather than mutating it -- the caller must use result.loadedState.
  if (intent.type === 'LOAD_GAME') {
    try {
      const loadedState = loadGame(intent.slot);
      narrative.push(`Game loaded from slot ${intent.slot}.`);
      return { state, events, narrative, loadedState };
    } catch (err) {
      narrative.push(`Load failed: ${(err as Error).message}`);
      return { state, events, narrative };
    }
  }

  // ── LIST_SAVES (Task 22.8) ────────────────────────────────────────────────
  // Returns save metadata for all slots. No state mutation.
  if (intent.type === 'LIST_SAVES') {
    const saves = listSaves();
    return { state, events, narrative, saves };
  }

  // ── DELETE_SAVE (Task 22.9) ───────────────────────────────────────────────
  // Deletes a manual save slot. Guard: autosave slot (99) cannot be deleted.
  if (intent.type === 'DELETE_SAVE') {
    try {
      deleteSave(intent.slot);
      narrative.push(`Slot ${intent.slot} deleted.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── START_NEW_GAME_PLUS (Task 22.13) ─────────────────────────────────────
  // Resets world/quests/contacts/etc. while preserving player progression
  // and achievements.  Requires game_cleared flag; throws otherwise.
  // The caller should have already shown a confirmation prompt.
  if (intent.type === 'START_NEW_GAME_PLUS') {
    if (!isNewGamePlusEligible(state)) {
      narrative.push(`New Game+ is not available until the game has been cleared.`);
      return { state, events, narrative };
    }
    try {
      const newState = startNewGamePlus(state);
      // Return the NG+ state as loadedState so the caller pattern is consistent
      // with LOAD_GAME: the caller swaps its active state reference.
      narrative.push(`New Game+ started. Your skills and achievements carry over.`);
      return { state, events, narrative, loadedState: newState };
    } catch (err) {
      narrative.push((err as Error).message);
      return { state, events, narrative };
    }
  }

  // ── INSPECT_CONTACT (Task 21.7) ──────────────────────────────────────────
  // Assembles the flat ContactProfileView DTO for the given NPC.
  // No state mutation; result lives only in the dispatch payload.
  if (intent.type === 'INSPECT_CONTACT') {
    const profile = assembleProfileView(state, intent.npcId);
    if (!profile) {
      narrative.push(`No contact found with id ${intent.npcId}.`);
      return { state, events, narrative, contactProfile: null };
    }
    return { state, events, narrative, contactProfile: profile };
  }

  // ── BUILD (Task 19.5) ────────────────────────────────────────────────────
  // Begins manor upgrade to next tier. Deducts gold; sets construction timer.
  // Guards inside startUpgrade(): already at max, in progress, insufficient gold.
  if (intent.type === 'BUILD') {
    try {
      const result = startUpgrade(state);
      state  = result.state;
      events = result.events;
      state  = processEventQueue(state, events);
      narrative.push(`Construction underway. The manor will be upgraded in ${state.manor.constructionTimerDays} days.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── ASSIGN_SUITE (Task 19.7) ─────────────────────────────────────────────
  // Assigns an NPC to a suite slot. Guards: tier capacity, already assigned.
  if (intent.type === 'ASSIGN_SUITE') {
    try {
      const result = assignSuite(state, intent.suiteId, intent.npcId);
      state  = result.state;
      events = result.events;
      state  = processEventQueue(state, events);
      const npc = state.contacts.find(c => c.character.npcId === intent.npcId)?.character;
      narrative.push(`${npc?.name ?? intent.npcId} has been assigned to ${intent.suiteId}.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── VACATE_SUITE (Task 19.8) ─────────────────────────────────────────────
  // Removes occupant from a suite. Guard: suite must be occupied.
  if (intent.type === 'VACATE_SUITE') {
    try {
      const result = vacateSuite(state, intent.suiteId);
      state  = result.state;
      events = result.events;
      state  = processEventQueue(state, events);
      narrative.push(`${intent.suiteId} is now vacant.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── COLLECT_RESOURCES (Task 19.10) ───────────────────────────────────────
  // Flushes the passive item queue into inventory.
  // Gold is already credited at day-end; this is a no-op until item drops land.
  if (intent.type === 'COLLECT_RESOURCES') {
    const result = collectPassiveResources(state);
    state  = result.state;
    events = result.events;
    state  = processEventQueue(state, events);
    narrative.push(`Resources collected.`);
    return { state, events, narrative };
  }

  // ── TALK (Tasks 9.1 / 13.19) ─────────────────────────────────────────────
  // Without choiceId: opens a dialogue tree with the target NPC (Task 13.19).
  // With choiceId 'FLIRT' or 'TOUCH': routes to resolveSocialAction() (Task 9.1)
  // to apply the trust/love delta and return a narrative line before any dialogue.
  //
  // The choiceId sub-action path is intentionally separate from the dialogue tree
  // path: social actions cost an action count but do not advance the dialogue
  // tree state. They can co-occur within a single TALK intent so the UI can chain
  // a flirt before entering the dialogue without a round-trip.
  if (intent.type === 'TALK') {
    const contactRecord = state.contacts.find(c => c.character.npcId === intent.npcId);
    if (!contactRecord) {
      narrative.push('Nobody by that name is here.');
      return { state, events, narrative };
    }

    // ── Task 9.1: social sub-action (FLIRT / TOUCH) ───────────────────────
    // Resolved before dialogue so the relationship delta applies immediately.
    // The social action result events (RELATIONSHIP_STATUS_CHANGED) are pushed
    // into the running event list and processed by processEventQueue below.
    if (intent.choiceId === 'FLIRT' || intent.choiceId === 'TOUCH') {
      const socialResult = resolveSocialAction(
        state,
        intent.npcId,
        intent.choiceId as SocialAction,
      );
      state  = socialResult.state;
      events = [...events, ...socialResult.events];
      narrative.push(socialResult.narrative);
      state = processEventQueue(state, events);
      // Social-only TALK: no dialogue tree opened. Return immediately.
      return { state, events, narrative };
    }

    // ── Task 13.19: open dialogue tree ────────────────────────────────────
    const companionTreeId = `${intent.npcId}_ch1`;
    const npcClass        = (contactRecord.character.background as Record<string, unknown>)?.occupation as string | undefined ?? 'civilian';
    const genericTreeId   = getGenericDialogueTreeId(npcClass);
    const resolvedTreeId  = DIALOGUE_TREES[companionTreeId] ? companionTreeId
                          : DIALOGUE_TREES[genericTreeId]   ? genericTreeId
                          : 'generic_intro';
    try {
      const result = startDialogue(state, resolvedTreeId, intent.npcId);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      return { state, events, narrative, dialogueNode: result.node };
    } catch (err) {
      narrative.push((err as Error).message);
      return { state, events, narrative };
    }
  }

  // ── DIALOGUE_CHOOSE (Task 13.20) ─────────────────────────────────────────
  // Advances the active dialogue tree by the player's selected choice index.
  // Returns the next node, or null when the tree has reached an END node.
  if (intent.type === 'DIALOGUE_CHOOSE') {
    try {
      const result = makeChoice(state, intent.choiceIndex);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      return { state, events, narrative, dialogueNode: result.node };
    } catch (err) {
      narrative.push((err as Error).message);
      return { state, events, narrative };
    }
  }

  // ── CAPTURE_MONSTER (Phase 23, Task 23.5) ─────────────────────────────────
  // Post-combat; player chose "Capture" on the defeat screen.
  // Guards inside captureMonster(): manor tier >= 3 ('holding_cells' feature),
  // free cell available, rope in inventory, enemy must be ENEMY_HUMANOID.
  if (intent.type === 'CAPTURE_MONSTER') {
    try {
      const result = captureMonster(state, intent.enemy);
      state  = result.state;
      events = result.events;
      state  = processEventQueue(state, events);
      narrative.push(result.narrative);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── INTERACT_CAPTIVE (Phase 23, Task 23.6) ────────────────────────────────
  // Daily interaction with a captive in a holding cell.
  // Advances tamingProgress (capped at 95 until relationship gate is met).
  // Converts captive to NpcCharacter via _convertToNpc() when progress hits 100.
  if (intent.type === 'INTERACT_CAPTIVE') {
    try {
      const result = interactWithCaptive(state, intent.cellId);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(result.narrative);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── CAPTIVE_ACTION (Phase 23, Task 23.7) ────────────────────────────────
  // Specific sub-action on a captive: TALK / TOUCH / FLIRT / GIVE_GIFT /
  // FIGHT / INTIMATE / RELEASE.  Social variants accumulate trust/love on the
  // HoldingCell directly (not on contacts[]).  RELEASE delegates to
  // releaseOrGraduateCaptive(); INTIMATE signals intimateReady=true and is
  // handed off to intimacyEngine.startScene() in Task 3c.4.
  if (intent.type === 'CAPTIVE_ACTION') {
    try {
      const result = resolveCaptiveAction(
        state,
        intent.cellId,
        intent.action as CaptiveActionType,
        intent.itemId,
      );
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);

      if (result.intimateReady) {
        // Task 23.21 — INTIMATE handoff: build NpcPartnerProfile from the captive
        // snapshot and call startScene() with sceneStartType = 'CAPTIVE' (maps to POST_DEFEAT).
        // The captive lives in the holding cell; we read it back after tamingEngine mutations.
        const cell = state.manor.holdingCells.find(c => c.cellId === intent.cellId);
        if (cell) {
          const captive = cell.capturedCharacter;
          // Build a minimal NpcPartnerProfile from the enemy snapshot.
          // Any field not present on EnemyHumanoidCharacter falls back to a safe default.
          const psych = captive.sexualPsychology as {
            resistanceProfile?: import('./intimacyEngine').NpcPartnerProfile['resistanceProfile'];
            corruptionShame?:   import('./intimacyEngine').NpcPartnerProfile['corruptionShame'];
            orgasmProfile?:     import('./intimacyEngine').NpcPartnerProfile['orgasmProfile'];
            acquiredKinks?:     import('./intimacyEngine').NpcPartnerProfile['acquiredKinks'];
            sexualLean?:        import('./intimacyEngine').NpcPartnerProfile['sexualLean'];
          } | null | undefined;
          const phys = captive.sexualPhysiology as {
            arousalSpeed?:      import('./intimacyEngine').NpcPartnerProfile['arousalSpeed'];
            lubricationSpeed?:  import('./intimacyEngine').NpcPartnerProfile['lubricationSpeed'];
            elasticity?:        import('./intimacyEngine').NpcPartnerProfile['elasticity'];
            sensitivity?:       import('./intimacyEngine').NpcPartnerProfile['sensitivity'];
            wetnessTrack?:      import('./intimacyEngine').NpcPartnerProfile['wetnessTrack'];
            squirtStorage?:     number;
            squirtStorageMax?:  number;
            squirtProbability?: number;
            milkStorage?:       number;
            milkStorageMax?:    number;
          } | null | undefined;

          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const { ArousalSpeed, LubricationSpeed, VaginaElasticity, SexualLean } =
            require('../spawn-engine/types/enums') as typeof import('../spawn-engine/types/enums');

          const captiveProfile: NpcPartnerProfile = {
            npcId:       captive.id,
            entityType:  'ENEMY_HUMANOID',
            lootTableId: undefined,
            xpReward:    0,
            dominantTrait:         (captive.personality as { dominantTrait?: string } | null)?.dominantTrait ?? 'Reserved',
            emotionalStability:    (captive.personality as { emotionalStability?: string } | null)?.emotionalStability ?? 'Stable',
            sexualLean:            psych?.sexualLean ?? SexualLean.Vanilla,
            acquiredKinks:         psych?.acquiredKinks ?? [],
            resistanceProfile:     psych?.resistanceProfile ?? {
              profileType:        'FREEZE' as import('../spawn-engine/types/enums').ResistanceProfileType,
              baselineResistance: 60,
              currentResistance:  Math.max(0, 80 - cell.relationshipTrust),
              traumaModifier:     0,
            },
            corruptionShame:       psych?.corruptionShame ?? {
              corruption:                  0,
              shame:                       80,
              corruptionRatePerEncounter: 2,
            },
            orgasmProfile:         psych?.orgasmProfile ?? {
              ease:             'Difficult' as import('../spawn-engine/types/enums').OrgasmEase,
              dominantType:     'Vaginal'  as import('../spawn-engine/types/enums').OrgasmType,
              acquiredTypes:    [],
              multipleCapacity: false,
              squirtCapacity:   false,
              postSensitivity:  'Normal'   as import('../spawn-engine/types/enums').PostOrgasmSensitivity,
            },
            arousalSpeed:          phys?.arousalSpeed      ?? ArousalSpeed.Moderate,
            lubricationSpeed:      phys?.lubricationSpeed  ?? LubricationSpeed.Moderate,
            elasticity:            phys?.elasticity         ?? VaginaElasticity.Moderate,
            sensitivity:           phys?.sensitivity        ?? {} as NpcPartnerProfile['sensitivity'],
            wetnessTrack:          phys?.wetnessTrack       ?? {} as NpcPartnerProfile['wetnessTrack'],
            arousalCurrent:        captive.vitals?.arousal ?? 0,
            squirtStorage:         phys?.squirtStorage      ?? 0,
            squirtStorageMax:      phys?.squirtStorageMax   ?? 100,
            squirtProbability:     phys?.squirtProbability  ?? 0.2,
            milkStorage:           phys?.milkStorage        ?? 0,
            milkStorageMax:        phys?.milkStorageMax     ?? 0,
            actsWithPlayer:        {} as NpcPartnerProfile['actsWithPlayer'],
            encounterCountWithPlayer: 0,
            trustWithPlayer:       cell.relationshipTrust,
            attachmentWithPlayer:  cell.relationshipLove,
            submissionToPlayer:    Math.min(100, cell.tamingProgress),
            hiddenDesireAligned:   false,
            intimacyLifeForce:     100,
          };

          const player = state.player;
          const playerProfile = {
            technique:      player.technique,
            virility:       player.virility,
            staminaCurrent: player.vitals.stamina.current,
            staminaMax:     player.vitals.stamina.max,
            cumStorage:     60,
            cumStorageMax:  100,
            arousalCurrent: player.vitals.arousal,
            intimatePartnerHistory: [],
          };

          const captiveScene = startScene(
            captive.id,
            'POST_DEFEAT',   // CAPTIVE scenes are treated as POST_DEFEAT mechanically
            captiveProfile,
            playerProfile,
          );

          narrative.push(`The moment between you shifts. She stills, watching you.`);
          return { state, events, narrative, captiveScene };
        }

        narrative.push(`[INTIMATE scene: captive no longer in cell]`);
      } else if (result.narrative) {
        narrative.push(result.narrative);
      }
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── APPLY_ALIGNMENT_DELTA (Phase 24) ──────────────────────────────────────
  if (intent.type === 'APPLY_ALIGNMENT_DELTA') {
    const result = applyAlignmentDelta(state, intent.axis, intent.delta, intent.source);
    state  = result.state;
    events = [...events, ...result.events];
    state  = processEventQueue(state, events);
    return { state, events, narrative };
  }

  // ── EVALUATE_DIVERGENCE (Phase 24) ──────────────────────────────────────────
  if (intent.type === 'EVALUATE_DIVERGENCE') {
    const { multiplier, events: devEvents } = evaluateDivergence(state, intent.resolutionAxis);
    events = [...events, ...devEvents];
    state  = processEventQueue(state, events);
    narrative.push(multiplier > 1.0
      ? `Your convictions resist this path. Difficulty ×${multiplier.toFixed(1)}.`
      : `This path aligns with your convictions.`);
    return { state, events, narrative, divergenceMultiplier: multiplier };
  }

  // ── APPLY_INFAMY_DELTA (Phase 24) ──────────────────────────────────────────
  if (intent.type === 'APPLY_INFAMY_DELTA') {
    const result = applyInfamyDelta(
      state,
      intent.regionId as import('../state/gameState').RegionId,
      intent.delta,
    );
    state  = result.state;
    events = [...events, ...result.events];
    state  = processEventQueue(state, events);
    return { state, events, narrative };
  }

  // ── CLEAR_INFAMY (Phase 24) ─────────────────────────────────────────────────
  if (intent.type === 'CLEAR_INFAMY') {
    try {
      const result = clearInfamy(
        state,
        intent.regionId as import('../state/gameState').RegionId,
      );
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(`Infamy cleared in ${intent.regionId}.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── UNLOCK_SPIRE (Phase 24) ─────────────────────────────────────────────────
  if (intent.type === 'UNLOCK_SPIRE') {
    try {
      const result = unlockSpire(state, intent.nodeId);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(`Ley-line spire at ${intent.nodeId} has been attuned.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── SPIRE_TRAVEL (Phase 24) ─────────────────────────────────────────────────
  if (intent.type === 'SPIRE_TRAVEL') {
    try {
      const result = spireTravel(state, intent.fromNodeId, intent.toNodeId);
      state  = result.state;
      events = [...events, ...result.events];
      // syncActiveEffects: recompute weather effects for the new region.
      state  = syncActiveEffects(result.state, /* weatherCatalog injected by caller */ []);
      state  = processEventQueue(state, events);
      narrative.push(`You step through the ley-line spire. The world blurs and reforms.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── EQUIP_JOB (Phase 24) ────────────────────────────────────────────────────
  if (intent.type === 'EQUIP_JOB') {
    const result = equipJob(state, intent.jobDef);
    state  = result.state;
    events = [...events, ...result.events];
    state  = processEventQueue(state, events);
    narrative.push(`Job archetype set to ${intent.jobDef.name}.`);
    return { state, events, narrative };
  }

  // ── EQUIP_CLASS (Phase 24) ──────────────────────────────────────────────────
  if (intent.type === 'EQUIP_CLASS') {
    const result = equipClass(state, intent.classId);
    state  = result.state;
    events = [...events, ...result.events];
    state  = processEventQueue(state, events);
    narrative.push(`Class changed to ${intent.classId}.`);
    return { state, events, narrative };
  }

  // ── UNLOCK_CLASS_NODE (Phase 24) ────────────────────────────────────────────
  if (intent.type === 'UNLOCK_CLASS_NODE') {
    try {
      const result = unlockClassNode(state, intent.classDef, intent.nodeId, intent.spPool);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(`Class node "${intent.nodeId}" unlocked.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── RESET_CLASS_TREE (Phase 24) ─────────────────────────────────────────────
  if (intent.type === 'RESET_CLASS_TREE') {
    const result = resetClassTree(state, intent.classDef, intent.spPool);
    state  = result.state;
    events = [...events, ...result.events];
    state  = processEventQueue(state, events);
    narrative.push(`Class tree for "${intent.classDef.id}" reset. SP refunded.`);
    return { state, events, narrative };
  }

  // ── PROMOTE_JOB (Phase 24) ──────────────────────────────────────────────────
  if (intent.type === 'PROMOTE_JOB') {
    try {
      const result = promoteJob(state, intent.currentJobDef, intent.promotedJobDef);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(`Promoted to ${intent.promotedJobDef.name}!`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── ACTIVATE_SYNERGY (Phase 24) ─────────────────────────────────────────────
  // ── UNLOCK_PATH (Phase 30) ──────────────────────────────────────────────────────────────────
  // Awakens the player into a new job archetype.
  // STONE: consumes a Path Stone from inventory before calling unlockPath().
  //        If the stone is absent, returns a narrative error without unlocking.
  // TEMPLE_RITE: no item consumed; anomalous roll fires for anomalousMp players.
  if (intent.type === 'UNLOCK_PATH') {
    if (intent.trigger === 'STONE') {
      const stoneId = intent.itemId ?? 'path_stone';
      try {
        const removeResult = removeItem(state, stoneId, 1, 'CONSUMED');
        state  = removeResult.state;
        events = [...events, ...removeResult.events];
      } catch {
        narrative.push(`You need a Path Stone to awaken into this path.`);
        return { state, events, narrative };
      }
    }

    const result = unlockPath(state, intent.pathId, intent.trigger as PathAwakeningTrigger, intent.seed);
    state  = result.state;
    events = [...events, ...result.events];
    state  = processEventQueue(state, events);

    const failureEvent = result.events.find(e => e.type === 'PATH_UNLOCK_FAILED');
    if (failureEvent) {
      narrative.push(`The Temple Rite rejects your foreign essence. The path remains sealed.`);
    } else {
      const unlockEvent = result.events.find(e => e.type === 'PATH_UNLOCKED');
      const wasAnomalous =
        unlockEvent && (unlockEvent as { anomalousRite?: boolean }).anomalousRite === true;
      narrative.push(wasAnomalous
        ? `The path awakens within you — but wrongly. Something ancient stirs in your blood.`
        : `A new path has awakened within you.`,
      );
    }
    return { state, events, narrative };
  }

  if (intent.type === 'ACTIVATE_SYNERGY') {
    try {
      const result = activateSynergy(state, intent.synergyDef);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(`${intent.synergyDef.comboName}!`);
      return { state, events, narrative, synergyPayload: result.effectPayload };
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── EVALUATE_SYNERGIES (Phase 24) ───────────────────────────────────────────
  if (intent.type === 'EVALUATE_SYNERGIES') {
    const result = evaluateSynergyUnlocks(state, intent.catalog);
    state  = result.state;
    events = [...events, ...result.events];
    state  = processEventQueue(state, events);
    return { state, events, narrative };
  }

  // ── NEW_GAME (Phase 24 / Task 3c.4) ─────────────────────────────────────────
  // Applies all character creation choices to the bare world-seeded GameState.
  // World seeding (spawnLocationPopulation + simulateWorldHistory) must run first.
  if (intent.type === 'NEW_GAME') {
    try {
      const result = createCharacter(
        state,
        intent.options,
        intent.subClassDef,
        intent.traitDef,
        intent.jobDef,
        intent.classDef,
      );
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(`Welcome, ${intent.options.playerName}. Your journey begins.`);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── PAY_TITHE (Task 26.6) ────────────────────────────────────────────────────────
  if (intent.type === 'PAY_TITHE') {
    try {
      const result = payTithe(state, intent.regionId);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(result.narrative);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── OPEN_SOCKET (Task 26.12) ────────────────────────────────────────────────────
  if (intent.type === 'OPEN_SOCKET') {
    try {
      const result = socketItem(state, intent.itemId, intent.socketId, intent.materialId);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(result.narrative);
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── HIRE_CARRIAGE (Task 26.14) ───────────────────────────────────────────────────
  if (intent.type === 'HIRE_CARRIAGE') {
    try {
      const result = hireCarriage(state, intent.targetNodeId);
      state  = result.state;
      events = [...events, ...result.events];
      state  = processEventQueue(state, events);
      narrative.push(result.narrative);
      return { state, events, narrative, carriaeTravelPhases: result.phasesSkipped };
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── Mini-game intents (Tasks 26.16–26.19) ──────────────────────────────────────
  // FISH, GAMBLE, ARENA, ONSEN all route through the same stub resolver.
  if (
    intent.type === 'FISH'   ||
    intent.type === 'GAMBLE' ||
    intent.type === 'ARENA'  ||
    intent.type === 'ONSEN'
  ) {
    const featureKey = intent.type.toLowerCase() as import('../state/gameState').LocationFeatureKey;
    try {
      const startResult = startMiniGame(state, featureKey);
      state  = startResult.state;
      events = [...events, ...startResult.events];
      narrative.push(startResult.narrative);

      const resolveResult = resolveMiniGame(state, featureKey);
      state  = resolveResult.state;
      events = [...events, ...resolveResult.events];
      state  = processEventQueue(state, events);
      narrative.push(resolveResult.narrative);
      return { state, events, narrative, miniGameOutcome: resolveResult.outcome };
    } catch (err) {
      narrative.push((err as Error).message);
    }
    return { state, events, narrative };
  }

  // ── COMMIT_CRIME (Task 26.21) ────────────────────────────────────────────────────
  if (intent.type === 'COMMIT_CRIME') {
    const result = commitCrime(state, intent.crimeType as CrimeType);
    state  = result.state;
    events = [...events, ...result.events];
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── GRANT_PARDON (Task 26.23) ───────────────────────────────────────────────────
  if (intent.type === 'GRANT_PARDON') {
    const result = grantPardon(
      state,
      intent.regionId as import('../state/gameState').RegionId,
      intent.questId,
    );
    state  = result.state;
    events = [...events, ...result.events];
    state  = processEventQueue(state, events);
    narrative.push(result.narrative);
    return { state, events, narrative };
  }

  // ── BUILD_STRONGHOLD (Task 26.28) ───────────────────────────────────────────────
  // Requires the player to have established the Enclave Stronghold flag in the
  // current region. Gate: flags['enclave_stronghold_' + regionId] must be true.
  // Building a stronghold is a prerequisite for unlocking spires in that region.
  if (intent.type === 'BUILD_STRONGHOLD') {
    const regionId = _resolveCurrentRegion(state);
    if (!regionId) {
      narrative.push(`You can't build a stronghold here — location not recognised.`);
      return { state, events, narrative };
    }
    const flagKey = `enclave_stronghold_${regionId}`;
    if (state.flags[flagKey]) {
      narrative.push(`You've already established an Enclave Stronghold in this region.`);
      return { state, events, narrative };
    }
    // Deduct a gold cost for construction (flat for now; upgradeable via quest reward later).
    const STRONGHOLD_COST = 500;
    if (state.player.gold < STRONGHOLD_COST) {
      narrative.push(`Building a Stronghold requires ${STRONGHOLD_COST}g. You have ${state.player.gold}g.`);
      return { state, events, narrative };
    }
    state = {
      ...state,
      player: { ...state.player, gold: state.player.gold - STRONGHOLD_COST },
      flags:  { ...state.flags, [flagKey]: true },
    };
    events.push({ type: 'GOLD_CHANGED', delta: -STRONGHOLD_COST, newAmount: state.player.gold });
    events.push({ type: 'STRONGHOLD_BUILT', regionId });
    state = processEventQueue(state, events);
    narrative.push(`The Enclave Stronghold rises in ${regionId}. Spire attunement is now possible here.`);
    return { state, events, narrative };
  }

  throw new Error(`dispatch() not yet implemented for intent type: ${(intent as { type: string }).type}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// EVENT QUEUE PROCESSOR  (Task 3c.5 — DispatchPipeline step 3)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * After each primary engine resolves, the dispatcher processes all emitted
 * GameEvents in order, applying cross-engine side effects.
 *
 * Wired event handlers (in phase order):
 *   COMBAT_DEFEAT_OUTCOME        — defeat outcome + reputation (Task 10.9)
 *   ENEMY_KILLED_IN_INTIMACY     — XP + loot + reputation (Task 10.10)
 *   NPC_DIED_IN_INTIMACY         — remove NPC, reputation penalty (Task 10.11)
 *   ENEMY_KILLED                 — quest KILL objectives (Task 11.14)
 *   ITEM_COLLECTED               — quest COLLECT objectives (Task 11.15)
 *   DIALOGUE_COMPLETED           — quest TALK objectives (Task 11.16)
 *   TRAVEL_NODE_REACHED          — quest TRAVEL objectives + weather sync (Task 11.17 / 24.33)
 *   RELATIONSHIP_STATUS_CHANGED  — narrative hook for future dialogue unlocks (Task 9.1)
 *   SPIRE_UNLOCKED               — integrity audit hook (Task 24.33)
 *   INFAMY_DELTA                 — re-run infamy engine for combat-sourced deltas (Task 24.29)
 *   MONSTER_TAMED                — increment tamed_monster_count flag (Phase 23)
 *   INTIMACY_GROUP_SCENE_ENDED   — satisfaction flag + jealousy spike (Phase 28)
 *   NPC_JEALOUSY_SPIKE           — flag key for UI jealousy indicator (Phase 28)
 *
 * All other event types pass through as no-ops until their phase wires them.
 */
export function processEventQueue(state: GameState, events: GameEvent[]): GameState {
  for (const event of events) {
    switch (event.type) {

      // ── Task 10.9 ─────────────────────────────────────────────────────────
      // COMBAT_DEFEAT_OUTCOME: emitted by combatEngine when the player loses.
      // Routes to enemySpawnEngine.selectDefeatOutcome() to decide what happens.
      // KILL outcomes apply a reputation bonus (+10 for eliminating a combatant).
      // Intimate outcomes: TODO — initiate intimacy scene once intimacyEngine
      // is wired into the dispatcher (Phase 13+).
      case 'COMBAT_DEFEAT_OUTCOME': {
        // Look up the primary enemy in world state so we know their outcome options.
        // At runtime the enemy will be in the active CombatState, which the full
        // dispatcher wiring (Task 3c.4) will pass here. For now we resolve what we
        // can: apply a kill-combatant reputation bonus for any KILL outcome.
        // The full outcome routing (Intimate → scene, Interrogate → dialogue) is
        // a Task 3c.4 concern because it requires a live CombatState reference.
        const ctx: DefeatContext = {
          isPurificationVictory: false,
          isHumanoidEnemy:       false, // unknown without live CombatState; defaults to non-humanoid
          playerHasRopeItem:     false,
          isPublicLocation:      false,
          adultContentEnabled:   state.settings.adultContentEnabled,
        };
        // Generic default outcome when we lack the full enemy profile.
        // The real outcome selection happens inside resolveCombatAction() via
        // emitDefeatOutcome(); this handler applies the reputation side effect.
        void ctx; // suppress unused-var warning; ctx used in full wiring
        const repResult = applyReputationEvent(state, event.regionId as RegionId, 'KILL_COMBATANT');
        state = repResult.state;
        break;
      }

      // ── Task 10.10 ────────────────────────────────────────────────────────
      // ENEMY_KILLED_IN_INTIMACY: emitted by intimacyEngine when a humanoid
      // enemy's life force reaches 0 in a POST_DEFEAT scene.
      // Equivalent to a combat kill: award XP, resolve loot, apply reputation.
      case 'ENEMY_KILLED_IN_INTIMACY': {
        // Award XP to the player
        state = {
          ...state,
          player: {
            ...state.player,
            xp: state.player.xp + event.xpReward,
          },
        };

        // Resolve and credit loot via resolveLootDrop() (Phase 12 closed).
        // The lootTable object lives on the CombatState.killedEnemies record;
        // for ENEMY_KILLED_IN_INTIMACY the table id is stored as a string key.
        // Until Phase 17 wires a full loot registry, we skip resolution when
        // lootTableId is null (purification kill with no loot defined).
        if (event.lootTableId !== null) {
          // lootTableId here is a string stub; real table resolution requires
          // a static loot registry (Phase 17). Loot drop deferred until then.
          // resolveLootDrop(state, lootTable) is called from combatEngine victory
          // path where the LootTable object is in scope (not just the id string).
          void event.lootTableId; // suppress unused warning until Phase 17
        }

        // Apply the same reputation bonus as a combat kill (no penalty for killing an enemy)
        // We need to know the current region; use the world state's current location.
        // Full region lookup requires worldEngine (Phase 17); use a best-effort approach.
        const currentRegion = _resolveCurrentRegion(state);
        if (currentRegion) {
          const repResult = applyReputationEvent(state, currentRegion, 'KILL_COMBATANT');
          state = repResult.state;
        }
        break;
      }

      // ── Task 10.11 ────────────────────────────────────────────────────────
      // NPC_DIED_IN_INTIMACY: emitted by intimacyEngine when an NPC's life
      // force reaches 0 during a scene. The NPC is dead; apply all consequences.
      case 'NPC_DIED_IN_INTIMACY': {
        const { npcId, reputationPenalty } = event;

        // Mark the NPC as deceased (tombstone) and remove from contacts[]
        state = {
          ...state,
          contacts: state.contacts.filter(c => c.character.npcId !== npcId),
          // Party: remove downed companion if they were in the party
          party: {
            ...state.party,
            companions: state.party.companions.filter(m => m.npcId !== npcId),
          },
          // Increment the intimacy death counter flag
          flags: {
            ...state.flags,
            intimacy_death_count: ((state.flags['intimacy_death_count'] as number | undefined) ?? 0) + 1,
          },
        };

        // Apply reputation penalty in the current region.
        // reputationPenalty is the signed negative value from SceneEndPersistence
        // (already negative: -20 / -30 / -40 depending on scene start type).
        const currentRegion = _resolveCurrentRegion(state);
        if (currentRegion) {
          const repResult = applyReputationDelta(state, currentRegion, reputationPenalty);
          state = repResult.state;
        }
        break;
      }

      // ── Task 11.14 ───────────────────────────────────────────────────────────
      // ENEMY_KILLED: increment KILL objectives on all ACTIVE quests whose
      // targetId matches the killed enemy's type/id.
      case 'ENEMY_KILLED': {
        for (const entry of state.quests.entries) {
          if (entry.status !== 'ACTIVE') continue;
          const def = QUEST_CATALOG[entry.defId];
          if (!def) continue;
          def.objectives.forEach((obj, idx) => {
            if (obj.type === 'KILL' && obj.targetId === event.targetId) {
              const result = updateObjective(state, entry.defId, idx, 1);
              state = result.state;
            }
          });
        }
        // Phase 31 (task 31c.3): award charter XP on every combat kill.
        // Bosses (enemies with a phase script) award 50 XP; standard enemies award 10.
        {
          const charterResult = awardCharterXP(state, event.isBoss ? 50 : 10);
          state = charterResult.state;
          events.push(...charterResult.events);
        }
        break;
      }

      // ── Task 11.15 ───────────────────────────────────────────────────────────
      // ITEM_COLLECTED: increment COLLECT objectives matching the acquired itemId.
      case 'ITEM_COLLECTED': {
        for (const entry of state.quests.entries) {
          if (entry.status !== 'ACTIVE') continue;
          const def = QUEST_CATALOG[entry.defId];
          if (!def) continue;
          def.objectives.forEach((obj, idx) => {
            if (obj.type === 'COLLECT' && obj.targetId === event.itemId) {
              const result = updateObjective(state, entry.defId, idx, event.quantity);
              state = result.state;
            }
          });
        }
        break;
      }

      // ── Task 11.16 ───────────────────────────────────────────────────────────
      // DIALOGUE_COMPLETED: increment TALK objectives matching the speaker NPC id.
      case 'DIALOGUE_COMPLETED': {
        for (const entry of state.quests.entries) {
          if (entry.status !== 'ACTIVE') continue;
          const def = QUEST_CATALOG[entry.defId];
          if (!def) continue;
          def.objectives.forEach((obj, idx) => {
            if (obj.type === 'TALK' && obj.targetId === event.speakerNpcId) {
              const result = updateObjective(state, entry.defId, idx, 1);
              state = result.state;
            }
          });
        }
        break;
      }

      // ── Task 11.17 ───────────────────────────────────────────────────────────
      // TRAVEL_NODE_REACHED: increment TRAVEL objectives matching the nodeId.
      // Phase 17 canonical field is nodeId (worldNodeId removed from schema).
      case 'TRAVEL_NODE_REACHED': {
        for (const entry of state.quests.entries) {
          if (entry.status !== 'ACTIVE') continue;
          const def = QUEST_CATALOG[entry.defId];
          if (!def) continue;
          def.objectives.forEach((obj, idx) => {
            if (obj.type === 'TRAVEL' && obj.targetId === event.nodeId) {
              const result = updateObjective(state, entry.defId, idx, 1);
              state = result.state;
            }
          });
        }
        // Task 24.32: re-sync active weather effects for the newly entered region.
        // No-op until weatherCatalog is authored (Task 24.37).
        state = syncActiveEffects(state, []);
        break;
      }

      // ── Task 9.1 ─────────────────────────────────────────────────────────────
      // RELATIONSHIP_STATUS_CHANGED: emitted by resolveSocialAction(),
      // applyPostSceneRelationshipDelta(), giveGift(), and the day-end NPC social tick
      // whenever a trust/love delta moves an NPC across a 16-cell band boundary.
      //
      // Current handler: narrative hook only. Future wiring (Phase 13 / companion
      // quest system) will use this to unlock specific dialogue trees and scene
      // eligibility gates. For now we set a per-NPC flag in state.flags so other
      // engines can detect the transition without re-computing the band.
      //
      // Flag key pattern: 'rel_status_<npcId>' → RelationshipStatus label string.
      // Overwritten on every status change; the previous value is not kept.
      case 'RELATIONSHIP_STATUS_CHANGED': {
        const flagKey = `rel_status_${event.npcId}`;
        state = {
          ...state,
          flags: { ...state.flags, [flagKey]: event.to },
        };
        break;
      }

      // ── Task 24.33: SPIRE_UNLOCKED prerequisite audit ────────────────────
      // The dispatcher handler (UNLOCK_SPIRE intent) already checks the
      // Enclave Stronghold flag before calling unlockSpire(). If an event
      // arrives here via another path (e.g. script), re-assert the gate.
      // No-op: the flag check lives in the UNLOCK_SPIRE intent handler above;
      // this case is a safety hook for future event-driven unlock paths.
      case 'SPIRE_UNLOCKED': {
        // Integrity note: if the enclave flag is absent on this event, log
        // a warning but do not revert the unlock — the intent guard is
        // authoritative; events are not reversible post-emit.
        break;
      }

      // ── Task 24.29: INFAMY_DELTA from combat kills ──────────────────────────
      // Emitted by combatEngine.emitVictoryEvents() for GUARD / CRIMINAL faction kills.
      // newScore in the event is 0 (placeholder); applyInfamyDelta recalculates it.
      case 'INFAMY_DELTA': {
        const infamyResult = applyInfamyDelta(state, event.regionId, event.delta);
        state = infamyResult.state;
        break;
      }

      // ── Phase 23: MONSTER_TAMED ─────────────────────────────────────────
      // Contact insertion and cell removal already happened inside _convertToNpc().
      // Increment a persistent counter flag so achievement checks can trigger.
      case 'MONSTER_TAMED': {
        const tamedCount =
          ((state.flags['tamed_monster_count'] as number | undefined) ?? 0) + 1;
        state = {
          ...state,
          flags: { ...state.flags, tamed_monster_count: tamedCount },
        };
        break;
      }

      // ── Phase 28: INTIMACY_GROUP_SCENE_ENDED (28g.2 consequence hook) ──────────
      // Emitted by dispatcher END_SCENE handler. Records group scene satisfaction
      // in a per-NPC pair flag so UI can surface the memory, and marks that a
      // group scene occurred today (used by day-end NPC social tick).
      case 'INTIMACY_GROUP_SCENE_ENDED': {
        const pairKey = `group_scene_${event.primaryNpcId}_${event.secondNpcId}`;
        state = {
          ...state,
          flags: {
            ...state.flags,
            [pairKey]: event.satisfaction,
            group_scene_today: true,
          },
        };
        break;
      }

      // ── Phase 28: NPC_JEALOUSY_SPIKE ───────────────────────────────────────
      // Emitted by END_SCENE jealousy branch. The trust/bond delta is already
      // applied directly to contacts[] above; this event sets a UI flag so the
      // IntimacyView can show a jealousy indicator on the next interaction.
      case 'NPC_JEALOUSY_SPIKE': {
        const jealousyKey = `jealousy_${event.subjectId}_${event.targetId}`;
        state = {
          ...state,
          flags: { ...state.flags, [jealousyKey]: true },
        };
        break;
      }

      // ── All other events pass through until their phase wires them ─────────
      default:
        break;
    }
  }

  // ── Task 20.11: single post-loop achievement check ──────────────────────
  // After all event side effects resolve, evaluate achievements once against
  // the full batch. EVENT-type achievements match against any event in the
  // batch; COUNT/FLAG/STAT achievements evaluate against the post-event state.
  // This is always the last mutation applied to state in any intent resolution.
  const achResult = checkAchievements(state, events);
  state  = achResult.state;
  // Append ACHIEVEMENT_UNLOCKED events so the UI can render unlock pop-ups.
  // These are appended after the loop so they never trigger re-entrant processing.
  events.push(...achResult.events);

  return state;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Best-effort: infer the current region from worldState.currentLocationId.
 * The convention in static data is that location IDs are prefixed with their
 * region (e.g. 'region_forest_glade', 'region_start_village_square').
 * Full resolution requires worldEngine (Phase 17).
 *
 * Returns a RegionId string or null if it cannot be inferred.
 */
function _resolveCurrentRegion(state: GameState): RegionId | null {
  const locationId = state.world.currentLocationId;
  if (!locationId) return null;

  // If the location ID directly matches a reputation key, use it.
  if (Object.prototype.hasOwnProperty.call(state.reputation, locationId)) {
    return locationId as RegionId;
  }

  // Try the first underscore-separated segment as a region prefix.
  const parts  = locationId.split('_');
  // Region IDs in mock data are e.g. 'region_start', 'region_forest'
  // Location IDs may be 'region_start_village_square' — check prefix combos.
  for (let i = parts.length - 1; i >= 1; i--) {
    const candidate = parts.slice(0, i).join('_');
    if (Object.prototype.hasOwnProperty.call(state.reputation, candidate)) {
      return candidate as RegionId;
    }
  }

  return null;
}
