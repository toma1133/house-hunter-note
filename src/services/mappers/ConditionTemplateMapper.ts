import parseJsonOrString from "../../utils/ParseJsonOrString";
import type {
    ConditionTemplateRow,
    ConditionTemplateRowInsert,
    ConditionTemplateRowUpdate,
    ConditionTemplateVM,
    ConditionItem,
} from "../../models/types/ConditionTemplateTypes";

export const toConditionTemplateVM = (
    row: ConditionTemplateRow,
): ConditionTemplateVM => {
    return {
        id: row.id,
        workspace_id: row.workspace_id,
        mustHaves: parseJsonOrString<ConditionItem[]>(row.must_haves) || [],
        niceToHaves: parseJsonOrString<ConditionItem[]>(row.nice_to_haves) || [],
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
};

export const toConditionTemplateInsert = (
    vm: ConditionTemplateVM,
): ConditionTemplateRowInsert => {
    return {
        ...(vm.id ? { id: vm.id } : {}),
        workspace_id: vm.workspace_id ?? null,
        must_haves: JSON.stringify(vm.mustHaves),
        nice_to_haves: JSON.stringify(vm.niceToHaves),
    };
};

export const toConditionTemplateUpdate = (
    vm: Partial<ConditionTemplateVM>,
): ConditionTemplateRowUpdate => {
    return {
        workspace_id: vm.workspace_id,
        must_haves: vm.mustHaves ? JSON.stringify(vm.mustHaves) : undefined,
        nice_to_haves: vm.niceToHaves
            ? JSON.stringify(vm.niceToHaves)
            : undefined,
        updated_at: new Date().toISOString(),
    };
};
