/**
 * skillEngine.ts
 * Skill tree system — Phase 16 (Tasks 16.5–16.13).
 *
 * Two trees:
 *   BATTLE — combat-focused passives and actives (unlocked with BP).
 *   ARDOR  — intimacy-focused passives and actives (unlocked with AP).
 *
 * Passive skills apply automatically:
 *   - Combat passives: applyPassiveSkills() composes onto CombatStats before any hit.
 *   - General passives: derivePassiveArousalBonus() / derivePassiveDamageBonus() etc.
 *     are called by their respective engines each turn — no stored state needed.
 *
 * Active skills are triggered explicitly via USE_SKILL intent:
 *   - STATUS_APPLY  → calls statusEffectEngine.applyStatus() on target.
 *   - AROUSAL_GAIN  → applied to target arousal immediately.
 *   - DAMAGE_MULTIPLIER → attached to the dispatcher's next FIGHT_ACTION payload;
 *     dispatcher injects the multiplier into the CombatAction so resolveHit() sees it.
 *     The multiplier is consumed on the next action; it is NOT stored on GameState.
 *
 * Stat pipeline composition order (per hit resolution):
 *   base stats  →  deriveEffectiveStats() (status effects)
 *               →  applyPassiveSkills()   (passive skill bonuses)
 *               →  DAMAGE_MULTIPLIER from active skill (injected into CombatAction)
 *
 * Intimacy pipeline:
 *   stimulationIntensity × ... × derivePassiveArousalBonus(gameState)
 *   (composited in resolveSceneAction() step 13)
 */

import type { GameState, GameEvent, CombatStats } from '../state/gameState';
import { applyStatus } from './statusEffectEngine';
import type { AnyCharacter } from '../state/gameState';

// ─── Re-exported schema types ─────────────────────────────────────────────────
export type SkillTree = 'BATTLE' | 'ARDOR';

/**
 * SkillEffect union.
 *
 * STAT_BOOST        — passive; adds `value` to `stat` on CombatStats (post status-effect layer).
 *                     stat is a keyof CombatStats: 'str' | 'agi' | 'wis' | 'def' | 'lck'.
 * DAMAGE_MULTIPLIER — active; multiplies raw damage on next FIGHT_ACTION by `value`.
 *                     Dispatcher injects this into CombatAction.damageMultiplier.
 *                     Consumed on the next attack; never persisted to GameState.
 * AROUSAL_GAIN      — passive or active; adds `value` as a flat multiplier to stimulation.
 *                     Passive: summed by derivePassiveArousalBonus() each intimacy turn.
 *                     Active:  applied immediately to target arousal via useActiveSkill().
 * STATUS_APPLY      — active; applies status effect `statusId` to target with `chance` probability.
 */
export type SkillEffect =
  | { type: 'STAT_BOOST';        stat: keyof CombatStats; value: number }
  | { type: 'DAMAGE_MULTIPLIER'; value: number }
  | { type: 'AROUSAL_GAIN';      value: number }
  | { type: 'STATUS_APPLY';      statusId: string; chance: number };

export interface SkillDef {
  id:           string;
  tree:         SkillTree;
  name:         string;
  isPassive:    boolean;
  cpwCost?:     number;       // active skills only; passive skills omit this
  pointCost:    number;       // BP for BATTLE tree; AP for ARDOR tree
  prerequisites: string[];   // skillIds that must be in unlockedSkillIds before this can unlock
  effects:      SkillEffect[];
}

// ─── Skill catalog accessor ───────────────────────────────────────────────────

/**
 * getSkillDef — looks up a SkillDef by id from the static catalog.
 * Throws a descriptive error when the id is unknown so callers always fail loudly.
 */
export function getSkillDef(id: string): SkillDef {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { SKILLS } = require('../data/skills') as { SKILLS: Record<string, SkillDef> };
  const def = SKILLS[id];
  if (!def) throw new Error(`getSkillDef: unknown skill id "${id}"`);
  return def;
}

// ─── Prerequisite / unlock guards ─────────────────────────────────────────────

