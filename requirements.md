# Ojisan in Another World — Product Requirements Document (PRD)

**Version:** 1.1
**Date:** 2026-08-29
**Status:** Draft for review

---

## 1. Overview

**Ojisan in Another World** is a turn-based erotic RPG that blends tactical combat, relationship building, intimate encounters, and kingdom management. The player controls Player, a character in a fantasy world, as he explores, fights miasma, forms bonds with companions (special named preset NPCs) and NPCs, and ultimately purifies the land.

The game is designed for adult audiences and features consensual and non-consensual sexual content (togglable), deep character progression, and a branching narrative influenced by player choices.

---

## 2. Platform & High-Level Architecture

- **Platform:** Web (desktop and mobile responsive)
- **Frontend:** React-based SPA with modern UI/UX
- **Backend:** Server-authoritative game logic exposed via type-safe APIs (tRPC)
- **Persistence:** Local save files stored on disk, with automatic backup and versioning
- **Architecture principles:** Client sends player intents; server processes them and returns updated game state and narrative. All game rules are deterministic and testable.

### 2.1 Repository Structure (Proposed)

```
/
├── Project/              # Core TypeScript engine (character spawn, physiology, psychology)
├── src/
│   ├── engines/          # One file per engine (combat, intimacy, calendar, etc.)
│   ├── data/             # Static game data (items, quests, world graph, skill trees)
│   ├── api/              # tRPC router definitions
│   └── client/           # React frontend
├── saves/                # Runtime save files (gitignored)
├── requirements.md
└── requirements_analysis_results
```

### 2.2 Engine Orchestration

All engines are pure modules. The server is the sole authority. The client sends **player intents**; the server dispatches them to the relevant engine(s) and returns an updated `GameState` plus narrative output.

**Intent → Engine routing:**

| Intent | Primary Engine | Side Effects |
|--------|---------------|--------------|
| MOVE | World/Pathing | → encounter roll → Combat |
| TALK | Dialogue | → Relationship flags |
| FIGHT_ACTION | Combat | → Status Effects |
| INTIMACY_ACTION | Intimacy | → Relationship, Pregnancy |
| USE_ITEM | Economy/Inventory | — |
| GIVE_GIFT | Economy, Relationship | — |
| SLEEP | Calendar | → HP/Stamina/CPW restore |
| ADVANCE_PHASE | Calendar | → Status tick, NPC refresh |
| CRAFT | Crafting | — |
| BUILD | Manor | — |
| SAVE | Save/Load | — |

**Day-end tick sequence (executed in this order at Midnight):**
1. Reputation decay
2. Pregnancy progression + birth checks
3. NPC population refresh (every 3rd day)
4. Crafting job resolution
5. Construction timer decrement
6. Manor passive generation
7. Daily counter resets (flirt/touch limits, repeatable quest cooldowns)
8. Date increment

**`GameState` root interface (TypeScript sketch):**
```typescript
interface GameState {
  player:        PlayerState;        // stats, skills, CPW, fatigue, inventory
  world:         WorldState;         // current location, discovered nodes, lastSafeLocation
  calendar:      CalendarState;      // day, phase, actionCount, phaseActionLimit
  contacts:      ContactRecord[];    // companions + individuated NPCs (max 400, configurable)
  quests:        QuestLog;
  reputation:    Record<RegionId, number>;
  manor:         ManorState;
  flags:         Record<string, boolean | number | string>; // story flags
  settings:      GameSettings;       // adult content toggles, etc.
}
```

---

## 3. Core Gameplay Loop

1. **Explore** the world via a node-based map, moving between locations and triggering encounters.
2. **Combat** turn-based battles against monsters and humanoid enemies; win through damage or purification.
3. **Interact** with NPCs and companions (special named preset NPCs) through dialogue, gifts, flirting, touch, and intimate scenes.
4. **Progress** through main story acts/chapters and side quests; improve Player's skills and equipment.
5. **Manage** time and resources: day/night cycle, fatigue, manor upgrades, passive generation.
6. **Grow** relationships with companions and generic NPCs; unlock new scenes, move-in options, and offspring.

---

## 4. Feature Catalog

### 4.1 Character Progression & Detailed Character Definition

