import { memo, useState, type CSSProperties } from "react";
import { florals } from "../assets";
import { Monogram, OrnamentDivider, Snowflake } from "./Decor";
import { getRecipientName } from "../hooks";

type GateBloom = {
  src: string;
  style: CSSProperties;
  size: number;
  op: number;
  flip?: string;
  anim: string;
  delay: number;
  tx: string;
  ty: string;
  rot: string;
};

const GATE_BLOOMS: GateBloom[] = [
  { src: florals.colorful2, style: { top: "-3%", right: "-4%" }, size: 240, op: 0.92, anim: "ff-animate-swayslow", delay: 120, tx: "-42vw", ty: "40vh", rot: "16deg" },
  { src: florals.blue3, style: { bottom: "-4%", left: "-5%" }, size: 300, op: 0.85, flip: "scaleX(-1)", anim: "ff-animate-sway", delay: 240, tx: "44vw", ty: "-40vh", rot: "-14deg" },
  { src: florals.blue1, style: { top: "38%", left: "-7%" }, size: 150, op: 0.45, anim: "ff-animate-float", delay: 600, tx: "46vw", ty: "8vh", rot: "-18deg" },
  { src: florals.green2, style: { top: "34%", right: "-7%" }, size: 150, op: 0.42, flip: "scaleX(-1)", anim: "ff-animate-float", delay: 720, tx: "-46vw", ty: "10vh", rot: "20deg" },
];

