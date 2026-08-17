// ============================================================================
// OJISAN IN ANOTHER WORLD — COMPANION SEED DATA
// The 9 remaining CompanionDef entries (Mira's is already in requirements.md
// §9). Closes that line of the §2.2 content-authoring backlog table.
//
// Race assignment uses all 10 non-Goddess Race enum values exactly once,
// matching each companion's already-established aesthetic (Isolde's
// archivist/scholar theme → High Elf; Grael's tusks/forge → Half-Orc; Valka's
// dragonscale/claws → Dragonborn; Seira's silver/moon-silk → Moon Elf;
// Sylvara's bark/nature → Greater Dryad; Reva's dark court aesthetic → Dark
// Elf; Tasha's fox/tri-tail → Kitsune; Sera's wings/penitent → Fallen Angel;
// Lyra's royal/cosmic-tier gate → Divine Half-Blood).
//
// defaultEquipment pulls the exact itemIds already tagged "companion-default:X"
// in items_seed_data.ts — nothing here invents new equipment IDs.
// ============================================================================

import {
  CompanionDef, CompanionId, Race, Region, CombatRole, EquipmentSlot, GenderId,
} from "./schemas";

export const MIRA: CompanionDef = {
  id: CompanionId.Mira,
  displayName: "Mira Ashveil",
  race: Race.Human,
  homeRegion: Region.VerdantVale,
  combatRole: CombatRole.Support,
  appearance: {
    heightCm: 163, build: "soft, gentle, unhurried hourglass figure — a healer's build, not a fighter's",
    gender: GenderId.Female,
    hairColor: "warm auburn", hairStyle: "long, usually braided back and tucked under a plain kerchief while working",
    eyeColor: "warm brown", skinTone: "fair, lightly freckled from hours in the herb garden",
    skinType: "soft, fair, lightly freckled",
    distinguishingFeatures: ["calloused, careful hands from years of herb work"],
    scarsAndTattoos: ["a faint old burn scar along one wrist from an early healing mishap"],
    apparentAge: 24, trueAge: 24,
    bodyDetails: { hasBreasts: true, breastSizeCup: "D", breastShape: "generous, medium-full, naturally high-set", breastSoftness: "soft", breastSagginess: "none", nippleType: "puffy", nippleSize: "medium", waistCm: 64, hipCm: 96, assSize: "full, pillow-soft", assShape: "round, plush", assSoftness: "soft", hasPenis: false },
    portraitAssetId: "portrait_mira_ashveil",
    aestheticSummary: "Unassuming and warm at first glance, with the quiet steadiness of someone who has spent her whole life taking care of others before herself — a soft, generous figure she tends to downplay under practical work clothes.",
  }, // corrected this pass — heightCm/breast size/assSize were undersold relative to the source description ("generous, medium-full" breasts, "wide, pillow-soft hips")
  // Level 1 anchor only — Levels 2+ derive via §4.2's formula using the Support role multiplier.
  baseCombatStatsAtLevel1: { hp: 48, maxHp: 48, str: 5, agi: 7, wis: 12, def: 6, lck: 9 },
  specialAbilityId: "sacred_mend",     // heals 45 HP to all party
  passiveAbilityId: "crest_resonance", // +20% CPW regen for Kenji
  defaultEquipment: {
    [EquipmentSlot.Head]: "white_linen_hood",
    [EquipmentSlot.Body]: "healers_robe",
  },
  questChainId: "mira_chain",
  suiteThemeId: "herbalists_solace",
  moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
  // No kink field — deliberately. Any of the 20 global kinks (§26) can attach to Mira
  // through actual play; nothing here pre-decides which one is "hers."
};

