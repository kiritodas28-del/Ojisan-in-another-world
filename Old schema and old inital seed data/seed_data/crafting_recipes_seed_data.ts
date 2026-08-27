// ============================================================================
// CRAFTING RECIPES SEED DATA
// ============================================================================
import type { CraftingRecipeDef } from "../schemas/schemas";

export const CRAFTING_RECIPES: CraftingRecipeDef[] = [
    // ---------------------------------------------------------------------------
    // CONSUMABLES
    // ---------------------------------------------------------------------------
    {
        id: "recipe_health_potion",
        resultItemId: "health_potion",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "medicinal_herb", quantity: 2 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 10,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_mana_potion",
        resultItemId: "mana_potion",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "mana_crystal", quantity: 1 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 10,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_antidote_herb",
        resultItemId: "antidote_herb",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "medicinal_herb", quantity: 1 },
            { itemId: "poison_herb", quantity: 1 },
        ],
        goldCost: 8,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_travel_rations",
        resultItemId: "travel_rations",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "herb_bundle", quantity: 1 },
            { itemId: "mushroom", quantity: 1 },
        ],
        goldCost: 2,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_greater_health_potion",
        resultItemId: "greater_health_potion",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "medicinal_herb", quantity: 4 },
            { itemId: "rare_mushroom", quantity: 1 },
            { itemId: "mana_crystal", quantity: 1 },
        ],
        goldCost: 25,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_greater_mana_potion",
        resultItemId: "greater_mana_potion",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "greater_mana_crystal", quantity: 1 },
            { itemId: "herb_bundle", quantity: 2 },
        ],
        goldCost: 25,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_stamina_potion",
        resultItemId: "stamina_potion",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "medicinal_herb", quantity: 2 },
            { itemId: "moon_mint_leaves", quantity: 1 },
        ],
        goldCost: 15,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_crest_potion",
        resultItemId: "crest_potion",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "angelic_essence", quantity: 1 },
            { itemId: "mana_crystal", quantity: 1 },
        ],
        goldCost: 30,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_elixir_strength",
        resultItemId: "elixir_of_strength",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "dragon_fang", quantity: 1 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 35,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_elixir_agility",
        resultItemId: "elixir_of_agility",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "wolf_fang", quantity: 1 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 35,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_elixir_wisdom",
        resultItemId: "elixir_of_wisdom",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "mana_crystal", quantity: 2 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 35,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_elixir_defense",
        resultItemId: "elixir_of_defense",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "boar_tusk", quantity: 1 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 35,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_elixir_luck",
        resultItemId: "elixir_of_luck",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "fox_pelt", quantity: 1 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 35,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_smelling_salts",
        resultItemId: "smelling_salts",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "medicinal_herb", quantity: 1 },
            { itemId: "moon_mint_leaves", quantity: 1 },
        ],
        goldCost: 5,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_bandage",
        resultItemId: "bandage",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "cotton", quantity: 2 },
        ],
        goldCost: 2,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_salve",
        resultItemId: "salve",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "medicinal_herb", quantity: 2 },
            { itemId: "blessed_oil", quantity: 1 },
        ],
        goldCost: 8,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_energy_drink",
        resultItemId: "energy_drink",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "herb_bundle", quantity: 2 },
            { itemId: "moon_mint_leaves", quantity: 1 },
        ],
        goldCost: 12,
        craftTimeGameDays: 0,
    },

    // ---------------------------------------------------------------------------
    // COMPOSITE MATERIALS
    // ---------------------------------------------------------------------------
    {
        id: "recipe_refined_ingot",
        resultItemId: "refined_ingot",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "iron_ore", quantity: 3 },
            { itemId: "smelting_flux", quantity: 1 },
        ],
        goldCost: 5,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_star_ingot",
        resultItemId: "star_ingot",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "star_iron_ore", quantity: 3 },
            { itemId: "smelting_flux", quantity: 1 },
        ],
        goldCost: 20,
        craftTimeGameDays: 1,
    },
    {
        id: "recipe_silver_ingot",
        resultItemId: "silver_ingot",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "silver_ore", quantity: 3 },
            { itemId: "smelting_flux", quantity: 1 },
        ],
        goldCost: 10,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_gold_ingot",
        resultItemId: "gold_ingot",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "gold_ore", quantity: 3 },
            { itemId: "smelting_flux", quantity: 1 },
        ],
        goldCost: 15,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_primal_ingot",
        resultItemId: "primal_ingot",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "meteorite_ore", quantity: 3 },
            { itemId: "smelting_flux", quantity: 1 },
            { itemId: "primal_leather", quantity: 1 },
        ],
        goldCost: 40,
        craftTimeGameDays: 2,
    },
    {
        id: "recipe_alchemical_silver",
        resultItemId: "alchemical_silver",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "silver_ore", quantity: 2 },
            { itemId: "mana_crystal", quantity: 1 },
        ],
        goldCost: 20,
        craftTimeGameDays: 1,
    },
    {
        id: "recipe_enchanted_fabric",
        resultItemId: "enchanted_fabric",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "spider_silk", quantity: 2 },
            { itemId: "mana_crystal", quantity: 1 },
        ],
        goldCost: 25,
        craftTimeGameDays: 1,
    },
    {
        id: "recipe_blessed_oil",
        resultItemId: "blessed_oil",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "angelic_essence", quantity: 1 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 15,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_poison_vial",
        resultItemId: "poison_vial",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "poison_herb", quantity: 2 },
            { itemId: "glass_vial", quantity: 1 },
        ],
        goldCost: 10,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_mana_potion_base",
        resultItemId: "mana_potion_base",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "mana_crystal", quantity: 1 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 5,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_health_potion_base",
        resultItemId: "health_potion_base",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "medicinal_herb", quantity: 2 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 5,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_mana_concentrate",
        resultItemId: "mana_concentrate",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "greater_mana_crystal", quantity: 1 },
            { itemId: "mana_crystal", quantity: 1 },
        ],
        goldCost: 25,
        craftTimeGameDays: 1,
    },
    {
        id: "recipe_antidote_base",
        resultItemId: "antidote_base",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "medicinal_herb", quantity: 1 },
            { itemId: "poison_herb", quantity: 1 },
        ],
        goldCost: 5,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_elixir_base",
        resultItemId: "elixir_base",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "herb_bundle", quantity: 2 },
            { itemId: "mana_crystal", quantity: 1 },
        ],
        goldCost: 10,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_enchanting_dust",
        resultItemId: "enchanting_dust",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "mana_crystal", quantity: 2 },
            { itemId: "silver_ore", quantity: 1 },
        ],
        goldCost: 20,
        craftTimeGameDays: 1,
    },
    {
        id: "recipe_alchemy_catalyst",
        resultItemId: "alchemy_catalyst",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "rare_mushroom", quantity: 1 },
            { itemId: "mana_crystal", quantity: 1 },
        ],
        goldCost: 15,
        craftTimeGameDays: 1,
    },
    {
        id: "recipe_smelting_flux",
        resultItemId: "smelting_flux",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "copper_ore", quantity: 2 },
            { itemId: "herb_bundle", quantity: 1 },
        ],
        goldCost: 5,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_tailoring_thread",
        resultItemId: "tailoring_thread",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "cotton", quantity: 3 },
            { itemId: "spider_silk", quantity: 1 },
        ],
        goldCost: 3,
        craftTimeGameDays: 0,
    },
    {
        id: "recipe_leather_treatment",
        resultItemId: "leather_treatment",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "hard_leather", quantity: 1 },
            { itemId: "blessed_oil", quantity: 1 },
        ],
        goldCost: 10,
        craftTimeGameDays: 1,
    },
    {
        id: "recipe_wood_preserver",
        resultItemId: "wood_preserver",
        resultQuantity: 1,
        materialCosts: [
            { itemId: "herb_bundle", quantity: 2 },
            { itemId: "rare_mushroom", quantity: 1 },
        ],
        goldCost: 8,
        craftTimeGameDays: 0,
    },
];