import parseJsonOrString from "../../utils/ParseJsonOrString";
import type {
    PropertyRow,
    PropertyRowInsert,
    PropertyRowUpdate,
    PropertyCondition,
    PropertyTransaction,
    PropertyRoomImage,
    PropertyVM,
} from "../../models/types/PropertyTypes";

export const toPropertyVM = (row: PropertyRow): PropertyVM => {
    return {
        ...row,
        conditions: parseJsonOrString<PropertyCondition>(row.conditions),
        transactions: parseJsonOrString<PropertyTransaction[]>(
            row.transactions,
        ),
        roomImages: parseJsonOrString<PropertyRoomImage[]>(row.roomImages),
    };
};

export const toPropertiesVM = (rows: PropertyRow[]): PropertyVM[] => {
    return rows.map(toPropertyVM);
};

export const toPropertyInsert = (vm: PropertyVM): PropertyRowInsert => {
    return {
        address: vm.address,
        buildingType: vm.buildingType,
        city: vm.city,
        community: vm.community,
        conditions: JSON.stringify(vm.conditions),
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
        roomImages: JSON.stringify(vm.roomImages),
        score: vm.score,
        totalPrice: vm.totalPrice,
        totalPing: vm.totalPing,
        totalUnits: vm.totalUnits,
        transactions: JSON.stringify(vm.transactions),
        unit: vm.unit,
        user_id: vm.user_id,
        workspace_id: vm.workspace_id,
    };
};

export const toPropertyUpdate = (
    vm: Partial<PropertyVM>,
): PropertyRowUpdate => {
    return {
        address: vm.address,
        buildingType: vm.buildingType,
        city: vm.city,
        community: vm.community,
        conditions: JSON.stringify(vm.conditions),
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
        roomImages: JSON.stringify(vm.roomImages),
        score: vm.score,
        totalPrice: vm.totalPrice,
        totalPing: vm.totalPing,
        totalUnits: vm.totalUnits,
        transactions: JSON.stringify(vm.transactions),
        unit: vm.unit,
        user_id: vm.user_id,
        workspace_id: vm.workspace_id,
    };
};
