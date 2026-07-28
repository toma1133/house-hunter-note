import { Home, Plus, Settings2 } from "lucide-react";
import ToogleThemeBtn from "../common/ToggleThemeBtn";
import { MouseEventHandler } from "react";

type PropertyHeaderProps = {
    onAddBtnClick: MouseEventHandler<HTMLButtonElement>;
    onSettingsBtnClick?: MouseEventHandler<HTMLButtonElement>;
};

const PropertyHeader = ({
    onAddBtnClick,
    onSettingsBtnClick,
}: PropertyHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-8 sticky top-0 z-20 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl py-3 rounded-2xl px-4 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent flex items-center gap-2">
                <Home size={24} className="text-blue-600 sm:w-7 sm:h-7" />{" "}
                <span className="hidden sm:inline">看屋筆記</span>
            </h1>
            <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                    onClick={onAddBtnClick}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/30 transition-colors flex items-center gap-1.5 font-bold text-sm"
                >
                    <Plus size={18} />{" "}
                    <span className="hidden sm:inline">新增紀錄</span>
                </button>
                <ToogleThemeBtn />
                <button
                    onClick={onSettingsBtnClick}
                    className="p-2 sm:p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    title="預設評分條件設定"
                >
                    <Settings2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default PropertyHeader;
