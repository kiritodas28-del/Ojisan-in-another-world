/**
 * mockGameState.ts
 * Realistic GameState for UI development without a running backend.
 * All values satisfy the interfaces defined in src/state/gameState.ts.
 *
 * Scenario: Day 4, Afternoon. Player (Kenji, level 3) is in the Village Square
 * with 2 party companions, 3 contacts, 2 active quests.
 *
 * Task UI-2.1  (TileMap added: Task UI-5.1 / UI-5.3)
 */

import type {
  GameState, PlayerCharacter, NpcCharacter, PartyMember,
  TileMap, TileTerrainType, OccupantPositions, QuestLog,
  AlignmentState, InfamyState, EnvironmentState, SpireNetwork,
  JobArchetypeState, ClassProgressionState, SynergyState,
} from '../../state/gameState';
import { createEmptyDialogueState } from '../../state/gameState';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fullVitals = (hp: number, stamina: number, cpw: number) => ({
  hp:      { current: hp,      max: hp      },
  stamina: { current: stamina, max: stamina  },
  cpw:     { current: cpw,     max: cpw      },
  arousal: 0,
  fatigue: 0,
});

const baseStats = (str: number, agi: number, wis: number, def: number, lck: number) => ({
  str, agi, wis, def, lck,
});

// ─── Player ───────────────────────────────────────────────────────────────────
const mockPlayer: PlayerCharacter = {
  id:            'player-001',
  name:          'Kenji',
  characterType: 'PLAYER',
  vitals:        { ...fullVitals(85, 160, 40), fatigue: 1 },
  stats:         baseStats(14, 12, 8, 10, 9),
  // Task 14.16: WEAKENED active so StatusIconRow renders in CombatView (1 turn remaining)
  activeStatusEffects: [{ defId: 'WEAKENED', remainingTurns: 1, stacks: 1 }],

  // Spawn-engine profile (unknown stubs until Task 3a.8)
  gender: 'Male',
  race:   'Human',
  raceFeatures: {},
  bodyType: {},
  skin: {},
  face: {},
  hair: {},
  measurements: {},
  physicalDetail: {},
  sexualPhysiology: {},
  personality: {},
  sexualPsychology: {},
  voice: {},
  social: {},
  background: {},
  history: {},
  dynamicState: {},

  // Progression
  level:    3,
  xp:       420,
  sensitivity: 10,
  technique:   12,
  virility:    14,
  alignmentScore: 0,  // Phase 23a: neutral Pragmatist at game start
  battlePoints: 6,
  ardorPoints:  4,
  unspentBP: 2,
  unspentAP: 1,
  unlockedSkillIds: ['battle_power_strike', 'ardor_gentle_touch'],

  // Economy (Task 12.18: 7 slots, gold 340)
  gold:           340,
  inventorySlots: 20,
  // Task 23.22: rope in inventory for taming captures
  inventory: [
    { itemId: 'herb_basic',    quantity: 5 },
    { itemId: 'health_potion', quantity: 2 },
    { itemId: 'iron_sword',    quantity: 1, upgradeLevel: 1 },
    { itemId: 'leather_armor', quantity: 1 },
    { itemId: 'gift_flower',   quantity: 2 },
    { itemId: 'condom',        quantity: 3 },
    { itemId: 'rope_silk',     quantity: 1 },
    { itemId: 'rope',          quantity: 2 },  // taming rope (Phase 23)
  ],
  // Task 15.5: player has iron_sword equipped in WEAPON slot
  equipped: {
    WEAPON: 'iron_sword',
    CHEST:  'leather_armor',
  },
} as unknown as PlayerCharacter; // cast until spawn-engine types are wired (Task 3a.8)

