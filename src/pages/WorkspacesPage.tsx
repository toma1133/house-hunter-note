import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FolderPlus,
    Users,
    Trash2,
    LogOut,
    Plus,
    Building2,
    ChevronRight,
    Edit2,
} from "lucide-react";
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

const WorkspacesPage = () => {
    const { session } = useAuth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    const navigate = useNavigate();

    const { data: workspaces = [], isLoading } = useWorkspaces(userId);
    const { createWs, updateWs, deleteWs, leaveWs, inviteMember } = useWorkspaceMutations(userId);

    const { data: pendingInvites = [] } = usePendingInvites(userEmail);
    const inviteAction = useInviteAction(userEmail);

    // Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newWsName, setNewWsName] = useState("");

    const [managingWs, setManagingWs] = useState<WorkspaceVM | null>(null);

    const [wsToDelete, setWsToDelete] = useState<WorkspaceVM | null>(null);
    const [wsToLeave, setWsToLeave] = useState<WorkspaceVM | null>(null);

    const [wsToEdit, setWsToEdit] = useState<WorkspaceVM | null>(null);
    const [editWsName, setEditWsName] = useState("");

    const handleCreateWorkspace = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWsName.trim()) return;
        try {
            const newWs = await createWs.mutateAsync(newWsName.trim());
            setNewWsName("");
            setIsCreateModalOpen(false);
            if (newWs?.id) {
                navigate(`/workspaces/${newWs.id}`);
            }
        } catch (err: any) {
            alert("建立計畫失敗: " + (err.message || err));
        }
    };

    const handleEditWorkspace = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!wsToEdit || !editWsName.trim()) return;
        try {
            await updateWs.mutateAsync({ workspaceId: wsToEdit.id, name: editWsName.trim() });
            setWsToEdit(null);
            setEditWsName("");
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
                <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center space-y-4">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl w-fit mx-auto">
                        <Building2 size={32} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                            尚未有任何看房計畫
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            建立一個看房計畫（如「台北雙人買房」），開始紀錄與分享您的看屋筆記。
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-md"
                    >
                        + 建立第一個看房計畫
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {workspaces.map((ws) => {
                        const isOwner = ws.role === "owner";
                        return (
                            <div
                                key={ws.id}
                                onClick={() => navigate(`/workspaces/${ws.id}`)}
                                className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                                            <Building2 size={24} />
                                        </div>
                                        <span
                                            className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                                                isOwner
                                                    ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                                                    : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                                            }`}
                                        >
                                            {isOwner ? "建立者 Owner" : "成員 Member"}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {ws.name}
                                    </h3>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
                                        建立時間：
                                        {new Date(ws.created_at).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="border-t border-slate-100 dark:border-slate-700/80 pt-4 mt-6 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setManagingWs(ws);
                                            }}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl transition-colors"
                                            title="成員與邀請管理"
                                        >
                                            <Users size={18} />
                                        </button>

                                        {isOwner ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setWsToEdit(ws);
                                                        setEditWsName(ws.name);
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-colors"
                                                    title="重新命名"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setWsToDelete(ws);
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                                                    title="刪除計畫"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setWsToLeave(ws);
                                                }}
                                                className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition-colors"
                                                title="退出計畫"
                                            >
                                                <LogOut size={18} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                                        進入計畫 <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create Workspace Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-in zoom-in-95">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <FolderPlus size={20} className="text-blue-600" />
                                建立新看房計畫
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleCreateWorkspace} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                                    計畫名稱 *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="例如：台北雙人買房計畫"
                                    value={newWsName}
                                    onChange={(e) => setNewWsName(e.target.value)}
                                    className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
                                >
                                    建立計畫
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Workspace Modal */}
            {wsToEdit && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-in zoom-in-95">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Edit2 size={20} className="text-blue-600" />
                                編輯計畫名稱
                            </h3>
                            <button
                                type="button"
                                onClick={() => setWsToEdit(null)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleEditWorkspace} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                                    計畫名稱 *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="例如：台北雙人買房計畫"
                                    value={editWsName}
                                    onChange={(e) => setEditWsName(e.target.value)}
                                    className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setWsToEdit(null)}
                                    className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    disabled={!editWsName.trim() || editWsName.trim() === wsToEdit.name}
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
                                >
                                    儲存更新
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
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
