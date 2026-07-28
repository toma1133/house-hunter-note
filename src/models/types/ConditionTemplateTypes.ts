import type { Tables, TablesInsert, TablesUpdate } from "./DatabaseTypes";

export type ConditionTemplateRow = Tables<"condition_templates">;
export type ConditionTemplateRowInsert = TablesInsert<"condition_templates">;
export type ConditionTemplateRowUpdate = TablesUpdate<"condition_templates">;

export type ConditionItem = {
    id: string;
    text: string;
    checked: boolean;
};

export type ConditionTemplateVM = {
    id?: string;
    user_id: string;
    mustHaves: ConditionItem[];
    niceToHaves: ConditionItem[];
    created_at?: string;
    updated_at?: string;
};

export const DEFAULT_CONDITIONS_TEMPLATE = {
    mustHaves: [
        { id: "m1", text: "主客衛浴皆開窗", checked: false },
        { id: "m2", text: "客廳非暗廳 (有直接採光)", checked: false },
        { id: "m3", text: "1km 內無嫌惡設施 (宮廟高壓電塔福地)", checked: false },
        { id: "m4", text: "單層戶數電梯比在 3:1 內", checked: false },
        { id: "m5", text: "無明顯壁刀、路沖等風水瑕疵", checked: false },
        { id: "m6", text: "室內格局方正，無過多走道空間", checked: false },
        { id: "m7", text: "垃圾集中處理 (免追垃圾車)", checked: false },
    ],
    niceToHaves: [
        { id: "n1", text: "有預留電動車充電樁管線設備", checked: false },
        { id: "n2", text: "步行 10 分鐘內有捷運火車站", checked: false },
        { id: "n3", text: "雙面或三面採光", checked: false },
        { id: "n4", text: "有前陽台 (景觀陽台)", checked: false },
        { id: "n5", text: "社區公設實用 (如健身房、收發室)", checked: false },
        { id: "n6", text: "學區優良", checked: false },
    ],
};
