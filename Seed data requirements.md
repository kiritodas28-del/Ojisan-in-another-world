Below is the complete, exhaustive seed data audit for **Ojisan in Another World**, updated through schema v9 and the engine specification v3.0.

---

## 1. Characters & NPC Archetypes

| Seed Data Type | Schema Interface / Type | Typical File | Notes |
|---|---|---|---|
| **Player Character Definition** | `PlayerCharacterDef` | `player_character_seed_data.ts` | Kenji's name, appearance, base attributes/vitals, starting equipment/inventory. | - DONE
| **Companions (10)** | `CompanionDef[]` | `companions_seed_data.ts` | All 10 companions with base stats, abilities, move-in requirements, etc. | - DONE
| **Named Story Characters** | `NamedStoryCharacterDef[]` | `named_story_characters_seed_data.ts` | Astraea and any other named non-companion story NPCs. | - DONE
| **Procedural NPC Classes (10)** | `ProcNpcClassDef[]` | `proc_npc_classes_seed_data.ts` | The 10 archetypes for generic NPCs, including appearance rules, passive generation, gender weights. | - DONE
| **Child NPC Class Templates** | `ChildNpcClassDef[]` | `child_npc_classes_seed_data.ts` | Village-child flavor templates. Required for procedural child NPC generation. | - DONE
| **NPC Name Pools** | `Record<GenderId, string[]>` | `npc_name_pools_seed_data.ts` | Gendered name lists for procedural NPC individuation. | - DONE
| **Offspring Vocations** | `VocationDef[]` | `offspring_vocations_seed_data.ts` | Possible vocations for offspring; used when generating `OffspringNpc.vocationId`. | - DONE

---

## 2. Appearance & Body Generation

| Seed Data Type | Schema Interface / Type | Typical File | Notes |
|---|---|---|---|
| **Skin Tones** | `SkinTone[]` | `appearance_options_seed_data.ts` | 9 tones: Very pale, Pale, Fair, Light neutral, Light warm / olive, Medium warm / tan, Medium brown, Deep brown, Deep. | - DONE
| **Pubic Hair Styles** | `PubicHairStyle[]` | `appearance_options_seed_data.ts` | Bare, Landing strip, Neatly trimmed, Natural trimmed, Full natural. | - DONE
| **Underarm Hair Styles** | `UnderarmHairStyle[]` | `appearance_options_seed_data.ts` | Bare, Light stubble, Natural. | - DONE
| **Muscle Presence Levels** | `MusclePresence[]` | `appearance_options_seed_data.ts` | None visible, Faint suggestion, Lightly toned, Clearly toned, Defined, Athletic defined, Muscular. | - DONE
| **Ass Sizes** | `AssSize[]` | `appearance_options_seed_data.ts` | 11 sizes from Small and rounded to Enormous. | - DONE
| **Ass Firmness Levels** | `AssFirmness[]` | `appearance_options_seed_data.ts` | Firm, Soft, Very soft. | - DONE
| **Ass Types** | `AssType[]` + hip-size ranges | `appearance_options_seed_data.ts` | 10 types with synonyms and hip-size ranges. | - DONE
| **Breast Sizes** | `BreastSize[]` | `appearance_options_seed_data.ts` | Barely there to Enormous. |
| **Breast Cup Sizes** | `BreastCupSize[]` | `appearance_options_seed_data.ts` | AA/A, B, C, D, DD/E, DDD/F, G, H, I, J. | - DONE
| **Breast Shapes** | `BreastShape[]` | `appearance_options_seed_data.ts` | Perky, Natural droop, Teardrop, Wide-set, Close-set, Conical, Round, Hanging, Torpedo, Bell-shaped, Side-spread, Forward-projection. |
| **Breast Firmness Levels** | `BreastFirmness[]` | `appearance_options_seed_data.ts` | Firm, Soft, Loose, Fully hanging. | - DONE
| **Height Tags** | `HeightTag[]` + cm ranges | `appearance_options_seed_data.ts` | Very Petite (<150) to Very Tall (178–182). | - DONE
| **Body Shapes** | `BodyShape[]` | `appearance_options_seed_data.ts` | Hourglass, Pear / Triangle, Apple / Round, Rectangle / Straight, Inverted Triangle, Spoon, Diamond, Oval, Athletic, Top Hourglass, Bottom Hourglass, Bell, Lollipop, Cornet. | - DONE
| **Body Categories** | `BodyCategory[]` + aesthetic score + definition | `appearance_options_seed_data.ts` | Ethereal & Delicate, Harmonious & Balanced, Toned & Athletic, Straight & Sleek, Soft & Feminine, Lower-Curve & Exotic, Bottom-Heavy Hourglass, Erotic Bombshell, Fantasy & Hyper-Exotic, Realistically Impossible. | - DONE
| **Hair Styles** | `HairStyle[]` | `appearance_options_seed_data.ts` | All styles from very short to long. | - DONE
| **Hair Colors** | `HairColor[]` | `appearance_options_seed_data.ts` | Natural and unnatural colors. | - DONE
| **Body Shape Measurement Rules** | `Record<BodyShape, BodyShapeMeasurementRule>` | `appearance_options_seed_data.ts` or separate | Maps body shape to typical bust/waist/hip ranges, breast size, ass size, cup size. Used by procedural generation. | - DONE
| **Default NPC Body Type Distribution** | `Partial<Record<BodyShape, number>>` | `game_balance_data.ts` | Default percentages for `GameSettings.npcBodyTypeDistribution`. |  - PENDING

