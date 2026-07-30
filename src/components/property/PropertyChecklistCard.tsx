import { Info, Plus, RotateCcw, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { PropertyConditionDetail } from "../../models/types/PropertyTypes";

type PropertyChecklistCardProps = {
    mustHavesList: PropertyConditionDetail[];
    niceToHavesList: PropertyConditionDetail[];
    mustHaveChecked: number;
    mustHaveTotal: number;
    mustProgress: number;
    niceToHaveChecked: number;
    niceToHaveTotal: number;
    niceProgress: number;
    onToggleCondition: (
        type: "mustHaves" | "niceToHaves",
        conditionId: string,
    ) => void;
    onSyncTemplate: () => Promise<void>;
    isSyncing: boolean;
};

const PropertyChecklistCard = ({
    mustHavesList,
    niceToHavesList,
    mustHaveChecked,
    mustHaveTotal,
    mustProgress,
    niceToHaveChecked,
    niceToHaveTotal,
    niceProgress,
    onToggleCondition,
    onSyncTemplate,
    isSyncing,
}: PropertyChecklistCardProps) => {
    const [isMustHavesOpen, setIsMustHavesOpen] = useState(true);
    const [isNiceToHavesOpen, setIsNiceToHavesOpen] = useState(true);

    return (
        <div className="space-y-6">
            {/* Score Tip & Sync Template Button */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                    <Info size={16} className="shrink-0 text-blue-500" />
                    <span>
                        點擊下方項目進行評分，系統自動即時計算總分 (必需 70%，加分 30%)
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onSyncTemplate}
                    disabled={isSyncing}
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded-xl text-xs font-bold transition-colors border border-indigo-100 dark:border-blue-800/40 shadow-sm"
                    title="將全站預設條件範本（Template）套用至此筆記"
                >
                    <RotateCcw
                        size={14}
                        className={isSyncing ? "animate-spin" : ""}
                    />
                    {isSyncing ? "同步中..." : "同步最新評分範本"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Must Haves Checklist */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden h-fit">
                    <div 
                        className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-5 flex justify-between items-end border-b border-red-100 dark:border-red-900/30 cursor-pointer select-none"
                        onClick={() => setIsMustHavesOpen(!isMustHavesOpen)}
                    >
                        <div>
                            <h3 className="text-lg sm:text-xl font-black text-red-600 dark:text-red-400 flex items-center gap-2">
                                <Star
                                    size={20}
                                    className="fill-red-600 dark:fill-red-400"
                                />{" "}
                                必需項 (Must Have)
                                {isMustHavesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </h3>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400">
                                {mustHaveChecked}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-red-400 dark:text-red-500">
                                /{mustHaveTotal} (70%)
                            </span>
                        </div>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-slate-700/50 h-2">
                        <div
                            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 transition-all duration-700 ease-out"
                            style={{ width: `${mustProgress}%` }}
                        />
                    </div>

                    {isMustHavesOpen && (
                        <div className="p-2 animate-in slide-in-from-top-2 duration-200">
                            {mustHavesList.length === 0 ? (
                                <p className="p-6 text-center text-slate-400 text-sm">
                                    尚未設定條件
                                </p>
                            ) : (
                                mustHavesList.map((condition) => (
                                    <label
                                        key={condition.id}
                                        className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl transition-all m-1 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                                            condition.checked
                                                ? "bg-red-50/50 dark:bg-red-900/10"
                                                : ""
                                        }`}
                                    >
                                        <div className="relative flex items-start pt-1">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded-lg border-slate-300 dark:border-slate-600 text-red-500 focus:ring-red-500 dark:bg-slate-800 cursor-pointer transition-all"
                                                checked={condition.checked}
                                                onChange={() =>
                                                    onToggleCondition(
                                                        "mustHaves",
                                                        condition.id,
                                                    )
                                                }
                                            />
                                        </div>
                                        <span
                                            className={`text-sm sm:text-base flex-grow select-none transition-colors pt-0.5 ${
                                                condition.checked
                                                    ? "text-slate-900 dark:text-white font-bold"
                                                    : "text-slate-600 dark:text-slate-400 font-medium"
                                            }`}
                                        >
                                            {condition.text}
                                        </span>
                                    </label>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Nice To Haves Checklist */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden h-fit mb-8 md:mb-0">
                    <div 
                        className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-5 flex justify-between items-end border-b border-emerald-100 dark:border-emerald-900/30 cursor-pointer select-none"
                        onClick={() => setIsNiceToHavesOpen(!isNiceToHavesOpen)}
                    >
                        <div>
                            <h3 className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                <Plus size={20} strokeWidth={3} /> 加分項 (Nice to
                                Have)
                                {isNiceToHavesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </h3>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                                {niceToHaveChecked}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-emerald-400 dark:text-emerald-500">
                                /{niceToHaveTotal} (30%)
                            </span>
                        </div>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-slate-700/50 h-2">
                        <div
                            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 transition-all duration-700 ease-out"
                            style={{ width: `${niceProgress}%` }}
                        />
                    </div>

                    {isNiceToHavesOpen && (
                        <div className="p-2 animate-in slide-in-from-top-2 duration-200">
                            {niceToHavesList.length === 0 ? (
                                <p className="p-6 text-center text-slate-400 text-sm">
                                    尚未設定條件
                                </p>
                            ) : (
                                niceToHavesList.map((condition) => (
                                    <label
                                        key={condition.id}
                                        className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl transition-all m-1 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                                            condition.checked
                                                ? "bg-emerald-50/50 dark:bg-emerald-900/10"
                                                : ""
                                        }`}
                                    >
                                        <div className="relative flex items-start pt-1">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded-lg border-slate-300 dark:border-slate-600 text-emerald-500 focus:ring-emerald-500 dark:bg-slate-800 cursor-pointer transition-all"
                                                checked={condition.checked}
                                                onChange={() =>
                                                    onToggleCondition(
                                                        "niceToHaves",
                                                        condition.id,
                                                    )
                                                }
                                            />
                                        </div>
                                        <span
                                            className={`text-sm sm:text-base flex-grow select-none transition-colors pt-0.5 ${
                                                condition.checked
                                                    ? "text-slate-900 dark:text-white font-bold"
                                                    : "text-slate-600 dark:text-slate-400 font-medium"
                                            }`}
                                        >
                                            {condition.text}
                                        </span>
                                    </label>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyChecklistCard;
