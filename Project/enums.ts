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
    ObsidianBlack = "OBSIDIAN_BLACK",
    Ruddy = "RUDDY",       // reddish-tan, cold climate, heavy labor — for Dwarf
    Crimson = "CRIMSON"    // deep red — for Demon race profiles
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

export enum CockType {
    Straight = "STRAIGHT",
    CurvedUp = "CURVED_UP",
    CurvedDown = "CURVED_DOWN",
    CurvedLeft = "CURVED_LEFT",
    CurvedRight = "CURVED_RIGHT",
    Tapered = "TAPERED",
    Flared = "FLARED",
    Uniform = "UNIFORM",
    Knotted = "KNOTTED",
    Barbed = "BARBED",
    Ridged = "RIDGED",
    Bifurcated = "BIFURCATED"
}

export enum RegionOfOrigin {
    Heartlands = "HEARTLANDS",
    VerdantReach = "VERDANT_REACH",
    StonebackRange = "STONEBACK_RANGE",
    Ashfen = "ASHFEN",
    SunkenCoast = "SUNKEN_COAST",
    AbyssalRealm = "ABYSSAL_REALM",
    CelestialSpire = "CELESTIAL_SPIRE",
    DeepForest = "DEEP_FOREST",
    VolcanicWastes = "VOLCANIC_WASTES",
    FrozenNorth = "FROZEN_NORTH",
    DesertBadlands = "DESERT_BADLANDS",
    CoastalIslands = "COASTAL_ISLANDS"
}

// ─── AGE CATEGORY ───────────────────────────────────────────

export enum AgeBodyCategory {
    Young = "YOUNG",                    // apparent 18-30
    RipeningMilf = "RIPENING_MILF",    // apparent 30-35
    RipeMilf = "RIPE_MILF",            // apparent 35-43
    MatureMilf = "MATURE_MILF",        // apparent 43-50
    OldMilf = "OLD_MILF"               // apparent 50+
}

export enum PetiteCategory {
    Petite = "PETITE",
    NonPetite = "NON_PETITE"
}


// ─── PUBLIC PERSONA ─────────────────────────────────────────
// How the character presents to the world
// What others see and what the character maintains consciously

export enum PublicPersona {
    // Role-based
    Caretaker = "CARETAKER",           // maternal, nurturing, managing others
    Authority = "AUTHORITY",           // commands, leads, expects compliance
    Professional = "PROFESSIONAL",     // composed, capable, task-focused
    Socialite = "SOCIALITE",           // warm, engaging, people-oriented
    Wallflower = "WALLFLOWER",         // quiet, background, avoidant
    Rebel = "REBEL",                   // defiant, provocative, anti-authority
    // Disposition-based
    Cheerful = "CHEERFUL",             // upbeat, approachable, light
    Stoic = "STOIC",                   // controlled, flat affect, unreadable
    Aggressive = "AGGRESSIVE",         // confrontational, dominant, forward
    Meek = "MEEK",                     // deferential, soft-spoken, yielding
    Proud = "PROUD",                   // dignified, self-possessed, above others
    Flirtatious = "FLIRTATIOUS",       // openly suggestive, attention-seeking
    Mysterious = "MYSTERIOUS",         // withholding, cryptic, observed not open
    Innocent = "INNOCENT"              // naive presentation, wide-eyed, unbothered
}

// ─── PRIVATE SELF ───────────────────────────────────────────
// Who they are in unguarded moments
// Not sexual specifically — just the authentic self
// May or may not match public persona

export enum PrivateSelf {
    Lonely = "LONELY",
    Tired = "TIRED",                   // exhausted beneath the performance
    Hungry = "HUNGRY",                 // yearning for something unspecified
    Resentful = "RESENTFUL",          // anger held inward
    Tender = "TENDER",                // soft and caring under hard exterior
    Curious = "CURIOUS",              // genuinely interested, privately exploratory
    Frightened = "FRIGHTENED",        // anxiety beneath composure
    Proud = "PROUD",                  // genuine pride vs performed pride
    Ashamed = "ASHAMED",              // specific private shame
    Desperate = "DESPERATE",          // urgency not shown in public
    Content = "CONTENT",              // genuinely at peace
    Restless = "RESTLESS",            // need for change, friction, stimulation
    Sad = "SAD",                      // grief or loss carried quietly
    Playful = "PLAYFUL",              // lightness hidden under public seriousness
    Needful = "NEEDFUL"               // specific need for connection or touch
}

