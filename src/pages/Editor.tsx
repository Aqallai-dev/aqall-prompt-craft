import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionEditor } from "@/components/SectionEditor";
import { LivePreview } from "@/components/LivePreview";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, Settings } from "lucide-react";
import { toast } from "sonner";

export interface SectionData {
  id: string;
  type: 'navbar' | 'hero' | 'about' | 'footer';
  content: string;
  backgroundColor: string;
  backgroundImage?: string;
  logo?: string;
  scrollTargets?: { [key: string]: string }; // For navbar links
  fontSize?: string;
  fontFamily?: string;
}

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sections, setSections] = useState<SectionData[]>([
    {
      id: 'navbar',
      type: 'navbar',
      content: `${t('home')} | ${t('about_nav')} | ${t('services')} | ${t('contact')}`,
      backgroundColor: 'transparent',
      scrollTargets: {
        [t('home')]: 'hero',
        [t('about_nav')]: 'about',
        [t('services')]: 'about',
        [t('contact')]: 'footer'
      }
    },
    {
      id: 'hero',
      type: 'hero',
      content: `${t('landingHeading')} | ${t('landingDescription')}`,
      backgroundColor: 'hsl(var(--teal-dark))',
    },
    {
      id: 'about',
      type: 'about',
      content: `${t('about')} | We create innovative solutions for the modern web.`,
      backgroundColor: 'hsl(var(--background))',
    },
    {
      id: 'footer',
      type: 'footer',
      content: '© 2024 Your Website. Powered by Aqall AI.',
      backgroundColor: 'hsl(var(--teal-medium))',
    },
  ]);

  useEffect(() => {
    const prompt = location.state?.prompt;
    if (prompt && !location.state?.processed) {
      // Generate content based on prompt
      const newSections = sections.map(section => {
        switch (section.type) {
          case 'navbar':
            return { 
              ...section, 
              content: `${prompt} | ${t('home')} | ${t('about_nav')} | ${t('services')} | ${t('contact')}` 
            };
          case 'hero':
            return { 
              ...section, 
              content: `${prompt} | Transform your vision into reality with our cutting-edge solutions` 
            };
          case 'about':
            return { 
              ...section, 
              content: `${t('about')} ${prompt} | We specialize in bringing innovative ideas to life through technology and creativity.` 
            };
          case 'footer':
            return { ...section, content: `© 2024 ${prompt}. Powered by Aqall AI.` };
          default:
            return section;
        }
      });
      
      setSections(newSections);
      toast.success(t('websiteGenerated'));
      
      // Mark as processed to prevent re-triggering
      if (location.state) {
        location.state.processed = true;
      }
    }
  }, [location.state?.prompt, t]);

  const updateSection = (id: string, updates: Partial<SectionData>) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, ...updates } : section
    ));
  };

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  return (
    <div 
      className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/b91e7563-c609-4c2c-a09d-1e7971e4c8e9.png" 
                  alt="Aqall AI" 
                  className="w-8 h-8"
                />
                <div>
                  <h1 className="text-xl font-bold text-foreground">{t('editorTitle')}</h1>
                </div>
              </div>
            </div>
            
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Section Controls */}
          <div className="space-y-6 overflow-y-auto">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('customizeSections')}</h2>
            </div>

            {/* Section Editors */}
            <div className="space-y-4">
              {sections.map((section) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  isSelected={selectedSection === section.id}
                  onUpdate={(updates) => updateSection(section.id, updates)}
                  onSelect={() => handleSectionClick(section.id)}
                  availableSections={sections}
                />
              ))}
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <h3 className="font-semibold text-foreground">{t('livePreview')}</h3>
              <p className="text-sm text-muted-foreground">Click on any section to edit it</p>
            </div>
            <div className="h-full overflow-y-auto">
              <LivePreview 
                sections={sections} 
                onSectionClick={handleSectionClick}
                selectedSection={selectedSection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;