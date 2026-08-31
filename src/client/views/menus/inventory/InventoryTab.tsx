/**
 * InventoryTab.tsx
 * Item grid with quantity badges; selected item shows equip/use/drop actions; gold display.
 * Task UI-9.2
 */

import { useState } from 'react';
import { useGameState } from '../../../hooks/useGameState';
import { Panel }        from '../../../components/Panel';
import { Button }       from '../../../components/Button';

export function InventoryTab() {
  const gameState = useGameState();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!gameState) return null;

  const { inventory, gold, inventorySlots } = gameState.player;
  const selected = selectedIdx !== null ? inventory[selectedIdx] : null;

  return (
    <div className="flex gap-4 h-full">

      {/* Grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-stone-500">{inventory.length} / {inventorySlots} slots</span>
          <span className="text-amber-400 text-sm font-semibold">🪙 {gold}</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {inventory.map((slot, i) => (
            <button
              key={i}
              onClick={() => setSelectedIdx(i === selectedIdx ? null : i)}
              className={`
                relative aspect-square flex flex-col items-center justify-center rounded border text-xs transition-colors
                ${i === selectedIdx
                  ? 'bg-amber-900/40 border-amber-600 text-amber-300'
                  : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                }
              `}
            >
              <span className="text-2xl">📦</span>
              <span className="truncate w-full text-center px-1 mt-1">{slot.itemId}</span>
              {slot.quantity > 1 && (
                <span className="absolute top-1 right-1 bg-stone-600 text-stone-200 text-[9px] rounded px-1">
                  ×{slot.quantity}
                </span>
              )}
            </button>
          ))}
          {/* Empty slots */}
          {Array.from({ length: Math.max(0, inventorySlots - inventory.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square rounded border border-stone-800 bg-stone-950/50" />
          ))}
        </div>
      </div>

      {/* Selected item actions */}
      <div className="w-48 shrink-0">
        {selected ? (
          <Panel title="Selected">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-stone-200 font-medium text-sm">{selected.itemId}</p>
                <p className="text-stone-500 text-xs mt-1">Quantity: {selected.quantity}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button label="Use"   onClick={() => {}} variant="primary"   />
                <Button label="Equip" onClick={() => {}} variant="secondary" />
                <Button label="Drop"  onClick={() => {}} variant="danger"    />
              </div>
            </div>
          </Panel>
        ) : (
          <Panel>
            <p className="text-stone-600 text-xs italic text-center py-4">Select an item</p>
          </Panel>
        )}
      </div>
    </div>
  );
}
