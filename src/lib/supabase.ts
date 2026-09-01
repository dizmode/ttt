import { createClient } from '@supabase/supabase-js';

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          id: number;
          order_id: string;
          stripe_session_id: string;
          email: string;
          status: 'paid' | 'processing' | 'failed' | 'refunded';
          currency: string;
          total_amount: number;
          shipping: Json;
          items: Json;
          created_at: string;
          updated_at: string;
        };
        Relationships: [];
        Insert: {
          order_id: string;
          stripe_session_id: string;
          email: string;
          status: 'paid' | 'processing' | 'failed' | 'refunded';
          currency?: string;
          total_amount: number;
          shipping: Json;
          items: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let supabaseAdminClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdminClient() {
  if (supabaseAdminClient) {
    return supabaseAdminClient;
  }

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable.');
  }

  supabaseAdminClient = createClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return supabaseAdminClient;
}
