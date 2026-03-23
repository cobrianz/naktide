"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { MOCK_ADVENTURES } from "@/api/adventures";

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdventures = MOCK_ADVENTURES.filter(adv => {
    const term = searchTerm.toLowerCase();
    return (
      adv.title.toLowerCase().includes(term) ||
      adv.location.toLowerCase().includes(term) ||
      adv.date.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-surface min-h-screen text-on-surface font-body">
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-4">NakTide Archives</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tighter">The Gallery.</h1>
            <div className="relative max-w-xs w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">search</span>
              <input
                type="text"
                placeholder="Search by location, trip, date..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-surface-container-highest rounded-full pl-11 pr-5 py-3 text-sm font-medium focus:outline-none text-on-surface placeholder:text-on-surface-variant/60 border border-outline-variant/30"
              />
            </div>
          </div>
        </header>

        {filteredAdventures.length > 0 ? (
          <div className="space-y-6">
            {filteredAdventures.map((adv, idx) => {
              const allImages = [adv.image, ...(adv.images || [])].filter(Boolean);
              const previewImg1 = allImages[1] || allImages[0];
              const previewImg2 = allImages[2] || allImages[0];
              const totalPhotos = allImages.length;

              return (
                <Link key={adv.id} href={`/gallery/${adv.id}`} className="block group">
                  <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4 h-[480px] md:h-[520px]">
                    {/* Large Left Image */}
                    <div className="relative overflow-hidden rounded-2xl bg-surface-container-low">
                      <img
                        src={adv.image}
                        alt={adv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      {/* Bottom overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 pt-24 p-8 to-transparent">
                        <span className="inline-block bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                          {adv.location}
                        </span>
                        <h2 className="font-headline font-black text-white text-3xl md:text-4xl leading-tight tracking-tight mb-3">
                          {adv.title}
                        </h2>
                        <span className="text-white/60 text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-0.5 group-hover:border-primary-fixed group-hover:text-primary-fixed transition-colors">
                          View Gallery ({totalPhotos} Photos) →
                        </span>
                      </div>
                    </div>

                    {/* Right single thumbnail */}
                    <div className="hidden md:block relative overflow-hidden rounded-2xl bg-surface-container-low h-full">
                      <img
                        src={previewImg1}
                        alt={adv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/60 backdrop-blur-md text-white px-5 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                          <span className="material-symbols-outlined text-base">grid_view</span>
                          View Gallery
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Date strip below each block */}
                  <div className="mt-3 flex items-center gap-4 text-[11px] text-on-surface-variant font-medium pl-1">
                    <span className="font-black uppercase tracking-[0.2em] text-on-surface-variant/60">{adv.date}</span>
                    <span className="text-outline-variant/40">·</span>
                    <span className="uppercase tracking-widest">{adv.category}</span>
                    <span className="text-outline-variant/40">·</span>
                    <span>{totalPhotos} Photos</span>
                  </div>

                  {/* Divider */}
                  {idx < filteredAdventures.length - 1 && (
                    <div className="mt-8 border-t border-outline-variant/20" />
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-40 text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-40 block">image_not_supported</span>
            <span className="font-bold text-lg">No expeditions match your search.</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
