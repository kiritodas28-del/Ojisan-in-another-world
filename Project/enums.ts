// ============================================================
// FILE: enums.ts
// ============================================================

export enum Gender {
    Male = "MALE",
    Female = "FEMALE"
}

// ─── RACE ───────────────────────────────────────────────────
export enum Race {
    Human = "HUMAN",
    Elf = "ELF",
    HighElf = "HIGH_ELF",
    DarkElf = "DARK_ELF",
    Dwarf = "DWARF",
    Fairy = "FAIRY",
    Orc = "ORC",
    Goblin = "GOBLIN",
    Demon = "DEMON",
    DevilGirl = "DEVIL_GIRL",
    DevilBoy = "DEVIL_BOY",
    Succubus = "SUCCUBUS",
    Incubus = "INCUBUS",
    FoxGirl = "FOX_GIRL",
    FoxBoy = "FOX_BOY",
    WolfGirl = "WOLF_GIRL",
    WolfBoy = "WOLF_BOY",
    CowGirl = "COW_GIRL",
    CowBoy = "COW_BOY",
    DragonGirl = "DRAGON_GIRL",
    DragonBoy = "DRAGON_BOY",
    Goddess = "GODDESS",
    God = "GOD",
    Mixed = "MIXED"
}

// ─── BODY TYPES ─────────────────────────────────────────────
export enum MaleBodyType {
    Androgynous = "ANDROGYNOUS",
    Lean = "LEAN",
    Average = "AVERAGE",
    Athletic = "ATHLETIC",
    Muscular = "MUSCULAR",
    Stocky = "STOCKY",
    Hypermasculine = "HYPERMASCULINE"
}

export enum FemaleBodyType {
    Androgynous = "ANDROGYNOUS",
    PetiteSlim = "PETITE_SLIM",
    PetiteCurvy = "PETITE_CURVY",
    Willowy = "WILLOWY",
    Athletic = "ATHLETIC",
    SlimStraight = "SLIM_STRAIGHT",
    SlimCurvy = "SLIM_CURVY",
    BananaShape = "BANANA_SHAPE",
    PearShape = "PEAR_SHAPE",
    SpoonShape = "SPOON_SHAPE",
    HourglassSlim = "HOURGLASS_SLIM",
    HourglassCurvy = "HOURGLASS_CURVY",
    HourglassFullBust = "HOURGLASS_FULL_BUST",
    TopHeavy = "TOP_HEAVY",
    BottomHeavy = "BOTTOM_HEAVY",
    FullFigured = "FULL_FIGURED",
    Voluptuous = "VOLUPTUOUS",
    Zaftig = "ZAFTIG",
    Rubenesque = "RUBENESQUE",
    AthleticCurvy = "ATHLETIC_CURVY",
    MuscularFeminine = "MUSCULAR_FEMININE",
    PetiteHourglass = "PETITE_HOURGLASS",
    MiniVoluptuous = "MINI_VOLUPTUOUS",
    CompactPower = "COMPACT_POWER"
}

// ─── HEIGHT TAGS ────────────────────────────────────────────
export enum HeightTag {
    VeryShort = "VERY_SHORT",       // <150cm female / <160cm male
    Short = "SHORT",                 // 150-158 / 160-168
    BelowAverage = "BELOW_AVERAGE", // 158-163 / 168-172
    Average = "AVERAGE",            // 163-168 / 172-177
    AboveAverage = "ABOVE_AVERAGE", // 168-173 / 177-182
    Tall = "TALL",                   // 173-180 / 182-190
    VeryTall = "VERY_TALL"          // >180 / >190
}

// ─── SKIN ───────────────────────────────────────────────────
export enum SkinTone {
    Porcelain = "PORCELAIN",
    Ivory = "IVORY",
    Fair = "FAIR",
    Light = "LIGHT",
    LightMedium = "LIGHT_MEDIUM",
    Medium = "MEDIUM",
    MediumTan = "MEDIUM_TAN",
    Tan = "TAN",
    Olive = "OLIVE",
    Golden = "GOLDEN",
    Caramel = "CARAMEL",
    Chestnut = "CHESTNUT",
    Brown = "BROWN",
    DeepBrown = "DEEP_BROWN",
    Ebony = "EBONY",
    // Fantasy
    AshGrey = "ASH_GREY",
    PaleBlue = "PALE_BLUE",
    DeepPurple = "DEEP_PURPLE",
    TealGreen = "TEAL_GREEN",
    GoldenMetallic = "GOLDEN_METALLIC",
    ObsidianBlack = "OBSIDIAN_BLACK"
}