---

## 3. Items & Equipment

| Seed Data Type | Schema Interface | Typical File | Notes |
|---|---|---|---|
| **Items** | `ItemDef[]` | `items_seed_data.ts` | All weapons, armor, clothing, consumables, materials, toys, quest items. | - DONE
| **Crafting Recipes** | `CraftingRecipeDef[]` | `crafting_recipes_seed_data.ts` | Recipes for composite items. | - DONE
| **Equipment Upgrades** | `EquipmentUpgradeDef[]` | `equipment_upgrades_seed_data.ts` | Upgrade paths for upgradable items. | - DONE
| **Loot Tables** | `LootTableDef[]` | `loot_tables_seed_data.ts` | Drop tables for enemies and encounters. | - PENDING

---

## 4. Combat

| Seed Data Type | Schema Interface | Typical File | Notes |
|---|---|---|---|
| **Enemies (templates)** | `EnemyCombatantDef[]` | `enemies_seed_data.ts` | All enemy templates, including bosses, monsters, humanoids. | - DONE
| **Enemy Abilities** | `EnemyAbilityDef[]` | `enemy_abilities_seed_data.ts` | Abilities used by enemies, including sexual attacks. | - DONE
| **Encounters** | `EncounterDef[]` | `encounters_seed_data.ts` | Predefined encounter groups (e.g., boss fights, story battles). | - DONE
| **Boss Scripts** | `BossScriptDef[]` | `boss_scripts_seed_data.ts` | HP-threshold scripts for `BOSS_SCRIPTED` AI. | - DONE
| **Region Monster Profiles** | `RegionMonsterProfile[]` | `region_monster_profiles_seed_data.ts` | Allowed monster types and level ranges per region. | - DONE
| **Monster Growth Multipliers** | `Record<MonsterType, Record<keyof CombatAttributes | "hp", number>>` | `game_balance_data.ts` | Required constant table for level scaling. |  - PENDING

---

## 5. Quests

| Seed Data Type | Schema Interface | Typical File | Notes |
|---|---|---|---|
| **Main Quest Acts** | `ActDef[]` | `main_quest_acts_seed_data.ts` | The 7-act spine. | - DONE
| **Main Quest Chapters** | `ChapterDef[]` | `main_quest_chapters_seed_data.ts` | Chapters within acts, linking to quests. | - DONE
| **Companion Quests (69)** | `QuestDef[]` | `companion_quests_seed_data.ts` | Per-companion chain quests. | - DONE
| **Repeatable Quests (30)** | `QuestDef[]` | `repeatable_quests_seed_data.ts` | Board quests with cooldowns. | - DONE

---

## 6. World Map & Locations

| Seed Data Type | Schema Interface | Typical File | Notes |
|---|---|---|---|
| **Locations** | `LocationDef[]` | `world_map_seed_data.ts` | 81 locations across all regions. | - DONE
| **Path Edges** | `PathEdgeDef[]` | `world_map_seed_data.ts` | 92 edges connecting locations. | - DONE
| **Location Populations** | `LocationPopulationDef[]` | `location_population_seed_data.ts` | NPC spawn counts per location. | - DONE
| **Service NPCs** | `ServiceNpcDef[]` | `service_npcs_seed_data.ts` | Vendors, bankers, innkeepers, quest boards, etc. | - DONE
| **NPC Schedules** | `NpcScheduleDef[]` | `npc_schedules_seed_data.ts` | Per-class schedules for generic NPCs. | - DONE
| **Companion Schedules** | `CompanionScheduleDef[]` | `companion_schedules_seed_data.ts` | Per-companion schedules before move-in. | - DONE

---

## 7. Intimacy

| Seed Data Type | Schema Interface | Typical File | Notes |
|---|---|---|---|
| **Positions** | `PositionDef[]` | `positions_seed_data.ts` | Sexual positions with allowed actions. |  - PENDING
| **Intimate Actions** | `IntimateActionDef[]` | `intimate_actions_seed_data.ts` | All sex actions with stats, item requirements, penetration targets, body part targets, etc. | - PENDING
| **Sexual Response Lines (Main/Side)** | `SexualResponseLineDef[]` | `sexual_response_main_seed_data.ts` | Common pool for companions. | - PENDING
| **Sexual Response Lines (NPC)** | `SexualResponseLineDef[]` | `sexual_response_npc_seed_data.ts` | Pool for generic NPCs. | - PENDING
| **Kinks** | `KinkDef[]` | `kinks_seed_data.ts` | 20 global kinks. | - PENDING
| **Arousal State Thresholds** | `Record<ArousalState, [number, number]>` | `game_balance_data.ts` | Mapping arousal levels to numeric ranges (0-20, 21-40, etc.). | - PENDING

