import { apiClient } from "@/shared/api/apiClient";
import type { ApiSuccessResponse } from "@/shared/types/api.types";
import type { InvitationSummary, InvitationDetail } from "./invitation.types";

/** Admin — fetch all invitations (all statuses). Requires auth token. */
export async function fetchAllInvitations(): Promise<InvitationSummary[]> {
  const response = await apiClient.get<ApiSuccessResponse<InvitationSummary[]>>(
    "/invitations"
  );
  return response.data.data;
}

/** Public — fetch published invitations only. */
export async function fetchPublishedInvitations(): Promise<InvitationSummary[]> {
  const response = await apiClient.get<ApiSuccessResponse<InvitationSummary[]>>(
    "/invitations/public"
  );
  return response.data.data;
}

/** Public — fetch a single invitation by slug (for the live viewer page). */
export async function fetchInvitationBySlug(slug: string): Promise<InvitationDetail> {
  const response = await apiClient.get<ApiSuccessResponse<InvitationDetail>>(
    `/invitations/by-slug/${slug}`
  );
  return response.data.data;
}
