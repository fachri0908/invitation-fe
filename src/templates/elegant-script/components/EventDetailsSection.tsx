import type { EventEntry } from "../../types";
import { OrnamentDivider, SectionTitle } from "./OrnamentDivider";
import { CountdownTimer } from "./CountdownTimer";

interface EventDetailsSectionProps {
  events: EventEntry[];
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function EventDetailsSection({ events }: EventDetailsSectionProps) {
  if (!events.length) return null;

  // Use the first event date for the shared countdown
  const countdownTarget = events[0].date;

  return (
    <section className="bg-rose-50 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-lg">
        <SectionTitle className="mb-3">Save the Date</SectionTitle>
        <OrnamentDivider className="mb-10" />

        {/* Countdown */}
        <CountdownTimer targetDate={countdownTarget} className="mb-12" />

        {/* Event cards */}
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.label}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              {/* Card header */}
              <div className="bg-rose-400 px-6 py-3 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-white">
                  {event.label}
                </p>
              </div>

              {/* Card body */}
              <div className="px-6 py-5 text-center">
                <p className="font-['Playfair_Display',Georgia,serif] text-lg font-semibold text-stone-800">
                  {formatDate(event.date)}
                </p>
                <p className="mt-1 text-sm text-rose-500">
                  {event.time}{event.endTime ? ` — ${event.endTime}` : ""}
                </p>

                <div className="my-4 h-px bg-stone-100" />

                <p className="font-medium text-stone-800">{event.venueName}</p>
                {event.venueAddress && (
                  <p className="mt-1 text-sm text-stone-500">{event.venueAddress}</p>
                )}

                {event.venueMapUrl && (
                  <a
                    href={event.venueMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-rose-300 px-4 py-1.5 text-xs font-medium text-rose-500 transition-colors hover:bg-rose-50"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Open in Maps
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
