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
    onCardClick?: (propertyId: string) => void;
    onDeleteBtnClick: (propertyItem: PropertyVM) => void;
    onEditBtnClick: (propertyItem: PropertyVM) => void;
};

const PropertyCard = ({
    property,
    onCardClick,
    onDeleteBtnClick,
    onEditBtnClick,
}: PropertyCardProps) => {
    return (
        <div
            key={property.id}
            onClick={() => onCardClick?.(property.id)}
            className="bg-white dark:bg-slate-800/90 p-5 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-500/5 border border-slate-200/70 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between relative overflow-hidden h-full"
        >
            {/* Left score stripe */}
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
            />

            <div>
                {/* Image & Header content */}
                {property.coverImage && (
                    <div className="w-full h-44 shrink-0 overflow-hidden rounded-2xl mb-4 relative border border-slate-100 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-900">
                        <img
                            src={property.coverImage}
                            alt="封面"
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-[10px] bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full font-bold">
                                {property.city} {property.district}
                            </span>
                        </div>
                    </div>
                )}

                <div className="pl-2">
                    <div className="flex justify-between items-start mb-3 gap-2">
                        <div>
                            {!property.coverImage && (
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-full font-bold border border-slate-200/50 dark:border-slate-600/50">
                                        {property.city} {property.district}
                                    </span>
                                </div>
                            )}
                            <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">
                                {property.community}
                            </h3>
                            <div className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-0.5 line-clamp-1">
                                {property.unit || "尚未填寫戶別"}
                            </div>
                        </div>

                        {/* Score Gauge Badge */}
                        <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-2.5 min-w-[64px] shrink-0 shadow-sm">
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
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 font-bold">
                                Score
                            </span>
                        </div>
                    </div>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-2 text-xs font-semibold my-4">
                        <span className="flex items-center gap-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-2.5 py-1.5 rounded-xl border border-red-100 dark:border-red-900/40">
                            <DollarSign size={14} /> {property.totalPrice} 萬
                        </span>
                        <span className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 px-2.5 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                            <Layout size={14} /> {property.layoutRooms}房{" "}
                            {property.layoutHalls}廳 {property.layoutBaths}衛
                        </span>
                        <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-600/40">
                            <Maximize size={14} /> {property.totalPing} 坪
                        </span>
                        {property.parking && (
                            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-600/40">
                                <Car size={14} /> {property.parking}
                                {property.evCharging && (
                                    <Zap
                                        size={14}
                                        className="text-amber-500 ml-0.5"
                                    />
                                )}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Card Footer Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 pt-3 mt-2 pl-2">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    查看完整評分筆記
                </span>

                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditBtnClick(property);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                        title="編輯筆記"
                    >
                        <Edit3 size={17} />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteBtnClick(property);
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                        title="刪除筆記"
                    >
                        <Trash2 size={17} />
                    </button>
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors text-slate-400 ml-1">
                        <ChevronRight size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
