# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Testing
No specific test framework is configured. Check with the user before implementing testing.

## Architecture Overview

This is a Next.js 15 application called "Decision Compass" - an AI-powered decision support tool for solo entrepreneurs and creators. It uses a dual-panel interface where users input free-form text on the left and receive structured AI-generated decision options on the right.

### Key Technologies
- **Frontend**: Next.js 15 + TypeScript + TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **AI Service**: Silicon Flow API (DeepSeek-V3 model)
- **Authentication**: Supabase Auth (with mock fallback for development)
- **Deployment**: Vercel

### Core Components

#### Main Application Structure
- `app/page.tsx` - Landing page with Japanese-inspired minimalist design
- `app/app/page.tsx` - Main application interface (dual-panel layout)
- `app/layout.tsx` - Root layout with Geist fonts
- `app/globals.css` - Global styles and TailwindCSS configuration

#### Key Components
- `components/AIChoicePanel.tsx` - Right panel displaying AI-generated decision options
- `components/DecisionInput.tsx` - Left panel for user input
- `components/DecisionHistory.tsx` - Historical decisions display
- `components/Header.tsx` - Navigation header

#### Data Layer
- `lib/supabase.ts` - Supabase client configuration and TypeScript interfaces
- `lib/decisions.ts` - Decision management service with mock fallback
- `app/api/generate-options/route.ts` - AI option generation endpoint

### Database Schema
The application uses a single `decisions` table with the following structure:
- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to auth.users
- `content` (TEXT) - User's decision context
- `ai_options` (JSONB) - Generated AI options
- `selected_option` (INTEGER) - Index of chosen option
- `result` (TEXT) - Decision outcome
- `created_at`, `updated_at` - Timestamps

### AI Integration
The app integrates with Silicon Flow API using the DeepSeek-V3 model. The system uses a detailed prompt engineering approach to generate structured decision options with:
- Strategy types (aggressive, conservative, innovative, wait-and-see)
- Core logic and assumptions
- Actionable steps with timelines
- Risk analysis and mitigation
- Investment requirements (time, money, energy)
- Expected outcomes and success probabilities

### Development Notes

#### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SILICON_FLOW_API_KEY=
SILICON_FLOW_API_URL=https://api.siliconflow.cn/v1/chat/completions
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Mock Data Fallback
The application includes comprehensive mock data generators for development when API keys are not available. This ensures the app remains functional during development.

#### Authentication
Uses Supabase Auth with Row Level Security (RLS) policies. Includes mock authentication service for development.

### Code Conventions
- Uses TypeScript with strict typing
- TailwindCSS for styling with a minimalist Japanese-inspired design
- React hooks for state management
- Error boundaries and graceful fallbacks
- Responsive design principles

### API Routes
- `POST /api/generate-options` - Generates AI decision options from user input

### Development Workflow
1. Set up environment variables in `.env.local`
2. Run Supabase schema setup using `supabase-schema.sql`
3. Start development server with `npm run dev`
4. The app works with or without external service credentials (mock fallbacks)

### File Structure Notes
- The app has both `app/page.tsx` (landing) and `app/app/page.tsx` (main app)
- Components are organized by functionality
- Services are separated into `lib/` directory
- Database schema is version-controlled in `supabase-schema.sql`