# Ojisan in Another World — Engine Implementation Specification (v3.0)

This document defines the mechanics, main functions, supporting functions, and the **über engine function** for each game engine. All functions are pure, framework-agnostic, and operate on the schemas in `schemas.ts` (v9). The server is the sole authority; the API layer calls the appropriate über function based on the player's intent.

---

Below is the updated **Combat Engine** specification, expanded with granular mechanics for loot resolution, strip-and-loot gear sets, purification, sexual attacks, and status effect ticking. The new content is integrated directly into the existing structure.

---

## 1. Combat Engine

**Purpose:** Execute a full combat encounter turn by turn until victory, defeat, or flee.

### Granular Mechanics

- **Encounter initialization:** Build `CombatEncounterRuntimeState` from `EncounterDef`, player party, and region profile. Scale enemies to target level using `scaleEnemyStats`.  
  - `scaleEnemyStats(enemyDef, targetLevel, monsterType)` applies `MONSTER_TYPE_MULTIPLIERS` and base growth constants to produce final combat attributes and vitals.
  - Boss enemies use `BossScriptDef` from `boss_scripts_seed_data.ts`; boss AI is `EnemyAiPattern.BossScripted`.
- **Initiative:** For each combatant, `initiative = agi + rollD10()`. Ties broken by `lck` descending. Store sorted `turnOrder`.
- **Turn processing:** `currentTurnIndex` cycles through `turnOrder`. If combatant `downed`, skip.  
  - Player/companion turn: player chooses action (attack, skill, item, defend, purify, flee). Companion AI chooses action.  
  - Enemy turn: `chooseEnemyAction` decides based on `EnemyAiPattern`:
    - **Aggressive:** prioritize highest-threat target, use damaging abilities.
    - **Defensive:** prefer guarding or low-cost attacks.
    - **SupportCaster:** use support abilities, heal/buff allies, or use sexual attacks if `maxMiasmaReserve` allows and `ContentToggle.HostileArousalAttacks` is on.
    - **BossScripted:** follow `BossScriptDef.phases`; at HP thresholds, trigger scripted abilities.
- **Action execution:**  
  - Physical attacks use `calculateDamage` (base weaponPower × (attackerSTR/10), mitigated by defenderDEF × 0.5, critical based on LCK).  
  - Skill effects resolve via `resolveSkillEffect`.  
  - Sexual attacks use `applyArousalToCombatant`; enemy sexual attacks require `miasmaReserve` and target selection based on `monsterSex`, `isHumanoidForm`, and the target’s gender.  
  - Status effects tick at end of each turn.
- **Defeat checking:** After each action, check `currentHp <= 0` or `arousal >= 100` (for purifiable enemies). Set `downed`, `defeatMethod` (`"KILLED"` or `"PURIFIED"`).
- **Victory condition:** All enemies `downed`. Apply loot, gold, XP, reputation, battle points.  
  - Purified enemies are also considered defeated; they grant reduced gold but add Astraea Approval bonus.
- **Defeat condition:** Player and all companions `downed`. Trigger Last Safe Location recovery.  
- **Flee:** Roll success chance based on player AGI vs average enemy AGI. If successful, end encounter without rewards.  
- **Defeat outcomes (humanoid/humanoid-form enemies with `presentsDefeatMenu: true`):**  
  After victory, the player may choose an option from `DefeatOutcome`:
  - `SpareAndRelease`, `HandToGuard`, `Interrogate`, `Loot`, `StripAndLoot`, `ForceIntimacy`, `PermanentlyRemove`.  
  - **`Loot`** rolls the enemy’s `lootTableId` (if any) and grants gold from `goldDropRange`.  
  - **`StripAndLoot`** is only valid if `enemy.isHumanoidForm === true` and `enemy.monsterSex` is `"MALE"` or `"FEMALE"`. In addition to the normal loot roll, it grants all items from `HUMANOID_STRIP_LOOT_GEAR_SETS[enemy.family][enemy.monsterSex]` at 100% drop rate. It also marks the enemy as stripped (equipment removed from corpse).  
  - **`ForceIntimacy`** triggers an immediate intimate encounter (see Intimacy Engine) with the defeated enemy; requires appropriate content toggles and legality checks.  
  - Other outcomes apply narrative/legal consequences and may grant reputation changes.
- **Purification:** Enemy `arousal` reaching 100 sets `downed`, `defeatMethod: "PURIFIED"`. Purified enemies cannot be looted or stripped normally; they grant a small Astraea Approval bonus and count as defeated.
- **Miasma Reserve:** Enemy-only resource; does not regenerate mid-fight. Used to limit enemy sexual attacks.
- **Loot resolution order (after victory):**
  1. Determine if defeat menu is shown (`presentsDefeatMenu`).
  2. If outcome is `Loot` or `StripAndLoot`, call `resolveLoot`.
  3. If `StripAndLoot`, call `applyStripAndLoot` before normal loot.
  4. Add gold to party, add items via `addItemToInventory` (overflow handled per economy engine).

---

### Main Engine Functions

```ts
// Main entry: runs the entire encounter. Returns updated GameState and encounter log.
function runCombatEncounter(
  gameState: GameState,
  encounterDef: EncounterDef,
  regionProfile: RegionMonsterProfile,
  rngSeed: string
): { gameState: GameState; encounterLog: string[] }

// Process a single turn within an active encounter.
function processCombatTurn(
  encounterState: CombatEncounterRuntimeState,
  actionSelection: PlayerActionSelection,
  gameState: GameState
): { encounterState: CombatEncounterRuntimeState; gameState: GameState; log: string[] }

// Process the player's selected action.
function executePlayerCombatAction(
  encounterState: CombatEncounterRuntimeState,
  action: CombatAction,
  targetId: string,
  gameState: GameState
): void

// Process an enemy's action.
function executeEnemyCombatAction(
  encounterState: CombatEncounterRuntimeState,
  enemyCombatant: CombatCombatantRuntime,
  gameState: GameState
): void

// Check for end conditions and resolve loot/rewards.
function resolveCombatEnd(
  encounterState: CombatEncounterRuntimeState,
  gameState: GameState
): GameState

// Attempt to flee from combat.
function attemptFlee(
  encounterState: CombatEncounterRuntimeState,
  gameState: GameState
): GameState

// NEW: Apply a selected defeat outcome (Loot, StripAndLoot, etc.).
function applyDefeatOutcome(
  encounterState: CombatEncounterRuntimeState,
  gameState: GameState,
  outcome: DefeatOutcome,
  targetEnemyId: string
): GameState

// NEW: Resolve normal loot for a defeated enemy.
function resolveEnemyLoot(
  enemy: CombatCombatantRuntime,
  enemyDef: EnemyCombatantDef,
  gameState: GameState
): GameState

// NEW: Apply strip-and-loot gear set to inventory (requires humanoid form).
function applyStripAndLoot(
  enemy: CombatCombatantRuntime,
  enemyDef: EnemyCombatantDef,
  gameState: GameState
): GameState
```

---

### Supporting Functions

```ts
initCombatEncounter(...)
rollInitiative(...)
chooseEnemyAction(...)
calculateDamage(...)
applyDamageToCombatant(...)
applyArousalToCombatant(...)
isEncounterOver(...)
resolveDefeatOutcome(...)
scaleEnemyStats(...)

// NEW: Roll a loot table and return dropped items.
rollLootTable(
  lootTableId: string,
  rngSeed: string
): { itemId: string; quantity: number }[]

// NEW: Retrieve the strip-loot gear set for a given family and gender.
getHumanoidStripLootGearSet(
  family: string,
  monsterSex: "MALE" | "FEMALE"
): string[]

// NEW: Add combat rewards to game state (gold, XP, reputation, items).
applyCombatRewards(
  gameState: GameState,
  encounterDef: EncounterDef,
  defeatedEnemies: EnemyCombatantDef[],
  outcome: DefeatOutcome | null
): GameState

// NEW: Apply purification bonus to Astraea Approval.
applyPurificationBonus(
  gameState: GameState,
  purifiedCount: number
): GameState
```

---

### Über Engine Function

```ts
// The single entry point for any combat-related intent. Handles start, turn, flee, and end.
function combatEngine(
  gameState: GameState,
  intent: CombatIntent,
  encounterState?: CombatEncounterRuntimeState,
  rngSeed?: string
): { gameState: GameState; encounterState?: CombatEncounterRuntimeState; log: string[] }
```

The `combatEngine` now additionally handles intents related to defeat outcomes:
- `START_COMBAT`
- `PROCESS_TURN`
- `ATTEMPT_FLEE`
- `APPLY_DEFEAT_OUTCOME` (with `data.outcome` and `data.targetEnemyId`)

---

### Integration with Loot Data

- `LootTableDef[]` from `loot_tables_seed_data.ts` provides all `lootTableId` references used by `EnemyCombatantDef.lootTableId`.
- `HUMANOID_STRIP_LOOT_GEAR_SETS` from `loot_tables_seed_data.ts` provides the guaranteed gear sets for `StripAndLoot`.
- The engine calls `rollLootTable` and `getHumanoidStripLootGearSet` to resolve drops.

This updated spec closes the gap between the old Combat Engine description and the new loot/strip mechanics, making the implementation ready for coding.
---

## 2. Updated Intimacy Engine Specification

**Purpose:** Execute a full intimate scene, turn by turn, from initiation to end, managing multiple simultaneous actions, dynamic partner state (resistance, mental state, mood), and post-scene persistence.

---

### Granular Mechanics

- **Scene initialization:**  
  `startIntimateEncounter` creates `IntimateEncounterRuntimeState`, snapshots player/partner vitals, sets `sceneStartReason`, and initializes partner resistance, mental state, and mood using rules from `intimacy_state_rules_seed_data.ts`.  
  - Consensual scenes use `CONSENSUAL_INITIAL_RESISTANCE_RULES`, `CONSENSUAL_INITIAL_MENTAL_STATE_RULES`, `CONSENSUAL_INITIAL_MOOD_RULES`.  
  - Forced scenes (`FORCE_INTIMACY` / `FORCE_INTIMACY_SLEEPING`) use `FORCED_SCENE_INITIALIZATION_RULES`.  
  - If partner mental state is already `Broken` (from previous encounters), mood is locked to `Compliant` and resistance is set to 0 per `GLOBAL_INTIMACY_STATE_RULES`.

- **Turn loop:**  
  Player selects one or more actions (up to a limit, e.g., 3 simultaneous actions) from available `IntimateActionDef`s. Each action is validated against:
  - Current `PositionDef` (`allowedPositionIds`)
  - Body-part and penetration conflicts (`occupiedBodyParts`, `occupiedPenetrationTargets`)
  - Partner mood, mental state, and resistance thresholds (`allowedPartnerMoods`, `allowedPartnerMentalStates`, `maxPartnerResistance`, `minPartnerResistance`)
  - Item requirements (`requiresItem`)
  
  The last selected action becomes `lastActionId`; all selected actions are stored in `activeActionIds`.

- **Action execution:**  
  For each active action (or the combined set), the engine:
  - Performs TEC check if `isTechniqueSensitive` (formula: `successChance = clamp(0.4 + technique/125, 0.1, 0.95)`).
  - Computes arousal and stamina changes for both participants from the action’s rates and multipliers.
  - Computes bladder and milk deltas (if defined) using the `scaleDelta` formula.
  - Computes permanent erotic attribute gains (technique & sensitivity) for both participants.
  - Applies resistance, mental state, and mood effects from the action (`partnerResistanceDelta`, `partnerMentalStateEffect`, `partnerMoodEffect`).
  - Updates kink progress for the promoted kinks.
  - Updates `occupiedBodyParts` and `occupiedPenetrationTargets` to reflect ongoing actions.

- **State progression:**  
  After each action (or set of simultaneous actions), the engine applies global state rules from `GLOBAL_INTIMACY_STATE_RULES`:
  - If mental state is `Broken`: mood is locked to `Compliant`; resistance is forced to 0 and no longer changes.
  - If mood is `Submissive`: positive resistance deltas are multiplied by `submissiveResistanceGainMultiplier`.
  - If mood is `Horny`: positive resistance deltas are multiplied by `hornyResistanceGainMultiplier`.
  - If mood is `Defiant`: `defiantResistanceThresholdBonus` (20) is added to action max resistance; positive resistance deltas become negative (reduce resistance).
  - If mood is `Defiant` and resistance reaches 0, there is a 20% chance (`defiantBreakChance`) to set mental state to `Broken`, locking mood to `Compliant`.
  - Climax actions and cumulative effects may shift mental state and mood per action effects.

- **Penetration tracking:**  
  `occupiedBodyParts` and `occupiedPenetrationTargets` are arrays that are updated when actions start and cleared when actions end (if an action is removed from active set). Penetration targets are exclusive: only one action can target `Vagina`, `Anus`, or `Mouth` at a time.

- **Satisfaction:**  
  Computed at `concludeIntimateScene` using the formula:  
  ```
  arousalComponent = 40 × (partnerFinalArousal / 100)
  techComponent    = 30 × (tecChecksPassed / max(1, tecChecksAttempted))
  kinkBonus        = kinkTriggered ? 15 : 0
  sincereBonus     = sincereDialogueUsed ? 15 : 0
  satisfaction     = clamp(arousalComponent + techComponent + kinkBonus + sincereBonus, 0, 100)
  ```
  If `sceneEndReason === "STAMINA_EXHAUSTED" && partnerFinalArousal < 100`, then `satisfaction = min(satisfaction, 40)`.

- **Persistence:**  
  `persistIntimateResults` writes final vitals (HP, arousal, stamina, bladder, milk) and erotic attributes (technique, sensitivity gains) back to the player and partner actor states. It also persists any remaining status effects, pregnancy risk flags, and marks `firstIntimacyCompleted` if applicable.

---

### Main Engine Functions

