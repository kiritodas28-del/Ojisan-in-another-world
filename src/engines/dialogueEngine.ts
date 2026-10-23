/**
 * dialogueEngine.ts
 * Branching dialogue tree traversal, condition evaluation, and effect application.
 *
 * Schema types (DialogueNode, DialogueChoice, etc.) are owned by gameState.ts.
 * Tree catalog lives in src/data/dialogueTrees.ts.
 * Non-intimate response fragments: src/data/dialogueFragments.ts.
 * Intimate response fragments:     src/data/intimateResponseFragments.ts.
 *
 * Phase 13 -- Tasks 13.9 through 13.17
 */

import type {
  GameState,
  GameEvent,
  DialogueCondition,
  DialogueChoice,
  DialogueNode,
  DialogueEffect,
} from '../state/gameState';
import { createEmptyDialogueState } from '../state/gameState';
import { getDialogueTree }          from '../data/dialogueTrees';
import { hasItem, addItem, removeItem } from './economyEngine';
import { applyPostSceneRelationshipDelta } from './relationshipEngine';
import { acceptQuest }                  from './questEngine';
import { updateObjective }              from './questEngine';
import { individuateContact } from './npcPopulationEngine';
import { QUEST_CATALOG }                from '../data/quests';
import { incrementAchievementCounter }  from './achievementEngine';
import { shiftAlignment, getDominantAlignment } from './alignmentEngine';
import { CHARTER_XP_THRESHOLDS } from './charterEngine';

// ─── Re-exports for consumers that previously imported from here ──────────────
// The canonical types now live in gameState.ts. Re-export so that any
// existing imports from 'dialogueEngine' don't break before they're updated.
export type { DialogueCondition, DialogueChoice, DialogueNode } from '../state/gameState';

// ============================================================
// 13.9 — CONDITION EVALUATOR
// ============================================================

/**
 * Evaluates a single DialogueCondition against the current game state.
 * Pure function; never mutates state.
 */
export function evaluateCondition(
  gameState: GameState,
  condition: DialogueCondition,
  npcId: string,
): boolean {
  switch (condition.type) {
    case 'FLAG': {
      const v = gameState.flags[condition.flagId];
      return v === condition.value;
    }
    case 'TRUST': {
      const contact = gameState.contacts.find(
        c => c.character.npcId === (condition.npcId || npcId),
      );
      return (contact?.character.trust ?? 0) >= condition.min;
    }
    case 'LOVE': {
      const contact = gameState.contacts.find(
        c => c.character.npcId === (condition.npcId || npcId),
      );
      return (contact?.character.love ?? 0) >= condition.min;
    }
    case 'QUEST_STAGE': {
      const entry = gameState.quests.entries.find(
        e => e.defId === condition.questId && e.status === 'ACTIVE',
      );
      return (entry?.objectiveProgress[0] ?? 0) >= condition.stage;
    }
    case 'ITEM_IN_INV': {
      return hasItem(gameState, condition.itemId);
    }
    case 'COMPANION': {
      const inParty = gameState.party.companions.some(m => m.npcId === condition.companionId);
      return condition.inParty ? inParty : !inParty;
    }
    // Phase 23a (task 23a.13): gate dialogue on dominant moral alignment.
    case 'ALIGNMENT': {
      return getDominantAlignment(gameState) === condition.dominantAlignment;
    }
    // Phase 31 (task 31c.4): gate dialogue on minimum charter rank.
    // Compares player's total charterXP against the rank's threshold directly,
    // so the condition remains valid even before charterRank is recomputed.
    case 'CHARTER_RANK': {
      return gameState.player.charterXP >= CHARTER_XP_THRESHOLDS[condition.minRank];
    }
    // Phase 32 (task 32.7): gate dialogue on minimum divinity score.
    // condition.min is the raw numeric threshold (authors use DIVINITY_MILESTONES
    // values as the canonical source; anything >= min passes).
    case 'DIVINITY': {
      return gameState.player.divinity >= condition.min;
    }
    // Phase 33 (task 33c.3): gate dialogue on faith affiliation.
    // 'player' checks the player's own faithId; any other npcId checks the matching contact.
    case 'FAITH': {
      if (npcId === 'player') {
        return gameState.player.faithId === condition.faithId;
      }
      const contact = gameState.contacts.find(c => c.character.npcId === npcId);
      return (contact?.character.faithId ?? undefined) === condition.faithId;
    }
  }
}

