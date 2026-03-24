"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type GalleryCard = {
  id: string;
  url: string;
  title: string;
  location: string;
  date: string;
};

export function GalleryBrowser({ cards }: { cards: GalleryCard[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    if (!searchTerm) return cards;
    const query = searchTerm.toLowerCase();
    return cards.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.location.toLowerCase().includes(query) ||
        card.date.toLowerCase().includes(query),
    );
  }, [cards, searchTerm]);

  return (
    <>
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.3em] text-primary">NakTide Archives</span>
          <h1 className="font-headline text-5xl font-black tracking-tighter text-on-surface md:text-7xl">The Gallery.</h1>
        </div>
        <div className="relative w-full max-w-[280px]">
          <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-on-surface-variant">search</span>
          <input
            type="text"
            placeholder="Search trips, dates, places..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-full border border-outline-variant/30 bg-surface-container-highest py-3 pl-11 pr-5 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid auto-rows-[100px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-flow-dense">
          {filtered.map((card, index) => {
            const isFirst = index === 0;
            const rowSpans = [3, 4, 3, 5, 4, 3];
            const span = isFirst ? 7 : rowSpans[index % rowSpans.length];

            return (
              <Link
                key={`${card.id}-${index}`}
                href={`/gallery/${card.id}`}
                className={`group relative block overflow-hidden rounded-xl bg-surface-container-low ${
                  isFirst ? "lg:col-span-2 lg:row-span-7" : "col-span-1"
                }`}
                style={{ gridRow: `span ${span}` }}
              >
                <img
                  src={card.url}
                  alt={card.title}
                  loading={isFirst ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-5">
                  <span className="mb-1 block text-[9px] font-black uppercase tracking-[0.2em] text-white/60">{card.date}</span>
                  <span className={`font-headline font-bold leading-snug text-white ${isFirst ? "text-xl md:text-2xl" : "text-sm"}`}>{card.title}</span>
                  {isFirst ? <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/40">{card.location}</span> : null}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-40 text-center text-on-surface-variant">
          <span className="material-symbols-outlined mb-4 block text-6xl opacity-30">image_not_supported</span>
          <span className="text-lg font-bold">No photos match your search.</span>
        </div>
      )}
    </>
  );
}
