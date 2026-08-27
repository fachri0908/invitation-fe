import { type CSSProperties, type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { InvitationData } from "../types";

const SCROLL_DURATION_MS = 1400;

/** Coarse-pointer / small screens get a lighter background (fewer flowers,
 * blurs and trees) so scrolling stays smooth on phones. */
export const LITE =
  typeof window !== "undefined" &&
  ((typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches) ||
    window.innerWidth <= 820);

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function useSmoothSnapScroll(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  onChange?: (dir: 1 | -1, to: number) => void
) {
  const goRef = useRef<(i: number) => void>(() => {});
  const cbRef = useRef(onChange);
  useLayoutEffect(() => {
    cbRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let raf = 0;
    let animating = false;

    const getSections = () => Array.from(el.querySelectorAll<HTMLElement>("[data-section]"));

    const currentIndex = () => {
      const secs = getSections();
      const center = el.scrollTop + el.clientHeight / 2;
      let best = 0;
      let bd = Infinity;
      secs.forEach((s, i) => {
        const c = s.offsetTop + s.clientHeight / 2;
        const d = Math.abs(c - center);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    };

    const tweenTo = (target: number, duration = SCROLL_DURATION_MS) => {
      cancelAnimationFrame(raf);
      const start = el.scrollTop;
      const change = target - start;
      if (Math.abs(change) < 0.5) return;
      const t0 = performance.now();
      animating = true;
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        el.scrollTop = start + change * easeInOutCubic(t);
        if (t < 1) raf = requestAnimationFrame(tick);
        else animating = false;
      };
      raf = requestAnimationFrame(tick);
    };

    const goToIndex = (i: number) => {
      const secs = getSections();
      const clamped = Math.max(0, Math.min(secs.length - 1, i));
      const from = currentIndex();
      if (clamped !== from) {
        cbRef.current?.(clamped > from ? 1 : -1, clamped);
      }
      tweenTo(secs[clamped].offsetTop);
    };

    goRef.current = goToIndex;

    const advance = (dir: 1 | -1) => {
      if (animating) return;
      goToIndex(currentIndex() + dir);
    };

    let wheelLock = false;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLock || animating || Math.abs(e.deltaY) < 4) return;
      wheelLock = true;
      window.setTimeout(() => {
        wheelLock = false;
      }, 220);
      advance(e.deltaY > 0 ? 1 : -1);
    };

    let touchStartY = 0;
    let touchActive = false;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchActive = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!touchActive || animating) return;
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) > 40) {
        touchActive = false;
        advance(dy > 0 ? 1 : -1);
      }
    };
    const onTouchEnd = () => {
      touchActive = false;
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        advance(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        advance(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToIndex(getSections().length - 1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [ref, enabled]);

  return goRef;
}

export function useParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scroller = ref.current;
    if (!scroller) return;
    let ticking = false;

    // Measure section offsets ONCE (and on resize) so the per-frame scroll
    // handler never calls getBoundingClientRect — no forced reflow while
    // scrolling.
    type Slot = { el: HTMLElement; top: number; h: number; last: string };
    let slots: Slot[] = [];
    let lastSp = "";
    const measure = () => {
      slots = Array.from(scroller.querySelectorAll<HTMLElement>("[data-section]")).map((el) => ({
        el,
        top: el.offsetTop,
        h: el.clientHeight,
        last: "",
      }));
    };

    const update = () => {
      const scrollTop = scroller.scrollTop;
      const vh = scroller.clientHeight;
      for (const s of slots) {
        const center = s.top - scrollTop + s.h / 2;
        const p = (center - vh / 2) / (vh / 2);
        const clamped = Math.max(-1.2, Math.min(1.2, p));
        const v = clamped.toFixed(3);
        if (v !== s.last) {
          s.el.style.setProperty("--ff-p", v);
          s.last = v;
        }
      }
      const totalScroll = scroller.scrollHeight - vh;
      const sp = (totalScroll > 0 ? scrollTop / totalScroll : 0).toFixed(4);
      if (sp !== lastSp) {
        // Set on the document root (not the scroller) so the fixed-position
        // background layers — siblings of the scroller, not descendants —
        // can still read it via CSS inheritance.
        document.documentElement.style.setProperty("--ff-scroll", sp);
        lastSp = sp;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      measure();
      update();
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    measure();
    update();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.removeProperty("--ff-scroll");
    };
  }, [ref]);
}

export function useActiveSection(ref: RefObject<HTMLElement | null>, ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const scroller = ref.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const on = e.isIntersecting && e.intersectionRatio > 0.55;
          // DOM-attribute gate (outside React render) so CSS can pause idle
          // animations on off-screen sections.
          (e.target as HTMLElement).setAttribute("data-active", on ? "true" : "false");
          if (on) setActive(e.target.id);
        });
      },
      { root: scroller, threshold: [0.55, 0.75] }
    );
    ids.forEach((id) => {
      const el = scroller.querySelector(`#${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ref, ids]);
  return active;
}

export function useRevealed(ref: RefObject<HTMLElement | null>, ids: readonly string[], enabled: boolean) {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    if (!enabled) return;
    const scroller = ref.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.25) {
            setRevealed((prev) => {
              if (prev.has(e.target.id)) return prev;
              const next = new Set(prev);
              next.add(e.target.id);
              return next;
            });
          }
        });
      },
      { root: scroller, threshold: [0.25, 0.5] }
    );
    ids.forEach((id) => {
      const el = scroller.querySelector(`#${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ref, ids, enabled]);
  return revealed;
}

export function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    mins: Math.floor((diff % 3_600_000) / 60_000),
    secs: Math.floor((diff % 60_000) / 1000),
    over: diff <= 0,
  };
}

export function revealStyle(delay: number): CSSProperties {
  return { ["--ff-reveal-delay" as string]: `${delay}ms` } as CSSProperties;
}

/** Recipient name from the share link, e.g. ?to=Budi%20Keluarga */
export function getRecipientName(): string | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("to");
  return raw?.trim() || null;
}

const initialOf = (s: string) => s.trim().charAt(0).toUpperCase() || "•";

/** Bride-first display names/initials, falling back to splitting `title` on
 * "&"/"and"/"dan" when groomName/brideName aren't set. */
export function getCoupleDisplay(data: Pick<InvitationData, "title" | "groomName" | "brideName">) {
  const parts = data.title.split(/&|\band\b|\bdan\b/i).map((p) => p.trim());
  const firstName = data.brideName ?? parts[0] ?? data.title;
  const secondName = data.groomName ?? parts[1] ?? "";
  return {
    firstName,
    secondName,
    firstInitial: initialOf(firstName),
    secondInitial: initialOf(secondName || firstName),
  };
}
