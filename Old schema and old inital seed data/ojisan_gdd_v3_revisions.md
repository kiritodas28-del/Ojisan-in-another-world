# 🏯 OJISAN IN ANOTHER WORLD — Master Game Design Document (v3.1)

> *"A middle-aged man with nothing left to lose. A goddess with everything to gain. A world that was waiting for exactly him."*

> **v3.1 Revision Changelog:**
> - **Isolde Residence Consolidation (§4.2, §6.2):** Unified naming to Archivist's Haven for both her pre-move-in Library quarters and her post-move-in Manor suite.
> - **Divine Conception Formula (§15.1):** Resolved Astraea's fertility modifier with a dedicated post-Act 7 formula and Divine Scion gestation path.
> - **Discount Stacking Clarification (§16.3):** Shop discount sources take the highest single applicable value rather than summing; hard floor added.
> - **Offspring Alignment System (§15.3):** Special Offspring NPCs now roll an Alignment outcome at coming-of-age, opening Troubled and Criminal Path branches alongside the original Heroic Vocation path.
> - **Permanent Removal (§10.2):** New sixth Defeat Outcome Menu option; restricted from all named/story-critical characters.
> - **Expanded Oral Position Set (§13.1):** Six new Position Matrix entries added for partner-giving, player-receiving oral and manual acts.

---
---

# 4.2 ISOLDE VORNE — RESIDENCE UPDATE

```
╔══════════════════════════════════════════════════════════════════════╗
║  ISOLDE VORNE — ARCHIVIST'S HAVEN                                    ║
║  Location: Aethermoor Grand Library 3F ── Ardor Manor North Wing     ║
╚══════════════════════════════════════════════════════════════════════╝
```

- **Home & Schedule:** Morning: Archives. Afternoon: Spire Lecture Hall. Evening: Library desk. Night: Archivist's Haven.
- **Move-In:** Trust ≥ 60, Love ≥ 60, empty room at Ardor Manor. Suite Theme: *Archivist's Haven* (bookshelves, velvet reading couch, private desk, soft rugs) — she recreates the same sanctuary at the Manor rather than leaving it behind.

### Updated §6.2 Residence Table Entry

| Character | Home Residence | Coordinates / Location | Access Rules |
|---|---|---|---|
| **Isolde** | **Archivist's Haven** | Aethermoor Grand Library 3F → Ardor Manor North Wing | Requires Library Pass / Stage 2 |

---
---

# 15.1 INSEMINATION & CONCEPTION MECHANICS — DIVINE FORMULA ADDED

$$\text{Conception \%} = \text{Base Fertile Cycle (10–40\%)} + \text{Crest Bonus (15–30\%)} + (\text{Loads} \times 1.5) + \text{Racial Mod}$$

- **Racial Fertility Modifiers:** Human (+10%), Half-Orc (+15%), Dryad (+15%), High Elf (-10%), Dragonborn (+5%), Moon Elf (-5%), Kitsune (+5%), Fallen Angel (-10%), **Goddess (Divine Formula — see below).**

### Astraea's Divine Conception Formula (Act 7+)

Astraea is not eligible under the standard formula until the **Act 7, Chapter 3 ("Union with the Goddess")** flag triggers. Earlier visions and touches (Acts 3–6) carry **0% conception chance** — she is not yet physically present in conceivable form.

$$\text{Divine Conception \%} = \text{Base 25\%} + (\text{Astraea Approval} \div 2) + \text{Crest Resonance Bonus (+20\% if unlocked)}$$

- At 100 Astraea Approval: 75% base rate before Crest Resonance.
- **Eternal Seed of Ardor** (Tier 4 Sex Skill) is required for conception to occur at all. Without it, the Act 7 union still completes narratively and unlocks *Goddess's First Dawn*, but no pregnancy results — the achievement and the pregnancy are independent triggers.
- **Gestation:** Skips the standard 3-trimester structure (§15.2). Resolves in a single **Celestial Gestation** cutscene at the start of New Game+ or Endless Sandbox Mode. The **Divine Scion** inherits both Astraea's and Kenji's Crest lineages, with dialogue acknowledging dual divine/mortal heritage.