```ts
// Main entry: runs the entire intimate scene. Returns updated GameState and scene log.
function runIntimateEncounter(
  gameState: GameState,
  partnerActorId: string,
  sceneStartReason: SceneStartReason,
  rngSeed: string
): { gameState: GameState; sceneLog: string[] }

// Process one turn in the intimate scene.
function processIntimateTurn(
  sceneState: IntimateEncounterRuntimeState,
  actionSelection: IntimateActionSelection,
  gameState: GameState
): { sceneState: IntimateEncounterRuntimeState; gameState: GameState; log: string[] }

// Execute the chosen intimate action.
function executeIntimateAction(
  sceneState: IntimateEncounterRuntimeState,
  action: IntimateActionDef,
  position: PositionDef,
  gameState: GameState
): void

// End the scene and calculate satisfaction.
function concludeIntimateScene(
  sceneState: IntimateEncounterRuntimeState,
  endReason: SceneEndReason,
  gameState: GameState
): GameState

// Change position within the scene.
function changePosition(
  sceneState: IntimateEncounterRuntimeState,
  newPositionId: string,
  gameState: GameState
): void
```

---

### Supporting Functions

```ts
startIntimateEncounter(...)
isActionValidInPosition(...)
isBodyPartOccupied(...)
isPenetrationTargetOccupied(...)
applyIntimateAction(...)
performTecCheck(...)
endIntimateEncounter(...)
persistIntimateResults(...)
selectSexualResponse(...)
updateKinkProgress(...)
initializePartnerStateForScene(...)
applyResistanceDelta(...)
applyMentalStateEffect(...)
applyMoodEffect(...)
applyGlobalStateRules(...)
scaleDelta(...)
```

---

### Function Definitions

#### `startIntimateEncounter(gameState, partnerActorId, sceneStartReason, rngSeed)`

Creates a new `IntimateEncounterRuntimeState` and initializes all dynamic fields.

```ts
function startIntimateEncounter(
  gameState: GameState,
  partnerActorId: string,
  sceneStartReason: SceneStartReason,
  rngSeed: string
): { sceneState: IntimateEncounterRuntimeState; gameState: GameState } {
  const partner = getPartnerActor(gameState, partnerActorId);
  const player = gameState.player;

  // Snapshot vitals (including bladder/milk if present)
  const playerVitalsSnapshot = { ...player.vitals };
  const partnerVitalsSnapshot = { ...partner.vitals };

  // Initialize partner state (resistance, mentalState, mood)
  const init = initializePartnerStateForScene(gameState, partner, sceneStartReason, rngSeed);

  const sceneState: IntimateEncounterRuntimeState = {
    sceneStartReason,
    partnerActorId,
    playerActorId: player.id,
    currentPositionId: getDefaultPositionId(sceneStartReason, partner),
    activeActionIds: [],
    lastActionId: null,
    playerVitalsSnapshot,
    partnerVitalsSnapshot,
    tecChecksAttempted: 0,
    tecChecksPassed: 0,
    kinkTriggered: false,
    sincereDialogueUsed: false,
    sceneEndReason: null,
    playerStatusEffects: [...player.statusEffects],
    partnerStatusEffects: [...partner.statusEffects],
    occupiedBodyParts: [],
    occupiedPenetrationTargets: [],
    partnerClimaxing: false,
    partnerClimaxType: undefined,
    partnerSquirtingMilk: false,
    partnerResistance: init.resistance,
    partnerMentalState: init.mentalState,
    partnerMood: init.mood,
    isForced: sceneStartReason !== "CONSENSUAL",
  };

  return { sceneState, gameState };
}
```

#### `initializePartnerStateForScene(gameState, partner, sceneStartReason, rngSeed)`

Determines initial resistance, mental state, and mood based on love/trust and scene type.

```ts
function initializePartnerStateForScene(
  gameState: GameState,
  partner: CharacterActorState & { trustLove?: TrustLoveState; mentalState?: PartnerMentalState; mood?: PartnerMood; resistance?: number },
  sceneStartReason: SceneStartReason,
  rngSeed: string
): { resistance: number; mentalState: PartnerMentalState; mood: PartnerMood } {
  if (sceneStartReason === "CONSENSUAL") {
    const love = partner.trustLove?.love ?? 0;
    const trust = partner.trustLove?.trust ?? 0;

    // Resistance
    const resRule = CONSENSUAL_INITIAL_RESISTANCE_RULES.find(r => love >= r.loveMin && trust >= r.trustMin);
    const resistance = rollRange(resRule.resistanceRange.min, resRule.resistanceRange.max, rngSeed);

    // Mental state
    const mentalRule = CONSENSUAL_INITIAL_MENTAL_STATE_RULES.find(r => love >= r.loveMin && trust >= r.trustMin);
    let mentalState = mentalRule.mentalState;
    if (mentalRule.randomVariantChance && Math.random() < mentalRule.randomVariantChance) {
      mentalState = pickRandom(mentalRule.randomVariantStates, rngSeed);
    }

    // Mood
    const moodRule = CONSENSUAL_INITIAL_MOOD_RULES.find(r => love >= r.loveMin && trust >= r.trustMin);
    const mood = pickWeighted(moodRule.moodWeights, rngSeed);

    return { resistance, mentalState, mood };
  } else {
    // Forced scene
    const trust = partner.trustLove?.trust ?? 0;
    const rule = FORCED_SCENE_INITIALIZATION_RULES;
    let resistance = clamp(rule.resistanceBase + (100 - trust) * rule.resistancePerTrustMissing, rule.resistanceClamp.min, rule.resistanceClamp.max);
    let mentalState = rule.mentalStateIfNotBroken;
    let mood = rule.moodByTrust[trust < 20 ? "below20" : "above20"];

    // If partner already broken, override
    if (partner.mentalState === PartnerMentalState.Broken) {
      resistance = 0;
      mentalState = PartnerMentalState.Broken;
      mood = rule.brokenMood;
    }

    return { resistance, mentalState, mood };
  }
}
```

#### `processIntimateTurn(sceneState, actionSelection, gameState)`

Validates and executes the player’s chosen action set.

```ts
function processIntimateTurn(
  sceneState: IntimateEncounterRuntimeState,
  actionSelection: IntimateActionSelection,
  gameState: GameState
): { sceneState: IntimateEncounterRuntimeState; gameState: GameState; log: string[] } {
  const log: string[] = [];

  // Validate all selected actions
  const selectedActions = actionSelection.actionIds
    .map(id => getIntimateActionById(id))
    .filter(a => a !== undefined);

  // Check if any selected action conflicts with current position, occupied parts, etc.
  const validActions = selectedActions.filter(action => 
    isActionValidInPosition(action, sceneState.currentPositionId) &&
    !isBodyPartOccupied(action.occupiedBodyParts, sceneState.occupiedBodyParts) &&
    !isPenetrationTargetOccupied(action.penetrationTarget, sceneState.occupiedPenetrationTargets) &&
    checkActionEligibility(action, sceneState)
  );

  if (validActions.length === 0) {
    log.push("No valid actions selected.");
    return { sceneState, gameState, log };
  }

  // Set active actions
  sceneState.activeActionIds = validActions.map(a => a.id);
  sceneState.lastActionId = validActions[validActions.length - 1].id; // last selected

  // Execute each action
  for (const action of validActions) {
    const position = getPositionById(sceneState.currentPositionId);
    executeIntimateAction(sceneState, action, position, gameState);
  }

  // Apply global state rules (e.g., broken mood lock, defiant override)
  applyGlobalStateRules(sceneState);

  // Check for end conditions
  if (sceneState.partnerVitalsSnapshot.currentStamina <= 0 || sceneState.playerVitalsSnapshot.currentStamina <= 0) {
    gameState = concludeIntimateScene(sceneState, "STAMINA_EXHAUSTED", gameState);
  }

  return { sceneState, gameState, log };
}
```

#### `executeIntimateAction(sceneState, action, position, gameState)`

Applies a single action’s effects to the scene state and actors.

```ts
function executeIntimateAction(
  sceneState: IntimateEncounterRuntimeState,
  action: IntimateActionDef,
  position: PositionDef,
  gameState: GameState
): void {
  const player = gameState.player;
  const partner = getPartnerActor(gameState, sceneState.partnerActorId);

  // TEC check if needed
  if (action.isTechniqueSensitive || position.isTechniqueSensitive) {
    sceneState.tecChecksAttempted++;
    const success = performTecCheck(partner.eroticAttributes.technique);
    if (success) sceneState.tecChecksPassed++;
  }

  // Compute scaled deltas
  const arousalDeltaPlayer = scaleDelta(action.playerArousalRatePerTurn, player, partner);
  const arousalDeltaPartner = scaleDelta(action.partnerArousalRatePerTurn, partner, player);
  const staminaCostPlayer = action.playerStaminaCostMultiplier * BASE_STAMINA_COST;
  const staminaCostPartner = action.partnerStaminaCostMultiplier * BASE_STAMINA_COST;

  // Apply arousal and stamina to snapshots
  sceneState.playerVitalsSnapshot.currentArousal = clamp(sceneState.playerVitalsSnapshot.currentArousal + arousalDeltaPlayer, 0, 100);
  sceneState.partnerVitalsSnapshot.currentArousal = clamp(sceneState.partnerVitalsSnapshot.currentArousal + arousalDeltaPartner, 0, 100);
  sceneState.playerVitalsSnapshot.currentStamina -= staminaCostPlayer;
  sceneState.partnerVitalsSnapshot.currentStamina -= staminaCostPartner;

  // Bladder and milk deltas
  if (action.playerBladderDelta) {
    sceneState.playerVitalsSnapshot.currentBladder = clamp(sceneState.playerVitalsSnapshot.currentBladder + scaleDelta(action.playerBladderDelta, player, partner), 0, 100);
  }
  if (action.partnerBladderDelta) {
    sceneState.partnerVitalsSnapshot.currentBladder = clamp(sceneState.partnerVitalsSnapshot.currentBladder + scaleDelta(action.partnerBladderDelta, partner, player), 0, 100);
  }
  if (action.playerMilkDelta) {
    sceneState.playerVitalsSnapshot.currentMilk = clamp(sceneState.playerVitalsSnapshot.currentMilk + scaleDelta(action.playerMilkDelta, player, partner), 0, 100);
  }
  if (action.partnerMilkDelta) {
    sceneState.partnerVitalsSnapshot.currentMilk = clamp(sceneState.partnerVitalsSnapshot.currentMilk + scaleDelta(action.partnerMilkDelta, partner, player), 0, 100);
  }

  // Permanent technique & sensitivity gains
  player.eroticAttributes.technique += action.playerTechniqueGain * 0.01; // tiny per use
  partner.eroticAttributes.technique += action.partnerTechniqueGain * 0.01;
  player.eroticAttributes.sensitivity += action.playerSensitivityGain * 0.01;
  partner.eroticAttributes.sensitivity += action.partnerSensitivityGain * 0.01;

  // Resistance, mental state, mood effects
  applyResistanceDelta(sceneState, action.partnerResistanceDelta, action);
  if (action.partnerMentalStateEffect) {
    applyMentalStateEffect(sceneState, action.partnerMentalStateEffect);
  }
  if (action.partnerMoodEffect) {
    applyMoodEffect(sceneState, action.partnerMoodEffect);
  }

  // Update occupied parts
  action.occupiedBodyParts.forEach(part => {
    if (!sceneState.occupiedBodyParts.includes(part)) {
      sceneState.occupiedBodyParts.push(part);
    }
  });
  if (action.penetrationTarget && !sceneState.occupiedPenetrationTargets.includes(action.penetrationTarget)) {
    sceneState.occupiedPenetrationTargets.push(action.penetrationTarget);
  }

  // Kink progress
  if (action.promotesKink) {
    updateKinkProgress(gameState, sceneState.partnerActorId, action.promotesKink, 1);
  }

  // Handle climax actions
  if (action.category === IntimateActionCategory.Climax && action.ledBy === "CHARACTER") {
    sceneState.partnerClimaxing = true;
    // Determine climax type based on action id or other conditions
    if (action.id.includes("squirting")) {
      sceneState.partnerClimaxType = "SQUIRTING";
      if (action.id.includes("body_shaking")) sceneState.partnerClimaxType = "BODY_SHAKING_SQUIRTING";
    } else if (action.id.includes("body_shaking")) {
      sceneState.partnerClimaxType = "BODY_SHAKING";
    } else {
      sceneState.partnerClimaxType = "NORMAL";
    }
  }
}
```

#### `changePosition(sceneState, newPositionId, gameState)`

Changes the current position. It does **not** change active actions, but actions may become invalid; the UI should filter based on the new position.

```ts
function changePosition(
  sceneState: IntimateEncounterRuntimeState,
  newPositionId: string,
  gameState: GameState
): void {
  const pos = getPositionById(newPositionId);
  if (!pos) return; // invalid

  // Update position
  sceneState.currentPositionId = newPositionId;

  // Optionally, clear active actions that are no longer allowed in this position
  sceneState.activeActionIds = sceneState.activeActionIds.filter(actionId => {
    const action = getIntimateActionById(actionId);
    return action && isActionValidInPosition(action, newPositionId);
  });
  // Recompute occupied parts based on remaining active actions
  recomputeOccupiedParts(sceneState);
}
```

#### `concludeIntimateScene(sceneState, endReason, gameState)`

Ends the scene, calculates satisfaction, applies final state, and persists.

```ts
function concludeIntimateScene(
  sceneState: IntimateEncounterRuntimeState,
  endReason: SceneEndReason,
  gameState: GameState
): GameState {
  sceneState.sceneEndReason = endReason;

  // Calculate satisfaction
  const partnerFinalArousal = sceneState.partnerVitalsSnapshot.currentArousal;
  const arousalComponent = 40 * (partnerFinalArousal / 100);
  const techComponent = sceneState.tecChecksAttempted > 0
    ? 30 * (sceneState.tecChecksPassed / sceneState.tecChecksAttempted)
    : 30;
  const kinkBonus = sceneState.kinkTriggered ? 15 : 0;
  const sincereBonus = sceneState.sincereDialogueUsed ? 15 : 0;
  let satisfaction = clamp(arousalComponent + techComponent + kinkBonus + sincereBonus, 0, 100);
  if (endReason === "STAMINA_EXHAUSTED" && partnerFinalArousal < 100) {
    satisfaction = Math.min(satisfaction, 40);
  }

  // Persist results
  gameState = persistIntimateResults(gameState, sceneState, satisfaction);

  return gameState;
}
```

