# Ojisan in Another World — Product Requirements Document (PRD)

**Version:** 1.4
**Date:** 2026-08-30
**Status:** Draft for review

---

## 1. Overview

**Ojisan in Another World** is a turn-based erotic RPG that blends tactical combat, relationship building, intimate encounters, and kingdom management. The player controls Player, a character in a fantasy world, as he explores, fights miasma, forms bonds with companions (special named preset NPCs) and NPCs, and ultimately purifies the land.

The game is designed for adult audiences and features consensual and non-consensual sexual content (togglable), deep character progression, and a branching narrative influenced by player choices.

---

## 2. Platform & High-Level Architecture

- **Platform:** Web (desktop and mobile responsive)
- **Frontend:** React 18 SPA — Tailwind CSS (styling), Zustand (client state), React Router v6 (view routing), tRPC client (server communication). No component library; fully custom dark-fantasy aesthetic.
- **Backend:** Server-authoritative game logic exposed via type-safe APIs (tRPC)
- **Persistence:** Local save files stored on disk, with automatic backup and versioning
- **Architecture principles:** Client sends player intents; server processes them and returns updated game state and narrative. All game rules are deterministic and testable. The client is a **dumb renderer** — it displays what the server returns and sends intents back. No game logic lives in the client.

### 2.1 Repository Structure

```
/
├── src/
│   ├── spawn-engine/                  # Character generation module
│   │   ├── types/
│   │   │   └── enums.ts               # All enum definitions
│   │   ├── character/                 # Character data interfaces
│   │   │   ├── bodyTypes.ts
│   │   │   ├── dynamicState.ts
│   │   │   ├── historyProfile.ts
│   │   │   ├── physicalCore.ts
│   │   │   ├── psychologyCore.ts
│   │   │   ├── raceProfiles.ts
│   │   │   └── sexualPhysiology.ts
│   │   ├── generator/                 # Generation algorithms
│   │   │   ├── ageBodyProfile.ts
│   │   │   ├── attractiveness.ts
│   │   │   └── personality.ts
│   │   ├── encounter/
│   │   │   └── patches.ts             # Per-turn intimacy state resolvers
│   │   ├── config/
│   │   │   └── populationConfig.ts
│   │   └── spawnEngine.ts             # Public spawn API
│   ├── state/
│   │   └── gameState.ts               # Root GameState + unified Character interfaces
│   ├── engines/                       # One file per game engine
│   │   ├── dispatcher.ts
│   │   ├── combatEngine.ts
│   │   ├── enemySpawnEngine.ts
│   │   ├── intimacyEngine.ts
│   │   ├── calendarEngine.ts
│   │   ├── relationshipEngine.ts
│   │   ├── reputationEngine.ts
│   │   ├── questEngine.ts
│   │   ├── economyEngine.ts
│   │   ├── craftingEngine.ts
│   │   ├── dialogueEngine.ts
│   │   ├── skillEngine.ts
│   │   ├── statusEffectEngine.ts
│   │   ├── worldEngine.ts
│   │   ├── pregnancyEngine.ts
│   │   ├── manorEngine.ts
│   │   ├── achievementEngine.ts
│   │   └── saveEngine.ts
│   ├── data/                          # Static game data catalogs
│   │   ├── items.ts
│   │   ├── quests.ts
│   │   ├── skills.ts
│   │   ├── worldGraph.ts
│   │   ├── monsters.ts
│   │   ├── namePool.ts
│   │   └── intimacyCatalog.ts
│   ├── api/
│   │   └── router.ts                  # tRPC router
│   ├── client/
│   │   ├── views/                     # One folder per major game screen
│   │   │   ├── hud/                   # Persistent overlay (vitals, phase, party, gold)
│   │   │   ├── overworld/             # Map, location panel, NPC list, action buttons
│   │   │   ├── combat/                # Initiative order, action bar, combat log
│   │   │   ├── intimacy/              # Scene state, action picker, partner panel
│   │   │   ├── dialogue/              # Dialogue tree, choice buttons
│   │   │   └── menus/                 # Tabbed menu shell
│   │   │       ├── inventory/
│   │   │       ├── skills/
│   │   │       ├── quests/
│   │   │       ├── contacts/
│   │   │       └── manor/
│   │   ├── components/                # Reusable primitives (Button, Panel, StatBar, Portrait, etc.)
│   │   ├── hooks/                     # useGameState, useIntent, usePlayer, useCombat, useParty, etc.
│   │   ├── store/                     # Zustand store — holds live GameState snapshot
│   │   ├── mock/                      # mockGameState.ts — realistic sample data for UI dev without backend
│   │   └── App.tsx                    # Shell + React Router routes
│   ├── index.ts                       # Server entry point
│   └── tsconfig.json
├── saves/                             # Runtime save files (gitignored; .gitkeep tracks folder)
├── package.json
├── testSpawn.ts                       # Dev smoke-test for the spawn engine
├── requirements.md
├── requirements_analysis.md
└── task_list.md
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
  player:        PlayerState;        // player-specific state (skills, inventory, fatigue, XP)
  party:         PartyState;         // active companions and their vitals
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

#### 4.1.1 Unified Character Interface

Every entity in the game — player, companion, generic NPC, humanoid enemy, and monster — is a `Character`. All engines (combat, intimacy, dialogue, relationship, pregnancy, etc.) operate on `Character` and its subtypes. This eliminates type mismatches between systems and means the spawn engine, player creation, and enemy spawn engine all produce the same base structure.

**Hierarchy:**

```
Character (base — every entity)
  ├── HumanoidCharacter (player, NPC, companion, humanoid enemy)
  │     Full physical/psychological/physiological profile from spawn engine.
  │     ├── PlayerCharacter   extends HumanoidCharacter
  │     │     Adds: level, XP, skill trees (BP/AP), inventory, CPW pool, fatigue.
  │     │     The player is spawned by the same spawn engine as NPCs;
  │     │     their base Character data is set at character creation.
  │     ├── NpcCharacter      extends HumanoidCharacter
  │     │     Adds: npcId, hasBeenIntroduced, scheduleId, isProtected, isService.
  │     └── EnemyHumanoidCharacter  extends HumanoidCharacter
  │           Adds: aiPattern, manaReserve, lootTable, defeatOutcomeOptions.
  └── MonsterCharacter  (non-humanoid enemies)
        Shares combat stat fields with HumanoidCharacter but has a simplified
        or absent physical/physiological profile.
        Adds: monsterType, miasmaReserve, sexualAttackEligible, aiPattern,
              lootTable, purificationReward, defeatOutcomeOptions.
