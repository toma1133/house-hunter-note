import { MouseEventHandler } from "react";
import { AlertTriangle } from "lucide-react";

type DeleteModalProps = {
    deleteKey: string | undefined;
    title?: string;
    description?: string;
    confirmText?: string;
    onCloseClick: MouseEventHandler<HTMLButtonElement>;
    onConfirmClick: MouseEventHandler<HTMLButtonElement>;
};

const DeleteModal = ({
    deleteKey,
    title = "確定要刪除？",
    description,
    confirmText = "確認刪除",
    onCloseClick,
    onConfirmClick,
}: DeleteModalProps) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-full text-red-600 dark:text-red-400">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {title}
                    </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    {description || (
                        <>
                            您即將刪除{" "}
                            <span className="font-bold text-slate-800 dark:text-white">
                                {deleteKey}
                            </span>
                            。此動作無法復原。
                        </>
                    )}
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCloseClick}
                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        取消
                    </button>
                    <button
                        onClick={onConfirmClick}
                        className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
