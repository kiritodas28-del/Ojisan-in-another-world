// ============================================================================
// BOSS SCRIPTS SEED DATA
// ============================================================================
// HP-threshold scripts for BOSS_SCRIPTED AI. Each boss script defines phases
// that trigger at specific HP percentages, with associated abilities and
// narrative lines.
// ============================================================================

import type { BossScriptDef } from "../schemas/schemas";

export const BOSS_SCRIPTS: BossScriptDef[] = [
    // ---------------------------------------------------------------------------
    // ACT 1 — Verdant Vale
    // ---------------------------------------------------------------------------
    {
        id: "act1_blighted_treant_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["root_slam"],
                narrative: "The treant's bark splits as it slams its roots into the earth.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["miasma_burst"],
                narrative: "Miasma pours from the corrupted heartwood, filling the grove.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["root_slam", "miasma_burst"],
                narrative: "The treant roars, its corrupted form lashing out in desperation.",
            },
        ],
    },

    // ---------------------------------------------------------------------------
    // ACT 2 — Aethermoor
    // ---------------------------------------------------------------------------
    {
        id: "act2_archivist_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["wraith_bolt"],
                narrative: "The archivist raises a skeletal hand, hurling cursed light.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["curse"],
                narrative: "It begins chanting a curse that chills the air.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["wraith_bolt", "curse"],
                narrative: "The archivist shrieks, unleashing its final vengeful assault.",
            },
        ],
    },
    {
        id: "act2_golem_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["smash"],
                narrative: "The golem's stone fists crash down with mechanical precision.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["guard"],
                narrative: "It braces itself, its defensive protocols activating.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["smash", "guard"],
                narrative: "The golem enters overdrive, attacking and defending simultaneously.",
            },
        ],
    },

    // ---------------------------------------------------------------------------
    // ACT 3 — Crimson March
    // ---------------------------------------------------------------------------
    {
        id: "act3_miasma_wyrm_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["miasma_breath"],
                narrative: "The wyrm inhales deeply, then spews a cloud of toxic miasma.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["tail_sweep"],
                narrative: "Its massive tail sweeps across the battlefield.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["miasma_breath", "tail_sweep", "wyrm_roar"],
                narrative: "The wyrm roars, unleashing its full corrupted fury.",
            },
        ],
    },

    // ---------------------------------------------------------------------------
    // ACT 4 — Whispering Wood
    // ---------------------------------------------------------------------------
    {
        id: "act4_heartwood_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["heartwood_regen"],
                narrative: "The abomination's wounds close as it draws power from the forest.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["root_crush"],
                narrative: "Roots erupt from the ground, seeking to crush the party.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["miasma_seed", "heartwood_regen"],
                narrative: "It scatters corrupted seeds while regenerating its body.",
            },
        ],
    },
    {
        id: "act4_spider_queen_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["web_barrage"],
                narrative: "The spider queen sprays sticky webbing across the area.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["venom_strike"],
                narrative: "Her fangs glisten as she strikes with deadly venom.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["spiderling", "web_barrage"],
                narrative: "She summons a swarm of spiderlings to overwhelm her prey.",
            },
        ],
    },

    // ---------------------------------------------------------------------------
    // ACT 5 — Mountain Monastery / Auric Court
    // ---------------------------------------------------------------------------
    {
        id: "act5_witch_elder_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["miasma_hex"],
                narrative: "The witch elder whispers a hex that darkens the air.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["curse_of_decay"],
                narrative: "Decay spreads from her fingertips, withering all it touches.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["miasma_hex", "curse_of_decay"],
                narrative: "She cackles and unleashes her most potent curses.",
            },
        ],
    },
    {
        id: "act5_hybrid_boss_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["succubus_temptation_kiss", "malakor_smite"],
                narrative: "Malakor smites while the succubus begins her seductive assault.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["succubus_corrupting_embrace", "malakor_dark_ritual"],
                narrative: "The pair combines dark ritual and corrupting embrace.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["succubus_shadow_claw", "malakor_dark_ritual"],
                narrative: "In desperation, Malakor channels a dark ritual while the succubus claws.",
            },
        ],
    },

    // ---------------------------------------------------------------------------
    // ACT 6 — Sunken Sanctum
    // ---------------------------------------------------------------------------
    {
        id: "act6_void_concubine_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["void_concubine_embrace"],
                narrative: "The concubine opens her arms, pulling at the edges of reality.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["void_concubine_lash"],
                narrative: "A lash of pure void strikes from her fingertips.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["void_concubine_devour"],
                narrative: "Her form expands as she tries to devour everything before her.",
            },
        ],
    },

    // ---------------------------------------------------------------------------
    // ACT 7 — Celestial Threshold
    // ---------------------------------------------------------------------------
    {
        id: "act7_void_abomination_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["void_corruption"],
                narrative: "The abomination exudes an aura of deep corruption.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["eldritch_grasp"],
                narrative: "Tendrils of eldritch energy reach out to ensnare the party.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["maddening_scream", "void_corruption"],
                narrative: "It lets out a maddening scream that shatters the mind.",
            },
        ],
    },
    {
        id: "act7_void_reaver_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["void_cleave"],
                narrative: "The reaver lord cleaves through the air with void energy.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["abyss_blast"],
                narrative: "A blast of abyssal power erupts from its form.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["void_cleave", "abyss_blast"],
                narrative: "It unleashes both cleave and blast in a final onslaught.",
            },
        ],
    },
    {
        id: "act7_void_wyrm_script",
        phases: [
            {
                hpThresholdPercent: 75,
                triggeredAbilityIds: ["void_breath"],
                narrative: "The void wyrm exhales a torrent of nothingness.",
            },
            {
                hpThresholdPercent: 50,
                triggeredAbilityIds: ["crush"],
                narrative: "It tries to crush the party beneath its massive body.",
            },
            {
                hpThresholdPercent: 25,
                triggeredAbilityIds: ["void_breath", "crush", "abyss"],
                narrative: "The wyrm calls upon the abyss itself, unleashing total annihilation.",
            },
        ],
    },
];