import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="bg-(--background)  mt-5 md:mt-15">
      {/* Fancy header */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-14">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-md shadow-sm border-black/10 bg-white/30 ">
            <span className="text-xs tracking-[0.18em] uppercase opacity-80">
              Mien Tay Restaurant
            </span>
            <span className="h-1 w-1 rounded-full bg-(--primary)" />
            <span className="text-xs opacity-80">Shoreditch • Hackney</span>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-light leading-[1.05]">
            <span className="relative mr-1">
              <span className="relative z-10">Let's</span>
            </span>
            plan your next
            <span className="relative ml-2">
              <span className="relative z-10">meal</span>
              <span
                className="absolute -bottom-2 left-0 h-[10px] w-full -skew-x-6 opacity-25"
                style={{ background: "var(--primary)" }}
              />
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-md md:text-xl opacity-90">
            From casual dinners to group celebrations and private events — reach
            out and we’ll make it easy.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Left column: cards */}
          <div className="md:col-span-7 space-y-8">
            {/* Contact cards */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Card
                title="Call"
                subtitle="For same-day enquiries"
                value="+44 (0)20 7739 3841"
                icon={<PhoneIcon />}
              />
              <Card
                title="Email"
                subtitle="Bookings & events"
                value="ivythien02@gmail.com"
                icon={<MailIcon />}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Card
                title="Address"
                subtitle="Shoreditch, Hackney"
                value="106–108 Kingsland Rd, London E2 8DP"
                icon={<PinIcon />}
              />
              <Card
                title="Opening Hours"
                subtitle="Holiday hours may vary"
                value={
                  <div className="text-sm leading-6 opacity-90">
                    <div className="flex items-center justify-between gap-4">
                      <span>Mon – Thu</span>
                      <span className="font-medium opacity-95">
                        12:00 – 22:30
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Fri – Sat</span>
                      <span className="font-medium opacity-95">
                        12:00 – 23:00
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Sun</span>
                      <span className="font-medium opacity-95">
                        12:00 – 22:00
                      </span>
                    </div>
                  </div>
                }
                icon={<ClockIcon />}
              />
            </div>

            {/* Fancy divider */}
            <div className="relative py-2">
              <div className="h-px w-full bg-(--textMain)/15" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-(--primary)/40" />
            </div>

            {/* Policies / info */}
            <GlassPanel>
              <h2 className="text-2xl font-light mb-4">
                Reservations & enquiries
              </h2>
              <ul className="space-y-3 opacity-90">
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Walk-ins welcome (subject to availability).</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>
                    Group bookings available — for{" "}
                    <span className="font-medium">6+</span> please email us with
                    date, time, and guest count.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>
                    Private dining & corporate events available on request.
                  </span>
                </li>
              </ul>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <ActionButton href="tel:+442077393841" label="Call now" />
                <ActionButton
                  href="ivythien02@gmail.com"
                  label="Email us"
                  variant="outline"
                />
              </div>
            </GlassPanel>
          </div>

          {/* Right column */}
          <div className="md:col-span-5 space-y-8">
            <GlassPanel>
              <h2 className="text-2xl font-light mb-4">
                Accessibility & dietary
              </h2>
              <div className="grid gap-3">
                <Pill>Ground floor seating</Pill>
                <Pill>Accessible toilets</Pill>
                <Pill>Highchairs available</Pill>
                <Pill>Vegetarian & vegan friendly</Pill>
              </div>
              <p className="mt-5 text-sm opacity-75 leading-relaxed">
                If you have allergies or dietary requirements, please let our
                team know. While we take care, we cannot guarantee an
                allergen-free environment.
              </p>
            </GlassPanel>

            <GlassPanel>
              <h2 className="text-2xl font-light mb-4">Follow us</h2>
              <p className="opacity-90">
                Seasonal dishes, events, and behind-the-scenes.
              </p>

              <div className="mt-5 grid gap-3">
                <SocialLink
                  label="Instagram"
                  href="https://www.instagram.com/mientayrestaurants/?hl=en"
                />
                <SocialLink
                  label="Facebook"
                  href="https://www.facebook.com/monngonVN2017/?locale=en_GB"
                />
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/"
            className="text-xs tracking-widest text-(--primary) hover:opacity-80 transition"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ----------------------------- UI bits ----------------------------- */

function GlassPanel({ children }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/30 p-6 md:p-7 backdrop-blur-md shadow-sm">
      {children}
    </div>
  );
}

function Card({ title, subtitle, value, icon }) {
  return (
    <div className="group rounded-2xl border border-black/10 bg-white/30 p-6 backdrop-blur-md shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <div className="mt-1 rounded-xl border border-black/10 bg-white/40 p-3">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm tracking-[0.16em] uppercase opacity-70">
            {title}
          </p>
          <p className="mt-1 text-xs opacity-70">{subtitle}</p>
          <div className="mt-4 text-base md:text-lg font-medium break-words">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ href, label, variant = "solid" }) {
  const solid =
    "bg-[var(--primary)] text-white hover:opacity-95 border-transparent hover:opacity-90";
  const outline =
    "bg-transparent text-[var(--textMain)] border-[var(--textMain)]/25 hover:bg-white/10";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition ${
        variant === "solid" ? solid : outline
      }`}
    >
      {label}
    </a>
  );
}

function Pill({ children }) {
  return (
    <div className="inline-flex w-fit items-center rounded-full border border-black/10 bg-white/15 px-4 py-2 text-sm opacity-90 backdrop-blur">
      {children}
    </div>
  );
}

function SocialLink({ label, href }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between rounded-xl border border-black/15 bg-white/10 px-4 py-3 backdrop-blur transition hover:bg-white/15"
    >
      <span className="font-medium">{label}</span>
      <span className="text-sm opacity-70 group-hover:opacity-90">→</span>
    </a>
  );
}

function CheckIcon() {
  return (
    <span
      className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(230, 198, 92,0.55)" }}
      aria-hidden="true"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 4 4l1.58-1.58a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4h16v16H4V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