// ============================================================
// 13.10 — AVAILABLE CHOICES
// ============================================================

/**
 * Returns all non-hidden choices for a node, with a `locked` flag for each.
 * locked=true when the choice's condition fails; the UI greys it out.
 * hidden=true choices are excluded entirely from the returned array.
 */
export function getAvailableChoices(
  gameState: GameState,
  node: DialogueNode,
  npcId: string,
): { choice: DialogueChoice; locked: boolean }[] {
  return node.choices
    .filter(c => !c.hidden)
    .map(c => ({
      choice: c,
      locked: c.condition ? !evaluateCondition(gameState, c.condition, npcId) : false,
    }));
}

// ============================================================
// 13.13 — DIALOGUE EFFECT APPLICATOR
// ============================================================

/**
 * Applies a single DialogueEffect to the game state.
 * Delegates to the appropriate engine for each effect type.
 */
export function applyDialogueEffect(
  gameState: GameState,
  effect: DialogueEffect,
): { state: GameState; events: GameEvent[] } {
  const events: GameEvent[] = [];

  switch (effect.type) {

    case 'SET_FLAG': {
      const state: GameState = {
        ...gameState,
        flags: { ...gameState.flags, [effect.flagId]: effect.value },
      };
      events.push({ type: 'DIALOGUE_EFFECT_APPLIED', effect });
      return { state, events };
    }

    case 'TRUST_DELTA': {
      // applyPostSceneRelationshipDelta handles band-change detection and event emission.
      const result = applyPostSceneRelationshipDelta(gameState, effect.npcId, effect.delta, 0);
      events.push({ type: 'DIALOGUE_EFFECT_APPLIED', effect }, ...result.events);
      return { state: result.state, events };
    }

    case 'LOVE_DELTA': {
      const result = applyPostSceneRelationshipDelta(gameState, effect.npcId, 0, effect.delta);
      events.push({ type: 'DIALOGUE_EFFECT_APPLIED', effect }, ...result.events);
      return { state: result.state, events };
    }

    case 'GIVE_ITEM': {
      const result = addItem(gameState, effect.itemId, effect.quantity, 'REWARD');
      events.push({ type: 'DIALOGUE_EFFECT_APPLIED', effect }, ...result.events);
      return { state: result.state, events };
    }

    case 'TAKE_ITEM': {
      try {
        const result = removeItem(gameState, effect.itemId, effect.quantity, 'USED');
        events.push({ type: 'DIALOGUE_EFFECT_APPLIED', effect }, ...result.events);
        return { state: result.state, events };
      } catch (err) {
        // Item not in inventory — log but don't crash; dialogue continues.
        console.warn(`applyDialogueEffect TAKE_ITEM: ${(err as Error).message}`);
        return { state: gameState, events };
      }
    }

    case 'START_QUEST': {
      try {
        const result = acceptQuest(gameState, effect.questDefId);
        events.push({ type: 'DIALOGUE_EFFECT_APPLIED', effect }, ...result.events);
        return { state: result.state, events };
      } catch (err) {
        console.warn(`applyDialogueEffect START_QUEST: ${(err as Error).message}`);
        return { state: gameState, events };
      }
    }

    // Phase 23a (task 23a.12): apply an alignment score shift via shiftAlignment().
    case 'ALIGNMENT_SHIFT': {
      const result = shiftAlignment(gameState, effect.delta);
      events.push({ type: 'DIALOGUE_EFFECT_APPLIED', effect }, ...result.events);
      return { state: result.state, events };
    }

    // Phase 33 (task 33c.4): set faith affiliation on the player or a contact.
    // npcId 'player' targets the player; any other value targets a contact by npcId.
    // Emits FAITH_SET before DIALOGUE_EFFECT_APPLIED so listeners see the full picture.
    case 'SET_FAITH': {
      const prevFaith =
        effect.npcId === 'player'
          ? gameState.player.faithId
          : gameState.contacts.find(c => c.character.npcId === effect.npcId)?.character.faithId;

      let state = gameState;
      if (effect.npcId === 'player') {
        state = { ...state, player: { ...state.player, faithId: effect.faithId } };
      } else {
        const updatedContacts = state.contacts.map(c =>
          c.character.npcId === effect.npcId
            ? { ...c, character: { ...c.character, faithId: effect.faithId } }
            : c,
        );
        state = { ...state, contacts: updatedContacts };
      }

      events.push({
        type:            'FAITH_SET',
        targetId:        effect.npcId,
        faithId:         effect.faithId,
        previousFaithId: prevFaith,
      });
      events.push({ type: 'DIALOGUE_EFFECT_APPLIED', effect });
      return { state, events };
    }
  }
}

