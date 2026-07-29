import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceRepo } from "../services/repositories/WorkspaceRepo";

export const useWorkspaces = (userId: string | undefined) => {
    return useQuery({
        queryKey: ["workspaces", userId],
        queryFn: () => workspaceRepo.listByUser(userId!),
        enabled: !!userId,
    });
};

export default useWorkspaces;

export const useWorkspaceMembers = (workspaceId: string | null) => {
    return useQuery({
        queryKey: ["workspace_members", workspaceId],
        queryFn: () => workspaceRepo.listMembers(workspaceId!),
        enabled: !!workspaceId,
    });
};

export const useWorkspaceMutations = (userId: string | undefined) => {
    const queryClient = useQueryClient();

    const createWs = useMutation({
        mutationFn: (name: string) => workspaceRepo.create(name, userId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces", userId] });
        },
    });

    const inviteMember = useMutation({
        mutationFn: ({
            workspaceId,
            email,
        }: {
            workspaceId: string;
            email: string;
        }) => workspaceRepo.createInvite(workspaceId, userId!, email),
    });

    const updateWs = useMutation({
        mutationFn: ({ workspaceId, name }: { workspaceId: string; name: string }) =>
            workspaceRepo.update(workspaceId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
    });

    const deleteWs = useMutation({
        mutationFn: (workspaceId: string) => workspaceRepo.delete(workspaceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
    });

    const leaveWs = useMutation({
        mutationFn: (workspaceId: string) => workspaceRepo.leave(workspaceId, userId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
    });

    const removeMember = useMutation({
        mutationFn: ({
            workspaceId,
            memberUserId,
        }: {
            workspaceId: string;
            memberUserId: string;
        }) => workspaceRepo.removeMember(workspaceId, memberUserId),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["workspace_members", variables.workspaceId],
            });
        },
    });

    return { createWs, updateWs, inviteMember, deleteWs, leaveWs, removeMember };
};

export const usePendingInvites = (userEmail: string | undefined) => {
    return useQuery({
        queryKey: ["pending_invites", userEmail],
        queryFn: () => workspaceRepo.listPendingInvites(userEmail!),
        enabled: !!userEmail,
        refetchInterval: 10_000, // 每 10 秒輪詢新邀請
    });
};

export const useInviteAction = (userEmail: string | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            inviteId,
            status,
        }: {
            inviteId: string;
            status: "accepted" | "rejected";
        }) => workspaceRepo.processInvite(inviteId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pending_invites", userEmail] });
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
    });
};
