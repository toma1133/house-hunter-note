import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { conditionTemplateRepo } from "../services/repositories/ConditionTemplateRepo";
import {
    ConditionTemplateVM,
    DEFAULT_CONDITIONS_TEMPLATE,
} from "../models/types/ConditionTemplateTypes";

const useConditionTemplate = (userId: string | undefined) => {
    return useQuery<ConditionTemplateVM>({
        queryKey: ["conditionTemplate", userId],
        queryFn: async () => {
            if (!userId) {
                return { user_id: "", ...DEFAULT_CONDITIONS_TEMPLATE };
            }
            const existing = await conditionTemplateRepo.getByUserId(userId);
            if (existing) {
                return existing;
            }
            return {
                user_id: userId,
                mustHaves: [...DEFAULT_CONDITIONS_TEMPLATE.mustHaves],
                niceToHaves: [...DEFAULT_CONDITIONS_TEMPLATE.niceToHaves],
            };
        },
        enabled: !!userId,
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    });
};

export default useConditionTemplate;
