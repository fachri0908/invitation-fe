import type { BaseEntity } from "@/shared/types/api.types";

export type EventStatus = "draft" | "published" | "archived";

/** Lightweight summary — used in list views. */
export interface InvitationSummary {
  id: string;
  slug: string;
  title: string;
  eventDate: string;        // ISO string from JSON
  eventLocation: string;
  status: EventStatus;
  viewCount: number;
  templateKey: string | null;
  createdAt: string;
}

/** Full invitation — used in the live viewer and admin detail view. */
export interface InvitationDetail extends BaseEntity {
  ownerId: string;
  templateId: string;
  templateKey: string | null;
  slug: string;
  title: string;
  eventDate: string;
  eventLocation: string;
  content: Record<string, unknown>;
  status: EventStatus;
  viewCount: number;
}
