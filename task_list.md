# Ojisan — Execution Task List

**Task list version:** 1.3 (updated 2026-08-30)
**Tracks:** requirements_analysis.md v1.2, PRD v1.4

---

## Phase 1: Fix Code Bugs (Existing Files)

> All bugs from the initial analysis (v1.0) have been resolved in the current codebase.
> See §3.1 of the analysis doc for the full resolved list.

- [x] **1.1** Fix `createInitialDynamicState()` double-return syntax error in `dynamicState.ts`
- [x] **1.2** Fix duplicate imports in `spawnEngine.ts` (RACE_PROFILES, FEMALE_BODY_TYPES, getHeightTag, PREGNANCY_STAGE_OVERRIDES, circular self-import)
- [x] **1.3** Fix duplicate function definitions in `ageBodyProfile.ts` (clamp, cupSizeToIndex, cupSizeFromIndex, duplicate FemaleMeasurements import)
- [x] **1.4** Add missing `CockType` import to `physicalCore.ts`
- [x] **1.5** Add missing imports to `personalityExpansion.ts` (Race, PublicPersona, PrivateSelf, HiddenDesireLean, PersonaGap, DesireAwareness, TriggerSensitivity, weightedRandom)
- [x] **1.6** Fix `require()` mixed with ES imports — moved `deriveCockTypesFromRace` to `patches.ts`
- [x] **1.7** Fix missing `RACE_PROFILE_EXTENSIONS` reference — now uses `RACE_PROFILES[race]` directly
- [x] **1.8** Fix `generateBackground` signature mismatch (3 args vs 4 args)
- [x] **1.9** Fix `raceProfile` used out of scope in `generateMalePhysicalDetail`
- [x] **1.10** Fix `createEmptyRelationshipActFlags` / `createEmptyActFlagsV2` mismatch — defined locally in `dynamicState.ts`

### Remaining code tasks

- [x] **1.11** Fix `Set<T>` JSON serialization — replaced `Set<Kink>`, `Set<OrgasmType>` with `T[]` in psychologyCore.ts, sexualPhysiology.ts, historyProfile.ts; added `addUniqueKink` / `addUniqueOrgasmType` / `hasKink` / `hasOrgasmType` helpers to historyProfile.ts
- [x] **1.12** Remove dead `greet()` function — `spawn-engine/index.ts` converted to barrel export; `testSpawn.ts` created at root
- [x] **1.13** Add `.gitignore` (node_modules, compiled output, IDE files, save files)

---

## Phase 2: Requirements Doc Fixes

> The PRD has been updated to v1.4. All items below are now resolved in the doc.

- [x] **2.1** Resolve pregnancy duration contradiction — clarified as **12 in-game weeks**; stage-to-week mapping defined
- [x] **2.2** Fill in §2 Repository Structure — proposed structure + Engine Orchestration added
- [x] **2.3** Fix §4.3 Satisfaction score formula — full formula specified including clamp bounds
- [x] **2.4** Inline §4.2 reference to "earlier requirements" — stat progression formula inlined
- [x] **2.5** Remove/merge redundant sections — legacy §6/§7 removed; content merged into §4.7 and §2.2
- [x] **2.6** Fix cooldownHours vs phases mismatch — quests now use `cooldownDays` (in-game days)
- [x] **2.7** Add missing combat formulas — crit, dodge, flee, purification arousal gain all specified
- [x] **2.8** Add AI pattern decision descriptions — Aggressive, Defensive, SupportCaster, BossScripted defined
- [x] **2.9** Add Reputation tier labels and event table
- [x] **2.10** Add fatigue penalty table
- [x] **2.11** Add Economy ItemDef schema and sell price formula
- [x] **2.12** Add Crafting upgrade bonus per tier and failure rates
- [x] **2.13** Add World map encounter chance table and fast travel cost formula
- [x] **2.14** Add Relationship band thresholds
- [x] **2.15** Add Manor tier feature unlock table
- [x] **2.16** Add enemy/monster character definition (§4.2.1) — enemies treated as characters with combat overlay
- [x] **2.17** Add `GameState` root interface sketch and intent→engine routing table (§2.2)
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
- [x] **2.28** Add Frontend Architecture section (§4.21) — tech stack, views, hooks, components, mock-first pattern
- [ ] **2.29** Define full Achievement schema and list of actual in-game achievements (PRD §4.14 still sparse)