/**
 * canUnlock — checks all conditions for a player to unlock a skill.
 *
 * Conditions (all must pass):
 *   1. Skill id exists in the catalog.
 *   2. Not already unlocked.
 *   3. All prerequisites are already in unlockedSkillIds.
 *   4. The player has enough unspent points in the correct tree.
 *
 * Returns { eligible: true } on pass; { eligible: false, reason } on any failure.
 */
export function canUnlock(
  gameState: GameState,
  skillId:   string,
): { eligible: boolean; reason?: string } {
  let def: SkillDef;
  try {
    def = getSkillDef(skillId);
  } catch {
    return { eligible: false, reason: `Unknown skill: ${skillId}` };
  }

  const { player } = gameState;

  if (player.unlockedSkillIds.includes(skillId)) {
    return { eligible: false, reason: `${def.name} is already unlocked.` };
  }

  for (const prereq of def.prerequisites) {
    if (!player.unlockedSkillIds.includes(prereq)) {
      let prereqName = prereq;
      try { prereqName = getSkillDef(prereq).name; } catch { /* name unavailable */ }
      return { eligible: false, reason: `Requires ${prereqName} first.` };
    }
  }

  const availablePoints = def.tree === 'BATTLE' ? player.unspentBP : player.unspentAP;
  if (availablePoints < def.pointCost) {
    const pointType = def.tree === 'BATTLE' ? 'Battle Points' : 'Ardor Points';
    return {
      eligible: false,
      reason:   `Not enough ${pointType} (need ${def.pointCost}, have ${availablePoints}).`,
    };
  }

  return { eligible: true };
}

/**
 * unlockSkill — spends points and adds the skill to unlockedSkillIds.
 * Guards are already in canUnlock(); caller should check first or handle the throw.
 *
 * Returns updated GameState + SKILL_UNLOCKED event.
 */
export function unlockSkill(
  gameState: GameState,
  skillId:   string,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const check = canUnlock(gameState, skillId);
  if (!check.eligible) {
    return { state: gameState, events: [], narrative: check.reason ?? 'Cannot unlock skill.' };
  }

  const def = getSkillDef(skillId);
  const isBattle = def.tree === 'BATTLE';

  const updatedPlayer = {
    ...gameState.player,
    unlockedSkillIds: [...gameState.player.unlockedSkillIds, skillId],
    unspentBP: isBattle ? gameState.player.unspentBP - def.pointCost : gameState.player.unspentBP,
    unspentAP: isBattle ? gameState.player.unspentAP : gameState.player.unspentAP - def.pointCost,
  };

  const events: GameEvent[] = [
    { type: 'SKILL_UNLOCKED', skillId, tree: def.tree },
  ];

  return {
    state:     { ...gameState, player: updatedPlayer },
    events,
    narrative: `You unlock ${def.name}.`,
  };
}

// ─── Skill list helpers ───────────────────────────────────────────────────────

/** getUnlockedSkills — maps unlockedSkillIds to their SkillDef objects. */
export function getUnlockedSkills(gameState: GameState): SkillDef[] {
  return gameState.player.unlockedSkillIds.flatMap(id => {
    try { return [getSkillDef(id)]; } catch { return []; }
  });
}

/** getActiveSkills — unlocked skills that are NOT passive (player must trigger them). */
export function getActiveSkills(gameState: GameState): SkillDef[] {
  return getUnlockedSkills(gameState).filter(s => !s.isPassive);
}

/** getPassiveSkills — unlocked skills that apply automatically. */
export function getPassiveSkills(gameState: GameState): SkillDef[] {
  return getUnlockedSkills(gameState).filter(s => s.isPassive);
}

// ─── Passive stat composition ─────────────────────────────────────────────────

