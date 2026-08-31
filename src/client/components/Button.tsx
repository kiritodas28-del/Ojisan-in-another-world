/**
 * Button.tsx
 * Themed action button with disabled state and tooltip for disabled reason.
 * Task UI-3.4
 */

interface ButtonProps {
  label:           string;
  onClick:         () => void;
  disabled?:       boolean;
  disabledReason?: string;
  variant?:        'primary' | 'secondary' | 'danger' | 'ghost';
  className?:      string;
}

const VARIANT_MAP = {
  primary:   'bg-amber-700 hover:bg-amber-600 text-amber-50 border-amber-600',
  secondary: 'bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600',
  danger:    'bg-rose-800 hover:bg-rose-700 text-rose-50 border-rose-700',
  ghost:     'bg-transparent hover:bg-stone-800 text-stone-300 border-stone-700',
};

export function Button({
  label,
  onClick,
  disabled = false,
  disabledReason,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const variantClass = VARIANT_MAP[variant];

  return (
    <div className="relative group inline-block">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          px-3 py-1.5 rounded border text-sm font-medium
          transition-colors duration-100 select-none
          ${variantClass}
          ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
          ${className}
        `}
      >
        {label}
      </button>
      {disabled && disabledReason && (
        <div className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1
          bg-stone-950 border border-stone-700 rounded text-xs text-stone-300
          whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none
          transition-opacity duration-150 z-50
        ">
          {disabledReason}
        </div>
      )}
    </div>
  );
}
