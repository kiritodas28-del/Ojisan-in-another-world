Here are the visual wireframe blueprints for all 13 views, modeled using ASCII character grids to capture the structural layout rules for your Figma workspace.

------------------------------
## 1. Main Title Screen View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (PILLAR)   | MIDDLE CANVAS: MAIN TITLE & CINEMATICS DISPLAY         | RIGHT PANEL (PILLAR)  |
|                       |                                                        |                       |
|                       |                                                        |                       |
|                       |                     THE CHRONICLES                     |                       |
|                       |                           OF                           |                       |
|                       |                     CRESTFALLEN VAULT                  |                       |
|     OPAQUE BLANK      |                                                        |     OPAQUE BLANK      |
|                       |             [ Custom Dark Fantasy Typography ]         |                       |
|  (Renders as pure,    |             [      Continuous Gradient Fill  ]         |  (Renders as pure,    |
|   opaque onyx void    |                                                        |   opaque onyx void    |
|   to anchor focal     |             • Background: Ambient smoke simulation     |   to anchor focal     |
|   center space)       |                           and slow red dust drift      |   center space)       |
|                       |                                                        |                       |
|                       |                                                        |                       |
|                       |                                                        |                       |
+-----------------------+--------------------------------------------------------+-----------------------+

|                                    BOTTOM ACTION HOTBAR (TITLE SELECTIONS ONLY)                        |
| [  NEW GAME  ] [  CONTINUE  ] [  NEW GAME+ ] [ CONTENT CONFIG ] [   EMPTY   ] [   EMPTY   ] [   EMPTY   ] | [   HOTBAR INACTIVE  ] |
| [  SETTINGS  ] [   ABOUT    ] [    QUIT    ] [     EMPTY      ] [   EMPTY   ] [   EMPTY   ] [   EMPTY   ] | [    NO MULTI-PAGE   ] |
| [   EMPTY    ] [   EMPTY    ] [    EMPTY   ] [     EMPTY      ] [   EMPTY   ] [   EMPTY   ] [   EMPTY   ] | [   FOOTER SEPARATORS] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 2. HUD Overlay Frame

+-----------------------+
| LEFT PANEL (HUD ONLY) |
|                       |
| [PLAYER VITALS]       |
| HP  [████████░░] 85%  |
| STM [██████░░░░] 60%  |
| CPW [██████████] 100% |
|                       |
| [PARTY STRIP]         |
| 👤 Vespera [█████]    |
| 👤 Lyra    [████░]    |
| 👤 Downed  [░░░░░] 0% |
|                       |
| [CLOCK & SYSTEM]      |
| Evening (Phase 7/15)  |
|                       |
| [ECONOMIC COUNTER]    |
| Gold: 1,450g          |
|                       |
| [DEBUFF INDICATORS]   |
| 🚫 Fatigue: Tier II   |
|                       |
| [CAPACITY TALLY]      |
| 📦 Bag: 14/20 Slots   |
+-----------------------+

------------------------------
## 3. Unified Spatial Exploration View (30×30 Grid Mode)

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (HUD)      | MIDDLE CANVAS: 30x30 UNIFIED EXPLORATION CANVAS       | RIGHT PANEL (PILLAR)  |
|                       |                                                        |                       |
| [PLAYER VITALS]       | +----------------------------------------------------+ | [TILE INSPECTOR]      |
| HP  [████████░░] 85%  | | ███████████████████  [DOOR]  █████████████████████ | | 👥 CURRENT COORDINATE |
| STM [██████░░░░] 60%  | | █ . . . . . . . . . . . . . . . . . . . . . . . . █ | |                       |
| CPW [██████████] 100% | | █ . . . . . . . . . . . . . . . . . . . . . . . . █ | | 👤 Vespera (Comp)    |
|                       | | █ . . . . . . . . . . . . . . . . . . . . . . . . █ | |    [Talk] [Flirt]     |
| [PARTY STRIP]         | | █ . . . . . . . [WALL] [WALL] [WALL] . . . . . . . █ | | 👤 Lyra (Comp)       |
| 👤 Vespera [█████]    | | █ . . . . . . . [WALL] [VOID] [WALL] . . . . . . . █ | |    [Talk] [Touch]     |
| 👤 Lyra    [████░]    | | █ . . . . . . . [WALL] [WALL] [WALL] . . . . . . . █ | | 👹 Miasma Imp (x3)  |
| 👤 Downed  [░░░░░]    | | █ . . . . . . . . . . . . . . . . . . . . . . . . █ | |    [Engage] [Purify]  |
|                       | | █ . . . . . . . . . . . . . . . . . . . . . . . . █ | |                       |
| [CLOCK & SYSTEM]      | | █ . . . . . . . . . . [PLAYER] . . . . . . . . . █ | | [MANOR STRUCTURE]   |
| Evening (Phase 7/15)  | | █ . . . . . . . . . .  ( +3 )  . . . . . . . . . █ | | 🛏️ Sanctuary Suite  |
|                       | | █ . . . . . . . . . . . . . . . . . . . . . . . . █ | |    Tier II Upgrade   |
| [ECONOMIC COUNTER]    | | ██████████████████████████████████████████████████ | |    Timer: 02h 45m    |
| Gold: 1,450g          | +----------------------------------------------------+ |-----------------------|
| 📦 Bag: 14/20 Slots   | • Outer Safety Trim border color changes by zone safety| [SCROLLABLE CONTEXT]  |
|                       | • Empty tile paths represent walkable floor parameters | - Stepped onto node.  |
| • Safety Trim Border  | • Stovering or stepping lists occupant badge nodes     | - Ambush index shifts.|
+-----------------------+--------------------------------------------------------+-----------------------+

