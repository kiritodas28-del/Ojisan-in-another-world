/**
 * DialogueView.tsx
 * Branching dialogue screen.
 * Tasks UI-8.1 to UI-8.5
 */

import { useDialogue }   from '../../hooks/useDialogue';
import { useFindContact } from '../../hooks/useContacts';
import { Panel }         from '../../components/Panel';
import { Portrait }      from '../../components/Portrait';
import { ChoiceButton }  from '../../components/ChoiceButton';
import type { DialogueNode } from '../../engines/dialogueEngine';

interface DialogueViewProps {
  initialNode: DialogueNode;
  npcId:       string;
  onClose:     () => void;
}

export function DialogueView({ initialNode, npcId, onClose }: DialogueViewProps) {
  const { node, setNode, choose, loading } = useDialogue();
  const speaker = useFindContact(npcId);

  const current = node ?? initialNode;

  function handleChoice(choiceId: string) {
    choose(choiceId, npcId).then(() => {
      // TODO: server returns next DialogueNode alongside GameState (Task UI-10.1)
      // For now, close dialogue after a choice
      onClose();
    });
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto mt-8">

      {/* Speaker */}
      <div className="flex items-center gap-4">
        <Portrait
          name={speaker?.name ?? npcId}
          characterType="NPC"
          size="lg"
        />
        <div>
          <p className="text-stone-200 font-semibold">{speaker?.name ?? npcId}</p>
          {speaker && (
            <p className="text-stone-500 text-xs">Trust {speaker.trust} · Love {speaker.love}</p>
          )}
        </div>
      </div>

      {/* Dialogue text */}
      <Panel>
        <p className="text-stone-200 leading-relaxed">{current.text}</p>
      </Panel>

      {/* Choices */}
      <div className="flex flex-col gap-2">
        {current.choices.map((choice) => {
          // TODO: evaluate choice.condition against live GameState (Task UI-10.1 / dialogueEngine)
          const locked = false; // placeholder — all choices unlocked in mock mode
          return (
            <ChoiceButton
              key={choice.nextNodeId}
              label={choice.label}
              onClick={() => handleChoice(choice.nextNodeId)}
              locked={locked || loading}
              trustDelta={choice.effects?.trustDelta}
              loveDelta={choice.effects?.loveDelta}
            />
          );
        })}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="self-start text-xs text-stone-600 hover:text-stone-400 transition-colors mt-1"
      >
        ← Back
      </button>
    </div>
  );
}
