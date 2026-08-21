import type { ReactNode } from "react";

interface DividerProps {
  className?: string;
}

/** Ornamental floral/script divider used between sections. */
export function OrnamentDivider({ className = "" }: DividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-12 bg-rose-300" />
      <svg
        viewBox="0 0 60 24"
        fill="none"
        className="h-5 w-12 text-rose-400"
        aria-hidden="true"
      >
        <path
          d="M30 2 C20 2 10 8 10 12 C10 16 20 22 30 22 C40 22 50 16 50 12 C50 8 40 2 30 2Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="30" cy="12" r="2.5" fill="currentColor" />
        <circle cx="10" cy="12" r="1.5" fill="currentColor" />
        <circle cx="50" cy="12" r="1.5" fill="currentColor" />
        <path d="M4 12 L8 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M52 12 L56 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
      <div className="h-px w-12 bg-rose-300" />
    </div>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ children, subtitle, className = "" }: SectionTitleProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl font-semibold text-stone-800 sm:text-3xl">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-stone-500">{subtitle}</p>
      )}
    </div>
  );
}
