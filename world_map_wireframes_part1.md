# OJISAN-IN-ANOTHER-WORLD — ASCII MAP WIREFRAMES
**Version**: 1.0 | **Coverage**: Prologue + Ch 1–10 | **Total Maps**: 95
**Safe:Unsafe Ratio**: 2:7 (27 safe maps / 68 unsafe maps)

---

## LEGEND

```
SYMBOL    MEANING
------    -------
[ ]       Interactive point / named object / NPC anchor
=====     Road / corridor / main path
-----     Secondary path / indoor wall
~~~~~     Water / flooded area
#####     Impassable wall / cliff / solid barrier
^v<>      Directional travel exits
(!)       Danger zone / monster spawn node
(?)       Hidden loot / secret area
(*)       Aether node / Siphon shrine
(S)       SAFE zone (no encounter roll)
(U)       UNSAFE zone (encounter roll active)
(B)       Boss anchor point
[DOOR]    Transition point between maps
[GATE]    Locked gate / requires key or quest
[EXIT]    Region exit / overworld transition
```

---

## SAFETY CLASSIFICATION REFERENCE

```
SAFE  (S) — No encounter roll, rest allowed, merchants accessible
SEMI  (~) — Encounter possible on specific tiles only (marked !)
UNSAFE(U) — Full encounter roll on movement, no rest
BOSS  (B) — Boss room; one-time or daily-respawn encounter
```

---
---

# WORLD OVERVIEW MAP

```
+===============================================================================+
|                   AETHERIA — CONTINENTAL OVERVIEW                              |
|                   (Overworld Point-to-Point Navigation)                        |
+===============================================================================+
|                                                                                |
|    [NORTH]  THE FROZEN REACHES  (Ch 7)                                         |
|    /~~~~~~~~~ FROSTPEAK RANGES ~~~~~~~~~~\                                     |
|   /  (!)   (!)    [IRON-SPIRE CITADEL]   \                                    |
|  /   (!)   (!)  (!)   (!)    (!)          \                                   |
|  |                                         |                                  |
|  |   [BLACK SITE VAULT 09]  (B)            |                                  |
|   \            |                          /                                   |
|    \===========+==========================/                                    |
|               ||                                                               |
|    [TATTOOED  ||   [IMPERIAL BASIN]  (Ch 8-10)                                 |
|    WASTES]    ||   /~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\                        |
|   (Ch 4)      ||  / [IMPERIAL CITY OF AETHERIA]  (B)  \                       |
|   (!)  (!)    || /   [HIGH BASILICA]  [ROYAL PALACE]   |                      |
|   (!)  (B)    ||/    [SIPHON ENGINE COMPLEX]  [SLUMS]  |                      |
|               ||     [LOWER MARKETS]  [HIGH COURT]     |                      |
|   [SEVERED    ||\                                      /                       |
|   CAMP]       || \=================================== /                        |
|               ||                ||                                             |
|   [BONES      \/      [GRAND ARCHDUCHY]  (Ch 5)                               |
|   CANYON]     /\      [CHATEAU VALERIUS] (B)                                   |
|              /  \     [GRAND ARENA]  [ROYAL VINEYARD]                          |
|             /    \    [NOBLE ESTATES]  (!)                                     |
|   [LEY-LINE||     \=================                                           |
|   RIFTS]   ||                   ||                                             |
|   (Ch 6)   ||    [SACRED PALATINATE]  (Ch 3)                                  |
|   (!)  (B) ||    [LUCUMINA SANCTUARY CITY]  (B)                               |
|   (!)  (!) ||    [CATHEDRAL]  [PILGRIM PASS]                                   |
|            ||                   ||                                             |
|   [IRON    \/         [KAELEN'S CROSSING]  (Ch 1) ◄═══ [OAKHAVEN] (Prologue) |
|   COAST]   /\         [FRONTIER VALLEY HUB]                                    |
|   (Ch 2)  /  \                  ||                                             |
|   (!)     |  |                  ||                                             |
|   PORT    |  |        [SOUTH GATE ROAD] ══> [OUTSKIRT TRADE ROAD]             |
|   AETHELGARD  |                                                                |
|            |  |                                                                |
|   [BRINE   |__|                                                                |
|   GROTTOES]                                                                    |
|   (B)  (!)                                                                     |
|                                                                                |
|  === OVERWORLD ROUTES (Travel Cost in Phases) ===                              |
|  Oakhaven -> Kaelen's Crossing      : 1 phase  (SAFE road)                    |
|  Kaelen's -> Iron Coast             : 3 phases (SEMI — bandit patrols)         |
|  Kaelen's -> Sacred Palatinate      : 4 phases (UNSAFE — Church patrols)       |
|  Iron Coast -> Tattooed Wastes      : 5 phases (UNSAFE — harpy cliffs)         |
|  Sacred Palatinate -> Grand Archduchy: 3 phases (SEMI — noble guards)           |
|  Tattooed Wastes -> Ley-Line Rifts  : 4 phases (UNSAFE — monsters)             |
|  Ley-Line Rifts -> Frozen Reaches   : 5 phases (UNSAFE — blizzard + beasts)    |
|  Grand Archduchy -> Imperial Basin  : 2 phases (SEMI — checkpoint patrols)     |
|  Frozen Reaches -> Imperial Basin   : 3 phases (UNSAFE — Black-Ops strikers)   |
|  Imperial Basin -> High Basilica    : 1 phase  (BOSS APPROACH — locked)        |
+===============================================================================+
```

---
---

# REGION 0: OAKHAVEN HOMESTEAD (Prologue)
**Safety**: SAFE interior / UNSAFE outskirts | **Chapter**: Prologue

---

## MAP 0.0 — OAKHAVEN REGION OVERVIEW (S)

```
+========================================================================================+
|  OAKHAVEN HOMESTEAD REGION — PROLOGUE OVERVIEW                    (S) SAFE CORE       |
+========================================================================================+
|                                                                                        |
|  [NORTH] WHISPERING RIDGE & NORTHERN WOODLAND BORDER                                  |
|  ########  Map 0.5 — Woodland / Quarry (UNSAFE outskirts)  ########                   |
|        (!)  [WOODS-1]  [WOODS-2]  [QUARRY]  [CRYSTAL]  (!)                            |
|        (!)                (B) Timber-Stalker              (!)                          |
|  ##########################################################                            |
|              |                                  |                                      |
|              v                                  v                                      |
|  +------------------------------+    +---------------------------+                     |
|  |  Map 0.3                    |    |  Map 0.1                  |                     |
|  |  BARN INTERIOR   (S)        |    |  WHEAT FIELDS  (S/U edge) |                     |
|  |  [GRAIN] [FORGE] [CELLAR]   |    |  [AWAKEN] [TEND-1&2]     |                     |
|  +------------------------------+    |  (!) EAST EDGE           |                     |
|              |                       +---------------------------+                     |
|              |                                  |                                      |
|              v                                  v                                      |
|  +============================ CENTRAL FARMYARD ============================+           |
|  |   Map 0.4 — FARMYARD GROUNDS                         (S)                |           |
|  |                                                                          |           |
|  |  [NW] HERB GARDEN [GARDEN]  |  [NE] BARN ENTRANCE [BARN]                |           |
|  |  [WELL] Freshwater           |                                           |           |
|  |  -------------------------  +  ----------------------------------------  |           |
|  |  [SW] PUMP & WARD STONE     |  [SE] LIVESTOCK PASTURE [PASTURE]         |           |
|  |  [PUMP] [WARD]              |  (!) Brambler spawns  (B) Thornhide       |           |
|  +===========================================================================+           |
|              |                                                                          |
|              v                                                                          |
|  +----------------------------+         +--------------------------------+             |
|  | Map 0.2 — COTTAGE (S)     |         | Map 0.6 — GATE & ROAD (S/U)   |             |
|  | [HEARTH] [TABLE] [BED]    |         | [GATE] [SIPHON POST]           |             |
|  | (Quest 0.2 dialogue hub)  |         | [SOUTH ROAD] -> Overworld       |             |
|  +----------------------------+         +--------------------------------+             |
|                                                                                        |
|  [SOUTH] OUTSKIRT TRADE ROAD ===========> [EXIT] TO KAELEN'S CROSSING                 |
+========================================================================================+
```

