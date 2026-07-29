import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { propertyRepo } from "../services/repositories/PropertyRepo";
import { toPropertiesVM } from "../services/mappers/PropertyMapper";
import type { PropertyVM } from "../models/types/PropertyTypes";

const useProperties = (
    userId: string | undefined,
    workspaceId?: string | undefined,
) => {
    return useQuery<PropertyVM[]>({
        queryKey: ["properties", userId, workspaceId],
        queryFn: async () => {
            const rows = await propertyRepo.list(workspaceId);
            return toPropertiesVM(rows);
        },
        enabled: !!userId && !!workspaceId,
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    });
};

export default useProperties;