- Player and all companions have combat attributes (STR, AGI, WIS, DEF, LCK) and erotic attributes (Sensitivity, Technique, Virility for player only).
- Leveling increases combat stats according to class/role multipliers.
- Player can invest points into two skill trees: **Battle** (combat) and **Ardor** (intimacy).
- Passive skills are always active; active skills consume Crest Power (CPW).
- **Character data** is richly detailed, including:
  - **Race & Features**: e.g., human, fox girl, with wings, tail, ears, horns, special features.
  - **Appearance**: skin tone/undertone/condition, face shape/eyes/nose/lips/jaw, hair color/style/pubic/armpit, and body measurements (height, bust, waist, hip, cup size, body type).
  - **Physical Detail**: breast shape/softness, nipple type/color, ass shape/softness, attractiveness.
  - **Sexual Physiology**: vaginal type/elasticity, wetness tracking, clit size, labia type, sensitivity map per body part (nipple, breast, vagina, clit, cervix, womb, ass, lips, tongue, skin, ears), orgasm profile (types, ease, post-sensitivity, squirt/multiple capacity, count), arousal/lubrication speed, fertility, cycle day, pregnancy/lactation history.
  - **Personality**: Big Five traits, dominant/secondary traits, humor style, emotional stability, trust baseline, loyalty, jealousy, affection style, public/private persona, hidden desires, suppression strength and crack threshold.
  - **Sexual Psychology**: sexual confidence, lean, acquired kinks, kink acquisition rate, resistance profile (type, current/baseline resistance, corruption shift threshold, next profile, trauma modifier), corruption/shame, vocal/eye contact/dirty talk tendencies, relationship history.
  - **Voice**: pitch, texture, dirty talk tendency.
  - **Social**: trust baseline, loyalty, jealousy, affection style.
  - **Background**: social class, occupation, actual/apparent age, trauma presence/severity, region of origin.
  - **History**: prior partner count, total encounter count, acts experienced, pregnancy/lactation history, relationship history.

**Character Vitals interface:**
```typescript
interface CharacterVitals {
  hp:       { current: number; max: number };   // 0–max
  stamina:  { current: number; max: number };   // 0–200
  cpw:      { current: number; max: number };   // Crest Power
  arousal:  number;                             // 0–100 (intimacy context)
  fatigue:  number;                             // 0–5 days without sleep
}
```

**Stat progression formula:**
- `newStatValue = baseStat + (level - 1) × roleMultiplier × baseStat × 0.1`
- Role multipliers (STR example): Warrior 1.5, Mage 0.7, Rogue 1.0, Healer 0.6

### 4.2 Combat System

- Turn-based encounters with initiative determined by agility and luck.
- **Turn structure:** All combatants sorted by initiative at fight start; initiative = `AGI + d10`, ties broken by LCK. Turn order is fixed for the fight (no re-rolling per round).
- **Damage formula:** `damage = weaponPower × (attackerSTR / 10) - defenderDEF × 0.5`; minimum 1.
- **Crit chance:** `critChance = LCK / 200` (max 50%); crit multiplier = 1.75×.
- **Dodge/Evasion:** `dodgeChance = AGI / 300` (max 33%).
- Enemies have AI patterns: aggressive, defensive, support caster, and boss scripted.
  - **Aggressive:** always attacks the lowest-HP party member.
  - **Defensive:** attacks if own HP > 50%, otherwise uses defensive/self-heal actions.
  - **SupportCaster:** buffs allies with HP < 60%; attacks otherwise.
  - **BossScripted:** follows a phase script; phase transitions triggered by HP thresholds (e.g., 75%, 50%, 25%).
- Companions can be downed (0 HP); party wipe leads to recovery at last safe location.
- **Flee:** player may attempt to flee; success chance = `(playerAGI - avgEnemyAGI) / 100 + 0.3`, clamped 10%–80%.
- **Purification:** alternative victory by raising enemy arousal to 100; uses Sex Skills; rewards differ from kill.
- **Arousal-per-Sex-Skill formula:** `arousalGain = skillPower × (playerTEC / 10) - targetMiasmaRes × 0.3`; minimum 1.
- Enemy sexual attacks (if enabled) target based on monster sex and form.
- Miasma Reserve (monsters) / Mana Reserve (all non-monster characters) limits special attacks; does not regenerate mid-fight.
- Defeat outcomes for humanoid enemies include loot, strip-and-loot, interrogation, and more.

#### 4.2.1 Enemy & Monster Definition

Enemies and monsters are characters in the same sense as NPCs — they use the same character data schema and spawn engine where applicable — with the following additions:

