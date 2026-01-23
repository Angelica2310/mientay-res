"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  Mail,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";
import emailjs from "@emailjs/browser";

function formatDDMMYYYYFromISO(iso) {
  const [yyyy, mm, dd] = iso.split("-");
  return `${dd}-${mm}-${yyyy}`;
}
function isISODate(str) {
  return /^\d{4}-\d{2}-\d{2}$/.test(str);
}
function getTodayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-black/10 bg-white/25 px-3 py-1 text-xs text-(--textMain)/80">
    {children}
  </span>
);

const GlassCard = ({ title, icon, children }) => (
  <div className="rounded-3xl border border-black/10 bg-white/25 p-6 shadow-sm backdrop-blur-md">
    <div className="mb-4 flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-black/10 bg-white/30">
        {icon}
      </span>
      <h3 className="text-sm font-medium tracking-wide text-(--textMain)">
        {title}
      </h3>
    </div>
    <div className="text-sm leading-relaxed text-(--textMain)/80">
      {children}
    </div>
  </div>
);

const Field = ({ label, htmlFor, hint, children }) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium tracking-wide text-(--textMain)"
    >
      {label}
    </label>
    {hint ? <p className="mt-1 text-xs text-(--textMain)/60">{hint}</p> : null}
    <div className="mt-2">{children}</div>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className={[
      "w-full rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-sm",
      "text-(--textMain) placeholder-black/35 outline-none",
      "focus:border-(--primary) focus:bg-white/70 focus:shadow-sm",
      "transition",
      props.className || "",
    ].join(" ")}
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className={[
      "w-full rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-sm",
      "text-(--textMain) placeholder-black/35 outline-none",
      "focus:border-(--primary) focus:bg-white/70 focus:shadow-sm",
      "transition",
      props.className || "",
    ].join(" ")}
  />
);

