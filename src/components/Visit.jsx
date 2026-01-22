"use client";

import { useEffect, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";

function MapboxGLMap({
  lng,
  lat,
  zoom = 15.6,
  styleUrl = "mapbox://styles/mapbox/streets-v12",
  className = "",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Create map once
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.warn("Missing NEXT_PUBLIC_MAPBOX_TOKEN in .env.local");
      return;
    }
    if (!containerRef.current) return;
    if (mapRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: styleUrl,
      center: [lng, lat],
      zoom,
      bearing: -10, // subtle “designed” angle (optional)
      pitch: 0,
      attributionControl: true,
    });

    // Calm / editorial controls
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    // Avoid the big “two fingers / cmd+scroll” overlay
    map.scrollZoom.disable();

    map.on("load", () => {
      const layers = map.getStyle().layers || [];

      // Hide POI layers (restaurants/shops etc.)
      layers.forEach((layer) => {
        const id = layer.id || "";
        if (id.includes("poi") || id.includes("point-of-interest")) {
          try {
            map.setLayoutProperty(id, "visibility", "none");
          } catch {}
        }
      });
    });

    // Marker
    let marker;
    new mapboxgl.Marker({ color: "#1f4f3a" }).setLngLat([lng, lat]).addTo(map);

    // Custom ▲ ▼ zoom controls
    const zoomControls = document.createElement("div");
    zoomControls.className = "mt-zoom-controls";

    const mkBtn = (label, onClick) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mt-zoom-btn";
      btn.setAttribute("aria-label", label === "▲" ? "Zoom in" : "Zoom out");
      btn.innerHTML = label;
      btn.addEventListener("click", onClick);
      return btn;
    };

    zoomControls.appendChild(mkBtn("▲", () => map.zoomIn()));
    zoomControls.appendChild(mkBtn("▼", () => map.zoomOut()));
    map.getContainer().appendChild(zoomControls);

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      try {
        zoomControls.remove();
      } catch {}
      map.remove();
      markerRef.current = null;
      mapRef.current = null;
    };
  }, []);

  // Update map when props change (style/center/zoom)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Update style (safe to call even if same; Mapbox will reload if different)
    if (styleUrl) {
      try {
        map.setStyle(styleUrl);
      } catch {}
    }

    // Update camera
    try {
      map.easeTo({ center: [lng, lat], zoom, duration: 600 });
    } catch {}

    // Update marker position
    if (markerRef.current) {
      try {
        markerRef.current.setLngLat([lng, lat]);
      } catch {}
    }
  }, [lng, lat, zoom, styleUrl]);

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-sm ${className}`}
    >
      <div ref={containerRef} className="h-[380px] w-full md:h-full" />
    </div>
  );
}

export default function Visit() {
  const data = useMemo(
    () => ({
      marquee: "Shoreditch • Open Daily • Family Run • Vietnamese Kitchen",
      addressDisplay: "106–108 Kingsland Rd, London E2 8DP",
      destination: "Mien Tay Kingsland Road, E2 8DP",
      phoneDisplay: "020 7739 3841",
      phoneHref: "+442077393841",
      email: "ivythien02@gmail.com",

      // ✅ Ensure correct order: lng (negative for London), lat (positive)
      lng: -0.07717,
      lat: 51.5301,

      // Detail sweet spot
      zoom: 15.6,

      // More detail than light-v11
      styleUrl: "mapbox://styles/mapbox/streets-v12",
    }),
    [],
  );

  const destEncoded = encodeURIComponent(data.destination);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destEncoded}`;
  const openMapUrl = `https://www.google.com/maps?q=${destEncoded}`;

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* background wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(230,198,92,0.12), transparent 55%), radial-gradient(circle at 80% 10%, rgba(31,79,58,0.10), transparent 55%), linear-gradient(180deg, rgba(239,231,219,0.0), rgba(239,231,219,0.85))",
        }}
      />

      {/* marquee */}
      <div className="pointer-events-none relative mb-10 overflow-hidden">
        <div className="marquee-track">
          <span className="marquee-item text-xl font-semibold tracking-wide text-black/30 md:text-4xl">
            {data.marquee}
          </span>
          <span className="marquee-item text-xl font-semibold tracking-wide text-black/30 md:text-4xl">
            {data.marquee}
          </span>
          <span className="marquee-item text-xl font-semibold tracking-wide text-black/30 md:text-4xl">
            {data.marquee}
          </span>
          <span className="marquee-item text-xl font-semibold tracking-wide text-black/30 md:text-4xl">
            {data.marquee}
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.35fr_0.9fr] md:items-start">
          {/* Map + actions */}
          <div className="md:h-[520px] md:flex md:flex-col">
            <MapboxGLMap
              lng={data.lng}
              lat={data.lat}
              zoom={data.zoom}
              styleUrl={data.styleUrl}
              useCustomPin={true}
              className="md:flex-1"
            />

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                Get directions
              </a>

              <a
                href={openMapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm font-semibold text-(--textMain) shadow-sm backdrop-blur transition hover:bg-white"
              >
                Open in Google Maps
              </a>
            </div>
            <p className="mt-4 text-sm text-black/55">
              Tip: Use the ▲ ▼ buttons to zoom, then click “Get directions” for
              live navigation.
            </p>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="rounded-[1.75rem] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur md:p-7 md:h-105">
              <h2 className="text-2xl font-semibold text-(--textMain)">
                Visit us
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/55">
                    Address
                  </p>
                  <p className="mt-2 text-base text-(--textMain)">
                    {data.addressDisplay}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard?.writeText(data.addressDisplay)
                    }
                    className="mt-3 text-sm font-semibold text-(--textMain) underline decoration-black/20 underline-offset-4 transition hover:decoration-black/40"
                  >
                    Copy address
                  </button>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/55">
                    Opening hours
                  </p>
                  <div className="mt-2 space-y-1 text-base text-black/70">
                    <div className="flex items-baseline gap-3">
                      <span className="w-20 text-(--textMain)">Sun–Thu</span>
                      <span>12–10:30pm</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="w-20 text-(--textMain)">Fri–Sat</span>
                      <span>12–11pm</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/55">
                    Contact
                  </p>
                  <div className="mt-2 space-y-2 text-base">
                    <a
                      href={`tel:${data.phoneHref}`}
                      className="block text-(--textMain) underline decoration-black/20 underline-offset-4 transition hover:decoration-black/40"
                    >
                      {data.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${data.email}`}
                      className="block text-black/70 underline decoration-black/20 underline-offset-4 transition hover:decoration-black/40"
                    >
                      {data.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* marquee + zoom button styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-item {
          white-space: nowrap;
          padding: 0 1.5rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
        }

        :global(.mt-zoom-controls) {
          position: absolute;
          right: 12px;
          bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
        }
        :global(.mt-zoom-btn) {
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(6px);
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        :global(.mt-zoom-btn:hover) {
          background: rgba(255, 255, 255, 1);
        }
      `}</style>
    </section>
  );
}
