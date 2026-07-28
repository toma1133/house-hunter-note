import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { propertyRepo } from "../services/repositories/PropertyRepo";
import { toPropertyVM } from "../services/mappers/PropertyMapper";
import type { PropertyVM } from "../models/types/PropertyTypes";

const useProperty = (id: string | undefined) => {
    return useQuery<PropertyVM>({
        queryKey: ["property", id],
        queryFn: async () => {
            const row = await propertyRepo.getById(id);
            if (!row) throw new Error("Property not found");
            return toPropertyVM(row);
        },
        enabled: !!id,
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    });
};

export default useProperty;
