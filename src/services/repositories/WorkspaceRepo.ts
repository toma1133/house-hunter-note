import { supabaseClient } from "../SupabaseClient";
import { toWorkspacesVM, toInviteInsert } from "../mappers/WorkspaceMapper";
import type {
    WorkspaceVM,
    WorkspaceMemberRow,
    WorkspaceInviteRow,
} from "../../models/types/WorkspaceTypes";

export const workspaceRepo = {
    // ── Workspace CRUD ──────────────────────────────────────

    async listByUser(userId: string): Promise<WorkspaceVM[]> {
        // 取得使用者參與的 workspaces
        const { data: members, error: memberError } = await supabaseClient
            .from("workspace_members")
            .select("workspace_id, role")
            .eq("user_id", userId);

        if (memberError) throw memberError;
        if (!members || members.length === 0) return [];

        const workspaceIds = members.map((m) => m.workspace_id);
        const { data: workspaces, error: wsError } = await supabaseClient
            .from("workspaces")
            .select("*")
            .in("id", workspaceIds);

        if (wsError) throw wsError;

        // 附帶 role 資訊
        const roleMap = new Map(members.map((m) => [m.workspace_id, m.role]));
        return toWorkspacesVM(workspaces || [], roleMap);
    },

    async create(name: string, userId: string): Promise<WorkspaceVM> {
        const wsId = crypto.randomUUID();

        const { error: wsError } = await supabaseClient
            .from("workspaces")
            .insert({ id: wsId, name });

        if (wsError) throw wsError;

        // 自動新增為 owner
        const { error: memberError } = await supabaseClient
            .from("workspace_members")
            .insert({
                workspace_id: wsId,
                user_id: userId,
                role: "owner",
            });

        if (memberError) throw memberError;

        return {
            id: wsId,
            name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            role: "owner",
        };
    },

    async update(workspaceId: string, name: string): Promise<void> {
        const { data, error } = await supabaseClient
            .from("workspaces")
            .update({ name, updated_at: new Date().toISOString() })
            .eq("id", workspaceId)
            .select();

        if (error) throw error;
        if (!data || data.length === 0) {
            throw new Error("更新失敗：可能無權限或找不到該計畫");
        }
    },

    async delete(workspaceId: string): Promise<void> {
        const { error } = await supabaseClient
            .from("workspaces")
            .delete()
            .eq("id", workspaceId);

        if (error) throw error;
    },

    // ── Members ─────────────────────────────────────────────

    async listMembers(workspaceId: string): Promise<WorkspaceMemberRow[]> {
        const { data, error } = await supabaseClient
            .from("workspace_members")
            .select("*")
            .eq("workspace_id", workspaceId);

        if (error) throw error;
        return (data || []) as WorkspaceMemberRow[];
    },

    async removeMember(
        workspaceId: string,
        memberUserId: string,
    ): Promise<void> {
        const { error } = await supabaseClient
            .from("workspace_members")
            .delete()
            .eq("workspace_id", workspaceId)
            .eq("user_id", memberUserId);

        if (error) throw error;
    },

    async leave(workspaceId: string, userId: string): Promise<void> {
        const { error } = await supabaseClient
            .from("workspace_members")
            .delete()
            .eq("workspace_id", workspaceId)
            .eq("user_id", userId);

        if (error) throw error;
    },

    // ── Invites ─────────────────────────────────────────────

    async createInvite(
        workspaceId: string,
        inviterId: string,
        inviteeEmail: string,
    ): Promise<WorkspaceInviteRow> {
        const payload = toInviteInsert(workspaceId, inviterId, inviteeEmail);
        const { data, error } = await supabaseClient
            .from("workspace_invites")
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async listPendingInvites(userEmail: string): Promise<WorkspaceInviteRow[]> {
        if (!userEmail) return [];
        const { data, error } = await supabaseClient
            .from("workspace_invites")
            .select("*, workspaces(name)")
            .eq("invitee_email", userEmail)
            .eq("status", "pending");

        if (error) throw error;
        return data || [];
    },

    async processInvite(
        inviteId: string,
        status: "accepted" | "rejected",
    ): Promise<{ id: string; status: string }> {
        // 透過 Supabase RPC (Stored Procedure) 處理邀請，確保原子性與跳過 RLS 刪除問題
        const { error } = await supabaseClient.rpc("process_workspace_invite", {
            p_invite_id: inviteId,
            p_status: status,
        });

        if (error) throw error;
        return { id: inviteId, status };
    },
};
