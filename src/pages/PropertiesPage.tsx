import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useIsMutating } from "@tanstack/react-query";
import useAuth from "../hooks/UseAuth";
import useProperties from "../hooks/UseProperties";
import usePropertyMutations from "../hooks/UsePropertyMutations";
import type LayoutContextType from "../models/types/LayoutContextTypes";
import type { PropertyVM } from "../models/types/PropertyTypes";
import PropertyList from "../components/properties/PropertyList";
import PropertyHeader from "../components/properties/PropertyHeader";
import DeleteModal from "../components/common/DeleteModal";
import PropertyModal from "../components/properties/PropertyModal";

const PropertiesPage = () => {
    const { session } = useAuth();
    const userId = session?.user?.id;
    const {
        data: properties,
        isLoading: isPropertiesLoading,
        error: propertiesError,
    } = useProperties(userId);
    const {
        insert: insertProperty,
        update: updateProperty,
        remove: removeProperty,
        anyPending: anyPropertyPending,
    } = usePropertyMutations();
    const [targetProperty, setTargetProperty] = useState<
        PropertyVM | undefined
    >(undefined);

    const { setIsPageLoading } = useOutletContext<LayoutContextType>();
    const navigate = useNavigate();

    const mutatingCount = useIsMutating({
        mutationKey: ["properties", "property"],
    });

    useEffect(() => {
        let timer: number | undefined;
        const shouldShow =
            isPropertiesLoading || anyPropertyPending || mutatingCount > 0;

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
    }, [
        isPropertiesLoading,
        anyPropertyPending,
        mutatingCount,
        setIsPageLoading,
    ]);

    // Property Modal
    const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
    const initialPropertyState: PropertyVM = useMemo(
        () => ({
            address: "",
            buildingType: "",
            city: "台北市",
            community: "",
            conditions: [],
            coverImage: "",
            created_at: null,
            district: "",
            evCharging: false,
            floorPlanImage: "",
            houseAge: 0,
            id: crypto.randomUUID(),
            indoorPing: 0,
            landZoning: "",
            layoutBalconies: 0,
            layoutBaths: 0,
            layoutHalls: 0,
            layoutRooms: 0,
            managementFee: 0,
            parking: "",
            parkingPing: 0,
            publicRatio: 0,
            roomImages: [],
            score: 0,
            totalPrice: 0,
            totalPing: 0,
            transactions: [],
            unit: "",
            user_id: session ? session.user.id : "",
        }),
        [session],
    );

    const [propertyModalMode, setPropertyModalMode] = useState("create"); // 'create' | 'edit'
    const [formProperty, setFormProperty] =
        useState<PropertyVM>(initialPropertyState);
    const [propertyToDelete, setPropertyToDelete] = useState<PropertyVM | null>(
        null,
    );

    const handleAddPropertyBtnClick = () => {
        setPropertyModalMode("create");
        setFormProperty(initialPropertyState);
        setIsPropertyModalOpen(true);
    };

    const handleEditPropertyBtnClick = (propertyItem: PropertyVM) => {
        setPropertyModalMode("edit");
        setFormProperty(propertyItem);
        setIsPropertyModalOpen(true);
    };

    const handleClosePropertyModalBtnClick = () => {
        setPropertyModalMode("create");
        setFormProperty(initialPropertyState);
        setIsPropertyModalOpen(false);
    };

    const handlePropertyFormInputChange = (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;

        if (name === "evCharging") {
            setFormProperty((prev) => ({ ...prev, [name]: e.target.checked }));
            return;
        }

        setFormProperty((prev) => ({ ...prev, [name]: value }));
    };

    const handlePropertyModalSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const propertyData: PropertyVM = { ...formProperty };

        try {
            if (propertyModalMode === "create") {
                var propertyId = crypto.randomUUID();

                await insertProperty.mutateAsync({
                    ...propertyData,
                    id: propertyId,
                    created_at: new Date().toISOString(),
                });
            } else {
                await updateProperty.mutateAsync(propertyData);
            }
            setFormProperty(initialPropertyState);
            setIsPropertyModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    // --- Common delete modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteType, setDeleteType] = useState("");
    const [deleteKey, setDeleteKey] = useState("");

    const handleOpenDeletePropertyModal = (propertyItem: PropertyVM) => {
        setPropertyToDelete(propertyItem);
        setDeleteType("property");
        setDeleteKey(`${propertyItem.community}`);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            switch (deleteType) {
                case "property":
                    if (!propertyToDelete) return;
                    await removeProperty.mutateAsync(propertyToDelete.id);
                    break;
            }

            setIsDeleteModalOpen(false);
            setPropertyToDelete(null);
            setDeleteType("");
            setDeleteKey("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setPropertyToDelete(null);
        setDeleteType("");
        setDeleteKey("");
    };

    const handleSelectProperty = (propertyId: string) => {
        navigate(`/property/${propertyId}`, { replace: false });
    };

    return (
        <div className="max-w-3xl mx-auto p-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
            <PropertyHeader onAddBtnClick={handleAddPropertyBtnClick} />
            <PropertyList
                properties={properties}
                onEditBtnClick={handleEditPropertyBtnClick}
                onDeleteBtnClick={handleOpenDeletePropertyModal}
            />
            {isPropertyModalOpen && (
                <PropertyModal
                    formData={formProperty}
                    mode={propertyModalMode}
                    onCloseBtnClick={handleClosePropertyModalBtnClick}
                    onFormChange={handlePropertyFormInputChange}
                    onFormSubmit={handlePropertyModalSubmit}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteModal
                    deleteKey={deleteKey}
                    onCloseClick={handleCloseDeleteModal}
                    onConfirmClick={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default PropertiesPage;
