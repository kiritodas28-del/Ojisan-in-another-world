# Ojisan in Another World — Implementation Requirements Document (v1.1)

Companion file: `schemas.ts` (authoritative TypeScript types referenced throughout).

Formulas and thresholds marked **[PROPOSED]** were invented to unblock implementation where the original GDD gave no numeric spec — these are reasonable defaults, not extracted from the design doc, and are worth a quick designer sign-off pass before content-locking.

---

## 1. Platform & Architecture

- **Full-stack framework:** Next.js (App Router) + TypeScript. One deployable app instead of a separately-versioned client/server pair.
- **API layer:** tRPC — end-to-end type safety between the Next.js frontend and backend without a hand-maintained REST contract.
- **Persistence:** Flat JSON files on disk, no database (see §6 for the full file-based save spec).
- **State authority:** the server is the sole source of truth for `GameState`. The client sends an intent (`{ action: "TALK", targetId: "mira" }`) and receives back the new state plus a rendered narrative string — Trust/Love, damage, and Arousal are never computed client-side.
- **Frontend:** React + TypeScript via Next.js, TailwindCSS for styling, Zustand for ephemeral UI-only state (never game state).
- **Auth:** out of scope for v1 — assume a single local save, no accounts.

### Non-Goals (explicit)
- No multiplayer or shared world state.
- No native mobile build in v1.
- No real-money transactions or storefront integration in v1.
- No localization in v1 (string externalization is still worth doing early even if translation is deferred).

---

## 2. Repository Structure

```
/apps
  /web            — Next.js app (routes, components, tRPC client)
/packages
  /schema         — schemas.ts and Zod validators derived from it
  /game-engine    — pure functions: combat resolution, intimacy engine,
                    reputation math, leveling, quest evaluation — framework-agnostic,
                    fully unit-testable without spinning up Next.js
  /storage        — file read/write, atomic-write helper, save-slot locking (§6)
/data
  /saves          — {saveSlotId}.json save files, gitignored
  /content        — static seed data, version-controlled (§2.1 below)
```

### 2.1 Content Format — TypeScript, Not JSON **[reconciled, this audit]**

The original listing above (`companions.json, quests.json, items.json, positions.json, skills.json, achievements.json, encounters.json`) was JSON-flavored, but every seed data file actually delivered across this project has been TypeScript — `items_seed_data.ts`, `enemies_seed_data.ts`, `kinks_seed_data.ts`, `world_map_seed_data.ts`, and their `_part2` companions. That wasn't a drift to paper over; it's the better fit for this stack, and this section now reflects it as the actual decision:

- Every seed file `import`s its types directly from `schemas.ts` (`ItemDef`, `EnemyCombatantDef`, `KinkDef`, `LocationDef`, etc.) — a typo'd field name or wrong enum value is a compile error, not a runtime surprise discovered only when a player reaches that content.
- No separate JSON-schema/Zod-validation layer is needed for *static* content the way it genuinely is for save files (§6) — save files come from disk at runtime and must be validated defensively; seed data is authored, reviewed, and compiled the same way the game engine itself is.
- Data is still plain-old exported arrays/objects (`export const WEAPONS: ItemDef[] = [...]`), not classes or logic — it's "data that happens to be checked by the compiler," not code with behavior. `/packages/game-engine` still reads these exports the same way it would read parsed JSON.

`/data/content` therefore holds `.ts` files, not `.json`. Save files (`/data/saves`) are unaffected — those remain JSON per §6, since they're runtime-generated player data, not authored content.

### 2.2 Actual Content File List **[reconciled, updated this pass]**

Split honestly between what's been authored as real, delivered seed data, and what's still specified in `schemas.ts` but not yet written as actual content — the old list conflated "the schema exists" with "the data exists" in a few places, and this one doesn't. This pass closed most of the second table from the previous audit — see the note at the bottom for exactly what's genuinely still open.

**Delivered, real content files:**

