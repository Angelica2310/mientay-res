"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroBreakImage() {
  const [visible, setVisible] = useState(false);
  const [scrollDir, setScrollDir] = useState("down");
  const captionRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const node = captionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20% 0px",
      },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current) {
        setScrollDir("down");
      } else if (currentY < lastScrollY.current) {
        setScrollDir("up");
      }
      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-130 w-full md:h-[85vh]">
      <img
        src="/hero-break.jpg"
        alt="Vietnamese dishes made for sharing"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* soft overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.18))",
        }}
      />

      {/* subtle caption (optional) */}
      <div className="absolute left-4 right-4 top-[35%] md:left-12 md:right-auto md:top-[38%]">
        <div
          ref={captionRef}
          className="inline-block max-w-2xl transition duration-500 ease-out"
          style={{
            transform: visible
              ? `rotate(-2.5deg) translateY(${
                  scrollDir === "down" ? "-12px" : "12px"
                })`
              : "rotate(0deg) translateY(18px)",
            opacity: visible ? 1 : 0,
          }}
        >
          <img
            src="/fresh-authentic.png"
            alt="Fresh & authentic"
            className="h-40 w-auto md:h-60 lg:h-80"
          />
        </div>
      </div>
    </section>
  );
}