const GateFlora = memo(function GateFlora({ converging }: { converging: boolean }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${converging ? "z-60" : "z-0"}`}>
      {GATE_BLOOMS.map((b, i) => (
        <div
          key={i}
          className={`absolute ${converging ? "ff-animate-gatePart" : "ff-animate-gateBloomIn"}`}
          style={
            {
              ...b.style,
              animationDelay: converging ? `${i * 110}ms` : `${b.delay}ms`,
              willChange: "transform, opacity",
              "--tx": b.tx,
              "--ty": b.ty,
              "--rot": b.rot,
            } as CSSProperties
          }
        >
          <div className={converging ? "" : b.anim} style={{ transform: b.flip }}>
            <img
              src={b.src}
              alt=""
              loading="eager"
              decoding="async"
              className="select-none object-contain drop-shadow-[0_8px_18px_rgba(6,42,59,0.18)]"
              style={{ width: b.size, height: b.size, opacity: b.op }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});

export function OpeningGate({
  onOpen,
  firstName,
  secondName,
  firstInitial,
  secondInitial,
  dateShort,
  address,
}: {
  onOpen: () => void;
  firstName: string;
  secondName: string;
  firstInitial: string;
  secondInitial: string;
  dateShort?: string;
  address?: string;
}) {
  const [state, setState] = useState<"idle" | "opening" | "closed">("idle");
  const [converging, setConverging] = useState(false);
  const recipient = getRecipientName() ?? "Tamu Undangan";
  if (state === "closed") return null;
  const opening = state !== "idle";
  const start = () => {
    if (state !== "idle") return;
    setState("opening");
    window.setTimeout(() => setConverging(true), 2300);
    window.setTimeout(onOpen, 3700);
    window.setTimeout(() => setState("closed"), 4600);
  };
  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden ${opening ? "pointer-events-none ff-animate-envFade" : ""}`}
      style={{
        backgroundImage: "linear-gradient(180deg,#F2F7F6 0%,#A6F0E6 50%,#1BB7A6 100%)",
        ...(opening ? { animationDelay: "3700ms" } : {}),
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <Snowflake left="12%" size={4} delay={0} />
        <Snowflake left="32%" size={6} delay={1.2} />
        <Snowflake left="54%" size={5} delay={0.7} />
        <Snowflake left="76%" size={4} delay={1.9} />
        <Snowflake left="90%" size={6} delay={0.3} />
      </div>

      <GateFlora converging={converging} />

      <p className="ff-font-body px-10 text-center text-[10px] uppercase tracking-[0.5em]" style={{ color: "var(--ff-800)" }}>
        Atas berkat rahmat Tuhan Yang Maha Kuasa
      </p>

      {/* ───── envelope ───── */}
      <div className="relative mt-5" style={{ width: 300, height: 200, perspective: "1100px" }}>
        <div className="absolute inset-0 rounded-lg ff-shadow-ice" style={{ background: "linear-gradient(160deg, #0C6E54 0%, #0A5A56 100%)" }} />

        <div
          className={opening ? "ff-animate-letterRise" : ""}
          style={{
            position: "absolute",
            left: 18,
            right: 18,
            top: 16,
            bottom: 10,
            overflow: "hidden",
            zIndex: 2,
            animationDelay: opening ? "900ms" : undefined,
            borderRadius: 12,
            padding: "16px 16px",
            background: "linear-gradient(155deg, #FFFFFF 0%, #F2F7F6 60%, #E3F3F0 100%)",
            boxShadow: "0 14px 30px -12px rgba(6,42,59,0.5)",
          }}
        >
          <div className="flex flex-col items-center text-center">
            <Monogram size={62} firstInitial={firstInitial} secondInitial={secondInitial} />
            <p className="ff-font-script mt-2 text-3xl leading-none" style={{ color: "var(--ff-800)" }}>
              {firstName} &amp; {secondName}
            </p>
            <div className="mt-1">
              <OrnamentDivider width={150} />
            </div>
            {dateShort && (
              <p className="ff-font-display mt-1 text-[11px] tracking-[0.35em]" style={{ color: "var(--ff-700)" }}>
                {dateShort}
              </p>
            )}
            {address && <p className="text-[9px] tracking-[0.3em]" style={{ color: "var(--ff-700)", opacity: 0.8 }}>{address}</p>}
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 rounded-b-lg"
          style={{
            top: "46%",
            zIndex: 3,
            background: "linear-gradient(160deg, #0F8A63 0%, #0B7A75 100%)",
            clipPath: "polygon(0 38%, 50% 100%, 100% 38%, 100% 100%, 0 100%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-lg"
          style={{ zIndex: 1, background: "linear-gradient(160deg, #0C6E54 0%, #0A5A56 100%)", clipPath: "polygon(0 0, 0 100%, 50% 56%, 100% 100%, 100% 0)" }}
        />

        <div
          className={opening ? "ff-animate-flapOpen" : ""}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "56%",
            zIndex: 4,
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            background: "linear-gradient(165deg, #129E8F 0%, #0F8A63 100%)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div
            className="absolute left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full"
            style={{
              top: "34%",
              background: "radial-gradient(circle at 35% 30%, #A6F0E6 0%, #1BB7A6 55%, #0B7A75 100%)",
              boxShadow: "0 2px 6px rgba(6,42,59,0.4)",
            }}
          >
            <span className="ff-font-script text-sm" style={{ color: "var(--ff-900)" }}>
              {firstInitial}
              {secondInitial}
            </span>
          </div>
        </div>
      </div>

      {/* ───── recipient ───── */}
      <div className="mt-9 flex flex-col items-center px-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.45em]" style={{ color: "var(--ff-700)" }}>
          Kepada Yth.
        </p>
        <p className="ff-font-script mt-2 text-2xl leading-tight" style={{ color: "var(--ff-900)" }}>
          {recipient}
        </p>
        <p className="mt-2 text-base leading-tight" style={{ color: "var(--ff-900)" }}>
          Di Tempat
        </p>
      </div>

      <button
        onClick={start}
        disabled={opening}
        className="group relative mt-7 overflow-hidden rounded-full px-10 py-3.5 font-body text-xs uppercase tracking-[0.4em] text-white ff-shadow-ice transition-all active:scale-95 disabled:opacity-0"
        style={{ backgroundColor: "var(--ff-800)" }}
      >
        <span className="relative z-10">Buka Undangan</span>
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      </button>
    </div>
  );
}