#### `persistIntimateResults(gameState, sceneState, satisfaction)`

Writes final vitals and erotic attributes back to actors.

```ts
function persistIntimateResults(
  gameState: GameState,
  sceneState: IntimateEncounterRuntimeState,
  satisfaction: number
): GameState {
  const player = gameState.player;
  const partner = getPartnerActor(gameState, sceneState.partnerActorId);

  // Restore vitals from snapshots
  player.vitals = sceneState.playerVitalsSnapshot;
  partner.vitals = sceneState.partnerVitalsSnapshot;

  // Clamp vitals
  clampVitals(player.vitals);
  clampVitals(partner.vitals);

  // Mark first intimacy
  if (partner.firstIntimacyCompleted !== undefined) {
    partner.firstIntimacyCompleted = true;
  }

  // Apply post-scene trust/love gains? (handled elsewhere, but could be here)
  // Satisfaction influences trust/love if desired

  return gameState;
}
```

#### `performTecCheck(technique)`

Returns success boolean using formula.

```ts
function performTecCheck(technique: number): boolean {
  const chance = clamp(0.4 + technique / 125, 0.1, 0.95);
  return Math.random() < chance;
}
```

#### `scaleDelta(baseDelta, actor, partner)`

Scales a base delta based on both actors’ technique and partner’s sensitivity.

```ts
function scaleDelta(
  baseDelta: number,
  actor: CharacterActorState,
  partner: CharacterActorState
): number {
  const techFactor = (1 + actor.eroticAttributes.technique / 100) +
                     (1 + partner.eroticAttributes.technique / 100);
  const sensitivityFactor = 0.8 + partner.eroticAttributes.sensitivity / 200;
  return baseDelta * techFactor * sensitivityFactor;
}
```

#### `isActionValidInPosition(action, positionId)`

Checks if the action’s `allowedPositionIds` includes the position.

```ts
function isActionValidInPosition(
  action: IntimateActionDef,
  positionId: string
): boolean {
  return action.allowedPositionIds?.includes(positionId) ?? true;
}
```

#### `isBodyPartOccupied(bodyParts, occupiedBodyParts)`

Returns true if any of `bodyParts` are already occupied.

```ts
function isBodyPartOccupied(
  bodyParts: BodyPartTarget[],
  occupiedBodyParts: BodyPartTarget[]
): boolean {
  return bodyParts.some(part => occupiedBodyParts.includes(part));
}
```

#### `isPenetrationTargetOccupied(penetrationTarget, occupiedPenetrationTargets)`

Returns true if the target is already occupied.

```ts
function isPenetrationTargetOccupied(
  penetrationTarget: PenetrationTarget | undefined,
  occupiedPenetrationTargets: PenetrationTarget[]
): boolean {
  if (!penetrationTarget) return false;
  return occupiedPenetrationTargets.includes(penetrationTarget);
}
```

#### `checkActionEligibility(action, sceneState)`

Checks mood, mental state, and resistance gates.

```ts
function checkActionEligibility(
  action: IntimateActionDef,
  sceneState: IntimateEncounterRuntimeState
): boolean {
  const { partnerMood, partnerMentalState, partnerResistance } = sceneState;
  if (action.allowedPartnerMoods && !action.allowedPartnerMoods.includes(partnerMood)) return false;
  if (action.allowedPartnerMentalStates && !action.allowedPartnerMentalStates.includes(partnerMentalState)) return false;
  if (action.maxPartnerResistance !== undefined) {
    let max = action.maxPartnerResistance;
    if (partnerMood === PartnerMood.Defiant) {
      max += GLOBAL_INTIMACY_STATE_RULES.defiantResistanceThresholdBonus;
    }
    if (partnerResistance > max) return false;
  }
  if (action.minPartnerResistance !== undefined && partnerResistance < action.minPartnerResistance) return false;
  return true;
}
```

#### `applyResistanceDelta(sceneState, delta, action)`

Applies resistance change with global modifiers.

```ts
function applyResistanceDelta(
  sceneState: IntimateEncounterRuntimeState,
  delta: number,
  action?: IntimateActionDef
): void {
  let newDelta = delta;

  // If broken, resistance is forced to 0 and no changes
  if (sceneState.partnerMentalState === PartnerMentalState.Broken) {
    sceneState.partnerResistance = 0;
    return;
  }

  // Mood-specific modifiers
  const mood = sceneState.partnerMood;
  if (delta > 0) {
    if (mood === PartnerMood.Submissive) {
      newDelta *= GLOBAL_INTIMACY_STATE_RULES.submissiveResistanceGainMultiplier;
    } else if (mood === PartnerMood.Horny) {
      newDelta *= GLOBAL_INTIMACY_STATE_RULES.hornyResistanceGainMultiplier;
    } else if (mood === PartnerMood.Defiant) {
      // Override positive to negative
      newDelta = -Math.abs(delta);
    }
  }

  sceneState.partnerResistance = clamp(sceneState.partnerResistance + newDelta, 0, 100);

  // Check for break chance if defiant and resistance hits 0
  if (mood === PartnerMood.Defiant && sceneState.partnerResistance <= 0) {
    if (Math.random() < GLOBAL_INTIMACY_STATE_RULES.defiantBreakChance) {
      sceneState.partnerMentalState = PartnerMentalState.Broken;
      sceneState.partnerMood = PartnerMood.Compliant;
    } else {
      sceneState.partnerMood = PartnerMood.Reluctant; // fallback
    }
  }
}
```

#### `applyMentalStateEffect(sceneState, effect)`

Attempts to shift mental state toward target with given intensity.

```ts
function applyMentalStateEffect(
  sceneState: IntimateEncounterRuntimeState,
  effect: { target: PartnerMentalState; intensity: number }
): void {
  if (sceneState.partnerMentalState === PartnerMentalState.Broken) return; // cannot change from broken
  if (Math.random() < effect.intensity) {
    sceneState.partnerMentalState = effect.target;
    // If transitioning to Broken, lock mood
    if (effect.target === PartnerMentalState.Broken) {
      sceneState.partnerMood = PartnerMood.Compliant;
      sceneState.partnerResistance = 0;
    }
  }
}
```

#### `applyMoodEffect(sceneState, effect)`

Attempts to shift mood toward target with given intensity.

```ts
function applyMoodEffect(
  sceneState: IntimateEncounterRuntimeState,
  effect: { target: PartnerMood; intensity: number }
): void {
  if (sceneState.partnerMentalState === PartnerMentalState.Broken) return; // mood locked
  if (Math.random() < effect.intensity) {
    sceneState.partnerMood = effect.target;
  }
}
```

#### `applyGlobalStateRules(sceneState)`

Applies global rules after all actions in a turn.

```ts
function applyGlobalStateRules(
  sceneState: IntimateEncounterRuntimeState
): void {
  const rules = GLOBAL_INTIMACY_STATE_RULES;

  if (sceneState.partnerMentalState === PartnerMentalState.Broken) {
    sceneState.partnerMood = PartnerMood.Compliant;
    sceneState.partnerResistance = 0;
    return;
  }

  // Defiant resistance threshold bonus already applied in eligibility; no further global needed
}
```

#### `updateKinkProgress(gameState, partnerId, kinkIds, amount)`

Increments kink progress for the partner.

```ts
function updateKinkProgress(
  gameState: GameState,
  partnerId: string,
  kinkIds: string[],
  amount: number
): void {
  const partner = getPartnerActor(gameState, partnerId);
  partner.kinkProgress = partner.kinkProgress || {};
  for (const kinkId of kinkIds) {
    partner.kinkProgress[kinkId] = (partner.kinkProgress[kinkId] || 0) + amount;
    // Check if kink triggered
    const kinkDef = getKinkById(kinkId);
    if (kinkDef && partner.kinkProgress[kinkId] >= kinkDef.attachmentCondition.requiredCount) {
      if (!partner.satisfiedKinkIds.includes(kinkId)) {
        partner.satisfiedKinkIds.push(kinkId);
        sceneState.kinkTriggered = true; // Mark for satisfaction bonus
      }
    }
  }
}
```

---

### Über Engine Function

```ts
type IntimacyIntent =
  | { type: "START_SCENE"; partnerActorId: string; sceneStartReason: SceneStartReason; rngSeed: string }
  | { type: "PROCESS_TURN"; actionIds: string[] }
  | { type: "CHANGE_POSITION"; newPositionId: string }
  | { type: "END_SCENE"; endReason: SceneEndReason }
  | { type: "SELECT_RESPONSE" };

function intimacyEngine(
  gameState: GameState,
  intent: IntimacyIntent,
  sceneState?: IntimateEncounterRuntimeState,
  rngSeed?: string
): {
  gameState: GameState;
  sceneState?: IntimateEncounterRuntimeState;
  log: string[];
  sexualResponse?: SexualResponseLineDef;
} {
  switch (intent.type) {
    case "START_SCENE":
      return startIntimateEncounter(gameState, intent.partnerActorId, intent.sceneStartReason, intent.rngSeed);
    case "PROCESS_TURN":
      if (!sceneState) throw new Error("No active scene state.");
      return processIntimateTurn(sceneState, { actionIds: intent.actionIds }, gameState);
    case "CHANGE_POSITION":
      if (!sceneState) throw new Error("No active scene state.");
      changePosition(sceneState, intent.newPositionId, gameState);
      return { gameState, sceneState, log: [] };
    case "END_SCENE":
      if (!sceneState) throw new Error("No active scene state.");
      return { gameState: concludeIntimateScene(sceneState, intent.endReason, gameState), log: [] };
    case "SELECT_RESPONSE":
      // needs context and repository from game state / seed data
      const context = buildSexualResponseContext(gameState, sceneState!);
      const repository = getSexualResponseRepository();
      const response = selectAndComposeSexualResponse(context, repository);
      return { gameState, sceneState, log: [], sexualResponse: response };
    default:
      return { gameState, log: [] };
  }
}
```

This updated engine now fully supports the new state-driven mechanics.
---

## 3. Relationship Engine

**Purpose:** Apply relationship changes and resolve status.

### Granular Mechanics
- **Trust/Love updates:** Applied by interactions (Gift, Flirt, Touch, dialogue).
- **Relationship status:** Resolved on demand via `resolveRelationshipStatus`.
- **Daily limits:** `flirtUsesRemainingToday` and `touchUsesRemainingToday` decrement; reset at day-end.
- **Move-in:** Checked via `canMoveIn`.

### Main Engine Functions
```ts
// Process a relationship-affecting interaction.
function processRelationshipInteraction(
  actor: CharacterActorState,
  target: CharacterActorState & { trustLove: TrustLoveState; flirtUsesRemainingToday?: number; touchUsesRemainingToday?: number },
  action: InteractionAction,
  itemDef?: ItemDef
): void

// Reset daily interaction counters for all actors.
function resetDailyInteractionCounters(gameState: GameState): GameState
```

### Supporting Functions
```ts
resolveRelationshipStatus(...)
applyGift(...)
applyFlirt(...)
applyTouch(...)
canMoveIn(...)
```

### Über Engine Function
```ts
// Single entry point for any relationship intent (gift, flirt, touch, talk).
function relationshipEngine(
  gameState: GameState,
  intent: RelationshipIntent,
  itemId?: string
): GameState
```

---

## 4. Reputation Engine

**Purpose:** Manage reputation score changes and decay.

### Granular Mechanics
- **Score changes:** Applied by quests, defeat outcomes, story events.
- **Decay:** At day-end, negative score moves toward zero by up to 15.
- **Bounty:** Computed live; payoff at BountyOffice.

### Main Engine Functions
```ts
// Apply a reputation delta to a region.
function applyReputationChange(
  gameState: GameState,
  region: Region,
  delta: number
): GameState

// Process day-end reputation decay.
function processReputationDecay(gameState: GameState): GameState
```

### Supporting Functions
```ts
applyReputationDelta(...)
decayReputation(...)
calculateBountyPayoff(...)
isWanted(...)
```

### Über Engine Function
```ts
// Single entry point for any reputation change or decay.
function reputationEngine(
  gameState: GameState,
  intent: ReputationIntent,
  region?: Region,
  delta?: number
): GameState
```

---
Below is the updated **Quest Engine** spec, with cutscene orchestration, companion quest gating, and chapter progression integrated.

---

## 5. Quest Engine

**Purpose:** Manage quest lifecycle, chapter progression, cutscene sequencing, and companion quest stage advancement.

### Granular Mechanics

- **Quest availability:** Checked via `prerequisiteFlags`, Trust/Love thresholds, companion quest stage, and repeatable cooldown.
- **Companion quest discovery:** Starter companion quests can be `availableOnQuestBoard: true` and appear on the regional `QuestBoard`. Later stages require talking directly to the companion.
- **Cutscene orchestration:** Before a chapter’s quest activates, `cutsceneTriggerId` plays. After the quest completes, `aftermathCutsceneId` plays.
- **Objective progress:** Updated by game events (`kill`, `collect`, `talk`, `interact`, `escort`, `travel`).
- **Completion:** Applies gold, XP, reputation, item rewards; increments companion `questStage`; applies `companionTrustDelta` / `companionLoveDelta`; sets story flags.
- **Read model:** `getQuestLogView` builds active, available, and completed quests for the UI.
- **Repeatable quests:** Cooldown tracked via `lastCompletedAtGameDate` and `cooldownHours`.
- **Main quest chapters:** `activeMainQuestChapterId` tracks progress. Completing a chapter sets its story flag and unlocks the next chapter/region.

---

### Main Engine Functions

