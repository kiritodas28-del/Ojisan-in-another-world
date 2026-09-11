# Ojisan -- Execution Task List

**Task list version:** 2.0 (updated 2026-09-11)
**Tracks:** requirements_analysis.md v1.3, PRD v1.6

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
- [ ] **2.29** Define full Achievement schema and list of actual in-game achievements (PRD §4.14 still sparse)

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
- [ ] **3a.8** Replace `unknown` stubs in `HumanoidCharacter` with real spawn-engine types (depends on Phase 4)
- [ ] **3a.9** Update `spawnEngine.ts` so `spawnFemale` / `spawnMale` return `HumanoidCharacter`
- [ ] **3a.10** Update `enemySpawnEngine.ts` so `spawnMonster` returns `MonsterCharacter` and `spawnHumanoidEnemy` returns `EnemyHumanoidCharacter`

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
- [ ] **3c.4** Wire engine dispatcher in `src/engines/dispatcher.ts` to real engines -- new-game init sequence must: (1) call `spawnLocationPopulation()` x all location defs -> raw `NpcCharacter[]`; (2) call `simulateWorldHistory(npcs, 30)` -> pre-seeded NPC-NPC relationships; (3) loop `tryAddContact()` to build `contacts[]` (cap enforced); player contact list starts empty
- [ ] **3c.5** Define event bus / pipeline contract for inter-engine side effects
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
- [ ] **7.11** Remove redundant `CombatDefeatOutcomeEvent` export from `combatEngine.ts` -- safe after Phase 10 dispatcher wiring

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
- [ ] **8.8** Wire `locationDefs` and `schedules` into `runDayEndTick()` / `advancePhase()` via dispatcher

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

- [ ] **9.1** Wire trust/love to dispatcher relationship event handlers; lazy individuation on first player-NPC interaction (deferred to 3c.4)
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

- [ ] **10.1** Define `ReputationState` in `gameState.ts` -- `record: Record<RegionId, number>` (score -800 to +800); add to root `GameState` if not already present; define `RegionId` string brand or enum
- [ ] **10.2** Define `computeBounty(score: number): number` pure helper -- `abs(score) x 2`; add `isBountyActive(score): boolean` (true when score < -100)
- [ ] **10.3** Add reputation `GameEvent` variants to union: `REPUTATION_CHANGED` (`regionId`, `delta`, `newScore`, `tier`), `BOUNTY_CHANGED` (`regionId`, `newAmount`), `REPUTATION_TIER_CROSSED` (`regionId`, `from`, `to`)
- [ ] **10.4** Define `ReputationTier` enum -- `Infamous | Disliked | Neutral | Liked | Renowned`; define `getReputationTier(score): ReputationTier` pure helper (thresholds: <-400 / -400 to -100 / -100 to 100 / 100 to 400 / >400)

### 10b. Core engine functions

- [ ] **10.5** Implement `applyReputationDelta(gameState, regionId, delta): GameState` -- clamps [-800, +800]; checks tier crossing; emits `REPUTATION_CHANGED`, optionally `REPUTATION_TIER_CROSSED`, `BOUNTY_CHANGED` if negative
- [ ] **10.6** Implement `tickReputationDecay(gameState): GameState` -- applies -5/day to negative scores only; emits `REPUTATION_CHANGED` per changed region; called at day-end step 1
- [ ] **10.7** Implement `getRegionReputation(gameState, regionId): number` pure getter
- [ ] **10.8** Define `REPUTATION_EVENT_TABLE` constant mapping event keys to deltas per PRD §4.5; implement `applyReputationEvent(gameState, regionId, eventKey)` delegating to `applyReputationDelta()`

### 10c. Dispatcher wiring

- [ ] **10.9** Wire `COMBAT_DEFEAT_OUTCOME` handler in `dispatcher.ts` -- routes to `enemySpawnEngine.selectDefeatOutcome()`; KILL outcomes call `applyReputationEvent(KILL_COMBATANT)`; Intimate outcomes initiate intimacy scene with defeated enemy profile
- [ ] **10.10** Wire `ENEMY_KILLED_IN_INTIMACY` handler -- awards XP + resolves loot; calls `applyReputationEvent(KILL_COMBATANT)`
- [ ] **10.11** Wire `NPC_DIED_IN_INTIMACY` handler -- removes NPC from contacts/party, sets `isDeceased`, increments death count flag; calls `applyReputationEvent(KILL_CIVILIAN)` scaled by scene start type
- [ ] **10.12** Remove redundant `CombatDefeatOutcomeEvent` export from `combatEngine.ts` (task 7.11)

### 10d. Day-end wiring & mock

- [ ] **10.13** Wire `tickReputationDecay()` into `calendarEngine.runDayEndTick()` step 1 (currently TODO stub)
- [ ] **10.14** Add `reputation: Record<RegionId, number>` sample data to `mockGameState.ts` -- at least 3 regions covering all 5 tiers

---

## Phase 11: Quest Engine

> Engine file: `src/engines/questEngine.ts`.
> PRD reference: §4.6.
> Depends on: Phase 10 (`applyReputationEvent`); gold written directly to `player.gold` until Phase 12 is wired.

### 11a. State & schema

- [ ] **11.1** Define `QuestDef`, `ObjectiveDef`, `QuestReward` in `src/data/quests.ts` -- `QuestDef`: `id`, `type: 'MAIN' | 'COMPANION' | 'BOARD'`, `title`, `objectives`, `reward`, `prerequisites`, `cooldownDays?`; `ObjectiveDef`: `type: 'KILL' | 'COLLECT' | 'TALK' | 'INTERACT' | 'ESCORT' | 'TRAVEL'`, `targetId`, `count`; `QuestReward`: `gold`, `xp`, `items`, `flagsSet`
- [ ] **11.2** Define `QuestEntry` runtime state -- `defId`, `status: 'AVAILABLE' | 'ACTIVE' | 'COMPLETED' | 'FAILED'`, `objectiveProgress: number[]`, `activatedOnDay`, `completedOnDay?`, `cooldownExpiresOnDay?`
- [ ] **11.3** Define `QuestLog` -- `entries: QuestEntry[]`; add `quests: QuestLog` to root `GameState` if not present
- [ ] **11.4** Add quest `GameEvent` variants: `QUEST_ACCEPTED`, `QUEST_OBJECTIVE_UPDATED`, `QUEST_COMPLETED`, `QUEST_FAILED`
- [ ] **11.5** Author initial quest data in `src/data/quests.ts` -- at minimum: 1 MAIN (KILL + TRAVEL), 2 COMPANION (TALK + INTERACT), 3 BOARD (repeatable with `cooldownDays`)

