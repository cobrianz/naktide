"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=1920",
    titleLine1: "Adventure",
    titleLine2: "Awaits",
    description: "Move beyond the grid. Experience the wild through a curated, editorial lens. Our explorations are designed for the high-end explorer."
  },
  {
    image: "https://images.pexels.com/photos/3992066/pexels-photo-3992066.jpeg?auto=compress&cs=tinysrgb&w=1920",
    titleLine1: "The Great",
    titleLine2: "Migration",
    description: "Follow the endless herds across the Serengeti. An untamed spectacle of nature in its rawest form."
  },
  {
    image: "https://images.pexels.com/photos/1049500/pexels-photo-1049500.jpeg?auto=compress&cs=tinysrgb&w=1920",
    titleLine1: "Into the",
    titleLine2: "Wild",
    description: "Experience the heartbeat of Africa up close. Exclusive access to untouched reserves away from the crowds."
  },
  {
    image: "https://images.pexels.com/photos/609749/pexels-photo-609749.jpeg?auto=compress&cs=tinysrgb&w=1920",
    titleLine1: "Timeless",
    titleLine2: "Giants",
    description: "Walk alongside majestic elephants. Observe complex matriarchal societies shifting across the ancient landscape."
  },
  {
    image: "https://images.pexels.com/photos/3992516/pexels-photo-3992516.jpeg?auto=compress&cs=tinysrgb&w=1920",
    titleLine1: "Golden",
    titleLine2: "Horizons",
    description: "Chase the sunset where the earth meets the sky. Unforgettable evenings beneath the vast African canopy."
  },
  {
    image: "https://images.pexels.com/photos/33231637/pexels-photo-33231637.jpeg?auto=compress&cs=tinysrgb&w=1920",
    titleLine1: "Conservation",
    titleLine2: "First",
    description: "Every journey directly funds anti-poaching units. Travel responsibly and leave a vital, lasting impact."
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000); // Crossfade every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative w-full h-[90vh] min-h-[700px] flex overflow-hidden">
      {/* Background Images Crossfade */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={SLIDES[currentIndex].image}
            alt="Safari Landscape"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
        {/* Soft dark gradient so text is legible but images remain bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col justify-between h-full pt-20 pb-12">
        
        {/* Top/Left Minimalistic Text */}
        <div className="mt-16 sm:mt-24 max-w-xl text-white">
          <motion.span 
            className="uppercase tracking-[0.3em] font-bold text-xs mb-8 block text-primary-fixed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Editorial Expedition No. 14
          </motion.span>
          
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl sm:text-7xl font-black font-headline leading-[0.9] tracking-tighter mb-8">
                {SLIDES[currentIndex].titleLine1}<br />
                {SLIDES[currentIndex].titleLine2}
              </h1>
              <p className="text-lg sm:text-xl font-body leading-relaxed max-w-sm text-gray-200 border-l-2 border-primary-fixed pl-6 py-2">
                {SLIDES[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Right CTA */}
        <div className="self-end flex flex-col items-end gap-4 mt-auto">
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-white/20 transition-colors">
              Our Story
            </button>
            <button className="bg-primary hover:bg-[#ad2c00] text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-colors shadow-none">
              Browse Adventures
            </button>
          </motion.div>
        </div>

      </div>
    </header>
  );
}
