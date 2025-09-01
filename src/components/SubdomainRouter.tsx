import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LivePreview } from './LivePreview';

interface SubdomainRouterProps {
  subdomain: string;
}

export const SubdomainRouter = ({ subdomain }: SubdomainRouterProps) => {
  const [website, setWebsite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWebsite = async () => {
      try {
        setLoading(true);
        
        // Get the website data for this subdomain
        const { data, error } = await supabase
          .from('subdomains')
          .select(`
            *,
            websites (
              id,
              name,
              description,
              sections,
              created_at,
              updated_at
            )
          `)
          .eq('subdomain', subdomain)
          .eq('status', 'active')
          .single();

        if (error) {
          throw error;
        }

        if (data && data.websites) {
          setWebsite(data.websites);
        } else {
          setError('Website not found');
        }
      } catch (err) {
        console.error('Error loading website:', err);
        setError('Failed to load website');
      } finally {
        setLoading(false);
      }
    };

    if (subdomain) {
      loadWebsite();
    }
  }, [subdomain]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading website...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Website Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Website Not Found</h1>
          <p className="text-gray-600">This subdomain doesn't have a website yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <LivePreview
        sections={website.sections || []}
        onSectionClick={() => {}}
        selectedSection={null}
        deviceMode="desktop"
        showGrid={false}
        showAnimations={true}
      />
    </div>
  );
};