```ts
// Start a quest (if available).
function startQuest(
  gameState: GameState,
  questId: string
): { gameState: GameState; cutsceneId?: string }

// Process a quest-related event (kill, collect, talk, etc.).
function handleQuestEvent(
  gameState: GameState,
  eventType: QuestObjectiveType,
  targetId: string,
  count: number,
  currentLocationId?: string
): GameState

// Complete a quest if objectives are met.
function completeQuestIfReady(
  gameState: GameState,
  questId: string
): { gameState: GameState; aftermathCutsceneId?: string }

// Advance to the next chapter after a chapter's quest(s) are complete.
function tryAdvanceChapter(
  gameState: GameState,
  chapterId: string
): { gameState: GameState; cutsceneId?: string; aftermathCutsceneId?: string }

// Start a chapter (plays cutsceneTriggerId and activates its associated quests).
function startChapter(
  gameState: GameState,
  chapterId: string
): { gameState: GameState; cutsceneId?: string }

// End a chapter (plays aftermathCutsceneId and sets completion flags).
function endChapter(
  gameState: GameState,
  chapterId: string
): { gameState: GameState; aftermathCutsceneId?: string }
```

---

### Supporting Functions

```ts
areObjectivesComplete(questDef, runtime): boolean

updateObjectiveProgress(runtime, objectiveId, amount): void

completeQuest(gameState, questDef, runtime): GameState

incrementCompanionStage(gameState, companionId): void

getQuestLogView(gameState): QuestLogView

isRepeatableQuestAvailable(questDef, runtime, currentDate): boolean

isQuestAvailable(gameState, questDef): boolean

getCompanionQuestState(
  gameState,
  companionId
): "NONE" | "AVAILABLE" | "IN_PROGRESS" | "TURN_IN_READY"

getAvailableCompanionQuests(
  gameState,
  region
): QuestDef[]

getBoardQuests(gameState, region): QuestDef[]

applyQuestRewards(gameState, questDef): GameState

applyCompanionQuestEffects(
  gameState,
  questDef,
  companionId
): GameState

getCurrentChapter(gameState, actNumber): ChapterDef | null

getNextChapter(gameState, chapterId): ChapterDef | null

getCutsceneById(cutsceneId: string): CutsceneDef | null

getCutsceneStartingSceneId(cutsceneId: string): string
```

---

### Über Engine Function

```ts
// Single entry point for any quest-related intent.
// Intents: START_QUEST, COMPLETE_QUEST, QUEST_EVENT, START_CHAPTER,
// ADVANCE_CHAPTER, GET_QUEST_LOG, GET_BOARD_QUESTS,
// GET_COMPANION_QUEST_STATE, PLAY_CUTSCENE, END_CUTSCENE.
function questEngine(
  gameState: GameState,
  intent: QuestIntent,
  data?: any
): {
  gameState: GameState;
  cutsceneId?: string;
  aftermathCutsceneId?: string;
  questLog?: QuestLogView;
  boardQuests?: QuestDef[];
  companionQuestState?: "NONE" | "AVAILABLE" | "IN_PROGRESS" | "TURN_IN_READY";
}
```

---

### Cutscene and Quest Flow

The Quest Engine orchestrates cutscene playback and quest activation:

1. **Start Chapter**
   - Load `ChapterDef`.
   - Play `cutsceneTriggerId` via the Dialogue/Cutscene engine.
   - After cutscene ends, activate `associatedQuestIds`.
   - Set `activeMainQuestChapterId` accordingly.

2. **Quest Objectives**
   - Track via `QuestRuntimeState.objectiveProgress`.

3. **Chapter Completion**
   - When all associated quests are `Completed`, call `tryAdvanceChapter`.
   - `endChapter` plays `aftermathCutsceneId`.
   - Set `completionStoryFlag` and unlock next region if specified.

4. **Companion Quests**
   - The first quest may be board-visible.
   - Later quests require direct companion interaction and Trust/Love gates.
   - On completion, increment `questStage`, apply trust/love deltas, and set the next quest’s availability.

This makes the Quest Engine the central progression manager, with clear cutscene integration.
---

## 6. Calendar & Time Engine

**Purpose:** Manage time flow and day-end processing.

### Granular Mechanics
- **Phase advance:** Triggered by action counter (15) or direct events.
- **Day-end:** When Midnight phase advance fires, run reputation decay, pregnancy birth checks, NPC population refresh, crafting/construction tick, date increment, phase to Morning.
- **Sleep:** Special action; skips to Morning, resets fatigue, restores all.
- **Fatigue:** Computed multiplier from `daysSinceLastSleep`.
- **Passive regen:** On non-sleep phase advance, +20% stamina/CPW.

### Main Engine Functions
```ts
// Process one action taken by the player (counts toward phase advance).
function recordPlayerAction(gameState: GameState): GameState

// Advance the phase (either action counter or direct event).
function advancePhase(gameState: GameState, reason: PhaseAdvanceReason): GameState

// Process the full day-end sequence.
function processDayEnd(gameState: GameState): GameState

// Execute the Sleep action.
function executeSleep(gameState: GameState, location: LocationDef): GameState
```

### Supporting Functions
```ts
applyFatiguePenalties(...)
applyPassiveRegen(...)
```

### Über Engine Function
```ts
// Single entry point for any time-related intent (action, sleep, advance).
function timeEngine(
  gameState: GameState,
  intent: TimeIntent,
  data?: any
): GameState
```

---

## 7. Economy & Inventory Engine

**Purpose:** Manage items, gold, and transactions.

### Granular Mechanics
- **Inventory operations:** Add, remove, stack, transfer.
- **Buy/sell:** Price formulas.
- **Gifting:** Consumes item, applies relationship effects.
- **Overflow:** Manual pickup rejected; combat loot auto-converts to gold.

### Main Engine Functions
```ts
// Process a buy transaction.
function processBuy(
  gameState: GameState,
  itemId: string,
  quantity: number,
  vendor: ServiceNpcDef
): GameState

// Process a sell transaction.
function processSell(
  gameState: GameState,
  inventorySlotIndex: number,
  quantity: number
): GameState

// Process a gift.
function processGift(
  gameState: GameState,
  targetId: string,
  itemId: string
): GameState

// Process a pickup from the world.
function processPickup(
  gameState: GameState,
  itemId: string,
  quantity: number
): GameState

// Process combat loot (auto-convert overflow).
function processCombatLoot(
  gameState: GameState,
  loot: { gold: number; items: { itemId: string; quantity: number }[] }
): GameState
```

### Supporting Functions
```ts
addItemToInventory(...)
removeItemFromInventory(...)
buyItem(...)
sellItem(...)
giftItem(...)
transferItem(...)
```

### Über Engine Function
```ts
// Single entry point for any economy/inventory intent (buy, sell, gift, pickup, loot).
function economyEngine(
  gameState: GameState,
  intent: EconomyIntent,
  data?: any
): GameState
```

---

## 8. Crafting & Equipment Upgrade Engine

**Purpose:** Create items and upgrade equipment.

### Granular Mechanics
- **Crafting:** Check skill+location, consume materials, start timer if needed.
- **Day-end crafting resolution:** Complete pending crafting jobs.
- **Upgrading:** Check skill+location+item, spend materials/gold, roll bonus.

### Main Engine Functions
```ts
// Start a crafting job.
function startCraftingJob(
  gameState: GameState,
  recipeId: string
): GameState

// Resolve all pending crafting jobs at day-end.
function resolveCraftingJobs(
  gameState: GameState
): GameState

// Perform an equipment upgrade.
function performUpgrade(
  gameState: GameState,
  inventorySlotIndex: number,
  upgradeDefId: string,
  mode: "RANDOM" | "GUIDED",
  chosenStat?: keyof (CombatAttributes & EroticAttributes & { hp: number })
): GameState
```

### Supporting Functions
```ts
canCraft(...)
startCrafting(...)
canUpgrade(...)
performRandomUpgrade(...)
performGuidedUpgrade(...)
```

### Über Engine Function
```ts
// Single entry point for any crafting/upgrade intent.
function craftingEngine(
  gameState: GameState,
  intent: CraftingIntent,
  data?: any
): GameState
```

---

## 9. NPC Population & Simulation Engine

**Purpose:** Spawn, despawn, manage, and resolve locations for generic NPCs, companions, service NPCs, and child NPCs.

### Granular Mechanics

- **Spawn:** From `LocationPopulationDef` ranges and `ProcNpcClassDef` templates.
- **Gender:** Rolled from `ProcNpcClassDef.genderWeight`.
- **Individuation:** First `Talk` triggers naming, `hasBeenIntroduced`, and Contact List addition.
- **Refresh:** At day-end, respawn random generic NPCs per `refreshIntervalGameDays`.
- **Schedules:** Generic NPCs and companions follow `NpcScheduleDef` / `CompanionScheduleDef`.
- **Presence resolution:** A schedule entry can be a concrete `LocationDef.id` or the special token `"HOME"`.
  - For companions:
    - If `movedIn: false`, `"HOME"` resolves to `CompanionDef.homeLocationId`.
    - If `movedIn: true`, `"HOME"` resolves to `assignedSuiteId` or `vv_ardor_manor`.
  - For generic NPCs:
    - If `movedIn: false`, `"HOME"` resolves to `WorldNpcInstance.homeLocationId`.
    - If `movedIn: true`, `"HOME"` resolves to `assignedSuiteId` or `vv_ardor_manor`.
- **Absence:** If a phase has no entry, the NPC/companion is not interactable during that phase.
- **Child NPCs:** Use `ChildNpcClassDef.scheduleByPhase` similarly; Night/Midnight omitted by default.
- **Service NPCs:** Always present at their assigned `locationId`; no schedule resolution needed.
- **Moved-in companions:** They still follow their daytime routine, but evening returns to the Manor instead of their old home.

### Main Engine Functions

```ts
// Spawn initial NPC population for a location.
function spawnLocationPopulation(
  gameState: GameState,
  locationId: string
): GameState

// Refresh NPC population at day-end.
function refreshNpcPopulation(
  gameState: GameState,
  locationId: string
): GameState

// Individuate an NPC on first Talk.
function individuateNpc(
  gameState: GameState,
  npcInstanceId: string
): GameState

// Update all NPC and companion current locations based on schedules and day phase.
function updateScheduleLocations(
  gameState: GameState,
  newDayPhase: DayPhase
): GameState

// Resolve the current location for a generic NPC given the day phase.
function resolveNpcLocation(
  npc: WorldNpcInstance,
  npcClassDef: ProcNpcClassDef,
  dayPhase: DayPhase
): string | null

// Resolve the current location for a companion given the day phase.
function resolveCompanionLocation(
  companionDef: CompanionDef,
  companionRuntime: CompanionRuntimeState,
  dayPhase: DayPhase
): string | null

// Resolve "HOME" token to the correct location based on moved-in state.
function resolveHomeLocation(
  homeLocationId: string | undefined,
  movedIn: boolean,
  assignedSuiteId?: string
): string | null
```

### Supporting Functions

```ts
spawnWorldNpc(...)
rollGender(...)
generateAppearance(...)
rollName(...)
```

### Über Engine Function

```ts
// Single entry point for any NPC population intent.
// Handles spawn, refresh, individuation, schedule updates, and location queries.
function npcSimulationEngine(
  gameState: GameState,
  intent: NpcSimulationIntent,
  data?: any
): GameState | string | null
```

---
## 10. Updated Dialogue Engine Specification

**Purpose:** Traverse dialogue trees and compose dynamic sexual responses for intimate scenes.

---

### Granular Mechanics

- **Tree traversal:** Starting from root nodes, filter by conditions. Player selects response; next node resolved.
- **Generic NPC introduction:** First Talk forces introduction node; sets `hasBeenIntroduced = true`, adds to contact list if under cap.
- **Story flags:** Set during dialogue via `setsStoryFlag`.
- **Node filtering by type:** `getDialogueNodesByType` filters nodes by `DialogueNodeType`.
- **Sexual response composition:** The dialogue engine can construct a `SexualResponseLineDef` from a `SexualResponseRepository` using a `SexualResponseSelectionContext`. This is used by the intimacy engine when it needs partner reactions during intimate actions.

---

### Schema Dependencies

- `DialogueNodeDef`, `DialogueCondition`, `DialogueNodeType`
- `CharacterDialogueTreeDef`, `GenericNpcDialogueSetDef`
- `SexualResponseFragmentDef`, `SexualResponseRepository`, `SexualResponseLineDef`
- `SexualResponseSelectionContext` (contains `IntimateEncounterRuntimeState`, `PositionDef`, `IntimateActionDef[]`, actors, rng seed)
- `GameState`

---

### Main Engine Functions (with definitions)

#### `startDialogue(gameState: GameState, targetId: string): { gameState: GameState; currentNodeId: string }`

**Definition:**  
Initiates a dialogue session with a target actor. It resolves the target’s dialogue tree (companion, generic NPC, or named story character). If the target is a generic NPC and `hasBeenIntroduced` is `false`, the engine calls `handleGenericNpcIntroduction` first (which sets the introduction node as the current node). Otherwise, it evaluates root nodes against current game state and returns the first eligible root node.

**Logic:**
1. Look up target actor and its associated dialogue tree (`CharacterDialogueTreeDef` or `GenericNpcDialogueSetDef`).
2. If generic NPC and `!hasBeenIntroduced`, set `currentNodeId = introductionNodeId` (if present) and apply introduction effects (set flag, add to contacts).
3. Else, call `getEligibleRootNodes` with the tree and `gameState`, pick the first (or most appropriate) eligible root node.
4. Return `{ gameState, currentNodeId }`.

#### `getDialogueNodesByType(tree: CharacterDialogueTreeDef | GenericNpcDialogueSetDef, nodeType: DialogueNodeType, gameState: GameState): DialogueNodeDef[]`

**Definition:**  
Returns all nodes in the tree that match the given `nodeType` and whose conditions are satisfied by `gameState`.

**Logic:**
1. Collect all node IDs from tree (root nodes and any reachable nodes).
2. For each node, fetch `DialogueNodeDef` and check `node.nodeType === nodeType`.
3. Filter by `evaluateDialogueConditions(node.conditions, gameState)`.
4. Return matching nodes.

