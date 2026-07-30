import { supabaseClient } from "../SupabaseClient";
import type { ConditionTemplateVM } from "../../models/types/ConditionTemplateTypes";

export const conditionTemplateRepo = {
    async getTemplate(
        workspaceId?: string | null,
    ): Promise<ConditionTemplateVM | null> {
        let query = supabaseClient
            .from("condition_presets")
            .select(`
                *,
                preset_conditions(
                    id,
                    type,
                    condition_id,
                    conditions(text)
                )
            `);

        if (workspaceId) {
            query = query.eq("workspace_id", workspaceId);
        } else {
            query = query.is("workspace_id", null);
        }

        const { data, error } = await query.maybeSingle();

        if (error) throw error;
        if (!data) return null;

        const presetConditions = (data.preset_conditions as unknown as any[]) || [];
        const mustHaves = presetConditions
            .filter((pc) => pc.type === "must_have")
            .map((pc) => ({
                id: pc.id,
                condition_id: pc.condition_id,
                text: pc.conditions?.text || "",
                checked: false,
            }));

        const niceToHaves = presetConditions
            .filter((pc) => pc.type === "nice_to_have")
            .map((pc) => ({
                id: pc.id,
                condition_id: pc.condition_id,
                text: pc.conditions?.text || "",
                checked: false,
            }));

        return {
            id: data.id,
            workspace_id: data.workspace_id,
            created_at: data.created_at,
            updated_at: data.updated_at,
            mustHaves,
            niceToHaves,
        };
    },

    async upsert(
        payload: ConditionTemplateVM,
    ): Promise<ConditionTemplateVM | null> {
        let targetId = payload.id;
        if (!targetId) {
            const existing = await this.getTemplate(payload.workspace_id);
            if (existing && existing.id) {
                targetId = existing.id;
            }
        }

        // 1. Upsert condition_presets
        const { data: presetData, error: presetError } = await supabaseClient
            .from("condition_presets")
            .upsert({
                ...(targetId ? { id: targetId } : {}),
                workspace_id: payload.workspace_id ?? null,
            })
            .select("*")
            .single();

        if (presetError) throw presetError;
        const presetId = presetData.id;

        // 2. Delete old preset_conditions
        await supabaseClient
            .from("preset_conditions")
            .delete()
            .eq("preset_id", presetId);

        // 3. Ensure all conditions exist and get their IDs
        const allItems = [
            ...payload.mustHaves.map((x) => ({ ...x, type: "must_have" })),
            ...payload.niceToHaves.map((x) => ({ ...x, type: "nice_to_have" })),
        ];

        if (allItems.length > 0) {
            let existingCondsQuery = supabaseClient.from("conditions").select("*");
            if (payload.workspace_id) {
                existingCondsQuery = existingCondsQuery.eq("workspace_id", payload.workspace_id);
            } else {
                existingCondsQuery = existingCondsQuery.is("workspace_id", null);
            }
            
            const { data: existingConds } = await existingCondsQuery;
            const existingCondMap = new Map(
                (existingConds || []).map((c) => [c.text, c.id]),
            );

            const presetConditionsToInsert = [];

            for (const item of allItems) {
                let conditionId = item.condition_id;

                if (!conditionId || !existingCondMap.has(item.text)) {
                    if (existingCondMap.has(item.text)) {
                        conditionId = existingCondMap.get(item.text)!;
                    } else {
                        const { data: newCond } = await supabaseClient
                            .from("conditions")
                            .insert({
                                text: item.text,
                                workspace_id: payload.workspace_id ?? null,
                            })
                            .select()
                            .single();
                        if (newCond) {
                            conditionId = newCond.id;
                            existingCondMap.set(item.text, conditionId);
                        }
                    }
                }

                if (conditionId) {
                    presetConditionsToInsert.push({
                        preset_id: presetId,
                        condition_id: conditionId,
                        type: item.type,
                    });
                }
            }

            if (presetConditionsToInsert.length > 0) {
                await supabaseClient
                    .from("preset_conditions")
                    .insert(presetConditionsToInsert);
            }
        }

        return await this.getTemplate(payload.workspace_id);
    },
};
