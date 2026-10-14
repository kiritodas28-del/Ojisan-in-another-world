/**
 * combatEngine.ts
 * Turn-based combat resolution engine — Tasks 7.1–7.10.
 *
 * Design notes:
 *  - Combatants are AnyCharacter[]; no separate player/enemy arrays.
 *  - The engine is pure: it returns new state + events; the dispatcher
 *    applies consequences (XP, loot, reputation) to GameState.
 *  - Multiple enemies are first-class: every enemy gets its own turn slot,
 *    mid-fight kills are tracked in killedEnemies[], and defeat outcome is
 *    selected from the highest-threat surviving enemy on player loss.
 *  - All formulas from PRD §4.2 / §4.7.
 */

import type {
  GameState, GameEvent,
  AnyCharacter, MonsterCharacter, EnemyHumanoidCharacter,
  PartyMember,
} from '../state/gameState';
import { downCompanion, isPartyWiped } from './partyEngine';
import {
  tickStatusEffects,
  hasStatus,
  applyStatus,
  deriveEffectiveStats,
} from './statusEffectEngine';
import { applyPassiveSkills } from './skillEngine';
import { restoreJobResources, detectWeakNodes, applyArmorFracture } from './jobEngine';
import { applyStatus as _applyStatusEffect } from './statusEffectEngine';
import { getWeatherModifier } from './environmentEngine';

// ─── Re-exported AI pattern type (used by enemySpawnEngine) ──────────────────
export type AiPattern = 'Aggressive' | 'Defensive' | 'SupportCaster' | 'BossScripted';
// Note: COMBAT_DEFEAT_OUTCOME is defined in the GameEvent union (gameState.ts).

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.1 — COMBAT SCHEMA
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Boss phase scripting ─────────────────────────────────────────────────────
export interface BossPhase {
  /** HP fraction threshold (0–1) at which this phase activates. */
  hpThreshold: number;
  /** Action IDs executed in round-robin order while in this phase. */
  actionSequence: string[];
}

// ─── Single hit within a multi-target action ─────────────────────────────────
export interface CombatHit {
  targetId: string;
  damage:   number;   // 0 on dodge
  crit:     boolean;
  dodged:   boolean;
}

// ─── Killed-enemy record (accumulates mid-fight) ─────────────────────────────
// Collected in CombatState so the dispatcher can batch-resolve XP + loot for
// every enemy killed during the encounter, not only the final kill.
export interface KilledEnemy {
  id:           string;
  lootTableId:  string | null;
  xpReward:     number;
  /** Task 24.29: optional infamy delta for the encounter's region. +N = gain, -N = lose. */
  infamyDelta?: number;
  /** Phase 31: true when this enemy has a boss phase script (bossPhaseScripts entry). */
  isBoss?:      boolean;
}

// ─── Narrative log entry ──────────────────────────────────────────────────────
export interface CombatLogEntry {
  round:    number;
  actorId:  string;
  message:  string;
}

// ─── Combat state ─────────────────────────────────────────────────────────────
// combatants is a Record so O(1) lookup by id is cheap during resolution.
export interface CombatState {
  encounterId:          string;
  regionId:             string;
  /** Character ids in descending initiative order; fixed for the entire fight. */
  initiativeOrder:      string[];
  currentTurnIndex:     number;
  combatants:           Record<string, AnyCharacter>;
  roundNumber:          number;
  status:               'RUNNING' | 'PLAYER_VICTORY' | 'PLAYER_DEFEAT' | 'FLED' | 'PURIFIED';
  /**
   * Shared miasma level for the encounter (0–100).
   * Builds from monster/humanoid-enemy attacks; decays on PURIFY actions.
   * At 100 → MIASMA_SURGE event; sustained 100 → player overpowered.
   */
  miasmaLevel:          number;
  purificationProgress: number;   // 0–100; victory condition for PURIFY path
  /** Boss phase scripts keyed by enemy id (only set for boss encounters). */
  bossPhaseScripts:     Record<string, BossPhase[]>;
  /** Enemies killed during the encounter; dispatcher resolves XP + loot at fight end. */
  killedEnemies:        KilledEnemy[];
  /** Narrative log; one entry per action resolution. */
  log:                  CombatLogEntry[];
  /**
   * Task 24.26: weak-node scan results for the current round.
   * Populated at the start of each round when the player's active job has
   * hasWeakNodeScan === true (Analyst archetype). Applied to the next hit
   * against the matching enemy as bonus damage + armor fracture.
   * Reset at the start of each new round.
   */
  weakNodeHits:         WeakNodeHit[];
}

// ─── Combat action ────────────────────────────────────────────────────────────
export interface CombatAction {
  type:       'ATTACK' | 'SKILL' | 'PURIFY' | 'FLEE' | 'DEFEND' | 'USE_ITEM';
  actorId:    string;
  /** Primary target. Omit for self-targeted / AOE actions. */
  targetId?:  string;
  /** All targets for AOE skills. If set, targetId is ignored. */
  targetIds?: string[];
  isAoe?:     boolean;
  skillId?:   string;
  itemId?:    string;
  // Status effects to try applying on a successful (non-dodged) hit.
  // chance is 0-1 probability per entry. Resolved after damage in _applyDamage().
  statusEffectsApplied?: { defId: string; chance: number }[];
  // Injected by dispatcher when the player used a DAMAGE_MULTIPLIER active skill
  // on the preceding turn (USE_SKILL intent). Consumed here and not persisted
  // to GameState — one-shot per attack.
  damageMultiplier?: number;
}

