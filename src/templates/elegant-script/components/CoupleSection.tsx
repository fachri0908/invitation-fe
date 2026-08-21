import type { InvitationData } from "../../types";
import { OrnamentDivider, SectionTitle } from "./OrnamentDivider";

interface CoupleSectionProps {
  data: Pick<InvitationData, "groomName" | "brideName" | "portraitImageUrl">;
}

export function CoupleSection({ data }: CoupleSectionProps) {
  if (!data.groomName && !data.brideName) return null;

  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-lg">
        <SectionTitle className="mb-8">The Couple</SectionTitle>
        <OrnamentDivider className="mb-10" />

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-16">
          {/* Groom */}
          {data.groomName && (
            <div className="text-center">
              <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-rose-100 bg-rose-50">
                {data.portraitImageUrl ? (
                  <img
                    src={data.portraitImageUrl}
                    alt={data.groomName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl text-rose-300">
                    ♔
                  </div>
                )}
              </div>
              <p className="font-['Playfair_Display',Georgia,serif] text-xl text-stone-800">
                {data.groomName}
              </p>
              <p className="text-xs tracking-widest text-rose-400">The Groom</p>
            </div>
          )}

          {/* Ampersand divider */}
          {data.groomName && data.brideName && (
            <div className="font-['Playfair_Display',Georgia,serif] text-5xl text-rose-300">
              &
            </div>
          )}

          {/* Bride */}
          {data.brideName && (
            <div className="text-center">
              <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-rose-100 bg-rose-50">
                {data.portraitImageUrl ? (
                  <img
                    src={data.portraitImageUrl}
                    alt={data.brideName}
                    className="h-full w-full object-cover object-[right_center]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl text-rose-300">
                    ♕
                  </div>
                )}
              </div>
              <p className="font-['Playfair_Display',Georgia,serif] text-xl text-stone-800">
                {data.brideName}
              </p>
              <p className="text-xs tracking-widest text-rose-400">The Bride</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
