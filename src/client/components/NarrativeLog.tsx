/**
 * NarrativeLog.tsx
 * Scrollable text panel for combat/scene/overworld narrative lines.
 * Auto-scrolls to the bottom when new lines are added.
 * Task UI-3.8
 */

import { useEffect, useRef } from 'react';

interface NarrativeLogProps {
  lines:      string[];
  maxLines?:  number;   // trim to last N lines if provided
  className?: string;
}

export function NarrativeLog({ lines, maxLines, className = '' }: NarrativeLogProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const displayed = maxLines ? lines.slice(-maxLines) : lines;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className={`overflow-y-auto bg-stone-950 border border-stone-800 rounded p-2 text-sm font-mono leading-relaxed ${className}`}>
      {displayed.length === 0 ? (
        <p className="text-stone-600 italic">No events yet.</p>
      ) : (
        displayed.map((line, i) => (
          <p key={i} className="text-stone-300 py-0.5 border-b border-stone-900 last:border-0">
            {line}
          </p>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}
