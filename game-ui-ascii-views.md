# Ojisan in Another World — Game UI ASCII Wireframes
**Exhaustive reference for all views defined in §4.21.3 (PRD v1.7)**

---

## LAYOUT SYSTEM

Most gameplay views share a consistent three-region structure:

```
╔══════════════════════════════════════════════════════════════════════════════════════════════╗
║  HUD  (persistent overlay — top bar — NEVER altered by any view below)                      ║
╠══════════════════╦═══════════════════════════════════════════════════╦═════════════════════╣
║                  ║                                                   ║                     ║
║   LEFT PANEL     ║            MIDDLE CANVAS                          ║   RIGHT PANEL       ║
║   (HUD / fixed   ║   (primary content — grid, list, tree, map)       ║   (context panel —  ║
║    vitals strip) ║                                                   ║    tooltip, detail, ║
║                  ║                                                   ║    inspector lens)  ║
╠══════════════════╩═══════════════════════════════════════════════════╩═════════════════════╣
║  ACTION BAR  (hotbar — bottom strip — context-sensitive buttons, Row 1–3 × 7 cols)          ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

**Legend:**
- `███` filled bar  `░░░` empty bar  `[BTN]` button  `(●)` selected  `(○)` unselected
- `▸` expanded row  `▹` collapsed row  `[x]` close  `···` truncated
- Hotbar slots referenced as Row R, Col C (R1C1 = top-left, R3C7 = bottom-right Back button anchor)

---

## 1. HUD — PERSISTENT OVERLAY (always visible, never overridden)

```
╔══════════════════════════════════════════════════════════════════════════════════════════════╗  ← border color:
║  ❤ HP  ███████████░░░░  142/200    ⚡ STA  ██████████░░░  95/150    ✦ CPW  █████░░░░  30/80  ║    gold   = SAFE
╠══════════════════════════════════════════════════════════════════════════════════════════════╣    iron   = HUMANOID ONLY
║  [☽ NIGHT  ▓▓▓▓▓░░░░░  7/15]   💰 340G   😴 ■■□□□ (fatigue 2d)   [≡ MENU]                 ║    crimson= UNSAFE
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  Party: [Aria ❤███░ 60/90]   [Kira ❤████ 80/80]   [——— Empty slot ———]                     ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

- Row 1: Player HP / STA / CPW coloured progress bars with current/max
- Row 2: Phase indicator (5-pip strip, name, action count) | Gold | Fatigue (5-icon tier) | Menu button
- Row 3: Party strip — up to 3 companion portrait tokens + HP mini-bar; greyed + ⬇ when downed
- Border glow: **Gold** = Fully Safe | **Iron/grey** = Humanoid Only | **Crimson pulse** = Unsafe

---

## 2. TITLE SCREEN

*(Full-viewport — no three-panel structure, no HUD)*

```
╔══════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                              ║
║        ░░░░░░░░░ atmospheric vignette — drifting smoke / dust motes / slow pulse ░░░░░░░░░   ║
║                                                                                              ║
║             ┌────────────────────────────────────────────────────────────────┐               ║
║             │                                                                │               ║
║             │     ✦  O J I S A N   I N   A N O T H E R   W O R L D  ✦     │               ║
║             │        stone-200 gradient ──────────────────► stone-500        │               ║
║             │                                                                │               ║
║             └────────────────────────────────────────────────────────────────┘               ║
║                                                                                              ║
║                          ┌────────────────────────────────┐                                 ║
║                          │   [ New Game                 ] │                                 ║
║                          │                                │                                 ║
║                          │   [ Continue                 ] │  ← greyed if no save token      ║
║                          │     Lv.12 · Thornspire          │    hover: level/location preview ║
║                          │                                │                                 ║
║                          │   [ New Game+                ] │  ← hidden until cleared flag    ║
║                          │                                │                                 ║
║                          │   [ Content Settings         ] │                                 ║
║                          │                                │                                 ║
║                          │   [ Settings                 ] │                                 ║
║                          │                                │                                 ║
║                          │   [ About                    ] │  ← opens modal overlay          ║
║                          └────────────────────────────────┘                                 ║
║                                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 3. CHARACTER CREATION VIEW

*(Full-viewport — no three-panel structure, no HUD active)*

```
╔══════════════════════════════════════════════════════════════════════════════════════════════╗
║  CHARACTER CREATION                                                                          ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  ┌─────────────────────┐   ┌─────────────────────────────────────────────────────────────┐  ║
║  │  IDENTITY BLOCK     │   │  ORIGIN / CLASS TOGGLE MATRIX                               │  ║
║  │  ─────────────────  │   │  ─────────────────────────────────────────────────────────  │  ║
║  │  Name:              │   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │  ║
║  │  [_______________ ] │   │  │ ⚔ WARRIOR   │  │ ✦ MAGE      │  │ ◈ ROGUE     │         │  ║
║  │                     │   │  │ ─────────── │  │ ─────────── │  │ ─────────── │         │  ║
║  │  Portrait:          │   │  │ STR ██████  │  │ WIS ██████  │  │ AGI ██████  │         │  ║
║  │  ┌───────────────┐  │   │  │ DEF ████░░  │  │ CPW ████░░  │  │ LCK ████░░  │         │  ║
║  │  │               │  │   │  │ Passive:    │  │ Passive:    │  │ Passive:    │         │  ║
║  │  │  [Portrait A] │  │   │  │ Iron Guard  │  │ Arcane Amp  │  │ Fleet Step  │         │  ║
║  │  │               │  │   │  │ (●) SELECT  │  │ (○)         │  │ (○)         │         │  ║
║  │  └───────────────┘  │   │  └─────────────┘  └─────────────┘  └─────────────┘         │  ║
║  │  [◄ Prev] [Next ►]  │   │  ┌─────────────┐  ┌─────────────┐                          │  ║
║  └─────────────────────┘   │  │ ♥ HEALER    │  │ ⚗ ALCHEMIST │                          │  ║
║                             │  │ (○)         │  │ (○)         │                          │  ║
║                             │  └─────────────┘  └─────────────┘                          │  ║
║                             └─────────────────────────────────────────────────────────────┘  ║
║                                                                                              ║
║  ┌──────────────────────────────────────────────┐  ┌───────────────────────────────────────┐ ║
║  │  ATTRIBUTE ALLOCATION       Points left: 5   │  │  ORIGIN LORE PANEL                    │ ║
║  │  ──────────────────────────────────────────  │  │  ─────────────────────────────────    │ ║
║  │  STR 12  [-][+]    AGI 10  [-][+]            │  │  "Warriors of the Iron Pact are bred  │ ║
║  │  WIS  8  [-][+]    DEF 11  [-][+]            │  │   in the mountain fortresses north    │ ║
║  │  LCK  9  [-][+]                              │  │   of Thornspire. They carry the       │ ║
║  │                                              │  │   weight of the old kingdom on        │ ║
║  │  Erotic (derived):                           │  │   their backs and swing it at         │ ║
║  │  TEC 10    SEN 8    VIR 10                   │  │   everything that moves."             │ ║
║  └──────────────────────────────────────────────┘  └───────────────────────────────────────┘ ║
║                                                                                              ║
║                        [ Finalise Character — begin introduction ]                           ║
║                                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 4. UNIFIED SPATIAL EXPLORATION VIEW (Overworld + Manor)

