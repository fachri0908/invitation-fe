import { createContext, memo, useContext, type CSSProperties, type ReactNode } from "react";

export const RevealContext = createContext<Set<string>>(new Set());

export const Section = memo(function Section({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const revealed = useContext(RevealContext);
  return (
    <section
      id={id}
      data-section
      data-revealed={revealed.has(id) ? "true" : "false"}
      className={`relative flex h-[100dvh] w-full items-center justify-center overflow-hidden ff-preserve-3d ${className}`}
      style={{ ["--ff-p" as string]: 0 } as CSSProperties}
    >
      {children}
    </section>
  );
});

export const Layer = memo(function Layer({
  depth = 0,
  className = "",
  children,
}: {
  depth?: number;
  className?: string;
  children: ReactNode;
}) {
  const translateY = depth * 60;
  const translateZ = depth * 40;
  const scale = 1 + Math.abs(depth) * 0.03;
  const style: CSSProperties = {
    transform: `translate3d(0, calc(var(--ff-p, 0) * ${translateY}px), ${translateZ}px) scale(${scale})`,
    willChange: "transform",
  };
  return (
    <div className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`} style={style}>
      {children}
    </div>
  );
});

export function Content({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative z-20 mx-auto flex w-full max-w-md flex-col items-center justify-center px-6 text-center ${className}`}
      style={{ transform: "translate3d(0, calc(var(--ff-p, 0) * -20px), 80px)" }}
    >
      {children}
    </div>
  );
}
