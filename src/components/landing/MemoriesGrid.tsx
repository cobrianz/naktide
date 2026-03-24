import Link from "next/link";

import { getCatalogue, getMediaAssets } from "@/lib/mock-data";
import { getTourGalleryImages } from "@/lib/public-content";

export default async function MemoriesGrid() {
  const tours = (await getCatalogue()).filter((tour) => tour.status === "completed").slice(0, 3);
  const media = await getMediaAssets();
  const memoryCount = tours.reduce((total, tour) => total + getTourGalleryImages(tour, media).length, 0);

  return (
    <section className="bg-surface py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-6 block w-fit rounded-full border border-primary/20 px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-primary">Archived Memories</span>
            <h2 className="mb-8 font-headline text-4xl font-black leading-[0.9] tracking-tighter text-on-surface md:text-6xl">
              We don&apos;t just run tours;<br />
              <span className="italic text-primary">we forge legendary experiences.</span>
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">Every archived chapter below is pulled from the same expedition catalogue and media library that the admin team curates.</p>
          </div>
          <div className="hidden border-l border-outline-variant/30 pl-12 lg:block">
            <div className="mb-2 text-5xl font-black text-primary">{memoryCount}+</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Moments Captured</div>
          </div>
        </div>

        <div className="grid h-auto grid-cols-1 gap-4 md:grid-cols-12 md:h-[900px]">
          {tours.map((tour, index) => {
            const spans = ["md:col-span-8 md:row-span-2", "md:col-span-4 md:row-span-1", "md:col-span-4 md:row-span-1"];
            return (
              <div key={tour.id} className={`${spans[index] ?? "md:col-span-4 md:row-span-1"} group relative overflow-hidden rounded-2xl bg-surface-container-low`}>
                <img src={tour.image} alt={tour.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className="mb-4 flex translate-y-4 items-center gap-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="rounded-sm bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest">{tour.category}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{tour.date}</span>
                  </div>
                  <h3 className="font-headline text-3xl font-black tracking-tighter transition-colors duration-300 group-hover:text-primary md:text-4xl">{tour.title}</h3>
                  <p className="mt-2 max-w-xs text-sm font-medium text-white/60 opacity-0 transition duration-500 delay-100 group-hover:opacity-100">{tour.location}</p>
                  <div className="mt-8 border-t border-white/10 pt-6 opacity-0 transition duration-500 delay-200 group-hover:opacity-100">
                    <Link href={`/gallery/${tour.id}`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:gap-4">
                      View Chapter <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col items-center">
          <div className="mb-8 h-24 w-px bg-gradient-to-b from-primary to-transparent" />
          <Link href="/gallery" className="group flex flex-col items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant transition-colors group-hover:text-primary">Explore the full archive</span>
            <span className="material-symbols-outlined animate-bounce cursor-pointer text-4xl text-primary-fixed transition-transform group-hover:translate-y-2">expand_more</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
