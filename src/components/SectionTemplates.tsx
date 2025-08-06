import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionData } from "../pages/Editor";
import { 
  Star, 
  FileText, 
  Image as ImageIcon, 
  Navigation, 
  CreditCard, 
  Users, 
  MessageSquare,
  BarChart3,
  HelpCircle,
  Mail,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Globe,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Rocket
} from "lucide-react";

interface SectionTemplatesProps {
  onSelectTemplate: (template: SectionData) => void;
}

const sectionTemplates = [
  {
    id: 'hero-modern',
    type: 'hero' as const,
    name: 'Modern Hero',
    description: 'Clean, modern hero section with gradient background',
    icon: Star,
    color: 'bg-purple-500',
    template: {
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
      alignment: 'center',
      padding: { top: 100, bottom: 100, left: 20, right: 20 }
    }
  },
  {
    id: 'hero-minimal',
    type: 'hero' as const,
    name: 'Minimal Hero',
    description: 'Simple and clean hero section',
    icon: Star,
    color: 'bg-gray-500',
    template: {
      textElements: [
        { id: '1', content: 'Simple & Clean', fontSize: 'text-4xl', fontFamily: 'font-light', textAlign: 'center' },
        { id: '2', content: 'Less is more', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      backgroundColor: 'transparent',
      layout: 'stack',
      alignment: 'center',
      padding: { top: 80, bottom: 80, left: 20, right: 20 }
    }
  },
  {
    id: 'about-standard',
    type: 'about' as const,
    name: 'Standard About',
    description: 'Professional about section',
    icon: FileText,
    color: 'bg-green-500',
    template: {
      textElements: [
        { id: '1', content: 'About Us', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'We are passionate about creating innovative solutions that help businesses grow and succeed in the digital age.', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      layout: 'stack',
      alignment: 'center',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  },
  {
    id: 'services-grid',
    type: 'services' as const,
    name: 'Services Grid',
    description: 'Grid layout for services',
    icon: FileText,
    color: 'bg-indigo-500',
    template: {
      textElements: [
        { id: '1', content: 'Our Services', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' }
      ],
      layout: 'grid',
      columns: 3,
      gap: 4,
      backgroundColor: 'hsl(var(--background))',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  },
  {
    id: 'team-cards',
    type: 'team' as const,
    name: 'Team Cards',
    description: 'Team member cards layout',
    icon: Users,
    color: 'bg-cyan-500',
    template: {
      textElements: [
        { id: '1', content: 'Our Team', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'Meet the talented people behind our success', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      layout: 'grid',
      columns: 3,
      gap: 6,
      backgroundColor: 'hsl(var(--background))',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  },
  {
    id: 'testimonials-carousel',
    type: 'testimonials' as const,
    name: 'Testimonials',
    description: 'Customer testimonials section',
    icon: MessageSquare,
    color: 'bg-yellow-500',
    template: {
      textElements: [
        { id: '1', content: 'What Our Clients Say', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'Don\'t just take our word for it', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      layout: 'stack',
      alignment: 'center',
      backgroundColor: 'hsl(var(--muted))',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  },
  {
    id: 'contact-form',
    type: 'contact' as const,
    name: 'Contact Form',
    description: 'Contact form section',
    icon: Mail,
    color: 'bg-red-500',
    template: {
      textElements: [
        { id: '1', content: 'Get In Touch', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'We\'d love to hear from you', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      formElements: [
        { id: '1', type: 'text', label: 'Name', placeholder: 'Your name', required: true },
        { id: '2', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
        { id: '3', type: 'textarea', label: 'Message', placeholder: 'Your message...', required: true }
      ],
      layout: 'stack',
      alignment: 'center',
      backgroundColor: 'hsl(var(--background))',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  },
  {
    id: 'pricing-cards',
    type: 'pricing' as const,
    name: 'Pricing Cards',
    description: 'Pricing plans layout',
    icon: CreditCard,
    color: 'bg-emerald-500',
    template: {
      textElements: [
        { id: '1', content: 'Pricing Plans', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'Choose the perfect plan for your needs', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      layout: 'grid',
      columns: 3,
      gap: 6,
      backgroundColor: 'hsl(var(--background))',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  },
  {
    id: 'features-grid',
    type: 'features' as const,
    name: 'Features Grid',
    description: 'Features showcase grid',
    icon: Star,
    color: 'bg-violet-500',
    template: {
      textElements: [
        { id: '1', content: 'Our Features', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'Everything you need to succeed', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      layout: 'grid',
      columns: 3,
      gap: 6,
      backgroundColor: 'hsl(var(--background))',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  },
  {
    id: 'cta-primary',
    type: 'cta' as const,
    name: 'Call to Action',
    description: 'Primary call to action section',
    icon: Target,
    color: 'bg-orange-500',
    template: {
      textElements: [
        { id: '1', content: 'Ready to Get Started?', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'Join thousands of satisfied customers today', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      buttonElements: [
        { id: '1', text: 'Start Now', variant: 'primary', size: 'lg' },
        { id: '2', text: 'Learn More', variant: 'outline', size: 'lg' }
      ],
      backgroundColor: 'hsl(var(--teal-medium))',
      layout: 'stack',
      alignment: 'center',
      padding: { top: 80, bottom: 80, left: 20, right: 20 }
    }
  },
  {
    id: 'stats-counters',
    type: 'stats' as const,
    name: 'Statistics',
    description: 'Statistics and counters section',
    icon: BarChart3,
    color: 'bg-blue-500',
    template: {
      textElements: [
        { id: '1', content: 'Our Numbers', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'Impressive statistics that speak for themselves', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      layout: 'grid',
      columns: 4,
      gap: 4,
      backgroundColor: 'hsl(var(--teal-dark))',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  },
  {
    id: 'faq-accordion',
    type: 'faq' as const,
    name: 'FAQ Section',
    description: 'Frequently asked questions',
    icon: HelpCircle,
    color: 'bg-green-500',
    template: {
      textElements: [
        { id: '1', content: 'Frequently Asked Questions', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'Find answers to common questions', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      layout: 'stack',
      alignment: 'center',
      backgroundColor: 'hsl(var(--background))',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  },
  {
    id: 'newsletter-signup',
    type: 'newsletter' as const,
    name: 'Newsletter',
    description: 'Newsletter signup section',
    icon: Mail,
    color: 'bg-purple-500',
    template: {
      textElements: [
        { id: '1', content: 'Stay Updated', fontSize: 'text-3xl', fontFamily: 'font-bold', textAlign: 'center' },
        { id: '2', content: 'Subscribe to our newsletter for the latest updates', fontSize: 'text-lg', fontFamily: 'font-normal', textAlign: 'center' }
      ],
      formElements: [
        { id: '1', type: 'email', label: 'Email', placeholder: 'Enter your email', required: true }
      ],
      buttonElements: [
        { id: '1', text: 'Subscribe', variant: 'primary', size: 'md' }
      ],
      layout: 'stack',
      alignment: 'center',
      backgroundColor: 'hsl(var(--teal-medium))',
      padding: { top: 60, bottom: 60, left: 20, right: 20 }
    }
  }
];

export const SectionTemplates = ({ onSelectTemplate }: SectionTemplatesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Templates', icon: Sparkles },
    { id: 'hero', name: 'Hero Sections', icon: Star },
    { id: 'content', name: 'Content', icon: FileText },
    { id: 'interactive', name: 'Interactive', icon: Zap },
    { id: 'layout', name: 'Layout', icon: TrendingUp }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? sectionTemplates 
    : sectionTemplates.filter(template => {
        if (selectedCategory === 'hero') return template.type === 'hero';
        if (selectedCategory === 'content') return ['about', 'services', 'team', 'testimonials', 'features'].includes(template.type);
        if (selectedCategory === 'interactive') return ['contact', 'cta', 'newsletter'].includes(template.type);
        if (selectedCategory === 'layout') return ['pricing', 'stats', 'faq'].includes(template.type);
        return true;
      });

  const handleTemplateSelect = (template: any) => {
    const newSection: SectionData = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      content: template.template.textElements?.[0]?.content || `New ${template.type} section`,
      ...template.template
    };
    onSelectTemplate(newSection);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card 
              key={template.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => handleTemplateSelect(template)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${template.color} text-white`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {template.type}
                  </Badge>
                </div>
                <CardTitle className="text-base">{template.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Sparkles className="w-3 h-3" />
                    Template
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground">Try selecting a different category or check back later for new templates.</p>
        </div>
      )}
    </div>
  );
}; 