export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      allergen_groups: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      babies: {
        Row: {
          birth_date: string | null
          created_at: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      ingredients: {
        Row: {
          allergen_group_id: string | null
          cas_number: string | null
          common_names: string[] | null
          created_at: string
          id: string
          is_allergen: boolean
          name: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          allergen_group_id?: string | null
          cas_number?: string | null
          common_names?: string[] | null
          created_at?: string
          id?: string
          is_allergen?: boolean
          name: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          allergen_group_id?: string | null
          cas_number?: string | null
          common_names?: string[] | null
          created_at?: string
          id?: string
          is_allergen?: boolean
          name?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_allergen_group_id_fkey"
            columns: ["allergen_group_id"]
            isOneToOne: false
            referencedRelation: "allergen_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_ingredients: {
        Row: {
          id: string
          ingredient_id: string
          is_excipient: boolean
          medication_id: string
          notes: string | null
          quantity: string | null
        }
        Insert: {
          id?: string
          ingredient_id: string
          is_excipient?: boolean
          medication_id: string
          notes?: string | null
          quantity?: string | null
        }
        Update: {
          id?: string
          ingredient_id?: string
          is_excipient?: boolean
          medication_id?: string
          notes?: string | null
          quantity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medication_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_ingredients_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          access_count: number
          arquivo_url: string | null
          avisos: string | null
          composicao: string | null
          created_at: string
          data_extracao: string | null
          detalhes_atencao: string | null
          detalhes_criticos: string | null
          id: string
          nivel_alerta: string | null
          nome_alternativo: string | null
          nome_completo: string | null
          nome_principal: string
          tem_risco_aplv: boolean | null
          termos_encontrados: string | null
          updated_at: string
        }
        Insert: {
          access_count?: number
          arquivo_url?: string | null
          avisos?: string | null
          composicao?: string | null
          created_at?: string
          data_extracao?: string | null
          detalhes_atencao?: string | null
          detalhes_criticos?: string | null
          id?: string
          nivel_alerta?: string | null
          nome_alternativo?: string | null
          nome_completo?: string | null
          nome_principal: string
          tem_risco_aplv?: boolean | null
          termos_encontrados?: string | null
          updated_at?: string
        }
        Update: {
          access_count?: number
          arquivo_url?: string | null
          avisos?: string | null
          composicao?: string | null
          created_at?: string
          data_extracao?: string | null
          detalhes_atencao?: string | null
          detalhes_criticos?: string | null
          id?: string
          nivel_alerta?: string | null
          nome_alternativo?: string | null
          nome_completo?: string | null
          nome_principal?: string
          tem_risco_aplv?: boolean | null
          termos_encontrados?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          allergy_info: string | null
          avatar_url: string | null
          child_name: string | null
          created_at: string
          full_name: string | null
          id: string
          observation: string | null
          phone: string | null
          profile_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          allergy_info?: string | null
          avatar_url?: string | null
          child_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          observation?: string | null
          phone?: string | null
          profile_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          allergy_info?: string | null
          avatar_url?: string | null
          child_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          observation?: string | null
          phone?: string | null
          profile_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      suggestions: {
        Row: {
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_onboarding: {
        Row: {
          completed_at: string
          id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_medication_access: {
        Args: { med_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