```

**`Character` base interface (TypeScript sketch):**
```typescript
interface Character {
  id:       string;
  name:     string;
  // Combat attributes — shared by every entity in any engine
  vitals:   CharacterVitals;   // HP, Stamina, CPW, arousal, fatigue
  str:      number;
  agi:      number;
  wis:      number;
  def:      number;
  lck:      number;
  activeStatusEffects: ActiveStatusEffect[];
  characterType: 'PLAYER' | 'NPC' | 'ENEMY_HUMANOID' | 'MONSTER';
}

// HumanoidCharacter adds the full spawn-engine profile
interface HumanoidCharacter extends Character {
  gender:           Gender;
  race:             Race;
  raceFeatures:     RacePhysicalFeatures;
  bodyType:         FemaleBodyType | MaleBodyType;
  skin:             SkinProfile;
  face:             FaceProfile;
  hair:             HairProfile;
  measurements:     FemaleMeasurements | MaleMeasurements;
  physicalDetail:   FemalePhysicalDetail | MalePhysicalDetail;
  sexualPhysiology: FemaleSexualPhysiology | MaleSexualPhysiology;
  personality:      PersonalityCore & ExpandedPersonality;
  sexualPsychology: SexualPsychology;
  voice:            VoiceProfile;
  social:           SocialProfile;
  background:       BackgroundProfile;
  history:          ExperienceHistory;
  dynamicState:     CharacterDynamicState;
}

// PlayerCharacter adds player-exclusive progression state
interface PlayerCharacter extends HumanoidCharacter {
  characterType: 'PLAYER';
  level:           number;
  xp:              number;
  sensitivity:     number;   // erotic stat (player only)
  technique:       number;
  virility:        number;
  battlePoints:    number;   // total earned BP
  ardorPoints:     number;   // total earned AP
  unspentBP:       number;
  unspentAP:       number;
  unlockedSkillIds: string[];
  gold:            number;
  inventorySlots:  number;
  inventory:       InventorySlot[];
}

