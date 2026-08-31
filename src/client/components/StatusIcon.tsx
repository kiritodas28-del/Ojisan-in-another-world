/**
 * StatusIcon.tsx
 * Small icon for active status effects with stack count and remaining turns.
 * Replace the letter-initial placeholder with real icons when assets are available.
 * Task UI-3.6
 */

import type { ActiveStatusEffect } from '../../state/gameState';

interface StatusIconProps {
  effect:    ActiveStatusEffect;
  className?: string;
}

export function StatusIcon({ effect, className = '' }: StatusIconProps) {
  const initial = effect.defId.charAt(0).toUpperCase();

  return (
    <div
      className={`relative w-6 h-6 rounded bg-stone-700 border border-stone-600 flex items-center justify-center ${className}`}
      title={`${effect.defId} (${effect.remainingTurns} turns, ×${effect.stacks})`}
    >
      <span className="text-[10px] font-bold text-stone-300">{initial}</span>
      {effect.stacks > 1 && (
        <span className="absolute -top-1 -right-1 bg-amber-600 text-amber-50 text-[8px] font-bold rounded-full w-3 h-3 flex items-center justify-center leading-none">
          {effect.stacks}
        </span>
      )}
      <span className="absolute -bottom-1 -right-1 bg-stone-900 text-stone-400 text-[8px] rounded px-0.5 leading-none border border-stone-700">
        {effect.remainingTurns}
      </span>
    </div>
  );
}

interface StatusIconRowProps {
  effects:   ActiveStatusEffect[];
  className?: string;
}

export function StatusIconRow({ effects, className = '' }: StatusIconRowProps) {
  if (effects.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {effects.map((e, i) => (
        <StatusIcon key={`${e.defId}-${i}`} effect={e} />
      ))}
    </div>
  );
}