```
╔══ [GOLD BORDER — SAFE] ══════════════════════════════════════════════════════════════════════╗
║  HUD  ❤ 142/200  ⚡ 95/150  ✦ 30/80  |  ☽ NIGHT 7/15  |  💰 340G  |  😴 ■■□□□  |  [≡ MENU] ║
║  Party: [Aria ❤███░] [Kira ❤████] [——— empty ———]                                           ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  📍 Thornspire Market   ·   Thornspire Region   ·   ✦ SECURE SANCTUARY                      ║
╠══════════════════════════════════════════╦═══════════════════════════════════════════════════╣
║                                          ║  DYNAMIC PRESENCE PANEL (Inspector Lens)          ║
║  30×30 GRID CANVAS                       ║  ─────────────────────────────────────────────── ║
║                                          ║  Tile: Market Stall · (14,9)                      ║
║  · · · · ▓ ▓ · · · · · · · · · ·        ║                                                   ║
║  · · · · ▓ · · · · · · · · · · ·        ║  ENTITY STACK ACCORDION                           ║
║  · · W · · · · · · · ·+3· · · · ·       ║  ┌───────────────────────────────────────────┐   ║
║  · · · · · · ▓ · · · · · · · · ·        ║  │ ▸ Mira (Merchant) — Individuated          │   ║
║  · · · P · · · · · · · · · · · ·        ║  │   [Talk] [Flirt] [Touch] [Gift] [Intimate]│   ║
║  · · · A · · · · · D · · · · · ·        ║  │   Trust ████░ 42  Love ██░░ 18            │   ║
║  · · · · · · · · · · · · · □ · ·        ║  ├───────────────────────────────────────────┤   ║
║  · · · · · · · ▓ · · · · □ □ · ·        ║  │ ▸ Town Guard — Anonymous                  │   ║
║  · · · · · · · · · · · · · · · ·        ║  │   [Talk]                                  │   ║
║  · · · · · M · · · · · · · · · ·        ║  └───────────────────────────────────────────┘   ║
║  · · · · · · · ▓ ▓ · · · · · · ·        ║                                                   ║
║  · · · · · · · · · · · · · · · ·        ║  MANOR WORKSPACE (if on base node)               ║
║                                          ║  ┌───────────────────────────────────────────┐   ║
║  P=Player  A=Aria  W=Kira                ║  │  Tier 2 · [Open Bench] · Suite 1: Aria    │   ║
║  D=NPC  M=Monster                        ║  │  [Upgrade Tier 3 — 2000G, 3d] [Build]     │   ║
║  ▓=Wall  □=Door  +3=stacked NPCs         ║  └───────────────────────────────────────────┘   ║
║  (click tile to pathfind)                ║                                                   ║
║                                          ║  CONTEXT LOG (last 5 server lines)               ║
║                                          ║  › You step into the market district.             ║
║                                          ║  › Aria points at a produce stall.               ║
║                                          ║  › The smell of spiced wine drifts east.          ║
║                                          ║  › A guard nods as you pass.                      ║
║                                          ║  › Mira: "Fresh shipment today!"                  ║
╠══════════════════════════════════════════╩═══════════════════════════════════════════════════╣
║  ACTION BAR                                                                                  ║
║  [↑][↓][←][→] Move   [Fast Travel]   [Phase Advance ☽]   [Sleep — Night/Midnight only]      ║
║  Phase Advance behaviour: Safe=full rest mult · Humanoid Only=guarded step · Unsafe=⚠ warn  ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

**Unsafe zone — Inspector Lens variant:**
```
  ENTITY STACK ACCORDION
  ┌───────────────────────────────────────────┐
  │ ▸ Goblin Scout × 2 — Enemy                │
  │   [⚔ Engage Combat]  [✦ Purify]           │
  └───────────────────────────────────────────┘

  [ ☠ Camp (40% encounter on rest) — HIGH RISK ]
  ⚠ Unsafe zone — Inventory / Manor tabs locked
```

---

## 5. COMBAT VIEW

```
╔══ [CRIMSON BORDER — UNSAFE] ═════════════════════════════════════════════════════════════════╗
║  HUD  ❤ 80/200  ⚡ 70/150  ✦ 20/80  |  ⚔ COMBAT  |  💰 340G  |  😴 ■■□□□  |  [≡ MENU]       ║
║  Party: [Aria ❤██░ 40/90 ⬇DOWN] [Kira ❤████ 80/80] [——— empty ———]                         ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  INITIATIVE ORDER STRIP                                                                      ║
║  ┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐                        ║
║  │▶ Player  │ Goblin1  │  Kira    │ Goblin2  │ BossOrc  │  Aria ⬇  │  ← downed=greyed       ║
║  │  Ini: 18 │  Ini: 14 │  Ini: 12 │  Ini: 10 │  Ini: 8  │  Ini: 7  │                        ║
║  └──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘                        ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  COMBATANT PANELS                                                                            ║
║  ┌─────────────────────────┐   ┌────────────────────────┐  ┌────────────────────────┐        ║
║  │ [Player]                │   │ [Goblin 1]             │  │ [Goblin 2]             │        ║
║  │ HP  ██████░░░ 80/200    │   │ HP  ██░░░░░░  25/60    │  │ HP  ████░░░░  40/60    │        ║
║  │ STA ████████░ 70/150    │   │ STA ████░░░░  30/60    │  │ STA ███░░░░░  25/60    │        ║
║  │ CPW ████░░░░░ 20/80     │   │ [Bleeding×1  2t]       │  │ Status: —              │        ║
║  │ Status: —               │   └────────────────────────┘  └────────────────────────┘        ║
║  └─────────────────────────┘                                                                  ║
║  ┌─────────────────────────┐   ┌──────────────────────────────────────────────────────┐      ║
║  │ [Kira]                  │   │ [Boss Orc — BOSS]                                    │      ║
║  │ HP  ████████░ 80/80     │   │ HP  ██████████████░░░░  140/200  Phase 1 (>75%)      │      ║
║  │ STA ████████░ 60/80     │   │ STA ████████░░░░░░░░     80/140                      │      ║
║  │ Status: —               │   │ Miasma ████░  35/80    Purify: ██░░░  35%            │      ║
║  └─────────────────────────┘   └──────────────────────────────────────────────────────┘      ║
║                                                                                              ║
║  COMBAT LOG                                                                            ▲     ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐    ║
║  │ Round 3 ──────────────────────────────────────────────────────────────────────────── │    ║
║  │ › Player attacks Goblin 1 for 28 dmg. [CRIT ×1.75] Goblin 1 is bleeding.           │    ║
║  │ › Goblin 1 attacks Player for 12 dmg.                                               │    ║
║  │ › Kira: Iron Slash on Goblin 2 — 35 dmg.                                           │    ║
║  │ › Boss Orc hits 75% HP — Phase 2! Rage Aura activated.  [BOSS PHASE CHANGE]        │    ║
║  │ › Aria downed. (0 HP — incapacitated this encounter)                                │    ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                        ▼     ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR   Target: [Goblin 1 ▼]                                                          ║
║  [⚔ Attack   ] [✦ Skills    ] [🌀 Purify    ] [🛡 Defend    ] [🎒 Use Item  ] [🏃 Flee     ] ║
║   ATK 24 dmg    opens sub      TEC check       DEF +50%       opens inv       50% chance    ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

