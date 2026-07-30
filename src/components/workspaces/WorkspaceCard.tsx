import {
    Building2,
    Users,
    Trash2,
    LogOut,
    ChevronRight,
    Edit2,
} from "lucide-react";
import type { WorkspaceVM } from "../../models/types/WorkspaceTypes";

type WorkspaceCardProps = {
    ws: WorkspaceVM;
    onClick: () => void;
    onManageClick: (ws: WorkspaceVM) => void;
    onEditClick?: (ws: WorkspaceVM) => void;
    onDeleteClick?: (ws: WorkspaceVM) => void;
    onLeaveClick?: (ws: WorkspaceVM) => void;
};

const WorkspaceCard = ({
    ws,
    onClick,
    onManageClick,
    onEditClick,
    onDeleteClick,
    onLeaveClick,
}: WorkspaceCardProps) => {
    const isOwner = ws.role === "owner";

    return (
        <div
            onClick={onClick}
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
                            onManageClick(ws);
                        }}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl transition-colors"
                        title="成員與邀請管理"
                    >
                        <Users size={18} />
                    </button>

                    {isOwner ? (
                        <>
                            {onEditClick && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEditClick(ws);
                                    }}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-colors"
                                    title="重新命名"
                                >
                                    <Edit2 size={18} />
                                </button>
                            )}
                            {onDeleteClick && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteClick(ws);
                                    }}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                                    title="刪除計畫"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            {onLeaveClick && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onLeaveClick(ws);
                                    }}
                                    className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition-colors"
                                    title="退出計畫"
                                >
                                    <LogOut size={18} />
                                </button>
                            )}
                        </>
                    )}
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    進入計畫 <ChevronRight size={16} />
                </div>
            </div>
        </div>
    );
};

export default WorkspaceCard;