// ─── Companions (as NpcCharacter — they live in contacts and party) ───────────
const mockElara: NpcCharacter = {
  id:            'npc-elara',
  name:          'Elara',
  characterType: 'NPC',
  vitals:        { ...fullVitals(70, 140, 30), fatigue: 1 },
  stats:         baseStats(8, 14, 16, 7, 11),
  activeStatusEffects: [],

  gender: 'Female', race: 'Elf',
  raceFeatures: {}, bodyType: {}, skin: {}, face: {}, hair: {},
  measurements: {}, physicalDetail: {}, sexualPhysiology: {},
  personality: {}, sexualPsychology: {}, voice: {}, social: {},
  background: {}, history: {}, dynamicState: {},

  npcId:             'npc-elara',
  hasBeenIntroduced: true,
  isProtected:       false,
  isService:         false,
  trust:             72,
  love:              65,
  flirtCountToday:   1,
  touchCountToday:   0,
  playerBondType:    undefined,          // no player-exclusive bond yet (9a.3)
  npcRelationships:  [],                  // NPC-NPC social graph (9a.2)
  companionLevel:    3,
  companionXP:       310,
} as unknown as NpcCharacter;

const mockBram: NpcCharacter = {
  id:            'npc-bram',
  name:          'Bram',
  characterType: 'NPC',
  vitals:        { ...fullVitals(95, 180, 20), fatigue: 1 },
  stats:         baseStats(18, 10, 6, 15, 7),
  activeStatusEffects: [],

  gender: 'Male', race: 'Human',
  raceFeatures: {}, bodyType: {}, skin: {}, face: {}, hair: {},
  measurements: {}, physicalDetail: {}, sexualPhysiology: {},
  personality: {}, sexualPsychology: {}, voice: {}, social: {},
  background: {}, history: {}, dynamicState: {},

  npcId:             'npc-bram',
  hasBeenIntroduced: true,
  isProtected:       false,
  isService:         false,
  trust:             55,
  love:              30,
  flirtCountToday:   0,
  touchCountToday:   0,
  playerBondType:    undefined,          // no player-exclusive bond yet
  npcRelationships:  [],                  // NPC-NPC social graph
  companionLevel:    2,
  companionXP:       180,
} as unknown as NpcCharacter;

// ─── Party ────────────────────────────────────────────────────────────────────
const mockPartyElara: PartyMember = {
  npcId:               'npc-elara',
  vitals:              mockElara.vitals,
  stats:               mockElara.stats,
  activeStatusEffects: [],
  isDown:              false,
  // Task 15.5: migrated from old equippedWeaponId / equippedArmorId fields
  equipped: {
    WEAPON: 'staff_oak',
    CHEST:  'robe_basic',
  },
};

const mockPartyBram: PartyMember = {
  npcId:               'npc-bram',
  vitals:              mockBram.vitals,
  stats:               mockBram.stats,
  activeStatusEffects: [],
  isDown:              false,
  equipped: {
    WEAPON: 'iron_axe',
    CHEST:  'chainmail',
  },
};

// ─── Additional contacts (not in party) ──────────────────────────────────────
const mockMeira: NpcCharacter = {
  id: 'npc-meira', name: 'Meira', characterType: 'NPC',
  vitals: fullVitals(60, 120, 25), stats: baseStats(6, 13, 12, 5, 14),
  activeStatusEffects: [],
  gender: 'Female', race: 'Human',
  raceFeatures: {}, bodyType: {}, skin: {}, face: {}, hair: {},
  measurements: {}, physicalDetail: {}, sexualPhysiology: {},
  personality: {}, sexualPsychology: {}, voice: {}, social: {},
  background: {}, history: {}, dynamicState: {},
  npcId: 'npc-meira', hasBeenIntroduced: true,
  isProtected: false, isService: false,
  trust: 38, love: 45, flirtCountToday: 0, touchCountToday: 0,
  playerBondType:   undefined,           // no player-exclusive bond yet
  npcRelationships: [],                   // NPC-NPC social graph
  companionLevel: 0, companionXP: 0,
} as unknown as NpcCharacter;

