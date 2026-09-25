# Ojisan in Another World — UI Views Addendum
**New views added this pass: Companion Wardrobe + 13 missing views/overlays**
**Read alongside game-ui-ascii-views.md (the base document)**

---

## SLOT & CLOTHING SYSTEM NOTES

ClothingState is derived from which slots are occupied:

```
FULLY_CLOTHED     = top + bottom (or full_body_outerwear) both occupied
TOPLESS           = top slot empty (or removed); bottom still occupied
BOTTOMLESS        = bottom slot empty; top still occupied
FULLY_UNDRESSED   = top + bottom both empty (or full_body_outerwear empty)
```

ClothingCondition: `INTACT` | `TORN` (set by non-consensual strip actions in intimacy engine).
Clothing items do NOT occupy standard inventory slots — they sit in the wardrobe slot system.
Non-consumable tools (rope, paddle, vibrators) remain in regular inventory.

---
---

# PART G — COMPANION WARDROBE VIEW

---

## G1. COMPANION WARDROBE / OUTFIT MANAGEMENT

*Accessed from: Manor Suite Management → [Dress] button, or NPC Interaction Panel → [Wardrobe], or Contacts profile → [Wardrobe]. Not available in Unsafe zones.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║  HUD: ❤142/200 ⚡95/150 ✦30/80 | ☽NIGHT 7/15 | 💰340G | ◈PRAGMATIST | [≡MENU]               ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  👗 COMPANION WARDROBE                                           [ ◄ Back ]  [💾 Save Preset] ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  SUBJECT:  [ Aria ▼ ]   ← companion / suite resident selector                                ║
║  Clothing Condition: ● INTACT    ClothingState: TOPLESS                                      ║
║  Outfit Preset: [ Default ▼ ]   [ Load ]  [ Save As... ]  [ Delete Preset ]                  ║
║  Presets: Default · Casual · Formal · Intimate · Ceremonial · (+ custom)                     ║
║                                                                                               ║
╠════════════════════════════════════════════╦══════════════════════════════════════════════════╣
║                                            ║                                                  ║
║  BODY-ZONE SLOT MATRIX                     ║  AVAILABLE CLOTHING                              ║
║  ─────────────────────────────────────     ║  (filtered to focused slot category)             ║
║                                            ║  ──────────────────────────────────────────────  ║
║  ── HEAD / FACE ZONE ──────────────────    ║                                                  ║
║                                            ║  Focused slot: EARS                              ║
║  EARS          [Gold Hoop Earrings  ] [✕]  ║  ──────────────────────────────────────────────  ║
║  LIPS          [Empty              ] [+]   ║  [Gold Hoop Earrings]   equipped  [✕ Remove]     ║
║                                            ║  [Silver Stud Earrings] in stock  [Equip]        ║
║  ── NECK / TORSO ZONE ─────────────────    ║  [Pearl Drop Earrings]  in stock  [Equip]        ║
║                                            ║  [Jade Disc Earrings]   in stock  [Equip]        ║
║  NECK          [Empty              ] [+]   ║  [Clamp Earrings]       in stock  [Equip]        ║
║  CHEST / TOP   [Empty  (TOPLESS)   ] [+]   ║  [Bell Charm Earrings]  in stock  [Equip]        ║
║  TOP UNDERWEAR [Lace Bralette      ] [✕]   ║                                                  ║
║  NIPPLES       [Empty              ] [+]   ║  ──────────────────────────────────────────────  ║
║  WAIST         [Silk Waist Chain   ] [✕]   ║  SLOT INFO                                       ║
║  NAVEL         [Empty              ] [+]   ║  Slot: EARS                                      ║
║                                            ║  Category: Accessory · Jewellery                 ║
║  ── ARMS / HANDS ZONE ─────────────────    ║  Accepts: earrings, clamps, charms               ║
║                                            ║  Sensitivity zone: EARS (HIGH)                   ║
║  ARMS          [Sheer Arm Sleeves  ] [✕]   ║  Intimacy act link: ear_lick, ear_bite           ║
║  WRISTS        [Velvet Cuffs       ] [✕]   ║                                                  ║
║  FINGER LEFT   [Empty              ] [+]   ║  Clothing condition: N/A (accessory)             ║
║  FINGER RIGHT  [Moonstone Ring     ] [✕]   ║                                                  ║
║                                            ║  ──────────────────────────────────────────────  ║
║  ── LOWER BODY ZONE ───────────────────    ║  ITEM DETAIL                                     ║
║                                            ║  Gold Hoop Earrings                              ║
║  BOTTOM / OUTER [Silk Skirt        ] [✕]   ║  Type: Accessory · Jewellery                     ║
║  BOTTOM UNDER  [Lace Thong         ] [✕]   ║  Trust gate: none                                ║
║  CLIT          [Empty              ] [+]   ║  Love gate: none                                 ║
║                                            ║  Arousal modifier: —                             ║
║  ── LEGS / FEET ZONE ──────────────────    ║  Intimacy: target zone sensitivity +5%           ║
║                                            ║  Gift value: 80G                                 ║
║  LEGS          [Sheer Thigh-Highs  ] [✕]   ║  Condition: INTACT                               ║
║  ANKLES        [Empty              ] [+]   ║                                                  ║
║                                            ║  [ Equip ]  ← (already equipped — greyed)        ║
║  ── FULL-BODY SLOTS (override above) ───   ║  [ Remove ]                                      ║
║                                            ║  [ View in Profile ]                             ║
║  FULL BODY UNDER  [Empty           ] [+]   ║                                                  ║
║  FULL BODY OUTER  [Empty           ] [+]   ║                                                  ║
║  JACKET / OUTER   [Empty           ] [+]   ║                                                  ║
║                                            ║                                                  ║
║  ── MALE-SPECIFIC SLOT ────────────────    ║                                                  ║
║  PENIS         [N/A — Female NPC   ] [—]   ║                                                  ║
║                                            ║                                                  ║
╠════════════════════════════════════════════╩══════════════════════════════════════════════════╣
║  CURRENT STATE SUMMARY                                                                        ║
║  ClothingState: TOPLESS  (top outer empty; bralette present; skirt + thong = bottom covered) ║
║  Condition: INTACT  ·  Slot conflicts: none  ·  Full-body override: INACTIVE                 ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [Equip Selected] [Remove Slot] [Strip All] [Repair Torn (10G)] [Gift Item] [◄ Back R3C7]    ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

**Full-body slot conflict rules (shown in slot matrix):**
```
  FULL BODY OUTER occupied → CHEST/TOP, BOTTOM/OUTER, JACKET slots auto-locked:
  FULL BODY OUTER [Crimson Qipao     ] [✕]   ← overrides top + bottom outer slots
  CHEST / TOP     [— (overridden) —  ] [🔒]  ← locked by full-body outer
  BOTTOM / OUTER  [— (overridden) —  ] [🔒]  ← locked by full-body outer
  JACKET          [— (overridden) —  ] [🔒]  ← locked by full-body outer

  FULL BODY UNDER occupied → TOP UNDERWEAR, BOTTOM UNDERWEAR auto-locked:
  FULL BODY UNDER [Lace Bodystocking ] [✕]
  TOP UNDERWEAR   [— (overridden) —  ] [🔒]
  BOTTOM UNDERWEAR[— (overridden) —  ] [🔒]
```

**Torn condition state variant:**
```
  CHEST / TOP     [White Blouse  TORN] [✕]  ← red/damaged label
  Clothing condition: ● TORN  (set by non-consensual strip action)
  [ Repair All Torn Items — 25G ]
  (TORN items display as damaged in scene; ClothingState unaffected)
```

**Subject selector — male NPC variant (unlocks PENIS slot):**
```
  PENIS           [Obsidian Cock Ring ] [✕]  ← visible when subject is male
  CLIT            [N/A — Male NPC    ] [—]   ← hidden for male NPC
```

**Outfit Preset save modal:**
```
  ╔══════════════════════════════════════════╗
  ║  Save Outfit Preset                      ║
  ╠══════════════════════════════════════════╣
  ║  Preset name: [_____________________]    ║
  ║  Subject: Aria                           ║
  ║  Slots captured: 8 / 22                  ║
  ║  (empty slots saved as empty)            ║
  ║                                          ║
  ║  [ Save ]          [ Cancel ]            ║
  ╚══════════════════════════════════════════╝
```

---
---

# PART H — MISSING VIEWS: COMMERCE & WORLD

---

## H1. SHOP / VENDOR VIEW

