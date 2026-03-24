import Link from "next/link";

import { getCatalogue, getMediaAssets } from "@/lib/mock-data";
import { getHeroSlides } from "@/lib/public-content";

export default async function UpcomingEventsSection() {
  const tours = await getCatalogue();
  const upcomingTours = tours.filter((tour) => tour.status === "upcoming");
  const featured = upcomingTours[0];
  const heroSlide = getHeroSlides(tours, await getMediaAssets(), 1)[0];

  if (!featured) return null;

  return (
    <section className="mx-auto max-w-7xl bg-surface px-6 py-24">
      <div className="mb-12 flex flex-col items-center text-center">
        <span className="material-symbols-outlined mb-2 text-3xl text-primary">public</span>
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">NakTide Expeditions</span>
        <h2 className="font-headline text-3xl font-black text-on-background">Upcoming Departures.</h2>
      </div>

      <div className="h-auto overflow-hidden rounded-[2rem] border border-outline-variant/30 bg-surface-container-lowest md:flex md:h-[600px]">
        <div className="flex items-center justify-center p-12 text-center md:w-[45%] lg:p-20">
          <div>
            <h3 className="mb-6 text-lg font-bold uppercase leading-relaxed tracking-widest lg:text-xl">
              Next departure <span className="mt-2 block text-primary-fixed lg:inline">{featured.title}</span>
            </h3>
            <p className="mb-12 max-w-sm text-sm leading-relaxed text-on-surface-variant">{featured.overview}</p>
            <p className="mb-12 text-xs font-bold uppercase tracking-widest text-on-background">{featured.date}. {featured.slots}</p>
            <div className="flex justify-center gap-4">
              <Link href={`/adventures/${featured.id}`} className="border border-outline-variant/30 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-surface-container">Read more</Link>
              <Link href="/contact" className="border border-outline-variant/30 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-surface-container">Book session</Link>
            </div>
          </div>
        </div>

        <div className="h-[400px] md:h-full md:w-[55%]">
          <img src={heroSlide?.image || featured.image} alt={featured.title} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