|                                  BOTTOM ACTION HOTBAR (EXPLORATION ACTIONS)                             |
| [ MOVE NORTH ] [ INSPECT COORD ] [  CAMP / REST  ] [ TALK: VESPERA ] [ PURIFY FIELD ] [ EMPTY ] [ EMPTY ] | [ PREV HOTBAR PAGE ] |
| [ MOVE WEST  ] [ MOVE SOUTH    ] [ MOVE EAST     ] [ FLIRT: LYRA   ] [ ENGAGE ENEMY ] [ EMPTY ] [ EMPTY ] | [   • ◦ ◦ PAGE DOTS  ] |
| [   EMPTY    ] [     EMPTY     ] [     EMPTY     ] [     EMPTY     ] [     EMPTY    ] [ EMPTY ] [SYS MENU] | [ NEXT HOTBAR PAGE ] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 4. Turn-Based Combat View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (HUD)      | MIDDLE CANVAS: BATTLEFIELD ENCOUNTER DASHBOARD         | RIGHT PANEL (PILLAR)  |
|                       | +----------------------------------------------------+ |                       |
| [PLAYER VITALS]       | | INITIATIVE ORDER: [👤 PLR] -> [👤 COM1] -> [👹 BOSS] | | [TARGET ENEMY STATUS] |
| HP  [████████░░] 85%  | +----------------------------------------------------+ | 👹 Miasma Fiend (BOSS) |
| STM [██████░░░░] 60%  |                                                        | HP  [██████░░░░] 60%  |
| CPW [██████████] 100% |                                                        | STM [██████████] 100% |
|                       |                  [ACTIVE SCENE GRAPHIC]                | Status: Bleeding (T2) |
| [PARTY STRIP]         |                                                        | Mana:  45 / 100       |
| 👤 Vespera [█████]    |                    👹 Miasma Fiend                     |                       |
| 👤 Lyra    [████░]    |                     (Boss Monster)                     | 👹 Corrupted Larva    |
| 👤 Downed  [░░░░░]    |                                                        | HP  [██████████] 100% |
|                       |                                                        | STM [████░░░░░░] 40%  |
| [CLOCK & SYSTEM]      |                                                        | Status: Fragile       |
| Midnight (Phase 15)   | +----------------------------------------------------+ |                       |
|                       | | PURIFICATION TRACK: [██████░░░░░░░░░░░░░░] 35%      | |-----------------------|
| [ECONOMIC COUNTER]    | +----------------------------------------------------+ | [SCROLLABLE BATTLE LOG] |
| Gold: 1,450g          | • Purification meter updates dynamically on Sex Skill  | - Player cast Cleave  |
| 📦 Bag: 14/20 Slots   | • Miasma/Mana reserves limit special battle attributes | - Boss loses 24 HP.   |
+-----------------------+--------------------------------------------------------+-----------------------+

|                                    BOTTOM ACTION HOTBAR (TACTICAL BATTLE INTERFACE)                    |
| [BASIC ATTACK] [BATTLE SKILLS] [    PURIFY    ] [   DEFEND   ] [ USE ITEM ] [ ATTEMPT FLEE ] [ EMPTY ] | [  PREV HOTBAR PAGE  ] |
| [ EXEC SKILL ] [ SELECT SKILL ] [ ARDOR SKILL 1 ] [ EMPTY NODES] [ HEAL POT  ] [ BLOCK TURNS ] [ EMPTY ] | [    • ◦ ◦ ROUND 3     ] |
| [ SKILL ARRA ] [ CONFIG SKILL ] [ ARDOR SKILL 2 ] [ BLOCK STATUS] [ ANTIDOTE ] [ CHIP TARGET ] [ EMPTY ] | [  NEXT HOTBAR PAGE  ] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 5. Intimacy View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (HUD)      | MIDDLE CANVAS: TEXTUAL FRAGMENT NARRATIVE RUNNER       | RIGHT PANEL (PILLAR)  |
|                       |                                                        |                       |
| [PLAYER VITALS]       | "The ambient light of the manor hearth throws long,    | [PARTNER INTENSE ATTR] |
| HP  [████████░░] 85%  |  shadowed lines across the velvet canopy. Vespera's    | 👤 Vespera             |
| STM [██████░░░░] 60%  |  breathing shifts, her psychological resistance layers | Race: Dark Elf        |
| CPW [██████████] 100% |  ebbing away as the Technique checks bypass her       |                       |
|                       |  traditional baseline thresholds.                      | [PHYSIOLOGY METRICS]  |
| [PARTY STRIP]         |                                                        | Arousal [████████░░]  |
| 👤 Vespera [█████]    |  Her eyes remain locked with yours, dirty talk counters| Wetness [TIER 3: MAX] |
| 👤 Lyra    [████░]    |  incrementing as the positioning transitions."         | Status: Subspace      |
| 👤 Downed  [░░░░░]    |                                                        | Resistance [██░░░░░░] |
|                       |                                                        |                       |
| [CLOCK & SYSTEM]      |                                                        | Orgasm Count: 2       |
| Midnight (Phase 15)   |                                                        |                       |
|                       |                                                        |                       |
| [ECONOMIC COUNTER]    | • Renders deep-lore dark fantasy typography packages   |-----------------------|
| Gold: 1,450g          | • Streams scene text blocks from fragment repository   | [SCROLLABLE INTERACT] |
| 📦 Bag: 14/20 Slots   | • Simultaneous action selections filter via body checks| - Position updated.   |
+-----------------------+--------------------------------------------------------+-----------------------+

