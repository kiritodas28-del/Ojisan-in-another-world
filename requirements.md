# Ojisan in Another World — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 2026-08-28  
**Status:** Draft for review

---

## 1. Overview

**Ojisan in Another World** is a turn-based erotic RPG that blends tactical combat, relationship building, intimate encounters, and kingdom management. The player controls Player, a character in a fantasy world, as he explores, fights miasma, forms bonds with companions(special named preset NPCs) and NPCs, and ultimately purifies the land.

The game is designed for adult audiences and features consensual and non-consensual sexual content (togglable), deep character progression, and a branching narrative influenced by player choices.

---

## 2. Platform & High-Level Architecture

- **Platform:** Web (desktop and mobile responsive)
- **Frontend:** React-based SPA with modern UI/UX
- **Backend:** Server-authoritative game logic exposed via type-safe APIs
- **Persistence:** Local save files stored on disk, with automatic backup and versioning
- **Architecture principles:** Client sends player intents; server processes them and returns updated game state and narrative. All game rules are deterministic and testable.

---

## 3. Core Gameplay Loop

1. **Explore** the world via a node-based map, moving between locations and triggering encounters.
2. **Combat** turn-based battles against monsters and humanoid enemies; win through damage or purification.
3. **Interact** with NPCs and companions (special named preset NPCs) through dialogue, gifts, flirting, touch, and intimate scenes.
4. **Progress** through main story acts/chapters and side quests; improve Player’s skills and equipment.
5. **Manage** time and resources: day/night cycle, fatigue, manor upgrades, passive generation.
6. **Grow** relationships with companions and generic NPCs; unlock new scenes, move-in options, and offspring.

---

## 4. Feature Catalog

### 4.1 Character Progression & Detailed Character Definition

- Player and all companions have combat attributes (STR, AGI, WIS, DEF, LCK) and erotic attributes (Sensitivity, Technique, Virility for player only).
- Leveling increases combat stats according to class/role multipliers.
- Player can invest points into two skill trees: **Battle** (combat) and **Ardor** (intimacy).
- Passive skills are always active; active skills consume Crest Power (CPW).
- **Character data** is richly detailed, including:
  - **Race & Features**: e.g., human, fox girl, with wings, tail, ears, horns, special features.
  - **Appearance**: skin tone/undertone/condition, face shape/eyes/nose/lips/jaw, hair color/style/pubic/armpit, and body measurements (height, bust, waist, hip, cup size, body type).
  - **Physical Detail**: breast shape/softness, nipple type/color, ass shape/softness, attractiveness.
  - **Sexual Physiology**: vaginal type/elasticity, wetness tracking, clit size, labia type, sensitivity map per body part (nipple, breast, vagina, clit, cervix, womb, ass, lips, tongue, skin, ears), orgasm profile (types, ease, post-sensitivity, squirt/multiple capacity, count), arousal/lubrication speed, fertility, cycle day, pregnancy/lactation history.
  - **Personality**: Big Five traits, dominant/secondary traits, humor style, emotional stability, trust baseline, loyalty, jealousy, affection style, public/private persona, hidden desires, suppression strength and crack threshold.
  - **Sexual Psychology**: sexual confidence, lean, acquired kinks, kink acquisition rate, resistance profile (type, current/baseline resistance, corruption shift threshold, next profile, trauma modifier), corruption/shame, vocal/eye contact/dirty talk tendencies, relationship history.
  - **Voice**: pitch, texture, dirty talk tendency.
  - **Social**: trust baseline, loyalty, jealousy, affection style (some duplication with personality, to be unified in schema).
  - **Background**: social class, occupation, actual/apparent age, trauma presence/severity, region of origin.
  - **History**: prior partner count, total encounter count, acts experienced, pregnancy/lactation history, relationship history.

### 4.2 Combat System

- Turn-based encounters with initiative determined by agility and luck.
- Enemies have AI patterns: aggressive, defensive, support caster, and boss scripted.
- Damage calculation uses weapon power, attacker strength, and defender defense.
- Critical hits based on luck.
- Companions can be downed(similar to player); party wipe leads to recovery at last safe location.
- **Purification**: alternative victory by raising enemy arousal to 100.
- Enemy sexual attacks (if enabled) target based on monster sex and form.
- Miasma(monster specific)/Mana(all non monster characters(npc/companion/player)) Reserve limits enemy/npc/companion/player special attacks. Regenerates with each attack.  
- Defeat outcomes for humanoid enemies include loot, strip-and-loot, interrogation, and more.