#### `continueDialogue(gameState: GameState, currentNodeId: string, responseIndex: number): { gameState: GameState; nextNodeId: string | null }`

**Definition:**  
Processes a player’s choice at a dialogue node. It resolves the selected response to its next node, applies any story flag set by the current node, and returns the updated state and the next node ID.

**Logic:**
1. Retrieve current node by `currentNodeId`.
2. If `responseIndex` is out of range, return error or stay on same node.
3. Apply any `setsStoryFlag` from current node to `gameState.storyFlags`.
4. Get `nextNodeId = current.responseOptionIds[responseIndex]`.
5. If `nextNodeId` is null or empty, end dialogue (apply any pending effects). Otherwise, return `{ gameState, nextNodeId }`.

#### `endDialogue(gameState: GameState): GameState`

**Definition:**  
Ends the dialogue session. Applies any pending effects (e.g., daily interaction counters, trust/love changes from dialogue if any) and returns updated state. Usually just returns the gameState with no dialogue-specific state stored.

#### `selectSexualResponse(context: SexualResponseSelectionContext, repository: SexualResponseRepository): SexualResponseLineDef`

**Definition:**  
Given a scene context and the response repository, selects the most appropriate sexual response fragment and composes it into a `SexualResponseLineDef`.

**Logic:**
1. Determine pool: use `repository.npcCommon` if partner is a generic NPC, else `repository.mainSideCommon`.
2. Filter pool by `isFragmentEligible(fragment, context)`.
3. Sort eligible fragments by `priority` descending.
4. Among top-priority fragments, choose one deterministically using `context.rngSeed` (e.g., hash seed and pick index).
5. Call `composeSexualResponse(chosenFragment, context)` to produce final line.

#### `composeSexualResponse(fragment: SexualResponseFragmentDef, context: SexualResponseSelectionContext): SexualResponseLineDef`

**Definition:**  
Fills the chosen fragment’s templates with runtime values from the context, producing a concrete `SexualResponseLineDef`.

**Logic:**
1. Build variable map:
   - `partnerName`: `context.partnerActor.displayName ?? "she"`
   - `playerName`: `context.playerActor.displayName ?? "you"`
   - `actionName`: `context.lastAction?.name ?? "action"`
   - `positionName`: `context.currentPosition.name`
2. Replace placeholders in `textTemplate`, `vocalizationTemplate`, `internalThoughtTemplate`, `bodyResponseTemplate`, `expressionTemplate`.
3. Return `SexualResponseLineDef` with `id = fragment.id + "_" + context.rngSeed`.

---

### Supporting Functions (with definitions)

#### `evaluateDialogueConditions(conditions: DialogueCondition[], gameState: GameState): boolean`

**Definition:**  
Checks whether all given dialogue conditions are satisfied by current game state.

**Logic:**
- For each condition:
  - `TRUST_AT_LEAST`: requires target trust (if any) >= value.
  - `LOVE_AT_LEAST`: requires target love >= value.
  - `QUEST_STAGE_AT_LEAST`: requires companion questStage >= value.
  - `STORY_FLAG_SET`: `gameState.storyFlags[value] === true`.
  - `STORY_FLAG_UNSET`: `!gameState.storyFlags[value]`.
  - `FIRST_TALK`: `!target.hasBeenIntroduced` (for generic NPCs).
- If any condition fails, return false. Otherwise true.

#### `getEligibleRootNodes(tree: CharacterDialogueTreeDef | GenericNpcDialogueSetDef, gameState: GameState): DialogueNodeDef[]`

**Definition:**  
Returns all root nodes from the tree whose conditions are met.

**Logic:**
1. Fetch all node IDs in `tree.rootNodeIds`.
2. For each, get node and check `evaluateDialogueConditions`.
3. Return eligible nodes.

#### `getNodeById(nodeId: string, tree: CharacterDialogueTreeDef | GenericNpcDialogueSetDef): DialogueNodeDef | null`

**Definition:**  
Retrieves a `DialogueNodeDef` by its ID from the tree or from the global dialogue node store. Implementation depends on how nodes are stored; likely from an array in seed data. This function is used internally.

#### `handleGenericNpcIntroduction(gameState: GameState, targetId: string): GameState`

**Definition:**  
Marks a generic NPC as introduced, assigns them a name if needed, and adds them to the contact list if under `CONTACT_CAP`.

**Logic:**
1. Find `WorldNpcInstance` by `targetId`.
2. Set `hasBeenIntroduced = true`.
3. If `displayName` is missing, assign a generated name (from name pools).
4. If contact list length < `CONTACT_CAP`, add an entry.
5. Return updated `gameState`.

#### `isFragmentEligible(fragment: SexualResponseFragmentDef, context: SexualResponseSelectionContext): boolean`

**Definition:**  
Checks if a sexual response fragment’s `triggerContext` matches the current scene.

**Logic:**
- Extract `t = fragment.triggerContext`.
- If `t.actionCategory`, ensure at least one active action has that category.
- If `t.positionId`, ensure `context.currentPosition.id === t.positionId`.
- If `t.arousalStateMin`, compute partner arousal state from `context.partnerActor.vitals.currentArousal` using `AROUSAL_STATE_THRESHOLDS`; check if current state >= min.
- If `t.ledBy`, ensure `context.lastAction?.ledBy === t.ledBy` (or if no last action, maybe default player).
- If `t.climaxType`, ensure `context.sceneState.partnerClimaxType === t.climaxType`.
- If `t.squirtingMilk` is defined, ensure `context.sceneState.partnerSquirtingMilk === t.squirtingMilk`.
- If `t.bodyPartTarget`, ensure at least one active action occupies that body part.
- Return true if all checks pass.

#### `getArousalState(value: number): ArousalState`

**Definition:**  
Maps a numeric arousal value (0–100) to an `ArousalState` using the thresholds defined in `AROUSAL_STATE_THRESHOLDS`.

**Logic:**  
Iterate thresholds and return the state whose range contains `value`.

---

### Über Engine Function

```ts
function dialogueEngine(
  gameState: GameState,
  intent: DialogueIntent,
  data?: any
): { gameState: GameState; currentNodeId?: string; sexualResponse?: SexualResponseLineDef }
```

**Intents:**
- `START_DIALOGUE` — calls `startDialogue`.
- `CONTINUE_DIALOGUE` — calls `continueDialogue` with `data.currentNodeId` and `data.responseIndex`.
- `END_DIALOGUE` — calls `endDialogue`.
- `GET_NODES_BY_TYPE` — calls `getDialogueNodesByType` with `data.tree`, `data.nodeType`.
- `SELECT_SEXUAL_RESPONSE` — calls `selectSexualResponse` with `data.context` and `data.repository`, returns composed `sexualResponse`.

**Definition:**  
Single entry point for any dialogue-related intent. It dispatches to the appropriate main function, returning updated game state and any requested data (current node ID, node list, or sexual response line). This keeps the API unified and simplifies server-side intent handling.
You're right — I listed `selectSexualResponse` but didn't include the exact `selectAndComposeSexualResponse` / `isFragmentEligible` / `composeResponse` functions you provided. Here is the corrected **Dialogue Engine** section with all functions fully defined, integrated into the engine spec.

---
## Updated Dialogue Engine Specification

**Purpose:** Traverse dialogue trees and compose dynamic sexual response lines from the component-based response repository.

---

### Granular Mechanics

- **Tree traversal:** Starting from root nodes, filter by conditions. Player selects response; next node resolved.
- **Generic NPC introduction:** First Talk forces introduction node; sets `hasBeenIntroduced = true`, adds to contact list if under cap.
- **Story flags:** Set during dialogue via `setsStoryFlag`.
- **Node filtering by type:** `getDialogueNodesByType` filters nodes by `DialogueNodeType`.
- **Sexual response composition:** The dialogue engine composes a final `SexualResponseLineDef` by selecting and assembling individual components from a repository. Components include:
  - **Body response** — depends on high-level action group.
  - **Vocalization + expression** — depends on arousal state, climax type, resistance, mental state, mood, and forced flag.
  - **Internal thought** — depends on the set of active actions.
  - **Main text** — depends on the last action ID and position ID.
  - **Continuation text** — appended for each additional simultaneous action.
- **Repository structure:** The `SexualResponseRepository` contains separate arrays for each component, split into `mainSideCommon` and `npcCommon` pools.

---

### Schema Dependencies

- `DialogueNodeDef`, `DialogueCondition`, `DialogueNodeType`
- `CharacterDialogueTreeDef`, `GenericNpcDialogueSetDef`
- `SexualResponseRepository` (with component arrays)
- `BodyResponseFragmentDef`, `VocalExpressionFragmentDef`, `InternalThoughtFragmentDef`, `TextFragmentDef`, `ContinuationTextFragmentDef`
- `SexualResponseSelectionContext` (contains `lastAction`, `additionalActions`, `sceneState`, `currentPosition`, actors, rngSeed)
- `AROUSAL_STATE_THRESHOLDS`
- `GameState`

---

### Main Engine Functions

```ts
// Start a dialogue with a target.
function startDialogue(
  gameState: GameState,
  targetId: string
): { gameState: GameState; currentNodeId: string }

// Return all nodes of a given type whose conditions are met.
function getDialogueNodesByType(
  tree: CharacterDialogueTreeDef | GenericNpcDialogueSetDef,
  nodeType: DialogueNodeType,
  gameState: GameState
): DialogueNodeDef[]

// Continue dialogue by selecting a response.
function continueDialogue(
  gameState: GameState,
  currentNodeId: string,
  responseIndex: number
): { gameState: GameState; nextNodeId: string | null }

// End dialogue and apply any pending effects.
function endDialogue(
  gameState: GameState
): GameState

// Compose a sexual response line from the component repository and scene context.
function selectAndComposeSexualResponse(
  context: SexualResponseSelectionContext,
  repository: SexualResponseRepository
): SexualResponseLineDef
```

---

### Supporting Functions

```ts
evaluateDialogueConditions(...)
getEligibleRootNodes(...)
getNodeById(...)
handleGenericNpcIntroduction(...)

isBodyResponseEligible(...)
isVocalExpressionEligible(...)
isInternalThoughtEligible(...)
isTextEligible(...)
buildContinuations(...)
mapActionCategoryToGroup(...)
buildTemplateVars(...)
fillTemplate(...)
rollAmongTop(...)
selectFragment(...)
getArousalState(...)
```

---

### Function Definitions

#### `startDialogue(gameState, targetId)`

Initiates dialogue with the target.  
If target is a generic NPC and `hasBeenIntroduced` is false, call `handleGenericNpcIntroduction` and use the introduction node. Otherwise, return the first eligible root node.

```ts
function startDialogue(gameState: GameState, targetId: string): { gameState: GameState; currentNodeId: string } {
  const tree = getDialogueTreeForTarget(gameState, targetId);
  if (isGenericNpc(targetId) && !gameState.worldNpcs[targetId].hasBeenIntroduced) {
    gameState = handleGenericNpcIntroduction(gameState, targetId);
    return { gameState, currentNodeId: tree.introductionNodeId! };
  }
  const eligibleRoots = getEligibleRootNodes(tree, gameState);
  return { gameState, currentNodeId: eligibleRoots[0].id };
}
```

#### `getDialogueNodesByType(tree, nodeType, gameState)`

Filters all nodes in the tree by `nodeType` and satisfied conditions.

```ts
function getDialogueNodesByType(
  tree: CharacterDialogueTreeDef | GenericNpcDialogueSetDef,
  nodeType: DialogueNodeType,
  gameState: GameState
): DialogueNodeDef[] {
  return getAllNodes(tree)
    .filter(node => node.nodeType === nodeType)
    .filter(node => evaluateDialogueConditions(node.conditions, gameState));
}
```

#### `continueDialogue(gameState, currentNodeId, responseIndex)`

Applies story flags from the current node and returns the next node.

```ts
function continueDialogue(
  gameState: GameState,
  currentNodeId: string,
  responseIndex: number
): { gameState: GameState; nextNodeId: string | null } {
  const node = getNodeById(currentNodeId);
  if (!node || responseIndex >= node.responseOptionIds.length) {
    return { gameState, nextNodeId: currentNodeId }; // stay on same node
  }
  if (node.setsStoryFlag) {
    gameState.storyFlags[node.setsStoryFlag] = true;
  }
  const nextNodeId = node.responseOptionIds[responseIndex] ?? null;
  return { gameState, nextNodeId };
}
```

#### `endDialogue(gameState)`

Returns the gameState with any pending dialogue effects applied. In most cases this is a no-op because effects are applied immediately.

```ts
function endDialogue(gameState: GameState): GameState {
  return gameState;
}
```

#### `selectAndComposeSexualResponse(context, repository)`

Selects and assembles a full sexual response line from component fragments.

```ts
function selectAndComposeSexualResponse(
  context: SexualResponseSelectionContext,
  repository: SexualResponseRepository
): SexualResponseLineDef {
  const pool = context.sceneState.partnerActorId.startsWith("npc_")
    ? repository.npcCommon
    : repository.mainSideCommon;

  // 1. Select body response
  const bodyFragment = selectFragment(
    pool.bodyResponses,
    fragment => isBodyResponseEligible(fragment, context)
  );

  // 2. Select vocalization + expression
  const vocalFragment = selectFragment(
    pool.vocalExpressions,
    fragment => isVocalExpressionEligible(fragment, context)
  );

  // 3. Select internal thought
  const internalFragment = selectFragment(
    pool.internalThoughts,
    fragment => isInternalThoughtEligible(fragment, context)
  );

  // 4. Select main text (based on lastAction and position)
  const textFragment = selectFragment(
    pool.texts,
    fragment => isTextEligible(fragment, context)
  );

  // 5. Build continuation lines for each additional simultaneous action
  const continuations = buildContinuations(context, pool.continuations);

  const vars = buildTemplateVars(context);

  const text = fillTemplate(textFragment.textTemplate, vars) + continuations;

  return {
    id: `${textFragment.id}_${context.rngSeed}`,
    text,
    vocalization: fillTemplate(vocalFragment.vocalizationTemplate, vars),
    internalThought: internalFragment
      ? fillTemplate(internalFragment.internalThoughtTemplate, vars)
      : undefined,
    bodyResponse: fillTemplate(bodyFragment.bodyResponseTemplate, vars),
    expression: fillTemplate(vocalFragment.expressionTemplate, vars),
  };
}
```

