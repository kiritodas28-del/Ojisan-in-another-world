/**
 * Portrait.tsx
 * Character silhouette placeholder with name tag and downed/status overlay.
 * Replace the silhouette div with an <img> once art assets are available.
 * Task UI-3.2
 */

interface PortraitProps {
  name:          string;
  characterType: 'PLAYER' | 'NPC' | 'ENEMY_HUMANOID' | 'MONSTER';
  isDown?:       boolean;
  isActive?:     boolean;  // highlighted when it's this combatant's turn
  size?:         'sm' | 'md' | 'lg';
  className?:    string;
}

const SIZE_MAP = {
  sm: 'w-10 h-10 text-xs',
  md: 'w-14 h-14 text-sm',
  lg: 'w-20 h-20 text-base',
};

const TYPE_COLOUR: Record<PortraitProps['characterType'], string> = {
  PLAYER:          'border-amber-500',
  NPC:             'border-emerald-600',
  ENEMY_HUMANOID:  'border-rose-700',
  MONSTER:         'border-purple-700',
};

export function Portrait({
  name,
  characterType,
  isDown = false,
  isActive = false,
  size = 'md',
  className = '',
}: PortraitProps) {
  const initials = name.slice(0, 2).toUpperCase();
  const sizeClass = SIZE_MAP[size];
  const borderColour = isActive
    ? 'border-yellow-300 ring-2 ring-yellow-300/50'
    : TYPE_COLOUR[characterType];

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div
        className={`
          ${sizeClass} relative flex items-center justify-center
          rounded-full border-2 ${borderColour}
          bg-stone-800 font-bold text-stone-300 select-none
          ${isDown ? 'opacity-40 grayscale' : ''}
          transition-all duration-150
        `}
      >
        {initials}
        {isDown && (
          <span className="absolute inset-0 flex items-center justify-center text-rose-400 text-lg">✕</span>
        )}
      </div>
      <span className={`text-xs text-stone-400 truncate max-w-[4rem] ${isDown ? 'opacity-40' : ''}`}>
        {name}
      </span>
    </div>
  );
}
