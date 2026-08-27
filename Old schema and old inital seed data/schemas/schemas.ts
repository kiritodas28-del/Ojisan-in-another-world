// ============================================================================
// OJISAN IN ANOTHER WORLD — CORE DATA SCHEMAS (v10)
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
  MountainMonastery = "MOUNTAIN_MONASTERY",
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
  Astraea = "ASTRAEA",
}

export enum EquipmentSlot {
  // Head & Face
  Head = "HEAD",
  Face = "FACE",
  Neck = "NECK",
  // Torso & Underwear
  Body = "BODY",
  UpperBody = "UPPER_BODY",
  LowerBody = "LOWER_BODY",
  Chest = "CHEST",
  Underwear = "UNDERWEAR",
  // Legs & Feet
  Legs = "LEGS",
  Legwear = "LEGWEAR",
  Feet = "FEET",
  Socks = "SOCKS",
  // Hands & Arms
  Hands = "HANDS",
  Wrists = "WRISTS",
  // Accessories & Weapons
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

export enum QuestObjectiveType {
  Kill = "KILL",
  Collect = "COLLECT",
  Talk = "TALK",
  Interact = "INTERACT",
  Escort = "ESCORT",
  Travel = "TRAVEL",
}

export enum OffspringAlignment {
  Heroic = "HEROIC",
  TroubledDrifter = "TROUBLED_DRIFTER",
  Criminal = "CRIMINAL",
}

export enum NpcLegalClass {
  Innocent = "INNOCENT",
  Outlaw = "OUTLAW",
  Protected = "PROTECTED",
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
  UnrequitedLoyalty = "UNREQUITED_LOYALTY",
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
  ForceIntimacy = "FORCE_INTIMACY",
  ForceIntimacyOnSleeping = "FORCE_INTIMACY_ON_SLEEPING",
}

export enum DefeatOutcome {
  SpareAndRelease = "SPARE_AND_RELEASE",
  HandToGuard = "HAND_TO_GUARD",
  Interrogate = "INTERROGATE",
  Loot = "LOOT",
  StripAndLoot = "STRIP_AND_LOOT",
  ForceIntimacy = "FORCE_INTIMACY",
  PermanentlyRemove = "PERMANENTLY_REMOVE",
}

export enum SkillTree {
  Ardor = "ARDOR",
  Battle = "BATTLE",
}

export enum ContentToggle {
  Pregnancy = "PREGNANCY",
  Lactation = "LACTATION",
  Anal = "ANAL",
  NonConsensualContent = "NON_CONSENSUAL_CONTENT",
  HostileArousalAttacks = "HOSTILE_AROUSAL_ATTACKS",
  GraphicCombatText = "GRAPHIC_COMBAT_TEXT",
}

export enum DayPhase {
  Morning = "MORNING",
  Afternoon = "AFTERNOON",
  Evening = "EVENING",
  Night = "NIGHT",
  Midnight = "MIDNIGHT",
}

export enum EnemyAiPattern {
  Aggressive = "AGGRESSIVE",
  Defensive = "DEFENSIVE",
  SupportCaster = "SUPPORT_CASTER",
  BossScripted = "BOSS_SCRIPTED",
}

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
  Bank = "BANK",
  QuestBoard = "QUEST_BOARD",
  Innkeeper = "INNKEEPER",
  FastTravel = "FAST_TRAVEL",
  BountyOffice = "BOUNTY_OFFICE",
}

export type SceneEndReason = "STAMINA_EXHAUSTED" | "PLAYER_ENDED";
export type SceneStartReason = "CONSENSUAL" | "FORCE_INTIMACY" | "FORCE_INTIMACY_SLEEPING";

// ---------------------------------------------------------------------------
// SHARED CHARACTER STATE
// ---------------------------------------------------------------------------

export interface CombatAttributes {
  str: number;
  agi: number;
  wis: number;
  def: number;
  lck: number;
}

export interface EroticAttributes {
  sensitivity: number;
  technique: number;
  virility?: number; // player only
  squirting?: number;         // 0–100; triggers when full
  lactation?: number;         // 0–100; milk level
  lactating?: boolean;        // whether currently lactating
}

export interface CharacterVitals {
  currentHp: number;
  maxHp: number;
  currentArousal: number;    // 0–100, shared
  currentStamina: number;
  maxStamina: number;
  currentCrestPower?: number;
  maxCrestPower?: number;

  // NEW: dynamic fluids / fullness
  currentBladder?: number;   // 0–100, squirting when full
  maxBladder?: number;
  currentMilk?: number;      // 0–100, lactation volume
  maxMilk?: number;
}

export interface CharacterActorState {
  id: string;
  displayName?: string;       // optional, anonymous NPCs may not have a name yet
  vitals: CharacterVitals;
  combatAttributes: CombatAttributes;
  eroticAttributes: EroticAttributes;
  statusEffects: StatusEffectInstance[];
}

// ---------------------------------------------------------------------------
// LEVELING
// ---------------------------------------------------------------------------

export interface LevelProgressionState {
  level: number;
  currentXp: number;
}

// ---------------------------------------------------------------------------
// APPEARANCE
// ---------------------------------------------------------------------------

export enum GenderId {
  Male = "MALE",
  Female = "FEMALE",
  Varies = "VARIES",
}

// Appearance union types (string literals for type safety)
export type SkinTone =
  | "Very pale"
  | "Pale"
  | "Fair"
  | "Light neutral"
  | "Light warm / olive"
  | "Medium warm / tan"
  | "Medium brown"
  | "Deep brown"
  | "Deep";

