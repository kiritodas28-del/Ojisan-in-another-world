/**
 * dialogueFragments.ts
 * Hardcoded encounter response variants for non-intimate scenes.
 *
 * Structure:
 *   Non-quest keys: 2-3 variant strings per bucket.
 *   Quest keys:     1 string per bucket (single authored line).
 *
 * Content is intentionally deferred — all buckets are stubbed empty pending
 * the lore/world doc review session. The picker falls back gracefully.
 *
 * Task 13.4
 */

// ─── Fragment library ─────────────────────────────────────────────────────────
// Keys follow the convention: '<category>_<context>'.
// Non-quest keys get 2-3 variants; quest keys get exactly 1.
// All buckets are empty until the content session populates them.

export const DIALOGUE_FRAGMENTS: Record<string, string[]> = {
  // ── NPC Greetings ──────────────────────────────────────────────────────────
  generic_greeting:          [], // fallback — always present even when empty
  greeting_anonymous:        [], // player has not been introduced to this NPC
  greeting_named:            [], // player has been introduced; NPC knows their name

  // ── Social action acknowledgements ────────────────────────────────────────
  flirt_acknowledge:         [], // NPC responds to a flirt action
  touch_acknowledge:         [], // NPC responds to a touch action
  gift_acknowledge:          [], // NPC responds to receiving a gift

  // ── Encounter outcomes (non-quest) ────────────────────────────────────────
  ambush_triggered:          [], // player walked into an ambush tile
  chest_found:               [], // player interacted with a chest
  trap_triggered:            [], // player stepped on a trap

  intimidate_success:        [], // intimidation roll succeeded
  intimidate_fail:           [], // intimidation roll failed

  flee_success:              [], // player successfully fled from encounter
  flee_fail:                 [], // flee attempt failed; counter-attack incoming

  // ── Quest-specific (single variant each) ─────────────────────────────────
  // Authored one per quest node; populated during quest content session.
  // Keys follow the pattern: 'quest_<questId>_<nodeKey>'.
  // None authored yet — deferred pending task 11.5 quest data session.
};

// ─── Picker ───────────────────────────────────────────────────────────────────

/**
 * Returns a random string from the bucket matching `key`, or falls back to
 * `generic_greeting` if the key is missing or the bucket is empty.
 * Returns undefined only if both the requested bucket and the fallback are empty.
 */
export function pickDialogueFragment(
  key: string,
  rng?: () => number,
): string | undefined {
  const random = rng ?? Math.random;
  const bucket = DIALOGUE_FRAGMENTS[key];
  if (bucket && bucket.length > 0) {
    return bucket[Math.floor(random() * bucket.length)];
  }
  // Fallback to generic_greeting
  const fallback = DIALOGUE_FRAGMENTS['generic_greeting'];
  if (fallback && fallback.length > 0) {
    return fallback[Math.floor(random() * fallback.length)];
  }
  return undefined;
}