#### `isBodyResponseEligible(fragment, ctx)`

Checks if a body response fragment matches the current action group and arousal range.

```ts
function isBodyResponseEligible(
  fragment: BodyResponseFragmentDef,
  ctx: SexualResponseSelectionContext
): boolean {
  const actionGroup = mapActionCategoryToGroup(ctx.lastAction?.category);
  if (fragment.actionGroup !== actionGroup) return false;

  // Arousal range checks (existing)
  if (fragment.arousalStateMin) { ... }
  if (fragment.arousalStateMax) { ... }

  // NEW: forced check
  if (fragment.isForced !== undefined && ctx.sceneState.isForced !== fragment.isForced) return false;

  // NEW: resistance range checks
  if (fragment.resistanceMin !== undefined) {
    const resistance = ctx.sceneState.partnerResistance ?? 0;
    if (resistance < fragment.resistanceMin) return false;
  }
  if (fragment.resistanceMax !== undefined) {
    const resistance = ctx.sceneState.partnerResistance ?? 0;
    if (resistance > fragment.resistanceMax) return false;
  }

  return true;
}
```

#### `isVocalExpressionEligible(fragment, ctx)`

Checks if a vocal/expression fragment matches the current scene state (arousal, climax, resistance, mental state, mood, forced).

```ts
function isVocalExpressionEligible(
  fragment: VocalExpressionFragmentDef,
  ctx: SexualResponseSelectionContext
): boolean {
  const arousal = ctx.partnerActor.vitals.currentArousal;
  const arousalState = getArousalState(arousal);

  const minArousal = AROUSAL_STATE_THRESHOLDS[fragment.arousalStateMin][0];
  if (arousal < minArousal) return false;
  if (fragment.arousalStateMax) {
    const maxArousal = AROUSAL_STATE_THRESHOLDS[fragment.arousalStateMax][1];
    if (arousal > maxArousal) return false;
  }

  if (fragment.climaxType && ctx.sceneState.partnerClimaxType !== fragment.climaxType) return false;
  if (fragment.resistanceMin !== undefined) {
    const resistance = ctx.sceneState.partnerResistance ?? 0;
    if (resistance < fragment.resistanceMin) return false;
  }
  if (fragment.resistanceMax !== undefined) {
    const resistance = ctx.sceneState.partnerResistance ?? 0;
    if (resistance > fragment.resistanceMax) return false;
  }
  if (fragment.mentalState && ctx.sceneState.partnerMentalState !== fragment.mentalState) return false;
  if (fragment.isForced !== undefined && ctx.sceneState.isForced !== fragment.isForced) return false;

  return true;
}
```

#### `isInternalThoughtEligible(fragment, ctx)`

Checks if an internal thought fragment matches the active action categories.

```ts
function isInternalThoughtEligible(
  fragment: InternalThoughtFragmentDef,
  ctx: SexualResponseSelectionContext
): boolean {
  const activeCategories = new Set(ctx.activeActions.map(a => a.category));
  const required = new Set(fragment.triggerActionCategories);

  if (fragment.exactMatch) {
    return (
      activeCategories.size === required.size &&
      [...required].every(cat => activeCategories.has(cat))
    );
  } else {
    return [...required].every(cat => activeCategories.has(cat));
  }
}
```

#### `isTextEligible(fragment, ctx)`

Checks if a main text fragment matches the last action ID and position ID.

```ts
function isTextEligible(
  fragment: TextFragmentDef,
  ctx: SexualResponseSelectionContext
): boolean {
  if (!ctx.lastAction || fragment.lastActionId !== ctx.lastAction.id) return false;
  if (fragment.positionId !== ctx.currentPosition.id) return false;
  // Optional arousal range
  if (fragment.arousalStateMin) {
    const arousal = ctx.partnerActor.vitals.currentArousal;
    if (arousal < AROUSAL_STATE_THRESHOLDS[fragment.arousalStateMin][0]) return false;
  }
  if (fragment.arousalStateMax) {
    const arousal = ctx.partnerActor.vitals.currentArousal;
    if (arousal > AROUSAL_STATE_THRESHOLDS[fragment.arousalStateMax][1]) return false;
  }
  return true;
}
```

#### `buildContinuations(ctx, continuationPool)`

Builds a string of additional lines for each simultaneous action (excluding last action).

```ts
function buildContinuations(
  ctx: SexualResponseSelectionContext,
  continuationPool: ContinuationTextFragmentDef[]
): string {
  const lastActionId = ctx.lastAction?.id;
  const additionalActions = ctx.additionalActions;

  let result = "";
  for (const action of additionalActions) {
    const fragment = selectFragment(
      continuationPool,
      f => f.actionId === action.id
    );
    if (fragment) {
      result += "\n" + fillTemplate(fragment.continuationTemplate, buildTemplateVars(ctx));
    }
  }
  return result;
}
```

#### `mapActionCategoryToGroup(category)`

Maps an `IntimateActionCategory` to a high-level body response group.

```ts
function mapActionCategoryToGroup(category: IntimateActionCategory | undefined): BodyResponseFragmentDef["actionGroup"] {
  switch (category) {
    case IntimateActionCategory.PenetrativeVaginal:
    case IntimateActionCategory.PenetrativeAnal:
      return "PENETRATIVE";
    case IntimateActionCategory.OralMaleFocused:
    case IntimateActionCategory.OralFemaleFocused:
      return "ORAL";
    case IntimateActionCategory.Breast:
    case IntimateActionCategory.Lactation:
    case IntimateActionCategory.BreastToy:
      return "BREAST";
    case IntimateActionCategory.SkinTouch:
      return "SKIN";
    case IntimateActionCategory.HardcoreDominance:
    case IntimateActionCategory.HardcoreRoughness:
    case IntimateActionCategory.HardcoreImpact:
      return "IMPACT";
    case IntimateActionCategory.ToyVibrator:
    case IntimateActionCategory.ToyPaddleWhip:
    case IntimateActionCategory.ToyClampsPressure:
    case IntimateActionCategory.ToyBondage:
      return "TOY";
    case IntimateActionCategory.Fingering:
      return "FINGERING";
    case IntimateActionCategory.Climax:
      return "CLIMAX";
    default:
      return "SKIN";
  }
}
```

#### `buildTemplateVars(ctx)`

Builds a dictionary of variables for placeholder replacement.

```ts
function buildTemplateVars(ctx: SexualResponseSelectionContext) {
  return {
    partnerName: ctx.partnerActor.displayName ?? "she",
    playerName: ctx.playerActor.displayName ?? "you",
    actionName: ctx.lastAction?.name ?? "action",
    positionName: ctx.currentPosition.name,
  };
}
```

#### `fillTemplate(template, vars)`

Replaces `{placeholder}` tokens in a template string.

```ts
function fillTemplate(
  template: string,
  vars: Record<string, string>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}
```

#### `rollAmongTop(fragments, rngSeed)`

Deterministically selects one fragment from the highest-priority group.

```ts
function rollAmongTop<T extends { priority: number }>(
  fragments: T[],
  rngSeed: string
): T {
  if (fragments.length === 0) {
    throw new Error("No eligible fragments found.");
  }

  const topPriority = fragments[0].priority;
  const topGroup = fragments.filter(f => f.priority === topPriority);

  const hash = rngSeed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return topGroup[hash % topGroup.length];
}
```

#### `selectFragment(pool, eligibilityFn)`

Filters, sorts by priority, and selects one fragment.

```ts
function selectFragment<T extends { priority: number }>(
  pool: T[],
  eligibilityFn: (fragment: T) => boolean
): T | null {
  const eligible = pool.filter(eligibilityFn);
  if (eligible.length === 0) return null;

  eligible.sort((a, b) => b.priority - a.priority);
  return rollAmongTop(eligible, "");
}
```

*Note:* The above `selectFragment` uses an empty rngSeed. In production, pass the actual rngSeed from the context. The `rollAmongTop` in the main composition uses the context rngSeed.

#### `evaluateDialogueConditions(conditions, gameState, target?)`

Returns true if all conditions pass. Now accepts optional target for trust/love/quest stage checks.

```ts
function evaluateDialogueConditions(
  conditions: DialogueCondition[],
  gameState: GameState,
  target?: CharacterActorState
): boolean {
  return conditions.every(condition => {
    switch (condition.type) {
      case "TRUST_AT_LEAST":
        return target && target.trustLove
          ? target.trustLove.trust >= (condition.value as number)
          : false;
      case "LOVE_AT_LEAST":
        return target && target.trustLove
          ? target.trustLove.love >= (condition.value as number)
          : false;
      case "QUEST_STAGE_AT_LEAST":
        return target && target.questStage
          ? target.questStage >= (condition.value as number)
          : false;
      case "STORY_FLAG_SET":
        return gameState.storyFlags[condition.value as string] === true;
      case "STORY_FLAG_UNSET":
        return !gameState.storyFlags[condition.value as string];
      case "FIRST_TALK":
        return target && target.hasBeenIntroduced !== undefined
          ? !target.hasBeenIntroduced
          : false;
      default:
        return false;
    }
  });
}
```

#### `getEligibleRootNodes(tree, gameState)`

Returns root nodes whose conditions are satisfied. Now passes the target actor for trust/love checks.

```ts
function getEligibleRootNodes(
  tree: CharacterDialogueTreeDef | GenericNpcDialogueSetDef,
  gameState: GameState
): DialogueNodeDef[] {
  // Determine target actor from tree.characterId or tree.procNpcClassId as appropriate.
  const target = getTargetActorForTree(gameState, tree);
  return tree.rootNodeIds
    .map(getNodeById)
    .filter((node): node is DialogueNodeDef => node !== null)
    .filter(node => evaluateDialogueConditions(node.conditions, gameState, target));
}
```

#### `getNodeById(nodeId)`

Returns the dialogue node for the given ID from the loaded node store.

```ts
function getNodeById(nodeId: string): DialogueNodeDef | null {
  return GLOBAL_DIALOGUE_NODE_INDEX[nodeId] ?? null;
}
```

#### `handleGenericNpcIntroduction(gameState, targetId)`

Sets introduced flag, assigns name if missing, adds to contacts.

```ts
function handleGenericNpcIntroduction(
  gameState: GameState,
  targetId: string
): GameState {
  const npc = gameState.worldNpcs[targetId];
  npc.hasBeenIntroduced = true;
  if (!npc.displayName) {
    npc.displayName = rollName(npc.gender, gameState.rngSeed);
  }
  if (getContactList(gameState).length < CONTACT_CAP) {
    addContact(gameState, npc);
  }
  return gameState;
}
```

#### `getArousalState(value)`

Maps arousal value to `ArousalState`.

```ts
function getArousalState(value: number): ArousalState {
  for (const [state, [min, max]] of Object.entries(AROUSAL_STATE_THRESHOLDS)) {
    if (value >= min && value <= max) return state as ArousalState;
  }
  return ArousalState.Unaroused;
}
```

---

### Über Engine Function

```ts
type DialogueIntent =
  | { type: "START_DIALOGUE"; targetId: string }
  | { type: "CONTINUE_DIALOGUE"; currentNodeId: string; responseIndex: number }
  | { type: "END_DIALOGUE" }
  | { type: "GET_NODES_BY_TYPE"; tree: CharacterDialogueTreeDef | GenericNpcDialogueSetDef; nodeType: DialogueNodeType }
  | { type: "SELECT_SEXUAL_RESPONSE"; context: SexualResponseSelectionContext; repository: SexualResponseRepository };

function dialogueEngine(
  gameState: GameState,
  intent: DialogueIntent
): {
  gameState: GameState;
  currentNodeId?: string;
  nodes?: DialogueNodeDef[];
  sexualResponse?: SexualResponseLineDef;
}
```

**Definition:**

Dispatches to the correct main function based on `intent.type`.

```ts
function dialogueEngine(
  gameState: GameState,
  intent: DialogueIntent
) {
  switch (intent.type) {
    case "START_DIALOGUE":
      return { gameState, ...startDialogue(gameState, intent.targetId) };
    case "CONTINUE_DIALOGUE":
      return { gameState, ...continueDialogue(gameState, intent.currentNodeId, intent.responseIndex) };
    case "END_DIALOGUE":
      return { gameState: endDialogue(gameState) };
    case "GET_NODES_BY_TYPE":
      return {
        gameState,
        nodes: getDialogueNodesByType(intent.tree, intent.nodeType, gameState),
      };
    case "SELECT_SEXUAL_RESPONSE":
      return {
        gameState,
        sexualResponse: selectAndComposeSexualResponse(intent.context, intent.repository),
      };
    default:
      return { gameState };
  }
}
```

---

This updated Dialogue Engine now fully supports the split component repository and the new state-driven filters for vocal/expression selection. It also correctly passes target context into condition evaluation.


---

This updated Dialogue Engine covers both traditional dialogue traversal and dynamic sexual response composition, fully leveraging the new schema types and repository data.
---

## 11. Skill & Ability Engine

**Purpose:** Manage skill purchases, effect resolution, passive bonuses, and combat/intimacy interactions.

### Granular Mechanics

- **Purchase:** Check that the player owns all prerequisite nodes, has enough AP (Ardor tree) or BP (Battle tree), and deducts the point cost. CPW cost is separate and only paid when the active skill is used.
- **Effect resolution:** Active skills consume CPW and apply their effect to the selected target(s). Passive skills are always active once owned and require no CPW.
- **Ownership:** `PlayerSkillState.ownedNodeIds` tracks purchased nodes. Starting skills are predefined in `PlayerCharacterDef.startingSkillNodeIds`.
- **Effect Mapping:** The engine resolves the `effect` string from `SkillNodeDef` to concrete mechanical behavior via a fixed catalog. Unknown effect keys are ignored or log a warning.
- **Ardor skills** operate during Intimate Encounters or story events.
- **Battle skills** operate during Combat Encounters.
- Some effects are **story-gated** (`Ardor’s Blessing`, `The Last Sincere Blow`) and cannot be used outside their scripted triggers.

