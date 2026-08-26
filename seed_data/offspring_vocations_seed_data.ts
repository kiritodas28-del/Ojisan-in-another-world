// ============================================================================
// OFFSPRING VOCATIONS SEED DATA
// ============================================================================
// Possible vocations for offspring NPCs. These are assigned when an offspring
// is generated, representing the adult role they grow into. The list is broad
// enough to cover common medieval/fantasy occupations.

import type { VocationDef } from "../schemas/schemas";

export const OFFSPRING_VOCATIONS: VocationDef[] = [
    {
        id: "vocation_farmer",
        name: "Farmer",
        description: "A caretaker of fields and livestock, steady and tied to the land.",
    },
    {
        id: "vocation_herbalist",
        name: "Herbalist",
        description: "A healer who works with herbs, poultices, and natural remedies.",
    },
    {
        id: "vocation_blacksmith",
        name: "Blacksmith",
        description: "A skilled metalworker who forges tools, weapons, and armor.",
    },
    {
        id: "vocation_merchant",
        name: "Merchant",
        description: "A trader who buys and sells goods, often traveling between towns.",
    },
    {
        id: "vocation_guard",
        name: "Town Guard",
        description: "A member of the local watch, keeping order and protecting citizens.",
    },
    {
        id: "vocation_hunter",
        name: "Hunter",
        description: "A skilled tracker and hunter of wild game, comfortable in the wilderness.",
    },
    {
        id: "vocation_fisherman",
        name: "Fisherman",
        description: "A fisher who works rivers, lakes, or the sea for their daily catch.",
    },
    {
        id: "vocation_miner",
        name: "Miner",
        description: "A laborer who digs for ore, stone, and precious minerals deep underground.",
    },
    {
        id: "vocation_priest",
        name: "Priest",
        description: "A devotee of a deity or shrine, offering spiritual guidance and rituals.",
    },
    {
        id: "vocation_performer",
        name: "Performer",
        description: "An entertainer who sings, dances, or acts, living a wandering life.",
    },
    {
        id: "vocation_barkeep",
        name: "Barkeep",
        description: "The owner or tender of a tavern, serving drinks and managing the common room.",
    },
    {
        id: "vocation_carpenter",
        name: "Carpenter",
        description: "A woodworker who builds furniture, homes, and structures.",
    },
    {
        id: "vocation_tailor",
        name: "Tailor",
        description: "A clothier who sews and repairs garments, from simple clothes to fine dress.",
    },
    {
        id: "vocation_alchemist",
        name: "Alchemist",
        description: "A scholar who experiments with potions, transmutations, and alchemical processes.",
    },
    {
        id: "vocation_scribe",
        name: "Scribe",
        description: "A literate worker who copies documents, writes letters, and keeps records.",
    },
    {
        id: "vocation_stablehand",
        name: "Stablehand",
        description: "A worker who cares for horses and other beasts of burden.",
    },
    {
        id: "vocation_baker",
        name: "Baker",
        description: "A food worker who bakes bread, pastries, and other goods.",
    },
    {
        id: "vocation_weaver",
        name: "Weaver",
        description: "A textile worker who weaves cloth on a loom.",
    },
    {
        id: "vocation_potter",
        name: "Potter",
        description: "A craftsman who shapes clay into pots, vessels, and ceramics.",
    },
    {
        id: "vocation_miller",
        name: "Miller",
        description: "A worker who grinds grain into flour at the local mill.",
    },
    {
        id: "vocation_shepherd",
        name: "Shepherd",
        description: "A herder who tends flocks of sheep or goats.",
    },
    {
        id: "vocation_woodcutter",
        name: "Woodcutter",
        description: "A laborer who fells trees and chops firewood.",
    },
    {
        id: "vocation_mason",
        name: "Mason",
        description: "A builder who works with stone, constructing walls and buildings.",
    },
    {
        id: "vocation_healer",
        name: "Healer",
        description: "A practitioner of medicine, whether through magic or mundane skill.",
    },
    {
        id: "vocation_sellsword",
        name: "Sellsword",
        description: "A mercenary fighter who sells their blade for coin.",
    },
    {
        id: "vocation_rogue",
        name: "Rogue",
        description: "A nimble operator who works in shadows, picking locks and pockets.",
    },
    {
        id: "vocation_archer",
        name: "Archer",
        description: "A ranged fighter skilled with bow or crossbow.",
    },
    {
        id: "vocation_knight",
        name: "Knight",
        description: "A heavily armed and armored warrior bound by oath.",
    },
    {
        id: "vocation_mage",
        name: "Mage",
        description: "A practitioner of the arcane arts, wielding spells and magical knowledge.",
    },
    {
        id: "vocation_ranger",
        name: "Ranger",
        description: "A wilderness expert who patrols wild lands and hunts monsters.",
    },
    {
        id: "vocation_bard",
        name: "Bard",
        description: "A musician and storyteller whose words can inspire or enchant.",
    },
    {
        id: "vocation_merchant_guard",
        name: "Caravan Guard",
        description: "A hired protector who accompanies trade caravans through dangerous routes.",
    },
    {
        id: "vocation_innkeeper",
        name: "Innkeeper",
        description: "The owner of an inn, providing lodging and meals for travelers.",
    },
    {
        id: "vocation_courtier",
        name: "Courtier",
        description: "A member of a noble court, skilled in etiquette and politics.",
    },
    {
        id: "vocation_librarian",
        name: "Librarian",
        description: "A keeper of books and scrolls, maintaining archives of knowledge.",
    },
    {
        id: "vocation_artist",
        name: "Artist",
        description: "A creator of paintings, sculptures, or other works of art.",
    },
    {
        id: "vocation_jeweler",
        name: "Jeweler",
        description: "A craftsman who works with gems and precious metals.",
    },
    {
        id: "vocation_brewmaster",
        name: "Brewmaster",
        description: "A specialist in brewing ales, beers, and meads.",
    },
    {
        id: "vocation_beast_tamer",
        name: "Beast Tamer",
        description: "A handler of animals, from horses to more exotic creatures.",
    },
    {
        id: "vocation_apothecary",
        name: "Apothecary",
        description: "A dispenser of medicines and remedies, similar to but distinct from a herbalist.",
    },
    {
        id: "vocation_fletcher",
        name: "Fletcher",
        description: "A maker of arrows and bolts, essential for ranged fighters.",
    },
    {
        id: "vocation_shepherd_guard",
        name: "Houndmaster",
        description: "A keeper of dogs, whether for hunting, herding, or protection.",
    },
    {
        id: "vocation_exorcist",
        name: "Exorcist",
        description: "A specialist in banishing spirits and corrupt creatures.",
    },
    {
        id: "vocation_astrologer",
        name: "Astrologer",
        description: "A scholar who reads the stars and heavens for signs and guidance.",
    },
    {
        id: "vocation_engineer",
        name: "Engineer",
        description: "A builder of siege engines, bridges, and complex mechanical devices.",
    },
    {
        id: "vocation_sailor",
        name: "Sailor",
        description: "A seafarer who works aboard ships, navigating rivers or oceans.",
    },
    {
        id: "vocation_pirate",
        name: "Pirate",
        description: "A seagoing outlaw who raids ships and settlements.",
    },
    {
        id: "vocation_gladiator",
        name: "Gladiator",
        description: "A fighter who battles in arenas for glory and coin.",
    },
    {
        id: "vocation_monk",
        name: "Monk",
        description: "A disciplined devotee who lives a life of prayer and asceticism.",
    },
    {
        id: "vocation_cultist",
        name: "Cultist",
        description: "A secretive worshiper of forbidden powers.",
    },
];