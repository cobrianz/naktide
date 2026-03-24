"use client";

import Link from "next/link";
import { useState } from "react";

function Lightbox({ images, startIndex, title, onClose }: { images: string[]; startIndex: number; title: string; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/97" onClick={onClose}>
      <button onClick={onClose} className="absolute right-8 top-6 z-50 text-white/50 transition-colors hover:text-white">
        <span className="material-symbols-outlined text-4xl">close</span>
      </button>
      <div className="relative flex h-[75vh] w-full max-w-6xl items-center justify-center px-16" onClick={(event) => event.stopPropagation()}>
        {images.length > 1 ? (
          <button onClick={() => setIndex((value) => (value - 1 + images.length) % images.length)} className="absolute left-2 z-20 text-white/40 transition-colors hover:text-white">
            <span className="material-symbols-outlined text-5xl">chevron_left</span>
          </button>
        ) : null}
        <img src={images[index]} alt={title} className="max-h-full max-w-full object-contain" />
        {images.length > 1 ? (
          <button onClick={() => setIndex((value) => (value + 1) % images.length)} className="absolute right-2 z-20 text-white/40 transition-colors hover:text-white">
            <span className="material-symbols-outlined text-5xl">chevron_right</span>
          </button>
        ) : null}
      </div>
      <div className="mt-6 text-center" onClick={(event) => event.stopPropagation()}>
        <p className="text-xs uppercase tracking-widest text-white/40">{index + 1} / {images.length}</p>
      </div>
    </div>
  );
}

type GalleryDetailViewProps = {
  id: string;
  title: string;
  location: string;
  date: string;
  images: string[];
};

export function GalleryDetailView({ id, title, location, date, images }: GalleryDetailViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {lightboxIndex !== null ? <Lightbox images={images} startIndex={lightboxIndex} title={title} onClose={() => setLightboxIndex(null)} /> : null}

      <main className="mx-auto max-w-[1400px] px-4 pb-16 pt-28 font-body text-on-surface md:px-8 lg:px-12">
        <nav className="mb-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          <Link href="/gallery" className="transition-colors hover:text-primary">Gallery</Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-on-surface">{title}</span>
        </nav>

        <header className="mb-16 border-b border-outline-variant/20 pb-12">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">{location} | {date}</span>
          <h1 className="font-headline text-5xl font-black tracking-tighter text-on-surface md:text-6xl">{title}</h1>
          <p className="mt-4 text-sm text-on-surface-variant">{images.length} photographs from this expedition</p>
        </header>

        <div className="mb-6 cursor-pointer" onClick={() => setLightboxIndex(0)}>
          <div className="group relative h-[60vh] w-full overflow-hidden rounded-2xl md:h-[70vh]">
            <img src={images[0]} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
              <span className="rounded-full bg-black/60 px-5 py-3 text-xs font-black uppercase tracking-widest text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">Open photo</span>
            </div>
          </div>
        </div>

        {images.length > 1 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.slice(1).map((image, index) => (
              <div key={`${id}-${index + 1}`} className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-surface-container-low" onClick={() => setLightboxIndex(index + 1)}>
                <img src={image} alt={`${title} ${index + 2}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-16 border-t border-outline-variant/20 pt-8">
          <Link href="/gallery" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to gallery
          </Link>
        </div>
      </main>
    </>
  );
}
