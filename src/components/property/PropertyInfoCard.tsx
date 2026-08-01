import { Building, Car, Home, Layers, MapPin, Maximize, ShieldAlert, Zap } from "lucide-react";
import { PropertyVM } from "../../models/types/PropertyTypes";
import { formatNumber } from "../../utils/formatters";

type PropertyInfoCardProps = {
    property: PropertyVM;
    onImageClick?: (imageUrl: string) => void;
};

const PropertyInfoCard = ({
    property,
    onImageClick,
}: PropertyInfoCardProps) => {
    const indoorTotalPing = (
        (Number(property.mainBuildingPing) || 0) + (Number(property.subBuildingPing) || 0)
    ) || Number(property.indoorPing) || 0;

    const unitPricePerPing = (property.totalPrice && property.totalPing)
        ? (property.totalPrice / property.totalPing).toFixed(2)
        : null;

    const fullAddress = [property.city, property.district, property.address]
        .filter(Boolean)
        .join(" ");

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
                            {property.unit || "尚未填寫戶別/樓層"}
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
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mb-1 relative z-10">
                            {property.community}
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium mb-3 relative z-10">
                            {property.unit || "尚未填寫戶別/樓層"}
                        </p>
                    </div>
                )}

                {/* Address Banner */}
                {fullAddress && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-slate-900/40 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-800">
                        <MapPin size={14} className="text-blue-500 shrink-0" />
                        <span className="font-medium truncate">{fullAddress}</span>
                    </div>
                )}

                {/* Main Price Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/80">
                    <div>
                        <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider mb-1">開價總價</span>
                        <span className="text-3xl font-black text-red-600 dark:text-red-400">
                            {property.totalPrice ? `${formatNumber(property.totalPrice)} 萬` : "未填寫"}
                        </span>
                    </div>
                    {unitPricePerPing && (
                        <div className="text-right">
                            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider mb-1">開價單價</span>
                            <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                                {formatNumber(unitPricePerPing)} 萬/坪
                            </span>
                        </div>
                    )}
                </div>

                {/* Pings Detail Grid */}
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                        <Layers size={14} /> 坪數詳細拆分
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                        <div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">權狀總坪數</span>
                            <span className="font-bold text-slate-800 dark:text-white text-base">
                                {property.totalPing ? `${formatNumber(property.totalPing)} 坪` : "-"}
                            </span>
                        </div>
                        <div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">主建物坪數</span>
                            <span className="font-bold text-slate-800 dark:text-white text-base">
                                {property.mainBuildingPing ? `${formatNumber(property.mainBuildingPing)} 坪` : "-"}
                            </span>
                        </div>
                        <div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">附屬建物坪數</span>
                            <span className="font-bold text-slate-800 dark:text-white text-base">
                                {property.subBuildingPing ? `${formatNumber(property.subBuildingPing)} 坪` : "-"}
                            </span>
                        </div>
                        <div className="bg-blue-100/70 dark:bg-blue-900/40 p-2.5 rounded-xl border border-blue-200 dark:border-blue-800/60">
                            <span className="text-[11px] text-blue-800 dark:text-blue-300 font-bold block">室內總坪數 (主+附)</span>
                            <span className="font-black text-blue-700 dark:text-blue-200 text-base">
                                {indoorTotalPing ? `${formatNumber(indoorTotalPing.toFixed(2))} 坪` : "-"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 mb-6">
                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                            室內格局
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {property.layoutRooms}房 {property.layoutHalls}廳 {property.layoutBaths}衛 {property.layoutBalconies ?? 0}陽台
                        </span>
                    </div>

                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                            建物型態 / 屋齡
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {property.buildingType || "未填寫"} {property.houseAge ? `(${formatNumber(property.houseAge)}年)` : ""}
                        </span>
                    </div>

                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                            公設比
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {property.publicRatio ? `${formatNumber(property.publicRatio)} %` : "-"}
                        </span>
                    </div>

                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                            管理費
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {property.managementFee
                                ? `$${formatNumber(property.managementFee)} /月`
                                : "-"}
                        </span>
                    </div>

                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                            土地分區
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {property.landZoning || "-"}
                        </span>
                    </div>

                    <div className="flex flex-col justify-center pl-2">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                            社區總戶數
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {property.totalUnits ? `${formatNumber(property.totalUnits)} 戶` : "-"}
                        </span>
                    </div>
                </div>

                {/* Parking Section */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold mb-1 flex items-center gap-1">
                            <Car size={14} /> 車位配置資訊
                        </span>
                        <span className="font-bold text-indigo-900 dark:text-indigo-200 text-base sm:text-lg flex flex-wrap items-center gap-2">
                            <span>{property.parking || "無車位"}</span>
                            {(property.parkingCount && property.parkingCount > 0) ? (
                                <span className="text-xs font-semibold bg-indigo-200/70 dark:bg-indigo-800/60 px-2 py-0.5 rounded-md text-indigo-900 dark:text-indigo-100">
                                    {property.parkingCount} 個車位
                                </span>
                            ) : null}
                            {property.parkingPing ? (
                                <span className="text-sm font-medium opacity-80">
                                    ({formatNumber(property.parkingPing)} 坪)
                                </span>
                            ) : null}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/70 dark:bg-slate-800/70 px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm shrink-0">
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
    );
};

export default PropertyInfoCard;
