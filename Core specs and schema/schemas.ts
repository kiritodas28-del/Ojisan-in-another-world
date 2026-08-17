// ============================================================================
// OJISAN IN ANOTHER WORLD — CORE DATA SCHEMAS (v2)
// Companion reference for requirements.md. These are the authoritative
// shapes every system, save file, and API response should conform to.
// ============================================================================

// ---------------------------------------------------------------------------
// ENUMS
// ---------------------------------------------------------------------------

export enum Race {
  Human = "HUMAN",
  HighElf = "HIGH_ELF",
  HalfOrc = "HALF_ORC",
  Dragonborn = "DRAGONBORN",
  MoonElf = "MOON_ELF",
  GreaterDryad = "GREATER_DRYAD",
  DarkElf = "DARK_ELF",
  Kitsune = "KITSUNE",
  FallenAngel = "FALLEN_ANGEL",
  DivineHalfBlood = "DIVINE_HALF_BLOOD",
  Goddess = "GODDESS",
}

export enum Region {
  VerdantVale = "VERDANT_VALE",
  Aethermoor = "AETHERMOOR",
  CrimsonMarch = "CRIMSON_MARCH",
  WhisperingWood = "WHISPERING_WOOD",
  MountainMonastery = "MOUNTAIN_MONASTERY", // Sera's home region (Act 4/5) — named on the GDD's
  // world map but never given its own detailed regional
  // map or RegionMonsterProfile entry until this pass;
  // see requirements.md §18.7
  AuricCourt = "AURIC_COURT",
  SunkenSanctum = "SUNKEN_SANCTUM",
  CelestialThreshold = "CELESTIAL_THRESHOLD",
}

export enum CompanionId {
  Mira = "MIRA",
  Isolde = "ISOLDE",
  Grael = "GRAEL",
  Valka = "VALKA",
  Seira = "SEIRA",
  Sylvara = "SYLVARA",
  Reva = "REVA",
  Tasha = "TASHA",
  Sera = "SERA",
  Lyra = "LYRA",
}

export enum EquipmentSlot {
  Head = "HEAD",
  Body = "BODY",
  Legs = "LEGS",
  Feet = "FEET",
  Hands = "HANDS",
  Underwear = "UNDERWEAR",
  Accessory1 = "ACCESSORY_1",
  Accessory2 = "ACCESSORY_2",
  MainWeapon = "MAIN_WEAPON",
  OffHand = "OFF_HAND",
}

export enum ClothingState {
  Equipped = "EQUIPPED",
  Loosened = "LOOSENED",
  Removed = "REMOVED",
}

export enum QuestType {
  Main = "MAIN",
  Companion = "COMPANION",
  RepeatableCombat = "REPEATABLE_COMBAT",
  RepeatableCollection = "REPEATABLE_COLLECTION",
  RepeatableEscort = "REPEATABLE_ESCORT",
}

export enum QuestStatus {
  Locked = "LOCKED",
  Available = "AVAILABLE",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
  Failed = "FAILED",
}

export enum OffspringAlignment {
  Heroic = "HEROIC",
  TroubledDrifter = "TROUBLED_DRIFTER",
  Criminal = "CRIMINAL",
}

// Drives which Defeat/Force-Intimacy rules apply (§10.3, §10.2 v3.1)
export enum NpcLegalClass {
  Innocent = "INNOCENT",     // citizens, merchants, guards
  Outlaw = "OUTLAW",         // bandits, cultists, rogues — zero reputation penalty on defeat actions
  Protected = "PROTECTED",   // companions, story-critical NPCs, Astraea —
  // Intimate/Force-Intimacy/Permanent-Removal are hard-disabled
}

export enum CombatRole {
  Vanguard = "VANGUARD",
  Support = "SUPPORT",
  Artillery = "ARTILLERY",
  Rogue = "ROGUE",
}

export enum RelationshipStatusId {
  DevotedPartner = "DEVOTED_PARTNER",
  PassionateLove = "PASSIONATE_LOVE",
  ComplicatedPassion = "COMPLICATED_PASSION",
  ObsessiveLonging = "OBSESSIVE_LONGING",
  TrustedCompanion = "TRUSTED_COMPANION",
  BondedComrade = "BONDED_COMRADE",
  GrowingAttraction = "GROWING_ATTRACTION",
  GuardedAttraction = "GUARDED_ATTRACTION",
  CherishedConfidante = "CHERISHED_CONFIDANTE",
  FriendlyAcquaintance = "FRIENDLY_ACQUAINTANCE",
  NeutralStranger = "NEUTRAL_STRANGER",
  CoolSkeptical = "COOL_SKEPTICAL",
  BitterResentment = "BITTER_RESENTMENT",
  MutualFriction = "MUTUAL_FRICTION",
  ActiveHostility = "ACTIVE_HOSTILITY",
  UnrequitedLoyalty = "UNREQUITED_LOYALTY", // new: VeryHigh Trust + Low Love — see requirements.md §4.3
  // Scripted-only state, never produced by the grid lookup itself — see requirements.md §4.3
  SwornNemesis = "SWORN_NEMESIS",
}

export enum InteractionAction {
  Talk = "TALK",
  Gift = "GIFT",
  Trade = "TRADE",
  Inspect = "INSPECT",
  Inventory = "INVENTORY",
  Flirt = "FLIRT",
  Touch = "TOUCH",
  Command = "COMMAND",
  MoveIn = "MOVE_IN",
  Battle = "BATTLE",
  Intimate = "INTIMATE",
}

export enum DefeatOutcome {
  SpareAndRelease = "SPARE_AND_RELEASE",
  HandToGuard = "HAND_TO_GUARD",
  Interrogate = "INTERROGATE",
  StripAndLoot = "STRIP_AND_LOOT",
  ForceIntimacy = "FORCE_INTIMACY",           // NpcLegalClass.Protected can never be targeted
  PermanentlyRemove = "PERMANENTLY_REMOVE",   // NpcLegalClass.Protected can never be targeted
}

export enum SkillTree {
  Ardor = "ARDOR",     // Sex Skill Tree, §11 — spends Ardor Points (AP), separate from Level/XP
  Battle = "BATTLE",   // Combat Skill Tree, §12 — spends Battle Points (BP), separate from Level/XP
}

export enum ContentToggle {
  Pregnancy = "PREGNANCY",
  Lactation = "LACTATION",
  Anal = "ANAL",
  NonConsensualContent = "NON_CONSENSUAL_CONTENT", // governs whether Force Intimacy is offered at all
  HostileArousalAttacks = "HOSTILE_AROUSAL_ATTACKS", // governs whether ANY EnemyAbilityDef with
  // isSexualAttack: true is ever selectable in
  // combat — off means enemies simply never have
  // access to those abilities, full stop. Separate
  // from NonConsensualContent, which is specifically
  // about the player's own Force Intimacy action;
  // this one is about enemies acting on the player
  // or companions. Defaults OFF, same as
  // NonConsensualContent — see requirements.md §23.1.
  GraphicCombatText = "GRAPHIC_COMBAT_TEXT",
}

export enum DayPhase {
  Morning = "MORNING",
  Afternoon = "AFTERNOON",
  Evening = "EVENING",
  Night = "NIGHT",
  // A fully lived-in phase, same as the other four — see requirements.md §7.1 for its
  // escalated encounter/spawn-weight content. What's special about it is only what
  // happens when it *ends*: when Midnight's own phase-advance condition fires, that
  // triggers the full day-end sequence (reputation decay §5.4, birth events §5.5,
  // NPC population refresh §5.10, then currentGameDate increments and the calendar
  // advances to Morning of the new date) — not a special instantaneous phase itself.
  Midnight = "MIDNIGHT",
}

