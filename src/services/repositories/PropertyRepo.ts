import { supabaseClient } from "../SupabaseClient";
import { toPropertyInsert, toPropertyUpdate } from "../mappers/PropertyMapper";
import { PropertyRow, PropertyVM } from "../../models/types/PropertyTypes";
import IRepo from "./IRepo";

async function upsertRelations(propertyId: string, payload: Partial<PropertyVM>) {
    // 1. property_room_images
    if (payload.roomImages !== undefined) {
        await supabaseClient.from("property_room_images").delete().eq("property_id", propertyId);
        if (payload.roomImages && payload.roomImages.length > 0) {
            const imagesToInsert = payload.roomImages.map(img => ({
                property_id: propertyId,
                name: img.name,
                url: img.url,
            }));
            await supabaseClient.from("property_room_images").insert(imagesToInsert);
        }
    }

    // 2. property_transactions
    if (payload.transactions !== undefined) {
        await supabaseClient.from("property_transactions").delete().eq("property_id", propertyId);
        if (payload.transactions && payload.transactions.length > 0) {
            const txsToInsert = payload.transactions.map(tx => ({
                property_id: propertyId,
                date: tx.date || null,
                floor: tx.floor || null,
                total_price: tx.totalPrice ? Number(tx.totalPrice) : null,
                unit_price: tx.unitPrice ? Number(tx.unitPrice) : null,
                house_ping: tx.housePing ? Number(tx.housePing) : null,
                parking_ping: tx.parkingPing ? Number(tx.parkingPing) : null,
                parking_price: tx.parkingPrice ? Number(tx.parkingPrice) : null,
                unit_price_no_parking: tx.unitPriceNoParking ? Number(tx.unitPriceNoParking) : null,
                layout: tx.layout || null,
                parking_type: tx.parkingType || null,
                notes: tx.notes || null,
            }));
            await supabaseClient.from("property_transactions").insert(txsToInsert);
        }
    }

    // 3. property_conditions
    if (payload.conditions !== undefined) {
        await supabaseClient.from("property_conditions").delete().eq("property_id", propertyId);
        
        let workspaceId = payload.workspace_id;
        if (workspaceId === undefined) {
            const { data } = await supabaseClient.from("properties").select("workspace_id").eq("id", propertyId).single();
            workspaceId = data?.workspace_id ?? null;
        }

        const allItems = [
            ...(payload.conditions?.mustHaves || []).map((x) => ({ ...x, type: "must_have" })),
            ...(payload.conditions?.niceToHaves || []).map((x) => ({ ...x, type: "nice_to_have" })),
        ];

        if (allItems.length > 0) {
            let existingCondsQuery = supabaseClient.from("conditions").select("*");
            if (workspaceId) {
                existingCondsQuery = existingCondsQuery.eq("workspace_id", workspaceId);
            } else {
                existingCondsQuery = existingCondsQuery.is("workspace_id", null);
            }
            
            const { data: existingConds } = await existingCondsQuery;
            const existingCondMap = new Map(
                (existingConds || []).map((c) => [c.text, c.id]),
            );

            const propertyConditionsToInsert = [];

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
                                workspace_id: workspaceId ?? null,
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
                    propertyConditionsToInsert.push({
                        property_id: propertyId,
                        condition_id: conditionId,
                        type: item.type,
                        is_checked: item.checked ?? false,
                    });
                }
            }

            if (propertyConditionsToInsert.length > 0) {
                await supabaseClient
                    .from("property_conditions")
                    .insert(propertyConditionsToInsert);
            }
        }
    }
}
export const propertyRepo: IRepo<PropertyRow, PropertyVM, PropertyVM, string> = {
        async getById(id: string | undefined): Promise<PropertyRow | null> {
            if (id === undefined || id === null) return null;
            const { data, error } = await supabaseClient
                .from("properties")
                .select("*, property_room_images(*), property_transactions(*), property_conditions(*, conditions(*))")
                .eq("id", id)
                .maybeSingle();
            if (error) throw error;
            return data ?? null;
        },
        async list(parentId: string | undefined): Promise<PropertyRow[]> {
            let query = supabaseClient
                .from("properties")
                .select("*, property_room_images(*), property_transactions(*), property_conditions(*, conditions(*))")
                .order("created_at", { ascending: true });

            if (parentId) {
                query = query.eq("workspace_id", parentId);
            }

            const { data, error } = await query;
            if (error) throw error;
            return data ?? [];
        },
        async insert(payload: PropertyVM): Promise<PropertyRow | null> {
            const restoredPayload = toPropertyInsert(payload);
            const { data, error } = await supabaseClient
                .from("properties")
                .insert(restoredPayload)
                .select("*")
                .single();
            if (error) throw error;
            if (data) {
                await upsertRelations(data.id, payload);
            }
            return data!;
        },
        async update(patch: Partial<PropertyVM>): Promise<PropertyRow | null> {
            if (patch.id === null || patch.id === undefined) throw "ID is null";
            const restoredPatch = toPropertyUpdate(patch);
            const { data, error } = await supabaseClient
                .from("properties")
                .update(restoredPatch)
                .eq("id", patch.id)
                .select("*")
                .single();
            if (error) throw error;
            if (data) {
                await upsertRelations(patch.id, patch);
            }
            return data;
        },
        async upsert(payload: PropertyVM): Promise<PropertyRow | null> {
            const restoredPayload = toPropertyInsert(payload);
            const { data, error } = await supabaseClient
                .from("properties")
                .upsert(restoredPayload)
                .select("*")
                .single();
            if (error) throw error;
            if (data) {
                await upsertRelations(data.id, payload);
            }
            return data!;
        },
        async delete(id: string): Promise<void> {
            const { error } = await supabaseClient
                .from("properties")
                .delete()
                .eq("id", id);
            if (error) throw error;
        },
    };