export enum SkinUndertone {
    Warm = "WARM",
    Cool = "COOL",
    Neutral = "NEUTRAL"
}

export enum SkinTexture {
    VerySmooth = "VERY_SMOOTH",
    Smooth = "SMOOTH",
    Normal = "NORMAL",
    Rough = "ROUGH",
    Scarred = "SCARRED",
    Freckled = "FRECKLED",
    Blemished = "BLEMISHED"
}

export enum SkinCondition {
    Clear = "CLEAR",
    Oily = "OILY",
    Dry = "DRY",
    Combination = "COMBINATION"
}

export enum ScarPresence {
    None = "NONE",
    Minor = "MINOR",
    Moderate = "MODERATE",
    Heavy = "HEAVY"
}

export enum ScarLocation {
    None = "NONE",
    Face = "FACE",
    Chest = "CHEST",
    Abdomen = "ABDOMEN",
    Arms = "ARMS",
    Legs = "LEGS",
    Back = "BACK",
    Multiple = "MULTIPLE"
}

export enum TattooPresence {
    None = "NONE",
    Minimal = "MINIMAL",
    Moderate = "MODERATE",
    Heavy = "HEAVY",
    FullBody = "FULL_BODY"
}

export enum BodyOdorProfile {
    Neutral = "NEUTRAL",
    Light = "LIGHT",
    Moderate = "MODERATE",
    Strong = "STRONG",
    Musky = "MUSKY",
    Sweet = "SWEET",
    Earthy = "EARTHY",
    Floral = "FLORAL"
}

export enum SweatResponse {
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH"
}

// ─── FACE ───────────────────────────────────────────────────
export enum FaceShape {
    Oval = "OVAL",
    Round = "ROUND",
    Square = "SQUARE",
    Heart = "HEART",
    Diamond = "DIAMOND",
    Oblong = "OBLONG",
    Triangle = "TRIANGLE"
}

export enum EyeColor {
    Brown = "BROWN",
    DarkBrown = "DARK_BROWN",
    Hazel = "HAZEL",
    Green = "GREEN",
    Blue = "BLUE",
    Grey = "GREY",
    Amber = "AMBER",
    // Fantasy
    Silver = "SILVER",
    Gold = "GOLD",
    Violet = "VIOLET",
    Red = "RED",
    Crimson = "CRIMSON",
    White = "WHITE",
    Black = "BLACK",
    Heterochromia = "HETEROCHROMIA"
}

export enum EyeShape {
    Almond = "ALMOND",
    Round = "ROUND",
    Hooded = "HOODED",
    Monolid = "MONOLID",
    Upturned = "UPTURNED",
    Downturned = "DOWNTURNED",
    Wide = "WIDE",
    Narrow = "NARROW"
}

export enum NoseShape {
    Button = "BUTTON",
    Straight = "STRAIGHT",
    Aquiline = "AQUILINE",
    Snub = "SNUB",
    Wide = "WIDE",
    Narrow = "NARROW",
    Upturned = "UPTURNED",
    Broad = "BROAD"
}

export enum LipFullness {
    Thin = "THIN",
    Moderate = "MODERATE",
    Full = "FULL",
    VeryFull = "VERY_FULL",
    Pouty = "POUTY"
}

export enum LipShape {
    Bow = "BOW",
    Wide = "WIDE",
    Narrow = "NARROW",
    Round = "ROUND",
    Downturned = "DOWNTURNED",
    Upturned = "UPTURNED"
}

export enum JawDefinition {
    Soft = "SOFT",
    Moderate = "MODERATE",
    Defined = "DEFINED",
    Sharp = "SHARP",
    Heavy = "HEAVY"
}

export enum CheekboneProminence {
    Flat = "FLAT",
    Subtle = "SUBTLE",
    Moderate = "MODERATE",
    High = "HIGH",
    VeryHigh = "VERY_HIGH"
}

export enum EyebrowThickness {
    Thin = "THIN",
    Moderate = "MODERATE",
    Thick = "THICK",
    Bushy = "BUSHY"
}

