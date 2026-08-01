import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { DollarSign } from "lucide-react";
import { PropertyTransaction } from "../../models/types/PropertyTypes";
import FormModal from "../common/FormModal";

type PropertyTransactionModalProps = {
    mode: "create" | "edit";
    initialData?: PropertyTransaction | null;
    onCloseBtnClick: () => void;
    onSubmit: (tx: PropertyTransaction) => Promise<void> | void;
};

const PropertyTransactionModal = ({
    mode,
    initialData,
    onCloseBtnClick,
    onSubmit,
}: PropertyTransactionModalProps) => {
    const [txForm, setTxForm] = useState<PropertyTransaction>({
        id: initialData?.id || crypto.randomUUID(),
        date: initialData?.date || "",
        floor: initialData?.floor || "",
        totalPrice: initialData?.totalPrice || "",
        unitPrice: initialData?.unitPrice || "",
        housePing: initialData?.housePing || "",
        parkingPing: initialData?.parkingPing || "",
        parkingPrice: initialData?.parkingPrice || "",
        unitPriceNoParking: initialData?.unitPriceNoParking || "",
        layout: initialData?.layout || "",
        parkingType: initialData?.parkingType || "",
        notes: initialData?.notes || "",
    });

    // Auto calculate unit price when total price, parking price, or house ping changes
    useEffect(() => {
        const tp = parseFloat(txForm.totalPrice);
        const pp = parseFloat(txForm.parkingPrice || "0");
        const hp = parseFloat(txForm.housePing || "0");

        if (!isNaN(tp) && hp > 0) {
            const netTotalPrice = tp - (isNaN(pp) ? 0 : pp);
            const calcUnitPrice = (netTotalPrice / hp).toFixed(2);

            setTxForm((prev) => ({
                ...prev,
                unitPrice: calcUnitPrice,
                unitPriceNoParking: calcUnitPrice,
            }));
        }
    }, [txForm.totalPrice, txForm.parkingPrice, txForm.housePing]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTxForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault();
        if (!txForm.date.trim() || !txForm.totalPrice.trim()) return;
        await onSubmit(txForm);
        onCloseBtnClick();
    };

    const inputClass =
        "w-full p-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all shadow-sm";
    const labelClass =
        "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5";

    return (
        <FormModal
            formId="property-transaction-form"
            modalTitle={
                mode === "create" ? "新增同社區參考行情" : "編輯同社區參考行情"
            }
            modalSaveTitle={mode === "create" ? "新增紀錄" : "儲存變更"}
            onCancelBtnClick={onCloseBtnClick}
            onCloseBtnClick={onCloseBtnClick}
            onSubmit={handleSubmitForm}
        >
            <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                    <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <DollarSign size={16} className="text-emerald-500" /> 行情基本資訊
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <label className={labelClass}>成交年月 (如 11208) *</label>
                            <input
                                required
                                type="text"
                                name="date"
                                value={txForm.date}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="例: 11208"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>樓層</label>
                            <input
                                type="text"
                                name="floor"
                                value={txForm.floor}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="例: 5F"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>總價 (萬元) *</label>
                            <input
                                required
                                type="number"
                                name="totalPrice"
                                value={txForm.totalPrice}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="例: 1580"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>單價 (萬/坪，自動計算)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="unitPrice"
                                value={txForm.unitPrice}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="例: 45.5"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>格局 / 房型</label>
                            <input
                                type="text"
                                name="layout"
                                value={txForm.layout}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="例: 3房2廳2衛"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>房屋坪數 (坪)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="housePing"
                                value={txForm.housePing}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="例: 35.5"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                    <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400">
                        車位資訊
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className={labelClass}>車位類型</label>
                            <select
                                name="parkingType"
                                value={txForm.parkingType || "無"}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="無">無車位</option>
                                <option value="坡道平面">坡道平面 (坡平)</option>
                                <option value="坡道機械">坡道機械 (坡機)</option>
                                <option value="升降平面">升降平面 (升平)</option>
                                <option value="升降機械">升降機械 (升機)</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>車位坪數 (坪)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="parkingPing"
                                value={txForm.parkingPing}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="例: 10.0"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>車位總價 (萬元)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="parkingPrice"
                                value={txForm.parkingPrice}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="例: 200"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className={labelClass}>備註</label>
                    <input
                        type="text"
                        name="notes"
                        value={txForm.notes}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="例如: 特殊交易、含大露臺、含裝潢..."
                    />
                </div>
            </div>
        </FormModal>
    );
};

export default PropertyTransactionModal;
