```markdown
# Ojisan in Another World — Implementation Requirements Document (v3.0)

This document supersedes v2.0. It incorporates the unified character state architecture, all engine definitions, schema v6, and the resolution of previously identified gaps. The authoritative schema is `schemas.ts` (v6). This document explains decisions, formulas, and system behavior for all engines.

---

## 1. Platform & Architecture

- **Framework:** Next.js (App Router) + TypeScript
- **API:** tRPC for end-to-end type safety
- **Persistence:** Flat JSON files on disk, Zod-validated
- **State authority:** Server is sole source of truth. Client sends intents, receives new state + rendered narrative.
- **Frontend:** React + TailwindCSS + Zustand (UI-only state)

---

## 2. Repository Structure

```
/apps
  /web
/packages
  /schema         — schemas.ts (v6)
  /game-engine    — pure functions
  /storage        — atomic file read/write, save-slot locking
/data
  /saves
  /content        — TypeScript seed data
```

---

## 3. Content Format

All static content is authored as TypeScript files, importing types from `schemas.ts`. This provides compile-time validation. Save files remain JSON, validated with Zod.

---

## 4. Core Data Architecture

### 4.1 Unified Character State

All actors share a common parent interface:

```ts
interface CharacterActorState {
  id: string;
  displayName: string;
  vitals: CharacterVitals;
  combatAttributes: CombatAttributes;
  eroticAttributes: EroticAttributes;
  statusEffects: StatusEffectInstance[];
}
```

- `CharacterVitals` holds current HP, Arousal, Stamina, optional Crest Power.
- `CombatAttributes` holds permanent STR, AGI, WIS, DEF, LCK.
- `EroticAttributes` holds permanent SEN, TEC, VIR (player only).

Player, companions, NPCs, and enemies extend this base.

### 4.2 Combat Stat Progression

`CombatAttributes` scale with Level using role multipliers. Player uses fixed vector. Formula defined in §4.2 of earlier requirements.

### 4.3 Trust/Love Matrix

Both Trust and Love use four bands: Low, Neutral, High, VeryHigh. 16-cell grid, direct lookup. `SwornNemesis` only via narrative override.

### 4.4 Reputation Scale

Single signed `reputationScore` per region: -800 to +800. Renown/Infamy derived.

### 4.5 TEC Checks

Success chance = clamp(0.4 + TEC/125, 0.1, 0.95). Only for technique-sensitive actions.

### 4.6 Satisfaction Score

```
arousalComponent = 40 × (partnerFinalArousal / 100)
techComponent    = 30 × (tecChecksPassed / max(1, tecChecksAttempted))
kinkBonus        = kinkTriggered ? 15 : 0
sincereBonus     = sincereDialogueUsed ? 15 : 0
satisfaction     = clamp(...)

If sceneEndReason === "STAMINA_EXHAUSTED" && partnerFinalArousal < 100:
  satisfaction = min(satisfaction, 40)
