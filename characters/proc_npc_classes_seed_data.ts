// ============================================================================
// OJISAN IN ANOTHER WORLD — PROCEDURAL NPC CLASS SEED DATA
// The actual data objects behind every procNpcClassId/templateClassId string
// scattered across world_population_seed_data.ts (NpcScheduleDef,
// LocationPopulationDef), dialogue_generic_npc_seed_data.ts
// (GenericNpcDialogueSetDef), and WorldNpcInstance.templateClassId — none of
// which ever pointed at a real ProcNpcClassDef before now, because the type
// didn't exist. Appearance here is archetypal, not a single individual's —
// real spawned WorldNpcInstances vary around this "typical example," the
// same way EnemyCombatantDef gives one stat block per species rather than
// per spawned monster.
//
// FIXED THIS PASS: the first version of this file was missing several
// fields AppearanceDef actually requires (gender, skinType,
// scarsAndTattoos), so it didn't validate against the current schema.
// gender uses GenderId.Varies for the 6 classes whose names don't imply one
// (Commoner, Town Merchant, City Guard, Bandit/Outlaw, Academy Scholar,
// Adventurer/Explorer) and GenderId.Female for the 4 whose names already do
// (High Noble Lady, Temple Priestess, Tavern Courtesan, Farm Girl) — matching
// the established naming rather than contradicting it. bodyDetails and
// racialFeatures stay omitted for all 10, per §19's own note: archetypal
// classes spanning many spawned instances shouldn't be pinned to one
// individual's measurements.
// ============================================================================

import { ProcNpcClassDef, GenderId } from "./schemas";

