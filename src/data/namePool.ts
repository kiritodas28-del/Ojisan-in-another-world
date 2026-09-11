/**
 * namePool.ts
 * Gendered NPC name pools per race (Task 4.1).
 *
 * Naming philosophy per race:
 *   Human       — pan-European medieval fantasy
 *   Elf         — flowing, nature-inflected
 *   HighElf     — archaic, long, regal
 *   DarkElf     — sharp consonants, darker vowels
 *   Dwarf       — Norse-adjacent, short and hard
 *   Fairy       — diminutive, whimsical
 *   Orc         — guttural, strong stops
 *   Goblin      — nasal, quick syllables
 *   Demon       — Latin-inflected, ominous
 *   DevilGirl   — elegant-sinister, feminine
 *   DevilBoy    — sharp and cruel-sounding
 *   Succubus    — breathy, seductive
 *   Incubus     — low resonance, predatory
 *   FoxGirl     — Japanese-adjacent
 *   FoxBoy      — Japanese-adjacent
 *   WolfGirl    — Slavic-adjacent
 *   WolfBoy     — Slavic-adjacent
 *   CowGirl     — warm, rural-fantasy
 *   CowBoy      — grounded, pastoral
 *   DragonGirl  — ancient, resonant
 *   DragonBoy   — ancient, resonant
 *   Goddess     — divine, euphonic
 *   God         — divine, archaic
 *   Mixed       — draws from parent races; fallback to Human pool
 *
 * drawName() picks uniformly at random from the relevant pool.
 * Falls back to a generated placeholder if the pool is empty.
 */

import type { Race } from '../spawn-engine/types/enums';

export type NamePool = {
  male:   string[];
  female: string[];
};

