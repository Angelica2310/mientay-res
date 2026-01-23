"use client";

import Image from "next/image";
import Link from "next/link";

const images = Array.from({ length: 9 }, (_, i) => ({
  src: `/gallery0${i + 1}.jpg`,
  alt: `Mien Tay gallery image ${i + 1}`,
}));

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-(--background) px-4 mt-30">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-md shadow-sm border-black/10 bg-white/30 ">
            <span className="text-xs tracking-[0.18em] uppercase opacity-80">
              Mien Tay Restaurant
            </span>
            <span className="h-1 w-1 rounded-full bg-(--primary)" />
            <span className="text-xs opacity-80">Shoreditch • Hackney</span>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-light leading-[1.05] ">
            Gallery moments
          </h1>

          <p className="mt-4 md:mt-10 max-w-2xl text-md md:text-xl opacity-90">
            A glimpse into our food, space, and moments at Mien Tay — where
            authentic Vietnamese comfort meets a warm, modern atmosphere.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-black/5"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index < 3}
            />

            {/* Soft overlay */}
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          </div>
        ))}
      </section>

      {/* Menu Button */}
      <section className="mx-auto mt-16 text-center">
        <Link
          href="/menu"
          className="inline-flex items-center justify-center rounded-full border border-[-primary]/40 px-8 py-3 text-sm tracking-wide text-[-textMain] transition"
        >
          View Menu
        </Link>
      </section>
    </main>
  );
}
