import { memo } from "react";
import type { InvitationData, PersonEntry } from "../../types";
import { florals } from "../assets";
import { CardFlora, SectionLabel } from "./Decor";
import { Content, Layer, Section } from "./Section";
import { getCoupleDisplay, revealStyle } from "../hooks";

function parentsLine(people: PersonEntry[] | undefined, side: "Bride" | "Groom", noun: "Putri" | "Putra"): string | null {
  if (!people?.length) return null;
  const father = people.find((p) => new RegExp(`father.*${side}`, "i").test(p.role));
  const mother = people.find((p) => new RegExp(`mother.*${side}`, "i").test(p.role));
  const names = [father?.name, mother?.name].filter(Boolean);
  return names.length ? `${noun} dari ${names.join(" & ")}` : null;
}

function PersonCard({
  name,
  role,
  parents,
  flora,
  floraRotate,
  floraClassName = "",
}: {
  name: string;
  role: string;
  parents: string | null;
  flora: string;
  floraRotate?: number;
  floraClassName?: string;
}) {
  return (
    <div className="ff-glass-card relative w-full overflow-hidden rounded-3xl px-6 py-6">
      <CardFlora src={flora} size={96} op={0.2} rotate={floraRotate} className={`-right-5 -top-5 ${floraClassName}`} />
      <p className="relative text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--ff-700)" }}>
        {role}
      </p>
      <h2 className="ff-font-display relative mt-2 text-2xl" style={{ color: "var(--ff-800)" }}>
        {name}
      </h2>
      {parents && (
        <p className="relative mt-2 text-sm italic" style={{ color: "var(--ff-700)" }}>
          {parents}
        </p>
      )}
    </div>
  );
}

export const CoupleSection = memo(function CoupleSection({ data }: { data: InvitationData }) {
  const { firstName, secondName } = getCoupleDisplay(data);
  const brideCard = {
    name: data.brideName ?? firstName,
    role: "Mempelai Wanita",
    parents: parentsLine(data.people, "Bride", "Putri"),
    flora: florals.green1,
    floraClassName: "rotate-[210deg]",
  };
  const groomCard = {
    name: data.groomName ?? secondName,
    role: "Mempelai Pria",
    parents: parentsLine(data.people, "Groom", "Putra"),
    flora: florals.green3,
  };
  return (
    <Section id="couple">
      <Layer depth={1.2} className="opacity-40">
        <div className="h-72 w-72 rounded-full bg-white/60 blur-3xl" />
      </Layer>
      <Content className="gap-5">
        <div className="ff-reveal-down" style={revealStyle(80)}>
          <SectionLabel numeral="I" title="Mempelai" />
        </div>
        {data.openingMessage && (
          <p className="ff-reveal-blur max-w-xs text-[13px] italic leading-relaxed" style={{ ...revealStyle(200), color: "var(--ff-700)" }}>
            &ldquo;{data.openingMessage}&rdquo;
          </p>
        )}

        <div className="ff-reveal-tilt-l w-full" style={revealStyle(260)}>
          <PersonCard {...brideCard} />
        </div>

        <div className="ff-reveal-zoom" style={revealStyle(520)}>
          <span className="ff-font-script text-5xl drop-shadow" style={{ color: "var(--ff-600)" }}>
            &amp;
          </span>
        </div>

        <div className="ff-reveal-tilt-r w-full" style={revealStyle(720)}>
          <PersonCard {...groomCard} />
        </div>
      </Content>
    </Section>
  );
});
