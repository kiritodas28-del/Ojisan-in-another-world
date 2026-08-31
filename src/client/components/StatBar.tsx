/**
 * StatBar.tsx
 * Coloured progress bar with current/max label.
 * Used for HP, Stamina, CPW, arousal, resistance.
 * Task UI-3.1
 */

interface StatBarProps {
  current:   number;
  max:       number;
  colour:    string;   // Tailwind bg-* class e.g. 'bg-red-600'
  label?:    string;   // e.g. 'HP', 'STA', 'CPW'
  className?: string;
}

export function StatBar({ current, max, colour, label, className = '' }: StatBarProps) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <span className="w-8 text-xs font-semibold text-stone-400 uppercase tracking-wide shrink-0">
          {label}
        </span>
      )}
      <div className="relative flex-1 h-3 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
        <div
          className={`h-full rounded-full transition-all duration-200 ${colour}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-16 text-right text-xs text-stone-400 shrink-0 tabular-nums">
        {current}<span className="text-stone-600">/{max}</span>
      </span>
    </div>
  );
}
