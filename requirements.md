# Ojisan in Another World — Product Requirements Document (PRD)

**Version:** 1.9
**Date:** 2026-09-30
**Status:** Draft for review

---

## 1. Overview

**Ojisan in Another World** is a turn-based erotic RPG that blends tactical combat, relationship building, intimate encounters, and kingdom management. The player controls Player, a character in a fantasy world, as he explores, fights miasma, forms bonds with companions (special named preset NPCs) and NPCs, and ultimately purifies the land.

The game is designed for adult audiences and features consensual and non-consensual sexual content (togglable), deep character progression, and a branching narrative influenced by player choices.

The narrative is designed around **three morally equal paths** — Purifier, Pragmatist, and Sovereign — each with internally consistent worldviews, genuine costs, and full quest/dialogue/achievement coverage. No path is the "default"; the world reacts to all three with equal depth.

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
9. NPC-NPC social tick (subset selection, interaction resolution, bond evolution, decay enforcement, slot cap trimming)

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
  trust:            number;  // -100 to +100 (relationship engine, player-facing)
  love:             number;  // -100 to +100
  flirtCountToday:  number;  // resets at day-end
  touchCountToday:  number;
  playerBondType?:  BondType;    // bond held with the player; Devoted/Owned/Broken/Corrupted/Submissive are player-exclusive
  npcRelationships: NpcRelationship[]; // NPC-NPC social graph, max 20 entries
  companionLevel:   number;
  companionXP:      number;
  // Intimacy faint/life-force state (cleared at day-end by calendarEngine)
  intimacyBlockedForDay?: boolean;  // set when scene ends with NPC still fainted; prevents re-engagement that day
  intimacyLifeForce?:     number;   // 0-100; bleeds when stamina costs are redirected post-faint; recovers to 100 at day-end
  isDeceased?:            boolean;  // tombstone set by dispatcher on NPC_DIED_IN_INTIMACY; NPC is removed from contacts[]
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

#### 4.3.1 Overview

Full intimate encounter scenes with turn-by-turn interaction. The intimacy engine is fully server-authoritative; the client sends action intents and renders the returned scene state.

- **Scene start types:** CONSENSUAL, CONSENSUAL_GROUP, FORCE_INTIMACY, FORCE_INTIMACY_SLEEPING, POST_DEFEAT
- **Scene end conditions:** STAMINA_EXHAUSTED (player stamina hits 0), PLAYER_ENDED, ORGASM_LIMIT_REACHED (3 partner orgasms), PARTNER_DECEASED (partner life force reaches 0 — terminal; see §4.3.11)
- **Single source of truth:** all character physiology/psychology types are imported from spawn-engine; no duplicate definitions exist in the intimacy engine

#### 4.3.2 Positions and Actions

- **27 positions** across categories: standard penetrative (Missionary, Cowgirl, ReverseCowgirl, Doggy, Spooning, StandingBehind, Lotus, Lap, StandingMissionary, Ballerina, Flatiron, MatingPress, LyingFullNelson, StandingFullNelson, Piledriver), female-led (FemaleLeadVaginal, FemaleLeadAnal), oral/manual (FaceOral, KneelingOral, Fingering, HandOnBreasts), paizuri (BoobjobPosition), species-gated (LamiaCoil requires `SERPENT_TAIL` feature)
- **55 actions** covering: penetrative (thrust variants, G-spot, cervix, womb, anal), oral (lick, suck, blowjob, deep throat, face fuck, french kiss), ear (lick, bite), manual (finger, rub, stroke, pinch, pull nipples, squeeze ass), affection (kiss, neck bite, whisper, caress), impact (ass spank, breast spank, paddle spank, slap), aggressive (force hold, hair pull), choke sequence (grab_neck -> choke -> release_neck), bondage (rope bind/release, orgasm denial), toys (vaginal/anal/clit/nipple vibrators, anal beads, milker -- all in attach/active/remove pattern), paizuri (boobjob), strip (partner/self), species (lamia constrict)
- **Position gates:** `requiredClothingState`, `minTrust`, `minLove`, `requiredPartnerFeature`, `transitionCost` (stamina cost to switch positions mid-scene)
- **Action gates:** `tecRequirement`, `requiredItems` (non-consumable tools stay in inventory; consumables decremented on use), `requiresNeckGrab` (choke sequence)
- Clothing state ladder: FULLY_CLOTHED -> TOPLESS -> BOTTOMLESS -> FULLY_UNDRESSED; clothing condition TORN on non-consensual strip

#### 4.3.3 Core Mechanics

**Technique check:** `playerTEC + roll(1,10) >= actionTECRequirement`
- Pass: full `stimulationIntensity`
- Fail: `stimulationIntensity x effectivenessOnFail` (default 0.5)

**Final stimulation formula (all multipliers stacked):**
```
stim = baseIntensity
     x tecEfficiency
     x overstimPenalty        // -20%/repeat beyond 2nd consecutive same action
     x kinkMult               // +20% per acquired Kink enum match
     x arousalMult            // 0.6 at arousal 0 -> 1.4 at arousal 100
     x momentumMult           // x1.15 at momentum>=7; x0.90 at momentum<=2
     x zoneSensitivityMult    // per-zone FemaleSensitivityProfile lookup
     x postOrgasmMult         // NORMAL:1.0 / HEIGHTENED:1.4 / OVERWHELMED:0.3
     x subspaceMult           // x1.4 when SubspaceTracker.active
     x jitter                 // +-10% random variance
     x resistanceMult         // arousal gain reduced by resistance + shame friction
     x consumableMult
```

