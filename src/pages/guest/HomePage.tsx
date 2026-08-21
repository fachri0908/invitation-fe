import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/constants/routes";
import { Button } from "@/components/atoms/Button";
import { WhatsAppContactButton } from "@/components/molecules/WhatsAppContactButton";

export function GuestHomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900">
          Create beautiful{" "}
          <span className="text-indigo-600">digital invitations</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-500">
          Design stunning event invitations for weddings, birthdays, corporate events, and more.
          Browse our templates, pick the one you love, and we'll build it for you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={ROUTE_PATHS.guest.templates}>
            <Button size="lg">Browse templates</Button>
          </Link>
          <WhatsAppContactButton
            label="Chat with us on WhatsApp"
            size="lg"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Everything you need
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "Beautiful templates",
                description:
                  "Choose from dozens of professionally designed templates for every occasion.",
              },
              {
                title: "Easy customization",
                description:
                  "Personalize every detail — colors, fonts, photos — to match your style.",
              },
              {
                title: "Instant sharing",
                description:
                  "Share a unique link with guests. No downloads, no printing needed.",
              },
            ].map(({ title, description }) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
