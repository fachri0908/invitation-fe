import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/constants/routes";
import { APP_NAME } from "@/shared/constants/app";
import { useAuthStore } from "@/shared/store/authStore";
import { Button } from "@/components/atoms/Button";

const sidebarLinks = [
  {
    label: "Dashboard",
    path: ROUTE_PATHS.admin.dashboard,
    icon: "⊞",
  },
  {
    label: "Invitations",
    path: ROUTE_PATHS.admin.invitations,
    icon: "✉",
  },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, clearCredentials } = useAuthStore();

  const handleLogout = () => {
    clearCredentials();
    navigate(ROUTE_PATHS.auth.login);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <Link to={ROUTE_PATHS.admin.dashboard} className="text-lg font-bold text-indigo-600">
            {APP_NAME}
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map(({ label, path, icon }) => (
            <Link
              key={path}
              to={path}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === path
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")}
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {currentUser?.fullName ?? currentUser?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
