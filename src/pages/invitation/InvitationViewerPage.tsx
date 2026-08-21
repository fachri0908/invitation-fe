import { useParams } from "react-router-dom";
import { Spinner } from "@/components/atoms/Spinner";

/**
 * Public invitation viewer.
 * URL: /invite/:slug
 *
 * In production this page will:
 *   1. Fetch invitation data from GET /api/v1/invitations/:slug
 *   2. Look up the template component from the registry by templateId
 *   3. Render the template with the fetched data
 *
 * For now the page stubs the fetch (TODO) but the template rendering pipeline is complete.
 */
export function InvitationViewerPage() {
  const { slug } = useParams<{ slug: string }>();

  // TODO: replace with real React Query fetch once the backend endpoint is implemented
  // const { data, isLoading, error } = useQuery({ queryKey: ["invitation", slug], queryFn: () => fetchInvitationBySlug(slug!) });

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <Spinner size="md" className="mx-auto mb-4" />
        <p className="text-sm text-gray-500">
          Loading invitation <span className="font-mono font-medium text-gray-700">{slug}</span>…
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Backend integration pending — see PROJECT_CONTEXT.md § Pending / Next Steps.
        </p>
      </div>
    </div>
  );
}
