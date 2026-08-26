// ============================================================================
// MAIN QUEST ACTS SEED DATA
// ============================================================================
import type { ActDef } from "../schemas/schemas";
import { Region } from "../schemas/schemas";

export const MAIN_QUEST_ACTS: ActDef[] = [
    {
        actNumber: 1,
        displayName: "The Awakening in the Verdant Vale",
        region: Region.VerdantVale,
        chapterIds: [
            "act1_ch1",
            "act1_ch2",
            "act1_ch3",
            "act1_ch4",
            "act1_ch5",
            "act1_ch6"
        ],
        completionStoryFlag: "act1_complete",
        astraeaApprovalOnCompletion: 25,
    },
    {
        actNumber: 2,
        displayName: "The Secrets of Aethermoor",
        region: Region.Aethermoor,
        chapterIds: [
            "act2_ch1",
            "act2_ch2",
            "act2_ch3",
            "act2_ch4",
            "act2_ch5"
        ],
        completionStoryFlag: "act2_complete",
        astraeaApprovalOnCompletion: 20,
    },
    {
        actNumber: 3,
        displayName: "The Crimson March",
        region: Region.CrimsonMarch,
        chapterIds: [
            "act3_ch1",
            "act3_ch2",
            "act3_ch3",
            "act3_ch4",
            "act3_ch5"
        ],
        completionStoryFlag: "act3_complete",
        astraeaApprovalOnCompletion: 20,
    },
    {
        actNumber: 4,
        displayName: "Whispers in the Wood",
        region: Region.WhisperingWood,
        chapterIds: [
            "act4_ch1",
            "act4_ch2",
            "act4_ch3",
            "act4_ch4",
            "act4_ch5",
            "act4_ch6"
        ],
        completionStoryFlag: "act4_complete",
        astraeaApprovalOnCompletion: 20,
    },
    {
        actNumber: 5,
        displayName: "The Auric Court Conspiracy",
        region: Region.AuricCourt,
        chapterIds: [
            "act5_ch1",
            "act5_ch2",
            "act5_ch3",
            "act5_ch4",
            "act5_ch5",
            "act5_ch6",
        ],
        completionStoryFlag: "act5_complete",
        astraeaApprovalOnCompletion: 25,
    },
    {
        actNumber: 6,
        displayName: "The Sunken Sanctum",
        region: Region.SunkenSanctum,
        chapterIds: [
            "act6_ch1",
            "act6_ch2",
            "act6_ch3",
            "act6_ch4",
        ],
        completionStoryFlag: "act6_complete",
        astraeaApprovalOnCompletion: 25,
    },
    {
        actNumber: 7,
        displayName: "The Celestial Threshold",
        region: Region.CelestialThreshold,
        chapterIds: [
            "act7_ch1",
            "act7_ch2",
            "act7_ch3",
            "act7_ch4",
            "act7_ch5",
        ],
        completionStoryFlag: "act7_complete",
        astraeaApprovalOnCompletion: 25,
    },
];