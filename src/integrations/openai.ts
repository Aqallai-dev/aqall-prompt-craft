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

// Add debugging to see what's happening with the environment variable
console.log("OpenAI Service: Environment check:");
console.log("OpenAI Service: import.meta.env:", import.meta.env);
console.log("OpenAI Service: VITE_OPENAI_API_KEY:", import.meta.env.VITE_OPENAI_API_KEY);
console.log("OpenAI Service: OPENAI_API_KEY variable:", OPENAI_API_KEY);
console.log("OpenAI Service: Type of OPENAI_API_KEY:", typeof OPENAI_API_KEY);
console.log("OpenAI Service: Length of OPENAI_API_KEY:", OPENAI_API_KEY ? OPENAI_API_KEY.length : "undefined");
console.log("OpenAI Service: Current mode:", import.meta.env.MODE);
console.log("OpenAI Service: Base URL:", import.meta.env.BASE_URL);
console.log("OpenAI Service: Dev:", import.meta.env.DEV);
console.log("OpenAI Service: Prod:", import.meta.env.PROD);

export class OpenAIService {
  private static async callOpenAI(prompt: string): Promise<string> {
    console.log("OpenAI Service: Starting API call...");
    
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.error("OpenAI Service: Invalid API key! Please check your .env file");
      const errorMessage = import.meta.env.PROD 
        ? 'OpenAI API key not configured for production. Please set VITE_OPENAI_API_KEY environment variable in your hosting platform.'
        : 'OpenAI API key not found or invalid. Please set VITE_OPENAI_API_KEY in your .env file with a valid API key.';
      throw new Error(errorMessage);
    }
    
    console.log("OpenAI Service: API key found, length:", OPENAI_API_KEY.length);

    // Detect if the prompt is in Arabic
    const isArabicPrompt = /[\u0600-\u06FF]/.test(prompt);
    const targetLanguage = isArabicPrompt ? 'Arabic' : 'English';
    
    console.log(`OpenAI Service: Detected language: ${targetLanguage}`);
    
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

    console.log("OpenAI Service: Sending request to OpenAI...");

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

      console.log("OpenAI Service: Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI Service: API error:", response.status, errorText);
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("OpenAI Service: API response received");
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const content = data.choices[0].message.content;
        console.log("OpenAI Service: Content length:", content.length);
        
        // Try to extract JSON from the response
        try {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            console.log("OpenAI Service: JSON extracted successfully");
            return jsonMatch[0];
          }
          console.log("OpenAI Service: No JSON match, returning full content");
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
      console.log("OpenAI Service: Starting website generation...");
      
      const response = await this.callOpenAI(prompt);
      console.log("OpenAI Service: Raw response received, length:", response.length);
      
      // Parse the JSON response
      const parsedResponse = JSON.parse(response);
      console.log("OpenAI Service: JSON parsed successfully");
      
      // Validate the response structure
      if (!parsedResponse.sections || !Array.isArray(parsedResponse.sections)) {
        console.error("OpenAI Service: Invalid response structure:", parsedResponse);
        throw new Error("Invalid response structure from OpenAI - missing sections array");
      }
      
      console.log("OpenAI Service: Generation successful, sections:", parsedResponse.sections.length);
      return parsedResponse;
    } catch (error) {
      console.error('OpenAI Service: Generation failed:', error);
      throw error;
    }
  }

  // Test method to verify the service is working
  static async testConnection(): Promise<boolean> {
    try {
      console.log("OpenAI Service: Testing connection...");
      
      if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
        console.error("OpenAI Service: No valid API key found");
        return false;
      }
      
      console.log("OpenAI Service: API key found, testing connection...");
      
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      });
      
      if (response.ok) {
        console.log("OpenAI Service: Connection test successful");
        return true;
      } else {
        console.error("OpenAI Service: Connection test failed:", response.status);
        return false;
      }
    } catch (error) {
      console.error("OpenAI Service: Connection test error:", error);
      return false;
    }
  }
} 