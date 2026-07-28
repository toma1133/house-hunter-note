import { X } from "lucide-react";

type ImagePreviewModalProps = {
    imageUrl: string | null;
    onClose: () => void;
};

const ImagePreviewModal = ({ imageUrl, onClose }: ImagePreviewModalProps) => {
    if (!imageUrl) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in cursor-pointer"
            onClick={onClose}
        >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
                <img
                    src={imageUrl}
                    alt="Enlarged preview"
                    className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                />
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/60 text-white hover:bg-black/80 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};

export default ImagePreviewModal;
