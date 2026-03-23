"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function GalleryOverlay({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/20 transition-colors"
      >
        <span className="text-white font-bold flex items-center gap-2 text-sm md:text-base">
          <span className="material-symbols-outlined">grid_view</span>
          View Gallery
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-primary transition-colors z-[110]"
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>

            <button 
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-4 md:left-12 text-white hover:text-primary transition-colors z-[110] p-4 bg-black/50 rounded-full backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-4xl">chevron_left</span>
            </button>

            <motion.img 
              key={currentIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={images[currentIndex]} 
              className="max-w-[85vw] max-h-[85vh] object-contain rounded-xl border border-white/20 shadow-2xl"
              alt="Gallery view"
            />

            <button 
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-4 md:right-12 text-white hover:text-primary transition-colors z-[110] p-4 bg-black/50 rounded-full backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-4xl">chevron_right</span>
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-bold tracking-widest text-sm bg-black/80 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
