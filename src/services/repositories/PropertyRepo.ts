import { supabaseClient } from "../SupabaseClient";
import { toPropertyInsert, toPropertyUpdate } from "../mappers/PropertyMapper";
import { PropertyRow, PropertyVM } from "../../models/types/PropertyTypes";
import IRepo from "./IRepo";

export const propertyRepo: IRepo<PropertyRow, PropertyVM, PropertyVM, string> =
    {
        async getById(id: string | undefined): Promise<PropertyRow | null> {
            if (id === undefined || id === null) return null;
            const { data, error } = await supabaseClient
                .from("properties")
                .select("*")
                .eq("id", id)
                .maybeSingle();
            if (error) throw error;
            return data ?? null;
        },
        async list(parentId: string | undefined): Promise<PropertyRow[]> {
            const { data, error } = await supabaseClient
                .from("properties")
                .select("*")
                .order("created_at", { ascending: true });
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