export type PubicHairStyle =
  | "Bare"
  | "Landing strip"
  | "Neatly trimmed"
  | "Natural trimmed"
  | "Full natural";

export type UnderarmHairStyle =
  | "Bare"
  | "Light stubble"
  | "Natural";

export type MusclePresence =
  | "None visible"
  | "Faint suggestion"
  | "Lightly toned"
  | "Clearly toned"
  | "Defined"
  | "Athletic defined"
  | "Muscular";

export type AssSize =
  | "Small and rounded"
  | "Compact and firm"
  | "Medium rounded"
  | "Full rounded"
  | "Full rounded with spread"
  | "Large, prominent"
  | "Large and soft"
  | "Heavy with significant mass"
  | "Shelf ass"
  | "Soft and heavy"
  | "Enormous";

export type AssFirmness = "Firm" | "Soft" | "Very soft";

export type AssType =
  | "Petite / Slim"
  | "Compact / Lean"
  | "Average / Balanced"
  | "Curvy / Defined"
  | "Full / Prominent"
  | "Stacked / Amplified"
  | "Heavy-Set / Wide"
  | "Extremely Voluminous"
  | "Super-Plump / Hyper-Scale"
  | "Maximum / Ultra-Wide";

export type BreastSize =
  | "Barely there"
  | "Small"
  | "Small full"
  | "Medium firm"
  | "Medium full"
  | "Full"
  | "Large"
  | "Large heavy"
  | "Very large"
  | "Massive"
  | "Enormous";

export type BreastCupSize =
  | "AA / A"
  | "B"
  | "C"
  | "D"
  | "DD / E"
  | "DDD / F"
  | "G"
  | "H"
  | "I"
  | "J";

export type BreastShape =
  | "Perky"
  | "Natural droop"
  | "Teardrop"
  | "Wide-set"
  | "Close-set"
  | "Conical"
  | "Round"
  | "Hanging"
  | "Torpedo"
  | "Bell-shaped"
  | "Side-spread"
  | "Forward-projection";

export type BreastFirmness = "Firm" | "Soft" | "Loose" | "Fully hanging";

export type HeightTag =
  | "Very Petite"
  | "Petite"
  | "Short"
  | "Below Average"
  | "Average"
  | "Above Average"
  | "Tall"
  | "Very Tall";

export enum BodyShape {
  Hourglass = "Hourglass",
  PearTriangle = "Pear / Triangle",
  AppleRound = "Apple / Round",
  RectangleStraight = "Rectangle / Straight",
  InvertedTriangle = "Inverted Triangle",
  Spoon = "Spoon",
  Diamond = "Diamond",
  Oval = "Oval",
  Athletic = "Athletic",
  TopHourglass = "Top Hourglass",
  BottomHourglass = "Bottom Hourglass",
  Bell = "Bell",
  Lollipop = "Lollipop",
  Cornet = "Cornet",
}

export type BodyCategory =
  | "Ethereal & Delicate"
  | "Harmonious & Balanced"
  | "Toned & Athletic"
  | "Straight & Sleek"
  | "Soft & Feminine"
  | "Lower-Curve & Exotic"
  | "Bottom-Heavy Hourglass"
  | "Erotic Bombshell"
  | "Fantasy & Hyper-Exotic"
  | "Realistically Impossible";

export type HairStyle =
  | "Buzz Cut"
  | "Crew Cut"
  | "Shaved Head"
  | "Fade"
  | "Pixie Cut"
  | "Taper Cut"
  | "Undercut"
  | "Side Part"
  | "Curly Crop"
  | "Short Bangs"
  | "Bob"
  | "Long Bob"
  | "Shag"
  | "Curly Shag"
  | "Shoulder-Length"
  | "Twists"
  | "Long & Straight"
  | "Long & Wavy"
  | "Long & Curly"
  | "Dreadlocks / Locs"
  | "Classic Long"
  | "Long Ponytail"
  | "Long Braid"
  | "Long Messy Bun"
  | "Long Glossy Waves"
  | "Long Sleek Ponytail";

export type HairColor =
  | "Jet Black"
  | "Soft Black"
  | "Dark Brown"
  | "Medium Brown"
  | "Light Brown"
  | "Chestnut Brown"
  | "Auburn"
  | "Copper Red"
  | "Strawberry Blonde"
  | "Golden Blonde"
  | "Platinum Blonde"
  | "Grey"
  | "White"
  | "Salt & Pepper"
  | "Pastel Pink"
  | "Hot Pink"
  | "Lavender"
  | "Deep Purple"
  | "Electric Blue"
  | "Teal";

export interface AppearanceDef {
  heightCm: number;
  heightTag?: HeightTag;
  build: string;
  musclePresence?: MusclePresence;
  gender: GenderId;
  bodyShape?: BodyShape;
  bodyCategory?: BodyCategory;   // NEW: derived aesthetic category
  hairColor: string;
  hairStyle: string;
  eyeColor: string;
  skinTone: SkinTone;
  skinType: string;
  distinguishingFeatures: string[];
  scarsAndTattoos: string[];
  apparentAge?: number;
  trueAge?: number;
  bodyDetails?: BodyDetailsDef;
  racialFeatures?: RacialFeaturesDef;
  portraitAssetId: string;
  aestheticSummary: string;
}

export interface BodyDetailsDef {
  hasBreasts: boolean;
  breastSize?: BreastSize;            // descriptive size
  breastSizeCup?: BreastCupSize;      // cup letter
  breastShape?: BreastShape;
  breastFirmness?: BreastFirmness;    // was breastSoftness
  nippleType?: string;
  nippleSize?: string;
  pubicHairStyle?: PubicHairStyle;
  underarmHairStyle?: UnderarmHairStyle;
  waistCm: number;
  hipCm: number;
  assSize: AssSize;
  assType?: AssType;                  // added
  assFirmness?: AssFirmness;          // was assSoftness
  hasPenis: boolean;
  penisLengthCm?: number;
  penisGirthCm?: number;
  semenVolume?: string;
}

