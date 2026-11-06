# OJISAN IN ANOTHER WORLD — COMPLETE UI SPECIFICATION
# Every screen, shell, panel, overlay, modal, and toast.
# Format: ASCII art + field annotations. Use as Figma source.
# Width standard: full views = 97 chars; large modals = 74; small modals = 52.
#
# SAFETY BORDER COLORS (map to Figma frame fills):
#   ╔══[GOLD — SAFE]══       → gold border    — safe zones (menus, town, manor)
#   ╔══[IRON — FORTIFIED]══  → grey border    — dungeons, indoor non-safe
#   ╔══[CRIMSON — UNSAFE]══  → red border     — wilderness, combat zones
#   ╔══[NO HUD]══             → no color      — title, cutscene, full-screen modals
#
# ACTION BAR ROWS (bottom of full views):
#   R1: 7 contextual action slots (C1–C7)
#   R3: 7 navigation slots, R3C7 is always Back/Primary nav
#
# HUD STRIP (top of full views, carried into modals):
#   ❤HP/MAX  ⚡STA/MAX  ✦CPW/MAX  |  ☽PHASE DAY/MAX  |  💰GOLD  |  ◈ALIGNMENT  |  [≡MENU]
# ═══════════════════════════════════════════════════════════════════════════════════════════════
#
# INDEX
# ─────
# PART A — FRAME SYSTEM & HUD SHELLS
# PART B — TITLE SCREEN & SYSTEM SCREENS
# PART C — CHARACTER CREATION FLOW
# PART D — SPATIAL EXPLORATION
# PART E — WORLD MAP
# PART F — COMBAT
# PART G — DIALOGUE & STORY
# PART H — INTIMACY
# PART I — MENUS: INVENTORY & QUESTS
# PART J — SHOPS & ECONOMY
# PART K — SKILLS & EQUIPMENT
# PART L — CONTACTS, RELATIONSHIPS & PARTY
# PART M — MANOR, WARDROBE & HOLDINGS
# PART N — TAMING & FACTIONS
# PART O — OVERLAYS, TOASTS & NOTIFICATIONS
# PART P — ACHIEVEMENTS & PROFILE
# ═══════════════════════════════════════════════════════════════════════════════════════════════


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART A — FRAME SYSTEM & HUD SHELLS
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## A1. THREE-PANEL LAYOUT TEMPLATE (Safe Zone)
# Used by: Exploration, Contacts, Skills, Equipment, Manor, Wardrobe
# Left panel = HUD (fixed). Middle = main content. Right = inspector/detail.

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☽NIGHT  7/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]             ║
╠══════════════════════╦════════════════════════════════════════════╦═══════════════════════════════╣
║                      ║                                            ║                               ║
║  LEFT PANEL (HUD)    ║  MIDDLE CANVAS                             ║  RIGHT PANEL (INSPECTOR)      ║
║  ─────────────────   ║  ─────────────────────────────────────     ║  ─────────────────────────    ║
║  PLAYER VITALS       ║                                            ║                               ║
║  ❤ ████████░░ 142    ║  < main view content here >                ║  < contextual detail here >   ║
║  ⚡ ██████░░░░  95   ║                                            ║                               ║
║  ✦ ███░░░░░░░  30   ║                                            ║                               ║
║  MP ████████░  200   ║                                            ║                               ║
║                      ║                                            ║                               ║
║  PARTY STRIP         ║                                            ║                               ║
║  👤Aria   ████████   ║                                            ║                               ║
║  👤Mira   ██████░░   ║                                            ║                               ║
║  👤Downed ░░░░░░░░   ║                                            ║                               ║
║                      ║                                            ║                               ║
║  CLOCK               ║                                            ║                               ║
║  ☽ NIGHT             ║                                            ║                               ║
║  Phase 7 of 15       ║                                            ║                               ║
║  Day 14  Spring      ║                                            ║                               ║
║                      ║                                            ║                               ║
║  GOLD                ║                                            ║                               ║
║  💰 340G             ║                                            ║                               ║
║  📦 14/20 slots      ║                                            ║                               ║
║                      ║                                            ║                               ║
║  ALIGNMENT           ║                                            ║                               ║
║  ◈ PRAGMATIST        ║                                            ║                               ║
║                      ║                                            ║                               ║
║  FATIGUE             ║                                            ║                               ║
║  😴 Tier I (mild)    ║                                            ║                               ║
║                      ║                                            ║                               ║
╠══════════════════════╩════════════════════════════════════════════╩═══════════════════════════════╣
║  R1: [Action 1] [Action 2] [Action 3] [Action 4] [Action 5] [Action 6] [Action 7]                ║
║  R3: [Nav 1   ] [Nav 2   ] [Nav 3   ] [Nav 4   ] [Nav 5   ] [Nav 6   ] [◄ Back  ]  ← R3C7        ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## A2. HUD STRIP — SAFE ZONE (Gold border)
# Used as the top bar in every full view when in a safe zone.

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200  ⚡95/150  ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]          ║
```

---

## A3. HUD STRIP — UNSAFE ZONE (Crimson border)

```
╔══[CRIMSON — UNSAFE]═════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200  ⚡95/150  ✦30/80  |  🌙MIDNIGHT  14/15  |  💰340G  |  ◈SOVEREIGN  |  [≡ MENU]        ║
```

---

## A4. HUD STRIP — FORTIFIED (Iron border, indoor non-safe)

```
╔══[IRON — FORTIFIED]═════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200  ⚡95/150  ✦30/80  |  ☽NIGHT  11/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
```

---

## A5. FULL LEFT HUD PANEL — ALL STATES

```
╠══════════════════════╣
║  PLAYER VITALS       ║  ← always visible
║  ❤ HP                ║
║  ████████████  200   ║  ← full health
║  ████████░░░░  142   ║  ← partial
║  ████░░░░░░░░   80   ║  ← wounded
║  ██░░░░░░░░░░   40   ║  ← critical (red tint)
║  ░░░░░░░░░░░░    0   ║  ← dead (grey)
║                      ║
║  ⚡ STA               ║
║  ████████░░░░   95   ║
║                      ║
║  ✦ CPW               ║
║  ███░░░░░░░░░   30   ║
║                      ║
║  MP ████████░  200   ║
║                      ║
║  PARTY STRIP         ║  ← shows up to 3 companions
║  👤 Aria   HP████    ║  ← active companion
║  👤 Mira   HP██░░    ║  ← wounded
║  👤 Downed ░░░░░ ✕   ║  ← downed companion (red ✕)
║  (expand for detail) ║
║                      ║
║  CLOCK & DATE        ║
║  ☀ MORNING           ║  ← phase name
║  Phase  1 / 15       ║  ← phases: MORNING/MIDDAY/AFTERNOON/
║  Day 14  Spring      ║     EVENING/NIGHT/MIDNIGHT/DAWN
║  Yr 1    Thornspire  ║  ← current node name
║                      ║
║  RESOURCES           ║
║  💰 340G             ║
║  📦 14 / 20 slots    ║
║                      ║
║  ALIGNMENT           ║
║  ◈ PRAGMATIST (+12)  ║
║  [SVRN◄────●────►PUR]║  ← mini alignment bar
║                      ║
║  FATIGUE             ║
║  😴 Tier I — Mild    ║  ← Tier I–V
║  (no penalty)        ║
║                      ║
║  DEBUFFS             ║  ← visible if any active
║  🔥 BURNING ×2  2t   ║  ← status effect + stacks + turns
║  💀 WEAKENED    1t   ║
╠══════════════════════╣
```

---

## A6. FATIGUE TIER STATES (HUD left panel variant)

```
  Tier 0 — None:        ✓ No fatigue indicator shown
  Tier I — Mild:        😴 Tier I — Mild      (no penalty)
  Tier II — Tired:      😴 Tier II — Tired    (action cost +1)
  Tier III — Exhausted: 😴 Tier III — Exhausted (all checks −10%)
  Tier IV — Drained:    😴 Tier IV — Drained  (STA max −25%)
  Tier V — Collapse:    💀 Tier V — COLLAPSE  (forced teleport to last safe node)
```

---

## A7. ACTION BAR FULL SPEC

```
╠═════════════════════════════════════════════════════════════════════════════════════════════════╣
║  R1: [C1 — Label ] [C2 — Label ] [C3 — Label ] [C4 — Label ] [C5 — Label ] [C6 ——] [C7 ——]    ║
║                                                                                                 ║
║  R3: [C1 — Label ] [C2 — Label ] [C3 — Label ] [C4 — Label ] [C5 — Label ] [C6 ——] [◄ Back ]  ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝

  Button states:
    [Label     ]  → active/clickable
    [Label   ✗ ]  → locked / insufficient resource (red tint)
    [——        ]  → empty slot (greyed, no action)
    [Label   ✓ ]  → selected/toggled state
    [Label  ⚠  ]  → warning (e.g. unsafe action, gold cost)
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART B — TITLE SCREEN & SYSTEM SCREENS
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## B1. TITLE SCREEN

```
╔══[NO HUD — TITLE]═══════════════════════════════════════════════════════════════════════════════╗
║                                                                                                 ║
║                            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                               ║
║                            ░                                   ░                               ║
║                            ░   [atmospheric illustration /     ░                               ║
║                            ░    animated background art        ░                               ║
║                            ░    — smoke, red dust drift,       ░                               ║
║                            ░      ambient particles]           ░                               ║
║                            ░                                   ░                               ║
║                            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                               ║
║                                                                                                 ║
║                          ┌───────────────────────────────────────┐                             ║
║                          │                                       │                             ║
║                          │      OJISAN IN ANOTHER WORLD          │                             ║
║                          │      ━━━━━━━━━━━━━━━━━━━━━━━━         │                             ║
║                          │      [custom dark-fantasy logotype]   │                             ║
║                          │                                       │                             ║
║                          └───────────────────────────────────────┘                             ║
║                                                                                                 ║
║                                   v0.1.0  ·  Antitigravity                                     ║
║                                                                                                 ║
╠═════════════════════════════════════════════════════════════════════════════════════════════════╣
║  R1: [NEW GAME  ] [CONTINUE   ] [NEW GAME+ ] [CONTENT CFG] [SETTINGS  ] [ABOUT     ] [QUIT    ]║
║  R3: [——        ] [——         ] [——        ] [——         ] [——        ] [——        ] [——      ]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝

  Button states:
    [CONTINUE   ]  → greyed when no save file exists
    [NEW GAME+  ]  → greyed/hidden when game_cleared flag not set
```

---

## B2. SETTINGS OVERLAY — CONTENT FILTERS TAB
# Floats over title screen or any view via [≡ MENU] → Settings

```
╔══[NO HUD — OVERLAY]═════════════════════════════════════════════════════════════════════════════╗
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░░░░░  ┌──────────────────────────────────────────────────────────────────────┐  ░░░░░░░░░  ║
║  ░░░░░  │  SYSTEM CONFIGURATION                              [ x Close ]       │  ░░░░░░░░░  ║
║  ░░░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░░░░░░░  ║
║  ░░░░░  │  [ AUDIO ] [ VIDEO ] [ GAMEPLAY ] [► CONTENT ◄] [ ACCESSIBILITY ]   │  ░░░░░░░░░  ║
║  ░░░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░░░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░░░░░  ║
║  ░░░░░  │  ADULT CONTENT                                                       │  ░░░░░░░░░  ║
║  ░░░░░  │  [✓] Enable explicit intimate scenes                                 │  ░░░░░░░░░  ║
║  ░░░░░  │  [✓] Show physiological status bars (arousal / wetness)              │  ░░░░░░░░░  ║
║  ░░░░░  │  [✓] Enable non-consensual scene types                               │  ░░░░░░░░░  ║
║  ░░░░░  │       └─ ⚠ Requires adult content enabled above                      │  ░░░░░░░░░  ║
║  ░░░░░  │  [✓] Enable forced-sleeping scene type                               │  ░░░░░░░░░  ║
║  ░░░░░  │       └─ ⚠ Requires non-con enabled above                            │  ░░░░░░░░░  ║
║  ░░░░░  │  [ ] Enable extreme degradation content                              │  ░░░░░░░░░  ║
║  ░░░░░  │  [✓] Enable intimacy death consequences                              │  ░░░░░░░░░  ║
║  ░░░░░  │  [✓] Enable pregnancy system                                         │  ░░░░░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░░░░░  ║
║  ░░░░░  │  CONTENT WARNINGS                                                    │  ░░░░░░░░░  ║
║  ░░░░░  │  [✓] Show scene-start confirmation prompts                           │  ░░░░░░░░░  ║
║  ░░░░░  │  [✓] Show alignment consequence warnings                             │  ░░░░░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░░░░░  ║
║  ░░░░░  │  TEXT DISPLAY                                                        │  ░░░░░░░░░  ║
║  ░░░░░  │  Font size:     [−]  14px  [+]                                       │  ░░░░░░░░░  ║
║  ░░░░░  │  Scroll speed:  (○) SLOW   (●) MED   (○) INSTANT                    │  ░░░░░░░░░  ║
║  ░░░░░  │  Log length:    [−]  200 entries  [+]                                │  ░░░░░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░░░░░  ║
║  ░░░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░░░░░░░  ║
║  ░░░░░  │  [ Restore Defaults ]                    [ Apply ]   [ Close (x) ]   │  ░░░░░░░░░  ║
║  ░░░░░  └──────────────────────────────────────────────────────────────────────┘  ░░░░░░░░░  ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## B3. SETTINGS — AUDIO TAB

```
║  ░░░  │  [ ► AUDIO ◄ ] [ VIDEO ] [ GAMEPLAY ] [ CONTENT ] [ ACCESSIBILITY ]   │  ░░░  ║
║  ░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░  ║
║  ░░░  │  Master Volume:    [████████████░░░░] 75%   [−] [+]                   │  ░░░  ║
║  ░░░  │  Music:            [████████░░░░░░░░] 50%   [−] [+]                   │  ░░░  ║
║  ░░░  │  Ambience:         [████████░░░░░░░░] 50%   [−] [+]                   │  ░░░  ║
║  ░░░  │  SFX:              [████████████████] 100%  [−] [+]                   │  ░░░  ║
║  ░░░  │  Intimate SFX:     [████████░░░░░░░░] 50%   [−] [+]                   │  ░░░  ║
║  ░░░  │  Voice:            [████████████░░░░] 75%   [−] [+]                   │  ░░░  ║
║  ░░░  │                                                                       │  ░░░  ║
║  ░░░  │  [ Mute All ]   [ Test Audio ]                                        │  ░░░  ║
```

---

## B4. SETTINGS — GAMEPLAY TAB

```
║  ░░░  │  [ AUDIO ] [ VIDEO ] [► GAMEPLAY ◄] [ CONTENT ] [ ACCESSIBILITY ]    │  ░░░  ║
║  ░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░  ║
║  ░░░  │  Autosave:         (●) ON    (○) OFF                                  │  ░░░  ║
║  ░░░  │  Autosave slot:    Slot 99 (autosave — cannot be manually deleted)    │  ░░░  ║
║  ░░░  │  Combat speed:     (○) SLOW  (●) NORMAL  (○) FAST                    │  ░░░  ║
║  ░░░  │  Combat log:       (●) FULL  (○) SUMMARY                             │  ░░░  ║
║  ░░░  │  Confirm actions:  [✓] Quest Accept   [✓] Item Use   [ ] Travel       │  ░░░  ║
║  ░░░  │  Show stat gates:  [✓] Show hidden locked dialogue choices            │  ░░░  ║
║  ░░░  │  NPC schedules:    (●) ON    (○) STATIC (NPCs always at base)         │  ░░░  ║
║  ░░░  │  Encounter rate:   (○) LOW  (●) NORMAL  (○) HIGH                     │  ░░░  ║
```

---

## B5. SAVE / LOAD PORTAL
# Triggered from title [CONTINUE] or in-game [≡ MENU] → Save/Load

```
╔══[NO HUD — OVERLAY]═════════════════════════════════════════════════════════════════════════════╗
║  ░░░░░  ┌──────────────────────────────────────────────────────────────────────┐  ░░░░░  ║
║  ░░░░░  │  SAVE / LOAD                                       [ x Close ]       │  ░░░░░  ║
║  ░░░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░░░  ║
║  ░░░░░  │  [ ► LOAD ◄ ]  [ SAVE ]                                              │  ░░░░░  ║
║  ░░░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░  ║
║  ░░░░░  │  ┌──────────────────────────────────────────────────────────────┐    │  ░░░░░  ║
║  ░░░░░  │  │  SLOT 99 — AUTOSAVE                               [LOAD]     │    │  ░░░░░  ║
║  ░░░░░  │  │  Lv. 7 Pragmatist  ·  Thornspire Market  ✦ SAFE             │    │  ░░░░░  ║
║  ░░░░░  │  │  NIGHT Phase 7/15  ·  Day 14  ·  Spring Yr 1                │    │  ░░░░░  ║
║  ░░░░░  │  │  Saved: 2026-11-01 14:32  ·  Playtime: 08h 42m              │    │  ░░░░░  ║
║  ░░░░░  │  └──────────────────────────────────────────────────────────────┘    │  ░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░  ║
║  ░░░░░  │  ┌──────────────────────────────────────────────────────────────┐    │  ░░░░░  ║
║  ░░░░░  │  │  SLOT 01 — MANUAL SAVE                           [LOAD] [✕] │    │  ░░░░░  ║
║  ░░░░░  │  │  Lv. 7 Pragmatist  ·  Forest Entrance  ⚔ UNSAFE            │    │  ░░░░░  ║
║  ░░░░░  │  │  MIDNIGHT Phase 14/15  ·  Day 12  ·  Spring Yr 1            │    │  ░░░░░  ║
║  ░░░░░  │  │  Saved: 2026-11-01 11:08  ·  Playtime: 07h 55m              │    │  ░░░░░  ║
║  ░░░░░  │  └──────────────────────────────────────────────────────────────┘    │  ░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░  ║
║  ░░░░░  │  ┌──────────────────────────────────────────────────────────────┐    │  ░░░░░  ║
║  ░░░░░  │  │  SLOT 02 — EMPTY                                             │    │  ░░░░░  ║
║  ░░░░░  │  │  [ — Create New Save — ]                                     │    │  ░░░░░  ║
║  ░░░░░  │  └──────────────────────────────────────────────────────────────┘    │  ░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░  ║
║  ░░░░░  │  ┌──────────────────────────────────────────────────────────────┐    │  ░░░░░  ║
║  ░░░░░  │  │  SLOT 03 — EMPTY                                             │    │  ░░░░░  ║
║  ░░░░░  │  └──────────────────────────────────────────────────────────────┘    │  ░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░  ║
║  ░░░░░  │  Slots 04–09: EMPTY  (manual)                                        │  ░░░░░  ║
║  ░░░░░  │  ⚠ Slot 99 (autosave) cannot be manually deleted.                   │  ░░░░░  ║
║  ░░░░░  │                                                                      │  ░░░░░  ║
║  ░░░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░░░  ║
║  ░░░░░  │  [ Delete Selected ]                            [ Close (x) ]        │  ░░░░░  ║
║  ░░░░░  └──────────────────────────────────────────────────────────────────────┘  ░░░░░  ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## B5a. SAVE TAB VARIANT

```
║  ░░░  │  [ LOAD ]  [► SAVE ◄]                                               │  ░░░  ║
║  ░░░  ├──────────────────────────────────────────────────────────────────┤  ░░░  ║
║  ░░░  │  Current state:  Lv.7 · Thornspire Market · NIGHT 7/15 · Day 14   │  ░░░  ║
║  ░░░  │                                                                   │  ░░░  ║
║  ░░░  │  SLOT 01 — Manual  [OVERWRITE] [✕]   (last saved Day 12)          │  ░░░  ║
║  ░░░  │  SLOT 02 — Empty   [SAVE HERE]                                    │  ░░░  ║
║  ░░░  │  SLOT 03 — Empty   [SAVE HERE]                                    │  ░░░  ║
║  ░░░  │  ...                                                              │  ░░░  ║
║  ░░░  │  SLOT 99 — Autosave  (cannot overwrite manually)                  │  ░░░  ║
║  ░░░  │                                                                   │  ░░░  ║
║  ░░░  │  ┌──────────────────────────────────────────┐                     │  ░░░  ║
║  ░░░  │  │  Confirm overwrite SLOT 01?              │                     │  ░░░  ║
║  ░░░  │  │  This will replace the existing save.    │                     │  ░░░  ║
║  ░░░  │  │  [ Overwrite ]        [ Cancel ]         │                     │  ░░░  ║
║  ░░░  │  └──────────────────────────────────────────┘                     │  ░░░  ║
```

---

## B6. ABOUT / CREDITS MODAL

```
╔════════════════════════════════════════════════════════════════╗
║  ABOUT                                             [ x ]       ║
╠════════════════════════════════════════════════════════════════╣
║  OJISAN IN ANOTHER WORLD  —  v0.1.0                            ║
║  ────────────────────────────────────────────────────────────  ║
║  Design & Development                                          ║
║  Lead Developer:  [your name]                                  ║
║  Narrative Design: [name]                                      ║
║                                                                ║
║  Built with:                                                   ║
║  TypeScript · React 18 · Zustand · tRPC · Tailwind CSS         ║
║                                                                ║
║  Acknowledgements:                                             ║
║  [text here]                                                   ║
║                                                                ║
║  ⚠ This game contains mature themes including explicit adult   ║
║    content, violence, and non-consensual scenarios. Intended   ║
║    for adults only.                                            ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                         [ Close ]              ║
╚════════════════════════════════════════════════════════════════╝
```

