"use client";

import { useEffect, useRef, useState } from "react";

export default function BambooTable() {
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

  const [scrollDir, setScrollDir] = useState("down");
  const lastScrollY = useRef(0);

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

  const [labelRef, labelVisible] = useReveal({
    threshold: 0.35,
    rootMargin: "0px 0px -10% 0px",
  });
  const [bowlRef, bowlVisible] = useReveal({
    threshold: 0.4,
    rootMargin: "0px 0px -12% 0px",
  });
  const [limeRef, limeVisible] = useReveal({
    threshold: 0.35,
    rootMargin: "0px 0px -12% 0px",
  });
  const [herbsRef, herbsVisible] = useReveal({
    threshold: 0.35,
    rootMargin: "0px 0px -12% 0px",
  });

  const slideIn = (visible, from) => {
    const floatY = scrollDir === "down" ? -16 : 16;
    return {
      transform: visible
        ? `translate3d(0, ${floatY}px, 0)`
        : `translate3d(${from.x}px, ${from.y}px, 0)`,
    opacity: visible ? 1 : 0,
    transition: "transform 700ms ease-out, opacity 700ms ease-out",
    };
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-30">
      <div className="absolute inset-0">
        <img
          src="/bamboo-table.jpg"
          alt="Bamboo table texture"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-2 md:px-6">
        <img
          src="/fresh-authentic.png"
          alt="Fresh & authentic"
          className="w-[230px] md:w-[350px]"
          ref={labelRef}
          style={slideIn(labelVisible, { x: 0, y: -30 })}
        />

        <div className="relative mt-6 h-[240px] w-full max-w-3xl sm:h-[340px] md:h-[500px]">
          <img
            src="/phobowl.png"
            alt="Pho bowl"
            className="absolute left-1/2 top-[-15%] w-[500px] -translate-x-1/2 sm:w-[600px] md:w-[800px]"
            ref={bowlRef}
            style={slideIn(bowlVisible, { x: -40, y: 0 })}
          />
          <img
            src="/lime.png"
            alt="Lime"
            className="absolute left-[5%] top-[70%] w-[140px] sm:w-[210px] md:w-[250px]"
            ref={limeRef}
            style={slideIn(limeVisible, { x: 40, y: 0 })}
          />
          <img
            src="/herbs.png"
            alt="Fresh herbs"
            className="absolute right-[10%] top-[56%] w-[150px] sm:w-[200px] md:w-[250px]"
            ref={herbsRef}
            style={slideIn(herbsVisible, { x: 0, y: 40 })}
          />
        </div>
      </div>
    </section>
  );
}
