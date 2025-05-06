# Welli Home Care

A modern healthcare platform built with React, TypeScript, and Vite.

## Features

- Modern UI with Tailwind CSS
- Responsive design
- Type-safe with TypeScript
- Fast development with Vite
- Accessible components with Shadcn UI
- Efficient state management with React Query
- Form handling with React Hook Form
- Date handling with date-fns
- Charts with Recharts
- Carousel with Embla Carousel

## Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **State Management:** React Query
- **Form Handling:** React Hook Form
- **Routing:** React Router
- **Date Handling:** date-fns
- **Charts:** Recharts
- **Carousel:** Embla Carousel
- **Icons:** Lucide React

## Code Quality, Structure & Maintainability

- **No 'lovable-tagger' or similar meta-programming dependencies.**
- **Business logic is separated by feature for maintainability.**
- **UI components are presentational and reusable.**
- **Pages are thin, focused on layout and rendering.**
- **No unnecessary cross-feature coupling.**
- **Type Safety:** All business logic and components use TypeScript interfaces.
- **Error Handling:** Global error boundary and robust async error handling recommended (see `App.tsx`).
- **Linting:** ESLint is set up with TypeScript and React best practices. Run `npx eslint --fix src` to auto-fix issues.
- **Formatting:** Prettier is configured for consistent code style. Run `npx prettier --write src` to auto-format.
- **Best Practices:**
  - Add new features in `src/features/<feature>`.
  - Keep UI components presentational, move logic to hooks/services.
  - Document non-obvious logic with concise comments.
  - Avoid tight coupling between features; use hooks/services for shared logic.
  - All code changes should be tested for build and type safety (`npm run build`, `npx tsc --noEmit`).

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/welli-home-care.git
cd welli-home-care
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Shared, presentational UI components
├── features/            # Feature-based modules (business logic, hooks, types)
│   ├── user/            # User profile logic, types, service
│   ├── appointments/    # Appointments logic, hooks, types, service
│   ├── notifications/   # Notifications logic, types, service
│   └── feedback/        # Feedback logic, types, service
├── pages/               # Page components (thin, view-only)
├── hooks/               # Global custom hooks (if any)
├── lib/                 # Low-level utilities (e.g., supabase config)
├── App.tsx              # App root and routing
├── main.tsx             # Entry point
```

- **Business logic is separated by feature for maintainability.**
- **UI components are dumb/presentational and reusable.**
- **Pages are thin, focused on layout and rendering.**
- **No unnecessary cross-feature coupling.**

## Deployment

The project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved. See the LICENSE.md file for details.