export enum EnemyAiPattern {
  Aggressive = "AGGRESSIVE",         // always targets lowest-HP living party member
  Defensive = "DEFENSIVE",           // guards below 50% HP, else attacks highest-threat target
  SupportCaster = "SUPPORT_CASTER",  // prioritizes buff/debuff if allies present, else attacks
  BossScripted = "BOSS_SCRIPTED",    // follows a per-boss phase script keyed to HP thresholds
}

// Broad monster taxonomy — drives the growth-multiplier table in requirements.md §4.12
// and the region-eligibility table in §5.11. "Humanoid" covers bandits/cultists/mercs
// (already legalClass-tagged separately for reputation purposes); "Cosmic" is reserved
// for one-off, hand-scripted final-boss content that isn't part of any reusable regional pool.
export enum MonsterType {
  Beast = "BEAST",
  MiasmaCorrupted = "MIASMA_CORRUPTED",
  Construct = "CONSTRUCT",
  Draconic = "DRACONIC",
  Humanoid = "HUMANOID",
  VoidAberration = "VOID_ABERRATION",
  Cosmic = "COSMIC",
}

export enum ServiceType {
  ItemVendor = "ITEM_VENDOR",
  // BlacksmithUpgrade/Crafting removed — both are now Ardor Manor + skill-gated instead of a
  // town service NPC, see requirements.md §14. Kept out of this enum rather than left unused.
  Bank = "BANK",
  QuestBoard = "QUEST_BOARD",
  Innkeeper = "INNKEEPER",   // resting here triggers a direct phase-advance, §7
  FastTravel = "FAST_TRAVEL",
  BountyOffice = "BOUNTY_OFFICE", // pays off a bounty computed on the spot from reputationScore, see requirements.md §17
}

export type SceneEndReason = "STAMINA_EXHAUSTED" | "PLAYER_ENDED";

// ---------------------------------------------------------------------------
// STATS & LEVELING
// ---------------------------------------------------------------------------

export interface EroticStats {
  // stamina and crestPower are CURRENT values in a persistent, depleting/regenerating
  // pool — not fixed attributes like the three below. See requirements.md §7.3 for the
  // full recovery mechanism (Sleep restores to max; passive regen on every other phase advance).
  stamina: number;        // STM current value, starts at 40
  maxStamina: number;     // ceiling for `stamina` — base 40, raised toward 100 by skill-tree/achievement bonuses
  sensitivity: number;    // SEN — fixed attribute, grows via skill tree/story, never depletes
  technique: number;      // TEC — fixed attribute, grows via skill tree/story, never depletes
  virility: number;       // VIR (player only — semen volume / conception multiplier), fixed attribute
  crestPower: number;     // CPW current value, starts at 20
  maxCrestPower: number;  // ceiling for `crestPower` — base 20, raised toward 100 by skill-tree/achievement bonuses
  refractoryPeriodSec: number; // player only, base 1200s / min 120s — a separate cooldown mechanic, unaffected by §7.3
}

export interface CombatStats {
  hp: number;
  maxHp: number;
  str: number;
  agi: number;
  wis: number;
  def: number;
  lck: number;
}

// ---------------------------------------------------------------------------
// APPEARANCE — shared shape for the player character, companions, and
// procedural NPC classes alike. [NEW] Added on request: none of the three
// had any visual-description field anywhere in this document before now —
// only race/equipment/personality existed, which implies a look without ever
// stating one. `distinguishingFeatures` is where race-specific traits live
// (ears, tails, wings, scales, bark markings, a divine glow, etc.) rather
// than inventing separate per-race fields.
// ---------------------------------------------------------------------------
export enum GenderId {
  Male = "MALE",
  Female = "FEMALE",
  Varies = "VARIES", // procedural NPC classes only — one archetype spans many genders across spawned
  // instances; individually-named characters (Kenji, the 10 companions) are never this
}

export interface AppearanceDef {
  heightCm: number;
  build: string; // overall body-type descriptor, e.g. "slender", "athletic", "stocky", "willowy"
  gender: GenderId;
  hairColor: string;
  hairStyle: string;
  eyeColor: string;
  skinTone: string;
  skinType: string; // [NEW] texture descriptor, e.g. "smooth", "bark-textured", "scaled", "sun-weathered"
  distinguishingFeatures: string[]; // race-specific traits, scars, marks — not stat-affecting, pure flavor
  scarsAndTattoos: string[]; // [NEW] dedicated list, separate from the more general distinguishingFeatures above
  apparentAge?: number; // omitted for procedural NPC classes, where age varies by spawned instance
  trueAge?: number; // [NEW] — distinct from apparentAge for long-lived races (High Elf, Moon Elf, Greater
  // Dryad) where the two diverge sharply; omitted where they're the same (humans, Kenji)
  bodyDetails?: BodyDetailsDef; // [NEW] omitted for Kenji (male) and the 10 archetypal NPC classes
  racialFeatures?: RacialFeaturesDef; // [NEW] omitted entirely unless at least one trait applies
  portraitAssetId: string; // [NEW] — the "Image" field on the Contact Profile screen (§19); a reference
  // key into whatever asset pipeline eventually serves portrait art, not the
  // art itself — out of scope for this document to generate
  aestheticSummary: string; // one or two sentences tying the details together into an overall impression
}

// ---------------------------------------------------------------------------
// BODY DETAILS & RACIAL FEATURES — [NEW] supplementary appearance data,
// requested specifically for the Contact Profile screen (§19). bodyDetails
// is omitted for Kenji (male) and for the 10 procedural NPC classes
// (archetypal, gender-mixed — "varies" already covers this); racialFeatures
// is omitted entirely unless at least one of its four traits actually applies.
// ---------------------------------------------------------------------------
export interface BodyDetailsDef {
  hasBreasts: boolean;
  breastSizeCup?: string;   // present only if hasBreasts — bra cup letter, e.g. "C", "D", "DD"
  breastShape?: string;     // present only if hasBreasts — e.g. "teardrop", "round", "full", "perky"
  breastSoftness?: string;  // present only if hasBreasts — e.g. "firm", "soft", "plush"
  breastSagginess?: string; // present only if hasBreasts — "none" is a valid, common value
  nippleType?: string;      // present only if hasBreasts — e.g. "puffy", "flat", "inverted", "protruding"
  nippleSize?: string;      // present only if hasBreasts — e.g. "small", "medium", "large"
  waistCm: number;
  hipCm: number;
  assSize: string;     // e.g. "petite", "modest", "full", "voluptuous"
  assShape: string;    // e.g. "round", "heart-shaped", "athletic"
  assSoftness: string; // e.g. "firm", "soft", "plush"
  hasPenis: boolean;
  penisLengthCm?: number; // present only if hasPenis
  penisGirthCm?: number;  // present only if hasPenis — circumference, not diameter
  semenVolume?: string;   // present only if hasPenis — descriptive, e.g. "modest", "average", "abundant";
  // deliberately a separate flavor field rather than reusing the player's own
  // `virility` stat, which is specifically a conception-multiplier game mechanic,
  // not a body-detail description — conflating the two would make virility mean
  // two different things depending on which screen it's read from
}

export interface RacialFeaturesDef {
  hasTail: boolean;
  tailType?: string; // present only if hasTail
  hasWings: boolean;
  wingType?: string; // present only if hasWings
  hasHorns: boolean;
  hornType?: string; // present only if hasHorns
  hasTusks: boolean;
  tuskType?: string; // present only if hasTusks
}

// Combat power now scales with Level, never with companion quest Stage.
// See requirements.md §4.2 for the growth formula and role-multiplier table.
export interface LevelProgressionState {
  level: number;      // starts at 1, proposed cap 60
  currentXp: number;  // overflow XP carries into the next level on level-up
}

