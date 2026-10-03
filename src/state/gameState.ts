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
 * Tasks 3a.8–3a.10: all `unknown` spawn-engine stubs replaced with real types.
 */

// ─── Spawn-engine type imports (Tasks 3a.8–3a.10) ────────────────────────────
// All HumanoidCharacter fields that were `unknown` are now typed via these imports.
import type { Gender, Race, FemaleBodyType, MaleBodyType } from '../spawn-engine/types/enums';
import type {
  RacePhysicalFeatures,
  SkinProfile, FaceProfile, HairProfile,
  FemaleMeasurements, MaleMeasurements,
  FemalePhysicalDetail, MalePhysicalDetail,
} from '../spawn-engine/character/physicalCore';
import type {
  FemaleSexualPhysiology, MaleSexualPhysiology,
} from '../spawn-engine/character/sexualPhysiology';
import type { ExpandedPersonalityCore } from '../spawn-engine/generator/personality';
import type { SexualPsychology, VoiceProfile, SocialProfile } from '../spawn-engine/character/psychologyCore';
import type { BackgroundProfile, ExperienceHistory } from '../spawn-engine/character/historyProfile';
import type { CharacterDynamicState } from '../spawn-engine/character/dynamicState';

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
export type { QuestStatus, QuestEntry, QuestLog };
export type { CraftingJob, CraftingQueue, EquipmentSlot };
export type { WorldNode, WorldEdge, EnemyRoamDef };
export type { PregnancyState, OffspringRecord };
export type { AchievementEntry };
export type { ContactProfileView };
export type { DialogueEffect, DialogueCondition, DialogueChoice, DialogueNode, DialogueTree, DialogueState };
export type { HoldingCell };
// Phase 24 generic engine schema types
export type { AlignmentState, AlignmentAxis };
export type { InfamyState, BountyTier };
export type { EnvironmentState, WeatherCondition, WeatherEffect };
export type { SpireNetwork, SpireState };
export type { JobArchetypeState, JobResourceSystem, ClassProgressionState };
export type { SynergyState, SynergyPairState };
export type { CharacterCreationOptions };
// Phase 26 schema types
export type { TitheState, AetherSocket, LocationFeatureKey, CoreStatKey };
// SaveMeta is defined in saveEngine.ts; re-exported here so UI layers
// can import it from the central state module without a direct engine import.
export type { SaveMeta } from '../engines/saveEngine';

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

// ─── Pregnancy (Phase 18) ────────────────────────────────────────────────────
// Inline state block on NpcCharacter; undefined = not pregnant and not flagged.
// pregnantFlaggedToday is set by flagPregnancyRisk() on day a creampie occurred;
// cleared by checkConception() at day-end regardless of roll outcome.
export interface PregnancyState {
  pregnancyWeek:        number;          // 0 = just conceived; 12 = birth triggers
  stage:                import('../spawn-engine/types/enums').PregnancyStage;
  fatherId:             string;          // player.id in the normal case
  conceptionDay:        number;          // calendar.day when week=0 was set
  pregnantFlaggedToday: boolean;         // set by creampie; cleared at day-end
}

// Offspring born from pregnancy. Not a live character; read-only record.
export interface OffspringRecord {
  readonly id:          string;
  readonly motherId:    string;          // NPC npcId
  readonly fatherId:    string;          // player.id or NPC npcId
  readonly birthDay:    number;
  readonly alignment:   'Normal' | 'Troubled' | 'Criminal';
  readonly stats:       CombatStats;
  name?:                string;          // authored after birth; optional
}

// ─── Inventory ────────────────────────────────────────────────────────────────
export interface InventorySlot {
  itemId:       string;
  quantity:     number;
  // Equipment upgrade tier (0-3). Undefined = +0 (no upgrade applied).
  // Lives on the slot (runtime state), not on ItemDef (static catalog).
  upgradeLevel?: number;
  // Aether socket slots (Task 26.10).
  // Max sockets = Math.floor(upgradeLevel / 5). Unlocks at +5.
  // Only meaningful on WEAPON and ARMOR items; undefined = no sockets.
  sockets?: AetherSocket[];
}

// ─── 7-stat CoreStatKey (Task 26.1) ──────────────────────────────────────────
// Re-exported from statEngine.ts; duplicated here so all engine imports from
// the central state module work without a separate statEngine import.
export type CoreStatKey = 'str' | 'dex' | 'agi' | 'int' | 'wil' | 'per' | 'end';

// ─── Tithe / weekly quota system (Task 26.4) ──────────────────────────────────
// Tracks mandatory Aether Tithe payments to the Enclave.
// Introduced when the relevant main quest first activates the system.
export interface TitheState {
  lastPaidDay:       number;  // calendar.day of the most recent payment (0 = never paid)
  quotaGoldPerWeek:  number;  // weekly obligation; set by the activating quest (0 = inactive)
  overdueBy:         number;  // days since quota was due (increments each day unpaid)
}

// ─── Item socket system (Task 26.10) ──────────────────────────────────────────
// Each socket accepts one Aether Crystal material and grants a passive effect.
// Sockets unlock at upgrade tiers that are multiples of 5: +5 → 1 socket, +10 → 2 sockets.
export interface AetherSocket {
  socketId:        string;   // e.g. 'slot_0', 'slot_1'
  inlaidMaterialId?: string; // itemId of the Aether Crystal inserted; undefined = empty
  passiveEffect?:  string;   // derived label from material metadata; e.g. 'fire_damage_bonus_5'
}

// ─── Location features (Task 26.20) ───────────────────────────────────────────
// Flags that a WorldNode may carry to unlock mini-game intents.
export type LocationFeatureKey =
  | 'fishing'
  | 'gambling'
  | 'arena'
  | 'onsen'
  | 'shrine'
  | 'market'
  | 'smithy'
  | 'alchemy_lab';

// ─── Inventory slot (updated) ─────────────────────────────────────────────────

// ─── 18-slot equipment schema (Task 26.7) ─────────────────────────────────────
// Expands the original 6-slot schema.
// PAIRED slots: RING_L + RING_R, EARRING_L + EARRING_R.
// RELIC is a unique-item slot (one legendary per build).
// OFF_HAND still accepts WEAPON or TOOL.
export type EquipmentSlot =
  | 'WEAPON'     // main hand
  | 'OFF_HAND'   // shield, second weapon, or tool
  | 'HEAD'
  | 'FACE'       // mask, goggles, visor
  | 'NECK'       // amulet / choker
  | 'SHOULDER'
  | 'CHEST'
  | 'BACK'       // cloak / cape
  | 'WRIST'      // bracers
  | 'HANDS'
  | 'WAIST'      // belt
  | 'LEGS'
  | 'FEET'
  | 'RING_L'
  | 'RING_R'
  | 'EARRING_L'
  | 'EARRING_R'
  | 'RELIC';     // legendary-only; one per build

