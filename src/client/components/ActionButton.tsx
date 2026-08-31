/**
 * ActionButton.tsx
 * Button variant for combat/intimacy actions. Shows CPW/stamina cost badge.
 * Task UI-3.5
 */

import { Button } from './Button';

interface ActionButtonProps {
  label:           string;
  onClick:         () => void;
  available:       boolean;
  disabledReason?: string;
  cost?:           { amount: number; resource: 'CPW' | 'STA' };
  className?:      string;
}

export function ActionButton({
  label,
  onClick,
  available,
  disabledReason,
  cost,
  className = '',
}: ActionButtonProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <Button
        label={label}
        onClick={onClick}
        disabled={!available}
        disabledReason={disabledReason}
        variant="secondary"
      />
      {cost && (
        <span className={`
          absolute -top-1.5 -right-1.5 px-1 py-0.5 rounded text-[10px] font-bold leading-none
          ${cost.resource === 'CPW' ? 'bg-blue-700 text-blue-100' : 'bg-yellow-700 text-yellow-100'}
        `}>
          {cost.amount} {cost.resource}
        </span>
      )}
    </div>
  );
}
