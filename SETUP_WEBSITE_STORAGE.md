# Website Storage Setup Guide

## 🚀 **New Feature: Website Storage & Auto-Save**

Your Aqall AI application now includes a complete website storage system that automatically saves user designs to the database!

## ✨ **What's New:**

### **1. Auto-Save Functionality**
- **Save Button**: Green save button in the Editor header
- **Auto-Save**: Automatically saves changes after 5 seconds of inactivity
- **Last Saved Indicator**: Shows when the website was last saved
- **Changes Counter**: Tracks unsaved changes

### **2. Smart User Experience**
- **First Time Users**: Go to Landing page to generate a new website
- **Returning Users**: Automatically redirected to Editor with their saved website
- **Seamless Flow**: No more losing work between sessions!

### **3. Database Storage**
- **User Websites**: Each user gets one website stored in the database
- **Complete Data**: Saves all sections, styling, and content
- **Secure**: Row Level Security ensures users only see their own websites

## 🗄️ **Database Setup Required:**

### **Option 1: Supabase Dashboard (Recommended)**
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run this SQL command:

```sql
-- Create websites table to store user website designs
CREATE TABLE IF NOT EXISTS websites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My Website',
  description TEXT,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  company_name TEXT,
  slogan TEXT,
  prompt TEXT,
  is_published BOOLEAN DEFAULT false,
  published_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_websites_user_id ON websites(user_id);

-- Enable Row Level Security
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own websites" ON websites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own websites" ON websites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own websites" ON websites
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own websites" ON websites
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_websites_updated_at 
  BEFORE UPDATE ON websites 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### **Option 2: Local Development (if Docker is running)**
```bash
cd supabase
npx supabase db reset
```

## 🔄 **How It Works:**

### **User Flow:**
1. **New User**: Signs up → Generates website → Gets redirected to Editor
2. **Returning User**: Signs in → Automatically redirected to Editor with saved website
3. **Editing**: User makes changes → Auto-saves after 5 seconds OR manual save
4. **Persistence**: All changes are stored in the database

### **Technical Implementation:**
- **WebsiteService**: Handles all database operations
- **Auto-save**: Debounced save after 5 seconds of inactivity
- **Smart Redirects**: Landing page checks for existing website
- **State Management**: Tracks changes and save status

## 🎯 **Key Benefits:**

✅ **Never Lose Work**: All changes are automatically saved  
✅ **Seamless Experience**: Users go straight to their website  
✅ **Smart Routing**: Landing page only for new websites  
✅ **Real-time Feedback**: Save status and change tracking  
✅ **Secure Storage**: Each user only sees their own websites  

## 🚨 **Important Notes:**

- **One Website Per User**: Each user can only have one website (can be extended later)
- **Auto-save Delay**: 5 seconds of inactivity before auto-saving
- **Manual Save**: Green save button for immediate saving
- **Change Tracking**: Shows number of unsaved changes

## 🔧 **Troubleshooting:**

### **If Save Button Doesn't Work:**
1. Check if user is logged in
2. Verify database table exists
3. Check browser console for errors

### **If Auto-redirect Doesn't Work:**
1. Ensure user has a saved website in database
2. Check authentication state
3. Verify database policies are set correctly

## 🎉 **Ready to Use!**

Once you run the SQL command in your Supabase dashboard, the website storage system will be fully functional!

Users will now have a seamless experience where their work is automatically saved and they can pick up right where they left off. 