**Skills sub-panel (replaces action bar on Skills press):**
```
  SKILLS  [x]  Battle Tree | Ardor Tree
  ┌────────────────────────────────────────────────────────────────┐
  │  ⚔ Iron Cleave    CPW 5    Dmg ×1.4 vs low-DEF targets  [Use] │
  │  ⚔ War Cry        CPW 8    +20% ATK party 2t             [Use] │
  │  ✦ Purity Aura    CPW 15   Purify all — +20 arousal       [Use] │
  │  — Arcane Nova    CPW 20   ⚠ Insufficient CPW            [——]  │
  └────────────────────────────────────────────────────────────────┘
```

---

## 6. INTIMACY VIEW

```
╔══ [GOLD BORDER] ═════════════════════════════════════════════════════════════════════════════╗
║  HUD  ❤ 142/200  ⚡ 95/150  ✦ 30/80  |  ☽ NIGHT  |  💰 340G  |  😴 ■□□□□  |  [≡ MENU]       ║
╠═══════════════════════════════╦═════════════════════════════════════════════════════════════╣
║                               ║                                                             ║
║  PARTNER PANEL                ║  SCENE NARRATIVE PANEL                                      ║
║  ─────────────────────────    ║  ─────────────────────────────────────────────────────────  ║
║  [Aria Portrait]              ║  "Her breath catches as your fingers trace along her neck.  ║
║  Scene type: CONSENSUAL       ║   She exhales slowly, eyes half-closed, her body arching   ║
║                               ║   imperceptibly toward you. 'Don't stop...' she murmurs,   ║
║  Arousal   ████████░░  72/100 ║   her voice low, almost embarrassed by itself."            ║
║  Stamina   ████████████ 110/120║                                                            ║
║  Wetness:  SLICK              ║  ─────────────────────────────────────────────────────────  ║
║                               ║  Turn 8  ·  Momentum ██████████ 8/10  (+15% arousal)       ║
║  Mental:   [AROUSED]          ║  Post-orgasm: NORMAL  ·  Sub-space: inactive               ║
║  Clothing: TOPLESS            ║  Consecutive repeat: 0  ·  Last act: whisper               ║
║  Position: Missionary         ║                                                             ║
║                               ╠═════════════════════════════════════════════════════════════╣
║  Resistance  ██░░░░░░  20/100 ║  POSITION PICKER          (switch cost: 5 STA)             ║
║                               ║  ─────────────────────────────────────────────────────────  ║
║  Pleasure peak: 63            ║  (●)Missionary  (○)Cowgirl  (○)Doggy   (○)Spooning         ║
║  Orgasms:       1             ║  (○)Lotus       (○)Lap      (○)Piledriver                  ║
║  Kinks hit:     2             ║  (○)FaceOral    (○)KneelOral (○)Fingering                  ║
║  Pain excess:   0             ║  (○)HandBreasts (○)Boobjob                                 ║
║  ─────────────────────────    ║  [◄ Prev page]                          [Next page ►]      ║
║  PLAYER PANEL                 ╠═════════════════════════════════════════════════════════════╣
║  STA  ████████████  95/150    ║  ACTION PICKER   (Position: Missionary)                     ║
║  Arousal  ████░░░░░  40/100   ║  ─────────────────────────────────────────────────────────  ║
║  Orgasms this scene: 0        ║  [SlowThrust][DeepThrust][G-Spot][Cervix][Kiss][NeckBite]  ║
║                               ║  [Whisper][Caress][PinchNipple][SqzAss][AssSpank][Slap]   ║
║                               ║  [HairPull][ForceHold][Strip][SelfStrip][GrabNeck]         ║
║                               ║  [Choke — needs neckGrab] [OrgasmDeny — arousal≥85: NO]   ║
║                               ║  [RopeBind ✦ needs rope] [Paddle ✦ needs paddle]           ║
║                               ║  [AttachVibrator ✦ needs item]                             ║
║                               ║  (greyed = gate not met / insufficient TEC / wrong pos)    ║
╠═══════════════════════════════╩═════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                 ║
║  [💊 Use Item]  [♂ Orgasm Inside]  [♂ Orgasm Outside]  [🔚 End Scene]                      ║
║  Scene status: Turn 8  ·  Player STA 95/150  ·  Start type: CONSENSUAL                     ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

**Fainted partner state variant (partner panel):**
```
  Mental:   [FAINTED ⬇]
  Life Force  ████████░░  80/100
  Post-faint DR: ×0.53  (turn 1)
  ⚠ Further acts drain Life Force
```

**Post-scene overlay:**
```
  ╔═════════════════════════════════════════╗
  ║  SCENE ENDED: Player Ended              ║
  ╠═════════════════════════════════════════╣
  ║  Satisfaction: 74/100  ◈ Good           ║
  ║  Pleasure Peak 63×0.4=25.2              ║
  ║  Orgasms      1×15   =15.0              ║
  ║  Kinks Hit    2×10   =20.0              ║
  ║  Pain Excess  0×-5   = 0.0              ║
  ║  ─────────────────────────────────────  ║
  ║  Player: +50 XP  TEC+1.0  AP+1         ║
  ║  Aria: Trust+8  Love+12  Mood: Afterglow║
  ║  Kink acquired: Restraint               ║
  ╠═════════════════════════════════════════╣
  ║              [ Continue ]               ║
  ╚═════════════════════════════════════════╝
