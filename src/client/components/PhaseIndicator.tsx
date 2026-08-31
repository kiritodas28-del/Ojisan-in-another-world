/**
 * PhaseIndicator.tsx
 * Five-segment bar showing the current day phase and action count within it.
 * Task UI-3.7
 */

import type { DayPhase } from '../../state/gameState';

const PHASES: DayPhase[] = ['Morning', 'Afternoon', 'Evening', 'Night', 'Midnight'];

const PHASE_COLOUR: Record<DayPhase, string> = {
  Morning:   'bg-amber-400',
  Afternoon: 'bg-yellow-500',
  Evening:   'bg-orange-600',
  Night:     'bg-indigo-700',
  Midnight:  'bg-violet-900',
};

interface PhaseIndicatorProps {
  currentPhase:    DayPhase;
  actionCount:     number;
  phaseActionLimit: number;
  className?:      string;
}

export function PhaseIndicator({
  currentPhase,
  actionCount,
  phaseActionLimit,
  className = '',
}: PhaseIndicatorProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex gap-0.5 rounded overflow-hidden h-2">
        {PHASES.map((phase) => {
          const isActive = phase === currentPhase;
          const isPast   = PHASES.indexOf(phase) < PHASES.indexOf(currentPhase);
          return (
            <div
              key={phase}
              className={`flex-1 transition-all duration-200 ${
                isActive
                  ? PHASE_COLOUR[phase]
                  : isPast
                    ? 'bg-stone-600'
                    : 'bg-stone-800'
              }`}
              title={phase}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-stone-500">
        <span>{currentPhase}</span>
        <span className="tabular-nums">{actionCount}<span className="text-stone-700">/{phaseActionLimit}</span></span>
      </div>
    </div>
  );
}
