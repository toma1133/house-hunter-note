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
                    address: string;
                    buildingType: string;
                    city: string;
                    community: string;
                    conditions: Json;
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
                    roomImages: Json;
                    score: number;
                    totalPrice: number;
                    totalPing: number;
                    transactions: Json;
                    unit: string;
                    user_id: string;
                };
                Insert: {
                    address?: string | null;
                    buildingType?: string | null;
                    city?: string | null;
                    community?: string | null;
                    conditions?: Json | null;
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
                    roomImages?: Json | null;
                    score?: number | null;
                    totalPrice?: number | null;
                    totalPing?: number | null;
                    transactions?: Json | null;
                    unit?: string | null;
                    user_id?: string;
                };
                Update: {
                    address?: string | null;
                    buildingType?: string | null;
                    city?: string | null;
                    community?: string | null;
                    conditions?: Json | null;
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
                    roomImages?: Json | null;
                    score?: number | null;
                    totalPrice?: number | null;
                    totalPing?: number | null;
                    transactions?: Json | null;
                    unit?: string | null;
                    user_id?: string;
                };
                Relationships: [];
            };
            condition_templates: {
                Row: {
                    id: string;
                    user_id: string;
                    must_haves: Json;
                    nice_to_haves: Json;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    must_haves?: Json;
                    nice_to_haves?: Json;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    must_haves?: Json;
                    nice_to_haves?: Json;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
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