// ─── Apply an array of effects in sequence ────────────────────────────────────
function applyEffects(
  gameState: GameState,
  effects: DialogueEffect[],
): { state: GameState; events: GameEvent[] } {
  let state  = gameState;
  const events: GameEvent[] = [];
  for (const eff of effects) {
    const result = applyDialogueEffect(state, eff);
    state = result.state;
    events.push(...result.events);
  }
  return { state, events };
}

// ============================================================
// 13.14 — END DIALOGUE
// ============================================================

/**
 * Clears active dialogue state, emits DIALOGUE_COMPLETED, and updates
 * any TALK quest objectives for the departing speaker NPC.
 */
export function endDialogue(
  gameState: GameState,
): { state: GameState; events: GameEvent[] } {
  const { speakerNpcId, activeTreeId } = gameState.dialogue;
  const events: GameEvent[] = [];

  let state: GameState = {
    ...gameState,
    dialogue: createEmptyDialogueState(),
  };

  // Emit DIALOGUE_COMPLETED (also picked up by quest engine for TALK objectives)
  if (speakerNpcId && activeTreeId) {
    events.push({
      type:         'DIALOGUE_COMPLETED',
      speakerNpcId,
      treeId:       activeTreeId,
    });

    // Inline TALK objective update (task 11.16 path; processEventQueue also handles
    // this event, but we do it here too so the engine is self-contained in unit tests)
    for (const entry of state.quests.entries) {
      if (entry.status !== 'ACTIVE') continue;
      const def = QUEST_CATALOG[entry.defId];
      if (!def) continue;
      def.objectives.forEach((obj, idx) => {
        if (obj.type === 'TALK' && obj.targetId === speakerNpcId) {
          const r = updateObjective(state, entry.defId, idx, 1);
          state = r.state;
        }
      });
    }

    // Achievement counter for dialogues_completed (task 13.14)
    const achResult = incrementAchievementCounter(state, 'dialogues_completed');
    state = achResult.state;
    events.push(...achResult.events);
  }

  return { state, events };
}

// ============================================================
// 13.11 — START DIALOGUE
// ============================================================

/**
 * Initialises dialogue with `npcId` using `treeId`.
 * Performs lazy individuation if the NPC hasn't been introduced yet.
 * Returns the root node for immediate render.
 */
export function startDialogue(
  gameState: GameState,
  treeId:    string,
  npcId:     string,
): { state: GameState; events: GameEvent[]; node: DialogueNode } {
  // Guard: NPC must exist in contacts
  const contactRecord = gameState.contacts.find(c => c.character.npcId === npcId);
  if (!contactRecord) {
    throw new Error(`startDialogue: NPC '${npcId}' not found in contacts`);
  }

  const tree = getDialogueTree(treeId);
  const root = tree.nodes[tree.rootNodeId];
  if (!root) {
    throw new Error(`startDialogue: root node '${tree.rootNodeId}' missing in tree '${treeId}'`);
  }

  const events: GameEvent[] = [];

  // Lazy individuation (task 3c.4 partial)
  // individuateNpc() takes a raw NpcCharacter and returns an updated one.
  // We rebuild the contacts array via individuateContact() and emit NPC_INDIVIDUATED.
  let state = gameState;
  if (!contactRecord.character.hasBeenIntroduced) {
    const updatedContacts = individuateContact(state.contacts, npcId);
    state = { ...state, contacts: updatedContacts };
    events.push({ type: 'NPC_INDIVIDUATED', npcId });
  }

  // Initialise dialogue state
  state = {
    ...state,
    dialogue: {
      activeTreeId:  treeId,
      currentNodeId: root.id,
      speakerNpcId:  npcId,
      history:       [],
    },
  };

  events.push({ type: 'DIALOGUE_STARTED', treeId, npcId });

  // Apply root node onEnter effects
  if (root.onEnter && root.onEnter.length > 0) {
    const eff = applyEffects(state, root.onEnter);
    state = eff.state;
    events.push(...eff.events);
  }

  return { state, events, node: root };
}

