import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          auth_id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          country: string | null;
          preferred_currency: string;
          preferred_language: string;
          phone_number: string | null;
          is_buyer: boolean;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      buyers: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          avatar_url: string | null;
          bio: string | null;
          base_location: string | null;
          active_countries: string[];
          categories: string[];
          languages: string[];
          rating: number;
          total_reviews: number;
          commission_rate: number;
          pricing_by_currency: Record<string, number> | null;
          response_time_hours: number;
          payment_methods: Record<string, string[]> | null;
          verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['buyers']['Row'], 'created_at' | 'updated_at' | 'id'>;
        Update: Partial<Database['public']['Tables']['buyers']['Insert']>;
      };
      shopping_requests: {
        Row: {
          id: string;
          requester_id: string;
          buyer_id: string | null;
          product_name: string;
          product_description: string | null;
          estimated_budget: number | null;
          budget_currency: string | null;
          deadline: string | null;
          special_requirements: string | null;
          status: 'pending' | 'accepted' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['shopping_requests']['Row'], 'created_at' | 'updated_at' | 'id'>;
        Update: Partial<Database['public']['Tables']['shopping_requests']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          title: string;
          summary_zh: string | null;
          summary_zh_CN: string | null;
          summary_en: string | null;
          original_language: string;
          source_url: string | null;
          image_url: string | null;
          category: string | null;
          published_at: string | null;
          estimated_price_jpy: number | null;
          estimated_prices: Record<string, number> | null;
          brand: string | null;
          ai_generated: boolean;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'created_at' | 'updated_at' | 'id'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      conversations: {
        Row: {
          id: string;
          requester_id: string;
          buyer_id: string;
          request_id: string | null;
          last_message_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['conversations']['Row'], 'created_at' | 'updated_at' | 'id'>;
        Update: Partial<Database['public']['Tables']['conversations']['Insert']>;
      };
      chat_messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          message_text: string;
          language: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['chat_messages']['Row'], 'created_at' | 'id'>;
        Update: Partial<Database['public']['Tables']['chat_messages']['Insert']>;
      };
    };
  };
};