- **Enemy-specific fields:** `aiPattern`, `miasmaReserve` (monsters only), `manaReserve` (humanoids), `lootTable`, `purificationReward`, `defeatOutcomeOptions`, `isHumanoidForm`, `monsterSex`.
- **Monster types:** Beast, Undead, Elemental, Demon, Miasma-Corrupted — each with distinct AI tendency weights and sexual attack eligibility.
- **Humanoid enemies:** use the full NPC spawn profile (race, body, physiology, psychology); defeat outcomes unlock interrogation and strip-and-loot scenes.
- **Scaling:** enemy base stats scale by region tier (1–5) and monster type multipliers; see §4.20 for the scaling algorithm.
- **Boss enemies:** hand-crafted profiles; not procedurally spawned; defined in static data files.

### 4.3 Intimacy System

- Full intimate encounter scenes with turn-by-turn interaction.
- Scene start types: CONSENSUAL, FORCE_INTIMACY, FORCE_INTIMACY_SLEEPING.
- Scene ends via STAMINA_EXHAUSTED or PLAYER_ENDED.
- `activePositionId` + `activeActionId` track scene state.
- `occupiedPenetrationTargets` prevents simultaneous same-cavity use.
- Multiple positions and actions; simultaneous actions allowed with body-part conflict checks.
- Technique check: `tecCheck = playerTEC ≥ actionTECRequirement + d10`; failure halves action effectiveness.
- **Partner state simulation**: resistance, mental state, and mood evolve during scenes based on actions and relationship context.
  - Resistance profile (fight, freeze, comply, etc.), current resistance, baseline resistance, corruption shift threshold, next profile, trauma modifier.
  - Mental state tracks mood, corruption, shame, broken flag, subspace tracker, afterglow tracker, suppression state, trust with player, attachment, submission to player.
- **Satisfaction score** after each scene: `satisfaction = (pleasurePeak × 0.4 + orgasmCount × 15 + kinkTriggered × 10 - painExcess × 5)`, clamped 0–100. Affects relationship gains and partner reactions.
- **Kink acquisition**: as per each kink's condition and `kinkAcquisitionRate`.
- **Kink progression**: repeated actions trigger partner kinks, adding bonuses; acquired kinks tracked per character.
- **Dynamic narrative responses**: generated from context using a large fragment repository.
- **Physical response tracking**: wetness, pleasure, pain, arousal level, stamina, lactating, clothing state, restraint state.

**`IntimacyScene` state (TypeScript sketch):**
```typescript
interface IntimacyScene {
  startType:                 "CONSENSUAL" | "FORCE_INTIMACY" | "FORCE_INTIMACY_SLEEPING";
  activePositionId:          string | null;
  activeActionId:            string | null;
  occupiedPenetrationTargets: ("VAGINA" | "ANAL" | "ORAL")[];
  turnCount:                 number;
  status:                    "RUNNING" | "STAMINA_EXHAUSTED" | "PLAYER_ENDED";
}
```

### 4.4 Relationships & Trust/Love

- Relationships modeled by Trust and Love (each -100 to +100), plus encounter-based bond type and intimacy-derived fields (corruption, shame, broken flag, submission, attachment).
- **Band thresholds:** Low = -100 to -25; Neutral = -25 to 25; High = 25 to 75; VeryHigh = 75 to 100.
- **16-cell relationship matrix:** (TrustBand × LoveBand) → RelationshipStatus label + available interaction options.
- Gift giving, flirting, touching, and dialogue choices modify Trust and Love.
- Flirt and Touch have daily diminishing returns (max 3 per character per day; counters reset at day-end).
- Move-in eligibility: Trust ≥ 60 AND Love ≥ 60 (or per-character override thresholds).
- Bonding system: bond type and strength track deep relationship milestones (from encounter history).

### 4.5 Reputation System

- Each region has a reputation score from -800 (infamous) to +800 (renowned).
- **Renown tiers:** Infamous < -400; Disliked -400 to -100; Neutral -100 to 100; Liked 100 to 400; Renowned > 400.
- Negative reputation decays toward zero by 5 points/day; positive reputation does not decay.
- **Bounty formula:** `bountyGold = abs(score) × 2`, paid at Bounty Offices.
- **Reputation event table (examples):**

| Event | Change |
|-------|--------|
| Kill civilian NPC | -50 |
| Kill enemy combatant | +10 |
| Complete board quest | +20 |
| Purify miasma node | +30 |
| Strip-and-loot humanoid in public | -30 |
| Force intimacy (witnessed) | -80 |

### 4.6 Quests & Story