// ---------------------------------------------------------------------------
// EQUIPMENT & ITEMS
// ---------------------------------------------------------------------------

export interface ItemDef {
  id: string;
  name: string;
  slot: EquipmentSlot | null; // null = consumable/material, not equippable
  equipmentCategory?: EquipmentCategory; // only set when slot !== null — drives which stat pool an
  // upgrade rolls from, see requirements.md §14.2
  materialTier?: ItemMaterialTier; // only set for non-equipment materials/consumables. RAW items can
  // never be a CraftingRecipeDef.resultItemId; COMPOSITE items always
  // have craftingRecipeId set. See requirements.md §14.1.
  craftingRecipeId?: string; // present only when materialTier === Composite
  statModifiers: Partial<CombatStats & EroticStats>;
  stackable: boolean;
  maxStack: number;       // 1 if stackable === false
  sellValueGold: number;  // also the player's sell-back price, see requirements.md §5.8
  upgradable?: boolean;   // only meaningful when slot !== null — an explicit flag, independent of just
  // having a slot, so unique/quest-reward equipment can be marked non-upgradable
  tags: string[];         // e.g. ["lingerie", "quest-item"] — no per-companion gift-preference tags (removed, see requirements.md §5.8)
}

// Drives crafting eligibility — see requirements.md §14.1.
export enum ItemMaterialTier {
  Raw = "RAW",             // base materials/ingredients — never craftable, only obtained via loot/gather/vendor
  Composite = "COMPOSITE", // the product of a CraftingRecipeDef — craftingRecipeId is always set
}

// Drives which stat pool an equipment upgrade randomly rolls from — see requirements.md §14.2.
export enum EquipmentCategory {
  Weapon = "WEAPON",     // attacking stats: STR, AGI, LCK
  Armor = "ARMOR",       // defensive stats: DEF, HP, WIS
  Clothing = "CLOTHING", // erotic stats: SEN, TEC, VIR, maxStamina, maxCrestPower
}

export interface InventorySlotState {
  itemId: string;
  quantity: number;
  upgradeLevel?: number; // weapon/armor/clothing only, see requirements.md §14.2 — items with
  // different upgradeLevel values never stack, even with the same itemId
  upgradeBonuses?: Partial<CombatStats & EroticStats>; // cumulative RANDOM bonuses rolled at each
  // upgrade step (§14.2) — since these are rolled
  // per-instance, two items sharing the same
  // itemId and upgradeLevel can still differ
}

export interface EquippedItem {
  itemId: string;
  state: ClothingState;
  upgradeLevel?: number; // see requirements.md §14.2
  upgradeBonuses?: Partial<CombatStats & EroticStats>; // see InventorySlotState — carried over intact
  // when an item is equipped/unequipped
}

export type EquipmentLoadout = Partial<Record<EquipmentSlot, EquippedItem>>;

// ---------------------------------------------------------------------------
// POSITIONS (Intimacy Engine, §13.1)
// ---------------------------------------------------------------------------

export interface PositionDef {
  id: string;
  name: string;
  playerStaminaCostMultiplier: number;   // 1.0 = baseline
  playerArousalRatePerTurn: number;      // flat % per turn, 0-100 scale
  partnerArousalRatePerTurn: number;
  loveGainMultiplier: number;            // 1.0 = baseline
  requiresTrustAtLeast?: number;         // e.g. Seated Deepthroat requires 50
  requiresPlayerStat?: Partial<CombatStats>; // e.g. { str: 14 } for Standing/Wall
  exclusiveToCompanionId?: CompanionId;  // e.g. Tri-Tail Blowjob -> Tasha
  isTechniqueSensitive: boolean;         // true = attempting this triggers a TEC check, see §4.7 / §5.3
}

// ---------------------------------------------------------------------------
// SKILL TREES (§11, §12) — spends AP/BP, entirely separate from Level/XP
// ---------------------------------------------------------------------------

export interface SkillNodeDef {
  id: string;
  tree: SkillTree;
  name: string;
  tier: 1 | 2 | 3 | 4;
  pointCost: number;         // AP or BP depending on tree
  cpwCost: number;           // 0 for passives
  isPassive: boolean;
  prerequisiteNodeIds: string[]; // must be owned before this can be purchased
  effect: string;            // machine-readable effect key, resolved by combat/intimacy engines
}

export interface PlayerSkillState {
  ardorPoints: number;
  battlePoints: number;
  ownedNodeIds: string[];
}

// ---------------------------------------------------------------------------
// NPC / COMPANION
// ---------------------------------------------------------------------------

export interface TrustLoveState {
  trust: number; // -100 to 100
  love: number;  // -100 to 100
  // Set only by scripted story/quest events, never derived from trust/love math.
  // When present, this overrides the grid lookup entirely (requirements.md §4.3).
  narrativeOverride?: RelationshipStatusId;
}

// ---------------------------------------------------------------------------
// KINKS — a single global catalog, never pre-assigned to any character. A
// KinkDef is a reusable definition (condition + effect) checked purely
// against what happens during actual Intimate Encounters. Which kinks end up
// attached to a given companion or NPC is never curated or predetermined —
// it's entirely emergent, decided only by kinkProgress/satisfiedKinkIds on
// that specific character (CompanionRuntimeState/WorldNpcInstance, identical
// fields on both). Requirements.md §26.
// ---------------------------------------------------------------------------

export enum KinkCategory {
  Verbal = "VERBAL",         // praise, confession, teasing, command-type dialogue
  Physical = "PHYSICAL",     // specific touch-category based
  Positional = "POSITIONAL", // position-preference based
  Situational = "SITUATIONAL", // time-of-day, location, clothing-ritual based
  Emotional = "EMOTIONAL",   // trust/relationship-threshold based
  Gift = "GIFT",
}

// Deliberately grindy — see requirements.md §26 for the reasoning. requiredCount
// is a cumulative, permanent counter on the character (never decays, never resets).
export interface KinkAttachmentCondition {
  requiredContext: string; // machine-readable key checked ONLY against actions/states occurring
  // within an active IntimateEncounterRuntimeState — positions, physical
  // acts, Sex Skill uses, or Arousal states reached. Never a non-sexual
  // interaction (Gift, Talk, Trust/Love thresholds) — see requirements.md §26.
  requiredCount: number;
}

// What happens mechanically once a kink is attached AND its context recurs in a scene.
export interface KinkTriggerEffect {
  arousalBonusFlat: number; // on top of whatever the underlying action/skill already grants
  appliesStatusEffect?: SexualStatusEffectId; // reuses the §21.2 catalog rather than inventing a parallel one
  statusEffectDurationTurns?: number;
}

export interface KinkDef {
  id: string;
  name: string;
  category: KinkCategory;
  description: string; // flavor text, surfaced in the Kink Encyclopedia UI (§26.3)
  attachmentCondition: KinkAttachmentCondition;
  triggerEffect: KinkTriggerEffect;
}

export interface CompanionDef {
  id: CompanionId;
  displayName: string;
  race: Race;
  homeRegion: Region;
  combatRole: CombatRole;
  appearance: AppearanceDef; // [NEW] — see AppearanceDef's own comment for why this was missing
  // The single hand-authored anchor point. Everything past Level 1 is derived
  // via the shared growth formula in requirements.md §4.2 — there is no
  // per-stage stat table anymore; combat power is independent of questStage.
  baseCombatStatsAtLevel1: CombatStats;
  specialAbilityId: string;
  passiveAbilityId: string;
  defaultEquipment: Partial<Record<EquipmentSlot, string>>; // itemId refs
  questChainId: string; // 7-stage subquest chain (narrative/romance progression only)
  suiteThemeId: string;
  moveInRequirements: { trustAtLeast: number; loveAtLeast: number; minQuestStage: number };
  // No kink field here, deliberately — kinks are never pre-assigned per companion.
  // Every character's attached kinks live purely in her runtime satisfiedKinkIds
  // (CompanionRuntimeState/WorldNpcInstance, identical for both), populated only
  // by what actually happens in play. See requirements.md §26.
}

