import { Car, Maximize, Zap } from "lucide-react";
import { PropertyVM } from "../../models/types/PropertyTypes";

type PropertyInfoCardProps = {
    property: PropertyVM;
    onImageClick?: (imageUrl: string) => void;
};

const PropertyInfoCard = ({
    property,
    onImageClick,
}: PropertyInfoCardProps) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
            {property.coverImage && (
                <div
                    className="w-full h-48 sm:h-64 relative bg-slate-100 dark:bg-slate-900 cursor-pointer group overflow-hidden rounded-t-3xl"
                    onClick={() => onImageClick?.(property.coverImage!)}
                >
                    <img
                        src={property.coverImage}
                        alt="封面"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                    <div className="absolute bottom-5 left-6 right-6 pointer-events-none">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 drop-shadow-lg relative z-10">
                            {property.community}
                        </h2>
                        <p className="text-base sm:text-lg text-slate-200 font-medium relative z-10">
                            {property.unit}
                        </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize size={18} />
                    </div>
                </div>
            )}

            <div className={`p-6 ${property.coverImage ? "pt-4" : ""}`}>
                {!property.coverImage && (
                    <div>
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mb-2 relative z-10">
                            {property.community}
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium mb-2 relative z-10">
                            {property.unit}
                        </p>
                    </div>
                )}

                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 relative z-10 flex items-center gap-1">
                    <span className="font-bold text-slate-800 dark:text-white text-lg">
                        {property.totalPing ? `${property.totalPing} 坪` : "-"}
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                            格局
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                            {property.layoutRooms}房 {property.layoutHalls}廳{" "}
                            {property.layoutBaths}衛
                        </span>
                    </div>
                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                            管理費
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                            {property.managementFee
                                ? `$${property.managementFee}/月`
                                : "-"}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                            土地分區
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                            {property.landZoning || "-"}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                            社區總戶數
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                            {property.totalUnits ? `${property.totalUnits} 戶` : "-"}
                        </span>
                    </div>

                    <div className="col-span-2 md:col-span-3 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
                        <div className="flex flex-col">
                            <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold mb-1 flex items-center gap-1">
                                <Car size={14} /> 車位配置
                            </span>
                            <span className="font-bold text-indigo-900 dark:text-indigo-200 text-base sm:text-lg flex items-center gap-2">
                                {property.parking || "無"}{" "}
                                {property.parkingPing ? (
                                    <span className="text-sm font-medium opacity-70">
                                        ({property.parkingPing}坪)
                                    </span>
                                ) : null}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-3 py-2 rounded-xl backdrop-blur-sm">
                            <Zap
                                size={18}
                                className={
                                    property.evCharging
                                        ? "text-amber-500"
                                        : "text-slate-400"
                                }
                            />
                            <span
                                className={`text-xs sm:text-sm font-bold ${
                                    property.evCharging
                                        ? "text-slate-800 dark:text-white"
                                        : "text-slate-500 dark:text-slate-400"
                                }`}
                            >
                                {property.evCharging
                                    ? "已規劃充電設施"
                                    : "無充電樁規劃"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyInfoCard;
