/**
 * gameState.ts
 * Root GameState interface and the unified Character type hierarchy.
 *
 * Design principle (PRD §4.1.1):
 *   Every entity — player, NPC, companion, humanoid enemy, monster — is a Character.
 *   All engines operate on Character or its subtypes. No engine-level type casts needed.
 *
 * Hierarchy:
 *   Character
 *     ├── HumanoidCharacter   (full spawn-engine profile)
 *     │     ├── PlayerCharacter   (+ progression: level/XP/skills/inventory)
 *     │     ├── NpcCharacter      (+ simulation: schedule/trust/love/counters)
 *     │     └── EnemyHumanoidCharacter  (+ combat overlay: AI/loot/mana)
 *     └── MonsterCharacter    (simplified profile + combat overlay)
 *
 * Spawn engine types are imported by reference only (string ids) until the
 * spawn-engine barrel is wired in. Replace `unknown` stubs with real types as
 * each spawn-engine submodule is finalised.
 */

// ─── Re-exported primitives ───────────────────────────────────────────────────
// These are the only types engines need to import from this file.
export type { DayPhase, RegionId };
export type {
  Character, HumanoidCharacter, PlayerCharacter, NpcCharacter,
  EnemyHumanoidCharacter, MonsterCharacter, AnyCharacter,
};
export type { NpcRelationship, NpcDailyInteraction };
export type { BondCapTable };
export type { NpcScheduleDef, LocationPopulationDef, NpcClassDef, NpcClass };

// ─── Day phases ───────────────────────────────────────────────────────────────
type DayPhase = 'Morning' | 'Afternoon' | 'Evening' | 'Night' | 'Midnight';

// ─── Region IDs ───────────────────────────────────────────────────────────────
type RegionId = string;

// ─── Shared combat stat block (every entity has this) ────────────────────────
export interface CombatStats {
  str: number;
  agi: number;
  wis: number;
  def: number;
  lck: number;
}

// ─── Character vitals ─────────────────────────────────────────────────────────
// Used for player, companions, NPCs, and enemies alike.
export interface CharacterVitals {
  hp:      { current: number; max: number };   // 0–max
  stamina: { current: number; max: number };   // 0–200
  cpw:     { current: number; max: number };   // Crest Power (0 for monsters)
  arousal: number;                              // 0–100 (intimacy context)
  fatigue: number;                              // days without sleep (0–5+); enemies always 0
}

// ─── Active status effect ─────────────────────────────────────────────────────
export interface ActiveStatusEffect {
  defId: string;
  remainingTurns: number;
  stacks: number;
}