// Companions' own SEN/TEC/stamina — [NEW]. Before this pass, EroticStats
// existed only on PlayerCharacterState; there was no data source at all for
// a companion's "current sexual stats" specifically, which the Contact
// Profile screen (§19) needs. Deliberately excludes virility and crestPower
// — both Kenji-specific (semen volume/conception multiplier, and the Crest
// of Ardor's own resource pool respectively) — a companion's arousal-side
// resource is her stamina; she has no equivalent conception-multiplier stat.
export interface CompanionEroticStats {
  stamina: number;
  maxStamina: number;
  sensitivity: number; // SEN — grows via story/kink progress, mirrors the player's own stat's growth rule
  technique: number;   // TEC — same growth rule as the player's own
}

export interface CompanionRuntimeState {
  companionId: CompanionId;
  trustLove: TrustLoveState;
  eroticStats: CompanionEroticStats; // [NEW]
  questStage: number;          // 0-7, narrative/romance progress ONLY — no effect on combat stats
  levelProgression: LevelProgressionState; // drives combat stats — independent of questStage
  acquired: boolean;            // Stage 3+ per original rules
  movedIn: boolean;
  assignedSuiteId?: string;
  equipment: EquipmentLoadout;
  inventory: InventorySlotState[];
  pregnancy?: PregnancyState;
  lactating: boolean;
  firstIntimacyCompleted: boolean; // gates the one-time +1 AP "first-time intimacy" bonus, §4.10
  daysSinceLastSleep: number; // Companion Fatigue — only accrues while this companion is in
  // PlayerCharacterState.partyMemberIds, see requirements.md §13.2
  kinkProgress: Record<string, number>; // KinkDef id -> cumulative count toward requiredCount,
  // permanent, never decays — see requirements.md §26.2
  satisfiedKinkIds: string[]; // KinkDef ids whose attachmentCondition has been fully met for
  // HER specifically — the actual data the Kink Connoisseur
  // achievement checks against, see requirements.md §26.2
}

// Generic world/procedural NPC (§8) — distinct from the 10 named Companions
export interface WorldNpcInstance {
  instanceId: string;       // unique per spawned NPC, not a template ID
  templateClassId: string;  // one of the 10 procedural NPC classes in §8.1
  legalClass: NpcLegalClass;
  region: Region;
  gender: GenderId; // [NEW] — always MALE or FEMALE, rolled at spawn time. Never VARIES, even when
  // templateClassId's own ProcNpcClassDef.appearance.gender is VARIES — the class
  // describes the archetype's range; every actual spawned individual resolves to one
  // specific gender. See §19.4.
  displayName?: string; // [NEW] — present only once this instance has been "individuated" (§19.4):
  // the moment trustLove first deviates from neutral. Anonymous background NPCs
  // (the vast majority — ordinary LocationPopulationDef population never
  // interacted with meaningfully) never get one and are never real characters,
  // just population flavor.
  trustLove: TrustLoveState;
  eroticStats: CompanionEroticStats; // [NEW] — same shape and rules as a companion's, see above
  movedIn: boolean; // [NEW] — generic NPCs can be invited to live at Ardor Manor exactly like a companion
  // can; see §15.1's revised rule for the flat Trust/Love threshold this uses (no
  // questStage component, since generic NPCs have none)
  assignedSuiteId?: string; // [NEW] — present only if movedIn; same ManorState.suites pool a companion uses
  equipment: EquipmentLoadout;
  goldCarried: number;
  isOffspring: boolean;
  offspringRef?: OffspringNpc; // present if isOffspring === true
  kinkProgress: Record<string, number>; // identical fields and identical rules to
  // CompanionRuntimeState — no character, companion or
  // generic NPC, ever gets pre-assigned kinks, §26.2
  satisfiedKinkIds: string[];
}

// The actual class TEMPLATE that `WorldNpcInstance.templateClassId` /
// `NpcScheduleDef.procNpcClassId` / `LocationPopulationDef`'s counts /
// `GenericNpcDialogueSetDef.procNpcClassId` all reference by string ID
// elsewhere in this document. [NEW] None of those string references ever
// pointed at an actual data object before now — this is that object,
// covering the 10 procedural classes from §8.1 of the GDD.
export interface ProcNpcClassDef {
  id: string; // matches the procNpcClassId/templateClassId strings used everywhere else
  displayName: string;
  description: string; // one or two sentences on the class's role/flavor in the world
  appearance: AppearanceDef; // archetypal — real spawned instances vary; this is the "typical example"
  passiveGenerationItemId: string | "GOLD"; // [NEW] — the class-level equivalent of each companion's
  // bespoke §15.1 flavor item (Mira → Health Potions, etc.);
  // individual NPCs aren't hand-authored the way companions
  // are, so this lives on the shared class instead of per-instance
}

// Named, non-companion story characters — Astraea and any future equivalent (a named antagonist,
// a named quest-critical NPC given real narrative weight, etc.). [NEW] These have a
// CharacterDialogueTreeDef (schemas.ts, dialogue section) exactly like a companion does, but
// deliberately no CompanionDef — no combatRole, no moveInRequirements, no defaultEquipment, none of
// which make sense for a character who isn't a recruitable party member. Before this pass, Astraea
// had a full 39-node dialogue tree and no character/appearance data behind it at all — the same gap
// this type now closes for her and for anyone written like her in the future.
export interface NamedStoryCharacterDef {
  id: string; // matches the characterId used in her CharacterDialogueTreeDef and any CharacterThoughtDef entries
  displayName: string;
  race: Race; // Astraea uses Race.Goddess — already in the enum, never previously referenced anywhere
  appearance: AppearanceDef;
}

// ---------------------------------------------------------------------------
// CONTACT LIST / CONTACT PROFILE (§19, expanded) — [NEW]
// ---------------------------------------------------------------------------

// A companion's or NPC's private internal reaction to Kenji — distinct from
// spoken DialogueNodeDef content. Shown only on the Contact Profile screen,
// never spoken aloud. Same condition-gating pattern as dialogue, deliberately
// reused rather than inventing a parallel gating language.
export interface CharacterThoughtDef {
  id: string;
  characterId: string; // CompanionId, a named story NPC id (e.g. "astraea"), or a procNpcClassId —
  // generic NPCs resolve against their class's shared pool, same relationship
  // GenericNpcDialogueSetDef already has to its class (§19.3)
  conditions: DialogueCondition[]; // ALL must pass; the view picks the highest-Trust/Love-eligible match
  text: string;
}

// A lightweight, derived tier summarizing intimate history — NOT a stored
// field. Computed from firstIntimacyCompleted + satisfiedKinkIds.length +
// the §4.3 relationship-status grid, the same "computed fresh, never a
// second source of truth" philosophy §19 already uses for everything else.
export enum SexualStatusId {
  Untouched = "UNTOUCHED",             // !firstIntimacyCompleted
  NewIntimacy = "NEW_INTIMACY",        // firstIntimacyCompleted, satisfiedKinkIds.length < 3
  EstablishedPartner = "ESTABLISHED_PARTNER", // satisfiedKinkIds.length >= 3
  DevotedLover = "DEVOTED_LOVER",      // narrativeOverride is DevotedPartner or PassionateLove
}