*Triggered when player interacts with a service NPC (merchant, blacksmith, alchemist, innkeeper). Context changes by NPC class.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║  HUD: ❤142/200 ⚡95/150 ✦30/80 | ☽NIGHT 7/15 | 💰340G | ◈PRAGMATIST | [≡MENU]               ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  🛒 SHOP — Mira's Sundries  ·  Thornspire Market             [ ◄ Close Shop ]                ║
║  Reputation modifier: Liked (+142) → shop discount: 45%  (base 50% sell ratio)               ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  [ BUY ]  [ SELL ]                                    💰 Your Gold: 340G                     ║
╠════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  ── BUY TAB ──────────────────────────────────────────────────────────────────────────────── ║
║                                                                                               ║
║  Filter: (●) All  (○) Consumables  (○) Materials  (○) Gifts  (○) Clothing  (○) Tools         ║
║                                                                                               ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────────┐ ║
║  │  Item                     Category      Stock   Buy Price   Your Gold After  Action       │ ║
║  ╠══════════════════════════════════════════════════════════════════════════════════════════╣ ║
║  │  Health Potion            Consumable    ∞       30G         310G             [Buy 1]      │ ║
║  │  Aphrodisiac Gel          Consumable    ∞       80G         260G             [Buy 1]      │ ║
║  │  Lubricant                Consumable    ∞       50G         290G             [Buy 1]      │ ║
║  │  Condom                   Consumable    ∞       10G         330G             [Buy 1]      │ ║
║  │  Herb Bundle              Material      12      20G         320G             [Buy 1]      │ ║
║  │  Silk Ribbon              Gift          3       50G         290G             [Buy 1]      │ ║
║  │  Gold Hoop Earrings       Clothing      2       160G        180G  ⚠ low gold [Buy 1]      │ ║
║  │  Silver Stud Earrings     Clothing      4       80G         260G             [Buy 1]      │ ║
║  │  Lace Bralette            Clothing      2       120G        220G             [Buy 1]      │ ║
║  │  Rope                     Tool          5       20G         320G             [Buy 1]      │ ║
║  │  Paddle                   Tool          3       30G         310G             [Buy 1]      │ ║
║  └──────────────────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                               ║
║  ── SELL TAB (click [ SELL ] to switch) ──────────────────────────────────────────────────── ║
║                                                                                               ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────────┐ ║
║  │  Item                     Qty     Sell Price    Select    Action                          │ ║
║  ╠══════════════════════════════════════════════════════════════════════════════════════════╣ ║
║  │  Iron Ore                 ×5      8G ea.        [  ] ×1   [Sell Selected]                │ ║
║  │  Herb Bundle              ×3      12G ea.       [  ] ×1   [Sell Selected]                │ ║
║  │  Steel Axe (unwanted)     ×1      50G           [✓]       [Sell Selected]                │ ║
║  │  Goblin Fang              ×2      5G ea.        [  ] ×1   [Sell Selected]                │ ║
║  └──────────────────────────────────────────────────────────────────────────────────────────┘ ║
║  Selected value: 50G  →  [ Confirm Sell — +50G ]                                             ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [Buy 1] [Buy ×5] [Buy Max] [Sell Selected] [Sell All Junk] [◄ Close Shop]                   ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

**Blacksmith variant (adds Forge tab):**
```
║  [ BUY ]  [ SELL ]  [ FORGE ]                                                                 ║
║                                                                                               ║
║  ── FORGE TAB ─────────────────────────────────────────────────────────────────────────────   ║
║  Upgrade item:  [ Iron Sword +2 ▼ ]  (from inventory)                                        ║
║  Upgrade to:    +3                                                                            ║
║  Cost:          80G + Iron Ore ×2  (have: ×5 ✓)                                              ║
║  Failure rate:  30%  (on fail: item stays at +2, no destruction)                              ║
║  Alchemy Lab:   NOT BUILT  (would reduce failure rate to 15%)                                 ║
║  [ Attempt Forge → +3 ]                                                                      ║
```

**Innkeeper variant (adds Room tab):**
```
║  [ BUY ]  [ ROOM ]                                                                            ║
║                                                                                               ║
║  ── ROOM TAB ──────────────────────────────────────────────────────────────────────────────   ║
║  🏨 Thornspire Inn — Room for the Night                                                       ║
║  Cost: 20G per night  (you have 340G ✓)                                                      ║
║  Includes: full HP/STA/CPW restore, fatigue reset, day-end tick                              ║
║  [ Rent Room — Sleep Here (20G) ]     [ Cancel ]                                             ║
```

---

## H2. REPUTATION & DARK REPUTATION DASHBOARD

*Accessed via HUD Menu → [Reputation] or from a dedicated region info panel.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║  HUD strip                                                                       [≡ MENU]    ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  📊 REPUTATION DASHBOARD                                         [ ◄ Back ]                  ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  ALIGNMENT OVERVIEW                                                                           ║
║  Score: +12  →  ◈ PRAGMATIST  (−39 to +39 range)                                            ║
║  Alignment bar:  [SOVEREIGN ◄────────────●────────────► PURIFIER]                            ║
║                  −100       −40  ◈  +40       +100                                           ║
║                                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  ┌──────────────────────────────────── MIDDLE CANVAS ───────────────────────────────────┐    ║
║  │                                                                                       │    ║
║  │  REGION           CIVIL REP    TIER      DARK REP   SHADOW FACTION   BOUNTY          │    ║
║  │  ──────────────────────────────────────────────────────────────────────────────────   │    ║
║  │  Thornspire       +142  Liked  ████░░    8 / 100    LOCKED  (<40)    0G              │    ║
║  │  Coldvale          +40  Neutrl  ██░░░░   12 / 100   LOCKED  (<40)    0G              │    ║
║  │  Ironshard Peaks   −20  Dislik  █░░░░░   34 / 100   LOCKED  (<40)   40G ⚠            │    ║
║  │  Eastern Wastes    −80  Dislik  ████░░   62 / 100   UNLOCKED ✦      160G ⚠           │    ║
║  │  ─────────────────────────────────────────────────────────────────────────────────   │    ║
║  │                                                                                       │    ║
║  │  SELECTED: Ironshard Peaks                                                            │    ║
║  │                                                                                       │    ║
║  │  Civil Reputation: −20  (Disliked tier: −400 to −100)                                │    ║
║  │  Decay: −5 pts/day toward 0  (negative only; restores in ~4 days if no action)       │    ║
║  │  Bounty: 40G  [ Pay Bounty — visit Bounty Office in region ]                         │    ║
║  │                                                                                       │    ║
║  │  Dark Reputation: 34 / 100  ·  Shadow Faction: Ironshard Thieves' Den  LOCKED        │    ║
║  │  Unlock at 40 dark rep  (current: 34 — 6 more needed)                                │    ║
║  │  Dark rep actions in this region: Sovereign path quests · coercion · intimidation    │    ║
║  │  Dark rep decay: only when Purifier actions dominate or crime_pardoned flag set       │    ║
║  │                                                                                       │    ║
║  │  RECENT EVENTS                                                                        │    ║
║  │  Day 12: Kill enemy combatant    +10 civil                                            │    ║
║  │  Day 11: Fled battlefield        −10 civil                                            │    ║
║  │  Day 11: Intimidated merchant    +8 dark                                              │    ║
║  └───────────────────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [Pay Bounty (if in region)] [View Shadow Faction (if unlocked)] [Sort by Region] [Close]    ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## H3. WORLD MAP MODAL

*Accessed via [Fast Travel] button or [World Map] hotkey. Shows node graph of all 81 locations.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║  HUD strip                                                                       [≡ MENU]    ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  🗺 WORLD MAP                    Discovered: 35 / 81 nodes          [x Close]                ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │                                                                                         │  ║
║  │  THORNSPIRE REGION                COLDVALE REGION          IRONSHARD PEAKS              │  ║
║  │  ┌───────────────────────────┐    ┌─────────────────┐      ┌─────────────────┐          │  ║
║  │  │ ✦[Market★] ─── ✦[Gate]   │    │ ✦[Town Square]  │      │ ⚔[Mountain Pass]│          │  ║
║  │  │      │               │   │    │       │          │      │       │         │          │  ║
║  │  │ ✦[Manor] ─── ⚔[E.Wastes]│ ───│ ✦[Inn]│[Forest⚔]│ ─────│ ░[Spire ???] │          │  ║
║  │  └───────────────────────────┘    └─────────────────┘      └─────────────────┘          │  ║
║  │                                                                                         │  ║
║  │  EASTERN WASTES                   UNDISCOVERED REGIONS                                  │  ║
║  │  ┌───────────────────────────┐    ┌─────────────────┐                                   │  ║
║  │  │ ⚔[Wastes Road] ─ ░[???] │    │ ░░░ ??? ░░░     │                                   │  ║
║  │  │ ⚔[Ruins    ] ─── ░[???] │    │                 │                                   │  ║
║  │  └───────────────────────────┘    └─────────────────┘                                   │  ║
║  │                                                                                         │  ║
║  │  ★ = Current location (Thornspire Market)                                               │  ║
║  │  ✦ = Safe  ·  ⚔ = Humanoid Only or Unsafe  ·  ░ = Undiscovered                         │  ║
║  │  ─── = Path/Edge  ·  Each edge = 1 region crossing for fast travel cost                 │  ║
║  │                                                                                         │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
║  SELECTED NODE: Thornspire Market                                                             ║
║  Safety: ✦ SAFE  ·  Region: Thornspire  ·  NPC Classes: Merchant, Guard, Wanderer           ║
║  Fast Travel cost from here: FREE (current node)                                             ║
║                        [ Fast Travel Here ]  ← greyed (current location)                    ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [Fast Travel to Selected] [Filter: Safe Only] [Filter: Discovered] [Zoom +/-] [Close]       ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## H4. CUTSCENE / STORY MOMENT VIEW

