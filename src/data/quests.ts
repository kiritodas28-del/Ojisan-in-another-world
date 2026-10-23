/**
 * quests.ts
 * Static quest definition schema and catalog.
 *
 * PRD §4.6 — Quests & Story
 *
 * Schema types are imported by questEngine.ts for all catalog lookups.
 * Quest data (authored entries) will be added in a later session.
 *
 * Phase 11 — Tasks 11.1, 11.5 (schema; data deferred)
 */

// ─── Objective definition ─────────────────────────────────────────────────────
// One objective = one trackable goal within a quest.
// `targetId` semantics per type:
//   KILL     → monster/enemy type id (matches ENEMY_KILLED event targetId)
//   COLLECT  → item id (matches ITEM_COLLECTED event itemId)
//   TALK     → npcId (matches DIALOGUE_COMPLETED event speakerNpcId)
//   INTERACT → object or npcId (matched by dispatcher; context-dependent)
//   ESCORT   → npcId of the escortee (completion triggered externally)
//   TRAVEL   → worldNodeId (matches TRAVEL_NODE_REACHED event worldNodeId)
export interface ObjectiveDef {
  readonly type:     'KILL' | 'COLLECT' | 'TALK' | 'INTERACT' | 'ESCORT' | 'TRAVEL';
  readonly targetId: string;
  readonly count:    number;  // required completions; TALK/INTERACT/TRAVEL typically 1
  readonly label:    string;  // UI display text (e.g. "Defeat 5 forest wolves")
}

// ─── Quest reward ─────────────────────────────────────────────────────────────
// Applied atomically by grantQuestReward() when all objectives are met.
// `items` is an array of itemId strings; economyEngine.addItem() handles stacking.
// `flagsSet` writes to gameState.flags[key] = true for story progression gates.
// `reputationEvents` is a list of event keys from REPUTATION_EVENT_TABLE applied
// in the current region; use sparingly (quests primarily grant COMPLETE_BOARD_QUEST).
// `charterXP` (Phase 31): optional Charter XP award on completion.
//   Set on quests that advance Wayfarer Charter standing (board bounties, storyline
//   missions, exploration contracts). Omit on quests with no charter relevance.
export interface QuestReward {
  readonly gold:             number;
  readonly xp:               number;
  readonly items:            string[];                          // itemIds to add to inventory
  readonly flagsSet:         Record<string, boolean>;           // flags to set on completion
  readonly reputationEvents: string[];                          // keys from REPUTATION_EVENT_TABLE
  readonly charterXP?:       number;                           // Phase 31: optional charter XP
  readonly divinity?:         number;                           // Phase 32: optional divinity award
  // Phase 36 (task 36a+): optional god status effects applied on quest completion.
  // Data-driven parallel to reputationEvents; questEngine.grantQuestReward() iterates
  // and calls godStatusEngine for each entry.
  // enslaverId is required when action is 'ENSLAVE'.
  readonly godStatusEffects?: ReadonlyArray<{
    readonly godId:       string;
    readonly action:      'ENSLAVE' | 'FREE' | 'KILL';
    readonly enslaverId?: string;
  }>;
}

// ─── Quest definition ─────────────────────────────────────────────────────────
// Static, authored per quest. Never mutated at runtime.
// `prerequisites` is an array of defIds that must all be COMPLETED before this
// quest appears as AVAILABLE.
// `cooldownDays` is only meaningful for BOARD quests; ignored on MAIN/COMPANION.
export interface QuestDef {
  readonly id:           string;
  readonly type:         'MAIN' | 'COMPANION' | 'BOARD';
  readonly title:        string;
  readonly description:  string;
  readonly objectives:   ObjectiveDef[];
  readonly reward:       QuestReward;
  readonly prerequisites: string[];  // defIds that must be COMPLETED first
  readonly cooldownDays?: number;    // BOARD only: days before repeatable again
}

// ─── Catalog ──────────────────────────────────────────────────────────────────
// Populated in a future session. questEngine.loadQuestDef() reads from here.
// Key = QuestDef.id for O(1) lookup.
export const QUEST_CATALOG: Readonly<Record<string, QuestDef>> = {
  // Quest data will be authored here in a later session (task 11.5).
};