export enum FacialHair {
    None = "NONE",
    Stubble = "STUBBLE",
    ShortBeard = "SHORT_BEARD",
    FullBeard = "FULL_BEARD",
    Mustache = "MUSTACHE",
    Groomed = "GROOMED"
}

// ─── HAIR ───────────────────────────────────────────────────
export enum HairColor {
    Black = "BLACK",
    DarkBrown = "DARK_BROWN",
    Brown = "BROWN",
    LightBrown = "LIGHT_BROWN",
    Blonde = "BLONDE",
    DirtyBlonde = "DIRTY_BLONDE",
    Strawberry = "STRAWBERRY_BLONDE",
    Auburn = "AUBURN",
    Red = "RED",
    Grey = "GREY",
    White = "WHITE",
    Silver = "SILVER",
    Platinum = "PLATINUM",
    Lilac = "LILAC",
    RoseGold = "ROSE_GOLD",
    IcyBlue = "ICY_BLUE",
    ForestGreen = "FOREST_GREEN",
    DeepPurple = "DEEP_PURPLE",
    Crimson = "CRIMSON",
    GoldenWhite = "GOLDEN_WHITE"
}

export enum HairStyle {
    Buzzcut = "BUZZCUT",
    PixieCut = "PIXIE_CUT",
    ShortStraight = "SHORT_STRAIGHT",
    ShortWavy = "SHORT_WAVY",
    ShortCurly = "SHORT_CURLY",
    BowlCut = "BOWL_CUT",
    UndercutShort = "UNDERCUT_SHORT",
    Bob = "BOB",
    Lob = "LOB",
    MediumStraight = "MEDIUM_STRAIGHT",
    MediumWavy = "MEDIUM_WAVY",
    MediumCurly = "MEDIUM_CURLY",
    Shag = "SHAG",
    LongStraight = "LONG_STRAIGHT",
    LongWavy = "LONG_WAVY",
    LongCurly = "LONG_CURLY",
    LongBraided = "LONG_BRAIDED",
    LongBun = "LONG_BUN",
    LongPonytail = "LONG_PONYTAIL",
    LongWithBangs = "LONG_WITH_BANGS",
    Twintails = "TWINTAILS",
    SidePonytail = "SIDE_PONYTAIL",
    HalfUp = "HALF_UP",
    DoubleBun = "DOUBLE_BUN"
}

export enum PubicHairStyle {
    None = "NONE",
    LightTrim = "LIGHT_TRIM",
    Trimmed = "TRIMMED",
    FullNatural = "FULL_NATURAL",
    LandingStrip = "LANDING_STRIP",
    Triangle = "TRIANGLE",
    Stubble = "STUBBLE"
}

export enum ArmpitHairStyle {
    None = "NONE",
    Stubble = "STUBBLE",
    Light = "LIGHT",
    Full = "FULL"
}

// ─── RACE FEATURES ──────────────────────────────────────────
export enum WingType {
    None = "NONE",
    Feathered = "FEATHERED",
    Bat = "BAT",
    Dragon = "DRAGON",
    Insect = "INSECT",
    Demonic = "DEMONIC"
}

export enum TailType {
    None = "NONE",
    Fox = "FOX",
    Wolf = "WOLF",
    Cow = "COW",
    Dragon = "DRAGON",
    Demon = "DEMON",
    Devil = "DEVIL",
    Cat = "CAT"
}

export enum EarType {
    Human = "HUMAN",
    ElvenPointed = "ELVEN_POINTED",
    HighElvenLong = "HIGH_ELVEN_LONG",
    AnimalFox = "ANIMAL_FOX",
    AnimalWolf = "ANIMAL_WOLF",
    AnimalCow = "ANIMAL_COW",
    AnimalCat = "ANIMAL_CAT",
    Demonic = "DEMONIC",
    None = "NONE"
}

export enum HornType {
    None = "NONE",
    SmallNubs = "SMALL_NUBS",
    CurvedRam = "CURVED_RAM",
    StraightPointed = "STRAIGHT_POINTED",
    DragonCurved = "DRAGON_CURVED",
    DemonSpiral = "DEMON_SPIRAL",
    DevilForked = "DEVIL_FORKED",
    ThickBull = "THICK_BULL"
}

