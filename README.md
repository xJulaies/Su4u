# Su4u

Su4u is a Sudoku-themed React learning project. It introduces Sudoku, explains the rules and history, and includes a playable Sudoku game with generated puzzles, notes, error feedback, a timer, win dialog, theming, routing, and a first Clerk authentication flow.

## Live Demo

The app is deployed on GitHub Pages:

**[Open Su4u](https://xjulaies.github.io/Su4u)**

## Tech Stack

- React with TypeScript
- Vite
- Tailwind CSS 4 via `@tailwindcss/vite`
- TanStack Router with file-based routes
- Clerk via `@clerk/react`
- CSS Modules for the Sudoku game UI
- Feature-based architecture with Atomic Design-inspired components

## Features

- Public pages for home, rules, history, about, impressum, and the Sudoku game
- Shared public layout with navbar and footer
- Light/dark theme handling with `useTheme`
- Generated Sudoku puzzles for `easy`, `medium`, and `hard`
- Unique-solution Sudoku generation
- Cell selection, number input, notes mode, and wrong-answer state
- Game timer and stats display
- Win detection with a completion dialog
- Restart with the current difficulty
- Clerk sign-in and sign-up pages
- Navbar auth state with Clerk `Show` and `UserButton`
- Protected dashboard route group through TanStack Router `beforeLoad`

## Routing

Routes are handled by TanStack Router.

Public routes:

- `/`
- `/rules`
- `/history`
- `/game`
- `/about`
- `/impressum`
- `/sign-in/$`
- `/sign-up/$`

Protected route group:

- `src/routes/_authenticated.tsx`
- `src/routes/_authenticated/dashboard/route.tsx`
- `src/routes/_authenticated/dashboard/index.tsx`

The `_authenticated` route is a pathless layout route. It does not add a URL segment, but it wraps protected child routes. The dashboard resolves to:

```txt
/dashboard
```

The auth guard uses Clerk auth data passed through TanStack Router context:

```txt
ClerkProvider -> App useAuth() -> RouterProvider context -> beforeLoad
```

If a user is not signed in, the guard redirects to the sign-in route.

## GitHub Pages

The app is configured for the GitHub Pages project path:

```ts
// vite.config.ts
base: "/Su4u";
```

```ts
// src/App.tsx
basepath: "/Su4u";
```

The deploy workflow copies `dist/index.html` to `dist/404.html` so direct SPA URLs such as `/Su4u/dashboard` can be served by GitHub Pages.

## Authentication

This project uses only `@clerk/react`. Do not mix it with `@clerk/clerk-react`, because both packages create their own Clerk context. Provider, hooks, and UI components must come from the same package.

Used Clerk pieces:

- `ClerkProvider`
- `useAuth`
- `Show`
- `UserButton`
- `SignIn`
- `SignUp`

The app expects this environment variable:

```txt
VITE_CLERK_PUBLISHABLE_KEY=...
```

Clerk redirects are configured for the GitHub Pages base path:

```tsx
signInUrl = "/Su4u/sign-in";
signUpUrl = "/Su4u/sign-up";
signInForceRedirectUrl = "/Su4u/dashboard";
signUpForceRedirectUrl = "/Su4u/dashboard";
afterSignOutUrl = "/Su4u";
```

## Sudoku Logic

The Sudoku generator:

1. Creates an empty 9x9 grid.
2. Fills it with a valid solved board using backtracking.
3. Removes cells in random order based on difficulty.
4. Keeps a removal only if the puzzle still has exactly one solution.
5. Converts the puzzle and solution into a UI board model.

The game hook, `useSudokuGame`, owns the board state, selected cell, notes mode, timer, current difficulty, board generation, cell clicks, number input, and completion state.

## Project Structure

```txt
src/
  features/
    auth/
    dashboard/
    game/
    home/
    rules/
    history/
    about/
    impressum/
  routes/
  settings/
  shared/
```

The project uses a mixed learning structure:

- `features/*` for feature-specific UI and logic
- `shared/*` for reusable atoms, molecules, templates, hooks, and types
- `routes/*` for TanStack Router route files
- `settings/*` for central text content

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Current Learning Focus

- Clerk integration in a Vite React app
- Passing Clerk auth state into TanStack Router context
- Protecting routes with `beforeLoad`
- Understanding pathless route groups like `_authenticated`
- Handling GitHub Pages base paths with Vite and TanStack Router
- Building Sudoku game state with reusable UI components

## Possible Next Steps

- Improve the dashboard beyond the current placeholder
- Add a dashboard link that only appears for signed-in users
- Add mistake counting and optional scoring
- Extract repeated time formatting into a small helper