**Pain resolution:**
- `effectivePain = rawPain x painPersonalityMult x (1 - elasticityReduction) x wetnessMult x subspaceMult x consumableMult`
- `painPersonalityMult`: Masochistic SexualLean -> -0.6 (pain converts to arousal); pain-averse profiles amplify pain; scales with `currentResistance`
- Shame amplifies pain for resistant profiles; high elasticity reduces it; subspace reduces it by 70%
- Post-orgasm OVERWHELMED state: +8 pain to `painExcess` per turn until state clears

**Kink system:**
- Action `kinkTagsTriggered` must use `Kink` enum values (not string literals)
- `kinksTriggered` counter only increments on matches against partner's `acquiredKinks: Kink[]`
- Each matching kink adds +20% to the stimulation multiplier chain

**Satisfaction score:**
```
satisfaction = (pleasurePeak x 0.4) + (orgasmCount x 15) + (kinksTriggered x 10) - (painExcess x 5)
Clamped [0, 100]
```

#### 4.3.4 Fluid and Physiological Persistence

All fluid storages and arousal persist between scenes unless in-game rest occurs:

| Field | Character | Notes |
|---|---|---|
| `cumStorage` / `cumStorageMax` | PlayerCharacter | Fills via penetrative actions; expelled at male orgasm |
| `squirtStorage` / `squirtStorageMax` | NpcCharacter.sexualPhysiology | Fills via G-spot/cervix/womb actions; expelled at squirt |
| `squirtProbability` | NpcCharacter.sexualPhysiology | Builds per turn; resets to 0 after squirt fires |
| `milkStorage` / `milkStorageMax` | NpcCharacter.sexualPhysiology | Fills via breast/nipple/milker actions; max derived from cup size |
| `arousalCurrent` | Both | Persists; scene starts at last arousal level |

**Milk storage max by cup size:** AA/A/B = 60; C/D = 100; DD/E = 140; F+ = 180

**Squirt fires when:** `squirtCapacity === true` (OrgasmProfile) AND `squirtStorage > 0` AND `squirtProbability >= 0.55` (diuretic lowers threshold to 0.40)

**Wetness** is derived each turn from `WetnessTrack` via `calculateCurrentWetness()` from patches.ts; not a raw scalar. Wetness level reduces penetrative pain (Dry: no reduction -> Flooding: 75% reduction).

#### 4.3.5 Orgasm System

**Female orgasm:**
- Type determined by `OrgasmProfile.dominantType` (Clitoral/Vaginal/Anal/Combined from `OrgasmType` enum)
- `OrgasmType.Multiple` (body-shaking) fires only when `OrgasmProfile.multipleCapacity === true` AND at least one prior orgasm this scene, OR when orgasm was previously denied via orgasm_denial
- After orgasm, `postSensitivity` (PostOrgasmSensitivity enum) applies: NORMAL (no change), HEIGHTENED (x1.4 stimulation), OVERWHELMED (x0.3 stimulation + pain spike)
- Orgasm chance: `(action.orgasmChance x tecEfficiency x OrgasmEase multiplier) + dominantType zone bonus`
- OrgasmEase multipliers: VeryEasy x1.7, Easy x1.3, Moderate x1.0, Difficult x0.6, VeryDifficult x0.35

**Male orgasm:**
- Player triggers via `resolvePlayerOrgasm(scene, destination: 'INSIDE' | 'OUTSIDE')`
- `cumExpelled` = current `cumStorage` at time of orgasm; storage resets to 0
- INSIDE: partner arousal spike; pregnancy check flagged if no condom
- OUTSIDE: no pregnancy check; `cumOnBody` act flag set

**Orgasm denial:**
- Available when partner arousal >= 85
- Resets arousal to 70; +0.20 squirt probability; +2 kink tokens
- Next orgasm forced to `OrgasmType.Multiple` regardless of `multipleCapacity`

#### 4.3.6 Resistance System

Resistance is a two-layer system: **profile type** (authored per character) + **current resistance** (derived contextually at scene start).

**Profile types** (`ResistanceProfileType` enum):
- `Enjoy`: arousal gains at 120% in non-consensual scenes; pain converts to arousal
- `Comply`: neutral arousal gain; minimal resistance
- `Freeze`: 50% arousal gain; pain amplified by shame
- `Fight`: 30% arousal gain; maximum pain amplification; highest physical resistance

**Current resistance** is derived fresh at every `startScene()` call via `deriveCurrentResistance()`. It represents the *strength* of resistance in this moment, not the character of it. Rules applied additively to `baselineResistance`, clamped [0, 100]:

