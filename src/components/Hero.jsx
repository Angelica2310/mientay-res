"use client";

import Link from "next/link";
import { useMemo } from "react";

const DISHES = [
  {
    name: "Bún Bò Huế",
    desc: "Spicy lemongrass beef noodle soup, rich broth, fresh herbs.",
    price: "£14.50",
    tags: ["Signature", "Spicy"],
    image: "/bun-bo-hue.jpg",
  },
  {
    name: "Cơm Tấm",
    desc: "Broken rice with grilled pork, pickles, scallion oil, fish sauce.",
    price: "£15.00",
    tags: ["Signature"],
    image: "/com-tam.jpg",
  },
  {
    name: "Bánh Xèo",
    desc: "Crispy turmeric crepe, prawns, pork, herbs, lettuce wrap.",
    price: "£13.50",
    tags: ["Crispy"],
    image: "/banh-xeo.jpg",
  },
  {
    name: "Gỏi Cuốn",
    desc: "Fresh summer rolls, herbs, vermicelli served with peanut dip.",
    price: "£7.50",
    tags: ["Fresh", "Vegan option"],
    image: "/goi-cuon.jpg",
  },
  {
    name: "Cà Phê Sữa Đá",
    desc: "Vietnamese iced coffee with sweetened condensed milk.",
    price: "£4.50",
    tags: ["Classic"],
    image: "/ca-phe-sua-da.jpg",
  },
];

function Tag({ children }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{
        backgroundColor: "rgba(230,198,92,0.25)",
        color: "var(--textMain)",
        border: "1px solid rgba(230,198,92,0.45)",
      }}
    >
      {children}
    </span>
  );
}

function DishCard({ dish }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "rgba(0,0,0,0.08)",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Soft gradient for readability */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0) 55%)",
          }}
        />

        {/* Price pill */}
        <div className="absolute left-3 top-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: "rgba(31,79,58,0.92)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {dish.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-base font-semibold tracking-tight md:text-lg"
            style={{ color: "var(--textMain)" }}
          >
            {dish.name}
          </h3>
        </div>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(43,43,43,0.78)" }}
        >
          {dish.desc}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {dish.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>

      {/* Accent corner */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full opacity-40"
        style={{ backgroundColor: "var(--accent)" }}
      />
    </article>
  );
}

export default function Hero() {
  const dishes = useMemo(() => DISHES, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Decorative accents */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-2xl"
        style={{ backgroundColor: "var(--accent)" }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full opacity-15 blur-2xl"
        style={{ backgroundColor: "var(--primary)" }}
      />

      <div className="mx-auto max-w-6xl overflow-x-clip px-4 py-10 md:px-6 md:py-14">
        <div className="grid min-w-0 items-start gap-6 md:grid-cols-12 md:gap-10">
          {/* Left: Copy */}
          <div className="min-w-0 md:col-span-5">
            <p
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                borderColor: "rgba(0,0,0,0.08)",
                color: "var(--textMain)",
              }}
            >
              Authentic • Family-run • Shoreditch
              <span
                className="ml-1 inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--primary)" }}
              />
            </p>

            <h1
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
              style={{ color: "var(--textMain)" }}
            >
              Southwest Vietnamese comfort food,
              <span style={{ color: "var(--primary)" }}> made for sharing</span>
              .
            </h1>

            <p
              className="mt-4 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(43,43,43,0.78)" }}
            >
              From hearty noodle soups to crisp bánh xèo and fresh herbs, Mien
              Tay brings the warmth of home-style Vietnamese cooking into a
              modern, welcoming space.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                className="rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:shadow-md"
                style={{ backgroundColor: "var(--primary)", color: "#fff" }}
              >
                View Menu
              </Link>

              <Link
                href="/reservations"
                className="rounded-xl px-5 py-3 text-sm font-semibold transition"
                style={{
                  backgroundColor: "rgba(230,198,92,0.25)",
                  color: "var(--textMain)",
                  border: "1px solid rgba(230,198,92,0.55)",
                }}
              >
                Reserve a Table
              </Link>

              <div className="ml-0 mt-2 w-full text-sm md:ml-2 md:mt-0 md:w-auto">
                <span style={{ color: "rgba(43,43,43,0.7)" }}>
                  Open daily • Shoreditch, London
                </span>
              </div>
            </div>

            {/* Quick highlights */}
            <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { k: "10+ Years", v: "Serving Shoreditch" },
                { k: "100+ Dishes", v: "Freshly prepared" },
                { k: "Up to 60 Guests", v: "Private & group dining" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-xl border py-2 text-center shadow-sm sm:rounded-2xl sm:p-3"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.55)",
                    borderColor: "rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="text-base font-semibold leading-none sm:text-lg md:text-xl"
                    style={{ color: "var(--textMain)" }}
                  >
                    {item.k}
                  </div>
                  <div
                    className="mt-0.5 text-[10px] leading-tight sm:text-xs"
                    style={{ color: "rgba(43,43,43,0.7)" }}
                  >
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Signature dishes */}
          <div className="min-w-0 md:col-span-7">
            <div className="flex items-end justify-between gap-3">
              <h2
                className="text-lg font-semibold tracking-tight md:text-xl"
                style={{ color: "var(--textMain)" }}
              >
                Signature dishes
              </h2>

              <Link
                href="/menu"
                className="text-sm font-semibold underline-offset-4 hover:underline"
                style={{ color: "var(--primary)" }}
              >
                See full menu
              </Link>
            </div>

            {/* Mobile: horizontal scroll | Desktop: grid */}
            <div className="mt-4">
              <div className="md:hidden">
                <div className="flex gap-4 overflow-x-auto pb-2 pr-1">
                  {dishes.map((dish) => (
                    <div key={dish.name} className="min-w-[78%]">
                      <DishCard dish={dish} />
                    </div>
                  ))}
                </div>
                <p
                  className="mt-2 text-xs"
                  style={{ color: "rgba(43,43,43,0.65)" }}
                >
                  Swipe to explore dishes →
                </p>
              </div>

              <div className="hidden gap-4 md:grid md:grid-cols-2">
                {dishes.slice(0, 4).map((dish) => (
                  <DishCard key={dish.name} dish={dish} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
