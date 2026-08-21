import type { GalleryImage } from "../../types";
import { OrnamentDivider, SectionTitle } from "./OrnamentDivider";

interface GallerySectionProps {
  images: GalleryImage[];
}

export function GallerySection({ images }: GallerySectionProps) {
  if (!images.length) return null;

  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-lg">
        <SectionTitle className="mb-3">Our Story</SectionTitle>
        <OrnamentDivider className="mb-10" />

        {/* Masonry-style grid using CSS columns */}
        <div className="columns-2 gap-3 sm:columns-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="mb-3 break-inside-avoid overflow-hidden rounded-xl"
            >
              <img
                src={image.url}
                alt={image.alt ?? `Gallery photo ${index + 1}`}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
