/**
 * economyEngine.ts
 * Item catalog, buy/sell, gifting, inventory slot management.
 *
 * TODO (Task 10.3): Full implementation.
 *
 * Sell price formula (PRD §4.8):
 *   sellPrice = itemBaseSellValue × shopDiscount
 *   shopDiscount default = 0.5; modified by reputation + Bargaining skill
 *
 * Inventory: 20 base slots; +5 per Manor tier above tier 2
 * Quest items don't occupy slots.
 * Overflow: manual pickup rejected; combat loot auto-converted to gold at base sell value.
 */

import type { GameState, GameEvent } from '../state/gameState';

// ─── Item schema (PRD §4.8) ───────────────────────────────────────────────────
export type ItemType = 'WEAPON' | 'ARMOR' | 'CONSUMABLE' | 'MATERIAL' | 'GIFT' | 'QUEST';

export interface ItemEffect {
  type: string;
  value: number;
  stat?: string;
}

export interface ItemDef {
  id: string;
  name: string;
  type: ItemType;
  stackMax: number;       // 1 for non-stackable
  baseBuyValue: number;
  baseSellValue: number;
  effects?: ItemEffect[];
}

// ─── Engine entry points (stubs) ──────────────────────────────────────────────
export function calcSellPrice(item: ItemDef, shopDiscount = 0.5): number {
  return Math.floor(item.baseSellValue * shopDiscount);
}

export function buyItem(
  _gameState: GameState,
  _itemId: string,
  _qty: number,
  _shopId: string,
): { state: GameState; events: GameEvent[] } {
  throw new Error('buyItem() not yet implemented');
}

export function sellItem(
  _gameState: GameState,
  _itemId: string,
  _qty: number,
  _shopId: string,
): { state: GameState; events: GameEvent[] } {
  throw new Error('sellItem() not yet implemented');
}

export function useItem(
  _gameState: GameState,
  _itemId: string,
  _targetId?: string,
): { state: GameState; events: GameEvent[] } {
  throw new Error('useItem() not yet implemented');
}

export function calcInventorySlotCap(manorTier: number): number {
  // 20 base + 5 per tier above 2
  return 20 + Math.max(0, manorTier - 2) * 5;
}