---

## MAP 0.1 — OAKHAVEN WHEAT FIELDS (S/U edge)

```
+----------------------------------------------------------------------+
|  OAKHAVEN WHEAT FIELDS — PLAYER AWAKENING ZONE                       |
|  SAFETY: (S) core / (U) eastern and northern edges                   |
+----------------------------------------------------------------------+
|  [N] ####### WOODLAND BORDER (UNSAFE — logging trail) ####### [N]    |
|      (!)  (!) Crystalline Vipers spawn edge  (!)  (!)                |
|  ####################################################################|
|                                                                      |
|  +------------------------------------------------------------------+|
|  |  EASTERN WHEAT CANOPY                              (S)           ||
|  |                                                                  ||
|  |   [TEND-1] Aetheric Soil Tendril (glow)                         ||
|  |         \                                                        ||
|  |          +==========> [AWAKEN] ★ PLAYER SPAWN (Quest 0.1)       ||
|  |                       (Aetheric pulse visible, architect's eye)  ||
|  |          +==========> [TEND-2] Atmospheric Tendril              ||
|  |         /                                                        ||
|  |   [WHEAT ROW 1] [WHEAT ROW 2] [WHEAT ROW 3]                    ||
|  |   [WHEAT ROW 4] [WHEAT ROW 5] [WHEAT ROW 6]                    ||
|  |                                                                  ||
|  |   [TEND-3] Soil Tendril (NE corner — hidden loot?)              ||
|  |                                                                  ||
|  |   (?) Hidden: [BURIED AETHER SHARD] beneath wheat row 4        ||
|  +------------------------------------------------------------------+|
|                                |                                     |
|                                | Dirt Foot-Trail                     |
|                                v                                     |
|  [W] <============= DIRT FARM ROAD ===================> [E]          |
|       To Barn / Cottage               To Outskirts (UNSAFE)         |
|                                                                      |
|  (!) [EAST EDGE] Aether-Brambler Burrow (Quest 0.5 overflow)        |
|  (!) [SOUTH EDGE] Pasture fence — Brambler incursion point          |
|                                                                      |
|  [S] OUTER PASTURE & LIVESTOCK FENCE LINE (Map 0.4 south edge)       |
+----------------------------------------------------------------------+
```

---

## MAP 0.2 — OAKHAVEN COTTAGE INTERIOR (S)

```
+----------------------------------------------------------------------+
|  OAKHAVEN COTTAGE — INTERIOR FLOOR PLAN                              |
|  SAFETY: (S) FULLY SAFE — No encounters                              |
+----------------------------------------------------------------------+
|  [N WALL] ~~~ WINDOW OVERLOOKING HERB GARDEN ~~~                     |
|                                                                      |
|  +-----------------------------+  +--------------------------------+ |
|  | KITCHEN & HEARTH (S)        |  | BEDROOM / REST CHAMBER  (S)   | |
|  |                             |  |                                | |
|  |  [HEARTH] Stone Fireplace   |  |  [BED-1] ★ Player Rest Cot    | |
|  |    (Quest R-2 tonic brew)   |  |    (HP/MP restore, save point) | |
|  |  [POT]   Soup cauldron      |  |  [BED-2] Martha & Goran's Bed  | |
|  |  [SHELF] Ingredient jars    |  |  [CHEST] Wardrobe (loot)       | |
|  |  [COUNTER] Prep table       |  |  [WINDOW] Garden view          | |
|  |  [MORTAR] Herb grinding     |  |  [LANTERN] Bedside light       | |
|  |                             |  |                                | |
|  +------------|----------------+  +---------|----------------------+ |
|               |  (arch door)                | (arch door)            |
|               v                             v                        |
|  +--------------------------------------------------------------------+
|  |  MAIN DINING HALL / ENTRANCE ROOM                     (S)         |
|  |                                                                    |
|  |   +----------------------------------------+                      |
|  |   | [TABLE] HEAVY OAK KITCHEN TABLE   ★    |                      |
|  |   | (Quest 0.2 world lore dialogue hub)     |                      |
|  |   | [CHAIR-1] Martha's seat                 |                      |
|  |   | [CHAIR-2] Goran's seat (sharpening)     |                      |
|  |   | [CHAIR-3] Player seat                   |                      |
|  |   +----------------------------------------+                      |
|  |                                                                    |
|  |   [SHELF] Regional maps & parish notices                          |
|  |   [RACK] Goran's spare tools (pitchfork, hoe)                     |
|  |   [RUG] Hand-woven floor covering                                 |
|  |                                                                    |
|  +--------------------------------------------------------------------+
|                             |                                         |
|                     [DOOR] MAIN ENTRANCE                              |
|                             v                                         |
|  [S] FRONT YARD & COBBLE WALKWAY (Map 0.4 north edge)                |
+----------------------------------------------------------------------+
```

---

## MAP 0.3 — OAKHAVEN BARN INTERIOR (S)

```
+----------------------------------------------------------------------+
|  OAKHAVEN BARN INTERIOR                                              |
|  SAFETY: (S) interior / (!) lower stalls if bramblers breach fence  |
+----------------------------------------------------------------------+
|  [N] REAR HAYLOFT & GRAIN ELEVATOR                                   |
|       [LADDER] Up to upper loft                                      |
|                                                                      |
|  +-----------------------------+  +--------------------------------+ |
|  | GRAIN SACK STORAGE     (S)  |  | FORGE & TOOL WORKSHOP  (S)   | |
|  |                             |  |                                | |
|  |  [GRAIN-1] Wheat sack pile  |  |  [ANVIL] Iron Anvil           | |
|  |    (Quest R-1 hauling)      |  |  [FORGE] Fire pit forge        | |
|  |  [GRAIN-2] Barley sack      |  |  [TOOLS] Scythes / axes       | |
|  |  [SCALE] Merchant scale     |  |  [LUMBER] Timber rack         | |
|  |  [ROPE] Hemp coil           |  |  [BLUEPRINT] Wall schematic   | |
|  |                             |  |  (?) Hidden key in lumber rack | |
|  +------------|----------------+  +---------|----------------------+ |
|               |                             |                        |
|               v                             v                        |
|  +--------------------------------------------------------------------+
|  |  CENTRAL WAGON BAY & TACK FLOOR                           (S)     |
|  |                                                                    |
|  |   [WAGON] Old wooden farm cart                                    |
|  |   [HARNESS] Horse tack & leather straps                           |
|  |   [LANTERN] Hanging iron lantern                                  |
|  |                                                                    |
|  |           [CELLAR TRAPDOOR] ★ (Quest supply cache below)          |
|  |              v                                                     |
|  |           [CELLAR] Reserve vault — grain, medicine, gold          |
|  |                                                                    |
|  |   [HORSE STALL-1]  [HORSE STALL-2]  [EMPTY STALL]               |
|  |   (!) If brambler incursion: stalls become combat zone            |
|  +--------------------------------------------------------------------+
|                             |                                         |
|                [DOUBLE BARN DOORS — heavy oak]                        |
|                             v                                         |
|  [S] OAKHAVEN FARMYARD DRIVEWAY (Map 0.4 northeast corner)           |
+----------------------------------------------------------------------+
```

