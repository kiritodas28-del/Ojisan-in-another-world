// ============================================================================
// EQUIPMENT UPGRADES SEED DATA
// ============================================================================
import type { EquipmentUpgradeDef } from "../schemas/schemas";

// ---------------------------------------------------------------------------
// Helper to generate upgrade steps (+1, +2, +3) for a given item
// ---------------------------------------------------------------------------
function generateUpgrades(
    baseItemId: string,
    category: "WEAPON" | "ARMOR" | "CLOTHING",
    baseMaterialItemId: string,
    baseGoldCost: number,
    guidedPremium: number = 20
): EquipmentUpgradeDef[] {
    const steps: EquipmentUpgradeDef[] = [];
    for (let level = 0; level < 3; level++) {
        steps.push({
            id: `${baseItemId}_upgrade_${level}_to_${level + 1}`,
            baseItemId,
            fromUpgradeLevel: level,
            toUpgradeLevel: level + 1,
            materialCosts: [
                {
                    itemId: baseMaterialItemId,
                    quantity: level + 1, // scales 1,2,3
                },
            ],
            goldCost: Math.round(baseGoldCost * (level + 1)),
            guidedSelectionGoldPremium: guidedPremium,
        });
    }
    return steps;
}

// ---------------------------------------------------------------------------
// All upgradable items with their base upgrade parameters
// ---------------------------------------------------------------------------
const UPGRADABLE_ITEMS: {
    baseItemId: string;
    category: "WEAPON" | "ARMOR" | "CLOTHING";
    materialItemId: string;
    baseGoldCost: number;
}[] = [
        // Weapons
        { baseItemId: "basic_sword", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 20 },
        { baseItemId: "orc_waraxe", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 30 },
        { baseItemId: "twin_daggers", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 25 },
        { baseItemId: "dragon_spear", category: "WEAPON", materialItemId: "dragon_scale", baseGoldCost: 40 },
        { baseItemId: "fox_blade", category: "WEAPON", materialItemId: "silver_ore", baseGoldCost: 30 },
        { baseItemId: "iron_sword", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 20 },
        { baseItemId: "steel_sword", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 35 },
        { baseItemId: "greatsword", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 50 },
        { baseItemId: "shortbow", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 20 },
        { baseItemId: "longbow", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 30 },
        { baseItemId: "crossbow", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 40 },
        { baseItemId: "mage_staff", category: "WEAPON", materialItemId: "mana_crystal", baseGoldCost: 40 },
        { baseItemId: "wand", category: "WEAPON", materialItemId: "mana_crystal", baseGoldCost: 25 },
        { baseItemId: "dagger", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 15 },
        { baseItemId: "spear", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 25 },
        { baseItemId: "halberd", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 45 },
        { baseItemId: "warhammer", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 50 },
        { baseItemId: "mace", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 30 },
        { baseItemId: "cursed_sword", category: "WEAPON", materialItemId: "demonic_essence", baseGoldCost: 60 },
        { baseItemId: "elven_bow", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 50 },
        { baseItemId: "orc_bow", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 40 },
        { baseItemId: "dwarven_axe", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 45 },
        { baseItemId: "giant_club", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 35 },
        { baseItemId: "magic_dagger", category: "WEAPON", materialItemId: "mana_crystal", baseGoldCost: 30 },
        { baseItemId: "flintlock_pistol", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 55 },
        { baseItemId: "rapier", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 35 },
        { baseItemId: "battle_axe", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 40 },
        { baseItemId: "war_scythe", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 35 },
        { baseItemId: "staff_of_fire", category: "WEAPON", materialItemId: "fire_crystal", baseGoldCost: 70 },
        { baseItemId: "staff_of_ice", category: "WEAPON", materialItemId: "ice_crystal", baseGoldCost: 70 },
        { baseItemId: "staff_of_lightning", category: "WEAPON", materialItemId: "lightning_crystal", baseGoldCost: 70 },
        { baseItemId: "daedric_sword", category: "WEAPON", materialItemId: "demonic_essence", baseGoldCost: 80 },
        { baseItemId: "angelic_sword", category: "WEAPON", materialItemId: "angelic_essence", baseGoldCost: 75 },
        { baseItemId: "demonic_sword", category: "WEAPON", materialItemId: "demonic_essence", baseGoldCost: 75 },
        { baseItemId: "katana", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 45 },
        { baseItemId: "nunchaku", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 25 },
        { baseItemId: "bo_staff", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 30 },
        { baseItemId: "trident", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 40 },
        { baseItemId: "scythe", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 45 },
        { baseItemId: "bow_blade", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 35 },
        { baseItemId: "gunblade", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 60 },
        { baseItemId: "energy_sword", category: "WEAPON", materialItemId: "mana_crystal", baseGoldCost: 75 },
        { baseItemId: "plasma_blaster", category: "WEAPON", materialItemId: "lightning_crystal", baseGoldCost: 80 },
        { baseItemId: "laser_rifle", category: "WEAPON", materialItemId: "lightning_crystal", baseGoldCost: 90 },
        { baseItemId: "flamethrower", category: "WEAPON", materialItemId: "fire_crystal", baseGoldCost: 90 },
        { baseItemId: "ice_gun", category: "WEAPON", materialItemId: "ice_crystal", baseGoldCost: 80 },
        { baseItemId: "lightning_gun", category: "WEAPON", materialItemId: "lightning_crystal", baseGoldCost: 80 },
        { baseItemId: "sonic_blaster", category: "WEAPON", materialItemId: "lightning_crystal", baseGoldCost: 65 },
        { baseItemId: "chain_sword", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 50 },
        { baseItemId: "great_hammer", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 55 },
        { baseItemId: "battle_scythe", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 45 },
        { baseItemId: "war_pick", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 30 },
        { baseItemId: "claymore", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 50 },
        { baseItemId: "rapier_of_grace", category: "WEAPON", materialItemId: "iron_ore", baseGoldCost: 55 },
        { baseItemId: "bow_of_the_hunt", category: "WEAPON", materialItemId: "wood_preserver", baseGoldCost: 50 },
        { baseItemId: "staff_of_healing", category: "WEAPON", materialItemId: "angelic_essence", baseGoldCost: 70 },
        { baseItemId: "staff_of_darkness", category: "WEAPON", materialItemId: "demonic_essence", baseGoldCost: 70 },

        // Armor
        { baseItemId: "leather_armor", category: "ARMOR", materialItemId: "leather", baseGoldCost: 20 },
        { baseItemId: "scale_armor", category: "ARMOR", materialItemId: "dragon_scale", baseGoldCost: 35 },
        { baseItemId: "night_armor", category: "ARMOR", materialItemId: "leather", baseGoldCost: 30 },
        { baseItemId: "healers_robe", category: "ARMOR", materialItemId: "enchanted_fabric", baseGoldCost: 25 },
        { baseItemId: "moon_robe", category: "ARMOR", materialItemId: "enchanted_fabric", baseGoldCost: 30 },
        { baseItemId: "militant_coat", category: "ARMOR", materialItemId: "leather", baseGoldCost: 30 },
        { baseItemId: "angelic_robe", category: "ARMOR", materialItemId: "angelic_essence", baseGoldCost: 40 },
        { baseItemId: "chainmail", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 40 },
        { baseItemId: "plate_armor", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 55 },
        { baseItemId: "robes_of_the_archmage", category: "ARMOR", materialItemId: "enchanted_fabric", baseGoldCost: 60 },
        { baseItemId: "dragon_scale_armor", category: "ARMOR", materialItemId: "dragon_scale", baseGoldCost: 70 },
        { baseItemId: "elven_leather_armor", category: "ARMOR", materialItemId: "leather", baseGoldCost: 35 },
        { baseItemId: "orc_heavy_armor", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 45 },
        { baseItemId: "dwarven_plate_armor", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 60 },
        { baseItemId: "assassin_armor", category: "ARMOR", materialItemId: "leather", baseGoldCost: 35 },
        { baseItemId: "knight_armor", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 50 },
        { baseItemId: "battle_mage_robes", category: "ARMOR", materialItemId: "enchanted_fabric", baseGoldCost: 35 },
        { baseItemId: "leather_pants", category: "ARMOR", materialItemId: "leather", baseGoldCost: 15 },
        { baseItemId: "chainmail_leggings", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 25 },
        { baseItemId: "plate_leggings", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 35 },
        { baseItemId: "battle_skirt", category: "ARMOR", materialItemId: "leather", baseGoldCost: 25 },
        { baseItemId: "iron_helmet", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 15 },
        { baseItemId: "steel_helmet", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 25 },
        { baseItemId: "plate_helmet", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 35 },
        { baseItemId: "leather_cap", category: "ARMOR", materialItemId: "leather", baseGoldCost: 10 },
        { baseItemId: "elven_circlet", category: "ARMOR", materialItemId: "silver_ore", baseGoldCost: 25 },
        { baseItemId: "crown_of_thorns", category: "ARMOR", materialItemId: "angelic_essence", baseGoldCost: 35 },
        { baseItemId: "travelers_boots", category: "ARMOR", materialItemId: "leather", baseGoldCost: 15 },
        { baseItemId: "silent_boots", category: "ARMOR", materialItemId: "leather", baseGoldCost: 25 },
        { baseItemId: "armored_boots", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 25 },
        { baseItemId: "heavy_boots", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 35 },
        { baseItemId: "polished_boots", category: "ARMOR", materialItemId: "leather", baseGoldCost: 30 },
        { baseItemId: "leather_gloves", category: "ARMOR", materialItemId: "leather", baseGoldCost: 10 },
        { baseItemId: "armored_gauntlets", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 20 },
        { baseItemId: "iron_bracers", category: "ARMOR", materialItemId: "iron_ore", baseGoldCost: 15 },
        { baseItemId: "silver_bracers", category: "ARMOR", materialItemId: "silver_ore", baseGoldCost: 20 },

        // Clothing / Lingerie
        { baseItemId: "sheer_nightgown", category: "CLOTHING", materialItemId: "enchanted_fabric", baseGoldCost: 25 },
        { baseItemId: "lace_bra", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 20 },
        { baseItemId: "lace_panties", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 15 },
        { baseItemId: "silk_negligee", category: "CLOTHING", materialItemId: "silk_thread", baseGoldCost: 30 },
        { baseItemId: "corset", category: "CLOTHING", materialItemId: "leather", baseGoldCost: 35 },
        { baseItemId: "body_stocking", category: "CLOTHING", materialItemId: "silk_thread", baseGoldCost: 30 },
        { baseItemId: "bikini", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 15 },
        { baseItemId: "micro_bikini", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 20 },
        { baseItemId: "g_string", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 12 },
        { baseItemId: "tanga_panties", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 10 },
        { baseItemId: "lace_corset", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 35 },
        { baseItemId: "cupless_bustier", category: "CLOTHING", materialItemId: "leather", baseGoldCost: 35 },
        { baseItemId: "cropped_chemise", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 20 },
        { baseItemId: "satin_chemise", category: "CLOTHING", materialItemId: "silk_thread", baseGoldCost: 25 },
        { baseItemId: "robe_of_seduction", category: "CLOTHING", materialItemId: "enchanted_fabric", baseGoldCost: 50 },
        { baseItemId: "crotchless_bodystocking", category: "CLOTHING", materialItemId: "silk_thread", baseGoldCost: 35 },
        { baseItemId: "open_cup_corset", category: "CLOTHING", materialItemId: "leather", baseGoldCost: 40 },
        { baseItemId: "fishnet_bodysuit", category: "CLOTHING", materialItemId: "silk_thread", baseGoldCost: 30 },
        { baseItemId: "open_back_lingerie", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 25 },
        { baseItemId: "strappy_lingerie", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 25 },
        { baseItemId: "peephole_bra", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 25 },
        { baseItemId: "transparent_bra", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 20 },
        { baseItemId: "no_cup_bra", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 20 },
        { baseItemId: "cage_bra", category: "CLOTHING", materialItemId: "leather", baseGoldCost: 30 },
        { baseItemId: "strapless_bra", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 15 },
        { baseItemId: "push_up_bra", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 20 },
        { baseItemId: "balconette_bra", category: "CLOTHING", materialItemId: "tailoring_thread", baseGoldCost: 18 },
    ];

// ---------------------------------------------------------------------------
// Generate the full upgrade list
// ---------------------------------------------------------------------------
export const EQUIPMENT_UPGRADES: EquipmentUpgradeDef[] = UPGRADABLE_ITEMS.flatMap((item) =>
    generateUpgrades(item.baseItemId, item.category, item.materialItemId, item.baseGoldCost)
);