*Triggered by main quest chapter transitions, companion quest milestones, and major story flags. Different from regular dialogue — more cinematic, no HUD disruption except border.*

```
╔══[border hidden / cinematic mode]═════════════════════════════════════════════════════════════╗
║                                                                                               ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░ [Atmospheric illustration / scene art] ░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░                                        ░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░   (scene illustration region)          ░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░                                        ░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║                                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  [Aria Portrait — profile angle]     ARIA                                               │  ║
║  │  Thornspire · Daybreak                                                                  │  ║
║  │                                                                                         │  ║
║  │  "I've been waiting my whole life to go back to Irongate. I thought it would feel       │  ║
║  │   different when it finally happened. Like something would break open.                  │  ║
║  │   It just feels like walking. The same feet on the same kind of road."                  │  ║
║  │                                                                                         │  ║
║  │  She looks at you without turning her head.                                             │  ║
║  │                                                                                         │  ║
║  │  "Is that what it was like for you? Coming here?"                                       │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  CHOICES                                                                                │  ║
║  │                                                                                         │  ║
║  │  [1] "Yeah. I kept expecting it to feel like an answer."   Trust +5  Love +3           │  ║
║  │                                                                                         │  ║
║  │  [2] "I don't think it works that way for me."            Trust +2                     │  ║
║  │                                                                                         │  ║
║  │  [3] (Stay silent and keep walking.)                       no delta                    │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
║  ── Chapter 3 · Companion Quest: The Iron Gate ─────────────────────   [Skip Cutscene]       ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

**Non-choice cutscene variant (story narration, no player input):**
```
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  NARRATOR                                                                               │  ║
║  │                                                                                         │  ║
║  │  The Miasma Spire cracked at its base three days after the convergence. The sound       │  ║
║  │  reached Thornspire before the light did — a grinding that people first mistook         │  ║
║  │  for distant thunder.                                                                   │  ║
║  │                                                                                         │  ║
║  │  It wasn't.                                                                             │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                    [  ▶ Continue  ]  [Skip Cutscene]          ║
```

---

## H5. GIFT SELECTION SUB-PANEL

*Opens from NPC Interaction Panel when player taps [🎁 Give Gift]. Filtered inventory view showing only GIFT-type items plus eligible consumables.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║  HUD strip                                                                       [≡ MENU]    ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  🎁 SELECT GIFT                                        Recipient: Mira  [ ◄ Cancel ]         ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  ┌──────────────────────────────── GIFT INVENTORY ───────────────────────────────────────┐   ║
║  │  Filter: (●) All giftable  (○) Jewellery  (○) Clothing  (○) Consumables  (○) Misc    │   ║
║  │  ─────────────────────────────────────────────────────────────────────────────────    │   ║
║  │                                                                                       │   ║
║  │  Silk Ribbon           GIFT       ×1   Trust +8  Love +4   (Mira like: HIGH ✦)       │   ║
║  │  Gold Hoop Earrings    CLOTHING   ×1   Trust +12 Love +8   (Mira like: HIGH ✦)       │   ║
║  │  Health Potion         CONSUMABLE ×3   Trust +3  Love +1   (Mira like: NEUTRAL)      │   ║
║  │  Aphrodisiac Gel       CONSUMABLE ×2   Trust −2  Love +5 ⚠ (Mira: may react badly)  │   ║
║  │  Herb Bundle           MATERIAL   ×3   Trust +1  Love +0   (Mira like: LOW)          │   ║
║  │                                                                                       │   ║
║  │  ── SELECTED: Silk Ribbon ───────────────────────────────────────────────────────    │   ║
║  │  Mira's preference tier: HIGH (matches occupation: Merchant — appreciates luxury)    │   ║
║  │  Predicted reaction: "Oh, this is lovely. Thank you."                               │   ║
║  │  Trust +8   Love +4                                                                  │   ║
║  │  Daily gift limit: 1 / day  ·  0 given today ✓                                      │   ║
║  └───────────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  R3: [——] [——] [——] [——] [——] [——] [ Give Selected Gift ]  ← R3C7 is primary action here     ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## H6. INTERROGATION VIEW

*Triggered from Post-Enemy Defeat overlay (F1) → [Interrogate] option. Force-dialogue with a defeated humanoid enemy.*

```
╔══[CRIMSON — UNSAFE]═══════════════════════════════════════════════════════════════════════════╗
║  HUD strip                                                                       [≡ MENU]    ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  🗣 INTERROGATION — Bandit Captain                                                            ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  [Bandit Captain Portrait — injured, kneeling]     BANDIT CAPTAIN                       │  ║
║  │  Status: Defeated · Demoralised · Injured                                               │  ║
║  │  Resolve: ████░░░░░░  40 / 100  ← breaks below 20                                       │  ║
║  │                                                                                         │  ║
║  │  He spits blood onto the road and raises one hand. "Alright. Alright. What do you      │  ║
║  │   want to know?"                                                                        │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
║  INTERROGATION ACTIONS                                                                        ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  [ 🗣 Ask About Camp Location ]      WIS check: 65%  ·  Resolve −5             [Ask]   │  ║
║  │    Success: reveals map node  ·  Fail: stonewalls you                                   │  ║
║  │                                                                                         │  ║
║  │  [ ⚡ Intimidate ]                   Resolve −20 if success                    [Use]   │  ║
║  │    STR + WIS check vs resolve: 72%  ·  On high success: Resolve drops to 0           │  ║
║  │                                                                                         │  ║
║  │  [ 💰 Offer Coin (50G) ]             Trust +25 instantly — likely to talk      [Use]   │  ║
║  │    Skips checks; direct compliance                                                      │  ║
║  │                                                                                         │  ║
║  │  [ 🗣 Ask About Quest Target ]        WIS check: 55%  ·  Resolve −5             [Ask]   │  ║
║  │    Success: quest flag update / location hint                                           │  ║
║  │                                                                                         │  ║
║  │  ░░ [ ☠ Final Threat — SOVEREIGN ]    Resolve −40 / may break instantly  ░░    [Use]   │  ║
║  │    Req: ☠ SOVEREIGN alignment  ·  Reputation −10 if witnessed                          │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
║  INTELLIGENCE LOG                                                                             ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  › Intimidated successfully. Captain's resolve dropped to 40.                           │  ║
║  │  › Pressed on camp location. Failed check. He stares you down.                          │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [Ask Question] [Intimidate] [Offer Coin] [End Interrogation — release / execute]             ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

**Resolve broken variant:**
```
  Resolve: ░░░░░░░░░░   0 / 100  ← BROKEN
  "Fine. Fine! The camp is north of the broken bridge, past the three dead elms.
   There's a second entrance behind the waterfall. Just — don't hurt anyone else."
  [Quest flag set: bandit_camp_location_known]
  [Map node unlocked: Bandit Camp (Unsafe)]
  [ End Interrogation ]
```

---

## H7. NPC SUITE MANAGEMENT VIEW

