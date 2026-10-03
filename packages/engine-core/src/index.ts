/**
 * @ojisan/engine-core — public barrel
 *
 * Task 26.31: This package will house all pure-logic engines once the monorepo
 * split is performed. For now it re-exports from the legacy src/engines path
 * so the workspace resolves correctly before the actual file move.
 *
 * When the move happens (Phase 26 completion):
 *   1. Copy src/engines/*.ts   → packages/engine-core/src/engines/
 *   2. Copy src/state/*.ts     → packages/engine-core/src/state/
 *   3. Copy src/spawn-engine/  → packages/engine-core/src/spawn-engine/
 *   4. Update all imports in apps/ojisan to use '@ojisan/engine-core/...'
 *   5. Remove the legacy re-export below.
 *
 * DO NOT add React, tRPC, or Vite imports here.
 */

// Stub re-export — replace with direct engine imports after file move.
export * from '../../src/state/gameState';
export * from '../../src/engines/dispatcher';
