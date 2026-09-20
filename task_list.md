# Ojisan -- Execution Task List

**Task list version:** 3.7 (updated 2026-09-20)
**Tracks:** requirements_analysis.md v1.3, PRD v1.7

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
- [ ] **23.21** `INTIMATE` action handoff (Task 3c.4): when `intimateReady`, build `NpcPartnerProfile` snapshot from `cell.capturedCharacter`; call `startScene()` with `sceneStartType = 'CAPTIVE'`; return scene state in `DispatchResult`
- [x] **23.22** `mockGameState.ts` -- add `holdingCells: []` to `manor` block; add `rope` to player inventory
- [ ] **23.23** Achievement data: author taming-specific achievements when achievement catalog session runs (deferred, same policy as 20.4)

---

## Phase 23a — Moral Alignment System

> Engine file: `src/engines/alignmentEngine.ts` (new).
> PRD reference: §4.22.
> Depends on: Phase 10 (reputation tracks), Phase 13 (`DialogueCondition` union), Phase 11 (quest reward flagsSet).
> Must complete before quest data authoring (tasks 11.5, 25.4–25.7) and achievement authoring (task 20.4).

### 23a-1. Schema

- [ ] **23a.1** Add `alignmentScore: number` to `PlayerCharacter` in `gameState.ts` -- init `0`; range -100 to +100; negative = Sovereign tendency, positive = Purifier tendency, near-zero = Pragmatist tendency; does not lock the player into a path
- [ ] **23a.2** Add `darkReputation: Record<RegionId, number>` to root `GameState` alongside existing `reputation` -- init all regions `0`; range 0–100; independent of `reputation` by formula; at `>= 40` in a region the shadow faction unlocks (vendors, quests, dialogue)
- [ ] **23a.3** Extend `DialogueCondition` union in `gameState.ts` with `{ type: 'ALIGNMENT'; dominantAlignment: 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN' }` variant; update `evaluateCondition()` in `dialogueEngine.ts` to handle it
- [ ] **23a.4** Add alignment `GameEvent` variants: `ALIGNMENT_SHIFTED` (`delta`, `newScore`, `dominantAlignment`), `DARK_REPUTATION_CHANGED` (`regionId`, `delta`, `newScore`)
- [ ] **23a.5** Update `mockGameState.ts` -- add `alignmentScore: 0`, `darkReputation: {}` (or matching 3-region sample set)

### 23a-2. Core engine

- [ ] **23a.6** Implement `deriveDominantAlignment(score: number): 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN'` pure helper -- `>= 40` → PURIFIER; `<= -40` → SOVEREIGN; else → PRAGMATIST
- [ ] **23a.7** Implement `shiftAlignment(gameState, delta: number): { state: GameState; events: GameEvent[] }` -- clamps score to [-100, +100]; derives dominant alignment; emits `ALIGNMENT_SHIFTED`; called by dispatcher on meaningful quest/dialogue decisions, NOT on combat kill/purify outcomes
- [ ] **23a.8** Implement `applyDarkReputationDelta(gameState, regionId, delta): { state: GameState; events: GameEvent[] }` -- clamps [0, 100]; emits `DARK_REPUTATION_CHANGED`; at threshold 40 emits additional `DARK_FACTION_UNLOCKED` event; shadow faction content available when `darkReputation[regionId] >= 40`
- [ ] **23a.9** Implement `getDarkReputation(gameState, regionId): number` pure helper
- [ ] **23a.10** Implement `getDominantAlignment(gameState): 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN'` pure convenience wrapper around `deriveDominantAlignment(gameState.player.alignmentScore)`

### 23a-3. Integration

