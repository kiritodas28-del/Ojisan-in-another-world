/**
 * RelationshipMeter.tsx
 * Dual Trust/Love progress bars with band threshold markers at -25, 25, 75.
 * Task UI-3.10
 */

interface RelationshipMeterProps {
  trust:      number;   // -100 to +100
  love:       number;   // -100 to +100
  className?: string;
}

// Convert -100..+100 to 0..100% for CSS
function toPercent(val: number): number {
  return ((val + 100) / 200) * 100;
}

// Threshold positions in %
const THRESHOLDS = [
  { val: -25, label: '-25' },
  { val:  25, label:  '25' },
  { val:  75, label:  '75' },
];

function Bar({
  value,
  colour,
  label,
}: {
  value: number;
  colour: string;
  label: string;
}) {
  const pct = toPercent(value);
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-xs text-stone-500 uppercase tracking-wide shrink-0">{label}</span>
      <div className="relative flex-1 h-2.5 bg-stone-800 rounded-full overflow-visible border border-stone-700">
        {/* Fill */}
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${colour}`}
          style={{ width: `${pct}%` }}
        />
        {/* Threshold markers */}
        {THRESHOLDS.map(({ val }) => (
          <div
            key={val}
            className="absolute top-0 h-full w-px bg-stone-600/80"
            style={{ left: `${toPercent(val)}%` }}
          />
        ))}
      </div>
      <span className="w-8 text-right text-xs text-stone-400 tabular-nums shrink-0">
        {value > 0 ? `+${value}` : value}
      </span>
    </div>
  );
}

export function RelationshipMeter({ trust, love, className = '' }: RelationshipMeterProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Bar value={trust} colour="bg-emerald-600" label="Trust" />
      <Bar value={love}  colour="bg-pink-600"    label="Love"  />
    </div>
  );
}
