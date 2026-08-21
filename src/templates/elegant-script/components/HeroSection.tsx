import type { InvitationData } from "../../types";

interface HeroSectionProps {
  data: Pick<InvitationData, "headline" | "title" | "subtitle" | "coverImageUrl" | "events">;
}

/** Full-screen hero with parallax-style cover image and couple name overlay. */
export function HeroSection({ data }: HeroSectionProps) {
  const firstEvent = data.events[0];
  const eventDate = firstEvent
    ? new Date(firstEvent.date).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      {data.coverImageUrl ? (
        <img
          src={data.coverImageUrl}
          alt="Wedding cover"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-stone-100" />
      )}

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-white">
        {data.headline && (
          <p className="mb-3 text-sm font-light uppercase tracking-[0.3em] text-rose-200">
            {data.headline}
          </p>
        )}

        <h1 className="font-['Playfair_Display',Georgia,serif] text-5xl font-bold leading-tight drop-shadow-lg sm:text-7xl">
          {data.title}
        </h1>

        {eventDate && (
          <p className="mt-6 text-sm font-light tracking-widest text-white/80 sm:text-base">
            {eventDate}
          </p>
        )}

        {data.subtitle && (
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-white/70">
            {data.subtitle}
          </p>
        )}

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