// ─── Mock tile map — village_square ───────────────────────────────────────────
// 30×30 grid. Outer border = EMPTY_EDGE (shapes the location boundary so it
// isn't a full filled square). Row 5, cols 2–12 = inn façade wall; col 7 = DOOR.
function buildVillageSquareTileMap(): TileMap {
  const ROWS = 30;
  const COLS = 30;

  const tiles = Array.from({ length: ROWS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) => {
      const coord = { row, col };
      // Outer border ring → EMPTY_EDGE (invisible; not walkable; shapes location)
      if (row === 0 || row === ROWS - 1 || col === 0 || col === COLS - 1) {
        return { coord, terrain: 'EMPTY_EDGE' as TileTerrainType, isPassable: false };
      }
      // Inn façade wall: row 5, cols 2–12 (except col 7 which is the door)
      if (row === 5 && col >= 2 && col <= 12 && col !== 7) {
        return { coord, terrain: 'WALL' as TileTerrainType, isPassable: false };
      }
      // Door gap in the wall at row 5, col 7
      if (row === 5 && col === 7) {
        return { coord, terrain: 'DOOR' as TileTerrainType, isPassable: true };
      }
      // Everything else is walkable floor
      return { coord, terrain: 'FLOOR' as TileTerrainType, isPassable: true };
    })
  );

  return {
    locationId:  'village_square',
    safetyTier:  'SAFE',
    tiles,
    spawnPoints: {
      'player-001': { row: 15, col: 15 },
      'npc-elara':  { row: 15, col: 16 }, // companions share player tile cluster
      'npc-bram':   { row: 15, col: 14 },
      'npc-meira':  { row: 10, col: 10 },
    },
  };
}

// Live occupant positions (companions start on adjacent tiles to player, not the
// same tile, just so the mock data is visually sensible — in real gameplay they
// overlay the player's tile).
const mockOccupantPositions: OccupantPositions = {
  'player-001': { row: 15, col: 15 },
  'npc-elara':  { row: 15, col: 16 },
  'npc-bram':   { row: 15, col: 14 },
  'npc-meira':  { row: 10, col: 10 },
};

