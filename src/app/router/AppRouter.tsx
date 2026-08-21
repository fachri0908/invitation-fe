import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/constants/routes";

// AuthGuard is imported statically — it must never be lazy because it wraps
// layout routes; a lazy guard inside <Routes> causes Suspense to fire before
// route matching completes, which falls through to the "*" wildcard redirect.
import { AuthGuard } from "@/features/auth/ui/AuthGuard";

// ─── Lazy-loaded page groups ──────────────────────────────────────────────────

// Guest (public marketing) pages
const GuestHomePage = React.lazy(() =>
  import("@/pages/guest/HomePage").then((m) => ({ default: m.GuestHomePage }))
);
const GuestTemplatesPage = React.lazy(() =>
  import("@/pages/guest/TemplatesPage").then((m) => ({ default: m.GuestTemplatesPage }))
);
const TemplatePreviewPage = React.lazy(() =>
  import("@/pages/guest/TemplatePreviewPage").then((m) => ({ default: m.TemplatePreviewPage }))
);

// Admin pages (authenticated)
const AdminDashboardPage = React.lazy(() =>
  import("@/pages/admin/DashboardPage").then((m) => ({ default: m.AdminDashboardPage }))
);
const AdminInvitationsPage = React.lazy(() =>
  import("@/pages/admin/InvitationsPage").then((m) => ({
    default: m.AdminInvitationsPage,
  }))
);
const LoginPage = React.lazy(() =>
  import("@/pages/admin/LoginPage").then((m) => ({ default: m.LoginPage }))
);

// Invitation viewer (public)
const InvitationViewerPage = React.lazy(() =>
  import("@/pages/invitation/InvitationViewerPage").then((m) => ({
    default: m.InvitationViewerPage,
  }))
);

// Layouts (lazy is fine here — they wrap <Outlet>, not other routes)
const GuestLayout = React.lazy(() =>
  import("@/widgets/layouts/GuestLayout").then((m) => ({ default: m.GuestLayout }))
);
const AdminLayout = React.lazy(() =>
  import("@/widgets/layouts/AdminLayout").then((m) => ({ default: m.AdminLayout }))
);
const InvitationLayout = React.lazy(() =>
  import("@/widgets/layouts/InvitationLayout").then((m) => ({
    default: m.InvitationLayout,
  }))
);

// AuthGuard layout wrapper — renders AdminLayout inside the guard
function ProtectedAdminLayout() {
  return (
    <AuthGuard>
      <AdminLayout />
    </AuthGuard>
  );
}

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Guest / public marketing pages ───────────────────────────── */}
          <Route element={<GuestLayout />}>
            <Route path={ROUTE_PATHS.guest.home} element={<GuestHomePage />} />
            <Route path={ROUTE_PATHS.guest.templates} element={<GuestTemplatesPage />} />
          </Route>

          {/* ── Template preview — full screen, no guest nav ─────────────── */}
          <Route path={ROUTE_PATHS.guest.templatePreview} element={<TemplatePreviewPage />} />

          {/* ── Admin pages (require authentication) ─────────────────────── */}
          <Route element={<ProtectedAdminLayout />}>
            <Route path={ROUTE_PATHS.admin.dashboard} element={<AdminDashboardPage />} />
            <Route
              path={ROUTE_PATHS.admin.invitations}
              element={<AdminInvitationsPage />}
            />
          </Route>

          {/* ── Admin login — not publicly linked, direct URL only ────────── */}
          <Route path={ROUTE_PATHS.auth.login} element={<LoginPage />} />

          {/* ── Public invitation viewer ──────────────────────────────────── */}
          <Route element={<InvitationLayout />}>
            <Route
              path={ROUTE_PATHS.invitation.viewer}
              element={<InvitationViewerPage />}
            />
          </Route>

          {/* ── Fallback ──────────────────────────────────────────────────── */}
          <Route path="*" element={<Navigate to={ROUTE_PATHS.guest.home} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
