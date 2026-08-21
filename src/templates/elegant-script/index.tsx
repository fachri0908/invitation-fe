import type { TemplateProps } from "../types";
import { HeroSection } from "./components/HeroSection";
import { OpeningSection } from "./components/OpeningSection";
import { CoupleSection } from "./components/CoupleSection";
import { EventDetailsSection } from "./components/EventDetailsSection";
import { GallerySection } from "./components/GallerySection";
import { RSVPSection } from "./components/RSVPSection";
import { ClosingSection } from "./components/ClosingSection";

/**
 * Elegant Script — Template
 *
 * A romantic, script-forward wedding invitation.
 * Sections: Hero → Opening → Couple → Event details + countdown → Gallery → RSVP → Closing
 *
 * Designed mobile-first; fully readable on desktop.
 * Uses Playfair Display (serif) loaded via CSS font-face in the template styles below.
 */
export function ElegantScriptTemplate({ data, isPreview }: TemplateProps) {
  return (
    <>
      {/* Load Playfair Display from Google Fonts — scoped to this template */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Naskh+Arabic:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-white font-sans antialiased">
        {isPreview && (
          <div className="sticky top-0 z-50 bg-amber-400 px-4 py-2 text-center text-xs font-semibold text-amber-900">
            📋 Preview Mode — this is a demo of the Elegant Script template
          </div>
        )}

        <HeroSection data={data} />
        <OpeningSection data={data} />
        <CoupleSection data={data} />
        <EventDetailsSection events={data.events} />
        <GallerySection images={data.galleryImages ?? []} />
        <RSVPSection data={data} isPreview={isPreview} />
        <ClosingSection data={data} />
      </div>
    </>
  );
}
