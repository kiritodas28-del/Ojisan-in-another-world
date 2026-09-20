/**
 * achievements.ts
 * Static achievement catalog and condition type definitions.
 *
 * Pattern: AchievementDef type is owned by achievementEngine.ts (the engine
 * that processes it). This file imports the type and exports the catalog —
 * same pattern as statusEffects.ts / skills.ts / recipes.ts.
 *
 * Catalog authoring: DEFERRED to the lore/world doc review session.
 * All mechanics land now; data is filled in after world/lore content is settled.
 *
 * Closes task 2.29 (schema definition side; data authoring deferred per policy).
 */

import type { AchievementDef } from '../engines/achievementEngine';

// ─── Catalog ──────────────────────────────────────────────────────────────────
// Keyed by achievement id. Empty until lore/world doc review session.
// achievementEngine.ts reads this via getAchievementDef() and iterates it in
// checkAchievements() to evaluate all LOCKED entries each tick.
export const ACHIEVEMENT_CATALOG: Record<string, AchievementDef> = {
  // TODO (Task 20.4 / task 2.29 data pass): author full achievement list here.
  // Minimum target after lore review:
  //   Combat:      first_kill (BRONZE), kills_50 (SILVER), kills_500 (GOLD)
  //   Intimacy:    first_scene (BRONZE), partners_10 (SILVER), max_satisfaction (GOLD)
  //   Relationship: first_close_bond (BRONZE), devoted_partner (GOLD)
  //   World:       discover_10 (BRONZE), discover_all (GOLD)
  //   Special:     purify_all_regions (PLATINUM)
};
