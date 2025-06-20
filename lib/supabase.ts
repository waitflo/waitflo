import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Types for our database tables
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          plan: 'free' | 'pro'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          plan?: 'free' | 'pro'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          plan?: 'free' | 'pro'
          created_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          title: string
          preview_url: string | null
          creator_id: string
          price: number
          usage_count: number
          is_public: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          preview_url?: string | null
          creator_id: string
          price: number
          usage_count?: number
          is_public?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          preview_url?: string | null
          creator_id?: string
          price?: number
          usage_count?: number
          is_public?: boolean
          created_at?: string
        }
      }
      flows: {
        Row: {
          id: string
          user_id: string
          content_json: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content_json: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content_json?: any
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          template_id: string
          buyer_email: string
          customization_data: any
          delivered_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          template_id: string
          buyer_email: string
          customization_data: any
          delivered_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          buyer_email?: string
          customization_data?: any
          delivered_url?: string | null
          created_at?: string
        }
      }
      affiliates: {
        Row: {
          id: string
          user_id: string
          clicks: number
          conversions: number
          payout_due: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          clicks?: number
          conversions?: number
          payout_due?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          clicks?: number
          conversions?: number
          payout_due?: number
          created_at?: string
        }
      }
    }
  }
} 