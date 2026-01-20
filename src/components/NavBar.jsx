"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Private Dining", href: "/private-dining" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_PRIORITY = [
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_DROPDOWN_ITEMS = NAV_ITEMS.filter(
  (item) => item.href !== "/menu" && item.href !== "/contact",
);

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = useMemo(() => NAV_ITEMS, []);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div
        className="bg-transparent"
        style={{ borderColor: "rgba(255,255,255,0.18)" }}
      >
        <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
          {/* Left: Logo */}
          <div className="inline-flex items-center rounded-2xl px-3 py-2">
            <img
              src="/logo.png"
              alt="Mien Tay Vietnamese Kitchen"
              className="h-18 w-auto md:h-30"
            />
          </div>

          {/* Middle: Mobile Menu + Contact (centered) */}
          <div className="flex flex-1 justify-center md:hidden">
            <div className="flex items-center gap-5">
              {MOBILE_PRIORITY.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-3 py-1.5 text-sm font-semibold transition"
                    style={{
                      backgroundColor: active
                        ? "rgba(255,255,255,0.22)"
                        : "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
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
                  className="rounded-full px-3 py-1.5 text-sm font-semibold transition"
                  style={{
                    backgroundColor: active
                      ? "rgba(255,255,255,0.22)"
                      : "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Reserve (desktop) + Burger (mobile) */}
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/reservations"
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold transition md:inline-flex"
              style={{ backgroundColor: "var(--primary)", color: "#fff" }}
            >
              Reserve
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border p-2 md:hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
              }}
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
        </nav>
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
                backgroundColor: "rgba(255,255,255,0.16)",
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
                      className="block rounded-xl px-4 py-3 text-base font-medium transition"
                      style={{
                        color: "rgba(255,255,255,0.92)",
                        backgroundColor: active
                          ? "rgba(230,198,92,0.25)"
                          : "transparent",
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <Link
                  href="/reservations"
                  className="mt-3 inline-flex w-full justify-center rounded-xl px-4 py-3 text-base font-semibold"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "#ffffff",
                  }}
                >
                  Reserve
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