*Accessed from Manor tab → [Manage] next to a suite, or Manor view → [Manage Suites]. Shows all suites, occupants, passive income.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║  HUD strip                                                                       [≡ MENU]    ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  🏠 SUITE MANAGEMENT — Thornspire Manor          Tier 2 · 1 suite active  [ ◄ Back ]         ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  SUITE 1                                                                               │  ║
║  │  ──────────────────────────────────────────────────────────────────────────────────    │  ║
║  │  Occupant: Aria                                                                        │  ║
║  │  [Aria Portrait]   Bond: DEVOTED  ·  Trust 74  ·  Love 62                              │  ║
║  │                                                                                        │  ║
║  │  Passive Generation: 12G / day                                                         │  ║
║  │  Days accumulated:   3                                                                  │  ║
║  │  Pending:            36G   [ Collect 36G ]                                             │  ║
║  │                                                                                        │  ║
║  │  [ 👗 Open Wardrobe ]   [ 💬 Talk ]   [ ↔ Reassign Suite ]   [ 🚪 Evict from Suite ]  │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  SUITE 2                                                      (locked — Tier 2: 1 max) │  ║
║  │  ──────────────────────────────────────────────────────────────────────────────────    │  ║
║  │  ░ Requires Manor Tier 3 to unlock (2 more suites at Tier 3)                          │  ║
║  │  [ Build Tier 3 — 2000G · Oak Timber ×5 · 3 days ]                                    │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  ASSIGN NEW RESIDENT                                                                   │  ║
║  │  Contact with Move-In eligibility (Trust ≥ 60, Love ≥ 60):                            │  ║
║  │  Aria    Trust 74 Love 62 ✓  (already assigned)                                        │  ║
║  │  Kira    Trust 55 Love 48 ✗  (not yet eligible)                                        │  ║
║  │  Mira    Trust 28 Love 18 ✗  (not yet eligible)                                        │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [Collect All Passive] [Open Wardrobe (Aria)] [Assign Contact] [Evict] [◄ Back to Manor]     ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## H8. CRAFTING BENCH FULL VIEW

*Accessed from Manor → [Open Crafting Bench]. Expands the brief queue shown in Manor tab into a full recipe browser and job management screen.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║  HUD strip                                                                       [≡ MENU]    ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  🔨 CRAFTING BENCH — Thornspire Manor                            [ ◄ Back to Manor ]         ║
╠════════════════════════════════════════════════════════╦══════════════════════════════════════╣
║                                                        ║                                     ║
║  ACTIVE JOBS                                           ║  RECIPE DETAIL                      ║
║  ────────────────────────────────────────────────────  ║  ─────────────────────────────────  ║
║  Health Potion ×2   ready in 1 day   [ Cancel ]        ║  Health Potion                      ║
║  (started Day 14 — resolves Day 15 tick)               ║                                     ║
║                                                        ║  Ingredients:                       ║
║  (max 1 active job at bench tier 2)                    ║  Herb Bundle ×2  (have: ×3 ✓)       ║
║  ────────────────────────────────────────────────────  ║  Glass Vial ×1   (have: ×0 ✗)       ║
║                                                        ║  ← missing: Glass Vial              ║
║  RECIPE BROWSER                                        ║                                     ║
║  Filter: (●)All (○)Consumable (○)Material              ║  Output: Health Potion ×2           ║
║         (○)Clothing (○)Tool                            ║  Time: 1 day                        ║
║  ────────────────────────────────────────────────────  ║                                     ║
║  Health Potion      Herb×2, Vial×1      1d  [Craft✗]  ║  [ Buy Glass Vial at Shop ]          ║
║  Iron Arrow ×10     Iron Ore×2, Feath×3 1d  [Craft ✓] ║    ← 15G at Thornspire Market       ║
║  Lubricant          Herb×1, Oil Vial×1  1d  [Craft ✓] ║                                     ║
║  Aphrodisiac Gel    Rare Herb×2, Gel×1  2d  [Craft ✗] ║  Failure chance: 0%                 ║
║  Silk Bralette      Silk×2, Thread×3   2d  [Craft ✗]  ║  (Forge items may fail — see forge) ║
║  Rope               Hemp Fiber×5       1d  [Craft ✓]   ║                                     ║
║  ░ Mythril Blade    Mythril Ore×3      3d  [Craft ✗]  ║  [ Start Job — Lubricant ×1 ]        ║
║    ← missing Mythril Ore (rare drop)                   ║    (queue will start after current) ║
║                                                        ║                                     ║
║  ✓ = have ingredients  ✗ = missing ingredient          ║                                     ║
║                                                        ║                                     ║
╠════════════════════════════════════════════════════════╩══════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [Start Craft Job] [Cancel Active Job] [Collect Finished] [Filter Recipes] [◄ Back]           ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## H9. OFFSPRING / FAMILY RECORD VIEW

*Accessed from Profile view → [Family Record] or from Contacts menu → filter: Offspring. Shows birth records and current status of offspring.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║  HUD strip                                                                       [≡ MENU]    ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  👶 OFFSPRING RECORDS                              Total: 2 recorded    [ ◄ Back ]            ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  RECORD 1                                                                               │  ║
║  │  ──────────────────────────────────────────────────────────────────────────────────     │  ║
║  │  Name: Lena           Born: Day 28 · Thornspire Manor                                  │  ║
║  │  Mother: Aria         Father: Player                                                    │  ║
║  │  Race: Human  ·  Gender: Female                                                        │  ║
║  │                                                                                        │  ║
║  │  STAT SNAPSHOT AT BIRTH (averaged, ±10% variance)                                     │  ║
║  │  STR 19  AGI 17  WIS 11  DEF 13  LCK 10                                               │  ║
║  │                                                                                        │  ║
║  │  Alignment: Normal (34% chance)                                                        │  ║
║  │  Current Status: Infant · Not yet interactable (future update)                         │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  RECORD 2                                                                               │  ║
║  │  ──────────────────────────────────────────────────────────────────────────────────     │  ║
║  │  Name: (unnamed)      Born: Day 42 · Coldvale Inn                                      │  ║
║  │  Mother: Unknown NPC  Father: Player                                                    │  ║
║  │  Race: Human  ·  Gender: Male                                                          │  ║
║  │  Alignment: Troubled (33% chance)                                                      │  ║
║  │  Current Status: Infant · Not yet interactable                                         │  ║
║  └─────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [Sort: By Date] [Sort: By Mother] [Filter: Named Only] [Close]                               ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## H10. NEW GAME+ CONFIRMATION SCREEN

*Shown when player selects New Game+ from Title Screen (only visible after game-cleared flag).*

```
╔══════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                              ║
║   N E W   G A M E +                                                                         ║
║   ──────────────────────────────────────────────────────────────────────────────────────    ║
║                                                                                              ║
║   Starting New Game+ will begin a new run with the following carry-overs:                   ║
║                                                                                              ║
║   CARRIES OVER                           RESETS                                             ║
║   ────────────────────────────────       ──────────────────────────────                     ║
║   ✓ Player Level + all XP                ✗ Story flags and quest progress                   ║
║   ✓ Unspent BP + AP points               ✗ Contact list and relationships                   ║
║   ✓ Unlocked skill nodes                 ✗ Reputation (all regions)                         ║
║   ✓ Equipment and inventory              ✗ Manor (tier resets to 0)                         ║
║   ✓ Crafting recipes learned             ✗ Pregnancy / offspring records                    ║
║   ✓ Gold                                 ✗ Save slots (NG+ writes to new slot)              ║
║   ✓ Achievements unlocked               ✗ Dark reputation                                   ║
║   ✓ Wardrobe / clothing items            ✗ Alignment score (returns to 0)                   ║
║                                                                                              ║
║   NG+ MODIFIERS (optional — select before starting)                                         ║
║   (●) Standard NG+        (no changes to enemy scaling)                                     ║
║   (○) Ironmist NG+        (enemy HP +25%, encounter rate +10%)                              ║
║   (○) Miasma Surge NG+    (enemy Miasma Reserve +50%; purification harder)                  ║
║                                                                                              ║
║                 [ Begin New Game+ ]              [ Cancel ]                                 ║
║                                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---
---

# PART I — ADDITIONAL OVERLAYS

---

## I1. BOUNTY OFFICE INTERACTION

*Appears when player talks to a Bounty Officer NPC in a region with negative civil reputation.*

```
╔══════════════════════════════════════════════════════════════╗
║  BOUNTY OFFICE — Ironshard Peaks                [x Close]   ║
╠══════════════════════════════════════════════════════════════╣
║  Your standing in this region: −20  (Disliked)              ║
║  Outstanding bounty: 40G                                     ║
║  Formula: abs(−20) × 2 = 40G                                 ║
║  ────────────────────────────────────────────────────────    ║
║  Paying clears your bounty.                                  ║
║  Reputation score remains at −20 and continues to           ║
║  decay naturally toward 0 (−5/day).                          ║
║  ────────────────────────────────────────────────────────    ║
║  Your gold: 340G  ·  Bounty: 40G                             ║
║                                                              ║
║  [ Pay 40G — Clear Bounty ]        [ Leave ]                 ║
╚══════════════════════════════════════════════════════════════╝
```

---

## I2. SLEEP AT INN VARIANT (vs Sleep at Manor)

*Triggered from Innkeeper Shop → Room tab → [Rent Room]. Distinct from sleeping at own Manor (free) — Inn has a gold cost.*

```
╔══════════════════════════════════════════════════════════════╗
║  RENT ROOM — Thornspire Inn                                  ║
╠══════════════════════════════════════════════════════════════╣
║  Location: Thornspire Inn  ✦ SAFE                            ║
║  Cost: 20G per night  (you have 340G → 320G after)           ║
║                                                              ║
║  Full restore: HP · STA · CPW · Fatigue reset               ║
║  Day-end tick runs as normal.                                ║
║                                                              ║
║  Companions staying:                                         ║
║  [Aria] [Kira] — all party members rest here                 ║
║                                                              ║
║  [ Rent Room — Sleep Here (20G) ]    [ Cancel ]              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## I3. COMPANION LEVEL-UP OVERLAY

