import { Link } from "react-router-dom";
import type { TemplateRegistryEntry } from "@/templates/registry";
import { Badge } from "@/components/atoms/Badge";
import { WhatsAppContactButton } from "@/components/molecules/WhatsAppContactButton";
import { buildRoutePath, ROUTE_PATHS } from "@/shared/constants/routes";

interface TemplateCardProps {
  template: TemplateRegistryEntry;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const previewPath = buildRoutePath(ROUTE_PATHS.guest.templatePreview, { id: template.id });

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Thumbnail / colour swatch */}
      <div className={`relative aspect-video w-full overflow-hidden ${template.accentColor}`}>
        {template.thumbnailUrl ? (
          <img
            src={template.thumbnailUrl}
            alt={template.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-rose-300">
            <svg className="h-10 w-10 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs font-medium tracking-widest text-rose-400 opacity-80">
              {template.name}
            </span>
          </div>
        )}

        {/* Live preview badge */}
        <Link
          to={previewPath}
          className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
        >
          Preview →
        </Link>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{template.name}</h3>
          <Badge variant="info">{template.category}</Badge>
        </div>
        <p className="mb-4 flex-1 text-sm text-gray-500 line-clamp-2">{template.description}</p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            to={previewPath}
            className="flex-1 rounded-lg border border-indigo-200 px-3 py-2 text-center text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Live preview
          </Link>
          <WhatsAppContactButton
            templateName={template.name}
            label="Order"
            size="sm"
            className="flex-1 justify-center"
          />
        </div>
      </div>
    </div>
  );
}
