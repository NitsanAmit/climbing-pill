export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      climber_profiles: {
        Row: {
          climbing_style: string
          height: number
          main_gym_name: string
          started_climbing_year: string
          user_id: string
          weight: number
        }
        Insert: {
          climbing_style: string
          height: number
          main_gym_name: string
          started_climbing_year: string
          user_id: string
          weight: number
        }
        Update: {
          climbing_style?: string
          height?: number
          main_gym_name?: string
          started_climbing_year?: string
          user_id?: string
          weight?: number
        }
        Relationships: []
      }
      gyms: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      LegacyUsers: {
        Row: {
          active_payment: boolean | null
          address: string | null
          birth_date: string | null
          climbing_seniority: number | null
          climbing_style: string | null
          coach: string | null
          email: string | null
          filled_profile_details: boolean | null
          first_name: string | null
          five_months_goal: string | null
          height: number | null
          image: string | null
          is_active: boolean | null
          last_name: string | null
          main_gym_name: string | null
          one_year_goal: string | null
          phone_number: string | null
          referral_code: string | null
          referral_type: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          active_payment?: boolean | null
          address?: string | null
          birth_date?: string | null
          climbing_seniority?: number | null
          climbing_style?: string | null
          coach?: string | null
          email?: string | null
          filled_profile_details?: boolean | null
          first_name?: string | null
          five_months_goal?: string | null
          height?: number | null
          image?: string | null
          is_active?: boolean | null
          last_name?: string | null
          main_gym_name?: string | null
          one_year_goal?: string | null
          phone_number?: string | null
          referral_code?: string | null
          referral_type?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          active_payment?: boolean | null
          address?: string | null
          birth_date?: string | null
          climbing_seniority?: number | null
          climbing_style?: string | null
          coach?: string | null
          email?: string | null
          filled_profile_details?: boolean | null
          first_name?: string | null
          five_months_goal?: string | null
          height?: number | null
          image?: string | null
          is_active?: boolean | null
          last_name?: string | null
          main_gym_name?: string | null
          one_year_goal?: string | null
          phone_number?: string | null
          referral_code?: string | null
          referral_type?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          image: string | null
          is_active: boolean
          is_admin: boolean
          last_name: string
          phone_number: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          image?: string | null
          is_active?: boolean
          is_admin?: boolean
          last_name: string
          phone_number: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          image?: string | null
          is_active?: boolean
          is_admin?: boolean
          last_name?: string
          phone_number?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      does_email_exist: {
        Args: {
          search_email: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
      | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
  > = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
      | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
  > = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
      | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
  > = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
      | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
  > = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
