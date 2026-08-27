import { memo, useRef, useState, type CSSProperties } from "react";
import { florals } from "../assets";

// ───── monogram / dividers / labels ───────────────────────────────────────

export function Monogram({
  size = 120,
  animated = false,
  firstInitial,
  secondInitial,
}: {
  size?: number;
  animated?: boolean;
  firstInitial: string;
  secondInitial: string;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {animated && (
        <span className="ff-animate-pulseRing absolute inset-0 rounded-full border" style={{ borderColor: "rgba(10,90,86,0.4)" }} aria-hidden />
      )}
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className={animated ? "ff-animate-spinSlow" : ""}
        aria-hidden
      >
        <defs>
          <linearGradient id="ffMgStroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#1BB7A6" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#0A5A56" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="url(#ffMgStroke)" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="url(#ffMgStroke)" strokeWidth="0.4" strokeDasharray="2 3" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = 60 + Math.cos(a) * 56;
          const y1 = 60 + Math.sin(a) * 56;
          const x2 = 60 + Math.cos(a) * 52;
          const y2 = 60 + Math.sin(a) * 52;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0B7A75" strokeWidth="0.6" opacity="0.7" />;
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="ff-font-display flex items-baseline gap-1" style={{ color: "var(--ff-800)" }}>
          <span className="text-4xl italic">{firstInitial}</span>
          <span className="ff-font-script text-3xl" style={{ color: "var(--ff-600)" }}>
            &amp;
          </span>
          <span className="text-4xl italic">{secondInitial}</span>
        </div>
      </div>
    </div>
  );
}

