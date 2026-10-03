/**
 * @ojisan/data — public barrel
 *
 * Task 26.32: This package will house all authored lore catalogs once the
 * monorepo split is performed. For now it re-exports from the legacy src/data
 * path so the workspace resolves correctly before the actual file move.
 *
 * When the move happens (Phase 26 completion):
 *   1. Copy src/data/*.ts → packages/ojisan-data/src/
 *   2. Update all catalog imports in @ojisan/engine-core to use '@ojisan/data/...'
 *   3. Remove the legacy re-export below.
 */

export * from '../../src/data/items';
export * from '../../src/data/monsters';
export * from '../../src/data/bosses';
export * from '../../src/data/skills';
export * from '../../src/data/quests';
export * from '../../src/data/worldGraph';
export * from '../../src/data/statusEffects';
export * from '../../src/data/recipes';
export * from '../../src/data/achievements';
export * from '../../src/data/namePool';
export * from '../../src/data/dialogueTrees';
export * from '../../src/data/dialogueFragments';
export * from '../../src/data/intimacyCatalog';
export * from '../../src/data/intimacyFragments';
export * from '../../src/data/intimateResponseFragments';