| File | Exports | Covers |
|---|---|---|
| `items_seed_data.ts` | `RAW_MATERIALS`, `COMPOSITE_ITEMS`, `WEAPONS`, `ARMOR`, `CLOTHING`, `CRAFTING_RECIPES`, `EQUIPMENT_UPGRADES` | `ItemDef`, `CraftingRecipeDef`, `EquipmentUpgradeDef` |
| `items_seed_data_part2.ts` | `COMPANION_ACCESSORIES`, `PROCEDURAL_NPC_EQUIPMENT`, `ACHIEVEMENT_TROPHIES`, `QUEST_MATERIALS` | more `ItemDef` |
| `enemies_seed_data.ts` | 11 named `EnemyCombatantDef` consts + `NEW_ENEMY_ABILITIES`, `NEW_ENEMIES`, `LOOT_TABLES` | `EnemyCombatantDef`, `EnemyAbilityDef`, `LootTableDef` |
| `enemies_seed_data_part2.ts` | 18 named `EnemyCombatantDef` consts + `PART2_ENEMY_ABILITIES`, `PART2_ENEMIES`, `PART2_LOOT_TABLES` | more of the same |
| `kinks_seed_data.ts` | `KINKS` | `KinkDef` (§26) |
| `world_map_seed_data.ts` | `LOCATIONS`, `PATH_EDGES`, `REGION_MONSTER_PROFILES` | `LocationDef`, `PathEdgeDef` (§18), `RegionMonsterProfile` (§5.11) |
| `companions_seed_data.ts` | `ISOLDE` through `LYRA`, `ALL_COMPANIONS` | `CompanionDef` for the 9 companions beyond Mira (whose canonical entry stays in §9) — all 10 now carry an `appearance: AppearanceDef` block (Mira's added directly to §9's worked example). **Corrected against the actual source character bible this pass** — the previous "fix" above (still shown for the record) turned out to be wrong: it made Sylvara internally consistent with her *own* `build` text, but that `build` text itself contradicted the source, which is explicit that she's "lush, voluptuous," not willowy. Checking all 9 against the real source surfaced the same error in five more places, all self-inflicted in earlier passes that had no source to check against: Isolde (built "petite"/"athletic" when the source calls her explicitly pear-shaped, with "dramatically wide, heavy hips" and an "enormous... rear"), Grael ("densely muscled"/firm when the source explicitly says "no hard-muscled buttocks or rigid chest — pure, yielding softness"), Reva ("petite"/"athletic" against "very full, heavy... wonderfully soft" and "generously rounded, plush"), Seira and Tasha (both pushed toward "firm, toned" in the earlier self-consistency pass when the source calls both of them explicitly soft — "exceptionally soft" for Seira, "generous, round, soft" for Tasha). Valka, Sera, and Lyra needed smaller corrections (a softness word, a cup size, Lyra's height dropped from 172cm to the source's 163cm since "statuesque" directly contradicted her "petite... delicate frame"). All 9 now match the source on build, height, breast size/shape/softness, and ass size/shape/softness. |
| `positions_seed_data.ts` **[new]** | `POSITIONS` | The full 16-entry `PositionDef` intimacy matrix |
| `skills_seed_data.ts` **[new]** | `SEX_SKILL_TREE` (25 nodes), `COMBAT_SKILL_TREE` (23 nodes) | `SkillNodeDef` — §22.1/§22.2's effect tables transcribed with tier/cost/prerequisite gating added |
| `achievements_seed_data.ts` **[new]** | `ACHIEVEMENTS` (31 entries) | `AchievementDef` |
| `world_population_seed_data.ts` | `SERVICE_NPCS`, `COMPANION_SCHEDULES`, `NPC_SCHEDULES` (22 entries, real per-region variants — `NpcScheduleDef` gained a `region` field this pass), `LOCATION_POPULATIONS` | `ServiceNpcDef`, `CompanionScheduleDef` (9 remaining companions), `NpcScheduleDef` (all 10 procedural classes × every region each plausibly populates), `LocationPopulationDef` |
| `mountain_monastery_enemies_seed_data.ts` **[new]** | 8 named `EnemyCombatantDef` consts + `MOUNTAIN_MONASTERY_ENEMY_ABILITIES`, `MOUNTAIN_MONASTERY_ENEMIES`, `MOUNTAIN_MONASTERY_LOOT_TABLES` | The region's full bestiary, mini-boss, and confirmed Catacombs of Ash final boss — closes the density-guideline gap the RegionMonsterProfile note had flagged as open |
| `encounters_seed_data.ts` **[new]** | `ENCOUNTERS` (31 entries) | `EncounterDef` — a real per-region roster, not illustrative examples |
| `acts_seed_data.ts` **[new]** | `act2`–`act7`, `ALL_CHAPTERS` (28 chapters) | `ActDef`/`ChapterDef` for Acts 2–7 (Act 1 stays in §24) |
| `quests_seed_data.ts` **[new]** | `COMBAT_QUESTS`, `COLLECTION_QUESTS`, `ESCORT_QUESTS` (30 total) | `QuestDef` — the full repeatable-quest roster |
| `sexual_response_seed_data.ts` | `MAIN_SIDE_COMMON` (275 lines, 5 variants × 55 contexts), `NPC_COMMON` (84 lines, 4 variants × 21 contexts) | `SexualResponseLineDef` — full actionCategory×arousalStateMin matrix audited and gap-filled in both pools; added `ACT_ORAL_CREAMPIE`/`ACT_ANAL_CREAMPIE`/`ACT_EXTERNAL_CLIMAX` as the missing "finish inside" (oral/anal) and "finish outside" categories; every one of the 359 lines now carries a `vocalization` field (172 unique onomatopoeia/sound-effect strings, zero repeats within any single trigger-context group, category-aware texture — wet sounds for oral, a smack for spanking, suckling for lactation) |
| `dialogue_mira_seed_data.ts` **[new]** | `MIRA_DIALOGUE_NODES` (75 nodes), `MIRA_DIALOGUE_TREE` | `CharacterDialogueTreeDef`/`DialogueNodeDef` — the flagship, full-depth tree: 15 root topics across 7 stages, real branching (multi-layer follow-ups on the pivotal stages), Trust/Love/questStage/story-flag gating. Establishes the speakerId convention (NPC vs. `"kenji"`) the other 9 companions' trees follow. |
| `dialogue_companions_seed_data.ts` | 9 companions' `*_DIALOGUE_NODES`/`*_DIALOGUE_TREE`, `ALL_OTHER_COMPANIONS_DIALOGUE_NODES`/`_TREES` | The base layer of the other 9 companions' dialogue — originally one root topic per stage (201 nodes), since paired with `dialogue_companions_expansion_seed_data.ts` (below) to reach 2 roots per stage / 390 nodes total across both files, genuine parity with Mira's baseline depth. This file's own `rootNodeIds` arrays were updated to include both layers' topic IDs — each companion's voice matched to her established personality (Isolde precise and reserved, Grael gruff-but-gentle, Valka proud-softening, Reva guarded, Tasha playful, Sera penitent, Lyra empathic, etc.) |
| `dialogue_generic_npc_seed_data.ts` **[new]** | `GENERIC_NPC_DIALOGUE_NODES` (60 nodes), `GENERIC_NPC_DIALOGUE_SETS` | `GenericNpcDialogueSetDef` — all 10 procedural classes, Trust-gated rather than questStage-gated since generic NPCs have no per-instance quest chain |
| `dialogue_companions_expansion_seed_data.ts` **[new]** | 9 companions' `*_DIALOGUE_NODES_EXPANSION`, `ALL_COMPANION_DIALOGUE_EXPANSION_NODES` (189 nodes) | Second root topic per stage per companion, bringing all 9 to genuine 14-root parity with Mira's baseline depth (was 1 root/stage, 201 total nodes; now 2 roots/stage, 390 total nodes across the two companion files) |
| `dialogue_astraea_seed_data.ts` **[new]** | `ASTRAEA_DIALOGUE_NODES` (39 nodes), `ASTRAEA_DIALOGUE_TREE` | The dialogue tree for Astraea herself — `schemas.ts`'s own comment names her as the example non-companion story NPC needing one, and none existed until this pass. Gated on Act-completion `STORY_FLAG_SET` (dream visions at Acts 1-5, physical descent at Act 6, finale at Act 7) rather than questStage, since she has no `CompanionDef`. |
| `npc_name_pools_seed_data.ts` **[new]** | `MALE_NPC_NAMES`, `FEMALE_NPC_NAMES` (40 each) | The auto-naming source for §19.4's individuation rule — a generic NPC's `displayName` is rolled from whichever pool matches her already-rolled `WorldNpcInstance.gender` the moment her first `Talk` resolves |
| `astraea_seed_data.ts` **[new]** | `ASTRAEA` | `NamedStoryCharacterDef` **[NEW schema]** — Astraea's actual character/appearance data, closing the gap where she'd had a full 39-node dialogue tree but no appearance data behind it at all; not a `CompanionDef` since she has no combat role or move-in eligibility. `bodyDetails` corrected against the source character bible to match its "colossal, deeply curved hips" and "massive... rear" framing — the cosmic-fertility-archetype language was more extreme than the original D-cup/"full" draft reflected. |
| `companion_quest_chains_seed_data.ts` **[new]** | 10 companions' `*_QUEST_CHAIN`, `ALL_COMPANION_QUEST_CHAINS` (69 quests) | The `QuestDef`s that actually drive `questStage` advancement — closes the structural gap where every dialogue tree's `QUEST_STAGE_AT_LEAST` condition had nothing behind it. Each stage's quest is gated on the previous stage's dialogue `setsStoryFlag`, forming a closed loop (see §5.6's new rule). |
| `player_character_seed_data.ts` **[new]** | `KENJI` | `PlayerCharacterDef` **[NEW schema]** — Kenji's static appearance/name data, the counterpart `PlayerCharacterState` (runtime save data) never had |
| `proc_npc_classes_seed_data.ts` **[new]** | `PROC_NPC_CLASSES` (10 entries) | `ProcNpcClassDef` **[NEW schema]** — the actual data objects behind every `procNpcClassId`/`templateClassId` string referenced elsewhere (`world_population_seed_data.ts`, `dialogue_generic_npc_seed_data.ts`, `WorldNpcInstance`); none of those references ever pointed at a real object before this pass |

Every content type from the original backlog table is now real, delivered data — nothing remains open on this list.

---

## 3. Content Data — Scope of This Pass

This document fully specifies schemas and formulas for all content types. It does not include hand-authored seed data for all 10 companions' full dialogue trees, all repeatable quests, or full procedural NPC/encounter tables — that's a mechanical content pass better run as its own follow-up against the schemas below. §9 provides one fully worked example per content type so the shape is unambiguous.

---

## 4. Formulas — Resolving the Gaps

### 4.1 Merged Reputation Scale **[PROPOSED, revised]**

Renown and Infamy are now a single signed value per region, `reputationScore`, ranging **-800 to +800**. Positive values read as Renown; negative values read as Infamy. Both original 0–5 level displays derive from the same number:

| Score Range | Renown Level | Infamy Level |
|---|---|---|
| 800 | 5 | 0 |
| 500 – 799 | 4 | 0 |
| 300 – 499 | 3 | 0 |
| 150 – 299 | 2 | 0 |
| 50 – 149 | 1 | 0 |
| -49 – 49 | 0 | 0 |
| -149 – -50 | 0 | 1 |
| -299 – -150 | 0 | 2 |
| -499 – -300 | 0 | 3 |
| -799 – -500 | 0 | 4 |
| -800 | 0 | 5 |

`QuestDef.rewardReputationDelta` is a single signed number applied directly to this score (positive quests push toward Renown, criminal/violent options push toward Infamy) — no separate Renown/Infamy fields to keep in sync.

### 4.2 Companion & Player Stat Progression — Level-Based, Not Stage-Based **[PROPOSED, revised]**

Combat stats now scale with **Level**, never with a companion's narrative quest Stage (Stage 1–7 is romance/story progress only — see `questStage` vs. `levelProgression` in `schemas.ts`). A companion at Stage 1 and Level 20 has identical combat stats to the same companion at Stage 7 and Level 20.

**Growth formula:**
```
statAtLevel(stat, level) = baseCombatStatsAtLevel1[stat] + growthPerLevel[stat] × (level − 1)
growthPerLevel[stat] = BASE_GROWTH_PER_LEVEL[stat] × ROLE_MULTIPLIER[combatRole][stat]
```

`BASE_GROWTH_PER_LEVEL` **[PROPOSED]**: `{ hp: 6, str: 0.8, agi: 0.6, wis: 0.8, def: 0.6, lck: 0.5 }`

`ROLE_MULTIPLIER` **[PROPOSED]** (applies to companions only; the player uses a fixed vector instead, see below):

| Role | hp | str | agi | wis | def | lck |
|---|---|---|---|---|---|---|
| Vanguard | 1.5 | 1.2 | 0.8 | 0.7 | 1.4 | 0.9 |
| Support | 0.9 | 0.7 | 0.8 | 1.6 | 0.9 | 1.0 |
| Artillery | 0.9 | 1.2 | 0.9 | 1.3 | 0.7 | 1.0 |
| Rogue | 1.0 | 1.0 | 1.5 | 0.7 | 0.8 | 1.3 |

Player growth vector **[PROPOSED]**, fixed (no role): `{ hp: 8, str: 1.0, agi: 0.6, wis: 1.0, def: 0.7, lck: 0.6 }`, applied from Kenji's stated base stats (§2 of the GDD: HP 130, STR 14, AGI 10, WIS 16, DEF 13, LCK 24) as the Level 1 anchor.

**XP & leveling [PROPOSED]:** `xpToNextLevel(level) = 100 × level`. Level cap: 60. XP is awarded per `QuestDef.rewardXp` / `EncounterDef.rewardXp` — a separate currency from Ardor Points (AP) and Battle Points (BP), which continue to be spent only on skill-tree nodes and never affect base stats.

**Note on the original doc's Stage 7 stat values:** these are treated as flavor/tuning reference points (e.g. "Mira should feel roughly this powerful once fully leveled") when setting `baseCombatStatsAtLevel1` and validating the growth curve, not as binding stage-gated numbers.

### 4.3 Trust/Love Matrix — Simplified Complete Grid **[PROPOSED, revised]**

Both Trust and Love now use the **same four bands** (this already matched how Trust was banded in the original doc — the fix is applying it symmetrically to Love too):

```
band(x) = x >= 80 ? "VeryHigh" : x >= 40 ? "High" : x >= 0 ? "Neutral" : "Low"  // Low = -100..-1
```

This produces a complete 4×4 = 16-cell grid with **zero gaps and no distance calculation needed** — every possible (trust, love) pair resolves via two direct range checks:

| Trust \ Love | Low | Neutral | High | VeryHigh |
|---|---|---|---|---|
| **Low** | Active Hostility | Cool / Skeptical | Guarded Attraction | Obsessive Longing |
| **Neutral** | Mutual Friction | Neutral Stranger | Growing Attraction | Complicated Passion |
| **High** | Bitter Resentment | Friendly Acquaintance | Bonded Comrade | Passionate Love |
| **VeryHigh** | Unrequited Loyalty | Cherished Confidante | Trusted Companion | Devoted Partner |

`Unrequited Loyalty` (VeryHigh Trust, Low Love) is the one genuinely new label — the original matrix never addressed this corner (deep trust coexisting with active romantic rejection).

**Sworn Nemesis is no longer part of the grid.** It's demoted to a **scripted narrative override** (`TrustLoveState.narrativeOverride`) set only by a specific story/quest event (e.g. an assassination-attempt beat), not something that emerges from ordinary Trust/Love drift. This is both simpler (the grid stays exhaustive by construction) and more narratively correct — "will actively plot Kenji's assassination" is a plot-triggered state, not a passive accumulation of dislike.

### 4.4 Combat Damage & Critical Hits

Unchanged from v1.0:
```
baseDamage = weaponPower × (attackerSTR / 10)
mitigated  = max(1, baseDamage − defenderDEF × 0.5)
critChance = clamp(0.05 + attackerLCK × 0.0075, 0.05, 0.75)
isCrit     = roll() < critChance
finalDamage = mitigated × (isCrit ? 2.0 : 1.0) × activeSkillMultipliers
```

### 4.5 Offspring Stat Generation — Updated for Level-Based Parents

```
offspringStat = round((motherCurrentStat + kenjiCurrentStat) / 2) + 5 (Crest bonus) + randInt(-3, 3)
```

`motherCurrentStat` and `kenjiCurrentStat` are each parent's **current level-derived** combat stats at time of birth (§4.2), not a fixed "Stage 7" reference — since stats are no longer stage-bound, this is generated as a one-time snapshot (`OffspringNpc.combatStats`) rather than something that keeps leveling on its own.

### 4.6 Offspring Alignment Roll — Simplified to Flat Random **[PROPOSED, revised]**

No longer depends on regional Infamy tier (or any other external state) — it's a flat, independent weighted roll:

```
heroicChance   = 0.34
troubledChance = 0.33
criminalChance = 0.33
```

Still seeded deterministically from `rngSeed + offspringId` for save-replay determinism, but the weights themselves are fixed and don't read from any other part of `GameState`.

### 4.7 TEC Checks — Now Defined **[PROPOSED, new]**

A **TEC check** is attempted once per turn in which the player selects a technique-sensitive action — any `PositionDef` with `isTechniqueSensitive: true` (the Penetrative Vaginal/Anal categories, and any position with a `requiresTrustAtLeast` or `requiresPlayerStat` gate, e.g. Seated Deepthroat). Non-technique actions (basic touch, dialogue, foreplay) don't attempt a check at all.

```
successChance = clamp(0.4 + playerTEC / 125, 0.1, 0.95)
isSuccess = roll() < successChance
```

`tecChecksAttempted` and `tecChecksPassed` on `IntimateEncounterRuntimeState` increment accordingly, feeding directly into §4.8's `techComponent`.

### 4.8 Satisfaction Score — Revised Penalty Condition **[PROPOSED, revised]**

```
arousalComponent = 40 × (partnerFinalArousal / 100)
techComponent    = 30 × (tecChecksPassed / max(1, tecChecksAttempted))
kinkBonus        = kinkTriggered ? 15 : 0
sincereBonus     = sincereDialogueUsed ? 15 : 0
satisfaction     = clamp(arousalComponent + techComponent + kinkBonus + sincereBonus, 0, 100)

// Penalty now keys off *why* the scene ended (§5.3), not whether Kenji personally climaxed:
if (sceneEndReason === "STAMINA_EXHAUSTED" && partnerFinalArousal < 100) {
  satisfaction = min(satisfaction, 40)
}
```

If the player explicitly ends the scene (`PLAYER_ENDED`), no automatic cap is applied — a low partner Arousal at that point already drags the score down naturally via `arousalComponent`, without needing a separate penalty rule layered on top.

### 4.9 Shop Discount Stacking

Unchanged:
```
effectiveDiscount = max(renownTierDiscount, achievementDiscount)
effectiveDiscount = min(effectiveDiscount, 0.30) // hard floor, price never drops below 70% of base
```

### 4.10 Ardor Points (AP) & Battle Points (BP) — Acquisition & Reduction **[PROPOSED, new]**

Both are permanent skill-tree currencies (§11, §12) — entirely separate from the Level/XP system in §4.2. Neither decays or is spent on anything except skill nodes.

**Ardor Points — Acquisition** (stacks additively per completed Intimate Encounter):
- **+1 AP** — base award for any completed Intimate encounter, regardless of Satisfaction Score.
- **+3 AP** — bonus if the encounter's Satisfaction Score (§4.8) lands in the Perfect tier (96–100).
- **+1 AP** — one-time bonus the first time an Intimate Encounter completes with a given companion, tracked via `CompanionRuntimeState.firstIntimacyCompleted`.
- A Perfect-scored first-time Intimate encounter therefore nets **5 AP** total (1 + 3 + 1); a routine repeat encounter nets **1 AP**.

**Battle Points — Acquisition:**
- **+1 BP** — any won Combat Encounter.
- **+2 BP** — additional bonus if `EncounterDef.isBossEncounter` is true (so a boss win nets 3 BP total: 1 base + 2 boss bonus).
- **+1 BP** — one-time bonus the first time a given `EnemyCombatantDef.id` is defeated, tracked against `GameState.defeatedEnemyTypeIds`.

**Reduction (spending), both trees:**
- Spending AP/BP purchases a `SkillNodeDef` — deducts `pointCost` from the relevant pool, requires all `prerequisiteNodeIds` already owned, and requires sufficient CPW-independent point balance (CPW cost, if any, is a separate resource checked at cast-time, not purchase-time).
- Balances can never go negative — insufficient points simply blocks the purchase.
- **No respec/refund mechanism in v1** **[PROPOSED]** — matching the original doc's "permanent and never lost" framing, a purchased node is a one-way commitment. This is worth a deliberate product decision rather than an oversight: if playtesting shows this feels too punishing, a respec system (e.g. a gold-cost full reset) is a contained addition that doesn't touch the acquisition rules above.
- AP/BP are never converted to gold, spent on items, or reduced by any other system.

### 4.11 Last Safe Location — Party Wipe Recovery **[PROPOSED, new]**

Backs the "return to the last safe location" rule from §5.2. A **safe location** is any `LocationDef` with `isSafe: true` — town hubs, companion/player residences, and dungeon entrances, but never a dungeon interior or active encounter zone.

- `PlayerCharacterState.lastSafeLocationId` updates automatically every time the player's `currentLocationId` changes to a location where `isSafe === true`. It does **not** update while the player is inside a non-safe location (mid-dungeon, mid-encounter zone) — so wandering deep into a dangerous area doesn't move the recovery point until you reach another safe waypoint.
- **On a full-party wipe** (§5.2 — every combatant including the player reaches 0 HP): `currentLocationId` (and derived `currentRegion`) resets to `lastSafeLocationId`; the player and all companions are restored to full HP **[PROPOSED]**; `gold` is reduced by 10%; no items are lost; the triggering `QuestObjective`/`EncounterDef` is left incomplete so the player can simply re-approach and retry.

### 4.12 Monster Level Scaling **[PROPOSED, new]**

Monsters scale the same way companions do (§4.2), reusing the same base growth vector for consistency, but keyed to `MonsterType` instead of `CombatRole`:

```
statAtLevel(stat, targetLevel) = enemyDef.combatStats[stat] + BASE_GROWTH_PER_LEVEL[stat] × MONSTER_TYPE_MULTIPLIER[monsterType][stat] × (targetLevel − enemyDef.baseLevel)
```

`BASE_GROWTH_PER_LEVEL` is the same vector already defined in §4.2: `{ hp: 6, str: 0.8, agi: 0.6, wis: 0.8, def: 0.6, lck: 0.5 }`.

`MONSTER_TYPE_MULTIPLIER` **[PROPOSED]**:

| Type | hp | str | agi | wis | def | lck |
|---|---|---|---|---|---|---|
| Beast | 1.0 | 1.1 | 1.2 | 0.5 | 0.8 | 0.8 |
| MiasmaCorrupted | 1.1 | 0.9 | 0.8 | 1.3 | 1.0 | 0.9 |
| Construct | 1.6 | 1.3 | 0.4 | 0.6 | 1.6 | 0.5 |
| Draconic | 1.8 | 1.6 | 1.0 | 1.2 | 1.3 | 1.0 |
| Humanoid | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 |
| VoidAberration | 1.2 | 1.3 | 1.1 | 1.4 | 1.0 | 0.9 |
| Cosmic | — hand-authored per encounter, never formula-derived (one-off final-boss content, e.g. the Primordial Ache) |

When an `EncounterDef` spawns, each enemy instance rolls a `targetLevel` from its region's `RegionMonsterProfile.levelRange` (§5.11) and its stats are computed via the formula above — the same `EnemyCombatantDef` (e.g. a generic Direwolf template) can therefore appear meaningfully weaker in Verdant Vale than a reused instance later in a higher-level region, without needing a separate hand-authored template per region.

---

## 5. System Specifications

### 5.1 Universal Interaction Module — Full Canonical Definition **[resolved this pass]**

This section previously read "Unchanged from v1.0" and stated only two isolated rules, without ever assembling the actual menu it was describing. The full action set existed only as fragments scattered across a dozen other sections (child-NPC exclusions, defeat-outcome loot rules, Service NPC notes) — reassembled here in one place, once, rather than left implicit.

**Live-target actions** — available against a companion, a `WorldNpcInstance`, or an active combat participant, narrowed by the type-level exclusions below:

- `Talk` — opens dialogue: a `CharacterDialogueTreeDef` (companions, named story NPCs) or a `GenericNpcDialogueSetDef` (generic NPCs), or — for a `ServiceNpcDef` — opens its service UI directly instead of any dialogue tree at all
- `Inspect` — surfaces basic info with no relationship effect; the underlying read that feeds the Contact Profile (§19)
- `Gift` — presents an inventory item; Trust/Love effect depends on the item's tags; restricted to a small platonic-tagged subset (toys, sweets, flowers — never anything romantic/intimate-tagged) against Child NPCs
- `Flirt` — a Trust/Love-affecting romantic gesture; diminishing returns after 3 uses per NPC per in-game day
- `Touch` — a physical, arousal-adjacent gesture short of a full Intimate Encounter; same diminishing-returns rule as `Flirt`
- `Intimate` — begins a full Intimate Encounter (§5.3), including its in-scene verbal `Command` sub-mechanic (the "Command speech" tied to Dominance & Submission content, §26); hard-gated against `NpcLegalClass.Protected` targets and any `ChildNpcInstance` at the engine layer, regardless of any other state — this gate does not soften with Trust, Love, or any content toggle (GAP - when is intimate encounter applicable to be shown for a character/NPC)
- `Battle` — initiates combat; the only action valid (alongside `Intimate`) against non-humanoid monster encounters
- `MoveIn` — invites an eligible companion or generic NPC to Ardor Manor (§15.1/§19.4)

**Defeat Outcome Menu** — presented *instead* of the menu above, once a `presentsDefeatMenu: true` humanoid combatant reaches 0 HP (§5.2). Six options total: (GAP - add `Loot` as a option)

1. `StripAndLoot` — resolves item/gold loot (§5.9); the only option that does
2. `SpareAndRelease` — ends the encounter; no loot
3. `HandToGuard` — bounty gold via a separate reward path (§10.3 of the GDD), not loot
4. `Interrogate` — a narrative/quest-flavor outcome; no loot
5. `ForceIntimacy` — requires `ContentToggle.NonConsensualContent` on and is hard-gated off entirely against Protected-class targets, identically to live-target `Intimate`; no loot
6. `PermanentlyRemove` — restricted from *narratively* named/story-critical characters (the 10 companions, Astraea, named quest-critical NPCs like High Inquisitor Malakor) — **not** from an ordinary individuated Contact List NPC whose only "name" is an auto-rolled one from §19.4's naming pool; no loot
(GAP - which property in NPCs and companions marks them as Protected)

**Type-level exclusions, consolidated:**
- **Service NPCs** (`ServiceNpcDef`) — none of the above apply. `Talk` opens the service UI directly; there is no menu to restrict because none is ever rendered.
- **Child NPCs** (`ChildNpcInstance`) — only `Talk`, `Inspect`, and platonic-`Gift` are valid. `Battle`, `Intimate` (and its `Command` sub-mechanic), `ForceIntimacy`, `Flirt`, `Touch`, and `MoveIn` are excluded at the type level — the function signatures themselves don't accept a `ChildNpcInstance`, verified at compile time via a type-level test, not just a runtime rejection check (§11 has the acceptance-criteria detail) — since the whole point is that no code path can be miswired to accept one at all.
- **Non-humanoid monster encounters** — only `Battle` and `Intimate` are valid; every other live-target action assumes a character capable of conversation.

### 5.2 Combat Module — Enemy Party Mechanics Added

- **Party composition:** the active player party is the player plus up to 4 companions (unchanged cap). Enemy encounters are defined by `EncounterDef.enemyGroup`, a list of `{ enemyDefId, count }` pairs supporting mixed enemy types (e.g. 4 Blighted Direwolves + 1 Alpha) up to `maxSimultaneousEnemies` **[PROPOSED cap: 6]**.
- **Turn order:** `initiative = agi + rollD10()`, ties broken by `lck` descending, computed once at encounter start across every combatant (player, companions, and all enemy instances) into `CombatEncounterRuntimeState.turnOrder`.
- **Enemy AI patterns** (`EnemyAiPattern`, **[PROPOSED]**):
  - `AGGRESSIVE` — always targets the lowest-HP living party member.
  - `DEFENSIVE` — uses a guard/defend action when its own HP < 50%, otherwise attacks the highest-threat target (mirroring the player's "Read the Fight" skill logic).
  - `SUPPORT_CASTER` — prioritizes buffing allied enemies or debuffing the party over direct attacks when multiple enemies are present; attacks directly if it's the last enemy standing.
  - `BOSS_SCRIPTED` — follows a per-boss `bossScriptId` script keyed to HP-percentage thresholds (e.g. the Miasma Wyrm's breath attack at 75%/50%/25% HP, the Heartwood Abomination's regen tied to specific turns) — this is where each named boss's unique mechanics from the GDD's Act chapters live as data, not hardcoded per-boss engine code.
- **Companion incapacitation:** a companion at 0 HP is marked `downed` (`CombatCombatantRuntime.downed`) and skipped in turn order; if every party combatant (including the player) is downed, the encounter resolves as a loss and triggers the Last Safe Location recovery flow — see §4.11 for the full rule (recovery point tracking, HP restore, the 10% gold penalty, and why the failed encounter is left retryable rather than marked failed outright).
- **Purification as an alternate defeat condition:** every enemy combatant also carries an `arousal` field; on purifiable `MonsterType`s, Sex Skill actions can defeat an enemy by raising `arousal` to 100 instead of reducing `currentHp` to 0, and some enemies can likewise raise the player's or a companion's own `arousal` via a sexual attack. This is a core part of the Combat Module now, not a separate mode — see §23 for the full mechanic, targeting rule, and combat-penalty tiers.
- **Flee:** success chance **[PROPOSED]** `= clamp(0.5 + (playerAgi − avgEnemyAgi) × 0.02, 0.1, 0.9)`.

### 5.3 Intimacy Engine Module — Scene End Condition Corrected

- A scene ends for exactly **two** reasons, and only these two: `playerStamina` reaches 0 (`STAMINA_EXHAUSTED`), or the player explicitly selects an end-scene action from the turn menu (`PLAYER_ENDED`). **Reaching 100 Arousal no longer auto-ends the scene** — the player can keep going past a partner's climax if stamina allows, since positions/acts remain freely switchable per the phase-free design.
- Satisfaction is computed strictly per §4.8's function at scene end — no separate ad-hoc scoring logic elsewhere.
- Content toggles are checked before rendering turn options (`ContentToggle.Anal`, `.Pregnancy`, `.Lactation` filter which acts/positions appear at all); `NonConsensualContent` off means `ForceIntimacy` never appears as a Defeat Outcome option, in addition to (not instead of) the Protected-class hard gate in §5.1.

### 5.4 Reputation Module — Decay Timing & Cap

- Decay runs once per in-game day, at the day-end tick — when `DayPhase.Midnight`'s own phase-advance condition fires, not when Midnight begins (§7).
- **[PROPOSED, revised]**: if `reputationScore < 0`, it moves toward zero by `min(15, abs(reputationScore))` — capped at 15 points per day, and this `min` also guarantees it never overshoots past 0 into positive territory in a single tick.
- Positive Renown scores do not decay (unchanged assumption — nothing in the original doc suggests good standing fades on its own).

### 5.5 Pregnancy/Lineage Module — Birth Timing

- Gestation clock **[PROPOSED, unchanged from v1.0]**: 1 pregnancy week = 1 in-game day, so a full term is 12 in-game days.
- **[PROPOSED, revised]**: birth events are no longer evaluated the instant a week counter crosses 12 mid-action. Instead, the day-end tick (§7 — fires when `DayPhase.Midnight`'s own phase-advance condition triggers, same moment as reputation decay, §5.4) scans all active pregnancies and triggers `OffspringNpc` creation (running §4.5/§4.6) for every pregnancy where `currentWeek >= 12`. This keeps all "end of day" world-state resolution (decay, births) happening at one consistent point rather than scattered across arbitrary action timings.

### 5.6 Quest Module

Unchanged in structure; reward fields now reference `rewardXp` and `rewardReputationDelta` per §4.1/§4.2 rather than the old separate Renown/Infamy point fields. Repeatable-quest reward scaling (+5% per completed Main Quest Act) is unchanged from v1.0.
(GAP - both QuestTypes Companion and repetable type quests do not have extact objectives for quest completion, it just has a text description. (like for combat quests whic monster is to killed and how many count should be present in as object format, not just text in format))

**Companion questStage advancement — the rule that was missing. [NEW, this pass]** Completing a `QuestDef` with `type: QuestType.Companion` for a given companion increments her `CompanionRuntimeState.questStage` by exactly 1. This was never stated explicitly anywhere in this document, which meant every `QUEST_STAGE_AT_LEAST` condition throughout the companion dialogue trees (§25) had no actual mechanism driving it — the trees assumed a progression that nothing advanced. `companion_quest_chains_seed_data.ts` is the first real content proving this rule out: each companion's Stage N quest is gated on her own Stage N−1 dialogue's `setsStoryFlag`, and completing it is what unlocks Stage N's dialogue via the resulting `questStage` increment — a closed loop, not a one-way assumption.

**Quest givers — another rule that was missing. [NEW, this pass]** No `QuestDef` anywhere, across all 99 quests that exist by this point, ever specified who actually gives it — the schema had no field for it at all. Fixed: `QuestDef.questGiverId` — a `CompanionId` for every `QuestType.Companion` quest (she's the reason the quest exists, not a bystander to it) or a `ServiceNpcDef` id with `serviceType: QuestBoard` for the 30 repeatable quests. Checking this against the actual `ServiceNpcDef` roster surfaced a real, separate gap: Whispering Wood and Sunken Sanctum both have repeatable quests but neither had a quest board at all — Whispering Wood was deliberately sparse (§5.10's own note on its wilderness theme), and Sunken Sanctum only had a fast-travel point. Both now have one (`svc_ww_questboard` at the Misty Treeline, `svc_ss_questboard` at the Crater's Edge), rather than leaving five and two quests respectively with no giver to reference.

### 5.7 Achievement Module

Unchanged — data-driven trigger conditions evaluated as a post-action check after every state mutation.

### 5.8 Gold & Item Economy Module (new)

- **Currency:** single `gold: number` on `PlayerCharacterState`. No cap **[PROPOSED]** beyond the JS safe-integer bound (effectively unlimited).
- **Buying:** `price = itemDef.sellValueGold × 2 × (1 − effectiveDiscount)` **[PROPOSED 2x markup convention]** — the same `sellValueGold` field serves as both the base for purchase price and the flat amount received when selling, rather than maintaining two separate price fields per item.
- **Selling:** player receives `itemDef.sellValueGold` directly (no separate sell-price field).
- **Inventory slots:** governed by `PlayerCharacterState.bagSlotsMax` (20 base, expandable via Manor tier upgrades per §6 of the GDD — up to 100 at Grand Estate). `Manor.storageSlotsMax` is a *separate* warehouse pool, not the same capacity as the personal bag.
- **Stacking:** items with `stackable: true` combine up to `maxStack` within one inventory slot; non-stackable items (equipment, weapons) always occupy one slot each regardless of quantity held.
- **Quest items:** any `ItemDef` tagged `"quest-item"` is stored in the same `inventory` array but is **excluded from the bag-slot-limit calculation** — this prevents a full personal bag from ever soft-locking quest progression.
- **Overflow handling:** a pickup that would exceed available (non-quest-item) bag slots is rejected outright with a clear "bag full" result — never silently discarded, never auto-sold.
- **Companion inventory transfer:** moving an item between the player's and a companion's `inventory` array is a single atomic state mutation — no intermediate "in transit" state that could be lost mid-request.
- **Gifting:** consumes the item from whichever inventory it's given from, then applies a flat **+10 Trust / +15 Love** to the recipient **[reused directly from the original doc's stated gift bonus, now applied universally]** — there is no per-item or per-companion preference tier; every gift, regardless of which item is chosen, applies the same bonus. This removes the `"gift-preferred:{companionId}"` tagging concept entirely from `ItemDef.tags`. Note the act is still naturally bounded: gifting consumes an item, and items cost gold to acquire, so unlimited gift-spam is bounded by the economy rather than by a special-cased rule — no additional cap was added beyond that.

### 5.9 Combat & Defeat Loot Mechanics (new)

Two distinct loot paths, depending on whether the defeated combatant is a pure monster or a humanoid NPC — this is exactly what `EnemyCombatantDef.presentsDefeatMenu` discriminates between.

**Path A — Automatic Monster Loot (`presentsDefeatMenu: false`):**

The moment a non-humanoid enemy (a beast, construct, or similar) is reduced to 0 HP, its loot resolves immediately with no player choice involved, and accumulates into a running per-encounter pool:

```
goldDrop = randInt(enemy.goldDropRange[0], enemy.goldDropRange[1])
for each entry in lootTable(enemy.lootTableId).entries:
  if roll() < entry.dropChance:
    quantity = randInt(entry.quantityRange[0], entry.quantityRange[1])
    add (entry.itemId, quantity) to encounterLootPool
add goldDrop to encounterGoldPool
```

**Path B — Humanoid Strip & Loot (`presentsDefeatMenu: true`):**

Reducing a humanoid combatant to 0 HP pauses combat and presents the Defeat Outcome Menu (§5.1) for that specific combatant, exactly as before. Loot only resolves if the player chooses `StripAndLoot`:

- **If `sourceWorldNpcInstanceId` is set** (a specific named NPC, e.g. a particular bandit encountered in the world): gold awarded is that instance's `goldCarried` directly (deterministic, already-authored per-instance), and every currently `Equipped`-state item in its `EquipmentLoadout` is taken in full — stripping gear is deterministic, not a chance roll, since it's describing what the NPC was visibly wearing.
- **If no `sourceWorldNpcInstanceId`** (a generic enemy template pull, e.g. an unnamed mercenary grunt): gold and items resolve the same way as Path A, using the `EnemyCombatantDef`'s `goldDropRange`/`lootTableId`.
- Any other Defeat Outcome (`SpareAndRelease`, `HandToGuard`, `Interrogate`, `ForceIntimacy`, `PermanentlyRemove`) grants **no** item/gold loot from that individual — `HandToGuard`'s bounty gold (§10.3 of the GDD) is a separate reward path, not loot.

**Encounter-level bonus reward:**

On top of whatever was accumulated via Path A/B across all defeated combatants, `EncounterDef.rewardGoldRange`/`rewardXp`/`rewardItemIds` is rolled and added once at overall encounter victory — this represents "completing the encounter" itself (matching the GDD's boss reward tables, e.g. "500 Gold, 3 Arcane Cores" for the Rogue Battle Golem), distinct from what any individual defeated combatant happened to carry.

**Reward scaling:** the combined final gold total (Path A + Path B + encounter bonus) is scaled by the same **+5% per completed Main Quest Act** multiplier already defined for quest rewards in §5.6 — this was flagged as a gap in the original audit (flat rewards not scaling against the Act 1→6 difficulty curve) and reusing the existing multiplier here keeps combat loot and quest rewards growing on the same curve rather than introducing a second, disconnected scaling rule.

**Inventory overflow — deliberately different from §5.8's manual-pickup rule:** if awarded loot items don't fit in `bagSlotsMax`, they are **not** rejected the way a manual world pickup would be. Instead, any overflow items are automatically converted to gold at their `sellValueGold` and added to the reward total. Silently discarding or blocking a hard-won post-combat reward (especially from a boss) would feel bad in a way that rejecting a casual field pickup doesn't — the two situations warrant different handling even though they're both "bag is full."

### 5.10 NPC Population — Interactable, Service, and Child NPCs (new)

Not every character-shaped thing in the world needs the same depth of simulation. Three distinct tiers:

**Standard interactable NPCs** — `WorldNpcInstance` (already defined): full Universal Interaction Menu (§5.1), Trust/Love, combat capability, legal class, the works. Population is governed by `LocationPopulationDef.interactableNpcCounts` — a range per procedural class (§8.1 of the GDD) per location, re-rolled every `refreshIntervalGameDays` **[PROPOSED default: 3 game-days]** at the day-end tick (§7), consistent with the other day-boundary systems (§5.4, §5.5).
(GAP - there is no definition on the gender diversity of interatable NPC spawns)

**Service NPCs** — `ServiceNpcDef` (new): pure utility/function NPCs — item vendors, blacksmith upgrade counters, bank tellers, quest boards, innkeepers, fast-travel points. These are **not** `WorldNpcInstance`s at all: no combat stats, no Trust/Love, no legal class, and none of `Battle`/`Intimate`/`Gift`/`Flirt`/`Touch` are valid against them — there's no menu to restrict, because the only available action is opening whatever service they provide (the shop UI, the bank UI, etc.) directly on `Talk`. `LocationPopulationDef.serviceNpcIds` is a **fixed roster** per location — these don't randomize or despawn like standard interactable NPCs do.

**Child NPCs** — `ChildNpcInstance` (new): background population (village children, and similar) rendered as a **structurally separate type**, not a flag on `WorldNpcInstance`. This is deliberate: the interaction dispatcher's function signatures for `Battle`, `Intimate`, `ForceIntimacy`, `Flirt`, `Touch`, `Command`, and `MoveIn` should never accept a `ChildNpcInstance` as an input type at all — there's no boolean to check and therefore nothing to accidentally bypass. Only `Talk`, `Inspect`, and a restricted `Gift` (a small fixed set of platonic items — toys, sweets, flowers; never anything tagged for romantic/intimate contexts) are valid. There's no `Love` field and no relationship-status grid lookup for this type at all — just a single `familiarity` score (0–100) used only to gate quest dialogue (e.g. a child mentioning where an older sibling went once familiarity is high enough). `LocationPopulationDef.childNpcCount` governs population range, limited to residential/hub locations (never dungeon interiors or encounter zones — children aren't present in active combat areas at all).

This three-tier split also directly resolves the earlier open question from the original gap analysis about whether "every character" in the Universal Interaction Menu literally meant every character — it doesn't; Service and Child NPCs are explicitly carved out by type, not by a permission check that could be misconfigured.

### 5.11 Monster Taxonomy & Regional Distribution (new)

Every `EnemyCombatantDef` carries a `monsterType` (broad category, drives the growth multiplier in §4.12) and a `family` (flavor tag for grouping/UI, e.g. `"wolf"`, `"wraith"`, `"wyrm"`). Which types are eligible to spawn where is governed by `RegionMonsterProfile` — **updated to add `Humanoid` to Verdant Vale, Aethermoor, Whispering Wood, and Sunken Sanctum**, none of which previously allowed it at all; without that, those four regions could never have negative-NPC combat content regardless of how much §23.2 roster gets authored:

| Region | Level Range **[PROPOSED]** | Allowed Monster Types | Canon Examples from the GDD |
|---|---|---|---|
| Verdant Vale | 1–8 | Beast, MiasmaCorrupted, Humanoid | Blighted Direwolves, the Blighted Treant (Act 1 boss) |
| Aethermoor | 6–14 | MiasmaCorrupted, Construct, Humanoid | Miasma Wraith Archivist (boss), Rogue Battle Golems |
| Crimson March | 12–22 | Draconic, Humanoid | Crimson Wyrmlings, the Miasma Wyrm (boss), deserter mercenaries |
| Whispering Wood | 18–28 | MiasmaCorrupted, Beast, Humanoid | The Heartwood Abomination (boss), Shadow Panthers |
| Mountain Monastery **[NEW]** | 22–32 | MiasmaCorrupted, Humanoid, Beast | Sera's home region (Act 4/5) — named on the GDD's world map but never detailed until this document's own world-map transcription pass (see `world_map_seed_data.ts`'s own §18.7 comment block, an internal reference within that file, not a subsection of this document); full 8-enemy bestiary and a confirmed final boss (the Ashen Penitent Mother) delivered in `mountain_monastery_enemies_seed_data.ts` |
| Auric Court | 24–34 | Humanoid, MiasmaCorrupted | Miasma Cultists, High Inquisitor Malakor & the Miasma Succubus (hybrid boss) |
| Sunken Sanctum | 30–45 | VoidAberration, Construct, Humanoid | Void Stalkers, the Void Concubine (boss) |
| Celestial Threshold | 40–60 | Cosmic (one-off only) | The Primordial Ache — hand-scripted, not part of any reusable regional pool |

**Encounter roll mechanics**, tying together §5.2 and §7.1's night/midnight modifiers: the baseline chance of a random encounter triggering per map-traversal action in a non-safe `LocationDef` is **[PROPOSED] 15%** during Morning/Afternoon/Evening, rising to **22.5%** during Night and **30%** during Midnight (§7.1's escalating modifiers, with the daytime baseline made explicit here). When an encounter triggers, the game rolls an `EncounterDef` whose `region` matches the player's current region and whose constituent `EnemyCombatantDef`s all have a `monsterType` present in that region's `RegionMonsterProfile.allowedMonsterTypes` — this is what actually prevents, say, a Void Stalker from wandering into the Verdant Vale.

**Density guideline for purification-capable content** **[PROPOSED]**: at least **30% of a region's `Humanoid`- and `MiasmaCorrupted`-type roster** should carry `monsterSex`/`isHumanoidForm`/a sexual-attack `EnemyAbilityDef` — a meaningful, ordinary presence throughout regular play, not a rare flavor reserved for one or two named bosses per Act. Split roughly evenly between `monsterSex: "FEMALE"` and `"MALE"` within that 30%, so both branches of the §23.1 targeting rule (player-targeted, companion-targeted) show up regularly across every region rather than being concentrated in whichever boss happens to be female. `Beast`, `Draconic`, `VoidAberration`, `Construct`, and `Cosmic` types aren't subject to this 30% density requirement — it's specifically about the two types the request called out, not "as many enemies as possible." That doesn't rule them out entirely, though: §23.2's Void Concubine (`VoidAberration`) already shows this can still happen for a specific named boss outside the guideline's scope — it just isn't the *expected baseline* for those types the way it is for `Humanoid`/`MiasmaCorrupted`.


---

## 6. Save/Load Specification (JSON File-Based)

*(File layout, atomic writes, concurrency, validation, and migration are unchanged from the prior pass — see the file-layout diagram in §2.)*

### New Game+ — Explicit Confirmation Required **[PROPOSED, revised]**

Reaching an NG+-eligible condition (completing Act 7 and choosing to remain in Eranthis or ascend) does **not** auto-transition state. Instead, the game surfaces an explicit prompt ("Start New Game+ with your current companions and skills?") and the NG+ transform — which carries forward `player.skillState`, all `CompanionRuntimeState.trustLove`, `levelProgression`, and `achievements` while resetting `quests`, `storyFlags`, and `reputation` — only runs after the player confirms. Declining leaves the completed-campaign save exactly as it is, fully explorable in Endless Sandbox Mode without forcing a reset.

---

## 7. Calendar System — Revised

The day is made of **five lived-in phases** — Morning → Afternoon → Evening → Night → Midnight — and the player takes actions within all five, Midnight included. It is not a special instantaneous boundary; it's a normal phase with its own escalated world content (§7.1), same as Night but further.

**The day ends when Midnight's own phase-advance condition fires** — not when Midnight begins. At that moment:

1. All day-boundary processing runs synchronously — Reputation decay (§5.4, which is now the only thing bounty status ever depends on, per §17), pregnancy birth-event evaluation (§5.5), and NPC population refresh checks (§5.10).
2. `currentGameDate` increments.
3. The calendar advances to `Morning` of the new date, with `actionsTakenThisPhase` reset to 0.

So a full day is genuinely five phases long — the player can act, fight, and explore all the way through Midnight — and only once Midnight itself is *finished* does the day actually close out.

**Phase advancement (applies uniformly to all five phases, including Midnight):**
1. **Action counter:** `GameCalendarState.actionsTakenThisPhase` increments on each discrete player action (world interaction, dialogue exchange, single combat turn); reaching **15** advances to the next phase and resets the counter to 0. When this fires while the current phase is Midnight, it triggers the full day-end sequence above rather than a normal phase change.
2. **Direct-advance events:** completing a quest (any chapter/stage/repeatable), sleeping at any residence, completing an Intimate Encounter (§5.3), or completing a Combat Encounter (§5.2) each immediately advance to the next phase regardless of the action counter — including, if triggered during Midnight, immediately closing out the day via the same sequence.

### 7.1 Night & Midnight — Distinct World Content **[PROPOSED, new]**

Both `Night` and `Midnight` are after-dark phases the player actually spends time in, and both escalate the same set of dangers — Midnight further than Night, reflecting the deepest, most dangerous hour rather than an arbitrary second "also nighttime" label:

- **Higher monster encounter frequency** (relative to the daytime baseline in §5.11): **Night 22.5%**, **Midnight 30%** per map-traversal action **[PROPOSED]**, versus a 15% daytime baseline.
- **More aggressive monsters:** any `EnemyCombatantDef` using `EnemyAiPattern.Aggressive` gets a flat initiative bonus (added to its `agi` roll, §5.2): **+3 at Night, +5 at Midnight** **[PROPOSED]** — nocturnal predators act faster and more often go first, more so the later it gets.
- **Ambush encounters ("Night Assault"):** a portion of triggered encounters start with `CombatEncounterRuntimeState.playerSurprised = true` — **25% at Night, 35% at Midnight** **[PROPOSED]** — the enemy side effectively acts before turn order is rolled for the party's first turn. This is a combat-difficulty modifier only; it has no connection to any companion-facing content.
- **More criminal/troubled NPC presence:** procedural `WorldNpcInstance` spawn weighting shifts `NpcLegalClass.Outlaw` upward the later it gets **[PROPOSED]**:

  | Legal Class | Day (Morning/Afternoon/Evening) | Night | Midnight |
  |---|---|---|---|
  | Innocent | 80% | 55% | 40% |
  | Outlaw | 15% | 35% | 45% |
  | Protected (companions/story NPCs, unaffected) | 5% | 10% | 15% |

  This ties directly into the existing Infamy/Outlaw defeat-consequence system already built (§10.3 of the GDD) — bandits, cultists, and rogues are simply more common to run into the later it gets, without needing any new reputation rule.
- **"Night Crawling" — stealth-gated locations, not a new invention:** several `LocationDef`s are flagged `nightOnlyAccess: true` and `requiresStealthCheck: true`, accessible during either Night or Midnight — these formalize heist/infiltration beats already present in the GDD's own story (Act 5's "A Game of Shadows" and "Reva's Secret Ledger" chapters both involve nighttime infiltration to steal documents). Entering one of these locations rolls a stealth check **[PROPOSED]** `successChance = clamp(0.5 + playerAgi × 0.02 + playerLck × 0.01, 0.1, 0.9)`; failure triggers a hostile encounter (guards, or a scripted `EncounterDef`) rather than an instant game-over, consistent with how every other failure state in this document is designed to be retryable rather than punishing.