// The Contact List screen's per-row shape — deliberately thin; the full
// detail lives in ContactProfileView, loaded only once a contact is tapped.
export interface ContactListEntry {
  contactId: string; // CompanionId, or a WorldNpcInstance.instanceId
  isCompanion: boolean; // true = one of the 10; false = a generic WorldNpcInstance
  displayName: string;
  portraitAssetId: string;
  relationshipStatus: RelationshipStatusId; // via §4.3's grid, or narrativeOverride if set
}

// The Contact Profile screen's full shape, assembled on demand — see §19 for
// the exact source of every field. Never persisted; a query result, not new
// state, matching the rest of this section's existing philosophy.
export interface ContactProfileView {
  contactId: string;
  isCompanion: boolean;
  displayName: string;
  portraitAssetId: string;
  trueAge?: number;
  apparentAge?: number;
  race: Race;
  appearance: AppearanceDef;
  love: number;
  trust: number;
  relationshipStatus: RelationshipStatusId;
  thoughtsAboutPlayer?: string; // highest-eligible CharacterThoughtDef text, if any qualify; undefined otherwise
  homeRegion: Region;
  homeLocationId?: string; // companions only, via CompanionScheduleDef; undefined for generic NPCs
  currentLocationId: string;
  currentStage?: number; // questStage — companions only
  combatRole?: CombatRole; // companions only
  status: string; // e.g. "In Party", "Moved In", "At Home", or "Available" for a generic NPC
  virginityStatus: "VIRGIN" | "NON_VIRGIN"; // derived from !firstIntimacyCompleted / firstIntimacyCompleted
  pregnancyStatus?: PregnancyState;
  lactationStatus: boolean;
  crestBondManifested: boolean; // derived — equals firstIntimacyCompleted, see §19's own note on this
  sexualStatus: SexualStatusId;
  currentCombatStats: CombatStats; // computed via §4.2's growth formula from levelProgression — companions only
  currentEroticStats?: CompanionEroticStats; // companions/known NPCs only
  specialAbilityId?: string; // companions only
  passiveAbilityId?: string; // companions only
  kinkProgress: Record<string, number>;
  satisfiedKinkIds: string[];
}

// ---------------------------------------------------------------------------
// OFFSPRING (§15.3, expanded)
// ---------------------------------------------------------------------------

export interface OffspringNpc {
  id: string;
  motherCompanionId: CompanionId;
  bornAtGameDate: string; // ISO game-calendar timestamp, see requirements.md §7
  alignment: OffspringAlignment;
  alignmentRollSeed: string; // stored for save-determinism / debugging
  combatStats: CombatStats;   // one-time snapshot generated at birth, see requirements.md §4.5
  vocationId: string;
  currentRegion: Region;
  redemptionArcStage?: 0 | 1 | 2 | 3; // only present if alignment === Criminal
  trustLoveTowardKenji: TrustLoveState; // starts high per original rules regardless of alignment
}

// ---------------------------------------------------------------------------
// PREGNANCY (§15.1, §15.2)
// ---------------------------------------------------------------------------

export interface PregnancyState {
  conceivedAtGameDate: string;
  fatherIsKenji: true; // always true in current scope — no other conception paths defined
  currentWeek: number; // 1-12; evaluated for birth only at the day-end tick (when Midnight's own phase-advance fires), see requirements.md §5.5
  isDivineGestation: boolean; // true only for Astraea's Celestial Gestation path (§15.1)
}

// ---------------------------------------------------------------------------
// QUESTS
// ---------------------------------------------------------------------------

export interface QuestObjective {
  id: string;
  description: string;
  targetCount: number;
  currentCount: number;
}

export interface QuestDef {
  id: string;
  type: QuestType;
  region: Region;
  questGiverId: string; // [NEW] — a CompanionId for QuestType.Companion quests (she's the point of the
  // quest, not a bystander), or a ServiceNpcDef id with serviceType: QuestBoard
  // for repeatable quests. No quest existed without an explicit giver before this
  // pass — see requirements.md §5.6's note on this.
  prerequisiteFlags: string[]; // quest IDs or story flags that must be set
  objectives: QuestObjective[];
  rewardGold: number;
  rewardXp: number;
  rewardReputationDelta: number; // single signed value applied to the merged -800..800 score (§4.1)
  rewardItemIds: string[];
  cooldownHours?: number;       // for repeatable quests only
}

export interface QuestRuntimeState {
  questId: string;
  status: QuestStatus;
  objectiveProgress: Record<string, number>;
  lastCompletedAtGameDate?: string;
}

// ---------------------------------------------------------------------------
// REPUTATION — merged single scale, -800 to +800; see requirements.md §4.1
// for the score/level thresholds and §5.4 for the decay module.
// ---------------------------------------------------------------------------

export interface RegionReputationState {
  region: Region;
  reputationScore: number; // -800 (Exiled Scourge) .. +800 (Saint of Ardor); see requirements.md §4.1
  lastReputationDecayCheckGameDate: string;
}

// ---------------------------------------------------------------------------
// COMBAT — ENCOUNTERS & ENEMY PARTIES (new)
// ---------------------------------------------------------------------------

export interface EnemyCombatantDef {
  id: string;
  name: string;
  monsterType: MonsterType;
  family: string; // flavor/grouping tag, e.g. "wolf", "wraith", "wyrm", "golem", "void-stalker"
  baseLevel: number; // the level combatStats below is tuned for; scaled up/down per spawn region, §4.12
  combatStats: CombatStats;
  aiPattern: EnemyAiPattern;
  abilityIds: string[]; // pool of special attacks/skills this enemy can use — resolved against EnemyAbilityDef
  goldDropRange: [number, number]; // rolled per-instance on defeat, see requirements.md §5.9
  lootTableId: string;
  legalClass: NpcLegalClass; // almost always Outlaw; monsters with no bounty relevance can use Outlaw too
  presentsDefeatMenu: boolean; // true = humanoid, pauses combat for the Defeat Outcome Menu (§5.1);
  // false = pure monster/beast, loot resolves automatically on defeat, no menu
  monsterSex?: "FEMALE" | "MALE" | "NONE"; // only meaningful for enemies whose abilityIds pool
  // includes an EnemyAbilityDef with isSexualAttack: true —
  // drives the targeting rule in requirements.md §23.1
  isHumanoidForm?: boolean; // human-shaped in appearance — independent of monsterType (e.g. a MiasmaCorrupted
  // succubus-type enemy is isHumanoidForm: true despite not being MonsterType.Humanoid)
  maxMiasmaReserve?: number; // only set for enemies with at least one isSexualAttack ability — the
  // pool that ability's miasmaCost is drawn from, see requirements.md §23.1
}

// Formalizes what an ability actually does, resolved from EnemyCombatantDef.abilityIds.
// isSexualAttack is what routes an attack through §23.1's targeting rule instead of
// ordinary HP damage — everything else uses the normal §4.4 damage formula.
export interface EnemyAbilityDef {
  id: string;
  name: string;
  isSexualAttack: boolean;
  damageMultiplier?: number; // relative to §4.4's baseline, only used when isSexualAttack is false
  arousalGainAmount?: number; // flat amount added to the target's CombatCombatantRuntime.arousal,
  // only used when isSexualAttack is true — see requirements.md §23.1
  // for the guideline (+15 to +20 regular, +20 to +30 boss-tier)
  miasmaCost?: number; // Miasma Reserve spent to use this ability, only when isSexualAttack is true —
  // the enemy-side equivalent of a player Sex Skill's CPW cost, see §23.1
}

export interface LootTableEntry {
  itemId: string;
  dropChance: number;        // 0-1, rolled independently per entry — not a single weighted pick,
  // so more than one entry (or none) can drop from a single defeat
  quantityRange: [number, number];
}

export interface LootTableDef {
  id: string;
  entries: LootTableEntry[];
}

