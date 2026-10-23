# Ojisan -- Execution Task List

**Task list version:** 4.4 (updated 2026-10-20)
**Tracks:** requirements_analysis.md v1.3, PRD v1.9

---

## Phase 1: Fix Code Bugs (Existing Files)

> All bugs from the initial analysis (v1.0) have been resolved in the current codebase.
> See §3.1 of the analysis doc for the full resolved list.

- [x] **1.1** Fix `createInitialDynamicState()` double-return syntax error in `dynamicState.ts`
- [x] **1.2** Fix duplicate imports in `spawnEngine.ts` (RACE_PROFILES, FEMALE_BODY_TYPES, getHeightTag, PREGNANCY_STAGE_OVERRIDES, circular self-import)
- [x] **1.3** Fix duplicate function definitions in `ageBodyProfile.ts` (clamp, cupSizeToIndex, cupSizeFromIndex, duplicate FemaleMeasurements import)
- [x] **1.4** Add missing `CockType` import to `physicalCore.ts`
- [x] **1.5** Add missing imports to `personalityExpansion.ts` (Race, PublicPersona, PrivateSelf, HiddenDesireLean, PersonaGap, DesireAwareness, TriggerSensitivity, weightedRandom)
- [x] **1.6** Fix `require()` mixed with ES imports -- moved `deriveCockTypesFromRace` to `patches.ts`
- [x] **1.7** Fix missing `RACE_PROFILE_EXTENSIONS` reference -- now uses `RACE_PROFILES[race]` directly
- [x] **1.8** Fix `generateBackground` signature mismatch (3 args vs 4 args)
- [x] **1.9** Fix `raceProfile` used out of scope in `generateMalePhysicalDetail`
- [x] **1.10** Fix `createEmptyRelationshipActFlags` / `createEmptyActFlagsV2` mismatch -- defined locally in `dynamicState.ts`

### Remaining code tasks

- [x] **1.11** Fix `Set<T>` JSON serialization -- replaced `Set<Kink>`, `Set<OrgasmType>` with `T[]` in psychologyCore.ts, sexualPhysiology.ts, historyProfile.ts; added `addUniqueKink` / `addUniqueOrgasmType` / `hasKink` / `hasOrgasmType` helpers to historyProfile.ts
- [x] **1.12** Remove dead `greet()` function -- `spawn-engine/index.ts` converted to barrel export; `testSpawn.ts` created at root
- [x] **1.13** Add `.gitignore` (node_modules, compiled output, IDE files, save files)

---

## Phase 2: Requirements Doc Fixes

> The PRD has been updated to v1.4. All items below are now resolved in the doc.

- [x] **2.1** Resolve pregnancy duration contradiction -- clarified as **12 in-game weeks**; stage-to-week mapping defined
- [x] **2.2** Fill in §2 Repository Structure -- proposed structure + Engine Orchestration added
- [x] **2.3** Fix §4.3 Satisfaction score formula -- full formula specified including clamp bounds
- [x] **2.4** Inline §4.2 reference to "earlier requirements" -- stat progression formula inlined
- [x] **2.5** Remove/merge redundant sections -- legacy §6/§7 removed; content merged into §4.7 and §2.2
- [x] **2.6** Fix cooldownHours vs phases mismatch -- quests now use `cooldownDays` (in-game days)
- [x] **2.7** Add missing combat formulas -- crit, dodge, flee, purification arousal gain all specified
- [x] **2.8** Add AI pattern decision descriptions -- Aggressive, Defensive, SupportCaster, BossScripted defined
- [x] **2.9** Add Reputation tier labels and event table
- [x] **2.10** Add fatigue penalty table
- [x] **2.11** Add Economy ItemDef schema and sell price formula
- [x] **2.12** Add Crafting upgrade bonus per tier and failure rates
- [x] **2.13** Add World map encounter chance table and fast travel cost formula
- [x] **2.14** Add Relationship band thresholds
- [x] **2.15** Add Manor tier feature unlock table
- [x] **2.16** Add enemy/monster character definition (§4.2.1) -- enemies treated as characters with combat overlay
- [x] **2.17** Add `GameState` root interface sketch and intent->engine routing table (§2.2)
- [x] **2.18** Define `DialogueNode`, `DialogueChoice`, `DialogueCondition` schemas
- [x] **2.19** Define `SkillDef` and `SkillEffect` schemas
- [x] **2.20** Define `StatusEffectDef` and `ActiveStatusEffect` schemas
- [x] **2.21** Define `QuestDef`, `ObjectiveDef`, `QuestReward` schemas
- [x] **2.22** Define `WorldNode` schema
- [x] **2.23** Define enemy stat scaling algorithm (§4.20)
- [x] **2.24** Define conception check formula and gestation stage-to-week mapping (§4.16)
- [x] **2.25** Define `NpcScheduleDef` schema (§4.10)
- [x] **2.26** Define `IntimacyScene` state sketch (§4.3)
- [x] **2.27** Define `CharacterVitals` interface (§4.1)
- [x] **2.28** Add Frontend Architecture section (§4.21) -- tech stack, views, hooks, components, mock-first pattern
- [x] **2.29** Define full Achievement schema and list of actual in-game achievements (PRD §4.14 still sparse) -- schema complete (Phase 20); catalog data deferred pending lore/world doc review

---

## Phase 3: Foundation -- Unified Character Interface & GameState

### 3a. Unified Character Interface (PRD §4.1.1)

- [x] **3a.1** Define `Character` base interface in `src/state/gameState.ts`
- [x] **3a.2** Define `HumanoidCharacter` extending `Character` with spawn-engine profile fields (initially `unknown`; replace at 3a.8)
- [x] **3a.3** Define `PlayerCharacter` extending `HumanoidCharacter`
- [x] **3a.4** Define `NpcCharacter` extending `HumanoidCharacter`
- [x] **3a.5** Define `EnemyHumanoidCharacter` extending `HumanoidCharacter`
- [x] **3a.6** Define `MonsterCharacter` extending `Character`
- [x] **3a.7** Define `AnyCharacter` union type
- [x] **3a.8** Replace `unknown` stubs in `HumanoidCharacter` with real spawn-engine types — imports added to `gameState.ts`; all 12 physical/psychology/history/dynamic fields now typed; `ContactProfileView` fields updated (2026-09-26)
- [x] **3a.9** `EnemyHumanoidCharacter.lootTable` / `purificationReward` / `defeatOutcomeOptions` typed inline in `gameState.ts` (avoids circular dep); structural mirrors of `enemySpawnEngine` interfaces (2026-09-26)
- [x] **3a.10** `MonsterCharacter.lootTable` / `purificationReward` / `defeatOutcomeOptions` typed inline in `gameState.ts`; same structural shape as `EnemyHumanoidCharacter` (2026-09-26)

### 3b. Party System (PRD §4.1.2)

- [x] **3b.1** Define `PartyMember` interface
- [x] **3b.2** Define `PartyState` interface
- [x] **3b.3** Add `party: PartyState` to root `GameState`
- [x] **3b.4** Add `COMPANION_DOWNED`, `PARTY_WIPED`, `COMPANION_ADDED`, `COMPANION_REMOVED` to `GameEvent` union
- [x] **3b.5** Implement `addCompanion(gameState, npcId)` in `src/engines/partyEngine.ts`
- [x] **3b.6** Implement `removeCompanion(gameState, npcId)`
- [x] **3b.7** Implement `syncPartyVitals(gameState)`
- [x] **3b.8** Implement `deriveCompanionStats(npc: NpcCharacter): CombatStats`
- [x] **3b.9** Implement `downCompanion()` + `reviveDownedCompanions()` in partyEngine.ts
- [x] **3b.10** Implement `isPartyWiped()`, `applyPhaseRecoveryToParty()`, `applyFullRestoreToParty()`

### 3c. GameState & Dispatcher Foundation

- [x] **3c.1** Define full `GameState` TypeScript interface
- [x] **3c.2** Define `WorldState` interface
- [x] **3c.3** Define `CalendarState` interface
- [x] **3c.4** `ADVANCE_PHASE` and `SLEEP` intent handlers wired in `dispatcher.ts` → `calendarEngine.advancePhase()` / `resolveSleep()`; `locationDefs`/`schedules` passed as empty stubs (data deferred Phase 25); `FLIRT`/`TOUCH` choiceId sub-path in `TALK` wired to `resolveSocialAction()` (2026-09-26)
- [x] **3c.5** `DispatchPipeline` type exported from `dispatcher.ts`; contract documented: intent → primary engine → `processEventQueue()` → achievement check → caller (2026-09-26)
- [x] **3c.6** All engine stubs verified to import from `src/state/gameState.ts`; combatEngine rewritten to use `AnyCharacter[]`; relationshipEngine updated to read `contact.character`

---

## Phase 4: NPC Population Engine -- Fill Gaps

- [x] **4.1** Create gendered name pools per race (static data file) -- `src/data/namePool.ts`; all 23 races, male + female pools
- [x] **4.2** Implement `hasBeenIntroduced` flag and individuation flow -- `individuateNpc()` + `individuateContact()` in `npcPopulationEngine.ts`
- [x] **4.3** Implement Contact List cap enforcement (max 400, configurable) -- `isContactCapReached()` + `tryAddContact()` in `npcPopulationEngine.ts`
- [x] **4.4** Implement service NPC fixed roster (vendor, innkeeper, quest board) -- `buildServiceNpc()` + `ServiceRole` type; `isService=true` flag prevents refresh clearing
- [x] **4.5** Implement `NpcScheduleDef` and schedule-based location lookup -- interface in `gameState.ts`; `resolveNpcLocation()` in `npcPopulationEngine.ts`
- [x] **4.6** Implement 3-day population refresh cycle (tied to Calendar day-end tick) -- `shouldRefreshPopulation()` + `tickPopulationRefresh()` in `npcPopulationEngine.ts`
- [x] **4.7** Implement per-location population range and NPC class assignment -- `LocationPopulationDef` + `NpcClassDef` interfaces in `gameState.ts`; `spawnLocationPopulation()` in `npcPopulationEngine.ts`
- [x] **4.8** Replace flat `genderRatio` with per-class `genderWeight` -- `NpcClassDef.femaleWeight` field; `spawnNpcFromClass()` uses it internally
- [x] **4.9** World history simulation -- `simulateWorldHistory()` in `npcPopulationEngine.ts`; 30 synthetic days pre-seed NPC-NPC relationships before Day 1; deterministic via `histRand`; silent (no events); decay + cap enforcement per tick; `onProgress` callback for loading bar

---

## Phase 5: Enemy & Monster Spawn Engine

- [x] **5.1** Define `EnemyCharacter` discriminated union (MONSTER | HUMANOID_ENEMY); `EnemyOverlay`; `MonsterBaseProfile`; `PartialHumanoidProfile` for species body/physiology data
- [x] **5.2** Define `MonsterTypeDef` -- 5 non-humanoid types + 7 humanoid monster species (Succubus, Incubus, YukiOnna, Oni, KitsuneCorrupted, Lamia, Harpy); `isHumanoid`, `fixedSex`, `partialProfile` fields; full body/physiology/psychology pools per species
- [x] **5.3** Implement `spawnMonster(type, tier)` -- branches on `isHumanoid`: humanoid species -> `HumanoidEnemyCharacter` with partial profile injected; non-humanoid -> `MonsterEnemyCharacter`; `spawnHumanoidEnemy(tier)` for generic corrupted soldiers
- [x] **5.4** Implement `scaleStatToTier()` + `scaleMonsterDef()`; `REGION_TIER_MULTIPLIERS` x1.0-x3.2 (PRD §4.20)
- [x] **5.5** Define `LootTable` / `LootEntry` schemas; `resolveLoot(table, seed)` with deterministic seed advancement
- [x] **5.6** Define `DefeatOutcome` / `DefeatContext` schemas; 6 outcome types incl. `Intimate` (humanoid + `adultContentEnabled` gated); `selectDefeatOutcome()` priority chain
- [x] **5.7** `src/data/bosses.ts` -- 10 hand-crafted bosses (one per region); humanoid bosses carry full body/physiology profiles; all humanoid bosses have `Intimate` defeat outcome
- [x] **5.8** `src/data/monsters.ts` -- 10 region profiles (T1-T5); humanoid species assigned to thematically appropriate regions

---

## Phase 6: Intimacy Engine -- Scene Layer

> All spawn-engine types are used as the single source of truth. No duplicate definitions exist in the intimacy engine.
> Engine: `src/engines/intimacyEngine.ts` | Catalog: `src/data/intimacyCatalog.ts` | Fragments: `src/data/intimacyFragments.ts`

### 6a. Core schema

- [x] **6.1** `IntimacyPosition` schema -- `id`, `name`, `penetrationTargetsUsed`, `allowedActionIds`, `requiredClothingState`, `minTrust`/`minLove` gates, `requiredPartnerFeature` (species gate e.g. `SERPENT_TAIL`), `partnerLeads`, `allowedStartTypes`, `transitionCost`
- [x] **6.2** `IntimacyAction` schema -- `tecRequirement`, `stimulationIntensity`, `effectivenessOnFail`, `penetrationTarget`, `bodyPartTargeted` (must match `FemaleSensitivityProfile` zone keys), `painValue`, `orgasmChance`, `kinkTagsTriggered: Kink[]` (enum values only), `requiredItems: RequiredItem[]`, `statDeltas: SexualStatDeltas`, `clothingChange`, `setsNeckGrab`, `requiresNeckGrab`, `clearsNeckGrab`
- [x] **6.3** `SexualStatDeltas` -- `arousalDelta`, `milkProductionDelta`, `squirtStorageDelta`, `squirtProbabilityDelta`, `cumStorageDelta`, `sensitivityDelta`, `lubricationDelta`; `RequiredItem` (itemId + consumedOnUse + consumeQty); `ConsumableEffect` + `ActiveConsumable`
- [x] **6.4** `NpcPartnerProfile` snapshot type -- uses canonical spawn-engine types throughout: `resistanceProfile: ResistanceProfile` (full interface from psychologyCore.ts), `corruptionShame: CorruptionShameTrack`, `orgasmProfile: OrgasmProfile`, `sensitivity: FemaleSensitivityProfile`, `wetnessTrack: WetnessTrack`, `acquiredKinks: Kink[]`, `arousalSpeed: ArousalSpeed`, `lubricationSpeed: LubricationSpeed`, `elasticity: VaginaElasticity`, plus relationship state fields: `trustWithPlayer`, `attachmentWithPlayer`, `submissionToPlayer`, `hiddenDesireAligned`
- [x] **6.5** `PlayerProfile` snapshot type -- `technique`, `virility`, `staminaCurrent/Max`, `cumStorage/Max`, `arousalCurrent`, `intimatePartnerHistory`
- [x] **6.6** `IntimacyScene` state -- 30+ field interface; all fluid storages (`cumStorage/Max`, `squirtStorage/Max`, `squirtProbability`, `milkStorage/Max`, `milkStorageDelta`) persist between scenes via character snapshot read/write; `currentWetness: WetnessLevel` derived each turn from `WetnessTrack`; `pleasureTrack: PleasureTrack` from patches.ts; `postOrgasmSensitivityState: PostOrgasmSensitivity`; `subspaceTracker: SubspaceTracker`; `afterglowTracker: AfterglowTracker`; `neckGrabActive: boolean`; `actsThisScene: Partial<SexualActFlags>`; `activeConsumables: ActiveConsumable[]`; `orgasmDeniedThisScene: boolean`; `momentumScore`; `lastActionId`; `consecutiveRepeatCount`; `loveDeltaAccum`; `trustDeltaAccum`
- [x] **6.7** Orgasm types -- `FemaleOrgasmEvent` uses `OrgasmType` enum (not a custom union); `simultaneous: boolean` gated by `OrgasmProfile.multipleCapacity` (multiple orgasms NOT possible without this flag); squirt gated by `OrgasmProfile.squirtCapacity`; `MaleOrgasmEvent` with `cumExpelled`, `destination: CumDestination`, `pregnancyCheck`
- [x] **6.8** `SceneEndPersistence` bundle -- all write-back fields including `partnerCurrentWetness: WetnessLevel`, `partnerMood: MoodValue` (enum), `updatedActs: Partial<SexualActFlags>`, afterglow from `AfterglowTracker.active`

### 6b. Engine functions

- [x] **6.9** `runTecCheck()` -- `playerTEC + roll(1,10) >= actionTecRequirement`
- [x] **6.10** `checkPenetrationConflict()` -- blocks if `penetrationTarget` already in `occupiedPenetrationTargets`
- [x] **6.11** `calcSatisfaction()` -- `(pleasurePeak x 0.4) + (orgasmCount x 15) + (kinksTriggered x 10) - (painExcess x 5)`, clamped [0, 100]
- [x] **6.12** `milkStorageMaxFromCupSize()` -- AA/A/B->60, C/D->100, DD/E->140, F+->180; tied to breast size as per PRD
- [x] **6.13** `deriveCurrentResistance()` -- computes `currentResistance` (0-100) from live relationship context; 6 rule categories applied additively to `baselineResistance`, clamped [0,100]
- [x] **6.14** `startScene()` -- reads persistent fluid/arousal; calls `deriveCurrentResistance()`; initialises `PleasureTrack`, `SubspaceTracker`, `AfterglowTracker` via patches.ts factory functions
- [x] **6.15** `resolveSceneAction()` -- 31-step resolver pipeline (status guard, TEC check, overstim, kink bonus, arousal/momentum/zone/subspace/jitter/resistance mults, pain, pleasure/wetness/subspace/afterglow updates, orgasm resolution, clothing, momentum, actsThisScene, consumable tick, exit conditions)
- [x] **6.16** `resolvePlayerOrgasm()` -- expels `cumStorage`; `CumDestination`; pregnancy check; condom gate; arousal spike; updates `actsThisScene`
- [x] **6.17** `orgasmDenial()` -- gate arousal >=85; resets to 70; +0.20 squirt probability; forces next orgasm `OrgasmType.Multiple`
- [x] **6.18** `applyConsumable()` + `CONSUMABLE_DEFS` -- condom, aphrodisiac_gel, lubricant, diuretic
- [x] **6.19** `endScene()` -- `calcSatisfaction()`; afterglow x1.3 delta; `partnerMood` from `MoodValue` enum; returns `SceneEndPersistence`
- [x] **6.20** `resolvePostIntimacy()` -- player gains (technique/virility/sensitivity/XP/AP); partner deltas; corruption rate; delegates patches to `resolvePostEncounter()`
- [x] **6.21** `getAvailableActions()` UI helper -- filters position's `allowedActionIds` by conflict state

### 6c. Catalog -- `src/data/intimacyCatalog.ts`

- [x] **6.22** 27 positions with `transitionCost`
- [x] **6.23** 55 actions (penetrative, oral, ear, manual, affection, impact, aggressive, choke sequence, bondage, toys, paizuri, strip, species)
- [x] **6.24** All actions carry `statDeltas`, `requiredItems`, `kinkTagsTriggered: Kink[]`
- [x] **6.25** `choke_and_release` kept as DEPRECATED entry for save-game compatibility

### 6d. Supporting files

- [x] **6.26** `src/data/intimacyFragments.ts` -- `FragmentLibrary` keyed by action/scene keys; `pickFragment()` + `satisfactionTierKey()` helpers
- [x] **6.27** `src/client/mock/mockIntimacyScene.ts` -- fully matches extended `IntimacyScene` schema; turn 5 CONSENSUAL scene with Elara

### 6e. Cross-system audit (completed)

- [x] **6.28** All duplicate type definitions removed from intimacyEngine.ts; spawn-engine is sole source of truth for all physiology types
- [x] **6.29** Multiple orgasm gate: `OrgasmType.Multiple` only fires when `multipleCapacity === true` AND prior orgasm exists this scene
- [x] **6.30** Shame mechanics wired: friction, compound MoodValue states, pain amplification, corruption counteracts shame
- [x] **6.31** `corruptionRatePerEncounter` drives post-scene corruption delta (not hardcoded)
- [x] **6.32** `kinkTagsTriggered` on all catalog actions converted to `Kink[]` enum values

---

## Phase 7: Combat Engine

> Implemented in `src/engines/combatEngine.ts`. Multi-enemy first-class. `COMBAT_DEFEAT_OUTCOME` in `GameEvent` union. `mockCombatState.ts` patched.

- [x] **7.1** Define `CombatState`, `CombatAction`, `CombatResult`, `CombatHit`, `KilledEnemy`, `CombatLogEntry`, `BossPhase` interfaces
- [x] **7.2** Implement initiative sort (`AGI + d10`, LCK tiebreak) -- `buildInitiativeOrder()`
- [x] **7.3** Implement damage formula, crit, and dodge -- `resolveHit()`; AOE x0.65 scalar
- [x] **7.4** Implement AI strategy objects -- `Aggressive`, `Defensive`, `SupportCaster`, `BossScripted`
- [x] **7.5** Implement miasma tracking -- `tickMiasmaGain()` capped at 12/turn; `tickMiasmaDecay()` on PURIFY
- [x] **7.6** Implement purification arousal gain formula -- `calcPurificationArousalGain()`
- [x] **7.7** Implement flee attempt -- `attemptFlee()`; -5% crowd penalty; failed flee triggers counter-attack
- [x] **7.8** Implement companion down logic and party wipe detection
- [x] **7.9** Implement defeat outcome selection -- `emitDefeatOutcome()`; emits `COMBAT_DEFEAT_OUTCOME`
- [x] **7.10** Wire combat end to Reputation and Quest engines -- `emitVictoryEvents()`
- [x] **7.11** Remove redundant `CombatDefeatOutcomeEvent` export from `combatEngine.ts` -- confirmed absent; comment in file notes event is in GameEvent union (Phase 16 confirmed clean)

---

## Phase 8: Calendar & Time Engine

> Implemented in `src/engines/calendarEngine.ts`. Tasks 8.1-8.7 complete.

- [x] **8.1** Implement phase advance -- `advancePhase()`
- [x] **8.2** Implement action counter -- `incrementActionCount()`
- [x] **8.3** Implement direct-advance events -- `directAdvancePhase()`
- [x] **8.4** Implement fatigue tracking -- `deriveFatiguePenalty()`, `tickFatigueAndCheckCollapse()`
- [x] **8.5** Implement sleep mechanic -- `resolveSleep()`
- [x] **8.6** Implement passive Stamina/CPW recovery on phase advance
- [x] **8.7** Implement full day-end tick sequence -- `runDayEndTick()` all 9 steps; steps 1/2/4/5/6 remain TODO stubs for their engine phases
- [x] **8.8** `ADVANCE_PHASE` and `SLEEP` dispatcher handlers now call `advancePhase(state, {}, {})` / `resolveSleep(state, {}, {})` — engines already accepted the params; the dispatcher was the missing caller (2026-09-26)

---

## Phase 6b: Intimacy Engine -- Faint / Life-Force System

- [x] **6b.1** Add `PartnerEngagementStatus` union + `derivePartnerEngagementStatus()` pure helper
- [x] **6b.2** Add faint/life-force fields to `IntimacyScene`
- [x] **6b.3** Add `intimacyLifeForce?`, `intimacyBlockedForDay?` to `NpcCharacter`
- [x] **6b.4** Wire faint latch in `resolveSceneAction()` with post-faint DR scalar
- [x] **6b.5** Update exit conditions -- life-force zero ends scene, not stamina zero
- [x] **6b.6** Update `endScene()` fainted-partner branch
- [x] **6b.7** Add `MoodValue.Unconscious` to `enums.ts`
- [x] **6b.8** Add `NPC_FAINTED_IN_INTIMACY` and `NPC_INTIMACY_BLOCKED_FOR_DAY` events
- [x] **6b.9** Add `recoverFaintedPartners()` to `calendarEngine.ts`; wired into day-end tick step 7
- [x] **6b.10** Update `mockIntimacyScene.ts` to full schema

---

## Phase 6c: Intimacy Engine -- Death Consequences

- [x] **6c.1** Add `'PARTNER_DECEASED'` to `SceneStatus`
- [x] **6c.2** Add `entityType`, `lootTableId?`, `xpReward?` to `NpcPartnerProfile`
- [x] **6c.3** Add `partnerDeceased`, `reputationPenalty`, `partnerEntityType` to `SceneEndPersistence`
- [x] **6c.4** Add `isDeceased?` tombstone flag to `NpcCharacter`
- [x] **6c.5** Add `ENEMY_KILLED_IN_INTIMACY` to `GameEvent` union
- [x] **6c.6** Fix `resolveSceneAction()` step 31: life-force-zero sets `PARTNER_DECEASED`
- [x] **6c.7** Rewrite `endScene()` with three ordered branches (death / faint-alive / normal)
- [x] **6c.8** Patch `recoverFaintedPartners()` to skip `isDeceased` NPCs

---

## Phase 9: Relationship Engine

> Implemented in `src/engines/relationshipEngine.ts`. All core tasks complete.

- [x] **9.1** `TALK` handler routes `choiceId=FLIRT/TOUCH` to `resolveSocialAction()`; `RELATIONSHIP_STATUS_CHANGED` case added to `processEventQueue()` — writes `rel_status_<npcId>` flag to `state.flags` for downstream engine consumption (2026-09-26)
- [x] **9.2** Implement 16-cell band matrix lookup -> `RelationshipStatus`; `getTrustBand()` / `getLoveBand()` / `getRelationshipStatus()`
- [x] **9.3** Implement daily flirt/touch diminishing returns -- `resolveSocialAction()`; cap 3/day; emits `RELATIONSHIP_STATUS_CHANGED`
- [x] **9.4** Implement gift mechanic -- `resolveGift()`; +10 Trust / +15 Love
- [x] **9.5** `isMoveInEligible()` with per-NPC override thresholds
- [x] **9.6** `applyPostSceneRelationshipDelta()` -- writes back trust/love, clamped; emits on band change
- [x] **9.7** `setPlayerBondType()` -- enforces `PLAYER_EXCLUSIVE_BONDS`; revokes from other NPCs; emits `PLAYER_BOND_SET`
- [x] **9.8** Add `RELATIONSHIP_STATUS_CHANGED` event to `GameEvent` union
- [x] **9.9** Add `PLAYER_BOND_SET` event to `GameEvent` union
- [x] **9.10** Add `moveInTrustOverride?` / `moveInLoveOverride?` to `NpcCharacter`
- [x] **9.11** `mockGameState.ts` validation pass -- Elara/Bram/Meira all confirmed sensible
- [x] **9.12** `resetDailySocialCounters()` exported from `relationshipEngine.ts`; duplicate removed from `calendarEngine.ts`
- [x] **9.13** `PLAYER_EXCLUSIVE_BONDS` set exported from `relationshipEngine.ts`

---

## Phase 9a: NPC-NPC Social System (npcSocialEngine.ts)

> Engine file is complete. Tasks below track what is implemented vs what still needs wiring.

- [x] **9a.1** Define `NpcRelationship`, `NpcDailyInteraction`, `BondCapTable` types in `gameState.ts`
- [x] **9a.2** Add `npcRelationships: NpcRelationship[]` to `NpcCharacter`
- [x] **9a.3** Add `playerBondType?: BondType` to `NpcCharacter`
- [x] **9a.4** Add `npcInteractionLog: NpcDailyInteraction[]` to `GameState`
- [x] **9a.5** Add NPC-NPC `GameEvent` variants (FORMED, DROPPED, DOWNGRADED, CONFLICT, JEALOUSY_SPIKE, INTIMATE_TICK)
- [x] **9a.6** Add social-tier `BondType` entries to enum (Stranger through Crush)
- [x] **9a.7** Implement `selectActiveNpcs()` -- three-part score subset selection
- [x] **9a.8** Implement `pickInteractionTarget()` -- weighted candidate scoring + stranger gate
- [x] **9a.9** Implement `pickInteractionType()` -- Talk / Flirt / Intimate / Conflict priority chain
- [x] **9a.10** Implement all delta resolvers (Talk, Flirt, Conflict, Intimate)
- [x] **9a.11** Implement `evolveBond()` with full social-tier + intensity ladder
- [x] **9a.12** Implement `PLAYER_EXCLUSIVE_BONDS` gate
- [x] **9a.13** Implement `enforceBondCap()` -- collision downgrades weakest to Acquaintance
- [x] **9a.14** Implement `applyInteractionLog()` -- immutable write-back to contacts[]
- [x] **9a.15** Implement `runDecayAndCapEnforcement()` -- 30-day stale drop + 20-slot trim
- [x] **9a.16** Implement `runNpcSocialTick()` -- day-end entry point
- [x] **9a.17** Wire `runNpcSocialTick()` into `calendarEngine.runDayEndTick()` step 9
- [x] **9a.18** Update `mockGameState.ts` -- add `npcRelationships: []`, `playerBondType: undefined`, `npcInteractionLog: []` to all NPC entries

---

## Phase 10: Reputation Engine

> Engine file: `src/engines/reputationEngine.ts` (partial stub exists).
> PRD reference: §4.5.
> Also closes task 7.11 -- `COMBAT_DEFEAT_OUTCOME` dispatch wired here; removes need for `CombatDefeatOutcomeEvent` re-export.

### 10a. State & schema

- [x] **10.1** Define `ReputationState` in `gameState.ts` -- `record: Record<RegionId, number>` (score -800 to +800); add to root `GameState` if not already present; define `RegionId` string brand or enum
- [x] **10.2** Define `computeBounty(score: number): number` pure helper -- `abs(score) x 2`; add `isBountyActive(score): boolean` (true when score < -100)
- [x] **10.3** Add reputation `GameEvent` variants to union: `REPUTATION_CHANGED` (`regionId`, `delta`, `newScore`, `tier`), `BOUNTY_CHANGED` (`regionId`, `newAmount`), `REPUTATION_TIER_CROSSED` (`regionId`, `from`, `to`)
- [x] **10.4** Define `ReputationTier` enum -- `Infamous | Disliked | Neutral | Liked | Renowned`; define `getReputationTier(score): ReputationTier` pure helper (thresholds: <-400 / -400 to -100 / -100 to 100 / 100 to 400 / >400)

### 10b. Core engine functions

- [x] **10.5** Implement `applyReputationDelta(gameState, regionId, delta): GameState` -- clamps [-800, +800]; checks tier crossing; emits `REPUTATION_CHANGED`, optionally `REPUTATION_TIER_CROSSED`, `BOUNTY_CHANGED` if negative
- [x] **10.6** Implement `tickReputationDecay(gameState): GameState` -- applies -5/day to negative scores only; emits `REPUTATION_CHANGED` per changed region; called at day-end step 1
- [x] **10.7** Implement `getRegionReputation(gameState, regionId): number` pure getter
- [x] **10.8** Define `REPUTATION_EVENT_TABLE` constant mapping event keys to deltas per PRD §4.5; implement `applyReputationEvent(gameState, regionId, eventKey)` delegating to `applyReputationDelta()`

### 10c. Dispatcher wiring

- [x] **10.9** Wire `COMBAT_DEFEAT_OUTCOME` handler in `dispatcher.ts` -- routes to `enemySpawnEngine.selectDefeatOutcome()`; KILL outcomes call `applyReputationEvent(KILL_COMBATANT)`; Intimate outcomes initiate intimacy scene with defeated enemy profile
- [x] **10.10** Wire `ENEMY_KILLED_IN_INTIMACY` handler -- awards XP + resolves loot; calls `applyReputationEvent(KILL_COMBATANT)`
- [x] **10.11** Wire `NPC_DIED_IN_INTIMACY` handler -- removes NPC from contacts/party, sets `isDeceased`, increments death count flag; calls `applyReputationEvent(KILL_CIVILIAN)` scaled by scene start type
- [x] **10.12** Remove redundant `CombatDefeatOutcomeEvent` export from `combatEngine.ts` (task 7.11)

### 10d. Day-end wiring & mock

- [x] **10.13** Wire `tickReputationDecay()` into `calendarEngine.runDayEndTick()` step 1 (currently TODO stub)
- [x] **10.14** Add `reputation: Record<RegionId, number>` sample data to `mockGameState.ts` -- at least 3 regions covering all 5 tiers

---

## Phase 11: Quest Engine

> Engine file: `src/engines/questEngine.ts`.
> PRD reference: §4.6.
> Depends on: Phase 10 (`applyReputationEvent`); gold written directly to `player.gold` until Phase 12 is wired.
> **Phase 11 complete** (mechanics only; quest data deferred to task 11.5).

### 11a. State & schema

- [x] **11.1** Define `QuestDef`, `ObjectiveDef`, `QuestReward` in `src/data/quests.ts` -- schema types only; catalog empty pending task 11.5
- [x] **11.2** Define `QuestEntry` runtime state -- `defId`, `status: QuestStatus`, `objectiveProgress: number[]`, `activatedOnDay`, `completedOnDay?`, `cooldownExpiresOnDay?`
- [x] **11.3** Define `QuestLog` -- `entries: QuestEntry[]`; replaced old stub `QuestLog`/`QuestProgress` in `gameState.ts`; exported `QuestStatus`, `QuestEntry`, `QuestLog`
- [x] **11.4** Add quest `GameEvent` variants: `QUEST_ACCEPTED`, `QUEST_OBJECTIVE_UPDATED`, `QUEST_COMPLETED`, `QUEST_FAILED`; also added `ENEMY_KILLED`, `ITEM_COLLECTED`, `DIALOGUE_COMPLETED`, `TRAVEL_NODE_REACHED` trigger events to the union
- [ ] **11.5** Author initial quest data in `src/data/quests.ts` -- at minimum: 1 MAIN (KILL + TRAVEL per path), 2 COMPANION (TALK + INTERACT per path), 3 BOARD (repeatable, path-neutral); every MAIN chapter must have 3 resolution branches (Purifier / Pragmatist / Sovereign); 2 alignment-exclusive side quests per path -- **deferred** (pending Phase 23a + lore/world doc review)

### 11b. Core engine functions

- [x] **11.6** Implement `loadQuestDef(id): QuestDef` -- catalog lookup; throws on unknown id
- [x] **11.7** Implement `getAvailableQuests(gameState): QuestDef[]` -- prerequisites COMPLETED; not ACTIVE/COMPLETED unless BOARD with expired cooldown; FAILED BOARD quests reset immediately
- [x] **11.8** Implement `acceptQuest(gameState, defId)` -- prerequisite guard via getAvailableQuests(); creates ACTIVE entry with zeroed progress; handles BOARD re-accept (replace) vs first-time (append); emits `QUEST_ACCEPTED`
- [x] **11.9** Implement `updateObjective(gameState, defId, objectiveIndex, incrementBy)` -- clamps [0, required]; emits `QUEST_OBJECTIVE_UPDATED`; calls `checkQuestCompletion()` inline
- [x] **11.10** Implement `checkQuestCompletion(gameState, defId)` -- all objectives met -> `grantQuestReward()` -> COMPLETED; BOARD sets `cooldownExpiresOnDay`; emits `QUEST_COMPLETED`
- [x] **11.11** Implement `grantQuestReward(gameState, reward, defId)` -- gold + XP written to player; flagsSet merged into gameState.flags; reputationEvents dispatched via applyReputationEvent(); item stub TODO Phase 12
- [x] **11.12** Implement `failQuest(gameState, defId)` -- BOARD resets to AVAILABLE immediately; MAIN/COMPANION stay FAILED; emits `QUEST_FAILED`
- [x] **11.13** Implement `getQuestsByStatus(gameState, status): QuestEntry[]` pure helper
- [x] Implement `tickQuestCooldowns(gameState)` -- day-end step 7b; resets COMPLETED BOARD quests with expired `cooldownExpiresOnDay` back to AVAILABLE

### 11c. Objective event hooks (dispatcher wiring)

- [x] **11.14** Wire `ENEMY_KILLED` -> `updateObjective()` for KILL objectives matching `targetId` (all ACTIVE quests scanned)
- [x] **11.15** Wire `ITEM_COLLECTED` -> `updateObjective()` for COLLECT objectives matching `itemId`; increments by `event.quantity`
- [x] **11.16** Wire `DIALOGUE_COMPLETED` -> `updateObjective()` for TALK objectives matching `speakerNpcId`
- [x] **11.17** Wire `TRAVEL_NODE_REACHED` -> `updateObjective()` for TRAVEL objectives matching `worldNodeId`

### 11d. Mock data

- [x] **11.18** Replace old `QuestLog` in `mockGameState.ts` with `entries[]`; 2 ACTIVE (wolf hunt 2/5, act1 ch1 partial), 1 COMPLETED (herb gather with cooldown expiry day 7); typed as `satisfies QuestLog`

---

## Phase 12: Economy & Inventory Engine

> Engine file: `src/engines/economyEngine.ts`.
> PRD reference: §4.8.
> Static data: `src/data/items.ts`.

### 12a. State & schema

- [x] **12.1** Define `ItemDef` in `src/data/items.ts` -- `id`, `name`, `type: 'WEAPON' | 'ARMOR' | 'CONSUMABLE' | 'MATERIAL' | 'GIFT' | 'TOOL' | 'QUEST'`, `stackMax`, `baseBuyValue`, `baseSellValue`, `effects?: ItemEffect[]`; `ItemEffect` union: `HEAL | STAT_BOOST | GIFT_LOVE | STATUS_APPLY`
- [x] **12.2** Confirm `InventorySlot`, `inventory`, `inventorySlots`, `gold` on `PlayerCharacter` in `gameState.ts`; all present -- no changes needed
- [x] **12.3** Add economy `GameEvent` variants: `ITEM_ACQUIRED`, `ITEM_REMOVED`, `GOLD_CHANGED`, `INVENTORY_OVERFLOW`
- [x] **12.4** Author initial item catalog in `src/data/items.ts` -- 5 CONSUMABLE (4 intimacy consumables + heal potion), 3 MATERIAL, 2 GIFT, 6 TOOL (intimacy implements), 2 WEAPON stubs, 2 ARMOR stubs (20 items total)

