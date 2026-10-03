/**
 * TitleScreenView.tsx
 * Task 26.24 — Title screen stub.
 *
 * Renders the game title, New Game / Continue buttons, and version string.
 * Wiring to tRPC / save-load deferred to UI-11 integration phase.
 */

import type { GameState } from '../../../state/gameState';

interface TitleScreenViewProps {
  onNewGame:   () => void;
  onContinue?: () => void;
  hasSave:     boolean;
}

export function TitleScreenView({ onNewGame, onContinue, hasSave }: TitleScreenViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-950 gap-8">
      <div className="text-center">
        <h1 className="text-stone-100 text-5xl font-bold tracking-widest mb-2">
          OJISAN
        </h1>
        <p className="text-stone-500 text-sm tracking-wider">IN ANOTHER WORLD</p>
      </div>

      <div className="flex flex-col gap-3 w-48">
        <button
          onClick={onNewGame}
          className="py-3 rounded border border-stone-600 text-stone-200 text-sm hover:bg-stone-800 transition-colors"
        >
          New Game
        </button>
        {hasSave && (
          <button
            onClick={onContinue}
            className="py-3 rounded border border-amber-700 text-amber-300 text-sm hover:bg-amber-950 transition-colors"
          >
            Continue
          </button>
        )}
      </div>

      <p className="text-stone-700 text-xs absolute bottom-4">v0.1-alpha</p>
    </div>
  );
}
