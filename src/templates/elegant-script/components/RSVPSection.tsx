import type { InvitationData } from "../../types";
import { OrnamentDivider, SectionTitle } from "./OrnamentDivider";

interface RSVPSectionProps {
  data: Pick<InvitationData, "rsvpEnabled" | "rsvpDeadline" | "rsvpWhatsAppNumber" | "title">;
  isPreview?: boolean;
}

export function RSVPSection({ data, isPreview }: RSVPSectionProps) {
  if (!data.rsvpEnabled) return null;

  const deadline = data.rsvpDeadline
    ? new Date(data.rsvpDeadline).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const waMessage = `Halo, saya konfirmasi kehadiran untuk pernikahan ${data.title}.`;
  const waUrl = `https://wa.me/${data.rsvpWhatsAppNumber ?? ""}?text=${encodeURIComponent(waMessage)}`;

  return (
    <section className="bg-stone-50 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-lg text-center">
        <SectionTitle className="mb-3">RSVP</SectionTitle>
        <OrnamentDivider className="mb-8" />

        <p className="text-sm leading-relaxed text-stone-600">
          Kami sangat mengharapkan kehadiran Anda. Mohon konfirmasi kehadiran Anda
          {deadline ? ` sebelum ${deadline}` : ""}.
        </p>

        {isPreview && (
          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-xs text-amber-700">
            Preview mode — RSVP submissions are disabled.
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {data.rsvpWhatsAppNumber && !isPreview && (
            <>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 sm:w-auto"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.533 5.858L.057 23.428a.5.5 0 0 0 .609.61l5.649-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.424l-.37-.22-3.353.878.894-3.265-.242-.38A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Ya, saya hadir
              </a>
              <a
                href={`https://wa.me/${data.rsvpWhatsAppNumber}?text=${encodeURIComponent(`Mohon maaf, saya tidak dapat hadir pada pernikahan ${data.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-100 sm:w-auto"
              >
                Maaf, tidak bisa hadir
              </a>
            </>
          )}

          {(isPreview || !data.rsvpWhatsAppNumber) && (
            <span className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-6 py-3 text-sm font-semibold text-stone-400">
              RSVP via WhatsApp
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
