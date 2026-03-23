"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const IMAGE_COLUMNS = [
  [
    "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg?auto=compress&cs=tinysrgb&w=800", // elephant
    "https://images.pexels.com/photos/1670984/pexels-photo-1670984.jpeg?auto=compress&cs=tinysrgb&w=800", // lion
    "https://images.pexels.com/photos/460013/pexels-photo-460013.jpeg?auto=compress&cs=tinysrgb&w=800", // giraffe
  ],
  [
    "https://images.pexels.com/photos/1056516/pexels-photo-1056516.jpeg?auto=compress&cs=tinysrgb&w=800", // zebra
    "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=800", // cheetah
    "https://images.pexels.com/photos/34005/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800", // rhino
  ],
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative w-full min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Content */}
        <div className="max-w-xl">
          <span className="label-md uppercase tracking-[0.2em] text-primary font-bold mb-6 block">
            Editorial Expedition No. 14
          </span>
          <h1 className="text-6xl md:text-7xl font-black font-headline text-on-background leading-tight tracking-tighter mb-8">
            Adventure <br />
            <span className="text-primary">Awaits</span>
          </h1>
          <p className="text-xl text-on-surface-variant mb-10 leading-relaxed font-medium">
            Move beyond the grid. Experience the wild through a curated, editorial lens. Our
            explorations are designed for the high-end explorer.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold text-sm hover:translate-y-[-2px] transition-transform">
              Browse Adventures
            </button>
            <button className="bg-surface-container-highest text-on-surface-variant px-8 py-3 rounded-full font-bold text-sm hover:bg-surface-dim transition-colors">
              Our Story
            </button>
          </div>
        </div>

        {/* Right Masonry Grid */}
        <div className="h-[600px] w-full overflow-hidden relative rounded-2xl flex gap-4">
          {/* Column 1 - animates UP */}
          <div className="flex-1 overflow-hidden relative">
            <motion.div
              className="flex flex-col gap-4 absolute w-full"
              initial={mounted ? { y: 0 } : false}
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 20,
              }}
            >
              {/* Render twice for seamless looping */}
              {[...IMAGE_COLUMNS[0], ...IMAGE_COLUMNS[0]].map((src, i) => (
                <div key={i} className="w-full h-64 rounded-xl overflow-hidden shrink-0">
                  <img src={src} className="w-full h-full object-cover" alt="Safari wildlife" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Column 2 - animates DOWN */}
          <div className="flex-1 overflow-hidden relative">
            <motion.div
              className="flex flex-col gap-4 absolute w-full bottom-0"
              initial={mounted ? { y: 0 } : false}
              animate={{ y: ["0%", "50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
            >
              {/* Render twice for seamless looping */}
              {[...IMAGE_COLUMNS[1], ...IMAGE_COLUMNS[1]].map((src, i) => (
                <div key={i} className="w-full h-80 rounded-xl overflow-hidden shrink-0">
                  <img src={src} className="w-full h-full object-cover" alt="Safari wildlife" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
