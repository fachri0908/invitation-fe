import { memo } from "react";
import type { InvitationData } from "../../types";
import { Content, Layer, Section } from "./Section";
import { Monogram, OrnamentDivider, Snowflake, SparkleTrail } from "./Decor";
import { getCoupleDisplay, revealStyle } from "../hooks";

export const HeroSection = memo(function HeroSection({ data }: { data: InvitationData }) {
  const { firstName, secondName, firstInitial, secondInitial } = getCoupleDisplay(data);
  const firstEvent = data.events[0];
  return (
    <Section id="hero">
      <Layer depth={1.4} className="opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fff_0%,transparent_45%),radial-gradient(circle_at_80%_70%,#A6F0E6_0%,transparent_55%)]" />
      </Layer>
      <Layer depth={0.9}>
        <Snowflake left="12%" delay={0} size={6} />
        <Snowflake left="28%" delay={1.4} size={4} />
        <Snowflake left="58%" delay={0.6} size={5} />
        <Snowflake left="78%" delay={2.1} size={7} />
        <Snowflake left="90%" delay={1.1} size={3} />
      </Layer>
      <SparkleTrail />
      <Content>
        <div className="ff-reveal-zoom" style={revealStyle(80)}>
          <Monogram size={130} animated firstInitial={firstInitial} secondInitial={secondInitial} />
        </div>
        <p className="ff-reveal-blur ff-font-body mt-6 text-xs uppercase tracking-[0.5em]" style={{ ...revealStyle(260), color: "var(--ff-700)" }}>
          {data.headline ?? "Pernikahan"}
        </p>
        <h1 className="ff-reveal-blur ff-shimmer-text ff-font-script mt-4 flex flex-col text-7xl leading-none drop-shadow-sm" style={revealStyle(420)}>
          {firstName}
          <span className="ff-font-display mx-2 italic">&</span>
          {secondName}
        </h1>
        <div className="ff-reveal-scale mt-6" style={revealStyle(620)}>
          <OrnamentDivider width={220} />
        </div>
        {firstEvent && (
          <>
            <p className="ff-reveal-up ff-font-display mt-4 text-lg tracking-wide" style={{ ...revealStyle(780), color: "var(--ff-800)" }}>
              {new Date(firstEvent.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <p className="ff-reveal-up mt-1 text-[11px] uppercase tracking-[0.3em]" style={{ ...revealStyle(900), color: "var(--ff-700)" }}>
              {firstEvent.venueName}
            </p>
          </>
        )}
      </Content>
    </Section>
  );
});