### 12b. Core inventory functions

- [x] **12.5** Implement `getItemDef(id): ItemDef` pure lookup
- [x] **12.6** Implement `hasItem(gameState, itemId, quantity?): boolean` + `hasRoomForItem()`
- [x] **12.7** Implement `addItem(gameState, itemId, quantity, source): GameState` -- stacks existing slot; new slot if needed; overflow -> `convertToGold()`; emits `ITEM_ACQUIRED` + `ITEM_COLLECTED`
- [x] **12.8** Implement `removeItem(gameState, itemId, quantity, reason): GameState` -- guard insufficient; emits `ITEM_REMOVED`
- [x] **12.9** Implement `convertToGold(gameState, itemId, quantity): GameState` -- `qty x baseSellValue`; emits `GOLD_CHANGED` + `INVENTORY_OVERFLOW`
- [x] **12.10** Implement `getInventorySlots(gameState): number` pure derived -- `20 + 5 x max(0, manor.tier - 2)`
- [x] **12.11** Implement `consumeItem(gameState, itemId): GameState` -- guard type == CONSUMABLE; remove 1; apply `ItemEffect[]`; STATUS_APPLY deferred to Phase 14 (warns); emits `ITEM_REMOVED` CONSUMED

### 12c. Buy/sell functions

- [x] **12.12** Implement `buyItem(gameState, itemId, quantity, shopRegionId): GameState` -- `effectiveBuyPrice = ceil(baseBuyValue x priceMultiplier(tier))`; guard gold; deduct; `addItem()`; price table: Renowned 0.85 / Liked 0.92 / Neutral 1.0 / Disliked 1.10 / Infamous 1.25
- [x] **12.13** Implement `sellItem(gameState, itemId, quantity, shopRegionId): GameState` -- `effectiveSellPrice = floor(baseSellValue x sellDiscount(tier)) x qty`; add gold; `removeItem()` SOLD; discount table: Renowned 0.65 / Liked 0.57 / Neutral 0.50 / Disliked 0.43 / Infamous 0.35

### 12d. Gift & loot functions

- [x] **12.14** Implement `giveGift(gameState, itemId, npcId): GameState` -- guard GIFT type; `removeItem()` GIFTED; GIFT_LOVE effect adds bonus love delta on top of base +10 trust / +15 love; emits `RELATIONSHIP_STATUS_CHANGED` on band change
- [x] **12.15** Implement `resolveLootDrop(gameState, lootTable: LootTable): GameState` -- calls `resolveLoot()`; `addItem()` per entry; gold items credited directly; overflow auto-converted

### 12e. Dispatcher wiring

- [x] **12.16** Wire `USE_ITEM` intent -> `consumeItem()`; QUEST items blocked with narrative; non-consumable types rejected with narrative
- [x] **12.17** Wire `GIVE_GIFT` intent -> `giveGift()`; relationship events processed through `processEventQueue`

### 12f. Mock data

- [x] **12.18** Updated `mockGameState.ts` -- 7 slots (herb_basic, health_potion, iron_sword, leather_armor, gift_flower, condom, rope_silk); `gold: 340`; `inventorySlots: 20`

**Additional closures in this session:**
- [x] **11.11 (Phase 12 stub)** `grantQuestReward()` now calls `addItem()` for each `reward.items` entry (was TODO stub)
- [x] **10.10 (loot note)** `ENEMY_KILLED_IN_INTIMACY` dispatcher handler: loot table string-id stub annotated; full resolution deferred to Phase 17 (requires static loot registry keyed by id)

---

## Phase 13: Dialogue Engine