export enum CockTextureType {
    Smooth = "SMOOTH",
    Veined = "VEINED",
    HeavilyVeined = "HEAVILY_VEINED",
    Ridged = "RIDGED",
    Knotted = "KNOTTED",
    Barbed = "BARBED",
    Tapered = "TAPERED",
    Flared = "FLARED"
}

// ─── NIPPLE & BREAST ────────────────────────────────────────
export enum NippleType {
    Flat = "FLAT",
    Puffy = "PUFFY",
    Protruding = "PROTRUDING",
    Inverted = "INVERTED",
    LargeProtruding = "LARGE_PROTRUDING",
    Long = "LONG",
    Wide = "WIDE"
}

export enum NippleColor {
    Pink = "PINK",
    LightPink = "LIGHT_PINK",
    Rose = "ROSE",
    Peach = "PEACH",
    Tan = "TAN",
    Brown = "BROWN",
    DarkBrown = "DARK_BROWN",
    DeepBrown = "DEEP_BROWN"
}

export enum BreastShape {
    Round = "ROUND",
    Teardrop = "TEARDROP",
    Conical = "CONICAL",
    Sagging = "SAGGING",
    Pendulous = "PENDULOUS",
    Wide = "WIDE",
    Narrow = "NARROW",
    Perky = "PERKY",
    Athletic = "ATHLETIC"
}

export enum BreastSoftness {
    Firm = "FIRM",
    MediumFirm = "MEDIUM_FIRM",
    Soft = "SOFT",
    VerySoft = "VERY_SOFT",
    Pillowy = "PILLOWY"
}

export enum CupSize {
    AA = "AA", A = "A", B = "B", C = "C", D = "D",
    DD = "DD", E = "E", F = "F", G = "G", H = "H",
    I = "I", J = "J", K = "K"
}

export enum AssShape {
    Flat = "FLAT",
    Round = "ROUND",
    Square = "SQUARE",
    Heart = "HEART",
    Bubble = "BUBBLE",
    Wide = "WIDE",
    Pear = "PEAR"
}

export enum AssSoftness {
    Firm = "FIRM",
    Toned = "TONED",
    Soft = "SOFT",
    VerySoft = "VERY_SOFT",
    Pillowy = "PILLOWY"
}

export enum AssSize {
    Flat = "FLAT",
    Small = "SMALL",
    Moderate = "MODERATE",
    Full = "FULL",
    Large = "LARGE",
    VeryLarge = "VERY_LARGE",
    Massive = "MASSIVE"
}

export enum StomachType {
    Flat = "FLAT",
    Toned = "TONED",
    Soft = "SOFT",
    Rounded = "ROUNDED",
    Pudgy = "PUDGY",
    Plump = "PLUMP"
}

export enum StomachSoftness {
    Hard = "HARD",
    Firm = "FIRM",
    Soft = "SOFT",
    VerySoft = "VERY_SOFT",
    Doughy = "DOUGHY"
}

export enum MuscleTone {
    None = "NONE",
    Soft = "SOFT",
    Light = "LIGHT",
    Toned = "TONED",
    Athletic = "ATHLETIC",
    Defined = "DEFINED",
    Muscular = "MUSCULAR"
}

// ─── ATTRACTIVENESS ─────────────────────────────────────────
export enum MaleAttractiveness {
    Plain = "PLAIN",
    Rugged = "RUGGED",
    Handsome = "HANDSOME",
    Striking = "STRIKING",
    Godlike = "GODLIKE"
}

export enum FemaleAttractiveness {
    Plain = "PLAIN",
    Homely = "HOMELY",
    CutePlain = "CUTE_PLAIN",
    Cute = "CUTE",
    Pretty = "PRETTY",
    Beautiful = "BEAUTIFUL",
    Exotic = "EXOTIC",
    Stunning = "STUNNING",
    Breathtaking = "BREATHTAKING",
    Transcendent = "TRANSCENDENT"
}

// ─── MALE SEXUAL PHYSIOLOGY ─────────────────────────────────
export enum CockSize {
    Small = "SMALL",
    BelowAverage = "BELOW_AVERAGE",
    Average = "AVERAGE",
    AboveAverage = "ABOVE_AVERAGE",
    Large = "LARGE",
    VeryLarge = "VERY_LARGE",
    Massive = "MASSIVE"
}

