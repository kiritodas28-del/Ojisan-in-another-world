/**
 * IntimacyView.tsx
 * Intimate encounter scene screen.
 * Tasks UI-7.1 to UI-7.6
 *
 * TODO UI-7.1: PartnerPanel sub-component
 * TODO UI-7.2: PositionPicker sub-component
 * TODO UI-7.3: ActionPicker sub-component
 */

import { useState } from 'react';
import { useIntimacy }   from '../../hooks/useIntimacy';
import { useFindContact } from '../../hooks/useContacts';
import { Panel }         from '../../components/Panel';
import { StatBar }       from '../../components/StatBar';
import { ActionButton }  from '../../components/ActionButton';
import { NarrativeLog }  from '../../components/NarrativeLog';
import { Portrait }      from '../../components/Portrait';
import type { IntimacyScene } from '../../engines/intimacyEngine';

interface IntimacyViewProps {
  initialScene: IntimacyScene;
  onSceneEnd:   () => void;
}

// Placeholder action catalog until src/data/intimacyCatalog.ts is populated (Task 6.3)
const PLACEHOLDER_ACTIONS = [
  { id: 'thrust_slow', label: 'Slow Thrust', tecReq: 5,  staCost: 5  },
  { id: 'thrust_fast', label: 'Fast Thrust', tecReq: 8,  staCost: 10 },
  { id: 'kiss',        label: 'Kiss',         tecReq: 2,  staCost: 2  },
  { id: 'grope',       label: 'Grope',        tecReq: 3,  staCost: 3  },
];

export function IntimacyView({ initialScene, onSceneEnd }: IntimacyViewProps) {
  const { scene, sendAction, endScene, loading } = useIntimacy(initialScene);
  const [log, setLog] = useState<string[]>(['The scene begins…']);

  const current = scene ?? initialScene;
  const partner = useFindContact(current.partnerNpcId);

  function handleAction(actionId: string) {
    sendAction(actionId, current.activePositionId ?? '', current.partnerNpcId)
      .then(() => setLog((l) => [...l, `You performed ${actionId}…`]));
  }

  function handleEnd() {
    endScene().then(() => {
      setLog((l) => [...l, 'Scene ended.']);
      onSceneEnd();
    });
  }

  return (
    <div className="flex gap-3 h-full">

      {/* Left: partner panel */}
      <div className="flex flex-col gap-3 w-56 shrink-0">
        <Panel title="Partner">
          <div className="flex flex-col items-center gap-3">
            <Portrait
              name={partner?.name ?? current.partnerNpcId}
              characterType="NPC"
              size="lg"
            />
            {/* Arousal bar */}
            <StatBar
              current={partner ? (partner.dynamicState as any)?.arousal ?? 0 : 0}
              max={100}
              colour="bg-pink-600"
              label="ARO"
              className="w-full"
            />
            {/* Resistance bar */}
            <StatBar
              current={partner ? (partner.dynamicState as any)?.resistance ?? 50 : 50}
              max={100}
              colour="bg-violet-700"
              label="RES"
              className="w-full"
            />
            <div className="text-xs text-stone-500 italic">
              {/* TODO: derive from partner.dynamicState.mentalState */}
              Willing
            </div>
          </div>
        </Panel>

        <Panel title="Scene">
          <div className="flex flex-col gap-1 text-xs text-stone-400">
            <div className="flex justify-between">
              <span>Turn</span><span className="text-stone-200">{current.turnCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Position</span><span className="text-stone-200">{current.activePositionId ?? '—'}</span>
            </div>
            <div className="flex justify-between">
              <span>Type</span><span className="text-stone-200">{current.startType}</span>
            </div>
          </div>
        </Panel>
      </div>

      {/* Centre: narrative log */}
      <NarrativeLog lines={log} maxLines={40} className="flex-1 min-h-0 text-sm" />

      {/* Right: action/position picker */}
      <div className="flex flex-col gap-3 w-52 shrink-0">
        <Panel title="Actions">
          <div className="flex flex-col gap-2">
            {PLACEHOLDER_ACTIONS.map((action) => (
              <ActionButton
                key={action.id}
                label={action.label}
                onClick={() => handleAction(action.id)}
                available={!loading}
                cost={{ amount: action.staCost, resource: 'STA' }}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Positions">
          <div className="flex flex-col gap-2 text-xs">
            {/* TODO UI-7.2: PositionPicker from catalog */}
            {['Missionary', 'Doggy', 'Cowgirl'].map((p) => (
              <button
                key={p}
                className={`px-2 py-1.5 rounded border text-left transition-colors ${
                  p.toLowerCase() === current.activePositionId
                    ? 'bg-amber-900/40 border-amber-700 text-amber-300'
                    : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </Panel>

        <button
          onClick={handleEnd}
          className="px-3 py-2 rounded border border-rose-800 bg-rose-900/40 text-rose-300 text-sm hover:bg-rose-800/60 transition-colors mt-auto"
        >
          End Scene
        </button>
      </div>
    </div>
  );
}
