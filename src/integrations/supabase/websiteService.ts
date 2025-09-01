import { supabase } from './client';
import { Database } from './types';

type Website = Database['public']['Tables']['websites']['Row'];
type WebsiteInsert = Database['public']['Tables']['websites']['Insert'];
type WebsiteUpdate = Database['public']['Tables']['websites']['Update'];

export class WebsiteService {
  // Get user's website
  static async getUserWebsite(userId: string): Promise<Website | null> {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No website found for user
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user website:', error);
      throw error;
    }
  }

  // Create or update user's website
  static async saveWebsite(websiteData: WebsiteInsert): Promise<Website> {
    try {
      const { data, error } = await supabase
        .from('websites')
        .upsert(websiteData, {
          onConflict: 'user_id',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error saving website:', error);
      throw error;
    }
  }

  // Update website sections
  static async updateWebsiteSections(userId: string, sections: any): Promise<Website> {
    try {
      const { data, error } = await supabase
        .from('websites')
        .update({ 
          sections,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating website sections:', error);
      throw error;
    }
  }

  // Delete user's website
  static async deleteWebsite(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('websites')
        .delete()
        .eq('user_id', userId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting website:', error);
      throw error;
    }
  }

  // Publish website
  static async publishWebsite(userId: string, publishedUrl: string): Promise<Website> {
    try {
      const { data, error } = await supabase
        .from('websites')
        .update({ 
          is_published: true,
          published_url: publishedUrl,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error publishing website:', error);
      throw error;
    }
  }

  // Unpublish website
  static async unpublishWebsite(userId: string): Promise<Website> {
    try {
      const { data, error } = await supabase
        .from('websites')
        .update({ 
          is_published: false,
          published_url: null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error unpublishing website:', error);
      throw error;
    }
  }

  // Subdomain management methods
  static async createSubdomain(userId: string, websiteId: string, subdomain: string): Promise<any> {
    try {
      // Check if subdomain is available - FIXED: removed .single() to avoid 406 error
      const { data: existing, error: checkError } = await supabase
        .from('subdomains')
        .select('*')
        .eq('subdomain', subdomain);

      if (checkError) {
        throw checkError;
      }

      if (existing && existing.length > 0) {
        throw new Error('Subdomain already taken');
      }

      // Create subdomain record
      const { data, error } = await supabase
        .from('subdomains')
        .insert({
          user_id: userId,
          website_id: websiteId,
          subdomain: subdomain,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating subdomain:', error);
      throw error;
    }
  }

  static async getSubdomains(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('subdomains')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching subdomains:', error);
      throw error;
    }
  }

  static async updateSubdomainStatus(subdomainId: string, status: 'pending' | 'active' | 'failed'): Promise<void> {
    try {
      const { error } = await supabase
        .from('subdomains')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', subdomainId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating subdomain status:', error);
      throw error;
    }
  }

  static async deleteSubdomain(subdomainId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('subdomains')
        .delete()
        .eq('id', subdomainId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting subdomain:', error);
      throw error;
    }
  }
}
