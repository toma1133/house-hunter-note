import type { Tables, TablesInsert, TablesUpdate } from "./DatabaseTypes";

export type ConditionTemplateRow = Tables<"condition_presets">;
export type ConditionTemplateRowInsert = TablesInsert<"condition_presets">;
export type ConditionTemplateRowUpdate = TablesUpdate<"condition_presets">;

export type TemplateConditionRow = Tables<"preset_conditions">;

export type ConditionItem = {
    id: string; // ID of the preset_condition
    condition_id: string; // ID of the condition dictionary entry
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
