/**
 * StatAllocator.tsx
 * Task 26.27 — 7-stat point allocation primitive for CharacterCreationView.
 *
 * Displays each CoreStatKey as a labelled row with +/- buttons.
 * Props:
 *   freePoints:    total points available (default 10)
 *   value:         current allocation Record<CoreStatKey, number>
 *   onChange:      called on every allocation change
 */

import { useState } from 'react';
import type { CoreStatKey } from '../../../state/gameState';

const STAT_LABELS: Record<CoreStatKey, string> = {
  str: 'Strength',
  dex: 'Dexterity',
  agi: 'Agility',
  int: 'Intellect',
  wil: 'Willpower',
  per: 'Perception',
  end: 'Endurance',
};

const STAT_KEYS: CoreStatKey[] = ['str', 'dex', 'agi', 'int', 'wil', 'per', 'end'];

interface StatAllocatorProps {
  freePoints?: number;
  value:       Partial<Record<CoreStatKey, number>>;
  onChange:    (newValue: Record<CoreStatKey, number>) => void;
}

export function StatAllocator({ freePoints = 10, value, onChange }: StatAllocatorProps) {
  const allocation = STAT_KEYS.reduce((acc, k) => ({ ...acc, [k]: value[k] ?? 0 }), {} as Record<CoreStatKey, number>);
  const spent      = STAT_KEYS.reduce((s, k) => s + (allocation[k] ?? 0), 0);
  const remaining  = freePoints - spent;

  const handleIncrement = (stat: CoreStatKey) => {
    if (remaining <= 0 || allocation[stat] >= 5) return;
    onChange({ ...allocation, [stat]: allocation[stat] + 1 });
  };

  const handleDecrement = (stat: CoreStatKey) => {
    if (allocation[stat] <= 0) return;
    onChange({ ...allocation, [stat]: allocation[stat] - 1 });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs text-stone-500 mb-1">
        <span>Allocate stats</span>
        <span className={remaining === 0 ? 'text-amber-400' : 'text-stone-400'}>
          {remaining} point{remaining !== 1 ? 's' : ''} remaining
        </span>
      </div>
      {STAT_KEYS.map(k => (
        <div key={k} className="flex items-center justify-between">
          <span className="text-stone-300 text-xs w-24">{STAT_LABELS[k]}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDecrement(k)}
              disabled={allocation[k] <= 0}
              className="w-6 h-6 rounded border border-stone-700 text-stone-400 text-xs hover:bg-stone-800 disabled:opacity-30 transition-colors"
            >−</button>
            <span className="w-4 text-center text-stone-200 text-sm font-medium">
              {allocation[k]}
            </span>
            <button
              onClick={() => handleIncrement(k)}
              disabled={remaining <= 0 || allocation[k] >= 5}
              className="w-6 h-6 rounded border border-stone-700 text-stone-400 text-xs hover:bg-stone-800 disabled:opacity-30 transition-colors"
            >+</button>
          </div>
        </div>
      ))}
    </div>
  );
}