- [ ] **23a.11** Update `questEngine.grantQuestReward()` -- when `reward.flagsSet` contains `'alignment_purifier'`, `'alignment_pragmatist'`, or `'alignment_sovereign'`, call `shiftAlignment()` with respective delta (+10 / 0 / -10) after credits; delta defined per quest in catalog (deferred to task 11.5)
- [ ] **23a.12** Update `applyDialogueEffect()` in `dialogueEngine.ts` -- add `ALIGNMENT_SHIFT` variant to `DialogueEffect` union: `{ type: 'ALIGNMENT_SHIFT'; delta: number }`; apply via `shiftAlignment()` when dialogue choice is made
- [ ] **23a.13** Update `evaluateCondition()` in `dialogueEngine.ts` -- handle the new `ALIGNMENT` condition type using `getDominantAlignment(gameState)` (task 23a.3)
- [ ] **23a.14** Wire `DARK_REPUTATION_CHANGED` into day-end tick: add a `tickDarkReputationDecay(gameState)` no-op stub in `reputationEngine.ts` for now (dark reputation does not decay passively like regular reputation); note in comment that decay only occurs on Purifier-dominant events in a region, handled by existing `REPUTATION_EVENT_TABLE` extensions that will be authored in task 11.5
- [ ] **23a.15** Add `ALIGNMENT_CONDITION` to `DialogueCondition` union check in `getAvailableChoices()` -- locked when dominant alignment does not match; hidden when `choice.hidden === true`

### 23a-4. Achievement hooks

- [ ] **23a.16** Add `ach_counter_alignment_purifier_choices`, `ach_counter_alignment_sovereign_choices`, `ach_counter_alignment_pragmatist_choices` counters -- incremented by `shiftAlignment()` alongside the score shift; used by achievement conditions of type COUNT in task 20.4

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

- [ ] **26.1**  Add named `CoreStatKey` type alias to `gameState.ts` — `'str' | 'dex' | 'agi' | 'int' | 'wil' | 'per' | 'end'`; replace all bare `string` stat keys in `CombatStats`, `CharacterCreationOptions.allocatedStats`, `SubClassDef.statBonuses` with this type
- [ ] **26.2**  Add `coreStats: Record<CoreStatKey, number>` field to `PlayerCharacter` and `NpcCharacter`; keep existing `CombatStats` (str/agi/wis/def/lck) as the derived combat snapshot — document the mapping: `str→str, dex+agi→agi, int→wis, end→def, per+lck→lck`
- [ ] **26.3**  Implement `deriveCombatStatsFromCoreStats(coreStats: Record<CoreStatKey, number>): CombatStats` in a new `src/engines/statEngine.ts`; call it in `characterCreationEngine.createCharacter()` and `deriveCompanionStats()` to keep the two stat layers in sync

### 26b. Tithe / weekly quota system

- [ ] **26.4**  Add `titheState` block to `GameState` — `{ lastPaidDay: number; quotaGoldPerWeek: number; overdueBy: number }` (all start at 0 / configured by first quest that introduces the system)
- [ ] **26.5**  Implement `tickTithe(gameState)` in `calendarEngine.ts` at day-end step 8d — increments `overdueBy` by 1 each day the quota is unpaid; at 7 days: apply `AETHER_ROT_STAGE_1` via `statusEffectEngine.applyStatus()`; at 14: upgrade to Stage 2; at 21: upgrade to Stage 3; reset on `PAY_TITHE` intent
- [ ] **26.6**  Add `PAY_TITHE` intent to `PlayerIntent` union and wire in dispatcher — deducts `quotaGoldPerWeek` from `player.gold`, resets `overdueBy` to 0, removes all `AETHER_ROT_STAGE_*` statuses, emits `INFAMY_DELTA` –5 in current region

### 26c. 18-slot equipment schema

- [ ] **26.7**  Expand `EquipmentSlot` type in `gameState.ts` to include all 18 lore slots — current: WEAPON, OFF_HAND, HEAD, CHEST, HANDS, LEGS; add: FEET, BACK, NECK, RING_L, RING_R, EARRING_L, EARRING_R, BRACELET_L, BRACELET_R, ANKLET, BELT, ACCESSORY; update `SLOT_VALID_TYPES` map in `craftingEngine.ts` for the 12 new slots
- [ ] **26.8**  Update `equipItem()` in `craftingEngine.ts` — handle paired slots (RING_L / RING_R share the same `ItemDef` but occupy separate slots); add paired-slot logic: if target is RING_L and occupied, offer RING_R automatically before prompting swap
- [ ] **26.9**  Update `EquipmentView` task UI-10.5 — slot matrix expanded to 18 slots in 3 columns of 6; paired slots shown side-by-side

### 26d. Item upgrade socket system

