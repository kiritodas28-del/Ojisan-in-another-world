/**
 * Panel.tsx
 * Dark-bordered content container. Base for all major UI regions.
 * Task UI-3.3
 */

import type { ReactNode } from 'react';

interface PanelProps {
  title?:     string;
  children:   ReactNode;
  className?: string;
}

export function Panel({ title, children, className = '' }: PanelProps) {
  return (
    <div className={`bg-stone-900 border border-stone-700 rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="px-3 py-2 border-b border-stone-700 bg-stone-800/60">
          <h3 className="text-xs font-semibold text-stone-300 uppercase tracking-widest">{title}</h3>
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}
