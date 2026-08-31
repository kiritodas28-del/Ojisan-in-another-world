/**
 * SkillsTab.tsx
 * Battle tree (left) / Ardor tree (right).
 * Nodes show name, point cost, prerequisites, locked/unlocked state.
 * Task UI-9.3
 *
 * TODO (Task 10.6): Populate from src/data/skills.ts once skill catalog is defined.
 */

import { useGameState } from '../../../hooks/useGameState';
import { Panel }        from '../../../components/Panel';
import { Button }       from '../../../components/Button';

// Placeholder skill data until src/data/skills.ts is populated
const PLACEHOLDER_BATTLE_SKILLS = [
  { id: 'battle_power_strike', name: 'Power Strike', cost: 1, cpwCost: 10, prereqs: [] },
  { id: 'battle_shield_bash',  name: 'Shield Bash',  cost: 1, cpwCost: 8,  prereqs: ['battle_power_strike'] },
  { id: 'battle_war_cry',      name: 'War Cry',      cost: 2, cpwCost: 15, prereqs: ['battle_power_strike'] },
  { id: 'battle_berserker',    name: 'Berserker',    cost: 3, cpwCost: 20, prereqs: ['battle_war_cry'] },
];

const PLACEHOLDER_ARDOR_SKILLS = [
  { id: 'ardor_gentle_touch',  name: 'Gentle Touch',  cost: 1, cpwCost: 5,  prereqs: [] },
  { id: 'ardor_deep_gaze',     name: 'Deep Gaze',     cost: 1, cpwCost: 8,  prereqs: ['ardor_gentle_touch'] },
  { id: 'ardor_whisper',       name: 'Whisper',       cost: 2, cpwCost: 12, prereqs: ['ardor_gentle_touch'] },
  { id: 'ardor_ecstasy',       name: 'Ecstasy',       cost: 3, cpwCost: 20, prereqs: ['ardor_whisper'] },
];

function SkillNode({
  skill,
  unlocked,
  canUnlock,
  onUnlock,
}: {
  skill: typeof PLACEHOLDER_BATTLE_SKILLS[0];
  unlocked: boolean;
  canUnlock: boolean;
  onUnlock: () => void;
}) {
  return (
    <div className={`
      p-3 rounded border text-sm transition-colors
      ${unlocked
        ? 'bg-amber-900/30 border-amber-700 text-amber-200'
        : canUnlock
          ? 'bg-stone-800 border-stone-600 text-stone-200'
          : 'bg-stone-900 border-stone-800 text-stone-600'
      }
    `}>
      <div className="flex justify-between items-start">
        <span className="font-medium">{skill.name}</span>
        <span className="text-xs text-stone-500">{skill.cpwCost} CPW</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-stone-500">{skill.cost} pts</span>
        {!unlocked && (
          <Button
            label="Unlock"
            onClick={onUnlock}
            disabled={!canUnlock}
            disabledReason={!canUnlock ? 'Prerequisites not met or insufficient points' : undefined}
            variant="ghost"
            className="text-xs px-2 py-0.5"
          />
        )}
        {unlocked && <span className="text-xs text-amber-500">✓ Unlocked</span>}
      </div>
    </div>
  );
}

export function SkillsTab() {
  const gameState = useGameState();
  if (!gameState) return null;

  const { unlockedSkillIds, unspentBP, unspentAP, battlePoints, ardorPoints } = gameState.player;

  function renderTree(skills: typeof PLACEHOLDER_BATTLE_SKILLS, pointType: 'BP' | 'AP', unspent: number) {
    return skills.map((skill) => {
      const unlocked   = unlockedSkillIds.includes(skill.id);
      const prereqsMet = skill.prereqs.every((p) => unlockedSkillIds.includes(p));
      const canUnlock  = !unlocked && prereqsMet && unspent >= skill.cost;
      return (
        <SkillNode
          key={skill.id}
          skill={skill}
          unlocked={unlocked}
          canUnlock={canUnlock}
          onUnlock={() => { /* TODO: fire unlockSkill intent */ }}
        />
      );
    });
  }

  return (
    <div className="flex gap-4 h-full">
      <Panel title={`Battle Tree — ${unspentBP} BP available (${battlePoints} total)`} className="flex-1">
        <div className="flex flex-col gap-2">
          {renderTree(PLACEHOLDER_BATTLE_SKILLS, 'BP', unspentBP)}
        </div>
      </Panel>
      <Panel title={`Ardor Tree — ${unspentAP} AP available (${ardorPoints} total)`} className="flex-1">
        <div className="flex flex-col gap-2">
          {renderTree(PLACEHOLDER_ARDOR_SKILLS, 'AP', unspentAP)}
        </div>
      </Panel>
    </div>
  );
}