export interface RacialFeaturesDef {
  hasTail: boolean;
  tailType?: string;
  hasWings: boolean;
  wingType?: string;
  hasHorns: boolean;
  hornType?: string;
  hasTusks: boolean;
  tuskType?: string;
}

export interface HumanoidAppearanceRule {
  heightRange: [number, number];
  buildOptions: string[];
  musclePresenceOptions: MusclePresence[];
  hairColorOptions: string[];
  hairStyleOptions: string[];
  eyeColorOptions: string[];
  skinToneOptions: SkinTone[];

  // Female-only
  breastSizeOptions?: BreastSize[];
  breastCupOptions?: BreastCupSize[];
  breastShapeOptions?: BreastShape[];

  assSizeOptions: AssSize[];
  assTypeOptions: AssType[];
  assFirmnessOptions: AssFirmness[];
  pubicHairOptions: PubicHairStyle[];
  underarmHairOptions: UnderarmHairStyle[];

  bodyShapeWeights: Partial<Record<BodyShape, number>>;
}

// ---------------------------------------------------------------------------
// GAME SETTINGS
// ---------------------------------------------------------------------------

export interface GameSettings {
  npcBodyTypeDistribution: Partial<Record<BodyShape, number>>; // percentage weights 0-100
}

// ---------------------------------------------------------------------------
// EQUIPMENT & ITEMS
// ---------------------------------------------------------------------------

export enum ItemMaterialTier {
  Raw = "RAW",
  Composite = "COMPOSITE",
}

export enum EquipmentCategory {
  Weapon = "WEAPON",
  Armor = "ARMOR",
  Clothing = "CLOTHING",
}

export enum ItemTag {
  Vibrator = "VIBRATOR",
  Bondage = "BONDAGE",
  Toy = "TOY",
  ImpactToy = "IMPACT_TOY",
  Clamps = "CLAMPS",
  BreastToy = "BREAST_TOY",
  Lactation = "LACTATION",
  Lingerie = "LINGERIE",
  QuestItem = "QUEST_ITEM",
  Consumable = "CONSUMABLE",
  Material = "MATERIAL",
  Weapon = "WEAPON",
  Armor = "ARMOR",
  Clothing = "CLOTHING",
  GiftPlatonic = "GIFT_PLATONIC",
  GiftRomantic = "GIFT_ROMANTIC",
}

export interface ItemDef {
  id: string;
  name: string;
  slot: EquipmentSlot | null;
  equipmentCategory?: EquipmentCategory;
  materialTier?: ItemMaterialTier;
  craftingRecipeId?: string;
  statModifiers: Partial<CombatAttributes & EroticAttributes & { hp: number }>;
  stackable: boolean;
  maxStack: number;
  sellValueGold: number;
  upgradable?: boolean;
  tags: ItemTag[];
}

export interface InventorySlotState {
  itemId: string;
  quantity: number;
  upgradeLevel?: number;
  upgradeBonuses?: Partial<CombatAttributes & EroticAttributes & { hp: number }>;
}

export interface EquippedItem {
  itemId: string;
  state: ClothingState;
  upgradeLevel?: number;
  upgradeBonuses?: Partial<CombatAttributes & EroticAttributes & { hp: number }>;
}

export type EquipmentLoadout = Partial<Record<EquipmentSlot, EquippedItem>>;

// ---------------------------------------------------------------------------
// INTIMACY — POSITIONS & ACTIONS
// ---------------------------------------------------------------------------

export interface PositionDef {
  id: string;
  name: string;
  description: string;

  // Which actions are allowed in this position?
  allowedActionIds?: string[];
  allowedActionCategories?: IntimateActionCategory[];

  // Which actions are forbidden?
  forbiddenActionIds?: string[];

  // Position-specific gates
  requiresTrustAtLeast?: number;
  requiresLoveAtLeast?: number;
  requiresPlayerStat?: Partial<CombatAttributes>;
  requiresPartnerStat?: Partial<CombatAttributes>;

  // Position-specific exclusivity
  exclusiveToCompanionId?: CompanionId;

  // Does this position itself demand a technique check, regardless of action?
  isTechniqueSensitive?: boolean;
}

export enum ArousalState {
  Unaroused = "UNAROUSED",
  Warming = "WARMING",
  Aroused = "AROUSED",
  Needy = "NEEDY",
  Overwhelmed = "OVERWHELMED",
}

export enum IntimateActionCategory {
  PenetrativeVaginal = "PENETRATIVE_VAGINAL",
  PenetrativeAnal = "PENETRATIVE_ANAL",
  Fingering = "FINGERING",
  OralMaleFocused = "ORAL_MALE_FOCUSED",
  OralFemaleFocused = "ORAL_FEMALE_FOCUSED",
  Breast = "BREAST",
  SkinTouch = "SKIN_TOUCH",
  HardcoreDominance = "HARDCORE_DOMINANCE",
  HardcoreRoughness = "HARDCORE_ROUGHNESS",
  HardcoreImpact = "HARDCORE_IMPACT",
  ToyVibrator = "TOY_VIBRATOR",
  ToyPaddleWhip = "TOY_PADDLE_WHIP",
  ToyClampsPressure = "TOY_CLAMPS_PRESSURE",
  ToyBondage = "TOY_BONDAGE",
  PregnancySpecific = "PREGNANCY_SPECIFIC",
  Lactation = "LACTATION",
  BreastToy = "BREAST_TOY",
  Cum = "CUM",
  Climax = "CLIMAX",
  Edging = "EDGING",
  Verbal = "VERBAL",
}

