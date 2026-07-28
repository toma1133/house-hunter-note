import { MouseEventHandler } from "react";
import {
    DollarSign,
    Layout,
    Maximize,
    Car,
    Zap,
    Edit3,
    Trash2,
    ChevronRight,
} from "lucide-react";
import { PropertyVM } from "../../models/types/PropertyTypes";

type PropertyCardProps = {
    property: PropertyVM;
    onDeleteBtnClick: (propertyItem: PropertyVM) => void;
    onEditBtnClick: (propertyItem: PropertyVM) => void;
};

const PropertyCard = ({
    property,
    onDeleteBtnClick,
    onEditBtnClick,
}: PropertyCardProps) => {
    return (
        <div
            key={property.id}
            className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row gap-4 relative overflow-hidden"
        >
            <div
                className={`absolute left-0 top-0 bottom-0 w-2 transition-colors z-10 ${
                    property.score >= 80
                        ? "bg-emerald-500"
                        : property.score >= 60
                          ? "bg-blue-500"
                          : property.score > 0
                            ? "bg-amber-500"
                            : "bg-slate-300 dark:bg-slate-600"
                }`}
            ></div>

            {property.coverImage && (
                <>
                    <div className="hidden sm:block ml-1 w-36 h-32 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 self-center bg-slate-100 dark:bg-slate-900">
                        <img
                            src={property.coverImage}
                            alt="封面"
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    </div>
                    <div className="sm:hidden w-[calc(100%+2.5rem)] h-40 shrink-0 overflow-hidden -mt-5 -ml-5 -mr-5 mb-1 relative border-b border-slate-100 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                        <img
                            src={property.coverImage}
                            alt="封面"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                    </div>
                </>
            )}

            <div
                className={`pl-3 flex-grow ${property.coverImage ? "mt-1 sm:mt-0" : ""}`}
            >
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                                {property.city} {property.district}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            {property.community}
                        </h3>
                        <div className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                            {property.unit}
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl p-2.5 min-w-[70px] shadow-sm">
                        <span
                            className={`text-2xl font-black leading-none ${
                                property.score >= 80
                                    ? "text-emerald-500"
                                    : property.score >= 60
                                      ? "text-blue-500"
                                      : property.score > 0
                                        ? "text-amber-500"
                                        : "text-slate-400"
                            }`}
                        >
                            {property.score}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 font-bold">
                            Score
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2.5 py-1.5 rounded-lg">
                        <DollarSign size={14} /> {property.totalPrice} 萬
                    </span>
                    <span className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2.5 py-1.5 rounded-lg">
                        <Layout size={14} /> {property.layoutRooms}房{" "}
                        {property.layoutHalls}廳 {property.layoutBaths}衛
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-lg">
                        <Maximize size={14} /> 權狀 {property.totalPing} 坪
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-lg">
                        <Car size={14} /> {property.parking}
                        {property.evCharging && (
                            <Zap size={14} className="text-amber-500 ml-0.5" />
                        )}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t dark:border-slate-700 sm:border-t-0 pt-3 sm:pt-0">
                <div className="sm:hidden flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                        評分:
                    </span>
                    <span
                        className={`text-xl font-black ${
                            property.score >= 80
                                ? "text-emerald-500"
                                : property.score >= 60
                                  ? "text-blue-500"
                                  : property.score > 0
                                    ? "text-amber-500"
                                    : "text-slate-400"
                        }`}
                    >
                        {property.score}
                    </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onClick={() => onEditBtnClick(property)}
                        className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-full transition-colors"
                        title="編輯"
                    >
                        <Edit3 size={18} />
                    </button>
                    <button
                        onClick={() => onDeleteBtnClick(property)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors relative z-10"
                        title="刪除"
                    >
                        <Trash2 size={18} />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors text-slate-400 ml-1">
                        <ChevronRight size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
