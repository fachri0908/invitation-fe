import { memo } from "react";
import type { EventEntry, InvitationData } from "../../types";
import { florals } from "../assets";
import { CardFlora, SectionLabel } from "./Decor";
import { Content, Layer, Section } from "./Section";
import { revealStyle, useCountdown } from "../hooks";

const CARD_FLORALS = [florals.blue1, florals.blue3, florals.blue2];

function Countdown({ target }: { target: Date }) {
  const { days, hours, mins, secs, over } = useCountdown(target);
  if (over) {
    return <p className="ff-font-display text-lg italic" style={{ color: "var(--ff-800)" }}>Hari yang dinanti telah tiba.</p>;
  }
  const units: Array<[string, number]> = [
    ["Hari", days],
    ["Jam", hours],
    ["Menit", mins],
    ["Detik", secs],
  ];
  return (
    <div className="grid w-full grid-cols-4 gap-2">
      {units.map(([label, val]) => (
        <div key={label} className="ff-glass-card flex flex-col items-center rounded-2xl p-2">
          <div className="ff-font-display text-2xl tabular-nums" style={{ color: "var(--ff-800)" }}>
            {String(val).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[9px] uppercase tracking-[0.3em]" style={{ color: "var(--ff-700)" }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function EventCard({ event, flora }: { event: EventEntry; flora: string }) {
  const href =
    event.venueMapUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venueAddress ?? event.venueName)}`;
  const dateLabel = new Date(event.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="ff-glass-card relative w-full overflow-hidden rounded-3xl p-3">
      <CardFlora src={flora} size={88} op={0.2} className="mr-3 mt-3 -right-5 -top-5 rotate-180" />
      <div className="ff-font-display relative text-2xl" style={{ color: "var(--ff-800)" }}>
        {event.label}
      </div>
      <div className="relative flex flex-col items-center justify-between text-sm" style={{ color: "var(--ff-700)" }}>
        <span className="ff-font-display italic">
          {dateLabel}, {event.time}
          {event.endTime ? ` – ${event.endTime}` : ""}
        </span>
        <span className="text-[11px] uppercase tracking-[0.3em]">{event.venueName}</span>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="ff-shadow-ice relative mt-3 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.3em] text-white transition-all active:scale-95"
        style={{ backgroundColor: "var(--ff-700)" }}
      >
        📍 Buka Peta
      </a>
    </div>
  );
}

export const EventSection = memo(function EventSection({ data }: { data: InvitationData }) {
  const firstEvent = data.events[0];
  return (
    <Section id="event">
      <Layer depth={1.3} className="opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#fff_0%,transparent_60%)]" />
      </Layer>
      <Content className="gap-4">
        <div className="ff-reveal-swing" style={revealStyle(80)}>
          <SectionLabel numeral="II" title="Simpan Tanggal" />
        </div>
        {firstEvent && (
          <div className="ff-reveal-flip w-full" style={revealStyle(240)}>
            <Countdown target={new Date(firstEvent.date)} />
          </div>
        )}
        {data.events.map((event, i) => (
          <div key={i} className={i % 2 === 0 ? "ff-reveal-left w-full" : "ff-reveal-right w-full"} style={revealStyle(480 + i * 160)}>
            <EventCard event={event} flora={CARD_FLORALS[i % CARD_FLORALS.length]} />
          </div>
        ))}
      </Content>
    </Section>
  );
});