export enum PenetrationTarget {
  Vagina = "VAGINA",
  Anus = "ANUS",
  Mouth = "MOUTH",
}

export enum BodyPartTarget {
  Vagina = "VAGINA",
  Anus = "ANUS",
  Mouth = "MOUTH",
  Clitoris = "CLITORIS",
  Nipples = "NIPPLES",
  Breasts = "BREASTS",
  Neck = "NECK",
  Ears = "EARS",
  Thighs = "THIGHS",
  Buttocks = "BUTTOCKS",
  Hands = "HANDS",
  Feet = "FEET",
  Belly = "BELLY",
  Back = "BACK",
  Face = "FACE",
  Hair = "HAIR",
  EntireBody = "ENTIRE_BODY",
}

export interface ItemUsageRequirement {
  itemId?: string;
  itemTag?: ItemTag;
  anyOf?: string[];
  consume: boolean;
}

export interface IntimateActionDef {
  id: string;
  name: string;
  category: IntimateActionCategory;
  ledBy: "PLAYER" | "CHARACTER";

  playerStaminaCostMultiplier: number;
  partnerStaminaCostMultiplier: number;
  playerArousalRatePerTurn: number;
  partnerArousalRatePerTurn: number;

  trustGainMultiplier: number;
  loveGainMultiplier: number;

  requiresPlayerStat?: Partial<CombatAttributes>;
  isTechniqueSensitive: boolean;

  requiresItem?: ItemUsageRequirement;

  allowedPositionIds?: string[];
  forbiddenPositionIds?: string[];

  occupiedBodyParts: BodyPartTarget[];
  penetrationTarget?: PenetrationTarget;

  // NEW: kink(s) promoted by this action
  promotesKink?: string[];

  // NEW: permanent erotic attribute gains (very small per use)
  playerTechniqueGain: number;
  partnerTechniqueGain: number;
  playerSensitivityGain: number;
  partnerSensitivityGain: number;

  // NEW: bladder/milk deltas (base values; engine scales them by actor stats)
  playerBladderDelta?: number;
  partnerBladderDelta?: number;
  playerMilkDelta?: number;
  partnerMilkDelta?: number;

  // Eligibility gates (all conditions must pass)
  allowedPartnerMoods?: PartnerMood[];        // if defined, mood must be in list
  allowedPartnerMentalStates?: PartnerMentalState[];
  maxPartnerResistance?: number;              // action allowed only if resistance <= value
  minPartnerResistance?: number;              // action allowed only if resistance >= value

  // State deltas applied after action (before scaling)
  partnerResistanceDelta: number;             // positive = more resistance, negative = less

  partnerMentalStateEffect?: {
    target: PartnerMentalState;
    intensity: number;                        // 0.0 - 1.0 chance of shifting toward target
  };

  partnerMoodEffect?: {
    target: PartnerMood;
    intensity: number;
  };

  isAutomatic?: boolean;   // if true, action is triggered by engine, not player
}
// ---------------------------------------------------------------------------
// SKILL TREES
// ---------------------------------------------------------------------------

export interface SkillNodeDef {
  id: string;
  tree: SkillTree;
  name: string;
  tier: 1 | 2 | 3 | 4;
  pointCost: number;
  cpwCost: number;
  isPassive: boolean;
  prerequisiteNodeIds: string[];
  effect: string;
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
  trust: number;
  love: number;
  narrativeOverride?: RelationshipStatusId;
}

// ---------------------------------------------------------------------------
// KINKS
// ---------------------------------------------------------------------------

export enum KinkCategory {
  Verbal = "VERBAL",
  Physical = "PHYSICAL",
  Positional = "POSITIONAL",
  Situational = "SITUATIONAL",
  Emotional = "EMOTIONAL",
  Gift = "GIFT",
}

export interface KinkAttachmentCondition {
  requiredContext: string;
  requiredCount: number;
}

export interface KinkTriggerEffect {
  arousalBonusFlat: number;
  appliesStatusEffect?: SexualStatusEffectId;
  statusEffectDurationTurns?: number;
}

export interface KinkDef {
  id: string;
  name: string;
  category: KinkCategory;
  description: string;
  attachmentCondition: KinkAttachmentCondition;
  triggerEffect: KinkTriggerEffect;
}

export interface CompanionDef {
  id: CompanionId;
  displayName: string;
  race: Race;
  homeRegion: Region;
  homeLocationId?: string;   // NEW: optional home location ID
  combatRole: CombatRole;
  appearance: AppearanceDef;
  baseCombatAttributes: CombatAttributes;
  baseVitals: Omit<CharacterVitals, "currentArousal" | "currentStamina" | "currentCrestPower">;
  specialAbilityId: string;
  passiveAbilityId: string;
  defaultEquipment: Partial<Record<EquipmentSlot, string>>;
  questChainId: string;
  suiteThemeId: string;
  moveInRequirements: { trustAtLeast: number; loveAtLeast: number; minQuestStage: number };
}

export interface CompanionRuntimeState extends CharacterActorState {
  companionId: CompanionId;
  trustLove: TrustLoveState;
  questStage: number;
  levelProgression: LevelProgressionState;
  acquired: boolean;
  movedIn: boolean;
  assignedSuiteId?: string;
  equipment: EquipmentLoadout;
  inventory: InventorySlotState[];
  pregnancy?: PregnancyState;
  lactating: boolean;
  firstIntimacyCompleted: boolean;
  daysSinceLastSleep: number;
  kinkProgress: Record<string, number>;
  satisfiedKinkIds: string[];
  flirtUsesRemainingToday: number;
  touchUsesRemainingToday: number;
}

