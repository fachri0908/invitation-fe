import { memo } from "react";
import type { InvitationData } from "../../types";
import { SectionLabel } from "./Decor";
import { Content, Layer, Section } from "./Section";
import { revealStyle } from "../hooks";

export const RSVPSection = memo(function RSVPSection({
  data,
  isPreview,
}: {
  data: Pick<InvitationData, "rsvpEnabled" | "rsvpDeadline" | "rsvpWhatsAppNumber" | "title">;
  isPreview?: boolean;
}) {
  if (!data.rsvpEnabled) return null;

  const deadline = data.rsvpDeadline
    ? new Date(data.rsvpDeadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const yesUrl = `https://wa.me/${data.rsvpWhatsAppNumber ?? ""}?text=${encodeURIComponent(
    `Halo, saya konfirmasi kehadiran untuk pernikahan ${data.title}.`
  )}`;
  const noUrl = `https://wa.me/${data.rsvpWhatsAppNumber ?? ""}?text=${encodeURIComponent(
    `Mohon maaf, saya tidak dapat hadir pada pernikahan ${data.title}.`
  )}`;

  return (
    <Section id="rsvp">
      <Layer depth={1.2} className="opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#fff_0%,transparent_50%)]" />
      </Layer>
      <Content className="gap-4">
        <div className="ff-reveal-down" style={revealStyle(80)}>
          <SectionLabel numeral="IV" title="RSVP" />
        </div>
        <h3 className="ff-reveal-zoomout ff-shimmer-text ff-font-display text-3xl italic" style={revealStyle(280)}>
          Mohon doa & kehadiran Anda
        </h3>
        <p className="ff-reveal-blur text-sm leading-relaxed" style={{ ...revealStyle(380), color: "var(--ff-700)" }}>
          Kami sangat mengharapkan kehadiran Anda{deadline ? ` sebelum ${deadline}` : ""}.
        </p>

        {isPreview && (
          <p className="ff-reveal-up rounded-lg px-4 py-2 text-xs" style={{ ...revealStyle(480), backgroundColor: "rgba(166,240,230,0.35)", color: "var(--ff-700)" }}>
            Preview mode — RSVP submissions are disabled.
          </p>
        )}

        <div className="mt-2 flex w-full flex-col items-center gap-3">
          {data.rsvpWhatsAppNumber && !isPreview ? (
            <>
              <a
                href={yesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ff-reveal-left ff-shadow-ice inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                style={revealStyle(560)}
              >
                Ya, saya hadir
              </a>
              <a
                href={noUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ff-reveal-right ff-glass-card inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                style={{ ...revealStyle(700), color: "var(--ff-800)" }}
              >
                Mohon maaf, tidak bisa hadir
              </a>
            </>
          ) : (
            <span className="ff-reveal-up ff-glass-card inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold" style={{ ...revealStyle(560), color: "var(--ff-700)", opacity: 0.6 }}>
              RSVP via WhatsApp
            </span>
          )}
        </div>
      </Content>
    </Section>
  );
});
