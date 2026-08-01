import { useState } from "react";
import { ArrowDownUp, DollarSign, Edit3, Plus, Trash2 } from "lucide-react";
import { PropertyTransaction } from "../../models/types/PropertyTypes";
import PropertyTransactionModal from "./PropertyTransactionModal";
import DeleteModal from "../common/DeleteModal";
import { formatNumber } from "../../utils/formatters";

type PropertyTransactionsCardProps = {
    transactions?: PropertyTransaction[] | null;
    onAddTransaction: (tx: PropertyTransaction) => Promise<void>;
    onUpdateTransaction: (tx: PropertyTransaction) => Promise<void>;
    onDeleteTransaction: (txId: string) => Promise<void>;
};

const PropertyTransactionsCard = ({
    transactions,
    onAddTransaction,
    onUpdateTransaction,
    onDeleteTransaction,
}: PropertyTransactionsCardProps) => {
    // Sort state: 'desc' (newest date first) or 'asc' (oldest first)
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

    // Modal states
    const [isTxModalOpen, setIsTxModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [editingTx, setEditingTx] = useState<PropertyTransaction | null>(null);

    // Delete Modal state
    const [deletingTx, setDeletingTx] = useState<PropertyTransaction | null>(null);

    const handleOpenAddModal = () => {
        setModalMode("create");
        setEditingTx(null);
        setIsTxModalOpen(true);
    };

    const handleOpenEditModal = (tx: PropertyTransaction) => {
        setModalMode("edit");
        setEditingTx(tx);
        setIsTxModalOpen(true);
    };

    const handleSaveTx = async (txData: PropertyTransaction) => {
        if (modalMode === "create") {
            await onAddTransaction(txData);
        } else {
            await onUpdateTransaction(txData);
        }
    };

    const handleConfirmDelete = async () => {
        if (deletingTx) {
            await onDeleteTransaction(deletingTx.id);
            setDeletingTx(null);
        }
    };

    const sortedTransactions = [...(transactions || [])].sort((a, b) => {
        const dateA = a.date?.trim() || "";
        const dateB = b.date?.trim() || "";
        const comparison = dateB.localeCompare(dateA, undefined, { numeric: true });
        return sortOrder === "desc" ? comparison : -comparison;
    });

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
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
                        className="p-2 px-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition-colors font-medium text-xs flex items-center gap-1"
                        title="按年月排序"
                    >
                        <ArrowDownUp size={14} />
                        <span>年月 ({sortOrder === "desc" ? "新 → 舊" : "舊 → 新"})</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleOpenAddModal}
                        className="p-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors font-bold text-xs shadow-sm flex items-center gap-1.5 shrink-0"
                    >
                        <Plus size={16} /> 新增行情
                    </button>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700 pb-2">
                <table className="w-full text-sm text-left min-w-[750px]">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 uppercase">
                        <tr>
                            <th
                                className="px-3 py-3 font-medium cursor-pointer select-none hover:text-slate-800 dark:hover:text-white transition-colors"
                                onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
                            >
                                年月 {sortOrder === "desc" ? "↓" : "↑"}
                            </th>
                            <th className="px-3 py-3 font-medium">樓層</th>
                            <th className="px-3 py-3 font-medium">格局</th>
                            <th className="px-3 py-3 font-medium text-right">總價</th>
                            <th className="px-3 py-3 font-medium text-right">房屋坪</th>
                            <th className="px-3 py-3 font-medium text-right text-emerald-600 dark:text-emerald-400">單價 (萬/坪)</th>
                            <th className="px-3 py-3 font-medium text-right">車位坪</th>
                            <th className="px-3 py-3 font-medium text-right">車位價</th>
                            <th className="px-3 py-3 font-medium">車位</th>
                            <th className="px-3 py-3 font-medium">備註</th>
                            <th className="px-2 py-3 font-medium text-center w-16">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {sortedTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={11} className="px-4 py-8 text-center text-slate-400 text-xs sm:text-sm">
                                    目前沒有手動紀錄行情，點擊右上角「+ 新增行情」開始記錄
                                </td>
                            </tr>
                        ) : (
                            sortedTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                                    <td className="px-3 py-3 font-bold text-slate-800 dark:text-slate-200">{tx.date}</td>
                                    <td className="px-3 py-3 text-slate-700 dark:text-slate-300">{tx.floor || "-"}</td>
                                    <td className="px-3 py-3 text-slate-700 dark:text-slate-300 truncate max-w-[80px]" title={tx.layout || ""}>{tx.layout || "-"}</td>
                                    <td className="px-3 py-3 text-right font-bold text-red-500 dark:text-red-400">{formatNumber(tx.totalPrice)}萬</td>
                                    <td className="px-3 py-3 text-right text-slate-600 dark:text-slate-400">{formatNumber(tx.housePing) || "-"}</td>
                                    <td className="px-3 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">{formatNumber(tx.unitPrice) || "-"}</td>
                                    <td className="px-3 py-3 text-right text-slate-600 dark:text-slate-400">{formatNumber(tx.parkingPing) || "-"}</td>
                                    <td className="px-3 py-3 text-right text-slate-600 dark:text-slate-400">{tx.parkingPrice ? `${formatNumber(tx.parkingPrice)}萬` : "-"}</td>
                                    <td className="px-3 py-3 text-slate-600 dark:text-slate-400 truncate max-w-[60px]" title={tx.parkingType || ""}>{tx.parkingType || "-"}</td>
                                    <td className="px-3 py-3 text-slate-500 dark:text-slate-500 truncate max-w-[100px]" title={tx.notes || ""}>{tx.notes || "-"}</td>
                                    <td className="px-2 py-3 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenEditModal(tx)}
                                                className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-1.5 rounded-lg transition-all"
                                                title="編輯行情"
                                            >
                                                <Edit3 size={15} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeletingTx(tx)}
                                                className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg transition-all"
                                                title="刪除行情"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add / Edit Transaction Modal */}
            {isTxModalOpen && (
                <PropertyTransactionModal
                    mode={modalMode}
                    initialData={editingTx}
                    onCloseBtnClick={() => setIsTxModalOpen(false)}
                    onSubmit={handleSaveTx}
                />
            )}

            {/* Delete Transaction Modal */}
            {deletingTx && (
                <DeleteModal
                    deleteKey={`${deletingTx.date} ${deletingTx.floor ? `(${deletingTx.floor})` : ""} 行情紀錄 (${deletingTx.totalPrice} 萬)`}
                    title="確定要刪除此筆行情？"
                    description={`您即將刪除 ${deletingTx.date} 成交總價 ${deletingTx.totalPrice} 萬的參考行情紀錄。此動作無法復原。`}
                    onCloseClick={() => setDeletingTx(null)}
                    onConfirmClick={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default PropertyTransactionsCard;
