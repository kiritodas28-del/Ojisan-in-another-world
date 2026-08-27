// ============================================================================
// REGION MONSTER PROFILES SEED DATA
// ============================================================================
// Defines which monster types are allowed in each region and their level range.
// Used by the encounter/spawn system to prevent invalid enemies from appearing.

import type { RegionMonsterProfile } from "../schemas/schemas";
import { MonsterType, Region } from "../schemas/schemas";

export const REGION_MONSTER_PROFILES: RegionMonsterProfile[] = [
    {
        region: Region.VerdantVale,
        levelRange: [1, 8],
        allowedMonsterTypes: [
            MonsterType.Beast,
            MonsterType.MiasmaCorrupted,
            MonsterType.Humanoid,
        ],
    },
    {
        region: Region.Aethermoor,
        levelRange: [6, 14],
        allowedMonsterTypes: [
            MonsterType.MiasmaCorrupted,
            MonsterType.Construct,
            MonsterType.Humanoid,
        ],
    },
    {
        region: Region.CrimsonMarch,
        levelRange: [12, 22],
        allowedMonsterTypes: [
            MonsterType.Draconic,
            MonsterType.Humanoid,
        ],
    },
    {
        region: Region.WhisperingWood,
        levelRange: [18, 28],
        allowedMonsterTypes: [
            MonsterType.MiasmaCorrupted,
            MonsterType.Beast,
            MonsterType.Humanoid,
        ],
    },
    {
        region: Region.MountainMonastery,
        levelRange: [22, 32],
        allowedMonsterTypes: [
            MonsterType.MiasmaCorrupted,
            MonsterType.Humanoid,
            MonsterType.Beast,
        ],
    },
    {
        region: Region.AuricCourt,
        levelRange: [24, 34],
        allowedMonsterTypes: [
            MonsterType.Humanoid,
            MonsterType.MiasmaCorrupted,
        ],
    },
    {
        region: Region.SunkenSanctum,
        levelRange: [30, 45],
        allowedMonsterTypes: [
            MonsterType.VoidAberration,
            MonsterType.Construct,
            MonsterType.Humanoid,
        ],
    },
    {
        region: Region.CelestialThreshold,
        levelRange: [40, 60],
        allowedMonsterTypes: [
            MonsterType.Cosmic,
        ],
    },
];