- Main quest organized into Acts and Chapters with post-quest and pre-quest cutscenes.
- Side quests: companion quests, repeatable board quests.
- Objective types: KILL, COLLECT, TALK, INTERACT, ESCORT, TRAVEL.
- Companion quest completion advances their personal stage and unlocks specific interaction options.
- Repeatable quests have cooldowns measured in **in-game days** (not hours); `cooldownDays` field on quest definition.
- Cutscene system for story moments with player choices that affect flags and relationships.

**`QuestDef` schema (TypeScript sketch):**
```typescript
interface QuestDef {
  id:            string;
  type:          "MAIN" | "COMPANION" | "BOARD";
  title:         string;
  objectives:    ObjectiveDef[];
  reward:        QuestReward;
  prerequisites: string[];         // quest IDs that must be completed first
  cooldownDays?: number;           // repeatable quests only
}
interface ObjectiveDef {
  type:     "KILL" | "COLLECT" | "TALK" | "INTERACT" | "ESCORT" | "TRAVEL";
  targetId: string;
  count:    number;
}
interface QuestReward { gold: number; xp: number; items: string[]; flagsSet: Record<string, boolean>; }
```

### 4.7 Time & Day Cycle

- Five phases: Morning, Afternoon, Evening, Night, Midnight.
- Player actions consume phase time; after 15 actions, phase advances. **Actions that count:** movement between nodes, combat rounds, dialogue trees, intimacy turns, item use, gifting, crafting start, building start. Fast-travel counts as 1 action per region crossed.
- Direct-advance events (skip remaining actions and immediately advance phase): SLEEP, certain story cutscenes.
- Day-end processing at Midnight: see §2.2 for sequence.
- Sleep only at Night/Midnight in safe locations; restores full HP/Stamina/CPW and resets fatigue.
- Passive Stamina/CPW recovery on phase advance (+20% of max, except before sleep).
- **Fatigue penalty table:**

| Days Without Sleep | Effect |
|--------------------|--------|
| 0–1 | None |
| 2 | -10% STR/AGI, -5 max Stamina |
| 3 | -25% STR/AGI, -15 max Stamina, -1 TEC |
| 4 | -50% all combat stats, random encounter rolls disadvantaged |
| 5+ | Forced collapse → Last Safe Location; full HP/Stamina/CPW restore; fatigue reset |

### 4.8 Economy & Inventory

- Gold as primary currency; items can be bought, sold, gifted, looted.
- Inventory slots limited (20 base, expandable via Manor tier upgrades; +5 slots per tier above tier 2).
- Stackable items with max stack sizes (defined per item).
- Quest items do not occupy inventory slots.
- Overflow handling: manual pickup rejected; combat loot auto-converted to gold at base sell value.
- **Sell price formula:** `sellPrice = itemBaseSellValue × shopDiscount`; `shopDiscount` defaults to 0.5, modified by reputation in region and Bargaining skill.

**`ItemDef` schema (TypeScript sketch):**
```typescript
interface ItemDef {
  id:            string;
  name:          string;
  type:          "WEAPON" | "ARMOR" | "CONSUMABLE" | "MATERIAL" | "GIFT" | "QUEST";
  stackMax:      number;   // 1 for non-stackable
  baseBuyValue:  number;
  baseSellValue: number;
  effects?:      ItemEffect[];
}
```

### 4.9 Crafting & Equipment Upgrades

- Crafting unlocks with Artisan's Insight skill and Manor tier 2+.
- Combine raw materials to create composite items; recipe defined in static data.
- Timed crafting jobs resolved at day-end.
- Equipment can be upgraded from +0 to +3.
- **Upgrade stat bonus per tier:** +1 to all item stat values per tier (e.g., a +2 sword with base ATK 10 has effective ATK 12).
- **Upgrade failure rate:** Forge (random): 0% at +0→+1, 15% at +1→+2, 30% at +2→+3. Alchemy Lab (guided, tier 4+): failure rate halved.
- On failure, item stays at current tier (no destruction).

### 4.10 NPC Population & Simulation

- Procedural NPCs spawn per location, refreshed every 3 days.
- Gender rolled from per-class `genderWeight` (male/female ratio defined on NPC class definition).
- Appearance generated from class-specific rules using the spawn engine.
- First conversation individuates NPC: assigns name (from gendered name pools), adds to contact list (cap 400, configurable in settings).
- Service NPCs (vendors, innkeepers, quest boards, etc.) are fixed, always present, and not subject to refresh.
- Protected NPCs have simplified interaction and fixed daily schedules.
- NPCs follow daily schedules with location slots (e.g., Home 0600–0900, Work 0900–1700, Tavern 1700–2200).
- `hasBeenIntroduced` flag tracks individuation; anonymous NPCs use class-level dialogue only.

