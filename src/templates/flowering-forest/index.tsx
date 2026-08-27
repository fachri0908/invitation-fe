import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";
import type { TemplateProps } from "../types";
import "./styles.css";

import { ContinuousBackground } from "./components/Background";
import { CornerDecor } from "./components/Decor";
import { Nav } from "./components/Nav";
import { OpeningGate } from "./components/OpeningGate";
import { SectionTransition, type Trigger } from "./components/SectionTransition";
import { RevealContext } from "./components/Section";
import { HeroSection } from "./components/HeroSection";
import { CoupleSection } from "./components/CoupleSection";
import { StorySections } from "./components/StorySection";
import { EventSection } from "./components/EventSection";
import { RSVPSection } from "./components/RSVPSection";
import { GiftSection, readGiftAccounts, readGiftEwallet } from "./components/GiftSection";
import { ClosingSection } from "./components/ClosingSection";
import { getCoupleDisplay, useActiveSection, useParallax, useRevealed, useSmoothSnapScroll } from "./hooks";

const FONT_LINK_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=Inter:wght@300;400;500;600&display=swap";

export function FloweringForestTemplate({ data, isPreview }: TemplateProps) {
  const storyPages = (data.extras?.storyPages as string[][] | undefined) ?? [];
  const showRsvp = Boolean(data.rsvpEnabled);
  const showGift = readGiftAccounts(data.extras).length > 0 || readGiftEwallet(data.extras) !== null;

  const storyPageCount = storyPages.length;
  const sectionIds = useMemo(
    () => [
      "hero",
      "couple",
      ...Array.from({ length: storyPageCount }, (_, i) => `story-${i}`),
      "event",
      ...(showRsvp ? ["rsvp"] : []),
      ...(showGift ? ["gift"] : []),
      "closing",
    ],
    [storyPageCount, showRsvp, showGift]
  );

  const scrollerRef = useRef<HTMLElement>(null);
  const [opened, setOpened] = useState(false);
  const [trans, setTrans] = useState<Trigger>(null);
  const transCount = useRef(0);

  useParallax(scrollerRef);
  const goRef = useSmoothSnapScroll(scrollerRef, opened, (dir) => {
    transCount.current += 1;
    setTrans({ key: transCount.current, dir, kind: transCount.current % 2 ? "birds" : "petals" });
  });
  const active = useActiveSection(scrollerRef, sectionIds);
  const revealed = useRevealed(scrollerRef, sectionIds, opened);

  const go = useCallback(
    (id: string) => {
      const i = sectionIds.indexOf(id);
      if (i >= 0) goRef.current(i);
    },
    [goRef, sectionIds]
  );

  // ─── optional background music (off unless the admin set a URL) ─────────
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const handleOpen = useCallback(() => {
    setOpened(true);
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    a.play()
      .then(() => {
        let raf = 0;
        const t0 = performance.now();
        const fadeIn = () => {
          const t = Math.min(1, (performance.now() - t0) / 2000);
          a.volume = t;
          if (t < 1) raf = requestAnimationFrame(fadeIn);
        };
        raf = requestAnimationFrame(fadeIn);
        return () => cancelAnimationFrame(raf);
      })
      .catch(() => {});
  }, []);
  const handleRestart = useCallback(() => go("hero"), [go]);
  const toggleMute = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  }, []);

  const { firstInitial, secondInitial, firstName, secondName } = getCoupleDisplay(data);
  const firstEvent = data.events[0];

  return (
    <div className="flowering-forest-template">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONT_LINK_HREF} rel="stylesheet" />

      {isPreview && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-110 bg-amber-400 px-4 py-2 text-center text-xs font-semibold text-amber-900">
          📋 Preview Mode — this is a demo of the Flowering Forest template
        </div>
      )}

      {data.backgroundMusicUrl && (
        <audio ref={audioRef} src={data.backgroundMusicUrl} preload="auto" loop />
      )}

      <ContinuousBackground />
      {!opened ? (
        <OpeningGate
          onOpen={handleOpen}
          firstName={firstName}
          secondName={secondName}
          firstInitial={firstInitial}
          secondInitial={secondInitial}
          dateShort={firstEvent ? new Date(firstEvent.date).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }) : undefined}
          address={firstEvent?.venueName}
        />
      ) : null}

      {opened && data.backgroundMusicUrl && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Putar musik" : "Senyapkan musik"}
          className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/30 shadow-md backdrop-blur transition hover:bg-white/40"
          style={{ color: "var(--ff-800)" }}
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          )}
        </button>
      )}

      <SectionTransition trigger={trans} />
      {opened && <CornerDecor />}
      <Nav active={active} sections={sectionIds} onGo={go} visible={opened} />

      <RevealContext.Provider value={revealed}>
        <main
          ref={scrollerRef}
          className="ff-no-scrollbar ff-perspective relative h-dvh w-full overflow-y-scroll"
          style={{ overscrollBehaviorY: "none", touchAction: "pan-y" } as CSSProperties}
        >
          <HeroSection data={data} />
          <CoupleSection data={data} />
          <StorySections pages={storyPages} />
          <EventSection data={data} />
          {showRsvp && <RSVPSection data={data} isPreview={isPreview} />}
          {showGift && <GiftSection data={data} />}
          <ClosingSection data={data} onRestart={handleRestart} />
        </main>
      </RevealContext.Provider>
    </div>
  );
}
