import { Link } from "react-router-dom";
import { Button } from "@/components/atoms/Button";
import { ROUTE_PATHS } from "@/shared/constants/routes";

export function AdminInvitationsPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invitations</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all your event invitations.</p>
        </div>
        <Link to={ROUTE_PATHS.admin.invitationCreate}>
          <Button>New invitation</Button>
        </Link>
      </div>

      {/* Table placeholder */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              {["Title", "Event date", "Location", "Status", "Views", ""].map((col) => (
                <th key={col} className="px-4 py-3 text-left font-medium text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                No invitations yet. Create your first one!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
