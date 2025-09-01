-- Create subdomains table
CREATE TABLE subdomains (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subdomain TEXT UNIQUE NOT NULL,
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for faster lookups
CREATE INDEX idx_subdomains_subdomain ON subdomains(subdomain);
CREATE INDEX idx_subdomains_user_id ON subdomains(user_id);
CREATE INDEX idx_subdomains_status ON subdomains(status);

-- Add RLS policies
ALTER TABLE subdomains ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own subdomains
CREATE POLICY "Users can view own subdomains" ON subdomains
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own subdomains
CREATE POLICY "Users can insert own subdomains" ON subdomains
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own subdomains
CREATE POLICY "Users can update own subdomains" ON subdomains
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own subdomains
CREATE POLICY "Users can delete own subdomains" ON subdomains
  FOR DELETE USING (auth.uid() = user_id);
