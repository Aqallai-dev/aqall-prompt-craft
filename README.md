# Aqall AI - Website Builder

A modern, AI-powered website builder that transforms your ideas into stunning websites in seconds.

## Features

- 🤖 **AI-Powered Generation**: Uses OpenAI GPT-4 to generate website content based on your descriptions
- 🎨 **Live Preview**: Real-time preview of your website as you build
- 📱 **Mobile-Friendly**: Responsive design that works on all devices
- ⚡ **Fast & Modern**: Built with React, TypeScript, and Tailwind CSS
- 🔧 **Easy Customization**: Drag-and-drop interface for website sections

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aqall-prompt-craft
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## OpenAI API Setup

To use the AI-powered website generation feature:

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add your API key to the `.env` file:
```
VITE_OPENAI_API_KEY=sk-your-api-key-here
```
3. The AI will automatically generate website content based on your descriptions

## Usage

1. **Describe Your Website**: Enter a description of the website you want to create
2. **AI Generation**: The system uses OpenAI to generate relevant content and sections
3. **Customize**: Edit the generated content in the visual editor
4. **Preview**: See your website in real-time with live preview options

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **AI Integration**: OpenAI GPT-4 API
- **State Management**: React Hooks
- **Routing**: React Router

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── integrations/       # External API integrations
│   ├── openai.ts      # OpenAI API service
│   └── supabase/      # Supabase integration
├── lib/                # Utility functions
└── ui/                 # shadcn/ui components
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email: moonyyosuf2004@gmail.com
