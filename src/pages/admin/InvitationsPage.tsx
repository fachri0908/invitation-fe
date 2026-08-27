import { Link } from "react-router-dom";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ROUTE_PATHS, buildRoutePath } from "@/shared/constants/routes";
import { useAllInvitations } from "@/features/invitation/hooks/useInvitations";
import type { EventStatus } from "@/features/invitation/api/invitation.types";

// ─── helpers ──────────────────────────────────────────────────────────────────

function statusBadgeVariant(status: EventStatus) {
  return status === "published" ? "success"
    : status === "draft" ? "warning"
    : "default" as const;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function InvitationTableSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <tr key={i} className="border-b border-gray-100">
          {Array.from({ length: 6 }).map((__, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-4 animate-pulse rounded bg-gray-100" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function AdminInvitationsPage() {
  const { data: invitations, isLoading, error } = useAllInvitations();

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invitations</h1>
          <p className="mt-1 text-sm text-gray-500">
            {invitations ? `${invitations.length} total` : "Manage all your event invitations."}
          </p>
        </div>
        <Link to={ROUTE_PATHS.admin.invitationCreate}>
          <Button>+ New invitation</Button>
        </Link>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load invitations. Make sure the backend is running.
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                {["Title", "Template", "Event date", "Location", "Status", "Views", "Actions"].map((col) => (
                  <th key={col} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {isLoading && <InvitationTableSkeleton />}

              {!isLoading && !error && invitations?.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-gray-400">
                    No invitations yet.{" "}
                    <Link to={ROUTE_PATHS.admin.invitationCreate} className="text-indigo-600 hover:underline">
                      Create your first one →
                    </Link>
                  </td>
                </tr>
              )}

              {invitations?.map((inv) => {
                const previewPath = buildRoutePath(ROUTE_PATHS.guest.templatePreview, {
                  id: inv.templateKey ?? "elegant-script",
                });
                const livePath = buildRoutePath(ROUTE_PATHS.invitation.viewer, { slug: inv.slug });

                return (
                  <tr key={inv.id} className="group hover:bg-gray-50 transition-colors">
                    {/* Title */}
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 line-clamp-1">{inv.title}</p>
                      <p className="text-xs text-gray-400">{inv.slug}</p>
                    </td>

                    {/* Template */}
                    <td className="px-4 py-3 text-gray-500">
                      {inv.templateKey ?? "—"}
                    </td>

                    {/* Event date */}
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      {formatDate(inv.eventDate)}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3 text-gray-500">
                      <span className="line-clamp-1">{inv.eventLocation}</span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <Badge variant={statusBadgeVariant(inv.status)}>
                        {inv.status}
                      </Badge>
                    </td>

                    {/* Views */}
                    <td className="px-4 py-3 text-center text-gray-700">
                      {inv.viewCount}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Copy link */}
                        <button
                          onClick={() => navigator.clipboard.writeText(`${window.location.origin}${livePath}`)}
                          title="Copy invitation link"
                          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>

                        {/* Preview template */}
                        <Link
                          to={previewPath}
                          title="Preview template"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-indigo-600"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>

                        {/* Open live page */}
                        <Link
                          to={livePath}
                          title="Open live invitation"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-green-600"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
