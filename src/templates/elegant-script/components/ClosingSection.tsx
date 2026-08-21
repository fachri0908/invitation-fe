import type { InvitationData } from "../../types";
import { OrnamentDivider } from "./OrnamentDivider";

interface ClosingSectionProps {
  data: Pick<InvitationData, "closingMessage" | "title">;
}

export function ClosingSection({ data }: ClosingSectionProps) {
  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-md text-center">
        <OrnamentDivider className="mb-8" />

        {data.closingMessage && (
          <p className="text-sm leading-loose text-stone-600">{data.closingMessage}</p>
        )}

        <p className="mt-8 font-['Playfair_Display',Georgia,serif] text-3xl text-stone-800">
          {data.title}
        </p>

        <OrnamentDivider className="mt-8" />

        <p className="mt-6 text-xs tracking-widest text-stone-400">
          Made with ♥ using EventInvite
        </p>
      </div>
    </section>
  );
}