**Explicitly out of scope:** no mechanic in this section allows the player to initiate non-consensual sexual content against a companion. Force Intimacy (§5.1) remains scoped exclusively to defeated, non-Protected-class NPCs regardless of time of day — the Night/Midnight changes above are about world danger and NPC population, not an exception carved into the companion-protection rules established throughout this document.
(GAP - add support to initiate non-consensual intimate interaction with a NPC(non companion) who is asleep and reciding in manor.)

### 7.2 Sleep — Explicit Day-Skip, and Penalties for Not Sleeping **[PROPOSED, new]**

**The Sleep action:**
- Offered only when `dayPhase` is `Night` or `Midnight`, and only at a location where `LocationDef.isResidence === true` (Ardor Manor's Master Bedroom, a Companion Suite, or a companion's pre-move-in residence if visiting) — or via any `ServiceNpcDef` with `serviceType: Innkeeper` for a paid room. It isn't offered at all during Morning/Afternoon/Evening, or in non-residence locations — there's no "nap anywhere, anytime" option.
- Choosing Sleep is a direct-advance trigger like the other four in §7, but a stronger one: it advances straight to `Morning` of the **next** day regardless of whether the current phase is Night or Midnight — skipping Midnight's lived phase entirely if chosen from Night — running the full day-end sequence (reputation decay, birth-event evaluation, population refresh, date increment) exactly once at that point.
- **Sleeping at Ardor Manor is free** and resets `daysSinceLastSleep` to 0. **Sleeping at an Inn** (`ServiceType.Innkeeper`) costs **[PROPOSED] 20 gold** per night and behaves identically otherwise.
- Only sleeping specifically at Ardor Manor rolls the GDD's existing Morning Intimate Wake-Up chance (§6 of the GDD — a 25% chance a residing companion with Love ≥ 80 is found in bed on waking). Sleeping at an Inn, or at a companion's own residence before she's moved in, does not roll this — it's a Manor-specific cohabitation flavor event, not a generic "you slept" outcome.

**Fatigue — what happens if you don't:**

If the day-end sequence fires because Midnight's own phase-advance condition triggered (the 15-action counter, or a non-Sleep direct-advance event like finishing a quest at Midnight) rather than because the player chose Sleep, `daysSinceLastSleep` increments by 1. Choosing Sleep at any point resets it to 0, regardless of how high it had climbed.

| `daysSinceLastSleep` | Fatigue Level | Penalty **[PROPOSED]** |
|---|---|---|
| 0–1 | Rested | None |
| 2 | Tired | -10% max Stamina, -5% SEN/TEC, -5% STR/AGI |
| 3–4 | Fatigued | -20% max Stamina, -10% SEN/TEC, -10% STR/AGI/DEF, and TEC checks (§4.7) auto-fail 10% of the time regardless of the roll |
| 5+ | Exhausted | -35% max Stamina, -20% all Erotic stats, -20% all Combat stats, **and triggers forced collapse** (below) |

These are applied as a temporary multiplier layer on top of the Level-derived stats from §4.2 — Fatigue never touches `baseCombatStatsAtLevel1` or the growth curve itself, only the effective stats used in that day's combat/intimacy resolution.

**Forced collapse at Exhausted:** once `daysSinceLastSleep` reaches 5, the *next* day-end tick automatically resolves as though the player had chosen Sleep — regardless of current location — representing Kenji physically collapsing from exhaustion rather than a deliberate choice. This resets `daysSinceLastSleep` to 0 and relocates the player to `lastSafeLocationId` (reusing the Last Safe Location recovery mechanic from §4.11), with a one-time **[PROPOSED] -20% current HP** penalty — enough to make forced collapse a real cost worth avoiding, without being as punishing as an actual party wipe (§5.2), since neglecting to click "Sleep" isn't the same failure as losing a fight.

### 7.3 Stamina & Crest Power Recovery **[PROPOSED, new]**

Closes two gaps flagged in an earlier pass — Sleep didn't previously say what it restores, and there was no recovery path at all outside of Sleep.

**Schema clarification first:** `EroticStats.stamina` and `EroticStats.crestPower` are the player's *current* values in a persistent, depleting/regenerating pool — unlike `sensitivity`/`technique`/`virility`, which are fixed attributes that only ever grow, never deplete. Each resource pool now has a paired ceiling, `maxStamina` and `maxCrestPower` (base 40/20 per the GDD, raised toward its stated ceiling of 100 by skill-tree and achievement bonuses — e.g. *Goddess's First Dawn*'s "+10 Max CPW"). `IntimateEncounterRuntimeState.playerStamina` is a working snapshot of `stamina` taken at scene start, depleted turn-by-turn per position/skill costs (§5.3), and written back to `PlayerCharacterState.eroticStats.stamina` when the scene ends — so depletion during a scene persists afterward until recovered by one of the two mechanisms below.

**Full recovery via Sleep:** whenever the Sleep action resolves (§7.2 — at Ardor Manor, an Inn, or a forced collapse), `stamina` and `crestPower` are restored to their current effective maximums (`maxStamina`/`maxCrestPower`). This is the *last* step of Sleep resolution, applied after Fatigue itself has already been reset to 0 — so the restore lands on the true unpenalized ceiling, not a Fatigue-reduced one.

**Passive regen on every other phase advance:** any phase advance that is *not* caused by Sleep — the 15-action counter firing, or a non-Sleep direct-advance event (finishing a quest, a Combat Encounter, or an Intimate Encounter) — restores **+20% of current effective max** to both `stamina` and `crestPower`, capped at that max **[PROPOSED figure]**. Playing through a day without ever finding a bed still gradually recovers both resources across that day's phase transitions, rather than leaving the player stuck at whatever value they hit mid-scene until they explicitly rest.

**Order of operations on any phase advance:**
1. Determine whether this advance was caused by Sleep.
2. If yes: reset `daysSinceLastSleep` to 0 (§7.2) → recompute `maxStamina`/`maxCrestPower` with Fatigue penalties now cleared → set `stamina`/`crestPower` to those (now unpenalized) maximums.
3. If no: apply the day-end/Fatigue-accrual step first, if this advance also happens to close out the day (§7) → recompute the effective max under whatever Fatigue level currently applies → add the +20% passive regen, capped at that (possibly Fatigue-reduced) max.

**What this doesn't change:** the existing in-combat `Crest Charge` bonus action (GDD §14.1, +8 CPW) is unaffected and stacks independently with the phase-based regen above — players can still top up CPW mid-fight the way the original design intended. `refractoryPeriodSec` also remains a separate mechanic entirely — a cooldown before a *new* Intimate Encounter can begin at all, governing *when* a scene can start rather than how much Stamina/CPW is available once it does — and isn't touched by this section.

