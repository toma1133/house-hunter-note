import { useState } from "react";
import { UserPlus, Check, X, Shield, FolderPlus, Trash2 } from "lucide-react";
import FormModal from "./FormModal";
import type { WorkspaceVM } from "../../models/types/WorkspaceTypes";
import useAuth from "../../hooks/UseAuth";
import {
    useWorkspaceMembers,
    useWorkspaceMutations,
} from "../../hooks/UseWorkspaces";

type ShareModalProps = {
    workspaces: WorkspaceVM[];
    currentWorkspaceId: string | null;
    onSelectWorkspace: (id: string | null) => void;
    onCreateWorkspace: (name: string) => Promise<void>;
    onInviteMember: (workspaceId: string, email: string) => Promise<void>;
    onClose: () => void;
};

const ShareModal = ({
    workspaces,
    currentWorkspaceId,
    onSelectWorkspace,
    onCreateWorkspace,
    onInviteMember,
    onClose,
}: ShareModalProps) => {
    const { session } = useAuth();
    const currentUserId = session?.user?.id;

    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteStatus, setInviteStatus] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const activeWs = workspaces.find((w) => w.id === currentWorkspaceId);
    const { data: members = [] } = useWorkspaceMembers(currentWorkspaceId);
    const { removeMember } = useWorkspaceMutations(currentUserId);

    const isOwner = activeWs?.role === "owner";

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentWorkspaceId || !inviteEmail.trim()) return;
        try {
            setIsSubmitting(true);
            await onInviteMember(currentWorkspaceId, inviteEmail.trim());
            setInviteStatus("邀請已發送！對方登入後即可接收邀請。");
            setInviteEmail("");
        } catch (err: any) {
            setInviteStatus("邀請失敗: " + (err.message || err));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRemoveMember = async (memberUserId: string) => {
        if (!currentWorkspaceId) return;
        try {
            await removeMember.mutateAsync({
                workspaceId: currentWorkspaceId,
                memberUserId,
            });
        } catch (err: any) {
            alert("移除成員失敗: " + (err.message || err));
        }
    };

    return (
        <FormModal
            formId="share-modal-form"
            modalTitle={`計畫成員管理 — ${activeWs?.name || ""}`}
            modalSaveTitle=""
            onCancelBtnClick={onClose}
            onCloseBtnClick={onClose}
        >
            <div className="space-y-6">
                {/* 1. Member List */}
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                        目前計畫成員 ({members.length} 人)
                    </label>
                    <div className="space-y-2">
                        {members.map((m) => (
                            <div
                                key={m.user_id}
                                className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-800 dark:text-white truncate">
                                        {m.user_id === currentUserId
                                            ? "我自己"
                                            : m.user_email || `使用者 (${m.user_id.substring(0, 8)}...)`}
                                    </span>
                                    <span
                                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                            m.role === "owner"
                                                ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                                                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                        }`}
                                    >
                                        {m.role === "owner" ? "建立者" : "成員"}
                                    </span>
                                </div>

                                {isOwner && m.user_id !== currentUserId && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveMember(m.user_id)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                                        title="移除成員"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Send Invitation */}
                {activeWs && (
                    <div className="pt-4 border-t dark:border-slate-700">
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                            <UserPlus size={16} /> 邀請成員加入「{activeWs.name}」
                        </label>
                        <form onSubmit={handleInvite} className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    required
                                    placeholder="輸入對方的 Supabase 註冊 Email"
                                    className="flex-1 p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl outline-none dark:text-white"
                                    value={inviteEmail}
                                    onChange={(e) =>
                                        setInviteEmail(e.target.value)
                                    }
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
                                >
                                    發送邀請
                                </button>
                            </div>
                            {inviteStatus && (
                                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                    {inviteStatus}
                                </p>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </FormModal>
    );
};

export default ShareModal;
