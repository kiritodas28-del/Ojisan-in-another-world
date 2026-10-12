/**
 * mockCombatState.ts
 * A CombatState mid-fight: player + Elara vs 2 enemies.
 * Used to develop and test CombatView without a running backend.
 * Task UI-2.2
 */

import type { CombatState } from '../../engines/combatEngine';
import type { AnyCharacter } from '../../state/gameState';

const mockWolf: AnyCharacter = {
  id:            'enemy-wolf-1',
  name:          'Forest Wolf',
  characterType: 'MONSTER',
  vitals:        { hp: { current: 28, max: 45 }, stamina: { current: 60, max: 60 }, cpw: { current: 0, max: 0 }, mp: { current: 0, max: 0 }, arousal: 0, fatigue: 0 },
  stats:         { str: 12, agi: 14, wis: 4, def: 6, lck: 5 },
  activeStatusEffects: [],
  monsterType:          'Beast',
  aiPattern:            'Aggressive',
  miasmaReserve:        0,
  sexualAttackEligible: false,
  monsterSex:           'None',
  lootTable:            null,
  purificationReward:   null,
  defeatOutcomeOptions: [],
} as unknown as AnyCharacter;

const mockBandit: AnyCharacter = {
  id:            'enemy-bandit-1',
  name:          'Forest Bandit',
  characterType: 'ENEMY_HUMANOID',
  vitals:        { hp: { current: 40, max: 55 }, stamina: { current: 80, max: 80 }, cpw: { current: 10, max: 20 }, mp: { current: 100, max: 100 }, arousal: 0, fatigue: 0 },
  stats:         { str: 13, agi: 10, wis: 7, def: 9, lck: 6 },
  // BURNING replaces 'bleed' (not in catalog); stacks 2 = two fire DoTs per tick
  activeStatusEffects: [{ defId: 'BURNING', remainingTurns: 2, stacks: 2 }],
  gender: 'Male', race: 'Human',
  raceFeatures: {}, bodyType: {}, skin: {}, face: {}, hair: {},
  measurements: {}, physicalDetail: {}, sexualPhysiology: {},
  personality: {}, sexualPsychology: {}, voice: {}, social: {},
  background: {}, history: {}, dynamicState: {},
  aiPattern:            'Defensive',
  manaReserve:          10,
  lootTable:            null,
  purificationReward:   null,
  defeatOutcomeOptions: [],
} as unknown as AnyCharacter;

export const mockCombatState: CombatState = {
  encounterId:     'enc-001',
  regionId:        'region-forest-001',
  initiativeOrder: ['player-001', 'enemy-wolf-1', 'npc-elara', 'enemy-bandit-1'],
  currentTurnIndex: 0, // player's turn
  combatants: {
    'player-001':     {} as AnyCharacter, // filled from mockGameState.player in real use
    'npc-elara':      {} as AnyCharacter, // filled from party
    'enemy-wolf-1':   mockWolf,
    'enemy-bandit-1': mockBandit,
  },
  roundNumber:          2,
  status:               'RUNNING',
  miasmaLevel:          24,
  purificationProgress: 15,
  bossPhaseScripts:     {},
  killedEnemies:        [],
  log:                  [
    { round: 1, actorId: 'player-001',    message: 'Player strikes the wolf for 18 damage.' },
    { round: 1, actorId: 'enemy-wolf-1',  message: 'Forest Wolf bites the player for 11 damage.' },
    { round: 1, actorId: 'npc-elara',     message: 'Elara slashes the bandit for 15 damage.' },
    { round: 1, actorId: 'enemy-bandit-1',message: 'Forest Bandit failed to flee!' },
  ],
};
