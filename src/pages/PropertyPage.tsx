import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useProperty from "../hooks/UseProperty";
import usePropertyMutations from "../hooks/UsePropertyMutations";
import useConditionTemplate from "../hooks/UseConditionTemplate";
import type {
    PropertyCondition,
    PropertyRoomImage,
    PropertyTransaction,
    PropertyVM,
} from "../models/types/PropertyTypes";
import type LayoutContextType from "../models/types/LayoutContextTypes";
import PropertyModal from "../components/properties/PropertyModal";
import DeleteModal from "../components/common/DeleteModal";
import LoadingMask from "../components/common/LoadingMask";
import PageHeader from "../components/common/PageHeader";
import ImagePreviewModal from "../components/common/ImagePreviewModal";
import PropertyInfoCard from "../components/property/PropertyInfoCard";
import PropertyTransactionsCard from "../components/property/PropertyTransactionsCard";
import PropertyGalleryCard from "../components/property/PropertyGalleryCard";
import PropertyChecklistCard from "../components/property/PropertyChecklistCard";

const calculateScore = (cond: PropertyCondition | null | undefined) => {
    if (!cond) return 0;
    const mustHaves = cond.mustHaves || [];
    const niceToHaves = cond.niceToHaves || [];

    const mustHaveTotal = mustHaves.length;
    const mustHaveChecked = mustHaves.filter((c) => c.checked).length;
    const mustScore =
        mustHaveTotal > 0 ? (mustHaveChecked / mustHaveTotal) * 70 : 0;

    const niceToHaveTotal = niceToHaves.length;
    const niceToHaveChecked = niceToHaves.filter((c) => c.checked).length;
    const niceScore =
        niceToHaveTotal > 0 ? (niceToHaveChecked / niceToHaveTotal) * 30 : 0;

    return Math.round(mustScore + niceScore);
};

