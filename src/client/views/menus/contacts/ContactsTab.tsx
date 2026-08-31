/**
 * ContactsTab.tsx
 * Scrollable contact list with Portrait, name, race, RelationshipMeter.
 * Click opens a full profile modal.
 * Task UI-9.5
 */

import { useState } from 'react';
import { useContacts }       from '../../../hooks/useContacts';
import { Portrait }          from '../../../components/Portrait';
import { RelationshipMeter } from '../../../components/RelationshipMeter';
import { Panel }             from '../../../components/Panel';
import type { NpcCharacter } from '../../../../state/gameState';

function ProfileModal({ npc, onClose }: { npc: NpcCharacter; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-stone-900 border border-stone-700 rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center gap-4 mb-4">
          <Portrait name={npc.name} characterType="NPC" size="lg" />
          <div>
            <p className="text-stone-200 font-semibold text-lg">{npc.name}</p>
            <p className="text-stone-500 text-sm">{String(npc.race)}</p>
          </div>
        </div>
        <RelationshipMeter trust={npc.trust} love={npc.love} className="mb-4" />
        <div className="flex flex-col gap-1 text-xs text-stone-400">
          <div className="flex justify-between">
            <span>Introduced</span>
            <span className="text-stone-200">{npc.hasBeenIntroduced ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span>Companion level</span>
            <span className="text-stone-200">{npc.companionLevel}</span>
          </div>
          <div className="flex justify-between">
            <span>Flirts today</span>
            <span className="text-stone-200">{npc.flirtCountToday} / 3</span>
          </div>
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