*Distinct from player level-up (F6). Triggered when a companion's XP threshold is reached (usually after combat or intimacy).*

```
╔══════════════════════════════════════════════════════════════╗
║  ✦ COMPANION LEVEL UP — Aria                                 ║
╠══════════════════════════════════════════════════════════════╣
║  [Aria Portrait]    Companion Lv. 8 → Lv. 9                  ║
║  ────────────────────────────────────────────────────────    ║
║  STAT INCREASES (derived from HumanoidCharacter base)        ║
║  STR  14 → 15    AGI  16 → 17    DEF  12 → 13               ║
║  HP max  90 → 96   STA max  100 → 106                        ║
║  ────────────────────────────────────────────────────────    ║
║  New passive unlock: Iron Resolve  (DEF +8% in all combats) ║
╠══════════════════════════════════════════════════════════════╣
║                              [ Continue ]                    ║
╚══════════════════════════════════════════════════════════════╝
```

---

## I4. FORCE INTIMACY SLEEPING CONFIRMATION

*Triggered when player attempts intimacy on a sleeping NPC (FORCE_INTIMACY_SLEEPING scene start type). Requires adult content enabled.*

```
╔══════════════════════════════════════════════════════════════╗
║  ⚠ FORCE INTIMACY — SLEEPING                                 ║
╠══════════════════════════════════════════════════════════════╣
║  [Mira Portrait — eyes closed, sleeping]                     ║
║  Mira is asleep.                                             ║
║  ────────────────────────────────────────────────────────    ║
║  Scene start type: FORCE_INTIMACY_SLEEPING                   ║
║  Resistance derived at scene start (asleep modifier active)  ║
║  ────────────────────────────────────────────────────────    ║
║  ⚠ This action has reputation consequences if witnessed.     ║
║  ⚠ This content requires adult + non-con content enabled.    ║
║  ────────────────────────────────────────────────────────    ║
║  [ Proceed ]                       [ Cancel ]                ║
╚══════════════════════════════════════════════════════════════╝
```

---

## I5. PREGNANCY STAGE PROGRESS OVERLAY

*Shows current gestation stage when player views a pregnant NPC's profile or at day-end tick if stage advances.*

```
╔══════════════════════════════════════════════════════════════╗
║  🤰 PREGNANCY UPDATE — Aria                                  ║
╠══════════════════════════════════════════════════════════════╣
║  Stage: EarlySecond (Week 5–6)                               ║
║                                                              ║
║  Gestation progress:                                         ║
║  [●●●●●●░░░░░░]  5 / 12 weeks                               ║
║  NotPreg → EarlyFirst → LateFirst → [EarlySecond] →         ║
║  LateSecond → EarlyThird → LateThird → FullTerm              ║
║                                                              ║
║  Birth occurs at week 12 (day-end tick).                     ║
║  Father: Player · Mother: Aria                               ║
╠══════════════════════════════════════════════════════════════╣
║                              [ Continue ]                    ║
╚══════════════════════════════════════════════════════════════╝
```

---

## I6. RELATIONSHIP 16-CELL MATRIX VIEW

*Accessible from NPC Interaction Panel → [View Profile] → in Profile view, relationship section shows current cell. Can optionally expand to full 16-cell grid.*

```
  16-CELL RELATIONSHIP MATRIX  (Trust Band × Love Band)
  ───────────────────────────────────────────────────────────────────────────────
                  │  Love: LOW (−100→−25)  │  Love: NEUTRAL  │  Love: HIGH  │  Love: VERY HIGH │
  ────────────────┼────────────────────────┼─────────────────┼──────────────┼──────────────────┤
  Trust: VERY HIGH│  Protective Guardian   │  Loyal Protector│  Bonded Pair │ ★ DEVOTED        │
  Trust: HIGH     │  Wary Ally             │  Trusted Friend │  Close Bond  │  Deep Attachment │
  Trust: NEUTRAL  │  Cold Tolerance        │  Acquaintance   │  Growing Fond│  Infatuated      │
  Trust: LOW      │  Mutual Hostility      │  Suspicious     │  Enamoured   │  Obsessive       │
  ───────────────────────────────────────────────────────────────────────────────
  Current cell: Trust HIGH (74) × Love HIGH (62) → CLOSE BOND
  Available interactions: Talk · Flirt · Touch · Gift · Intimate · Move In
```

---
---

# UPDATED MASTER INDEX (addendum entries only)

| ID   | View / Overlay | Type | HUD |
|------|----------------|------|-----|
| G1   | Companion Wardrobe / Outfit Management | Three-panel | Yes |
| H1   | Shop / Vendor View (with Forge + Inn variants) | Three-panel | Yes |
| H2   | Reputation & Dark Reputation Dashboard | Three-panel | Yes |
| H3   | World Map Modal | Modal | Yes |
| H4   | Cutscene / Story Moment View | Full-screen (cinematic) | No |
| H5   | Gift Selection Sub-Panel | Dedicated panel | Yes |
| H6   | Interrogation View | Full-width | Yes |
| H7   | NPC Suite Management View | Three-panel | Yes |
| H8   | Crafting Bench Full View | Two-panel | Yes |
| H9   | Offspring / Family Record View | Full-width | Yes |
| H10  | New Game+ Confirmation Screen | Full-screen | No |
| I1   | Bounty Office Interaction | Modal | Yes |
| I2   | Sleep at Inn Variant | Modal | Yes |
| I3   | Companion Level-Up Overlay | Modal | No |
| I4   | Force Intimacy Sleeping Confirmation | Modal | Yes |
| I5   | Pregnancy Stage Progress Overlay | Modal | No |
| I6   | Relationship 16-Cell Matrix View | Inline expansion | Yes |

---

## COMPLETE WARDROBE SLOT REFERENCE

| Slot ID | Zone | Sex | Notes |
|---------|------|-----|-------|
| `ears` | Head/Face | Both | Earrings, clamps, charms |
| `lips` | Head/Face | Both | Lip ring, gloss overlay, lip jewellery |
| `neck` | Neck | Both | Collar, necklace, choker |
| `top_outer` | Torso | Both | Shirt, blouse, corset top (outerwear) |
| `top_underwear` | Torso | Female | Bra, bralette, bandeau |
| `nipples` | Torso | Both | Pasties, nipple clamps, nipple covers, nipple rings |
| `waist` | Torso | Both | Belt, waist chain, corset belt |
| `navel` | Torso | Both | Navel ring, navel chain, belly jewellery |
| `arms` | Arms | Both | Gloves, arm sleeves, opera gloves |
| `wrists` | Arms | Both | Bracelets, cuffs, shackles |
| `finger_left` | Hands | Both | Ring slot 1 |
| `finger_right` | Hands | Both | Ring slot 2 |
| `bottom_outer` | Lower Body | Both | Skirt, shorts, pants, hakama |
| `bottom_underwear` | Lower Body | Both | Panties, thong, boxer shorts |
| `clit` | Genitals | Female | Clit jewellery, piercing, clit cover/shield |
| `penis` | Genitals | Male | Cock ring, sleeve, restraint |
| `legs` | Legs | Both | Stockings, thigh-highs, leg warmers, tabi |
| `ankles` | Legs | Both | Anklets, ankle shackles, ankle charms |
| `full_body_under` | Full Body | Both | Bodystocking, teddy, leotard — overrides top_underwear + bottom_underwear |
| `full_body_outer` | Full Body | Both | Dress, jumpsuit, kimono, qipao — overrides top_outer + bottom_outer |
| `jacket` | Full Body | Both | Coat, cardigan, haori — layered over full_body_outer or top_outer |