// NpcCharacter adds NPC simulation state
interface NpcCharacter extends HumanoidCharacter {
  characterType:    'NPC';
  npcId:            string;
  hasBeenIntroduced: boolean;
  scheduleId?:      string;
  isProtected:      boolean;
  isService:        boolean;
  trust:            number;  // -100 to +100 (relationship engine)
  love:             number;  // -100 to +100
  flirtCountToday:  number;  // resets at day-end
  touchCountToday:  number;
}
```

**Key rules:**
- The spawn engine (`src/spawn-engine/spawnEngine.ts`) produces `HumanoidCharacter` for all humanoid spawns — NPCs, companions, humanoid enemies, and the player's base character data at creation.
- `PlayerCharacter` wraps that base data and adds progression fields. It is **not** a separate entity type — it IS a `HumanoidCharacter` with extra fields.
- All combat engine functions accept `Character[]` (the full combatant array), not separate player/enemy arrays. Combat does not need to know whether a combatant is a player, NPC, or enemy — it reads `vitals`, `str`, `agi`, `def`, `lck`, `aiPattern` (where present), and `activeStatusEffects`.
- The intimacy engine works with `HumanoidCharacter` on both sides (player and partner). The partner's `dynamicState`, `sexualPhysiology`, and `sexualPsychology` are updated in place.
- `ContactRecord` in `GameState` stores a reference to the full `NpcCharacter` (not a summary), allowing any engine to access the complete profile.

#### 4.1.2 Party System

The player can have up to **3 active companions** in their party at any time (configurable maximum). Each companion is a full `NpcCharacter` drawn from the contact list.

- **`PartyState`:** tracks the active party members and their current combat/overworld vitals.
- Companion HP/Stamina/CPW carry over between encounters within the same day; only Sleep fully restores them.
- Passive Stamina/CPW recovery (+20% of max) on phase advance applies to **all party members**, not just the player.
- If a companion is downed in combat (HP → 0) they are incapacitated for the rest of that encounter. They revive with 1 HP after combat ends (unless the party wipes).
- Companion fatigue accumulates identically to the player's — sleeping in a safe location restores all party members.
- **`CompanionCombatState`** is the companion's live combat snapshot — derived from their `NpcCharacter` base stats plus any active status effects, equipment, and level-scaled values.

```typescript
interface PartyState {
  companions: PartyMember[];    // max 3 active companions
  maxSize:    number;           // default 3; may expand via story events
}