### 11b. Core engine functions

- [ ] **11.6** Implement `loadQuestDef(id): QuestDef` -- catalog lookup; throws on unknown id
- [ ] **11.7** Implement `getAvailableQuests(gameState): QuestDef[]` -- prerequisites COMPLETED; not ACTIVE/COMPLETED unless BOARD with expired cooldown
- [ ] **11.8** Implement `acceptQuest(gameState, questId): GameState` -- prerequisite guard; creates ACTIVE entry with zeroed progress; emits `QUEST_ACCEPTED`
- [ ] **11.9** Implement `updateObjective(gameState, questId, objectiveIndex, incrementBy): GameState` -- clamps [0, required]; emits `QUEST_OBJECTIVE_UPDATED`; calls `checkQuestCompletion()`
- [ ] **11.10** Implement `checkQuestCompletion(gameState, questId): GameState` -- all objectives met -> `grantQuestReward()`; COMPLETED; BOARD sets `cooldownExpiresOnDay`; emits `QUEST_COMPLETED`
- [ ] **11.11** Implement `grantQuestReward(gameState, reward): GameState` -- gold, XP, items (overflow auto-converts); `flagsSet`; calls `applyReputationEvent(COMPLETE_BOARD_QUEST)` for BOARD
- [ ] **11.12** Implement `failQuest(gameState, questId): GameState` -- FAILED; BOARD resets to AVAILABLE; emits `QUEST_FAILED`
- [ ] **11.13** Implement `getQuestsByStatus(gameState, status): QuestEntry[]` pure helper

### 11c. Objective event hooks (dispatcher wiring)

- [ ] **11.14** Wire `ENEMY_KILLED` -> `updateObjective()` for KILL objectives matching `targetId`
- [ ] **11.15** Wire `ITEM_COLLECTED` intent -> `updateObjective()` for COLLECT objectives
- [ ] **11.16** Wire `DIALOGUE_COMPLETED` event -> `updateObjective()` for TALK objectives matching `speakerNpcId`
- [ ] **11.17** Wire `TRAVEL_NODE_REACHED` event -> `updateObjective()` for TRAVEL objectives matching `worldNodeId`

### 11d. Mock data

- [ ] **11.18** Add `quests: QuestLog` to `mockGameState.ts` -- 2 ACTIVE (one with partial progress), 1 COMPLETED

---

## Phase 12: Economy & Inventory Engine

> Engine file: `src/engines/economyEngine.ts`.
> PRD reference: §4.8.
> Static data: `src/data/items.ts`.

### 12a. State & schema

- [ ] **12.1** Define `ItemDef` in `src/data/items.ts` -- `id`, `name`, `type: 'WEAPON' | 'ARMOR' | 'CONSUMABLE' | 'MATERIAL' | 'GIFT' | 'QUEST'`, `stackMax`, `baseBuyValue`, `baseSellValue`, `effects?: ItemEffect[]`; `ItemEffect` union: `STAT_BOOST | HEAL | STATUS_APPLY`
- [ ] **12.2** Confirm `InventorySlot`, `inventory`, `inventorySlots`, `gold` on `PlayerCharacter` in `gameState.ts`; add if absent
- [ ] **12.3** Add economy `GameEvent` variants: `ITEM_ACQUIRED`, `ITEM_REMOVED`, `GOLD_CHANGED`, `INVENTORY_OVERFLOW`
- [ ] **12.4** Author initial item catalog in `src/data/items.ts` -- 5 CONSUMABLE (4 intimacy consumables + heal potion), 3 MATERIAL, 2 GIFT, 6 intimacy tool items (non-consumable), 2 WEAPON stubs, 2 ARMOR stubs

### 12b. Core inventory functions

- [ ] **12.5** Implement `getItemDef(id): ItemDef` pure lookup
- [ ] **12.6** Implement `hasItem(gameState, itemId, quantity?): boolean`
- [ ] **12.7** Implement `addItem(gameState, itemId, quantity): GameState` -- stack existing slot; new slot if needed; overflow -> `convertToGold()`; emits `ITEM_ACQUIRED`
- [ ] **12.8** Implement `removeItem(gameState, itemId, quantity, reason): GameState` -- guard insufficient; emits `ITEM_REMOVED`
- [ ] **12.9** Implement `convertToGold(gameState, itemId, quantity): GameState` -- `qty x baseSellValue`; emits `GOLD_CHANGED` + `INVENTORY_OVERFLOW`
- [ ] **12.10** Implement `getInventorySlots(gameState): number` pure derived -- `20 + 5 x max(0, manor.tier - 2)`
- [ ] **12.11** Implement `consumeItem(gameState, itemId): GameState` -- guard; remove 1; apply `ItemEffect[]`; emits `ITEM_REMOVED` USED

### 12c. Buy/sell functions

- [ ] **12.12** Implement `buyItem(gameState, itemId, quantity, shopRegionId): GameState` -- `effectiveBuyPrice = baseBuyValue x priceMultiplier(tier)`; guard gold; deduct; `addItem()`; price table: Renowned 0.85 / Liked 0.92 / Neutral 1.0 / Disliked 1.10 / Infamous 1.25
- [ ] **12.13** Implement `sellItem(gameState, itemId, quantity, shopRegionId): GameState` -- `effectiveSellPrice = baseSellValue x sellDiscount(tier)`; add gold; `removeItem()` SOLD; discount table: Renowned 0.65 / Liked 0.57 / Neutral 0.50 / Disliked 0.43 / Infamous 0.35

### 12d. Gift & loot functions

- [ ] **12.14** Implement `giveGift(gameState, itemId, npcId): GameState` -- guard GIFT type; `removeItem()` GIFTED; read love delta from effects; delegate to `resolveGift()` in relationshipEngine
- [ ] **12.15** Implement `resolveLootDrop(gameState, lootTableId): GameState` -- loads `LootTable`; calls `resolveLoot()`; `addItem()` per entry; called by dispatcher on `ENEMY_KILLED`

### 12e. Dispatcher wiring