**ClothingState derivation from slots:**
```
FULLY_CLOTHED     = (top_outer OR full_body_outer) AND (bottom_outer OR full_body_outer)
TOPLESS           = top_outer empty AND full_body_outer empty; bottom_outer still covered
BOTTOMLESS        = bottom_outer empty AND full_body_outer empty; top_outer still covered
FULLY_UNDRESSED   = top_outer empty AND bottom_outer empty AND full_body_outer empty
(Underwear, accessories, jewellery, and erotic slots do NOT affect ClothingState)
```

---
---

# PART J — PLAYER WARDROBE VIEW

---

## J1. PLAYER WARDROBE / OUTFIT MANAGEMENT

*Accessed from: Menu → Inventory tab → [Open Wardrobe] button, or Equipment Management view → [Wardrobe] button, or NPC Interaction Panel self-strip option reference. Available anywhere the menu is accessible (blocked in combat only). Distinct from Equipment Management (E1) — that view is purely combat gear (weapon/armour/hands/legs/head/offhand). This view is cosmetic + intimate clothing only, and drives selfClothingState in IntimacyScene.*

*Player is always male — PENIS slot active, CLIT slot hidden.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║ HUD: ❤142/200 ⚡95/150 ✦30/80 | ☽NIGHT 7/15 | 💰340G | ◈PRAGMATIST | [≡MENU]                ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  👕 PLAYER WARDROBE                                          [ ◄ Back ]  [💾 Save Preset]     ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                               ║
║  SUBJECT: Player  (male)                                                                      ║
║  Clothing Condition: ● INTACT    selfClothingState: FULLY_CLOTHED                            ║
║  Outfit Preset: [ Travel Standard ▼ ]  [ Load ]  [ Save As... ]  [ Delete Preset ]           ║
║  Presets:  Travel Standard  ·  Formal  ·  Casual  ·  Bare  ·  (+ custom)                    ║
║                                                                                               ║
╠════════════════════════════════════════════════════════════════╦══════════════════════════════╣
║                                                                ║                             ║
║  BODY-ZONE SLOT MATRIX                                         ║  AVAILABLE CLOTHING         ║
║  ─────────────────────────────────────────────────────────     ║  (filtered to focused slot) ║
║                                                                ║                             ║
║  ── HEAD / FACE ZONE ──────────────────────────────────────    ║  Focused slot: TOP / OUTER  ║
║                                                                ║  ─────────────────────────  ║
║  EARS          [Empty                      ] [ + ]            ║                             ║
║  LIPS          [Empty                      ] [ + ]            ║  [Linen Travel Shirt]        ║
║                                                                ║    equipped  [ ✕ Remove ]   ║
║  ── NECK / TORSO ZONE ─────────────────────────────────────    ║                             ║
║                                                                ║  [Cotton Undershirt]         ║
║  NECK          [Empty                      ] [ + ]            ║    in stock  [ Equip ]      ║
║  TOP / OUTER   [Linen Travel Shirt  ●INTACT] [ ✕ ]  ← focused ║                             ║
║  TOP UNDERWEAR [Cotton Undershirt          ] [ ✕ ]            ║  [Merchant Doublet]          ║
║  NIPPLES       [Empty                      ] [ + ]            ║    in stock  [ Equip ]      ║
║  WAIST         [Leather Belt               ] [ ✕ ]            ║                             ║
║  NAVEL         [Empty                      ] [ + ]            ║  [Ceremonial Tunic]          ║
║                                                                ║    in stock  [ Equip ]      ║
║  ── ARMS / HANDS ZONE ─────────────────────────────────────    ║                             ║
║                                                                ║  [Open Robe]                 ║
║  ARMS          [Empty                      ] [ + ]            ║    in stock  [ Equip ]      ║
║  WRISTS        [Empty                      ] [ + ]            ║                             ║
║  FINGER LEFT   [Iron Signet Ring           ] [ ✕ ]            ║  ─────────────────────────  ║
║  FINGER RIGHT  [Empty                      ] [ + ]            ║  SLOT INFO                  ║
║                                                                ║  Slot: TOP / OUTER          ║
║  ── LOWER BODY ZONE ───────────────────────────────────────    ║  Category: Clothing         ║
║                                                                ║  Accepts: shirts, tunics,   ║
║  BOTTOM / OUTER [Travel Trousers   ●INTACT ] [ ✕ ]            ║    robes, doublets          ║
║  BOTTOM UNDER  [Cotton Smallclothes        ] [ ✕ ]            ║  Drives: selfClothingState  ║
║  PENIS         [Empty                      ] [ + ]            ║  (TOPLESS if empty)         ║
║                                                                ║                             ║
║  ── LEGS / FEET ZONE ──────────────────────────────────────    ║  ─────────────────────────  ║
║                                                                ║  ITEM DETAIL                ║
║  LEGS          [Empty                      ] [ + ]            ║  Linen Travel Shirt         ║
║  ANKLES        [Empty                      ] [ + ]            ║  Type: Clothing · Outer Top ║
║                                                                ║  Condition: ● INTACT        ║
║  ── FULL-BODY SLOTS (override above) ──────────────────────    ║  selfClothingState effect:  ║
║                                                                ║    occupies TOP slot        ║
║  FULL BODY UNDER [Empty                    ] [ + ]            ║  Intimacy: player strips    ║
║  FULL BODY OUTER [Empty                    ] [ + ]            ║    via SelfStrip action     ║
║  JACKET / OUTER  [Worn Travelling Cloak    ] [ ✕ ]            ║  Gift value: N/A            ║
║                                                                ║                             ║
║  ── NOTE: CLIT slot hidden (player is male) ───────────────    ║  [ ✕ Remove ]               ║
║                                                                ║  [ View Item Info ]         ║
║                                                                ║                             ║
╠════════════════════════════════════════════════════════════════╩══════════════════════════════╣
║  CURRENT STATE SUMMARY                                                                        ║
║  selfClothingState: FULLY_CLOTHED  (top outer + bottom outer both occupied)                  ║
║  Condition: ● INTACT · Full-body override: INACTIVE · Slot conflicts: none                   ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  R1: [Equip Selected] [Remove Slot] [Strip All] [Repair Torn (10G)] [Save Preset] [——] [——]   ║
║  R3: [——] [——] [——] [——] [——] [——] [ ◄ Back ]  ← R3C7                                         ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

**Torn condition — player variant:**
```
║  TOP / OUTER   [Linen Travel Shirt  ●TORN  ] [ ✕ ]  ← red/damaged label
║  BOTTOM / OUTER[Travel Trousers     ●TORN  ] [ ✕ ]
║
║  selfClothingState: FULLY_CLOTHED  (torn items still occupy slots)
║  Condition: ● TORN  (set during non-con scene if player's clothing was stripped)
║  [ Repair All Torn Items — 20G ]
```

**Full-body outer conflict — player variant:**
```
║  FULL BODY OUTER [Ceremonial Haori      ] [ ✕ ]   ← overrides top + bottom outer
║  TOP / OUTER     [— (overridden) —      ] [🔒]   ← locked by full-body outer
║  BOTTOM / OUTER  [— (overridden) —      ] [🔒]   ← locked by full-body outer
║  JACKET / OUTER  [— (overridden) —      ] [🔒]   ← locked by full-body outer
║
║  selfClothingState: FULLY_CLOTHED  (full-body outer counts as both top + bottom)
```

**PENIS slot — occupied variant:**
```
║  PENIS           [Obsidian Cock Ring    ] [ ✕ ]
║  Slot: PENIS · Category: Accessory · Erotic
║  Accepts: cock rings, sleeves, restraints, piercings
║  Intimacy note: visible in scene; some acts reference this slot
```

**Bare preset variant (all slots empty):**
```
║  selfClothingState: FULLY_UNDRESSED
║  Condition: ● INTACT · All slots empty.
║  (Useful preset for direct scene start without auto-strip overhead)
```

---

**Player Wardrobe vs Companion Wardrobe — key differences:**

| Aspect | Player Wardrobe (J1) | Companion Wardrobe (G1) |
|--------|----------------------|------------------------|
| Subject | Always Player (male) | Selectable — any companion or suite resident |
| CLIT slot | Hidden | Shown for female NPCs |
| PENIS slot | Always shown | Shown for male NPCs only |
| Subject selector | None | Dropdown — party + suite residents |
| State field driven | `selfClothingState` in IntimacyScene | `ClothingState` on NPC character |
| Passive income | N/A | Affects suite passive gen modifier |
| Gift function | N/A | Clothing items can be gifted via NPC panel |
| Access route | Menu → Inventory → [Wardrobe] | Manor suites / NPC panel / Contacts profile |

