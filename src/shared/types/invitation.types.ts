import type { BaseEntity } from "./api.types";

export type EventStatus = "draft" | "published" | "archived";

export interface EventTemplate extends BaseEntity {
  name: string;
  description: string;
  thumbnailUrl: string | null;
  category: string;
  isPublic: boolean;
}

export interface Invitation extends BaseEntity {
  ownerId: string;
  templateId: string;
  slug: string;
  title: string;
  eventDate: string;
  eventLocation: string;
  content: Record<string, unknown>;
  status: EventStatus;
  viewCount: number;
}
