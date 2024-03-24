export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      campaign_analytics: {
        Row: {
          campaign_id: string | null;
          id: string;
          total_offboarded: number | null;
          total_referrals: number | null;
          total_sign_ups: number | null;
          utm_campaigns: Json | null;
          utm_mediums: Json | null;
          utm_sources: Json | null;
          utm_terms: Json | null;
          visits: number | null;
        };
        Insert: {
          campaign_id?: string | null;
          id?: string;
          total_offboarded?: number | null;
          total_referrals?: number | null;
          total_sign_ups?: number | null;
          utm_campaigns?: Json | null;
          utm_mediums?: Json | null;
          utm_sources?: Json | null;
          utm_terms?: Json | null;
          visits?: number | null;
        };
        Update: {
          campaign_id?: string | null;
          id?: string;
          total_offboarded?: number | null;
          total_referrals?: number | null;
          total_sign_ups?: number | null;
          utm_campaigns?: Json | null;
          utm_mediums?: Json | null;
          utm_sources?: Json | null;
          utm_terms?: Json | null;
          visits?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_campaign_id_campaigns_project_id_fk";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["project_id"];
          },
        ];
      };
      campaign_followers: {
        Row: {
          campaign_id: string;
          created_at: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          is_offboarded: boolean | null;
          last_name: string | null;
          phone: string | null;
          rank: number;
          referral_amount: number | null;
          referred_by: string | null;
          utm_campaign: string | null;
          utm_medium: string | null;
          utm_source: string | null;
          utm_term: string | null;
        };
        Insert: {
          campaign_id: string;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id: string;
          is_offboarded?: boolean | null;
          last_name?: string | null;
          phone?: string | null;
          rank: number;
          referral_amount?: number | null;
          referred_by?: string | null;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
        };
        Update: {
          campaign_id?: string;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          is_offboarded?: boolean | null;
          last_name?: string | null;
          phone?: string | null;
          rank?: number;
          referral_amount?: number | null;
          referred_by?: string | null;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_followers_campaign_id_campaigns_project_id_fk";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["project_id"];
          },
        ];
      };
      campaigns: {
        Row: {
          answers: Json | null;
          content: string | null;
          created_at: string | null;
          custom_url: string | null;
          description: string | null;
          ends_at: string | null;
          name: string;
          project_id: string;
          settings: Json | null;
          slug: string | null;
          starts_at: string | null;
          workspace_id: string | null;
        };
        Insert: {
          answers?: Json | null;
          content?: string | null;
          created_at?: string | null;
          custom_url?: string | null;
          description?: string | null;
          ends_at?: string | null;
          name: string;
          project_id?: string;
          settings?: Json | null;
          slug?: string | null;
          starts_at?: string | null;
          workspace_id?: string | null;
        };
        Update: {
          answers?: Json | null;
          content?: string | null;
          created_at?: string | null;
          custom_url?: string | null;
          description?: string | null;
          ends_at?: string | null;
          name?: string;
          project_id?: string;
          settings?: Json | null;
          slug?: string | null;
          starts_at?: string | null;
          workspace_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "campaigns_workspace_id_workspaces_id_fk";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [];
      };
      invitation: {
        Row: {
          campaign_id: string;
          created_at: string | null;
          status: Database["public"]["Enums"]["invitation_status"] | null;
          user_id: string;
        };
        Insert: {
          campaign_id: string;
          created_at?: string | null;
          status?: Database["public"]["Enums"]["invitation_status"] | null;
          user_id: string;
        };
        Update: {
          campaign_id?: string;
          created_at?: string | null;
          status?: Database["public"]["Enums"]["invitation_status"] | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invitation_campaign_id_workspaces_id_fk";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invitation_user_id_users_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      notification: {
        Row: {
          created_at: string | null;
          description: string;
          id: string;
          is_read: boolean | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          id?: string;
          is_read?: boolean | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          id?: string;
          is_read?: boolean | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notification_user_id_users_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "prices_product_id_products_id_fk";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_prices_id_fk";
            columns: ["price_id"];
            isOneToOne: false;
            referencedRelation: "prices";
            referencedColumns: ["id"];
          },
        ];
      };
      user_to_workspaces: {
        Row: {
          campaign_id: string;
          role: Database["public"]["Enums"]["workspace_role"];
          user_id: string;
        };
        Insert: {
          campaign_id: string;
          role: Database["public"]["Enums"]["workspace_role"];
          user_id: string;
        };
        Update: {
          campaign_id?: string;
          role?: Database["public"]["Enums"]["workspace_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_to_workspaces_campaign_id_campaigns_project_id_fk";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "user_to_workspaces_user_id_users_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      workspaces: {
        Row: {
          description: string | null;
          id: string;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          name?: string;
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
      invitation_status: "ACCEPTED" | "PENDING" | "REVOKED";
      pricing_plan_interval: "day" | "week" | "month" | "year";
      pricing_type: "one_time" | "recurring";
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid";
      workspace_role: "ADMIN" | "USER" | "VIEWER";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
