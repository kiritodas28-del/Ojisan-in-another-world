/**
 * useContacts.ts
 * Returns the contacts array and a lookup helper.
 * Task UI-1.6
 */

import { useGameStore } from '../store/gameStore';
import type { ContactRecord, NpcCharacter } from '../../state/gameState';

export function useContacts(): ContactRecord[] {
  return useGameStore((s) => s.gameState?.contacts ?? []);
}

export function useFindContact(npcId: string): NpcCharacter | null {
  return useGameStore(
    (s) => s.gameState?.contacts.find((r) => r.character.npcId === npcId)?.character ?? null,
  );
}
