/**
 * MenuShell.tsx
 * Full-screen overlay with tab bar: Inventory / Skills / Quests / Contacts / Manor.
 * Opens from HUD menu button; closes on backdrop click or Escape key.
 * Task UI-9.1
 */

import { useEffect, useState } from 'react';
import { InventoryTab } from './inventory/InventoryTab';
import { SkillsTab }    from './skills/SkillsTab';
import { QuestsTab }    from './quests/QuestsTab';
import { ContactsTab }  from './contacts/ContactsTab';
import { ManorTab }     from './manor/ManorTab';

type Tab = 'inventory' | 'skills' | 'quests' | 'contacts' | 'manor';

interface MenuShellProps {
  onClose: () => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'inventory', label: '🎒 Inventory' },
  { id: 'skills',    label: '⚔️ Skills'    },
  { id: 'quests',    label: '📜 Quests'    },
  { id: 'contacts',  label: '👥 Contacts'  },
  { id: 'manor',     label: '🏠 Manor'     },
];

export function MenuShell({ onClose }: MenuShellProps) {
  const [activeTab, setActiveTab] = useState<Tab>('inventory');

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Panel */}
      <div className="relative w-full max-w-4xl h-[80vh] bg-stone-900 border border-stone-700 rounded-xl flex flex-col overflow-hidden shadow-2xl">

        {/* Tab bar */}
        <div className="flex border-b border-stone-700 bg-stone-950 shrink-0">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                flex-1 py-3 text-sm font-medium transition-colors
                ${activeTab === id
                  ? 'text-amber-400 border-b-2 border-amber-500 bg-stone-900'
                  : 'text-stone-500 hover:text-stone-300'
                }
              `}
            >
              {label}
            </button>
          ))}
          {/* Close button */}
          <button
            onClick={onClose}
            className="px-4 text-stone-600 hover:text-stone-300 text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'inventory' && <InventoryTab />}
          {activeTab === 'skills'    && <SkillsTab    />}
          {activeTab === 'quests'    && <QuestsTab    />}
          {activeTab === 'contacts'  && <ContactsTab  />}
          {activeTab === 'manor'     && <ManorTab      />}
        </div>
      </div>
    </div>
  );
}