### 4.3 Intimacy System

- Full intimate encounter scenes with turn-by-turn interaction.
- Scene start types: consensual, forced, or forced on sleeping target.
- Multiple positions and actions; simultaneous actions allowed with body-part conflict checks.
- Technique checks influence success of sensitive actions.
- **Partner state simulation**: resistance, mental state, and mood evolve during scenes based on actions and relationship context.
  - Resistance profile (fight, freeze, comply, etc.), current resistance, baseline resistance, corruption shift threshold, next profile, trauma modifier.
  - Mental state tracks mood, corruption, shame, broken flag, subspace tracker, afterglow tracker, suppression state, trust with player, attachment, submission to player.
- **Satisfaction score** after each scene affects relationship gains and partner reactions.
- **Kink acquisition**: as per each kink's condition.
- **Kink progression**: repeated actions can trigger partner kinks, adding bonuses; acquired kinks tracked per character.
- **Dynamic narrative responses**: generated from context (TBD granularity of the fragment repository) using a large fragment repository.
- **Physical response tracking**: wetness, pleasure, pain, arousal level, stamina, lactating, clothing state(only to allow/disallow certain actions -eg: penetration cannot happen without vagina exposure), restraint state.

### 4.4 Relationships & Trust/Love

- Relationships are modeled by multiple dimensions: Trust, Attachment, Submission, Love (if reintroduced), plus mental state fields (corruption, shame, broken flag).
- Gift giving, flirting, touching, and dialogue choices modify these relationship metrics.
- Flirt and Touch have daily diminishing returns (max 3 per character per day).
- Move-in eligibility: characters require specific stats requirements.
- Bonding system: bond type and strength track deep relationship milestones.

### 4.5 Reputation System

- Each region has a reputation score from -800 (infamous) to +800 (renowned).
- Negative reputation decays toward zero, daily some amount of reputation decay; positive reputation does not decay.
- Bounty payoffs computed from current score at Bounty Offices.

### 4.6 Quests & Story

- Main quest organized into Acts and Chapters with post-quest and pre-quest cutscenes.
- Side quests: companion quests, repeatable board quests.
- Objectives types: kill, collect, talk, interact, escort, travel.
- Companion quest completion advances their personal stage and unlocks certain(which interaction option : TBD) interaction options.
- Repeatable quests have cooldowns.
- Cutscene system for story moments with player choices that affect flags and relationships.

### 4.7 Time & Day Cycle

- Five phases: Morning, Afternoon, Evening, Night, Midnight.
- Player actions consume phase time; after 15 actions, phase advances.
- Day-end processing at Midnight: reputation decay, pregnancy progression, NPC refresh, crafting/construction resolution, date increment.
- Sleep only at Night/Midnight in safe locations; restores HP/Stamina/CPW and resets fatigue.
- Fatigue penalties increase with days without sleep; forced collapse after 5 days.
- Passive stamina/CPW recovery on phase advance (except before sleep).

### 4.8 Economy & Inventory

- Gold as primary currency; items can be bought, sold, gifted, looted.
- Inventory slots limited (20 base, expandable via manor).
- Stackable items with max stack sizes.
- Quest items do not occupy inventory slots.
- Overflow handling: manual pickup rejected; combat loot auto-converted to gold.

### 4.9 Crafting & Equipment Upgrades

- Crafting unlocks with Artisan's Insight skill and Manor tier 2+.
- Combine raw materials to create composite items.
- Timed crafting jobs resolved at day-end.
- Equipment can be upgraded from +0 to +3.
- Random upgrades at Forge; guided upgrades at Alchemy Lab (tier 4+).

### 4.10 NPC Population & Simulation

- Procedural NPCs spawn per location, refreshed every 3 days.
- Gender and appearance generated from class rules.
- First conversation individuates NPC: assigns name, adds to contact list (cap 400).
- Service NPCs (vendors, innkeepers, quest boards, etc.) are fixed and always present.
- Some protected NPCs have simplified interaction and schedules.
- NPCs follow daily schedules (e.g., home, work, tavern).

