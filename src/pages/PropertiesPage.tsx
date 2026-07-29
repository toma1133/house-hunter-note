import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useIsMutating } from "@tanstack/react-query";
import useAuth from "../hooks/UseAuth";
import useProperties from "../hooks/UseProperties";
import usePropertyMutations from "../hooks/UsePropertyMutations";
import useConditionTemplate from "../hooks/UseConditionTemplate";
import useConditionTemplateMutations from "../hooks/UseConditionTemplateMutations";
import useWorkspaces, {
    useWorkspaceMutations,
    usePendingInvites,
    useInviteAction,
} from "../hooks/UseWorkspaces";
import type LayoutContextType from "../models/types/LayoutContextTypes";
import type {
    PropertyRoomImage,
    PropertyVM,
} from "../models/types/PropertyTypes";
import type { ConditionTemplateVM } from "../models/types/ConditionTemplateTypes";
import PropertyList from "../components/properties/PropertyList";
import PageHeader from "../components/common/PageHeader";
import DeleteModal from "../components/common/DeleteModal";
import PropertyModal from "../components/properties/PropertyModal";
import ConditionModal from "../components/properties/ConditionModal";
import ShareModal from "../components/common/ShareModal";
import PendingInvitesBanner from "../components/common/PendingInvitesBanner";

const PropertiesPage = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { session } = useAuth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    // Workspace & Invites Hooks
    const { data: workspaces = [] } = useWorkspaces(userId);
    const { createWs, inviteMember } = useWorkspaceMutations(userId);
    const { data: pendingInvites = [] } = usePendingInvites(userEmail);
    const inviteAction = useInviteAction(userEmail);

    const currentWorkspace = workspaces.find((w) => w.id === workspaceId);

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const {
        data: properties,
        isLoading: isPropertiesLoading,
        error: propertiesError,
    } = useProperties(userId, workspaceId);
    const {
        insert: insertProperty,
        update: updateProperty,
        remove: removeProperty,
        anyPending: anyPropertyPending,
    } = usePropertyMutations();

    const { data: conditionTemplate } = useConditionTemplate(workspaceId);
    const { saveTemplate } = useConditionTemplateMutations();

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

    // Condition Template Modal
    const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);

    const handleOpenConditionModal = () => {
        setIsConditionModalOpen(true);
    };

    const handleCloseConditionModal = () => {
        setIsConditionModalOpen(false);
    };

    const handleSaveConditionTemplate = async (
        updatedTemplate: ConditionTemplateVM,
    ) => {
        if (!userId) return;
        await saveTemplate.mutateAsync({
            ...updatedTemplate,
            workspace_id: workspaceId || null,
        });

        setIsConditionModalOpen(false);
    };

    // Property Modal
    const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
    const initialPropertyState: PropertyVM = useMemo(
        () => ({
            address: "",
            buildingType: "",
            city: "台北市",
            community: "",
            conditions: conditionTemplate
                ? {
                      mustHaves: conditionTemplate.mustHaves.map((c) => ({
                          ...c,
                          checked: false,
                      })),
                      niceToHaves: conditionTemplate.niceToHaves.map(
                          (c) => ({
                              ...c,
                              checked: false,
                          }),
                      ),
                  }
                : null,
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
            totalUnits: 0,
            transactions: [],
            unit: "",
            user_id: session ? session.user.id : "",
            workspace_id: workspaceId || null,
        }),
        [session, conditionTemplate, workspaceId],
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

    const handleAddRoomImage = (image: PropertyRoomImage) => {
        setFormProperty((prev) => ({
            ...prev,
            roomImages: [...(prev.roomImages || []), image],
        }));
    };

    const handleDeleteRoomImage = (imageId: string) => {
        setFormProperty((prev) => ({
            ...prev,
            roomImages: (prev.roomImages || []).filter(
                (img) => img.id !== imageId,
            ),
        }));
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
                    workspace_id: workspaceId || propertyData.workspace_id,
                    created_at: new Date().toISOString(),
                });
            } else {
                await updateProperty.mutateAsync({
                    ...propertyData,
                    workspace_id: workspaceId || propertyData.workspace_id,
                });
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
        if (workspaceId) {
            navigate(`/workspaces/${workspaceId}/property/${propertyId}`, {
                replace: false,
            });
        }
    };

    return (
        <div className="max-w-5xl lg:max-w-6xl mx-auto p-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
            <PendingInvitesBanner
                invites={pendingInvites}
                onAccept={(inviteId) =>
                    inviteAction.mutate({ inviteId, status: "accepted" })
                }
                onReject={(inviteId) =>
                    inviteAction.mutate({ inviteId, status: "rejected" })
                }
            />
            <PageHeader
                mode="list"
                title={currentWorkspace?.name || "看屋筆記"}
                onAddBtnClick={handleAddPropertyBtnClick}
                onSettingsBtnClick={handleOpenConditionModal}
                onShareBtnClick={() => setIsShareModalOpen(true)}
                onBackBtnClick={() => navigate("/workspaces")}
            />
            <PropertyList
                properties={properties}
                onCardClick={handleSelectProperty}
                onEditBtnClick={handleEditPropertyBtnClick}
                onDeleteBtnClick={handleOpenDeletePropertyModal}
            />
            {isShareModalOpen && workspaceId && (
                <ShareModal
                    workspaces={workspaces}
                    currentWorkspaceId={workspaceId}
                    onSelectWorkspace={() => {}}
                    onCreateWorkspace={async (name) => {
                        await createWs.mutateAsync(name);
                    }}
                    onInviteMember={async (wsId, email) => {
                        await inviteMember.mutateAsync({
                            workspaceId: wsId,
                            email,
                        });
                    }}
                    onClose={() => setIsShareModalOpen(false)}
                />
            )}
            {isPropertyModalOpen && (
                <PropertyModal
                    formData={formProperty}
                    mode={propertyModalMode}
                    onCloseBtnClick={handleClosePropertyModalBtnClick}
                    onFormChange={handlePropertyFormInputChange}
                    onFormSubmit={handlePropertyModalSubmit}
                    onAddRoomImage={handleAddRoomImage}
                    onDeleteRoomImage={handleDeleteRoomImage}
                />
            )}
            {isConditionModalOpen && conditionTemplate && (
                <ConditionModal
                    template={conditionTemplate}
                    properties={properties}
                    workspaces={workspaces}
                    onCloseBtnClick={handleCloseConditionModal}
                    onSave={handleSaveConditionTemplate}
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
