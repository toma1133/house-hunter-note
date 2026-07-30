import { Building2 } from "lucide-react";

type EmptyWorkspaceListProps = {
    onCreateClick: () => void;
};

const EmptyWorkspaceList = ({ onCreateClick }: EmptyWorkspaceListProps) => {
    return (
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
                onClick={onCreateClick}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-md"
            >
                + 建立第一個看房計畫
            </button>
        </div>
    );
};

export default EmptyWorkspaceList;