const PropertyPage = () => {
    const { workspaceId, id } = useParams<{
        workspaceId: string;
        id: string;
    }>();
    const navigate = useNavigate();
    const { session } = useAuth();
    const userId = session?.user?.id;
    const { data: prop, isLoading, error } = useProperty(id);
    const { data: conditionTemplate } = useConditionTemplate(workspaceId);
    const { update: updateProperty, remove: removeProperty, anyPending } =
        usePropertyMutations();

    const { setIsPageLoading } = useOutletContext<LayoutContextType>();
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        let timer: number | undefined;
        // isSyncing is local state for template sync, we can also show loading mask for it
        const shouldShow = isLoading || anyPending || isSyncing;

        if (shouldShow) {
            timer = window.setTimeout(() => setIsPageLoading(true), 150);
        } else {
            setIsPageLoading(false);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            setIsPageLoading(false);
        };
    }, [isLoading, anyPending, isSyncing, setIsPageLoading]);

    // Image preview state
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Edit modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState<PropertyVM | null>(null);

    // Delete modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleBack = () => {
        if (workspaceId) {
            navigate(`/workspaces/${workspaceId}`);
        } else {
            navigate("/workspaces");
        }
    };

    if (isLoading) return <LoadingMask />;
    if (error || !prop) {
        return (
            <div className="max-w-3xl mx-auto p-8 text-center space-y-4">
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    找不到物件資料
                </p>
                <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm"
                >
                    返回列表
                </button>
            </div>
        );
    }

    // Must have / Nice to have stats
    const currentConditions = prop.conditions || {
        mustHaves: [],
        niceToHaves: [],
    };
    const mustHavesList = currentConditions.mustHaves || [];
    const niceToHavesList = currentConditions.niceToHaves || [];

    const mustHaveTotal = mustHavesList.length;
    const mustHaveChecked = mustHavesList.filter((c) => c.checked).length;
    const mustProgress =
        mustHaveTotal > 0 ? (mustHaveChecked / mustHaveTotal) * 100 : 0;

    const niceToHaveTotal = niceToHavesList.length;
    const niceToHaveChecked = niceToHavesList.filter((c) => c.checked).length;
    const niceProgress =
        niceToHaveTotal > 0 ? (niceToHaveChecked / niceToHaveTotal) * 100 : 0;

    // Handlers
    const handleToggleCondition = async (
        type: "mustHaves" | "niceToHaves",
        conditionId: string,
    ) => {
        const updatedMustHaves = mustHavesList.map((c) =>
            c.id === conditionId ? { ...c, checked: !c.checked } : c,
        );
        const updatedNiceToHaves = niceToHavesList.map((c) =>
            c.id === conditionId ? { ...c, checked: !c.checked } : c,
        );

        const updatedConditions: PropertyCondition = {
            mustHaves:
                type === "mustHaves" ? updatedMustHaves : mustHavesList,
            niceToHaves:
                type === "niceToHaves"
                    ? updatedNiceToHaves
                    : niceToHavesList,
        };

        const newScore = calculateScore(updatedConditions);

        await updateProperty.mutateAsync({
            ...prop,
            conditions: updatedConditions,
            score: newScore,
        });
    };

    const handleSyncTemplate = async () => {
        if (!conditionTemplate || !prop) return;
        try {
            setIsSyncing(true);

            // Lookup existing checked statuses
            const existingCheckedMap = new Map<string, boolean>();
            (mustHavesList || []).forEach((item) => {
                existingCheckedMap.set(item.text, item.checked);
                existingCheckedMap.set(item.id, item.checked);
            });
            (niceToHavesList || []).forEach((item) => {
                existingCheckedMap.set(item.text, item.checked);
                existingCheckedMap.set(item.id, item.checked);
            });

            const updatedMustHaves = conditionTemplate.mustHaves.map(
                (item) => ({
                    ...item,
                    checked:
                        existingCheckedMap.get(item.id) ??
                        existingCheckedMap.get(item.text) ??
                        false,
                }),
            );

            const updatedNiceToHaves = conditionTemplate.niceToHaves.map(
                (item) => ({
                    ...item,
                    checked:
                        existingCheckedMap.get(item.id) ??
                        existingCheckedMap.get(item.text) ??
                        false,
                }),
            );

            const updatedConditions: PropertyCondition = {
                mustHaves: updatedMustHaves,
                niceToHaves: updatedNiceToHaves,
            };

            const newScore = calculateScore(updatedConditions);

            await updateProperty.mutateAsync({
                ...prop,
                conditions: updatedConditions,
                score: newScore,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setIsSyncing(false);
        }
    };

    const handleAddTransaction = async (txData: {
        date: string;
        floor: string;
        totalPrice: string;
        unitPrice: string;
    }) => {
        const newTx: PropertyTransaction = {
            id: crypto.randomUUID(),
            date: txData.date.trim(),
            floor: txData.floor.trim(),
            totalPrice: txData.totalPrice.trim(),
            unitPrice: txData.unitPrice.trim(),
        };

        const updatedTransactions = [...(prop.transactions || []), newTx];
        await updateProperty.mutateAsync({
            ...prop,
            transactions: updatedTransactions,
        });
    };

    const handleDeleteTransaction = async (txId: string) => {
        const updatedTransactions = (prop.transactions || []).filter(
            (tx) => tx.id !== txId,
        );
        await updateProperty.mutateAsync({
            ...prop,
            transactions: updatedTransactions,
        });
    };

    const handleOpenEditModal = () => {
        setEditFormData(prop);
        setIsEditModalOpen(true);
    };

    const handleEditFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!editFormData) return;
        const { name, value } = e.target;
        if (name === "evCharging") {
            setEditFormData({ ...editFormData, [name]: e.target.checked });
            return;
        }
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleAddEditRoomImage = (image: PropertyRoomImage) => {
        if (!editFormData) return;
        setEditFormData({
            ...editFormData,
            roomImages: [...(editFormData.roomImages || []), image],
        });
    };

    const handleDeleteEditRoomImage = (imageId: string) => {
        if (!editFormData) return;
        setEditFormData({
            ...editFormData,
            roomImages: (editFormData.roomImages || []).filter(
                (img) => img.id !== imageId,
            ),
        });
    };

    const handleSaveEditForm = async (e: FormEvent) => {
        e.preventDefault();
        if (!editFormData) return;
        await updateProperty.mutateAsync(editFormData);
        setIsEditModalOpen(false);
        setEditFormData(null);
    };

    const handleConfirmDeleteProperty = async () => {
        await removeProperty.mutateAsync(prop.id);
        handleBack();
    };

    return (
        <div className="max-w-5xl lg:max-w-6xl mx-auto pb-20 p-4 pt-4 animate-in slide-in-from-right-8 duration-300 min-h-screen">
            {/* Header */}
            <PageHeader
                mode="detail"
                title={prop.community}
                subtitle={
                    prop.unit
                        ? `${prop.city} ${prop.district} • ${prop.unit}`
                        : `${prop.city} ${prop.district}`
                }
                score={prop.score}
                totalPrice={prop.totalPrice}
                onBackBtnClick={handleBack}
                onEditBtnClick={handleOpenEditModal}
                onDeleteBtnClick={() => setIsDeleteModalOpen(true)}
            />

            {/* Main Grid Content for Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Property Info & Photos & Transactions */}
                <div className="lg:col-span-7 space-y-6">
                    <PropertyInfoCard
                        property={prop}
                        onImageClick={(url) => setPreviewImage(url)}
                    />

                    <PropertyGalleryCard
                        floorPlanImage={prop.floorPlanImage}
                        roomImages={prop.roomImages}
                        onImageClick={(url) => setPreviewImage(url)}
                    />

                    <PropertyTransactionsCard
                        transactions={prop.transactions}
                        onAddTransaction={handleAddTransaction}
                        onDeleteTransaction={handleDeleteTransaction}
                    />
                </div>

                {/* Right Column: Conditions Checklist & Scoring */}
                <div className="lg:col-span-5 space-y-6">
                    <PropertyChecklistCard
                        mustHavesList={mustHavesList}
                        niceToHavesList={niceToHavesList}
                        mustHaveChecked={mustHaveChecked}
                        mustHaveTotal={mustHaveTotal}
                        mustProgress={mustProgress}
                        niceToHaveChecked={niceToHaveChecked}
                        niceToHaveTotal={niceToHaveTotal}
                        niceProgress={niceProgress}
                        onToggleCondition={handleToggleCondition}
                        onSyncTemplate={handleSyncTemplate}
                        isSyncing={isSyncing}
                    />
                </div>
            </div>

            {/* Property Edit Modal */}
            {isEditModalOpen && editFormData && (
                <PropertyModal
                    formData={editFormData}
                    mode="edit"
                    onCloseBtnClick={() => {
                        setIsEditModalOpen(false);
                        setEditFormData(null);
                    }}
                    onFormChange={handleEditFormInputChange}
                    onFormSubmit={handleSaveEditForm}
                    onAddRoomImage={handleAddEditRoomImage}
                    onDeleteRoomImage={handleDeleteEditRoomImage}
                />
            )}

            {/* Property Delete Modal */}
            {isDeleteModalOpen && (
                <DeleteModal
                    deleteKey={prop.community}
                    onCloseClick={() => setIsDeleteModalOpen(false)}
                    onConfirmClick={handleConfirmDeleteProperty}
                />
            )}

            {/* Image Preview Modal */}
            <ImagePreviewModal
                imageUrl={previewImage}
                onClose={() => setPreviewImage(null)}
            />
        </div>
    );
};

export default PropertyPage;