---

## Phase 3: Foundation — Unified Character Interface & GameState

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
- [ ] **3c.4** Wire engine dispatcher in `src/engines/dispatcher.ts` to real engines
- [ ] **3c.5** Define event bus / pipeline contract for inter-engine side effects
- [x] **3c.6** All engine stubs verified to import from `src/state/gameState.ts`; combatEngine rewritten to use `AnyCharacter[]`; relationshipEngine updated to read `contact.character`

---

## Phase 4: NPC Population Engine — Fill Gaps

- [ ] **4.1** Create gendered name pools per race (static data file)
- [ ] **4.2** Implement `hasBeenIntroduced` flag and individuation flow
- [ ] **4.3** Implement Contact List cap enforcement (max 400, configurable)
- [ ] **4.4** Implement service NPC fixed roster (vendor, innkeeper, quest board)
- [ ] **4.5** Implement `NpcScheduleDef` and schedule-based location lookup
- [ ] **4.6** Implement 3-day population refresh cycle (tied to Calendar day-end tick)
- [ ] **4.7** Implement per-location population range and NPC class assignment
- [ ] **4.8** Replace flat `genderRatio` with per-class `genderWeight`

---

## Phase 5: Enemy & Monster Spawn Engine

- [ ] **5.1** Define `EnemyCharacter` interface with enemy-specific overlay fields
- [ ] **5.2** Define `MonsterTypeDef` static data (Beast, Undead, Elemental, Demon, Miasma-Corrupted)
- [ ] **5.3** Implement `spawnEnemy(monsterType, regionTier)`
- [ ] **5.4** Implement enemy stat scaling algorithm
- [ ] **5.5** Define `LootTable` schema and loot resolution function
- [ ] **5.6** Define `DefeatOutcome` schema and outcome selection
- [ ] **5.7** Create static boss profile data files
- [ ] **5.8** Define `RegionMonsterProfile`

---

## Phase 6: Intimacy Engine — Scene Layer

- [ ] **6.1** Define `IntimacyPosition` schema
- [ ] **6.2** Define `IntimacyAction` schema
- [ ] **6.3** Create position and action catalog in static data files
- [ ] **6.4** Implement `IntimacyScene` state machine
- [ ] **6.5** Implement `occupiedPenetrationTargets` conflict check
- [ ] **6.6** Implement TEC check
- [ ] **6.7** Implement satisfaction score calculator
- [ ] **6.8** Stub sexual response fragment repository structure
- [ ] **6.9** Wire scene-level orchestration to `resolveEncounterTurn` / `resolvePostEncounter`

---

## Phase 7: Combat Engine

- [ ] **7.1** Define `CombatState`, `CombatTurn`, `CombatAction`, `CombatResult` interfaces using `AnyCharacter[]`
- [ ] **7.2** Implement initiative sort (`AGI + d10`, LCK tiebreak)
- [ ] **7.3** Implement damage formula, crit, and dodge
- [ ] **7.4** Implement AI strategy objects (Aggressive, Defensive, SupportCaster, BossScripted)
- [ ] **7.5** Implement Miasma/Mana Reserve tracking
- [ ] **7.6** Implement purification arousal gain formula
- [ ] **7.7** Implement flee attempt
- [ ] **7.8** Implement companion down logic and party wipe detection (calls partyEngine)
- [ ] **7.9** Implement defeat outcome selection
- [ ] **7.10** Wire combat end to Reputation and Quest engines via event pipeline