---
---

# PART K — WORLD MAP VIEW (FULL)

---

## K1. WORLD MAP — FULL SCREEN VIEW

*Accessed via: [⚡ Fast Travel] button in exploration action bar, or [World Map] hotkey. Full-screen; HUD persists across the top. Map shows the node graph derived from `WORLD_NODES` and `WORLD_EDGES` in `worldGraph.ts`. Discovered nodes shown; undiscovered shown as ░░░ placeholders. Current node marked ★. Selected node shown in the right info panel with all available actions.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║ HUD: ❤142/200 ⚡95/150 ✦30/80 | ☽NIGHT 7/15 | 💰340G | ◈PRAGMATIST | [≡MENU]                ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
║  🗺 WORLD MAP           Discovered: 35 / 81 nodes                        [x Close Map]       ║
║  Filter: (●) All  (○) Safe Only  (○) Discovered Only  (○) Current Region                    ║
╠════════════════════════════════════════════════════════════════╦══════════════════════════════╣
║                                                                ║                             ║
║  MAP CANVAS  (click / tap any node to select)                  ║  NODE INFO PANEL            ║
║  ─────────────────────────────────────────────────────────     ║  ─────────────────────────  ║
║                                                                ║                             ║
║  ╔══════════════════════════════════════════════════════════╗  ║  SELECTED:                  ║
║  ║  REGION: THORNSPIRE           REGION: COLDVALE           ║  ║  Thornspire Market          ║
║  ║                                                          ║  ║  ─────────────────────────  ║
║  ║  ✦[Village Square] ─────────── ✦[Coldvale Town Sq]      ║  ║  Region: region_start       ║
║  ║        │       ╲                      │                  ║  ║  Safety: ✦ SAFE             ║
║  ║        │        ╲                ✦[Coldvale Inn]         ║  ║  isSafe: true               ║
║  ║  ✦[Manor★] ──── ⚔[Old Mill]          │                  ║  ║  (sleep allowed here)       ║
║  ║        │                        ⚔[Coldvale Forest]      ║  ║                             ║
║  ║  ⚔[Forest Entrance]                                      ║  ║  ★ CURRENT LOCATION         ║
║  ║        │                                                  ║  ║                             ║
║  ║  ⚔[Crossroads] ─────────────────────────────────────    ║  ║  NPC classes here:          ║
║  ║        │                                                  ║  ║  Merchant · Guard           ║
║  ╠══════════════════════════════════════════════════════════╣  ║  Wanderer · Innkeeper       ║
║  ║  REGION: IRONSHARD PEAKS      REGION: EASTERN WASTES    ║  ║                             ║
║  ║                                                          ║  ║  ─────────────────────────  ║
║  ║  ⚔[Mountain Pass]             ⚔[Wastes Road]            ║  ║  FAST TRAVEL                ║
║  ║        │                            │                    ║  ║                             ║
║  ║  ░░[??? Locked] ──────────── ░░[??? Locked]              ║  ║  Cost: FREE                 ║
║  ║                                                          ║  ║  (current node)             ║
║  ╚══════════════════════════════════════════════════════════╝  ║  Travel phases: 0           ║
║                                                                ║                             ║
║  ── LEGEND ─────────────────────────────────────────────────   ║  [ Fast Travel Here ]       ║
║  ✦ = SAFE (sleep, full menu)                                   ║    ← greyed, already here   ║
║  ⚔ = UNSAFE or HUMANOID ONLY (combat possible)                ║                             ║
║  ░ = UNDISCOVERED (must reach by travel to unlock)             ║  [ Set as Waypoint ]        ║
║  ★ = Current location                                          ║                             ║
║  ─ = Edge · travelPhases shown on hover                        ║  [ View Region Info ]       ║
║  ─── Bold edge = shortest path to selected node                ║                             ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  REPUTATION HERE            ║
║                                                                ║  Civil:  +142  Liked        ║
║                                                                ║  Dark:   8/100  Locked      ║
║                                                                ║  Bounty: 0G                 ║
╠════════════════════════════════════════════════════════════════╩══════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [Fast Travel Here] [Set Waypoint] [View Region Info] [Filter] [Zoom In] [Zoom Out] [Close]   ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## K2. NODE INFO PANEL — REACHABLE NODE (different region, costs gold)

*Right panel state when player clicks a node that is NOT the current location — shows full travel cost breakdown and all options.*

