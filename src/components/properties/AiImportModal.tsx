import { useState, MouseEventHandler } from "react";
import { Bot, CheckCircle, AlertCircle } from "lucide-react";

type AiImportModalProps = {
    onCloseClick: MouseEventHandler<HTMLButtonElement>;
    onImport: (parsedData: any[]) => void;
};

const AiImportModal = ({ onCloseClick, onImport }: AiImportModalProps) => {
    const [jsonText, setJsonText] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleImportClick = () => {
        try {
            setError(null);
            if (!jsonText.trim()) {
                throw new Error("請貼上 AI 產生的 JSON 結果");
            }
            
            // Try to extract JSON if the AI wrapped it in markdown code blocks
            let textToParse = jsonText.trim();
            if (textToParse.startsWith("```")) {
                const match = textToParse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                if (match && match[1]) {
                    textToParse = match[1];
                }
            }

            const parsed = JSON.parse(textToParse);
            if (!Array.isArray(parsed)) {
                throw new Error("JSON 格式錯誤：必須是陣列 (Array)");
            }
            if (parsed.length > 0 && !parsed[0].id) {
                throw new Error("JSON 格式錯誤：物件缺少 id 屬性");
            }
            onImport(parsed);
        } catch (err: any) {
            setError(err.message || "解析 JSON 時發生錯誤，請確認格式是否正確");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900/40 rounded-full text-teal-600 dark:text-teal-400">
                            <Bot size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                            匯入 AI 產生的結果
                        </h3>
                    </div>
                </div>
                
                <div className="p-6 flex-1 overflow-hidden flex flex-col min-h-0">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 shrink-0">
                        請將 AI 產生的 JSON 陣列結果貼在下方。系統將會根據 <code>id</code> 更新對應的建案資訊。
                    </p>
                    <div className="relative flex-1 min-h-0">
                        <textarea
                            value={jsonText}
                            onChange={(e) => setJsonText(e.target.value)}
                            placeholder="在此貼上 JSON 格式結果..."
                            className="w-full h-full min-h-[200px] p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono text-slate-700 dark:text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                        />
                    </div>
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-start gap-2 text-sm shrink-0">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3 shrink-0">
                    <button
                        type="button"
                        onClick={onCloseClick}
                        className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        取消
                    </button>
                    <button
                        type="button"
                        onClick={handleImportClick}
                        className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition-colors flex items-center gap-2"
                    >
                        <CheckCircle size={18} />
                        <span>確認匯入並更新</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiImportModal;
