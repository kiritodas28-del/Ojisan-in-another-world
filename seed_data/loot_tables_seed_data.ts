// ============================================================================
// LOOT TABLES SEED DATA
// ============================================================================
import type { LootTableDef, LootTableEntry } from "../schemas/schemas";

function table(id: string, entries: LootTableEntry[]): LootTableDef {
    return { id, entries };
}

// ---------------------------------------------------------------------------
// GENERIC / SHARED
// ---------------------------------------------------------------------------
const bearLoot = table("bear_loot_table", [
    { itemId: "bear_pelt", dropChance: 0.8, quantityRange: [1, 2] },
    { itemId: "leather", dropChance: 0.4, quantityRange: [1, 2] },
    { itemId: "medicinal_herb", dropChance: 0.3, quantityRange: [1, 2] },
]);

const wolfLoot = table("wolf_loot_table", [
    { itemId: "wolf_pelt", dropChance: 0.7, quantityRange: [1, 2] },
    { itemId: "wolf_fang", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "wolf_claw", dropChance: 0.4, quantityRange: [1, 2] },
]);

const spiderLoot = table("spider_loot_table", [
    { itemId: "spider_silk", dropChance: 0.7, quantityRange: [1, 3] },
    { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
]);

const golemLoot = table("golem_loot_table", [
    { itemId: "iron_ore", dropChance: 0.7, quantityRange: [1, 3] },
    { itemId: "mana_crystal", dropChance: 0.3, quantityRange: [1, 2] },
]);

const scorpionLoot = table("scorpion_loot_table", [
    { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "hard_leather", dropChance: 0.4, quantityRange: [1, 2] },
    { itemId: "crystal_shard", dropChance: 0.3, quantityRange: [1, 2] },
]);

const serpentLoot = table("serpent_loot_table", [
    { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "leather", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "moon_mint_leaves", dropChance: 0.3, quantityRange: [1, 2] },
]);

const basiliskLoot = table("basilisk_loot_table", [
    { itemId: "poison_vial", dropChance: 0.4, quantityRange: [1, 2] },
    { itemId: "hard_leather", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "mana_crystal", dropChance: 0.2, quantityRange: [1, 2] },
]);

const wyrmlingLoot = table("wyrmling_loot_table", [
    { itemId: "dragon_scale", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "fire_crystal", dropChance: 0.2, quantityRange: [1, 2] },
    { itemId: "mana_crystal", dropChance: 0.3, quantityRange: [1, 2] },
]);

const wyvernLoot = table("wyvern_loot_table", [
    { itemId: "dragon_scale", dropChance: 0.7, quantityRange: [1, 2] },
    { itemId: "dragon_fang", dropChance: 0.4, quantityRange: [1, 2] },
]);

const drakeLoot = table("drake_loot_table", [
    { itemId: "dragon_scale", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "fire_crystal", dropChance: 0.3, quantityRange: [1, 2] },
]);

const wraithLoot = table("wraith_loot_table", [
    { itemId: "mana_crystal", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "dark_crystal", dropChance: 0.3, quantityRange: [1, 2] },
    { itemId: "void_essence", dropChance: 0.3, quantityRange: [1, 2] },
]);

const treantLoot = table("treant_loot_table", [
    { itemId: "medicinal_herb", dropChance: 0.6, quantityRange: [1, 3] },
    { itemId: "rare_mushroom", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "mana_crystal", dropChance: 0.3, quantityRange: [1, 2] },
]);

const batLoot = table("bat_loot_table", [
    { itemId: "leather", dropChance: 0.3, quantityRange: [1, 2] },
    { itemId: "medicinal_herb", dropChance: 0.2, quantityRange: [1, 2] },
]);

const centipedeLoot = table("centipede_loot_table", [
    { itemId: "poison_vial", dropChance: 0.4, quantityRange: [1, 2] },
    { itemId: "hard_leather", dropChance: 0.3, quantityRange: [1, 2] },
]);

const ratLoot = table("rat_loot_table", [
    { itemId: "rare_mushroom", dropChance: 0.3, quantityRange: [1, 2] },
    { itemId: "herb_bundle", dropChance: 0.4, quantityRange: [1, 2] },
]);

const boarLoot = table("boar_loot_table", [
    { itemId: "boar_tusk", dropChance: 0.6, quantityRange: [1, 2] },
    { itemId: "leather", dropChance: 0.4, quantityRange: [1, 2] },
]);

const beetleLoot = table("beetle_loot_table", [
    { itemId: "crystal_shard", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "iron_ore", dropChance: 0.3, quantityRange: [1, 2] },
]);

const mantisLoot = table("mantis_loot_table", [
    { itemId: "hard_leather", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "poison_vial", dropChance: 0.3, quantityRange: [1, 2] },
]);

const eagleLoot = table("eagle_loot_table", [
    { itemId: "leather", dropChance: 0.3, quantityRange: [1, 2] },
    { itemId: "mana_crystal", dropChance: 0.2, quantityRange: [1, 2] },
]);

const slimeLoot = table("slime_loot_table", [
    { itemId: "alchemical_silver", dropChance: 0.5, quantityRange: [1, 2] },
    { itemId: "mana_crystal", dropChance: 0.3, quantityRange: [1, 2] },
    { itemId: "rare_mushroom", dropChance: 0.3, quantityRange: [1, 2] },
]);

// ---------------------------------------------------------------------------
// EXPORT ALL LOOT TABLES
// ---------------------------------------------------------------------------
export const LOOT_TABLES: LootTableDef[] = [
    // Shared / beast
    bearLoot,
    wolfLoot,
    spiderLoot,
    golemLoot,
    scorpionLoot,
    serpentLoot,
    basiliskLoot,
    wyrmlingLoot,
    wyvernLoot,
    drakeLoot,
    wraithLoot,
    treantLoot,
    batLoot,
    centipedeLoot,
    ratLoot,
    boarLoot,
    beetleLoot,
    mantisLoot,
    eagleLoot,
    slimeLoot,

    table("direwolf_loot_table", [
        { itemId: "wolf_pelt", dropChance: 0.8, quantityRange: [1, 3] },
        { itemId: "wolf_fang", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "wolf_claw", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("panther_loot_table", [
        { itemId: "leather", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "hard_leather", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "moon_mint_leaves", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("miasma_wolf_loot_table", [
        { itemId: "wolf_pelt", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.2, quantityRange: [1, 2] },
        { itemId: "wolf_fang", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("stone_golem_loot_table", [
        { itemId: "iron_ore", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "crystal_shard", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("crystal_golem_loot_table", [
        { itemId: "crystal_shard", dropChance: 0.8, quantityRange: [1, 3] },
        { itemId: "iron_ore", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("void_horror_loot_table", [
        { itemId: "void_essence", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.6, quantityRange: [1, 2] },
    ]),

    table("ooze_loot_table", [
        { itemId: "alchemical_silver", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("hound_loot_table", [
        { itemId: "leather", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "wolf_fang", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("construct_loot_table", [
        { itemId: "iron_ore", dropChance: 0.6, quantityRange: [1, 3] },
        { itemId: "mana_crystal", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "crystal_shard", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("void_spawn_loot_table", [
        { itemId: "void_essence", dropChance: 0.6, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("miasma_drake_loot_table", [
        { itemId: "dragon_scale", dropChance: 0.6, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("dire_bear_loot_table", [
        { itemId: "bear_pelt", dropChance: 1.0, quantityRange: [1, 2] },
        { itemId: "leather", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("spider_queen_loot_table", [
        { itemId: "spider_silk", dropChance: 1.0, quantityRange: [2, 4] },
        { itemId: "poison_vial", dropChance: 1.0, quantityRange: [1, 2] },
        { itemId: "greater_mana_crystal", dropChance: 0.6, quantityRange: [1, 2] },
    ]),

    table("void_abomination_loot_table", [
        { itemId: "void_essence", dropChance: 1.0, quantityRange: [2, 3] },
        { itemId: "dark_crystal", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "star_essence", dropChance: 0.6, quantityRange: [1, 2] },
    ]),

    table("miasma_golem_loot_table", [
        { itemId: "iron_ore", dropChance: 0.8, quantityRange: [1, 3] },
        { itemId: "dark_crystal", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("frost_wolf_loot_table", [
        { itemId: "wolf_pelt", dropChance: 0.7, quantityRange: [1, 2] },
        { itemId: "ice_crystal", dropChance: 0.3, quantityRange: [1, 2] },
        { itemId: "wolf_fang", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("serpent_wyrm_loot_table", [
        { itemId: "dragon_scale", dropChance: 0.6, quantityRange: [1, 2] },
        { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("void_reaver_loot_table", [
        { itemId: "void_essence", dropChance: 0.7, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("fire_drake_loot_table", [
        { itemId: "fire_crystal", dropChance: 0.6, quantityRange: [1, 2] },
        { itemId: "dragon_scale", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("void_wisp_loot_table", [
        { itemId: "void_essence", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("crystal_wyvern_loot_table", [
        { itemId: "dragon_scale", dropChance: 0.6, quantityRange: [1, 2] },
        { itemId: "crystal_shard", dropChance: 0.8, quantityRange: [1, 3] },
    ]),

    table("void_panther_loot_table", [
        { itemId: "leather", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("iron_wyrm_loot_table", [
        { itemId: "dragon_scale", dropChance: 0.7, quantityRange: [1, 2] },
        { itemId: "iron_ore", dropChance: 0.8, quantityRange: [1, 3] },
        { itemId: "star_iron_ore", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("void_beast_loot_table", [
        { itemId: "void_essence", dropChance: 0.9, quantityRange: [1, 3] },
        { itemId: "dark_crystal", dropChance: 0.7, quantityRange: [1, 2] },
        { itemId: "dragon_heart", dropChance: 0.4, quantityRange: [1, 1] },
    ]),

    table("miasma_construct_loot_table", [
        { itemId: "iron_ore", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("void_wyrm_loot_table", [
        { itemId: "void_essence", dropChance: 0.8, quantityRange: [1, 3] },
        { itemId: "dragon_scale", dropChance: 0.6, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.6, quantityRange: [1, 2] },
    ]),

    table("miasma_bear_loot_table", [
        { itemId: "bear_pelt", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.2, quantityRange: [1, 2] },
    ]),

    table("stone_scorpion_loot_table", [
        { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "hard_leather", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "crystal_shard", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("void_scorpion_loot_table", [
        { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("miasma_drake_boss_loot_table", [
        { itemId: "dragon_heart", dropChance: 0.5, quantityRange: [1, 1] },
        { itemId: "dark_crystal", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "greater_mana_crystal", dropChance: 0.6, quantityRange: [1, 2] },
    ]),

    table("crystal_beast_loot_table", [
        { itemId: "crystal_shard", dropChance: 0.7, quantityRange: [1, 3] },
        { itemId: "mana_crystal", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("void_slime_loot_table", [
        { itemId: "alchemical_silver", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("miasma_wyrmling_loot_table", [
        { itemId: "dragon_scale", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.2, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("void_wyrmling_loot_table", [
        { itemId: "dragon_scale", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("frost_drake_loot_table", [
        { itemId: "ice_crystal", dropChance: 0.6, quantityRange: [1, 2] },
        { itemId: "dragon_scale", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("void_reaver_boss_loot_table", [
        { itemId: "void_essence", dropChance: 1.0, quantityRange: [2, 3] },
        { itemId: "dark_crystal", dropChance: 0.9, quantityRange: [1, 2] },
        { itemId: "star_essence", dropChance: 0.7, quantityRange: [1, 2] },
    ]),

    table("basilisk_king_loot_table", [
        { itemId: "poison_vial", dropChance: 1.0, quantityRange: [1, 3] },
        { itemId: "hard_leather", dropChance: 0.7, quantityRange: [1, 2] },
        { itemId: "greater_mana_crystal", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("void_hound_loot_table", [
        { itemId: "leather", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("iron_golem_loot_table", [
        { itemId: "iron_ore", dropChance: 1.0, quantityRange: [2, 4] },
        { itemId: "mana_crystal", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("void_serpent_loot_table", [
        { itemId: "void_essence", dropChance: 0.7, quantityRange: [1, 2] },
        { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("giant_mantis_loot_table", [
        { itemId: "hard_leather", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "poison_vial", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("void_bat_loot_table", [
        { itemId: "leather", dropChance: 0.3, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.2, quantityRange: [1, 2] },
    ]),

    table("dire_scorpion_loot_table", [
        { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "hard_leather", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("void_slime_boss_loot_table", [
        { itemId: "alchemical_silver", dropChance: 1.0, quantityRange: [2, 4] },
        { itemId: "void_essence", dropChance: 0.8, quantityRange: [1, 3] },
        { itemId: "greater_mana_crystal", dropChance: 0.6, quantityRange: [1, 2] },
    ]),

    table("wraith_lord_loot_table", [
        { itemId: "greater_mana_crystal", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.8, quantityRange: [1, 2] },
    ]),

    table("crystal_beast_boss_loot_table", [
        { itemId: "greater_mana_crystal", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "crystal_shard", dropChance: 1.0, quantityRange: [2, 4] },
        { itemId: "star_essence", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("void_centipede_loot_table", [
        { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "hard_leather", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("miasma_serpent_loot_table", [
        { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.2, quantityRange: [1, 2] },
    ]),

    table("dire_bat_swarm_loot_table", [
        { itemId: "leather", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "medicinal_herb", dropChance: 0.2, quantityRange: [1, 2] },
    ]),

    table("void_wolf_loot_table", [
        { itemId: "wolf_pelt", dropChance: 0.7, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "wolf_fang", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    table("miasma_scorpion_loot_table", [
        { itemId: "poison_vial", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("blighted_bear_loot_table", [
        { itemId: "bear_pelt", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.2, quantityRange: [1, 2] },
    ]),

    table("void_construct_loot_table", [
        { itemId: "void_essence", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "iron_ore", dropChance: 0.8, quantityRange: [1, 3] },
        { itemId: "mana_crystal", dropChance: 0.6, quantityRange: [1, 2] },
    ]),

    table("miasma_boar_alpha_loot_table", [
        { itemId: "boar_tusk", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("giant_eagle_loot_table", [
        { itemId: "leather", dropChance: 0.3, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.2, quantityRange: [1, 2] },
    ]),

    table("void_eagle_loot_table", [
        { itemId: "leather", dropChance: 0.3, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.3, quantityRange: [1, 2] },
    ]),

    table("wolf_boss_loot_table", [
        { itemId: "wolf_pelt", dropChance: 1.0, quantityRange: [2, 3] },
        { itemId: "wolf_fang", dropChance: 1.0, quantityRange: [1, 3] },
        { itemId: "wolf_claw", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "greater_mana_crystal", dropChance: 0.5, quantityRange: [1, 2] },
    ]),

    // ---------------------------------------------------------------------------
    // HUMANOIDS
    // ---------------------------------------------------------------------------
    table("bandit_loot_table", [
        { itemId: "bandage", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "health_potion", dropChance: 0.3, quantityRange: [1, 1] },
        { itemId: "leather", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "iron_ore", dropChance: 0.2, quantityRange: [1, 2] },
        { itemId: "dagger", dropChance: 0.1, quantityRange: [1, 1] },
    ]),

    table("cultist_loot_table", [
        { itemId: "mana_potion", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "silk_thread", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "dark_crystal", dropChance: 0.3, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("mercenary_loot_table", [
        { itemId: "health_potion", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "iron_ore", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "leather", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "steel_sword", dropChance: 0.1, quantityRange: [1, 1] },
    ]),

    table("rogue_loot_table", [
        { itemId: "throwing_knife", dropChance: 0.3, quantityRange: [1, 2] },
        { itemId: "leather", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "health_potion", dropChance: 0.3, quantityRange: [1, 1] },
    ]),

    table("marauder_loot_table", [
        { itemId: "health_potion", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "leather", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "iron_ore", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "orc_waraxe", dropChance: 0.1, quantityRange: [1, 1] },
    ]),

    table("witch_loot_table", [
        { itemId: "mana_potion", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "rare_mushroom", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "mana_crystal", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "moon_mint_leaves", dropChance: 0.4, quantityRange: [1, 2] },
    ]),

    table("assassin_loot_table", [
        { itemId: "throwing_knife", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "poison_vial", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "leather", dropChance: 0.3, quantityRange: [1, 2] },
        { itemId: "silent_boots", dropChance: 0.1, quantityRange: [1, 1] },
    ]),

    table("raider_loot_table", [
        { itemId: "health_potion", dropChance: 0.4, quantityRange: [1, 2] },
        { itemId: "iron_ore", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "leather", dropChance: 0.5, quantityRange: [1, 2] },
        { itemId: "battle_axe", dropChance: 0.1, quantityRange: [1, 1] },
    ]),

    table("malakor_loot_table", [
        { itemId: "cursed_sword", dropChance: 0.8, quantityRange: [1, 1] },
        { itemId: "demonic_essence", dropChance: 1.0, quantityRange: [1, 3] },
        { itemId: "dark_crystal", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "void_essence", dropChance: 0.8, quantityRange: [1, 2] },
        { itemId: "greater_mana_crystal", dropChance: 0.6, quantityRange: [1, 2] },
    ]),
];
// ============================================================================
// HUMANOID STRIP & LOOT GEAR SETS
// ============================================================================
export const HUMANOID_STRIP_LOOT_GEAR_SETS: Record<
    string,
    Record<"MALE" | "FEMALE", string[]>
> = {
    bandit: {
        FEMALE: [
            "dagger",
            "leather_armor",
            "leather_pants",
            "travelers_boots",
            "leather_cap",
            "lace_bra",
            "lace_panties",
        ],
        MALE: [
            "dagger",
            "leather_armor",
            "leather_pants",
            "travelers_boots",
            "leather_cap",
        ],
    },

    cultist: {
        FEMALE: [
            "dagger",
            "healers_robe",
            "white_linen_hood",
            "soft_slippers",
            "lace_bra",
            "lace_panties",
        ],
        MALE: [
            "dagger",
            "healers_robe",
            "white_linen_hood",
            "soft_slippers",
        ],
    },

    mercenary: {
        FEMALE: [
            "iron_sword",
            "chainmail",
            "iron_helmet",
            "armored_boots",
            "leather_gloves",
            "lace_bra",
            "lace_panties",
        ],
        MALE: [
            "iron_sword",
            "chainmail",
            "iron_helmet",
            "armored_boots",
            "leather_gloves",
        ],
    },

    witch: {
        FEMALE: [
            "wand",
            "moon_robe",
            "white_linen_hood",
            "soft_slippers",
            "lace_bra",
            "lace_panties",
        ],
        MALE: [
            "wand",
            "moon_robe",
            "white_linen_hood",
            "soft_slippers",
        ],
    },

    assassin: {
        FEMALE: [
            "twin_daggers",
            "assassin_armor",
            "silent_boots",
            "leather_gloves",
            "lace_bra",
            "lace_panties",
        ],
        MALE: [
            "twin_daggers",
            "assassin_armor",
            "silent_boots",
            "leather_gloves",
        ],
    },

    raider: {
        FEMALE: [
            "battle_axe",
            "scale_armor",
            "heavy_boots",
            "leather_pants",
            "lace_bra",
            "lace_panties",
        ],
        MALE: [
            "battle_axe",
            "scale_armor",
            "heavy_boots",
            "leather_pants",
        ],
    },

    rogue: {
        FEMALE: [
            "shortbow",
            "leather_armor",
            "silent_boots",
            "leather_pants",
            "lace_bra",
            "lace_panties",
        ],
        MALE: [
            "shortbow",
            "leather_armor",
            "silent_boots",
            "leather_pants",
        ],
    },

    marauder: {
        FEMALE: [
            "orc_waraxe",
            "scale_armor",
            "heavy_boots",
            "leather_pants",
            "lace_bra",
            "lace_panties",
        ],
        MALE: [
            "orc_waraxe",
            "scale_armor",
            "heavy_boots",
            "leather_pants",
        ],
    },

    "corrupt-cultist-leader": {
        FEMALE: [
            "cursed_sword",
            "plate_armor",
            "crown_of_thorns",
            "heavy_boots",
            "lace_bra",
            "lace_panties",
        ],
        MALE: [
            "cursed_sword",
            "plate_armor",
            "crown_of_thorns",
            "heavy_boots",
        ],
    },

    // Optional: non-humanoid but humanoid-form enemies that can also be stripped.
    succubus: {
        FEMALE: [
            "sheer_nightgown",
            "lace_bra",
            "lace_panties",
            "basic_vibrator",
        ],
        MALE: [],
    },

    "void-concubine": {
        FEMALE: [
            "body_stocking",
            "lace_bra",
            "lace_panties",
            "basic_vibrator",
        ],
        MALE: [],
    },

    incubus: {
        FEMALE: [],
        MALE: [
            "silk_pants",
            "leather_gloves",
        ],
    },
};