```

---

## 7. DIALOGUE VIEW

```
╔══ [GOLD BORDER] ═════════════════════════════════════════════════════════════════════════════╗
║  HUD  ❤ 142/200  ⚡ 95/150  ✦ 30/80  |  ☀ MORNING 3/15  |  💰 340G  |  [≡ MENU]             ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  [Aria Portrait — speaking]     ARIA                                                 │   ║
║  │  ─────────────────────────────────────────────────────────────────────────────────   │   ║
║  │  "I found something on the road west of Thornspire. A collapsed campsite —           │   ║
║  │   looked like a merchant's outfit, but the cart was dragged off into the             │   ║
║  │   treeline. The miasma readings there were... unusual."                              │   ║
║  │                                                                                      │   ║
║  │  She watches your expression carefully.                                              │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                              ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  CHOICE BUTTONS                                                                      │   ║
║  │  ─────────────────────────────────────────────────────────────────────────────────   │   ║
║  │  [1] "We should investigate. Could be survivors."                                   │   ║
║  │      Trust +3 ↑   Love +2 ↑                          (shown on hover)              │   ║
║  │                                                                                      │   ║
║  │  [2] "Not our problem. Focus on the main route."                                    │   ║
║  │      Trust -1 ↓                                                                     │   ║
║  │                                                                                      │   ║
║  │  [3] "Mark it. We'll return when prepared."                                         │   ║
║  │      (no delta)                                                                     │   ║
║  │                                                                                      │   ║
║  │  ░░ [4] "I know a Purifier ritual for that area."  🔒 Req: Quest Thorngate done ░░  │   ║
║  │         (greyed — condition not met)                                                │   ║
║  │                                                                                      │   ║
║  │  ░░ [5] "The Sovereign network would pay for this." 🔒 Req: SOVEREIGN alignment ░░  │   ║
║  │         (greyed — alignment condition not met)                                      │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 8. MENUS — TABBED OVERLAY

### 8.0 Menu Shell

