import { Compass } from "lucide-react";
import { PropertyVM } from "../../models/types/PropertyTypes";
import PropertyCard from "./PropertyCard";

type PropertyListProps = {
    properties?: PropertyVM[];
    onDeleteBtnClick: (propertyItem: PropertyVM) => void;
    onEditBtnClick: (propertyItem: PropertyVM) => void;
};

const PropertyList = ({
    properties,
    onEditBtnClick,
    onDeleteBtnClick,
}: PropertyListProps) => {
    return (
        <div className="space-y-4">
            {!properties || properties.length === 0 ? (
                <div className="text-center py-16 text-slate-400 dark:text-slate-500 flex flex-col items-center">
                    <Compass
                        size={64}
                        strokeWidth={1}
                        className="mb-4 opacity-50"
                    />
                    <p className="text-lg font-medium">還沒有任何紀錄</p>
                    <p className="text-sm mt-1">點擊上方按鈕開始您的看房之旅</p>
                </div>
            ) : (
                properties.map((prop) => (
                    <PropertyCard
                        key={prop.id}
                        property={prop}
                        onEditBtnClick={onEditBtnClick}
                        onDeleteBtnClick={onDeleteBtnClick}
                    />
                ))
            )}
        </div>
    );
};

export default PropertyList;