export interface WorldNpcInstance extends CharacterActorState {
  instanceId: string;
  templateClassId: string;
  legalClass: NpcLegalClass;
  region: Region;
  homeLocationId?: string;   // NEW: assigned at spawn, used by "HOME" token
  gender: GenderId;
  displayName?: string;
  hasBeenIntroduced: boolean;
  trustLove: TrustLoveState;
  movedIn: boolean;
  assignedSuiteId?: string;
  equipment: EquipmentLoadout;
  goldCarried: number;
  isOffspring: boolean;
  offspringRef?: OffspringNpc;
  firstIntimacyCompleted: boolean;
  appearanceSeed?: string;
  kinkProgress: Record<string, number>;
  satisfiedKinkIds: string[];
  flirtUsesRemainingToday: number;
  touchUsesRemainingToday: number;
}

export interface ProcNpcClassDef {
  id: string;
  displayName: string;
  description: string;
  appearance: AppearanceDef;
  passiveGenerationItemId: string | "GOLD";
  genderWeight?: { male: number; female: number };
  appearanceRule?: HumanoidAppearanceRule;
}

export interface NamedStoryCharacterDef {
  id: string;
  displayName: string;
  race: Race;
  appearance: AppearanceDef;
}

// ---------------------------------------------------------------------------
// CONTACT LIST / PROFILE
// ---------------------------------------------------------------------------

export interface CharacterThoughtDef {
  id: string;
  characterId: string;
  conditions: DialogueCondition[];
  text: string;
}

export enum SexualStatusId {
  Untouched = "UNTOUCHED",
  NewIntimacy = "NEW_INTIMACY",
  EstablishedPartner = "ESTABLISHED_PARTNER",
  DevotedLover = "DEVOTED_LOVER",
}

export interface ContactListEntry {
  contactId: string;
  isCompanion: boolean;
  displayName: string;
  portraitAssetId: string;
  relationshipStatus: RelationshipStatusId;
}

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
  thoughtsAboutPlayer?: string;
  homeRegion: Region;
  homeLocationId?: string;
  currentLocationId: string;
  currentStage?: number;
  combatRole?: CombatRole;
  status: string;
  virginityStatus: "VIRGIN" | "NON_VIRGIN";
  pregnancyStatus?: PregnancyState;
  lactationStatus: boolean;
  crestBondManifested: boolean;
  sexualStatus: SexualStatusId;
  currentCombatStats: CombatAttributes;
  currentEroticStats?: EroticAttributes;
  specialAbilityId?: string;
  passiveAbilityId?: string;
  kinkProgress: Record<string, number>;
  satisfiedKinkIds: string[];
}

// ---------------------------------------------------------------------------
// OFFSPRING & VOCATION
// ---------------------------------------------------------------------------

export interface OffspringNpc {
  id: string;
  motherCompanionId: CompanionId;
  bornAtGameDate: string;
  alignment: OffspringAlignment;
  alignmentRollSeed: string;
  combatStats: CombatAttributes;
  vitals: CharacterVitals;
  vocationId: string;
  currentRegion: Region;
  redemptionArcStage?: 0 | 1 | 2 | 3;
  trustLoveTowardKenji: TrustLoveState;
  appearance?: AppearanceDef;
}

export interface VocationDef {
  id: string;
  name: string;
  description: string;
}

// ---------------------------------------------------------------------------
// PREGNANCY
// ---------------------------------------------------------------------------

export interface PregnancyState {
  conceivedAtGameDate: string;
  fatherIsKenji: true;
  currentWeek: number;
  isDivineGestation: boolean;
}

// ---------------------------------------------------------------------------
// QUESTS
// ---------------------------------------------------------------------------

export interface QuestObjective {
  id: string;
  type: QuestObjectiveType;
  description: string;
  targetCount: number;
  currentCount: number;
  targetEnemyId?: string;
  targetItemId?: string;
  targetNpcId?: string;
  targetLocationId?: string;
  fromLocationId?: string;
  toLocationId?: string;
}

export interface QuestDef {
  id: string;
  type: QuestType;
  region: Region;
  questGiverId: string;
  prerequisiteFlags: string[];
  objectives: QuestObjective[];
  rewardGold: number;
  rewardXp: number;
  rewardReputationDelta: number;
  rewardItemIds: string[];
  cooldownHours?: number;
  companionTrustDelta?: number; // applied to companion.trustLove.trust on completion
  companionLoveDelta?: number;  // applied to companion.trustLove.love on completion
}

export interface QuestRuntimeState {
  questId: string;
  status: QuestStatus;
  objectiveProgress: Record<string, number>;
  lastCompletedAtGameDate?: string;
}

export interface QuestTrackingEntry {
  questId: string;
  status: QuestStatus;
  currentObjectiveDescription: string;
  objectiveProgress: number;
  objectiveTarget: number;
  giverName: string;
  timeRemaining?: string;
}

export interface QuestLogView {
  activeQuests: QuestTrackingEntry[];
  availableQuests: QuestTrackingEntry[];
  completedQuests: QuestTrackingEntry[];
}

// ---------------------------------------------------------------------------
// REPUTATION
// ---------------------------------------------------------------------------

export interface RegionReputationState {
  region: Region;
  reputationScore: number;
  lastReputationDecayCheckGameDate: string;
}