export enum CockGirth {
    Slim = "SLIM",
    Moderate = "MODERATE",
    Thick = "THICK",
    VeryThick = "VERY_THICK",
    Massive = "MASSIVE"
}

export enum CumVolume {
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH",
    VeryHigh = "VERY_HIGH",
    Excessive = "EXCESSIVE"
}

export enum CumConsistency {
    Watery = "WATERY",
    Thin = "THIN",
    Moderate = "MODERATE",
    Thick = "THICK",
    VeryThick = "VERY_THICK"
}

export enum CumColor {
    Clear = "CLEAR",
    White = "WHITE",
    OffWhite = "OFF_WHITE",
    YellowTinted = "YELLOW_TINTED"
}

export enum BallSize {
    Small = "SMALL",
    Moderate = "MODERATE",
    Large = "LARGE",
    VeryLarge = "VERY_LARGE"
}

export enum RefractoryPeriod {
    VeryShort = "VERY_SHORT",
    Short = "SHORT",
    Moderate = "MODERATE",
    Long = "LONG",
    VeryLong = "VERY_LONG"
}

// ─── FEMALE SEXUAL PHYSIOLOGY ───────────────────────────────
export enum VaginaType {
    Tight = "TIGHT",
    Average = "AVERAGE",
    Loose = "LOOSE"
}

export enum VaginaElasticity {
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH",
    VeryHigh = "VERY_HIGH"
}

export enum WetnessLevel {
    Dry = "DRY",
    Damp = "DAMP",
    Moderate = "MODERATE",
    Wet = "WET",
    VeryWet = "VERY_WET",
    Dripping = "DRIPPING",
    Flooding = "FLOODING"
}

export enum ClitSize {
    Hidden = "HIDDEN",
    Small = "SMALL",
    Moderate = "MODERATE",
    Prominent = "PROMINENT",
    VeryProminent = "VERY_PROMINENT"
}

export enum LabiaType {
    InnerHidden = "INNER_HIDDEN",
    InnerSmall = "INNER_SMALL",
    InnerModerate = "INNER_MODERATE",
    InnerProminent = "INNER_PROMINENT",
    InnerLarge = "INNER_LARGE",
    OuterProminent = "OUTER_PROMINENT"
}

export enum OrgasmType {
    Clitoral = "CLITORAL",
    Vaginal = "VAGINAL",
    Anal = "ANAL",
    Combined = "COMBINED",
    Multiple = "MULTIPLE",
    Squirting = "SQUIRTING",
    Rare = "RARE"
}

export enum OrgasmEase {
    VeryDifficult = "VERY_DIFFICULT",
    Difficult = "DIFFICULT",
    Moderate = "MODERATE",
    Easy = "EASY",
    VeryEasy = "VERY_EASY"
}

export enum ArousalSpeed {
    Slow = "SLOW",
    Moderate = "MODERATE",
    Fast = "FAST",
    VeryFast = "VERY_FAST"
}

export enum LubricationSpeed {
    Slow = "SLOW",
    Moderate = "MODERATE",
    Fast = "FAST",
    VeryFast = "VERY_FAST"
}

export enum PostOrgasmSensitivity {
    Normal = "NORMAL",
    Heightened = "HEIGHTENED",
    Overwhelmed = "OVERWHELMED"
}

export enum FertilityRating {
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH",
    VeryHigh = "VERY_HIGH"
}

// ─── SENSITIVITY ────────────────────────────────────────────
export enum SensitivityLevel {
    None = "NONE",
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH",
    VeryHigh = "VERY_HIGH",
    Extreme = "EXTREME",
    Overwhelming = "OVERWHELMING"
}

// ─── PREGNANCY ──────────────────────────────────────────────
export enum PregnancyStage {
    NotPregnant = "NOT_PREGNANT",
    EarlyFirst = "EARLY_FIRST",
    LateFirst = "LATE_FIRST",
    EarlySecond = "EARLY_SECOND",
    LateSecond = "LATE_SECOND",
    EarlyThird = "EARLY_THIRD",
    LateThird = "LATE_THIRD",
    FullTerm = "FULL_TERM"
}

export enum PregnancyHistory {
    Never = "NEVER",
    Once = "ONCE",
    Multiple = "MULTIPLE"
}

// ─── PERSONALITY ────────────────────────────────────────────
export enum BigFiveLevel {
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH"
}

