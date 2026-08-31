/**
 * combatEngine.ts
 * Turn-based combat resolution engine.
 *
 * TODO (Tasks 7.1–7.10): Full implementation.
 *
 * Key formulas (PRD §4.2):
 *   Initiative  = AGI + d10; ties broken by LCK; order fixed for fight
 *   Damage      = weaponPower × (attackerSTR / 10) - defenderDEF × 0.5; min 1
 *   Crit chance = LCK / 200 (max 50%); crit multiplier = 1.75×
 *   Dodge       = AGI / 300 (max 33%)
 *   Flee chance = (playerAGI - avgEnemyAGI) / 100 + 0.3; clamped 10%–80%
 *   Purification arousal gain = skillPower × (playerTEC / 10) - targetMiasmaRes × 0.3; min 1
 *
 * AI patterns: Aggressive | Defensive | SupportCaster | BossScripted
 *
 * Design note (PRD §4.1.1):
 *   Combatants are AnyCharacter[]. The engine reads Character.stats, Character.vitals,
 *   and Character.activeStatusEffects. It never needs to know whether a combatant is
 *   a player, NPC, or monster — only whether aiPattern is set (enemies/monsters) or
 *   the combatant is player-controlled (player + companions).
 */

import type {
  GameState, GameEvent,
  AnyCharacter, MonsterCharacter, EnemyHumanoidCharacter,
  PartyMember,
} from '../state/gameState';

// ─── AI pattern type (re-exported for enemySpawnEngine) ──────────────────────
export type AiPattern = 'Aggressive' | 'Defensive' | 'SupportCaster' | 'BossScripted';

// ─── Boss phase scripting ─────────────────────────────────────────────────────
export interface BossPhase {
  hpThreshold: number;      // e.g. 0.75 = triggers when HP drops to 75%
  actionSequence: string[]; // action IDs executed in order this phase
}

// ─── Combat state ─────────────────────────────────────────────────────────────
// combatants: AnyCharacter[] — player, companions, NPCs, enemies, monsters unified.
// The engine never has separate "player array" and "enemy array".
export interface CombatState {
  encounterId:          string;
  initiativeOrder:      string[];             // Character.id sorted by initiative roll
  currentTurnIndex:     number;
  combatants:           Record<string, AnyCharacter>; // id → full character
  roundNumber:          number;
  status:               'RUNNING' | 'PLAYER_VICTORY' | 'PLAYER_DEFEAT' | 'FLED' | 'PURIFIED';
  purificationProgress: number;              // 0–100; victory at 100
  bossPhaseScripts:     Record<string, BossPhase[]>; // enemyId → phase script (boss enemies only)
}

// ─── Combat action ────────────────────────────────────────────────────────────
export interface CombatAction {
  type:       'ATTACK' | 'SKILL' | 'PURIFY' | 'FLEE' | 'DEFEND' | 'USE_ITEM';
  actorId:    string;  // Character.id of the acting combatant
  skillId?:   string;
  itemId?:    string;
  targetId?:  string;
}

// ─── Combat result ────────────────────────────────────────────────────────────
export interface CombatResult {
  state:       GameState;
  combatState: CombatState;
  events:      GameEvent[];
  log:         string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns true if the combatant is player-controlled (player or party companion). */
export function isPlayerControlled(
  characterId: string,
  gameState: GameState,
): boolean {
  if (characterId === gameState.player.id) return true;
  return gameState.party.companions.some((m: PartyMember) => m.npcId === characterId);
}

/** Extracts the miasma/mana reserve from any combatant (0 for player/NPC). */
export function getSpecialReserve(character: AnyCharacter): number {
  if (character.characterType === 'MONSTER') {
    return (character as MonsterCharacter).miasmaReserve;
  }
  if (character.characterType === 'ENEMY_HUMANOID') {
    return (character as EnemyHumanoidCharacter).manaReserve;
  }
  return 0;
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────

export function buildInitiativeOrder(
  combatants: AnyCharacter[],
): string[] {
  // TODO (Task 7.2): roll AGI + d10 per combatant; sort descending; LCK tiebreak
  void combatants;
  throw new Error('buildInitiativeOrder() not yet implemented');
}

export function resolveCombatAction(
  _gameState: GameState,
  _combatState: CombatState,
  _action: CombatAction,
): CombatResult {
  // TODO (Task 7.3): damage formula, crit, dodge
  // TODO (Task 7.4): AI decision logic (only for non-player-controlled combatants)
  // TODO (Task 7.5): miasma/mana reserve consumption
  // TODO (Task 7.6): purification arousal gain
  // TODO (Task 7.7): flee attempt
  // TODO (Task 7.8): companion down + party wipe detection
  throw new Error('resolveCombatAction() not yet implemented');
}