---

## MAP 0.4 — OAKHAVEN FARMYARD & GROUNDS (S/U)

```
+----------------------------------------------------------------------+
|  OAKHAVEN FARMYARD — MERGED SITE MAP                                 |
|  SAFETY: (S) garden/well/pump zones / (U!) pasture edge             |
+----------------------------------------------------------------------+
|  [N] COTTAGE ENTRANCE & KITCHEN DOOR                                 |
|                         |                                            |
|                         v                                            |
|  +----------------------------------+  +---------------------------+ |
|  | NW — HERB GARDEN & WELL  (S)    |  | NE — BARN APPROACH  (S)  | |
|  |                                  |  |                           | |
|  |  [GARDEN-1] Silver-Leaf Beds ★  |  |  [BARN] Double oak doors  | |
|  |    (Quest 0.4 + Quest R-2)      |  |  [TROUGH] Water trough    | |
|  |  [GARDEN-2] Sun-Root Patch      |  |  [HITCHING POST]          | |
|  |  [GARDEN-3] Wild Berry Shrub    |  |  [FEED BIN] Grain store   | |
|  |  [WELL] ★ Freshwater draw well  |  |                           | |
|  |    (Quest 0.4 — draw water)     |  |                           | |
|  |  [SCARECROW] Field marker       |  |                           | |
|  +------------------|--------------+  +-------------|-------------+ |
|                     |                               |                |
|          [CENTRAL COBBLE FARM WALKWAY]               |                |
|                     |                               |                |
|  +------------------|--------------+  +-------------|-------------+ |
|  | SW — PUMP & WARD STONE  (S)     |  | SE — LIVESTOCK PASTURE    | |
|  |                                  |  |  SAFETY: (U!) active zone | |
|  |  [PUMP] ★ Wooden irrigation     |  |                           | |
|  |    pump (Quest 0.3 repair)      |  |  [FENCE] Wooden palisade  | |
|  |  [GEAR] Exposed iron gear       |  |  [SHEEP-1..5] Sheep flock | |
|  |  [PIPE] Water channel to well   |  |  (!) Aether-Brambler Nest | |
|  |  [WARD] ★ Aether ward stone     |  |  (!) Brambler incursion   | |
|  |    (Tithe compliance marker)    |  |  (B) Thornhide Boar boss  | |
|  |  [PRYBAR] Iron pry bar (tool)   |  |  [BREAK] Fence breach pt  | |
|  |  [OIL CAN] Spindle lubricant   |  |    (Quest 0.5 arena)      | |
|  +----------------------------------+  +---------------------------+ |
|                         |                                            |
|                         v                                            |
|  [S] OAKHAVEN BOUNDARY GATE & OUTSKIRT ROAD (Map 0.6)               |
+----------------------------------------------------------------------+
```

---

## MAP 0.5 — NORTHERN WOODLAND & GRANITE QUARRY (U)

```
+----------------------------------------------------------------------+
|  OAKHAVEN NORTHERN WOODLAND BORDER & QUARRY                          |
|  SAFETY: (U) UNSAFE — monster roam, gathering risk                  |
+----------------------------------------------------------------------+
|  [N] ##### DEEP WILDERNESS — LOCKED IN PROLOGUE ##### [N]           |
|      (!) (!) (!) MONSTER ZONE — NO ENTRY (!) (!) (!)                |
|  ##############################################################      |
|                                                                      |
|  +-----------------------------------------------------------------+ |
|  | OAK FORESTRY WOODLOT                                   (U)     | |
|  |                                                                 | |
|  |  [WOODS-1] ★ Ancient Oak (timber harvest node)                  | |
|  |    (Quest R-1 — logging)                                        | |
|  |  [WOODS-2] ★ Hardwood grove                                     | |
|  |  (!) Crystalline Viper coiled in roots                          | |
|  |  [STUMP] Old logging stump (rest point — unsafe)               | |
|  |  (!) Aether-Brambler burrow near roots                         | |
|  |  (?) [HIDDEN LOOT] Abandoned woodcutter's pack                 | |
|  +-----------------------------------------------------------------+ |
|                               |                                      |
|              [FOREST LOGGING TRAIL — narrow, overgrown]              |
|               (!) Random ambush chance on trail                      |
|                               |                                      |
|  +-----------------------------------------------------------------+ |
|  | GRANITE CLIFF QUARRY & LEY-NODE OUTCROP              (U)       | |
|  |                                                                 | |
|  |  [QUARRY-1] ★ Main granite face (mining node — Quest R-1)       | |
|  |  [QUARRY-2] Smaller granite seam                                | |
|  |  [PICKAXE] Abandoned pickaxe (loot / tool)                     | |
|  |  [CRYSTAL-1] ★ Aether crystal cluster (Quest R-4 harvest)       | |
|  |  [CRYSTAL-2] Smaller cluster                                    | |
|  |  (*) [LEY-NODE VENT] Unstable aether vent — do NOT stand on    | |
|  |  (!) Mutated Crystal Beetles guard ore nodes                   | |
|  |  (B) [TIMBER-STALKER ENT] Boss spawn — forest clearing edge    | |
|  +-----------------------------------------------------------------+ |
|                               |                                      |
|                               v                                      |
|  [S] RETURN TRAIL =======> OAKHAVEN FARMYARD (Map 0.4 north edge)    |
+----------------------------------------------------------------------+
MONSTER ROAM: Crystalline Vipers (lv2), Aether-Bramblers (lv3),
              Crystal Beetles (lv4), Timber-Stalker Ent (lv10 boss)
```

---

## MAP 0.6 — OAKHAVEN GATE & OUTSKIRT TRADE ROAD (S/U)

```
+----------------------------------------------------------------------+
|  OAKHAVEN BOUNDARY GATE & OUTSKIRT ROAD                              |
|  SAFETY: (S) Gate interior / (U) road beyond gate                  |
+----------------------------------------------------------------------+
|  [N] OAKHAVEN FARMYARD (Map 0.4)                                     |
|                         |                                            |
|                         v                                            |
|  +-----------------------------------------------------------------+ |
|  | OAKHAVEN BOUNDARY PALISADE & OAK GATE                  (S)     | |
|  |                                                                 | |
|  |  [GATE] ★ Heavy Oak Gate Posts (Quest 0.7 departure point)     | |
|  |    (Martha farewell scene + item gifts)                         | |
|  |  [GUARD HOUSE] Small palisade booth (Goran's perch)            | |
|  |  [FENCE-L] Left palisade wing                                   | |
|  |  [FENCE-R] Right palisade wing                                  | |
|  +-----------------------------------------------------------------+ |
|                         |                                            |
|                         v                                            |
|  +-----------------------------------------------------------------+ |
|  | FRONT INSPECTION GROUND                                (S)     | |
|  |                                                                 | |
|  |  [WAGON STAND] ★ Church Tithe Collector Mark's wagon spot      | |
|  |    (Quest 0.6 — Collector's Knock confrontation site)           | |
|  |  [SIPHON POST] Brass Siphon Collection device                  | |
|  |  [LEDGER TABLE] Collector's writing desk                        | |
|  |  [SEARCH ZONE] Martha / Goran standing positions               | |
|  +-----------------------------------------------------------------+ |
|                         |                                            |
|                         v                                            |
|  [W] <=== OUTSKIRT TRADE ROAD ===> [E] (UNSAFE beyond this point)   |
|   To Kaelen's Crossing (3 phases)   To Wilderness wilds (UNSAFE)    |
|   (!) Bandit patrols on road        (!) Aether Beast ambush risk    |
|   (!) Church Tithe Checkpoint        (no exit marker)               |
|                                                                      |
+----------------------------------------------------------------------+
MONSTER ROAM (road only): Bandit Deserters (lv3-5), Church Wardens (lv4)
```

