/**
 * intimacyFragments.ts
 * Narrative text fragments for intimacy scene descriptions.
 *
 * Task 6.8 - PRD S4.3
 *
 * Structure:
 *   Fragments are grouped into buckets by (actionId | category) + context.
 *   pickFragment(bucketKey, rng) selects one entry at random.
 *   The intimacy engine calls pickFragment(); the UI displays the result.
 *
 * Bucket key format:
 *   '<actionId>'                      e.g. 'thrust_slow'
 *   '<actionId>_tec_fail'             e.g. 'thrust_fast_tec_fail'
 *   '<actionId>_orgasm'               e.g. 'suck_clit_orgasm'
 *   'scene_start_<startType>'         e.g. 'scene_start_CONSENSUAL'
 *   'scene_end_<satisfactionTier>'    e.g. 'scene_end_high' (80+)
 *                                         'scene_end_mid' (50-79)
 *                                         'scene_end_low' (20-49)
 *                                         'scene_end_fail' (0-19)
 *   'partner_species_<monsterType>'   e.g. 'partner_species_Succubus'
 *
 * TODO: populate each bucket with 4-8 authored fragment strings.
 *       The engine currently falls back to placeholder strings when a
 *       bucket is empty or the key is not found.
 */

// ============================================================
// TYPES
// ============================================================

export type FragmentBucket = string[];

export type FragmentLibrary = Record<string, FragmentBucket>;

// ============================================================
// LIBRARY (stub -- to be authored per bucket)
// ============================================================

export const FRAGMENT_LIBRARY: FragmentLibrary = {

  // ---- Scene starts ----------------------------------------------------------
  scene_start_CONSENSUAL:              [],
  scene_start_FORCE_INTIMACY:          [],
  scene_start_FORCE_INTIMACY_SLEEPING: [],
  scene_start_POST_DEFEAT:             [],

  // ---- Scene ends by satisfaction tier ---------------------------------------
  scene_end_high:   [],   // satisfaction 80-100
  scene_end_mid:    [],   // satisfaction 50-79
  scene_end_low:    [],   // satisfaction 20-49
  scene_end_fail:   [],   // satisfaction 0-19

  // ---- Action fragments ------------------------------------------------------
  thrust_slow:          [],
  thrust_slow_tec_fail: [],
  thrust_slow_orgasm:   [],

  thrust_fast:          [],
  thrust_fast_tec_fail: [],
  thrust_fast_orgasm:   [],

  thrust_deep:          [],
  thrust_deep_tec_fail: [],
  thrust_deep_orgasm:   [],

  anal_thrust:          [],
  anal_thrust_tec_fail: [],

  lick_vagina:          [],
  lick_vagina_orgasm:   [],

  suck_clit:            [],
  suck_clit_tec_fail:   [],
  suck_clit_orgasm:     [],

  lick_anal:            [],
  blowjob_passive:      [],

  finger_vagina:        [],
  finger_vagina_orgasm: [],
  finger_anal:          [],

  rub_clit:             [],
  rub_clit_orgasm:      [],

  stroke_breasts:       [],
  pinch_nipples:        [],
  squeeze_ass:          [],

  kiss:                 [],
  neck_bite:            [],
  whisper:              [],
  caress_body:          [],

  force_hold:           [],
  force_hold_tec_fail:  [],
  hair_pull:            [],
  hair_pull_tec_fail:   [],

  lamia_constrict:      [],

  // ---- Species flavour overlays ----------------------------------------------
  // These are prepended to the action fragment when the partner is a given species.
  // Keys: 'partner_species_<MonsterType>'
  partner_species_Succubus:         [],
  partner_species_Incubus:          [],
  partner_species_YukiOnna:         [],
  partner_species_Oni:              [],
  partner_species_KitsuneCorrupted: [],
  partner_species_Lamia:            [],
  partner_species_Harpy:            [],
};

// ============================================================
// PICKER
// ============================================================

/**
 * Picks a random fragment from the named bucket.
 * Returns undefined if the bucket is empty or the key does not exist.
 * The caller (intimacyEngine) falls back to its own placeholder strings.
 */
export function pickFragment(
  bucketKey: string,
  rng: () => number = Math.random,
): string | undefined {
  const bucket = FRAGMENT_LIBRARY[bucketKey];
  if (!bucket || bucket.length === 0) return undefined;
  return bucket[Math.floor(rng() * bucket.length)];
}

/**
 * Returns the satisfaction tier key for use with scene_end_* buckets.
 */
export function satisfactionTierKey(score: number): string {
  if (score >= 80) return 'scene_end_high';
  if (score >= 50) return 'scene_end_mid';
  if (score >= 20) return 'scene_end_low';
  return 'scene_end_fail';
}
