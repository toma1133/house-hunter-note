import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { conditionTemplateRepo } from "../services/repositories/ConditionTemplateRepo";
import {
    ConditionTemplateVM,
    DEFAULT_CONDITIONS_TEMPLATE,
} from "../models/types/ConditionTemplateTypes";

const useConditionTemplate = (
    workspaceId?: string | null,
) => {
    return useQuery<ConditionTemplateVM>({
        queryKey: ["conditionTemplate", workspaceId],
        queryFn: async () => {
            const existing = await conditionTemplateRepo.getTemplate(
                workspaceId,
            );
            if (existing) {
                return existing;
            }
            return {
                workspace_id: workspaceId || null,
                mustHaves: [...DEFAULT_CONDITIONS_TEMPLATE.mustHaves],
                niceToHaves: [...DEFAULT_CONDITIONS_TEMPLATE.niceToHaves],
            };
        },
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    });
};

export default useConditionTemplate;