// ---------------------------------------------------------------------------
// COMBAT
// ---------------------------------------------------------------------------

export interface EnemyCombatantDef {
  id: string;
  name: string;
  monsterType: MonsterType;
  family: string;
  baseLevel: number;
  combatAttributes: CombatAttributes;
  baseVitals: Omit<CharacterVitals, "currentArousal" | "currentStamina" | "currentCrestPower">;
  aiPattern: EnemyAiPattern;
  abilityIds: string[];
  goldDropRange: [number, number];
  lootTableId: string;
  legalClass: NpcLegalClass;
  presentsDefeatMenu: boolean;
  monsterSex?: "FEMALE" | "MALE" | "NONE";
  isHumanoidForm?: boolean;
  maxMiasmaReserve?: number;
  appearance?: AppearanceDef;
}

export interface EnemyAbilityDef {
  id: string;
  name: string;
  isSexualAttack: boolean;
  damageMultiplier?: number;
  arousalGainAmount?: number;
  miasmaCost?: number;
}

export interface BossScriptDef {
  id: string;
  phases: {
    hpThresholdPercent: number;
    triggeredAbilityIds: string[];
    narrative: string;
  }[];
}

export interface LootTableEntry {
  itemId: string;
  dropChance: number;
  quantityRange: [number, number];
}

export interface LootTableDef {
  id: string;
  entries: LootTableEntry[];
}

export interface EncounterDef {
  id: string;
  region: Region;
  enemyGroup: { enemyDefId: string; count: number }[];
  maxSimultaneousEnemies: number;
  isBossEncounter: boolean;
  bossScriptId?: string;
  rewardGoldRange: [number, number];
  rewardXp: number;
  rewardItemIds: string[];
}

export interface RegionMonsterProfile {
  region: Region;
  levelRange: [number, number];
  allowedMonsterTypes: MonsterType[];
}

export interface CombatCombatantRuntime extends CharacterActorState {
  isPlayer: boolean;
  isCompanion: boolean;
  isEnemy: boolean;
  miasmaReserve?: number;
  downed: boolean;
  defeatMethod?: "KILLED" | "PURIFIED";
  sourceWorldNpcInstanceId?: string;
}

export interface CombatEncounterRuntimeState {
  encounterDefId: string;
  partyMemberIds: CompanionId[];
  turnOrder: string[];
  currentTurnIndex: number;
  combatants: CombatCombatantRuntime[];
  markedThreatCombatantId?: string;
  playerSurprised: boolean;
}

// ---------------------------------------------------------------------------
// WORLD LOCATIONS
// ---------------------------------------------------------------------------

export interface LocationDef {
  id: string;
  region: Region;
  displayName: string;
  isSafe: boolean;
  nightOnlyAccess?: boolean;
  requiresStealthCheck?: boolean;
  isResidence?: boolean;
  mapX?: number;
  mapY?: number;
}

export interface LocationPopulationDef {
  locationId: string;
  interactableNpcCounts: { procNpcClassId: string; count: [number, number] }[];
  serviceNpcIds: string[];
  childNpcCount: [number, number];
  refreshIntervalGameDays: number;
}

// ---------------------------------------------------------------------------
// SERVICE / CHILD NPCS
// ---------------------------------------------------------------------------

export interface ServiceNpcDef {
  id: string;
  displayName: string;
  locationId: string;
  serviceType: ServiceType;
}

export interface ChildNpcInstance {
  instanceId: string;
  templateClassId: string;
  region: Region;
  locationId: string;
  familiarity: number;
}

export interface ChildNpcClassDef {
  id: string;
  displayName: string;
  description: string;
  appearance: AppearanceDef;
  appearanceRule?: HumanoidAppearanceRule;
  scheduleByPhase?: Partial<Record<DayPhase, string>>; // optional
}

// ---------------------------------------------------------------------------
// INTIMACY RUNTIME
// ---------------------------------------------------------------------------

export interface IntimateEncounterRuntimeState {
  sceneStartReason: SceneStartReason;
  partnerActorId: string;
  playerActorId: string;

  // Current position (single)
  currentPositionId: string;

  // One or more simultaneous active actions (e.g., fingering + nipple play)
  activeActionIds: string[];

  // Most recent action ID (for response continuity)
  lastActionId: string | null;

  playerVitalsSnapshot: CharacterVitals;
  partnerVitalsSnapshot: CharacterVitals;

  tecChecksAttempted: number;
  tecChecksPassed: number;

  // Still used for satisfaction calculation, not for response selection
  kinkTriggered: boolean;
  sincereDialogueUsed: boolean;

  sceneEndReason: SceneEndReason | null;

  playerStatusEffects: StatusEffectInstance[];
  partnerStatusEffects: StatusEffectInstance[];

  occupiedBodyParts: BodyPartTarget[];
  occupiedPenetrationTargets: PenetrationTarget[];

  // New: climax / squirting states
  partnerClimaxing: boolean;
  partnerClimaxType?: "NORMAL" | "BODY_SHAKING" | "SQUIRTING" | "BODY_SHAKING_SQUIRTING";
  partnerSquirtingMilk: boolean;

  // NEW
  partnerResistance: number;              // 0-100
  partnerMentalState: PartnerMentalState;
  partnerMood: PartnerMood;
  isForced: boolean;
}

export enum PartnerMentalState {
  Calm = "CALM",
  Nervous = "NERVOUS",
  Aroused = "AROUSED",
  Overwhelmed = "OVERWHELMED",
  Broken = "BROKEN",
}