---

## B7. HISTORY LOG OVERLAY
# Triggered by clicking the narrative log in any view.

```
╔══[NO HUD — OVERLAY]═════════════════════════════════════════════════════════════════════════════╗
║  ░░░░░  ┌──────────────────────────────────────────────────────────────────────┐  ░░░░░  ║
║  ░░░░░  │  SESSION LOG                                        [ x Close ]       │  ░░░░░  ║
║  ░░░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░░░  ║
║  ░░░░░  │  Filter: (●) ALL  (○) COMBAT  (○) DIALOGUE  (○) INTIMACY  (○) SYSTEM│  ░░░░░  ║
║  ░░░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░░░  ║
║  ░░░░░  │  [Day 14 · Night] SYSTEM: Autosave triggered.                        │  ░░░░░  ║
║  ░░░░░  │  [Day 14 · Night] DIALOGUE: You spoke with Mira. Trust +3.           │  ░░░░░  ║
║  ░░░░░  │  [Day 14 · Night] COMBAT: Goblin A defeated. 150 XP gained.          │  ░░░░░  ║
║  ░░░░░  │  [Day 14 · Night] COMBAT: Aria cast Shadow Strike → Goblin A: 24 dmg │  ░░░░░  ║
║  ░░░░░  │  [Day 14 · Eve ] TRAVEL: Entered Forest Entrance. ⚔ UNSAFE           │  ░░░░░  ║
║  ░░░░░  │  [Day 14 · Eve ] INTIMACY: Vespera — Satisfaction 78/100.            │  ░░░░░  ║
║  ░░░░░  │  [Day 14 · Aft ] ITEM: Sold Steel Axe for 50G.                       │  ░░░░░  ║
║  ░░░░░  │  [Day 14 · Aft ] QUEST: Wolf Hunt — objective 2/5.                   │  ░░░░░  ║
║  ░░░░░  │  [Day 14 · Mid ] REPUTATION: Thornspire +10. Tier: Liked.            │  ░░░░░  ║
║  ░░░░░  │  [Day 13 · Ngt ] SLEEP: Full restore. Day-end tick completed.         │  ░░░░░  ║
║  ░░░░░  │  ...                                                                  │  ░░░░░  ║
║  ░░░░░  │                                     ▼  (scroll for earlier entries)   │  ░░░░░  ║
║  ░░░░░  ├──────────────────────────────────────────────────────────────────────┤  ░░░░░  ║
║  ░░░░░  │  Showing 200 / 847 total entries          [ Export Log ]  [ Clear ]   │  ░░░░░  ║
║  ░░░░░  └──────────────────────────────────────────────────────────────────────┘  ░░░░░  ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART C — CHARACTER CREATION FLOW
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## C1. CHARACTER CREATION — STEP 1: IDENTITY

```
╔══[NO HUD — CREATION]════════════════════════════════════════════════════════════════════════════╗
║                                                                                                 ║
║  ✦ CHARACTER CREATION                             Step 1 of 3 — Identity                       ║
║  ─────────────────────────────────────────────────────────────────────────────────────────     ║
║  Progress:  [●●○○]  Identity → Sub-Class → Traits → Confirm                                   ║
║                                                                                                 ║
╠══════════════════════╦══════════════════════════════════════════════════════════════════════════╣
║                      ║                                                                         ║
║  PORTRAIT PREVIEW    ║  IDENTITY                                                               ║
║  ┌──────────────┐    ║  ─────────────────────────────────────────────────────────────          ║
║  │              │    ║  Name:   [__________________]  (player-entered name, 2–20 chars)         ║
║  │   [portrait  │    ║                                                                         ║
║  │    selector  │    ║  Origin:                                                                ║
║  │    gallery]  │    ║  (●) Human                   Common across all regions                  ║
║  │              │    ║  (○) High Elf                Sylvaren — high MP baseline                 ║
║  └──────────────┘    ║  (○) Dark Elf                Khardun — high DEF + dark-faith default     ║
║  [ ◄ ] Portrait [ ► ]║  (○) Dwarf                   Stonebridge — high END                      ║
║                      ║  (○) High Orc                Tharos — high STR                           ║
║  STARTING STATS      ║  (○) Angel                   rare — very high MP (anomalous)             ║
║  (from origin)       ║                                                                         ║
║  STR  10             ║  Faith (auto-set by origin, editable):                                   ║
║  DEX  10             ║  [ Radiant Faith ▼ ]  (Solenne + Varan)                                 ║
║  AGI  10             ║  Options: Radiant Faith · Old Wood · Stone Covenant · Night Court · None  ║
║  INT  10             ║                                                                         ║
║  WIL  10             ║  Background:                                                             ║
║  PER  10             ║  (●) Wanderer        +2 PER  · starting Pragmatist tilt                 ║
║  END  10             ║  (○) Soldier         +2 STR  · starting Loyalist tilt                   ║
║                      ║  (○) Scholar         +2 INT  · starts with extra skill point            ║
║  MP base: 100        ║  (○) Merchant        +2 PER  · +50G starting gold                       ║
║  (from Human)        ║  (○) Outlaw          +2 DEX  · starting Sovereign tilt                  ║
║                      ║                                                                         ║
╠══════════════════════╩══════════════════════════════════════════════════════════════════════════╣
║  R1: [——        ] [——        ] [——        ] [——        ] [——        ] [——        ] [Next Step►]║
║  R3: [——        ] [——        ] [——        ] [——        ] [——        ] [——        ] [◄ Back   ]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## C2. CHARACTER CREATION — STEP 2: SUB-CLASS & STAT ALLOCATION

```
╔══[NO HUD — CREATION]════════════════════════════════════════════════════════════════════════════╗
║  ✦ CHARACTER CREATION                        Step 2 of 3 — Sub-Class & Stats                   ║
║  Progress:  [●●●○]  Identity → Sub-Class → Traits → Confirm                                   ║
╠══════════════════════╦══════════════════════════════════════════════════════════════════════════╣
║                      ║                                                                         ║
║  SUB-CLASS CARDS     ║  STAT ALLOCATION                                                        ║
║                      ║  Free attribute points: 10  Remaining: 3                               ║
║  ┌────────────────┐  ║  (each stat can receive 0–5 extra points)                               ║
║  │ ► Structural   │  ║  ─────────────────────────────────────────────────────────────          ║
║  │   Engineer  ✓  │  ║  STR   10 + 2 = 12   [−] [████░░░░░░] [+]                              ║
║  │                │  ║  DEX   10 + 0 = 10   [−] [░░░░░░░░░░] [+]                              ║
║  │  +2 STR, +2END │  ║  AGI   10 + 0 = 10   [−] [░░░░░░░░░░] [+]                              ║
║  │  Perk: Anchored│  ║  INT   10 + 0 = 10   [−] [░░░░░░░░░░] [+]                              ║
║  │  (fall damage  │  ║  WIL   10 + 3 = 13   [−] [██████░░░░] [+]                              ║
║  │   immunity)    │  ║  PER   10 + 2 = 12   [−] [████░░░░░░] [+]                              ║
║  └────────────────┘  ║  END   10 + 3 = 13   [−] [██████░░░░] [+]                              ║
║                      ║  ─────────────────────────────────────────────────────────────          ║
║  ┌────────────────┐  ║  Points used: 10 / 10   ✓                                              ║
║  │  Arcane        │  ║                                                                         ║
║  │  Scholar       │  ║  STARTING JOB (from identity + sub-class):                             ║
║  │                │  ║  Auto-assigned: Warrior  (Structural Engineer → Warrior default)        ║
║  │  +2 INT, +2WIL │  ║  [ Change Starting Job ▼ ]  — Warrior / Mage / Rogue / Ranger          ║
║  │  Perk: Mana    │  ║  Note: other jobs unlock via Path Awakening in-game.                   ║
║  │  Affinity      │  ║                                                                         ║
║  └────────────────┘  ║  DERIVED STATS PREVIEW                                                  ║
║                      ║  HP max: 130   STA max: 115   CPW max: 60   MP max: 100                 ║
║  ┌────────────────┐  ║  Combat STR: 12   Combat AGI: 10   Combat DEF: 13   LCK: 10            ║
║  │  Shadow        │  ║                                                                         ║
║  │  Operative     │  ║                                                                         ║
║  │                │  ║                                                                         ║
║  │  +2 DEX, +2PER │  ║                                                                         ║
║  │  Perk: Unseen  │  ║                                                                         ║
║  │  (first strike)│  ║                                                                         ║
║  └────────────────┘  ║                                                                         ║
║                      ║                                                                         ║
║  ┌────────────────┐  ║                                                                         ║
║  │  Field Medic   │  ║                                                                         ║
║  │                │  ║                                                                         ║
║  │  +2 END, +2WIL │  ║                                                                         ║
║  │  Perk: Triage  │  ║                                                                         ║
║  └────────────────┘  ║                                                                         ║
║                      ║                                                                         ║
║  ┌────────────────┐  ║                                                                         ║
║  │  Trade Broker  │  ║                                                                         ║
║  │                │  ║                                                                         ║
║  │  +2 PER, +2LCK │  ║                                                                         ║
║  │  Perk: Haggle  │  ║                                                                         ║
║  └────────────────┘  ║                                                                         ║
║                      ║                                                                         ║
╠══════════════════════╩══════════════════════════════════════════════════════════════════════════╣
║  R1: [——        ] [——        ] [——        ] [——        ] [——        ] [◄ Prev    ] [Next Step►]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## C3. CHARACTER CREATION — STEP 3: TRAITS & CONFIRM

```
╔══[NO HUD — CREATION]════════════════════════════════════════════════════════════════════════════╗
║  ✦ CHARACTER CREATION                             Step 3 of 3 — Traits & Confirm               ║
║  Progress:  [●●●●]  Identity → Sub-Class → Stats → Confirm                                    ║
╠══════════════════════╦══════════════════════════════════════════════════════════════════════════╣
║                      ║                                                                         ║
║  PORTRAIT PREVIEW    ║  SELECT SECONDARY TRAIT  (choose 1)                                    ║
║  ┌──────────────┐    ║  ─────────────────────────────────────────────────────────────          ║
║  │  [portrait]  │    ║                                                                         ║
║  │   [Name]     │    ║  (●) Resource Efficient                                                 ║
║  └──────────────┘    ║      AP costs reduced by 10% across all actions.                       ║
║                      ║      (Flag: resource_efficient)                                         ║
║  SUMMARY             ║                                                                         ║
║  Name:   Kirito      ║  (○) Master Negotiator                                                 ║
║  Origin: Human       ║      Shop buy prices −5% across all regions.                           ║
║  Faith:  Radiant     ║      (Flag: master_negotiator)                                          ║
║  Sub:    Structural  ║                                                                         ║
║  Job:    Warrior     ║  (○) Tenacious Survivalist                                             ║
║                      ║      Once per combat: HP floored at 1 instead of 0 on killing blow.    ║
║  FINAL STATS         ║      (Flag: tenacious_survivalist)                                      ║
║  STR  12  DEX  10    ║                                                                         ║
║  AGI  10  INT  10    ║  ─────────────────────────────────────────────────────────────          ║
║  WIL  13  PER  12    ║                                                                         ║
║  END  13             ║  STARTING INVENTORY                                                     ║
║                      ║  · Health Potion ×2                                                     ║
║  HP:  130            ║  · Rope ×1                                                              ║
║  STA: 115            ║  · 100G starting gold                                                   ║
║  CPW:  60            ║  · Worn Travelling Cloak (clothing)                                     ║
║  MP:  100            ║  · Linen Travel Shirt (clothing)                                        ║
║                      ║  · Travel Trousers (clothing)                                           ║
║  Alignment: 0        ║                                                                         ║
║  Charter:  WANDERER  ║  LORE ORIGIN NOTE                                                       ║
║  Divinity: 0         ║  You are an ordinary person from another world. Your MP is foreign       ║
║                      ║  to this realm — anomalous, unrecognised by standard Path Awakening      ║
║                      ║  rituals. This will matter.                                              ║
║                      ║  (anomalousMp: true · mpBurnout: 0)                                     ║
║                      ║                                                                         ║
╠══════════════════════╩══════════════════════════════════════════════════════════════════════════╣
║  R1: [——        ] [——        ] [——        ] [——        ] [——        ] [◄ Prev    ] [▶ BEGIN!  ]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART D — SPATIAL EXPLORATION
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## D1. SPATIAL EXPLORATION — BASE STATE (Safe Zone)

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  PLAYER VITALS   ║  📍 THORNSPIRE MARKET  ·  Region: Thornspire    ║  INSPECTOR                  ║
║  ❤ ████████░░    ║  Safety: ✦ SAFE  ·  Phase: ☀ MORNING           ║  ─────────────────────────  ║
║  ⚡ ██████░░░░   ║  ─────────────────────────────────────────────  ║                             ║
║  ✦ ███░░░░░░░   ║                                                  ║  ENTITIES AT CURSOR         ║
║                  ║  ╔══════════════════════════════════════╗        ║  (click tile to inspect)    ║
║  PARTY           ║  ║ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ║        ║                             ║
║  👤 Aria  ████   ║  ║ ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ║        ║  TILE: (14, 8)              ║
║  👤 Mira  ██░░   ║  ║ ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ║        ║  Terrain: OPEN FLOOR        ║
║                  ║  ║ ██ ░░ ░░[A]░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ║        ║  Passable: ✓                ║
║  CLOCK           ║  ║ ██ ░░ ░░ ░░[M]░░ ░░ ░░ ░░ ░░ ░░ ██ ║        ║                             ║
║  ☀ MORNING       ║  ║ ██ ░░ ░░ ░░ ░░[☆]░░ ░░ ░░ ░░ ░░ ██ ║        ║  ─────────────────────────  ║
║  Phase  1/15     ║  ║ ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ║        ║  ENTITIES ON THIS TILE      ║
║  Day 14 Spring   ║  ║ ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░[N]░░ ░░ ██ ║        ║                             ║
║                  ║  ║ ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ║        ║  👤 MIRA ASHLEN  (NPC)      ║
║  GOLD            ║  ║ ██ ░░ ░░ ░░ ░░[N]░░ ░░ ░░ ░░ ░░ ██ ║        ║  Trust: 28  Love: 18        ║
║  💰 340G         ║  ║ ██ ██ ██ ██[D]██ ██ ██ ██ ██ ██ ██ ║        ║  Relationship: Acquaintance  ║
║  📦 14/20        ║  ╚══════════════════════════════════════╝        ║  [ 💬 Talk ]  [ 🎁 Gift ]   ║
║                  ║                                                  ║  [ 👋 Flirt ] [ 👆 Touch ]  ║
║  ALIGNMENT       ║  LEGEND                                          ║                             ║
║  ◈ PRAGMATIST    ║  [☆] = Player   [A] = Aria   [M] = Mira         ║  ─────────────────────────  ║
║                  ║  [N] = NPC      [D] = Door    ██ = Wall          ║  👤 WANDERER NPC  (generic) ║
║  FATIGUE         ║  ░░ = Floor     [?] = Chest   [!] = Event       ║  Not yet introduced          ║
║  😴 Tier I       ║                                                  ║  [ 💬 Talk ]                ║
║                  ║  ACTIONS (tile-based)                            ║                             ║
║  DEBUFFS         ║  Click adjacent tile → move there                ║  ─────────────────────────  ║
║  (none)          ║  Click entity on tile → interact                 ║  MANOR / WORKSPACE          ║
║                  ║  Click door → enter new area                     ║  Suite 1: Aria (assigned)   ║
║                  ║                                                  ║  Passive pending: 36G       ║
║                  ║  NARRATIVE LOG                                   ║  [ Collect 36G ]            ║
║                  ║  ─────────────────────────────────────────────  ║  Crafting: Health Potion    ║
║                  ║  › You arrived at Thornspire Market.             ║  Ready in: 1 day            ║
║                  ║  › Mira is here today.                           ║  [ Collect Job ]            ║
║                  ║  › A notice board stands near the gate.          ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [⚡ Advance Phase] [😴 Sleep  ] [🗺 World Map] [📋 Quests] [🎒 Inventory] [💬 Last NPC] [——]║
║  R3: [🏠 Manor     ] [⚔ Combat   ] [🔍 Inspect  ] [📜 Log    ] [——         ] [——         ] [≡MENU]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## D2. SPATIAL EXPLORATION — UNSAFE ZONE STATE