| Rule | Modifier | Rationale |
|---|---|---|
| High love (>=70) + high trust (>=60) + experience (>=5 encounters) | -40 | Deep mutual bond; she wants this |
| High love + high trust + zero experience | -10 | Loves him but nervous and inexperienced |
| Growing love/trust (40-70) + some corruption (>=20) | -25 | Bond forming; corruption dissolving friction |
| Growing love/trust + no corruption | -15 | Bond forming; some natural friction remains |
| Low love (<20) + high corruption (>=70) + high submission (>=70) | -55 | Fully broken and submissive |
| Low love + high corruption + high attachment (>=60) | -50 | Dependent without love |
| Submission >= 60 (any conditions) | -20 | Direct submission reducer |
| Submission 40-60 | -10 | Partial submission |
| High shame (>=70) + low love (<30) + low corruption (<30) | +20 | Genuinely resistant; no bond, no corruption to dissolve it |
| Low trust (<20) + low love (<20) + virgin with player | +30 | Stranger + no prior experience = maximum resistance |
| Low trust + low love + experienced | +10 | Transactional friction |
| FORCE_INTIMACY + low trust (<40) | +25 | Being forced by someone she doesn't trust |
| FORCE_INTIMACY + high trust (>=60) | -10 | Forced by someone trusted -- conflicted, lower fight |
| POST_DEFEAT + corruption >= 30 | -20 | Defeat + corruption = compliance |
| >= 20 encounters + high love (>=40) | -15 | Comfort and intimacy through familiarity |
| >= 20 encounters + low love | -5 | Familiarity alone reduces friction slightly |
| Hidden desire aligned with scene type | -10 | Secret want matches what's happening |
| Trauma modifier (from ResistanceProfile) | -20 to +30 | Authored per character |

**Mid-scene resistance decay:** `currentResistance` scales the effective resistance multiplier -- at 0 resistance, even a FIGHT profile behaves closer to COMPLY. As arousal builds and acts accumulate, the engine applies the decay via the resistance arousal multiplier formula, creating a natural "breaking down" arc.

**Shame mechanics:**
- Shame friction: `(shame - corruption) / 100 x 0.3` subtracted from arousal gain multiplier
- When shame > corruption, arousal from pleasure is partially suppressed even in COMPLY profiles (body-betrayal arc)
- High shame amplifies pain perception for FIGHT/FREEZE profiles
- Post-scene mood reflects shame state: high satisfaction + high shame -> `MoodValue.AshamedButNeedy`

#### 4.3.7 Partner State Simulation

All partner state trackers are sourced from the spawn engine and updated via patches.ts:

- **PleasureTrack** -- parallel to arousal; `updatePleasure()` called each turn; feeds `pleasurePeak` for satisfaction formula
- **WetnessTrack** -- `calculateCurrentWetness()` each turn; drives lubrication and penetrative pain reduction
- **SubspaceTracker** -- `updateSubspaceTracker()` each turn; when active: pain x0.3, pleasure x1.4
- **AfterglowTracker** -- `triggerAfterglow()` on orgasm; `tickAfterglow()` between orgasms; `AfterglowTracker.active` drives post-scene mood and love/trust delta multiplier
- **FemaleSensitivityProfile** -- per-zone `SensitivityTrack` lookup for each `bodyPartTargeted`; `tryIncreaseSensitivity()` called post-scene on stimulated zones

#### 4.3.8 Consumable Items

| Item | Effect | Duration |
|---|---|---|
| `condom` | Blocks pregnancy check; no other arousal change | Scene-scoped |
| `aphrodisiac_gel` | +30% all arousal gains | 5 turns |
| `lubricant` | -50% penetrative pain; +15% squirt storage gain | 4 turns |
| `diuretic` | +40% squirt storage fill rate; squirt threshold 0.40 (down from 0.55) | 3 turns |
| `paddle` | Required item for paddle_spank (non-consumable tool) | -- |
| `rope` | Required for rope_bondage_bind/release (non-consumable tool) | -- |
| `vaginal_vibrator` / `anal_vibrator` / `clit_vibrator` / `nipple_vibrator` / `anal_beads` / `milker` | Required for respective toy actions (non-consumable tools) | -- |

#### 4.3.9 Scene Progression Features

- **Momentum system** [0-10]: builds on high-pleasure turns (+1.0 at stim>=15); drops on TEC fail (-1.5); at >=7: +15% all arousal; at <=2: -10% all arousal
- **Overstimulation**: same action 3+ consecutive turns triggers -20%/repeat stimulation penalty; forces variety
- **Position transition cost**: switching positions costs `transitionCost` player stamina (default 5; incompatible jumps cost 8)
- **Choke sequence**: `grab_neck` (sets `neckGrabActive`) -> `choke` (requires `neckGrabActive`; high TEC) -> `release_neck` (clears flag; oxygen-return spike)
- **Clothing damage**: TORN condition applied to partner clothing on non-consensual strip actions
- **Afterglow**: satisfaction >=60 triggers afterglow; love/trust deltas multiplied x1.3; partner enters `MoodValue.Afterglow` for one in-game phase

#### 4.3.10 Post-Scene Experience Updates

**Player gains per scene:**
- Technique: +0.5 base; +0.5 at satisfaction >=70; x0.5 diminishing returns on repeat partner
- Virility: +0.3 if player orgasmed this scene
- Sensitivity: +0.2 if player sustained arousal >=50 for >3 turns
- XP: 20 base + 10 per partner orgasm + 15 at satisfaction >=80
- Ardor Points: +1 at satisfaction >=60; +1 additional at satisfaction >=80

