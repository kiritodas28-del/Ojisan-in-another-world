/**
 * App.tsx
 * Root shell — React Router routes, HUD overlay, mock state loading.
 *
 * Task UI-2.5: Loads mockGameState into Zustand store on startup when
 *   VITE_USE_MOCK=true (set in .env.local). Live tRPC used otherwise (UI-10.1).
 *
 * Task UI-0.3: Named routes:
 *   /          → OverworldView
 *   /combat    → CombatView (requires active CombatState)
 *   /intimacy  → IntimacyView (requires active IntimacyScene)
 *   /dialogue  → DialogueView (requires active DialogueNode + npcId)
 *   /menu/:tab → MenuShell
 */

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { useGameStore }    from './store/gameStore';
import { mockGameState }   from './mock/mockGameState';
import { mockCombatState } from './mock/mockCombatState';
import { mockIntimacyScene } from './mock/mockIntimacyScene';
import { mockDialogueNode }  from './mock/mockDialogueNode';

import { HudShell }      from './views/hud/HudShell';
import { OverworldView } from './views/overworld/OverworldView';
import { CombatView }    from './views/combat/CombatView';
import { IntimacyView }  from './views/intimacy/IntimacyView';
import { DialogueView }  from './views/dialogue/DialogueView';
import { MenuShell }     from './views/menus/MenuShell';

// ─── Inner app (has access to router) ────────────────────────────────────────
function AppInner() {
  const navigate = useNavigate();
  const setGameState = useGameStore((s) => s.setGameState);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load mock state on startup in mock mode
  useEffect(() => {
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';
    if (useMock) {
      setGameState(mockGameState);
    }
    // TODO (UI-10.1): else initialise tRPC session and load save
  }, [setGameState]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col">

      {/* Persistent HUD — always on top */}
      <HudShell onMenuOpen={() => setMenuOpen(true)} />

      {/* Main content area — padded below HUD */}
      <main className="flex-1 pt-16 pb-4 px-4 overflow-hidden flex flex-col">
        <Routes>
          <Route path="/"          element={<OverworldView />} />
          <Route path="/combat"    element={
            <CombatView initialCombatState={mockCombatState} />
          } />
          <Route path="/intimacy"  element={
            <IntimacyView
              initialScene={mockIntimacyScene}
              onSceneEnd={() => navigate('/')}
            />
          } />
          <Route path="/dialogue"  element={
            <DialogueView
              initialNode={mockDialogueNode}
              npcId="npc-elder"
              onClose={() => navigate('/')}
            />
          } />
          {/* Catch-all */}
          <Route path="*" element={<OverworldView />} />
        </Routes>
      </main>

      {/* Menu overlay */}
      {menuOpen && <MenuShell onClose={() => setMenuOpen(false)} />}

      {/* DEV: quick navigation bar (remove before release) */}
      {import.meta.env.DEV && (
        <nav className="fixed bottom-0 left-0 right-0 bg-stone-950/90 border-t border-stone-800 flex gap-1 px-3 py-1 text-[10px] z-30">
          <span className="text-stone-600 mr-2">DEV:</span>
          {[
            ['/', 'Overworld'],
            ['/combat', 'Combat'],
            ['/intimacy', 'Intimacy'],
            ['/dialogue', 'Dialogue'],
          ].map(([path, label]) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