/**
 * applyPassiveSkills — composes all passive STAT_BOOST and DAMAGE_MULTIPLIER
 * effects from unlocked passive skills onto a base CombatStats snapshot.
 *
 * Call order: base stats → deriveEffectiveStats() → applyPassiveSkills()
 * This ensures status-effect modifiers apply before skill bonuses, which is
 * the correct layering (debuffs reduce the base that skills then boost on top of).
 *
 * DAMAGE_MULTIPLIER effects are accumulated and returned separately; the caller
 * (dispatcher / combatEngine) decides when and how to apply the multiplier.
 *
 * Returns:
 *   stats           — modified CombatStats with STAT_BOOST effects applied.
 *   damageMultiplier — product of all passive DAMAGE_MULTIPLIER values (1.0 if none).
 */
export function applyPassiveSkills(
  gameState:  GameState,
  baseStats:  CombatStats,
): { stats: CombatStats; damageMultiplier: number } {
  const passives = getPassiveSkills(gameState);
  const stats:    CombatStats = { ...baseStats };
  let   damageMultiplier      = 1.0;

  for (const skill of passives) {
    for (const effect of skill.effects) {
      if (effect.type === 'STAT_BOOST') {
        // Additive flat bonus per skill; stacks linearly across skills.
        stats[effect.stat] = Math.max(0, stats[effect.stat] + effect.value);
      } else if (effect.type === 'DAMAGE_MULTIPLIER') {
        // Multiplicative stacking for passive multiplier effects.
        damageMultiplier *= effect.value;
      }
    }
  }

  return { stats, damageMultiplier };
}

/**
 * derivePassiveArousalBonus — sums all passive AROUSAL_GAIN effects from
 * unlocked passive skills into a single additive multiplier.
 *
 * Called by intimacyEngine.resolveSceneAction() at step 13 to scale stimulation.
 * The returned value is added to 1.0 to form the multiplier:
 *   e.g. two AROUSAL_GAIN passive skills each with value 0.05 → bonus = 0.10
 *        stimulation × (1.0 + 0.10) = +10% stimulation.
 *
 * Applies to ALL passive skills regardless of tree — a BATTLE passive that
 * grants arousal resistance would be unusual but is handled correctly.
 */
export function derivePassiveArousalBonus(gameState: GameState): number {
  return getPassiveSkills(gameState).reduce((sum, skill) => {
    for (const effect of skill.effects) {
      if (effect.type === 'AROUSAL_GAIN') sum += effect.value;
    }
    return sum;
  }, 0);
}

// ─── Active skill usage ────────────────────────────────────────────────────────

/**
 * useActiveSkill — validates CPW, deducts cost, and resolves immediate effects.
 *
 * Effect resolution:
 *   STATUS_APPLY  → calls applyStatus(target, statusId); caller must supply target.
 *   AROUSAL_GAIN  → applied to target.vitals.arousal directly.
 *   DAMAGE_MULTIPLIER → NOT applied here. The value is returned in pendingMultiplier
 *                       for the dispatcher to inject into the next CombatAction payload.
 *   STAT_BOOST    → passive only; ignored if an active skill somehow has one.
 *
 * Returns updated GameState, events, narrative, and pendingMultiplier (0.0 = no multiplier).
 */