**Partner updates per scene (via `resolvePostEncounter()` from patches.ts):**
- Trust/love deltas from satisfaction tier + force penalties
- Per-zone sensitivity increases on stimulated zones (`tryIncreaseSensitivity()`)
- Wetness baseline update
- Orgasm type acquisition (acquires new `OrgasmType` after sufficient encounters)
- Kink acquisition (kink acquisition rate applied per triggered kink)
- Sexual lean drift
- `SexualActFlags` updated with all acts performed
- Corruption delta from `CorruptionShameTrack.corruptionRatePerEncounter x encounterIntensity x sceneMultiplier`
- Mood set to MoodValue enum value based on satisfaction + shame + force status

**`IntimacyScene` state (TypeScript sketch -- full interface):**
```typescript
interface IntimacyScene {
  sceneId:                    string;
  startType:                  SceneStartType;
  partnerNpcId:               string;
  activePositionId:           string | null;
  activeActionId:             string | null;
  occupiedPenetrationTargets: ('VAGINA' | 'ANAL' | 'ORAL')[];
  turnCount:                  number;
  status:                     'RUNNING' | 'STAMINA_EXHAUSTED' | 'PLAYER_ENDED'
                            | 'ORGASM_LIMIT_REACHED' | 'PARTNER_DECEASED';
  clothingState:              ClothingState;    // partner
  selfClothingState:          ClothingState;    // player
  clothingCondition:          'INTACT' | 'TORN';
  // Satisfaction inputs
  pleasurePeak:   number;
  orgasmCount:    number;
  kinksTriggered: number;   // Kink enum match count only
  painExcess:     number;
  // Vitals
  partnerStaminaCurrent: number; partnerStaminaMax: number;
  partnerArousal:        number; partnerPainTolerance: number;
  playerStaminaCurrent:  number; playerStaminaMax:     number;
  playerArousal:         number; playerOrgasmCount:    number;
  // Fluid storages (persist between scenes)
  cumStorage: number; cumStorageMax: number;
  squirtStorage: number; squirtStorageMax: number; squirtProbability: number;
  milkStorage: number; milkStorageMax: number; milkStorageDelta: number;
  // Derived physiology state
  currentWetness:              WetnessLevel;          // from WetnessTrack each turn
  pleasureTrack:               PleasureTrack;         // from patches.ts
  sensitivityModifier:         number;                // additive from sensitivityDelta actions
  postOrgasmSensitivityState:  PostOrgasmSensitivity;
  // Trackers (from patches.ts)
  subspaceTracker:  SubspaceTracker;
  afterglowTracker: AfterglowTracker;
  // Scene progression
  momentumScore:          number;   // 0-10
  lastActionId:           string | null;
  consecutiveRepeatCount: number;
  femaleOrgasmLog:        FemaleOrgasmEvent[];
  neckGrabActive:         boolean;  // choke sequence state
  orgasmDeniedThisScene:  boolean;
  activeConsumables:      ActiveConsumable[];
  actsThisScene:          Partial<SexualActFlags>;
  loveDeltaAccum:         number;
  trustDeltaAccum:        number;
  // Faint / life-force / death system (see §4.3.11)
  partnerHasFainted:       boolean;                  // latches true when stamina hits 0; never resets mid-scene
  faintedAtTurn:           number | null;            // turn on which faint occurred; drives diminishing-return scalar
  partnerLifeForce:        number;                   // 0-100; stamina costs bleed here after fainting; 0 = PARTNER_DECEASED
  partnerEngagementStatus: PartnerEngagementStatus; // derived each turn: Neutral|Resisting|Hesitant|Aroused|Horny|Fainted
}
```

#### 4.3.11 Faint, Life Force, and Death Consequences

When a partner's stamina reaches 0, she **faints** — she does not immediately die and the scene does not end. The player may continue the encounter; however, the rules change significantly from this point.

