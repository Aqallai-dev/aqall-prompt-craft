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
    
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
      const errorMessage = import.meta.env.PROD 
        ? 'OpenAI API key not configured for production. Please set VITE_OPENAI_API_KEY environment variable in your hosting platform.'
        : 'OpenAI API key not found or invalid. Please set VITE_OPENAI_API_KEY in your .env file with a valid API key.';
      throw new Error(errorMessage);
    }
    
    // Detect if the prompt is in Arabic
    const isArabicPrompt = /[\u0600-\u06FF]/.test(prompt);
    const targetLanguage = isArabicPrompt ? 'Arabic' : 'English';
    
    // Create a simpler, more focused prompt
    const enhancedPrompt = `Create a website for: "${prompt}"

Generate a JSON response with this exact structure:
{
  "companyName": "Company name in ${targetLanguage}",
  "slogan": "Company slogan in ${targetLanguage}",
  "sections": [
    {
      "type": "navbar",
      "content": "${targetLanguage === 'Arabic' ? 'الرئيسية | نبذة عنا | الخدمات | اتصل بنا' : 'Home | About | Services | Contact'}",
      "companyName": "Company name in ${targetLanguage}",
      "backgroundColor": "#2563EB"
    },
    {
      "type": "hero",
      "content": "${targetLanguage === 'Arabic' ? 'مرحباً بكم في موقعنا | نقدم خدمات مذهلة' : 'Welcome to our website | We provide amazing services'}",
      "textElements": [
        {
          "id": "1",
          "content": "${targetLanguage === 'Arabic' ? 'مرحباً بكم في موقعنا' : 'Welcome to our website'}",
          "fontSize": "text-5xl",
          "fontFamily": "font-bold"
        },
        {
          "id": "2",
          "content": "${targetLanguage === 'Arabic' ? 'نقدم خدمات مذهلة' : 'We provide amazing services'}",
          "fontSize": "text-xl",
          "fontFamily": "font-normal"
        }
      ],
      "backgroundColor": "#1F2937"
    },
    {
      "type": "about",
      "content": "${targetLanguage === 'Arabic' ? 'نبذة عنا | نحن شركة محترفة' : 'About Us | We are a professional company'}",
      "backgroundColor": "#F8FAFC"
    },
    {
      "type": "services",
      "content": "${targetLanguage === 'Arabic' ? 'خدماتنا | نقدم خدمات متنوعة' : 'Our Services | We offer various services'}",
      "backgroundColor": "#FFFFFF"
    },
    {
      "type": "footer",
      "content": "${targetLanguage === 'Arabic' ? 'اتصل بنا للحصول على مزيد من المعلومات' : 'Contact us for more information'}",
      "backgroundColor": "#1F2937"
    }
  ]
}

IMPORTANT: 
- Write content in ${targetLanguage}
- Return ONLY the JSON, no other text
- Make content relevant to: ${prompt}
- Ensure navigation items match section types for proper scrolling`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a web developer. Create websites based on user descriptions. Always respond with valid JSON.'
            },
            {
              role: 'user',
              content: enhancedPrompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        let errorMessage = `OpenAI API error: ${response.status}`;
        
        if (response.status === 401) {
          errorMessage = "OpenAI API key is invalid or expired. Please check your API key.";
        } else if (response.status === 429) {
          errorMessage = "OpenAI API rate limit exceeded. Please try again later.";
        } else if (response.status === 500) {
          errorMessage = "OpenAI API server error. Please try again later.";
        } else if (response.status === 400) {
          errorMessage = "Invalid request to OpenAI API. Please check your prompt.";
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const content = data.choices[0].message.content;
        
        // Try to extract JSON from the response
        try {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return jsonMatch[0];
          }
          return content;
        } catch (parseError) {
          console.error("OpenAI Service: JSON parsing error:", parseError);
          return content;
        }
      } else {
        throw new Error('Invalid response format from OpenAI API');
      }
    } catch (error) {
      console.error('OpenAI Service: Request failed:', error);
      throw error;
    }
  }

  static async generateWebsite(prompt: string): Promise<any> {
    try {
      const response = await this.callOpenAI(prompt);
      
      // Parse the JSON response
      const parsedResponse = JSON.parse(response);
      
      // Validate the response structure
      if (!parsedResponse.sections || !Array.isArray(parsedResponse.sections)) {
        console.error("OpenAI Service: Invalid response structure:", parsedResponse);
        throw new Error("Invalid response structure from OpenAI - missing sections array");
      }
      
      return parsedResponse;
    } catch (error) {
      console.error('OpenAI Service: Generation failed:', error);
      throw error;
    }
  }

  // Test method to verify the service is working
  static async testConnection(): Promise<boolean> {
    try {
      if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
        return false;
      }
      
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Make debug function available globally for testing (only in development)
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).testOpenAI = () => OpenAIService.testConnection();
} 