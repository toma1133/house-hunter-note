export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "13.0.5";
    };
    public: {
        Tables: {
            properties: {
                Row: {
                    mainBuildingPing: number;
                    subBuildingPing: number;
                    parkingCount: number;
                    address: string;
                    buildingType: string;
                    city: string;
                    community: string;
                    coverImage: string;
                    created_at: string | null;
                    district: string;
                    evCharging: boolean;
                    floorPlanImage: string;
                    houseAge: number;
                    id: string;
                    indoorPing: number;
                    landZoning: string;
                    layoutBalconies: number;
                    layoutBaths: number;
                    layoutHalls: number;
                    layoutRooms: number;
                    managementFee: number;
                    parking: string;
                    parkingPing: number;
                    publicRatio: number;
                    score: number;
                    totalPrice: number;
                    totalPing: number;
                    totalUnits: number;
                    unit: string;
                    user_id: string;
                    workspace_id: string | null;
                };
                Insert: {
                    mainBuildingPing?: number | null;
                    subBuildingPing?: number | null;
                    parkingCount?: number | null;
                    address?: string | null;
                    buildingType?: string | null;
                    city?: string | null;
                    community?: string | null;
                    coverImage?: string | null;
                    created_at?: string | null;
                    district?: string | null;
                    evCharging?: boolean | null;
                    floorPlanImage?: string | null;
                    houseAge?: number | null;
                    id?: string;
                    indoorPing?: number | null;
                    landZoning?: string | null;
                    layoutBalconies?: number | null;
                    layoutBaths?: number | null;
                    layoutHalls?: number | null;
                    layoutRooms?: number | null;
                    managementFee?: number | null;
                    parking?: string | null;
                    parkingPing?: number | null;
                    publicRatio?: number | null;
                    score?: number | null;
                    totalPrice?: number | null;
                    totalPing?: number | null;
                    totalUnits?: number | null;
                    unit?: string | null;
                    user_id?: string;
                    workspace_id?: string | null;
                };
                Update: {
                    mainBuildingPing?: number | null;
                    subBuildingPing?: number | null;
                    parkingCount?: number | null;
                    address?: string | null;
                    buildingType?: string | null;
                    city?: string | null;
                    community?: string | null;
                    coverImage?: string | null;
                    created_at?: string | null;
                    district?: string | null;
                    evCharging?: boolean | null;
                    floorPlanImage?: string | null;
                    houseAge?: number | null;
                    id?: string;
                    indoorPing?: number | null;
                    landZoning?: string | null;
                    layoutBalconies?: number | null;
                    layoutBaths?: number | null;
                    layoutHalls?: number | null;
                    layoutRooms?: number | null;
                    managementFee?: number | null;
                    parking?: string | null;
                    parkingPing?: number | null;
                    publicRatio?: number | null;
                    score?: number | null;
                    totalPrice?: number | null;
                    totalPing?: number | null;
                    totalUnits?: number | null;
                    unit?: string | null;
                    user_id?: string;
                    workspace_id?: string | null;
                };
                Relationships: [];
            };
            conditions: {
                Row: {
                    id: string;
                    workspace_id: string | null;
                    text: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    workspace_id?: string | null;
                    text: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    workspace_id?: string | null;
                    text?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
            preset_conditions: {
                Row: {
                    id: string;
                    preset_id: string;
                    condition_id: string;
                    type: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    preset_id: string;
                    condition_id: string;
                    type: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    preset_id?: string;
                    condition_id?: string;
                    type?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
            property_conditions: {
                Row: {
                    id: string;
                    property_id: string;
                    condition_id: string;
                    type: string;
                    is_checked: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    property_id: string;
                    condition_id: string;
                    type: string;
                    is_checked?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    property_id?: string;
                    condition_id?: string;
                    type?: string;
                    is_checked?: boolean;
                    created_at?: string;
                };
                Relationships: [];
            };
            property_room_images: {
                Row: {
                    id: string;
                    property_id: string;
                    name: string | null;
                    url: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    property_id: string;
                    name?: string | null;
                    url: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    property_id?: string;
                    name?: string | null;
                    url?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
            property_transactions: {
                Row: {
                    id: string;
                    property_id: string;
                    date: string | null;
                    floor: string | null;
                    total_price: number | null;
                    unit_price: number | null;
                    house_ping: number | null;
                    parking_ping: number | null;
                    parking_price: number | null;
                    unit_price_no_parking: number | null;
                    layout: string | null;
                    parking_type: string | null;
                    notes: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    property_id: string;
                    date?: string | null;
                    floor?: string | null;
                    total_price?: number | null;
                    unit_price?: number | null;
                    house_ping?: number | null;
                    parking_ping?: number | null;
                    parking_price?: number | null;
                    unit_price_no_parking?: number | null;
                    layout?: string | null;
                    parking_type?: string | null;
                    notes?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    property_id?: string;
                    date?: string | null;
                    floor?: string | null;
                    total_price?: number | null;
                    unit_price?: number | null;
                    house_ping?: number | null;
                    parking_ping?: number | null;
                    parking_price?: number | null;
                    unit_price_no_parking?: number | null;
                    layout?: string | null;
                    parking_type?: string | null;
                    notes?: string | null;
                    created_at?: string;
                };
                Relationships: [];
            };
            condition_presets: {
                Row: {
                    id: string;
                    workspace_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    workspace_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    workspace_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            workspaces: {
                Row: {
                    id: string;
                    name: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            workspace_members: {
                Row: {
                    workspace_id: string;
                    user_id: string;
                    role: string;
                    created_at: string;
                };
                Insert: {
                    workspace_id: string;
                    user_id: string;
                    role?: string;
                    created_at?: string;
                };
                Update: {
                    workspace_id?: string;
                    user_id?: string;
                    role?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
            workspace_invites: {
                Row: {
                    id: string;
                    workspace_id: string;
                    inviter_id: string;
                    invitee_email: string;
                    status: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    workspace_id: string;
                    inviter_id: string;
                    invitee_email: string;
                    status?: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    workspace_id?: string;
                    inviter_id?: string;
                    invitee_email?: string;
                    status?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            process_workspace_invite: {
                Args: {
                    p_invite_id: string;
                    p_status: string;
                };
                Returns: void;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
    keyof Database,
    "public"
>];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
            DefaultSchema["Views"])
      ? (DefaultSchema["Tables"] &
            DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
        | keyof DefaultSchema["Enums"]
        | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema["CompositeTypes"]
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;

export const Constants = {
    public: {
        Enums: {},
    },
} as const;
