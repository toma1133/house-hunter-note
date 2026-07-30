import type {
    PropertyRowInsert,
    PropertyRowUpdate,
    PropertyVM,
} from "../../models/types/PropertyTypes";

export const toPropertyVM = (row: any): PropertyVM => {
    const pc = row.property_conditions || [];
    const mustHaves = pc.filter((c: any) => c.type === 'must_have').map((c: any) => ({
        id: c.id,
        condition_id: c.condition_id,
        text: c.conditions?.text || "",
        checked: c.is_checked,
    }));
    const niceToHaves = pc.filter((c: any) => c.type === 'nice_to_have').map((c: any) => ({
        id: c.id,
        condition_id: c.condition_id,
        text: c.conditions?.text || "",
        checked: c.is_checked,
    }));

    const transactions = (row.property_transactions || []).map((t: any) => ({
        id: t.id,
        date: t.date || "",
        floor: t.floor || "",
        totalPrice: t.total_price !== null ? String(t.total_price) : "",
        unitPrice: t.unit_price !== null ? String(t.unit_price) : "",
    }));

    const roomImages = (row.property_room_images || []).map((i: any) => ({
        id: i.id,
        name: i.name || "",
        url: i.url || "",
    }));

    return {
        ...row,
        conditions: { mustHaves, niceToHaves },
        transactions,
        roomImages,
    };
};

export const toPropertiesVM = (rows: any[]): PropertyVM[] => {
    return rows.map(toPropertyVM);
};

export const toPropertyInsert = (vm: Partial<PropertyVM>): PropertyRowInsert => {
    return {
        address: vm.address,
        buildingType: vm.buildingType,
        city: vm.city,
        community: vm.community,
        coverImage: vm.coverImage,
        created_at: vm.created_at,
        district: vm.district,
        evCharging: vm.evCharging,
        floorPlanImage: vm.floorPlanImage,
        houseAge: vm.houseAge,
        indoorPing: vm.indoorPing,
        landZoning: vm.landZoning,
        layoutBalconies: vm.layoutBalconies,
        layoutBaths: vm.layoutBaths,
        layoutHalls: vm.layoutHalls,
        layoutRooms: vm.layoutRooms,
        managementFee: vm.managementFee,
        parking: vm.parking,
        parkingPing: vm.parkingPing,
        publicRatio: vm.publicRatio,
        score: vm.score,
        totalPrice: vm.totalPrice,
        totalPing: vm.totalPing,
        totalUnits: vm.totalUnits,
        unit: vm.unit,
        user_id: vm.user_id,
        workspace_id: vm.workspace_id,
    };
};

export const toPropertyUpdate = (
    vm: Partial<PropertyVM>,
): PropertyRowUpdate => {
    return toPropertyInsert(vm);
};