export interface EncounterDef {
  id: string;
  region: Region;
  enemyGroup: { enemyDefId: string; count: number }[]; // supports mixed enemy types and counts
  maxSimultaneousEnemies: number; // proposed cap of 6, see requirements.md §5.2
  isBossEncounter: boolean;
  bossScriptId?: string; // HP-threshold-triggered phase transitions, unique boss mechanics
  rewardGoldRange: [number, number];
  rewardXp: number;
  rewardItemIds: string[];
}

// Which monster types/levels are eligible to spawn in a given region — the actual
// "which region has which class of monsters" table, see requirements.md §5.11.
export interface RegionMonsterProfile {
  region: Region;
  levelRange: [number, number];
  allowedMonsterTypes: MonsterType[];
}

export interface CombatCombatantRuntime {
  combatantId: string;   // player id, CompanionId, or EnemyCombatantDef id
  isPlayer: boolean;
  isCompanion: boolean;
  isEnemy: boolean;
  currentHp: number;
  arousal: number; // 0-100, unified across player/companion/enemy alike — see requirements.md §23.
  // For player/companion: driven up by enemy sexual attacks, inflicts the usual
  // combat-penalty tiers, resets to 0 at 100 after a skipped turn. For an enemy:
  // driven up by the player's own Sex Skill actions, and reaching 100 on a
  // "purifiable" MonsterType is an alternate defeat condition alongside currentHp.
  miasmaReserve?: number; // enemy-only, set from maxMiasmaReserve at encounter start, does not
  // regenerate mid-fight — spent on isSexualAttack abilities, throttling
  // how often they're usable exactly like player CPW throttles Sex Skills.
  // Undefined/irrelevant for player and companion combatants. See requirements.md §23.1.
  downed: boolean;       // true at 0 HP, or at 100 arousal for a purifiable enemy — skipped in
  // turn order either way, see requirements.md §5.2/§23
  defeatMethod?: "KILLED" | "PURIFIED"; // minor internal detail, not a second win condition — only used
  // to compute the small Astraea Approval nudge in requirements.md §23.
  // Set once an ENEMY combatant becomes downed; never set for
  // player/companion, whose own arousal maxing out never removes
  // them from the fight, only skips their next turn (§23)
  statusEffects: StatusEffectInstance[]; // combat statuses only — see requirements.md §22
  sourceWorldNpcInstanceId?: string; // present only if this enemy is a named WorldNpcInstance
  // (e.g. a specific bandit) rather than a generic template pull —
  // determines whether Strip & Loot uses goldCarried/equipment (§5.9)
  // or the EnemyCombatantDef's goldDropRange/lootTableId.
}

export interface CombatEncounterRuntimeState {
  encounterDefId: string;
  turnOrder: string[]; // ordered list of combatantId, recomputed at encounter start
  currentTurnIndex: number;
  combatants: CombatCombatantRuntime[];
  markedThreatCombatantId?: string; // set by "Read the Fight" — see requirements.md §22.2
  playerSurprised: boolean; // true if triggered as a Night or Midnight ambush — enemies act first, see requirements.md §7.1
}

// ---------------------------------------------------------------------------
// WORLD LOCATIONS (new — backs "last safe location" recovery and
// night-only stealth locations, requirements.md §5.2 / §7)
// ---------------------------------------------------------------------------

export interface LocationDef {
  id: string;
  region: Region;
  displayName: string;
  isSafe: boolean;           // town hubs, residences, dungeon entrances — never inside an encounter zone
  nightOnlyAccess?: boolean; // e.g. heist-style locations only enterable during Night or Midnight — see requirements.md §7.1
  requiresStealthCheck?: boolean;
  isResidence?: boolean;     // Ardor Manor, companion residences, Companion Suites — the Sleep action (§7.2)
  // is only offered at locations where this is true, or at an Innkeeper ServiceNpcDef
  mapX?: number;             // relative map-rendering coordinates for the explorable map UI, §18 —
  mapY?: number;             // not used by pathing logic itself, which relies entirely on PathEdgeDef
}

// Population density per location — answers "how many of each NPC category
// exist here," see requirements.md §5.10.
export interface LocationPopulationDef {
  locationId: string;
  interactableNpcCounts: { procNpcClassId: string; count: [number, number] }[]; // §8.1 procedural classes, randomized per refresh
  serviceNpcIds: string[];       // fixed roster, always present, never randomized
  childNpcCount: [number, number]; // randomized per refresh, only for residential/hub locations
  refreshIntervalGameDays: number; // how often the interactableNpcCounts roster regenerates
}

// ---------------------------------------------------------------------------
// SERVICE NPCS (new) — pure utility/function NPCs: vendors, bank tellers,
// innkeepers, quest boards. These are NOT WorldNpcInstances: no combat stats,
// no Trust/Love, no legalClass, not targetable by Battle/Intimate/Gift/Flirt
// at all. Talking to one opens its service UI directly instead of the
// Universal Interaction Menu. See requirements.md §5.10.
// ---------------------------------------------------------------------------

export interface ServiceNpcDef {
  id: string;
  displayName: string;
  locationId: string;
  serviceType: ServiceType;
}

// ---------------------------------------------------------------------------
// CHILD NPCS (new) — a fully separate type from WorldNpcInstance, deliberately
// not a flag on it. This is a hard structural boundary, not a runtime check:
// code paths for Battle, Intimate, ForceIntimacy, Flirt, Touch, Command, and
// MoveIn never accept a ChildNpcInstance as an input type at all, so there is
// no flag to bypass and no threshold that unlocks them. Only Talk, Inspect,
// and a restricted platonic Gift (toys/sweets — never romantic/lingerie items)
// are valid interactions. There is no Love axis and no relationship-status
// grid lookup for this type — only a single one-dimensional `familiarity`
// score used purely for quest-gating dialogue (e.g. "the kid trusts you
// enough to mention where his sister went"). See requirements.md §5.10.
// ---------------------------------------------------------------------------

export interface ChildNpcInstance {
  instanceId: string;
  templateClassId: string; // a small set of village-child flavor templates, distinct from the 10 adult classes
  region: Region;
  locationId: string;
  familiarity: number; // 0-100, single axis, quest-gating only — no romantic meaning whatsoever
}

// ---------------------------------------------------------------------------
// INTIMACY ENGINE RUNTIME (new — makes tecChecksAttempted/scene-end concrete)
// ---------------------------------------------------------------------------

export interface IntimateEncounterRuntimeState {
  partnerCompanionId: CompanionId;
  activePositionId: string;
  playerArousal: number;
  partnerArousal: number;
  playerStamina: number; // snapshot of PlayerCharacterState.eroticStats.stamina at scene start, depleted
  // turn-by-turn and written back on scene end — see requirements.md §7.3
  tecChecksAttempted: number; // incremented each turn a technique-sensitive act/position is used
  tecChecksPassed: number;
  kinkTriggered: boolean; // true only if an ALREADY-SATISFIED kink's requiredContext recurred
  // this scene — not any loose thematic match. Feeds §4.8's kinkBonus. §26.2
  sincereDialogueUsed: boolean;
  sceneEndReason: SceneEndReason | null; // null while the scene is still ongoing
  playerStatusEffects: StatusEffectInstance[];  // sexual statuses only — see requirements.md §22
  partnerStatusEffects: StatusEffectInstance[];
}

// ---------------------------------------------------------------------------
// HOUSING (§6 of the GDD)
// ---------------------------------------------------------------------------

