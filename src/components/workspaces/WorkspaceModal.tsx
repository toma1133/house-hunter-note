import React, { useState, useEffect } from "react";
import FormModal from "../common/FormModal";

type WorkspaceModalProps = {
    mode: "create" | "edit";
    initialData?: { name: string };
    onClose: () => void;
    onSubmit: (name: string) => void;
};

const WorkspaceModal = ({
    mode,
    initialData,
    onClose,
    onSubmit,
}: WorkspaceModalProps) => {
    const [name, setName] = useState(initialData?.name || "");

    useEffect(() => {
        if (mode === "edit" && initialData?.name) {
            setName(initialData.name);
        } else if (mode === "create") {
            setName("");
        }
    }, [mode, initialData?.name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit(name.trim());
    };

    const isEdit = mode === "edit";
    const modalTitle = isEdit ? "編輯計畫名稱" : "建立新看房計畫";
    const saveTitle = isEdit ? "儲存更新" : "建立計畫";

    return (
        <FormModal
            formId="workspace-form"
            modalTitle={modalTitle}
            modalSaveTitle={saveTitle}
            onCancelBtnClick={onClose}
            onCloseBtnClick={onClose}
            onSubmit={handleSubmit}
            maxWidth="max-w-md"
        >
            <form id="workspace-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                        計畫名稱 *
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="例如：台北雙人買房計畫"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                </div>
            </form>
        </FormModal>
    );
};

export default WorkspaceModal;
