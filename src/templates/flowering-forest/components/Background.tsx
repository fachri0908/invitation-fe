import { memo, useMemo } from "react";
import { florals } from "../assets";
import { Flower, FloretGradients, Leaf } from "./Decor";
import { LITE } from "../hooks";

// Bottom-anchored grove built from floral image assets, swaying gently.
function AmbientForest() {
  const near = [
    { src: florals.green3, left: "0%", size: 140, op: 0.5 },
    { src: florals.green2, right: "0%", size: 140, op: 0.5 },
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-15 h-[55vh]"
      style={{ transform: "translate3d(0, calc(var(--ff-scroll, 0) * -6vh), 0)", willChange: "transform" }}
    >
      {near.map((g, i) => (
        <img
          key={i}
          src={g.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="ff-animate-swayslow absolute -bottom-4 select-none object-contain"
          style={{
            left: g.left,
            right: g.right,
            width: g.size,
            opacity: g.op,
            transform: "translateX(-50%)",
            transformOrigin: "bottom center",
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

// One cohesive blue family, parked at the top + side edges.
function AmbientFlora() {
  const all = [
    { src: florals.blue1, style: { top: "5%", left: "-4%" }, size: 150, op: 0.18, anim: "ff-animate-swayslow" },
    { src: florals.blue2, style: { top: "11%", right: "-4%" }, size: 158, op: 0.16, anim: "ff-animate-sway" },
    { src: florals.blue3, style: { top: "46%", left: "-5%" }, size: 150, op: 0.14, anim: "ff-animate-sway" },
    { src: florals.blue1, style: { top: "40%", right: "-5%" }, size: 146, op: 0.14, anim: "ff-animate-swayslow" },
  ];
  const items = LITE ? all.slice(0, 2) : all;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-12 overflow-hidden"
      style={{ transform: "translate3d(0, calc(var(--ff-scroll, 0) * -4vh), 0)", willChange: "transform" }}
    >
      {items.map((f, i) => (
        <img
          key={i}
          src={f.src}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute select-none object-contain ${f.anim}`}
          style={{ ...f.style, width: f.size, opacity: f.op, animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </div>
  );
}

function AmbientPetals() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Flower left="8%" delay={0} duration={20} size={22} petal="#1BB7A6" core="#A6F0E6" />
      <Flower left="38%" delay={3} duration={22} size={26} petal="#5FDDCB" core="#A6F0E6" />
      <Flower left="70%" delay={1.5} duration={21} size={24} petal="#1BB7A6" core="#FFFFFF" />
      <Leaf left="14%" delay={2} duration={26} size={20} rotate={20} />
      <Leaf left="78%" delay={4} duration={28} size={24} rotate={35} />
      {!LITE && (
        <>
          <Flower left="22%" delay={6} duration={24} size={18} petal="#5FDDCB" core="#FFFFFF" />
          <Flower left="55%" delay={9} duration={26} size={20} petal="#1BB7A6" core="#A6F0E6" />
          <Leaf left="48%" delay={7} duration={24} size={22} rotate={-15} />
        </>
      )}
    </div>
  );
}

function AuroraGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
      <div
        className={`ff-animate-aurora absolute left-[15%] top-[10%] h-[45vh] w-[45vh] rounded-full opacity-40 ${LITE ? "blur-2xl" : "blur-3xl"}`}
        style={{ backgroundColor: "#1BB7A6" }}
      />
      <div
        className={`ff-animate-aurora absolute right-[8%] top-[36%] h-[55vh] w-[55vh] rounded-full opacity-35 ${LITE ? "blur-2xl" : "blur-3xl"}`}
        style={{ backgroundColor: "#A6F0E6", animationDelay: "-9s" }}
      />
      {!LITE && (
        <div
          className="ff-animate-aurora absolute bottom-[8%] left-[26%] h-[42vh] w-[42vh] rounded-full opacity-35 blur-3xl"
          style={{ backgroundColor: "#A6F0E6", animationDelay: "-15s" }}
        />
      )}
    </div>
  );
}

function BokehLights() {
  const orbs = useMemo(
    () => [
      { x: "10%", y: "20%", s: 60, d: 0, dur: 9 },
      { x: "80%", y: "30%", s: 40, d: 2, dur: 11 },
      { x: "25%", y: "70%", s: 50, d: 4, dur: 12 },
      { x: "70%", y: "80%", s: 80, d: 1, dur: 10 },
      { x: "50%", y: "15%", s: 30, d: 3, dur: 13 },
      { x: "90%", y: "60%", s: 35, d: 5, dur: 14 },
    ],
    []
  );
  if (LITE) return null; // bokeh blur is a paint hog on phones
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {orbs.map((o, i) => (
        <div
          key={i}
          className="ff-animate-bokeh absolute rounded-full bg-white/60 blur-2xl"
          style={{ left: o.x, top: o.y, width: o.s, height: o.s, animationDelay: `-${o.d}s`, animationDuration: `${o.dur}s` }}
        />
      ))}
    </div>
  );
}

export const ContinuousBackground = memo(function ContinuousBackground() {
  return (
    <>
      <FloretGradients />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-40"
        style={{
          backgroundImage:
            "linear-gradient(180deg,#F2F7F6 0%,#E3F3F0 18%,#A6F0E6 36%,#5FDDCB 55%,#1BB7A6 72%,#5FDDCB 88%,#E3F3F0 100%)",
        }}
      />
      <AuroraGlow />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-25"
        style={{
          background: "radial-gradient(ellipse at 50% calc(50% - var(--ff-scroll, 0) * 60vh), rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)",
          transform: "translate3d(0, calc(var(--ff-scroll, 0) * -8vh), 0)",
          willChange: "transform",
        }}
      />
      <BokehLights />
      <AmbientForest />
      <AmbientFlora />
      <AmbientPetals />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-5"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(6,42,59,0.22) 100%)" }}
      />
    </>
  );
});
