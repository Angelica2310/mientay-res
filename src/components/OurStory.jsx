"use client";

import { useEffect, useRef, useState } from "react";

export default function OurStorySection() {
  const points = [
    { k: "Mekong roots", v: "Inspired by the Southwest of Vietnam" },
    { k: "Family-run", v: "Home-style recipes, cooked with care" },
    { k: "Fresh & vibrant", v: "Herbs, balance, and shareable plates" },
  ];
  const fadeUp = (visible) => ({
    transform: visible ? "translateY(0px)" : "translateY(28px)",
    opacity: visible ? 1 : 0,
    transition: "transform 650ms ease-out, opacity 650ms ease-out",
  });

  const useReveal = (options) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      const node = ref.current;
      if (!node) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(node);
          }
        },
        options,
      );
      observer.observe(node);
      return () => observer.disconnect();
    }, [options]);
    return [ref, visible];
  };

  const [textRef, textVisible] = useReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -12% 0px",
  });
  const [quoteRef, quoteVisible] = useReveal({
    threshold: 0.25,
    rootMargin: "0px 0px -12% 0px",
  });
  const [pointsRef, pointsVisible] = useReveal({
    threshold: 0.25,
    rootMargin: "0px 0px -12% 0px",
  });
  const [imageRef, imageVisible] = useReveal({
    threshold: 0.35,
    rootMargin: "0px 0px -18% 0px",
  });

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div
          className="relative overflow-hidden rounded-[28px] border p-6 shadow-sm md:p-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))",
            borderColor: "rgba(0,0,0,0.08)",
          }}
        >
          {/* subtle decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(31,79,58,0.18)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(230,198,92,0.18)" }}
          />

          <div className="relative grid min-w-0 items-center gap-10 md:grid-cols-12">
            {/* LEFT: text */}
            <div className="min-w-0 md:col-span-7">
              <div ref={textRef} style={fadeUp(textVisible)}>
                <div className="flex flex-wrap items-center gap-2">
                  {["Our story", "Southwest Vietnam", "Made for sharing"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.55)",
                          borderColor: "rgba(0,0,0,0.08)",
                          color: "var(--textMain)",
                        }}
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>

                <h2
                  className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl"
                  style={{ color: "var(--textMain)" }}
                >
                  A taste of the Mekong Delta,{" "}
                  <span style={{ color: "var(--primary)" }}>
                    brought to Shoreditch
                  </span>
                  .
                </h2>

                <p
                  className="mt-4 text-base leading-relaxed md:text-lg"
                  style={{ color: "rgba(43,43,43,0.78)" }}
                >
                  Miền Tây is named after the Southwest of Vietnam, where rivers
                  shape the land, herbs are picked fresh, and meals are meant to
                  be shared. Cooking is unhurried, flavours are carefully
                  balanced, and food is how you welcome people in.
                </p>

                <p
                  className="mt-4 text-base leading-relaxed md:text-lg"
                  style={{ color: "rgba(43,43,43,0.78)" }}
                >
                  Our family-run kitchen draws from home-style recipes passed
                  down and refined over time. From broths simmered for hours to
                  crisp bánh xèo and vibrant herbs, every dish is prepared with
                  care and respect for tradition.
                </p>
              </div>

              {/* quote highlight */}
              <div
                ref={quoteRef}
                className="mt-6 rounded-2xl border p-4 md:p-5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.55)",
                  borderColor: "rgba(0,0,0,0.08)",
                  ...fadeUp(quoteVisible),
                }}
              >
                <p
                  className="text-sm md:text-base"
                  style={{ color: "rgba(43,43,43,0.8)" }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: "var(--textMain)" }}
                  >
                    Our philosophy:
                  </span>{" "}
                  comfort food with bright herbs, shared plates, and the warmth
                  of home.
                </p>
              </div>

              {/* mini points */}
              <div
                ref={pointsRef}
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
                style={fadeUp(pointsVisible)}
              >
                {points.map((p) => (
                  <div
                    key={p.k}
                    className="min-w-0 rounded-2xl border p-4"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.55)",
                      borderColor: "rgba(0,0,0,0.08)",
                    }}
                  >
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "var(--textMain)" }}
                    >
                      {p.k}
                    </div>
                    <div
                      className="mt-1 text-xs leading-relaxed"
                      style={{ color: "rgba(43,43,43,0.7)" }}
                    >
                      {p.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: image */}
            <div
              ref={imageRef}
              className="min-w-0 md:col-span-5"
              style={fadeUp(imageVisible)}
            >
              <div className="overflow-hidden rounded-[26px] border-white/20 shadow-sm">
                <div className="aspect-[4/5] w-full">
                  <img
                    src="/our-story.jpg"
                    alt="Shared Vietnamese dishes at Miền Tây"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* small caption */}
              <p
                className="mt-3 text-xs"
                style={{ color: "rgba(43,43,43,0.65)" }}
              >
                Fresh herbs, slow-cooked broths, and plates designed for
                sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
