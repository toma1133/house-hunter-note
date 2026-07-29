import type {
    WorkspaceRow,
    WorkspaceVM,
    WorkspaceInviteRowInsert,
} from "../../models/types/WorkspaceTypes";

// ── Workspace ───────────────────────────────────────────────

export const toWorkspaceVM = (
    row: WorkspaceRow,
    role: string = "member",
): WorkspaceVM => {
    return { ...row, role };
};

export const toWorkspacesVM = (
    rows: WorkspaceRow[],
    roleMap: Map<string, string>,
): WorkspaceVM[] => {
    return rows.map((row) => toWorkspaceVM(row, roleMap.get(row.id) || "member"));
};

// ── Invite ──────────────────────────────────────────────────

export const toInviteInsert = (
    workspaceId: string,
    inviterId: string,
    inviteeEmail: string,
): WorkspaceInviteRowInsert => {
    return {
        workspace_id: workspaceId,
        inviter_id: inviterId,
        invitee_email: inviteeEmail.trim(),
        status: "pending",
    };
};