export enum DominantTrait {
    Shy = "SHY",
    Bold = "BOLD",
    Nurturing = "NURTURING",
    Aggressive = "AGGRESSIVE",
    Curious = "CURIOUS",
    Cold = "COLD",
    Warm = "WARM",
    Proud = "PROUD",
    Submissive = "SUBMISSIVE",
    Dominant = "DOMINANT",
    Playful = "PLAYFUL",
    Melancholic = "MELANCHOLIC",
    Stoic = "STOIC",
    Volatile = "VOLATILE"
}

export enum HumorStyle {
    None = "NONE",
    Dry = "DRY",
    Slapstick = "SLAPSTICK",
    Sarcastic = "SARCASTIC",
    Warm = "WARM",
    Dark = "DARK"
}

export enum EmotionalStability {
    Unstable = "UNSTABLE",
    Volatile = "VOLATILE",
    Moderate = "MODERATE",
    Stable = "STABLE",
    VeryStable = "VERY_STABLE"
}

// ─── SEXUAL PSYCHOLOGY ──────────────────────────────────────
export enum SexualConfidence {
    None = "NONE",
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH",
    VeryHigh = "VERY_HIGH"
}

export enum SexualLean {
    Vanilla = "VANILLA",
    Submissive = "SUBMISSIVE",
    Dominant = "DOMINANT",
    Masochistic = "MASOCHISTIC",
    Sadistic = "SADISTIC",
    Exhibitionist = "EXHIBITIONIST",
    Voyeur = "VOYEUR",
    Mixed = "MIXED"
}

export enum ResistanceProfileType {
    Fight = "FIGHT",
    Freeze = "FREEZE",
    Comply = "COMPLY",
    Enjoy = "ENJOY"
}

export enum VocalTendency {
    Silent = "SILENT",
    Quiet = "QUIET",
    Moderate = "MODERATE",
    Loud = "LOUD",
    VeryLoud = "VERY_LOUD",
    Uncontrollable = "UNCONTROLLABLE"
}

export enum EyeContactTendency {
    Avoids = "AVOIDS",
    Occasional = "OCCASIONAL",
    Maintains = "MAINTAINS",
    Intense = "INTENSE"
}

export enum DirtyTalkTendency {
    None = "NONE",
    ReactiveOnly = "REACTIVE_ONLY",
    Moderate = "MODERATE",
    Frequent = "FREQUENT",
    Constant = "CONSTANT"
}

// ─── SOCIAL PROFILE ─────────────────────────────────────────
export enum TrustBaseline {
    Suspicious = "SUSPICIOUS",
    Cautious = "CAUTIOUS",
    Neutral = "NEUTRAL",
    Open = "OPEN",
    Naive = "NAIVE"
}

export enum LoyaltyLevel {
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH",
    Absolute = "ABSOLUTE"
}

export enum JealousyTendency {
    None = "NONE",
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH"
}

export enum AffectionStyle {
    Physical = "PHYSICAL",
    Verbal = "VERBAL",
    ActsOfService = "ACTS_OF_SERVICE",
    None = "NONE"
}

export enum RelationshipHistory {
    Virgin = "VIRGIN",
    Inexperienced = "INEXPERIENCED",
    Moderate = "MODERATE",
    Experienced = "EXPERIENCED",
    VeryExperienced = "VERY_EXPERIENCED"
}

// ─── BACKGROUND ─────────────────────────────────────────────
export enum SocialClass {
    Slave = "SLAVE",
    Peasant = "PEASANT",
    Commoner = "COMMONER",
    Merchant = "MERCHANT",
    Noble = "NOBLE",
    Royalty = "ROYALTY"
}