// ─── Inventory ────────────────────────────────────────────────────────────────
export interface InventorySlot {
  itemId: string;
  quantity: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER TYPE HIERARCHY  (PRD §4.1.1)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Base Character ───────────────────────────────────────────────────────────
// Every entity that participates in any engine (combat, intimacy, dialogue…)
// satisfies this interface. Engines that only need to resolve combat use this.
type Character = {
  readonly id:   string;
  name:          string;
  vitals:        CharacterVitals;
  stats:         CombatStats;
  activeStatusEffects: ActiveStatusEffect[];
  readonly characterType: 'PLAYER' | 'NPC' | 'ENEMY_HUMANOID' | 'MONSTER';
};

// ─── Humanoid Character ───────────────────────────────────────────────────────
// Any character with a full spawn-engine profile (produced by spawnEngine.ts).
// Player, NPCs, companions, and humanoid enemies all satisfy this.
// Spawn-engine sub-types are typed as `unknown` here until the barrel is wired;
// replace with real imports when implementing Task 3.1.
type HumanoidCharacter = Character & {
  characterType: 'PLAYER' | 'NPC' | 'ENEMY_HUMANOID';

  // ── Physical ──────────────────────────────────────────────────────────────
  gender:           unknown; // Gender enum
  race:             unknown; // Race enum
  raceFeatures:     unknown; // RacePhysicalFeatures
  bodyType:         unknown; // FemaleBodyType | MaleBodyType
  skin:             unknown; // SkinProfile
  face:             unknown; // FaceProfile
  hair:             unknown; // HairProfile
  measurements:     unknown; // FemaleMeasurements | MaleMeasurements
  physicalDetail:   unknown; // FemalePhysicalDetail | MalePhysicalDetail

  // ── Sexual physiology ─────────────────────────────────────────────────────
  sexualPhysiology: unknown; // FemaleSexualPhysiology | MaleSexualPhysiology

  // ── Psychology ────────────────────────────────────────────────────────────
  personality:      unknown; // PersonalityCore & ExpandedPersonality
  sexualPsychology: unknown; // SexualPsychology
  voice:            unknown; // VoiceProfile
  social:           unknown; // SocialProfile

  // ── Background & history ─────────────────────────────────────────────────
  background:       unknown; // BackgroundProfile
  history:          unknown; // ExperienceHistory

  // ── Runtime dynamic state ─────────────────────────────────────────────────
  dynamicState:     unknown; // CharacterDynamicState (from dynamicState.ts)
};

// ─── Player Character ─────────────────────────────────────────────────────────
// The player IS a HumanoidCharacter — same spawn-engine base — with progression
// fields layered on top. No separate "player entity type" exists at the engine level.
type PlayerCharacter = HumanoidCharacter & {
  readonly characterType: 'PLAYER';

  // Progression
  level:     number;
  xp:        number;

  // Erotic attributes (player-only in PRD §4.1)
  sensitivity: number;
  technique:   number;
  virility:    number;

  // Skill points
  battlePoints: number;  // total earned BP
  ardorPoints:  number;  // total earned AP
  unspentBP:    number;
  unspentAP:    number;
  unlockedSkillIds: string[];

  // Economy
  gold:           number;
  inventorySlots: number; // base 20; expanded by Manor tier
  inventory:      InventorySlot[];
};

// ─── NPC-NPC Relationship record ─────────────────────────────────────────────
// One entry per relationship on an NpcCharacter.npcRelationships array.
// BondType is the single status for NPC-NPC relationships (no 16-cell grid).
type NpcRelationship = {
  readonly targetNpcId:   string;   // the other NPC's npcId
  bond:                   import('../spawn-engine/types/enums').BondType;
  trust:                  number;   // -100 to +100; independent of player-trust
  love:                   number;   // -100 to +100
  bondStrength:           number;   // 0-100; granularity within the bond type
  lastInteractionDay:     number;   // calendar.day of last tick interaction
  interactionCount:       number;   // total ticks ever processed
  intimateEncounterCount: number;   // how many intimate ticks have occurred
};

// ─── Bond cap table (NPC-NPC only) ───────────────────────────────────────────
// Maximum concurrent relationships of each BondType an NPC may hold.
// Collision resolution: weakest existing bond of that type is downgraded to
// Transactional before the new bond is created.
type BondCapTable = Readonly<Record<import('../spawn-engine/types/enums').BondType, number>>;

// ─── NPC daily interaction log entry ─────────────────────────────────────────
// Written during day-end tick; cleared after all interactions resolve.
// Kept on GameState so the tick is re-entrant (no mid-contacts mutation).
type NpcDailyInteraction = {
  readonly subjectNpcId:  string;
  readonly targetNpcId:   string;
  readonly wasIntimate:   boolean;
  readonly trustDelta:    number;
  readonly loveDelta:     number;
  readonly bondStrengthDelta: number;
  readonly corruptionDelta:   number;  // only non-zero on intimate ticks
  readonly day:               number;
};

// ─── NPC Character ────────────────────────────────────────────────────────────
// Generic NPCs and companions. Drawn from the contact list.
// Trust/Love (player-facing) live here; NPC-NPC relationships are in npcRelationships.
type NpcCharacter = HumanoidCharacter & {
  readonly characterType: 'NPC';

  // Identity
  npcId:             string;
  hasBeenIntroduced: boolean;
  scheduleId?:       string;
  isProtected:       boolean;  // simplified interaction only
  isService:         boolean;  // vendor/innkeeper/quest board; never refreshes

  // Player-NPC relationship scalars (owned here, not in a separate ContactRecord)
  trust:            number;  // -100 to +100  (player-facing; RelationshipStatus grid)
  love:             number;  // -100 to +100
  flirtCountToday:  number;  // daily diminishing-returns counter; resets at day-end
  touchCountToday:  number;

  // Bond this NPC holds with the player (set by relationshipEngine).
  // Devoted / Owned / Broken / Corrupted / Submissive held with the player are exclusive:
  // npcSocialEngine blocks the NPC from holding the same BondType with any other NPC.
  // undefined = no special player bond established yet.
  playerBondType?:  import('../spawn-engine/types/enums').BondType;

  // NPC-NPC social graph (max 20 entries; see npcSocialEngine.ts)
  npcRelationships: NpcRelationship[];

  // Companion progression (0 if not a companion)
  companionLevel:   number;
  companionXP:      number;

  // Intimacy encounter block — set when an intimacy scene ends with the NPC
  // having fainted. Cleared automatically by calendarEngine at day-end.
  // undefined = no block in effect.
  intimacyBlockedForDay?: boolean;

  // Life force — tracks how much the NPC can withstand post-faint continuation.
  // 100 = full; bleeds as stamina delta is redirected here after fainting.
  // Recovers to 100 at day-end. Undefined = full (lazy-init at scene start).
  intimacyLifeForce?: number;

  // Permanently deceased — set by dispatcher on NPC_DIED_IN_INTIMACY.
  // Deceased NPCs are removed from contacts[] immediately by the dispatcher;
  // this flag is a tombstone for any dangling references (party, suite assignments).
  // calendarEngine.recoverFaintedPartners() skips deceased NPCs.
  isDeceased?: boolean;

  // Per-NPC move-in override thresholds (Task 9.5).
  // When set, isMoveInEligible() uses these instead of the global 60/60 defaults.
  // Companion preset definitions may author lower thresholds; generic NPCs omit these.
  moveInTrustOverride?: number;
  moveInLoveOverride?:  number;
};

// ─── Enemy Humanoid Character ─────────────────────────────────────────────────
// Humanoid enemies. Same full spawn-engine profile as NPCs; combat overlay added.
type EnemyHumanoidCharacter = HumanoidCharacter & {
  readonly characterType: 'ENEMY_HUMANOID';
  aiPattern:           'Aggressive' | 'Defensive' | 'SupportCaster' | 'BossScripted';
  manaReserve:         number;   // does not regenerate mid-fight
  lootTable:           unknown;  // LootTable
  purificationReward:  unknown;  // { xp: number; gold: number; itemIds: string[] }
  defeatOutcomeOptions: unknown[]; // DefeatOutcome[]
};

// ─── Monster Character ────────────────────────────────────────────────────────
// Non-humanoid enemies. Simplified physical profile (or none); combat overlay.
type MonsterCharacter = Character & {
  readonly characterType: 'MONSTER';
  monsterType:          'Beast' | 'Undead' | 'Elemental' | 'Demon' | 'MiasmaCorrupted';
  aiPattern:            'Aggressive' | 'Defensive' | 'SupportCaster' | 'BossScripted';
  miasmaReserve:        number;  // does not regenerate mid-fight
  sexualAttackEligible: boolean;
  monsterSex:           'Male' | 'Female' | 'None' | 'Ambiguous';
  lootTable:            unknown;  // LootTable
  purificationReward:   unknown;
  defeatOutcomeOptions: unknown[];
};

// ─── Union for engine function signatures ─────────────────────────────────────
type AnyCharacter =
  | PlayerCharacter
  | NpcCharacter
  | EnemyHumanoidCharacter
  | MonsterCharacter;

// ═══════════════════════════════════════════════════════════════════════════════
// PARTY SYSTEM  (PRD §4.1.2)
// ═══════════════════════════════════════════════════════════════════════════════

export interface PartyMember {
  npcId:               string;           // lookup key into contacts[]
  vitals:              CharacterVitals;  // live vitals; synced to NpcCharacter.vitals
  stats:               CombatStats;      // derived from NpcCharacter base + companion level
  activeStatusEffects: ActiveStatusEffect[];
  isDown:              boolean;          // true = incapacitated this encounter
  equippedWeaponId?:   string;
  equippedArmorId?:    string;
}

export interface PartyState {
  companions: PartyMember[];  // max maxSize active companions
  maxSize:    number;         // default 3; may expand via story events
}

// ═══════════════════════════════════════════════════════════════════════════════
// OTHER GAME-STATE BUILDING BLOCKS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Calendar ─────────────────────────────────────────────────────────────────
export interface CalendarState {
  day:              number;    // in-game day counter (starts at 1)
  phase:            DayPhase;
  actionCount:      number;    // actions taken this phase (resets on advance)
  phaseActionLimit: number;    // default 15
}

// ─── Tile map (Unified Spatial Exploration — PRD §4.21.3) ───────────────────────
// Static terrain layout for the current location's 30×30 grid canvas.
// Authored in src/data/tileMaps.ts per location; loaded by the server when the
// player enters a location and returned alongside GameState.
export type TileTerrainType = 'FLOOR' | 'WALL' | 'CHASM' | 'DOOR' | 'EMPTY_EDGE';

// Safety tiers drive HUD border color, sleep button behavior, and menu access.
export type SafetyTier = 'SAFE' | 'HUMANOID_ONLY' | 'UNSAFE';

export interface TileCoord {
  row: number;  // 0–29
  col: number;  // 0–29
}

export interface TileCell {
  coord:      TileCoord;
  terrain:    TileTerrainType;
  isPassable: boolean;      // false for WALL, CHASM, EMPTY_EDGE
  objectId?:  string;       // id of a static interactive object on this tile (chest, door, etc.)
}

export interface TileMap {
  locationId:  string;
  safetyTier:  SafetyTier;
  tiles:       TileCell[][];  // [row][col], always 30×30
  spawnPoints: Record<string, TileCoord>; // entityId → starting coord
}

// Runtime occupant positions — changes on every MOVE intent.
// Key = entityId (player id, npcId, enemy id); value = current tile coord.
export type OccupantPositions = Record<string, TileCoord>;

// ─── World state ──────────────────────────────────────────────────────────────
export interface WorldState {
  currentLocationId:  string;
  discoveredNodeIds:  string[];
  lastSafeLocationId: string;
  tileMap:            TileMap;           // static terrain for current location
  occupantPositions:  OccupantPositions; // live entity positions on the grid
}

// ─── Manor state ──────────────────────────────────────────────────────────────
export interface ManorState {
  tier:                   number;                    // 1–6
  constructionTimerDays:  number;                    // 0 = idle
  suiteAssignments:       Record<string, string>;    // suiteId → npcId
  passiveResourceQueue:   PassiveResource[];
}

export interface PassiveResource {
  itemId:   string;
  quantity: number;
}

// ─── Contact record ───────────────────────────────────────────────────────────
// The contact list holds the full NpcCharacter for each known NPC/companion.
// Engines read the full profile from here; no separate "summary" struct needed.
export interface ContactRecord {
  character: NpcCharacter;  // full profile; trust/love live inside NpcCharacter
}

// ─── NPC schedule definition (PRD §4.10 / Task 4.5) ────────────────────────────
// Static data; authored per NPC archetype in src/data/*.ts.
// The population engine reads this to resolve where an NPC is at a given phase.
export interface NpcScheduleDef {
  readonly scheduleId:  string;
  // Phase → locationId mapping.  Omitting a phase means "same as previous phase".
  phases: Partial<Record<import('./gameState').DayPhase, string>>;
  // Optional overrides for specific calendar days (e.g. market day, festival).
  dayOverrides?: Record<number, Partial<Record<import('./gameState').DayPhase, string>>>;
}

// ─── NPC class assignment (Task 4.7 / 4.8) ───────────────────────────────────
// Defines how many NPCs of each class spawn in a location and their gender split.
export type NpcClass = 'Civilian' | 'Merchant' | 'Guard' | 'Adventurer' | 'Scholar' | 'Noble';

export interface NpcClassDef {
  npcClass:     NpcClass;
  // Fraction of the location's population budget allocated to this class (0–1).
  fraction:     number;
  // Gender weight: 0 = all male, 1 = all female.  Replaces flat genderRatio.
  femaleWeight: number;
  // Occupation pool to draw from when spawning this class.
  occupations:  import('../spawn-engine/types/enums').Occupation[];
}

// ─── Location population definition (Task 4.7) ──────────────────────────────
// Authored per locationId in src/data/locationPopulations.ts.
export interface LocationPopulationDef {
  readonly locationId:    string;
  minNpcs:               number;   // minimum NPCs present between refreshes
  maxNpcs:               number;   // maximum NPCs present between refreshes
  refreshCycleDays:      number;   // how many in-game days between population refreshes
  classAssignments:      NpcClassDef[];
  // IDs of service NPCs that are ALWAYS present (never cleared on refresh).
  serviceNpcIds:         string[];
}

// ─── Quest log ────────────────────────────────────────────────────────────────
export interface QuestLog {
  active:    QuestProgress[];
  completed: string[];   // quest IDs
  available: string[];   // quest IDs whose prerequisites are met
}

export interface QuestProgress {
  questId:               string;
  objectiveProgress:     Record<string, number>; // objectiveId → current count
  cooldownDayRemaining?: number;
}

// ─── Settings ─────────────────────────────────────────────────────────────────
export interface GameSettings {
  adultContentEnabled:    boolean;
  nonConContentEnabled:   boolean;
  contactListCap:         number;  // default 400
  partyMaxSize:           number;  // default 3
  textSize:               'small' | 'medium' | 'large';
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT GAME STATE
// ═══════════════════════════════════════════════════════════════════════════════

export interface GameState {
  saveVersion: number;           // bump on breaking schema changes; drives migration

