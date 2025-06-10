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
      Addresses: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          district: string | null
          full_name: string
          id: number
          pincode: number | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          district?: string | null
          full_name: string
          id?: number
          pincode?: number | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          district?: string | null
          full_name?: string
          id?: number
          pincode?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["Uid"]
          },
        ]
      }
      Card_Details: {
        Row: {
          card_number: number | null
          cardholder_name: string
          id: number
          month: number | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          card_number?: number | null
          cardholder_name: string
          id?: number
          month?: number | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          card_number?: number | null
          cardholder_name?: string
          id?: number
          month?: number | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Card_Details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["Uid"]
          },
        ]
      }
      Cart_Items: {
        Row: {
          cart_id: number
          color: string | null
          product_id: number | null
          quantity: number
        }
        Insert: {
          cart_id?: number
          color?: string | null
          product_id?: number | null
          quantity: number
        }
        Update: {
          cart_id?: number
          color?: string | null
          product_id?: number | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "Cart_Items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      Categories: {
        Row: {
          category_id: number
          iconPath: string | null
          name: string | null
        }
        Insert: {
          category_id: number
          iconPath?: string | null
          name?: string | null
        }
        Update: {
          category_id?: number
          iconPath?: string | null
          name?: string | null
        }
        Relationships: []
      }
      OrderItems: {
        Row: {
          color_name: string | null
          id: number
          image_url: string | null
          order_id: string | null
          product_id: number | null
          product_name: string | null
          quantity: number | null
          unit_price: number | null
        }
        Insert: {
          color_name?: string | null
          id?: number
          image_url?: string | null
          order_id?: string | null
          product_id?: number | null
          product_name?: string | null
          quantity?: number | null
          unit_price?: number | null
        }
        Update: {
          color_name?: string | null
          id?: number
          image_url?: string | null
          order_id?: string | null
          product_id?: number | null
          product_name?: string | null
          quantity?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "OrderItem_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "Orders"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "OrderItem_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      Orders: {
        Row: {
          card_detail_id: number | null
          color: string | null
          image_url: string | null
          order_date: string | null
          order_id: string
          product_name: string | null
          shipping_address_id: number | null
          status: string | null
          total_amount: number | null
          total_quantity: number | null
          user_id: string
        }
        Insert: {
          card_detail_id?: number | null
          color?: string | null
          image_url?: string | null
          order_date?: string | null
          order_id?: string
          product_name?: string | null
          shipping_address_id?: number | null
          status?: string | null
          total_amount?: number | null
          total_quantity?: number | null
          user_id: string
        }
        Update: {
          card_detail_id?: number | null
          color?: string | null
          image_url?: string | null
          order_date?: string | null
          order_id?: string
          product_name?: string | null
          shipping_address_id?: number | null
          status?: string | null
          total_amount?: number | null
          total_quantity?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Orders_card_detail_id_fkey"
            columns: ["card_detail_id"]
            isOneToOne: false
            referencedRelation: "Card_Details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Orders_shipping_address_id_fkey"
            columns: ["shipping_address_id"]
            isOneToOne: false
            referencedRelation: "Addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["Uid"]
          },
        ]
      }
      Products: {
        Row: {
          categoryId: number | null
          colorsList: string | null
          created_at: string | null
          description: string | null
          featured: string | null
          imagesList: string | null
          name: string | null
          price: number | null
          product_id: number
        }
        Insert: {
          categoryId?: number | null
          colorsList?: string | null
          created_at?: string | null
          description?: string | null
          featured?: string | null
          imagesList?: string | null
          name?: string | null
          price?: number | null
          product_id: number
        }
        Update: {
          categoryId?: number | null
          colorsList?: string | null
          created_at?: string | null
          description?: string | null
          featured?: string | null
          imagesList?: string | null
          name?: string | null
          price?: number | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Products_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "Categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      Users: {
        Row: {
          cartList: string | null
          default_card_detail_id: number | null
          default_shipping_id: number | null
          delivery_status_notification: boolean | null
          Email: string | null
          favoritesList: string | null
          Name: string
          new_arrivals_notification: boolean | null
          profile_picture_url: string | null
          sales_notification: boolean | null
          Uid: string
          role: string | null
        }
        Insert: {
          cartList?: string | null
          default_card_detail_id?: number | null
          default_shipping_id?: number | null
          delivery_status_notification?: boolean | null
          Email?: string | null
          favoritesList?: string | null
          Name: string
          new_arrivals_notification?: boolean | null
          profile_picture_url?: string | null
          sales_notification?: boolean | null
          Uid: string
          role: string | null
        }
        Update: {
          cartList?: string | null
          default_card_detail_id?: number | null
          default_shipping_id?: number | null
          delivery_status_notification?: boolean | null
          Email?: string | null
          favoritesList?: string | null
          Name?: string
          new_arrivals_notification?: boolean | null
          profile_picture_url?: string | null
          sales_notification?: boolean | null
          Uid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
