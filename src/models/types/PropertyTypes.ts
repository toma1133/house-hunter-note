import type { Tables, TablesInsert, TablesUpdate } from "./DatabaseTypes";

export type PropertyRow = Tables<"properties">;
export type PropertyRowInsert = TablesInsert<"properties">;
export type PropertyRowUpdate = TablesUpdate<"properties">;

export type ConditionRow = Tables<"conditions">;
export type PropertyConditionRow = Tables<"property_conditions">;
export type PropertyRoomImageRow = Tables<"property_room_images">;
export type PropertyTransactionRow = Tables<"property_transactions">;

export type PropertyConditionDetail = {
    id: string;
    condition_id: string;
    text: string;
    checked: boolean;
};

export type PropertyCondition = {
    mustHaves: PropertyConditionDetail[];
    niceToHaves: PropertyConditionDetail[];
};

export type PropertyTransaction = {
    id: string;
    date: string;
    floor: string;
    totalPrice: string;
    unitPrice: string;
    housePing?: string;
    parkingPing?: string;
    parkingPrice?: string;
    unitPriceNoParking?: string;
    layout?: string;
    parkingType?: string;
    notes?: string;
};

export type PropertyRoomImage = {
    id: string;
    name: string;
    url: string;
};

export type PropertyVM = PropertyRow & {
    conditions?: PropertyCondition | null;
    transactions?: PropertyTransaction[] | null;
    roomImages?: PropertyRoomImage[] | null;
};
