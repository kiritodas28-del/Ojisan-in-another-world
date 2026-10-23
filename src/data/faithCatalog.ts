/**
 * faithCatalog.ts
 * Static faith-affiliation catalog for Phase 33.
 *
 * Four world faiths are defined here.  Every humanoid character is assigned
 * a FaithId at spawn via DEFAULT_FAITH_BY_RACE; the player can change their
 * own faith (and NPC faiths) through the SET_FAITH dialogue effect.
 *
 * GodId is a plain string alias for now — the god roster is formalised in
 * Phase 36 (godStatusEngine).  The strings here match the lore names used
 * in world_bible.json and character_subquests_goddesses_extended.json.
 *
 * templeRiteXpBonus: % bonus applied on top of base Path Awakening XP when
 * a TEMPLE_RITE trigger fires and the player's faithId matches.
 * Wired into jobEngine.unlockPath() in a later phase; stored here now so
 * the catalog is complete from day one.
 *
 * alignedPathIds: JobDef.id strings whose thematic affinity with this faith
 * entitles them to templeRiteXpBonus.  Not mechanically enforced until
 * Phase 37 (Temple quest data); stored for future use.
 *
 * Tasks: 33b.1, 33b.2
 */

import type { FaithId } from '../state/gameState';
import { Race } from '../spawn-engine/types/enums';

// ─── GodId ────────────────────────────────────────────────────────────────────
// Lore-name references to the divine patrons.  Formalised as a discriminated
// union in Phase 36; string alias is sufficient until then.
export type GodId = string;

// ─── FaithDef ─────────────────────────────────────────────────────────────────
export interface FaithDef {
  readonly id:                FaithId;
  readonly name:              string;
  /** Lore names of the divine patrons of this faith. */
  readonly godPatronIds:      GodId[];
  /** JobDef.id strings with thematic affinity; eligible for templeRiteXpBonus. */
  readonly alignedPathIds:    string[];
  /**
   * Percentage bonus applied to base Path Awakening XP when the player's
   * faithId matches this faith and a TEMPLE_RITE trigger fires.
   * e.g. 15 = +15 %.  Wired in a later phase; stored here now.
   */
  readonly templeRiteXpBonus: number;
}

// ─── Faith catalog ────────────────────────────────────────────────────────────
export const FAITH_CATALOG: Record<Exclude<FaithId, 'none'>, FaithDef> = {
  radiant_faith: {
    id:                'radiant_faith',
    name:              'Radiant Faith',
    godPatronIds:      ['Solenne', 'Varan'],
    alignedPathIds:    ['paladin', 'arcane_templar'],
    templeRiteXpBonus: 15,
  },
  old_wood: {
    id:                'old_wood',
    name:              'Old Wood',
    godPatronIds:      ['Aeloria', 'Thessaly'],
    alignedPathIds:    ['analyst', 'rogue'],
    templeRiteXpBonus: 20,
  },
  stone_covenant: {
    id:                'stone_covenant',
    name:              'Stone Covenant',
    godPatronIds:      ['Durgrim', 'Hestrel'],
    alignedPathIds:    ['warrior', 'vanguard'],
    templeRiteXpBonus: 10,
  },
  night_court: {
    id:                'night_court',
    name:              'Night Court',
    godPatronIds:      ['Nyxara', 'Malvek', 'Kharrath'],
    alignedPathIds:    ['shadow', 'mage'],
    templeRiteXpBonus: 5,
  },
};

/** Convenience lookup; returns undefined for 'none'. */
export function getFaithDef(faithId: FaithId): FaithDef | undefined {
  if (faithId === 'none') return undefined;
  return FAITH_CATALOG[faithId];
}

// ─── Race → default FaithId ───────────────────────────────────────────────────
// Applied at spawn (npcPopulationEngine) and character creation.
// Covers every Race enum value; 'radiant_faith' is the safe fallback.
//
// Design notes (task 33b.2):
//   • DarkElf → 'old_wood': dark elves share the deep-wood lineage of high elves;
//     authors may override via SET_FAITH for specific NPCs.
//   • God → 'none': gods predate mortal faith institutions.
//   • Mixed → 'radiant_faith': broadest default for mixed-heritage characters.
export const DEFAULT_FAITH_BY_RACE: Record<Race, FaithId> = {
  [Race.Human]:       'radiant_faith',
  [Race.Elf]:         'old_wood',        // wood elf
  [Race.HighElf]:     'old_wood',
  [Race.DarkElf]:     'old_wood',        // deep-wood lineage; override per-NPC if needed
  [Race.Dwarf]:       'stone_covenant',
  [Race.Fairy]:       'old_wood',
  [Race.Orc]:         'old_wood',        // high orc / beastfolk
  [Race.Goblin]:      'old_wood',
  [Race.Demon]:       'night_court',
  [Race.DevilGirl]:   'night_court',
  [Race.DevilBoy]:    'night_court',
  [Race.Succubus]:    'night_court',
  [Race.Incubus]:     'night_court',
  [Race.FoxGirl]:     'old_wood',        // beastfolk
  [Race.FoxBoy]:      'old_wood',
  [Race.WolfGirl]:    'old_wood',
  [Race.WolfBoy]:     'old_wood',
  [Race.CowGirl]:     'old_wood',
  [Race.CowBoy]:      'old_wood',
  [Race.DragonGirl]:  'old_wood',        // dragonkin
  [Race.DragonBoy]:   'old_wood',
  [Race.Goddess]:     'radiant_faith',   // angel-equivalent
  [Race.God]:         'none',
  [Race.Mixed]:       'radiant_faith',   // broadest default for mixed-heritage
};