---
---

# 16.3 LOWERING INFAMY & MANAGING DISCOUNTS (REVISED)

- **Ways to Lower Regional Infamy:** *(unchanged — see original §16.3)*
- **Shop Discount Rule:** Renown tier discounts and Achievement-granted discounts do **not** stack additively. A character's effective discount is always the single **highest** applicable value among all active sources.
  - Renown Level 4 (*Living Legend*): -20%.
  - Achievement *Saint of Eranthis* (requires Level 5 Renown in all six regions): -25%, supersedes the Renown discount it's built on.
  - **Hard Floor:** No combination of discount sources may reduce a shop price below **-30% of base**, regardless of future additions (court connections, merchant network bonuses, etc.).
- **Gold-Income Bonuses:** Remain additive with each other, since they draw from a separate pool than pricing (e.g. Tasha's *Merchant's Fortune* +25% loot, and the *Father of the Realm* Nursery Blessing +10% gold both apply independently).

---
---

# 15.3 SPECIAL OFFSPRING NPCS — ALIGNMENT & WORLD ROLES (EXPANDED)

## Coming-of-Age Alignment Roll

```
╔══════════════════════════════════════════════════════════════════════╗
║               OFFSPRING ALIGNMENT ROLL (COMING-OF-AGE)                ║
╚══════════════════════════════════════════════════════════════════════╝
```

Not every offspring follows a Heroic Vocation. At the coming-of-age event, an Alignment Roll determines their standing toward the wider world (familial Trust/Love toward Kenji remains high by default per the original rules, and is tracked separately):

| Roll Outcome | Weight | Resulting Path |
|---|---|---|
| **Heroic Vocation** | 55% base | Academy Scholar, Garrison Knight, Forge Master, Shrine Priestess, Traveling Merchant, etc. (original §15.3 roles). |
| **Troubled Drifter** | 25% base | Mercenary, gambler, smuggler, or wandering duelist. Morally grey; takes quests from Renown- or Infamy-aligned questgivers alike. |
| **Criminal Path** | 20% base, +2% per Infamy Tier active in their home region at coming-of-age | Joins a bandit crew, cult remnant cell, or smuggling ring. Can appear as a named enemy combatant in world encounters, including as a miniboss in Repeatable World Quests. |

