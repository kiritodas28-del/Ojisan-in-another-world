/**
 * apps/ojisan/src/main.tsx — App entry point stub
 *
 * Task 26.33: Placeholder entry point for the Vite React app.
 * Full wiring (tRPC provider, React Router, Zustand store init)
 * deferred to UI-11 integration phase.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{ background: '#1c1917', color: '#e7e5e4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <p>Ojisan in Another World — app shell placeholder</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
