// ============================================================================
// SERVICE NPCS SEED DATA
// ============================================================================
// Pure utility/function NPCs: item vendors, bankers, quest boards, innkeepers,
// fast travel points, and bounty offices. These are not WorldNpcInstances; they
// have no combat stats, no Trust/Love, and no Universal Interaction Menu.
// Talking to a ServiceNpcDef opens its service UI directly.

import type { ServiceNpcDef } from "../schemas/schemas";
import { ServiceType } from "../schemas/schemas";

export const SERVICE_NPCS: ServiceNpcDef[] = [
    // ---------------------------------------------------------------------------
    // VERDANT VALE
    // ---------------------------------------------------------------------------
    {
        id: "svc_vv_general_store",
        displayName: "Vale General Store",
        locationId: "vv_vale_village",
        serviceType: ServiceType.ItemVendor,
    },
    {
        id: "svc_vv_inn",
        displayName: "Vale Village Inn",
        locationId: "vv_vale_village",
        serviceType: ServiceType.Innkeeper,
    },
    {
        id: "svc_vv_questboard",
        displayName: "Vale Quest Board",
        locationId: "vv_vale_village",
        serviceType: ServiceType.QuestBoard,
    },
    {
        id: "svc_vv_bank",
        displayName: "Vale Merchant Guild Bank",
        locationId: "vv_vale_village",
        serviceType: ServiceType.Bank,
    },
    {
        id: "svc_vv_fasttravel",
        displayName: "Vale Crossroads Signpost",
        locationId: "vv_vale_village",
        serviceType: ServiceType.FastTravel,
    },
    {
        id: "svc_vv_bountyoffice",
        displayName: "Vale Guard Post",
        locationId: "vv_vale_village",
        serviceType: ServiceType.BountyOffice,
    },

    // ---------------------------------------------------------------------------
    // AETHERMOOR
    // ---------------------------------------------------------------------------
    {
        id: "svc_ae_arcanum_emporium",
        displayName: "Arcanum Emporium",
        locationId: "ae_aethermoor_city",
        serviceType: ServiceType.ItemVendor,
    },
    {
        id: "svc_ae_inn",
        displayName: "Aethermoor Rest House",
        locationId: "ae_aethermoor_city",
        serviceType: ServiceType.Innkeeper,
    },
    {
        id: "svc_ae_questboard",
        displayName: "Aethermoor Quest Board",
        locationId: "ae_aethermoor_city",
        serviceType: ServiceType.QuestBoard,
    },
    {
        id: "svc_ae_bank",
        displayName: "Aethermoor Vault",
        locationId: "ae_aethermoor_city",
        serviceType: ServiceType.Bank,
    },
    {
        id: "svc_ae_fasttravel",
        displayName: "Aethermoor Transit Circle",
        locationId: "ae_aethermoor_city",
        serviceType: ServiceType.FastTravel,
    },
    {
        id: "svc_ae_bountyoffice",
        displayName: "Aethermoor Watch Office",
        locationId: "ae_aethermoor_city",
        serviceType: ServiceType.BountyOffice,
    },

    // ---------------------------------------------------------------------------
    // CRIMSON MARCH
    // ---------------------------------------------------------------------------
    {
        id: "svc_cm_supply_post",
        displayName: "Crimson Supply Post",
        locationId: "cm_crimson_camp",
        serviceType: ServiceType.ItemVendor,
    },
    {
        id: "svc_cm_inn",
        displayName: "Crimson March Inn",
        locationId: "cm_crimson_camp",
        serviceType: ServiceType.Innkeeper,
    },
    {
        id: "svc_cm_questboard",
        displayName: "Crimson March Quest Board",
        locationId: "cm_crimson_camp",
        serviceType: ServiceType.QuestBoard,
    },
    {
        id: "svc_cm_fasttravel",
        displayName: "Crimson March Waypoint",
        locationId: "cm_crimson_camp",
        serviceType: ServiceType.FastTravel,
    },
    {
        id: "svc_cm_bountyoffice",
        displayName: "Crimson March Warden Post",
        locationId: "cm_crimson_camp",
        serviceType: ServiceType.BountyOffice,
    },

    // ---------------------------------------------------------------------------
    // WHISPERING WOOD
    // ---------------------------------------------------------------------------
    {
        id: "svc_ww_questboard",
        displayName: "Misty Treeline Quest Board",
        locationId: "ww_misty_treeline",
        serviceType: ServiceType.QuestBoard,
    },

    // ---------------------------------------------------------------------------
    // MOUNTAIN MONASTERY
    // ---------------------------------------------------------------------------
    {
        id: "svc_mm_pilgrim_supplies",
        displayName: "Pilgrim Supplies",
        locationId: "mm_monastery_gate",
        serviceType: ServiceType.ItemVendor,
    },
    {
        id: "svc_mm_inn",
        displayName: "Monastery Guest House",
        locationId: "mm_monastery_gate",
        serviceType: ServiceType.Innkeeper,
    },
    {
        id: "svc_mm_questboard",
        displayName: "Monastery Quest Board",
        locationId: "mm_monastery_gate",
        serviceType: ServiceType.QuestBoard,     // ADDED
    },
    {
        id: "svc_mm_fasttravel",
        displayName: "Monastery Gate Waypoint",
        locationId: "mm_monastery_gate",
        serviceType: ServiceType.FastTravel,
    },
    {
        id: "svc_mm_bountyoffice",
        displayName: "Monastery Warden Shrine",
        locationId: "mm_monastery_gate",
        serviceType: ServiceType.BountyOffice,
    },

    // ---------------------------------------------------------------------------
    // AURIC COURT
    // ---------------------------------------------------------------------------
    {
        id: "svc_ac_royal_outfitter",
        displayName: "Royal Outfitter",
        locationId: "ac_auric_court",
        serviceType: ServiceType.ItemVendor,
    },
    {
        id: "svc_ac_grand_inn",
        displayName: "Auric Grand Inn",
        locationId: "ac_auric_court",
        serviceType: ServiceType.Innkeeper,
    },
    {
        id: "svc_ac_questboard",
        displayName: "Auric Court Quest Board",
        locationId: "ac_auric_court",
        serviceType: ServiceType.QuestBoard,
    },
    {
        id: "svc_ac_bank",
        displayName: "Auric Treasury",
        locationId: "ac_auric_court",
        serviceType: ServiceType.Bank,
    },
    {
        id: "svc_ac_fasttravel",
        displayName: "Auric Court Waypoint",
        locationId: "ac_auric_court",
        serviceType: ServiceType.FastTravel,
    },
    {
        id: "svc_ac_bountyoffice",
        displayName: "Auric Magistrate Office",
        locationId: "ac_auric_court",
        serviceType: ServiceType.BountyOffice,
    },

    // ---------------------------------------------------------------------------
    // SUNKEN SANCTUM
    // ---------------------------------------------------------------------------
    {
        id: "svc_ss_questboard",
        displayName: "Crater's Edge Quest Board",
        locationId: "ss_craters_edge",
        serviceType: ServiceType.QuestBoard,
    },
    {
        id: "svc_ss_fasttravel",
        displayName: "Crater's Edge Waypoint",
        locationId: "ss_craters_edge",
        serviceType: ServiceType.FastTravel,
    },

    // ---------------------------------------------------------------------------
    // CELESTIAL THRESHOLD
    // ---------------------------------------------------------------------------
    {
        id: "svc_ct_fasttravel",
        displayName: "Threshold Gate Waypoint",
        locationId: "ct_threshold_gate",
        serviceType: ServiceType.FastTravel,
    },
    {
        id: "svc_ct_questboard",
        displayName: "Threshold Gate Quest Board",
        locationId: "ct_threshold_gate",
        serviceType: ServiceType.QuestBoard,   // ADDED
    },
    {
        id: "svc_ct_bank",
        displayName: "Celestial Vault",
        locationId: "ct_threshold_gate",
        serviceType: ServiceType.Bank,          // ADDED for endgame convenience
    },
];