export const ISOLDE: CompanionDef = {
  id: CompanionId.Isolde,
  displayName: "Isolde Vorne",
  race: Race.HighElf,
  homeRegion: Region.Aethermoor,
  combatRole: CombatRole.Artillery,
  appearance: {
    heightCm: 174, build: "elegant, delicate upper torso and narrow shoulders tapering into a dramatically pear-shaped lower body — a slender waist flaring into wide, heavy hips and full, plush thighs",
    gender: GenderId.Female,
    hairColor: "silver-blonde", hairStyle: "usually pinned up in a hurry, a stray quill or pencil often stuck through it",
    eyeColor: "pale violet", skinTone: "porcelain-pale, rarely touched by direct sun",
    skinType: "smooth, cool to the touch",
    distinguishingFeatures: ["long pointed ears (High Elf)", "perpetually ink-stained fingertips", "faint marks at the bridge of her nose from reading glasses"],
    scarsAndTattoos: [],
    apparentAge: 26, trueAge: 142,
    bodyDetails: { hasBreasts: true, breastSizeCup: "B", breastShape: "firm, perky, medium-small", breastSoftness: "firm", breastSagginess: "none", nippleType: "flat", nippleSize: "small", waistCm: 56, hipCm: 104, assSize: "enormous, pear-shaped", assShape: "heavy, dramatically full", assSoftness: "soft, plush", hasPenis: false },
    portraitAssetId: "portrait_isolde_vorne",
    aestheticSummary: "A deliberately deceptive silhouette from the front — slight, scholarly, unassuming — until she turns, revealing a dramatically pear-shaped figure her robes have been quietly disguising the entire time.",
  },
  baseCombatStatsAtLevel1: { hp: 42, maxHp: 42, str: 4, agi: 8, wis: 14, def: 5, lck: 8 },
  specialAbilityId: "arcane_barrage", // AOE WIS-scaled damage to all enemies
  passiveAbilityId: "scholarly_insight", // +10% XP gained by the whole party while she's in partyMemberIds
  defaultEquipment: {
    [EquipmentSlot.MainWeapon]: "wpn_spell_tome",
    [EquipmentSlot.Body]: "arm_archivist_coat",
    [EquipmentSlot.Legs]: "arm_fitted_black_trousers",
    [EquipmentSlot.Feet]: "arm_tall_leather_boots",
    [EquipmentSlot.Underwear]: "clo_lace_panties_isolde",
    [EquipmentSlot.Accessory1]: "arm_arcane_focus_ring",
  },
  questChainId: "isolde_chain",
  suiteThemeId: "archivists_repose",
  moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

export const GRAEL: CompanionDef = {
  id: CompanionId.Grael,
  displayName: "Grael Ironhide",
  race: Race.HalfOrc,
  homeRegion: Region.VerdantVale,
  combatRole: CombatRole.Vanguard,
  appearance: {
    heightCm: 186, build: "tall and powerfully framed through the shoulders and arms from forge work, but her feminine curves run magnificently soft, plush, and voluptuous — no hard muscle in her chest or rear, pure yielding softness there",
    gender: GenderId.Female,
    hairColor: "black, cropped close", hairStyle: "short and practical, singed at the ends from forge work",
    eyeColor: "deep brown", skinTone: "olive-green undertone (Half-Orc), weathered and often soot-streaked",
    skinType: "thick, weathered, calloused across both palms",
    distinguishingFeatures: ["prominent lower tusks (Half-Orc)", "a small old notch missing from one ear"],
    scarsAndTattoos: ["burn scars across both forearms from forge work"],
    apparentAge: 34, trueAge: 34,
    bodyDetails: { hasBreasts: true, breastSizeCup: "D", breastShape: "full, heavy, pillowy", breastSoftness: "soft, pillowy", breastSagginess: "none", nippleType: "puffy", nippleSize: "large", waistCm: 74, hipCm: 108, assSize: "voluptuous", assShape: "massive, plush, rounded", assSoftness: "soft, plush", hasPenis: false },
    racialFeatures: { hasTail: false, hasWings: false, hasHorns: false, hasTusks: true, tuskType: "small, blunt lower tusks, subtler than a full-blooded orc's" },
    portraitAssetId: "portrait_grael_ironhide",
    aestheticSummary: "Strength lives entirely in her shoulders and arms — everywhere else is pure, yielding softness, a contrast she's quietly self-conscious about until someone makes clear they love it.",
  },
  baseCombatStatsAtLevel1: { hp: 62, maxHp: 62, str: 13, agi: 4, wis: 4, def: 12, lck: 5 },
  specialAbilityId: "earthshaker_slam", // heavy single-target STR-scaled damage + brief Stun
  passiveAbilityId: "unbreakable_bond", // party members below 30% HP take -10% incoming damage while she's present
  defaultEquipment: {
    [EquipmentSlot.MainWeapon]: "wpn_great_hammer",
    [EquipmentSlot.OffHand]: "wpn_tower_shield",
    [EquipmentSlot.Head]: "arm_forge_brow_band",
    [EquipmentSlot.Body]: "arm_forge_apron_mail",
    [EquipmentSlot.Legs]: "arm_heavy_work_pants",
    [EquipmentSlot.Feet]: "arm_steel_toed_boots",
    [EquipmentSlot.Hands]: "arm_forge_gauntlets",
  },
  questChainId: "grael_chain",
  suiteThemeId: "forgekeepers_hearth",
  moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

export const VALKA: CompanionDef = {
  id: CompanionId.Valka,
  displayName: "Valka Emberscale",
  race: Race.Dragonborn,
  homeRegion: Region.CrimsonMarch,
  combatRole: CombatRole.Vanguard,
  appearance: {
    heightCm: 185, build: "powerfully built through the shoulders and limbs, a soldier's frame — though her unscaled curves run soft and richly rounded rather than hard",
    gender: GenderId.Female,
    hairColor: "deep crimson-black", hairStyle: "cropped short and severe, practical under a helm",
    eyeColor: "molten amber", skinTone: "fine crimson dragonscale patterning across arms, neck, and cheekbones (Dragonborn)",
    skinType: "fine dragonscale texture, warm to the touch",
    distinguishingFeatures: ["small vestigial horns at her temples"],
    scarsAndTattoos: ["an old battle scar through one eyebrow"],
    apparentAge: 32, trueAge: 38,
    bodyDetails: { hasBreasts: true, breastSizeCup: "D", breastShape: "full, rounded", breastSoftness: "firm, yet plush", breastSagginess: "none", nippleType: "protruding", nippleSize: "medium", waistCm: 70, hipCm: 98, assSize: "full", assShape: "round", assSoftness: "soft", hasPenis: false },
    racialFeatures: { hasTail: true, tailType: "a slender dragon tail, used mostly for balance", hasWings: false, hasHorns: true, hornType: "small vestigial dragon horns at the temples", hasTusks: false },
    portraitAssetId: "portrait_valka_emberscale",
    aestheticSummary: "Carries herself like a blade left permanently unsheathed — scaled crimson skin catching the light like banked embers, everything unscaled beneath it surprisingly soft.",
  },
  baseCombatStatsAtLevel1: { hp: 60, maxHp: 60, str: 14, agi: 6, wis: 5, def: 11, lck: 6 },
  specialAbilityId: "commanders_rally", // Applies PartyAttackUp to all party members
  passiveAbilityId: "draconic_fury", // +15% crit chance when below 50% HP herself
  defaultEquipment: {
    [EquipmentSlot.MainWeapon]: "wpn_crimson_broadsword",
    [EquipmentSlot.OffHand]: "wpn_war_shield",
    [EquipmentSlot.Head]: "arm_dragonscale_war_helm",
    [EquipmentSlot.Body]: "arm_crimson_plate",
    [EquipmentSlot.Legs]: "arm_plate_greaves",
    [EquipmentSlot.Feet]: "arm_war_boots",
    [EquipmentSlot.Hands]: "arm_claws_gauntlets",
  },
  questChainId: "valka_chain",
  suiteThemeId: "wyrmscale_bastion",
  moveInRequirements: { trustAtLeast: 65, loveAtLeast: 60, minQuestStage: 4 },
};

export const SEIRA: CompanionDef = {
  id: CompanionId.Seira,
  displayName: "Seira Moonwhisper",
  race: Race.MoonElf,
  homeRegion: Region.CrimsonMarch,
  combatRole: CombatRole.Rogue,
  appearance: {
    heightCm: 168, build: "lithe and graceful, a dancer's physique carried with soft, elegant curves rather than hard athleticism",
    gender: GenderId.Female,
    hairColor: "silver-white", hairStyle: "long, usually loose or gathered in a simple low tail",
    eyeColor: "pale icy blue", skinTone: "moonlit pale, faintly luminescent under moonlight (Moon Elf)",
    skinType: "smooth, faintly cool, catches moonlight",
    distinguishingFeatures: ["long pointed ears (Moon Elf)", "skin that seems to catch and hold moonlight"],
    scarsAndTattoos: ["a thin scar along one collarbone"],
    apparentAge: 28, trueAge: 165,
    bodyDetails: { hasBreasts: true, breastSizeCup: "C", breastShape: "teardrop, exceptionally soft", breastSoftness: "soft", breastSagginess: "none", nippleType: "puffy", nippleSize: "medium", waistCm: 62, hipCm: 90, assSize: "modest", assShape: "smooth, rounded", assSoftness: "soft", hasPenis: false },
    portraitAssetId: "portrait_seira_moonwhisper",
    aestheticSummary: "Looks carved from moonlight and quiet discipline — soft curves rather than sharp lines, beauty that seems to grow more striking, not less, once the sun goes down.",
  },
  baseCombatStatsAtLevel1: { hp: 46, maxHp: 46, str: 6, agi: 13, wis: 8, def: 6, lck: 9 },
  specialAbilityId: "moonlit_flurry", // multi-hit AGI-scaled attack, bonus damage at Night/Midnight
  passiveAbilityId: "lunar_grace", // +10% dodge chance during Night/Midnight phases
  defaultEquipment: {
    [EquipmentSlot.MainWeapon]: "wpn_elven_short_blades",
    [EquipmentSlot.Head]: "arm_silver_circlet",
    [EquipmentSlot.Body]: "arm_moon_silk_tunic",
    [EquipmentSlot.Legs]: "arm_silver_blue_leggings",
    [EquipmentSlot.Feet]: "arm_silent_boots",
  },
  questChainId: "seira_chain",
  suiteThemeId: "moonlit_pavilion",
  moveInRequirements: { trustAtLeast: 60, loveAtLeast: 65, minQuestStage: 4 },
};

export const SYLVARA: CompanionDef = {
  id: CompanionId.Sylvara,
  displayName: "Sylvara Willowmere",
  race: Race.GreaterDryad,
  homeRegion: Region.WhisperingWood,
  combatRole: CombatRole.Support,
  appearance: {
    heightCm: 175, build: "lush, voluptuous, an unhurried natural fullness echoing the forest's own abundance — nothing willowy or restrained about her",
    gender: GenderId.Female,
    hairColor: "deep moss-green, threaded with small living leaves", hairStyle: "long and untamed, subtly shifting with the seasons",
    eyeColor: "warm amber-gold", skinTone: "pale bark-brown, textured faintly like smooth wood grain (Greater Dryad)",
    skinType: "smooth, bark-textured, warm despite its wood grain",
    distinguishingFeatures: ["fine bark-like markings across her arms and shoulders", "small buds that occasionally sprout at her hairline in spring", "no visible signs of aging at all"],
    scarsAndTattoos: [],
    trueAge: 850, // apparentAge deliberately omitted — ageless, per her own established characterization
    bodyDetails: { hasBreasts: true, breastSizeCup: "D", breastShape: "full, heavy, pillowy", breastSoftness: "soft, pillowy", breastSagginess: "none", nippleType: "flat", nippleSize: "large", waistCm: 66, hipCm: 100, assSize: "voluptuous, enormous", assShape: "full, rounded", assSoftness: "soft, plush", hasPenis: false },
    portraitAssetId: "portrait_sylvara_willowmere",
    aestheticSummary: "Ageless and abundant at once — lush curves that seem to echo the forest's own unhurried fullness, centuries settled quietly behind warm gold eyes.",
  },
  baseCombatStatsAtLevel1: { hp: 46, maxHp: 46, str: 4, agi: 6, wis: 13, def: 6, lck: 8 },
  specialAbilityId: "natures_embrace", // heals + cleanses one negative status effect from a party member
  passiveAbilityId: "regrowth_aura", // +5 HP regen per turn to the whole party in combat
  defaultEquipment: {
    [EquipmentSlot.MainWeapon]: "wpn_living_branch_staff",
    [EquipmentSlot.Head]: "clo_living_flower_crown",
    [EquipmentSlot.Body]: "clo_bark_leaf_wrap",
    [EquipmentSlot.Accessory1]: "clo_seed_core_pendant",
  },
  questChainId: "sylvara_chain",
  suiteThemeId: "verdant_bower",
  moveInRequirements: { trustAtLeast: 60, loveAtLeast: 60, minQuestStage: 4 },
};

export const REVA: CompanionDef = {
  id: CompanionId.Reva,
  displayName: "Reva Nightshade",
  race: Race.DarkElf,
  homeRegion: Region.AuricCourt,
  combatRole: CombatRole.Rogue,
  appearance: {
    heightCm: 170, build: "an impeccably engineered hourglass figure — held tight and severe in court corsets publicly, revealing a plush, soft, curvaceous body privately",
    gender: GenderId.Female,
    hairColor: "raven black", hairStyle: "sleek, often elaborately pinned for Court functions",
    eyeColor: "deep violet", skinTone: "cool gray-violet undertone (Dark Elf)",
    skinType: "smooth, cool to the touch",
    distinguishingFeatures: ["long pointed ears (Dark Elf)", "a carefully composed expression that rarely slips"],
    scarsAndTattoos: ["a small hidden scar behind one ear from her handler's training"],
    apparentAge: 29, trueAge: 156,
    bodyDetails: { hasBreasts: true, breastSizeCup: "D", breastShape: "full, heavy", breastSoftness: "soft, wonderfully soft", breastSagginess: "none", nippleType: "flat", nippleSize: "medium", waistCm: 56, hipCm: 100, assSize: "voluptuous", assShape: "generously rounded, plush", assSoftness: "soft, plush", hasPenis: false },
    portraitAssetId: "portrait_reva_nightshade",
    aestheticSummary: "A corseted mask of severe elegance in public that gives way, privately, to a plush and generously curved softness — the same duality her carefully composed expression hides.",
  },
  baseCombatStatsAtLevel1: { hp: 44, maxHp: 44, str: 5, agi: 12, wis: 8, def: 5, lck: 11 },
  specialAbilityId: "poison_kiss", // single-target attack applying a DamageOverTime-style status
  passiveAbilityId: "court_whispers", // +10% gold from all loot while she's in partyMemberIds
  defaultEquipment: {
    [EquipmentSlot.MainWeapon]: "wpn_poison_hatpin",
    [EquipmentSlot.Head]: "clo_court_jewel_tiara",
    [EquipmentSlot.Body]: "clo_brocade_gown",
    [EquipmentSlot.Legs]: "clo_silk_underskirt_reva",
    [EquipmentSlot.Feet]: "clo_high_heeled_slippers",
    [EquipmentSlot.Hands]: "clo_long_dark_gloves",
  },
  questChainId: "reva_chain",
  suiteThemeId: "shadowed_boudoir",
  moveInRequirements: { trustAtLeast: 70, loveAtLeast: 60, minQuestStage: 4 }, // higher Trust bar — matches her guarded, secret-keeping characterization
};

export const TASHA: CompanionDef = {
  id: CompanionId.Tasha,
  displayName: "Tasha Kitsu",
  race: Race.Kitsune,
  homeRegion: Region.Aethermoor, // itinerant merchant — based out of Aethermoor's Merchant Bazaar
  combatRole: CombatRole.Rogue,
  appearance: {
    heightCm: 158, build: "petite, compact, and deliciously curvy — a voluptuous hourglass in miniature",
    gender: GenderId.Female,
    hairColor: "bright auburn-orange", hairStyle: "loose and wild, tied back only while working",
    eyeColor: "amber, faintly fox-slitted", skinTone: "warm tan from a life spent on the road",
    skinType: "smooth, warm-toned, faintly fur-tufted at the ear and tail bases",
    distinguishingFeatures: ["two fox ears atop her head (Kitsune)", "a small scatter of freckles across her nose"],
    scarsAndTattoos: [],
    apparentAge: 23, trueAge: 210,
    bodyDetails: { hasBreasts: true, breastSizeCup: "D", breastShape: "generous, round", breastSoftness: "soft", breastSagginess: "none", nippleType: "puffy", nippleSize: "medium", waistCm: 56, hipCm: 94, assSize: "plush, full", assShape: "round, bouncy", assSoftness: "soft, plush", hasPenis: false },
    racialFeatures: { hasTail: true, tailType: "three fox tails, fur-tufted and expressive", hasWings: false, hasHorns: false, hasTusks: false },
    portraitAssetId: "portrait_tasha_kitsu",
    aestheticSummary: "A voluptuous hourglass packed into a small, quick frame — tails always mid-swish, the kind of face that makes you check your coin purse and smile about it anyway.",
  },
  baseCombatStatsAtLevel1: { hp: 45, maxHp: 45, str: 5, agi: 12, wis: 7, def: 5, lck: 12 },
  specialAbilityId: "trickster_barrage", // multi-hit attack with escalating crit chance per hit
  passiveAbilityId: "fortune_favor", // +10% LCK-derived crit chance for the whole party
  defaultEquipment: {
    [EquipmentSlot.MainWeapon]: "wpn_fan_blades",
    [EquipmentSlot.Body]: "clo_embroidered_travel_vest",
    [EquipmentSlot.Legs]: "clo_layered_travel_skirt",
    [EquipmentSlot.Feet]: "arm_split_toe_boots",
    [EquipmentSlot.Accessory1]: "clo_fox_ear_ribbons",
    [EquipmentSlot.Accessory2]: "clo_gold_merchant_rings",
  },
  questChainId: "tasha_chain",
  suiteThemeId: "wandering_den",
  moveInRequirements: { trustAtLeast: 55, loveAtLeast: 60, minQuestStage: 4 }, // slightly lower — matches her easygoing, quick-to-warm characterization
};

export const SERA: CompanionDef = {
  id: CompanionId.Sera,
  displayName: "Sera Lightwing",
  race: Race.FallenAngel,
  homeRegion: Region.MountainMonastery,
  combatRole: CombatRole.Artillery,
  appearance: {
    heightCm: 172, build: "ethereal, statuesque, and breathtakingly curvaceous — a divine silhouette blessed with divine softness",
    gender: GenderId.Female,
    hairColor: "pale silver-white", hairStyle: "long, usually braided simply or kept beneath a veil",
    eyeColor: "pale ash-gray", skinTone: "ashen pale, faintly cool to the touch",
    skinType: "smooth, ashen-pale, faintly cool",
    distinguishingFeatures: ["a solemn, watchful stillness to her expression"],
    scarsAndTattoos: ["faint old scarring along both shoulder blades where the wings meet"],
    apparentAge: 27, trueAge: 480,
    bodyDetails: { hasBreasts: true, breastSizeCup: "D", breastShape: "exceptionally large, heavenly soft", breastSoftness: "soft", breastSagginess: "none", nippleType: "puffy", nippleSize: "medium", waistCm: 63, hipCm: 92, assSize: "opulent, plush", assShape: "perfectly rounded", assSoftness: "soft", hasPenis: false },
    racialFeatures: { hasTail: false, hasWings: true, wingType: "large feathered wings, once radiant white, now streaked with ash-gray from her fall", hasHorns: false, hasTusks: false },
    portraitAssetId: "portrait_sera_lightwing",
    aestheticSummary: "Carries her fall visibly in ash-streaked wings and a watchful stillness — a divine silhouette of breathtaking, generous softness, beautiful the way old grief can be, quietly, without asking for pity.",
  },
  baseCombatStatsAtLevel1: { hp: 44, maxHp: 44, str: 6, agi: 8, wis: 11, def: 6, lck: 7 },
  specialAbilityId: "holy_lance_strike", // single-target attack, bonus damage vs. MiasmaCorrupted (matches Empathic Strike's pattern, §22.2)
  passiveAbilityId: "penitents_ward", // Passive: +10% Shield-effect potency for the whole party
  defaultEquipment: {
    [EquipmentSlot.MainWeapon]: "wpn_light_lance",
    [EquipmentSlot.Head]: "arm_white_penitent_veil",
    [EquipmentSlot.Body]: "arm_mourning_vestment",
    [EquipmentSlot.Underwear]: "clo_white_silk_underdress_sera",
    [EquipmentSlot.Accessory1]: "clo_feather_charm",
  },
  questChainId: "sera_chain",
  suiteThemeId: "penitents_sanctum",
  moveInRequirements: { trustAtLeast: 65, loveAtLeast: 65, minQuestStage: 4 },
};

export const LYRA: CompanionDef = {
  id: CompanionId.Lyra,
  displayName: "Lyra Astralis",
  race: Race.DivineHalfBlood,
  homeRegion: Region.AuricCourt,
  combatRole: CombatRole.Support,
  appearance: {
    heightCm: 163, build: "petite and delicately framed, carrying breathtaking, soft curves rather than height or hard edges",
    gender: GenderId.Female,
    hairColor: "luminous gold", hairStyle: "long, elaborately styled for Court though she prefers it loose in private",
    eyeColor: "glowing pale gold", skinTone: "warm golden undertone with a faint, constant inner glow (Divine Half-Blood)",
    skinType: "smooth, warm golden undertone with a faint inner glow",
    distinguishingFeatures: ["a faint halo-like luminescence that brightens with strong emotion", "delicate divine sigils that surface faintly along her collarbone in dim light", "a warmth to her presence that's felt before she's seen"],
    scarsAndTattoos: [],
    apparentAge: 25, trueAge: 340,
    bodyDetails: { hasBreasts: true, breastSizeCup: "C", breastShape: "medium-full, rounded", breastSoftness: "remarkably soft", breastSagginess: "none", nippleType: "puffy", nippleSize: "medium", waistCm: 58, hipCm: 92, assSize: "plush, full", assShape: "rounded, soft", assSoftness: "soft", hasPenis: false },
    portraitAssetId: "portrait_lyra_astralis",
    aestheticSummary: "Delicate and petite at a glance, until her genuinely soft, richly proportioned curves make clear that smallness was never the same thing as slightness.",
  },
  baseCombatStatsAtLevel1: { hp: 45, maxHp: 45, str: 4, agi: 6, wis: 14, def: 6, lck: 8 },
  specialAbilityId: "divine_judgment", // AOE holy WIS-scaled damage, stronger than Ardent Pulse (§22.2)
  passiveAbilityId: "empathic_link", // Passive: whole party's post-scene Trust/Love gains +10% (stacks multiplicatively with Afterglow Master, §22.1)
  defaultEquipment: {
    [EquipmentSlot.MainWeapon]: "wpn_divine_rod",
    [EquipmentSlot.OffHand]: "wpn_empathic_barrier",
    [EquipmentSlot.Head]: "clo_sigil_hair_ribbon",
    [EquipmentSlot.Body]: "clo_royal_ward_gown",
    [EquipmentSlot.Legs]: "clo_silk_underdress_lyra",
    [EquipmentSlot.Feet]: "clo_court_slippers",
    [EquipmentSlot.Hands]: "clo_white_silk_gloves",
  },
  questChainId: "lyra_chain",
  suiteThemeId: "celestial_solarium",
  moveInRequirements: { trustAtLeast: 70, loveAtLeast: 70, minQuestStage: 4 }, // highest bar — matches her cosmic-tier/divine-contact gating elsewhere (§22.1)
};

export const ALL_COMPANIONS: CompanionDef[] = [
  ISOLDE, GRAEL, VALKA, SEIRA, SYLVARA, REVA, TASHA, SERA, LYRA,
  // Mira is not re-exported here — her canonical CompanionDef lives in requirements.md §9
];