- [ ] **26.10** Add `sockets: AetherSocket[]` to `InventorySlot` — `AetherSocket { socketId: string; inlaidMaterialId?: string; passiveEffect?: string }`; max sockets = `Math.floor(upgradeLevel / 5)` (sockets unlock at +5 and +10)
- [ ] **26.11** Add **`OPEN_SOCKET`** intent to `PlayerIntent` union — takes `itemId` + `materialId` (Aether Crystal type); calls `socketItem()` in `craftingEngine.ts`; deducts material; writes `inlaidMaterialId` + derived `passiveEffect` to the socket slot
- [ ] **26.12** Implement `socketItem(gameState, itemId, socketIndex, materialId)` in `craftingEngine.ts` — guard: item must be equipped, socket must be empty, material must be MATERIAL type with `socketEffect` metadata; emits `ITEM_UPGRADED` variant `SOCKETED`
- [ ] **26.13** Implement `deriveSocketPassives(slot: InventorySlot): string[]` — returns array of `passiveEffect` strings from filled sockets; consumed by `deriveEquipmentStatBonus()` and `applyPassiveSkills()` to apply bonuses

### 26e. Overland travel time & carriage cost

- [ ] **26.14** Add `CARRIAGE_COST_PER_NODE: number = 15` constant to `worldEngine.ts`; add `TRAVEL_MODE` intent variant to `PlayerIntent` — `{ type: 'HIRE_CARRIAGE'; targetNodeId: string }` — deducts `CARRIAGE_COST_PER_NODE × distance` gold, calls `fastTravel()` with zero encounter (same as spire but costs gold and doesn't require unlock)
- [ ] **26.15** Add travel time estimate helper `estimateTravelTime(gameState, fromId, toId): number` (returns phases) — uses `WORLD_EDGES[].travelPhases` sum along shortest path; pure function, no BFS needed for the small authored graph

### 26f. Mini-game stubs

> These are stub-level tasks — no full implementation, just the intent/state scaffolding so each mini-game can be built independently.

- [ ] **26.16** Add `FISHING` intent to `PlayerIntent` — `{ type: 'START_FISHING'; nodeId: string }` — guard: node must have `features.fishing === true`; emits `MINI_GAME_STARTED { gameType: 'FISHING' }`; mini-game resolution deferred to its own task
- [ ] **26.17** Add `GAMBLING` intent — `{ type: 'START_GAMBLING'; stakeGold: number }` — guard: stake ≤ player gold, node has `features.gambling`; emits `MINI_GAME_STARTED { gameType: 'GAMBLING' }`
- [ ] **26.18** Add `ARENA` intent — `{ type: 'ENTER_ARENA' }` — guard: node has `features.arena`, infamy tier < OUTLAW in current region; emits `MINI_GAME_STARTED { gameType: 'ARENA' }`; wires to a `combatEngine.startCombat()` call with an arena-flagged enemy roster
- [ ] **26.19** Add `ONSEN` intent — `{ type: 'USE_ONSEN'; npcId?: string }` — guard: node has `features.onsen`; solo use: full HP/STA restore + `REGENERATING` status 4 turns; paired use (npcId set): additionally calls `resolveSocialAction()` trust +3 on partner; emits `MINI_GAME_STARTED { gameType: 'ONSEN' }`
- [ ] **26.20** Add `features: Partial<Record<LocationFeatureKey, boolean>>` to `WorldNode` schema — `LocationFeatureKey = 'fishing' | 'gambling' | 'arena' | 'onsen' | 'shrine' | 'market' | 'smithy' | 'alchemy_lab'`; update `WORLD_NODES` stub entries in task 25.13 to include feature flags

### 26g. Crime consequence hooks

- [ ] **26.21** Wire `APPLY_INFAMY_DELTA` calls into existing engine actions that constitute crimes — `economyEngine.buyItem()` when gold is insufficient and player has a `steal_attempt` flag set: +20 infamy; `combatEngine.emitVictoryEvents()` when target was `originType: undefined` (civilian): +15 infamy; `captureMonster()` in public locations: +10 infamy
- [ ] **26.22** Add `CITY_GATE_BLOCKED` GameEvent to union — emitted by `worldEngine.enterNode()` when destination node is a city (safe hub, `isSafe: true`) and player infamy tier in that region ≥ CONDEMNED; guard blocks `enterNode()` and returns narrative
- [ ] **26.23** Add infamy-delta trigger in `questEngine.grantQuestReward()` — when quest `reward.flagsSet` contains `'crime_pardoned'`, call `clearInfamy()` for all regions simultaneously (canonical pardon mechanic)

### 26h. Title screen & Character creation UI  (extends UI-10.1 / UI-10.2)

- [ ] **26.24** `TitleScreenView.tsx` — implement fully per UI-10.1; New Game button fires `createBareGameState()` then routes to `CharacterCreationView`; Continue button loads slot 99 autosave via `LIST_SAVES`; New Game+ button gated on `isNewGamePlusEligible()`
- [ ] **26.25** `CharacterCreationView.tsx` — implement per UI-10.2; reads `SubClassDef[]` and `TraitDef[]` from `characterCreationCatalog.ts`; stat allocator enforces `FREE_ATTRIBUTE_POINTS = 10`; Finalise button fires `NEW_GAME` intent via dispatcher; on success routes to overworld
- [ ] **26.26** `CharacterCreationCard` primitive — renders sub-class card with name, stat bonus preview, perk flag description; selected state border highlight
- [ ] **26.27** `StatAllocator` primitive — 7-row grid (`str/dex/agi/int/wil/per/end`); per-row +/– buttons clamped [0, 5]; remaining-points counter; error state when total ≠ 10

### 26i. Enclave Stronghold gate for spire unlock

- [ ] **26.28** Define `ENCLAVE_STRONGHOLD_FLAG_PREFIX = 'enclave_stronghold_'` constant in `spireEngine.ts`; add `getEnclaveStrongholdFlag(nodeId: string): string` helper — returns `enclave_stronghold_<nodeId>`
- [ ] **26.29** Add stronghold prerequisite check to `UNLOCK_SPIRE` intent handler in `dispatcher.ts` — before calling `unlockSpire()`, assert `state.flags[getEnclaveStrongholdFlag(intent.nodeId)] === true`; if not, push narrative `'You must establish an Enclave Stronghold in this region before attuning the spire.'` and return early
- [ ] **26.30** Add `BUILD_STRONGHOLD` intent to `PlayerIntent` — `{ type: 'BUILD_STRONGHOLD'; nodeId: string }` — guard: player gold ≥ 500, node is safe hub, no existing stronghold; deducts gold, sets flag, emits `REPUTATION_CHANGED` delta +50 in region, emits `INFAMY_DELTA` –10

### 26j. Monorepo package boundary (multi-game base)

- [ ] **26.31** Create `packages/engine-core/` — move all files in `src/engines/`, `src/state/gameState.ts`, `src/spawn-engine/`, `src/enums.ts` into this package; add `package.json` with name `@ojisan/engine-core`; update all imports in `src/` to use the package name
- [ ] **26.32** Create `packages/ojisan-data/` — move all files in `src/data/` into this package; add `package.json` with name `@ojisan/data`; this package depends on `@ojisan/engine-core` for catalog interface types only
- [ ] **26.33** Create `apps/ojisan/` — move React client (`src/client/`) + tRPC server into this app; depends on both packages; update Vite config and tsconfig paths
- [ ] **26.34** Update root `package.json` to workspace monorepo config (`"workspaces": ["packages/*", "apps/*"]`); update CI/build scripts
- [ ] **26.35** Document multi-game extension guide in `README.md` — how to create `packages/<new-game>-data/` with a different `JobDef[]`, `SynergyDef[]`, `WeatherCatalogEntry[]` etc. while reusing `@ojisan/engine-core` unchanged

---

## Infrastructure

- [x] **I.1** Add `.gitignore` (node_modules, compiled output, IDE files, save files)
- [x] **I.1b** Rename `Project/` -> `spawn-engine/`; update all cross-references in docs and source
- [ ] **I.2** Set up tRPC server scaffold
- [ ] **I.3** Set up React client with Zustand (App.tsx shell done; needs Vite + package.json wiring)
- [ ] **I.4** Configure build pipeline (tsconfig paths, output dirs)
- [ ] **I.5** Add basic unit test harness (Jest or Vitest)
- [ ] **I.6** Write unit tests for spawn engine