interface PartyMember {
  npcId:               string;          // reference into contacts[]
  vitals:              CharacterVitals; // live vitals (synced to NpcCharacter.vitals)
  activeStatusEffects: ActiveStatusEffect[];
  isDown:              boolean;         // downed this encounter
  equippedWeaponId?:   string;
  equippedArmorId?:    string;
}
```

**Companion stat derivation:** companions do not have their own separate stat blocks. Their STR/AGI/WIS/DEF/LCK are derived from their `HumanoidCharacter` base (background, occupation, race) and a companion level that tracks their personal progression alongside the player. This is resolved by the character progression engine at load time and cached in `PartyMember`.

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

### 4.21 Frontend Architecture & UI Views

#### 4.21.1 Tech Stack

| Concern | Choice | Reason |
|---------|--------|---------|
| UI framework | React 18 | Component model; hooks; concurrent features |
| Styling | Tailwind CSS | Utility-first; no runtime cost; easy dark-fantasy theming via CSS variables |
| Client state | Zustand | Minimal boilerplate; holds the live `GameState` snapshot from the server |
| Routing | React Router v6 | Named routes per game screen; no page reloads |
| Server comms | tRPC client | End-to-end type safety matching the backend router |
| Component library | None | Full custom — off-the-shelf kits fight the dark-fantasy aesthetic |

#### 4.21.2 Client Architecture Principles

- **Dumb renderer:** the client holds no game logic. It displays the `GameState` snapshot returned by the server after each intent and sends the next intent back.
- **Zustand store** holds the single live `GameState`. All views subscribe to the slice they need; no prop-drilling.
- **Hooks abstract server comms:** views never call tRPC directly. They call hooks (`useIntent`, `useCombat`, etc.) which dispatch intents and update the store.
- **Mock-first development:** `src/client/mock/mockGameState.ts` provides a fully populated realistic `GameState` so every view renders and is interactive without a running backend. Views are wired to mock state first, then switched to live tRPC calls.
- **View isolation:** each view folder is self-contained — its own component file(s), local styles if any, and an `index.ts` barrel. Views receive their data slice as props or from the store; they never reach into other views.

#### 4.21.3 Game Views

The UI is a single-page app. The **HUD** is always visible as a persistent overlay. One **active view** occupies the main area and changes based on game context.

------------------------------
## Title Screen view

* Game Name Header: Prominent stylized typography featuring a dark-fantasy text gradient (bg-clip-text text-transparent bg-gradient-to-b from-stone-200 to-stone-500).
* Menu Options Stack: Vertical column of interactive navigation anchors:
* New Game (triggers character creation view)
  * Continue (greyed out if no server-side save token exists; shows level/location preview on hover)
  * New Game+ (hidden until a game-cleared flag is verified by the server)
  * Content Settings (toggles adult filters, content warnings, and narrative trigger blocks)
  * Settings (manages audio, keybindings, text-scroll speed, and resolution scales)
  * About (opens modal overlay containing credits, licensing, patch notes, and engine version)
* Atmospheric Vignette Layer: Full-viewport subtle CSS animation overlay rendering low-opacity drifting smoke, dust motes, or a slow blood-red pulsation loop.

------------------------------
## HUD (persistent overlay — always visible)

* Player vitals bar: HP, Stamina, CPW as coloured progress bars with current/max numbers.
* Party strip: up to 3 companion portraits with their HP bar; greyed out when downed.
* Phase indicator: current day phase (Morning/Afternoon/Evening/Night/Midnight) with phase action count (e.g. 7/15). Dynamic structural border color glows based on active location safety tier (Gold for Fully Safe, Iron for Humanoid Only, Crimson Pulse for Unsafe).
* Gold counter.
* Fatigue indicator: icon-based; 5 tiers.
* Menu button: opens tabbed menu overlay.

------------------------------
## Unified Spatial Exploration view (Merged Overworld & Manor)

* Location & Safety Header: Displays current location name, region name, and an explicit Safety Tier indicator token (Secure Sanctuary / Fortified Boundary / Perilous Wilds).
* The 30×30 Grid Canvas: Perfectly square layout matrix processing 900 tile components:
* Static Colliders: series of tiles acting as walls, chasms, or structural obstacles that block movement. Door tiles are kept empty to act as clear entry/exit points.
  * Overlapping Occupant Badges: Tiles containing multiple entities (companions, neutral NPCs, or monsters stacked on a single coordinate) render a stacked layer counter button (e.g., +3 or target indicators) prioritizing the player avatar on top.
* Dynamic Presence Panel (The Inspector Lens): Vertical sidebar changing context instantly based on the tile your player stands on or hovers over:
* Entity Stack Accordion: lists all stacked companions/NPCs (reveals social row: Talk, Flirt, Touch, Gift, Intimacy) or monsters (reveals Engage Combat / Purify options).
  * Manor Workspace & Structural Anchor: sits below the entity rows if standing on a base node, revealing room upgrade paths, construction project triggers, or production bench queues.
* Phase Advance / Sleep Button: Changes mechanically based on safety tier: functions as an absolute safe rest multiplier inside the Manor, a guarded time-step in Humanoid Only zones, and a high-risk camp warning button in Unsafe zones.
* Context log: last 5 narrative lines or environmental discovery feedback pushed directly from the server.

------------------------------
## Combat view

* Initiative order strip: portraits in turn order; active combatant highlighted.
* Combatant panels: HP/Stamina bars, status effect icons, name, downed state.
* Action bar: player's available actions for their turn (Attack, Skills, Purify, Flee, Defend, Use Item).
* Combat log: scrollable turn-by-turn narrative.
* Purification progress bar: visible when at least one purification action has been used.

------------------------------
## Intimacy view

* Partner panel: portrait, name, arousal bar, wetness indicator, mental state indicator, resistance bar.
* Scene narrative panel: latest response text from the fragment repository.
* Position picker: grid of available positions.
* Action picker: list of available actions for the current position.
* Scene status bar: player stamina, turn count, scene start type.
* End scene button.

------------------------------
## Dialogue view

* Speaker portrait and name.
* Dialogue text panel.
* Choice buttons: up to 6; greyed out when conditions are not met, hidden when locked by flags.
* Trust/Love delta preview: shown on hover over a choice.

------------------------------
## Menus (tabbed overlay)

* Inventory: item grid with quantity, equip/use/drop actions, gold display. Restricted or simplified when accessed from Unsafe grid regions.
* Skills: Battle and Ardor tree side by side; nodes show cost, prerequisites, unlock state.
* Quests: active/available/completed tabs; objective progress per active quest.
* Contacts: list with portrait, name, race, relationship status, trust/love meters; click for full profile.
* Manor: tier display, construction timer, suite roster, passive resource queue (Greyed out/Locked when player is exploring an Unsafe tier location grid).

------------------------------
## Character Creation view

* Identity Block: character name text input prompt and character portrait selector.
* Origin/Class Toggle Matrix: interactive grid of class cards displaying core starting skills and passive traits when highlighted.
* Attribute Allocation Grid: counter grid for assigning starting points to base statistics (e.g., Strength, Agility, Willpower) with reactive [ + ] and [ - ] buttons.
* Origin Lore Panel: contextual background text updating dynamically based on the selected class or origin choices.
* Finalise Character Button: triggers the client-validated tRPC mutation to register the profile data and boot into the introduction sequence.

------------------------------
## Defeat / Game Over view

* Grim Announcement Text: striking fullscreen notification (e.g., "YOUR SOUL SPLINTERS") indicating party failure or narrative execution.
* Loss Manifest Panel: detailed breakdown of currency lost, items broken, or permanent stat scars/fatigue penalties incurred during death.
* Re-anchoring Command Menu: server-authoritative resolution options:
* Awake at Manor (respawns player at the base with penalties applied)
  * Load Last Autorecord (fetches the most recent checkpoint state from the server)
  * Return to Title Screen

------------------------------
## Exploration Encounter view

* Event Header: context-driven headline banner (e.g., "An Ambush in the Dark", "A Collapsed Pathway"). Triggered directly when a random tile check rolls a trap, surprise environmental block, or script execution flag on Unsafe / Humanoid Only grids.
* Dynamic Event Log: narrative block delivered from the server explaining an environmental trap, road block, or non-combat emergency threat.
* Stat-Check Interactive Actions: a layout of choice buttons mapped to character attributes (e.g., [Agility Test] Dodge the collapsing masonry), displaying success rate percentages.
* Resolution Window: secondary descriptive text displaying the structural fallout of the choice made (damage sustained, items found, or fatigue applied).
* Acknowledge Button: [Proceed] button to close out the event frame and return control to the active 30×30 grid canvas.

------------------------------
## Equipment Management view (Added / Refined)

* Active Character Profile Header: Embedded entirely in the upper section of the Middle Canvas region; displays the active character's name, class, level, and derived stats (ATK, DEF, CRIT, EVA) without touching or altering the left HUD.
* Equipment Slot Matrix: A 6-block layout grid nested in the center of the Middle Canvas tracking active item equipment slots: Weapon, Off-hand, Head, Chest, Hands, and Legs. Upgraded pieces display their explicit tier modifier (e.g., Iron Shortsword +2).
* Valid Storage Cargo Grid: Sits below the paper-doll slots in the Middle Canvas; dynamically populates with a scrollable list of unequipped inventory items matching the currently focused equipment slot category.
* Action bar: Replaced with contextual item modifiers ([Equip Selected], [Unequip Slot], [Forge Upgrade], [Laboratory Mutation], [Discard Loot]).
* Back button: Pinned to Row 3, Column 7 of the hotbar panel; clicking it immediately closes out the interface and reverts from the equipment view directly back to the active interaction view of the Unified Spatial Exploration screen.

------------------------------
## Skill Trees view (Added)

* Available Upgrade Currency Pools: Displays current unspent point trackers (Battle Points [BP] and Ardor Points [AP]) dynamically within the local interface canvas rows.
* Side-by-Side Node Matrix: The main Middle Canvas splits cleanly into dual-pane graphic progression sheets: the Battle Tree map and the Ardor Tree map. Unlocked nodes glow with gold frames, while locked node steps map dependencies via structural connector lines.
* Node Specification Panel: Active tooltips map highlighted node states to the top portion of the Right Panel, detailing functional gameplay variables, prerequisites, CPW costs, and Active/Passive skill definitions.
* Action bar: Interactive development triggers ([Spend Point], [Reset Battle Tree], [Reset Ardor Tree], [Toggle Battle View], [Toggle Ardor View], [Return to Map]).

------------------------------
## Contacts & Detailed Profiles view (Added)

* Sorted Contacts Directory: Displays a robust index list of up to 400 individuated character records inside the Middle Canvas. Rows show portrait tokens, name, race, companion quest milestone stages, and active world location data, sorting automatically by relationship magnitude.
* Deep Metrics Scroller: Dynamically projects deep character data sub-tabs onto the top of the Right Panel upon row click:
* Tab 1 (Social/Bio): Trust/Love scores, 16-cell relationship matrix labels, occupation, origin, and parentage names (Mother/Father).
  * Tab 2 (Physical & Physiology): Body measurements (height, bust, cup size) alongside critical tracking parameters (Virginity status, Pregnancy stage progress tracking, Lactation history).
  * Tab 3 (Psychology): Core personality traits, acquired kinks list, and current psychological resistance profiles (Fight, Freeze, Comply).
* Action bar: Roster and suite management shortcuts ([Inspect Details], [Assign to Active Party], [Move Into Manor Suite], [Dismiss From Pool], [Page Up], [Page Down], [Close Menu]).

------------------------------
## Achievements view (Added)

* Milestone Trophy Grid: A scrollable grid matrix within the Middle Canvas grouping unlockable achievements by tier ranks (Bronze, Silver, Gold, Platinum). Completed blocks illuminate with custom borders and print your unlocked Title tokens.
* Reward Yield Box: Populates the top section of the Right Panel to display the server-validated execution logic requirements for the selected achievement alongside its currency or title payouts (e.g., +5 AP Reward, Title: Miasma Purifier).
* Action bar: Matrix filters and sorting triggers ([Filter: Show All], [Filter: Unlocked], [Filter: Locked], [Sort: Tier Ranks], [Close System Menu]).

------------------------------
## Profile view (player/contact) 
- pending design (currenty thinking of displaying the profile(scrollable) in the middle region and back button to go back to the previous view)

#### 4.21.4 Reusable Component Primitives

All views are built from a shared component library in `src/client/components/`. Required primitives:

| Component | Purpose |
|-----------|----------|
| `StatBar` | Coloured progress bar with current/max label; used for HP, Stamina, CPW, arousal, resistance |
| `Portrait` | Character image placeholder with name tag and status overlay |
| `Panel` | Dark-bordered content container; base for all major UI regions |
| `Button` | Themed action button with disabled/hover states |
| `ActionButton` | Button variant for combat/intimacy actions; shows cost and availability |
| `StatusIcon` | Small icon for active status effects with stack count and remaining turns |
| `PhaseIndicator` | Five-segment bar showing current phase and action count within phase |
| `NarrativeLog` | Scrollable text panel for combat/scene/overworld narrative lines |
| `ChoiceButton` | Dialogue choice button with condition-lock styling and delta preview |
| `RelationshipMeter` | Dual Trust/Love bar with band threshold markers |

#### 4.21.5 Hooks

All server interaction goes through hooks in `src/client/hooks/`. No view imports tRPC directly.

| Hook | Responsibility |
|------|----------------|
| `useGameState()` | Returns the full live `GameState` from the Zustand store |
| `usePlayer()` | Returns `gameState.player`; subscribes to player slice only |
| `useParty()` | Returns `gameState.party`; subscribes to party slice |
| `useCalendar()` | Returns `gameState.calendar`; phase, day, action count |
| `useIntent()` | Sends a `PlayerIntent` to the tRPC router; updates the store with the returned `GameState` |
| `useCombat()` | Wraps `useIntent` for combat-specific intents; exposes current `CombatState` |
| `useIntimacy()` | Wraps `useIntent` for intimacy intents; exposes current `IntimacyScene` |
| `useDialogue()` | Holds current dialogue node; provides `choose(choiceId)` |
| `useContacts()` | Returns `gameState.contacts`; provides lookup by npcId |

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
19. Party companion vitals persist between encounters within the same day and are fully restored on sleep.
20. Downed companions revive at 1 HP after combat ends (unless full party wipe).
21. Phase-advance passive recovery applies to all party members, not just the player.
22. `PlayerCharacter` satisfies the `HumanoidCharacter` interface and can be passed to any engine that accepts one.
23. All combat engine combatant slots accept any `Character` subtype without engine-level type casts.
24. HUD vitals bars update immediately on every `GameState` change without full re-render of the active view.
25. All views render correctly from `mockGameState` without a running backend.
26. No game logic executes in any client component or hook — all business logic lives in `src/engines/`.
27. Switching between views (overworld → combat → intimacy) does not lose HUD state or Zustand store contents.
28. All action buttons are disabled with a visible reason when the action is unavailable (insufficient CPW, wrong phase, etc.).
29. The menu overlay can be opened and closed from any active view without disrupting the underlying view state.

---

*This PRD supersedes all previous design documents and serves as the authoritative feature scope for implementation.*