export const NAME_POOLS: Record<Race, NamePool> = {
  // ── Human ──────────────────────────────────────────────────────────────────
  HUMAN: {
    male: [
      'Aldric', 'Bram', 'Caelan', 'Dain', 'Elan', 'Favin', 'Garrett', 'Hale',
      'Ivan', 'Jorin', 'Kaelar', 'Lucan', 'Maren', 'Noel', 'Osric', 'Pelder',
      'Quinn', 'Rael', 'Soren', 'Taren', 'Ulric', 'Vance', 'Wren', 'Xandor',
      'Yoren', 'Zael',
    ],
    female: [
      'Aelith', 'Brynn', 'Ceres', 'Dara', 'Elara', 'Fenna', 'Gwyn', 'Hessa',
      'Isra', 'Jowyn', 'Kira', 'Lysa', 'Mira', 'Nara', 'Oryn', 'Petra',
      'Rhea', 'Saya', 'Tara', 'Una', 'Vida', 'Wyla', 'Xara', 'Yeva',
      'Zara', 'Calla',
    ],
  },

  // ── Elf ────────────────────────────────────────────────────────────────────
  ELF: {
    male: [
      'Aelindor', 'Caelwyn', 'Daerith', 'Elarion', 'Faelvir', 'Gaelmir',
      'Haedrin', 'Ithion', 'Laerith', 'Maeldur', 'Naeven', 'Orvael',
      'Paelrin', 'Raelith', 'Saevrin', 'Taeldur', 'Vaelis', 'Waelmir',
      'Yaevon', 'Zaelorin',
    ],
    female: [
      'Aelindra', 'Caelynne', 'Daeriel', 'Elarien', 'Faelwyn', 'Gaelara',
      'Haedris', 'Ithiene', 'Laeriel', 'Maeldra', 'Naeviel', 'Orvael',
      'Paelris', 'Raelith', 'Saevrin', 'Taelwyn', 'Vaelira', 'Waelmire',
      'Yaevith', 'Zaelis',
    ],
  },

  // ── HighElf ────────────────────────────────────────────────────────────────
  HIGH_ELF: {
    male: [
      'Aerindovael', 'Calandorin', 'Darenthiel', 'Eloriandur', 'Faelindovar',
      'Gaelimandor', 'Haedrantiel', 'Ithianavel', 'Laerithondur', 'Maelvorian',
      'Naevithalon', 'Orvaelindor',
    ],
    female: [
      'Aerindovael', 'Calandoria', 'Darenthiela', 'Eloriandira', 'Faelindova',
      'Gaelimandria', 'Haedrantiel', 'Ithianavael', 'Laerithondra', 'Maelvorian',
      'Naevithalind', 'Orvaelindra',
    ],
  },

  // ── DarkElf ────────────────────────────────────────────────────────────────
  DARK_ELF: {
    male: [
      'Zarath', 'Vexan', 'Dravith', 'Khael', 'Solvrak', 'Nythrix', 'Corvael',
      'Tharek', 'Xyrath', 'Molvir', 'Braxan', 'Draethin', 'Sevrak', 'Kyroth',
      'Zolvaar',
    ],
    female: [
      'Zarath', 'Vexara', 'Dravith', 'Khaela', 'Solvra', 'Nythrix', 'Corva',
      'Thareis', 'Xyra', 'Molva', 'Braxis', 'Draethis', 'Sevra', 'Kyroth',
      'Zolvaar',
    ],
  },

  // ── Dwarf ──────────────────────────────────────────────────────────────────
  DWARF: {
    male: [
      'Brundar', 'Torvin', 'Kaldur', 'Grim', 'Ulfhak', 'Dornak', 'Belvar',
      'Thordak', 'Ozmund', 'Valdrak', 'Hrothur', 'Murgrin', 'Snorvar',
      'Guldar', 'Braknar',
    ],
    female: [
      'Brunda', 'Torvina', 'Kalda', 'Grima', 'Ulfhaka', 'Dorna', 'Belva',
      'Thordaka', 'Ozmunda', 'Valdra', 'Hrothura', 'Murgrina', 'Snorva',
      'Gulda', 'Brakna',
    ],
  },

  // ── Fairy ──────────────────────────────────────────────────────────────────
  FAIRY: {
    male: [
      'Pip', 'Miro', 'Tillo', 'Fenn', 'Brix', 'Clover', 'Dewdrop', 'Glim',
      'Wisp', 'Zell', 'Sprout', 'Fen', 'Lumen', 'Twig', 'Pix',
    ],
    female: [
      'Pixie', 'Mira', 'Tilla', 'Fenne', 'Brixie', 'Clova', 'Dewdra',
      'Glima', 'Wispa', 'Zella', 'Sprouta', 'Fenna', 'Lumina', 'Twiga', 'Pixa',
    ],
  },

  // ── Orc ────────────────────────────────────────────────────────────────────
  ORC: {
    male: [
      'Grak', 'Torg', 'Brul', 'Vagnar', 'Krug', 'Drog', 'Ulgnar', 'Morg',
      'Thraka', 'Grakul', 'Vorg', 'Brunak', 'Kraknar', 'Dorgan', 'Ulgrak',
    ],
    female: [
      'Grakra', 'Torga', 'Brula', 'Vagnara', 'Kruga', 'Droga', 'Ulgnara',
      'Morga', 'Thraka', 'Grakula', 'Vorga', 'Brunaka', 'Kraknara', 'Dorgana', 'Ulgraka',
    ],
  },

  // ── Goblin ─────────────────────────────────────────────────────────────────
  GOBLIN: {
    male: [
      'Nix', 'Krit', 'Zink', 'Blib', 'Snig', 'Zap', 'Krix', 'Blip', 'Narg',
      'Gritz', 'Wix', 'Snark', 'Zib', 'Krak', 'Blort',
    ],
    female: [
      'Nixa', 'Krita', 'Zinka', 'Bliba', 'Sniga', 'Zapi', 'Krixa', 'Blipa',
      'Narga', 'Gritza', 'Wixa', 'Snarka', 'Ziba', 'Kraka', 'Blorta',
    ],
  },

  // ── Demon ──────────────────────────────────────────────────────────────────
  DEMON: {
    male: [
      'Malachar', 'Verath', 'Draconis', 'Sorveth', 'Abaron', 'Corvinus',
      'Mephiran', 'Xerathis', 'Zolvaar', 'Balverath', 'Nocturnis', 'Serphas',
      'Ignavar', 'Kraelith', 'Abarath',
    ],
    female: [
      'Malacara', 'Veratha', 'Dracona', 'Sorveth', 'Abara', 'Corvina',
      'Mephira', 'Xerathis', 'Zolvara', 'Balverath', 'Nocturna', 'Serphas',
      'Ignava', 'Kraelith', 'Abara',
    ],
  },

  // ── DevilGirl ──────────────────────────────────────────────────────────────
  DEVIL_GIRL: {
    male: [], // DevilGirl is a female-presenting race; male pool used only for Mixed fallback
    female: [
      'Lilith', 'Morrigan', 'Vexara', 'Seraphine', 'Demoncia', 'Corvalia',
      'Noctara', 'Abyssara', 'Helleva', 'Sinara', 'Crimsa', 'Embra',
      'Torvia', 'Sultris', 'Venoma',
    ],
  },

  // ── DevilBoy ───────────────────────────────────────────────────────────────
  DEVIL_BOY: {
    male: [
      'Lucivar', 'Morrigan', 'Vexan', 'Seraphin', 'Demoncus', 'Corvalis',
      'Noctaris', 'Abyssas', 'Helleva', 'Sinrak', 'Crimsar', 'Embrak',
      'Torvas', 'Sultra', 'Venomax',
    ],
    female: [], // DevilBoy is a male-presenting race
  },

  // ── Succubus ───────────────────────────────────────────────────────────────
  SUCCUBUS: {
    male: [], // Succubus is female-presenting
    female: [
      'Luxara', 'Velasha', 'Sonara', 'Desirath', 'Aravia', 'Meltora',
      'Sensara', 'Veluna', 'Carnava', 'Ardara', 'Lasciva', 'Enthrala',
      'Summorath', 'Voluptara', 'Sireth',
    ],
  },

  // ── Incubus ────────────────────────────────────────────────────────────────
  INCUBUS: {
    male: [
      'Luxaran', 'Velashar', 'Sonaran', 'Desireth', 'Aravion', 'Meltoran',
      'Sensaron', 'Velunar', 'Carnavar', 'Ardaron', 'Lascivan', 'Enthralan',
      'Summorath', 'Voluptar', 'Sireth',
    ],
    female: [], // Incubus is male-presenting
  },

  // ── FoxGirl ────────────────────────────────────────────────────────────────
  FOX_GIRL: {
    male: [], // FoxGirl is female-presenting
    female: [
      'Koharu', 'Suzume', 'Yukiko', 'Himari', 'Akane', 'Momiji', 'Kitsune',
      'Yuzuki', 'Shiori', 'Tamaki', 'Ayame', 'Hazuki', 'Satsuki', 'Hinata',
      'Kaguya', 'Wakana', 'Ruriko', 'Nanami', 'Izumi', 'Fujino',
    ],
  },

  // ── FoxBoy ─────────────────────────────────────────────────────────────────
  FOX_BOY: {
    male: [
      'Kitsuo', 'Renki', 'Shiro', 'Akito', 'Yohei', 'Haruki', 'Sohei',
      'Ryokan', 'Taiki', 'Yuuki', 'Kazuho', 'Mizuki', 'Haruto', 'Sousuke',
      'Takeru', 'Fuyuki', 'Natsuki', 'Raito', 'Shouri', 'Fumin',
    ],
    female: [],
  },

  // ── WolfGirl ───────────────────────────────────────────────────────────────
  WOLF_GIRL: {
    male: [],
    female: [
      'Varka', 'Mirela', 'Zoya', 'Darya', 'Nadia', 'Sveta', 'Lyuba',
      'Anya', 'Sonya', 'Kira', 'Rada', 'Olya', 'Tanya', 'Masha',
      'Vera', 'Nika', 'Katya', 'Alina', 'Yelena', 'Irina',
    ],
  },

  // ── WolfBoy ────────────────────────────────────────────────────────────────
  WOLF_BOY: {
    male: [
      'Vark', 'Mirel', 'Zoran', 'Daryuk', 'Nadin', 'Svet', 'Lyub',
      'Anya', 'Sora', 'Kirak', 'Radon', 'Olyr', 'Tanya', 'Mash',
      'Veron', 'Nikon', 'Katyr', 'Alin', 'Yelen', 'Irion',
    ],
    female: [],
  },

  // ── CowGirl ────────────────────────────────────────────────────────────────
  COW_GIRL: {
    male: [],
    female: [
      'Bova', 'Milka', 'Clover', 'Heitha', 'Merna', 'Boela', 'Dulce',
      'Fresia', 'Morna', 'Creamy', 'Honeth', 'Daila', 'Ruma', 'Helga',
      'Greta', 'Maude', 'Britta', 'Erna', 'Hulda', 'Thyra',
    ],
  },

  // ── CowBoy ─────────────────────────────────────────────────────────────────
  COW_BOY: {
    male: [
      'Bovar', 'Milkan', 'Cloven', 'Heithan', 'Mern', 'Boeln', 'Dulcen',
      'Fresiar', 'Morn', 'Creamyr', 'Honeth', 'Dailar', 'Ruman', 'Helgar',
      'Gretan', 'Maudin', 'Brittan', 'Ernan', 'Huldar', 'Thyran',
    ],
    female: [],
  },

  // ── DragonGirl ─────────────────────────────────────────────────────────────
  DRAGON_GIRL: {
    male: [],
    female: [
      'Pyrantha', 'Scalira', 'Embervane', 'Glacindra', 'Stormveil', 'Aurindra',
      'Infernara', 'Volcanara', 'Cindrath', 'Frostyne', 'Tempestara', 'Iridara',
      'Smoldrina', 'Cracklara', 'Thalindra',
    ],
  },

  // ── DragonBoy ──────────────────────────────────────────────────────────────
  DRAGON_BOY: {
    male: [
      'Pyranthan', 'Scaliron', 'Embervane', 'Glacindor', 'Stormveil', 'Aurindar',
      'Infernaron', 'Volcanaron', 'Cindrath', 'Frostynes', 'Tempestaron', 'Iridaron',
      'Smoldrin', 'Cracklaron', 'Thalindar',
    ],
    female: [],
  },

  // ── Goddess ────────────────────────────────────────────────────────────────
  GODDESS: {
    male: [],
    female: [
      'Solara', 'Lunaris', 'Aetheryn', 'Divinia', 'Caelestis', 'Seraphiel',
      'Luminae', 'Auroryn', 'Celestara', 'Radiantis', 'Empyria', 'Elysia',
      'Sacrada', 'Gloriana', 'Benedara',
    ],
  },

  // ── God ────────────────────────────────────────────────────────────────────
  GOD: {
    male: [
      'Solaron', 'Lunaris', 'Aetheryn', 'Divinus', 'Caelestis', 'Seraphiel',
      'Luminar', 'Auroron', 'Celestaron', 'Radiantis', 'Empyron', 'Elysion',
      'Sacrador', 'Glorian', 'Benedar',
    ],
    female: [],
  },

  // ── Mixed ──────────────────────────────────────────────────────────────────
  // Mixed heritage draws from a blended pool of human + elf as primary fallback.
  MIXED: {
    male: [
      'Aldric', 'Caelan', 'Elan', 'Faelvir', 'Garrett', 'Haedrin', 'Ivan',
      'Laerith', 'Maren', 'Noel', 'Osric', 'Raelith', 'Soren', 'Taren',
      'Vance', 'Wren', 'Yoren', 'Zael', 'Caelwyn', 'Ithion',
    ],
    female: [
      'Aelith', 'Brynn', 'Caelynne', 'Dara', 'Elara', 'Faelwyn', 'Gwyn',
      'Hessa', 'Isra', 'Jowyn', 'Kira', 'Laeriel', 'Mira', 'Nara',
      'Oryn', 'Petra', 'Rhea', 'Saya', 'Tara', 'Una',
    ],
  },
};

/**
 * Draws a random name from the race+gender pool.
 * Falls back to a tagged placeholder if the pool is absent or empty
 * (e.g. a DEVIL_GIRL with gender=Male has no name pool).
 */
export function drawName(race: Race, sex: 'male' | 'female'): string {
  const pool = NAME_POOLS[race];
  const list = pool?.[sex];
  if (!list || list.length === 0) {
    // Fallback: Human pool for Mixed/empty slots
    const fallback = NAME_POOLS['HUMAN'][sex];
    if (fallback.length > 0) return fallback[Math.floor(Math.random() * fallback.length)];
    return `${race}_${sex}_${Math.floor(Math.random() * 1000)}`;
  }
  return list[Math.floor(Math.random() * list.length)];
}
