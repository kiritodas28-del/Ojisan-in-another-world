/**
 * ManorTab.tsx
 * Tier display, construction progress bar, suite grid with assigned companions,
 * passive resource queue with collect button.
 * Task UI-9.6
 */

import { useGameState } from '../../../hooks/useGameState';
import { useContacts }  from '../../../hooks/useContacts';
import { Panel }        from '../../../components/Panel';
import { StatBar }      from '../../../components/StatBar';
import { Button }       from '../../../components/Button';
import { Portrait }     from '../../../components/Portrait';

const TIER_LABELS: Record<number, string> = {
  1: 'Humble Dwelling',
  2: 'Cottage',
  3: 'Farmhouse',
  4: 'Manor',
  5: 'Estate',
  6: 'Grand Estate',
};

const TIER_FEATURES: Record<number, string[]> = {
  1: ['Basic storage (20 slots)', 'Player bedroom'],
  2: ['Crafting bench', '1 suite'],
  3: ['3 suites', 'Expanded storage (+10 slots)'],
  4: ['Alchemy Lab', '5 suites'],
  5: ['Workshop', '8 suites'],
  6: ['Full estate', 'Unlimited suites'],
};

export function ManorTab() {
  const gameState = useGameState();
  const contacts  = useContacts();

  if (!gameState) return null;
  const { manor } = gameState;

  const assignedEntries = Object.entries(manor.suiteAssignments);
  const maxSuites = manor.tier >= 6 ? 99 : [0, 0, 1, 3, 5, 8, 99][manor.tier] ?? 0;

  return (
    <div className="flex flex-col gap-4">

      {/* Tier overview */}
      <Panel title={`Manor — Tier ${manor.tier}: ${TIER_LABELS[manor.tier] ?? 'Unknown'}`}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            {[1,2,3,4,5,6].map((t) => (
              <div
                key={t}
                className={`flex-1 h-2 rounded-full ${t <= manor.tier ? 'bg-amber-600' : 'bg-stone-700'}`}
              />
            ))}
          </div>
          <ul className="text-xs text-stone-400 mt-1 list-disc list-inside">
            {TIER_FEATURES[manor.tier]?.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </Panel>

      {/* Construction timer */}
      {manor.constructionTimerDays > 0 && (
        <Panel title="Under Construction">
          <p className="text-stone-300 text-sm">{manor.constructionTimerDays} days until Tier {manor.tier + 1} completes.</p>
          <StatBar current={0} max={manor.constructionTimerDays} colour="bg-amber-700" className="mt-2" />
        </Panel>
      )}
      {manor.constructionTimerDays === 0 && manor.tier < 6 && (
        <Panel title="Upgrade Available">
          <Button label={`Upgrade to Tier ${manor.tier + 1}`} onClick={() => { /* TODO: fire BUILD intent */ }} variant="primary" />
        </Panel>
      )}

      {/* Suites */}
      <Panel title={`Suites (${assignedEntries.length} / ${maxSuites < 99 ? maxSuites : '∞'})`}>
        {maxSuites === 0 ? (
          <p className="text-stone-600 text-xs italic">Unlock suites by upgrading to Tier 2.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: maxSuites < 99 ? maxSuites : 8 }).map((_, i) => {
              const [suiteId, npcId] = assignedEntries[i] ?? [];
              const npc = npcId ? contacts.find((r) => r.character.npcId === npcId)?.character : null;
              return (
                <div
                  key={i}
                  className="aspect-square flex flex-col items-center justify-center rounded border border-stone-700 bg-stone-800 text-xs text-stone-500"
                >
                  {npc ? (
                    <>
                      <Portrait name={npc.name} characterType="NPC" size="sm" />
                      <span className="mt-1 text-stone-400">{npc.name}</span>
                    </>
                  ) : (
                    <span>Empty</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Panel>

      {/* Passive resource queue */}
      {manor.passiveResourceQueue.length > 0 && (
        <Panel title="Pending Resources">
          <div className="flex flex-col gap-2">
            {manor.passiveResourceQueue.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-stone-300">{r.itemId} ×{r.quantity}</span>
              </div>
            ))}
            <Button label="Collect All" onClick={() => { /* TODO: collect intent */ }} variant="primary" className="mt-1 w-full" />
          </div>
        </Panel>
      )}
      {manor.passiveResourceQueue.length === 0 && (
        <p className="text-stone-600 text-xs italic text-center">No resources pending. Assign companions to suites to generate passive income.</p>
      )}
    </div>
  );
}