// ─── DYNAMIC STATE ──────────────────────────────────────────
export enum MoodValue {
    // Resistance stage
    Defiant = "DEFIANT",
    Fearful = "FEARFUL",
    Resistant = "RESISTANT",
    Disgusted = "DISGUSTED",
    Panicked = "PANICKED",
    // Conflict stage
    Conflicted = "CONFLICTED",
    Confused = "CONFUSED",
    Ashamed = "ASHAMED",
    Flustered = "FLUSTERED",
    SelfBetrayed = "SELF_BETRAYED",
    Reluctant = "RELUCTANT",
    Dissolving = "DISSOLVING",
    // Capitulation stage
    Desperate = "DESPERATE",
    Pleading = "PLEADING",
    Surrendered = "SURRENDERED",
    Lost = "LOST",
    Consumed = "CONSUMED",
    Needy = "NEEDY",
    Craving = "CRAVING",
    Mindless = "MINDLESS",
    // Broken stage
    Broken = "BROKEN",
    Shattered = "SHATTERED",
    Incoherent = "INCOHERENT",
    Hollow = "HOLLOW",
    Undone = "UNDONE",
    Wrecked = "WRECKED",
    Ruined = "RUINED",
    Blank = "BLANK",
    // Post break
    Dazed = "DAZED",
    Empty = "EMPTY",
    Floating = "FLOATING",
    Subspace = "SUBSPACE",
    Numb = "NUMB",
    Compliant = "COMPLIANT",
    Afterglow = "AFTERGLOW",
    Owned = "OWNED",
    // Compound
    AshamedButNeedy = "ASHAMED_BUT_NEEDY",
    FightingButLosing = "FIGHTING_BUT_LOSING",
    HatingButWanting = "HATING_BUT_WANTING",
    ProudButBroken = "PROUD_BUT_BROKEN",
    ScaredButAroused = "SCARED_BUT_AROUSED",
    CryingButCumming = "CRYING_BUT_CUMMING",
    BeggingButHatingSelf = "BEGGING_BUT_HATING_SELF",
    ResistingButGrinding = "RESISTING_BUT_GRINDING",
    DenyingButSoaking = "DENYING_BUT_SOAKING",
    SilentButScreamingInside = "SILENT_BUT_SCREAMING_INSIDE"
}

export enum BondType {
    None = "NONE",
    Transactional = "TRANSACTIONAL",
    Attachment = "ATTACHMENT",
    Dependent = "DEPENDENT",
    Obsession = "OBSESSION",
    Love = "LOVE",
    HateLove = "HATE_LOVE",
    PureHate = "PURE_HATE",
    Broken = "BROKEN",
    Owned = "OWNED",
    Worshipful = "WORSHIPFUL",
    Corrupted = "CORRUPTED",
    Submissive = "SUBMISSIVE",
    Devoted = "DEVOTED"
}

// ─── VOICE ──────────────────────────────────────────────────
export enum VoicePitch {
    VeryLow = "VERY_LOW",
    Low = "LOW",
    Moderate = "MODERATE",
    High = "HIGH",
    VeryHigh = "VERY_HIGH"
}

export enum VoiceTexture {
    Rough = "ROUGH",
    Smooth = "SMOOTH",
    Breathy = "BREATHY",
    Clear = "CLEAR",
    Husky = "HUSKY",
    Soft = "SOFT",
    Melodic = "MELODIC",
    Raspy = "RASPY"
}

// ─── KINKS ──────────────────────────────────────────────────
export enum Kink {
    Bondage = "BONDAGE",
    Impact = "IMPACT",
    Choking = "CHOKING",
    Degradation = "DEGRADATION",
    Praise = "PRAISE",
    Exhibition = "EXHIBITION",
    Voyeurism = "VOYEURISM",
    Roleplay = "ROLEPLAY",
    Lactation = "LACTATION",
    Breeding = "BREEDING",
    Edging = "EDGING",
    Overstimulation = "OVERSTIMULATION",
    Toys = "TOYS",
    Anal = "ANAL",
    Oral = "ORAL",
    Feet = "FEET",
    Creampie = "CREAMPIE",
    PublicRisk = "PUBLIC_RISK",
    SizePlay = "SIZE_PLAY",
    RoughSex = "ROUGH_SEX"
}

// ─── OCCUPATION ─────────────────────────────────────────────
export enum Occupation {
    None = "NONE",
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Thief = "THIEF",
    Priest = "PRIEST",
    Merchant = "MERCHANT",
    Healer = "HEALER",
    Blacksmith = "BLACKSMITH",
    Farmer = "FARMER",
    Noble = "NOBLE",
    Scholar = "SCHOLAR",
    Bard = "BARD",
    Assassin = "ASSASSIN",
    Knight = "KNIGHT",
    Ranger = "RANGER",
    Alchemist = "ALCHEMIST",
    Slave = "SLAVE",
    Innkeeper = "INNKEEPER",
    Guard = "GUARD",
    Adventurer = "ADVENTURER"
}