export function OrnamentDivider({ width = 220 }: { width?: number }) {
  return (
    <svg viewBox="0 0 220 16" width={width} style={{ color: "var(--ff-700)" }} aria-hidden>
      <line x1="2" x2="88" y1="8" y2="8" stroke="currentColor" strokeWidth="0.5" />
      <line x1="132" x2="218" y1="8" y2="8" stroke="currentColor" strokeWidth="0.5" />
      <path d="M88 8 L98 4 M88 8 L98 12" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M132 8 L122 4 M132 8 L122 12" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <circle cx="110" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="110" cy="8" r="1.3" fill="currentColor" />
      <circle cx="98" cy="8" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="122" cy="8" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function SectionLabel({ numeral, title }: { numeral: string; title: string }) {
  return (
    <div className="flex items-center justify-center gap-3" style={{ color: "var(--ff-700)" }}>
      <span className="h-px w-10" style={{ backgroundColor: "rgba(10,90,86,0.4)" }} />
      <span className="ff-font-script text-xl" style={{ color: "var(--ff-600)" }}>
        {numeral}
      </span>
      <span className="ff-font-body text-[10px] uppercase tracking-[0.5em]">{title}</span>
      <span className="h-px w-10" style={{ backgroundColor: "rgba(10,90,86,0.4)" }} />
    </div>
  );
}

export function Snowflake({ delay = 0, left = "50%", size = 8 }: { delay?: number; left?: string; size?: number }) {
  return (
    <span
      className="ff-animate-float absolute top-1/4 block rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
      style={{ left, width: size, height: size, animationDelay: `${delay}s` }}
    />
  );
}

// ───── florets (SVG flowers used for falling petals / bushes / sweeps) ────

const EDGE: Record<string, string> = {
  "#A6F0E6": "#5FDDCB",
  "#5FDDCB": "#1BB7A6",
  "#1BB7A6": "#0B7A75",
  "#129E8F": "#0A5A56",
  "#0B7A75": "#0A5A56",
  "#FFFFFF": "#A6F0E6",
};
const edgeOf = (c: string) => EDGE[c] ?? c;

const PETALS = ["#1BB7A6", "#5FDDCB", "#A6F0E6", "#FFFFFF", "#0B7A75"];
const floretFill = (petal: string) => `url(#ff-flo-${petal.replace("#", "")})`;

/** Mounted once — the shared petal gradients every <Floret> references. */
export function FloretGradients() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        {PETALS.map((petal) => (
          <linearGradient key={petal} id={`ff-flo-${petal.replace("#", "")}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="42%" stopColor={petal} />
            <stop offset="100%" stopColor={edgeOf(petal)} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}

export const Floret = memo(function Floret({
  cx,
  cy,
  r,
  petal,
  core = "#A6F0E6",
  petals = 6,
}: {
  cx: number;
  cy: number;
  r: number;
  petal: string;
  core?: string;
  petals?: number;
}) {
  const L = r;
  const W = r * 0.44;
  const path = `M0 0 C ${-W} ${-L * 0.45} ${-W * 0.55} ${-L} 0 ${-L} C ${W * 0.55} ${-L} ${W} ${-L * 0.45} 0 0 Z`;
  const fill = floretFill(petal);
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {Array.from({ length: petals }).map((_, i) => (
        <path key={i} d={path} fill={fill} transform={`rotate(${(i / petals) * 360})`} opacity="0.96" />
      ))}
      <circle r={r * 0.26} fill={core} />
    </g>
  );
});

export function Flower({
  left,
  top,
  size = 22,
  delay = 0,
  duration = 18,
  petal = "#1BB7A6",
  core = "#A6F0E6",
}: {
  left: string;
  top?: string;
  size?: number;
  delay?: number;
  duration?: number;
  petal?: string;
  core?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ff-animate-fall absolute"
      style={{
        left,
        top: top ?? "-10vh",
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        filter: "drop-shadow(0 2px 4px rgba(6,42,59,0.28))",
      }}
      aria-hidden
    >
      <Floret cx={12} cy={12} r={10} petal={petal} core={core} petals={6} />
    </svg>
  );
}

export function Leaf({
  left,
  top,
  size = 18,
  delay = 0,
  duration = 22,
  rotate = 0,
}: {
  left: string;
  top?: string;
  size?: number;
  delay?: number;
  duration?: number;
  rotate?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ff-animate-fall absolute"
      style={{
        left,
        top: top ?? "-10vh",
        width: size,
        height: size * 0.7,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `rotate(${rotate}deg)`,
      }}
      aria-hidden
    >
      <path d="M2 12 C2 4, 22 4, 22 12 C22 20, 2 20, 2 12 Z" fill="#129E8F" opacity="0.85" />
      <path d="M2 12 L22 12" stroke="#062A3B" strokeWidth="0.6" />
    </svg>
  );
}

// ───── fixed corner ornaments (image florals) ──────────────────────────────

export type Decoration = {
  src: string;
  pos: CSSProperties;
  size: number;
  op?: number;
  flip?: string;
  reveal: string;
  idle?: string;
  delay?: number;
};

export const SectionDecor = memo(function SectionDecor({ items }: { items: Decoration[] }) {
  return (
    <div aria-hidden data-revealed="true" className="pointer-events-none fixed inset-0 z-1 opacity-55">
      {items.map((d, i) => (
        <div key={i} className={`absolute ${d.reveal}`} style={{ ...d.pos, ["--ff-reveal-delay" as string]: `${d.delay ?? 0}ms` }}>
          <div style={{ width: d.size, height: d.size, transform: d.flip }}>
            <div className={d.idle} style={{ width: "100%", height: "100%" }}>
              <img
                src={d.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full select-none object-contain"
                style={{ opacity: d.op ?? 0.85 }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

const CORNER_DECOR: Decoration[] = [
  { src: florals.blue1, pos: { top: 5, left: -8 }, size: 116, flip: "scale(-1,-1)", reveal: "ff-reveal-left", idle: "ff-animate-sway", delay: 200 },
  { src: florals.colorful2, pos: { top: 5, right: 5 }, size: 96, flip: "scale(-1,1)", reveal: "ff-reveal-right", idle: "ff-animate-sway", delay: 360 },
];

export const CornerDecor = memo(function CornerDecor() {
  return <SectionDecor items={CORNER_DECOR} />;
});

/** Small floral accent for inside glass-cards. */
export function CardFlora({
  src,
  size = 72,
  op = 0.22,
  rotate,
  className = "",
}: {
  src: string;
  size?: number;
  op?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 ${className}`}
      style={{ width: size, height: size, ...(rotate != null ? { transform: `rotate(${rotate}deg)` } : {}) }}
    >
      <img src={src} alt="" loading="lazy" decoding="async" className="ff-animate-sway h-full w-full select-none object-contain" style={{ opacity: op }} />
    </div>
  );
}

// ───── interactive sparkle trail ────────────────────────────────────────

type Sparkle = { id: number; x: number; y: number };

export function SparkleTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const lastRef = useRef(0);
  const hostRef = useRef<HTMLDivElement>(null);

  const spawn = (clientX: number, clientY: number) => {
    const host = hostRef.current;
    if (!host) return;
    const now = performance.now();
    if (now - lastRef.current < 45) return;
    lastRef.current = now;
    const rect = host.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const id = idRef.current++;
    setSparkles((prev) => [...prev.slice(-14), { id, x, y }]);
    window.setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 950);
  };

  return (
    <div
      ref={hostRef}
      className="pointer-events-auto absolute inset-0 z-1"
      onPointerMove={(e) => spawn(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) spawn(t.clientX, t.clientY);
      }}
    >
      {sparkles.map((s) => (
        <span key={s.id} className="ff-animate-sparkle pointer-events-none absolute" style={{ left: s.x, top: s.y, width: 10, height: 10 }} aria-hidden>
          <svg viewBox="0 0 20 20" width="10" height="10">
            <path
              d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
              fill="#fff"
              opacity="0.95"
              style={{ filter: "drop-shadow(0 0 4px #5FDDCB)" }}
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