---

## 8. Dialogue

| Seed Data Type | Schema Interface | Typical File | Notes |
|---|---|---|---|
| **Companion Dialogue Trees** | `CharacterDialogueTreeDef[]` + `DialogueNodeDef[]` | `dialogue_companions_seed_data.ts`, `dialogue_companions_expansion_seed_data.ts` | 10 trees, including introduction nodes, quest-gated lines, etc. |  - PENDING
| **Generic NPC Dialogue Sets** | `GenericNpcDialogueSetDef[]` + `DialogueNodeDef[]` | `dialogue_generic_npc_seed_data.ts` | One set per procedural class, including introduction node. | - PENDING
| **Named Story Character Dialogue** | `CharacterDialogueTreeDef[]` + `DialogueNodeDef[]` | `dialogue_astraea_seed_data.ts` etc. | For Astraea and other named NPCs. | - PENDING
| **Character Thoughts** | `CharacterThoughtDef[]` | `character_thoughts_seed_data.ts` | Private reactions to Kenji shown on profile. | - PENDING

---

## 9. Skills

| Seed Data Type | Schema Interface | Typical File | Notes |
|---|---|---|---|
| **Ardor Skill Nodes** | `SkillNodeDef[]` | `skills_seed_data.ts` | All sex skill tree nodes with costs, prerequisites, effect keys. | - DONE
| **Battle Skill Nodes** | `SkillNodeDef[]` | `skills_seed_data.ts` | All combat skill tree nodes. | - DONE

---

## 10. Achievements

| Seed Data Type | Schema Interface | Typical File | Notes |
|---|---|---|---|
| **Achievements** | `AchievementDef[]` | `achievements_seed_data.ts` | All achievements with trigger conditions and rewards. | - DONE

---

## 11. Manor & Passive Generation

| Seed Data Type | Schema Interface | Typical File | Notes |
|---|---|---|---|
| **Companion Passive Generation** | `PassiveGenerationDef[]` | `passive_generation_seed_data.ts` | Per-companion production interval, item, capacity. |  - DONE
| **Manor Tier Constants** | `Record<number, ManorTierConfig>` | `game_balance_data.ts` | Manor tier effects, costs, storage slots. |  - PENDING

---

## 12. Game Balance Constants

These are not strictly seed data but are static configuration values required by engines. They should be defined in `game_balance_data.ts`.

| Constant | Description |
|---|---|
| `BASE_GROWTH_PER_LEVEL` | `{ hp: 6, str: 0.8, agi: 0.6, wis: 0.8, def: 0.6, lck: 0.5 }` |  - PENDING
| `ROLE_MULTIPLIERS` | `Record<CombatRole, Record<keyof CombatAttributes | "hp", number>>` |  - PENDING
| `MONSTER_TYPE_MULTIPLIERS` | `Record<MonsterType, Record<keyof CombatAttributes | "hp", number>>` |  - PENDING
| `PLAYER_GROWTH_VECTOR` | `{ hp: 8, str: 1.0, agi: 0.6, wis: 1.0, def: 0.7, lck: 0.6 }` |  - PENDING
| `SATISFACTION_WEIGHTS` | `{ arousal: 40, tech: 30, kink: 15, sincere: 15 }` |  - PENDING
| `RELATIONSHIP_BANDS` | Thresholds: Low < 0, Neutral 0–39, High 40–79, VeryHigh 80+ |  - PENDING
| `FATIGUE_LEVELS` | Mapping `daysSinceLastSleep` to penalties. | - PENDING
| `ENCOUNTER_CHANCES` | `{ Day: 0.15, Night: 0.225, Midnight: 0.30 }` | - PENDING
| `AP_BP_ACQUISITION` | Base AP/BP rewards per rules. | - PENDING
| `REPUTATION_LEVEL_THRESHOLDS` | Score ranges from -800 to +800. | - PENDING
| `SLEEP_COST` | 20 gold at inn. | - PENDING
| `GIFT_BONUS` | `{ trust: +10, love: +15 }` | - PENDING
| `CONTACT_CAP` | 200 | - PENDING

---

## 13. Summary Count

| Category | Number of Seed Data Types |
|---|---|
| Characters & NPC Archetypes | 7 |
| Appearance & Body Generation | 20 |
| Items & Equipment | 4 |
| Combat | 6 |
| Quests | 4 |
| World Map & Locations | 6 |
| Intimacy | 6 |
| Dialogue | 4 |
| Skills | 2 |
| Achievements | 1 |
| Manor & Passive Generation | 2 |
| Game Balance Constants | 14 |

**Total distinct seed data types: 76** plus balance constants.

---

This list is exhaustive and covers every schema type introduced up to v9, including all appearance options, body shape rules, game settings, NPC generation, and all engine needs.