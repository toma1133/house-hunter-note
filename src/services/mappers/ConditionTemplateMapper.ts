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
        user_id: row.user_id,
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
        user_id: vm.user_id,
        must_haves: JSON.stringify(vm.mustHaves),
        nice_to_haves: JSON.stringify(vm.niceToHaves),
    };
};

export const toConditionTemplateUpdate = (
    vm: Partial<ConditionTemplateVM>,
): ConditionTemplateRowUpdate => {
    return {
        ...(vm.user_id ? { user_id: vm.user_id } : {}),
        must_haves: vm.mustHaves ? JSON.stringify(vm.mustHaves) : undefined,
        nice_to_haves: vm.niceToHaves
            ? JSON.stringify(vm.niceToHaves)
            : undefined,
        updated_at: new Date().toISOString(),
    };
};
