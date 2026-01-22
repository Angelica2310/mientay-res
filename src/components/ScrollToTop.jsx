"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 0);
      if (maxScroll === 0) {
        setVisible(false);
        return;
      }
      setVisible(window.scrollY > maxScroll / 4);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      className={`fixed cursor-pointer bottom-6 right-6 z-50 p-3 transition duration-300 md:bottom-8 md:right-8 ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-2"
      }`}
    >
      <img src="/up-arrow.png" alt="" className="h-11 w-11 md:h-18 md:w-18" />
    </button>
  );
}
