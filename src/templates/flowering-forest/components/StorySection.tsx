import { Fragment, memo } from "react";
import { florals } from "../assets";
import { CardFlora, SectionLabel } from "./Decor";
import { Content, Layer, Section } from "./Section";
import { revealStyle } from "../hooks";

function StoryPageCard({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="ff-reveal-up ff-glass-card relative overflow-hidden rounded-2xl p-5 text-left" style={revealStyle(180)}>
      <CardFlora src={florals.green2} size={86} op={0.16} className="-bottom-5 -right-5" />
      <CardFlora src={florals.green3} size={70} op={0.14} className="-left-4 -top-4" />
      <div className="ff-no-scrollbar relative max-h-[68vh] space-y-3 overflow-y-auto pr-1">
        {paragraphs.map((text, i) => (
          <p key={i} className="text-[12px] italic leading-relaxed" style={{ color: "var(--ff-700)" }}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export const StorySections = memo(function StorySections({ pages }: { pages: string[][] }) {
  return (
    <Fragment>
      {pages.map((paragraphs, i) => (
        <Section key={i} id={`story-${i}`}>
          <Layer depth={1.1} className="opacity-50">
            <div className="absolute left-10 top-20 h-32 w-32 rounded-full border border-white/60" />
            <div className="absolute right-12 bottom-24 h-24 w-24 rounded-full border border-white/40" />
          </Layer>
          <Content className="gap-3">
            <div className="ff-reveal-down" style={revealStyle(80)}>
              <SectionLabel numeral="II" title="Kisah Kami" />
            </div>
            <StoryPageCard paragraphs={paragraphs} />
          </Content>
        </Section>
      ))}
    </Fragment>
  );
});