- [ ] **12.16** Wire `USE_ITEM` intent -> `consumeItem()`; QUEST items blocked; non-consumable types rejected
- [ ] **12.17** Wire `GIVE_GIFT` intent -> `giveGift()`

### 12f. Mock data

- [ ] **12.18** Add realistic inventory to `mockGameState.ts` -- 6+ slots; `gold: 340`; `inventorySlots: 20`

---

## Phase 13: Dialogue Engine

> Engine file: `src/engines/dialogueEngine.ts`.
> PRD reference: §4.11.
> Static data: `src/data/dialogueTrees.ts` (new file).
> Depends on: Phase 9 (relationship conditions), Phase 11 (`updateObjective` for TALK), `gameState.flags`.

### 13a. State & schema

- [ ] **13.1** Confirm `DialogueNode`, `DialogueChoice`, `DialogueCondition` in `gameState.ts` per PRD §4.11; add if absent -- add `speakerId`, `onEnter?: DialogueEffect[]` to `DialogueNode`; add `hidden?: boolean` to `DialogueChoice`; define `DialogueEffect` union: `SET_FLAG | TRUST_DELTA | LOVE_DELTA | GIVE_ITEM | TAKE_ITEM | START_QUEST`
- [ ] **13.2** Define `DialogueState` -- `activeTreeId`, `currentNodeId`, `speakerNpcId`, `history: string[]`; add `dialogue: DialogueState` to root `GameState`
- [ ] **13.3** Add dialogue `GameEvent` variants: `DIALOGUE_STARTED`, `DIALOGUE_CHOICE_MADE`, `DIALOGUE_COMPLETED`, `DIALOGUE_EFFECT_APPLIED`
- [ ] **13.4** Author initial dialogue tree data in `src/data/dialogueTrees.ts` -- 1 generic NPC intro tree, 1 Elara companion tree (3 nodes, 2 choices, 1 trust-locked path), 1 quest board tree (triggers `START_QUEST`)

### 13b. Condition evaluator

- [ ] **13.5** Implement `evaluateCondition(gameState, condition, npcId): boolean` pure -- `FLAG` / `TRUST` / `LOVE` / `QUEST_STAGE` / `ITEM_IN_INV` / `COMPANION` branches
- [ ] **13.6** Implement `getAvailableChoices(gameState, node, npcId): { choice; locked: boolean }[]` -- all choices returned; `locked: true` on condition fail; `hidden: true` choices excluded

### 13c. Core engine functions

- [ ] **13.7** Implement `startDialogue(gameState, treeId, npcId): GameState` -- load tree; guard existence + NPC; initialize `DialogueState`; call `individuateNpc()` on first contact (lazy individuation, task 3c.4); emits `DIALOGUE_STARTED`
- [ ] **13.8** Implement `makeChoice(gameState, choiceIndex): GameState` -- guard valid + not locked; apply effects; advance `currentNodeId`; push `history`; emits `DIALOGUE_CHOICE_MADE`; calls `endDialogue()` if `nextNodeId === 'END'`
- [ ] **13.9** Implement `applyDialogueEffect(gameState, effect): GameState` -- dispatches to: flags / relationshipEngine / economyEngine / questEngine; emits `DIALOGUE_EFFECT_APPLIED`
- [ ] **13.10** Implement `endDialogue(gameState): GameState` -- clears `DialogueState`; emits `DIALOGUE_COMPLETED`; calls `updateObjective()` for active TALK objectives on `speakerNpcId`
- [ ] **13.11** Implement `getCurrentNode(gameState): DialogueNode | null` pure helper
- [ ] **13.12** Implement `getGenericDialogueTree(npcClass): string` -- returns class-level intro tree ID; used as fallback in `startDialogue()`

### 13d. Dispatcher wiring

- [ ] **13.13** Wire `TALK` intent in `dispatcher.ts` -- resolve tree ID (companion-specific or generic fallback); call `startDialogue()`
- [ ] **13.14** Wire `DIALOGUE_CHOOSE` intent in `dispatcher.ts` -- call `makeChoice()`

### 13e. Mock data

- [ ] **13.15** Update `mockDialogueNode.ts` -- add `speakerId`, `onEnter` stub; confirm 3-choice mock still renders in `DialogueView`

---

## Phase 14: Status Effects Engine

> Engine file: `src/engines/statusEffectEngine.ts`.
> PRD reference: §4.13.
> Static data: `src/data/statusEffects.ts` (new file).
> Note: `ActiveStatusEffect` already on every `Character`; this phase implements the tick/apply/expire logic.

### 14a. State & schema

- [ ] **14.1** Confirm `StatusEffectDef` and `ActiveStatusEffect` in `gameState.ts` per PRD §4.13; add if absent -- `StatusEffectDef`: `id`, `name`, `maxStacks`, `duration`, `onTick: StatusTickEffect[]`; `StatusTickEffect` union: `STAT_MULT | STAT_FLAT | DAMAGE_PER_TURN | HEAL_PER_TURN | AROUSAL_GAIN`
- [ ] **14.2** Author initial catalog in `src/data/statusEffects.ts` -- `POISONED` (DAMAGE 5, 3t, stacks 1), `BURNING` (DAMAGE 8, 3t, stacks 3, refreshes on stack), `REGENERATING` (HEAL 10, 4t, stacks 1), `WEAKENED` (STR x0.7, 2t, stacks 1), `AROUSED` (AROUSAL_GAIN 10/t, 3t -- sexual attacks), `DEFENDED` (DEF x1.3, 1t, stacks 1), `STUNNED` (skip action, 1t, stacks 1)
- [ ] **14.3** Add status effect `GameEvent` variants: `STATUS_APPLIED`, `STATUS_TICKED`, `STATUS_EXPIRED`, `STATUS_STACKED`

### 14b. Core engine functions

