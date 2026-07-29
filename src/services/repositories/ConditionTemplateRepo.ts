import { supabaseClient } from "../SupabaseClient";
import {
    toConditionTemplateVM,
    toConditionTemplateInsert,
} from "../mappers/ConditionTemplateMapper";
import type { ConditionTemplateVM } from "../../models/types/ConditionTemplateTypes";

export const conditionTemplateRepo = {
    async getTemplate(
        workspaceId?: string | null,
    ): Promise<ConditionTemplateVM | null> {
        let query = supabaseClient
            .from("condition_templates")
            .select("*");

        if (workspaceId) {
            query = query.eq("workspace_id", workspaceId);
        } else {
            query = query.is("workspace_id", null);
        }

        const { data, error } = await query.maybeSingle();

        if (error) throw error;
        if (!data) return null;
        return toConditionTemplateVM(data);
    },

    async upsert(
        payload: ConditionTemplateVM,
    ): Promise<ConditionTemplateVM | null> {
        // If there's no id, we might want to check if one exists first to prevent duplicates
        // But the frontend usually passes the existing id. 
        // Just in case, let's try to find an existing one if id is missing.
        let targetId = payload.id;
        if (!targetId) {
            const existing = await this.getTemplate(payload.workspace_id);
            if (existing && existing.id) {
                targetId = existing.id;
            }
        }

        const insertPayload = toConditionTemplateInsert({ ...payload, id: targetId });
        
        // Remove onConflict: "user_id" so it defaults to primary key "id"
        const { data, error } = await supabaseClient
            .from("condition_templates")
            .upsert(insertPayload) 
            .select("*")
            .single();

        if (error) throw error;
        return data ? toConditionTemplateVM(data) : null;
    },
};
