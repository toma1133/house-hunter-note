import type { Tables, TablesInsert, TablesUpdate } from "./DatabaseTypes";

export type PropertyRow = Tables<"properties">;
export type PropertyRowInsert = TablesInsert<"properties">;
export type PropertyRowUpdate = TablesUpdate<"properties">;

export type PropertyConditionDetail = {
    id: string;
    text: string;
    checked: boolean;
};

export type PropertyCondition = {
    mustHaves: PropertyConditionDetail[] | null;
    niceToHaves: PropertyConditionDetail[] | null;
};

export type PropertyTransaction = {
    id: string;
    date: string;
    floor: string;
    totalPrice: string;
    unitPrice: string;
};

export type PropertyRoomImage = {
    id: string;
    name: string;
    url: string;
};

export type PropertyVM = Omit<
    PropertyRow,
    "conditions" | "transactions" | "roomImages"
> & {
    conditions?: PropertyCondition[] | null;
    transactions?: PropertyTransaction[] | null;
    roomImages?: PropertyRoomImage[] | null;
};
