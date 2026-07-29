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
    workspace_id?: string | null;
    mustHaves: ConditionItem[];
    niceToHaves: ConditionItem[];
    created_at?: string;
    updated_at?: string;
};

export const DEFAULT_CONDITIONS_TEMPLATE = {
    mustHaves: [],
    niceToHaves: [],
};
