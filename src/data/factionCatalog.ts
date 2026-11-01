/**
 * factionCatalog.ts
 * Phase 41d — Ojisan-specific faction catalog data.
 *
 * The catalog is intentionally empty until the Phase 41d data authoring session.
 * Engines reference FACTION_CATALOG[factionId] and will throw on unknown ids;
 * this is correct behaviour — no faction delta should be applied before the
 * catalog entries are populated.
 *
 * Planned entries (16 total):
 *   adventurer_guild  — wayfarers_charter
 *   mercenary         — gilded_spears, greywatch_company
 *   criminal          — salt_wharf_brotherhood
 *   underground       — veil_hands, free_road
 *   political         — clean_hearth
 *   religious         — seekers_of_the_first_word
 *   academic          — arcane_collegium_of_tessara, runeholm_academy
 *   trade             — house_vesh_network
 *   knightly_order    — crown_templars (patron: varan)
 *                       order_of_the_open_hand (patron: solenne)
 *                       silverbough_wardens (patron: aeloria)
 *                       wild_lodge (patron: thessaly)
 *                       oathkeepers (patron: durgrim)
 *
 * Import topology note:
 *   This file imports FactionDef from factionEngine.ts (same pattern used by
 *   skills.ts → skillEngine.ts, statusEffects.ts → statusEffectEngine.ts, etc.).
 *   factionEngine.ts does NOT import from this file; the catalog is passed as a
 *   parameter to engine functions so engine-core stays lore-agnostic.
 */

import type { FactionDef } from '../engines/factionEngine';

// ─── Faction catalog ──────────────────────────────────────────────────────────
// Keyed by faction id (the same string used in GameState.factions Record keys,
// DialogueEffect factionId fields, and QuestReward.factionDeltas entries).
export const FACTION_CATALOG: Record<string, FactionDef> = {
  // Phase 41d: entries authored here in the data-authoring session.
};
