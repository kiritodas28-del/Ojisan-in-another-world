/**
 * HudShell.tsx
 * Persistent HUD overlay — always visible over every active view.
 * Tasks UI-4.1 to UI-4.6
 *
 * TODO UI-4.1: HudPlayerVitals sub-component
 * TODO UI-4.2: HudPartyStrip sub-component
 * TODO UI-4.3: HudPhaseIndicator sub-component
 * TODO UI-4.4: HudGold sub-component
 */

import { usePlayer } from '../../hooks/usePlayer';
import { useParty }  from '../../hooks/useParty';
import { useCalendar } from '../../hooks/useCalendar';
import { StatBar }   from '../../components/StatBar';
import { Portrait }  from '../../components/Portrait';
import { PhaseIndicator } from '../../components/PhaseIndicator';

interface HudShellProps {
  onMenuOpen: () => void;
}

export function HudShell({ onMenuOpen }: HudShellProps) {
  const player   = usePlayer();
  const party    = useParty();
  const calendar = useCalendar();

  if (!player || !calendar) {
    return (
      <div className="fixed top-0 left-0 right-0 h-16 bg-stone-950 border-b border-stone-800 flex items-center justify-center">
        <span className="text-stone-600 text-sm">Loading…</span>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-stone-950/95 border-b border-stone-800 backdrop-blur-sm">
      <div className="flex items-center gap-4 px-4 py-2">

        {/* Player vitals */}
        <div className="flex flex-col gap-1 min-w-[180px]">
          <StatBar current={player.vitals.hp.current}      max={player.vitals.hp.max}      colour="bg-red-600"   label="HP"  />
          <StatBar current={player.vitals.stamina.current} max={player.vitals.stamina.max} colour="bg-yellow-500" label="STA" />
          <StatBar current={player.vitals.cpw.current}     max={player.vitals.cpw.max}     colour="bg-blue-600"  label="CPW" />
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-stone-800 shrink-0" />

        {/* Party strip */}
        {party && party.companions.length > 0 && (
          <div className="flex gap-3 items-center">
            {party.companions.map((m) => (
              <div key={m.npcId} className="flex flex-col items-center gap-1">
                <Portrait
                  name={m.npcId}
                  characterType="NPC"
                  isDown={m.isDown}
                  size="sm"
                />
                <StatBar
                  current={m.vitals.hp.current}
                  max={m.vitals.hp.max}
                  colour="bg-red-600"
                  className="w-16"
                />
              </div>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Phase indicator */}
        <PhaseIndicator
          currentPhase={calendar.phase}
          actionCount={calendar.actionCount}
          phaseActionLimit={calendar.phaseActionLimit}
          className="w-36"
        />

        {/* Gold */}
        <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold tabular-nums">
          <span>🪙</span>
          <span>{player.gold}</span>
        </div>

        {/* Menu button */}
        <button
          onClick={onMenuOpen}
          className="ml-2 px-3 py-1.5 rounded border border-stone-600 bg-stone-800 text-stone-300 text-sm hover:bg-stone-700 transition-colors"
        >
          ☰ Menu
        </button>
      </div>
    </div>
  );
}