```
╔══[CRIMSON — UNSAFE]═════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  🌙MIDNIGHT  14/15  |  💰340G  |  ◈SOVEREIGN  |  [≡ MENU]         ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD same...  ║  📍 FOREST ENTRANCE  ·  Region: Thornspire       ║  INSPECTOR                  ║
║                  ║  Safety: ⚔ UNSAFE  ·  Encounter chance: 35%     ║                             ║
║                  ║  ⚠ Sleep blocked  ·  Inventory restricted        ║  ⚠ UNSAFE ZONE NOTICE       ║
║                  ║  ⚠ Manor tab locked                              ║  Sleep: BLOCKED             ║
║                  ║  ─────────────────────────────────────────────  ║  Inventory: READ-ONLY       ║
║                  ║                                                  ║  Manor: LOCKED              ║
║                  ║  [30×30 tile grid — darker palette, red tint]    ║                             ║
║                  ║  ╔══════════════════════════════════════╗        ║  ENEMY ROAM                 ║
║                  ║  ║ ▓▓ ▓▓ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ▓▓ ▓▓ ║        ║  🐺 Wolf Pack ×3  → 🔴      ║
║                  ║  ║ ▓▓ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ▓▓ ║        ║  Proximity: NEAR            ║
║                  ║  ║ ░░ ░░[☆]░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ║        ║  [ ⚔ Engage ] [ 🏃 Flee ]   ║
║                  ║  ║ ░░ ░░ ░░ ░░ ░░[W]░░[W]░░ ░░ ░░ ░░ ║        ║                             ║
║                  ║  ║ ▓▓ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ▓▓ ║        ║  ─────────────────────────  ║
║                  ║  ╚══════════════════════════════════════╝        ║  CONTEXT LOG (last 5)       ║
║                  ║                                                  ║  › Entered Forest Entrance  ║
║                  ║  [W] = enemy roaming (wolf)                      ║  › Wolf pack spotted.       ║
║                  ║                                                  ║  › Encounter roll: miss.    ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [⚡ Advance  ] [🏃 Flee Back] [🗺 Map     ] [——        ] [🎒 Inventory] [——        ] [——    ]║
║  R3: [——         ] [——          ] [——         ] [📜 Log    ] [——         ] [——         ] [≡MENU]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## D3. NPC INTERACTION PANEL
# Floats in the right inspector when an NPC tile is clicked.

```
╠═════════════════════════════╣
║  NPC INTERACTION            ║
║  ──────────────────────     ║
║  [NPC Portrait]             ║
║  MIRA ASHLEN                ║
║  Human · Merchant           ║
║  Thornspire Market          ║
║                             ║
║  Trust:  28  ░░░░░░░░░░░░   ║
║  Love:   18  ░░░░░░░░░░░░   ║
║  Status: Acquaintance       ║
║  Bond:   None               ║
║                             ║
║  Has intro'd: ✓ (Day 8)     ║
║  Schedule: here until Eve   ║
║                             ║
║  ──────────────────────     ║
║  SOCIAL ACTIONS             ║
║  [ 💬 Talk ]       (1 act)  ║
║  [ 👋 Flirt ]      (1 act)  ║
║  [ 👆 Touch ]      (1 act)  ║
║  [ 🎁 Give Gift ]  (1 act)  ║
║                             ║
║  ──────────────────────     ║
║  RELATIONSHIP ACTIONS       ║
║  [ 🏠 Move to Suite ]       ║
║    ← requires T60 L60       ║
║  [ 🛡 Add to Party  ]       ║
║  [ 👗 Wardrobe      ]       ║
║    ← requires suite         ║
║                             ║
║  ──────────────────────     ║
║  INTIMACY                   ║
║  [ ♥ Initiate Scene ]       ║
║    ← adult content gate     ║
║  Scene type: CONSENSUAL     ║
║  Gate: not yet eligible     ║
╠═════════════════════════════╣
```

---

## D4. SLEEP AT MANOR MODAL

```
╔══════════════════════════════════════════════════════╗
║  😴 SLEEP AT MANOR                      [ x ]        ║
╠══════════════════════════════════════════════════════╣
║  Location: Thornspire Manor  ✦ SAFE                  ║
║  Cost: FREE (you own the manor)                      ║
║                                                      ║
║  Full restore:  ❤ HP  ·  ⚡ STA  ·  ✦ CPW  ·  MP    ║
║  Fatigue reset: Tier clears to 0                     ║
║  Status effects: ALL cleared                         ║
║  Day-end tick: runs (pregnancy, crafting, etc.)      ║
║  Autosave: triggers on day-end                       ║
║                                                      ║
║  Party members restored:                             ║
║  👤 Aria  ·  👤 Mira                                 ║
║                                                      ║
║  Suite residents: Aria (passive gen tick)            ║
║                                                      ║
║  [ Sleep — Advance to Morning ]     [ Cancel ]       ║
╚══════════════════════════════════════════════════════╝
```

---

## D5. PHASE ADVANCE CONFIRMATION (Safe Zone)

```
╔══════════════════════════════════════════════════════╗
║  ⚡ ADVANCE PHASE                       [ x ]        ║
╠══════════════════════════════════════════════════════╣
║  Current:  MORNING  Phase 1/15  Day 14               ║
║  After:    MIDDAY   Phase 2/15  Day 14               ║
║                                                      ║
║  Actions used this phase: 3 / 5                      ║
║  Remaining actions: 2  (will be lost on advance)     ║
║                                                      ║
║  Phase recovery: +20 STA  ·  +10 CPW  ·  +10 MP     ║
║  Fatigue change: none (Tier I stays)                 ║
║                                                      ║
║  [ Advance to Midday ]              [ Cancel ]       ║
╚══════════════════════════════════════════════════════╝
```

---

## D6. POST-ENCOUNTER PANEL (tile event)
# Shown in Inspector after a tile-based special encounter resolves.

```
╠════════════════════════════╣
║  ⚔ ENCOUNTER RESOLVED      ║
║  ─────────────────────     ║
║  Type: Ambush              ║
║                            ║
║  Outcome: Intimidated      ║
║  success (WIS roll: 72%)   ║
║                            ║
║  Rewards:                  ║
║  XP: +120  Gold: +30G      ║
║  Item: Goblin Fang ×2      ║
║                            ║
║  Reputation: +5 civil      ║
║  (Thornspire)              ║
║                            ║
║  [ Continue ]              ║
╠════════════════════════════╣
```
# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART E — WORLD MAP
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## E1. WORLD MAP — FULL SCREEN (current node highlighted)

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  WORLD MAP       ║  REGION: THORNSPIRE                              ║  NODE DETAIL                ║
║  ──────────────  ║  ──────────────────────────────────────────────  ║  ──────────────────────     ║
║  Current:        ║                                                  ║                             ║
║  Thornspire Mkt  ║     [Stone Ridge] ─────── [High Pass]            ║  THORNSPIRE MARKET          ║
║                  ║          │                      │                ║  Region: Thornspire         ║
║  FILTER          ║          │                      │                ║  Safety: ✦ SAFE             ║
║  (●) All         ║     [★ THORNSPIRE MKT]     [Mountain Shrine]     ║  Type: Town                 ║
║  (○) Safe only   ║          │                                       ║                             ║
║  (○) Unsafe      ║          │                                       ║  You are here ←             ║
║  (○) Undiscov.   ║     [Forest Entrance] ──── [Deep Forest]         ║                             ║
║                  ║          │               ⚔                      ║  Services:                  ║
║  LEGEND          ║          │                                       ║  · Merchant (Mira)          ║
║  [★] = current   ║     [River Crossing]       [???] = undiscov.    ║  · Inn (Dawnside)           ║
║  [□] = safe      ║      ⚔  │                   ░░░░░                ║  · Blacksmith               ║
║  ⚔  = unsafe     ║          │                                       ║  · Notice Board             ║
║  ░░░ = unknown   ║     [Old Road South] ─── [Waypoint: Ruin A]      ║                             ║
║                  ║      ⚔                   ⚔                      ║  Connections:               ║
║  VISITED: 6/14   ║                                                  ║  › Forest Entrance ⚔        ║
║  SAFE:    2/6    ║  Distance: 1 step to Forest Entrance              ║  › Stone Ridge  ✦           ║
║  UNSAFE:  4/6    ║            2 steps to River Crossing              ║  › Old Road S.  ⚔           ║
║  UNKNOWN: 8/14   ║                                                  ║                             ║
║                  ║  Carriage routes: Thornspire Mkt ↔ Stone Ridge   ║  Carriage to Stone Ridge:   ║
║  WAYPOINTS       ║  (available until Evening phase)                 ║  60G · 0 phases             ║
║  ──────────────  ║                                                  ║  [ 🚌 Hire Carriage ]       ║
║  A: Ruin A ⚔     ║                                                  ║                             ║
║  (no others set) ║                                                  ║  [ 📌 Set Waypoint Here ]   ║
║                  ║                                                  ║  [ ▶ Fast Travel Here ]     ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [▶ Travel Here] [🚌 Carriage] [📌 Set Waypoint] [⟲ Teleport →WP] [——       ] [——      ] [——]║
║  R3: [——           ] [——         ] [——             ] [——             ] [——       ] [——      ] [◄ Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## E2. NODE STATE VARIANTS (inspector panel right column)

```
  ── SAFE NODE SELECTED ─────────────────────────────────────────────────────
  ║  STONE RIDGE                          ║
  ║  Safety: ✦ SAFE · Type: Village       ║
  ║  Distance: 1 step (passable)          ║
  ║  Services: Merchant · Herbalist       ║
  ║  [ ▶ Travel Here  (1 phase) ]         ║

  ── UNSAFE NODE SELECTED ───────────────────────────────────────────────────
  ║  FOREST ENTRANCE                      ║
  ║  Safety: ⚔ UNSAFE · Type: Wilderness  ║
  ║  Distance: 1 step                     ║
  ║  ⚠ Encounter rate: 35%               ║
  ║  ⚠ Sleep blocked · Manor locked      ║
  ║  Known enemies: Wolf ×3, Bandit ×2   ║
  ║  [ ▶ Travel Here  (1 phase) ]         ║

  ── UNDISCOVERED NODE SELECTED ─────────────────────────────────────────────
  ║  ??? — UNDISCOVERED                   ║
  ║  Region: Thornspire (est.)            ║
  ║  Distance: 2 steps                    ║
  ║  Requires passing: Forest Entrance    ║
  ║  ⚠ Details hidden until visited      ║
  ║  [ ▶ Travel Toward (est.) ]           ║

  ── WAYPOINT NODE SELECTED ─────────────────────────────────────────────────
  ║  RUIN A  (Waypoint A set)             ║
  ║  Safety: ⚔ UNSAFE · Type: Ruin       ║
  ║  ✓ Teleport Ward active here         ║
  ║  [ ⟲ Teleport Here — 30 CPW ]        ║
  ║  [ ▶ Travel Here  (3 phases) ]        ║
  ║  [ ✕ Remove Waypoint A ]             ║