**Faint mechanics:**
- `partnerHasFainted` latches to `true` on the turn stamina hits 0; never resets within a scene.
- `partnerEngagementStatus` becomes `Fainted` — derived each turn; UI should reflect this state clearly.
- The scene continues but all further actions drain `partnerLifeForce` (0–100, starts at 100 or the NPC's persisted value) instead of stamina.

**Post-faint stimulation (diminishing returns):**
- All stimulation gains are scaled by: `postFaintDRMult = 1 / (1 + turnsSinceFaint × 0.9)`
- On the faint turn itself: ~0.53×; after 4 post-faint actions: ~0.18×. The scene rapidly yields near-zero pleasure output — continuing past the faint is mechanically wasteful as well as consequential.
- This scalar applies to both `finalStim` and arousal gain.

**`partnerEngagementStatus` derivation (pure, per-turn):**

| Status | Conditions (checked in order) |
|---|---|
| `Fainted` | `partnerHasFainted === true` |
| `Horny` | arousal >= 80 AND currentResistance <= 20 |
| `Aroused` | arousal >= 50 |
| `Resisting` | currentResistance > 70 |
| `Hesitant` | currentResistance > 30 OR (arousal < 30 AND shame >= 40) |
| `Neutral` | all others |

**Life force exhaustion (death):**
- When `partnerLifeForce` reaches 0, the scene immediately terminates with `SceneStatus.PARTNER_DECEASED`.
- `endScene()` checks `scene.status === 'PARTNER_DECEASED'` first (before the faint branch).
- Consequences branch on `NpcPartnerProfile.entityType`:

| Entity Type | Death Consequences |
|---|---|
| `NPC` | Emits `NPC_DIED_IN_INTIMACY`; reputation penalty applied (see below); dispatcher removes NPC from `contacts[]` and `party`, sets `isDeceased`, increments `flags['intimacy_death_count']`; satisfaction = 0; no love/trust deltas |
| `ENEMY_HUMANOID` | Emits `ENEMY_KILLED_IN_INTIMACY`; dispatcher awards XP + resolves loot table identically to a combat kill; no reputation cost; satisfaction = 0 |

**Reputation penalty scaling for NPC death:**

| Scene Start Type | Penalty |
|---|---|
| `CONSENSUAL` | −20 (tragic accident; still a crime in-world) |
| `POST_DEFEAT` | −30 (went too far after a victory) |
| `FORCE_INTIMACY` / `FORCE_INTIMACY_SLEEPING` | −40 (murder during assault) |

**Day-end recovery (fainted but alive):**
- If the scene ends with `partnerHasFainted === true` but `partnerLifeForce > 0`: the NPC is blocked from further intimacy that day (`intimacyBlockedForDay = true`).
- `calendarEngine.recoverFaintedPartners()` runs at step 7 of the day-end tick; it clears `intimacyBlockedForDay` and restores `intimacyLifeForce` to 100 on all living NPCs.
- Deceased NPCs (`isDeceased === true`) are skipped by this recovery; they have already been removed from `contacts[]` by the dispatcher.

**Humanoid monster death in intimacy (POST_DEFEAT scenes):**
- Humanoid monsters (Succubus, Incubus, YukiOnna, Oni, KitsuneCorrupted, Lamia, Harpy) can be taken into a POST_DEFEAT intimacy scene after combat defeat.
- If their life force reaches 0 during the scene, this is equivalent to killing them in combat: XP and loot are awarded via `ENEMY_KILLED_IN_INTIMACY`, and no reputation penalty is applied.
- `NpcPartnerProfile.lootTableId` and `xpReward` are populated by the caller when building the profile from an `EnemyHumanoidCharacter`.

#### 4.3.12 Exposure Gate (Phase 28)

Outdoor locations carry a social inhibition check that must pass before any CONSENSUAL scene can begin. The check runs in the dispatcher's `INITIATE_INTIMACY` handling and blocks `startScene()` on failure.

**Derivation — `deriveMoralDegradation(npc): number` [0–100]:**

This is a read-only value computed fresh at gate-check time. It never mutates any field.

```
base = corruptionCurrent × 0.6
     + (100 − shameCurrent) × 0.3
     + clamp(acquiredKinks.length × 4, 0, 10)
result = clamp(base, 0, 100)
if npc.dynamicState.mental.brokenFlag → result = max(result, 90)
```

Source fields (all existing `NpcCharacter` sub-objects — no new stored fields):
- `corruptionCurrent` ← `NpcCharacter.dynamicState.mental.corruptionCurrent`
- `shameCurrent` ← `NpcCharacter.dynamicState.mental.shameCurrent`
- `brokenFlag` ← `NpcCharacter.dynamicState.mental.brokenFlag`
- `acquiredKinks` ← `NpcCharacter.sexualPsychology.acquiredKinks`

**Gate threshold:** passes when `deriveMoralDegradation(npc) >= 35 OR corruptionCurrent >= 40`. Below both values the NPC refuses with a narrative line. The threshold is deliberately lenient — moderate corruption is enough to make someone indifferent to being seen outdoors.

**Bypass:** FORCE_INTIMACY, FORCE_INTIMACY_SLEEPING, and POST_DEFEAT scene types skip this check entirely.

**Location tagging:** `WorldNode.isIndoors?: boolean` (absent = false). Indoor nodes bypass the gate without running the degradation formula. Full authored values deferred to Task 17.DATA; the 5-node stub in `worldGraph.ts` carries the correct initial tags.

**Side effect — `INTIMACY_GATE_BLOCKED` event:** `{ type: 'INTIMACY_GATE_BLOCKED'; gate: 'EXPOSURE'; npcId: string; reason: string }` emitted when the gate blocks. The UI renders `reason` as the NPC's refusal line.

#### 4.3.13 Audience Gate (Phase 28)

Bystander presence in the same location tile-area is a second check that runs in series after the exposure gate for CONSENSUAL scenes.

**Bystander count:** `countBystanders(gameState): number` in `worldEngine.ts` counts occupant IDs in `world.occupantPositions` that are neither `'player'` nor any `party.companions[].npcId`. Dispatcher calls this to populate `IntimacyStartContext.npcsPresent`.

**Gate threshold:** passes when `deriveMoralDegradation(npc) >= 55 OR corruptionCurrent >= 60`. Stricter than the outdoor threshold because being watched by someone is a stronger inhibitor than just being outside.

**Bypass:** same bypass conditions as the exposure gate. Additionally, the gate short-circuits immediately when `npcsPresent === 0`.

**Witnessed sleeping scene (28c.4):** when `scene.startType === 'FORCE_INTIMACY_SLEEPING'` and `npcsPresent > 0` at scene end, the dispatcher applies an additional `shameDelta: +15` to the NPC's `shameCurrent` inline, on top of normal post-scene computation. This is the only case where witnesses produce a mechanical consequence after rather than before the scene.

**`INTIMACY_GATE_BLOCKED` gate field:** `'AUDIENCE'` when this check fires.

#### 4.3.14 Group Scenes — MMF and FFM (Phase 28)

Group scenes involve the player and two NPC partners simultaneously. They use the start type `CONSENSUAL_GROUP` and are always gated behind the most restrictive threshold in the system.

**Group scene gate (`checkGroupSceneGate`):** four conditions in order; first failure blocks and names `failedNpcId`:
1. Primary NPC's companion SQ chain complete (`isCompanionSqComplete(gameState, npc.npcId)` — true when `flags['sq_complete_<npcId>'] === true`, or when the NPC has no authored dialogue tree at all).
2. Second NPC's companion SQ chain complete (same check).
3. Primary NPC: `deriveMoralDegradation >= 50 AND corruptionCurrent >= 55`.
4. Second NPC: same degradation and corruption check.

The gate does not run the exposure or audience checks — group scenes bypass those two gates.

**Intents:**
- `INITIATE_GROUP_INTIMACY: { primaryNpcId, secondNpcId, groupMode: 'MMF' | 'FFM' }` — sent by client to initiate; dispatcher runs the group gate and emits `INTIMACY_GROUP_SCENE_STARTED` on pass.
- `END_SCENE` carries `persistence.secondPartnerNpcId` and optional second-partner fields when ending a group scene.

**`IntimacyScene` group extensions:**

All fields are null/empty in solo scenes. Populated by `startGroupScene()` for `CONSENSUAL_GROUP`:

```typescript
// Added to IntimacyScene (Phase 28):
secondPartnerNpcId:            string | null;
secondPartnerProfile:          NpcPartnerProfile | null;
secondPartnerArousal:          number;
secondPartnerStaminaCurrent:   number;
secondPartnerStaminaMax:       number;
secondPartnerHasFainted:       boolean;
secondPartnerLifeForce:        number;
secondPartnerEngagementStatus: PartnerEngagementStatus;
secondOrgasmLog:               FemaleOrgasmEvent[];
secondLoveDeltaAccum:          number;
secondTrustDeltaAccum:         number;
groupMode:                     'MMF' | 'FFM' | null;
```

**Action routing:** `resolveSceneAction()` accepts an optional `targetPartnerId?: string`. When present and matching `scene.secondPartnerNpcId`, all arousal/resistance/stamina/faint/life-force/orgasm calculations are applied to the `secondPartner*` fields. Shared scene fields (turnCount, status, momentum, clothingState, consumables, actsThisScene, neckGrabActive) remain unified across both partners.

**Position filtering:** `IntimacyPosition.groupMode?: 'MMF' | 'FFM' | 'SOLO'` (absent = SOLO). `getAvailableActions()` excludes SOLO positions in group scenes and MMF/FFM positions in solo scenes.

**`SceneEndPersistence` group extensions:** optional second-partner fields (`secondPartner*` mirroring the primary partner fields) plus `jealousyFired?: boolean`. All undefined in solo scenes.

**Satisfaction in group scenes:** `(primarySatisfaction + secondSatisfaction) / 2`, clamped [0, 100]. Each partner's satisfaction is computed independently by the same formula as solo scenes.

**Post-scene persistence:** `resolvePostIntimacy()` calls `resolvePostEncounter()` for each partner independently when `persistence.secondPartnerSquirtStorage !== undefined`. Both NPC contact records are updated independently by the dispatcher.

**Events:**
- `INTIMACY_GROUP_SCENE_STARTED: { primaryNpcId, secondNpcId, groupMode }` — emitted by dispatcher on gate pass.
- `INTIMACY_GROUP_SCENE_ENDED: { primaryNpcId, secondNpcId, satisfaction, jealousyFired }` — emitted by dispatcher in END_SCENE handler.
- `NPC_JEALOUSY_SPIKE: { subjectId, targetId, rivalId: 'player' }` — emitted when jealousy fires.

#### 4.3.15 Group Scene Jealousy (Phase 28)

Jealousy is evaluated post-scene only — there is no mid-scene interruption.

**`checkGroupJealousy(primaryNpc, secondNpc): boolean`** returns true when:
- Either NPC's `npcRelationships` array contains the other NPC's id, AND
- On that relationship entry: `bond === BondType.Devoted || bond === BondType.Owned` (exclusive bonds), OR either NPC's `social.jealousyTendency === JealousyTendency.High`.

When true, the dispatcher applies a synthetic NPC-NPC interaction delta between the two partners: `trustDelta: -8, loveDelta: -5, bondStrengthDelta: -10`. Applied inline to `npcRelationships` entries in `contacts[]`. The `NPC_JEALOUSY_SPIKE` event is emitted and the `processEventQueue` handler sets `flags['jealousy_<subjectId>_<targetId>'] = true` for the UI indicator.

### 4.4 Relationships & Trust/Love

- Relationships modeled by Trust and Love (each -100 to +100), plus encounter-based bond type and intimacy-derived fields (corruption, shame, broken flag, submission, attachment).
- **Band thresholds:** Low = -100 to -25; Neutral = -25 to 25; High = 25 to 75; VeryHigh = 75 to 100.
- **16-cell relationship matrix:** (TrustBand × LoveBand) → RelationshipStatus label + available interaction options. This grid applies to player-NPC relationships only.
- Gift giving, flirting, touching, and dialogue choices modify Trust and Love.
- Flirt and Touch have daily diminishing returns (max 3 per character per day; counters reset at day-end).
- Move-in eligibility: Trust ≥ 60 AND Love ≥ 60 (or per-character override thresholds).
- Bonding system: bond type and strength track deep relationship milestones (from encounter history).
- `playerBondType` on `NpcCharacter` records the bond held with the player. The following bond types are player-exclusive: `Devoted`, `Owned`, `Broken`, `Corrupted`, `Submissive`. An NPC holding one of these with the player cannot simultaneously hold the same type with another NPC.

### 4.4a NPC-NPC Relationship System

- NPCs maintain their own social graph (up to **20 relationships** per NPC), separate from the player-NPC relationship grid.
- **Single status:** `BondType` is the sole relationship status for NPC-NPC bonds (no 16-cell grid). `trust`, `love`, and `bondStrength` scalars provide granularity within each bond type.
- **Bond type ladder** (Stranger → Acquaintance → Familiar → Friend → CloseFriend → Crush → Attachment → Dependent → Love → Devoted; with branching paths to Obsession, HateLove, PureHate, Submissive, Transactional).
- **Bond caps per NPC** (maximum concurrent relationships of that type): Devoted 1, Owned 1, Submissive 1, Broken 1, Corrupted 1, Obsession 2, Love 2, HateLove 3, Worshipful 2, Dependent 4, Attachment 6, Transactional 10, PureHate 8. Collision resolution: weakest existing bond of that type is downgraded to Acquaintance.
- **30-day decay:** any relationship with no interaction in 30 in-game days is dropped. A `NPC_RELATIONSHIP_DROPPED` game event is emitted.
- **Interaction types per day-end tick:** Talk (all bonds except PureHate/Broken/Corrupted), Flirt (Crush/Attachment/Love/HateLove/Obsession/Devoted/Worshipful/CloseFriend), Intimate (Love/Devoted/Obsession/HateLove/Submissive/Owned — same-location gate + probability check), Conflict (PureHate/Broken/Corrupted).
- **Intimate tick:** 4 loops × 5 randomly sampled actions (labels only, no per-action simulation); flat stat deltas applied per loop.
- **Subset selection:** only a subset of NPCs tick per day. Inclusion score = personalityScore (0–40, extraversion + trustBaseline + emotionalStability) + relationshipPull (0–40, bond depth + recency) + locationBonus (0–20, player co-location). NPCs above threshold 25 tick; fully isolated NPCs also require sharing a scheduleId and personalityScore ≥ 15.
- **Player-exclusive bond enforcement:** `evolveBond()` in `npcSocialEngine.ts` checks `npc.playerBondType`; if the NPC already holds a player-exclusive bond type with the player, it cannot evolve into that same type with another NPC.

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

## 4.22 Moral Alignment System

### 4.22.1 Design Intent

The world does not have a single correct moral answer. Three worldviews exist in genuine tension, each with internal logic, real costs, and lore support equal in depth to the others. The player's alignment is not a score that unlocks a reward tier — it is a running reflection of the choices they have actually made, and it shapes how every faction, NPC, and quest line responds to them.

No path is the default. The Purifier is not the hero. The Sovereign is not the villain. The Pragmatist is not a coward. All three are coherent, adult positions in a world that has earned its complexity.

### 4.22.2 The Three Paths

**Purifier — "The world can be healed"**
The miasma is a corruption of something that was once whole. To purify is to restore what was lost. But the Purifier walks a shadow: the old world they seek to restore may no longer be wanted by those who built their lives in its absence. Cleaning up the world is not the same as improving it.
- *Costs:* ecosystems adapted to miasma are disrupted; communities built on it resent you; some beings cannot be saved without being destroyed
- *Rewards:* purity fragments/crystals, high regional reputation, holy-tier gear, alliance contacts among survivors and reformers
- *Moral tension:* Is restoring the old world worth erasing what grew in its place?

**Pragmatist — "The world adapts; so do I"**
The miasma has been here long enough that entire economies, cultures, and creatures have formed around it. A Pragmatist does not see it as evil — they see it as the current reality, and they navigate it. They trade with both sides, fight only when necessary, and hold no loyalties that cost more than they pay.
- *Costs:* no faction fully trusts you; you earn neither the Purifier's moral satisfaction nor the Sovereign's dark loyalty; every settlement knows you are for sale
- *Rewards:* access to both-faction vendors, mercenary-tier items unavailable on either pure path, flexible faction standing, highest gold throughput
- *Moral tension:* neutrality benefits you at the expense of everyone who needed you to pick a side

**Sovereign — "Power is the only honest currency"**
The miasma is not corruption — it is potential. The Sovereign path is not mindless cruelty; it is a coherent worldview that sees the purification effort as naive and the existing power structures as corrupt. The Sovereign builds something — it simply requires fear to sustain. Fear, submission, and the willingness to hold what you take.
- *Costs:* NPCs die or flee; relationships that survive are based on fear or dependency; the thing you are building demands constant maintenance
- *Rewards:* dark-faction allies, corrupted gear with genuine power advantages, fear-based reputation that opens unique dialogue and quest branches, infamy mechanics that become assets rather than penalties
- *Moral tension:* you are also building — the question is what it costs the people inside it

### 4.22.3 Alignment Score

`alignmentScore: number` is added to `GameState.player` as a scalar in the range **[-100, +100]**.

- Negative values reflect Sovereign tendency; positive values reflect Purifier tendency; values near zero reflect Pragmatist tendency
- The score shifts gradually based on meaningful quest decisions, not combat outcomes (killing an enemy does not move alignment; *how* you resolve the aftermath does)
- The score does not lock the player into a path — it reflects accumulated tendency
- A **dominant alignment** is derived from the score for dialogue conditions and faction gating:
  - `score >= 40` → `PURIFIER`
  - `score <= -40` → `SOVEREIGN`
  - `-39 to +39` → `PRAGMATIST`
- Derived alignment is re-evaluated after every meaningful intent that shifts `alignmentScore`

```typescript
// Addition to PlayerCharacter (or PlayerState, depending on where progression state lives)
alignmentScore: number;  // -100 to +100; init 0
```

### 4.22.4 Dual Reputation Track

The existing `reputation: Record<RegionId, number>` track reflects standing with civilian/kingdom factions (Purifier-positive, Sovereign-negative). A parallel **dark reputation** track is added:

```typescript
darkReputation: Record<RegionId, number>;  // 0 to 100 per region; starts 0
```

- Dark reputation rises through Sovereign-path actions (infamy accumulation, dark-quest completion, coercion of local power structures)
- Dark reputation falls when Purifier-path actions dominate a region or when a `crime_pardoned` flag is granted
- At `darkReputation[regionId] >= 40`, the region's **shadow faction** (underground guild, demon court, or miasma cult — defined per region in the world graph) opens unique vendors, quests, and dialogue
- The two reputation tracks are independent; high dark reputation does not directly reduce regular reputation (the actions that earn dark reputation may have their own separate regular reputation penalties, but the tracks are not linked by formula)

### 4.22.5 Alignment-Gated Dialogue Conditions

The `DialogueCondition` union gains a new variant:

```typescript
{ type: 'ALIGNMENT'; dominantAlignment: 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN' }
```

This allows dialogue nodes, quest branches, and NPC reactions to gate on derived alignment without referencing the raw score. Used in:
- NPC greeting and reaction lines (fear / wariness / gratitude depending on dominant alignment)
- Quest resolution branch availability (all three branches may exist for a quest; only the relevant one is visible)
- Dark-faction contact unlock conditions
- Final convergence quest choice gating (see §4.22.6)

### 4.22.6 Quest Authoring Contract

All main-story quest chapters must have **three resolution branches** — one per dominant alignment — covering the same objective through morally distinct conclusions. The three branches are authored together; none is marked "true" or "canonical."

**Side quests:** Each path requires at least **2 alignment-exclusive side quests** that are only available when the player's dominant alignment matches. These are not gated by a binary flag — they open naturally as alignment score crosses the threshold.

**Board quests** are path-neutral: they pay gold and do not shift alignment.

**Alignment-exclusive achievement entries** exist for each tier (see §4.15): one Purifier achievement per tier, one Sovereign, one Pragmatist.

### 4.22.7 The Final Convergence Quest

Late in the main story, a single quest — **"The Weight of What You've Built"** — becomes available to all players regardless of alignment. This quest presents three choices that each resolve the central conflict in a way consistent with the player's dominant path:

| Choice | Path | Outcome |
|--------|------|---------|
| Purify the Sovereign core | Purifier | The miasma is destroyed; the world begins recovery; what was lost returns — slowly, at a cost to what now exists |
| Bind and contain it | Pragmatist | The miasma is neither destroyed nor freed; you become the thing that holds it in check; the world stabilises under your watch, uneasy but alive |
| Absorb and wield it | Sovereign | The miasma becomes yours; you are the new sovereign; the world fears you and functions because of that fear |

All three endings are authored with equal narrative weight. None triggers a "bad ending" screen. Each has its own epilogue, achievement, and title unlock.

The quest has no alignment gating on the choices themselves — any player may choose any outcome. The dominant alignment only determines which choice *feels earned* based on what the player has actually built.

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
30. `alignmentScore` shifts only on meaningful quest/dialogue decisions; combat kill/purify outcomes alone do not move it.
31. Dark reputation track is region-local and independent of the regular reputation track by formula.
32. All three alignment paths have equal quest branch coverage — no main-story quest chapter has a resolution written for fewer than three paths.
33. The final convergence quest choices are available to all players regardless of dominant alignment; gating is narrative, not mechanical.

---

*This PRD supersedes all previous design documents and serves as the authoritative feature scope for implementation.*