---
---

# REGION 1: KAELEN'S CROSSING (Chapter 1)
**Safety**: SAFE district core / UNSAFE outskirts, sewers, wilderness
**Hub Type**: Frontier Boomtown | **Chapter**: 1

---

## MAP 1.0 — KAELEN'S CROSSING DISTRICT OVERVIEW

```
+========================================================================================+
|  KAELEN'S CROSSING — CHAPTER 1 DISTRICT OVERVIEW                                      |
+========================================================================================+
|                                                                                        |
|  [N] ########## HIGHWATCH RIDGE & WHISPERING RIDGE (UNSAFE) ###########               |
|      (!) (!) Bandit camp, rogue Inquisitors, wandering beasts  (!) (!)                |
|  Map 1.9 [WHISPERING RIDGE AETHER MINE]  Map 1.10 [ABANDONED OUTPOST]                |
|  ##########################################################################            |
|                            |                  |                                        |
|                            v                  v                                        |
|  +------------------------+   +-------------------------------------------+           |
|  | Map 1.7                |   | UPPER DISTRICT                            |           |
|  | MAGISTRATE MANOR (S/U) |   | Map 1.8 [HIGHWATCH ESTATE]  (U/B)         |           |
|  +---------|---------------+   +----------------------|--------------------+           |
|            |                                          |                               |
|            v                                          v                               |
|  +======================  TOWN CORE (S/~)  ==================================+        |
|  |  Map 1.2 CENTRAL MARKET PLAZA & SIPHON SPIRE                              |        |
|  |  [SPIRE]  [STALLS]  [SMITHY]  [ALCHEMIST]  [GOODS]  [FOUNTAIN]  [BOARD]  |        |
|  +================================|==========================================+        |
|        |            |             |              |             |                      |
|        v            v             v              v             v                      |
|  Map 1.3      Map 1.4       Map 1.1         Map 1.11     Map 1.12                   |
|  RUSTY ANCHOR  THE SHALLOWS  SOUTH GATE     CHURCH HQ    BLACKSMITH                  |
|  TAVERN (S)    SLUMS (~)     CHECKPOINT(~)  (*)(S)        WORKSHOP(S)               |
|        |            |             |                                                   |
|        |            v             v                                                   |
|        |    Map 1.4a CONDUIT ALLEY (U)                                               |
|        |            |                                                                 |
|        |            v                                                                 |
|        |    Map 1.5 FLOODED SEWER WARRENS (U!)                                       |
|        |            |                                                                 |
|        |            v                                                                 |
|        |    Map 1.6 SECRET ARCHIVE VAULT  (U/B)                                      |
|        |                                                                              |
|        v                                                                              |
|  [EXIT] SOUTH GATE ROAD -> OUTSKIRT TRADE ROAD -> OAKHAVEN (Map 0.6)                 |
|                                                                                       |
|  [EXIT W] IRON COAST HIGHWAY (Ch 2) — 3 phase journey                               |
|  [EXIT N] HIGHWATCH RIDGE TRAIL -> WILDERNESS (UNSAFE Ch 1 outskirts)                |
+========================================================================================+
MONSTER ROAM (outskirts/sewers): Sewer Rats(lv3), Rot-Stalkers(lv5),
Bandit Deserters(lv4-6), Church Wardens(lv5-7), Aether Hounds(lv6),
Highwatch Sentinels(lv7-8), Rogue Inquisitor(lv9)
```

---

## MAP 1.1 — SOUTH GATE TITHE CHECKPOINT (~/U)

```
+----------------------------------------------------------------------+
|  SOUTH GATE TITHE CHECKPOINT & GUARDHOUSE                            |
|  SAFETY: (~) checkpoint plaza / (U) cell area if hostile triggered  |
+----------------------------------------------------------------------+
|  [N] TOWN MARKET DISTRICT (Cobblestone Main Street)                  |
|                         ^                                            |
|                         |                                            |
|  +---------------------------+  +--------------------------------+   |
|  | GUARDHOUSE BARRACKS  (~)  |  | HOLDING CELL              (U) |   |
|  |                           |  |                                |   |
|  |  [BUNK-1] Guard bunk      |  |  [BARS] Iron cell bars        |   |
|  |  [BUNK-2] Guard bunk      |  |  [BENCH] Stone prisoner bench |   |
|  |  [ARMORY] Weapons rack    |  |  [DEBTOR-1] Stage1 tattooed   |   |
|  |  [DESK] Officer paperwork |  |  [DEBTOR-2] Crying woman      |   |
|  |  [KEY RING] Cell key      |  |  (?) [LOOSE BRICK] hidden key |   |
|  |  [OFFICER] Guard Torren   |  |                                |   |
|  +-----------|---------------+  +------------|-------------------+   |
|              | door                          | door                  |
|              v                               v                       |
|  [W] <===== INSPECTION PLAZA (!) SEMI-UNSAFE ==================> [E] |
|              |                                                       |
|              |       +----------------------------+                  |
|              |       |  BRASS SIPHON COLLECTOR    |                  |
|              |       |  [GAUGE] Needle readout    |                  |
|              |       |  [FUNNEL] Input crystal    |                  |
|              |       |  [LEDGER] Queue registry   |                  |
|              |       +----------------------------+                  |
|              |                    ^                                  |
|              |                    | Queue line (NPC citizens wait)   |
|              v                    |                                  |
|  +-----------------------------------------------------------------+ |
|  | IRON PORTCULLIS — [GUARD-1] [GUARD-2 TORREN] (lv5-7)          | |
|  | (!) Guards attack on Aether default attempt or illegal entry    | |
|  +-----------------------------------------------------------------+ |
|                              ^                                       |
|                              |                                       |
|  [S] OUTSKIRT TRADE ROAD (From Oakhaven / Kaelen outskirts)          |
+----------------------------------------------------------------------+
MONSTER ROAM: Church Wardens (lv5-7) guarding checkpoint
```

---

## MAP 1.2 — CENTRAL MARKET PLAZA & SIPHON SPIRE (S)

