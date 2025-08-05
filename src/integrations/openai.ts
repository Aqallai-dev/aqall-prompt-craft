export interface WebsiteSection {
  type: 'navbar' | 'hero' | 'about' | 'footer' | 'gallery' | 'services' | 'testimonials' | 'contact' | 'team' | 'pricing' | 'features' | 'blog';
  content: string;
  textElements?: Array<{
    id: string;
    content: string;
    fontSize: string;
    fontFamily: string;
  }>;
  companyName?: string;
  slogan?: string;
  backgroundColor?: string;
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
              content: `You are a professional website builder AI. Generate website content based on user descriptions. 
              Return a JSON object with the following structure:
              {
                "companyName": "Company name",
                "slogan": "Company slogan",
                "sections": [
                  {
                    "type": "navbar",
                    "content": "Home | About | Services | Contact",
                    "companyName": "Company name"
                  },
                  {
                    "type": "hero",
                    "content": "Main heading | Subheading description",
                    "textElements": [
                      {
                        "id": "1",
                        "content": "Main heading",
                        "fontSize": "text-4xl",
                        "fontFamily": "font-bold"
                      },
                      {
                        "id": "2", 
                        "content": "Subheading description",
                        "fontSize": "text-lg",
                        "fontFamily": "font-normal"
                      }
                    ]
                  },
                  {
                    "type": "about",
                    "content": "About heading | About description",
                    "textElements": [
                      {
                        "id": "1",
                        "content": "About heading",
                        "fontSize": "text-3xl",
                        "fontFamily": "font-bold"
                      },
                      {
                        "id": "2",
                        "content": "About description",
                        "fontSize": "text-lg", 
                        "fontFamily": "font-normal"
                      }
                    ]
                  },
                  {
                    "type": "services",
                    "content": "Services heading | Services description",
                    "textElements": [
                      {
                        "id": "1",
                        "content": "Our Services",
                        "fontSize": "text-3xl",
                        "fontFamily": "font-bold"
                      },
                      {
                        "id": "2",
                        "content": "Services description",
                        "fontSize": "text-lg",
                        "fontFamily": "font-normal"
                      }
                    ]
                  },
                  {
                    "type": "footer",
                    "content": "© 2024 Company Name. All rights reserved."
                  }
                ]
              }
              
              Make the content professional, engaging, and relevant to the user's description. 
              Use appropriate font sizes and styles for each section.`
            },
            {
              role: 'user',
              content: `Create a website for: ${prompt}`
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
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