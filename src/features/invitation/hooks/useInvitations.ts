import { useQuery } from "@tanstack/react-query";
import { fetchAllInvitations, fetchPublishedInvitations } from "../api/invitationApi";

/** Admin hook — all invitations. Requires auth token in store. */
export function useAllInvitations() {
  return useQuery({
    queryKey: ["invitations", "all"],
    queryFn: fetchAllInvitations,
  });
}

/** Public hook — published invitations only. */
export function usePublishedInvitations() {
  return useQuery({
    queryKey: ["invitations", "published"],
    queryFn: fetchPublishedInvitations,
  });
}