### Main Engine Functions

```ts
// Attempt to purchase a skill node.
function purchaseSkillNode(
  gameState: GameState,
  nodeId: string
): GameState

// Use an active skill in combat or intimacy.
function useSkill(
  gameState: GameState,
  skillNodeId: string,
  targetId?: string
): GameState
```

### Supporting Functions

```ts
canPurchaseSkill(...)
purchaseSkill(...)
resolveSkillEffect(...)
```

### Über Engine Function

```ts
// Single entry point for any skill-related intent (purchase or use).
function skillEngine(
  gameState: GameState,
  intent: SkillIntent,
  data?: any
): GameState
```

---

### Ardor Skill Effect Catalog

| Effect Key | Stat / Behavior |
|---|---|
| `reveal_partner_ui` | No stat change. Reveals partner Arousal meter and state in UI. |
| `unlock_kink_encyclopedia` | No stat change. Unlocks Kink Encyclopedia UI. |
| `touch_arousal_boost` | +25% partner Arousal gain from Touch actions for current turn. |
| `midscene_trust_boost` | +5 Trust immediately during scene. |
| `clear_negative_arousal_state` | Raises partner Arousal to at least 40 if currently below. |
| `slow_self_arousal` | Passive: Kenji's own Arousal gain rate -20%. |
| `targeted_arousal_burst_20` | +20 flat partner Arousal. |
| `rhythm_arousal_burst_15` | +15 partner Arousal via rhythm change. |
| `confession_trust_love_boost` | +10 Love, +15 partner Arousal. |
| `spank_effectiveness_up` | Spank actions +50% effectiveness; no Trust penalty. |
| `apply_shivering` | Applies `Shivering` status, +15% Arousal gain, 2 turns. |
| `apply_synchronized` | Applies `Synchronized` to both parties, 3 turns. |
| `cure_trauma_debuff` | Removes `TraumaDebuff` from target NPC. |
| `deep_arousal_burst_30` | +30 partner Arousal, requires Penetrative Vaginal position. |
| `auto_pass_one_tec_check` | Passive: first TEC check each scene auto-passes. |
| `context_best_bonus` | Engine chooses best: +20 Arousal, +15 Love, or clear negative status. |
| `unlock_lactation` | Unlocks/stimulates milk flow for suitable partners. |
| `simultaneous_climax` | Sets both Kenji and partner Arousal to 100 immediately. |
| `post_scene_gain_multiplier` | Passive: post-scene Trust/Love gains ×1.5. |
| `conception_multiplier_boost` | Passive: Crest Bonus ×3; overall conception chance +35%. |
| `story_purge_ritual` | Story-gated; grants +10 to +20 Astraea Approval. |
| `lock_shared_bliss` | Locks both Arousal at 100 for remainder of scene. |
| `manor_scenes_heal_region` | Passive: every Ardor Manor scene grants +1 regional Miasma-cleansing tick. |
| `unlock_cosmic_tier_content` | Gating flag for cosmic-tier scenes. |
| `guarantee_legendary_offspring` | Passive: any resulting OffspringNpc gets legendary passive flag. |

---

### Battle Skill Effect Catalog

| Effect Key | Stat / Behavior |
|---|---|
| `basic_attack` | Standard weapon attack, no modifier. |
| `str_damage_boost_50` | +50% base damage for this attack. |
| `apply_defense_up_self` | Applies `DefenseUp` to self, +12 DEF, 2 turns. |
| `dodge_crit_passive` | Passive: +20% dodge against critical hits. |
| `holy_aoe_dispel` | AOE holy damage (WIS-scaled), strips one buff stack. |
| `apply_shield_self_70` | Shield: 70% damage reduction, 1 turn. |
| `wis_aoe_damage` | AOE damage, WIS-scaled. |
| `mark_highest_threat` | Marks highest-HP enemy; party +20% damage vs it. |
| `trigger_companion_special_now` | Immediately triggers chosen companion's special ability. |
| `apply_shield_self_100_next_hit` | Shield: 100% absorption, consumed by next hit. |
| `apply_party_attack_up` | Party Attack Up, +20%, 2 turns. |
| `low_hp_damage_reduction` | Passive: below 40% HP, incoming physical damage -15%. |
| `unlock_crafting_and_upgrades` | Passive: unlocks Crafting and Equipment Upgrades. |
| `single_target_220pct` | Single-target attack, final damage ×2.2. |
| `three_hit_escalating_combo` | 3 hits, each +25% damage if previous hit landed. |
| `apply_counter_ready` | Applies `CounterReady`, 1 turn. |
| `wis_aoe_damage_150pct` | AOE damage, WIS-scaled, ×1.5 relative to Ardent Pulse. |
| `bonus_vs_miasma_corrupted` | Single-target attack, +100% damage vs MiasmaCorrupted. |
| `auto_intercept_low_hp_companion` | Passive: auto-redirects attacks from <25% HP companion to self. |
| `self_hp_regen_per_turn` | Passive: +8 HP to self per combat turn. |
| `boss_only_wis_nuke_300pct` | Single massive holy nuke, ×3.0; boss encounters only. |
| `party_all_stats_up_20` | Passive: all party companions +20 to all CombatStats. |
| `unlock_compassion_path` | Story gating flag for Final Boss Compassion Path. |

---

### Implementation Note

`resolveSkillEffect` should be a pure switch/match over these effect keys. Active skill usage additionally checks:

- CPW availability.
- Target eligibility.
- Combat/intimacy scene context.
- Content toggles where applicable.

Passive effects are evaluated dynamically based on `ownedNodeIds` whenever the relevant moment occurs (combat start, intimacy turn, post-scene calculation, crafting check, etc.). They are never “activated” and do not consume CPW.

---

## 12. Status Effect Engine

**Purpose:** Apply, tick, remove, stack status effects.

### Granular Mechanics
- **Application:** Adds or refreshes `StatusEffectInstance`.
- **Tick:** Decrement duration; remove expired.
- **Stacking:** Refresh duration, increase stacks up to `maxStacks`, adjust magnitude.

### Main Engine Functions
```ts
// Apply a status effect to an actor within a combat or intimacy scene.
function applyStatusToActor(
  actor: CharacterActorState,
  effectId: CombatStatusEffectId | SexualStatusEffectId,
  magnitude: number,
  durationTurns: number,
  maxStacks: number,
  source: string
): void

// Tick all status effects for an actor at end of turn.
function tickActorStatusEffects(
  actor: CharacterActorState
): void
```

### Über Engine Function
```ts
// Single entry point for any status effect operation (apply, tick, remove).
function statusEffectEngine(
  actor: CharacterActorState,
  intent: StatusEffectIntent,
  data?: any
): void
```

---

## 13. Achievement Engine

**Purpose:** Evaluate achievement conditions and unlock them.

### Granular Mechanics
- **Evaluation:** After any state mutation, check all locked achievements.
- **Unlock:** Set `unlocked`, grant AP/BP/title.

### Main Engine Functions
```ts
// Check and unlock any achievements after a game state change.
function processAchievements(
  gameState: GameState
): GameState

// Check a specific achievement condition.
function checkAchievementCondition(
  conditionKey: string,
  gameState: GameState
): boolean
```

### Über Engine Function
```ts
// Single entry point for any achievement-related operation.
function achievementEngine(
  gameState: GameState,
  intent: AchievementIntent
): GameState
```

---

## 14. World Movement & Pathing Engine

**Purpose:** Handle player travel, fast travel, and encounter rolls.

### Granular Mechanics
- **Standard travel:** Shortest path; each segment rolls encounter.
- **Encounter resolution:** Mid-travel, combat may occur.
- **Fast travel:** Cost formula; requires discovered location.
- **Last safe location:** Updates when entering safe location.

### Main Engine Functions
```ts
// Travel from current location to destination (handles pathing and encounters).
function travelToLocation(
  gameState: GameState,
  destinationLocationId: string
): GameState

// Fast travel to a discovered location.
function fastTravelToLocation(
  gameState: GameState,
  destinationLocationId: string
): GameState

// Update last safe location when entering a safe location.
function updateLastSafeLocationIfApplicable(
  gameState: GameState
): GameState
```

### Supporting Functions
```ts
findShortestPath(...)
rollForEncounter(...)
calculateFastTravelCost(...)
```

### Über Engine Function
```ts
// Single entry point for any travel intent.
function movementEngine(
  gameState: GameState,
  intent: MovementIntent,
  destinationLocationId?: string
): GameState
```

---

## 15. Pregnancy, Lineage & Offspring Engine

**Purpose:** Track pregnancies and generate offspring.

### Granular Mechanics
- **Gestation:** `currentWeek` advances per game day.
- **Birth:** At day-end, if `currentWeek >= 12`, create `OffspringNpc`.
- **Offspring stats:** Snapshot from parents' current `CombatAttributes`.
- **Alignment:** Roll flat 34/33/33.

### Main Engine Functions
```ts
// Advance all pregnancies and trigger births as needed.
function processPregnancies(
  gameState: GameState
): GameState

// Generate offspring from a pregnancy.
function createOffspring(
  gameState: GameState,
  motherId: CompanionId,
  rngSeed: string
): GameState
```

### Supporting Functions
```ts
advancePregnancy(...)
checkForBirth(...)
generateOffspringStats(...)
rollOffspringAlignment(...)
```

### Über Engine Function
```ts
// Single entry point for any pregnancy/offspring-related operation.
function pregnancyEngine(
  gameState: GameState,
  intent: PregnancyIntent,
  data?: any
): GameState
```

---

## 16. Manor & Passive Generation Engine

**Purpose:** Manage Manor construction, suites, and passive generation.

### Granular Mechanics
- **Construction:** Timers decrement at day-end.
- **Suites:** Assign/vacate for moved-in occupants.
- **Passive generation:** Accumulate per occupant; collectible.

### Main Engine Functions
```ts
// Start a Manor upgrade construction.
function startManorUpgrade(
  gameState: GameState,
  targetTier: 2 | 3 | 4
): GameState

// Tick construction timers at day-end.
function tickManorConstruction(
  gameState: GameState
): GameState

// Assign a suite to an occupant.
function assignSuiteToOccupant(
  gameState: GameState,
  occupantId: string,
  suiteId: string
): GameState

// Collect passive generation from a specific occupant.
function collectPassiveGeneration(
  gameState: GameState,
  occupantId: string
): GameState
```

### Supporting Functions
```ts
accumulatePassiveGeneration(...)
```

### Über Engine Function
```ts
// Single entry point for any manor-related intent.
function manorEngine(
  gameState: GameState,
  intent: ManorIntent,
  data?: any
): GameState
```

---

## 17. Save/Load & Migration Engine

**Purpose:** Persist and restore game state.

### Granular Mechanics
- **Serialization:** `GameState` to JSON string.
- **Validation:** Zod schema on load.
- **Atomic writes:** Write temp file, rename.
- **Migration:** From older schema versions.

### Main Engine Functions
```ts
// Save game to a slot.
function saveGame(gameState: GameState, slotId: string): void

// Load game from a slot.
function loadGame(slotId: string): GameState

// Autosave at day-end.
function autosave(gameState: GameState): void

// Migrate an old save file to current schema.
function migrateSave(json: string, fromVersion: number): GameState
```

### Supporting Functions
```ts
serializeGameState(...)
deserializeGameState(...)
atomicWriteSave(...)
```

### Über Engine Function
```ts
// Single entry point for any save/load/migration intent.
function persistenceEngine(
  intent: PersistenceIntent,
  data?: any
): GameState | string | void
```

---

## 18. Purification Engine

**Purpose:** Handle purification as alternate defeat during combat.

### Granular Mechanics
- **Enemy arousal:** Raised by player Sex Skills (same actions as Intimacy).
- **Player/companion arousal:** Raised by enemy sexual attacks.
- **Miasma Reserve:** Limits enemy sexual attacks.
- **Toggle:** `ContentToggle.HostileArousalAttacks` gates enemy attacks.
- **Penalties:** Arousal-based combat penalties for all combatants.

### Main Engine Functions
```ts
// Apply an enemy's sexual attack during combat.
function executeEnemySexualAttack(
  encounterState: CombatEncounterRuntimeState,
  enemyCombatant: CombatCombatantRuntime,
  ability: EnemyAbilityDef,
  gameState: GameState
): void

// Apply the player's Sex Skill during combat (purification).
function executePlayerSexualSkill(
  encounterState: CombatEncounterRuntimeState,
  playerCombatant: CombatCombatantRuntime,
  skillNodeId: string,
  targetEnemyId: string,
  gameState: GameState
): void

// Apply arousal penalties at start/end of turn.
function applyArousalCombatPenalties(
  combatant: CombatCombatantRuntime
): void
```

### Supporting Functions
```ts
isPurifiable(...)
getSexualAttackTarget(...)
canUseSexualAttack(...)
```

### Über Engine Function
```ts
// Single entry point for any purification-related combat action.
function purificationEngine(
  encounterState: CombatEncounterRuntimeState,
  gameState: GameState,
  intent: PurificationIntent,
  data?: any
): void
```

---

## 19. Contact & Profile Read Model Engine

**Purpose:** Build contact list and profile views.

### Granular Mechanics
- **Contact list:** Companions first by `questStage`, then NPCs by relationship magnitude.
- **Profile:** Assemble from runtime state and defs.
- **Cap:** 200 entries.

### Main Engine Functions
```ts
// Get the full contact list.
function getContactList(
  gameState: GameState
): ContactListEntry[]

// Get a specific contact's profile.
function getContactProfile(
  gameState: GameState,
  contactId: string
): ContactProfileView
```

### Über Engine Function
```ts
// Single entry point for any contact/profile read request.
function contactReadModelEngine(
  gameState: GameState,
  intent: ContactReadIntent,
  contactId?: string
): ContactListEntry[] | ContactProfileView
```

