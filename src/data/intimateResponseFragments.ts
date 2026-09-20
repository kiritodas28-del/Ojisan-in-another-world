/**
 * intimateResponseFragments.ts
 * Composite-key + fallback-chain fragment repository for intimate encounter responses.
 *
 * Separate from intimacyFragments.ts, which covers scene-level non-intimate fragments.
 *
 * SIX LAYERS:
 *   NARRATION      -- third-person scene narration; action + tec + engagement context
 *   BODY_POSITION  -- position framing; action-agnostic; picked once on position entry/change
 *   BODY_ACTION    -- action-specific physical response; arousal + repeat + orgasm context
 *   SFX            -- sound effects; action + wetness context
 *   VOCAL          -- partner vocal response; most nuanced layer; race overlay supported
 *   PLAYER_LINE    -- short player assertive/dominant line; omitted if dirtyTalkTendency=None
 *
 * KEY SCHEME:
 *   <layer>:<segment>:<segment>...  (snake_case, no spaces)
 *   Fallback chain walks from most-specific to least-specific.
 *   pickIntimateFragment() returns the first non-empty bucket hit, or undefined on total miss.
 *
 * ALL BUCKETS STUBBED EMPTY -- content deferred to lore/world doc review session.
 *
 * Tasks 13.5 / 13.6 / 13.7 / 13.8
 */

import type {
  WetnessLevel,
  OrgasmType,
  PostOrgasmSensitivity,
  ResistanceProfileType,
  BondType,
  Race,
  DirtyTalkTendency,
  VocalTendency,
} from '../spawn-engine/types/enums';
import type { PartnerEngagementStatus, SceneStartType } from '../engines/intimacyEngine';

// ─── Layer enum ───────────────────────────────────────────────────────────────

export enum IntimateResponseLayer {
  NARRATION      = 'narration',
  BODY_POSITION  = 'body_pos',
  BODY_ACTION    = 'body_act',
  SFX            = 'sfx',
  VOCAL          = 'vocal',
  PLAYER_LINE    = 'player',
}

// ─── Context interface ────────────────────────────────────────────────────────

export interface IntimateFragmentContext {
  actionId:                string;
  positionId:              string;
  positionChanged:         boolean;   // true when position changed this turn; gates BODY_POSITION pick
  bodyZone:                string;    // action.bodyPartTargeted

  tecSuccess:              boolean;

  // Derived bands (caller computes from raw values)
  arousalBand:             'low' | 'mid' | 'high' | 'edge';  // low:0-30 mid:31-65 high:66-85 edge:86-100
  wetnessLevel:            WetnessLevel;
  shameTier:               'low' | 'mid' | 'high';           // low:<30 mid:30-65 high:>65

  isOrgasming:             boolean;
  orgasmType?:             OrgasmType;

  subspaceActive:          boolean;
  neckGrabActive:          boolean;
  postOrgasmState:         PostOrgasmSensitivity;
  partnerEngagementStatus: PartnerEngagementStatus;
  sceneStartType:          SceneStartType;
  resistanceProfileType:   ResistanceProfileType;
  hiddenDesireAligned:     boolean;
  playerBondType?:         BondType;
  partnerRace?:            Race;
  orgasmDeniedThisScene:   boolean;

  // From IntimacyScene.consecutiveRepeatCount; drives discovery/habituation/overstimulation tier
  consecutiveRepeatCount:  number;

  // From NpcPartnerProfile vocal profile (typed unknown until 3a.8 resolves)
  dirtyTalkTendency:       DirtyTalkTendency;
  vocalTendency:           VocalTendency;
}

// ─── Response shape ───────────────────────────────────────────────────────────

export interface IntimateResponse {
  narration?:    string;   // NARRATION layer pick
  bodyPosition?: string;   // BODY_POSITION layer pick (only when positionChanged)
  bodyAction?:   string;   // BODY_ACTION layer pick
  sfx?:          string;   // SFX layer pick
  vocal?:        string;   // VOCAL layer pick
  playerLine?:   string;   // PLAYER_LINE layer pick (omitted when dirtyTalkTendency=None)
}

// ─── Fragment library ─────────────────────────────────────────────────────────
// All buckets stubbed empty. Populated during lore/world doc review session.
// Keys match the output of buildIntimateKey() exactly.
// Add authored string arrays here when content sessions produce them.

