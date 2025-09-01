import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionEditor } from "@/components/SectionEditor";
import { LivePreview } from "@/components/LivePreview";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SectionTemplates } from "@/components/SectionTemplates";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  ArrowLeft, 
  Settings, 
  Maximize2, 
  ExternalLink, 
  Eye, 
  Edit3, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown,
  Download,
  Palette,
  Smartphone,
  Monitor,
  Layout,
  Sparkles,
  Save,
  Share2,
  Code,
  EyeOff,
  Grid3X3,
  Type,
  Image as ImageIcon,
  Layers,
  Zap,
  Tablet,
  Globe
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PricingPopup from "@/components/PricingPopup";

export interface TextElement {
  id: string;
  content: string;
  fontSize: string;
  fontFamily: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontWeight?: string;
  textDecoration?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface ButtonElement {
  id: string;
  text: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: string;
}

export interface FormElement {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select, radio, checkbox
}

export interface SectionData {
  id: string;
  type: 'navbar' | 'hero' | 'about' | 'footer' | 'gallery' | 'services' | 'testimonials' | 'contact' | 'team' | 'pricing' | 'features' | 'blog' | 'cta' | 'stats' | 'faq' | 'newsletter';
  content: string; // Keep for backward compatibility
  textElements?: TextElement[];
  buttonElements?: ButtonElement[];
  formElements?: FormElement[];
  backgroundColor: string;
  backgroundImage?: string;
  logo?: string;
  companyName?: string;
  slogan?: string;
  scrollTargets?: { [key: string]: string };
  fontSize?: string;
  fontFamily?: string;
  galleryImages?: string[];
  // New advanced properties
  padding?: { top: number; bottom: number; left: number; right: number };
  margin?: { top: number; bottom: number; left: number; right: number };
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  opacity?: number;
  animation?: 'none' | 'fadeIn' | 'slideUp' | 'slideDown' | 'zoomIn' | 'bounce';
  layout?: 'stack' | 'grid' | 'flex' | 'masonry';
  columns?: number;
  gap?: number;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  maxWidth?: string;
  minHeight?: string;
  textColor?: string;
  responsive?: {
    mobile?: Partial<SectionData>;
    tablet?: Partial<SectionData>;
    desktop?: Partial<SectionData>;
  };
  // Advanced section-specific data
  stats?: Array<{ label: string; value: string; icon?: string }>;
  testimonials?: Array<{ name: string; role: string; content: string; avatar?: string; rating: number }>;
  services?: Array<{ title: string; description: string; icon: string; features: string[] }>;
  team?: Array<{ name: string; role: string; bio: string; avatar?: string; social: { twitter?: string; linkedin?: string; github?: string } }>;
  pricing?: Array<{ name: string; price: string; period: string; features: string[]; popular?: boolean }>;
  faq?: Array<{ question: string; answer: string }>;
}

// Pre-built section templates
const sectionTemplates = {
  hero: {
    modern: {
      textElements: [
        { id: '1', content: 'Transform Your Business', fontSize: 'text-5xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'Innovative solutions for the modern world', fontSize: 'text-xl', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      buttonElements: [
        { id: '1', text: 'Get Started', variant: 'primary', size: 'lg' },
        { id: '2', text: 'Learn More', variant: 'outline', size: 'lg' }
      ],
      backgroundColor: 'hsl(var(--teal-dark))',
      layout: 'stack',
      alignment: 'center'
    },
    minimal: {
      textElements: [
        { id: '1', content: 'Simple & Clean', fontSize: 'text-4xl', fontFamily: 'font-light', textAlign: 'center' },
        { id: '2', content: 'Less is more', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      backgroundColor: 'transparent',
      layout: 'stack',
      alignment: 'center'
    }
  },
  about: {
    standard: {
      textElements: [
        { id: '1', content: 'About Us', fontSize: 'text-3xl', fontFamily: 'font-bold' },
        { id: '2', content: 'We are passionate about creating innovative solutions that help businesses grow and succeed in the digital age.', fontSize: 'text-lg', fontFamily: 'font-normal' }
      ],
      layout: 'stack',
      alignment: 'left'
    }
  },
  services: {
    grid: {
      textElements: [
        { id: '1', content: 'Our Services', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' }
      ],
      layout: 'grid',
      columns: 3,
      gap: 4,
      backgroundColor: 'hsl(var(--background))'
    }
  }
};

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'split' | 'fullscreen' | 'newWindow'>('split');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showGrid, setShowGrid] = useState(false);
  const [showAnimations, setShowAnimations] = useState(true);
  const [activeTab, setActiveTab] = useState('sections');
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [changeCount, setChangeCount] = useState(0);
  const [isEditorLocked, setIsEditorLocked] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [sections, setSections] = useState<SectionData[]>([
    {
      id: 'navbar',
      type: 'navbar',
      content: `${t('home')} | ${t('about_nav')} | ${t('services')} | ${t('contact')}`,
      companyName: 'Aqall AI',
      slogan: 'Website Builder',
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
      textElements: [
        { id: '1', content: t('landingHeading'), fontSize: 'text-4xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: t('landingDescription'), fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      buttonElements: [
        { id: '1', text: 'Get Started', variant: 'primary', size: 'lg' }
      ],
      backgroundColor: 'hsl(var(--teal-dark))',
      layout: 'stack',
      alignment: 'center',
      padding: { top: 80, bottom: 80, left: 20, right: 20 }
    },
    {
      id: 'about',
      type: 'about',
      content: `${t('about')} | We create innovative solutions for the modern web.`,
      textElements: [
        { id: '1', content: t('about'), fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'We create innovative solutions for the modern web.', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      backgroundColor: 'hsl(var(--background))',
      layout: 'stack',
      alignment: 'center',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    },
    {
      id: 'footer',
      type: 'footer',
      content: '© 2024 Your Website. Powered by Aqall AI.',
      backgroundColor: 'hsl(var(--teal-medium))',
      padding: { top: 40, bottom: 40, left: 20, right: 20 }
    },
  ]);

  useEffect(() => {
    const prompt = location.state?.prompt;
    const generatedSections = location.state?.generatedSections;
    const savedSections = location.state?.savedSections;
    const existingWebsite = location.state?.existingWebsite;
    const companyName = location.state?.companyName;
    const slogan = location.state?.slogan;
    
    console.log("Editor received state:", {
      prompt,
      generatedSections,
      savedSections,
      existingWebsite,
      companyName,
      slogan,
      processed: location.state?.processed
    });
    
          // Handle existing website (saved sections)
      if (existingWebsite && savedSections && !location.state?.processed) {
        console.log("Loading existing website with saved sections:", savedSections);
        setSections(savedSections);
        toast.success('Existing website loaded successfully!');
        
        // Mark as processed to prevent re-triggering
        if (location.state) {
          location.state.processed = true;
        }
        return;
      }
    
    // Handle AI-generated website
    if (prompt && !location.state?.processed) {
      console.log("Processing prompt:", prompt);
      console.log("Generated sections available:", generatedSections);
      console.log("Generated sections length:", generatedSections?.length);
      
      if (generatedSections && generatedSections.length > 0) {
        // Use AI-generated sections
        console.log("Setting AI-generated sections:", generatedSections);
        setSections(generatedSections);
        toast.success(t('aiGeneratedWebsiteLoaded'));
      } else {
        // No AI-generated sections available - this means AI generation failed
        console.log("No AI-generated sections available - AI generation must have failed");
        toast.error('AI generation failed. Please go back and try again.');
        
        // Set minimal sections to prevent errors, but don't pretend they're AI-generated
        const minimalSections: SectionData[] = [
          {
            id: 'navbar',
            type: 'navbar' as const,
            content: 'AI Generation Failed | Please try again',
            textElements: [
              { id: '1', content: 'AI Generation Failed', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
            ],
            backgroundColor: 'hsl(var(--destructive))',
            layout: 'stack',
            alignment: 'center',
            padding: { top: 20, bottom: 20, left: 20, right: 20 }
          },
          {
            id: 'hero',
            type: 'hero' as const,
            content: 'AI Generation Failed | Please go back and try again',
            textElements: [
              { id: '1', content: 'AI Generation Failed', fontSize: 'text-2xl', fontFamily: 'font-bold', textAlign: 'center' },
              { id: '2', content: 'Please go back and try again', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
            ],
            backgroundColor: 'hsl(var(--destructive))',
            layout: 'stack',
            alignment: 'center',
            padding: { top: 80, bottom: 80, left: 20, right: 20 }
          }
        ];
        
        setSections(minimalSections);
      }
      
      // Mark as processed to prevent re-triggering
      if (location.state) {
        location.state.processed = true;
      }
    }
  }, [location.state?.prompt, location.state?.generatedSections, location.state?.savedSections, location.state?.existingWebsite, t]);

  const incrementChangeCount = () => {
    if (!hasPurchased) {
      const newCount = changeCount + 1;
      setChangeCount(newCount);
      
      if (newCount >= 20 && !isEditorLocked) {
        setIsEditorLocked(true);
        setIsPricingModalOpen(true);
        toast.warning(t('reachedFreeEditingLimit'));
      }
    }
  };

  const updateSection = (id: string, updates: Partial<SectionData>) => {
    if (isEditorLocked && !hasPurchased) {
      toast.error(t('pleaseCompletePurchase'));
      return;
    }
    
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, ...updates } : section
    ));
    
    // Only count changes for non-text element updates
    // Text element changes are counted separately when user finishes editing
    if (!updates.textElements) {
      incrementChangeCount();
    }
  };

  const addSection = (type: SectionData['type'], template?: string) => {
    if (isEditorLocked && !hasPurchased) {
      toast.error(t('pleaseCompletePurchase'));
      return;
    }

    const newSection: SectionData = {
      id: `${type}-${Date.now()}`,
      type,
      content: `${t('newSection')} ${type}`,
      textElements: [
        { id: '1', content: `${t('newSection')} ${type}`, fontSize: 'text-lg', fontFamily: 'font-normal' }
      ],
      backgroundColor: 'hsl(var(--background))',
      layout: 'stack',
      alignment: 'center',
      padding: { top: 40, bottom: 40, left: 20, right: 20 },
      ...(type === 'gallery' && { galleryImages: [] })
    };

    // Apply template if specified
    if (template && sectionTemplates[type]?.[template]) {
      const templateData = sectionTemplates[type][template];
      Object.assign(newSection, templateData);
    }

    setSections(prev => [...prev, newSection]);
    incrementChangeCount();
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} ${t('sectionAdded')}`);
  };

  const removeSection = (id: string) => {
    if (isEditorLocked && !hasPurchased) {
      toast.error(t('pleaseCompletePurchase'));
      return;
    }
    
    setSections(prev => prev.filter(section => section.id !== id));
    incrementChangeCount();
    toast.success(t('sectionRemoved'));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    if (isEditorLocked && !hasPurchased) {
      toast.error(t('pleaseCompletePurchase'));
      return;
    }

    setSections(prev => {
      const index = prev.findIndex(section => section.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newSections = [...prev];
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      return newSections;
    });
    incrementChangeCount();
  };

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  const handleSave = () => {
    // Here you would implement the save functionality
    // For now, just show a success message
    toast.success(t('websiteSavedSuccessfully') || 'Website saved successfully!');
  };

  const openPreviewInNewWindow = () => {
    const previewWindow = window.open('', '_blank', 'width=1200,height=800');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Website Preview - Aqall AI</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
          </style>
        </head>
        <body>
          <div id="preview-content"></div>
          <script>
            // This would need to be implemented to render the sections
            document.getElementById('preview-content').innerHTML = 'Preview content would be rendered here';
          </script>
        </body>
        </html>
      `);
    }
  };

  const exportWebsite = () => {
    const html = generateHTML();
    const css = generateCSS();
    
    const blob = new Blob([`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
${css}
    </style>
</head>
<body>
${html}
</body>
</html>`], { type: 'text/html' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success(t('websiteExportedSuccessfully'));
  };

  const generateHTML = () => {
    return sections.map(section => {
      // This would generate the actual HTML for each section
      return `<section id="${section.id}" class="${getSectionClasses(section)}">
        <!-- Section content would be generated here -->
      </section>`;
    }).join('\n');
  };

  const generateCSS = () => {
    return sections.map(section => {
      return `#${section.id} {
        background-color: ${section.backgroundColor};
        ${section.backgroundImage ? `background-image: url(${section.backgroundImage});` : ''}
        padding: ${section.padding?.top || 0}px ${section.padding?.right || 0}px ${section.padding?.bottom || 0}px ${section.padding?.left || 0}px;
        ${section.borderRadius ? `border-radius: ${section.borderRadius}px;` : ''}
        ${section.shadow && section.shadow !== 'none' ? `box-shadow: var(--shadow-${section.shadow});` : ''}
      }`;
    }).join('\n');
  };

  const getSectionClasses = (section: SectionData) => {
    const classes = [];
    if (section.layout) classes.push(`layout-${section.layout}`);
    if (section.alignment) classes.push(`text-${section.alignment}`);
    if (section.shadow && section.shadow !== 'none') classes.push(`shadow-${section.shadow}`);
    return classes.join(' ');
  };

  const duplicateSection = (sectionId: string) => {
    if (isEditorLocked && !hasPurchased) {
      toast.error(t('pleaseCompletePurchase'));
      return;
    }

    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const newSection = {
        ...section,
        id: `${section.type}-${Date.now()}`,
        content: `${section.content} ${t('copy')}`
      };
      setSections(prev => [...prev, newSection]);
      incrementChangeCount();
      toast.success(t('sectionDuplicated'));
    }
  };

  const handlePublish = () => {
    setIsPricingModalOpen(true);
  };

  const handlePlanSelect = (plan: 'monthly' | 'annual') => {
    // Simulate successful purchase
    setHasPurchased(true);
    setIsEditorLocked(false);
    setChangeCount(0); // Reset change count after purchase
    
    if (plan === 'monthly') {
      toast.success(t('purchaseSuccessfulMonthly'));
    } else {
      toast.success(t('purchaseSuccessfulAnnual'));
    }
    // Here you would integrate with your actual payment/domain setup flow
  };

  const renderContent = () => {
    if (previewMode === 'fullscreen') {
      return (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between p-3 md:p-4 border-b bg-card">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#384f51] to-teal-500 rounded-full p-1 shadow-lg">
                  <img 
                    src="/lovable-uploads/b91e7563-c609-4c2c-a09d-1e7971e4c8e9.png" 
                    alt="Aqall AI" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
              <h2 className="text-base md:text-lg font-semibold">{t('fullPreviewMode')}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode('split')}
                className="text-xs"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">{t('exitFullscreen')}</span>
              </Button>
            </div>
          </div>
          <div className="h-full overflow-y-auto">
            <LivePreview
              sections={sections} 
              onSectionClick={handleSectionClick}
              selectedSection={selectedSection}
              deviceMode={deviceMode}
              showGrid={showGrid}
              showAnimations={showAnimations}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-[calc(100vh-140px)]">
        {/* Left Panel - Enhanced Controls */}
        <div className="lg:col-span-3 space-y-4 md:space-y-6 overflow-y-auto">
          {/* Enhanced Header Section */}
          <div className="bg-card rounded-lg border p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                {/* Removed the non-pressable edit logo */}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-primary hover:bg-primary/90 text-white text-xs md:text-sm"
                  size="sm"
                >
                  <Save className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">{t('save') || 'Save'}</span>
                </Button>
                
                <Select onValueChange={addSection} disabled={isEditorLocked && !hasPurchased}>
                  <SelectTrigger className={`w-full md:w-44 text-xs md:text-sm ${isEditorLocked && !hasPurchased ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <SelectValue placeholder={t('addSection')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">{t('heroSection')}</SelectItem>
                    <SelectItem value="about">{t('aboutSection')}</SelectItem>
                    <SelectItem value="services">{t('servicesSection')}</SelectItem>
                    <SelectItem value="testimonials">{t('testimonialsSection')}</SelectItem>
                    <SelectItem value="contact">{t('contactSection')}</SelectItem>
                    <SelectItem value="gallery">{t('gallerySection')}</SelectItem>
                    <SelectItem value="team">{t('teamSection')}</SelectItem>
                    <SelectItem value="pricing">{t('pricingSection')}</SelectItem>
                    <SelectItem value="features">{t('featuresSection')}</SelectItem>
                    <SelectItem value="blog">{t('blogSection')}</SelectItem>
                    <SelectItem value="cta">{t('callToAction')}</SelectItem>
                    <SelectItem value="stats">{t('statistics')}</SelectItem>
                    <SelectItem value="faq">{t('faqSection')}</SelectItem>
                    <SelectItem value="newsletter">{t('newsletterSection')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Enhanced Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sections" className="text-xs">{t('sections')}</TabsTrigger>
              <TabsTrigger value="styling" className="text-xs">{t('exportStyling')}</TabsTrigger>
              <TabsTrigger value="export" className="text-xs">{t('export')}</TabsTrigger>
            </TabsList>

            <TabsContent value="sections" className="space-y-4">
              {/* Sections List */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {t('currentSections')} ({sections.length})
                  </h3>
                </div>
                
                {sections.map((section, index) => (
                  <Card 
                    key={section.id} 
                    className={`transition-all duration-200 ${
                      isEditorLocked && !hasPurchased 
                        ? 'opacity-60 cursor-not-allowed'
                        : 'cursor-pointer'
                    } ${
                      selectedSection === section.id 
                        ? 'ring-2 ring-primary bg-primary/5 border-primary/20' 
                        : 'hover:bg-muted/50 hover:border-muted-foreground/20'
                    }`}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <CardContent className="p-2 md:p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                          <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 ${
                            selectedSection === section.id ? 'bg-primary' : 'bg-muted-foreground/30'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 md:gap-2 mb-1">
                              <h3 className="font-medium capitalize text-xs md:text-sm truncate">{section.type}</h3>
                              <span className="text-xs text-muted-foreground bg-muted px-1.5 md:px-2 py-0.5 rounded flex-shrink-0">
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {section.content.split(' | ')[0] || t('clickToEditContent')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateSection(section.id);
                            }}
                            className="h-6 w-6 md:h-7 md:w-7 p-0"
                          >
                            <Layers className="w-3 h-3" />
                          </Button>
                          {index > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveSection(section.id, 'up');
                              }}
                              className="h-6 w-6 md:h-7 md:w-7 p-0"
                            >
                              <MoveUp className="w-3 h-3" />
                            </Button>
                          )}
                          {index < sections.length - 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveSection(section.id, 'down');
                              }}
                              className="h-6 w-6 md:h-7 md:w-7 p-0"
                            >
                              <MoveDown className="w-3 h-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSection(section.id);
                            }}
                            className="h-6 w-6 md:h-7 md:w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="styling" className="space-y-4">
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-medium mb-4">{t('globalStyling')}</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">{t('devicePreview')}</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant={deviceMode === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDeviceMode('desktop')}
                      >
                        <Monitor className="w-4 h-4 mr-1" />
                        {t('desktop')}
                      </Button>

                      <Button
                        variant={deviceMode === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDeviceMode('mobile')}
                      >
                        <Smartphone className="w-4 h-4 mr-1" />
                        {t('mobile')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="export" className="space-y-4">
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-medium mb-4">{t('publishAndExportOptions')}</h3>
                
                <div className="space-y-3">
                  <Button onClick={handlePublish} className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg">
                    <Globe className="w-4 h-4 mr-2" />
                    {t('publishWebsite')}
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground mb-3">
                    {t('publishDescription')}
                  </div>
                  
                  <Separator />
                  
                  <div className="text-sm font-medium text-muted-foreground mb-2">{t('downloadOptions')}</div>
                  
                  <Button onClick={exportWebsite} variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    {t('exportAsHTML')}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Code className="w-4 h-4 mr-2" />
                    {t('exportCSSOnly')}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t('shareLink')}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Middle Panel - Section Editor (when section is selected) */}
        {selectedSection && (
          <div className="lg:col-span-4 bg-card rounded-lg border overflow-hidden">
            <div className="p-3 md:p-4 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="p-1 md:p-1.5 bg-primary/10 rounded">
                  <Edit3 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{t('editSection')}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{sections.find(s => s.id === selectedSection)?.type}</p>
                </div>
              </div>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
              <SectionEditor
                section={sections.find(s => s.id === selectedSection)!}
                isSelected={true}
                onUpdate={(updates) => updateSection(selectedSection, updates)}
                onSelect={() => {}}
                onRemove={() => removeSection(selectedSection)}
                onMoveUp={undefined}
                onMoveDown={undefined}
                availableSections={sections}
                onChangeCount={incrementChangeCount}
              />
            </div>
          </div>
        )}

        {/* Right Panel - Enhanced Live Preview */}
        <div className={`bg-card rounded-lg border overflow-hidden ${selectedSection ? 'lg:col-span-5' : 'lg:col-span-9'}`}>
          <div className="p-3 md:p-4 border-b bg-muted/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1 md:p-1.5 bg-primary/10 rounded">
                  <Eye className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{t('exportLivePreview')}</h3>
                  <p className="text-xs text-muted-foreground">{t('realTimeWebsitePreview')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 md:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode('fullscreen')}
                  className="text-xs h-8 md:h-9 border-2"
                >
                  <Maximize2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">{t('fullscreen')}</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="h-full overflow-y-auto">
            <LivePreview
              sections={sections} 
              onSectionClick={handleSectionClick}
              selectedSection={selectedSection}
              deviceMode={deviceMode}
              showGrid={showGrid}
              showAnimations={showAnimations}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-1 md:gap-2 hover:bg-muted/50 text-xs md:text-sm"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{t('backToHome')}</span>
                <span className="sm:hidden">{t('back')}</span>
              </Button>

              {!hasPurchased && (
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    changeCount >= 20 
                      ? 'bg-red-100 text-red-700 border border-red-200' 
                      : changeCount >= 15 
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                    {changeCount >= 20 ? t('locked') : `${changeCount}/20 ${t('changesLeft')}`}
                  </div>
                  {changeCount >= 15 && changeCount < 20 && (
                    <span className="text-xs text-orange-600 font-medium">
                      {20 - changeCount} {t('changesLeft')}
                    </span>
                  )}
                </div>
              )}
              
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#384f51] to-teal-500 rounded-full p-1 shadow-lg">
                    <img 
                      src="/lovable-uploads/b91e7563-c609-4c2c-a09d-1e7971e4c8e9.png" 
                      alt="Aqall AI" 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#384f51]/20 to-teal-500/20 rounded-full blur-sm"></div>
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-foreground">{t('websiteEditor')}</h1>
                  <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{t('customizeYourWebsiteSections')}</p>
                </div>
              </div>
            </div>
            
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 relative">
        {renderContent()}
        
        {/* Locked Overlay */}
        {isEditorLocked && !isPricingModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center shadow-xl">
              <div className="mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('editorLocked')}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('editorLockedDescription').replace('{changeCount}', changeCount.toString())}
                </p>
              </div>
              <Button 
                onClick={() => setIsPricingModalOpen(true)}
                className="w-full"
              >
                {t('chooseAPlan')}
              </Button>
            </div>
          </div>
        )}
      </div>

      <PricingPopup 
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSelectPlan={handlePlanSelect}
        isEditorLocked={isEditorLocked}
        changeCount={changeCount}
      />
    </div>
  );
};

export default Editor;