---

## Phase 8: Calendar & Time Engine

- [ ] **8.1** Implement phase advance (15 actions → next phase)
- [ ] **8.2** Implement action counter with defined "countable action" list
- [ ] **8.3** Implement direct-advance events (SLEEP, cutscene triggers)
- [ ] **8.4** Implement fatigue tracking and penalty application
- [ ] **8.5** Implement sleep mechanic — calls `applyFullRestoreToParty()` from partyEngine
- [ ] **8.6** Implement passive Stamina/CPW recovery on phase advance — calls `applyPhaseRecoveryToParty()`
- [ ] **8.7** Implement full day-end tick sequence (8 steps, in order per §2.2)

---

## Phase 9: Relationship Engine

- [ ] **9.1** Trust/Love fields already on `NpcCharacter` — wire to relationship event handlers
- [ ] **9.2** Implement 16-cell (Trust x Love) band matrix lookup → `RelationshipStatus`
- [ ] **9.3** Implement daily flirt/touch diminishing returns (counters on `NpcCharacter`; reset via `resetDailySocialCounters`)
- [ ] **9.4** Implement gift mechanic (+10 Trust, +15 Love, consumes item)
- [ ] **9.5** `isMoveInEligible()` implemented; add per-NPC override threshold fields to `NpcCharacter`
- [ ] **9.6** Wire post-intimacy satisfaction score → Trust/Love delta

---

## Phase 10: Remaining Engines

- [ ] **10.1** Reputation Engine — region score, decay (partially implemented in `reputationEngine.ts`), bounty, event triggers
- [ ] **10.2** Quest Engine — QuestDef loader, objective tracker, reward granting, cooldown logic
- [ ] **10.3** Economy & Inventory Engine — ItemDef catalog, buy/sell, gifting, overflow
- [ ] **10.4** Crafting & Equipment Engine — recipe loader, job queue, upgrade resolution
- [ ] **10.5** Dialogue Engine — tree traversal, condition evaluator, flag system
- [ ] **10.6** Skills & Abilities Engine — tree structure, point pools, CPW, prereq check
- [ ] **10.7** Status Effects Engine — tick, stack, expiry
- [ ] **10.8** World Map & Travel Engine — graph, Dijkstra, encounter rolls, fast travel
- [ ] **10.9** Pregnancy & Offspring Engine — week tracker, conception check, birth logic, offspring gen
- [ ] **10.10** Manor & Passive Gen Engine — tier table, construction timer (partially in `manorEngine.ts`), suite assignment, passive gen
- [ ] **10.11** Achievement Engine — schema, condition evaluator, reward granting, achievement list
- [ ] **10.12** Contact & Profile Engine — list assembly, profile view aggregation
- [ ] **10.13** Save/Load Engine — JSON serialization with Set↔Array conversion (replacer/reviver in `saveEngine.ts`), versioning, migration

---

## Phase UI: Frontend (PRD §4.21)

> Mock-first: all views render from mockGameState before any backend is wired.
> Build order: Store → Mock → Components → HUD → Overworld → Combat → Intimacy → Dialogue → Menus → Integration.

### UI-0. Project setup

- [ ] **UI-0.1** Install frontend dependencies: `react`, `react-dom`, `react-router-dom`, `zustand`, `tailwindcss`, `@trpc/client`, `@trpc/react-query`
- [ ] **UI-0.2** Configure Tailwind CSS with dark-fantasy CSS variable palette
- [ ] **UI-0.3** Configure React Router v6 — routes wired in `App.tsx` ✅
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

- [x] **UI-2.1** `src/client/mock/mockGameState.ts` — Day 4 Afternoon, player level 3, 2 companions, 3 contacts, 2 quests
- [x] **UI-2.2** `src/client/mock/mockCombatState.ts` — player + Elara vs wolf + bandit, round 2
- [x] **UI-2.3** `src/client/mock/mockIntimacyScene.ts` — CONSENSUAL scene with Elara, turn 5
- [x] **UI-2.4** `src/client/mock/mockDialogueNode.ts` — 3 choices, one trust-locked, one flag-locked
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