|                                    BOTTOM ACTION HOTBAR (INTIMACY INTERACTION CODES)                   |
| [ SELECT POS 1 ] [ SELECT POS 2 ] [ EXEC ACTION 1 ] [ EXEC ACTION 2 ] [  CAVITY CHECK ] [ EMPTY ] [ END ] | [  PREV ACTION ARRA  ] |
| [ SELECT POS 3 ] [ SELECT POS 4 ] [ EXEC ACTION 3 ] [ EXEC ACTION 4 ] [ RESTRAINT SET ] [ EMPTY ] [ SCNE] | [    ◦ • ◦ POS/ACT PAG ] |
| [ SELECT POS 5 ] [ SELECT POS 6 ] [ EXEC ACTION 5 ] [ EXEC ACTION 6 ] [ BODYMAP SHIFT ] [ EMPTY ] [ ANCH] | [  NEXT ACTION ARRA  ] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 6. Branching Dialogue View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (HUD)      | MIDDLE CANVAS: CONVERSATION DIALOGUE CARD SCREEN       | RIGHT PANEL (PILLAR)  |
|                       |                                                        |                       |
| [PLAYER VITALS]       | "I have unraveled the sigils of the third tier dungeon | [SPEAKER PROFILE]    |
| HP  [████████░░] 85%  |  nodes, Outlander. The server records indicate you      | 👤 Lyra                |
| STM [██████░░░░] 60%  |  have not yet allocated points to your Ardor trees.    | Race: Fox Girl        |
| CPW [██████████] 100% |                                                        |                       |
|                       |  Fix your loadout matrices, pass the attribute checks, | [AFFECTION RELATION]  |
| [PARTY STRIP]         |  and perhaps we can advance our contact records        | Love  [██████░░░░] 60 |
| 👤 Vespera [█████]    |  beyond this localized threshold.                      | Trust [████████░░] 80 |
| 👤 Lyra    [████░]    |                                                        |                       |
| 👤 Downed  [░░░░░]    |  What is your response?"                               | *Hovering Option 2   |
|                       |                                                        |  projects delta spec:*|
| [CLOCK & SYSTEM]      |                                                        |  Love Delta:  +5      |
| Afternoon (Phase 3)   |                                                        |  Trust Delta: -10     |
|                       |                                                        |                       |
| [ECONOMIC COUNTER]    | • Condition flags gray or hide choices dynamically     |-----------------------|
| Gold: 1,450g          | • First coversation sets individuation tracking fields | [SCROLLABLE CHAT LOG] |
| 📦 Bag: 14/20 Slots   | • Accommodates up to 6 structured choices horizontally | - Conversation unrolls|
+-----------------------+--------------------------------------------------------+-----------------------+

|                                    BOTTOM ACTION HOTBAR (CONVERSATIONAL BRANCH MATRICES)              |
| [ 1. "I will inspect my skill nodes immediately." ] [ 3. LOCKED BY SERVER FLAG FLAG ] [ EMPTY CELL   ] | [   NO SEPARATE PAGE   ] |
| [ 2. [FLIRT] "Teach me your tracking secrets."    ] [ 4. GREYED OUT: PREREQ NOT MET ] [ EMPTY CELL   ] | [    • ◦ ◦ STATUS CORR ] |
| [ EMPTY CONTAINER ELEMENT                         ] [ EMPTY CONTAINER ELEMENT       ] [ SYSTEM MENU  ] | [   FIXED IN DASHBOARD ] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 7. Menus Overlay Interface

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (HUD)      | MIDDLE CANVAS: METADATA TABBED SYSTEM MANAGEMENT PANEL | RIGHT PANEL (PILLAR)  |
|                       |                                                        |                       |
| [PLAYER VITALS]       | [SYSTEM NAVIGATION TAB PANELS]                         | [UTILITY INVENTORY]   |
| HP  [████████░░] 85%  | +----------------------------------------------------+ |                       |
| STM [██████░░░░] 60%  | | INVENTORY |  SKILL TREES  | QUEST LOGS | CONTACTS  | | Configured display   |
| CPW [██████████] 100% | +----------------------------------------------------+ | card changes directly |
|                       |                                                        | relative to whichever |
| [PARTY STRIP]         |                                                        | selection item slot   |
| 👤 Vespera [█████]    |         (This layout container mutates completely      | is focused within the |
| 👤 Lyra    [████░]    |          to host internal catalog directories          | central middle canvas |
| 👤 Downed  [░░░░░]    |          when navigating system menus)                 | grid board)           |
|                       |                                                        |                       |
| [CLOCK & SYSTEM]      |                                                        |                       |
| Morning (Phase 1/15)  |                                                        |                       |
|                       |                                                        |                       |
| [ECONOMIC COUNTER]    | • Locks Manor upgrades if explored inside unsafe zones |-----------------------|
| Gold: 1,450g          | • Features deep validation matches via tRPC conduits   | [SCROLLABLE REVENUE]  |
| 📦 Bag: 14/20 Slots   | • Item transactions adjust dynamically by discounts    | - Opened interface.   |
+-----------------------+--------------------------------------------------------+-----------------------+

