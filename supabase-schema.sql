-- Decision Compass Database Schema
-- This should be executed in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create decisions table
CREATE TABLE IF NOT EXISTS decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    ai_options JSONB,
    selected_option INTEGER,
    result TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_decisions_user_time ON decisions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_decisions_type ON decisions USING gin(ai_options);

-- Create RLS policies
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own decisions
CREATE POLICY "Users can view their own decisions" ON decisions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own decisions
CREATE POLICY "Users can insert their own decisions" ON decisions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own decisions
CREATE POLICY "Users can update their own decisions" ON decisions
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own decisions
CREATE POLICY "Users can delete their own decisions" ON decisions
    FOR DELETE USING (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_decisions_updated_at
    BEFORE UPDATE ON decisions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();