- [ ] **14.4** Implement `getStatusDef(id): StatusEffectDef` pure lookup
- [ ] **14.5** Implement `applyStatus(character, defId): AnyCharacter` -- if present: increment stacks to `maxStacks` + refresh turns, emit `STATUS_STACKED`; else append + emit `STATUS_APPLIED`; immutable return
- [ ] **14.6** Implement `tickStatusEffects(character): { character; events: GameEvent[] }` -- apply each `StatusTickEffect`; decrement turns; remove at 0; emits `STATUS_TICKED` + `STATUS_EXPIRED` per removed entry
- [ ] **14.7** Implement `hasStatus(character, defId): boolean` pure helper
- [ ] **14.8** Implement `getStatusStacks(character, defId): number` pure helper -- 0 if absent
- [ ] **14.9** Implement `removeStatus(character, defId): AnyCharacter` -- removes all stacks; emits `STATUS_EXPIRED`; no-op if absent
- [ ] **14.10** Implement `clearAllStatuses(character): AnyCharacter` -- full rest (sleep); emits `STATUS_EXPIRED` per entry
- [ ] **14.11** Implement `deriveEffectiveStats(character): CombatStats` -- stacks all `STAT_MULT` + `STAT_FLAT` effects on base stats; pure snapshot used by combat engine

### 14c. Combat engine integration

- [ ] **14.12** Update `combatEngine.ts`: call `tickStatusEffects()` on each combatant at start of their turn; merge returned events into combat log
- [ ] **14.13** Update `resolveHit()`: call `deriveEffectiveStats()` for attacker STR and defender DEF instead of raw field reads
- [ ] **14.14** Add `statusEffectsApplied?: { defId: string; chance: number }[]` to `CombatAction`; on hit, roll chance and call `applyStatus()` -- replaces no-op STATUS_APPLY stub
- [ ] **14.15** Update `applyFullRestoreToParty()` in `partyEngine.ts` to call `clearAllStatuses()` on all members

### 14d. Mock data

- [ ] **14.16** Add 1 active status to player in `mockCombatState.ts` (`WEAKENED`, 1 turn) and 1 to enemy (`BURNING`, stacks 2, 2 turns); confirm `StatusIconRow` renders correctly

---

## Phase 15: Crafting & Equipment Engine

> Engine file: `src/engines/craftingEngine.ts`.
> PRD reference: §4.9.
> Static data: `src/data/recipes.ts` (new file).
> Depends on: Phase 12 (inventory), Phase 12 (`getInventorySlots` for Manor tier check), calendarEngine step 4 stub.

### 15a. State & schema

- [ ] **15.1** Define `RecipeDef` in `src/data/recipes.ts` -- `id`, `name`, `ingredients: { itemId: string; quantity: number }[]`, `outputItemId`, `outputQuantity`, `requiredManorTier: number` (2+), `craftingTimePhases: number` (phases until job resolves)
- [ ] **15.2** Define `CraftingJob` runtime state -- `recipeId`, `startedOnPhase: number`, `completesOnPhase: number`, `slotIndex: number`; define `CraftingQueue` -- `jobs: CraftingJob[]`, `maxSlots: number` (1 at tier 2, +1 per tier up to 4 at tier 5)
- [ ] **15.3** Add `craftingQueue: CraftingQueue` to root `GameState` if not present
- [ ] **15.4** Add crafting `GameEvent` variants: `CRAFTING_STARTED` (`recipeId`, `completesOnPhase`), `CRAFTING_COMPLETED` (`recipeId`, `outputItemId`, `outputQuantity`), `CRAFTING_FAILED` (`recipeId`, reason)
- [ ] **15.5** Define `EquipmentSlot` type -- `'WEAPON' | 'OFF_HAND' | 'HEAD' | 'CHEST' | 'HANDS' | 'LEGS'`; add `equipped: Partial<Record<EquipmentSlot, string>>` to `PlayerCharacter` and `PartyMember` if not present
- [ ] **15.6** Author initial recipe catalog in `src/data/recipes.ts` -- at minimum: 5 recipes spanning MATERIAL -> CONSUMABLE, MATERIAL -> WEAPON, and MATERIAL -> MATERIAL tiers

### 15b. Crafting queue functions

- [ ] **15.7** Implement `getRecipeDef(id): RecipeDef` pure lookup
- [ ] **15.8** Implement `canCraft(gameState, recipeId): { eligible: boolean; reason?: string }` -- checks manor tier >= `requiredManorTier`, all ingredients available via `hasItem()`, queue slot free
- [ ] **15.9** Implement `startCraft(gameState, recipeId): GameState` -- guard `canCraft()`; consume all ingredient items via `removeItem()`; append `CraftingJob` with `completesOnPhase = currentPhase + craftingTimePhases`; emits `CRAFTING_STARTED`
- [ ] **15.10** Implement `resolveCraftingJobs(gameState): GameState` -- called at day-end step 4; iterates jobs where `completesOnPhase <= currentPhase`; calls `addItem()` with output; removes job from queue; emits `CRAFTING_COMPLETED`; wired into `calendarEngine.runDayEndTick()` step 4

### 15c. Equipment upgrade functions

- [ ] **15.11** Define `UpgradeTier` -- 0 to +3; add `upgradeLevel: number` field to `ItemDef` (effective stats = `baseStat + upgradeLevel` for all stat-bearing fields)
- [ ] **15.12** Implement `getUpgradeFailRate(currentTier, hasAlchemyLab: boolean): number` -- table: +0->+1: 0%, +1->+2: 15%, +2->+3: 30%; halved if `hasAlchemyLab` (manor tier 4+)
- [ ] **15.13** Implement `upgradeItem(gameState, itemId, useAlchemyLab: boolean): GameState` -- guard item in inventory + upgradeable type + tier < 3 + `hasAlchemyLab` check if requested; roll failure; on success increment `upgradeLevel`; on failure item stays at current tier (no destruction); emits `ITEM_REMOVED` + `ITEM_ACQUIRED` with updated itemId or in-place mutation
- [ ] **15.14** Implement `equipItem(gameState, itemId, slot: EquipmentSlot, targetId: 'player' | npcId): GameState` -- guard item type matches slot; unequip current slot item back to inventory; set `equipped[slot]`
- [ ] **15.15** Implement `unequipItem(gameState, slot: EquipmentSlot, targetId): GameState` -- move equipped item back to inventory; guard overflow

### 15d. Dispatcher wiring

- [ ] **15.16** Wire `CRAFT` intent -> `startCraft()`
- [ ] **15.17** Wire `EQUIP` intent -> `equipItem()`; wire `UNEQUIP` intent -> `unequipItem()`
- [ ] **15.18** Wire `UPGRADE` intent -> `upgradeItem()` (routes Forge vs Alchemy Lab based on flag)

---

## Phase 16: Skills & Abilities Engine