export enum PartnerMood {
  Neutral = "NEUTRAL",
  Shy = "SHY",
  Enthusiastic = "ENTHUSIASTIC",
  Reluctant = "RELUCTANT",
  Defiant = "DEFIANT",
  Horny = "HORNY",
  Submissive = "SUBMISSIVE",
  Compliant = "COMPLIANT",
}

// ---------------------------------------------------------------------------
// MANOR
// ---------------------------------------------------------------------------

export interface ManorState {
  tier: 1 | 2 | 3 | 4;
  storageSlotsUsed: number;
  storageSlotsMax: number;
  suites: { suiteId: string; occupantId: string | null }[];
  constructionState?: { targetTier: 2 | 3 | 4; daysRemaining: number };
  pendingPassiveGeneration: Record<string, { itemId: string | "GOLD"; accumulatedQuantity: number }>;
  pendingCraftingJobs: {
    recipeId: string;
    startGameDate: string;
    daysRemaining: number;
  }[];
}

// ---------------------------------------------------------------------------
// ACHIEVEMENTS
// ---------------------------------------------------------------------------

export interface AchievementDef {
  id: string;
  name: string;
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  triggerCondition: string;
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

export interface PlayerCharacterDef {
  name: string;
  appearance: AppearanceDef;
  baseCombatAttributes: CombatAttributes;
  baseEroticAttributes: EroticAttributes;
  baseVitals: Omit<CharacterVitals, "currentArousal" | "currentStamina" | "currentCrestPower">;
  startingEquipment: Partial<Record<EquipmentSlot, string>>;
  startingInventory: { itemId: string; quantity: number }[];
  startingSkillNodeIds: string[];   // NEW
}

export interface PlayerCharacterState extends CharacterActorState {
  name: string;
  levelProgression: LevelProgressionState;
  skillState: PlayerSkillState;
  equipment: EquipmentLoadout;
  inventory: InventorySlotState[];
  bagSlotsMax: number;
  gold: number;
  astraeaApproval: number;
  currentRegion: Region;
  currentLocationId: string;
  lastSafeLocationId: string;
  daysSinceLastSleep: number;
  partyMemberIds: CompanionId[];
  discoveredLocationIds: string[];
  contentToggles: Record<ContentToggle, boolean>;
  settings: GameSettings;
}

export interface GameCalendarState {
  currentGameDate: string;
  dayPhase: DayPhase;
  actionsTakenThisPhase: number;
}

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
  storyFlags: Record<string, boolean>;
  defeatedEnemyTypeIds: string[];
  childNpcs: ChildNpcInstance[];
  activeMainQuestChapterId: string;
  rngSeed: string;
}

// ---------------------------------------------------------------------------
// CRAFTING / UPGRADES
// ---------------------------------------------------------------------------

export interface CraftingRecipeDef {
  id: string;
  resultItemId: string;
  resultQuantity: number;
  materialCosts: { itemId: string; quantity: number }[];
  goldCost: number;
  craftTimeGameDays: number;
}

export interface EquipmentUpgradeDef {
  id: string;
  baseItemId: string;
  fromUpgradeLevel: number;
  toUpgradeLevel: number;
  materialCosts: { itemId: string; quantity: number }[];
  goldCost: number;
  guidedSelectionGoldPremium: number;
}

// ---------------------------------------------------------------------------
// MANOR PASSIVE GENERATION & SCHEDULES
// ---------------------------------------------------------------------------

export interface PassiveGenerationDef {
  companionId: CompanionId;
  producedItemId: string | "GOLD";
  productionIntervalGameDays: number;
  capacity: number;
}

export interface NpcScheduleDef {
  procNpcClassId: string;
  region: Region;
  scheduleByPhase: Partial<Record<DayPhase, string>>;
}

export interface CompanionScheduleDef {
  companionId: CompanionId;
  scheduleByPhase: Partial<Record<DayPhase, string>>;
}

// ---------------------------------------------------------------------------
// FAST TRAVEL / PATHING
// ---------------------------------------------------------------------------

export interface PathEdgeDef {
  id: string;
  fromLocationId: string;
  toLocationId: string;
  travelSegments: number;
  bidirectional: boolean;
  crossesRegionBorder: boolean;
}

// ---------------------------------------------------------------------------
// STATUS EFFECTS
// ---------------------------------------------------------------------------

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
  Shield = "SHIELD",
  Surprised = "SURPRISED",
}

export enum SexualStatusEffectId {
  Shivering = "SHIVERING",
  Sensitized = "SENSITIZED",
  Synchronized = "SYNCHRONIZED",
  Edging = "EDGING",
  TraumaDebuff = "TRAUMA_DEBUFF",
}

export interface StatusEffectInstance {
  effectId: CombatStatusEffectId | SexualStatusEffectId;
  remainingDurationTurns: number;
  magnitude: number;
  stacks: number;
  maxStacks: number;
  sourceSkillOrActId: string;
}

// ---------------------------------------------------------------------------
// MAIN QUEST ACT/CHAPTER
// ---------------------------------------------------------------------------

export interface ChapterDef {
  id: string;
  actNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  chapterNumber: number;
  displayName: string;
  prerequisiteChapterId: string | null;
  associatedQuestIds: string[];
  cutsceneTriggerId?: string;       // plays before the chapter's quest
  aftermathCutsceneId?: string;     // NEW: plays after the chapter's quest completes
  unlocksRegion?: Region;
}

export interface ActDef {
  actNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  displayName: string;
  region: Region;
  chapterIds: string[];
  completionStoryFlag: string;
  astraeaApprovalOnCompletion: number;
}

// ---------------------------------------------------------------------------
// DIALOGUE
// ---------------------------------------------------------------------------

