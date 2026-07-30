import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useWorkspaces, {
    useWorkspaceMutations,
    usePendingInvites,
    useInviteAction,
} from "../hooks/UseWorkspaces";
import PageHeader from "../components/common/PageHeader";
import PendingInvitesBanner from "../components/common/PendingInvitesBanner";
import ShareModal from "../components/common/ShareModal";
import DeleteModal from "../components/common/DeleteModal";
import type { WorkspaceVM } from "../models/types/WorkspaceTypes";
import WorkspaceCard from "../components/workspaces/WorkspaceCard";
import WorkspaceModal from "../components/workspaces/WorkspaceModal";
import EmptyWorkspaceList from "../components/workspaces/EmptyWorkspaceList";
import type LayoutContextType from "../models/types/LayoutContextTypes";

const WorkspacesPage = () => {
    const { session } = useAuth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    const navigate = useNavigate();
    const { setIsPageLoading } = useOutletContext<LayoutContextType>();

    const { data: workspaces = [], isLoading } = useWorkspaces(userId);
    const { createWs, updateWs, deleteWs, leaveWs, inviteMember } = useWorkspaceMutations(userId);

    const { data: pendingInvites = [] } = usePendingInvites(userEmail);
    const inviteAction = useInviteAction(userEmail);

    const isMutating =
        createWs.isPending ||
        updateWs.isPending ||
        deleteWs.isPending ||
        leaveWs.isPending ||
        inviteMember.isPending ||
        inviteAction.isPending;

    useEffect(() => {
        let timer: number | undefined;
        const shouldShow = isLoading || isMutating;

        if (shouldShow) {
            timer = window.setTimeout(() => setIsPageLoading(true), 150);
        } else {
            setIsPageLoading(false);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            setIsPageLoading(false);
        };
    }, [isLoading, isMutating, setIsPageLoading]);

    // Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [managingWs, setManagingWs] = useState<WorkspaceVM | null>(null);

    const [wsToDelete, setWsToDelete] = useState<WorkspaceVM | null>(null);
    const [wsToLeave, setWsToLeave] = useState<WorkspaceVM | null>(null);

    const [wsToEdit, setWsToEdit] = useState<WorkspaceVM | null>(null);

    const handleCreateWorkspace = async (name: string) => {
        try {
            const newWs = await createWs.mutateAsync(name);
            setIsCreateModalOpen(false);
            if (newWs?.id) {
                navigate(`/workspaces/${newWs.id}`);
            }
        } catch (err: any) {
            alert("建立計畫失敗: " + (err.message || err));
        }
    };

    const handleEditWorkspace = async (name: string) => {
        if (!wsToEdit) return;
        try {
            await updateWs.mutateAsync({ workspaceId: wsToEdit.id, name });
            setWsToEdit(null);
        } catch (err: any) {
            alert("更新計畫名稱失敗: " + (err.message || err));
        }
    };

    const handleConfirmDeleteWs = async () => {
        if (!wsToDelete) return;
        try {
            await deleteWs.mutateAsync(wsToDelete.id);
            setWsToDelete(null);
        } catch (err: any) {
            alert("刪除計畫失敗: " + (err.message || err));
        }
    };

    const handleConfirmLeaveWs = async () => {
        if (!wsToLeave) return;
        try {
            await leaveWs.mutateAsync(wsToLeave.id);
            setWsToLeave(null);
        } catch (err: any) {
            alert("退出計畫失敗: " + (err.message || err));
        }
    };

    return (
        <div className="max-w-5xl lg:max-w-6xl mx-auto p-4 pt-4 animate-in fade-in duration-500 min-h-screen">
            {/* Header */}
            <PageHeader
                mode="list"
                onAddBtnClick={() => setIsCreateModalOpen(true)}
                addBtnLabel="建立新計畫"
            />

            {/* Pending Invites Banner */}
            <PendingInvitesBanner
                invites={pendingInvites}
                onAccept={(inviteId) =>
                    inviteAction.mutate({ inviteId, status: "accepted" })
                }
                onReject={(inviteId) =>
                    inviteAction.mutate({ inviteId, status: "rejected" })
                }
            />

            {/* Workspace Grid */}
            {isLoading ? (
                <div className="p-12 text-center text-slate-400 font-medium">
                    載入看房計畫中...
                </div>
            ) : workspaces.length === 0 ? (
                <EmptyWorkspaceList onCreateClick={() => setIsCreateModalOpen(true)} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {workspaces.map((ws) => (
                        <WorkspaceCard
                            key={ws.id}
                            ws={ws}
                            onClick={() => navigate(`/workspaces/${ws.id}`)}
                            onManageClick={setManagingWs}
                            onEditClick={setWsToEdit}
                            onDeleteClick={setWsToDelete}
                            onLeaveClick={setWsToLeave}
                        />
                    ))}
                </div>
            )}

            {/* Create Workspace Modal */}
            {isCreateModalOpen && (
                <WorkspaceModal
                    mode="create"
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateWorkspace}
                />
            )}

            {/* Edit Workspace Modal */}
            {wsToEdit && (
                <WorkspaceModal
                    mode="edit"
                    initialData={{ name: wsToEdit.name }}
                    onClose={() => setWsToEdit(null)}
                    onSubmit={handleEditWorkspace}
                />
            )}

            {/* Share / Manage Modal */}
            {managingWs && (
                <ShareModal
                    workspaces={workspaces}
                    currentWorkspaceId={managingWs.id}
                    onSelectWorkspace={() => {}}
                    onCreateWorkspace={async (name) => {
                        await createWs.mutateAsync(name);
                    }}
                    onInviteMember={async (wsId, email) => {
                        await inviteMember.mutateAsync({ workspaceId: wsId, email });
                    }}
                    onClose={() => setManagingWs(null)}
                />
            )}

            {/* Delete Workspace Confirmation */}
            {wsToDelete && (
                <DeleteModal
                    deleteKey={wsToDelete.name}
                    onCloseClick={() => setWsToDelete(null)}
                    onConfirmClick={handleConfirmDeleteWs}
                />
            )}

            {/* Leave Workspace Confirmation */}
            {wsToLeave && (
                <DeleteModal
                    deleteKey={wsToLeave.name}
                    title="確定要退出看房計畫？"
                    description={`您即將退出計畫「${wsToLeave.name}」。退出後若要重新加入，需由計畫建立者重新發送邀請。`}
                    confirmText="確認退出"
                    onCloseClick={() => setWsToLeave(null)}
                    onConfirmClick={handleConfirmLeaveWs}
                />
            )}
        </div>
    );
};

export default WorkspacesPage;
