# EventInvite — Frontend

React + Vite SPA for EventInvite, an online event-invitation service. Guests browse invitation templates and order via WhatsApp; an admin manages invitations and delivers a shareable link.

This repo is standalone — it does not need the backend repo checked out. Template browsing and live-preview all run from static fixture data. You only need the backend running for login, the admin dashboard's real data, and the live `/invite/:slug` viewer.

For the full architecture reference (routes, template system, API contract, pending work), see [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md).

## Tech Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · React Router v7 · Zustand · TanStack React Query · Axios

## Getting Started

```bash
npm install
cp .env.example .env   # see note below
npm run dev             # http://localhost:5173
```

> **Note:** `.env.example` documents `VITE_API_BASE_URL`, but the app currently calls a relative `/api/v1/...` path regardless of that variable — in dev, `vite.config.ts` proxies `/api` to `http://localhost:4000`. If you're running the backend on a different host/port, edit the proxy target in `vite.config.ts` rather than the env var. See `PROJECT_CONTEXT.md` §4/§10 for details.

## Scripts

```bash
npm run dev       # dev server (vite --host)
npm run build     # typecheck + production build -> dist/
npm run lint      # oxlint
npm run preview   # preview the production build
```

## Project Structure

```
src/
├── app/         App bootstrap — router, providers, global styles
├── pages/       Route-level page components (guest / admin / invitation)
├── widgets/     Layout-level composites (GuestLayout, AdminLayout, InvitationLayout)
├── features/    Business feature slices (auth, invitation)
├── components/  Atomic Design UI library (atoms, molecules)
├── templates/   Self-contained invitation templates — see PROJECT_CONTEXT.md §8
└── shared/      Cross-cutting: api client, constants, store, types
```

## Templates

Each invitation template lives in its own folder under `src/templates/<id>/`, is registered in `src/templates/registry.ts`, and is fully self-contained — its own assets, fonts, and scoped styles, no dependencies on other templates or on `features`/`pages`/`widgets`. Preview any registered template at `/templates/<id>/preview` without a backend.

Currently available: `elegant-script`, `flowering-forest`. See `PROJECT_CONTEXT.md` §8 for the `InvitationData` contract and the steps to add a new one.

## Related repository

The backend API lives in a separate repository (Express + PostgreSQL). See this frontend's `PROJECT_CONTEXT.md` §10 for the API contract it expects, and the backend repo's own `README.md`/`PROJECT_CONTEXT.md` for its side of the story.
