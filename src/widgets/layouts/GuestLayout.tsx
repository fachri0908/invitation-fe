import { Outlet, Link, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/constants/routes";
import { APP_NAME } from "@/shared/constants/app";
import { WhatsAppContactButton } from "@/components/molecules/WhatsAppContactButton";

const navLinks = [
  { label: "Home", path: ROUTE_PATHS.guest.home },
  { label: "Templates", path: ROUTE_PATHS.guest.templates },
];

export function GuestLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            to={ROUTE_PATHS.guest.home}
            className="text-xl font-bold text-indigo-600"
          >
            {APP_NAME}
          </Link>

          <nav className="flex items-center gap-6">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={[
                  "text-sm font-medium transition-colors hover:text-indigo-600",
                  location.pathname === path ? "text-indigo-600" : "text-gray-600",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <WhatsAppContactButton label="Contact us" size="sm" />
        </div>
      </footer>
    </div>
  );
}
