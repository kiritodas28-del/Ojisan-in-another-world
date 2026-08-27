# Ojisan in Another World — Implementation Requirements Gap Analysis

This is a systems/completeness audit of the v3.1 Master Design Document, written for the purpose of turning it into a build-ready requirements doc. The GDD is strong on **narrative content and player-facing rules**; it is weak on **the formal specification an implementer (human or LLM) needs to actually build the state machine, data layer, and content pipeline**. Findings are grouped by category, with section references (§) back to the GDD.

---

## 0. Blocking Question — Resolve This Before Anything Else

The GDD never states **what kind of software this is**, and the answer changes almost every requirement below:

| Model | What it implies |
|---|---|
| **A. LLM-as-Game-Master** — an LLM narrates turns live, adjudicating rules from this doc as a rules reference/system prompt, with no traditional codebase | Needs: a compact machine-readable rules summary the LLM can hold in context, explicit conflict-resolution priority when rules interact, a defined state object the LLM re-emits every turn (since LLMs don't have persistent memory across calls), and guardrails against the LLM drifting from stated numeric formulas over a long session. |
| **B. LLM-as-Software-Engineer** — an LLM (e.g. an agentic coding tool) builds an actual game engine/app from this spec | Needs: formal data schemas, a tech stack decision (engine, language, save format), API/module boundaries, and testable acceptance criteria per system — everything currently missing per the sections below. |
| **C. Hybrid** — static engine handles state/combat math, an LLM generates dialogue/descriptions on top of deterministic outputs | Needs both of the above, plus a defined boundary: which fields are LLM-generated per turn vs. pulled from a fixed database (this matters a lot for consistency — e.g., you don't want an LLM improvising Trust/Love numbers). |

Nothing downstream can be finalized until this is picked. The rest of this analysis assumes **Model C (hybrid)** is most likely, since the doc has hard numeric systems (stats, combat, formulas) that shouldn't be left to LLM improvisation, alongside heavy narrative/dialogue content that's expensive to hand-author for every NPC. If a different model is intended, several sections below need re-scoping.

---

## 1. Missing Data Schemas

The GDD describes entities narratively but never as structured records. A build-ready doc needs formal schemas for at least:

- **NPC/Companion Template:** race, base stats (with a defined progression curve, not just base→max), equipment slots, dialogue tree ID, AI combat role, Trust/Love current values, home location, schedule, move-in status, alignment flag (for offspring, see §15.3).
- **Quest Template:** ID, type (Main/Companion/Repeatable), prerequisite flags, objective list, reward table, completion flag name, region.
- **Item Template:** slot type, stat modifiers (armor/weapon items are named — e.g. "Steel Shield" — but carry no stated DEF/STR value anywhere in §9), rarity, stack limit, sell value.
- **Position Template (§13.1):** stamina cost, arousal-rate modifiers, prerequisite (Trust gates, stat gates), compatible partner tags.
- **Skill Node (§11, §12):** tier, cost, prerequisite node(s) — tiers are implied by numbering but no explicit "requires Node X" dependency graph exists. Right now nothing stops a player from buying a Tier 3 node with zero Tier 1/2 nodes owned, unless that's intentional (state it either way).
- **World Location/Region:** travel cost between regions (referenced by the *Cartographer* and *Fast Travel Cost 0* achievements in §20.4, but no base fast-travel cost table exists anywhere to reduce to zero).

Without these schemas, there's no way for an implementer to know what fields a save file, a database row, or an LLM's structured output needs to contain.

---

## 2. Missing Numeric & Formula Specifications

Several systems state an outcome ("X increases," "Y is harder") without the formula that produces it:

| System | What's Missing |
|---|---|
| **Combat damage (§14)** | Initiative formula exists (`AGI + D10`), but there is no damage formula. STR, weapon values, and enemy DEF are all defined as stats, but no equation connects them to actual damage dealt. Critical hit rate is only implied by LCK ("high critical hit rate") with no formula. |
| **Renown/Infamy point thresholds (§16)** | Quest tables award flat point values ("+10 Renown," "+30 Renown"), but the Renown/Infamy *display* is a 0–5 level scale (§16.1, §16.2). There's no stated threshold table converting accumulated points into levels. This is a hard blocker — the two systems as written don't connect. |
| **Satisfaction Score (§13.4)** | Listed as "based on" four qualitative factors (reaching 100 Arousal, passed TEC checks, kink bonus +15, sincere dialogue) with no weighting formula that sums to the stated 0–100 scale. |
| **Companion stat progression (§4.x)** | Only Stage 7 (max) stats are given per companion. Stages 1–6 have no stat values, so there's no way to know what a companion's HP/role output looks like before the finale of their questline. |
| **Offspring base stats (§15.3)** | Inheritance is described narratively ("inherits racial characteristics... high base stats") with no actual stat-generation algorithm. |
| **v3.1 additions (self-flagged):** | The oral position set I added in the last revision (§13.1 expansion) also uses relative terms ("moderate-high Arousal gain," "solid Arousal gain") rather than the hard percentages the original 12 positions use. These need to be converted to concrete numbers to match the original table's rigor before handoff. |

---

## 3. Missing State Machine & Save/Load Specification

There is no list anywhere of **what actually needs to persist** between sessions. A save file needs to capture, at minimum: per-NPC Trust/Love values and alignment rolls, quest completion flags, world Infamy/Renown per region, companion move-in/suite assignment, inventory and equipped-item state (including the Equipped/Loosened/Removed state from §9.1 — is that persisted or scene-only?), pregnancy stage timers, offspring birth records and their subsequent world state (location, if a redemption arc is in progress), achievement/trophy unlock flags, and RNG seed state for anything procedurally rolled (offspring alignment, procedural NPC generation).

None of this is specified. There's also no stated behavior for **New Game+** (§3, Act 7 ending) — does it reset companion relationships, or carry them forward? The doc implies "Endless Sandbox Mode" persists post-campaign state, but NG+ behavior is undefined.

---

## 4. Missing System Interaction & Edge Case Rules

These are places where two stated systems will collide and the doc doesn't say who wins:

- **Trust/Love matrix gaps (§17.1):** The 16-row table doesn't cover every coordinate pair. For example, there's no defined status for (Trust 80–100, Love -1 to -39) — a highly-trusted-but-romantically-cold state — nor for (Trust -40 to -79, Love 40–79). An implementation needs either full piecewise coverage with no gaps, or an explicit fallback/default rule for undefined coordinates.
- **Force Intimacy and Infamy/Pregnancy (§10.3, §15.1):** §10.3's consequence engine and §15.1's conception formula are never cross-referenced. It's unstated whether a Force Intimacy act is conception-eligible under the standard formula, and whether it interacts with the Trust/Love system at all beyond the "-10 Approval" note in §10.3.4. This ambiguity needs an explicit ruling either way before implementation.
- **Companion death/incapacitation in combat:** Player HP has clear game-over implications (implied, not stated); companion HP has none. What happens when a companion in the active party hits 0 HP mid-fight? Downed-but-revivable? Removed from the encounter? Not specified anywhere in §14.
- **Interaction Menu vs. monster-type enemies (§10):** The Universal Interaction Menu is stated to apply to "every character... whether Companion, Named Quest NPC, Townsperson, or Random World Encounter" — but bosses like the Miasma Wyrm or Heartwood Abomination are creatures, not people. Does `[T] Talk` or `[G] Gift` render for a Wyrm? Almost certainly not, but the doc doesn't carve out the exception.
- **Daily action caps:** `[F] Flirt` and `[H] Touch` have no stated cooldown or diminishing-returns curve. As written, a player can spam Flirt on any NPC indefinitely for unlimited Love farming. Needs an explicit daily cap or escalating-difficulty curve.
- **Regional vs. global reputation bleed (§16):** Infamy/Renown are tracked "regionally," but it's unstated whether an extreme act (e.g. permanently removing a named NPC, once eligible) causes any cross-region reputation bleed, given how small and interconnected the world map (§18) is.

---

## 5. Missing UI/UX & Input Model

The ASCII mockups throughout the doc (§10, §13, §14) imply a **menu/hotkey-driven interface** (bracketed letter selections), but the genre tag calls this a "Text-based Erotic RPG," which could equally mean a free-text parser. These produce very different implementations (a finite state machine with fixed choices vs. natural-language intent parsing). This needs to be resolved explicitly, along with:

- Whether this ships with any visual art (character portraits/CG scenes) or is pure text — the extremely specific physical descriptions throughout §4 read like art direction briefs, but no art requirement, style guide, or CG count is ever stated.
- Controller/touch/keyboard input mapping, if this isn't purely a text interface.
- Accessibility needs (screen-reader compatibility if text-only; the emoji-coded relationship states in §17.1 and §10 need a non-color-dependent alternative).

---

## 6. Missing Content Volume & Generation Strategy

The doc specifies *structures* (7-stage companion quests, 30 repeatable world quests) but not the actual volume of prose needed, nor who/what produces it:

- Full dialogue trees are never written — only per-stage one-line summaries exist (§4.x). Someone (human writer or an LLM content-generation pass) needs to actually author scene-level dialogue, and the doc should state whether that's static pre-written content or generated live per playthrough (which has consistency risks for Trust/Love-gated dialogue).
- Procedural NPC generation (§8) states equipment tables but not a naming algorithm, stat-scaling-by-region/act formula, or population density per location.
- No target word count / scene count for the 7 Acts, which is needed to scope a writing budget.

---

## 7. Balance/Economy Follow-ups (Continuing the v3.1 Audit)

Beyond the shop-discount stacking fix already applied in v3.1 (§16.3), the reward tables in §7.1–7.3 use flat gold/Renown values that don't scale with region or act progression — a Combat Quest in the Verdant Vale (Act 1) and one in the Sunken Sanctum (Act 6) both use static reward numbers with no stated inflation curve, so late-game rewards may feel identical in weight to early-game ones despite the enemy power gap (Boss HP scales 450 → 5,000 across the campaign, per §3, with no corresponding reward curve).

---

## 8. Compliance & Platform Considerations

Not a design gap, but a practical implementation blocker worth stating plainly in the requirements doc: if this is intended for actual distribution rather than a private/personal project, several current systems will need review against platform policy before a build target is chosen —

- Major storefronts (Steam via its adult-content policy, Apple/Google app stores, most console platforms) either restrict or outright prohibit playable depictions of non-consensual sexual content — the Force Intimacy mechanic (§10.3) specifically. Distribution on itch.io or as a direct-download/Patreon release has more flexibility but still varies by payment processor (several have tightened rules on this category in recent years).
- Every character engaged in intimate content should have an explicit, stated adult age or unambiguous adult-equivalent status in the document itself — not just implied by role or race. This matters most for characters written with youthful appearance despite long lifespans (Sylvara at "600 years," for instance) — the doc should state plainly that appearance reads as adult regardless of chronological age, since platforms and payment processors specifically scrutinize this pattern in fantasy settings.
- If real-money transactions, achievements, or platform integrations (Steam/console trophies) are in scope, those need their own ID-mapping spec, which doesn't exist yet.

---

## 9. Recommended Outline for the Final Requirements Document

Once §0's blocking question is resolved, the actual handoff doc should probably be structured as:

1. **Target Platform & Delivery Model** (resolves §0)
2. **Core Data Schemas** (§1 above, fully filled in)
3. **System Specifications**, one per module (Combat, Intimacy Engine, Reputation, Housing, Pregnancy/Lineage, Quests), each with: inputs, outputs, formulas, edge-case rulings, and a short test case ("given X state, action Y produces Z")
4. **Content Databases** (all NPC/quest/item/position tables as structured data, not prose)
5. **Save/Load Specification**
6. **UI/UX Spec** (or LLM-narration prompt spec, if Model A/C)
7. **Content Production Plan** (volume, authoring vs. generation split)
8. **Compliance Notes & Platform Target**
9. **Acceptance Criteria / Test Plan** per system

This turns the current document — which is an excellent *pitch and narrative bible* — into something an implementer can actually build against without needing to make dozens of unstated judgment calls.
