import { Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Spinner } from "@/components/atoms/Spinner";
import { findTemplateById } from "@/templates/registry";
import { elegantScriptFixture } from "@/templates/elegant-script/fixture";
import { floweringForestFixture } from "@/templates/flowering-forest/fixture";
import type { InvitationData } from "@/templates/types";
import { ROUTE_PATHS } from "@/shared/constants/routes";

/**
 * Template preview page.
 * URL: /templates/:id/preview
 *
 * Always renders the template in preview mode using fixture data.
 * No authentication or backend required — works purely from the static registry.
 */
export function TemplatePreviewPage() {
  const { id } = useParams<{ id: string }>();
  const entry = findTemplateById(id ?? "");

  if (!entry) {
    return <Navigate to={ROUTE_PATHS.guest.templates} replace />;
  }

  // Map fixture data per templateId — extend this as new templates are added
  const fixtureMap: Record<string, InvitationData> = {
    "elegant-script": elegantScriptFixture,
    "flowering-forest": floweringForestFixture,
  };

  const data = fixtureMap[entry.id];

  if (!data) {
    return <Navigate to={ROUTE_PATHS.guest.templates} replace />;
  }

  const TemplateComponent = entry.component;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <TemplateComponent data={data} isPreview />
    </Suspense>
  );
}
