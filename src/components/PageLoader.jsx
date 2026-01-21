"use client";

import { useEffect, useMemo, useState } from "react";

function shouldShowLoader() {
  if (typeof window === "undefined") return false;
  const key = "mt_loader_shown";
  return !window.sessionStorage.getItem(key);
}

export default function PageLoader() {
  const key = useMemo(() => "mt_loader_shown", []);

  // ✅ Decide immediately on first client render (prevents flash)
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const show = !window.sessionStorage.getItem(key);
    if (show) window.sessionStorage.setItem(key, "true"); // mark immediately
    return show;
  });

  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;

    setLeaving(false);
    setProgress(0);

    const durationMs = 3200;
    const startTime = Date.now();

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const nextValue = Math.min(100, Math.round(eased * 100));
      setProgress(nextValue);
      if (nextValue >= 100) window.clearInterval(interval);
    }, 60);

    const timeout = window.setTimeout(() => {
      setLeaving(true);
      window.setTimeout(() => setVisible(false), 350);
    }, durationMs);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[60] flex items-center justify-center",
        "transition-opacity duration-300",
        leaving ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/loading-image.jpg"
          alt="Mien Tay interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      {/* Card */}
      <div
        className={[
          "relative w-[320px] max-w-[92vw]",
          "rounded-3xl border border-white/20",
          "bg-white/14 backdrop-blur-2xl shadow-2xl",
          "px-7 py-7",
          "transition-transform duration-300",
          leaving ? "scale-[0.98]" : "scale-100",
        ].join(" ")}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Mien Tay"
              className="h-14 w-auto drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
            />
            <p className="mt-2 text-xs tracking-[0.22em] text-white/80 uppercase">
              Shoreditch
            </p>
          </div>

          <p className="text-sm font-medium text-white/90">
            Preparing your table…
          </p>

          <div className="h-1.5 w-52 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white/85 transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-[11px] text-white/65">
            Authentic Vietnamese comfort food
          </p>
        </div>
      </div>
    </div>
  );
}