```
╔══════════════════════════════════════════════════════════════════════════════════════════════╗
║  MENU                                                                            [x Close]  ║
╠══════════════╦══════════════╦══════════════╦══════════════╦══════════════╗                  ║
║ 🎒 Inventory  ║  ✦ Skills    ║  📜 Quests   ║  👥 Contacts  ║  🏰 Manor    ║                  ║
╠══════════════╩══════════════╩══════════════╩══════════════╩══════════════╩════════════════╣
║                                                                                              ║
║  (active tab content renders here — §8.1 through §8.5)                                      ║
║                                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

### 8.1 INVENTORY TAB

```
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  🎒 INVENTORY                          Slots: 14 / 20              💰 Gold: 340             ║
║  ──────────────────────────────────────────────────────────────────────────────────────     ║
║                                                                                              ║
║  WEAPONS & ARMOR                                                                             ║
║  [Iron Sword +2]  ATK 12  Equipped   [Unequip]  [Forge Upgrade]                            ║
║  [Leather Vest]   DEF  8  Equipped   [Unequip]  [Forge Upgrade]                            ║
║  [Steel Axe]      ATK 18  In bag     [Equip]    [Upgrade]  [Drop]  [Sell 50G]              ║
║                                                                                              ║
║  CONSUMABLES                                                                                 ║
║  [Health Potion]    ×3   [Use]  [Drop]  [Give Gift]  [Sell 15G ea.]                        ║
║  [Aphrodisiac Gel]  ×2   [Use]  [Drop]  [Give Gift]  [Sell 40G ea.]                        ║
║  [Lubricant]        ×1   [Use]  [Drop]               [Sell 25G]                            ║
║  [Condom]           ×5   [Use]  [Drop]               [Sell 5G ea.]                         ║
║  [Diuretic]         ×1   [Use]  [Drop]               [Sell 30G]                            ║
║                                                                                              ║
║  TOOLS (non-consumable)                                                                      ║
║  [Rope]              ×1   (bondage acts)    [Drop]  [Sell 10G]                              ║
║  [Paddle]            ×1   (paddle acts)     [Drop]  [Sell 15G]                              ║
║  [Vaginal Vibrator]  ×1   (toy acts)        [Drop]  [Sell 35G]                              ║
║                                                                                              ║
║  MATERIALS                                                                                   ║
║  [Iron Ore]     ×5   [Drop]  [Craft]  [Sell 8G ea.]                                        ║
║  [Herb Bundle]  ×3   [Drop]  [Craft]  [Sell 12G ea.]                                       ║
║                                                                                              ║
║  GIFTS                                                                                       ║
║  [Silk Ribbon]  ×1   [Give Gift]  [Drop]  [Sell 25G]                                       ║
║                                                                                              ║
║  ⚠ Unsafe zone: Drop / Sell / Gift actions restricted.                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
```

---

### 8.2 SKILLS TAB

```
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ✦ SKILLS                                          Unspent BP: 3    Unspent AP: 1          ║
║  ──────────────────────────────────────────────────────────────────────────────────────     ║
║                                                                                              ║
║  ┌────────────────────────────────────────┐   ┌───────────────────────────────────────────┐ ║
║  │  BATTLE TREE           BP left: 3      │   │  ARDOR TREE              AP left: 1       │ ║
║  │  ──────────────────────────────────    │   │  ───────────────────────────────────────  │ ║
║  │  [✓ Iron Guard — PASSIVE]  unlocked    │   │  [✓ Gentle Touch — PASSIVE]  unlocked     │ ║
║  │       │                               │   │        │                                   │ ║
║  │  [✓ War Cry — ACTIVE]  CPW 8           │   │  [✓ Arousal Read — PASSIVE]  unlocked     │ ║
║  │       │                               │   │        │                                   │ ║
║  │  [✓ Iron Cleave — ACTIVE]  CPW 5       │   │  [✓ Kink Sense — PASSIVE]    unlocked     │ ║
║  │       │                               │   │        │                                   │ ║
║  │  [◈ Armour Break — ACTIVE]  2 BP       │   │  [◈ Overstim Mastery]  2 AP               │ ║
║  │       │     Req: Iron Cleave ✓         │   │        │    Req: Kink Sense ✓              │ ║
║  │  [░ Whirlwind]  3 BP  locked           │   │  [░ Subspace Trigger]  3 AP  locked        │ ║
║  │       Req: Armour Break first          │   │        Req: Overstim Mastery first         │ ║
║  │  [Reset Battle Tree — 500G]            │   │  [Reset Ardor Tree — 500G]                 │ ║
║  └────────────────────────────────────────┘   └───────────────────────────────────────────┘ ║
║                                                                                              ║
║  NODE DETAIL (hover: Armour Break)                                                           ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  Armour Break · Battle · Active · CPW 10 · Cost: 2 BP · Prereq: Iron Cleave ✓       │   ║
║  │  Effect: Reduce target DEF by 25% for 3 turns. Max 1 stack.                         │   ║
║  │                                              [ Spend 2 BP — Unlock ]                │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
```

---

### 8.3 QUESTS TAB

```
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  📜 QUESTS         [ Active (3) ]   [ Available (5) ]   [ Completed (12) ]                  ║
║  ──────────────────────────────────────────────────────────────────────────────────────     ║
║                                                                                              ║
║  ACTIVE ──────────────────────────────────────────────────────────────────────────────────  ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  ✦ MAIN  ·  Ch. 3 — The Miasma Vein                                                 │   ║
║  │  Reach the Miasma Spire in the Eastern Wastes before the convergence.                │   ║
║  │  ✓ Speak with the Elder · ✓ Obtain Purification Seal                                │   ║
║  │  □ Travel to Eastern Wastes (0/1) · □ Defeat the Vein Guardian (0/1)               │   ║
║  │  Reward: 500 XP · 200G · Purification Crystal                                      │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  ♥ COMPANION  ·  Aria's Past — The Iron Gate                                        │   ║
║  │  ✓ Aria Trust ≥60 (74 ✓) · □ Travel to Irongate with Aria in party (0/1)           │   ║
║  │  Reward: Aria Stage 2 unlock · 300 XP                                               │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  📋 BOARD  ·  Clear the Goblin Camp  (Repeatable · cooldown 5d · 2d remaining)       │   ║
║  │  □ Kill 10 Goblins (6/10) · Reward: 150G · +20 Rep                                 │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                              ║
║  AVAILABLE ───────────────────────────────────────────────────────────────────────────────  ║
║  📋 Retrieve the Lost Shipment          Req: —                      [ Accept ]             ║
║  📋 Escort Merchant to Coldvale         Req: —                      [ Accept ]             ║
║  ✦  [Purifier] The Sealed Spring        Req: PURIFIER alignment     [ Accept ]             ║
║  ✦  [Sovereign] The Warden's Ledger    Req: SOVEREIGN alignment    ░ Locked ░             ║
║  ♥  Kira's Trial                        Req: Kira Stage 1 done     ░ Locked ░             ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
```

---

### 8.4 CONTACTS TAB

```
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  👥 CONTACTS                   Total: 24 / 400           [ Search: _______________ ]        ║
║  Sort: (●) Relationship  (○) Name  (○) Quest Stage  (○) Location                          ║
║  ──────────────────────────────────────────────────────────────────────────────────────     ║
║  ┌──────┬─────────────────────────┬──────────┬────────────────────────┬──────────────────┐  ║
║  │ Port │ Name / Race             │ Bond     │ Trust        Love      │ Location / Stage  │  ║
║  ╠══════╪═════════════════════════╪══════════╪════════════════════════╪══════════════════╣  ║
║  │[Aria]│ Aria · Human · ♥ Comp. │ DEVOTED  │ ████████ 74  ██████ 62 │ In Party · SQ 1  │  ║
║  │[Kira]│ Kira · Fox Girl · ♥    │ ATTACHED │ ██████░░ 55  █████░░ 48│ In Party · —     │  ║
║  │[Mira]│ Mira · Human · Merchant│ FAMILIAR │ ███░░░░░ 28  ██░░░░░ 18│ Market · —       │  ║
║  │ [?] │ Guard · Human           │ ACQUAINT │ ██░░░░░░ 12  ░░░░░░░  2│ Market Gate · — │  ║
║  └──────┴─────────────────────────┴──────────┴────────────────────────┴──────────────────┘  ║
║                ▼  (24 entries — scroll)                                                      ║
║  [ Inspect Profile ] [ Add to Party ] [ Move to Suite ] [ Dismiss ] [◄ Prev] [Next ►]       ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
```

---

### 8.5 MANOR TAB

```
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  🏰 MANOR                                                       Tier: 2 / 6                ║
║  ──────────────────────────────────────────────────────────────────────────────────────     ║
║  ✓ Tier 1 · Storage (20 slots) · Player Bedroom                                            ║
║  ✓ Tier 2 · Crafting Bench · 1 Suite                                                       ║
║  ◈ Tier 3 · 3 Suites · +10 storage     Cost: 2,000G · Oak Timber×5 · 3 days               ║
║    [ Begin Construction ]                                                                   ║
║  ░ Tier 4 · Alchemy Lab · 5 Suites     (locked — build Tier 3 first)                       ║
║  ░ Tier 5 · Workshop · 8 Suites        (locked)                                            ║
║  ░ Tier 6 · Full Estate · Unlimited    (locked)                                            ║
║                                                                                              ║
║  ACTIVE CONSTRUCTION: (none)                                                                 ║
║                                                                                              ║
║  CRAFTING BENCH                                                                              ║
║  Active Job: Health Potion ×2 — ready in 1 day     [ Cancel ]                              ║
║  [ Open Crafting Bench ]                                                                    ║
║                                                                                              ║
║  SUITES (Tier 2: 1 available)                                                               ║
║  Suite 1: Aria   · Passive: 12G/day   [ Collect: 36G (3d) ]  [ Manage ]                   ║
║                                                                                              ║
║  ⚠ Manor management locked while in Unsafe exploration zone.                                ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
```

---

## 9. EQUIPMENT MANAGEMENT VIEW

*Three-region layout. Left HUD unchanged. Active Character Profile Header and all gear sits in Middle Canvas. Back button anchored at hotbar Row 3, Col 7.*

```
╔══ [GOLD BORDER] ═════════════════════════════════════════════════════════════════════════════╗
║  HUD  ❤ 142/200  ⚡ 95/150  ✦ 30/80  |  ☽ NIGHT 7/15  |  💰 340G  |  [≡ MENU]              ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  ┌─────────────────────────────────── MIDDLE CANVAS ──────────────────────────────────────┐ ║
║  │                                                                                        │ ║
║  │  ACTIVE CHARACTER PROFILE HEADER   (upper section of Middle Canvas)                   │ ║
║  │  Player · Warrior · Lv. 12   ATK 28   DEF 18   CRIT 6%   EVA 4%                       │ ║
║  │  ────────────────────────────────────────────────────────────────────────────────────  │ ║
║  │                                                                                        │ ║
║  │  EQUIPMENT SLOT MATRIX   (6-block grid — centre of Middle Canvas)                     │ ║
║  │                                                                                        │ ║
║  │   ┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐           │ ║
║  │   │  HEAD              │    │  WEAPON  ◈          │    │  OFF-HAND          │           │ ║
║  │   │  [Empty]           │    │  Iron Sword +2      │    │  [Empty]           │           │ ║
║  │   │  [ Equip ]         │    │  ATK 12             │    │  [ Equip ]         │           │ ║
║  │   │                    │    │  [Unequip][Forge]   │    │                    │           │ ║
║  │   └────────────────────┘    └────────────────────┘    └────────────────────┘           │ ║
║  │   ┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐           │ ║
║  │   │  CHEST  ◈          │    │  HANDS             │    │  LEGS              │           │ ║
║  │   │  Leather Vest      │    │  [Empty]           │    │  [Empty]           │           │ ║
║  │   │  DEF 8             │    │  [ Equip ]         │    │  [ Equip ]         │           │ ║
║  │   │  [Unequip][Forge]  │    │                    │    │                    │           │ ║
║  │   └────────────────────┘    └────────────────────┘    └────────────────────┘           │ ║
║  │                                                                                        │ ║
║  │  VALID STORAGE CARGO GRID   (focused slot: WEAPON — scrollable below slots)            │ ║
║  │  ────────────────────────────────────────────────────────────────────────────────────  │ ║
║  │  [Iron Sword +2]  ATK 12  (Equipped)       [Unequip]                                   │ ║
║  │  [Steel Axe]      ATK 18  In bag           [Equip]  [Upgrade→+1: 80G, Iron Ore×2]      │ ║
║  │  [Bone Dagger]    ATK  8  In bag           [Equip]  [Upgrade→+1: 30G]                  │ ║
║  │                                                                                        │ ║
║  └────────────────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR  (hotbar — contextual item modifiers)                                           ║
║  R1: [Equip Selected] [Unequip Slot] [Forge Upgrade] [Laboratory Mutation] [Discard Loot]  ║
║  R2: [  ——  ] [  ——  ] [  ——  ] [  ——  ] [  ——  ] [  ——  ] [  ——  ]                      ║
║  R3: [  ——  ] [  ——  ] [  ——  ] [  ——  ] [  ——  ] [  ——  ] [ ◄ Back ]  ← R3C7            ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 10. SKILL TREES VIEW

