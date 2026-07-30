import { useState, MouseEventHandler } from "react";
import { Bot, Copy, Check } from "lucide-react";

type AiExportModalProps = {
    promptText: string;
    onCloseClick: MouseEventHandler<HTMLButtonElement>;
};

const AiExportModal = ({ promptText, onCloseClick }: AiExportModalProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(promptText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text", err);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full text-emerald-600 dark:text-emerald-400">
                            <Bot size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                            匯出 AI 提示詞
                        </h3>
                    </div>
                </div>
                
                <div className="p-6 flex-1 overflow-hidden flex flex-col min-h-0">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 shrink-0">
                        您可以將下方產生的提示詞與資料複製後，貼上至 ChatGPT、Claude 或 Gemini 等 AI 工具，請 AI 協助您自動填寫缺漏的建案資訊。
                    </p>
                    <div className="relative flex-1 min-h-0">
                        <textarea
                            readOnly
                            value={promptText}
                            className="w-full h-full min-h-[200px] p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono text-slate-700 dark:text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        />
                        <button
                            onClick={handleCopyClick}
                            className="absolute top-2 right-2 p-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 transition-all"
                            title="複製"
                        >
                            {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3 shrink-0">
                    <button
                        type="button"
                        onClick={onCloseClick}
                        className="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl shadow-sm transition-colors"
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiExportModal;
