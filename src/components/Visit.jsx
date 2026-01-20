"use client";

export default function Visit() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* animated background */}
      <div
        aria-hidden
        className="absolute inset-0 animate-bgFloat"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(230,198,92,0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(31,79,58,0.12), transparent 50%)",
        }}
      />

      {/* marquee */}
      <div className="pointer-events-none relative mb-12 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-center">
          <span
            className="mx-6 text-xl md:text-4xl font-semibold tracking-wide"
            style={{ color: "rgba(43,43,43,0.35)" }}
          >
            Shoreditch • Open Daily • Family Run • Vietnamese Kitchen
          </span>
          <span
            className="mx-6 text-xl md:text-4xl font-semibold tracking-wide"
            style={{ color: "rgba(43,43,43,0.35)" }}
          >
            Shoreditch • Open Daily • Family Run • Vietnamese Kitchen
          </span>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1.2fr_1fr] md:items-stretch md:px-6">
        {/* Map */}
        <div className="overflow-hidden rounded-3xl shadow-sm backdrop-blur-sm">
          <iframe
            title="Mien Tay Vietnamese Kitchen map"
            src="https://www.google.com/maps?q=106-108%20Kingsland%20Rd,%20London%20E2%208DP&output=embed"
            className="h-80 w-full md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info card */}
        <div
          className="rounded-3xl border p-6 shadow-sm backdrop-blur-sm md:p-8"
          style={{
            backgroundColor: "rgba(255,255,255,0.75)",
            borderColor: "rgba(0,0,0,0.08)",
          }}
        >
          <h2
            className="text-2xl font-semibold md:text-3xl"
            style={{ color: "var(--textMain)" }}
          >
            Visit Us
          </h2>

          <div className="mt-5 space-y-4 text-sm md:text-base">
            <div>
              <p className="font-semibold" style={{ color: "var(--textMain)" }}>
                Address
              </p>
              <p style={{ color: "rgba(43,43,43,0.78)" }}>
                106–108 Kingsland Rd, London E2 8DP
              </p>
            </div>

            <div>
              <p className="font-semibold" style={{ color: "var(--textMain)" }}>
                Opening Hours
              </p>
              <p style={{ color: "rgba(43,43,43,0.78)" }}>Sun–Thu 12–10:30pm</p>
              <p style={{ color: "rgba(43,43,43,0.78)" }}>Fri–Sat 12–11pm</p>
            </div>

            <div>
              <p className="font-semibold" style={{ color: "var(--textMain)" }}>
                Contact
              </p>
              <p style={{ color: "rgba(43,43,43,0.78)" }}>Tel: 020 7739 3841</p>
              <p style={{ color: "rgba(43,43,43,0.78)" }}>
                Email: ivythien02@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* animations */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 28s linear infinite;
        }

        @keyframes bgFloat {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-bgFloat {
          animation: bgFloat 18s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
