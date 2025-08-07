export interface WebsiteSection {
  type: 'navbar' | 'hero' | 'about' | 'footer' | 'gallery' | 'services' | 'testimonials' | 'contact' | 'team' | 'pricing' | 'features' | 'blog' | 'cta' | 'stats' | 'faq' | 'newsletter';
  content: string;
  textElements?: Array<{
    id: string;
    content: string;
    fontSize: string;
    fontFamily: string;
    color?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    fontWeight?: string;
  }>;
  buttonElements?: Array<{
    id: string;
    text: string;
    variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size: 'sm' | 'md' | 'lg';
    href?: string;
  }>;
  companyName?: string;
  slogan?: string;
  backgroundColor?: string;
  animation?: 'none' | 'fadeIn' | 'slideUp' | 'slideDown' | 'zoomIn' | 'bounce';
  layout?: 'stack' | 'grid' | 'flex' | 'masonry';
  columns?: number;
  gap?: number;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  padding?: { top: number; bottom: number; left: number; right: number };
  margin?: { top: number; bottom: number; left: number; right: number };
  borderRadius?: number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  opacity?: number;
  galleryImages?: string[];
  stats?: Array<{ label: string; value: string; icon?: string }>;
  testimonials?: Array<{ name: string; role: string; content: string; avatar?: string; rating: number }>;
  services?: Array<{ title: string; description: string; icon: string; features: string[] }>;
  team?: Array<{ name: string; role: string; bio: string; avatar?: string; social: { twitter?: string; linkedin?: string; github?: string } }>;
  pricing?: Array<{ name: string; price: string; period: string; features: string[]; popular?: boolean }>;
  faq?: Array<{ question: string; answer: string }>;
}

