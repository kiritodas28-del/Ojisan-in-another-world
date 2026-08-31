/**
 * mockGameState.ts
 * Realistic GameState for UI development without a running backend.
 * All values satisfy the interfaces defined in src/state/gameState.ts.
 *
 * Scenario: Day 4, Afternoon. Player (Kenji, level 3) is in the Village Square
 * with 2 party companions, 5 contacts, 2 active quests.
 *
 * Task UI-2.1
 */

import type { GameState, PlayerCharacter, NpcCharacter, PartyMember } from '../../state/gameState';

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
  activeStatusEffects: [],

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
  battlePoints: 6,
  ardorPoints:  4,
  unspentBP: 2,
  unspentAP: 1,
  unlockedSkillIds: ['battle_power_strike', 'ardor_gentle_touch'],

  // Economy
  gold:           240,
  inventorySlots: 20,
  inventory: [
    { itemId: 'herb_basic',    quantity: 5 },
    { itemId: 'iron_sword',    quantity: 1 },
    { itemId: 'leather_armor', quantity: 1 },
    { itemId: 'gift_flower',   quantity: 2 },
  ],
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
  equippedWeaponId:    'staff_oak',
  equippedArmorId:     'robe_basic',
};

const mockPartyBram: PartyMember = {
  npcId:               'npc-bram',
  vitals:              mockBram.vitals,
  stats:               mockBram.stats,
  activeStatusEffects: [],
  isDown:              false,
  equippedWeaponId:    'iron_axe',
  equippedArmorId:     'chainmail',
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
  companionLevel: 0, companionXP: 0,
} as unknown as NpcCharacter;

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
    currentLocationId:  'village_square',
    discoveredNodeIds:  ['village_square', 'forest_entrance', 'old_mill'],
    lastSafeLocationId: 'village_square',
  },

  calendar: {
    day:              4,
    phase:            'Afternoon',
    actionCount:      7,
    phaseActionLimit: 15,
  },

  quests: {
    active: [
      {
        questId: 'board_wolf_hunt',
        objectiveProgress: { 'kill_wolves': 3 },
      },
      {
        questId: 'main_act1_ch1',
        objectiveProgress: { 'reach_village': 1, 'talk_elder': 0 },
      },
    ],
    completed: ['tutorial_arrival'],
    available: ['board_herb_gather', 'side_meira_request'],
  },

  reputation: {
    region_start:  120,
    region_forest: -30,
  },

  manor: {
    tier:                  1,
    constructionTimerDays: 0,
    suiteAssignments:      {},
    passiveResourceQueue:  [],
  },

  flags: {
    act1_ch1_started: true,
    met_elder:        false,
  },

  settings: {
    adultContentEnabled:  true,
    nonConContentEnabled: false,
    contactListCap:       400,
    partyMaxSize:         3,
    textSize:             'medium',
  },
};
