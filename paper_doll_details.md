


# Paper Doll Body Catalog
## Trait-Based Organization — Race-Agnostic
### Version 3.2

---

> **v3.3 changes (from v3.2)**
> 1. **Breast shape is now explicit in the build pipeline.** Shape is baked into each breast sprite (it is not a separate overlay). Part 3 now includes a **breast shape quick-reference table** (one row per cup × age cell, primary shape listed first) immediately before the build grids. Phase 6 task list now carries a **Shape column** in every breast-sprite grid so you know exactly what shape to author for each sprite before you open HS2. The Part 3 intro paragraph is updated to state this clearly.
> 2. **BreastSoftness and NippleType are also made explicit per sprite** in Part 3 — two new quick-reference tables (softness by cup × age; nipple by cup group) are cross-linked from Phase 6 so they are always visible during production.
> 3. **No count changes.** Shape, softness and nipple type are attributes of the sprite, not additional sprites. The 8,412 breast sprites and 945 + 63 nipple sprites are unchanged.

> **v3.2 changes (from v3.1)**
> 1. **Height is now a key for breast sprites:** body type × age tier × height × cup, authored on that exact doll. Each sprite is exactly one valid body + cup composite.
> 2. **Nipples are identical across age tiers** but each nipple type has **three arousal states** — `unaroused`, `light` (lightly aroused), `extreme` (extremely aroused). Key = body type × supported nipple × state. Male nipples get the same three states.
> 3. **Pubic hair, labia and cock** are overlays, **one set per gender**.
> 4. **File names:** `breast_f_[age]_[height_cm]_[bodytype]_[cup].png`, `nipple_f_[bodytype]_[type]_[group]_[state].png`, `nipple_m_[bodytype]_[size]_[state].png`. Task list: `paper_doll_task_list_v3.2.md`.

> **v3.1 changes (from v3.0) — retained (superseded by v3.2 where they differ)**
> 1. **Breast and nipple sprites are per body type.** Every body type, at every age tier, has its own sprites for **every cup it supports** and its own nipple sprites for **every nipple it supports**. **Nothing is scaled to fit**; a sprite is only translated to the doll's breast anchor. Key = body type × age tier × cup. The firm-variant set is gone — Athletic / Muscular types' sprites are authored one step firmer directly.
> 2. **Labia, cock and pubic hair are all overlays.** The doll has a smooth neutral crotch with no genital detail.
> 3. **File names:** `breast_f_[age]_[bodytype]_[cup].png`, `nipple_f_[age]_[bodytype]_[type]_[group].png`, `nipple_m_[age]_[bodytype]_[size].png`; supernatural sprites are on demand: `breast_f_sup_[bodytype]_[cup].png`.
> 4. Counts: see Part 10. Task list: `paper_doll_task_list_v3.1.md`.

> **v3.0 changes (from v2.2) — retained (superseded by v3.1 where they differ)**
> 1. **The body is now a "body doll" plus overlays.** The body doll is everything below the face **except breasts, nipples and pubic hair**. It has **no cup**. File names no longer carry a cup.
> 2. **Breasts (with nipples) are an overlay set** keyed by cup × age tier, plus a firm variant for Athletic / Muscular types, a supernatural set, nipple sprites and male nipple sprites (Part 3).
> 3. **The cup table is now a compatibility rule** — which breast sprites may be attached to which body type — not a list of cards. Every valid body + cup combination is *composed*, not drawn.
> 4. **Overlays:** breast (+ nipples), skin colour, skin features, wings, tails, pubic hair; ears and horns attach to the face track's head. Skin layers are authored in UV space and applied to each part.
> 5. **New derived value:** the body doll is built to an **underbust** (bust-equiv at the reference cup − 2.5 cm × (reference-cup position − 1)), shown as a new column in every Part 2 table.
> 6. Production counts: see Part 10. (The task list has since moved to `paper_doll_task_list_v3.1.md`.)

> **v2.2 changes (from v2.1) — retained**
> 1. **DD is now a rendered cup**, sitting between D and E on the ladder (19 cups, AA → Q). Any type whose range spans D to E includes DD.
> 2. **BT-F-19 Rubenesque** cup range extended from F–K to **F–Q** (sweet spot unchanged, H–K).
> 3. **Cups L–Q confirmed renderable** on the HS2 sliders.
> 4. **Part 3:** nipple colour added for `DeepPurple` (DarkBrown) and `Ruddy` (Peach · Tan) — the two tones that had none.
> 5. **Part 8:** added `AnimalBunny` ears, `DragonRidge` ears (Dragonkin) and `Bunny` tail. Descriptions are proposals — edit freely.
> 6. Pubic hair confirmed as an overlay; labia / cock *variants* as overlays on a neutral default in the doll (confirm); male ageing stays qualitative (no numeric table).

> **v2.1 changes (from v2.0) — retained**
> 1. **New age tier `YoungAdult`** between `Young` and `RipeningMilf`. Tiers are now **six**. `Young` is narrowed to 18–24; `YoungAdult` covers 25–29. (Parts 1, 3, 4, 5, 9)
> 2. **Cup availability table replaced** with the new per-type ranges. The cup ladder now runs **AA → Q** (L, M, N, O, P, Q added). (Part 1, 2, 3)
> 3. **Ripple updates:** every `CupRange` row in Part 2; breast shape / softness / nipple tables extended with L–N and O–Q rows and a YoungAdult column; age modifier table and ass-softness table gain a YoungAdult column.
> 4. **New rules:** cup-step bust offset (Part 3), file-name tokens and canonical render heights (Parts 1, 2, 6), silhouette-ratio relaxation outside the sweet spot (Part 2).
> 5. **Production task list moved** to its own file (now `paper_doll_task_list_v3.2.md`). Part 10 here is a summary and pointer.

---

> **Core principle**
> A body doll is defined entirely by physical traits. Race is irrelevant to the body doll.
> Everything that is not the body doll — breasts, skin, race elements — is a separate overlay applied on top.
>
> **Layers**
> BODY DOLL = Gender · HeightTag + cm · AgeBodyCategory · BodyType · Ass attributes · Stomach · Muscle · Limbs — *everything below the face except breasts, nipples, pubic hair and genital detail; headless (neck to NECK_TOP); no cup*
> BREAST OVERLAY (female) = **per body type × age tier × height**: a sprite for every allowed Cup (age-driven shape / softness / position; Athletic / Muscular types authored one step firmer) + nipple sprites per body type for every supported nipple (type × cup group) in three arousal states — identical across ages. Supernatural tissue = on-demand sprites per body type × height × cup. Male dolls take small male nipple sprites per male body type × size × state. *Sprites are translated, never scaled.*
> SKIN OVERLAYS = SkinTone · SkinTexture · skin features (freckles, scars, blemishes) · Gloss · TattooPresence — authored in UV space, applied to every part (doll, breast, nipple, head) through its UV pass
> BODY RACE OVERLAYS = TailType · WingType · race body markings
> ANATOMY OVERLAYS = PubicHairStyle · LabiaType · CockType (all overlays, one set per gender; the doll carries none)
> FACE CARD (separate track) = FaceShape · Cheekbone · Jaw · Eyes · Nose · Lips · Brows · Hair — plus the head-side race overlays EarType · HornType
>
> **Adult-only rule**
> The apparent-age floor of every card is 18. No tier exists below `Young`. Petite and "youthful" body types still read as adult in proportion, face and styling.
>
> **File naming**
> Body doll: `body_[gender]_[age]_[height_cm]_[bodytype].png` — example `body_f_young_165_hourglass_curvy.png`
> Companion files: `…_uv.png` (UV pass) and `….json` (anchors). **No cup field.**
> Breast sprite: `breast_f_[age]_[height_cm]_[bodytype]_[cup].png` — example `breast_f_young_165_hourglass_curvy_DD.png` · supernatural (on demand): `breast_f_sup_[height_cm]_[bodytype]_[cup].png`
> Female nipple: `nipple_f_[bodytype]_[type]_[cupgroup]_[state].png` — example `nipple_f_hourglass_curvy_protruding_D-DD_light.png` (state = `unaroused` · `light` · `extreme`)
> Male nipple: `nipple_m_[bodytype]_[small|medium|large]_[state].png`

### File-name tokens

| Field | Tokens |
|-------|--------|
| gender | `f` · `m` |
| age | `young` · `youngadult` · `ripeningmilf` · `ripemilf` · `maturemilf` · `oldmilf` |
| height_cm | canonical render height for the HeightTag — see Axis 3 (e.g. Average female = `165`) |
| bodytype | lower-case token shown under each body type in Parts 2 and 6 (e.g. `hourglass_curvy`) |
| cup | `AA A B C D DD E F G H I J K L M N O P Q` — upper-case; the last field of a breast-sprite name, never part of a body-doll name |

Parsing rule: for body dolls the first four fields (`body`, gender, age, cm) are fixed and everything after is the body-type token (strip a trailing `_uv` first). Cup groups for nipples: `AA-A  B-C  D-DD  E-F  G-H  I-K  L-N  O-Q`.

---

# PART 1 — DIMENSION AXES
# These are the axes you work through. Every combination is one card.

## Axis 1 — Gender
- Female
- Male

## Axis 2 — AgeBodyCategory (six tiers)


| Tag | Apparent age | Key body changes |
|-------|--------------|------------------|
| Young | 18–24 | Breast high, firm. Stomach flat. Ass firm. Skin smooth. |
| YoungAdult | 25–29 | Breast high (−½ step), firm with a trace of softness (+½ step). Stomach flat. Ass firm. Skin smooth–normal. |
| RipeningMilf | 30–35 | Breast high-medium, +1 softness. Stomach slight soft. |
| RipeMilf | 35–43 | Breast medium, +2 softness. Stomach soft. Ass soft. |
| MatureMilf | 43–50 | Breast med-low, +3 softness. Stomach Soft. Ass very soft. |
| OldMilf | 50+ | Breast low. Stomach pudgy. Ass pillowy. Skin rougher. |

*Male age: same 6 tiers — muscle softens, belly softens, skin ages.*

*Half-step rule for YoungAdult: wherever a table has no explicit YoungAdult value, use the midpoint between the Young and RipeningMilf values (slider value = 50% lerp; categorical = the "X–Y" blend shown in Parts 3–5).*

## Axis 3 — HeightTag with cm values
`Render cm` is the **canonical height used in the file name and for rendering** (midpoint of the range; the open-ended top tier is assumed). Change it in one place if you prefer other values.

### Female

| Tag | cm range | Render cm | PetiteCategory |
|-------|----------|-----------|----------------|
| VeryShort | 140–149 cm | 145 | Petite |
| Short | 150–157 cm | 154 | Petite |
| BelowAverage | 158–162 cm | 160 | Petite / border |
| Average | 163–167 cm | 165 | NonPetite |
| AboveAverage | 168–172 cm | 170 | NonPetite |
| Tall | 173–179 cm | 176 | NonPetite |
| VeryTall | 180+ cm | 183 | NonPetite |

### Male

| Tag | cm range | Render cm |
|-------|----------|-----------|
| VeryShort | 150–159 cm | 155 |
| Short | 160–167 cm | 164 |
| BelowAverage | 168–171 cm | 170 |
| Average | 172–176 cm | 174 |
| AboveAverage | 177–181 cm | 179 |
| Tall | 182–189 cm | 186 |
| VeryTall | 190+ cm | 193 |

## Axis 4 — BodyType
24 female types · 7 male types
See Part 2 for all measurements.

## Axis 5 — Cup size (Female only — selects a breast overlay, not a body doll)
AA · A · B · C · D · DD · E · F · G · H · I · J · K · L · M · N · O · P · Q
Not every cup is allowed on every body type — see Part 3 (compatibility table).

---

# PART 2 — FEMALE BODY TYPE CATALOG
# Every type: waist · hip · ass size · ass shape · ass softness · stomach type · stomach softness · muscle tone · thigh · legs
# Measurements are real-world cm equivalents for HS2 slider calibration
# All at AgeBodyCategory: Young baseline. Apply age modifiers from Part 4.

> **Reading the tables (v3.0)**
> The **body doll is built to Waist, Hip and Underbust** — it has no breasts. `Bust equiv` is the **composite** bust circumference (doll + breast overlay) **at the type's reference cup** (the middle of its sweet spot — see Part 3). For any other cup, apply the cup-step offset in Part 3 (±2.5 cm per ladder step).
> `Underbust (derived)` = Bust equiv − 2.5 cm × (reference-cup ladder position − 1). It is a derived target, reviewed in the first build phase.
> The bust-to-hip ratio rules written in the Silhouette lines (e.g. "Bust ≈ hip within 6 cm", "Bust 14–22 cm smaller than hip") describe the sweet-spot cups only. At cups outside the sweet spot the ratio relaxes on purpose — that is how a Pear can carry a K cup or an Hourglass Slim can carry an F cup.

---

## BT-F-01 · ANDROGYNOUS

**Silhouette:** Near-flat, minimal curves, gender-ambiguous. Narrow everywhere.

**File token:** `androgynous`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 54–58 | 76–80 | 70–76 | 67.5–73.5 |
| Short | 150–157 | 56–60 | 78–82 | 72–78 | 69.5–75.5 |
| BelowAverage | 158–162 | 58–62 | 80–84 | 74–80 | 71.5–77.5 |
| Average | 163–167 | 60–64 | 82–86 | 76–82 | 73.5–79.5 |
| AboveAverage | 168–172 | 62–66 | 84–88 | 78–84 | 75.5–81.5 |
| Tall | 173–179 | 64–68 | 86–90 | 80–86 | 77.5–83.5 |
| VeryTall | 180+ | 66–70 | 88–92 | 82–88 | 79.5–85.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Flat |
| AssSize | Flat–Small |
| AssSoftness | Firm |
| StomachType | Flat |
| StomachSoftness | Firm |
| MuscleTone | None–Light |
| Thigh | Slim |
| Legs | Slim, proportional to height |
| Arms | Slim |
| AllowedCups (breast overlay) | AA–B |
| SweetSpot | AA–A  (reference cup: A) |
| BreastShape (ref cup A, Young) | Perky / Conical |
| BreastShape (YoungAdult) | Perky |
| BreastShape (RipeningMilf) | Perky |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Round |
| BreastShape (OldMilf) | Sagging-slight |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | AA–A |
| NippleTypes | Flat · Puffy · Inverted |

---

## BT-F-02 · PETITE SLIM
*(Petite heights only: VeryShort / Short / BelowAverage)*

**Silhouette:** Small-framed, slender, youthful. Minimal curves, compact.

**File token:** `petite_slim`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 52–56 | 76–82 | 72–78 | 67–73 |
| Short | 150–157 | 54–58 | 78–84 | 74–80 | 69–75 |
| BelowAverage | 158–162 | 56–60 | 80–86 | 76–82 | 71–77 |

| Attribute | Value |
|-----------|-------|
| AssShape | Round |
| AssSize | Small |
| AssSoftness | Firm |
| StomachType | Flat |
| StomachSoftness | Soft–Firm |
| MuscleTone | Soft–Light |
| Thigh | Slim |
| Legs | Short-slim |
| Arms | Slim, short |
| AllowedCups (breast overlay) | AA–C |
| SweetSpot | A–B  (reference cup: B) |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-03 · PETITE CURVY
*(Petite heights only)*

**Silhouette:** Short but noticeably curved. Mini-hourglass effect on compact frame.

**File token:** `petite_curvy`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 54–60 | 82–90 | 82–90 | 74.5–82.5 |
| Short | 150–157 | 56–62 | 84–92 | 84–92 | 76.5–84.5 |
| BelowAverage | 158–162 | 58–64 | 86–94 | 86–94 | 78.5–86.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Round–Heart |
| AssSize | Moderate–Full |
| AssSoftness | Soft |
| StomachType | Flat–Soft |
| StomachSoftness | Soft |
| MuscleTone | Soft |
| Thigh | Moderate–Full |
| Legs | Short, curvy |
| Arms | Soft, short |
| AllowedCups (breast overlay) | A–G |
| SweetSpot | B–C  (reference cup: C) |
| BreastShape (ref cup C, Young) | Round / Perky |
| BreastShape (YoungAdult) | Round |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round-Teardrop |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |
| BreastShape (ref cup C, Young) | Round / Perky |
| BreastShape (YoungAdult) | Round |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round-Teardrop |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging |
| BreastSoftness (Young, ref cup) | Firm (+1) |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |
| BreastNote | Athletic — authored one step firmer at every cup × age. |
| BreastShape (ref cup C, Young) | Round / Perky |
| BreastShape (YoungAdult) | Round |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round-Teardrop |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-04 · WILLOWY
*(AboveAverage / Tall / VeryTall only)*

**Silhouette:** Long, slender, elegant. Minimal curves, graceful reach.

**File token:** `willowy`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| AboveAverage | 168–172 | 58–64 | 82–88 | 78–86 | 73–81 |
| Tall | 173–179 | 60–66 | 84–90 | 80–88 | 75–83 |
| VeryTall | 180+ | 62–68 | 86–92 | 82–90 | 77–85 |

| Attribute | Value |
|-----------|-------|
| AssShape | Round |
| AssSize | Small–Moderate |
| AssSoftness | Firm–Toned |
| StomachType | Flat |
| StomachSoftness | Firm |
| MuscleTone | Light |
| Thigh | Slim-Long |
| Legs | Long, lean |
| Arms | Long, slim |
| AllowedCups (breast overlay) | AA–C |
| SweetSpot | A–B  (reference cup: B) |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-05 · ATHLETIC

**Silhouette:** Lean with visible muscle. Active and functional. Waist defined by core, not narrowness.

**File token:** `athletic`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 56–62 | 80–86 | 78–86 | 70.5–78.5 |
| Short | 150–157 | 58–64 | 82–88 | 80–88 | 72.5–80.5 |
| BelowAverage | 158–162 | 60–66 | 84–90 | 82–90 | 74.5–82.5 |
| Average | 163–167 | 62–68 | 86–92 | 84–92 | 76.5–84.5 |
| AboveAverage | 168–172 | 64–70 | 88–94 | 86–94 | 78.5–86.5 |
| Tall | 173–179 | 66–72 | 90–96 | 88–96 | 80.5–88.5 |
| VeryTall | 180+ | 68–74 | 92–98 | 90–98 | 82.5–90.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Round–Heart |
| AssSize | Moderate–Full |
| AssSoftness | Firm–Toned |
| StomachType | Flat–Toned |
| StomachSoftness | Hard–Firm |
| MuscleTone | Athletic–Defined |
| Thigh | Lean-Muscled |
| Legs | Defined, proportional |
| Arms | Visible lean muscle |
| AllowedCups (breast overlay) | A–H |
| SweetSpot | B–C  (reference cup: C) |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-06 · SLIM STRAIGHT

**Silhouette:** Slender, minimal waist-hip differential. Rectangle. Lean but not muscled.
Waist-hip difference max 24 cm.

**File token:** `slim_straight`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 54–60 | 78–84 | 76–82 | 71–77 |
| Short | 150–157 | 56–62 | 80–86 | 78–84 | 73–79 |
| BelowAverage | 158–162 | 58–64 | 82–88 | 80–86 | 75–81 |
| Average | 163–167 | 60–66 | 84–90 | 82–88 | 77–83 |
| AboveAverage | 168–172 | 62–68 | 86–92 | 84–90 | 79–85 |
| Tall | 173–179 | 64–70 | 88–94 | 86–92 | 81–87 |
| VeryTall | 180+ | 66–72 | 90–96 | 88–94 | 83–89 |

| Attribute | Value |
|-----------|-------|
| AssShape | Flat–Round |
| AssSize | Small–Moderate |
| AssSoftness | Firm |
| StomachType | Flat |
| StomachSoftness | Firm |
| MuscleTone | Soft–Light |
| Thigh | Slim–Moderate |
| Legs | Slim, proportional |
| Arms | Slim |
| AllowedCups (breast overlay) | AA–C |
| SweetSpot | A–B  (reference cup: B) |
| BreastShape (ref cup C, Young) | Round / Perky |
| BreastShape (YoungAdult) | Round |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round-Teardrop |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-07 · SLIM CURVY

**Silhouette:** Narrow waist, noticeable curves at hip and bust. Light hourglass.

**File token:** `slim_curvy`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 54–60 | 82–90 | 82–90 | 74.5–82.5 |
| Short | 150–157 | 56–62 | 84–92 | 84–92 | 76.5–84.5 |
| BelowAverage | 158–162 | 58–64 | 86–94 | 86–94 | 78.5–86.5 |
| Average | 163–167 | 60–66 | 88–96 | 88–96 | 80.5–88.5 |
| AboveAverage | 168–172 | 62–68 | 90–98 | 90–98 | 82.5–90.5 |
| Tall | 173–179 | 64–70 | 92–100 | 92–100 | 84.5–92.5 |
| VeryTall | 180+ | 66–72 | 94–102 | 94–102 | 86.5–94.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Round–Heart |
| AssSize | Moderate–Full |
| AssSoftness | Soft–Firm |
| StomachType | Flat |
| StomachSoftness | Soft–Firm |
| MuscleTone | Light |
| Thigh | Moderate–Full |
| Legs | Moderate curves |
| Arms | Soft, slim |
| AllowedCups (breast overlay) | B–F |
| SweetSpot | C  (reference cup: C) |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-08 · BANANA SHAPE

**Silhouette:** Lean, waist and hip close in measurement. Subtle curves. Athletic-adjacent without muscle.
Waist-hip difference max 22 cm.

**File token:** `banana`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 56–62 | 80–86 | 78–84 | 73–79 |
| Short | 150–157 | 58–64 | 82–88 | 80–86 | 75–81 |
| BelowAverage | 158–162 | 60–66 | 84–90 | 82–88 | 77–83 |
| Average | 163–167 | 62–68 | 86–92 | 84–90 | 79–85 |
| AboveAverage | 168–172 | 64–70 | 88–94 | 86–92 | 81–87 |
| Tall | 173–179 | 66–72 | 90–96 | 88–94 | 83–89 |
| VeryTall | 180+ | 68–74 | 92–98 | 90–96 | 85–91 |

| Attribute | Value |
|-----------|-------|
| AssShape | Flat–Round |
| AssSize | Small–Moderate |
| AssSoftness | Firm |
| StomachType | Flat |
| StomachSoftness | Firm |
| MuscleTone | Light–Toned |
| Thigh | Slim–Moderate |
| Legs | Lean, long |
| Arms | Slim |
| AllowedCups (breast overlay) | AA–F |
| SweetSpot | A–B  (reference cup: B) |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-09 · PEAR SHAPE

**Silhouette:** Narrow upper body, wide hips and thighs. Weight below the waist.

**File token:** `pear`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 58–64 | 88–96 | 76–84 | 71–79 |
| Short | 150–157 | 60–66 | 90–98 | 78–86 | 73–81 |
| BelowAverage | 158–162 | 62–68 | 92–100 | 80–88 | 75–83 |
| Average | 163–167 | 64–70 | 94–102 | 82–90 | 77–85 |
| AboveAverage | 168–172 | 66–72 | 96–104 | 84–92 | 79–87 |
| Tall | 173–179 | 68–74 | 98–106 | 86–94 | 81–89 |
| VeryTall | 180+ | 70–76 | 100–108 | 88–96 | 83–91 |

| Attribute | Value |
|-----------|-------|
| AssShape | Wide–Pear |
| AssSize | Large–VeryLarge |
| AssSoftness | Soft–VerySoft |
| StomachType | Flat–Soft |
| StomachSoftness | Soft |
| MuscleTone | Soft |
| Thigh | Full, noticeably wider than waist implies |
| Legs | Full thigh, narrowing to calf |
| Arms | Slim–Moderate |
| AllowedCups (breast overlay) | AA–K (upper body lighter at default cup) |
| SweetSpot | A–C  (reference cup: B) |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-10 · SPOON SHAPE

**Silhouette:** Pear variant with higher hip shelf and visible hip dip. Waist narrow, hip flares dramatically.

**File token:** `spoon`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 60–66 | 90–98 | 78–86 | 70.5–78.5 |
| Short | 150–157 | 62–68 | 92–100 | 80–88 | 72.5–80.5 |
| BelowAverage | 158–162 | 64–70 | 94–102 | 82–90 | 74.5–82.5 |
| Average | 163–167 | 66–72 | 96–104 | 84–92 | 76.5–84.5 |
| AboveAverage | 168–172 | 68–74 | 98–106 | 86–94 | 78.5–86.5 |
| Tall | 173–179 | 70–76 | 100–108 | 88–96 | 80.5–88.5 |
| VeryTall | 180+ | 72–78 | 102–110 | 90–98 | 82.5–90.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Wide–Pear |
| AssSize | Large–VeryLarge |
| AssSoftness | Soft–Pillowy |
| Hip dip | Visible (modeled in hip shape) |
| StomachType | Soft |
| StomachSoftness | Soft–VerySoft |
| MuscleTone | Soft |
| Thigh | Heavy, full |
| Legs | Heavy thigh, moderate calf |
| Arms | Soft |
| AllowedCups (breast overlay) | A–K |
| SweetSpot | B–C  (reference cup: C) |
| BreastShape (ref cup C, Young) | Round / Perky |
| BreastShape (YoungAdult) | Round |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round-Teardrop |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-11 · HOURGLASS SLIM

**Silhouette:** Defined waist with balanced bust and hip. Lean hourglass.
Bust ≈ hip (within 6 cm). Waist 28–34 cm less than hip.

**File token:** `hourglass_slim`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 52–58 | 80–88 | 80–88 | 72.5–80.5 |
| Short | 150–157 | 54–60 | 82–90 | 82–90 | 74.5–82.5 |
| BelowAverage | 158–162 | 56–62 | 84–92 | 84–92 | 76.5–84.5 |
| Average | 163–167 | 58–64 | 86–94 | 86–94 | 78.5–86.5 |
| AboveAverage | 168–172 | 60–66 | 88–96 | 88–96 | 80.5–88.5 |
| Tall | 173–179 | 62–68 | 90–98 | 90–98 | 82.5–90.5 |
| VeryTall | 180+ | 64–70 | 92–100 | 92–100 | 84.5–92.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Round–Heart |
| AssSize | Moderate–Full |
| AssSoftness | Firm–Soft |
| StomachType | Flat |
| StomachSoftness | Soft–Firm |
| MuscleTone | Light |
| Thigh | Moderate–Full |
| Legs | Defined curves, proportional |
| Arms | Slim–Soft |
| AllowedCups (breast overlay) | A–F |
| SweetSpot | B–D  (reference cup: C) |
| BreastShape (ref cup C, Young) | Round / Perky |
| BreastShape (YoungAdult) | Round |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round-Teardrop |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |
| BreastShape (ref cup C, Young) | Round / Perky |
| BreastShape (YoungAdult) | Round |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round-Teardrop |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging |
| BreastSoftness (Young, ref cup) | Firm (+1) |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |
| BreastNote | MuscularFeminine — authored one step firmer at every cup × age. |
| BreastShape (ref cup C, Young) | Round / Perky |
| BreastShape (YoungAdult) | Round |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round-Teardrop |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |
| BreastShape (ref cup C, Young) | Round / Perky |
| BreastShape (YoungAdult) | Round |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round-Teardrop |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-12 · HOURGLASS CURVY

**Silhouette:** Full hourglass. Both bust and hip prominent. Classic curves.
Bust ≈ hip (within 4 cm). Waist 30–36 cm less than hip.

**File token:** `hourglass_curvy`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 56–64 | 88–96 | 88–96 | 75.5–83.5 |
| Short | 150–157 | 58–66 | 90–98 | 90–98 | 77.5–85.5 |
| BelowAverage | 158–162 | 60–68 | 92–100 | 92–100 | 79.5–87.5 |
| Average | 163–167 | 62–70 | 94–102 | 94–102 | 81.5–89.5 |
| AboveAverage | 168–172 | 64–72 | 96–104 | 96–104 | 83.5–91.5 |
| Tall | 173–179 | 66–74 | 98–106 | 98–106 | 85.5–93.5 |
| VeryTall | 180+ | 68–76 | 100–108 | 100–108 | 87.5–95.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Round–Heart–Bubble |
| AssSize | Large–VeryLarge |
| AssSoftness | Soft–VerySoft |
| StomachType | Flat–Soft |
| StomachSoftness | Soft |
| MuscleTone | Soft |
| Thigh | Full–Heavy |
| Legs | Full curves |
| Arms | Soft |
| AllowedCups (breast overlay) | C–K |
| SweetSpot | D–E  (reference cup: DD) |
| BreastShape (ref cup DD, Young) | Round / Teardrop |
| BreastShape (YoungAdult) | Teardrop / Round |
| BreastShape (RipeningMilf) | Teardrop |
| BreastShape (RipeMilf) | Wide-Teardrop |
| BreastShape (MatureMilf) | Wide-Sagging |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | MediumFirm (+1) |
| NippleGroup | D–DD |
| NippleTypes | Protruding · Wide · Puffy |
| BreastNote | CompactPower — authored one step firmer at every cup × age. |
| BreastShape (ref cup DD, Young) | Round / Teardrop |
| BreastShape (YoungAdult) | Teardrop / Round |
| BreastShape (RipeningMilf) | Teardrop |
| BreastShape (RipeMilf) | Wide-Teardrop |
| BreastShape (MatureMilf) | Wide-Sagging |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | MediumFirm |
| NippleGroup | D–DD |
| NippleTypes | Protruding · Wide · Puffy |

---

## BT-F-13 · HOURGLASS FULL BUST

**Silhouette:** Hourglass but bust significantly larger than hip. Top-dominant balance.
Bust 10–16 cm larger than hip. Waist 32–40 cm less than bust.

**File token:** `hourglass_fullbust`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 56–64 | 86–94 | 96–110 | 76–90 |
| Short | 150–157 | 58–66 | 88–96 | 98–112 | 78–92 |
| BelowAverage | 158–162 | 60–68 | 90–98 | 100–114 | 80–94 |
| Average | 163–167 | 62–70 | 92–100 | 102–116 | 82–96 |
| AboveAverage | 168–172 | 64–72 | 94–102 | 104–118 | 84–98 |
| Tall | 173–179 | 66–74 | 96–104 | 106–120 | 86–100 |
| VeryTall | 180+ | 68–76 | 98–106 | 108–122 | 88–102 |

| Attribute | Value |
|-----------|-------|
| AssShape | Round–Heart |
| AssSize | Full–Large |
| AssSoftness | Soft |
| StomachType | Flat–Soft |
| StomachSoftness | Soft |
| MuscleTone | Soft |
| Thigh | Full |
| Legs | Moderate-full |
| Arms | Soft |
| AllowedCups (breast overlay) | E–Q |
| SweetSpot | F–H  (reference cup: G) |
| BreastShape (ref cup G, Young) | Wide / Teardrop |
| BreastShape (YoungAdult) | Wide |
| BreastShape (RipeningMilf) | Wide |
| BreastShape (RipeMilf) | Wide-Pendulous |
| BreastShape (MatureMilf) | Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | Soft |
| NippleGroup | G–H |
| NippleTypes | Wide · LargeProtruding · Long |
| BreastShape (ref cup G, Young) | Wide / Teardrop |
| BreastShape (YoungAdult) | Wide |
| BreastShape (RipeningMilf) | Wide |
| BreastShape (RipeMilf) | Wide-Pendulous |
| BreastShape (MatureMilf) | Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | Soft |
| NippleGroup | G–H |
| NippleTypes | Wide · LargeProtruding · Long |
| BreastShape (ref cup G, Young) | Wide / Teardrop |
| BreastShape (YoungAdult) | Wide |
| BreastShape (RipeningMilf) | Wide |
| BreastShape (RipeMilf) | Wide-Pendulous |
| BreastShape (MatureMilf) | Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | Soft |
| NippleGroup | G–H |
| NippleTypes | Wide · LargeProtruding · Long |

---

## BT-F-14 · TOP HEAVY

**Silhouette:** Bust dominant, hip narrow, no hourglass ratio. Bust 14–22 cm larger than hip.

**File token:** `top_heavy`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 60–68 | 82–90 | 96–112 | 76–92 |
| Short | 150–157 | 62–70 | 84–92 | 98–114 | 78–94 |
| BelowAverage | 158–162 | 64–72 | 86–94 | 100–116 | 80–96 |
| Average | 163–167 | 66–74 | 88–96 | 102–118 | 82–98 |
| AboveAverage | 168–172 | 68–76 | 90–98 | 104–120 | 84–100 |
| Tall | 173–179 | 70–78 | 92–100 | 106–122 | 86–102 |
| VeryTall | 180+ | 72–80 | 94–102 | 108–124 | 88–104 |

| Attribute | Value |
|-----------|-------|
| AssShape | Flat–Round |
| AssSize | Small–Moderate |
| AssSoftness | Soft |
| StomachType | Soft |
| StomachSoftness | Soft–VerySoft |
| MuscleTone | Soft |
| Thigh | Moderate |
| Legs | Moderate |
| Arms | Soft |
| AllowedCups (breast overlay) | D–Q |
| SweetSpot | F–H  (reference cup: G) |
| BreastShape (ref cup G, Young) | Wide / Teardrop |
| BreastShape (YoungAdult) | Wide |
| BreastShape (RipeningMilf) | Wide |
| BreastShape (RipeMilf) | Wide-Pendulous |
| BreastShape (MatureMilf) | Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | Soft |
| NippleGroup | G–H |
| NippleTypes | Wide · LargeProtruding · Long |

---

## BT-F-15 · BOTTOM HEAVY

**Silhouette:** Hip dominant, small bust. Extreme pear. Bust 14–22 cm smaller than hip.

**File token:** `bottom_heavy`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 60–68 | 92–102 | 72–82 | 67–77 |
| Short | 150–157 | 62–70 | 94–104 | 74–84 | 69–79 |
| BelowAverage | 158–162 | 64–72 | 96–106 | 76–86 | 71–81 |
| Average | 163–167 | 66–74 | 98–108 | 78–88 | 73–83 |
| AboveAverage | 168–172 | 68–76 | 100–110 | 80–90 | 75–85 |
| Tall | 173–179 | 70–78 | 102–112 | 82–92 | 77–87 |
| VeryTall | 180+ | 72–80 | 104–114 | 84–94 | 79–89 |

| Attribute | Value |
|-----------|-------|
| AssShape | Wide–Pear–Bubble |
| AssSize | VeryLarge–Massive |
| AssSoftness | VerySoft–Pillowy |
| StomachType | Soft |
| StomachSoftness | Soft–VerySoft |
| MuscleTone | Soft |
| Thigh | Heavy |
| Legs | Very heavy thigh, narrow calf |
| Arms | Slim–Soft |
| AllowedCups (breast overlay) | AA–E |
| SweetSpot | A–C  (reference cup: B) |
| BreastShape (ref cup B, Young) | Perky / Round |
| BreastShape (YoungAdult) | Round / Perky |
| BreastShape (RipeningMilf) | Round |
| BreastShape (RipeMilf) | Round |
| BreastShape (MatureMilf) | Teardrop |
| BreastShape (OldMilf) | Sagging-light |
| BreastSoftness (Young, ref cup) | Firm |
| NippleGroup | B–C |
| NippleTypes | Puffy · Protruding · Flat |

---

## BT-F-16 · FULL FIGURED

**Silhouette:** Large and Soft throughout. Soft everywhere. Not extreme, fully present.

**File token:** `full_figured`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 68–78 | 94–104 | 94–106 | 76.5–88.5 |
| Short | 150–157 | 70–80 | 96–106 | 96–108 | 78.5–90.5 |
| BelowAverage | 158–162 | 72–82 | 98–108 | 98–110 | 80.5–92.5 |
| Average | 163–167 | 74–84 | 100–110 | 100–112 | 82.5–94.5 |
| AboveAverage | 168–172 | 76–86 | 102–112 | 102–114 | 84.5–96.5 |
| Tall | 173–179 | 78–88 | 104–114 | 104–116 | 86.5–98.5 |
| VeryTall | 180+ | 80–90 | 106–116 | 106–118 | 88.5–100.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Wide–Round–Square |
| AssSize | VeryLarge–Massive |
| AssSoftness | VerySoft–Pillowy |
| StomachType | Soft |
| StomachSoftness | Soft–VerySoft |
| MuscleTone | Soft |
| Thigh | Heavy |
| Legs | Heavy throughout |
| Arms | Soft |
| AllowedCups (breast overlay) | D–Q |
| SweetSpot | E–G  (reference cup: F) |
| BreastShape (ref cup F, Young) | Teardrop / Wide |
| BreastShape (YoungAdult) | Wide / Teardrop |
| BreastShape (RipeningMilf) | Wide |
| BreastShape (RipeMilf) | Wide |
| BreastShape (MatureMilf) | Sagging-Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | MediumFirm |
| NippleGroup | E–F |
| NippleTypes | Protruding · Wide · LargeProtruding |
| BreastShape (ref cup F, Young) | Teardrop / Wide |
| BreastShape (YoungAdult) | Wide / Teardrop |
| BreastShape (RipeningMilf) | Wide |
| BreastShape (RipeMilf) | Wide |
| BreastShape (MatureMilf) | Sagging-Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | MediumFirm |
| NippleGroup | E–F |
| NippleTypes | Protruding · Wide · LargeProtruding |

---

## BT-F-17 · VOLUPTUOUS

**Silhouette:** Generously curved everywhere. Waist defined but full. Lush, present, deliberate.

**File token:** `voluptuous`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 64–72 | 92–102 | 92–104 | 69.5–81.5 |
| Short | 150–157 | 66–74 | 94–104 | 94–106 | 71.5–83.5 |
| BelowAverage | 158–162 | 68–76 | 96–106 | 96–108 | 73.5–85.5 |
| Average | 163–167 | 70–78 | 98–108 | 98–110 | 75.5–87.5 |
| AboveAverage | 168–172 | 72–80 | 100–110 | 100–112 | 77.5–89.5 |
| Tall | 173–179 | 74–82 | 102–112 | 102–114 | 79.5–91.5 |
| VeryTall | 180+ | 76–84 | 104–114 | 104–116 | 81.5–93.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Bubble–Heart–Round |
| AssSize | VeryLarge–Massive |
| AssSoftness | VerySoft–Pillowy |
| StomachType | Soft |
| StomachSoftness | VerySoft |
| MuscleTone | Soft |
| Thigh | Heavy |
| Legs | Heavy, lush |
| Arms | Soft, full |
| AllowedCups (breast overlay) | E–Q |
| SweetSpot | G–I  (reference cup: H) |
| BreastShape (ref cup H, Young) | Wide / Pendulous |
| BreastShape (YoungAdult) | Wide-Pendulous |
| BreastShape (RipeningMilf) | Pendulous |
| BreastShape (RipeMilf) | Pendulous |
| BreastShape (MatureMilf) | Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | Soft |
| NippleGroup | G–H |
| NippleTypes | Wide · LargeProtruding · Long |

---

## BT-F-18 · ZAFTIG

**Silhouette:** Pleasantly plump. Soft curves everywhere, approachable fullness. Between Voluptuous and Rubenesque.

**File token:** `zaftig`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 70–80 | 94–106 | 94–108 | 74–88 |
| Short | 150–157 | 72–82 | 96–108 | 96–110 | 76–90 |
| BelowAverage | 158–162 | 74–84 | 98–110 | 98–112 | 78–92 |
| Average | 163–167 | 76–86 | 100–112 | 100–114 | 80–94 |
| AboveAverage | 168–172 | 78–88 | 102–114 | 102–116 | 82–96 |
| Tall | 173–179 | 80–90 | 104–116 | 104–118 | 84–98 |
| VeryTall | 180+ | 82–92 | 106–118 | 106–120 | 86–100 |

| Attribute | Value |
|-----------|-------|
| AssShape | Wide–Round |
| AssSize | Massive |
| AssSoftness | Pillowy |
| StomachType | Soft–Pudgy |
| StomachSoftness | VerySoft–Doughy |
| MuscleTone | Soft |
| Thigh | Heavy |
| Legs | Very heavy |
| Arms | Full, soft |
| AllowedCups (breast overlay) | D–K |
| SweetSpot | F–H  (reference cup: G) |
| BreastShape (ref cup G, Young) | Wide / Teardrop |
| BreastShape (YoungAdult) | Wide |
| BreastShape (RipeningMilf) | Wide |
| BreastShape (RipeMilf) | Wide-Pendulous |
| BreastShape (MatureMilf) | Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | Soft |
| NippleGroup | G–H |
| NippleTypes | Wide · LargeProtruding · Long |

---

## BT-F-19 · RUBENESQUE

**Silhouette:** Classical full figure. Majestic, soft everywhere. Maximum natural fullness.

**File token:** `rubenesque`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 76–88 | 100–114 | 100–116 | 72.5–88.5 |
| Short | 150–157 | 78–90 | 102–116 | 102–118 | 74.5–90.5 |
| BelowAverage | 158–162 | 80–92 | 104–118 | 104–120 | 76.5–92.5 |
| Average | 163–167 | 82–94 | 106–120 | 106–122 | 78.5–94.5 |
| AboveAverage | 168–172 | 84–96 | 108–122 | 108–124 | 80.5–96.5 |
| Tall | 173–179 | 86–98 | 110–124 | 110–126 | 82.5–98.5 |
| VeryTall | 180+ | 88–100 | 112–126 | 112–128 | 84.5–100.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Wide–Square |
| AssSize | Massive |
| AssSoftness | Pillowy |
| StomachType | Plump |
| StomachSoftness | Doughy |
| MuscleTone | None–Soft |
| Thigh | Heavy |
| Legs | Maximum fullness |
| Arms | Full, Soft |
| AllowedCups (breast overlay) | F–Q |
| SweetSpot | H–K  (reference cup: J) |
| BreastShape (ref cup J, Young) | Wide / Pendulous |
| BreastShape (YoungAdult) | Pendulous / Wide |
| BreastShape (RipeningMilf) | Pendulous |
| BreastShape (RipeMilf) | Pendulous |
| BreastShape (MatureMilf) | Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | VerySoft |
| NippleGroup | I–K |
| NippleTypes | LargeProtruding · Wide · Long |

---

## BT-F-20 · ATHLETIC CURVY

**Silhouette:** Muscled body with retained curves. Fit but hip and bust both present.

**File token:** `athletic_curvy`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 58–64 | 86–94 | 86–96 | 73.5–83.5 |
| Short | 150–157 | 60–66 | 88–96 | 88–98 | 75.5–85.5 |
| BelowAverage | 158–162 | 62–68 | 90–98 | 90–100 | 77.5–87.5 |
| Average | 163–167 | 64–70 | 92–100 | 92–102 | 79.5–89.5 |
| AboveAverage | 168–172 | 66–72 | 94–102 | 94–104 | 81.5–91.5 |
| Tall | 173–179 | 68–74 | 96–104 | 96–106 | 83.5–93.5 |
| VeryTall | 180+ | 70–76 | 98–106 | 98–108 | 85.5–95.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Bubble–Heart |
| AssSize | Large–VeryLarge |
| AssSoftness | Firm–Toned |
| StomachType | Toned |
| StomachSoftness | Firm |
| MuscleTone | Athletic–Defined |
| Thigh | Muscled-Full |
| Legs | Defined, muscled curves |
| Arms | Visible lean muscle |
| AllowedCups (breast overlay) | B–G |
| SweetSpot | C–E  (reference cup: DD) |
| BreastShape (ref cup DD, Young) | Round / Teardrop |
| BreastShape (YoungAdult) | Teardrop / Round |
| BreastShape (RipeningMilf) | Teardrop |
| BreastShape (RipeMilf) | Wide-Teardrop |
| BreastShape (MatureMilf) | Wide-Sagging |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | MediumFirm (+1) |
| NippleGroup | D–DD |
| NippleTypes | Protruding · Wide · Puffy |
| BreastNote | AthleticCurvy — authored one step firmer at every cup × age. |

---

## BT-F-21 · MUSCULAR FEMININE

**Silhouette:** Visible muscle definition throughout with retained femininity. Fighter/warrior body.

**File token:** `muscular_feminine`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 60–68 | 84–92 | 82–92 | 74.5–84.5 |
| Short | 150–157 | 62–70 | 86–94 | 84–94 | 76.5–86.5 |
| BelowAverage | 158–162 | 64–72 | 88–96 | 86–96 | 78.5–88.5 |
| Average | 163–167 | 66–74 | 90–98 | 88–98 | 80.5–90.5 |
| AboveAverage | 168–172 | 68–76 | 92–100 | 90–100 | 82.5–92.5 |
| Tall | 173–179 | 70–78 | 94–102 | 92–102 | 84.5–94.5 |
| VeryTall | 180+ | 72–80 | 96–104 | 94–104 | 86.5–96.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Heart–Round (muscle-shaped) |
| AssSize | Full–Large |
| AssSoftness | Firm–Toned |
| StomachType | Toned |
| StomachSoftness | Hard |
| MuscleTone | Muscular |
| Thigh | Heavy-Muscled |
| Legs | Dense, muscled |
| Arms | Defined muscle, wide |
| AllowedCups (breast overlay) | A–Q (muscle compresses apparent size) |
| SweetSpot | B–D  (reference cup: C) |
| BreastShape (ref cup F, Young) | Teardrop / Wide |
| BreastShape (YoungAdult) | Wide / Teardrop |
| BreastShape (RipeningMilf) | Wide |
| BreastShape (RipeMilf) | Wide |
| BreastShape (MatureMilf) | Sagging-Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | MediumFirm |
| NippleGroup | E–F |
| NippleTypes | Protruding · Wide · LargeProtruding |

---

## BT-F-22 · PETITE HOURGLASS
*(Petite heights only)*

**Silhouette:** Compact hourglass. All proportions small but ratio maintained.
Bust ≈ hip (within 4 cm). Waist 28–32 cm less than hip.

**File token:** `petite_hourglass`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 52–58 | 80–88 | 80–88 | 72.5–80.5 |
| Short | 150–157 | 54–60 | 82–90 | 82–90 | 74.5–82.5 |
| BelowAverage | 158–162 | 56–62 | 84–92 | 84–92 | 76.5–84.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Heart–Round |
| AssSize | Moderate–Full |
| AssSoftness | Firm–Soft |
| StomachType | Flat |
| StomachSoftness | Soft–Firm |
| MuscleTone | Light |
| Thigh | Moderate |
| Legs | Short, curved |
| Arms | Slim, short |
| AllowedCups (breast overlay) | A–G |
| SweetSpot | B–D  (reference cup: C) |
| BreastShape (ref cup DD, Young) | Round / Teardrop |
| BreastShape (YoungAdult) | Teardrop / Round |
| BreastShape (RipeningMilf) | Teardrop |
| BreastShape (RipeMilf) | Wide-Teardrop |
| BreastShape (MatureMilf) | Wide-Sagging |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | MediumFirm (+1) |
| NippleGroup | D–DD |
| NippleTypes | Protruding · Wide · Puffy |
| BreastNote | CompactPower — authored one step firmer at every cup × age. |

---

## BT-F-23 · MINI VOLUPTUOUS
*(Petite heights only)*

**Silhouette:** Short and maximally curvy for the frame. Generous everything on compact body.

**File token:** `mini_voluptuous`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 58–66 | 88–98 | 88–100 | 70.5–82.5 |
| Short | 150–157 | 60–68 | 90–100 | 90–102 | 72.5–84.5 |
| BelowAverage | 158–162 | 62–70 | 92–102 | 92–104 | 74.5–86.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Bubble–Wide |
| AssSize | VeryLarge |
| AssSoftness | VerySoft |
| StomachType | Soft |
| StomachSoftness | Soft–VerySoft |
| MuscleTone | Soft |
| Thigh | Heavy relative to height |
| Legs | Short, very full |
| Arms | Soft, short |
| AllowedCups (breast overlay) | C–H |
| SweetSpot | E–G  (reference cup: F) |
| BreastShape (ref cup F, Young) | Teardrop / Wide |
| BreastShape (YoungAdult) | Wide / Teardrop |
| BreastShape (RipeningMilf) | Wide |
| BreastShape (RipeMilf) | Wide |
| BreastShape (MatureMilf) | Sagging-Pendulous |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | MediumFirm |
| NippleGroup | E–F |
| NippleTypes | Protruding · Wide · LargeProtruding |

---

## BT-F-24 · COMPACT POWER
*(Typically VeryShort–BelowAverage but not restricted)*

**Silhouette:** Dense and muscled in a compact frame. Power body. Dwarf and orc default.

**File token:** `compact_power`


| HeightTag | cm | Waist | Hip | Bust equiv (composite, at ref cup) | Underbust (derived) |
|-----------|-------|-------|-------|------------------------------------|---------------------|
| VeryShort | 140–149 | 62–72 | 84–94 | 84–96 | 71.5–83.5 |
| Short | 150–157 | 64–74 | 86–96 | 86–98 | 73.5–85.5 |
| BelowAverage | 158–162 | 66–76 | 88–98 | 88–100 | 75.5–87.5 |
| Average | 163–167 | 68–78 | 90–100 | 90–102 | 77.5–89.5 |
| AboveAverage | 168–172 | 70–80 | 92–102 | 92–104 | 79.5–91.5 |
| Tall | 173–179 | 72–82 | 94–104 | 94–106 | 81.5–93.5 |
| VeryTall | 180+ | 74–84 | 96–106 | 96–108 | 83.5–95.5 |

| Attribute | Value |
|-----------|-------|
| AssShape | Square–Round (muscle) |
| AssSize | Large |
| AssSoftness | Firm–Toned |
| StomachType | Toned |
| StomachSoftness | Firm–Hard |
| MuscleTone | Muscular |
| Thigh | Heavy-Muscled, short |
| Legs | Dense, short |
| Arms | Wide, muscled |
| AllowedCups (breast overlay) | B–F |
| SweetSpot | D–E  (reference cup: DD) |
| BreastShape (ref cup DD, Young) | Round / Teardrop |
| BreastShape (YoungAdult) | Teardrop / Round |
| BreastShape (RipeningMilf) | Teardrop |
| BreastShape (RipeMilf) | Wide-Teardrop |
| BreastShape (MatureMilf) | Wide-Sagging |
| BreastShape (OldMilf) | Pendulous |
| BreastSoftness (Young, ref cup) | MediumFirm (+1) |
| NippleGroup | D–DD |
| NippleTypes | Protruding · Wide · Puffy |
| BreastNote | CompactPower — authored one step firmer at every cup × age. |

---

# PART 3 — BREAST SYSTEM (breast overlays)

Breasts are **not part of the body doll**. They are an overlay set, and **every body type, at every height and age tier, has its own** — nothing is scaled to fit one body from another.

| Set | Keyed by | Count |
|-----|----------|------:|
| Breast sprites | body type × age tier (6) × height × every allowed cup — one per valid composite | 8,412 |
| Female nipple sprites | body type × every supported nipple (cup group × type) × 3 arousal states — **same for every age and height** | 945 |
| Male nipple sprites | male body type (7) × size (3) × 3 arousal states | 63 |
| Supernatural sprites | body type × height × cup, no age — **on demand** | 1,402 if built in full |

Each breast or nipple sprite is the **left** side; the right is its mirror. A body type **supports a nipple** when any of its allowed cups falls in that nipple's cup group. Arousal states: `unaroused`, `light` (lightly aroused), `extreme` (extremely aroused) — they change the nipple's shape only; colour comes from the skin tone's nipple mapping.

## Cup ladder

| Pos | Cup | Notes |
|-----|-----|-------|
| 1 | AA |  |
| 2 | A |  |
| 3 | B |  |
| 4 | C |  |
| 5 | D |  |
| 6 | DD | Rendered cup (v2.2). Sits between D and E; included in any range that spans D to E |
| 7 | E |  |
| 8 | F |  |
| 9 | G |  |
| 10 | H |  |
| 11 | I |  |
| 12 | J |  |
| 13 | K |  |
| 14 | L | New in v2.1 — first cup above K |
| 15 | M |  |
| 16 | N |  |
| 17 | O |  |
| 18 | P |  |
| 19 | Q | New in v2.1 — ladder ceiling |

**DD** is a full ladder position and a rendered card. A body type includes DD whenever its cup range runs from D (or lower) to E (or higher) — 17 of the 24 types. For the three types whose sweet spot spans D to E (HourglassCurvy, AthleticCurvy, CompactPower) DD is a **core** cup; for the others it is an **extended** cup.

## Cup size availability by BodyType (compatibility: which breast sprites may be attached)


| BodyType | Min cup | Max cup | Sweet spot |
|----------|---------|---------|------------|
| BT-F-01 Androgynous | AA | B | AA–A |
| BT-F-02 PetiteSlim | AA | C | A–B |
| BT-F-03 PetiteCurvy | A | G | B–C |
| BT-F-04 Willowy | AA | C | A–B |
| BT-F-05 Athletic | A | H | B–C |
| BT-F-06 SlimStraight | AA | C | A–B |
| BT-F-07 SlimCurvy | B | F | C |
| BT-F-08 BananaShape | AA | F | A–B |
| BT-F-09 PearShape | AA | K | A–C |
| BT-F-10 SpoonShape | A | K | B–C |
| BT-F-11 HourglassSlim | A | F | B–D |
| BT-F-12 HourglassCurvy | C | K | D–E |
| BT-F-13 HourglassFullBust | E | Q | F–H |
| BT-F-14 TopHeavy | D | Q | F–H |
| BT-F-15 BottomHeavy | AA | E | A–C |
| BT-F-16 FullFigured | D | Q | E–G |
| BT-F-17 Voluptuous | E | Q | G–I |
| BT-F-18 Zaftig | D | K | F–H |
| BT-F-19 Rubenesque | F | Q | H–K |
| BT-F-20 AthleticCurvy | B | G | C–E |
| BT-F-21 MuscularFeminine | A | Q | B–D |
| BT-F-22 PetiteHourglass | A | G | B–D |
| BT-F-23 MiniVoluptuous | C | H | E–G |
| BT-F-24 CompactPower | B | F | D–E |

### Derived: reference cup and counts per type

`Reference cup` = first sweet-spot cup + ⌊n/2⌋ (n = number of sweet-spot cups). It is the cup at which the Part 2 `Bust equiv` column is valid. DD is counted wherever the range spans D to E.


| BodyType | Reference cup | # cups in range | # sweet-spot (core) | # extended | # heights |
|----------|---------------|-----------------|---------------------|------------|-----------|
| BT-F-01 Androgynous | A | 3 | 2 | 1 | 7 |
| BT-F-02 PetiteSlim | B | 4 | 2 | 2 | 3 |
| BT-F-03 PetiteCurvy | C | 8 | 2 | 6 | 3 |
| BT-F-04 Willowy | B | 4 | 2 | 2 | 3 |
| BT-F-05 Athletic | C | 9 | 2 | 7 | 7 |
| BT-F-06 SlimStraight | B | 4 | 2 | 2 | 7 |
| BT-F-07 SlimCurvy | C | 6 | 1 | 5 | 7 |
| BT-F-08 BananaShape | B | 8 | 2 | 6 | 7 |
| BT-F-09 PearShape | B | 13 | 3 | 10 | 7 |
| BT-F-10 SpoonShape | C | 12 | 2 | 10 | 7 |
| BT-F-11 HourglassSlim | C | 7 | 3 | 4 | 7 |
| BT-F-12 HourglassCurvy | DD | 10 | 3 | 7 | 7 |
| BT-F-13 HourglassFullBust | G | 13 | 3 | 10 | 7 |
| BT-F-14 TopHeavy | G | 15 | 3 | 12 | 7 |
| BT-F-15 BottomHeavy | B | 7 | 3 | 4 | 7 |
| BT-F-16 FullFigured | F | 15 | 3 | 12 | 7 |
| BT-F-17 Voluptuous | H | 13 | 3 | 10 | 7 |
| BT-F-18 Zaftig | G | 9 | 3 | 6 | 7 |
| BT-F-19 Rubenesque | J | 12 | 4 | 8 | 7 |
| BT-F-20 AthleticCurvy | DD | 7 | 4 | 3 | 7 |
| BT-F-21 MuscularFeminine | C | 18 | 3 | 15 | 7 |
| BT-F-22 PetiteHourglass | C | 8 | 3 | 5 | 3 |
| BT-F-23 MiniVoluptuous | F | 7 | 3 | 4 | 3 |
| BT-F-24 CompactPower | DD | 6 | 3 | 3 | 7 |

## Cup-step bust offset

Each step up or down the cup ladder from the type's **reference cup** changes the composite bust circumference by about **2.5 cm** (underbust unchanged).

`Bust(cup) = BustEquiv(Part 2) + 2.5 cm × (ladder position of cup − ladder position of reference cup)`

Example: BT-F-12 HourglassCurvy, Average height, reference cup DD, bust equiv 94–102. A K cup is 7 steps higher → 111.5–119.5 cm. A C cup is 2 steps lower → 89–97 cm. (DD counts as a step.)

Cups L–Q are confirmed renderable on the HS2 sliders. The task list still keeps one quick check at the smallest frames (P0-6) before bulk building.

## Underbust and the body doll

The body doll has no bust, so it is built to an **underbust** target: `Underbust = BustEquiv(at reference cup) − 2.5 cm × (reference-cup ladder position − 1)` (AA = position 1 = zero bust-over-underbust). Part 2 shows the derived value per type and height. The breast sprite adds `2.5 cm × (cup position − 1)` back on top.

## How a sprite is placed

A sprite is authored on **its own doll** (that body type, age tier and height) and is **only translated** to the doll's BREAST_L / BREAST_R anchors (mirrored for the right) — never scaled. Height and age are both part of the key, so a sprite never has to fit a different body than the one it was drawn on. Nipple sprites are authored once per body type; the nipple's position for each breast sprite is stored in that sprite's JSON.

---

## Breast shape — role in the build pipeline

**Shape is baked into each breast sprite.** It is not a separate overlay and does not add to the sprite count. When you author `breast_f_young_165_hourglass_curvy_D.png` you author it as **Teardrop / Round** (primary / blend). Look up the cup row and age column in the table below before you open HS2 for any sprite — or use the quick-reference card that follows it.

**Reading the cells:** `X / Y` = primary shape with a secondary blend (≈70 % X, 30 % Y). `X-Y` = equal 50 / 50 blend. Author to the primary first; the blend softens the silhouette toward Y. When in doubt, favour the primary.

**Where this appears in the task list:** every Phase 6 breast-sprite grid row now has an implicit **Shape** value — look up cup × age here, or use the quick-reference card, before starting each sprite.

## Breast shape by CupSize + AgeBodyCategory

| Cup | Young | YoungAdult | RipeningMilf | RipeMilf | MatureMilf | OldMilf |
|-------|-------|------------|--------------|----------|------------|---------|
| AA | Flat / Conical | Flat / Conical | Flat | Flat | Flat | Flat |
| A | Perky / Conical | Perky | Perky | Round | Round | Sagging-slight |
| B | Perky / Round | Round / Perky | Round | Round | Teardrop | Sagging-light |
| C | Round / Perky | Round | Round | Round-Teardrop | Teardrop | Sagging |
| D | Round / Teardrop | Teardrop / Round | Teardrop | Teardrop | Teardrop-Wide | Sagging-Pendulous |
| DD | Round / Teardrop | Teardrop / Round | Teardrop | Wide-Teardrop | Wide-Sagging | Pendulous |
| E | Round / Teardrop | Teardrop | Wide-Teardrop | Wide | Sagging | Pendulous |
| F | Teardrop / Wide | Wide / Teardrop | Wide | Wide | Sagging-Pendulous | Pendulous |
| G | Wide / Teardrop | Wide | Wide | Wide-Pendulous | Pendulous | Pendulous |
| H | Wide / Pendulous | Wide-Pendulous | Pendulous | Pendulous | Pendulous | Pendulous |
| I–K | Wide / Pendulous | Pendulous / Wide | Pendulous | Pendulous | Pendulous | Pendulous |
| L–N | Pendulous / Wide | Pendulous | Pendulous | Pendulous | Pendulous | Pendulous |
| O–Q | Pendulous | Pendulous | Pendulous | Pendulous | Pendulous | Pendulous |

*YoungAdult column and the L–N / O–Q rows added in v2.1 (interpolated — review when you first render them). "X / Y" = primary / blend.*

**Exception — supernatural tissue (Succubus, Goddess, Angel):**
Round (cup C and below) or Teardrop (cup D and above) only, at any cup size. No age drift. Always High position. Always Firm or MediumFirm softness. Author with no lateral spread or sag even at large cups — disable physics on the breast rig.

---

## Breast shape quick-reference card *(pin this while building Phase 6)*

> Same data as the full table, collapsed for fast lookup mid-build. Young and YoungAdult shown side by side separated by →.

| Cup | Young shape | YoungAdult shape | RipeningMilf | RipeMilf | MatureMilf | OldMilf |
|-----|------------|-----------------|-------------|----------|-----------|---------|
| AA | Flat / Conical | Flat / Conical | Flat | Flat | Flat | Flat |
| A | Perky / Conical | Perky | Perky | Round | Round | Sagging-slight |
| B | Perky / Round | Round / Perky | Round | Round | Teardrop | Sagging-light |
| C | Round / Perky | Round | Round | Round-Teardrop | Teardrop | Sagging |
| D | Round / Teardrop | Teardrop / Round | Teardrop | Teardrop | Teardrop-Wide | Sagging-Pendulous |
| DD | Round / Teardrop | Teardrop / Round | Teardrop | Wide-Teardrop | Wide-Sagging | Pendulous |
| E | Round / Teardrop | Teardrop | Wide-Teardrop | Wide | Sagging | Pendulous |
| F | Teardrop / Wide | Wide / Teardrop | Wide | Wide | Sagging-Pendulous | Pendulous |
| G | Wide / Teardrop | Wide | Wide | Wide-Pendulous | Pendulous | Pendulous |
| H | Wide / Pendulous | Wide-Pendulous | Pendulous | Pendulous | Pendulous | Pendulous |
| I–K | Wide / Pendulous | Pendulous / Wide | Pendulous | Pendulous | Pendulous | Pendulous |
| L–N | Pendulous / Wide | Pendulous | Pendulous | Pendulous | Pendulous | Pendulous |
| O–Q | Pendulous | Pendulous | Pendulous | Pendulous | Pendulous | Pendulous |

*Supernatural override: Round ≤C · Teardrop ≥D · always High · always Firm or MediumFirm · no sag · no spread.*

## Breast softness by CupSize + AgeBodyCategory


| Cup | Young | YoungAdult | RipeningMilf | RipeMilf | MatureMilf | OldMilf |
|-------|-------|------------|--------------|----------|------------|---------|
| AA–A | Firm | Firm | Firm | MediumFirm | Soft | Soft |
| B–C | Firm | Firm–MediumFirm | MediumFirm | Soft | Soft | VerySoft |
| D–DD | MediumFirm | MediumFirm–Soft | Soft | Soft | VerySoft | Pillowy |
| E–F | MediumFirm | MediumFirm–Soft | Soft | VerySoft | Pillowy | Pillowy |
| G–H | Soft | Soft–VerySoft | VerySoft | Pillowy | Pillowy | Pillowy |
| I–K | VerySoft | VerySoft–Pillowy | Pillowy | Pillowy | Pillowy | Pillowy |
| L–N | VerySoft–Pillowy | Pillowy | Pillowy | Pillowy | Pillowy | Pillowy |
| O–Q | Pillowy | Pillowy | Pillowy | Pillowy | Pillowy | Pillowy |

*"X–Y" = midpoint between the two steps on the softness slider.*

**Athletic / Muscular modifier:** +1 firmness step at any cup × age combination (applies to BT-F-05, 20, 21, 24); their sprites are authored one step firmer.
**Supernatural exception:** Always Firm or MediumFirm regardless of cup or age.

## Breast softness quick-reference card *(pin this while building Phase 6)*

| Cup | Young | YoungAdult | RipeningMilf | RipeMilf | MatureMilf | OldMilf |
|-----|-------|------------|-------------|----------|-----------|---------|
| AA–A | Firm | Firm | Firm | MediumFirm | Soft | Soft |
| B–C | Firm | Firm–MediumFirm | MediumFirm | Soft | Soft | VerySoft |
| D–DD | MediumFirm | MediumFirm–Soft | Soft | Soft | VerySoft | Pillowy |
| E–F | MediumFirm | MediumFirm–Soft | Soft | VerySoft | Pillowy | Pillowy |
| G–H | Soft | Soft–VerySoft | VerySoft | Pillowy | Pillowy | Pillowy |
| I–K | VerySoft | VerySoft–Pillowy | Pillowy | Pillowy | Pillowy | Pillowy |
| L–N | VerySoft–Pillowy | Pillowy | Pillowy | Pillowy | Pillowy | Pillowy |
| O–Q | Pillowy | Pillowy | Pillowy | Pillowy | Pillowy | Pillowy |

*Athletic / Muscular (F-05, F-20, F-21, F-24): shift every cell one step firmer. Supernatural: always Firm or MediumFirm.*

---

## Breast position by AgeBodyCategory


| Age | Position |
|-------|----------|
| Young | High |
| YoungAdult | High (−½ step) |
| RipeningMilf | High-Medium |
| RipeMilf | Medium |
| MatureMilf | Medium-Low |
| OldMilf | Low |

---

## Nipple type by CupSize


| Cup | Common NippleTypes |
|-------|--------------------|
| AA–A | Flat · Puffy · Inverted |
| B–C | Puffy · Protruding · Flat |
| D–DD | Protruding · Wide · Puffy |
| E–F | Protruding · Wide · LargeProtruding |
| G–H | Wide · LargeProtruding · Long |
| I–K | LargeProtruding · Wide · Long |
| L–N | LargeProtruding · Wide · Long (areola scaled up with cup) |
| O–Q | LargeProtruding · Wide · Long (areola scaled up with cup) |

## Nipple type quick-reference card *(pin this while building Phase 6)*

> Nipple sprites are per body type × cup group × arousal state — not per age or height. Each sprite covers all ages at that body type. Three states per sprite: `unaroused` · `light` · `extreme`.

| Cup group | Primary nipple | Alternates | File token |
|-----------|---------------|-----------|-----------|
| AA–A | Flat | Puffy · Inverted | `flat_AA-A` |
| B–C | Puffy | Protruding · Flat | `puffy_B-C` |
| D–DD | Protruding | Wide · Puffy | `protruding_D-DD` |
| E–F | Protruding | Wide · LargeProtruding | `protruding_E-F` |
| G–H | Wide | LargeProtruding · Long | `wide_G-H` |
| I–K | LargeProtruding | Wide · Long | `largeprotruding_I-K` |
| L–N | LargeProtruding | Wide · Long (areola ++) | `largeprotruding_L-N` |
| O–Q | LargeProtruding | Wide · Long (areola ++) | `largeprotruding_O-Q` |

*Build all three alternates for each group — primary first, then the two alternates — each in all three arousal states. File name: `nipple_f_{bodytype}_{type}_{group}_{state}.png`.*

---

## Nipple color by skin tone group


| Skin tone group | NippleColor |
|-----------------|-------------|
| Porcelain · Ivory · Fair | LightPink · Pink |
| Light · LightMedium | Pink · Rose |
| Medium · MediumTan | Rose · Peach |
| Tan · Olive · Golden | Peach · Tan |
| Caramel · Chestnut | Tan · Brown |
| Brown · DeepBrown · Ebony | Brown · DarkBrown · DeepBrown |
| AshGrey · PaleBlue (cool fantasy) | Pink (pale marker) |
| Crimson · TealGreen (warm fantasy) | Brown |
| GoldenMetallic · ObsidianBlack | DarkBrown |
| Ruddy *(added v2.2)* | Peach · Tan |
| DeepPurple *(added v2.2)* | DarkBrown |


---

# PART 4 — AGE MODIFIER TABLE

Apply these modifiers on top of the Young baseline. **Breast rows apply to the breast overlay sprites; all other rows apply to the body doll.** `YoungAdult` = half-step between Young and RipeningMilf.


| Attribute | Young | YoungAdult | RipeningMilf | RipeMilf | MatureMilf | OldMilf |
|-----------|-------|------------|--------------|----------|------------|---------|
| Breast position | High | High (−½) | High-Med | Medium | Med-Low | Low |
| Breast softness | Per cup table | +½ step | +1 step | +2 steps | +3 steps | Max soft |
| Breast shape | Per cup table | Trace drift | Slight drift | Moderate drift | Notable drift | Full age shape |
| Stomach | Flat/Toned | Flat/Toned | Slight soft | Soft | Soft | Pudgy |
| Stomach softness | Firm | Firm–Soft | Soft | Soft | VerySoft | Doughy |
| Ass softness | Firm/Toned | Firm/Toned (+½) | Toned-Soft | Soft | VerySoft | Pillowy |
| Waist | Base | +1–2 cm | +2–4 cm | +4–6 cm | +6–10 cm | +10–14 cm |
| Hip | Base | +0–1 cm | +0–2 cm | +2–4 cm | +4–6 cm | +6–8 cm |
| Skin texture | Smooth/Normal | Smooth–Normal | Smooth-Normal | Normal | Normal-Rough | Rough |
| Muscle tone | Per type | Per type | -1 step | -1 step | -2 steps | -2 steps |

---

# PART 5 — ASS SYSTEM FULL TABLE

## AssShape descriptions


| Shape | Description |
|-------|-------------|
| Flat | Minimal projection, blends into thigh |
| Round | Even spherical projection |
| Square | Wide and angular, shelf-like |
| Heart | Narrower at top, fuller at lower cheek |
| Bubble | Pronounced spherical — maximum projection |
| Wide | Broad lateral spread, more width than projection |
| Pear | Maximum bottom-width, narrowest at top of cheeks |

## AssSize × AssSoftness quick reference


| AssSize | Description | Young softness | YoungAdult softness | MatureMilf softness |
|---------|-------------|----------------|---------------------|---------------------|
| Flat | Negligible | Firm | Firm | Soft |
| Small | Present but minimal | Firm | Firm | Soft |
| Moderate | Noticeable | Firm | Firm–Soft | Soft-VerySoft |
| Full | Present, rounded | Firm-Soft | Soft | VerySoft |
| Large | Prominent | Soft | Soft–VerySoft | Pillowy |
| VeryLarge | Very prominent | Soft-VerySoft | VerySoft | Pillowy |
| Massive | Maximum | VerySoft | VerySoft–Pillowy | Pillowy |

*YoungAdult column is new in v2.1 (Young + ½ step for sizes Moderate and up).*

---

# PART 6 — MALE BODY TYPE CATALOG

## BT-M-01 · ANDROGYNOUS

**File token:** `androgynous`


| HeightTag | cm | Waist | Hip |
|-----------|-------|-------|-------|
| VeryShort | 150–159 | 64–70 | 80–86 |
| Short | 160–167 | 66–72 | 82–88 |
| BelowAverage | 168–171 | 68–74 | 84–90 |
| Average | 172–176 | 70–76 | 86–92 |
| AboveAverage | 177–181 | 72–78 | 88–94 |
| Tall | 182–189 | 74–80 | 90–96 |
| VeryTall | 190+ | 76–82 | 92–98 |

MuscleTone: None–Light · StomachType: Flat · CockType: Straight / Uniform typical

---

## BT-M-02 · LEAN

**File token:** `lean`


| HeightTag | cm | Waist | Hip |
|-----------|-------|-------|-------|
| VeryShort | 150–159 | 68–74 | 82–88 |
| Short | 160–167 | 70–76 | 84–90 |
| BelowAverage | 168–171 | 72–78 | 86–92 |
| Average | 172–176 | 74–80 | 88–94 |
| AboveAverage | 177–181 | 76–82 | 90–96 |
| Tall | 182–189 | 78–84 | 92–98 |
| VeryTall | 190+ | 80–86 | 94–100 |

MuscleTone: Light–Toned · StomachType: Flat

---

## BT-M-03 · AVERAGE

**File token:** `average`


| HeightTag | cm | Waist | Hip |
|-----------|-------|-------|-------|
| VeryShort | 150–159 | 74–80 | 86–92 |
| Short | 160–167 | 76–82 | 88–94 |
| BelowAverage | 168–171 | 78–84 | 90–96 |
| Average | 172–176 | 80–86 | 92–98 |
| AboveAverage | 177–181 | 82–88 | 94–100 |
| Tall | 182–189 | 84–90 | 96–102 |
| VeryTall | 190+ | 86–92 | 98–104 |

MuscleTone: Light–Toned · StomachType: Flat–Soft

---

## BT-M-04 · ATHLETIC

**File token:** `athletic`


| HeightTag | cm | Waist | Hip |
|-----------|-------|-------|-------|
| VeryShort | 150–159 | 72–78 | 86–92 |
| Short | 160–167 | 74–80 | 88–94 |
| BelowAverage | 168–171 | 76–82 | 90–96 |
| Average | 172–176 | 78–84 | 92–98 |
| AboveAverage | 177–181 | 80–86 | 94–100 |
| Tall | 182–189 | 82–88 | 96–102 |
| VeryTall | 190+ | 84–90 | 98–104 |

MuscleTone: Athletic–Defined · StomachType: Flat–Toned

---

## BT-M-05 · MUSCULAR

**File token:** `muscular`


| HeightTag | cm | Waist | Hip |
|-----------|-------|-------|-------|
| VeryShort | 150–159 | 76–84 | 88–96 |
| Short | 160–167 | 78–86 | 90–98 |
| BelowAverage | 168–171 | 80–88 | 92–100 |
| Average | 172–176 | 82–90 | 94–102 |
| AboveAverage | 177–181 | 84–92 | 96–104 |
| Tall | 182–189 | 86–94 | 98–106 |
| VeryTall | 190+ | 88–96 | 100–108 |

MuscleTone: Muscular · StomachType: Toned

---

## BT-M-06 · STOCKY

**File token:** `stocky`


| HeightTag | cm | Waist | Hip |
|-----------|-------|-------|-------|
| VeryShort | 150–159 | 80–90 | 88–98 |
| Short | 160–167 | 82–92 | 90–100 |
| BelowAverage | 168–171 | 84–94 | 92–102 |
| Average | 172–176 | 86–96 | 94–104 |
| AboveAverage | 177–181 | 88–98 | 96–106 |
| Tall | 182–189 | 90–100 | 98–108 |
| VeryTall | 190+ | 92–102 | 100–110 |

MuscleTone: Toned–Muscular · StomachType: Soft

---

## BT-M-07 · HYPERMASCULINE

**File token:** `hypermasculine`


| HeightTag | cm | Waist | Hip |
|-----------|-------|-------|-------|
| VeryShort | 150–159 | 82–92 | 90–100 |
| Short | 160–167 | 84–94 | 92–102 |
| BelowAverage | 168–171 | 86–96 | 94–104 |
| Average | 172–176 | 88–98 | 96–106 |
| AboveAverage | 177–181 | 90–100 | 98–108 |
| Tall | 182–189 | 92–102 | 100–110 |
| VeryTall | 190+ | 94–104 | 102–112 |

MuscleTone: Muscular · StomachType: Toned · Widest shoulder-to-waist ratio

---

# PART 7 — LABIA + COCK REFERENCE

The body doll carries **no genital detail** (a smooth neutral crotch). The types below, and the pubic-hair styles, are **overlays** placed on top of it. They are built **once per gender** and only translated into place (decision D-30 in the task list).

## LabiaType (Female)


| Type | Description |
|-------|-------------|
| InnerHidden | Inner fully within outer. Neat, minimal. |
| InnerSmall | Slight inner lip visible at edges. |
| InnerModerate | Clearly visible inner lip. Most common. |
| InnerProminent | Extends beyond outer. Visible at rest. |
| InnerLarge | Significantly extended, ruffly. |
| OuterProminent | Outer labia dominant, full and plump. |

## CockType (Male)


| Type | Description |
|-------|-------------|
| Straight | No curve |
| CurvedUp | Upward arc |
| CurvedDown | Downward arc |
| CurvedLeft | Left lateral |
| CurvedRight | Right lateral |
| Tapered | Narrows at tip |
| Flared | Widens at tip |
| Uniform | Even width |
| Knotted | Bulge at base |
| Barbed | Ridged edges |
| Ridged | Horizontal ridges along shaft |
| Bifurcated | Forked tip |

## PubicHairStyle


| Style | Description |
|-------|-------------|
| None | Bare |
| LightTrim | Minimal, kept |
| Trimmed | Neat, reduced |
| FullNatural | Unmodified |
| LandingStrip | Central vertical strip |
| Triangle | Triangular patch |
| Stubble | Recent shave regrowth |

---

# PART 8 — RACE OVERLAY ASSETS
# These are separate layers dropped onto the body doll.
# The doll itself doesn't change — only these elements.
# Tails, wings and markings attach to the body doll; ears and horns attach to the face track's head base.

## Ear overlays


| EarType | Description | Used by |
|---------|-------------|---------|
| Human | Standard round | Human, Dwarf, Orc, Vampire |
| ElvenPointed | 5–7 cm point | Wood Elf |
| HighElvenLong | 8–11 cm point | High Elf, Dark Elf |
| AnimalFox | Large pointed, top of head | Fox |
| AnimalWolf | Erect pointed, top of head | Wolf |
| AnimalCow | Floppy, side of head | Cow |
| AnimalCat | Small pointed, top of head | Cat |
| Demonic | Angled back, slightly pointed | Demon, Devil, Succubus |
| AnimalBunny *(added v2.2, proposed)* | Long, upright or lopped, top of head | Bunny |
| DragonRidge *(added v2.2, proposed)* | Scaled ridge / frill at the ear position, no visible ear | Dragonkin |
| None | No visible ear | — |

## Horn overlays


| HornType | Description | Used by |
|----------|-------------|---------|
| None | Clean | Human, Elf, Dwarf, Fox, Wolf, Cow, Vampire, Angel |
| SmallNubs | Tiny decorative | Fairy, Goblin, Succubus small, Orc (rare), Thessaly-type |
| CurvedRam | Curved sweeping back | Demon (house-dependent) |
| StraightPointed | Forward spike | Goblin, Devil |
| DragonCurved | Temple-to-back curve | Dragonkin |
| DemonSpiral | Upward spiral | Demon elder |
| DevilForked | Y-shaped fork | Devil, DevilGirl |
| ThickBull | Thick horizontal | CowGirl/CowBoy |

## Tail overlays


| TailType | Description | Default state |
|----------|-------------|---------------|
| None | — | — |
| Fox | Bushy, 50–70 cm | Upright-relaxed |
| Wolf | Full, 50–65 cm | Low-neutral |
| Cow | Thin with tuft, 50–60 cm | Hanging |
| Dragon | Long scaled, 60–80 cm | Low |
| Demon | Slender pointed | Expressive |
| Devil | Slender arrowhead | Still |
| Cat | Thin, curvy | Expressive |
| Bunny *(added v2.2, proposed)* | Short round puff, 8–12 cm | Still |

## Wing overlays


| WingType | Description | Default |
|----------|-------------|---------|
| None | — | — |
| Feathered | Large white feathered | Folded (deployed in scene) |
| Bat | Leather membrane | Folded |
| Dragon | Scaled membrane | Folded |
| Insect | Translucent, always deployed | Deployed |
| Demonic | Dark membrane | Folded |

## Special race body markings (texture overlays, not tattoos)


| Marking | Description | Race |
|---------|-------------|-------|
| Scale patches | Shoulders · back · thighs · shins · hands | Dragonkin |
| Cow hide spots | Black-white or brown-white patches on hips/shoulders/back | CowGirl/CowBoy |
| Wolf fur collar | Dense fur along neck and collar, upper shoulder blending | Wolf |
| Fox fur patches | Light fur at forearm inner, ear bases, calf back | Fox |
| Clan marks | Arm/shoulder marking (tatoo system, not biological) | Dwarf |
| War marks | Face/shoulder (tattoo system) | Orc |
| House brand | Forearm (tattoo system) | Demon operative |
| Glow runes | Faint luminous lines — visible at full power | Angel |
| Divine aura | Self-luminance — warm or cool domain color | Goddess/God |

---

# PART 9 — SKIN OVERLAY SYSTEM

Every layer here is authored **in UV space** and applied to each part (body doll, breast sprite, nipple, head base) through that part's UV pass, then the parts are composited. Skin features (freckles, scars, blemishes) and tattoos are therefore drawn once and fit every body.

## SkinTone swatches


| SkinTone | Undertone | Gloss level |
|----------|-----------|-------------|
| Porcelain | Cool-pink | 25–35 |
| Ivory | Cool-neutral | 22–32 |
| Fair | Warm-neutral | 18–26 |
| Light | Warm | 14–22 |
| LightMedium | Warm | 12–20 |
| Medium | Neutral | 12–18 |
| MediumTan | Warm | 12–18 |
| Tan | Warm | 10–16 |
| Olive | Olive-warm | 10–16 |
| Golden | Warm-gold | 14–22 |
| Caramel | Warm | 12–18 |
| Chestnut | Warm | 10–16 |
| Brown | Warm-neutral | 10–16 |
| DeepBrown | Warm | 10–16 |
| Ebony | Warm | 10–14 |
| AshGrey | Cool | 18–26 |
| PaleBlue | Cool-blue | 24–34 |
| DeepPurple | Cool-violet | 16–24 |
| TealGreen | Cool-teal | 14–22 |
| GoldenMetallic | Warm-metallic | 44–58 |
| ObsidianBlack | Cool | 12–18 |
| Ruddy | Warm-red | 10–16 |
| Crimson | Warm-deep red | 16–24 |

**Elf luminosity bonus:** +8–12 gloss on top of base SkinTone value
**Succubus bonus:** +10–14 gloss (deliberately appealing surface)
**Vampire bonus:** +10–14 gloss (unnaturally smooth)
**Goddess/Angel:** +18–24 gloss minimum (divine)

## SkinTexture overlays


| Texture | Description | Age typical |
|---------|-------------|-------------|
| VerySmooth | Zero pore, zero variation | Angel, Succubus, Vampire, Young divine |
| Smooth | Minimal texture | Young and YoungAdult characters |
| Normal | Standard skin | Adult baseline |
| Rough | Visible texture, weathered | Outdoor, older |
| Scarred | Scar patterns | Combat veterans |
| Freckled | Pigment scatter | Human/wood elf, redheads |
| Blemished | Minor real marks | Some humans |

## TattooPresence overlays


| Level | Coverage |
|-------|----------|
| None | Clean |
| Minimal | 1–2 small pieces |
| Moderate | Several, partial area |
| Heavy | Large multi-area |
| FullBody | Near-complete |

---

# PART 10 — PRODUCTION (summary — full task list is a separate file)

The step-by-step production task list lives in **`paper_doll_task_list_v3.2.md`** (bodies, breast and nipple sprites, skin, race and anatomy overlays, composites, named characters). Face and hair have their own list: **`paper_doll_face_hair_task_list_v1.1.md`**.

**What gets built (policy A — full coverage):**

| Item | Count |
|------|------:|
| Female body dolls per age tier (type × height) | 148 |
| **Female body dolls, 6 tiers** | **888** |
| Male body dolls (7 types × 7 heights × 6 tiers) | 294 |
| Breast sprites (body type × age tier × height × allowed cup — one per composite) | 8,412 |
| Female nipple sprites (body type × supported nipple × 3 arousal states) | 945 |
| Male nipple sprites (7 types × 3 sizes × 3 states) | 63 |
| **Breast and nipple assets** | **9,420** |
| Anatomy overlays (pubic hair 7 + labia 6 + cock 12, one set per gender) | 25 |

**What is assembled and checked by script:** every valid body + cup combination — **8,412** female composites (1,402 per age tier). Each is one doll + its own breast sprite + a nipple, so composites and breast sprites match one-to-one.

---

*End of body catalog v3.2*




















# Paper Doll Production Task List
## Companion to Body Catalog v3.2 — self-contained working file
### Version 3.2

> **How the system is built (v3.2)**
> - **Body doll** = everything below the face **except** breasts, nipples, pubic hair and genital detail. One doll per (age tier × body type × height). **No cup.** Headless.
> - **Breast sprites** = one per **body type × age tier × height × cup**, authored on that exact doll. **Nothing is scaled** — a sprite is only translated to the doll's breast anchor.
> - **Nipple sprites** = per **body type × supported nipple × 3 arousal states** (unaroused · lightly aroused · extremely aroused). **Identical across ages and heights.**
> - **Other overlays** = skin colour · skin features · wings · tails · pubic hair · labia · cock (**one set per gender**) — plus ears and horns on the face track's heads.
>
> With policy A that is **1,182 body dolls + 8,412 breast sprites + 945 female and 63 male nipple sprites**. Each breast sprite is exactly one valid body + cup combination, so the 8,412 composites are built and checked one-to-one in Phase 10.
>
> Phase numbers (v3.0 onward): 6 Breast & nipple overlays · 7 Skin · 8 Race overlays · 9 Anatomy overlays · 10 Composite verification · 11 Named characters · 12 Release.

---

# 0. HOW TO USE THIS FILE

1. **Work top to bottom.** Each phase ends in a **Gate**. Phases 7, 8 and 9 (skin, race overlays, anatomy) can run in parallel with Phases 2–5 once Gate G0 passes. **Phase 6 (breast sprites) follows the dolls** — build each doll's sprites while its preset is open (P6-1).
2. **Task lines** look like `- [ ] **P3-1.2** …`. Change `[ ]` to `[~]` (in progress), `[x]` (done) or `[!]` (blocked — say why on the same line).
3. **Grids** are the per-asset tracker. One cell = one asset (a body doll or an overlay sprite, each with its UV pass and JSON). Glyphs:

| Glyph | Meaning |
|-------|---------|
| ☐ | To do |
| ◐ | In progress / rendered but not yet through QA |
| ✔ | Done — rendered, QA passed, filed, manifest updated |
| ✖ | Blocked or failed QA (note why under the grid) |
| — | Not applicable (type does not exist at that height / cup or nipple not supported by that type) |

4. **IDs.** Doll set = `F-{age}-{type}-{height}`, e.g. `F-YNG-12-AVG`. Breast sprite = `BR-{type}-{age}-{height}-{cup}`, e.g. `BR-12-YNG-AVG-DD`. Abbreviations are in §4.
5. **Done = passes SOP-QA (§5.7)** and, for overlays, the composite check (SOP-CQ).
6. **Decisions first.** §3 lists every decision with the default this file assumes.
7. **Change control.** Any catalog change = new catalog version + changelog line + a Phase 12 re-check task. Counts here are generated from the catalog data; ask for a regenerate rather than editing numbers by hand.

---

# 1. DASHBOARD (update as you go)

Policy A (full). The **Assets** column counts files you build; Phase 10 composites are assembled and checked by script.

| Phase | Scope | Tasks | Assets (target) | Done | Gate |
|-------|-------|------:|----------------:|-----:|------|
| P0 | Foundations, calibration, tooling, pilot | 91 | — | 0 | G0 |
| P1 | Young female dolls · Average | 7 | 19 | 0 | G1 |
| P2 | Young female dolls · petite heights | 7 | 69 | 0 | G2 |
| P3 | Young female dolls · tall heights | 6 | 60 | 0 | G3 |
| P4 | Female doll age variants (5 tiers) | 21 | 740 | 0 | G4.YAD … G4.OLD |
| P5 | Male dolls (6 tiers) | 6 | 294 | 0 | G5 |
| P6 | Breast and nipple overlays | 50 | 9,420 | 0 | G6 |
| P7 | Skin overlays | 70 | 43 | 0 | G7 |
| P8 | Race overlays | 50 | 41 | 0 | G8 |
| P9 | Anatomy overlays | 31 | 25 | 0 | G9 |
| P10 | Composite verification (assembled and checked by script) | 10 | (8,412 assembled) | 0 | G10 |
| P11 | Named characters | 4 | 35 | 0 | G11 |
| P12 | Integration QA and release | 13 | — | 0 | G12 |
| **Total** | | **366** | **10,746** | **0** | |

---

# 2. SCOPE AND NUMBERS

## 2.1 What gets built

| Layer | Built as | Keyed by | Assets |
|-------|----------|----------|--------|
| Female body doll | 1 doll (+ UV pass + JSON) | age tier (6) × body type × height | 888 |
| Male body doll | 1 doll | age tier (6) × body type (7) × height (7) | 294 |
| Breast sprite | 1 left-breast sprite (right = mirror) + UV pass + JSON | **body type × age tier (6) × height × every allowed cup** — exactly one per valid composite | 8,412 |
| Female nipple sprite | sub-layer of the breast sprite | **body type × every supported nipple** (315 pairs) × 3 arousal states — same for every age and height | 945 |
| Male nipple sprite | sub-layer for male dolls | male body type (7) × size (3) × 3 arousal states | 63 |
| Skin overlays | tone, texture/features, gloss, tattoo | see Phase 7 | 43 |
| Race overlays | tails, wings, ears, horns, markings | see Phase 8 | 41 |
| Anatomy overlays | pubic hair, labia, cock variants | **one set per gender** (D-30), translated only | 25 |
| Named characters | assembled from the above | 35 entries | 35 |
| **Total built** |  |  | **10,746** |

**Generated and checked one-to-one with the sprites:** 8,412 valid female body + cup composites (Phase 10). **Built only on demand:** supernatural-tissue breast sprites (D-14) — 1,402 if you ever build the whole set (body type × height × cup, no age).

## 2.2 Body dolls per age tier, by height

| Height | Abbr | Render cm | Female dolls per age tier (types available) |
|--------|------|-----------|---------------------------------------------|
| VeryShort | VSH | 145 cm | 23 |
| Short | SHT | 154 cm | 23 |
| BelowAverage | BAV | 160 cm | 23 |
| Average | AVG | 165 cm | 19 |
| AboveAverage | AAV | 170 cm | 20 |
| Tall | TAL | 176 cm | 20 |
| VeryTall | VTL | 183 cm | 20 |
| **All heights** |  |  | **148** |

× 6 age tiers = **888 female body dolls**. Male: 7 types × 7 heights × 6 tiers = **294**.

## 2.3 Breast and nipple sprites per body type

`Breast sprites` = heights × allowed cups × 6 age tiers — one per valid body + cup composite. `Nipple pairs` = supported (cup group, nipple type) combinations; each is built in **3 arousal states, once per body type** (not per age or height).

| Body type | Allowed cups | # cups | Heights | Breast sprites (× 6 tiers) | Nipple pairs | Nipple sprites (× 3 states) |
|-----------|--------------|--------|---------|----------------------------|--------------|-----------------------------|
| F-01 Androgynous | AA–B | 3 | 7 | 126 | 6 | 18 |
| F-02 PetiteSlim | AA–C | 4 | 3 | 72 | 6 | 18 |
| F-03 PetiteCurvy | A–G | 8 | 3 | 144 | 15 | 45 |
| F-04 Willowy | AA–C | 4 | 3 | 72 | 6 | 18 |
| F-05 Athletic | A–H | 9 | 7 | 378 | 15 | 45 |
| F-06 SlimStraight | AA–C | 4 | 7 | 168 | 6 | 18 |
| F-07 SlimCurvy | B–F | 6 | 7 | 252 | 9 | 27 |
| F-08 BananaShape | AA–F | 8 | 7 | 336 | 12 | 36 |
| F-09 PearShape | AA–K | 13 | 7 | 546 | 18 | 54 |
| F-10 SpoonShape | A–K | 12 | 7 | 504 | 18 | 54 |
| F-11 HourglassSlim | A–F | 7 | 7 | 294 | 12 | 36 |
| F-12 HourglassCurvy | C–K | 10 | 7 | 420 | 15 | 45 |
| F-13 HourglassFullBust | E–Q | 13 | 7 | 546 | 15 | 45 |
| F-14 TopHeavy | D–Q | 15 | 7 | 630 | 18 | 54 |
| F-15 BottomHeavy | AA–E | 7 | 7 | 294 | 12 | 36 |
| F-16 FullFigured | D–Q | 15 | 7 | 630 | 18 | 54 |
| F-17 Voluptuous | E–Q | 13 | 7 | 546 | 15 | 45 |
| F-18 Zaftig | D–K | 9 | 7 | 378 | 12 | 36 |
| F-19 Rubenesque | F–Q | 12 | 7 | 504 | 15 | 45 |
| F-20 AthleticCurvy | B–G | 7 | 7 | 294 | 12 | 36 |
| F-21 MuscularFeminine | A–Q | 18 | 7 | 756 | 24 | 72 |
| F-22 PetiteHourglass | A–G | 8 | 3 | 144 | 15 | 45 |
| F-23 MiniVoluptuous | C–H | 7 | 3 | 126 | 12 | 36 |
| F-24 CompactPower | B–F | 6 | 7 | 252 | 9 | 27 |
| **Total** |  |  |  | **8,412** | **315** | **945** |

## 2.4 Coverage policy

**Policy A (full) — accepted.** Every body type has every allowed cup at every height and age tier, and every supported nipple in every arousal state, so there is no fallback resolver and no core/extended split. Sweet-spot cups are still marked in the catalog (they are the creator's suggested defaults) but they are built exactly like the rest.

## 2.5 Non-body assets (counts are filled in by each phase)

| Asset group | Count |
|-------------|------:|
| Female body dolls | 888 |
| Male body dolls | 294 |
| Breast sprites (body type × age tier × height × allowed cup) | 8,412 |
| Nipple sprites — female (body type × nipple × 3 states) / male | 945 / 63 |
| Skin overlays (tones 23, textures 9, gloss 4, tattoo 4, tattoo-system markings 3) | 43 |
| Race overlays (ears 10, horns 7, tails 8, wing states 9, markings 7) | 41 |
| Anatomy overlays — one set per gender (pubic hair 7, labia 6, cock 12) | 25 |
| Named characters | 35 |

---

# 3. DECISION LOG

Status: **accepted / resolved** = you decided · **in review** = going through with you · **open** = waiting on you · *default* = assumed here; confirm in Phase 0.

| ID | Decision | Default used in this file | Needed by | Status |
|------|----------|---------------------------|-----------|--------|
| D-01 | Age-tier boundaries | Young 18–24 · YoungAdult 25–29 · RipeningMilf 30–35 · RipeMilf 35–43 · MatureMilf 43–50 · OldMilf 50+. Apparent-age floor 18. | P0-1 | **accepted** |
| D-02 | How YoungAdult is derived | 50% lerp between Young and RipeningMilf for sliders; categorical values use the YoungAdult columns in catalog Parts 3–5. | P0-7 | default |
| D-03 | DD cup | DD is a rendered cup between D and E (one more sprite for every type whose range spans D–E). | P0-6 | **resolved** |
| D-04 | Canonical render cm per height tag | Midpoint of each range; VeryTall female 183, male 193. | P0-3 | default |
| D-05 | Coverage policy | **A (full)**. See §2.4. | P0-1 | **accepted** |
| D-06 | Cup-step bust rule | ±2.5 cm of composite bust per ladder step (DD counts) from the type's reference cup; sprite projection follows it. | P0-5 | default |
| D-07 | Reach of cups L–Q | Confirmed renderable. One quick check at the smallest frame (P0-6). | P0-6 | **resolved** |
| D-08 | Render standard | Front orthographic, A-stance, 8 px/cm, canvas 1024 × 2048, PNG-32 transparent, neutral soft light, no baked ground shadow. | P0-3 | default |
| D-09 | Head side of the body doll | Body dolls are **headless**: neck included up to a NECK_TOP anchor; the face track's head base attaches there and covers the seam. Base skin neutral mid-grey. | P0-3 | default |
| D-10 | Anatomy | **Labia, cock (variants) and pubic hair are all overlays.** The doll has a neutral smooth crotch with no genital detail and no pubic hair. | P0-3 | **resolved** (you) |
| D-11 | Anchors | Sidecar JSON per doll and per overlay: body anchors include breast, underbust, tail, wing, pubic; head anchors come from the face track. | P0-4 | default |
| D-12 | Nipple colour for DeepPurple and Ruddy | Ruddy → Peach · Tan; DeepPurple → DarkBrown (in catalog Part 3). | P7 | **accepted** |
| D-13 | Skin overlay structure | Tone, texture/features, gloss and tattoo are independent layers applied to **each part** (doll, breast sprite, nipple, anatomy overlay, head base) before compositing. | P7 | default |
| D-14 | Supernatural-tissue breasts | Catalog Part 3 gives Succubus / Goddess / Angel a different breast rule (Round or Teardrop, High, Firm, no age change). Because sprites are per body type, a full set would be 1,402 sprites (body type × height × cup, no age). Default: **build on demand** for named characters and race kits that need them, file `breast_f_sup_{cm}_{token}_{cup}.png`. | P6 | default — confirm |
| D-15 | Named-character field conflicts | C1/C4/C7/C9 extra "Average"; C1, C29 body "Average/Soft"; C11, C24 no body type. | P11 | **in review** — one at a time |
| D-16 | Named-character age re-tiering | "Young-RipeningMilf" → YoungAdult (C9, C11, C24, C26); other "Young" stay Young. | P11 | **in review** — one at a time |
| D-17 | Named-character cup picks (ranges) | C5b C–D, C13 B–C, C18a C–D, C20 C–D: default first cup. | P11 | **in review** — one at a time |
| D-18 | Overlays added in catalog | AnimalBunny ears, DragonRidge ears, Bunny tail (proposed descriptions). | P8 | **accepted** |
| D-19 | Named-character count | 35 entries (v2.0 text said 34). | P11 | open |
| D-20 | Face and hair | Separate track: `paper_doll_face_hair_task_list_v1.1.md` (draft). | P11 | **resolved** |
| D-21 | Rubenesque cup ceiling | F–Q. | P0-1 | **resolved** |
| D-22 | Skin features authored in UV space | Every doll and overlay ships with a **UV pass** (`*_uv.png`) so a skin tone, texture, freckle, scar, tattoo or race-marking layer is drawn **once** and fits every body, sprite and head. Verified in P0-10. | P0-3 | **accepted** (you) — verify P0-10 |
| D-23 | Male age presets | By eye; no numeric table. | P0-7 | **resolved** |
| D-24 | Architecture | Body doll = everything below the face except breast, nipples, pubic hair (and, per D-10, genital detail). Overlays = breast (+nipples), skin colour, skin features, wings, tails, anatomy. | P0-1 | **accepted** (you) |
| D-25 | Breast sprite keys and placement | **You decided:** no scaling to fit, and **height is a key**. Key = body type × age tier × height × cup, authored on that exact doll; a sprite is only **translated** to the doll's BREAST anchor. 8,412 sprites, one per valid composite. | P0-6 | **accepted** (you) |
| D-26 | Nipples | **You decided:** nipples are identical across ages; each nipple type needs **3 arousal states** (unaroused, lightly aroused, extremely aroused). Key = body type × supported (cup group, nipple type) × state = 945 female sprites; male: 7 types × 3 sizes × 3 states = 63. **Also confirmed by you:** nipples are *not* keyed by height (a nipple is a small absolute-size sprite; keying by height would have meant 5,967); male nipples get the same 3 states; arousal changes the nipple's shape only — colour still comes from the skin tone's nipple mapping; composites use *unaroused* by default, with a 60-composite all-states check in Phase 10. | P6 | **accepted** (you) — all assumptions confirmed |
| D-27 | Underbust rule for the body doll | Underbust = bust-equiv at the reference cup − 2.5 cm × (reference-cup position − 1). Table in Appendix B. | P0-5 | **accepted** (you) |
| D-28 | Ears and horns | Overlays on the **face track's** head bases (anchors from head JSON); built in Phase 8. | P8 | **accepted** (you) |
| D-29 | Composite verification | All valid composites generated and auto-checked by script, including sprite/doll registration at every height; visual review by cup-sweep and height-sweep sheets (Phase 10). | P10 | default |
| D-30 | Anatomy overlay keys (pubic hair, labia, cock) | **You decided: one set per gender**, translated only (option A) — 25 assets. The pilot (P0-10.5) tests that it holds on three body types. | P9 | **resolved** (you) — verify P0-10 |

---

# 4. REFERENCE DATA (repeated from the catalog so this file stands alone)

## 4.1 Age tiers

| Tag | File token | Abbr | Apparent age |
|------|------------|------|--------------|
| Young | `young` | YNG | 18–24 |
| YoungAdult | `youngadult` | YAD | 25–29 |
| RipeningMilf | `ripeningmilf` | RPG | 30–35 |
| RipeMilf | `ripemilf` | RPE | 35–43 |
| MatureMilf | `maturemilf` | MAT | 43–50 |
| OldMilf | `oldmilf` | OLD | 50+ |

## 4.2 Heights and canonical render cm

| Tag | Abbr | Female range | Female cm | Male range | Male cm |
|------|------|--------------|-----------|------------|---------|
| VeryShort | VSH | 140–149 | 145 | 150–159 | 155 |
| Short | SHT | 150–157 | 154 | 160–167 | 164 |
| BelowAverage | BAV | 158–162 | 160 | 168–171 | 170 |
| Average | AVG | 163–167 | 165 | 172–176 | 174 |
| AboveAverage | AAV | 168–172 | 170 | 177–181 | 179 |
| Tall | TAL | 173–179 | 176 | 182–189 | 186 |
| VeryTall | VTL | 180+ | 183 | 190+ | 193 |

## 4.3 Cup ladder, cup groups and nipple types

`AA · A · B · C · D · DD · E · F · G · H · I · J · K · L · M · N · O · P · Q` — 19 cups. Ladder position = index + 1. Each body type builds sprites only for the cups it allows (§4.4).

| Cup group (file token) | Cups | Common nipple types (supported nipples) |
|------------------------|------|-----------------------------------------|
| AA-A | AA A | Flat · Puffy · Inverted |
| B-C | B C | Puffy · Protruding · Flat |
| D-DD | D DD | Protruding · Wide · Puffy |
| E-F | E F | Protruding · Wide · LargeProtruding |
| G-H | G H | Wide · LargeProtruding · Long |
| I-K | I J K | LargeProtruding · Wide · Long |
| L-N | L M N | LargeProtruding · Wide · Long |
| O-Q | O P Q | LargeProtruding · Wide · Long |

**Arousal states** (every nipple sprite is built in all three):

| File token | State |
|------------|-------|
| `unaroused` | unaroused |
| `light` | lightly aroused |
| `extreme` | extremely aroused |

A body type supports a nipple (cup group, type) when **any** of its allowed cups falls in that group. Every supported nipple is built **once per body type in 3 arousal states** — not per age tier or height.

## 4.4 Female build sheet

`Allowed cups` = the cups this body type gets sprites for (catalog Part 3), at every one of its heights and every age tier. `Nipple authoring height` = the middle height of the type: its nipple sprites (identical across ages and heights) are authored on its Young preset there. `+1 firm` = the type's sprites are authored one softness step firmer. `Ref cup` = cup at which the Part 2 bust-equiv is valid (underbust, Appendix B).

| Body type | File token | Heights | Nipple authoring height | Allowed cups | # cups | Sweet spot | Ref cup | +1 firm |
|-----------|------------|---------|-------------------------|--------------|--------|------------|---------|---------|
| F-01 Androgynous | `androgynous` | all 7 | AVG | AA–B | 3 | AA–A | A |  |
| F-02 PetiteSlim | `petite_slim` | VSH, SHT, BAV | SHT | AA–C | 4 | A–B | B |  |
| F-03 PetiteCurvy | `petite_curvy` | VSH, SHT, BAV | SHT | A–G | 8 | B–C | C |  |
| F-04 Willowy | `willowy` | AAV, TAL, VTL | TAL | AA–C | 4 | A–B | B |  |
| F-05 Athletic | `athletic` | all 7 | AVG | A–H | 9 | B–C | C | yes |
| F-06 SlimStraight | `slim_straight` | all 7 | AVG | AA–C | 4 | A–B | B |  |
| F-07 SlimCurvy | `slim_curvy` | all 7 | AVG | B–F | 6 | C | C |  |
| F-08 BananaShape | `banana` | all 7 | AVG | AA–F | 8 | A–B | B |  |
| F-09 PearShape | `pear` | all 7 | AVG | AA–K | 13 | A–C | B |  |
| F-10 SpoonShape | `spoon` | all 7 | AVG | A–K | 12 | B–C | C |  |
| F-11 HourglassSlim | `hourglass_slim` | all 7 | AVG | A–F | 7 | B–D | C |  |
| F-12 HourglassCurvy | `hourglass_curvy` | all 7 | AVG | C–K | 10 | D–E | DD |  |
| F-13 HourglassFullBust | `hourglass_fullbust` | all 7 | AVG | E–Q | 13 | F–H | G |  |
| F-14 TopHeavy | `top_heavy` | all 7 | AVG | D–Q | 15 | F–H | G |  |
| F-15 BottomHeavy | `bottom_heavy` | all 7 | AVG | AA–E | 7 | A–C | B |  |
| F-16 FullFigured | `full_figured` | all 7 | AVG | D–Q | 15 | E–G | F |  |
| F-17 Voluptuous | `voluptuous` | all 7 | AVG | E–Q | 13 | G–I | H |  |
| F-18 Zaftig | `zaftig` | all 7 | AVG | D–K | 9 | F–H | G |  |
| F-19 Rubenesque | `rubenesque` | all 7 | AVG | F–Q | 12 | H–K | J |  |
| F-20 AthleticCurvy | `athletic_curvy` | all 7 | AVG | B–G | 7 | C–E | DD | yes |
| F-21 MuscularFeminine | `muscular_feminine` | all 7 | AVG | A–Q | 18 | B–D | C | yes |
| F-22 PetiteHourglass | `petite_hourglass` | VSH, SHT, BAV | SHT | A–G | 8 | B–D | C |  |
| F-23 MiniVoluptuous | `mini_voluptuous` | VSH, SHT, BAV | SHT | C–H | 7 | E–G | F |  |
| F-24 CompactPower | `compact_power` | all 7 | AVG | B–F | 6 | D–E | DD | yes |

## 4.5 Male build sheet

| Body type | File token | Heights | Muscle / stomach (catalog Part 6) |
|-----------|------------|---------|-----------------------------------|
| M-01 Androgynous | `androgynous` | all 7 | None–Light · Flat · CockType: Straight / Uniform typical |
| M-02 Lean | `lean` | all 7 | Light–Toned · Flat |
| M-03 Average | `average` | all 7 | Light–Toned · Flat–Soft |
| M-04 Athletic | `athletic` | all 7 | Athletic–Defined · Flat–Toned |
| M-05 Muscular | `muscular` | all 7 | Muscular · Toned |
| M-06 Stocky | `stocky` | all 7 | Toned–Muscular · Soft |
| M-07 Hypermasculine | `hypermasculine` | all 7 | Muscular · Toned · Widest shoulder-to-waist ratio |

## 4.6 Reference bodies (REF)

Real dolls used to test everything else. Build them first (P0-10).

| REF | Why | Doll file |
|------|------|-----------|
| REF-BR | Breast authoring body (neutral) | `body_f_young_165_hourglass_curvy.png` |
| REF-1 | Smallest frame | `body_f_young_145_petite_slim.png` |
| REF-2 | Petite, most curvy | `body_f_young_145_mini_voluptuous.png` |
| REF-3 | Tallest, slimmest | `body_f_young_183_willowy.png` |
| REF-4 | Widest / softest | `body_f_young_165_rubenesque.png` |
| REF-5 | Largest bust range | `body_f_young_165_hourglass_fullbust.png` |
| REF-6 | Muscular | `body_f_young_165_muscular_feminine.png` |
| REF-7 | Male, lean | `body_m_young_174_lean.png` |
| REF-8 | Male, largest | `body_m_young_193_hypermasculine.png` |
| REF-9 | Oldest + softest (after the first OldMilf set exists) | `body_f_oldmilf_165_rubenesque.png` |
| REF-10 | Small frame, large allowed cup | `body_f_young_145_petite_curvy.png` |

---

# 5. STANDARD PROCEDURES (SOPs)

## 5.1 SOP-B — Build one female body doll (age, type, height)

- **B1 Preset** `preset_f_{age}_{cm}_{token}`. If none exists, duplicate the nearest-height preset of the same type and age.
- **B2 Height** = render cm (§4.2); verify against the in-scene ruler (±0.5 cm).
- **B3 Targets** from Appendix B for (type, height): waist and hip at the midpoint of the range; **underbust** at the midpoint of the derived range (D-27). Not bust.
- **B4 Attributes** from Part 2: AssShape / AssSize / AssSoftness, StomachType / StomachSoftness, MuscleTone, Thigh, Legs, Arms. `X–Y` = midpoint blend.
- **B5 Strip the overlays (P0-3.7):** breasts at minimum/hidden, nipples hidden, pubic hair hidden, **no genital detail (smooth neutral crotch)**, headless to NECK_TOP, neutral grey skin. The chest wall must read as one continuous surface at the type's underbust, and the crotch as one smooth neutral surface, with no hole, seam or shading step where an overlay will sit.
- **B6 Measure.** Waist and hip within ±2 cm, underbust within ±3 cm. Check the Silhouette-line rules that do not involve the bust (e.g. waist–hip difference ≤ 24 cm for SlimStraight).
- **B7 Age tier ≠ Young?** Do SOP-A now.
- **B8 Render three files:** doll PNG, UV pass `_uv.png`, anchor JSON (must include BREAST_L/R, UNDERBUST, `underbust_cm`, CHEST_WIDTH, NECK_TOP, WING_ROOT_L/R, TAIL_BASE, PUBIC_ANCHOR).
- **B9 SOP-QA.** Tick the grid cell; manifest row; back up. **Then build this doll's breast sprites (Phase 6) while its preset is open.**

## 5.2 SOP-A — Age variant of a body doll

- **A1 Start from the finished Young preset** for the same (type, height).
- **A2 Load the age delta preset** (P0-7) for the target tier.
- **A3 Numeric deltas** (catalog Part 4): waist and hip add the midpoint of the delta range (YoungAdult: waist +1.5 cm, hip +0.5 cm). **Underbust follows the waist change** — re-measure.
- **A4 Stomach and ass softness** per Part 4; **muscle tone** steps down per Part 4.
- **A5 Breast changes (position, softness, shape drift) are not here** — they live in that doll's breast sprites (SOP-BR), built for this exact age tier and height.
- **A6 Skin texture** is a layer, not baked: record the tier's default texture in the manifest.
- **A7 Compare to Young:** same height, same silhouette family, only age-driven differences. **A8** Render with B8.

## 5.3 SOP-M — Build one male body doll

- **M1 Preset** `preset_m_{age}_{cm}_{token}`; set height to render cm.
- **M2 Waist and hip** at the midpoint of the Part 6 row; muscle tone and stomach from §4.5. Hypermasculine: widest shoulder-to-waist ratio (record it).
- **M3 Strip:** nipples hidden (male nipple sprites are overlays, P6-3), pubic hair hidden, **no genital detail**, headless, neutral grey skin. Pecs stay (they are muscle).
- **M4 Age tier ≠ Young:** apply the male age preset (P0-7.6–7.10).
- **M5 Render doll + UV pass + JSON; SOP-QA; tick.**

## 5.4 SOP-BR — Build one breast sprite (body type × age tier × height × cup; left breast, right is its mirror)

- **R1 Authoring body:** load the preset of **this exact doll** (type, age tier, height). The sprite is authored on this body — never on another height or type.
- **R2 Cup:** breast-size slider = the cup's value from the calibration sheet (P0-6).
- **R3 Shape** = catalog Part 3 shape table (row = cup, column = age). `X / Y` = 70% X + 30% Y; `X-Y` = 50/50. **Softness** = Part 3 softness table (cup group × age); for `+1 firm` types move one step firmer. **Position** = Part 3 position table.
- **R4 Hide the nipple** on the render (nipples are separate sprites, SOP-NP).
- **R5 Isolate:** render the body with the breast, render the same body with the breast flat/hidden, take the alpha difference, feather the edge into the chest wall.
- **R6 UV pass:** render the sprite's UV pass in the body's UV atlas.
- **R7 JSON:** attach point (offset from BREAST_L on this doll), mirror axis, **NIPPLE attach point** (this is where age shows up for nipples), projection cm, `bust_delta_cm`.
- **R8 Quick composite** with SOP-CQ C1–C3 on this doll. **R9 SOP-QA, tick the cell, manifest row.**
- **Efficient order:** after a doll passes QA, build its sprites cup by cup (low → high) before closing its preset. Naming: `breast_f_{age}_{cm}_{token}_{cup}.png`.

## 5.5 SOP-NP — Build one nipple sprite (body type × cup group × nipple type × arousal state; identical across ages and heights)

- **N1** Type and size from the catalog nipple table (§4.3); size scales with the cup group.
- **N2** Authored **once per body type** on its Young preset at the nipple authoring height (§4.4); neutral grey; render isolated; UV pass.
- **N3 States:** build all three — `unaroused`, `light` (lightly aroused), `extreme` (extremely aroused). They must read as one nipple at three stages: same base position and colour region, increasing projection and firmness.
- **N4 Attach** at the NIPPLE anchor of any breast sprite of this body type; the anchor already encodes age and height (SOP-BR R7). Test on the group's smallest and largest cup at Young and OldMilf, in all three states.
- **N5** Colour comes from the skin tone's nipple-colour mapping (Phase 7), not from the sprite or the state.
- **N6** Export `nipple_f_{token}_{type}_{group}_{state}.png`, SOP-QA, tick.
- **Male:** `nipple_m_{token}_{size}_{state}.png`, authored on the male type's Average-height Young preset (same 3 states).

## 5.6 SOP-CQ — Composite check (one body doll + one cup)

- **C1 Composite:** body doll + **its own** breast sprite (same type, age, height, cup) at BREAST_L / mirrored BREAST_R, nipple sprite (unaroused unless testing states) at the sprite's NIPPLE anchor, in the z-order (P0-3.9). **Translation only.**
- **C2 Seam:** no visible edge, step or gap between breast and chest wall at 100% and 200% zoom, on a light and a dark background, in grey and with one tone applied.
- **C3 Registration:** the sprite lines up with the chest wall and underbust of *this* doll (no gap, no overlap) — and with its neighbours in the cup ladder (the same position, only the cup changes).
- **C4 Bust:** measured composite bust = BustEquiv(Part 2) + 2.5 cm × (cup position − ref-cup position), within ±3 cm.
- **C5 Silhouette:** at the reference cup the type's Silhouette line (bust–hip ratios etc.) holds; elsewhere the ratio relaxes by design.
- **C6 Overlap:** breast does not cross the arm or clip the ribcage in the A-stance. **C7 Log** the result.

## 5.7 SOP-QA — Quality gate for every doll and overlay

| # | Check | Pass when |
|------|-------|-----------|
| Q1 | File name | Validator regex passes (P0-8.1); tokens match the grid cell. |
| Q2 | Canvas and scale | 1024 × 2048, 8 px/cm, feet on the baseline (overlays: their own canvas, same px/cm). |
| Q3 | Transparency | Background fully transparent, no halo. |
| Q4 | Anchors and passes | JSON has every anchor; `_uv.png` present and registers with the doll. |
| Q5 | Measurements (dolls) | Waist/hip ±2 cm, underbust ±3 cm. |
| Q6 | Attribute conformance | Ass, stomach, muscle, thigh, legs, arms read as the catalog values. |
| Q7 | Mesh quality | No clipping or stretching at hip, thigh, armpit, chest; no texture smear. |
| Q8 | Lighting | Matches the rest of the set. |
| Q9 | No baked overlays | Dolls contain **no** breast, nipples, pubic hair or genital detail; chest and crotch are neutral and smooth. |
| Q10 | Adult appearance | Proportions read as 18+ (petite types: adult proportions, not child proportions). |
| Q11 | Age tier | Stomach, ass, waist/hip, muscle match catalog Part 4 for the tier. |
| Q12 | Manifest and backup | Manifest row updated, file in the right folder, backed up. |

## 5.8 SOP-OV — One overlay asset (tail, wing, ear, horn, marking, pubic hair, labia/cock variant)

- **O1 Spec** from catalog Part 8 / Part 7: description, size in cm, default state, used-by.
- **O2 Author** on REF-4 (body overlays) or the neutral head template (ears, horns) at 8 px/cm.
- **O3 Bind to anchors** — tails/wings → body JSON; pubic hair, labia, cock → PUBIC_ANCHOR in the body JSON; ears/horns → head JSON from the face track. **Translation only, no scaling** (same rule as D-25); one set per gender (D-30).
- **O4 Z-order** from P0-3.9. **O5 UV pass** for every overlay that carries skin (markings, pubic hair, labia, cock).
- **O6 Fit-test** on REF-1 … REF-8 (REF-9 once it exists) and on two composites with the largest and smallest cups.
- **O7 Colour-test** on a light, a medium and a dark tone + one fantasy tone. **O8 Hair-test** for head items (long and short hair).
- **O9 Export** `ov_{category}_{type}_{state}.png` + JSON; manifest row; SOP-QA; tick.

## 5.9 SOP-SK — One skin layer (tone, texture/feature, gloss, tattoo, race marking)

- **S1 Author in UV space** (the atlas the UV passes use); never draw skin on a body silhouette.
- **S2 Apply** per part (body doll, breast sprite, nipple, anatomy overlay, head base) using each part's UV pass; then composite the parts.
- **S3 Tone:** undertone and gloss from Part 9; nipple colour from the tone's mapping, applied only to nipple sprites.
- **S4 Verify across the boundary:** the layer is continuous across the body/breast seam, the body/anatomy seam and the neck/head seam.
- **S5 Verify on** REF-1, REF-4, REF-6 and two composites at their type's shortest and tallest heights; age check on REF-9.
- **S6 Export, manifest, tick.**

## 5.10 SOP-NC — Assemble one named character

- **N1 Resolve the spec** (close D-15/16/17 for this character).
- **N2 Body doll:** exact file in the Phase 11 table. **N3 Breast sprite** for that body type, age and cup — file in the table; if the race needs supernatural tissue (D-14) build `breast_f_sup_{cm}_{token}_{cup}.png` now. **Nipple sprite:** pick the nipple type for the cup group and the arousal state.
- **N4 Skin:** tone + texture + features + tattoo; nipple colour from the tone. **N5 Anatomy:** pubic hair style + labia/cock variant.
- **N6 Tail / wings / markings** from the race kit. **N7 Face and hair** from the face track (head base, parts, hair, ears, horns).
- **N8 Individual tuning** (scars, freckles, tattoos, stance). **N9 Composite QA** on a light and a dark background.
- **N10 Export** `char_{id}_{name}.png` + recipe JSON listing every layer file. **N11 Tick the row.**

---

# PHASE 0 — FOUNDATIONS (nothing is built until Gate G0)

## P0-1 Lock decisions
- [ ] **P0-1.1** Go through every row of §3. Accept the default or write the override and date. **Done when** no row says `open` except D-15/16/17/19 (closed in Phase 11).
- [ ] **P0-1.2** Confirm **D-14** (supernatural breasts built on demand) — the only decision here that is still a default. D-10, D-22, D-25, D-26, D-27, D-28 and D-30 are already accepted.
- [ ] **P0-1.3** Freeze the catalog as `catalog-v3.2`. Any later catalog change = new version + changelog line + a Phase 12 re-check task.

## P0-2 Workspace
- [ ] **P0-2.1** Create the folder tree below.

```
paper_doll/
  00_docs/          catalog, this task list, face & hair list, pilot notes
  01_refs/          measurement refs, ruler, adult-proportion sheet, UV atlas
  02_presets/       slider presets  (preset_[g]_[age]_[cm]_[token])
  03_calibration/   slider↔cm tables, cup ladder table, placement rule
  04_bodies/        f/ and m/ → [age]/[cm]/   (doll PNG + _uv.png + .json)
  05_breast/        f_breast/ f_nipple/ m_nipple/ sup/   (one folder per body type inside)
  06_skin/          tone/ texture/ tattoo/ gloss/ presets/
  07_overlays/      tail/ wing/ ear/ horn/ marking/ anatomy/ pubic/
  08_named/         char_[id]_[name].png + recipe JSON
  09_manifest/      manifests, validators, scripts
  10_composites/    AUTO-GENERATED composites (never hand-edited)
  11_qa/            contact sheets, failed-asset notes
  99_backup/
```

- [ ] **P0-2.2** Copy the catalog and both task lists into `00_docs/`. Put the project under version control (LFS for PNGs) or set a dated-backup routine.
- [ ] **P0-2.3** Backup rule: copy after every finished set; full backup weekly. **Done when** a restore from `99_backup` has been tested once.

## P0-3 Render standard (D-04, D-08, D-09, D-10, D-22)
- [ ] **P0-3.1** **Pose:** neutral front-facing A-stance, arms ~25° from the torso (so waist, hip and breast silhouettes are measurable and the breast never touches the arm), feet ~15 cm apart, hands relaxed and open.
- [ ] **P0-3.2** **Camera:** orthographic, front, constant scale. Suggested: 8 px/cm, canvas 1024 × 2048, feet baseline at y = 1900. **Overlay canvases** (breast, nipple, tails, wings, ears, horns) use the same 8 px/cm; breast sprites 512 × 512.
- [ ] **P0-3.3** **Light:** neutral soft studio light, identical for dolls and overlays; **no baked ground shadow**.
- [ ] **P0-3.4** **Output:** PNG-32, sRGB, transparent background, no halo.
- [ ] **P0-3.5** **Base skin:** neutral mid-grey on every doll and sprite so tone layers tint evenly.
- [ ] **P0-3.6** **Headless doll (D-09):** the doll includes the neck up to a NECK_TOP anchor; there is no head. The face track's head base overlaps the neck top and hides the seam.
- [ ] **P0-3.7** **Strip rule (D-24, D-10):** no breasts (breast slider at minimum/hidden), no nipples, no pubic hair and **no genital detail** on any doll — a smooth neutral crotch. The chest wall and the crotch must each be one continuous clean surface. Male pecs stay (muscle); male nipples hidden.
- [ ] **P0-3.8** **UV pass + alpha (D-22):** define the UV atlas (the HS2 body UV), the pass format (e.g. RG = U,V; B = region id; alpha = coverage) and the render method. Every doll, breast sprite, nipple sprite and head base ships `_uv.png`. **Done when** one skin texture applied through the pass lands on the right place on three different dolls.
- [ ] **P0-3.9** **Z-order spec** (back → front): ground shadow · tail(behind) · wings(behind) · hair-back (face track) · body doll · breast sprite · nipple sprite · pubic hair · anatomy variant · clothing(external) · tail(front) · head base and face parts (face track) · ears · hair-front · horns · divine aura / glow. **Skin layers are applied to each part through its UV pass *before* compositing.**

## P0-4 Anchors and overlay scaling (D-11)
- [ ] **P0-4.1** **Body anchor set:** NECK_TOP, NECK_BASE, SHOULDER_L/R, STERNUM, BREAST_L, BREAST_R (centre of each breast's base on the chest wall), UNDERBUST_Y, CHEST_WIDTH, NAVEL, PUBIC_ANCHOR, PELVIS_CENTER, HIP_L/R, WING_ROOT_L/R, TAIL_BASE, FOOT_L/R.
- [ ] **P0-4.2** **Doll JSON:** {canvas, px_per_cm, anchors{name:[x,y]}, preset_name, height_cm, waist_cm, hip_cm, underbust_cm}.
- [ ] **P0-4.3** **Sprite JSON:** {canvas, attach_point, mirror_axis, nipple_attach, projection_cm, bust_delta_cm}.
- [ ] **P0-4.4** Choose the anchor extraction method (bone positions from HS2, or markers in the template scene). **Done when** one test doll produces correct JSON.
- [ ] **P0-4.5** **Placement rules:** **overlays are translated, never scaled** (D-25). Tails and wings are authored in cm (catalog Part 8) at the same px/cm; wing span default 1.0–1.2 × body height; pubic hair, labia and cock are one set per gender (D-30); ears and horns follow the face track's head rule (FH0-3.1).

## P0-5 Body slider calibration (slider value ↔ real cm / catalog term)
- [ ] **P0-5.1** Height slider → cm (female and male); check the seven heights in §4.2.
- [ ] **P0-5.2** Waist slider → cm (female, male).
- [ ] **P0-5.3** Hip slider → cm (female, male).
- [ ] **P0-5.4** **Underbust** slider/measure → cm (D-27). Replaces the old bust calibration for dolls.
- [ ] **P0-5.5** Thigh, calf, upper-arm → catalog terms (Slim · Moderate · Full · Heavy).
- [ ] **P0-5.6** Ass: map the 7 sizes (Flat … Massive) and 7 shapes (Flat, Round, Square, Heart, Bubble, Wide, Pear).
- [ ] **P0-5.7** Stomach: StomachType (Flat, Toned, Flat–Soft, Soft, Soft–Pudgy, Plump) and softness (Hard … Doughy).
- [ ] **P0-5.8** Muscle tone: None, Light, Toned, Athletic–Defined, Muscular.
- [ ] **P0-5.9** Softness scale: Firm, MediumFirm, Soft, VerySoft, Pillowy (+ half-steps) → physics/softness parameters (body parts; breast softness is calibrated in P0-6).
- [ ] **P0-5.10** Prove it: three throw-away dolls (small, average, large). Waist/hip within ±2 cm and underbust within ±3 cm of the Appendix B method.

## P0-6 Breast overlay calibration (cup ladder, extraction, placement rule) (D-03, D-06, D-07, D-25, D-26)
- [ ] **P0-6.1** Create the calibration sheet: `Cup | size slider | measured bust delta | projection cm | shape preset | notes`.
- [ ] **P0-6.2** Cup **AA** (ladder position 1): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.3** Cup **A** (ladder position 2): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.4** Cup **B** (ladder position 3): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.5** Cup **C** (ladder position 4): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.6** Cup **D** (ladder position 5): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.7** Cup **DD** (ladder position 6): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup. **New rendered cup (v2.2)** — must sit visibly between D and E.
- [ ] **P0-6.8** Cup **E** (ladder position 7): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.9** Cup **F** (ladder position 8): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.10** Cup **G** (ladder position 9): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.11** Cup **H** (ladder position 10): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.12** Cup **I** (ladder position 11): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.13** Cup **J** (ladder position 12): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.14** Cup **K** (ladder position 13): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup.
- [ ] **P0-6.15** Cup **L** (ladder position 14): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup. Confirmed renderable (D-07).
- [ ] **P0-6.16** Cup **M** (ladder position 15): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup. Confirmed renderable (D-07).
- [ ] **P0-6.17** Cup **N** (ladder position 16): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup. Confirmed renderable (D-07).
- [ ] **P0-6.18** Cup **O** (ladder position 17): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup. Confirmed renderable (D-07).
- [ ] **P0-6.19** Cup **P** (ladder position 18): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup. Confirmed renderable (D-07).
- [ ] **P0-6.20** Cup **Q** (ladder position 19): find the breast-size slider value; confirm +2.5 cm bust per step from the previous cup. Confirmed renderable (D-07).
- [ ] **P0-6.21** **Reach check (D-07):** render cup Q (full-body render in HS2) on a VeryShort frame, the tightest case. Look for mesh stretch or clipping only; record any fix.
- [ ] **P0-6.22** **Extraction method (SOP-BR R5):** render the body with the breast, render the same body with the breast hidden, alpha-difference, feather. Prove it on the REF-BR doll preset at cup DD: the sprite's edge must vanish into the chest wall.
- [ ] **P0-6.23** **Placement rule (D-25):** a sprite is authored on its own doll and **translated** to that doll's BREAST_L (mirrored for the right) — never scaled. Define what the sprite JSON stores (offset from BREAST_L, NIPPLE attach point) and confirm the offset is identical in meaning for every type, age and height.
- [ ] **P0-6.24** Build the **8 base shape presets:** Flat, Conical, Perky, Round, Teardrop, Wide, Pendulous, Sagging; plus 3 sag grades (slight, light, regular) and the hybrid blender (`X / Y` = 70/30, `X-Y` = 50/50).
- [ ] **P0-6.25** Build the **5 softness presets:** Firm, MediumFirm, Soft, VerySoft, Pillowy (+ half-step blends).
- [ ] **P0-6.26** Build the **position presets:** High, High (−½), High-Medium, Medium, Medium-Low, Low.
- [ ] **P0-6.27** Build the **7 nipple-type presets** (Flat, Puffy, Inverted, Protruding, Wide, LargeProtruding, Long) with a size scale for each of the 8 cup groups (AA-A, B-C, D-DD, E-F, G-H, I-K, L-N, O-Q) and **three arousal states each** — `unaroused`, `light` (lightly aroused), `extreme` (extremely aroused).
- [ ] **P0-6.28** Build the **supernatural-tissue preset** (Round or Teardrop only, High, Firm/MediumFirm, no age modification).
- [ ] **P0-6.29** Test the **+1 firmness rule** at cups C and G: sprites of Athletic, AthleticCurvy, MuscularFeminine and CompactPower are authored one softness step firmer than the Part 3 table.
- [ ] **P0-6.30** Lock the sheet and placement rule: copy to `03_calibration/`, tag. **Done when** any type / age / cup sprite can be authored without guessing.

## P0-7 Age delta presets (D-01, D-02, D-23) — body doll attributes only
- [ ] **P0-7.1** **Female doll delta preset — YoungAdult** (25–29): stomach flat; ass softness +½; waist +1–2 cm; hip +0–1 cm; skin Smooth–Normal; muscle unchanged. Breast age changes are in the sprites (Phase 6). Test on REF-4 and REF-6.
- [ ] **P0-7.2** **Female doll delta preset — RipeningMilf** (30–35): stomach slight soft; ass Toned-Soft; waist +2–4; hip +0–2; skin Smooth-Normal; muscle −1 step. Breast age changes are in the sprites (Phase 6). Test on REF-4 and REF-6.
- [ ] **P0-7.3** **Female doll delta preset — RipeMilf** (35–43): stomach Soft; ass Soft; waist +4–6; hip +2–4; skin Normal; muscle −1 step. Breast age changes are in the sprites (Phase 6). Test on REF-4 and REF-6.
- [ ] **P0-7.4** **Female doll delta preset — MatureMilf** (43–50): stomach Soft→VerySoft; ass VerySoft; waist +6–10; hip +4–6; skin Normal-Rough; muscle −2 steps. Breast age changes are in the sprites (Phase 6). Test on REF-4 and REF-6.
- [ ] **P0-7.5** **Female doll delta preset — OldMilf** (50+): stomach Pudgy/Doughy; ass Pillowy; waist +10–14; hip +6–8; skin Rough; muscle −2 steps. Breast age changes are in the sprites (Phase 6). Test on REF-4 and REF-6.
- [ ] **P0-7.6** **Male doll age preset — YoungAdult** (D-23, by eye): softer than the tier before, in step with the female YoungAdult look. Test on REF-7.
- [ ] **P0-7.7** **Male doll age preset — RipeningMilf** (D-23, by eye): softer than the tier before, in step with the female RipeningMilf look. Test on REF-7.
- [ ] **P0-7.8** **Male doll age preset — RipeMilf** (D-23, by eye): softer than the tier before, in step with the female RipeMilf look. Test on REF-7.
- [ ] **P0-7.9** **Male doll age preset — MatureMilf** (D-23, by eye): softer than the tier before, in step with the female MatureMilf look. Test on REF-7.
- [ ] **P0-7.10** **Male doll age preset — OldMilf** (D-23, by eye): softer than the tier before, in step with the female OldMilf look. Test on REF-7.

## P0-8 Tooling
- [ ] **P0-8.1** **Filename validators** (strip a trailing `_uv` before matching; all lower-case except cup letters). Female doll: `^body_f_(young|youngadult|ripeningmilf|ripemilf|maturemilf|oldmilf)_(\d{3})_([a-z]+(?:_[a-z]+)*)\.png$`. Male doll: `^body_m_(young|youngadult|ripeningmilf|ripemilf|maturemilf|oldmilf)_(\d{3})_([a-z]+)\.png$`. Breast: `^breast_f_(young|youngadult|ripeningmilf|ripemilf|maturemilf|oldmilf|sup)_(\d{3})_([a-z]+(?:_[a-z]+)*)_(AA|DD|[A-Q])\.png$`. Female nipple: `^nipple_f_([a-z]+(?:_[a-z]+)*)_(flat|puffy|inverted|protruding|wide|largeprotruding|long)_(AA-A|B-C|D-DD|E-F|G-H|I-K|L-N|O-Q)_(unaroused|light|extreme)\.png$`. Male nipple: `^nipple_m_([a-z]+)_(small|medium|large)_(unaroused|light|extreme)\.png$`. Also check: cm = canonical for the tag; the cup is inside the body type's allowed range; the nipple's group overlaps the type's cups; a breast sprite's cm matches a height the type has.
- [ ] **P0-8.2** **Manifests:** run Appendix A → `manifest_bodies.csv`, `manifest_sprites.csv`, `valid_composites.csv`. **Done when** the row counts equal §2: 1,182 dolls, 8,412 breast sprites, 945 female + 63 male nipple sprites, 8,412 composites.
- [ ] **P0-8.3** **Status sync:** scan the folders, mark manifest rows `done` when PNG + `_uv.png` + JSON exist and the validator passes.
- [ ] **P0-8.4** **Contact-sheet generator:** per set, per cup-sweep, per height-sweep.
- [ ] **P0-8.5** **Compositor:** body doll + breast sprite (mirror) + nipple + overlays by the z-order spec, applying skin layers per part through the UV passes.
- [ ] **P0-8.6** **Composite sweep + auto-checks** (used in Phase 10): generates every valid composite from its doll + its own sprite + a nipple; checks seam alpha continuity, bounding box, bust measurement vs the rule (±3 cm), sprite-to-doll registration, arm overlap, missing files, and that the sprite belongs to the doll's body type, age tier and height.
- [ ] **P0-8.7** **UV-pass checker:** verifies every `_uv.png` registers with its PNG (same bounds, coverage matches alpha).

## P0-9 QA and compatibility rules
- [ ] **P0-9.1** Adopt SOP-QA (§5.7) and SOP-CQ (§5.6) as written, or edit them now — never mid-production.
- [ ] **P0-9.2** **Adult-proportion reference sheet** in `01_refs/`: pass/fail for limb length, silhouette and head-seam proportion on every petite type (F-02, 03, 22, 23) and VeryShort/Short heights (Q10).
- [ ] **P0-9.3** **Compatibility table (machine-readable):** body type → allowed cups, supported nipples, sweet spot, reference cup. Generated from the catalog Part 3 table; the creator reads it to block invalid combinations. Every allowed cup has its own sprite, so there is **no fallback resolver**.
- [ ] **P0-9.4** **Head seam check with the face track:** a head base placed at NECK_TOP covers the neck seam on REF-1, REF-4 and REF-3 (needs the face track's FH0-3.4 neutral head).

## P0-10 Pilot — prove the whole pipeline (dolls → sprites → composites → skin → overlays)
- [ ] **P0-10.1** Build the **pilot dolls** (Young, SOP-B): F-12 HourglassCurvy Average `body_f_young_165_hourglass_curvy.png` (REF-BR) and VeryTall `body_f_young_183_hourglass_curvy.png`; F-02 PetiteSlim VeryShort `body_f_young_145_petite_slim.png` (REF-1); F-19 Rubenesque Average `body_f_young_165_rubenesque.png` (REF-4).
- [ ] **P0-10.2** Build the **pilot breast sprites** (SOP-BR), each on its own doll: F-02 VSH all 4 cups; F-12 AVG all 10 cups; F-12 VTL cups DD and K; F-19 AVG cups F, J, Q.
- [ ] **P0-10.3** Build the **pilot nipple sprites** (SOP-NP, 3 arousal states each): F-02 all 6 nipple pairs (18 sprites); F-12 groups D-DD and I-K (6 pairs, 18 sprites); F-19 group O-Q (3 pairs, 9 sprites).
- [ ] **P0-10.4** **Cross-height check (D-25):** compare F-12 cups DD and K on the AVG and VTL dolls — the same cup must read as the same cup (projection, softness, position relative to the chest wall). Fix SOP-BR / the placement rule if not.
- [ ] **P0-10.5** **Skin test (UV):** apply three tones (Porcelain, Medium, DeepBrown) to doll + sprite + nipple on four composites (F-02 VSH + C, F-12 AVG + DD, F-12 VTL + K, F-19 AVG + Q), nipple in all three states. Seams must vanish; nipple colour follows the tone mapping in every state.
- [ ] **P0-10.6** **Overlay test:** a Fox tail and Bat wings (folded) on the doll via body anchors; ElvenPointed ears and CurvedRam horns on the face track's neutral head. **Anatomy test (verifies D-30):** one pubic-hair overlay and one labia overlay, translated only, on F-02 VSH, F-12 AVG and F-19 AVG.
- [ ] **P0-10.7** **Age test:** build the RipeMilf F-12 Average doll (SOP-A) and its RipeMilf sprites for cups DD and K; compare with catalog Parts 3–4 line by line. The nipple sprites are reused unchanged (identical across ages) — only the attach point moves.
- [ ] **P0-10.8** **UV test (D-22):** apply one test tattoo layer and one freckle layer to all pilot dolls and sprites without per-body warping.
- [ ] **P0-10.9** Build the remaining REF dolls: REF-2, REF-3, REF-5, REF-6, REF-7, REF-8, REF-10. REF-9 waits for Phase 4.
- [ ] **P0-10.10** Write `pilot_notes.md`: what changed and why; update P0-3 / P0-4 / P0-6 text if standards moved.

## GATE G0

- [ ] All P0 tasks done · [ ] decisions closed · [ ] pilot composites pass · [ ] UV, skin, overlay, age tests pass · [ ] manifest counts match §2 · [ ] calibration locked

---

# PHASE 1 — YOUNG FEMALE BODY DOLLS · AVERAGE HEIGHT (165 cm)

*19 body types exist at Average height. One doll each (no cup).*

## P1-1 Steps
- [ ] **P1-1.1** Confirm Gate G0.
- [ ] **P1-1.2** Tick the cells already finished in Phase 0 (REF-BR, REF-4, REF-5, REF-6).
- [ ] **P1-1.3** Build the remaining dolls with SOP-B in grid order.
- [ ] **P1-1.4** **Type-across review:** one contact sheet of all 19 dolls (neutral grey, no overlays). Each silhouette must match its Part 2 description and differ clearly from its neighbours (SlimStraight vs BananaShape; HourglassSlim vs SlimCurvy).
- [ ] **P1-1.5** **Underbust sanity** (D-27): chart underbust vs waist and hip across the 19 types; any outlier means the derived underbust is wrong for that type — fix the Appendix B target, then the doll.
- [ ] **P1-1.6** **Chest-wall check:** all 19 dolls have a clean, continuous chest wall (SOP-QA Q9).
- [ ] **P1-1.7** Clear every ✖, back up, tag `young-avg-complete`.

## P1-2 Doll grid

#### ⟦YNG·AVG⟧ Young · Average (165 cm) — 19 dolls

File: `body_f_young_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: AVG=165

| Body type | AVG |
|-----------|------|
| F-01 Androgynous | ☐ |
| F-05 Athletic | ☐ |
| F-06 SlimStraight | ☐ |
| F-07 SlimCurvy | ☐ |
| F-08 BananaShape | ☐ |
| F-09 PearShape | ☐ |
| F-10 SpoonShape | ☐ |
| F-11 HourglassSlim | ☐ |
| F-12 HourglassCurvy | ☐ |
| F-13 HourglassFullBust | ☐ |
| F-14 TopHeavy | ☐ |
| F-15 BottomHeavy | ☐ |
| F-16 FullFigured | ☐ |
| F-17 Voluptuous | ☐ |
| F-18 Zaftig | ☐ |
| F-19 Rubenesque | ☐ |
| F-20 AthleticCurvy | ☐ |
| F-21 MuscularFeminine | ☐ |
| F-24 CompactPower | ☐ |

**GATE G1** — [ ] all 19 dolls ✔ · [ ] type-across review signed off · [ ] backup tagged

---

# PHASE 2 — YOUNG FEMALE BODY DOLLS · PETITE HEIGHTS (VeryShort 145 · Short 154 · BelowAverage 160)

## P2-1 Steps
- [ ] **P2-1.1** Confirm Gate G1.
- [ ] **P2-1.2** **Petite-only types first** (F-02 PetiteSlim, F-03 PetiteCurvy, F-22 PetiteHourglass, F-23 MiniVoluptuous): they exist only at VSH/SHT/BAV.
- [ ] **P2-1.3** **Adult-proportion check (Q10, P0-9.2) on every petite doll** before moving on. A failed doll is rebuilt, not patched.
- [ ] **P2-1.4** Build the 19 all-height types at VSH, then SHT, then BAV.
- [ ] **P2-1.5** BelowAverage (158–162) is the border height: each petite-only doll there must sit between its SHT doll and the Average-height neighbours in feel.
- [ ] **P2-1.6** Height-progression sheet per type: VSH → SHT → BAV → AVG (waist, hip, underbust grow in step with height).
- [ ] **P2-1.7** Clear ✖ cells, back up, tag `young-petite-complete`.

## P2-2 Doll grid

#### ⟦YNG·PETITE⟧ Young · petite heights — 69 dolls

File: `body_f_young_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=145, SHT=154, BAV=160

| Body type | VSH | SHT | BAV |
|-----------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ |
| F-02 PetiteSlim | ☐ | ☐ | ☐ |
| F-03 PetiteCurvy | ☐ | ☐ | ☐ |
| F-05 Athletic | ☐ | ☐ | ☐ |
| F-06 SlimStraight | ☐ | ☐ | ☐ |
| F-07 SlimCurvy | ☐ | ☐ | ☐ |
| F-08 BananaShape | ☐ | ☐ | ☐ |
| F-09 PearShape | ☐ | ☐ | ☐ |
| F-10 SpoonShape | ☐ | ☐ | ☐ |
| F-11 HourglassSlim | ☐ | ☐ | ☐ |
| F-12 HourglassCurvy | ☐ | ☐ | ☐ |
| F-13 HourglassFullBust | ☐ | ☐ | ☐ |
| F-14 TopHeavy | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ |
| F-16 FullFigured | ☐ | ☐ | ☐ |
| F-17 Voluptuous | ☐ | ☐ | ☐ |
| F-18 Zaftig | ☐ | ☐ | ☐ |
| F-19 Rubenesque | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | ☐ | ☐ | ☐ |
| F-21 MuscularFeminine | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | ☐ | ☐ | ☐ |
| F-23 MiniVoluptuous | ☐ | ☐ | ☐ |
| F-24 CompactPower | ☐ | ☐ | ☐ |

**GATE G2** — [ ] all 69 dolls ✔ · [ ] adult-proportion check passed on every petite doll

---

# PHASE 3 — YOUNG FEMALE BODY DOLLS · TALL HEIGHTS (AboveAverage 170 · Tall 176 · VeryTall 183)

## P3-1 Steps
- [ ] **P3-1.1** Confirm Gate G2.
- [ ] **P3-1.2** **Willowy (F-04) first** — it exists only at AAV/TAL/VTL.
- [ ] **P3-1.3** Build the 19 all-height types at AAV, then TAL, then VTL.
- [ ] **P3-1.4** Height-progression sheet per type from AVG → VTL.
- [ ] **P3-1.5** **Seven-height strip** for each of the 19 all-height types (VSH → VTL), one image each. Look for non-linear jumps.
- [ ] **P3-1.6** Clear ✖ cells, back up, tag `young-female-complete`.

## P3-2 Doll grid

#### ⟦YNG·TALL⟧ Young · tall heights — 60 dolls

File: `body_f_young_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: AAV=170, TAL=176, VTL=183

| Body type | AAV | TAL | VTL |
|-----------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ |
| F-04 Willowy | ☐ | ☐ | ☐ |
| F-05 Athletic | ☐ | ☐ | ☐ |
| F-06 SlimStraight | ☐ | ☐ | ☐ |
| F-07 SlimCurvy | ☐ | ☐ | ☐ |
| F-08 BananaShape | ☐ | ☐ | ☐ |
| F-09 PearShape | ☐ | ☐ | ☐ |
| F-10 SpoonShape | ☐ | ☐ | ☐ |
| F-11 HourglassSlim | ☐ | ☐ | ☐ |
| F-12 HourglassCurvy | ☐ | ☐ | ☐ |
| F-13 HourglassFullBust | ☐ | ☐ | ☐ |
| F-14 TopHeavy | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ |
| F-16 FullFigured | ☐ | ☐ | ☐ |
| F-17 Voluptuous | ☐ | ☐ | ☐ |
| F-18 Zaftig | ☐ | ☐ | ☐ |
| F-19 Rubenesque | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | ☐ | ☐ | ☐ |
| F-21 MuscularFeminine | ☐ | ☐ | ☐ |
| F-24 CompactPower | ☐ | ☐ | ☐ |

**GATE G3 — YOUNG FEMALE BODIES COMPLETE** — [ ] 60 tall dolls ✔ · [ ] all 148 Young dolls ✔ · [ ] strips reviewed

---

# PHASE 4 — FEMALE AGE VARIANTS OF THE BODY DOLL (YoungAdult · RipeningMilf · RipeMilf · MatureMilf · OldMilf)

*Each tier ages the finished **Young preset** (SOP-A) and re-renders. Only body attributes change here — breast age changes are in Phase 6.*

- [ ] **P4-0.1** Confirm Gate G3 and the P0-7 delta presets.

## P4-1 YoungAdult (25–29)

- [ ] **P4-1.1** **Pilot doll:** F-12 HourglassCurvy · Average via SOP-A; compare with the previous tier and with catalog Part 4; fix the delta preset before going on.
- [ ] **P4-1.2** Build all 148 dolls in the grid below, Average column first.
- [ ] **P4-1.3** **Age comparison sheet:** every type at its middle height, Young beside YoungAdult; only age-driven changes may differ.
- [ ] **P4-1.4** Clear ✖ cells, back up, tag `youngadult-complete`.

#### ⟦YAD⟧ YoungAdult — 148 dolls

File: `body_f_youngadult_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=145, SHT=154, BAV=160, AVG=165, AAV=170, TAL=176, VTL=183

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | — | — | — | — |
| F-03 PetiteCurvy | ☐ | ☐ | ☐ | — | — | — | — |
| F-04 Willowy | — | — | — | — | ☐ | ☐ | ☐ |
| F-05 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-07 SlimCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-10 SpoonShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-11 HourglassSlim | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-12 HourglassCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-13 HourglassFullBust | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-16 FullFigured | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-19 Rubenesque | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-21 MuscularFeminine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | ☐ | ☐ | ☐ | — | — | — | — |
| F-23 MiniVoluptuous | ☐ | ☐ | ☐ | — | — | — | — |
| F-24 CompactPower | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**GATE G4.YAD** — [ ] 148 dolls ✔ · [ ] age comparison signed off

## P4-2 RipeningMilf (30–35)

- [ ] **P4-2.1** **Pilot doll:** F-12 HourglassCurvy · Average via SOP-A; compare with the previous tier and with catalog Part 4; fix the delta preset before going on.
- [ ] **P4-2.2** Build all 148 dolls in the grid below, Average column first.
- [ ] **P4-2.3** **Age comparison sheet:** every type at its middle height, Young beside RipeningMilf; only age-driven changes may differ.
- [ ] **P4-2.4** Clear ✖ cells, back up, tag `ripeningmilf-complete`.

#### ⟦RPG⟧ RipeningMilf — 148 dolls

File: `body_f_ripeningmilf_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=145, SHT=154, BAV=160, AVG=165, AAV=170, TAL=176, VTL=183

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | — | — | — | — |
| F-03 PetiteCurvy | ☐ | ☐ | ☐ | — | — | — | — |
| F-04 Willowy | — | — | — | — | ☐ | ☐ | ☐ |
| F-05 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-07 SlimCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-10 SpoonShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-11 HourglassSlim | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-12 HourglassCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-13 HourglassFullBust | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-16 FullFigured | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-19 Rubenesque | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-21 MuscularFeminine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | ☐ | ☐ | ☐ | — | — | — | — |
| F-23 MiniVoluptuous | ☐ | ☐ | ☐ | — | — | — | — |
| F-24 CompactPower | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**GATE G4.RPG** — [ ] 148 dolls ✔ · [ ] age comparison signed off

## P4-3 RipeMilf (35–43)

- [ ] **P4-3.1** **Pilot doll:** F-12 HourglassCurvy · Average via SOP-A; compare with the previous tier and with catalog Part 4; fix the delta preset before going on.
- [ ] **P4-3.2** Build all 148 dolls in the grid below, Average column first.
- [ ] **P4-3.3** **Age comparison sheet:** every type at its middle height, Young beside RipeMilf; only age-driven changes may differ.
- [ ] **P4-3.4** Clear ✖ cells, back up, tag `ripemilf-complete`.

#### ⟦RPE⟧ RipeMilf — 148 dolls

File: `body_f_ripemilf_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=145, SHT=154, BAV=160, AVG=165, AAV=170, TAL=176, VTL=183

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | — | — | — | — |
| F-03 PetiteCurvy | ☐ | ☐ | ☐ | — | — | — | — |
| F-04 Willowy | — | — | — | — | ☐ | ☐ | ☐ |
| F-05 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-07 SlimCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-10 SpoonShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-11 HourglassSlim | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-12 HourglassCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-13 HourglassFullBust | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-16 FullFigured | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-19 Rubenesque | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-21 MuscularFeminine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | ☐ | ☐ | ☐ | — | — | — | — |
| F-23 MiniVoluptuous | ☐ | ☐ | ☐ | — | — | — | — |
| F-24 CompactPower | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**GATE G4.RPE** — [ ] 148 dolls ✔ · [ ] age comparison signed off

## P4-4 MatureMilf (43–50)

- [ ] **P4-4.1** **Pilot doll:** F-12 HourglassCurvy · Average via SOP-A; compare with the previous tier and with catalog Part 4; fix the delta preset before going on.
- [ ] **P4-4.2** Build all 148 dolls in the grid below, Average column first.
- [ ] **P4-4.3** **Age comparison sheet:** every type at its middle height, Young beside MatureMilf; only age-driven changes may differ.
- [ ] **P4-4.4** Clear ✖ cells, back up, tag `maturemilf-complete`.

#### ⟦MAT⟧ MatureMilf — 148 dolls

File: `body_f_maturemilf_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=145, SHT=154, BAV=160, AVG=165, AAV=170, TAL=176, VTL=183

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | — | — | — | — |
| F-03 PetiteCurvy | ☐ | ☐ | ☐ | — | — | — | — |
| F-04 Willowy | — | — | — | — | ☐ | ☐ | ☐ |
| F-05 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-07 SlimCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-10 SpoonShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-11 HourglassSlim | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-12 HourglassCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-13 HourglassFullBust | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-16 FullFigured | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-19 Rubenesque | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-21 MuscularFeminine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | ☐ | ☐ | ☐ | — | — | — | — |
| F-23 MiniVoluptuous | ☐ | ☐ | ☐ | — | — | — | — |
| F-24 CompactPower | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**GATE G4.MAT** — [ ] 148 dolls ✔ · [ ] age comparison signed off

## P4-5 OldMilf (50+)

- [ ] **P4-5.1** **Pilot doll:** F-12 HourglassCurvy · Average via SOP-A; compare with the previous tier and with catalog Part 4; fix the delta preset before going on. Also build **REF-9** (`body_f_oldmilf_165_rubenesque.png`).
- [ ] **P4-5.2** Build all 148 dolls in the grid below, Average column first.
- [ ] **P4-5.3** **Age comparison sheet:** every type at its middle height, Young beside OldMilf; only age-driven changes may differ.
- [ ] **P4-5.4** Clear ✖ cells, back up, tag `oldmilf-complete`.

#### ⟦OLD⟧ OldMilf — 148 dolls

File: `body_f_oldmilf_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=145, SHT=154, BAV=160, AVG=165, AAV=170, TAL=176, VTL=183

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | — | — | — | — |
| F-03 PetiteCurvy | ☐ | ☐ | ☐ | — | — | — | — |
| F-04 Willowy | — | — | — | — | ☐ | ☐ | ☐ |
| F-05 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-07 SlimCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-10 SpoonShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-11 HourglassSlim | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-12 HourglassCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-13 HourglassFullBust | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-16 FullFigured | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-19 Rubenesque | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-21 MuscularFeminine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | ☐ | ☐ | ☐ | — | — | — | — |
| F-23 MiniVoluptuous | ☐ | ☐ | ☐ | — | — | — | — |
| F-24 CompactPower | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**GATE G4.OLD** — [ ] 148 dolls ✔ · [ ] age comparison signed off

---

# PHASE 5 — MALE BODY DOLLS (7 types × 7 heights × 6 age tiers)

## P5-1 Steps
- [ ] **P5-1.1** Confirm Gate G0, the male calibration (P0-5) and the male age presets (P0-7.6–7.10).
- [ ] **P5-1.2** **Young first:** all 49 with SOP-M, Average height first. REF-7 and REF-8 are done — tick them.
- [ ] **P5-1.3** Type-across sheet at Average (7 types): each reads as its catalog description; Hypermasculine has the widest shoulder-to-waist ratio.
- [ ] **P5-1.4** Height-progression strip per type (VSH → VTL).
- [ ] **P5-1.5** Build YoungAdult → OldMilf with the male age presets; compare each tier with the one before.
- [ ] **P5-1.6** Back up, tag `male-complete`.

## P5-2 Doll grids

#### ⟦M·YNG⟧ Male · Young — 49 dolls

File: `body_m_young_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=155, SHT=164, BAV=170, AVG=174, AAV=179, TAL=186, VTL=193

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| M-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-02 Lean | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-03 Average | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-04 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-05 Muscular | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-06 Stocky | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-07 Hypermasculine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

#### ⟦M·YAD⟧ Male · YoungAdult — 49 dolls

File: `body_m_youngadult_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=155, SHT=164, BAV=170, AVG=174, AAV=179, TAL=186, VTL=193

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| M-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-02 Lean | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-03 Average | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-04 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-05 Muscular | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-06 Stocky | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-07 Hypermasculine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

#### ⟦M·RPG⟧ Male · RipeningMilf — 49 dolls

File: `body_m_ripeningmilf_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=155, SHT=164, BAV=170, AVG=174, AAV=179, TAL=186, VTL=193

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| M-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-02 Lean | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-03 Average | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-04 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-05 Muscular | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-06 Stocky | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-07 Hypermasculine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

#### ⟦M·RPE⟧ Male · RipeMilf — 49 dolls

File: `body_m_ripemilf_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=155, SHT=164, BAV=170, AVG=174, AAV=179, TAL=186, VTL=193

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| M-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-02 Lean | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-03 Average | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-04 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-05 Muscular | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-06 Stocky | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-07 Hypermasculine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

#### ⟦M·MAT⟧ Male · MatureMilf — 49 dolls

File: `body_m_maturemilf_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=155, SHT=164, BAV=170, AVG=174, AAV=179, TAL=186, VTL=193

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| M-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-02 Lean | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-03 Average | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-04 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-05 Muscular | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-06 Stocky | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-07 Hypermasculine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

#### ⟦M·OLD⟧ Male · OldMilf — 49 dolls

File: `body_m_oldmilf_{cm}_{token}.png` (+ `_uv.png` + `.json`) · cm: VSH=155, SHT=164, BAV=170, AVG=174, AAV=179, TAL=186, VTL=193

| Body type | VSH | SHT | BAV | AVG | AAV | TAL | VTL |
|-----------|------|------|------|------|------|------|------|
| M-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-02 Lean | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-03 Average | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-04 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-05 Muscular | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-06 Stocky | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-07 Hypermasculine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**GATE G5** — [ ] all 294 male dolls ✔ · [ ] backup tagged

---

# PHASE 6 — BREAST AND NIPPLE SPRITES

*Your rules: **breast sprites** are keyed by body type × age tier × height × cup, authored on that exact doll, never scaled — **8,412** of them, one per valid composite. **Nipple sprites** are identical across ages (and, by default, heights) but every nipple type has three arousal states — **945** female + **63** male. Total **9,420** assets, each with its UV pass and JSON. Sprites are the left side; the right is the mirror.*

## P6-1 Setup
- [ ] **P6-1.1** Confirm Gate G0: calibration sheet, extraction method and placement rule locked; pilot sprites and nipples passed.
- [ ] **P6-1.2** **Workflow rule:** build a doll's sprites **right after that doll passes QA**, while its preset is open (SOP-B B9). The grids in P6-2 mirror the doll grids of Phases 1–4 — one grid per (age tier × height).
- [ ] **P6-1.3** Sprite canvas 512 × 512 at 8 px/cm; names `breast_f_{age}_{cm}_{token}_{cup}.png` and `nipple_f_{token}_{type}_{group}_{state}.png` (§4); JSON as P0-4.3.
- [ ] **P6-1.4** Order inside a doll: cups low → high. Order across dolls: follow the doll phases (Young · Average first). Nipple sprites (P6-3) are independent of dolls and can be built any time after P0-6.
- [ ] **P6-1.5** **Before starting any sprite, pull up all three quick-reference cards from Part 3:**
  - **Breast shape card** — tells you which shape (Perky / Round / Teardrop / Wide / Pendulous) to author for this cup × age. Shape is baked into the sprite; it is not a separate overlay.
  - **Breast softness card** — tells you the softness setting (Firm → Pillowy) for this cup × age. Athletic / Muscular body types are one step firmer.
  - **Nipple type card** — tells you which nipple type is primary and which are alternates for this cup group. Each type needs three arousal states (unaroused · light · extreme). Build all three alternates per group.
  - Supernatural sprites (Succubus, Goddess, Angel) override all three: shape = Round (≤C) or Teardrop (≥D); softness = Firm or MediumFirm; position = always High; no age drift.

## P6-2 Breast sprites — one grid per age tier × height

- [ ] **P6-2.1a** **Young:** build all 1,402 sprites (7 grids below), each right after its doll passes QA.
- [ ] **P6-2.1b** **Young review:** for every body type a ladder sheet at one height (cups low → high, bust +2.5 cm per step, nothing jumps) and a height strip at one cup (same cup reads as the same cup at every height).
- [ ] **P6-2.2a** **YoungAdult:** build all 1,402 sprites (7 grids below), each right after its doll passes QA.
- [ ] **P6-2.2b** **YoungAdult review:** for every body type a ladder sheet at one height (cups low → high, bust +2.5 cm per step, nothing jumps) and a height strip at one cup (same cup reads as the same cup at every height); age sheet against Young for cups A, D, G, K, Q.
- [ ] **P6-2.3a** **RipeningMilf:** build all 1,402 sprites (7 grids below), each right after its doll passes QA.
- [ ] **P6-2.3b** **RipeningMilf review:** for every body type a ladder sheet at one height (cups low → high, bust +2.5 cm per step, nothing jumps) and a height strip at one cup (same cup reads as the same cup at every height); age sheet against YoungAdult for cups A, D, G, K, Q.
- [ ] **P6-2.4a** **RipeMilf:** build all 1,402 sprites (7 grids below), each right after its doll passes QA.
- [ ] **P6-2.4b** **RipeMilf review:** for every body type a ladder sheet at one height (cups low → high, bust +2.5 cm per step, nothing jumps) and a height strip at one cup (same cup reads as the same cup at every height); age sheet against RipeningMilf for cups A, D, G, K, Q.
- [ ] **P6-2.5a** **MatureMilf:** build all 1,402 sprites (7 grids below), each right after its doll passes QA.
- [ ] **P6-2.5b** **MatureMilf review:** for every body type a ladder sheet at one height (cups low → high, bust +2.5 cm per step, nothing jumps) and a height strip at one cup (same cup reads as the same cup at every height); age sheet against RipeMilf for cups A, D, G, K, Q.
- [ ] **P6-2.6a** **OldMilf:** build all 1,402 sprites (7 grids below), each right after its doll passes QA.
- [ ] **P6-2.6b** **OldMilf review:** for every body type a ladder sheet at one height (cups low → high, bust +2.5 cm per step, nothing jumps) and a height strip at one cup (same cup reads as the same cup at every height); age sheet against MatureMilf for cups A, D, G, K, Q.

#### ⟦BR·YNG·VSH⟧ Breast sprites · Young · VeryShort (145 cm) — 23 types · 214 sprites

File: `breast_f_young_145_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YNG·SHT⟧ Breast sprites · Young · Short (154 cm) — 23 types · 214 sprites

File: `breast_f_young_154_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YNG·BAV⟧ Breast sprites · Young · BelowAverage (160 cm) — 23 types · 214 sprites

File: `breast_f_young_160_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YNG·AVG⟧ Breast sprites · Young · Average (165 cm) — 19 types · 187 sprites

File: `breast_f_young_165_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YNG·AAV⟧ Breast sprites · Young · AboveAverage (170 cm) — 20 types · 191 sprites

File: `breast_f_young_170_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YNG·TAL⟧ Breast sprites · Young · Tall (176 cm) — 20 types · 191 sprites

File: `breast_f_young_176_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YNG·VTL⟧ Breast sprites · Young · VeryTall (183 cm) — 20 types · 191 sprites

File: `breast_f_young_183_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YAD·VSH⟧ Breast sprites · YoungAdult · VeryShort (145 cm) — 23 types · 214 sprites

File: `breast_f_youngadult_145_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YAD·SHT⟧ Breast sprites · YoungAdult · Short (154 cm) — 23 types · 214 sprites

File: `breast_f_youngadult_154_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YAD·BAV⟧ Breast sprites · YoungAdult · BelowAverage (160 cm) — 23 types · 214 sprites

File: `breast_f_youngadult_160_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YAD·AVG⟧ Breast sprites · YoungAdult · Average (165 cm) — 19 types · 187 sprites

File: `breast_f_youngadult_165_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YAD·AAV⟧ Breast sprites · YoungAdult · AboveAverage (170 cm) — 20 types · 191 sprites

File: `breast_f_youngadult_170_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YAD·TAL⟧ Breast sprites · YoungAdult · Tall (176 cm) — 20 types · 191 sprites

File: `breast_f_youngadult_176_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·YAD·VTL⟧ Breast sprites · YoungAdult · VeryTall (183 cm) — 20 types · 191 sprites

File: `breast_f_youngadult_183_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPG·VSH⟧ Breast sprites · RipeningMilf · VeryShort (145 cm) — 23 types · 214 sprites

File: `breast_f_ripeningmilf_145_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPG·SHT⟧ Breast sprites · RipeningMilf · Short (154 cm) — 23 types · 214 sprites

File: `breast_f_ripeningmilf_154_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPG·BAV⟧ Breast sprites · RipeningMilf · BelowAverage (160 cm) — 23 types · 214 sprites

File: `breast_f_ripeningmilf_160_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPG·AVG⟧ Breast sprites · RipeningMilf · Average (165 cm) — 19 types · 187 sprites

File: `breast_f_ripeningmilf_165_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPG·AAV⟧ Breast sprites · RipeningMilf · AboveAverage (170 cm) — 20 types · 191 sprites

File: `breast_f_ripeningmilf_170_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPG·TAL⟧ Breast sprites · RipeningMilf · Tall (176 cm) — 20 types · 191 sprites

File: `breast_f_ripeningmilf_176_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPG·VTL⟧ Breast sprites · RipeningMilf · VeryTall (183 cm) — 20 types · 191 sprites

File: `breast_f_ripeningmilf_183_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPE·VSH⟧ Breast sprites · RipeMilf · VeryShort (145 cm) — 23 types · 214 sprites

File: `breast_f_ripemilf_145_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPE·SHT⟧ Breast sprites · RipeMilf · Short (154 cm) — 23 types · 214 sprites

File: `breast_f_ripemilf_154_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPE·BAV⟧ Breast sprites · RipeMilf · BelowAverage (160 cm) — 23 types · 214 sprites

File: `breast_f_ripemilf_160_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPE·AVG⟧ Breast sprites · RipeMilf · Average (165 cm) — 19 types · 187 sprites

File: `breast_f_ripemilf_165_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPE·AAV⟧ Breast sprites · RipeMilf · AboveAverage (170 cm) — 20 types · 191 sprites

File: `breast_f_ripemilf_170_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPE·TAL⟧ Breast sprites · RipeMilf · Tall (176 cm) — 20 types · 191 sprites

File: `breast_f_ripemilf_176_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·RPE·VTL⟧ Breast sprites · RipeMilf · VeryTall (183 cm) — 20 types · 191 sprites

File: `breast_f_ripemilf_183_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·MAT·VSH⟧ Breast sprites · MatureMilf · VeryShort (145 cm) — 23 types · 214 sprites

File: `breast_f_maturemilf_145_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·MAT·SHT⟧ Breast sprites · MatureMilf · Short (154 cm) — 23 types · 214 sprites

File: `breast_f_maturemilf_154_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·MAT·BAV⟧ Breast sprites · MatureMilf · BelowAverage (160 cm) — 23 types · 214 sprites

File: `breast_f_maturemilf_160_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·MAT·AVG⟧ Breast sprites · MatureMilf · Average (165 cm) — 19 types · 187 sprites

File: `breast_f_maturemilf_165_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·MAT·AAV⟧ Breast sprites · MatureMilf · AboveAverage (170 cm) — 20 types · 191 sprites

File: `breast_f_maturemilf_170_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·MAT·TAL⟧ Breast sprites · MatureMilf · Tall (176 cm) — 20 types · 191 sprites

File: `breast_f_maturemilf_176_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·MAT·VTL⟧ Breast sprites · MatureMilf · VeryTall (183 cm) — 20 types · 191 sprites

File: `breast_f_maturemilf_183_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·OLD·VSH⟧ Breast sprites · OldMilf · VeryShort (145 cm) — 23 types · 214 sprites

File: `breast_f_oldmilf_145_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·OLD·SHT⟧ Breast sprites · OldMilf · Short (154 cm) — 23 types · 214 sprites

File: `breast_f_oldmilf_154_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·OLD·BAV⟧ Breast sprites · OldMilf · BelowAverage (160 cm) — 23 types · 214 sprites

File: `breast_f_oldmilf_160_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-03 PetiteCurvy | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-23 MiniVoluptuous | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·OLD·AVG⟧ Breast sprites · OldMilf · Average (165 cm) — 19 types · 187 sprites

File: `breast_f_oldmilf_165_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·OLD·AAV⟧ Breast sprites · OldMilf · AboveAverage (170 cm) — 20 types · 191 sprites

File: `breast_f_oldmilf_170_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·OLD·TAL⟧ Breast sprites · OldMilf · Tall (176 cm) — 20 types · 191 sprites

File: `breast_f_oldmilf_176_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

#### ⟦BR·OLD·VTL⟧ Breast sprites · OldMilf · VeryTall (183 cm) — 20 types · 191 sprites

File: `breast_f_oldmilf_183_{token}_{cup}.png` (+ `_uv.png` + `.json`)

| Body type | AA | A | B | C | D | DD | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|-----------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-05 Athletic | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| F-07 SlimCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-10 SpoonShape | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-11 HourglassSlim | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |
| F-12 HourglassCurvy | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-13 HourglassFullBust | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — | — |
| F-16 FullFigured | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — |
| F-19 Rubenesque | — | — | — | — | — | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — |
| F-21 MuscularFeminine | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | — | — | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — | — | — | — | — | — | — | — | — | — | — |

## P6-3 Female nipple sprites — per body type × nipple × 3 arousal states

*Identical across ages and heights. Authored once per body type (SOP-NP) at the nipple authoring height (§4.4).*

### F-01 Androgynous — 6 nipples × 3 states = **18 sprites**

- [ ] **P6-3.01** Build and review F-01 Androgynous: all 6 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_androgynous_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |

### F-02 PetiteSlim — 6 nipples × 3 states = **18 sprites**

- [ ] **P6-3.02** Build and review F-02 PetiteSlim: all 6 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_petite_slim_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |

### F-03 PetiteCurvy — 15 nipples × 3 states = **45 sprites**

- [ ] **P6-3.03** Build and review F-03 PetiteCurvy: all 15 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_petite_curvy_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |

### F-04 Willowy — 6 nipples × 3 states = **18 sprites**

- [ ] **P6-3.04** Build and review F-04 Willowy: all 6 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_willowy_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |

### F-05 Athletic — 15 nipples × 3 states = **45 sprites**

- [ ] **P6-3.05** Build and review F-05 Athletic: all 15 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_athletic_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |

### F-06 SlimStraight — 6 nipples × 3 states = **18 sprites**

- [ ] **P6-3.06** Build and review F-06 SlimStraight: all 6 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_slim_straight_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |

### F-07 SlimCurvy — 9 nipples × 3 states = **27 sprites**

- [ ] **P6-3.07** Build and review F-07 SlimCurvy: all 9 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_slim_curvy_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |

### F-08 BananaShape — 12 nipples × 3 states = **36 sprites**

- [ ] **P6-3.08** Build and review F-08 BananaShape: all 12 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_banana_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |

### F-09 PearShape — 18 nipples × 3 states = **54 sprites**

- [ ] **P6-3.09** Build and review F-09 PearShape: all 18 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_pear_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |

### F-10 SpoonShape — 18 nipples × 3 states = **54 sprites**

- [ ] **P6-3.10** Build and review F-10 SpoonShape: all 18 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_spoon_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |

### F-11 HourglassSlim — 12 nipples × 3 states = **36 sprites**

- [ ] **P6-3.11** Build and review F-11 HourglassSlim: all 12 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_hourglass_slim_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |

### F-12 HourglassCurvy — 15 nipples × 3 states = **45 sprites**

- [ ] **P6-3.12** Build and review F-12 HourglassCurvy: all 15 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_hourglass_curvy_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |

### F-13 HourglassFullBust — 15 nipples × 3 states = **45 sprites**

- [ ] **P6-3.13** Build and review F-13 HourglassFullBust: all 15 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_hourglass_fullbust_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |
| L-N · LargeProtruding | ☐ | ☐ | ☐ |
| L-N · Wide | ☐ | ☐ | ☐ |
| L-N · Long | ☐ | ☐ | ☐ |
| O-Q · LargeProtruding | ☐ | ☐ | ☐ |
| O-Q · Wide | ☐ | ☐ | ☐ |
| O-Q · Long | ☐ | ☐ | ☐ |

### F-14 TopHeavy — 18 nipples × 3 states = **54 sprites**

- [ ] **P6-3.14** Build and review F-14 TopHeavy: all 18 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_top_heavy_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |
| L-N · LargeProtruding | ☐ | ☐ | ☐ |
| L-N · Wide | ☐ | ☐ | ☐ |
| L-N · Long | ☐ | ☐ | ☐ |
| O-Q · LargeProtruding | ☐ | ☐ | ☐ |
| O-Q · Wide | ☐ | ☐ | ☐ |
| O-Q · Long | ☐ | ☐ | ☐ |

### F-15 BottomHeavy — 12 nipples × 3 states = **36 sprites**

- [ ] **P6-3.15** Build and review F-15 BottomHeavy: all 12 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_bottom_heavy_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |

### F-16 FullFigured — 18 nipples × 3 states = **54 sprites**

- [ ] **P6-3.16** Build and review F-16 FullFigured: all 18 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_full_figured_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |
| L-N · LargeProtruding | ☐ | ☐ | ☐ |
| L-N · Wide | ☐ | ☐ | ☐ |
| L-N · Long | ☐ | ☐ | ☐ |
| O-Q · LargeProtruding | ☐ | ☐ | ☐ |
| O-Q · Wide | ☐ | ☐ | ☐ |
| O-Q · Long | ☐ | ☐ | ☐ |

### F-17 Voluptuous — 15 nipples × 3 states = **45 sprites**

- [ ] **P6-3.17** Build and review F-17 Voluptuous: all 15 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_voluptuous_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |
| L-N · LargeProtruding | ☐ | ☐ | ☐ |
| L-N · Wide | ☐ | ☐ | ☐ |
| L-N · Long | ☐ | ☐ | ☐ |
| O-Q · LargeProtruding | ☐ | ☐ | ☐ |
| O-Q · Wide | ☐ | ☐ | ☐ |
| O-Q · Long | ☐ | ☐ | ☐ |

### F-18 Zaftig — 12 nipples × 3 states = **36 sprites**

- [ ] **P6-3.18** Build and review F-18 Zaftig: all 12 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_zaftig_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |

### F-19 Rubenesque — 15 nipples × 3 states = **45 sprites**

- [ ] **P6-3.19** Build and review F-19 Rubenesque: all 15 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_rubenesque_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |
| L-N · LargeProtruding | ☐ | ☐ | ☐ |
| L-N · Wide | ☐ | ☐ | ☐ |
| L-N · Long | ☐ | ☐ | ☐ |
| O-Q · LargeProtruding | ☐ | ☐ | ☐ |
| O-Q · Wide | ☐ | ☐ | ☐ |
| O-Q · Long | ☐ | ☐ | ☐ |

### F-20 AthleticCurvy — 12 nipples × 3 states = **36 sprites**

- [ ] **P6-3.20** Build and review F-20 AthleticCurvy: all 12 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_athletic_curvy_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |

### F-21 MuscularFeminine — 24 nipples × 3 states = **72 sprites**

- [ ] **P6-3.21** Build and review F-21 MuscularFeminine: all 24 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_muscular_feminine_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |
| I-K · LargeProtruding | ☐ | ☐ | ☐ |
| I-K · Wide | ☐ | ☐ | ☐ |
| I-K · Long | ☐ | ☐ | ☐ |
| L-N · LargeProtruding | ☐ | ☐ | ☐ |
| L-N · Wide | ☐ | ☐ | ☐ |
| L-N · Long | ☐ | ☐ | ☐ |
| O-Q · LargeProtruding | ☐ | ☐ | ☐ |
| O-Q · Wide | ☐ | ☐ | ☐ |
| O-Q · Long | ☐ | ☐ | ☐ |

### F-22 PetiteHourglass — 15 nipples × 3 states = **45 sprites**

- [ ] **P6-3.22** Build and review F-22 PetiteHourglass: all 15 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_petite_hourglass_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| AA-A · Flat | ☐ | ☐ | ☐ |
| AA-A · Puffy | ☐ | ☐ | ☐ |
| AA-A · Inverted | ☐ | ☐ | ☐ |
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |

### F-23 MiniVoluptuous — 12 nipples × 3 states = **36 sprites**

- [ ] **P6-3.23** Build and review F-23 MiniVoluptuous: all 12 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_mini_voluptuous_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Wide | ☐ | ☐ | ☐ |
| G-H · LargeProtruding | ☐ | ☐ | ☐ |
| G-H · Long | ☐ | ☐ | ☐ |

### F-24 CompactPower — 9 nipples × 3 states = **27 sprites**

- [ ] **P6-3.24** Build and review F-24 CompactPower: all 9 supported nipples in `unaroused`, `light`, `extreme` (SOP-NP); check each trio reads as one nipple at three stages, and test on the smallest and largest cup of each group at Young and OldMilf.

File: `nipple_f_compact_power_{type}_{group}_{state}.png`

| Nipple (group · type) | unaroused | light | extreme |
|-----------------------|-----------|-------|---------|
| B-C · Puffy | ☐ | ☐ | ☐ |
| B-C · Protruding | ☐ | ☐ | ☐ |
| B-C · Flat | ☐ | ☐ | ☐ |
| D-DD · Protruding | ☐ | ☐ | ☐ |
| D-DD · Wide | ☐ | ☐ | ☐ |
| D-DD · Puffy | ☐ | ☐ | ☐ |
| E-F · Protruding | ☐ | ☐ | ☐ |
| E-F · Wide | ☐ | ☐ | ☐ |
| E-F · LargeProtruding | ☐ | ☐ | ☐ |

## P6-4 Male nipple sprites — 7 body types × 3 sizes × 3 arousal states
- [ ] **P6-4.1** Build with SOP-NP (male): authored on each male type's Average-height Young preset; sizes Small, Medium, Large, each in `unaroused`, `light`, `extreme`. File `nipple_m_{token}_{size}_{state}.png`.

#### ⟦M-NIP⟧ Male nipple sprites (S/M/L · state)

| Body type | S·unaroused | S·light | S·extreme | M·unaroused | M·light | M·extreme | L·unaroused | L·light | L·extreme |
|-----------|-------------|---------|-----------|-------------|---------|-----------|-------------|---------|-----------|
| M-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-02 Lean | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-03 Average | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-04 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-05 Muscular | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-06 Stocky | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| M-07 Hypermasculine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

## P6-5 Supernatural-tissue breasts (D-14, built on demand)
- [ ] **P6-5.1** Rule (catalog Part 3): Round or Teardrop only, always High, always Firm/MediumFirm, **no age variants**. Key = body type × height × cup: `breast_f_sup_{cm}_{token}_{cup}.png`; nipples reuse that type's sprites.
- [ ] **P6-5.2** When a named character or race kit needs supernatural tissue (Succubus, Goddess, Angel), build the sprites for that doll and the cups used, log them in the manifest, and compare with the natural Young sprite (visibly higher and firmer, never saggy). The full set would be 1,402 sprites.

## P6-6 Cross-checks
- [ ] **P6-6.1** **Cross-height consistency:** for 8 REF types (REF-BR, 1, 2, 3, 4, 5, 6, 10) at Young, the smallest, middle and largest allowed cup on the shortest, middle and tallest doll: the same cup has the same projection and the same position relative to the chest wall.
- [ ] **P6-6.2** **Arousal check:** every nipple type in all three states on cups A, G and Q composites at Young and OldMilf; `light` sits visibly between `unaroused` and `extreme`.
- [ ] **P6-6.3** **Tone test:** nine tones (one per nipple-colour group) on cups A, G, Q: seam invisible, nipple colour correct in all three states.
- [ ] **P6-6.4** **Feature test:** a freckle layer, a scar layer and a tattoo crossing the breast/chest seam on three composites: continuous across the seam.
- [ ] **P6-6.5** **Mirror test:** the right breast (mirrored) sits symmetrically about the sternum on three different types.
- [ ] **P6-6.6** **Composite bust test:** 20 random valid combinations, measured bust within ±3 cm of the rule.
- [ ] **P6-6.7** **Cross-type consistency:** the same cup at the same tier looks like the same cup on different types (differences only where the type's rules say so — e.g. +1 firm types).

**GATE G6** — [ ] 8,412 breast sprites ✔ · [ ] 945 female + 63 male nipple sprites ✔ · [ ] P6-6 cross-checks passed

---

# PHASE 7 — SKIN OVERLAYS (was Phase 6)

*Authored in UV space and applied to each part (doll, breast sprite, nipple, head) through its UV pass (D-13, D-22). May run in parallel with Phases 2–6 after G0.*

## P7-1 Setup
- [ ] **P7-1.1** Confirm D-13 and D-22 (UV test in P0-10.7 passed).
- [ ] **P7-1.2** File names: `skin_tone_{tone}.png`, `skin_tex_{texture}.png`, `skin_tat_{level}_{design}.png`, `skin_preset_{name}.json` (tone + texture + feature + tattoo + gloss).
- [ ] **P7-1.3** Lock how a tone is applied to the neutral grey (multiply / overlay / replace) using P0-10.4.
- [ ] **P7-1.4** Define the **nipple-colour pipeline:** the tone's nipple colour tints **nipple sprites only**; the breast and body use the tone itself.

## P7-2 Tone layers (23)

- [ ] **P7-2.01** **Porcelain** — undertone Cool-pink · gloss 25–35 · nipple LightPink · Pink · default texture preset: Smooth
- [ ] **P7-2.02** **Ivory** — undertone Cool-neutral · gloss 22–32 · nipple LightPink · Pink · default texture preset: Smooth
- [ ] **P7-2.03** **Fair** — undertone Warm-neutral · gloss 18–26 · nipple LightPink · Pink · default texture preset: Normal
- [ ] **P7-2.04** **Light** — undertone Warm · gloss 14–22 · nipple Pink · Rose · default texture preset: Normal
- [ ] **P7-2.05** **LightMedium** — undertone Warm · gloss 12–20 · nipple Pink · Rose · default texture preset: Normal
- [ ] **P7-2.06** **Medium** — undertone Neutral · gloss 12–18 · nipple Rose · Peach · default texture preset: Normal
- [ ] **P7-2.07** **MediumTan** — undertone Warm · gloss 12–18 · nipple Rose · Peach · default texture preset: Normal
- [ ] **P7-2.08** **Tan** — undertone Warm · gloss 10–16 · nipple Peach · Tan · default texture preset: Normal
- [ ] **P7-2.09** **Olive** — undertone Olive-warm · gloss 10–16 · nipple Peach · Tan · default texture preset: Normal
- [ ] **P7-2.10** **Golden** — undertone Warm-gold · gloss 14–22 · nipple Peach · Tan · default texture preset: Normal
- [ ] **P7-2.11** **Caramel** — undertone Warm · gloss 12–18 · nipple Tan · Brown · default texture preset: Normal
- [ ] **P7-2.12** **Chestnut** — undertone Warm · gloss 10–16 · nipple Tan · Brown · default texture preset: Normal
- [ ] **P7-2.13** **Brown** — undertone Warm-neutral · gloss 10–16 · nipple Brown · DarkBrown · DeepBrown · default texture preset: Normal
- [ ] **P7-2.14** **DeepBrown** — undertone Warm · gloss 10–16 · nipple Brown · DarkBrown · DeepBrown · default texture preset: Normal
- [ ] **P7-2.15** **Ebony** — undertone Warm · gloss 10–14 · nipple Brown · DarkBrown · DeepBrown · default texture preset: Normal
- [ ] **P7-2.16** **AshGrey** — undertone Cool · gloss 18–26 · nipple Pink (pale marker) · default texture preset: Smooth
- [ ] **P7-2.17** **PaleBlue** — undertone Cool-blue · gloss 24–34 · nipple Pink (pale marker) · default texture preset: VerySmooth
- [ ] **P7-2.18** **DeepPurple** — undertone Cool-violet · gloss 16–24 · nipple DarkBrown (added v2.2) · default texture preset: Smooth
- [ ] **P7-2.19** **TealGreen** — undertone Cool-teal · gloss 14–22 · nipple Brown · default texture preset: Normal
- [ ] **P7-2.20** **GoldenMetallic** — undertone Warm-metallic · gloss 44–58 · nipple DarkBrown · default texture preset: VerySmooth
- [ ] **P7-2.21** **ObsidianBlack** — undertone Cool · gloss 12–18 · nipple DarkBrown · default texture preset: Smooth
- [ ] **P7-2.22** **Ruddy** — undertone Warm-red · gloss 10–16 · nipple Peach · Tan (added v2.2) · default texture preset: Rough
- [ ] **P7-2.23** **Crimson** — undertone Warm-deep red · gloss 16–24 · nipple Brown · default texture preset: Normal

## P7-3 Texture and feature layers (9, tone-independent)

- [ ] **P7-3.01** **VerySmooth** — Zero pore, zero variation · typical: Angel, Succubus, Vampire, Young divine
- [ ] **P7-3.02** **Smooth** — Minimal texture · typical: Young and YoungAdult characters
- [ ] **P7-3.03** **Normal** — Standard skin · typical: Adult baseline
- [ ] **P7-3.04** **Rough** — Visible texture, weathered · typical: Outdoor, older
- [ ] **P7-3.05** **Blemished** — Minor real marks · typical: Some humans
- [ ] **P7-3.06** **Scarred — Light** — Scar patterns, sparse · typical: Combat veterans
- [ ] **P7-3.07** **Scarred — Heavy** — Scar patterns, dense · typical: Combat veterans
- [ ] **P7-3.08** **Freckled — Light** — Pigment scatter, sparse · typical: Human / wood elf, redheads
- [ ] **P7-3.09** **Freckled — Heavy** — Pigment scatter, dense · typical: Human / wood elf, redheads

## P7-4 Age → default texture presets (catalog Part 4)
- [ ] **P7-4.1** Record the default texture for **Young**: Smooth / Normal. Stored in the manifest / preset, never baked.
- [ ] **P7-4.2** Record the default texture for **YoungAdult**: Smooth–Normal. Stored in the manifest / preset, never baked.
- [ ] **P7-4.3** Record the default texture for **RipeningMilf**: Smooth-Normal. Stored in the manifest / preset, never baked.
- [ ] **P7-4.4** Record the default texture for **RipeMilf**: Normal. Stored in the manifest / preset, never baked.
- [ ] **P7-4.5** Record the default texture for **MatureMilf**: Normal-Rough. Stored in the manifest / preset, never baked.
- [ ] **P7-4.6** Record the default texture for **OldMilf**: Rough. Stored in the manifest / preset, never baked.

## P7-5 Gloss profiles (4)
- [ ] **P7-5.1** **Elf luminosity** — +8–12 on top of the tone's base gloss · used by Elves. Parameter preset added to any tone's base gloss.
- [ ] **P7-5.2** **Succubus** — +10–14 (deliberately appealing surface) · used by Succubus. Parameter preset added to any tone's base gloss.
- [ ] **P7-5.3** **Vampire** — +10–14 (unnaturally smooth) · used by Vampire. Parameter preset added to any tone's base gloss.
- [ ] **P7-5.4** **Divine** — +18–24 minimum · used by Goddess / Angel. Parameter preset added to any tone's base gloss.

## P7-6 Nipple-colour mappings (11)
- [ ] **P7-6.01** **Porcelain · Ivory · Fair** → LightPink · Pink. Tint preset for the nipple sprites.
- [ ] **P7-6.02** **Light · LightMedium** → Pink · Rose. Tint preset for the nipple sprites.
- [ ] **P7-6.03** **Medium · MediumTan** → Rose · Peach. Tint preset for the nipple sprites.
- [ ] **P7-6.04** **Tan · Olive · Golden** → Peach · Tan. Tint preset for the nipple sprites.
- [ ] **P7-6.05** **Caramel · Chestnut** → Tan · Brown. Tint preset for the nipple sprites.
- [ ] **P7-6.06** **Brown · DeepBrown · Ebony** → Brown · DarkBrown · DeepBrown. Tint preset for the nipple sprites.
- [ ] **P7-6.07** **AshGrey · PaleBlue** → Pink (pale marker). Tint preset for the nipple sprites.
- [ ] **P7-6.08** **Crimson · TealGreen** → Brown. Tint preset for the nipple sprites.
- [ ] **P7-6.09** **GoldenMetallic · ObsidianBlack** → DarkBrown. Tint preset for the nipple sprites.
- [ ] **P7-6.10** **Ruddy (added v2.2)** → Peach · Tan. Tint preset for the nipple sprites.
- [ ] **P7-6.11** **DeepPurple (added v2.2)** → DarkBrown. Tint preset for the nipple sprites.

## P7-7 Tattoo layers
- [ ] **P7-7.1** **Minimal** coverage — 1–2 small pieces. Build at least two design sets.
- [ ] **P7-7.2** **Moderate** coverage — Several, partial area. Build at least two design sets.
- [ ] **P7-7.3** **Heavy** coverage — Large multi-area. Build at least two design sets.
- [ ] **P7-7.4** **FullBody** coverage — Near-complete. Build at least two design sets.
- [ ] **P7-7.5** **Tattoo-system markings** (catalog Part 8): Clan marks (arm/shoulder, Dwarf), War marks (face/shoulder, Orc — face part links to the face track FH5), House brand (forearm, Demon operative).

## P7-8 Verification (every item uses composites, not bare dolls)
- [ ] **P7-8.1** Every tone on REF-1, REF-4, REF-6 composites at Young (doll + a mid-cup breast + nipple); REF-9 composite at OldMilf once it exists.
- [ ] **P7-8.2** Every texture on REF-4 with three tones (light, medium, dark).
- [ ] **P7-8.3** Freckled layers on the seven tones Porcelain → MediumTan; Scarred layers across all 23 tones.
- [ ] **P7-8.4** **Seam test:** every tone, texture, feature and tattoo continuous across the body/breast seam and the neck/head seam.
- [ ] **P7-8.5** Gloss profiles: Elf → Fair; Succubus → Porcelain; Vampire → Ivory; Divine → GoldenMetallic.
- [ ] **P7-8.6** Tattoo layers on REF-1 … REF-6 composites: no warping across breasts, hips, thighs.
- [ ] **P7-8.7** Nipple colours: all 11 mappings on cups A, G, Q.
- [ ] **P7-8.8** Save the standard presets (the tone → texture pairings in P7-2) to `06_skin/presets/`.

**GATE G7** — [ ] 43 skin assets ✔ · [ ] verification P7-8 passed

---

# PHASE 8 — RACE OVERLAYS (was Phase 7)

*Each asset follows SOP-OV (§5.8). **Tails, wings, markings** attach to the body doll; **ears and horns** attach to the face track's head base (D-28 — confirm). May run in parallel with Phases 2–6 after G0.*

## P8-0 Setup
- [ ] **P8-0.1** Confirm the three assets added to catalog Part 8 in v2.2 (AnimalBunny, DragonRidge, Bunny tail) — their descriptions are proposals.
- [ ] **P8-0.2** Confirm anchors and z-order (P0-3.9, P0-4) are final; ears/horns need the face track's neutral head (FH0-3.4).

## P8-1 Tails — body overlays
- [ ] **P8-1.1** Tail · **Fox** — Bushy, 50–70 cm · default state Upright-relaxed
- [ ] **P8-1.2** Tail · **Wolf** — Full, 50–65 cm · default state Low-neutral
- [ ] **P8-1.3** Tail · **Cow** — Thin with tuft, 50–60 cm · default state Hanging
- [ ] **P8-1.4** Tail · **Dragon** — Long scaled, 60–80 cm · default state Low
- [ ] **P8-1.5** Tail · **Demon** — Slender pointed · default state Expressive
- [ ] **P8-1.6** Tail · **Devil** — Slender arrowhead · default state Still
- [ ] **P8-1.7** Tail · **Cat** — Thin, curvy · default state Expressive
- [ ] **P8-1.8** Tail · **Bunny** — Short round puff, 8–12 cm (added v2.2, proposed) · default state Still

## P8-2 Wings — body overlays (each deployed/folded state is its own asset)
- [ ] **P8-2.1** Wing · **Feathered** (folded) — Large white feathered
- [ ] **P8-2.2** Wing · **Feathered** (deployed) — Large white feathered
- [ ] **P8-2.3** Wing · **Bat** (folded) — Leather membrane
- [ ] **P8-2.4** Wing · **Bat** (deployed) — Leather membrane
- [ ] **P8-2.5** Wing · **Dragon** (folded) — Scaled membrane
- [ ] **P8-2.6** Wing · **Dragon** (deployed) — Scaled membrane
- [ ] **P8-2.7** Wing · **Insect** (deployed) — Translucent, always deployed
- [ ] **P8-2.8** Wing · **Demonic** (folded) — Dark membrane
- [ ] **P8-2.9** Wing · **Demonic** (deployed) — Dark membrane

## P8-3 Race body markings — texture overlays in UV space (SOP-SK)
- [ ] **P8-3.1** Marking · **Scale patches** — Shoulders · back · thighs · shins · hands · race Dragonkin
- [ ] **P8-3.2** Marking · **Cow hide spots** — Black-white or brown-white patches on hips/shoulders/back · race CowGirl/CowBoy
- [ ] **P8-3.3** Marking · **Wolf fur collar** — Dense fur along neck and collar, upper shoulder blending · race Wolf
- [ ] **P8-3.4** Marking · **Fox fur patches** — Light fur at forearm inner, ear bases, calf back · race Fox
- [ ] **P8-3.5** Marking · **Glow runes** — Faint luminous lines — visible at full power · race Angel
- [ ] **P8-3.6** Marking · **Divine aura (warm)** — Self-luminance — warm domain colour · race Goddess/God
- [ ] **P8-3.7** Marking · **Divine aura (cool)** — Self-luminance — cool domain colour · race Goddess/God

## P8-4 Ears — head overlays
- [ ] **P8-4.1** Ear · **Human** — Standard round · used by Human, Dwarf, Orc, Vampire
- [ ] **P8-4.2** Ear · **ElvenPointed** — 5–7 cm point · used by Wood Elf
- [ ] **P8-4.3** Ear · **HighElvenLong** — 8–11 cm point · used by High Elf, Dark Elf
- [ ] **P8-4.4** Ear · **AnimalFox** — Large pointed, top of head · used by Fox
- [ ] **P8-4.5** Ear · **AnimalWolf** — Erect pointed, top of head · used by Wolf
- [ ] **P8-4.6** Ear · **AnimalCow** — Floppy, side of head · used by Cow
- [ ] **P8-4.7** Ear · **AnimalCat** — Small pointed, top of head · used by Cat
- [ ] **P8-4.8** Ear · **Demonic** — Angled back, slightly pointed · used by Demon, Devil, Succubus
- [ ] **P8-4.9** Ear · **AnimalBunny** — Long, upright or lopped, top of head (added v2.2, proposed) · used by Bunny
- [ ] **P8-4.10** Ear · **DragonRidge** — Scaled ridge / frill at the ear position, no visible ear (added v2.2, proposed) · used by Dragonkin
- [ ] **P8-4.11** Ear · **None** — no asset; confirm the manifest treats it as an empty layer.

## P8-5 Horns — head overlays
- [ ] **P8-5.1** Horn · **SmallNubs** — Tiny decorative · used by Fairy, Goblin, Succubus small, Orc (rare), Thessaly-type
- [ ] **P8-5.2** Horn · **CurvedRam** — Curved sweeping back · used by Demon (house-dependent)
- [ ] **P8-5.3** Horn · **StraightPointed** — Forward spike · used by Goblin, Devil
- [ ] **P8-5.4** Horn · **DragonCurved** — Temple-to-back curve · used by Dragonkin
- [ ] **P8-5.5** Horn · **DemonSpiral** — Upward spiral · used by Demon elder
- [ ] **P8-5.6** Horn · **DevilForked** — Y-shaped fork · used by Devil, DevilGirl
- [ ] **P8-5.7** Horn · **ThickBull** — Thick horizontal · used by CowGirl/CowBoy
- [ ] **P8-5.8** Horn · **None** — no asset; empty layer.

## P8-6 Per-asset test matrix
- [ ] **P8-6.1** Fit-test on REF-1 … REF-8 composites (and REF-9 later) — with the **largest and smallest allowed cups** on the body, since wings and tails sit behind/beside the chest and hips.
- [ ] **P8-6.2** Colour-test on three tones + one fantasy tone.
- [ ] **P8-6.3** Hair-test for ears and horns with one long and one short hair layer (face track).
- [ ] **P8-6.4** Combination test: ears + horns + tail + wings together on REF-4.

## P8-7 Race kits (the "race base" Phase 11 starts from)

`?` = catalog Part 8 does not say; decide it here.

| Race | Ears | Horns | Tail | Wings | Marking | Skin / tissue notes | Body default |
|------|------|-------|------|-------|---------|---------------------|--------------|
| Human | Human | None | — | — | — |  |  |
| Wood Elf | ElvenPointed | None | — | — | — | Elf luminosity gloss |  |
| High Elf | HighElvenLong | None | — | — | — | Elf luminosity gloss |  |
| Dark Elf | HighElvenLong | ? | ? | ? | ? | Elf luminosity gloss |  |
| Dwarf | Human | None | — | — | Clan marks (tattoo) |  | CompactPower |
| Orc | Human | SmallNubs (rare) | ? | ? | War marks (tattoo) | Tusks on the face card | CompactPower |
| Vampire | Human | None | ? | ? | ? | Vampire gloss, VerySmooth |  |
| Fox | AnimalFox | None | Fox | — | Fox fur patches |  |  |
| Wolf | AnimalWolf | None | Wolf | — | Wolf fur collar |  |  |
| Cow | AnimalCow | ThickBull | Cow | — | Cow hide spots |  |  |
| Cat | AnimalCat | ? | Cat | ? | ? |  |  |
| Bunny | AnimalBunny | None | Bunny | — | — |  |  |
| Dragonkin | DragonRidge | DragonCurved | Dragon | ? (Dragon?) | Scale patches |  |  |
| Demon | Demonic | CurvedRam / DemonSpiral (elder) | Demon | ? (Demonic?) | House brand (tattoo) |  |  |
| Devil | Demonic | StraightPointed / DevilForked | Devil | ? | ? |  |  |
| Succubus | Demonic | SmallNubs | ? | ? | ? | Succubus gloss, **supernatural breast set** |  |
| Goblin | ? | SmallNubs / StraightPointed | ? | ? | ? |  |  |
| Fairy | ? | SmallNubs | ? | Insect (deployed) | ? |  |  |
| Angel | ? | None | ? | Feathered | Glow runes | Divine gloss, **supernatural breast set**, VerySmooth |  |
| Goddess / God | ? | ? | ? | ? | Divine aura (warm/cool) | Divine gloss, **supernatural breast set** |  |

- [ ] **P8-7.1** Fill every `?` (or write "none"), then build and save one kit preset per race row (20 kits).

**GATE G8** — [ ] 41 overlay assets ✔ · [ ] P8-6 test matrix passed · [ ] 20 race kits saved · [ ] D-28 confirmed

---

# PHASE 9 — ANATOMY OVERLAYS (was Phase 7B)

*Pubic hair, labia and cock variants are all overlays (D-10), **one set per gender**, translated only (D-30 — accepted). The doll has a smooth neutral crotch, so every nude composite needs one labia or cock overlay and one pubic-hair style. Each follows SOP-OV; skin comes through the UV pass. **25 assets.***

## P9-1 Setup
- [ ] **P9-1.1** **Verify D-30 in the pilot (P0-10.6):** one pubic-hair overlay and one labia overlay, translated only, sit correctly on F-02, F-12 and F-19 dolls. If one set per gender fails on a body type, tell me which and the count is re-planned.
- [ ] **P9-1.2** Record exactly what the doll's neutral crotch looks like (P0-3.7) and define PUBIC_ANCHOR and the overlay origin so every overlay sits on it cleanly.
- [ ] **P9-1.3** Tone and texture come from the skin layer through the UV pass; no age-tier versions (default).

## P9-2 PubicHairStyle (7) — every body
- [ ] **P9-2.1** **None** — no asset; empty layer
- [ ] **P9-2.2** **LightTrim**
- [ ] **P9-2.3** **Trimmed**
- [ ] **P9-2.4** **FullNatural**
- [ ] **P9-2.5** **LandingStrip**
- [ ] **P9-2.6** **Triangle**
- [ ] **P9-2.7** **Stubble**

## P9-3 LabiaType (6) — female variants
- [ ] **P9-3.1** **InnerHidden**
- [ ] **P9-3.2** **InnerSmall**
- [ ] **P9-3.3** **InnerModerate**
- [ ] **P9-3.4** **InnerProminent**
- [ ] **P9-3.5** **InnerLarge**
- [ ] **P9-3.6** **OuterProminent**

## P9-4 CockType (12) — male variants
- [ ] **P9-4.1** **Straight**
- [ ] **P9-4.2** **CurvedUp**
- [ ] **P9-4.3** **CurvedDown**
- [ ] **P9-4.4** **CurvedLeft**
- [ ] **P9-4.5** **CurvedRight**
- [ ] **P9-4.6** **Tapered**
- [ ] **P9-4.7** **Flared**
- [ ] **P9-4.8** **Uniform**
- [ ] **P9-4.9** **Knotted** — species-specific; confirm which races use it
- [ ] **P9-4.10** **Barbed** — species-specific; confirm which races use it
- [ ] **P9-4.11** **Ridged** — species-specific; confirm which races use it
- [ ] **P9-4.12** **Bifurcated** — species-specific; confirm which races use it

## P9-5 Verification
- [ ] **P9-5.1** Female anatomy + pubic hair on REF-1…REF-6 and on an OldMilf REF-9 composite at the smallest and largest allowed cups, at the type's shortest and tallest heights.
- [ ] **P9-5.2** Male anatomy on REF-7 and REF-8 and on one aged male.
- [ ] **P9-5.3** Skin tone, texture and tattoo continuous across the doll / anatomy seam on three composites.

**GATE G9** — [ ] 25 anatomy assets ✔ · [ ] verification passed

---

# PHASE 10 — COMPOSITE VERIFICATION (new in v3.0)

*Every one of the 8,412 valid body + cup combinations is one doll + its own sprite + a nipple. The compositor assembles them by script; this phase proves they all work.*

- [ ] **P10-1.1** Confirm Gates G3, G4.* and G6 (male dolls have no cup, so G5 is not needed here).
- [ ] **P10-1.2** Run the composite sweep (P0-8.6): generates every row of `valid_composites.csv` into `10_composites/`. **Done when** the output count = 8,412.
- [ ] **P10-2.1** **Auto-checks:** zero failures for seam alpha continuity, bounding box, bust within ±3 cm of the rule, sprite-to-doll registration, arm overlap, sprite belongs to the doll's body type / age tier / height, no missing files. Failures go to `11_qa/composite_failures.csv`.
- [ ] **P10-2.2** **Failure triage:** classify each failure as *doll fault* (back to Phases 1–5), *sprite fault* (Phase 6), *fit-rule fault* (D-25 fallback), *anchor fault* (P0-4). Fix and re-run the sweep until zero failures.

## P10-3 Cup-sweep sheets (type × age) — all allowed cups on the type's middle height
- [ ] **P10-3.1** For each cell below, review one contact sheet (cups left → right): bust grows each step, seam clean, silhouette plausible.

| Body type (sheet height) | YNG | YAD | RPG | RPE | MAT | OLD |
|--------------------------|------|------|------|------|------|------|
| F-01 Androgynous (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-02 PetiteSlim (SHT) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-03 PetiteCurvy (SHT) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-04 Willowy (TAL) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-05 Athletic (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-06 SlimStraight (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-07 SlimCurvy (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-08 BananaShape (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-09 PearShape (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-10 SpoonShape (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-11 HourglassSlim (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-12 HourglassCurvy (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-13 HourglassFullBust (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-16 FullFigured (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-19 Rubenesque (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-21 MuscularFeminine (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass (SHT) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-23 MiniVoluptuous (SHT) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower (AVG) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

## P10-4 Height-sweep sheets (type × age) — all heights at the minimum, reference and maximum allowed cup
- [ ] **P10-4.1** For each cell below, review one sheet (3 rows = min / ref / max cup; columns = the type's heights): nothing jumps, large cups still read on short frames.

| Body type | YNG | YAD | RPG | RPE | MAT | OLD |
|-----------|------|------|------|------|------|------|
| F-01 Androgynous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-02 PetiteSlim | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-03 PetiteCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-04 Willowy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-05 Athletic | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-06 SlimStraight | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-07 SlimCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-08 BananaShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-09 PearShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-10 SpoonShape | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-11 HourglassSlim | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-12 HourglassCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-13 HourglassFullBust | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-14 TopHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-15 BottomHeavy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-16 FullFigured | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-17 Voluptuous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-18 Zaftig | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-19 Rubenesque | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-20 AthleticCurvy | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-21 MuscularFeminine | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-22 PetiteHourglass | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-23 MiniVoluptuous | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| F-24 CompactPower | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

## P10-5 Remaining checks
- [ ] **P10-5.1** **Arousal-state composites:** 60 random composites each rendered with the nipple in all three states — `light` sits visibly between `unaroused` and `extreme`, no seam, no clipping.
- [ ] **P10-5.2** **Skin composites:** 40 random composites with 5 tones, textures, a freckle/scar layer and a tattoo — seams invisible.
- [ ] **P10-5.3** **Overlay composites:** 20 random composites with tail, wings, ears, horns (face track) — z-order and clipping correct.
- [ ] **P10-5.4** **Adult-appearance audit (Q10)** over a sample covering every petite type, every age tier and the largest cups.

**GATE G10** — [ ] 8,412 composites generated · [ ] auto-checks: 0 failures · [ ] 144 cup-sweep + 144 height-sweep sheets signed off · [ ] P10-5 passed

---

# PHASE 11 — NAMED CHARACTER ASSEMBLY (was Phase 8) — 35 entries

*Race kit → body doll → breast and nipple sprite → skin → anatomy → tail/wings/markings → face track (head, parts, hair, ears, horns) → tuning → QA. Specs come from the v2.0 list with the new age tiers (D-16). You asked to review these **one at a time**.*

## P11-1 Before any character
- [ ] **P11-1.1** Confirm Gates G3, G4.*, G6, G7, G8, G9 (or the subset your characters need) and the face track's gates for the face link.
- [ ] **P11-1.2** Close D-14 (supernatural breasts per character), D-15, D-16, D-17, D-19 — **one character at a time**.
- [ ] **P11-1.3** Check each spec: tier, height tag, body type, cup. Where a spec is not in the catalog, fix the spec or the catalog — not the doll.

## P11-2 Spec table

| ID | Name | Race overlays | Tier (v3.2) | Height (cm) | Body type | Cup | Cup status | Required body doll | Required breast sprite | Flag |
|------|------|---------------|-------------|-------------|-----------|------|------------|--------------------|------------------------|------|
| C1 | Aldra Vane | Human | RipeMilf | Average (165) | **TBD** | C | — | **TBD** | **TBD** | ⚠ |
| C2 | Syrael Dawnscribe | Ear HighElvenLong | Young | Tall (176) | F-06 SlimStraight | B | sweet | `body_f_young_176_slim_straight.png` | `breast_f_young_176_slim_straight_B.png` |  |
| C3 | Mira Ashlen | Ear ElvenPointed (small) | Young | Average (165) | F-05 Athletic | C | sweet | `body_f_young_165_athletic.png` | `breast_f_young_165_athletic_C.png` |  |
| C4 | Dame Dava Colth | Human | RipeningMilf | Tall (176) | F-05 Athletic | C | sweet | `body_f_ripeningmilf_176_athletic.png` | `breast_f_ripeningmilf_176_athletic_C.png` | ⚠ |
| C5a | Variel (disguise) | Human | Young | Average (165) | F-11 HourglassSlim | C | sweet | `body_f_young_165_hourglass_slim.png` | `breast_f_young_165_hourglass_slim_C.png` |  |
| C5b | Variel (true form) | Wings Feathered | Young | Tall (176) | F-11 HourglassSlim | C–D | sweet | `body_f_young_176_hourglass_slim.png` | `breast_f_young_176_hourglass_slim_C.png` | ⚠ |
| C6 | Edwyn Crale | Human | Young | Average (165) | F-06 SlimStraight | B | sweet | `body_f_young_165_slim_straight.png` | `breast_f_young_165_slim_straight_B.png` |  |
| C7 | Queen Maren II | Human | MatureMilf | Tall (176) | F-16 FullFigured | D | ext | `body_f_maturemilf_176_full_figured.png` | `breast_f_maturemilf_176_full_figured_D.png` | ⚠ |
| C8 | Princess Lysa Voss | Human | Young | Average (165) | F-07 SlimCurvy | C | sweet | `body_f_young_165_slim_curvy.png` | `breast_f_young_165_slim_curvy_C.png` |  |
| C9 | Cass Merrow | Human | YoungAdult | Average (165) | F-05 Athletic | C | sweet | `body_f_youngadult_165_athletic.png` | `breast_f_youngadult_165_athletic_C.png` | ⚠ |
| C10 | Pip | Ear + Tail Bunny | Young | VeryShort (145) | F-02 PetiteSlim | B | sweet | `body_f_young_145_petite_slim.png` | `breast_f_young_145_petite_slim_B.png` | ⚠ |
| C11 | Toma Vey | Human | YoungAdult | BelowAverage (160) | **TBD** | B | — | **TBD** | **TBD** | ⚠ |
| C12 | Elowen Ashbark | Ear ElvenPointed | Young | Average (165) | F-05 Athletic | B | sweet | `body_f_young_165_athletic.png` | `breast_f_young_165_athletic_B.png` |  |
| C13 | Queen Ilvariel | Ear HighElvenLong | Young | Tall (176) | F-04 Willowy | B–C | sweet | `body_f_young_176_willowy.png` | `breast_f_young_176_willowy_B.png` | ⚠ |
| C14 | Sylvaris Orenn | Ear HighElvenLong | Young | Tall (176) | F-04 Willowy | B | sweet | `body_f_young_176_willowy.png` | `breast_f_young_176_willowy_B.png` | ⚠ |
| C15 | Sigrun Stonescribe | — (race not stated) | RipeningMilf | VeryShort (145) | F-24 CompactPower | D | sweet | `body_f_ripeningmilf_145_compact_power.png` | `breast_f_ripeningmilf_145_compact_power_D.png` | ⚠ |
| C16 | Garet | Human | Young | AboveAverage (170) | F-21 MuscularFeminine | C | sweet | `body_f_young_170_muscular_feminine.png` | `breast_f_young_170_muscular_feminine_C.png` |  |
| C17 | Vael Stoneback | Wolf: ears + tail + markings | Young | AboveAverage (170) | F-05 Athletic | C | sweet | `body_f_young_170_athletic.png` | `breast_f_young_170_athletic_C.png` | ⚠ |
| C18 | Kiri Brightbrush | Fox: ears + tail + fur patches | RipeningMilf | Average (165) | F-07 SlimCurvy | C | sweet | `body_f_ripeningmilf_165_slim_curvy.png` | `breast_f_ripeningmilf_165_slim_curvy_C.png` |  |
| C18a | Rina Brightbrush | Fox: ears + tail + fur patches | MatureMilf | Average (165) | F-07 SlimCurvy | C–D | sweet | `body_f_maturemilf_165_slim_curvy.png` | `breast_f_maturemilf_165_slim_curvy_C.png` | ⚠ |
| C19 | Ashkora Emberscale | Horn DragonCurved + Tail Dragon + Scale patches | MatureMilf | Tall (176) | F-20 AthleticCurvy | D | sweet | `body_f_maturemilf_176_athletic_curvy.png` | `breast_f_maturemilf_176_athletic_curvy_D.png` |  |
| C19a | Kessa Emberscale | Horn DragonCurved + Tail Dragon + Scale patches | Young | Tall (176) | F-20 AthleticCurvy | C | sweet | `body_f_young_176_athletic_curvy.png` | `breast_f_young_176_athletic_curvy_C.png` |  |
| C20 | Velara Ash | Ear Demonic + Horn CurvedRam + Tail Demon | Young | AboveAverage (170) | F-05 Athletic | C–D | sweet | `body_f_young_170_athletic.png` | `breast_f_young_170_athletic_C.png` | ⚠ |
| C20a | Sera Ash | Ear Demonic + Horn SmallNubs + Tail Demon | Young | AboveAverage (170) | F-07 SlimCurvy | C | sweet | `body_f_young_170_slim_curvy.png` | `breast_f_young_170_slim_curvy_C.png` |  |
| C21 | Iskara Thorne | Ear Demonic + Horn DevilForked + Tail Devil | Young | Tall (176) | F-07 SlimCurvy | C | sweet | `body_f_young_176_slim_curvy.png` | `breast_f_young_176_slim_curvy_C.png` | ⚠ |
| C22 | Velindra Lysmere | Ear Demonic + Horn SmallNubs + Wing Bat + Tail Devil | Young | AboveAverage (170) | F-13 HourglassFullBust | E | ext | `body_f_young_170_hourglass_fullbust.png` | `breast_f_young_170_hourglass_fullbust_E.png` | ⚠ |
| C22a | Lady Velura Lysmere | Same overlays as C22 | Young | Tall (176) | F-13 HourglassFullBust | F | sweet | `body_f_young_176_hourglass_fullbust.png` | `breast_f_young_176_hourglass_fullbust_F.png` | ⚠ |
| C23 | Evara Nighthollow | Human | Young | Average (165) | F-11 HourglassSlim | C | sweet | `body_f_young_165_hourglass_slim.png` | `breast_f_young_165_hourglass_slim_C.png` | ⚠ |
| C24 | Sister Ezan | Human | YoungAdult | Average (165) | **TBD** | C | — | **TBD** | **TBD** | ⚠ |
| C25 | Ushara Ashfang | Human (tusks on face card) | MatureMilf | VeryTall (183) | F-21 MuscularFeminine | E | ext | `body_f_maturemilf_183_muscular_feminine.png` | `breast_f_maturemilf_183_muscular_feminine_E.png` |  |
| C26 | Ceira Blackthorn | Human | YoungAdult | Average (165) | F-21 MuscularFeminine | C | sweet | `body_f_youngadult_165_muscular_feminine.png` | `breast_f_youngadult_165_muscular_feminine_C.png` | ⚠ |
| C27 | Nessa Solstave | Human | Young | BelowAverage (160) | F-07 SlimCurvy | C | sweet | `body_f_young_160_slim_curvy.png` | `breast_f_young_160_slim_curvy_C.png` |  |
| C28 | Maea Hollowtide | Human | MatureMilf | Average (165) | F-16 FullFigured | D | ext | `body_f_maturemilf_165_full_figured.png` | `breast_f_maturemilf_165_full_figured_D.png` |  |
| C29 | Cella Hollowtide | Human | Young | Average (165) | **TBD** | C | — | **TBD** | **TBD** | ⚠ |
| C30 | Senna Hollowtide | Human | Young | Average (165) | F-13 HourglassFullBust | E | ext | `body_f_young_165_hourglass_fullbust.png` | `breast_f_young_165_hourglass_fullbust_E.png` |  |

`Cup status`: sweet = inside the type's sweet spot · ext = allowed but outside it. Under policy A both exist, so this is informational. Each breast sprite is the one for **that body type, age tier, height and cup**. For a supernatural character use `breast_f_sup_{cm}_{token}_{cup}.png` instead (D-14). The nipple sprite (type and arousal state) is chosen per character from the cup group's supported nipples; it is the same for every age and height.

## P11-3 Notes and flags

- **C1 Aldra Vane** — Body "Average/Soft" is not a catalog type (D-15). First "Average" in the source line is ambiguous; read as height.
- **C4 Dame Dava Colth** — Source lists both "Average" and "Tall" — read as Tall (D-15).
- **C5b Variel (true form)** — Cup C–D: pick one (D-17). Check supernatural tissue (D-14).
- **C7 Queen Maren II** — Source lists both "Average" and "Tall" — read as Tall (D-15).
- **C9 Cass Merrow** — Source tier "Young-RipeningMilf" → YoungAdult (D-16). Extra "Average" in source (D-15).
- **C10 Pip** — Source "VeryShort/Petite". Bunny ears/tail added to catalog Part 8 in v2.2. Petite adult-proportion check mandatory.
- **C11 Toma Vey** — No body type given (D-15). Source tier "Young-RipeningMilf" → YoungAdult (D-16).
- **C13 Queen Ilvariel** — Cup B–C: pick one (D-17). 900 yr, apparent Young.
- **C14 Sylvaris Orenn** — 1100 yr, apparent Young.
- **C15 Sigrun Stonescribe** — Source "VeryShort/Petite". Race overlay not stated.
- **C17 Vael Stoneback** — Source says "patches"; catalog Part 8 wolf marking is the fur collar.
- **C18a Rina Brightbrush** — Cup C–D: pick one (D-17).
- **C20 Velara Ash** — Cup C–D: pick one (D-17).
- **C21 Iskara Thorne** — 300 yr, apparent Young.
- **C22 Velindra Lysmere** — Check supernatural tissue (D-14).
- **C22a Lady Velura Lysmere** — 220 yr, apparent Young. Check supernatural tissue (D-14).
- **C23 Evara Nighthollow** — "Young (appears)".
- **C24 Sister Ezan** — No body type given (D-15). Source tier "Young-RipeningMilf" → YoungAdult (D-16).
- **C26 Ceira Blackthorn** — Source tier "Young-RipeningMilf" → YoungAdult (D-16).
- **C29 Cella Hollowtide** — Body "Average/Soft" is not a catalog type (D-15).

## P11-4 Assembly tracker (one row per character)

Columns = SOP-NC milestones: **Doll** · **Breast + nipple** · **Skin** · **Anatomy** · **Overlays** (tail / wings / markings) · **Tune** · **Face link** (`paper_doll_face_hair_task_list_v1.1.md`) · **QA + export**.

| ID | Name | Doll | Breast + nipple | Skin | Anatomy | Overlays | Tune | Face link | QA + export |
|------|------|------|-----------------|------|---------|----------|------|-----------|-------------|
| C1 | Aldra Vane | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C2 | Syrael Dawnscribe | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C3 | Mira Ashlen | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C4 | Dame Dava Colth | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C5a | Variel (disguise) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C5b | Variel (true form) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C6 | Edwyn Crale | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C7 | Queen Maren II | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C8 | Princess Lysa Voss | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C9 | Cass Merrow | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C10 | Pip | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C11 | Toma Vey | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C12 | Elowen Ashbark | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C13 | Queen Ilvariel | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C14 | Sylvaris Orenn | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C15 | Sigrun Stonescribe | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C16 | Garet | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C17 | Vael Stoneback | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C18 | Kiri Brightbrush | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C18a | Rina Brightbrush | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C19 | Ashkora Emberscale | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C19a | Kessa Emberscale | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C20 | Velara Ash | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C20a | Sera Ash | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C21 | Iskara Thorne | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C22 | Velindra Lysmere | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C22a | Lady Velura Lysmere | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C23 | Evara Nighthollow | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C24 | Sister Ezan | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C25 | Ushara Ashfang | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C26 | Ceira Blackthorn | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C27 | Nessa Solstave | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C28 | Maea Hollowtide | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C29 | Cella Hollowtide | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| C30 | Senna Hollowtide | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

- [ ] **P11-5.1** Reconcile: every row ✔; every `char_*.png` has a recipe JSON; every doll and sprite file named in P11-2 exists in the manifests.

**GATE G11** — [ ] 35 characters ✔ · [ ] flags in P11-3 resolved

---

# PHASE 12 — INTEGRATION QA AND RELEASE (was Phase 9)

- [ ] **P12-1.1** **Manifest reconcile:** every manifest row has its PNG + `_uv.png` + JSON; every file on disk has a row; zero orphans.
- [ ] **P12-1.2** **Validators** on `04_bodies/`, `05_breast/`, `06_skin/`, `07_overlays/`: zero failures.
- [ ] **P12-1.3** **Counts:** finished counts per phase match the dashboard (1,182 dolls, 8,412 breast sprites, 945 + 63 nipple sprites, 8,412 composites).
- [ ] **P12-2.1** **Visual sampling:** 100% of REF, 100% of named characters, 3% random of every other phase.
- [ ] **P12-2.2** **Age monotonicity:** Young → OldMilf for every type at its middle height, with the same cup.
- [ ] **P12-2.3** **Adult-appearance audit (Q10)** across dolls, composites and named characters.
- [ ] **P12-3.1** **Overlay matrix:** every tail / wing / marking × REF-1…REF-9; ears / horns on the face track's heads.
- [ ] **P12-3.2** **Skin matrix:** every tone × REF-1…REF-9 composites at Young and OldMilf; every texture × REF-4.
- [ ] **P12-3.3** **Anatomy matrix:** every anatomy overlay × the REF bodies it applies to.
- [ ] **P12-3.4** **Full-stack test:** 20 random characters (doll + breast + skin + tail/wings + head + hair + race overlays) in the correct z-order.
- [ ] **P12-4.1** **Creator integration test:** the compatibility table (P0-9.3) blocks every invalid body + cup combination and allows every valid one; 200 random valid selections all compose with zero errors.
- [ ] **P12-5.1** Update catalog counts and changelog; write `RELEASE_NOTES.md` (coverage, the D-25 outcome, known limits).
- [ ] **P12-5.2** Tag, archive, back up. Open the next task-list version (clothing, expressions, extras).

**GATE G12 — RELEASE** — [ ] G0–G11 ticked · [ ] P12 tasks done · [ ] release tagged

---

# APPENDIX A — MANIFEST GENERATOR (tested)

Save as `manifest_gen.py` and run it. Expected output: **1,182** bodies (888 female + 294 male), **9,420** sprites (8,412 breast + 945 female nipple + 63 male nipple), **8,412** valid composites.

```python
#!/usr/bin/env python3
"""manifest_gen.py - manifests for Paper Doll Body Catalog v3.2 (policy A)
Breast sprites: body type x age x height x cup.  Nipple sprites: body type x supported nipple x 3 arousal states.
Usage: python manifest_gen.py
Writes manifest_bodies.csv, manifest_sprites.csv, valid_composites.csv and prints the counts
(compare with section 2 of the task list). Supernatural sprites are on demand and not listed."""
import csv

LADDER = "AA A B C D DD E F G H I J K L M N O P Q".split()
HEIGHTS = ["VeryShort", "Short", "BelowAverage", "Average", "AboveAverage", "Tall", "VeryTall"]
F_CM = {"VeryShort": 145, "Short": 154, "BelowAverage": 160, "Average": 165, "AboveAverage": 170, "Tall": 176, "VeryTall": 183}
M_CM = {"VeryShort": 155, "Short": 164, "BelowAverage": 170, "Average": 174, "AboveAverage": 179, "Tall": 186, "VeryTall": 193}
AGES = ["young", "youngadult", "ripeningmilf", "ripemilf", "maturemilf", "oldmilf"]
STATES = ["unaroused", "light", "extreme"]
# (id, token, heights, allowed_cup_min, allowed_cup_max)   heights: ALL / PET (first 3) / WIL (last 3)
FEMALE = [
    ("BT-F-01", "androgynous", "ALL", "AA", "B"),
    ("BT-F-02", "petite_slim", "PET", "AA", "C"),
    ("BT-F-03", "petite_curvy", "PET", "A", "G"),
    ("BT-F-04", "willowy", "WIL", "AA", "C"),
    ("BT-F-05", "athletic", "ALL", "A", "H"),
    ("BT-F-06", "slim_straight", "ALL", "AA", "C"),
    ("BT-F-07", "slim_curvy", "ALL", "B", "F"),
    ("BT-F-08", "banana", "ALL", "AA", "F"),
    ("BT-F-09", "pear", "ALL", "AA", "K"),
    ("BT-F-10", "spoon", "ALL", "A", "K"),
    ("BT-F-11", "hourglass_slim", "ALL", "A", "F"),
    ("BT-F-12", "hourglass_curvy", "ALL", "C", "K"),
    ("BT-F-13", "hourglass_fullbust", "ALL", "E", "Q"),
    ("BT-F-14", "top_heavy", "ALL", "D", "Q"),
    ("BT-F-15", "bottom_heavy", "ALL", "AA", "E"),
    ("BT-F-16", "full_figured", "ALL", "D", "Q"),
    ("BT-F-17", "voluptuous", "ALL", "E", "Q"),
    ("BT-F-18", "zaftig", "ALL", "D", "K"),
    ("BT-F-19", "rubenesque", "ALL", "F", "Q"),
    ("BT-F-20", "athletic_curvy", "ALL", "B", "G"),
    ("BT-F-21", "muscular_feminine", "ALL", "A", "Q"),
    ("BT-F-22", "petite_hourglass", "PET", "A", "G"),
    ("BT-F-23", "mini_voluptuous", "PET", "C", "H"),
    ("BT-F-24", "compact_power", "ALL", "B", "F"),
]
MALE = [
    ("BT-M-01", "androgynous"),
    ("BT-M-02", "lean"),
    ("BT-M-03", "average"),
    ("BT-M-04", "athletic"),
    ("BT-M-05", "muscular"),
    ("BT-M-06", "stocky"),
    ("BT-M-07", "hypermasculine"),
]
NIP_GROUPS = [   # (group token, cups, the 3 common nipple types)
    ("AA-A", ['AA', 'A'], ['Flat', 'Puffy', 'Inverted']),
    ("B-C", ['B', 'C'], ['Puffy', 'Protruding', 'Flat']),
    ("D-DD", ['D', 'DD'], ['Protruding', 'Wide', 'Puffy']),
    ("E-F", ['E', 'F'], ['Protruding', 'Wide', 'LargeProtruding']),
    ("G-H", ['G', 'H'], ['Wide', 'LargeProtruding', 'Long']),
    ("I-K", ['I', 'J', 'K'], ['LargeProtruding', 'Wide', 'Long']),
    ("L-N", ['L', 'M', 'N'], ['LargeProtruding', 'Wide', 'Long']),
    ("O-Q", ['O', 'P', 'Q'], ['LargeProtruding', 'Wide', 'Long']),
]
MALE_NIPPLES = ["small", "medium", "large"]

def hs(code):
    return HEIGHTS if code == "ALL" else HEIGHTS[:3] if code == "PET" else HEIGHTS[4:]

def span(a, b):
    return LADDER[LADDER.index(a):LADDER.index(b) + 1]

def nipples_for(cups):
    return [(g, ty) for g, gc, types in NIP_GROUPS if any(c in cups for c in gc) for ty in types]

group_of = {c: g for g, gc, _ in NIP_GROUPS for c in gc}
first_type = {g: types[0].lower() for g, _, types in NIP_GROUPS}

bodies, sprites, comps = [], [], []
for age in AGES:
    for bid, tok, hc, lo, hi in FEMALE:
        cups = span(lo, hi)
        for h in hs(hc):
            body = f"body_f_{age}_{F_CM[h]}_{tok}.png"
            bodies.append([body, "f", age, h, F_CM[h], bid, tok])
            for cup in cups:
                sp = f"breast_f_{age}_{F_CM[h]}_{tok}_{cup}.png"
                sprites.append([sp, "breast", bid, age, h, cup])
                comps.append([body, age, h, bid, cup, sp, f"nipple_f_{tok}_{first_type[group_of[cup]]}_{group_of[cup]}_unaroused.png"])
    for bid, tok in MALE:
        for h in HEIGHTS:
            bodies.append([f"body_m_{age}_{M_CM[h]}_{tok}.png", "m", age, h, M_CM[h], bid, tok])
for bid, tok, hc, lo, hi in FEMALE:                      # nipples: once per body type, not per age or height
    for g, ty in nipples_for(span(lo, hi)):
        for st in STATES:
            sprites.append([f"nipple_f_{tok}_{ty.lower()}_{g}_{st}.png", "nipple", bid, "", "", f"{g}/{ty}/{st}"])
for bid, tok in MALE:
    for s in MALE_NIPPLES:
        for st in STATES:
            sprites.append([f"nipple_m_{tok}_{s}_{st}.png", "male_nipple", bid, "", "", f"{s}/{st}"])

def dump(path, header, rows):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(header); w.writerows(rows)

dump("manifest_bodies.csv", ["filename", "gender", "age", "height_tag", "height_cm", "bodytype_id", "bodytype_token"], bodies)
dump("manifest_sprites.csv", ["filename", "kind", "bodytype_id", "age", "height_tag", "cup_or_nipple"], sprites)
dump("valid_composites.csv", ["body_file", "age", "height_tag", "bodytype_id", "cup", "breast_file", "nipple_file"], comps)
nf = sum(1 for r in bodies if r[1] == "f")
kinds = {}
for r in sprites:
    kinds[r[1]] = kinds.get(r[1], 0) + 1
print(f"bodies: {nf} female + {len(bodies) - nf} male = {len(bodies)}")
print(f"sprites: {kinds} total {len(sprites):,}")
print(f"valid composites: {len(comps):,}")
```

---

# APPENDIX B — BODY-DOLL BUILD TARGETS (female, Young baseline)

Waist and hip are the catalog Part 2 ranges. **Underbust (derived, D-27)** = bust-equiv at the reference cup − 2.5 cm × (reference-cup position − 1). Build the doll to waist, hip and underbust; the bust you see on composites comes from the breast sprite. Age tiers add the Part 4 deltas (SOP-A).

| Body type | Height | Render cm | Waist | Hip | Bust equiv (at ref cup) | Ref cup | Underbust (derived) |
|-----------|--------|-----------|-------|------|-------------------------|---------|---------------------|
| F-01 Androgynous | VSH | 145 | 54–58 | 76–80 | 70–76 | A | 67.5–73.5 |
| F-01 Androgynous | SHT | 154 | 56–60 | 78–82 | 72–78 | A | 69.5–75.5 |
| F-01 Androgynous | BAV | 160 | 58–62 | 80–84 | 74–80 | A | 71.5–77.5 |
| F-01 Androgynous | AVG | 165 | 60–64 | 82–86 | 76–82 | A | 73.5–79.5 |
| F-01 Androgynous | AAV | 170 | 62–66 | 84–88 | 78–84 | A | 75.5–81.5 |
| F-01 Androgynous | TAL | 176 | 64–68 | 86–90 | 80–86 | A | 77.5–83.5 |
| F-01 Androgynous | VTL | 183 | 66–70 | 88–92 | 82–88 | A | 79.5–85.5 |
| F-02 PetiteSlim | VSH | 145 | 52–56 | 76–82 | 72–78 | B | 67–73 |
| F-02 PetiteSlim | SHT | 154 | 54–58 | 78–84 | 74–80 | B | 69–75 |
| F-02 PetiteSlim | BAV | 160 | 56–60 | 80–86 | 76–82 | B | 71–77 |
| F-03 PetiteCurvy | VSH | 145 | 54–60 | 82–90 | 82–90 | C | 74.5–82.5 |
| F-03 PetiteCurvy | SHT | 154 | 56–62 | 84–92 | 84–92 | C | 76.5–84.5 |
| F-03 PetiteCurvy | BAV | 160 | 58–64 | 86–94 | 86–94 | C | 78.5–86.5 |
| F-04 Willowy | AAV | 170 | 58–64 | 82–88 | 78–86 | B | 73–81 |
| F-04 Willowy | TAL | 176 | 60–66 | 84–90 | 80–88 | B | 75–83 |
| F-04 Willowy | VTL | 183 | 62–68 | 86–92 | 82–90 | B | 77–85 |
| F-05 Athletic | VSH | 145 | 56–62 | 80–86 | 78–86 | C | 70.5–78.5 |
| F-05 Athletic | SHT | 154 | 58–64 | 82–88 | 80–88 | C | 72.5–80.5 |
| F-05 Athletic | BAV | 160 | 60–66 | 84–90 | 82–90 | C | 74.5–82.5 |
| F-05 Athletic | AVG | 165 | 62–68 | 86–92 | 84–92 | C | 76.5–84.5 |
| F-05 Athletic | AAV | 170 | 64–70 | 88–94 | 86–94 | C | 78.5–86.5 |
| F-05 Athletic | TAL | 176 | 66–72 | 90–96 | 88–96 | C | 80.5–88.5 |
| F-05 Athletic | VTL | 183 | 68–74 | 92–98 | 90–98 | C | 82.5–90.5 |
| F-06 SlimStraight | VSH | 145 | 54–60 | 78–84 | 76–82 | B | 71–77 |
| F-06 SlimStraight | SHT | 154 | 56–62 | 80–86 | 78–84 | B | 73–79 |
| F-06 SlimStraight | BAV | 160 | 58–64 | 82–88 | 80–86 | B | 75–81 |
| F-06 SlimStraight | AVG | 165 | 60–66 | 84–90 | 82–88 | B | 77–83 |
| F-06 SlimStraight | AAV | 170 | 62–68 | 86–92 | 84–90 | B | 79–85 |
| F-06 SlimStraight | TAL | 176 | 64–70 | 88–94 | 86–92 | B | 81–87 |
| F-06 SlimStraight | VTL | 183 | 66–72 | 90–96 | 88–94 | B | 83–89 |
| F-07 SlimCurvy | VSH | 145 | 54–60 | 82–90 | 82–90 | C | 74.5–82.5 |
| F-07 SlimCurvy | SHT | 154 | 56–62 | 84–92 | 84–92 | C | 76.5–84.5 |
| F-07 SlimCurvy | BAV | 160 | 58–64 | 86–94 | 86–94 | C | 78.5–86.5 |
| F-07 SlimCurvy | AVG | 165 | 60–66 | 88–96 | 88–96 | C | 80.5–88.5 |
| F-07 SlimCurvy | AAV | 170 | 62–68 | 90–98 | 90–98 | C | 82.5–90.5 |
| F-07 SlimCurvy | TAL | 176 | 64–70 | 92–100 | 92–100 | C | 84.5–92.5 |
| F-07 SlimCurvy | VTL | 183 | 66–72 | 94–102 | 94–102 | C | 86.5–94.5 |
| F-08 BananaShape | VSH | 145 | 56–62 | 80–86 | 78–84 | B | 73–79 |
| F-08 BananaShape | SHT | 154 | 58–64 | 82–88 | 80–86 | B | 75–81 |
| F-08 BananaShape | BAV | 160 | 60–66 | 84–90 | 82–88 | B | 77–83 |
| F-08 BananaShape | AVG | 165 | 62–68 | 86–92 | 84–90 | B | 79–85 |
| F-08 BananaShape | AAV | 170 | 64–70 | 88–94 | 86–92 | B | 81–87 |
| F-08 BananaShape | TAL | 176 | 66–72 | 90–96 | 88–94 | B | 83–89 |
| F-08 BananaShape | VTL | 183 | 68–74 | 92–98 | 90–96 | B | 85–91 |
| F-09 PearShape | VSH | 145 | 58–64 | 88–96 | 76–84 | B | 71–79 |
| F-09 PearShape | SHT | 154 | 60–66 | 90–98 | 78–86 | B | 73–81 |
| F-09 PearShape | BAV | 160 | 62–68 | 92–100 | 80–88 | B | 75–83 |
| F-09 PearShape | AVG | 165 | 64–70 | 94–102 | 82–90 | B | 77–85 |
| F-09 PearShape | AAV | 170 | 66–72 | 96–104 | 84–92 | B | 79–87 |
| F-09 PearShape | TAL | 176 | 68–74 | 98–106 | 86–94 | B | 81–89 |
| F-09 PearShape | VTL | 183 | 70–76 | 100–108 | 88–96 | B | 83–91 |
| F-10 SpoonShape | VSH | 145 | 60–66 | 90–98 | 78–86 | C | 70.5–78.5 |
| F-10 SpoonShape | SHT | 154 | 62–68 | 92–100 | 80–88 | C | 72.5–80.5 |
| F-10 SpoonShape | BAV | 160 | 64–70 | 94–102 | 82–90 | C | 74.5–82.5 |
| F-10 SpoonShape | AVG | 165 | 66–72 | 96–104 | 84–92 | C | 76.5–84.5 |
| F-10 SpoonShape | AAV | 170 | 68–74 | 98–106 | 86–94 | C | 78.5–86.5 |
| F-10 SpoonShape | TAL | 176 | 70–76 | 100–108 | 88–96 | C | 80.5–88.5 |
| F-10 SpoonShape | VTL | 183 | 72–78 | 102–110 | 90–98 | C | 82.5–90.5 |
| F-11 HourglassSlim | VSH | 145 | 52–58 | 80–88 | 80–88 | C | 72.5–80.5 |
| F-11 HourglassSlim | SHT | 154 | 54–60 | 82–90 | 82–90 | C | 74.5–82.5 |
| F-11 HourglassSlim | BAV | 160 | 56–62 | 84–92 | 84–92 | C | 76.5–84.5 |
| F-11 HourglassSlim | AVG | 165 | 58–64 | 86–94 | 86–94 | C | 78.5–86.5 |
| F-11 HourglassSlim | AAV | 170 | 60–66 | 88–96 | 88–96 | C | 80.5–88.5 |
| F-11 HourglassSlim | TAL | 176 | 62–68 | 90–98 | 90–98 | C | 82.5–90.5 |
| F-11 HourglassSlim | VTL | 183 | 64–70 | 92–100 | 92–100 | C | 84.5–92.5 |
| F-12 HourglassCurvy | VSH | 145 | 56–64 | 88–96 | 88–96 | DD | 75.5–83.5 |
| F-12 HourglassCurvy | SHT | 154 | 58–66 | 90–98 | 90–98 | DD | 77.5–85.5 |
| F-12 HourglassCurvy | BAV | 160 | 60–68 | 92–100 | 92–100 | DD | 79.5–87.5 |
| F-12 HourglassCurvy | AVG | 165 | 62–70 | 94–102 | 94–102 | DD | 81.5–89.5 |
| F-12 HourglassCurvy | AAV | 170 | 64–72 | 96–104 | 96–104 | DD | 83.5–91.5 |
| F-12 HourglassCurvy | TAL | 176 | 66–74 | 98–106 | 98–106 | DD | 85.5–93.5 |
| F-12 HourglassCurvy | VTL | 183 | 68–76 | 100–108 | 100–108 | DD | 87.5–95.5 |
| F-13 HourglassFullBust | VSH | 145 | 56–64 | 86–94 | 96–110 | G | 76–90 |
| F-13 HourglassFullBust | SHT | 154 | 58–66 | 88–96 | 98–112 | G | 78–92 |
| F-13 HourglassFullBust | BAV | 160 | 60–68 | 90–98 | 100–114 | G | 80–94 |
| F-13 HourglassFullBust | AVG | 165 | 62–70 | 92–100 | 102–116 | G | 82–96 |
| F-13 HourglassFullBust | AAV | 170 | 64–72 | 94–102 | 104–118 | G | 84–98 |
| F-13 HourglassFullBust | TAL | 176 | 66–74 | 96–104 | 106–120 | G | 86–100 |
| F-13 HourglassFullBust | VTL | 183 | 68–76 | 98–106 | 108–122 | G | 88–102 |
| F-14 TopHeavy | VSH | 145 | 60–68 | 82–90 | 96–112 | G | 76–92 |
| F-14 TopHeavy | SHT | 154 | 62–70 | 84–92 | 98–114 | G | 78–94 |
| F-14 TopHeavy | BAV | 160 | 64–72 | 86–94 | 100–116 | G | 80–96 |
| F-14 TopHeavy | AVG | 165 | 66–74 | 88–96 | 102–118 | G | 82–98 |
| F-14 TopHeavy | AAV | 170 | 68–76 | 90–98 | 104–120 | G | 84–100 |
| F-14 TopHeavy | TAL | 176 | 70–78 | 92–100 | 106–122 | G | 86–102 |
| F-14 TopHeavy | VTL | 183 | 72–80 | 94–102 | 108–124 | G | 88–104 |
| F-15 BottomHeavy | VSH | 145 | 60–68 | 92–102 | 72–82 | B | 67–77 |
| F-15 BottomHeavy | SHT | 154 | 62–70 | 94–104 | 74–84 | B | 69–79 |
| F-15 BottomHeavy | BAV | 160 | 64–72 | 96–106 | 76–86 | B | 71–81 |
| F-15 BottomHeavy | AVG | 165 | 66–74 | 98–108 | 78–88 | B | 73–83 |
| F-15 BottomHeavy | AAV | 170 | 68–76 | 100–110 | 80–90 | B | 75–85 |
| F-15 BottomHeavy | TAL | 176 | 70–78 | 102–112 | 82–92 | B | 77–87 |
| F-15 BottomHeavy | VTL | 183 | 72–80 | 104–114 | 84–94 | B | 79–89 |
| F-16 FullFigured | VSH | 145 | 68–78 | 94–104 | 94–106 | F | 76.5–88.5 |
| F-16 FullFigured | SHT | 154 | 70–80 | 96–106 | 96–108 | F | 78.5–90.5 |
| F-16 FullFigured | BAV | 160 | 72–82 | 98–108 | 98–110 | F | 80.5–92.5 |
| F-16 FullFigured | AVG | 165 | 74–84 | 100–110 | 100–112 | F | 82.5–94.5 |
| F-16 FullFigured | AAV | 170 | 76–86 | 102–112 | 102–114 | F | 84.5–96.5 |
| F-16 FullFigured | TAL | 176 | 78–88 | 104–114 | 104–116 | F | 86.5–98.5 |
| F-16 FullFigured | VTL | 183 | 80–90 | 106–116 | 106–118 | F | 88.5–100.5 |
| F-17 Voluptuous | VSH | 145 | 64–72 | 92–102 | 92–104 | H | 69.5–81.5 |
| F-17 Voluptuous | SHT | 154 | 66–74 | 94–104 | 94–106 | H | 71.5–83.5 |
| F-17 Voluptuous | BAV | 160 | 68–76 | 96–106 | 96–108 | H | 73.5–85.5 |
| F-17 Voluptuous | AVG | 165 | 70–78 | 98–108 | 98–110 | H | 75.5–87.5 |
| F-17 Voluptuous | AAV | 170 | 72–80 | 100–110 | 100–112 | H | 77.5–89.5 |
| F-17 Voluptuous | TAL | 176 | 74–82 | 102–112 | 102–114 | H | 79.5–91.5 |
| F-17 Voluptuous | VTL | 183 | 76–84 | 104–114 | 104–116 | H | 81.5–93.5 |
| F-18 Zaftig | VSH | 145 | 70–80 | 94–106 | 94–108 | G | 74–88 |
| F-18 Zaftig | SHT | 154 | 72–82 | 96–108 | 96–110 | G | 76–90 |
| F-18 Zaftig | BAV | 160 | 74–84 | 98–110 | 98–112 | G | 78–92 |
| F-18 Zaftig | AVG | 165 | 76–86 | 100–112 | 100–114 | G | 80–94 |
| F-18 Zaftig | AAV | 170 | 78–88 | 102–114 | 102–116 | G | 82–96 |
| F-18 Zaftig | TAL | 176 | 80–90 | 104–116 | 104–118 | G | 84–98 |
| F-18 Zaftig | VTL | 183 | 82–92 | 106–118 | 106–120 | G | 86–100 |
| F-19 Rubenesque | VSH | 145 | 76–88 | 100–114 | 100–116 | J | 72.5–88.5 |
| F-19 Rubenesque | SHT | 154 | 78–90 | 102–116 | 102–118 | J | 74.5–90.5 |
| F-19 Rubenesque | BAV | 160 | 80–92 | 104–118 | 104–120 | J | 76.5–92.5 |
| F-19 Rubenesque | AVG | 165 | 82–94 | 106–120 | 106–122 | J | 78.5–94.5 |
| F-19 Rubenesque | AAV | 170 | 84–96 | 108–122 | 108–124 | J | 80.5–96.5 |
| F-19 Rubenesque | TAL | 176 | 86–98 | 110–124 | 110–126 | J | 82.5–98.5 |
| F-19 Rubenesque | VTL | 183 | 88–100 | 112–126 | 112–128 | J | 84.5–100.5 |
| F-20 AthleticCurvy | VSH | 145 | 58–64 | 86–94 | 86–96 | DD | 73.5–83.5 |
| F-20 AthleticCurvy | SHT | 154 | 60–66 | 88–96 | 88–98 | DD | 75.5–85.5 |
| F-20 AthleticCurvy | BAV | 160 | 62–68 | 90–98 | 90–100 | DD | 77.5–87.5 |
| F-20 AthleticCurvy | AVG | 165 | 64–70 | 92–100 | 92–102 | DD | 79.5–89.5 |
| F-20 AthleticCurvy | AAV | 170 | 66–72 | 94–102 | 94–104 | DD | 81.5–91.5 |
| F-20 AthleticCurvy | TAL | 176 | 68–74 | 96–104 | 96–106 | DD | 83.5–93.5 |
| F-20 AthleticCurvy | VTL | 183 | 70–76 | 98–106 | 98–108 | DD | 85.5–95.5 |
| F-21 MuscularFeminine | VSH | 145 | 60–68 | 84–92 | 82–92 | C | 74.5–84.5 |
| F-21 MuscularFeminine | SHT | 154 | 62–70 | 86–94 | 84–94 | C | 76.5–86.5 |
| F-21 MuscularFeminine | BAV | 160 | 64–72 | 88–96 | 86–96 | C | 78.5–88.5 |
| F-21 MuscularFeminine | AVG | 165 | 66–74 | 90–98 | 88–98 | C | 80.5–90.5 |
| F-21 MuscularFeminine | AAV | 170 | 68–76 | 92–100 | 90–100 | C | 82.5–92.5 |
| F-21 MuscularFeminine | TAL | 176 | 70–78 | 94–102 | 92–102 | C | 84.5–94.5 |
| F-21 MuscularFeminine | VTL | 183 | 72–80 | 96–104 | 94–104 | C | 86.5–96.5 |
| F-22 PetiteHourglass | VSH | 145 | 52–58 | 80–88 | 80–88 | C | 72.5–80.5 |
| F-22 PetiteHourglass | SHT | 154 | 54–60 | 82–90 | 82–90 | C | 74.5–82.5 |
| F-22 PetiteHourglass | BAV | 160 | 56–62 | 84–92 | 84–92 | C | 76.5–84.5 |
| F-23 MiniVoluptuous | VSH | 145 | 58–66 | 88–98 | 88–100 | F | 70.5–82.5 |
| F-23 MiniVoluptuous | SHT | 154 | 60–68 | 90–100 | 90–102 | F | 72.5–84.5 |
| F-23 MiniVoluptuous | BAV | 160 | 62–70 | 92–102 | 92–104 | F | 74.5–86.5 |
| F-24 CompactPower | VSH | 145 | 62–72 | 84–94 | 84–96 | DD | 71.5–83.5 |
| F-24 CompactPower | SHT | 154 | 64–74 | 86–96 | 86–98 | DD | 73.5–85.5 |
| F-24 CompactPower | BAV | 160 | 66–76 | 88–98 | 88–100 | DD | 75.5–87.5 |
| F-24 CompactPower | AVG | 165 | 68–78 | 90–100 | 90–102 | DD | 77.5–89.5 |
| F-24 CompactPower | AAV | 170 | 70–80 | 92–102 | 92–104 | DD | 79.5–91.5 |
| F-24 CompactPower | TAL | 176 | 72–82 | 94–104 | 94–106 | DD | 81.5–93.5 |
| F-24 CompactPower | VTL | 183 | 74–84 | 96–106 | 96–108 | DD | 83.5–95.5 |

*Male dolls: waist and hip from catalog Part 6; there is no bust or underbust target.*

---

*End of task list v3.2*























# Paper Doll Face & Hair Task List
## Companion to Body Catalog v3.2 and Body Task List v3.2
### Version 1.1 — DRAFT (value sets are proposals)

> **Read this first**
> The body catalog defines the FACE CARD as *FaceShape · Cheekbone · Jaw · Eyes · Nose · Lips · Brows · Hair* but never lists the values for any of them. To make the work countable, this draft **proposes** a value set for each attribute (§4, all marked PROPOSED). Edit those lists — add, remove, rename — and the counts and grids follow. Nothing in Phases FH-1 onward should start until you have approved §4 (decision F-02).
> Face and hair are built **modularly** (§2): a head base plus separate part layers, never one PNG per full face — see F-01 for why.

---

# 0. HOW TO USE THIS FILE

1. Work top to bottom; each phase ends in a **Gate**. FH-0 (foundations) must pass before anything else.
2. Task lines: `- [ ] **FH3-1.2** …` — change to `[~]` in progress, `[x]` done, `[!]` blocked (say why).
3. Grid cells (one cell = one asset file): `☐` to do · `◐` in progress · `✔` done and through QA · `✖` blocked/failed · `—` not applicable.
4. An asset is done only when it passes SOP-FQ (§5.6).
5. Shared conventions with the body task list (v3.2): same px/cm scale, same anchor-JSON idea, same manifest idea, **same UV-pass rule** (every head base ships a `_uv.png` so body skin layers fit it), same QA rule that every face must read as an adult (18+). The body doll is **headless** — this track supplies the head.

---

# 1. DASHBOARD (update as you go)

| Phase | Scope | Tasks | Assets (target) | Done | Gate |
|-------|-------|------:|----------------:|-----:|------|
| FH0 | Foundations, standards, pilot | 15 | — | 0 | FH-G0 |
| FH1 | Head bases (35 × 2 genders) | 4 | 70 | 0 | FH-G1 |
| FH2 | Cheekbone + age layers | 17 | 16 | 0 | FH-G2 |
| FH3 | Eyes, pupils, iris tints | 23 | 44 | 0 | FH-G3 |
| FH4 | Nose, lips, brows | 14 | 30 | 0 | FH-G4 |
| FH5 | Race facial features | 8 | 6 | 0 | FH-G5 |
| FH6 | Hair, hair colours, facial hair | 34 | 243 | 0 | FH-G6 |
| FH7 | Named character faces | 2 | 35 | 0 | FH-G7 |
| FH8 | Integration and release | 8 | — | 0 | FH-G8 |
| **Total** | | **125** | **444** | **0** | |

---

# 2. ARCHITECTURE — HOW A FACE IS ASSEMBLED

A fully baked face card would need one PNG for every combination. With the proposed values that is **1,632,960 combinations per gender** (before hair, colour, age or race features). So the face is a **stack of layers** composited on a head base, all registered by anchors.

| Layer | What it is | Varies by | Count (proposed) |
|-------|------------|-----------|------------------|
| Head base | Skull + face shape + jaw, neutral expression, no hair, neutral grey skin | gender × FaceShape × Jaw | 70 |
| Cheekbone | Shading/volume layer | gender × level | 6 |
| Age lines | Wrinkle / laugh-line / skin-age overlay | gender × age tier (YoungAdult trace → OldMilf) | 10 |
| Eyes | Lids + sclera + iris-socket | shape × size | 24 |
| Pupils | Pupil shape layer | pupil type | 4 |
| Iris colours | Tint presets (not images) | human + fantasy | 16 |
| Nose |  | type | 6 |
| Lips |  | type | 6 |
| Brows | Tinted to hair colour | shape × thickness | 18 |
| Race facial features | Tusks, fangs, face scales, face war marks | feature | 6 |
| Facial hair | Male + any gender where wanted | style | 7 |
| Hair | Back + front layers × ear-fit variants | style × variant × back/front | 216 |
| Hair colours | Tint presets (not images) | natural + fantasy | 20 |

### Layer order for a full character (back → front)

This **refines the head items** in the body list's z-order (body P0-3.9), which listed ears · horns · hair as one block:

`ground shadow · tail(behind) · wings(behind) · hair-back · body doll · breast sprite · nipple sprite · pubic hair · anatomy variant · clothing(external) · tail(front) · head base · age lines · cheekbone · nose · lips · eyes · pupils · brows · race facial feature · facial hair · ears · hair-front · horns · divine aura / glow` — skin layers are applied to each part through its UV pass **before** compositing.

Ears sit **under** hair-front (so the *Exposed* hair variants let pointed ears show and the *Standard* variant covers them); horns sit **over** hair-front. Body P0-3.9 already uses this order.

---

# 3. DECISION LOG

| ID | Decision | Default used in this file | Needed by | Status |
|------|----------|---------------------------|-----------|--------|
| F-01 | Modular layers instead of baked face cards | Modular. 1,632,960 combinations per gender makes baking impossible. | FH-0 | default |
| F-02 | Value sets | The proposed lists in §4. Approve, edit or replace each one. | FH-0 | **open** |
| F-03 | Canvas and registration | Face parts: 512 × 512 head canvas at 8 px/cm with anchor JSON. Hair: 1024 × 1536 canvas on the same head anchor so long styles can fall over shoulders and chest. | FH-0 | default |
| F-04 | Head-to-body attachment | Body dolls are **headless** (neck to a NECK_TOP anchor, body D-09). The head base attaches at NECK_TOP and covers the seam. Head size follows an adult-proportion rule per body height — written in FH0-3 and checked on every petite doll. | FH-0 | default |
| F-05 | Age on faces | Young is the baseline; YoungAdult gets a trace overlay; RipeningMilf → OldMilf get progressively stronger overlays. Per gender. | FH-0 | default |
| F-06 | Gender | Head bases per gender; all other parts shared and tested on both. | FH-0 | default |
| F-07 | Colour as tint presets | Eye and hair colour are tint presets (JSON), not separate images. | FH-0 | default |
| F-08 | Hair variants | Each style has Back + Front layers and three ear-fit variants: Standard, Exposed, Animal-top. | FH-0 | default |
| F-09 | Refined layer order | hair-back < body < head < ears < hair-front < horns (see §2). Overrides the combined "ears · horns · hair" block in body P0-3.9. | FH-0 | default |
| F-10 | Facial hair in scope | Yes — 7 styles. | FH-9 | default |
| F-11 | Race facial features | The six in §4. Tusks and fangs are face-card items, as the body list already says for C25 Ushara. | FH-8 | default |
| F-12 | Expressions | Neutral only in this pass. A later pass could add 6 (smile, frown, surprise, blush, angry, sleepy). | FH-0 | default |
| F-13 | Skin on heads | Body skin layers (body Phase 7) are authored in UV space; every head base ships a UV pass so they fit the head. Verify in FH0-10. | FH-0 | default |
| F-14 | Named-character faces | Reviewed one character at a time, matching the body review. | FH-11 | **in review** |
| F-15 | Out of scope here | Clothing, hats, glasses, earrings, headbands, hair physics, expressions beyond neutral. | — | default |
| F-16 | Eye extras | Heterochromia and glow eyes handled with tint presets + the Slit/None-Glow pupil layers. | FH-3 | default |

---

# 4. PROPOSED VALUE SETS (edit these — F-02)

| Attribute | Values (PROPOSED) | Count |
|-----------|-------------------|-------|
| FaceShape | Oval · Round · Square · Heart · Diamond · Oblong · Triangle | 7 |
| Jaw | Rounded · Tapered · Angular · Square · Pointed | 5 |
| Cheekbone | Soft · Defined · HighProminent | 3 |
| Eye shape | Almond · Round · Upturned · Downturned · Hooded · Monolid · DeepSet · Doe | 8 |
| Eye size | Small · Medium · Large | 3 |
| Pupil | Round · Slit · Horizontal · None-Glow | 4 |
| Iris — human | Black · DarkBrown · Brown · Hazel · Amber · Green · Blue · Grey | 8 |
| Iris — fantasy | Red · Gold · Silver · Violet · Teal · Pink · WhiteGlow · Heterochromia | 8 |
| Nose | Button · Straight · Aquiline · Wide · Upturned · LongNarrow | 6 |
| Lips | Thin · Medium · Full · Cupid · Wide · SmallPouty | 6 |
| Brow shape × thickness | Straight · SoftArch · HighArch · Angular · Rounded · Flat  ×  Thin · Medium · Thick | 18 |
| Race facial features | TusksSmall · TusksLarge · FangsSmall · FangsLong · FaceScales · WarMarksFace | 6 |
| Facial hair | Stubble · Moustache · Goatee · ShortBeard · FullBeard · LongBeard · Sideburns | 7 |
| Hair colour — natural | Black · DarkBrown · Brown · LightBrown · Auburn · Ginger · Blonde · PlatinumBlonde · Grey · White | 10 |
| Hair colour — fantasy | Blue · Teal · Green · Pink · Purple · Crimson · SilverMetallic · GoldMetallic · AshLavender · Ombre | 10 |
| Hair styles | 36 styles in 6 length groups (see FH-9 grid); Bald needs no asset | 36 |
| Hair ear-fit variants | std = Standard (ears covered / human ears) · exp = Exposed (pointed ears show: Wood/High/Dark Elf) · ani = Animal-top (cut-outs for ears on top of head) | 3 |

### File naming

| Asset | Pattern | Example |
|-------|---------|---------|
| Head base | `head_{g}_{faceshape}_{jaw}.png` | `head_f_oval_tapered.png` |
| Cheekbone | `cheek_{g}_{level}.png` | `cheek_m_defined.png` |
| Age lines | `age_{g}_{tier}.png` | `age_f_ripemilf.png` |
| Eyes | `eyes_{shape}_{size}.png` | `eyes_almond_medium.png` |
| Pupil | `pupil_{type}.png` | `pupil_slit.png` |
| Nose / Lips | `nose_{type}.png` · `lips_{type}.png` | `lips_cupid.png` |
| Brows | `brows_{shape}_{thickness}.png` | `brows_softarch_thick.png` |
| Race feature | `rf_{name}.png` | `rf_tusksmall.png` |
| Facial hair | `fhair_{style}.png` | `fhair_goatee.png` |
| Hair | `hair_{style}_{variant}_{back|front}.png` | `hair_ponytailhigh_exp_front.png` |
| Tint presets | `tint_iris_{name}.json` · `tint_hair_{name}.json` | `tint_hair_auburn.json` |
| Named face | `face_{id}_{name}.json` (recipe of the layers above) | `face_C2_syrael.json` |

---

# 5. STANDARD PROCEDURES

## 5.1 SOP-H — One head base

- **H1** Open the neutral head template; set FaceShape and Jaw to the grid cell.
- **H2** Neutral expression, no hair, no ears' race variation (ears come from the overlay track), neutral grey skin.
- **H3** Render at 8 px/cm on the 512 × 512 head canvas; export `head_{g}_{faceshape}_{jaw}.png` + `_uv.png` (UV pass, same atlas as the body) + anchor JSON.
- **H4** Anchors present: HEAD_TOP, CROWN, HAIRLINE_CENTER, EYE_L/R, BROW_L/R, NOSE_TIP, MOUTH_CENTER, JAW_POINT, CHEEK_L/R, EAR_L/R, NECK_BASE.
- **H5** SOP-FQ; tick the cell.

## 5.2 SOP-P — One face part (cheek, eyes, nose, lips, brows, pupil, race feature, facial hair, age layer)

- **P1** Author on the neutral template head.
- **P2** Bind to its anchors (eyes → EYE_L/R, nose → NOSE_TIP, lips → MOUTH_CENTER, brows → BROW_L/R, cheek → CHEEK_L/R).
- **P3** Fit-test on **all 7 FaceShapes × both genders** (14 heads).
- **P4** Tint-test on three skin tones (light, medium, dark) and one fantasy tone.
- **P5** Combination test with three other parts, including the most extreme eye shape.
- **P6** Age test on the OldMilf overlay (no clash with the age lines).
- **P7** Export, manifest row, SOP-FQ, tick.

## 5.3 SOP-HR — One hair style

- **R1** Author the Standard variant on the neutral head; split into Back and Front.
- **R2** Build the Exposed variant (pointed ears show) and the Animal-top variant (cut-outs on top of head). If a variant would be identical (e.g. Buzz), copy it and mark the cell.
- **R3** Fit-test on all 7 FaceShapes.
- **R4** Ear test: Standard with Human; Exposed with ElvenPointed and HighElvenLong; Animal-top with AnimalFox, AnimalWolf, AnimalCow, AnimalCat, AnimalBunny; Demonic and DragonRidge with the closest variant.
- **R5** Horn test: CurvedRam, DragonCurved, ThickBull, DevilForked must sit in front of the hair without the hair swallowing the horn base.
- **R6** Tint test: three natural + two fantasy colours.
- **R7** Body-overlap test for Medium/Long/Tied/Wild styles: REF-4 (widest) and REF-6 (muscular) — hair falls correctly over shoulders and chest, back layer behind the body.
- **R8** Export all six files; manifest rows; SOP-FQ; tick the six cells.

## 5.4 SOP-AG — One age-lines overlay

- **A1** Target look from the catalog tier descriptions (YoungAdult: trace; RipeningMilf: first lines; RipeMilf: moderate; MatureMilf: clear; OldMilf: strong).
- **A2** Author per gender on the neutral head; fit-test on all 7 FaceShapes.
- **A3** Compare with the tier before: each step visibly older, never uglier than the body card implies.
- **A4** Export, SOP-FQ, tick.

## 5.5 SOP-FN — One named character's face

- **F1** Resolve the spec (FaceShape, Jaw, Cheek, Eyes + colour + pupil, Nose, Lips, Brows, Hair style + colour, race feature, age tier) — one character at a time with you.
- **F2** Composite on the character's body card in the correct layer order.
- **F3** Check age tier against the body card, race feature against the race kit, ears against the hair variant.
- **F4** Export the recipe JSON and the composite; tell body Phase 8 the face link is ready.

## 5.6 SOP-FQ — Quality gate

- **FQ1** File name matches the pattern in §4. **FQ2** Canvas, px/cm and anchors correct. **FQ3** Transparent background, no halo.
- **FQ4** No baked hair or shadow on head bases. **FQ5** Fit on all 7 FaceShapes (parts and hair).
- **FQ6** **Adult appearance:** every face reads clearly as 18+ at every tier, especially with petite bodies, large eye sizes (Doe/Large) and Pouty/Button features. A failed asset is redrawn, not patched.
- **FQ7** Reads correctly on light and dark backgrounds. **FQ8** Manifest updated; backed up.

---

# PHASE FH-0 — FOUNDATIONS

- [ ] **FH0-1.1** Approve or edit every list in §4 (F-02). **Done when** you reply with the final lists; I regenerate the counts.
- [ ] **FH0-1.2** Close F-01 … F-16 (accept defaults or override).
- [ ] **FH0-2.1** Create folders: `10_head/`, `11_parts/` (cheek, age, eyes, pupil, nose, lips, brows, race, fhair), `12_hair/`, `13_tints/`, `14_named_faces/`.
- [ ] **FH0-3.1** **Head scale rule (F-04):** head height in cm as a function of body height tag, producing adult proportions at every height from 145 cm to 193 cm. Write the table; test on REF-1, REF-4, REF-3 from the body list.
- [ ] **FH0-3.2** Define head canvas 512 × 512 and hair canvas 1024 × 1536 (F-03); both at 8 px/cm; anchor origin = HEAD_TOP.
- [ ] **FH0-3.3** Define the anchor set and sidecar JSON (list in SOP-H H4).
- [ ] **FH0-3.4** Build the **neutral template head** and its standard lighting (same light as body renders).
- [ ] **FH0-3.5** Write the **adult-appearance reference sheet** for faces (feeds FQ6): what "reads 18+" means for each FaceShape/eye size/lip type combination, and the worst-case combinations to test every part against.
- [ ] **FH0-4.1** Write the tint preset format (JSON): tint colour, strength, gloss; one file per iris / hair colour.
- [ ] **FH0-5.1** Layer order (F-09): confirm body P0-3.9 matches §2, then extend the body compositor test script (body P0-8.5) with head layers.
- [ ] **FH0-6.1** Face manifest: one row per asset in §2; status column. Counts must equal the dashboard.
- [ ] **FH0-7.1** Validator for the file-name patterns in §4.
- [ ] **FH0-8.1** **Pilot:** build 1 head base (Oval · Tapered, female), 1 eye (Almond · Medium), 1 nose, 1 lips, 1 brows, 1 hair style (Lob, all 6 files). Composite on REF-4 with Elven ears and a CurvedRam horn. Fix every registration problem now.
- [ ] **FH0-9.1** Write `fh_pilot_notes.md`; update standards.
- [ ] **FH0-10.1** Skin check (F-13): a body skin tone and a freckle layer applied through the UV passes tint the head base cleanly with no seam at the neck (NECK_TOP), on REF-1, REF-4 and REF-3.

**GATE FH-G0** — [ ] §4 approved · [ ] decisions closed · [ ] pilot composite passes · [ ] head-scale rule written · [ ] adult-appearance sheet written

---

# PHASE FH-1 — HEAD BASES (FaceShape × Jaw, per gender)

- [ ] **FH1-1.1** Confirm FH-G0.
- [ ] **FH1-1.2** Build all 35 female heads with SOP-H, then all 35 male heads. Same order as the grids.
- [ ] **FH1-1.3** Contact sheet per gender (7 × 5): every FaceShape/Jaw must be distinguishable at thumbnail size.
- [ ] **FH1-1.4** Adult-appearance check on every head (FQ6).

#### ⟦HEAD·F⟧ Female head bases — 7 × 5 = 35

File: `head_f_{faceshape}_{jaw}.png`

|  | Rounded | Tapered | Angular | Square | Pointed |
|------|---------|---------|---------|--------|---------|
| Oval | ☐ | ☐ | ☐ | ☐ | ☐ |
| Round | ☐ | ☐ | ☐ | ☐ | ☐ |
| Square | ☐ | ☐ | ☐ | ☐ | ☐ |
| Heart | ☐ | ☐ | ☐ | ☐ | ☐ |
| Diamond | ☐ | ☐ | ☐ | ☐ | ☐ |
| Oblong | ☐ | ☐ | ☐ | ☐ | ☐ |
| Triangle | ☐ | ☐ | ☐ | ☐ | ☐ |

#### ⟦HEAD·M⟧ Male head bases — 7 × 5 = 35

File: `head_m_{faceshape}_{jaw}.png`

|  | Rounded | Tapered | Angular | Square | Pointed |
|------|---------|---------|---------|--------|---------|
| Oval | ☐ | ☐ | ☐ | ☐ | ☐ |
| Round | ☐ | ☐ | ☐ | ☐ | ☐ |
| Square | ☐ | ☐ | ☐ | ☐ | ☐ |
| Heart | ☐ | ☐ | ☐ | ☐ | ☐ |
| Diamond | ☐ | ☐ | ☐ | ☐ | ☐ |
| Oblong | ☐ | ☐ | ☐ | ☐ | ☐ |
| Triangle | ☐ | ☐ | ☐ | ☐ | ☐ |

**GATE FH-G1** — [ ] 70 head bases ✔ · [ ] contact sheets reviewed

---

# PHASE FH-2 — CHEEKBONE AND AGE LAYERS

- [ ] **FH2-1.1** Cheekbone · **Female · Soft** — SOP-P (fit-test on all 7 FaceShapes)
- [ ] **FH2-1.2** Cheekbone · **Female · Defined** — SOP-P (fit-test on all 7 FaceShapes)
- [ ] **FH2-1.3** Cheekbone · **Female · HighProminent** — SOP-P (fit-test on all 7 FaceShapes)
- [ ] **FH2-2.1** Cheekbone · **Male · Soft** — SOP-P (fit-test on all 7 FaceShapes)
- [ ] **FH2-2.2** Cheekbone · **Male · Defined** — SOP-P (fit-test on all 7 FaceShapes)
- [ ] **FH2-2.3** Cheekbone · **Male · HighProminent** — SOP-P (fit-test on all 7 FaceShapes)
- [ ] **FH2-3.1** Age lines · **Female · YoungAdult** (25–29) — SOP-AG
- [ ] **FH2-3.2** Age lines · **Female · RipeningMilf** (30–35) — SOP-AG
- [ ] **FH2-3.3** Age lines · **Female · RipeMilf** (35–43) — SOP-AG
- [ ] **FH2-3.4** Age lines · **Female · MatureMilf** (43–50) — SOP-AG
- [ ] **FH2-3.5** Age lines · **Female · OldMilf** (50+) — SOP-AG
- [ ] **FH2-4.1** Age lines · **Male · YoungAdult** (25–29) — SOP-AG
- [ ] **FH2-4.2** Age lines · **Male · RipeningMilf** (30–35) — SOP-AG
- [ ] **FH2-4.3** Age lines · **Male · RipeMilf** (35–43) — SOP-AG
- [ ] **FH2-4.4** Age lines · **Male · MatureMilf** (43–50) — SOP-AG
- [ ] **FH2-4.5** Age lines · **Male · OldMilf** (50+) — SOP-AG
- [ ] **FH2-5.1** Age sequence check: YoungAdult → RipeningMilf → RipeMilf → MatureMilf → OldMilf on three head bases per gender; each step visibly older.

**GATE FH-G2** — [ ] 6 cheekbone + 10 age layers ✔

---

# PHASE FH-3 — EYES

- [ ] **FH3-1.1** Build the 24 eye layers (grid below) with SOP-P. Test the extremes first: Doe · Large and Monolid · Small.
- [ ] **FH3-1.2** Adult-appearance check (FQ6) on every Large size and on Doe.

#### ⟦EYES⟧ Eye layers — 8 × 3 = 24

File: `eyes_{shape}_{size}.png`

|  | Small | Medium | Large |
|------|-------|--------|-------|
| Almond | ☐ | ☐ | ☐ |
| Round | ☐ | ☐ | ☐ |
| Upturned | ☐ | ☐ | ☐ |
| Downturned | ☐ | ☐ | ☐ |
| Hooded | ☐ | ☐ | ☐ |
| Monolid | ☐ | ☐ | ☐ |
| DeepSet | ☐ | ☐ | ☐ |
| Doe | ☐ | ☐ | ☐ |

### Pupils
- [ ] **FH3-2.1** Pupil · **Round** — human and most races
- [ ] **FH3-2.2** Pupil · **Slit** — Cat, Dragonkin, Demon/Devil options
- [ ] **FH3-2.3** Pupil · **Horizontal** — Cow, goat-type options
- [ ] **FH3-2.4** Pupil · **None-Glow** — Angel, Goddess, glowing eyes
### Iris tint presets (JSON, F-07)
- [ ] **FH3-3.1** Iris (human) · **Black**
- [ ] **FH3-3.2** Iris (human) · **DarkBrown**
- [ ] **FH3-3.3** Iris (human) · **Brown**
- [ ] **FH3-3.4** Iris (human) · **Hazel**
- [ ] **FH3-3.5** Iris (human) · **Amber**
- [ ] **FH3-3.6** Iris (human) · **Green**
- [ ] **FH3-3.7** Iris (human) · **Blue**
- [ ] **FH3-3.8** Iris (human) · **Grey**
- [ ] **FH3-3.9** Iris (fantasy) · **Red**
- [ ] **FH3-3.10** Iris (fantasy) · **Gold**
- [ ] **FH3-3.11** Iris (fantasy) · **Silver**
- [ ] **FH3-3.12** Iris (fantasy) · **Violet**
- [ ] **FH3-3.13** Iris (fantasy) · **Teal**
- [ ] **FH3-3.14** Iris (fantasy) · **Pink**
- [ ] **FH3-3.15** Iris (fantasy) · **WhiteGlow** — glow/gloss variant if needed
- [ ] **FH3-3.16** Iris (fantasy) · **Heterochromia** — two-colour pair (F-16)
- [ ] **FH3-4.1** Eye × tint × pupil matrix test: 5 random eye layers × 6 tints × all 4 pupils.

**GATE FH-G3** — [ ] 44 eye assets ✔

---

# PHASE FH-4 — NOSE, LIPS, BROWS

## Nose
- [ ] **FH4-1.1** Nose · **Button** — SOP-P
- [ ] **FH4-1.2** Nose · **Straight** — SOP-P
- [ ] **FH4-1.3** Nose · **Aquiline** — SOP-P
- [ ] **FH4-1.4** Nose · **Wide** — SOP-P
- [ ] **FH4-1.5** Nose · **Upturned** — SOP-P
- [ ] **FH4-1.6** Nose · **LongNarrow** — SOP-P
## Lips
- [ ] **FH4-2.1** Lips · **Thin** — SOP-P
- [ ] **FH4-2.2** Lips · **Medium** — SOP-P
- [ ] **FH4-2.3** Lips · **Full** — SOP-P
- [ ] **FH4-2.4** Lips · **Cupid** — SOP-P
- [ ] **FH4-2.5** Lips · **Wide** — SOP-P
- [ ] **FH4-2.6** Lips · **SmallPouty** — SOP-P
## Brows
- [ ] **FH4-3.1** Build the 18 brow layers (grid below) with SOP-P. They tint to the hair colour (F-07).

#### ⟦BROWS⟧ Brow layers — 6 × 3 = 18

File: `brows_{shape}_{thickness}.png`

|  | Thin | Medium | Thick |
|------|------|--------|-------|
| Straight | ☐ | ☐ | ☐ |
| SoftArch | ☐ | ☐ | ☐ |
| HighArch | ☐ | ☐ | ☐ |
| Angular | ☐ | ☐ | ☐ |
| Rounded | ☐ | ☐ | ☐ |
| Flat | ☐ | ☐ | ☐ |

- [ ] **FH4-4.1** Combination test: every nose × lips pairing on three head bases per gender (adult-appearance check on SmallPouty, Button, Cupid combinations).

**GATE FH-G4** — [ ] 30 assets ✔

---

# PHASE FH-5 — RACE FACIAL FEATURES (F-11)

- [ ] **FH5-1.1** **TusksSmall** — Orc — small lower tusks (C25 Ushara uses tusks on the face card)
- [ ] **FH5-1.2** **TusksLarge** — Orc — large lower tusks
- [ ] **FH5-1.3** **FangsSmall** — Vampire / Succubus — small canines
- [ ] **FH5-1.4** **FangsLong** — Vampire — long canines
- [ ] **FH5-1.5** **FaceScales** — Dragonkin — scale patches on cheek / brow
- [ ] **FH5-1.6** **WarMarksFace** — Orc — face war marks (tattoo-system asset, see body list P7-7.5)
- [ ] **FH5-2.1** Test each feature on all 7 FaceShapes × 2 genders and with the Standard, Exposed and Animal-top hair variants.
- [ ] **FH5-2.2** Confirm face war marks are produced with the tattoo system (body P7-7.5) and only linked here.

**GATE FH-G5** — [ ] 6 features ✔

---

# PHASE FH-6 — HAIR (36 styles × 3 ear-fit variants × back/front)

- [ ] **FH6-1.1** Build order: Short → Medium → Tied → Long → Textured → Wild. Long styles last because of the body-overlap test.
- [ ] **FH6-1.2** Per style run SOP-HR; the grid has one cell per file.
- [ ] **FH6-1.3** Gender flag: F = female-leaning, M = male-leaning, U = unisex. Flags only guide the creator's default lists — every style can be used on any head.

#### ⟦HAIR⟧ Hair assets

File: `hair_{style}_{variant}_{back|front}.png` — variants: `std` = Standard (ears covered / human ears); `exp` = Exposed (pointed ears show: Wood/High/Dark Elf); `ani` = Animal-top (cut-outs for ears on top of head)

| Style | Length | Gender | std·back | std·front | exp·back | exp·front | ani·back | ani·front |
|-------|--------|--------|----------|-----------|----------|-----------|----------|-----------|
| Buzz | Short | M | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Crop | Short | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Pixie | Short | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Bob | Short | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Undercut | Short | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| SidePartShort | Short | M | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Spiky | Short | M | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| SlickBack | Short | M | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Lob | Medium | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| LayeredShoulder | Medium | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| WavyShoulder | Medium | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| CurlyShoulder | Medium | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| MessyMedium | Medium | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Shag | Medium | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| StraightLong | Long | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| WavyLong | Long | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| CurlyLong | Long | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| LayeredLong | Long | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| WaistLength | Long | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| FloorLength | Long | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| PonytailHigh | Tied | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| PonytailLow | Tied | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| TwinTails | Tied | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| BraidSingle | Tied | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| BraidCrown | Tied | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| BunTop | Tied | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| BunLow | Tied | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| HalfUp | Tied | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| SideBraid | Tied | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Afro | Textured | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Locs | Textured | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Cornrows | Textured | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Twists | Textured | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| CurlyPuff | Textured | F | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| WildMane | Wild | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| WindSwept | Wild | U | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

### Hair colour tint presets (F-07)
- [ ] **FH6-2.1** Hair colour (natural) · **Black**
- [ ] **FH6-2.2** Hair colour (natural) · **DarkBrown**
- [ ] **FH6-2.3** Hair colour (natural) · **Brown**
- [ ] **FH6-2.4** Hair colour (natural) · **LightBrown**
- [ ] **FH6-2.5** Hair colour (natural) · **Auburn**
- [ ] **FH6-2.6** Hair colour (natural) · **Ginger**
- [ ] **FH6-2.7** Hair colour (natural) · **Blonde**
- [ ] **FH6-2.8** Hair colour (natural) · **PlatinumBlonde**
- [ ] **FH6-2.9** Hair colour (natural) · **Grey**
- [ ] **FH6-2.10** Hair colour (natural) · **White**
- [ ] **FH6-2.11** Hair colour (fantasy) · **Blue**
- [ ] **FH6-2.12** Hair colour (fantasy) · **Teal**
- [ ] **FH6-2.13** Hair colour (fantasy) · **Green**
- [ ] **FH6-2.14** Hair colour (fantasy) · **Pink**
- [ ] **FH6-2.15** Hair colour (fantasy) · **Purple**
- [ ] **FH6-2.16** Hair colour (fantasy) · **Crimson**
- [ ] **FH6-2.17** Hair colour (fantasy) · **SilverMetallic**
- [ ] **FH6-2.18** Hair colour (fantasy) · **GoldMetallic**
- [ ] **FH6-2.19** Hair colour (fantasy) · **AshLavender**
- [ ] **FH6-2.20** Hair colour (fantasy) · **Ombre** — gradient preset
### Facial hair
- [ ] **FH6-3.1** Facial hair · **Stubble** — SOP-P (test on male heads and on Dwarf-style squared jaws)
- [ ] **FH6-3.2** Facial hair · **Moustache** — SOP-P (test on male heads and on Dwarf-style squared jaws)
- [ ] **FH6-3.3** Facial hair · **Goatee** — SOP-P (test on male heads and on Dwarf-style squared jaws)
- [ ] **FH6-3.4** Facial hair · **ShortBeard** — SOP-P (test on male heads and on Dwarf-style squared jaws)
- [ ] **FH6-3.5** Facial hair · **FullBeard** — SOP-P (test on male heads and on Dwarf-style squared jaws)
- [ ] **FH6-3.6** Facial hair · **LongBeard** — SOP-P (test on male heads and on Dwarf-style squared jaws)
- [ ] **FH6-3.7** Facial hair · **Sideburns** — SOP-P (test on male heads and on Dwarf-style squared jaws)
### Hair test matrix
- [ ] **FH6-4.1** Ear matrix: each style's variants against Human, ElvenPointed, HighElvenLong, AnimalFox, AnimalWolf, AnimalCow, AnimalCat, AnimalBunny, Demonic, DragonRidge (Standard→Human; Exposed→ElvenPointed/HighElvenLong; Animal-top→animal ears; Demonic and DragonRidge to the closest variant).
- [ ] **FH6-4.2** Horn matrix: CurvedRam, DragonCurved, ThickBull, DevilForked against one style per length group.
- [ ] **FH6-4.3** Body-overlap matrix: every Long, Tied and Wild style on REF-4 and REF-6, front and back layers.
- [ ] **FH6-4.4** Tint matrix: every style × 3 natural + 2 fantasy colours; brows follow the hair colour.

**GATE FH-G6** — [ ] 216 hair files ✔ · [ ] 20 colour presets ✔ · [ ] 7 facial-hair styles ✔ · [ ] test matrices passed

---

# PHASE FH-7 — NAMED CHARACTER FACES (35)

- [ ] **FH7-1.1** Review one character at a time with you (F-14). Each row below is filled during that review — nothing is guessed.
- [ ] **FH7-1.2** Resolve each character's face spec, then run SOP-FN.

| ID | Name | Race overlays (body list) | Tier | Face shape / jaw | Eyes + colour | Nose / lips / brows | Hair style + colour | Facial hair | Race feature | Spec ✔ | Face ✔ |
|------|------|---------------------------|------|------------------|---------------|---------------------|---------------------|-------------|--------------|--------|--------|
| C1 | Aldra Vane | Human | RipeMilf | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C2 | Syrael Dawnscribe | Ear HighElvenLong | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C3 | Mira Ashlen | Ear ElvenPointed (small) | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C4 | Dame Dava Colth | Human | RipeningMilf | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C5a | Variel (disguise) | Human | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C5b | Variel (true form) | Wings Feathered | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C6 | Edwyn Crale | Human | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C7 | Queen Maren II | Human | MatureMilf | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C8 | Princess Lysa Voss | Human | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C9 | Cass Merrow | Human | YoungAdult | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C10 | Pip | Ear + Tail Bunny | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C11 | Toma Vey | Human | YoungAdult | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C12 | Elowen Ashbark | Ear ElvenPointed | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C13 | Queen Ilvariel | Ear HighElvenLong | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C14 | Sylvaris Orenn | Ear HighElvenLong | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C15 | Sigrun Stonescribe | — (race not stated) | RipeningMilf | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C16 | Garet | Human | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C17 | Vael Stoneback | Wolf: ears + tail + markings | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C18 | Kiri Brightbrush | Fox: ears + tail + fur patches | RipeningMilf | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C18a | Rina Brightbrush | Fox: ears + tail + fur patches | MatureMilf | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C19 | Ashkora Emberscale | Horn DragonCurved + Tail Dragon + Scale patches | MatureMilf | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C19a | Kessa Emberscale | Horn DragonCurved + Tail Dragon + Scale patches | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C20 | Velara Ash | Ear Demonic + Horn CurvedRam + Tail Demon | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C20a | Sera Ash | Ear Demonic + Horn SmallNubs + Tail Demon | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C21 | Iskara Thorne | Ear Demonic + Horn DevilForked + Tail Devil | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C22 | Velindra Lysmere | Ear Demonic + Horn SmallNubs + Wing Bat + Tail Devil | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C22a | Lady Velura Lysmere | Same overlays as C22 | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C23 | Evara Nighthollow | Human | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C24 | Sister Ezan | Human | YoungAdult | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C25 | Ushara Ashfang | Human (tusks on face card) | MatureMilf | TBD | TBD | TBD | TBD | TBD | Tusks (face card) | ☐ | ☐ |
| C26 | Ceira Blackthorn | Human | YoungAdult | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C27 | Nessa Solstave | Human | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C28 | Maea Hollowtide | Human | MatureMilf | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C29 | Cella Hollowtide | Human | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |
| C30 | Senna Hollowtide | Human | Young | TBD | TBD | TBD | TBD | TBD | — | ☐ | ☐ |

**GATE FH-G7** — [ ] 35 faces ✔ · [ ] every body Phase-11 "Face link" cell ticked

---

# PHASE FH-8 — INTEGRATION AND RELEASE
- [ ] **FH8-1.1** Manifest reconcile: every row has a file; every file has a row.
- [ ] **FH8-1.2** Validator on every folder: zero failures.
- [ ] **FH8-2.1** Fit matrix: every part × the 5 most extreme head bases per gender.
- [ ] **FH8-2.2** Full-stack composite test: 20 random characters (body + skin + head + parts + hair + race overlays) in the correct layer order.
- [ ] **FH8-2.3** Adult-appearance audit across all heads, parts and ages (FQ6).
- [ ] **FH8-2.4** Age sweep: three faces from Young to OldMilf, each tier visibly older.
- [ ] **FH8-3.1** Update this file's version and the §4 lists to what was actually built; write release notes.
- [ ] **FH8-3.2** Tag, archive, back up.

**GATE FH-G8 — RELEASE** — [ ] all gates ticked · [ ] release tagged

---

*End of face & hair task list v1.1 (draft)*



















# Paper Doll Named Characters — Top 3 Variants and Looks
## Companion to Body Catalog v3.2, Body Task List v3.2 and Face & Hair Task List v1.1
### Version 2.0 — DRAFT (looks are proposals; variants approved)

> **What this file is**
> 41 entries (35 from body Phase 11 plus the six goddesses). Each has **3 recommended body variants** (123 in total) chosen from the earlier 8-variant sheets, plus a **look sheet** (skin, face, eyes, hair and race extras) built only from values in the Face & Hair task list §4 and the body catalog.
> **Adult-only rule applies to every entry.** Apparent-age floor is 18; tier is the character's own and is identical across their variants. Petite variants keep adult proportions (SOP-QA Q10, FQ6).

---

# 1. DECISIONS

| ID | Decision | Used here | Status |
|----|----------|-----------|--------|
| V-04 | Cup rule | Default cup = top of the body type's sweet spot; raised cups above it are allowed per variant while inside the body type's allowed range. | accepted |
| V-05 | Heights | Petite variants: the character's own height if petite, otherwise Short (154). Non-petite variants: own height if Average or taller, otherwise Average (165). | default |
| V-06 | Supernatural tissue (D-14) | Angel, Succubus and Goddess characters use `breast_f_sup_…` sprites, built on demand: **27** sprites for the picks below (C5b 3, C22 3, C22a 3, C31–C36 18). | open |
| V-07 | Canon bodies | Skipped. Source body types in headers are reference only. | accepted |
| V-13 | Body swaps | Skinny slots may use F-07 SlimCurvy at D; muscular set for C16. | accepted |
| V-14 | Selection | Only the top 3 variants per character are kept. | accepted |
| V-15 | Looks | Every look value is a proposal drawn from the Face & Hair value lists; none is canon. Review character by character. | open |
| V-16 | Facial hair | None; all dolls are female. | accepted |

**Breast and nipple rules (catalog Part 3).** Shape comes from cup × age tier (`X / Y` = 70% X + 30% Y; `X-Y` = 50/50). Softness comes from cup group × age tier; half-steps are midpoints; Athletic, AthleticCurvy, MuscularFeminine and CompactPower are authored one step firmer. Position follows age tier. Supernatural characters use Round (cup C and below) or Teardrop, always High, Firm or MediumFirm, and no age change. The proposed nipple type is the first of the cup group's three common types, with the other two listed as alternates; colour comes from the skin tone's mapping, and the unaroused, light and extreme states exist for every nipple. Areola size scales with the cup group.

Value sets used: FaceShape, Jaw, Cheekbone, eye shape and size, pupil, iris colours, nose, lips, brows, hair styles and colours, ear-fit variants (`std` Standard, `exp` Exposed, `ani` Animal-top) from the Face & Hair task list §4; skin tones, textures and gloss profiles from the body catalog Part 9; race kits from catalog Part 8.

---

# 2. CHARACTER INDEX

| ID | Name | Tier | Own height | Variants | Spec ✔ | Look ✔ | Built ✔ |
|----|------|------|-----------|----------|--------|--------|---------|
| C1 | Aldra Vane | RipeMilf | Average (165) | 3 | ✔ | ☐ | ☐ |
| C2 | Syrael Dawnscribe | Young | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C3 | Mira Ashlen | Young | Average (165) | 3 | ✔ | ☐ | ☐ |
| C4 | Dame Dava Colth | RipeningMilf | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C5a | Variel (disguise) | Young | Average (165) | 3 | ✔ | ☐ | ☐ |
| C5b | Variel (true form) | Young | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C6 | Edwyn Crale | Young | Average (165) | 3 | ✔ | ☐ | ☐ |
| C7 | Queen Maren II | MatureMilf | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C8 | Princess Lysa Voss | Young | Average (165) | 3 | ✔ | ☐ | ☐ |
| C9 | Cass Merrow | YoungAdult | Average (165) | 3 | ✔ | ☐ | ☐ |
| C10 | Pip | Young | VeryShort (145) | 3 | ✔ | ☐ | ☐ |
| C11 | Toma Vey | YoungAdult | BelowAverage (160) | 3 | ✔ | ☐ | ☐ |
| C12 | Elowen Ashbark | Young | Average (165) | 3 | ✔ | ☐ | ☐ |
| C13 | Queen Ilvariel | Young | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C14 | Sylvaris Orenn | Young | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C15 | Sigrun Stonescribe | RipeningMilf | VeryShort (145) | 3 | ✔ | ☐ | ☐ |
| C16 | Garet | Young | AboveAverage (170) | 3 | ✔ | ☐ | ☐ |
| C17 | Vael Stoneback | Young | AboveAverage (170) | 3 | ✔ | ☐ | ☐ |
| C18 | Kiri Brightbrush | RipeningMilf | Average (165) | 3 | ✔ | ☐ | ☐ |
| C18a | Rina Brightbrush | MatureMilf | Average (165) | 3 | ✔ | ☐ | ☐ |
| C19 | Ashkora Emberscale | MatureMilf | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C19a | Kessa Emberscale | Young | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C20 | Velara Ash | Young | AboveAverage (170) | 3 | ✔ | ☐ | ☐ |
| C20a | Sera Ash | Young | AboveAverage (170) | 3 | ✔ | ☐ | ☐ |
| C21 | Iskara Thorne | Young | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C22 | Velindra Lysmere | Young | AboveAverage (170) | 3 | ✔ | ☐ | ☐ |
| C22a | Lady Velura Lysmere | Young | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C23 | Evara Nighthollow | Young | Average (165) | 3 | ✔ | ☐ | ☐ |
| C24 | Sister Ezan | YoungAdult | Average (165) | 3 | ✔ | ☐ | ☐ |
| C25 | Ushara Ashfang | MatureMilf | VeryTall (183) | 3 | ✔ | ☐ | ☐ |
| C26 | Ceira Blackthorn | YoungAdult | Average (165) | 3 | ✔ | ☐ | ☐ |
| C27 | Nessa Solstave | Young | BelowAverage (160) | 3 | ✔ | ☐ | ☐ |
| C28 | Maea Hollowtide | MatureMilf | Average (165) | 3 | ✔ | ☐ | ☐ |
| C29 | Cella Hollowtide | Young | Average (165) | 3 | ✔ | ☐ | ☐ |
| C30 | Senna Hollowtide | Young | Average (165) | 3 | ✔ | ☐ | ☐ |
| C31 | Solenne | RipeningMilf | Average (165) | 3 | ✔ | ☐ | ☐ |
| C32 | Varan | MatureMilf | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C33 | Aeloria | RipeningMilf | Tall (176) | 3 | ✔ | ☐ | ☐ |
| C34 | Thessaly | RipeMilf | AboveAverage (170) | 3 | ✔ | ☐ | ☐ |
| C35 | Hestrel | RipeningMilf | Average (165) | 3 | ✔ | ☐ | ☐ |
| C36 | Nyxara | YoungAdult | Tall (176) | 3 | ✔ | ☐ | ☐ |

---

# 3. CHARACTERS

## C1 · Aldra Vane

- **Race overlays:** Human
- **Tier:** RipeMilf (age lines: ripemilf · same on all variants)
- **Source body (reference only):** TBD (source: 'Average/Soft') · cup C · own height Average (165 cm)
- **Notes:** D-15: body type unresolved.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C1-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Average (165) | `body_f_ripemilf_165_voluptuous.png` | G–I → **I** | `breast_f_ripemilf_165_voluptuous_I.png` | ✔ |
| 2 | C1-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_ripemilf_165_bottom_heavy.png` | A–C → **C** | `breast_f_ripemilf_165_bottom_heavy_C.png` | ✔ |
| 3 | C1-NS | Non-petite | Skinny | F-07 SlimCurvy | Average (165) | `body_f_ripemilf_165_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_ripemilf_165_slim_curvy_D.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C1-NH | I | Pendulous | Pillowy | Medium | LargeProtruding (I-K) | Wide / Long | Peach · Tan | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C1-NB | C | Round-Teardrop | Soft | Medium | Puffy (B-C) | Protruding / Flat | Peach · Tan | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C1-NS | D | Teardrop | Soft | Medium | Protruding (D-DD) | Wide / Puffy | Peach · Tan | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Tan |
| Skin texture / features | Rough · Scarred (Light) |
| Tattoo | None |
| Face shape | Square |
| Jaw | Angular |
| Cheekbone | Defined |
| Eyes (shape · size) | Hooded · Medium |
| Iris colour | Grey |
| Pupil | Round |
| Nose | Straight |
| Lips | Thin |
| Brows (shape · thickness) | Straight · Medium |
| Hair style (ear-fit variant) | PonytailLow (std) |
| Hair colour | Grey |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C2 · Syrael Dawnscribe

- **Race overlays:** Ear HighElvenLong
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-06 SlimStraight · cup B · own height Tall (176 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C2-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_young_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_176_slim_curvy_D.png` | ✔ |
| 2 | C2-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Tall (176) | `body_f_young_176_hourglass_curvy.png` | D–E → **E** | `breast_f_young_176_hourglass_curvy_E.png` | ✔ |
| 3 | C2-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Tall (176) | `body_f_young_176_bottom_heavy.png` | A–C → **C** | `breast_f_young_176_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C2-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C2-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | LightPink · Pink | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C2-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | LightPink · Pink | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Ivory |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Pointed |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Silver |
| Pupil | Round |
| Nose | LongNarrow |
| Lips | Thin |
| Brows (shape · thickness) | HighArch · Thin |
| Hair style (ear-fit variant) | StraightLong (exp) |
| Hair colour | PlatinumBlonde |
| Ears | HighElvenLong |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | Elf luminosity |

## C3 · Mira Ashlen

- **Race overlays:** Ear ElvenPointed (small)
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-05 Athletic · cup C · own height Average (165 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C3-NS | Non-petite | Skinny | F-06 SlimStraight | Average (165) | `body_f_young_165_slim_straight.png` | A–B → **B** | `breast_f_young_165_slim_straight_B.png` | ✔ |
| 2 | C3-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_young_165_bottom_heavy.png` | A–C → **C** | `breast_f_young_165_bottom_heavy_C.png` | ✔ |
| 3 | C3-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Average (165) | `body_f_young_165_hourglass_curvy.png` | D–E → **E** | `breast_f_young_165_hourglass_curvy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C3-NS | B | Perky / Round | Firm | High | Puffy (B-C) | Protruding / Flat | Pink · Rose | `nipple_f_slim_straight_puffy_B-C_unaroused.png` |
| C3-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | Pink · Rose | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C3-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Pink · Rose | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | LightMedium |
| Skin texture / features | Smooth · Freckled (Light) |
| Tattoo | None |
| Face shape | Heart |
| Jaw | Tapered |
| Cheekbone | Defined |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Green |
| Pupil | Round |
| Nose | Upturned |
| Lips | Medium |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | PonytailHigh (exp) |
| Hair colour | LightBrown |
| Ears | ElvenPointed (small) |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | Elf luminosity (reduced, half-elf) |

## C4 · Dame Dava Colth

- **Race overlays:** Human
- **Tier:** RipeningMilf (age lines: ripeningmilf · same on all variants)
- **Source body (reference only):** F-05 Athletic · cup C · own height Tall (176 cm)
- **Notes:** D-15: source lists Average and Tall; read as Tall.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C4-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_ripeningmilf_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_ripeningmilf_176_slim_curvy_D.png` | ✔ |
| 2 | C4-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Tall (176) | `body_f_ripeningmilf_176_bottom_heavy.png` | A–C → **C** | `breast_f_ripeningmilf_176_bottom_heavy_C.png` | ✔ |
| 3 | C4-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Tall (176) | `body_f_ripeningmilf_176_voluptuous.png` | G–I → **I** | `breast_f_ripeningmilf_176_voluptuous_I.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C4-NS | D | Teardrop | Soft | High-Medium | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C4-NB | C | Round | MediumFirm | High-Medium | Puffy (B-C) | Protruding / Flat | LightPink · Pink | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C4-NH | I | Pendulous | Pillowy | High-Medium | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Fair |
| Skin texture / features | Normal · Scarred (Light) |
| Tattoo | None |
| Face shape | Square |
| Jaw | Square |
| Cheekbone | Defined |
| Eyes (shape · size) | DeepSet · Medium |
| Iris colour | Blue |
| Pupil | Round |
| Nose | Straight |
| Lips | Medium |
| Brows (shape · thickness) | Straight · Medium |
| Hair style (ear-fit variant) | BunLow (std) |
| Hair colour | Auburn |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C5a · Variel (disguise)

- **Race overlays:** Human
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-11 HourglassSlim · cup C · own height Average (165 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C5a-NS | Non-petite | Skinny | F-07 SlimCurvy | Average (165) | `body_f_young_165_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_165_slim_curvy_D.png` | ✔ |
| 2 | C5a-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Average (165) | `body_f_young_165_hourglass_curvy.png` | D–E → **E** | `breast_f_young_165_hourglass_curvy_E.png` | ✔ |
| 3 | C5a-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_young_165_bottom_heavy.png` | A–C → **C** | `breast_f_young_165_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C5a-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Pink · Rose | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C5a-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Pink · Rose | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C5a-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | Pink · Rose | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Light |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Amber |
| Pupil | Round |
| Nose | Straight |
| Lips | Medium |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | WavyShoulder (std) |
| Hair colour | LightBrown |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C5b · Variel (true form)

- **Race overlays:** Wings Feathered
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-11 HourglassSlim · cup C–D · own height Tall (176 cm)
- **Notes:** D-17 cup pick; D-14 supernatural tissue check.
- **Supernatural tissue (V-06):** the three breast files below are `breast_f_sup_…` and must be built on demand.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C5b-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Tall (176) | `body_f_young_176_hourglass_curvy.png` | D–E → **E** | `breast_f_sup_176_hourglass_curvy_E.png` | ✔ |
| 2 | C5b-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_young_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_sup_176_slim_curvy_D.png` | ✔ |
| 3 | C5b-NT | Non-petite | Top heavy | F-14 TopHeavy | Tall (176) | `body_f_young_176_top_heavy.png` | F–H → **H** | `breast_f_sup_176_top_heavy_H.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C5b-NH | E | Teardrop | MediumFirm | High (supernatural, no age change) | Protruding (E-F) | Wide / LargeProtruding | Pink · Rose | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C5b-NS | D | Teardrop | MediumFirm | High (supernatural, no age change) | Protruding (D-DD) | Wide / Puffy | Pink · Rose | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C5b-NT | H | Teardrop | MediumFirm | High (supernatural, no age change) | Wide (G-H) | LargeProtruding / Long | Pink · Rose | `nipple_f_top_heavy_wide_G-H_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Light |
| Skin texture / features | VerySmooth |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Gold |
| Pupil | None-Glow |
| Nose | Straight |
| Lips | Medium |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | WavyLong (std) |
| Hair colour | PlatinumBlonde |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | Feathered (folded or deployed) |
| Race body marking | Glow runes |
| Race facial feature | — |
| Gloss profile | Divine |

## C6 · Edwyn Crale

- **Race overlays:** Human
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-06 SlimStraight · cup B · own height Average (165 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C6-NS | Non-petite | Skinny | F-07 SlimCurvy | Average (165) | `body_f_young_165_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_165_slim_curvy_D.png` | ✔ |
| 2 | C6-PS | Petite | Skinny | F-07 SlimCurvy | Short (154) | `body_f_young_154_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_154_slim_curvy_D.png` | ✔ |
| 3 | C6-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_young_165_bottom_heavy.png` | A–C → **C** | `breast_f_young_165_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C6-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C6-PS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C6-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | LightPink · Pink | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Fair |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Round |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Round · Medium |
| Iris colour | Brown |
| Pupil | Round |
| Nose | Button |
| Lips | Medium |
| Brows (shape · thickness) | Rounded · Thin |
| Hair style (ear-fit variant) | Bob (std) |
| Hair colour | DarkBrown |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C7 · Queen Maren II

- **Race overlays:** Human
- **Tier:** MatureMilf (age lines: maturemilf · same on all variants)
- **Source body (reference only):** F-16 FullFigured · cup D · own height Tall (176 cm)
- **Notes:** D-15: source lists Average and Tall; read as Tall.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C7-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Tall (176) | `body_f_maturemilf_176_voluptuous.png` | G–I → **I** | `breast_f_maturemilf_176_voluptuous_I.png` | ✔ |
| 2 | C7-NT | Non-petite | Top heavy | F-14 TopHeavy | Tall (176) | `body_f_maturemilf_176_top_heavy.png` | F–H → **K** *(above sweet spot)* | `breast_f_maturemilf_176_top_heavy_K.png` | ✔ |
| 3 | C7-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Tall (176) | `body_f_maturemilf_176_bottom_heavy.png` | A–C → **E** *(above sweet spot)* | `breast_f_maturemilf_176_bottom_heavy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C7-NH | I | Pendulous | Pillowy | Medium-Low | LargeProtruding (I-K) | Wide / Long | Rose · Peach | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C7-NT | K | Pendulous | Pillowy | Medium-Low | LargeProtruding (I-K) | Wide / Long | Rose · Peach | `nipple_f_top_heavy_largeprotruding_I-K_unaroused.png` |
| C7-NB | E | Sagging | Pillowy | Medium-Low | Protruding (E-F) | Wide / LargeProtruding | Rose · Peach | `nipple_f_bottom_heavy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | MediumTan |
| Skin texture / features | Normal |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Rounded |
| Cheekbone | Defined |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Brown |
| Pupil | Round |
| Nose | Straight |
| Lips | Full |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | BraidCrown (std) |
| Hair colour | DarkBrown |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C8 · Princess Lysa Voss

- **Race overlays:** Human
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-07 SlimCurvy · cup C · own height Average (165 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C8-NS | Non-petite | Skinny | F-07 SlimCurvy | Average (165) | `body_f_young_165_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_165_slim_curvy_D.png` | ✔ |
| 2 | C8-PS | Petite | Skinny | F-07 SlimCurvy | Short (154) | `body_f_young_154_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_154_slim_curvy_D.png` | ✔ |
| 3 | C8-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_young_165_bottom_heavy.png` | A–C → **E** *(above sweet spot)* | `breast_f_young_165_bottom_heavy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C8-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C8-PS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C8-NB | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | LightPink · Pink | `nipple_f_bottom_heavy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Ivory |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Heart |
| Jaw | Tapered |
| Cheekbone | Soft |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Blue |
| Pupil | Round |
| Nose | Button |
| Lips | Medium |
| Brows (shape · thickness) | SoftArch · Thin |
| Hair style (ear-fit variant) | HalfUp (std) |
| Hair colour | Blonde |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C9 · Cass Merrow

- **Race overlays:** Human
- **Tier:** YoungAdult (age lines: youngadult · same on all variants)
- **Source body (reference only):** F-05 Athletic · cup C · own height Average (165 cm)
- **Notes:** D-16 re-tier to YoungAdult.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C9-NS | Non-petite | Skinny | F-07 SlimCurvy | Average (165) | `body_f_youngadult_165_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_youngadult_165_slim_curvy_D.png` | ✔ |
| 2 | C9-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_youngadult_165_bottom_heavy.png` | A–C → **C** | `breast_f_youngadult_165_bottom_heavy_C.png` | ✔ |
| 3 | C9-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Average (165) | `body_f_youngadult_165_hourglass_curvy.png` | D–E → **E** | `breast_f_youngadult_165_hourglass_curvy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C9-NS | D | Teardrop / Round | MediumFirm–Soft | High (−½ step) | Protruding (D-DD) | Wide / Puffy | Brown · DarkBrown · DeepBrown | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C9-NB | C | Round | Firm–MediumFirm | High (−½ step) | Puffy (B-C) | Protruding / Flat | Brown · DarkBrown · DeepBrown | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C9-NH | E | Teardrop | MediumFirm–Soft | High (−½ step) | Protruding (E-F) | Wide / LargeProtruding | Brown · DarkBrown · DeepBrown | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Brown |
| Skin texture / features | Normal · Scarred (Light) |
| Tattoo | None |
| Face shape | Square |
| Jaw | Angular |
| Cheekbone | Defined |
| Eyes (shape · size) | Hooded · Medium |
| Iris colour | DarkBrown |
| Pupil | Round |
| Nose | Straight |
| Lips | Full |
| Brows (shape · thickness) | Straight · Thick |
| Hair style (ear-fit variant) | Cornrows (std) |
| Hair colour | Black |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C10 · Pip

- **Race overlays:** Ear + Tail Bunny
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-02 PetiteSlim · cup B · own height VeryShort (145 cm)
- **Notes:** Source VeryShort/Petite. Adult-proportion check mandatory on every variant.
- **Check:** adult-proportion review (Q10) mandatory on every Pip variant, particularly the petite ones.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C10-PS | Petite | Skinny | F-07 SlimCurvy | VeryShort (145) | `body_f_young_145_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_145_slim_curvy_D.png` | ✔ |
| 2 | C10-PB | Petite | Bottom heavy | F-15 BottomHeavy | VeryShort (145) | `body_f_young_145_bottom_heavy.png` | A–C → **C** | `breast_f_young_145_bottom_heavy_C.png` | ✔ |
| 3 | C10-PH | Petite | Hourglass / voluptuous | F-22 PetiteHourglass | VeryShort (145) | `body_f_young_145_petite_hourglass.png` | B–D → **D** | `breast_f_young_145_petite_hourglass_D.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C10-PS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Pink · Rose | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C10-PB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | Pink · Rose | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C10-PH | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Pink · Rose | `nipple_f_petite_hourglass_protruding_D-DD_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | LightMedium |
| Skin texture / features | Smooth · Freckled (Light) |
| Tattoo | None |
| Face shape | Round |
| Jaw | Pointed |
| Cheekbone | Soft |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Amber |
| Pupil | Round |
| Nose | Button |
| Lips | Medium |
| Brows (shape · thickness) | Rounded · Medium |
| Hair style (ear-fit variant) | Pixie (ani) |
| Hair colour | LightBrown |
| Ears | AnimalBunny |
| Horns | None |
| Tail | Bunny |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C11 · Toma Vey

- **Race overlays:** Human
- **Tier:** YoungAdult (age lines: youngadult · same on all variants)
- **Source body (reference only):** TBD (none given) · cup B · own height BelowAverage (160 cm)
- **Notes:** D-15/D-16.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C11-PH | Petite | Hourglass / voluptuous | F-22 PetiteHourglass | BelowAverage (160) | `body_f_youngadult_160_petite_hourglass.png` | B–D → **D** | `breast_f_youngadult_160_petite_hourglass_D.png` | ✔ |
| 2 | C11-PB | Petite | Bottom heavy | F-15 BottomHeavy | BelowAverage (160) | `body_f_youngadult_160_bottom_heavy.png` | A–C → **C** | `breast_f_youngadult_160_bottom_heavy_C.png` | ✔ |
| 3 | C11-NS | Non-petite | Skinny | F-07 SlimCurvy | Average (165) | `body_f_youngadult_165_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_youngadult_165_slim_curvy_D.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C11-PH | D | Teardrop / Round | MediumFirm–Soft | High (−½ step) | Protruding (D-DD) | Wide / Puffy | Peach · Tan | `nipple_f_petite_hourglass_protruding_D-DD_unaroused.png` |
| C11-PB | C | Round | Firm–MediumFirm | High (−½ step) | Puffy (B-C) | Protruding / Flat | Peach · Tan | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C11-NS | D | Teardrop / Round | MediumFirm–Soft | High (−½ step) | Protruding (D-DD) | Wide / Puffy | Peach · Tan | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Tan |
| Skin texture / features | Normal |
| Tattoo | None |
| Face shape | Diamond |
| Jaw | Angular |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Hooded · Medium |
| Iris colour | Grey |
| Pupil | Round |
| Nose | Aquiline |
| Lips | Wide |
| Brows (shape · thickness) | Angular · Medium |
| Hair style (ear-fit variant) | Shag (std) |
| Hair colour | Black |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C12 · Elowen Ashbark

- **Race overlays:** Ear ElvenPointed
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-05 Athletic · cup B · own height Average (165 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C12-NS | Non-petite | Skinny | F-06 SlimStraight | Average (165) | `body_f_young_165_slim_straight.png` | A–B → **B** | `breast_f_young_165_slim_straight_B.png` | ✔ |
| 2 | C12-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_young_165_bottom_heavy.png` | A–C → **C** | `breast_f_young_165_bottom_heavy_C.png` | ✔ |
| 3 | C12-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Average (165) | `body_f_young_165_hourglass_curvy.png` | D–E → **E** | `breast_f_young_165_hourglass_curvy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C12-NS | B | Perky / Round | Firm | High | Puffy (B-C) | Protruding / Flat | Peach · Tan | `nipple_f_slim_straight_puffy_B-C_unaroused.png` |
| C12-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | Peach · Tan | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C12-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Peach · Tan | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Olive |
| Skin texture / features | Smooth · Freckled (Light) |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Tapered |
| Cheekbone | Defined |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Green |
| Pupil | Round |
| Nose | Straight |
| Lips | Medium |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | BraidSingle (exp) |
| Hair colour | Auburn |
| Ears | ElvenPointed |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | Elf luminosity |

## C13 · Queen Ilvariel

- **Race overlays:** Ear HighElvenLong
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-04 Willowy · cup B–C · own height Tall (176 cm)
- **Notes:** D-17 cup pick. 900 yr, apparent Young.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C13-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Tall (176) | `body_f_young_176_voluptuous.png` | G–I → **I** | `breast_f_young_176_voluptuous_I.png` | ✔ |
| 2 | C13-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_young_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_176_slim_curvy_D.png` | ✔ |
| 3 | C13-NT | Non-petite | Top heavy | F-14 TopHeavy | Tall (176) | `body_f_young_176_top_heavy.png` | F–H → **K** *(above sweet spot)* | `breast_f_young_176_top_heavy_K.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C13-NH | I | Wide / Pendulous | VerySoft | High | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C13-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C13-NT | K | Wide / Pendulous | VerySoft | High | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_top_heavy_largeprotruding_I-K_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Porcelain |
| Skin texture / features | VerySmooth |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Pointed |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Gold |
| Pupil | Round |
| Nose | LongNarrow |
| Lips | Medium |
| Brows (shape · thickness) | HighArch · Thin |
| Hair style (ear-fit variant) | WaistLength (exp) |
| Hair colour | PlatinumBlonde |
| Ears | HighElvenLong |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | Elf luminosity |

## C14 · Sylvaris Orenn

- **Race overlays:** Ear HighElvenLong
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-04 Willowy · cup B · own height Tall (176 cm)
- **Notes:** 1100 yr, apparent Young.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C14-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_young_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_176_slim_curvy_D.png` | ✔ |
| 2 | C14-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Tall (176) | `body_f_young_176_voluptuous.png` | G–I → **I** | `breast_f_young_176_voluptuous_I.png` | ✔ |
| 3 | C14-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Tall (176) | `body_f_young_176_bottom_heavy.png` | A–C → **C** | `breast_f_young_176_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C14-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C14-NH | I | Wide / Pendulous | VerySoft | High | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C14-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | LightPink · Pink | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Ivory |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Oblong |
| Jaw | Pointed |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Upturned · Medium |
| Iris colour | Silver |
| Pupil | Round |
| Nose | LongNarrow |
| Lips | Thin |
| Brows (shape · thickness) | Straight · Thin |
| Hair style (ear-fit variant) | BunLow (exp) |
| Hair colour | White |
| Ears | HighElvenLong |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | Elf luminosity |

## C15 · Sigrun Stonescribe

- **Race overlays:** — (race not stated)
- **Tier:** RipeningMilf (age lines: ripeningmilf · same on all variants)
- **Source body (reference only):** F-24 CompactPower · cup D · own height VeryShort (145 cm)
- **Notes:** Source VeryShort/Petite. Race overlay not stated.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C15-PB | Petite | Bottom heavy | F-15 BottomHeavy | VeryShort (145) | `body_f_ripeningmilf_145_bottom_heavy.png` | A–C → **C** | `breast_f_ripeningmilf_145_bottom_heavy_C.png` | ✔ |
| 2 | C15-PH | Petite | Hourglass / voluptuous | F-22 PetiteHourglass | VeryShort (145) | `body_f_ripeningmilf_145_petite_hourglass.png` | B–D → **D** | `breast_f_ripeningmilf_145_petite_hourglass_D.png` | ✔ |
| 3 | C15-PT | Petite | Top heavy | F-14 TopHeavy | VeryShort (145) | `body_f_ripeningmilf_145_top_heavy.png` | F–H → **H** | `breast_f_ripeningmilf_145_top_heavy_H.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C15-PB | C | Round | MediumFirm | High-Medium | Puffy (B-C) | Protruding / Flat | Pink · Rose | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C15-PH | D | Teardrop | Soft | High-Medium | Protruding (D-DD) | Wide / Puffy | Pink · Rose | `nipple_f_petite_hourglass_protruding_D-DD_unaroused.png` |
| C15-PT | H | Pendulous | VerySoft | High-Medium | Wide (G-H) | LargeProtruding / Long | Pink · Rose | `nipple_f_top_heavy_wide_G-H_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | LightMedium |
| Skin texture / features | Normal |
| Tattoo | Clan marks (Minimal, arm/shoulder; proposed) |
| Face shape | Square |
| Jaw | Square |
| Cheekbone | Defined |
| Eyes (shape · size) | DeepSet · Medium |
| Iris colour | DarkBrown |
| Pupil | Round |
| Nose | Wide |
| Lips | Medium |
| Brows (shape · thickness) | Straight · Thick |
| Hair style (ear-fit variant) | BraidCrown (std) |
| Hair colour | Ginger |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | Clan marks (tattoo system) |
| Race facial feature | — |
| Gloss profile | — |

## C16 · Garet

- **Race overlays:** Human
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-21 MuscularFeminine · cup C · own height AboveAverage (170 cm)
- **Muscular set:** top heavy slot = Muscular Feminine, hourglass slot = Compact Power, bottom heavy slot = Athletic Curvy.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C16-NT | Non-petite | Top heavy | F-21 MuscularFeminine | AboveAverage (170) | `body_f_young_170_muscular_feminine.png` | B–D → **D** | `breast_f_young_170_muscular_feminine_D.png` | ✔ |
| 2 | C16-NH | Non-petite | Hourglass / voluptuous | F-24 CompactPower | AboveAverage (170) | `body_f_young_170_compact_power.png` | D–E → **E** | `breast_f_young_170_compact_power_E.png` | ✔ |
| 3 | C16-NB | Non-petite | Bottom heavy | F-20 AthleticCurvy | AboveAverage (170) | `body_f_young_170_athletic_curvy.png` | C–E → **E** | `breast_f_young_170_athletic_curvy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C16-NT | D | Round / Teardrop | Firm (+1 firm type) | High | Protruding (D-DD) | Wide / Puffy | Peach · Tan | `nipple_f_muscular_feminine_protruding_D-DD_unaroused.png` |
| C16-NH | E | Round / Teardrop | Firm (+1 firm type) | High | Protruding (E-F) | Wide / LargeProtruding | Peach · Tan | `nipple_f_compact_power_protruding_E-F_unaroused.png` |
| C16-NB | E | Round / Teardrop | Firm (+1 firm type) | High | Protruding (E-F) | Wide / LargeProtruding | Peach · Tan | `nipple_f_athletic_curvy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Tan |
| Skin texture / features | Normal · Scarred (Light) |
| Tattoo | Minimal clan mark (proposed) |
| Face shape | Square |
| Jaw | Square |
| Cheekbone | Defined |
| Eyes (shape · size) | Hooded · Medium |
| Iris colour | Brown |
| Pupil | Round |
| Nose | Straight |
| Lips | Full |
| Brows (shape · thickness) | Flat · Thick |
| Hair style (ear-fit variant) | BraidSingle (std) |
| Hair colour | DarkBrown |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C17 · Vael Stoneback

- **Race overlays:** Wolf: ears + tail + markings
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-05 Athletic · cup C · own height AboveAverage (170 cm)
- **Notes:** Source says 'patches'; catalog wolf marking is the fur collar.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C17-NS | Non-petite | Skinny | F-07 SlimCurvy | AboveAverage (170) | `body_f_young_170_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_170_slim_curvy_D.png` | ✔ |
| 2 | C17-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | AboveAverage (170) | `body_f_young_170_hourglass_curvy.png` | D–E → **E** | `breast_f_young_170_hourglass_curvy_E.png` | ✔ |
| 3 | C17-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | AboveAverage (170) | `body_f_young_170_bottom_heavy.png` | A–C → **C** | `breast_f_young_170_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C17-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Peach · Tan | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C17-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Peach · Tan | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C17-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | Peach · Tan | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Tan |
| Skin texture / features | Normal |
| Tattoo | None |
| Face shape | Triangle |
| Jaw | Angular |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Upturned · Medium |
| Iris colour | Amber |
| Pupil | Round |
| Nose | Straight |
| Lips | Wide |
| Brows (shape · thickness) | Angular · Medium |
| Hair style (ear-fit variant) | WildMane (ani) |
| Hair colour | Grey |
| Ears | AnimalWolf |
| Horns | None |
| Tail | Wolf |
| Wings | — |
| Race body marking | Wolf fur collar |
| Race facial feature | — |
| Gloss profile | — |

## C18 · Kiri Brightbrush

- **Race overlays:** Fox: ears + tail + fur patches
- **Tier:** RipeningMilf (age lines: ripeningmilf · same on all variants)
- **Source body (reference only):** F-07 SlimCurvy · cup C · own height Average (165 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C18-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Average (165) | `body_f_ripeningmilf_165_voluptuous.png` | G–I → **I** | `breast_f_ripeningmilf_165_voluptuous_I.png` | ✔ |
| 2 | C18-NT | Non-petite | Top heavy | F-14 TopHeavy | Average (165) | `body_f_ripeningmilf_165_top_heavy.png` | F–H → **K** *(above sweet spot)* | `breast_f_ripeningmilf_165_top_heavy_K.png` | ✔ |
| 3 | C18-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_ripeningmilf_165_bottom_heavy.png` | A–C → **E** *(above sweet spot)* | `breast_f_ripeningmilf_165_bottom_heavy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C18-NH | I | Pendulous | Pillowy | High-Medium | LargeProtruding (I-K) | Wide / Long | Pink · Rose | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C18-NT | K | Pendulous | Pillowy | High-Medium | LargeProtruding (I-K) | Wide / Long | Pink · Rose | `nipple_f_top_heavy_largeprotruding_I-K_unaroused.png` |
| C18-NB | E | Wide-Teardrop | Soft | High-Medium | Protruding (E-F) | Wide / LargeProtruding | Pink · Rose | `nipple_f_bottom_heavy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Light |
| Skin texture / features | Normal · Freckled (Light) |
| Tattoo | None |
| Face shape | Heart |
| Jaw | Pointed |
| Cheekbone | Defined |
| Eyes (shape · size) | Upturned · Medium |
| Iris colour | Amber |
| Pupil | Round |
| Nose | Upturned |
| Lips | Cupid |
| Brows (shape · thickness) | HighArch · Medium |
| Hair style (ear-fit variant) | LayeredShoulder (ani) |
| Hair colour | Ginger |
| Ears | AnimalFox |
| Horns | None |
| Tail | Fox |
| Wings | — |
| Race body marking | Fox fur patches |
| Race facial feature | — |
| Gloss profile | — |

## C18a · Rina Brightbrush

- **Race overlays:** Fox: ears + tail + fur patches
- **Tier:** MatureMilf (age lines: maturemilf · same on all variants)
- **Source body (reference only):** F-07 SlimCurvy · cup C–D · own height Average (165 cm)
- **Notes:** D-17 cup pick.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C18a-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Average (165) | `body_f_maturemilf_165_voluptuous.png` | G–I → **H** | `breast_f_maturemilf_165_voluptuous_H.png` | ✔ |
| 2 | C18a-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_maturemilf_165_bottom_heavy.png` | A–C → **D** *(above sweet spot)* | `breast_f_maturemilf_165_bottom_heavy_D.png` | ✔ |
| 3 | C18a-NS | Non-petite | Skinny | F-07 SlimCurvy | Average (165) | `body_f_maturemilf_165_slim_curvy.png` | C → **C** | `breast_f_maturemilf_165_slim_curvy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C18a-NH | H | Pendulous | Pillowy | Medium-Low | Wide (G-H) | LargeProtruding / Long | Pink · Rose | `nipple_f_voluptuous_wide_G-H_unaroused.png` |
| C18a-NB | D | Teardrop-Wide | VerySoft | Medium-Low | Protruding (D-DD) | Wide / Puffy | Pink · Rose | `nipple_f_bottom_heavy_protruding_D-DD_unaroused.png` |
| C18a-NS | C | Teardrop | Soft | Medium-Low | Puffy (B-C) | Protruding / Flat | Pink · Rose | `nipple_f_slim_curvy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Light |
| Skin texture / features | Normal · Freckled (Light) |
| Tattoo | None |
| Face shape | Heart |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Downturned · Medium |
| Iris colour | Amber |
| Pupil | Round |
| Nose | Upturned |
| Lips | Medium |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | BunLow (ani) |
| Hair colour | Auburn |
| Ears | AnimalFox |
| Horns | None |
| Tail | Fox |
| Wings | — |
| Race body marking | Fox fur patches |
| Race facial feature | — |
| Gloss profile | — |

## C19 · Ashkora Emberscale

- **Race overlays:** Horn DragonCurved + Tail Dragon + Scale patches
- **Tier:** MatureMilf (age lines: maturemilf · same on all variants)
- **Source body (reference only):** F-20 AthleticCurvy · cup D · own height Tall (176 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C19-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Tall (176) | `body_f_maturemilf_176_voluptuous.png` | G–I → **I** | `breast_f_maturemilf_176_voluptuous_I.png` | ✔ |
| 2 | C19-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Tall (176) | `body_f_maturemilf_176_bottom_heavy.png` | A–C → **E** *(above sweet spot)* | `breast_f_maturemilf_176_bottom_heavy_E.png` | ✔ |
| 3 | C19-NT | Non-petite | Top heavy | F-14 TopHeavy | Tall (176) | `body_f_maturemilf_176_top_heavy.png` | F–H → **K** *(above sweet spot)* | `breast_f_maturemilf_176_top_heavy_K.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C19-NH | I | Pendulous | Pillowy | Medium-Low | LargeProtruding (I-K) | Wide / Long | Peach · Tan | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C19-NB | E | Sagging | Pillowy | Medium-Low | Protruding (E-F) | Wide / LargeProtruding | Peach · Tan | `nipple_f_bottom_heavy_protruding_E-F_unaroused.png` |
| C19-NT | K | Pendulous | Pillowy | Medium-Low | LargeProtruding (I-K) | Wide / Long | Peach · Tan | `nipple_f_top_heavy_largeprotruding_I-K_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Ruddy |
| Skin texture / features | Normal |
| Tattoo | None |
| Face shape | Diamond |
| Jaw | Angular |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Gold |
| Pupil | Slit |
| Nose | Straight |
| Lips | Thin |
| Brows (shape · thickness) | Angular · Medium |
| Hair style (ear-fit variant) | WaistLength (exp) |
| Hair colour | Crimson |
| Ears | DragonRidge |
| Horns | DragonCurved |
| Tail | Dragon |
| Wings | — |
| Race body marking | Scale patches |
| Race facial feature | FaceScales |
| Gloss profile | — |

## C19a · Kessa Emberscale

- **Race overlays:** Horn DragonCurved + Tail Dragon + Scale patches
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-20 AthleticCurvy · cup C · own height Tall (176 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C19a-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_young_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_176_slim_curvy_D.png` | ✔ |
| 2 | C19a-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Tall (176) | `body_f_young_176_hourglass_curvy.png` | D–E → **E** | `breast_f_young_176_hourglass_curvy_E.png` | ✔ |
| 3 | C19a-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Tall (176) | `body_f_young_176_bottom_heavy.png` | A–C → **C** | `breast_f_young_176_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C19a-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Peach · Tan | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C19a-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Peach · Tan | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C19a-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | Peach · Tan | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Ruddy |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Tapered |
| Cheekbone | Defined |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Amber |
| Pupil | Slit |
| Nose | Straight |
| Lips | Medium |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | WavyShoulder (exp) |
| Hair colour | Crimson |
| Ears | DragonRidge |
| Horns | DragonCurved |
| Tail | Dragon |
| Wings | — |
| Race body marking | Scale patches |
| Race facial feature | FaceScales |
| Gloss profile | — |

## C20 · Velara Ash

- **Race overlays:** Ear Demonic + Horn CurvedRam + Tail Demon
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-05 Athletic · cup C–D · own height AboveAverage (170 cm)
- **Notes:** D-17 cup pick.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C20-NS | Non-petite | Skinny | F-07 SlimCurvy | AboveAverage (170) | `body_f_young_170_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_170_slim_curvy_D.png` | ✔ |
| 2 | C20-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | AboveAverage (170) | `body_f_young_170_hourglass_curvy.png` | D–E → **E** | `breast_f_young_170_hourglass_curvy_E.png` | ✔ |
| 3 | C20-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | AboveAverage (170) | `body_f_young_170_bottom_heavy.png` | A–C → **C** | `breast_f_young_170_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C20-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Brown | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C20-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Brown | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C20-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | Brown | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Crimson |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Diamond |
| Jaw | Angular |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Red |
| Pupil | Slit |
| Nose | Straight |
| Lips | Thin |
| Brows (shape · thickness) | Angular · Thin |
| Hair style (ear-fit variant) | PonytailHigh (exp) |
| Hair colour | Black |
| Ears | Demonic |
| Horns | CurvedRam |
| Tail | Demon |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C20a · Sera Ash

- **Race overlays:** Ear Demonic + Horn SmallNubs + Tail Demon
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-07 SlimCurvy · cup C · own height AboveAverage (170 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C20a-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | AboveAverage (170) | `body_f_young_170_hourglass_curvy.png` | D–E → **E** | `breast_f_young_170_hourglass_curvy_E.png` | ✔ |
| 2 | C20a-NS | Non-petite | Skinny | F-07 SlimCurvy | AboveAverage (170) | `body_f_young_170_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_170_slim_curvy_D.png` | ✔ |
| 3 | C20a-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | AboveAverage (170) | `body_f_young_170_bottom_heavy.png` | A–C → **C** | `breast_f_young_170_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C20a-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Brown | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C20a-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Brown | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C20a-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | Brown | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Crimson |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Heart |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Round · Medium |
| Iris colour | Gold |
| Pupil | Round |
| Nose | Button |
| Lips | Medium |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | WavyShoulder (exp) |
| Hair colour | Black |
| Ears | Demonic |
| Horns | SmallNubs |
| Tail | Demon |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C21 · Iskara Thorne

- **Race overlays:** Ear Demonic + Horn DevilForked + Tail Devil
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-07 SlimCurvy · cup C · own height Tall (176 cm)
- **Notes:** 300 yr, apparent Young.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C21-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_young_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_176_slim_curvy_D.png` | ✔ |
| 2 | C21-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Tall (176) | `body_f_young_176_hourglass_curvy.png` | D–E → **E** | `breast_f_young_176_hourglass_curvy_E.png` | ✔ |
| 3 | C21-NT | Non-petite | Top heavy | F-14 TopHeavy | Tall (176) | `body_f_young_176_top_heavy.png` | F–H → **H** | `breast_f_young_176_top_heavy_H.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C21-NS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Peach · Tan | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C21-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Peach · Tan | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C21-NT | H | Wide / Pendulous | Soft | High | Wide (G-H) | LargeProtruding / Long | Peach · Tan | `nipple_f_top_heavy_wide_G-H_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Ruddy |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Oblong |
| Jaw | Pointed |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Hooded · Medium |
| Iris colour | Gold |
| Pupil | Slit |
| Nose | LongNarrow |
| Lips | Thin |
| Brows (shape · thickness) | HighArch · Thin |
| Hair style (ear-fit variant) | Bob (exp) |
| Hair colour | Black |
| Ears | Demonic |
| Horns | DevilForked |
| Tail | Devil |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C22 · Velindra Lysmere

- **Race overlays:** Ear Demonic + Horn SmallNubs + Wing Bat + Tail Devil
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-13 HourglassFullBust · cup E · own height AboveAverage (170 cm)
- **Notes:** D-14 supernatural tissue check.
- **Supernatural tissue (V-06):** the three breast files below are `breast_f_sup_…` and must be built on demand.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C22-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | AboveAverage (170) | `body_f_young_170_voluptuous.png` | G–I → **I** | `breast_f_sup_170_voluptuous_I.png` | ✔ |
| 2 | C22-NT | Non-petite | Top heavy | F-14 TopHeavy | AboveAverage (170) | `body_f_young_170_top_heavy.png` | F–H → **K** *(above sweet spot)* | `breast_f_sup_170_top_heavy_K.png` | ✔ |
| 3 | C22-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | AboveAverage (170) | `body_f_young_170_bottom_heavy.png` | A–C → **E** *(above sweet spot)* | `breast_f_sup_170_bottom_heavy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C22-NH | I | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C22-NT | K | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_top_heavy_largeprotruding_I-K_unaroused.png` |
| C22-NB | E | Teardrop | MediumFirm | High (supernatural, no age change) | Protruding (E-F) | Wide / LargeProtruding | LightPink · Pink | `nipple_f_bottom_heavy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Fair |
| Skin texture / features | VerySmooth |
| Tattoo | None |
| Face shape | Heart |
| Jaw | Tapered |
| Cheekbone | Soft |
| Eyes (shape · size) | Upturned · Medium |
| Iris colour | Violet |
| Pupil | Round |
| Nose | Upturned |
| Lips | Full |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | WavyLong (exp) |
| Hair colour | Purple |
| Ears | Demonic |
| Horns | SmallNubs |
| Tail | Devil |
| Wings | Bat (folded or deployed) |
| Race body marking | — |
| Race facial feature | FangsSmall |
| Gloss profile | Succubus |

## C22a · Lady Velura Lysmere

- **Race overlays:** Same overlays as C22
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-13 HourglassFullBust · cup F · own height Tall (176 cm)
- **Notes:** 220 yr, apparent Young. D-14 check.
- **Supernatural tissue (V-06):** the three breast files below are `breast_f_sup_…` and must be built on demand.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C22a-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Tall (176) | `body_f_young_176_voluptuous.png` | G–I → **I** | `breast_f_sup_176_voluptuous_I.png` | ✔ |
| 2 | C22a-NT | Non-petite | Top heavy | F-14 TopHeavy | Tall (176) | `body_f_young_176_top_heavy.png` | F–H → **K** *(above sweet spot)* | `breast_f_sup_176_top_heavy_K.png` | ✔ |
| 3 | C22a-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_young_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_sup_176_slim_curvy_D.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C22a-NH | I | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C22a-NT | K | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_top_heavy_largeprotruding_I-K_unaroused.png` |
| C22a-NS | D | Teardrop | MediumFirm | High (supernatural, no age change) | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Ivory |
| Skin texture / features | VerySmooth |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Tapered |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Violet |
| Pupil | Round |
| Nose | Straight |
| Lips | Full |
| Brows (shape · thickness) | HighArch · Medium |
| Hair style (ear-fit variant) | LayeredLong (exp) |
| Hair colour | AshLavender |
| Ears | Demonic |
| Horns | SmallNubs |
| Tail | Devil |
| Wings | Bat (folded or deployed) |
| Race body marking | — |
| Race facial feature | FangsSmall |
| Gloss profile | Succubus |

## C23 · Evara Nighthollow

- **Race overlays:** Human
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-11 HourglassSlim · cup C · own height Average (165 cm)
- **Notes:** 'Young (appears)'.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C23-NS | Non-petite | Skinny | F-06 SlimStraight | Average (165) | `body_f_young_165_slim_straight.png` | A–B → **C** *(above sweet spot)* | `breast_f_young_165_slim_straight_C.png` | ✔ |
| 2 | C23-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Average (165) | `body_f_young_165_voluptuous.png` | G–I → **I** | `breast_f_young_165_voluptuous_I.png` | ✔ |
| 3 | C23-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_young_165_bottom_heavy.png` | A–C → **E** *(above sweet spot)* | `breast_f_young_165_bottom_heavy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C23-NS | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | LightPink · Pink | `nipple_f_slim_straight_puffy_B-C_unaroused.png` |
| C23-NH | I | Wide / Pendulous | VerySoft | High | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C23-NB | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | LightPink · Pink | `nipple_f_bottom_heavy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Porcelain |
| Skin texture / features | VerySmooth |
| Tattoo | None |
| Face shape | Oblong |
| Jaw | Angular |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Hooded · Medium |
| Iris colour | Red |
| Pupil | Round |
| Nose | LongNarrow |
| Lips | Thin |
| Brows (shape · thickness) | Flat · Thin |
| Hair style (ear-fit variant) | StraightLong (std) |
| Hair colour | Black |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | FangsLong |
| Gloss profile | Vampire |

## C24 · Sister Ezan

- **Race overlays:** Human
- **Tier:** YoungAdult (age lines: youngadult · same on all variants)
- **Source body (reference only):** TBD (none given) · cup C · own height Average (165 cm)
- **Notes:** D-15/D-16.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C24-NS | Non-petite | Skinny | F-07 SlimCurvy | Average (165) | `body_f_youngadult_165_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_youngadult_165_slim_curvy_D.png` | ✔ |
| 2 | C24-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_youngadult_165_bottom_heavy.png` | A–C → **C** | `breast_f_youngadult_165_bottom_heavy_C.png` | ✔ |
| 3 | C24-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Average (165) | `body_f_youngadult_165_hourglass_curvy.png` | D–E → **E** | `breast_f_youngadult_165_hourglass_curvy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C24-NS | D | Teardrop / Round | MediumFirm–Soft | High (−½ step) | Protruding (D-DD) | Wide / Puffy | Rose · Peach | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C24-NB | C | Round | Firm–MediumFirm | High (−½ step) | Puffy (B-C) | Protruding / Flat | Rose · Peach | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C24-NH | E | Teardrop | MediumFirm–Soft | High (−½ step) | Protruding (E-F) | Wide / LargeProtruding | Rose · Peach | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Medium |
| Skin texture / features | Normal |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Brown |
| Pupil | Round |
| Nose | Straight |
| Lips | Medium |
| Brows (shape · thickness) | Rounded · Medium |
| Hair style (ear-fit variant) | Crop (std) |
| Hair colour | DarkBrown |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C25 · Ushara Ashfang

- **Race overlays:** Human (tusks on face card)
- **Tier:** MatureMilf (age lines: maturemilf · same on all variants)
- **Source body (reference only):** F-21 MuscularFeminine · cup E · own height VeryTall (183 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C25-NT | Non-petite | Top heavy | F-14 TopHeavy | VeryTall (183) | `body_f_maturemilf_183_top_heavy.png` | F–H → **K** *(above sweet spot)* | `breast_f_maturemilf_183_top_heavy_K.png` | ✔ |
| 2 | C25-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | VeryTall (183) | `body_f_maturemilf_183_voluptuous.png` | G–I → **I** | `breast_f_maturemilf_183_voluptuous_I.png` | ✔ |
| 3 | C25-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | VeryTall (183) | `body_f_maturemilf_183_bottom_heavy.png` | A–C → **E** *(above sweet spot)* | `breast_f_maturemilf_183_bottom_heavy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C25-NT | K | Pendulous | Pillowy | Medium-Low | LargeProtruding (I-K) | Wide / Long | Peach · Tan | `nipple_f_top_heavy_largeprotruding_I-K_unaroused.png` |
| C25-NH | I | Pendulous | Pillowy | Medium-Low | LargeProtruding (I-K) | Wide / Long | Peach · Tan | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C25-NB | E | Sagging | Pillowy | Medium-Low | Protruding (E-F) | Wide / LargeProtruding | Peach · Tan | `nipple_f_bottom_heavy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Olive |
| Skin texture / features | Rough · Scarred (Light) |
| Tattoo | None (war marks on the face card are optional, proposed) |
| Face shape | Square |
| Jaw | Square |
| Cheekbone | HighProminent |
| Eyes (shape · size) | DeepSet · Medium |
| Iris colour | Amber |
| Pupil | Round |
| Nose | Wide |
| Lips | Wide |
| Brows (shape · thickness) | Flat · Thick |
| Hair style (ear-fit variant) | BraidCrown (std) |
| Hair colour | Grey |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | TusksLarge |
| Gloss profile | — |

## C26 · Ceira Blackthorn

- **Race overlays:** Human
- **Tier:** YoungAdult (age lines: youngadult · same on all variants)
- **Source body (reference only):** F-21 MuscularFeminine · cup C · own height Average (165 cm)
- **Notes:** D-16 re-tier to YoungAdult.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C26-NS | Non-petite | Skinny | F-07 SlimCurvy | Average (165) | `body_f_youngadult_165_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_youngadult_165_slim_curvy_D.png` | ✔ |
| 2 | C26-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_youngadult_165_bottom_heavy.png` | A–C → **C** | `breast_f_youngadult_165_bottom_heavy_C.png` | ✔ |
| 3 | C26-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Average (165) | `body_f_youngadult_165_hourglass_curvy.png` | D–E → **E** | `breast_f_youngadult_165_hourglass_curvy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C26-NS | D | Teardrop / Round | MediumFirm–Soft | High (−½ step) | Protruding (D-DD) | Wide / Puffy | Pink · Rose | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C26-NB | C | Round | Firm–MediumFirm | High (−½ step) | Puffy (B-C) | Protruding / Flat | Pink · Rose | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C26-NH | E | Teardrop | MediumFirm–Soft | High (−½ step) | Protruding (E-F) | Wide / LargeProtruding | Pink · Rose | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Light |
| Skin texture / features | Normal · Scarred (Light) |
| Tattoo | None |
| Face shape | Square |
| Jaw | Angular |
| Cheekbone | Defined |
| Eyes (shape · size) | Hooded · Medium |
| Iris colour | Blue |
| Pupil | Round |
| Nose | Straight |
| Lips | Medium |
| Brows (shape · thickness) | Straight · Medium |
| Hair style (ear-fit variant) | Undercut (std) |
| Hair colour | Black |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C27 · Nessa Solstave

- **Race overlays:** Human
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-07 SlimCurvy · cup C · own height BelowAverage (160 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C27-PH | Petite | Hourglass / voluptuous | F-22 PetiteHourglass | BelowAverage (160) | `body_f_young_160_petite_hourglass.png` | B–D → **D** | `breast_f_young_160_petite_hourglass_D.png` | ✔ |
| 2 | C27-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Average (165) | `body_f_young_165_hourglass_curvy.png` | D–E → **E** | `breast_f_young_165_hourglass_curvy_E.png` | ✔ |
| 3 | C27-PS | Petite | Skinny | F-07 SlimCurvy | BelowAverage (160) | `body_f_young_160_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_young_160_slim_curvy_D.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C27-PH | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Rose · Peach | `nipple_f_petite_hourglass_protruding_D-DD_unaroused.png` |
| C27-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Rose · Peach | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C27-PS | D | Round / Teardrop | MediumFirm | High | Protruding (D-DD) | Wide / Puffy | Rose · Peach | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Medium |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Round |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Round · Medium |
| Iris colour | Brown |
| Pupil | Round |
| Nose | Button |
| Lips | Full |
| Brows (shape · thickness) | Rounded · Medium |
| Hair style (ear-fit variant) | CurlyShoulder (std) |
| Hair colour | Brown |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C28 · Maea Hollowtide

- **Race overlays:** Human
- **Tier:** MatureMilf (age lines: maturemilf · same on all variants)
- **Source body (reference only):** F-16 FullFigured · cup D · own height Average (165 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C28-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Average (165) | `body_f_maturemilf_165_voluptuous.png` | G–I → **H** | `breast_f_maturemilf_165_voluptuous_H.png` | ✔ |
| 2 | C28-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_maturemilf_165_bottom_heavy.png` | A–C → **D** *(above sweet spot)* | `breast_f_maturemilf_165_bottom_heavy_D.png` | ✔ |
| 3 | C28-NT | Non-petite | Top heavy | F-14 TopHeavy | Average (165) | `body_f_maturemilf_165_top_heavy.png` | F–H → **I** *(above sweet spot)* | `breast_f_maturemilf_165_top_heavy_I.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C28-NH | H | Pendulous | Pillowy | Medium-Low | Wide (G-H) | LargeProtruding / Long | Pink · Rose | `nipple_f_voluptuous_wide_G-H_unaroused.png` |
| C28-NB | D | Teardrop-Wide | VerySoft | Medium-Low | Protruding (D-DD) | Wide / Puffy | Pink · Rose | `nipple_f_bottom_heavy_protruding_D-DD_unaroused.png` |
| C28-NT | I | Pendulous | Pillowy | Medium-Low | LargeProtruding (I-K) | Wide / Long | Pink · Rose | `nipple_f_top_heavy_largeprotruding_I-K_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Light |
| Skin texture / features | Normal-Rough |
| Tattoo | None |
| Face shape | Round |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Downturned · Medium |
| Iris colour | Brown |
| Pupil | Round |
| Nose | Straight |
| Lips | Full |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | BunLow (std) |
| Hair colour | Brown |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C29 · Cella Hollowtide

- **Race overlays:** Human
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** TBD (source: 'Average/Soft') · cup C · own height Average (165 cm)
- **Notes:** D-15: body type unresolved.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C29-NH | Non-petite | Hourglass / voluptuous | F-12 HourglassCurvy | Average (165) | `body_f_young_165_hourglass_curvy.png` | D–E → **E** | `breast_f_young_165_hourglass_curvy_E.png` | ✔ |
| 2 | C29-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_young_165_bottom_heavy.png` | A–C → **C** | `breast_f_young_165_bottom_heavy_C.png` | ✔ |
| 3 | C29-NT | Non-petite | Top heavy | F-14 TopHeavy | Average (165) | `body_f_young_165_top_heavy.png` | F–H → **H** | `breast_f_young_165_top_heavy_H.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C29-NH | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Pink · Rose | `nipple_f_hourglass_curvy_protruding_E-F_unaroused.png` |
| C29-NB | C | Round / Perky | Firm | High | Puffy (B-C) | Protruding / Flat | Pink · Rose | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C29-NT | H | Wide / Pendulous | Soft | High | Wide (G-H) | LargeProtruding / Long | Pink · Rose | `nipple_f_top_heavy_wide_G-H_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | LightMedium |
| Skin texture / features | Smooth · Freckled (Light) |
| Tattoo | None |
| Face shape | Round |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Round · Medium |
| Iris colour | Hazel |
| Pupil | Round |
| Nose | Button |
| Lips | Medium |
| Brows (shape · thickness) | Rounded · Medium |
| Hair style (ear-fit variant) | PonytailLow (std) |
| Hair colour | LightBrown |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C30 · Senna Hollowtide

- **Race overlays:** Human
- **Tier:** Young (age lines: none · same on all variants)
- **Source body (reference only):** F-13 HourglassFullBust · cup E · own height Average (165 cm)

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C30-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Average (165) | `body_f_young_165_voluptuous.png` | G–I → **I** | `breast_f_young_165_voluptuous_I.png` | ✔ |
| 2 | C30-NT | Non-petite | Top heavy | F-14 TopHeavy | Average (165) | `body_f_young_165_top_heavy.png` | F–H → **K** *(above sweet spot)* | `breast_f_young_165_top_heavy_K.png` | ✔ |
| 3 | C30-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_young_165_bottom_heavy.png` | A–C → **E** *(above sweet spot)* | `breast_f_young_165_bottom_heavy_E.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C30-NH | I | Wide / Pendulous | VerySoft | High | LargeProtruding (I-K) | Wide / Long | Pink · Rose | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C30-NT | K | Wide / Pendulous | VerySoft | High | LargeProtruding (I-K) | Wide / Long | Pink · Rose | `nipple_f_top_heavy_largeprotruding_I-K_unaroused.png` |
| C30-NB | E | Round / Teardrop | MediumFirm | High | Protruding (E-F) | Wide / LargeProtruding | Pink · Rose | `nipple_f_bottom_heavy_protruding_E-F_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Light |
| Skin texture / features | Smooth |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Grey |
| Pupil | Round |
| Nose | Straight |
| Lips | Medium |
| Brows (shape · thickness) | SoftArch · Thin |
| Hair style (ear-fit variant) | LayeredShoulder (std) |
| Hair colour | DarkBrown |
| Ears | Human |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | — |
| Race facial feature | — |
| Gloss profile | — |

## C31 · Solenne

- **Race overlays:** Goddess kit: divine aura (warm / cool), supernatural tissue
- **Tier:** RipeningMilf (age lines: ripeningmilf · same on all variants)
- **Source body (reference only):** TBD (new entry) · cup TBD · own height Average (165 cm)
- **Notes:** New entry. Goddess of mercy. Nurturing; trait NURTURING. Tier and height are proposals.
- **Supernatural tissue (V-06):** the three breast files below are `breast_f_sup_…` and must be built on demand.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C31-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Average (165) | `body_f_ripeningmilf_165_voluptuous.png` | G–I → **I** | `breast_f_sup_165_voluptuous_I.png` | ✔ |
| 2 | C31-NT | Non-petite | Top heavy | F-14 TopHeavy | Average (165) | `body_f_ripeningmilf_165_top_heavy.png` | F–H → **H** | `breast_f_sup_165_top_heavy_H.png` | ✔ |
| 3 | C31-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_ripeningmilf_165_bottom_heavy.png` | A–C → **C** | `breast_f_sup_165_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C31-NH | I | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | Peach · Tan | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C31-NT | H | Teardrop | MediumFirm | High (supernatural, no age change) | Wide (G-H) | LargeProtruding / Long | Peach · Tan | `nipple_f_top_heavy_wide_G-H_unaroused.png` |
| C31-NB | C | Round | Firm | High (supernatural, no age change) | Puffy (B-C) | Protruding / Flat | Peach · Tan | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Golden |
| Skin texture / features | VerySmooth |
| Tattoo | None |
| Face shape | Oval |
| Jaw | Rounded |
| Cheekbone | Soft |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Gold |
| Pupil | Round |
| Nose | Straight |
| Lips | Full |
| Brows (shape · thickness) | SoftArch · Medium |
| Hair style (ear-fit variant) | WavyLong (std) |
| Hair colour | Blonde |
| Ears | Human (proposed) |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | Divine aura (warm) |
| Race facial feature | — |
| Gloss profile | Divine |

## C32 · Varan

- **Race overlays:** Goddess kit: divine aura (warm / cool), supernatural tissue
- **Tier:** MatureMilf (age lines: maturemilf · same on all variants)
- **Source body (reference only):** TBD (new entry) · cup TBD · own height Tall (176 cm)
- **Notes:** New entry. Law-goddess, centuries of authority, 22 years enslaved; trait STOIC. Tier and height are proposals.
- **Supernatural tissue (V-06):** the three breast files below are `breast_f_sup_…` and must be built on demand.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C32-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_maturemilf_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_sup_176_slim_curvy_D.png` | ✔ |
| 2 | C32-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Tall (176) | `body_f_maturemilf_176_voluptuous.png` | G–I → **I** | `breast_f_sup_176_voluptuous_I.png` | ✔ |
| 3 | C32-NT | Non-petite | Top heavy | F-14 TopHeavy | Tall (176) | `body_f_maturemilf_176_top_heavy.png` | F–H → **H** | `breast_f_sup_176_top_heavy_H.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C32-NS | D | Teardrop | MediumFirm | High (supernatural, no age change) | Protruding (D-DD) | Wide / Puffy | LightPink · Pink | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C32-NH | I | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | LightPink · Pink | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C32-NT | H | Teardrop | MediumFirm | High (supernatural, no age change) | Wide (G-H) | LargeProtruding / Long | LightPink · Pink | `nipple_f_top_heavy_wide_G-H_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Porcelain |
| Skin texture / features | VerySmooth |
| Tattoo | None |
| Face shape | Oblong |
| Jaw | Angular |
| Cheekbone | HighProminent |
| Eyes (shape · size) | DeepSet · Medium |
| Iris colour | Silver |
| Pupil | Round |
| Nose | Aquiline |
| Lips | Thin |
| Brows (shape · thickness) | Straight · Medium |
| Hair style (ear-fit variant) | StraightLong (std) |
| Hair colour | SilverMetallic |
| Ears | Human (proposed) |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | Divine aura (cool) |
| Race facial feature | — |
| Gloss profile | Divine |

## C33 · Aeloria

- **Race overlays:** Goddess kit: divine aura (warm / cool), supernatural tissue
- **Tier:** RipeningMilf (age lines: ripeningmilf · same on all variants)
- **Source body (reference only):** TBD (new entry) · cup TBD · own height Tall (176 cm)
- **Notes:** New entry. Goddess of forests and her people's continuity; trait PROUD. Ears may need an elven/forest type (TBD). Tier and height are proposals.
- **Supernatural tissue (V-06):** the three breast files below are `breast_f_sup_…` and must be built on demand.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C33-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_ripeningmilf_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_sup_176_slim_curvy_D.png` | ✔ |
| 2 | C33-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Tall (176) | `body_f_ripeningmilf_176_voluptuous.png` | G–I → **I** | `breast_f_sup_176_voluptuous_I.png` | ✔ |
| 3 | C33-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Tall (176) | `body_f_ripeningmilf_176_bottom_heavy.png` | A–C → **C** | `breast_f_sup_176_bottom_heavy_C.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C33-NS | D | Teardrop | MediumFirm | High (supernatural, no age change) | Protruding (D-DD) | Wide / Puffy | Peach · Tan | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |
| C33-NH | I | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | Peach · Tan | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C33-NB | C | Round | Firm | High (supernatural, no age change) | Puffy (B-C) | Protruding / Flat | Peach · Tan | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Olive |
| Skin texture / features | VerySmooth · Freckled (Light) |
| Tattoo | None |
| Face shape | Heart |
| Jaw | Tapered |
| Cheekbone | Defined |
| Eyes (shape · size) | Almond · Medium |
| Iris colour | Green |
| Pupil | Round |
| Nose | Straight |
| Lips | Medium |
| Brows (shape · thickness) | HighArch · Medium |
| Hair style (ear-fit variant) | WaistLength (exp) |
| Hair colour | Green |
| Ears | ElvenPointed (proposed) |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | Divine aura (warm) |
| Race facial feature | — |
| Gloss profile | Divine |

## C34 · Thessaly

- **Race overlays:** Goddess kit: divine aura (warm / cool), supernatural tissue; catalog lists SmallNubs horns as 'Thessaly-type'
- **Tier:** RipeMilf (age lines: ripemilf · same on all variants)
- **Source body (reference only):** TBD (new entry) · cup TBD · own height AboveAverage (170 cm)
- **Notes:** New entry. Hunt-Mother; trait AGGRESSIVE. Horns: SmallNubs per catalog Part 8 (confirm). Tier and height are proposals.
- **Supernatural tissue (V-06):** the three breast files below are `breast_f_sup_…` and must be built on demand.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C34-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | AboveAverage (170) | `body_f_ripemilf_170_voluptuous.png` | G–I → **I** | `breast_f_sup_170_voluptuous_I.png` | ✔ |
| 2 | C34-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | AboveAverage (170) | `body_f_ripemilf_170_bottom_heavy.png` | A–C → **C** | `breast_f_sup_170_bottom_heavy_C.png` | ✔ |
| 3 | C34-NT | Non-petite | Top heavy | F-14 TopHeavy | AboveAverage (170) | `body_f_ripemilf_170_top_heavy.png` | F–H → **H** | `breast_f_sup_170_top_heavy_H.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C34-NH | I | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | Peach · Tan | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C34-NB | C | Round | Firm | High (supernatural, no age change) | Puffy (B-C) | Protruding / Flat | Peach · Tan | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C34-NT | H | Teardrop | MediumFirm | High (supernatural, no age change) | Wide (G-H) | LargeProtruding / Long | Peach · Tan | `nipple_f_top_heavy_wide_G-H_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Tan |
| Skin texture / features | VerySmooth |
| Tattoo | None |
| Face shape | Triangle |
| Jaw | Angular |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Upturned · Medium |
| Iris colour | Amber |
| Pupil | Slit |
| Nose | Aquiline |
| Lips | Wide |
| Brows (shape · thickness) | Angular · Medium |
| Hair style (ear-fit variant) | WildMane (std) |
| Hair colour | Auburn |
| Ears | Human (proposed) |
| Horns | SmallNubs |
| Tail | — |
| Wings | — |
| Race body marking | Divine aura (warm) |
| Race facial feature | — |
| Gloss profile | Divine |

## C35 · Hestrel

- **Race overlays:** Goddess kit: divine aura (warm / cool), supernatural tissue
- **Tier:** RipeningMilf (age lines: ripeningmilf · same on all variants)
- **Source body (reference only):** TBD (new entry) · cup TBD · own height Average (165 cm)
- **Notes:** New entry. Forge goddess; trait BOLD. A muscular profile (MUS) may suit her. Tier and height are proposals.
- **Supernatural tissue (V-06):** the three breast files below are `breast_f_sup_…` and must be built on demand.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C35-NB | Non-petite | Bottom heavy | F-15 BottomHeavy | Average (165) | `body_f_ripeningmilf_165_bottom_heavy.png` | A–C → **C** | `breast_f_sup_165_bottom_heavy_C.png` | ✔ |
| 2 | C35-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Average (165) | `body_f_ripeningmilf_165_voluptuous.png` | G–I → **I** | `breast_f_sup_165_voluptuous_I.png` | ✔ |
| 3 | C35-NT | Non-petite | Top heavy | F-14 TopHeavy | Average (165) | `body_f_ripeningmilf_165_top_heavy.png` | F–H → **H** | `breast_f_sup_165_top_heavy_H.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C35-NB | C | Round | Firm | High (supernatural, no age change) | Puffy (B-C) | Protruding / Flat | Tan · Brown | `nipple_f_bottom_heavy_puffy_B-C_unaroused.png` |
| C35-NH | I | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | Tan · Brown | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C35-NT | H | Teardrop | MediumFirm | High (supernatural, no age change) | Wide (G-H) | LargeProtruding / Long | Tan · Brown | `nipple_f_top_heavy_wide_G-H_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | Caramel |
| Skin texture / features | VerySmooth · Scarred (Light, burn marks) |
| Tattoo | None |
| Face shape | Square |
| Jaw | Square |
| Cheekbone | Defined |
| Eyes (shape · size) | Hooded · Medium |
| Iris colour | Amber |
| Pupil | Round |
| Nose | Wide |
| Lips | Medium |
| Brows (shape · thickness) | Straight · Thick |
| Hair style (ear-fit variant) | BunTop (std) |
| Hair colour | Black |
| Ears | Human (proposed) |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | Divine aura (warm) |
| Race facial feature | — |
| Gloss profile | Divine |

## C36 · Nyxara

- **Race overlays:** Goddess kit: divine aura (warm / cool), supernatural tissue
- **Tier:** YoungAdult (age lines: youngadult · same on all variants)
- **Source body (reference only):** TBD (new entry) · cup TBD · own height Tall (176 cm)
- **Notes:** New entry. Goddess of night and desire; trait COLD. Tier and height are proposals.
- **Supernatural tissue (V-06):** the three breast files below are `breast_f_sup_…` and must be built on demand.

**Recommended variants**

| Rank | Variant | Group | Archetype | Body type | Height | Doll file | Cup (sweet spot → default) | Breast file | Spec |
|------|---------|-------|-----------|-----------|--------|-----------|----------------------------|-------------|------|
| 1 | C36-NH | Non-petite | Hourglass / voluptuous | F-17 Voluptuous | Tall (176) | `body_f_youngadult_176_voluptuous.png` | G–I → **I** | `breast_f_sup_176_voluptuous_I.png` | ✔ |
| 2 | C36-NT | Non-petite | Top heavy | F-14 TopHeavy | Tall (176) | `body_f_youngadult_176_top_heavy.png` | F–H → **H** | `breast_f_sup_176_top_heavy_H.png` | ✔ |
| 3 | C36-NS | Non-petite | Skinny | F-07 SlimCurvy | Tall (176) | `body_f_youngadult_176_slim_curvy.png` | C → **D** *(above sweet spot)* | `breast_f_sup_176_slim_curvy_D.png` | ✔ |

**Breast and nipple detail (from catalog Part 3)**

| Variant | Cup | Breast shape | Softness | Position | Nipple type (group) | Alternates | Nipple colour (from skin tone) | Nipple file (`unaroused`; `light` and `extreme` use the same name) |
|---------|-----|--------------|----------|----------|---------------------|------------|--------------------------------|----------------------|
| C36-NH | I | Teardrop | MediumFirm | High (supernatural, no age change) | LargeProtruding (I-K) | Wide / Long | DarkBrown | `nipple_f_voluptuous_largeprotruding_I-K_unaroused.png` |
| C36-NT | H | Teardrop | MediumFirm | High (supernatural, no age change) | Wide (G-H) | LargeProtruding / Long | DarkBrown | `nipple_f_top_heavy_wide_G-H_unaroused.png` |
| C36-NS | D | Teardrop | MediumFirm | High (supernatural, no age change) | Protruding (D-DD) | Wide / Puffy | DarkBrown | `nipple_f_slim_curvy_protruding_D-DD_unaroused.png` |

**Look sheet (proposal)**

| Field | Value |
|-------|-------|
| Skin tone | DeepPurple |
| Skin texture / features | VerySmooth |
| Tattoo | None |
| Face shape | Diamond |
| Jaw | Tapered |
| Cheekbone | HighProminent |
| Eyes (shape · size) | Upturned · Medium |
| Iris colour | Violet |
| Pupil | Round |
| Nose | LongNarrow |
| Lips | Full |
| Brows (shape · thickness) | HighArch · Thin |
| Hair style (ear-fit variant) | WaistLength (std) |
| Hair colour | Ombre |
| Ears | Human (proposed) |
| Horns | None |
| Tail | — |
| Wings | — |
| Race body marking | Divine aura (cool) |
| Race facial feature | — |
| Gloss profile | Divine |

---

# 4. TOTALS

| Item | Count |
|------|------:|
| Characters (entries) | 41 |
| Variants kept | 123 |
| New body dolls / non-supernatural sprites needed | 0 (all reuse the v3.2 set) |
| Supernatural breast sprites to build (V-06) | 27 |
| Look sheets to review (V-15) | 41 |

---

*End of named characters v2.0 (draft)*