export interface GeneratedWebsite {
  sections: WebsiteSection[];
  companyName: string;
  slogan: string;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export class OpenAIService {
  private static async callOpenAI(prompt: string): Promise<string> {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your environment variables.');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert website builder AI. Create a professional website based on the user's specific request.

IMPORTANT: 
- Analyze the user's request carefully and create content that matches their needs
- Use appropriate colors and styling for the business type
- Include relevant images and content for the specific business
- Make it feel authentic to what they asked for
- Create 8-12 sections with modern, interactive design

WEBSITE STRUCTURE (8-12 sections):
1. NAVBAR - Modern, sticky, with logo and smooth navigation
2. HERO - Epic, full-screen with animated elements and call-to-action
3. FEATURES - 3-4 feature cards with icons and hover effects
4. ABOUT - Compelling story with statistics and achievements
5. SERVICES - Detailed service offerings with icons and descriptions
6. STATS - Impressive statistics with animated counters
7. TEAM - Professional team section with social links
8. TESTIMONIALS - Customer reviews with ratings and avatars
9. GALLERY - Image showcase with hover effects
10. PRICING - Professional pricing plans with features
11. FAQ - Common questions with expandable answers
12. CONTACT - Contact form with map and social links
13. NEWSLETTER - Email signup with benefits
14. FOOTER - Comprehensive footer with links and social media

ADVANCED FEATURES TO INCLUDE:
- Gradient backgrounds and text effects
- Hover animations and transitions
- Interactive buttons with multiple variants
- Professional statistics with icons
- Realistic testimonials with ratings
- Team members with social media links
- Pricing plans with feature lists
- FAQ sections with expandable content
- Contact forms with validation
- Newsletter signup sections
- Social media integration
- Professional copywriting
- Modern typography and spacing
- Responsive design considerations

STYLING GUIDELINES:
- Use colors that match the business type
- Add shadows and depth (shadow-lg, shadow-xl)
- Include hover effects and transitions
- Use professional typography
- Add spacing and padding for breathing room
- Include icons and visual elements
- Make everything feel premium and polished
- Use relevant images for the business type

Return a JSON object with this structure:
{
  "companyName": "Creative company name",
  "slogan": "Compelling tagline",
  "sections": [
    {
      "type": "navbar",
      "content": "Home | About | Services | Team | Portfolio | Contact",
      "companyName": "Company name",
      "backgroundColor": "hsl(var(--primary))",
      "animation": "fadeIn",
      "layout": "flex",
      "alignment": "center"
    },
    {
      "type": "hero",
      "content": "Epic main heading | Compelling subheading that captures attention",
      "textElements": [
        {
          "id": "1",
          "content": "Epic main heading",
          "fontSize": "text-5xl md:text-7xl",
          "fontFamily": "font-bold",
          "textAlign": "center",
          "color": "text-white"
        },
        {
          "id": "2",
          "content": "Compelling subheading that captures attention",
          "fontSize": "text-xl md:text-2xl",
          "fontFamily": "font-normal",
          "textAlign": "center",
          "color": "text-white/90"
        }
      ],
      "buttonElements": [
        {
          "id": "1",
          "text": "Get Started",
          "variant": "primary",
          "size": "lg"
        },
        {
          "id": "2",
          "text": "Learn More",
          "variant": "outline",
          "size": "lg"
        }
      ],
      "backgroundColor": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
      "animation": "fadeIn",
      "layout": "stack",
      "alignment": "center",
      "padding": { "top": 120, "bottom": 120, "left": 40, "right": 40 }
    },
    {
      "type": "features",
      "content": "Why Choose Us | Discover what makes us different",
      "textElements": [
        {
          "id": "1",
          "content": "Why Choose Us",
          "fontSize": "text-4xl",
          "fontFamily": "font-bold",
          "textAlign": "center"
        },
        {
          "id": "2",
          "content": "Discover what makes us different",
          "fontSize": "text-lg",
          "fontFamily": "font-normal",
          "textAlign": "center"
        }
      ],
      "services": [
        {
          "title": "Innovation First",
          "description": "We push boundaries and create solutions that stand out",
          "icon": "🚀",
          "features": ["Cutting-edge technology", "Creative solutions", "Future-focused approach"]
        },
        {
          "title": "Quality Assured",
          "description": "Every project meets our high standards of excellence",
          "icon": "⭐",
          "features": ["Premium materials", "Expert craftsmanship", "Rigorous testing"]
        },
        {
          "title": "24/7 Support",
          "description": "We're here for you whenever you need assistance",
          "icon": "🛡️",
          "features": ["Round-the-clock availability", "Expert assistance", "Quick response times"]
        }
      ],
      "backgroundColor": "hsl(var(--background))",
      "animation": "slideUp",
      "layout": "grid",
      "columns": 3,
      "gap": 8,
      "alignment": "center",
      "padding": { "top": 80, "bottom": 80, "left": 40, "right": 40 },
      "galleryImages": [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076d223f692?w=400&h=300&fit=crop"
      ]
    },
    {
      "type": "stats",
      "content": "Our Impact | Numbers that speak for themselves",
      "textElements": [
        {
          "id": "1",
          "content": "Our Impact",
          "fontSize": "text-4xl",
          "fontFamily": "font-bold",
          "textAlign": "center"
        },
        {
          "id": "2",
          "content": "Numbers that speak for themselves",
          "fontSize": "text-lg",
          "fontFamily": "font-normal",
          "textAlign": "center"
        }
      ],
      "stats": [
        { "label": "Happy Clients", "value": "500+", "icon": "😊" },
        { "label": "Projects Completed", "value": "1000+", "icon": "🎯" },
        { "label": "Years Experience", "value": "10+", "icon": "⏰" },
        { "label": "Team Members", "value": "50+", "icon": "👥" }
      ],
      "backgroundColor": "hsl(var(--teal-medium))",
      "animation": "zoomIn",
      "layout": "grid",
      "columns": 4,
      "gap": 8,
      "alignment": "center",
      "padding": { "top": 80, "bottom": 80, "left": 40, "right": 40 }
    },
    {
      "type": "team",
      "content": "Meet Our Team | The brilliant minds behind our success",
      "textElements": [
        {
          "id": "1",
          "content": "Meet Our Team",
          "fontSize": "text-4xl",
          "fontFamily": "font-bold",
          "textAlign": "center"
        },
        {
          "id": "2",
          "content": "The brilliant minds behind our success",
          "fontSize": "text-lg",
          "fontFamily": "font-normal",
          "textAlign": "center"
        }
      ],
      "team": [
        {
          "name": "Sarah Johnson",
          "role": "CEO & Founder",
          "bio": "Visionary leader with 15+ years of experience in digital innovation",
          "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          "social": { "twitter": "#", "linkedin": "#", "github": "#" }
        },
        {
          "name": "Michael Chen",
          "role": "CTO",
          "bio": "Tech expert passionate about creating scalable solutions",
          "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          "social": { "twitter": "#", "linkedin": "#", "github": "#" }
        },
        {
          "name": "Emily Rodriguez",
          "role": "Creative Director",
          "bio": "Award-winning designer with an eye for beautiful aesthetics",
          "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          "social": { "twitter": "#", "linkedin": "#", "github": "#" }
        }
      ],
      "backgroundColor": "hsl(var(--background))",
      "animation": "slideUp",
      "layout": "grid",
      "columns": 3,
      "gap": 8,
      "alignment": "center",
      "padding": { "top": 80, "bottom": 80, "left": 40, "right": 40 }
    },
    {
      "type": "testimonials",
      "content": "What Our Clients Say | Real feedback from real people",
      "textElements": [
        {
          "id": "1",
          "content": "What Our Clients Say",
          "fontSize": "text-4xl",
          "fontFamily": "font-bold",
          "textAlign": "center"
        },
        {
          "id": "2",
          "content": "Real feedback from real people",
          "fontSize": "text-lg",
          "fontFamily": "font-normal",
          "textAlign": "center"
        }
      ],
      "testimonials": [
        {
          "name": "Jennifer Martinez",
          "role": "Marketing Director",
          "content": "Working with this team was an absolute pleasure. They delivered beyond our expectations and the results speak for themselves.",
          "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
          "rating": 5
        },
        {
          "name": "David Thompson",
          "role": "Startup Founder",
          "content": "The level of professionalism and attention to detail is unmatched. They transformed our vision into reality perfectly.",
          "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          "rating": 5
        },
        {
          "name": "Lisa Wang",
          "role": "Product Manager",
          "content": "Exceptional quality and innovative solutions. They truly understand what makes a great user experience.",
          "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          "rating": 5
        }
      ],
      "backgroundColor": "hsl(var(--teal-light))",
      "animation": "fadeIn",
      "layout": "grid",
      "columns": 3,
      "gap": 8,
      "alignment": "center",
      "padding": { "top": 80, "bottom": 80, "left": 40, "right": 40 }
    },
    {
      "type": "pricing",
      "content": "Choose Your Plan | Flexible options for every need",
      "textElements": [
        {
          "id": "1",
          "content": "Choose Your Plan",
          "fontSize": "text-4xl",
          "fontFamily": "font-bold",
          "textAlign": "center"
        },
        {
          "id": "2",
          "content": "Flexible options for every need",
          "fontSize": "text-lg",
          "fontFamily": "font-normal",
          "textAlign": "center"
        }
      ],
      "pricing": [
        {
          "name": "Starter",
          "price": "$29",
          "period": "per month",
          "features": ["Basic features", "Email support", "5 projects", "1GB storage"],
          "popular": false
        },
        {
          "name": "Professional",
          "price": "$99",
          "period": "per month",
          "features": ["Advanced features", "Priority support", "Unlimited projects", "10GB storage", "Custom integrations"],
          "popular": true
        },
        {
          "name": "Enterprise",
          "price": "$299",
          "period": "per month",
          "features": ["All features", "24/7 support", "Unlimited everything", "Custom solutions", "Dedicated manager"],
          "popular": false
        }
      ],
      "backgroundColor": "hsl(var(--background))",
      "animation": "slideUp",
      "layout": "grid",
      "columns": 3,
      "gap": 8,
      "alignment": "center",
      "padding": { "top": 80, "bottom": 80, "left": 40, "right": 40 }
    },
    {
      "type": "faq",
      "content": "Frequently Asked Questions | Everything you need to know",
      "textElements": [
        {
          "id": "1",
          "content": "Frequently Asked Questions",
          "fontSize": "text-4xl",
          "fontFamily": "font-bold",
          "textAlign": "center"
        },
        {
          "id": "2",
          "content": "Everything you need to know",
          "fontSize": "text-lg",
          "fontFamily": "font-normal",
          "textAlign": "center"
        }
      ],
      "faq": [
        {
          "question": "How long does it take to complete a project?",
          "answer": "Project timelines vary depending on complexity. Simple projects take 2-4 weeks, while complex ones can take 8-12 weeks. We'll provide a detailed timeline during our initial consultation."
        },
        {
          "question": "Do you provide ongoing support after launch?",
          "answer": "Yes! We offer comprehensive post-launch support including maintenance, updates, and technical assistance. We're committed to your long-term success."
        },
        {
          "question": "Can you work with our existing systems?",
          "answer": "Absolutely! We're experts at integrating with existing systems and can work with your current technology stack to ensure seamless implementation."
        },
        {
          "question": "What makes you different from other agencies?",
          "answer": "Our combination of technical expertise, creative vision, and personalized approach sets us apart. We don't just build websites - we create digital experiences that drive results."
        }
      ],
      "backgroundColor": "hsl(var(--teal-light))",
      "animation": "fadeIn",
      "layout": "stack",
      "alignment": "center",
      "padding": { "top": 80, "bottom": 80, "left": 40, "right": 40 }
    },
    {
      "type": "contact",
      "content": "Get In Touch | Let's discuss your next project",
      "textElements": [
        {
          "id": "1",
          "content": "Get In Touch",
          "fontSize": "text-4xl",
          "fontFamily": "font-bold",
          "textAlign": "center"
        },
        {
          "id": "2",
          "content": "Let's discuss your next project",
          "fontSize": "text-lg",
          "fontFamily": "font-normal",
          "textAlign": "center"
        }
      ],
      "buttonElements": [
        {
          "id": "1",
          "text": "Send Message",
          "variant": "primary",
          "size": "lg"
        }
      ],
      "backgroundColor": "hsl(var(--background))",
      "animation": "slideUp",
      "layout": "grid",
      "columns": 2,
      "gap": 8,
      "alignment": "center",
      "padding": { "top": 80, "bottom": 80, "left": 40, "right": 40 }
    },
    {
      "type": "newsletter",
      "content": "Stay Updated | Get the latest insights and updates",
      "textElements": [
        {
          "id": "1",
          "content": "Stay Updated",
          "fontSize": "text-3xl",
          "fontFamily": "font-bold",
          "textAlign": "center"
        },
        {
          "id": "2",
          "content": "Get the latest insights and updates delivered to your inbox",
          "fontSize": "text-lg",
          "fontFamily": "font-normal",
          "textAlign": "center"
        }
      ],
      "buttonElements": [
        {
          "id": "1",
          "text": "Subscribe",
          "variant": "primary",
          "size": "md"
        }
      ],
      "backgroundColor": "hsl(var(--teal-dark))",
      "animation": "fadeIn",
      "layout": "stack",
      "alignment": "center",
      "padding": { "top": 60, "bottom": 60, "left": 40, "right": 40 }
    },
    {
      "type": "footer",
      "content": "© 2024 Company Name. All rights reserved.",
      "companyName": "Company Name",
      "backgroundColor": "hsl(var(--teal-dark))",
      "animation": "fadeIn",
      "layout": "flex",
      "alignment": "center",
      "padding": { "top": 40, "bottom": 40, "left": 40, "right": 40 }
    }
  ]
}

Make the content professional, engaging, and relevant to the user's description. 
Use appropriate font sizes, styles, and create a truly impressive website that feels premium and modern.
Focus on creating content that feels authentic and compelling.`
            },
            {
              role: 'user',
              content: `Create a website for: ${prompt}`
            }
          ],
          temperature: 0.8,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API call failed:', error);
      throw error;
    }
  }

  public static async generateWebsite(prompt: string): Promise<GeneratedWebsite> {
    try {
      console.log("OpenAI Service: Starting generation for prompt:", prompt);
      
      const response = await this.callOpenAI(prompt);
      console.log("OpenAI Service: Raw response:", response);
      
      // Parse the JSON response
      const parsedResponse = JSON.parse(response);
      console.log("OpenAI Service: Parsed response:", parsedResponse);
      
      return {
        companyName: parsedResponse.companyName || 'Your Company',
        slogan: parsedResponse.slogan || 'Professional Website',
        sections: parsedResponse.sections || []
      };
    } catch (error) {
      console.error('OpenAI Service: Failed to generate website:', error);
      
      // Fallback response if API fails
      return {
        companyName: 'Your Company',
        slogan: 'Professional Website',
        sections: [
          {
            type: 'navbar',
            content: 'Home | About | Services | Contact',
            companyName: 'Your Company'
          },
          {
            type: 'hero',
            content: 'Welcome to Your Website | Transform your vision into reality',
            textElements: [
              {
                id: '1',
                content: 'Welcome to Your Website',
                fontSize: 'text-4xl',
                fontFamily: 'font-bold'
              },
              {
                id: '2',
                content: 'Transform your vision into reality',
                fontSize: 'text-lg',
                fontFamily: 'font-normal'
              }
            ]
          },
          {
            type: 'about',
            content: 'About Us | We create innovative solutions for the modern web',
            textElements: [
              {
                id: '1',
                content: 'About Us',
                fontSize: 'text-3xl',
                fontFamily: 'font-bold'
              },
              {
                id: '2',
                content: 'We create innovative solutions for the modern web',
                fontSize: 'text-lg',
                fontFamily: 'font-normal'
              }
            ]
          },
          {
            type: 'footer',
            content: '© 2024 Your Company. All rights reserved.'
          }
        ]
      };
    }
  }
} 