```
+----------------------------------------------------------------------+
|  CENTRAL MARKET PLAZA & CHURCH SIPHON SPIRE                          |
|  SAFETY: (S) — social hub, no random encounters                     |
+----------------------------------------------------------------------+
|  [N] UPPER DISTRICT ROAD ===> Magistrate's Manor (Map 1.7)           |
|                         ^                                            |
|                         |                                            |
|  +----------------------+--------------------------------------------+
|  |              CENTRAL MARKET PLAZA                         (S)     |
|  |                                                                    |
|  |  +----------------+  +---------------------------+  +----------+ |
|  |  | PRODUCE STALLS |  | CHURCH SIPHON SPIRE  (*)  |  | ALCHEMY  | |
|  |  | [STALL-1] Veg  |  | (Towering stone obelisk)  |  | & HERBS  | |
|  |  | [STALL-2] Meat |  | [MAIN VAULT] Gem input    |  | [TERESA] | |
|  |  | [MERCHANT] Lena|  | [QUEUE LINE] Citizens     |  | [SHELF]  | |
|  |  | (buy/sell food)|  | (*) Aether tithe station  |  | (buy med)| |
|  |  +----------------+  +-----|---------------------+  +----------+ |
|  |                            |                                      |
|  |  [W] <=== [SHALLOWS ROAD] Slums (Map 1.4)                        |
|  |                            |                                      |
|  |                 +----------v----------+                           |
|  |                 | TOWN BULLETIN BOARD |                           |
|  |                 | ★ Notice Board      |                           |
|  |                 | [BOUNTY-1] Rewards  |                           |
|  |                 | [NOTICE-2] Events   |                           |
|  |                 | [QUEST-3] Jobs      |                           |
|  |                 +---------------------+                           |
|  |                            |                                      |
|  |  +----------------+  +----+----------+  +---------------------+  |
|  |  | WEAPON SMITHY  |  | STONE FOUNTAIN|  | CLOTH & DRY GOODS   |  |
|  |  | [SMITH] Forge  |  | (S) rest zone |  | [MERCHANT] Vendors   |  |
|  |  | [RACK] Weapons |  | [BENCHES]     |  | [BOLTS] Fabric       |  |
|  |  | (buy/upgrade)  |  | [COINS]coins? |  | (buy/sell clothing)  |  |
|  |  +----------------+  +---------------+  +---------------------+  |
|  |                                                                    |
|  |  [E] ===> RUSTY ANCHOR TAVERN ALLEY (Map 1.3)                     |
|  +--------------------------------------------------------------------+
|                         |                                            |
|                         v                                            |
|  [S] SOUTH GATE TITHE CHECKPOINT (Map 1.1)                           |
+----------------------------------------------------------------------+
```

---

## MAP 1.3 — RUSTY ANCHOR TAVERN (S)

```
+----------------------------------------------------------------------+
|  THE RUSTY ANCHOR TAVERN & MERCENARY HUB                             |
|  SAFETY: (S) interior — (!) Standoff zone during Jax confrontation  |
+----------------------------------------------------------------------+
|  [N] STAIRS => UPPER GUEST FLOOR                                     |
|                         ^                                            |
|                         |                                            |
|  +--+---UPPER GUEST ROOMS (Rooms 1-6)---+--+                        |
|  | [ROOM-1] Basic cot room              |                            |
|  | [ROOM-2] Locked (occupied)           |                            |
|  | [ROOM-3] ★ Player room (when rented) |                            |
|  | [ROOM-4] [ROOM-5] [ROOM-6]          |                            |
|  |   (?) Loose floorboard in Room 5     |                            |
|  +-----------------------------------------+                        |
|                         |                                            |
|                         v                                            |
|  +--------------------------------------------------------------------+
|  |  MAIN TAPROOM & DINING HALL                              (S)      |
|  |                                                                    |
|  |  +--------------------+        +--------------------------+       |
|  |  | HEAVY WOODEN BAR   |        | VALERIA'S CORNER BOOTH ★ |       |
|  |  | [BARTENDER] Rusty  |        | (Quest 1.1 meet Valeria) |       |
|  |  | [TAPS] Ale faucets |        | [VALERIA] Merc captain   |       |
|  |  | [KEGS] Barrels     |        | [SQUAD-1] [SQUAD-2]      |       |
|  |  | [GLASSES] Mugs     |        | [MAP] Regional map spread|       |
|  |  | [CASH BOX] Gold    |        | [LEDGER] Merc contracts  |       |
|  |  +--------------------+        +--------------------------+       |
|  |          ^                                  ^                     |
|  |          |                                  |                     |
|  |          +======== CENTRAL STANDOFF ZONE ===+                     |
|  |                    (!) [JAX] Debt Contractor appears here          |
|  |                    (Quest 1.1 confrontation — combat option)       |
|  |                                                                    |
|  |  +--------------------+        +--------------------------+       |
|  |  | STONE FIREPLACE    |        | FRONTIER BOUNTY BOARD   |       |
|  |  | [HEARTH] Crackling |        | [BOARD] Job postings    |       |
|  |  | [MANTLE] Trophies  |        | [BOUNTY-1] Monster hunt |       |
|  |  | [BELLOWS] Air pump |        | [BOUNTY-2] Escort quest |       |
|  |  +--------------------+        +--------------------------+       |
|  |                                                                    |
|  |  [TABLE-1] Regular patrons   [TABLE-2] Gamblers (side quest hook)|
|  |  [TABLE-3] Hooded figure (NPC info broker — Ch 1 side quest)     |
|  +--------------------------------------------------------------------+
|                         |                                            |
|                 [MAIN ENTRANCE DOOR]                                 |
|                         v                                            |
|  [S] MARKET DISTRICT ALLEY (back route to Map 1.2 east edge)         |
+----------------------------------------------------------------------+
```

---

## MAP 1.4 — THE SHALLOWS (TOWN SLUMS) (~)

```
+----------------------------------------------------------------------+
|  THE SHALLOWS — TOWN SLUMS & CONDUIT ALLEY                          |
|  SAFETY: (~) semi-unsafe — (!) specific alley nodes dangerous       |
+----------------------------------------------------------------------+
|  [N] HIGHWATCH ESTATE ROAD (UNSAFE beyond)                           |
|                         ^                                            |
|                         |                                            |
|  +----------------------------------+  +---------------------------+ |
|  | TENEMENT BLOCK A          (~)    |  | TENEMENT BLOCK B  (~)    | |
|  |                                  |  |                           | |
|  |  [HUT-1] Refugee family          |  |  [HUT-4] Defaulted debtor| |
|  |  [HUT-2] Stage-1 tattooed woman  |  |  [HUT-5] Boarded shut    | |
|  |  [HUT-3] NPC information source  |  |  [HUT-6] Abandon shelter | |
|  |  [LAUNDRY] Clotheslines          |  |  (?) [LOOSE STONE] cache | |
|  +----------------------------------+  +---------------------------+ |
|                         |                                            |
|  <=========== CONDUIT ALLEYWAY (!!) ================================> |
|  [COPPER AETHER PIPE] exposed on wall =====> [DIVERTED PIPE] (U!)   |
|   (Quest 1.3 — trace the illegal diversion)                          |
|  (!) Guard patrol passes here every 2 in-game phases                 |
|                         |                                            |
|  +----------------------------------+  +---------------------------+ |
|  | SOUP KITCHEN & SHELTER   (S)     |  | SEWER ACCESS POINT  (U!) | |
|  |                                  |  |                           | |
|  |  [CAULDRON] Communal pot         |  |  [IRON GRATE] Sewer grate | |
|  |  [NPC] Volunteer cook            |  |  [LADDER] Iron rung ladder| |
|  |  [QUEUE] Refugees lining up      |  |  [ROPE] Lowering rope     | |
|  |  [CRATES] Food donation boxes    |  |  [SMELL] Foul odor marker | |
|  |  (S) Rest if disguised           |  |  ==> Map 1.5 below       | |
|  +----------------------------------+  +---------------------------+ |
|                                                                      |
|  [E] ===> CENTRAL MARKET PLAZA (Map 1.2 west edge)                   |
+----------------------------------------------------------------------+
MONSTER ROAM: Sewer Rats (lv3), Rot-Stalker patrol (lv5) in conduit alley
```

---

## MAP 1.5 — FLOODED SEWER WARRENS (U)

