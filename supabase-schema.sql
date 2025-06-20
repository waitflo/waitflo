-- WaitFlo Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    preview_url TEXT,
    creator_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    usage_count INTEGER NOT NULL DEFAULT 0,
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    jsx_code TEXT,
    type TEXT, -- 'waitlist' or 'onboarding'
    logo_url TEXT,
    primary_color TEXT,
    questions JSONB,
    vercel_url TEXT,
    is_listed BOOLEAN DEFAULT false
);

-- Flows table (AI-generated flows)
CREATE TABLE IF NOT EXISTS flows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    content_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE NOT NULL,
    buyer_email TEXT NOT NULL,
    customization_data JSONB NOT NULL,
    delivered_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliates table
CREATE TABLE IF NOT EXISTS affiliates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    clicks INTEGER NOT NULL DEFAULT 0,
    conversions INTEGER NOT NULL DEFAULT 0,
    payout_due DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_templates_creator_id ON templates(creator_id);
CREATE INDEX IF NOT EXISTS idx_templates_is_public ON templates(is_public);
CREATE INDEX IF NOT EXISTS idx_flows_user_id ON flows(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_template_id ON orders(template_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_email ON orders(buyer_email);
CREATE INDEX IF NOT EXISTS idx_affiliates_user_id ON affiliates(user_id);

-- Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Templates policies
CREATE POLICY "Anyone can view public templates" ON templates
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own templates" ON templates
    FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Users can create templates" ON templates
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own templates" ON templates
    FOR UPDATE USING (auth.uid() = creator_id);

-- Flows policies
CREATE POLICY "Users can view their own flows" ON flows
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create flows" ON flows
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own flows" ON flows
    FOR UPDATE USING (auth.uid() = user_id);

-- Orders policies (admin can view all, users can view their own)
CREATE POLICY "Anyone can create orders" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view orders they created" ON orders
    FOR SELECT USING (auth.uid() IN (
        SELECT creator_id FROM templates WHERE id = template_id
    ));

-- Affiliates policies
CREATE POLICY "Users can view their own affiliate stats" ON affiliates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own affiliate stats" ON affiliates
    FOR UPDATE USING (auth.uid() = user_id);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, plan)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NULL),
        'free'
    );
    
    -- Create affiliate record
    INSERT INTO public.affiliates (user_id, clicks, conversions, payout_due)
    VALUES (NEW.id, 0, 0, 0);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sample data (optional - remove if not needed)
-- INSERT INTO users (id, email, name, plan) VALUES 
--     ('550e8400-e29b-41d4-a716-446655440000', 'admin@waitflo.com', 'Admin User', 'pro'),
--     ('550e8400-e29b-41d4-a716-446655440001', 'creator@waitflo.com', 'Template Creator', 'pro');

-- INSERT INTO templates (title, preview_url, creator_id, price, is_public) VALUES
--     ('E-commerce Flow', 'https://example.com/preview1.jpg', '550e8400-e29b-41d4-a716-446655440001', 29.99, true),
--     ('SaaS Onboarding', 'https://example.com/preview2.jpg', '550e8400-e29b-41d4-a716-446655440001', 19.99, true);

-- Migration: Add fields for AI-powered template publishing
ALTER TABLE templates
  ADD COLUMN IF NOT EXISTS jsx_code TEXT,
  ADD COLUMN IF NOT EXISTS type TEXT, -- 'waitlist' or 'onboarding'
  ADD COLUMN IF NOT EXISTS logo_url TEXT,
  ADD COLUMN IF NOT EXISTS primary_color TEXT,
  ADD COLUMN IF NOT EXISTS questions JSONB,
  ADD COLUMN IF NOT EXISTS vercel_url TEXT,
  ADD COLUMN IF NOT EXISTS is_listed BOOLEAN DEFAULT false; 