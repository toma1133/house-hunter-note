import { FormEvent, useState, useEffect } from "react";
import { DollarSign, Plus, Trash2 } from "lucide-react";
import { PropertyTransaction } from "../../models/types/PropertyTypes";

type PropertyTransactionsCardProps = {
    transactions?: PropertyTransaction[] | null;
    onAddTransaction: (tx: {
        date: string;
        floor: string;
        totalPrice: string;
        unitPrice: string;
        housePing?: string;
        parkingPing?: string;
        parkingPrice?: string;
        unitPriceNoParking?: string;
        layout?: string;
        parkingType?: string;
        notes?: string;
    }) => Promise<void>;
    onDeleteTransaction: (txId: string) => Promise<void>;
};

const PropertyTransactionsCard = ({
    transactions,
    onAddTransaction,
    onDeleteTransaction,
}: PropertyTransactionsCardProps) => {
    const [txForm, setTxForm] = useState({
        date: "",
        floor: "",
        totalPrice: "",
        unitPrice: "",
        housePing: "",
        parkingPing: "",
        parkingPrice: "",
        unitPriceNoParking: "",
        layout: "",
        parkingType: "",
        notes: "",
    });

    // 自動計算扣除車位價單價
    useEffect(() => {
        const tp = parseFloat(txForm.totalPrice);
        const pp = parseFloat(txForm.parkingPrice);
        const hp = parseFloat(txForm.housePing);
        
        if (!isNaN(tp) && !isNaN(pp) && !isNaN(hp) && hp > 0) {
            const calculated = ((tp - pp) / hp).toFixed(2);
            if (calculated !== txForm.unitPriceNoParking) {
                setTxForm(prev => ({ ...prev, unitPriceNoParking: calculated }));
            }
        }
    }, [txForm.totalPrice, txForm.parkingPrice, txForm.housePing, txForm.unitPriceNoParking]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!txForm.date || !txForm.totalPrice) return;
        await onAddTransaction(txForm);
        setTxForm({
            date: "",
            floor: "",
            totalPrice: "",
            unitPrice: "",
            housePing: "",
            parkingPing: "",
            parkingPrice: "",
            unitPriceNoParking: "",
            layout: "",
            parkingType: "",
            notes: "",
        });
    };

    const inputClass = "w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white placeholder:text-slate-400";
    const labelClass = "block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1";

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                    <DollarSign size={20} className="text-emerald-500" />{" "}
                    同社區參考行情
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-normal">
                        手動紀錄
                    </span>
                </h3>
            </div>

            {/* Transaction Add Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4"
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    <div>
                        <label className={labelClass}>年月 (如 11208)</label>
                        <input required type="text" value={txForm.date} onChange={(e) => setTxForm({ ...txForm, date: e.target.value })} className={inputClass} placeholder="11208" />
                    </div>
                    <div>
                        <label className={labelClass}>樓層</label>
                        <input type="text" value={txForm.floor} onChange={(e) => setTxForm({ ...txForm, floor: e.target.value })} className={inputClass} placeholder="5F" />
                    </div>
                    <div>
                        <label className={labelClass}>總價(萬)</label>
                        <input required type="number" value={txForm.totalPrice} onChange={(e) => setTxForm({ ...txForm, totalPrice: e.target.value })} className={inputClass} placeholder="1580" />
                    </div>
                    <div>
                        <label className={labelClass}>單價(萬/坪)</label>
                        <input type="number" step="0.01" value={txForm.unitPrice} onChange={(e) => setTxForm({ ...txForm, unitPrice: e.target.value })} className={inputClass} placeholder="45.5" />
                    </div>
                    <div>
                        <label className={labelClass}>格局/房型</label>
                        <input type="text" value={txForm.layout} onChange={(e) => setTxForm({ ...txForm, layout: e.target.value })} className={inputClass} placeholder="3房2廳2衛" />
                    </div>
                    <div>
                        <label className={labelClass}>房屋坪數</label>
                        <input type="number" step="0.01" value={txForm.housePing} onChange={(e) => setTxForm({ ...txForm, housePing: e.target.value })} className={inputClass} placeholder="35.5" />
                    </div>
                    <div>
                        <label className={labelClass}>車位坪數</label>
                        <input type="number" step="0.01" value={txForm.parkingPing} onChange={(e) => setTxForm({ ...txForm, parkingPing: e.target.value })} className={inputClass} placeholder="10.0" />
                    </div>
                    <div>
                        <label className={labelClass}>車位總價(萬)</label>
                        <input type="number" step="0.01" value={txForm.parkingPrice} onChange={(e) => setTxForm({ ...txForm, parkingPrice: e.target.value })} className={inputClass} placeholder="200" />
                    </div>
                    <div>
                        <label className={labelClass}>扣除車位價單價</label>
                        <input type="number" step="0.01" value={txForm.unitPriceNoParking} onChange={(e) => setTxForm({ ...txForm, unitPriceNoParking: e.target.value })} className={inputClass} placeholder="40.5" />
                    </div>
                    <div>
                        <label className={labelClass}>車位類型</label>
                        <input type="text" value={txForm.parkingType} onChange={(e) => setTxForm({ ...txForm, parkingType: e.target.value })} className={inputClass} placeholder="坡道平面" />
                    </div>
                    <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <label className={labelClass}>備註</label>
                            <input type="text" value={txForm.notes} onChange={(e) => setTxForm({ ...txForm, notes: e.target.value })} className={inputClass} placeholder="含裝潢、親友交易..." />
                        </div>
                        <div className="flex items-end">
                            <button type="submit" className="w-full sm:w-auto p-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors font-bold text-sm shadow-sm flex items-center justify-center gap-1 shrink-0 h-[38px]">
                                <Plus size={16} /> 新增
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Transactions Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700 pb-2">
                <table className="w-full text-sm text-left min-w-[800px]">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 uppercase">
                        <tr>
                            <th className="px-3 py-3 font-medium">年月</th>
                            <th className="px-3 py-3 font-medium">樓層</th>
                            <th className="px-3 py-3 font-medium">格局</th>
                            <th className="px-3 py-3 font-medium text-right">總價</th>
                            <th className="px-3 py-3 font-medium text-right">房屋坪</th>
                            <th className="px-3 py-3 font-medium text-right">車位坪</th>
                            <th className="px-3 py-3 font-medium text-right">車位價</th>
                            <th className="px-3 py-3 font-medium text-right text-emerald-600 dark:text-emerald-400">扣車位單價</th>
                            <th className="px-3 py-3 font-medium text-right">單價</th>
                            <th className="px-3 py-3 font-medium">車位</th>
                            <th className="px-3 py-3 font-medium">備註</th>
                            <th className="px-2 py-3 font-medium text-center w-8"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {!transactions || transactions.length === 0 ? (
                            <tr>
                                <td colSpan={12} className="px-4 py-8 text-center text-slate-400 text-xs sm:text-sm">
                                    目前沒有手動紀錄行情
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                                    <td className="px-3 py-3 text-slate-700 dark:text-slate-300">{tx.date}</td>
                                    <td className="px-3 py-3 text-slate-700 dark:text-slate-300">{tx.floor || "-"}</td>
                                    <td className="px-3 py-3 text-slate-700 dark:text-slate-300 truncate max-w-[80px]" title={tx.layout || ""}>{tx.layout || "-"}</td>
                                    <td className="px-3 py-3 text-right font-bold text-red-500 dark:text-red-400">{tx.totalPrice}萬</td>
                                    <td className="px-3 py-3 text-right text-slate-600 dark:text-slate-400">{tx.housePing || "-"}</td>
                                    <td className="px-3 py-3 text-right text-slate-600 dark:text-slate-400">{tx.parkingPing || "-"}</td>
                                    <td className="px-3 py-3 text-right text-slate-600 dark:text-slate-400">{tx.parkingPrice ? `${tx.parkingPrice}萬` : "-"}</td>
                                    <td className="px-3 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">{tx.unitPriceNoParking || "-"}</td>
                                    <td className="px-3 py-3 text-right text-slate-800 dark:text-slate-200">{tx.unitPrice || "-"}</td>
                                    <td className="px-3 py-3 text-slate-600 dark:text-slate-400 truncate max-w-[60px]" title={tx.parkingType || ""}>{tx.parkingType || "-"}</td>
                                    <td className="px-3 py-3 text-slate-500 dark:text-slate-500 truncate max-w-[100px]" title={tx.notes || ""}>{tx.notes || "-"}</td>
                                    <td className="px-2 py-3 text-center">
                                        <button type="button" onClick={() => onDeleteTransaction(tx.id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all" title="刪除紀錄">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PropertyTransactionsCard;
