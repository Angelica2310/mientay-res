"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const SLIDES = [
  {
    title: "Bún Bò Huế",
    subtitle: "Spicy lemongrass broth • fresh herbs • slow-cooked beef",
    image: "/bun-bo-hue.jpg",
    alt: "Bún bò Huế noodle soup with herbs",
    tag: "Signature",
  },
  {
    title: "Bánh Xèo",
    subtitle: "Crispy turmeric crepe • prawns • pork • lettuce wrap",
    image: "/banh-xeo.jpg",
    alt: "Bánh xèo crispy Vietnamese crepe",
    tag: "Crispy",
  },
  {
    title: "Cơm Tấm",
    subtitle: "Grilled pork • broken rice • pickles • fish sauce",
    image: "/com-tam.jpg",
    alt: "Cơm tấm with grilled pork and rice",
    tag: "Classic",
  },
  {
    title: "Gỏi Cuốn",
    subtitle: "Fresh summer rolls • peanut dip • light & bright",
    image: "/goi-cuon.jpg",
    alt: "Vietnamese summer rolls with peanut sauce",
    tag: "Fresh",
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeroSlideshow() {
  const slides = useMemo(() => SLIDES, []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const goTo = (i) => setIndex((i + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);

    return () => clearInterval(intervalRef.current);
  }, [paused, slides.length]);

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const active = slides[index];

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Signature dishes slideshow"
    >
      {/* Slide Images (fade) */}
      <div className="relative h-[68vh] min-h-[520px] w-full md:h-[78vh]">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className={cx(
              "absolute inset-0 transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={i !== index}
          >
            <img
              src={s.image}
              alt={s.alt}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />

            {/* Overlay for readability */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.12) 70%, rgba(0,0,0,0.00) 100%)",
              }}
            />

            {/* Subtle vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(1200px 700px at 20% 40%, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
                opacity: 0.55,
              }}
            />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center px-15 md:px-20">
            <div className="max-w-xl">
              {/* Tag */}
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                {active.tag}
              </div>

              {/* Headline */}
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                Mien Tay
              </h1>

              <p className="mt-2 text-lg font-semibold tracking-wide text-white/90">
                Vietnamese Kitchen • Shoreditch
              </p>

              <p className="mt-6 text-base leading-relaxed text-white/85 md:text-lg">
                <span className="font-semibold text-white">{active.title}</span>{" "}
                — {active.subtitle}
              </p>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/menu"
                  className="rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:shadow-md"
                  style={{ backgroundColor: "var(--accent)", color: "#1b1b1b" }}
                >
                  View Menu
                </Link>

                <Link
                  href="/reservations"
                  className="rounded-xl border px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  style={{
                    borderColor: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Reserve a Table
                </Link>
              </div>

              {/* Mini controls */}
              <div className="mt-8 flex items-center gap-3">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={cx(
                        "h-2.5 w-2.5 rounded-full transition",
                        i === index
                          ? "scale-110"
                          : "opacity-60 hover:opacity-90",
                      )}
                      style={{
                        backgroundColor:
                          i === index
                            ? "var(--accent)"
                            : "rgba(255,255,255,0.75)",
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>

                {/* Slide count */}
                <div className="text-xs font-semibold text-white/75">
                  {index + 1} / {slides.length}
                </div>

                {/* Pause indicator */}
                <div className="ml-2 text-xs text-white/70">
                  {paused ? "Paused" : "Auto"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-1 md:px-2">
          <div className="mx-auto flex max-w-6xl justify-between">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border p-2 md:p-2.5 text-white/90 transition hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
              aria-label="Previous slide"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              className="rounded-full border p-2 md:p-2.5 text-white/90 transition hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
              aria-label="Next slide"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