export const INTIMATE_RESPONSE_LIBRARY: Record<string, string[]> = {};

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Monster-species races that get the race overlay in the VOCAL chain.
const MONSTER_RACES = new Set<Race>([
  'SUCCUBUS' as Race,
  'INCUBUS'  as Race,
  'FOX_GIRL' as Race,
  'FOX_BOY'  as Race,
  'WOLF_GIRL' as Race,
  'WOLF_BOY'  as Race,
  'COW_GIRL'  as Race,
  'COW_BOY'   as Race,
  'DRAGON_GIRL' as Race,
  'DRAGON_BOY'  as Race,
  'DEMON'     as Race,
  'ORC'       as Race,
  'GOBLIN'    as Race,
]);

function repeatTier(count: number): 'once' | 'repeat' | 'extended' {
  if (count <= 1) return 'once';
  if (count === 2) return 'repeat';
  return 'extended';
}

// ─── Key builder (task 13.6) ─────────────────────────────────────────────────

/**
 * Builds a fallback chain of candidate fragment keys for the given layer.
 * Chain runs from most-specific to least-specific.
 * pickIntimateFragment() walks this array and returns the first hit.
 */
export function buildIntimateKey(
  layer: IntimateResponseLayer,
  ctx: IntimateFragmentContext,
): string[] {
  const {
    actionId, positionId, bodyZone, tecSuccess,
    arousalBand, wetnessLevel, shameTier,
    isOrgasming, orgasmType, subspaceActive,
    partnerEngagementStatus, partnerRace,
    consecutiveRepeatCount, dirtyTalkTendency,
  } = ctx;

  const rt   = repeatTier(consecutiveRepeatCount);
  const band = arousalBand;
  const wet  = wetnessLevel.toLowerCase();
  const eng  = partnerEngagementStatus.toLowerCase();
  const orgT = orgasmType?.toLowerCase() ?? 'clitoral';

  switch (layer) {

    // ── NARRATION ────────────────────────────────────────────────────────────
    case IntimateResponseLayer.NARRATION: {
      const chain: string[] = [];
      if (!tecSuccess)
        chain.push(`narration:${actionId}:tec_fail`);
      chain.push(
        `narration:${actionId}:engagement_${eng}`,
        `narration:${actionId}`,
        'narration:generic',
      );
      return chain;
    }

    // ── BODY_POSITION ────────────────────────────────────────────────────────
    // Position framing; action-agnostic. Picked once per position change.
    case IntimateResponseLayer.BODY_POSITION: {
      return [
        `body_pos:${positionId}:arousal_${band}`,
        `body_pos:${positionId}`,
        'body_pos:generic',
      ];
    }

    // ── BODY_ACTION ──────────────────────────────────────────────────────────
    case IntimateResponseLayer.BODY_ACTION: {
      const chain: string[] = [];
      if (isOrgasming)
        chain.push(`body_act:${actionId}:orgasm:${orgT}`);
      if (subspaceActive)
        chain.push(`body_act:${actionId}:arousal_${band}:subspace`);
      chain.push(
        `body_act:${actionId}:arousal_${band}:${rt}`,
        `body_act:${actionId}:arousal_${band}`,
        `body_act:${bodyZone}:arousal_${band}`,
        `body_act:generic:arousal_${band}`,
        'body_act:generic',
      );
      return chain;
    }

    // ── SFX ──────────────────────────────────────────────────────────────────
    case IntimateResponseLayer.SFX: {
      return [
        `sfx:${actionId}:wetness_${wet}`,
        `sfx:${actionId}`,
        'sfx:generic',
      ];
    }

    // ── VOCAL ─────────────────────────────────────────────────────────────────
    // Race overlay: if partnerRace is a monster species, each base key is
    // also tried with a 'vocal:race_<race>:' prefix first.
    case IntimateResponseLayer.VOCAL: {
      // Base chain (most-specific to least)
      const baseChain: string[] = [];
      if (isOrgasming)
        baseChain.push(`vocal:${actionId}:orgasm:${orgT}`);
      if (subspaceActive)
        baseChain.push(`vocal:${actionId}:subspace`);
      baseChain.push(
        `vocal:${actionId}:shame_${shameTier}:arousal_${band}:${rt}`,
        `vocal:${actionId}:arousal_${band}:${rt}`,
        `vocal:${actionId}:arousal_${band}`,
        `vocal:${actionId}`,
        `vocal:generic:shame_${shameTier}:arousal_${band}`,
        'vocal:generic',
      );

      // If monster race: interleave race-prefixed keys before each base key
      if (partnerRace && MONSTER_RACES.has(partnerRace)) {
        const raceSlug = `race_${partnerRace.toLowerCase()}`;
        const withRace: string[] = [];
        for (const key of baseChain) {
          // Insert race-prefixed variant before the base key
          withRace.push(key.replace(/^vocal:/, `vocal:${raceSlug}:`));
          withRace.push(key);
        }
        return withRace;
      }

      return baseChain;
    }

    // ── PLAYER_LINE ───────────────────────────────────────────────────────────
    // Short assertive/dominant player line. Caller skips this layer when
    // dirtyTalkTendency === 'NONE'.
    case IntimateResponseLayer.PLAYER_LINE: {
      const chain: string[] = [];
      if (!tecSuccess)
        chain.push(`player:${actionId}:tec_fail`);
      chain.push(
        `player:${actionId}:arousal_${band}`,
        `player:${actionId}`,
        'player:generic',
      );
      return chain;
    }
  }
}

