# Su4u

Su4u is a Sudoku-themed React learning project. The app introduces Sudoku, explains the rules and history, and includes a playable Sudoku board with generated puzzles, notes, error feedback, theming, routing, and a first Clerk authentication flow.

## Live Demo

The app is deployed and working on GitHub Pages:

**[Open Su4u](https://xjulaies.github.io/Su4u/)**

> [!NOTE]
> The redirect after signing in does not work correctly on GitHub Pages yet. After completing the login, manually return to the [Su4u main page](https://xjulaies.github.io/Su4u/).

## Tech Stack

- React with TypeScript
- Vite
- Tailwind CSS 4 via `@tailwindcss/vite`
- TanStack Router with file-based routes
- Clerk via `@clerk/react`
- CSS Modules for the Sudoku board
- Feature-based architecture with Atomic Design-inspired components

## Current Features

- Public pages for home, rules, history, about, and impressum
- Shared public layout with navbar and footer
- Light/dark theme handling with `useTheme`
- Sudoku board with generated puzzles
- Unique-solution Sudoku generation
- Cell selection, number input, notes mode, and wrong-answer state
- Auth pages for sign in and sign up using Clerk components
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

The `_authenticated` route is a pathless layout route. It does not add a URL segment, but it wraps protected child routes. The dashboard still resolves to:

```txt
/dashboard
```

The auth guard uses Clerk auth data passed through TanStack Router context:

```txt
ClerkProvider -> App useAuth() -> RouterProvider context -> beforeLoad
```

If a user is not signed in, the guard redirects to the sign-in route.

## Authentication Notes

This project uses only `@clerk/react`. Do not mix it with `@clerk/clerk-react`, because both packages create their own Clerk context. Provider, hooks, and UI components must come from the same package.

Used Clerk pieces:

- `ClerkProvider`
- `useAuth`
- `Show`
- `UserButton`
- `SignIn`
- `SignUp`

The navbar renders different UI based on auth state:

```txt
signed out -> Sign In link
signed in  -> UserButton
```

The app expects this environment variable:

```txt
VITE_CLERK_PUBLISHABLE_KEY=...
```

## Sudoku Logic

The Sudoku generator:

1. Creates an empty 9x9 grid.
2. Fills it with a valid solved board using backtracking.
3. Removes cells in random order.
4. Keeps a removal only if the puzzle still has exactly one solution.
5. Converts the puzzle and solution into a UI board model.

The game hook, `useSudokuGame`, owns the board state, selected cell, notes mode, board generation, cell clicks, and number input.

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
- Keeping all Clerk imports in one package: `@clerk/react`
- Passing Clerk auth state into TanStack Router context
- Protecting routes with `beforeLoad`
- Understanding pathless route groups like `_authenticated`
- Understanding splat routes like `sign-in.$.tsx`
- Keeping auth pages public and dashboard routes protected

## Known Next Steps

- Fix the sign-in redirect on GitHub Pages. Until then, users must manually return to the main page after logging in.
- Decide whether to keep only `/sign-in/$` or add a normal `/sign-in` entry route.
- Improve the dashboard beyond the current placeholder.
- Add a dashboard link that only appears for signed-in users.
- Add a completed-puzzle state to the Sudoku game.
- Consider difficulty levels by changing how many cells are removed.
