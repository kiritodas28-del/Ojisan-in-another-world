# Ojisan in Another World — Monorepo Guide

Task 26.35

## Structure

```
Ojisan-in-another-world/
├── package.json              ← workspace root (npm workspaces)
├── packages/
│   ├── engine-core/          ← @ojisan/engine-core
│   │   ├── src/              ← pure TS engines + state types
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ojisan-data/          ← @ojisan/data
│       ├── src/              ← authored lore catalogs
│       ├── package.json
│       └── tsconfig.json
├── apps/
│   └── ojisan/               ← @ojisan/app  (React + Vite + tRPC)
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
└── src/                      ← legacy monolith (to be migrated)
    ├── engines/
    ├── state/
    ├── data/
    ├── spawn-engine/
    ├── api/
    └── client/
```

## Dependency rules

```
@ojisan/app  →  @ojisan/engine-core  ←  @ojisan/data
```

- `@ojisan/engine-core`: zero React, zero tRPC. Pure TypeScript. Only `uuid`.
- `@ojisan/data`: imports types from `@ojisan/engine-core`. No engine logic, no React.
- `@ojisan/app`: imports both. Owns React, Vite, tRPC, Zustand, Tailwind.

## Current status (Phase 26 stub)

The `packages/` and `apps/` trees are **scaffold only**. The actual source files
still live under `src/`. The package barrels (`packages/*/src/index.ts`) re-export
from the legacy `src/` paths so the workspace resolves correctly during development.

**To complete the migration (post Phase 26):**

1. Copy `src/engines/` and `src/state/` into `packages/engine-core/src/`.
2. Copy `src/data/` into `packages/ojisan-data/src/`.
3. Copy `src/spawn-engine/` into `packages/engine-core/src/spawn-engine/`.
4. Copy `src/client/` into `apps/ojisan/src/client/`.
5. Copy `src/api/` into `apps/ojisan/src/api/`.
6. Update all internal imports to use `@ojisan/engine-core/...` and `@ojisan/data/...`.
7. Delete `src/` once all tests pass.

## Dev workflow

```bash
# Install all workspace deps from repo root
npm install

# Type-check everything
npm run typecheck

# Start the Vite dev server (apps/ojisan only)
npm run dev

# Run all tests
npm run test
```

## Notes

- `package.json` at the workspace root is NOT the app's package.json.
  The app's deps live in `apps/ojisan/package.json`.
- Each package has its own `tsconfig.json`. The workspace root has none —
  TypeScript is invoked per-package.
- The `@types/uuid` dep lives in `apps/ojisan` only; `@ojisan/engine-core`
  imports `uuid` directly (no type stub needed for runtime use with `moduleResolution: node`).
