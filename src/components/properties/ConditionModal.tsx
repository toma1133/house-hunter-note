import { FormEvent, MouseEventHandler, useState } from "react";
import { Copy, Info, Plus, Trash2 } from "lucide-react";
import type {
    ConditionTemplateVM,
    ConditionItem,
} from "../../models/types/ConditionTemplateTypes";
import type { PropertyVM } from "../../models/types/PropertyTypes";
import type { WorkspaceVM } from "../../models/types/WorkspaceTypes";
import FormModal from "../common/FormModal";
import { conditionTemplateRepo } from "../../services/repositories/ConditionTemplateRepo";

type ConditionModalProps = {
    template: ConditionTemplateVM;
    properties?: PropertyVM[];
    workspaces?: WorkspaceVM[];
    onCloseBtnClick: MouseEventHandler<HTMLButtonElement>;
    onSave: (updatedTemplate: ConditionTemplateVM) => Promise<void>;
};

const ConditionModal = ({
    template,
    properties = [],
    workspaces = [],
    onCloseBtnClick,
    onSave,
}: ConditionModalProps) => {
    const [mustHaves, setMustHaves] = useState<ConditionItem[]>(
        template.mustHaves || [],
    );
    const [niceToHaves, setNiceToHaves] = useState<ConditionItem[]>(
        template.niceToHaves || [],
    );

    const [newMustHaveText, setNewMustHaveText] = useState("");
    const [newNiceToHaveText, setNewNiceToHaveText] = useState("");
    const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);

    const handleCopyFromWorkspace = async () => {
        if (!selectedWorkspaceId) return;
        try {
            const workspaceTemplate =
                await conditionTemplateRepo.getTemplate(selectedWorkspaceId);
            if (!workspaceTemplate) return;

            const { mustHaves: wsMusts, niceToHaves: wsNices } =
                workspaceTemplate;

            if (Array.isArray(wsMusts) && wsMusts.length > 0) {
                setMustHaves((prev) => [
                    ...prev,
                    ...wsMusts.map((item) => ({
                        id: crypto.randomUUID(),
                        condition_id: item.condition_id || "",
                        text: item.text,
                        checked: false,
                    })),
                ]);
            }

            if (Array.isArray(wsNices) && wsNices.length > 0) {
                setNiceToHaves((prev) => [
                    ...prev,
                    ...wsNices.map((item) => ({
                        id: crypto.randomUUID(),
                        condition_id: item.condition_id || "",
                        text: item.text,
                        checked: false,
                    })),
                ]);
            }
            setSelectedWorkspaceId("");
        } catch (err) {
            console.error("Failed to copy from workspace", err);
        }
    };

    const handleCopyFromProperty = () => {
        if (!selectedPropertyId) return;
        const targetProp = properties.find((p) => p.id === selectedPropertyId);
        if (!targetProp || !targetProp.conditions) return;

        const { mustHaves: propMusts, niceToHaves: propNices } =
            targetProp.conditions;

        if (Array.isArray(propMusts) && propMusts.length > 0) {
            setMustHaves((prev) => [
                ...prev,
                ...propMusts.map((item) => ({
                    id: crypto.randomUUID(),
                    condition_id: item.condition_id || "",
                    text: item.text,
                    checked: false,
                })),
            ]);
        }

        if (Array.isArray(propNices) && propNices.length > 0) {
            setNiceToHaves((prev) => [
                ...prev,
                ...propNices.map((item) => ({
                    id: crypto.randomUUID(),
                    condition_id: item.condition_id || "",
                    text: item.text,
                    checked: false,
                })),
            ]);
        }
        setSelectedPropertyId("");
    };

    const handleAddMustHave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMustHaveText.trim()) return;
        setMustHaves((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                condition_id: "",
                text: newMustHaveText.trim(),
                checked: false,
            },
        ]);
        setNewMustHaveText("");
    };

    const handleDeleteMustHave = (id: string) => {
        setMustHaves((prev) => prev.filter((item) => item.id !== id));
    };

    const handleAddNiceToHave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNiceToHaveText.trim()) return;
        setNiceToHaves((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                condition_id: "",
                text: newNiceToHaveText.trim(),
                checked: false,
            },
        ]);
        setNewNiceToHaveText("");
    };

    const handleDeleteNiceToHave = (id: string) => {
        setNiceToHaves((prev) => prev.filter((item) => item.id !== id));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            await onSave({
                ...template,
                mustHaves,
                niceToHaves,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <FormModal
            formId="condition-template-form"
            modalTitle="預設評分條件設定"
            modalSaveTitle={isSaving ? "儲存中..." : "儲存設定"}
            onCancelBtnClick={onCloseBtnClick}
            onCloseBtnClick={onCloseBtnClick}
            onSubmit={handleSubmit}
        >
            <div className="space-y-6">
                {/* Copy from other Workspace section */}
                {workspaces.length > 1 && (
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Copy size={16} className="text-indigo-500" />
                            從其他計畫複製預設條件
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={selectedWorkspaceId}
                                onChange={(e) =>
                                    setSelectedWorkspaceId(e.target.value)
                                }
                                className="flex-grow p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">
                                    -- 選擇要複製條件的計畫 --
                                </option>
                                {workspaces
                                    .filter(
                                        (w) => w.id !== template.workspace_id,
                                    )
                                    .map((w) => (
                                        <option key={w.id} value={w.id}>
                                            {w.name}
                                        </option>
                                    ))}
                            </select>
                            <button
                                type="button"
                                onClick={handleCopyFromWorkspace}
                                disabled={!selectedWorkspaceId}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors shrink-0 flex items-center gap-1"
                            >
                                複製
                            </button>
                        </div>
                    </div>
                )}

                {/* Copy from existing Property section */}
                {properties.length > 0 && (
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Copy size={16} className="text-indigo-500" />
                            從現有物件筆記複製評分條件
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={selectedPropertyId}
                                onChange={(e) =>
                                    setSelectedPropertyId(e.target.value)
                                }
                                className="flex-grow p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">
                                    -- 選擇要複製條件的看屋筆記 --
                                </option>
                                {properties.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.community ||
                                            p.address ||
                                            p.unit ||
                                            "未命名物件"}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={handleCopyFromProperty}
                                disabled={!selectedPropertyId}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors shrink-0 flex items-center gap-1"
                            >
                                複製
                            </button>
                        </div>
                    </div>
                )}

                {/* Must Haves Section */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
                    <h3 className="text-base font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                        必需項清單 (Must Haves)
                    </h3>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMustHaveText}
                            onChange={(e) => setNewMustHaveText(e.target.value)}
                            placeholder="輸入新的必需條件 (如: 主臥室開窗)..."
                            className="flex-grow p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm dark:text-white transition-all"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddMustHave(e);
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleAddMustHave}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors shrink-0 flex items-center gap-1"
                        >
                            <Plus size={16} /> 新增
                        </button>
                    </div>

                    <ul className="space-y-2.5 pt-1">
                        {mustHaves.length === 0 ? (
                            <li className="text-xs text-slate-400 dark:text-slate-500 text-center py-3 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                                尚未加入任何必需條件
                            </li>
                        ) : (
                            mustHaves.map((condition) => (
                                <li
                                    key={condition.id}
                                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 group hover:border-slate-200 dark:hover:border-slate-600 transition-colors"
                                >
                                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {condition.text}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteMustHave(condition.id)
                                        }
                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg opacity-70 group-hover:opacity-100 transition-all"
                                        title="刪除"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Nice To Haves Section */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
                    <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        加分項清單 (Nice To Haves)
                    </h3>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newNiceToHaveText}
                            onChange={(e) =>
                                setNewNiceToHaveText(e.target.value)
                            }
                            placeholder="輸入新的加分條件 (如: 近捷運站)..."
                            className="flex-grow p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm dark:text-white transition-all"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddNiceToHave(e);
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleAddNiceToHave}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors shrink-0 flex items-center gap-1"
                        >
                            <Plus size={16} /> 新增
                        </button>
                    </div>

                    <ul className="space-y-2.5 pt-1">
                        {niceToHaves.length === 0 ? (
                            <li className="text-xs text-slate-400 dark:text-slate-500 text-center py-3 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                                尚未加入任何加分條件
                            </li>
                        ) : (
                            niceToHaves.map((condition) => (
                                <li
                                    key={condition.id}
                                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 group hover:border-slate-200 dark:hover:border-slate-600 transition-colors"
                                >
                                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {condition.text}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteNiceToHave(condition.id)
                                        }
                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg opacity-70 group-hover:opacity-100 transition-all"
                                        title="刪除"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </FormModal>
    );
};

export default ConditionModal;
