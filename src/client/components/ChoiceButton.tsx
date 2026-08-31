/**
 * ChoiceButton.tsx
 * Dialogue choice button with condition-lock styling and Trust/Love delta preview on hover.
 * Task UI-3.9
 */

interface ChoiceButtonProps {
  label:       string;
  onClick:     () => void;
  locked?:     boolean;   // condition not met — show greyed with lock icon
  trustDelta?: number;
  loveDelta?:  number;
  className?:  string;
}

export function ChoiceButton({
  label,
  onClick,
  locked = false,
  trustDelta,
  loveDelta,
  className = '',
}: ChoiceButtonProps) {
  const hasDelta = (trustDelta !== undefined && trustDelta !== 0) ||
                   (loveDelta  !== undefined && loveDelta  !== 0);

  return (
    <div className={`relative group ${className}`}>
      <button
        onClick={onClick}
        disabled={locked}
        className={`
          w-full text-left px-4 py-2.5 rounded border text-sm transition-colors duration-100
          ${locked
            ? 'opacity-40 cursor-not-allowed bg-stone-900 border-stone-700 text-stone-500'
            : 'bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700 hover:border-stone-500 cursor-pointer'
          }
        `}
      >
        {locked && <span className="mr-2 text-stone-600">🔒</span>}
        {label}
      </button>

      {/* Delta preview tooltip */}
      {!locked && hasDelta && (
        <div className="
          absolute right-2 top-1/2 -translate-y-1/2
          flex gap-2 opacity-0 group-hover:opacity-100
          transition-opacity duration-150 pointer-events-none
        ">
          {trustDelta !== undefined && trustDelta !== 0 && (
            <span className={`text-xs font-semibold ${trustDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              T{trustDelta > 0 ? `+${trustDelta}` : trustDelta}
            </span>
          )}
          {loveDelta !== undefined && loveDelta !== 0 && (
            <span className={`text-xs font-semibold ${loveDelta > 0 ? 'text-pink-400' : 'text-rose-400'}`}>
              L{loveDelta > 0 ? `+${loveDelta}` : loveDelta}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