*Three-region layout. BP/AP currency pools in canvas rows. Node matrix in Middle Canvas split dual-pane. Node detail tooltip maps to top of Right Panel.*

```
╔══ [GOLD BORDER] ═════════════════════════════════════════════════════════════════════════════╗
║  HUD  ❤ 142/200  ⚡ 95/150  ✦ 30/80  |  ☽ NIGHT 7/15  |  💰 340G  |  [≡ MENU]              ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  ┌──────────────────── MIDDLE CANVAS ─────────────────────┐  ┌──── RIGHT PANEL ────────────┐ ║
║  │                                                        │  │                             │ ║
║  │  AVAILABLE UPGRADE CURRENCY POOLS                      │  │  NODE DETAIL                │ ║
║  │  Battle Points [BP]: 3 unspent                         │  │  ─────────────────────────  │ ║
║  │  Ardor Points  [AP]: 1 unspent                         │  │  (select a node to populate)│ ║
║  │  ──────────────────────────────────────────────────    │  │                             │ ║
║  │                                                        │  │  Armour Break               │ ║
║  │  SIDE-BY-SIDE NODE MATRIX                              │  │  Battle · Active            │ ║
║  │  ┌───────────────────────┬───────────────────────┐     │  │  CPW: 10                    │ ║
║  │  │   BATTLE TREE         │   ARDOR TREE          │     │  │  Cost: 2 BP                 │ ║
║  │  │   ─────────────────   │   ─────────────────   │     │  │  Prereq: Iron Cleave ✓      │ ║
║  │  │   [✓ Iron Guard]      │   [✓ Gentle Touch]    │     │  │                             │ ║
║  │  │         │             │         │             │     │  │  Effect: -25% target DEF    │ ║
║  │  │   [✓ War Cry]         │   [✓ Arousal Read]    │     │  │  for 3 turns. Max 1 stack.  │ ║
║  │  │         │             │         │             │     │  │                             │ ║
║  │  │   [✓ Iron Cleave]     │   [✓ Kink Sense]      │     │  │  Active/Passive: Active     │ ║
║  │  │         │             │         │             │     │  │  CPW cost: 10               │ ║
║  │  │  [◈ Armour Break]     │  [◈ Overstim Master]  │     │  │                             │ ║
║  │  │    2 BP · ← selected  │    2 AP               │     │  │  [ Spend 2 BP — Unlock ]    │ ║
║  │  │         │             │         │             │     │  │                             │ ║
║  │  │  [░ Whirlwind]        │  [░ Subspace Trigger]  │     │  └─────────────────────────────┘ ║
║  │  │    3 BP · locked      │    3 AP · locked      │     │                               ║
║  │  └───────────────────────┴───────────────────────┘     │                               ║
║  │                                                        │                               ║
║  │  ✓ = Unlocked   ◈ = Available   ░ = Locked             │                               ║
║  └────────────────────────────────────────────────────────┘                               ║
║                                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                 ║
║  [Spend Point] [Reset Battle Tree] [Reset Ardor Tree] [Toggle B-view] [Toggle A-view] [Return to Map] ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 11. CONTACTS & DETAILED PROFILES VIEW

*Three-region layout. Directory (up to 400 rows) in Middle Canvas. Deep metrics sub-tabs populate top of Right Panel on row click.*

```
╔══ [GOLD BORDER] ═════════════════════════════════════════════════════════════════════════════╗
║  HUD  ❤ 142/200  ⚡ 95/150  ✦ 30/80  |  ☽ NIGHT 7/15  |  💰 340G  |  [≡ MENU]              ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  ┌─────────────────────────── MIDDLE CANVAS ───────────────────────┐  ┌─── RIGHT PANEL ────┐║
║  │                                                                 │  │                    │║
║  │  SORTED CONTACTS DIRECTORY        24 / 400                      │  │  DEEP METRICS      │║
║  │  [ Search: ________________ ]                                   │  │  (row click popul.)│║
║  │  Sort: (●) Relationship  (○) Name  (○) Quest Stage             │  │                    │║
║  │  ─────────────────────────────────────────────────────────────  │  │  Aria              │║
║  │  ┌──────┬──────────────────┬──────────┬──────────────┬───────┐  │  │  ─────────────── │║
║  │  │ Port │ Name / Race      │ Bond     │ Trust  Love  │Loc/SQ │  │  │                  │║
║  │  ╠══════╪══════════════════╪══════════╪══════════════╪═══════╣  │  │  [ Tab 1: Bio ]   │║
║  │  │[Aria]│ Aria · Human     │ DEVOTED  │  74     62   │Party/1│  │  │  [ Tab 2: Phys ]  │║
║  │  │[Kira]│ Kira · Fox Girl  │ ATTACHED │  55     48   │Party/—│  │  │  [ Tab 3: Psych]  │║
║  │  │[Mira]│ Mira · Human     │ FAMILIAR │  28     18   │Market │  │  │                  │║
║  │  │ [?] │ Guard · Human    │ ACQUAINT │  12      2   │Gate/— │  │  │  ── Tab 1 ──      │║
║  │  └──────┴──────────────────┴──────────┴──────────────┴───────┘  │  │  Trust  ████ 74   │║
║  │                 ▼ (24 entries — scroll)                          │  │  Love   ████ 62   │║
║  │                                                                 │  │  Bond: DEVOTED    │║
║  └─────────────────────────────────────────────────────────────────┘  │  Status: Devoted  │║
║                                                                        │  Companion        │║
║                                                                        │  Occupation:      │║
║                                                                        │  Wanderer         │║
║                                                                        │  Origin: Thornspr.│║
║                                                                        │  Mother/Father: — │║
║                                                                        │  Quest Stage: 1/5 │║
║                                                                        │                  │║
║                                                                        │  ── Tab 2 ──      │║
║                                                                        │  (click Tab 2)    │║
║                                                                        │  Height: 165cm    │║
║                                                                        │  Bust: 86cm  C    │║
║                                                                        │  Virginity: No    │║
║                                                                        │  Pregnant: No     │║
║                                                                        │  Lactating: No    │║
║                                                                        │                  │║
║                                                                        │  ── Tab 3 ──      │║
║                                                                        │  (click Tab 3)    │║
║                                                                        │  Dominant: Nurture│║
║                                                                        │  Kinks: Restraint │║
║                                                                        │  Resist: COMPLY   │║
║                                                                        └────────────────────┘║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                 ║
║  [Inspect Details] [Assign to Party] [Move Into Suite] [Dismiss From Pool] [◄ Page] [Page ►] [Close] ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 12. ACHIEVEMENTS VIEW

