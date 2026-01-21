"use client";
import { useEffect, useState } from "react";

const REVIEWS = [
  {
    source: "Time Out London",
    logo: "/timeout-london.png",
    quote:
      "The stunner of our meal was deep-fried sea bass with fish sauce and mango — a pure harmony of flavours and textures.",
  },
  {
    source: "The Sunday Times",
    logo: "/sunday-times.png",
    quote:
      "Mien Tay may well be the best Vietnamese restaurant in London — worth going out of your way for.",
  },
  {
    source: "London Evening Standard",
    logo: "/evening-standard.png",
    quote:
      "Captivating food and bold flavours — dishes made to be shared and remembered.",
  },
  {
    source: "View London",
    logo: "/view-london.png",
    quote:
      "Astonishingly friendly staff and food that makes you feel like you’ve been welcomed into their home.",
  },
  {
    source: "Metro",
    logo: "/metro.png",
    quote:
      "If you only eat one restaurant dish this year, make it one of Mien Tay’s starters.",
  },
  {
    source: "Cool Places",
    logo: "/cool-place.png",
    quote:
      "Eating Vietnamese is an essential Shoreditch and Hackney experience (Kingsland Road has been rechristened ‘Pho Road’ for the huge number of basic and refreshingly cheap Vietnamese noodle restaurants) and Mien Tay is one of the best places to do it, serving authentic and beautifully presented south Vietnamese cuisine. ",
  },
  {
    source: "The Nudge",
    logo: "/nudge.png",
    quote:
      "The perennially popular Mien Tay is a family-run spot serving generous portions of spice-laced curries (served in clay pots) as well as more adventurous dishes including stir-fried frogs legs",
  },
  {
    source: "Made in Shoreditch Magazine",
    logo: "/made-in-shoreditch.png",
    quote:
      "Mien Tay is where you go for no-frills, flavour-packed Vietnamese food. Their garlic butter prawns are legendary, and their beef pho is as authentic as it gets. Run by a Vietnamese family, this spot feels like a proper home-cooked meal—if your family happened to be incredible chefs.",
  },
  {
    source: "Hoxton Radio",
    logo: "/hoxton-radio.png",
    quote:
      "At Mien Tay on Kingsland Road I was more than happy to let someone else order, my head spinning from an afternoon of drinking. Nothing at Mien Tay could be faulted, even the tofu pancake was good. Soft shell crab in a spicy batter, fried quail with a spicy dusting, summer rolls with a spicy dip.",
  },
];

export default function ReviewsSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % REVIEWS.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);

  const review = REVIEWS[index];

  return (
    <section className="relative py-16 md:py-20">
      {/* Rice paper background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/reviewbg.jpg')",
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          opacity: 0.65,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        <h2
          className="mb-10 text-center text-2xl font-semibold md:text-3xl"
          style={{ color: "var(--textMain)" }}
        >
          Reviews
        </h2>

        {/* Card */}
        <div
          key={index}
          className="mx-auto flex min-h-65 max-w-2xl flex-col justify-center rounded-3xl border p-6 text-center shadow-sm transition-opacity duration-500 md:min-h-75 md:p-8"
          style={{
            backgroundColor: "rgba(255,255,255,0.75)",
            borderColor: "rgba(0,0,0,0.08)",
          }}
        >
          <img
            src={review.logo}
            alt={`${review.source} logo`}
            className="mx-auto mb-5 h-15 md:h-20 w-auto max-w-[180px] object-contain"
          />

          <p
            className="text-sm leading-relaxed md:text-base"
            style={{ color: "rgba(43,43,43,0.78)" }}
          >
            “{review.quote}”
          </p>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="h-2 w-2 rounded-full transition"
              style={{
                backgroundColor:
                  i === index ? "var(--primary)" : "rgba(0,0,0,0.25)",
              }}
              aria-label={`Show review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
