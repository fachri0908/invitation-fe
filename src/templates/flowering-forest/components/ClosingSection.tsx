import { memo } from "react";
import type { InvitationData } from "../../types";
import { Monogram, OrnamentDivider, Snowflake } from "./Decor";
import { Content, Layer, Section } from "./Section";
import { getCoupleDisplay, revealStyle } from "../hooks";

export const ClosingSection = memo(function ClosingSection({ data, onRestart }: { data: InvitationData; onRestart: () => void }) {
  const { firstName, secondName, firstInitial, secondInitial } = getCoupleDisplay(data);
  return (
    <Section id="closing">
      <Layer depth={1.3} className="opacity-50">
        <Snowflake left="20%" delay={0.2} size={5} />
        <Snowflake left="45%" delay={1.6} size={4} />
        <Snowflake left="70%" delay={0.9} size={6} />
      </Layer>
      <Content className="gap-4">
        <div className="ff-reveal-rotate" style={revealStyle(80)}>
          <Monogram size={100} firstInitial={firstInitial} secondInitial={secondInitial} />
        </div>
        <p className="ff-reveal-blur ff-font-body text-[10px] uppercase tracking-[0.5em]" style={{ ...revealStyle(320), color: "var(--ff-700)" }}>
          Penuh Syukur & Sukacita
        </p>
        <h3 className="ff-reveal-zoomout ff-shimmer-text ff-font-script overflow-visible px-6 py-2 text-6xl leading-[1.35]" style={revealStyle(480)}>
          Terima Kasih
        </h3>
        <div className="ff-reveal-scale" style={revealStyle(680)}>
          <OrnamentDivider width={180} />
        </div>
        {data.closingMessage && (
          <p className="ff-reveal-up max-w-xs text-sm italic" style={{ ...revealStyle(820), color: "var(--ff-700)" }}>
            {data.closingMessage}
          </p>
        )}
        <p className="ff-reveal-up ff-font-display mt-1 text-lg italic" style={{ ...revealStyle(960), color: "var(--ff-800)" }}>
          — {firstName} & {secondName}
        </p>
        <button
          onClick={onRestart}
          className="ff-reveal-zoom mt-4 rounded-full border bg-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.4em] backdrop-blur-md transition-all hover:bg-white/40"
          style={{ ...revealStyle(1120), borderColor: "rgba(10,90,86,0.4)", color: "var(--ff-700)" }}
        >
          ↑ Kembali ke Atas
        </button>
      </Content>
    </Section>
  );
});
