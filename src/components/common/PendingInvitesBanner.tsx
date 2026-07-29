import { Mail, Check, X } from "lucide-react";
import type { WorkspaceInviteRow } from "../../models/types/WorkspaceTypes";

type PendingInvitesProps = {
    invites: (WorkspaceInviteRow & { workspaces?: { name: string } | any })[];
    onAccept: (inviteId: string) => void;
    onReject: (inviteId: string) => void;
};

const PendingInvitesBanner = ({
    invites,
    onAccept,
    onReject,
}: PendingInvitesProps) => {
    if (!invites || invites.length === 0) return null;

    return (
        <div className="mb-6 space-y-3">
            {invites.map((invite) => (
                <div
                    key={invite.id}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 rounded-2xl shadow-lg"
                >
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-[14px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                                    您收到看房計畫的共享邀請！
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    邀請您加入「
                                    <span className="font-bold text-slate-700 dark:text-slate-200">
                                        {invite.workspaces?.name || "共享計畫"}
                                    </span>
                                    」，接受後即可共同檢視與編輯物件筆記。
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                                type="button"
                                onClick={() => onAccept(invite.id)}
                                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
                            >
                                <Check size={16} /> 接受
                            </button>
                            <button
                                type="button"
                                onClick={() => onReject(invite.id)}
                                className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
                            >
                                <X size={16} /> 拒絕
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PendingInvitesBanner;
