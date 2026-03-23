import React from "react";
import Link from "next/link";
import AdventureCard from "./AdventureCard";
import { getFutureAdventures } from "@/api/adventures";

export default async function AdventureGrid() {
  const adventures = await getFutureAdventures();

  return (
    <section className="bg-surface py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Curated Itineraries
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-headline text-on-background tracking-tighter">
              Featured <span className="text-primary-container">Adventures.</span>
            </h2>
          </div>
          <Link
            href="/explore"
            className="text-on-surface-variant font-bold border-b border-on-surface-variant hover:text-primary transition-colors pb-1 flex items-center gap-2"
          >
            Filter All Dispatches
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch h-full">
          {adventures.map((adv) => (
            <AdventureCard
              key={adv.id}
              id={adv.id}
              image={adv.image}
              altText={adv.altText}
              category={adv.category}
              location={adv.location}
              title={adv.title}
              price={adv.price}
              date={adv.date}
              slots={adv.slots}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