```
╔══[GOLD — SAFE]════════════════════════════════════════════════════════════════════════════════╗
║ HUD strip                                                                        [≡ MENU]    ║
╠════════════════════════════════════════════════════════════════╦══════════════════════════════╣
║                                                                ║                             ║
║  MAP CANVAS  (Coldvale Inn selected)                           ║  NODE INFO PANEL            ║
║                                                                ║  ─────────────────────────  ║
║  ╔══════════════════════════════════════════════════════════╗  ║                             ║
║  ║  ✦[Village Square★] ───────── ✦[Coldvale Town Sq]       ║  ║  SELECTED:                  ║
║  ║  (bold path = shortest route)  ────► ✦[Coldvale Inn] ★  ║  ║  Coldvale Inn               ║
║  ║                                          ← selected       ║  ║  ─────────────────────────  ║
║  ╚══════════════════════════════════════════════════════════╝  ║  Region: Coldvale           ║
║                                                                ║  Safety: ✦ SAFE             ║
║                                                                ║  isSafe: true               ║
║                                                                ║  (sleep allowed here)       ║
║                                                                ║                             ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  FAST TRAVEL COST           ║
║                                                                ║                             ║
║                                                                ║  Route:                     ║
║                                                                ║  Village Sq →               ║
║                                                                ║  Coldvale Town Sq →         ║
║                                                                ║  Coldvale Inn               ║
║                                                                ║                             ║
║                                                                ║  Boundaries: 1              ║
║                                                                ║  Gold cost: 5G              ║
║                                                                ║  Phase cost: 1 action       ║
║                                                                ║  travelPhases edge: 2       ║
║                                                                ║                             ║
║                                                                ║  Your gold: 340G            ║
║                                                                ║  After travel: 335G ✓       ║
║                                                                ║                             ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  ACTIONS                    ║
║                                                                ║                             ║
║                                                                ║  [ ⚡ Fast Travel — 5G ]    ║
║                                                                ║                             ║
║                                                                ║  [ 🚶 Walk (free)         ] ║
║                                                                ║    Uses 2 phase actions     ║
║                                                                ║    Risk: encounter on path  ║
║                                                                ║                             ║
║                                                                ║  [ 📌 Set as Waypoint ]     ║
║                                                                ║                             ║
║                                                                ║  [ 📊 View Region Info ]    ║
║                                                                ║                             ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  REPUTATION THERE           ║
║                                                                ║  Civil:  +40  Neutral       ║
║                                                                ║  Dark:   12/100  Locked     ║
║                                                                ║  Bounty: 0G                 ║
╠════════════════════════════════════════════════════════════════╩══════════════════════════════╣
║  ACTION BAR                                                                                   ║
║  [⚡ Fast Travel — 5G] [🚶 Walk (free, 2 phases)] [📌 Set Waypoint] [📊 Region Info] [Close]  ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## K3. NODE INFO PANEL — UNSAFE NODE SELECTED

*Right panel state when player selects an UNSAFE or HUMANOID_ONLY node. Adds safety warnings and restricted action list.*

```
║                                                                ║  NODE INFO PANEL            ║
║                                                                ║  ─────────────────────────  ║
║  ╔══════════════════════════════════════════════════════════╗  ║                             ║
║  ║  ✦[Village Sq★] ────► ⚔[Forest Entrance]  ← selected   ║  ║  SELECTED:                  ║
║  ╚══════════════════════════════════════════════════════════╝  ║  Forest Entrance            ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  Region: region_forest      ║
║                                                                ║  Safety: ⚔ UNSAFE           ║
║                                                                ║  isSafe: false              ║
║                                                                ║  ⚠ Sleep not allowed        ║
║                                                                ║  ⚠ Inventory restricted     ║
║                                                                ║  ⚠ Manor tab locked         ║
║                                                                ║                             ║
║                                                                ║  Enemy roam:                ║
║                                                                ║  (deferred — Task 17.DATA)  ║
║                                                                ║  Encounter chance: 35%      ║
║                                                                ║                             ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  FAST TRAVEL COST           ║
║                                                                ║  Boundaries: 1              ║
║                                                                ║  Gold cost: 5G              ║
║                                                                ║  Phase cost: 1 action       ║
║                                                                ║  travelPhases edge: 2       ║
║                                                                ║  Your gold: 340G ✓          ║
║                                                                ║                             ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  ⚠ UNSAFE TRAVEL WARNING    ║
║                                                                ║  Encounter roll on arrival. ║
║                                                                ║  Camp risk: HIGH (40%).     ║
║                                                                ║  Party should be prepared.  ║
║                                                                ║                             ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  ACTIONS                    ║
║                                                                ║                             ║
║                                                                ║  [ ⚡ Fast Travel — 5G  ⚠ ] ║
║                                                                ║    (arrival encounter roll) ║
║                                                                ║                             ║
║                                                                ║  [ 🚶 Walk (free, 2 phases)]║
║                                                                ║    encounter on each edge   ║
║                                                                ║                             ║
║                                                                ║  [ 📌 Set as Waypoint ]     ║
║                                                                ║                             ║
║                                                                ║  [ 📊 View Region Info ]    ║
║                                                                ║                             ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  REPUTATION THERE           ║
║                                                                ║  Civil:  −80  Hostile       ║
║                                                                ║  Dark:   62/100  UNLOCKED ✦ ║
║                                                                ║  Bounty: 160G ⚠             ║
```

---

## K4. NODE INFO PANEL — UNDISCOVERED NODE

*Right panel state when player clicks an ░░░ undiscovered placeholder node. No travel allowed; only hints shown if available.*

```
║                                                                ║  NODE INFO PANEL            ║
║                                                                ║  ─────────────────────────  ║
║  ╔══════════════════════════════════════════════════════════╗  ║                             ║
║  ║  ⚔[Mountain Pass] ────► ░░░[??? Locked]  ← selected    ║  ║  SELECTED:                  ║
║  ╚══════════════════════════════════════════════════════════╝  ║  Unknown Location           ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  Region: ???                ║
║                                                                ║  Safety: UNKNOWN            ║
║                                                                ║                             ║
║                                                                ║  🔒 UNDISCOVERED            ║
║                                                                ║  You must reach this node   ║
║                                                                ║  by travelling to its       ║
║                                                                ║  adjacent discovered node   ║
║                                                                ║  and exploring on foot.     ║
║                                                                ║                             ║
║                                                                ║  RUMOUR HINT (if known):    ║
║                                                                ║  "Traders speak of a        ║
║                                                                ║   spire beyond the pass     ║
║                                                                ║   that bleeds miasma."      ║
║                                                                ║  (from dialogue flag:       ║
║                                                                ║   elder_spire_hint)         ║
║                                                                ║                             ║
║                                                                ║  ─────────────────────────  ║
║                                                                ║  ACTIONS                    ║
║                                                                ║  (none — must discover      ║
║                                                                ║   before travelling here)   ║
║                                                                ║                             ║
║                                                                ║  [ 📌 Mark as Interested ]  ║
║                                                                ║    (adds a pin reminder)    ║
```

---

## K5. REGION INFO OVERLAY

*Triggered from Node Info Panel → [View Region Info] or from the Reputation Dashboard. Slides over the right panel.*

```
╔══════════════════════════════════════════════════════════════════════════════════════════════╗
║  REGION INFO — THORNSPIRE                                                       [x Close]   ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  CIVIL REPUTATION                                                                            ║
║  Score: +142   Tier: LIKED   ████████████░░░░  (range: −100 to +200)                        ║
║  Effect: Shop prices −12%  ·  Guards passive  ·  Quest board available                      ║
║  Decay: none while positive                                                                  ║
║  Bounty: 0G                                                                                  ║
║                                                                                              ║
║  DARK REPUTATION                                                                             ║
║  Score: 8 / 100   Shadow Faction: LOCKED  (need 40 to unlock)                               ║
║  ████░░░░░░░░░░░░░░░░░░  8 / 40 to unlock                                                   ║
║  How to earn dark rep: Sovereign quests · coercion actions · crime flags                    ║
║  Decay: only via Purifier dominant or crime_pardoned flag                                    ║
║                                                                                              ║
║  NODES IN THIS REGION (5 discovered / 8 total)                                              ║
║  ✦ Village Square (SAFE)     ✦ Thornspire Inn (SAFE)    ✦ Manor Grounds (SAFE)              ║
║  ⚔ Old Mill (HUMANOID ONLY)  ✦ Market (SAFE)            ░ ??? ░ ??? ░ ???                   ║
║                                                                                              ║
║  NPC CLASSES PRESENT: Merchant · Guard · Innkeeper · Wanderer · Blacksmith                  ║
║  SERVICES AVAILABLE:  Shop · Forge · Inn rooms · Quest board · Bounty office                ║
║                                                                                              ║
║  [ Pay Bounty — 0G (none outstanding) ]   [ Open Reputation Dashboard ]   [ Close ]         ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## K6. FAST TRAVEL CONFIRMATION MODAL

*Shown when player presses [⚡ Fast Travel] from the world map action bar or node info panel. Summarises the trip before committing gold and phase actions.*

```
╔══════════════════════════════════════════════════════════════╗
║  FAST TRAVEL CONFIRMATION                                    ║
╠══════════════════════════════════════════════════════════════╣
║  From:   Village Square  (★ current)                         ║
║  To:     Coldvale Inn                                        ║
║                                                              ║
║  ROUTE                                                       ║
║  Village Square ──(1)──► Coldvale Town Sq ──(1)──► Coldvale Inn║
║  (travelPhases per edge shown in parentheses)                ║
║                                                              ║
║  COST SUMMARY                                                ║
║  Region boundaries crossed: 1                                ║
║  Gold:   −5G   (340G → 335G)                                 ║
║  Phase:  −1 action  (7 remaining → 6)                        ║
║                                                              ║
║  Arrival safety: ✦ SAFE  (no encounter roll on arrival)      ║
║                                                              ║
║  [ Confirm Fast Travel — 5G ]        [ Cancel ]              ║
╚══════════════════════════════════════════════════════════════╝
```

**Unsafe destination variant:**
```
╔══════════════════════════════════════════════════════════════╗
║  FAST TRAVEL CONFIRMATION — ⚠ UNSAFE DESTINATION            ║
╠══════════════════════════════════════════════════════════════╣
║  From:   Village Square  (★ current)                         ║
║  To:     Forest Entrance  ⚔ UNSAFE                          ║
║                                                              ║
║  Gold:   −5G   (340G → 335G)                                 ║
║  Phase:  −1 action                                           ║
║                                                              ║
║  ⚠ ARRIVAL ENCOUNTER ROLL: 35%                               ║
║  ⚠ Sleep not available at this location                      ║
║  ⚠ Inventory / Manor tabs will be locked on arrival          ║
║  ⚠ Bounty in this region: 160G — guards are hostile          ║
║                                                              ║
║  [ Confirm — Travel Anyway ]         [ Cancel ]              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## K7. WAYPOINT SYSTEM

*Waypoints are player-set pins on map nodes. Shown as 📌 on the map canvas. No mechanical effect — purely navigational reminders.*

```
  MAP CANVAS with waypoints:
  ✦[Village Sq★] ─── ✦[Coldvale Inn 📌] ─── ⚔[Forest Entrance 📌]
                           ↑ "Pick up fabric"    ↑ "Investigate collapsed camp"

  Waypoint notes are set via:
  [ 📌 Set as Waypoint → opens small text input modal ]

  ╔══════════════════════════════════════════════════╗
  ║  SET WAYPOINT — Coldvale Inn              [x]    ║
  ╠══════════════════════════════════════════════════╣
  ║  Note (optional):                                ║
  ║  [___________________________]                   ║
  ║                                                  ║
  ║  [ Set Waypoint ]       [ Clear Waypoint ]       ║
  ╚══════════════════════════════════════════════════╝
```

---

## UPDATED MASTER INDEX (Part J and K entries)

| ID   | View / Overlay | Type | HUD |
|------|----------------|------|-----|
| J1   | Player Wardrobe / Outfit Management | Three-panel | Yes |
| K1   | World Map — Full Screen View (current node selected) | Three-panel | Yes |
| K2   | World Map — Reachable node selected (different region) | Right panel variant | Yes |
| K3   | World Map — Unsafe node selected | Right panel variant | Yes |
| K4   | World Map — Undiscovered node selected | Right panel variant | Yes |
| K5   | Region Info Overlay | Modal over map | Yes |
| K6   | Fast Travel Confirmation Modal | Modal | Yes |
| K7   | Waypoint Set Modal | Small modal | Yes |