// ─── Root GameState ───────────────────────────────────────────────────────────
export const mockGameState: GameState = {
  saveVersion: 1,

  player: mockPlayer,

  party: {
    companions: [mockPartyElara, mockPartyBram],
    maxSize:    3,
  },

  contacts: [
    { character: mockElara },
    { character: mockBram  },
    { character: mockMeira },
  ],

  world: {
    // Phase 17: currentNodeId is canonical; currentLocationId is an alias kept in sync.
    currentNodeId:      'village_square',
    currentLocationId:  'village_square',
    discoveredNodeIds:  ['village_square', 'forest_entrance', 'old_mill'],
    lastSafeNodeId:     'village_square',
    lastSafeLocationId: 'village_square',
    tileMap:            buildVillageSquareTileMap(),
    occupantPositions:  mockOccupantPositions,
    // No roam defs for village_square (SAFE node). Authored in Task 17.DATA.
    enemyRoamDefs:      [],
  },

  calendar: {
    day:              4,
    phase:            'Afternoon',
    actionCount:      7,
    phaseActionLimit: 15,
  },

  // Phase 18: offspring records — empty at game start; populated on birth
  offspring: [],

  // Phase 13: no active dialogue at game start
  dialogue: createEmptyDialogueState(),

  // Phase 11 QuestLog — entries[] replaces old active/completed/available split.
  // Two ACTIVE quests (one with partial progress), one COMPLETED.
  // Objectives are parallel arrays matching the QuestDef.objectives order;
  // counts are placeholders until quest data is authored (task 11.5).
  quests: {
    entries: [
      {
        // BOARD: Wolf Hunt — 2 of 5 wolves killed
        defId:              'board_wolf_hunt',
        status:             'ACTIVE',
        objectiveProgress:  [2],      // [killCount]
        activatedOnDay:     2,
      },
      {
        // MAIN: Act 1 Ch 1 — arrived in village (obj 0 done); elder not yet spoken (obj 1 pending)
        defId:              'main_act1_ch1',
        status:             'ACTIVE',
        objectiveProgress:  [1, 0],   // [travelToVillage, talkElder]
        activatedOnDay:     1,
      },
      {
        // BOARD: Herb Gather — completed on day 3; cooldown expires day 7
        defId:              'board_herb_gather',
        status:             'COMPLETED',
        objectiveProgress:  [5],      // [collectCount] — fully met
        activatedOnDay:     3,
        completedOnDay:     3,
        cooldownExpiresOnDay: 7,
      },
    ],
  } satisfies QuestLog,

  // 5 regions covering all 5 reputation tiers (Task 10.14):
  //   region_start    +120 → Liked
  //   region_plains    +450 → Renowned
  //   region_forest    -30  → Neutral (negative but above Disliked threshold)
  //   region_swamp    -250  → Disliked
  //   region_abyss    -550  → Infamous  (also has an active bounty)
  reputation: {
    region_start:  120,
    region_plains: 450,
    region_forest: -30,
    region_swamp:  -250,
    region_abyss:  -550,
  },

  // Phase 23a: dark/shadow faction reputation (task 23a.5).
  // Seeded with region_abyss at 55 so shadow faction is accessible there;
  // all others start at 0 (shadow faction locked until events push score >= 40).
  darkReputation: {
    region_start:  0,
    region_plains: 0,
    region_forest: 0,
    region_swamp:  0,
    region_abyss:  55,
  },

  // Phase 19: tier 2 unlocked; Elara assigned to suite_1.
  // Day-end passive gen yields: (5 * 2) + (2 * 3) = 16 gold/day from Elara.
  manor: {
    tier:                  2,
    constructionTimerDays: 0,
    suiteAssignments:      { suite_1: 'npc-elara' },
    passiveResourceQueue:  [],
    holdingCells:          [],  // Task 23.22: empty at game start; populated on capture
  },

  // Task 15.3: crafting bench unlocked at tier 2; maxSlots=1
  craftingQueue: {
    jobs:     [],
    maxSlots: 1,  // crafting bench unlocked at tier 2
  },

  // Phase 20: no achievements unlocked yet in the mock scenario.
  achievements: [],

  flags: {
    act1_ch1_started: true,
    met_elder:        false,
  },

  // NPC-NPC interaction log — populated during day-end tick, cleared after (9a.4)
  npcInteractionLog: [],

  settings: {
    adultContentEnabled:  true,
    nonConContentEnabled: false,
    contactListCap:       400,
    partyMaxSize:         3,
    textSize:             'medium',
  },

  // ── Phase 24: generic engine states (Tasks 24.41–42) ────────────────────
  alignment: {
    scores:              { axis_a: 0, axis_b: 0, axis_c: 0 },
    dominantAxis:        undefined,
    divergenceMultiplier: 1.0,
  } satisfies AlignmentState,

  infamy: {
    scores:           {},
    tiers:            {},
    outstandingFines: {},
  } satisfies InfamyState,

  environment: {
    weather:              {},
    activeEffects:        [],
    equipmentDurability:  {},
  } satisfies EnvironmentState,

  spires: {
    spires: [],  // populated from spireNetwork catalog after Task 24.35
  } satisfies SpireNetwork,

  jobState: {
    activeJobId:  undefined,
    activeClassId: undefined,
    jobResources: {
      poolA: { current: 0, max: 0, label: '' },
      poolB: undefined,
    },
  } satisfies JobArchetypeState,

  classProgress: {
    spSpentPerClass:        {},
    unlockedNodesPerClass:  {},
  } satisfies ClassProgressionState,

  synergies: {
    pairs: [],  // populated from synergyCatalog after Task 24.38
  } satisfies SynergyState,

  characterCreation: undefined,  // set during new-game character creation flow

  // Phase 26: tithe system — inactive at game start
  tithe: {
    lastPaidDay:      0,
    quotaGoldPerWeek: 0,  // 0 = inactive until Enclave quest fires
    overdueBy:        0,
  },
};