```
+----------------------------------------------------------------------+
|  FLOODED SEWER WARRENS & UNDERGROUND SANCTUARY                       |
|  SAFETY: (U) UNSAFE — active enemy roam throughout                  |
+----------------------------------------------------------------------+
|  [UP] IRON LADDER ===> SEWER GRATE (Map 1.4 southeast corner)        |
|                         ^                                            |
|                         |                                            |
|  +-----------------------------------------------------------------+ |
|  |  ENTRY CHANNEL — FLOODED APPROACH                      (U)     | |
|  |                                                                 | |
|  |  ~~~~~ [SHALLOW WATER] Aether-tainted sewer flow ~~~~~         | |
|  |  (!) Sewer Rat swarm ambush (lv3) — random trigger             | |
|  |  (!) Rot-Stalker patrol (lv5) — moves in 3-tile loops          | |
|  |  [MOSS LANTERNS] Glowing green wall sconces                    | |
|  |  [SLIME PATCH] Slows movement 1 tile                           | |
|  |  ~~~~~ continues ~~~~~ ~~~~~ ~~~~~ ~~~~~ ~~~~~                 | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v   SECONDARY BRANCH TUNNELS                        (U)     | |
|  |                                                                 | |
|  |  [TUNNEL-L] Collapsed dead end — (?) buried crate              | |
|  |  [TUNNEL-R] Loops to Archive Vault approach                    | |
|  |  (!) [SEWER-SERPENT] patrolling junction (lv6)                 | |
|  |  (!) [ROT-STALKER x2] blocking main path (lv5)                 | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v  SISTER TERESA'S UNDERGROUND SANCTUARY           (S)      | |
|  |       (safe once monsters cleared from outer tunnels)           | |
|  |                                                                 | |
|  |  +------------------------+   +------------------------------+  | |
|  |  | MEDICAL COTS           |   | TERESA'S HERBAL WORKBENCH   |  | |
|  |  | [COT-1] ★ Sick Boy     |   | ★ [TERESA] NPC (quest hub)  |  | |
|  |  |   (Quest 1.2 patient)  |   | [LANTERN] Oil lamp          |  | |
|  |  | [COT-2] Tattooed woman |   | [SALVES] Craft medicines    |  | |
|  |  | [COT-3] Unconscious    |   | [HERBS] Herb stockpile      |  | |
|  |  | [COT-4] Empty (player) |   | [NOTES] Aether Rot docs     |  | |
|  |  +------------------------+   +------------------------------+  | |
|  |                                                                 | |
|  |  [FOOD STORE] Emergency ration box                             | |
|  |  [WATER BARREL] Clean water (non-Aether tainted)               | |
|  |  [SECRET DOOR] => Collapsed Brick Passage => Map 1.6           | |
|  +-----------------------------------------------------------------+ |
+----------------------------------------------------------------------+
MONSTER ROAM: Sewer Rats(lv3), Rot-Stalkers(lv5), Sewer Serpent(lv6)
```

---

## MAP 1.6 — SECRET ARCHIVE VAULT (U/B)

```
+----------------------------------------------------------------------+
|  SECRET SEWER ARCHIVE VAULT — BEATRIX'S HIDEOUT                     |
|  SAFETY: (U) UNSAFE — ambush site / (B) Sergeant Vane boss          |
+----------------------------------------------------------------------+
|  [W] COLLAPSED BRICK PASSAGE (from Map 1.5 sanctuary)               |
|                         ^                                            |
|                         |                                            |
|  +-----------------------------------------------------------------+ |
|  |  ARCHIVE VAULT ENTRY CORRIDOR                          (U!)    | |
|  |                                                                 | |
|  |  [RUBBLE] Partial stone collapse (crouch to pass)              | |
|  |  [TORCH] Wall torch sconce (light source)                      | |
|  |  (!) TRIPWIRE — Beatrix's trap (disarmable with EXP-2.1)       | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v   MAIN ARCHIVE VAULT ROOM                         (U/B)   | |
|  |                                                                 | |
|  |  +-----------------------------------------------------------+  | |
|  |  | DOCUMENT SHELVES (east wall)                              |  | |
|  |  | [SHELF-1] Parish tithe records (years 1-5)               |  | |
|  |  | [SHELF-2] Citizen default logs (Quest 1.4 evidence)      |  | |
|  |  | [SHELF-3] Malakor signature documents ★                  |  | |
|  |  +-----------------------------------------------------------+  | |
|  |                                                                 | |
|  |  +------------------+         +----------------------------+   | |
|  |  | AMBUSH ENTRY     |         | BEATRIX'S AUDIT DESK  ★   |   | |
|  |  | DOOR (north)     |         | [BEATRIX] NPC + quest hub  |   | |
|  |  | (B) [SGT VANE]  |         | [LEDGERS] Fraud evidence   |   | |
|  |  |   Church boss   |         | [CIPHER] Encryption ring   |   | |
|  |  | (lv9 + 3 enfrcrs)|        | [OIL LAMP] Light source    |   | |
|  |  |   BOSS BATTLE   |         | (?) [HIDDEN COMPARTMENT]   |   | |
|  |  +------------------+         +----------------------------+   | |
|  |                                                                 | |
|  |  +-----------------------------------------------------------+  | |
|  |  | EMERGENCY ESCAPE TUNNEL (south wall)                      |  | |
|  |  | [IRON DOOR] Rusted hatch                                  |  | |
|  |  | ============> HIGHWATCH ESTATE OUTSKIRTS (Map 1.8 below)  |  | |
|  |  +-----------------------------------------------------------+  | |
|  +-----------------------------------------------------------------+ |
+----------------------------------------------------------------------+
MONSTER ROAM: Sergeant Vane (lv9 Boss), Church Enforcers (lv7 x3)
```

---

## MAP 1.7 — MAGISTRATE MALAKOR'S MANOR (S/U)

```
+----------------------------------------------------------------------+
|  MAGISTRATE MALAKOR'S ADMINISTRATIVE MANOR                           |
|  SAFETY: (S) front room if disguised / (U) when discovered          |
+----------------------------------------------------------------------+
|  [N] PRIVATE GARDEN & CARRIAGE HOUSE (!)                             |
|  ~~~ Garden paths (!) patrolling guards ~~~                          |
|                         ^                                            |
|                         |                                            |
|  +-----------------------------------------------------------------+ |
|  | PRIVATE GARDEN                                         (~)     | |
|  |  [HEDGE ROW-1] Topiary hedges (stealth cover)                  | |
|  |  [HEDGE ROW-2] Garden wall                                     | |
|  |  [FOUNTAIN] Decorative water feature                           | |
|  |  [CARRIAGE] Escape carriage & horse                            | |
|  |  (!) [GUARD-PATROL] 2 elite guards, 4-tile loop                | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v  MANOR GROUND FLOOR                              (~)      | |
|  |                                                                 | |
|  |  +--------------------+       +------------------------------+  | |
|  |  | PRIVATE FOYER      |       | MALAKOR'S PRIVATE STUDY  ★   |  | |
|  |  | [GUARD-1] Elite    |       | [MALAKOR] NPC boss          |  | |
|  |  | [GUARD-2] Elite    |       | [OAK DESK] Document station  |  | |
|  |  | [GRAND STAIRS]     |       | [PIPE] Diverted Aether line  |  | |
|  |  |  ^=> Upper manor   |       | [WALL SAFE] Hidden safe (?)  |  | |
|  |  | [COAT RACK] Disgu. |       | [LEDGER] Blackmail records   |  | |
|  |  +--------------------+       +------------------------------+  | |
|  |                                                                 | |
|  |  +-----------------------------------------------------------+  | |
|  |  | PRIVATE TREASURY VAULT (S basement — combat to unlock)    |  | |
|  |  | [CHEST-1] 52,400 Aether gems (stolen reserves)            |  | |
|  |  | [CHEST-2] Gold coin stockpile                             |  | |
|  |  | [CHEST-3] Blackmail letters (quest item)                  |  | |
|  |  | (!) [VAULT GOLEM] Mechanical guardian (lv8)               |  | |
|  |  +-----------------------------------------------------------+  | |
|  +-----------------------------------------------------------------+ |
|                         |                                            |
|                 [HEAVY OAK FRONT DOOR]                               |
|                         v                                            |
|  [S] UPPER DISTRICT ROAD (Map 1.2 north edge)                        |
+----------------------------------------------------------------------+
MONSTER ROAM: Elite Manor Guards (lv7-8), Vault Golem (lv8 mini-boss)
```