// ============================================================
// 13.12 — MAKE CHOICE
// ============================================================

/**
 * Advances dialogue by selecting choice at `choiceIndex`.
 * Returns the next node, or null if the dialogue ended (nextNodeId === 'END').
 */
export function makeChoice(
  gameState:   GameState,
  choiceIndex: number,
): { state: GameState; events: GameEvent[]; node: DialogueNode | null } {
  const { dialogue } = gameState;
  if (!dialogue.activeTreeId || !dialogue.currentNodeId || !dialogue.speakerNpcId) {
    throw new Error('makeChoice: no active dialogue');
  }

  const tree = getDialogueTree(dialogue.activeTreeId);
  const node = tree.nodes[dialogue.currentNodeId];
  if (!node) {
    throw new Error(`makeChoice: current node '${dialogue.currentNodeId}' missing`);
  }

  const available = getAvailableChoices(gameState, node, dialogue.speakerNpcId);

  if (choiceIndex < 0 || choiceIndex >= available.length) {
    throw new Error(`makeChoice: invalid choiceIndex ${choiceIndex} (${available.length} choices available)`);
  }

  const { choice, locked } = available[choiceIndex];
  if (locked) {
    throw new Error(`makeChoice: choice ${choiceIndex} is locked`);
  }

  const events: GameEvent[] = [];

  // Apply choice effects
  let state = gameState;
  if (choice.effects && choice.effects.length > 0) {
    const eff = applyEffects(state, choice.effects);
    state  = eff.state;
    events.push(...eff.events);
  }

  // Advance history
  state = {
    ...state,
    dialogue: {
      ...state.dialogue,
      history: [...state.dialogue.history, choice.label],
    },
  };

  events.push({
    type:        'DIALOGUE_CHOICE_MADE',
    choiceIndex,
    nextNodeId:  choice.nextNodeId,
  });

  // End of tree
  if (choice.nextNodeId === 'END') {
    const endResult = endDialogue(state);
    state = endResult.state;
    events.push(...endResult.events);
    return { state, events, node: null };
  }

  // Advance to next node
  const nextNode = tree.nodes[choice.nextNodeId];
  if (!nextNode) {
    throw new Error(`makeChoice: next node '${choice.nextNodeId}' missing in tree '${dialogue.activeTreeId}'`);
  }

  // Update currentNodeId
  state = {
    ...state,
    dialogue: { ...state.dialogue, currentNodeId: nextNode.id },
  };

  // Apply next node's onEnter effects
  if (nextNode.onEnter && nextNode.onEnter.length > 0) {
    const eff = applyEffects(state, nextNode.onEnter);
    state  = eff.state;
    events.push(...eff.events);
  }

  return { state, events, node: nextNode };
}

// ============================================================
// 13.15 — GET CURRENT NODE
// ============================================================

/**
 * Returns the currently active DialogueNode, or null if no dialogue is active.
 * Pure helper; never mutates state.
 */
export function getCurrentNode(gameState: GameState): DialogueNode | null {
  const { dialogue } = gameState;
  if (!dialogue.activeTreeId || !dialogue.currentNodeId) return null;
  try {
    const tree = getDialogueTree(dialogue.activeTreeId);
    return tree.nodes[dialogue.currentNodeId] ?? null;
  } catch {
    return null;
  }
}

// ============================================================
// 13.16 — GENERIC TREE ID
// ============================================================

/**
 * Returns the class-level intro tree ID for a given NPC occupation/class.
 * Used as fallback when no companion-specific tree exists.
 * Tree IDs follow the pattern: 'intro_<npcClass>' (lowercase).
 */
export function getGenericDialogueTreeId(npcClass: string): string {
  return `intro_${npcClass.toLowerCase()}`;
}