// ─── HIDDEN DESIRE LEAN ─────────────────────────────────────
// The sexual/emotional direction they actually want
// May be completely opposite to public persona
// May be something they have never acted on
// May be something they have never even consciously acknowledged

export enum HiddenDesireLean {
    // Submission spectrum
    WantsToBeControlled = "WANTS_TO_BE_CONTROLLED",
    WantsToBeOverpowered = "WANTS_TO_BE_OVERPOWERED",
    WantsToObey = "WANTS_TO_OBEY",
    WantsToBePraised = "WANTS_TO_BE_PRAISED",
    WantsToBeTaken = "WANTS_TO_BE_TAKEN",
    WantsToBeUsed = "WANTS_TO_BE_USED",
    WantsToBeDegraded = "WANTS_TO_BE_DEGRADED",
    WantsToBePunished = "WANTS_TO_BE_PUNISHED",
    WantsToBeHurt = "WANTS_TO_BE_HURT",
    WantsToBeFilled = "WANTS_TO_BE_FILLED",
    WantsToBeOwned = "WANTS_TO_BE_OWNED",
    // Dominance spectrum
    WantsToControl = "WANTS_TO_CONTROL",
    WantsToBreak = "WANTS_TO_BREAK",
    WantsToDominate = "WANTS_TO_DOMINATE",
    WantsToWatch = "WANTS_TO_WATCH",
    WantsToTeach = "WANTS_TO_TEACH",
    // Affection spectrum
    WantsToBeHeld = "WANTS_TO_BE_HELD",
    WantsToBeChosen = "WANTS_TO_BE_CHOSEN",
    WantsToBeNoticed = "WANTS_TO_BE_NOTICED",
    WantsToBeNeeded = "WANTS_TO_BE_NEEDED",
    WantsToBeLoved = "WANTS_TO_BE_LOVED",
    WantsToBeKeptSafe = "WANTS_TO_BE_KEPT_SAFE",
    // Experience spectrum
    WantsToLoseControl = "WANTS_TO_LOSE_CONTROL",
    WantsToBeShocked = "WANTS_TO_BE_SHOCKED",
    WantsToBeWatched = "WANTS_TO_BE_WATCHED",
    WantsToSurrender = "WANTS_TO_SURRENDER",
    WantsToBeFreed = "WANTS_TO_BE_FREED",
    // Mixed
    WantsBothControlAndSurrender = "WANTS_BOTH_CONTROL_AND_SURRENDER",
    WantsConnectionThroughPain = "WANTS_CONNECTION_THROUGH_PAIN",
    WantsTrustThroughVulnerability = "WANTS_TRUST_THROUGH_VULNERABILITY"
}

// ─── DESIRE AWARENESS ───────────────────────────────────────
// How conscious is the character of their own hidden desires
// This affects how they respond when those desires are triggered

export enum DesireAwareness {
    Unaware = "UNAWARE",               // does not know this is what they want; body responds before mind does
    Suspected = "SUSPECTED",           // has wondered; not admitted even privately
    Privately_Acknowledged = "PRIVATELY_ACKNOWLEDGED", // knows but has never acted on it
    Accepted = "ACCEPTED",             // knows, has made peace with it, still hidden from others
    Openly_Hidden = "OPENLY_HIDDEN"    // everyone can see it but them
}

// ─── PERSONA GAP ────────────────────────────────────────────
// How large the distance is between public persona and hidden desires
// Large gap = stronger reaction when the gap is bridged
// Small gap = more consistent character throughout

export enum PersonaGap {
    None = "NONE",                     // public persona and hidden desires are aligned
    Slight = "SLIGHT",                 // small discrepancy; mostly consistent
    Moderate = "MODERATE",             // meaningful difference; visible tension
    Large = "LARGE",                   // significant contradiction; denial is active
    Extreme = "EXTREME"                // complete inversion; the persona is armor
}

// ─── TRIGGER SENSITIVITY ────────────────────────────────────
// How easily the hidden desire is triggered / surfaces
// Higher gap + lower awareness + high trigger sensitivity = explosive reaction
// when something finally reaches through the persona

export enum TriggerSensitivity {
    Resistant = "RESISTANT",           // very hard to reach the hidden self
    Low = "LOW",                       // takes sustained effort
    Moderate = "MODERATE",             // responds to deliberate approach
    High = "HIGH",                     // responds to moderate pressure
    HairTrigger = "HAIR_TRIGGER"       // surfaces at the slightest relevant stimulus
}
