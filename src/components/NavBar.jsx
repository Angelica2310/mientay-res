"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Private Dining", href: "/private-dining" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_PRIORITY = [
  { label: "Menu", href: "/menu" },
  { label: "Book", href: "/book" },
];

const MOBILE_DROPDOWN_ITEMS = NAV_ITEMS.filter(
  (item) => item.href !== "/menu" && item.href !== "/book",
);

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const deliveryUrl =
    "https://deliveroo.co.uk/menu/london/haggerston/mien-tay-kingsland-road?utm_medium=affiliate&utm_source=google_maps_link&fulfillment_type=DELIVERY";
  const phoneNumber = "020 7739 3841";

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setDeliveryOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const items = useMemo(() => NAV_ITEMS, []);
  const mobileScrolled = scrolled && !isDesktop;
  const showScrollBg = mobileScrolled;
  const isAltLogoRoute = [
    "/contact",
    "/menu",
    "/gallery",
    "/private-dining",
  ].some((route) => pathname?.startsWith(route));

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full md:static">
      {/* Top bar */}
      <div
        className="transition-colors duration-200"
        style={{
          backgroundColor: showScrollBg
            ? "rgba(255,255,255,0.72)"
            : "transparent",
          borderColor: showScrollBg
            ? "rgba(0,0,0,0.08)"
            : "rgba(255,255,255,0.18)",
          backdropFilter: showScrollBg ? "blur(10px)" : "none",
        }}
      >
        <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
          {/* Left: Logo */}
          <Link
            href="/"
            className="inline-flex items-center rounded-2xl px-3 py-2"
            aria-label="Go to home page"
          >
            <img
              src={
                isAltLogoRoute || mobileScrolled ? "/logo1.png" : "/logo.png"
              }
              alt="Mien Tay Vietnamese Kitchen"
              className="h-18 w-auto md:h-30"
            />
          </Link>

          {/* Middle: Mobile items (even spacing) */}
          <div className="ml-auto flex md:hidden">
            <div className="flex items-center justify-between gap-2">
              {MOBILE_PRIORITY.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cx(
                      "rounded-full border border-black/10 bg-(--primary)/10 px-3 py-1.5 text-sm font-semibold shadow-sm backdrop-blur-md transition",
                      mobileScrolled || isAltLogoRoute
                        ? "text-black"
                        : "text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="relative">
                <button
                  type="button"
                  className={cx(
                    "rounded-full px-3 py-1.5 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer,",
                    isAltLogoRoute ? "text-black" : "",
                  )}
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "#fff",
                  }}
                  onClick={() => setDeliveryOpen((v) => !v)}
                  aria-expanded={deliveryOpen}
                  aria-haspopup="menu"
                >
                  Delivery
                </button>
                {deliveryOpen && (
                  <div
                    className="absolute right-0 top-[46px] z-50 w-52 overflow-hidden rounded-lg border shadow-md backdrop-blur-md"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderColor: "rgba(0,0,0,0.08)",
                    }}
                  >
                    <a
                      href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold leading-5 transition-colors"
                      style={{ color: "var(--textMain)" }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 4h5l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v5c-8.84 0-16-7.16-16-16Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Call to Order
                    </a>
                    <div className="h-px w-full bg-black/10" />
                    <a
                      href={deliveryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold leading-5 transition-colors"
                      style={{ color: "var(--textMain)" }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 7h13l3 4v6H3V7Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 7V5H3v2"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <circle cx="7" cy="17" r="1.5" fill="currentColor" />
                        <circle cx="17" cy="17" r="1.5" fill="currentColor" />
                      </svg>
                      Deliveroo
                    </a>
                  </div>
                )}
              </div>

              <button
                type="button"
                className={cx(
                  "inline-flex items-center justify-center rounded-xl border border-black/10 bg-(--primary)/10 p-2 shadow-sm backdrop-blur-md",
                  mobileScrolled || isAltLogoRoute ? "text-black" : "text-white",
                )}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {open ? (
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden flex-1 items-center justify-center gap-4 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "rounded-full border border-black/10 bg-white/30 px-3 py-1.5 text-sm font-semibold shadow-sm backdrop-blur-md transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
                    isAltLogoRoute ? "text-black" : "text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Desktop-only spacer */}
          <div className="ml-auto hidden items-center gap-2 md:flex" />
        </nav>
      </div>

      {/* Fixed desktop CTAs */}
      <div className="fixed right-6 top-4 z-50 hidden items-center gap-2 md:flex">
        <div className="relative">
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: "var(--accent)",
              color: "#000",
            }}
            onClick={() => setDeliveryOpen((v) => !v)}
            aria-expanded={deliveryOpen}
            aria-haspopup="menu"
          >
            Delivery
          </button>
          {deliveryOpen && (
            <div
              className="absolute right-0 top-[46px] z-50 w-56 overflow-hidden rounded-lg border shadow-md backdrop-blur-md cursor-pointer"
              style={{
                backgroundColor: "rgba(255,255,255,0.75)",
                borderColor: "rgba(0,0,0,0.08)",
              }}
            >
              <a
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold leading-5 transition-colors"
                style={{ color: "var(--textMain)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 4h5l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v5c-8.84 0-16-7.16-16-16Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Call to Order
              </a>
              <div className="h-px w-full bg-black/10" />
              <a
                href={deliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold leading-5 transition-colors"
                style={{ color: "var(--textMain)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7h13l3 4v6H3V7Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 7V5H3v2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <circle cx="7" cy="17" r="1.5" fill="currentColor" />
                  <circle cx="17" cy="17" r="1.5" fill="currentColor" />
                </svg>
                Deliveroo
              </a>
            </div>
          )}
        </div>

        <Link
          href="/reservations"
          className="rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          Reserve
        </Link>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
            onClick={() => setOpen(false)}
          >
            {/* Glass panel */}
            <div
              className="fixed left-0 right-0 top-[72px] z-50 mx-auto w-[92%] max-w-md overflow-hidden rounded-3xl border"
              style={{
                backgroundColor: "rgba(255,255,255,0.45)",
                borderColor: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div className="p-3">
                {MOBILE_DROPDOWN_ITEMS.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-4 py-3 text-base font-medium transition hover:bg-[rgba(230,198,92,0.75)] active:bg-[rgba(230,198,92,0.75)]"
                      style={{
                        color: "var(--textMain)",
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
