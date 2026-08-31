/**
 * QuestsTab.tsx
 * Three sub-tabs: Active / Available / Completed.
 * Active quests show objective progress bars.
 * Task UI-9.4
 */

import { useState } from 'react';
import { useGameState } from '../../../hooks/useGameState';
import { Panel }        from '../../../components/Panel';
import { StatBar }      from '../../../components/StatBar';

type SubTab = 'active' | 'available' | 'completed';

export function QuestsTab() {
  const gameState = useGameState();
  const [subTab, setSubTab] = useState<SubTab>('active');

  if (!gameState) return null;
  const { quests } = gameState;

  return (
    <div className="flex flex-col gap-3 h-full">

      {/* Sub-tab bar */}
      <div className="flex gap-1 bg-stone-950 rounded-lg p-1">
        {(['active', 'available', 'completed'] as SubTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`
              flex-1 py-1.5 rounded text-xs font-medium capitalize transition-colors
              ${subTab === t ? 'bg-stone-700 text-stone-200' : 'text-stone-500 hover:text-stone-300'}
            `}
          >
            {t} {t === 'active' ? `(${quests.active.length})` : t === 'available' ? `(${quests.available.length})` : `(${quests.completed.length})`}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {subTab === 'active' && quests.active.map((q) => (
          <Panel key={q.questId} title={q.questId}>
            <div className="flex flex-col gap-2">
              {Object.entries(q.objectiveProgress).map(([objId, count]) => (
                <div key={objId}>
                  <div className="flex justify-between text-xs text-stone-400 mb-1">
                    <span>{objId}</span>
                    <span>{count}</span>
                  </div>
                  {/* TODO: show real max from QuestDef once quest catalog is populated */}
                  <StatBar current={count} max={Math.max(count, 5)} colour="bg-amber-600" />
                </div>
              ))}
            </div>
          </Panel>
        ))}
        {subTab === 'active' && quests.active.length === 0 && (
          <p className="text-stone-600 italic text-sm text-center py-8">No active quests.</p>
        )}

        {subTab === 'available' && quests.available.map((id) => (
          <Panel key={id} title={id}>
            <p className="text-stone-500 text-xs">Quest available — talk to the quest giver to start.</p>
          </Panel>
        ))}

        {subTab === 'completed' && quests.completed.map((id) => (
          <div key={id} className="flex items-center gap-2 px-3 py-2 rounded bg-stone-800 border border-stone-700 text-sm text-stone-400">
            <span className="text-emerald-500">✓</span>
            <span>{id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