---

## MAP 1.8 — HIGHWATCH ESTATE & OUTSKIRTS (U)

```
+----------------------------------------------------------------------+
|  HIGHWATCH ESTATE RUINS & OUTSKIRTS                                  |
|  SAFETY: (U) UNSAFE — ruins are monster territory                   |
+----------------------------------------------------------------------+
|  [N] ##### DEEP WILDERNESS — BANDIT ENCAMPMENT ##### [N]            |
|      (!) (!) (!) Bandit Deserter camp (lv6-8)  (!) (!)              |
|      (B) [BANDIT CAPTAIN] Camp boss (lv10)                          |
|  ##############################################################      |
|                                                                      |
|  +-----------------------------------------------------------------+ |
|  | HIGHWATCH ESTATE RUINS                                 (U)     | |
|  |                                                                 | |
|  |  [RUINED WALL-1] Collapsed masonry (cover)                    | |
|  |  [RUINED WALL-2] Still-standing section (stealth approach)    | |
|  |  [OLD WELL] Dried-up well (? item inside)                     | |
|  |  (!) Rogue Inquisitor patrol (lv9)                            | |
|  |  (!) Aether Hound pack (lv6 x3)                               | |
|  |  [ESTATE DOOR] Bolted shut — lockpick or key                  | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v  HIGHWATCH ESTATE INTERIOR                        (U)     | |
|  |                                                                 | |
|  |  [TROPHY HALL] Old lord's hunting trophies (loot)             | |
|  |  [CELLAR] Underground wine cellar                             | |
|  |    -> Contains hidden passage to Archive Vault (Map 1.6)      | |
|  |  (!) Aether Hounds kenneled in cellar                         | |
|  |  [ARCHIVE HATCH] Connects to Map 1.6 escape tunnel            | |
|  +-----------------------------------------------------------------+ |
|                                                                      |
|  [S] ===> SHALLOWS NORTH EDGE / TOWN OUTSKIRTS (Map 1.4 north)       |
+----------------------------------------------------------------------+
MONSTER ROAM: Aether Hounds(lv6), Rogue Inquisitor(lv9), Bandit Deserters(lv6-8),
              Bandit Captain(lv10 boss)
```

---

## MAP 1.9 — WHISPERING RIDGE AETHER MINE (U/B)

```
+----------------------------------------------------------------------+
|  WHISPERING RIDGE — ABANDONED AETHER MINE                           |
|  SAFETY: (U) UNSAFE throughout — (B) Boss in deepest chamber        |
+----------------------------------------------------------------------+
|  [SURFACE] MINE HEAD & STAGING AREA                        (~)      |
|  +-----------------------------------------------------------------+ |
|  |  [MINE CART] Rusted iron cart (ride into main shaft)           | |
|  |  [WINCH] Lowering mechanism                                    | |
|  |  [NOTICE BOARD] Old warnings — "Aether surge risk"             | |
|  |  [TOOL SHED] Abandoned mining tools (pickaxe, lantern)        | |
|  |  (!) Crystalline Viper at mine mouth (lv5)                    | |
|  +----|------------------------------------------------------------+ |
|       | MAIN MINE SHAFT (descend)                                    |
|  +----|------------------------------------------------------------+ |
|  |    v  UPPER TUNNELS — LEVEL 1                          (U)     | |
|  |  [CRYSTAL VEIN-1] Aether crystal harvest ★                    | |
|  |  [CRYSTAL VEIN-2] Partially excavated                         | |
|  |  (!) Corrupted Mine Crawlers (lv5 x3)                         | |
|  |  (!) Aether Gas Pocket — triggers Poison AoE on step          | |
|  |  [SIDE SHAFT-L] Collapsed (? hidden chest inside)             | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v  LOWER TUNNELS — LEVEL 2                         (U)      | |
|  |  [CRYSTAL VEIN-3] Large cluster (high yield)                   | |
|  |  [UNDERGROUND SPRING] Aether-infused water                    | |
|  |  (!) Crystal Golem patrol (lv7)                               | |
|  |  (!) Gas Pocket x2 — larger explosion radius                  | |
|  |  (?) [SECRET ALCOVE] Old miner's journal + key                | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v  DEEP CHAMBER — THE RESONANCE CORE              (B)       | |
|  |  (*) [CRACKED LEY-NODE] Unstable Aether vent (★ main object.) | |
|  |  (B) [AETHER CRYSTAL GOLEM — ALPHA] Boss (lv12)               | |
|  |       Weak Node: Cracked chest gem (Architect's Eye)           | |
|  |  [POST-BOSS] Ley-Node stabilized — Enclave fast-travel node    | |
|  +-----------------------------------------------------------------+ |
+----------------------------------------------------------------------+
MONSTER ROAM: Crystalline Vipers(lv5), Mine Crawlers(lv5), Crystal Golems(lv7),
              Alpha Crystal Golem Boss(lv12)
```

---

## MAP 1.10 — WILDERNESS OUTSKIRT ROAD AMBUSH ZONE (U)

```
+----------------------------------------------------------------------+
|  WILDERNESS OUTSKIRT ROAD — BANDIT AMBUSH CORRIDORS                 |
|  SAFETY: (U) UNSAFE — active encounter on every movement tile       |
+----------------------------------------------------------------------+
|  [N] =====  BANDIT CAMP APPROACH (Map 1.8 north)  =====             |
|      (!) (!) Scouts watch road from treeline  (!) (!)               |
|                                                                      |
|  +-----[ROAD SEGMENT A]---------------------------------------+      |
|  |  [TALL GRASS] Concealment (enemy/player)  [BOULDER-1]     |      |
|  |  (!) Bandit Deserter ambush (lv4-6) — 40% spawn chance    |      |
|  |  [FALLEN LOG] Cover node during combat                    |      |
|  +-----[ROAD SEGMENT B]---------------------------------------+      |
|  |  [CHURCH TITHE CHECKPOINT] — mobile patrol                |      |
|  |  (!) Church Warden x2 (lv5-7) — demand Siphon receipt    |      |
|  |  [CHECKPOINT BARREL] Search container (loot if bypassed)  |      |
|  |  [CART] Abandoned merchant cart — loot inside             |      |
|  +-----[ROAD SEGMENT C — CROSSROADS]-------------------------+      |
|  |  [SIGNPOST] Kaelen's / Iron Coast / Wilderness directions |      |
|  |  (!) Aether Hound pack (lv6 x2) — guards crossroads      |      |
|  |  (!) Rogue Inquisitor (lv9) — rare but punishing          |      |
|  |  (*) [CRACKED WARD STONE] — old tithe marker, smashable   |      |
|  +------------------------------------------------------------+      |
|                                                                      |
|  [S] ====> KAELEN'S SOUTH GATE ROAD (Map 1.1 south exit)            |
|  [W] ====> IRON COAST HIGHWAY (Cross-region — Ch 2 start)           |
+----------------------------------------------------------------------+
MONSTER ROAM: Bandit Deserters(lv4-6), Church Wardens(lv5-7),
              Aether Hounds(lv6), Rogue Inquisitor(lv9)
```