// ─── Combat result ────────────────────────────────────────────────────────────
// Pure return value — caller / dispatcher applies changes to GameState.
export interface CombatResult {
  combatState: CombatState;
  /** Per-target hit records for this action. */
  hits:        CombatHit[];
  events:      GameEvent[];
  log:         CombatLogEntry[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/** d-sided die roll, 1-indexed. */
function rollDie(d: number): number {
  return Math.floor(Math.random() * d) + 1;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/** Returns true when the combatant's HP is above 0. */
function isAlive(c: AnyCharacter): boolean {
  return c.vitals.hp.current > 0;
}

/** Returns the living combatant ids on the enemy side (non-player-controlled). */
function livingEnemyIds(state: CombatState, gameState: GameState): string[] {
  return state.initiativeOrder.filter(id => {
    const c = state.combatants[id];
    return c && isAlive(c) && !isPlayerControlled(id, gameState);
  });
}

/** Returns the living combatant ids on the player side (player + companions). */
function livingAllyIds(state: CombatState, gameState: GameState): string[] {
  return state.initiativeOrder.filter(id => {
    const c = state.combatants[id];
    return c && isAlive(c) && isPlayerControlled(id, gameState);
  });
}

/** Returns true if the combatant is player-controlled (player or party companion). */
export function isPlayerControlled(characterId: string, gameState: GameState): boolean {
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

/**
 * Selects the primary enemy for defeat outcome resolution.
 * Prefers the highest-STR living enemy; if none alive (full wipe turn), falls back
 * to the last enemy in killedEnemies.
 */
function selectPrimaryEnemy(
  state: CombatState,
  gameState: GameState,
): AnyCharacter | null {
  const living = livingEnemyIds(state, gameState)
    .map(id => state.combatants[id])
    .filter(Boolean);

  if (living.length > 0) {
    return living.reduce((best, c) =>
      c.stats.str > best.stats.str ? c : best
    );
  }
  // Fall back to last killed enemy if all died simultaneously
  if (state.killedEnemies.length > 0) {
    const last = state.killedEnemies[state.killedEnemies.length - 1];
    return state.combatants[last.id] ?? null;
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.2 — INITIATIVE SORT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Builds the fixed turn order for an encounter.
 * Sort key: AGI + d10 descending; LCK tiebreak descending.
 * Called once at startCombat(); order does not change mid-fight.
 */
export function buildInitiativeOrder(combatants: AnyCharacter[]): string[] {
  const rolls = combatants.map(c => ({
    id:   c.id,
    roll: c.stats.agi + rollDie(10),
    lck:  c.stats.lck,
  }));

  rolls.sort((a, b) => {
    if (b.roll !== a.roll) return b.roll - a.roll;
    return b.lck - a.lck; // LCK tiebreak
  });

  return rolls.map(r => r.id);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.3 — DAMAGE, CRIT, DODGE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Resolves a single physical hit from attacker to defender.
 * Formula (PRD §4.2):
 *   Damage   = weaponPower × (attacker.STR / 10) − defender.DEF × 0.5; min 1
 *   Crit     = roll(1,100) ≤ LCK/2; crit multiplier ×1.75
 *   Dodge    = roll(1,100) ≤ AGI_def / 300 (expressed as %, max 33%)
 *
 * weaponPower defaults to 10 when no weapon is equipped (bare-hand/natural attack).
 * AOE actions receive a pre-applied ×0.65 scalar on weaponPower before this call.
 *
 * Stat pipeline (task 16.14):
 *   base stats
 *     → deriveEffectiveStats()  (status-effect layer)
 *     → applyPassiveSkills()    (passive STAT_BOOST / passive DAMAGE_MULTIPLIER)
 *     × action.damageMultiplier (active skill DAMAGE_MULTIPLIER, injected by dispatcher)
 *
 * applyPassiveSkills() is only called for player-controlled attackers; enemies
 * do not have a skill tree and their stats are already final after deriveEffectiveStats().
 */
function resolveHit(
  attacker:        AnyCharacter,
  defender:        AnyCharacter,
  weaponPower:     number,
  gameState:       GameState,
  damageMultiplier: number = 1.0,
): CombatHit {
  // Layer 1: status-effect stat modifiers (task 14.13)
  let atkStats = deriveEffectiveStats(attacker);
  const defStats = deriveEffectiveStats(defender);

  // Layer 2: passive skill bonuses (task 16.14) — player-side only
  let passiveDamageMult = 1.0;
  if (attacker.id === gameState.player.id ||
      gameState.party.companions.some((m: PartyMember) => m.npcId === attacker.id)) {
    const passiveResult = applyPassiveSkills(gameState, atkStats);
    atkStats           = passiveResult.stats;
    passiveDamageMult  = passiveResult.damageMultiplier;
  }

  // Task 24.27: apply active weather damage modifier to attacker STR.
  // getWeatherModifier returns an additive % modifier on the 'damage' stat key
  // (e.g. -50 for SALTFOG fog reducing effectiveness; 0 if no relevant effect).
  // No-op until weatherCatalog is authored (Task 24.37).
  const weatherDamageMod = getWeatherModifier(gameState, 'damage');
  if (weatherDamageMod !== 0) {
    // Modifier is expressed as a flat additive percentage: +20 = ×1.20, -50 = ×0.50
    atkStats = { ...atkStats, str: Math.max(1, Math.round(atkStats.str * (1 + weatherDamageMod / 100))) };
  }

  // ── Dodge check ──────────────────────────────────────────────────────────
  const dodgeChance = clamp(defStats.agi / 300, 0, 0.33);
  if (Math.random() < dodgeChance) {
    return { targetId: defender.id, damage: 0, crit: false, dodged: true };
  }

  // ── Base damage ───────────────────────────────────────────────────────────
  let dmg = weaponPower * (atkStats.str / 10) - defStats.def * 0.5;
  dmg = Math.max(1, dmg);

  // ── Crit check ────────────────────────────────────────────────────────────
  const critChance = clamp(atkStats.lck / 200, 0, 0.5);
  const isCrit = Math.random() < critChance;
  if (isCrit) dmg *= 1.75;

  // Layer 3: multiplicative skill multipliers (passive × active)
  // passiveDamageMult: product of all passive DAMAGE_MULTIPLIER effects
  // damageMultiplier:  injected from dispatcher when a DAMAGE_MULTIPLIER active
  //                    skill was used on the preceding turn
  dmg *= passiveDamageMult * damageMultiplier;

  return { targetId: defender.id, damage: Math.round(dmg), crit: isCrit, dodged: false };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.4 — AI STRATEGY OBJECTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Each strategy implements selectAction().
 * Target selection is aware of the full combatants pool to allow enemies to
 * spread aggro across party members.
 */
interface AiStrategy {
  selectAction(
    actor: AnyCharacter,
    state: CombatState,
    gameState: GameState,
  ): CombatAction;
}

// ── Simple threat/aggro weight ────────────────────────────────────────────────
// Avoids all enemies dogpiling the same target every turn.
// Weight = current HP / max HP (wounded targets draw less attention from Aggressive,
// more from Defensive when healing).
function pickAggroTarget(
  candidates: string[],
  combatants: Record<string, AnyCharacter>,
  preferHighHp: boolean,
): string {
  if (candidates.length === 1) return candidates[0];

  const sorted = [...candidates].sort((a, b) => {
    const ca = combatants[a]!;
    const cb = combatants[b]!;
    const hpA = ca.vitals.hp.current / ca.vitals.hp.max;
    const hpB = cb.vitals.hp.current / cb.vitals.hp.max;
    return preferHighHp ? hpB - hpA : hpA - hpB;
  });

  // Weighted random from top-2 to prevent pure focus fire.
  // 70% chance to pick first (preferred), 30% chance for second.
  if (sorted.length >= 2 && Math.random() < 0.3) return sorted[1];
  return sorted[0];
}

const AggressiveStrategy: AiStrategy = {
  selectAction(actor, state, gameState): CombatAction {
    const allies = livingAllyIds(state, gameState);
    if (allies.length === 0) return { type: 'DEFEND', actorId: actor.id };

    const targetId = pickAggroTarget(allies, state.combatants, true);

    // Use strongest skill if HP > 50%
    const hpRatio = actor.vitals.hp.current / actor.vitals.hp.max;
    if (hpRatio > 0.5 && actor.vitals.cpw.current >= 10) {
      return { type: 'SKILL', actorId: actor.id, targetId, skillId: 'POWER_STRIKE' };
    }
    return { type: 'ATTACK', actorId: actor.id, targetId };
  },
};

const DefensiveStrategy: AiStrategy = {
  selectAction(actor, state, gameState): CombatAction {
    // Self-heal if HP < 40%
    const hpRatio = actor.vitals.hp.current / actor.vitals.hp.max;
    if (hpRatio < 0.4 && actor.vitals.cpw.current >= 15) {
      return { type: 'SKILL', actorId: actor.id, skillId: 'HEAL_SELF' };
    }

    // Heal lowest-HP enemy ally < 60% hp
    const enemyIds = livingEnemyIds(state, gameState).filter(id => id !== actor.id);
    const woundedAlly = enemyIds.find(id => {
      const c = state.combatants[id]!;
      return c.vitals.hp.current / c.vitals.hp.max < 0.6;
    });
    if (woundedAlly && actor.vitals.cpw.current >= 15) {
      return { type: 'SKILL', actorId: actor.id, targetId: woundedAlly, skillId: 'HEAL_ALLY' };
    }

    // Otherwise attack lowest-HP player target
    const allies = livingAllyIds(state, gameState);
    if (allies.length === 0) return { type: 'DEFEND', actorId: actor.id };
    const targetId = pickAggroTarget(allies, state.combatants, false);
    return { type: 'ATTACK', actorId: actor.id, targetId };
  },
};

// SupportCaster tracks whether it has applied its opening buff via a field on the
// state.  We use bossPhaseScripts presence as a proxy — for non-boss support
// casters we encode turn 1 as "buff turn" via a round check.
const SupportCasterStrategy: AiStrategy = {
  selectAction(actor, state, gameState): CombatAction {
    // Round 1 OR every 4th round: apply group buff
    if ((state.roundNumber === 1 || state.roundNumber % 4 === 0) && actor.vitals.cpw.current >= 20) {
      return { type: 'SKILL', actorId: actor.id, skillId: 'GROUP_BUFF' };
    }

    // Debuff highest-threat player target
    const allies = livingAllyIds(state, gameState);
    if (allies.length === 0) return { type: 'DEFEND', actorId: actor.id };
    const targetId = pickAggroTarget(allies, state.combatants, true);

    if (actor.vitals.cpw.current >= 10) {
      return { type: 'SKILL', actorId: actor.id, targetId, skillId: 'DEBUFF' };
    }
    return { type: 'ATTACK', actorId: actor.id, targetId };
  },
};

// BossScripted: executes phase-scripted action sequences keyed by HP threshold.
// Falls through to Aggressive if no script matches the current phase.
const BossScriptedStrategy: AiStrategy = {
  selectAction(actor, state, gameState): CombatAction {
    const script = state.bossPhaseScripts[actor.id];
    if (script && script.length > 0) {
      const hpRatio = actor.vitals.hp.current / actor.vitals.hp.max;

      // Find the matching phase (highest threshold ≤ current HP ratio)
      const activePhase = [...script]
        .sort((a, b) => b.hpThreshold - a.hpThreshold)
        .find(p => hpRatio <= p.hpThreshold);

      if (activePhase && activePhase.actionSequence.length > 0) {
        // Cycle through the sequence by round number
        const seqIndex = (state.roundNumber - 1) % activePhase.actionSequence.length;
        const skillId = activePhase.actionSequence[seqIndex];

        const allies = livingAllyIds(state, gameState);
        const targetId = allies.length > 0
          ? pickAggroTarget(allies, state.combatants, true)
          : undefined;

        return { type: 'SKILL', actorId: actor.id, targetId, skillId };
      }
    }

    // No matching script phase — fall through to Aggressive
    return AggressiveStrategy.selectAction(actor, state, gameState);
  },
};

/** Maps AI pattern strings to strategy objects. */
const AI_STRATEGIES: Record<AiPattern, AiStrategy> = {
  Aggressive:     AggressiveStrategy,
  Defensive:      DefensiveStrategy,
  SupportCaster:  SupportCasterStrategy,
  BossScripted:   BossScriptedStrategy,
};

/** Selects an action for a non-player-controlled combatant. */
function selectAiAction(
  actor: AnyCharacter,
  state: CombatState,
  gameState: GameState,
): CombatAction {
  const pattern = (actor as EnemyHumanoidCharacter | MonsterCharacter).aiPattern as AiPattern;
  const strategy = AI_STRATEGIES[pattern] ?? AggressiveStrategy;
  return strategy.selectAction(actor, state, gameState);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.5 — MIASMA TRACKING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Increments miasma after an enemy attack.
 * Per-turn gain is capped at 12 regardless of enemy count to prevent
 * multi-enemy encounters from triggering instant surge.
 * Returns the updated miasmaLevel.
 */
function tickMiasmaGain(current: number, enemyCount: number): number {
  const rawGain = enemyCount * 4;
  const capped  = Math.min(rawGain, 12);
  return clamp(current + capped, 0, 100);
}

/**
 * Decays miasma after a successful PURIFY action.
 * Decay = purificationPower × (actor.TEC / 10) − targetMiasmaRes × 0.3; min 5.
 * Since miasmaRes is not tracked per-enemy here, we use a flat estimate of 10.
 */
function tickMiasmaDecay(current: number, purificationPower: number, tec: number): number {
  const decay = purificationPower * (tec / 10) - 10 * 0.3;
  return clamp(current - Math.max(5, decay), 0, 100);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.6 — PURIFICATION AROUSAL GAIN
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Applies purification arousal gain to the acting player/companion.
 * Formula (PRD §4.7):
 *   arousalGain = skillPower × (playerTEC / 10) − targetMiasmaRes × 0.3; min 1
 *
 * We proxy TEC via player.stats.wis (wisdom = magical aptitude) since TEC is
 * an intimacy-only stat not present on CombatStats.
 * Returns updated arousal (clamped 0–100).
 */
function calcPurificationArousalGain(
  skillPower:   number,
  actorWis:     number,
  miasmaLevel:  number,
): number {
  // Arousal gain scales with miasma severity
  const gain = skillPower * (actorWis / 10) * (miasmaLevel / 100);
  return Math.max(1, Math.round(gain));
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.7 — FLEE ATTEMPT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Resolves a flee attempt.
 * Base chance = (player.AGI − avgEnemyAGI) / 100 + 0.3; clamped [10%, 80%].
 * Penalty: −5% per living enemy beyond 1 (harder to escape a crowd).
 */
export function attemptFlee(
  actor:        AnyCharacter,
  state:        CombatState,
  gameState:    GameState,
): boolean {
  const enemies = livingEnemyIds(state, gameState);
  if (enemies.length === 0) return true;

  const avgEnemyAgi = enemies.reduce((sum, id) => sum + state.combatants[id]!.stats.agi, 0)
    / enemies.length;

  const crowdPenalty = (enemies.length - 1) * 0.05;
  const chance = clamp(
    (actor.stats.agi - avgEnemyAgi) / 100 + 0.3 - crowdPenalty,
    0.1,
    0.8,
  );

  return Math.random() < chance;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.8 — COMPANION DOWN + PARTY WIPE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Called after any action that may have reduced a combatant to 0 HP.
 * Downs companions through partyEngine; emits COMPANION_DOWNED / PARTY_WIPED events.
 * Mutates combatState.status to PLAYER_DEFEAT when wiped.
 */
function checkCombatantsDowned(
  state:     CombatState,
  gameState: GameState,
  events:    GameEvent[],
  log:       CombatLogEntry[],
): void {
  for (const id of state.initiativeOrder) {
    const c = state.combatants[id];
    if (!c || c.vitals.hp.current > 0) continue;

    if (isPlayerControlled(id, gameState) && id !== gameState.player.id) {
      // Companion downed — delegate to partyEngine
      const companion = gameState.party.companions.find(m => m.npcId === id);
      if (companion && !companion.isDown) {
        const downResult = downCompanion(gameState, id);
        Object.assign(gameState, downResult.state);
        events.push({ type: 'COMPANION_DOWNED', npcId: id });
        log.push({ round: state.roundNumber, actorId: 'system', message: `${c.name} has been downed!` });
      }
    }
  }

  // Check party wipe (player HP = 0 counts as wipe)
  if (isPartyWiped(gameState) || gameState.player.vitals.hp.current <= 0) {
    state.status = 'PLAYER_DEFEAT';
    events.push({ type: 'PARTY_WIPED' });
    log.push({ round: state.roundNumber, actorId: 'system', message: 'The party has been defeated.' });
  }
}

/**
 * Called when an enemy's HP reaches 0.
 * Records the kill in killedEnemies for batch loot/XP resolution at fight end.
 * Task 24.29: emits INFAMY_DELTA for criminal-faction enemies so the
 * dispatcher's infamyEngine handler increments the current region's score.
 * Criminal faction detection: if the enemy's characterType is 'ENEMY_HUMANOID'
 * and lootTable.faction === 'CRIMINAL', the kill raises regional infamy by 3.
 * Guard faction kills reduce infamy by 2 (e.g. player killed a city guard).
 */
function recordEnemyKill(enemy: AnyCharacter, state: CombatState): void {
  const lootTable = (enemy as MonsterCharacter | EnemyHumanoidCharacter).lootTable;
  const lootTableId = (lootTable as { id?: string } | null)?.id ?? null;
  const purificationReward = (enemy as MonsterCharacter | EnemyHumanoidCharacter).purificationReward;
  const xpReward = (purificationReward as { xp?: number } | null)?.xp ?? 50;

  state.killedEnemies.push({ id: enemy.id, lootTableId, xpReward });

  // Phase 31 (task 31c.3): detect boss by presence in bossPhaseScripts.
  const isBoss = Object.prototype.hasOwnProperty.call(state.bossPhaseScripts, enemy.id);
  if (isBoss) {
    state.killedEnemies[state.killedEnemies.length - 1].isBoss = true;
  }

  // Infamy delta: guard kills raise infamy; criminal kills lower it (Task 24.29).
  // Faction field is optional on lootTable; absent = neutral monster, no delta.
  const faction = (lootTable as { faction?: string } | null)?.faction;
  if (faction === 'GUARD') {
    // Guard kill: +5 infamy in the encounter region
    state.killedEnemies[state.killedEnemies.length - 1].infamyDelta = 5;
  } else if (faction === 'CRIMINAL') {
    // Criminal kill: −2 infamy (positive reputation effect)
    state.killedEnemies[state.killedEnemies.length - 1].infamyDelta = -2;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.9 — DEFEAT OUTCOME SELECTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Emits a COMBAT_DEFEAT_OUTCOME event for the dispatcher to route.
 * The primary enemy is determined by selectPrimaryEnemy():
 *  - Highest-STR living enemy, or last killed if all died simultaneously.
 * Humanoid enemies + adultContentEnabled → 'Intimate' outcome available.
 * Routed by dispatcher to enemySpawnEngine.selectDefeatOutcome().
 */
function emitDefeatOutcome(
  state:     CombatState,
  gameState: GameState,
  events:    GameEvent[],
  log:       CombatLogEntry[],
): void {
  const primary = selectPrimaryEnemy(state, gameState);
  if (!primary) return;

  events.push({
    type:           'COMBAT_DEFEAT_OUTCOME',
    primaryEnemyId: primary.id,
    regionId:       state.regionId,
  });

  log.push({
    round:   state.roundNumber,
    actorId: 'system',
    message: `${primary.name} stands victorious.`,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// TASK 7.10 — WIN WIRING (events emitted at fight end)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Called when all enemies are dead (PLAYER_VICTORY).
 * Emits one ENEMY_KILLED event per kill recorded in killedEnemies[].
 * Dispatcher handles: XP grant, loot resolution, reputation delta, quest progress.
 * Phase 31 (task 31c.3): xpReward and isBoss forwarded so the dispatcher's
 * ENEMY_KILLED handler can call awardCharterXP(10) for standard or (50) for boss.
 */
function emitVictoryEvents(
  state:  CombatState,
  events: GameEvent[],
): void {
  for (const kill of state.killedEnemies) {
    // Phase 31 fix: was incorrectly emitting ENEMY_KILLED_IN_INTIMACY (task 7.10 bug).
    events.push({
      type:      'ENEMY_KILLED',
      targetId:  kill.id,
      regionId:  state.regionId,
      xpReward:  kill.xpReward,
      isBoss:    kill.isBoss ?? false,
    });
    // Task 24.29: emit INFAMY_DELTA for faction kills (guard / criminal).
    if (kill.infamyDelta !== undefined && kill.infamyDelta !== 0) {
      events.push({
        type:     'INFAMY_DELTA',
        regionId: state.regionId as import('../state/gameState').RegionId,
        delta:    kill.infamyDelta,
        newScore: 0, // recalculated by infamyEngine.applyInfamyDelta() in dispatcher
      });
    }
  }
  events.push({
    type:     'REPUTATION_CHANGE',
    regionId: state.regionId,
    delta:    state.killedEnemies.length * 2,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENCOUNTER ENTRY POINTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * startCombat — initialises a CombatState from the combatant list.
 * Call this when the player enters an encounter; pass the result to resolveCombatAction().
 */
// WeakNodeHit records the enemy ids whose weak nodes were detected this round.
// Stored in CombatState so resolveCombatAction() can apply fracture on hit.
export interface WeakNodeHit { enemyId: string; bonusDamage: number }

export function startCombat(
  encounterId:  string,
  regionId:     string,
  combatants:   AnyCharacter[],
  bossScripts:  Record<string, BossPhase[]> = {},
  gameState?:   GameState,
): CombatState {
  const initiativeOrder = buildInitiativeOrder(combatants);
  const combatantMap: Record<string, AnyCharacter> = {};
  for (const c of combatants) {
    combatantMap[c.id] = c;
  }

  // Task 24.25: restore job resources at encounter start.
  // If the player has an active job, reset pool A and B to their max values.
  let state = gameState;
  if (state) {
    try {
      // jobEngine.restoreJobResources requires the live JobDef; we read it from
      // state.jobState.activeJobId. If no job is equipped, this is a no-op.
      const activeJobId = (state.jobState as { activeJobId?: string } | undefined)?.activeJobId;
      if (activeJobId) {
        // Lazy import to avoid circular dep; jobEngine never imports combatEngine.
        const { JOB_CATALOG } = require('../data/jobCatalog') as { JOB_CATALOG?: Record<string, unknown> };
        const jobDef = JOB_CATALOG?.[activeJobId];
        if (jobDef) {
          const restored = restoreJobResources(state, jobDef as Parameters<typeof restoreJobResources>[1]);
          state = restored.state;
        }
      }
    } catch { /* job catalog not yet authored; safe to skip */ }
  }

  return {
    encounterId,
    regionId,
    initiativeOrder,
    currentTurnIndex:     0,
    combatants:           combatantMap,
    roundNumber:          1,
    status:               'RUNNING',
    miasmaLevel:          0,
    purificationProgress: 0,
    bossPhaseScripts:     bossScripts,
    killedEnemies:        [],
    log:                  [],
    weakNodeHits:         [],
  };
}

/**
 * resolveCombatAction — resolves a single action in the current turn.
 *
 * For player/companion turns: caller supplies the CombatAction directly.
 * For enemy turns: action is auto-selected via the AI strategy if action.type
 * is undefined — but the recommended pattern is to call selectEnemyAction()
 * first and pass the result here.
 *
 * Returns a CombatResult with updated combatState, per-target hits, events, and log.
 * Does NOT mutate the incoming state — caller must replace combatState with result.combatState.
 * Note: for performance we shallow-clone state and mutate the clone; deep clone
 * is only applied to combatants[id].vitals on write.
 */
export function resolveCombatAction(
  gameState:   GameState,
  combatState: CombatState,
  action:      CombatAction,
): CombatResult {
  // Shallow-clone state so callers see an immutable-ish surface
  const state: CombatState = {
    ...combatState,
    combatants:    { ...combatState.combatants },
    killedEnemies: [...combatState.killedEnemies],
    log:           [...combatState.log],
  };

  const events: GameEvent[]      = [];
  const hits:   CombatHit[]      = [];
  const log:    CombatLogEntry[] = [];

  let actor = state.combatants[action.actorId];
  if (!actor) throw new Error(`resolveCombatAction: unknown actorId ${action.actorId}`);

  // ── START-OF-TURN STATUS TICK (Task 14.12) ─────────────────────────────────
  // Tick active effects on the current actor; merge returned events into our list.
  // This runs for ALL action types including FLEE/DEFEND/PURIFY so every turn
  // counts toward duration even if the actor cannot attack.
  {
    const tickResult = tickStatusEffects(actor);
    actor = tickResult.character;
    state.combatants[actor.id] = actor;
    events.push(...tickResult.events);
    // If the actor was stunned: skip their action and advance turn.
    // STUNNED expires after 1 turn, so the tick above has already decremented
    // remainingTurns to 0 and emitted STATUS_EXPIRED before we check here.
    // We use the PRE-TICK actor from combatState (not the ticked version) to
    // detect stun, because the tick may have already removed it.
    const wasStunned = hasStatus(combatState.combatants[action.actorId]!, 'STUNNED');
    if (wasStunned) {
      log.push({ round: state.roundNumber, actorId: actor.id, message: `${actor.name} is stunned and cannot act!` });
      _advanceTurn(state, gameState);
      return { combatState: state, hits, events, log };
    }
  }

  // ── FLEE (Task 7.7) ────────────────────────────────────────────────────────
  if (action.type === 'FLEE') {
    const success = attemptFlee(actor, state, gameState);
    if (success) {
      state.status = 'FLED';
      log.push({ round: state.roundNumber, actorId: actor.id, message: `${actor.name} fled from battle!` });
    } else {
      log.push({ round: state.roundNumber, actorId: actor.id, message: `${actor.name} failed to flee!` });
      // On failed flee: the first living enemy gets a free attack
      const enemies = livingEnemyIds(state, gameState);
      if (enemies.length > 0) {
        const punisher = state.combatants[enemies[0]]!;
        // Counter-attack from an enemy punisher — no active skill multiplier (1.0).
        const counterHit = resolveHit(punisher, actor, 10, gameState, 1.0);
        hits.push(counterHit);
        _applyDamage(actor, counterHit, state, gameState, events, log);
        log.push({
          round:   state.roundNumber,
          actorId: punisher.id,
          message: counterHit.dodged
            ? `${actor.name} dodged the counter-attack!`
            : `${punisher.name} strikes for ${counterHit.damage}${counterHit.crit ? ' (CRIT)' : ''}!`,
        });
      }
    }
    // Advance turn regardless of flee outcome
    _advanceTurn(state, gameState);
    return { combatState: state, hits, events, log };
  }

  // ── DEFEND ─────────────────────────────────────────────────────────────────
  if (action.type === 'DEFEND') {
    // +20% DEF for this round (tracked via status effect in real impl; stubbed here)
    log.push({ round: state.roundNumber, actorId: actor.id, message: `${actor.name} takes a defensive stance.` });
    _advanceTurn(state, gameState);
    return { combatState: state, hits, events, log };
  }

  // ── PURIFY (Task 7.5 + 7.6) ───────────────────────────────────────────────
  if (action.type === 'PURIFY') {
    const skillPower = 20; // default purification power; real impl reads SkillDef
    const decay = tickMiasmaDecay(state.miasmaLevel, skillPower, actor.stats.wis);
    state.miasmaLevel = decay;
    state.purificationProgress = clamp(state.purificationProgress + skillPower, 0, 100);

    // Arousal cost on the purifying actor
    const arousalGain = calcPurificationArousalGain(skillPower, actor.stats.wis, combatState.miasmaLevel);
    const updatedActor = {
      ...actor,
      vitals: {
        ...actor.vitals,
        arousal: clamp(actor.vitals.arousal + arousalGain, 0, 100),
      },
    };
    state.combatants[actor.id] = updatedActor;

    log.push({
      round:   state.roundNumber,
      actorId: actor.id,
      message: `${actor.name} purifies! Miasma: ${state.miasmaLevel.toFixed(0)} | Arousal +${arousalGain}`,
    });

    // Purification victory
    if (state.purificationProgress >= 100) {
      state.status = 'PURIFIED';
      emitVictoryEvents(state, events);
      log.push({ round: state.roundNumber, actorId: 'system', message: 'The miasma has been cleansed!' });
    }

    // Overpowered by arousal
    if (updatedActor.vitals.arousal >= 100) {
      state.status = 'PLAYER_DEFEAT';
      events.push({ type: 'PARTY_WIPED' });
      emitDefeatOutcome(state, gameState, events, log);
      log.push({ round: state.roundNumber, actorId: 'system', message: `${actor.name} has been overwhelmed by miasma arousal!` });
    }

    _advanceTurn(state, gameState);
    return { combatState: state, hits, events, log };
  }

  // ── ATTACK / SKILL / USE_ITEM ─────────────────────────────────────────────
  // Resolve targets: AOE resolves all targetIds; single resolves targetId.
  const targetIds: string[] = action.isAoe && action.targetIds?.length
    ? action.targetIds
    : action.targetId
    ? [action.targetId]
    : [];

  // AOE damage scalar (×0.65 split among targets)
  const weaponPower = action.isAoe ? 10 * 0.65 : 10;
  // Active skill DAMAGE_MULTIPLIER from dispatcher; defaults to 1.0 (no bonus).
  const actionDamageMult = action.damageMultiplier ?? 1.0;

  for (const targetId of targetIds) {
    const target = state.combatants[targetId];
    if (!target || !isAlive(target)) continue;

    const hit = resolveHit(actor, target, weaponPower, gameState, actionDamageMult);
    hits.push(hit);
    // Pass on-hit status effects from the action (task 14.14)
    _applyDamage(target, hit, state, gameState, events, log, action.statusEffectsApplied);

    log.push({
      round:   state.roundNumber,
      actorId: actor.id,
      message: hit.dodged
        ? `${target.name} dodged ${actor.name}'s attack!`
        : `${actor.name} hits ${target.name} for ${hit.damage}${hit.crit ? ' (CRIT!)' : ''}.`,
    });
  }

  // ── Miasma gain on enemy attack (Task 7.5) ───────────────────────────────
  if (!isPlayerControlled(actor.id, gameState)) {
    const livingEnemyCount = livingEnemyIds(state, gameState).length;
    state.miasmaLevel = tickMiasmaGain(state.miasmaLevel, livingEnemyCount);

    if (state.miasmaLevel >= 100) {
      events.push({ type: 'QUEST_OBJECTIVE_MET', questId: 'system', objectiveId: 'MIASMA_SURGE', count: 1 });
      log.push({ round: state.roundNumber, actorId: 'system', message: 'MIASMA SURGE — the air reeks of corruption!' });
    }
  }

  // ── Victory check ─────────────────────────────────────────────────────────
  if (state.status === 'RUNNING' && livingEnemyIds(state, gameState).length === 0) {
    state.status = 'PLAYER_VICTORY';
    emitVictoryEvents(state, events);
    log.push({ round: state.roundNumber, actorId: 'system', message: 'All enemies defeated!' });
  }

  // ── Defeat check (Task 7.8) ───────────────────────────────────────────────
  if (state.status === 'RUNNING') {
    checkCombatantsDowned(state, gameState, events, log);
    if (state.status === 'PLAYER_DEFEAT') {
      emitDefeatOutcome(state, gameState, events, log);
    }
  }

  _advanceTurn(state, gameState);
  return { combatState: state, hits, events, log };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Applies a resolved hit's damage to the target in-place within combatState.
 * Records enemy kills immediately so batch loot resolution at fight-end is
 * comprehensive regardless of which action dealt the killing blow.
 *
 * statusEffectsToApply (task 14.14): on a non-dodged hit, rolls each entry's
 * chance and calls applyStatus() on the target if the roll passes.
 */
function _applyDamage(
  target:    AnyCharacter,
  hit:       CombatHit,
  state:     CombatState,
  gameState: GameState,
  events:    GameEvent[],
  log:       CombatLogEntry[],
  statusEffectsToApply?: { defId: string; chance: number }[],
): void {
  if (hit.dodged || hit.damage === 0) return;

  const newHp = Math.max(0, target.vitals.hp.current - hit.damage);
  let updatedTarget: AnyCharacter = {
    ...target,
    vitals: { ...target.vitals, hp: { ...target.vitals.hp, current: newHp } },
  };
  state.combatants[updatedTarget.id] = updatedTarget;

  // Apply any on-hit status effects (task 14.14)
  for (const se of statusEffectsToApply ?? []) {
    if (Math.random() < se.chance) {
      const applyResult = applyStatus(updatedTarget, se.defId);
      updatedTarget = applyResult.character;
      state.combatants[updatedTarget.id] = updatedTarget;
      events.push(...applyResult.events);
      log.push({ round: state.roundNumber, actorId: 'system', message: `${updatedTarget.name} is afflicted with ${se.defId}!` });
    }
  }

  // Task 24.28: apply armor fracture if this enemy is in weakNodeHits.
  // applyArmorFracture reduces the enemy's DEF by a fixed amount for the
  // remainder of the encounter; safe no-op when jobEngine not yet authored.
  if (!hit.dodged && hit.damage > 0) {
    const weakHit = state.weakNodeHits.find(w => w.enemyId === updatedTarget.id);
    if (weakHit) {
      try {
        const fractured = applyArmorFracture(updatedTarget, weakHit.bonusDamage);
        state.combatants[updatedTarget.id] = fractured;
        // Remove from weakNodeHits so the fracture doesn't apply again this round.
        state.weakNodeHits = state.weakNodeHits.filter(w => w.enemyId !== updatedTarget.id);
        log.push({ round: state.roundNumber, actorId: 'system', message: `${updatedTarget.name}'s weak node fractured! DEF reduced.` });
      } catch { /* jobEngine not yet authored; skip */ }
    }
  }

  if (newHp === 0) {
    if (!isPlayerControlled(updatedTarget.id, gameState)) {
      recordEnemyKill(state.combatants[updatedTarget.id]!, state);
      log.push({ round: state.roundNumber, actorId: 'system', message: `${updatedTarget.name} has been defeated!` });
    }
    checkCombatantsDowned(state, gameState, events, log);
  }
}

/**
 * Advances currentTurnIndex to the next living combatant.
 * Wraps around; increments roundNumber when a full rotation completes.
 * Task 24.26: when a new round begins, run weak-node detection for the player's
 * active job (if the job has hasWeakNodeScan) and populate weakNodeHits.
 */
function _advanceTurn(state: CombatState, gameState: GameState): void {
  if (state.status !== 'RUNNING') return;

  const total = state.initiativeOrder.length;
  let next = (state.currentTurnIndex + 1) % total;
  let loops = 0;

  // Skip dead combatants
  while (!isAlive(state.combatants[state.initiativeOrder[next]]!) && loops < total) {
    next = (next + 1) % total;
    loops++;
  }

  const isNewRound = next <= state.currentTurnIndex;
  if (isNewRound) {
    // Wrapped around — new round
    state.roundNumber += 1;

    // Task 24.26: weak-node scan at start of each new round.
    // detectWeakNodes() returns an array of { enemyId, bonusDamage } for enemies
    // whose weak node is exposed. Applied in _applyDamage() then cleared next round.
    try {
      const enemies = livingEnemyIds(state, gameState)
        .map(id => state.combatants[id])
        .filter(Boolean) as AnyCharacter[];
      if (enemies.length > 0) {
        const hits = detectWeakNodes(gameState, enemies);
        state.weakNodeHits = hits as WeakNodeHit[];
      } else {
        state.weakNodeHits = [];
      }
    } catch {
      // jobEngine not yet authored; silently skip
      state.weakNodeHits = [];
    }
  }

  state.currentTurnIndex = next;

  void gameState; // gameState used by helpers; no direct mutation here
}

/**
 * selectEnemyAction — convenience wrapper for the game loop.
 * Call this before resolveCombatAction() on an enemy turn to get the AI-selected action.
 */
export function selectEnemyAction(
  actor:       AnyCharacter,
  state:       CombatState,
  gameState:   GameState,
): CombatAction {
  return selectAiAction(actor, state, gameState);
}
