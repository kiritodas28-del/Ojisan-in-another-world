/**
 * CharacterCreationView.tsx
 * Task 26.25 — Character creation view stub.
 *
 * Three steps: Name → Stat allocation → Confirm.
 * Uses StatAllocator (Task 26.27) for the stat step.
 * Wiring to tRPC NEW_GAME intent deferred to UI-11 integration phase.
 */

import { useState } from 'react';
import { StatAllocator } from '../components/StatAllocator';
import type { CoreStatKey } from '../../../state/gameState';

const EMPTY_STATS = (): Record<CoreStatKey, number> => ({
  str: 0, dex: 0, agi: 0, int: 0, wil: 0, per: 0, end: 0,
});

interface CharacterCreationViewProps {
  onComplete: (name: string, stats: Record<CoreStatKey, number>) => void;
  onCancel?:  () => void;
}

type Step = 'name' | 'stats' | 'confirm';

export function CharacterCreationView({ onComplete, onCancel }: CharacterCreationViewProps) {
  const [step,  setStep]  = useState<Step>('name');
  const [name,  setName]  = useState('');
  const [stats, setStats] = useState<Record<CoreStatKey, number>>(EMPTY_STATS());

  const spent = Object.values(stats).reduce((s, v) => s + v, 0);
  const FREE_POINTS = 10;
  const allSpent = spent === FREE_POINTS;

  const confirm = () => onComplete(name.trim() || 'Ojisan', stats);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-950">
      <div className="bg-stone-900 border border-stone-700 rounded-xl p-6 w-80 flex flex-col gap-5">

        {/* Header */}
        <div>
          <h2 className="text-stone-100 font-semibold text-lg">New Game</h2>
          <p className="text-stone-500 text-xs mt-0.5">
            {step === 'name'    ? 'Step 1 of 3 — Name your character'
           : step === 'stats'   ? 'Step 2 of 3 — Allocate stats'
           : 'Step 3 of 3 — Confirm your build'}
          </p>
        </div>

        {/* Step: Name */}
        {step === 'name' && (
          <div className="flex flex-col gap-2">
            <label className="text-stone-400 text-xs">Character name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={24}
              placeholder="Ojisan"
              className="bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm outline-none focus:border-stone-400"
            />
          </div>
        )}

        {/* Step: Stats */}
        {step === 'stats' && (
          <StatAllocator
            freePoints={FREE_POINTS}
            value={stats}
            onChange={setStats}
          />
        )}

        {/* Step: Confirm */}
        {step === 'confirm' && (
          <div className="flex flex-col gap-1 text-xs">
            <p className="text-stone-400 mb-2">Review your build:</p>
            <p className="text-stone-200"><span className="text-stone-500">Name </span>{name || 'Ojisan'}</p>
            {(Object.entries(stats) as [CoreStatKey, number][]).map(([k, v]) => (
              <p key={k} className="text-stone-200">
                <span className="text-stone-500 w-24 inline-block capitalize">{k} </span>{v}
              </p>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-2 mt-1">
          {step !== 'name' && (
            <button
              onClick={() => setStep(step === 'confirm' ? 'stats' : 'name')}
              className="flex-1 py-2 rounded border border-stone-700 text-stone-400 text-xs hover:bg-stone-800 transition-colors"
            >
              Back
            </button>
          )}
          {step === 'name' && (
            <button
              onClick={() => setStep('stats')}
              disabled={!name.trim()}
              className="flex-1 py-2 rounded border border-stone-600 text-stone-200 text-xs hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          )}
          {step === 'stats' && (
            <button
              onClick={() => setStep('confirm')}
              disabled={!allSpent}
              className="flex-1 py-2 rounded border border-stone-600 text-stone-200 text-xs hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          )}
          {step === 'confirm' && (
            <button
              onClick={confirm}
              className="flex-1 py-2 rounded border border-amber-700 text-amber-300 text-xs hover:bg-amber-950 transition-colors"
            >
              Begin
            </button>
          )}
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-stone-600 text-xs hover:text-stone-400 text-center -mt-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