```

---

## E3. FAST TRAVEL CONFIRMATION MODAL

```
╔══════════════════════════════════════════════════════╗
║  ▶ FAST TRAVEL                           [ x ]       ║
╠══════════════════════════════════════════════════════╣
║  Destination:  STONE RIDGE  ✦ SAFE                   ║
║  Distance:     1 step                                ║
║  Phase cost:   1 phase (Morning → Midday)            ║
║                                                      ║
║  Route:  Thornspire Market → Stone Ridge             ║
║  Passing through:  (direct connection, 1 hop)        ║
║  Encounter rolls:  NONE (safe corridor)              ║
║                                                      ║
║  [ Confirm Travel ]              [ Cancel ]          ║
╚══════════════════════════════════════════════════════╝
```

---

## E4. FAST TRAVEL — UNSAFE ROUTE VARIANT

```
╔══════════════════════════════════════════════════════╗
║  ▶ TRAVEL — UNSAFE ROUTE                  [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Destination:  RIVER CROSSING  ⚔ UNSAFE              ║
║  Distance:     2 steps                               ║
║  Phase cost:   2 phases                              ║
║                                                      ║
║  Route:                                              ║
║  Thornspire Market → Forest Entrance → River Cross.  ║
║  ⚠ Passing through 2 unsafe nodes                   ║
║  Encounter roll (each):  35% · 40%                   ║
║  Possible: ambush combat on route                    ║
║                                                      ║
║  Party:  👤 Aria (HP 100%)  ·  👤 Mira (HP 80%)     ║
║                                                      ║
║  [ Confirm — Accept Encounter Risk ]   [ Cancel ]    ║
╚══════════════════════════════════════════════════════╝
```

---

## E5. TELEPORT MODAL (via Ward)

```
╔══════════════════════════════════════════════════════╗
║  ⟲ TELEPORT — WARD JUMP                  [ x ]       ║
╠══════════════════════════════════════════════════════╣
║  Source:        Thornspire Market  ✦ SAFE            ║
║  Destination:   Ruin A  (Waypoint A)  ⚔ UNSAFE       ║
║                                                      ║
║  CPW cost:   30 / 80 available  ✓                   ║
║  Phase cost: 0 (instant)                             ║
║  Encounter:  NONE on arrival tile                    ║
║                                                      ║
║  ⚠ Destination is UNSAFE — manor/sleep blocked      ║
║                                                      ║
║  [ Teleport Now — 30 CPW ]           [ Cancel ]      ║
╚══════════════════════════════════════════════════════╝
```

---

## E6. CARRIAGE HIRE MODAL

```
╔══════════════════════════════════════════════════════╗
║  🚌 HIRE CARRIAGE                         [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Route:   Thornspire Market → Stone Ridge            ║
║           ✦ SAFE corridor                            ║
║  Cost:    60G   (your gold: 340G → 280G)             ║
║  Time:    0 phases (this phase only; departs now)    ║
║  Departs: until EVENING phase                        ║
║                                                      ║
║  Party transported:  👤 Aria  ·  👤 Mira             ║
║                                                      ║
║  ⚠ Carriage available only during daytime phases    ║
║                                                      ║
║  [ Hire Carriage — 60G ]             [ Cancel ]      ║
╚══════════════════════════════════════════════════════╝
```

---

## E7. CITY GATE BLOCKED OVERLAY

```
╔══════════════════════════════════════════════════════╗
║  ⛔ ACCESS DENIED — CITY GATE             [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Destination: Thornspire Capital                     ║
║                                                      ║
║  Entry blocked: INFAMY TOO HIGH                      ║
║  Your infamy:   48 / 50 max permitted                ║
║  City threshold: 25 max                              ║
║                                                      ║
║  To enter:                                           ║
║  · Reduce infamy below 25 (contact local guild)      ║
║  · Pay bounty clearance fee: 500G                    ║
║  · Wait for infamy decay (−3/day)                    ║
║                                                      ║
║  [ Pay Bounty — 500G ]   [ Turn Back ]   [ Cancel ]  ║
╚══════════════════════════════════════════════════════╝
```

---

## E8. TELEPORT WARD BLOCKED TOAST (brief overlay)

```
  ┌────────────────────────────────────────────────────┐
  │  ⚠ TELEPORT BLOCKED                                │
  │  No ward active at destination.                    │
  │  Set a Teleportation Ward at a waypoint node       │
  │  first (requires: Ward Scroll × 1).                │
  └────────────────────────────────────────────────────┘
```

---

## E9. SPIRE FAST TRAVEL MODAL (Miasma Spire network)

```
╔══════════════════════════════════════════════════════╗
║  🗼 SPIRE TRAVEL                          [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Spire:  Thornspire Crown Spire                      ║
║                                                      ║
║  Available destinations (connected spires):          ║
║  ┌──────────────────────────────────────────┐        ║
║  │  Khardun Spire   · Deep Desert  ⚔  · 1G │ [Go] │ ║
║  │  Sylvaren Spire  · Elven Wood   ⚔  · 1G │ [Go] │ ║
║  │  Capital Spire   · Capital      ✦  · 1G │ [Go] │ ║
║  │  ...                                     │      │ ║
║  └──────────────────────────────────────────┘        ║
║                                                      ║
║  Phase cost: 1 phase (spire transit)                 ║
║  Gold cost:  1G per hop                              ║
║                                                      ║
║  [ Cancel ]                                          ║
╚══════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART F — COMBAT
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## F1. COMBAT VIEW — BASE STATE

```
╔══[IRON — FORTIFIED]═════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  🌙MIDNIGHT  14/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]         ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  TURN ORDER      ║  BATTLEFIELD                                     ║  TARGET DETAIL              ║
║  ──────────────  ║  ──────────────────────────────────────────────  ║  ──────────────────────     ║
║  1. ► YOU        ║                                                  ║                             ║
║  2.   Aria       ║  ENEMIES                                         ║  🐺 WOLF A                  ║
║  3.   Wolf A     ║  ┌────────────────────┐  ┌────────────────────┐  ║  Type:   Beast              ║
║  4.   Wolf B     ║  │  🐺 Wolf A         │  │  🐺 Wolf B         │  ║  HP:     42 / 60            ║
║  5.   Mira       ║  │  HP ████████░░ 42  │  │  HP █████████░  52 │  ║  STA:    30 / 50            ║
║  6.   Wolf C     ║  │  STA ██████░░░░ 30 │  │  STA ██████████ 50 │  ║  ATK:    12   DEF: 8        ║
║                  ║  └────────────────────┘  └────────────────────┘  ║  LCK:    5                  ║
║  PHASE: ACTIVE   ║                                                  ║                             ║
║  Round: 2 / —    ║       ┌────────────────────┐                     ║  Status effects: none       ║
║                  ║       │  🐺 Wolf C         │                     ║                             ║
║  RESOURCES       ║       │  HP ██░░░░░░░░  18 │  ← near-dead       ║  Kill worth:                ║
║  AP: 2 of 3      ║       └────────────────────┘                     ║  XP: 80  Gold: 20G          ║
║  MP: 65 / 100    ║                                                  ║                             ║
║                  ║  PARTY                                           ║  ──────────────────────     ║
║  PASSIVES        ║  ┌────────────────────┐  ┌────────────────────┐  ║  ACTIVE SKILL PREVIEW       ║
║  Anchored: ON    ║  │  ⭐ YOU            │  │  👤 ARIA           │  ║                             ║
║  Brutal: ON      ║  │  HP ████████░  142 │  │  HP █████████  100 │  ║  Strike II                 ║
║                  ║  │  STA ██████░░░   95│  │  STA ████████   90 │  ║  AP cost: 1                 ║
║                  ║  └────────────────────┘  └────────────────────┘  ║  DMG: STR × 1.5 phys        ║
║                  ║  ┌────────────────────┐                          ║  Range: adjacent            ║
║                  ║  │  👤 MIRA           │  ← support              ║  Hit chance: 85%            ║
║                  ║  │  HP █████░░░░    80│                          ║  vs Wolf A:                 ║
║                  ║  │  STA ████░░░░░   60│                          ║  Est. DMG: 14–18            ║
║                  ║  └────────────────────┘                          ║  Kill prob: 42%             ║
║                  ║                                                  ║                             ║
║                  ║  COMBAT LOG (last 5 lines)                       ║  ──────────────────────     ║
║                  ║  › Wolf A attacked YOU for 14 DMG.               ║  ENEMY INTENT (Wolf A)      ║
║                  ║  › YOU used Strike II → Wolf A: 18 DMG.          ║  Next action:  Attack YOU   ║
║                  ║  › Aria cast Heal → YOU: +22 HP.                 ║  Probability:  80%          ║
║                  ║  › Wolf B pounced Mira for 20 DMG.               ║                             ║
║                  ║  › Wolf C is near death.                         ║  [ 📜 Full Combat Log ]     ║
║                  ║  [━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]   ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [⚔ Strike II ] [🌟 Cleave II ] [✨ Skill 3 ] [🛡 Defend   ] [💊 Use Item ] [🏃 Flee    ] [——]║
║  R3: [🎯 Target ◄►] [👥 Target P. ] [🔃 Skill Pg] [🔃 Skill P2] [⚙ Battle Cfg] [📜 Log    ] [——]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## F2. COMBAT VIEW — BOSS PHASE VARIANT

```
  ── Differences from base state ───────────────────────────────────────────
  ║  BOSS PHASE HEADER (above battlefield):                                 ║
  ║  ╔══════════════════════════════════════════════════════════════════╗   ║
  ║  ║  ⚠ PHASE 2 ACTIVATED — ASPECT OF RAGE                           ║   ║
  ║  ║  "Vharath sheds its mortal shell. The ground trembles."          ║   ║
  ║  ╚══════════════════════════════════════════════════════════════════╝   ║
  ║                                                                         ║
  ║  BOSS ENEMY DISPLAY (wider card):                                       ║
  ║  ┌──────────────────────────────────────────────────────────────────┐   ║
  ║  │  💀 VHARATH THE HOLLOW — ASPECT OF RAGE          BOSS  PHASE 2  │   ║
  ║  │  HP  ████████████░░░░░░░░░░░░░░░░░░░░  280 / 480                 │   ║
  ║  │  STA ████████████████████  200 / 200                             │   ║
  ║  │  Enrage: 🔥 ×4   Shell: ⚡ IMMUNE   Weak: ❄                     │   ║
  ║  └──────────────────────────────────────────────────────────────────┘   ║
  ──────────────────────────────────────────────────────────────────────────
```

---

## F3. COMBAT — ENEMY TURN (waiting state)

```
  ── Middle canvas during enemy turn ───────────────────────────────────────
  ║  ENEMY TURN                                                             ║
  ║  ══════════════════════════════════════                                 ║
  ║  🐺 Wolf A is acting...                                                 ║
  ║                                                                         ║
  ║  POUNCE — Wolf A → YOU                                                  ║
  ║  Roll: 72 vs DEF 10 → HIT                                              ║
  ║  Damage: 16 (physical)                                                  ║
  ║  YOU: 142 HP → 126 HP                                                   ║
  ║                                                                         ║
  ║  [ Continue ]  (auto-advances after 0.8s if combat speed ≠ SLOW)       ║
  ──────────────────────────────────────────────────────────────────────────
```

---

## F4. COMBAT VICTORY OVERLAY

```
╔══[NO HUD — OVERLAY]═════════════════════════════════════════════════════════════════════════════╗
║  ░░░░░░░  ┌──────────────────────────────────────────────────────────┐  ░░░░░░░  ║
║  ░░░░░░░  │  ✦ VICTORY                                               │  ░░░░░░░  ║
║  ░░░░░░░  ├──────────────────────────────────────────────────────────┤  ░░░░░░░  ║
║  ░░░░░░░  │  Enemies defeated: Wolf ×3                               │  ░░░░░░░  ║
║  ░░░░░░░  │  Rounds: 4                                               │  ░░░░░░░  ║
║  ░░░░░░░  │                                                          │  ░░░░░░░  ║
║  ░░░░░░░  │  XP GAINED                                               │  ░░░░░░░  ║
║  ░░░░░░░  │  You:   +240 XP   (Lv. 7 — 1,840 / 2,500)               │  ░░░░░░░  ║
║  ░░░░░░░  │  Aria:  +240 XP                                          │  ░░░░░░░  ║
║  ░░░░░░░  │  Mira:  +240 XP                                          │  ░░░░░░░  ║
║  ░░░░░░░  │                                                          │  ░░░░░░░  ║
║  ░░░░░░░  │  GOLD FOUND:  +60G  (340G → 400G)                        │  ░░░░░░░  ║
║  ░░░░░░░  │                                                          │  ░░░░░░░  ║
║  ░░░░░░░  │  LOOT                                                    │  ░░░░░░░  ║
║  ░░░░░░░  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐                            │  ░░░░░░░  ║
║  ░░░░░░░  │  │ 🦷 │ │ 🧪 │ │ 🌿 │ │    │                            │  ░░░░░░░  ║
║  ░░░░░░░  │  │ ×2 │ │ ×1 │ │ ×3 │ │ ×1 │                            │  ░░░░░░░  ║
║  ░░░░░░░  │  └────┘ └────┘ └────┘ └────┘                            │  ░░░░░░░  ║
║  ░░░░░░░  │  Wolf   Healing  Herb   Wolf                             │  ░░░░░░░  ║
║  ░░░░░░░  │  Fang   Potion   Bundle Pelt                             │  ░░░░░░░  ║
║  ░░░░░░░  │                                                          │  ░░░░░░░  ║
║  ░░░░░░░  │  Inventory: 14 / 20  (after taking all: 18 / 20)         │  ░░░░░░░  ║
║  ░░░░░░░  ├──────────────────────────────────────────────────────────┤  ░░░░░░░  ║
║  ░░░░░░░  │  [ Take All & Return ]           [ Discard All ]         │  ░░░░░░░  ║
║  ░░░░░░░  └──────────────────────────────────────────────────────────┘  ░░░░░░░  ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## F5. DEFEAT / DEATH VIEW

```
╔══[NO HUD — DEFEAT]══════════════════════════════════════════════════════════════════════════════╗
║                                                                                                 ║
║                                   [ dark, desaturated background ]                             ║
║                                                                                                 ║
║                              ┌───────────────────────────────────────┐                         ║
║                              │                                       │                         ║
║                              │            ✕  DEFEATED                │                         ║
║                              │  ───────────────────────────────────  │                         ║
║                              │                                       │                         ║
║                              │  You were defeated by Wolf Pack.      │                         ║
║                              │  Location: Forest Entrance            │                         ║
║                              │  Phase: Midnight · Day 14             │                         ║
║                              │                                       │                         ║
║                              │  Consequence:                         │                         ║
║                              │  Transported to last safe node.       │                         ║
║                              │  Gold penalty: −10% (−34G)            │                         ║
║                              │  Items lost: none (soft defeat)       │                         ║
║                              │                                       │                         ║
║                              │  Aria — downed. Recovers at manor.    │                         ║
║                              │  Mira — downed. Recovers at manor.    │                         ║
║                              │                                       │                         ║
║                              │  [ Load Last Save ]   [ Continue ]    │                         ║
║                              │                                       │                         ║
║                              └───────────────────────────────────────┘                         ║
║                                                                                                 ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## F6. COMBAT — FLEE CONFIRMATION MODAL

```
╔══════════════════════════════════════════════════════╗
║  🏃 FLEE COMBAT?                          [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Flee roll: 60% chance of success                    ║
║  (AGI 10 vs enemy speed 8)                           ║
║                                                      ║
║  On success: return to previous tile (safe)          ║
║  On failure: enemy gets free attack before you flee  ║
║                                                      ║
║  Party: Mira at 80 HP — ⚠ low health, consider      ║
║                                                      ║
║  [ Attempt Flee — 60% ]           [ Stay & Fight ]   ║
╚══════════════════════════════════════════════════════╝
```

---

## F7. MIND CONTROL ACTIVE STATE (combat HUD addition)

```
  ── Left HUD panel extra block when Mind Control is active ────────────────
  ║  MIND CONTROL              ║
  ║  ──────────────────        ║
  ║  🌀 ACTIVE                 ║
  ║  Target: Wolf A            ║
  ║  Duration: 2 rounds left   ║
  ║  Commands available:       ║
  ║  · Attack ally             ║
  ║  · Hold position           ║
  ║  [ Issue Command ]         ║
  ──────────────────────────────
```

---

## F8. INTERROGATION VIEW
# After non-lethal KO of human/named enemy. Mid-combat sub-view.

```
╔══[IRON — FORTIFIED]═════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☽NIGHT  7/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]             ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  PLAYER VITALS   ║  🗣 INTERROGATION                                ║  SUBJECT                    ║
║  ...HUD same...  ║  Subject: Bandit Captain Orin  (non-lethal KO)  ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║                                                  ║  Bandit Captain Orin        ║
║                  ║  [Orin is on his knees, bound. His breathing     ║  Human · Male               ║
║                  ║   is ragged. He glares up at you.]               ║  Affiliation: Crow Gang     ║
║                  ║                                                  ║  Resistance: HIGH           ║
║                  ║  Choose approach:                                ║  PER: 14 (you: 12)          ║
║                  ║                                                  ║                             ║
║                  ║  ○ Threaten  (STR check: 55%)                   ║  Flags earned:              ║
║                  ║    "Tell me where the camp is or I end this."   ║  · orin_captured ✓          ║
║                  ║                                                  ║  · crow_base_loc: ?         ║
║                  ║  ○ Bargain   (PER check: 42%)                   ║  · crow_payment_cache: ?    ║
║                  ║    "What's the information worth to you?"       ║                             ║
║                  ║                                                  ║  ──────────────────────     ║
║                  ║  ○ Humiliate (no check — alignment cost)        ║  PreviousTalks: 0           ║
║                  ║    Forces partial info. −4 alignment.           ║                             ║
║                  ║                                                  ║  On success:                ║
║                  ║  ○ Release   (no check)                         ║  Unlocks quest objective    ║
║                  ║    Let him go. Faction rep +5 Crow.             ║  Crow Hideout location      ║
║                  ║                                                  ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [⚔ Threaten  ] [💰 Bargain  ] [😈 Humiliate] [🕊 Release  ] [——        ] [——        ] [——  ]║
║  R3: [——          ] [——          ] [——          ] [——          ] [——        ] [——        ] [——  ]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART G — DIALOGUE & STORY
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## G1. DIALOGUE VIEW — STANDARD

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  PLAYER VITALS   ║  💬 DIALOGUE — Mira Ashlen                      ║  NPC PROFILE                ║
║  ...HUD left...  ║  ──────────────────────────────────────────────  ║  ──────────────────────     ║
║                  ║                                                  ║                             ║
║                  ║  [NPC portrait — large, left of text box]        ║  MIRA ASHLEN                ║
║                  ║                                                  ║  Human · Merchant           ║
║                  ║  ╔════════════════════════════════════════════╗  ║                             ║
║                  ║  ║  MIRA:                                     ║  ║  Trust:  28 / 100           ║
║                  ║  ║  "Oh— it's you again. I was wondering      ║  ║  Love:   18 / 100           ║
║                  ║  ║   when you'd come by. I've been holding    ║  ║  Stage:  ACQUAINTANCE       ║
║                  ║  ║   onto something for you..."               ║  ║                             ║
║                  ║  ╚════════════════════════════════════════════╝  ║  Mood: Warm                 ║
║                  ║                                                  ║  Schedule: here until Eve   ║
║                  ║  CHOICES                                         ║                             ║
║                  ║  ──────────────────────────────────────────────  ║  ──────────────────────     ║
║                  ║  ○ 1. "What is it?"                              ║  HISTORY                    ║
║                  ║       → opens item delivery sub-flow             ║  Talked: 6 times            ║
║                  ║                                                  ║  Gifted: 2 times            ║
║                  ║  ○ 2. "Have you heard anything unusual lately?" ║  Last talk: Day 10          ║
║                  ║       → rumour branch: Crow Gang activity        ║                             ║
║                  ║                                                  ║  ──────────────────────     ║
║                  ║  ○ 3. [Trust 40] "Can I ask you something       ║  TRUST GATE                 ║
║                  ║       personal?"                                 ║  🔒 Requires Trust 40       ║
║                  ║       → 🔒 LOCKED — Trust 28 / 40 needed        ║  Current: 28 / 40           ║
║                  ║                                                  ║  Option 3 is greyed         ║
║                  ║  ○ 4. "Nothing, just checking in."              ║                             ║
║                  ║       → polite goodbye, Trust +1                 ║  ──────────────────────     ║
║                  ║                                                  ║  ALIGNMENT COST             ║
║                  ║  ○ 5. "I need to go."                           ║  None for current choices   ║
║                  ║       → end conversation                         ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Choice 1    ] [Choice 2    ] [Choice 3 🔒 ] [Choice 4    ] [Choice 5    ] [——      ] [——  ]║
║  R3: [——          ] [——          ] [——           ] [——          ] [——          ] [——      ] [End]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## G2. DIALOGUE — FLAG/STAT LOCKED CHOICE VARIANTS

```
  ── Locked choice states shown inline ───────────────────────────────────────────────────────
  ○ 3. [Trust 40]  "Can I ask you something personal?"
       🔒 LOCKED — Trust 28 / 40  (12 more needed)

  ○ 4. [Quest: wolf_hunt complete]  "I took care of that wolf problem."
       🔒 LOCKED — quest not complete

  ○ 5. [INT 15]  "I think I know what you're describing."
       🔒 LOCKED — INT 10 / 15

  ○ 6. [DEV: dark_path active]  "There are ways to make you talk."
       ✓ AVAILABLE — alignment hint: −5 Sovereign

  ○ 7. [STR 12 ✓]  "Let me handle this."
       ✓ AVAILABLE (stat check met)
  ─────────────────────────────────────────────────────────────────────────────────────────────
```

---

## G3. DIALOGUE — GIFT GIVING SUB-PANEL
# Opens within dialogue when "Give Gift" is chosen.

```
╔════════════════════════════════════════════════════════════════╗
║  🎁 GIVE GIFT TO MIRA                           [ x ]          ║
╠════════════════════════════════════════════════════════════════╣
║  Filter: (●) All  (○) High value  (○) Food  (○) Jewellery      ║
║                                                                ║
║  Mira's preferences:  Jewellery ✓  Perfume ✓  Food ~          ║
║  (shown if preference flags are known — hidden otherwise)      ║
║                                                                ║
║  ┌──────────────────────────────────────────────────────────┐  ║
║  │  Silk Ribbon         Gift ·  50G value   Trust +6  [✓]   │  ║
║  │  Gold Hoop Earrings  Jwly · 160G value   Trust +14 [✓]   │  ║
║  │  Herb Bundle         Mat  ·  20G value   Trust +1  [ ]   │  ║
║  │  Healing Potion      Cons ·  30G value   Trust +2  [ ]   │  ║
║  └──────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  Selected: Gold Hoop Earrings (+14 Trust, +8 Love)             ║
║  ⚠ Removes item from inventory permanently.                    ║
║                                                                ║
║  [ Give Selected Gift ]              [ Cancel ]                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## G4. CUTSCENE VIEW — STORY MOMENT WITH CHOICES

```
╔══[NO HUD — CUTSCENE]════════════════════════════════════════════════════════════════════════════╗
║                                                                                                 ║
║                                                                                                 ║
║                     ╔══════════════════════════════════════════════╗                           ║
║                     ║                                              ║                           ║
║                     ║  [full-width scene illustration / CG]        ║                           ║
║                     ║  — atmospheric, no HUD overlay —             ║                           ║
║                     ║                                              ║                           ║
║                     ╚══════════════════════════════════════════════╝                           ║
║                                                                                                 ║
║  ╔══════════════════════════════════════════════════════════════════════════════════════════╗   ║
║  ║  NARRATOR:                                                                              ║   ║
║  ║  "The goddess Solenne descends from the light column. Her voice is not unkind,          ║   ║
║  ║   but it carries the weight of consequence."                                            ║   ║
║  ║                                                                                        ║   ║
║  ║  SOLENNE:                                                                               ║   ║
║  ║  "You are not from this world. I know what you carry — that strange fire inside you.   ║   ║
║  ║   It is not MP as we understand it. You should know what that means."                  ║   ║
║  ╚══════════════════════════════════════════════════════════════════════════════════════════╝   ║
║                                                                                                 ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  ○ "What does it mean?"       → continues story beat, no consequence                    │  ║
║  │  ○ "I already know."          → flag: mc_knows_mp_nature. +Divinity 2.                  │  ║
║  │  ○ "What do you want from me?" → flag: mc_suspicious_of_gods. Ending Axis: −1 faith    │  ║
║  └──────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                                 ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## G5. CUTSCENE — NARRATOR-ONLY VARIANT (no choice)

```
  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
  ║  NARRATOR:                                                                              ║
  ║  "Three days pass. The city does not forget what happened at the east gate. Neither     ║
  ║   do you. But life in Thornspire Market continues with its usual noise and commerce."   ║
  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
  
                         [ ▶ Continue ]   (or tap anywhere to advance)
```

---

## G6. QUEST ACCEPT CONFIRMATION

```
╔══════════════════════════════════════════════════════╗
║  📋 ACCEPT QUEST?                         [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  WOLF HUNT  ·  Mira Ashlen                           ║
║  ───────────────────────────────────────────────     ║
║  "The wolves have been coming closer to town.        ║
║   I'll pay you to thin the pack."                    ║
║                                                      ║
║  Objectives:                                         ║
║  1. Defeat wolves in Forest Entrance: 0 / 5          ║
║  2. Report back to Mira                              ║
║                                                      ║
║  Reward:  200G  · Trust +12  · Rep +20 (Thornspire) ║
║  Time limit: Day 20  (6 days)                        ║
║                                                      ║
║  Alignment note: none                                ║
║                                                      ║
║  [ Accept Quest ]                [ Decline ]         ║
╚══════════════════════════════════════════════════════╝
```

---

## G7. QUEST COMPLETE OVERLAY

```
╔══════════════════════════════════════════════════════╗
║  ✦ QUEST COMPLETE!                        [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  WOLF HUNT  ·  COMPLETE                              ║
║                                                      ║
║  "Thank you. We can breathe a little easier now."    ║
║  — Mira Ashlen                                       ║
║                                                      ║
║  REWARDS GRANTED:                                    ║
║  💰 +200G   (340G → 540G)                            ║
║  🤝 Trust +12 → Mira: 40 / 100                       ║
║  ★ Reputation +20  Thornspire: 162 → 182             ║
║  XP: +300                                            ║
║                                                      ║
║  New trust threshold unlocked:                       ║
║  Choice 3 (personal question) now available.         ║
║                                                      ║
║  [ Continue ]                                        ║
╚══════════════════════════════════════════════════════╝
```

---

## G8. QUEST FAIL NOTIFICATION

```
╔══════════════════════════════════════════════════════╗
║  ✕ QUEST FAILED                           [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  WOLF HUNT — EXPIRED                                 ║
║  Time limit reached: Day 20                          ║
║                                                      ║
║  "It's fine. I hired someone else in the end."       ║
║  — Mira Ashlen                                       ║
║                                                      ║
║  Consequence:                                        ║
║  Trust −10  Mira: 28 → 18                            ║
║  Reputation −5  Thornspire                           ║
║                                                      ║
║  [ Acknowledge ]                                     ║
╚══════════════════════════════════════════════════════╝
```

---

## G9. ALIGNMENT BRANCH CHOICE OVERLAY

```
╔═══════════════════════════════════════════════════════════════╗
║  ⚠ ALIGNMENT CONSEQUENCE                         [ x ]        ║
╠═══════════════════════════════════════════════════════════════╣
║  Action: "Force Orin to tell you everything."                 ║
║                                                               ║
║  This action will:                                            ║
║  · Extract quest information immediately                      ║
║  · Cost: −4 Alignment  (Pragmatist → Sovereign territory)    ║
║  · Reputation: −8 with Crow Gang  (may become hostile)       ║
║  · Orin will not cooperate with you again.                    ║
║                                                               ║
║  Current alignment: ◈ PRAGMATIST (+12)                        ║
║  After: ◈ PRAGMATIST (+8)                                     ║
║                                                               ║
║  [ Proceed Anyway ]              [ Choose Different Option ]  ║
╚═══════════════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART H — INTIMACY
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## H1. INTIMACY VIEW — ACTIVE SCENE

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☽NIGHT  7/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]             ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  SCENE STATUS    ║  SCENE TEXT                                      ║  NPC STATUS                 ║
║  ──────────────  ║  ──────────────────────────────────────────────  ║  ──────────────────────     ║
║                  ║                                                  ║                             ║
║  MIRA ASHLEN     ║  [NPC portrait or scene illustration             ║  MIRA ASHLEN                ║
║                  ║   — changes with position/clothing state]        ║  Stage: ACQUAINTANCE        ║
║  Clothing:       ║                                                  ║                             ║
║  TOPLESS         ║  ╔════════════════════════════════════════════╗  ║  Arousal:                   ║
║  Condition: OK   ║  ║  VOCAL:                                    ║  ║  ████████░░░░  65 / 100     ║
║                  ║  ║  "W-wait, slow down..."                    ║  ║                             ║
║  Position:       ║  ╠════════════════════════════════════════════╣  ║  Wetness:                   ║
║  MISSIONARY      ║  ║  BODY:                                     ║  ║  ██████░░░░░░  52 / 100     ║
║                  ║  ║  Her fingers clutch the sheets.            ║  ║                             ║
║  Action:         ║  ╠════════════════════════════════════════════╣  ║  Life Force:                ║
║  THRUST_SLOW     ║  ║  NARRATION:                                ║  ║  ████████████  100 / 100    ║
║                  ║  ║  The pace is deliberate. She's not         ║  ║                             ║
║  Round: 4        ║  ║  hiding the colour in her cheeks anymore.  ║  ║  Satisfaction:              ║
║                  ║  ╠════════════════════════════════════════════╣  ║  ████░░░░░░░░  34 / 100     ║
║  Scene type:     ║  ║  SFX:                                      ║  ║                             ║
║  CONSENSUAL      ║  ║  Soft, wet sounds with each push.          ║  ║  Engagement:                ║
║                  ║  ╠════════════════════════════════════════════╣  ║  WILLING                    ║
║  Engagement:     ║  ║  PLAYER LINE:                              ║  ║                             ║
║  WILLING         ║  ║  "Look at me."                             ║  ║  Orgasm count: 0            ║
║                  ║  ╚════════════════════════════════════════════╝  ║  Faint risk: LOW            ║
║  Shame: LOW      ║                                                  ║                             ║
║                  ║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║  ──────────────────────     ║
║  CPW cost so far ║  NEXT NARRATIVE LAYER PREVIEW                   ║  AUDIENCE / EXPOSURE        ║
║  12 / 80 (✓)    ║  → continue: thrust_slow (round 5)              ║  Gate: NONE PRESENT         ║
║                  ║  → change action: see action hotbar             ║  Exposure: PRIVATE          ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [⚡ Continue  ] [🔀 Change Act.] [🧘 Position  ] [🧪 Use Item ] [💊 Consumable] [—— ] [End] ║
║  R3: [👗 Undress   ] [🤲 Caress    ] [👄 Kiss/Oral ] [🎯 Focus Pt.] [⏸ Pause     ] [—— ] [◄End]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## H2. INTIMACY — ACTION PICKER OPEN (R1 → Change Action)

```
╠═════════════════════════════════════════════════════════════════════════════════════════════════╣
║  ACTION PICKER                                                                                  ║
║  Current: THRUST_SLOW  ·  Position: MISSIONARY  ·  Engagement: WILLING                         ║
║  ────────────────────────────────────────────────────────────────────────────────────────────── ║
║                                                                                                 ║
║  THRUSTING              ORAL              TOUCHING           SPECIAL                           ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────────┐                       ║
║  │ SLOW      ✓│  │ CUNNILINGUS│  │ CARESS     │  │ SUBSPACE CHECK     │                       ║
║  │ AP: 1      │  │ AP: 1      │  │ AP: 1      │  │ Arousal ≥ 85 req.  │                       ║
║  │ Arousal +8 │  │ Arousal +12│  │ Arousal +4 │  │ 🔒 (65 / 85)       │                       ║
║  └────────────┘  └────────────┘  └────────────┘  └────────────────────┘                       ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────────┐                       ║
║  │ MEDIUM     │  │ DEEPTHROAT │  │ NIPPLE PIN │  │ ORGASM DENIAL      │                       ║
║  │ AP: 1      │  │ 🔒 PER 14  │  │ AP: 1      │  │ Requires 2+ orgasm │                       ║
║  │ Arousal +12│  │ (you: 12)  │  │ Arousal +10│  │ 🔒 not yet         │                       ║
║  └────────────┘  └────────────┘  └────────────┘  └────────────────────┘                       ║
║  ┌────────────┐  ┌────────────┐                                                                ║
║  │ FAST       │  │ DEEPTHROAT │                                                                ║
║  │ AP: 2      │  │ FORCE      │                                                                ║
║  │ Arousal +18│  │ AP: 2      │                                                                ║
║  └────────────┘  └────────────┘                                                                ║
║  ────────────────────────────────────────────────────────────────────────────────────────────── ║
║  [ Select Action ]                                                   [ Cancel ]                 ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## H3. INTIMACY — POSITION PICKER OPEN

```
╠═════════════════════════════════════════════════════════════════════════════════════════════════╣
║  POSITION PICKER  ·  Current: MISSIONARY                                                        ║
║  ────────────────────────────────────────────────────────────────────────────────────────────── ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐               ║
║  │ MISSIONARY ✓│  │ DOGGY     │  │ COWGIRL    │  │ REVERSE CG │  │ AGAINST    │               ║
║  │            │  │            │  │ Lv2 req.   │  │ Lv3 req. 🔒│  │ WALL       │               ║
║  │ No req.    │  │ No req.    │  │ (love 30)  │  │            │  │ STR 14 🔒  │               ║
║  └────────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘               ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐                                               ║
║  │ STANDING   │  │ ON KNEES   │  │ BOUND      │                                               ║
║  │ No req.    │  │ (oral pos) │  │ Rope req.  │                                               ║
║  │            │  │            │  │ 🔒 no rope │                                               ║
║  └────────────┘  └────────────┘  └────────────┘                                               ║
║  ────────────────────────────────────────────────────────────────────────────────────────────── ║
║  [ Select Position ]                                                 [ Cancel ]                 ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## H4. INTIMACY — ORGASM EVENT

```
╠════════════════════════════════════════════════════════════════╣
║  ✦ ORGASM EVENT — MIRA                                          ║
╠════════════════════════════════════════════════════════════════╣
║  Trigger: arousal 100 / 100 · thrust_medium                    ║
║                                                                ║
║  ╔════════════════════════════════════════════════════════════╗ ║
║  ║ VOCAL:   "Ah— aah— I can't— I'm coming—!"                 ║ ║
║  ║ BODY:    Her back arches sharply off the surface.          ║ ║
║  ║ NARR:    Whatever she intended to feel about this, her     ║ ║
║  ║          body has decided something different entirely.    ║ ║
║  ╚════════════════════════════════════════════════════════════╝ ║
║                                                                ║
║  Type: VAGINAL  (first orgasm)                                 ║
║  Life Force: 100 → 90  (−10)                                   ║
║  Satisfaction: 34 → 58  (+24)                                  ║
║  Arousal: resets to 20                                         ║
║  Orgasm count: 0 → 1                                           ║
║                                                                ║
║  Creampie risk (if applicable): 42%                            ║
║                                                                ║
║  [ Continue Scene ]           [ End Scene Here ]               ║
╠════════════════════════════════════════════════════════════════╣
```

---

## H5. INTIMACY — NPC FAINTED STATE

```
  ── Left HUD panel extra block ───────────────────────────────────────────
  ║  ⚠ FAINT WARNING           ║
  ║  Life Force: 15 / 100      ║
  ║  CRITICAL — faint imminent ║
  ║  Next orgasm may cause     ║
  ║  unconsciousness.          ║
  ║  Continue? [ Yes ] [ End ] ║
  ──────────────────────────────

  ── If faint triggers ────────────────────────────────────────────────────
  ╠════════════════════════════════════════════════════════════════╣
  ║  ⚠ MIRA HAS FAINTED                                            ║
  ╠════════════════════════════════════════════════════════════════╣
  ║  Life Force depleted.                                          ║
  ║                                                                ║
  ║  "She goes limp in your arms."                                 ║
  ║                                                                ║
  ║  Scene options while unconscious:                              ║
  ║  · Continue (force_sleeping context activates)                 ║
  ║  · End scene (Mira recovers; no death consequence)             ║
  ║                                                                ║
  ║  ⚠ Further orgasms from this state = DEATH CONSEQUENCE        ║
  ║    (requires intimacy_death_enabled content flag)              ║
  ║                                                                ║
  ║  [ Continue — Force Sleeping ]       [ End Scene ]             ║
  ╠════════════════════════════════════════════════════════════════╣
```

---

## H6. INTIMACY — END SCENE SUMMARY

```
╔══════════════════════════════════════════════════════════════════╗
║  ♥ SCENE SUMMARY — MIRA ASHLEN                       [ x ]       ║
╠══════════════════════════════════════════════════════════════════╣
║  Duration: 6 rounds  · Type: CONSENSUAL                          ║
║  Final position: MISSIONARY  · Last action: THRUST_SLOW          ║
║                                                                  ║
║  NPC OUTCOMES                                                    ║
║  Satisfaction:    68 / 100   ★ Good                              ║
║  Orgasms:         2  (vaginal ×2)                                ║
║  Life Force:      75 / 100  (safe)                               ║
║  Clothing state:  FULLY_UNDRESSED                                ║
║  Creampie:        YES  (pregnancy risk: 28%)                     ║
║                                                                  ║
║  RELATIONSHIP CHANGES                                            ║
║  Trust:    +14  (28 → 42)   ← new threshold unlocked!           ║
║  Love:     +20  (18 → 38)                                        ║
║  Stage:    ACQUAINTANCE → COMPANION                              ║
║                                                                  ║
║  PLAYER STAT CHANGES                                             ║
║  CPW spent: −18   (remaining: 62 / 80)                           ║
║  XP: +120 (intimacy experience)                                  ║
║                                                                  ║
║  New flag unlocked: mira_first_scene ✓                           ║
║                                                                  ║
║  [ Continue ]                                                    ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## H7. INITIATE SCENE — CONSENSUAL CONFIRMATION

```
╔══════════════════════════════════════════════════════╗
║  ♥ INITIATE INTIMATE SCENE?               [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Partner: Mira Ashlen                                ║
║  Type: CONSENSUAL                                    ║
║  Location: Thornspire Market  ✦ SAFE · PRIVATE       ║
║                                                      ║
║  ✓ Mira willing (stage: Companion, trust 42+)        ║
║  ✓ Location private                                  ║
║  ✓ Adult content enabled                             ║
║                                                      ║
║  CPW cost: ~15–30 estimated (varies by scene length) ║
║  Your CPW: 62 / 80  ✓                               ║
║                                                      ║
║  [ Begin Scene ]                 [ Cancel ]          ║
╚══════════════════════════════════════════════════════╝
```

---

## H8. INITIATE SCENE — FORCE CONFIRMATION

```
╔══════════════════════════════════════════════════════╗
║  ⚠ INITIATE — FORCED SCENE                [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Partner: Vespera                                    ║
║  Type: FORCED (non-consensual)                       ║
║  ⚠ Requires: non-con content flag ON  ✓             ║
║                                                      ║
║  Vespera's current state:                            ║
║  · Trust: 12  · Stage: STRANGER                     ║
║  · She will resist.                                  ║
║                                                      ║
║  Alignment consequence: −6  (you will shift toward   ║
║  Sovereign)                                          ║
║  Reputation: −12 civil (if witnessed)                ║
║  Relationship: Trust −20, negative relationship path ║
║                                                      ║
║  ⚠ This action is irreversible within this playthrough║
║                                                      ║
║  [ Proceed ]                     [ Cancel ]          ║
╚══════════════════════════════════════════════════════╝
```

---

## H9. INITIATE SCENE — FORCE SLEEPING CONFIRMATION

```
╔══════════════════════════════════════════════════════╗
║  ⚠ FORCE SLEEPING SCENE                   [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Partner: Aria  (sleeping in Manor Suite 1)          ║
║  Type: FORCE_SLEEPING                                ║
║  ⚠ Requires: force_sleeping content flag ON  ✓      ║
║                                                      ║
║  Aria is asleep. She will not wake.                  ║
║  Narration: sleeping_context fragments will apply.   ║
║                                                      ║
║  Alignment: −8  (significant Sovereign shift)        ║
║  Trust change: varies (discovered: −30 or more)      ║
║  Scene type flags: force_sleeping_active = true      ║
║                                                      ║
║  [ Begin — Force Sleeping ]      [ Cancel ]          ║
╚══════════════════════════════════════════════════════╝
```

---

## H10. INTIMACY GATE BLOCKED — AUDIENCE / EXPOSURE

```
╔══════════════════════════════════════════════════════╗
║  ⛔ SCENE BLOCKED — AUDIENCE PRESENT       [ x ]     ║
╠══════════════════════════════════════════════════════╣
║  Action: THRUST_SLOW  ·  Location: Market Square     ║
║                                                      ║
║  Gate: AUDIENCE CHECK — FAILED                       ║
║  Audience present: 3 NPCs within 2 tiles             ║
║  Required for this action: PRIVATE (0 audience)      ║
║                                                      ║
║  Options:                                            ║
║  · Move to a private location first                  ║
║  · Use crowd_exploit perk (requires Sovereign path)  ║
║    🔒 not unlocked                                   ║
║                                                      ║
║  [ Change Action ]               [ End Scene ]       ║
╚══════════════════════════════════════════════════════╝
```

---

## H11. ADULT CONTENT GATE MODAL
# Shown the first time adult content is triggered if flag is off.

```
╔══════════════════════════════════════════════════════╗
║  ⚠ ADULT CONTENT DISABLED                 [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  This scene contains explicit adult content.         ║
║                                                      ║
║  Adult content is currently disabled in settings.    ║
║                                                      ║
║  To enable:                                          ║
║  [≡ MENU] → Settings → Content → Enable Adult Content║
║                                                      ║
║  With adult content disabled, intimate interactions  ║
║  will produce a fade-to-black summary instead.       ║
║                                                      ║
║  [ Go to Settings ]       [ Use Fade-to-Black ]      ║
╚══════════════════════════════════════════════════════╝
```

---

## H12. GROUP SCENE GATE FAIL MODAL

```
╔══════════════════════════════════════════════════════╗
║  ⛔ GROUP SCENE BLOCKED                   [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Participant: Lyra (attempt to add during scene)     ║
║                                                      ║
║  Gate failed:                                        ║
║  · Requires: group_scene_enabled content flag  ✓    ║
║  · Trust threshold (Lyra): 35 / 60  🔒 insufficient ║
║  · Lyra relationship: not yet Companion stage        ║
║                                                      ║
║  [ Acknowledge ]                                     ║
╚══════════════════════════════════════════════════════╝
```
# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART I — MENUS: INVENTORY & QUESTS
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## I1. MENU SHELL — INVENTORY TAB

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  PLAYER VITALS   ║  🎒 INVENTORY                                   ║  ITEM DETAIL                ║
║  ...HUD left...  ║  Slots: 14 / 20   Weight: 8.4 / 20 kg           ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║                                                  ║  Health Potion              ║
║                  ║  Filter: (●) All (○) Consumable (○) Material     ║  ──────────────────────     ║
║                  ║          (○) Gift  (○) Tool  (○) Key Item        ║  Type: Consumable           ║
║                  ║  Sort: [ Name ▼ ]                                ║  Rarity: Common             ║
║                  ║                                                  ║  Stack: ×2 (max 10)         ║
║                  ║  ┌──────────────────────────────────────────┐   ║                             ║
║                  ║  │  Item              Type   Qty  Wt  Value  │   ║  Restores 50 HP             ║
║                  ║  ╠════════════════════════════════════════════╣  ║  Can be used in combat.     ║
║                  ║  │► Health Potion     Cons.  ×2  0.3  30G    │  ║                             ║
║                  ║  │  Herb Bundle       Mat.   ×3  0.5  20G    │  ║  Use cost: 1 AP (combat)    ║
║                  ║  │  Wolf Fang         Mat.   ×2  0.2   5G    │  ║  Free action (exploration)  ║
║                  ║  │  Rope              Tool   ×1  0.8  20G    │  ║                             ║
║                  ║  │  Goblin Tusk       Mat.   ×1  0.4   8G    │  ║  Can equip: NO              ║
║                  ║  │  Silk Ribbon       Gift   ×1  0.1  50G    │  ║  Can gift:  YES             ║
║                  ║  │  Iron Ore          Mat.   ×5  2.0  10G    │  ║                             ║
║                  ║  │  Lubricant         Tool   ×1  0.2  50G    │  ║  ──────────────────────     ║
║                  ║  │  Steel Sword       Equip  ×1  3.0 150G    │  ║  ACTIONS                    ║
║                  ║  │  Worn Travel Cloak Cloth  ×1  1.5  10G    │  ║  [ Use ]                    ║
║                  ║  │  Condom            Cons.  ×3  0.1  10G    │  ║  [ Give as Gift ]           ║
║                  ║  │  Goblin Fang       Mat.   ×2  0.2   5G    │  ║  [ Drop (lose forever) ]    ║
║                  ║  │  Wolf Pelt         Mat.   ×2  1.0  25G    │  ║  [ Split Stack ]            ║
║                  ║  │  Moonstone Ring    Cloth  ×1  0.1 200G    │  ║                             ║
║                  ║  └──────────────────────────────────────────┘   ║  ──────────────────────     ║
║                  ║                                                  ║  SELL VALUE                 ║
║                  ║  Tabs: [► INVENTORY ] [ QUESTS ]                ║  At current rep: 15G ea.    ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Use Item    ] [Give Gift   ] [Drop Item   ] [Split Stack ] [Sort A–Z   ] [Filter    ] [——  ]║
║  R3: [——          ] [——          ] [——           ] [——          ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## I2. MENU SHELL — QUESTS TAB (Active Quests)

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  PLAYER VITALS   ║  📋 QUESTS                                      ║  QUEST DETAIL               ║
║  ...HUD left...  ║  Tabs: [► ACTIVE (3)] [AVAILABLE (2)] [DONE(8)] ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║                                                  ║  ► GOBLIN NEST CLEARANCE    ║
║                  ║  MAIN QUEST                                      ║  Giver: Charter Office      ║
║                  ║  ────────────────────────────────────────────    ║  Type: MAIN                 ║
║                  ║  ► Traces of Another World          Act 1        ║                             ║
║                  ║    Investigate the MP anomaly reports.           ║  Objectives:                ║
║                  ║    Objective: Speak with Guild Head  ○ pending   ║  1. Reach: Goblin Den ✓     ║
║                  ║    Deadline: none  · Reward: story               ║  2. Defeat Goblin Chief ○   ║
║                  ║                                                  ║  3. Report to Charter ○     ║
║                  ║  SIDE QUESTS                                     ║                             ║
║                  ║  ────────────────────────────────────────────    ║  Progress: 1 / 3            ║
║                  ║  ► Goblin Nest Clearance            Charter      ║                             ║
║                  ║    Clear the nest south of town.                 ║  Deadline: Day 20           ║
║                  ║    Objective 1: ✓  2: ○  3: ○  (1/3)            ║  Time left: 6 days          ║
║                  ║    Deadline: Day 20  · Reward: 300G + Rep +30    ║                             ║
║                  ║                                                  ║  Reward:                    ║
║                  ║  ► Mira's Lost Shipment            Side          ║  💰 300G                    ║
║                  ║    Find Mira's missing stock.                    ║  Reputation +30 Charter     ║
║                  ║    Objective 1: ✓  (1/2)                        ║  Trust +8 Mira              ║
║                  ║    Deadline: Day 18  · Reward: Trust +20 Mira    ║                             ║
║                  ║                                                  ║  ──────────────────────     ║
║                  ║  COMPANION SUB-QUESTS                           ║  Map node hint:             ║
║                  ║  ────────────────────────────────────────────    ║  Goblin Den ·  3 steps S.   ║
║                  ║  Mira — Personal Quest: locked (trust < 60)      ║  (undiscovered)             ║
║                  ║  Aria — Personal Quest: locked (trust < 60)      ║                             ║
║                  ║                                                  ║  [ 🗺 Mark on Map ]         ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Mark on Map ] [Track Quest  ] [Abandon Quest] [——          ] [——         ] [——        ] [——]║
║  R3: [——          ] [——           ] [——           ] [——          ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## I3. QUESTS TAB — AVAILABLE QUESTS

```
  ── Middle canvas when [AVAILABLE] tab selected ─────────────────────────────────────────────
  ║  AVAILABLE QUESTS  (not yet accepted)                                                    ║
  ║  ──────────────────────────────────────────────────────────────────────────────────────  ║
  ║  Posted: Charter Notice Board             [Accept Now] [View Detail]                    ║
  ║  PATROL ROUTE — Guard the North Road                                                    ║
  ║  Reward: 150G + Rep +15  ·  Deadline: Day 16  ·  Difficulty: ★★☆☆                      ║
  ║                                                                                        ║
  ║  Posted: Innkeeper Dawnside               [Accept Now] [View Detail]                   ║
  ║  MISSING TRAVELLER — Find the merchant who didn't return from Old Road South.           ║
  ║  Reward: 200G  ·  No deadline  ·  Difficulty: ★★★☆                                     ║
```

---

## I4. QUANTITY SELECTOR MODAL
# Triggered by split stack, buy ×N, or sell ×N.

```
╔════════════════════════════════════════════════╗
║  QUANTITY SELECTOR                   [ x ]     ║
╠════════════════════════════════════════════════╣
║  Item: Health Potion  (stack: ×2)              ║
║                                                ║
║  How many?  [ − ]  [ 1 ]  [ + ]                ║
║             [Min]  [Half] [Max]                ║
║                                                ║
║  Selected: 1   Value: 30G                      ║
║                                                ║
║  [ Confirm: 1 ]              [ Cancel ]        ║
╚════════════════════════════════════════════════╝
```

---

## I5. ITEM USE CONFIRMATION

```
╔════════════════════════════════════════════════╗
║  USE ITEM?                           [ x ]     ║
╠════════════════════════════════════════════════╣
║  Health Potion  ×2  (will consume 1)           ║
║                                                ║
║  Restores: +50 HP                              ║
║  Current HP: 142 / 200 → 192 / 200             ║
║  (capped at 200 max)                           ║
║                                                ║
║  Remaining after: ×1                           ║
║                                                ║
║  [ Use ]                     [ Cancel ]        ║
╚════════════════════════════════════════════════╝
```

---

## I6. ITEM DROP CONFIRMATION

```
╔════════════════════════════════════════════════╗
║  DROP ITEM?                          [ x ]     ║
╠════════════════════════════════════════════════╣
║  Iron Ore  ×5  (drop all)                      ║
║                                                ║
║  ⚠ Items dropped in the field are lost         ║
║    permanently. You cannot recover them.       ║
║                                                ║
║  Sell value: 10G ea. (50G total)               ║
║  Consider selling at a shop instead.           ║
║                                                ║
║  [ Drop — Lose Forever ]        [ Cancel ]     ║
╚════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART J — SHOPS & ECONOMY
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## J1. SHOP VIEW — BUY / SELL (Base, see also Addendum H1)
# Covered in Part H of the addendum. Supplementary variants here.

## J2. SHOP — BLACKSMITH / FORGE TAB

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  PLAYER VITALS   ║  🔨 BLACKSMITH — Theron's Forge                 ║  ITEM DETAIL                ║
║  ...HUD left...  ║  [ BUY ]  [ SELL ]  [► FORGE ◄]  [ REPAIR ]    ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║                                                  ║  Iron Sword → Steel Sword   ║
║                  ║  UPGRADE RECIPES                                 ║  ──────────────────────     ║
║                  ║  Your items eligible for upgrade:                ║  Current: Iron Sword        ║
║                  ║                                                  ║  ATK: 10   DEF: 0           ║
║                  ║  ┌──────────────────────────────────────────┐   ║  Result: Steel Sword        ║
║                  ║  │ Iron Sword → Steel Sword                  │   ║  ATK: 15   DEF: 0           ║
║                  ║  │ Needs: Iron Ore ×3  (you: ×5 ✓)          │   ║                             ║
║                  ║  │ Cost: 80G  ·  Time: 1 phase               │   ║  Improvement:               ║
║                  ║  │                   [Forge Now]              │   ║  ATK +5  (phys. upgrade)   ║
║                  ║  ├──────────────────────────────────────────┤   ║                             ║
║                  ║  │ Worn Travel Cloak → Mended Cloak          │   ║  Materials needed:          ║
║                  ║  │ Needs: Cloth Scrap ×2  (you: ×0  🔒)     │   ║  Iron Ore ×3  ✓            ║
║                  ║  │ Cost: 20G  ·  Time: instant               │   ║  Cost: 80G                  ║
║                  ║  │                   [🔒 Missing mat.]        │   ║  Gold after: 260G           ║
║                  ║  └──────────────────────────────────────────┘   ║                             ║
║                  ║                                                  ║  [ Forge Now — 80G ]        ║
║                  ║  REPAIR                                          ║                             ║
║                  ║  Items with durability damage:                  ║                             ║
║                  ║  Steel Axe  — 60% durability  — Repair: 20G     ║                             ║
║                  ║                   [Repair — 20G] [Repair All]   ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Forge Now   ] [Repair All   ] [——          ] [——          ] [——         ] [——        ] [——  ]║
║  R3: [——          ] [——           ] [——           ] [——          ] [——         ] [——        ] [◄Close]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## J3. INN MENU — ROOM & SERVICE TAB

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  🏨 DAWNSIDE INN — Innkeeper Vela               ║  INN SERVICES               ║
║                  ║  [ BUY ] [ SELL ] [► ROOM ◄] [ SERVICES ]       ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║  ROOM HIRE                                       ║  Room: Standard             ║
║                  ║                                                  ║  ──────────────────────     ║
║                  ║  Standard Room      30G / night                 ║  Restores:                  ║
║                  ║  ·  Full HP/STA/CPW/MP restore on sleep          ║  ❤ HP + ⚡ STA + ✦ CPW + MP ║
║                  ║  ·  Private room (safe for scene initiation)     ║  Fatigue: Tier cleared      ║
║                  ║  · [ Sleep Here — 30G  (1 phase cost + 30G) ]   ║  Status: ALL cleared        ║
║                  ║                                                  ║                             ║
║                  ║  Private Suite      80G / night                 ║  Private room = YES         ║
║                  ║  ·  All above + private (upgr. scene options)   ║  Can invite companion: YES  ║
║                  ║  · [ Hire Suite — 80G ]                         ║                             ║
║                  ║                                                  ║  Your gold: 340G            ║
║                  ║  Stable (mount storage, N/A this region)         ║  After: 310G                ║
║                  ║                                                  ║                             ║
║                  ║  SERVICES                                        ║  [ Sleep Here — 30G ]       ║
║                  ║  ────────────────────────────────────────────    ║                             ║
║                  ║  Meal (restore +20% all resources): 15G  [Buy]   ║                             ║
║                  ║  Bath (cure fatigue -1 tier):        20G  [Buy]  ║                             ║
║                  ║  Rumour (last 3 regional events):    10G  [Buy]  ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Sleep 30G   ] [Hire Suite 80G] [Buy Meal 15G] [Bath 20G   ] [Rumours 10G] [——      ] [——  ]║
║  R3: [——          ] [——             ] [——           ] [——         ] [——         ] [——      ] [◄Close]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## J4. INN SLEEP CONFIRMATION MODAL

```
╔══════════════════════════════════════════════════════╗
║  😴 SLEEP AT INN?                         [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Dawnside Inn — Standard Room — 30G / night          ║
║  Gold: 340G → 310G                                   ║
║                                                      ║
║  Full restore: ❤ HP · ⚡ STA · ✦ CPW · MP             ║
║  Fatigue reset: Tier cleared                         ║
║  Status effects: ALL cleared                         ║
║  Day-end tick: runs on sleep                         ║
║  Autosave: triggers on day-end                       ║
║                                                      ║
║  Party members restored:                             ║
║  👤 Aria  ·  👤 Mira                                 ║
║                                                      ║
║  [ Sleep Here — 30G ]             [ Cancel ]         ║
╚══════════════════════════════════════════════════════╝
```

---

## J5. BANK / VAULT VIEW

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  🏦 MERCHANT VAULT — Thornspire Branch          ║  LOAN DETAIL                ║
║                  ║  Banker: Orvis  ·  Reputation: Liked (+142)      ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║                                                  ║  Active Loan                ║
║                  ║  VAULT ACCOUNT                                   ║  Principal: 400G            ║
║                  ║  Balance:         1,200G                         ║  Interest: 15% / 7 days     ║
║                  ║  Interest rate:   0.5% / day  (passive growth)   ║  Due: Day 21  (7 days)      ║
║                  ║  Interest earned: +6G / day                      ║  Owed: 460G                 ║
║                  ║                                                  ║                             ║
║                  ║  Deposit:  [ Amount: ______ ]  [ Deposit ]       ║  [ Repay Loan — 460G ]      ║
║                  ║  Withdraw: [ Amount: ______ ]  [ Withdraw ]      ║  [ Repay Partial ]          ║
║                  ║  [ Deposit All ] [ Withdraw All ]                ║                             ║
║                  ║                                                  ║  ⚠ Overdue loans: Infamy    ║
║                  ║  LOANS                                           ║  penalty of +5 per day      ║
║                  ║  ────────────────────────────────────────────    ║                             ║
║                  ║  Active loan: 400G principal  Due: Day 21        ║  ──────────────────────     ║
║                  ║  Owed (with interest): 460G                      ║  TAKE NEW LOAN              ║
║                  ║  [ Repay Loan — 460G ]                           ║  Max credit: 500G           ║
║                  ║                                                  ║  Rate: 15% per 7 days       ║
║                  ║  TAKE OUT LOAN                                   ║  You can take: 500G         ║
║                  ║  Max available: 500G (based on rep + assets)     ║  (no existing loan owed)    ║
║                  ║  [ Amount: ______ ]  [ Apply For Loan ]          ║  [ Apply — 500G max ]       ║
║                  ║  Rate: 15% per 7 days                            ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Deposit All ] [Withdraw All] [Repay Loan  ] [Take Loan   ] [——         ] [——        ] [——  ]║
║  R3: [——          ] [——           ] [——           ] [——          ] [——         ] [——        ] [◄Close]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## J6. BOUNTY OFFICE VIEW

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  📜 CHARTER BOUNTY OFFICE — Thornspire          ║  BOUNTY DETAIL              ║
║                  ║  Officer: Rank-Warden Callos                     ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║  YOUR BOUNTIES (open warrants)                   ║  OUTSTANDING WARRANT        ║
║                  ║  ────────────────────────────────────────────    ║  Issued by: Crow Gang       ║
║                  ║  Civil bounty:   0G   (clean)                    ║  Charge: Gang interference  ║
║                  ║  Criminal bounty: 150G (Crow Gang: 1 warrant)    ║  Posted: Day 10             ║
║                  ║  Infamy: 12 / 100   (Tier 1 — Noted)             ║                             ║
║                  ║                                                  ║  Civil vs Criminal:         ║
║                  ║  CLEAR YOUR BOUNTY                               ║  CRIMINAL — not clearable   ║
║                  ║  Civil bounty:   [ Pay 0G — nothing owed ]       ║  at civil bounty office.    ║
║                  ║  Criminal warrant: cannot clear here             ║  Must deal with Crow Gang   ║
║                  ║    → requires Crow Gang faction interaction       ║  directly (quest chain).    ║
║                  ║                                                  ║                             ║
║                  ║  BOUNTIES ON OTHERS (available jobs)             ║  ──────────────────────     ║
║                  ║  ────────────────────────────────────────────    ║  AVAILABLE JOB              ║
║                  ║  Goblin Chief  ·  Region: Forest  ·  200G  [Go]  ║  Goblin Chief               ║
║                  ║  Bandit Leader · Region: Old Road · 350G  [Go]   ║  Region: Forest Entrance    ║
║                  ║  Rogue Mage    · Region: Capital  · 600G  [Go]   ║  Reward: 200G + Rep +20     ║
║                  ║                                                  ║  [ Accept Bounty Job ]      ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Clear Bounty] [Accept Job  ] [——          ] [——          ] [——         ] [——        ] [——  ]║
║  R3: [——          ] [——           ] [——          ] [——          ] [——         ] [——        ] [◄Close]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## J7. PAY TITHE MODAL

```
╔══════════════════════════════════════════════════════╗
║  🕍 PAY TITHE — Temple of Solenne           [ x ]    ║
╠══════════════════════════════════════════════════════╣
║  Priestess Vael · Faith: Radiant Faith               ║
║                                                      ║
║  Your divinity score: 24                             ║
║  Tithe amount: 50G  (standard faithful)              ║
║                                                      ║
║  Effect:                                             ║
║  · Divinity +5                                       ║
║  · Faith blessing active: +10% CPW recovery / day   ║
║  · Reputation +10 (Temple of Solenne)                ║
║                                                      ║
║  Gold: 340G → 290G                                   ║
║                                                      ║
║  [ Pay Tithe — 50G ]             [ Decline ]         ║
╚══════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART K — SKILLS & EQUIPMENT
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## K1. SKILL TREES VIEW — BATTLE TREE

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  PLAYER VITALS   ║  ✦ SKILLS & ABILITIES                           ║  SKILL DETAIL               ║
║  ...HUD left...  ║  Skill Points: 3   ·   XP to next level: 660    ║  ──────────────────────     ║
║                  ║  Tree: [► BATTLE ◄] [ ARDOR ] [ PATHS ] [PASS.] ║                             ║
║                  ║  ──────────────────────────────────────────────  ║  CLEAVE II                  ║
║                  ║                                                  ║  ──────────────────────     ║
║                  ║  BATTLE TREE — Warrior branch                   ║  Tier: Active               ║
║                  ║                                                  ║  Job req: Warrior ✓         ║
║                  ║          [Strike I ✓]                           ║  Prerequisite: Cleave I ✓   ║
║                  ║               │                                  ║                             ║
║                  ║          [Strike II ✓]                          ║  Effect: Deals STR×1.8 to   ║
║                  ║               │                                  ║  all adjacent targets.      ║
║                  ║    ┌──────────┴──────────┐                      ║  AP cost: 2                 ║
║                  ║  [Cleave I ✓]      [Defend II ✓]               ║  Cooldown: 2 rounds          ║
║                  ║       │                  │                      ║                             ║
║                  ║  [► Cleave II]    [Counter I]                   ║  Level: 0 → unlocked        ║
║                  ║    cost: 1 SP ←       cost: 1 SP                ║  Upgrade: 1 Skill Point     ║
║                  ║       │                  │                      ║                             ║
║                  ║  [Cleave III 🔒]  [Counter II 🔒]               ║  At Cleave III (next):      ║
║                  ║    (need II)        (need I)                    ║  Deals STR×2.4, stagger     ║
║                  ║                                                  ║  chance 25%                 ║
║                  ║  [Brutal I 🔒]  [Brutal II 🔒]                  ║                             ║
║                  ║    STR check   (need Brutal I)                  ║  [ Unlock — 1 SP ]          ║
║                  ║                                                  ║  SP after: 2 remaining      ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Unlock Skill] [——          ] [——          ] [——          ] [——         ] [——        ] [——  ]║
║  R3: [——          ] [——           ] [——           ] [——          ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## K2. SKILL TREES — ARDOR TREE

```
  ── Middle canvas when [ARDOR] tree selected ───────────────────────────────────────────────
  ║  ARDOR TREE — Intimacy & Social branch                                                  ║
  ║  (Unlocked: Passion I · Stamina I · Vocal Read I)                                       ║
  ║                                                                                        ║
  ║          [Passion I ✓] ──── [Passion II]  cost: 1 SP                                  ║
  ║               │                  │                                                     ║
  ║          [Stamina I ✓]  [Passion III 🔒 — need II]                                      ║
  ║               │                                                                        ║
  ║          [Stamina II]   cost: 1 SP                                                     ║
  ║               │                                                                        ║
  ║  [Vocal Read I ✓] ─── [Vocal Read II]  cost: 1 SP                                     ║
  ║               │                                                                        ║
  ║  [Restraint I 🔒 — need: Rope in inventory + WIL 12]                                   ║
```

---

## K3. SKILL TREES — PATHS TAB (Path Awakening)

```
  ── Middle canvas when [PATHS] tree selected ───────────────────────────────────────────────
  ║  PATH AWAKENING — Class Advancement                                                     ║
  ║  Current job: Warrior   Level 7                                                        ║
  ║                                                                                        ║
  ║  WARRIOR PATH                                                                          ║
  ║  Next awakening available at Level 10                                                   ║
  ║  Options unlocked at Lv. 10:                                                           ║
  ║  · Battle-King    (ATK focus — requires Charter Rank: Knight)                          ║
  ║  · Iron Vanguard  (DEF focus — requires END 15)                                        ║
  ║  · Berserker      (dmg/self-dmg tradeoff — requires Sovereign align.)                  ║
  ║                                                                                        ║
  ║  Current progress: 7 / 10                                                              ║
  ║  ⚠ Path Awakening is irreversible. Choose at Lv. 10 when available.                   ║
  ║                                                                                        ║
  ║  ANOMALOUS MP PATH (unique — hidden from other characters)                             ║
  ║  Unlocked by: questing with Solenne / certain story flags                              ║
  ║  Details: ??? (requires in-game discovery)                                             ║
```

---

## K4. PATH AWAKENING MODAL

```
╔══════════════════════════════════════════════════════════════╗
║  ✦ PATH AWAKENING — AVAILABLE                     [ x ]       ║
╠══════════════════════════════════════════════════════════════╣
║  You have reached Level 10. Choose your advanced path.        ║
║  ⚠ This choice is permanent and cannot be changed.            ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ○ BATTLE-KING                                               ║
║    ATK +20%  · STR scaling improved                          ║
║    Unlocks: Regal Slash · Warlord Aura                       ║
║    Requires: Charter Rank Knight  ✓                          ║
║                                                              ║
║  ○ IRON VANGUARD                                             ║
║    DEF +25%  · STA max +50                                   ║
║    Unlocks: Fortress Stance · Shield Bash                    ║
║    Requires: END 15  ✓                                       ║
║                                                              ║
║  ○ BERSERKER                                                 ║
║    Dmg +35% self / −15% DEF while in rage                   ║
║    Unlocks: Blood Fury · Rage Trigger                        ║
║    Requires: Sovereign alignment  🔒 (you: Pragmatist)       ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║  [ Choose Battle-King ]   [ Choose Iron Vanguard ]   [ Wait ] ║
╚══════════════════════════════════════════════════════════════╝
```

---

## K5. EQUIPMENT VIEW — SLOT MATRIX

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  PLAYER VITALS   ║  ⚔ EQUIPMENT                                    ║  ITEM COMPARISON            ║
║  ...HUD left...  ║  ──────────────────────────────────────────────  ║  ──────────────────────     ║
║                  ║                                                  ║                             ║
║                  ║  ── WEAPON ────────────────────────────────────  ║  Equipped:                  ║
║                  ║  MAIN HAND    [Steel Sword        ] [✕]  [Swap]  ║  Steel Sword                ║
║                  ║  OFF HAND     [Empty              ] [+]          ║  ATK: 15  DEF: 0            ║
║                  ║                                                  ║                             ║
║                  ║  ── ARMOUR ────────────────────────────────────  ║  In inventory:              ║
║                  ║  HEAD         [Empty              ] [+]          ║  Iron Axe (not held)        ║
║                  ║  CHEST        [Leather Vest       ] [✕]  [Swap]  ║  ATK: 18  DEF: 0            ║
║                  ║  HANDS        [Empty              ] [+]          ║  ▲ ATK +3 (upgrade)         ║
║                  ║  LEGS         [Travel Trousers    ] [✕]  [Swap]  ║                             ║
║                  ║  FEET         [Empty              ] [+]          ║  [ Equip Iron Axe ]         ║
║                  ║  BACK         [Worn Travel Cloak  ] [✕]  [Swap]  ║                             ║
║                  ║                                                  ║  ──────────────────────     ║
║                  ║  ── ACCESSORY ─────────────────────────────────  ║  STAT TOTALS                ║
║                  ║  RING 1       [Empty              ] [+]          ║  (equipped bonuses)         ║
║                  ║  RING 2       [Empty              ] [+]          ║  ATK: +15                   ║
║                  ║  AMULET       [Empty              ] [+]          ║  DEF: +12                   ║
║                  ║                                                  ║  SPD: +0                    ║
║                  ║  ── CLOTHING (non-combat) ─────────────────────  ║  LCK: +0                    ║
║                  ║  OUTFIT       [Worn Travel Cloak  ] [✕]          ║                             ║
║                  ║  [→ Full Wardrobe management: Wardrobe View]      ║  [ Full Wardrobe ]          ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Equip Select] [Remove Slot  ] [Compare     ] [Wardrobe   ] [——         ] [——        ] [——  ]║
║  R3: [——          ] [——           ] [——           ] [——         ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## K6. EQUIPMENT SWAP CONFIRMATION

```
╔══════════════════════════════════════════════════════╗
║  ⚔ EQUIP ITEM?                            [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Slot: MAIN HAND                                     ║
║                                                      ║
║  Remove:  Steel Sword   ATK +15  DEF +0              ║
║  Equip:   Iron Axe      ATK +18  DEF +0              ║
║                                                      ║
║  Change:  ATK  +15 → +18  (▲ +3)                    ║
║  Steel Sword goes to inventory.                      ║
║                                                      ║
║  [ Equip Iron Axe ]              [ Cancel ]          ║
╚══════════════════════════════════════════════════════╝
```

---

## K7. PLAYER WARDROBE VIEW (see also Companion Wardrobe in Part M)

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  👕 PLAYER WARDROBE                              ║  SLOT DETAIL                ║
║                  ║  Clothing state: FULLY_CLOTHED                   ║  ──────────────────────     ║
║                  ║  Outfit preset: [ Traveller ▼ ] [Load] [Save As] ║                             ║
║                  ║  ──────────────────────────────────────────────  ║  Slot: CHEST / TOP          ║
║                  ║                                                  ║  Equipped: Linen Shirt      ║
║                  ║  SLOT MATRIX — PLAYER                            ║                             ║
║                  ║  CHEST / TOP     [Linen Travel Shirt  ] [✕]      ║  Available in wardrobe:     ║
║                  ║  BOTTOM / OUTER  [Travel Trousers     ] [✕]      ║  · Linen Shirt     ✓ equip  ║
║                  ║  UNDERWEAR TOP   [Empty               ] [+]      ║  · Fine White Shirt  [Equip]║
║                  ║  UNDERWEAR BTM   [Empty               ] [+]      ║  · Chain Mail Vest   [Equip]║
║                  ║  FULL BODY OUTER [Empty               ] [+]      ║                             ║
║                  ║  BACK            [Worn Travel Cloak   ] [✕]      ║  Clothing store:            ║
║                  ║  HEAD            [Empty               ] [+]      ║  Items not equipped but     ║
║                  ║  NECK            [Empty               ] [+]      ║  owned: 2 shirts, 1 robe   ║
║                  ║  WRISTS          [Empty               ] [+]      ║                             ║
║                  ║  RING L          [Empty               ] [+]      ║  [ Equip Selected ]         ║
║                  ║  RING R          [Empty               ] [+]      ║  [ Remove Slot ]            ║
║                  ║  PENIS           [Empty               ] [+]      ║  [ Store Item ]             ║
║                  ║  (player-specific slot)                          ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Equip Select] [Remove Slot  ] [Strip All  ] [Save Preset ] [——        ] [——        ] [——   ]║
║  R3: [——          ] [——           ] [——          ] [——          ] [——        ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART L — CONTACTS, RELATIONSHIPS & PARTY
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## L1. CONTACTS VIEW — DIRECTORY

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  PLAYER VITALS   ║  👥 CONTACTS                                    ║  QUICK PROFILE              ║
║  ...HUD left...  ║  Known: 8  ·  Party: 2  ·  Suite residents: 1   ║  ──────────────────────     ║
║                  ║  Filter: (●) All (○) Party (○) Suite (○) Faction║                             ║
║                  ║  ──────────────────────────────────────────────  ║  MIRA ASHLEN                ║
║                  ║                                                  ║  Human · Merchant           ║
║                  ║  PARTY                                           ║                             ║
║                  ║  ► ARIA VALEN       Companion · Fighter          ║  Trust:  42 / 100           ║
║                  ║    Trust 65  Love 44  Stage: Companion           ║  Love:   38 / 100           ║
║                  ║    Party: YES  Suite: Suite 1                    ║  Stage:  COMPANION          ║
║                  ║    [ View Profile ] [ Manage ]                   ║                             ║
║                  ║                                                  ║  Mood: Warm                 ║
║                  ║  ► MIRA ASHLEN      Companion · Merchant         ║  Location: Market (now)     ║
║                  ║    Trust 42  Love 38  Stage: Companion           ║  Schedule: here until Eve   ║
║                  ║    Party: YES  Suite: —  (not moved in)          ║                             ║
║                  ║    [ View Profile ] [ Manage ]                   ║  Party: YES                 ║
║                  ║                                                  ║  Suite: NO                  ║
║                  ║  KNOWN NPCs                                      ║                             ║
║                  ║  ────────────────────────────────────────────    ║  ──────────────────────     ║
║                  ║  Vespera Nol        Stranger · Rogue             ║  QUICK ACTIONS              ║
║                  ║    Trust 10  Love 2  Stage: Stranger             ║  [ 💬 Talk (tile req.)  ]   ║
║                  ║    [ View Profile ]                              ║  [ 🎁 Gift             ]    ║
║                  ║                                                  ║  [ 👗 Wardrobe         ]    ║
║                  ║  Orvis (Banker)     Acquaintance · Banker        ║  [ 🏠 Move to Suite    ]    ║
║                  ║    Trust 30  Love 0  Stage: Acquaintance         ║    ← requires T60 L60      ║
║                  ║    [ View Profile ]                              ║  [ 📋 Sub-Quest        ]    ║
║                  ║                                                  ║    ← locked (trust<60)     ║
║                  ║  Callos (Warden)    Acquaintance · Charter       ║                             ║
║                  ║    [ View Profile ]                              ║  [ 👁 View Full Profile ]   ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [View Profile] [Add to Party  ] [Move to Suite] [Gift       ] [Sub-Quest  ] [——        ] [——]║
║  R3: [——          ] [——             ] [——            ] [——         ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## L2. CONTACT PROFILE — SOCIAL / BIO TAB

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  [NPC Portrait   ║  MIRA ASHLEN — PROFILE                          ║  RELATIONSHIP TOOLS         ║
║   large, left]   ║  Tabs: [► SOCIAL ◄] [ PHYSICAL ] [ PSYCHOLOGY ] ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║  IDENTITY                                        ║  Trust: 42 / 100            ║
║                  ║  Name:    Mira Ashlen                            ║  ████████░░░░░░░            ║
║                  ║  Race:    Human · Female                         ║                             ║
║                  ║  Age:     24                                     ║  Love:  38 / 100            ║
║                  ║  Origin:  Thornspire (native)                    ║  ███████░░░░░░░             ║
║                  ║  Job:     Merchant · Herbalist secondary         ║                             ║
║                  ║  Faith:   Radiant Faith (casual observant)       ║  Stage: COMPANION           ║
║                  ║  Alignment: Neutral Good                         ║  Next: CLOSE (T60 L60)      ║
║                  ║                                                  ║                             ║
║                  ║  STATUS                                          ║  Scene history:             ║
║                  ║  Stage: COMPANION                                ║  Intimate: 1 scene          ║
║                  ║  Relationship path: NORMAL (not dark path)       ║  Satisf. avg: 68%           ║
║                  ║  Bond: none yet                                  ║                             ║
║                  ║  Suite: not assigned                             ║  Orgasms given: 2           ║
║                  ║  Pregnancy: not pregnant                         ║  Life force events: 0       ║
║                  ║                                                  ║                             ║
║                  ║  GIFT HISTORY                                    ║  ──────────────────────     ║
║                  ║  · Gold Hoop Earrings  (Day 10)  Trust +14       ║  UNLOCK HISTORY             ║
║                  ║  · Silk Ribbon         (Day 7)   Trust +6        ║  Dialogue opt 3: ✓ (T42)   ║
║                  ║                                                  ║  Scene initiation: ✓ (T40) ║
║                  ║  SCHEDULE                                        ║  Wardrobe: 🔒 (need suite) ║
║                  ║  MORNING–EVE:  Market stall  (Thornspire Mkt)    ║  Sub-quest: 🔒 (need T60)  ║
║                  ║  NIGHT:        Home (adjacent to market)         ║  Move-in: 🔒 (need T60 L60)║
║                  ║  MIDNIGHT:     Home (sleeping)                   ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Talk       ] [Gift         ] [Add to Party] [Move to Suite] [Sub-Quest ✗] [Wardrobe ✗][——  ]║
║  R3: [Social tab ] [Physical tab ] [Psych. tab  ] [Rel. Matrix  ] [——          ] [——       ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## L3. CONTACT PROFILE — PHYSICAL TAB

```
  ── Middle canvas when [PHYSICAL] tab selected ──────────────────────────────────────────
  ║  PHYSICAL PROFILE  — Mira Ashlen                                                     ║
  ║  ────────────────────────────────────────────────────────────────────────────────    ║
  ║  (Unlocked incrementally through intimacy experience)                               ║
  ║                                                                                     ║
  ║  Height:   163 cm    Build:   Slender                                               ║
  ║  Hair:     Brown, mid-length    Eyes:  Green                                        ║
  ║                                                                                     ║
  ║  Sensitivity map (discovered zones highlighted):                                   ║
  ║  NECK:     ★★★☆☆  (high — discovered)                                              ║
  ║  EARS:     ★★★★☆  (very high — discovered)                                         ║
  ║  CHEST:    ★★☆☆☆  (medium — discovered)                                            ║
  ║  WAIST:    ★☆☆☆☆  (low — discovered)                                               ║
  ║  CLIT:     ???    (not yet discovered)                                              ║
  ║  INNER THIGH: ??? (not yet discovered)                                              ║
  ║                                                                                     ║
  ║  ClothingState at first scene: TOPLESS                                              ║
  ║  ClothingCondition history: INTACT (no non-con strip events)                       ║
  ║                                                                                     ║
  ║  Fertility window: Day 14–16 of cycle  ← (requires discovery flag)                 ║
  ║  Pregnancy status: Not pregnant                                                    ║
```

---

## L4. CONTACT PROFILE — PSYCHOLOGY TAB

```
  ── Middle canvas when [PSYCHOLOGY] tab selected ────────────────────────────────────────
  ║  PSYCHOLOGY  — Mira Ashlen                                                           ║
  ║  (Unlocked incrementally through dialogue + intimacy)                               ║
  ║  ────────────────────────────────────────────────────────────────────────────────    ║
  ║  Dominant traits:   Warm · Cautious · Independent · Commercially-minded             ║
  ║                                                                                     ║
  ║  Shame baseline:   LOW  (comfortable with self)                                     ║
  ║  Resistance index: MEDIUM  (not easily pressured)                                   ║
  ║  Submissive floor: MEDIUM  (discovered at Companion stage)                          ║
  ║  Degradation tolerance: LOW  (disgust response high)                                ║
  ║                                                                                     ║
  ║  Kinks (discovered — hidden until revealed by scene events):                        ║
  ║  · Ear play: responds strongly  ★★★★☆  (discovered Day 14)                        ║
  ║  · Light restraint: curious  ★★☆☆☆  (not yet experienced)                          ║
  ║  · Praise:  positive  ★★★☆☆                                                        ║
  ║  · Humiliation:  strong negative  ✕                                                 ║
  ║                                                                                     ║
  ║  Fears:      Known — fear of debt/poverty  (mentioned in dialogue)                  ║
  ║  Motivation: Financial security · autonomy · family approval                        ║
```

---

## L5. RELATIONSHIP 16-CELL MATRIX VIEW
# Full-width view showing all known NPCs and their rel. bands.

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  💞 RELATIONSHIP MATRIX                         ║  CELL DETAIL                ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║                                                  ║  MIRA — COMPANION           ║
║                  ║  NAME          STAGE     TRUST  LOVE   SCENES   ║  Trust: 42 / 100            ║
║                  ║  ────────────────────────────────────────────    ║  Love: 38 / 100             ║
║                  ║  Aria Valen    Companion  65/100  44/100  3      ║                             ║
║                  ║  Mira Ashlen   Companion  42/100  38/100  1      ║  Stage progression:         ║
║                  ║  Vespera Nol   Stranger   10/100   2/100  0      ║  STRANGER → ACQUAINTANCE    ║
║                  ║  Orvis         Acquaint.  30/100   0/100  0      ║  → COMPANION → CLOSE        ║
║                  ║  Callos (Ward) Acquaint.  22/100   0/100  0      ║  → DEVOTED → BONDED         ║
║                  ║  Vela (Innkp)  Acquaint.  18/100   0/100  0      ║                             ║
║                  ║  Lyra          Stranger    5/100   0/100  0      ║  Current: COMPANION         ║
║                  ║  [+5 more not yet met / introduced]              ║  Next threshold: T60 L60    ║
║                  ║                                                  ║                             ║
║                  ║  BOND STATUS                                     ║  [ View Full Profile ]      ║
║                  ║  ────────────────────────────────────────────    ║                             ║
║                  ║  Bonds formed:  0 / max 2                        ║                             ║
║                  ║  Bond item slots: empty                          ║                             ║
║                  ║  Bond rite: requires Devoted stage + item        ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [View Profile] [——          ] [——          ] [——          ] [——         ] [——        ] [——  ]║
║  R3: [——          ] [——           ] [——           ] [——         ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## L6. PARTY MANAGEMENT PANEL

```
╔══════════════════════════════════════════════════════╗
║  👥 PARTY MANAGEMENT                      [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Slots: 2 / 3 filled                                 ║
║  ──────────────────────────────────────────────────  ║
║                                                      ║
║  ► YOU  (always present)                             ║
║    HP 142/200  STA 95/150  Level 7 · Warrior         ║
║                                                      ║
║  ► ARIA  [Fighter — Active]                          ║
║    HP 100/100  STA 90/150  Level 6                   ║
║    [ Remove from Party ]   [ View Profile ]          ║
║                                                      ║
║  ► MIRA  [Support — Active]                          ║
║    HP 80/100   STA 60/120  Level 5                   ║
║    [ Remove from Party ]   [ View Profile ]          ║
║                                                      ║
║  ── AVAILABLE TO JOIN (not in party) ─────────────── ║
║  Vespera  — Trust 10  (too low; req. T30)  🔒        ║
║  (others not yet met or not eligible)                ║
║                                                      ║
║  Party order:  [ Aria ▲▼ ]  [ Mira ▲▼ ]             ║
║  (order affects combat turn priority)                ║
║                                                      ║
║  [ Close ]                                           ║
╚══════════════════════════════════════════════════════╝
```

---

## L7. MOVE TO SUITE CONFIRMATION

```
╔══════════════════════════════════════════════════════╗
║  🏠 MOVE TO MANOR SUITE?                  [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Invite: Mira Ashlen                                 ║
║  Stage: COMPANION  Trust: 65  Love: 60   ✓          ║
║  (requires Trust 60 + Love 60)                       ║
║                                                      ║
║  Available suites: 2 (of 4)                          ║
║  Assign to: Suite 2  [ Select ▼ ]                    ║
║                                                      ║
║  Effects:                                            ║
║  · Mira lives at manor; available for evening/night  ║
║    scenes without location check                     ║
║  · Wardrobe access unlocked for Mira                 ║
║  · Passive gold generation: +10G / day               ║
║  · Companion sub-quest may unlock                    ║
║                                                      ║
║  ⚠ Mira will no longer work at market stall.        ║
║    Shop discount (Mira) becomes unavailable.         ║
║                                                      ║
║  [ Invite to Suite 2 ]           [ Cancel ]          ║
╚══════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART M — MANOR, WARDROBE & HOLDINGS
# (Companion Wardrobe — see Addendum G1 for full spec)
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## M1. SUITE MANAGEMENT VIEW

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  🏠 MANOR — SUITE MANAGEMENT                    ║  SUITE DETAIL               ║
║                  ║  Tabs: [► SUITES ◄] [ CRAFTING ] [ FINANCES ]   ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║  Your manor: Thornspire Manor (owned · SAFE)     ║  SUITE 1 — Aria             ║
║                  ║  Total suites: 4   ·   Occupied: 1   ·  Free: 3  ║  Resident: Aria Valen       ║
║                  ║                                                  ║  Trust: 65  Love: 44         ║
║                  ║  SUITE 1  ──────────────────────────────────     ║  Stage: Companion           ║
║                  ║  Resident: ARIA VALEN  (Companion · Fighter)     ║                             ║
║                  ║  Passive gen: +15G / day  ·  Pending: 36G        ║  Passive: +15G / day        ║
║                  ║  Wardrobe: unlocked  · 22-slot configured        ║  Pending: 36G               ║
║                  ║  [ Collect 36G ] [👗 Wardrobe] [💬 Talk] [✕ Evict]║                             ║
║                  ║                                                  ║  Scene: eligible here       ║
║                  ║  SUITE 2  ──────────────────────────────────     ║  (private · night)          ║
║                  ║  EMPTY                                           ║                             ║
║                  ║  [ Invite Resident (from Contacts) ]             ║  [ Collect 36G ]            ║
║                  ║                                                  ║  [ 👗 Wardrobe  ]           ║
║                  ║  SUITE 3  ──────────────────────────────────     ║  [ 💬 Talk      ]           ║
║                  ║  EMPTY                                           ║  [ ♥ Scene      ]           ║
║                  ║  [ Invite Resident ]                             ║  [ ✕ Evict      ]           ║
║                  ║                                                  ║                             ║
║                  ║  SUITE 4  ──────────────────────────────────     ║  EVICT COST: none           ║
║                  ║  EMPTY                                           ║  (trust/love unchanged)     ║
║                  ║  [ Invite Resident ]                             ║  relationship: not broken   ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Collect All ] [Invite Resid.] [Wardrobe   ] [——          ] [——         ] [——        ] [——  ]║
║  R3: [Suites tab  ] [Crafting tab ] [Finance tab] [——          ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## M2. CRAFTING BENCH VIEW

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  ⚗ CRAFTING BENCH                               ║  RECIPE DETAIL              ║
║                  ║  Tabs: [► SUITES] [ ► CRAFTING ◄ ] [FINANCES]   ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║                                                  ║  Health Potion              ║
║                  ║  QUEUE (active)                                  ║  ──────────────────────     ║
║                  ║  · Health Potion ×2  — Ready in: 0 days [✓Coll] ║  Result: Health Potion ×1   ║
║                  ║  · Lubricant     ×1  — 2 days remaining          ║  Heals +50 HP               ║
║                  ║  · Aphrodisiac Gel   — 3 days remaining          ║                             ║
║                  ║                                                  ║  Materials needed:          ║
║                  ║  RECIPES (known)                                 ║  · Herb Bundle ×2  ✓ (×3)  ║
║                  ║  ────────────────────────────────────────────    ║  · Empty Flask  ×1  🔒 (×0)║
║                  ║  Health Potion     Herbs×2 + Flask×1   1 day  [Queue]      ║                  ║
║                  ║  Lubricant         Herb×1 + Oil×1      2 days [Queue]      ║  Missing:        ║
║                  ║  Aphrodisiac Gel   Herb×2 + Spice×1    3 days [Queue]      ║  Empty Flask ×1  ║
║                  ║  Stamina Draught   Herb×3 + Tonic×1    2 days [🔒 mat]     ║  Buy at shop.    ║
║                  ║  Rope              Fibre×4              1 day  [Queue]      ║                  ║
║                  ║  Condom            Thin-skin×2          1 day  [Queue]      ║  Queue cost:     ║
║                  ║                                                  ║  0G (you own bench)         ║
║                  ║  Max queue: 5 items  ·  Queue: 3 / 5             ║                             ║
║                  ║  Skill: Crafting I (unlock more recipes via Lv)  ║  Time: 1 day               ║
║                  ║                                                  ║  [ Queue: H.Potion ×1 ]     ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Collect Ready] [Queue Recipe] [——          ] [——          ] [——         ] [——        ] [——  ]║
║  R3: [Suites tab   ] [Crafting tab] [Finance tab ] [——          ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## M3. MANOR FINANCES VIEW

```
  ── Middle canvas when [FINANCES] tab selected ────────────────────────────────────────
  ║  MANOR FINANCES  ·  Thornspire Manor                                               ║
  ║  ────────────────────────────────────────────────────────────────────────────────  ║
  ║  PASSIVE INCOME (per day)                                                          ║
  ║  Suite 1 — Aria (Companion bonus):   +15G / day                                   ║
  ║  Suite 2–4 — empty:                  +0G / day                                    ║
  ║  Total passive: +15G / day                                                        ║
  ║  Uncollected:  36G  (3 days)         [ Collect All ]                               ║
  ║                                                                                   ║
  ║  EXPENSES (per day)                                                                ║
  ║  Manor upkeep:   −5G / day                                                        ║
  ║  Net income:     +10G / day                                                       ║
  ║                                                                                   ║
  ║  OUTSTANDING                                                                       ║
  ║  Bank loan: 460G owed · Due Day 21   [ Go to Bank ]                               ║
  ║  Tithe status: 0G owed (faith current)                                            ║
  ║                                                                                   ║
  ║  HOLDINGS REGISTER                                                                 ║
  ║  · Thornspire Manor (owned, unencumbered)                                         ║
  ║  · Crafting Bench (installed)                                                     ║
  ║  · Bank vault: 1,200G                                                             ║
```

---

## M4. OFFSPRING RECORDS VIEW

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  👶 OFFSPRING RECORDS                           ║  CHILD DETAIL               ║
║                  ║  Known pregnancies: 0  ·  Known children: 0     ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║                                                  ║  No children on record.     ║
║                  ║  ACTIVE PREGNANCIES                              ║                             ║
║                  ║  None currently active.                          ║  Pregnancy events appear    ║
║                  ║                                                  ║  here when triggered by     ║
║                  ║  CHILDREN                                        ║  intimacy scenes.           ║
║                  ║  None on record.                                 ║                             ║
║                  ║                                                  ║  Pregnancy system:          ║
║                  ║  Pregnancy system: ENABLED  (settings)           ║  ✓ Enabled                  ║
║                  ║  Known at-risk events:                           ║  Creampie events tracked.   ║
║                  ║  · Mira Ashlen — Day 14 scene  (28% risk)        ║                             ║
║                  ║    Status: at-risk · resolved at Day 20          ║  Risk period: Day 14–20     ║
║                  ║    Contraceptive used: NO                        ║  for Mira (Day 14 event)   ║
║                  ║    [ Check Status — Day 20+ ]                    ║                             ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [——          ] [——           ] [——          ] [——          ] [——         ] [——        ] [——  ]║
║  R3: [——          ] [——           ] [——           ] [——         ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART N — TAMING & FACTIONS
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## N1. MONSTER TAMING — CELL VIEW

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  🐾 TAMING CELL — Thornspire Manor              ║  CAPTIVE DETAIL             ║
║                  ║  Cells: 2 total  ·  Occupied: 1  ·  Empty: 1    ║  ──────────────────────     ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║                                                  ║  GOBLIN SCOUT               ║
║                  ║  CELL 1  ───────────────────────────────────     ║  Type: Humanoid / Monster   ║
║                  ║  Captive: Goblin Scout  (captured Day 10)        ║  HP: 30 / 30                ║
║                  ║  HP:  30/30  Tame: 42%  Bond: 18%               ║  Tame: 42 / 100             ║
║                  ║  Mood: Subdued  · Days in cell: 4                ║  Bond: 18 / 100             ║
║                  ║                                                  ║                             ║
║                  ║  Tame actions (1 AP each):                       ║  Tame threshold: 60%        ║
║                  ║  [ 🍖 Feed   +8 tame ] [ 🤝 Condition +5 tame ] ║  Bond threshold: 40%        ║
║                  ║  [ 👆 Touch  +4 bond ] [ 🗣 Speak    +6 bond  ] ║                             ║
║                  ║  [ ⚠ Dominate  — alignment cost: −3  +12 tame ] ║  Actions today: 2 / 3 used  ║
║                  ║                                                  ║                             ║
║                  ║  Deploy options (at tame ≥ 60%):                ║  At Tame 60% + Bond 40%:   ║
║                  ║  🔒 Scout role: needs Tame 60 (42%)             ║  · Scout deploy unlocked    ║
║                  ║  🔒 Combat pet: needs Bond 60 (18%)             ║  · Combat pet: needs Bond   ║
║                  ║                                                  ║                             ║
║                  ║  CELL 2  ───────────────────────────────────     ║  [ Feed — +8 tame ]         ║
║                  ║  EMPTY                                           ║  [ Condition — +5 ]         ║
║                  ║  [ Place captive from post-combat ]              ║  [ Dominate ⚠ −3 align ]   ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Feed        ] [Condition   ] [Touch       ] [Speak       ] [Dominate ⚠] [Release   ] [——  ]║
║  R3: [——          ] [——           ] [——          ] [——          ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## N2. FACTION STANDING PANEL

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  ⚑ FACTIONS & REPUTATION                       ║  FACTION DETAIL             ║
║                  ║  ──────────────────────────────────────────────  ║                             ║
║                  ║  CIVIL / REGIONAL                                ║  WAYFARERS' CHARTER         ║
║                  ║  Thornspire Market:   182  (Liked)   ████████░░  ║  ──────────────────────     ║
║                  ║  Thornspire Capital:  120  (Neutral) █████░░░░░  ║  Standing: 220 / 1000       ║
║                  ║  Stone Ridge:          80  (Cold)    ███░░░░░░░  ║  Tier: RANK II — Knight     ║
║                  ║  Khardun Empire:        0  (Unknown) ░░░░░░░░░░  ║                             ║
║                  ║                                                  ║  Perks active:              ║
║                  ║  FACTIONS                                        ║  · 10% quest reward bonus   ║
║                  ║  Wayfarers' Charter:  220  (Rank II) ██░░░░░░░░  ║  · Access: Charter jobs     ║
║                  ║  Temple of Solenne:    85  (Devout)  ████░░░░░░  ║  · Access: Rank II regions  ║
║                  ║  Temple of Varan:       0  (Neutral) ░░░░░░░░░░  ║                             ║
║                  ║  Crow Gang:           −45 (Hostile)  ░░░░░░░░░░  ║  Rank III threshold:        ║
║                  ║  Iron Vanguard:         0  (Unknown) ░░░░░░░░░░  ║  350 standing              ║
║                  ║  Obsidian Court:        0  (Unknown) ░░░░░░░░░░  ║  Current: 220              ║
║                  ║                                                  ║  To next rank: +130         ║
║                  ║  DARK REP (hidden criminal track)                ║                             ║
║                  ║  Crow Gang notoriety: 45  (Targeted)             ║  Active warrants: 1         ║
║                  ║  Infamy:              12  (Tier 1 — Noted)       ║  (criminal — Crow Gang)     ║
║                  ║  Civil bounty:         0G (clean)                ║                             ║
║                  ║  Criminal bounty:    150G (Crow Gang warrant)    ║  [ View Full Charter ]      ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [——          ] [——           ] [——           ] [——          ] [——         ] [——        ] [——  ]║
║  R3: [——          ] [——           ] [——            ] [——         ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART O — OVERLAYS, TOASTS & NOTIFICATIONS
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## O1. LEVEL-UP OVERLAY — PLAYER

```
╔══════════════════════════════════════════════════════════════════╗
║  ✦ LEVEL UP!                                          [ x ]      ║
╠══════════════════════════════════════════════════════════════════╣
║  Lv. 7  →  Lv. 8                                                 ║
║  XP: 2,500 / 2,500  ✓                                           ║
╠══════════════════════════════════════════════════════════════════╣
║  STAT GAINS (automatic)                                          ║
║  HP max:    +10   (200 → 210)                                    ║
║  STA max:   +8    (150 → 158)                                    ║
║  CPW max:   +5    (80 → 85)                                      ║
║  MP max:    +10   (100 → 110)                                    ║
╠══════════════════════════════════════════════════════════════════╣
║  SKILL POINTS EARNED                                             ║
║  +1 Skill Point   (total: 4 available)                           ║
╠══════════════════════════════════════════════════════════════════╣
║  PATH CHECK                                                      ║
║  Path awakening at Lv. 10  (2 more levels)                       ║
╠══════════════════════════════════════════════════════════════════╣
║  [ Go to Skill Tree ]                   [ Continue ]             ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## O2. LEVEL-UP OVERLAY — COMPANION

```
╔══════════════════════════════════════════════════════════════════╗
║  ✦ COMPANION LEVEL UP — ARIA VALEN               [ x ]           ║
╠══════════════════════════════════════════════════════════════════╣
║  Aria: Lv. 6  →  Lv. 7                                           ║
╠══════════════════════════════════════════════════════════════════╣
║  Stat gains:                                                     ║
║  HP max: +10  STA max: +8  ATK: +2                               ║
╠══════════════════════════════════════════════════════════════════╣
║  Companion skill unlocked:                                       ║
║  Shadow Strike III  (available in combat)                        ║
╠══════════════════════════════════════════════════════════════════╣
║  Relationship note:                                              ║
║  "Aria feels more capable beside you."                           ║
║  Trust: +2 (passive bond growth)                                 ║
╠══════════════════════════════════════════════════════════════════╣
║  [ Continue ]                                                    ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## O3. ACHIEVEMENT UNLOCKED TOAST

```
  ┌────────────────────────────────────────────────────┐
  │  🏆 ACHIEVEMENT UNLOCKED                           │
  │  First Companion                                   │
  │  "Mira joined your journey."                       │
  │  +50 XP  ·  Reward: Silk Ribbon                    │
  │                               [ View All ]         │
  └────────────────────────────────────────────────────┘
  (auto-dismisses after 4s; corner toast, non-blocking)
```

---

## O4. CHARTER RANK-UP TOAST

```
  ┌────────────────────────────────────────────────────┐
  │  ⚑ CHARTER RANK INCREASED                          │
  │  Rank I — Wanderer  →  Rank II — Knight            │
  │  New: access to Rank II regional jobs               │
  │                           [ View Charter ]         │
  └────────────────────────────────────────────────────┘
```

---

## O5. ALIGNMENT SHIFT TOAST

```
  ┌────────────────────────────────────────────────────┐
  │  ◈ ALIGNMENT SHIFT                                 │
  │  PRAGMATIST (+12) → PRAGMATIST (+8)                │
  │  Action: Humiliated captive  (−4)                  │
  └────────────────────────────────────────────────────┘
```

---

## O6. ALIGNMENT THRESHOLD CROSSED OVERLAY
# Full overlay when player crosses into a new alignment tier.

```
╔══════════════════════════════════════════════════════╗
║  ◈ ALIGNMENT: SOVEREIGNTY THRESHOLD REACHED [ x ]   ║
╠══════════════════════════════════════════════════════╣
║  You have crossed into SOVEREIGN territory.          ║
║  Score: −25 (Sovereign begins at −20)                ║
║                                                      ║
║  Effects:                                            ║
║  · Some Pure-path NPCs may refuse to interact        ║
║  · Sovereign-locked skills now accessible            ║
║  · Certain quest branches now available              ║
║  · Certain quest branches now locked                 ║
║                                                      ║
║  Ending Axis shifted:  −1 Redemption / +1 Conquest   ║
║                                                      ║
║  [ Acknowledge ]                                     ║
╚══════════════════════════════════════════════════════╝
```

---

## O7. STATUS EFFECT APPLIED TOAST

```
  ┌────────────────────────────────────────────────────┐
  │  🔥 STATUS APPLIED: BURNING ×1                     │
  │  Source: Goblin Torch attack                       │
  │  Effect: −5 HP / round  ·  Duration: 3 rounds      │
  └────────────────────────────────────────────────────┘
```

---

## O8. STATUS EFFECT EXPIRED TOAST

```
  ┌────────────────────────────────────────────────────┐
  │  ✓ STATUS EXPIRED: WEAKENED                        │
  │  Duration ended. Stats restored.                   │
  └────────────────────────────────────────────────────┘
```

---

## O9. PREGNANCY STAGE ADVANCE OVERLAY

```
╔══════════════════════════════════════════════════════╗
║  👶 PREGNANCY — STAGE ADVANCE                [ x ]   ║
╠══════════════════════════════════════════════════════╣
║  Mira Ashlen — Day 42                                ║
║                                                      ║
║  Pregnancy confirmed:  Stage 1 → Stage 2             ║
║  (Early → Mid-term)                                  ║
║                                                      ║
║  Stage 2 effects:                                    ║
║  · Mira's combat participation: limited              ║
║  · Passive income: unchanged                         ║
║  · New dialogue options available                    ║
║                                                      ║
║  Estimated birth: around Day 60                      ║
║                                                      ║
║  [ Acknowledge ]                                     ║
╚══════════════════════════════════════════════════════╝
```

---

## O10. BIRTH NOTIFICATION OVERLAY

```
╔══════════════════════════════════════════════════════╗
║  👶 BIRTH EVENT — MIRA ASHLEN                [ x ]   ║
╠══════════════════════════════════════════════════════╣
║  Day 60.  Mira has given birth.                      ║
║                                                      ║
║  Child:  Female  ·  Human                            ║
║  Name: [ pending — name in next dialogue ]           ║
║  Heritage: mixed (your traits + Mira traits)         ║
║                                                      ║
║  Recorded in: Offspring Records                      ║
║  Mira: Trust +10  Love +15 (bond deepened)           ║
║                                                      ║
║  [ Go to Offspring Records ]   [ Continue ]          ║
╚══════════════════════════════════════════════════════╝
```

---

## O11. SEASON CHANGE NOTIFICATION

```
  ┌──────────────────────────────────────────────────────┐
  │  🌸 SEASON CHANGE: SPRING → SUMMER                   │
  │  Day 46 — Year 1                                     │
  │  Seasonal effects:  Heat debuff active outdoors.     │
  │  Harvest bonus: +20% crop yield (manor passive +5G)  │
  └──────────────────────────────────────────────────────┘
```

---

## O12. GOD STATUS CHANGE NOTIFICATION

```
╔══════════════════════════════════════════════════════╗
║  ✦ DIVINITY EVENT — SOLENNE                  [ x ]   ║
╠══════════════════════════════════════════════════════╣
║  "My eye is upon you, traveller."                    ║
║                                                      ║
║  Divinity score: 24 → 30  (+6)                       ║
║  Trigger: Completed faith rite at Temple             ║
║                                                      ║
║  God status (Solenne): WATCHING → FAVOURED           ║
║  Favour effect: Blessing duration +50%               ║
║                                                      ║
║  Ending Axis: +1 Divine  (Faith path strengthens)    ║
║                                                      ║
║  [ Acknowledge ]                                     ║
╚══════════════════════════════════════════════════════╝
```

---

## O13. RELATIONSHIP BAND CHANGE TOAST

```
  ┌────────────────────────────────────────────────────┐
  │  💞 RELATIONSHIP MILESTONE — MIRA                   │
  │  ACQUAINTANCE  →  COMPANION                         │
  │  Trust: 42  Love: 38  (threshold met)               │
  │  New actions unlocked  ·  [ View Profile ]          │
  └────────────────────────────────────────────────────┘
```

---

## O14. INFAMY TIER CHANGE OVERLAY

```
╔══════════════════════════════════════════════════════╗
║  ⚠ INFAMY THRESHOLD CROSSED                  [ x ]   ║
╠══════════════════════════════════════════════════════╣
║  Infamy:  12  →  25  (Tier 1 → Tier 2)               ║
║  Trigger: Second witnessed assault                   ║
║                                                      ║
║  Tier 2 effects:                                     ║
║  · Guards will question you on sight                 ║
║  · Entry to Thornspire Capital: restricted           ║
║  · Civil merchants: price penalty +10%               ║
║  · Bounty office will not clear Tier 2 civil         ║
║                                                      ║
║  To reduce infamy:  Deeds of note · Time (−1/day)   ║
║                                                      ║
║  [ Acknowledge ]                                     ║
╚══════════════════════════════════════════════════════╝
```

---

## O15. COMPANION SUB-QUEST UNLOCK TOAST

```
  ┌────────────────────────────────────────────────────┐
  │  📋 COMPANION QUEST UNLOCKED — ARIA                 │
  │  "Aria's past: the Vanguard debt"                  │
  │  Trust threshold met (60+). Speak with Aria.       │
  │                            [ Go to Contacts ]      │
  └────────────────────────────────────────────────────┘
```

---

## O16. NG+ CONFIRMATION SCREEN

```
╔══[NO HUD]═══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                                 ║
║                              ✦ NEW GAME PLUS — CONFIRMATION                                    ║
║                                                                                                 ║
║                     You have completed Ojisan in Another World.                                 ║
║                     Starting NG+ will restart the game with selected carry-overs.              ║
║                                                                                                 ║
║  ┌──────────────────────────────────────────────────────────────────────────────────────────┐  ║
║  │  CARRY-OVERS — select which to bring forward                                            │  ║
║  │                                                                                        │  ║
║  │  [✓] Player level, XP, and skill points                                                │  ║
║  │  [✓] Stat allocations                                                                  │  ║
║  │  [✓] Equipment and inventory                                                           │  ║
║  │  [ ] Gold (start fresh — 100G)                                                         │  ║
║  │  [✓] Relationship records (trust/love carried, scene history reset)                    │  ║
║  │  [✓] Faction standing                                                                  │  ║
║  │  [ ] Alignment (reset to 0)                                                            │  ║
║  │  [✓] Endings seen (ending log — permanent record)                                      │  ║
║  │  [ ] Unlocked content flags (reset — requires re-enabling in settings)                 │  ║
║  └──────────────────────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                                 ║
║  ⚠ NG+ cannot be undone. The current save state is preserved as a completed-game save.         ║
║                                                                                                 ║
╠═════════════════════════════════════════════════════════════════════════════════════════════════╣
║  R1: [Begin NG+   ] [——          ] [——          ] [——          ] [——         ] [——        ] [◄Cancel]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## O17. ENDING AXIS / GAME STATE TRACKER (accessible from pause menu)

```
╔══════════════════════════════════════════════════════════════════════╗
║  ✦ ENDING AXIS — Current Trajectory                       [ x ]     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ALIGNMENT AXIS                                                      ║
║  Pure ◄─────────────────●──────────────────► Sovereign              ║
║                      +8 Pragmatist                                   ║
║                                                                      ║
║  FAITH AXIS                                                          ║
║  Apostate ◄────────────────────●───────────► Devoted                ║
║                             +6 Faith                                 ║
║                                                                      ║
║  RELATIONSHIP AXIS                                                   ║
║  Isolated ◄──────────────────●─────────────► Bonded                 ║
║                           Companion stage                            ║
║                                                                      ║
║  POWER AXIS                                                          ║
║  Wanderer ◄──────────────────●─────────────► Sovereign              ║
║                         Charter Rank II                              ║
║                                                                      ║
║  KNOWN ENDINGS AVAILABLE (based on current trajectory):              ║
║  · The Returned (faith + redemption path — possible)                 ║
║  · The Wandering Lord (Sovereign + power path — not yet set)         ║
║  · ? (others locked — continue playing)                              ║
║                                                                      ║
║  [ Close ]                                                           ║
╚══════════════════════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# PART P — ACHIEVEMENTS & PROFILE
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## P1. ACHIEVEMENTS VIEW

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║  ...HUD left...  ║  🏆 ACHIEVEMENTS                                ║  ACHIEVEMENT DETAIL         ║
║                  ║  Earned: 8 / 72   ·   Hidden: 12 / 72           ║  ──────────────────────     ║
║                  ║  Filter: (●) All (○) Earned (○) Combat (○) Story║                             ║
║                  ║  ──────────────────────────────────────────────  ║  FIRST COMPANION            ║
║                  ║                                                  ║  ──────────────────────     ║
║                  ║  ── STORY ─────────────────────────────────────  ║  "A stranger became        ║
║                  ║  🏆 Arrival              [✓ Earned Day 1]        ║   something more."          ║
║                  ║     "You arrived. That's a start."              ║                             ║
║                  ║  🏆 First Companion      [✓ Earned Day 8]        ║  Earned: Day 8              ║
║                  ║     "Mira joined your journey."                 ║  Reward: +50 XP             ║
║                  ║  🏆 Charter Rank II      [✓ Earned Day 12]       ║   · Silk Ribbon ×1          ║
║                  ║     "Knight of the Charter."                    ║                             ║
║                  ║  🏆 ??? (hidden)         [🔒 Locked]             ║                             ║
║                  ║                                                  ║                             ║
║                  ║  ── COMBAT ────────────────────────────────────  ║  ──────────────────────     ║
║                  ║  🏆 First Blood          [✓ Earned Day 2]        ║  NEXT ACHIEVABLE            ║
║                  ║  🏆 Ten Defeats          [✓ Earned Day 11]       ║                             ║
║                  ║  🏆 Solo Victory         [🔒 — defeat enemy alone]║  Guild Favourite:           ║
║                  ║                                                  ║  Complete 5 Charter jobs.   ║
║                  ║  ── RELATIONSHIP ──────────────────────────────  ║  Progress: 3 / 5           ║
║                  ║  🏆 First Trust          [✓ Earned Day 7]        ║                             ║
║                  ║  🏆 Companion Stage      [✓ Earned Day 14]       ║  ──────────────────────     ║
║                  ║  🏆 ??? (hidden)         [🔒 Locked]             ║  TOTAL REWARDS PENDING      ║
║                  ║                                                  ║  XP: 300 (3 uncollected)    ║
║                  ║  ── EXPLORATION ───────────────────────────────  ║  Items: 2 (uncollected)     ║
║                  ║  🏆 World Traveller I    [🔒 — visit 10 nodes]   ║  [ Collect All ]            ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Collect All ] [——           ] [——           ] [——         ] [——         ] [——        ] [——  ]║
║  R3: [——          ] [——           ] [——            ] [——         ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## P2. PLAYER PROFILE OVERVIEW

```
╔══[GOLD — SAFE]══════════════════════════════════════════════════════════════════════════════════╗
║ ❤142/200 ⚡95/150 ✦30/80  |  ☀MORNING  1/15  |  💰340G  |  ◈PRAGMATIST  |  [≡ MENU]           ║
╠══════════════════╦══════════════════════════════════════════════════╦═════════════════════════════╣
║                  ║                                                  ║                             ║
║  [Player         ║  👤 PLAYER PROFILE                              ║  DERIVED STATS              ║
║   Portrait]      ║  ──────────────────────────────────────────────  ║  ──────────────────────     ║
║                  ║  Name:    Kirito                                 ║                             ║
║  ALIGNMENT       ║  Origin:  Human · Wanderer                      ║  Combat ATK:    27          ║
║  ◈ PRAGMATIST    ║  Sub:     Structural Engineer                    ║  Combat DEF:    22          ║
║  Score: +8       ║  Job:     Warrior  Lv. 7                         ║  Combat AGI:    10          ║
║                  ║  Faith:   Radiant Faith  (casual)                ║  Combat SPD:    10          ║
║  CHARTER RANK    ║  Charter: Rank II — Knight                       ║  Crit chance:   8%          ║
║  Rank II Knight  ║  Divinity: 24                                    ║  LCK:           10          ║
║                  ║                                                  ║                             ║
║  DIVINITY        ║  CORE STATS                 RESOURCE POOLS       ║  MP drain rate:             ║
║  Score: 24       ║  STR  12  DEX  10           HP:   142 / 210      ║  Normal (Lv.7)              ║
║  Favoured        ║  AGI  10  INT  10           STA:   95 / 158      ║  Anomalous MP: ON           ║
║  (Solenne)       ║  WIL  13  PER  12           CPW:   30 / 85       ║                             ║
║                  ║  END  13  LCK  10           MP:    65 / 110      ║  MP Burnout risk:           ║
║  PLAYTIME        ║                                                  ║  LOW  (0 / 100)             ║
║  08h 42m         ║  TRAITS                                          ║                             ║
║  Day 14          ║  · Resource Efficient                            ║  ──────────────────────     ║
║  Spring, Yr 1    ║  · Anchored (sub-class perk)                     ║  HISTORY STATS              ║
║                  ║                                                  ║  Enemies defeated:  38      ║
║  GOLD            ║  ACTIVE STATUS EFFECTS                           ║  Quests done:       6       ║
║  On hand:  340G  ║  🔥 BURNING ×1  — 2 rounds                      ║  Intimate scenes:   1       ║
║  In vault: 1200G ║  (none others)                                   ║  Alignmt changes:   3       ║
╠══════════════════╩══════════════════════════════════════════════════╩═════════════════════════════╣
║  R1: [Skill Trees ] [Equipment   ] [Wardrobe   ] [Achievements] [Rel. Matrix] [End. Axis ] [——  ]║
║  R3: [——          ] [——           ] [——           ] [——         ] [——         ] [——        ] [◄Back]║
╚═════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## P3. IN-GAME PAUSE MENU (from [≡ MENU] button)

```
╔══════════════════════════════════════════════════════╗
║  PAUSE MENU                               [ x ]      ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  [ 🎒 Inventory & Quests    ]                        ║
║  [ 👤 Player Profile         ]                       ║
║  [ ✦ Skills & Equipment      ]                       ║
║  [ 👥 Contacts               ]                       ║
║  [ 🗺 World Map               ]                      ║
║  [ ⚑ Factions & Reputation  ]                       ║
║  [ 🏆 Achievements           ]                       ║
║  ─────────────────────────────────────────────────── ║
║  [ 💾 Save / Load            ]                       ║
║  [ ⚙ Settings               ]                       ║
║  [ 📜 Session Log            ]                       ║
║  [ ✦ Ending Axis            ]                        ║
║  ─────────────────────────────────────────────────── ║
║  [ 🏠 Return to Title Screen ]                       ║
║                                                      ║
╠══════════════════════════════════════════════════════╣
║  Current: Thornspire Market ✦ SAFE · Day 14 Morning  ║
║  Autosaved: 14 mins ago (Slot 99)   [ Save Now ]     ║
╚══════════════════════════════════════════════════════╝
```

---

## P4. RETURN TO TITLE CONFIRMATION

```
╔══════════════════════════════════════════════════════╗
║  RETURN TO TITLE SCREEN?                  [ x ]      ║
╠══════════════════════════════════════════════════════╣
║  Unsaved progress since last save (14 min):          ║
║  · Quest objective progress                          ║
║  · Relationship changes                              ║
║  · Gold / inventory changes                          ║
║                                                      ║
║  [ Save & Return to Title ]                          ║
║  [ Return Without Saving  ]                          ║
║  [ Cancel — Stay in Game  ]                          ║
╚══════════════════════════════════════════════════════╝
```


# ═══════════════════════════════════════════════════════════════════════════════════════════════
# APPENDIX — GLOBAL COMPONENT LIBRARY
# ═══════════════════════════════════════════════════════════════════════════════════════════════

## Z1. PROGRESS BAR VARIANTS

```
  Empty:     ░░░░░░░░░░░░░░░░  0%
  Low:       ██░░░░░░░░░░░░░░  12%  (use red tint for HP/LF)
  Mid:       ████████░░░░░░░░  50%
  High:      ████████████░░░░  75%
  Full:      ████████████████  100% (use gold tint for complete)
  Critical:  ██░░░░░░░░░░░░░░  12%  (flashing red border)
```

---

## Z2. SAFETY BADGE VARIANTS (tile inspector / node labels)

```
  ✦ SAFE       — gold text on dark bg
  ⚔ UNSAFE     — red text on dark bg
  🔒 FORTIFIED — grey text on dark bg
  ░░░ UNKNOWN  — dim/greyed text, blurred
```

---

## Z3. LOCK / GATE INDICATOR VARIANTS

```
  🔒 LOCKED — Trust 60 / 40 needed     (shows current/required)
  🔒 LOCKED — Quest: wolf_hunt req.    (shows flag name)
  🔒 LOCKED — INT 15 / 10 (you: 10)   (shows stat check)
  ✓  AVAILABLE                          (green checkmark)
  ⚠  AVAILABLE — alignment cost: −4   (available but warns)
  🔒 CONTENT FLAG DISABLED             (links to settings)
```

---

## Z4. RESOURCE COST ROW (button sublabel)

```
  [ Action Label ]
       1 AP · 10 CPW
  
  [ Action Label — 🔒 ]
       2 AP · 20 CPW  (insufficient CPW — greyed)
```

---

## Z5. NPC PORTRAIT FRAME STATES

```
  ┌──────────────┐    Normal
  │   [portrait] │
  └──────────────┘

  ┌ ─ ─ ─ ─ ─ ─ ┐    Sleeping / unconscious
  │   [portrait] │    (dim + zzz indicator)
  └ ─ ─ ─ ─ ─ ─ ┘

  ╔══════════════╗    Speaking (dialogue active)
  ║   [portrait] ║    (lit border)
  ╚══════════════╝

  ░░░░░░░░░░░░░░░░    Unknown / not yet met
  (silhouette only)
```

---

## Z6. STANDARD TOAST ANATOMY

```
  ┌────────────────────────────────────────────────────┐
  │  [ICON]  TITLE / CATEGORY                          │
  │  Brief description (1–2 lines max)                 │
  │  Optional detail line              [ Action Link ] │
  └────────────────────────────────────────────────────┘
  
  Position:  bottom-right corner
  Duration:  4s auto-dismiss (non-critical)
             persistent until dismissed (critical/story)
  Stacking:  up to 3 visible; older ones scroll up/off
```

---

## Z7. MODAL SIZE GUIDE (for Figma frame sizing)

```
  FULL SCREEN:    97 chars wide × 40 rows tall   (~1920px reference)
  LARGE MODAL:    74 chars wide × 36 rows tall   (settings, save/load)
  MEDIUM MODAL:   52 chars wide × 24 rows tall   (quest confirm, NPC interact)
  SMALL MODAL:    42 chars wide × 12 rows tall   (qty selector, equip confirm)
  TOAST:          50 chars wide × 4–5 rows tall  (corner notification)
  INSPECTOR PANEL:28 chars wide × variable       (right-panel sidebar)
```

---

## Z8. COMPLETE VIEW INVENTORY (reference checklist for Figma)

```
  FULL VIEWS (22)
  ☐ Title Screen
  ☐ Character Creation — Step 1
  ☐ Character Creation — Step 2
  ☐ Character Creation — Step 3
  ☐ Spatial Exploration — Safe
  ☐ Spatial Exploration — Unsafe
  ☐ World Map
  ☐ Combat View
  ☐ Dialogue View
  ☐ Cutscene View
  ☐ Intimacy View
  ☐ Menu Shell — Inventory
  ☐ Menu Shell — Quests
  ☐ Shop View
  ☐ Blacksmith View
  ☐ Inn / Room View
  ☐ Skill Trees View
  ☐ Equipment View
  ☐ Player Wardrobe
  ☐ Contacts Directory
  ☐ Contact Profile
  ☐ Relationship Matrix
  ☐ Suite Management
  ☐ Crafting Bench
  ☐ Taming Cell
  ☐ Faction Standing
  ☐ Achievements
  ☐ Player Profile
  ☐ Defeat / Death Screen
  ☐ Interrogation View
  ☐ Bank / Vault
  ☐ Bounty Office

  OVERLAYS / MODALS (38)
  ☐ Pause Menu (from ≡)
  ☐ Save / Load Portal
  ☐ Settings — Content
  ☐ Settings — Audio
  ☐ Settings — Gameplay
  ☐ History Log
  ☐ About / Credits
  ☐ Sleep at Manor
  ☐ Sleep at Inn
  ☐ Phase Advance
  ☐ Fast Travel Confirm (safe)
  ☐ Fast Travel Confirm (unsafe)
  ☐ Teleport Modal
  ☐ Carriage Hire
  ☐ Spire Travel
  ☐ City Gate Blocked
  ☐ Teleport Ward Blocked (toast)
  ☐ Quantity Selector
  ☐ Item Use Confirm
  ☐ Item Drop Confirm
  ☐ Equipment Swap Confirm
  ☐ Forge Item
  ☐ Party Management
  ☐ Move to Suite Confirm
  ☐ Gift Sub-Panel
  ☐ Quest Accept Confirm
  ☐ Quest Complete
  ☐ Quest Fail
  ☐ Alignment Branch Choice
  ☐ Initiate Scene — Consensual
  ☐ Initiate Scene — Force
  ☐ Initiate Scene — Force Sleeping
  ☐ Scene End Summary
  ☐ Orgasm Event Panel
  ☐ NPC Faint Warning
  ☐ Audience Gate Blocked
  ☐ Group Scene Gate Fail
  ☐ Adult Content Gate
  ☐ Pay Tithe
  ☐ NG+ Confirmation
  ☐ Return to Title Confirm
  ☐ Flee Combat Confirm

  TOASTS / MINOR NOTIFICATIONS (16)
  ☐ Achievement Unlocked
  ☐ Charter Rank-Up
  ☐ Alignment Shift (minor)
  ☐ Alignment Threshold Crossed (overlay)
  ☐ Status Effect Applied
  ☐ Status Effect Expired
  ☐ Level-Up — Player (overlay)
  ☐ Level-Up — Companion (overlay)
  ☐ Relationship Band Change
  ☐ Companion Sub-Quest Unlocked
  ☐ Season Change
  ☐ God Status Change
  ☐ Pregnancy Stage Advance
  ☐ Birth Notification
  ☐ Infamy Tier Change
  ☐ Ending Axis Tracker (overlay)

  COMPANION WARDROBE (from Addendum G1)
  ☐ Wardrobe — 22-slot matrix
  ☐ Wardrobe — full-body override variant
  ☐ Wardrobe — torn condition variant
  ☐ Wardrobe — male NPC variant
  ☐ Wardrobe — save preset modal
```