### 4.11 Dialogue System

- Branching dialogue trees with conditions - for main quest and acts.
- Generic NPCs share class-level dialogue with introduction node.
- Dialogue choices can set story flags and affect relationships.
- Sexual responses generated dynamically from repository fragments.

### 4.12 Skills & Abilities

- Two skill trees: Battle (combat) and Ardor (intimacy).
- Nodes require prerequisites and points (BP/AP).
- Active skills cost Crest Power (CPW).
- Passive skills always active once purchased.
- Skill effects include damage boosts, heals, status effects, and special intimacy enhancements.
- Special battle skills consume mana.

### 4.13 Status Effects

- Temporary combat and sexual status effects (buffs/debuffs).
- Duration ticks down per turn.
- Stacking refreshes duration and increases stacks up to max.

### 4.14 Achievements

- Unlockable achievements with bronze/silver/gold/platinum tiers.
- Trigger conditions evaluated after key actions.
- Grant AP/BP and titles.

### 4.15 World Map & Travel

- Node-based map with 81 locations connected by 92 edges.
- Standard travel uses shortest path; each segment rolls encounter chance based on time of day.
- Fast travel available to discovered locations, cost based on region crossings.
- Last safe location updated when entering safe zones.

### 4.16 Pregnancy & Offspring

- Pregnancy lasts 12 in-game days.
- Birth happens at day-end when currentWeek >= 12.
- Offspring stats snapshot from parents' combat attributes at birth.
- Offspring alignment randomly assigned (normal/troubled/criminal).
- Offspring may become interactable NPCs in future updates.
- Parentage tracked via parent names (mother/father).

### 4.17 Manor & Base Building

- Manor has 6 tiers, each unlocking new features (storage, suites, crafting, guided upgrades).
- Construction timers decrement at day-end.
- Suites can be assigned to moved-in companions/NPCs.
- Occupants generate passive resources (items or gold) at intervals, collected manually.

### 4.18 Save/Load & Autosave

- Manual save slots with versioned JSON files.
- Autosave occurs every night at Midnight.
- New Game+ requires explicit confirmation.
- Save files validate against current schema; migration functions for older versions.

### 4.19 Contact List & Profiles

- Contact list combines companions and individuated NPCs (max 400).
- Profile view shows name, portrait, race, appearance, Trust/Love, relationship status, stats, kink progress, and current location.
- Virginity, pregnancy, and lactation status displayed.
- Contact list sorted by companion quest stage and relationship magnitude.

### 4.20 Procedural Content Generation

- NPC names generated from gendered pools.
- NPC appearance generated from class-specific rules (body shape, hair, skin, measurements).
- Enemy stats scale by region and monster type.

---

## 5. Non-Functional Requirements

- **Performance:** UI interactions must respond within 100 ms; server processing within 500 ms for typical actions.
- **Scalability:** Save files up to 10 MB should load in under 2 seconds.
- **Accessibility:** Colorblind-friendly UI, adjustable text size.
- **Localization:** English only at launch; architecture supports multiple languages.
- **Adult Content:** All explicit content must be behind toggles; default state is opt-in.
- **Save Integrity:** Atomic writes prevent corruption; autosave is separate from manual saves.

---

## 6. Acceptance Criteria (High-Level)

1. All core features listed above are playable and stable.
2. Combat, intimacy, relationships, and time systems interact without deadlocks.
3. NPC population refreshes correctly and schedules are respected.
4. Contact list never exceeds 400 entries, and it should be configurable.
5. Daily flirt/touch counters reset at day-end.
6. Generic NPC introduction occurs only once.
7. Penetration conflict prevents simultaneous same-cavity actions.
8. Quest log displays active, available, and completed quests accurately.
9. Intimacy eligibility checks reject protected NPCs.
10. Loot vs strip-and-loot produce different results.
11. Sleeping NPC non-con gating works as intended.
12. Satisfaction formula and penalties (stamina exhaustion) are correctly applied.
13. Save/load roundtrip preserves all state without loss.
14. Achievement conditions evaluate correctly post-action.

---

This PRD supersedes previous design documents and serves as the authoritative feature scope for implementation.