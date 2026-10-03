/**
 * ContactsTab.tsx
 * Scrollable contact list with Portrait, name, race, RelationshipMeter.
 * Click opens a full profile modal (3 tabs: Social | Physical | Psychology).
 * Task UI-9.5
 */

import { useState } from 'react';
import { useContacts }       from '../../../hooks/useContacts';
import { Portrait }          from '../../../components/Portrait';
import { RelationshipMeter } from '../../../components/RelationshipMeter';
import { Panel }             from '../../../components/Panel';
import type { NpcCharacter } from '../../../../state/gameState';

// ─── Sub-components ───────────────────────────────────────────────────────────

type StatRowProps = { label: string; value: string | number | undefined };
function StatRow({ label, value }: StatRowProps) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-stone-500">{label}</span>
      <span className="text-stone-200">{value ?? '—'}</span>
    </div>
  );
}

/** Horizontal bar: 0–100, colour driven by `variant` */
type BarProps = { value: number | undefined; variant: 'corruption' | 'shame' | 'purity' };
function MoralBar({ value, variant }: BarProps) {
  if (value === undefined) return <span className="text-stone-600 text-xs italic">—</span>;
  const pct  = Math.min(100, Math.max(0, value));
  const fill = {
    corruption: 'bg-purple-700',
    shame:      'bg-amber-600',
    purity:     'bg-sky-600',
  }[variant];
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded bg-stone-700 overflow-hidden">
        <div className={`h-full rounded transition-all ${fill}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-stone-400 w-8 text-right">{pct}</span>
    </div>
  );
}

// ─── Degradation tab ─────────────────────────────────────────────────────────

function DegradationSection({
  corruption, shame, brokenFlag,
}: {
  corruption?: number;
  shame?:      number;
  brokenFlag?: boolean;
}) {
  const purity = shame !== undefined ? shame : undefined; // shame = retained inhibition proxy

  // Derive label from corruption level
  const corruptionLabel = (() => {
    if (corruption === undefined) return undefined;
    if (corruption >= 86) return 'Broken';
    if (corruption >= 70) return 'Deeply Corrupted';
    if (corruption >= 50) return 'Corrupted';
    if (corruption >= 30) return 'Tainted';
    if (corruption >= 10) return 'Exposed';
    return 'Pure';
  })();

  const shameLabel = (() => {
    if (shame === undefined) return undefined;
    if (shame <= 10) return 'Shameless';
    if (shame <= 30) return 'Diminished';
    if (shame <= 60) return 'Wavering';
    if (shame <= 80) return 'Resistant';
    return 'Intact';
  })();

  return (
    <div className="flex flex-col gap-4">

      {/* Broken banner */}
      {brokenFlag && (
        <div className="flex items-center gap-2 px-3 py-2 rounded border border-purple-700/60 bg-purple-950/50">
          <span className="text-purple-300 text-xs font-semibold tracking-wide">⚠ BROKEN</span>
          <span className="text-purple-400/70 text-xs">Corruption overwhelmed remaining inhibition</span>
        </div>
      )}

      {/* Corruption */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-baseline">
          <span className="text-xs font-medium text-stone-400">Corruption</span>
          {corruptionLabel && (
            <span className="text-xs text-purple-400">{corruptionLabel}</span>
          )}
        </div>
        <MoralBar value={corruption} variant="corruption" />
      </div>

      {/* Shame / Inhibition */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-baseline">
          <span className="text-xs font-medium text-stone-400">Shame (Inhibition)</span>
          {shameLabel && (
            <span className="text-xs text-amber-400">{shameLabel}</span>
          )}
        </div>
        <MoralBar value={purity} variant="shame" />
        <p className="text-xs text-stone-600 mt-0.5">Higher = more intact moral resistance</p>
      </div>

      {/* Derived purity (inverse corruption) */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-stone-400">Remaining Purity</span>
        <MoralBar value={corruption !== undefined ? 100 - corruption : undefined} variant="purity" />
      </div>

      {/* Raw values row */}
      <div className="border-t border-stone-800 pt-3 flex flex-col gap-1">
        <StatRow label="Corruption (raw)" value={corruption} />
        <StatRow label="Shame (raw)"       value={shame} />
        <StatRow label="Broken flag"       value={brokenFlag !== undefined ? (brokenFlag ? 'Yes' : 'No') : undefined} />
      </div>
    </div>
  );
}

// ─── Profile modal ────────────────────────────────────────────────────────────

type Tab = 'social' | 'physical' | 'degradation';

function ProfileModal({ npc, onClose }: { npc: NpcCharacter; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('social');

  // Safely read dynamicState.mental for corruption data.
  const mental = (npc.dynamicState as { mental?: { corruptionCurrent?: number; shameCurrent?: number; brokenFlag?: boolean } } | null | undefined)?.mental;
  const corruption = mental?.corruptionCurrent;
  const shame      = mental?.shameCurrent;
  const brokenFlag = mental?.brokenFlag;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'social',      label: 'Social' },
    { id: 'physical',    label: 'Physical' },
    { id: 'degradation', label: 'Corruption' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-stone-900 border border-stone-700 rounded-xl p-6 w-96 max-h-[85vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Portrait name={npc.name} characterType="NPC" size="lg" />
          <div>
            <p className="text-stone-200 font-semibold text-lg">{npc.name}</p>
            <p className="text-stone-500 text-sm">{String(npc.race)}</p>
            {npc.isDeceased && (
              <p className="text-rose-500 text-xs font-medium mt-0.5">Deceased</p>
            )}
          </div>
        </div>

        <RelationshipMeter trust={npc.trust} love={npc.love} className="mb-3" />

        {/* Tab bar */}
        <div className="flex gap-1 mb-4">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-1.5 text-xs rounded border transition-colors ${
                tab === t.id
                  ? 'border-stone-500 bg-stone-700 text-stone-100'
                  : 'border-stone-800 bg-stone-800/50 text-stone-500 hover:bg-stone-800 hover:text-stone-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="overflow-y-auto flex-1">

          {tab === 'social' && (
            <div className="flex flex-col gap-1">
              <StatRow label="Introduced"      value={npc.hasBeenIntroduced ? 'Yes' : 'No'} />
              <StatRow label="Companion level" value={npc.companionLevel} />
              <StatRow label="Bond"            value={npc.playerBondType !== undefined ? String(npc.playerBondType) : undefined} />
              <StatRow label="Flirts today"    value={`${npc.flirtCountToday} / 3`} />
              <StatRow label="Touches today"   value={`${npc.touchCountToday} / 3`} />
            </div>
          )}

          {tab === 'physical' && (
            <div className="flex flex-col gap-1">
              <StatRow label="Gender"     value={npc.gender !== undefined ? String(npc.gender) : undefined} />
              <StatRow label="Race"       value={npc.race   !== undefined ? String(npc.race)   : undefined} />
              <StatRow label="Body type"  value={npc.bodyType !== undefined ? String(npc.bodyType) : undefined} />
              <StatRow label="Pregnant"   value={npc.pregnancyState !== undefined ? 'Yes' : 'No'} />
              <StatRow label="Lactating"  value={npc.lactationActive ? 'Yes' : 'No'} />
            </div>
          )}

          {tab === 'degradation' && (
            <DegradationSection
              corruption={corruption}
              shame={shame}
              brokenFlag={brokenFlag}
            />
          )}

        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded border border-stone-700 text-stone-400 text-sm hover:bg-stone-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function ContactsTab() {
  const contacts = useContacts();
  const [selectedNpc, setSelectedNpc] = useState<NpcCharacter | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-stone-600 mb-2">{contacts.length} contacts</p>
      {contacts.map((record) => {
        const npc = record.character;
        return (
          <button
            key={npc.npcId}
            onClick={() => setSelectedNpc(npc)}
            className="flex items-center gap-4 p-3 rounded border border-stone-700 bg-stone-800 hover:bg-stone-700 transition-colors text-left w-full"
          >
            <Portrait name={npc.name} characterType="NPC" size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-stone-200 text-sm font-medium">{npc.name}</p>
              <p className="text-stone-500 text-xs">{String(npc.race)}</p>
            </div>
            <div className="w-32 shrink-0">
              <RelationshipMeter trust={npc.trust} love={npc.love} />
            </div>
          </button>
        );
      })}
      {contacts.length === 0 && (
        <p className="text-stone-600 italic text-sm text-center py-8">No contacts yet. Talk to NPCs to add them.</p>
      )}

      {selectedNpc && (
        <ProfileModal npc={selectedNpc} onClose={() => setSelectedNpc(null)} />
      )}
    </div>
  );
}