*Three-region layout. Trophy grid in Middle Canvas. Reward detail in top of Right Panel.*

```
╔══ [GOLD BORDER] ═════════════════════════════════════════════════════════════════════════════╗
║  HUD  ❤ 142/200  ⚡ 95/150  ✦ 30/80  |  ☽ NIGHT 7/15  |  💰 340G  |  [≡ MENU]              ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  ┌──────────────────────── MIDDLE CANVAS ──────────────────────────┐  ┌─── RIGHT PANEL ────┐║
║  │                                                                 │  │                    │║
║  │  MILESTONE TROPHY GRID            Earned: 8 / 47               │  │  REWARD YIELD BOX  │║
║  │  Filter: (●)All (○)Unlocked (○)Locked  Sort:(●)Tier            │  │  ─────────────────  │║
║  │  ─────────────────────────────────────────────────────────────  │  │  Miasma Purifier   │║
║  │                                                                 │  │  Tier: Gold        │║
║  │  ── PLATINUM ────────────────────────────────────────────────   │  │                    │║
║  │  ░ [?????] The Weight of What You've Built     LOCKED           │  │  Requirement:      │║
║  │            Req: Complete Final Convergence Quest                │  │  Reach PURIFIER    │║
║  │                                                                 │  │  dominant alignment│║
║  │  ── GOLD ────────────────────────────────────────────────────   │  │  (score ≥ 40)      │║
║  │  ✦ [✓] Miasma Purifier   ← SELECTED                            │  │                    │║
║  │         Title: Purifier · +5 AP                                 │  │  Reward:           │║
║  │  ░ [?] The Sovereign's Mark    LOCKED  Req: SOVEREIGN align     │  │  +5 AP             │║
║  │  ░ [?] Coin of Both Sides      LOCKED  Req: PRAGMATIST align    │  │  Title: Purifier   │║
║  │                                                                 │  │                    │║
║  │  ── SILVER ──────────────────────────────────────────────────   │  │  Status:           │║
║  │  ✦ [✓] First Blood      First combat kill.         +2 BP        │  │  ✓ UNLOCKED        │║
║  │  ✦ [✓] Into the Dark    Night phase 10 times.      +2 AP        │  │  Day 14            │║
║  │  ░ [?] Undying Will     LOCKED  Req: Revive 5 times             │  │                    │║
║  │                                                                 │  └────────────────────┘║
║  │  ── BRONZE ──────────────────────────────────────────────────   │                        ║
║  │  ✦ [✓] First Steps      Character Creation done.   +1 BP        │                        ║
║  │  ✦ [✓] A Name to a Face Individuate first NPC.     +1 AP        │                        ║
║  │  ✦ [✓] Blood and Stone  Win first combat.          +1 BP        │                        ║
║  │  ✦ [✓] Kindled          First intimacy scene.      +1 AP        │                        ║
║  │  ✦ [✓] Pack Leader      First companion in party.  +1 BP        │                        ║
║  │  ░ [?] Builder's Eye    LOCKED  Req: Manor Tier 2+              │                        ║
║  └─────────────────────────────────────────────────────────────────┘                        ║
║                                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION BAR                                                                                 ║
║  [Filter: Show All] [Filter: Unlocked] [Filter: Locked] [Sort: Tier Ranks] [Close System Menu] ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 13. PROFILE VIEW (player / contact)

*Pending full design per PRD note. Middle Canvas carries scrollable profile. Back button returns to previous view.*

```
╔══ [GOLD BORDER] ═════════════════════════════════════════════════════════════════════════════╗
║  HUD  ❤ 142/200  ⚡ 95/150  ✦ 30/80  |  ☽ NIGHT 7/15  |  💰 340G  |  [≡ MENU]              ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  PROFILE: Aria                                                  [ ◄ Back ]                  ║
║  ──────────────────────────────────────────────────────────────────────────────────────     ║
║                                                                                              ║
║  ┌──────────────────────────────────── MIDDLE CANVAS (scrollable) ───────────────────────┐  ║
║  │                                                                                        │  ║
║  │  ┌──────────────────┐    Aria · Human · Female · Age 24                               │  ║
║  │  │                  │    Occupation: Wanderer · Origin: Thornspire                    │  ║
║  │  │  [Aria Portrait] │    Companion Lv. 8  ·  XP: 340/400                             │  ║
║  │  │                  │    Status: In Party · Suite: None                               │  ║
║  │  └──────────────────┘    Pregnant: No  ·  Lactating: No  ·  Virginity: No            │  ║
║  │                                                                                        │  ║
║  │  RELATIONSHIP                                                                          │  ║
║  │  Trust ████████░░  74    Love ████████░░  62    Bond: DEVOTED                         │  ║
║  │  16-cell status: Devoted Companion                                                     │  ║
║  │  Flirts today: 1/3   Touches today: 0/3                                               │  ║
║  │                                                                                        │  ║
║  │  STATS                                                                                 │  ║
║  │  STR 14  AGI 16  WIS 10  DEF 12  LCK 11                                               │  ║
║  │                                                                                        │  ║
║  │  PHYSICAL                                                                              │  ║
║  │  Height 165cm · Bust 86cm · Waist 60cm · Hip 88cm · Cup C · Type: Toned               │  ║
║  │  Skin: Fair · Hair: Auburn long · Race: Human (no special features)                   │  ║
║  │                                                                                        │  ║
║  │  PHYSIOLOGY                                                                            │  ║
║  │  Wetness baseline: Moderate · Orgasm ease: Easy · Dominant: Vaginal                   │  ║
║  │  Multiple cap: Yes · Squirt cap: Yes · Fertility: 72% · Cycle day: 14                 │  ║
║  │  Sensitivity: Nipple High · Vagina VHigh · Clit High · Ears High                      │  ║
║  │                                                                                        │  ║
║  │  PSYCHOLOGY                                                                            │  ║
║  │  Dominant trait: Nurturing · Hidden desires: Submission                                │  ║
║  │  Resistance profile: COMPLY (baseline 30) · Corruption: 38 · Shame: 22               │  ║
║  │  Acquired kinks: Restraint · Praise · Neck play                                       │  ║
║  │  Current mood: Afterglow ✦                                                            │  ║
║  │                                                                                        │  ║
║  │                                          ▼ scroll for more                            │  ║
║  └────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 14. DEFEAT / GAME OVER VIEW

