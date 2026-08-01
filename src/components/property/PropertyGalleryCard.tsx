import { useState, useRef, TouchEvent } from "react";
import { Camera, ChevronLeft, ChevronRight, ImageIcon, LayoutTemplate, Maximize } from "lucide-react";
import { PropertyRoomImage } from "../../models/types/PropertyTypes";

type PropertyGalleryCardProps = {
    floorPlanImage?: string;
    roomImages?: PropertyRoomImage[] | null;
    onImageClick: (imageUrl: string) => void;
};

type GalleryItem = {
    id: string;
    type: "floorPlan" | "room";
    name: string;
    url: string;
};

const PropertyGalleryCard = ({
    floorPlanImage,
    roomImages,
    onImageClick,
}: PropertyGalleryCardProps) => {
    const items: GalleryItem[] = [];

    if (floorPlanImage) {
        items.push({
            id: "floorPlan",
            type: "floorPlan",
            name: "格局圖",
            url: floorPlanImage,
        });
    }

    if (roomImages && roomImages.length > 0) {
        roomImages.forEach((img) => {
            items.push({
                id: img.id,
                type: "room",
                name: img.name || "房間照片",
                url: img.url,
            });
        });
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    if (items.length === 0) {
        return null;
    }

    // Keep index within bounds if items change
    const activeIndex = Math.min(currentIndex, items.length - 1);
    const currentItem = items[activeIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    // Mobile Swipe Handlers
    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 40; // minimum distance in px to register swipe

        if (diff > minSwipeDistance) {
            handleNext(); // Swiped left -> Next image
        } else if (diff < -minSwipeDistance) {
            handlePrev(); // Swiped right -> Previous image
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                    <ImageIcon size={20} className="text-blue-500" /> 屋況與格局藝廊
                </h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-3 py-1 rounded-full">
                    {activeIndex + 1} / {items.length}
                </span>
            </div>

            {/* Main Featured Slide Viewer */}
            <div
                className="relative rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 group h-64 sm:h-80 md:h-96 shadow-md bg-slate-900 cursor-pointer select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={() => onImageClick(currentItem.url)}
            >
                <img
                    src={currentItem.url}
                    alt={currentItem.name}
                    loading="lazy"
                    className={`w-full h-full ${
                        currentItem.type === "floorPlan"
                            ? "object-contain p-3 bg-slate-50 dark:bg-slate-900"
                            : "object-cover"
                    } transition-all duration-500 group-hover:scale-[1.02]`}
                />

                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white/10">
                    {currentItem.type === "floorPlan" ? (
                        <LayoutTemplate size={14} className="text-blue-400" />
                    ) : (
                        <Camera size={14} className="text-amber-400" />
                    )}
                    {currentItem.name}
                </div>

                {/* Expand Fullscreen Icon */}
                <div className="absolute top-3 right-3 bg-slate-900/60 backdrop-blur-md text-white p-2 rounded-xl opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize size={18} />
                </div>

                {/* Left/Right Navigation Arrows (Visible on Hover / Always accessible) */}
                {items.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95"
                            title="上一張"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95"
                            title="下一張"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </>
                )}
            </div>

            {/* Horizontal Scrollable Thumbnail Carousel (Swiper Bar for Mobile & Desktop) */}
            {items.length > 1 && (
                <div className="mt-4 flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 snap-x">
                    {items.map((item, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setCurrentIndex(index)}
                                className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 snap-start ${
                                    isActive
                                        ? "border-blue-500 ring-2 ring-blue-500/30 scale-105 shadow-md"
                                        : "border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100"
                                }`}
                            >
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className={`w-full h-full ${
                                        item.type === "floorPlan"
                                            ? "object-contain bg-slate-50 dark:bg-slate-900"
                                            : "object-cover"
                                    }`}
                                />
                                <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-white text-[9px] font-bold text-center truncate py-0.5 px-1">
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PropertyGalleryCard;