- [x] **UI-4.1–4.4** Player vitals (HP/STA/CPW), party strip, phase indicator, gold — all in `HudShell`
- [x] **UI-4.5** `HudShell` — fixed top bar; wired to `usePlayer`, `useParty`, `useCalendar`; menu button
- [x] **UI-4.6** Renders from mock state; null-safe loading state

### UI-5. Overworld view

- [x] **UI-5.1–5.4** Location, travel list, NPC list with actions, phase/sleep buttons — in `OverworldView`
- [x] **UI-5.5** `OverworldView` — wired to `useGameState`, `useCalendar`, `useIntent`
- [x] **UI-5.6** Renders from mock state; sleep button disabled with reason when conditions not met

### UI-6. Combat view

- [x] **UI-6.1–6.4** Initiative strip, combatant panels, action bar, purification bar — in `CombatView`
- [x] **UI-6.5** `CombatView` — wired to `useCombat`
- [x] **UI-6.6** Renders from `mockCombatState`; player/enemy panels distinguished

### UI-7. Intimacy view

- [x] **UI-7.1–7.4** Partner panel, position picker, action picker, scene status bar — in `IntimacyView`
- [x] **UI-7.5** `IntimacyView` — wired to `useIntimacy`, `useFindContact`
- [x] **UI-7.6** Renders from `mockIntimacyScene`

### UI-8. Dialogue view

- [x] **UI-8.1–8.3** Speaker portrait, dialogue text panel, choice buttons — in `DialogueView`
- [x] **UI-8.4** `DialogueView` — wired to `useDialogue`, `useFindContact`
- [x] **UI-8.5** Renders from `mockDialogueNode`; locked choices shown greyed

### UI-9. Menus overlay

- [x] **UI-9.1** `MenuShell` — tab bar, Escape/backdrop close, routes to all 5 tabs
- [x] **UI-9.2** `InventoryTab` — item grid, quantity badges, equip/use/drop panel, gold display
- [x] **UI-9.3** `SkillsTab` — Battle/Ardor trees with placeholder data, unlock button with prereq check
- [x] **UI-9.4** `QuestsTab` — Active/Available/Completed sub-tabs, objective progress bars
- [x] **UI-9.5** `ContactsTab` — scrollable list, RelationshipMeter, full profile modal on click
- [x] **UI-9.6** `ManorTab` — tier display, construction bar, suite grid, passive resource collect
- [x] **UI-9.7** All tabs wired to `useGameState` / `useContacts`; render from mock state

### UI-10. Integration & live wiring

- [ ] **UI-10.1** Wire `useIntent` to real tRPC router when `VITE_USE_MOCK=false`
- [ ] **UI-10.2** Confirm view transitions (overworld → combat → post-combat → overworld) work without store reset
- [ ] **UI-10.3** Confirm HUD updates on every `GameState` return without re-mounting active view
- [ ] **UI-10.4** Add loading indicator while intent is in-flight
- [ ] **UI-10.5** Add error toast for failed tRPC calls
- [ ] **UI-10.6** Smoke-test all acceptance criteria UI-24–29 from PRD §6

---

## Infrastructure

- [x] **I.1** Add `.gitignore` (node_modules, compiled output, IDE files, save files)
- [x] **I.1b** Rename `Project/` → `spawn-engine/`; update all cross-references in docs and source
- [ ] **I.2** Set up tRPC server scaffold
- [ ] **I.3** Set up React client with Zustand (App.tsx shell done; needs Vite + package.json wiring)
- [ ] **I.4** Configure build pipeline (tsconfig paths, output dirs)
- [ ] **I.5** Add basic unit test harness (Jest or Vitest)
- [ ] **I.6** Write unit tests for spawn engine