**`NpcScheduleDef` schema:**
```typescript
interface NpcScheduleDef {
  slots: { locationId: string; startPhase: DayPhase; endPhase: DayPhase }[];
}
```

### 4.11 Dialogue System

- Branching dialogue trees with conditions — for main quest and acts.
- Generic NPCs share class-level dialogue with introduction node.
- Dialogue choices can set story flags and affect relationships.
- Sexual responses generated dynamically from repository fragments.

**`DialogueNode` schema (TypeScript sketch):**
```typescript
interface DialogueNode {
  id:        string;
  text:      string;
  choices:   DialogueChoice[];
  condition?: DialogueCondition;
}
interface DialogueChoice {
  label:       string;
  nextNodeId:  string;
  effects?:    { flagsSet?: Record<string, boolean>; trustDelta?: number; loveDelta?: number };
  condition?:  DialogueCondition;
}
type DialogueCondition =
  | { type: "FLAG";         flagId: string; value: boolean }
  | { type: "TRUST";        npcId: string; min: number }
  | { type: "LOVE";         npcId: string; min: number }
  | { type: "QUEST_STAGE";  questId: string; stage: number }
  | { type: "ITEM_IN_INV";  itemId: string }
  | { type: "COMPANION";    companionId: string; inParty: boolean };
```

### 4.12 Skills & Abilities

- Two skill trees: Battle (combat) and Ardor (intimacy).
- Nodes require prerequisites (other node IDs) and Battle Points (BP) or Ardor Points (AP).
- Active skills cost Crest Power (CPW).
- Passive skills always active once purchased.
- Skill effects include damage boosts, heals, status effects, and special intimacy enhancements.

**`SkillDef` schema (TypeScript sketch):**
```typescript
interface SkillDef {
  id:             string;
  tree:           "BATTLE" | "ARDOR";
  name:           string;
  isPassive:      boolean;
  cpwCost?:       number;
  pointCost:      number;   // BP or AP
  prerequisites:  string[]; // other skill IDs
  effects:        SkillEffect[];
}
type SkillEffect =
  | { type: "STAT_BOOST"; stat: string; value: number }
  | { type: "DAMAGE_MULTIPLIER"; value: number }
  | { type: "AROUSAL_GAIN"; value: number }
  | { type: "STATUS_APPLY"; statusId: string; chance: number };
```

### 4.13 Status Effects

- Temporary combat and sexual status effects (buffs/debuffs).
- Duration ticks down per turn.
- Stacking refreshes duration and increases stacks up to max.

**`StatusEffectDef` schema:**
```typescript
interface StatusEffectDef {
  id:       string;
  name:     string;
  maxStacks: number;
  duration: number;   // turns
  onTick:   StatusTickEffect[];
}
interface ActiveStatusEffect { defId: string; remainingTurns: number; stacks: number; }
```

### 4.14 Achievements

- Unlockable achievements with Bronze/Silver/Gold/Platinum tiers.
- Trigger conditions evaluated after key actions.
- Grant AP/BP and titles.

### 4.15 World Map & Travel

- Node-based map with 81 locations connected by 92 edges.
- Standard travel uses shortest path (Dijkstra); each segment rolls encounter chance based on time of day.
- **Encounter chance by phase:** Morning 10%; Afternoon 15%; Evening 20%; Night 35%; Midnight 50%.
- Fast travel available to discovered locations; **cost = 5 gold × number of region boundaries crossed**.
- Last safe location updated when entering safe zones (`isSafe: true` on `WorldNode`).
- `RegionMonsterProfile` defines monster types and level ranges per region.

**`WorldNode` schema (TypeScript sketch):**
```typescript
interface WorldNode {
  id:         string;
  name:       string;
  regionId:   string;
  isSafe:     boolean;
  npcClasses: string[];   // which NPC classes spawn here
  monsterProfileId?: string;
}
```

### 4.16 Pregnancy & Offspring