```

---

## 5. Engines

Each engine is a pure module in `packages/game-engine`. The server remains the sole authority for state changes. Clients send intents, and the relevant engine resolves the intent against the current `GameState`.

### 5.1 Combat Engine

**Purpose:** Resolve turn-based combat encounters.

**Schema interactions:**
- `EncounterDef`, `EnemyCombatantDef`, `EnemyAbilityDef`
- `CombatCombatantRuntime`, `CombatEncounterRuntimeState`
- `CharacterVitals`, `CombatAttributes`
- `BossScriptDef` for scripted bosses

**Mechanics:**
- Initiative: `agi + d10`, ties by `lck`
- Turn order computed once per encounter
- Damage formula: base damage = weaponPower × (attackerSTR / 10), mitigated by defenderDEF × 0.5, critical chance based on LCK
- Enemy AI patterns: Aggressive, Defensive, SupportCaster, BossScripted
- Companion downed state; party wipe triggers Last Safe Location recovery
- Purification: enemy `arousal` reaching 100 sets `downed`, `defeatMethod: "PURIFIED"`
- Sexual attacks from enemies follow targeting rules based on `monsterSex` and `isHumanoidForm`
- Miasma Reserve is enemy-only, does not regenerate mid-fight

**Missing details:**
- `BossScriptDef` type added, content pending for specific bosses
- Procedural level scaling for enemies by region (formula exists, function needed)

### 5.2 Intimacy Engine

**Purpose:** Resolve intimate encounter scenes.

**Schema interactions:**
- `IntimateActionDef`, `PositionDef`, `PenetrationTarget`
- `IntimateEncounterRuntimeState`
- `CharacterVitals`, `EroticAttributes`, `CombatAttributes`
- `SexualResponseLineDef`, `KinkDef`, `StatusEffectInstance`
- `ItemUsageRequirement` for item-gated actions

**Mechanics:**
- Scene start reasons: `CONSENSUAL`, `FORCE_INTIMACY`, `FORCE_INTIMACY_SLEEPING`
- Scene ends only via `STAMINA_EXHAUSTED` or `PLAYER_ENDED`
- `activePositionId` and `activeActionId` track current state
- `occupiedPenetrationTargets` prevents simultaneous actions targeting the same cavity (vagina, anus, mouth)
- TEC checks on technique-sensitive actions
- Satisfaction per §4.6
- Kink progression and triggers
- Sexual response selection based on `actionCategory`, `positionId`, `arousalState`, `ledBy`

**Missing details:**
- Selection algorithm for response arrays (dialogue, sfx, internalThought, bodyResponse, expression)
- Full content for `IntimateActionDef` and updated `PositionDef`
- Generic NPC introduction flow in dialogue engine (separate but interacts)

### 5.3 Relationship Engine

**Purpose:** Manage Trust/Love values, relationship status matrix, and move-in eligibility.

**Schema interactions:**
- `TrustLoveState`, `RelationshipStatusId`
- `CompanionRuntimeState`, `WorldNpcInstance`
- `CharacterThoughtDef`

**Mechanics:**
- Trust and Love range -100 to 100
- Relationship status via 4-band matrix (Low, Neutral, High, VeryHigh)
- `narrativeOverride` for scripted states like Sworn Nemesis
- Gift: flat +10 Trust / +15 Love, consumes item
- Flirt/Touch have diminishing returns; daily usage counters on actor (3 per NPC per day)
- Move-in requirements: companions have per-character thresholds; generic NPCs use flat 60/60

**Missing details:**
- None significant after adding daily counters

### 5.4 Reputation Engine

**Purpose:** Manage regional reputation score and decay.

**Schema interactions:**
- `RegionReputationState`
- `DefeatOutcome`, `QuestDef`

**Mechanics:**
- Single signed score per region (-800 to +800)
- Decay at day-end: negative moves toward zero by min(15, abs(score))
- Bounty payoff computed live from score at `BountyOffice`
- Positive Renown does not decay

**Missing details:**
- None

### 5.5 Quest Engine

**Purpose:** Manage quest progression, objectives, and rewards.

**Schema interactions:**
- `QuestDef`, `QuestObjective`, `QuestRuntimeState`
- `QuestObjectiveType`
- `ChapterDef`, `ActDef`
- `QuestTrackingEntry`, `QuestLogView`

**Mechanics:**
- Objectives are structured: Kill, Collect, Talk, Interact, Escort, Travel
- Companion quest completion increments `questStage` by 1
- Main quest uses Act/Chapter spine
- Repeatable quests have cooldowns based on `cooldownHours` and `lastCompletedAtGameDate`

**Missing details:**
- `getQuestLogView` aggregation function (read model) not yet implemented
- UI for quest tracking open

### 5.6 Calendar & Time Engine

**Purpose:** Manage day phases, sleep, fatigue, and day-end processing.

**Schema interactions:**
- `GameCalendarState`, `DayPhase`
- `PlayerCharacterState.daysSinceLastSleep`
- `CompanionRuntimeState.daysSinceLastSleep`
- `ManorState.constructionState`, `PregnancyState`

**Mechanics:**
- Five phases: Morning, Afternoon, Evening, Night, Midnight
- Actions increment `actionsTakenThisPhase`; at 15 or direct-advance events, phase changes
- Midnight end triggers day-end: reputation decay, births, population refresh, date increment
- Sleep only at Night/Midnight in residence/inn; skips to Morning, resets fatigue, restores full HP/Stamina/CPW
- Fatigue system: penalties based on `daysSinceLastSleep`; forced collapse at 5+ days
- Passive regen on non-Sleep phase advance: +20% max stamina/CPW

**Missing details:**
- None

### 5.7 Economy & Inventory Engine

**Purpose:** Manage gold, items, inventory, gifting, and shop transactions.

**Schema interactions:**
- `ItemDef`, `InventorySlotState`, `EquipmentLoadout`
- `ItemTag`
- `PlayerCharacterState.inventory`, `CompanionRuntimeState.inventory`

**Mechanics:**
- Buy/sell using `sellValueGold` and shop discount
- Bag slots max 20 base, expandable via Manor
- Stacking rules based on `stackable` and `maxStack`
- Quest items excluded from bag limit
- Overflow handling for manual pickup (reject) vs combat loot (auto-convert to gold)
- Gifting consumes item and applies flat Trust/Love bonus

**Missing details:**
- None

### 5.8 Crafting & Equipment Upgrade Engine

**Purpose:** Create new items from recipes; upgrade equipment.

**Schema interactions:**
- `CraftingRecipeDef`, `EquipmentUpgradeDef`
- `ItemDef`, `InventorySlotState`
- `ManorState.pendingCraftingJobs`
- `SkillNodeDef` (Artisan's Insight)

**Mechanics:**
- Requires Artisan's Insight skill and Manor tier 2+
- Crafting consumes Raw materials, produces Composite items
- Craft time >0 creates pending job in `ManorState.pendingCraftingJobs`, resolved at day-end
- Equipment upgrades +0 to +3, random (Forge) or guided (Alchemy Lab, tier 4+)
- Upgrades stored in item instance `upgradeBonuses`

**Missing details:**
- None after adding pendingCraftingJobs

### 5.9 NPC Population & Simulation Engine

**Purpose:** Spawn and manage procedural NPCs, service NPCs, and child NPCs.

**Schema interactions:**
- `ProcNpcClassDef`, `WorldNpcInstance`, `ChildNpcInstance`, `ServiceNpcDef`
- `LocationPopulationDef`, `NpcScheduleDef`
- `ProceduralAppearanceRule`, `appearanceSeed`

**Mechanics:**
- Standard interactable NPCs spawned per location population range, refreshed every 3 game-days
- Gender rolled from `genderWeight` on class
- Individuation: first Talk sets `hasBeenIntroduced`, assigns name, adds to Contact List if under cap 200
- Service NPCs are fixed roster, not randomized
- Child NPCs have only `familiarity`
- Schedules per class via `NpcScheduleDef`

**Missing details:**
- `generateAppearance` algorithm not specified
- `spawnWorldNpc` function not fully specified
- Generic NPC introduction content and engine flow still pending

### 5.10 Dialogue Engine

**Purpose:** Traverse dialogue trees, evaluate conditions, and select responses.

**Schema interactions:**
- `DialogueNodeDef`, `DialogueCondition`
- `CharacterDialogueTreeDef`, `GenericNpcDialogueSetDef`
- `WorldNpcInstance.hasBeenIntroduced`

**Mechanics:**
- Conditions: TRUST_AT_LEAST, LOVE_AT_LEAST, QUEST_STAGE_AT_LEAST, STORY_FLAG_SET, STORY_FLAG_UNSET, FIRST_TALK
- Generic NPCs share class-level trees; introduction node used once
- Sets story flags and advances dialogue

**Missing details:**
- Content for introduction nodes
- Engine logic to force introduction on first talk and set `hasBeenIntroduced`

### 5.11 Skill & Ability Engine

**Purpose:** Manage skill trees, point spending, and effect resolution.

**Schema interactions:**
- `SkillNodeDef`, `PlayerSkillState`
- `CombatAttributes`, `EroticAttributes`

**Mechanics:**
- Two trees: Ardor (AP) and Battle (BP)
- Purchase checks prerequisites and point balance
- Active skills use CPW; passives always active
- Effect keys mapped to engine functions

**Missing details:**
- None

### 5.12 Status Effect Engine

**Purpose:** Apply, track, and expire status effects.

**Schema interactions:**
- `StatusEffectInstance`
- `CombatStatusEffectId`, `SexualStatusEffectId`

**Mechanics:**
- Duration ticks down per turn
- Stacking refreshes duration, increments stacks up to max
- Fatigue not stored as status; separate system

**Missing details:**
- None

### 5.13 Achievement Engine

**Purpose:** Evaluate achievement conditions and grant rewards.

**Schema interactions:**
- `AchievementDef`, `AchievementRuntimeState`

**Mechanics:**
- Trigger conditions as string keys, evaluated post-action
- Grants AP/BP and titles

**Missing details:**
- Condition evaluator implementation

### 5.14 World Movement & Pathing Engine

**Purpose:** Handle map traversal, fast travel, and encounter rolls.

**Schema interactions:**
- `LocationDef`, `PathEdgeDef`
- `PlayerCharacterState.currentLocationId`, `lastSafeLocationId`
- `RegionMonsterProfile`

**Mechanics:**
- Shortest path via Dijkstra
- Each travel segment rolls encounter chance based on DayPhase
- Fast travel cost based on region crossings
- Last safe location updates only on `isSafe` locations

**Missing details:**
- None

### 5.15 Pregnancy, Lineage & Offspring Engine

**Purpose:** Track pregnancies, generate offspring.

**Schema interactions:**
- `PregnancyState`, `OffspringNpc`
- `CompanionRuntimeState.pregnancy`

**Mechanics:**
- Gestation 12 in-game days
- Birth at day-end tick for `currentWeek >= 12`
- Offspring stats snapshot from parents' current `CombatAttributes`
- Alignment roll flat 34/33/33 heroic/troubled/criminal

**Missing details:**
- Offspring appearance generation (if they become interactable)
- Integration with NPC spawn mechanism not finalized

### 5.16 Manor & Passive Generation Engine

**Purpose:** Manage Manor tiers, construction, suites, and passive resource generation.

**Schema interactions:**
- `ManorState`, `PassiveGenerationDef`
- `CompanionRuntimeState`, `WorldNpcInstance`

**Mechanics:**
- Construction timer decrements at day-end
- Suites assigned to moved-in occupants
- Passive generation per occupant, capped, collected at Manor

**Missing details:**
- None

### 5.17 Save/Load & Migration Engine

**Purpose:** Persist and restore game state.

**Schema interactions:**
- `GameState` root
- Zod validation

**Mechanics:**
- Atomic JSON writes
- Versioned schema, migration functions
- Autosave nightly separate file

**Missing details:**
- Migration functions not yet written

### 5.18 Purification Engine

**Purpose:** Alternate defeat path through arousal.

**Schema interactions:**
- `CombatCombatantRuntime`
- `EnemyCombatantDef`, `EnemyAbilityDef`
- `ContentToggle.HostileArousalAttacks`

**Mechanics:**
- Enemy arousal raised by player Sex Skills
- Sexual attacks target player/companion based on `monsterSex`
- Miasma Reserve limits enemy sexual attacks
- Purified enemy counts as defeated, grants small Astraea Approval bonus

**Missing details:**
- Numeric balance unplaytested

### 5.19 Contact & Profile Read Model Engine

**Purpose:** Assemble contact list and profile views.

**Schema interactions:**
- `ContactListEntry`, `ContactProfileView`
- `CompanionRuntimeState`, `WorldNpcInstance`, `OffspringNpc`

**Mechanics:**
- Contact List from companions and individuated NPCs
- Profile assembles all fields on demand
- `firstIntimacyCompleted` present on both companions and NPCs

**Missing details:**
- None

### 5.20 Procedural Content Generation Engine

**Purpose:** Generate NPC appearances, names, and enemy scaling.

**Schema interactions:**
- `ProceduralAppearanceRule`, `appearanceSeed`
- `npc_name_pools_seed_data.ts`

**Mechanics:**
- Names rolled from pools
- Gender from weights
- Appearance from rules (algorithm missing)
- Enemy level scaling by region

**Missing details:**
- Appearance generation algorithm open

---

## 6. Save/Load

Versioned JSON files. New Game+ requires explicit confirmation. Autosave nightly separate file.

---

## 7. Calendar System

Five phases. Sleep action as described. Fatigue and recovery as described.

---

## 8. Gaps and Pending Work

| Gap | Status |
|---|---|
| UI/UX screens | Open |
| Quest tracking UI | Logic done, UI open |
| Generic NPC introduction | Schema done, content/engine pending |
| NPC appearance algorithm | Open |
| API error handling | Open |
| Purification balance | Needs playtesting |
| Seed data migration to v6 | Open |
| Content authoring (IntimateActionDef, responses, appearance rules, introductions) | Open |
| Save migration functions | Open |

---

## 9. Acceptance Criteria

Key criteria remain from previous versions, updated for new schema fields:

- Intimate eligibility function rejects Child/Protected.
- Loot vs StripAndLoot different results.
- Quest objectives have specific type/target.
- NPC spawn produces all required fields.
- Contact cap = 200.
- Sleeping NPC non-con gates correctly.
- QuestLogView returns proper data.
- Generic NPC introduction fires once.
- PenetrationTarget conflict prevents simultaneous same-cavity actions.
- Daily flirt/touch counters reset at day-end.

This document reflects the current state of implementation. The authoritative schema is `schemas.ts` (v6).
```