export interface ManorState {
  tier: 1 | 2 | 3 | 4;
  storageSlotsUsed: number; // Manor warehouse storage — distinct from the player's personal bag (§5.8)
  storageSlotsMax: number;
  // [CHANGED, this pass] — was `{ suiteId: string; occupantCompanionId: CompanionId | null }[]`.
  // A suite can now hold either a companion or a moved-in generic NPC — occupantId is a CompanionId
  // enum value or a WorldNpcInstance.instanceId, both plain strings underneath. Renamed from
  // occupantCompanionId since it's no longer companion-exclusive.
  suites: { suiteId: string; occupantId: string | null }[];
  constructionState?: { targetTier: 2 | 3 | 4; daysRemaining: number }; // see requirements.md §15.3
  // [CHANGED, this pass] — was `Record<CompanionId, ...>`. Keyed by the same occupantId (CompanionId or
  // WorldNpcInstance.instanceId) for the same reason: passive generation is no longer companion-exclusive.
  pendingPassiveGeneration: Record<string, { itemId: string | "GOLD"; accumulatedQuantity: number }>; // see requirements.md §15.1
}

// ---------------------------------------------------------------------------
// ACHIEVEMENTS (§20 of the GDD)
// ---------------------------------------------------------------------------

export interface AchievementDef {
  id: string;
  name: string;
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  triggerCondition: string; // machine-readable condition key, resolved by an achievement watcher service
  rewardApGrant: number;
  rewardBpGrant: number;
  titleGrant?: string;
}

export interface AchievementRuntimeState {
  achievementId: string;
  unlocked: boolean;
  unlockedAtGameDate?: string;
}

// ---------------------------------------------------------------------------
// PLAYER / GAME STATE ROOT
// ---------------------------------------------------------------------------

// Kenji's static/definitional data — [NEW]. Everything before this point in
// the document tracked Kenji only as runtime state (PlayerCharacterState,
// just below); there was no static counterpart at all, unlike every
// companion's CompanionDef vs. CompanionRuntimeState split. This is that
// counterpart — a single, unchanging record, not per-save state.
export interface PlayerCharacterDef {
  name: string; // default "Kenji Mori"
  appearance: AppearanceDef;
}

export interface PlayerCharacterState {
  name: string; // default "Kenji Mori"
  eroticStats: EroticStats;
  combatStats: CombatStats;
  levelProgression: LevelProgressionState;
  skillState: PlayerSkillState;
  equipment: EquipmentLoadout;
  inventory: InventorySlotState[];
  bagSlotsMax: number; // personal bag capacity, 20 base — see requirements.md §5.8
  gold: number;
  astraeaApproval: number; // 0-100
  currentRegion: Region;
  currentLocationId: string;   // fine-grained location within the region, see LocationDef
  lastSafeLocationId: string;  // recovery point on a full-party wipe, requirements.md §5.2
  daysSinceLastSleep: number;  // resets to 0 by the Sleep action; drives Fatigue penalties, requirements.md §7.2
  partyMemberIds: CompanionId[]; // max 4 — THE party, no separate "active"/"resting" concept, see requirements.md §13
  discoveredLocationIds: string[]; // fast travel destinations, see requirements.md §16
  contentToggles: Record<ContentToggle, boolean>;
}

export interface GameCalendarState {
  currentGameDate: string; // ISO-like in-game date string; increments when Midnight's own phase-advance
  // fires (the day-end tick) — not when Midnight begins, see requirements.md §7
  dayPhase: DayPhase;
  actionsTakenThisPhase: number; // resets to 0 on every phase advance, including the Midnight -> Morning
  // transition that closes out the day — see requirements.md §7
}

// This is the single object persisted to a save file.
// See requirements.md §6 for save/load rules and versioning.
export interface GameState {
  saveSchemaVersion: number;
  player: PlayerCharacterState;
  calendar: GameCalendarState;
  companions: Record<CompanionId, CompanionRuntimeState>;
  offspring: OffspringNpc[];
  quests: Record<string, QuestRuntimeState>;
  reputation: Record<Region, RegionReputationState>;
  manor: ManorState;
  achievements: Record<string, AchievementRuntimeState>;
  storyFlags: Record<string, boolean>; // main quest chapter completion flags, etc.
  defeatedEnemyTypeIds: string[]; // tracks first-ever kill per EnemyCombatantDef, gates the +1 BP "new enemy type" bonus
  childNpcs: ChildNpcInstance[]; // familiarity-only state; never touched by Battle/Intimate/Flirt code paths
  activeMainQuestChapterId: string; // current position in the 7-Act spine, see requirements.md §24
  rngSeed: string; // root seed; per-system rolls should derive sub-seeds from this + a system key
}

// ============================================================================
// CRAFTING & EQUIPMENT UPGRADES — requirements.md §14
// ============================================================================

// Creates a brand-new item from materials. Never applies to already-owned
// weapon/armor/clothing instances — that's EquipmentUpgradeDef below.
export interface CraftingRecipeDef {
  id: string;
  resultItemId: string;
  resultQuantity: number;
  materialCosts: { itemId: string; quantity: number }[]; // every entry here must reference an
  // ItemMaterialTier.Raw item — Composite
  // items are never valid ingredients for
  // another recipe, by design, see requirements.md §14.0
  goldCost: number;
  craftTimeGameDays: number; // 0 = instant, >0 = ready at a future day-end tick
  // No requiredServiceType — crafting is gated by location + skill instead, see requirements.md §14.1
}

// Upgrades an EXISTING weapon/armor/clothing item in place (raises its
// upgradeLevel) — never creates a new item, never applies to consumables/materials.
export interface EquipmentUpgradeDef {
  id: string;
  baseItemId: string;
  fromUpgradeLevel: number; // e.g. 0 -> 1, 1 -> 2
  toUpgradeLevel: number;
  materialCosts: { itemId: string; quantity: number }[];
  goldCost: number;
  guidedSelectionGoldPremium: number; // extra gold, on top of goldCost, to use the Alchemy Lab's
  // guided mode (choose the stat) instead of the Forge's
  // random mode — see requirements.md §14.2. Irrelevant if the
  // player never reaches Manor Tier 4, but always defined.
  // No authored stat bonus — the actual bonus is randomly rolled at upgrade time from the item's
  // EquipmentCategory-appropriate stat pool, capped per step, and stored in the specific item
  // instance's upgradeBonuses. See requirements.md §14.2. No requiredServiceType — gated by
  // location + skill instead, same as CraftingRecipeDef.
}

// ============================================================================
// MANOR PASSIVE GENERATION & NPC SCHEDULES — requirements.md §15
// ============================================================================

export interface PassiveGenerationDef {
  companionId: CompanionId;
  producedItemId: string | "GOLD";
  productionIntervalGameDays: number; // fixed rate, e.g. 2 = "one item every 2 game-days" —
  // independent of the player's own skill investment
  // (Artisan's Insight), tied instead to the companion
  // relationship required to reach movedIn: true in the
  // first place. Deliberately capped low as flavor income,
  // not scaled by Trust/Love beyond that. See requirements.md §15.1.
  capacity: number; // accumulation stops here until collected — see ManorState.pendingPassiveGeneration
}

export interface NpcScheduleDef {
  procNpcClassId: string; // one of §8.1's 10 procedural classes
  region: Region; // which region this schedule variant applies to — a class can have multiple
  // NpcScheduleDef entries, one per region it actually populates, each with real
  // locations from that region rather than one template reused everywhere. Added
  // this pass; the original shape had no region key at all, which is the actual
  // reason the first authoring pass could only produce a single Verdant-Vale-
  // anchored template per class. See requirements.md §2.2/§27.
  scheduleByPhase: Partial<Record<DayPhase, string>>; // DayPhase -> LocationDef id
}

// Per-companion equivalent of NpcScheduleDef, matching each companion's GDD-specified
// Home & Schedule (§4.x of the GDD) rather than a generic procedural class. Only
// consulted while acquired && !movedIn — once movedIn, she's considered present
// anywhere within Ardor Manor at all times instead, per requirements.md §12.
// A DayPhase with no entry means she's not present/interactable at all that phase
// (e.g. asleep) — and therefore not swappable into the party during it.
export interface CompanionScheduleDef {
  companionId: CompanionId;
  scheduleByPhase: Partial<Record<DayPhase, string>>; // DayPhase -> LocationDef id
}