> Engine file: `src/engines/skillEngine.ts`.
> PRD reference: §4.12.
> Static data: `src/data/skills.ts` (new file).
> Depends on: Phase 14 (`applyStatus()` for STATUS_APPLY skill effects), Phase 12 (CPW cost is on player vitals).

### 16a. State & schema

- [ ] **16.1** Confirm `SkillDef` and `SkillEffect` interfaces in `gameState.ts` per PRD §4.12; add if absent -- `SkillDef`: `id`, `tree: 'BATTLE' | 'ARDOR'`, `name`, `isPassive`, `cpwCost?`, `pointCost`, `prerequisites: string[]`, `effects: SkillEffect[]`; `SkillEffect` union: `STAT_BOOST | DAMAGE_MULTIPLIER | AROUSAL_GAIN | STATUS_APPLY`
- [ ] **16.2** Confirm `unlockedSkillIds: string[]`, `battlePoints`, `ardorPoints`, `unspentBP`, `unspentAP` on `PlayerCharacter`; add if absent
- [ ] **16.3** Add skill `GameEvent` variants: `SKILL_UNLOCKED` (`skillId`, `tree`), `SKILL_USED` (`skillId`, `cpwCost`), `SKILL_TREE_RESET` (`tree`)
- [ ] **16.4** Author initial skill catalog in `src/data/skills.ts` -- at minimum: 5 BATTLE skills (2 passive stat boosts, 1 active damage mult, 1 active STATUS_APPLY stun, 1 passive dodge boost), 5 ARDOR skills (2 passive arousal gain boost, 1 active resist-break, 1 passive technique bonus, 1 active orgasm-edge)

### 16b. Core engine functions

- [ ] **16.5** Implement `getSkillDef(id): SkillDef` pure lookup
- [ ] **16.6** Implement `canUnlock(gameState, skillId): { eligible: boolean; reason?: string }` -- prerequisites all in `unlockedSkillIds`; unspent points >= `pointCost`; not already unlocked
- [ ] **16.7** Implement `unlockSkill(gameState, skillId): GameState` -- guard `canUnlock()`; deduct unspentBP or unspentAP; push to `unlockedSkillIds`; emits `SKILL_UNLOCKED`
- [ ] **16.8** Implement `getUnlockedSkills(gameState): SkillDef[]` pure helper -- maps `unlockedSkillIds` to defs
- [ ] **16.9** Implement `getActiveSkills(gameState): SkillDef[]` -- unlocked non-passive skills; used by action bar
- [ ] **16.10** Implement `getPassiveSkills(gameState): SkillDef[]` -- unlocked passive skills; applied automatically
- [ ] **16.11** Implement `applyPassiveSkills(gameState, baseCombatStats): CombatStats` -- stacks all `STAT_BOOST` and `DAMAGE_MULTIPLIER` effects from passive skills on top of base + status-derived stats; pure derived snapshot; called by combat engine before any hit resolution
- [ ] **16.12** Implement `useActiveSkill(gameState, skillId, targetId?): GameState` -- guard CPW >= cpwCost; deduct CPW; apply `SkillEffect[]` (STATUS_APPLY -> call `applyStatus()`, AROUSAL_GAIN -> target arousal, DAMAGE_MULTIPLIER -> attach to next attack intent); emits `SKILL_USED`
- [ ] **16.13** Implement `resetSkillTree(gameState, tree: 'BATTLE' | 'ARDOR'): GameState` -- removes all skills in that tree from `unlockedSkillIds`; refunds all points spent; emits `SKILL_TREE_RESET`

### 16c. Combat & intimacy integration

- [ ] **16.14** Update `combatEngine.ts`: call `applyPassiveSkills()` to get effective stats before each hit resolution; pass active skill effects through the action intent
- [ ] **16.15** Update `resolveSceneAction()` in `intimacyEngine.ts`: apply ARDOR passive `AROUSAL_GAIN` boosts to the stimulation multiplier chain

### 16d. Dispatcher wiring

- [ ] **16.16** Wire `USE_SKILL` intent -> `useActiveSkill()`
- [ ] **16.17** Wire `UNLOCK_SKILL` intent -> `unlockSkill()`
- [ ] **16.18** Wire `RESET_SKILL_TREE` intent -> `resetSkillTree()`

---

## Phase 17: World Map & Travel Engine

> Engine file: `src/engines/worldEngine.ts`.
> PRD reference: §4.15.
> Static data: `src/data/worldGraph.ts` (new file).
> Depends on: Phase 10 (reputation for bounty-zone behavior), Phase 11 (`TRAVEL_NODE_REACHED` for quest objectives), Phase 8 (action count increment per segment).

### 17a. State & schema

- [ ] **17.1** Define `WorldNode` and `WorldEdge` in `src/data/worldGraph.ts` -- `WorldNode`: `id`, `name`, `regionId`, `isSafe: boolean`, `safetyTier: 'SECURE' | 'FORTIFIED' | 'PERILOUS'`, `npcClasses: string[]`, `monsterProfileId?`; `WorldEdge`: `fromId`, `toId`, `travelPhases: number`, `regionBoundaryCrossings: number`; export `WORLD_GRAPH: WorldNode[]` and `WORLD_EDGES: WorldEdge[]` (81 nodes, 92 edges per PRD §4.15)
- [ ] **17.2** Confirm `WorldState` has `currentNodeId: string`, `discoveredNodeIds: string[]`, `lastSafeNodeId: string`; add if absent
- [ ] **17.3** Add travel `GameEvent` variants: `TRAVEL_STARTED` (`fromId`, `toId`), `TRAVEL_NODE_REACHED` (`nodeId`), `ENCOUNTER_ROLLED` (`nodeId`, `phase`, `encounterType`), `FAST_TRAVEL_USED` (`fromId`, `toId`, `goldCost`), `LAST_SAFE_UPDATED` (`nodeId`)

### 17b. Pathfinding

- [ ] **17.4** Implement `dijkstra(fromId, toId): string[]` -- returns ordered node ID path; uses `travelPhases` as edge weight; pure function operating on static graph; returns empty array if no path
- [ ] **17.5** Implement `getAdjacentNodes(nodeId): WorldNode[]` pure helper -- all nodes with a direct edge from `nodeId`
- [ ] **17.6** Implement `countRegionBoundaries(path: string[]): number` -- sums `regionBoundaryCrossings` across edges in path; used for fast travel cost