export function useActiveSkill(
  gameState: GameState,
  skillId:   string,
  target?:   AnyCharacter,
): {
  state:             GameState;
  events:            GameEvent[];
  narrative:         string;
  updatedTarget?:    AnyCharacter;
  pendingMultiplier: number;   // >1.0 when a DAMAGE_MULTIPLIER effect was triggered; else 0.0
} {
  let def: SkillDef;
  try {
    def = getSkillDef(skillId);
  } catch {
    return { state: gameState, events: [], narrative: `Unknown skill: ${skillId}.`, pendingMultiplier: 0 };
  }

  if (def.isPassive) {
    return { state: gameState, events: [], narrative: `${def.name} is a passive skill and cannot be activated manually.`, pendingMultiplier: 0 };
  }

  if (!gameState.player.unlockedSkillIds.includes(skillId)) {
    return { state: gameState, events: [], narrative: `${def.name} has not been unlocked.`, pendingMultiplier: 0 };
  }

  const cpwCost = def.cpwCost ?? 0;
  if (gameState.player.vitals.cpw.current < cpwCost) {
    return {
      state:             gameState,
      events:            [],
      narrative:         `Not enough Crest Power (need ${cpwCost}, have ${gameState.player.vitals.cpw.current}).`,
      pendingMultiplier: 0,
    };
  }

  // Deduct CPW
  let state: GameState = {
    ...gameState,
    player: {
      ...gameState.player,
      vitals: {
        ...gameState.player.vitals,
        cpw: {
          ...gameState.player.vitals.cpw,
          current: gameState.player.vitals.cpw.current - cpwCost,
        },
      },
    },
  };

  const events: GameEvent[] = [{ type: 'SKILL_USED', skillId, cpwCost }];
  let   updatedTarget: AnyCharacter | undefined = target;
  let   pendingMultiplier = 0;

  for (const effect of def.effects) {
    switch (effect.type) {
      case 'STATUS_APPLY': {
        if (!updatedTarget) break;
        if (Math.random() < effect.chance) {
          const applyResult = applyStatus(updatedTarget, effect.statusId);
          updatedTarget = applyResult.character;
          events.push(...applyResult.events);
        }
        break;
      }
      case 'AROUSAL_GAIN': {
        // Applied directly to target's arousal; clamp to 100.
        if (!updatedTarget) break;
        const newArousal = Math.min(100, updatedTarget.vitals.arousal + effect.value);
        updatedTarget = {
          ...updatedTarget,
          vitals: { ...updatedTarget.vitals, arousal: newArousal },
        };
        break;
      }
      case 'DAMAGE_MULTIPLIER': {
        // Return to dispatcher; injected into next CombatAction payload.
        pendingMultiplier = effect.value;
        break;
      }
      case 'STAT_BOOST': {
        // Passive-only; no-op for active skill activation.
        break;
      }
    }
  }

  return {
    state,
    events,
    narrative:    `You activate ${def.name}.${cpwCost > 0 ? ` (−${cpwCost} CPW)` : ''}`,
    updatedTarget,
    pendingMultiplier,
  };
}

// ─── Skill tree reset ──────────────────────────────────────────────────────────

/**
 * resetSkillTree — removes all skills in the given tree and refunds spent points.
 *
 * Refund amount = sum of pointCost for every skill in `tree` that was unlocked.
 * Total earned BP / AP (battlePoints / ardorPoints) is NEVER modified.
 * Only unspentBP / unspentAP is restored.
 *
 * Emits SKILL_TREE_RESET with the refunded point count.
 */
export function resetSkillTree(
  gameState: GameState,
  tree:      SkillTree,
): { state: GameState; events: GameEvent[]; narrative: string } {
  const unlocked = getUnlockedSkills(gameState).filter(s => s.tree === tree);

  if (unlocked.length === 0) {
    return { state: gameState, events: [], narrative: `No ${tree} skills to reset.` };
  }

  const pointsRefunded = unlocked.reduce((sum, s) => sum + s.pointCost, 0);
  const isBattle = tree === 'BATTLE';

  // Remove all skills from this tree
  const remainingSkillIds = gameState.player.unlockedSkillIds.filter(id => {
    try { return getSkillDef(id).tree !== tree; } catch { return true; }
  });

  const updatedPlayer = {
    ...gameState.player,
    unlockedSkillIds: remainingSkillIds,
    unspentBP: isBattle
      ? gameState.player.unspentBP + pointsRefunded
      : gameState.player.unspentBP,
    unspentAP: isBattle
      ? gameState.player.unspentAP
      : gameState.player.unspentAP + pointsRefunded,
  };

  const events: GameEvent[] = [
    { type: 'SKILL_TREE_RESET', tree, pointsRefunded },
  ];

  const pointType = isBattle ? 'Battle Points' : 'Ardor Points';
  return {
    state:     { ...gameState, player: updatedPlayer },
    events,
    narrative: `${tree} skill tree reset. ${pointsRefunded} ${pointType} refunded.`,
  };
}
