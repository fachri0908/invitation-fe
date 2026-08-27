# EventInvite Frontend — Project Context

> **Purpose of this file:** Living reference for this repository. Update it every time a new route, page, component, template, or architectural decision is added. It's the single source of truth for any AI session or new team member working in this repo alone.

---

## 1. What this app is

**Name:** EventInvite — frontend
**Type:** Online event-invitation service (guest-facing SPA + admin dashboard)
**Model:** The admin manages everything. Guests browse templates, pick one, then contact the admin via WhatsApp to place an order. The admin configures all invitation details (in a backend this repo talks to, but doesn't contain) and delivers a ready-to-share invitation URL to the guest. There are no in-app transactions or payments.

This repo is **independent** — it has its own git history and can be cloned, run, and previewed (template gallery + live previews) without the backend repo at all, since template previews use static fixture data. You only need the backend running for login, the admin dashboard, and the live `/invite/:slug` viewer. See §10 for the API contract this app depends on.

### User Roles

| Role | Access | Entry point |
|------|--------|-------------|
| **Guest (public)** | Landing page, template gallery, public invitation viewer | `/` |
| **Admin** | Full dashboard — manage invitations & templates | `/admin/login` (direct URL only, not linked publicly) |

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | ^19.2.8 (via Vite ^8.2.0) |
| Language | TypeScript | ~6.0.2 (tsconfig target `es2023`) |
| Styling | Tailwind CSS | ^4.3.3 (`@tailwindcss/vite` plugin, CSS-first zero-config) |
| Routing | React Router | ^7.18.2 |
| State | Zustand | ^5.0.15 |
| Data fetching | TanStack React Query | ^5.101.4 |
| HTTP | Axios | ^1.19.0 |
| Lint | oxlint | ^1.75.0 |

---

## 3. Repository Layout

```
frontend/
├── src/
│   ├── app/              App bootstrap (router, providers, global CSS)
│   ├── pages/            Route-level page components
│   │   ├── guest/        Public marketing pages (no auth)
│   │   ├── admin/        Admin pages (require authentication)
│   │   └── invitation/   Public invitation viewer
│   ├── widgets/          Layout-level composites (GuestLayout, AdminLayout, InvitationLayout)
│   ├── features/         Business feature slices — currently `auth`, `invitation`
│   │   └── <feature>/
│   │       ├── api/      Raw API call functions
│   │       ├── hooks/    React Query mutations/queries
│   │       └── ui/       Feature-specific UI (guards, forms)
│   ├── components/       Pure UI library — Atomic Design
│   │   ├── atoms/        Button, Input, Badge, Spinner
│   │   └── molecules/    SearchBar, TemplateCard, WhatsAppContactButton
│   ├── templates/        Self-contained invitation templates — see §8
│   │   ├── types.ts      InvitationData contract + TemplateProps
│   │   ├── registry.ts   templateRegistry[] + findTemplateById()
│   │   └── <template-id>/
│   └── shared/           Cross-cutting, no business logic
│       ├── api/          Axios instance + error class
│       ├── constants/    Route paths, app name, WhatsApp config
│       ├── store/        Zustand stores (auth)
│       └── types/        Shared TS interfaces
├── .env.example
├── package.json
└── vite.config.ts
```

**Import direction rule:** `pages` → `widgets` → `features` → `components` → `shared`. Templates are a peer layer — they may import from `shared` and `components` but not from `features`, `pages`, or `widgets`, and must not import from each other.

> ⚠️ **Known duplication:** there are two separate, overlapping "Invitation" type definitions — `features/invitation/api/invitation.types.ts` (`InvitationSummary`/`InvitationDetail`) and `shared/types/invitation.types.ts` (`Invitation`/`EventTemplate`). They aren't the same type. Check which one a file actually imports before assuming a field exists on "the" invitation type.

---

## 4. Environment Variables

`.env.example`:

```
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_NAME=EventInvite
```

> ⚠️ **Drift:** `VITE_API_BASE_URL` is documented here but **no longer read by the app**. `src/shared/constants/app.ts` hardcodes `API_BASE_URL = "/api"` (relative path — the comment there explains this avoids CORS and relies on the Vite dev server's `/api` proxy to `http://localhost:4000`, configured in `vite.config.ts`; a production deploy needs the same reverse-proxy behavior, or this needs to change). `VITE_APP_NAME` is still honored.

| Variable | Actually used? | Description |
|----------|-----------------|--------------|
| `VITE_API_BASE_URL` | No (see above) | Kept in `.env.example` for now; don't rely on changing it to repoint the API |
| `VITE_APP_NAME` | Yes | `APP_NAME` shown in the UI, defaults to `"EventInvite"` |

---

## 5. NPM Scripts

```bash
npm run dev        # vite --host  (exposes to LAN, not just localhost)
npm run build      # tsc -b && vite build -> dist/
npm run lint       # oxlint
npm run preview    # preview production build
```

---

## 6. Routes

### Actually routed (`src/app/router/AppRouter.tsx`)

| Path | Access | Page Component | Layout |
|------|--------|---------------|--------|
| `/` | Public | `GuestHomePage` | `GuestLayout` |
| `/templates` | Public | `GuestTemplatesPage` | `GuestLayout` |
| `/templates/:id/preview` | Public | `TemplatePreviewPage` | none (standalone, full-screen) |
| `/admin/login` | Public (hidden) | `LoginPage` | none (standalone) |
| `/admin` | Auth only | `AdminDashboardPage` | `AdminLayout` (via `AuthGuard`) |
| `/admin/invitations` | Auth only | `AdminInvitationsPage` | `AdminLayout` (via `AuthGuard`) |
| `/invite/:slug` | Public | `InvitationViewerPage` | `InvitationLayout` |
| `*` (anything else) | Public | redirects to `/` | — |

All page/layout components are lazy-loaded (`React.lazy`). `AuthGuard` itself is **not** lazy — combining a lazy guard with `Suspense` broke route matching (falls through to the wildcard); see the comment in `AppRouter.tsx` if you're tempted to lazy-load it.

> `/admin/login` is **not linked** anywhere in the public UI — direct URL access only.
> Template preview works entirely from the static frontend registry — **no backend required**.

### Path constants that exist but aren't routed yet

`src/shared/constants/routes.ts` defines these `ROUTE_PATHS` ahead of the actual routes existing — don't assume they work until a matching `<Route>` is added to `AppRouter.tsx`:

- `admin.invitationCreate` → `/admin/invitations/new`
- `admin.invitationEdit` → `/admin/invitations/:id/edit`
- `admin.templates` → `/admin/templates`
- `admin.profile` → `/admin/profile`
- `guest.templateDetail` → `/templates/:id`

---

## 7. Key Files Reference

| File | Purpose |
|------|---------|
| `src/main.tsx` | React root mount |
| `src/app/App.tsx` | Composes `AppProviders` + `AppRouter` |
| `src/app/router/AppRouter.tsx` | All routes, lazy-loaded, layout zones + standalone routes |
| `src/app/providers/AppProviders.tsx` | `QueryClientProvider` wrapper |
| `src/app/styles/global.css` | Tailwind v4 `@import` + base layer |
| `src/shared/constants/routes.ts` | `ROUTE_PATHS` object + `buildRoutePath()` |
| `src/shared/constants/app.ts` | `APP_NAME`, `API_BASE_URL` (hardcoded `/api`, see §4), `ACCESS_TOKEN_KEY` |
| `src/shared/constants/whatsapp.ts` | `WHATSAPP_PHONE_NUMBER` (placeholder — **replace before going live**), `buildWhatsAppUrl()` |
| `src/shared/api/apiClient.ts` | Axios instance — `baseURL: ${API_BASE_URL}/v1`, auto-attaches JWT from `localStorage`, normalizes errors into `ApiClientError` |
| `src/shared/store/authStore.ts` | Zustand — `currentUser`, `accessToken` (hydrated from localStorage), `isAuthenticated`, `setCredentials`, `clearCredentials` |
| `src/features/auth/api/authApi.ts` | `loginRequest`, `fetchCurrentUserRequest` |
| `src/features/auth/hooks/useLogin.ts` | Login mutation → fetch profile → `setCredentials` → redirect to `/admin` |
| `src/features/auth/ui/AuthGuard.tsx` | Redirects unauthenticated users to `/admin/login` |
| `src/features/invitation/api/invitationApi.ts` | `fetchAllInvitations`, `fetchPublishedInvitations`, `fetchInvitationBySlug` |
| `src/widgets/layouts/GuestLayout.tsx` | Public navbar (Home, Templates) + footer with WhatsApp CTA |
| `src/widgets/layouts/AdminLayout.tsx` | Sidebar nav + top bar with logout |
| `src/widgets/layouts/InvitationLayout.tsx` | Bare full-screen wrapper for live invitation pages |
| `src/components/atoms/*` | `Button` (polymorphic, variants primary/secondary/outline/ghost/danger), `Input` (forwardRef + label/error), `Badge` (status pill), `Spinner` |
| `src/components/molecules/TemplateCard/TemplateCard.tsx` | Registry-aware card — thumbnail/swatch, "Live preview" link, WhatsApp "Order" CTA |
| `src/components/molecules/WhatsAppContactButton/WhatsAppContactButton.tsx` | Pre-filled WA chat link; accepts optional `templateName` |
| `src/templates/types.ts` | `InvitationData`, `EventEntry`, `PersonEntry`, `GalleryImage`, `TemplateProps` |
| `src/templates/registry.ts` | `templateRegistry[]` + `findTemplateById()` |
| `src/pages/guest/TemplatePreviewPage.tsx` | Renders any registered template full-screen via its fixture data — no backend needed |
| `src/pages/invitation/InvitationViewerPage.tsx` | Live invitation viewer (fetch wiring still pending — see §11) |

---

## 8. Template System

### How templates work

1. Every template lives in `src/templates/<template-id>/`.
2. It exports a single root component matching `TemplateProps` (`{ data: InvitationData, isPreview?: boolean }`).
3. It's registered in `src/templates/registry.ts` with an id, name, description, category, accent color, and a lazy import.
4. `TemplatePreviewPage` (`/templates/:id/preview`) renders any registered template using its own `fixture.ts` demo data — no backend needed.
5. The live `InvitationViewerPage` (`/invite/:slug`) will eventually fetch real `InvitationData` from the backend and render the same component.

A template must stay **self-contained**: its own assets (images, fonts via a scoped `<link>`, a scoped stylesheet with prefixed classes/keyframes), no imports from another template, no imports from `features`/`pages`/`widgets`. This keeps templates from ever breaking each other and keeps each one's weight (JS + CSS + images) code-split so browsing the gallery never loads a template you're not viewing.

### `InvitationData` fields (`src/templates/types.ts`)

All fields are optional except `templateId`, `slug`, `title`, and `events`.

| Field | Type | Purpose |
|-------|------|---------|
| `templateId` | `string` | Identifies which template to render |
| `slug` | `string` | URL-safe identifier |
| `title` | `string` | Main title (couple name, event name) |
| `headline` / `subtitle` | `string` | Above/below the title |
| `groomName` / `brideName` | `string` | Individual names |
| `people` | `PersonEntry[]` | Parents, witnesses, etc. |
| `events` | `EventEntry[]` | Akad, Reception, etc. — each has date, time, venue |
| `venueName` / `venueAddress` / `venueMapUrl` | `string` | Venue fallback used when an event entry omits its own |
| `coverImageUrl` / `portraitImageUrl` / `galleryImages` | `string` / `string` / `GalleryImage[]` | Photo content — not every template uses these (e.g. `flowering-forest` is fully vector/decorative and currently ignores them) |
| `openingMessage` / `closingMessage` | `string` | Invitation text |
| `rsvpEnabled` | `boolean` | Show RSVP section |
| `rsvpDeadline` | `string` (ISO date) | Shown in the RSVP copy if set |
| `rsvpWhatsAppNumber` | `string` | WA number for RSVP confirmations |
| `backgroundMusicUrl` | `string` | Optional background audio — off unless set (no template ships bundled audio) |
| `extras` | `Record<string, unknown>` | Template-specific free-form fields — e.g. `flowering-forest` uses `extras.storyPages`, `extras.giftAccounts`, `extras.giftEwallet` |

### Adding a new template

1. Create `src/templates/<your-id>/index.tsx` — export a component accepting `TemplateProps`.
2. Create `src/templates/<your-id>/fixture.ts` — export a filled `InvitationData` object using **synthetic placeholder data only** (never real names/numbers — see the org data-handling policy).
3. Add an entry to `templateRegistry` in `src/templates/registry.ts`.
4. Add the fixture to the `fixtureMap` in `src/pages/guest/TemplatePreviewPage.tsx`.
5. Insert a row into the backend's `templates` table: `INSERT INTO templates (template_key, name, ...) VALUES ('<your-id>', ...)` — this repo has no admin template-CRUD UI yet, so this is a manual DB step in the backend repo.
6. That's it — it appears on `/templates` and is previewable at `/templates/<your-id>/preview`, no backend required for the preview itself.

### Available templates

| id | Name | Category | Status | Has a `templates` DB row? |
|----|------|----------|--------|------------------------------|
| `elegant-script` | Elegant Script | Wedding | Done | Yes (seeded) |
| `flowering-forest` | Flowering Forest | Wedding | Done | **No — needs a manual insert before it can be used for a real (non-preview) invitation** |

`flowering-forest` was ported from a personal wedding site into a reusable multi-tenant template: no Firebase/live guestbook, no hardcoded PII, RSVP via WhatsApp deep links (same pattern as `elegant-script`), gift/bank info driven entirely by `extras`, music opt-in via `backgroundMusicUrl`. Its own custom animations/colors/fonts live in a scoped `styles.css` + component tree under `src/templates/flowering-forest/`, code-split from the rest of the app.

---

## 9. TypeScript Notes

- `tsconfig.app.json`: target `es2023`, `moduleResolution: "bundler"`, path alias `"@/*": ["./src/*"]` (also set in `vite.config.ts`'s `resolve.alias`).
- `verbatimModuleSyntax: true` — all type-only imports must use `import type { ... }`.
- `erasableSyntaxOnly: true` — no `const enum`, no parameter properties in class constructors.
- `noUnusedLocals` / `noUnusedParameters` — no unused imports or params.
- `types: ["vite/client"]` — this is what makes `import img from "./x.png"` (default-export URL string) type-check; needed by any template that imports local image assets.
- React 19's new JSX transform is active — `import React from "react"` is only needed for `React.lazy`, `React.forwardRef`, or other `React.*` APIs used directly.

---

## 10. Contract with the backend (separate repo)

The backend (Express/Postgres API, a sibling repo — not a subfolder of this one) is expected to serve:

- `GET/POST /api/v1/auth/*` for login/register/me.
- `GET /api/v1/invitations`, `/invitations/public`, `/invitations/by-slug/:slug`, `/invitations/:id` — see the backend's own docs for exact shapes. **No admin create/edit/delete endpoints exist yet** on the backend, so `AdminInvitationsPage` can list but not mutate invitations, and there is no working "create invitation" flow end-to-end yet.
- `GET /api/v1/templates`, `/templates/:id` — **currently stubbed (`501`) on the backend**, not yet implemented.
- Base URL: this app always calls the **relative** path `/api/v1/...` (see §4's drift note) — in dev that's proxied to `http://localhost:4000` by `vite.config.ts`; in any other environment, whatever serves this app must proxy `/api` to the backend itself, or `src/shared/constants/app.ts` needs to change.
- Every response is expected as `{ success: true, data, message? }` or `{ success: false, message, errors? }`.

If you're working in this repo alone and the backend isn't running, template gallery browsing and previews still work fully from static fixtures — only login, the admin dashboard's real data, and the live `/invite/:slug` viewer need it.

---

## 11. WhatsApp Order Flow

```
Guest browses /templates
       |
Clicks "Live preview" on a TemplateCard
       |
/templates/:id/preview — full-screen template rendered with fixture data
       |
Guest clicks "Order" (WhatsApp CTA) from the card
       |
Opens WhatsApp with a pre-filled message naming the template
       |
Admin receives message, discusses requirements off-app
       |
Admin logs in at /admin/login (direct URL, not publicly linked)
       |
Admin creates the invitation on the backend (no UI for this yet — see §6/§10)
       |
Admin sends the invitation URL (/invite/:slug) to the guest
       |
Guest shares /invite/:slug with their invitees
```

**WhatsApp config:** `src/shared/constants/whatsapp.ts` — change `WHATSAPP_PHONE_NUMBER` to the real number in international format without `+` before going live.

---

## 12. Pending / Next Steps

- [ ] **InvitationViewerPage** — actually fetch by slug and render the matching template (currently stubbed with a TODO)
- [ ] **AdminInvitationsPage** — add create/edit/delete/publish/archive actions (blocked on the backend's admin CRUD endpoints)
- [ ] **Create/Edit Invitation forms** — `/admin/invitations/new`, `/admin/invitations/:id/edit` (path constants exist, no routes/pages yet)
- [ ] **Admin Templates page** — `/admin/templates` (path constant exists, no route/page yet)
- [ ] **Admin Profile page** — `/admin/profile` (path constant exists, no route/page yet)
- [ ] **`organisms/` layer** — complex composed sections (invitation form, template grid with filters) don't exist yet under `components/`
- [ ] **Error boundary** — router isn't wrapped in one
- [ ] **Toast notifications** — no global mutation feedback yet
- [ ] **Resolve the duplicate Invitation type definitions** (§3) before building more invitation-editing UI on top of them
- [ ] **Decide the real `VITE_API_BASE_URL` story** — either wire it back up or delete it from `.env.example` to stop documenting a dead variable
- [ ] Insert a `templates` DB row for `flowering-forest` (backend-side step, needed before it can back a real invitation)
- [ ] More templates — each gets its own self-contained folder

---

## 13. Decisions & Constraints Log

| Decision | Reason |
|----------|--------|
| No in-app transactions or payments | Business model: guest contacts admin via WhatsApp, admin delivers the invitation |
| Login only accessible at `/admin/login` (not linked publicly) | Admin-only access; no self-registration for guests |
| Guest → Admin contact via WhatsApp with pre-filled message | Simplest integration; no backend required for order intake |
| Each template is a self-contained folder with its own components/assets/styles | Isolation — templates cannot break each other; each can use its own fonts, styles, animations |
| `InvitationData` is a shared flat contract, not template-specific | Lets the (future) admin form editor stay generic; template-specific fields go in `extras` |
| Preview uses static fixture data, no backend | Templates are browsable and demoable without a running backend or database |
| Fonts loaded via Google Fonts `<link>` inside each template | Keeps font choices isolated from the main app bundle and from other templates |
| `flowering-forest`'s RSVP/gift/music use WhatsApp links / `extras` / opt-in URL instead of the original personal site's Firebase/Google-Apps-Script/bundled-audio | The original was single-tenant; this app is multi-tenant — no shared Firestore project across customers, no hardcoded PII, no bundled 4MB audio per template install |
| `API_BASE_URL` hardcoded to `/api` instead of reading `VITE_API_BASE_URL` | Avoids CORS by always going through same-origin/proxy; means the env var in `.env.example` is currently inert (tracked as a pending cleanup, §12) |