  // ── Characters ──────────────────────────────────────────────────────────────
  player:   PlayerCharacter;     // the player character (a HumanoidCharacter + progression)
  party:    PartyState;          // active companions and their live combat state
  contacts: ContactRecord[];     // all known NPCs/companions (max settings.contactListCap)

  // ── World & time ────────────────────────────────────────────────────────────
  world:    WorldState;
  calendar: CalendarState;

  // ── Game systems ────────────────────────────────────────────────────────────
  quests:     QuestLog;
  reputation: Record<RegionId, number>;
  manor:      ManorState;

  // NPC-NPC interaction log; populated during day-end tick, cleared after resolution.
  // Engines read this to generate narrative events; never mutate contacts mid-tick.
  npcInteractionLog: NpcDailyInteraction[];

  // ── Meta ────────────────────────────────────────────────────────────────────
  flags:    Record<string, boolean | number | string>; // story flags
  settings: GameSettings;
}

// ═══════════════════════════════════════════════════════════════════════════════
// GAME EVENTS  (inter-engine side effects)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Engines emit GameEvents instead of calling other engines directly.
 * The dispatcher processes the event queue after each intent resolves.
 */
export type GameEvent =
  | { type: 'REPUTATION_CHANGE';    regionId: RegionId; delta: number }
  | { type: 'QUEST_OBJECTIVE_MET';  questId: string; objectiveId: string; count: number }
  | { type: 'COMBAT_ENCOUNTER';     locationId: string }
  | { type: 'NPC_INDIVIDUATED';     npcId: string }
  | { type: 'PREGNANCY_CONCEIVED';  npcId: string }
  | { type: 'BABY_BORN';            motherId: string }
  | { type: 'ACHIEVEMENT_UNLOCKED'; achievementId: string }
  | { type: 'COMPANION_DOWNED';     npcId: string }
  | { type: 'PARTY_WIPED' }
  | { type: 'COMPANION_ADDED';           npcId: string }
  | { type: 'COMPANION_REMOVED';         npcId: string }
  // NPC-NPC social events
  | { type: 'NPC_RELATIONSHIP_FORMED';   subjectId: string; targetId: string; bond: string }
  | { type: 'NPC_RELATIONSHIP_DROPPED';  subjectId: string; targetId: string }
  | { type: 'NPC_BOND_DOWNGRADED';       subjectId: string; targetId: string; fromBond: string }
  | { type: 'NPC_CONFLICT';             subjectId: string; targetId: string }
  | { type: 'NPC_JEALOUSY_SPIKE';        subjectId: string; targetId: string; rivalId: string }
  | { type: 'NPC_INTIMATE_TICK';         subjectId: string; targetId: string }
  | { type: 'NPC_FAINTED_IN_INTIMACY';    npcId: string; atTurn: number }
  | { type: 'NPC_INTIMACY_BLOCKED_FOR_DAY'; npcId: string }
  // Fired when an NPC's life force reaches 0 during an intimacy scene.
  // Dispatcher: mark isDeceased, remove from contacts/party, apply reputation penalty.
  | { type: 'NPC_DIED_IN_INTIMACY'; npcId: string; startType: string; reputationPenalty: number }
  // Fired when a humanoid enemy's life force reaches 0 during a POST_DEFEAT intimacy scene.
  // Equivalent to a combat kill: dispatcher awards XP + resolves loot table; no reputation cost.
  | { type: 'ENEMY_KILLED_IN_INTIMACY'; enemyId: string; lootTableId: string | null; xpReward: number }
  // Fired by combatEngine on PLAYER_DEFEAT; dispatcher routes to enemySpawnEngine.selectDefeatOutcome().
  | { type: 'COMBAT_DEFEAT_OUTCOME'; primaryEnemyId: string; regionId: string }
  // Fired when trust/love changes push the NPC into a different 16-cell band cell (Task 9.8).
  // Dispatcher may use this to trigger dialogue unlocks, scene eligibility changes, etc.
  | { type: 'RELATIONSHIP_STATUS_CHANGED'; npcId: string; from: string; to: string }
  // Fired when the player's bond type with an NPC is explicitly set or changed (Task 9.9).
  // Dispatcher may use this to enforce exclusivity and trigger companion quest stages.
  | { type: 'PLAYER_BOND_SET'; npcId: string; bond: string }
  // Calendar / time events
  | { type: 'PHASE_ADVANCED';   fromPhase: DayPhase; toPhase: DayPhase; day: number }
  | { type: 'DAY_STARTED';      day: number }
  | { type: 'SLEPT';            day: number; locationId: string }
  | { type: 'FATIGUE_COLLAPSE'; day: number };
