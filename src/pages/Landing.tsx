import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Wand2, LogIn, UserPlus, LogOut, ArrowRight, Zap, Palette, Smartphone, Mail, MapPin, MessageCircle, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";
import { OpenAIService } from "@/integrations/openai";
import { WebsiteService } from "@/integrations/supabase/websiteService";

const Landing = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [existingWebsite, setExistingWebsite] = useState<any>(null);
  const [isCheckingWebsite, setIsCheckingWebsite] = useState(false);
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const { user, signOut } = useAuth();

  // Check for existing website when user logs in
  useEffect(() => {
    const checkExistingWebsite = async () => {
      if (user && !existingWebsite && !isCheckingWebsite) {
        setIsCheckingWebsite(true);
        try {
          console.log("Landing: Checking for existing website for user:", user.id);
          const website = await WebsiteService.getUserWebsite(user.id);
          console.log("Landing: Found existing website:", website);
          setExistingWebsite(website);
        } catch (error) {
          console.error('Error checking for existing website:', error);
        } finally {
          setIsCheckingWebsite(false);
        }
      }
    };

    checkExistingWebsite();
  }, [user, existingWebsite, isCheckingWebsite]);

  const handleViewExistingWebsite = () => {
    if (existingWebsite) {
      console.log("Landing: Viewing existing website:", existingWebsite);
      console.log("Landing: Saved sections:", existingWebsite.sections);
      
      navigate('/editor', {
        state: {
          existingWebsite: true,
          savedSections: existingWebsite.sections,
          companyName: existingWebsite.company_name,
          slogan: existingWebsite.slogan,
          prompt: existingWebsite.prompt,
          processed: false // Set to false so it gets processed
        }
      });
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error(t('enterPrompt'));
      return;
    }

    if (!user) {
      navigate('/auth');
      return;
    }

    setIsGenerating(true);
    toast.success(t('generatingWebsite'));

    try {
      console.log("Landing: Starting AI generation with prompt:", prompt);
      console.log("Landing: User authenticated:", !!user);
      
      // Test OpenAI connection first
      console.log("Landing: Testing OpenAI connection...");
      const isConnected = await OpenAIService.testConnection();
      console.log("Landing: OpenAI connection test result:", isConnected);
      
      if (!isConnected) {
        throw new Error("OpenAI service is not connected. Please check your API key.");
      }
      
      // Generate website content using OpenAI
      console.log("Landing: About to call OpenAIService.generateWebsite...");
      const generatedWebsite = await OpenAIService.generateWebsite(prompt);
      
      console.log("Landing: Successfully received generated website data:", generatedWebsite);
      
      // Convert the generated sections to the format expected by the editor
      const sections = generatedWebsite.sections.map((section, index) => {
        console.log(`Landing: Processing section ${section.type}:`, section);
        return {
          id: `${section.type}-${index}`,
          type: section.type,
          content: section.content,
          textElements: section.textElements || [
            {
              id: '1',
              content: section.content.split(' | ')[0] || section.content,
              fontSize: 'text-lg',
              fontFamily: 'font-normal'
            }
          ],
          backgroundColor: section.backgroundColor || 'hsl(var(--teal-dark))',
          layout: section.layout || 'stack',
          alignment: section.alignment || 'center',
          padding: { top: 40, bottom: 40, left: 20, right: 20 },
          companyName: section.companyName || generatedWebsite.companyName,
          slogan: section.slogan || generatedWebsite.slogan,
          // Add other properties that might be missing
          stats: section.stats,
          testimonials: section.testimonials,
          services: section.services,
          team: section.team,
          pricing: section.pricing,
          faq: section.faq,
          galleryImages: section.galleryImages || [],
          // Add proper scroll targets for navigation
          scrollTargets: section.type === 'navbar' ? {
            'Home': 'hero-1',
            'الرئيسية': 'hero-1',
            'About': 'about-2',
            'نبذة عنا': 'about-2', 
            'Services': 'services-3',
            'الخدمات': 'services-3',
            'Contact': 'footer-4',
            'اتصل بنا': 'footer-4'
          } : undefined
        };
      });

      console.log("Landing: Converted sections:", sections);

      // Navigate to editor with generated content
      navigate('/editor', { 
        state: { 
          prompt,
          generatedSections: sections,
          companyName: generatedWebsite.companyName,
          slogan: generatedWebsite.slogan,
          processed: false // Set to false so it gets processed
        } 
      });
      
      toast.success(t('websiteGenerated'));
    } catch (error) {
      console.error('Landing: Failed to generate website:', error);
      console.error('Landing: Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Show specific error message based on the error type
      if (error.message.includes('API key')) {
        toast.error('OpenAI API key not configured. Please check your environment variables.');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error('Network error. Please check your internet connection and try again.');
      } else if (error.message.includes('rate limit')) {
        toast.error('OpenAI API rate limit exceeded. Please wait a moment and try again.');
      } else if (error.message.includes('server error')) {
        toast.error('OpenAI API server error. Please try again later.');
      } else {
        toast.error(t('failedToGenerate'));
      }
      
      // Show additional help for API key issues
      if (error.message.includes('API key') || error.message.includes('not connected')) {
        console.log("Landing: Showing API key help");
        setTimeout(() => {
          toast.error('💡 Tip: Use the "Test API Connection" button to verify your OpenAI API key is working.');
        }, 2000);
      }
      
      // Don't navigate to editor on error - let user try again
      console.log("Landing: AI generation failed, staying on landing page");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success(t('signedOutSuccessfully'));
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-[#384f51] to-slate-900 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} md:top-6 ${isRTL ? 'md:left-6' : 'md:right-6'} flex items-center gap-2 md:gap-4 z-10`}>
        {user ? (
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-white/90 text-xs md:text-sm font-medium hidden sm:block">
              {t('welcomeBack')}
            </span>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm text-xs md:text-sm px-2 md:px-3"
            >
              <LogOut className={`w-3 h-3 md:w-4 md:h-4 ${isRTL ? 'ml-1 md:ml-2' : 'mr-1 md:mr-2'}`} />
              <span className="hidden sm:inline">
                {t('signOut')}
              </span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              onClick={() => navigate('/auth')}
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm text-xs md:text-sm px-2 md:px-3"
            >
              <LogIn className={`w-3 h-3 md:w-4 md:h-4 ${isRTL ? 'ml-1 md:ml-2' : 'mr-1 md:mr-2'}`} />
              <span className="hidden sm:inline">
                {t('signIn')}
              </span>
            </Button>
            <Button
              onClick={() => navigate('/auth')}
              size="sm"
              className="bg-white text-[#384f51] hover:bg-white/90 font-medium text-xs md:text-sm px-2 md:px-3"
            >
              <UserPlus className={`w-3 h-3 md:w-4 md:h-4 ${isRTL ? 'ml-1 md:ml-2' : 'mr-1 md:mr-2'}`} />
              <span className="hidden sm:inline">
                {t('signUp')}
              </span>
            </Button>
          </div>
        )}
        <LanguageToggle />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 md:px-6 py-8 md:py-12 pt-20 md:pt-8">
        <div className="w-full max-w-4xl space-y-8 md:space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6 md:space-y-8">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#384f51] to-teal-500 rounded-full p-1 shadow-2xl">
                  <img 
                    src="/lovable-uploads/b91e7563-c609-4c2c-a09d-1e7971e4c8e9.png" 
                    alt="Aqall AI" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="absolute -inset-3 bg-gradient-to-r from-[#384f51]/30 to-teal-500/30 rounded-full blur-xl animate-pulse"></div>
              </div>
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-teal-100 to-teal-200 bg-clip-text text-transparent drop-shadow-lg">
                  {t('landingTitle')}
                </h1>
                <p className="text-sm md:text-lg text-teal-200 font-medium mt-1">{t('landingSubtitle')}</p>
              </div>
            </div>
            
            {/* Main Headline */}
            <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto px-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {t('landingHeading')}
                <span className="block text-transparent bg-gradient-to-r from-teal-300 to-teal-100 bg-clip-text mt-3 md:mt-4">
                  {t('withAIMagic')}
                </span>
              </h2>
              <p className="text-base md:text-xl text-teal-100/90 leading-relaxed max-w-2xl mx-auto">
                {t('landingDescription')}
              </p>
            </div>
          </div>

          {/* Main Action Card */}
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl mx-4 md:mx-0">
            <CardContent className="p-6 md:p-8 lg:p-10">
              {user && isCheckingWebsite ? (
                // Show loading state while checking for existing website
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-3 md:gap-4 text-white">
                    <div className="p-2 md:p-3 bg-gradient-to-r from-[#384f51] to-teal-500 rounded-xl">
                      <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold">
                        {t('checkingForSavedWebsites')}
                      </h3>
                      <p className="text-teal-200/80 text-xs md:text-sm">
                        {t('pleaseWaitWhileLoading')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/20 rounded-xl p-6 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-300 mx-auto mb-4" />
                    <p className="text-teal-200/60 text-sm">{t('loading')}</p>
                  </div>
                </div>
              ) : user && existingWebsite ? (
                // Show existing website view for logged-in users with saved websites
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-3 md:gap-4 text-white">
                    <div className="p-2 md:p-3 bg-gradient-to-r from-[#384f51] to-teal-500 rounded-xl">
                      <Eye className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold">
                        {t('previouslySavedWebsite')}
                      </h3>
                      <p className="text-teal-200/80 text-xs md:text-sm">
                        {t('viewLastWebsite')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/20 rounded-xl p-6 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#384f51] to-teal-500 rounded-full flex items-center justify-center mx-auto">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">
                          {existingWebsite.company_name || t('yourWebsite')}
                        </h4>
                        {existingWebsite.slogan && (
                          <p className="text-teal-200/80 text-sm mb-4">
                            {existingWebsite.slogan}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={handleViewExistingWebsite}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        {t('viewLastWebsite')}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // Show prompt box for new users or users without saved websites
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-3 md:gap-4 text-white">
                    <div className="p-2 md:p-3 bg-gradient-to-r from-[#384f51] to-teal-500 rounded-xl">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold">
                        {t('describeVision')}
                      </h3>
                      <p className="text-teal-200/80 text-xs md:text-sm">
                        {t('tellUsWhat')}
                      </p>
                    </div>
                  </div>
                  
                  <Textarea
                    placeholder={t('promptPlaceholder')}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] md:min-h-[140px] resize-none bg-white/10 border-white/20 text-white placeholder:text-teal-200/60 text-base md:text-lg leading-relaxed"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t('generating')}...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        {t('generateButton')}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 px-4 md:px-0">
            {[
              {
                icon: Zap,
                title: t('lightningFast'),
                description: t('lightningFastDesc')
              },
              {
                icon: Palette,
                title: t('beautifulDesign'),
                description: t('beautifulDesignDesc')
              },
              {
                icon: Smartphone,
                title: t('responsive'),
                description: t('responsiveDesc')
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-[#384f51]/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-teal-300" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-teal-200/80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
              <div className={`flex items-center ${isRTL ? 'justify-center md:justify-end' : 'justify-center md:justify-start'} gap-3 mb-4`}>
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#384f51] to-teal-500 rounded-full p-1 shadow-lg">
                    <img 
                      src="/lovable-uploads/b91e7563-c609-4c2c-a09d-1e7971e4c8e9.png" 
                      alt="Aqall AI" 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#384f51]/20 to-teal-500/20 rounded-full blur-sm"></div>
                </div>
                <h3 className="text-xl font-bold text-white">{t('landingTitle')}</h3>
              </div>
              <p className="text-teal-200/80 text-sm">
                {t('transformingIdeas')}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">{t('contactUs')}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-teal-200/90">
                  <Mail className="w-4 h-4 text-teal-300" />
                  <span className="text-sm">moonyyosuf2004@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-teal-200/90">
                  <MapPin className="w-4 h-4 text-teal-300" />
                  <span className="text-sm">{t('manchesterUK')}</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">
                {t('followUs')}
              </h4>
              <div className="space-y-3">
                <a 
                  href="https://www.tiktok.com/@aqall.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-teal-200/90 hover:text-teal-200 transition-colors"
                >
                  <svg className="w-4 h-4 text-teal-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.11V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="text-sm">@aqall.ai</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-8 pt-6 text-center">
            <p className="text-teal-200/60 text-sm">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;