*(Full-viewport — no HUD, no three-panel structure)*

```
╔══════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                              ║
║                                                                                              ║
║                    ╔════════════════════════════════════════════════════╗                    ║
║                    ║                                                    ║                    ║
║                    ║     Y O U R   S O U L   S P L I N T E R S        ║                    ║
║                    ║                                                    ║                    ║
║                    ╚════════════════════════════════════════════════════╝                    ║
║                                                                                              ║
║            ┌─────────────────────────────────────────────────────────────────┐              ║
║            │  LOSS MANIFEST PANEL                                            │              ║
║            │  ─────────────────────────────────────────────────────────────  │              ║
║            │  Gold lost:      -85G   (10% death tax)                         │              ║
║            │  Items damaged:  Iron Sword +2 → Cracked (-1 ATK)               │              ║
║            │  Stat scars:     -5 max Stamina (until next safe rest)           │              ║
║            │  Reputation:     Thornspire -10 (fled battlefield)               │              ║
║            │  Fatigue:        +1                                              │              ║
║            └─────────────────────────────────────────────────────────────────┘              ║
║                                                                                              ║
║            ┌─────────────────────────────────────────────────────────────────┐              ║
║            │  RE-ANCHORING COMMAND MENU                                      │              ║
║            │                                                                 │              ║
║            │    [ Awake at Manor ]                                           │              ║
║            │      Respawn at base. Penalties applied. No save overwrite.     │              ║
║            │                                                                 │              ║
║            │    [ Load Last Autorecord ]                                     │              ║
║            │      Day 14 · Night phase · Thornspire Market                   │              ║
║            │                                                                 │              ║
║            │    [ Return to Title Screen ]                                   │              ║
║            └─────────────────────────────────────────────────────────────────┘              ║
║                                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 15. EXPLORATION ENCOUNTER VIEW

*(Replaces grid canvas temporarily — HUD persists)*

```
╔══ [CRIMSON BORDER — UNSAFE] ═════════════════════════════════════════════════════════════════╗
║  HUD strip                                                                      [≡ MENU]     ║
╠══════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                              ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  ⚠  A N   A M B U S H   I N   T H E   D A R K                                      │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                              ║
║  DYNAMIC EVENT LOG                                                                           ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  The road narrows between two collapsed walls. Crossbow bolts streak from the        │   ║
║  │  ridge. A score of masked figures drops from the overhang.                           │   ║
║  │  "Coin or blood, traveller."                                                         │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                              ║
║  STAT-CHECK INTERACTIVE ACTIONS                                                              ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  [ ⚔ Fight Back ]                  — Initiates combat encounter                    │   ║
║  │  [ 🏃 Agility Test: Flee ]         Success: 68%  (AGI 18 vs bandit avg 12)         │   ║
║  │  [ 💰 Pay the toll — 50G ]         Requires: 50G  (you have 340G ✓)               │   ║
║  │  [ 🗣 Bluff (WIS check) ]           Success: 45%  (WIS 12)                          │   ║
║  │  ░░ [ Intimidate — SOVEREIGN only ] Req: SOVEREIGN alignment   ← locked ░░         │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                              ║
║  RESOLUTION WINDOW   (populates after choice)                                               ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────┐   ║
║  │  You bolt left, vault the wall at full sprint. Bolts crack stone inches behind you.  │   ║
║  │  Result: -5 Stamina · Gold intact · HP intact                                       │   ║
║  └──────────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                              ║
║                                                        [ ▶ Proceed ]                        ║
╚══════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## SUMMARY INDEX

| # | View | Layout | HUD |
|---|------|--------|-----|
| 1 | HUD Overlay | Persistent top bar | — |
| 2 | Title Screen | Full-viewport | No |
| 3 | Character Creation | Full-viewport | No |
| 4 | Unified Spatial Exploration | Grid canvas + Inspector Lens sidebar | Yes |
| 5 | Combat | Initiative strip + combatant panels + log | Yes |
| 6 | Intimacy | Partner panel + narrative + pickers | Yes |
| 7 | Dialogue | Speaker + text + choice buttons | Yes |
| 8.0–8.5 | Menus (5 tabs) | Tabbed overlay | Yes (behind) |
| 9 | Equipment Management | Three-region · Back at R3C7 | Yes |
| 10 | Skill Trees | Three-region · Node detail → Right Panel | Yes |
| 11 | Contacts & Profiles | Three-region · Metrics → Right Panel | Yes |
| 12 | Achievements | Three-region · Reward → Right Panel | Yes |
| 13 | Profile View | Middle Canvas scrollable · Back button | Yes |
| 14 | Defeat / Game Over | Full-viewport | No |
| 15 | Exploration Encounter | Replaces canvas temporarily | Yes |
