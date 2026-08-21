import { Link } from "react-router-dom";
import { useAuthStore } from "@/shared/store/authStore";
import { Button } from "@/components/atoms/Button";
import { ROUTE_PATHS } from "@/shared/constants/routes";

export function AdminDashboardPage() {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back{currentUser?.fullName ? `, ${currentUser.fullName}` : ""}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your invitations.
        </p>
      </div>

      {/* Quick actions */}
      <div className="mb-8 flex gap-4">
        <Link to={ROUTE_PATHS.admin.invitationCreate}>
          <Button>Create new invitation</Button>
        </Link>
        <Link to={ROUTE_PATHS.admin.invitations}>
          <Button variant="outline">View all invitations</Button>
        </Link>
      </div>

      {/* Stats placeholder */}
      <div className="grid gap-4 sm:grid-cols-3">
        {["Total invitations", "Published", "Views this month"].map((stat) => (
          <div key={stat} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}
