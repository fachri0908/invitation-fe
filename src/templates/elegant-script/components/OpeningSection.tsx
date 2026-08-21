import type { InvitationData } from "../../types";
import { OrnamentDivider } from "./OrnamentDivider";

interface OpeningSectionProps {
  data: Pick<InvitationData, "openingMessage" | "groomName" | "brideName" | "people">;
}

export function OpeningSection({ data }: OpeningSectionProps) {
  const parents = data.people ?? [];

  return (
    <section className="bg-stone-50 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-lg text-center">
        {/* Bismillah */}
        <p className="mb-6 font-['Noto_Naskh_Arabic',serif] text-3xl text-stone-700">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        <OrnamentDivider className="mb-8" />

        {data.openingMessage && (
          <p className="mb-8 text-sm leading-loose text-stone-600">{data.openingMessage}</p>
        )}

        {/* Parents */}
        {parents.length > 0 && (
          <div className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            {parents.map((person) => (
              <div key={person.name} className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-rose-400">{person.role}</p>
                <p className="mt-1 font-medium text-stone-800">{person.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
