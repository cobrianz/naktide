"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SLIDES = [
  {
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=1920",
    date: "Oct 12, 2024",
    category: "NakTide Safari",
    title: "The Serengeti Crossing",
    id: "serengeti-crossing-2024",
  },
  {
    image: "https://images.pexels.com/photos/3992066/pexels-photo-3992066.jpeg?auto=compress&cs=tinysrgb&w=1920",
    date: "Aug 20, 2023",
    category: "Aerial Expedition",
    title: "The Great Migration Aerial Safari",
    id: "migration-aerial-2023",
  },
  {
    image: "https://images.pexels.com/photos/1049500/pexels-photo-1049500.jpeg?auto=compress&cs=tinysrgb&w=1920",
    date: "Dec 20, 2024",
    category: "Photography Safari",
    title: "Okavango Delta Photo-Op",
    id: "okavango-delta-2024",
  },
  {
    image: "https://images.pexels.com/photos/609749/pexels-photo-609749.jpeg?auto=compress&cs=tinysrgb&w=1920",
    date: "Jan 15, 2024",
    category: "Photography",
    title: "Skeleton Coast & Dunes",
    id: "skeleton-coast-2024",
  },
  {
    image: "https://images.pexels.com/photos/3992516/pexels-photo-3992516.jpeg?auto=compress&cs=tinysrgb&w=1920",
    date: "Nov 05, 2024",
    category: "Trekking",
    title: "Gorillas in the Mist",
    id: "gorillas-mist-2024",
  },
  {
    image: "https://images.pexels.com/photos/33231637/pexels-photo-33231637.jpeg?auto=compress&cs=tinysrgb&w=1920",
    date: "Oct 10, 2023",
    category: "Forest Trek",
    title: "Bwindi Forest Trek",
    id: "bwindi-trek-2023",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentIndex];

  return (
    <header className="relative w-full h-screen overflow-hidden bg-black">
      {/* Full-screen crossfading background images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Very light vignette on the bottom only — keeps images bright */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

      {/* Bottom-left text block — like the reference photo */}
      <div className="absolute bottom-16 left-10 z-20 max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Date / Category line */}
            <p className="text-white/70 text-sm font-medium mb-3 tracking-wide">
              {slide.date}
              <span className="mx-3 text-white/30">/</span>
              <span className="text-white/90 font-semibold">{slide.category}</span>
            </p>

            {/* Big Title */}
            <h1 className="font-headline font-black text-white text-5xl md:text-7xl leading-[1] tracking-tighter mb-6">
              {slide.title}
            </h1>

            {/* Updated CTAs — bottom left */}
            <div className="flex items-center gap-6 mt-8">
              <Link
                href={`/adventures/${slide.id}`}
                className="text-white text-xs font-black tracking-[0.2em] bg-primary px-8 py-4 rounded-full hover:bg-primary-container transition-all shadow-lg active:scale-95"
              >
                Upcoming Tours
              </Link>
              <Link
                href="/gallery"
                className="text-white text-xs font-black tracking-[0.2em] border-b-2 border-white/20 pb-1 hover:border-primary transition-all"
              >
                Gallery
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicator dots — bottom right */}
      <div className="absolute bottom-16 right-10 z-20 flex flex-col items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1 rounded-full transition-all duration-500 ${
              i === currentIndex ? "h-8 bg-white" : "h-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>


    </header>
  );
}
