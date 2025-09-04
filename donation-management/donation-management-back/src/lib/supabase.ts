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
    };
  };
}; 