// ============================================================================
// CUTSCENES SEED DATA — FULL EXPANSION (Companion lines only in their intros)
// ============================================================================
import type { CutsceneDef } from "../schemas/schemas";

export const CUTSCENES: CutsceneDef[] = [
    // =========================================================================
    // ACT 1
    // =========================================================================
    {
        id: "kenji_arrival_intro",
        title: "A Stranger in the Vale",
        locationId: "vv_vale_village",
        startingSceneId: "kenji_scene1",
        scenes: [
            {
                sceneId: "kenji_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The morning mist clings to the Vale as Kenji Mori steps off the worn road, still uncertain how he arrived in this world." },
                    { speakerId: "KENJI", text: "So this is the Vale... I suppose I should find someone who can tell me where I am." },
                    { speakerId: "NARRATOR", text: "Villagers eye him warily, but not unkindly. A simple beginning, yet the air hums with unseen tension." },
                ],
            },
            {
                sceneId: "kenji_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "A child runs past, chasing a wooden hoop. An old woman sits by the well, staring at Kenji with clouded eyes." },
                    { speakerId: "OLD_WOMAN", text: "Another wanderer... but you carry something different, don't you?" },
                    { speakerId: "KENJI", text: "I don't know what I carry. I'm still trying to understand." },
                ],
            },
            {
                sceneId: "kenji_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "A young guard approaches, hand resting on his sword hilt, but not aggressively." },
                    { speakerId: "GUARD", text: "State your business, traveler. We've had trouble with bandits and worse." },
                ],
                choices: [
                    { choiceId: "kenji_truth", text: "Tell the truth: you don't know how you got here.", effects: { storyFlag: "met_vale_guard" }, nextSceneId: "kenji_scene4" },
                    { choiceId: "kenji_avoid", text: "Say you're a merchant looking for work.", effects: { storyFlag: "kenji_lied" }, nextSceneId: "kenji_scene4" },
                ],
            },
            {
                sceneId: "kenji_scene4",
                lines: [
                    { speakerId: "GUARD", text: "I'll be watching you. If you're honest, you'll have no trouble in the Vale." },
                    { speakerId: "NARRATOR", text: "The guard steps aside, allowing Kenji deeper into the village." },
                ],
            },
            {
                sceneId: "kenji_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The village opens before him: a market square, a tavern, a shrine, and beyond, the dark line of the forest." },
                    { speakerId: "KENJI", text: "I'll start by looking around. Maybe someone here knows something about the Crest." },
                    { speakerId: "NARRATOR", text: "The first steps of a long journey begin quietly." },
                ],
            },
        ],
    },

    {
        id: "tasha_intro",
        title: "The Warm Hearth",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_scene1",
        scenes: [
            {
                sceneId: "tasha_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "A warm scent of stew and fresh bread draws Kenji to a modest hearth, where Tasha Heart works alone." },
                    { speakerId: "TASHA", text: "Oh! A stranger? Please, come in. You look like you've been walking for days.", expression: "surprised, then warm" },
                    { speakerId: "KENJI", text: "I have. I'm Kenji. This place feels... welcoming." },
                ],
            },
            {
                sceneId: "tasha_scene2",
                lines: [
                    { speakerId: "TASHA", text: "It's mine. Small, but full of heart. Stay and eat.", expression: "gentle smile" },
                    { speakerId: "NARRATOR", text: "The warmth of the fire and her quiet kindness make the world outside seem very far away." },
                ],
            },
            {
                sceneId: "tasha_scene3",
                lines: [
                    { speakerId: "TASHA", text: "You must be tired. Here, I'll make you a plate. No charge." },
                    { speakerId: "KENJI", text: "I don't want to impose." },
                    { speakerId: "TASHA", text: "Nonsense. A full belly makes any trouble smaller." },
                ],
            },
            {
                sceneId: "tasha_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "As they eat, Tasha asks about the road, but avoids questions about her own life." },
                    { speakerId: "TASHA", text: "So, what brings you to the Vale? Not many travelers this season." },
                ],
                choices: [
                    { choiceId: "tasha_share", text: "Share your confusion about how you arrived.", effects: { trustDelta: 3, loveDelta: 2 }, nextSceneId: "tasha_scene5" },
                    { choiceId: "tasha_deflect", text: "Keep it vague for now.", effects: { trustDelta: 0, loveDelta: 0 }, nextSceneId: "tasha_scene5" },
                ],
            },
            {
                sceneId: "tasha_scene5",
                lines: [
                    { speakerId: "TASHA", text: "Well, whatever the reason, you're welcome here as long as you need.", expression: "warm, a little lonely" },
                    { speakerId: "NARRATOR", text: "The fire crackles softly, and for a moment, the world seems less heavy." },
                ],
            },
        ],
    },

    {
        id: "mira_intro",
        title: "The Herbalist's Plea",
        locationId: "vv_herbalist_shop",
        startingSceneId: "mira_scene1",
        scenes: [
            {
                sceneId: "mira_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Herbalist's Shop is quiet, but tension lingers as Mira Ashveil looks up with tired, kind eyes." },
                    { speakerId: "MIRA", text: "Please... the wolves are getting bolder. The village needs help. I... I can't ask anyone else." },
                    { speakerId: "KENJI", text: "I'm here. Tell me what's happening." },
                ],
            },
            {
                sceneId: "mira_scene2",
                lines: [
                    { speakerId: "MIRA", text: "Thank you. I don't know what I'd do if you refused.", expression: "relieved, close to tears" },
                    { speakerId: "NARRATOR", text: "For a moment, her tired face softens, and she looks at Kenji as if he were more than a stranger." },
                ],
            },
            {
                sceneId: "mira_scene3",
                lines: [
                    { speakerId: "MIRA", text: "The wolves have killed three sheep and injured a farmer. They're not just hunting—they're corrupted." },
                    { speakerId: "KENJI", text: "Corrupted? How can you tell?" },
                    { speakerId: "MIRA", text: "The wounds they leave don't heal. They fester with black veins." },
                ],
            },
            {
                sceneId: "mira_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira's hands tremble as she wraps a bandage, her exhaustion plain." },
                    { speakerId: "KENJI", text: "You look like you haven't slept in days. Let me help." },
                ],
                choices: [
                    { choiceId: "mira_encourage", text: "Gently insist she rest while you handle it.", effects: { trustDelta: 4, loveDelta: 3 }, nextSceneId: "mira_scene5" },
                    { choiceId: "mira_push", text: "Ask if she can keep working for now.", effects: { trustDelta: 0, loveDelta: -1 }, nextSceneId: "mira_scene5" },
                ],
            },
            {
                sceneId: "mira_scene5",
                lines: [
                    { speakerId: "MIRA", text: "I can't rest. Not while people are suffering." },
                    { speakerId: "NARRATOR", text: "She smiles weakly, but the weight in her eyes is a door she hasn't opened." },
                ],
            },
        ],
    },

    {
        id: "blight_discovery",
        title: "Blighted Shadows",
        locationId: "vv_forest",
        startingSceneId: "blight_scene1",
        scenes: [
            {
                sceneId: "blight_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The forest air thickens, and black veins pulse along the roots. Something is deeply wrong." },
                    { speakerId: "KENJI", text: "This corruption... it's spreading fast." },
                ],
            },
            {
                sceneId: "blight_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "A low growl echoes between the trees. The blight is not just sickness—it has teeth." },
                    { speakerId: "KENJI", text: "Wolves... but wrong." },
                ],
            },
            {
                sceneId: "blight_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "A pack of Blighted Direwolves emerges, eyes burning with black fire." },
                    { speakerId: "NARRATOR", text: "They circle slowly, heads low, growls vibrating the ground." },
                ],
            },
            {
                sceneId: "blight_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I don't have time to run. Fight it is." },
                    { speakerId: "NARRATOR", text: "The first wolf lunges." },
                ],
            },
            {
                sceneId: "blight_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The fight is brutal, but when it ends, the black veins fade from the fallen wolves." },
                    { speakerId: "KENJI", text: "This corruption isn't natural. Someone or something is spreading it." },
                ],
            },
        ],
    },

    {
        id: "ley_node_reveal",
        title: "The Ley Node Grove",
        locationId: "vv_ley_node_grove",
        startingSceneId: "ley_scene1",
        scenes: [
            {
                sceneId: "ley_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The grove opens into a clearing where the air crackles with faded light." },
                    { speakerId: "KENJI", text: "So this is the source... I have to destroy it." },
                ],
            },
            {
                sceneId: "ley_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "At its center stands a corrupted tree, its bark weeping miasma." },
                    { speakerId: "NARRATOR", text: "The ground pulses like a heartbeat, sick and slow." },
                ],
            },
            {
                sceneId: "ley_scene3",
                lines: [
                    { speakerId: "KENJI", text: "The air is thick... I can barely breathe." },
                    { speakerId: "NARRATOR", text: "The tree shifts, its branches forming a face of agony." },
                ],
            },
            {
                sceneId: "ley_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "A voice, not quite sound, seeps into Kenji's mind." },
                    { speakerId: "VOICE", text: "You are too late, Crest-bearer. The rot is already in the roots." },
                ],
            },
            {
                sceneId: "ley_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The tree erupts into movement. The battle for the Ley Node begins." },
                ],
            },
        ],
    },

    {
        id: "astraea_dream_vision_act1_end",
        title: "Astraea's Dream Vision",
        locationId: "vv_ley_node_grove",
        startingSceneId: "astraea_scene1",
        scenes: [
            {
                sceneId: "astraea_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "After the Treant falls, the world dissolves into light." },
                    { speakerId: "KENJI", text: "Where... am I?" },
                ],
            },
            {
                sceneId: "astraea_scene2",
                lines: [
                    { speakerId: "Astraea", text: "You are between worlds, Kenji Mori." },
                    { speakerId: "Astraea", text: "I am Astraea. You carry the Crest of Ardor." },
                ],
            },
            {
                sceneId: "astraea_scene3",
                lines: [
                    { speakerId: "KENJI", text: "The Crest? I don't understand." },
                    { speakerId: "Astraea", text: "It chose you. With it, you can purify the corruption and unite hearts." },
                ],
            },
            {
                sceneId: "astraea_scene4",
                lines: [
                    { speakerId: "Astraea", text: "The path ahead will break you, but also remake you." },
                    { speakerId: "Astraea", text: "Trust in those who choose to walk beside you." },
                ],
            },
            {
                sceneId: "astraea_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Her golden eyes soften before the vision fades into dawn light." },
                    { speakerId: "KENJI", text: "Astraea... I'll remember." },
                ],
            },
        ],
    },

    // =========================================================================
    // ACT 2
    // =========================================================================
    {
        id: "aethermoor_intro",
        title: "Aethermoor Arrival",
        locationId: "ae_aethermoor_city",
        startingSceneId: "aethermoor_scene1",
        scenes: [
            {
                sceneId: "aethermoor_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Spires of marble and crystal rise over Aethermoor City, beautiful and cold." },
                    { speakerId: "KENJI", text: "This place feels different. More magic, more secrets." },
                ],
            },
            {
                sceneId: "aethermoor_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The city hums with arcane power, but beneath it runs a current of unease." },
                    { speakerId: "KENJI", text: "I need to find out what's wrong here." },
                ],
            },
            {
                sceneId: "aethermoor_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "A guard in crystal armor stops him at the gate." },
                    { speakerId: "GUARD", text: "State your purpose, foreigner." },
                ],
                choices: [
                    { choiceId: "aethermoor_open", text: "Explain your mission.", effects: { storyFlag: "aethermoor_welcome" }, nextSceneId: "aethermoor_scene4" },
                    { choiceId: "aethermoor_hide", text: "Say you're a trader.", effects: { storyFlag: "aethermoor_suspicion" }, nextSceneId: "aethermoor_scene4" },
                ],
            },
            {
                sceneId: "aethermoor_scene4",
                lines: [
                    { speakerId: "GUARD", text: "Very well. But watch your step; the city has been strange lately." },
                ],
            },
            {
                sceneId: "aethermoor_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The streets are clean, but the people are quiet, as if afraid to speak too loudly." },
                ],
            },
        ],
    },

    {
        id: "isolde_intro",
        title: "The Archivist's Request",
        locationId: "ae_isolde_estate",
        startingSceneId: "isolde_scene1",
        scenes: [
            {
                sceneId: "isolde_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Isolde Valen stands by a high window, her platinum hair like moonlight. She does not turn as Kenji enters." },
                    { speakerId: "ISOLDE", text: "You waste my time with pleasantries. The wraiths are devouring knowledge older than your entire bloodline." },
                    { speakerId: "KENJI", text: "Then let's not waste any more time." },
                ],
            },
            {
                sceneId: "isolde_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "Hmph. Perhaps you are not entirely useless.", expression: "slight, reluctant approval" },
                    { speakerId: "NARRATOR", text: "There is no warmth in her words, but her eyes linger on Kenji a moment longer than expected." },
                ],
            },
            {
                sceneId: "isolde_scene3",
                lines: [
                    { speakerId: "ISOLDE", text: "The wraiths are drawn to the city's archives. They steal memories and knowledge." },
                    { speakerId: "KENJI", text: "Why would they want knowledge?" },
                    { speakerId: "ISOLDE", text: "Because knowledge is power, mortal. Even you should know that." },
                ],
            },
            {
                sceneId: "isolde_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She finally turns, her gaze like winter." },
                    { speakerId: "ISOLDE", text: "You will help me clear the archive. In return, I may consider assisting your little quest." },
                ],
            },
            {
                sceneId: "isolde_scene5",
                lines: [
                    { speakerId: "KENJI", text: "I didn't come here to bargain, but I'll help." },
                    { speakerId: "NARRATOR", text: "For a brief moment, something unreadable flickers in her icy eyes." },
                ],
            },
        ],
    },

    {
        id: "golem_activation",
        title: "Rogue Automatons",
        locationId: "ae_mine",
        startingSceneId: "golem_scene1",
        scenes: [
            {
                sceneId: "golem_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The quarry shudders as ancient golems grind to life, their eyes burning with corrupted mana." },
                    { speakerId: "KENJI", text: "They're waking up... and they're not friendly." },
                ],
            },
            {
                sceneId: "golem_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The ground trembles under heavy stone steps." },
                    { speakerId: "KENJI", text: "I need to shut them down before they reach the city." },
                ],
            },
            {
                sceneId: "golem_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "A golem turns toward Kenji, its single eye glowing." },
                    { speakerId: "GOLEM", text: "INTRUDER DETECTED. TERMINATE." },
                ],
            },
            {
                sceneId: "golem_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Great. No reasoning with this one." },
                    { speakerId: "NARRATOR", text: "The battle begins." },
                ],
            },
            {
                sceneId: "golem_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "After the last golem falls, a strange crystal is revealed." },
                    { speakerId: "KENJI", text: "This crystal... the corruption is using them as guardians." },
                ],
            },
        ],
    },

    {
        id: "archivist_boss_tease",
        title: "The Wraith Archivist",
        locationId: "ae_forest",
        startingSceneId: "archivist_scene1",
        scenes: [
            {
                sceneId: "archivist_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "A specter rises from the forest mist, clutching a staff of black crystal." },
                    { speakerId: "NARRATOR", text: "Its voice is dry as dust. 'None may steal the secrets I guard.'" },
                ],
            },
            {
                sceneId: "archivist_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I don't want your secrets. I want the corruption gone." },
                    { speakerId: "ARCHIVIST", text: "Fool. The corruption is the only thing keeping the true darkness at bay." },
                ],
            },
            {
                sceneId: "archivist_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The wraith raises its staff, and the mist coils into burning tendrils." },
                ],
            },
            {
                sceneId: "archivist_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Then I'll destroy both." },
                    { speakerId: "ARCHIVIST", text: "You will try, mortal." },
                ],
            },
            {
                sceneId: "archivist_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The battle with the Wraith Archivist begins." },
                ],
            },
        ],
    },

    {
        id: "act2_end_revelation",
        title: "Aethermoor's Secret",
        locationId: "ae_aethermoor_city",
        startingSceneId: "act2_end_scene1",
        scenes: [
            {
                sceneId: "act2_end_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "As the Archivist falls, a vision blooms: a golden court, a rising shadow, and the Crest of Ardor glowing on Kenji's chest." },
                ],
            },
            {
                sceneId: "act2_end_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The path leads to the Crimson March—and to war." },
                ],
            },
            {
                sceneId: "act2_end_scene3",
                lines: [
                    { speakerId: "KENJI", text: "War... I've never been a soldier, but I'll do what I must." },
                ],
            },
            {
                sceneId: "act2_end_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The vision fades, leaving behind a heavy silence." },
                ],
            },
            {
                sceneId: "act2_end_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The next region awaits." },
                ],
            },
        ],
    },

    // =========================================================================
    // ACT 3
    // =========================================================================
    {
        id: "crimson_march_intro",
        title: "Crimson Camp",
        locationId: "cm_crimson_camp",
        startingSceneId: "crimson_scene1",
        scenes: [
            {
                sceneId: "crimson_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Crimson March is raw and red, a land shaped by battle and blood." },
                    { speakerId: "KENJI", text: "This is a place where only the strong survive." },
                ],
            },
            {
                sceneId: "crimson_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Camp banners snap in the hot wind as warriors watch the newcomer." },
                ],
            },
            {
                sceneId: "crimson_scene3",
                lines: [
                    { speakerId: "WARRIOR", text: "Another outlander? You'll have to earn your place." },
                    { speakerId: "KENJI", text: "I've never asked for anything free." },
                ],
            },
            {
                sceneId: "crimson_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The warrior grins and points toward the smithy." },
                    { speakerId: "WARRIOR", text: "Grael's the one to talk to. She runs this camp." },
                ],
            },
            {
                sceneId: "crimson_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The camp is rough, but there's a strange sense of order." },
                ],
            },
        ],
    },

    {
        id: "grael_intro",
        title: "The Blacksmith's Oath",
        locationId: "cm_grael_smithy",
        startingSceneId: "grael_scene1",
        scenes: [
            {
                sceneId: "grael_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "In the glowing heat of the smithy, Grael Ironhide hammers steel with slow, powerful strikes." },
                    { speakerId: "GRAEL", text: "If you want my help, prove you're worth my time. Spare me the soft words." },
                    { speakerId: "KENJI", text: "I'm not here for words. I'm here for the fight." },
                ],
            },
            {
                sceneId: "grael_scene2",
                lines: [
                    { speakerId: "GRAEL", text: "Good. Then let's see what you've got.", expression: "grinning fiercely" },
                    { speakerId: "NARRATOR", text: "The air grows heavy with the promise of a friendly, violent test." },
                ],
            },
            {
                sceneId: "grael_scene3",
                lines: [
                    { speakerId: "GRAEL", text: "First, let's see if you can lift my hammer." },
                    { speakerId: "NARRATOR", text: "She gestures to a massive warhammer resting against the anvil." },
                ],
            },
            {
                sceneId: "grael_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Is that all?" },
                    { speakerId: "GRAEL", text: "Hah! Cocky. I like that." },
                ],
            },
            {
                sceneId: "grael_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "After the test, Grael's respect seems slightly warmer." },
                ],
            },
        ],
    },

    {
        id: "valka_intro",
        title: "Wyrmling Threat",
        locationId: "cm_valka_den",
        startingSceneId: "valka_scene1",
        scenes: [
            {
                sceneId: "valka_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka Ember sits within her den, a tail coiled behind her, amber eyes narrowing." },
                    { speakerId: "VALKA", text: "You smell like smoke and foreign roads. Why should I trust you?" },
                    { speakerId: "KENJI", text: "Because I'm the only one insane enough to fight a wyrm with you." },
                ],
            },
            {
                sceneId: "valka_scene2",
                lines: [
                    { speakerId: "VALKA", text: "Hah! I like that answer. But words mean nothing. Keep up, or be left behind.", expression: "fierce, amused" },
                    { speakerId: "NARRATOR", text: "Her tail flicks with barely restrained energy, and the den feels electric." },
                ],
            },
            {
                sceneId: "valka_scene3",
                lines: [
                    { speakerId: "VALKA", text: "The wyrmlings have been attacking travelers along the pass." },
                    { speakerId: "KENJI", text: "Then let's hunt." },
                ],
            },
            {
                sceneId: "valka_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka rises, stretching like a predator." },
                ],
            },
            {
                sceneId: "valka_scene5",
                lines: [
                    { speakerId: "VALKA", text: "Don't die. It would be annoying." },
                ],
            },
        ],
    },

    {
        id: "miasma_wyrm_tease",
        title: "The Miasma Wyrm",
        locationId: "cm_wyrm_peak",
        startingSceneId: "wyrm_scene1",
        scenes: [
            {
                sceneId: "wyrm_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The peak trembles. A great shape coils through the clouds, its scales dripping poison." },
                ],
            },
            {
                sceneId: "wyrm_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The Miasma Wyrm is awake—and it has seen them." },
                ],
            },
            {
                sceneId: "wyrm_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The creature is enormous, far larger than any wyrmling." },
                    { speakerId: "KENJI", text: "Doesn't matter. We have to stop it." },
                ],
            },
            {
                sceneId: "wyrm_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The wyrm roars, and the air fills with poison mist." },
                ],
            },
            {
                sceneId: "wyrm_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The battle for the Crimson March begins." },
                ],
            },
        ],
    },

    {
        id: "act3_end_vision",
        title: "Crimson Aftermath",
        locationId: "cm_crimson_camp",
        startingSceneId: "act3_end_scene1",
        scenes: [
            {
                sceneId: "act3_end_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "As the Wyrm falls, the Crimson March grows quiet. Warriors lower their weapons in respect." },
                ],
            },
            {
                sceneId: "act3_end_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "But the vision shows deeper shadows in the Whispering Wood." },
                ],
            },
            {
                sceneId: "act3_end_scene3",
                lines: [
                    { speakerId: "KENJI", text: "I'm not done yet. The corruption is spreading." },
                ],
            },
            {
                sceneId: "act3_end_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The people of the camp look on, understanding that the fight is far from over." },
                ],
            },
            {
                sceneId: "act3_end_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The road leads to the Whispering Wood." },
                ],
            },
        ],
    },

    // =========================================================================
    // ACT 4
    // =========================================================================
    {
        id: "whispering_wood_intro",
        title: "Misty Treeline",
        locationId: "ww_treeline_hub",
        startingSceneId: "ww_scene1",
        scenes: [
            {
                sceneId: "ww_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Whispering Wood is silent, the mist so thick it swallows sound." },
                    { speakerId: "KENJI", text: "This place feels... watched." },
                ],
            },
            {
                sceneId: "ww_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Branches move without wind. Something waits between the trees." },
                ],
            },
            {
                sceneId: "ww_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "A figure steps out of the mist, hooded and silent." },
                ],
            },
            {
                sceneId: "ww_scene4",
                lines: [
                    { speakerId: "STRANGER", text: "Turn back, Crest-bearer. The forest does not welcome outsiders." },
                    { speakerId: "KENJI", text: "I'm not here for welcome. I'm here to stop the rot." },
                ],
            },
            {
                sceneId: "ww_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The figure pauses, then vanishes into the fog." },
                ],
            },
        ],
    },

    {
        id: "seira_intro",
        title: "The Shadow in the Woods",
        locationId: "ww_forest",
        startingSceneId: "seira_scene1",
        scenes: [
            {
                sceneId: "seira_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "A knife flashes in the dim light, then stops an inch from Kenji's throat." },
                    { speakerId: "SEIRA", text: "Not bad. Most men die before they see me.", expression: "amused, dangerous" },
                    { speakerId: "KENJI", text: "Then I must be lucky." },
                ],
            },
            {
                sceneId: "seira_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "Luck won't save you next time. But for now... I'm curious.", expression: "grin, knife vanishes" },
                    { speakerId: "NARRATOR", text: "She melts back into shadow, leaving only the scent of night flowers." },
                ],
            },
            {
                sceneId: "seira_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "A rustle behind him. She reappears on a branch above." },
                    { speakerId: "SEIRA", text: "You're not from around here. What's your business in my woods?" },
                ],
            },
            {
                sceneId: "seira_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Your woods? I didn't see a sign." },
                    { speakerId: "SEIRA", text: "I am the sign." },
                ],
            },
            {
                sceneId: "seira_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She drops down, landing silently before him." },
                ],
            },
        ],
    },

    {
        id: "sylvara_intro",
        title: "The Moonlit Grove",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_scene1",
        scenes: [
            {
                sceneId: "sylvara_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Moonlight pools in a hidden grove where Sylvara Moon kneels among silver flowers." },
                    { speakerId: "SYLVARA", text: "You walk softly. Most men trample everything they touch." },
                    { speakerId: "KENJI", text: "I've learned to be careful where I step." },
                ],
            },
            {
                sceneId: "sylvara_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "Good. This grove has already lost too much.", expression: "melancholic, grateful" },
                    { speakerId: "NARRATOR", text: "For a moment, the silence between them is comfortable, like old friends." },
                ],
            },
            {
                sceneId: "sylvara_scene3",
                lines: [
                    { speakerId: "SYLVARA", text: "The corruption is poisoning the roots. I've tried to hold it back, but I'm only one." },
                    { speakerId: "KENJI", text: "Then let me help." },
                ],
            },
            {
                sceneId: "sylvara_scene4",
                lines: [
                    { speakerId: "SYLVARA", text: "You would? Even though you don't know me?" },
                    { speakerId: "KENJI", text: "I know enough." },
                ],
            },
            {
                sceneId: "sylvara_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Her eyes glisten, and for the first time, hope flickers there." },
                ],
            },
        ],
    },

    {
        id: "heartwood_abomination_tease",
        title: "Corruption's Roots",
        locationId: "ww_heartwood_grove",
        startingSceneId: "heartwood_tease_scene1",
        scenes: [
            {
                sceneId: "heartwood_tease_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The trees twist into screaming faces. Black sap bleeds from the ground." },
                ],
            },
            {
                sceneId: "heartwood_tease_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "At the center of the grove, something immense stirs beneath the roots." },
                ],
            },
            {
                sceneId: "heartwood_tease_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The corruption stirs, and the ground begins to crack." },
                    { speakerId: "KENJI", text: "Not yet. We can still stop it." },
                ],
            },
            {
                sceneId: "heartwood_tease_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The ground cracks, and a foul wind rises." },
                ],
            },
            {
                sceneId: "heartwood_tease_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The Heartwood Abomination begins to rise." },
                ],
            },
        ],
    },

    {
        id: "heartwood_abomination_encounter",
        title: "The Heartwood Abomination",
        locationId: "ww_heartwood_grove",
        startingSceneId: "heartwood_enc_scene1",
        scenes: [
            {
                sceneId: "heartwood_enc_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Heartwood Abomination rises, a towering mass of bark, flesh, and rot." },
                ],
            },
            {
                sceneId: "heartwood_enc_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Its many eyes fix on Kenji, and the forest itself screams." },
                ],
            },
            {
                sceneId: "heartwood_enc_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The creature's wounds close almost as fast as they are inflicted." },
                    { speakerId: "KENJI", text: "Then we'll have to destroy it faster than it heals." },
                ],
            },
            {
                sceneId: "heartwood_enc_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The battle against the Heartwood Abomination begins." },
                ],
            },
            {
                sceneId: "heartwood_enc_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji steadies himself for the fight of his life." },
                ],
            },
        ],
    },

    {
        id: "act4_end_revelation",
        title: "Whispering Aftermath",
        locationId: "ww_treeline_hub",
        startingSceneId: "act4_end_scene1",
        scenes: [
            {
                sceneId: "act4_end_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "As the Abomination collapses, the Whispering Wood breathes again." },
                ],
            },
            {
                sceneId: "act4_end_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "But the corruption was only a symptom. The true sickness lies in the Auric Court." },
                ],
            },
            {
                sceneId: "act4_end_scene3",
                lines: [
                    { speakerId: "KENJI", text: "The Court... I thought they were the clean ones." },
                ],
            },
            {
                sceneId: "act4_end_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The path forward is clear, though the destination is not." },
                ],
            },
            {
                sceneId: "act4_end_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The Auric Court awaits." },
                ],
            },
        ],
    },

    // =========================================================================
    // ACT 5
    // =========================================================================
    {
        id: "auric_court_intro",
        title: "Auric Arrival",
        locationId: "ac_auric_court",
        startingSceneId: "auric_scene1",
        scenes: [
            {
                sceneId: "auric_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Auric Court gleams with gold and marble, but the air smells of intrigue." },
                    { speakerId: "KENJI", text: "This place is too clean. Something's rotting underneath." },
                ],
            },
            {
                sceneId: "auric_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Nobles smile with closed eyes, and shadows move behind every pillar." },
                ],
            },
            {
                sceneId: "auric_scene3",
                lines: [
                    { speakerId: "NOBLE", text: "Another servant of the wilds? Do mind your manners." },
                    { speakerId: "KENJI", text: "I'll mind yours if you mind mine." },
                ],
            },
            {
                sceneId: "auric_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The noble scoffs and walks away." },
                ],
            },
            {
                sceneId: "auric_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji can feel many eyes watching, weighing, judging." },
                ],
            },
        ],
    },

    {
        id: "sera_intro",
        title: "The Pilgrim from the Monastery",
        locationId: "ac_auric_court",
        startingSceneId: "sera_scene1",
        scenes: [
            {
                sceneId: "sera_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera Void stands like a blade among silk-clad nobles, her eyes fixed on Kenji." },
                    { speakerId: "SERA", text: "You carry the Crest of Ardor. I was told you would come." },
                    { speakerId: "KENJI", text: "And you are?" },
                ],
            },
            {
                sceneId: "sera_scene2",
                lines: [
                    { speakerId: "SERA", text: "Someone sent to decide if you are savior or heretic.", expression: "unreadable" },
                    { speakerId: "NARRATOR", text: "Her hand rests on a sword hilt, but her eyes hold a flicker of doubt." },
                ],
            },
            {
                sceneId: "sera_scene3",
                lines: [
                    { speakerId: "SERA", text: "The monastery sent me. The corruption has reached even here." },
                    { speakerId: "KENJI", text: "Then you know what I'm fighting." },
                ],
            },
            {
                sceneId: "sera_scene4",
                lines: [
                    { speakerId: "SERA", text: "I know what you claim to fight. That is not the same." },
                ],
            },
            {
                sceneId: "sera_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns away, but not before her gaze lingers on the Crest." },
                ],
            },
        ],
    },

    {
        id: "reva_intro",
        title: "The Fox's Game",
        locationId: "ac_market_square",
        startingSceneId: "reva_scene1",
        scenes: [
            {
                sceneId: "reva_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "A playful laugh cuts through the market noise. Reva Fox leans against a stall, tails swaying." },
                    { speakerId: "REVA", text: "My, my... I've heard about you. The man who burns bright enough to make goddesses look." },
                    { speakerId: "KENJI", text: "And you must be the one causing all the trouble." },
                ],
            },
            {
                sceneId: "reva_scene2",
                lines: [
                    { speakerId: "REVA", text: "Trouble? I prefer 'entertainment'.", expression: "wicked grin" },
                    { speakerId: "NARRATOR", text: "Her tails curl around her like silken shadows, and the crowd seems to part just for her." },
                ],
            },
            {
                sceneId: "reva_scene3",
                lines: [
                    { speakerId: "REVA", text: "I have a game for you, Crest-bearer. Are you interested?" },
                    { speakerId: "KENJI", text: "Depends on the stakes." },
                ],
            },
            {
                sceneId: "reva_scene4",
                lines: [
                    { speakerId: "REVA", text: "Oh, just a little secret. The kind that makes powerful men tremble." },
                ],
            },
            {
                sceneId: "reva_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She slips a folded paper into his hand and vanishes into the crowd." },
                ],
            },
        ],
    },

    {
        id: "archive_infiltration",
        title: "Secret Archive",
        locationId: "ac_secret_archive",
        startingSceneId: "archive_scene1",
        scenes: [
            {
                sceneId: "archive_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Secret Archive is a maze of forbidden texts and flickering torchlight." },
                    { speakerId: "KENJI", text: "If the conspiracy hides here, we need to move fast." },
                ],
            },
            {
                sceneId: "archive_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Distant footsteps echo. Guards are searching." },
                ],
            },
            {
                sceneId: "archive_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji finds a hidden passage behind a bookshelf." },
                ],
            },
            {
                sceneId: "archive_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "He slips through narrow shelves and hidden doors." },
                ],
            },
            {
                sceneId: "archive_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "At last, a heavy door leads to the inner vault." },
                ],
            },
        ],
    },

    {
        id: "malakor_succubus_reveal",
        title: "The Hybrid Conspiracy",
        locationId: "ac_secret_archive",
        startingSceneId: "malakor_scene1",
        scenes: [
            {
                sceneId: "malakor_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "High Inquisitor Malakor stands before a swirling miasma portal, the Miasma Succubus at his side." },
                ],
            },
            {
                sceneId: "malakor_scene2",
                lines: [
                    { speakerId: "MALAKOR", text: "You are too late, Crest-bearer. The Court has already fallen." },
                ],
            },
            {
                sceneId: "malakor_scene3",
                lines: [
                    { speakerId: "SUCCUBUS", text: "But you... you would make a beautiful plaything." },
                ],
            },
            {
                sceneId: "malakor_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I'm not here to be played with. I'm here to end this." },
                ],
            },
            {
                sceneId: "malakor_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Malakor raises his hand, and the portal flares to life." },
                ],
            },
        ],
    },

    {
        id: "act5_end_vision",
        title: "Auric Aftermath",
        locationId: "ac_auric_court",
        startingSceneId: "act5_end_scene1",
        scenes: [
            {
                sceneId: "act5_end_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "With Malakor and the Succubus defeated, the Auric Court exhales." },
                ],
            },
            {
                sceneId: "act5_end_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Yet the vision is clear: the rot spreads downward, into the Sunken Sanctum." },
                ],
            },
            {
                sceneId: "act5_end_scene3",
                lines: [
                    { speakerId: "KENJI", text: "So it's not over. It's never over." },
                ],
            },
            {
                sceneId: "act5_end_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The remaining courtiers avoid his gaze, pretending not to understand." },
                ],
            },
            {
                sceneId: "act5_end_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The Sunken Sanctum calls from below." },
                ],
            },
        ],
    },

    // =========================================================================
    // ACT 6
    // =========================================================================
    {
        id: "sunken_sanctum_intro",
        title: "Crater's Edge",
        locationId: "ss_craters_edge",
        startingSceneId: "sanctum_scene1",
        scenes: [
            {
                sceneId: "sanctum_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Crater's Edge drops into a black abyss. Faint lights flicker far below." },
                    { speakerId: "KENJI", text: "This is the way down. No turning back now." },
                ],
            },
            {
                sceneId: "sanctum_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The wind carries whispers of hunger and loss." },
                ],
            },
            {
                sceneId: "sanctum_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "A lone survivor huddles near a makeshift camp." },
                    { speakerId: "SURVIVOR", text: "You're going down? May the gods protect you." },
                ],
            },
            {
                sceneId: "sanctum_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I'll protect myself." },
                ],
            },
            {
                sceneId: "sanctum_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji begins the descent into the deep." },
                ],
            },
        ],
    },

    {
        id: "void_stalker_encounter",
        title: "Void Stalkers",
        locationId: "ss_forest",
        startingSceneId: "stalker_scene1",
        scenes: [
            {
                sceneId: "stalker_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Shapes move between the rocks—too fast, too silent." },
                ],
            },
            {
                sceneId: "stalker_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Void Stalkers. Their eyes are empty, but they hunt." },
                ],
            },
            {
                sceneId: "stalker_scene3",
                lines: [
                    { speakerId: "KENJI", text: "They're surrounding us." },
                ],
            },
            {
                sceneId: "stalker_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "One leaps from the shadows." },
                ],
            },
            {
                sceneId: "stalker_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The fight begins." },
                ],
            },
        ],
    },

    {
        id: "void_concubine_tease",
        title: "The Concubine's Lair",
        locationId: "ss_void_rift",
        startingSceneId: "concubine_tease_scene1",
        scenes: [
            {
                sceneId: "concubine_tease_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "A soft, terrible laughter floats from the rift." },
                ],
            },
            {
                sceneId: "concubine_tease_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The Void Concubine waits within, draped in darkness and desire." },
                ],
            },
            {
                sceneId: "concubine_tease_scene3",
                lines: [
                    { speakerId: "VOICE", text: "Come closer, little light. I have waited so long for a soul like yours." },
                ],
            },
            {
                sceneId: "concubine_tease_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Your waiting is over." },
                ],
            },
            {
                sceneId: "concubine_tease_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The rift widens, and the true lair is revealed." },
                ],
            },
        ],
    },

    {
        id: "act6_end_revelation",
        title: "Sanctum Aftermath",
        locationId: "ss_craters_edge",
        startingSceneId: "act6_end_scene1",
        scenes: [
            {
                sceneId: "act6_end_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Sunken Sanctum falls silent. The path upward is open." },
                ],
            },
            {
                sceneId: "act6_end_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Only one threshold remains: the Celestial Threshold, where gods and monsters meet." },
                ],
            },
            {
                sceneId: "act6_end_scene3",
                lines: [
                    { speakerId: "KENJI", text: "I'm almost done. But it feels like the hardest part is still ahead." },
                ],
            },
            {
                sceneId: "act6_end_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The sky above is beginning to change, as if the world itself holds its breath." },
                ],
            },
            {
                sceneId: "act6_end_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The Celestial Threshold awaits." },
                ],
            },
        ],
    },

    // =========================================================================
    // ACT 7
    // =========================================================================
    {
        id: "celestial_threshold_intro",
        title: "Threshold Gate",
        locationId: "ct_threshold_gate",
        startingSceneId: "celestial_scene1",
        scenes: [
            {
                sceneId: "celestial_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Threshold Gate rises beyond clouds, carved from light and silence." },
                    { speakerId: "KENJI", text: "I can feel it... the end is close." },
                ],
            },
            {
                sceneId: "celestial_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The very air trembles with divine power." },
                ],
            },
            {
                sceneId: "celestial_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "A guardian of light appears, blocking the gate." },
                ],
            },
            {
                sceneId: "celestial_scene4",
                lines: [
                    { speakerId: "GUARDIAN", text: "Only the pure of heart may pass." },
                    { speakerId: "KENJI", text: "I'm not pure. I'm determined." },
                ],
            },
            {
                sceneId: "celestial_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The guardian studies him for a long moment, then steps aside." },
                ],
            },
        ],
    },

    {
        id: "lyra_intro",
        title: "Fallen Angel",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_scene1",
        scenes: [
            {
                sceneId: "lyra_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Lyra Fallen stands at the edge of her sanctum, wings folded against a grief-struck sky." },
                    { speakerId: "LYRA", text: "You've come to the end. Do you expect to win?" },
                    { speakerId: "KENJI", text: "I expect to try." },
                ],
            },
            {
                sceneId: "lyra_scene2",
                lines: [
                    { speakerId: "LYRA", text: "Then perhaps... I will watch.", expression: "quiet, distant" },
                    { speakerId: "NARRATOR", text: "Her wings tremble, not from cold, but from a hope she barely allows herself to feel." },
                ],
            },
            {
                sceneId: "lyra_scene3",
                lines: [
                    { speakerId: "LYRA", text: "I was cast out for compassion. They called it weakness." },
                    { speakerId: "KENJI", text: "Maybe it was the only true strength." },
                ],
            },
            {
                sceneId: "lyra_scene4",
                lines: [
                    { speakerId: "LYRA", text: "Why do you care? I am no ally." },
                    { speakerId: "KENJI", text: "Because no one should be alone at the end." },
                ],
            },
            {
                sceneId: "lyra_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "For a moment, Lyra's eyes soften, and she looks less like a fallen angel and more like a lost woman." },
                ],
            },
        ],
    },

    {
        id: "void_reaver_lord_tease",
        title: "The Ascension Path",
        locationId: "ct_ascension_path",
        startingSceneId: "reaver_tease_scene1",
        scenes: [
            {
                sceneId: "reaver_tease_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Ascension Path narrows, and the sky darkens." },
                ],
            },
            {
                sceneId: "reaver_tease_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "At its end, the Void Reaver Lord waits, forged of shadow and spite." },
                ],
            },
            {
                sceneId: "reaver_tease_scene3",
                lines: [
                    { speakerId: "VOID_REAVER", text: "So the little light has come to be extinguished." },
                ],
            },
            {
                sceneId: "reaver_tease_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I've heard that before." },
                ],
            },
            {
                sceneId: "reaver_tease_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The battle for the Threshold begins." },
                ],
            },
        ],
    },

    {
        id: "void_reaver_lord_defeated",
        title: "The Void Reaver Lord Falls",
        locationId: "ct_ascension_path",
        startingSceneId: "reaver_defeated_scene1",
        scenes: [
            {
                sceneId: "reaver_defeated_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Void Reaver Lord shatters into smoke, and the path clears." },
                ],
            },
            {
                sceneId: "reaver_defeated_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Only the Primordial Ache remains." },
                ],
            },
            {
                sceneId: "reaver_defeated_scene3",
                lines: [
                    { speakerId: "KENJI", text: "This is it. The final battle." },
                ],
            },
            {
                sceneId: "reaver_defeated_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The way to the final confrontation is open." },
                ],
            },
            {
                sceneId: "reaver_defeated_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji steps forward, ready to face the end." },
                ],
            },
        ],
    },

    {
        id: "final_boss_confrontation",
        title: "The Primordial Ache",
        locationId: "ct_primordial_ache",
        startingSceneId: "final_scene1",
        scenes: [
            {
                sceneId: "final_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Primordial Ache unfolds from the void, a living wound in reality." },
                ],
            },
            {
                sceneId: "final_scene2",
                lines: [
                    { speakerId: "KENJI", text: "This is where it ends. For all of us." },
                ],
            },
            {
                sceneId: "final_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The Ache speaks in a voice that is both inside and outside his mind." },
                    { speakerId: "ACHE", text: "You cannot heal the wound, only delay it." },
                ],
            },
            {
                sceneId: "final_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Then I'll delay it until the end of time." },
                ],
            },
            {
                sceneId: "final_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The final battle begins." },
                ],
            },
        ],
    },
    {
        id: "act7_final_aftermath",
        title: "The Dawn After the Ache",
        locationId: "ct_primordial_ache",
        startingSceneId: "act7_aftermath_scene1",
        scenes: [
            {
                sceneId: "act7_aftermath_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Primordial Ache collapses inward, folding into a point of light before fading." },
                    { speakerId: "KENJI", text: "It's... over. Finally over." },
                ],
            },
            {
                sceneId: "act7_aftermath_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The sky above the Celestial Threshold clears, and the corruption that had spread across the world begins to recede." },
                ],
            },
            {
                sceneId: "act7_aftermath_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Astraea appears in a shimmer of light, her expression soft and proud." },
                    { speakerId: "Astraea", text: "You have done what no other Crest-bearer could. The world is free." },
                ],
            },
            {
                sceneId: "act7_aftermath_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I didn't do it alone. I had help." },
                    { speakerId: "Astraea", text: "Indeed. And that is why you succeeded." },
                ],
            },
            {
                sceneId: "act7_aftermath_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji looks out over the threshold, a new day rising over the land." },
                    { speakerId: "KENJI", text: "What now?" },
                    { speakerId: "Astraea", text: "Now, you live. That is the greatest victory." },
                ],
            },
        ],
    },
];

