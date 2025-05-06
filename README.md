# Welli Unified Healthcare Platform

A modern, AI-powered healthcare platform for patients, doctors, and assistants, built as a monorepo with React, TypeScript, Vite, and Supabase.

[GitHub Repository](https://github.com/byprathamesh/welli.git)

---

## Overview

Welli is an innovative healthcare platform that connects patients, doctors, and assistants in a single, unified application. The platform features:
- Role-based login and redirection (Patients, Doctors, Assistants)
- Unified color scheme and design system across all apps
- Dynamic, real-time features powered by Supabase
- Proprietary AI-powered assistant (patent pending)
- Modern, responsive UI with Tailwind CSS and shadcn/ui

## Features
- Role-based login with redirection to the appropriate app
- AI-powered chatbot for instant support (all roles)
- Real-time healthcare provider matching
- Secure patient-provider communication
- Smart appointment scheduling
- Digital health records management
- Feedback, notifications, and reminders
- Dynamic Supabase CRUD for all features (no static data)
- Unified color palette and design system

## Tech Stack
- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (unified palette), shadcn/ui
- **State Management:** React Query
- **Forms:** React Hook Form
- **Backend:** Supabase (auth, database, real-time)
- **Routing:** React Router
- **Charts:** Recharts
- **Other:** date-fns, Embla Carousel, Lucide React

## Monorepo Structure

```
welli/
├── src/
│   ├── components/        # Shared UI components
│   ├── features/          # Feature-based modules (patients app)
│   ├── hooks/             # Shared hooks
│   ├── lib/               # Utilities (e.g., Supabase config)
│   ├── pages/             # Main app pages (patients)
│   ├── doctors/           # Doctors app (standalone, with its own build)
│   └── assistants/        # Assistants app (standalone, with its own build)
├── dist/                  # Build output (main, doctors, assistants)
├── api/                   # API routes (if any)
├── public/                # Static assets
├── welli-mobile/          # Mobile app (if present)
├── ...                    # Config, scripts, etc.
```

- Each sub-app (patients, doctors, assistants) is a full-featured React app with its own build, config, and dependencies.
- All apps share the same color palette and design system.

## Role-Based Login & Redirection
- The login page allows users to select their role (Patient, Doctor, Assistant).
- After login, users are redirected to the appropriate app:
  - `/` for Patients
  - `/doctors` for Doctors
  - `/assistants` for Assistants
- Routing is handled via `vercel.json` and React Router.

## Supabase Integration
- All features (profiles, appointments, feedback, notifications, etc.) use Supabase for real-time CRUD operations.
- No static data: all user and app data is dynamic and synced with Supabase.
- See `src/lib/supabase.ts` for configuration.

## Unified Color Scheme
- The color palette from the patients app is used everywhere (see `tailwind.config.ts`).
- All UI components and pages in doctors and assistants apps have been updated for visual consistency.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/byprathamesh/welli.git
   cd welli
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the main (patients) app:**
   ```bash
   npm run dev
   ```
4. **Build all apps for production:**
   ```bash
   npm run build
   npm run postbuild
   ```
   - This builds the main app and then the doctors and assistants apps, copying their outputs to `/dist/doctors` and `/dist/assistants`.

## Deployment
- Deploy the contents of `/dist` to your static host (e.g., Vercel).
- The `vercel.json` routes `/doctors/*` and `/assistants/*` to their respective apps.
- All apps are served from a single domain with clean URLs.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Legal & License
- This project is proprietary and confidential. All rights reserved. See LICENSE.md for details.
- Unauthorized use, reproduction, or distribution is strictly prohibited. Patent pending on AI assistant and platform features.
- For licensing or collaboration, contact the author via GitHub.
