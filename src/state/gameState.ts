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

// ─── NPC Character ────────────────────────────────────────────────────────────
// Generic NPCs and companions. Drawn from the contact list.
// Trust/Love live here (not in a separate ContactRecord summary) so any engine
// can read the full profile without a second lookup.
type NpcCharacter = HumanoidCharacter & {
  readonly characterType: 'NPC';

  // Identity
  npcId:             string;
  hasBeenIntroduced: boolean;
  scheduleId?:       string;
  isProtected:       boolean;  // simplified interaction only
  isService:         boolean;  // vendor/innkeeper/quest board; never refreshes

  // Relationship (owned here, not in a separate ContactRecord)
  trust:            number;  // -100 to +100
  love:             number;  // -100 to +100
  flirtCountToday:  number;  // daily diminishing-returns counter; resets at day-end
  touchCountToday:  number;

  // Companion progression (0 if not a companion)
  companionLevel:   number;
  companionXP:      number;
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

// ─── World state ──────────────────────────────────────────────────────────────
export interface WorldState {
  currentLocationId:  string;
  discoveredNodeIds:  string[];
  lastSafeLocationId: string;
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
  | { type: 'PHASE_ADVANCED';       newPhase: DayPhase }
  | { type: 'DAY_ENDED';            newDay: number }
  | { type: 'ACHIEVEMENT_UNLOCKED'; achievementId: string }
  | { type: 'COMPANION_DOWNED';     npcId: string }
  | { type: 'PARTY_WIPED' }
  | { type: 'COMPANION_ADDED';      npcId: string }
  | { type: 'COMPANION_REMOVED';    npcId: string };