---

## 8. Content Production Plan **[resolved this pass]**

Previously "unchanged from v1.0 — see the table there," pointing at a table that was never actually reproduced anywhere in this document. Resolved with a real table reflecting where things actually stand now, which is considerably further along than any v1.0-era planning table could have described:

| Content type | Approach | Status |
|---|---|---|
| Companion dialogue | Hand-authored per companion | Delivered — Mira's flagship tree (75 nodes) plus the other 9 at parity depth (390 nodes total), §25 |
| Procedural NPC dialogue | Templated per class, shared across every spawned instance | Delivered — 60 nodes across the 10 classes, §25 |
| Sexual response lines | Hand-authored pool, randomized selection at the point of use | Delivered — 359 lines, full actionCategory×arousalStateMin coverage across both pools, §25 |
| Position/act descriptive text | Authored once, reused across every companion via `{partnerName}` substitution | Delivered — the pattern used throughout `sexual_response_seed_data.ts` |
| Items/weapons/armor/clothing | Hand-authored | Delivered — 249 entries, §2.1 |
| Enemies | Hand-authored per region | Delivered — full bestiary across all 7 regions plus Mountain Monastery |
| World map | Transcribed directly from the GDD's own ASCII region maps | Delivered — 81 locations, 92 path edges, §18 |
| Companion/repeatable quests | Hand-authored per stage/region | Delivered — 99 quests total (69 companion-chain, 30 repeatable) |
| Kinks | Hand-authored, one global catalog | Delivered — 20 entries, §26 |
| NPC names | **Generated**, not authored — rolled at individuation time from a fixed pool | Delivered — `npc_name_pools_seed_data.ts`, §19.4 |
| NPC gender/body archetype | **Generated** — gender rolled per instance from the class's range; body/appearance stays class-archetypal, not individually generated | Partially delivered — gender rolls per §19.4; appearance itself remains a known gap, §27 |
| UI/UX screens | Not yet begun | Pending, §27 |
| Quest tracking UI/data | Not yet begun | Pending, §27 |
| A generic NPC's first-`Talk` introduction | Not yet begun | Pending, §27 |

The authoring/generation split the original title referenced is the last two rows in the "Approach" column above versus everything else: nearly all content in this game is hand-authored, and the two deliberate exceptions (names, gender) are both narrow, mechanical rolls from small fixed pools — not full procedural content generation.

(GAP - how does the apperance of spawned npc be decided)

---

## 9. Worked Example (Updated for v1.1 Schema)

```typescript
const mira: CompanionDef = {
  id: CompanionId.Mira,
  displayName: "Mira Ashveil",
  race: Race.Human,
  homeRegion: Region.VerdantVale,
  combatRole: CombatRole.Support,
  appearance: {
    heightCm: 163, build: "soft, gentle, unhurried hourglass figure — a healer's build, not a fighter's",
    gender: GenderId.Female,
    hairColor: "warm auburn", hairStyle: "long, usually braided back and tucked under a plain kerchief while working",
    eyeColor: "warm brown", skinTone: "fair, lightly freckled from hours in the herb garden",
    skinType: "soft, fair, lightly freckled",
    distinguishingFeatures: ["calloused, careful hands from years of herb work"],
    scarsAndTattoos: ["a faint old burn scar along one wrist from an early healing mishap"],
    apparentAge: 24, trueAge: 24,
    bodyDetails: { hasBreasts: true, breastSizeCup: "D", breastShape: "generous, medium-full, naturally high-set", breastSoftness: "soft", breastSagginess: "none", nippleType: "puffy", nippleSize: "medium", waistCm: 64, hipCm: 96, assSize: "full, pillow-soft", assShape: "round, plush", assSoftness: "soft", hasPenis: false },
    portraitAssetId: "portrait_mira_ashveil",
    aestheticSummary: "Unassuming and warm at first glance, with the quiet steadiness of someone who has spent her whole life taking care of others before herself — a soft, generous figure she tends to downplay under practical work clothes.",
  }, // corrected this pass — heightCm/breast size/assSize were undersold relative to the source description ("generous, medium-full" breasts, "wide, pillow-soft hips")
  // Level 1 anchor only — Levels 2+ derive via §4.2's formula using the Support role multiplier.
  baseCombatStatsAtLevel1: { hp: 48, maxHp: 48, str: 5, agi: 7, wis: 12, def: 6, lck: 9 },
  specialAbilityId: "sacred_mend",     // heals 45 HP to all party
  passiveAbilityId: "crest_resonance", // +20% CPW regen for Kenji
  defaultEquipment: {
    [EquipmentSlot.Head]: "white_linen_hood",
    [EquipmentSlot.Body]: "healers_robe",
  },
  questChainId: "mira_chain",
  suiteThemeId: "herbalists_solace",
  moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
  // No kink field — deliberately. Any of the 20 global kinks (§26) can attach to Mira
  // through actual play; nothing here pre-decides which one is "hers."
};

const miraStage1Quest: QuestDef = {
  id: "mira_chain_stage_1",
  type: QuestType.Companion,
  region: Region.VerdantVale,
  questGiverId: CompanionId.Mira, // added when questGiverId became required — every quest needs a giver, and for a Companion quest it's always her
  prerequisiteFlags: ["act1_chapter1_started"],
  objectives: [{ id: "rescue_mira", description: "Rescue Mira from blighted wolves", targetCount: 1, currentCount: 0 }],
  rewardGold: 0,
  rewardXp: 25,
  rewardReputationDelta: 5,
  rewardItemIds: [],
};

const direwolfEnemy: EnemyCombatantDef = {
  id: "blighted_direwolf",
  name: "Blighted Direwolf",
  monsterType: MonsterType.Beast, // added when monsterType/family/baseLevel became required fields
  family: "wolf",
  baseLevel: 3,
  combatStats: { hp: 60, maxHp: 60, str: 9, agi: 12, wis: 4, def: 5, lck: 6 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["bite_lunge"],
  goldDropRange: [5, 15],
  lootTableId: "direwolf_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // pure monster — loot resolves automatically, no Defeat Outcome Menu
};

const direwolfLootTable: LootTableDef = {
  id: "direwolf_loot_table",
  entries: [
    { itemId: "wolf_pelt", dropChance: 0.8, quantityRange: [1, 1] },
    { itemId: "wolf_fang", dropChance: 0.25, quantityRange: [1, 2] },
  ],
};

const direwolfEncounter: EncounterDef = {
  id: "verdant_vale_direwolf_pack",
  region: Region.VerdantVale,
  enemyGroup: [{ enemyDefId: "blighted_direwolf", count: 4 }],
  maxSimultaneousEnemies: 6,
  isBossEncounter: false,
  rewardGoldRange: [30, 60], // encounter-completion bonus, on top of each wolf's individual drop
  rewardXp: 40,
  rewardItemIds: [],
};
```

This set is enough to see how content authored from the GDD's prose maps into the v1.1 schema — the remaining content follows the same shape.

---

## 10. Compliance Notes (Self-Hosted Web App Context)

Unchanged from v1.0 — check hosting-provider ToS for adult content before public deployment, default `ContentToggle.NonConsensualContent` **and** `ContentToggle.HostileArousalAttacks` to off requiring explicit opt-in, and confirm every character's adult status is stated explicitly in the content pass, particularly for long-lived races where narrative age and apparent age diverge.

---

## 11. Acceptance Criteria / Test Plan (Representative Sample, Updated)

- **Reputation:** `reputationScore = 799` → Renown Level 4, Infamy Level 0; at `800` → Renown Level 5. `reputationScore = -799` → Infamy Level 4; at `-800` → Infamy Level 5.
- **Reputation decay:** a region at `reputationScore = -100` becomes `-85` after one day-end tick (capped 15-point decay); a region at `-10` becomes `0` (not `+5`) — decay never overshoots into positive territory.
- **Leveling independent of Stage:** a companion at `questStage = 1, level = 20` has identical `CombatStats` to the same companion at `questStage = 7, level = 20`.
- **Trust/Love grid:** `resolveRelationshipStatus(90, -20)` resolves to `UnrequitedLoyalty` via direct range lookup (Trust ≥ 80 → VeryHigh, Love < 0 → Low) with no distance calculation, and is a pure deterministic function — same inputs always produce the same output.
- **Sworn Nemesis:** never returned by `resolveRelationshipStatus` under any (trust, love) input; only appears when `TrustLoveState.narrativeOverride` has been explicitly set by a scripted event.
- **TEC checks:** `tecChecksAttempted` increments only when a `PositionDef` with `isTechniqueSensitive: true` is used; `tecChecksPassed <= tecChecksAttempted` always holds.
- **Scene end:** a scene reaching 100 partner Arousal does not auto-end; it continues until `playerStamina` hits 0 or the player explicitly ends it.
- **Satisfaction penalty:** a scene ending via `STAMINA_EXHAUSTED` with `partnerFinalArousal = 30` caps at 40 regardless of the raw formula's output; a scene ending via `PLAYER_ENDED` with the same partner Arousal does not apply the extra cap (though the raw formula still scores it low via `arousalComponent`).
- **Offspring alignment:** roll weights are fixed (55/25/20) and show no statistically significant variation when `regionInfamyTier` is artificially varied in test runs, confirming the dependency was actually removed.
- **Combat encounter:** an `EncounterDef` with `enemyGroup` totaling 6 combatants produces a `turnOrder` with exactly 6 enemy entries plus all party entries, correctly sorted by initiative.
- **Gold/Item:** picking up an item when the bag is full (excluding quest-item-tagged slots) is rejected with a clear error, never silently discarded or auto-sold.
- **New Game+:** completing Act 7 does not auto-transition state; the NG+ transform only runs after an explicit confirmation action is received from the player.
- **AP/BP acquisition:** a Perfect-scored (Satisfaction 96–100) first-time Intimate Encounter with a given companion grants exactly 5 AP (1 base + 3 perfect + 1 first-time); a repeat routine encounter with the same companion grants exactly 1 AP.
- **AP/BP spending:** attempting to purchase a `SkillNodeDef` without owning all `prerequisiteNodeIds`, or with insufficient point balance, is rejected and the point balance is unchanged (never goes negative).
- **Last safe location:** `lastSafeLocationId` does not change while `currentLocationId` refers to a location with `isSafe: false`; a full-party wipe restores the player to `lastSafeLocationId` with full HP, a 10% gold reduction, and the triggering encounter/objective left incomplete (not marked failed).
- **Gifting:** every gift applies the same +10 Trust / +15 Love regardless of which item is given — no item produces a different result from any other.
- **Night spawning:** over a large sample of procedural spawns, the proportion of `NpcLegalClass.Outlaw` instances generated during `Night` is measurably higher than during `Morning`, matching the weighting table in §7.1.
- **Companion protection at night:** `InteractionAction.Intimate`/`ForceIntimacy` against any `CompanionId` is rejected at the engine layer identically during `Night`, during `Midnight`, and every other `DayPhase` — time of day has no effect on the Protected-class gate.
- **Day-end timing:** the player can take actions (world interaction, combat, dialogue) while `dayPhase === Midnight` exactly as freely as during any other phase; `currentGameDate` does not increment merely because `dayPhase` becomes `Midnight` — it only increments once Midnight's own phase-advance condition (15 actions, or a direct-advance event) fires, at which point reputation decay, birth-event evaluation, and population refresh all run in the same tick before the phase becomes `Morning` of the new date.
- **Sleep availability:** the Sleep action is not offered during Morning/Afternoon/Evening, and not offered at a location where `isResidence` is unset/false unless an Innkeeper `ServiceNpcDef` is present.
- **Sleep cost and reset:** sleeping at Ardor Manor deducts no gold and resets `daysSinceLastSleep` to 0; sleeping at an Innkeeper deducts 20 gold and resets it identically.
- **Sleep skips Midnight from Night:** choosing Sleep while `dayPhase === Night` advances directly to `Morning` of the next date — the player never experiences that cycle's `Midnight` phase, but the day-end sequence (decay/births/refresh) still runs exactly once.
- **Fatigue accrual:** `daysSinceLastSleep` increments by exactly 1 when a day ends via the action counter or a non-Sleep direct-advance event, and resets to 0 on any Sleep, regardless of its prior value.
- **Fatigue penalties are non-destructive:** a companion or the player's `baseCombatStatsAtLevel1` and level-derived stats are unchanged by Fatigue — only the effective in-combat/in-scene stats are reduced, and the reduction disappears immediately once `daysSinceLastSleep` drops back below the relevant threshold.
- **Forced collapse:** reaching `daysSinceLastSleep = 5` causes the next day-end tick to behave as an automatic Sleep regardless of location, relocating the player to `lastSafeLocationId`, applying a one-time -20% current-HP penalty, and resetting `daysSinceLastSleep` to 0.
- **Morning Wake-Up gating:** the 25%-chance Morning Intimate Wake-Up event only rolls after sleeping at Ardor Manor specifically — it never rolls after sleeping at an Inn or a companion's pre-move-in residence.
- **Sleep restores resources fully:** after Sleep resolves, `stamina === maxStamina` and `crestPower === maxCrestPower`, computed using the post-Fatigue-reset (unpenalized) max — even if the player entered Sleep at 0 of either resource and at Fatigue Level 3 (Exhausted).
- **Passive regen caps at max:** a non-Sleep phase advance with `stamina` already at or above `maxStamina - (0.2 × maxStamina)` results in `stamina` capped exactly at the current effective max, never exceeding it.
- **Regen respects active Fatigue:** if a non-Sleep phase advance simultaneously closes out the day (§7) and pushes `daysSinceLastSleep` into a new, more severe Fatigue tier, the +20% passive regen is computed against the *new*, lower `maxStamina`/`maxCrestPower` — not the pre-tick value.
- **Crest Charge is independent:** using the combat `Crest Charge` bonus action mid-encounter and later triggering a passive phase-advance regen both apply — one doesn't suppress or reset the other.
- **Automatic monster loot:** defeating a `presentsDefeatMenu: false` enemy never presents a Defeat Outcome Menu; its gold/item drops resolve immediately and are present in the final encounter summary without any player input.
- **Strip & Loot, named NPC:** choosing `StripAndLoot` against a combatant with `sourceWorldNpcInstanceId` set grants exactly that instance's `goldCarried` plus every item currently in `ClothingState.Equipped` — items in `Loosened` or `Removed` states, or not present in the loadout at all, are not included.
- **Strip & Loot, generic template:** choosing `StripAndLoot` against a combatant with no `sourceWorldNpcInstanceId` rolls gold/items from the `EnemyCombatantDef`'s `goldDropRange`/`lootTableId` instead of failing or returning nothing.
- **Other defeat outcomes yield no loot:** choosing `SpareAndRelease`, `Interrogate`, or `PermanentlyRemove` against a humanoid combatant results in zero item/gold loot from that individual (independent of any `HandToGuard` bounty-gold path, which is unaffected).
- **Loot overflow:** a post-combat reward that would exceed `bagSlotsMax` auto-converts the overflow items to gold at `sellValueGold` rather than rejecting the reward outright — distinct from the manual-pickup rejection behavior in §5.8.
- **Child NPC structural boundary:** the function signatures for `Battle`, `Intimate`, `ForceIntimacy`, `Flirt`, `Touch`, `Command`, and `MoveIn` do not type-accept `ChildNpcInstance` at all — this is verified at compile time (a type-level test), not just a runtime rejection test, since the whole point is that no code path can be miswired to accept it.
- **Child NPC interactions:** `Talk`, `Inspect`, and `Gift` (restricted to platonic-tagged items) succeed against a `ChildNpcInstance`; there is no `love` field anywhere on the type and no relationship-status grid lookup ever runs against it.
- **Service NPC:** `Talk` against a `ServiceNpcDef` opens its corresponding service UI state directly; no Universal Interaction Menu is ever rendered for it, and it has no combat stats to target with `Battle`.
- **Monster region eligibility:** an `EncounterDef` generated while the player is in Whispering Wood never contains an `EnemyCombatantDef` with `monsterType: VoidAberration`, since that type isn't in Whispering Wood's `RegionMonsterProfile.allowedMonsterTypes`.
- **Monster level scaling:** the same `EnemyCombatantDef` (e.g. a generic Direwolf template) produces measurably higher `CombatStats` when its rolled `targetLevel` is higher, following §4.12's formula, with `Cosmic`-type bosses exempt from the formula entirely (hand-authored stats only).
- **Population refresh:** a location's `interactableNpcCounts` roster changes after `refreshIntervalGameDays` game-days have passed at the day-end tick; `serviceNpcIds` and the existence of any given `ChildNpcInstance` remain stable across that same refresh (they are not regenerated the way standard interactable NPCs are).
- **Save migration:** loading a `saveSchemaVersion: 1` file after a `v2` schema change (e.g. this pass's Renown/Infamy merge) runs the migration and produces a valid `v2` `GameState` with no missing required fields.
- **Kink attachment is genuinely grindy, permanent, and never pre-assigned:** a character's `kinkProgress` entry for a given `KinkDef` increments by exactly 1 per matching in-scene action, never decrements, and `satisfiedKinkIds` only gains that kink's id once `requiredCount` is met — reaching the count one action early does not attach it. No `CompanionDef` field pre-determines which kinks apply to which companion; the same 20 `KinkDef`s are equally reachable by any companion or `WorldNpcInstance`. `kinkTriggered` on `IntimateEncounterRuntimeState` is only ever true for a kink already in `satisfiedKinkIds`, never for progress toward an unattached one.
- **Kink Encyclopedia gates detail, not existence:** without owning the node, `Reading the Room` shows only a partner's live Arousal meter/state — no kink information at all, since nothing is pre-assigned to preview. Once owned, both the full global catalog and any specific character's current `kinkProgress`/`satisfiedKinkIds` become visible.
- **Party swap gating:** attempting to add a companion to `partyMemberIds` while she is not present at the player's `currentLocationId` (per §12's presence rules) is rejected regardless of whether the location is safe; the same swap succeeds the moment she *is* present there — including in a non-safe location, and including a `movedIn` companion being swappable from anywhere within Ardor Manor at any `DayPhase`. Removing a companion from `partyMemberIds` always succeeds regardless of location or presence.
- **Pathed travel resolves atomically:** initiating travel to a discovered non-adjacent location resolves every segment of the shortest path in one server-side action, `currentLocationId` only updates after the final segment succeeds, and a full party wipe on any segment redirects the player to `lastSafeLocationId` instead of the original destination. A repeated multi-segment journey with the same start/end and no encounters triggered produces the same total segment count every time (deterministic given the graph, not re-randomized per attempt).
- **Purification targeting:** an enemy with `monsterSex: "FEMALE"` and `isHumanoidForm: true` using a sexual attack always raises the player's `CombatCombatantRuntime.arousal`, never a companion's; an enemy with `monsterSex: "MALE"` always raises exactly one companion's `arousal` (selected from current `partyMemberIds`), never the player's; an enemy with `monsterSex: "NONE"` never uses a sexual attack at all. A companion not currently in `partyMemberIds` is never a valid target regardless of enemy type. Separately: an enemy of a purifiable `MonsterType` reaching `arousal: 100` sets `downed: true` and `defeatMethod: "PURIFIED"` exactly as reliably as reaching `currentHp: 0` sets `defeatMethod: "KILLED"` — both paths are equally valid combat outcomes, checked every turn.
- **Purification reward is a small nudge, not a second economy:** an otherwise-identical encounter grants exactly +0.5 Astraea Approval more when a regular enemy is defeated via `arousal: 100` versus `currentHp: 0`, and +5 more for an `isBossEncounter: true` enemy — with gold, XP, and loot identical either way.
- **Crafting/Upgrade unlock gate:** neither action is offered anywhere in the UI unless the player owns the `Artisan's Insight` skill node; owning it without also being physically at an Ardor Manor of Tier 2+ still blocks both actions — both conditions are required simultaneously, not either/or.
- **Upgrade bonuses are per-instance, not per-definition:** two inventory items sharing the same `itemId` and `upgradeLevel` can carry different `upgradeBonuses` values, since each is rolled independently at upgrade time; a non-`upgradable` item never offers the upgrade action regardless of its `slot`/`equipmentCategory`.
- **Two upgrade modes, correctly gated:** the guided (choose-the-stat) upgrade option is never offered at Manor Tier 2 or 3, only Tier 4+; the random option remains available at every tier from 2 upward regardless of whether Tier 4 has been reached. A random-mode upgrade never surfaces the stat pool or bonus range to the player before it resolves; a guided-mode upgrade always does, and charges `goldCost + guidedSelectionGoldPremium` rather than `goldCost` alone.
- **Passive generation is skill-independent:** a companion with `movedIn: true` continues producing at her normal `productionIntervalGameDays` rate regardless of whether the player owns the Artisan's Insight node — Crafting/Upgrades and companion passive income are governed by entirely separate checks.
- **Hostile arousal attacks respect the toggle:** with `ContentToggle.HostileArousalAttacks` off, no enemy in any encounter ever selects an `isSexualAttack: true` ability, regardless of its `arousal`, its `miasmaReserve`, or the AI-weighting formula — the ability is filtered out of the usable pool entirely, not merely deprioritized.
- **Enemy sexual-attack selection scales with its own arousal:** across a large sample of turns, an enemy at `arousal: 90` selects its sexual attack (when it has sufficient `miasmaReserve`) measurably more often than the same enemy at `arousal: 10`, consistent with the `0.15` to `0.70` range in §23.1 — and an enemy with `miasmaReserve` below every usable ability's `miasmaCost` never selects one regardless of how high its arousal-weighted roll would otherwise favor it.
- **Miasma Reserve doesn't regenerate mid-fight:** an enemy that spends its entire `miasmaReserve` early in a long encounter has no path to recover it before that encounter ends — no passive regen, no enemy-side equivalent of Crest Charge.

