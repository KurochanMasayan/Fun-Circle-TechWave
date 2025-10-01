import { createClient } from '@supabase/supabase-js';
import type { Env } from '../types';

// Cloudflare Workers用のSupabaseクライアント作成関数
export function createSupabaseClient(env: Env) {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

// 型定義のエクスポート（必要に応じて）
export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: number;
          name: string;
          slug: string;
          description: string | null;
          completed: boolean;
          due_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          slug: string;
          description?: string | null;
          completed?: boolean;
          due_date: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          slug?: string;
          description?: string | null;
          completed?: boolean;
          due_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      donations: {
        Row: {
          id: string;
          title: string;
          category_id: string;
          sub_category_id: string | null;
          donor_name: string | null;
          donated_date: string;
          location_id: string;
          status: string;
          description: string | null;
          isbn: string | null;
          author: string | null;
          publisher: string | null;
          published_year: number | null;
          manufacturer: string | null;
          model_number: string | null;
          condition: string | null;
          created_by: string;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          category_id: string;
          sub_category_id?: string | null;
          donor_name?: string | null;
          donated_date: string;
          location_id: string;
          status?: string;
          description?: string | null;
          isbn?: string | null;
          author?: string | null;
          publisher?: string | null;
          published_year?: number | null;
          manufacturer?: string | null;
          model_number?: string | null;
          condition?: string | null;
          created_by: string;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          category_id?: string;
          sub_category_id?: string | null;
          donor_name?: string | null;
          donated_date?: string;
          location_id?: string;
          status?: string;
          description?: string | null;
          isbn?: string | null;
          author?: string | null;
          publisher?: string | null;
          published_year?: number | null;
          manufacturer?: string | null;
          model_number?: string | null;
          condition?: string | null;
          created_by?: string;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          name: string;
          building: string | null;
          floor: string | null;
          room: string | null;
          shelf: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          building?: string | null;
          floor?: string | null;
          room?: string | null;
          shelf?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          building?: string | null;
          floor?: string | null;
          room?: string | null;
          shelf?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}; 