"use client";

import Image from "next/image";
import Link from "next/link";

const InfoCard = ({ title, children }) => (
  <div className="rounded-2xl border border-black/10 bg-white/30 p-6 shadow-sm backdrop-blur-md">
    <h3 className="mb-3 text-sm font-medium tracking-wide text-(--textMain)">
      {title}
    </h3>
    <div className="text-sm leading-relaxed text-(--textMain)/80">
      {children}
    </div>
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-black/10 bg-white/30 px-3 py-1 text-xs text-(--textMain)/80">
    {children}
  </span>
);

const BulletList = ({ items }) => (
  <ul className="list-disc space-y-2 pl-5">
    {items.map((t, i) => (
      <li key={i}>{t}</li>
    ))}
  </ul>
);

export default function PrivateDiningPage() {
  return (
    <main className="min-h-screen bg-(--background) px-4 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/30 p-6 shadow-sm backdrop-blur-md sm:p-12 md:p-7">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-(--primary)/10 blur-2xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-(--accent)/10 blur-2xl" />

          <div className="relative grid gap-8 md:grid-cols-[1.1fr,0.9fr] md:items-center">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Pill>Private dining</Pill>
                <Pill>Corporate events</Pill>
                <Pill>Celebrations</Pill>
                <Pill>Shoreditch</Pill>
              </div>

              <h1 className="mb-4 text-4xl font-light tracking-wide text-(--textMain) sm:text-5xl">
                Private Dining
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-(--textMain)/75">
                Host your next event at Mien Tay — an authentic, family-run
                Vietnamese restaurant in Shoreditch. We’re re-shaping the
                experience to feel modern and elegant, while staying true to our
                comfort-food roots and friendly, energetic atmosphere.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-(--primary) px-7 py-3 text-sm tracking-wide text-white transition hover:opacity-90"
                >
                  Enquire about private dining
                </Link>

                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center rounded-full border border-(--textMain)/25 bg-transparent px-7 py-3 text-sm tracking-wide text-(--textMain) transition hover:bg-white/10"
                >
                  View menu
                </Link>
              </div>

              <p className="mt-4 text-xs text-(--textMain)/60">
                Availability can be limited during peak hours and busy seasons.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-black/10 bg-white/40 shadow-sm sm:max-w-lg md:max-w-none">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/private-dining.jpg"
                  alt="Private dining at Mien Tay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        {/* Divider */}
        <div className="relative mt-10">
          <div className="h-px w-full bg-(--textMain)/15" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-(--primary)/40" />
        </div>

        {/* Section: private dining-focused content */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoCard title="Perfect for">
            <BulletList
              items={[
                "Corporate dinners and business events",
                "Birthdays and celebrations",
                "Friends & family gatherings",
                "Casual meet-ups with a larger group",
              ]}
            />
            <p className="mt-3">
              We’ll shape the experience around your group size, timing, and the
              vibe you want.
            </p>
          </InfoCard>

          <InfoCard title="What we offer">
            <BulletList
              items={[
                "Private dining enquiries (setup discussed by request)",
                "Group booking options (limits confirmed during enquiry)",
                "Support for dining formats: dine-in, takeaway, delivery, online orders",
                "A welcoming space designed for social dining",
              ]}
            />
          </InfoCard>

          <InfoCard title="How it works">
            <BulletList
              items={[
                "Tell us your preferred date and time",
                "Share estimated group size and event type",
                "Mention any dietary or accessibility needs",
                "We’ll confirm availability and the best arrangement",
              ]}
            />
            <p className="mt-3 text-(--textMain)/70">
              During busy periods, earlier enquiries are recommended.
            </p>
          </InfoCard>

          <InfoCard title="Dietary & accessibility">
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-xs font-medium tracking-wide text-(--textMain)">
                  Dietary
                </div>
                <BulletList
                  items={[
                    "Vegetarian and vegan friendly",
                    "Dietary requests welcomed",
                    "We cannot guarantee allergen-free dishes",
                  ]}
                />
              </div>

              <div>
                <div className="mb-1 text-xs font-medium tracking-wide text-(--textMain)">
                  Accessibility
                </div>
                <BulletList
                  items={[
                    "Ground floor seating",
                    "Accessible toilets",
                    "Highchairs available",
                  ]}
                />
              </div>
            </div>
          </InfoCard>
        </section>

        {/* Policies */}
        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-light tracking-wide text-(--textMain)">
              Booking policies
            </h2>
            <Link
              href="/contact"
              className="text-sm text-(--textMain) underline underline-offset-4 hover:opacity-80"
            >
              Ask a question
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard title="Late arrivals">
              Please let us know if your group will be late — we’ll do our best
              to accommodate, especially during busy periods.
            </InfoCard>

            <InfoCard title="Payment policies & service charge">
              For larger groups and private dining, we may confirm payment
              details in advance and apply a service charge depending on the
              booking.
            </InfoCard>

            <InfoCard title="BYOB fees & restrictions">
              If BYOB is requested, fees and any restrictions will be confirmed
              with you during the booking process.
            </InfoCard>

            <InfoCard title="Dogs">
              Non-service pet dogs may be allowed depending on the booking and
              seating arrangement. Please mention it in your enquiry.
            </InfoCard>
          </div>

          <p className="mt-4 text-xs text-(--textMain)/60">
            Policies are provided to set expectations and may vary by group
            size, time, and season.
          </p>
        </section>

        {/* Contact CTA */}
        <section className="mt-12 rounded-3xl border border-black/10 bg-white/30 p-8 text-center shadow-sm backdrop-blur-md">
          <h2 className="text-2xl font-light tracking-wide text-(--textMain)">
            Planning an event?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-(--textMain)/75">
            Send us your preferred date, time, estimated group size, and any
            dietary or accessibility needs. We’ll get back to you with
            availability and the best setup for your private dining experience.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-(--primary) px-8 py-3 text-sm tracking-wide text-white transition hover:opacity-90"
            >
              Contact us
            </Link>

            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full border border-(--textMain)/25 bg-transparent px-8 py-3 text-sm tracking-wide text-(--textMain) transition hover:bg-white/10"
            >
              View gallery
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
