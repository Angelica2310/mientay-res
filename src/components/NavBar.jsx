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
        className="border-b"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "rgba(0,0,0,0.08)",
        }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link href="/" className="group inline-flex items-center gap-2">
            <div
              className="grid h-auto w-auto place-items-center"
              aria-hidden="true"
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={180}
                height={180}
                priority
              />
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "rounded-xl px-3 py-2 text-sm font-medium transition",
                    "hover:shadow-sm",
                    active && "shadow-sm",
                  )}
                  style={{
                    color: active ? "var(--primary)" : "var(--textMain)",
                    backgroundColor: active
                      ? "rgba(230,198,92,0.25)"
                      : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* CTA (desktop) */}
            <Link
              href="/reservations"
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold transition md:inline-flex"
              style={{
                backgroundColor: "var(--primary)",
                color: "#ffffff",
              }}
            >
              Reserve
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border p-2 md:hidden"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "rgba(0,0,0,0.10)",
                color: "var(--textMain)",
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
        <div
          className="md:hidden"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-4">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-base font-medium transition"
                  style={{
                    color: active ? "var(--primary)" : "var(--textMain)",
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
      )}
    </header>
  );
}