> Engine file: `src/engines/dialogueEngine.ts`.
> PRD reference: §4.11.
> Static data: `src/data/dialogueTrees.ts`, `src/data/dialogueFragments.ts`, `src/data/intimateResponseFragments.ts` (all new).
> Depends on: Phase 9 (relationship conditions), Phase 11 (`updateObjective` for TALK), `gameState.flags`.
>
> **Phase 13 complete.**
>
> **Implementation notes:**
> - Schema types (`DialogueEffect`, `DialogueCondition`, `DialogueChoice`, `DialogueNode`, `DialogueTree`, `DialogueState`) moved to `gameState.ts` (canonical); old `dialogueEngine.ts` stub re-exports them for backward compat.
> - `createEmptyDialogueState()` factory exported from `gameState.ts`; used by mock and save/load.
> - `dialogue: DialogueState` added to root `GameState`; `mockGameState.ts` initialised with `createEmptyDialogueState()`.
> - Three GameEvent variants added: `DIALOGUE_STARTED`, `DIALOGUE_CHOICE_MADE`, `DIALOGUE_EFFECT_APPLIED`. `DIALOGUE_COMPLETED` was already in the union (task 11.4); not duplicated.
> - `applyDialogueEffect` TRUST_DELTA/LOVE_DELTA delegates to `applyPostSceneRelationshipDelta()` (not `resolveSocialAction()` which doesn't accept delta params).
> - `endDialogue()` performs inline TALK objective update AND `incrementAchievementCounter('dialogues_completed')` -- self-contained for unit test isolation.
> - `buildIntimateKey()` VOCAL chain: race overlay interleaves race-prefixed key before each base key (not as a separate chain pass), deduplicating via Set would lose ordering; left as interleaved array with potential duplicates (benign -- first non-empty bucket wins).
> - Task 13.21 (INTIMACY_ACTION full wiring): `assembleIntimateResponse`, `deriveArousalBand`, `deriveShameTier` imported in dispatcher; `DispatchResult.intimateResponse` field added; full INTIMACY_ACTION intent handler deferred to Task 3c.4 (requires live scene state ref).
> - `mockDialogueNode.ts` updated: `speakerId: 'npc-elder'`, `onEnter: []`, effects converted from object to `DialogueEffect[]`.
> - Stub tree `generic_intro` TRUST_DELTA effect has `npcId: ''` -- caller must patch with actual `speakerNpcId` at dispatch time (noted in tree comment).
>
> **Fragment architecture:**
> - Non-intimate encounter responses (NPC greetings, social acks, encounter outcomes): hardcoded variants in `src/data/dialogueFragments.ts`. Non-quest buckets get 2-3 variants; quest buckets get 1. No template machinery.
> - Intimate encounter responses: composite-key + fallback-chain fragment repository in `src/data/intimateResponseFragments.ts` (separate from existing `intimacyFragments.ts`, which covers scene-level non-intimate fragments).
> - Five response layers: NARRATION, BODY_POSITION, BODY_ACTION, SFX, VOCAL, PLAYER_LINE.
> - Dispatcher assembles `IntimateResponse` from `assembleIntimateResponse()` after `resolveSceneAction()` returns context -- intimacy engine stays pure of fragment knowledge.
> - All fragment buckets stubbed empty at implementation time; content deferred to lore/world doc review session.

### 13a. State & schema

- [x] **13.1** Confirm `DialogueNode`, `DialogueChoice`, `DialogueCondition` in `gameState.ts` per PRD §4.11; add if absent -- add `speakerId: string` and `onEnter?: DialogueEffect[]` to `DialogueNode`; add `hidden?: boolean` to `DialogueChoice`; define `DialogueEffect` union: `SET_FLAG | TRUST_DELTA | LOVE_DELTA | GIVE_ITEM | TAKE_ITEM | START_QUEST`
- [x] **13.2** Define `DialogueState` -- `activeTreeId: string | null`, `currentNodeId: string | null`, `speakerNpcId: string | null`, `history: string[]`; add `dialogue: DialogueState` to root `GameState`; export `createEmptyDialogueState()` factory
- [x] **13.3** Add dialogue `GameEvent` variants: `DIALOGUE_STARTED` (`treeId`, `npcId`), `DIALOGUE_CHOICE_MADE` (`choiceIndex`, `nextNodeId`), `DIALOGUE_COMPLETED` (`treeId`, `npcId`), `DIALOGUE_EFFECT_APPLIED` (`effect: DialogueEffect`)

### 13b. Non-intimate fragment data file

- [x] **13.4** Create `src/data/dialogueFragments.ts` -- `DIALOGUE_FRAGMENTS: Record<string, string[]>` covering: NPC greetings (anonymous/named), social action acks (flirt/touch/gift), encounter outcomes (ambush/chest/trap, intimidate success/fail, flee success/fail). Non-quest keys: 2-3 variant strings stubbed empty; quest keys: 1 string stubbed empty. Export `pickDialogueFragment(key, rng?): string | undefined` with fallback to `'generic_greeting'` bucket. No authored content -- content session dependency noted in comments.

### 13c. Intimate response fragment data file

- [x] **13.5** Create `src/data/intimateResponseFragments.ts`. Define `IntimateResponseLayer` enum: `NARRATION | BODY_POSITION | BODY_ACTION | SFX | VOCAL | PLAYER_LINE`. Define `IntimateFragmentContext` interface with all selector variables:
  - `actionId: string` -- current action
  - `positionId: string` -- current position
  - `bodyZone: string` -- `action.bodyPartTargeted` (caller reads from action catalog)
  - `tecSuccess: boolean`
  - `arousalBand: 'low' | 'mid' | 'high' | 'edge'` -- derived: low 0-30, mid 31-65, high 66-85, edge 86-100
  - `wetnessLevel: WetnessLevel`
  - `shameTier: 'low' | 'mid' | 'high'` -- derived: low <30, mid 30-65, high >65
  - `isOrgasming: boolean`
  - `orgasmType?: OrgasmType`
  - `subspaceActive: boolean`
  - `neckGrabActive: boolean`
  - `postOrgasmState: PostOrgasmSensitivity`
  - `partnerEngagementStatus: PartnerEngagementStatus`
  - `sceneStartType: SceneStartType`
  - `resistanceProfileType: ResistanceProfileType`
  - `hiddenDesireAligned: boolean`
  - `playerBondType?: BondType`
  - `partnerRace?: Race`
  - `orgasmDeniedThisScene: boolean`
  - `consecutiveRepeatCount: number` -- from `IntimacyScene.consecutiveRepeatCount`; drives discovery/habituation/overstimulation tier: 1=`once`, 2=`repeat`, 3+=`extended`
  - `dirtyTalkTendency: DirtyTalkTendency` -- from `NpcPartnerProfile` vocal tendency; gates VOCAL bucket granularity
  - `vocalTendency: VocalTendency` -- controls volume and coherence tier selection
  Export `INTIMATE_RESPONSE_LIBRARY: Record<string, string[]>` (all buckets empty). Export `IntimateResponse` type: `{ narration?: string; bodyPosition?: string; bodyAction?: string; sfx?: string; vocal?: string; playerLine?: string }`. No authored content.

- [x] **13.6** Implement `buildIntimateKey(layer: IntimateResponseLayer, ctx: IntimateFragmentContext): string[]` -- returns fallback chain from most-specific to least-specific. Key format: `<layer>:<segment>:<segment>...` snake_case. Chain rules per layer:
  - **NARRATION**: `narration:<actionId>:tec_fail` (if !tecSuccess) -> `narration:<actionId>:engagement_<engagementStatus>` -> `narration:<actionId>` -> `narration:generic`
  - **BODY_POSITION**: `body_pos:<positionId>:arousal_<band>` -> `body_pos:<positionId>` -> `body_pos:generic` -- position framing, action-agnostic; picked once per position entry or re-entry, not every turn
  - **BODY_ACTION**: `body_act:<actionId>:orgasm:<orgasmType>` (if orgasming) -> `body_act:<actionId>:arousal_<band>:subspace` (if subspace) -> `body_act:<actionId>:arousal_<band>:<repeatTier>` -> `body_act:<actionId>:arousal_<band>` -> `body_act:<bodyZone>:arousal_<band>` -> `body_act:generic:arousal_<band>` -> `body_act:generic`; `repeatTier` = `once` (count=1) / `repeat` (count=2) / `extended` (count>=3)
  - **SFX**: `sfx:<actionId>:wetness_<wetnessLevel>` -> `sfx:<actionId>` -> `sfx:generic`
  - **VOCAL**: Race overlay (if `partnerRace` is a monster species): each step in chain is tried with `vocal:race_<race>:` prefix before the base key. Base chain: `vocal:<actionId>:orgasm:<orgasmType>` (if orgasming) -> `vocal:<actionId>:subspace` (if subspace) -> `vocal:<actionId>:shame_<shameTier>:arousal_<band>:<repeatTier>` -> `vocal:<actionId>:arousal_<band>:<repeatTier>` -> `vocal:<actionId>:arousal_<band>` -> `vocal:<actionId>` -> `vocal:generic:shame_<shameTier>:arousal_<band>` -> `vocal:generic`
  - **PLAYER_LINE**: `player:<actionId>:tec_fail` (if !tecSuccess) -> `player:<actionId>:arousal_<band>` -> `player:<actionId>` -> `player:generic` -- short assertive/dominant player line; omitted when `dirtyTalkTendency === None`

- [x] **13.7** Implement `pickIntimateFragment(layer, ctx, rng?): string | undefined` -- walks fallback chain from `buildIntimateKey()`; returns first non-empty bucket's random pick; returns `undefined` on total miss. Caller provides fallback placeholder string.

- [x] **13.8** Implement `assembleIntimateResponse(ctx: IntimateFragmentContext, rng?): IntimateResponse` -- calls `pickIntimateFragment` for all six layers; `BODY_POSITION` only called when `ctx.positionId` changed since last turn (caller passes `positionChanged: boolean` flag on ctx); `PLAYER_LINE` skipped when `ctx.dirtyTalkTendency === DirtyTalkTendency.None`; returns `IntimateResponse` with all fields optional. This is the single call-site for the intimacy view's scene narrative panel.

### 13d. Condition evaluator

- [x] **13.9** Implement `evaluateCondition(gameState, condition: DialogueCondition, npcId: string): boolean` pure -- `FLAG`: `gameState.flags[flagId] === value`; `TRUST`: contact trust >= min; `LOVE`: contact love >= min; `QUEST_STAGE`: ACTIVE quest with `objectiveProgress[0] >= stage`; `ITEM_IN_INV`: `hasItem(gameState, itemId)`; `COMPANION`: party contains/excludes `companionId`
- [x] **13.10** Implement `getAvailableChoices(gameState, node: DialogueNode, npcId: string): { choice: DialogueChoice; locked: boolean }[]` -- all non-hidden choices returned; `locked: true` when `evaluateCondition` fails; `hidden: true` choices excluded entirely

### 13e. Core engine functions

- [x] **13.11** Implement `startDialogue(gameState, treeId: string, npcId: string): { state: GameState; events: GameEvent[]; node: DialogueNode }` -- load tree via `getDialogueTree(treeId)`; guard existence + NPC in contacts; initialize `DialogueState`; if NPC `!hasBeenIntroduced`: call `individuateNpc()` (lazy individuation, closes task 3c.4 partial); apply `node.onEnter` effects; emits `DIALOGUE_STARTED`; returns current node for immediate render
- [x] **13.12** Implement `makeChoice(gameState, choiceIndex: number): { state: GameState; events: GameEvent[]; node: DialogueNode | null }` -- guard valid index + not locked via `evaluateCondition`; apply choice effects via `applyDialogueEffect()`; advance `currentNodeId`; push choice label to `history`; emits `DIALOGUE_CHOICE_MADE`; if `nextNodeId === 'END'`: calls `endDialogue()`, returns `node: null`; otherwise loads next node, applies `onEnter` effects, returns it
- [x] **13.13** Implement `applyDialogueEffect(gameState, effect: DialogueEffect): { state: GameState; events: GameEvent[] }` -- `SET_FLAG` -> `gameState.flags`; `TRUST_DELTA` / `LOVE_DELTA` -> `resolveSocialAction()` delta write; `GIVE_ITEM` -> `addItem()`; `TAKE_ITEM` -> `removeItem()`; `START_QUEST` -> `acceptQuest()`; emits `DIALOGUE_EFFECT_APPLIED`
- [x] **13.14** Implement `endDialogue(gameState): { state: GameState; events: GameEvent[] }` -- clears `DialogueState` to empty; emits `DIALOGUE_COMPLETED`; calls `updateObjective()` for all ACTIVE TALK objectives matching `speakerNpcId`; increments `ach_counter_dialogues_completed` via `incrementAchievementCounter()`
- [x] **13.15** Implement `getCurrentNode(gameState): DialogueNode | null` pure helper -- returns node at `dialogue.currentNodeId` from active tree, or `null` if no active dialogue
- [x] **13.16** Implement `getGenericDialogueTree(npcClass: string): string` -- returns class-level intro tree ID `'intro_<npcClass>'`; used as fallback when no companion-specific tree exists; called by dispatcher before `startDialogue()`
- [x] **13.17** Implement `getDialogueTree(treeId: string): DialogueTree` -- catalog lookup in `dialogueTrees.ts`; throws descriptive error on unknown id

### 13f. `dialogueTrees.ts` stub

- [x] **13.18** Create `src/data/dialogueTrees.ts` -- define `DialogueTree` type (`id`, `rootNodeId`, `nodes: Record<string, DialogueNode>`); export `DIALOGUE_TREES: Record<string, DialogueTree>` (empty catalog); export `getDialogueTree()` lookup. Seed three minimal stub trees with placeholder text: `generic_intro` (1 node, 2 choices: greet/dismiss), `elara_companion_ch1` (3 nodes, trust-locked branch at node 2), `quest_board_intro` (2 nodes, START_QUEST effect on choice 1). No authored content.

### 13g. Dispatcher wiring

- [x] **13.19** Wire `TALK` intent in `dispatcher.ts` -- resolve tree ID: check `DIALOGUE_TREES` for companion-specific tree keyed by `npcId`; fall back to `getGenericDialogueTree(npc.background.occupation)`; call `startDialogue()`; return `{ narrative, node }` in `DispatchResult`
- [x] **13.20** Wire `DIALOGUE_CHOOSE` intent -- extract `choiceIndex` from intent payload; call `makeChoice()`; return updated node or null in `DispatchResult`
- [x] **13.21** Wire `INTIMACY_ACTION` result path -- imports and `DispatchResult.intimateResponse` field added; full wiring deferred pending INTIMACY_ACTION intent implementation (Task 3c.4) in dispatcher to call `assembleIntimateResponse(ctx)` after `resolveSceneAction()` returns; build `IntimateFragmentContext` from scene + partner fields; attach `IntimateResponse` to `DispatchResult.intimateResponse`; `positionChanged` flag set by comparing `scene.activePositionId` before and after resolver
- [x] **13.22** Confirm `DIALOGUE_EFFECT_APPLIED` passes through `processEventQueue` to achievement checker; no new handler needed

### 13h. Mock data update

- [x] **13.23** Update `mockDialogueNode.ts` -- extend to full `DialogueNode` schema with `speakerId`, `onEnter: []`; confirm 3-choice mock (1 trust-locked, 1 flag-locked) still satisfies `DialogueView` render with updated type

---

## Phase 14: Status Effects Engine

> Engine file: `src/engines/statusEffectEngine.ts`.
> PRD reference: §4.13.
> Static data: `src/data/statusEffects.ts` (new file).
> Note: `ActiveStatusEffect` already on every `Character`; this phase implements the tick/apply/expire logic.

### 14a. State & schema

- [x] **14.1** Confirm `StatusEffectDef` and `ActiveStatusEffect` in `gameState.ts` per PRD §4.13; add if absent -- `StatusEffectDef`: `id`, `name`, `maxStacks`, `duration`, `onTick: StatusTickEffect[]`; `StatusTickEffect` union: `STAT_MULT | STAT_FLAT | DAMAGE_PER_TURN | HEAL_PER_TURN | AROUSAL_GAIN | SKIP_TURN`; types + catalog in `src/data/statusEffects.ts`; re-exported from engine
- [x] **14.2** Author initial catalog in `src/data/statusEffects.ts` -- `POISONED` (DAMAGE 5, 3t, stacks 1), `BURNING` (DAMAGE 8, 3t, stacks 3, refreshes on stack), `REGENERATING` (HEAL 10, 4t, stacks 1), `WEAKENED` (STR x0.7, 2t, stacks 1), `AROUSED` (AROUSAL_GAIN 10/t, 3t -- sexual attacks), `DEFENDED` (DEF x1.3, 1t, stacks 1), `STUNNED` (skip action via SKIP_TURN, 1t, stacks 1)
- [x] **14.3** Add status effect `GameEvent` variants: `STATUS_APPLIED`, `STATUS_TICKED`, `STATUS_EXPIRED`, `STATUS_STACKED`

### 14b. Core engine functions

- [x] **14.4** Implement `getStatusDef(id): StatusEffectDef` pure lookup (in statusEffects.ts; re-exported from engine)
- [x] **14.5** Implement `applyStatus(character, defId): { character; events }` -- if present: increment stacks to `maxStacks` + refresh turns, emit `STATUS_STACKED`; else append + emit `STATUS_APPLIED`; immutable return
- [x] **14.6** Implement `tickStatusEffects(character): { character; events: GameEvent[] }` -- apply each `StatusTickEffect`; decrement turns; remove at 0; emits `STATUS_TICKED` + `STATUS_EXPIRED` per removed entry; DAMAGE/HEAL scale with stack count
- [x] **14.7** Implement `hasStatus(character, defId): boolean` pure helper
- [x] **14.8** Implement `getStatusStacks(character, defId): number` pure helper -- 0 if absent
- [x] **14.9** Implement `removeStatus(character, defId): { character; events }` -- removes all stacks; emits `STATUS_EXPIRED`; no-op if absent
- [x] **14.10** Implement `clearAllStatuses(character): { character; events }` -- full rest (sleep); emits `STATUS_EXPIRED` per entry
- [x] **14.11** Implement `deriveEffectiveStats(character): CombatStats` -- pass 1 STAT_MULT (multiplicative, scales by stacks); pass 2 STAT_FLAT (additive); pure snapshot used by combat engine

### 14c. Combat engine integration

- [x] **14.12** Updated `combatEngine.ts`: `tickStatusEffects()` called at start of every actor's turn for all action types; STUNNED detected from pre-tick combatant (since tick expires 1t stun before check); stunned actor gets log entry + turn skipped
- [x] **14.13** Updated `resolveHit()`: calls `deriveEffectiveStats()` for both attacker and defender; dodge uses effective AGI, damage uses effective STR/DEF, crit uses effective LCK
- [x] **14.14** Added `statusEffectsApplied?: { defId: string; chance: number }[]` to `CombatAction`; `_applyDamage()` now accepts and applies these on non-dodged hits via `applyStatus()`; `economyEngine.consumeItem()` STATUS_APPLY branch wired to `applyStatus()` replacing console.warn stub
- [x] **14.15** Updated `applyFullRestoreToParty()` in `partyEngine.ts`: clears `activeStatusEffects: []` on player and all companions (sleep/full rest)

### 14d. Mock data

- [x] **14.16** `mockGameState.ts` player: `WEAKENED` (1 turn); `mockCombatState.ts` bandit: `BURNING` stacks 2, 2 turns (replaces non-catalog `bleed`); `StatusIconRow` renders both correctly

---

## Phase 15: Crafting & Equipment Engine

> Engine file: `src/engines/craftingEngine.ts`.
> PRD reference: §4.9.
> Static data: `src/data/recipes.ts` (new file).
> Depends on: Phase 12 (inventory), Phase 12 (`getInventorySlots` for Manor tier check), calendarEngine step 4 stub.
> **Phase 15 complete.**
>
> **Stat pipeline note (Phase 14 -> 16):** `deriveEffectiveStats()` (Phase 14) applies status-effect modifiers to base stats and is called per-hit in `combatEngine`. `applyPassiveSkills()` (Phase 16, task 16.11) applies skill STAT_BOOST and DAMAGE_MULTIPLIER on top of that output. The two functions compose cleanly because both return a plain `CombatStats` snapshot -- when Phase 16 lands, `resolveHit()` should call `applyPassiveSkills(gameState, deriveEffectiveStats(character))` rather than `deriveEffectiveStats(character)` alone. See task 16.14.
>
> **Phase 15 implementation notes:**
> - `upgradeLevel` placed on `InventorySlot` (not `ItemDef`) -- static catalog data is never mutated at runtime.
> - `RecipeDef` type owned by `craftingEngine.ts`; `src/data/recipes.ts` imports from engine (same pattern as items/statusEffects).
> - Absolute phase counter: `toAbsolutePhase(day, phase)` = `(day-1)*5 + PHASE_ORDER.indexOf(phase)` -- pure derivation exported from craftingEngine.
> - Equipment slot validity: WEAPON->WEAPON, OFF_HAND->WEAPON|TOOL, HEAD/CHEST/HANDS/LEGS->ARMOR.
> - Inventory-full on equip/unequip: emits EQUIP_SWAP_CONFIRM; player must send CONFIRM_EQUIP_SWAP to proceed with gold conversion.
> - `deriveEquipmentStatBonus()` added: reads equipped slots + upgradeLevel, returns flat CombatStats bonus for combat pipeline.
> - `deriveCraftingSlots(manorTier)`: <2=0, 2=1, 3=2, 4=3, 5+=4.

### 15a. State & schema

- [x] **15.1** Define `RecipeDef` in `craftingEngine.ts` (type) + `src/data/recipes.ts` (catalog) -- `id`, `name`, `ingredients[]`, `outputItemId`, `outputQuantity`, `requiredManorTier`, `craftingTimePhases`
- [x] **15.2** Define `CraftingJob` -- `recipeId`, `startedOnPhase`, `completesOnPhase`, `slotIndex`; define `CraftingQueue` -- `jobs: CraftingJob[]`, `maxSlots: number`
- [x] **15.3** Add `craftingQueue: CraftingQueue` to root `GameState`
- [x] **15.4** Add crafting + equipment `GameEvent` variants: `CRAFTING_STARTED`, `CRAFTING_COMPLETED`, `CRAFTING_FAILED`, `ITEM_EQUIPPED`, `ITEM_UNEQUIPPED`, `ITEM_UPGRADED`, `EQUIP_SWAP_CONFIRM`
- [x] **15.5** Define `EquipmentSlot` type; add `equipped: Partial<Record<EquipmentSlot, string>>` to `PlayerCharacter` and `PartyMember`; add `upgradeLevel?: number` to `InventorySlot`; removed old `equippedWeaponId`/`equippedArmorId` from `PartyMember`
- [x] **15.6** Author initial recipe catalog in `src/data/recipes.ts` -- 5 recipes: health_potion, lubricant (CONSUMABLE); iron_sword (WEAPON); leather_armor, chainmail (ARMOR)

### 15b. Crafting queue functions

- [x] **15.7** Implement `getRecipeDef(id): RecipeDef` pure lookup
- [x] **15.8** Implement `canCraft(gameState, recipeId): { eligible: boolean; reason?: string }` -- manor tier gate, ingredient check via `hasItem()`, slot count check
- [x] **15.9** Implement `startCraft(gameState, recipeId)` -- guard `canCraft()`; consume ingredients via `removeItem()`; compute `completesOnPhase = toAbsolutePhase() + craftingTimePhases`; append job; emits `CRAFTING_STARTED`
- [x] **15.10** Implement `resolveCraftingJobs(gameState)` -- resolves all jobs where `completesOnPhase <= nowPhase`; calls `addItem()`; emits `CRAFTING_COMPLETED`; wired into `calendarEngine.runDayEndTick()` step 4

### 15c. Equipment upgrade functions

- [x] **15.11** `upgradeLevel?: number` on `InventorySlot` (not `ItemDef`); effective stat = `baseStat + upgradeLevel` via `deriveEquipmentStatBonus()`
- [x] **15.12** Implement `getUpgradeFailRate(currentTier, hasAlchemyLab): number` -- 0%/15%/30%; halved with Alchemy Lab (manor tier 4+)
- [x] **15.13** Implement `upgradeItem(gameState, itemId, useAlchemyLab)` -- full guards; rolls failure; increments `upgradeLevel` on slot on success; item unchanged on failure; emits `ITEM_UPGRADED`
- [x] **15.14** Implement `equipItem(gameState, itemId, slot, targetId)` -- slot type validation via `SLOT_VALID_TYPES`; swap-out with inventory-full guard (emits `EQUIP_SWAP_CONFIRM` and blocks); `setEquipped()` internal helper
- [x] **15.15** Implement `unequipItem(gameState, slot, targetId)` -- inventory-full guard (same EQUIP_SWAP_CONFIRM flow); `addItem()` back on success

### 15d. Dispatcher wiring

- [x] **15.16** Wire `CRAFT` intent -> `startCraft()`
- [x] **15.17** Wire `EQUIP` -> `equipItem()`; `UNEQUIP` -> `unequipItem()`; `CONFIRM_EQUIP_SWAP` -> `confirmEquipSwap()` (new intent for gold-conversion confirmation)
- [x] **15.18** Wire `UPGRADE` -> `upgradeItem()` (Alchemy Lab gate inside engine)

**Additional closures in this session:**
- [x] `toAbsolutePhase(day, phase)` exported from `craftingEngine.ts` -- reusable absolute phase counter
- [x] `deriveCraftingSlots(manorTier)` exported -- pure slot count derivation
- [x] `deriveEquipmentStatBonus(gameState, targetId)` added -- pure stat bonus from equipped items + upgrade levels; composed with combat pipeline in Phase 16
- [x] `confirmEquipSwap()` added -- converts displaced item to gold then equips
- [x] `mockGameState.ts` updated -- `craftingQueue` added; `PartyMember.equipped` maps migrated; `iron_sword` slot has `upgradeLevel: 1`

---

## Phase 16: Skills & Abilities Engine

> Engine file: `src/engines/skillEngine.ts`.
> PRD reference: §4.12.
> Static data: `src/data/skills.ts` (new file).
> Depends on: Phase 14 (`applyStatus()` for STATUS_APPLY skill effects), Phase 12 (CPW cost is on player vitals).

> **Phase 16 complete.**
>
> **Implementation notes:**
> - `SkillDef` and `SkillEffect` defined in `skillEngine.ts` (engine owns the type; data catalog imports from it -- consistent with Phase 14/15 patterns).
> - `SKILL_UNLOCKED`, `SKILL_USED`, `SKILL_TREE_RESET` added to `GameEvent` union in `gameState.ts`.
> - Passive arousal bonus applies to ALL passive skills from ANY tree via `derivePassiveArousalBonus()` -- not ARDOR-specific. Any passive `AROUSAL_GAIN` effect (including theoretical BATTLE passives) is summed and applied.
> - `DAMAGE_MULTIPLIER` active skills: multiplier returned in `DispatchResult.pendingMultiplier`; client injects into next `FIGHT_ACTION` intent's `CombatAction.damageMultiplier` field. Never stored in `GameState`.
> - Stat pipeline final order: base stats -> `deriveEffectiveStats()` (status effects) -> `applyPassiveSkills()` (skill passives) -> `CombatAction.damageMultiplier` (active skill, one-shot).
> - `resolveSceneAction()` optional `gameState?` parameter preserves backward compat with existing callers.
> - `resetSkillTree()` refunds `unspentBP`/`unspentAP` only; `battlePoints`/`ardorPoints` (total earned) never decremented.
> - Skill catalog in `src/data/skills.ts` intentionally empty (SKILLS = {}); data authoring deferred pending lore/world doc review (same policy as task 11.5).

### 16a. State & schema

- [x] **16.1** Confirm `SkillDef` and `SkillEffect` interfaces -- defined in `skillEngine.ts`; `SkillDef`: `id`, `tree`, `name`, `isPassive`, `cpwCost?`, `pointCost`, `prerequisites[]`, `effects: SkillEffect[]`; `SkillEffect` union: `STAT_BOOST | DAMAGE_MULTIPLIER | AROUSAL_GAIN | STATUS_APPLY`
- [x] **16.2** Confirm `unlockedSkillIds`, `battlePoints`, `ardorPoints`, `unspentBP`, `unspentAP` on `PlayerCharacter` -- all present; no schema changes needed
- [x] **16.3** Add skill `GameEvent` variants: `SKILL_UNLOCKED` (`skillId`, `tree`), `SKILL_USED` (`skillId`, `cpwCost`), `SKILL_TREE_RESET` (`tree`, `pointsRefunded`) -- added to `gameState.ts`
- [ ] **16.4** Author initial skill catalog in `src/data/skills.ts` -- **deferred** (same policy as 11.5; pending lore/world doc review)

### 16b. Core engine functions

- [x] **16.5** Implement `getSkillDef(id): SkillDef` pure lookup
- [x] **16.6** Implement `canUnlock(gameState, skillId): { eligible: boolean; reason? }` -- prerequisites gate, points gate, already-unlocked gate
- [x] **16.7** Implement `unlockSkill(gameState, skillId)` -- deducts unspentBP or unspentAP; pushes to `unlockedSkillIds`; emits `SKILL_UNLOCKED`
- [x] **16.8** Implement `getUnlockedSkills(gameState): SkillDef[]`
- [x] **16.9** Implement `getActiveSkills(gameState): SkillDef[]`
- [x] **16.10** Implement `getPassiveSkills(gameState): SkillDef[]`
- [x] **16.11** Implement `applyPassiveSkills(gameState, baseCombatStats)` -- stacks `STAT_BOOST` additively; `DAMAGE_MULTIPLIER` multiplicatively; returns `{ stats, damageMultiplier }`
- [x] **16.12** Implement `useActiveSkill(gameState, skillId, target?)` -- CPW guard + deduction; `STATUS_APPLY` -> `applyStatus()`; `AROUSAL_GAIN` -> target arousal; `DAMAGE_MULTIPLIER` -> `pendingMultiplier` return field
- [x] **16.13** Implement `resetSkillTree(gameState, tree)` -- refunds `pointCost` sum to `unspentBP`/`unspentAP`; emits `SKILL_TREE_RESET`
- [x] **16.14b** Add `derivePassiveArousalBonus(gameState): number` -- sums all passive `AROUSAL_GAIN` effects across all trees

### 16c. Combat & intimacy integration

- [x] **16.14** Updated `combatEngine.ts`: `resolveHit()` now layers `applyPassiveSkills(gameState, deriveEffectiveStats(attacker))` for player-side attackers; `CombatAction.damageMultiplier` injected from dispatcher and applied as layer 3; flee counter-attack also updated
- [x] **16.15** Updated `resolveSceneAction()` in `intimacyEngine.ts`: `derivePassiveArousalBonus()` composited at step 12b as `passiveArousalMult = 1.0 + bonus`; optional `gameState?` param

### 16d. Dispatcher wiring

- [x] **16.16** Wire `USE_SKILL` intent -> `useActiveSkill()`; `pendingMultiplier` returned in `DispatchResult`
- [x] **16.17** Wire `UNLOCK_SKILL` intent -> `unlockSkill()`
- [x] **16.18** Wire `RESET_SKILL_TREE` intent -> `resetSkillTree()`

---

## Phase 17: World Map & Travel Engine

> Engine file: `src/engines/worldEngine.ts`.
> Static data: `src/data/worldGraph.ts`.
> PRD reference: §4.15.
> Depends on: Phase 10 (reputation), Phase 11 (`TRAVEL_NODE_REACHED` objective hook), Phase 8 (action counter).
> **Phase 17 complete.**
>
> **Implementation notes:**
> - No Dijkstra — fast travel is a direct teleport (discovery guard + gold cost). No pathfinding needed.
> - Fast travel cost: same-region = 5g (`FAST_TRAVEL_SAME_REGION_COST`); cross-region = 20g (`FAST_TRAVEL_CROSS_REGION_COST`); `WorldNode.fastTravelCost > 0` overrides both.
> - `MOVE` intent replaced by two distinct intents: `MOVE_TILE` (intra-location tile step) and `TRAVEL` (inter-node walk). `FAST_TRAVEL` added as third intent.
> - Two encounter layers: SPECIAL_ENCOUNTER (random roll on every `MOVE_TILE` step, non-safe nodes only) and ROAM_ENCOUNTER (real-time proximity, enemy-roam tick).
> - Enemy roam tick (`tickEnemyRoam`) is **pure and client-side** — called every 1 real second via `setInterval`; does not mutate `GameState`; client applies `newPositions` to its UI store.
> - Roam defs (`EnemyRoamDef[]`) use Chebyshev distance for radius checks (diagonal = cardinal).
> - `WorldState` gains `currentNodeId` (canonical) + `currentLocationId` (alias kept in sync), `lastSafeNodeId` + `lastSafeLocationId` alias, and `enemyRoamDefs: EnemyRoamDef[]`.
> - `calendarEngine.ts` fatigue collapse updated to set both `currentNodeId` and alias.
> - `TRAVEL_NODE_REACHED` event field renamed from `worldNodeId` → `nodeId`; dispatcher updated.
> - World graph stub: 5 nodes, 8 edges (bidirectional pairs). Full 81-node graph deferred to Task 17.DATA.
> - `SPECIAL_ENCOUNTER_CHANCE`: SAFE=0%, HUMANOID_ONLY=5%, UNSAFE=15%.
> - Task 8.8 (locationDefs/schedules wiring) partially closed — stubs were already no-ops; real data depends on Task 17.DATA.

### 17a. State & schema

- [x] **17.1** Define `WorldNode`, `WorldEdge`, `EnemyRoamDef` in `gameState.ts` + `src/data/worldGraph.ts` -- `WorldNode`: `id`, `name`, `regionId`, `isSafe`, `safetyTier`, `fastTravelCost`; `WorldEdge`: `fromId`, `toId`, `travelPhases`; `EnemyRoamDef`: `enemyId`, `spawnCoord`, `roamRadius`, `encounterRadius`
- [x] **17.2** `WorldState` updated -- `currentNodeId` (canonical) + `currentLocationId` (alias), `lastSafeNodeId` + `lastSafeLocationId` alias, `enemyRoamDefs: EnemyRoamDef[]`
- [x] **17.3** Travel `GameEvent` variants added -- `TRAVEL_STARTED`, `TRAVEL_NODE_REACHED` (canonical, `nodeId`), `SPECIAL_ENCOUNTER_ROLLED`, `ROAM_ENCOUNTER_TRIGGERED`, `FAST_TRAVEL_USED`, `LAST_SAFE_UPDATED`

### 17b. World graph data

- [x] **17.4** `src/data/worldGraph.ts` -- `WORLD_NODES[]`, `WORLD_EDGES[]`, `ENEMY_ROAM_DEFS` (keyed by locationId); `getWorldNode()`, `getEdge()`, `getEdgesFrom()`, `getAdjacentNodeIds()`, `getEnemyRoamDefs()` helpers; 5-node / 8-edge stub matching mock location IDs
- [ ] **17.DATA** Author full world graph (81 nodes, 92 edges), tile maps, and enemy roam defs per location -- **deferred pending lore/world doc review** (same policy as tasks 11.5, 16.4)

### 17c. Core engine functions

- [x] **17.5** `getAdjacentNodes(gameState)` pure helper -- reads `WORLD_EDGES` for direct neighbours
- [x] **17.6** `getCurrentNode(gameState)` + `getDiscoveredNodes(gameState)` pure helpers
- [x] **17.7** `updateLastSafeLocation(gameState, nodeId)` -- only updates when `isSafe`; emits `LAST_SAFE_UPDATED`
- [x] **17.8** `enterNode(gameState, nodeId)` internal -- updates node/alias fields, discovers node, loads roam defs, resets occupant positions to spawn points, calls `updateLastSafeLocation`, emits `TRAVEL_NODE_REACHED`
- [x] **17.9** `travelToAdjacent(gameState, targetNodeId)` -- adjacency guard; increments action count per phase consumed; phase-based encounter roll (SPECIAL_ENCOUNTER_CHANCE per destination safetyTier) only when either node is non-safe; stops on encounter; calls `enterNode` on clean arrival; emits `TRAVEL_STARTED`
- [x] **17.10** `fastTravel(gameState, targetNodeId)` -- discovery guard; same/cross-region gold cost; deducts gold; 1 action; calls `enterNode`; emits `FAST_TRAVEL_USED`; no encounters
- [x] **17.11** `moveTile(gameState, targetCoord)` -- cardinal adjacency + passability guards; updates `occupantPositions`; increments action; special encounter roll; roam-proximity check (player stepped into enemy radius → `ROAM_ENCOUNTER_TRIGGERED`, `enemyInitiated: false`)
- [x] **17.12** `tickEnemyRoam(playerCoord, positions, roamDefs, isTilePassable)` -- pure client-side function; random cardinal walk within `roamRadius`; proximity check after move; returns `{ newPositions, encounterTriggered, enemyId, enemyInitiated: true }`
- [x] **17.13** `checkEncounterProximity(playerCoord, positions, roamDefs)` -- pure helper; returns first enemy within `encounterRadius`

### 17d. Dispatcher wiring

- [x] **17.14** Wire `MOVE_TILE` intent -> `moveTile()`
- [x] **17.15** Wire `TRAVEL` intent -> `travelToAdjacent()`
- [x] **17.16** Wire `FAST_TRAVEL` intent -> `fastTravel()`
- [x] **17.17** `TRAVEL_NODE_REACHED` event handler in `processEventQueue` updated to use canonical `nodeId` field (was `worldNodeId`)

### 17e. Mock data update

- [x] **17.18** `mockGameState.ts` -- `WorldState` updated with `currentNodeId`, `lastSafeNodeId`, `enemyRoamDefs: []`

**Additional closures in this session:**
- [x] `calendarEngine.ts` fatigue collapse -- now sets both `currentNodeId` + `currentLocationId` alias on teleport to last safe location (task 8.8 partially closed)
- [x] `TRAVEL_NODE_REACHED` duplicate removed from `GameEvent` union; Phase 17 canonical variant (`nodeId`) is the sole definition

---

## Phase 18: Pregnancy & Offspring Engine

> Engine file: `src/engines/pregnancyEngine.ts`.
> PRD reference: §4.16.
> Depends on: NPC spawn engine (offspring stat generation), calendarEngine steps 2 stub.
> **Phase 18 complete.**
>
> **Implementation notes:**
> - `PregnancyStage` enum already existed in `enums.ts`; not re-defined.
> - `PregnancyState` is an inline optional field on `NpcCharacter` (`pregnancyState?: PregnancyState`); undefined = not pregnant and not pending check. All five fields (`pregnancyWeek`, `stage`, `fatherId`, `conceptionDay`, `pregnantFlaggedToday`) co-located in this object.
> - `lactationActive?: boolean` added directly to `NpcCharacter` (typed unknown physiology until Task 3a.8 precludes embedding it there).
> - `OffspringRecord` is read-only and lives in `gameState.offspring: OffspringRecord[]`; it is not a live character.
> - `FertilityRating` enum → roll table: Low=10%, Moderate=25%, High=45%, VeryHigh=65%.
> - `PREGNANCY_WEEK_TO_STAGE`: weeks 0-2=EarlyFirst, 3-4=LateFirst, 5-6=EarlySecond, 7-8=LateSecond, 9-10=EarlyThird, 11=LateThird, 12=FullTerm (triggers birth).
> - `resolveBirth()` is called inline by `tickPregnancy()` when week reaches 12; not exported separately.
> - `patchNpcInContacts()` is an internal helper used by all three public functions for immutable NPC write-back.
> - Newly-conceived NPCs skip the pregnancy tick on the same day (`conceptionDay === calendar.day` guard in `tickPregnancy`).
> - `END_SCENE` intent added to `dispatcher.ts`; `flagPregnancyRisk()` called when `persistence.pregnancyCheck === true`. Condom gate is already handled by the intimacy engine (`blockPregnancyCheck` consumable effect sets `pregnancyCheck=false` in `SceneEndPersistence`).
> - `SceneEndPersistence` imported as a type from `intimacyEngine.ts` in dispatcher.

### 18a. State & schema

- [x] **18.1** Define `PregnancyStage` enum -- already in `enums.ts`; `PREGNANCY_WEEK_TO_STAGE` map defined in `pregnancyEngine.ts`
- [x] **18.2** Define `PregnancyState` on `NpcCharacter` -- `pregnancyWeek`, `stage`, `fatherId`, `conceptionDay`, `pregnantFlaggedToday` as inline optional block
- [x] **18.3** Define `OffspringRecord` -- all fields present; `offspring: OffspringRecord[]` added to root `GameState`; `mockGameState.ts` seeded with `offspring: []`
- [x] **18.4** Add pregnancy `GameEvent` variants: `CONCEPTION_CHECK_PASSED`, `PREGNANCY_STAGE_ADVANCED`, `BIRTH_OCCURRED`, `LACTATION_STARTED`

### 18b. Core engine functions

- [x] **18.5** Implement `checkConception(gameState, npcId)` -- day-end step 2; guards already-pregnant; reads `fertilityRating` via type assertion; rolls from `FERTILITY_ROLL` table; clears flag always; emits `CONCEPTION_CHECK_PASSED` on success
- [x] **18.6** Implement `tickPregnancy(gameState)` -- day-end step 2; skips newly-conceived (same-day guard); increments week; updates stage; emits `PREGNANCY_STAGE_ADVANCED` on stage change; calls `resolveBirth()` at week 12
- [x] **18.7** Implement `resolveBirth()` (internal) -- resets `pregnancyState` to undefined; generates offspring stats (average ±10% variance); rolls alignment; creates `OffspringRecord`; sets `lactationActive = true`; emits `BIRTH_OCCURRED` + `LACTATION_STARTED`
- [x] **18.8** Implement `flagPregnancyRisk(gameState, npcId)` -- sets `pregnantFlaggedToday = true`; preserves existing pregnancy data if already pregnant

### 18c. Day-end wiring

- [x] **18.9** Wire `checkConception()` + `tickPregnancy()` into `calendarEngine.runDayEndTick()` step 2 -- Phase A loops flagged NPCs calling `checkConception()`; Phase B calls `tickPregnancy()` for all pregnant NPCs; `END_SCENE` intent wired in dispatcher

---

## Phase 19: Manor & Passive Gen Engine

> Engine file: `src/engines/manorEngine.ts`.
> PRD reference: §4.17.
> Depends on: Phase 12 (`addItem()` for passive gen output), calendarEngine steps 5 and 6 stubs.
> **Phase 19 complete.**
>
> **Implementation notes:**
> - `ManorState` was already correct in `gameState.ts`; no schema changes needed. `constructionTimerDays` (days, not phases) is the authoritative field -- all three files were consistent.
> - `SuiteRecord[]` replaced by `suiteAssignments: Record<string, string>` (suiteId -> npcId) -- simpler, already in the schema.
> - `SUITE_UNLOCK_TABLE` expressed as the `suiteCount` field on `MANOR_TIERS` (`ManorTierDef[]`) -- no separate constant needed.
> - `MANOR_TIER_FEATURES` expressed as the `features: string[]` field on `MANOR_TIERS`; `hasFeature()` and `getCurrentTierDef()` helpers exported.
> - Gold generation is direct credit to `player.gold` at day-end; `passiveResourceQueue` reserved for future item drops only (Tasks 3a.8 / 16.4).
> - Gold formula per suite: `(5 * manor.tier) + (2 * npc.companionLevel)`; item drops deferred.
> - `vacateSuite()` added (not in original spec) -- needed for full `SUITE_VACATED` lifecycle.
> - `collectPassiveResources()` is a no-op until item drops land; queue always empty until then.
> - `mockGameState.ts` bumped to tier 2; Elara assigned to suite_1; `craftingQueue.maxSlots` corrected to 1.
> - 5 GameEvent variants added to union in `gameState.ts`.

### 19a. State & schema

- [x] **19.1** Confirm `ManorState` in `gameState.ts` -- `tier: number` (1-6), `constructionTimerDays: number` (days remaining), `suiteAssignments: Record<string, string>` (suiteId -> npcId), `passiveResourceQueue: PassiveResource[]`; already present, no changes needed
- [x] **19.2** `SUITE_UNLOCK_TABLE` -- expressed as `suiteCount` on `MANOR_TIERS` (`ManorTierDef[]`); tier 2: 1 / tier 3: 3 / tier 4: 5 / tier 5: 8 / tier 6: unlimited; `suiteCapacity()` helper exported
- [x] **19.3** `MANOR_TIER_FEATURES` -- expressed as `features: string[]` on `MANOR_TIERS`; `hasFeature(manor, featureId): boolean` and `getCurrentTierDef(manor)` exported from `manorEngine.ts`
- [x] **19.4** Added manor `GameEvent` variants: `MANOR_UPGRADE_STARTED` (`fromTier`, `toTier`, `timerDays`, `goldCost`), `MANOR_UPGRADE_COMPLETED` (`newTier`), `SUITE_ASSIGNED` (`suiteId`, `npcId`), `SUITE_VACATED` (`suiteId`, `npcId`), `PASSIVE_GEN_TICK` (`goldGenerated`, `itemsQueued`)

### 19b. Core engine functions

- [x] **19.5** Implement `startUpgrade(gameState)` -- guards: already at max tier, construction in progress, insufficient gold; deducts gold; sets `constructionTimerDays`; emits `MANOR_UPGRADE_STARTED`
- [x] **19.6** Implement `tickConstruction(gameState)` -- day-end step 5; decrements `constructionTimerDays` by 1; at 0: increments `tier`; emits `MANOR_UPGRADE_COMPLETED`; wired into `calendarEngine.runDayEndTick()` step 5
- [x] **19.7** Implement `assignSuite(gameState, suiteId, npcId)` -- guards: tier has suites, suiteId within capacity, NPC exists, NPC not already assigned; auto-vacates previous occupant; emits `SUITE_ASSIGNED` (and `SUITE_VACATED` on swap)
- [x] **19.8** Implement `vacateSuite(gameState, suiteId)` -- guard: suite must be occupied; removes occupant from `suiteAssignments`; emits `SUITE_VACATED`
- [x] **19.9** Implement `generatePassiveResources(gameState)` -- day-end step 6; per occupant: gold = `(5 * tier) + (2 * companionLevel)` credited directly to `player.gold`; emits `PASSIVE_GEN_TICK`; item drops deferred to Tasks 3a.8 / 16.4
- [x] **19.10** Implement `collectPassiveResources(gameState)` -- flushes `passiveResourceQueue` (no-op until item drops land); clears queue

### 19c. Dispatcher wiring

- [x] **19.11** Wire `BUILD` intent -> `startUpgrade()`; gold guard narrative on failure
- [x] **19.12** Wire `ASSIGN_SUITE` intent -> `assignSuite()`; `VACATE_SUITE` intent -> `vacateSuite()`
- [x] **19.13** Wire `COLLECT_RESOURCES` intent -> `collectPassiveResources()`

### 19d. Mock data

- [x] **19.14** `mockGameState.ts` -- manor bumped to tier 2; Elara assigned to `suite_1`; `craftingQueue.maxSlots` corrected to 1; comment documents expected passive gen yield (16 gold/day)

---

## Phase 20: Achievement Engine

> Engine file: `src/engines/achievementEngine.ts`.
> PRD reference: §4.14.
> Static data: `src/data/achievements.ts` (new file).
> Depends on: all event-emitting engines (achievements are triggered by game events); Phase 16 for AP/BP grants.
> Also closes task 2.29 -- achievement list authored in this phase.

> **Phase 20 complete.**
>
> **Implementation notes:**
> - `AchievementDef` and `AchievementCondition` union owned by `achievementEngine.ts`; `src/data/achievements.ts` imports the type and exports `ACHIEVEMENT_CATALOG` (same data/engine pattern as skills/statusEffects).
> - `AchievementEntry` is minimal: `defId` + `unlockedOnDay`. No `status` field -- LOCKED is implied by absence. Only UNLOCKED entries stored.
> - Condition types: `EVENT` (matches against event batch), `FLAG`, `STAT_THRESHOLD`, `COUNT` (via `flags['ach_counter_<counterId>']`), `COMPOUND` (AND of sub-conditions).
> - `checkAchievements(state, batch)` receives the full event batch; builds a `Set<string>` of event types for O(1) EVENT lookups.
> - Single post-loop hook in `processEventQueue()` -- not per-intent, not per-event-case; always the last mutation applied.
> - `ACHIEVEMENT_UNLOCKED` GameEvent upgraded from vestigial stub to full payload: `defId`, `tier`, `reward` -- no second catalog lookup needed by UI.
> - `hasAchievement()` added as a convenience read helper.
> - Catalog data deferred to lore/world doc review session (same policy as tasks 11.5, 16.4, 17.DATA).

### 20a. State & schema

- [x] **20.1** Define `AchievementDef` in `achievementEngine.ts` (type) + `src/data/achievements.ts` (catalog) -- `id`, `tier: AchievementTier`, `title`, `description`, `condition: AchievementCondition`, `reward`; `AchievementCondition` union: `EVENT | FLAG | STAT_THRESHOLD | COUNT | COMPOUND`
- [x] **20.2** Define `AchievementEntry` runtime state -- `defId`, `unlockedOnDay`; add `achievements: AchievementEntry[]` to root `GameState`; re-exported from `gameState.ts`
- [x] **20.3** Add achievement `GameEvent` variant: `ACHIEVEMENT_UNLOCKED` (`defId`, `tier`, `reward`) -- replaces vestigial stub variant
- [ ] **20.4** Author full achievement catalog in `src/data/achievements.ts` -- **deferred pending lore/world doc review** (same policy as tasks 11.5, 16.4, 17.DATA)

### 20b. Core engine functions

- [x] **20.5** Implement `getAchievementDef(id): AchievementDef` pure lookup
- [x] **20.6** Implement `evaluateAchievementCondition(gameState, condition): boolean` -- `EVENT` always false here; `FLAG`, `STAT_THRESHOLD`, `COUNT`, `COMPOUND` all evaluate against current state
- [x] **20.7** Implement `checkAchievements(gameState, batch): { state, events }` -- iterates catalog; EVENT matched against batch Set; COUNT/FLAG/STAT evaluated against state; calls `grantAchievement()` per hit; idempotent (alreadyUnlocked Set prevents double-grant within one call)
- [x] **20.8** Implement `grantAchievement(gameState, defId): { state, events }` -- appends `AchievementEntry`; grants AP/BP to unspent pools; writes titleToken to flags; emits `ACHIEVEMENT_UNLOCKED`; idempotent (no-op if already unlocked)
- [x] **20.9** Implement `getUnlockedAchievements(gameState): AchievementEntry[]` + `hasAchievement(gameState, defId): boolean` pure helpers
- [x] **20.10** Implement `incrementAchievementCounter(gameState, counterId): { state, events }` -- increments `flags['ach_counter_<counterId>']`; calls `checkAchievements()` with empty batch after increment

### 20c. Dispatcher wiring

- [x] **20.11** `checkAchievements(state, events)` called once at the end of `processEventQueue()` -- single post-loop hook; `ACHIEVEMENT_UNLOCKED` events appended after main loop so they never trigger re-entrant processing

---

## Phase 21: Contact & Profile Engine

> Engine file: `src/engines/contactEngine.ts` (thin aggregation layer, no new state).
> PRD reference: §4.19.
> Depends on: all NPC state fields already on `NpcCharacter`; no new data needed.
> **Phase 21 complete.**
>
> **Implementation notes:**
> - No new `GameState` fields; engine is a pure aggregation read layer.
> - `ContactProfileView` defined as a local `type` (not `interface`) in `gameState.ts` -- view model, never stored in state.
> - `assembleProfileView()` returns `null` when the NPC isn't found; dispatcher returns `contactProfile: null` with a narrative line.
> - Spawn-engine fields still typed `unknown` are passed through as-is; UI casts once Task 3a.8 resolves them.
> - `isVirgin` derived from `history.totalEncounterCount === 0` (undefined history treated as 0).
> - `getContactsByLocation()` accepts an optional `schedules` registry; falls back to treating `npc.scheduleId === nodeId` when omitted (pre-data phase).
> - `INSPECT_CONTACT` returns `contactProfile` in `DispatchResult` only; never written to `GameState`.

### 21a. Core aggregation functions

- [x] **21.1** Implement `assembleProfileView(gameState, npcId): ContactProfileView` -- aggregates all display fields for `ContactsView` into a single flat object; no new state; purely reads from `NpcCharacter`:
  - Tab 1 (Social/Bio): `trust`, `love`, `getRelationshipStatus()`, `playerBondType`, `background.occupation`, `background.regionOfOrigin`, parent names from `history`
  - Tab 2 (Physical/Physiology): `measurements`, cup size, `physicalDetail`, virginity status (`history.totalEncounterCount === 0`), pregnancy stage, lactation status
  - Tab 3 (Psychology): `personality` Big Five traits, `sexualPsychology.acquiredKinks`, `sexualPsychology.resistanceProfile.profileType`
- [x] **21.2** Implement `sortContacts(gameState): ContactRecord[]` pure helper -- primary sort: companion quest milestone stage (companions first, higher stage first); secondary sort: relationship magnitude (`trust + love` descending)
- [x] **21.3** Implement `getContactCount(gameState): number` pure helper -- `gameState.contacts.length`; referenced before `tryAddContact()` to enforce cap
- [x] **21.4** Implement `findContact(gameState, npcId): NpcCharacter | undefined` pure helper -- looks up by `npcId` through `contacts`
- [x] **21.5** Implement `getContactsByLocation(gameState, nodeId): NpcCharacter[]` pure helper -- uses `resolveNpcLocation()` from `npcPopulationEngine`; used by `InspectorLens` to populate entity stack

### 21b. Define `ContactProfileView` type

- [x] **21.6** Define `ContactProfileView` interface in `gameState.ts` -- flat union of all fields needed by the three `ContactsView` sub-tabs; avoids re-deriving per tab render; document that this is a view model (never stored in `GameState`)

### 21c. Dispatcher wiring

- [x] **21.7** Wire `INSPECT_CONTACT` intent in `dispatcher.ts` -> `assembleProfileView()`; returned as part of intent response payload (not stored in `GameState`)

---

## Phase 22: Save/Load Engine

> Engine file: `src/engines/saveEngine.ts`.
> PRD reference: §4.18.
> Depends on: entire `GameState` schema being stable; should be implemented last.
> **Phase 22 complete.**
>
> **Implementation notes:**
> - Save envelope: `{ schemaVersion, savedAt, gameState }` -- version lives outside `GameState` so migration can inspect before touching engine code.
> - `gameStateReplacer`/`gameStateReviver` are no-ops today (Phase 1 already converted `Set<T>` to `T[]`); kept as extension hooks.
> - Atomic write: `.tmp` file then `fs.renameSync()` -- prevents corruption on write failure.
> - Per-slot `.meta.json` written alongside every save for quick UI display (Continue / Load screens).
> - `AUTOSAVE_SLOT = 99`; `deleteSave()` hard-blocks slot 99.
> - Autosave wired into `calendarEngine.runDayEndTick()` step 10 (after step 9 social tick); error swallowed -- non-fatal.
> - NG+: resets world/quests/calendar/contacts/reputation/manor/offspring/flags; preserves level, unlockedSkillIds, achievements, 50% gold carry-over; returned via `DispatchResult.loadedState` (same pattern as LOAD_GAME).
> - `SaveMeta` re-exported from `gameState.ts` so UI can import from central state module.
> - `DispatchResult` extended with `loadedState?: GameState` and `saves?: SaveMeta[]`.

### 22a. Serialization

- [x] **22.1** Define `SAVE_SCHEMA_VERSION` constant (start at `1`); add `schemaVersion: number` to the save file wrapper (not inside `GameState`)
- [x] **22.2** Implement `gameStateReplacer(key, value)` JSON replacer -- no-op replacer needed since `Set<T>` was already converted to `T[]` in Phase 1 (task 1.11); verify no remaining `Set` fields exist in the full schema; document replacer as a future hook for any new complex types
- [x] **22.3** Implement `gameStateReviver(key, value)` JSON reviver -- re-hydrates any fields that need special post-parse treatment (dates as numbers are already fine; `Set` already arrays); verify correctness on a full round-trip
- [x] **22.4** Implement `serializeGameState(gameState): string` -- `JSON.stringify(gameState, replacer, 2)` wrapped in save file envelope `{ schemaVersion, savedAt: Date.now(), gameState }`
- [x] **22.5** Implement `deserializeGameState(raw: string): GameState` -- parse envelope; check `schemaVersion`; if version mismatch call `migrateSave()`; apply reviver; validate top-level required fields exist; throw descriptive error on malformed save

### 22b. Persistence functions

- [x] **22.6** Implement `saveGame(gameState, slot: number): void` -- `slot` range 0-9 (manual) + slot 99 (autosave); atomic write: write to `saves/slot_<N>.tmp` then rename to `saves/slot_<N>.json`; prevents corruption on write failure; on success write `saves/slot_<N>.meta.json` with `{ slot, savedAt, day, location, playerLevel }`
- [x] **22.7** Implement `loadGame(slot: number): GameState` -- read `saves/slot_<N>.json`; call `deserializeGameState()`
- [x] **22.8** Implement `listSaves(): SaveMeta[]` -- reads all `.meta.json` files in `saves/`; returns array sorted by `savedAt` descending; used by Continue and Load screens
- [x] **22.9** Implement `deleteSave(slot: number): void` -- deletes `.json` + `.meta.json` for slot; guard: slot 99 (autosave) cannot be manually deleted

### 22c. Migration

- [x] **22.10** Implement `migrateSave(raw: object, fromVersion: number): object` -- switch on `fromVersion`; currently a no-op (v1 to v1); add migration steps here as schema evolves; migrations are additive (fill missing fields with defaults)

### 22d. Autosave hook

- [x] **22.11** Wire autosave into `calendarEngine.runDayEndTick()` after all tick steps complete (after step 9) -- calls `saveGame(gameState, 99)`; autosave only runs at Midnight day-end

### 22e. New Game+ guard

- [x] **22.12** Implement `isNewGamePlusEligible(gameState): boolean` -- checks `gameState.flags['game_cleared'] === true`; used by `TitleScreenView` to show/hide the New Game+ option
- [x] **22.13** Implement `startNewGamePlus(gameState): GameState` -- requires explicit confirmation intent; resets world/quest/calendar/contacts/reputation/manor to initial values; preserves `player.level`, `player.unlockedSkillIds`, `player.gold` (50% carry-over), and `achievements`; emits no events (clean slate)

---

## Phase UI: Frontend (PRD §4.21)

> Mock-first: all views render from mockGameState before any backend is wired.
> Build order: Store -> Mock -> Components -> HUD -> Overworld -> Combat -> Intimacy -> Dialogue -> Menus -> Integration.

### UI-0. Project setup

- [ ] **UI-0.1** Install frontend dependencies: `react`, `react-dom`, `react-router-dom`, `zustand`, `tailwindcss`, `@trpc/client`, `@trpc/react-query`
- [ ] **UI-0.2** Configure Tailwind CSS with dark-fantasy CSS variable palette
- [ ] **UI-0.3** Configure React Router v6 -- routes wired in `App.tsx` (done)
- [ ] **UI-0.4** Set up Vite to serve the React client with HMR

### UI-1. Zustand store & hooks

- [x] **UI-1.1** `src/client/store/gameStore.ts`
- [x] **UI-1.2** `src/client/hooks/useGameState.ts`
- [x] **UI-1.3** `src/client/hooks/usePlayer.ts`
- [x] **UI-1.4** `src/client/hooks/useParty.ts`
- [x] **UI-1.5** `src/client/hooks/useCalendar.ts`
- [x] **UI-1.6** `src/client/hooks/useContacts.ts` + `useFindContact`
- [x] **UI-1.7** `src/client/hooks/useIntent.ts`
- [x] **UI-1.8** `src/client/hooks/useCombat.ts`
- [x] **UI-1.9** `src/client/hooks/useIntimacy.ts`
- [x] **UI-1.10** `src/client/hooks/useDialogue.ts`

### UI-2. Mock game state

- [x] **UI-2.1** `src/client/mock/mockGameState.ts` -- Day 4 Afternoon, player level 3, 2 companions, 3 contacts, 2 quests
- [x] **UI-2.2** `src/client/mock/mockCombatState.ts` -- player + Elara vs wolf + bandit, round 2
- [x] **UI-2.3** `src/client/mock/mockIntimacyScene.ts` -- CONSENSUAL scene with Elara, turn 5
- [x] **UI-2.4** `src/client/mock/mockDialogueNode.ts` -- 3 choices, one trust-locked, one flag-locked
- [x] **UI-2.5** `App.tsx` loads mock state into store when `VITE_USE_MOCK=true`

### UI-3. Component primitives

- [x] **UI-3.1** `StatBar`
- [x] **UI-3.2** `Portrait`
- [x] **UI-3.3** `Panel`
- [x] **UI-3.4** `Button` (with disabled tooltip)
- [x] **UI-3.5** `ActionButton` (CPW/STA cost badge)
- [x] **UI-3.6** `StatusIcon` + `StatusIconRow`
- [x] **UI-3.7** `PhaseIndicator`
- [x] **UI-3.8** `NarrativeLog` (auto-scroll)
- [x] **UI-3.9** `ChoiceButton` (trust/love delta preview on hover)
- [x] **UI-3.10** `RelationshipMeter` (threshold markers at -25, 25, 75)

### UI-4. HUD (persistent overlay)

- [x] **UI-4.1-4.4** Player vitals (HP/STA/CPW), party strip, phase indicator, gold -- all in `HudShell`
- [x] **UI-4.5** `HudShell` -- fixed top bar; wired to `usePlayer`, `useParty`, `useCalendar`; menu button
- [x] **UI-4.6** Renders from mock state; null-safe loading state

### UI-5. Unified Spatial Exploration view

> `OverworldView.tsx` superseded by 30x30 tile grid design.

- [x] **UI-5.1** Define `TileMap`, `TileCell`, `TileCoord`, `TileTerrainType`, `OccupantPositions` in `gameState.ts`
- [x] **UI-5.2** Add `tileMap: TileMap` and `occupantPositions: OccupantPositions` to `WorldState`
- [x] **UI-5.3** Author mock tile map for `village_square` in `mockGameState.ts`
- [ ] **UI-5.4** Build `TileCell` component -- renders terrain variant, wall/edge disabled state, occupant badge layer
- [ ] **UI-5.5** Build `OccupantBadge` component -- stacked entity counter; player avatar on top, "+N" label for extras
- [ ] **UI-5.6** Build `TileGrid` component -- 30x30 grid of `TileCell`; accepts `TileMap` + `OccupantPositions`; highlights player tile
- [ ] **UI-5.7** Build `InspectorLens` sidebar -- entity stack accordion (NPC social row / monster combat row), manor workspace slot, phase-advance/sleep button (safety-tier aware), last-5 context log
- [ ] **UI-5.8** Build `SafetyTierBadge` component -- Secure/Fortified/Perilous token
- [ ] **UI-5.9** Assemble `SpatialExplorationView.tsx` -- `TileGrid` left + `InspectorLens` right; Location & Safety header
- [ ] **UI-5.10** Renders from `mockGameState` + `mockTileMap`; clicking a tile updates Inspector Lens context
- [ ] **UI-5.11** Update `MenuShell.tsx` to 2-tab layout (Inventory + Quests only); remove Skills/Contacts/Manor tabs

### UI-6. Combat view

- [x] **UI-6.1-6.4** Initiative strip, combatant panels, action bar, purification bar -- in `CombatView`
- [x] **UI-6.5** `CombatView` -- wired to `useCombat`
- [x] **UI-6.6** Renders from `mockCombatState`; player/enemy panels distinguished

### UI-7. Intimacy view

- [x] **UI-7.1-7.4** Partner panel, position picker, action picker, scene status bar -- in `IntimacyView`
- [x] **UI-7.5** `IntimacyView` -- wired to `useIntimacy`, `useFindContact`
- [x] **UI-7.6** Renders from `mockIntimacyScene`

### UI-8. Dialogue view

- [x] **UI-8.1-8.3** Speaker portrait, dialogue text panel, choice buttons -- in `DialogueView`
- [x] **UI-8.4** `DialogueView` -- wired to `useDialogue`, `useFindContact`
- [x] **UI-8.5** Renders from `mockDialogueNode`; locked choices shown greyed

### UI-9. Menus overlay *(2-tab only: Inventory + Quests)*

- [x] **UI-9.1** `MenuShell` -- tab bar, Escape/backdrop close, routes to all tabs
- [x] **UI-9.2** `InventoryTab` -- item grid, quantity badges, equip/use/drop panel, gold display
- [ ] **UI-9.3** ~~`SkillsTab`~~ -- moved to standalone `SkillTreesView` (see UI-10.6); remove from `MenuShell` tab list
- [x] **UI-9.4** `QuestsTab` -- Active/Available/Completed sub-tabs, objective progress bars
- [ ] **UI-9.5** ~~`ContactsTab`~~ -- moved to standalone `ContactsView` (see UI-10.7); remove from `MenuShell` tab list
- [ ] **UI-9.6** ~~`ManorTab`~~ -- merged into `InspectorLens` (see UI-5.7); remove from `MenuShell` tab list
- [ ] **UI-9.7** Update `MenuShell.tsx` to final 2-tab layout; add Inventory restriction indicator when in Unsafe zone
- [x] **UI-9.8** Tabs wired to `useGameState` / `useContacts`; render from mock state

### UI-10. New standalone views

- [ ] **UI-10.1** `TitleScreenView.tsx` -- game name header, menu stack (New Game / Continue / New Game+ / Content Settings / Settings / About), atmospheric vignette layer
- [ ] **UI-10.2** `CharacterCreationView.tsx` -- identity block (name input + portrait selector), class/origin toggle matrix (`CharacterCreationCard`), attribute allocation grid (`StatAllocator`), origin lore panel, Finalise button
- [ ] **UI-10.3** `DefeatView.tsx` -- grim fullscreen announcement, loss manifest panel, re-anchor command menu (Awake at Manor / Load Autorecord / Title Screen)
- [ ] **UI-10.4** `ExplorationEncounterView.tsx` -- event header banner, dynamic event log, stat-check choice buttons with success-rate %, resolution window, Proceed button
- [ ] **UI-10.5** `EquipmentView.tsx` -- active character header with derived stats, equipment slot matrix (6 slots), valid storage cargo grid (filtered by focused slot), contextual action bar (Equip / Unequip / Forge / Lab / Discard), Back button
- [ ] **UI-10.6** `SkillTreesView.tsx` -- BP/AP counter pools, dual-pane `SkillTreePane` (Battle + Ardor), `NodeTooltip`, action bar (Spend Point, Reset trees, Toggle view, Return)
- [ ] **UI-10.7** `ContactsView.tsx` -- sorted contacts directory (up to 400 rows), deep metrics scroller with 3 sub-tabs (Social/Bio, Physical, Psychology), action bar (Inspect / Assign Party / Move-in Suite / Dismiss / Page / Close)
- [ ] **UI-10.8** `AchievementsView.tsx` -- trophy grid by tier (Bronze/Silver/Gold/Platinum), reward yield box for selected achievement, filter/sort action bar
- [ ] **UI-10.9** `ProfileView.tsx` -- placeholder stub only; design pending; scrollable profile in middle region with Back button
- [ ] **UI-10.10** New primitive: `FatigueIndicator` -- 5-tier icon row; add to `HudShell.tsx`
- [ ] **UI-10.11** New primitive: `SkillTreePane` -- node map with connector lines, glow on unlocked, `NodeTooltip` on hover
- [ ] **UI-10.12** New primitive: `AchievementTile` -- trophy tile with tier border and title token
- [ ] **UI-10.13** New primitive: `CharacterCreationCard` -- class card with skill preview
- [ ] **UI-10.14** New primitive: `StatAllocator` -- attribute row with +/- and remaining-points counter
- [ ] **UI-10.15** Update HUD: add `FatigueIndicator`, add safety-tier dynamic border color glow (Gold/Iron/Crimson)
- [ ] **UI-10.16** All new views render from mock state before any backend wiring

### UI-11. Integration & live wiring

- [ ] **UI-11.1** Wire `useIntent` to real tRPC router when `VITE_USE_MOCK=false`
- [ ] **UI-11.2** Confirm view transitions (overworld -> combat -> post-combat -> overworld) work without store reset
- [ ] **UI-11.3** Confirm HUD updates on every `GameState` return without re-mounting active view
- [ ] **UI-11.4** Add loading indicator while intent is in-flight
- [ ] **UI-11.5** Add error toast for failed tRPC calls
- [ ] **UI-11.6** Smoke-test all acceptance criteria UI-24-29 from PRD §6

---

## Phase 23: Monster Taming System

> Engine file: `src/engines/tamingEngine.ts` (new).
> Depends on: Phase 5 (`EnemyHumanoidCharacter`), Phase 9 (trust/love band helpers), Phase 12 (item inventory), Phase 19 (manor holding cells).
> All captured enemies and converted NPCs are adults (18+) by design.
>
> **Implementation notes:**
> - `HoldingCell` interface added to `gameState.ts`; `ManorState.holdingCells: HoldingCell[]` added.
> - Holding cells unlock at manor tier 3 ('holding_cells' feature). Capacity: tier 3=2 / tier 4=4 / tier 5=8 / tier 6=12.
> - New `rope` item added to `src/data/items.ts`; distinct from `rope_silk` (capture tool vs intimacy tool).
> - `CAPTIVE_RELEASED` GameEvent added alongside existing CAPTIVE_ADDED / CAPTIVE_INTERACTION / MONSTER_TAMED.
> - `originType?: 'tamed_monster'` flag added to `NpcCharacter`.
> - Three daily counter fields on `HoldingCell`: `talkCountToday`, `touchCountToday`, `flirtCountToday` (cap 3/day each; reset by `resetCaptiveDailyInteractions()` at day-end).
> - `INTERACT_CAPTIVE` (general daily progress tick) is separate from `CAPTIVE_ACTION` (specific sub-action). Social sub-actions build trust/love to satisfy the relationship gate; the progress tick advances `tamingProgress` toward 100.
> - Taming progress capped at 95 until relationship gate met (trust >= 25, i.e. High or VeryHigh band).
> - Resistance table: baselineResistance 0-20 → +16/interaction; 21-40 → +12; 41-60 → +8 (baseline); 61-80 → +5; 81-100 → +3.
> - `INTIMATE` captive action signals `intimateReady: true`; actual scene handoff deferred to Task 3c.4.
> - `RELEASE` delegates to `releaseOrGraduateCaptive()`: graduation path converts captive to NpcCharacter + assigns suite; unconditional path vacates cell only.
> - `FIGHT` sub-action applies trust/love penalties (no daily cap); available at any time for roleplay/dominance.
> - `FLIRT` backfires (-2 trust) when captive trust is in Low band (<-25).

### 23a. State & schema

- [x] **23.1** Define `HoldingCell` interface in `gameState.ts` -- `cellId`, `capturedCharacter`, `captureDay`, `tamingProgress`, `interactionCountToday`, `talkCountToday`, `touchCountToday`, `flirtCountToday`, `relationshipTrust`, `relationshipLove`
- [x] **23.2** Add `holdingCells: HoldingCell[]` to `ManorState` in `gameState.ts`
- [x] **23.3** Add `originType?: 'tamed_monster'` to `NpcCharacter` in `gameState.ts`
- [x] **23.4** Add taming `GameEvent` variants: `CAPTIVE_ADDED`, `CAPTIVE_INTERACTION`, `MONSTER_TAMED`, `CAPTIVE_RELEASED`

### 23b. Manor feature

- [x] **23.5** Add `'holding_cells'` feature to tier 3 in `MANOR_TIERS`; add `holdingCellCapacity(manor)` helper to `manorEngine.ts` (capacity: 2/4/8/12 by tier)

### 23c. Item catalog

- [x] **23.6** Add `rope` (MATERIAL, stackMax 10, buy 30, sell 12) to `src/data/items.ts`; metadata documents capture use

### 23d. Core taming engine

- [x] **23.7** Implement `captureMonster(state, enemy)` -- guards: feature unlocked, ENEMY_HUMANOID type, free cell, rope in inventory; consumes rope; appends HoldingCell; emits CAPTIVE_ADDED
- [x] **23.8** Implement `interactWithCaptive(state, cellId)` -- daily cap (1/day); resistance-modulated progress delta; gate cap at 95 until trust >= 25; accrues +3/+2 trust/love per interaction; at 100 calls `_convertToNpc()`; emits CAPTIVE_INTERACTION (and MONSTER_TAMED on completion)
- [x] **23.9** Implement `resolveCaptiveAction(state, cellId, action, itemId?)` -- routes TALK/TOUCH/FLIRT/GIVE_GIFT/FIGHT/INTIMATE/RELEASE; all social variants accumulate trust/love on HoldingCell; INTIMATE returns `intimateReady: true` when trust >= 25; RELEASE delegates to `releaseOrGraduateCaptive()`
- [x] **23.10** Implement `releaseOrGraduateCaptive(state, cellId)` -- graduation path: gate met + progress 100 + free suite → `_convertToNpc()` + `assignSuite()`; no-suite path: informs player; unconditional release: vacates cell, emits CAPTIVE_RELEASED
- [x] **23.11** Implement `_convertToNpc(state, events, cellId, cell)` (internal) -- builds `NpcCharacter` from capture snapshot with `originType: 'tamed_monster'`; calls `tryAddContact()`; removes cell; emits MONSTER_TAMED
- [x] **23.12** Implement `resetCaptiveDailyInteractions(state)` -- resets all four daily counters to 0; called at day-end step 7b
- [x] **23.13** Implement read helpers: `getHoldingCells()`, `getHoldingCell()`, `freeHoldingCells()`
- [x] **23.14** Export `CaptiveActionType` union from `tamingEngine.ts`

### 23e. Dispatcher wiring

- [x] **23.15** Wire `CAPTURE_MONSTER` intent -- routes to `captureMonster()`; all guards handled inside engine; narrative on failure
- [x] **23.16** Wire `INTERACT_CAPTIVE` intent -- routes to `interactWithCaptive()`; daily cap handled inside engine
- [x] **23.17** Wire `CAPTIVE_ACTION` intent -- routes to `resolveCaptiveAction()`; `intimateReady` flag noted with TODO comment for Task 3c.4 intimate handoff
- [x] **23.18** Wire `MONSTER_TAMED` event in `processEventQueue` -- increments `flags.tamed_monster_count` for achievement tracking
- [x] **23.19** Add `CAPTIVE_ACTION` and `CAPTIVE_ACTION_TYPE` to `PlayerIntent` union

### 23f. Open items

- [x] **23.20** Wire `resetCaptiveDailyInteractions()` into `calendarEngine.runDayEndTick()` step 7b -- alongside `resetDailySocialCounters()`
- [x] **23.21** `INTIMATE` action handoff (Task 3c.4): when `intimateReady`, build `NpcPartnerProfile` snapshot from `cell.capturedCharacter`; call `startScene()` with `sceneStartType = 'CAPTIVE'`; return scene state in `DispatchResult`
- [x] **23.22** `mockGameState.ts` -- add `holdingCells: []` to `manor` block; add `rope` to player inventory
- [ ] **23.23** Achievement data: author taming-specific achievements when achievement catalog session runs (deferred, same policy as 20.4)

---

## Phase 23a — Moral Alignment System

> Engine file: `src/engines/alignmentEngine.ts` (new).
> PRD reference: §4.22.
> Depends on: Phase 10 (reputation tracks), Phase 13 (`DialogueCondition` union), Phase 11 (quest reward flagsSet).
> Must complete before quest data authoring (tasks 11.5, 25.4–25.7) and achievement authoring (task 20.4).

### 23a-1. Schema

- [x] **23a.1** Add `alignmentScore: number` to `PlayerCharacter` in `gameState.ts` -- init `0`; range -100 to +100; negative = Sovereign tendency, positive = Purifier tendency, near-zero = Pragmatist tendency; does not lock the player into a path
- [x] **23a.2** Add `darkReputation: Record<RegionId, number>` to root `GameState` alongside existing `reputation` -- init all regions `0`; range 0–100; independent of `reputation` by formula; at `>= 40` in a region the shadow faction unlocks (vendors, quests, dialogue)
- [x] **23a.3** Extend `DialogueCondition` union in `gameState.ts` with `{ type: 'ALIGNMENT'; dominantAlignment: 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN' }` variant; update `evaluateCondition()` in `dialogueEngine.ts` to handle it
- [x] **23a.4** Add alignment `GameEvent` variants: `ALIGNMENT_SHIFTED` (`delta`, `newScore`, `dominantAlignment`), `DARK_REPUTATION_CHANGED` (`regionId`, `delta`, `newScore`)
- [x] **23a.5** Update `mockGameState.ts` -- add `alignmentScore: 0`, `darkReputation: {}` (or matching 3-region sample set)

### 23a-2. Core engine

- [x] **23a.6** Implement `deriveDominantAlignment(score: number): 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN'` pure helper -- `>= 40` → PURIFIER; `<= -40` → SOVEREIGN; else → PRAGMATIST
- [x] **23a.7** Implement `shiftAlignment(gameState, delta: number): { state: GameState; events: GameEvent[] }` -- clamps score to [-100, +100]; derives dominant alignment; emits `ALIGNMENT_SHIFTED`; called by dispatcher on meaningful quest/dialogue decisions, NOT on combat kill/purify outcomes
- [x] **23a.8** Implement `applyDarkReputationDelta(gameState, regionId, delta): { state: GameState; events: GameEvent[] }` -- clamps [0, 100]; emits `DARK_REPUTATION_CHANGED`; at threshold 40 emits additional `DARK_FACTION_UNLOCKED` event; shadow faction content available when `darkReputation[regionId] >= 40`
- [x] **23a.9** Implement `getDarkReputation(gameState, regionId): number` pure helper
- [x] **23a.10** Implement `getDominantAlignment(gameState): 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN'` pure convenience wrapper around `deriveDominantAlignment(gameState.player.alignmentScore)`

### 23a-3. Integration

- [x] **23a.11** Update `questEngine.grantQuestReward()` -- when `reward.flagsSet` contains `'alignment_purifier'`, `'alignment_pragmatist'`, or `'alignment_sovereign'`, call `shiftAlignment()` with respective delta (+10 / 0 / -10) after credits; delta defined per quest in catalog (deferred to task 11.5)
- [x] **23a.12** Update `applyDialogueEffect()` in `dialogueEngine.ts` -- add `ALIGNMENT_SHIFT` variant to `DialogueEffect` union: `{ type: 'ALIGNMENT_SHIFT'; delta: number }`; apply via `shiftAlignment()` when dialogue choice is made
- [x] **23a.13** Update `evaluateCondition()` in `dialogueEngine.ts` -- handle the new `ALIGNMENT` condition type using `getDominantAlignment(gameState)` (task 23a.3)
- [x] **23a.14** Wire `DARK_REPUTATION_CHANGED` into day-end tick: add a `tickDarkReputationDecay(gameState)` no-op stub in `reputationEngine.ts` for now (dark reputation does not decay passively like regular reputation); note in comment that decay only occurs on Purifier-dominant events in a region, handled by existing `REPUTATION_EVENT_TABLE` extensions that will be authored in task 11.5
- [x] **23a.15** Add `ALIGNMENT_CONDITION` to `DialogueCondition` union check in `getAvailableChoices()` -- locked when dominant alignment does not match; hidden when `choice.hidden === true`

### 23a-4. Achievement hooks

- [x] **23a.16** Add `ach_counter_alignment_purifier_choices`, `ach_counter_alignment_sovereign_choices`, `ach_counter_alignment_pragmatist_choices` counters -- incremented by `shiftAlignment()` alongside the score shift; used by achievement conditions of type COUNT in task 20.4

---

## Phase 24 — Generic Engine Layer (multi-game base)

> All engines and state schema in this phase are data-agnostic.  Lore-specific
> content (JobDef catalog, SynergyDef catalog, weather catalog, etc.) is authored
> in a separate data session.  Tasks below cover engine implementation, schema
> additions, dispatcher wiring, and the new-game init pipeline.

### 24a. GameState schema additions  ✅ COMPLETE

- [x] **24.1** Add `AlignmentState` + `AlignmentAxis` types to `gameState.ts`; embed `alignment: AlignmentState` on `GameState`
- [x] **24.2** Add `InfamyState` + `BountyTier` types to `gameState.ts`; embed `infamy: InfamyState` on `GameState`
- [x] **24.3** Add `EnvironmentState` + `WeatherCondition` + `WeatherEffect` types to `gameState.ts`; embed `environment: EnvironmentState` on `GameState`
- [x] **24.4** Add `SpireNetwork` + `SpireState` types to `gameState.ts`; embed `spires: SpireNetwork` on `GameState`
- [x] **24.5** Add `JobArchetypeState` + `JobResourceSystem` types; add `ClassProgressionState`; embed `jobState` + `classProgress` on `GameState`
- [x] **24.6** Add `SynergyState` + `SynergyPairState` types; embed `synergies: SynergyState` on `GameState`
- [x] **24.7** Add `CharacterCreationOptions` type; embed `characterCreation: CharacterCreationOptions | undefined` on `GameState`
- [x] **24.8** Add Phase 24 `GameEvent` variants for all 7 new engines (ALIGNMENT_DELTA, BOUNTY_TIER_CHANGED, WEATHER_CHANGED, SPIRE_UNLOCKED, JOB_EQUIPPED, SYNERGY_ACTIVATED, NEW_GAME_STARTED, etc.)
- [x] **24.9** Re-export all Phase 24 schema types from `gameState.ts`

### 24b. Engine files  ✅ COMPLETE

- [x] **24.10** Implement `alignmentEngine.ts` — 3-axis scoring [-100,+100], dominantAxis derivation, divergenceMultiplier 1.0→2.5, `applyAlignmentDelta()`, `evaluateDivergence()`, `deriveAlignmentBand()`
- [x] **24.11** Implement `infamyEngine.ts` — per-region infamy 0-100, `BountyTier` thresholds, `applyInfamyDelta()`, `clearInfamy()`, `tickInfamyDecay()`, shop surcharge read helper
- [x] **24.12** Implement `environmentEngine.ts` — `WeatherCatalogEntry` interface, `advanceWeather()`, `syncActiveEffects()`, `tickEquipmentDurability()`, `getWeatherModifier()`
- [x] **24.13** Implement `spireEngine.ts` — `createSpireNetwork()`, `unlockSpire()`, `spireTravel()` (zero-cost fast travel), `isSpireUnlocked()`, `getUnlockedSpires()`
- [x] **24.14** Implement `jobEngine.ts` — `JobDef`/`ClassDef`/`ClassNodeDef` catalog interfaces, `equipJob()`, `equipClass()`, `unlockClassNode()`, `resetClassTree()`, `spendJobResource()`, `restoreJobResources()`, `detectWeakNodes()` (Architect's Eye mechanic), `applyArmorFracture()`, `promoteJob()`
- [x] **24.15** Implement `synergyEngine.ts` — `SynergyDef`/`SynergyEffectPayload` interfaces, `initSynergyState()`, `evaluateSynergyUnlocks()`, `activateSynergy()`, `resetSynergyDailyCounts()`
- [x] **24.16** Implement `characterCreationEngine.ts` — `SubClassDef`/`TraitDef` interfaces, `createCharacter()` full pipeline (name → stats → sub-class bonus → trait flag → job → class → snapshot), `validateStatAllocation()`

### 24c. Dispatcher wiring  ✅ COMPLETE

- [x] **24.17** Import all 7 new engines in `dispatcher.ts`
- [x] **24.18** Extend `PlayerIntent` union with Phase 24 intents: `APPLY_ALIGNMENT_DELTA`, `EVALUATE_DIVERGENCE`, `APPLY_INFAMY_DELTA`, `CLEAR_INFAMY`, `UNLOCK_SPIRE`, `SPIRE_TRAVEL`, `EQUIP_JOB`, `EQUIP_CLASS`, `UNLOCK_CLASS_NODE`, `RESET_CLASS_TREE`, `PROMOTE_JOB`, `ACTIVATE_SYNERGY`, `EVALUATE_SYNERGIES`, `NEW_GAME`
- [x] **24.19** Extend `DispatchResult` with `divergenceMultiplier?: number` and `synergyPayload?: SynergyEffectPayload`
- [x] **24.20** Wire all 14 new intent handlers in `dispatch()` with try/catch + narrative lines

### 24d. Calendar integration  ✅ COMPLETE

- [x] **24.21** Wire `advanceWeather()` into `calendarEngine.runDayEndTick()` step 0 (before all other ticks); inject `regionIds` from world catalog and day seed
- [x] **24.22** Wire `tickEquipmentDurability()` into `calendarEngine.runDayEndTick()` step 8c
- [x] **24.23** Wire `tickInfamyDecay()` into `calendarEngine.runDayEndTick()` step 8b
- [x] **24.24** Wire `resetSynergyDailyCounts()` into `calendarEngine.runDayEndTick()` step 7c (alongside existing daily resets)

### 24e. Combat integration  ✅ COMPLETE

- [x] **24.25** Call `restoreJobResources(state, activeJobDef)` at the start of each combat encounter in `combatEngine.startCombat()`
- [x] **24.26** Call `detectWeakNodes()` at the start of each combat round when `activeJobDef.hasWeakNodeScan === true`; attach `WeakNodeHit[]` to `CombatState.weakNodeHits` for the round
- [x] **24.27** In `combatEngine.resolveFightAction()`: when target is in `weakNodeHits`, add `bonusDamage` to the hit + call `applyArmorFracture()`; emit `ARMOR_FRACTURE_APPLIED` and apply the status via `statusEffectEngine`
- [x] **24.28** Apply `divergenceMultiplier` from `state.alignment.divergenceMultiplier` to boss HP / damage in chapter divergence encounters (quest-engine gate: `flags.chapter_divergence_active === true`) — wired as armor fracture on weak-node hit
- [x] **24.29** Apply infamy shop surcharge: in `economyEngine.buyItem()`, multiply base price by `getShopSurcharge(state, currentRegion)` before deducting gold
- [x] **24.30** Apply active weather modifiers in combat: read `getWeatherModifier(state, 'FIRE_DAMAGE')` etc. and apply to relevant damage formulas in `combatEngine`

### 24f. World / spire integration  ✅ COMPLETE

- [x] **24.31** In `worldEngine.fastTravel()`: if both departure and destination are unlocked spires, delegate to `spireTravel()` (zero gold cost) instead of charging the standard fee
- [x] **24.32** In `dispatcher.processEventQueue()`: on `TRAVEL_NODE_REACHED`, call `syncActiveEffects(state, weatherCatalog)` to recompute active weather effects for the new region
- [x] **24.33** Add `SPIRE_UNLOCKED` handler in `processEventQueue`: check `flags.enclave_stronghold_<nodeId>` before allowing unlock; narrative if prerequisite missing

### 24g. Data catalogs  (OPEN — deferred to lore data session)

- [ ] **24.34** Author `src/data/alignmentCatalog.ts` — `AxisDef[]` mapping `axis_a/b/c` to Ojisan lore names (Rebel / Loyalist / Pragmatist); `AlignmentResolutionDef[]` for quest/dialogue choice → axis delta table
- [ ] **24.35** Author `src/data/jobCatalog.ts` — `JobDef[]` for 5 archetypes (Tactician, Vanguard, Analyst, Rogue, Support) with pool definitions; `ClassDef[]` for 10 equippable classes (10 × 10-node trees)
- [ ] **24.36** Author `src/data/synergyCatalog.ts` — `SynergyDef[]` for companion duo-tech and triple-tech pairs (unlock thresholds, combo names, effect payloads)
- [ ] **24.37** Author `src/data/weatherCatalog.ts` — `WeatherCatalogEntry[]` for all 10 conditions with effect arrays and weight tables per region type
- [ ] **24.38** Author `src/data/characterCreationCatalog.ts` — `SubClassDef[]` (stat bonus profiles), `TraitDef[]` (secondary traits), valid stat key list for allocation
- [ ] **24.39** Author `src/data/spireNetwork.ts` — `string[]` of all world node IDs that have a ley-line spire; passed to `createSpireNetwork()` at new-game init
- [ ] **24.40** Author `src/data/infamyCatalog.ts` — narrative text for each `BountyTier` per region; bounty hunter NPC spawn templates per tier

### 24h. mockGameState + init pipeline  ✅ COMPLETE

- [x] **24.41** Add Phase 24 fields to `mockGameState.ts`: `alignment: createDefaultAlignmentState()`, `infamy: createDefaultInfamyState()`, `environment: createDefaultEnvironmentState()`, `spires: createSpireNetwork([])`, `jobState: createDefaultJobState()`, `classProgress: createDefaultClassProgressionState()`, `synergies: createDefaultSynergyState()`, `characterCreation: undefined`
- [x] **24.42** Implement new-game init sequence (Task 3c.4): `createBareGameState()` → `spawnLocationPopulation()` → `simulateWorldHistory()` → `dispatch(NEW_GAME intent)` → return fully initialized `GameState`
- [x] **24.43** Hook `START_NEW_GAME_PLUS` in `saveEngine.ts` to preserve `alignment`, `classProgress`, `synergies`, and `characterCreation` snapshot across the NG+ reset

### 24i. Unit tests  (OPEN)

- [ ] **24.44** Unit tests for `alignmentEngine`: delta clamping, dominant axis derivation, divergence multiplier scaling
- [ ] **24.45** Unit tests for `infamyEngine`: tier threshold boundaries, fine calculation, passive decay, shop surcharge
- [ ] **24.46** Unit tests for `spireEngine`: unlock guard, travel guard, zero-cost assertion
- [ ] **24.47** Unit tests for `jobEngine`: node unlock prerequisites, SP refund on reset, weak node detection probability
- [ ] **24.48** Unit tests for `synergyEngine`: unlock eligibility with party + intimacy gate, daily use cap
- [ ] **24.49** Unit tests for `characterCreationEngine`: stat allocation validation, sub-class bonus application, flag setting

---

## Phase 25 — Lore Data Authoring (mechanics exist, data absent)

> This phase authors all the static catalog files that the existing engines already
> consume.  Every task here is pure data work — no engine logic changes.  Each
> task can be tackled independently; they share no code dependencies on each other.
> Deferred items from earlier phases are collected here under one roof.

### 25a. Skill catalog  (deferred from Phase 16 task 16.4)

- [ ] **25.1**  Author `src/data/skills.ts` — `SKILLS: Record<string, SkillDef>` for the **Battle tree** (10 skills): at least 3 passive `STAT_BOOST` (STR/DEF/AGI), 2 passive `DAMAGE_MULTIPLIER`, 2 active `STATUS_APPLY` (POISONED, STUNNED), 1 active `DAMAGE_MULTIPLIER` (execute strike), 2 active `AROUSAL_GAIN` (purification burst × 2 tiers)
- [ ] **25.2**  Author **Ardor tree** (10 skills) in `skills.ts`: at least 3 passive `AROUSAL_GAIN`, 2 passive `STAT_BOOST` (TEC/CPW pool extensions), 2 active `STATUS_APPLY` (AROUSED, DEFENDED), 3 active multi-effect (aphrodisiac strike, subspace push, denial lock)
- [ ] **25.3**  Verify all `skillId` strings referenced in `src/data/achievements.ts` (task 25.8) and `src/data/jobCatalog.ts` (task 24.35) exist in the authored catalog; fix mismatches

### 25b. Quest catalog  (deferred from Phase 11 task 11.5)

- [ ] **25.4**  Author initial quest catalog in `src/data/quests.ts` — **1 MAIN quest** chain (3-part: KILL + TRAVEL + TALK objective sequence; triggers Chapter 10 alignment gate via `flags.chapter_divergence_active`)
- [ ] **25.5**  Author **2 COMPANION quests** (one per starter companion): TALK + INTERACT objective pairs; reward: `trustDelta +20`, title token flag, AP bonus
- [ ] **25.6**  Author **5 BOARD quests** (repeatable, `cooldownDays: 3`): 2 × KILL (different enemy types), 1 × COLLECT (material), 1 × TRAVEL (scout node), 1 × TALK (NPC courier)
- [ ] **25.7**  Verify all `prerequisites` chains are acyclic; all `flagsSet` keys match flags read elsewhere in engines

### 25c. Achievement catalog  (deferred from Phase 20 task 20.4)

- [ ] **25.8**  Author **Bronze tier** achievements in `src/data/achievements.ts` — 10 entries: first kill, first dialogue, first craft, first companion added, first intimacy scene, first overnight sleep, first quest accepted, first manor upgrade, first status effect applied, first spire unlocked
- [ ] **25.9**  Author **Silver tier** achievements — 8 entries: 10 enemies killed (`COUNT` on `ach_counter_kills`), 5 quests completed, 3 companions in party simultaneously, manor tier 3 reached, all 5 taming progress stages observed, reputation `Renowned` in any region, 10 intimacy scenes completed, first synergy combo activated
- [ ] **25.10** Author **Gold tier** achievements — 6 entries: all MAIN quests completed (`FLAG` on `game_cleared`), all companions at Love band ≥ VeryHigh, all 10 classes unlocked at least one node, 50 total enemies killed, infamy cleared in all regions from OUTLAW+, all spires unlocked
- [ ] **25.11** Author **Platinum tier** achievements — 3 entries: full bestiary tamed (all 7 humanoid monster species captured once, `COUNT`), all alignment bands visited on all 3 axes, all skills unlocked in both trees
- [ ] **25.12** Verify every `AchievementCondition` references only flags/counters that are actually emitted by engines; no orphan condition keys

### 25d. World graph  (deferred from Phase 17 task 17.DATA)

- [ ] **25.13** Author `WORLD_NODES[]` in `src/data/worldGraph.ts` — full set of nodes matching lore regions: Starting Village (safe hub), 3 overworld field nodes, Forest Depths (UNSAFE), Mountain Pass (UNSAFE), Subterranean Siphon approach (UNSAFE), Capital District (safe hub), 2 Enclave Stronghold nodes, Cathedral Approach (UNSAFE), Floating Isle approach (UNSAFE). Minimum 15 nodes for a playable loop; expand to full 81 in a dedicated world-building session
- [ ] **25.14** Author `WORLD_EDGES[]` — bidirectional pairs for all authored nodes; assign `travelPhases` (1 = adjacent tile, 2-4 = road travel, 6 = mountain/dungeon); mark unsafe edges between UNSAFE nodes
- [ ] **25.15** Author `ENEMY_ROAM_DEFS` per unsafe location — at least 3 roam defs per unsafe node matching regional monster types from `src/data/monsters.ts`; spawn coords must fit within the 30×30 tile grid
- [ ] **25.16** Author tile maps (`TileMap`) for the 5 stub nodes already in `mockGameState.ts`; wire to `WorldState.tileMap` on `enterNode()` for the starting location

### 25e. Dialogue content  (deferred from Phase 13)

- [ ] **25.17** Author dialogue content for `generic_intro` tree in `src/data/dialogueTrees.ts` — full 3-node script (greeting → small-talk → farewell); 2-3 text lines per node; at least 1 TRUST_DELTA effect on a choice
- [ ] **25.18** Author `elara_companion_ch1` tree — 5-node script covering Elara's introduction; trust-locked branch at node 3 (trust ≥ 25); SET_FLAG effect for `elara_ch1_complete`; GIVE_ITEM reward on completion
- [ ] **25.19** Author `quest_board_intro` tree — 2-node script; choice 1 triggers `START_QUEST` for first BOARD quest (task 25.6); choice 2 dismisses
- [ ] **25.20** Author `DIALOGUE_FRAGMENTS` content in `src/data/dialogueFragments.ts` — fill all keyed buckets with 2-3 authored variant strings: NPC greetings (anonymous/named), flirt/touch/gift acks, ambush/chest/trap outcomes, intimidate/flee outcomes
- [ ] **25.21** Author `INTIMATE_RESPONSE_LIBRARY` content in `src/data/intimateResponseFragments.ts` — fill priority buckets for the 10 most-used action IDs across all 6 layers (NARRATION, BODY_POSITION, BODY_ACTION, SFX, VOCAL, PLAYER_LINE); 2 variants minimum per bucket

### 25f. Item catalog expansion  (extends Phase 12 task 12.4)

- [ ] **25.22** Expand `src/data/items.ts` to cover **all 18 equipment slots** — add placeholder `ItemDef` entries for each slot type not yet covered: RING, AMULET, BOOTS, GLOVES, BELT, EARRING, BRACELET, ANKLET; assign slot in `effects[]` metadata; no stats required yet (stubs)
- [ ] **25.23** Add **3 QUEST items** — Aether Ledger, Enclave Seal, Siphon Core Fragment; `type: 'QUEST'`, `stackMax: 1`; referenced by quest reward / objective definitions in task 25.4
- [ ] **25.24** Add **5 Aether-themed CONSUMABLE items** — Aether Vial (arousal suppressant), Purity Draft (infamy –10 in current region), Enclave Token (spire unlock key), Corruption Salve (shame reduction), Miasma Ward (combat status immunity 1 turn)
- [ ] **25.25** Add **vendor inventory seed** — `VENDOR_INVENTORIES: Record<string, string[]>` in `src/data/items.ts`; at least 3 vendor profiles (general store, blacksmith, apothecary) each listing 6–10 `itemId` strings; consumed by economy engine's `buyItem()` when a shop NPC is the seller

### 25g. NPC & monster catalog expansion

- [ ] **25.26** Author **10 named NPC templates** in `src/data/namePool.ts` or a new `src/data/npcTemplates.ts` — one per region; each carries `occupation`, `scheduleId`, `npcClassId`, `background.regionOfOrigin`; used by `spawnLocationPopulation()` to seed service NPCs; this satisfies lore requirement for 280+ world NPCs when the full world graph (task 25.13) is populated
- [ ] **25.27** Author **`BOSS_ENCOUNTER_TRIGGERS`** in `src/data/bosses.ts` — map of `nodeId → bossId`; consumed by `worldEngine.enterNode()` to flag `flags.boss_<nodeId>_available` when player arrives; currently bosses are defined but never spawned automatically
- [ ] **25.28** Author **loot tables** for all 10 boss entries in `src/data/bosses.ts` — each boss `LootTable` must have at least 2 guaranteed drops (gold range + 1 material) and 1 rare WEAPON/ARMOR drop at weight 0.15; these resolve via existing `resolveLoot()` in Phase 5
- [ ] **25.29** Author **loot tables** for all 10 regional enemy profiles in `src/data/monsters.ts` — each profile gets a `defaultLootTable: LootTable` with 1-2 material drops + 1 gold range entry; referenced by `ENEMY_KILLED_IN_INTIMACY` loot-table-id resolution stub (Task 10.10)

### 25h. Status effect catalog expansion  (extends Phase 14 task 14.2)

- [ ] **25.30** Add **`AETHER_ROT_STAGE_1`** `StatusEffectDef` — `STAT_MULT` STR/DEF ×0.85, duration 9999 (permanent until cleared), stacks 1; cleared only by tithe payment flag; applied by quest engine when tithe quota overdue by 7 days
- [ ] **25.31** Add **`AETHER_ROT_STAGE_2`** — `STAT_MULT` STR/DEF ×0.70 + AGI ×0.80; replaces Stage 1 at 14 days overdue; also applies infamy delta +15 in all regions (triggers city-gate hostility)
- [ ] **25.32** Add **`AETHER_ROT_STAGE_3`** — `STAT_MULT` all stats ×0.50; replaces Stage 2 at 21 days overdue; emits `BOUNTY_HUNTER_SPAWNED` in all regions at tier `CONDEMNED`; remove all 3 stages on tithe paid
- [ ] **25.33** Add **`COMMAND_MOMENTUM`** — secondary resource effect for Tactician job: `STAT_FLAT` companion ATK +10 per stack; max 3 stacks; 2-turn duration; consumed (1 stack) on each party member's attack; applied by `spendJobResource()` when Tactician pool B is used
- [ ] **25.34** Add **`DEFENCE_RESONANCE`** — Vanguard job: `STAT_MULT` self DEF ×1.25 per stack; max 2 stacks; 1-turn duration; regenerates 1 stack at start of Vanguard's turn when pool B > 0

### 25i. Alignment + infamy data  (extends Phase 24 tasks 24.34, 24.40)

- [ ] **25.35** Author `src/data/alignmentCatalog.ts` — `AxisDef[3]` with lore labels (`axis_a`: Rebel/Loyalist, `axis_b`: Chaos/Order, `axis_c`: Pragmatist/Idealist); `AlignmentResolutionDef[]` mapping 20 key quest/dialogue moments → `{ axis, delta }` pairs; Chapter 10 divergence trigger condition: `dominantAxis === 'axis_a'` AND `resolutionAxis === 'axis_b'` (or vice-versa)
- [ ] **25.36** Author `src/data/infamyCatalog.ts` — `BountyTierNarrativeDef[]` with city-gate flavour text per tier (5 tiers × up to 5 region variants); `BountyHunterSpawnTemplate[]` (3 templates: SUSPICIOUS scout, WANTED hunter duo, OUTLAW Inquisitor squad) referencing existing `MonsterTypeDef` IDs

### 25j. Job & class catalog  (extends Phase 24 tasks 24.35, 24.38)

- [ ] **25.37** Author **5 `JobDef` archetypes** in `src/data/jobCatalog.ts` — Tactician (poolA: AP 6, poolB: Command Momentum 3, `hasWeakNodeScan: false`, `innatePassiveIds: ['command_momentum']`, promotes to `Sovereign`), Vanguard (poolA: Stamina 8, poolB: Defence Resonance 2, promotes to `IronForged`), Analyst (poolA: Focus 5, `hasWeakNodeScan: true`, promotes to `Architect`), Rogue (poolA: Energy 7, promotes to `Phantom`), Support (poolA: Harmony 6, promotes to `Ascendant`)
- [ ] **25.38** Author **5 advanced `JobDef` promotions** — Sovereign, IronForged, Architect, Phantom, Ascendant; each inherits base archetype pools with +2 max, adds 1 innate passive, sets `promotionJobIds: []` (terminal)
- [ ] **25.39** Author **10 `ClassDef` equippable classes** in `src/data/jobCatalog.ts` — Mage, Warrior, Explorer, Chemist, Inquisitor, Merchant, Mechanist, Shadow, Paladin, Arcane Templar; each with exactly 10 `ClassNodeDef` entries in a linear-then-branching tree; nodes reference `skillId` strings authored in tasks 25.1–25.2
- [ ] **25.40** Author **`SubClassDef[]`** in `src/data/characterCreationCatalog.ts` — 5 sub-classes (Structural Engineer: +2 STR/END; Arcane Scholar: +2 INT/WIL; Shadow Operative: +2 DEX/PER; Field Medic: +2 END/WIL; Trade Broker: +2 PER/LCK); each sets a unique `perkFlagId`
- [ ] **25.41** Author **`TraitDef[]`** (3 secondary traits) — `resource_efficient` (AP cost –10% flag), `master_negotiator` (shop buy price –5% flag), `tenacious_survivalist` (HP floor 1 on killing blow, 1×/combat, flag)
- [ ] **25.42** Define **valid stat key list** in `src/data/characterCreationCatalog.ts` — `['str','dex','agi','int','wil','per','end']`; used by `validateStatAllocation()` in `characterCreationEngine.ts`

### 25k. Synergy catalog  (extends Phase 24 task 24.36)

- [ ] **25.43** Author **`SynergyDef[]`** in `src/data/synergyCatalog.ts` — minimum 5 duo-tech pairs (one per planned companion combination) + 2 triple-tech combinations; each entry: `memberNpcIds`, `intimacyThreshold: 150`, `comboName`, `effectPayload` with realistic `damageMultiplier` (2.5–4.0) and optional `inflictsStatusId`; `maxUsesPerEncounter: 1`

### 25l. Spire network data  (extends Phase 24 task 24.39)

- [ ] **25.44** Author `src/data/spireNetwork.ts` — `SPIRE_NODE_IDS: string[]` listing one node ID per authored region hub (one spire per safe-hub node from task 25.13); minimum 5 spires for a playable ley-line network; each must match a `WorldNode.id` in `WORLD_NODES`

### 25m. Weather catalog  (extends Phase 24 task 24.37)

- [ ] **25.45** Author `src/data/weatherCatalog.ts` — `WeatherCatalogEntry[]` for all 10 `WeatherCondition` values; each entry: `label`, `description`, `weight` (relative probability), `effects: WeatherEffect[]`; example effects: HEAVY_RAIN `RANGED_ACCURACY –30`, SALTFOG `degradesEquipment: true, degradationSlot: 'CHEST'`, TOXIC_SPORE `STATUS_APPLY POISONED chance 0.25`, HEAT_WAVE `WATER_CONSUMPTION +50` (narrative only); CLEAR weight highest (40)

---

## Phase 26 — Loose Ends & Previously Missed Items

> Gaps identified during the lore coverage analysis that don't belong to a single
> existing phase.  Each task is self-contained.

### 26a. 7-stat schema formalisation

- [x] **26.1**  Add named `CoreStatKey` type alias to `gameState.ts` — `'str' | 'dex' | 'agi' | 'int' | 'wil' | 'per' | 'end'`; replace all bare `string` stat keys in `CombatStats`, `CharacterCreationOptions.allocatedStats`, `SubClassDef.statBonuses` with this type
- [x] **26.2**  Add `coreStats: Record<CoreStatKey, number>` field to `PlayerCharacter` and `NpcCharacter`; keep existing `CombatStats` (str/agi/wis/def/lck) as the derived combat snapshot — document the mapping: `str→str, dex+agi→agi, int→wis, end→def, per+lck→lck`
- [x] **26.3**  Implement `deriveCombatStatsFromCoreStats(coreStats: Record<CoreStatKey, number>): CombatStats` in a new `src/engines/statEngine.ts`; call it in `characterCreationEngine.createCharacter()` and `deriveCompanionStats()` to keep the two stat layers in sync

### 26b. Tithe / weekly quota system

- [x] **26.4**  Add `titheState` block to `GameState` — `{ lastPaidDay: number; quotaGoldPerWeek: number; overdueBy: number }` (all start at 0 / configured by first quest that introduces the system)
- [x] **26.5**  Implement `tickTithe(gameState)` in `calendarEngine.ts` at day-end step 8d — increments `overdueBy` by 1 each day the quota is unpaid; at 7 days: apply `AETHER_ROT_STAGE_1` via `statusEffectEngine.applyStatus()`; at 14: upgrade to Stage 2; at 21: upgrade to Stage 3; reset on `PAY_TITHE` intent
- [x] **26.6**  Add `PAY_TITHE` intent to `PlayerIntent` union and wire in dispatcher — deducts `quotaGoldPerWeek` from `player.gold`, resets `overdueBy` to 0, removes all `AETHER_ROT_STAGE_*` statuses, emits `INFAMY_DELTA` –5 in current region

### 26c. 18-slot equipment schema

- [x] **26.7**  Expand `EquipmentSlot` type in `gameState.ts` to include all 18 lore slots — current: WEAPON, OFF_HAND, HEAD, CHEST, HANDS, LEGS; add: FEET, BACK, NECK, RING_L, RING_R, EARRING_L, EARRING_R, BRACELET_L, BRACELET_R, ANKLET, BELT, ACCESSORY; update `SLOT_VALID_TYPES` map in `craftingEngine.ts` for the 12 new slots
- [x] **26.8**  Update `equipItem()` in `craftingEngine.ts` — handle paired slots (RING_L / RING_R share the same `ItemDef` but occupy separate slots); add paired-slot logic: if target is RING_L and occupied, offer RING_R automatically before prompting swap
- [x] **26.9**  Update `EquipmentView` task UI-10.5 — slot matrix expanded to 18 slots in 3 columns of 6; paired slots shown side-by-side

### 26d. Item upgrade socket system

- [x] **26.10** Add `sockets: AetherSocket[]` to `InventorySlot` — `AetherSocket { socketId: string; inlaidMaterialId?: string; passiveEffect?: string }`; max sockets = `Math.floor(upgradeLevel / 5)` (sockets unlock at +5 and +10)
- [x] **26.11** Add **`OPEN_SOCKET`** intent to `PlayerIntent` union — takes `itemId` + `materialId` (Aether Crystal type); calls `socketItem()` in `craftingEngine.ts`; deducts material; writes `inlaidMaterialId` + derived `passiveEffect` to the socket slot
- [x] **26.12** Implement `socketItem(gameState, itemId, socketIndex, materialId)` in `craftingEngine.ts` — guard: item must be equipped, socket must be empty, material must be MATERIAL type with `socketEffect` metadata; emits `ITEM_UPGRADED` variant `SOCKETED`
- [x] **26.13** Implement `deriveSocketPassives(slot: InventorySlot): string[]` — returns array of `passiveEffect` strings from filled sockets; consumed by `deriveEquipmentStatBonus()` and `applyPassiveSkills()` to apply bonuses

### 26e. Overland travel time & carriage cost

- [x] **26.14** Add `CARRIAGE_COST_PER_NODE: number = 15` constant to `worldEngine.ts`; add `TRAVEL_MODE` intent variant to `PlayerIntent` — `{ type: 'HIRE_CARRIAGE'; targetNodeId: string }` — deducts `CARRIAGE_COST_PER_NODE × distance` gold, calls `fastTravel()` with zero encounter (same as spire but costs gold and doesn't require unlock)
- [x] **26.15** Add travel time estimate helper `estimateTravelTime(gameState, fromId, toId): number` (returns phases) — uses `WORLD_EDGES[].travelPhases` sum along shortest path; pure function, no BFS needed for the small authored graph

### 26f. Mini-game stubs

> These are stub-level tasks — no full implementation, just the intent/state scaffolding so each mini-game can be built independently.

- [x] **26.16** Add `FISHING` intent to `PlayerIntent` — `{ type: 'START_FISHING'; nodeId: string }` — guard: node must have `features.fishing === true`; emits `MINI_GAME_STARTED { gameType: 'FISHING' }`; mini-game resolution deferred to its own task
- [x] **26.17** Add `GAMBLING` intent — `{ type: 'START_GAMBLING'; stakeGold: number }` — guard: stake ≤ player gold, node has `features.gambling`; emits `MINI_GAME_STARTED { gameType: 'GAMBLING' }`
- [x] **26.18** Add `ARENA` intent — `{ type: 'ENTER_ARENA' }` — guard: node has `features.arena`, infamy tier < OUTLAW in current region; emits `MINI_GAME_STARTED { gameType: 'ARENA' }`; wires to a `combatEngine.startCombat()` call with an arena-flagged enemy roster
- [x] **26.19** Add `ONSEN` intent — `{ type: 'USE_ONSEN'; npcId?: string }` — guard: node has `features.onsen`; solo use: full HP/STA restore + `REGENERATING` status 4 turns; paired use (npcId set): additionally calls `resolveSocialAction()` trust +3 on partner; emits `MINI_GAME_STARTED { gameType: 'ONSEN' }`
- [x] **26.20** Add `features: Partial<Record<LocationFeatureKey, boolean>>` to `WorldNode` schema — `LocationFeatureKey = 'fishing' | 'gambling' | 'arena' | 'onsen' | 'shrine' | 'market' | 'smithy' | 'alchemy_lab'`; update `WORLD_NODES` stub entries in task 25.13 to include feature flags

### 26g. Crime consequence hooks

- [x] **26.21** Wire `APPLY_INFAMY_DELTA` calls into existing engine actions that constitute crimes — `economyEngine.buyItem()` when gold is insufficient and player has a `steal_attempt` flag set: +20 infamy; `combatEngine.emitVictoryEvents()` when target was `originType: undefined` (civilian): +15 infamy; `captureMonster()` in public locations: +10 infamy
- [x] **26.22** Add `CITY_GATE_BLOCKED` GameEvent to union — emitted by `worldEngine.enterNode()` when destination node is a city (safe hub, `isSafe: true`) and player infamy tier in that region ≥ CONDEMNED; guard blocks `enterNode()` and returns narrative
- [x] **26.23** Add infamy-delta trigger in `questEngine.grantQuestReward()` — when quest `reward.flagsSet` contains `'crime_pardoned'`, call `clearInfamy()` for all regions simultaneously (canonical pardon mechanic)

### 26h. Title screen & Character creation UI  (extends UI-10.1 / UI-10.2)

- [x] **26.24** `TitleScreenView.tsx` — implement fully per UI-10.1; New Game button fires `createBareGameState()` then routes to `CharacterCreationView`; Continue button loads slot 99 autosave via `LIST_SAVES`; New Game+ button gated on `isNewGamePlusEligible()`
- [x] **26.25** `CharacterCreationView.tsx` — implement per UI-10.2; reads `SubClassDef[]` and `TraitDef[]` from `characterCreationCatalog.ts`; stat allocator enforces `FREE_ATTRIBUTE_POINTS = 10`; Finalise button fires `NEW_GAME` intent via dispatcher; on success routes to overworld
- [x] **26.26** `CharacterCreationCard` primitive — renders sub-class card with name, stat bonus preview, perk flag description; selected state border highlight
- [x] **26.27** `StatAllocator` primitive — 7-row grid (`str/dex/agi/int/wil/per/end`); per-row +/– buttons clamped [0, 5]; remaining-points counter; error state when total ≠ 10

### 26i. Enclave Stronghold gate for spire unlock

- [x] **26.28** Define `ENCLAVE_STRONGHOLD_FLAG_PREFIX = 'enclave_stronghold_'` constant in `spireEngine.ts`; add `getEnclaveStrongholdFlag(nodeId: string): string` helper — returns `enclave_stronghold_<nodeId>`
- [x] **26.29** Add stronghold prerequisite check to `UNLOCK_SPIRE` intent handler in `dispatcher.ts` — before calling `unlockSpire()`, assert `state.flags[getEnclaveStrongholdFlag(intent.nodeId)] === true`; if not, push narrative `'You must establish an Enclave Stronghold in this region before attuning the spire.'` and return early
- [x] **26.30** Add `BUILD_STRONGHOLD` intent to `PlayerIntent` — `{ type: 'BUILD_STRONGHOLD'; nodeId: string }` — guard: player gold ≥ 500, node is safe hub, no existing stronghold; deducts gold, sets flag, emits `REPUTATION_CHANGED` delta +50 in region, emits `INFAMY_DELTA` –10

### 26j. Monorepo package boundary (multi-game base)

- [x] **26.31** Create `packages/engine-core/` — move all files in `src/engines/`, `src/state/gameState.ts`, `src/spawn-engine/`, `src/enums.ts` into this package; add `package.json` with name `@ojisan/engine-core`; update all imports in `src/` to use the package name
- [x] **26.32** Create `packages/ojisan-data/` — move all files in `src/data/` into this package; add `package.json` with name `@ojisan/data`; this package depends on `@ojisan/engine-core` for catalog interface types only
- [x] **26.33** Create `apps/ojisan/` — move React client (`src/client/`) + tRPC server into this app; depends on both packages; update Vite config and tsconfig paths
- [x] **26.34** Update root `package.json` to workspace monorepo config (`"workspaces": ["packages/*", "apps/*"]`); update CI/build scripts
- [x] **26.35** Document multi-game extension guide in `README.md` — how to create `packages/<new-game>-data/` with a different `JobDef[]`, `SynergyDef[]`, `WeatherCatalogEntry[]` etc. while reusing `@ojisan/engine-core` unchanged

---

## Infrastructure

- [x] **I.1** Add `.gitignore` (node_modules, compiled output, IDE files, save files)
- [x] **I.1b** Rename `Project/` -> `spawn-engine/`; update all cross-references in docs and source
- [ ] **I.2** Set up tRPC server scaffold
- [ ] **I.3** Set up React client with Zustand (App.tsx shell done; needs Vite + package.json wiring)
- [ ] **I.4** Configure build pipeline (tsconfig paths, output dirs)
- [ ] **I.5** Add basic unit test harness (Jest or Vitest)
- [ ] **I.6** Write unit tests for spawn engine

---

## Phase 27: Companion Side Quest System — Schema, Stat-Gating & Alignment Branching

> **Design contract** (do not alter without a design session):
>
> Each named companion has **two quest chains**:
>
> 1. **Standard Side Quest chain** (SQ-X.xA / SQ-X.xB / SQ-X.xC — already lore-authored):
>    - Gated by **Love** and **Trust** thresholds. Accepting SQ-X.xA requires Love ≥ L₁ & Trust ≥ T₁; each subsequent quest raises the bar.
>    - Once a quest is active, **Love and Trust cannot increase above the gate for the next quest** until that quest is completed (stat-ceiling freeze).
>    - Each quest contains **one lightweight alignment branch** — a single dialogue moment scored ±10 Rebel/Loyalist/Pragmatist (not a full three-path fork; one choice that tilts the score and colours the outcome line).
>    - SQ-X.xC (Intimacy Unlock) additionally requires the **Enclave** for that chapter to be established.
>
> 2. **Advanced Side Quest chain** (ASQ-X.x — new, 3 quests per companion):
>    - Unlocks only after SQ-X.xC (Intimacy) is complete.
>    - Gated by **Relationship** (Love + Trust combined), **Corruption**, and **Sexual stat** thresholds.
>    - Same stat-ceiling freeze rule: relevant stats cannot exceed the gate for the next ASQ until the current one is completed.
>    - Each quest contains **one alignment branch** with two concrete divergent outcomes (Rebel vs Loyalist); Pragmatist gets a contextual blend outcome if no tilt exceeds ±20.
>    - Content is explicitly adult RPG: deeper intimacy, power dynamics, companion-specific scenarios.
>
> **Alignment branch design rule (both chain types):**
> - One choice per quest maximum.
> - Rebel/Light branch: consent, mutual growth, protective action.
> - Loyalist/Dark branch: dominance, coercion, possession, breaking.
> - Pragmatist/Neutral: blended outcome when neither tilt exceeds ±20.
> - Scoring: ±10 per SQ branch; ±15 per ASQ branch. Lighter than main quest (±25) by design.
>
> **Stat-freeze implementation rule:**
> - Implemented as `statCeiling` entries on the active `QuestEntry`: `{ stat: 'love' | 'trust' | 'corruption' | 'sexual_stat'; maxWhileActive: number }[]`.
> - `applyPostSceneRelationshipDelta()` and `resolveSocialAction()` must clamp against active quest ceilings for the relevant NPC.
> - Ceiling lifted (entry removed) when `checkQuestCompletion()` resolves the quest.

---

### 27a. Schema extensions

- [ ] **27a.1** Extend `QuestDef` in `src/data/quests.ts` — add `chain: 'STANDARD_SQ' | 'ADVANCED_SQ'`; add `statGates: { stat: 'love' | 'trust' | 'corruption' | 'sexual_stat'; minValue: number }[]`; add `alignmentBranch?: { choiceLabel: string; rebelOutcomeFlag: string; loyalistOutcomeFlag: string; pragmatistOutcomeFlag?: string; delta: number }` (one branch per quest maximum)
- [ ] **27a.2** Extend `QuestEntry` runtime state — add `statCeilings: { stat: string; maxWhileActive: number; npcId: string }[]`; populated on `acceptQuest()`, cleared on quest completion or failure
- [ ] **27a.3** Add `ADVANCED_SQ` to the `type` union on `QuestDef` (`'MAIN' | 'COMPANION' | 'STANDARD_SQ' | 'ADVANCED_SQ' | 'BOARD'`)
- [ ] **27a.4** Define `AlignmentBranchChoice` interface — `{ questId: string; npcId: string; chosenPath: 'REBEL' | 'LOYALIST' | 'PRAGMATIST'; flagSet: string; alignmentDelta: number }` — emitted as `GameEvent` variant `QUEST_ALIGNMENT_BRANCH_CHOSEN`

### 27b. Engine changes

- [ ] **27b.1** Update `acceptQuest()` in `questEngine.ts` — after creating `QuestEntry`, compute `statCeilings` from the next quest in chain's `statGates` and write onto the active entry
- [ ] **27b.2** Update `checkQuestCompletion()` — on COMPLETED, call new helper `liftStatCeilings(gameState, questId, npcId)` before emitting `QUEST_COMPLETED`
- [ ] **27b.3** Implement `liftStatCeilings(gameState, questId, npcId): GameState` — removes ceiling entries from all active `QuestEntry` records matching questId+npcId pair
- [ ] **27b.4** Update `applyPostSceneRelationshipDelta()` in `relationshipEngine.ts` — before writing Love/Trust deltas, call `clampToStatCeilings(gameState, npcId, deltas)` which inspects active quest entries and reduces deltas that would breach a ceiling
- [ ] **27b.5** Update `resolveSocialAction()` in `relationshipEngine.ts` — same ceiling clamp applied to daily flirt/touch Love/Trust gains
- [ ] **27b.6** Implement `resolveAlignmentBranch(gameState, questId, npcId, chosenPath): GameState` — applies `alignmentDelta` to player alignment score; sets corresponding outcome flag in `gameState.flags`; emits `QUEST_ALIGNMENT_BRANCH_CHOSEN`
- [ ] **27b.7** Wire `QUEST_BRANCH_CHOSEN` intent in `dispatcher.ts` → `resolveAlignmentBranch()`
- [ ] **27b.8** Implement `getCompanionQuestStage(gameState, npcId): { standardChain: number; advancedChain: number }` — returns highest completed quest index (0=none, 1=xA, 2=xB, 3=xC/all) for each chain; used by `sortContacts()`
- [ ] **27b.9** Add corruption and sexual-stat ceiling clamp to `resolvePostIntimacy()` in `intimacyEngine.ts` — same pattern as 27b.4 but for ASQ gates

### 27c. Chapter 1 — Standard SQ stat gates & alignment branches (Valeria, Teresa, Beatrix)

- [ ] **27c.1** Define stat-gate thresholds for Valeria's chain (SQ-1.1A/B/C) — A: Love ≥ 20 & Trust ≥ 20; B: Love ≥ 40 & Trust ≥ 35 (ceiling while A active: Love max 39, Trust max 34); C: Love ≥ 60 & Trust ≥ 55 (ceiling while B active: Love max 59, Trust max 54); requires Highwatch Enclave for C
- [ ] **27c.2** Define alignment branch moment for each Valeria SQ — SQ-1.1A: confrontation with Blackwood (Rebel: offer freedom to Elena+Kaelen / Loyalist: take their contracts for the Enclave); SQ-1.1B: recovering squad gear (Rebel: return all gear freely / Loyalist: retain one chest as Enclave collateral); SQ-1.1C: sunset moment (Rebel: mutual oath / Loyalist: she pledges service as condition of safety)
- [ ] **27c.3** Define stat-gate thresholds for Teresa's chain (SQ-1.2A/B/C) — A: Love ≥ 15 & Trust ≥ 25; B: Love ≥ 35 & Trust ≥ 45; C: Love ≥ 55 & Trust ≥ 65; requires Highwatch Enclave for C
- [ ] **27c.4** Define alignment branch moment for each Teresa SQ — SQ-1.2A: Rot-Hound ambush (Rebel: treat wounded beasts / Loyalist: destroy remaining pack); SQ-1.2B: apothecary (Rebel: leave a donation note / Loyalist: strip the storehouse completely); SQ-1.2C: chapel altar (Rebel: shared prayer and renewal / Loyalist: she renounces her vows under your authority)
- [ ] **27c.5** Define stat-gate thresholds for Beatrix's chain (SQ-1.3A/B/C) — A: Love ≥ 20 & Trust ≥ 30; B: Love ≥ 40 & Trust ≥ 50; C: Love ≥ 60 & Trust ≥ 70; requires Highwatch Enclave for C
- [ ] **27c.6** Define alignment branch moment for each Beatrix SQ — SQ-1.3A: toll station (Rebel: release bandits with a warning / Loyalist: hand over for bounty); SQ-1.3B: courier interception (Rebel: let him go after confiscating notes / Loyalist: detain as Enclave asset); SQ-1.3C: pawn broker — natural three-way split (Rebel: audit leverage / Loyalist: intimidation / Pragmatist: gold buyback)

### 27d. Chapter 1 — Advanced SQ chains (Valeria, Teresa, Beatrix)

- [ ] **27d.1** Define ASQ-1.1 chain for Valeria — 3 quests; gate: ASQ-1.1A: Love ≥ 75 & Corruption ≥ 20; ASQ-1.1B: Love ≥ 85 & Corruption ≥ 35 (ceiling while A: Corruption max 34); ASQ-1.1C: Love ≥ 95 & Corruption ≥ 50 & sexual_stat (submission) ≥ 30; branch themes: trust-test sparring / private oath renewal / absolute devotion rite
- [ ] **27d.2** Define ASQ-1.2 chain for Teresa — gate: ASQ-1.2A: Love ≥ 70 & Corruption ≥ 15; ASQ-1.2B: Love ≥ 80 & Corruption ≥ 30; ASQ-1.2C: Love ≥ 90 & Corruption ≥ 45 & sexual_stat (purity_erosion) ≥ 25; branch themes: healing ritual boundary / sanctuary confession / willing surrender of vows
- [ ] **27d.3** Define ASQ-1.3 chain for Beatrix — gate: ASQ-1.3A: Love ≥ 75 & Corruption ≥ 20; ASQ-1.3B: Love ≥ 85 & Corruption ≥ 35; ASQ-1.3C: Love ≥ 95 & Corruption ≥ 50 & sexual_stat (analytical_surrender) ≥ 30; branch themes: after-hours audit / ledger-and-body audit / full cipher exchange

### 27e. Chapter 2 — Standard SQ stat gates & alignment branches (Lysandra, Genevieve)

- [ ] **27e.1** Define stat-gate thresholds for Lysandra's chain (SQ-2.1A/B/C) — A: Love ≥ 20 & Trust ≥ 20; B: Love ≥ 40 & Trust ≥ 35; C: Love ≥ 60 & Trust ≥ 55; requires Harbor Watchtower Enclave for C
- [ ] **27e.2** Define alignment branch for each Lysandra SQ — SQ-2.1A: defeating Drake (Rebel: publicly expose / Loyalist: absorb operation into network); SQ-2.1B: Agent Vane capture (Rebel: release with warning / Loyalist: hold as counterintelligence asset); SQ-2.1C: telegraph activation (Rebel: share relay with allied factions / Loyalist: monopolise for Enclave)
- [ ] **27e.3** Define stat-gate thresholds for Genevieve's chain (SQ-2.2A/B/C) — A: Love ≥ 25 & Trust ≥ 20; B: Love ≥ 45 & Trust ≥ 40; C: Love ≥ 65 & Trust ≥ 60; requires Harbor Watchtower Enclave for C
- [ ] **27e.4** Define alignment branch for each Genevieve SQ — SQ-2.2A: Silas's manor (Rebel: take only heirlooms, leave evidence / Loyalist: take full ledger as leverage); SQ-2.2B: fishing village (Rebel: help rebuild / Loyalist: recruit strongest as Enclave labour); SQ-2.2C: annulment charter (Rebel: she seals freely / Loyalist: protagonist holds seal as condition of her protection)

### 27f. Chapter 2 — Advanced SQ chains (Lysandra, Genevieve)

- [ ] **27f.1** Define ASQ-2.1 chain for Lysandra — gate: ASQ-2.1A: Love ≥ 75 & Corruption ≥ 25; ASQ-2.1B: Love ≥ 85 & Corruption ≥ 40; ASQ-2.1C: Love ≥ 95 & Corruption ≥ 55 & sexual_stat (shadow_control) ≥ 30; branch themes: private intelligence briefing / vault-below-the-vault / total network surrender
- [ ] **27f.2** Define ASQ-2.2 chain for Genevieve — gate: ASQ-2.2A: Love ≥ 70 & Corruption ≥ 20; ASQ-2.2B: Love ≥ 82 & Corruption ≥ 35; ASQ-2.2C: Love ≥ 95 & Corruption ≥ 50 & sexual_stat (noble_submission) ≥ 28; branch themes: dissolving the last cartel tie / private arcanum session / the matriarch reborn as devotee

### 27g. Chapter 3 — Standard SQ stat gates & alignment branches (Corinne, Lucilla)

- [ ] **27g.1** Define stat-gate thresholds for Corinne's chain (SQ-3.1A/B/C) — A: Love ≥ 15 & Trust ≥ 15 (lower entry — starts adversarial); B: Love ≥ 35 & Trust ≥ 30; C: Love ≥ 55 & Trust ≥ 50; requires Sunken Monastery Enclave for C
- [ ] **27g.2** Define alignment branch for each Corinne SQ — SQ-3.1A: voiding warrants (Rebel: villagers decide her fate / Loyalist: declare she now serves Enclave publicly); SQ-3.1B: casket unsealing (Rebel: destroy armory contents / Loyalist: transfer to Enclave arsenal); SQ-3.1C: oath scene (Rebel: voluntary oath with terms / Loyalist: unconditional oath under duress)
- [ ] **27g.3** Define stat-gate thresholds for Lucilla's chain (SQ-3.2A/B/C) — A: Love ≥ 20 & Trust ≥ 20; B: Love ≥ 40 & Trust ≥ 40; C: Love ≥ 60 & Trust ≥ 60; requires Sunken Monastery Enclave for C
- [ ] **27g.4** Define alignment branch for each Lucilla SQ — SQ-3.2A: laundering vault (Rebel: distribute to refugees / Loyalist: bank in Enclave vault); SQ-3.2B: desecration ritual (Rebel: preserve one relic / Loyalist: destroy all relics publicly); SQ-3.2C: the saint's fall (Rebel: she stays of her own will / Loyalist: she surrenders under explicit command)

### 27h. Chapter 3 — Advanced SQ chains (Corinne, Lucilla)

- [ ] **27h.1** Define ASQ-3.1 chain for Corinne — gate: ASQ-3.1A: Love ≥ 70 & Corruption ≥ 30; ASQ-3.1B: Love ≥ 82 & Corruption ≥ 45; ASQ-3.1C: Love ≥ 95 & Corruption ≥ 60 & sexual_stat (knight_submission) ≥ 35; branch themes: sparring that becomes more / armour removal rite / absolute knight's vow
- [ ] **27h.2** Define ASQ-3.2 chain for Lucilla — gate: ASQ-3.2A: Love ≥ 72 & Corruption ≥ 28; ASQ-3.2B: Love ≥ 85 & Corruption ≥ 45; ASQ-3.2C: Love ≥ 95 & Corruption ≥ 62 & sexual_stat (holy_corruption) ≥ 35; branch themes: confessional reversal / desecration intimacy / the saint's complete fall

### 27i. Chapter 4 — Standard SQ stat gates & alignment branches (Morvanya, Tali)

- [ ] **27i.1** Define stat-gate thresholds for Morvanya's chain (SQ-4.1A/B/C) — A: Love ≥ 20 & Trust ≥ 20; B: Love ≥ 40 & Trust ≥ 38; C: Love ≥ 60 & Trust ≥ 58; requires Sunken Citadel Enclave for C
- [ ] **27i.2** Define alignment branch for each Morvanya SQ — SQ-4.1A: Blood-Feather defeat (Rebel: exile / Loyalist: conscript as Enclave fighter); SQ-4.1B: behemoth hunt (Rebel: minimal kills / Loyalist: strip cave of all trophies); SQ-4.1C: rite of submission (Rebel: yields on her own terms / Loyalist: formally broken before the clan)
- [ ] **27i.3** Define stat-gate thresholds for Tali's chain (SQ-4.2A/B/C) — A: Love ≥ 18 & Trust ≥ 20; B: Love ≥ 38 & Trust ≥ 40; C: Love ≥ 58 & Trust ≥ 60; requires Sunken Citadel Enclave for C
- [ ] **27i.4** Define alignment branch for each Tali SQ — SQ-4.2A: rescuing Talon (Rebel: free all falcons / Loyalist: keep best falcon as Enclave scout asset); SQ-4.2B: ruin puzzle (Rebel: catalogue and report / Loyalist: strip ruin for Enclave); SQ-4.2C: star-lit oasis (Rebel: she chooses devotion freely / Loyalist: she surrenders independence under explicit claim)

### 27j. Chapter 4 — Advanced SQ chains (Morvanya, Tali)

- [ ] **27j.1** Define ASQ-4.1 chain for Morvanya — gate: ASQ-4.1A: Love ≥ 75 & Corruption ≥ 25; ASQ-4.1B: Love ≥ 87 & Corruption ≥ 42; ASQ-4.1C: Love ≥ 97 & Corruption ≥ 58 & sexual_stat (tribal_surrender) ≥ 32; branch themes: blood-pact renewal / chieftain's private war council / the crown laid down
- [ ] **27j.2** Define ASQ-4.2 chain for Tali — gate: ASQ-4.2A: Love ≥ 70 & Corruption ≥ 20; ASQ-4.2B: Love ≥ 82 & Corruption ≥ 35; ASQ-4.2C: Love ≥ 94 & Corruption ≥ 50 & sexual_stat (scout_devotion) ≥ 28; branch themes: night hunt alone together / the scout's map and secrets / under the desert stars

### 27k. Chapter 5 — Standard SQ stat gates & alignment branches (Evangeline, Seraphina, Aurelia, Rosalie)

- [ ] **27k.1** Define stat-gate thresholds for Evangeline's chain (SQ-5.1A/B/C) — A: Love ≥ 22 & Trust ≥ 18; B: Love ≥ 42 & Trust ≥ 38; C: Love ≥ 62 & Trust ≥ 58; requires Royal Citadel Enclave for C
- [ ] **27k.2** Define alignment branch for each Evangeline SQ — SQ-5.1A: scullery combat (Rebel: expose assassination order publicly / Loyalist: use as court blackmail); SQ-5.1B: bloodstain cover-up (Rebel: refuse further killings / Loyalist: add to Enclave leverage file); SQ-5.1C: the maid's master (Rebel: she chooses freely / Loyalist: serves under unconditional contract)
- [ ] **27k.3** Define stat-gate thresholds for Seraphina's chain (SQ-5.2A/B/C) — A: Love ≥ 20 & Trust ≥ 20; B: Love ≥ 40 & Trust ≥ 40; C: Love ≥ 60 & Trust ≥ 60; requires Royal Citadel Enclave for C
- [ ] **27k.4** Define alignment branch for each Seraphina SQ — SQ-5.2A: chancellor's blackmail files (Rebel: destroy all / Loyalist: archive for Enclave); SQ-5.2B: golden-cage unsealing (Rebel: free all captive concubines / Loyalist: reassign useful ones to Enclave); SQ-5.2C: concubine's surrender (Rebel: she chooses freely / Loyalist: surrenders under explicit possession)
- [ ] **27k.5** Define stat-gate thresholds for Aurelia's chain (SQ-5.3A/B/C) — A: Love ≥ 18 & Trust ≥ 22; B: Love ≥ 38 & Trust ≥ 42; C: Love ≥ 58 & Trust ≥ 62; requires Royal Citadel Enclave for C
- [ ] **27k.6** Define alignment branch for each Aurelia SQ — SQ-5.3A: broken shield (Rebel: honour the fallen publicly / Loyalist: absorb unit into Enclave quietly); SQ-5.3B: honour restoration (Rebel: restored knighthood under reformed oath / Loyalist: replaced with personal pledge to protagonist); SQ-5.3C: knight's submission (Rebel: mutual honour-bound vow / Loyalist: absolute submission to sole master)
- [ ] **27k.7** Define stat-gate thresholds for Rosalie's chain (SQ-5.4A/B/C) — A: Love ≥ 25 & Trust ≥ 15; B: Love ≥ 45 & Trust ≥ 35; C: Love ≥ 65 & Trust ≥ 55; requires Royal Citadel Enclave for C
- [ ] **27k.8** Define alignment branch for each Rosalie SQ — SQ-5.4A: princess's research (Rebel: publish openly / Loyalist: classify under Enclave control); SQ-5.4B: ley-line generator (Rebel: share specs with allied scholars / Loyalist: seal under Enclave lock); SQ-5.4C: princess's surrender (Rebel: stays as equal by choice / Loyalist: surrenders as devoted ward)

### 27l. Chapter 5 — Advanced SQ chains (Evangeline, Seraphina, Aurelia, Rosalie)

- [ ] **27l.1** Define ASQ-5.1 chain for Evangeline — gate: ASQ-5.1A: Love ≥ 75 & Corruption ≥ 28; ASQ-5.1B: Love ≥ 87 & Corruption ≥ 44; ASQ-5.1C: Love ≥ 96 & Corruption ≥ 60 & sexual_stat (shadow_maid_service) ≥ 32; branch themes: covert mission together / private debrief / the shadow's full loyalty
- [ ] **27l.2** Define ASQ-5.2 chain for Seraphina — gate: ASQ-5.2A: Love ≥ 72 & Corruption ≥ 22; ASQ-5.2B: Love ≥ 84 & Corruption ≥ 38; ASQ-5.2C: Love ≥ 95 & Corruption ≥ 55 & sexual_stat (concubine_devotion) ≥ 30; branch themes: the charm reversed / private performance / surrender of the charmer
- [ ] **27l.3** Define ASQ-5.3 chain for Aurelia — gate: ASQ-5.3A: Love ≥ 73 & Corruption ≥ 25; ASQ-5.3B: Love ≥ 85 & Corruption ≥ 42; ASQ-5.3C: Love ≥ 96 & Corruption ≥ 58 & sexual_stat (paladin_submission) ≥ 33; branch themes: the shield becomes a shield-maiden / armour and what's beneath / knight's final oath
- [ ] **27l.4** Define ASQ-5.4 chain for Rosalie — gate: ASQ-5.4A: Love ≥ 70 & Corruption ≥ 18; ASQ-5.4B: Love ≥ 82 & Corruption ≥ 33; ASQ-5.4C: Love ≥ 94 & Corruption ≥ 50 & sexual_stat (royal_surrender) ≥ 28; branch themes: the princess tests the protagonist / arcanum experiment on herself / royal surrender

### 27m. Chapter 6 — Standard SQ stat gates & alignment branches (Celeste, Aria)

- [ ] **27m.1** Define stat-gate thresholds for Celeste's chain (SQ-6.1A/B/C) — A: Love ≥ 22 & Trust ≥ 22; B: Love ≥ 42 & Trust ≥ 42; C: Love ≥ 62 & Trust ≥ 62; requires Sky Sanctuary Citadel Enclave for C
- [ ] **27m.2** Define alignment branch for each Celeste SQ — SQ-6.1A: dragon rescue (Rebel: free all dragons / Loyalist: recruit largest as Enclave mount); SQ-6.1B: bloodline rite (Rebel: private personal act / Loyalist: performed before Enclave as loyalty ceremony); SQ-6.1C: princess's submission (Rebel: chosen freely / Loyalist: blood-pact claimed)
- [ ] **27m.3** Define stat-gate thresholds for Aria's chain (SQ-6.2A/B/C) — A: Love ≥ 20 & Trust ≥ 18; B: Love ≥ 40 & Trust ≥ 38; C: Love ≥ 60 & Trust ≥ 58; requires Sky Sanctuary Citadel Enclave for C
- [ ] **27m.4** Define alignment branch for each Aria SQ — SQ-6.2A: salvage claim (Rebel: split equally with crew / Loyalist: claim best salvage for Enclave exclusively); SQ-6.2B: turbine blueprint (Rebel: open-source specs / Loyalist: classify under Enclave airship program); SQ-6.2C: captain's surrender (Rebel: stays captain and partner / Loyalist: yields captainship to Enclave)

### 27n. Chapter 6 — Advanced SQ chains (Celeste, Aria)

- [ ] **27n.1** Define ASQ-6.1 chain for Celeste — gate: ASQ-6.1A: Love ≥ 76 & Corruption ≥ 22; ASQ-6.1B: Love ≥ 88 & Corruption ≥ 38; ASQ-6.1C: Love ≥ 97 & Corruption ≥ 55 & sexual_stat (dragon_bond) ≥ 30; branch themes: flight alone together / the dragon princess and her rider / blood-pact intimacy
- [ ] **27n.2** Define ASQ-6.2 chain for Aria — gate: ASQ-6.2A: Love ≥ 72 & Corruption ≥ 20; ASQ-6.2B: Love ≥ 84 & Corruption ≥ 36; ASQ-6.2C: Love ≥ 95 & Corruption ≥ 52 & sexual_stat (pirate_devotion) ≥ 28; branch themes: stowaway night on the Zephyr / the captain's quarters / anchor dropped for good

### 27o. Chapter 7 — Standard SQ stat gates & alignment branches (Vespera, Nyx, Hilda, Gretel)

- [ ] **27o.1** Define stat-gate thresholds and alignment branches for Vespera's chain (SQ-7.1A/B/C) — A: Love ≥ 25 & Trust ≥ 22; B: Love ≥ 45 & Trust ≥ 42; C: Love ≥ 65 & Trust ≥ 62; branch themes: ancient matriarch's test of will / rune-vault access / the queen kneels (Rebel: willing / Loyalist: claimed)
- [ ] **27o.2** Define stat-gate thresholds and alignment branches for Nyx's chain (SQ-7.2A/B/C) — A: Love ≥ 20 & Trust ≥ 20; B: Love ≥ 40 & Trust ≥ 40; C: Love ≥ 60 & Trust ≥ 60; branch themes: shadow-hunt together / cipher map exchange / the scout's full devotion
- [ ] **27o.3** Define stat-gate thresholds and alignment branches for Hilda's chain (SQ-7.3A/B/C) — A: Love ≥ 18 & Trust ≥ 20; B: Love ≥ 38 & Trust ≥ 40; C: Love ≥ 58 & Trust ≥ 60; branch themes: forge challenge / magma-hammer creation rite / the forge-master's oath
- [ ] **27o.4** Define stat-gate thresholds and alignment branches for Gretel's chain (SQ-7.4A/B/C) — A: Love ≥ 20 & Trust ≥ 18; B: Love ≥ 40 & Trust ≥ 38; C: Love ≥ 60 & Trust ≥ 58; branch themes: demolition field test / ventilation system repair / the engineer's dedication

### 27p. Chapter 7 — Advanced SQ chains (Vespera, Nyx, Hilda, Gretel)

- [ ] **27p.1** Define ASQ-7.1 chain for Vespera — gate: ASQ-7.1A: Love ≥ 78 & Corruption ≥ 30; ASQ-7.1B: Love ≥ 90 & Corruption ≥ 48; ASQ-7.1C: Love ≥ 98 & Corruption ≥ 65 & sexual_stat (dark_elf_dominion) ≥ 38; branch themes: ancient ritual reversal / the matriarch instructs / queen and consort
- [ ] **27p.2** Define ASQ-7.2 chain for Nyx — gate: ASQ-7.2A: Love ≥ 73 & Corruption ≥ 24; ASQ-7.2B: Love ≥ 85 & Corruption ≥ 40; ASQ-7.2C: Love ≥ 95 & Corruption ≥ 56 & sexual_stat (shadow_devotion) ≥ 32; branch themes: shadows and warmth / the scout unmasks / full shadow bond
- [ ] **27p.3** Define ASQ-7.3 chain for Hilda — gate: ASQ-7.3A: Love ≥ 70 & Corruption ≥ 20; ASQ-7.3B: Love ≥ 82 & Corruption ≥ 36; ASQ-7.3C: Love ≥ 93 & Corruption ≥ 52 & sexual_stat (dwarven_fire) ≥ 28; branch themes: the forge after hours / hammered softness / the forgemaster's mark
- [ ] **27p.4** Define ASQ-7.4 chain for Gretel — gate: ASQ-7.4A: Love ≥ 68 & Corruption ≥ 18; ASQ-7.4B: Love ≥ 80 & Corruption ≥ 32; ASQ-7.4C: Love ≥ 92 & Corruption ≥ 48 & sexual_stat (engineer_curiosity) ≥ 26; branch themes: after-hours experiment / the test subject volunteers / blueprint of the heart

### 27q. Chapter 7 — Onsen NPCs Standard SQ chains (Yumi, Ayame, Kasumi)

> Onsen NPCs are non-combat support characters. Chains are 2 quests + intimacy unlock; lighter Love/Trust gates.

- [ ] **27q.1** Define stat-gate thresholds and alignment branch for Widow Yumi's chain — SQ-7.O1A: Love ≥ 20 & Trust ≥ 25; SQ-7.O1B (unlock): Love ≥ 45 & Trust ≥ 50; branch in SQ-7.O1A: geothermal valve repair (Rebel: report Church mining damage to authorities / Loyalist: keep quiet to avoid Enclave attention)
- [ ] **27q.2** Define stat-gate thresholds and alignment branch for Ayame's chain — SQ-7.O2A: Love ≥ 18 & Trust ≥ 20; SQ-7.O2B (unlock): Love ≥ 40 & Trust ≥ 45; branch in SQ-7.O2A: difficult guest who threatens the onsen (Rebel: mediate / Loyalist: eject and blacklist)
- [ ] **27q.3** Define stat-gate thresholds and alignment branch for Kasumi's chain — SQ-7.O3A: Love ≥ 15 & Trust ≥ 18; SQ-7.O3B (unlock): Love ≥ 35 & Trust ≥ 40; branch in SQ-7.O3A: steam valve over-pressure incident (Rebel: teach her the safe method / Loyalist: take over the task and make her watch)

### 27r. Chapter 7 — Onsen NPCs Advanced SQ chains (Yumi, Ayame, Kasumi)

- [ ] **27r.1** Define ASQ-7.O1 for Yumi — gate: Love ≥ 60 & Corruption ≥ 18 & sexual_stat (widow_warmth) ≥ 22; 2-quest chain; branch themes: private onsen session / widow's comfort
- [ ] **27r.2** Define ASQ-7.O2 for Ayame — gate: Love ≥ 55 & Corruption ≥ 15 & sexual_stat (attendant_care) ≥ 20; branch themes: late-night bath service / the elder daughter's secret
- [ ] **27r.3** Define ASQ-7.O3 for Kasumi — gate: Love ≥ 50 & Corruption ≥ 12 & sexual_stat (spring_energy) ≥ 18; branch themes: steam-room mishap / the younger daughter opens up

### 27s. Chapter 8 — Standard SQ stat gates & alignment branches (Nerida, Marina)

- [ ] **27s.1** Define stat-gate thresholds and alignment branches for Nerida's chain (SQ-8.1A/B/C) — A: Love ≥ 24 & Trust ≥ 22; B: Love ≥ 44 & Trust ≥ 42; C: Love ≥ 64 & Trust ≥ 62; branch themes: siren song choice / tidal rite / the queen of the deep yields (Rebel: chosen / Loyalist: commanded)
- [ ] **27s.2** Define stat-gate thresholds and alignment branches for Marina's chain (SQ-8.2A/B/C) — A: Love ≥ 20 & Trust ≥ 20; B: Love ≥ 40 & Trust ≥ 40; C: Love ≥ 60 & Trust ≥ 60; branch themes: salvage ethics / submarine secrets / captain and first mate

### 27t. Chapter 8 — Advanced SQ chains (Nerida, Marina)

- [ ] **27t.1** Define ASQ-8.1 chain for Nerida — gate: ASQ-8.1A: Love ≥ 78 & Corruption ≥ 28; ASQ-8.1B: Love ≥ 90 & Corruption ≥ 45; ASQ-8.1C: Love ≥ 98 & Corruption ≥ 62 & sexual_stat (siren_bond) ≥ 35; branch themes: underwater alone / the siren's call answered / the deep pact
- [ ] **27t.2** Define ASQ-8.2 chain for Marina — gate: ASQ-8.2A: Love ≥ 72 & Corruption ≥ 22; ASQ-8.2B: Love ≥ 84 & Corruption ≥ 38; ASQ-8.2C: Love ≥ 95 & Corruption ≥ 54 & sexual_stat (salvager_grit) ≥ 30; branch themes: the sub bunk / pressure test / docking permanently

### 27u. Chapter 9 — Standard SQ stat gates & alignment branches (Elaria, Lyra, Sylvia, Guinevere, Elizabeth, Martha)

- [ ] **27u.1** Define stat-gate thresholds and alignment branches for Elaria's chain — A: Love ≥ 22 & Trust ≥ 20; B: Love ≥ 42 & Trust ≥ 40; C: Love ≥ 62 & Trust ≥ 60; branch themes: betrothal politics / sunlit elf rite / the princess chooses her consort (Rebel: freely / Loyalist: as treaty condition)
- [ ] **27u.2** Define stat-gate thresholds and alignment branches for Lyra's chain — A: Love ≥ 28 & Trust ≥ 25; B: Love ≥ 48 & Trust ≥ 45; C: Love ≥ 68 & Trust ≥ 65; branch themes: the queen's secret meeting / elven court subversion / the queen steps down for love
- [ ] **27u.3** Define stat-gate thresholds and alignment branches for Sylvia's chain — A: Love ≥ 20 & Trust ≥ 20; B: Love ≥ 40 & Trust ≥ 40; C: Love ≥ 60 & Trust ≥ 60; branch themes: rebel safehouse / bow and allegiance / the ranger's surrender
- [ ] **27u.4** Define stat-gate thresholds and alignment branches for Guinevere's chain — A: Love ≥ 18 & Trust ≥ 22; B: Love ≥ 38 & Trust ≥ 42; C: Love ≥ 58 & Trust ≥ 62; branch themes: the commander defects / honour without an army / the general bows
- [ ] **27u.5** Define stat-gate thresholds and alignment branches for Elizabeth's chain — A: Love ≥ 22 & Trust ≥ 18; B: Love ≥ 42 & Trust ≥ 38; C: Love ≥ 62 & Trust ≥ 58; branch themes: the lab after defection / cooling regulator ethics / the scholar's complete data transfer
- [ ] **27u.6** Define stat-gate thresholds and alignment branches for Martha's chain (Ch. 9 re-introduction — 6 quests; split SQ-9.6A–C + SQ-9.6D–F) — A/D: Love ≥ 15 & Trust ≥ 20; B/E: Love ≥ 35 & Trust ≥ 40; C/F: Love ≥ 55 & Trust ≥ 60; branch themes: capital arrest recovery / farm wife in the city / homecoming and hearth

### 27v. Chapter 9 — Advanced SQ chains (Elaria, Lyra, Sylvia, Guinevere, Elizabeth, Martha)

- [ ] **27v.1** Define ASQ-9.1 for Elaria — gate: Love ≥ 76 & Corruption ≥ 20; B: Love ≥ 88 & Corruption ≥ 36; C: Love ≥ 97 & Corruption ≥ 52 & sexual_stat (sun_princess) ≥ 30
- [ ] **27v.2** Define ASQ-9.2 for Lyra — gate: Love ≥ 80 & Corruption ≥ 24; B: Love ≥ 92 & Corruption ≥ 42; C: Love ≥ 99 & Corruption ≥ 60 & sexual_stat (queen_yield) ≥ 35
- [ ] **27v.3** Define ASQ-9.3 for Sylvia — gate: Love ≥ 72 & Corruption ≥ 20; B: Love ≥ 84 & Corruption ≥ 36; C: Love ≥ 95 & Corruption ≥ 52 & sexual_stat (ranger_devotion) ≥ 28
- [ ] **27v.4** Define ASQ-9.4 for Guinevere — gate: Love ≥ 73 & Corruption ≥ 22; B: Love ≥ 85 & Corruption ≥ 38; C: Love ≥ 95 & Corruption ≥ 55 & sexual_stat (commander_submission) ≥ 32
- [ ] **27v.5** Define ASQ-9.5 for Elizabeth — gate: Love ≥ 70 & Corruption ≥ 18; B: Love ≥ 82 & Corruption ≥ 34; C: Love ≥ 93 & Corruption ≥ 50 & sexual_stat (scholar_experiment) ≥ 28
- [ ] **27v.6** Define ASQ-9.6 for Martha — gate: Love ≥ 65 & Corruption ≥ 12; B: Love ≥ 78 & Corruption ≥ 26; C: Love ≥ 90 & Corruption ≥ 42 & sexual_stat (hearth_devotion) ≥ 24; branch themes: farm wife's private garden / the husband's memory / Martha's full heart

### 27w. Chapter 10 — Standard SQ stat gates & alignment branches (Lilith, Morrgain, Seraphiel, Gabriel, Goddess Eve)

- [ ] **27w.1** Define stat-gate thresholds and alignment branches for Lilith's chain — A: Love ≥ 26 & Trust ≥ 24; B: Love ≥ 46 & Trust ≥ 44; C: Love ≥ 66 & Trust ≥ 64; branch themes: demonic bargain test / sigil of loyalty / the duchess yields her throne (Rebel: alliance of equals / Loyalist: absolute fealty)
- [ ] **27w.2** Define stat-gate thresholds and alignment branches for Morrgain's chain — A: Love ≥ 22 & Trust ≥ 20; B: Love ≥ 42 & Trust ≥ 40; C: Love ≥ 62 & Trust ≥ 60; branch themes: the succubus reversal / stolen moments before the reckoning / the general surrenders her shadow
- [ ] **27w.3** Define stat-gate thresholds and alignment branches for Seraphiel's chain — A: Love ≥ 28 & Trust ≥ 28; B: Love ≥ 48 & Trust ≥ 48; C: Love ≥ 68 & Trust ≥ 68; branch themes: fallen archangel's grief / order rewritten / six wings fold (Rebel: equal partnership / Loyalist: celestial submission)
- [ ] **27w.4** Define stat-gate thresholds and alignment branches for Gabriel's chain — A: Love ≥ 22 & Trust ≥ 22; B: Love ≥ 42 & Trust ≥ 42; C: Love ≥ 62 & Trust ≥ 62; branch themes: divine scout's report / the bow restrung / guardian and ward
- [ ] **27w.5** Define stat-gate thresholds and alignment branches for Goddess Eve's chain — A: Love ≥ 40 & Trust ≥ 40 (elevated entry — she is the Creator); B: Love ≥ 65 & Trust ≥ 65; C: Love ≥ 90 & Trust ≥ 90; both Rebel and Loyalist paths available; Rebel branch: mutual divine covenant — she chooses to bind herself to you as an equal, sharing her creative power willingly; Loyalist branch: her divinity is systematically broken through the chain — each quest escalates the sexual and psychological claim over her, culminating in her complete submission of will and being, the Creator made wholly yours

### 27x. Chapter 10 — Advanced SQ chains (Lilith, Morrgain, Seraphiel, Gabriel, Goddess Eve)

- [ ] **27x.1** Define ASQ-10.1 for Lilith — gate: Love ≥ 80 & Corruption ≥ 35; B: Love ≥ 92 & Corruption ≥ 55; C: Love ≥ 99 & Corruption ≥ 72 & sexual_stat (demon_dominion) ≥ 40; branch themes: the duchess tests her limit / obsidian chamber / the fallen one submits
- [ ] **27x.2** Define ASQ-10.2 for Morrgain — gate: Love ≥ 75 & Corruption ≥ 30; B: Love ≥ 88 & Corruption ≥ 48; C: Love ≥ 97 & Corruption ≥ 65 & sexual_stat (succubus_inversion) ≥ 38; branch themes: the succubus drained / dream and waking / soul-bound
- [ ] **27x.3** Define ASQ-10.3 for Seraphiel — gate: Love ≥ 82 & Corruption ≥ 20; B: Love ≥ 93 & Corruption ≥ 36; C: Love ≥ 99 & Corruption ≥ 52 & sexual_stat (holy_fall) ≥ 38; branch themes: wings and warmth / the order dissolved / archangel's grace surrendered
- [ ] **27x.4** Define ASQ-10.4 for Gabriel — gate: Love ≥ 75 & Corruption ≥ 18; B: Love ≥ 87 & Corruption ≥ 34; C: Love ≥ 96 & Corruption ≥ 50 & sexual_stat (seraph_devotion) ≥ 32; branch themes: the scout alone / bowstring and heartstring / forever at your side
- [ ] **27x.5** Define ASQ-10.5 for Goddess Eve — gate: ASQ-10.5A: Love ≥ 95 & Corruption ≥ 10 & sexual_stat (divine_submission) ≥ 40; ASQ-10.5B: Love ≥ 98 & Corruption ≥ 25 & sexual_stat (divine_submission) ≥ 55; ASQ-10.5C: Love ≥ 100 & Corruption ≥ 40 & sexual_stat (divine_submission) ≥ 70; Loyalist path across all three quests: each quest escalates the breaking of her divine nature — ASQ-10.5A establishes her physical surrender, ASQ-10.5B breaks her will and identity as Creator, ASQ-10.5C is the complete dissolution — she who made the world submits her whole being, erasing the boundary between goddess and possession; Rebel path: a mirror arc where she surrenders freely at each stage, retaining her love and choosing deeper devotion each time; both paths unlock the same final scene flag `eve_fully_bonded` but set different sub-flags (`eve_broken` vs `eve_willing`) that affect the epilogue

### 27y. Prologue companion — Martha (Prologue-era chain)

- [ ] **27y.1** Define stat-gate thresholds and alignment branches for Prologue Martha SQ chain (SQ-0.1A/B/C) — A: Love ≥ 12 & Trust ≥ 18; B: Love ≥ 28 & Trust ≥ 35; C: Love ≥ 45 & Trust ≥ 52; requires Oakhaven Homestead secure for C; branch themes: helping Goran / farm wife's small courage / the first heartfelt moment (Rebel: she chooses freely / Loyalist: she relies on protagonist for security)
- [ ] **27y.2** Define ASQ-0.1 for Prologue Martha — gate: Love ≥ 58 & Corruption ≥ 8 & sexual_stat (farm_warmth) ≥ 18; B: Love ≥ 72 & Corruption ≥ 22; C: Love ≥ 85 & Corruption ≥ 36 & sexual_stat (hearth_depth) ≥ 25; branch themes: the farmhouse evening / something more than kindness / Martha's complete trust

### 27z. PRD and task list housekeeping

- [ ] **27z.1** Update PRD §4.6 (Quest Engine) — add `STANDARD_SQ` and `ADVANCED_SQ` quest types; document `statGates`, `alignmentBranch`, and `statCeilings` fields; document stat-ceiling freeze rule and ceiling-lift timing
- [ ] **27z.2** Update PRD §4.6 acceptance criteria — add: stat-ceiling enforcement verified per NPC; ASQ chain only unlocks after SQ-X.xC complete; `QUEST_ALIGNMENT_BRANCH_CHOSEN` event emitted correctly; alignment score increments within ±10/±15 bounds; Goddess Eve `eve_broken` vs `eve_willing` sub-flags set correctly per path
- [ ] **27z.3** Update `task_list.md` version header to v3.8 and tracking reference to `PRD v1.8`

---

## Phase 28: Intimacy Scene Context Gates -- Exposure, Audience & Group Scenes

> Design contract (do not alter without a design session):
>
> **Moral degradation** and **sexual corruption** are derived read-only values used only at scene-initiation
> time; they never mutate character state themselves.
>
> `deriveMoralDegradation(npc)` is a pure helper returning [0-100]:
>   `base = corruptionCurrent x 0.6 + (100 - shameCurrent) x 0.3 + clamp(acquiredKinks.length x 4, 0, 10)`
>   `brokenFlag === true` overrides the result to `max(result, 90)` (fully broken = maximum degradation).
>
> Source fields (all read from existing NpcCharacter sub-objects; no new stored fields added):
>   `corruptionCurrent`  <- NpcCharacter.dynamicState.mental.corruptionCurrent
>   `shameCurrent`       <- NpcCharacter.dynamicState.mental.shameCurrent
>   `acquiredKinks`      <- NpcCharacter.sexualPsychology.acquiredKinks
>   `brokenFlag`         <- NpcCharacter.dynamicState.mental.brokenFlag
>
> **Gate thresholds (do not alter without a design session):**
>   Outdoor exposure gate passes when:  `deriveMoralDegradation(npc) >= 35 OR corruptionCurrent >= 40`
>   Audience gate passes when:          `deriveMoralDegradation(npc) >= 55 OR corruptionCurrent >= 60`
>   Group scene gate (per NPC):         `deriveMoralDegradation(npc) >= 50 AND corruptionCurrent >= 55`
>                                         AND side quest completion check (28e.1) passes
>
> FORCE_INTIMACY, FORCE_INTIMACY_SLEEPING, and POST_DEFEAT bypass the exposure and audience gates.
> They do not bypass the group scene gate (group is always consensual).
>
> **Group scene architecture:**
>   SceneStartType 'CONSENSUAL_GROUP' always means two NPC partners (primary + second).
>   IntimacyScene carries optional `secondPartner*` fields (all null in solo scenes).
>   All existing solo-scene mechanics (resistance, arousal, orgasm, satisfaction, persistence)
>   apply independently to each partner via optional `targetPartnerId` routing in `resolveSceneAction()`.
>   `calcSatisfaction()` averages both partners' contributions; `SceneEndPersistence` carries optional
>   second-partner fields; `resolvePostIntimacy()` writes back both partners independently.
>
> **Jealousy (lightweight, post-scene only):**
>   When both partners have each other in `npcRelationships` AND either has `JealousyTendency.High`
>   or holds an exclusive bond (Devoted / Bonded) with the other, `jealousyFired: true` is set in
>   `SceneEndPersistence` and the dispatcher applies a trust/bond delta between the two NPCs via
>   `npcSocialEngine`. No mid-scene jealousy interruption.

---

### 28a. Shared derivation helper

- [x] **28a.1** Implement `deriveMoralDegradation(npc: NpcCharacter): number` pure helper in `src/engines/intimacyEngine.ts` -- formula: `base = corruptionCurrent x 0.6 + (100 - shameCurrent) x 0.3 + clamp(acquiredKinks.length x 4, 0, 10)`; if `dynamicState.mental.brokenFlag === true`, return `Math.max(result, 90)`; clamp result [0, 100]. Reads `dynamicState.mental.corruptionCurrent`, `dynamicState.mental.shameCurrent`, `dynamicState.mental.brokenFlag`, and `sexualPsychology.acquiredKinks`. Export the function for use in dispatcher and future gate callers.

- [x] **28a.2** Add `IntimacyStartContext` interface to `src/engines/intimacyEngine.ts` -- `{ npc: NpcCharacter; startType: SceneStartType; isIndoors: boolean; npcsPresent: number; secondNpc?: NpcCharacter }`. Passed to all gate-check functions so gate signatures stay stable as new gates are added.

---

### 28b. Exposure gate (outdoor consent check)

- [x] **28b.1** Add `isIndoors?: boolean` to the `WorldNode` type in `src/state/gameState.ts` -- absent means false (outdoors). Update the 5-node stub in `src/data/worldGraph.ts`: set `isIndoors: true` on the two indoor nodes (inn, dungeon), omit or `false` on the three outdoor nodes. Full authored values deferred to Task 17.DATA.

- [x] **28b.2** Implement `checkExposureGate(ctx: IntimacyStartContext): { allowed: boolean; reason?: string }` pure function in `src/engines/intimacyEngine.ts` -- immediate `{ allowed: true }` when `ctx.isIndoors === true` OR `ctx.startType` is FORCE_INTIMACY / FORCE_INTIMACY_SLEEPING / POST_DEFEAT; passes when `deriveMoralDegradation(ctx.npc) >= 35 OR ctx.npc.dynamicState.mental.corruptionCurrent >= 40`; otherwise `{ allowed: false, reason: 'She glances around nervously. Not here -- not where anyone could see.' }`.

- [x] **28b.3** Wire exposure gate into `dispatcher.ts` INITIATE_INTIMACY handler (CONSENSUAL startType only) -- look up `WorldNode.isIndoors` from `world.currentNodeId`; call `countBystanders()` (28c.1) for `npcsPresent`; build `IntimacyStartContext`; call `checkExposureGate()`; if `allowed === false`, emit `INTIMACY_GATE_BLOCKED { gate: 'EXPOSURE', npcId, reason }` and return early without calling `startScene()`.

- [x] **28b.4** Add `INTIMACY_GATE_BLOCKED` to the `GameEvent` union in `src/state/gameState.ts` -- `{ type: 'INTIMACY_GATE_BLOCKED'; gate: 'EXPOSURE' | 'AUDIENCE' | 'GROUP_DEGRADATION' | 'GROUP_SQ'; npcId: string; reason: string }`. Emitted whenever a scene initiation gate blocks; consumed by the UI to display the refusal narrative.

---

### 28c. Audience gate (bystander presence check)

- [x] **28c.1** Implement `countBystanders(gameState: GameState): number` pure helper in `src/engines/worldEngine.ts` -- reads `world.occupantPositions`; counts entity IDs that are neither `'player'` nor any `party.companions[].npcId`; returns the count. Export so dispatcher calls it for both the audience gate and the group scene gate.

- [x] **28c.2** Implement `checkAudienceGate(ctx: IntimacyStartContext): { allowed: boolean; reason?: string }` pure function in `src/engines/intimacyEngine.ts` -- immediate `{ allowed: true }` when `ctx.npcsPresent === 0` OR `ctx.startType` is FORCE_INTIMACY / FORCE_INTIMACY_SLEEPING / POST_DEFEAT; passes when `deriveMoralDegradation(ctx.npc) >= 55 OR corruptionCurrent >= 60`; otherwise `{ allowed: false, reason: 'Her eyes dart to the others nearby. She won\'t do this with people watching.' }`.

- [x] **28c.3** Wire audience gate into `dispatcher.ts` INITIATE_INTIMACY handler (CONSENSUAL only) -- after exposure gate passes, call `checkAudienceGate()` with the same `IntimacyStartContext`; if blocked, emit `INTIMACY_GATE_BLOCKED { gate: 'AUDIENCE' }` and return early.

- [x] **28c.4** Post-scene shame spike for witnessed FORCE_INTIMACY_SLEEPING scenes -- in `resolvePostIntimacy()`, add optional `npcsPresent?: number` parameter (defaults 0; no break to existing callers); if `scene.startType === 'FORCE_INTIMACY_SLEEPING'` AND `npcsPresent > 0`, apply additional `shameDelta: +15` on top of normal computation and append a narrative line about waking to find witnesses. Dispatcher passes `countBystanders(gameState)` when calling `resolvePostIntimacy()` for this start type.

---

### 28d. Group scene -- schema extensions

- [x] **28d.1** Add `'CONSENSUAL_GROUP'` to the `SceneStartType` union in `src/engines/intimacyEngine.ts`. Document: always two NPC partners; bypasses exposure and audience gates; always gated by `adultContentEnabled` (same as all intimacy scenes).

- [x] **28d.2** Extend `IntimacyScene` in `src/engines/intimacyEngine.ts` with optional group-scene fields -- `secondPartnerNpcId: string | null`, `secondPartnerProfile: NpcPartnerProfile | null`, `secondPartnerArousal: number`, `secondPartnerStaminaCurrent: number`, `secondPartnerStaminaMax: number`, `secondPartnerHasFainted: boolean`, `secondPartnerLifeForce: number`, `secondPartnerEngagementStatus: PartnerEngagementStatus`, `secondOrgasmLog: FemaleOrgasmEvent[]`, `secondLoveDeltaAccum: number`, `secondTrustDeltaAccum: number`, `groupMode: 'MMF' | 'FFM' | null`. All null in solo scenes.

- [x] **28d.3** Extend `SceneEndPersistence` in `src/engines/intimacyEngine.ts` with optional second-partner fields -- `secondPartnerSquirtStorage?: number`, `secondPartnerSquirtProbability?: number`, `secondPartnerMilkStorage?: number`, `secondPartnerArousal?: number`, `secondPartnerCurrentWetness?: WetnessLevel`, `secondPartnerMood?: MoodValue`, `secondPartnerLoveDelta?: number`, `secondPartnerTrustDelta?: number`, `secondPartnerBlockedForDay?: boolean`, `secondPartnerLifeForceRemainder?: number`, `jealousyFired?: boolean`. All undefined in solo scenes.

- [x] **28d.4** Add optional `groupMode?: 'MMF' | 'FFM' | 'SOLO'` to `IntimacyPosition` in `src/engines/intimacyEngine.ts`; absent = SOLO. Tag relevant entries in `src/data/intimacyCatalog.ts`: positions physically requiring two male participants -> `'MMF'`; positions requiring two simultaneous female participants -> `'FFM'`; all existing entries remain untagged (treated as SOLO).

- [x] **28d.5** Add optional `targetPartnerId?: string` to `resolveSceneAction()` -- when present and equals `scene.secondPartnerNpcId`, route all arousal / resistance / stamina / faint / life-force / orgasm calculations to `secondPartner*` fields on `IntimacyScene`; primary partner fields untouched. Shared fields (turnCount, status, momentum, clothingState, consumables, actsThisScene, neckGrabActive) stay unified. Existing callers omit the parameter; no signature break.

- [x] **28d.6** Add `INTIMACY_GROUP_SCENE_STARTED` and `INTIMACY_GROUP_SCENE_ENDED` to the `GameEvent` union in `src/state/gameState.ts` -- `{ type: 'INTIMACY_GROUP_SCENE_STARTED'; primaryNpcId: string; secondNpcId: string; groupMode: 'MMF' | 'FFM' }` and `{ type: 'INTIMACY_GROUP_SCENE_ENDED'; primaryNpcId: string; secondNpcId: string; satisfaction: number; jealousyFired: boolean }`.

---

### 28e. Group scene -- initiation gate

- [x] **28e.1** Implement `isCompanionSqComplete(gameState: GameState, npcId: string): boolean` pure helper in `src/engines/questEngine.ts` -- returns `true` when `gameState.flags['sq_complete_' + npcId] === true`; also returns `true` when the npcId has no authored dialogue tree key in `DIALOGUE_TREES` (generic NPC with no quest chain -- no completion requirement applies); returns `false` otherwise. Export so the intimacy gate can call it without importing questEngine internals.

- [x] **28e.2** Implement `checkGroupSceneGate(ctx: IntimacyStartContext, gameState: GameState): { allowed: boolean; failedNpcId?: string; reason?: string }` pure function in `src/engines/intimacyEngine.ts` -- requires `ctx.secondNpc` to be defined; checks four conditions in order, returns on first failure: (1) `isCompanionSqComplete(gameState, ctx.npc.npcId)` -- primary NPC SQ; (2) `isCompanionSqComplete(gameState, ctx.secondNpc.npcId)` -- second NPC SQ; (3) `deriveMoralDegradation(ctx.npc) >= 50 AND corruptionCurrent >= 55` -- primary degradation; (4) same check on `ctx.secondNpc`. `failedNpcId` names which NPC blocked. Reasons: SQ block -- `'She\'s not ready for this -- there are things between you still unresolved.'`; degradation block -- `'She hesitates -- sharing something this intimate isn\'t something she can do yet.'`

- [x] **28e.3** Add `INITIATE_GROUP_INTIMACY` to `PlayerIntent` union in `dispatcher.ts`

---

### 28f. Group scene -- engine functions

- [x] **28f.1** Implement `startGroupScene(primaryNpcId, secondNpcId, groupMode, primaryPartner, secondPartner, player): IntimacyScene` in `src/engines/intimacyEngine.ts` -- calls `startScene()` to initialise all primary-partner fields; patches the returned scene with all `secondPartner*` group fields from 28d.2 populated from `secondPartner`; sets `startType = 'CONSENSUAL_GROUP'` and `groupMode`; returns the extended scene. Dispatcher emits `INTIMACY_GROUP_SCENE_STARTED` after receiving it.

- [x] **28f.2** Update `resolveSceneAction()` for group-scene target routing

- [x] **28f.3** Update `endScene()` for group-scene termination

- [x] **28f.4** Update `resolvePostIntimacy()` for group scenes

- [x] **28f.5** Update `getAvailableActions()` UI helper for group-mode filtering -- when `scene.groupMode !== null`, exclude positions whose `groupMode` is `'SOLO'` (or untagged) and include only positions matching `scene.groupMode`; when `scene.groupMode === null`, exclude positions tagged `'MMF'` or `'FFM'`.

---

### 28g. Group scene -- jealousy system

- [x] **28g.1** Implement `checkGroupJealousy(primaryNpc: NpcCharacter, secondNpc: NpcCharacter): boolean` pure helper in `src/engines/intimacyEngine.ts` -- returns `true` when either NPC's `npcRelationships` contains the other NPC's id AND (`bond === BondType.Devoted || bond === BondType.Bonded` on that entry, OR either NPC's `social.jealousyTendency === JealousyTendency.High`); returns `false` when neither has a relationship entry for the other. Reads `primaryNpc.npcRelationships`, `secondNpc.npcRelationships`, `primaryNpc.social`, `secondNpc.social`.

- [x] **28g.2** Wire jealousy consequence in dispatcher END_SCENE handler for group scenes

---

### 28h. Mock data and PRD housekeeping

- [x] **28h.1** Add a group-scene stub to `src/client/mock/mockIntimacyScene.ts` -- `secondPartnerNpcId: 'npc-meira'`, `groupMode: 'FFM'`, `startType: 'CONSENSUAL_GROUP'`, second-partner fields at plausible starting values (arousal 20, stamina 120/120, not fainted, life force 100, engagement NEUTRAL, empty orgasm log). Used by IntimacyView to render group-scene branches without a live dispatcher call.

- [x] **28h.2** Update the 5-node world graph stub in `src/data/worldGraph.ts` -- set `isIndoors: true` on at least 2 indoor nodes (inn, dungeon); omit `isIndoors` on 3 outdoor nodes. Update `mockGameState.ts` world stub accordingly.

- [ ] **28h.3** Update PRD §4.3 (Intimacy Engine) -- add subsections: (a) Exposure Gate: `deriveMoralDegradation` formula and source fields, thresholds, bypass conditions; (b) Audience Gate: same structure; (c) Group Scene: `'CONSENSUAL_GROUP'` start type, IntimacyScene group-field schema, SceneEndPersistence group-field schema, gate checks, jealousy check.

- [x] **28h.4** Update `task_list.md` version header to v3.9 and tracking reference to `PRD v1.9`.

---

## Phase 29: MP Pool — extend `statEngine` — **COMPLETE** (2026-10-12)

> Every character gains a `mp` pool added to `CharacterVitals`. The player also gains `mpBurnout` and `anomalousMp` fields. `statEngine.ts` owns derivation and overdraw/recovery logic. No separate engine file.
> World bible reference: `magic.mp_scale_placeholder`.

### 29a. State changes

- [x] **29a.1** Add `mp: { current: number; max: number }` to `CharacterVitals` in `gameState.ts` — default `{ current: 0, max: 0 }`; 0 is correct for monsters; non-zero set at character creation / spawn. Add to the `CharacterVitals` comment block. Export is unaffected.
- [x] **29a.2** Add `mpBurnout: number` to `PlayerCharacter` in `gameState.ts` — range [0, 100]; accumulated by overdraw; permanently reduces effective `mp.max` by `mpBurnout` percent. Default 0.
- [x] **29a.3** Add `anomalousMp: boolean` to `PlayerCharacter` in `gameState.ts` — `true` for the protagonist (unattuned Earth-origin MP); set by `characterCreationEngine.createCharacter()`; makes Temple Rite awakening rolls use a separate unpredictable outcome table (see Phase 30). Default `false`.

### 29b. statEngine extension

- [x] **29b.1** Add `MP_RACE_BASELINE` constant map in `statEngine.ts` — per `Race` enum value, baseline MP max for an unawakened adult. Human = 100; high_elf/dark_elf/demon/devil/vampire = 180; dwarf/high_orc = 110; angel = 2000; god = `Infinity` (sentinel; never stored on `CharacterVitals`). Unlisted races default to 100.
- [x] **29b.2** Implement `deriveMaxMp(race: Race, level: number, mpBurnout: number): number` in `statEngine.ts` — `floor(baselineForRace × (1 + level × 0.08)) × (1 - mpBurnout / 100)`, clamped min 10.
- [x] **29b.3** Implement `spendMp(state: GameState, targetId: string, amount: number): { state: GameState; events: GameEvent[] }` pure function in `statEngine.ts` — if `amount > current`: excess is overdraw; drains HP at 1 HP per 2 overdraw MP (floor); if HP would reach 0, clamped at 1 HP and `overdrawCollapse: true` set in event; increments player `mpBurnout` by `clamp(excess / 50, 0, 2)` per call, capped at 100. Emits `MP_SPENT` always; `MP_OVERDRAW` on overdraw; `MP_BURNOUT_GAINED` when `mpBurnout` increases.
- [x] **29b.4** Implement `restoreMp(state: GameState, targetId: string, amount: number): { state: GameState; events: GameEvent[] }` pure function in `statEngine.ts` — adds amount to `vitals.mp.current`, capped at `deriveMaxMp()` result. Emits `MP_RESTORED`.
- [x] **29b.5** Implement `applyMpRestOnSleep(state: GameState): { state: GameState; events: GameEvent[] }` in `statEngine.ts` — restores all characters' MP to their current derived max. Called by `calendarEngine.resolveSleep()` alongside Stamina/CPW restore.

### 29c. Events, wiring, and mock

- [x] **29c.1** Add MP `GameEvent` variants to `gameState.ts`: `MP_SPENT ({ targetId, amount, fromCurrent, toCurrent })`, `MP_OVERDRAW ({ targetId, overdrawAmount, hpDrained, overdrawCollapse: boolean })`, `MP_BURNOUT_GAINED ({ newBurnout: number })`, `MP_RESTORED ({ targetId, amount, newCurrent: number })`.
- [x] **29c.2** Wire `applyMpRestOnSleep()` into `calendarEngine.resolveSleep()` — called alongside `applyFullRestoreToParty()`.
- [x] **29c.3** Update `characterCreationEngine.createCharacter()` — set `player.vitals.mp` using `deriveMaxMp(race, 1, 0)` for starting values; set `anomalousMp: true`; set `mpBurnout: 0`.
- [x] **29c.4** Update `npcPopulationEngine.ts` NPC build path — set `vitals.mp` using `deriveMaxMp(race, 1, 0)` on every newly spawned humanoid. Monsters pass level 0 and burnout 0.
- [x] **29c.5** Update `mockGameState.ts` — add `mp: { current: 200, max: 200 }` to player vitals; `mpBurnout: 0`; `anomalousMp: true`. Add `mp: { current: 180, max: 180 }` to mock NPC vitals.

---

## Phase 30: Path Awakening — extend `jobEngine` — **COMPLETE** (2026-10-13)

> Only `PlayerCharacter` tracks unlocked paths; NPCs are spawned with racial affinities already in effect (no runtime gate needed on them). All awakening logic is added to `jobEngine.ts` as new exported functions.

### 30a. State changes

- [x] **30a.1** Add `unlockedPathIds: string[]` to `PlayerCharacter` in `gameState.ts` — list of `JobDef.id` strings the player has been awakened into. Seeded at character creation. `jobEngine.equipJob()` guard: throws if `jobId` not in `unlockedPathIds`.
- [x] **30a.2** Define `PathAwakeningTrigger` union type in `jobEngine.ts` and export it: `'STONE' | 'TEMPLE_RITE' | 'BLOODLINE' | 'STORY_EVENT'`.

### 30b. jobEngine extension

- [x] **30b.1** Implement `hasPathUnlocked(state: GameState, pathId: string): boolean` pure helper in `jobEngine.ts`.
- [x] **30b.2** Implement `unlockPath(state: GameState, pathId: string, trigger: PathAwakeningTrigger): { state: GameState; events: GameEvent[] }` in `jobEngine.ts` — idempotent (no-op if already unlocked); appends `pathId` to `player.unlockedPathIds`; emits `PATH_UNLOCKED`. For `trigger === 'TEMPLE_RITE'` AND `player.anomalousMp === true`, roll d10: 1–3 → unlocks with `anomalousRite: true` on event; 4–6 → unlocks normally; 7–9 → unlocks but applies a random status effect (id `'anomalous_rite_surge'`, defined in status effect catalog); 10 → emits `PATH_UNLOCK_FAILED` instead. Anomalous outcome content is handled by downstream quest/dialogue reactions to the event — engine stays pure.
- [x] **30b.3** Implement `getUnlockablePaths(state: GameState, catalog: JobDef[]): JobDef[]` in `jobEngine.ts` — returns all `JobDef` entries whose `id` is not in `player.unlockedPathIds`. Race affinity is not enforced mechanically here; the catalog carries affinity notes for UI display.
- [x] **30b.4** Guard `equipJob()` in `jobEngine.ts` — add `if (!hasPathUnlocked(state, jobId)) throw new Error(...)` at the top of the function body.

### 30c. Event wiring and mock

- [x] **30c.1** Add `PATH_UNLOCKED ({ pathId: string; trigger: PathAwakeningTrigger; anomalousRite?: boolean })` and `PATH_UNLOCK_FAILED ({ pathId: string; trigger: PathAwakeningTrigger; reason?: string })` to `GameEvent` union in `gameState.ts`.
- [x] **30c.2** Add `UNLOCK_PATH` to `PlayerIntent` union in `dispatcher.ts`; handler calls `unlockPath()` with trigger `'STONE'` (stone consumed from inventory) or `'TEMPLE_RITE'` per a `trigger` field on the intent payload.
- [x] **30c.3** Update `characterCreationEngine.createCharacter()` — call `unlockPath(state, options.jobId, 'STORY_EVENT')` to seed `unlockedPathIds` with the starting path.
- [x] **30c.4** Update `mockGameState.ts` — add `unlockedPathIds: ['warrior']` (or whichever starter job id the mock uses) to the player block.

---

## Phase 31: Charter Rank

> `charterRank` + `charterXP` live on `PlayerCharacter`. Implemented in a new `charterEngine.ts`. No separate `GameState` root block — everything on `player`.
> **Completed 2026-10-14.**

### 31a. State changes

- [x] **31a.1** Define `CharterRank` union type in `gameState.ts` and export it: `type CharterRank = 'WANDERER' | 'SCOUT' | 'WAYFARER' | 'RANGER' | 'CHAMPION' | 'LEGEND'`.
- [x] **31a.2** Add `charterRank: CharterRank` and `charterXP: number` to `PlayerCharacter` in `gameState.ts` — defaults `'WANDERER'` and `0`.
- [x] **31a.3** Add `{ type: 'CHARTER_RANK'; minRank: CharterRank }` variant to `DialogueCondition` union in `gameState.ts`.

### 31b. charterEngine.ts

- [x] **31b.1** Create `src/engines/charterEngine.ts` — define `CHARTER_XP_THRESHOLDS: Record<CharterRank, number>`: WANDERER 0, SCOUT 500, WAYFARER 1500, RANGER 4000, CHAMPION 10000, LEGEND 25000 (all provisional).
- [x] **31b.2** Implement `deriveCharterRank(xp: number): CharterRank` pure helper — walks thresholds descending; returns highest tier whose threshold ≤ xp.
- [x] **31b.3** Implement `awardCharterXP(state: GameState, amount: number): { state: GameState; events: GameEvent[] }` — adds amount to `player.charterXP`; calls `deriveCharterRank()`; if rank changed, updates `player.charterRank` and emits `CHARTER_RANK_UP`; always emits `CHARTER_XP_AWARDED`.

### 31c. Event and wiring

- [x] **31c.1** Add `CHARTER_XP_AWARDED ({ amount: number; newTotal: number })` and `CHARTER_RANK_UP ({ from: CharterRank; to: CharterRank })` to `GameEvent` union in `gameState.ts`.
- [x] **31c.2** Extend `QuestReward` in `src/data/quests.ts` — add optional `charterXP?: number` field. Update `questEngine.grantQuestReward()` to call `awardCharterXP()` when set.
- [x] **31c.3** Wire `awardCharterXP()` into `combatEngine.emitVictoryEvents()` — 10 XP per standard enemy kill, 50 per boss kill. Also fixed the pre-existing bug where `emitVictoryEvents` was emitting `ENEMY_KILLED_IN_INTIMACY` instead of `ENEMY_KILLED` (task 7.10).
- [x] **31c.4** Add `evaluateDialogueCondition()` branch in `dialogueEngine.ts` for `CHARTER_RANK` condition type — compare using the `CHARTER_XP_THRESHOLDS` order.
- [x] **31c.5** Update `mockGameState.ts` — add `charterRank: 'WANDERER'`, `charterXP: 0` to player block.

---

## Phase 32: Divinity Score

> Single numeric field on `PlayerCharacter`. Award function added to `statEngine.ts`.
> **Completed 2026-10-14.**

- [x] **32.1** Add `divinity: number` to `PlayerCharacter` in `gameState.ts` — range [0, ∞); default 0.
- [x] **32.2** Add `{ type: 'DIVINITY'; min: number }` variant to `DialogueCondition` union in `gameState.ts`.
- [x] **32.3** Add `DIVINITY_MILESTONES` const to `statEngine.ts`: `{ ISLAND_APPROACH: 5000, ISLAND_ENTRY: 8000 }` (provisional).
- [x] **32.4** Implement `awardDivinity(state: GameState, amount: number): { state: GameState; events: GameEvent[] }` pure function in `statEngine.ts` — adds amount; checks milestone crossings; emits `DIVINITY_GAINED` always, `DIVINITY_MILESTONE_REACHED` on crossing.
- [x] **32.5** Add `DIVINITY_GAINED ({ amount: number; newTotal: number })` and `DIVINITY_MILESTONE_REACHED ({ milestone: string; value: number })` to `GameEvent` union in `gameState.ts`.
- [x] **32.6** Extend `QuestReward` in `src/data/quests.ts` — add optional `divinity?: number` field. Update `questEngine.grantQuestReward()` to call `awardDivinity()` when set.
- [x] **32.7** Add `evaluateDialogueCondition()` branch in `dialogueEngine.ts` for `DIVINITY` condition type.
- [x] **32.8** Update `mockGameState.ts` — add `divinity: 0` to player block.

---

## Phase 33: Faith Field

> `faithId` added to `HumanoidCharacter` so every humanoid (player, NPC, humanoid enemy) carries a faith affiliation. A minimal `faithCatalog.ts` defines the four world faiths. Dialogue condition and effect variants added. No separate faith engine.

### 33a. State changes

- [x] **33a.1** Define `FaithId` type in `gameState.ts` and export it: `type FaithId = 'radiant_faith' | 'old_wood' | 'stone_covenant' | 'night_court' | 'none'`.
- [x] **33a.2** Add `faithId: FaithId | undefined` to `HumanoidCharacter` in `gameState.ts` — `undefined` = not yet established; `'none'` = explicitly secular. Set by spawn-engine from race profile defaults (33b.2).
- [x] **33a.3** Add `{ type: 'FAITH'; faithId: FaithId }` variant to `DialogueCondition` union in `gameState.ts`.
- [x] **33a.4** Add `{ type: 'SET_FAITH'; faithId: FaithId; npcId: string }` variant to `DialogueEffect` union in `gameState.ts` — `npcId: 'player'` targets the player; any other value targets an NPC in contacts.

### 33b. Faith catalog and spawn wiring

- [x] **33b.1** Create `src/data/faithCatalog.ts` — define `FaithDef` interface: `{ id: FaithId; name: string; godPatronIds: GodId[]; alignedPathIds: string[]; templeRiteXpBonus: number }`. Author all four: Radiant Faith (Solenne + Varan; +15% rite XP), Old Wood (Aeloria + Thessaly; +20%), Stone Covenant (Durgrim + Hestrel; +10%), Night Court (Nyxara + Malvek + Kharrath; +5%).
- [x] **33b.2** Add `DEFAULT_FAITH_BY_RACE` const to `faithCatalog.ts` — maps each `Race` enum value to a `FaithId` default (human → radiant_faith; high_elf/wood_elf/dark_elf → old_wood; dwarf → stone_covenant; demon/devil/succubus_incubus/vampire → night_court; high_orc/beastfolk/dragonkin → old_wood; angel → radiant_faith; god → none).

### 33c. Engine wiring

- [x] **33c.1** Update `npcPopulationEngine.ts` NPC build path — set `faithId` from `DEFAULT_FAITH_BY_RACE[npc.race]` on every newly spawned humanoid.
- [x] **33c.2** Update `characterCreationEngine.createCharacter()` — set `player.faithId` from `DEFAULT_FAITH_BY_RACE[options.race ?? 'human']`.
- [x] **33c.3** Add `evaluateDialogueCondition()` branch in `dialogueEngine.ts` for `FAITH` condition — checks `state.player.faithId` for player-targeted; checks the relevant contact's `faithId` for NPC-targeted.
- [x] **33c.4** Add `applyDialogueEffect()` branch in `dialogueEngine.ts` for `SET_FAITH` — writes `faithId` to player or targeted NPC character; emits `FAITH_SET`.
- [x] **33c.5** Add `FAITH_SET ({ targetId: string; faithId: FaithId; previousFaithId: FaithId | undefined })` to `GameEvent` union in `gameState.ts`.
- [x] **33c.6** Update `mockGameState.ts` — set `faithId: 'radiant_faith'` on player; set appropriate `faithId` on all mock NPC entries.

---

## Phase 34: Lore Update — God Binding = Slavery at God Scale

> No new engine. The world bible is updated to establish that enslaving any being (mortal or divine) uses the same MP-chain mechanism at the appropriate scale. Devil contracts are a formalised legal variant of the same. Existing `tamingEngine` patterns + the Phase 36 `gods` state block together cover all enslavement cases — no separate `contractEngine.ts` is needed.

- [x] **34.1** Update `world_bible_and_game_lore_starter.json` — add `"binding"` sub-key inside the `"magic"` object:
  ```json
  "binding": {
    "mechanism": "Enslaving any being — mortal or divine — works via MP-chain binding: suppressing and redirecting the target's MP flow. For mortals, physical restraints plus suppression runes suffice. For gods, the same principle applies at vastly greater MP scale: a god-level ward must suppress the god's entire pool. Devil contracts are a formalised legal variant (binding the signatory's future MP flow to an obligation). No separate discipline of 'contract magic' exists; all binding is a lore application of rune magic at appropriate scale.",
    "mortals": "Slavers use physical restraints combined with suppression runes engraved by a Runesmith. MP flow is dampened, not severed; the enslaved person retains enough MP to remain healthy and functional.",
    "gods": "A god-level ward must suppress the god's entire MP pool — orders of magnitude greater than any mortal's. Only the Creator's original Binding of the Gods clause achieves this. Kharrath's Ember Conclave exploited an ancient loophole in that clause to imprison Varan.",
    "designer_note": "Use existing tamingEngine (humanoid capture) and the godStatusEngine gods block (Phase 36) for all enslavement. No separate contractEngine required."
  }
  ```
- [x] **34.2** Update `world_bible_and_game_lore_starter.json` `provisional_elements` array — replace `"Sealed contracts binding MP (devils)"` with `"Devil contracts as a formalised MP-chain binding: same mechanism as mortal enslavement, different legal form"`.
- [x] **34.3** Update `world_bible_and_game_lore_starter.json` `central_mystery_revised.enslaver.how` — append the sentence: `"Mechanically this is a god-level suppression ward — the same MP-chain principle as mortal enslavement, anchored to the Creator's original Binding of the Gods clause, which provides the only ward strong enough to hold a god's entire MP pool."`

---

## Phase 35: Seasonal World Effects — extend `calendarEngine`

> `CalendarState` gains `season`; a `SeasonModifiers` block lands on `GameState` root. `calendarEngine` emits `SEASON_CHANGED` and recomputes the overlay on each day transition. Three consumer engines read the modifiers.

### 35a. State changes

- [x] **35a.1** Define `Season` union type in `gameState.ts` and export it: `type Season = 'SPRING' | 'SUMMER' | 'RAINY' | 'WINTER'`.
- [x] **35a.2** Add `season: Season` to `CalendarState` in `gameState.ts` — default `'SPRING'`; derived and updated by `calendarEngine` on each day transition.
- [x] **35a.3** Define `SeasonModifiers` interface in `gameState.ts` and export it: `{ travelCostMultiplier: number; encounterRateMultiplier: number; marketPriceMultiplier: number; mpRecoveryMultiplier: number }`.
- [x] **35a.4** Add `seasonModifiers: SeasonModifiers` to `GameState` root — default all multipliers `1.0`.

### 35b. calendarEngine extension

- [x] **35b.1** Implement `deriveCurrentSeason(day: number): Season` pure function in `calendarEngine.ts` — day mod 365 divided into four blocks: 1–91 = SPRING, 92–182 = SUMMER, 183–273 = RAINY, 274–365 = WINTER (provisional).
- [x] **35b.2** Add `SEASON_MODIFIER_TABLE: Record<Season, SeasonModifiers>` const in `calendarEngine.ts` — SPRING: all 1.0; SUMMER: encounter ×1.2, market ×0.95, rest unchanged; RAINY: travel ×1.4, encounter ×0.8, market ×1.05; WINTER: travel ×1.1, mp_recovery ×1.2, market ×1.15. All provisional.
- [x] **35b.3** Add `SEASON_CHANGED ({ from: Season; to: Season; day: number })` to `GameEvent` union in `gameState.ts`.
- [x] **35b.4** Update `calendarEngine.runDayEndTick()` — after step 8 (date increment), call `deriveCurrentSeason()`; if result differs from `calendar.season`, update `calendar.season` and `state.seasonModifiers` from `SEASON_MODIFIER_TABLE`; emit `SEASON_CHANGED`.

### 35c. Consumer wiring

- [x] **35c.1** Update `travelCostEngine.ts` — multiply computed travel gold cost by `state.seasonModifiers.travelCostMultiplier` before returning.
- [x] **35c.2** Update `environmentEngine.advanceWeather()` — multiply each weather catalog entry's `weight` by `state.seasonModifiers.encounterRateMultiplier` before the weighted roll so RAINY season biases heavy-rain weights up.
- [x] **35c.3** Update `economyEngine.buyItem()` — multiply `effectiveBuyPrice` by `state.seasonModifiers.marketPriceMultiplier` (applied after the existing reputation discount).
- [x] **35c.4** Update `statEngine.applyMpRestOnSleep()` (Phase 29b.5) — multiply restored MP amount by `state.seasonModifiers.mpRecoveryMultiplier`.
- [x] **35c.5** Update `mockGameState.ts` — add `season: 'SPRING'` to calendar block; add `seasonModifiers: { travelCostMultiplier: 1.0, encounterRateMultiplier: 1.0, marketPriceMultiplier: 1.0, mpRecoveryMultiplier: 1.0 }` to root.

---

## Phase 36: God Status Tracking — `godStatusEngine`

> A `gods` block on `GameState` holds the live state of all nine gods. `godStatusEngine.ts` owns all mutations. `jobEngine` reads god status to gate Templar Path availability (patron god must be FREE).

### 36a. State changes

- [x] **36a.1** Define `GodId` union type in `gameState.ts` and export it: `type GodId = 'solenne' | 'varan' | 'aeloria' | 'thessaly' | 'durgrim' | 'hestrel' | 'nyxara' | 'kharrath' | 'malvek'`.
- [x] **36a.2** Define `GodState` interface in `gameState.ts` and export it: `{ status: 'FREE' | 'ENSLAVED' | 'DEAD'; enslavedById?: string; enslavedOnDay?: number; killedOnDay?: number }`. `enslavedById` is `'kharrath_ember_conclave'` for Varan's pre-game enslavement; `player.id` for a Power End scenario.
- [x] **36a.3** Add `gods: Record<GodId, GodState>` to `GameState` root.
- [x] **36a.4** Add god status `GameEvent` variants to `gameState.ts`: `GOD_ENSLAVED ({ godId: GodId; enslavedById: string; day: number })`, `GOD_FREED ({ godId: GodId; day: number })`, `GOD_KILLED ({ godId: GodId; day: number })`.

### 36b. godStatusEngine.ts

- [x] **36b.1** Create `src/engines/godStatusEngine.ts` — implement `createDefaultGodRecord(): Record<GodId, GodState>` — all gods `FREE` except `varan: { status: 'ENSLAVED', enslavedById: 'kharrath_ember_conclave', enslavedOnDay: 0 }`.
- [x] **36b.2** Implement `enslaveGod(state, godId, enslaverId): { state, events }` — guard: throws if already ENSLAVED or DEAD; sets status, records `enslavedById` and `enslavedOnDay = calendar.day`; emits `GOD_ENSLAVED`.
- [x] **36b.3** Implement `freeGod(state, godId): { state, events }` — guard: throws if not ENSLAVED; sets `status: 'FREE'`, clears enslaved fields; emits `GOD_FREED`.
- [x] **36b.4** Implement `killGod(state, godId): { state, events }` — guard: throws if already DEAD; sets `status: 'DEAD'`, records `killedOnDay`; emits `GOD_KILLED`.
- [x] **36b.5** Implement `isGodFree(state, godId): boolean` and `getGodStatus(state, godId): GodState` pure read helpers. Export both.

### 36c. Cross-engine wiring

- [x] **36c.1** Update `jobEngine.unlockPath()` — when `trigger === 'TEMPLE_RITE'`, look up the path's patron god from `faithCatalog.ts` (via the `alignedPathIds` field); if that god is not FREE per `isGodFree()`, emit `PATH_UNLOCK_FAILED` with `reason: 'GOD_UNAVAILABLE'` instead of proceeding.
- [x] **36c.2** Update `dispatcher.ts` `processEventQueue()` — add handlers for `GOD_ENSLAVED`, `GOD_FREED`, `GOD_KILLED`: each writes the corresponding story flag (`flags['god_status_<godId>']`) and calls `endingTrackerEngine.updateEndingAxis()` (Phase 37) to keep the ending state current.
- [x] **36c.3** Update `mockGameState.ts` — add `gods` block initialised from `createDefaultGodRecord()` (varan ENSLAVED, all others FREE).

---

## Phase 37: Ending Axis Tracker — `endingTrackerEngine`

> A lightweight `endingAxes` block on `GameState` aggregates all ending-relevant axis states. `endingTrackerEngine.ts` owns mutation and ending resolution. Engines that produce ending-relevant outcomes update axes through the dispatcher event queue.

### 37a. State changes

- [ ] **37a.1** Define `EndingAxisState` interface in `gameState.ts` and export it:
  ```ts
  interface EndingAxisState {
    goddess:      'ENSLAVED_BY_KHARRATH' | 'FREED_DIMINISHED' | 'FREED_RESTORED' | 'ENSLAVED_BY_PLAYER' | 'KILLED' | 'UNKNOWN';
    gods:         'ALL_SAFE' | 'PARTIAL_LOSS' | 'MULTIPLE_LOST' | 'UNKNOWN';
    kharrath:     'DEFEATED' | 'IMPRISONED' | 'ASCENDED' | 'ACTIVE';
    playerThrone: 'STEPPED_BACK' | 'RULING' | 'UNDECIDED';
    faith:        'TRUTH' | 'LIE' | 'UNDECIDED';
    law:          'CROWNS' | 'CHARTER' | 'LEDGER_REFORMED' | 'DIVIDED' | 'UNDECIDED';
  }
  ```
- [ ] **37a.2** Define `EndingId` type in `gameState.ts` and export it: `type EndingId = 'the_restored_pantheon' | 'the_diminished_return' | 'the_silent_victory' | 'the_iron_throne_of_law' | 'the_broken_pantheon' | 'the_dead_sky' | 'the_god_king' | 'the_creator_stirs'`.
- [ ] **37a.3** Add `endingAxes: EndingAxisState` to `GameState` root — game-start defaults: `goddess: 'ENSLAVED_BY_KHARRATH'` (Varan is enslaved at Day 1), `kharrath: 'ACTIVE'`, all others `'UNKNOWN'` or `'UNDECIDED'`.
- [ ] **37a.4** Add `ENDING_AXIS_UPDATED ({ axis: keyof EndingAxisState; newValue: string; day: number })` to `GameEvent` union in `gameState.ts`.

### 37b. endingTrackerEngine.ts

- [ ] **37b.1** Create `src/engines/endingTrackerEngine.ts` — implement `createDefaultEndingAxes(): EndingAxisState` returning the game-start defaults from 37a.3.
- [ ] **37b.2** Implement `updateEndingAxis<K extends keyof EndingAxisState>(state: GameState, axis: K, value: EndingAxisState[K]): { state: GameState; events: GameEvent[] }` — updates the axis; emits `ENDING_AXIS_UPDATED`.
- [ ] **37b.3** Implement `resolveEnding(state: GameState): EndingId | undefined` pure function — evaluates `state.endingAxes` against a `ENDING_CONDITIONS` const (array of `{ id: EndingId; requires: Partial<EndingAxisState> }` entries from the world bible endings); returns the first full match, `undefined` if none yet match.

### 37c. Wiring

- [ ] **37c.1** Wire `updateEndingAxis()` in `dispatcher.ts` `processEventQueue()` for `GOD_FREED`, `GOD_ENSLAVED`, `GOD_KILLED` — map to `goddess` axis for Varan; to `gods` axis for other gods (count of enslaved/killed gods drives PARTIAL_LOSS / MULTIPLE_LOST states).
- [ ] **37c.2** Extend `QuestDef` in `src/data/quests.ts` — add optional `endingAxisEffect?: { axis: keyof EndingAxisState; value: string }` field. Update `questEngine.grantQuestReward()` to call `updateEndingAxis()` when set (for main-quest completions that resolve faith/law/playerThrone axes).
- [ ] **37c.3** Update `mockGameState.ts` — add `endingAxes` using `createDefaultEndingAxes()`.

---

## Phase 38: Banking — extend `economyEngine`

> A `bank` block on `GameState` tracks deposit accounts and loans per node. All functions added to `economyEngine.ts`. Loan interest ticks at day-end. Banking unlocked only at nodes with the `'bank'` location feature.

### 38a. State changes

- [ ] **38a.1** Define `BankAccountState` interface in `gameState.ts` and export it: `{ nodeId: string; balance: number; openedOnDay: number }`.
- [ ] **38a.2** Define `LoanState` interface in `gameState.ts` and export it: `{ nodeId: string; principal: number; interestRatePercent: number; dueOnDay: number; borrowedOnDay: number; remainingDebt: number; isDefaulted: boolean }`.
- [ ] **38a.3** Define `BankState` interface in `gameState.ts` and export it: `{ accounts: BankAccountState[]; loans: LoanState[]; totalEverDeposited: number }`.
- [ ] **38a.4** Add `bank: BankState` to `GameState` root — default `{ accounts: [], loans: [], totalEverDeposited: 0 }`.
- [ ] **38a.5** Add `'bank'` to `LocationFeatureKey` union in `gameState.ts` — nodes with this feature unlock bank-related intents in the dispatcher.

### 38b. economyEngine extension

- [ ] **38b.1** Implement `openBankAccount(state, nodeId): { state, events }` in `economyEngine.ts` — guard: one account per node; guard: current node must have `'bank'` feature; creates account with `balance: 0`; emits `BANK_ACCOUNT_OPENED`.
- [ ] **38b.2** Implement `deposit(state, nodeId, amount): { state, events }` — guard: account exists; guard: player gold ≥ amount; deducts gold; credits account; updates `totalEverDeposited`; emits `BANK_DEPOSIT` and `GOLD_CHANGED`.
- [ ] **38b.3** Implement `withdraw(state, nodeId, amount): { state, events }` — guard: account balance ≥ amount; transfers to player gold; emits `BANK_WITHDRAWAL` and `GOLD_CHANGED`.
- [ ] **38b.4** Implement `takeLoan(state, nodeId, amount): { state, events }` — guard: no existing defaulted loan at this node; guard: region reputation ≥ Neutral. `interestRatePercent` by reputation tier (Renowned 5%, Liked 8%, Neutral 12%). `dueOnDay = calendar.day + 30`. Adds gold; creates `LoanState` entry; emits `LOAN_TAKEN` and `GOLD_CHANGED`.
- [ ] **38b.5** Implement `repayLoan(state, nodeId, amount): { state, events }` — partial payments reduce `remainingDebt`; full payment removes the entry; emits `LOAN_REPAID` and `GOLD_CHANGED`.
- [ ] **38b.6** Implement `tickLoanInterest(state): { state, events }` — called at day-end; for each active non-defaulted loan: if `calendar.day > dueOnDay`, accrue 1% of `remainingDebt` per overdue day (compound; capped at 5× `principal`); when `remainingDebt > 2× principal`, set `isDefaulted: true`, emit `LOAN_DEFAULT`, call `applyReputationDelta(regionId, -50)` as the bank-default reputation penalty.

### 38c. Events, dispatcher, and mock

- [ ] **38c.1** Add bank `GameEvent` variants to `gameState.ts`: `BANK_ACCOUNT_OPENED ({ nodeId })`, `BANK_DEPOSIT ({ nodeId; amount; newBalance })`, `BANK_WITHDRAWAL ({ nodeId; amount; newBalance })`, `LOAN_TAKEN ({ nodeId; principal; interestRatePercent; dueOnDay })`, `LOAN_REPAID ({ nodeId; amountPaid; remaining })`, `LOAN_INTEREST_ACCRUED ({ nodeId; amount; newTotal })`, `LOAN_DEFAULT ({ nodeId; totalDebt })`.
- [ ] **38c.2** Add `OPEN_BANK_ACCOUNT`, `DEPOSIT`, `WITHDRAW`, `TAKE_LOAN`, `REPAY_LOAN` to `PlayerIntent` union in `dispatcher.ts`; each handler guards the `'bank'` feature on `world.currentNodeId` and routes to the corresponding function.
- [ ] **38c.3** Wire `tickLoanInterest()` into `calendarEngine.runDayEndTick()` as a new step after step 8 (date increment) and before step 9 (NPC social tick).
- [ ] **38c.4** Update `mockGameState.ts` — add `bank: { accounts: [], loans: [], totalEverDeposited: 0 }` to root.

---

## Phase 39: Mind Control — Skill Engine Extension

> Mind control is a configurable `SkillEffect` variant in the existing skill system. A `MindControlParams` config object makes all costs, durations, resistance rules, and backlash catalog-driven so other lore can define entirely different mechanics without touching the engine.

### 39a. Schema

- [ ] **39a.1** Add `MindControlParams` interface to `skillEngine.ts` and export it: `{ mpCostFlat: number; mpCostPerTargetMpRatio: number; durationTurns: number; backlashHpPct: number; resistBreakChancePerTurn: number; maxTargetMpRatio: number; charmVariant?: boolean }`. `charmVariant: true` = lightweight social influence (Bard/Emissary Path use): no resistance break roll, much lower cost, no backlash; full `false` = hard control.
- [ ] **39a.2** Add `{ type: 'MIND_CONTROL'; params: MindControlParams }` to `SkillEffect` union in `skillEngine.ts`.
- [ ] **39a.3** Define `MindControlState` interface in `gameState.ts` and export it: `{ targetId: string; casterId: string; remainingTurns: number; params: MindControlParams; isCharm: boolean }`.
- [ ] **39a.4** Add `activeMindControls: MindControlState[]` to `GameState` root — default `[]`.

### 39b. skillEngine logic

- [ ] **39b.1** Implement `applyMindControl(state, casterId, targetId, params, isCharm): { state, events }` in `skillEngine.ts` — guard: resolve target's `vitals.mp.current`; if `target mp > caster mp.max × params.maxTargetMpRatio` emit `MIND_CONTROL_RESISTED ({ reason: 'MP_TOO_HIGH' })` and return; deduct `mpCostFlat + (targetMp × mpCostPerTargetMpRatio)` from caster via `spendMp()`; if insufficient caster MP emit `MIND_CONTROL_RESISTED ({ reason: 'INSUFFICIENT_CASTER_MP' })` and return; apply `backlashHpPct × caster.vitals.hp.max` HP drain to caster (skip when `isCharm`); push `MindControlState` entry; emit `MIND_CONTROL_APPLIED`.
- [ ] **39b.2** Implement `tickMindControls(state): { state, events }` in `skillEngine.ts` — for each `MindControlState`: decrement `remainingTurns`; if `remainingTurns <= 0` emit `MIND_CONTROL_EXPIRED` and remove; else roll `resistBreakChancePerTurn` against `target.stats.wis / 100`; on break emit `MIND_CONTROL_BROKEN` and remove. Skip resistance roll when `isCharm`.
- [ ] **39b.3** Implement pure helpers `isMindControlled(state, targetId): boolean` and `getMindControl(state, targetId): MindControlState | undefined`. Export both.
- [ ] **39b.4** Implement `releaseAllMindControls(state): { state, events }` — removes all entries; emits `MIND_CONTROL_EXPIRED` for each. Called at combat end.

### 39c. Events and dispatcher wiring

- [ ] **39c.1** Add `GameEvent` variants to `gameState.ts`: `MIND_CONTROL_APPLIED ({ casterId; targetId; durationTurns; isCharm })`, `MIND_CONTROL_RESISTED ({ casterId; targetId; reason: 'MP_TOO_HIGH' | 'INSUFFICIENT_CASTER_MP' })`, `MIND_CONTROL_BROKEN ({ targetId; atTurn: number })`, `MIND_CONTROL_EXPIRED ({ targetId })`.
- [ ] **39c.2** Add `MIND_CONTROL` and `CHARM` to `PlayerIntent` union in `dispatcher.ts`; both route to `applyMindControl()` with `isCharm` derived from intent type.
- [ ] **39c.3** Wire `tickMindControls()` into `combatEngine.ts` at the start of each player-turn resolution step (before action selection).
- [ ] **39c.4** Wire `releaseAllMindControls()` in `dispatcher.ts` `processEventQueue()` — called when `COMBAT_ENCOUNTER` resolves (win, flee, or defeat).
- [ ] **39c.5** Update `mockGameState.ts` — add `activeMindControls: []` to root.

---

## Phase 40: Teleportation Wards — WorldNode Property

> One boolean flag on `WorldNode`; one guard in `worldEngine.ts`. No new engine needed. Wards block both inbound and outbound teleportation, matching the world bible list (prisons, courthouses, vaults, castles, temples, Charter halls, dwarven holds, Ledger Court halls).

- [ ] **40.1** Add `wardedAgainstTeleport?: boolean` to `WorldNode` type in `gameState.ts` — absent/`undefined` = not warded. Applies to both inbound (FAST_TRAVEL destination) and outbound (current node). Document world bible ward-site list in JSDoc comment.
- [ ] **40.2** Add `TELEPORT_WARD_BLOCKED ({ nodeId: string; direction: 'INBOUND' | 'OUTBOUND' })` to `GameEvent` union in `gameState.ts`.
- [ ] **40.3** Update `worldEngine.ts` FAST_TRAVEL handler — before processing: check `wardedAgainstTeleport` on `state.world.currentNodeId` (outbound) and on the destination node (inbound); if either is `true`, emit `TELEPORT_WARD_BLOCKED` and return state unchanged (no gold deducted).
- [ ] **40.4** Update `spireEngine.ts` spire-travel path — spires bypass gold cost but NOT wards; apply the same outbound/inbound `wardedAgainstTeleport` check before processing a spire-travel intent.
- [ ] **40.5** Update `worldGraph.ts` stub nodes — add `wardedAgainstTeleport: true` to one example node (e.g. a prison/vault stub) with a JSDoc comment linking to the world bible ward-site list; all other stubs default to absent (not warded). Full ward attribution for all 81+ nodes is part of Phase 42h world data authoring.

---

## Phase 41: Generic Faction System

> A catalog-driven faction engine. Factions have a standing score ([-100, +100]) and optional membership with rank. Knightly orders are a faction sub-type that gate on patron god status via `godStatusEngine`. The catalog is Ojisan-specific; the engine is lore-agnostic.

### 41a. State changes

- [ ] **41a.1** Define `FactionTier` union type in `gameState.ts` and export it: `type FactionTier = 'HOSTILE' | 'UNFRIENDLY' | 'NEUTRAL' | 'FRIENDLY' | 'TRUSTED' | 'CHAMPION'`.
- [ ] **41a.2** Define `FactionStanding` interface in `gameState.ts` and export it: `{ score: number; tier: FactionTier; isMember: boolean; memberRank?: string }`.
- [ ] **41a.3** Add `factions: Record<string, FactionStanding>` to `GameState` root — default `{}`; entries created lazily on first `applyFactionDelta()` call for that faction id.
- [ ] **41a.4** Add `{ type: 'FACTION_STANDING'; factionId: string; min: number }` and `{ type: 'FACTION_MEMBER'; factionId: string }` variants to `DialogueCondition` union in `gameState.ts`.
- [ ] **41a.5** Add `{ type: 'FACTION_DELTA'; factionId: string; delta: number }`, `{ type: 'JOIN_FACTION'; factionId: string; rank?: string }`, and `{ type: 'LEAVE_FACTION'; factionId: string }` variants to `DialogueEffect` union in `gameState.ts`.

### 41b. factionEngine.ts

- [ ] **41b.1** Create `src/engines/factionEngine.ts` — define and export `FactionDef` interface: `{ id: string; name: string; type: 'adventurer_guild' | 'mercenary' | 'criminal' | 'religious' | 'knightly_order' | 'academic' | 'political' | 'trade' | 'underground'; description: string; patronGodId?: GodId; tiers: Array<{ tier: FactionTier; minScore: number; label: string }>; memberRanks?: string[]; defaultScore: number }`.
- [ ] **41b.2** Implement `deriveFactionTier(score: number, def: FactionDef): FactionTier` pure helper — walks `def.tiers` descending by `minScore`; returns the highest tier whose `minScore ≤ score`.
- [ ] **41b.3** Implement `applyFactionDelta(state, factionId, delta, catalog): { state, events }` — lazy-init entry from `def.defaultScore` if absent; clamp score [-100, 100]; recompute tier; emit `FACTION_STANDING_CHANGED`; if tier boundary crossed also emit `FACTION_TIER_CROSSED`.
- [ ] **41b.4** Implement `joinFaction(state, factionId, rank, catalog): { state, events }` — guard: `isKnightlyOrderActive(state, factionId, catalog)` must be true for type `'knightly_order'`; sets `isMember: true`, `memberRank: rank`; emits `FACTION_JOINED`.
- [ ] **41b.5** Implement `leaveFaction(state, factionId): { state, events }` — sets `isMember: false`, clears `memberRank`; emits `FACTION_LEFT`.
- [ ] **41b.6** Implement `isKnightlyOrderActive(state, factionId, catalog): boolean` — for `type !== 'knightly_order'` always returns `true`; for knightly orders calls `isGodFree(state, def.patronGodId)` from `godStatusEngine`; returns `false` when patron god is ENSLAVED or DEAD. This is the Phase 36c.1 hook.
- [ ] **41b.7** Implement pure helpers `getFactionStanding(state, factionId, catalog): FactionStanding` (returns existing entry or `{ score: def.defaultScore, tier, isMember: false }`) and `isFactionMember(state, factionId): boolean`.
- [ ] **41b.8** Implement `tickFactionDecay(state, catalog): { state, events }` — called at day-end; for factions with `type: 'criminal' | 'underground'` only: positive scores above NEUTRAL decay by 1 point/day; all other faction types do not decay. Emits `FACTION_STANDING_CHANGED` for each changed entry.

### 41c. Events and dispatcher wiring

- [ ] **41c.1** Add `GameEvent` variants to `gameState.ts`: `FACTION_STANDING_CHANGED ({ factionId; delta; newScore; newTier })`, `FACTION_TIER_CROSSED ({ factionId; from: FactionTier; to: FactionTier })`, `FACTION_JOINED ({ factionId; rank?: string })`, `FACTION_LEFT ({ factionId })`.
- [ ] **41c.2** Extend `QuestReward` in `src/data/quests.ts` — add optional `factionDeltas?: { factionId: string; delta: number }[]` field. Update `questEngine.grantQuestReward()` to call `applyFactionDelta()` for each entry.
- [ ] **41c.3** Add `evaluateDialogueCondition()` branches in `dialogueEngine.ts` for `FACTION_STANDING` (reads `state.factions[factionId].score`) and `FACTION_MEMBER` (reads `state.factions[factionId].isMember`).
- [ ] **41c.4** Add `applyDialogueEffect()` branches in `dialogueEngine.ts` for `FACTION_DELTA`, `JOIN_FACTION`, and `LEAVE_FACTION` effects — each routes to the corresponding `factionEngine` function.
- [ ] **41c.5** Wire `tickFactionDecay()` into `calendarEngine.runDayEndTick()` as a new step after step 8 (date increment), alongside `tickLoanInterest()`.
- [ ] **41c.6** Update `mockGameState.ts` — add `factions: {}` to root.

### 41d. Faction catalog data

- [ ] **41d.1** Create `src/data/factionCatalog.ts` — define and export `FACTION_CATALOG: Record<string, FactionDef>` with all 16 entries:
  - `wayfarers_charter` (adventurer_guild; no patron god; tiers HOSTILE→CHAMPION; memberRanks: ['Initiate', 'Journeyman', 'Ranger', 'Champion', 'Legend'])
  - `gilded_spears` (mercenary; defaultScore 0)
  - `greywatch_company` (mercenary; defaultScore 0)
  - `salt_wharf_brotherhood` (criminal; defaultScore -20)
  - `veil_hands` (underground; defaultScore -10)
  - `free_road` (underground; defaultScore 0; hostile relationship with `salt_wharf_brotherhood` noted in description)
  - `clean_hearth` (political; defaultScore 0)
  - `seekers_of_the_first_word` (religious; defaultScore 0)
  - `arcane_collegium_of_tessara` (academic; defaultScore 0)
  - `runeholm_academy` (academic; defaultScore 0)
  - `house_vesh_network` (trade; defaultScore 0)
  - `crown_templars` (knightly_order; patronGodId: 'varan'; memberRanks: ['Initiate', 'Templar', 'Paladin', 'High Templar'])
  - `order_of_the_open_hand` (knightly_order; patronGodId: 'solenne'; memberRanks: ['Hospitaller', 'Brother/Sister', 'Prior/Prioress', 'Commander'])
  - `silverbough_wardens` (knightly_order; patronGodId: 'aeloria'; memberRanks: ['Scout', 'Warden', 'Forestward', 'High Warden'])
  - `wild_lodge` (knightly_order; patronGodId: 'thessaly'; memberRanks: ['Tracker', 'Warden', 'Huntmaster'])
  - `oathkeepers` (knightly_order; patronGodId: 'durgrim'; memberRanks: ['Pledge', 'Oathkeeper', 'Bondmaster', 'High Bondmaster'])

---

## Phase 42: Foundation Catalogs — Non-Act Data Authoring

> All engines for these catalogs are implemented (Phases 24–41). This phase authors the Ojisan-specific data that populates them. Tasks may be done in any order within the phase; 42h (world graph) must precede the act data authoring phases.

### 42a. Job and Class Catalog

- [ ] **42a.1** Create `src/data/jobCatalog.ts` — export `JOB_CATALOG: Record<string, JobDef>` with all Ojisan job archetypes drawn from the world bible `paths` section. Target ~18 JobDefs: Warrior, Mage, Rogue, Ranger, Bard, Runesmith, Shaman, Berserker, Dragonblood, Alchemist, Oracle, Shadow, Contractor (devil paths), Primal (Druid/Hunter variants), Templar-base (prerequisite for knightly order sub-types), Emissary, Assassin, Bloodline. Each entry: `id`, `name`, `poolALabel/Max`, `poolBLabel/Max`, `innatePassiveIds`, `hasWeakNodeScan`, `promotionJobIds`, `promotionLevel`.
- [ ] **42a.2** Export `CLASS_CATALOG: Record<string, ClassDef[]>` in `jobCatalog.ts` — 2–3 equippable class specializations per job archetype (e.g. Warrior → Knight / Berserker / Guardian). Each `ClassDef`: `id`, `name`, `jobId`, `nodes: ClassNodeDef[]` (skill tree).
- [ ] **42a.3** Update `jobEngine.ts` — import and use `JOB_CATALOG` / `CLASS_CATALOG` for all catalog lookups; remove any inline stubs.

### 42b. Faith Catalog

*(Implements Phase 33b.1–33b.2 data portion — engine tasks in Phase 33 remain separate)*

- [ ] **42b.1** Create `src/data/faithCatalog.ts` as specified in Phase 33b — four `FaithDef` entries (Radiant Faith: Solenne + Varan, +15% rite XP; Old Wood: Aeloria + Thessaly, +20%; Stone Covenant: Durgrim + Hestrel, +10%; Night Court: Nyxara + Malvek + Kharrath, +5%) plus `DEFAULT_FAITH_BY_RACE` const mapping every `Race` value to a `FaithId`.

### 42c. Alignment and Infamy Catalogs

- [ ] **42c.1** Create `src/data/alignmentCatalog.ts` — export `ALIGNMENT_AXIS_LABELS: Record<AlignmentAxis, { positive: string; negative: string; neutral: string; description: string }>`. Ojisan mapping: `axis_a` = Purifier (+) / Sovereign (-) / Pragmatist (0); `axis_b` = Lawful (+) / Chaotic (-) / Balanced (0); `axis_c` = Open (+) / Shadowed (-) / Private (0). Descriptions explain what accumulating score on each axis means for the player's world standing.
- [ ] **42c.2** Create `src/data/infamyCatalog.ts` — export `BOUNTY_TIER_TEXT: Record<BountyTier, { label: string; guardLine: string; shopLine: string; description: string }>`. Author flavor text for all 5 tiers (NONE through CONDEMNED). Guard dialogue lines and shop-refusal lines are used by dialogue stubs until full trees are authored.

### 42d. Skills Catalog

- [ ] **42d.1** Populate `src/data/skills.ts` — author the full Battle tree (~20 skills: Power Strike, Shield Bash, Counter Strike, Rally, Steady Aim, Exploit Weakness, Disarm, Execute, etc.) and Ardor tree (~20 skills: Gentle Touch, Deep Rhythm, Reading Her, Overstimulate, Edge, Whisper Command, Sustained Pressure, etc.). Each `SkillDef`: `id`, `tree`, `name`, `isPassive`, `cpwCost`, `pointCost`, `prerequisites[]`, `effects[]`.

### 42e. Status Effects Catalog

- [ ] **42e.1** Read `src/data/statusEffects.ts` current content; expand to a full catalog (~25 effects) — combat effects: Burning, Stunned, Weakened, Slowed, Poisoned, Fortified, Inspired; intimacy effects: Aroused, Overstimulated, Sensitized, Flustered, Subdued, Compliant; special: `anomalous_rite_surge` (Phase 30b.2), Mind Clouded (charm effect marker). Each entry: `id`, `name`, `durationTurns`, `effects[]`, `stackable`.

### 42f. Items Catalog

- [ ] **42f.1** Expand `src/data/items.ts` from ~20 to ~65 items: weapons (iron sword, elven bow, assassin dagger, runic staff, mage focus ×2), armors (leather set, chain mail, plate set, cloth robe ×2), consumables (HP potion ×3, MP potion ×2, Stamina draught, antidote, status cure), materials (iron ore, silver ore, mana crystal, monster fang, forest herb, rare mineral ×2, Aether Crystal ×3 — fire/ice/wind variants), gifts (bouquet, fine wine, elven silk, carved token, rare jewel), tools (intimacy implements ×6), quest items (Edwyn's ledger, Seekers seal, charter writ, Varan's chain fragment ×1 — stub).

### 42g. Recipes Catalog

- [ ] **42g.1** Expand `src/data/recipes.ts` to ~30 crafting recipes: potions (HP potions from herbs + vials ×3 tiers), MP potions (mana crystal + vials ×2), status cures, equipment upgrades (iron/silver/rune-infused tiers for sword/armor), food (trail rations, feast, energizing tea — all provide passive buff status effects), specialty intimacy consumables (2–3 recipes using exotic materials).

### 42h. World Graph — Full Aldermere + Corridor Stubs

- [ ] **42h.1** Expand `src/data/worldGraph.ts` from 5 stubs to the full Aldermere map (~40 nodes). Required nodes and features:
  - Tessara: Charter Hall (market, smithy), Arcane Collegium (alchemy_lab), Dockside (gambling), Market Square (market), Tessara Slums
  - Hallowmere: Castle District (bank), Cathedral of Solenne (shrine), Templar Barracks, Market Road (market, smithy)
  - Port Halcyon: Harbour (market), Salt Wharf District (gambling), Merchant Row (market, bank)
  - Brightwater: Village Green, Hot Spring Baths (onsen), Roadside Shrine (shrine)
  - Varnhold: Ledger Court Hall (wardedAgainstTeleport: true, bank), Border Gate, Countryside Inn
  - Concord: Royal Quarter (bank, arena), Charter HQ, Guild Market (market, smithy, alchemy_lab), Outer Ring
  - Ashvault District: Ember Temple Approach, Ember Temple Outer Ward (wardedAgainstTeleport: true), Ember Temple Deep Level (wardedAgainstTeleport: true)
  - Wilderness nodes: North Road, East Marshes, Hallowmere Forest, Brightwater Hills, River Crossing ×2 — each tagged `isSafe: false`, appropriate `regionId`
- [ ] **42h.2** Author all Aldermere `WorldEdge` entries — directed pairs for every corridor; `travelPhases` per leg (1 = same district, 2–3 = road segments, 4–5 = wilderness crossing or mountain pass).
- [ ] **42h.3** Add Stonebridge Spine corridor stub nodes (3 nodes: Stonebridge South Gate, Spine Pass, Stonebridge North Gate) linking Aldermere to Khardun — `isSafe: false`, no features, `wardedAgainstTeleport: false`. Full Khardun/Sylvaren/Vashkar nodes deferred to Act 3–4 data phases.
- [ ] **42h.4** Add `wardedAgainstTeleport: true` to all appropriate Aldermere nodes per world bible list (Ledger Court halls, castles, Templar barracks, Charter HQ, Cathedral). Document each one inline.
- [ ] **42h.5** Author `ENEMY_ROAM_DEFS` for all 8 Aldermere wilderness nodes — 2–3 roam def entries per node drawing from the expanded monsters catalog (Phase 42i).

### 42i. Monsters Catalog

- [ ] **42i.1** Expand `src/data/monsters.ts` to ~22 monster types. Non-humanoid: Forest Wolf (Beast), River Troll (Beast), Stone Golem (Elemental), Swamp Wraith (Undead), Fire Salamander (Elemental), Corrupted Bear (MiasmaCorrupted), Thorn Crawler (Beast), Marsh Leech (Beast). Humanoid: Bandit (aggressive human), Ember Conclave Agent (Aggressive human, Act 2+ spawn), Ledger Court Hound (Devil, Defensive), Dark Cultist (Demon, SupportCaster), Succubus Scout (Succubus, Aggressive), Incubus Raider (Incubus, Aggressive), YukiOnna (BossScripted), Vampire Shade (Vampire, Aggressive). Boss variants: Alpha Wolf (BossScripted), Ember Conclave Captain (BossScripted). Each entry: full stat block, loot table, defeat options (Kill/Capture/Intimate where appropriate), `purificationReward`, `aiPattern`.

### 42j. Achievements Catalog

- [ ] **42j.1** Populate `src/data/achievements.ts` with ~35 achievements: Combat (first_kill BRONZE, kills_50 SILVER, kills_500 GOLD, first_boss_defeated SILVER, all_bosses PLATINUM); Intimacy (first_scene BRONZE, partners_10 SILVER, partners_all GOLD, max_satisfaction SILVER, scene_with_goddess GOLD); Relationship (first_close_bond BRONZE, devoted_partner SILVER, first_owned_npc GOLD, full_manor GOLD); World (discover_10 BRONZE, discover_all_aldermere SILVER, discover_all GOLD, reach_god_island PLATINUM); Story (complete_act_1 BRONZE, complete_act_5 SILVER, complete_act_8 GOLD, achieve_restored_pantheon GOLD, achieve_god_king PLATINUM, achieve_creator_stirs PLATINUM); Charter (reach_champion SILVER, reach_legend GOLD); Special (purify_all_regions GOLD, full_knightly_order SILVER).

---

## Phase 43: Character Profile Records

> Author NpcCharacter records for the primary cast and goddesses. These are hand-authored profiles — not spawn-engine random output. Stored in dedicated data files. Goddesses live in a separate `GameState.goddesses` block; mortal characters enter `contacts[]` on first meeting.

### 43a. Goddess Records

- [ ] **43a.1** Create `src/data/goddessProfiles.ts` — export `GODDESS_PROFILES: Record<GodId, NpcCharacter>` for the 6 goddesses (Solenne, Varan, Aeloria, Thessaly, Hestrel, Nyxara). Each authored from `game_lore.json goddess_profiles` entries: `race: 'GODDESS'`, `faithId` tied to their own patronage, `sexualPsychology` authored (confidence, leans, resistance from lore), `personality.trait` and `social.trustBaseline` from lore, `vitals.mp = { current: 999999, max: 999999 }` (sentinel for divine scale), `vitals.hp` = very high, `isProtected: true`, `characterType: 'NPC'`. Varan's `playerBondType` starts `undefined`; enslaved state tracked separately on `GameState.gods`.
- [ ] **43a.2** Add `goddesses: Record<GodId, NpcCharacter>` to `GameState` root — separate from `contacts[]`. Goddesses are never in the contact list until a specific story quest trigger (quest 1.x Varan or 2.x Aeloria first meeting). Default value: `GODDESS_PROFILES` seeded at game start.
- [ ] **43a.3** Add `GameEvent` variant `GODDESS_CONTACT_ADDED ({ godId: GodId; npcId: string })` to `gameState.ts` — fired when a goddess entry is formally added to `contacts[]` for the first time. Dispatcher also calls `applyFactionDelta()` for the relevant knightly order and divine faith when this fires.
- [ ] **43a.4** Update `mockGameState.ts` — add stub `goddesses` block using partial GODDESS_PROFILES (Varan only, with enslaved status noted in comment).

### 43b. Primary Cast Records — Acts 1–5 Debuts

- [ ] **43b.1** Create `src/data/characterProfiles.ts` — export `PRIMARY_CAST: Record<string, NpcCharacter>` with authored profiles for the 15 characters debuting in Acts 1–3: Aldra Vane, Syrael Dawnscribe, Mira Ashlen, Dame Dava Colth, Evara Tessyn, Nari Fenn, Queen Maren II, Sylvaris Orenn, Ashkora, Kiri Lorne, Velara Reyne, Velindra, Sigrun Stonevow, Ushara, Elowen. Each: authored `sexualPsychology` (leans, resistance, confidence from game_lore character entries), authored `personality`, correct `race` and `faithId`, `scheduleId` stub, `isProtected: true`.
- [ ] **43b.2** Extend `PRIMARY_CAST` with the 15 remaining named female characters from Acts 4–8 (game_lore `side_character_slots`): Kessa Emberscale, Sera Ash, Rina Brightbrush, Lady Velura Lysmere, Ceira Blackthorn, Nessa Solstave, Maea Hollowtide, Cella Hollowtide, Senna Hollowtide, plus the remaining 6 characters from slots 19–25 as listed in game_lore. Also include the 2 male consorts (Lord-Consort Aendrel Vael, King-Consort Aldus Kess) as non-intimate NPCs.
- [ ] **43b.3** Create `src/data/scheduleDefs.ts` — export `SCHEDULE_DEFS: Record<string, NpcScheduleDef>` with phase-to-locationId maps for the 12 most active Act 1–2 characters. Each entry covers all 5 DayPhases; key characters: Aldra Vane (Charter Hall mornings, market evenings), Syrael Dawnscribe (Collegium full day), Mira Ashlen (variable by quest progress), Dava Colth (monastery/barracks split).

---

## Phase 44: Act 1 Data Authoring — The Silence

> Tessara then all of Aldermere. Quests 1.1–1.11 + optional 1.7 signal. Introduces 10 characters. Charter rank: Initiate → Journeyman. No ending-axis gates; only silent long-game penalties.

### 44a. Quest Definitions

- [ ] **44a.1** Author `QuestDef` entries for quests `1.1` through `1.6` in `src/data/quests.ts` — each: `id`, `name`, `type: 'MAIN'`, `objectives[]`, `reward` (gold + XP + charterXP on applicable quests), `failureConsequence` string for log display. Quest 1.2 reward includes `factionDeltas: [{ factionId: 'wayfarers_charter', delta: +20 }]` and `charterXP: 300`. Quest 1.3a/b/c authored as three linked entries sharing a parent quest id; each sub-contract has independent fail state.
- [ ] **44a.2** Author `QuestDef` entries for quests `1.7` through `1.11` — Quest 1.7 has `optional_signal: true` comment; sets `FLAGS['basilica_signal_triggered'] = true` as an onEnter effect on the optional signal dialogue node. Quest 1.11 (Edwyn's records) condition: `FLAG('edwyn_records_found', true) OR FLAG('basilica_signal_triggered', true)`. Quest 1.9 (Syrael findings) condition: `FLAG('syrael_mp_assessment_done', true)`.
- [ ] **44a.3** Create `src/data/storyFlags.ts` — export typed constant objects `ACT1_FLAGS`, and stub objects `ACT2_FLAGS` through `ACT9_FLAGS` (to be filled in subsequent phases). All flag id strings referenced in quest/dialogue files import from here — prevents typos. Act 1 flags: `CHARTER_TRIAL_FAILED`, `CHARTER_TRIAL_RETRY_DONE`, `SYRAEL_MP_ASSESSMENT_DONE`, `BASILICA_SIGNAL_TRIGGERED`, `EDWYN_RECORDS_FOUND`, `MIRA_NETWORK_ACTIVE`, `DAVA_ESCORT_FAILED`, `ACT1_COMPLETE`, plus one flag per character introduction (`ALDRA_MET`, `SYRAEL_MET`, etc.).

### 44b. Dialogue Trees

- [ ] **44b.1** Author `aldra_charter_trial` dialogue tree in `src/data/dialogueTrees.ts` — quest 1.2 trial sequence: 3 consecutive test nodes (combat assessment choice, contract-reading check, judgment scenario); PASS branch → `TRUST_DELTA +10` + `SET_FLAG CHARTER_TRIAL_DONE` + `FACTION_DELTA wayfarers_charter +20`; FAIL branch → `SET_FLAG CHARTER_TRIAL_FAILED` + retry offer node.
- [ ] **44b.2** Author introduction dialogue trees for the 5 Act 1 characters met in quests 1.2–1.7: `aldra_vane_intro`, `syrael_dawnscribe_intro`, `mira_ashlen_intro`, `dava_colth_intro`, `edwyn_crale_intro`. Each: a 2–3 node first-meeting tree (sets the `_MET` flag, small trust delta) plus a follow-up tree that unlocks after the associated quest completes.
- [ ] **44b.3** Author `basilica_pressure_scene` dialogue fragment — cutscene node (no player choices); sets `basilica_signal_triggered: true`; presented as a transition node when player leaves the Basilica during quest 1.7. This is Act 1's only visible failure signal.
- [ ] **44b.4** Author `syrael_mp_findings` dialogue tree — quest 1.9 reveal; Syrael presents her analysis of the player's foreign MP; 2 player-choice branches (curious / guarded); `TRUST_DELTA +5` on curious; sets `foreign_mp_explained: true` flag.

### 44c. Location Population Definitions

- [ ] **44c.1** Create `src/data/locationPopulations.ts` — export `LOCATION_POPULATION_DEFS: LocationPopulationDef[]` for all 8 main Act 1 nodes. Key entries: Tessara Charter Hall (minNpcs 4, maxNpcs 8, `serviceNpcIds: ['aldra_vane', 'charter_clerk']`), Tessara Market Square (minNpcs 8, maxNpcs 16, Civilian + Merchant heavy), Hallowmere Cathedral (minNpcs 3, maxNpcs 6, `serviceNpcIds: ['dava_colth']` conditional on quest gate). Each entry: correct `locationId`, `classAssignments`, `refreshCycleDays: 3`.

### 44d. Ending Axis Notes

- [ ] **44d.1** Confirm `endingAxisEffect: undefined` on all Act 1 QuestDefs — Act 1 has no direct ending axis gates. Silent long-game penalties (Syrael skipped → late rune-ward theory; Dava escort failed → reactive meet in 1.12; trial failed → progress delay) are represented via story flags only. Document this pattern in a JSDoc comment on the first Act 1 QuestDef entry.

---

## Phase 45: Act 2 Data Authoring — Aeloria Threatened

> Sylvaren. Quests 2.1–2.8 + 2.5a (The God's Chain power path). Introduces 3 characters. First goddess-status gate; first ending-axis effect. Aeloria saved or enslaved.

### 45a. Quest Definitions

- [ ] **45a.1** Author `QuestDef` entries for quests `2.1`–`2.5` in `src/data/quests.ts`. Quest 2.4 reward includes `factionDeltas: [{ factionId: 'silverbough_wardens', delta: +15 }]`. Quest 2.5 (the approach to Aeloria's island) sets `aeloria_island_reached: true` flag.
- [ ] **45a.2** Author `QuestDef` for quest `2.5a` (The God's Chain) — power-path branch, available only if player did not destroy components in 2.5; sets `power_path_active: true` and `aeloria_components_held: true`; `endingAxisEffect: { axis: 'playerThrone', value: 'UNDECIDED' }` (begins the power path axis tracking).
- [ ] **45a.3** Author `QuestDef` entries for quests `2.6`–`2.8`. Quest 2.8 is a branching QuestDef: save branch triggers `godStatusEngine.freeGod('aeloria')` via dispatcher + `endingAxisEffect: { axis: 'gods', value: 'ALL_SAFE' }` + `factionDeltas: silverbough_wardens +25`; fail branch sets `aeloria_enslaved: true` flag + `godStatusEngine.enslaveGod('aeloria', ...)` via dispatcher + `endingAxisEffect: { axis: 'gods', value: 'PARTIAL_LOSS' }`.
- [ ] **45a.4** Extend `ACT2_FLAGS` in `storyFlags.ts`: `AELORIA_ISLAND_REACHED`, `POWER_PATH_ACTIVE`, `AELORIA_COMPONENTS_HELD`, `AELORIA_ENSLAVED`, `ELOWEN_ROGUE`, `DURGRIM_COMPONENTS_HELD`, `THESSALY_COMPONENTS_HELD`, `ACT2_COMPLETE`.

### 45b. Dialogue Trees

- [ ] **45b.1** Author introduction dialogue trees for Act 2 newly introduced characters (draw from game_lore character list for Act 2 debuts).
- [ ] **45b.2** Author `aeloria_act2_confrontation` dialogue tree — the pivotal scene at the peak of quest 2.8: FIGHT branch (save Aeloria — requires coalition support from quest 2.7); POWER branch (hold components, do not fight — requires `power_path_active`); FLEE branch (available always; triggers fail state on timer expiry). Each branch sets correct flags and emits correct god-status events via effects.
- [ ] **45b.3** Author `elowen_rogue_response` dialogue tree (conditional on `aeloria_enslaved` flag) — alternate Elowen encounter for Act 5 salvage; gates on `aeloria_enslaved: true`.

### 45c. World Node Data

- [ ] **45c.1** Add Sylvaren approach corridor nodes to `worldGraph.ts` (~8 nodes: Sunlit Court Gate, Elven Road, Thousand Groves Edge, Aeloria's Island Approach — `wardedAgainstTeleport: true`, Nightbound Houses district — 2 nodes). Full Sylvaren interior deferred to Act 4 data if needed.

---

## Phase 46: Act 3 Data Authoring — Durgrim Threatened

> Khardun. Quests 3.1–3.7. Malvek reveal + turns ally. Durgrim saved or enslaved.

### 46a. Quest Definitions

- [ ] **46a.1** Author `QuestDef` entries for quests `3.1`–`3.7`. Quest 3.x (Malvek reveal) sets `malvek_ally: true` flag + `factionDeltas: [{ factionId: 'oathkeepers', delta: +15 }]`. Quest 3.5 has `power_path_branch` flag check (`durgrim_components_held: true` if power path active). Quest 3.7 save branch: `godStatusEngine.freeGod('durgrim')` + unlocks `oathkeepers` faction join gate + `endingAxisEffect: { axis: 'gods', value: 'ALL_SAFE' }`; fail branch: `durgrim_enslaved: true` + Khardun lockdown flag + `endingAxisEffect: { axis: 'gods', value: 'PARTIAL_LOSS' }`.
- [ ] **46a.2** Extend `ACT3_FLAGS` in `storyFlags.ts`: `MALVEK_ALLY`, `DURGRIM_ENSLAVED`, `KHARDUN_LOCKDOWN`, `DURGRIM_COMPONENTS_HELD`, `ACT3_COMPLETE`.

### 46b. Dialogue Trees

- [ ] **46b.1** Author `malvek_reveal_scene` dialogue tree — player reveals Varan's enslaved truth to Malvek; gated on `trust` with Malvek ≥ threshold; Malvek's reaction branches on player's prior infamy in Vashkar region; sets `malvek_ally: true` on trust branch.
- [ ] **46b.2** Author introduction trees for Sigrun Stonevow and other Act 3 characters introduced.
- [ ] **46b.3** Author `sigrun_act3_coalition` dialogue tree — Sigrun commits the Oathkeepers to the coalition; sets `oathkeepers_coalition_joined: true`.

### 46c. World Node Data

- [ ] **46c.1** Expand `worldGraph.ts` with full Khardun nodes (~10 nodes: Runeholm, Stonevow Hold, Irongate Pass, Khardun Capital — `wardedAgainstTeleport: true` (dwarven hold), Deep Mines, Mountain Crossing ×2). Wire all edges including Stonebridge Spine connection to Phase 42h.3 stubs.

---

## Phase 47: Act 4 Data Authoring — Thessaly Threatened

> Tharos (Red Steppe). Quests 4.1–4.8. Iron Throne of Law flag set at 4.8. Thessaly saved or enslaved.

### 47a. Quest Definitions

- [ ] **47a.1** Author `QuestDef` entries for quests `4.1`–`4.8`. Quest 4.7 has `power_path_branch` (`thessaly_components_held: true`). Quest 4.8 is the pivotal endorsement choice: `endorse_malvek` branch sets `iron_throne_endorsed: true` + `factionDeltas: [{ factionId: 'oathkeepers', delta: +20 }]` + `endingAxisEffect: { axis: 'law', value: 'LEDGER_REFORMED' }`; `temp_alliance` branch sets `endingAxisEffect: { axis: 'law', value: 'DIVIDED' }`. Quest 4.9 (or 4.8 completion): Thessaly save → `godStatusEngine.freeGod('thessaly')` + Wild Lodge opens + `endingAxisEffect: { axis: 'gods', value: 'ALL_SAFE' }`; fail → `thessaly_enslaved: true` + orc clan split + `endingAxisEffect: { axis: 'gods', value: 'PARTIAL_LOSS' }`.
- [ ] **47a.2** Extend `ACT4_FLAGS` in `storyFlags.ts`: `IRON_THRONE_ENDORSED`, `THESSALY_ENSLAVED`, `ORC_CLAN_SPLIT`, `THESSALY_COMPONENTS_HELD`, `MALVEK_ENDORSEMENT_DONE`, `ACT4_COMPLETE`.

### 47b. Dialogue Trees

- [ ] **47b.1** Author `malvek_endorsement_choice` dialogue tree — quest 4.8 pivotal decision; full dialogue for both branches including Malvek's reaction to each; sets `iron_throne_endorsed` flag and `endingAxisEffect` via dialogue effects.
- [ ] **47b.2** Author introduction trees for Ushara and other Act 4 characters.

### 47c. World Node Data

- [ ] **47c.1** Expand `worldGraph.ts` with Tharos nodes (~8 nodes: Wildmark gathering ground, Clan Ashfang Grounds, Red Steppe Crossing, Ironjaw Territory, Redhorn Flats, Thessaly's Grove — `wardedAgainstTeleport: true`). Wire edges including crossing from Khardun via mountain pass.

---

## Phase 48: Act 5 Data Authoring — Three-Way Threat + Coalition

> Hestrel threatened, Nyxara enslaved mid-act, Solenne first targeted. Salvage quests available if Acts 2/3/4 failed. Coalition assembly.

### 48a. Quest Definitions

- [ ] **48a.1** Author `QuestDef` entries for quests `5.1`–`5.8` — three parallel tracks authored as interlocking QuestDef entries. Hestrel protection (quests 5.2–5.4): save → `godStatusEngine.freeGod('hestrel')` + dwarven coalition full; fail → `hestrel_enslaved: true` + logistics collapse. Nyxara warning quest (5.5): always results in `nyxara_enslaved` flag being set one quest later (tracked via `nyxara_enslavement_unavoidable: true` flag set here). Solenne first warning (5.7): sets `solenne_warned: true`. Quest 5.8 power path branch (`power_path_active` required).
- [ ] **48a.2** Author Act 2/3/4 salvage QuestDefs: `5.S1` (Elowen's Warden camp raid — available only if `aeloria_enslaved`; rewards partial Silverbough support + `factionDeltas: silverbough_wardens +15`); `5.S2` (battle-cult war-priest duel — available only if `thessaly_enslaved`; single combat challenge; success flips Clan Ironjaw back + `factionDeltas: wild_lodge +10`).
- [ ] **48a.3** Coalition assembly quest (5.9 or 5.8 completion): `endingAxisEffect: { axis: 'gods', value }` computed from count of currently-free goddesses at completion time — `'ALL_SAFE'` (4+ free), `'PARTIAL_LOSS'` (2–3 free), `'MULTIPLE_LOST'` (0–1 free).
- [ ] **48a.4** Extend `ACT5_FLAGS` in `storyFlags.ts`: `HESTREL_ENSLAVED`, `NYXARA_ENSLAVEMENT_UNAVOIDABLE`, `SOLENNE_WARNED`, `COALITION_ASSEMBLED`, `WARDEN_SUPPORT_PARTIAL`, `IRONJAW_FLIPPED`, `ACT5_COMPLETE`.

### 48b. Dialogue Trees

- [ ] **48b.1** Author `hestrel_forge_protection` dialogue tree — the pivotal Hestrel scene; player choice to defend or step back; only the defend path leads to `godStatusEngine.freeGod('hestrel')`.
- [ ] **48b.2** Author `coalition_assembly_scene` — final Act 5 meeting with all available coalition leaders present; dialogue branches for each leader based on their act-progression status (present or absent due to goddess loss).

---

## Phase 49: Act 6 Data Authoring — Nyxara Enslaved (Unavoidable)

> Nyxara confronts Kharrath directly; enslaved on the spot. Player witnesses it. Act gates: Evara rescue method + Velindra's coalition warning.

### 49a. Quest Definitions

- [ ] **49a.1** Author `QuestDef` entries for quests `6.1`–`6.7`. Quest 6.x (Nyxara confrontation): completion always fires `godStatusEngine.enslaveGod('nyxara', 'kharrath_ember_conclave')` + `nyxara_enslaved: true` + `endingAxisEffect: { axis: 'goddess', value: 'ENSLAVED_BY_KHARRATH' }`. No save path — only strategic positioning for Act 8.
- [ ] **49a.2** Quest 6.4 (warn Velura before Ember Temple meeting): success sets `velura_warned: true`; failure sets `house_lysmere_network_lost: true` — removes House Lysmere diplomatic network from Act 8 coalition.
- [ ] **49a.3** Quest 6.5 (Evara rescue method): success sets `evara_rescue_method_secured: true` — Act 8 strategic-approach prerequisite for the Velindra dossier + Evara intel path.
- [ ] **49a.4** Extend `ACT6_FLAGS` in `storyFlags.ts`: `NYXARA_ENSLAVED`, `VELURA_WARNED`, `HOUSE_LYSMERE_NETWORK_LOST`, `EVARA_RESCUE_METHOD_SECURED`, `ACT6_COMPLETE`.

### 49b. Dialogue Trees

- [ ] **49b.1** Author `nyxara_enslavement_witness` cutscene dialogue tree — the most pivotal moment in Act 6; player is observer only (no outcome choices); multiple reaction options for player character response; sets `nyxara_enslaved` flag via `onEnter` effect; permanently marks the moment in narrative log.
- [ ] **49b.2** Author `velura_warning_window` dialogue tree — the time-sensitive Velura warning; available only during a 4-day window before Ember Temple meeting; sets `velura_warned` on completion.

---

## Phase 50: Act 7 Data Authoring — Solenne + Final Preparation

> Solenne targeted for the last time. Three crystallizing choices determine faith and law axes. Coalition finalized. Act 3/5 salvage paths available.

### 50a. Quest Definitions

- [ ] **50a.1** Author `QuestDef` entries for quests `7.1`–`7.7`. Three crystallizing choice quests authored as full branching QuestDefs:
  - Help Ezan + reveal truth: `endingAxisEffect: { axis: 'faith', value: 'TRUTH' }` + sets `seekers_thread_resolved: true` (Secret End prerequisite)
  - Reveal truth, suppress ritual: `endingAxisEffect: { axis: 'faith', value: 'TRUTH' }` (no seekers flag)
  - Keep lie, build power: `endingAxisEffect: { axis: 'faith', value: 'LIE' }` + reinforces `power_path_active`
- [ ] **50a.2** Solenne quest (7.7 or 7.6): save → `godStatusEngine.freeGod('solenne')`; enslaved → `solenne_enslaved: true` + `endingAxisEffect: { axis: 'gods', value: 'MULTIPLE_LOST' }` (if she is lost, Dead Sky becomes the most likely outcome).
- [ ] **50a.3** Law axis finalization quests (7.4–7.5): branch outcomes set `endingAxisEffect: { axis: 'law', value: 'CROWNS' | 'CHARTER' }` depending on player's political position at this point. `'LEDGER_REFORMED'` can only come from the 4.8 endorsement.
- [ ] **50a.4** Act 3/5 salvage quests (7.S1 Sigrun resistance, 7.S2 Hestrel logistics substitute): author as `QuestDef` entries, each gated on respective failure flags.
- [ ] **50a.5** Extend `ACT7_FLAGS` in `storyFlags.ts`: `SOLENNE_ENSLAVED`, `SEEKERS_THREAD_RESOLVED`, `FAITH_TRUTH`, `FAITH_LIE`, `LAW_CROWNS`, `LAW_CHARTER`, `SIGRUN_RESISTANCE_ACTIVE`, `ACT7_COMPLETE`.

### 50b. Dialogue Trees

- [ ] **50b.1** Author `solenne_truth_reveal` dialogue tree — player confronts the Radiant Faith clergy with the truth about Varan; branches determine `faith` axis outcome.
- [ ] **50b.2** Author `ezan_help_or_oppose` dialogue tree — the Seekers thread decision; completing the Seekers' original intent vs. suppressing their ritual; sets `seekers_thread_resolved` on the correct branch.

---

## Phase 51: Act 8 Data Authoring — The Final Confrontation

> Two approach tracks (Strategic / Direct). Quest 8.1 gates 8.2 difficulty tier. Quest 8.3 (The Goddess Court) determines goddess/player-throne ending axes. Quest 8.4 calls resolveEnding().

### 51a. Quest Definitions

- [ ] **51a.1** Author `QuestDef` entries for quests `8.1`–`8.4`. Quest 8.1 (approach choice): `act8_approach: 'STRATEGIC'` branch requires `evara_rescue_method_secured: true` + `velindra_dossier: true` flags; `act8_approach: 'DIRECT'` branch available always but harder without `iron_throne_endorsed`. Both set the `act8_approach` flag via `SET_FLAG` effect.
- [ ] **51a.2** Quest 8.2 (Kharrath fight): no QuestDef objectives encode difficulty — dispatcher computes difficulty tier at encounter start from `GameState.gods` count and `act8_approach` flag (see world bible `act_8.fight_shape`). Author quest shell with objective `type: 'INTERACT', targetId: 'kharrath_encounter'` and reward shell. Reckless-assault bypass check (player approaches Ashvault before 8.1 completes): `QUEST_FAILED` on 8.2 + `SET_FLAG varan_killed: true` — triggers Dead Sky.
- [ ] **51a.3** Quest 8.3 (The Goddess Court): author as a series of choice nodes per goddess (post-Kharrath defeat). For each present goddess (free or enslaved by Kharrath): FREE branch → `godStatusEngine.freeGod()` + tracks whether restoration is full or diminished; PLAYER_ENSLAVE branch (requires `power_path_active`) → `godStatusEngine.enslaveGod(godId, player.id)`. Sets `endingAxes.goddess` and `endingAxes.playerThrone` via `endingAxisEffect`.
- [ ] **51a.4** Quest 8.4 (aftermath): completion triggers `resolveEnding(state)` in `endingTrackerEngine`; result written to `flags['ending_resolved']`. No endingAxisEffect on this quest — the tracker reads the already-accumulated axes.
- [ ] **51a.5** Extend `ACT8_FLAGS` in `storyFlags.ts`: `ACT8_APPROACH`, `VARAN_KILLED`, `KHARRATH_DEFEATED`, `KHARRATH_IMPRISONED`, `KHARRATH_ASCENDED`, `GODDESS_COURT_DONE`, `ENDING_RESOLVED`, `ACT8_COMPLETE`.

### 51b. Ending Conditions Data

- [ ] **51b.1** Author `ENDING_CONDITIONS` const in `endingTrackerEngine.ts` (Phase 37b.3 data pass) — all 8 ending axis condition sets drawn from game_lore endings section:
  - `the_restored_pantheon`: goddess = FREED_RESTORED, kharrath = DEFEATED, playerThrone = STEPPED_BACK, gods = ALL_SAFE
  - `the_diminished_return`: goddess = FREED_DIMINISHED, kharrath = DEFEATED, playerThrone = STEPPED_BACK
  - `the_silent_victory`: goddess = FREED_RESTORED, kharrath = IMPRISONED, playerThrone = STEPPED_BACK
  - `the_iron_throne_of_law`: law = LEDGER_REFORMED, kharrath = IMPRISONED, playerThrone = RULING
  - `the_broken_pantheon`: gods = MULTIPLE_LOST, kharrath = DEFEATED (player survived)
  - `the_dead_sky`: kharrath = ASCENDED (all remaining goddesses captured before player reaches 8.2, OR varan_killed flag set)
  - `the_god_king`: playerThrone = RULING, goddess = ENSLAVED_BY_PLAYER (all six), gods = ALL_SAFE (player never lost other gods)
  - `the_creator_stirs`: faith = TRUTH, seekers_thread_resolved = true, varan_restored_full = true, plus 2–3 additional secret flags (leave as `FLAG` condition refs with TODO comments for secret flag definitions)

---

## Phase 52: Act 9 Data Authoring — Epilogue

> Short epilogue. World one season after Act 8. One optional scene per companion relationship above Lover tier. Scenes are ending-conditional.

### 52a. Quest Definitions

- [ ] **52a.1** Author `QuestDef` entries for epilogue scenes `9.1`–`9.n` (one per relationship tier gate, approximately 12–15 entries covering all primary cast members). Each: `type: 'COMPANION'`, no objectives, no failure, single `LOVE` + `TRUST` condition from `DialogueCondition`. Reward: `{ xp: 0, gold: 0 }` — epilogue scenes are pure narrative.
- [ ] **52a.2** Add ending-conditional flag check to each epilogue quest — `condition: FLAG('ending_resolved', <endingId>)` determines which variant of the scene is presented. Author at least two variants per character (good ending path / bad/neutral path).
- [ ] **52a.3** Extend `ACT9_FLAGS` in `storyFlags.ts`: one flag per epilogue scene completed (`ALDRA_EPILOGUE_DONE`, etc.).

### 52b. Epilogue Dialogue Trees

- [ ] **52b.1** Author epilogue dialogue trees for all 6 goddesses — trees are conditional on relationship score (GATE: love ≥ 70) + ending flag. Each tree: a 3–4 node scene; no player-facing choices beyond tone selection.
- [ ] **52b.2** Author epilogue dialogue trees for the 8 most narratively significant mortal characters (Aldra, Syrael, Dava, Evara, Velindra, Sigrun, Mira, Ushara) — same structure as 52b.1.
- [ ] **52b.3** Author epilogue narrative log entries (plain text, no dialogue tree) for the 4 knightly order factions — short flavor paragraph on each order's state post-ending, gated on whether patron god is free/enslaved/dead. Displayed in a world-state summary screen before individual scenes.

---

## Phase 53: Character Sub-Quest Data Authoring

> 29 main female characters + 6 goddesses + 5 new characters (Ceira, Nessa, Hollowtide family). Sub-quest chains drawn from character_subquests_p1–p4.json and character_subquests_goddesses_extended.json.

### 53a. Sub-Quests — Characters 1–8 (Part 1)

- [ ] **53a.1** Author `QuestDef` entries for sub-quest chains in `character_subquests_p1.json` — characters 1–8. Each character has a 3–5 quest `COMPANION` chain: introduction quest, 1–2 gate quests (trust/love gated), and a climax scene quest. Author as a linked chain via `condition: QUEST_STAGE` gates.
- [ ] **53a.2** Author dialogue trees for Part 1 character sub-quest interactions — key trees: the trust-crossing dialogue (where the character opens up), the gate scene, and the climax scene approach tree.

### 53b. Sub-Quests — Characters 9–16 (Part 2)

- [ ] **53b.1** Author `QuestDef` entries for characters 9–16 from `character_subquests_p2.json` — same 3–5 quest chain structure.
- [ ] **53b.2** Author dialogue trees for Part 2.

### 53c. Sub-Quests — Characters 17–30 (Parts 3 & 4)

- [ ] **53c.1** Author `QuestDef` entries for characters 17–24 from `character_subquests_p3.json`.
- [ ] **53c.2** Author `QuestDef` entries for characters 25–30 and the 5 new characters (Ceira Blackthorn, Nessa Solstave, Maea/Cella/Senna Hollowtide) from `character_subquests_p4.json` — Hollowtide family chain is a shared 5-quest arc (Maea unlocks first; daughters unlock sequentially; family group scene unlocks at arc end).
- [ ] **53c.3** Author dialogue trees for Parts 3 & 4.

### 53d. Goddess Sub-Quests

- [ ] **53d.1** Author `QuestDef` entries for all 6 goddess sub-quest chains from `character_subquests_goddesses_extended.json` — the most elaborate chains (5–7 quests per goddess). Each chain is gated on act progression (goddess must have been introduced + relevant act completed) and relationship score. Each chain includes: a revelation quest (goddess's true nature surfaces), an intimacy unlock quest (gated trust ≥ 75 + love ≥ 60), and a narrative climax quest (varies by whether goddess is free, enslaved by Kharrath, or enslaved by player). Varan's chain has an additional enslavement-arc branch if she is still held through Act 7.
- [ ] **53d.2** Author dialogue trees for all 6 goddess chains — minimum 4 trees per goddess (introduction-depth tree, trust-opening tree, intimacy-unlock scene tree, climax tree).

### 53e. Intimacy Catalog Expansion

- [ ] **53e.1** Expand `src/data/intimacyCatalog.ts` — author `IntimacySceneDef` entries for each of the 29+ primary characters plus 6 goddesses. Each character: minimum 1 unlockable scene with `trustRequirement`, `loveRequirement`, `isRepeatable`, `actionSequence[]`, `npcResponseFragmentIds[]`. Characters with multiple leans (e.g. Ceira: MASOCHIST/SURRENDER/DEGRADATION) get 2–3 scene variants unlocking at different trust tiers.
- [ ] **53e.2** Expand `src/data/intimacyFragments.ts` — add authored response fragment pools keyed by `npcId` for each primary cast member and goddess. Each pool: minimum 3 fragment entries per arousal tier (LOW / MED / HIGH / PEAK) covering the character's dominant lean. Fragment text must be consistent with the character's psychology profile and the 6 writing conventions from game_lore.
- [ ] **53e.3** Expand `src/data/intimateResponseFragments.ts` — add post-scene emotional response fragments per character (keyed by npcId + scene outcome: SATISFIED / OVERWHELMED / FAINTED / BROKEN). Each fragment: 2–3 lines of in-character NPC dialogue that plays in the intimacy scene wind-down phase.
