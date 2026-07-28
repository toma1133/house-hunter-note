import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyRepo } from "../services/repositories/PropertyRepo";
import type { PropertyVM } from "../models/types/PropertyTypes";

const usePropertyMutations = () => {
    const qc = useQueryClient();
    const insert = useMutation({
        mutationKey: ["properties", "insert"],
        mutationFn: (payload: PropertyVM) => propertyRepo.insert(payload),
        onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ["property", data?.id] });
            qc.invalidateQueries({ queryKey: ["properties"] });
        },
    });
    const update = useMutation({
        mutationKey: ["property", "update"],
        mutationFn: (payload: PropertyVM) => propertyRepo.update(payload),
        onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ["property", data?.id] });
            qc.invalidateQueries({ queryKey: ["properties"] });
        },
    });
    const upsert = useMutation({
        mutationKey: ["property", "upsert"],
        mutationFn: (payload: PropertyVM) => propertyRepo.upsert(payload),
        onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ["property", data?.id] });
            qc.invalidateQueries({ queryKey: ["properties"] });
        },
    });
    const remove = useMutation({
        mutationKey: ["property", "remove"],
        mutationFn: (id: string) => propertyRepo.delete(id),
        onSuccess: (_, id) => {
            qc.invalidateQueries({ queryKey: ["property", id] });
            qc.invalidateQueries({ queryKey: ["properties"] });
        },
    });
    const anyPending =
        insert.isPending ||
        update.isPending ||
        upsert.isPending ||
        remove.isPending;

    return { insert, update, upsert, remove, anyPending };
};

export default usePropertyMutations;