- **Modifiers:** High regional Infamy (Level 3+) at coming-of-age raises Criminal Path odds. High Astraea Approval lowers it.
- **Redemption:** Criminal Path offspring are never irredeemable, consistent with §10.3.5 (NPC state is never permanent). A 3-stage redemption subquest (shorter than a companion's 7-stage chain) resolves their arc and returns them to Trusted standing.

## Universal Interaction Menu — Offspring Applicability

| Action | Available to Offspring |
|---|---|
| `[T]` Talk | Yes — includes Alignment-specific dialogue for Troubled/Criminal offspring. |
| `[G]` Gift | Yes — can raise a Criminal Path offspring's Trust like any NPC. |
| `[R]` Trade | Yes — vocation-specific goods (e.g. a smuggler offspring stocks black-market items). |
| `[I]` Inspect | Yes. |
| `[V]` Inventory | Yes, if recruited as household/companion-adjacent in Endless Sandbox Mode. |
| `[H]` Touch | Yes — non-sexual affection only (embrace, hand on shoulder, hair ruffle), consistent with a parent-child bond. |
| `[C]` Command | Yes, if allied in combat. |
| `[B]` Battle / Duel | Yes — Criminal Path offspring fight as genuine hostiles; Heroic/Neutral offspring spar like companions (§10.2). |
| `[M]` Move-In Invitation | Yes, for Heroic/redeemed offspring — dedicated guest rooms adjacent to the Nursery wing, not Companion Suites. |
| `[X]` Intimate / Sex | **No.** Disabled for all offspring regardless of Alignment, Trust, Love, or age. |
| Defeat Option `[5]` Force Intimacy | **No.** The Defeat Outcome Menu for any offspring — Criminal Path included — only ever presents `[1]`–`[4]` and `[6]` (see §10.2 below). |

---
---

# 10.2 DEFEAT OUTCOME MENU — PERMANENT REMOVAL ADDED

```
╔══════════════════════════════════════════════════════════════════════╗
║                        NPC DEFEATED: WHAT TO DO?                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  [1] Spare & Release   (Trust +10, Renown +5)                        ║
║  [2] Hand Over to Guard (Claim Bounty Gold, Renown +15)              ║
║  [3] Interrogate       (Extract Lore / Hidden Map Markers)           ║
║  [4] Strip & Loot      (Take all equipment & inventory items)        ║
║  [5] Force Intimacy    (Non-Consensual / Rape Act)                   ║
║  [6] Permanently Remove (Execute — NPC deleted from the world)       ║
╚══════════════════════════════════════════════════════════════════════╝
```

- **Effect:** Kills and permanently deletes the NPC from all bounty boards, world-state trackers, and future encounter tables. No revival, no reconciliation route — the only irreversible outcome in the menu.
- **Reputation:** Follows the Innocent/Outlaw split (§10.3.1). Outlaws, bandits, and cultists carry no Infamy penalty. Killing an Innocent Citizen, Merchant, or Guard this way spikes Infamy by **+2 Tiers immediately**, rather than the standard +1 Tier applied to lesser offenses.

### Availability Restrictions

| Target Category | `[6]` Available? |
|---|---|
| Random/procedural hostile NPCs (bandits, mercenaries, monsters, cultist mooks) | Yes |
| The 10 named Companions, any Stage or relationship state | No |
| Special Offspring NPCs, including Criminal Path | No |
| Story/Quest NPCs required for Main Quest continuity | No |
| Astraea | No |

The option does not appear in the menu at all against a restricted target — it is not offered and then blocked, it simply isn't there.

---
---

# 13.1 POSITION MATRIX — EXPANDED ORAL & MANUAL SET

The following six positions join the original 12 (§13.1), covering partner-giving, player-receiving oral and manual acts by posture:

| Position | Mechanics & Modifiers | Description & Best Suited Partners |
|---|---|---|
| **Seated Handjob** | Lowest STM cost in the matrix. Slow Arousal build. Partner TEC scales pacing bonus. | Kenji seated, partner using her hand(s). Often an opening move before escalating. Any partner; Mira and Sera as an unhurried entry point. |
| **Seated Blowjob** | Moderate-high Arousal gain. Partner Arousal +10%. TEC check success grants Kenji a burst. | Kenji seated, partner kneeling between his legs. Reva, Valka, Isolde, Tasha — assertive partners default here. |
| **Seated Deepthroat** | Requires partner Trust ≥ 50. Highest sustained Arousal rate of the oral set. Partner Stamina drains faster; scene should rotate after a few turns. | Partner takes him fully, braced on his thighs. Isolde and Reva's surrender arcs make this narratively apt at Stage 4+. |
| **Lying Throatfuck** | Very high Arousal ramp. Kenji controls pace directly; Command actions carry extra weight here. Minimal Arousal gain for partner — Kenji-focused position. | Partner lies back, head at the bed's edge, tilted back; Kenji stands or kneels over her. Rougher, dominance-leaning. Valka and Reva given their established kink triggers (§4.4, §4.7). |
| **Standing Blowjob** | Requires Kenji STR 14+ (baseline, always met). Solid Arousal gain both ways with Grip and Release active. | Kenji stands, hand in partner's hair; partner kneels. Grael's size-contrast dynamic, Sylvara's outdoor scenes. |
| **Tri-Tail Blowjob** *(Tasha exclusive)* | Same base as Seated Blowjob, plus a unique flavor layer: her three tails wrap Kenji's thighs and lower back during the act. | Tasha-specific; unlocks automatically once Acquired (§4.8). |

Position switching follows the Phase-Free Turn-Based Sex Engine's core rule (§13, no phase gating). Seated Deepthroat's Trust gate follows the same pattern as other Trust-locked content in the document.

---
---

*(All other sections of the v3.0 document — Acts 1–7, the remaining nine companions, Astraea's core profile, housing, skill trees, combat engine, world maps, and lore — are unchanged and should be read alongside this revision file.)*
