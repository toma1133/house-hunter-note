import { FormEvent, useState } from "react";
import { DollarSign, Plus, Trash2 } from "lucide-react";
import { PropertyTransaction } from "../../models/types/PropertyTypes";

type PropertyTransactionsCardProps = {
    transactions?: PropertyTransaction[] | null;
    onAddTransaction: (tx: {
        date: string;
        floor: string;
        totalPrice: string;
        unitPrice: string;
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
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!txForm.date || !txForm.totalPrice) return;
        await onAddTransaction(txForm);
        setTxForm({
            date: "",
            floor: "",
            totalPrice: "",
            unitPrice: "",
        });
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 relative">
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
                className="mb-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-wrap sm:flex-nowrap gap-2 items-end"
            >
                <div className="flex-1 min-w-[80px]">
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                        年月 (如 11208)
                    </label>
                    <input
                        required
                        type="text"
                        value={txForm.date}
                        onChange={(e) =>
                            setTxForm({ ...txForm, date: e.target.value })
                        }
                        className="w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white placeholder:text-slate-400"
                        placeholder="11208"
                    />
                </div>
                <div className="flex-1 min-w-[60px]">
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                        樓層
                    </label>
                    <input
                        type="text"
                        value={txForm.floor}
                        onChange={(e) =>
                            setTxForm({ ...txForm, floor: e.target.value })
                        }
                        className="w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white placeholder:text-slate-400"
                        placeholder="5F"
                    />
                </div>
                <div className="flex-1 min-w-[80px]">
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                        總價(萬)
                    </label>
                    <input
                        required
                        type="number"
                        value={txForm.totalPrice}
                        onChange={(e) =>
                            setTxForm({
                                ...txForm,
                                totalPrice: e.target.value,
                            })
                        }
                        className="w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white placeholder:text-slate-400"
                        placeholder="1580"
                    />
                </div>
                <div className="flex-1 min-w-[80px]">
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                        單價(萬/坪)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={txForm.unitPrice}
                        onChange={(e) =>
                            setTxForm({
                                ...txForm,
                                unitPrice: e.target.value,
                            })
                        }
                        className="w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white placeholder:text-slate-400"
                        placeholder="45.5"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full sm:w-auto p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors font-bold text-sm shadow-sm flex items-center justify-center gap-1 shrink-0"
                >
                    <Plus size={16} /> 新增
                </button>
            </form>

            {/* Transactions Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 uppercase">
                        <tr>
                            <th className="px-4 py-3 font-medium">交易年月</th>
                            <th className="px-4 py-3 font-medium">樓層</th>
                            <th className="px-4 py-3 font-medium text-right">
                                總價
                            </th>
                            <th className="px-4 py-3 font-medium text-right">
                                單價(萬/坪)
                            </th>
                            <th className="px-4 py-3 font-medium text-center w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {!transactions || transactions.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-slate-400 text-xs sm:text-sm"
                                >
                                    目前沒有手動紀錄行情
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr
                                    key={tx.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group"
                                >
                                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                                        {tx.date}
                                    </td>
                                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                                        {tx.floor || "-"}
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold text-red-500 dark:text-red-400">
                                        {tx.totalPrice}萬
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold text-slate-800 dark:text-slate-200">
                                        {tx.unitPrice || "-"}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onDeleteTransaction(tx.id)
                                            }
                                            className="text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                            title="刪除紀錄"
                                        >
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
