import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionEditor } from "./SectionEditor";
import { LivePreview } from "./LivePreview";
import { Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

export interface SectionData {
  id: string;
  type: 'navbar' | 'hero' | 'about' | 'footer';
  content: string;
  backgroundColor: string;
  backgroundImage?: string;
}

const WebsiteBuilder = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<SectionData[]>([
    {
      id: 'navbar',
      type: 'navbar',
      content: 'Navigation | Home | About | Contact',
      backgroundColor: 'transparent',
    },
    {
      id: 'hero',
      type: 'hero',
      content: 'Welcome to Your Website | Build amazing websites with AI',
      backgroundColor: 'hsl(var(--teal-dark))',
    },
    {
      id: 'about',
      type: 'about',
      content: 'About Us | We create innovative solutions for the modern web.',
      backgroundColor: 'hsl(var(--background))',
    },
    {
      id: 'footer',
      type: 'footer',
      content: '© 2024 Your Website. All rights reserved.',
      backgroundColor: 'hsl(var(--teal-medium))',
    },
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate your website");
      return;
    }

    setIsGenerating(true);
    toast.success("Generating your website...");

    // Simulate AI generation
    setTimeout(() => {
      const newSections = sections.map(section => {
        switch (section.type) {
          case 'navbar':
            return { ...section, content: `${prompt} | Home | About | Services | Contact` };
          case 'hero':
            return { 
              ...section, 
              content: `${prompt} | Transform your vision into reality with our cutting-edge solutions` 
            };
          case 'about':
            return { 
              ...section, 
              content: `About ${prompt} | We specialize in bringing innovative ideas to life through technology and creativity.` 
            };
          case 'footer':
            return { ...section, content: `© 2024 ${prompt}. Powered by Aqall AI.` };
          default:
            return section;
        }
      });
      
      setSections(newSections);
      setIsGenerating(false);
      toast.success("Website generated successfully!");
    }, 2000);
  };

  const updateSection = (id: string, updates: Partial<SectionData>) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, ...updates } : section
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/b91e7563-c609-4c2c-a09d-1e7971e4c8e9.png" 
              alt="Aqall AI" 
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Aqall AI</h1>
              <p className="text-sm text-muted-foreground">Website Builder</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Builder Controls */}
          <div className="space-y-6 overflow-y-auto">
            {/* Prompt Input */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">AI Website Generator</h2>
                  </div>
                  <Textarea
                    placeholder="Describe your website... (e.g., 'A modern portfolio for a web developer' or 'An elegant restaurant website')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isGenerating ? (
                      <>
                        <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Website
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Section Editors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Customize Sections</h3>
              {sections.map((section) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  onUpdate={(updates) => updateSection(section.id, updates)}
                />
              ))}
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <h3 className="font-semibold text-foreground">Live Preview</h3>
            </div>
            <div className="h-full overflow-y-auto">
              <LivePreview sections={sections} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;