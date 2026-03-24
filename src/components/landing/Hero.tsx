"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import type { HeroSlide } from "@/lib/public-content";

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const slide = slides[currentIndex];

  return (
    <header className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-16 left-10 z-20 max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-3 text-sm font-medium tracking-wide text-white/70">
              {slide.date}
              <span className="mx-3 text-white/30">/</span>
              <span className="font-semibold text-white/90">{slide.category}</span>
            </p>

            <h1 className="mb-6 font-headline text-5xl font-black leading-[1] tracking-tighter text-white md:text-7xl">
              {slide.title}
            </h1>

            <div className="mt-8 flex items-center gap-6">
              <Link href={`/adventures/${slide.id}`} className="rounded-full bg-primary px-8 py-4 text-xs font-black tracking-[0.2em] text-white shadow-lg transition-all hover:bg-primary-container active:scale-95">
                Upcoming Tours
              </Link>
              <Link href="/gallery" className="border-b-2 border-white/20 pb-1 text-xs font-black tracking-[0.2em] text-white transition-all hover:border-primary">
                Gallery
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-16 right-10 z-20 flex flex-col items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.id + item.image}
            onClick={() => setCurrentIndex(index)}
            className={`w-1 rounded-full transition-all duration-500 ${index === currentIndex ? "h-8 bg-white" : "h-2 bg-white/30 hover:bg-white/60"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
}
