import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string; // ISO date string
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
  const isPast = new Date(targetDate).getTime() <= Date.now();

  useEffect(() => {
    if (isPast) return;
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, isPast]);

  if (isPast) {
    return (
      <p className={`text-center text-sm text-rose-400 ${className}`}>
        The event has taken place ♥
      </p>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className={`flex justify-center gap-4 sm:gap-8 ${className}`}>
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm sm:h-20 sm:w-20">
            <span className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold text-stone-800 sm:text-4xl">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-2 text-xs uppercase tracking-widest text-stone-500">{label}</p>
        </div>
      ))}
    </div>
  );
}
