import Link from "next/link";

import AdventureCard from "./AdventureCard";
import { getCatalogue } from "@/lib/mock-data";

export default async function AdventureGrid() {
  const adventures = (await getCatalogue()).filter((adventure) => adventure.status === "upcoming");

  return (
    <section className="overflow-hidden bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-xl">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary">Curated Itineraries</span>
            <h2 className="font-headline text-4xl font-black tracking-tighter text-on-background md:text-5xl">
              Featured <span className="text-primary-container">Adventures.</span>
            </h2>
          </div>
          <Link href="/explore" className="flex items-center gap-2 border-b border-on-surface-variant pb-1 font-bold text-on-surface-variant transition-colors hover:text-primary">
            Filter All Dispatches
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid h-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {adventures.map((adventure) => (
            <AdventureCard
              key={adventure.id}
              id={adventure.id}
              image={adventure.image}
              altText={adventure.altText}
              category={adventure.category}
              location={adventure.location}
              title={adventure.title}
              price={adventure.price}
              date={adventure.date}
              slots={adventure.slots}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
