import { useMutation, useQueryClient } from "@tanstack/react-query";
import { conditionTemplateRepo } from "../services/repositories/ConditionTemplateRepo";
import type { ConditionTemplateVM } from "../models/types/ConditionTemplateTypes";

const useConditionTemplateMutations = () => {
    const qc = useQueryClient();
    const saveTemplate = useMutation({
        mutationKey: ["conditionTemplate", "save"],
        mutationFn: (payload: ConditionTemplateVM) =>
            conditionTemplateRepo.upsert(payload),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ["conditionTemplate"],
            });
        },
    });

    return { saveTemplate, isPending: saveTemplate.isPending };
};

export default useConditionTemplateMutations;