### 17c. Core travel functions

- [ ] **17.7** Implement `travelToAdjacent(gameState, targetNodeId): GameState` -- guard adjacency; increments action count per `travelPhases` on edge; for each intermediate phase: roll encounter chance from `ENCOUNTER_CHANCE_TABLE` (Morning 10% / Afternoon 15% / Evening 20% / Night 35% / Midnight 50%); on encounter: emits `ENCOUNTER_ROLLED` and pauses travel (dispatcher initiates combat or event); on no encounter: advance phase; on arrival: emits `TRAVEL_NODE_REACHED`, updates `currentNodeId`, calls `updateLastSafeLocation()` if `isSafe`; discover node if new
- [ ] **17.8** Implement `fastTravel(gameState, targetNodeId): GameState` -- guard target is in `discoveredNodeIds`; compute path via `dijkstra()`; calculate `goldCost = 5 x countRegionBoundaries(path)`; guard `player.gold >= goldCost`; deduct gold; teleport to target; emits `FAST_TRAVEL_USED`, `TRAVEL_NODE_REACHED`; calls `updateLastSafeLocation()` if `isSafe`; does NOT roll encounters
- [ ] **17.9** Implement `updateLastSafeLocation(gameState, nodeId): GameState` -- only updates when `WorldNode.isSafe === true`; emits `LAST_SAFE_UPDATED`
- [ ] **17.10** Implement `getCurrentNode(gameState): WorldNode` pure helper
- [ ] **17.11** Implement `getDiscoveredNodes(gameState): WorldNode[]` pure helper

### 17d. Dispatcher wiring

- [ ] **17.12** Wire `MOVE` intent -> `travelToAdjacent()`; on `ENCOUNTER_ROLLED` event dispatcher initiates combat (monster) or `ExplorationEncounterView` (trap/event)
- [ ] **17.13** Wire `FAST_TRAVEL` intent -> `fastTravel()`
- [ ] **17.14** Wire `TRAVEL_NODE_REACHED` event -> `updateObjective()` in questEngine for TRAVEL objectives

---

## Phase 18: Pregnancy & Offspring Engine

> Engine file: `src/engines/pregnancyEngine.ts`.
> PRD reference: §4.16.
> Depends on: NPC spawn engine (offspring stat generation), calendarEngine steps 2 stub.

### 18a. State & schema

- [ ] **18.1** Define `PregnancyStage` enum -- `NotPregnant | EarlyFirst | LateFirst | EarlySecond | LateSecond | EarlyThird | LateThird | FullTerm`; define `PREGNANCY_WEEK_TO_STAGE` map (NotPregnant=0, EarlyFirst=1-2, LateFirst=3-4, EarlySecond=5-6, LateSecond=7-8, EarlyThird=9-10, LateThird=11, FullTerm=12)
- [ ] **18.2** Define `PregnancyState` on `NpcCharacter` -- `pregnancyWeek: number`, `stage: PregnancyStage`, `fatherId?: string`, `conceptionDay?: number`, `pregnantFlaggedToday: boolean` (set on day a creampie occurred; cleared at day-end after conception check)
- [ ] **18.3** Define `OffspringRecord` -- `id`, `motherId`, `fatherId`, `birthDay`, `alignment: 'Normal' | 'Troubled' | 'Criminal'`, `stats: CombatStats`, `name?: string`; add `offspring: OffspringRecord[]` to root `GameState`
- [ ] **18.4** Add pregnancy `GameEvent` variants: `CONCEPTION_CHECK_PASSED` (`npcId`, `fatherId`), `PREGNANCY_STAGE_ADVANCED` (`npcId`, `stage`), `BIRTH_OCCURRED` (`npcId`, `offspringId`), `LACTATION_STARTED` (`npcId`)

### 18b. Core engine functions

- [ ] **18.5** Implement `checkConception(gameState, npcId): GameState` -- called at day-end step 2 only if `pregnantFlaggedToday`; guard: not already pregnant; read `fertilityRating` from `NpcCharacter.sexualPhysiology`; roll `Math.random() < fertilityRating / 100`; on success: set `pregnancyWeek = 0`, `stage = EarlyFirst`, `fatherId = player.id`, `conceptionDay`; emits `CONCEPTION_CHECK_PASSED`; always clears `pregnantFlaggedToday`
- [ ] **18.6** Implement `tickPregnancy(gameState): GameState` -- called at day-end step 2 for all pregnant NPCs; increment `pregnancyWeek`; update `stage` from `PREGNANCY_WEEK_TO_STAGE`; emits `PREGNANCY_STAGE_ADVANCED` on stage change; calls `resolveBirth()` when `pregnancyWeek >= 12`
- [ ] **18.7** Implement `resolveBirth(gameState, npcId): GameState` -- reset `pregnancyWeek = 0`, `stage = NotPregnant`; generate offspring stats: average parent combat stats +- 10% random variance; roll alignment (Normal 34% / Troubled 33% / Criminal 33%); create `OffspringRecord`; push to `gameState.offspring`; set `lactation = true` on NPC physiology; emits `BIRTH_OCCURRED`, `LACTATION_STARTED`
- [ ] **18.8** Implement `flagPregnancyRisk(gameState, npcId): GameState` -- called by dispatcher on `SCENE_ENDED` when `SceneEndPersistence.pregnancyCheck === true` and no condom was used; sets `pregnantFlaggedToday = true` on NPC

### 18c. Day-end wiring

- [ ] **18.9** Wire `checkConception()` + `tickPregnancy()` into `calendarEngine.runDayEndTick()` step 2 (currently TODO stub) -- process all NPCs with `pregnantFlaggedToday` first, then tick all pregnant NPCs

---

## Phase 19: Manor & Passive Gen Engine

> Engine file: `src/engines/manorEngine.ts` (partial stub exists).
> PRD reference: §4.17.
> Depends on: Phase 12 (`addItem()` for passive gen output), calendarEngine steps 5 and 6 stubs.

### 19a. State & schema

