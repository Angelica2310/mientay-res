"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Leaf,
  Accessibility,
  ShieldAlert,
  Baby,
} from "lucide-react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Footer({
  year,
  brandLine = "Authentic Vietnamese comfort food — warm, vibrant, and made for sharing.",
  showDietaryModal = true,
}) {
  const [open, setOpen] = useState(false);
  const currentYear = useMemo(() => year ?? new Date().getFullYear(), [year]);

  return (
    <>
      <footer>
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Brand / CTA */}
            <div className="lg:col-span-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                    <img
                      src="/logo1.png"
                      alt="Mien Tay"
                      className="h-24 w-auto"
                    />
                    Mien Tay
                    <span className="ml-2 rounded-full border border-[rgba(54,69,79,0.18)] bg-white/30 px-2 py-0.5 text-xs font-medium">
                      Shoreditch
                    </span>
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed opacity-90">
                    {brandLine}
                  </p>
                </div>
              </div>

              {/* Quick chips */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href="https://www.facebook.com/monngonVN2017/?locale=en_GB"
                  target="_blank"
                  rel="noreferrer"
                  className={cx(chipClass, "inline-flex items-center gap-2")}
                >
                  <Image src="/facebook.png" alt="" width={30} height={30} />
                  Facebook
                  <ArrowUpRight className="h-4 w-4 opacity-70" />
                </a>

                <a
                  href="https://www.instagram.com/mientayrestaurants/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className={cx(chipClass, "inline-flex items-center gap-2")}
                >
                  <Image src="/instagram.png" alt="" width={30} height={30} />
                  Instagram
                  <ArrowUpRight className="h-4 w-4 opacity-70" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold">Explore</p>
              <div className="mt-4 grid grid-cols-2 gap-6 text-sm">
                <ul className="space-y-2">
                  <li>
                    <Link className={linkClass} href="/menu">
                      Food & Drinks
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/book">
                      Reservations & Booking Policies
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/gallery">
                      Gallery
                    </Link>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li>
                    <Link className={linkClass} href="/private-dining">
                      Events & Private Dining
                    </Link>
                  </li>

                  <li>
                    <Link className={linkClass} href="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Policies */}
            <div className="lg:col-span-3">
              <p className="text-sm font-semibold">Info</p>
              <div className="mt-4 rounded-2xl border border-[color:rgba(54,69,79,0.16)] bg-white/25 p-4">
                <ul className="space-y-2 text-sm">
                  {showDietaryModal ? (
                    <li>
                      <button
                        onClick={() => setOpen(true)}
                        className={linkClass}
                      >
                        Dietary & Accessibility
                      </button>
                    </li>
                  ) : (
                    <li>
                      <Link className={linkClass} href="/dietary-accessibility">
                        Dietary & Accessibility
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link className={linkClass} href="/terms">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/privacy">
                      Privacy Policies
                    </Link>
                  </li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className={badgeClass}>Peak hours and seasons</span>
                  <span className={badgeClass}>Group bookings</span>
                  <span className={badgeClass}>Vegan options</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-(--primary)/15">
          <div className="mx-auto max-w-7xl px-4 md:px-12 py-6 text-xs text-(--text-main)/55 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span>
              © {currentYear} Mien Tay Restaurant Ltd. All rights reserved.
            </span>

            <span className="opacity-60">
              Design & development by{" "}
              <a
                href="https://www.angelicagiang.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-(--primary) hover:opacity-80 transition"
              >
                Angelica
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Dietary & Accessibility Modal */}
      {showDietaryModal && open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="Close"
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-white/25 bg-white/20 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base font-semibold">
                  Dietary & Accessibility
                </p>
                <p className="mt-1 text-sm opacity-85">
                  Please let us know your needs when booking or ordering.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/25 bg-white/20 px-3 py-1.5 text-xs"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className={cardClass}>
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  <p className="text-sm font-semibold">Dietary</p>
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex gap-2">
                    <Leaf className="mt-0.5 h-4 w-4 opacity-80" />
                    Vegetarian & vegan options available
                  </li>
                  <li className="flex gap-2">
                    <ShieldAlert className="mt-0.5 h-4 w-4 opacity-80" />
                    Dietary requests accommodated where possible
                  </li>
                  <li className="flex gap-2">
                    <ShieldAlert className="mt-0.5 h-4 w-4 opacity-80" />
                    We cannot guarantee allergen-free dishes
                  </li>
                </ul>
              </div>

              <div className={cardClass}>
                <div className="flex items-center gap-2">
                  <Accessibility className="h-4 w-4" />
                  <p className="text-sm font-semibold">Accessibility</p>
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex gap-2">
                    <Accessibility className="mt-0.5 h-4 w-4 opacity-80" />
                    Ground floor seating available
                  </li>
                  <li className="flex gap-2">
                    <Accessibility className="mt-0.5 h-4 w-4 opacity-80" />
                    Accessible toilets available
                  </li>
                  <li className="flex gap-2">
                    <Baby className="mt-0.5 h-4 w-4 opacity-80" />
                    Highchairs available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Shared styles */
const chipClass =
  "inline-flex items-center justify-center rounded-full border border-[color:rgba(54,69,79,0.18)] bg-white/30 px-3 py-1.5 text-sm font-medium hover:bg-white/40";

const badgeClass =
  "rounded-full border border-[color:rgba(54,69,79,0.16)] bg-white/25 px-2.5 py-1 opacity-90";

const linkClass =
  "opacity-85 hover:opacity-100 hover:underline underline-offset-4 transition";

const cardClass = "rounded-2xl border border-white/20 bg-white/15 p-4";
