export const ROUTE_PATHS = {
  guest: {
    home: "/",
    templates: "/templates",
    templateDetail: "/templates/:id",
    templatePreview: "/templates/:id/preview",
  },
  auth: {
    /** Not publicly linked — accessible only by direct URL. */
    login: "/admin/login",
  },
  admin: {
    dashboard: "/admin",
    invitations: "/admin/invitations",
    invitationCreate: "/admin/invitations/new",
    invitationEdit: "/admin/invitations/:id/edit",
    templates: "/admin/templates",
    profile: "/admin/profile",
  },
  invitation: {
    viewer: "/invite/:slug",
  },
} as const;

/** Build a route path with params substituted. */
export function buildRoutePath(
  path: string,
  params: Record<string, string>
): string {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    path
  );
}
