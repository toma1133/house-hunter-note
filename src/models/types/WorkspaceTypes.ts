import type { Tables, TablesInsert, TablesUpdate } from "./DatabaseTypes";

export type WorkspaceRow = Tables<"workspaces">;
export type WorkspaceRowInsert = TablesInsert<"workspaces">;
export type WorkspaceRowUpdate = TablesUpdate<"workspaces">;

export type WorkspaceMemberRow = Tables<"workspace_members"> & {
    user_email?: string;
};
export type WorkspaceMemberRowInsert = TablesInsert<"workspace_members">;

export type WorkspaceInviteRow = Tables<"workspace_invites">;
export type WorkspaceInviteRowInsert = TablesInsert<"workspace_invites">;

export type WorkspaceVM = WorkspaceRow & {
    role?: string;
};
