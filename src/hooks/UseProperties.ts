import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { propertyRepo } from "../services/repositories/PropertyRepo";
import { toPropertiesVM } from "../services/mappers/PropertyMapper";
import type { PropertyVM } from "../models/types/PropertyTypes";

const useProperties = (userId: string | undefined) => {
    return useQuery<PropertyVM[]>({
        queryKey: ["properties", userId],
        queryFn: async () => {
            const rows = await propertyRepo.list();
            return toPropertiesVM(rows);
        },
        enabled: !!userId,
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    });
};

export default useProperties;
