/**
 * Universal data contract that every invitation template receives as props.
 * All fields are optional so templates can choose what sections to display.
 * The admin fills these fields when creating/editing an invitation.
 */
export interface InvitationData {
  // ─── Core identity ────────────────────────────────────────────────────────
  templateId: string;
  slug: string;

  // ─── Event headline ───────────────────────────────────────────────────────
  /** E.g. "The Wedding of" or "You're invited to" */
  headline?: string;
  /** Primary person / couple name(s) shown as the main title */
  title: string;
  /** Short tagline or subtitle */
  subtitle?: string;

  // ─── People ───────────────────────────────────────────────────────────────
  groomName?: string;
  brideName?: string;
  /** Extra people (parents, best men, bridesmaids, etc.) */
  people?: PersonEntry[];

  // ─── Event schedule ───────────────────────────────────────────────────────
  events: EventEntry[];

  // ─── Venue ────────────────────────────────────────────────────────────────
  venueName?: string;
  venueAddress?: string;
  venueMapUrl?: string;

  // ─── Media ────────────────────────────────────────────────────────────────
  /** Hero / cover image URL */
  coverImageUrl?: string;
  /** Couple / subject photo */
  portraitImageUrl?: string;
  /** Gallery images */
  galleryImages?: GalleryImage[];

  // ─── Message ──────────────────────────────────────────────────────────────
  openingMessage?: string;
  closingMessage?: string;

  // ─── RSVP ─────────────────────────────────────────────────────────────────
  rsvpEnabled?: boolean;
  rsvpDeadline?: string; // ISO date string
  rsvpWhatsAppNumber?: string;

  // ─── Music ────────────────────────────────────────────────────────────────
  backgroundMusicUrl?: string;

  // ─── Template-specific extras ─────────────────────────────────────────────
  /** Free-form bag for template-specific fields that don't fit the schema above */
  extras?: Record<string, unknown>;
}

export interface EventEntry {
  label: string;       // E.g. "Holy Matrimony" | "Reception"
  date: string;        // ISO date string
  time: string;        // E.g. "09:00 WIB"
  endTime?: string;
  venueName: string;
  venueAddress?: string;
  venueMapUrl?: string;
}

export interface PersonEntry {
  role: string;        // E.g. "Father of the Groom"
  name: string;
}

export interface GalleryImage {
  url: string;
  alt?: string;
}

/**
 * Every template component must accept exactly this prop shape.
 */
export interface TemplateProps {
  data: InvitationData;
  /** When true the template is rendered as a live preview (demo mode — no RSVP submissions). */
  isPreview?: boolean;
}
