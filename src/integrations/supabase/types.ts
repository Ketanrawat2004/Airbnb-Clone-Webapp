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
      booking_coupons: {
        Row: {
          booking_id: string
          coupon_id: string
          created_at: string
          discount_amount: number
          id: string
        }
        Insert: {
          booking_id: string
          coupon_id: string
          created_at?: string
          discount_amount: number
          id?: string
        }
        Update: {
          booking_id?: string
          coupon_id?: string
          created_at?: string
          discount_amount?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_coupons_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_coupons_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          base_amount: number | null
          check_in_date: string
          check_out_date: string
          coupon_code: string | null
          created_at: string
          discount_amount: number | null
          guest_age: number | null
          guest_gender: string | null
          guest_list: Json | null
          guest_name: string | null
          guest_nationality: string | null
          guest_phone: string | null
          guests: number
          hotel_id: string
          id: string
          payment_intent_id: string | null
          payment_status: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          room_type: string | null
          status: string | null
          stripe_session_id: string | null
          total_amount: number
          user_id: string
        }
        Insert: {
          base_amount?: number | null
          check_in_date: string
          check_out_date: string
          coupon_code?: string | null
          created_at?: string
          discount_amount?: number | null
          guest_age?: number | null
          guest_gender?: string | null
          guest_list?: Json | null
          guest_name?: string | null
          guest_nationality?: string | null
          guest_phone?: string | null
          guests: number
          hotel_id: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          room_type?: string | null
          status?: string | null
          stripe_session_id?: string | null
          total_amount: number
          user_id: string
        }
        Update: {
          base_amount?: number | null
          check_in_date?: string
          check_out_date?: string
          coupon_code?: string | null
          created_at?: string
          discount_amount?: number | null
          guest_age?: number | null
          guest_gender?: string | null
          guest_list?: Json | null
          guest_name?: string | null
          guest_nationality?: string | null
          guest_phone?: string | null
          guests?: number
          hotel_id?: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          room_type?: string | null
          status?: string | null
          stripe_session_id?: string | null
          total_amount?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          max_discount_amount: number | null
          min_booking_amount: number | null
          updated_at: string
          usage_count: number | null
          usage_limit: number | null
          valid_from: string
          valid_until: string
        }
        Insert: {
          code: string
          created_at?: string
          discount_type: string
          discount_value: number
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          min_booking_amount?: number | null
          updated_at?: string
          usage_count?: number | null
          usage_limit?: number | null
          valid_from?: string
          valid_until: string
        }
        Update: {
          code?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          min_booking_amount?: number | null
          updated_at?: string
          usage_count?: number | null
          usage_limit?: number | null
          valid_from?: string
          valid_until?: string
        }
        Relationships: []
      }
      hotels: {
        Row: {
          address: string | null
          amenities: string[] | null
          available_rooms: number | null
          business_center: boolean | null
          check_in_time: string | null
          check_out_time: string | null
          concierge_service: boolean | null
          created_at: string
          description: string | null
          email: string | null
          facilities: string[] | null
          fitness_center: boolean | null
          id: string
          images: string[] | null
          languages_spoken: string[] | null
          laundry_service: boolean | null
          location: string
          name: string
          parking_available: boolean | null
          pets_allowed: boolean | null
          phone: string | null
          price_per_night: number
          property_type: string | null
          rating: number | null
          restaurant_on_site: boolean | null
          reviews_count: number | null
          room_service: boolean | null
          rules_and_regulations: string[] | null
          smoking_allowed: boolean | null
          spa_services: boolean | null
          star_rating: number | null
          total_floors: number | null
          total_rooms: number | null
          website: string | null
          year_built: number | null
          year_renovated: number | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          available_rooms?: number | null
          business_center?: boolean | null
          check_in_time?: string | null
          check_out_time?: string | null
          concierge_service?: boolean | null
          created_at?: string
          description?: string | null
          email?: string | null
          facilities?: string[] | null
          fitness_center?: boolean | null
          id?: string
          images?: string[] | null
          languages_spoken?: string[] | null
          laundry_service?: boolean | null
          location: string
          name: string
          parking_available?: boolean | null
          pets_allowed?: boolean | null
          phone?: string | null
          price_per_night?: number
          property_type?: string | null
          rating?: number | null
          restaurant_on_site?: boolean | null
          reviews_count?: number | null
          room_service?: boolean | null
          rules_and_regulations?: string[] | null
          smoking_allowed?: boolean | null
          spa_services?: boolean | null
          star_rating?: number | null
          total_floors?: number | null
          total_rooms?: number | null
          website?: string | null
          year_built?: number | null
          year_renovated?: number | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          available_rooms?: number | null
          business_center?: boolean | null
          check_in_time?: string | null
          check_out_time?: string | null
          concierge_service?: boolean | null
          created_at?: string
          description?: string | null
          email?: string | null
          facilities?: string[] | null
          fitness_center?: boolean | null
          id?: string
          images?: string[] | null
          languages_spoken?: string[] | null
          laundry_service?: boolean | null
          location?: string
          name?: string
          parking_available?: boolean | null
          pets_allowed?: boolean | null
          phone?: string | null
          price_per_night?: number
          property_type?: string | null
          rating?: number | null
          restaurant_on_site?: boolean | null
          reviews_count?: number | null
          room_service?: boolean | null
          rules_and_regulations?: string[] | null
          smoking_allowed?: boolean | null
          spa_services?: boolean | null
          star_rating?: number | null
          total_floors?: number | null
          total_rooms?: number | null
          website?: string | null
          year_built?: number | null
          year_renovated?: number | null
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          is_used: boolean
          name: string
          otp_code: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          is_used?: boolean
          name: string
          otp_code: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          is_used?: boolean
          name?: string
          otp_code?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      room_bookings: {
        Row: {
          booking_id: string
          created_at: string
          id: string
          room_id: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          id?: string
          room_id: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_bookings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          amenities: string[] | null
          created_at: string
          hotel_id: string
          id: string
          is_available: boolean | null
          max_occupancy: number
          price_per_night: number
          room_number: string
          room_type: string
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          created_at?: string
          hotel_id: string
          id?: string
          is_available?: boolean | null
          max_occupancy?: number
          price_per_night: number
          room_number: string
          room_type: string
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          created_at?: string
          hotel_id?: string
          id?: string
          is_available?: boolean | null
          max_occupancy?: number
          price_per_night?: number
          room_number?: string
          room_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          created_at: string
          guest_location: string | null
          guest_name: string
          hotel_id: string | null
          id: string
          is_featured: boolean | null
          is_verified: boolean | null
          rating: number
          review_text: string
          room_type: string | null
          stay_date: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          guest_location?: string | null
          guest_name: string
          hotel_id?: string | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          rating: number
          review_text: string
          room_type?: string | null
          stay_date?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          guest_location?: string | null
          guest_name?: string
          hotel_id?: string | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          rating?: number
          review_text?: string
          room_type?: string | null
          stay_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_reviews: {
        Row: {
          created_at: string
          guest_location: string | null
          guest_name: string
          hotel_id: string | null
          id: string
          is_featured: boolean | null
          is_verified: boolean | null
          rating: number
          review_text: string
          room_type: string | null
          stay_date: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          guest_location?: string | null
          guest_name: string
          hotel_id?: string | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          rating: number
          review_text: string
          room_type?: string | null
          stay_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          guest_location?: string | null
          guest_name?: string
          hotel_id?: string | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          rating?: number
          review_text?: string
          room_type?: string | null
          stay_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_reviews_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      visitor_counter: {
        Row: {
          id: number
          last_updated: string
          visit_count: number
        }
        Insert: {
          id?: number
          last_updated?: string
          visit_count?: number
        }
        Update: {
          id?: number
          last_updated?: string
          visit_count?: number
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          hotel_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hotel_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          hotel_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_otps: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_otp: {
        Args: { user_name: string }
        Returns: {
          otp_code: string
          expires_at: string
        }[]
      }
      get_available_rooms: {
        Args: {
          hotel_id_param: string
          check_in_date: string
          check_out_date: string
        }
        Returns: {
          id: string
          room_number: string
          room_type: string
          max_occupancy: number
          price_per_night: number
          amenities: string[]
        }[]
      }
      increment_visitor_count: {
        Args: Record<PropertyKey, never>
        Returns: {
          visit_count: number
        }[]
      }
      search_hotels: {
        Args: { search_location: string }
        Returns: {
          id: string
          name: string
          location: string
          description: string
          price_per_night: number
          amenities: string[]
          images: string[]
          rating: number
          reviews_count: number
          total_rooms: number
          available_rooms: number
          created_at: string
        }[]
      }
      validate_coupon: {
        Args: { coupon_code_param: string; booking_amount_param: number }
        Returns: {
          valid: boolean
          discount_amount: number
          coupon_id: string
          message: string
        }[]
      }
      validate_otp: {
        Args: { user_name: string; provided_otp: string }
        Returns: {
          valid: boolean
          message: string
        }[]
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
