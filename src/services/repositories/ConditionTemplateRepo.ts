import { supabaseClient } from "../SupabaseClient";
import {
    toConditionTemplateVM,
    toConditionTemplateInsert,
} from "../mappers/ConditionTemplateMapper";
import type { ConditionTemplateVM } from "../../models/types/ConditionTemplateTypes";

export const conditionTemplateRepo = {
    async getByUserId(
        userId: string | undefined,
    ): Promise<ConditionTemplateVM | null> {
        if (!userId) return null;
        const { data, error } = await supabaseClient
            .from("condition_templates")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();

        if (error) throw error;
        if (!data) return null;
        return toConditionTemplateVM(data);
    },

    async upsert(
        payload: ConditionTemplateVM,
    ): Promise<ConditionTemplateVM | null> {
        const insertPayload = toConditionTemplateInsert(payload);
        const { data, error } = await supabaseClient
            .from("condition_templates")
            .upsert(insertPayload, { onConflict: "user_id" })
            .select("*")
            .single();

        if (error) throw error;
        return data ? toConditionTemplateVM(data) : null;
    },
};