// ============================================================================
// FAST TRAVEL — requirements.md §16
// ============================================================================

// Superseded by PathEdgeDef (below) once §18 became a real explorable graph instead of
// a menu-based travel model — region-hop counting for Fast Travel (§16) is now derived
// directly from the location graph rather than a separate simplified adjacency structure.
export interface PathEdgeDef {
  id: string;
  fromLocationId: string;
  toLocationId: string;
  travelSegments: number; // number of individual map-traversal actions to cross this edge —
  // each segment independently rolls the §5.11 encounter chance, see requirements.md §18
  bidirectional: boolean; // true in nearly all cases
  crossesRegionBorder: boolean; // true if fromLocationId and toLocationId belong to different Regions —
  // counted directly for the Fast Travel hop-cost formula, §16
}

// ============================================================================
// CHARACTER/NPC STATUS DISPLAY — a read model, never persisted directly.
// Assembled on demand from CompanionRuntimeState + CompanionDef + LocationDef +
// OffspringNpc, not stored as its own piece of GameState. requirements.md §19.
// ============================================================================

export interface CharacterStatusEntry {
  characterId: string; // CompanionId, OffspringNpc.id, or a notable WorldNpcInstance.instanceId
  displayName: string;
  currentLocationId: string;
  relationshipStatus?: RelationshipStatusId; // present for companions and notable NPCs with Trust/Love
  questStage?: number;
  isPregnant?: boolean;
  isMovedIn?: boolean;
  isInParty?: boolean;
  alignment?: OffspringAlignment; // offspring only
}

// ============================================================================
// STATUS EFFECT SYSTEM — requirements.md §22. Two separate catalogs: combat
// statuses apply within CombatEncounterRuntimeState, sexual statuses apply
// within IntimateEncounterRuntimeState. Never the same pool.
// ============================================================================

export enum CombatStatusEffectId {
  DefenseDown = "DEFENSE_DOWN",
  DefenseUp = "DEFENSE_UP",
  WisdomDown = "WISDOM_DOWN",
  AttackUp = "ATTACK_UP",
  PartyAttackUp = "PARTY_ATTACK_UP",
  PartyDefenseUp = "PARTY_DEFENSE_UP",
  DodgeUp = "DODGE_UP",
  CounterReady = "COUNTER_READY",
  Confusion = "CONFUSION",
  Stun = "STUN",
  Root = "ROOT",
  Blind = "BLIND",
  Burn = "BURN",
  Regen = "REGEN",
  Shield = "SHIELD", // magnitude = % damage reduction OR flat absorption, depending on the source skill — see requirements.md §22
  Surprised = "SURPRISED", // Night/Midnight ambush marker, §7.1 — mirrors CombatEncounterRuntimeState.playerSurprised
}

export enum SexualStatusEffectId {
  Shivering = "SHIVERING",       // Nipple Sorcery's full-body shiver
  Sensitized = "SENSITIZED",     // increased Arousal gain rate
  Synchronized = "SYNCHRONIZED", // Twin Rhythm's linked Arousal gain
  Edging = "EDGING",             // near-climax lock from the Edging/Orgasm Delay act
  TraumaDebuff = "TRAUMA_DEBUFF", // post-Force-Intimacy NPC psychological state, §10.3 of the GDD —
  // reduces future Trust gain rate for that NPC until cured per §10.3.5
}

export interface StatusEffectInstance {
  effectId: CombatStatusEffectId | SexualStatusEffectId;
  remainingDurationTurns: number; // -1 = lasts until the encounter/scene itself ends, not turn-counted
  magnitude: number; // generic scalar, meaning depends on effectId (e.g. -0.4 for a 40% Defense Down)
  stacks: number;
  maxStacks: number; // reapplying refreshes remainingDurationTurns and increments stacks up to this cap
  sourceSkillOrActId: string; // which skill/act applied it, for UI/logging
}

// ============================================================================
// (Formerly a separate HYBRID COMBAT+INTIMACY ENCOUNTERS type — merged directly into
// CombatCombatantRuntime/CombatEncounterRuntimeState below. Every combat encounter can
// now have a purification path, not just specially-flagged ones. See requirements.md §23.)

// ============================================================================
// MAIN QUEST ACT/CHAPTER STRUCTURE — requirements.md §24
// ============================================================================

export interface ChapterDef {
  id: string;
  actNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  chapterNumber: number;
  displayName: string;
  prerequisiteChapterId: string | null; // null only for each Act's first chapter
  associatedQuestIds: string[];
  cutsceneTriggerId?: string;
  unlocksRegion?: Region;
}

export interface ActDef {
  actNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  displayName: string;
  region: Region;
  chapterIds: string[]; // ordered, matches ChapterDef.chapterNumber
  completionStoryFlag: string;
  astraeaApprovalOnCompletion: number; // Ley Node boss purge bonus, matches GDD §10.3.4's +10 to +20 (main bosses +25)
}

// ============================================================================
// DIALOGUE TREE SCHEMA — requirements.md §25. Main/side characters (the 10
// companions) get their own authored trees; generic procedural NPCs share one
// tree per class. Sexual response lines are separate from both: a common pool
// shared across all companions, and a smaller separate common pool for NPCs.
// ============================================================================

export interface DialogueCondition {
  type: "TRUST_AT_LEAST" | "LOVE_AT_LEAST" | "QUEST_STAGE_AT_LEAST" | "STORY_FLAG_SET" | "STORY_FLAG_UNSET";
  value: number | string;
}

export interface DialogueNodeDef {
  id: string;
  speakerId: string; // CompanionId, a named story NPC id, or "npc_generic"
  text: string;
  conditions: DialogueCondition[]; // ALL must pass for this node to be eligible
  responseOptionIds: string[];
  setsStoryFlag?: string;
}

export interface CharacterDialogueTreeDef {
  characterId: CompanionId | string; // string covers named non-companion story NPCs (e.g. Astraea)
  rootNodeIds: string[]; // entry points, filtered by DialogueCondition at runtime
}

export interface GenericNpcDialogueSetDef {
  procNpcClassId: string; // one of §8.1's 10 procedural classes — ONE shared tree, not per-instance
  rootNodeIds: string[];
}

// The common sexual-response pools — authored once per situation/action/position
// combination, reused across every companion (or every generic NPC), with
// {partnerName} substituted at selection time. See requirements.md §25.2.
export interface SexualResponseLineDef {
  id: string;
  poolTier: "MAIN_SIDE_COMMON" | "NPC_COMMON";
  triggerContext: {
    actionCategory?: string;   // e.g. matches a §13.2 category like "PENETRATIVE_VAGINAL", "ORAL",
    // "ACT_ORAL_CREAMPIE", "ACT_ANAL_CREAMPIE", "ACT_EXTERNAL_CLIMAX"
    positionId?: string;       // optional — some lines are position-specific
    arousalStateMin?: string;  // e.g. "FLUSHED_AND_NEEDY", matches the §13.3 arousal state bands
  };
  text: string; // contains a {partnerName} placeholder
  vocalization: string; // [NEW] onomatopoeia/moan/sound-effect cue (e.g. "Ahn~ mmh...", "Nnngh! Ah,
  // ah—", a wet "slrp, chu~" for oral, a sharp "pak!" for spanking) — kept
  // separate from `text` rather than spliced into the existing prose, so a game
  // engine can render or time it distinctly (different styling, a voice-line
  // cue, etc.) without requiring every line's narrative text to be rewritten
}
