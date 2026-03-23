"use client";
import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { MOCK_ADVENTURES } from "@/api/adventures";

function Lightbox({ images, startIndex, title, onClose }: { images: string[], startIndex: number, title: string, onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);

  React.useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx(p => (p + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx(p => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/97 flex flex-col items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-8 text-white/50 hover:text-white z-50 transition-colors">
        <span className="material-symbols-outlined text-4xl">close</span>
      </button>
      <div className="relative w-full max-w-6xl h-[75vh] flex items-center justify-center px-16" onClick={e => e.stopPropagation()}>
        {images.length > 1 && (
          <button onClick={() => setIdx(p => (p - 1 + images.length) % images.length)} className="absolute left-2 text-white/40 hover:text-white z-20 transition-colors">
            <span className="material-symbols-outlined text-5xl">chevron_left</span>
          </button>
        )}
        <img src={images[idx]} alt={title} className="max-w-full max-h-full object-contain" />
        {images.length > 1 && (
          <button onClick={() => setIdx(p => (p + 1) % images.length)} className="absolute right-2 text-white/40 hover:text-white z-20 transition-colors">
            <span className="material-symbols-outlined text-5xl">chevron_right</span>
          </button>
        )}
      </div>
      <div className="mt-6 text-center" onClick={e => e.stopPropagation()}>
        <p className="text-white/40 text-xs tracking-widest uppercase">{idx + 1} / {images.length}</p>
      </div>
    </div>
  );
}

export default function EventGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const adventure = MOCK_ADVENTURES.find(a => a.id === id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!adventure) return notFound();

  const allImages = [adventure.image, ...(adventure.images || [])].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="bg-surface min-h-screen text-on-surface font-body">
      {lightboxIndex !== null && (
        <Lightbox images={allImages} startIndex={lightboxIndex} title={adventure.title} onClose={() => setLightboxIndex(null)} />
      )}

      <Navbar />

      <main className="pt-28 pb-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-12">
          <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-on-surface">{adventure.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-16 border-b border-outline-variant/20 pb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-4">{adventure.location} · {adventure.date}</span>
          <h1 className="font-headline text-5xl md:text-6xl font-black text-on-surface tracking-tighter mb-4">{adventure.title}</h1>
          <p className="text-on-surface-variant text-sm">{allImages.length} photographs from this expedition</p>
        </header>

        {/* Large hero image */}
        <div className="mb-6 cursor-pointer" onClick={() => setLightboxIndex(0)}>
          <div className="w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl group relative">
            <img src={allImages[0]} alt={adventure.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="bg-black/60 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-base">zoom_in</span> Open Photo
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail grid for remaining images */}
        {allImages.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allImages.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="aspect-square overflow-hidden rounded-xl cursor-pointer group relative bg-surface-container-low"
                onClick={() => setLightboxIndex(idx + 1)}
              >
                <img src={img} alt={`${adventure.title} - ${idx + 2}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-outline-variant/20">
          <Link href="/gallery" className="text-on-surface-variant hover:text-primary font-bold text-sm uppercase tracking-widest transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Gallery
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
