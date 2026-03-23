"use client";
import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { MOCK_ADVENTURES } from "@/api/adventures";

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Flatten all images from adventures
  const allImages = MOCK_ADVENTURES.flatMap(adv => {
    const mainImage = { url: adv.image, title: adv.title, location: adv.location, date: adv.date, id: adv.id };
    const extraImages = (adv.images || []).map(imgUrl => ({
      url: imgUrl, title: adv.title, location: adv.location, date: adv.date, id: adv.id
    }));
    // Keep unique images based on URL
    const uniqueExtras = extraImages.filter(e => e.url !== mainImage.url);
    return [mainImage, ...uniqueExtras];
  });

  const filteredImages = allImages.filter(img => {
    const term = searchTerm.toLowerCase();
    return img.title.toLowerCase().includes(term) ||
           img.location.toLowerCase().includes(term) ||
           img.date.toLowerCase().includes(term);
  });

  return (
    <div className="bg-surface min-h-screen text-on-surface font-body overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <header className="mb-20 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-4">
            NakTide Archives
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-12">
            The Gallery.
          </h1>
          <div className="max-w-md mx-auto relative group">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant z-10">
              search
            </span>
            <input 
              type="text" 
              placeholder="Search by location, trip, or date..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-full pl-14 pr-6 py-4 text-sm font-medium focus:ring-2 focus:border-primary focus:ring-primary/20 outline-none text-on-surface transition-all placeholder:text-on-surface-variant/70 shadow-sm"
            />
          </div>
        </header>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredImages.map((img, idx) => (
            <div key={`${img.id}-${idx}`} className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/30 shadow-sm">
              <img src={img.url} alt={img.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 pt-20 p-8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary-fixed block mb-2 drop-shadow-md">
                  {img.date}
                </span>
                <span className="text-xs uppercase tracking-widest font-bold text-white/80 block mb-2 drop-shadow-md">
                  {img.location}
                </span>
                <h3 className="text-xl font-headline font-bold text-white drop-shadow-md leading-tight">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-32 text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-50 block">image_not_supported</span>
            <span className="font-bold text-lg">No memories found matching your search.</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