|                                  BOTTOM ACTION HOTBAR (MENU NAVIGATION MODIFIERS)                       |
| [ INVENTORY NODES ] [  SKILL CORES  ] [  QUEST LEDGER ] [ CONTACT ROWS  ] [ MANOR BASE  ] [  EMPTY  ] [ MAP ] | [  PREV SCHEDULING PAG ] |
| [ SELECTION ENTRY ] [ WIPE ALL NODES] [ TRUNCATE TRACK] [ PROFILE DETAILS] [ SUITE SYSTEM] [  EMPTY  ] [ BACK] | [    • • ◦ METRIC CONT ] |
| [ EMPTY CONTAINER ] [ EMPTY BUTTONS ] [ EMPTY FIELDS  ] [ EMPTY STRUCT  ] [ EMPTY CELL  ] [  EMPTY  ] [ MENU] | [  NEXT SCHEDULING PAG ] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 8. Character Creation View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (PILLAR)   | MIDDLE CANVAS: TRAIT INITIALIZATION PROFILE CANVAS     | RIGHT PANEL (PILLAR)  |
|                       |                                                        |                       |
|                       | [IDENTITY DEFINITION ENTRY]                            |                       |
|                       | Enter Profile Character Name: [____________________]  |                       |
|                       |                                                        |                       |
|                       | [ORIGIN CLASS MULTIPLIERS TOGGLE]                      |                       |
|                       | +---------------+ +---------------+ +---------------+  |                       |
|     OPAQUE BLANK      | |    WARRIOR    | |     MAGE      | |     ROGUE     |  |     OPAQUE BLANK      |
|                       | |  (STR x 1.5)  | |  (STR x 0.7)  | |  (STR x 1.0)  |  |                       |
|  (Kept unrendered     | +---------------+ +---------------+ +---------------+  |  (Kept unrendered     |
|   during initiation   |                                                        |   during initiation   |
|   stages to match     | [DYNAMIC CLASS BACKGROUND HISTORY LORE BLURB]          |   stages to match     |
|   title screen flow)  | "A combat skirmisher born from border outposts.        |   title screen flow)  |
|                       |  Stat progression curves favor physical agility blocks"|                       |
|                       |                                                        |                       |
|                       | • Dispatches validated character definitions to engine |                       |
+-----------------------+--------------------------------------------------------+-----------------------+

|                                    BOTTOM ACTION HOTBAR (TRAIT ALLOCATION POINT MATRIX)                |
| [ STRENGTH:  10 [+][-] ] [ AGILITY:   12 [+][-] ] [ WILLPOWER: 08 [+][-] ] [ DEFENCE: 10 [+][-] ] [ EMPTY ] [ EMPTY ] [ FIN ] | [   NO MULTI-PAGING    ] |
| [ LUCK:      10 [+][-] ] [ SENSITIV:  05 [+][-] ] [ TECHNIQUE: 05 [+][-] ] [ VIRILITY:05 [+][-] ] [ EMPTY ] [ EMPTY ] [ FIN ] | [   UNSPENT ASSIGNED   ] |
| [ EMPTY CELL ATTRIB    ] [ EMPTY CELL ATTRIB    ] [ EMPTY SPACE ELEMENT  ] [ EMPTY SPACE CODE    ] [ EMPTY ] [ EMPTY ] [ ALO ] | [   REMAINING: 05 PTS  ] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 9. Defeat / Game Over View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (MASKED)   | MIDDLE CANVAS: FATAL SETTLEMENT ACCOUNTING SHEET       | RIGHT PANEL (MASKED)  |
|                       |                                                        |                       |
|                       |                                                        |                       |
|                       |                     YOUR SOUL SPLINTERS                |                       |
|                       |                                                        |                       |
|  ===================  |              [ Screen Shake Critical Frame ]           |  ===================  |
|  |                 |  |                                                        |  |                 |  |
|  |  HEAVY OPAQUE  |  | [CRITICAL LOSS MANIFEST PENALTIES TALLY]               |  |  HEAVY OPAQUE  |  |
|  |  SCREEN BLUR    |  | - Total Currency Forfeited: -450 Gold                  |  |  SCREEN BLUR    |  |
|  |  VIGNETTE WIPE  |  | - Stat Traumas Acquired: Scars applied via backend     |  |  VIGNETTE WIPE  |  |
|  |                 |  | - Party Vitals Forced Collapse: Relocated to safe base |  |                 |  |
|  ===================  | - Equipment Durability Reduction checks finalized     |  ===================  |
|                       |                                                        |                       |
|                       | • Resolves server validation before loading auto-save  |                       |
+-----------------------+--------------------------------------------------------+-----------------------+

|                                    BOTTOM ACTION HOTBAR (RE-ANCHORING DISPATCH PATHS)                  |
| [ AWAKE AT MANOR BASE ] [ LOAD AUTORECORD SAVES    ] [ ABORT TO MAIN TITLE ] [ EMPTY CELL ] [ EMPTY ] [ EMPTY ] [ EMPTY ] | [   ALL MATRIX BUTTONS ] |
| [ DEACTIVATED TILES   ] [ DEACTIVATED TILES         ] [ DEACTIVATED TILES ] [ EMPTY CELL ] [ EMPTY ] [ EMPTY ] [ EMPTY ] | [   COMPLETELY INHIBIT ] |
| [ DEACTIVATED TILES   ] [ DEACTIVATED TILES         ] [ DEACTIVATED TILES ] [ EMPTY CELL ] [ EMPTY ] [ EMPTY ] [ EMPTY ] | [   DURING FAILURE SECE] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 10. Exploration Encounter View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (HUD)      | MIDDLE CANVAS: INTERCEPT MODAL DIALOGUE FRAME          | RIGHT PANEL (PILLAR)  |
|                       | +----------------------------------------------------+ |                       |
| [CRIMSON DANGER ZONE] | | EVENT BANNER: AN AMBUSH IN THE SUFFOCATING DARK    | | [TERRAIN INSPECTOR]   |
| HP  [████████░░] 85%  | +----------------------------------------------------+ |                       |
| STM [██████░░░░] 60%  | "As your character matrix crosses into the unlit edge  | 👥 PRESENT THREATS    |
| CPW [██████████] 100% |  cells of the Whispering Woods, a snap of rotten       |                       |
|                       |  timber echoes from coordinate layers below.          | 👤 Vespera (Comp)      |
| [PARTY STRIP]         |                                                        | 👤 Lyra (Comp)       |
| 👤 Vespera [█████]    |  A raiding party of Miasma-Corrupted humanoids drops  |                       |
| 👤 Lyra    [████░]    |  from the stone wall archway, blocking your direct     | 👹 Corrupted Raiders  |
| 👤 Downed  [░░░░░]    |  locomotion options."                                  |    (Danger Check True)|
|                       |                                                        |                       |
| [CLOCK & SYSTEM]      | [RESOLUTION SPECIFICATION]                             | • Panel properties do |
| Night (Phase 13/15)   | • Choice buttons map success rates against attributes  |   not change; tracks  |
| 📦 Bag: 14/20 Slots   | • Failure shifts layout frame directly into combat view|   local stacked grid  |
+-----------------------+--------------------------------------------------------+-----------------------+

|                                    BOTTOM ACTION HOTBAR (EVENT RESOLUTION MATRICES)                    |
| [ AGI CHECK: DODGE TRAP (75% SUC) ] [ STR CHECK: FIGHT BACK (40% SUC) ] [ CHOOSE OPTION 3 ] [ EMPTY ] [ EMPTY ] [ PRO ] | [   ACTION SYSTEM PAGE ] |
| [ CHOOSE OPTION 4                 ] [ CHOOSE OPTION 5                 ] [ CHOOSE OPTION 6 ] [ EMPTY ] [ EMPTY ] [ CEED] | [   TEMPORARILY FLATTED] |
| [ EMPTY ROW SLOTS PACKET          ] [ EMPTY ROW SLOTS PACKET          ] [ EMPTY CONTEXT   ] [ EMPTY ] [ EMPTY ] [ ANCH] | [   FOR STEP INTERCEPT ] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 11. Equipment Management View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (HUD)      | MIDDLE CANVAS: CENTRAL PAPER-DOLL LOADOUT MANAGER     | RIGHT PANEL (PILLAR)  |
|                       |                                                        |                       |
| [PLAYER VITALS]       | [ACTIVE CHARACTER DETAILS HEADER]                      | [STAT COMPARER ENGINE]|
| HP  [████████░░] 85%  | 👤 Vespera  |  Class: Rogue  |  Level: 12              |                       |
| STM [██████░░░░] 60%  | Derived Stats: ATK: 24 | DEF: 14 | CRIT: 12% | EVA: 8% | Steel Dagger +3       |
| CPW [██████████] 100% |                                                        |                       |
|                       | [EQUIPPED PAPER-DOLL MATRIX SLOTS]                     | Base ATK: 12          |
| [PARTY STRIP]         | +--------------------+ +--------------------+          | Effective ATK: 15     |
| 👤 Vespera [█████]    | |  WEAPON: Blade +2  | |  HELMET: Leather  |          |                       |
| 👤 Lyra    [████░]    | +--------------------+ +--------------------+          | Modifications:        |
| 👤 Downed  [░░░░░]    | +--------------------+ +--------------------+          | |  AGI: +3  (Gain)     |
|                       | |  CHEST: Jerkin     | |  OFF-HAND: Cloak  |          | |  STR: -1  (Loss)     |
| [CLOCK & SYSTEM]      | +--------------------+ +--------------------+          |                       |
| Evening (Phase 7/15)  | +--------------------+ +--------------------+          | Net Damage Output:    |
|                       | |  GLOVES: Shadow    | |  BOOTS: Silent    |          | +3 Max Damage Delta   |
| [ECONOMIC COUNTER]    | +--------------------+ +--------------------+          |-----------------------|
| Gold: 1,450g          |                                                        | [SYSTEM ENGINE LOGS]  |
| 📦 Bag: 14/20 Slots   | [VALID DEPOSITED INVENTORY ITEMS GRID]                 | - Inspected short bow.|
|                       | +---------+ +---------+ +---------+ +---------+        | - Measured stat buffs.|
| (HUD is left untouched| | ShortBw | | Rapier  | | MageStf | | IronDgr |        | - Click to expand     |
| clicking icons updates| +---------+ +---------+ +---------+ +---------+        |   historical view log |
+-----------------------+--------------------------------------------------------+-----------------------+

|                                  BOTTOM ACTION HOTBAR (EQUIPMENT MODIFIER COMMMANDS)                    |
| [ EQUIP SELECTED ] [ UNEQUIP SLOT ] [ FORGE UPGRADE ] [ LABORATORY MUTA ] [ DISCARD LOOT ] [ EMPTY ] [ EMPTY ] | [  PREV WAREHOUSE PAGE ] |
| [ UPGRADE SLOT 0 ] [ CLEAR CARGO ]  [ UPGRADE TIER  ] [ REFACTOR ITEM  ] [ EMPTY CELL   ] [ EMPTY ] [ EMPTY ] | [    ◦ • ◦ APPARATUS TABS] |
| [ EMPTY CONTAINERS ] [ EMPTY CLIPS ]  [ EMPTY ATTR    ] [ EMPTY STATUS   ] [ EMPTY CELL   ] [ EMPTY ] [ BACK  ] | [  NEXT WAREHOUSE PAGE ] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 12. Skill Trees View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (HUD)      | MIDDLE CANVAS: BATTLE & ARDOR PROGRESSION NODE CHARTS  | RIGHT PANEL (PILLAR)  |
|                       |                                                        |                       |
| [PLAYER VITALS]       | [BATTLE ABILITIES TREE]     [ARDOR CAPABILITIES TREE]  | [NODE DETAILS METER]  |
| HP  [████████░░] 85%  |                                                        |                       |
| STM [██████░░░░] 60%  |       [Strike I]                  [Flirt I]            | Skill Name: Cleave II |
| CPW [██████████] 100% |           │                           │                | Type: Active Combat   |
|                       |           ▼                           ▼                | Cost: 15 Crest Power  |
| [PARTY STRIP]         |      [Cleave I] *Glows*           [Touch I]            |                       |
| 👤 Vespera [█████]    |           │                           │                | Description:          |
| 👤 Lyra    [████░]    |           ▼                           ▼                | Sweeps adjacent       |
| 👤 Downed  [░░░░░]    |      [Cleave II] *Target*        [Intimacy I]          | floor cells to deal   |
|                       |                                                        | weaponPower x 1.5     |
| [SKILL WALLETS TALLY] | • Gold border frames indicate unlocked capability nodes| physical tracking damage|
| Unspent BP: 4 Points  | • Line linkages trace prerequisite dependency paths    |                       |
| Unspent AP: 2 Points  | • Available unspent currencies track on local elements | Prerequisites:        |
|                       | • Spending operations pass server-authoritative loops | Strike I, Cleave I    |
| • Safety Trim Border  | • Active nodes trigger Crest Power expenditure formulas|-----------------------|
+-----------------------+--------------------------------------------------------+-----------------------+

|                                    BOTTOM ACTION HOTBAR (SKILL TREE ALLOCATION ROW)                    |
| [ SPEND POINT ] [ RESET BATTLE ] [ RESET ARDOR ] [ TOGGLE BATTLE ] [ TOGGLE ARDOR ] [ EMPTY ] [ MAP  ] | [  PREV ABILITY SLICES ] |
| [ CONFIRM NOD ] [ FORCE UNLOCK ] [ SYSTEM WIPE ] [ VIEW PASSIVES ] [ VIEW ACTIVES ] [ EMPTY ] [ BACK ] | [    • ◦ ◦ MAP TRACKING ] |
| [ EMPTY SECT  ] [ EMPTY CLIPS  ] [ EMPTY ATTR  ] [ EMPTY METRIC  ] [ EMPTY CELL   ] [ EMPTY ] [ MENU ] | [  NEXT ABILITY SLICES ] |
+--------------------------------------------------------------------------------------------------------+

------------------------------
## 13. Contacts & Detailed Profiles View

+-----------------------+--------------------------------------------------------+-----------------------+
| LEFT PANEL (HUD)      | MIDDLE CANVAS: INDIVIDUATED CHARACTER PROFILES DIRECTORY| RIGHT PANEL (PILLAR)  |
|                       |                                                        |                       |
| [PLAYER VITALS]       | +----------------------------------------------------+ | [DEEP PROFILE SCORES] |
| HP  [████████░░] 85%  | | PORTRAIT | NAME     | RACE     | STAGE | LOCATION  | | 👤 Vespera            |
| STM [██████░░░░] 60%  | +----------------------------------------------------+ | Race: Dark Elf        |
| CPW [██████████] 100% | | [IMAGE]  | Vespera  | Dark Elf | S-03  | Manor S01 | | Background: Assassin  |
|                       | | [IMAGE]  | Lyra     | Fox Girl | S-01  | Wilds N12 | |                       |
| [PARTY STRIP]         | | [IMAGE]  | Innkeepr | Human    | S-00  | Tavern    | | [METRICS SUB-TABS]   |
| 👤 Vespera [█████]    | +----------------------------------------------------+ | - Affection: Devoted  |
| 👤 Lyra    [████░]    |                                                        | - Relationship: Spouse|
| 👤 Downed  [░░░░░]    | • Roster caps total records at 400 unique slots safely| - Virginity: False    |
|                       | • Individual rows display core metadata properties     | - Gestation: Week 6   |
| [CLOCK & SYSTEM]      | • Triggers introduction status flags on initial talk  | - Lactation: True     |
| Evening (Phase 7/15)  | • Sorts directories by contact relationship magnitude | - Kinks: Acquired     |
|                       | • Profile view expands granular attributes in inspector| - Parentage: M/F Names|
| • Permanent Pillar HUD| • Displays active location tracking coordinate points  |-----------------------|
+-----------------------+--------------------------------------------------------+-----------------------+

|                                  BOTTOM ACTION HOTBAR (REGISTRY ACTION PORTAL)                         |
| [ INSPECT PROFILE ] [ ASSIGN TO PARTY ] [ ALLOCATE SUITE ] [ DISMISS CONTACT ] [ PAGE UP ] [ PAGE DN ] | [  PREV DOSSIER CODES  ] |
| [ EXTRACT DATA    ] [ CLEAR MEMBERS   ] [ VACATE ROOM    ] [ REFRESH LOGS    ] [ CELL UP ] [ CELL DN ] | [    ◦ • ◦ TRACK METERS ] |
| [ EMPTY ACTIONS   ] [ EMPTY CLIP SECT ] [ EMPTY ATTR ROW ] [ EMPTY CONTAINER ] [ EMPTY   ] [ CLOSE   ] | [  NEXT DOSSIER CODES  ] |
+--------------------------------------------------------------------------------------------------------+

Now that your wireframe designs are visually mapped out across all 13 views, would you like to build the TypeScript router types for tRPC to handle coordinate updates or write the core Zustand store slices for hotbar page swaps?

The Overlays:

1. Settings & Content Configuration OverlayContext: Triggered from Title Screen ([Settings], [Content Config]) or System Menu.Layout: Centered modal with internal tabs.text

+----------------------------------------------------------------------------------+
|  BACKGROUND LAYER: [ DIMMED / BLURRED DASHBOARD ]                                |
|                                                                                  |
|          +------------------------------------------------------------+          |
|          |  SYSTEM CONFIGURATION MATRIX                               |          |
|          +------------------------------------------------------------+          |
|          | [ AUDIO ]  [ VIDEO ]  [ GAMEPLAY ]  [ > CONTENT FILTERS < ]|          |
|          |------------------------------------------------------------|          |
|          |                                                            |          |
|          |  ADULT CONTENT TOGGLES                                     |          |
|          |  [X] Enable Erotic Narrative Streams                       |          |
|          |  [X] Show Physiological Status Bars (Arousal/Wetness)      |          |
|          |  [ ] Extreme/Non-Con Content Warning Blocker               |          |
|          |                                                            |          |
|          |  TEXT PRESENTATION                                         |          |
|          |  Font Size:    [ - ]  14px  [ + ]                          |          |
|          |  Scroll Speed: [ SLOW ]  [ MED ]  [ INSTANT ]              |          |
|          |                                                            |          |
|          |  AUDIO LEVELS                                              |          |
|          |  Master Vol:   [████████████░░░░] 75%                      |          |
|          |  Ambience:     [████████░░░░░░░░] 50%                      |          |
|          |                                                            |          |
|          +------------------------------------------------------------+          |
|          |  [ RESTORE DEFAULTS ]            [ APPLY ]    [ CLOSE (X) ]|          |
|          +------------------------------------------------------------+          |
|                                                                                  |
+----------------------------------------------------------------------------------+

2. Save / Load Game PortalContext: Triggered from Title Screen ([Continue]) or System Menu ([Save Game]).Layout: Vertical scrollable list of slots with metadata.

+----------------------------------------------------------------------------------+
|  BACKGROUND LAYER: [ DIMMED / BLURRED DASHBOARD ]                                |
|                                                                                  |
|          +------------------------------------------------------------+          |
|          |  CHRONICLE ARCHIVES (LOAD GAME)                            |          |
|          +------------------------------------------------------------+          |
|          |                                                            |          |
|          |  [ SLOT 01 ]  AUTO-SAVE                                    |          |
|          |  Lvl 12 Rogue | The Whispering Woods (Unsafe)              |          |
|          |  Phase: Night (13/15) | Date: 12th of Harvest              |          |
|          |  --------------------------------------------------------  |          |
|          |                                                            |          |
|          |  [ SLOT 02 ]  MANUAL SAVE                                  |          |
|          |  Lvl 11 Rogue | Manor Base: Sanctuary                    |          |
|          |  Phase: Morning (1/15) | Date: 10th of Harvest             |          |
|          |  --------------------------------------------------------  |          |
|          |                                                            |          |
|          |  [ SLOT 03 ]  EMPTY RECORD                                 |          |
|          |  [ -- Create New Record -- ]                               |          |
|          |                                                            |          |
|          +------------------------------------------------------------+          |
|          |  [ DELETE RECORD ]               [ LOAD ]     [ CLOSE (X) ]|          |
|          +------------------------------------------------------------+          |
|                                                                                  |
+----------------------------------------------------------------------------------+

3. Expanded History Log OverlayContext: Triggered by clicking the bottom-right "Context Context Log" in any view.Layout: Full-screen overlay to read past dialogue or combat logs.

+----------------------------------------------------------------------------------+
|  BACKGROUND LAYER: [ HEAVY OPAQUE OVERLAY ]                                      |
|                                                                                  |
|  +----------------------------------------------------------------------------+  |
|  |  SESSION NARRATIVE HISTORY                                    [ CLOSE (X) ]|  |
|  +----------------------------------------------------------------------------+  |
|  | [12:45] SYSTEM: Game Saved successfully.                                   |  |
|  | [12:42] COMBAT: Vespera casts 'Shadow Strike' on Goblin A for 24 DMG.      |  |
|  | [12:42] COMBAT: Goblin A is defeated.                                      |  |
|  | [12:41] LYRA: "Watch your left flank, they are circling us!"               |  |
|  | [12:40] EXPLORATION: You stepped into the Ruins of Solitude.               |  |
|  | [12:38] INTIMACY: Vespera's resistance drops to Tier 1.                    |  |
|  | [12:38] INTIMACY: "Don't stop now..." she whispers, Arousal +15.           |  |
|  | [12:35] DIALOGUE: You offered 500 Gold to the Merchant.                    |  |
|  |                                                                            |  |
|  |  ( Scroller Bar )                                                          |  |
|  +----------------------------------------------------------------------------+  |
|  |  [ FILTER: ALL ]   [ FILTER: COMBAT ]   [ FILTER: DIALOGUE ]               |  |
|  +----------------------------------------------------------------------------+  |
|                                                                                  |
+----------------------------------------------------------------------------------+

4. Combat Victory / Loot Claim OverlayContext: Appears instantly over the Combat View upon winning a battle.Layout: Central reward box.

+----------------------------------------------------------------------------------+
|  BACKGROUND LAYER: [ DIMMED COMBAT VIEW ]                                        |
|                                                                                  |
|          +------------------------------------------------------------+          |
|          |  VICTORY ACHIEVED                                          |          |
|          +------------------------------------------------------------+          |
|          |  EXP GAINED:  1,250 XP  (Level Up!)                        |          |
|          |  GOLD FOUND:  450g                                         |          |
|          |                                                            |          |
|          |  LOOT ACQUIRED:                                            |          |
|          |  +---+  +---+  +---+  +---+                                |          |
|          |  |Icon| |Icon| |Icon| |Icon|                               |          |
|          |  | x1 | | x3 | | x1 | | x5 |                               |          |
|          |  +---+  +---+  +---+  +---+                                |          |
|          |  Iron   Heal   Wolf   Scrap                                |          |
|          |  Swrd   Potn   Pelt   Metal                                |          |
|          |                                                            |          |
|          +------------------------------------------------------------+          |
|          |  [ DISCARD ALL ]                 [ TAKE ALL & RETURN ]     |          |
|          +------------------------------------------------------------+          |
|                                                                                  |
+----------------------------------------------------------------------------------+

5. Inventory Split / Quantity SelectorContext: Triggered when clicking [Sell Stack] or [Drop Item] on a stack > 1.Layout: Small centered popup.

+----------------------------------------------------------------------------------+
|  BACKGROUND LAYER: [ DIMMED INVENTORY VIEW ]                                     |
|                                                                                  |
|               +----------------------------------------+                         |
|               |  SELECT QUANTITY                       |                         |
|               +----------------------------------------+                         |
|               |  Item: Lesser Healing Potion           |                         |
|               |  Total Available: 5                    |                         |
|               |                                        |                         |
|               |       [ < ]    03    [ > ]             |                         |
|               |                                        |                         |
|               |  Action: Sell for 45g                  |                         |
|               +----------------------------------------+                         |
|               |  [ CANCEL ]             [ CONFIRM ]    |                         |
|               +----------------------------------------+                         |
|                                                                                  |
+----------------------------------------------------------------------------------+

6. About / Credits ModalContext: Triggered from Title Screen ([About]).Layout: Simple text scrolling modal.

+----------------------------------------------------------------------------------+
|  BACKGROUND LAYER: [ DIMMED TITLE SCREEN ]                                       |
|                                                                                  |
|          +------------------------------------------------------------+          |
|          |  CRESTFALLEN VAULT - v0.1.4                                |          |
|          +------------------------------------------------------------+          |
|          |  DESIGN & DEVELOPMENT                                      |          |
|          |  Lead Developer: [Your Name]                               |          |
|          |  Narrative Design: [Name]                                  |          |
|          |                                                            |          |
|          |  LIBRARIES USED                                            |          |
|          |  - React 18                                                |          |
|          |  - Tailwind CSS                                            |          |
|          |  - tRPC / Zustand                                          |          |
|          |                                                            |          |
|          |  LICENSE                                                   |          |
|          |  MIT License @ 2024                                        |          |
|          |  Warning: This game contains mature themes.                |          |
|          +------------------------------------------------------------+          |
|          |                                              [ CLOSE (X) ] |          |
|          +------------------------------------------------------------+          |
|                                                                                  |
+----------------------------------------------------------------------------------+

