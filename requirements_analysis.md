# Ojisan in Another World — Deep Engine & Requirements Analysis

**Analysis version:** 1.2 (updated 2026-08-30)
**PRD version:** 1.2

## Executive Summary

The [requirements.md](./requirements.md) (v1.2) defines **20 engines** and 7 sections of core architecture. The [spawn-engine/](./spawn-engine/) directory contains **15 TypeScript files** that implement a deep **NPC Procedural Generation + Intimacy Encounter** system. This covers the **NPC Population & Simulation Engine (§4.10)**, the **Procedural Content Generation Engine (§4.20)**, and significant portions of the **Intimacy Engine (§4.3)** and **Pregnancy Engine (§4.16)**.

**Of the 20 engines described in the requirements, only ~3–4 have any actual code. The remaining 16–17 engines exist only as specifications.** Below is a detailed per-engine audit.

> **Code quality note:** The existing code has been substantially patched since the initial audit. Most of the originally reported bugs (§3) have been resolved. Outstanding issues are called out inline.

---

## Table of Contents

1. [Engine Status Matrix](#1-engine-status-matrix)
2. [Per-Engine Deep Analysis](#2-per-engine-deep-analysis)
3. [Cross-Cutting Code Issues](#3-cross-cutting-code-issues)
4. [Engine Orchestration Model](#4-engine-orchestration-model)

---

## 1. Engine Status Matrix

| # | Engine | Status | Has Code? | Key Missing Pieces |
|---|--------|--------|-----------|-------------------|
| 4.1 | Character Progression | ❌ Spec only | No | Leveling, stat formulas, skill point pools |
| 4.2 | Combat | ❌ Spec only | No | Full implementation; initiative, damage, AI, flee |
| 4.2.1 | Enemy/Monster Spawn | ❌ Spec only | No | Enemy character schema, monster type definitions, scaling algorithm |
| 4.3 | Intimacy | 🟡 Partial | Yes (spawn-engine/patches.ts, spawn-engine/dynamicState.ts) | Scene state machine, position/action catalog, TEC check, satisfaction calc |
| 4.4 | Relationship | ❌ Spec only | No | Trust/Love matrix, 16-cell grid, move-in check, diminishing returns |
| 4.5 | Reputation | ❌ Spec only | No | Region scoring, decay, bounty formula, event table |
| 4.6 | Quest | ❌ Spec only | No | QuestDef schema, objective completion, quest log |
| 4.7 | Calendar & Time | ❌ Spec only | No | Phase system, fatigue table, day-end tick sequence |
| 4.8 | Economy & Inventory | ❌ Spec only | No | ItemDef schema, bag slots, sell formula, gifting |
| 4.9 | Crafting & Equipment | ❌ Spec only | No | Recipe schema, upgrade system, failure rates |
| 4.10 | NPC Population & Simulation | ✅ Implemented | Yes (spawn-engine/spawnEngine.ts + supporting files) | Name pools, hasBeenIntroduced, schedule system, 3-day refresh logic |
| 4.11 | Dialogue | ❌ Spec only | No | DialogueNode schema, condition evaluator, flag system |
| 4.12 | Skills & Abilities | ❌ Spec only | No | SkillDef schema, tree structure, CPW consumption |
| 4.13 | Status Effects | ❌ Spec only | No | StatusEffectDef, per-turn tick, stacking |
| 4.14 | Achievements | ❌ Spec only | No | Achievement schema, condition evaluation, reward granting |
| 4.15 | World Map & Travel | ❌ Spec only | No | Graph structure, Dijkstra, encounter table, fast travel |
| 4.16 | Pregnancy & Offspring | 🟡 Partial | Yes (spawn-engine/bodyTypes.ts pregnancy stages) | Gestation tracking, birth logic, conception check, offspring stat gen |
| 4.17 | Manor & Passive Gen | ❌ Spec only | No | Tier table, construction timer, suite assignment, passive gen |
| 4.18 | Save/Load & Migration | ❌ Spec only | No | JSON serialization, Set↔Array conversion, versioning |
| 4.19 | Contact & Profile | ❌ Spec only | No | Contact list assembly, profile view aggregation |
| 4.20 | Procedural Content Gen | ✅ Implemented | Yes (spawn-engine/spawnEngine.ts, raceProfiles.ts, etc.) | Name pools, enemy stat scaling |

---

## 2. Per-Engine Deep Analysis

---

### 4.1 Character Progression Engine

**Status: ❌ Spec only**

**What the PRD says:**
- Combat attributes: STR, AGI, WIS, DEF, LCK
- Erotic attributes: Sensitivity, Technique, Virility (player only)
- Leveling via `newStat = baseStat + (level - 1) × roleMultiplier × baseStat × 0.1`
- Two skill trees: Battle (BP) and Ardor (AP)
- Active skills cost CPW; passive always active

**What's missing:**
- No `PlayerState` interface (HP, Stamina, CPW pools with current/max)
- No level/XP tracking
- No skill tree data structure or point pool
- No class/role definitions with multiplier tables
- No BP/AP award on level-up formula

---

### 4.2 Combat Engine

**Status: ❌ Spec only**

**What the PRD now specifies:**
- Initiative = `AGI + d10`, ties broken by LCK; order fixed for fight
- Damage = `weaponPower × (ATK STR / 10) - DEF × 0.5`, min 1
- Crit chance = `LCK / 200`, multiplier 1.75×
- Dodge = `AGI / 300`, max 33%
- Flee chance = `(playerAGI - avgEnemyAGI) / 100 + 0.3`, clamped 10%–80%
- Purification arousal gain = `skillPower × (TEC / 10) - miasmaRes × 0.3`, min 1
- AI patterns: Aggressive, Defensive, SupportCaster, BossScripted (with HP-threshold phases)
- Miasma/Mana Reserve does not regen mid-fight

**What's missing from code:**
- Everything — no `CombatEncounter`, `CombatTurn`, `EnemyAIPattern`, or any combat resolution logic

**Recommendation:** Define `CombatState`, `CombatAction`, and `CombatResult` interfaces before building resolution logic. The AI decision trees should be strategy objects, not switch statements.

---

### 4.2.1 Enemy & Monster Spawn Engine

**Status: ❌ Spec only — NEW section**

**What the PRD specifies:**
- Enemies and monsters are characters in the same sense as NPCs — they use the same spawn engine schema plus enemy-specific overlay fields: `aiPattern`, `miasmaReserve`/`manaReserve`, `lootTable`, `purificationReward`, `defeatOutcomeOptions`, `isHumanoidForm`, `monsterSex`
- Monster types: Beast, Undead, Elemental, Demon, Miasma-Corrupted
- Humanoid enemies: full NPC spawn profile (via spawnEngine.ts) + combat stat overlay
- Scaling: `enemyBaseStat = monsterTypeBase × regionTierMultiplier` (Tier 1–5: 1.0×, 1.4×, 1.9×, 2.5×, 3.2×)
- Boss enemies: hand-crafted, defined in static data files

**What's missing from code:**
- No `EnemyCharacter` interface extending `Character` with enemy fields
- No `MonsterTypeDef` static data
- No enemy spawn function (wraps spawnEngine + overlays combat stats)
- No `LootTable` or `DefeatOutcome` schema
- No boss profile data files
- The NPC spawn engine (spawnEngine.ts) is reusable as-is for humanoid enemies — this is intentional and correct

**Design note:** The existing spawn engine in `spawn-engine/` correctly serves as the base for humanoid enemy generation. Monster-type enemies (Beast, Undead, etc.) will still use the character schema but may have simplified or fixed physical profiles rather than fully procedural ones. The key addition is the combat stat overlay layer.

---

### 4.3 Intimacy Engine

**Status: 🟡 Partial**

**What actually exists:**
- `spawn-engine/patches.ts`: `resolveEncounterTurn()` and `resolvePostEncounter()` — per-turn physiology/psychology updaters
- Pleasure tracking (Patch 1), wetness sync (Patch 2), vagina type update (Patch 3), wetness baseline (Patch 4), orgasm acquisition (Patch 5), sexual lean shifts (Patch 6), resistance decay (Patch 7), stamina system (Patch 8), subspace (Patch 9), afterglow (Patch 10), kink acquisition (Patch 11)
- `spawn-engine/dynamicState.ts`: `PhysicalState`, `MentalState`, `RelationshipState`, `PregnancyBodyState`

**What's missing:**
- No `IntimacyScene` state machine
- No position catalog (`IntimacyPosition` schema)
- No action catalog (`IntimacyAction` schema with TEC requirement and penetration target declaration)
- No `occupiedPenetrationTargets` tracking
- No TEC check implementation
- No satisfaction score calculation
- No sexual response fragment repository or selection system
- No scene start/end orchestration wrapping the per-turn resolver

**Recommendation:** Create `src/engines/intimacyEngine.ts` with `IntimacyScene` state machine; position and action catalogs live in `src/data/` static data files.

---

### 4.4 Relationship Engine

**Status: ❌ Spec only**

**What the PRD specifies:**
- Trust and Love each -100 to +100
- Band thresholds: Low (-100 to -25), Neutral (-25 to 25), High (25 to 75), VeryHigh (75 to 100)
- 16-cell (Trust × Love) matrix → `RelationshipStatus` label + available interactions
- Gift: +10 Trust / +15 Love; Flirt/Touch: diminishing returns, max 3/day
- Move-in: Trust ≥ 60 AND Love ≥ 60 (or per-character override)

**What exists:** Bond type resolution in `spawn-engine/dynamicState.ts` tracks encounter-based bonds — this is the *intimacy bond system*, not the Trust/Love relationship matrix. They are separate systems.

**What's missing from code:**
- No Trust/Love numeric fields per NPC
- No 16-cell matrix lookup
- No diminishing returns counter
- No move-in eligibility check
- No gifting mechanic

---

### 4.5 Reputation Engine

**Status: ❌ Spec only**

**PRD now specifies:** Tier labels, decay formula (5 pts/day on negatives), bounty formula (`abs(score) × 2 gold`), sample event table.

**What's missing from code:** Everything.

---

### 4.6 Quest Engine

**Status: ❌ Spec only**

**PRD now specifies:** `QuestDef`, `ObjectiveDef`, `QuestReward` schemas; cooldowns in in-game days (resolves the previous hours/phases mismatch).

**What's missing from code:** Everything.

---

### 4.7 Calendar & Time Engine

**Status: ❌ Spec only**

**PRD now specifies:** Which player actions count toward phase advance; direct-advance events; full fatigue penalty table; day-end tick sequence (in §2.2).

**What's missing from code:** Everything.

---

### 4.8 Economy & Inventory Engine

**Status: ❌ Spec only**

**PRD now specifies:** `ItemDef` schema, sell price formula, inventory slot expansion via Manor tiers.

**What's missing from code:** Everything.

---

### 4.9 Crafting & Equipment Upgrade Engine

**Status: ❌ Spec only**

**PRD now specifies:** Upgrade stat bonus per tier (+1 per tier to all item stats), failure rates by upgrade level and method (Forge vs Alchemy Lab), no item destruction on failure.

**What's missing from code:** Everything.

---

### 4.10 NPC Population & Simulation Engine

**Status: ✅ Implemented (core generation)**

**What exists:** Full character generation pipeline in `spawn-engine/spawnEngine.ts` + supporting files. Race-aware weighted random selection, age-body profile system, pregnancy stage overlays, attractiveness bias, population configs (STANDARD, FANTASY_HEAVY), batch spawn function.

**What's missing:**
- No NPC name generation (name pools undefined)
- No `hasBeenIntroduced` flag or individuation flow
- No Contact List cap enforcement
- No service NPC fixed roster
- No `NpcScheduleDef` or schedule system
- No 3-day population refresh cycle logic
- No location assignment or per-location population range
- `genderRatio` is a flat parameter; PRD requires per-class `genderWeight`

---

### 4.11 Dialogue Engine

**Status: ❌ Spec only**

**PRD now specifies:** Full `DialogueNode`, `DialogueChoice`, `DialogueCondition` schemas with 6 condition types.

**What's missing from code:** Everything.

---

### 4.12 Skills & Abilities Engine

**Status: ❌ Spec only**

**PRD now specifies:** `SkillDef` schema with tree, point cost, prerequisites, CPW cost, and typed `SkillEffect` union.

**What's missing from code:** Everything.

---

### 4.13 Status Effects Engine

**Status: ❌ Spec only**

**PRD now specifies:** `StatusEffectDef` and `ActiveStatusEffect` schemas.

**What's missing from code:** Everything.

---

### 4.14 Achievements Engine

**Status: ❌ Spec only — PRD is sparse**

**What's missing from PRD:** Achievement definition schema, condition types, full list of achievements.

**What's missing from code:** Everything.

---

### 4.15 World Map & Travel Engine

**Status: ❌ Spec only**

**PRD now specifies:** Encounter chance by phase (Morning 10% → Midnight 50%), fast travel cost (5 gold × region crossings), `WorldNode` schema with `isSafe` and `monsterProfileId`.

**What's missing from code:** Everything — graph structure, Dijkstra, encounter rolls, fast travel, `RegionMonsterProfile`.

---

### 4.16 Pregnancy & Offspring Engine

**Status: 🟡 Partial**

**PRD now specifies (resolving prior contradiction):** Gestation = **12 in-game weeks**; stage-to-week mapping defined; conception check formula (`fertilityRating / 100`); offspring stat averaging with ±10% variance; alignment roll (34/33/33).

**What exists:** `PREGNANCY_STAGE_OVERRIDES` in `spawn-engine/bodyTypes.ts` with body modification data per trimester; `applyAgeAndPregnancyInOrder` in `spawn-engine/ageBodyProfile.ts`.

**What's missing:**
- No `pregnancyWeek` increment at day-end
- No birth trigger logic
- No conception check function
- No offspring stat generation
- No alignment roll
- `cycleDay` and `fertile` flags exist in code but nothing consumes them

---

### 4.17 Manor & Passive Generation Engine

**Status: ❌ Spec only**

**PRD now specifies:** Full 6-tier feature unlock table.

**What's missing from code:** Everything.

---

### 4.18 Save/Load & Migration Engine

**Status: ❌ Spec only**

**Key technical issue (still unresolved in code):** `Set<T>` is used in `SexualPsychology.acquiredKinks`, `OrgasmProfile.acquiredTypes`, `SexualActFlags.orgasmTypesExperienced`, `SexualActFlags.kinksExperienced`. `JSON.stringify` silently serializes these as `{}`. Custom JSON replacer/reviver required before save/load can function.

---

### 4.19 Contact & Profile Engine

**Status: ❌ Spec only**

**What's missing from code:** Everything.

---

### 4.20 Procedural Content Generation Engine

**Status: ✅ Implemented (NPC appearance)**

**PRD now specifies:** Enemy stat scaling algorithm (`enemyBaseStat = monsterTypeBase × regionTierMultiplier` with tier 1–5 multipliers).

**What's missing:**
- NPC name pools (per race, gendered)
- Enemy stat scaling implementation
- `MonsterTypeDef` static base stats

---

## 3. Cross-Cutting Code Issues

### 3.1 RESOLVED — Previously reported bugs

The following bugs from the initial analysis have been fixed in the current codebase:

| Bug | File | Status |
|-----|------|--------|
| Double `return {}` syntax error in `createInitialDynamicState` | spawn-engine/dynamicState.ts | ✅ Fixed |
| Duplicate imports (RACE_PROFILES, FEMALE_BODY_TYPES, etc.) | spawn-engine/spawnEngine.ts | ✅ Fixed |
| Circular self-import in spawnEngine | spawn-engine/spawnEngine.ts | ✅ Fixed |
| Duplicate `clamp`, `cupSizeToIndex`, `cupSizeFromIndex` functions | spawn-engine/ageBodyProfile.ts | ✅ Fixed |
| Missing `CockType` import | spawn-engine/physicalCore.ts | ✅ Fixed |
| Missing imports in personalityExpansion.ts | spawn-engine/personalityExpansion.ts | ✅ Fixed |
| `require()` mixed with ES imports (`deriveCockTypesFromTexture`) | spawn-engine/spawnEngine.ts → spawn-engine/patches.ts | ✅ Fixed — moved to patches.ts as `deriveCockTypesFromRace` |
| Missing `RACE_PROFILE_EXTENSIONS` reference | spawn-engine/spawnEngine.ts | ✅ Fixed — uses `RACE_PROFILES[race]` directly |
| `generateBackground` signature mismatch (3 vs 4 args) | spawn-engine/spawnEngine.ts | ✅ Fixed |
| `raceProfile` out of scope in `generateMalePhysicalDetail` | spawn-engine/spawnEngine.ts | ✅ Fixed — `raceProfile` now passed as parameter |
| `createEmptyRelationshipActFlags` vs `createEmptyActFlagsV2` | spawn-engine/dynamicState.ts | ✅ Fixed — `createEmptyRelationshipActFlags` defined locally |

### 3.2 OUTSTANDING — Set<T> JSON Serialization

`Set<T>` is used in multiple interfaces and is **not JSON-serializable**. `JSON.stringify` silently emits `{}` for any Set. This will cause silent data loss when save/load is implemented.

Affected fields:
- `spawn-engine/psychologyCore.ts` → `SexualPsychology.acquiredKinks: Set<Kink>`
- `spawn-engine/sexualPhysiology.ts` → `OrgasmProfile.acquiredTypes: Set<OrgasmType>`
- `spawn-engine/historyProfile.ts` → `SexualActFlags.orgasmTypesExperienced: Set<OrgasmType>`
- `spawn-engine/historyProfile.ts` → `SexualActFlags.kinksExperienced: Set<Kink>`

**Fix options:**
1. Replace all `Set<T>` with `T[]` everywhere (simplest, loses Set uniqueness guarantee)
2. Add a custom JSON replacer/reviver that converts `Set → Array` on stringify and `Array → Set` on parse
3. Use a serialization library (e.g., `superjson`) that handles Sets natively

### 3.3 RESOLVED — `spawn-engine/index.ts` converted to barrel export

The original `Project/index.ts` dead test runner (with `greet()`) has been replaced with a proper barrel export that re-exports the full spawn engine public API. The test runner moved to `testSpawn.ts` at the repo root.

---

## 4. Engine Orchestration Model

The PRD (§2.2) now defines:
- The `GameState` root interface sketch
- The intent → engine routing table
- The day-end tick sequence

The following remains undefined and should be addressed before parallel engine development begins:

1. **No event bus** — How does one engine signal another? (e.g., combat end → reputation update → quest objective check). Options: direct function calls with explicit pipeline, or an event queue processed at end of each intent.
2. **No engine execution order spec** — When multiple engines chain (movement → encounter → combat), the pipeline must be unambiguous.
3. **No `GameState` full interface** — The PRD sketch is illustrative; a complete TypeScript interface needs to be defined before individual engines can be type-checked against it.

**Recommended next step:** Define the full `GameState` interface in `src/state/gameState.ts` (already created) as the first task before building any engine. All engines take `GameState` as input and return `GameState` as output (pure functions where possible).

```mermaid
graph TD
    CLIENT["Client (React)"] -->|"Intent"| SERVER["tRPC Server"]
    SERVER --> DISPATCHER["Engine Dispatcher"]

    DISPATCHER --> COMBAT["Combat Engine"]
    DISPATCHER --> INTIMACY["Intimacy Engine"]
    DISPATCHER --> DIALOGUE["Dialogue Engine"]
    DISPATCHER --> MOVEMENT["World/Pathing Engine"]
    DISPATCHER --> ECONOMY["Economy Engine"]
    DISPATCHER --> QUEST["Quest Engine"]

    COMBAT -->|"on defeat"| REPUTATION["Reputation Engine"]
    COMBAT -->|"on purification"| PURIFICATION["Purification (sub of Combat)"]
    INTIMACY -->|"on scene end"| RELATIONSHIP["Relationship Engine"]
    INTIMACY -->|"on conception"| PREGNANCY["Pregnancy Engine"]
    MOVEMENT -->|"on encounter roll"| COMBAT
    MOVEMENT -->|"on node enter"| NPC_POP["NPC Population Engine"]

    CALENDAR["Calendar Engine (day-end tick)"] -->|"tick"| REPUTATION
    CALENDAR -->|"tick"| PREGNANCY
    CALENDAR -->|"tick"| MANOR["Manor Engine"]
    CALENDAR -->|"tick"| NPC_POP
    CALENDAR -->|"tick"| STATUS["Status Effect Engine"]

    SAVE["Save/Load Engine"] -.->|"serialize/deserialize"| GAME_STATE["GameState"]
    GAME_STATE -.->|"read by all"| DISPATCHER
```
