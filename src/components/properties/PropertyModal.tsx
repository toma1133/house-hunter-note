import {
    ChangeEventHandler,
    SubmitEventHandler,
    MouseEventHandler,
    useState,
} from "react";
import { Building2, ImageIcon, Layout, Map, Plus, X, Zap } from "lucide-react";
import type { PropertyRoomImage, PropertyVM } from "../../models/types/PropertyTypes";
import FormModal from "../common/FormModal";
import { TAIWAN_REGIONS } from "../../constants/Regions";

type PropertyModalProps = {
    formData: PropertyVM;
    mode: string;
    onCloseBtnClick: MouseEventHandler<HTMLButtonElement>;
    onFormChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    onFormSubmit: SubmitEventHandler<HTMLFormElement>;
    onAddRoomImage?: (image: PropertyRoomImage) => void;
    onDeleteRoomImage?: (imageId: string) => void;
};

const PropertyModal = ({
    formData,
    mode,
    onCloseBtnClick,
    onFormChange,
    onFormSubmit,
    onAddRoomImage,
    onDeleteRoomImage,
}: PropertyModalProps) => {
    const [newRoomName, setNewRoomName] = useState("");
    const [newRoomUrl, setNewRoomUrl] = useState("");

    const handleAddRoomImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!newRoomName.trim() || !newRoomUrl.trim()) return;
        if (onAddRoomImage) {
            onAddRoomImage({
                id: crypto.randomUUID(),
                name: newRoomName.trim(),
                url: newRoomUrl.trim(),
            });
        }
        setNewRoomName("");
        setNewRoomUrl("");
    };
    return (
        <FormModal
            formId={"property-form"}
            modalTitle={
                mode === "create"
                    ? "創建新紀錄"
                    : `編輯紀錄 ${formData.community}`
            }
            modalSaveTitle={mode === "create" ? "創建紀錄" : "儲存變更"}
            onCancelBtnClick={onCloseBtnClick}
            onCloseBtnClick={onCloseBtnClick}
            onSubmit={onFormSubmit}
        >
            {/* City */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Map size={16} /> 地點與社區資訊
                    </h4>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md">
                        必填項目
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label
                            htmlFor="city"
                            className="block font-bold uppercase mb-1 flex items-center text-muted-foreground text-xs"
                        >
                            縣市 *
                        </label>
                        <select
                            required
                            name="city"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.city}
                            onChange={onFormChange}
                        >
                            {Object.keys(TAIWAN_REGIONS).map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="district"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            行政區 *
                        </label>
                        <select
                            required
                            name="district"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.district}
                            onChange={onFormChange}
                        >
                            {TAIWAN_REGIONS[formData.city].map((dist) => (
                                <option key={dist} value={dist}>
                                    {dist}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label
                            htmlFor="address"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            路段/地址 *
                        </label>
                        <input
                            required
                            type="text"
                            name="address"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.address}
                            onChange={onFormChange}
                            placeholder="例: 信義路五段7號"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="md:col-span-2">
                        <label
                            htmlFor="community"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            社區建案名稱 *
                        </label>
                        <input
                            required
                            type="text"
                            name="community"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.community}
                            onChange={onFormChange}
                            placeholder="例如：藍天白雲社區"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="buildingType"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            建物型態 *
                        </label>
                        <select
                            required
                            name="buildingType"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.buildingType}
                            onChange={onFormChange}
                        >
                            <option value="電梯大樓">電梯大樓</option>
                            <option value="華廈">華廈 (10樓內有電梯)</option>
                            <option value="公寓">公寓 (無電梯)</option>
                            <option value="透天厝">透天厝</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Building2 size={16} /> 房屋與售價資訊
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <label
                            htmlFor="unit"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            棟別/戶別/樓層 *
                        </label>
                        <input
                            required
                            type="text"
                            name="unit"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.unit}
                            onChange={onFormChange}
                            placeholder="例如:A棟 5F"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="totalPrice"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            總價 (萬)
                        </label>
                        <input
                            type="number"
                            name="totalPrice"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.totalPrice}
                            onChange={onFormChange}
                            placeholder="1580"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="houseAge"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            屋齡 (年)
                        </label>
                        <input
                            type="number"
                            name="houseAge"
                            step="0.1"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.houseAge}
                            onChange={onFormChange}
                            placeholder="5.5"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="landZoning"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            土地分區
                        </label>
                        <select
                            name="landZoning"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.landZoning}
                            onChange={onFormChange}
                        >
                            <option value="住宅區">住宅區</option>
                            <option value="商業區">商業區</option>
                            <option value="工業區">工業區</option>
                            <option value="農業區">農業區</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="totalPing"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            權狀坪數
                        </label>
                        <input
                            type="number"
                            name="totalPing"
                            step="0.01"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.totalPing}
                            onChange={onFormChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="indoorPing"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            主+附室內
                        </label>
                        <input
                            type="number"
                            name="indoorPing"
                            step="0.01"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.indoorPing}
                            onChange={onFormChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="publicRatio"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            公設比 (%)
                        </label>
                        <input
                            type="number"
                            name="publicRatio"
                            step="0.1"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.publicRatio}
                            onChange={onFormChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="managementFee"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            管理費 (月)
                        </label>
                        <input
                            type="number"
                            name="managementFee"
                            className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                            value={formData.managementFee}
                            onChange={onFormChange}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Layout size={16} /> 格局與車位
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="layoutRooms"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2"
                        >
                            室內格局
                        </label>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    name="layoutRooms"
                                    min="0"
                                    max="10"
                                    className="w-14 p-2 text-sm text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg dark:text-white"
                                    value={formData.layoutRooms}
                                    onChange={onFormChange}
                                />
                                <span className="text-sm dark:text-slate-300">
                                    房
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    name="layoutHalls"
                                    min="0"
                                    max="5"
                                    className="w-14 p-2 text-sm text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg dark:text-white"
                                    value={formData.layoutHalls}
                                    onChange={onFormChange}
                                />
                                <span className="text-sm dark:text-slate-300">
                                    廳
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    name="layoutBaths"
                                    min="0"
                                    max="5"
                                    className="w-14 p-2 text-sm text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg dark:text-white"
                                    value={formData.layoutBaths}
                                    onChange={onFormChange}
                                />
                                <span className="text-sm dark:text-slate-300">
                                    衛
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    name="layoutBalconies"
                                    min="0"
                                    max="5"
                                    className="w-14 p-2 text-sm text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg dark:text-white"
                                    value={formData.layoutBalconies}
                                    onChange={onFormChange}
                                />
                                <span className="text-sm dark:text-slate-300">
                                    陽台
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="parking"
                                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                            >
                                車位類型
                            </label>
                            <select
                                className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                                name="parking"
                                value={formData.parking}
                                onChange={onFormChange}
                            >
                                <option value="無">無車位</option>
                                <option value="坡道平面">坡平</option>
                                <option value="坡道機械">坡機</option>
                                <option value="升降平面">升平</option>
                                <option value="升降機械">升機</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="parkingPing"
                                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                            >
                                車位坪數
                            </label>
                            <input
                                type="number"
                                name="parkingPing"
                                step="0.01"
                                className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                                value={formData.parkingPing}
                                onChange={onFormChange}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-2 border-t dark:border-slate-700 mt-2">
                        <label
                            htmlFor="evCharging"
                            className="flex items-center gap-3 cursor-pointer select-none p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors w-full sm:w-auto"
                        >
                            <input
                                type="checkbox"
                                id="evCharging"
                                name="evCharging"
                                checked={formData.evCharging}
                                onChange={onFormChange}
                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer shrink-0"
                            />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shrink-0">
                                <Zap
                                    size={16}
                                    className={
                                        formData.evCharging
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-slate-400"
                                    }
                                />
                                具備電動車充電樁 / 預留管線
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <ImageIcon size={16} /> 相關圖片連結 (網路圖片 URL)
                </h4>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="coverImage"
                                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                            >
                                社區封面圖 (URL)
                            </label>
                            <input
                                type="url"
                                name="coverImage"
                                className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                                value={formData.coverImage || ""}
                                placeholder="https://example.com/cover.jpg"
                                onChange={onFormChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="floorPlanImage"
                                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                            >
                                室內格局圖 (URL)
                            </label>
                            <input
                                type="url"
                                name="floorPlanImage"
                                className="w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all shadow-sm"
                                value={formData.floorPlanImage || ""}
                                placeholder="https://example.com/floor.jpg"
                                onChange={onFormChange}
                            />
                        </div>
                    </div>

                    <div className="border-t dark:border-slate-700 pt-4 mt-2">
                        <label
                            htmlFor="roomImages"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2"
                        >
                            動態新增各空間圖片 (輸入名稱與網址)
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newRoomName}
                                onChange={(e) => setNewRoomName(e.target.value)}
                                placeholder="名稱 (如: 主臥室)"
                                className="w-1/3 p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                            />
                            <input
                                type="url"
                                value={newRoomUrl}
                                onChange={(e) => setNewRoomUrl(e.target.value)}
                                placeholder="圖片網址 (URL)"
                                className="flex-grow p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={handleAddRoomImage}
                                className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl transition-colors shrink-0 flex items-center justify-center"
                            >
                                <Plus size={18} />
                            </button>
                        </div>

                        {formData.roomImages &&
                            formData.roomImages.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {formData.roomImages.map((img) => (
                                        <div
                                            key={img.id}
                                            className="flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-1.5 rounded-lg group hover:border-blue-300 transition-colors"
                                        >
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <img
                                                    src={img.url}
                                                    alt={img.name}
                                                    className="w-8 h-8 object-cover rounded-md bg-slate-100"
                                                    loading="lazy"
                                                />
                                                <span className="text-xs font-medium dark:text-slate-200 truncate">
                                                    {img.name}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDeleteRoomImage?.(img.id)
                                                }
                                                className="text-red-500 p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md opacity-50 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </FormModal>
    );
};

export default PropertyModal;
