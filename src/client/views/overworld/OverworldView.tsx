/**
 * OverworldView.tsx
 * Main exploration screen — location, travel options, NPC list, phase actions.
 * Tasks UI-5.1 to UI-5.6
 *
 * TODO UI-5.1: LocationPanel sub-component
 * TODO UI-5.2: TravelList sub-component
 * TODO UI-5.3: NpcListPanel sub-component
 * TODO UI-5.4: PhaseActions sub-component
 */

import { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { useCalendar }  from '../../hooks/useCalendar';
import { useIntent }    from '../../hooks/useIntent';
import { Panel }        from '../../components/Panel';
import { Button }       from '../../components/Button';
import { NarrativeLog } from '../../components/NarrativeLog';

export function OverworldView() {
  const gameState = useGameState();
  const calendar  = useCalendar();
  const { sendIntent, loading } = useIntent();
  const [log, setLog] = useState<string[]>(['You are in the village square.']);

  if (!gameState || !calendar) return null;

  const { world } = gameState;
  const canSleep = (calendar.phase === 'Night' || calendar.phase === 'Midnight') && true; // TODO: check isSafe

  function handleAdvancePhase() {
    sendIntent({ type: 'ADVANCE_PHASE' }).then(() =>
      setLog((l) => [...l, 'Time passes…']),
    );
  }

  function handleSleep() {
    sendIntent({ type: 'SLEEP' }).then(() =>
      setLog((l) => [...l, 'You rest for the night. HP, Stamina, and CPW fully restored.']),
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full">

      {/* Location */}
      <Panel title="Location">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-stone-200 font-semibold">{world.currentLocationId}</p>
            <p className="text-stone-500 text-xs mt-0.5">Safe zone</p>
          </div>
          <span className="text-xs px-2 py-1 rounded bg-emerald-900/50 border border-emerald-800 text-emerald-400">
            ✓ Safe
          </span>
        </div>
      </Panel>

      <div className="flex gap-3 flex-1 min-h-0">

        {/* Left column: travel + NPCs */}
        <div className="flex flex-col gap-3 flex-1">

          {/* Travel */}
          <Panel title="Travel">
            <div className="flex flex-col gap-2">
              {/* TODO UI-5.2: replace with real connected nodes from worldGraph */}
              {['forest_entrance', 'old_mill'].map((dest) => (
                <button
                  key={dest}
                  onClick={() => {
                    sendIntent({ type: 'MOVE', targetLocationId: dest, useFastTravel: false });
                    setLog((l) => [...l, `Heading to ${dest}…`]);
                  }}
                  disabled={loading}
                  className="flex items-center justify-between px-3 py-2 rounded bg-stone-800 border border-stone-700 hover:bg-stone-700 text-sm text-stone-200 transition-colors"
                >
                  <span>{dest}</span>
                  <span className="text-stone-500 text-xs">15% encounter</span>
                </button>
              ))}
            </div>
          </Panel>

          {/* NPCs at location */}
          <Panel title="People here" className="flex-1">
            <div className="flex flex-col gap-3">
              {/* TODO UI-5.3: populate from NPC population engine */}
              {gameState.contacts.slice(0, 3).map((record) => {
                const npc = record.character;
                return (
                  <div key={npc.npcId} className="flex items-center justify-between gap-3 py-1 border-b border-stone-800 last:border-0">
                    <div>
                      <p className="text-stone-200 text-sm font-medium">{npc.name}</p>
                      <p className="text-stone-500 text-xs">Trust {npc.trust} · Love {npc.love}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button label="Talk"   onClick={() => sendIntent({ type: 'TALK', npcId: npc.npcId })} variant="ghost" className="text-xs px-2 py-1" />
                      <Button label="Flirt"  onClick={() => {}} variant="ghost" className="text-xs px-2 py-1" />
                      <Button label="Gift"   onClick={() => {}} variant="ghost" className="text-xs px-2 py-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

        </div>

        {/* Right column: actions + log */}
        <div className="flex flex-col gap-3 w-56 shrink-0">

          {/* Phase actions */}
          <Panel title="Actions">
            <div className="flex flex-col gap-2">
              <Button
                label={loading ? 'Wait…' : 'Advance Phase'}
                onClick={handleAdvancePhase}
                disabled={loading}
                variant="secondary"
              />
              <Button
                label="Sleep"
                onClick={handleSleep}
                disabled={!canSleep || loading}
                disabledReason={canSleep ? undefined : 'Only at Night or Midnight in a safe location'}
                variant="secondary"
              />
            </div>
          </Panel>

          {/* Narrative log */}
          <NarrativeLog lines={log} maxLines={20} className="flex-1 min-h-0 text-xs" />

        </div>
      </div>
    </div>
  );
}