export interface DialogueCondition {
  type: "TRUST_AT_LEAST" | "LOVE_AT_LEAST" | "QUEST_STAGE_AT_LEAST" | "STORY_FLAG_SET" | "STORY_FLAG_UNSET" | "FIRST_TALK";
  value: number | string | boolean;
}

export enum DialogueNodeType {
  Introduction = "INTRODUCTION",
  SmallTalk = "SMALL_TALK",
  Work = "WORK",
  Goodbye = "GOODBYE",
  Generic = "GENERIC", // fallback
  Quest = "QUEST",     // future quest-gated nodes
}

export interface DialogueNodeDef {
  id: string;
  speakerId: string;
  nodeType: DialogueNodeType; // NEW
  text: string;
  conditions: DialogueCondition[];
  responseOptionIds: string[];
  setsStoryFlag?: string;
}

export interface CharacterDialogueTreeDef {
  characterId: CompanionId | string;
  rootNodeIds: string[];
}

export interface GenericNpcDialogueSetDef {
  procNpcClassId: string;
  rootNodeIds: string[];
  introductionNodeId?: string;
}

export interface CutsceneChoiceDef {
  choiceId: string;
  text: string;
  effects?: {
    trustDelta?: number;
    loveDelta?: number;
    storyFlag?: string;
  };
  nextSceneId?: string;
}

export interface CutsceneSceneDef {
  sceneId: string;
  lines: {
    speakerId: string;
    portraitId?: string;
    text: string;
    expression?: string;
  }[];
  choices?: CutsceneChoiceDef[];
}

export interface CutsceneDef {
  id: string;
  title: string;
  locationId: string;
  startingSceneId: string;
  scenes: CutsceneSceneDef[];
}

// ---------------------------------------------------------------------------
// SEXUAL RESPONSE SELECTION
// ---------------------------------------------------------------------------

export interface SexualResponseSelectionContext {
  // Full snapshot of the current scene (includes climax/milk flags)
  sceneState: IntimateEncounterRuntimeState;

  // Resolved definitions based on IDs in sceneState
  currentPosition: PositionDef;
  activeActions: IntimateActionDef[];
  lastAction: IntimateActionDef | null;

  // Participant actors (for stats like arousal, technique, sensitivity)
  playerActor: CharacterActorState;
  partnerActor: CharacterActorState;

  // Seed for deterministic selection
  rngSeed: string;
}


export interface SexualResponseLineDef {
  id: string;                // e.g., "resp_vaginal_missionary_01"
  text: string;
  vocalization: string;
  internalThought?: string;
  bodyResponse?: string;
  expression?: string;
}

export interface BodyResponseFragmentDef {
  id: string;
  poolTier: "MAIN_SIDE_COMMON" | "NPC_COMMON";

  actionGroup: "PENETRATIVE" | "ORAL" | "BREAST" | "SKIN" | "IMPACT" | "TOY" | "FINGERING" | "CLIMAX";

  arousalStateMin?: ArousalState;
  arousalStateMax?: ArousalState;

  // NEW: forced/consent variation
  isForced?: boolean;                  // if defined, matches scene state
  resistanceMin?: number;              // optional resistance range
  resistanceMax?: number;

  priority: number;
  bodyResponseTemplate: string;
}
export interface VocalExpressionFragmentDef {
  id: string;
  poolTier: "MAIN_SIDE_COMMON" | "NPC_COMMON";

  // Trigger factors
  arousalStateMin: ArousalState;
  arousalStateMax?: ArousalState;
  climaxType?: "NORMAL" | "BODY_SHAKING" | "SQUIRTING" | "BODY_SHAKING_SQUIRTING";
  resistanceMin?: number;
  resistanceMax?: number;
  mentalState?: PartnerMentalState;
  isForced?: boolean;

  priority: number;
  vocalizationTemplate: string; // e.g., "Ah... ah... harder!"
  expressionTemplate: string;   // e.g., "Eyes squeezed shut, mouth agape"
}

export interface InternalThoughtFragmentDef {
  id: string;
  poolTier: "MAIN_SIDE_COMMON" | "NPC_COMMON";

  // Must all be present among active actions (categories)
  triggerActionCategories: IntimateActionCategory[];
  // Optional: exactly this set (if true, match only when active categories exactly equal)
  exactMatch?: boolean;

  priority: number;
  internalThoughtTemplate: string; // e.g., "I can feel her tightness around my fingers and her nipples hardening under my thumb."
}

export interface TextFragmentDef {
  id: string;
  poolTier: "MAIN_SIDE_COMMON" | "NPC_COMMON";

  lastActionId: string;                    // match exact last action
  positionId: string;                      // match current position
  arousalStateMin?: ArousalState;
  arousalStateMax?: ArousalState;

  priority: number;
  textTemplate: string;
}

export interface ContinuationTextFragmentDef {
  id: string;
  poolTier: "MAIN_SIDE_COMMON" | "NPC_COMMON";

  actionId: string;                        // match exact additional action
  priority: number;
  continuationTemplate: string;
}

export interface SexualResponseRepository {
  mainSideCommon: {
    bodyResponses: BodyResponseFragmentDef[];
    vocalExpressions: VocalExpressionFragmentDef[];
    internalThoughts: InternalThoughtFragmentDef[];
    texts: TextFragmentDef[];
    continuations: ContinuationTextFragmentDef[];
  };
  npcCommon: {
    bodyResponses: BodyResponseFragmentDef[];
    vocalExpressions: VocalExpressionFragmentDef[];
    internalThoughts: InternalThoughtFragmentDef[];
    texts: TextFragmentDef[];
    continuations: ContinuationTextFragmentDef[];
  };
}