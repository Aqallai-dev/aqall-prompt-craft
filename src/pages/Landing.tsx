import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

const Landing = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error(t('enterPrompt'));
      return;
    }

    setIsGenerating(true);
    toast.success(t('generatingWebsite'));

    // Simulate AI generation
    setTimeout(() => {
      // Pass the prompt to the editor page
      navigate('/editor', { state: { prompt } });
    }, 2000);
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-teal-dark via-teal-medium to-primary ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Logo and Title */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <img 
                src="/lovable-uploads/b91e7563-c609-4c2c-a09d-1e7971e4c8e9.png" 
                alt="Aqall AI" 
                className="w-16 h-16 drop-shadow-lg"
              />
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold">{t('landingTitle')}</h1>
                <p className="text-xl text-white/80">{t('landingSubtitle')}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t('landingHeading')}
              </h2>
              <p className="text-lg text-white/90 max-w-lg mx-auto">
                {t('landingDescription')}
              </p>
            </div>
          </div>

          {/* Prompt Input Card */}
          <Card className="backdrop-blur-sm bg-white/10 border-white/20">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-white">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">
                    {t('landingHeading')}
                  </h3>
                </div>
                
                <Textarea
                  placeholder={t('promptPlaceholder')}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none bg-white/90 border-white/30 text-foreground placeholder:text-muted-foreground"
                />
                
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-white text-teal-dark hover:bg-white/90 font-semibold py-6 text-lg"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Wand2 className="w-5 h-5 mr-3 animate-spin" />
                      {t('generating')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-3" />
                      {t('generateButton')}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {['AI-Powered', 'Real-time Preview', 'Easy Customization'].map((feature, index) => (
              <div key={index} className="text-white/80">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;