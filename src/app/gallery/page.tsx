"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { MOCK_ADVENTURES } from "@/api/adventures";

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Build a flat list of all images, each tagged with their adventure
  const allCards = MOCK_ADVENTURES.flatMap(adv => {
    const imgs = [adv.image, ...(adv.images || [])].filter((v, i, a) => a.indexOf(v) === i);
    return imgs.map(url => ({ url, title: adv.title, location: adv.location, date: adv.date, id: adv.id }));
  });

  const filtered = searchTerm
    ? allCards.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.date.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allCards;

  // Assign a varying aspect-ratio class per index to mimic Pinterest heights
  const heights = ["aspect-[2/3]", "aspect-[3/4]", "aspect-square", "aspect-[3/5]", "aspect-[4/5]", "aspect-[2/3]", "aspect-[1/1]", "aspect-[3/4]"];

  return (
    <div className="bg-surface min-h-screen text-on-surface font-body">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-3">NakTide Archives</span>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter">The Gallery.</h1>
          </div>
          <div className="relative max-w-[280px] w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-base">search</span>
            <input
              type="text"
              placeholder="Search trips, dates, places..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-highest rounded-full pl-11 pr-5 py-3 text-sm font-medium focus:outline-none text-on-surface placeholder:text-on-surface-variant/60 border border-outline-variant/30"
            />
          </div>
        </div>

        {/* Pinterest masonry via CSS columns */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-3 items-start">

            {/* LEFT column — featured tall card + more images below */}
            <div className="flex flex-col gap-3">
              {filtered.slice(0, 4).map((card, i) => (
                <Link
                  key={`left-${card.id}-${i}`}
                  href={`/gallery/${card.id}`}
                  className="rounded-xl overflow-hidden relative bg-surface-container-low group block"
                  style={{ minHeight: i === 0 ? "70vh" : "220px" }}
                >
                  <img
                    src={card.url}
                    alt={card.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white/60 block mb-1">{card.date}</span>
                    <span className={`font-headline font-bold text-white leading-snug ${i === 0 ? "text-xl" : "text-sm"}`}>{card.title}</span>
                    {i === 0 && <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{card.location}</span>}
                  </div>
                </Link>
              ))}
            </div>

            {/* RIGHT masonry — all remaining images */}
            <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: "12px" }}>
              {filtered.slice(4).map((card, idx) => (
                <Link
                  key={`${card.id}-${idx}`}
                  href={`/gallery/${card.id}`}
                  className="break-inside-avoid inline-block w-full mb-3 rounded-xl overflow-hidden relative bg-surface-container-low group block"
                >
                  <img
                    src={card.url}
                    alt={card.title}
                    className={`w-full object-cover ${heights[idx % heights.length]} group-hover:scale-105 transition-transform duration-700`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white/60 block mb-0.5">{card.date}</span>
                    <span className="text-sm font-headline font-bold text-white leading-snug">{card.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        ) : (
          <div className="text-center py-40 text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-30 block">image_not_supported</span>
            <span className="font-bold text-lg">No photos match your search.</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