---

## MAP 1.11 — KAELEN'S CROSSING CHURCH HEADQUARTERS (S/U)

```
+----------------------------------------------------------------------+
|  KAELEN'S CROSSING — CHURCH PARISH HEADQUARTERS                     |
|  SAFETY: (S) public hall / (U) private sanctum if trespassing       |
+----------------------------------------------------------------------+
|  [N] UPPER HALL — INQUISITOR OFFICES (U if trespassing)             |
|  +-----------------------------------------------------------------+ |
|  | INQUISITOR WING (Restricted)                           (U!)    | |
|  |  [DESK] Senior Inquisitor's files (quest evidence)             | |
|  |  [CABINET] Stage 3 tattoo records — Consumed prisoner log      | |
|  |  (!) [INQUISITOR] Elite guard (lv8) if caught                  | |
|  |  (?) [LOOSE FLOOR TILE] Hidden document cache                  | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v PUBLIC WORSHIP HALL                              (S)      | |
|  |  (*) [ALTAR] Main Siphon Shrine — weekly tithe submission      | |
|  |  [PEWS] Congregation seating                                   | |
|  |  [WARDEN-1] [WARDEN-2] Door guards (passive, not hostile)     | |
|  |  [CLERIC] NPC — gives tithe explanation dialogue               | |
|  |  [CONFESSION BOOTH] Private dialogue node — rumour access     | |
|  |  [DONATION BOX] Optional gold drain                           | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v  BASEMENT SIPHON VAULT                           (U)      | |
|  |  (*) [MAIN SIPHON CRYSTAL] Central parish gem storage          | |
|  |  [VAULT DOOR] Locked — requires Warden key or lockpick        | |
|  |  [RECORDS RACK] Tithe ledgers (evidence for quest)            | |
|  |  (!) [VAULT CONSTRUCT] Mechanical guardian (lv7)              | |
|  +-----------------------------------------------------------------+ |
|                         |                                            |
|                 [FRONT DOUBLE DOORS]                                 |
|                         v                                            |
|  [S] CENTRAL MARKET PLAZA (Map 1.2 east side)                        |
+----------------------------------------------------------------------+
MONSTER ROAM (basement only): Vault Construct(lv7), Elite Warden(lv8)
```

---

## MAP 1.12 — BLACKSMITH WORKSHOP (S)

```
+----------------------------------------------------------------------+
|  ARVAL'S BLACKSMITH WORKSHOP                                         |
|  SAFETY: (S) — Commerce zone, no encounters                         |
+----------------------------------------------------------------------+
|                                                                      |
|  +------------------------------------------------------------------+|
|  |  WORKSHOP FLOOR                                           (S)   ||
|  |                                                                  ||
|  |  [FORGE] Main fire forge (weapon crafting UI)                   ||
|  |  [ANVIL] Heavy iron anvil (upgrade weapon)                      ||
|  |  [BELLOWS] Air pump for forge fire                              ||
|  |  [QUENCH BARREL] Water cooling barrel                           ||
|  |  [ARVAL] ★ NPC Blacksmith — buy/sell/upgrade weapons           ||
|  |                                                                  ||
|  |  +---------------------------+   +---------------------------+  ||
|  |  | DISPLAY RACK (Buy)        |   | STORAGE ROOM (Crafting)  |  ||
|  |  | [SWORD] Iron longsword    |   | [ORE] Iron ore pile      |  ||
|  |  | [AXE] Woodman's axe       |   | [INGOT] Steel ingots     |  ||
|  |  | [SHIELD] Buckler          |   | [CHARCOAL] Fuel store    |  ||
|  |  | [SPEAR] Hunting spear     |   | [GEMS] Aether inlays     |  ||
|  |  | [KNIFE] Iron hunting knife|   | (crafting materials)     |  ||
|  |  +---------------------------+   +---------------------------+  ||
|  |                                                                  ||
|  |  [COMMISSION BOARD] Post custom order requests                  ||
|  |  [PRICE LIST] Posted on wall                                    ||
|  +------------------------------------------------------------------+|
|                         |                                            |
|                 [SHOP DOOR]                                          |
|                         v                                            |
|  [S] CENTRAL MARKET PLAZA (Map 1.2)                                  |
+----------------------------------------------------------------------+
```

---

## MAP 1.13 — PLAYER MANOR (EARLY STAGE) (S)

```
+----------------------------------------------------------------------+
|  PLAYER MANOR — FRONTIER ENCLAVE (Early Stage, Ch 1 Unlock)         |
|  SAFETY: (S) FULLY SAFE — Enclave territory                         |
+----------------------------------------------------------------------+
|  [N] MANOR REAR GROUNDS & EXPANSION PLOT (future upgrade)           |
|                         ^                                            |
|                         |                                            |
|  +-----------------------------------------------------------------+ |
|  | REAR GARDEN PLOT (Undeveloped — Ch 1 state)            (S)     | |
|  |  [SOIL] Empty garden bed (farm upgrade later)                  | |
|  |  [SHED] Small storage shed                                     | |
|  |  [WELL] Private water well                                     | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v  MANOR MAIN BUILDING                              (S)     | |
|  |                                                                 | |
|  |  +--------------------+       +------------------------------+  | |
|  |  | PLAYER QUARTERS    |       | TRAINING ROOM / STUDY        |  | |
|  |  | [BED] Rest point ★ |       | [DUMMY] Training dummy       |  | |
|  |  | [WARDROBE] Equip   |       | [BOOKSHELF] Skill manuals    |  | |
|  |  | [DESK] Journal     |       | [MAP TABLE] World map        |  | |
|  |  | [CHEST] Storage    |       | [CHALK BOARD] Quest notes    |  | |
|  |  +--------------------+       +------------------------------+  | |
|  |                                                                 | |
|  |  +--------------------+       +------------------------------+  | |
|  |  | COMMON HALL / HUB  |       | STORAGE ROOM                 |  | |
|  |  | [ROUND TABLE] ★    |       | [CRATE-1..4] Item storage    |  | |
|  |  |   Companion gather |       | [LOCKER] Companion gear      |  | |
|  |  | [HEARTH] Fireplace |       | [RECIPE BOX] Crafting list   |  | |
|  |  | [BOARD] Enclave tsk|       |                              |  | |
|  |  +--------------------+       +------------------------------+  | |
|  |                                                                 | |
|  |  (*) [AETHER NODE-1] First Enclave ley-node (quota tracker)   | |
|  |  [CHARTER FRAME] Multi-Anchor Charter display (quest unlock)  | |
|  +----|------------------------------------------------------------+ |
|       |                                                              |
|  +----|------------------------------------------------------------+ |
|  |    v  MANOR GROUNDS & GATE                            (S)      | |
|  |  [PERIMETER FENCE] Low stone fence                             | |
|  |  [LANTERNS] Lit gate posts                                     | |
|  |  [GATE] Iron gate (Enclave threshold marker)                   | |
|  +-----------------------------------------------------------------+ |
|                         |                                            |
|  [S] MANOR GROUNDS ROAD => KAELEN'S MARKET (Map 1.2 west road)       |
+----------------------------------------------------------------------+
```