---

## 12. Party Composition — A Single Party, No Active/Passive Split

Resolves an inconsistency in earlier sections directly: there is **one** party, not an "active" combat party plus a separate "resting" pool with its own rules.

- `PlayerCharacterState.partyMemberIds: CompanionId[]` (max 4) is the party, full stop. Every acquired companion not currently listed there simply isn't traveling with Kenji right now — she's at Ardor Manor, or her own residence, going about her schedule — there's no second formal list or ruleset governing her.
- **Swapping party members is gated by presence, not location safety.** A companion can be swapped **into** `partyMemberIds` at any time, from any location — including outside a safe hub — as long as she is *physically present at the player's current `currentLocationId` right now*. Removing a companion **from** the party has no such restriction — she can be left behind anywhere, immediately, and simply returns to her normal schedule. What's disallowed isn't "swapping outside safe locations," it's swapping in someone who isn't actually there to join you. (Swapping is still implicitly unavailable *during* an active Combat or Intimate Encounter, since those lock the turn/scene state until resolved — that's a property of being mid-encounter, not a location-safety rule.)
- **Determining presence:**
  - A companion with `movedIn: true` counts as present at **any** Ardor Manor location, at all times — she lives there now, full stop, no per-phase schedule needed.
  - A companion who is `acquired` but not yet `movedIn` follows her own `CompanionScheduleDef` — a `DayPhase -> LocationDef id` map matching her GDD-specified Home & Schedule (e.g. Mira: every phase resolves to `vv_shrine_cottage` — the region map gives her exactly one node, "Mira's Shrine Cottage," per §18.1/`world_map_seed_data.ts`; Morning/Afternoon/Evening/Night are flavor for what she's doing there at that hour, not four separate map nodes — Night has no entry regardless, asleep, absent, and thus not swap-able). She's present, and swappable, only at the location her schedule currently places her.
  - A companion already *in* `partyMemberIds` is trivially present wherever the player currently is — she's traveling with him.
- Every earlier reference to "the active party" (§5.2's combat cap, §7.2/§7.3's Sleep and regen rules, §13.2's Fatigue) means precisely "companions currently in `partyMemberIds`" — there is no other party-shaped list anywhere in `GameState`.

---

## 13. Companion Downed Recovery & Companion Fatigue

### 13.1 Partial Recovery for Downed Companions **[PROPOSED, new]**

On encounter **victory** (not a full wipe — §5.2 already covers that case with a full-party heal via Last Safe Location), any companion marked `downed: true` during the fight is restored to **25% of her current effective max HP** and has `downed` cleared. Enough to keep going, not enough to trivialize being downed — full recovery still needs Sacred Mend, a healing item, Shared Breakfast's +50 HP, or Sleep (§13.3 below).

### 13.2 Companion Fatigue **[PROPOSED, new]**

Mirrors the player's Fatigue system (§7.2) with one key difference — it's scoped to party membership:

- `CompanionRuntimeState.daysSinceLastSleep` only accrues for a companion currently in `partyMemberIds` at the moment a day ends without Sleep. A companion left at the Manor isn't the one being kept up all night, so hers doesn't move.
- When Sleep resolves, every companion in `partyMemberIds` at that moment has her own `daysSinceLastSleep` reset to 0 alongside the player's.
- The same Fatigue Level table and stat-multiplier penalties from §7.2 apply per-companion, computed against her own level-derived stats (§4.2).
- If the player's Forced Collapse triggers (`daysSinceLastSleep >= 5`), every companion in `partyMemberIds` at that moment is relocated to `lastSafeLocationId` alongside the player and has her Fatigue reset to 0 — but does **not** take the -20% current-HP penalty herself; that's specifically Kenji's body giving out, not hers.

### 13.3 Sleep Also Heals the Party **[PROPOSED, new]**

A loose end worth closing alongside these: Sleep (§7.2) now restores `currentHp` to `maxHp` for the player and every companion in `partyMemberIds`, in addition to the Stamina/CPW restoration already defined in §7.3. A companion recovered at 25% HP per §13.1 is a natural candidate for topping back up this way rather than needing an item immediately.

---

## 14. Crafting & Equipment Upgrade Systems

Two genuinely separate systems. **Crafting** creates new items; **Upgrading** improves an item you already own. Neither overlaps with the other — a recipe never targets an equipped item in place, and an upgrade never produces a new item. Both are now gated the same way: at Ardor Manor, once unlocked via the skill tree — not a town service NPC.

### 14.0 Item Material Tiers — Raw vs. Composite

Every non-equipment `ItemDef` (materials/consumables) carries a `materialTier`:

- **`Raw`** — base materials and ingredients (Star-Iron Ore, Moon-Mint Leaves, a Wolf Pelt). Never craftable — the only ways to obtain a Raw item are combat loot (§5.9), gathering-type Collection quests, or buying it from an `ItemVendor`. `craftingRecipeId` is always unset.
- **`Composite`** — the product of a `CraftingRecipeDef` (a Health Potion, a Refined Ingot, a Skill Scroll). `craftingRecipeId` always points at the recipe that produces it, so looking at the item tells you directly how it's made rather than needing to search every recipe for a matching `resultItemId`.
- **A Composite item can never itself be an ingredient in another recipe** — `CraftingRecipeDef.materialCosts` may only reference `Raw`-tier items. Deliberately decided against multi-step crafting chains (Composite feeding into another Composite): it would need more than this flat two-tier model to do well, and the added complexity isn't worth it for what this system needs to accomplish.

Equipment (`slot !== null`) doesn't use `materialTier` at all — a weapon or armor piece is neither Raw nor Composite in this sense; it has its own `equipmentCategory` instead (§14.2).

### 14.1 Crafting (New Items)

- **Unlock condition:** requires the player to have purchased the new **Artisan's Insight** Combat Skill Tree node (§22.2) — a Tier 2 passive, 4 BP. Without it, no crafting action is offered at all, anywhere.
- **Location condition:** only available at Ardor Manor, Tier 2+ (the Forge Workshop facility introduced at that tier, per the GDD's own Manor layout — §6 of the GDD already names a "Crafting Workshop & Alchemy" room). Not available at any town vendor, and not available while traveling.
- A `CraftingRecipeDef` consumes `materialCosts` (`Raw`-tier only, per §14.0) plus `goldCost`, and produces `resultQuantity` of `resultItemId` (always a `Composite` item).
- `craftTimeGameDays`: most recipes (potions, scrolls) are `0` (instant); a few higher-tier recipes **[PROPOSED]** take 1–3 game-days, resolved at a future day-end tick the same way Manor construction is (§15.3) — the result becomes collectible once the timer elapses.
- Crafting never touches `upgradeLevel` — a freshly-crafted weapon-tier item (if a recipe ever produces one) starts at `upgradeLevel: 0` like anything else newly acquired.

### 14.2 Equipment Upgrades — Two Modes, Gated by Manor Tier

- **Unlock condition:** identical to Crafting — requires **Artisan's Insight** (§22.2). Without it, neither upgrade mode is offered anywhere.
- Only targets items with `slot !== null` **and** `upgradable: true` — an explicit flag, not just "has a slot." This lets specific unique or quest-reward equipment be marked non-upgradable on purpose, distinct from ordinary gear.
- Every equippable `ItemDef` carries an `equipmentCategory`, which determines which stats an upgrade can roll into:

  | Category | Slots (typically) | Stat Pool | Theme |
  |---|---|---|---|
  | `Weapon` | MainWeapon, OffHand | STR, AGI, LCK | Attacking stats |
  | `Armor` | Head, Body, Legs, Feet, Hands (practical gear) | DEF, HP, WIS | Defensive stats |
  | `Clothing` | Underwear, Accessory1, Accessory2 (and Body/Legs items authored as fashion/lingerie rather than armor) | SEN, TEC, VIR, maxStamina, maxCrestPower | Erotic stats |

  Note this is about the **item's** authored category, not rigidly the slot it occupies — a Body-slot item can be authored as `Armor` (Healer's Robe) or `Clothing` (Sheer Nightgown) depending on what it actually is.

- **Mode 1 — Forge Workshop (Manor Tier 2+): Random, blind.**
  ```
  chosenStat = randomChoice(STAT_POOL[item.equipmentCategory])
  bonusAmount = randInt(1 + toUpgradeLevel, 3 + toUpgradeLevel)  // capped, scales slightly per step
  itemInstance.upgradeBonuses[chosenStat] += bonusAmount
  ```
  Costs `materialCosts` + `goldCost` only. **The player sees no preview of the possible stat pool or bonus range beforehand** — the result is revealed only after committing, a deliberate blind roll rather than a transparent one. Each step rolls independently and can land on the same stat as a previous step **by design** — three consecutive rolls hitting the same stat is a valid, expected outcome, not a bug to guard against. By `+3`, an item could have bonuses concentrated in one stat or spread across two or three, purely by chance.
- **Mode 2 — Alchemy Lab (Manor Tier 4+ only): Guided, transparent.**
  Once Tier 4 is reached, upgrading at the Alchemy Lab specifically lets the player **choose exactly which stat** from `STAT_POOL[item.equipmentCategory]` receives the bonus, for the same `materialCosts` + `goldCost` **plus** an additional `guidedSelectionGoldPremium` **[PROPOSED]** — paying for certainty instead of leaving it to chance. `bonusAmount` still resolves via the same `randInt(1 + toUpgradeLevel, 3 + toUpgradeLevel)` formula — only *which* stat receives it is guaranteed, not how much.
  This creates a real progression choice: cheaper and available earlier (Tier 2) but random, versus pricier and available only once the Manor is fully built out (Tier 4) but guaranteed — rather than the guided mode simply obsoleting the random one.
- This still mutates the specific item instance, not the definition — a `+2` Steel Sword and a `+0` Steel Sword share an `itemId` but are mechanically different items, and per §5.8's stacking rules, items at different `upgradeLevel` never stack together even when `itemId` matches.
- Upgrade paths remain linear **[PROPOSED]**: `+0 → +1 → +2 → +3`, each step costing progressively more materials/gold, capped at `+3` for now — raising the cap later is a content change, not a schema change.

---

## 15. Manor Passive Generation, NPC Daily Routines & Manor Construction Time

Three small, previously-unformalized GDD mechanics, each given a concrete default.

### 15.1 Passive Resource Generation **[PROPOSED, suggested; broadened this pass]**

Originally scoped to companions only — broadened here because generic NPCs can be invited to move in exactly like a companion can (§19's revised note), and there's no principled reason her passive generation would work but a moved-in Town Merchant's wouldn't.

- Every companion or generic `WorldNpcInstance` with `movedIn: true` has an associated passive-generation output: a companion's is her own bespoke `PassiveGenerationDef` matching her GDD flavor (Mira → Health Potions, Grael → a Sharpened Gear material, Isolde → Skill Scrolls, Tasha → straight gold, and so on); a generic NPC's is her `ProcNpcClassDef.passiveGenerationItemId` — class-level rather than individually authored, since individual NPCs aren't hand-written the way the 10 companions are (a Town Merchant produces gold regardless of which specific spawned instance moved in; a Farm Girl produces harvested goods; and so on per class).
- **Move-in eligibility for generic NPCs [NEW]**: a flat `TRUST_AT_LEAST 60 && LOVE_AT_LEAST 60` — the same numbers most companions already use as their own default — with no `questStage` component, since generic NPCs have none. There's no per-class or per-instance variation here, unlike companions' individually-authored `moveInRequirements`; procedural NPCs don't get that same bespoke treatment.
- **Independent of the player's own skill investment** — a resident produces regardless of whether the player has purchased Artisan's Insight (§14). This is her doing, not his; nothing about *his* crafting proficiency should gate what *she* makes on her own time.
- **Tied to relationship instead, and deliberately capped low**: production runs on `productionIntervalGameDays` **[PROPOSED: 2]** — one item every two game-days, not a daily rate. The relationship tie is really already expressed by `movedIn: true` itself (which already required Trust ≥ 60, Love ≥ 60 to reach, companion or NPC alike) — this isn't meant to scale further as Trust/Love climb past that point. It's a small flavor income tied to living there and caring about him, not a farmable production line.
- Accumulates in `ManorState.pendingPassiveGeneration[occupantId].accumulatedQuantity` — keyed by `occupantId` (a `CompanionId` or a `WorldNpcInstance.instanceId`, per `ManorState.suites`'s revised shape) — capped at her `capacity` **[PROPOSED: 10]** — generation simply pauses at the cap rather than overflowing or being lost, so forgetting to collect for a while doesn't waste anything within that ceiling.
- The player collects via a `[Collect]` action at the Manor itself (not part of the Universal Interaction Menu, since it targets the Manor, not an NPC) — items go to the bag (subject to §5.8's normal overflow handling), gold goes straight to `PlayerCharacterState.gold`.

### 15.2 World NPC Daily Routines **[PROPOSED, suggested]**

- Each of the 10 procedural NPC classes (§8.1 of the GDD) gets one `NpcScheduleDef` — a lightweight `DayPhase -> LocationDef id` map, authored once per class, not per spawned instance. E.g. a Town Merchant: Morning/Afternoon → market stall, Evening → tavern, no entry for Night/Midnight (home asleep, not spawned as an interactable instance).
- At every phase advance, every `WorldNpcInstance` whose class has a schedule entry for the new phase has its effective location updated to match. This remains a simple location-membership swap for background NPCs — not a pathed journey across §18's graph — a deliberate simplification: the player's own movement is worth simulating with real pathing and encounter risk, but background NPC schedules don't need the same fidelity to feel right.
- A class with no schedule entry for a phase simply isn't present as an interactable instance during it, matching the GDD's own "commoners sleep at night" framing (§6.3 of the GDD).

### 15.3 Manor Construction Time **[PROPOSED, suggested]**

- Paying a Manor tier's upgrade cost sets `ManorState.constructionState = { targetTier, daysRemaining }` immediately — gold/materials are deducted upfront, when construction *starts*, not when it finishes.
- `daysRemaining` **[PROPOSED]**: Tier 2 = 3 days, Tier 3 = 5 days, Tier 4 = 7 days, decrementing by 1 at every day-end tick. At 0, `ManorState.tier` updates to `targetTier`, `constructionState` clears, and the new tier's facilities unlock.
- The Manor stays fully usable throughout — existing suites, storage, and cohabitation perks keep working; only the *new* tier's facilities (extra suites, Bathhouse, Alchemy Lab) are locked until completion.

---

## 16. Fast Travel

- Requires the destination to already be in `PlayerCharacterState.discoveredLocationIds` (visited on foot at least once) — no fast-traveling somewhere never seen.
- Only usable from a location with `isSafe: true`, via a `ServiceNpcDef` with `serviceType: FastTravel` or a general map UI once unlocked.
- **Cost formula** **[PROPOSED]**:
  ```
  hopCount = countRegionCrossings(shortestPath(currentLocationId, destinationLocationId, PathEdgeDef graph))
  cost = sameRegion ? 10 : 10 + (25 × hopCount)
  ```
  `hopCount` is the number of `crossesRegionBorder: true` edges along the shortest path — computed from the same location graph that drives standard travel (§18), not a separately-maintained region-level adjacency structure. Same-region travel is a flat 10 gold; cross-region cost scales with how many region borders the path actually crosses.
- The GDD's *"Fast Travel Cost 0"* achievement (§20.4 of the GDD) sets `cost` to 0 unconditionally once unlocked — checked ahead of the formula above, not folded into it.

---

## 17. Bounty Payoff

No separate tracker — a bounty is simply whatever the current `reputationScore` implies, computed fresh at the moment the player tries to pay it off. This sidesteps the reconciliation problem a stored value would create entirely: there's nothing to go stale, because nothing about it is persisted between the reputation dropping and the player deciding to pay.

- A region is "Wanted" (has an active bounty at all) exactly when `reputationScore <= -300` (Infamy Level 3+, §4.1) — this is read directly off the existing field, not tracked separately. A `BountyOffice` simply won't offer a payoff option at all when a region's `reputationScore` is above -300.
- Paying it off requires a `ServiceNpcDef` with `serviceType: BountyOffice` **in the same region as the bounty** — matching the GDD's "regional guard headquarters or merchant guild offices" framing.
- **Cost, computed at payoff time** **[PROPOSED]**:
  ```
  bountyAmount = round(abs(reputationScore) × 2)
  payoffCost   = round(bountyAmount × 1.2)  // 20% administrative fee
  ```
- On payment: `reputationScore` rises to `max(reputationScore, -299)` — just below "Wanted." This matches the GDD's claim that paying bounties "reduces Infamy" while keeping it a partial fix: the player stops being actively hunted, but doesn't get a full reputation reset for the price of the bounty alone — remaining Infamy still needs natural decay (§5.4) or Restitution Quests/Reva's/Tasha's connections (§10.3 of the GDD).
- **This is what actually reconciles with natural decay**, resolving the previous audit's open question outright rather than patching around it: if §5.4's decay alone carries `reputationScore` back above -300 before the player ever visits a `BountyOffice`, there was never a separately-tracked bounty value to go stale — the "bounty" simply stops existing the moment `reputationScore` crosses back above the threshold, because it was never anything more than a live read of that same number.

---

## 18. World Movement Model — Explorable Map with Pathing

Resolved: this is a real explorable graph-based map, not menu-based teleportation. The GDD's own ASCII region maps (§18.1–18.6 of the GDD) are the authoritative source for this — each of those diagrams is already, informally, exactly the node-and-edge graph described below, so authoring `PathEdgeDef` data per region is a transcription task against content that already exists, not new invention. **That transcription is now done** — see §18.5 below.

### 18.1 The Graph

- Every region's set of `LocationDef`s are nodes; `PathEdgeDef` entries are the edges connecting them, directly matching the GDD's ASCII layouts (e.g. Verdant Vale's `[NORTH MEADOWS] ── [MIRA'S SHRINE COTTAGE]` connections become literal `PathEdgeDef` rows).
- Some edges have `crossesRegionBorder: true` — these are the specific connective locations already named in the GDD (Verdant Vale's South Highway ↔ Aethermoor, etc.) — so region-to-region travel is not a separate mechanism from in-region travel, just a longer path through the same unified graph.
- `travelSegments` on each edge is the number of individual map-traversal actions (§5.11's encounter-roll trigger) required to cross it — a short in-town connection might be 1 segment; a long stretch of open road between regions might be 3–4 **[PROPOSED, tuned per edge during content authoring]**.

### 18.2 Standard Travel Resolution

- The player selects any discovered destination location (not just a directly-adjacent one) from the map UI. The engine computes the shortest path across the full graph (by total `travelSegments`, via Dijkstra/BFS — edges aren't uniform weight) and resolves the **entire journey server-side in one action**, rather than requiring a separate request per segment.
- Each segment along the path independently rolls the §5.11 encounter chance (scaled by `DayPhase` per §7.1). If an encounter triggers, it resolves fully (combat, loot, Defeat Outcome Menu choices, etc.) before the journey continues to the next segment — the response to a single "travel" action can therefore contain a full log of everything that happened en route, not just the arrival.
- `currentLocationId` only updates once every segment of the path has resolved successfully — a multi-segment edge doesn't leave the player "half-way" between two locations in persisted state. If a full party wipe occurs on any segment, the Last Safe Location recovery (§4.11/§5.2) simply overrides the intended destination — the player ends up at `lastSafeLocationId` instead of wherever they were traveling to, exactly as it already works for wipes triggered any other way.
- This deliberately avoids persisting any "journey in progress" state across separate requests — a single travel action is atomic from the API's perspective, which is both simpler to implement and a better fit for a request/response web app than trying to model a resumable multi-step journey.

### 18.3 Fast Travel Reconciled

§16's fast-travel `hopCount` is now computed directly from this same graph — count the number of `crossesRegionBorder: true` edges along the shortest path between the current and destination locations — rather than maintaining a separate simplified region-adjacency structure. One graph, two uses: full pathed travel for the standard case, a cost lookup for the paid shortcut.

### 18.4 Maps

The map UI renders each region's `LocationDef`s using their `mapX`/`mapY` coordinates, connected by `PathEdgeDef` lines — a real explorable graph view, not a plain list. Coordinates are for rendering only; all actual pathing logic runs on the graph structure, never on visual position.

### 18.5 Full Transcription — `world_map_seed_data.ts`

All 6 of the GDD's ASCII region maps (§18.1–18.6, including the Vale Village Inn, Grael's Smithy, and Grand Library building sub-maps) are transcribed in full into a new companion file, `world_map_seed_data.ts` — 81 `LocationDef`s and 92 `PathEdgeDef`s, programmatically verified: zero duplicate IDs, every edge references a real location, the graph is fully connected with zero orphaned locations (all 81 reachable from `vv_ardor_manor`), and every `crossesRegionBorder` flag correctly matches whether its two endpoints actually sit in different regions.

**A real gap the transcription itself surfaced:** the world map names an 8th region — **Mountain Monastery**, Sera's home (Act 4/5) — that was never in the `Region` enum and had no detailed layout anywhere. Added properly rather than dropped: `Region.MountainMonastery` in `schemas.ts`, a `RegionMonsterProfile` row in §5.11 (level 22–32, MiasmaCorrupted/Humanoid/Beast), and a new regional map inside `world_map_seed_data.ts` (that file's own internal §18.7 comment block — not a subsection of this document, which only goes to §18.5) — clearly marked as new authoring, not a transcription, built from Sera's already-established aesthetic (penitent veil, mourning vestment, night-sensitivity) rather than invented from nothing. Its full enemy bestiary and final boss were a separate, later gap, since closed — see §2.2's file table for `mountain_monastery_enemies_seed_data.ts`.

A few smaller additions the source diagrams implied but didn't explicitly draw, each flagged individually in the file: an East Gate connecting Aethermoor to Crimson March (needed for the world map's edge, absent from Aethermoor's own regional diagram), a Secret Archive off Reva's Suite (this is "Reva's Secret Ledger," already referenced in §5.2's nighttime-infiltration content, but never previously placed on any map), and short "Ascension Path"/"Sanctum Descent" connector nodes carrying the graph onward to Sunken Sanctum and Celestial Threshold.

Two reconciliations against content already written elsewhere in this document: Mira's `CompanionScheduleDef` (§12) previously listed four separate named places for her four `DayPhase`s; the actual map gives her exactly one node, so all four phases now resolve to the same `vv_shrine_cottage` location. And Act 1's final chapter (§24) originally read "The Blighted Treant of the Hill Shrine" — the map names this location "Ley Node Grove," so the chapter's `displayName` is corrected to match.

Ardor Manor's own interior deliberately has no sub-map in this file, matching the source material — unlike the Inn/Smithy/Library, no interior layout was ever given for it, and its rooms are already handled through `ManorState`/`assignedSuiteId` elsewhere in this document.

---

## 19. Character/NPC Status Display — Contact List & Contact Profile **[expanded, this pass]**

Two screens, not one: a **Contact List** (who's worth checking on) and a **Contact Profile** (everything about one of them). Both are read-only queries assembled on demand from existing state — never new persisted state of their own, so there's no risk of either view drifting out of sync with the underlying `GameState`.

### 19.1 Contact List

- Populated from every companion (`CompanionRuntimeState` for all 10, regardless of `acquired`/`movedIn` status once she's been met) plus every `WorldNpcInstance` with a `displayName` set — i.e. every individuated generic NPC, per §19.4's corrected trigger (her first `Talk`, not a `trustLove` threshold). **Corrected this pass**: an earlier version of this rule gated Contact List membership on `trust !== 0 || love !== 0` directly, which doesn't hold anymore now that individuation itself is what §19.4 actually keys off of — a freshly-introduced NPC can be named and on this list while her `trustLove` is still exactly neutral. A hostile NPC with `trust: -40` still belongs on this list exactly as much as a beloved one at `+80`, same as before — that part didn't change, only what actually puts her here in the first place.
- Each row is a `ContactListEntry`: `contactId`, `isCompanion`, `displayName`, `portraitAssetId`, and `relationshipStatus` (via §4.3's grid, or `narrativeOverride` if a scripted event set one).
- Sort order **[PROPOSED]**: companions first (by `questStage` descending, so the deepest relationships surface first), then generic NPCs sorted by `|trust| + |love|` descending — the most significant relationships, positive or negative, float to the top of their section.
- Offspring (`OffspringNpc`) are **not** contacts — they're surfaced separately via §15.3's own systems, not folded into this list.

### 19.2 Contact Profile

Tapping a `ContactListEntry` assembles a full `ContactProfileView`. Every field's source, none of it newly stored:

| Field | Source |
|---|---|
| `contactId`, `isCompanion` | Same as the list entry |
| `displayName` | `CompanionDef.displayName` (companions); `WorldNpcInstance.displayName` (generic NPCs — only ever present once individuated, §19.4; a generic NPC can't appear in the Contact List at all before that point, so this is never undefined for anything actually shown here) |
| `portraitAssetId` | `CompanionDef.appearance.portraitAssetId` (companions) or `ProcNpcClassDef.appearance.portraitAssetId` (generic NPCs — archetypal, not per-instance) |
| `trueAge`, `apparentAge` | `AppearanceDef` — both shown where they diverge (elves, dryads); only `apparentAge` shown otherwise |
| `race` | `CompanionDef.race` (companions) — generic NPCs don't carry an individual `race`, since `ProcNpcClassDef` doesn't assign one (the 10 classes are ordinary townsfolk, not tied to a specific race) |
| `appearance.gender` | `AppearanceDef.gender` for Kenji and all 10 companions (always `MALE`/`FEMALE`, never `VARIES`); `WorldNpcInstance.gender` for generic NPCs — the individual's own rolled gender (§19.4), **not** her class's archetypal `ProcNpcClassDef.appearance.gender`, which can legitimately be `VARIES` and is never what an actual contact's profile should display |
| `appearance.bodyDetails` (incl. `hasBreasts`/`hasPenis` and their conditional sub-fields) | `AppearanceDef.bodyDetails` — present for Kenji and all 10 companions; omitted for the 10 procedural classes, since an archetype spanning many spawned instances shouldn't be pinned to one individual's measurements |
| `appearance` (incl. `bodyDetails`/`racialFeatures`) | `CompanionDef.appearance` (companions, per-individual) or `ProcNpcClassDef.appearance` (generic NPCs, archetypal) |
| `love`, `trust` | `trustLove.love`/`trustLove.trust` |
| `relationshipStatus` | §4.3's grid lookup, or `trustLove.narrativeOverride` |
| `thoughtsAboutPlayer` | The highest-Trust/Love-eligible `CharacterThoughtDef` for this `characterId`, if any qualify — §19.3 |
| `homeRegion` | `CompanionDef.homeRegion` (companions); `WorldNpcInstance.region` (generic NPCs) |
| `homeLocationId` | `CompanionScheduleDef` — undefined for generic NPCs, who have no individual schedule |
| `currentLocationId` | Resolved live from `CompanionScheduleDef`/`DayPhase` if `acquired && !movedIn` (companions); "present anywhere in Ardor Manor" if `movedIn` — companion or generic NPC alike, per the revised §15.1; `WorldNpcInstance.region`'s hub location for generic NPCs who haven't moved in |
| `currentStage` | `questStage` — companions only; see the parity note below for why |
| `combatRole` | `CompanionDef.combatRole` — companions only; see the parity note below |
| `status` | Synthesized: `"In Party"` if in `partyMemberIds`, else `"Moved In"` if `movedIn` — **companion or generic NPC alike**, corrected this pass — else `"Acquired"` if `acquired`, else `"Met"` for companions; `"Known"` for a generic NPC who hasn't moved in |
| `virginityStatus` | `!firstIntimacyCompleted` → `"VIRGIN"`, else `"NON_VIRGIN"` — no separate stored field, deliberately; this would otherwise be the same fact tracked twice |
| `pregnancyStatus` | `pregnancy` |
| `lactationStatus` | `lactating` |
| `crestBondManifested` | Equals `firstIntimacyCompleted` — the Crest of Ardor's own established premise ties its visible manifestation to genuine sincere intimacy having occurred at least once; this isn't a second mechanic, just that same fact surfaced under a different label for the profile screen |
| `sexualStatus` | Computed per `SexualStatusId`'s own rule (schema comment) from `firstIntimacyCompleted` + `satisfiedKinkIds.length` + relationship tier |
| `currentCombatStats` | Computed via §4.2's growth formula from `levelProgression` — companions only |
| `currentEroticStats` | `eroticStats` **[NEW field, this pass]** — added to both `CompanionRuntimeState` and `WorldNpcInstance`; before now, `EroticStats` existed only on `PlayerCharacterState`, so a companion's own current SEN/TEC/stamina had no data source at all. Omits `virility`/`crestPower`, both Kenji-specific. |
| `specialAbilityId`, `passiveAbilityId` | `CompanionDef` — companions only |
| `kinkProgress`, `satisfiedKinkIds` | Same fields, identical rules for companions and generic NPCs (§26.2) |
(GAP - firstIntimacyCompleted is not present for NPC contacts)
**Parity, corrected this pass.** An earlier version of this section implied generic NPCs carry a meaningfully thinner profile than companions. That was wrong, and worth stating plainly rather than quietly fixing: the Contact List already included every non-neutral NPC, not just the 10 companions, and a moved-in Town Merchant's relationship, body, intimacy, and kink data are exactly as real and exactly as fully tracked as a companion's — same `trustLove`, same `eroticStats`, same `kinkProgress`/`satisfiedKinkIds`, same move-in eligibility and passive generation (§15.1), same `virginityStatus`/`pregnancyStatus`/`lactationStatus`/`sexualStatus`. The only fields that are genuinely companion-exclusive are `currentStage` (`questStage` — generic NPCs have no personal romance questline to advance), `combatRole`/`specialAbilityId`/`passiveAbilityId`/`currentCombatStats` (tied to being a designed, levelable party member — `partyMemberIds` is typed to the 10 `CompanionId`s specifically, and generic NPCs were never given their own `levelProgression`/`baseCombatStatsAtLevel1` to compute from), and having a bespoke `CharacterDialogueTreeDef`/quest chain rather than the shared per-class `GenericNpcDialogueSetDef`. That's the actual, narrow difference: her own storyline and her own place in the party, not a lesser claim to being known, loved, or invited to live at the Manor.

`appearance` is the one place a real (if honest) limitation remains: a generic NPC's appearance is her `ProcNpcClassDef`'s archetype, not an individually-authored one — there's no mechanism for procedurally varying height, coloring, or body details per spawned instance the way there is for the 10 hand-written companions. A Farm Girl the player has fallen for looks like the Farm Girl archetype, not a unique individual. That's a real simplification, not a design choice being defended as equivalent — flagged here rather than glossed over.
(GAP - have a NPC spawn mechanism which generates all properties required for a contact - offspring mechanism can be reused here(or rather offspring mechanism should be using this with a differnt set of seed values.).)

### 19.3 Character Thoughts — "Thoughts About Player"

A new small pool, `CharacterThoughtDef` (schema, previous section) — a private reaction to Kenji, shown only on the Contact Profile, never spoken aloud as dialogue. Gated by the same `DialogueCondition` types dialogue already uses (`TRUST_AT_LEAST`, `LOVE_AT_LEAST`, `QUEST_STAGE_AT_LEAST`, `STORY_FLAG_SET`/`UNSET`) rather than inventing a parallel condition language. When multiple entries for a `characterId` are simultaneously eligible, the view shows whichever has the highest combined `TRUST_AT_LEAST`/`LOVE_AT_LEAST` threshold — the most current, most emotionally advanced thought available, not the first match found. If none qualify yet (freshly met, still neutral), `thoughtsAboutPlayer` is simply `undefined` and the profile screen shows nothing in that slot rather than a placeholder.

**Applies to generic NPCs too, not just companions [clarified this pass]** — `CharacterThoughtDef.characterId` is typed as a bare `string` specifically so it can hold a `CompanionId`, a named story NPC id (`"astraea"`), *or* a `procNpcClassId`. A generic NPC's `thoughtsAboutPlayer` resolves against her `templateClassId`'s shared thought pool, the same relationship the existing `GenericNpcDialogueSetDef` already has to its class — one shared bank per class rather than one per spawned instance, since individual NPCs aren't hand-authored the way the 10 companions are. `QUEST_STAGE_AT_LEAST` conditions simply never match for a generic NPC (she has no `questStage` to satisfy them), which naturally narrows her eligible pool to whatever's gated on `TRUST_AT_LEAST`/`LOVE_AT_LEAST`/story flags alone — no special-casing required, the existing condition system already handles it.

### 19.4 NPC Gender, Individuation, and the Contact List Cap **[NEW]**

**Gender is always resolved to one specific value at spawn — never `VARIES`.** `ProcNpcClassDef.appearance.gender` describes the *archetype's range* (`VARIES` for the 6 classes whose name doesn't imply one, `FEMALE` for the 4 that do). `WorldNpcInstance.gender` is the *individual's* actual gender, rolled once at spawn time from that range — `MALE` or `FEMALE` specifically. A class being mixed doesn't make any single real spawned person mixed; it just means the pool she was drawn from wasn't pre-committed to one gender.

**Individuation — becoming a real, named character. [Corrected]** An earlier version of this section tied individuation to `trustLove` first deviating from neutral. That's the wrong trigger — learning someone's name happens when you first talk to them, not only once your relationship has numerically moved. The actual rule: every `WorldNpcInstance` starts anonymous — no `displayName`, just population flavor governed by `LocationPopulationDef`. The moment the player's very first `Talk` action against her resolves — regardless of whether it changes `trustLove` at all — *and* the Contact List currently holds fewer than 100 entries, she is individuated: rolled a `displayName` from `MALE_NPC_NAMES`/`FEMALE_NPC_NAMES` (`npc_name_pools_seed_data.ts`) matching her already-rolled `gender`, and from that point on she's a real character — the same one, remembered, not a fresh anonymous roll next time that `LocationPopulationDef` slot refreshes. That first `Talk` should itself be a proper introduction exchange in which she gives the name that was just rolled — see the gap noted below; the content and mechanism for that doesn't exist yet.

**The 100-contact cap.** If the Contact List is already at 100 when a first `Talk` would otherwise cause individuation, the interaction still happens and any `trustLove` change from it still applies normally per §4.3 — the cap doesn't make talking to her mechanically inert — but she isn't named and doesn't join the Contact List yet, and the conversation itself falls back to `GenericNpcDialogueSetDef`'s ordinary (non-introduction) content rather than one that promises a name she isn't getting. The next time any `Talk` would individuate *someone*, the check runs again; the first such moment after a slot has freed succeeds. This is deliberately about **Contact List size specifically**, not a freeze on the world's underlying population — `LocationPopulationDef`'s ordinary anonymous refresh cycle (§5.10/§15.2) keeps running unaffected regardless of how full the Contact List is; only the *naming* step is gated.

(GAP - lets make the contact cap to 200)

**Removal — two mechanisms, and a clarification the cap surfaced.** A named NPC's Contact List slot frees up via either: (1) **Permanent Removal** (the GDD's sixth Defeat Outcome Menu option, §10.2 of the GDD) if she's engaged in combat and defeated — the GDD's own restriction, "not usable on named/story-critical characters," refers to *narratively* named characters (the 10 companions, Astraea, named quest-critical NPCs like High Inquisitor Malakor) established as such in the story, **not** to a Town Merchant who happens to have an auto-rolled `displayName` from a bookkeeping name pool. Stated explicitly here because the two meanings of "named" could otherwise read as contradictory; or (2) a new, non-lethal **"Remove Contact"** action available directly from her Contact Profile screen — narratively representing her moving on/moving away, freeing her slot without violence being the only option. Either path clears her `displayName` (returning her to anonymous population going forward under a fresh `instanceId` if she's ever regenerated), removes her Contact List entry, and — if she was `movedIn` — vacates her `assignedSuiteId` back into `ManorState.suites`' available pool.



---

## 20. Autosave — Nightly, Separate File

- Triggers automatically at every day-end tick (§7) — once per in-game day, matching "every night" — writing to a dedicated, always-overwritten file, `/data/saves/autosave.json`, entirely separate from the player's manual save slots (`slot-1.json`, `slot-2.json`, `slot-3.json`).
- Uses the same atomic-write and Zod-validation rules as manual saves (§6) — no special-casing there.
- The player can load `autosave.json` exactly like any manual slot, but a manual save is never at risk of being silently overwritten by it — the whole point of the separate filename.

---

## 21. Status Effect System (Combat & Sexual)

Two catalogs, never sharing a pool.

### 21.1 Combat Status Effects

`CombatStatusEffectId`: `DefenseDown`, `DefenseUp`, `WisdomDown`, `AttackUp`, `PartyAttackUp`, `PartyDefenseUp`, `DodgeUp`, `CounterReady`, `Confusion`, `Stun`, `Root`, `Blind`, `Burn` (damage over time), `Regen` (heal over time), `Shield` (damage reduction/absorption — magnitude meaning depends on the source skill), `Surprised` (the Night/Midnight ambush marker, unified with §7.1's boolean flag).

### 21.2 Sexual Status Effects

`SexualStatusEffectId`: `Shivering` (Nipple Sorcery's full-body shiver), `Sensitized` (increased Arousal gain rate), `Synchronized` (Twin Rhythm's linked Arousal gain), `Edging` (a near-climax lock from the Edging/Orgasm Delay act — Arousal gain pauses just under 100 until released), `TraumaDebuff` (the GDD's post-Force-Intimacy NPC state, §10.3 of the GDD — reduces future Trust gain for that NPC until cured, per §10.3.5's "never permanent" rule).

### 21.3 Shared Mechanics

- `StatusEffectInstance.remainingDurationTurns` is a turn countdown, or `-1` meaning "lasts until the encounter/scene ends, or until a specific consuming trigger fires (e.g. Crest Shield absorbing its one hit), whichever comes first."
- **Stacking [PROPOSED]**: reapplying an active effect refreshes `remainingDurationTurns` and increments `stacks` up to `maxStacks` — durations never add together. `magnitude` scales with current stack count where relevant (Defense Down at 2 stacks is deeper than at 1).
- **Fatigue isn't stored here.** §7.2/§13.2's Fatigue keeps `daysSinceLastSleep` as its own source of truth rather than living inside `statusEffects` — a UI that wants to *display* Fatigue alongside other statuses can synthesize a read-only `StatusEffectInstance`-shaped entry for presentation without that becoming a second place the value is actually stored.

---

## 22. Skill/Ability Effect Catalog

Concrete effect for every node in both trees, resolving `SkillNodeDef.effect` from a bare string key into an actual mechanical definition. AP/BP costs and tiers originated in the GDD's own §11/§12 tables, but are no longer only there — every node's actual `tier`/`pointCost`/`cpwCost`/`prerequisiteNodeIds` now exists as real, delivered data in `skills_seed_data.ts` (48 nodes across both trees, including the tier-gating dependency graph the original tables never specified — see that file's own header comment for the fix and its reasoning). The effect column below is what's new in this section specifically.

### 22.1 Sex Skill Tree (Ardor Points)

| Skill | Effect Key | Mechanical Effect |
|---|---|---|
| Reading the Room | `reveal_partner_ui` | UI-only: reveals live Arousal meter and state. No kink information — there's nothing pre-assigned to preview (see Kink Encyclopedia below). No stat effect. |
| Kink Encyclopedia *(new, §26.3)* | `unlock_kink_encyclopedia` | Passive: unlocks a UI screen browsing the full global `KinkDef` catalog (name, category, description, attachment condition), plus, for any character met, her current `kinkProgress`/`satisfiedKinkIds`. Tier 1, 3 AP — no combat/intimacy effect of its own. |
| Attentive Touch | `touch_arousal_boost` | +25% partner Arousal gain from Touch actions, this turn only. |
| Whispered Word | `midscene_trust_boost` | +5 Trust immediately, applies mid-scene. |
| Grounding Warmth | `clear_negative_arousal_state` | Immediately raises partner Arousal to at least 40 if currently below (clears Cold/Shy states). |
| Paternal Patience | `slow_self_arousal` | Passive: Kenji's own Arousal gain rate -20%. |
| Pressure Point Precision | `targeted_arousal_burst_20` | +20 flat partner Arousal, this turn. |
| Grip and Release | `rhythm_arousal_burst_15` | +15 partner Arousal via surprise pressure-alternation. |
| Deep Confession | `confession_trust_love_boost` | +10 Love, +15 partner Arousal. |
| Spanking Artistry | `spank_effectiveness_up` | Spank actions +50% effectiveness; explicitly applies no Trust penalty. |
| Nipple Sorcery | `apply_shivering` | Applies `Shivering` (§21.2) to partner, 2 turns, +15% Arousal gain rate while active. |
| Twin Rhythm | `apply_synchronized` | Applies `Synchronized` to both parties, 3 turns: each turn, both Arousal values move 50% of the way toward whichever is higher. |
| Crest Infusion | `cure_trauma_debuff` | Instantly removes `TraumaDebuff` (§21.2) from the target NPC. |
| Cervix Harmonizer | `deep_arousal_burst_30` | Requires a Penetrative Vaginal position; +30 flat partner Arousal, this turn. |
| Instinctive Read | `auto_pass_one_tec_check` | Passive: the first TEC check (§4.7) each scene auto-passes, no roll. |
| The Sincere Act | `context_best_bonus` | Grants whichever single bonus (+20 Arousal, +15 Love, or clearing a negative status) best fits current scene state — engine picks, by design unpredictable. |
| Lactation Resonance | `unlock_lactation` | Unlocks/stimulates milk flow for pregnant/postpartum partners; can induce non-maternal lactation in non-pregnant Acquired companions per the GDD's §15.2. |
| Exquisite Release | `simultaneous_climax` | Sets both Kenji's and partner's Arousal to 100 immediately. |
| Afterglow Master | `post_scene_gain_multiplier` | Passive: post-scene Trust/Love gains (§13.4 of the GDD) ×1.5. |
| Virile Overflow | `conception_multiplier_boost` | Passive: Crest Bonus term of the conception formula (§4.5) ×3; overall conception chance +35%. |
| Ardor's Blessing | `story_purge_ritual` | Story-gated only — not usable outside a scripted Ley Node purge; grants the GDD's +10 to +20 Astraea Approval on use. |
| Crest Resonance | `lock_shared_bliss` | Locks both parties' Arousal at 100 for the remainder of the scene (persistent, unlike Exquisite Release's one-time set). |
| World's Warmth | `manor_scenes_heal_region` | Passive: every Intimate Encounter completed at Ardor Manor grants +1 regional Miasma-cleansing tick. |
| Divine Contact | `unlock_cosmic_tier_content` | Gating flag only — required prerequisite for Astraea's and Lyra's cosmic-tier scenes (Act 6+). |
| Eternal Seed of Ardor | `guarantee_legendary_offspring` | Passive: any resulting `OffspringNpc` gets a bonus legendary-passive flag; required for Astraea's Divine Scion conception (§15.1 of the GDD). |

### 22.2 Combat Skill Tree (Battle Points)

| Skill | Effect Key | Mechanical Effect |
|---|---|---|
| Solid Strike | `basic_attack` | Standard weapon attack, §4.4's damage formula, no modifier. |
| Power Strike | `str_damage_boost_50` | +50% on the `baseDamage` term of §4.4 for this attack. |
| Hold the Line | `apply_defense_up_self` | Applies `DefenseUp` to self, +12 flat DEF, 2 turns. |
| Lucky Break | `dodge_crit_passive` | Passive: +20% dodge chance specifically against incoming critical hits. |
| Crest Flash | `holy_aoe_dispel` | AOE holy damage (WIS-scaled, §4.4) to all enemies; strips one buff stack from each target hit. |
| Iron Guard | `apply_shield_self_70` | Applies `Shield` to self: 70% damage reduction, 1 turn. |
| Ardent Pulse | `wis_aoe_damage` | AOE damage to all enemies, WIS-scaled via §4.4. |
| Read the Fight | `mark_highest_threat` | Sets `CombatEncounterRuntimeState.markedThreatCombatantId` to the highest-maxHp enemy; party attacks vs. that target +20% damage for the rest of the encounter. |
| Companion Call | `trigger_companion_special_now` | Immediately triggers the chosen companion's `specialAbilityId`, out of normal turn order. |
| Crest Shield | `apply_shield_self_100_next_hit` | Applies `Shield` to self: 100% absorption, consumed by the next incoming attack rather than ticking by turn. |
| War Cry of the Sincere | `apply_party_attack_up` | Applies `PartyAttackUp` to all party members, +20%, 2 turns. |
| Seasoned Resolve | `low_hp_damage_reduction` | Passive: below 40% HP, incoming physical damage -15%. |
| Artisan's Insight *(new, §14)* | `unlock_crafting_and_upgrades` | Passive: unlocks Crafting (§14.1) and Equipment Upgrades (§14.2) at Ardor Manor Tier 2+. Tier 2, 4 BP — no other combat effect. |
| Crushing Blow | `single_target_220pct` | Single-target attack, final §4.4 damage ×2.2. |
| Combo Strike | `three_hit_escalating_combo` | 3 sequential hits, each independently rolled, each +25% damage over the last if the prior hit landed. |
| Counter Stance | `apply_counter_ready` | Applies `CounterReady` to self, 1 turn; a successful dodge while active triggers a free 100%-STR counter-attack. |
| Crest Nova | `wis_aoe_damage_150pct` | AOE damage to all enemies, WIS-scaled, ×1.5 relative to Ardent Pulse. |
| Empathic Strike | `bonus_vs_miasma_corrupted` | Single-target attack, +100% damage specifically when `target.monsterType === MiasmaCorrupted` (§5.11). |
| Protector's Reflexes | `auto_intercept_low_hp_companion` | Passive: when any party companion is below 25% HP, the player automatically redirects her next incoming attack onto himself. |
| Unyielding Vitality | `self_hp_regen_per_turn` | Passive: +8 HP to self per combat turn. |
| Sanctum's Force | `boss_only_wis_nuke_300pct` | Single massive holy nuke, WIS-scaled, ×3.0 relative to Solid Strike — restricted to `isBossEncounter: true` encounters only. |
| World's Champion | `party_all_stats_up_20` | Passive: every companion in `partyMemberIds` gains a flat +20 to every `CombatStats` value while this node is owned. |
| The Last Sincere Blow | `unlock_compassion_path` | Not a usable action — a story-gating flag required to unlock the Act 7 Final Boss's Compassion Path (Phase 3B of the GDD). |

---

## 23. Purification — Folded Into a Single Defeat Outcome

Originally specced as a separate "Hybrid Combat+Intimacy Encounter" mode reserved for one designated Act 5 boss, then generalized to every purifiable enemy. This pass simplifies it one step further: killing and purifying aren't two different win conditions to reason about — they're the same outcome, **defeated**, reached by two different paths. The only thing that actually varies is a small reward nudge, not a second victory state.

### 23.1 How It Works

- **No more `isHybridEncounter` flag, no more separate runtime type.** Every `CombatCombatantRuntime` — player, companion, or enemy alike — carries a single `arousal: number` (0–100). For most fights this field simply never moves, because nothing in that encounter raises it; it costs nothing to have it sit unused.
- **An enemy is "defeated" the moment either `currentHp` reaches 0 or `arousal` reaches 100 on a purifiable `MonsterType`** — mechanically one check, not two separate conditions the engine treats differently. `Construct` and `Cosmic` are the only two non-purifiable types **[PROPOSED]** — a golem or a one-off cosmic entity like the Primordial Ache isn't a corrupted living thing in the sense Sex Skills can reach; everything else (`Beast`, `MiasmaCorrupted`, `Draconic`, `Humanoid`, `VoidAberration`) can be defeated either way, freely mixed within the same fight — a 4-wolf pack could end with two killed by the sword and two defeated via arousal, no differently than if all four had just been killed.
- **Raising an enemy's arousal** happens the same way raising a partner's Arousal does in an Intimate Encounter: Sex Skill actions (§22.1's catalog) are available on the combat turn menu against any purifiable enemy, and their existing effects (e.g. Pressure Point Precision's +20 flat burst) apply directly to that enemy's `arousal` field instead of an Intimate Encounter partner's. No second copy of the skill catalog needed — the same 24 Sex Skill Tree nodes work in either context, just retargeted.
- **Raising the player's or a companion's own arousal** works the same way in reverse — some enemies (not all) have a sexual attack in their `abilityIds` pool (an `EnemyAbilityDef` with `isSexualAttack: true`), and using it targets a combatant's `arousal` instead of dealing HP damage, per the targeting rule below. This remains an authored, per-enemy choice — a plain Direwolf simply has no such ability and will never raise anyone's arousal; only enemies deliberately given one (thematically, humanoid-form corrupted creatures like a succubus-type enemy) can.
- **Targeting rule, unchanged:**

  | Enemy Classification | Sexual Attack Targets |
  |---|---|
  | `monsterSex: "FEMALE"` and `isHumanoidForm: true` | The player — raises the player's `CombatCombatantRuntime.arousal` |
  | `monsterSex: "MALE"` (any form) | One companion, selected at random from `partyMemberIds` — raises her `arousal` |
  | `monsterSex: "FEMALE"` and not humanoid-form, or `monsterSex: "NONE"` | Sexual attack unavailable — this enemy only has ordinary attacks |

- **The same combat-penalty tiers apply to any combatant's own rising arousal — player, companion, or enemy alike:**

  | `arousal` | Combat Penalty |
  |---|---|
  | 0–39 | None |
  | 40–69 | -10% STR/AGI/DEF (distracted) |
  | 70–99 | -25% STR/AGI/DEF (overwhelmed) |
  | 100 | **Player/companion:** forced climax — next turn is skipped, then `arousal` resets to 0; never removes them from the fight. **Purifiable enemy:** defeated — `downed: true`, same as reaching 0 HP. |

- **Rewards are almost entirely unaffected by which path a defeat came from** — loot resolution (§5.9) runs identically either way; `presentsDefeatMenu: true` enemies still pause for the same Defeat Outcome Menu (§5.1) regardless. `defeatMethod: "KILLED" | "PURIFIED"` is retained purely as a small internal detail so the engine knows which of these two applies **[PROPOSED, reduced]**:
  - **+0.5 Astraea Approval** for a regular enemy defeated via arousal instead of HP.
  - **+5 Astraea Approval** if `isBossEncounter: true`.

  Deliberately small — this is a minor nudge acknowledging the game's stated theme, not a strategy the player should feel pressured to always pursue over just fighting normally.
- **This carries no lasting consequence beyond the encounter** — `arousal` resets to 0 for every surviving combatant when the encounter ends. It doesn't touch Trust/Love, doesn't interact with the Intimacy Engine's separate `IntimateEncounterRuntimeState.partnerArousal`, and isn't the `TraumaDebuff` status (§21.2) — mechanically identical in shape to any other status effect in §21, just persistent for the whole fight rather than a few turns.
- Only Kenji can raise an enemy's arousal (Sex Skills are tied to his Crest of Ardor specifically, per the GDD's own framing) — companions in any fight act through their normal Combat actions against `currentHp` only, and can themselves *be targeted* by a male enemy's sexual attack without having any purification-side action of their own.

**Arousal gain per use — the magnitude that was missing:** each `EnemyAbilityDef` with `isSexualAttack: true` carries `arousalGainAmount`, a flat bonus applied to the target's `arousal` on hit, sized the same way the player's own Sex Skill catalog is (§22.1) rather than invented separately **[PROPOSED guideline]**:
- Regular (non-boss) enemy sexual attacks: **+15 to +20** flat.
- Boss-tier sexual attacks: **+20 to +30** flat, and a boss with more than one sexual attack in its pool can have them escalate (a weaker opener, a stronger one used later or at lower HP).

**Content toggle:** `ContentToggle.HostileArousalAttacks` governs this mechanic entirely, separate from `NonConsensualContent` (which is specifically about the player's own `ForceIntimacy` action). When off, no `EnemyAbilityDef` with `isSexualAttack: true` is ever selectable — filtered out of an enemy's usable ability pool at encounter start, exactly as if the enemy never had it. Defaults **off**, matching `NonConsensualContent`'s existing default (§10).

**AI selection rule — more aroused enemies favor the attack more:** when an enemy's turn comes up and its `abilityIds` pool contains both a sexual attack and ordinary attacks, the choice is weighted by the enemy's *own* current `arousal` **[PROPOSED formula]**:
```
sexualAttackChance = clamp(0.15 + (enemy.arousal / 100) × 0.55, 0.15, 0.70)
```
At 0 arousal, a 15% baseline chance; climbing to 70% as the enemy approaches purification at 100. This creates a real tension to the purification playstyle rather than making it strictly safer than a normal fight: the more you push an enemy toward purification with Sex Skills, the more aggressively it retaliates in kind. If the roll selects "sexual attack" but the enemy lacks a usable one (see Miasma Reserve below), it falls back to an ordinary attack that turn instead.

**Miasma Reserve — the enemy-side resource, mirroring player CPW:** an enemy with any `isSexualAttack` ability has `maxMiasmaReserve` on its `EnemyCombatantDef`, and starts each encounter with `CombatCombatantRuntime.miasmaReserve` set to that value. Each `EnemyAbilityDef.miasmaCost` is deducted on use, and — like player CPW mid-fight — **it does not regenerate during the encounter** (the enemy gets one pool per fight, not a refillable one; there's no enemy-side equivalent of the player's Crest Charge). An enemy that's spent its reserve simply can't select a sexual attack again that fight regardless of how the arousal-weighted roll above comes out, and falls back to ordinary attacks for the rest of it. This is what actually throttles frequency — without it, a high-arousal enemy could spam its sexual attack every single turn.

**Explicitly out of scope, unchanged:** no mechanic in this section allows the player to initiate non-consensual sexual content against a companion. `ForceIntimacy` (§5.1) remains scoped exclusively to defeated, non-Protected-class NPCs regardless of how they were defeated — this is a combat mechanic between Kenji and an enemy, not an exception carved into the companion-protection rules established throughout this document.

### 23.2 Worked Examples — Authored Enemies

Starts closing the content-volume gap flagged in §27: two GDD-confirmed cases, one additional monster, and two humanoid "negative NPCs," covering both branches of the targeting rule (female-humanoid → player, male → companion) plus the presentsDefeatMenu contrast (a monster manifestation vs. an actual person). **Substantially expanded in `enemies_seed_data.ts`** (companion file to this document): 11 more entries — one purifiable monster and one negative-NPC humanoid for Verdant Vale, Aethermoor, Crimson March, and Whispering Wood (none of which previously had *any* roster here), plus one more negative NPC each for Auric Court and Sunken Sanctum, which already had coverage below. That file also retrofits real `LootTableDef` entries — drawn from `items_seed_data.ts` — for all 5 examples below, which previously only had a dangling `lootTableId` string with nothing behind it.

**The Auric Court hybrid boss pairing** (GDD-confirmed — "High Inquisitor Malakor & The Miasma Succubus"), demonstrating a single `EncounterDef` mixing a purifiable monster with a non-purifiable person in the same fight:

```typescript
const highInquisitorMalakor: EnemyCombatantDef = {
  id: "high_inquisitor_malakor",
  name: "High Inquisitor Malakor",
  monsterType: MonsterType.Humanoid,
  family: "corrupt-cultist-leader",
  baseLevel: 34, // top of Auric Court's 24-34 range, §5.11
  combatStats: { hp: 320, maxHp: 320, str: 26, agi: 14, wis: 20, def: 22, lck: 12 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["malakor_smite", "malakor_dark_ritual"],
  goldDropRange: [500, 700],
  lootTableId: "malakor_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true, // a person, not a monster manifestation — no monsterSex/isHumanoidForm,
                            // no sexual attack; he's the combat-only half of the pairing
};

const miasmaSuccubus: EnemyCombatantDef = {
  id: "miasma_succubus_boss",
  name: "Miasma Succubus",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "succubus",
  baseLevel: 34,
  combatStats: { hp: 280, maxHp: 280, str: 22, agi: 18, wis: 26, def: 14, lck: 16 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["succubus_temptation_kiss", "succubus_corrupting_embrace", "succubus_shadow_claw"],
  goldDropRange: [400, 600],
  lootTableId: "miasma_succubus_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false, // her humanoid form is a corrupted manifestation, not a legal person
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 40, // boss-tier: enough for roughly 2-3 uses of her stronger attack, or more of the weaker one
};

const act5HybridBossEncounter: EncounterDef = {
  id: "auric_court_malakor_succubus_boss",
  region: Region.AuricCourt,
  enemyGroup: [
    { enemyDefId: "high_inquisitor_malakor", count: 1 },
    { enemyDefId: "miasma_succubus_boss", count: 1 },
  ],
  maxSimultaneousEnemies: 6,
  isBossEncounter: true,
  bossScriptId: "act5_malakor_succubus_phase_script",
  rewardGoldRange: [800, 1200],
  rewardXp: 600,
  rewardItemIds: ["auric_court_key_item"],
};

const succubusTemptationKiss: EnemyAbilityDef = { id: "succubus_temptation_kiss", name: "Temptation Kiss", isSexualAttack: true, arousalGainAmount: 20, miasmaCost: 10 };
const succubusCorruptingEmbrace: EnemyAbilityDef = { id: "succubus_corrupting_embrace", name: "Corrupting Embrace", isSexualAttack: true, arousalGainAmount: 28, miasmaCost: 16 };
const succubusShadowClaw: EnemyAbilityDef = { id: "succubus_shadow_claw", name: "Shadow Claw", isSexualAttack: false, damageMultiplier: 1.1 };
const malakorSmite: EnemyAbilityDef = { id: "malakor_smite", name: "Corrupt Smite", isSexualAttack: false, damageMultiplier: 1.2 };
const malakorDarkRitual: EnemyAbilityDef = { id: "malakor_dark_ritual", name: "Dark Ritual", isSexualAttack: false, damageMultiplier: 1.5 };
```

Malakor can only ever be killed — he has no `monsterSex`/`isHumanoidForm` and nothing in his `abilityIds` pool is a sexual attack. The Succubus can be killed *or* purified, and her Temptation Kiss/Corrupting Embrace target the player specifically (female + humanoid-form, per §23.1's rule) rather than dealing HP damage.

**The Sunken Sanctum boss** (GDD-confirmed — "Void Concubine"), a second female-humanoid example at much higher level:

```typescript
const voidConcubine: EnemyCombatantDef = {
  id: "void_concubine_boss",
  name: "Void Concubine",
  monsterType: MonsterType.VoidAberration,
  family: "void-concubine",
  baseLevel: 44, // near the top of Sunken Sanctum's 30-45 range
  combatStats: { hp: 520, maxHp: 520, str: 30, agi: 24, wis: 34, def: 20, lck: 18 },
  aiPattern: EnemyAiPattern.BossScripted,
  abilityIds: ["void_concubine_embrace", "void_concubine_lash", "void_concubine_devour"],
  goldDropRange: [900, 1300],
  lootTableId: "void_concubine_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 45, // highest-tier example — one of the strongest sexual attacks in this set
};

const voidConcubineEmbrace: EnemyAbilityDef = { id: "void_concubine_embrace", name: "Void Embrace", isSexualAttack: true, arousalGainAmount: 25, miasmaCost: 14 };
const voidConcubineLash: EnemyAbilityDef = { id: "void_concubine_lash", name: "Void Lash", isSexualAttack: false, damageMultiplier: 1.3 };
const voidConcubineDevour: EnemyAbilityDef = { id: "void_concubine_devour", name: "Devouring Maw", isSexualAttack: false, damageMultiplier: 1.8 };
```

**A male-form monster** — not GDD-named, but a natural extension given the world already has female succubus-type entities; fills out the "male → targets a companion" branch of the targeting rule at ordinary (non-boss) scale:

```typescript
const corruptedIncubus: EnemyCombatantDef = {
  id: "corrupted_incubus",
  name: "Corrupted Incubus",
  monsterType: MonsterType.MiasmaCorrupted,
  family: "incubus",
  baseLevel: 22, // mid Whispering Wood range, 18-28
  combatStats: { hp: 140, maxHp: 140, str: 16, agi: 14, wis: 18, def: 10, lck: 12 },
  aiPattern: EnemyAiPattern.SupportCaster,
  abilityIds: ["incubus_seductive_touch", "incubus_shadow_strike"],
  goldDropRange: [60, 100],
  lootTableId: "incubus_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: false,
  monsterSex: "MALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 20, // ordinary-tier — a handful of uses before falling back to ordinary attacks
};

const incubusSeductiveTouch: EnemyAbilityDef = { id: "incubus_seductive_touch", name: "Seductive Touch", isSexualAttack: true, arousalGainAmount: 18, miasmaCost: 10 };
const incubusShadowStrike: EnemyAbilityDef = { id: "incubus_shadow_strike", name: "Shadow Strike", isSexualAttack: false, damageMultiplier: 1.0 };
```

His Seductive Touch targets a random party companion (male + any form), not the player.

**Two "negative NPC" humanoids** — `presentsDefeatMenu: true`, so these pause for the Defeat Outcome Menu (§5.1) like any bandit or cultist, one of each sex:

```typescript
const cultistPriestess: EnemyCombatantDef = {
  id: "miasma_cultist_priestess",
  name: "Miasma Cultist Priestess",
  monsterType: MonsterType.Humanoid,
  family: "cultist",
  baseLevel: 28, // Auric Court range
  combatStats: { hp: 110, maxHp: 110, str: 12, agi: 14, wis: 22, def: 10, lck: 14 },
  aiPattern: EnemyAiPattern.SupportCaster,
  abilityIds: ["priestess_corrupting_caress", "priestess_dark_bolt"],
  goldDropRange: [40, 90],
  lootTableId: "cultist_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
  monsterSex: "FEMALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 22,
};

const banditReaver: EnemyCombatantDef = {
  id: "bandit_reaver",
  name: "Bandit Reaver",
  monsterType: MonsterType.Humanoid,
  family: "bandit",
  baseLevel: 10, // Verdant Vale / early Aethermoor range
  combatStats: { hp: 90, maxHp: 90, str: 14, agi: 12, wis: 6, def: 10, lck: 10 },
  aiPattern: EnemyAiPattern.Aggressive,
  abilityIds: ["reaver_forceful_grapple", "reaver_dagger_slash"],
  goldDropRange: [20, 50],
  lootTableId: "bandit_loot_table",
  legalClass: NpcLegalClass.Outlaw,
  presentsDefeatMenu: true,
  monsterSex: "MALE",
  isHumanoidForm: true,
  maxMiasmaReserve: 16, // lowest-tier example — a very early-game bandit, only a couple of uses
};

const priestessCorruptingCaress: EnemyAbilityDef = { id: "priestess_corrupting_caress", name: "Corrupting Caress", isSexualAttack: true, arousalGainAmount: 17, miasmaCost: 9 };
const priestessDarkBolt: EnemyAbilityDef = { id: "priestess_dark_bolt", name: "Dark Bolt", isSexualAttack: false, damageMultiplier: 1.0 };
const reaverForcefulGrapple: EnemyAbilityDef = { id: "reaver_forceful_grapple", name: "Forceful Grapple", isSexualAttack: true, arousalGainAmount: 15, miasmaCost: 8 };
const reaverDaggerSlash: EnemyAbilityDef = { id: "reaver_dagger_slash", name: "Dagger Slash", isSexualAttack: false, damageMultiplier: 1.0 };
```

Choosing `StripAndLoot` on either after a purification-based defeat works identically to a kill-based one — same gold/equipment rules as §5.9, unaffected by `defeatMethod`.

---

## 24. Main Quest Act/Chapter Structure

Gives the GDD's linear 7-Act spine an actual schema instead of an implicit `storyFlags` chain.

- `ActDef` holds one entry per Act (1–7), each pointing to an ordered list of `ChapterDef` IDs, a `completionStoryFlag`, and an `astraeaApprovalOnCompletion` value (matching the GDD's own +10 to +20 for regional Ley Node purges, +25 for main Ley Node bosses, §10.3.4 of the GDD).
- `ChapterDef.prerequisiteChapterId` enforces the GDD's strictly linear chapter order within an Act (null only for each Act's first chapter); `associatedQuestIds` ties a chapter to the `QuestDef`s that must complete for it to resolve; `unlocksRegion` fires world-map/travel unlocks (e.g. Act 1's final chapter unlocking Aethermoor).
- `GameState.activeMainQuestChapterId` tracks the player's current position in the spine directly, rather than requiring the engine to infer progress by scanning `storyFlags`.

**Worked example** (Act 1, abbreviated):

```typescript
const act1: ActDef = {
  actNumber: 1,
  displayName: "The Awakening in the Verdant Vale",
  region: Region.VerdantVale,
  chapterIds: ["act1_ch1", "act1_ch2", "act1_ch3", "act1_ch4", "act1_ch5"],
  completionStoryFlag: "act1_complete",
  astraeaApprovalOnCompletion: 25, // main Ley Node boss purge, per GDD §10.3.4
};

const act1Ch5: ChapterDef = {
  id: "act1_ch5",
  actNumber: 1,
  chapterNumber: 5,
  displayName: "The Blighted Treant of the Ley Node Grove (Boss)", // corrected to match the actual region map's naming — §18.1/world_map_seed_data.ts's "vv_ley_node_grove", not "Hill Shrine" as originally drafted here
  prerequisiteChapterId: "act1_ch4",
  associatedQuestIds: ["act1_ch5_boss_fight"],
  cutsceneTriggerId: "astraea_dream_vision_act1_end",
  unlocksRegion: Region.Aethermoor,
};
```

---

## 25. Dialogue Tree Schema

Per the requested split: the 10 companions (and other named story characters) get their own authored dialogue trees; generic procedural NPCs share one tree per class. Sexual response lines are handled entirely separately from both, as two common pools.

### 25.1 Conversational Dialogue

- `CharacterDialogueTreeDef` — one per companion (keyed by `CompanionId`) or named story NPC (keyed by a string id, e.g. `"astraea"`). Each `rootNodeIds` entry is filtered at runtime by its `DialogueNodeDef.conditions` (Trust/Love thresholds, `questStage`, story flags) to find what's actually sayable right now.
- `GenericNpcDialogueSetDef` — **one shared tree per procedural class** (§8.1 of the GDD's 10 classes), not authored per spawned instance. Every Town Merchant pulls from the same pool; a specific merchant's Trust/Love still gates which lines are eligible for *her* individual state, but the underlying line bank is shared.
- `DialogueNodeDef.responseOptionIds` chains to further nodes or ends the exchange; `setsStoryFlag` lets a conversation itself progress `storyFlags`/chapter gating (§24).

### 25.2 Sexual Response Lines — Two Common Pools, Not Per-Character

This is the part worth being precise about, since it's structured differently from conversational dialogue on purpose:

- **`MAIN_SIDE_COMMON`**: one shared pool of reaction lines used by **all 10 companions**, not authored per-character. A line is written once per `triggerContext` (action category from §13.2 of the GDD, optionally a specific `positionId`, optionally a minimum arousal-state band from §13.3 of the GDD) and reused across every companion, with `{partnerName}` substituted at selection time.
- **`NPC_COMMON`**: a second, smaller pool for generic world NPCs, structured identically but with fewer entries — reserved for the rarer cases where a non-companion NPC is part of a consensual intimate scene.
- **Selection logic**: when the Intimacy Engine needs a reaction line for a turn, it filters the appropriate pool by the current `triggerContext` and picks **at random among all matches** — this is what gives "multiple possible... variety and randomness" for the same action/position/arousal-state combination, without needing ten separately-authored versions of the same line.
- **What stays bespoke**: a companion's unique narrative beats — her Stage 4 first-union scene, her Stage 7 finale — are still authored as one-off content inside her own `CharacterDialogueTreeDef`, not pulled from the common pool. The common pool covers turn-by-turn *reactive* dialogue during ordinary scenes; the character trees cover everything that's supposed to feel unique to her.

**Worked example:**

```typescript
const commonMoan: SexualResponseLineDef = {
  id: "common_penetrative_flushed_1",
  poolTier: "MAIN_SIDE_COMMON",
  triggerContext: { actionCategory: "PENETRATIVE_VAGINAL", arousalStateMin: "FLUSHED_AND_NEEDY" },
  text: "\"{partnerName}... don't stop, please...\"",
};

const commonMoanVariant: SexualResponseLineDef = {
  id: "common_penetrative_flushed_2",
  poolTier: "MAIN_SIDE_COMMON",
  triggerContext: { actionCategory: "PENETRATIVE_VAGINAL", arousalStateMin: "FLUSHED_AND_NEEDY" },
  text: "{partnerName} clings to his shoulders, breath catching with every thrust.",
};
```

Both entries share the same `triggerContext`, so the engine picks one at random whenever that context arises — with any of the 10 companions, `{partnerName}` substituted appropriately each time.

---

## 26. Kinks — A Global Catalog, Emergent Per-Character Attachment

Resolves the long-standing "Kink-tracking for achievements" gap properly, rather than patching the old loose `kinkTags` string list. Revised twice from the first draft, per explicit correction: kinks are now explicitly erotic acts and states rather than general personality traits, every attachment condition is scoped strictly to what happens inside an actual Intimate Encounter, and — this is the important structural fix — **there is no per-companion assignment of any kind.** The first draft added `CompanionDef.assignedKinkIds` to curate which kinks fit each companion's personality; that was a direct contradiction of the explicit instruction not to do that, and it's been removed entirely, not softened. A kink attaches to whichever character actually satisfies its condition with her specifically — companion or generic NPC, identically — and nothing else decides that in advance.

### 26.1 The Global Catalog

`KinkDef` lives in `kinks_seed_data.ts`, alongside `items_seed_data.ts` and `enemies_seed_data.ts`. Twenty entries, every one a genuinely erotic act or state (not a dialogue tone or a relationship stat), and every `requiredContext` is something that can only occur inside an active `IntimateEncounterRuntimeState`:

| Kink | Category | Attachment Condition **[PROPOSED]** | Trigger Effect |
|---|---|---|---|
| Deep Throat Devotion | Physical | 15× Seated Deepthroat/Lying Throatfuck position | +10 Arousal, `Shivering` 2 turns |
| Cervix Devotion | Physical | 12× Cervix Harmonizer skill used | +10 Arousal |
| Edging & Denial | Physical | 15× reaches Edging Ecstasy without climax following | +12 Arousal |
| Mating Press Devotion | Positional | 15× Mating Press position used | +8 Arousal |
| Rough Rhythm Craving | Physical | 12× Grip and Release skill used | +10 Arousal, `Shivering` 2 turns |
| Breast Worship Addiction | Physical | 20× Breast/Nipple-category act | +8 Arousal |
| Anal Devotion | Physical | 12× Penetrative Anal act | +10 Arousal |
| Rear Entry Preference | Positional | 12× Doggy Style or Standing/Wall | +8 Arousal |
| Dominance & Submission | Verbal | 12× Command speech paired with climax reached under it | +10 Arousal |
| Nocturnal Heat | Situational | 10× Intimate Encounter during Night/Midnight | +8 Arousal |
| Ear & Tail/Wing Erogenous Zone | Physical | 15× Ears or Wings/Tail/Horns touch | +8 Arousal, `Shivering` 2 turns |
| Slow Grinding Passion | Positional | 15× Side Spoon or Lotus/Lap | +6 Arousal |
| Striptease Ritual | Situational | 12× clothing removed *during* an active scene | +10 Arousal |
| Impact Play | Physical | 15× Spank act with Spanking Artistry active | +8 Arousal |
| Dirty Talk Craving | Verbal | 15× Dirty Talk speak action | +8 Arousal |
| Lactation & Nursing | Physical | 10× Lactation/Nursing act | +10 Arousal, `Sensitized` 3 turns |
| Simultaneous Climax Chaser | Physical | 10× simultaneous climax triggered | +10 Arousal |
| Missionary Eye-Contact Devotion | Positional | 15× Missionary position used | +8 Arousal |
| Overstimulation Lock | Physical | 10× Arousal held at max across multiple turns via a lock effect | +10 Arousal, `Synchronized` 3 turns |
| Creampie Devotion | Physical | 12× Deep Internal Creampie act | +10 Arousal |

Every single condition above is checkable purely from what happened inside a scene — a position used, an act performed, a skill triggered, an Arousal state reached. None of them reference Trust, Love, Gift actions, or any dialogue that could occur outside an Intimate Encounter; `KinkAttachmentCondition` no longer even has `requiresMinTrust`/`requiresMinLove` fields to tempt that. Counts stay in the 10–20 range deliberately — this is meant to reward sustained, specific sexual chemistry with a particular partner, not something triggered by a handful of scenes.

### 26.2 Per-Character Tracking — The Only Mechanism

Both `CompanionRuntimeState` and `WorldNpcInstance` carry the identical pair of fields, and there is nothing else in the system that touches kinks:

- **`kinkProgress: Record<string, number>`** — a permanent, cumulative counter per `KinkDef` id, incremented whenever the matching `requiredContext` occurs during a scene with that character. Never decays, never resets.
- **`satisfiedKinkIds: string[]`** — populated the moment a `kinkProgress` entry crosses its `KinkDef.attachmentCondition.requiredCount`. This is the actual data the *Kink Connoisseur* achievement checks against.

**No pre-assignment, anywhere.** `CompanionDef` has no kink field at all — not `kinkTags`, not `assignedKinkIds`, nothing. Whether Mira ends up with Deep Throat Devotion or Nocturnal Heat or both or neither depends entirely on what actually happens between her and Kenji in play; the same is true of every companion and every generic `WorldNpcInstance` alike. This is what "global, applicable to all NPCs and characters, not specific to a particular character" means taken literally: the catalog of *possible* kinks is shared, but nothing pre-decides which possible kink becomes actual for whom.

**Effect on Satisfaction Score:** `IntimateEncounterRuntimeState.kinkTriggered` is `true` only when a kink already present in `satisfiedKinkIds` has its `requiredContext` recur during that scene — feeding §4.8's `kinkBonus` term.

### 26.3 The Kink Encyclopedia

Unlocked by the **Kink Encyclopedia** Sex Skill Tree node (Tier 1, 3 AP — see §22.1). Once owned, a new UI screen lists every `KinkDef` in the global catalog — name, category, flavor description, and its exact attachment condition — for reference, plus, for any specific character the player has met, her current `kinkProgress` and `satisfiedKinkIds`. Since nothing is pre-assigned, this is the only way to know what's already attached to a given companion or what she's partway toward, short of noticing the in-scene bonus text firsthand. Without the node, `Reading the Room` still reveals a partner's live Arousal meter and state, but nothing about kinks at all — there's no "assigned category" to preview anymore, since there's no assignment.

### 26.4 Kink Connoisseur, Revised

The GDD's original wording — "trigger every companion's specific kink" — assumed a pre-assigned kink per companion, which no longer exists. The achievement is reworded to match the emergent design: **each of the 10 companions has at least one entry in her `satisfiedKinkIds`**, regardless of which of the 20 it happens to be. This is arguably a better fit for an emergent system anyway — it rewards actually discovering what each companion responds to through play, rather than looking up a predetermined answer.

---


## 27. Known Gaps — Pending for Next Pass

Substantially shorter than before — this pass closed most of what was previously open. Remaining:

- **UI/UX screens.** Still entirely unspecified beyond "Next.js + React" as a stack choice — no concrete screen inventory (world/location view, combat layout, intimate-scene layout, skill tree UI, achievement screen, settings/content-toggle screen, the new Character/NPC Status Display from §19) exists yet.
- **No quest tracking mechanism. [NEW]** `QuestDef`/`QuestObjective`/`QuestRuntimeState` all exist as data, and §5.6 covers how a `QuestType.Companion` quest advances `questStage` — but nothing describes how the player actually *sees* any of this in play: no quest log screen, no active-quest indicator, no objective-progress display, no way to tell which of the 30 repeatable quests are currently on cooldown versus available. This is distinct from the general "UI/UX screens" gap above precisely because it's not just a missing screen — there's no `getActiveQuestLog()`-style read model (the equivalent of §19's `ContactProfileView`) specified for quests at all, screen or no screen. A future pass needs both the data-aggregation layer and the screen it feeds.
- **No introduction mechanism for a generic NPC's first Talk. [NEW]** §19.4 now correctly keys individuation off the player's first `Talk` with her rather than a `trustLove` threshold, and states that this first exchange should be a proper introduction — she gives the name that was just rolled for her, not a silent, unremarked assignment happening behind an ordinary line of small talk. That content and mechanism don't exist yet, on checking: (1) every `GenericNpcDialogueSetDef` root node currently in `dialogue_generic_npc_seed_data.ts` is ordinary small talk with `conditions: []` — none is written as an introduction, and none contains a name-reveal or a `{displayName}`-style placeholder; (2) `DialogueCondition` has no condition type capable of expressing "only the very first time this specific instance is talked to" — only `TRUST_AT_LEAST`/`LOVE_AT_LEAST`/`QUEST_STAGE_AT_LEAST`/`STORY_FLAG_SET`/`STORY_FLAG_UNSET` exist, none of which can gate on a per-instance "never talked to before" fact; (3) `WorldNpcInstance` has no field tracking whether she's been talked to before at all — nothing to flip once the introduction has played, so nothing stops it (or blocks it) from firing again on a later `Talk`. Closing this properly needs a per-instance flag (something like `hasBeenIntroduced: boolean`, checked and set outside the existing `DialogueCondition` system entirely, since that system has no concept of per-instance conversation history) plus one dedicated introduction root node per procedural class, each with an actual name-reveal line.
- **Generic NPC appearance is class-archetype only, not individually varied. [NEW, formalized from §19's own inline note]** A generic NPC's `appearance` resolves to her `ProcNpcClassDef`'s archetype, not an individually-authored one — there's no mechanism for procedurally varying height, coloring, or body details per spawned instance the way there is for the 10 hand-written companions. A Farm Girl the player has fallen for and individuated (§19.4) has her own `displayName`, her own `trustLove`, her own `kinkProgress` — a real, tracked individual in every mechanical sense — but still *looks* like the shared Farm Girl archetype rather than a visually unique person. This was stated plainly in §19 rather than glossed over as equivalent to a companion's profile, and is logged here as its own gap rather than left as inline prose only: closing it properly would mean either procedural appearance variation (randomized height/coloring/body-detail rolls per instance, within the archetype's plausible range) or some lighter-weight individual variation scheme — neither is designed yet.
- **API error-handling convention.** Many rules say an invalid action "is rejected," but the actual shape of that rejection — thrown exceptions, a `Result<T, E>` return type, tRPC error codes — hasn't been standardized across the API surface.
- **Numeric tiers for purification remain unplaytested.** Content volume for §23's mechanic is done (16+ entries across all 7 regions, verified density math) — but the actual numbers behind it (combat penalty thresholds, the +0.5/+5 Astraea Approval bonuses, arousal-gain amounts, Miasma Reserve costs) have never been run against real gameplay. This is the one item on this list that more authoring genuinely cannot close — it needs actual playtesting data, not more content.
- **Content authoring backlog — fully closed, including the audit findings from two follow-up passes.** Every content type from the original backlog is real, delivered seed data — see §2.2 for the full file list. Fixed across those passes: (1) Stage 4's confession gating is genuinely derived from each companion's own `moveInRequirements` rather than a flat 50/50; (2) the 69 companion quest-chain `QuestDef`s now exist and actually drive `questStage` advancement (§5.6's rule); (3) the other 9 companions' dialogue was expanded to genuine parity with Mira's depth (`dialogue_companions_expansion_seed_data.ts`, +189 nodes); (4) Astraea has both a full 39-node dialogue tree (`dialogue_astraea_seed_data.ts`) and, since a later pass, real character/appearance data behind it (`astraea_seed_data.ts`, using a new `NamedStoryCharacterDef` type rather than `CompanionDef`, since she has no combat role or move-in eligibility); (5) every companion's body proportions were audited against the actual source character bible and corrected where they'd drifted — six of the nine needed fixing, three of those (Sylvara, Seira, Tasha) because an earlier *self*-consistency pass had resolved a build-vs-body contradiction in the wrong direction with no source to check against.

None of these block implementation of anything specified elsewhere in this document — they're either pure UI/content-authoring work that was already scoped as a follow-up pass (§8), a small standardization decision (API errors) that doesn't gate building the systems themselves, a documented simplification with a clear path to closing it later (generic NPC appearance), a genuinely missing read-model-plus-screen pair (quest tracking), or something that needs real playtesting data rather than more authoring (the purification numeric tiers). World movement (§18) is fully resolved as of this pass and isn't one of these — the line used to say otherwise from an earlier draft of this list; corrected.