- [ ] **19.1** Confirm `ManorState` in `gameState.ts` -- `tier: number` (1-6), `constructionTimerPhases: number` (phases remaining on active upgrade), `suites: SuiteRecord[]`, `passiveResourceQueue: { itemId: string; quantity: number }[]`; add if absent
- [ ] **19.2** Define `SuiteRecord` -- `suiteId: string`, `occupantNpcId?: string`, `tier: number` (derived from `ManorState.tier`); define `SUITE_UNLOCK_TABLE` -- tier 2: 1 suite / tier 3: 3 / tier 4: 5 / tier 5: 8 / tier 6: unlimited
- [ ] **19.3** Define `MANOR_TIER_FEATURES` constant -- maps tier to feature unlock list per PRD §4.17 table (storage slots, crafting bench, suites, alchemy lab, workshop, full estate)
- [ ] **19.4** Add manor `GameEvent` variants: `MANOR_UPGRADE_STARTED` (`fromTier`, `toTier`, `timerPhases`), `MANOR_UPGRADE_COMPLETED` (`newTier`), `SUITE_ASSIGNED` (`suiteId`, `npcId`), `SUITE_VACATED` (`suiteId`, `npcId`), `PASSIVE_GEN_COLLECTED` (`items`)

### 19b. Core engine functions

- [ ] **19.5** Implement `startManorUpgrade(gameState): GameState` -- guard tier < 6 + no upgrade in progress (`constructionTimerPhases === 0`); set `constructionTimerPhases` based on tier (tier 1->2: 5 phases, each +2 phases per tier step); emits `MANOR_UPGRADE_STARTED`
- [ ] **19.6** Implement `resolveConstructionTimers(gameState): GameState` -- called at day-end step 5; decrement `constructionTimerPhases` by 5 (one full day = 5 phases); when reaches 0: increment `tier`; emits `MANOR_UPGRADE_COMPLETED`; wired into `calendarEngine.runDayEndTick()` step 5
- [ ] **19.7** Implement `assignSuite(gameState, suiteId, npcId): GameState` -- guard suite exists + occupant eligible (`isMoveInEligible()`) + suite unoccupied; set `occupantNpcId`; emits `SUITE_ASSIGNED`
- [ ] **19.8** Implement `vacateSuite(gameState, suiteId): GameState` -- clears `occupantNpcId`; emits `SUITE_VACATED`
- [ ] **19.9** Implement `resolvePassiveGeneration(gameState): GameState` -- called at day-end step 6; for each suite with an occupant: generate items/gold based on occupant race/class and manor tier; push to `passiveResourceQueue`; emits `PASSIVE_GEN_COLLECTED`; wired into `calendarEngine.runDayEndTick()` step 6
- [ ] **19.10** Implement `collectPassiveResources(gameState): GameState` -- player manually collects from queue; calls `addItem()` per queued item; clears queue

### 19c. Dispatcher wiring

- [ ] **19.11** Wire `BUILD` intent -> `startManorUpgrade()`
- [ ] **19.12** Wire `ASSIGN_SUITE` intent -> `assignSuite()`
- [ ] **19.13** Wire `COLLECT_RESOURCES` intent -> `collectPassiveResources()`

---

## Phase 20: Achievement Engine

> Engine file: `src/engines/achievementEngine.ts`.
> PRD reference: §4.14.
> Static data: `src/data/achievements.ts` (new file).
> Depends on: all event-emitting engines (achievements are triggered by game events); Phase 16 for AP/BP grants.
> Also closes task 2.29 -- achievement list authored in this phase.

### 20a. State & schema

- [ ] **20.1** Define `AchievementDef` in `src/data/achievements.ts` -- `id`, `tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'`, `title`, `description`, `condition: AchievementCondition`, `reward: { ap?: number; bp?: number; titleToken?: string }`; define `AchievementCondition` union: `{ type: 'EVENT'; eventType: string }` | `{ type: 'FLAG'; flagId: string; value: boolean | number | string }` | `{ type: 'STAT_THRESHOLD'; stat: string; threshold: number }` | `{ type: 'COUNT'; counterId: string; threshold: number }` | `{ type: 'COMPOUND'; all: AchievementCondition[] }`
- [ ] **20.2** Define `AchievementEntry` runtime state -- `defId`, `status: 'LOCKED' | 'UNLOCKED'`, `unlockedOnDay?: number`; add `achievements: AchievementEntry[]` to root `GameState`
- [ ] **20.3** Add achievement `GameEvent` variants: `ACHIEVEMENT_UNLOCKED` (`defId`, `tier`, `reward`)
- [ ] **20.4** Author full achievement catalog in `src/data/achievements.ts` (closes task 2.29) -- at minimum: 20 achievements spanning combat (BRONZE: first kill, SILVER: 50 kills, GOLD: 500 kills), intimacy (BRONZE: first scene, SILVER: 10 partners, GOLD: scene at max satisfaction), relationship (BRONZE: first close bond, GOLD: Devoted with any NPC), world (BRONZE: discover 10 nodes, GOLD: discover all 81), special (PLATINUM: purify all regions)

### 20b. Core engine functions

- [ ] **20.5** Implement `getAchievementDef(id): AchievementDef` pure lookup
- [ ] **20.6** Implement `evaluateAchievementCondition(gameState, condition): boolean` pure function -- dispatches on `condition.type`; `EVENT` conditions return false here (handled at event-time); `FLAG`, `STAT_THRESHOLD`, `COUNT`, `COMPOUND` all evaluate against current state
- [ ] **20.7** Implement `checkAchievements(gameState, triggerEvent?: GameEvent): GameState` -- iterates all LOCKED achievements; evaluates condition against current state (and `triggerEvent.type` for EVENT conditions); calls `grantAchievement()` for each newly satisfied; returns updated state; called by dispatcher after every intent resolution
- [ ] **20.8** Implement `grantAchievement(gameState, defId): GameState` -- sets entry to UNLOCKED; sets `unlockedOnDay`; grants `reward.ap` to `player.unspentAP`, `reward.bp` to `player.unspentBP`; writes `reward.titleToken` to `flags['earned_title_<defId>']`; emits `ACHIEVEMENT_UNLOCKED`
- [ ] **20.9** Implement `getUnlockedAchievements(gameState): AchievementEntry[]` pure helper -- used by `AchievementsView`
- [ ] **20.10** Implement `incrementAchievementCounter(gameState, counterId): GameState` -- increments `flags['ach_counter_<counterId>']`; called by dispatcher for countable events (kill count, partner count, etc.); triggers `checkAchievements()` after increment

### 20c. Dispatcher wiring

