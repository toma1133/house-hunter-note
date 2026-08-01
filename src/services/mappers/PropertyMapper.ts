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
        housePing: t.house_ping !== null ? String(t.house_ping) : "",
        parkingPing: t.parking_ping !== null ? String(t.parking_ping) : "",
        parkingPrice: t.parking_price !== null ? String(t.parking_price) : "",
        unitPriceNoParking: t.unit_price_no_parking !== null ? String(t.unit_price_no_parking) : "",
        layout: t.layout || "",
        parkingType: t.parking_type || "",
        notes: t.notes || "",
    }));

    const roomImages = (row.property_room_images || []).map((i: any) => ({
        id: i.id,
        name: i.name || "",
        url: i.url || "",
    }));

    const mainBuildingPing = row.mainBuildingPing ?? 0;
    const subBuildingPing = row.subBuildingPing ?? 0;
    const indoorPing = (mainBuildingPing || subBuildingPing) 
        ? Math.round((mainBuildingPing + subBuildingPing) * 100) / 100 
        : (row.indoorPing ?? 0);

    return {
        ...row,
        mainBuildingPing,
        subBuildingPing,
        indoorPing,
        parkingCount: row.parkingCount ?? 0,
        conditions: { mustHaves, niceToHaves },
        transactions,
        roomImages,
    };
};

export const toPropertiesVM = (rows: any[]): PropertyVM[] => {
    return rows.map(toPropertyVM);
};

export const toPropertyInsert = (vm: Partial<PropertyVM>): PropertyRowInsert => {
    const mainBuilding = vm.mainBuildingPing ?? 0;
    const subBuilding = vm.subBuildingPing ?? 0;
    const indoorTotal = (mainBuilding || subBuilding) 
        ? Math.round((mainBuilding + subBuilding) * 100) / 100 
        : (vm.indoorPing ?? 0);

    return {
        mainBuildingPing: mainBuilding,
        subBuildingPing: subBuilding,
        indoorPing: indoorTotal,
        parkingCount: vm.parkingCount ?? 0,
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