export default function BookPage() {
  const form = useRef(null);
  const successRef = useRef(null);

  const [bookingType, setBookingType] = useState("table"); // table | private
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [guest, setGuest] = useState(""); //tracking guest number
  const [guestError, setGuestError] = useState("");

  // OPTIONAL closure window
  //   const CLOSED_START_ISO = "2026-02-15";
  //   const CLOSED_END_ISO = "2026-03-13";

  const todayISO = useMemo(() => getTodayISO(), []);

  function validateDateOrSetError(isoValue) {
    if (!isoValue) {
      setDateError("Please choose a date.");
      return false;
    }
    if (!isISODate(isoValue)) {
      setDateError("Please choose a valid date.");
      return false;
    }
    if (isoValue < todayISO) {
      setDateError("Please choose a future date.");
      return false;
    }

    // const inClosedRange =
    //   isoValue >= CLOSED_START_ISO && isoValue <= CLOSED_END_ISO;
    // if (inClosedRange) {
    //   setDateError(
    //     `Sorry, we will close from ${formatDDMMYYYYFromISO(
    //       CLOSED_START_ISO,
    //     )} to ${formatDDMMYYYYFromISO(CLOSED_END_ISO)}.`,
    //   );
    //   return false;
    // }

    setDateError("");
    return true;
  }

  function handleDateChange(e) {
    const v = e.target.value;
    setDate(v);
    validateDateOrSetError(v);
  }

  async function sendEmail(e) {
    e.preventDefault();
    if (!form.current) return;

    if (!form.current.checkValidity()) {
      form.current.reportValidity();
      return;
    }
    if (!validateDateOrSetError(date)) return;

    setSubmitting(true);

    try {
      // restaurant email
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_RESTAURANT,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        },
      );

      // customer confirmation
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_CUSTOMER_CONFIRM,
        form.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY },
      );

      setMessage(
        bookingType === "private"
          ? "Thanks — your private dining enquiry has been sent."
          : "Thanks — your booking request has been sent.",
      );

      form.current.reset();
      setDate("");
      setDateError("");
      setBookingType("table");

      setTimeout(() => {
        successRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 120);

      setTimeout(() => setMessage(""), 4500);
    } catch (error) {
      console.log("FAILED:", error);
      setMessage("Something went wrong. Please try again.");
      setTimeout(() => setMessage(""), 4500);
    } finally {
      setSubmitting(false);
    }

    if (Number(guest) < 6) {
      setGuestError("Minimum online booking is 6 guests. Please call us.");
      return;
    }
  }

  return (
    <main className="min-h-screen bg-(--background) px-4 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/25 p-7 shadow-sm backdrop-blur-md sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-(--accent)/12 blur-2xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-(--primary)/12 blur-2xl" />

          <div className="relative">
            <div className="mb-4 flex flex-wrap gap-2">
              <Pill>Table booking</Pill>
              <Pill>Private dining enquiry</Pill>
              <Pill>Groups & celebrations</Pill>
            </div>

            <h1 className="text-4xl font-light tracking-wide text-(--textMain) sm:text-5xl">
              Book a Table
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--textMain)/75">
              Share your preferred date, time, and group size — we’ll confirm
              availability. During peak hours and busy seasons, availability can
              be limited.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full border border-(--textMain)/25 bg-transparent px-7 py-3 text-sm tracking-wide text-(--textMain) transition hover:bg-white/10"
              >
                View menu
              </Link>
              <Link
                href="/private-dining"
                className="inline-flex items-center justify-center rounded-full bg-(--primary) px-7 py-3 text-sm tracking-wide text-white transition hover:opacity-90"
              >
                Private dining details
              </Link>
            </div>
          </div>
        </section>

        {/* Booking notice */}
        <div className="mt-6 rounded-2xl border border-black/10 bg-white/30 p-4 text-sm text-[--textMain]/80 backdrop-blur-md">
          <strong className="text-[--textMain]">Booking notice:</strong> Online
          bookings are available for groups of <strong>6 or more</strong>. For
          tables of fewer than 6, please call us on{" "}
          <a
            href="tel:+442012345678"
            className="font-medium text-[--primary] underline underline-offset-4 hover:opacity-80"
          >
            020 1234 5678
          </a>
          .
        </div>

        {/* GRID */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.25fr,0.75fr]">
          {/* FORM */}
          <section className="rounded-3xl border border-black/10 bg-white/25 p-6 shadow-sm backdrop-blur-md sm:p-8">
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              {/* Hidden fields for EmailJS */}
              <input type="hidden" name="source" value="website_booking" />
              <input
                type="hidden"
                name="booking_type"
                value={
                  bookingType === "private"
                    ? "Private dining enquiry"
                    : "Table booking"
                }
              />

              {/* <input
                type="hidden"
                name="closed_range"
                value={`${CLOSED_START_ISO} - ${CLOSED_END_ISO}`}
              /> */}

              {/* Type selector */}
              <div className="rounded-2xl border border-black/10 bg-white/25 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-(--textMain)">
                      Booking type
                    </div>
                    <div className="mt-1 text-xs text-(--textMain)/60">
                      Private dining is subject to group booking limits and
                      setup availability.
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setBookingType("table")}
                      className={[
                        "rounded-full border px-4 py-2 text-xs tracking-wide transition",
                        bookingType === "table"
                          ? "border-(--primary) bg-(--primary)/12 text-(--textMain)"
                          : "border-black/10 bg-white/30 text-(--textMain)/70 hover:bg-white/45",
                      ].join(" ")}
                    >
                      Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingType("private")}
                      className={[
                        "rounded-full border px-4 py-2 text-xs tracking-wide transition",
                        bookingType === "private"
                          ? "border-(--primary) bg-(--primary)/12 text-(--textMain)"
                          : "border-black/10 bg-white/30 text-(--textMain)/70 hover:bg-white/45",
                      ].join(" ")}
                    >
                      Private
                    </button>
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" htmlFor="fName">
                  <Input
                    id="fName"
                    name="fName"
                    type="text"
                    required
                    placeholder="Your name"
                  />
                </Field>

                <Field label="Guests" htmlFor="guest">
                  <Input
                    id="guest"
                    name="guest"
                    type="number"
                    min={6}
                    required
                    placeholder="e.g. 6"
                    value={guest}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setGuest(e.target.value);

                      if (value > 0 && value < 6) {
                        setGuestError(
                          "Minimum online booking is 6 guests. Please",
                        );
                      } else {
                        setGuestError("");
                      }
                    }}
                  />
                  {guestError && (
                    <p className="mt-1 text-xs text-[--primary]">
                      {guestError}{" "}
                      <a
                        href="tel:+442012345678"
                        className="underline underline-offset-4"
                      >
                        call us.
                      </a>
                    </p>
                  )}
                </Field>

                <Field label="Email" htmlFor="email">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                  />
                </Field>

                <Field label="Phone" htmlFor="tel">
                  <Input
                    id="tel"
                    name="tel"
                    type="tel"
                    required
                    placeholder="Your phone number"
                  />
                </Field>

                <Field label="Date" htmlFor="date">
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={date}
                    min={todayISO}
                    onChange={handleDateChange}
                  />
                  {dateError ? (
                    <p className="mt-2 text-xs text-red-600">{dateError}</p>
                  ) : null}
                </Field>

                <Field label="Time" htmlFor="time">
                  <Input id="time" name="time" type="time" required />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Dietary / accessibility requests (optional)"
                  htmlFor="dietary"
                  hint="Vegetarian & vegan friendly. We cannot guarantee allergen-free dishes."
                >
                  <Textarea
                    id="dietary"
                    name="dietary"
                    rows={4}
                    placeholder="e.g. vegetarian, allergy notes, step-free access, highchair…"
                  />
                </Field>

                <Field
                  label="Note (optional)"
                  htmlFor="note"
                  hint="Occasion, seating preference, BYOB request, dogs (non-service), etc."
                >
                  <Textarea
                    id="note"
                    name="note"
                    rows={4}
                    placeholder="Anything you’d like us to know…"
                  />
                </Field>
              </div>

              {/* Policies */}
              <div className="rounded-2xl border border-black/10 bg-white/25 p-4">
                <div className="text-sm font-medium text-(--textMain)">
                  Booking notes
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-(--textMain)/70">
                  <li>Please let us know if you’ll be late.</li>
                  <li>
                    For larger groups, payment details may be confirmed in
                    advance and a service charge may apply.
                  </li>
                  <li>
                    If BYOB is requested, any fees/restrictions will be
                    confirmed during booking.
                  </li>
                  <li>
                    Non-service pet dogs may be allowed depending on seating —
                    mention it in your note.
                  </li>
                </ul>

                <label className="mt-3 flex items-start gap-3 text-xs text-(--textMain)/75">
                  <input
                    type="checkbox"
                    name="policies_ack"
                    required
                    className="mt-0.5 h-4 w-4 accent-(--primary)"
                  />
                  <span>
                    I understand these notes are subject to confirmation and may
                    vary by group size, time, and season.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-full bg-(--primary) px-8 py-3 text-sm tracking-wide text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Submit request"}
                </button>

                <Link
                  href="/contact"
                  className="text-sm text-(--textMain) underline underline-offset-4 hover:opacity-80"
                >
                  Prefer to contact us directly?
                </Link>
              </div>

              <div ref={successRef} />
            </form>

            {/* Success/Error overlay */}
            {message ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
                <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white/75 p-6 text-center shadow-lg backdrop-blur-md">
                  <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white/70">
                    <Sparkles className="h-6 w-6 text-(--primary)" />
                  </div>

                  <div className="text-lg font-semibold text-(--textMain)">
                    {message}
                  </div>

                  <button
                    type="button"
                    onClick={() => setMessage("")}
                    className="mt-5 inline-flex items-center justify-center rounded-full border border-black/10 bg-white/60 px-5 py-2 text-sm text-(--textMain) transition hover:bg-white/80"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}
          </section>

          {/* SIDE INFO */}
          <aside className="grid gap-6">
            <GlassCard
              title="What happens next?"
              icon={<CalendarDays className="h-4 w-4 text-(--primary)" />}
            >
              We’ll review your request and confirm availability. If you’re
              booking during busy periods, we may suggest alternative times.
            </GlassCard>

            <GlassCard
              title="Accessibility"
              icon={<Users className="h-4 w-4 text-(--primary)" />}
            >
              • Ground floor seating • Accessible toilets • Highchairs available
              <div className="mt-3 text-xs text-(--textMain)/70"></div>
            </GlassCard>

            <GlassCard
              title="Private dining enquiries"
              icon={<Clock className="h-4 w-4 text-(--primary)" />}
            >
              For corporate events or celebrations, choose <b>Private</b> above
              and tell us your event details in the note. Group booking limits
              and setup are confirmed by enquiry.
              <div className="mt-4">
                <Link
                  href="/private-dining"
                  className="inline-flex items-center justify-center rounded-full border border-(--textMain)/25 bg-transparent px-6 py-2 text-xs tracking-wide text-(--textMain) transition hover:bg-white/10"
                >
                  Learn about private dining
                </Link>
              </div>
            </GlassCard>

            <div className="rounded-3xl border border-black/10 bg-white/25 p-6 shadow-sm backdrop-blur-md">
              <div className="text-sm font-medium tracking-wide text-(--textMain)">
                Need to reach us?
              </div>
              <div className="mt-3 grid gap-2 text-sm text-(--textMain)/80">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-(--primary)" />
                  <span>Use the contact page for direct enquiries</span>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-(--primary) px-7 py-3 text-sm tracking-wide text-white transition hover:opacity-90"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </aside>
        </section>

        {/* Divider */}
        <div className="relative mt-10">
          <div className="h-px w-full bg-(--textMain)/15" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-(--primary)/60" />
        </div>
      </div>
    </main>
  );
}