- [ ] **20.11** Call `checkAchievements(gameState, event)` at the end of every dispatcher intent handler -- single hook point; achievement checks are always the last side effect applied

---

## Phase 21: Contact & Profile Engine

> Engine file: `src/engines/contactEngine.ts` (thin aggregation layer, no new state).
> PRD reference: §4.19.
> Depends on: all NPC state fields already on `NpcCharacter`; no new data needed.

### 21a. Core aggregation functions

- [ ] **21.1** Implement `assembleProfileView(gameState, npcId): ContactProfileView` -- aggregates all display fields for `ContactsView` into a single flat object; no new state; purely reads from `NpcCharacter`:
  - Tab 1 (Social/Bio): `trust`, `love`, `getRelationshipStatus()`, `playerBondType`, `background.occupation`, `background.regionOfOrigin`, parent names from `history`
  - Tab 2 (Physical/Physiology): `measurements`, cup size, `physicalDetail`, virginity status (`history.totalEncounterCount === 0`), pregnancy stage, lactation status
  - Tab 3 (Psychology): `personality` Big Five traits, `sexualPsychology.acquiredKinks`, `sexualPsychology.resistanceProfile.profileType`
- [ ] **21.2** Implement `sortContacts(gameState): ContactRecord[]` pure helper -- primary sort: companion quest milestone stage (companions first, higher stage first); secondary sort: relationship magnitude (`trust + love` descending)
- [ ] **21.3** Implement `getContactCount(gameState): number` pure helper -- `gameState.contacts.length`; referenced before `tryAddContact()` to enforce cap
- [ ] **21.4** Implement `findContact(gameState, npcId): NpcCharacter | undefined` pure helper -- looks up by `npcId` through `contacts`
- [ ] **21.5** Implement `getContactsByLocation(gameState, nodeId): NpcCharacter[]` pure helper -- uses `resolveNpcLocation()` from `npcPopulationEngine`; used by `InspectorLens` to populate entity stack

### 21b. Define `ContactProfileView` type

- [ ] **21.6** Define `ContactProfileView` interface in `gameState.ts` -- flat union of all fields needed by the three `ContactsView` sub-tabs; avoids re-deriving per tab render; document that this is a view model (never stored in `GameState`)

### 21c. Dispatcher wiring

- [ ] **21.7** Wire `INSPECT_CONTACT` intent in `dispatcher.ts` -> `assembleProfileView()`; returned as part of intent response payload (not stored in `GameState`)

---

## Phase 22: Save/Load Engine

> Engine file: `src/engines/saveEngine.ts`.
> PRD reference: §4.18.
> Depends on: entire `GameState` schema being stable; should be implemented last.

### 22a. Serialization

- [ ] **22.1** Define `SAVE_SCHEMA_VERSION` constant (start at `1`); add `schemaVersion: number` to the save file wrapper (not inside `GameState`)
- [ ] **22.2** Implement `gameStateReplacer(key, value)` JSON replacer -- no-op replacer needed since `Set<T>` was already converted to `T[]` in Phase 1 (task 1.11); verify no remaining `Set` fields exist in the full schema; document replacer as a future hook for any new complex types
- [ ] **22.3** Implement `gameStateReviver(key, value)` JSON reviver -- re-hydrates any fields that need special post-parse treatment (dates as numbers are already fine; `Set` already arrays); verify correctness on a full round-trip
- [ ] **22.4** Implement `serializeGameState(gameState): string` -- `JSON.stringify(gameState, replacer, 2)` wrapped in save file envelope `{ schemaVersion, savedAt: Date.now(), gameState }`
- [ ] **22.5** Implement `deserializeGameState(raw: string): GameState` -- parse envelope; check `schemaVersion`; if version mismatch call `migrateSave()`; apply reviver; validate top-level required fields exist; throw descriptive error on malformed save

### 22b. Persistence functions

- [ ] **22.6** Implement `saveGame(gameState, slot: number): void` -- `slot` range 0-9 (manual) + slot 99 (autosave); atomic write: write to `saves/slot_<N>.tmp` then rename to `saves/slot_<N>.json`; prevents corruption on write failure; on success write `saves/slot_<N>.meta.json` with `{ slot, savedAt, day, location, playerLevel }`
- [ ] **22.7** Implement `loadGame(slot: number): GameState` -- read `saves/slot_<N>.json`; call `deserializeGameState()`
- [ ] **22.8** Implement `listSaves(): SaveMeta[]` -- reads all `.meta.json` files in `saves/`; returns array sorted by `savedAt` descending; used by Continue and Load screens
- [ ] **22.9** Implement `deleteSave(slot: number): void` -- deletes `.json` + `.meta.json` for slot; guard: slot 99 (autosave) cannot be manually deleted

### 22c. Migration

- [ ] **22.10** Implement `migrateSave(raw: object, fromVersion: number): object` -- switch on `fromVersion`; currently a no-op (v1 to v1); add migration steps here as schema evolves; migrations are additive (fill missing fields with defaults)

### 22d. Autosave hook

- [ ] **22.11** Wire autosave into `calendarEngine.runDayEndTick()` after all tick steps complete (after step 9) -- calls `saveGame(gameState, 99)`; autosave only runs at Midnight day-end

### 22e. New Game+ guard

- [ ] **22.12** Implement `isNewGamePlusEligible(gameState): boolean` -- checks `gameState.flags['game_cleared'] === true`; used by `TitleScreenView` to show/hide the New Game+ option
- [ ] **22.13** Implement `startNewGamePlus(gameState): GameState` -- requires explicit confirmation intent; resets world/quest/calendar/contacts/reputation/manor to initial values; preserves `player.level`, `player.unlockedSkillIds`, `player.gold` (50% carry-over), and `achievements`; emits no events (clean slate)

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

## Infrastructure

- [x] **I.1** Add `.gitignore` (node_modules, compiled output, IDE files, save files)
- [x] **I.1b** Rename `Project/` -> `spawn-engine/`; update all cross-references in docs and source
- [ ] **I.2** Set up tRPC server scaffold
- [ ] **I.3** Set up React client with Zustand (App.tsx shell done; needs Vite + package.json wiring)
- [ ] **I.4** Configure build pipeline (tsconfig paths, output dirs)
- [ ] **I.5** Add basic unit test harness (Jest or Vitest)
- [ ] **I.6** Write unit tests for spawn engine