export const PROC_NPC_CLASSES: ProcNpcClassDef[] = [
  {
    id: "class_commoner",
    displayName: "Commoner",
    description: "Ordinary townsfolk and villagers — the everyday population filling markets, streets, and homes across every region.",
    appearance: {
      heightCm: 165, build: "average, unremarkable",
      gender: GenderId.Varies,
      hairColor: "varies, most commonly brown or black", hairStyle: "simple, practical",
      eyeColor: "varies", skinTone: "varies, typically sun-touched from outdoor life",
      skinType: "varies",
      distinguishingFeatures: ["plain, practical clothing", "no notable marks — deliberately ordinary"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_commoner",
      aestheticSummary: "The face of ordinary life in Eranthis — utterly unremarkable, and that's exactly the point.",
    },
    passiveGenerationItemId: "GOLD",
  },
  {
    id: "class_town_merchant",
    displayName: "Town Merchant",
    description: "Shopkeepers and stall-runners populating every region's bazaars and markets, distinct from Service NPCs — these are flavor and color, not the fixed vendor roster.",
    appearance: {
      heightCm: 170, build: "average, often a touch soft from a sedentary trade",
      gender: GenderId.Varies,
      hairColor: "varies", hairStyle: "neat, presentable",
      eyeColor: "varies", skinTone: "varies",
      skinType: "varies",
      distinguishingFeatures: ["well-kept trade clothes, a step above common wear", "an easy, practiced smile"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_town_merchant",
      aestheticSummary: "Presentable and personable by trade necessity — the sort of face built for making a sale.",
    },
    passiveGenerationItemId: "GOLD",
  },
  {
    id: "class_city_guard",
    displayName: "City Guard",
    description: "Regional watch and garrison soldiers keeping the peace at town squares, gates, and border posts.",
    appearance: {
      heightCm: 178, build: "fit, disciplined",
      gender: GenderId.Varies,
      hairColor: "varies, often cropped short", hairStyle: "regulation-short",
      eyeColor: "varies", skinTone: "varies, often weathered",
      skinType: "varies, often weathered",
      distinguishingFeatures: ["standard-issue armor or uniform", "an alert, watchful bearing"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_city_guard",
      aestheticSummary: "Uniform and posture do most of the talking — steady, watchful, unmistakably on duty.",
    },
    passiveGenerationItemId: "raw_iron_ingot",
  },
  {
    id: "class_high_noble_lady",
    displayName: "High Noble Lady",
    description: "Aristocracy and gentry, concentrated at Auric Court but present wherever old money travels.",
    appearance: {
      heightCm: 168, build: "elegant, poised",
      gender: GenderId.Female,
      hairColor: "varies, often elaborately styled", hairStyle: "ornate, court-appropriate",
      eyeColor: "varies", skinTone: "typically fair, rarely sun-touched",
      skinType: "typically fair, well-kept",
      distinguishingFeatures: ["fine silks and jewelry", "a refined, deliberate way of moving"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_high_noble_lady",
      aestheticSummary: "Every gesture rehearsed into elegance — silk, jewels, and the unmistakable bearing of old money.",
    },
    passiveGenerationItemId: "GOLD",
  },
  {
    id: "class_bandit_outlaw",
    displayName: "Bandit / Outlaw",
    description: "Wilderness threats and roadside opportunists — an interactable-but-hostile class per §5.10, not a random encounter roll.",
    appearance: {
      heightCm: 175, build: "wiry, hardened",
      gender: GenderId.Varies,
      hairColor: "varies", hairStyle: "rough, unkempt",
      eyeColor: "varies", skinTone: "weathered, road-worn",
      skinType: "weathered, road-worn",
      distinguishingFeatures: ["patched leather gear", "a wary, calculating look"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_bandit_outlaw",
      aestheticSummary: "Road-worn and wary, gear patched more than once — someone who's learned to expect trouble before it arrives.",
    },
    passiveGenerationItemId: "raw_leather_scrap",
  },
  {
    id: "class_temple_priestess",
    displayName: "Temple Priestess",
    description: "Astraea's clergy, staffing shrines and sanctuaries from the Verdant Vale's cottage to the Mountain Monastery itself.",
    appearance: {
      heightCm: 165, build: "modest, serene bearing",
      gender: GenderId.Female,
      hairColor: "varies", hairStyle: "simple, often veiled",
      eyeColor: "varies", skinTone: "varies",
      skinType: "varies",
      distinguishingFeatures: ["white or cream ceremonial robes", "a calm, unhurried presence"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_temple_priestess",
      aestheticSummary: "Serenity worn like a second robe — calm, unhurried, and quietly watchful.",
    },
    passiveGenerationItemId: "comp_health_potion",
  },
  {
    id: "class_academy_scholar",
    displayName: "Academy Scholar",
    description: "Aethermoor's researchers and students, found in the Grand Library and Academy Spire.",
    appearance: {
      heightCm: 168, build: "slight, often stooped from years bent over texts",
      gender: GenderId.Varies,
      hairColor: "varies", hairStyle: "simple, sometimes disheveled",
      eyeColor: "varies", skinTone: "pale, indoor-dwelling",
      skinType: "pale, indoor-dwelling",
      distinguishingFeatures: ["ink-stained fingers", "spectacles, common among this class"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_academy_scholar",
      aestheticSummary: "Ink-stained and bookish, the kind of person who forgets to eat when a good text is open.",
    },
    passiveGenerationItemId: "comp_skill_scroll",
  },
  {
    id: "class_tavern_courtesan",
    displayName: "Tavern Courtesan",
    description: "Barmaids and companionable hosts working inns and taverns across every region.",
    appearance: {
      heightCm: 165, build: "alluring, confident",
      gender: GenderId.Female,
      hairColor: "varies", hairStyle: "styled to draw the eye",
      eyeColor: "varies", skinTone: "varies",
      skinType: "varies",
      distinguishingFeatures: ["form-fitting, eye-catching attire", "a warm, inviting demeanor"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_tavern_courtesan",
      aestheticSummary: "Confident and warm by trade, dressed to be noticed and skilled at making that attention feel personal.",
    },
    passiveGenerationItemId: "GOLD",
  },
  {
    id: "class_farm_girl",
    displayName: "Farm Girl",
    description: "Rural workers tending the Vale's wheat farms and the March's border-town fields.",
    appearance: {
      heightCm: 160, build: "wholesome, sturdy from fieldwork",
      gender: GenderId.Female,
      hairColor: "varies, often sun-bleached", hairStyle: "simple braids or ties",
      eyeColor: "varies", skinTone: "sun-kissed, often freckled",
      skinType: "sun-kissed, often freckled",
      distinguishingFeatures: ["simple, practical dress", "dirt-under-the-nails honesty"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_farm_girl",
      aestheticSummary: "Sun-browned and unpretentious — the kind of easy warmth that makes strangers feel instantly welcome.",
    },
    passiveGenerationItemId: "raw_healing_herb",
  },
  {
    id: "class_adventurer_explorer",
    displayName: "Adventurer / Explorer",
    description: "Independent wanderers drawn to ruins, frontiers, and danger — found from the Verdant Vale's meadows to the Sunken Sanctum's crater edge.",
    appearance: {
      heightCm: 172, build: "capable, weathered",
      gender: GenderId.Varies,
      hairColor: "varies", hairStyle: "practical, travel-worn",
      eyeColor: "varies", skinTone: "sun-and-wind-weathered",
      skinType: "sun-and-wind-weathered",
      distinguishingFeatures: ["well-used travel gear", "a confident, restless energy"],
      scarsAndTattoos: [],
      portraitAssetId: "portrait_class_adventurer_explorer",
      aestheticSummary: "Travel-worn gear and restless energy — always look like they're one good rumor away from leaving town again.",
    },
    passiveGenerationItemId: "raw_ardor_crystal",
  },
];
