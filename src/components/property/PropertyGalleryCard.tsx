import { Camera, ImageIcon, LayoutTemplate, Maximize } from "lucide-react";
import { PropertyRoomImage } from "../../models/types/PropertyTypes";

type PropertyGalleryCardProps = {
    floorPlanImage?: string;
    roomImages?: PropertyRoomImage[] | null;
    onImageClick: (imageUrl: string) => void;
};

const PropertyGalleryCard = ({
    floorPlanImage,
    roomImages,
    onImageClick,
}: PropertyGalleryCardProps) => {
    if (!floorPlanImage && (!roomImages || roomImages.length === 0)) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white flex items-center gap-2 mb-5">
                <ImageIcon size={20} className="text-blue-500" /> 屋況與格局照片
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {floorPlanImage && (
                    <div
                        className="relative rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 group h-56 sm:h-64 shadow-sm bg-slate-50 dark:bg-slate-900/50 cursor-pointer"
                        onClick={() => onImageClick(floorPlanImage)}
                    >
                        <img
                            src={floorPlanImage}
                            alt="格局圖"
                            loading="lazy"
                            className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                            <LayoutTemplate size={14} className="text-blue-400" />{" "}
                            格局圖
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <Maximize
                                size={24}
                                className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md transition-opacity"
                            />
                        </div>
                    </div>
                )}

                {roomImages &&
                    roomImages.map((img) => (
                        <div
                            key={img.id}
                            className="relative rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 group h-56 sm:h-64 shadow-sm bg-slate-100 dark:bg-slate-900/50 cursor-pointer"
                            onClick={() => onImageClick(img.url)}
                        >
                            <img
                                src={img.url}
                                alt={img.name}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                                <Camera size={14} className="text-amber-400" />{" "}
                                {img.name}
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <Maximize
                                    size={24}
                                    className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md transition-opacity"
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PropertyGalleryCard;
