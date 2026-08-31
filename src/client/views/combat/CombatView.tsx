/**
 * CombatView.tsx
 * Turn-based combat screen.
 * Tasks UI-6.1 to UI-6.6
 *
 * TODO UI-6.1: InitiativeStrip sub-component
 * TODO UI-6.2: CombatantPanel sub-component
 * TODO UI-6.3: CombatActionBar sub-component
 * TODO UI-6.4: PurificationBar sub-component
 */

import { useState } from 'react';
import { useCombat }     from '../../hooks/useCombat';
import { Panel }         from '../../components/Panel';
import { Portrait }      from '../../components/Portrait';
import { StatBar }       from '../../components/StatBar';
import { ActionButton }  from '../../components/ActionButton';
import { NarrativeLog }  from '../../components/NarrativeLog';
import { StatusIconRow } from '../../components/StatusIcon';
import type { CombatState } from '../../engines/combatEngine';

interface CombatViewProps {
  initialCombatState: CombatState;
}

export function CombatView({ initialCombatState }: CombatViewProps) {
  const { combatState, sendCombatAction, loading } = useCombat(initialCombatState);
  const [log, setLog] = useState<string[]>(['Combat started!']);

  const state = combatState ?? initialCombatState;
  const activeCombatantId = state.initiativeOrder[state.currentTurnIndex];
  const isPlayerTurn = activeCombatantId === 'player-001';

  const enemies = state.initiativeOrder
    .filter((id) => id !== 'player-001' && !id.startsWith('npc-'))
    .map((id) => state.combatants[id])
    .filter(Boolean);

  const allies = state.initiativeOrder
    .filter((id) => id === 'player-001' || id.startsWith('npc-'))
    .map((id) => state.combatants[id])
    .filter(Boolean);

  function handleAction(actionId: string, targetId?: string) {
    sendCombatAction({ type: 'ATTACK', actorId: 'player-001', targetId })
      .then(() => setLog((l) => [...l, `Player used ${actionId}!`]));
  }

  return (
    <div className="flex flex-col gap-3 h-full">

      {/* Initiative order strip */}
      <Panel title={`Round ${state.roundNumber} · ${state.status}`}>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {state.initiativeOrder.map((id, i) => {
            const c = state.combatants[id];
            const isActive = id === activeCombatantId;
            return (
              <Portrait
                key={id}
                name={c?.name ?? id}
                characterType={c?.characterType ?? 'NPC'}
                isActive={isActive}
                size="sm"
                className={`shrink-0 ${isActive ? 'ring-2 ring-yellow-400 rounded-full' : ''}`}
              />
            );
          })}
        </div>
      </Panel>

      <div className="flex gap-3 flex-1 min-h-0">

        {/* Left: combatant panels */}
        <div className="flex flex-col gap-3 flex-1">

          {/* Allies */}
          <Panel title="Your Party">
            <div className="flex flex-col gap-3">
              {allies.map((c) => c && (
                <div key={c.id} className="flex items-center gap-3">
                  <Portrait name={c.name} characterType={c.characterType} size="sm" isActive={c.id === activeCombatantId} />
                  <div className="flex-1 flex flex-col gap-1">
                    <StatBar current={c.vitals.hp.current}      max={c.vitals.hp.max}      colour="bg-red-600"    label="HP"  />
                    <StatBar current={c.vitals.stamina.current} max={c.vitals.stamina.max} colour="bg-yellow-500" label="STA" />
                    <StatusIconRow effects={c.activeStatusEffects} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Enemies */}
          <Panel title="Enemies">
            <div className="flex flex-col gap-3">
              {enemies.map((c) => c && (
                <div key={c.id} className="flex items-center gap-3">
                  <Portrait name={c.name} characterType={c.characterType} size="sm" isActive={c.id === activeCombatantId} />
                  <div className="flex-1 flex flex-col gap-1">
                    <StatBar current={c.vitals.hp.current} max={c.vitals.hp.max} colour="bg-rose-700" label="HP" />
                    <StatusIconRow effects={c.activeStatusEffects} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Purification progress */}
          {state.purificationProgress > 0 && (
            <Panel title="Purification">
              <StatBar current={state.purificationProgress} max={100} colour="bg-violet-500" label="ARO" />
            </Panel>
          )}
        </div>

        {/* Right: action bar + log */}
        <div className="flex flex-col gap-3 w-56 shrink-0">
          <Panel title={isPlayerTurn ? 'Your Turn' : 'Enemy Turn'}>
            <div className="flex flex-col gap-2">
              <ActionButton label="Attack"  onClick={() => handleAction('ATTACK',   enemies[0]?.id)} available={isPlayerTurn && !loading} />
              <ActionButton label="Purify"  onClick={() => handleAction('PURIFY',   enemies[0]?.id)} available={isPlayerTurn && !loading} cost={{ amount: 10, resource: 'CPW' }} />
              <ActionButton label="Defend"  onClick={() => handleAction('DEFEND')}                  available={isPlayerTurn && !loading} />
              <ActionButton label="Flee"    onClick={() => handleAction('FLEE')}                    available={isPlayerTurn && !loading} />
              <ActionButton label="Use Item" onClick={() => {}}                                     available={isPlayerTurn && !loading} disabledReason="Open inventory to select item" />
            </div>
          </Panel>
          <NarrativeLog lines={log} maxLines={30} className="flex-1 min-h-0 text-xs" />
        </div>
      </div>
    </div>
  );
}
