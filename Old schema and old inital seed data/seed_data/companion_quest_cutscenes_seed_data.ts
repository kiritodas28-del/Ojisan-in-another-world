
import type { CutsceneDef } from "../schemas/schemas";

export const COMPANION_CUTSCENES: CutsceneDef[] = [

    // ============================================================================
    // MIRA QUEST CUTSCENES SEED DATA
    // ============================================================================
    // =========================================================================
    // STAGE 1 — A Healer's Burden
    // =========================================================================
    {
        id: "mira_chain_stage_1_accept",
        title: "A Healer's Burden — Beginning",
        locationId: "vv_herbalist_shop",
        startingSceneId: "mira_s1_accept_1",
        scenes: [
            {
                sceneId: "mira_s1_accept_1",
                lines: [
                    { speakerId: "NARRATOR", text: "The herbalist shop smells of dry leaves and old remedies. Mira Ashveil stands behind the counter, her hands wrapped around a bundle of wilted herbs." },
                    { speakerId: "MIRA", text: "Kenji... thank you for coming. I know I shouldn't ask, but the village is short on medicine." },
                    { speakerId: "KENJI", text: "Then I'll help. That's why I'm here." },
                ],
            },
            {
                sceneId: "mira_s1_accept_2",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks at him as if expecting him to refuse, then lets out a small, tired breath." },
                    { speakerId: "MIRA", text: "It's more than just gathering herbs. The fields near the forest are dangerous lately." },
                    { speakerId: "KENJI", text: "Dangerous is fine. I've handled worse." },
                ],
            },
            {
                sceneId: "mira_s1_accept_3",
                lines: [
                    { speakerId: "MIRA", text: "You don't have to do this. I can manage alone, really." },
                    { speakerId: "NARRATOR", text: "She says it with the same automatic selflessness she always uses, as if asking for help were a sin." },
                    { speakerId: "KENJI", text: "No one should have to manage alone. Let's go." },
                ],
            },
            {
                sceneId: "mira_s1_accept_4",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira hesitates, then finally nods. A faint blush of gratitude colors her tired cheeks." },
                    { speakerId: "MIRA", text: "Alright... I'll show you where to look." },
                ],
            },
            {
                sceneId: "mira_s1_accept_5",
                lines: [
                    { speakerId: "NARRATOR", text: "She picks up her herb basket and steps out from behind the counter. For the first time, the weight on her shoulders seems a little lighter." },
                    { speakerId: "KENJI", text: "Stay close to me. We'll be quick." },
                ],
            },
        ],
    },
    {
        id: "mira_chain_stage_1_complete",
        title: "A Healer's Burden — Complete",
        locationId: "vv_herbalist_shop",
        startingSceneId: "mira_s1_complete_1",
        scenes: [
            {
                sceneId: "mira_s1_complete_1",
                lines: [
                    { speakerId: "NARRATOR", text: "The herb basket is full. Mira sets it down and begins sorting the leaves with practiced hands." },
                    { speakerId: "MIRA", text: "This will help so many people. Thank you, Kenji." },
                    { speakerId: "KENJI", text: "You did as much as I did. More, probably." },
                ],
            },
            {
                sceneId: "mira_s1_complete_2",
                lines: [
                    { speakerId: "NARRATOR", text: "She shakes her head, looking down at the herbs as if embarrassed by the praise." },
                    { speakerId: "MIRA", text: "I just do what's needed. That's all." },
                    { speakerId: "KENJI", text: "Even so... you don't have to carry it alone." },
                ],
            },
            {
                sceneId: "mira_s1_complete_3",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira pauses, her fingers stilling over a bundle of moon-mint." },
                    { speakerId: "MIRA", text: "No one has said that to me in a long time." },
                    { speakerId: "KENJI", text: "Then it's about time someone did." },
                ],
            },
            {
                sceneId: "mira_s1_complete_4",
                lines: [
                    { speakerId: "NARRATOR", text: "A small, fragile smile touches her lips, but it disappears quickly behind her usual composure." },
                    { speakerId: "MIRA", text: "You should rest. You've done enough for today." },
                    { speakerId: "KENJI", text: "Only if you promise to rest too." },
                ],
            },
            {
                sceneId: "mira_s1_complete_5",
                lines: [
                    { speakerId: "NARRATOR", text: "For a moment, neither speaks. Then Mira laughs quietly — a sound she seems unused to making." },
                    { speakerId: "MIRA", text: "Maybe... I'll try." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — The Overworked Heart
    // =========================================================================
    {
        id: "mira_chain_stage_2_accept",
        title: "The Overworked Heart — Beginning",
        locationId: "vv_herbalist_shop",
        startingSceneId: "mira_s2_accept_1",
        scenes: [
            {
                sceneId: "mira_s2_accept_1",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira is already awake when Kenji arrives, though the dark circles under her eyes are deeper than before." },
                    { speakerId: "MIRA", text: "I need to visit the sick today. Will you come with me?" },
                    { speakerId: "KENJI", text: "I was going to ask if you'd slept at all." },
                ],
            },
            {
                sceneId: "mira_s2_accept_2",
                lines: [
                    { speakerId: "MIRA", text: "There wasn't time. Old Marn's fever worsened last night." },
                    { speakerId: "NARRATOR", text: "She says it without self-pity, as if her own exhaustion were simply another symptom to ignore." },
                    { speakerId: "KENJI", text: "Then I'll walk with you. But after this, you rest." },
                ],
            },
            {
                sceneId: "mira_s2_accept_3",
                lines: [
                    { speakerId: "MIRA", text: "I'll rest when everyone else is well." },
                    { speakerId: "KENJI", text: "That day will never come if you collapse first." },
                    { speakerId: "MIRA", text: "I know... but I can't stop now." },
                ],
            },
            {
                sceneId: "mira_s2_accept_4",
                lines: [
                    { speakerId: "NARRATOR", text: "She gathers her satchel, moving with determined efficiency that betrays her fatigue." },
                    { speakerId: "MIRA", text: "Let's go. They'll be waiting." },
                    { speakerId: "KENJI", text: "Lead the way, but don't push yourself too hard." },
                ],
            },
            {
                sceneId: "mira_s2_accept_5",
                lines: [
                    { speakerId: "NARRATOR", text: "As they leave the shop, Mira's steps falter once, and she steadies herself with a quiet breath." },
                    { speakerId: "MIRA", text: "I'm fine. Just a little tired." },
                    { speakerId: "KENJI", text: "You keep saying that." },
                ],
            },
        ],
    },
    {
        id: "mira_chain_stage_2_complete",
        title: "The Overworked Heart — Complete",
        locationId: "vv_vale_village",
        startingSceneId: "mira_s2_complete_1",
        scenes: [
            {
                sceneId: "mira_s2_complete_1",
                lines: [
                    { speakerId: "NARRATOR", text: "The last patient has been tended. Mira sways slightly, then forces herself upright." },
                    { speakerId: "KENJI", text: "Sit down before you fall down." },
                    { speakerId: "MIRA", text: "I'm fine. Really." },
                ],
            },
            {
                sceneId: "mira_s2_complete_2",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks toward the fading light, her shoulders tight with unspoken exhaustion." },
                    { speakerId: "MIRA", text: "Thank you for staying. I know it wasn't exciting work." },
                    { speakerId: "KENJI", text: "I didn't come for excitement. I came to help." },
                ],
            },
            {
                sceneId: "mira_s2_complete_3",
                lines: [
                    { speakerId: "MIRA", text: "You're kinder than most. Sometimes I forget what that feels like." },
                    { speakerId: "NARRATOR", text: "Her voice is soft, almost too quiet to hear." },
                    { speakerId: "KENJI", text: "Then let me remind you." },
                ],
            },
            {
                sceneId: "mira_s2_complete_4",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira looks up at him, something unreadable moving behind her tired eyes." },
                    { speakerId: "MIRA", text: "You shouldn't say things like that unless you mean them." },
                    { speakerId: "KENJI", text: "I mean them." },
                ],
            },
            {
                sceneId: "mira_s2_complete_5",
                lines: [
                    { speakerId: "NARRATOR", text: "She lowers her gaze, but not before a faint warmth softens the lines of her face." },
                    { speakerId: "MIRA", text: "Then... thank you. For staying." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — A Moment of Rest
    // =========================================================================
    {
        id: "mira_chain_stage_3_accept",
        title: "A Moment of Rest — Beginning",
        locationId: "vv_shrine_cottage",
        startingSceneId: "mira_s3_accept_1",
        scenes: [
            {
                sceneId: "mira_s3_accept_1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji finds Mira outside her shrine cottage, still working even as the sun begins to set." },
                    { speakerId: "KENJI", text: "You promised you'd rest." },
                    { speakerId: "MIRA", text: "I said I'd try. There's too much to do." },
                ],
            },
            {
                sceneId: "mira_s3_accept_2",
                lines: [
                    { speakerId: "NARRATOR", text: "The cottage is quiet, tucked away from the village, but Mira seems unable to enjoy its calm." },
                    { speakerId: "KENJI", text: "Then stop for a moment. Just one moment." },
                    { speakerId: "MIRA", text: "I don't know how." },
                ],
            },
            {
                sceneId: "mira_s3_accept_3",
                lines: [
                    { speakerId: "NARRATOR", text: "He takes the basket from her hands and sets it aside." },
                    { speakerId: "MIRA", text: "Kenji, please, I can't just..." },
                    { speakerId: "KENJI", text: "You can. You're allowed to breathe." },
                ],
            },
            {
                sceneId: "mira_s3_accept_4",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira stares at the empty space where the basket was, then slowly sinks onto the cottage step." },
                    { speakerId: "MIRA", text: "I don't even remember the last time I sat here." },
                    { speakerId: "KENJI", text: "Then it's been too long." },
                ],
            },
            {
                sceneId: "mira_s3_accept_5",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks up at him, and for a moment, the mask of tireless healer slips." },
                    { speakerId: "MIRA", text: "Stay with me? Just for a while." },
                    { speakerId: "KENJI", text: "I'm not going anywhere." },
                ],
            },
        ],
    },
    {
        id: "mira_chain_stage_3_complete",
        title: "A Moment of Rest — Complete",
        locationId: "vv_shrine_cottage",
        startingSceneId: "mira_s3_complete_1",
        scenes: [
            {
                sceneId: "mira_s3_complete_1",
                lines: [
                    { speakerId: "NARRATOR", text: "The evening settles softly around the cottage. Mira has not moved from the step." },
                    { speakerId: "KENJI", text: "You're still here. That's a start." },
                    { speakerId: "MIRA", text: "I think... I needed this more than I realized." },
                ],
            },
            {
                sceneId: "mira_s3_complete_2",
                lines: [
                    { speakerId: "NARRATOR", text: "She pulls her shawl tighter, but it isn't from cold." },
                    { speakerId: "MIRA", text: "I'm not used to people taking care of me." },
                    { speakerId: "KENJI", text: "Then let it be something new." },
                ],
            },
            {
                sceneId: "mira_s3_complete_3",
                lines: [
                    { speakerId: "MIRA", text: "Why do you do this? Why me?" },
                    { speakerId: "NARRATOR", text: "Her question is honest, as if she truly cannot understand his kindness." },
                    { speakerId: "KENJI", text: "Because someone should. You deserve it." },
                ],
            },
            {
                sceneId: "mira_s3_complete_4",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira's eyes glisten, though she blinks quickly to hide it." },
                    { speakerId: "MIRA", text: "I don't know if I believe that. But I want to." },
                    { speakerId: "KENJI", text: "Then I'll keep showing you until you do." },
                ],
            },
            {
                sceneId: "mira_s3_complete_5",
                lines: [
                    { speakerId: "NARRATOR", text: "For the first time in a long while, Mira lets out a slow, steady breath, and the tension in her shoulders eases." },
                    { speakerId: "MIRA", text: "Thank you, Kenji." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — The Hidden Scar
    // =========================================================================
    {
        id: "mira_chain_stage_4_accept",
        title: "The Hidden Scar — Beginning",
        locationId: "vv_shrine_cottage",
        startingSceneId: "mira_s4_accept_1",
        scenes: [
            {
                sceneId: "mira_s4_accept_1",
                lines: [
                    { speakerId: "NARRATOR", text: "Inside the cottage, Mira sits by the fire, staring into the flames as if they hold an old memory." },
                    { speakerId: "KENJI", text: "You're quiet tonight." },
                    { speakerId: "MIRA", text: "I'm always quiet." },
                ],
            },
            {
                sceneId: "mira_s4_accept_2",
                lines: [
                    { speakerId: "NARRATOR", text: "She glances at him, then back to the fire, her fingers tightening around a worn piece of cloth." },
                    { speakerId: "MIRA", text: "There's something I never told you... about why I became a healer." },
                    { speakerId: "KENJI", text: "I'm listening." },
                ],
            },
            {
                sceneId: "mira_s4_accept_3",
                lines: [
                    { speakerId: "MIRA", text: "Someone died. A long time ago. Because I wasn't good enough." },
                    { speakerId: "NARRATOR", text: "The firelight catches the pain in her eyes before she hides it." },
                    { speakerId: "KENJI", text: "You were young. You can't blame yourself." },
                ],
            },
            {
                sceneId: "mira_s4_accept_4",
                lines: [
                    { speakerId: "MIRA", text: "You don't know that. I should have saved them." },
                    { speakerId: "KENJI", text: "Tell me what happened. Let it out." },
                    { speakerId: "MIRA", text: "I don't know if I can." },
                ],
            },
            {
                sceneId: "mira_s4_accept_5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji sits down beside her, close enough that the firelight no longer separates them." },
                    { speakerId: "KENJI", text: "I'm not going anywhere. Take your time." },
                ],
            },
        ],
    },
    {
        id: "mira_chain_stage_4_complete",
        title: "The Hidden Scar — Complete",
        locationId: "vv_shrine_cottage",
        startingSceneId: "mira_s4_complete_1",
        scenes: [
            {
                sceneId: "mira_s4_complete_1",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira has spoken. The words linger in the small room like smoke." },
                    { speakerId: "MIRA", text: "I've never told anyone that before." },
                    { speakerId: "KENJI", text: "I'm glad you told me." },
                ],
            },
            {
                sceneId: "mira_s4_complete_2",
                lines: [
                    { speakerId: "NARRATOR", text: "Her eyes are wet, but for once she doesn't wipe them away." },
                    { speakerId: "MIRA", text: "I thought you'd think less of me." },
                    { speakerId: "KENJI", text: "I think more of you." },
                ],
            },
            {
                sceneId: "mira_s4_complete_3",
                lines: [
                    { speakerId: "MIRA", text: "Even after everything I just said?" },
                    { speakerId: "KENJI", text: "Especially after that." },
                    { speakerId: "MIRA", text: "I don't understand you." },
                ],
            },
            {
                sceneId: "mira_s4_complete_4",
                lines: [
                    { speakerId: "NARRATOR", text: "He reaches over and gently squeezes her hand. She doesn't pull away." },
                    { speakerId: "KENJI", text: "You don't have to understand. Just believe me." },
                ],
            },
            {
                sceneId: "mira_s4_complete_5",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira finally meets his eyes, and the wall she built around her guilt begins to crack." },
                    { speakerId: "MIRA", text: "I'll try." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — Temptation of the Flesh
    // =========================================================================
    {
        id: "mira_chain_stage_5_accept",
        title: "Temptation of the Flesh — Beginning",
        locationId: "vv_shrine_cottage",
        startingSceneId: "mira_s5_accept_1",
        scenes: [
            {
                sceneId: "mira_s5_accept_1",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira seems different tonight — quieter, but not from sadness. Her eyes keep drifting toward Kenji." },
                    { speakerId: "KENJI", text: "You wanted to show me something in the forest?" },
                    { speakerId: "MIRA", text: "Yes. It's a place I go to think." },
                ],
            },
            {
                sceneId: "mira_s5_accept_2",
                lines: [
                    { speakerId: "NARRATOR", text: "The path into the forest is narrow, and their shoulders brush more than once." },
                    { speakerId: "MIRA", text: "I'm sorry... I'm not usually this clumsy." },
                    { speakerId: "KENJI", text: "I don't mind." },
                ],
            },
            {
                sceneId: "mira_s5_accept_3",
                lines: [
                    { speakerId: "NARRATOR", text: "The forest opens into a small moonlit clearing, quiet except for the whisper of leaves." },
                    { speakerId: "MIRA", text: "This is my secret. I've never brought anyone here." },
                    { speakerId: "KENJI", text: "Then why me?" },
                ],
            },
            {
                sceneId: "mira_s5_accept_4",
                lines: [
                    { speakerId: "MIRA", text: "I don't know. You make me feel... safe." },
                    { speakerId: "NARRATOR", text: "Her voice wavers, and she looks away, suddenly unsure." },
                    { speakerId: "KENJI", text: "I'm glad." },
                ],
            },
            {
                sceneId: "mira_s5_accept_5",
                lines: [
                    { speakerId: "NARRATOR", text: "The moonlight makes her soft features even gentler, and Kenji feels the air shift between them." },
                    { speakerId: "MIRA", text: "Kenji... will you stay here with me for a while?" },
                ],
            },
        ],
    },
    {
        id: "mira_chain_stage_5_complete",
        title: "Temptation of the Flesh — Complete",
        locationId: "vv_forest",
        startingSceneId: "mira_s5_complete_1",
        scenes: [
            {
                sceneId: "mira_s5_complete_1",
                lines: [
                    { speakerId: "NARRATOR", text: "The clearing feels smaller now, more intimate. Mira stands closer than she ever has before." },
                    { speakerId: "MIRA", text: "My heart won't stop beating so fast." },
                    { speakerId: "KENJI", text: "Then stop running from it." },
                ],
            },
            {
                sceneId: "mira_s5_complete_2",
                lines: [
                    { speakerId: "NARRATOR", text: "He reaches up and tucks a strand of her hair behind her ear. She shivers." },
                    { speakerId: "MIRA", text: "I shouldn't... I'm not supposed to feel this." },
                    { speakerId: "KENJI", text: "Why not?" },
                ],
            },
            {
                sceneId: "mira_s5_complete_3",
                lines: [
                    { speakerId: "MIRA", text: "Because I've spent so long denying myself." },
                    { speakerId: "NARRATOR", text: "Her confession is raw, and in the quiet of the grove, it carries no shame." },
                    { speakerId: "KENJI", text: "Then maybe it's time to stop." },
                ],
            },
            {
                sceneId: "mira_s5_complete_4",
                lines: [
                    { speakerId: "NARRATOR", text: "Their faces draw closer, and the world outside the clearing disappears." },
                    { speakerId: "MIRA", text: "If I give in... will you still see me the same?" },
                    { speakerId: "KENJI", text: "Only more." },
                ],
            },
            {
                sceneId: "mira_s5_complete_5",
                lines: [
                    { speakerId: "NARRATOR", text: "What follows is soft, hesitant, and full of a need Mira has never allowed herself to show." },
                    { speakerId: "MIRA", text: "I've wanted this... for longer than I can admit." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — The Forbidden Remedy
    // =========================================================================
    {
        id: "mira_chain_stage_6_accept",
        title: "The Forbidden Remedy — Beginning",
        locationId: "vv_shrine_cottage",
        startingSceneId: "mira_s6_accept_1",
        scenes: [
            {
                sceneId: "mira_s6_accept_1",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira is waiting at the cottage when Kenji arrives, her cheeks flushed before he even speaks." },
                    { speakerId: "MIRA", text: "I haven't stopped thinking about the grove." },
                    { speakerId: "KENJI", text: "Neither have I." },
                ],
            },
            {
                sceneId: "mira_s6_accept_2",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks away, but not before he sees the desire beneath her shyness." },
                    { speakerId: "MIRA", text: "I keep telling myself it was a mistake." },
                    { speakerId: "KENJI", text: "Do you believe that?" },
                ],
            },
            {
                sceneId: "mira_s6_accept_3",
                lines: [
                    { speakerId: "MIRA", text: "No... and that's what scares me." },
                    { speakerId: "NARRATOR", text: "Kenji closes the distance and takes her hands in his." },
                    { speakerId: "KENJI", text: "Pleasure isn't a sin, Mira. It's part of being alive." },
                ],
            },
            {
                sceneId: "mira_s6_accept_4",
                lines: [
                    { speakerId: "MIRA", text: "It feels like a door I shouldn't open." },
                    { speakerId: "KENJI", text: "Then let me open it with you." },
                    { speakerId: "MIRA", text: "Kenji..." },
                ],
            },
            {
                sceneId: "mira_s6_accept_5",
                lines: [
                    { speakerId: "NARRATOR", text: "Their eyes meet, and this time Mira doesn't look away." },
                    { speakerId: "MIRA", text: "Then... teach me." },
                ],
            },
        ],
    },
    {
        id: "mira_chain_stage_6_complete",
        title: "The Forbidden Remedy — Complete",
        locationId: "vv_shrine_cottage",
        startingSceneId: "mira_s6_complete_1",
        scenes: [
            {
                sceneId: "mira_s6_complete_1",
                lines: [
                    { speakerId: "NARRATOR", text: "The cottage is warm, and the air between them is no longer uncertain." },
                    { speakerId: "MIRA", text: "I didn't know it could feel like this." },
                    { speakerId: "KENJI", text: "There's still more. But only if you want it." },
                ],
            },
            {
                sceneId: "mira_s6_complete_2",
                lines: [
                    { speakerId: "MIRA", text: "I want it. I want you." },
                    { speakerId: "NARRATOR", text: "Her words are steady now, no longer hiding behind guilt." },
                    { speakerId: "KENJI", text: "Then come here." },
                ],
            },
            {
                sceneId: "mira_s6_complete_3",
                lines: [
                    { speakerId: "NARRATOR", text: "They move together with an ease that feels both new and inevitable." },
                    { speakerId: "MIRA", text: "I'm not afraid anymore." },
                    { speakerId: "KENJI", text: "Then let go." },
                ],
            },
            {
                sceneId: "mira_s6_complete_4",
                lines: [
                    { speakerId: "NARRATOR", text: "What follows is no longer a lesson, but a mutual need, expressed with soft moans and shaking hands." },
                    { speakerId: "MIRA", text: "Kenji... I..." },
                    { speakerId: "KENJI", text: "I've got you." },
                ],
            },
            {
                sceneId: "mira_s6_complete_5",
                lines: [
                    { speakerId: "NARRATOR", text: "Afterward, Mira rests against him, her body still trembling, her heart finally quiet." },
                    { speakerId: "MIRA", text: "I think I understand now." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — Her Answer
    // =========================================================================
    {
        id: "mira_chain_stage_7_accept",
        title: "Her Answer — Beginning",
        locationId: "vv_shrine",
        startingSceneId: "mira_s7_accept_1",
        scenes: [
            {
                sceneId: "mira_s7_accept_1",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira waits at the shrine, standing before the altar as if in prayer. But when she turns, it is not the gods she looks for." },
                    { speakerId: "MIRA", text: "Kenji... I've been putting this off." },
                    { speakerId: "KENJI", text: "I know. But I'm here." },
                ],
            },
            {
                sceneId: "mira_s7_accept_2",
                lines: [
                    { speakerId: "NARRATOR", text: "The shrine is empty, bathed in the silver light of evening." },
                    { speakerId: "MIRA", text: "I've spent my whole life giving myself to others. But I want to give myself to you." },
                    { speakerId: "KENJI", text: "Then be honest with me now." },
                ],
            },
            {
                sceneId: "mira_s7_accept_3",
                lines: [
                    { speakerId: "MIRA", text: "I was so afraid that wanting something for myself would make me selfish." },
                    { speakerId: "NARRATOR", text: "She reaches for his hand, and he lets her take it." },
                    { speakerId: "KENJI", text: "Wanting isn't selfish. It's human." },
                ],
            },
            {
                sceneId: "mira_s7_accept_4",
                lines: [
                    { speakerId: "MIRA", text: "Then I want to be with you. Not because I need saving, but because I choose you." },
                    { speakerId: "KENJI", text: "That's all I ever wanted to hear." },
                ],
            },
            {
                sceneId: "mira_s7_accept_5",
                lines: [
                    { speakerId: "NARRATOR", text: "The space between them disappears, and the quiet of the shrine becomes sacred in a new way." },
                    { speakerId: "MIRA", text: "Kiss me, Kenji." },
                ],
            },
        ],
    },
    {
        id: "mira_chain_stage_7_complete",
        title: "Her Answer — Complete",
        locationId: "vv_shrine",
        startingSceneId: "mira_s7_complete_1",
        scenes: [
            {
                sceneId: "mira_s7_complete_1",
                lines: [
                    { speakerId: "NARRATOR", text: "They stand together beneath the shrine's light, Mira's hand still in his." },
                    { speakerId: "MIRA", text: "I'm yours, Kenji. Completely." },
                    { speakerId: "KENJI", text: "And I'm yours." },
                ],
            },
            {
                sceneId: "mira_s7_complete_2",
                lines: [
                    { speakerId: "NARRATOR", text: "There is no more guilt in her eyes, only a quiet, undeniable devotion." },
                    { speakerId: "MIRA", text: "I don't know what comes next. But I don't want to face it alone." },
                    { speakerId: "KENJI", text: "You won't." },
                ],
            },
            {
                sceneId: "mira_s7_complete_3",
                lines: [
                    { speakerId: "MIRA", text: "Take me home, Kenji." },
                    { speakerId: "NARRATOR", text: "Whether she means her cottage, his manor, or simply wherever he is, the meaning is clear." },
                    { speakerId: "KENJI", text: "Home is wherever you are." },
                ],
            },
            {
                sceneId: "mira_s7_complete_4",
                lines: [
                    { speakerId: "NARRATOR", text: "Mira smiles, and this time it reaches her eyes and stays there." },
                    { speakerId: "MIRA", text: "I never thought I'd be happy like this." },
                    { speakerId: "KENJI", text: "You deserve every bit of it." },
                ],
            },
            {
                sceneId: "mira_s7_complete_5",
                lines: [
                    { speakerId: "NARRATOR", text: "They leave the shrine together, and the future opens before them, uncertain but no longer lonely." },
                    { speakerId: "MIRA", text: "Let's go home." },
                ],
            },
        ],
    },

    // ============================================================================
    // ISOLDE VALEN — COMPANION QUEST CUTSCENES
    // ============================================================================
    // =========================================================================
    // STAGE 1 — ACCEPT
    // =========================================================================
    {
        id: "isolde_stage_1_accept",
        title: "The Archivist's Request",
        locationId: "ae_isolde_estate",
        startingSceneId: "isolde1_accept_scene1",
        scenes: [
            {
                sceneId: "isolde1_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Isolde stands near the tall window, her platinum hair catching the pale light. She does not turn when Kenji enters." },
                    { speakerId: "ISOLDE", text: "You came. I expected you to run after our last conversation." },
                    { speakerId: "KENJI", text: "I don't run from problems. Especially not wraiths." },
                ],
            },
            {
                sceneId: "isolde1_accept_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "The wraiths are devouring the archive. They feed on knowledge, and with each stolen memory they grow stronger." },
                    { speakerId: "KENJI", text: "Then we destroy them before they become unstoppable." },
                ],
            },
            {
                sceneId: "isolde1_accept_scene3",
                lines: [
                    { speakerId: "ISOLDE", text: "You will follow my instructions. This is not a tavern brawl." },
                    { speakerId: "KENJI", text: "I can do that, as long as your instructions don't get me killed." },
                ],
                choices: [
                    { choiceId: "isolde1_accept_respect", text: "Agree to follow her plan.", effects: { trustDelta: 2, loveDelta: 0 }, nextSceneId: "isolde1_accept_scene4" },
                    { choiceId: "isolde1_accept_push", text: "Tell her you fight better without her orders.", effects: { trustDelta: -1, loveDelta: 0 }, nextSceneId: "isolde1_accept_scene4" },
                ],
            },
            {
                sceneId: "isolde1_accept_scene4",
                lines: [
                    { speakerId: "ISOLDE", text: "Then prepare yourself. We leave at dusk." },
                    { speakerId: "NARRATOR", text: "Her tone is cold, but there is a flicker of something almost like approval." },
                ],
            },
            {
                sceneId: "isolde1_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Isolde picks up a thin silver staff. The air in the estate grows heavier." },
                    { speakerId: "KENJI", text: "I'll be ready." },
                    { speakerId: "NARRATOR", text: "For a moment, the distance between them feels smaller." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 1 — COMPLETE
    // =========================================================================
    {
        id: "isolde_stage_1_complete",
        title: "A Fragile Accord",
        locationId: "ae_isolde_estate",
        startingSceneId: "isolde1_complete_scene1",
        scenes: [
            {
                sceneId: "isolde1_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The last wraith fades into mist. Isolde lowers her staff, breathing hard." },
                    { speakerId: "ISOLDE", text: "They were stronger than I calculated. The corruption in the archive runs deeper than I thought." },
                ],
            },
            {
                sceneId: "isolde1_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Then we'll go deeper. But not tonight." },
                    { speakerId: "ISOLDE", text: "You presume to give orders in my home?" },
                ],
            },
            {
                sceneId: "isolde1_complete_scene3",
                lines: [
                    { speakerId: "ISOLDE", text: "Still, you were... not useless." },
                    { speakerId: "NARRATOR", text: "The admission seems to cost her something." },
                ],
            },
            {
                sceneId: "isolde1_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I'll take that as a compliment." },
                    { speakerId: "ISOLDE", text: "Do not overestimate yourself. This is only the beginning." },
                ],
            },
            {
                sceneId: "isolde1_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns away, but not before a faint, unreadable smile crosses her lips." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — ACCEPT
    // =========================================================================
    {
        id: "isolde_stage_2_accept",
        title: "Forced Partnership",
        locationId: "ae_forest",
        startingSceneId: "isolde2_accept_scene1",
        scenes: [
            {
                sceneId: "isolde2_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The forest outside the city is silent, but not peaceful. The trees lean inward, as if listening." },
                    { speakerId: "ISOLDE", text: "There are more wraiths than expected. They are clustering around something." },
                    { speakerId: "KENJI", text: "Maybe we should fall back and come with more people." },
                ],
            },
            {
                sceneId: "isolde2_accept_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "There is no one else I trust. You will have to suffice." },
                    { speakerId: "KENJI", text: "Thanks. That's the nicest thing you've said to me." },
                ],
            },
            {
                sceneId: "isolde2_accept_scene3",
                lines: [
                    { speakerId: "ISOLDE", text: "Don't expect more. Now focus." },
                    { speakerId: "NARRATOR", text: "A chill wind cuts through the trees, carrying the scent of decay." },
                ],
            },
            {
                sceneId: "isolde2_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I don't expect more. But I do expect to win." },
                    { speakerId: "ISOLDE", text: "Then do not slow me down." },
                ],
            },
            {
                sceneId: "isolde2_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "They move deeper into the woods, side by side but not yet together." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — COMPLETE
    // =========================================================================
    {
        id: "isolde_stage_2_complete",
        title: "Reluctant Acknowledgment",
        locationId: "ae_forest",
        startingSceneId: "isolde2_complete_scene1",
        scenes: [
            {
                sceneId: "isolde2_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The last specter collapses. Isolde steadies herself against a tree." },
                    { speakerId: "ISOLDE", text: "You fight differently than I expected. More patiently." },
                ],
            },
            {
                sceneId: "isolde2_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "You fight like you're trying to prove something." },
                    { speakerId: "ISOLDE", text: "Perhaps I am." },
                ],
            },
            {
                sceneId: "isolde2_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "For a moment, her expression softens, then freezes over again." },
                    { speakerId: "ISOLDE", text: "But that is none of your concern." },
                ],
            },
            {
                sceneId: "isolde2_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "It could be, if you let it." },
                    { speakerId: "NARRATOR", text: "She says nothing, but her eyes linger on him." },
                ],
            },
            {
                sceneId: "isolde2_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The walk back is quiet, but the silence feels less hostile." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — ACCEPT
    // =========================================================================
    {
        id: "isolde_stage_3_accept",
        title: "Reluctant Respect",
        locationId: "ae_isolde_estate",
        startingSceneId: "isolde3_accept_scene1",
        scenes: [
            {
                sceneId: "isolde3_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Isolde's study is cluttered with ancient tomes and glowing runes. She looks up as Kenji enters." },
                    { speakerId: "ISOLDE", text: "I need your help with an experiment. It requires a second pair of hands." },
                    { speakerId: "KENJI", text: "Magic experiments? I'm not a mage." },
                ],
            },
            {
                sceneId: "isolde3_accept_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "Precisely why I want you. Your reactions are untrained, and I need to observe how the uninitiated respond." },
                    { speakerId: "KENJI", text: "So I'm a test subject." },
                ],
            },
            {
                sceneId: "isolde3_accept_scene3",
                lines: [
                    { speakerId: "ISOLDE", text: "You are useful. Be flattered." },
                    { speakerId: "NARRATOR", text: "She gestures to a chair at the center of a circle of runes." },
                ],
            },
            {
                sceneId: "isolde3_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "If I die, I'm haunting this estate." },
                    { speakerId: "ISOLDE", text: "Noted." },
                ],
            },
            {
                sceneId: "isolde3_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "As the runes begin to glow, the room fills with a cold, blue light." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — COMPLETE
    // =========================================================================
    {
        id: "isolde_stage_3_complete",
        title: "The Experiment",
        locationId: "ae_isolde_estate",
        startingSceneId: "isolde3_complete_scene1",
        scenes: [
            {
                sceneId: "isolde3_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The light fades. Isolde is already writing notes, her quill moving quickly." },
                    { speakerId: "ISOLDE", text: "Interesting. Your body shows no signs of mana rejection. Rare for a human." },
                ],
            },
            {
                sceneId: "isolde3_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "So I'm not just a warm body?" },
                    { speakerId: "ISOLDE", text: "You are still a warm body. But perhaps a slightly exceptional one." },
                ],
            },
            {
                sceneId: "isolde3_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She pauses, as if considering whether to say more." },
                    { speakerId: "ISOLDE", text: "You may return for further testing. If you wish." },
                ],
            },
            {
                sceneId: "isolde3_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I'll think about it." },
                    { speakerId: "NARRATOR", text: "For the first time, Isolde seems slightly uncertain." },
                ],
            },
            {
                sceneId: "isolde3_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji leaves the estate, the scent of old parchment lingering on his clothes." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — ACCEPT
    // =========================================================================
    {
        id: "isolde_stage_4_accept",
        title: "The Shattered Pride",
        locationId: "ae_market_square",
        startingSceneId: "isolde4_accept_scene1",
        scenes: [
            {
                sceneId: "isolde4_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The market square is crowded, but the crowd parts as Isolde steps forward, her gaze fixed on Kenji." },
                    { speakerId: "ISOLDE", text: "You wanted a challenge. I am here to provide it." },
                    { speakerId: "KENJI", text: "You want to duel me here? In public?" },
                ],
            },
            {
                sceneId: "isolde4_accept_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "What better place to prove who is superior?" },
                    { speakerId: "KENJI", text: "This isn't about superiority. It's about something else." },
                ],
            },
            {
                sceneId: "isolde4_accept_scene3",
                lines: [
                    { speakerId: "ISOLDE", text: "Then show me." },
                    { speakerId: "NARRATOR", text: "She draws a slender blade, its edge gleaming with frost." },
                ],
            },
            {
                sceneId: "isolde4_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "If I win, you answer a question." },
                    { speakerId: "ISOLDE", text: "And if I win, you leave the city." },
                ],
            },
            {
                sceneId: "isolde4_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The crowd holds its breath as the duel begins." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — COMPLETE
    // =========================================================================
    {
        id: "isolde_stage_4_complete",
        title: "A Question Answered",
        locationId: "ae_market_square",
        startingSceneId: "isolde4_complete_scene1",
        scenes: [
            {
                sceneId: "isolde4_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Isolde kneels, her blade resting on the ground. The crowd is silent." },
                    { speakerId: "ISOLDE", text: "Ask your question." },
                    { speakerId: "KENJI", text: "Why do you keep everyone at a distance?" },
                ],
            },
            {
                sceneId: "isolde4_complete_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "Because everyone I have ever allowed close is gone." },
                    { speakerId: "NARRATOR", text: "The admission is quiet, almost lost in the wind." },
                ],
            },
            {
                sceneId: "isolde4_complete_scene3",
                lines: [
                    { speakerId: "KENJI", text: "I'm still here." },
                    { speakerId: "ISOLDE", text: "For now." },
                ],
            },
            {
                sceneId: "isolde4_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She rises and walks away, but her shoulders are no longer so rigid." },
                ],
            },
            {
                sceneId: "isolde4_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The crowd slowly disperses, leaving Kenji standing alone with more questions than before." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — ACCEPT
    // =========================================================================
    {
        id: "isolde_stage_5_accept",
        title: "Loneliness Unveiled",
        locationId: "ae_shrine",
        startingSceneId: "isolde5_accept_scene1",
        scenes: [
            {
                sceneId: "isolde5_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The shrine is quiet, lit only by moonlight. Isolde stands before the altar, her back to Kenji." },
                    { speakerId: "ISOLDE", text: "You found me. I should be annoyed." },
                    { speakerId: "KENJI", text: "But you're not." },
                ],
            },
            {
                sceneId: "isolde5_accept_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "No. I am... tired." },
                    { speakerId: "NARRATOR", text: "She does not elaborate, but the silence speaks volumes." },
                ],
            },
            {
                sceneId: "isolde5_accept_scene3",
                lines: [
                    { speakerId: "KENJI", text: "Tell me about the person you lost." },
                    { speakerId: "ISOLDE", text: "Why do you insist on digging into wounds that are centuries old?" },
                ],
            },
            {
                sceneId: "isolde5_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Because they still bleed." },
                    { speakerId: "NARRATOR", text: "Isolde's hand tightens on the edge of the altar." },
                ],
            },
            {
                sceneId: "isolde5_accept_scene5",
                lines: [
                    { speakerId: "ISOLDE", text: "Very well. But not here. Walk with me." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — COMPLETE
    // =========================================================================
    {
        id: "isolde_stage_5_complete",
        title: "A Shared Silence",
        locationId: "ae_shrine",
        startingSceneId: "isolde5_complete_scene1",
        scenes: [
            {
                sceneId: "isolde5_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "They walk in silence, the city lights fading behind them." },
                    { speakerId: "ISOLDE", text: "His name was Aldric. He was a knight, sworn to protect the archive." },
                ],
            },
            {
                sceneId: "isolde5_complete_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "He died defending it from the first incursion. I could not save him." },
                    { speakerId: "KENJI", text: "You blame yourself." },
                ],
            },
            {
                sceneId: "isolde5_complete_scene3",
                lines: [
                    { speakerId: "ISOLDE", text: "I blamed him for dying. Then I blamed myself for caring." },
                    { speakerId: "NARRATOR", text: "Her voice cracks, just slightly." },
                ],
            },
            {
                sceneId: "isolde5_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Caring isn't weakness." },
                    { speakerId: "ISOLDE", text: "It is when you live as long as I have." },
                ],
            },
            {
                sceneId: "isolde5_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She stops and looks at Kenji, as if seeing him for the first time." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — ACCEPT
    // =========================================================================
    {
        id: "isolde_stage_6_accept",
        title: "The First Crack",
        locationId: "ae_isolde_estate",
        startingSceneId: "isolde6_accept_scene1",
        scenes: [
            {
                sceneId: "isolde6_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Isolde's study is dark, the fire low. She sits in a chair, staring at nothing." },
                    { speakerId: "ISOLDE", text: "I did not expect you to return." },
                    { speakerId: "KENJI", text: "You asked me to." },
                ],
            },
            {
                sceneId: "isolde6_accept_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "I did. I keep doing things I said I would never do." },
                    { speakerId: "NARRATOR", text: "She looks up, and the mask is gone." },
                ],
            },
            {
                sceneId: "isolde6_accept_scene3",
                lines: [
                    { speakerId: "KENJI", text: "Maybe that's a good thing." },
                    { speakerId: "ISOLDE", text: "Or maybe it is the beginning of another loss." },
                ],
            },
            {
                sceneId: "isolde6_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I'm not going anywhere." },
                    { speakerId: "NARRATOR", text: "She searches his face for a lie, but finds none." },
                ],
            },
            {
                sceneId: "isolde6_accept_scene5",
                lines: [
                    { speakerId: "ISOLDE", text: "Then stay. If only for tonight." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — COMPLETE
    // =========================================================================
    {
        id: "isolde_stage_6_complete",
        title: "The Crack Widens",
        locationId: "ae_isolde_estate",
        startingSceneId: "isolde6_complete_scene1",
        scenes: [
            {
                sceneId: "isolde6_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The night passes in quiet conversation. For the first time, Isolde speaks freely." },
                    { speakerId: "ISOLDE", text: "I have not slept so peacefully in centuries." },
                ],
            },
            {
                sceneId: "isolde6_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Maybe you needed someone to keep the nightmares away." },
                    { speakerId: "ISOLDE", text: "You are dangerously close to sounding sentimental." },
                ],
            },
            {
                sceneId: "isolde6_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She smiles, and it is like watching ice begin to thaw." },
                    { speakerId: "ISOLDE", text: "What happens now?" },
                ],
            },
            {
                sceneId: "isolde6_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "We keep walking this path together." },
                    { speakerId: "ISOLDE", text: "I would like that." },
                ],
            },
            {
                sceneId: "isolde6_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "They stand at the window, watching the dawn break over Aethermoor." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — ACCEPT
    // =========================================================================
    {
        id: "isolde_stage_7_accept",
        title: "Frost Melted",
        locationId: "ae_isolde_estate",
        startingSceneId: "isolde7_accept_scene1",
        scenes: [
            {
                sceneId: "isolde7_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Isolde waits in the garden, the morning dew clinging to the roses. She turns as Kenji approaches." },
                    { speakerId: "ISOLDE", text: "You have stayed longer than anyone else ever has." },
                    { speakerId: "KENJI", text: "I told you I wasn't going anywhere." },
                ],
            },
            {
                sceneId: "isolde7_accept_scene2",
                lines: [
                    { speakerId: "ISOLDE", text: "And I believe you." },
                    { speakerId: "NARRATOR", text: "Her voice is steady, but her eyes glisten." },
                ],
            },
            {
                sceneId: "isolde7_accept_scene3",
                lines: [
                    { speakerId: "ISOLDE", text: "I have kept people away for so long that I forgot what it felt like to let someone in." },
                    { speakerId: "KENJI", text: "What does it feel like?" },
                ],
            },
            {
                sceneId: "isolde7_accept_scene4",
                lines: [
                    { speakerId: "ISOLDE", text: "Terrifying. But also... warm." },
                    { speakerId: "NARRATOR", text: "She steps closer, the distance between them gone." },
                ],
            },
            {
                sceneId: "isolde7_accept_scene5",
                lines: [
                    { speakerId: "ISOLDE", text: "I am yours, if you will have me." },
                    { speakerId: "KENJI", text: "I will." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — COMPLETE
    // =========================================================================
    {
        id: "isolde_stage_7_complete",
        title: "Forever Thawed",
        locationId: "ae_isolde_estate",
        startingSceneId: "isolde7_complete_scene1",
        scenes: [
            {
                sceneId: "isolde7_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The frost that once surrounded Isolde's heart is gone. In its place is a quiet, steady warmth." },
                    { speakerId: "ISOLDE", text: "I never thought I would love again. I was afraid." },
                ],
            },
            {
                sceneId: "isolde7_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "And now?" },
                    { speakerId: "ISOLDE", text: "Now I am only afraid of losing you." },
                ],
            },
            {
                sceneId: "isolde7_complete_scene3",
                lines: [
                    { speakerId: "KENJI", text: "Then I'll have to make sure that never happens." },
                    { speakerId: "NARRATOR", text: "She laughs softly, a sound like silver bells." },
                ],
            },
            {
                sceneId: "isolde7_complete_scene4",
                lines: [
                    { speakerId: "ISOLDE", text: "You are unbearably optimistic." },
                    { speakerId: "KENJI", text: "One of us has to be." },
                ],
            },
            {
                sceneId: "isolde7_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "They stand together in the garden, the world finally at peace around them." },
                ],
            },
        ],
    },

    // ============================================================================
    // GRAEL IRONHIDE — COMPANION QUEST CUTSCENES
    // ============================================================================

    // --------------------------------------------------------------------------
    // STAGE 1 — The Blacksmith's Oath
    // --------------------------------------------------------------------------
    {
        id: "grael_chain_stage_1_accept",
        title: "The Blacksmith's Oath",
        locationId: "cm_grael_smithy",
        startingSceneId: "grael_s1_accept_scene1",
        scenes: [
            {
                sceneId: "grael_s1_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael Ironhide stands over her anvil, the heat from the forge making the air shimmer around her." },
                    { speakerId: "GRAEL", text: "You came. Good. I need someone to help me with a delivery of ore. Are you up for it?" },
                    { speakerId: "KENJI", text: "Point me to the mine. I'll haul the ore myself if I have to." },
                ],
                choices: [
                    { choiceId: "grael_s1_accept_eager", text: "Roll up your sleeves and offer to start now.", effects: { trustDelta: 2, loveDelta: 0 }, nextSceneId: "grael_s1_accept_scene2" },
                    { choiceId: "grael_s1_accept_calm", text: "Ask what she needs first before committing.", effects: { trustDelta: 1, loveDelta: 0 }, nextSceneId: "grael_s1_accept_scene2" },
                ],
            },
            {
                sceneId: "grael_s1_accept_scene2",
                lines: [
                    { speakerId: "GRAEL", text: "The old mine collapsed a week ago. I need someone to help clear the rocks and bring back the ore that's left." },
                    { speakerId: "KENJI", text: "A mine collapse? That sounds dangerous." },
                    { speakerId: "GRAEL", text: "Dangerous is what we do here. But I'll be with you." },
                ],
            },
            {
                sceneId: "grael_s1_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She picks up a pickaxe and tosses it to Kenji. The weight is solid, familiar." },
                    { speakerId: "GRAEL", text: "If you break that, I'll break you. Let's go." },
                ],
            },
            {
                sceneId: "grael_s1_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The quest begins." },
                ],
            },
            {
                sceneId: "grael_s1_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael starts walking toward the mine, and Kenji follows, the heat of the forge still on his back." },
                ],
            },
        ],
    },
    {
        id: "grael_chain_stage_1_complete",
        title: "The Blacksmith's Oath — Complete",
        locationId: "cm_grael_smithy",
        startingSceneId: "grael_s1_complete_scene1",
        scenes: [
            {
                sceneId: "grael_s1_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The last of the ore is stacked near the smithy. Grael wipes sweat from her brow." },
                    { speakerId: "GRAEL", text: "Not bad, outsider. You didn't faint or run away." },
                ],
            },
            {
                sceneId: "grael_s1_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I told you I was here for the fight." },
                    { speakerId: "GRAEL", text: "Hah! And you delivered. Sit down. I'll pour you a drink." },
                ],
            },
            {
                sceneId: "grael_s1_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She hands him a rough clay cup filled with strong drink. They drink in silence for a while." },
                    { speakerId: "GRAEL", text: "Tomorrow, there's something else I need from you." },
                ],
            },
            {
                sceneId: "grael_s1_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She sets her cup down, the forge light casting shadows on her face." },
                ],
            },
            {
                sceneId: "grael_s1_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Stage 1 of Grael's quest is complete." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 2 — Bandit Retribution
    // --------------------------------------------------------------------------
    {
        id: "grael_chain_stage_2_accept",
        title: "Bandit Retribution",
        locationId: "cm_crimson_camp",
        startingSceneId: "grael_s2_accept_scene1",
        scenes: [
            {
                sceneId: "grael_s2_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael stands at the edge of the Crimson Camp, looking out toward the forest road." },
                    { speakerId: "GRAEL", text: "Bandits have been raiding the supply caravans. They took two of my people yesterday." },
                    { speakerId: "KENJI", text: "What's the plan?" },
                ],
            },
            {
                sceneId: "grael_s2_accept_scene2",
                lines: [
                    { speakerId: "GRAEL", text: "We hit them before they can hit us. You in?" },
                    { speakerId: "KENJI", text: "I'm already standing here." },
                ],
            },
            {
                sceneId: "grael_s2_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She grins, all teeth and battle-lust, and slaps his shoulder hard enough to stagger him." },
                    { speakerId: "GRAEL", text: "Good. Try not to die." },
                ],
            },
            {
                sceneId: "grael_s2_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The hunt begins." },
                ],
            },
            {
                sceneId: "grael_s2_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "They move out together, following the bandit trail into the wild." },
                ],
            },
        ],
    },
    {
        id: "grael_chain_stage_2_complete",
        title: "Bandit Retribution — Complete",
        locationId: "cm_crimson_camp",
        startingSceneId: "grael_s2_complete_scene1",
        scenes: [
            {
                sceneId: "grael_s2_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The bandits are scattered or defeated. Grael stands over the last of them, breathing hard." },
                    { speakerId: "GRAEL", text: "That's done. My people are safe for now." },
                ],
            },
            {
                sceneId: "grael_s2_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "You fight well." },
                    { speakerId: "GRAEL", text: "And you're not bad yourself. I've seen worse." },
                ],
            },
            {
                sceneId: "grael_s2_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks at him, and there is something new in her eyes: a faint respect." },
                ],
            },
            {
                sceneId: "grael_s2_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The warriors begin to head back to camp." },
                ],
            },
            {
                sceneId: "grael_s2_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Stage 2 of Grael's quest is complete." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 3 — Warrior's Respect
    // --------------------------------------------------------------------------
    {
        id: "grael_chain_stage_3_accept",
        title: "Warrior's Respect",
        locationId: "cm_grael_smithy",
        startingSceneId: "grael_s3_accept_scene1",
        scenes: [
            {
                sceneId: "grael_s3_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael is already waiting in the smithy when Kenji arrives, a wooden training sword in her hand." },
                    { speakerId: "GRAEL", text: "You've got the strength, but I need to see if you have the skill. Spar with me." },
                    { speakerId: "KENJI", text: "Rules?" },
                ],
            },
            {
                sceneId: "grael_s3_accept_scene2",
                lines: [
                    { speakerId: "GRAEL", text: "No killing. Everything else goes." },
                ],
            },
            {
                sceneId: "grael_s3_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She tosses him a training sword. The weight is different from his own blade, but familiar enough." },
                ],
            },
            {
                sceneId: "grael_s3_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The sparring match begins." },
                ],
            },
            {
                sceneId: "grael_s3_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael circles him, eyes sharp, ready to test more than just his sword arm." },
                ],
            },
        ],
    },
    {
        id: "grael_chain_stage_3_complete",
        title: "Warrior's Respect — Complete",
        locationId: "cm_grael_smithy",
        startingSceneId: "grael_s3_complete_scene1",
        scenes: [
            {
                sceneId: "grael_s3_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The sparring ends with both of them breathing hard. Grael lowers her sword." },
                    { speakerId: "GRAEL", text: "You'll do. Better than most." },
                ],
            },
            {
                sceneId: "grael_s3_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "So I've earned your respect?" },
                    { speakerId: "GRAEL", text: "Not yet. But you're getting there." },
                ],
            },
            {
                sceneId: "grael_s3_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns to put the training swords away, but there is a slight smile on her face." },
                ],
            },
            {
                sceneId: "grael_s3_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The unspoken bond between them has deepened." },
                ],
            },
            {
                sceneId: "grael_s3_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Stage 3 of Grael's quest is complete." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 4 — A Night at the Tavern
    // --------------------------------------------------------------------------
    {
        id: "grael_chain_stage_4_accept",
        title: "A Night at the Tavern",
        locationId: "cm_tavern",
        startingSceneId: "grael_s4_accept_scene1",
        scenes: [
            {
                sceneId: "grael_s4_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Crimson Tavern is loud and crowded. Grael sits at a corner table, a mug in front of her." },
                    { speakerId: "GRAEL", text: "Sit down. I need someone to drink with." },
                ],
            },
            {
                sceneId: "grael_s4_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Trouble?" },
                    { speakerId: "GRAEL", text: "No. Just tired. A night without fighting is rare." },
                ],
            },
            {
                sceneId: "grael_s4_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She pushes a mug toward him. The room is warm, and for a moment, the rest of the world fades." },
                ],
            },
            {
                sceneId: "grael_s4_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "They drink and talk about nothing important, the tension easing from Grael's shoulders." },
                ],
            },
            {
                sceneId: "grael_s4_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The evening stretches on, comfortable and quiet." },
                ],
            },
        ],
    },
    {
        id: "grael_chain_stage_4_complete",
        title: "A Night at the Tavern — Complete",
        locationId: "cm_tavern",
        startingSceneId: "grael_s4_complete_scene1",
        scenes: [
            {
                sceneId: "grael_s4_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The tavern is emptier now. Grael stares into her mug, her usual bluntness softened." },
                    { speakerId: "GRAEL", text: "I don't do this often. Sit still, I mean." },
                ],
            },
            {
                sceneId: "grael_s4_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "You deserve a break." },
                    { speakerId: "GRAEL", text: "Maybe. Or maybe I just don't know how." },
                ],
            },
            {
                sceneId: "grael_s4_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks at him, and her expression is unguarded for a brief moment." },
                ],
            },
            {
                sceneId: "grael_s4_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Then the moment passes, and she stands." },
                ],
            },
            {
                sceneId: "grael_s4_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Stage 4 of Grael's quest is complete." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 5 — Marauder Threat
    // --------------------------------------------------------------------------
    {
        id: "grael_chain_stage_5_accept",
        title: "Marauder Threat",
        locationId: "cm_forest",
        startingSceneId: "grael_s5_accept_scene1",
        scenes: [
            {
                sceneId: "grael_s5_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Deep in the forest, the signs of marauder camps are everywhere: broken branches, cold firepits." },
                    { speakerId: "GRAEL", text: "They're close. I can smell their fires." },
                    { speakerId: "KENJI", text: "Then let's move quietly." },
                ],
            },
            {
                sceneId: "grael_s5_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "She nods, and they begin to stalk through the undergrowth." },
                ],
            },
            {
                sceneId: "grael_s5_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Voices drift through the trees. The marauders are close." },
                ],
            },
            {
                sceneId: "grael_s5_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The fight is about to begin." },
                ],
            },
            {
                sceneId: "grael_s5_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael grips her axe, her entire body tense and ready." },
                ],
            },
        ],
    },
    {
        id: "grael_chain_stage_5_complete",
        title: "Marauder Threat — Complete",
        locationId: "cm_forest",
        startingSceneId: "grael_s5_complete_scene1",
        scenes: [
            {
                sceneId: "grael_s5_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The marauders lie defeated. Grael wipes her axe clean on the grass." },
                    { speakerId: "GRAEL", text: "That's one less threat to my people." },
                ],
            },
            {
                sceneId: "grael_s5_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Is it always like this?" },
                    { speakerId: "GRAEL", text: "War never changes. You just get better at surviving it." },
                ],
            },
            {
                sceneId: "grael_s5_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "They stand together in the quiet aftermath, the forest slowly returning to silence." },
                ],
            },
            {
                sceneId: "grael_s5_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael looks at Kenji as if weighing something unspoken." },
                ],
            },
            {
                sceneId: "grael_s5_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Stage 5 of Grael's quest is complete." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 6 — The Defeat
    // --------------------------------------------------------------------------
    {
        id: "grael_chain_stage_6_accept",
        title: "The Defeat",
        locationId: "cm_grael_smithy",
        startingSceneId: "grael_s6_accept_scene1",
        scenes: [
            {
                sceneId: "grael_s6_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael locks eyes with Kenji, and the air between them grows heavy." },
                    { speakerId: "GRAEL", text: "One more fight. But this time, no holding back." },
                    { speakerId: "KENJI", text: "Are you sure?" },
                    { speakerId: "GRAEL", text: "I've never been more sure." },
                ],
            },
            {
                sceneId: "grael_s6_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "She raises her axe, not as a teacher, but as a challenger." },
                ],
            },
            {
                sceneId: "grael_s6_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The duel begins." },
                ],
            },
            {
                sceneId: "grael_s6_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Sparks fly as their weapons clash, and the smithy becomes a battlefield." },
                ],
            },
            {
                sceneId: "grael_s6_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "For the first time, Grael fights with everything she has—and so does he." },
                ],
            },
        ],
    },
    {
        id: "grael_chain_stage_6_complete",
        title: "The Defeat — Complete",
        locationId: "cm_grael_smithy",
        startingSceneId: "grael_s6_complete_scene1",
        scenes: [
            {
                sceneId: "grael_s6_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji drives Grael back, and with a final move, disarms her. The axe clatters to the floor." },
                    { speakerId: "GRAEL", text: "You... beat me." },
                ],
            },
            {
                sceneId: "grael_s6_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I did." },
                    { speakerId: "GRAEL", text: "Hah... hahaha." },
                ],
            },
            {
                sceneId: "grael_s6_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She laughs, not bitter but relieved. There is a strange light in her eyes." },
                ],
            },
            {
                sceneId: "grael_s6_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The tension between them has shifted, and neither of them moves to break the moment." },
                ],
            },
            {
                sceneId: "grael_s6_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Stage 6 of Grael's quest is complete." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 7 — Yielding
    // --------------------------------------------------------------------------
    {
        id: "grael_chain_stage_7_accept",
        title: "Yielding",
        locationId: "cm_grael_smithy",
        startingSceneId: "grael_s7_accept_scene1",
        scenes: [
            {
                sceneId: "grael_s7_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael stands alone in the smithy, the fire low. She does not turn as Kenji enters." },
                    { speakerId: "GRAEL", text: "I thought you might not come." },
                    { speakerId: "KENJI", text: "I wouldn't miss this." },
                ],
            },
            {
                sceneId: "grael_s7_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "She finally faces him, and her expression is different: open, waiting." },
                ],
            },
            {
                sceneId: "grael_s7_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The quiet of the forge surrounds them." },
                ],
            },
            {
                sceneId: "grael_s7_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Whatever happens next, this is the end of the path they've walked." },
                ],
            },
            {
                sceneId: "grael_s7_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael speaks softly, for the first time." },
                ],
            },
        ],
    },
    {
        id: "grael_chain_stage_7_complete",
        title: "Yielding — Complete",
        locationId: "cm_grael_smithy",
        startingSceneId: "grael_s7_complete_scene1",
        scenes: [
            {
                sceneId: "grael_s7_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael lowers herself to one knee, not in defeat but in choice." },
                    { speakerId: "GRAEL", text: "I'm yours. Not as a chief, not as a warrior. As a woman." },
                ],
            },
            {
                sceneId: "grael_s7_complete_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The weight of her words settles over them both." },
                ],
            },
            {
                sceneId: "grael_s7_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji reaches out and lifts her chin, meeting her eyes." },
                ],
            },
            {
                sceneId: "grael_s7_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "What follows is not a battle, but an acceptance." },
                ],
            },
            {
                sceneId: "grael_s7_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Grael's quest line is complete." },
                ],
            },
        ],
    },

    // ============================================================================
    // VALKA EMBER — COMPANION QUEST CUTSCENES
    // ============================================================================
    // =========================================================================
    // STAGE 1 — ACCEPT
    // =========================================================================
    {
        id: "valka_chain_stage_1_accept",
        title: "Wyrmling Threat",
        locationId: "cm_valka_den",
        startingSceneId: "valka1_accept_scene1",
        scenes: [
            {
                sceneId: "valka1_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The air in Valka's den is warm and heavy with the scent of ash and iron. She watches Kenji from her throne-like seat, tail swaying slowly." },
                    { speakerId: "VALKA", text: "So you've come. I smelled you before I heard you. Why should I waste my time?" },
                    { speakerId: "KENJI", text: "Because the wyrmlings are killing travelers, and you know it." },
                ],
            },
            {
                sceneId: "valka1_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka's eyes narrow, and she leans forward, muscles tense under scaled skin." },
                    { speakerId: "VALKA", text: "I know. I also know most men who come here want only to beg or run. Which are you?" },
                ],
                choices: [
                    { choiceId: "valka1_bold", text: "Neither. I came to hunt.", effects: { trustDelta: 3, loveDelta: 1 }, nextSceneId: "valka1_accept_scene3" },
                    { choiceId: "valka1_proud", text: "I came to prove I'm stronger than any wyrmling.", effects: { trustDelta: 2, loveDelta: 0 }, nextSceneId: "valka1_accept_scene3" },
                    { choiceId: "valka1_question", text: "Ask if she's afraid to hunt alone.", effects: { trustDelta: 1, loveDelta: 2 }, nextSceneId: "valka1_accept_scene3" },
                ],
            },
            {
                sceneId: "valka1_accept_scene3",
                lines: [
                    { speakerId: "VALKA", text: "Hah! Bold words. Let's see if your body can match them.", expression: "grinning" },
                    { speakerId: "NARRATOR", text: "She rises, tail lashing once, and gestures toward the den's entrance." },
                ],
            },
            {
                sceneId: "valka1_accept_scene4",
                lines: [
                    { speakerId: "VALKA", text: "We hunt at first light. Try not to die before we start." },
                    { speakerId: "KENJI", text: "I'll keep up." },
                ],
            },
            {
                sceneId: "valka1_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka's eyes gleam with feral anticipation. The hunt is on." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 1 — COMPLETE
    // =========================================================================
    {
        id: "valka_chain_stage_1_complete",
        title: "After the Hunt",
        locationId: "cm_wyrm_peak",
        startingSceneId: "valka1_complete_scene1",
        scenes: [
            {
                sceneId: "valka1_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The last wyrmling falls, and the peak grows quiet. Valka stands over the kill, breathing hard, blood on her claws." },
                    { speakerId: "VALKA", text: "Not bad, human. You didn't run." },
                ],
            },
            {
                sceneId: "valka1_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I told you I'd keep up." },
                    { speakerId: "VALKA", text: "So you did. Maybe you're not useless after all.", expression: "small, grudging smile" },
                ],
            },
            {
                sceneId: "valka1_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She wipes the blood from her face, her amber eyes lingering on Kenji with new interest." },
                ],
            },
            {
                sceneId: "valka1_complete_scene4",
                lines: [
                    { speakerId: "VALKA", text: "If you survive, come to my den again. We'll see how long you last." },
                ],
            },
            {
                sceneId: "valka1_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The hunt is over, but something else has begun." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — ACCEPT
    // =========================================================================
    {
        id: "valka_chain_stage_2_accept",
        title: "The Greater Hunt",
        locationId: "cm_valka_den",
        startingSceneId: "valka2_accept_scene1",
        scenes: [
            {
                sceneId: "valka2_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji returns to the den, and Valka is waiting, arms crossed." },
                    { speakerId: "VALKA", text: "The wyrmlings were only the beginning. Bigger prey is stirring." },
                ],
            },
            {
                sceneId: "valka2_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Then let's not waste time." },
                    { speakerId: "VALKA", text: "Eager. I like that. This time, we go to the pass where they've been feeding." },
                ],
            },
            {
                sceneId: "valka2_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She hands him a rough map, the parchment torn at the edges." },
                ],
            },
            {
                sceneId: "valka2_accept_scene4",
                lines: [
                    { speakerId: "VALKA", text: "Stay close. And don't fall behind." },
                ],
            },
            {
                sceneId: "valka2_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The hunt grows more dangerous." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — COMPLETE
    // =========================================================================
    {
        id: "valka_chain_stage_2_complete",
        title: "Respect Earned",
        locationId: "cm_wyrm_peak",
        startingSceneId: "valka2_complete_scene1",
        scenes: [
            {
                sceneId: "valka2_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The larger wyrmlings are dead. Valka stands beside Kenji, breathing steady." },
                    { speakerId: "VALKA", text: "You fight well. Not like the soft ones from the city." },
                ],
            },
            {
                sceneId: "valka2_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I've had practice." },
                    { speakerId: "VALKA", text: "Practice is one thing. Instinct is another. You have both." },
                ],
            },
            {
                sceneId: "valka2_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She steps closer, her tail brushing against his leg." },
                ],
            },
            {
                sceneId: "valka2_complete_scene4",
                lines: [
                    { speakerId: "VALKA", text: "Maybe... you are worth keeping around." },
                ],
            },
            {
                sceneId: "valka2_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Respect begins to take root." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — ACCEPT
    // =========================================================================
    {
        id: "valka_chain_stage_3_accept",
        title: "Pride Battle",
        locationId: "cm_valka_den",
        startingSceneId: "valka3_accept_scene1",
        scenes: [
            {
                sceneId: "valka3_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka stands in the center of the den, arms spread, scales gleaming." },
                    { speakerId: "VALKA", text: "You've proven your strength. Now prove your pride." },
                ],
            },
            {
                sceneId: "valka3_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "What does pride have to do with hunting?" },
                    { speakerId: "VALKA", text: "Everything. Among my kind, pride is the first weapon." },
                ],
            },
            {
                sceneId: "valka3_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She circles him slowly, predator sizing up prey." },
                ],
            },
            {
                sceneId: "valka3_accept_scene4",
                lines: [
                    { speakerId: "VALKA", text: "Fight me. Not to kill, but to prove who stands above whom." },
                ],
                choices: [
                    { choiceId: "valka3_accept", text: "Accept the challenge.", effects: { trustDelta: 2, loveDelta: 0 }, nextSceneId: "valka3_accept_scene5" },
                    { choiceId: "valka3_decline", text: "Refuse to fight.", effects: { trustDelta: -3, loveDelta: -1 }, nextSceneId: "valka3_accept_scene5" },
                ],
            },
            {
                sceneId: "valka3_accept_scene5",
                lines: [
                    { speakerId: "VALKA", text: "We begin now." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — COMPLETE
    // =========================================================================
    {
        id: "valka_chain_stage_3_complete",
        title: "The Battle Won",
        locationId: "cm_valka_den",
        startingSceneId: "valka3_complete_scene1",
        scenes: [
            {
                sceneId: "valka3_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The fight ends. Valka is on one knee, breathing hard, a grudging smile on her face." },
                    { speakerId: "VALKA", text: "You... beat me." },
                ],
            },
            {
                sceneId: "valka3_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "You'll win next time." },
                    { speakerId: "VALKA", text: "Next time? Oh, there will be a next time." },
                ],
            },
            {
                sceneId: "valka3_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She rises slowly, eyes burning with new respect and challenge." },
                ],
            },
            {
                sceneId: "valka3_complete_scene4",
                lines: [
                    { speakerId: "VALKA", text: "I have not been beaten in years. You are... different." },
                ],
            },
            {
                sceneId: "valka3_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Pride warms into something more." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — ACCEPT
    // =========================================================================
    {
        id: "valka_chain_stage_4_accept",
        title: "Potential Mate",
        locationId: "cm_valka_den",
        startingSceneId: "valka4_accept_scene1",
        scenes: [
            {
                sceneId: "valka4_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka sits near the fire, her tail coiled around her feet. For once, she looks almost calm." },
                    { speakerId: "VALKA", text: "Among my kind, a mate must be strong enough to survive us. You have survived so far." },
                ],
            },
            {
                sceneId: "valka4_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I didn't come to be tested as a mate." },
                    { speakerId: "VALKA", text: "No, but the clan will test you anyway. I need to know if you would stand or fall." },
                ],
            },
            {
                sceneId: "valka4_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She stands, firelight dancing across her scales." },
                ],
            },
            {
                sceneId: "valka4_accept_scene4",
                lines: [
                    { speakerId: "VALKA", text: "There is a rite. Old, and perhaps foolish, but it will show what you are." },
                ],
            },
            {
                sceneId: "valka4_accept_scene5",
                lines: [
                    { speakerId: "VALKA", text: "Are you willing?" },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — COMPLETE
    // =========================================================================
    {
        id: "valka_chain_stage_4_complete",
        title: "Worthy",
        locationId: "cm_shrine",
        startingSceneId: "valka4_complete_scene1",
        scenes: [
            {
                sceneId: "valka4_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The rite is complete. Valka watches Kenji with a new, deeper gaze." },
                    { speakerId: "VALKA", text: "You are stronger than I thought. And more stubborn." },
                ],
            },
            {
                sceneId: "valka4_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Is that a compliment?" },
                    { speakerId: "VALKA", text: "It is an invitation." },
                ],
            },
            {
                sceneId: "valka4_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Her tail brushes against his arm, lingering for just a moment." },
                ],
            },
            {
                sceneId: "valka4_complete_scene4",
                lines: [
                    { speakerId: "VALKA", text: "The clan will see you now. Do not shame me." },
                ],
            },
            {
                sceneId: "valka4_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns away, but there is warmth in her voice." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — ACCEPT
    // =========================================================================
    {
        id: "valka_chain_stage_5_accept",
        title: "Clan Duty",
        locationId: "cm_shrine",
        startingSceneId: "valka5_accept_scene1",
        scenes: [
            {
                sceneId: "valka5_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka leads Kenji to the clan gathering, where old traditions hold sway." },
                    { speakerId: "VALKA", text: "They will judge you by what you do, not by what I say." },
                ],
            },
            {
                sceneId: "valka5_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "And what do they want from me?" },
                    { speakerId: "VALKA", text: "A service to the clan. Something that proves your worth beyond battle." },
                ],
            },
            {
                sceneId: "valka5_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Elder dragonborn watch silently, their eyes like hot coals." },
                ],
            },
            {
                sceneId: "valka5_accept_scene4",
                lines: [
                    { speakerId: "VALKA", text: "Do well, and they may accept you. Fail, and I will deny I ever knew you." },
                ],
            },
            {
                sceneId: "valka5_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The weight of the clan rests heavy in the air." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — COMPLETE
    // =========================================================================
    {
        id: "valka_chain_stage_5_complete",
        title: "Clan Acceptance",
        locationId: "cm_shrine",
        startingSceneId: "valka5_complete_scene1",
        scenes: [
            {
                sceneId: "valka5_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The elders nod, their approval like a slow tide." },
                    { speakerId: "VALKA", text: "You did well. Better than I expected." },
                ],
            },
            {
                sceneId: "valka5_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I had a good teacher." },
                    { speakerId: "VALKA", text: "Don't get soft on me now." },
                ],
            },
            {
                sceneId: "valka5_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She stands closer, her shoulder almost touching his." },
                ],
            },
            {
                sceneId: "valka5_complete_scene4",
                lines: [
                    { speakerId: "VALKA", text: "You are no longer an outsider. But you still have much to prove to me." },
                ],
            },
            {
                sceneId: "valka5_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The clan bonds tighten, and so does their private connection." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — ACCEPT
    // =========================================================================
    {
        id: "valka_chain_stage_6_accept",
        title: "The Fall",
        locationId: "cm_valka_den",
        startingSceneId: "valka6_accept_scene1",
        scenes: [
            {
                sceneId: "valka6_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka faces Kenji, firelight glinting off her scales, posture tense." },
                    { speakerId: "VALKA", text: "One final test. If you defeat me, you claim more than my respect." },
                ],
            },
            {
                sceneId: "valka6_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "And if I lose?" },
                    { speakerId: "VALKA", text: "Then I claim you." },
                ],
            },
            {
                sceneId: "valka6_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "There is no play in her eyes now. This is the fight that matters." },
                ],
            },
            {
                sceneId: "valka6_accept_scene4",
                lines: [
                    { speakerId: "VALKA", text: "No holding back." },
                ],
            },
            {
                sceneId: "valka6_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The duel begins." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — COMPLETE
    // =========================================================================
    {
        id: "valka_chain_stage_6_complete",
        title: "Pride Broken",
        locationId: "cm_valka_den",
        startingSceneId: "valka6_complete_scene1",
        scenes: [
            {
                sceneId: "valka6_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka lies on her back, breathing hard, eyes wide with shock and something else." },
                    { speakerId: "VALKA", text: "You... beat me... again." },
                ],
            },
            {
                sceneId: "valka6_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I did. And now?" },
                    { speakerId: "VALKA", text: "Now... I am yours." },
                ],
            },
            {
                sceneId: "valka6_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Her tail curls around his leg, not in threat, but in surrender." },
                ],
            },
            {
                sceneId: "valka6_complete_scene4",
                lines: [
                    { speakerId: "VALKA", text: "It seems even a matriarch can fall." },
                ],
            },
            {
                sceneId: "valka6_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The fire crackles as pride gives way to something deeper." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — ACCEPT
    // =========================================================================
    {
        id: "valka_chain_stage_7_accept",
        title: "Final Claim",
        locationId: "cm_valka_den",
        startingSceneId: "valka7_accept_scene1",
        scenes: [
            {
                sceneId: "valka7_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Valka waits at the den's heart, alone, the fire low." },
                    { speakerId: "VALKA", text: "You have beaten me, impressed my clan, and made me want what I should not." },
                ],
            },
            {
                sceneId: "valka7_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "What do you want?" },
                    { speakerId: "VALKA", text: "To be claimed. Completely." },
                ],
            },
            {
                sceneId: "valka7_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She rises, tail swaying, and steps into his space, her heat palpable." },
                ],
            },
            {
                sceneId: "valka7_accept_scene4",
                lines: [
                    { speakerId: "VALKA", text: "No more games. No more tests. Take what you've earned." },
                ],
            },
            {
                sceneId: "valka7_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The final threshold waits." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — COMPLETE
    // =========================================================================
    {
        id: "valka_chain_stage_7_complete",
        title: "Claimed",
        locationId: "cm_valka_den",
        startingSceneId: "valka7_complete_scene1",
        scenes: [
            {
                sceneId: "valka7_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The den is quiet now, the fire embers glowing soft red." },
                    { speakerId: "VALKA", text: "I am yours. Before the clan, before the gods, I am yours." },
                ],
            },
            {
                sceneId: "valka7_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "And I am yours, Valka." },
                    { speakerId: "VALKA", text: "Good. Then we are bound." },
                ],
            },
            {
                sceneId: "valka7_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She presses her forehead to his, a gentle gesture from a fierce heart." },
                ],
            },
            {
                sceneId: "valka7_complete_scene4",
                lines: [
                    { speakerId: "VALKA", text: "My old loyalties are gone. Only this remains." },
                ],
            },
            {
                sceneId: "valka7_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The proud matriarch has found her place, not in leading, but in belonging." },
                ],
            },
        ],
    },

    // ============================================================================
    // SEIRA CUTSCENES SEED DATA
    // ============================================================================
    // Companion: Seira Night
    // Archetype: Assassin Nightblade
    // Path: Coercion & Reversal Capture
    // ============================================================================
    // =========================================================================
    // STAGE 1 — ACCEPT: The Shadow's Test
    // =========================================================================
    {
        id: "seira_stage_1_accept",
        title: "The Shadow's Test",
        locationId: "ww_forest",
        startingSceneId: "seira1_accept_scene1",
        scenes: [
            {
                sceneId: "seira1_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Whispering Wood is silent except for the rustle of leaves. Kenji feels eyes watching him from the darkness." },
                    { speakerId: "KENJI", text: "I know you're there. Show yourself." },
                    { speakerId: "NARRATOR", text: "A soft laugh echoes from the trees, then a dagger presses lightly against the back of his neck." },
                ],
            },
            {
                sceneId: "seira1_accept_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "Impressive. Most men never sense me until it's too late.", expression: "amused, dangerous" },
                    { speakerId: "KENJI", text: "I've learned to listen to the forest. And to women who like knives." },
                    { speakerId: "SEIRA", text: "Then you know I could kill you right now." },
                ],
            },
            {
                sceneId: "seira1_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The knife moves away, and Seira steps into view, her violet eyes glinting." },
                    { speakerId: "SEIRA", text: "But where's the fun in that? I want to see what you're made of." },
                    { speakerId: "KENJI", text: "What do you want?" },
                ],
            },
            {
                sceneId: "seira1_accept_scene4",
                lines: [
                    { speakerId: "SEIRA", text: "Survive my test. If you can dodge my blades for one minute, I'll consider you interesting." },
                    { speakerId: "KENJI", text: "And if I don't?" },
                    { speakerId: "SEIRA", text: "Then you die. Simple." },
                ],
            },
            {
                sceneId: "seira1_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She twirls her daggers and disappears into the shadows." },
                    { speakerId: "SEIRA", text: "Run, little light. I'll be right behind you.", expression: "wicked grin" },
                    { speakerId: "NARRATOR", text: "The test begins." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 1 — COMPLETE: First Impression
    // =========================================================================
    {
        id: "seira_stage_1_complete",
        title: "First Impression",
        locationId: "ww_forest",
        startingSceneId: "seira1_complete_scene1",
        scenes: [
            {
                sceneId: "seira1_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji stands panting but alive. A few shallow cuts mark his arms, but none are fatal." },
                    { speakerId: "SEIRA", text: "Not bad. You lasted the full minute.", expression: "impressed, but hiding it" },
                    { speakerId: "KENJI", text: "You weren't trying to kill me, were you?" },
                ],
            },
            {
                sceneId: "seira1_complete_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "If I were trying, you'd be dead. I was... curious." },
                    { speakerId: "NARRATOR", text: "She walks closer, her tail? No, she has no tail. Her eyes study him like a puzzle." },
                ],
            },
            {
                sceneId: "seira1_complete_scene3",
                lines: [
                    { speakerId: "SEIRA", text: "You have good instincts. Most people die in the first ten seconds." },
                    { speakerId: "KENJI", text: "I've had practice surviving." },
                    { speakerId: "SEIRA", text: "I can tell." },
                ],
            },
            {
                sceneId: "seira1_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She sheathes her daggers and leans against a tree, crossing her arms." },
                    { speakerId: "SEIRA", text: "Fine. I'll keep you alive for now. But if you bore me, I'll cut you loose." },
                    { speakerId: "KENJI", text: "I'll try to stay interesting." },
                ],
            },
            {
                sceneId: "seira1_complete_scene5",
                lines: [
                    { speakerId: "SEIRA", text: "We'll see. Now follow me. There's something I want to show you.", expression: "mysterious" },
                    { speakerId: "NARRATOR", text: "She turns and walks deeper into the woods, expecting him to follow." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — ACCEPT: Reversal
    // =========================================================================
    {
        id: "seira_stage_2_accept",
        title: "Reversal",
        locationId: "ww_seira_den",
        startingSceneId: "seira2_accept_scene1",
        scenes: [
            {
                sceneId: "seira2_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Later, Seira leads Kenji to a hidden den beneath an old oak. She seems too confident." },
                    { speakerId: "SEIRA", text: "This is my place. Don't touch anything." },
                    { speakerId: "KENJI", text: "You brought me here. Why?" },
                ],
            },
            {
                sceneId: "seira2_accept_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "Because I want to see how you handle a real threat. Not a game." },
                    { speakerId: "NARRATOR", text: "She vanishes into the shadows. A moment later, her voice echoes." },
                    { speakerId: "SEIRA", text: "Catch me if you can, little light." },
                ],
            },
            {
                sceneId: "seira2_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji hears movement behind him. He turns, but she's already gone." },
                    { speakerId: "KENJI", text: "Fine. If it's a hunt you want, let's hunt." },
                    { speakerId: "SEIRA", text: "Oh, I like that. But it won't be that easy." },
                ],
            },
            {
                sceneId: "seira2_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The den is dark, full of traps and hidden passages. Kenji must catch an assassin in her own territory." },
                    { speakerId: "KENJI", text: "Time to turn the tables." },
                    { speakerId: "SEIRA", text: "Come and get me." },
                ],
            },
            {
                sceneId: "seira2_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The hunt begins." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — COMPLETE: Captured
    // =========================================================================
    {
        id: "seira_stage_2_complete",
        title: "Captured",
        locationId: "ww_seira_den",
        startingSceneId: "seira2_complete_scene1",
        scenes: [
            {
                sceneId: "seira2_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji's hand closes around Seira's wrist, pinning her against the wall. Her daggers lie on the floor." },
                    { speakerId: "SEIRA", text: "What... how did you...?", expression: "shocked, angry" },
                    { speakerId: "KENJI", text: "You talk too much during a hunt." },
                ],
            },
            {
                sceneId: "seira2_complete_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "Let go of me.", expression: "struggling, but not truly fighting" },
                    { speakerId: "KENJI", text: "Not until you promise to stop trying to kill me." },
                    { speakerId: "SEIRA", text: "I wasn't trying to kill you. This time." },
                ],
            },
            {
                sceneId: "seira2_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She stops struggling, her breath unsteady. Her eyes search his face, confused." },
                    { speakerId: "SEIRA", text: "No one's ever caught me before." },
                    { speakerId: "KENJI", text: "There's a first time for everything." },
                ],
            },
            {
                sceneId: "seira2_complete_scene4",
                lines: [
                    { speakerId: "SEIRA", text: "Fine. You win. Now let me go." },
                    { speakerId: "KENJI", text: "Only if you agree to follow me." },
                    { speakerId: "SEIRA", text: "Follow you? You're insane." },
                ],
            },
            {
                sceneId: "seira2_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "After a long silence, she nods once, her pride wounded but intact." },
                    { speakerId: "SEIRA", text: "Fine. But I'll kill you if you slow me down." },
                    { speakerId: "NARRATOR", text: "The first crack in her armor appears." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — ACCEPT: Coercion
    // =========================================================================
    {
        id: "seira_stage_3_accept",
        title: "Coercion",
        locationId: "ww_seira_den",
        startingSceneId: "seira3_accept_scene1",
        scenes: [
            {
                sceneId: "seira3_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Seira sits in the corner of the den, sharpening a dagger with deliberate slowness." },
                    { speakerId: "SEIRA", text: "So, what now? Are you going to keep me as your pet assassin?" },
                    { speakerId: "KENJI", text: "I'm not keeping you. I'm asking you to work with me." },
                ],
            },
            {
                sceneId: "seira3_accept_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "Same thing. But fine. I'll follow. For now." },
                    { speakerId: "NARRATOR", text: "Her tone is mocking, but her eyes flicker with something else—curiosity, or resentment." },
                ],
            },
            {
                sceneId: "seira3_accept_scene3",
                lines: [
                    { speakerId: "KENJI", text: "There are cultists in the woods. I need your help to deal with them." },
                    { speakerId: "SEIRA", text: "Cultists? Easy prey. Why do you need me?" },
                    { speakerId: "KENJI", text: "Because you're better at killing than I am." },
                ],
            },
            {
                sceneId: "seira3_accept_scene4",
                lines: [
                    { speakerId: "SEIRA", text: "Hah. At least you know it." },
                    { speakerId: "NARRATOR", text: "She stands, stretches like a cat, and looks at him with a sharp smile." },
                    { speakerId: "SEIRA", text: "Fine. But you owe me." },
                ],
            },
            {
                sceneId: "seira3_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The reluctant partnership begins." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — COMPLETE: Begrudging Respect
    // =========================================================================
    {
        id: "seira_stage_3_complete",
        title: "Begrudging Respect",
        locationId: "ww_forest",
        startingSceneId: "seira3_complete_scene1",
        scenes: [
            {
                sceneId: "seira3_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The last cultist falls, and the forest is quiet again." },
                    { speakerId: "SEIRA", text: "Not bad. You didn't die." },
                    { speakerId: "KENJI", text: "Thanks to you." },
                ],
            },
            {
                sceneId: "seira3_complete_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "Don't get used to it." },
                    { speakerId: "NARRATOR", text: "But there's no real bite in her words. She looks almost pleased." },
                ],
            },
            {
                sceneId: "seira3_complete_scene3",
                lines: [
                    { speakerId: "SEIRA", text: "You fight like a soldier, not an assassin. It's sloppy." },
                    { speakerId: "KENJI", text: "I never claimed to be an assassin." },
                    { speakerId: "SEIRA", text: "Maybe I should teach you." },
                ],
            },
            {
                sceneId: "seira3_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She glances at him, then away, as if surprised by her own offer." },
                    { speakerId: "SEIRA", text: "Forget it." },
                    { speakerId: "KENJI", text: "I'd like that." },
                ],
            },
            {
                sceneId: "seira3_complete_scene5",
                lines: [
                    { speakerId: "SEIRA", text: "Then keep up, little light. I won't go easy." },
                    { speakerId: "NARRATOR", text: "A faint, reluctant smile crosses her lips." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — ACCEPT: The Client
    // =========================================================================
    {
        id: "seira_stage_4_accept",
        title: "The Client",
        locationId: "ww_seira_den",
        startingSceneId: "seira4_accept_scene1",
        scenes: [
            {
                sceneId: "seira4_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Back at the den, Seira sits by a small fire, her expression unreadable." },
                    { speakerId: "KENJI", text: "You said you were sent after me. Who sent you?" },
                    { speakerId: "SEIRA", text: "That's dangerous information." },
                ],
            },
            {
                sceneId: "seira4_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I need to know." },
                    { speakerId: "SEIRA", text: "Why? So you can kill them? That's my job." },
                    { speakerId: "KENJI", text: "So I can understand why I'm being hunted." },
                ],
            },
            {
                sceneId: "seira4_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She stares into the fire, then finally speaks." },
                    { speakerId: "SEIRA", text: "It was a dark elf noble from the Auric Court. Name: Lord Vexen." },
                    { speakerId: "KENJI", text: "Why would a noble want me dead?" },
                ],
            },
            {
                sceneId: "seira4_accept_scene4",
                lines: [
                    { speakerId: "SEIRA", text: "I don't ask why. I just take the contract." },
                    { speakerId: "NARRATOR", text: "But her voice wavers, as if the answer troubles her more than she admits." },
                ],
            },
            {
                sceneId: "seira4_accept_scene5",
                lines: [
                    { speakerId: "SEIRA", text: "If you want to know more, you'll have to find Vexen yourself. I won't help you die." },
                    { speakerId: "NARRATOR", text: "The quest for answers begins." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — COMPLETE: Vulnerability
    // =========================================================================
    {
        id: "seira_stage_4_complete",
        title: "Vulnerability",
        locationId: "ww_seira_den",
        startingSceneId: "seira4_complete_scene1",
        scenes: [
            {
                sceneId: "seira4_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji returns with new information. Seira listens quietly." },
                    { speakerId: "SEIRA", text: "So Vexen is involved with the cult. That's worse than I thought." },
                    { speakerId: "KENJI", text: "You didn't know?" },
                ],
            },
            {
                sceneId: "seira4_complete_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "I don't ask questions. I told you." },
                    { speakerId: "NARRATOR", text: "She looks away, fingers tracing the hilt of her dagger." },
                ],
            },
            {
                sceneId: "seira4_complete_scene3",
                lines: [
                    { speakerId: "KENJI", text: "This changes things. We can't just go after him alone." },
                    { speakerId: "SEIRA", text: "I work alone. Always have." },
                    { speakerId: "KENJI", text: "Not anymore." },
                ],
            },
            {
                sceneId: "seira4_complete_scene4",
                lines: [
                    { speakerId: "SEIRA", text: "Why do you care?" },
                    { speakerId: "KENJI", text: "Because you deserve better than being used." },
                    { speakerId: "SEIRA", text: "I'm an assassin. Being used is what I do." },
                ],
            },
            {
                sceneId: "seira4_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "For a moment, her mask cracks, and something raw shows in her eyes." },
                    { speakerId: "SEIRA", text: "Don't make me regret this." },
                    { speakerId: "NARRATOR", text: "The ice begins to thaw." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — ACCEPT: Forced Reliance
    // =========================================================================
    {
        id: "seira_stage_5_accept",
        title: "Forced Reliance",
        locationId: "ww_forest",
        startingSceneId: "seira5_accept_scene1",
        scenes: [
            {
                sceneId: "seira5_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "While scouting the forest, Seira is caught in a sudden rockslide." },
                    { speakerId: "SEIRA", text: "Ngh! My leg...", expression: "pain, frustration" },
                    { speakerId: "KENJI", text: "Hold on. I'm coming." },
                ],
            },
            {
                sceneId: "seira5_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji pulls her free, but her leg is badly injured." },
                    { speakerId: "SEIRA", text: "I can walk. Leave me." },
                    { speakerId: "KENJI", text: "No. You're coming with me." },
                ],
            },
            {
                sceneId: "seira5_accept_scene3",
                lines: [
                    { speakerId: "SEIRA", text: "I don't need your help." },
                    { speakerId: "KENJI", text: "You're in no position to argue." },
                    { speakerId: "NARRATOR", text: "She glares, but allows him to support her." },
                ],
            },
            {
                sceneId: "seira5_accept_scene4",
                lines: [
                    { speakerId: "SEIRA", text: "This is humiliating." },
                    { speakerId: "KENJI", text: "Would you rather die in the woods?" },
                    { speakerId: "SEIRA", text: "...No." },
                ],
            },
            {
                sceneId: "seira5_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "They make their way slowly back to the den, Seira leaning on Kenji more than she'd like." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — COMPLETE: Reluctant Trust
    // =========================================================================
    {
        id: "seira_stage_5_complete",
        title: "Reluctant Trust",
        locationId: "ww_seira_den",
        startingSceneId: "seira5_complete_scene1",
        scenes: [
            {
                sceneId: "seira5_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Back at the den, Kenji tends to Seira's leg. She sits still, uncharacteristically quiet." },
                    { speakerId: "SEIRA", text: "You didn't have to do that." },
                    { speakerId: "KENJI", text: "I wanted to." },
                ],
            },
            {
                sceneId: "seira5_complete_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "Why? I've tried to kill you." },
                    { speakerId: "KENJI", text: "You didn't succeed." },
                    { speakerId: "SEIRA", text: "That's not an answer." },
                ],
            },
            {
                sceneId: "seira5_complete_scene3",
                lines: [
                    { speakerId: "KENJI", text: "Because I think there's more to you than an assassin." },
                    { speakerId: "SEIRA", text: "You're wrong." },
                    { speakerId: "NARRATOR", text: "But her voice is soft, and she doesn't pull away." },
                ],
            },
            {
                sceneId: "seira5_complete_scene4",
                lines: [
                    { speakerId: "SEIRA", text: "I... I'm not used to needing anyone." },
                    { speakerId: "KENJI", text: "Neither am I." },
                    { speakerId: "SEIRA", text: "But you came back for me." },
                ],
            },
            {
                sceneId: "seira5_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She finally meets his eyes, and something shifts between them." },
                    { speakerId: "SEIRA", text: "Thank you." },
                    { speakerId: "NARRATOR", text: "The words are small, but they mean everything." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — ACCEPT: No Escape
    // =========================================================================
    {
        id: "seira_stage_6_accept",
        title: "No Escape",
        locationId: "ww_seira_den",
        startingSceneId: "seira6_accept_scene1",
        scenes: [
            {
                sceneId: "seira6_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Weeks later, Seira's leg has healed. Yet she still lingers near Kenji." },
                    { speakerId: "KENJI", text: "You could leave now. Your contract is broken." },
                    { speakerId: "SEIRA", text: "I know." },
                ],
            },
            {
                sceneId: "seira6_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Then why are you still here?" },
                    { speakerId: "SEIRA", text: "Maybe I have nowhere else to go." },
                    { speakerId: "NARRATOR", text: "She looks away, arms crossed, but there's no lie in her voice." },
                ],
            },
            {
                sceneId: "seira6_accept_scene3",
                lines: [
                    { speakerId: "KENJI", text: "Is that the only reason?" },
                    { speakerId: "SEIRA", text: "Does it matter?" },
                    { speakerId: "KENJI", text: "It matters to me." },
                ],
            },
            {
                sceneId: "seira6_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns to face him, her expression unreadable." },
                    { speakerId: "SEIRA", text: "If I stay, it's because I want to. Not because I have to." },
                    { speakerId: "KENJI", text: "Then stay." },
                ],
            },
            {
                sceneId: "seira6_accept_scene5",
                lines: [
                    { speakerId: "SEIRA", text: "I'll think about it." },
                    { speakerId: "NARRATOR", text: "But her eyes say she's already decided." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — COMPLETE: She Stays
    // =========================================================================
    {
        id: "seira_stage_6_complete",
        title: "She Stays",
        locationId: "ww_seira_den",
        startingSceneId: "seira6_complete_scene1",
        scenes: [
            {
                sceneId: "seira6_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji returns to the den to find Seira waiting, her few belongings packed away." },
                    { speakerId: "SEIRA", text: "I've decided." },
                    { speakerId: "KENJI", text: "And?" },
                ],
            },
            {
                sceneId: "seira6_complete_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "I'm staying. For good." },
                    { speakerId: "NARRATOR", text: "She says it firmly, as if daring him to question it." },
                ],
            },
            {
                sceneId: "seira6_complete_scene3",
                lines: [
                    { speakerId: "KENJI", text: "What changed?" },
                    { speakerId: "SEIRA", text: "You. You changed me." },
                    { speakerId: "SEIRA", text: "I never thought I'd want anything but the kill. But now..." },
                ],
            },
            {
                sceneId: "seira6_complete_scene4",
                lines: [
                    { speakerId: "SEIRA", text: "I want to see where this goes." },
                    { speakerId: "KENJI", text: "Then let's find out together." },
                    { speakerId: "NARRATOR", text: "She steps closer, and for the first time, she doesn't look like a shadow." },
                ],
            },
            {
                sceneId: "seira6_complete_scene5",
                lines: [
                    { speakerId: "SEIRA", text: "I'm yours, Kenji. But don't make me regret it." },
                    { speakerId: "NARRATOR", text: "The words hold a promise—and a warning." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — ACCEPT: Bound to You
    // =========================================================================
    {
        id: "seira_stage_7_accept",
        title: "Bound to You",
        locationId: "ww_seira_den",
        startingSceneId: "seira7_accept_scene1",
        scenes: [
            {
                sceneId: "seira7_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "One evening, Seira approaches Kenji with a strip of dark cloth in her hands." },
                    { speakerId: "SEIRA", text: "I want to make a vow." },
                    { speakerId: "KENJI", text: "What kind of vow?" },
                ],
            },
            {
                sceneId: "seira7_accept_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "One that says I belong to you. Not as a prisoner, but as your partner." },
                    { speakerId: "NARRATOR", text: "She holds out the cloth, a strip of her own cloak." },
                ],
            },
            {
                sceneId: "seira7_accept_scene3",
                lines: [
                    { speakerId: "SEIRA", text: "Bind my hands if you accept. I trust you." },
                    { speakerId: "KENJI", text: "Are you sure?" },
                    { speakerId: "SEIRA", text: "I've never been more sure of anything." },
                ],
            },
            {
                sceneId: "seira7_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She kneels, offering her wrists. The gesture is both submission and trust." },
                    { speakerId: "SEIRA", text: "I'm yours, Kenji. Take me." },
                ],
            },
            {
                sceneId: "seira7_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The moment hangs in the air, heavy with meaning." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — COMPLETE: Forever Bound
    // =========================================================================
    {
        id: "seira_stage_7_complete",
        title: "Forever Bound",
        locationId: "ww_seira_den",
        startingSceneId: "seira7_complete_scene1",
        scenes: [
            {
                sceneId: "seira7_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji takes the cloth and binds her wrists—not tightly, but firmly." },
                    { speakerId: "SEIRA", text: "I never thought I'd kneel for anyone." },
                    { speakerId: "KENJI", text: "You're not kneeling to me. You're choosing to stay." },
                ],
            },
            {
                sceneId: "seira7_complete_scene2",
                lines: [
                    { speakerId: "SEIRA", text: "That's the same thing, isn't it?" },
                    { speakerId: "NARRATOR", text: "She smiles, a genuine smile with no knives behind it." },
                ],
            },
            {
                sceneId: "seira7_complete_scene3",
                lines: [
                    { speakerId: "SEIRA", text: "I've killed so many. But with you... I feel alive." },
                    { speakerId: "KENJI", text: "Then let's live." },
                ],
            },
            {
                sceneId: "seira7_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "He pulls her to her feet, and for a long moment they simply stand there, bound together." },
                    { speakerId: "SEIRA", text: "I'm yours, Kenji. Now and always." },
                ],
            },
            {
                sceneId: "seira7_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The shadow of the assassin has found her light." },
                ],
            },
        ],
    },
    // ============================================================================
    // SYLVARA MOON — QUEST CUTSCENES
    // ============================================================================
    // =========================================================================
    // STAGE 1 — ACCEPT
    // =========================================================================
    {
        id: "sylvara_chain_stage_1_accept",
        title: "The Moonlit Grove",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_accept1_scene1",
        scenes: [
            {
                sceneId: "sylvara_accept1_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Moonlight spills through the ancient trees, silvering the hidden grove. Sylvara Moon kneels among the flowers, her pale hair trailing across the grass." },
                    { speakerId: "SYLVARA", text: "You returned. I did not expect that.", expression: "soft surprise" },
                    { speakerId: "KENJI", text: "I said I would help. I meant it." },
                ],
            },
            {
                sceneId: "sylvara_accept1_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "She brushes a hand across a drooping silver blossom, her touch gentle but tired." },
                    { speakerId: "SYLVARA", text: "This grove was once a place of peace. Now even the flowers grieve." },
                    { speakerId: "KENJI", text: "Then let me share the burden, even for a little while." },
                ],
            },
            {
                sceneId: "sylvara_accept1_scene3",
                lines: [
                    { speakerId: "SYLVARA", text: "Why do you care? You hardly know me.", expression: "guarded, curious" },
                ],
                choices: [
                    { choiceId: "sylvara1_gentle", text: "Say the grove feels too beautiful to abandon.", effects: { trustDelta: 3, loveDelta: 2 }, nextSceneId: "sylvara_accept1_scene4" },
                    { choiceId: "sylvara1_open", text: "Admit you don't know yet, but you want to help.", effects: { trustDelta: 4, loveDelta: 2 }, nextSceneId: "sylvara_accept1_scene4" },
                    { choiceId: "sylvara1_direct", text: "Tell her you follow the corruption, and she is part of this land.", effects: { trustDelta: 2, loveDelta: 1 }, nextSceneId: "sylvara_accept1_scene4" },
                ],
            },
            {
                sceneId: "sylvara_accept1_scene4",
                lines: [
                    { speakerId: "SYLVARA", text: "Very well. Then help me tend the flowers. It is simple work, but it matters to them.", expression: "grateful, still reserved" },
                    { speakerId: "NARRATOR", text: "She hands him a small wooden trowel, its handle worn smooth by many lonely seasons." },
                ],
            },
            {
                sceneId: "sylvara_accept1_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "They work side by side in silence, the only sound the soft rustle of leaves and the murmur of the moonlit stream." },
                    { speakerId: "KENJI", text: "This isn't so bad." },
                    { speakerId: "SYLVARA", text: "No. It isn't.", expression: "small, genuine smile" },
                ],
            },
            {
                sceneId: "sylvara_accept1_scene6",
                lines: [
                    { speakerId: "NARRATOR", text: "The first lesson of the grove is given not in words, but in shared silence." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 1 — COMPLETE
    // =========================================================================
    {
        id: "sylvara_chain_stage_1_complete",
        title: "Blossoms and Trust",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_complete1_scene1",
        scenes: [
            {
                sceneId: "sylvara_complete1_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The last flower is planted, and the grove seems to breathe again." },
                    { speakerId: "SYLVARA", text: "You did well. The grove already feels lighter.", expression: "warmth returning" },
                    { speakerId: "KENJI", text: "It was peaceful. I can see why you stay." },
                ],
            },
            {
                sceneId: "sylvara_complete1_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "Peace is a rare thing. But it can be lonely." },
                    { speakerId: "KENJI", text: "Then maybe I'll visit more often." },
                ],
            },
            {
                sceneId: "sylvara_complete1_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks at him for a long moment, as if deciding whether to believe him." },
                    { speakerId: "SYLVARA", text: "I would like that.", expression: "soft, hopeful" },
                ],
            },
            {
                sceneId: "sylvara_complete1_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The moon hangs low, and the grove seems to approve." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — ACCEPT
    // =========================================================================
    {
        id: "sylvara_chain_stage_2_accept",
        title: "Echoes of the Lost Mate",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_accept2_scene1",
        scenes: [
            {
                sceneId: "sylvara_accept2_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sylvara sits by the stream, her eyes far away, fingers tracing the edge of a withered petal." },
                    { speakerId: "KENJI", text: "You look like you're carrying something heavy." },
                    { speakerId: "SYLVARA", text: "Do I? Perhaps the grove is not the only thing that grieves.", expression: "wistful" },
                ],
            },
            {
                sceneId: "sylvara_accept2_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Will you tell me about it?" },
                ],
                choices: [
                    { choiceId: "sylvara2_gentle", text: "Sit beside her and wait.", effects: { trustDelta: 3, loveDelta: 2 }, nextSceneId: "sylvara_accept2_scene3" },
                    { choiceId: "sylvara2_press", text: "Gently insist she share.", effects: { trustDelta: 2, loveDelta: 1 }, nextSceneId: "sylvara_accept2_scene3" },
                    { choiceId: "sylvara2_offer", text: "Offer her a flower as comfort.", effects: { trustDelta: 4, loveDelta: 3 }, nextSceneId: "sylvara_accept2_scene3" },
                ],
            },
            {
                sceneId: "sylvara_accept2_scene3",
                lines: [
                    { speakerId: "SYLVARA", text: "There was someone. A mate. He was taken by the corruption long ago." },
                    { speakerId: "NARRATOR", text: "Her voice is quiet, but steady, as if she has rehearsed this pain." },
                ],
            },
            {
                sceneId: "sylvara_accept2_scene4",
                lines: [
                    { speakerId: "SYLVARA", text: "I keep the grove for him. For who he was before the blight took him." },
                    { speakerId: "KENJI", text: "I'm sorry. I can't imagine that loss." },
                ],
            },
            {
                sceneId: "sylvara_accept2_scene5",
                lines: [
                    { speakerId: "SYLVARA", text: "Thank you. But I didn't tell you to make you pity me. I told you because... you asked." },
                ],
            },
            {
                sceneId: "sylvara_accept2_scene6",
                lines: [
                    { speakerId: "NARRATOR", text: "The stream whispers over stones, carrying the first true trust between them." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — COMPLETE
    // =========================================================================
    {
        id: "sylvara_chain_stage_2_complete",
        title: "A Shared Sorrow",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_complete2_scene1",
        scenes: [
            {
                sceneId: "sylvara_complete2_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The moon has risen higher, and Sylvara's eyes are no longer so distant." },
                    { speakerId: "SYLVARA", text: "I didn't think I would ever speak of him again." },
                    { speakerId: "KENJI", text: "I'm honored you did." },
                ],
            },
            {
                sceneId: "sylvara_complete2_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "You listen. That is rarer than you know.", expression: "grateful, warm" },
                ],
            },
            {
                sceneId: "sylvara_complete2_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She reaches out and lightly touches his hand before pulling back, as if surprised by her own gesture." },
                ],
            },
            {
                sceneId: "sylvara_complete2_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I'll be here if you want to talk again." },
                    { speakerId: "SYLVARA", text: "I think I would like that." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — ACCEPT
    // =========================================================================
    {
        id: "sylvara_chain_stage_3_accept",
        title: "Corruption's Roots",
        locationId: "ww_heartwood_grove",
        startingSceneId: "sylvara_accept3_scene1",
        scenes: [
            {
                sceneId: "sylvara_accept3_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The grove's beauty is marred by black veins pulsing through the earth." },
                    { speakerId: "SYLVARA", text: "The corruption has reached the roots. If we don't stop it, the grove will die." },
                    { speakerId: "KENJI", text: "Then we fight it." },
                ],
            },
            {
                sceneId: "sylvara_accept3_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "It won't be easy. The corrupted treants guard the heartwood." },
                    { speakerId: "KENJI", text: "I've fought worse." },
                ],
            },
            {
                sceneId: "sylvara_accept3_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She touches a blackened root, and it crumbles beneath her fingers." },
                    { speakerId: "SYLVARA", text: "Then let us be quick. The longer we wait, the deeper it spreads." },
                ],
            },
            {
                sceneId: "sylvara_accept3_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Stay close. I'll protect you." },
                    { speakerId: "SYLVARA", text: "I can protect myself. But... thank you." },
                ],
            },
            {
                sceneId: "sylvara_accept3_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "They move deeper into the grove, the air thickening with miasma." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — COMPLETE
    // =========================================================================
    {
        id: "sylvara_chain_stage_3_complete",
        title: "The Grove Breathes",
        locationId: "ww_heartwood_grove",
        startingSceneId: "sylvara_complete3_scene1",
        scenes: [
            {
                sceneId: "sylvara_complete3_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The last treant falls, and the black veins fade from the soil." },
                    { speakerId: "SYLVARA", text: "It's... it's receding.", expression: "relieved, exhausted" },
                    { speakerId: "KENJI", text: "We did it." },
                ],
            },
            {
                sceneId: "sylvara_complete3_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Sylvara kneels, pressing her palms to the earth. The moonlight brightens around them." },
                    { speakerId: "SYLVARA", text: "The grove will heal. It will take time, but it will heal." },
                ],
            },
            {
                sceneId: "sylvara_complete3_scene3",
                lines: [
                    { speakerId: "KENJI", text: "We'll keep it safe." },
                    { speakerId: "SYLVARA", text: "Yes. We will." },
                ],
            },
            {
                sceneId: "sylvara_complete3_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "For the first time in a long while, Sylvara's smile reaches her eyes." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — ACCEPT
    // =========================================================================
    {
        id: "sylvara_chain_stage_4_accept",
        title: "The Moon Ritual",
        locationId: "ww_shrine",
        startingSceneId: "sylvara_accept4_scene1",
        scenes: [
            {
                sceneId: "sylvara_accept4_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "At the Whispering Shrine, silver lanterns sway gently in the night air." },
                    { speakerId: "SYLVARA", text: "Tonight is a moon ritual. It would be good if you joined me." },
                    { speakerId: "KENJI", text: "I don't know your rituals." },
                ],
            },
            {
                sceneId: "sylvara_accept4_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "Then I will teach you. It is about gratitude, and letting go." },
                    { speakerId: "KENJI", text: "Letting go?" },
                ],
            },
            {
                sceneId: "sylvara_accept4_scene3",
                lines: [
                    { speakerId: "SYLVARA", text: "Of pain. Of the past. The moon carries what we cannot hold." },
                    { speakerId: "NARRATOR", text: "Her eyes are soft but serious." },
                ],
            },
            {
                sceneId: "sylvara_accept4_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Then I'll be there." },
                ],
            },
            {
                sceneId: "sylvara_accept4_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Sylvara smiles, and the lanterns seem to burn a little brighter." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — COMPLETE
    // =========================================================================
    {
        id: "sylvara_chain_stage_4_complete",
        title: "Under the Silver Moon",
        locationId: "ww_shrine",
        startingSceneId: "sylvara_complete4_scene1",
        scenes: [
            {
                sceneId: "sylvara_complete4_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The ritual ends in quiet harmony. Sylvara stands close, her eyes reflecting the moon." },
                    { speakerId: "SYLVARA", text: "Thank you for this. I feel... lighter." },
                    { speakerId: "KENJI", text: "I felt it too." },
                ],
            },
            {
                sceneId: "sylvara_complete4_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "It has been so long since I shared this with anyone." },
                    { speakerId: "KENJI", text: "Then we'll make it a tradition." },
                ],
            },
            {
                sceneId: "sylvara_complete4_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "A warm silence settles between them, full of unspoken possibilities." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — ACCEPT
    // =========================================================================
    {
        id: "sylvara_chain_stage_5_accept",
        title: "Healing Touch",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_accept5_scene1",
        scenes: [
            {
                sceneId: "sylvara_accept5_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sylvara winces as she kneels among the flowers, one hand pressed to her side." },
                    { speakerId: "KENJI", text: "You're hurt." },
                    { speakerId: "SYLVARA", text: "An old wound. It troubles me when the moon is full." },
                ],
            },
            {
                sceneId: "sylvara_accept5_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Let me help. I know something of healing." },
                    { speakerId: "SYLVARA", text: "I... I don't like being touched.", expression: "nervous, vulnerable" },
                ],
            },
            {
                sceneId: "sylvara_accept5_scene3",
                lines: [
                    { speakerId: "KENJI", text: "I'll be gentle. You can stop me anytime." },
                ],
            },
            {
                sceneId: "sylvara_accept5_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She hesitates, then slowly nods." },
                    { speakerId: "SYLVARA", text: "Alright. Just... please be careful." },
                ],
            },
            {
                sceneId: "sylvara_accept5_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The grove falls silent, as if holding its breath for what comes next." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — COMPLETE
    // =========================================================================
    {
        id: "sylvara_chain_stage_5_complete",
        title: "Awakening Senses",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_complete5_scene1",
        scenes: [
            {
                sceneId: "sylvara_complete5_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The healing touch ends, and Sylvara's breathing comes quicker than before." },
                    { speakerId: "SYLVARA", text: "That... that was not like any healing I know.", expression: "flushed, confused" },
                    { speakerId: "KENJI", text: "Sometimes touch can heal more than the body." },
                ],
            },
            {
                sceneId: "sylvara_complete5_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "I felt something stir. Something I thought long dead." },
                ],
            },
            {
                sceneId: "sylvara_complete5_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks away, cheeks silvered with more than moonlight." },
                ],
            },
            {
                sceneId: "sylvara_complete5_scene4",
                lines: [
                    { speakerId: "KENJI", text: "It's okay to feel. It's part of living." },
                    { speakerId: "SYLVARA", text: "I don't know if I know how anymore." },
                ],
            },
            {
                sceneId: "sylvara_complete5_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The first crack appears in the armor she built around her heart." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — ACCEPT
    // =========================================================================
    {
        id: "sylvara_chain_stage_6_accept",
        title: "Pleasure Without Guilt",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_accept6_scene1",
        scenes: [
            {
                sceneId: "sylvara_accept6_scene1",
                lines: [
                    { speakerId: "SYLVARA", text: "You keep looking at me like that. It makes me feel... strange." },
                    { speakerId: "KENJI", text: "Strange how?" },
                ],
            },
            {
                sceneId: "sylvara_accept6_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "Like I am allowed to want something for myself." },
                    { speakerId: "KENJI", text: "You are." },
                ],
            },
            {
                sceneId: "sylvara_accept6_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The air feels different now—charged, expectant." },
                ],
            },
            {
                sceneId: "sylvara_accept6_scene4",
                lines: [
                    { speakerId: "SYLVARA", text: "If you touch me again... I may not want you to stop." },
                    { speakerId: "KENJI", text: "Then I won't." },
                ],
            },
            {
                sceneId: "sylvara_accept6_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She closes the distance, and the moonlight seems to wrap around them." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — COMPLETE
    // =========================================================================
    {
        id: "sylvara_chain_stage_6_complete",
        title: "No More Guilt",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_complete6_scene1",
        scenes: [
            {
                sceneId: "sylvara_complete6_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Afterwards, Sylvara lies among the flowers, her breathing slow and deep." },
                    { speakerId: "SYLVARA", text: "I thought I would feel guilty. I don't." },
                    { speakerId: "KENJI", text: "Good. You deserve to feel good." },
                ],
            },
            {
                sceneId: "sylvara_complete6_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "Is this what I've been missing all these years?" },
                ],
            },
            {
                sceneId: "sylvara_complete6_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns to face him, her eyes soft and open." },
                ],
            },
            {
                sceneId: "sylvara_complete6_scene4",
                lines: [
                    { speakerId: "SYLVARA", text: "Don't leave me alone again." },
                    { speakerId: "KENJI", text: "I won't." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — ACCEPT
    // =========================================================================
    {
        id: "sylvara_chain_stage_7_accept",
        title: "Her Answer",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_accept7_scene1",
        scenes: [
            {
                sceneId: "sylvara_accept7_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The grove is in full bloom, silver flowers glowing under the moon." },
                    { speakerId: "SYLVARA", text: "I have waited for this moment. For you." },
                    { speakerId: "KENJI", text: "I'm here." },
                ],
            },
            {
                sceneId: "sylvara_accept7_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "I was afraid to love again. But you've shown me that my heart is not a grave." },
                ],
            },
            {
                sceneId: "sylvara_accept7_scene3",
                lines: [
                    { speakerId: "SYLVARA", text: "If you will have me, I will give you everything I have left." },
                ],
            },
            {
                sceneId: "sylvara_accept7_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I'll have all of you, Sylvara. And I'll give you all of me." },
                ],
            },
            {
                sceneId: "sylvara_accept7_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The moon seems to brighten, as if blessing their union." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — COMPLETE
    // =========================================================================
    {
        id: "sylvara_chain_stage_7_complete",
        title: "Heart Blossoms",
        locationId: "ww_sylvara_grove",
        startingSceneId: "sylvara_complete7_scene1",
        scenes: [
            {
                sceneId: "sylvara_complete7_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "In the aftermath, Sylvara rests against Kenji, her hand over his heart." },
                    { speakerId: "SYLVARA", text: "I never thought I would feel whole again." },
                    { speakerId: "KENJI", text: "You are. We are." },
                ],
            },
            {
                sceneId: "sylvara_complete7_scene2",
                lines: [
                    { speakerId: "SYLVARA", text: "Wherever you go, I will follow." },
                ],
            },
            {
                sceneId: "sylvara_complete7_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The grove whispers its approval, and the flowers sway as if dancing." },
                ],
            },
            {
                sceneId: "sylvara_complete7_scene4",
                lines: [
                    { speakerId: "SYLVARA", text: "Thank you... for bringing me back to life." },
                    { speakerId: "KENJI", text: "Thank you for trusting me." },
                ],
            },
            {
                sceneId: "sylvara_complete7_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Under the silver moon, two hearts finally beat as one." },
                ],
            },
        ],
    },
    // ============================================================================
    // REVA FOX — COMPANION CUTSCENES
    // ============================================================================
    // =========================================================================
    // STAGE 1 — The Fox's Game
    // =========================================================================
    {
        id: "reva_chain_stage_1_accept",
        title: "The Fox's Game",
        locationId: "ac_market_square",
        startingSceneId: "reva1_accept_scene1",
        scenes: [
            {
                sceneId: "reva1_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The market square is loud with merchants and gossip, but Reva Fox stands out like a flame among dull coals." },
                    { speakerId: "REVA", text: "My, my... the famous Crest-bearer, gracing this noisy little square.", expression: "playful, eyes bright" },
                    { speakerId: "KENJI", text: "And you must be the one who left that little note for me." },
                    { speakerId: "REVA", text: "Oh? You noticed. I was beginning to think you were just a pretty face." },
                ],
            },
            {
                sceneId: "reva1_accept_scene2",
                lines: [
                    { speakerId: "REVA", text: "I have a game for you, Kenji Mori.", expression: "smirking, tails swaying lazily" },
                    { speakerId: "KENJI", text: "What's the game?" },
                    { speakerId: "REVA", text: "Find me after sunset. If you can keep up, I'll tell you a secret worth more than gold." },
                ],
            },
            {
                sceneId: "reva1_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns, her tails brushing close, leaving behind a scent of night flowers." },
                    { speakerId: "KENJI", text: "Wait. Where should I look?" },
                    { speakerId: "REVA", text: "A clever man should know where a fox sleeps.", expression: "teasing before vanishing into the crowd" },
                ],
            },
            {
                sceneId: "reva1_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The crowd closes around her, and she is gone." },
                ],
                choices: [
                    { choiceId: "reva1_accept_pursue", text: "Search for her immediately.", effects: { trustDelta: 2, loveDelta: 1 }, nextSceneId: "reva1_accept_scene5" },
                    { choiceId: "reva1_accept_wait", text: "Wait until nightfall.", effects: { trustDelta: 0, loveDelta: 0 }, nextSceneId: "reva1_accept_scene5" },
                ],
            },
            {
                sceneId: "reva1_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The chase has begun." },
                ],
            },
        ],
    },
    {
        id: "reva_chain_stage_1_complete",
        title: "The Fox's Secret",
        locationId: "ac_reva_suite",
        startingSceneId: "reva1_complete_scene1",
        scenes: [
            {
                sceneId: "reva1_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "After dusk, Kenji finds the suite hidden above a quiet alley." },
                    { speakerId: "REVA", text: "Well, well. You do have a nose for trouble.", expression: "genuine amusement" },
                    { speakerId: "KENJI", text: "It wasn't hard. You left enough clues." },
                    { speakerId: "REVA", text: "Maybe I wanted to be found." },
                ],
            },
            {
                sceneId: "reva1_complete_scene2",
                lines: [
                    { speakerId: "REVA", text: "Your first secret: the Auric Court is not as clean as it pretends." },
                    { speakerId: "KENJI", text: "I already suspected that." },
                    { speakerId: "REVA", text: "Then you're smarter than most nobles here. Good." },
                ],
            },
            {
                sceneId: "reva1_complete_scene3",
                lines: [
                    { speakerId: "REVA", text: "But I'll need a favor first. A small game, nothing dangerous... yet.", expression: "flirty" },
                    { speakerId: "KENJI", text: "I'm listening." },
                ],
            },
            {
                sceneId: "reva1_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva leans in, her voice dropping to a whisper." },
                    { speakerId: "REVA", text: "Meet me in the market tomorrow. And don't be late." },
                ],
            },
            {
                sceneId: "reva1_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She smiles, and for a moment, her eyes look less like a fox and more like a woman." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — Secret Stakes
    // =========================================================================
    {
        id: "reva_chain_stage_2_accept",
        title: "Secret Stakes",
        locationId: "ac_market_square",
        startingSceneId: "reva2_accept_scene1",
        scenes: [
            {
                sceneId: "reva2_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva waits by a silk stall, idly running her fingers over a roll of crimson fabric." },
                    { speakerId: "REVA", text: "Right on time. I'm impressed.", expression: "raised eyebrow" },
                    { speakerId: "KENJI", text: "You said you had something important." },
                ],
            },
            {
                sceneId: "reva2_accept_scene2",
                lines: [
                    { speakerId: "REVA", text: "I do. The kind of thing that could get you killed if you repeat it." },
                    { speakerId: "KENJI", text: "Then why tell me?" },
                    { speakerId: "REVA", text: "Because watching you squirm is my favorite entertainment." },
                ],
            },
            {
                sceneId: "reva2_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She motions for him to follow, slipping into a narrow alley." },
                ],
            },
            {
                sceneId: "reva2_accept_scene4",
                lines: [
                    { speakerId: "REVA", text: "The Secret Archive. Someone is smuggling forbidden texts out." },
                    { speakerId: "KENJI", text: "That's a serious accusation." },
                    { speakerId: "REVA", text: "I never make accusations. I make observations." },
                ],
            },
            {
                sceneId: "reva2_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Her gaze is sharp now, all play gone." },
                    { speakerId: "REVA", text: "Help me look into it, and I'll give you another secret." },
                ],
            },
        ],
    },
    {
        id: "reva_chain_stage_2_complete",
        title: "A Name in the Dark",
        locationId: "ac_reva_suite",
        startingSceneId: "reva2_complete_scene1",
        scenes: [
            {
                sceneId: "reva2_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva unfurls a small parchment, revealing a list of names." },
                    { speakerId: "REVA", text: "One of these is selling secrets to the cults. I just don't know which." },
                    { speakerId: "KENJI", text: "That's a short list." },
                    { speakerId: "REVA", text: "Short, but dangerous." },
                ],
            },
            {
                sceneId: "reva2_complete_scene2",
                lines: [
                    { speakerId: "REVA", text: "I've been watching them. But I'm not patient enough for stakeouts." },
                    { speakerId: "KENJI", text: "Let me guess—you want me to do the watching." },
                    { speakerId: "REVA", text: "You learn quickly.", expression: "smirk" },
                ],
            },
            {
                sceneId: "reva2_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She offers him the parchment." },
                    { speakerId: "REVA", text: "Consider this my second secret. A name will be your third." },
                ],
            },
            {
                sceneId: "reva2_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "And if I don't want to play your game anymore?" },
                    { speakerId: "REVA", text: "Then you'd miss all the fun." },
                ],
            },
            {
                sceneId: "reva2_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She leans against the wall, studying him with renewed interest." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — Turning the Game
    // =========================================================================
    {
        id: "reva_chain_stage_3_accept",
        title: "Turning the Game",
        locationId: "ac_market_square",
        startingSceneId: "reva3_accept_scene1",
        scenes: [
            {
                sceneId: "reva3_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva saunters toward Kenji, expecting to lead the dance as always." },
                    { speakerId: "REVA", text: "There you are. I was starting to think you'd run away." },
                    { speakerId: "KENJI", text: "I was just finding a better way to make you come to me." },
                ],
            },
            {
                sceneId: "reva3_accept_scene2",
                lines: [
                    { speakerId: "REVA", text: "Oh? And how did that work out?", expression: "challenging" },
                    { speakerId: "KENJI", text: "You're standing right in front of me, aren't you?" },
                ],
            },
            {
                sceneId: "reva3_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "For the first time, Reva's smile falters." },
                    { speakerId: "REVA", text: "Hmm. Not bad." },
                ],
            },
            {
                sceneId: "reva3_accept_scene4",
                lines: [
                    { speakerId: "REVA", text: "But can you keep up?" },
                    { speakerId: "KENJI", text: "I think you'll be the one trying to keep up." },
                ],
            },
            {
                sceneId: "reva3_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Her tails twitch, and for once, she looks genuinely intrigued." },
                ],
            },
        ],
    },
    {
        id: "reva_chain_stage_3_complete",
        title: "A Fox Caught Off Guard",
        locationId: "ac_reva_suite",
        startingSceneId: "reva3_complete_scene1",
        scenes: [
            {
                sceneId: "reva3_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "In her suite, Reva pours tea with exaggerated grace, but her eyes keep darting to Kenji." },
                    { speakerId: "REVA", text: "You've been different lately." },
                    { speakerId: "KENJI", text: "Maybe I just stopped playing by your rules." },
                ],
            },
            {
                sceneId: "reva3_complete_scene2",
                lines: [
                    { speakerId: "REVA", text: "Everyone plays by my rules, eventually." },
                    { speakerId: "KENJI", text: "Not me." },
                ],
            },
            {
                sceneId: "reva3_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva sets the teapot down, her expression unreadable." },
                    { speakerId: "REVA", text: "And that is exactly what makes you interesting." },
                ],
            },
            {
                sceneId: "reva3_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She steps closer, close enough that he can see the slight flush on her cheeks." },
                    { speakerId: "REVA", text: "But don't think you've won. The game is just beginning." },
                ],
            },
            {
                sceneId: "reva3_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Yet even as she says it, she doesn't pull away." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — Genuine Attraction
    // =========================================================================
    {
        id: "reva_chain_stage_4_accept",
        title: "Genuine Attraction",
        locationId: "ac_reva_suite",
        startingSceneId: "reva4_accept_scene1",
        scenes: [
            {
                sceneId: "reva4_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva answers the door before Kenji can knock, as if she sensed him coming." },
                    { speakerId: "REVA", text: "You're early. I'm impressed." },
                    { speakerId: "KENJI", text: "I didn't see the point in waiting." },
                ],
            },
            {
                sceneId: "reva4_accept_scene2",
                lines: [
                    { speakerId: "REVA", text: "Careful. A girl might think you missed her." },
                    { speakerId: "KENJI", text: "Maybe I did." },
                ],
            },
            {
                sceneId: "reva4_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva's tails still, and she looks away, a rare moment of silence." },
                ],
            },
            {
                sceneId: "reva4_accept_scene4",
                lines: [
                    { speakerId: "REVA", text: "Sit. I'll pour you something." },
                ],
            },
            {
                sceneId: "reva4_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The air between them feels warmer now, less like a game and more like something real." },
                ],
            },
        ],
    },
    {
        id: "reva_chain_stage_4_complete",
        title: "A Slip of the Mask",
        locationId: "ac_reva_suite",
        startingSceneId: "reva4_complete_scene1",
        scenes: [
            {
                sceneId: "reva4_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "As they talk, Reva's usual teasing fades into something softer." },
                    { speakerId: "REVA", text: "You're not like the others." },
                    { speakerId: "KENJI", text: "How so?" },
                ],
            },
            {
                sceneId: "reva4_complete_scene2",
                lines: [
                    { speakerId: "REVA", text: "Most men either fear me or want to possess me. You just... talk to me." },
                ],
            },
            {
                sceneId: "reva4_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She catches herself and forces a laugh." },
                    { speakerId: "REVA", text: "Not that I'm complaining." },
                ],
            },
            {
                sceneId: "reva4_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "But her eyes remain serious for a heartbeat too long." },
                ],
            },
            {
                sceneId: "reva4_complete_scene5",
                lines: [
                    { speakerId: "KENJI", text: "Maybe I like talking to you." },
                    { speakerId: "REVA", text: "Then stay a while." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — The Mask Slips
    // =========================================================================
    {
        id: "reva_chain_stage_5_accept",
        title: "The Mask Slips",
        locationId: "ac_reva_suite",
        startingSceneId: "reva5_accept_scene1",
        scenes: [
            {
                sceneId: "reva5_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva is waiting on the balcony, her tails hanging still for once." },
                    { speakerId: "REVA", text: "I didn't think you'd come tonight." },
                    { speakerId: "KENJI", text: "Why not?" },
                ],
            },
            {
                sceneId: "reva5_accept_scene2",
                lines: [
                    { speakerId: "REVA", text: "Because I'm not very good company when I'm not performing." },
                ],
            },
            {
                sceneId: "reva5_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks out over the city, her expression unguarded." },
                    { speakerId: "REVA", text: "Sometimes I wonder what it would be like to be known." },
                ],
            },
            {
                sceneId: "reva5_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I think I'm starting to know you." },
                    { speakerId: "REVA", text: "Then you see more than most." },
                ],
            },
            {
                sceneId: "reva5_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns to him, and the mask she always wears is gone." },
                ],
            },
        ],
    },
    {
        id: "reva_chain_stage_5_complete",
        title: "A Fox's Honesty",
        locationId: "ac_reva_suite",
        startingSceneId: "reva5_complete_scene1",
        scenes: [
            {
                sceneId: "reva5_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "They talk for hours, until the candles burn low." },
                    { speakerId: "REVA", text: "No one has ever listened to me like this." },
                    { speakerId: "KENJI", text: "Then maybe they didn't deserve to." },
                ],
            },
            {
                sceneId: "reva5_complete_scene2",
                lines: [
                    { speakerId: "REVA", text: "You're dangerous, Kenji. You make me want things I shouldn't." },
                ],
            },
            {
                sceneId: "reva5_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She steps closer, close enough to touch." },
                    { speakerId: "REVA", text: "If you leave now, I'll pretend this didn't happen." },
                ],
            },
            {
                sceneId: "reva5_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "And if I stay?" },
                    { speakerId: "REVA", text: "Then I might not let you go." },
                ],
            },
            {
                sceneId: "reva5_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The game is no longer a game." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — Wanting to be Pursued
    // =========================================================================
    {
        id: "reva_chain_stage_6_accept",
        title: "Wanting to be Pursued",
        locationId: "ac_reva_suite",
        startingSceneId: "reva6_accept_scene1",
        scenes: [
            {
                sceneId: "reva6_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva is unusually quiet when Kenji arrives, her tails wrapped around her like a shawl." },
                    { speakerId: "REVA", text: "I've been thinking." },
                    { speakerId: "KENJI", text: "That's never good." },
                ],
            },
            {
                sceneId: "reva6_accept_scene2",
                lines: [
                    { speakerId: "REVA", text: "For once, I'm tired of chasing." },
                    { speakerId: "KENJI", text: "Then let me chase you." },
                ],
            },
            {
                sceneId: "reva6_accept_scene3",
                lines: [
                    { speakerId: "REVA", text: "You already have. And I hate how much I like it." },
                ],
            },
            {
                sceneId: "reva6_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks up at him, and there is no trace of the fox in her eyes." },
                    { speakerId: "REVA", text: "So what now?" },
                ],
            },
            {
                sceneId: "reva6_accept_scene5",
                lines: [
                    { speakerId: "KENJI", text: "Now I catch you." },
                ],
            },
        ],
    },
    {
        id: "reva_chain_stage_6_complete",
        title: "Caught",
        locationId: "ac_reva_suite",
        startingSceneId: "reva6_complete_scene1",
        scenes: [
            {
                sceneId: "reva6_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva doesn't move as Kenji steps into her space." },
                    { speakerId: "REVA", text: "You've won. Are you happy?" },
                ],
            },
            {
                sceneId: "reva6_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I wasn't playing to win." },
                    { speakerId: "REVA", text: "I know. That's why I'm still here." },
                ],
            },
            {
                sceneId: "reva6_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She reaches out, her fingers brushing his wrist." },
                    { speakerId: "REVA", text: "I've never been caught before. It's... new." },
                ],
            },
            {
                sceneId: "reva6_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Do you like it?" },
                    { speakerId: "REVA", text: "More than I should." },
                ],
            },
            {
                sceneId: "reva6_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She doesn't pull away." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — Complete Surrender
    // =========================================================================
    {
        id: "reva_chain_stage_7_accept",
        title: "Complete Surrender",
        locationId: "ac_reva_suite",
        startingSceneId: "reva7_accept_scene1",
        scenes: [
            {
                sceneId: "reva7_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Reva waits in the center of the suite, dressed simply, without her usual ornaments." },
                    { speakerId: "REVA", text: "I knew you'd come." },
                    { speakerId: "KENJI", text: "You make it impossible to stay away." },
                ],
            },
            {
                sceneId: "reva7_accept_scene2",
                lines: [
                    { speakerId: "REVA", text: "I'm done running. I'm done playing." },
                ],
            },
            {
                sceneId: "reva7_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She kneels, her tails fanning out behind her." },
                    { speakerId: "REVA", text: "I'm yours. If you'll have me." },
                ],
            },
            {
                sceneId: "reva7_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "What made you decide?" },
                    { speakerId: "REVA", text: "I finally found someone who saw all of me and didn't run." },
                ],
            },
            {
                sceneId: "reva7_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Her eyes meet his, no trace of the fox left." },
                ],
            },
        ],
    },
    {
        id: "reva_chain_stage_7_complete",
        title: "Yours",
        locationId: "ac_reva_suite",
        startingSceneId: "reva7_complete_scene1",
        scenes: [
            {
                sceneId: "reva7_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji takes her hand and helps her rise." },
                    { speakerId: "REVA", text: "Is this real?" },
                    { speakerId: "KENJI", text: "It's as real as we make it." },
                ],
            },
            {
                sceneId: "reva7_complete_scene2",
                lines: [
                    { speakerId: "REVA", text: "I've spent so long pretending, I almost forgot how to be myself." },
                    { speakerId: "KENJI", text: "Then let me help you remember." },
                ],
            },
            {
                sceneId: "reva7_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She smiles, and for the first time, it reaches her eyes." },
                ],
            },
            {
                sceneId: "reva7_complete_scene4",
                lines: [
                    { speakerId: "REVA", text: "I used to think love was another game to lose." },
                    { speakerId: "REVA", text: "But with you, it feels like winning." },
                ],
            },
            {
                sceneId: "reva7_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She leans into him, and the game finally ends." },
                ],
            },
        ],
    },

    // ============================================================================
    // TASHA — COMPANION QUEST CUTSCENES
    // ============================================================================
    // =========================================================================
    // STAGE 1 — ACCEPT: The Warm Hearth
    // =========================================================================
    {
        id: "tasha_chain_stage_1_accept",
        title: "A Hearth in Need",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s1_accept_scene1",
        scenes: [
            {
                sceneId: "tasha_s1_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The hearth is warm, but Tasha's expression is tired as she stirs a large pot alone." },
                    { speakerId: "TASHA", text: "Oh, Kenji... I didn't expect you again so soon.", expression: "surprised, then warm" },
                    { speakerId: "KENJI", text: "I told you I'd come back. You looked like you could use a hand." },
                ],
            },
            {
                sceneId: "tasha_s1_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "She glances around the quiet room, then back to him." },
                    { speakerId: "TASHA", text: "It's just... there's always so much to do. And no one to help." },
                    { speakerId: "NARRATOR", text: "Her voice is soft, not complaining, but heavy." },
                ],
            },
            {
                sceneId: "tasha_s1_accept_scene3",
                lines: [
                    { speakerId: "KENJI", text: "Then let me help now. Where do I start?" },
                ],
                choices: [
                    { choiceId: "tasha_s1_help_kind", text: "Smile and roll up your sleeves.", effects: { trustDelta: 2, loveDelta: 1 }, nextSceneId: "tasha_s1_accept_scene4" },
                    { choiceId: "tasha_s1_help_flirt", text: "Say the kitchen isn't the only thing that's warm.", effects: { trustDelta: 1, loveDelta: 2 }, nextSceneId: "tasha_s1_accept_scene4" },
                    { choiceId: "tasha_s1_help_reserved", text: "Just start working without words.", effects: { trustDelta: 1, loveDelta: 0 }, nextSceneId: "tasha_s1_accept_scene4" },
                ],
            },
            {
                sceneId: "tasha_s1_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "They work together in comfortable silence, the fire crackling between them." },
                    { speakerId: "TASHA", text: "It's been a long time since anyone stayed to help.", expression: "quietly grateful" },
                ],
            },
            {
                sceneId: "tasha_s1_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "As the evening settles, Tasha looks at Kenji with a warmth she hadn't shown before." },
                    { speakerId: "TASHA", text: "Thank you. Truly." },
                    { speakerId: "KENJI", text: "This is just the beginning." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 1 — COMPLETE: A Quiet Gratitude
    // =========================================================================
    {
        id: "tasha_chain_stage_1_complete",
        title: "A Quiet Gratitude",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s1_complete_scene1",
        scenes: [
            {
                sceneId: "tasha_s1_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The work is done. The house is tidier, and the meal is almost ready." },
                    { speakerId: "TASHA", text: "I don't know how to repay you. You've done more than I asked." },
                ],
            },
            {
                sceneId: "tasha_s1_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "No payment needed. Your company is enough." },
                    { speakerId: "NARRATOR", text: "Tasha blushes, looking down at her hands." },
                ],
            },
            {
                sceneId: "tasha_s1_complete_scene3",
                lines: [
                    { speakerId: "TASHA", text: "You're kind... but I can't help feeling I should give something back." },
                    { speakerId: "NARRATOR", text: "There is a pause, heavy with unspoken possibility." },
                ],
                choices: [
                    { choiceId: "tasha_s1_done_smile", text: "Say her smile is payment enough.", effects: { trustDelta: 2, loveDelta: 1 }, nextSceneId: "tasha_s1_complete_scene4" },
                    { choiceId: "tasha_s1_done_touch", text: "Touch her hand lightly.", effects: { trustDelta: 1, loveDelta: 2 }, nextSceneId: "tasha_s1_complete_scene4" },
                ],
            },
            {
                sceneId: "tasha_s1_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha's breath catches slightly, but she doesn't pull away." },
                    { speakerId: "TASHA", text: "I... I should finish the cooking." },
                ],
            },
            {
                sceneId: "tasha_s1_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "As Kenji leaves, Tasha watches him go, the loneliness creeping back into her chest." },
                    { speakerId: "TASHA", text: "Come back soon... please." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — ACCEPT: Unhappy Marriage
    // =========================================================================
    {
        id: "tasha_chain_stage_2_accept",
        title: "The Unspoken Weight",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s2_accept_scene1",
        scenes: [
            {
                sceneId: "tasha_s2_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha is quieter than before, her usual cheer dimmed." },
                    { speakerId: "KENJI", text: "Tasha, is something wrong?" },
                    { speakerId: "TASHA", text: "No, no... just tired." },
                ],
            },
            {
                sceneId: "tasha_s2_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "She avoids his eyes, and Kenji notices the faint tightening of her jaw." },
                    { speakerId: "KENJI", text: "You don't have to hide from me. I can see something is heavy." },
                ],
            },
            {
                sceneId: "tasha_s2_accept_scene3",
                lines: [
                    { speakerId: "TASHA", text: "It's nothing. Just... marriage is not what the stories make it seem." },
                ],
                choices: [
                    { choiceId: "tasha_s2_press", text: "Gently press her to talk.", effects: { trustDelta: 2, loveDelta: 1 }, nextSceneId: "tasha_s2_accept_scene4" },
                    { choiceId: "tasha_s2_listen", text: "Wait silently, letting her decide.", effects: { trustDelta: 3, loveDelta: 1 }, nextSceneId: "tasha_s2_accept_scene4" },
                    { choiceId: "tasha_s2_divert", text: "Change the subject to protect her.", effects: { trustDelta: 0, loveDelta: 0 }, nextSceneId: "tasha_s2_accept_scene4" },
                ],
            },
            {
                sceneId: "tasha_s2_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "For a moment, it seems she might open up, but then she shakes her head." },
                    { speakerId: "TASHA", text: "Maybe someday I'll tell you. Not now." },
                ],
            },
            {
                sceneId: "tasha_s2_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The weight remains, but the door has opened just a little." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 2 — COMPLETE: A Crack in the Wall
    // =========================================================================
    {
        id: "tasha_chain_stage_2_complete",
        title: "A Crack in the Wall",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s2_complete_scene1",
        scenes: [
            {
                sceneId: "tasha_s2_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Late in the evening, Tasha finally speaks, her voice barely above a whisper." },
                    { speakerId: "TASHA", text: "My husband... he's never home. And when he is, he doesn't see me." },
                ],
            },
            {
                sceneId: "tasha_s2_complete_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji listens in silence, letting her words fill the room." },
                    { speakerId: "TASHA", text: "I thought marriage would be warmth and safety. Instead, I'm just the woman who tends the fire." },
                ],
            },
            {
                sceneId: "tasha_s2_complete_scene3",
                lines: [
                    { speakerId: "KENJI", text: "You deserve more than that." },
                ],
                choices: [
                    { choiceId: "tasha_s2_complete_hold", text: "Place a hand over hers.", effects: { trustDelta: 3, loveDelta: 2 }, nextSceneId: "tasha_s2_complete_scene4" },
                    { choiceId: "tasha_s2_complete_words", text: "Tell her she is worth seeing.", effects: { trustDelta: 2, loveDelta: 3 }, nextSceneId: "tasha_s2_complete_scene4" },
                ],
            },
            {
                sceneId: "tasha_s2_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha looks at him with glistening eyes, something breaking free behind them." },
                    { speakerId: "TASHA", text: "No one has said that to me in years." },
                ],
            },
            {
                sceneId: "tasha_s2_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The crack in her wall widens, and for the first time, she allows herself to lean toward him." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — ACCEPT: Coercion Begins
    // =========================================================================
    {
        id: "tasha_chain_stage_3_accept",
        title: "A Dangerous Suggestion",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s3_accept_scene1",
        scenes: [
            {
                sceneId: "tasha_s3_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji finds Tasha alone again, her face drawn and tired." },
                    { speakerId: "TASHA", text: "I knew you'd come. You always do." },
                    { speakerId: "KENJI", text: "Because you need someone. Don't you?" },
                ],
            },
            {
                sceneId: "tasha_s3_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "His tone is soft, but there is a new edge beneath it." },
                    { speakerId: "TASHA", text: "I... I don't know what you mean." },
                ],
            },
            {
                sceneId: "tasha_s3_accept_scene3",
                lines: [
                    { speakerId: "KENJI", text: "You know exactly. The loneliness is eating you. Let me ease it." },
                ],
                choices: [
                    { choiceId: "tasha_s3_push", text: "Push her with words.", effects: { trustDelta: -1, loveDelta: 1 }, nextSceneId: "tasha_s3_accept_scene4" },
                    { choiceId: "tasha_s3_gentle_force", text: "Step closer, making the air charge.", effects: { trustDelta: 1, loveDelta: 2 }, nextSceneId: "tasha_s3_accept_scene4" },
                ],
            },
            {
                sceneId: "tasha_s3_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha's breath quickens, but she doesn't retreat." },
                    { speakerId: "TASHA", text: "This... this is wrong. But I don't want you to stop." },
                ],
            },
            {
                sceneId: "tasha_s3_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The tension between them shifts into something darker and more intimate." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 3 — COMPLETE: A Secret Promise
    // =========================================================================
    {
        id: "tasha_chain_stage_3_complete",
        title: "A Secret Promise",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s3_complete_scene1",
        scenes: [
            {
                sceneId: "tasha_s3_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha stands by the window, her fingers trembling." },
                    { speakerId: "TASHA", text: "If I say yes... what does that make me?" },
                    { speakerId: "KENJI", text: "It makes you a woman who finally takes what she needs." },
                ],
            },
            {
                sceneId: "tasha_s3_complete_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "She closes her eyes, and when she opens them, there is a new resolve." },
                    { speakerId: "TASHA", text: "Then meet me tonight. Please." },
                ],
            },
            {
                sceneId: "tasha_s3_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The promise hangs in the air, dangerous and sweet." },
                ],
                choices: [
                    { choiceId: "tasha_s3_done_accept", text: "Agree without hesitation.", effects: { trustDelta: 2, loveDelta: 3 }, nextSceneId: "tasha_s3_complete_scene4" },
                    { choiceId: "tasha_s3_done_tease", text: "Make her say it again.", effects: { trustDelta: 1, loveDelta: 4 }, nextSceneId: "tasha_s3_complete_scene4" },
                ],
            },
            {
                sceneId: "tasha_s3_complete_scene4",
                lines: [
                    { speakerId: "TASHA", text: "Tonight... after dark. I'll leave the back door open." },
                ],
            },
            {
                sceneId: "tasha_s3_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji leaves, knowing that the first true step into Tasha's hidden life has been taken." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — ACCEPT: Secret Meeting
    // =========================================================================
    {
        id: "tasha_chain_stage_4_accept",
        title: "The Hidden Hour",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s4_accept_scene1",
        scenes: [
            {
                sceneId: "tasha_s4_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Night has fallen, and the village is still. Kenji moves silently toward Tasha's home." },
                    { speakerId: "NARRATOR", text: "The back door is ajar, just as she promised." },
                ],
            },
            {
                sceneId: "tasha_s4_accept_scene2",
                lines: [
                    { speakerId: "TASHA", text: "I wasn't sure you'd come." },
                    { speakerId: "KENJI", text: "I told you I would." },
                ],
            },
            {
                sceneId: "tasha_s4_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The house is dark, only a single candle lit. Tasha's face is half in shadow." },
                    { speakerId: "TASHA", text: "I feel like a stranger in my own home. But with you... I feel awake." },
                ],
            },
            {
                sceneId: "tasha_s4_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Then let me keep you awake." },
                ],
                choices: [
                    { choiceId: "tasha_s4_touch", text: "Reach out and brush her cheek.", effects: { trustDelta: 2, loveDelta: 3 }, nextSceneId: "tasha_s4_accept_scene5" },
                    { choiceId: "tasha_s4_whisper", text: "Whisper something intimate.", effects: { trustDelta: 2, loveDelta: 4 }, nextSceneId: "tasha_s4_accept_scene5" },
                ],
            },
            {
                sceneId: "tasha_s4_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha shivers, the air between them thick with unspoken longing." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 4 — COMPLETE: Closer Than Before
    // =========================================================================
    {
        id: "tasha_chain_stage_4_complete",
        title: "Closer Than Before",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s4_complete_scene1",
        scenes: [
            {
                sceneId: "tasha_s4_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "In the dim candlelight, Tasha and Kenji stand close, their breaths mingling." },
                    { speakerId: "TASHA", text: "I shouldn't want this... but I do." },
                ],
            },
            {
                sceneId: "tasha_s4_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Wanting isn't wrong." },
                    { speakerId: "NARRATOR", text: "He cups her face, and she leans into his touch." },
                ],
            },
            {
                sceneId: "tasha_s4_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The kiss that follows is hesitant at first, then deepens into need." },
                ],
                choices: [
                    { choiceId: "tasha_s4_kiss_soft", text: "Kiss her gently.", effects: { trustDelta: 3, loveDelta: 5 }, nextSceneId: "tasha_s4_complete_scene4" },
                    { choiceId: "tasha_s4_kiss_deep", text: "Deepen the kiss with hunger.", effects: { trustDelta: 2, loveDelta: 6 }, nextSceneId: "tasha_s4_complete_scene4" },
                ],
            },
            {
                sceneId: "tasha_s4_complete_scene4",
                lines: [
                    { speakerId: "TASHA", text: "We can't... not here. Not now." },
                ],
            },
            {
                sceneId: "tasha_s4_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Reluctantly, they part, but the promise of more lingers in the dark." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — ACCEPT: Looking Forward
    // =========================================================================
    {
        id: "tasha_chain_stage_5_accept",
        title: "The Waiting Heart",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s5_accept_scene1",
        scenes: [
            {
                sceneId: "tasha_s5_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha is waiting at the door before Kenji even knocks." },
                    { speakerId: "TASHA", text: "I was hoping you'd come." },
                    { speakerId: "KENJI", text: "You're starting to look forward to me." },
                ],
            },
            {
                sceneId: "tasha_s5_accept_scene2",
                lines: [
                    { speakerId: "TASHA", text: "Is that so bad? To want something for myself?" },
                    { speakerId: "NARRATOR", text: "She looks at him directly now, no longer hiding." },
                ],
            },
            {
                sceneId: "tasha_s5_accept_scene3",
                lines: [
                    { speakerId: "KENJI", text: "No. It's exactly what you should do." },
                ],
                choices: [
                    { choiceId: "tasha_s5_encourage", text: "Encourage her growing desire.", effects: { trustDelta: 3, loveDelta: 4 }, nextSceneId: "tasha_s5_accept_scene4" },
                    { choiceId: "tasha_s5_take", text: "Pull her close possessively.", effects: { trustDelta: 2, loveDelta: 5 }, nextSceneId: "tasha_s5_accept_scene4" },
                ],
            },
            {
                sceneId: "tasha_s5_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha melts into him, the tension of weeks dissolving." },
                ],
            },
            {
                sceneId: "tasha_s5_accept_scene5",
                lines: [
                    { speakerId: "TASHA", text: "Don't leave me waiting too long." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 5 — COMPLETE: The Growing Need
    // =========================================================================
    {
        id: "tasha_chain_stage_5_complete",
        title: "The Growing Need",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s5_complete_scene1",
        scenes: [
            {
                sceneId: "tasha_s5_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha is more open now, touching Kenji's arm as she speaks." },
                    { speakerId: "TASHA", text: "I think about you when you're gone." },
                ],
            },
            {
                sceneId: "tasha_s5_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Tell me what you think about." },
                    { speakerId: "NARRATOR", text: "Her cheeks flush, but she answers." },
                ],
            },
            {
                sceneId: "tasha_s5_complete_scene3",
                lines: [
                    { speakerId: "TASHA", text: "Your hands... your mouth... the way you look at me." },
                ],
                choices: [
                    { choiceId: "tasha_s5_listen", text: "Listen, letting her voice fill the space.", effects: { trustDelta: 3, loveDelta: 5 }, nextSceneId: "tasha_s5_complete_scene4" },
                    { choiceId: "tasha_s5_tease", text: "Make her say more.", effects: { trustDelta: 2, loveDelta: 6 }, nextSceneId: "tasha_s5_complete_scene4" },
                ],
            },
            {
                sceneId: "tasha_s5_complete_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The room grows warm with her confession." },
                ],
            },
            {
                sceneId: "tasha_s5_complete_scene5",
                lines: [
                    { speakerId: "TASHA", text: "I want more of you. All of you." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — ACCEPT: Forbidden Desire
    // =========================================================================
    {
        id: "tasha_chain_stage_6_accept",
        title: "The Point of No Return",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s6_accept_scene1",
        scenes: [
            {
                sceneId: "tasha_s6_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha's hands are shaking as she leads Kenji to the bedroom." },
                    { speakerId: "TASHA", text: "If I do this... I can't go back." },
                    { speakerId: "KENJI", text: "Do you want to go back?" },
                ],
            },
            {
                sceneId: "tasha_s6_accept_scene2",
                lines: [
                    { speakerId: "TASHA", text: "No. I want you." },
                    { speakerId: "NARRATOR", text: "The words sound like a vow." },
                ],
            },
            {
                sceneId: "tasha_s6_accept_scene3",
                lines: [
                    { speakerId: "KENJI", text: "Then come here." },
                ],
                choices: [
                    { choiceId: "tasha_s6_gentle", text: "Undress her slowly.", effects: { trustDelta: 4, loveDelta: 6 }, nextSceneId: "tasha_s6_accept_scene4" },
                    { choiceId: "tasha_s6_rough", text: "Push her onto the bed with urgency.", effects: { trustDelta: 3, loveDelta: 7 }, nextSceneId: "tasha_s6_accept_scene4" },
                ],
            },
            {
                sceneId: "tasha_s6_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "The final barrier between them crumbles." },
                ],
            },
            {
                sceneId: "tasha_s6_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha surrenders completely, and Kenji takes what she offers." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 6 — COMPLETE: The Fall
    // =========================================================================
    {
        id: "tasha_chain_stage_6_complete",
        title: "The Fall",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s6_complete_scene1",
        scenes: [
            {
                sceneId: "tasha_s6_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "They lie tangled together, breathless and slick." },
                    { speakerId: "TASHA", text: "I've never... like that..." },
                ],
            },
            {
                sceneId: "tasha_s6_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "And you never will again." },
                    { speakerId: "NARRATOR", text: "Tasha clings to him, her heart hammering." },
                ],
            },
            {
                sceneId: "tasha_s6_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "There is no guilt in her eyes, only a new, raw need." },
                ],
                choices: [
                    { choiceId: "tasha_s6_hold", text: "Hold her close.", effects: { trustDelta: 5, loveDelta: 7 }, nextSceneId: "tasha_s6_complete_scene4" },
                    { choiceId: "tasha_s6_leave", text: "Start to dress, keeping the power.", effects: { trustDelta: -1, loveDelta: 3 }, nextSceneId: "tasha_s6_complete_scene4" },
                ],
            },
            {
                sceneId: "tasha_s6_complete_scene4",
                lines: [
                    { speakerId: "TASHA", text: "Don't go yet. Stay with me." },
                ],
            },
            {
                sceneId: "tasha_s6_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji stays, and Tasha's fall is complete." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — ACCEPT: A New Life
    // =========================================================================
    {
        id: "tasha_chain_stage_7_accept",
        title: "Breaking Free",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s7_accept_scene1",
        scenes: [
            {
                sceneId: "tasha_s7_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha stands before Kenji, a small bag packed at her feet." },
                    { speakerId: "TASHA", text: "I'm ready. I don't want to live this lie anymore." },
                    { speakerId: "KENJI", text: "Then leave it all behind." },
                ],
            },
            {
                sceneId: "tasha_s7_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks around the house, then back at him." },
                    { speakerId: "TASHA", text: "I choose you. Not this house. Not him." },
                ],
            },
            {
                sceneId: "tasha_s7_accept_scene3",
                lines: [
                    { speakerId: "KENJI", text: "Let's go then." },
                ],
                choices: [
                    { choiceId: "tasha_s7_take_hand", text: "Take her hand.", effects: { trustDelta: 5, loveDelta: 8 }, nextSceneId: "tasha_s7_accept_scene4" },
                    { choiceId: "tasha_s7_lift_bag", text: "Pick up her bag.", effects: { trustDelta: 4, loveDelta: 8 }, nextSceneId: "tasha_s7_accept_scene4" },
                ],
            },
            {
                sceneId: "tasha_s7_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Together, they step out into the night, leaving the old life behind." },
                ],
            },
            {
                sceneId: "tasha_s7_accept_scene5",
                lines: [
                    { speakerId: "TASHA", text: "I'm yours now. Completely." },
                ],
            },
        ],
    },

    // =========================================================================
    // STAGE 7 — COMPLETE: The New Beginning
    // =========================================================================
    {
        id: "tasha_chain_stage_7_complete",
        title: "The New Beginning",
        locationId: "vv_tasha_hearth",
        startingSceneId: "tasha_s7_complete_scene1",
        scenes: [
            {
                sceneId: "tasha_s7_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha doesn't look back. The old world is gone." },
                    { speakerId: "TASHA", text: "I feel... free. And afraid." },
                ],
            },
            {
                sceneId: "tasha_s7_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "You're not alone." },
                    { speakerId: "NARRATOR", text: "She squeezes his hand, grounding herself in the promise." },
                ],
            },
            {
                sceneId: "tasha_s7_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The road ahead is uncertain, but for the first time, Tasha's heart is sure." },
                ],
                choices: [
                    { choiceId: "tasha_s7_kiss", text: "Kiss her under the stars.", effects: { trustDelta: 6, loveDelta: 10 }, nextSceneId: "tasha_s7_complete_scene4" },
                    { choiceId: "tasha_s7_promise", text: "Promise her a better life.", effects: { trustDelta: 7, loveDelta: 9 }, nextSceneId: "tasha_s7_complete_scene4" },
                ],
            },
            {
                sceneId: "tasha_s7_complete_scene4",
                lines: [
                    { speakerId: "TASHA", text: "Whatever comes, I'll face it with you." },
                ],
            },
            {
                sceneId: "tasha_s7_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Tasha has been reborn, not as a neglected wife, but as the companion of the Crest-bearer." },
                ],
            },
        ],
    },
    // ============================================================================
    // SERA VOID — COMPANION CUTSCENES
    // ============================================================================
    // -------------------------------------------------------------------------
    // Stage 1 — Accept: Judgment
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_1_accept",
        title: "Judgment",
        locationId: "ac_auric_court",
        startingSceneId: "sera1_accept_scene1",
        scenes: [
            {
                sceneId: "sera1_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera Void stands like a blade among silk-clad nobles, her eyes fixed on Kenji." },
                    { speakerId: "SERA", text: "You carry the Crest of Ardor. I was told you would come." },
                    { speakerId: "KENJI", text: "And you are?" },
                    { speakerId: "SERA", text: "Someone sent to decide if you are savior or heretic.", expression: "unreadable" },
                ],
            },
            {
                sceneId: "sera1_accept_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "Her hand rests on a sword hilt, but her eyes hold a flicker of doubt." },
                    { speakerId: "SERA", text: "The monastery has watched you for some time. They believe you may be the one to end the corruption." },
                ],
                choices: [
                    { choiceId: "sera1_accept_ask", text: "Ask what she believes.", effects: { trustDelta: 2, loveDelta: 0 }, nextSceneId: "sera1_accept_scene3" },
                    { choiceId: "sera1_accept_assert", text: "Say you are not here to be judged.", effects: { trustDelta: 1, loveDelta: 0 }, nextSceneId: "sera1_accept_scene3" },
                ],
            },
            {
                sceneId: "sera1_accept_scene3",
                lines: [
                    { speakerId: "SERA", text: "I believe actions reveal truth. So I will test you." },
                    { speakerId: "NARRATOR", text: "She turns, robes flowing like white water, and begins to walk." },
                ],
            },
            {
                sceneId: "sera1_accept_scene4",
                lines: [
                    { speakerId: "SERA", text: "There are cultists in the outskirts. They poison the land and the mind." },
                    { speakerId: "KENJI", text: "Then I will remove them." },
                ],
            },
            {
                sceneId: "sera1_accept_scene5",
                lines: [
                    { speakerId: "SERA", text: "Do so, and I may begin to believe you are what they hope." },
                    { speakerId: "NARRATOR", text: "Her gaze lingers, then she walks away, leaving Kenji with a cold challenge." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 1 — Complete: Aftermath
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_1_complete",
        title: "A Test Passed",
        locationId: "ac_auric_court",
        startingSceneId: "sera1_complete_scene1",
        scenes: [
            {
                sceneId: "sera1_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji returns to find Sera waiting near the court's edge, her expression unreadable." },
                    { speakerId: "SERA", text: "You survived. And the corruption lessens. Impressive." },
                ],
            },
            {
                sceneId: "sera1_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "It wasn't just me. But I did what was needed." },
                    { speakerId: "SERA", text: "Modesty is acceptable. It is not a sin." },
                ],
            },
            {
                sceneId: "sera1_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She steps closer, the distance between them shrinking for the first time." },
                    { speakerId: "SERA", text: "Perhaps you are not the heretic I feared." },
                ],
            },
            {
                sceneId: "sera1_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I'll take that as a compliment." },
                    { speakerId: "SERA", text: "Take it however you wish. I will be watching." },
                ],
            },
            {
                sceneId: "sera1_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "As she leaves, Kenji notices her shoulders seem less rigid, as if a small weight has lifted." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 2 — Accept: Proving Purity
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_2_accept",
        title: "Proving Purity",
        locationId: "ac_auric_court",
        startingSceneId: "sera2_accept_scene1",
        scenes: [
            {
                sceneId: "sera2_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera stands by a marble pillar, her white robes spotless despite the city's filth." },
                    { speakerId: "SERA", text: "You did well, but words can be false. I require proof of your purity." },
                ],
            },
            {
                sceneId: "sera2_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "What would you have me do?" },
                    { speakerId: "SERA", text: "Fight the corruption where it festers. Only a pure weapon can cut it cleanly." },
                ],
            },
            {
                sceneId: "sera2_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She hands him a small, blessed talisman." },
                    { speakerId: "SERA", text: "Wear this. It will not protect you, but it will reveal any taint you carry." },
                ],
            },
            {
                sceneId: "sera2_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Then I'll come back clean, or not at all." },
                    { speakerId: "SERA", text: "That is the only acceptable answer." },
                ],
            },
            {
                sceneId: "sera2_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Her eyes follow him as he departs, sharper than any blade." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 2 — Complete: Aftermath
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_2_complete",
        title: "The Talisman Glows",
        locationId: "ac_auric_court",
        startingSceneId: "sera2_complete_scene1",
        scenes: [
            {
                sceneId: "sera2_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera meets Kenji at the shrine, her gaze dropping to the talisman." },
                    { speakerId: "SERA", text: "It is clean. The corruption did not touch you." },
                ],
            },
            {
                sceneId: "sera2_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "I told you I'm not the enemy." },
                    { speakerId: "SERA", text: "I know. But I had to be certain." },
                ],
            },
            {
                sceneId: "sera2_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "For a moment, something soft passes through her expression before it hardens again." },
                    { speakerId: "SERA", text: "The monastery will be pleased. But I am not easily impressed." },
                ],
            },
            {
                sceneId: "sera2_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Then I'll keep working until you are." },
                    { speakerId: "SERA", text: "You may try." },
                ],
            },
            {
                sceneId: "sera2_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns, but not before Kenji catches the faintest upward twitch of her lips." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 3 — Accept: Doubting Vows
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_3_accept",
        title: "Doubting Vows",
        locationId: "ac_auric_court",
        startingSceneId: "sera3_accept_scene1",
        scenes: [
            {
                sceneId: "sera3_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera is alone in a small courtyard, staring at a statue of a saint." },
                    { speakerId: "SERA", text: "You come to me again. Is it duty, or something else?" },
                ],
            },
            {
                sceneId: "sera3_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Maybe both." },
                    { speakerId: "SERA", text: "Honesty. A rare virtue." },
                ],
            },
            {
                sceneId: "sera3_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns to face him, and her usually steady voice wavers." },
                    { speakerId: "SERA", text: "I have kept my vows for years, yet you make me question if they are chains, not wings." },
                ],
            },
            {
                sceneId: "sera3_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Maybe they can be both." },
                    { speakerId: "SERA", text: "That is not an answer I can accept." },
                ],
            },
            {
                sceneId: "sera3_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She steps closer, close enough that Kenji can see the fatigue behind her eyes." },
                    { speakerId: "SERA", text: "Fight alongside me again. Perhaps then I will understand." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 3 — Complete: Aftermath
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_3_complete",
        title: "A Crack in the Vow",
        locationId: "ac_shrine",
        startingSceneId: "sera3_complete_scene1",
        scenes: [
            {
                sceneId: "sera3_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "After the battle, Sera kneels at the shrine, her head bowed." },
                    { speakerId: "SERA", text: "I felt something during that fight. Not holy. Something dangerous." },
                ],
            },
            {
                sceneId: "sera3_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "What did you feel?" },
                    { speakerId: "SERA", text: "I am not sure I can name it. But it frightened me." },
                ],
            },
            {
                sceneId: "sera3_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks up at him, and for the first time, she seems lost." },
                    { speakerId: "SERA", text: "What have you done to me?" },
                ],
            },
            {
                sceneId: "sera3_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I didn't do anything. Maybe you're finally feeling." },
                    { speakerId: "SERA", text: "Feeling is weakness. At least, that is what I was taught." },
                ],
            },
            {
                sceneId: "sera3_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She rises slowly, her steps uncertain for the first time." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 4 — Accept: Hidden Sensitivity
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_4_accept",
        title: "Hidden Sensitivity",
        locationId: "ac_auric_court",
        startingSceneId: "sera4_accept_scene1",
        scenes: [
            {
                sceneId: "sera4_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji finds Sera in a private chamber, her armor removed, leaving only simple white cloth." },
                    { speakerId: "SERA", text: "You should not be here." },
                ],
            },
            {
                sceneId: "sera4_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "You didn't stop me." },
                    { speakerId: "SERA", text: "I am... distracted." },
                ],
            },
            {
                sceneId: "sera4_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns away, but Kenji sees her shoulders tremble." },
                    { speakerId: "SERA", text: "There is a task I must ask of you. It requires trust." },
                ],
            },
            {
                sceneId: "sera4_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Then trust me." },
                    { speakerId: "SERA", text: "I am trying. That is what frightens me." },
                ],
            },
            {
                sceneId: "sera4_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She finally faces him, her eyes shining with unshed tears." },
                    { speakerId: "SERA", text: "Help me. I cannot fight this alone." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 4 — Complete: Aftermath
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_4_complete",
        title: "Exposed",
        locationId: "ac_shrine",
        startingSceneId: "sera4_complete_scene1",
        scenes: [
            {
                sceneId: "sera4_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera sits at the shrine, her composure shattered." },
                    { speakerId: "SERA", text: "You saw me at my weakest. I should be ashamed." },
                ],
            },
            {
                sceneId: "sera4_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "There's no shame in being human." },
                    { speakerId: "SERA", text: "I am not supposed to be human. I am a vessel." },
                ],
            },
            {
                sceneId: "sera4_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "He kneels beside her, and she does not pull away." },
                    { speakerId: "SERA", text: "Why do you stay?" },
                ],
            },
            {
                sceneId: "sera4_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Because I think you want me to." },
                    { speakerId: "SERA", text: "I do. And I hate that I do." },
                ],
            },
            {
                sceneId: "sera4_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Her hand reaches for his, trembling, and then holds on tightly." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 5 — Accept: Breaking Discipline
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_5_accept",
        title: "Breaking Discipline",
        locationId: "ac_shrine",
        startingSceneId: "sera5_accept_scene1",
        scenes: [
            {
                sceneId: "sera5_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera stands before the altar, her voice barely above a whisper." },
                    { speakerId: "SERA", text: "I have denied my body for so long that I no longer know if it belongs to me." },
                ],
            },
            {
                sceneId: "sera5_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Then let me help you reclaim it." },
                    { speakerId: "SERA", text: "You speak of pleasure. That is a sin." },
                ],
            },
            {
                sceneId: "sera5_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji steps close, and she does not retreat." },
                    { speakerId: "SERA", text: "If you do this, there is no going back." },
                ],
            },
            {
                sceneId: "sera5_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "I know." },
                    { speakerId: "SERA", text: "Then... I am ready to fall." },
                ],
            },
            {
                sceneId: "sera5_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The air between them grows heavy with forbidden promise." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 5 — Complete: Aftermath
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_5_complete",
        title: "The First Taste",
        locationId: "ac_shrine",
        startingSceneId: "sera5_complete_scene1",
        scenes: [
            {
                sceneId: "sera5_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera lies on the cold stone floor, her breath ragged." },
                    { speakerId: "SERA", text: "What have you done to me...?" },
                ],
            },
            {
                sceneId: "sera5_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Only what you asked for." },
                    { speakerId: "SERA", text: "I asked for weakness. You gave me something far more terrifying." },
                ],
            },
            {
                sceneId: "sera5_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She turns her face away, but her body still trembles with aftershocks." },
                    { speakerId: "SERA", text: "I cannot go back to who I was." },
                ],
            },
            {
                sceneId: "sera5_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Maybe you were never meant to." },
                    { speakerId: "SERA", text: "Then what am I now?" },
                ],
            },
            {
                sceneId: "sera5_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks up at him, eyes empty of discipline but full of need." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 6 — Accept: Mind Break
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_6_accept",
        title: "The Fall",
        locationId: "ac_shrine",
        startingSceneId: "sera6_accept_scene1",
        scenes: [
            {
                sceneId: "sera6_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera kneels before the altar, but there is no prayer in her eyes." },
                    { speakerId: "SERA", text: "I have broken my vows. There is nothing left but you." },
                ],
            },
            {
                sceneId: "sera6_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "That's not true. There's still you." },
                    { speakerId: "SERA", text: "I don't know who that is anymore." },
                ],
            },
            {
                sceneId: "sera6_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She reaches for him, not as a warrior, but as a supplicant." },
                    { speakerId: "SERA", text: "Finish what you started. Make me forget everything but you." },
                ],
            },
            {
                sceneId: "sera6_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "This will break you." },
                    { speakerId: "SERA", text: "I am already broken." },
                ],
            },
            {
                sceneId: "sera6_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The shrine is silent, save for the sound of her surrender." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 6 — Complete: Aftermath
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_6_complete",
        title: "Mind Broken",
        locationId: "ac_shrine",
        startingSceneId: "sera6_complete_scene1",
        scenes: [
            {
                sceneId: "sera6_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera lies motionless, her eyes open but unseeing." },
                    { speakerId: "SERA", text: "I feel... nothing. And everything." },
                ],
            },
            {
                sceneId: "sera6_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Do you know who you are?" },
                    { speakerId: "SERA", text: "I am yours. Nothing else matters." },
                ],
            },
            {
                sceneId: "sera6_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She smiles, but it is a hollow thing, like a doll's." },
                    { speakerId: "SERA", text: "Tell me what to do. I will do it." },
                ],
            },
            {
                sceneId: "sera6_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "For now, rest." },
                    { speakerId: "SERA", text: "As you command." },
                ],
            },
            {
                sceneId: "sera6_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She closes her eyes, her body finally still, as if waiting for the next order." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 7 — Accept: Reconstruction
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_7_accept",
        title: "Rebuilding",
        locationId: "ac_shrine",
        startingSceneId: "sera7_accept_scene1",
        scenes: [
            {
                sceneId: "sera7_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera follows Kenji like a shadow, her steps soft and obedient." },
                    { speakerId: "SERA", text: "What is your command today?" },
                ],
            },
            {
                sceneId: "sera7_accept_scene2",
                lines: [
                    { speakerId: "KENJI", text: "Today, I want you to make a choice for yourself." },
                    { speakerId: "SERA", text: "Choice? I don't understand." },
                ],
            },
            {
                sceneId: "sera7_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks genuinely confused, as if the concept had been erased." },
                    { speakerId: "SERA", text: "I only know how to follow." },
                ],
            },
            {
                sceneId: "sera7_accept_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Then learn again. I'll help you." },
                    { speakerId: "SERA", text: "Will it please you?" },
                ],
            },
            {
                sceneId: "sera7_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "He takes her hand, and together they leave the shrine." },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // Stage 7 — Complete: Aftermath
    // -------------------------------------------------------------------------
    {
        id: "sera_chain_stage_7_complete",
        title: "Devoted Servant",
        locationId: "ac_shrine",
        startingSceneId: "sera7_complete_scene1",
        scenes: [
            {
                sceneId: "sera7_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Sera kneels before Kenji, but this time there is no fear in her posture." },
                    { speakerId: "SERA", text: "I understand now. You did not break me to destroy me, but to remake me." },
                ],
            },
            {
                sceneId: "sera7_complete_scene2",
                lines: [
                    { speakerId: "KENJI", text: "And what are you now?" },
                    { speakerId: "SERA", text: "Yours. Willingly and completely." },
                ],
            },
            {
                sceneId: "sera7_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Her eyes are clear, her voice steady, and for the first time, there is peace." },
                    { speakerId: "SERA", text: "I will follow you anywhere. Not as a slave, but as your chosen." },
                ],
            },
            {
                sceneId: "sera7_complete_scene4",
                lines: [
                    { speakerId: "KENJI", text: "Then rise, Sera. Walk beside me." },
                    { speakerId: "SERA", text: "Yes... my Kenji." },
                ],
            },
            {
                sceneId: "sera7_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "She rises, takes his arm, and together they step into the light." },
                ],
            },
        ],
    },
    // ============================================================================
    // LYRA FALLEN — COMPANION QUEST CUTSCENES
    // ============================================================================
    // Companion: Lyra Fallen
    // Archetype: Fallen Valkyrie
    // Conquest Path: Domination Loss & Corruption (Sensual)
    // ============================================================================
    // --------------------------------------------------------------------------
    // STAGE 1 — ACCEPT
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_1_accept",
        title: "The Fallen's Summons",
        locationId: "ct_threshold_gate",
        startingSceneId: "lyra_s1_accept_scene1",
        scenes: [
            {
                sceneId: "lyra_s1_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "A strange light flickers over the Threshold Gate, and a single white feather drifts down to Kenji's feet." },
                    { speakerId: "KENJI", text: "A feather? Here?" },
                    { speakerId: "NARRATOR", text: "The feather glows faintly, and a voice like wind carries through the air." },
                ],
            },
            {
                sceneId: "lyra_s1_accept_scene2",
                lines: [
                    { speakerId: "LYRA", text: "Crest-bearer... if you seek my aid, come to the sanctum beyond the gate." },
                    { speakerId: "KENJI", text: "Lyra? You want to meet me?" },
                    { speakerId: "LYRA", text: "I do not want. I merely offer a chance." },
                ],
            },
            {
                sceneId: "lyra_s1_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The voice fades, leaving Kenji alone with the feather and a choice." },
                ],
                choices: [
                    { choiceId: "lyra_s1_accept_go", text: "Follow the summons immediately.", effects: { trustDelta: 2, loveDelta: 1 }, nextSceneId: "lyra_s1_accept_scene4" },
                    { choiceId: "lyra_s1_accept_cautious", text: "Proceed carefully; this could be a trap.", effects: { trustDelta: 0, loveDelta: 0 }, nextSceneId: "lyra_s1_accept_scene4" },
                ],
            },
            {
                sceneId: "lyra_s1_accept_scene4",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji sets off toward the Celestial Threshold, the feather still glowing faintly in his hand." },
                ],
            },
            {
                sceneId: "lyra_s1_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Beyond the gate, the sky shimmers with an impossible light, and a distant sanctum waits." },
                    { speakerId: "KENJI", text: "I'll find her." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 1 — COMPLETE
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_1_complete",
        title: "The Meeting at the Sanctum",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_s1_complete_scene1",
        scenes: [
            {
                sceneId: "lyra_s1_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Lyra Fallen stands at the edge of her sanctum, wings folded against a grief-struck sky." },
                    { speakerId: "LYRA", text: "You came. I did not expect that." },
                    { speakerId: "KENJI", text: "You offered a chance. I took it." },
                ],
            },
            {
                sceneId: "lyra_s1_complete_scene2",
                lines: [
                    { speakerId: "LYRA", text: "Then listen. The corruption here is not like the other regions. It is older, and it hungers for the Crest." },
                    { speakerId: "KENJI", text: "Then I'll destroy it." },
                ],
            },
            {
                sceneId: "lyra_s1_complete_scene3",
                lines: [
                    { speakerId: "LYRA", text: "You speak as if destruction will heal everything. It will not." },
                    { speakerId: "NARRATOR", text: "Her eyes hold both sorrow and warning." },
                ],
                choices: [
                    { choiceId: "lyra_s1_complete_resolute", text: "Say you'll heal what you can.", effects: { trustDelta: 3, loveDelta: 2 }, nextSceneId: "lyra_s1_complete_scene4" },
                    { choiceId: "lyra_s1_complete_force", text: "Say you'll destroy everything in your way.", effects: { trustDelta: 1, loveDelta: 0 }, nextSceneId: "lyra_s1_complete_scene4" },
                ],
            },
            {
                sceneId: "lyra_s1_complete_scene4",
                lines: [
                    { speakerId: "LYRA", text: "Perhaps you are the one I was told about." },
                    { speakerId: "NARRATOR", text: "For the first time, a sliver of hope crosses her face." },
                ],
            },
            {
                sceneId: "lyra_s1_complete_scene5",
                lines: [
                    { speakerId: "LYRA", text: "Rest now. Your battle is only beginning." },
                    { speakerId: "NARRATOR", text: "The sanctum quiets, and Kenji feels the weight of the road ahead." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 2 — ACCEPT
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_2_accept",
        title: "The Confession",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_s2_accept_scene1",
        scenes: [
            {
                sceneId: "lyra_s2_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Lyra stands with her back to Kenji, wings quivering slightly." },
                    { speakerId: "KENJI", text: "You wanted to tell me something." },
                    { speakerId: "LYRA", text: "I wanted to know if you would listen." },
                ],
            },
            {
                sceneId: "lyra_s2_accept_scene2",
                lines: [
                    { speakerId: "LYRA", text: "I was cast out for compassion. They called it weakness." },
                    { speakerId: "KENJI", text: "Compassion is never weakness." },
                ],
            },
            {
                sceneId: "lyra_s2_accept_scene3",
                lines: [
                    { speakerId: "LYRA", text: "It cost me everything. My wings, my rank, my place among the heavens." },
                    { speakerId: "NARRATOR", text: "Her voice cracks, but she does not turn." },
                ],
                choices: [
                    { choiceId: "lyra_s2_accept_gently", text: "Gently ask what happened.", effects: { trustDelta: 4, loveDelta: 3 }, nextSceneId: "lyra_s2_accept_scene4" },
                    { choiceId: "lyra_s2_accept_press", text: "Press her to tell the full truth.", effects: { trustDelta: 1, loveDelta: 0 }, nextSceneId: "lyra_s2_accept_scene4" },
                ],
            },
            {
                sceneId: "lyra_s2_accept_scene4",
                lines: [
                    { speakerId: "LYRA", text: "I saved a mortal. That was my sin." },
                    { speakerId: "KENJI", text: "Then your only sin was love." },
                ],
            },
            {
                sceneId: "lyra_s2_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Lyra finally turns, and for the first time, Kenji sees the tears she hides." },
                    { speakerId: "LYRA", text: "Help me remember what that love felt like." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 2 — COMPLETE
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_2_complete",
        title: "The Weight of Guilt",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_s2_complete_scene1",
        scenes: [
            {
                sceneId: "lyra_s2_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The conversation leaves a fragile silence between them." },
                    { speakerId: "LYRA", text: "You did not turn away. Why?" },
                    { speakerId: "KENJI", text: "Because you needed someone to stay." },
                ],
            },
            {
                sceneId: "lyra_s2_complete_scene2",
                lines: [
                    { speakerId: "LYRA", text: "I have punished myself for so long... I forgot what it felt like to be seen." },
                ],
            },
            {
                sceneId: "lyra_s2_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Her wings slowly unfold, as if releasing a breath held for centuries." },
                ],
                choices: [
                    { choiceId: "lyra_s2_complete_hold", text: "Reach out and touch her wing.", effects: { trustDelta: 3, loveDelta: 4 }, nextSceneId: "lyra_s2_complete_scene4" },
                    { choiceId: "lyra_s2_complete_wait", text: "Give her space and wait.", effects: { trustDelta: 2, loveDelta: 2 }, nextSceneId: "lyra_s2_complete_scene4" },
                ],
            },
            {
                sceneId: "lyra_s2_complete_scene4",
                lines: [
                    { speakerId: "LYRA", text: "Thank you... for not leaving." },
                ],
            },
            {
                sceneId: "lyra_s2_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The weight on her shoulders seems a little lighter." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 3 — ACCEPT
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_3_accept",
        title: "The Trial",
        locationId: "ct_ascension_path",
        startingSceneId: "lyra_s3_accept_scene1",
        scenes: [
            {
                sceneId: "lyra_s3_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "The Ascension Path stretches before them, and Lyra stops, turning to face Kenji." },
                    { speakerId: "LYRA", text: "If you wish to help me, you must first prove your strength." },
                    { speakerId: "KENJI", text: "What kind of trial?" },
                ],
            },
            {
                sceneId: "lyra_s3_accept_scene2",
                lines: [
                    { speakerId: "LYRA", text: "Fight me. Show me you are worthy to stand beside a fallen angel." },
                    { speakerId: "NARRATOR", text: "Her eyes glint with a warrior's fire, long dormant." },
                ],
            },
            {
                sceneId: "lyra_s3_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The two circle each other, the air thick with unspoken challenge." },
                ],
                choices: [
                    { choiceId: "lyra_s3_accept_combat", text: "Prepare to fight seriously.", effects: { trustDelta: 3, loveDelta: 0 }, nextSceneId: "lyra_s3_accept_scene4" },
                    { choiceId: "lyra_s3_accept_refuse", text: "Refuse to fight someone already wounded.", effects: { trustDelta: -1, loveDelta: 2 }, nextSceneId: "lyra_s3_accept_scene4" },
                ],
            },
            {
                sceneId: "lyra_s3_accept_scene4",
                lines: [
                    { speakerId: "LYRA", text: "Then let us begin." },
                ],
            },
            {
                sceneId: "lyra_s3_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The trial begins." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 3 — COMPLETE
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_3_complete",
        title: "Defeat and Submission",
        locationId: "ct_ascension_path",
        startingSceneId: "lyra_s3_complete_scene1",
        scenes: [
            {
                sceneId: "lyra_s3_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Lyra's blade falls to the ground, and she stumbles, breathing hard." },
                    { speakerId: "LYRA", text: "You... actually defeated me." },
                    { speakerId: "KENJI", text: "I told you I would." },
                ],
            },
            {
                sceneId: "lyra_s3_complete_scene2",
                lines: [
                    { speakerId: "LYRA", text: "For the first time in ages... I feel something other than grief." },
                    { speakerId: "NARRATOR", text: "She looks at Kenji not with anger, but with something close to admiration." },
                ],
            },
            {
                sceneId: "lyra_s3_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She kneels, not in defeat, but as an offering." },
                ],
                choices: [
                    { choiceId: "lyra_s3_complete_accept", text: "Offer her your hand.", effects: { trustDelta: 4, loveDelta: 3 }, nextSceneId: "lyra_s3_complete_scene4" },
                    { choiceId: "lyra_s3_complete_dominate", text: "Command her to rise as your equal.", effects: { trustDelta: 2, loveDelta: 2 }, nextSceneId: "lyra_s3_complete_scene4" },
                ],
            },
            {
                sceneId: "lyra_s3_complete_scene4",
                lines: [
                    { speakerId: "LYRA", text: "I... will follow you." },
                ],
            },
            {
                sceneId: "lyra_s3_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "A bond begins to form, fragile but real." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 4 — ACCEPT
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_4_accept",
        title: "The Desire for Punishment",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_s4_accept_scene1",
        scenes: [
            {
                sceneId: "lyra_s4_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "In the quiet of the sanctum, Lyra speaks without meeting Kenji's eyes." },
                    { speakerId: "LYRA", text: "I have a confession. I... have missed pain." },
                    { speakerId: "KENJI", text: "Pain? Why?" },
                ],
            },
            {
                sceneId: "lyra_s4_accept_scene2",
                lines: [
                    { speakerId: "LYRA", text: "Because it was the only thing that made me feel real after my fall." },
                    { speakerId: "NARRATOR", text: "Her wings shiver as she speaks." },
                ],
            },
            {
                sceneId: "lyra_s4_accept_scene3",
                lines: [
                    { speakerId: "LYRA", text: "I long for punishment. For someone to remind me what I am." },
                ],
                choices: [
                    { choiceId: "lyra_s4_accept_gentle", text: "Say she doesn't need punishment, only healing.", effects: { trustDelta: 3, loveDelta: 4 }, nextSceneId: "lyra_s4_accept_scene4" },
                    { choiceId: "lyra_s4_accept_control", text: "Ask if she wants you to punish her.", effects: { trustDelta: 2, loveDelta: 3 }, nextSceneId: "lyra_s4_accept_scene4" },
                ],
            },
            {
                sceneId: "lyra_s4_accept_scene4",
                lines: [
                    { speakerId: "LYRA", text: "I want to give control to someone who will not destroy me." },
                ],
            },
            {
                sceneId: "lyra_s4_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The air between them grows heavy with unspoken need." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 4 — COMPLETE
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_4_complete",
        title: "Accepting the Punishment",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_s4_complete_scene1",
        scenes: [
            {
                sceneId: "lyra_s4_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji reaches out, and Lyra does not pull away." },
                    { speakerId: "LYRA", text: "I trust you... more than I should." },
                ],
            },
            {
                sceneId: "lyra_s4_complete_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "A soft sound escapes her as his hand brushes her wing." },
                    { speakerId: "LYRA", text: "No one has touched them since..." },
                ],
            },
            {
                sceneId: "lyra_s4_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The moment stretches, both of them aware of the line they are crossing." },
                ],
                choices: [
                    { choiceId: "lyra_s4_complete_embrace", text: "Pull her into an embrace.", effects: { trustDelta: 3, loveDelta: 5 }, nextSceneId: "lyra_s4_complete_scene4" },
                    { choiceId: "lyra_s4_complete_hold_back", text: "Step back and let her breathe.", effects: { trustDelta: 2, loveDelta: 2 }, nextSceneId: "lyra_s4_complete_scene4" },
                ],
            },
            {
                sceneId: "lyra_s4_complete_scene4",
                lines: [
                    { speakerId: "LYRA", text: "You are... different." },
                ],
            },
            {
                sceneId: "lyra_s4_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "A small flame of something new begins to burn in her chest." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 5 — ACCEPT
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_5_accept",
        title: "The Awakening",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_s5_accept_scene1",
        scenes: [
            {
                sceneId: "lyra_s5_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Lyra's wings glow faintly as she stands close to Kenji, her breath uneven." },
                    { speakerId: "LYRA", text: "I feel... something I thought was lost." },
                    { speakerId: "KENJI", text: "What is it?" },
                ],
            },
            {
                sceneId: "lyra_s5_accept_scene2",
                lines: [
                    { speakerId: "LYRA", text: "Desire. Not for punishment, but for... pleasure." },
                ],
            },
            {
                sceneId: "lyra_s5_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "She looks away, ashamed, but does not move." },
                ],
                choices: [
                    { choiceId: "lyra_s5_accept_encourage", text: "Tell her there is no shame in desire.", effects: { trustDelta: 4, loveDelta: 4 }, nextSceneId: "lyra_s5_accept_scene4" },
                    { choiceId: "lyra_s5_accept_silence", text: "Let the silence speak for you.", effects: { trustDelta: 2, loveDelta: 3 }, nextSceneId: "lyra_s5_accept_scene4" },
                ],
            },
            {
                sceneId: "lyra_s5_accept_scene4",
                lines: [
                    { speakerId: "LYRA", text: "Then... teach me." },
                ],
            },
            {
                sceneId: "lyra_s5_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The next step is clear, and neither of them turns away." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 5 — COMPLETE
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_5_complete",
        title: "Pleasure's Hold",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_s5_complete_scene1",
        scenes: [
            {
                sceneId: "lyra_s5_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Afterwards, Lyra lies still, her wings spread across the floor." },
                    { speakerId: "LYRA", text: "I didn't know... it could feel like that." },
                    { speakerId: "KENJI", text: "There is more, if you want it." },
                ],
            },
            {
                sceneId: "lyra_s5_complete_scene2",
                lines: [
                    { speakerId: "LYRA", text: "I want... everything." },
                ],
            },
            {
                sceneId: "lyra_s5_complete_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "Her eyes, once clouded with grief, now hold a spark of hunger." },
                ],
                choices: [
                    { choiceId: "lyra_s5_complete_continue", text: "Continue into deeper intimacy.", effects: { trustDelta: 3, loveDelta: 5 }, nextSceneId: "lyra_s5_complete_scene4" },
                    { choiceId: "lyra_s5_complete_rest", text: "Let her rest and recover.", effects: { trustDelta: 2, loveDelta: 3 }, nextSceneId: "lyra_s5_complete_scene4" },
                ],
            },
            {
                sceneId: "lyra_s5_complete_scene4",
                lines: [
                    { speakerId: "LYRA", text: "I'm yours... if you'll have me." },
                ],
            },
            {
                sceneId: "lyra_s5_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The chains of her past begin to loosen, replaced by something warmer." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 6 — ACCEPT
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_6_accept",
        title: "The Final Claim",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_s6_accept_scene1",
        scenes: [
            {
                sceneId: "lyra_s6_accept_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "Lyra kneels before Kenji, wings lowered, eyes steady." },
                    { speakerId: "LYRA", text: "I have made my choice." },
                    { speakerId: "KENJI", text: "And what is it?" },
                ],
            },
            {
                sceneId: "lyra_s6_accept_scene2",
                lines: [
                    { speakerId: "LYRA", text: "I want you to claim me. Not as a conquest, but as your own." },
                ],
            },
            {
                sceneId: "lyra_s6_accept_scene3",
                lines: [
                    { speakerId: "NARRATOR", text: "The words hang in the air, final and irrevocable." },
                ],
                choices: [
                    { choiceId: "lyra_s6_accept_claim", text: "Claim her gently but firmly.", effects: { trustDelta: 5, loveDelta: 5 }, nextSceneId: "lyra_s6_accept_scene4" },
                    { choiceId: "lyra_s6_accept_hesitate", text: "Ask if she is certain.", effects: { trustDelta: 3, loveDelta: 4 }, nextSceneId: "lyra_s6_accept_scene4" },
                ],
            },
            {
                sceneId: "lyra_s6_accept_scene4",
                lines: [
                    { speakerId: "LYRA", text: "I have never been more certain of anything." },
                ],
            },
            {
                sceneId: "lyra_s6_accept_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "Kenji steps forward, and the distance between them disappears." },
                ],
            },
        ],
    },

    // --------------------------------------------------------------------------
    // STAGE 6 — COMPLETE
    // --------------------------------------------------------------------------
    {
        id: "lyra_chain_stage_6_complete",
        title: "Corrupted Surrender",
        locationId: "ct_lyra_sanctum",
        startingSceneId: "lyra_s6_complete_scene1",
        scenes: [
            {
                sceneId: "lyra_s6_complete_scene1",
                lines: [
                    { speakerId: "NARRATOR", text: "When it is over, Lyra lies against Kenji, her wings wrapped around them both." },
                    { speakerId: "LYRA", text: "I am yours now. Completely." },
                    { speakerId: "KENJI", text: "And I am yours." },
                ],
            },
            {
                sceneId: "lyra_s6_complete_scene2",
                lines: [
                    { speakerId: "NARRATOR", text: "The grief that once filled her eyes has melted into something soft and fierce." },
                ],
            },
            {
                sceneId: "lyra_s6_complete_scene3",
                lines: [
                    { speakerId: "LYRA", text: "I never thought I would feel whole again." },
                ],
                choices: [
                    { choiceId: "lyra_s6_complete_promise", text: "Promise to stay with her.", effects: { trustDelta: 5, loveDelta: 5 }, nextSceneId: "lyra_s6_complete_scene4" },
                    { choiceId: "lyra_s6_complete_smile", text: "Kiss her forehead and smile.", effects: { trustDelta: 4, loveDelta: 4 }, nextSceneId: "lyra_s6_complete_scene4" },
                ],
            },
            {
                sceneId: "lyra_s6_complete_scene4",
                lines: [
                    { speakerId: "LYRA", text: "Then let us face what comes together." },
                ],
            },
            {
                sceneId: "lyra_s6_complete_scene5",
                lines: [
                    { speakerId: "NARRATOR", text: "The fallen angel has found not punishment, but peace—and a new purpose." },
                ],
            },
        ],
    },
];