- Gestation lasts **12 in-game weeks** (not days); `pregnancyWeek` tracks 0–12.
- `PregnancyStage` maps to weeks: NotPregnant (0), EarlyFirst (1–2), LateFirst (3–4), EarlySecond (5–6), LateSecond (7–8), EarlyThird (9–10), LateThird (11), FullTerm (12).
- Birth happens at day-end when `pregnancyWeek >= 12`.
- **Conception check:** occurs at day-end if fertile flag is true and vaginal creampie occurred that day; `conceptionChance = fertilityRating / 100`.
- Offspring stats snapshot from parents' combat attributes at birth, averaged with ±10% random variance.
- Offspring alignment randomly assigned: Normal 34%, Troubled 33%, Criminal 33%.
- Offspring may become interactable NPCs in future updates.
- Parentage tracked via parent names (mother/father).

### 4.17 Manor & Base Building

- Manor has 6 tiers, each unlocking new features (storage, suites, crafting, guided upgrades).
- Construction timers decrement at day-end.
- Suites can be assigned to moved-in companions/NPCs.
- Occupants generate passive resources (items or gold) at day-end; collected manually.

**`ManorTier` feature unlock table:**

| Tier | Unlocks |
|------|---------|
| 1 | Basic storage (20 slots), player bedroom |
| 2 | Crafting bench, 1 suite |
| 3 | 3 suites, expanded storage (+10 slots) |
| 4 | Alchemy Lab (guided upgrades), 5 suites |
| 5 | Workshop, 8 suites |
| 6 | Full estate, unlimited suites |

### 4.18 Save/Load & Autosave

- Manual save slots with versioned JSON files.
- Autosave occurs every night at Midnight.
- New Game+ requires explicit confirmation.
- Save files validate against current schema; migration functions for older versions.
- **Serialization note:** `Set<T>` fields (kinks, orgasm types) must be serialized as arrays in JSON and deserialized back to `Set<T>` on load. Custom replacer/reviver required.

### 4.19 Contact List & Profiles

- Contact list combines companions and individuated NPCs (max 400, configurable).
- Profile view shows name, portrait, race, appearance, Trust/Love, relationship status, stats, kink progress, and current location.
- Virginity, pregnancy, and lactation status displayed.
- Contact list sorted by companion quest stage and relationship magnitude.

### 4.20 Procedural Content Generation

- NPC names generated from gendered name pools (per race).
- NPC appearance generated from class-specific rules using the spawn engine.
- **Enemy stat scaling algorithm:**
  - `enemyBaseStat = monsterTypeBase × regionTierMultiplier`
  - Region tier multipliers: Tier 1 = 1.0×; Tier 2 = 1.4×; Tier 3 = 1.9×; Tier 4 = 2.5×; Tier 5 = 3.2×.
  - Monster type bases defined in static `MonsterTypeDef` data.
  - Humanoid enemies spawned via the NPC spawn engine, then overlaid with enemy-specific combat stats scaled to region tier.

---

## 5. Non-Functional Requirements

- **Performance:** UI interactions must respond within 100 ms; server processing within 500 ms for typical actions.
- **Scalability:** Save files up to 10 MB should load in under 2 seconds.
- **Accessibility:** Colorblind-friendly UI, adjustable text size.
- **Localization:** English only at launch; architecture supports multiple languages.
- **Adult Content:** All explicit content must be behind toggles; default state is opt-in.
- **Save Integrity:** Atomic writes prevent corruption; autosave is separate from manual saves.

---

## 6. Acceptance Criteria (High-Level)

1. All core features listed above are playable and stable.
2. Combat, intimacy, relationships, and time systems interact without deadlocks.
3. NPC population refreshes correctly and schedules are respected.
4. Contact list never exceeds 400 entries (configurable cap).
5. Daily flirt/touch counters reset at day-end.
6. Generic NPC introduction occurs only once.
7. Penetration conflict prevents simultaneous same-cavity actions.
8. Quest log displays active, available, and completed quests accurately.
9. Intimacy eligibility checks reject protected NPCs.
10. Loot vs strip-and-loot produce different results.
11. Sleeping NPC non-con gating works as intended.
12. Satisfaction formula and penalties (stamina exhaustion) are correctly applied.
13. Save/load roundtrip preserves all state without loss, including Set fields.
14. Achievement conditions evaluate correctly post-action.
15. Enemy arousal system correctly gates purification victory.
16. Pregnancy conception uses fertility window and conceptionChance correctly.
17. Fatigue penalties apply correctly per days-without-sleep tier.
18. Reputation decay applies only to negative scores, daily.

---

*This PRD supersedes all previous design documents and serves as the authoritative feature scope for implementation.*