// ─── Crafting queue (Phase 15) ────────────────────────────────────────────────
// One job per recipe in progress; multiple jobs only when manor tier allows it.
export interface CraftingJob {
  recipeId:         string;
  slotIndex:        number;   // which crafting slot (0-indexed)
  startedOnPhase:   number;   // absolute phase number when job was queued
  completesOnPhase: number;   // absolute phase number when job resolves at day-end
}

// Root crafting queue on GameState.
// maxSlots is 0 until manor tier 2; 1 at tier 2, +1/tier up to 4 at tier 5+.
export interface CraftingQueue {
  jobs:     CraftingJob[];
  maxSlots: number;
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
// Tasks 3a.8–3a.10: all previously-unknown fields now carry real spawn-engine types.
// Partial<> variants allow service-NPC stubs and enemy partial profiles to satisfy
// the interface without a full spawn pass.
type HumanoidCharacter = Character & {
  characterType: 'PLAYER' | 'NPC' | 'ENEMY_HUMANOID';

  // ── Physical ──────────────────────────────────────────────────────────────
  gender:           Gender;
  race:             Race;
  raceFeatures:     RacePhysicalFeatures | Partial<RacePhysicalFeatures>;
  bodyType:         FemaleBodyType | MaleBodyType;
  skin:             SkinProfile | Partial<SkinProfile>;
  face:             FaceProfile | Partial<FaceProfile>;
  hair:             HairProfile | Partial<HairProfile>;
  measurements:     FemaleMeasurements | MaleMeasurements | Partial<FemaleMeasurements> | Partial<MaleMeasurements>;
  physicalDetail:   FemalePhysicalDetail | MalePhysicalDetail | Partial<FemalePhysicalDetail> | Partial<MalePhysicalDetail>;

  // ── Sexual physiology ─────────────────────────────────────────────────────
  // Partial<> covers enemy/captive stubs that only fill the relevant sex fields.
  sexualPhysiology: FemaleSexualPhysiology | MaleSexualPhysiology | Partial<FemaleSexualPhysiology> | Partial<MaleSexualPhysiology>;

  // ── Psychology ────────────────────────────────────────────────────────────
  // ExpandedPersonalityCore is the superset returned by generateExpandedPersonality().
  // Service NPC stubs and enemy stubs carry Partial<>; fully-spawned chars the full type.
  personality:      ExpandedPersonalityCore | Partial<ExpandedPersonalityCore>;
  sexualPsychology: SexualPsychology | Partial<SexualPsychology>;
  voice:            VoiceProfile | Partial<VoiceProfile>;
  social:           SocialProfile | Partial<SocialProfile>;

  // ── Background & history ─────────────────────────────────────────────────
  background:       BackgroundProfile | Partial<BackgroundProfile>;
  history:          ExperienceHistory | Partial<ExperienceHistory>;

  // ── Runtime dynamic state ─────────────────────────────────────────────────
  // Partial<> covers service NPC stubs where dynamic state is lazy-initialised.
  dynamicState:     CharacterDynamicState | Partial<CharacterDynamicState>;

  // ── 7-stat CoreStatKey record (Task 26.2) ────────────────────────────────
  // Full 7-stat allocation; deriveCombatStatsFromCoreStats() maps this to
  // CombatStats for engine consumption. Partial<> on stubs; full record after
  // character creation.
  coreStats?: Partial<Record<CoreStatKey, number>>;
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

  // Moral alignment score (Phase 23a — task 23a.1)
  // Range [-100, +100]. Negative = Sovereign tendency, positive = Purifier,
  // near-zero = Pragmatist. Does NOT lock the player into a path.
  alignmentScore: number;

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
  // Equipped items by slot. Values are itemId strings into the inventory.
  // A slot being absent/undefined means nothing is equipped there.
  equipped:       Partial<Record<EquipmentSlot, string>>;
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

  // Pregnancy state — present only while pregnant or flagged for a conception check.
  // undefined = not pregnant and not pending a check.
  pregnancyState?: PregnancyState;

  // Lactation active flag — set to true on birth; not tied to sexualPhysiology.
  // Cleared only by explicit story event.
  lactationActive?: boolean;

  // Per-NPC move-in override thresholds (Task 9.5).
  // When set, isMoveInEligible() uses these instead of the global 60/60 defaults.
  // Companion preset definitions may author lower thresholds; generic NPCs omit these.
  moveInTrustOverride?: number;
  moveInLoveOverride?:  number;

  // Taming origin flag (Phase 23).
  // Set to 'tamed_monster' when a captive is converted to a contact via tamingEngine.
  // Undefined for all regular NPCs and companions.
  originType?: 'tamed_monster';
};

// ─── Enemy Humanoid Character ─────────────────────────────────────────────────
// Humanoid enemies. Same full spawn-engine profile as NPCs; combat overlay added.
// Task 3a.9: lootTable, purificationReward, defeatOutcomeOptions use inline structural
// types to avoid a circular dep (enemySpawnEngine imports HumanoidCharacter from here).
// These mirror the enemySpawnEngine interfaces exactly and are checked by the compiler.
type EnemyHumanoidCharacter = HumanoidCharacter & {
  readonly characterType: 'ENEMY_HUMANOID';
  aiPattern:           'Aggressive' | 'Defensive' | 'SupportCaster' | 'BossScripted';
  manaReserve:         number;   // does not regenerate mid-fight
  lootTable: {
    guaranteed: { itemId: string; minQty: number; maxQty: number; dropChance: number }[];
    random:     { itemId: string; minQty: number; maxQty: number; dropChance: number }[];
    goldMin:    number;
    goldMax:    number;
  };
  purificationReward: { xp: number; gold: number; itemIds: string[] };
  defeatOutcomeOptions: {
    type:       'Kill' | 'StripAndLoot' | 'Interrogate' | 'Intimate' | 'Purify' | 'Capture';
    available:  boolean;
    condition?: string;
  }[];
};

// ─── Monster Character ────────────────────────────────────────────────────────
// Non-humanoid enemies. Simplified physical profile (or none); combat overlay.
// Task 3a.10: same inline structural types as EnemyHumanoidCharacter above.
type MonsterCharacter = Character & {
  readonly characterType: 'MONSTER';
  monsterType:          'Beast' | 'Undead' | 'Elemental' | 'Demon' | 'MiasmaCorrupted';
  aiPattern:            'Aggressive' | 'Defensive' | 'SupportCaster' | 'BossScripted';
  miasmaReserve:        number;  // does not regenerate mid-fight
  sexualAttackEligible: boolean;
  monsterSex:           'Male' | 'Female' | 'None' | 'Ambiguous';
  lootTable: {
    guaranteed: { itemId: string; minQty: number; maxQty: number; dropChance: number }[];
    random:     { itemId: string; minQty: number; maxQty: number; dropChance: number }[];
    goldMin:    number;
    goldMax:    number;
  };
  purificationReward: { xp: number; gold: number; itemIds: string[] };
  defeatOutcomeOptions: {
    type:       'Kill' | 'StripAndLoot' | 'Interrogate' | 'Intimate' | 'Purify' | 'Capture';
    available:  boolean;
    condition?: string;
  }[];
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
  // Equipped items by slot (mirrors PlayerCharacter.equipped).
  // Undefined slot = nothing equipped there.
  equipped:            Partial<Record<EquipmentSlot, string>>;
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

// ─── World graph (Phase 17) ──────────────────────────────────────────────────────
// Static macro-map connecting named locations. Authored in src/data/worldGraph.ts.
// Nodes are named locations; edges define which nodes are directly adjacent
// and how many in-game phases traversing that edge consumes.

type WorldNode = {
  readonly id:             string;       // matches locationId in TileMap
  readonly name:           string;       // display name
  readonly regionId:       string;       // which region this node belongs to
  readonly isSafe:         boolean;      // safe nodes allow sleep + no encounters on TRAVEL
  readonly safetyTier:     SafetyTier;   // mirrors TileMap.safetyTier for the location
  // Flat gold cost to fast-travel TO this node.
  // Same-region travel uses FAST_TRAVEL_SAME_REGION_COST constant instead;
  // this field is the cross-region override when authored (0 = use constant).
  readonly fastTravelCost: number;
  // Phase 28 (28b.1): whether this node is indoors.
  // Absent / undefined = outdoors (false). Indoor nodes bypass the exposure gate.
  // Full authored values deferred to Task 17.DATA; stub nodes tagged below.
  readonly isIndoors?:     boolean;
  // Task 26.19: mini-game and location-feature keys present at this node.
  // Engines check this array before allowing FISH / GAMBLE / ARENA / ONSEN intents.
  readonly features?:      LocationFeatureKey[];
};

type WorldEdge = {
  readonly fromId:       string;   // source WorldNode id
  readonly toId:         string;   // destination WorldNode id (undirected: author both directions)
  readonly travelPhases: number;   // in-game phases consumed to traverse (1–5)
};

// Per-enemy roam definition for a location's tile map.
// Authored alongside the tile map in src/data/worldGraph.ts (deferred — Task 17.DATA).
// The client reads these to run the real-time enemy roam tick (1s interval).
type EnemyRoamDef = {
  readonly enemyId:         string;     // matches key in OccupantPositions
  readonly spawnCoord:      TileCoord;  // tile enemy starts on (and returns to if reset)
  readonly roamRadius:      number;     // max Chebyshev distance from spawn enemy will wander
  readonly encounterRadius: number;     // Chebyshev distance at which proximity triggers combat (usually 1)
  // movementSpeed is always 1 tile per roam tick at this stage.
};

// ─── Tile map (Unified Spatial Exploration — PRD §4.21.3) ────────────────────
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
  // currentNodeId is the canonical field (Phase 17); currentLocationId is
  // kept as an alias pointing to the same value for backward compatibility
  // with calendarEngine.ts and other pre-Phase-17 references.
  currentNodeId:      string;
  currentLocationId:  string;            // alias for currentNodeId; always kept in sync
  discoveredNodeIds:  string[];
  lastSafeNodeId:     string;
  lastSafeLocationId: string;            // alias for lastSafeNodeId; always kept in sync
  tileMap:            TileMap;           // static terrain for current location
  occupantPositions:  OccupantPositions; // live entity positions on the grid
  // Per-location enemy roam definitions. Keyed by locationId.
  // Populated when a location is entered; empty until world data is authored (Task 17.DATA).
  enemyRoamDefs:      EnemyRoamDef[];   // enemies currently active in this location
}

// ─── Holding cell (Phase 23 — Monster Taming) ───────────────────────────────
// One entry per captured humanoid enemy being held for taming.
// Unlocked at manor tier 3 via the 'holding_cells' feature.
// Capacity: tier 3 = 2 / tier 4 = 4 / tier 5 = 8 / tier 6 = 12.
//
// tamingProgress 0–100:
//   - Starts at 0 on capture.
//   - Advances via INTERACT_CAPTIVE intent; rate is modulated by the captive's
//     resistanceProfile (read from capturedCharacter.sexualPsychology at tame-time).
//   - Taming cannot complete (reach 100) unless the relationship status at interaction
//     time is one of: Close, Devoted, Confidant, Infatuated, Lover, or Bonded.
//     This requires ongoing gifting/dialogue after the initial capture.
//
// interactionCountToday: daily cap = 1 INTERACT_CAPTIVE per captive; reset at day-end.
export interface HoldingCell {
  cellId:                 string;           // e.g. 'cell_0', 'cell_1'
  // Snapshot of the EnemyHumanoidCharacter at the moment of capture.
  // After taming the cell is vacated; this snapshot is discarded.
  capturedCharacter:      import('./gameState').EnemyHumanoidCharacter;
  captureDay:             number;           // calendar.day of capture
  tamingProgress:         number;           // 0–100; 100 = tamed
  interactionCountToday:  number;           // reset to 0 at day-end
  // Per-action daily counters — each capped at 3/day, matching normal NPC social rules.
  // Reset to 0 at day-end alongside interactionCountToday.
  talkCountToday:         number;
  touchCountToday:        number;
  flirtCountToday:        number;
  // Running trust/love tallies that accumulate from INTERACT_CAPTIVE interactions.
  // These mirror the NpcCharacter fields that will be set on conversion.
  relationshipTrust:      number;           // -100 to +100
  relationshipLove:       number;           // -100 to +100
}

// ─── Manor state ──────────────────────────────────────────────────────────────
export interface ManorState {
  tier:                   number;                    // 1–6
  constructionTimerDays:  number;                    // 0 = idle
  suiteAssignments:       Record<string, string>;    // suiteId → npcId
  passiveResourceQueue:   PassiveResource[];
  // Holding cells for captured humanoid monsters (Phase 23).
  // Empty array until 'holding_cells' feature is available (tier 3+).
  holdingCells:           HoldingCell[];
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

// ─── Quest types (Phase 11) ───────────────────────────────────────────────────

// Runtime status for a single quest in the player's log.
export type QuestStatus = 'AVAILABLE' | 'ACTIVE' | 'COMPLETED' | 'FAILED';

// One entry per quest the player has encountered (accepted, failed, or completed).
// BOARD quests cycle back to AVAILABLE after cooldown; MAIN/COMPANION do not.
export interface QuestEntry {
  defId:               string;       // key into the static QuestDef catalog
  status:              QuestStatus;
  objectiveProgress:   number[];     // parallel array to QuestDef.objectives; current count per index
  activatedOnDay?:     number;       // calendar.day when ACTIVE status was set
  completedOnDay?:     number;       // calendar.day when COMPLETED
  cooldownExpiresOnDay?: number;     // BOARD only: day on which cooldown expires; undefined = no cooldown active
}

// Root quest log on GameState.  Replaces the old QuestLog / QuestProgress stubs.
// All quests the player has ever encountered live here; status field drives filtering.
export interface QuestLog {
  entries: QuestEntry[];
}

// ─── Achievement runtime entry (Phase 20) ────────────────────────────────────
// One entry per achievement the player has ever unlocked.
// The AchievementDef catalog lives in src/data/achievements.ts;
// achievementEngine.ts owns the AchievementDef type.
// Only UNLOCKED entries are stored; LOCKED state is implied by absence.
export interface AchievementEntry {
  defId:         string;    // key into ACHIEVEMENT_CATALOG
  unlockedOnDay: number;    // calendar.day when the achievement was granted
}

// ─── Contact profile view model (Phase 21 / Task 21.6) ──────────────────────
// Flat DTO assembled by contactEngine.assembleProfileView().
// Never stored in GameState — built on demand for the ContactsView UI.
// Task 3a.8: all previously-unknown fields now carry real spawn-engine types.
type ContactProfileView = {
  // Identity
  npcId:              string;
  name:               string;
  isDeceased:         boolean;

  // ── Tab 1: Social / Bio ──────────────────────────────────────────────────
  trust:              number;   // -100 to +100
  love:               number;
  relationshipStatus: string;   // RelationshipStatus label from 16-cell matrix
  playerBondType:     string | undefined;  // BondType label or undefined
  occupation:         string | undefined;  // background.occupation
  regionOfOrigin:     string | undefined;  // background.regionOfOrigin
  motherName:         string | undefined;
  fatherName:         string | undefined;
  companionLevel:     number;  // 0 = not a companion

  // ── Tab 2: Physical / Physiology ────────────────────────────────────────
  measurements:       FemaleMeasurements | MaleMeasurements | undefined;
  physicalDetail:     FemalePhysicalDetail | MalePhysicalDetail | undefined;
  gender:             Gender | undefined;
  race:               Race   | undefined;
  bodyType:           FemaleBodyType | MaleBodyType | undefined;
  // Derived flags readable without deep inspection of spawn-engine fields
  isVirgin:           boolean;  // history.totalEncounterCount === 0
  isPregnant:         boolean;
  pregnancyStage:     string | undefined;   // PregnancyStage label or undefined
  lactationActive:    boolean;

  // ── Tab 3: Psychology ───────────────────────────────────────────────────
  personality:        ExpandedPersonalityCore | Partial<ExpandedPersonalityCore> | undefined;
  sexualPsychology:   SexualPsychology | Partial<SexualPsychology> | undefined;

  // ── Corruption & moral degradation (dynamicState.mental) ─────────────────
  // All three are undefined when dynamicState is absent or not yet initialised.
  corruption:   number | undefined;   // 0–100; corruptionCurrent
  shame:        number | undefined;   // 0–100; shameCurrent (inverse purity proxy)
  brokenFlag:   boolean | undefined;  // true when corruption>85 && shame<10
};

// ─── Dialogue system (Phase 13) ─────────────────────────────────────────────
// DialogueCondition, DialogueChoice, DialogueNode were partially defined in the
// old dialogueEngine.ts stub. This is the canonical definition in gameState.ts
// (same pattern as all other schema types). The engine imports from here.

// Effects applied when a choice is made or a node is entered.
export type DialogueEffect =
  | { type: 'SET_FLAG';        flagId: string;  value: boolean | number | string }
  | { type: 'TRUST_DELTA';     npcId: string;   delta: number }
  | { type: 'LOVE_DELTA';      npcId: string;   delta: number }
  | { type: 'GIVE_ITEM';       itemId: string;  quantity: number }
  | { type: 'TAKE_ITEM';       itemId: string;  quantity: number }
  | { type: 'START_QUEST';     questDefId: string }
  // Phase 23a: alignment shift effect on a dialogue choice (task 23a.12)
  | { type: 'ALIGNMENT_SHIFT'; delta: number };

// Conditions that gate a choice or node from being accessible.
export type DialogueCondition =
  | { type: 'FLAG';       flagId: string;       value: boolean | number | string }
  | { type: 'TRUST';      npcId: string;        min: number }
  | { type: 'LOVE';       npcId: string;        min: number }
  | { type: 'QUEST_STAGE'; questId: string;     stage: number }
  | { type: 'ITEM_IN_INV'; itemId: string }
  | { type: 'COMPANION';   companionId: string; inParty: boolean }
  // Phase 23a: condition on dominant moral alignment (task 23a.3)
  | { type: 'ALIGNMENT';  dominantAlignment: 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN' };

// A single choice the player can make at a node.
export interface DialogueChoice {
  label:      string;
  nextNodeId: string;          // 'END' terminates the dialogue
  effects?:   DialogueEffect[];
  condition?: DialogueCondition;
  hidden?:    boolean;         // when true: choice is never shown to the player
}

// A single node in a dialogue tree.
export interface DialogueNode {
  id:         string;
  text:       string;
  speakerId:  string;          // npcId of the speaker; 'player' for player lines
  choices:    DialogueChoice[];
  condition?: DialogueCondition;
  onEnter?:   DialogueEffect[]; // effects fired when this node is entered
}

// A complete dialogue tree (authored in src/data/dialogueTrees.ts).
export interface DialogueTree {
  id:         string;
  rootNodeId: string;
  nodes:      Record<string, DialogueNode>;
}

// Runtime dialogue state — tracks the active tree and traversal position.
export interface DialogueState {
  activeTreeId:  string | null;
  currentNodeId: string | null;
  speakerNpcId:  string | null;
  history:       string[];   // choice labels made so far this session
}

export function createEmptyDialogueState(): DialogueState {
  return { activeTreeId: null, currentNodeId: null, speakerNpcId: null, history: [] };
}

// ─── Settings ─────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 24 — GENERIC ENGINE SCHEMA BLOCKS
// Each block is owned by its engine file but defined here so GameState can
// embed it without circular imports.  All fields are data-driven / lore-agnostic.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Alignment system (alignmentEngine.ts) ───────────────────────────────────
// 3-axis alignment.  Each axis is [-100, +100]; 0 is neutral.
// The axes are intentionally unlabelled here so any game can name them
// via a static AxisDef catalog (e.g. Rebel/Loyalist, Chaos/Order, Light/Dark).
export type AlignmentAxis = 'axis_a' | 'axis_b' | 'axis_c';

export interface AlignmentState {
  // Current score on each axis.  Engines emit ALIGNMENT_DELTA events;
  // alignmentEngine.applyAlignmentDelta() clamps each axis to [-100, 100].
  scores: Record<AlignmentAxis, number>;
  // Dominant axis id at the last evaluation (recomputed on every delta).
  // undefined = truly neutral (all scores within [-20, 20]).
  dominantAxis: AlignmentAxis | undefined;
  // Difficulty multiplier applied when the player chooses a resolution path
  // whose axis is OPPOSITE to dominantAxis.  Range [1.0, 2.5].
  // Recomputed by alignmentEngine.deriveDivergenceMultiplier().
  divergenceMultiplier: number;
}

// ─── Infamy / bounty system (infamyEngine.ts) ────────────────────────────────
// Per-region infamy score (0-100) drives bounty tier escalation and faction
// hostility.  Kept separate from reputation (which can be positive).
export type BountyTier =
  | 'NONE'         //  0-25: clean
  | 'SUSPICIOUS'   // 26-50: guards monitor; shop prices +15%
  | 'WANTED'       // 51-75: bounty hunters spawn; guards arrest on sight
  | 'OUTLAW'       // 76-90: inquisitorial executioners dispatched
  | 'CONDEMNED';   // 91-100: Black Ring brand; barred from civil towns

export interface InfamyState {
  // Per-region score (same RegionId key as reputation).
  scores:       Record<RegionId, number>;
  // Cached tier per region (recomputed by infamyEngine on every delta).
  tiers:        Record<RegionId, BountyTier>;
  // Accumulated fine debt (gold) that can be paid to clear infamy.
  // Paid via CLEAR_INFAMY intent at Enclave Audit Desks or Cathedral Altars.
  outstandingFines: Record<RegionId, number>;
}

// ─── Environment / weather system (environmentEngine.ts) ─────────────────────
// Each region has one active WeatherCondition that changes each in-game day.
export type WeatherCondition =
  | 'CLEAR' | 'RAIN' | 'HEAVY_RAIN' | 'SALTFOG'
  | 'SANDSTORM' | 'CLOUD_GALE' | 'TOXIC_SPORE'
  | 'UNDERWATER_PRESSURE' | 'BLIZZARD' | 'HEAT_WAVE';

// A single mechanical effect produced by a weather condition.
// Engines read the active effects to modify damage, accuracy, stamina cost, etc.
export interface WeatherEffect {
  stat:      string;   // e.g. 'FIRE_DAMAGE', 'RANGED_ACCURACY', 'WATER_CONSUMPTION'
  modifier:  number;   // additive percentage delta, e.g. -50 means -50%
  // When true, this effect degrades equipment durability (SALTFOG corrodes metal).
  degradesEquipment?: boolean;
  // When set, only the specified item slot is affected by degradation.
  degradationSlot?:   EquipmentSlot;
}

export interface EnvironmentState {
  // Active weather per region.  Updated by environmentEngine.advanceWeather() at day-start.
  weather:      Record<RegionId, WeatherCondition>;
  // Resolved mechanical effects for the current location's weather.
  // Recomputed when the player moves regions or when weather advances.
  activeEffects: WeatherEffect[];
  // Per-item durability (itemId -> current durability 0-100).
  // Only tracked for equipped items that are degradation-eligible.
  equipmentDurability: Record<string, number>;
}

// ─── Ley-line spire network (spireEngine.ts) ─────────────────────────────────
// Spires are fast-travel anchor points unlocked per node when the player
// establishes an Enclave Stronghold in that region.
export interface SpireState {
  nodeId:       string;    // WorldNode id this spire sits in
  unlocked:     boolean;   // true = can be used as fast-travel destination for free
  // Day on which this spire was unlocked; 0 = not yet unlocked.
  unlockedOnDay: number;
}

export interface SpireNetwork {
  // All authored spire locations (static catalog).  Unlocked flag is mutable.
  spires: SpireState[];
}

// ─── Job archetype & class progression (jobEngine.ts) ────────────────────────
// Job = combat role + resource system (lore: Tactician, Vanguard, Analyst…).
// Class = equippable skill-tree specialization (lore: Mage, Warrior, Shadow…).
// Both are data-agnostic here; the catalog lives in src/data/jobCatalog.ts.

export interface JobResourceSystem {
  // Generic resource pools (names resolved by the active JobDef).
  // Pool A is always the primary (e.g. Action Points, Stamina, Energy, MP).
  // Pool B is the secondary when the job has a dual-resource system.
  poolA: { current: number; max: number; label: string };
  poolB: { current: number; max: number; label: string } | undefined;
}

export interface JobArchetypeState {
  // Id of the currently equipped job (matches JobDef.id in src/data/jobCatalog.ts).
  activeJobId:   string | undefined;
  // Id of the currently equipped equippable class (matches ClassDef.id).
  activeClassId: string | undefined;
  // Job-specific resource pools (reset at the start of each encounter).
  jobResources:  JobResourceSystem;
}

export interface ClassProgressionState {
  // classId -> SP spent on that class tree.
  // SP is never lost on class swap; only reset via RESET_CLASS_TREE intent.
  spSpentPerClass: Record<string, number>;
  // classId -> set of unlocked node ids within that class tree.
  unlockedNodesPerClass: Record<string, string[]>;
}

// ─── Companion synergy pairs / triples (synergyEngine.ts) ────────────────────
// Synergies are author-defined pairs or triples of companion npcIds whose
// combined intimacy threshold unlocks a combo attack.

export interface SynergyPairState {
  // Key = '<npcIdA>+<npcIdB>' or '<npcIdA>+<npcIdB>+<npcIdC>' (sorted alphabetically).
  synergyId:    string;
  unlocked:     boolean;   // true when all members are active party + intimacy gate met
  useCountToday: number;   // reset at day-end; most synergies cap at 1/encounter
}

export interface SynergyState {
  pairs: SynergyPairState[];
}

// ─── Character creation options snapshot (characterCreationEngine.ts) ─────────
// Stored on GameState so NG+ and save/load can inspect origin choices.
export interface CharacterCreationOptions {
  playerName:    string;
  subClassId:    string;   // matches SubClassDef.id (e.g. 'structural_engineer')
  secondaryTrait: string;  // e.g. 'resource_efficient' | 'master_negotiator' | 'tenacious_survivalist'
  jobId:         string;   // initial job archetype id
  classId:       string;   // initial equippable class id
  // Stat points allocated during creation (7 stats × freePoints distributed).
  allocatedStats: Record<string, number>;
}

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
  offspring:     OffspringRecord[];   // Phase 18: all offspring born in this playthrough
  dialogue:      DialogueState;       // Phase 13: active dialogue traversal state
  quests:        QuestLog;
  reputation:    Record<RegionId, number>;
  // Phase 23a: dark/shadow faction reputation per region (task 23a.2).
  // Independent of `reputation`; range [0, 100]; >= 40 unlocks the shadow
  // faction in that region (vendors, quests, special dialogue branches).
  darkReputation: Record<RegionId, number>;
  manor:         ManorState;
  craftingQueue: CraftingQueue;

  // NPC-NPC interaction log; populated during day-end tick, cleared after resolution.
  // Engines read this to generate narrative events; never mutate contacts mid-tick.
  npcInteractionLog: NpcDailyInteraction[];

  // ── Meta ────────────────────────────────────────────────────────────────────
  achievements: AchievementEntry[];   // Phase 20: all unlocked achievements
  flags:    Record<string, boolean | number | string>; // story flags
  settings: GameSettings;

  // ── Phase 24: generic engine states ────────────────────────────────────────
  alignment:   AlignmentState;        // 3-axis moral alignment + divergence multiplier
  infamy:      InfamyState;           // per-region infamy score + bounty tiers
  environment: EnvironmentState;      // weather + equipment durability
  spires:      SpireNetwork;          // ley-line fast-travel anchor points
  jobState:    JobArchetypeState;     // active job/class + resource pools
  classProgress: ClassProgressionState; // SP spent + unlocked nodes per class
  synergies:   SynergyState;          // companion synergy pair unlock state
  characterCreation: CharacterCreationOptions | undefined; // origin snapshot (undefined pre-creation)

  // ── Phase 26: loose-ends schema fields ──────────────────────────────────────────
  tithe: TitheState;  // Task 26.5 — Aether Tithe weekly quota system
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
  // Phase 20: ACHIEVEMENT_UNLOCKED replaces the old stub variant.
  // tier and reward are included so the UI can display the pop-up without
  // a second catalog lookup.
  | { type: 'ACHIEVEMENT_UNLOCKED'; defId: string; tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'; reward: { ap?: number; bp?: number; titleToken?: string } }
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
  // Reputation events (Phase 10)
  // REPUTATION_CHANGED: emitted by applyReputationDelta() and tickReputationDecay() for every changed region.
  // REPUTATION_TIER_CROSSED: emitted when a delta pushes the score across a tier boundary.
  // BOUNTY_CHANGED: emitted when score enters or changes within the negative (bounty-active) range.
  | { type: 'REPUTATION_CHANGED';      regionId: RegionId; delta: number; newScore: number; tier: string }
  | { type: 'REPUTATION_TIER_CROSSED'; regionId: RegionId; from: string; to: string }
  | { type: 'BOUNTY_CHANGED';          regionId: RegionId; newAmount: number }
  // Quest events (Phase 11)
  // QUEST_ACCEPTED:           player accepted a quest; entry created as ACTIVE.
  // QUEST_OBJECTIVE_UPDATED:  an objective's progress counter changed.
  // QUEST_COMPLETED:          all objectives met; reward granted.
  // QUEST_FAILED:             quest was failed; BOARD quests reset to AVAILABLE.
  | { type: 'QUEST_ACCEPTED';           defId: string }
  | { type: 'QUEST_OBJECTIVE_UPDATED';  defId: string; objectiveIndex: number; newCount: number; required: number }
  | { type: 'QUEST_COMPLETED';          defId: string; questType: 'MAIN' | 'COMPANION' | 'BOARD' }
  | { type: 'QUEST_FAILED';             defId: string; questType: 'MAIN' | 'COMPANION' | 'BOARD' }
  // Dispatcher trigger events (Phase 11 — used by processEventQueue objective hooks)
  // ENEMY_KILLED:         emitted by combatEngine on kill; defId = monster/enemy type id.
  // ITEM_COLLECTED:       emitted by economyEngine when an item enters inventory.
  // DIALOGUE_COMPLETED:   emitted by dialogueEngine when a tree reaches an END node.
  // TRAVEL_NODE_REACHED:  emitted by worldEngine on node arrival.
  | { type: 'ENEMY_KILLED';         targetId: string; regionId: string }
  | { type: 'ITEM_COLLECTED';       itemId: string; quantity: number }
  | { type: 'DIALOGUE_COMPLETED';   speakerNpcId: string; treeId: string }
  // TRAVEL_NODE_REACHED is defined in the World/travel section below (Phase 17 canonical)
  // Economy / inventory events (Phase 12)
  // ITEM_ACQUIRED:       item entered inventory (pickup, purchase, loot, quest reward).
  // ITEM_REMOVED:        item left inventory; reason disambiguates audit trail.
  // GOLD_CHANGED:        player.gold changed; newAmount = post-change value.
  // INVENTORY_OVERFLOW:  item could not fit; auto-converted to gold at sell value.
  | { type: 'ITEM_ACQUIRED';      itemId: string; quantity: number; source: 'PICKUP' | 'PURCHASE' | 'LOOT' | 'REWARD' }
  | { type: 'ITEM_REMOVED';       itemId: string; quantity: number; reason: 'USED' | 'SOLD' | 'GIFTED' | 'DROPPED' | 'CONSUMED' }
  | { type: 'GOLD_CHANGED';       delta: number; newAmount: number }
  | { type: 'INVENTORY_OVERFLOW'; itemId: string; quantity: number; goldConverted: number }
  // Status effect events (Phase 14)
  // STATUS_APPLIED:  a new effect was placed on a character.
  // STATUS_TICKED:   an effect fired its per-turn tick (damage, heal, stat mod, arousal).
  // STATUS_EXPIRED:  an effect ran out of turns and was removed.
  // STATUS_STACKED:  an existing effect gained an additional stack (duration refreshed).
  | { type: 'STATUS_APPLIED';  defId: string; targetId: string }
  | { type: 'STATUS_TICKED';   defId: string; targetId: string; effectType: string; value: number }
  | { type: 'STATUS_EXPIRED';  defId: string; targetId: string }
  | { type: 'STATUS_STACKED';  defId: string; targetId: string; newStacks: number }
  // Crafting & equipment events (Phase 15)
  // CRAFTING_STARTED:    ingredients consumed; job queued.
  // CRAFTING_COMPLETED:  job resolved; output added to inventory.
  // CRAFTING_FAILED:     guard check failed before job was queued (reason explains why).
  // ITEM_EQUIPPED:       item moved into an equipment slot.
  // ITEM_UNEQUIPPED:     item moved out of an equipment slot back to inventory.
  // ITEM_UPGRADED:       upgrade attempt resolved; success = true/false.
  // EQUIP_SWAP_CONFIRM:  emitted when a swap-out item can't fit; player must confirm gold conversion.
  | { type: 'CRAFTING_STARTED';    recipeId: string; completesOnPhase: number }
  | { type: 'CRAFTING_COMPLETED';  recipeId: string; outputItemId: string; outputQuantity: number }
  | { type: 'CRAFTING_FAILED';     recipeId: string; reason: string }
  | { type: 'ITEM_EQUIPPED';       itemId: string; slot: EquipmentSlot; targetId: string }
  | { type: 'ITEM_UNEQUIPPED';     itemId: string; slot: EquipmentSlot; targetId: string }
  | { type: 'ITEM_UPGRADED';       itemId: string; success: boolean; newTier: number }
  | { type: 'EQUIP_SWAP_CONFIRM';  slot: EquipmentSlot; swapOutItemId: string; goldValue: number; targetId: string }
  // Skill events (Phase 16)
  // SKILL_UNLOCKED:     player spent BP or AP to unlock a skill node.
  // SKILL_USED:         player activated an active skill; CPW was deducted.
  // SKILL_TREE_RESET:   entire tree wiped; all spent points refunded.
  | { type: 'SKILL_UNLOCKED';    skillId: string; tree: 'BATTLE' | 'ARDOR' }
  | { type: 'SKILL_USED';        skillId: string; cpwCost: number }
  | { type: 'SKILL_TREE_RESET';  tree: 'BATTLE' | 'ARDOR'; pointsRefunded: number }
  // Calendar / time events
  | { type: 'PHASE_ADVANCED';   fromPhase: DayPhase; toPhase: DayPhase; day: number }
  | { type: 'DAY_STARTED';      day: number }
  | { type: 'SLEPT';            day: number; locationId: string }
  | { type: 'FATIGUE_COLLAPSE'; day: number }
  // World / travel events (Phase 17)
  // TRAVEL_STARTED:          player began inter-node travel; fromId/toId are WorldNode ids.
  // TRAVEL_NODE_REACHED:     player arrived at a node (also used by questEngine for TRAVEL objectives).
  // SPECIAL_ENCOUNTER_ROLLED: spontaneous encounter triggered on a MOVE_TILE step; not a roam-proximity event.
  // ROAM_ENCOUNTER_TRIGGERED: enemy closed distance during real-time roam tick; enemy gets first strike.
  // FAST_TRAVEL_USED:         player teleported to a discovered node; gold deducted.
  // LAST_SAFE_UPDATED:        lastSafeNodeId was updated because player entered a safe node.
  | { type: 'TRAVEL_STARTED';            fromId: string; toId: string; travelPhases: number }
  | { type: 'TRAVEL_NODE_REACHED';       nodeId: string }
  | { type: 'SPECIAL_ENCOUNTER_ROLLED';  nodeId: string; phase: DayPhase }
  | { type: 'ROAM_ENCOUNTER_TRIGGERED';  enemyId: string; nodeId: string; enemyInitiated: boolean }
  | { type: 'FAST_TRAVEL_USED';          fromId: string; toId: string; goldCost: number }
  | { type: 'LAST_SAFE_UPDATED';         nodeId: string }
  // Pregnancy events (Phase 18)
  // CONCEPTION_CHECK_PASSED: conception roll succeeded; NPC is now pregnant.
  // PREGNANCY_STAGE_ADVANCED: pregnancyWeek crossed a stage boundary.
  // BIRTH_OCCURRED: week 12 reached; offspring record created; NPC lactating.
  // LACTATION_STARTED: emitted alongside BIRTH_OCCURRED so UI can react separately.
  | { type: 'CONCEPTION_CHECK_PASSED';   npcId: string; fatherId: string }
  | { type: 'PREGNANCY_STAGE_ADVANCED';  npcId: string; stage: import('../spawn-engine/types/enums').PregnancyStage }
  | { type: 'BIRTH_OCCURRED';            npcId: string; offspringId: string }
  | { type: 'LACTATION_STARTED';         npcId: string }
  // Manor events (Phase 19)
  // MANOR_UPGRADE_STARTED:   construction underway; timer set.
  // MANOR_UPGRADE_COMPLETED: tier incremented; new features unlocked.
  // SUITE_ASSIGNED:          NPC moved into a suite.
  // SUITE_VACATED:           suite occupant cleared.
  // PASSIVE_GEN_TICK:        day-end passive generation resolved; gold credited + items queued.
  | { type: 'MANOR_UPGRADE_STARTED';   fromTier: number; toTier: number; timerDays: number; goldCost: number }
  | { type: 'MANOR_UPGRADE_COMPLETED'; newTier: number }
  | { type: 'SUITE_ASSIGNED';          suiteId: string; npcId: string }
  | { type: 'SUITE_VACATED';           suiteId: string; npcId: string }
  | { type: 'PASSIVE_GEN_TICK';        goldGenerated: number; itemsQueued: number }
  // Dialogue events (Phase 13)
  // DIALOGUE_STARTED:        player entered a dialogue tree with an NPC.
  // DIALOGUE_CHOICE_MADE:    player selected a choice; node advanced.
  // DIALOGUE_COMPLETED:      dialogue reached an END node and was cleared.
  // DIALOGUE_EFFECT_APPLIED: a DialogueEffect was applied (flag, delta, item, quest).
  | { type: 'DIALOGUE_STARTED';         treeId: string; npcId: string }
  | { type: 'DIALOGUE_CHOICE_MADE';     choiceIndex: number; nextNodeId: string }
  // Note: DIALOGUE_COMPLETED is already in the union above (task 11.4).
  // It has fields speakerNpcId + treeId. That variant is the canonical one;
  // no duplicate added here.
  | { type: 'DIALOGUE_EFFECT_APPLIED';  effect: DialogueEffect }
  // Taming events (Phase 23)
  // CAPTIVE_ADDED:       humanoid enemy captured after combat defeat; rope consumed.
  // CAPTIVE_INTERACTION: player interacted with a captive; tamingProgress updated.
  // MONSTER_TAMED:       tamingProgress reached 100; captive converted to NpcCharacter.
  | { type: 'CAPTIVE_ADDED';        cellId: string; enemyId: string; enemyName: string }
  | { type: 'CAPTIVE_INTERACTION';  cellId: string; progressDelta: number; newProgress: number }
  | { type: 'MONSTER_TAMED';        cellId: string; newNpcId: string; name: string }
  // CAPTIVE_RELEASED: player chose to release a captive before taming completed.
  | { type: 'CAPTIVE_RELEASED';     cellId: string; enemyName: string }
  // Phase 24 — Alignment engine
  | { type: 'ALIGNMENT_DELTA';       axis: AlignmentAxis; delta: number; newScore: number; source: string }
  | { type: 'ALIGNMENT_AXIS_CROSSED'; axis: AlignmentAxis; from: string; to: string }
  | { type: 'DIVERGENCE_PENALTY_ACTIVE'; multiplier: number }
  // Phase 24 — Infamy / Bounty engine
  | { type: 'INFAMY_DELTA';           regionId: RegionId; delta: number; newScore: number }
  | { type: 'BOUNTY_TIER_CHANGED';    regionId: RegionId; from: BountyTier; to: BountyTier }
  | { type: 'INFAMY_CLEARED';         regionId: RegionId; goldPaid: number }
  | { type: 'BOUNTY_HUNTER_SPAWNED';  regionId: RegionId; tier: BountyTier }
  // Phase 24 — Environment engine
  | { type: 'WEATHER_CHANGED';        regionId: RegionId; from: WeatherCondition; to: WeatherCondition }
  | { type: 'WEATHER_EFFECT_TICK';    regionId: RegionId; effectStat: string; modifier: number }
  | { type: 'EQUIPMENT_DEGRADED';     itemId: string; slot: EquipmentSlot; newDurability: number }
  | { type: 'EQUIPMENT_BROKEN';       itemId: string; slot: EquipmentSlot }
  // Phase 24 — Spire engine
  | { type: 'SPIRE_UNLOCKED';         nodeId: string }
  | { type: 'SPIRE_TRAVEL_USED';      fromNodeId: string; toNodeId: string }
  // Phase 24 — Job / Class engine
  | { type: 'JOB_EQUIPPED';           jobId: string }
  | { type: 'CLASS_EQUIPPED';         classId: string }
  | { type: 'CLASS_NODE_UNLOCKED';    classId: string; nodeId: string; spCost: number }
  | { type: 'CLASS_TREE_RESET';       classId: string; spRefunded: number }
  | { type: 'JOB_RESOURCE_USED';      pool: 'A' | 'B'; amount: number; label: string }
  | { type: 'JOB_PROMOTED';           fromJobId: string; toJobId: string }
  | { type: 'ARMOR_FRACTURE_APPLIED'; targetId: string; reduction: number; turns: number }
  | { type: 'WEAK_NODE_DETECTED';     targetId: string; nodeLabel: string; bonusDamage: number }
  // Phase 24 — Synergy engine
  | { type: 'SYNERGY_UNLOCKED';       synergyId: string }
  | { type: 'SYNERGY_ACTIVATED';      synergyId: string; comboName: string }
  | { type: 'SYNERGY_LOCKED';         synergyId: string; reason: string }
  // Phase 24 — Character creation
  | { type: 'NEW_GAME_STARTED';       options: CharacterCreationOptions }
  | { type: 'CHARACTER_CREATION_COMPLETE'; playerName: string }
  // Phase 23a — Moral Alignment System
  // ALIGNMENT_SHIFTED: player's alignmentScore changed via shiftAlignment().
  // DARK_REPUTATION_CHANGED: darkReputation[regionId] changed via applyDarkReputationDelta().
  // DARK_FACTION_UNLOCKED: darkReputation crossed >= 40; shadow faction now accessible.
  | { type: 'ALIGNMENT_SHIFTED';       delta: number; newScore: number; dominantAlignment: 'PURIFIER' | 'PRAGMATIST' | 'SOVEREIGN' }
  | { type: 'DARK_REPUTATION_CHANGED'; regionId: RegionId; delta: number; newScore: number }
  | { type: 'DARK_FACTION_UNLOCKED';   regionId: RegionId }
  // Phase 28 — Intimacy context gates (28b.4, 28d.6, 28g.2)
  // INTIMACY_GATE_BLOCKED: emitted by dispatcher when any initiation gate blocks a scene.
  //   gate identifies which check failed; reason is the NPC's refusal line for UI display.
  | { type: 'INTIMACY_GATE_BLOCKED';       gate: 'EXPOSURE' | 'AUDIENCE' | 'GROUP_DEGRADATION' | 'GROUP_SQ'; npcId: string; reason: string }
  // INTIMACY_GROUP_SCENE_STARTED / ENDED: emitted by dispatcher around group scenes.
  | { type: 'INTIMACY_GROUP_SCENE_STARTED'; primaryNpcId: string; secondNpcId: string; groupMode: 'MMF' | 'FFM' }
  | { type: 'INTIMACY_GROUP_SCENE_ENDED';   primaryNpcId: string; secondNpcId: string; satisfaction: number; jealousyFired: boolean }
  // NPC_JEALOUSY_SPIKE: fired by dispatcher post-group-scene when jealousyFired === true.
  //   Already in union above for NPC-NPC social engine; variant here is a typed alias kept
  //   for clarity — the existing { subjectId, targetId, rivalId } shape is reused.
  // Phase 26 — Loose ends
  // TITHE_PAID:           player paid their weekly Aether Tithe at an Enclave Altar.
  // TITHE_OVERDUE:        day-end tick found tithe unpaid more than 7 days; reputation penalty.
  // ITEM_SOCKETED:        Aether Crystal inserted into an equipment slot socket.
  // CARRIAGE_HIRED:       player hired a carriage for inter-node travel.
  // MINI_GAME_STARTED:    player entered a mini-game (fishing, gambling, arena, onsen).
  // MINI_GAME_ENDED:      mini-game resolved with a result.
  // CRIME_COMMITTED:      player performed a crimnal act; infamy delta and gate event follow.
  // CITY_GATE_BLOCKED:    wanted player barred from entering a gated settlement.
  // PARDON_GRANTED:       infamy cleared via quest reward.
  // STRONGHOLD_BUILT:     player built an Enclave Stronghold in a region.
  | { type: 'TITHE_PAID';         regionId: string; goldPaid: number }
  | { type: 'TITHE_OVERDUE';      regionId: string; daysOverdue: number; reputationPenalty: number }
  | { type: 'ITEM_SOCKETED';      itemId: string; socketId: string; materialId: string; passiveEffect: string }
  | { type: 'CARRIAGE_HIRED';     fromNodeId: string; toNodeId: string; goldCost: number; phasesSkipped: number }
  | { type: 'MINI_GAME_STARTED';  featureKey: LocationFeatureKey; nodeId: string }
  | { type: 'MINI_GAME_ENDED';    featureKey: LocationFeatureKey; outcome: 'WIN' | 'LOSE' | 'DRAW'; goldDelta: number }
  | { type: 'CRIME_COMMITTED';    crimeType: 'THEFT' | 'ASSAULT' | 'MURDER'; regionId: string; infamyDelta: number }
  | { type: 'CITY_GATE_BLOCKED';  nodeId: string; regionId: string; bountyTier: string }
  | { type: 'PARDON_GRANTED';     regionId: string; questId: string }
  | { type: 'STRONGHOLD_BUILT';   regionId: string }
  ;