---

## 20. Procedural Content Generation Engine

**Purpose:** Generate NPC appearances, names, and enemy scaling.

### Granular Mechanics
- **Name generation:** From gendered pools.
- **Gender:** Weighted roll.
- **Appearance:** Seed-based generation from class rule.
- **Enemy scaling:** Based on level and monster type.

### Main Engine Functions
```ts
// Generate a random NPC name from the pool.
function generateNpcName(
  gender: GenderId,
  rngSeed: string
): string

// Generate a full appearance for a spawned NPC.
function generateNpcAppearance(
  rule: ProceduralAppearanceRule,
  gender: GenderId,
  rngSeed: string
): AppearanceDef

// Scale enemy stats to a target level.
function scaleEnemyForRegion(
  enemyDef: EnemyCombatantDef,
  targetLevel: number,
  monsterType: MonsterType
): CharacterVitals & CombatAttributes
```

### Über Engine Function
```ts
// Single entry point for any procedural generation request.
function proceduralGenerationEngine(
  intent: ProceduralGenerationIntent,
  data?: any
): any
```

---

## Interaction Engine — Detailed Specification

Currently, the outcomes of NPC interactions are scattered across the Relationship, Dialogue, Economy, and other engines. There is no unified place that defines, for each interaction type, **what immediate effects occur on NPC and player state** before the interaction is handed to a specialized engine. This new **Interaction Engine** centralizes:

- Actor resolution and presence checks  
- Interaction eligibility and legality gating  
- Immediate pre-effects (e.g., introduction, daily counter decrements, flag changes)  
- Dispatch to the correct specialized engine  
- Service NPC routing  
- Sleep-specific non-consensual checks  

It does **not** resolve the full interaction itself — combat, intimacy, dialogue, trade, etc. are delegated once eligibility and immediate status changes are applied.

---

### 1. Granular Mechanics

#### 1.1 Actor Resolution

The engine accepts `targetId`. It resolves the target into one of:

| Actor Type | Source |
|---|---|
| Companion | `GameState.companions[targetId]` |
| Generic World NPC | `WorldNpcInstance` in `GameState.childNpcs`? (no, world NPCs are likely separate array; here assume `GameState.worldNpcs` if exists, otherwise from location population) |
| Child NPC | `GameState.childNpcs` |
| Service NPC | `ServiceNpcDef[]` lookup |

If the target cannot be found or is not currently present at the player’s location / phase, the interaction is rejected.

#### 1.2 Presence Check

Use `updateScheduleLocations` or current resolved location from schedule:

- Companions and generic NPCs follow `CompanionScheduleDef` / `NpcScheduleDef` with `"HOME"` token resolution.
- Child NPCs use `ChildNpcClassDef.scheduleByPhase`.
- Service NPCs are **always present** at their assigned `ServiceNpcDef.locationId`.

If the target’s current location does not match the player’s `currentLocationId`, the interaction is unavailable.

#### 1.3 Eligibility and Gating Rules

| Interaction | Companion | Generic NPC | Child NPC | Service NPC | Notes |
|---|---|---|---|---|---|
| `Talk` | Yes | Yes | Yes | Yes | First talk triggers introduction for generic NPC |
| `Gift` | Yes | Yes | No | No | Consumes item, applies flat Trust/Love bonus |
| `Trade` | Yes | Yes | No | Service-specific (vendor) | Opens barter/shop |
| `Inspect` | Yes | Yes | Yes | Yes | Reveals profile / read model |
| `Inventory` | Yes | No | No | No | Opens companion inventory/equipment |
| `Flirt` | Yes | Yes | No | No | Daily counter, diminishing returns |
| `Touch` | Yes | Yes | No | No | Daily counter, diminishing returns |
| `Command` | Yes | No | No | No | Party/combat commands |
| `MoveIn` | Yes | Yes | No | No | Requires move-in requirements |
| `Battle` | Yes | Yes | No | No | Hostile NPC only |
| `Intimate` | Yes | Yes | No | No | Consensual scene, requires eligibility |
| `ForceIntimacy` | No | Yes | No | No | Outlaw / defeated only |
| `ForceIntimacyOnSleeping` | Yes | Yes | No | No | Only Night/Midnight, sleeping target |

**Legal class blocks:**  
- `Protected` actors **cannot** be `Flirt`, `Touch`, `Intimate`, `ForceIntimacy`, or `ForceIntimacyOnSleeping`.
- `Innocent` actors cannot be `ForceIntimacy` or `ForceIntimacyOnSleeping`.
- `Outlaw` actors can be all allowed actions.
- Child NPCs can only be `Talk` and `Inspect`.

**Content toggles:**  
- `ForceIntimacy` and `ForceIntimacyOnSleeping` require `ContentToggle.NonConsensualContent === true`.
- Sexual interactions may require `ContentToggle.Pregnancy` if relevant.

**Service NPCs:**  
- They only expose their `ServiceType` action (vendor, bank, quest board, innkeeper, fast travel, bounty office) plus `Talk` and `Inspect`.
- The interaction engine routes `ServiceType` to the appropriate handler.

#### 1.4 Immediate Effects by Interaction Type

Below is the **central outcome table** this engine owns. These effects are applied **before** dispatching to the target engine.

| Interaction | Pre-effects on Player | Pre-effects on NPC | Dispatch To |
|---|---|---|---|
| `Talk` | None | If generic NPC and `hasBeenIntroduced === false`: set `hasBeenIntroduced = true`, assign name, add to Contact List if under `CONTACT_CAP`. | Dialogue Engine |
| `Gift` | Remove item from inventory | Apply `GIFT_BONUS.trust` and `GIFT_BONUS.love` to `trustLove`; consume item. | Relationship Engine |
| `Trade` | None | None | Economy Engine (barter/trade) |
| `Inspect` | None | None | Contact Read Model Engine |
| `Inventory` | None | None | Economy/Inventory Engine (companion only) |
| `Flirt` | None | If `flirtUsesRemainingToday > 0`: decrement, apply diminishing Trust/Love delta. If 0: no effect, return cooldown message. | Relationship Engine |
| `Touch` | None | If `touchUsesRemainingToday > 0`: decrement, apply diminishing Trust/Love delta. If 0: no effect. | Relationship Engine |
| `Command` | None | None | Skill/Ability Engine (companion commands) |
| `MoveIn` | None | If requirements met and suite available: set `movedIn = true`, assign `assignedSuiteId`; else reject. | Manor Engine |
| `Battle` | None | Mark as hostile / initiate combat state. | Combat Engine |
| `Intimate` | None | None | Intimacy Engine (SceneStartReason.CONSENSUAL) |
| `ForceIntimacy` | None | If allowed: set `firstIntimacyCompleted` after scene? (not immediate). Immediate: mark scene start reason. | Intimacy Engine (SceneStartReason.FORCE_INTIMACY) |
| `ForceIntimacyOnSleeping` | None | If allowed and asleep: set scene start reason. | Intimacy Engine (SceneStartReason.FORCE_INTIMACY_SLEEPING) |

#### 1.5 Diminishing Returns for Flirt / Touch

Defined in balance data:

```
FLIRT_DELTAS = [
  { trust: +4, love: +2 },
  { trust: +2, love: +1 },
  { trust: +1, love: +0 },
  { trust: 0, love: 0 },
]
```

Index = `3 - flirtUsesRemainingToday` (or based on daily uses already consumed). The first use today gives the highest bonus; the third gives minimum. After `flirtUsesRemainingToday` reaches 0, no further trust/love gains.

`Touch` uses a separate counter and slightly higher love gains:

```
TOUCH_DELTAS = [
  { trust: +2, love: +4 },
  { trust: +1, love: +2 },
  { trust: 0, love: +1 },
  { trust: 0, love: 0 },
]
```

Counters reset at day-end via `resetDailyInteractionCounters`.

#### 1.6 Move-In Eligibility

- **Companion:** Uses `CompanionDef.moveInRequirements` (trust, love, questStage).  
- **Generic NPC:** Flat threshold `60` trust and `60` love (from Requirements).  
- Requires available suite in `ManorState.suites`.

#### 1.7 Intimacy and Force Eligibility

- `Intimate`:  
  - Target must be companion or generic NPC with `legalClass` not `Protected` and not `Child`.  
  - Companion must have `acquired === true`.  
  - Content toggle `Pregnancy` may gate some scenes but not basic intimacy.  
- `ForceIntimacy`:  
  - Target must be `Outlaw` or defeated enemy with `presentsDefeatMenu === true`.  
  - Requires `ContentToggle.NonConsensualContent`.  
  - Cannot target `Protected` or `Innocent` (unless Outlaw).  
- `ForceIntimacyOnSleeping`:  
  - Additional gates:  
    - Current `DayPhase` is `Night` or `Midnight`.  
    - Target is asleep (requires a `sleeping` state flag or schedule phase entry).  
    - Player and target are in same residence / safe location.  
    - Target is not on guard duty and is not already awake.  
  - Same legal class and content toggle checks as `ForceIntimacy`.

#### 1.8 Service NPC Routing

When the target is a `ServiceNpcDef`, the interaction engine does **not** use `InteractionAction`. Instead, it uses the NPC’s `serviceType` and routes to a service handler:

| ServiceType | Routed Action |
|---|---|
| `ItemVendor` | Open shop → Economy Engine `processBuy` / `processSell` |
| `Bank` | Open storage/gold deposit → Economy / Manor storage |
| `QuestBoard` | Get board quests → Quest Engine `GET_BOARD_QUESTS` / `START_QUEST` |
| `Innkeeper` | Rest / sleep → Time Engine `executeSleep` |
| `FastTravel` | Fast travel → Movement Engine `fastTravelToLocation` |
| `BountyOffice` | Pay bounty / check wanted → Reputation Engine |

The interaction engine validates that the player is at the service NPC’s location, then calls the appropriate engine.

---

### 2. Main Engine Functions

```ts
// Resolve an interaction intent against the current game state.
function resolveNpcInteraction(
  gameState: GameState,
  targetId: string,
  action: InteractionAction,
  data?: any
): { gameState: GameState; dispatch?: EngineDispatch; log: string[] }

// Validate that the target actor exists and is present at the player's location/phase.
function validateInteractionEligibility(
  gameState: GameState,
  targetId: string,
  action: InteractionAction
): { eligible: boolean; reason?: string }

// Apply immediate pre-effects for the selected interaction (e.g., introduction, counters, item consumption).
function applyInteractionPreEffects(
  gameState: GameState,
  targetId: string,
  action: InteractionAction,
  data?: any
): GameState

// Dispatch to the correct specialized engine based on the interaction type.
function dispatchInteraction(
  gameState: GameState,
  targetId: string,
  action: InteractionAction,
  data?: any
): { gameState: GameState; dispatchedEngine: string; result?: any }

// Get the list of available interactions for a target NPC.
function getAvailableInteractions(
  gameState: GameState,
  targetId: string
): InteractionAction[]

// Handle a service NPC interaction using the NPC's ServiceType.
function handleServiceInteraction(
  gameState: GameState,
  serviceNpcId: string,
  serviceAction: string,
  data?: any
): { gameState: GameState; dispatch?: EngineDispatch; log: string[] }
```

---

### 3. Supporting Functions

```ts
getTargetActor(gameState, targetId): CharacterActorState | null
isTargetPresent(gameState, targetId): boolean
isInteractionAllowed(gameState, targetId, action): boolean
isSleepingTargetEligible(gameState, targetId): boolean
applyGenericNpcIntroduction(gameState, targetId): GameState
applyGiftEffects(gameState, targetId, itemId): GameState
applyFlirtEffects(gameState, targetId): GameState
applyTouchEffects(gameState, targetId): GameState
checkMoveInEligibility(gameState, targetId): boolean
checkIntimacyEligibility(gameState, targetId, sceneStartReason): boolean
resolveServiceNpcLocation(serviceNpc): string
getServiceHandler(serviceType): (gameState, data) => GameState
```

---

### 4. Über Engine Function

```ts
// Single entry point for any NPC interaction intent.
type InteractionIntent =
  | { type: "START_INTERACTION"; targetId: string; action: InteractionAction; data?: any }
  | { type: "SERVICE_INTERACTION"; targetId: string; serviceAction: string; data?: any }
  | { type: "GET_AVAILABLE_INTERACTIONS"; targetId: string };

function interactionEngine(
  gameState: GameState,
  intent: InteractionIntent
): {
  gameState: GameState;
  dispatchedEngine?: string;
  availableInteractions?: InteractionAction[];
  log: string[];
}
```

---

### 5. Seed Data Required

#### Existing Seed Data Used

| Seed Type | File | Purpose |
|---|---|---|
| `CompanionDef[]` | `companions_seed_data.ts` | Move-in requirements, home location, schedule |
| `ProcNpcClassDef[]` | `proc_npc_classes_seed_data.ts` | Generic NPC class templates, appearance rules |
| `ChildNpcClassDef[]` | `child_npc_classes_seed_data.ts` | Child NPC schedules, legal class |
| `ServiceNpcDef[]` | `service_npcs_seed_data.ts` | Fixed service NPC roster, service types |
| `ItemDef[]` | `items_seed_data.ts` | Gift items, vendor stock, equipment |
| `CharacterDialogueTreeDef[]` | `dialogue_companions_seed_data.ts` | Dialogue entry points for Talk |
| `GenericNpcDialogueSetDef[]` | `dialogue_generic_npc_seed_data.ts` | Introduction node for first Talk |
| `LocationDef[]` | `world_map_seed_data.ts` | Location safety and residence flags |
| `NpcScheduleDef[]` | `npc_schedules_seed_data.ts` | Generic NPC schedules |
| `CompanionScheduleDef[]` | `companion_schedules_seed_data.ts` | Companion schedules with HOME token |

#### Seed Data Required: `interaction_rules_seed_data.ts`

This document provides the complete specification for all engines, their mechanics, and their functions, including the **über engine functions** that serve as the single entry point for each system. This serves as the implementation blueprint for the `packages/game-engine` module.






