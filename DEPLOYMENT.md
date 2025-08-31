# Deployment Guide

## Environment Variables Setup

### For Local Development
1. Copy `env.example` to `.env`
2. Add your OpenAI API key: `VITE_OPENAI_API_KEY=sk-your-actual-key-here`
3. Run `npm run dev`

### For Production Deployment

#### Vercel
1. Go to your project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `VITE_OPENAI_API_KEY` = `sk-your-actual-openai-key-here`
4. Redeploy your project

#### Netlify
1. Go to Site settings → Environment variables
2. Add the following variables:
   - `VITE_OPENAI_API_KEY` = `sk-your-actual-openai-key-here`
3. Redeploy your project

#### Railway
1. Go to your project
2. Navigate to Variables tab
3. Add `VITE_OPENAI_API_KEY` with your OpenAI API key
4. Redeploy

#### Render
1. Go to your service
2. Navigate to Environment
3. Add `VITE_OPENAI_API_KEY` with your OpenAI API key
4. Redeploy

#### Manual Deployment
If deploying manually:
1. Set the environment variable before building:
   ```bash
   export VITE_OPENAI_API_KEY=sk-your-actual-key-here
   npm run build:prod
   ```
2. Or create a `.env.production` file (don't commit this to git)

## Build Commands

- `npm run build` - Standard production build
- `npm run build:dev` - Development build with source maps
- `npm run build:prod` - Production build optimized

## Troubleshooting

### API Key Not Working in Production
1. Verify the environment variable is set in your hosting platform
2. Check that the variable name is exactly `VITE_OPENAI_API_KEY`
3. Ensure the variable value starts with `sk-`
4. Redeploy after setting environment variables

### Environment Variable Not Loading
1. Make sure the variable name starts with `VITE_`
2. Check that you're using the correct build command
3. Verify the hosting platform supports environment variables

## Security Notes

- Never commit your `.env` file to git
- Use environment variables in production, not hardcoded values
- Regularly rotate your OpenAI API keys
- Monitor API usage to avoid unexpected charges 