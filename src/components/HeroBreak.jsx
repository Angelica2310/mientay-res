export default function HeroBreakImage() {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full md:h-[85vh]">
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
      <div className="absolute bottom-6 left-4 right-4 md:bottom-10 md:left-10 md:right-10">
        <p
          className="max-w-xl text-sm md:text-base"
          style={{ color: "#efe7db" }}
        >
          A warm, welcoming dining room in the heart of Shoreditch.
        </p>
      </div>
    </section>
  );
}
