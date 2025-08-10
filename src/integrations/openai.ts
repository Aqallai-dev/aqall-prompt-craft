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
    console.log("OpenAI Service: Checking API key...");
    if (!OPENAI_API_KEY) {
      console.error("OpenAI Service: No API key found!");
      throw new Error('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your environment variables.');
    }
    console.log("OpenAI Service: API key found, making API call...");

    try {
      console.log("OpenAI Service: Making API call to OpenAI...");
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
- Pay special attention to ANY specific color preferences mentioned in the prompt
- If user says "green and red", "blue theme", etc., use those exact colors throughout
- Use appropriate colors and styling for the business type (or user's specific color requests)
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
- Generate a cohesive color palette based on the business type and user's description
- For restaurants/food: Use warm colors like #FF6B35, #F7931E, #FFD23F, #DDA15E
- For tech/software: Use modern colors like #2563EB, #7C3AED, #059669, #DC2626
- For healthcare: Use calming colors like #10B981, #3B82F6, #8B5CF6, #F59E0B
- For fashion/beauty: Use elegant colors like #EC4899, #8B5CF6, #F59E0B, #10B981
- For finance: Use professional colors like #1F2937, #374151, #6B7280, #9CA3AF
- For creative/design: Use vibrant colors like #F97316, #EF4444, #8B5CF6, #06B6D4
- For education: Use inspiring colors like #059669, #2563EB, #7C3AED, #DC2626
- For real estate: Use trustworthy colors like #1F2937, #374151, #6B7280, #9CA3AF
- Add shadows and depth (shadow-lg, shadow-xl)
- Include hover effects and transitions
- Use professional typography
- Add spacing and padding for breathing room
- Include icons and visual elements
- Make everything feel premium and polished
- Use relevant images for the business type

COLOR GENERATION INSTRUCTIONS:
- Analyze the user's prompt carefully to identify ANY specific color preferences they mention
- If the user says "green and red", "blue theme", "warm colors", etc., use those exact colors
- If no specific colors mentioned, then use business-appropriate colors
- Generate a cohesive color palette based on the user's explicit color requests
- Use hex colors (e.g., "#FF6B35") instead of CSS variables
- Create gradients for hero sections using 2-3 complementary colors
- Ensure text colors provide good contrast with background colors
- Use primary colors for main elements, secondary colors for accents

EXAMPLES OF USER COLOR REQUESTS:
- "restaurant website green and red" → Use #22C55E (green) and #EF4444 (red) as primary colors
- "tech company with blue theme" → Use #2563EB (blue) and complementary blues
- "warm and cozy colors" → Use #F97316 (orange), #F59E0B (amber), #FCD34D (yellow)
- "dark and professional" → Use #1F2937 (dark gray), #374151 (medium gray)
- "bright and vibrant" → Use #EF4444 (red), #F97316 (orange), #8B5CF6 (purple)
- "soft and pastel" → Use #FCA5A5 (soft red), #A5B4FC (soft blue), #A7F3D0 (soft green)

IMPORTANT: Always use hex colors, never CSS variables like hsl(var(--primary))

Return a JSON object with this structure:
{
  "companyName": "Creative company name",
  "slogan": "Compelling tagline",
  "sections": [
    {
      "type": "navbar",
      "content": "Home | About | Services | Team | Portfolio | Contact",
      "companyName": "Company name",
      "backgroundColor": "#2563EB",
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
      "backgroundColor": "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
      "animation": "fadeIn",
      "layout": "stack",
      "alignment": "center"
    },
    {
      "type": "features",
      "content": "Feature 1 | Feature 2 | Feature 3 | Feature 4",
      "textElements": [
        {
          "id": "1",
          "content": "Feature 1",
          "fontSize": "text-2xl",
          "fontFamily": "font-bold"
        },
        {
          "id": "2",
          "content": "Feature 2",
          "fontSize": "text-2xl",
          "fontFamily": "font-bold"
        },
        {
          "id": "3",
          "content": "Feature 3",
          "fontSize": "text-2xl",
          "fontFamily": "font-bold"
        },
        {
          "id": "4",
          "content": "Feature 4",
          "fontSize": "text-2xl",
          "fontFamily": "font-bold"
        }
      ],
      "backgroundColor": "#FFFFFF",
      "animation": "fadeIn",
      "layout": "grid",
      "columns": 4,
      "alignment": "center"
    },
    {
      "type": "stats",
      "content": "100+ | 50+ | 24/7 | 99%",
      "stats": [
        {
          "label": "Happy Clients",
          "value": "100+"
        },
        {
          "label": "Projects Completed",
          "value": "50+"
        },
        {
          "label": "Support",
          "value": "24/7"
        },
        {
          "label": "Satisfaction",
          "value": "99%"
        }
      ],
      "backgroundColor": "#7C3AED",
      "animation": "fadeIn",
      "layout": "grid",
      "columns": 4,
      "alignment": "center"
    },
    {
      "type": "about",
      "content": "About Us | We are passionate about creating amazing experiences",
      "textElements": [
        {
          "id": "1",
          "content": "About Us",
          "fontSize": "text-4xl",
          "fontFamily": "font-bold"
        },
        {
          "id": "2",
          "content": "We are passionate about creating amazing experiences",
          "fontSize": "text-lg",
          "fontFamily": "font-normal"
        }
      ],
      "backgroundColor": "#F8FAFC",
      "animation": "fadeIn",
      "layout": "stack",
      "alignment": "center"
    },
    {
      "type": "services",
      "content": "Service 1 | Service 2 | Service 3",
      "services": [
        {
          "title": "Service 1",
          "description": "Professional service description",
          "icon": "🚀",
          "features": ["Feature 1", "Feature 2", "Feature 3"]
        },
        {
          "title": "Service 2",
          "description": "Professional service description",
          "icon": "💡",
          "features": ["Feature 1", "Feature 2", "Feature 3"]
        },
        {
          "title": "Service 3",
          "description": "Professional service description",
          "icon": "🎯",
          "features": ["Feature 1", "Feature 2", "Feature 3"]
        }
      ],
      "backgroundColor": "#FFFFFF",
      "animation": "fadeIn",
      "layout": "grid",
      "columns": 3,
      "alignment": "center"
    },
    {
      "type": "team",
      "content": "Team Member 1 | Team Member 2 | Team Member 3",
      "team": [
        {
          "name": "Team Member 1",
          "role": "CEO & Founder",
          "bio": "Experienced professional with a passion for innovation",
          "social": {
            "twitter": "https://twitter.com/teammember1",
            "linkedin": "https://linkedin.com/in/teammember1"
          }
        },
        {
          "name": "Team Member 2",
          "role": "CTO",
          "bio": "Technology expert driving digital transformation",
          "social": {
            "twitter": "https://twitter.com/teammember2",
            "linkedin": "https://linkedin.com/in/teammember2"
          }
        },
        {
          "name": "Team Member 3",
          "role": "Design Lead",
          "bio": "Creative designer crafting beautiful experiences",
          "social": {
            "twitter": "https://twitter.com/teammember3",
            "linkedin": "https://linkedin.com/in/teammember3"
          }
        }
      ],
      "backgroundColor": "#F8FAFC",
      "animation": "fadeIn",
      "layout": "grid",
      "columns": 3,
      "alignment": "center"
    },
    {
      "type": "testimonials",
      "content": "Testimonial 1 | Testimonial 2 | Testimonial 3",
      "testimonials": [
        {
          "name": "Client Name 1",
          "role": "CEO, Company 1",
          "content": "Amazing service and results! Highly recommended.",
          "rating": 5
        },
        {
          "name": "Client Name 2",
          "role": "Founder, Company 2",
          "content": "Exceeded our expectations in every way.",
          "rating": 5
        },
        {
          "name": "Client Name 3",
          "role": "Director, Company 3",
          "content": "Professional, reliable, and delivers quality.",
          "rating": 5
        }
      ],
      "backgroundColor": "#FFFFFF",
      "animation": "fadeIn",
      "layout": "grid",
      "columns": 3,
      "alignment": "center"
    },
    {
      "type": "gallery",
      "content": "Gallery Image 1 | Gallery Image 2 | Gallery Image 3 | Gallery Image 4",
      "galleryImages": [
        "https://images.unsplash.com/photo-1",
        "https://images.unsplash.com/photo-2",
        "https://images.unsplash.com/photo-3",
        "https://images.unsplash.com/photo-4"
      ],
      "backgroundColor": "#F8FAFC",
      "animation": "fadeIn",
      "layout": "grid",
      "columns": 4,
      "alignment": "center"
    },
    {
      "type": "pricing",
      "content": "Basic Plan | Pro Plan | Enterprise Plan",
      "pricing": [
        {
          "name": "Basic Plan",
          "price": "$29",
          "period": "month",
          "features": ["Feature 1", "Feature 2", "Feature 3"]
        },
        {
          "name": "Pro Plan",
          "price": "$79",
          "period": "month",
          "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
          "popular": true
        },
        {
          "name": "Enterprise Plan",
          "price": "$199",
          "period": "month",
          "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
        }
      ],
      "backgroundColor": "#FFFFFF",
      "animation": "fadeIn",
      "layout": "grid",
      "columns": 3,
      "alignment": "center"
    },
    {
      "type": "faq",
      "content": "FAQ Question 1 | FAQ Question 2 | FAQ Question 3",
      "faq": [
        {
          "question": "FAQ Question 1?",
          "answer": "Detailed answer to the first frequently asked question."
        },
        {
          "question": "FAQ Question 2?",
          "answer": "Detailed answer to the second frequently asked question."
        },
        {
          "question": "FAQ Question 3?",
          "answer": "Detailed answer to the third frequently asked question."
        }
      ],
      "backgroundColor": "#F8FAFC",
      "animation": "fadeIn",
      "layout": "stack",
      "alignment": "center"
    },
    {
      "type": "contact",
      "content": "Contact Us | Get in touch for your next project",
      "textElements": [
        {
          "id": "1",
          "content": "Contact Us",
          "fontSize": "text-4xl",
          "fontFamily": "font-bold"
        },
        {
          "id": "2",
          "content": "Get in touch for your next project",
          "fontSize": "text-lg",
          "fontFamily": "font-normal"
        }
      ],
      "backgroundColor": "#FFFFFF",
      "animation": "fadeIn",
      "layout": "stack",
      "alignment": "center"
    },
    {
      "type": "newsletter",
      "content": "Stay Updated | Subscribe to our newsletter for the latest updates",
      "textElements": [
        {
          "id": "1",
          "content": "Stay Updated",
          "fontSize": "text-3xl",
          "fontFamily": "font-bold"
        },
        {
          "id": "2",
          "content": "Subscribe to our newsletter for the latest updates",
          "fontSize": "text-lg",
          "fontFamily": "font-normal"
        }
      ],
      "backgroundColor": "#1F2937",
      "animation": "fadeIn",
      "layout": "stack",
      "alignment": "center"
    },
    {
      "type": "footer",
      "content": "© 2024 Company Name. All rights reserved.",
      "companyName": "Company Name",
      "backgroundColor": "#1F2937",
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
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(response);
        console.log("OpenAI Service: Parsed response:", parsedResponse);
      } catch (parseError) {
        console.error("OpenAI Service: Failed to parse JSON response:", parseError);
        console.error("Raw response that failed to parse:", response);
        throw new Error("Invalid JSON response from OpenAI");
      }
      
      // Validate the response structure
      if (!parsedResponse.sections || !Array.isArray(parsedResponse.sections)) {
        console.error("OpenAI Service: Invalid response structure - missing or invalid sections:", parsedResponse);
        throw new Error("Invalid response structure from OpenAI");
      }
      
      console.log("OpenAI Service: Valid sections found:", parsedResponse.sections.length);
      
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