// ─── Picker (task 13.7) ───────────────────────────────────────────────────────

/**
 * Walks the fallback chain for `layer` and returns a random string from the
 * first non-empty bucket, or undefined if all buckets miss.
 */
export function pickIntimateFragment(
  layer: IntimateResponseLayer,
  ctx: IntimateFragmentContext,
  rng?: () => number,
): string | undefined {
  const random = rng ?? Math.random;
  const chain  = buildIntimateKey(layer, ctx);
  for (const key of chain) {
    const bucket = INTIMATE_RESPONSE_LIBRARY[key];
    if (bucket && bucket.length > 0) {
      return bucket[Math.floor(random() * bucket.length)];
    }
  }
  return undefined;
}

// ─── Assembler (task 13.8) ───────────────────────────────────────────────────

/**
 * Assembles a full IntimateResponse from all six layers.
 *
 * BODY_POSITION is only picked when ctx.positionChanged === true.
 * PLAYER_LINE is skipped when ctx.dirtyTalkTendency === 'NONE'.
 *
 * All fields are optional; undefined when the bucket chain produces no hit.
 * This is the single call-site for the intimacy view's scene narrative panel.
 * Called by the dispatcher after resolveSceneAction() returns context.
 */
export function assembleIntimateResponse(
  ctx: IntimateFragmentContext,
  rng?: () => number,
): IntimateResponse {
  const response: IntimateResponse = {};

  response.narration = pickIntimateFragment(IntimateResponseLayer.NARRATION, ctx, rng);

  if (ctx.positionChanged) {
    response.bodyPosition = pickIntimateFragment(IntimateResponseLayer.BODY_POSITION, ctx, rng);
  }

  response.bodyAction = pickIntimateFragment(IntimateResponseLayer.BODY_ACTION, ctx, rng);
  response.sfx        = pickIntimateFragment(IntimateResponseLayer.SFX, ctx, rng);
  response.vocal      = pickIntimateFragment(IntimateResponseLayer.VOCAL, ctx, rng);

  // PLAYER_LINE: omit entirely when dirtyTalkTendency is None
  if (ctx.dirtyTalkTendency !== ('NONE' as DirtyTalkTendency)) {
    response.playerLine = pickIntimateFragment(IntimateResponseLayer.PLAYER_LINE, ctx, rng);
  }

  return response;
}

// ─── Context builder helper ────────────────────────────────────────────────────
// Convenience: derive the computed band fields from raw scene values.
// Caller uses this to build a context before calling assembleIntimateResponse().

export function deriveArousalBand(arousal: number): IntimateFragmentContext['arousalBand'] {
  if (arousal <= 30) return 'low';
  if (arousal <= 65) return 'mid';
  if (arousal <= 85) return 'high';
  return 'edge';
}

export function deriveShameTier(shame: number): IntimateFragmentContext['shameTier'] {
  if (shame < 30) return 'low';
  if (shame <= 65) return 'mid';
  return 'high';
}
